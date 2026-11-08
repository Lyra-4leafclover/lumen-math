#!/usr/bin/env python3
"""Builds js/data/*.js from content/*.md. Run: python3 tools/build.py"""
import html, json, re, shlex, sys
from pathlib import Path
import markdown

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content"
OUT = ROOT / "js" / "data"

BOXES = {
    "tip": "Tip", "note": "Note", "warn": "Watch out", "key": "Key idea",
    "ml": "Why it matters for ML", "cs": "Why it matters for CS",
    "example": "Example", "def": "Definition", "thm": "Theorem",
    "proof": "Proof", "steps": "Step by step", "formulas": "Key formulas",
    "try": "Try it yourself", "intuition": "Intuition", "history": "A bit of history",
    "code": "In code", "real": "Real-life example", "explore": "How to use this visual", "mock": "Exam-style question",
}
COLLAPSE = {"solution": "Show solution", "hint": "Show hint", "more": "Go deeper"}

def slug(s):
    s = re.sub(r"<[^>]+>", "", s)
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:60]

class Ctx:
    def __init__(self, course, lesson):
        self.course, self.lesson = course, lesson
        self.math = []
        self.defs, self.formulas, self.heads = [], [], []
        self.viz = 0
        self.quiz = 0

def protect_math(text, ctx):
    def disp(m):
        ctx.math.append(("d", m.group(1).strip()))
        return f"MATHPH{len(ctx.math)-1}X"
    text = re.sub(r"\$\$(.+?)\$\$", disp, text, flags=re.S)
    def inl(m):
        ctx.math.append(("i", m.group(1)))
        return f"MATHPH{len(ctx.math)-1}X"
    text = re.sub(r"(?<![\\$])\$(?!\s)([^$\n]+?)(?<![\s\\])\$", inl, text)
    return text.replace("\\$", "&#36;")

def restore_math(h, ctx):
    def rep(m):
        kind, tex = ctx.math[int(m.group(1))]
        t = html.escape(tex, quote=False)
        return f'<span class="mb">{t}</span>' if kind == "d" else f'<span class="m">{t}</span>'
    h = re.sub(r"<p>\s*MATHPH(\d+)X\s*</p>", lambda m: '<div class="mbw">' + rep(m) + '</div>', h)
    return re.sub(r"MATHPH(\d+)X", rep, h)

MD = markdown.Markdown(extensions=["tables", "fenced_code", "sane_lists", "attr_list"])

def md(text):
    MD.reset()
    return MD.convert(text)

def md_inline(text):
    h = md(text).strip()
    if h.startswith("<p>") and h.endswith("</p>") and h.count("<p>") == 1:
        h = h[3:-4]
    return h

def parse_args(rest):
    args, caption = {}, ""
    if "|" in rest:
        rest, caption = rest.split("|", 1)
    toks = shlex.split(rest)
    name = toks[0] if toks else ""
    for t in toks[1:]:
        if "=" in t:
            k, v = t.split("=", 1)
            try: v = json.loads(v)
            except Exception: pass
            args[k] = v
    return name, args, caption.strip()

def render_quiz(body, ctx):
    qs, cur = [], None
    for line in body.split("\n"):
        s = line.strip()
        if s.startswith("? "):
            cur = {"q": s[2:], "opts": [], "ans": None, "exp": []}
            qs.append(cur)
        elif cur is None or not s:
            continue
        elif s[:2] in ("- ", "+ "):
            cur["opts"].append((s[0] == "+", s[2:]))
        elif s.startswith("= "):
            cur["ans"] = s[2:]
        elif s.startswith("> "):
            cur["exp"].append(s[2:])
        else:
            cur["q"] += " " + s
    out = ['<div class="quiz">']
    for i, q in enumerate(qs):
        ctx.quiz += 1
        out.append(f'<div class="qcard" data-q="{ctx.quiz}"><div class="qnum">Question {i+1} of {len(qs)}</div>'
                   f'<div class="qtext">{md_inline(q["q"])}</div>')
        if q["opts"]:
            out.append('<div class="qopts">')
            for ok, o in q["opts"]:
                out.append(f'<button class="qopt" data-ok="{1 if ok else 0}">{md_inline(o)}</button>')
            out.append('</div>')
        else:
            out.append(f'<div class="qinput"><input type="text" inputmode="decimal" placeholder="Your answer" '
                       f'data-ans="{html.escape(q["ans"] or "", quote=True)}"><button class="btn small qcheck">Check</button></div>')
        exp = md(" ".join(q["exp"])) if q["exp"] else ""
        out.append(f'<div class="qfeedback"></div><div class="qexp">{exp}</div></div>')
    out.append("</div>")
    return "\n".join(out)

SECTIONS = [
    ("learn", "Learn", "Read this first. The idea explained from the ground up."),
    ("visual", "Visualize", "Play with the idea. Each visual comes with a guide on what to try and what to notice."),
    ("formulas", "Formulas & theorems", "The key results to remember, with proofs."),
    ("examples", "Worked examples", "Problems solved step by step. Try each one before opening the steps."),
    ("apply", "Where it's used", "How this shows up in machine learning, computer science and real life."),
    ("practice", "Practice", "Check your understanding. Every answer comes with an explanation."),
]
SEC_OF = {"formulas": "formulas", "thm": "formulas", "proof": "formulas",
          "example": "examples", "steps": "examples", "try": "examples", "solution": "examples", "mock": "examples",
          "ml": "apply", "cs": "apply", "real": "apply", "code": "apply",
          "quiz": "practice", "explore": "visual"}

def render(text, ctx, top=False):
    lines = text.split("\n")
    out, buf, i = [], [], 0
    def emit(h, sec="learn"):
        out.append((sec, h))
    def flush():
        if buf:
            emit(md("\n".join(buf)))
            buf.clear()
    while i < len(lines):
        line = lines[i]
        s = line.strip()
        m = re.match(r"^:::(\w+)\s*(.*)$", s)
        if s.startswith("@fig "):
            flush()
            name, args, cap = parse_args(s[5:])
            capt = f'<figcaption>{md_inline(cap)}</figcaption>' if cap else ""
            emit(f'<figure class="viz fig" data-viz="{name}" data-args=\'{html.escape(json.dumps(args), quote=True)}\'>'
                 f'<div class="viz-body"></div>{capt}</figure>', "learn")
            i += 1
            continue
        if s.startswith("@viz "):
            flush()
            name, args, cap = parse_args(s[5:])
            ctx.viz += 1
            capt = f'<figcaption><b>Try this:</b> {md_inline(cap)}</figcaption>' if cap else ""
            emit(f'<figure class="viz" data-viz="{name}" data-args=\'{html.escape(json.dumps(args), quote=True)}\'>'
                 f'<div class="viz-body"></div>{capt}</figure>', "visual")
            i += 1
            continue
        if m:
            flush()
            kind, title = m.group(1), m.group(2).strip()
            depth, j = 1, i + 1
            while j < len(lines):
                t = lines[j].strip()
                if re.match(r"^:::\w+", t): depth += 1
                elif t == ":::":
                    depth -= 1
                    if depth == 0: break
                j += 1
            body = "\n".join(lines[i+1:j])
            i = j + 1
            sec = SEC_OF.get(kind, "learn")
            if kind == "quiz":
                emit(render_quiz(body, ctx), sec); continue
            inner = render(body, ctx)
            if kind in COLLAPSE:
                emit(f'<details class="reveal {kind}"><summary>{md_inline(title) or COLLAPSE[kind]}</summary><div>{inner}</div></details>', sec)
                continue
            label = BOXES.get(kind, kind.title())
            ttl = md_inline(title) if title else ""
            if kind == "def" and title:
                ctx.defs.append({"term": re.sub(r"<[^>]+>", "", restore_math(ttl, ctx)), "html": f"<p class='gl-term'>{ttl}</p>{inner}"})
            if kind == "formulas":
                ctx.formulas.append(inner)
            head = f'<div class="box-label">{label}</div>' + (f'<div class="box-title">{ttl}</div>' if ttl else "")
            emit(f'<div class="box {kind}">{head}<div class="box-body">{inner}</div></div>', sec)
            continue
        hm = re.match(r"^(###|####)\s+(.*)$", s)
        if hm:
            flush()
            lvl = len(hm.group(1))
            hid = slug(hm.group(2)) or f"s{len(ctx.heads)}"
            emit(f'<h{lvl} id="{hid}" data-h="{lvl}">{md_inline(hm.group(2))}</h{lvl}>')
            i += 1
            continue
        buf.append(line)
        i += 1
    flush()
    if not top:
        return "\n".join(h for _, h in out)
    secs = {k: [] for k, _, _ in SECTIONS}
    for sec, h in out:
        secs[sec].append(h)
    learn = secs["learn"]
    keep = []
    for idx, h in enumerate(learn):
        if h.startswith("<h") and 'data-h=' in h:
            nxt = learn[idx + 1] if idx + 1 < len(learn) else None
            if nxt is None or (nxt.startswith("<h") and 'data-h=' in nxt and h[:3] >= nxt[:3]):
                continue
        keep.append(h)
    secs["learn"] = keep
    ctx.learn_words = len(plain("".join(keep)).split())
    html_out, n = [], 0
    for key, name, sub in SECTIONS:
        if not secs[key]: continue
        n += 1
        ctx.heads.append({"id": key, "t": name})
        html_out.append(f'<section class="lsec lsec-{key}" id="{key}"><div class="lsec-head"><span class="lsec-num">{n}</span>'
                        f'<div><h2>{name}</h2><p>{sub}</p></div></div>' + "\n".join(secs[key]) + "</section>")
    return "\n".join(html_out)

def plain(h):
    t = re.sub(r"<[^>]+>", " ", h)
    return re.sub(r"\s+", " ", html.unescape(t)).strip()

def parse_course(path):
    raw = path.read_text()
    fm, body = re.match(r"^---\n(.*?)\n---\n(.*)$", raw, re.S).groups()
    meta = {}
    for l in fm.split("\n"):
        if ":" in l:
            k, v = l.split(":", 1); meta[k.strip()] = v.strip()
    course = {"id": meta["id"], "title": meta["title"], "tagline": meta.get("tagline", ""),
              "desc": meta.get("desc", ""), "color": meta.get("color", "#5b6cff"),
              "area": meta.get("area", "Foundations"), "paths": [p.strip() for p in meta.get("paths", "").split(",") if p.strip()],
              "symbol": meta.get("symbol", "∑"), "order": int(meta.get("order", 99)),
              "prereq": [p.strip() for p in meta.get("prereq", "").split(",") if p.strip()], "units": []}
    lessons_html, glossary, formulas = {}, [], []
    unit = None
    parts = re.split(r"^(# Unit:.*|## Lesson:.*)$", body, flags=re.M)
    cur = None
    for p in parts:
        if p.startswith("# Unit:"):
            unit = {"title": p[7:].strip(), "lessons": []}
            course["units"].append(unit)
        elif p.startswith("## Lesson:"):
            mm = re.match(r"## Lesson:\s*(.*?)\s*\{#([\w-]+)\}\s*$", p)
            if not mm: sys.exit(f"bad lesson header in {path}: {p}")
            cur = {"id": mm.group(2), "title": mm.group(1)}
            unit["lessons"].append(cur)
        elif cur is not None:
            text = p.strip("\n")
            sm = re.match(r"^@summary:\s*(.*)$", text, re.M)
            cur["summary"] = sm.group(1).strip() if sm else ""
            text = re.sub(r"^@summary:.*$", "", text, flags=re.M)
            ctx = Ctx(course["id"], cur["id"])
            h = restore_math(render(protect_math(text, ctx), ctx, top=True), ctx)
            words = len(plain(h).split())
            cur.update({"minutes": max(3, round(words / 170)), "viz": ctx.viz, "quiz": ctx.quiz,
                        "heads": ctx.heads, "words": words, "lw": getattr(ctx, "learn_words", 0),
                        "search": plain(" ".join(x["t"] for x in ctx.heads) + " " + cur["summary"])[:400]})
            lessons_html[cur["id"]] = h
            for d in ctx.defs:
                glossary.append({**d, "c": course["id"], "l": cur["id"]})
            if ctx.formulas:
                formulas.append({"l": cur["id"], "t": cur["title"], "html": restore_math("".join(ctx.formulas), ctx)})
            cur = None
    return course, lessons_html, glossary, formulas

MIN_LEARN = 700

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    courses, glossary = [], []
    total = {"lessons": 0, "viz": 0, "quiz": 0, "words": 0}
    for f in sorted(CONTENT.glob("*.md")):
        c, lh, g, fo = parse_course(f)
        ids = [l["id"] for u in c["units"] for l in u["lessons"]]
        if len(ids) != len(set(ids)): sys.exit(f"duplicate lesson ids in {f}")
        courses.append(c); glossary += g
        for u in c["units"]:
            for l in u["lessons"]:
                total["lessons"] += 1; total["viz"] += l["viz"]; total["quiz"] += l["quiz"]; total["words"] += l["words"]
        (OUT / f"{c['id']}.js").write_text(
            "window.LUMEN_LOAD(" + json.dumps({"id": c["id"], "lessons": lh, "formulas": fo}, ensure_ascii=False) + ");\n")
    courses.sort(key=lambda c: c["order"])
    glossary.sort(key=lambda d: d["term"].lower())
    (OUT / "index.js").write_text("window.LUMEN=" + json.dumps({"courses": courses, "glossary": glossary, "totals": total}, ensure_ascii=False) + ";\n")
    short = [(c["id"], l["id"], l["lw"]) for c in courses for u in c["units"] for l in u["lessons"] if l["lw"] < MIN_LEARN]
    (ROOT / "tools" / "learn_report.txt").write_text("\n".join(f"{a} {b} {w}" for a, b, w in short) + "\n")
    print(f"{len(courses)} courses, {total}; lessons with Learn article < {MIN_LEARN} words: {len(short)} (see tools/learn_report.txt)")

if __name__ == "__main__":
    main()
