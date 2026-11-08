/* g08 visuals: relation matrices, Karnaugh maps, Cantor's diagonal and countable pairings */
(function () {
  const V = window.Viz;
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const cellCss = (on, extra) => `width:38px;height:38px;border-radius:8px;border:1.5px solid ${on ? "var(--accent)" : "var(--line2)"};background:${on ? "var(--accent)" : "var(--card)"};color:${on ? "#fff" : "var(--muted)"};font:700 15px var(--mono);cursor:pointer;${extra || ""}`;
  const ok = (b) => (b ? `<b style="color:var(--good)">yes</b>` : `<b style="color:var(--bad)">no</b>`);

  const RELS = {
    "≤": (a, b) => a <= b, "<": (a, b) => a < b, "=": (a, b) => a === b, "divides": (a, b) => b % a === 0,
    "same parity": (a, b) => a % 2 === b % 2, "same remainder mod 3": (a, b) => a % 3 === b % 3, "≠": (a, b) => a !== b,
    "f(x) = x mod n + 1": (a, b, n) => b === (a % n) + 1, "f(x) = ⌈x/2⌉": (a, b) => b === Math.ceil(a / 2), "empty": () => false,
  };
  V.register("g08-relation", {
    title: "Relation matrix and property checker", hint: "Click a cell to add or remove the pair (a, b)",
    setup(A, a) {
      const ALIAS = { leq: "≤", lt: "<", eq: "=", neq: "≠", mod: "f(x) = x mod n + 1", ceil: "f(x) = ⌈x/2⌉" };
      let pre = a.preset ? String(a.preset).replace(/_/g, " ") : "≤"; pre = ALIAS[pre] || pre; if (!RELS[pre]) pre = "≤";
      const nS = A.slider("set size n", 3, 6, 1, a.n || 5, () => load());
      A.select("Preset", Object.keys(RELS), pre, (v) => { pre = v; load(); });
      let M = [];
      const N = () => nS.v;
      const load = () => { const n = N(); M = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => !!RELS[pre](i + 1, j + 1, n))); };
      A.buttons([
        { label: "reflexive closure", on: () => M.forEach((r, i) => (r[i] = true)) },
        { label: "symmetric closure", on: () => M.forEach((r, i) => r.forEach((v, j) => { if (v) M[j][i] = true; })) },
        { label: "transitive closure", on: () => { const n = N(); for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (M[i][k] && M[k][j]) M[i][j] = true; } },
        { label: "clear", on: () => M.forEach((r) => r.fill(false)) },
      ]);
      const wrap = el("div"); wrap.style.cssText = "display:flex;flex-wrap:wrap;gap:18px;align-items:center;justify-content:center;padding:16px 10px 4px";
      const box = el("div"); wrap.appendChild(box); A.stage.appendChild(wrap);
      const P = A.plot({ x: [-1.6, 1.6], y: [-1.45, 1.45], h: 260 });
      load();
      A.draw = () => {
        const n = N(); if (M.length !== n) load();
        let t = `<table style="border-collapse:separate;border-spacing:4px;margin:0 auto"><tr><td style="font:600 12px var(--sans);color:var(--muted);text-align:center">a \\ b</td>${[...Array(n).keys()].map((j) => `<td style="text-align:center;font:700 14px var(--mono)">${j + 1}</td>`).join("")}</tr>`;
        for (let i = 0; i < n; i++) t += `<tr><td style="text-align:center;font:700 14px var(--mono);padding-right:4px">${i + 1}</td>${M[i].map((v, j) => `<td><button data-i="${i}" data-j="${j}" style="${cellCss(v, i === j ? "box-shadow:inset 0 0 0 2px var(--c-orange)" : "")}" aria-label="pair ${i + 1},${j + 1}">${v ? 1 : 0}</button></td>`).join("")}</tr>`;
        box.innerHTML = t + "</table>";
        box.querySelectorAll("button").forEach((b) => (b.onclick = () => { M[+b.dataset.i][+b.dataset.j] = !M[+b.dataset.i][+b.dataset.j]; A.draw(); }));
        const C = P.clear().P, pos = (i) => [1.05 * Math.sin((2 * Math.PI * i) / n), 1.05 * Math.cos((2 * Math.PI * i) / n)];
        for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (M[i][j]) {
          const p = pos(i), q = pos(j);
          if (i === j) { P.circle(p[0] * 1.27, p[1] * 1.27, 0.16, { color: C.orange, width: 1.6 }); continue; }
          const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L, o = M[j][i] ? 0.06 : 0;
          P.arrow(p[0] + (dx / L) * 0.2 + nx * o, p[1] + (dy / L) * 0.2 + ny * o, q[0] - (dx / L) * 0.22 + nx * o, q[1] - (dy / L) * 0.22 + ny * o, { color: C.accent, width: 1.6, head: 9, alpha: 0.85 });
        }
        for (let i = 0; i < n; i++) { const p = pos(i); P.dot(p[0], p[1], 14, { color: C.bg, stroke: C.ink, sw: 2 }); P.text(String(i + 1), p[0], p[1], { dy: 5, size: 13 }); }
        const pairs = [], R = (i, j) => M[i][j];
        let refl = null, sym = null, anti = null, tran = null;
        for (let i = 0; i < n; i++) if (!R(i, i) && !refl) refl = `missing (${i + 1},${i + 1})`;
        for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { if (R(i, j)) pairs.push(`(${i + 1},${j + 1})`); if (R(i, j) && !R(j, i) && !sym) sym = `(${i + 1},${j + 1}) but not (${j + 1},${i + 1})`; if (i !== j && R(i, j) && R(j, i) && !anti) anti = `(${i + 1},${j + 1}) and (${j + 1},${i + 1})`; }
        for (let i = 0; i < n && !tran; i++) for (let j = 0; j < n && !tran; j++) for (let k = 0; k < n && !tran; k++) if (R(i, j) && R(j, k) && !R(i, k)) tran = `(${i + 1},${j + 1}), (${j + 1},${k + 1}) but not (${i + 1},${k + 1})`;
        const why = (bad) => (bad ? ` <span class="k">(${bad})</span>` : "");
        const eq = !refl && !sym && !tran, po = !refl && !anti && !tran;
        let total = po; for (let i = 0; i < n && total; i++) for (let j = 0; j < n; j++) if (!R(i, j) && !R(j, i)) { total = false; break; }
        let extra = "";
        if (eq) { const seen = new Set(), cls = []; for (let i = 0; i < n; i++) if (!seen.has(i)) { const c = []; for (let j = 0; j < n; j++) if (R(i, j)) { c.push(j + 1); seen.add(j); } cls.push("{" + c.join(",") + "}"); } extra = ` <span class="k">equivalence classes:</span> <b>${cls.join(" ")}</b>`; }
        const rowCounts = M.map((r) => r.filter(Boolean).length), colCounts = [...Array(n).keys()].map((j) => M.filter((r) => r[j]).length);
        const isF = rowCounts.every((c) => c === 1);
        const fn = isF ? ` <span class="k">function:</span> ${ok(true)} <span class="k">injective</span> ${ok(colCounts.every((c) => c <= 1))} <span class="k">surjective</span> ${ok(colCounts.every((c) => c >= 1))}` : ` <span class="k">function (every row has exactly one 1):</span> ${ok(false)}`;
        A.set(`<span class="k">|R| =</span> <b>${pairs.length}</b> <span class="k">pairs.</span> <span class="k">reflexive</span> ${ok(!refl)}${why(refl)} · <span class="k">symmetric</span> ${ok(!sym)}${why(sym)} · <span class="k">antisymmetric</span> ${ok(!anti)}${why(anti)} · <span class="k">transitive</span> ${ok(!tran)}${why(tran)}<br><span class="k">equivalence relation</span> ${ok(eq)} · <span class="k">partial order</span> ${ok(po)} · <span class="k">total order</span> ${ok(total)}${extra}<br>${fn}`);
      };
    },
  });

  const GRAY = { 1: [0, 1], 2: [0, 1, 3, 2] };
  const VARS = "ABCD";
  V.register("g08-kmap", {
    title: "Karnaugh map simplifier", hint: "Click cells to cycle 0 → 1 → X (don't care)",
    setup(A, a) {
      let nv = [2, 3, 4].includes(a.vars) ? a.vars : 3; let val = [];
      const parse = (s) => (s == null || s === "" ? [] : String(s).split(/[ ,;]+/).filter((x) => x !== "").map(Number));
      const init = () => { val = new Array(1 << nv).fill(0); parse(a.m).forEach((i) => i < val.length && (val[i] = 1)); parse(a.d).forEach((i) => i < val.length && (val[i] = 2)); };
      init();
      A.seg([[2, "2 variables"], [3, "3 variables"], [4, "4 variables"]], nv, (v) => { nv = v; a = {}; init(); });
      A.buttons([{ label: "clear", on: () => val.fill(0) }, { label: "all 1", on: () => val.fill(1) }, { label: "random", on: () => { for (let i = 0; i < val.length; i++) val[i] = Math.random() < 0.45 ? 1 : 0; } }]);
      const box = el("div"); box.style.cssText = "padding:18px 10px;display:flex;justify-content:center;overflow-x:auto"; A.stage.appendChild(box);
      const COLS = ["var(--c-pink)", "var(--c-blue)", "var(--c-green)", "var(--c-orange)", "var(--c-purple)", "var(--c-teal)", "var(--c-yellow)", "var(--accent)"];
      function solve() {
        const n = nv, ones = [], cubes = [];
        for (let i = 0; i < 1 << n; i++) if (val[i] === 1) ones.push(i);
        const total = 3 ** n;
        for (let c = 0; c < total; c++) {
          let x = c; const t = []; for (let k = 0; k < n; k++) { t.push(x % 3); x = Math.floor(x / 3); } t.reverse();
          const ms = []; for (let m = 0; m < 1 << n; m++) { let good = true; for (let k = 0; k < n; k++) { const b = (m >> (n - 1 - k)) & 1; if (t[k] !== 2 && t[k] !== b) { good = false; break; } } if (good) ms.push(m); }
          if (ms.every((m) => val[m] !== 0)) cubes.push({ t, ms, lits: t.filter((v) => v !== 2).length });
        }
        const primes = cubes.filter((c) => !cubes.some((d) => d !== c && d.ms.length > c.ms.length && c.ms.every((m) => d.ms.includes(m)))).filter((c) => c.ms.some((m) => val[m] === 1));
        let best = null;
        const cost = (s) => s.length * 100 + s.reduce((q, c) => q + c.lits, 0);
        const rec = (chosen, left) => {
          if (best && cost(chosen) >= cost(best)) return;
          if (!left.length) { best = chosen.slice(); return; }
          const m = left[0];
          primes.filter((p) => p.ms.includes(m)).sort((x, y) => y.ms.length - x.ms.length).forEach((p) => { chosen.push(p); rec(chosen, left.filter((q) => !p.ms.includes(q))); chosen.pop(); });
        };
        rec([], ones);
        return { ones, cover: best || [] };
      }
      const term = (c) => { const parts = c.t.map((v, k) => (v === 2 ? "" : v ? VARS[k] : `\\overline{${VARS[k]}}`)).filter(Boolean).join("\\,"); return parts || "1"; };
      A.draw = () => {
        const n = nv, rv = n >> 1, cv = n - rv, rows = rv === 1 ? GRAY[1] : GRAY[2], cols = cv === 1 ? GRAY[1] : GRAY[2];
        const { ones, cover } = solve();
        const rl = VARS.slice(0, rv), cl = VARS.slice(rv, n);
        let h = `<table style="border-collapse:separate;border-spacing:5px"><tr><td style="font:600 13px var(--mono);color:var(--muted);text-align:right">${rl}\\${cl}</td>${cols.map((c) => `<td style="text-align:center;font:700 13px var(--mono)">${c.toString(2).padStart(cv, "0")}</td>`).join("")}</tr>`;
        rows.forEach((r) => {
          h += `<tr><td style="text-align:right;font:700 13px var(--mono);padding-right:4px">${r.toString(2).padStart(rv, "0")}</td>`;
          cols.forEach((c) => {
            const m = (r << cv) | c, v = val[m], dots = cover.map((g, gi) => (g.ms.includes(m) ? `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${COLS[gi % COLS.length]};margin:0 1px"></span>` : "")).join("");
            h += `<td><button data-m="${m}" style="${cellCss(v === 1, "width:58px;height:54px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;" + (v === 2 ? "background:var(--bg2);color:var(--ink);" : ""))}"><span>${v === 2 ? "X" : v}</span><small style="font:500 10px var(--sans);opacity:.75">m${m}</small><span style="line-height:8px">${dots}</span></button></td>`;
          });
          h += "</tr>";
        });
        box.innerHTML = h + "</table>";
        box.querySelectorAll("button").forEach((b) => (b.onclick = () => { const m = +b.dataset.m; val[m] = (val[m] + 1) % 3; A.draw(); }));
        const dc = val.map((v, i) => (v === 2 ? i : -1)).filter((i) => i >= 0);
        const canon = ones.length ? `\\sum m(${ones.join(",")})` + (dc.length ? ` + d(${dc.join(",")})` : "") : "0";
        const expr = !ones.length ? "0" : cover.map(term).join(" + ");
        const lit = cover.reduce((s, c) => s + c.lits, 0);
        const groups = cover.map((g, gi) => `<span style="color:${COLS[gi % COLS.length]}">●</span> ${A.tex(term(g))} <span class="k">covers ${g.ms.length} cell${g.ms.length > 1 ? "s" : ""}</span>`).join(" &nbsp; ");
        A.set(`<span class="k">canonical sum of minterms:</span> ${A.tex("F = " + canon)}<br><span class="k">minimal sum of products:</span> ${A.tex("F = " + expr)} <span class="k">(${cover.length} term${cover.length === 1 ? "" : "s"}, ${lit} literal${lit === 1 ? "" : "s"}, versus ${ones.length * n} literals unsimplified)</span><br>${groups}`);
      };
    },
  });

  V.register("g08-cantor", {
    title: "Countable and uncountable sets", hint: "Pick a mode, then press the buttons",
    setup(A, a) {
      let mode = a.mode || "diagonal", seed = 7, extra = [];
      A.seg([["diagonal", "Cantor's diagonal"], ["integers", "ℕ ↔ ℤ"], ["pairs", "ℕ ↔ ℕ × ℕ"]], mode, (v) => (mode = v));
      const steps = A.slider("show first k", 1, 21, 1, 10);
      A.buttons([{ label: "new list", on: () => { seed += 13; extra = []; } }, { label: "add the missing sequence to the list", on: () => extra.unshift(diag()) }]);
      const R = 8, L = 12;
      const rows = () => { const r = V.util.rng(seed), base = Array.from({ length: R }, () => Array.from({ length: L }, () => (r() < 0.5 ? 1 : 0))); return extra.concat(base).slice(0, R); };
      const diag = () => { const rs = rows(); return Array.from({ length: L }, (_, i) => (i < rs.length ? 1 - rs[i][i] : 1)); };
      const P = A.plot({ x: [0, 14], y: [0, 10], h: 330, equal: false });
      A.draw = () => {
        const C = P.clear().P, k = steps.v;
        if (mode === "diagonal") {
          P.setView([0, 14], [0, 10]);
          const rs = rows(), d = diag();
          rs.forEach((row, i) => { const y = 9 - i * 0.95; P.text(`s${i + 1}`, 0.6, y, { dy: 4, size: 12, color: C.muted }); row.forEach((b, j) => { const x = 1.5 + j * 0.95, on = i === j; if (on) P.rect(x - 0.42, y - 0.4, 0.84, 0.8, { fill: C.pink, fa: 0.25, color: C.pink, width: 1.5 }); P.text(String(b), x, y, { dy: 5, size: 14, mono: true, color: on ? C.ink : C.ink2 }); }); P.text("…", 1.5 + L * 0.95, y, { dy: 4, color: C.muted }); });
          const y = 9 - R * 0.95 - 0.35; P.text("new", 0.6, y, { dy: 4, size: 12, color: C.accent });
          d.forEach((b, j) => { const x = 1.5 + j * 0.95; P.rect(x - 0.42, y - 0.4, 0.84, 0.8, { fill: C.accent, fa: j < R ? 0.25 : 0.08, color: C.accent, width: 1.5 }); P.text(String(b), x, y, { dy: 5, size: 14, mono: true }); });
          A.set(`<span class="k">The new sequence flips the pink diagonal: its digit i is the opposite of digit i of s<sub>i</sub>. So it differs from s1 at position 1, from s2 at position 2, and so on. It is on no row of the list.</span> <b>Adding it to the list just creates a new diagonal and a new missing sequence.</b> <span class="k">(list length shown: ${R}; real lists are infinite)</span>`);
        } else if (mode === "integers") {
          P.setView([-11, 11], [0, 4]);
          for (let z = -10; z <= 10; z++) { P.line(z, 1.6, z, 1.8, { color: C.muted, width: 1 }); P.text(String(z), z, 1.2, { size: 11, color: C.muted }); }
          P.line(-10.5, 1.7, 10.5, 1.7, { color: C.line2, width: 1.5 });
          const f = (n) => (n % 2 === 0 ? n / 2 : -(n + 1) / 2);
          for (let n = 0; n < k; n++) { const z = f(n); P.dot(z, 1.7, 7, { color: C.accent }); P.text(String(n), z, 2.45, { size: 12, color: C.pink }); }
          const list = Array.from({ length: k }, (_, n) => `${n}→${f(n)}`).join(", ");
          A.set(`${A.tex("f(n) = n/2 \\text{ if } n \\text{ even},\\; -(n+1)/2 \\text{ if odd}")} <span class="k">pink labels are n, dots are f(n):</span> <span class="mono">${list}</span> <span class="k">every integer gets exactly one label: a bijection, so |ℕ| = |ℤ|.</span>`);
        } else {
          P.setView([-0.8, 6.5], [-0.8, 6.3]);
          const order = []; for (let s = 0; order.length < 28; s++) for (let i = 0; i <= s; i++) order.push([i, s - i]);
          for (let i = 0; i <= 5; i++) { P.text(String(i), i, -0.55, { size: 11, color: C.muted }); P.text(String(i), -0.55, i, { dy: 4, size: 11, color: C.muted }); }
          for (let i = 0; i <= 5; i++) for (let j = 0; j <= 5; j++) P.dot(i, j, 4, { color: C.line2 });
          for (let n = 1; n < Math.min(k, order.length); n++) P.arrow(order[n - 1][0], order[n - 1][1], order[n][0], order[n][1], { color: C.accent, width: 1.5, head: 8, alpha: 0.7 });
          for (let n = 0; n < Math.min(k, order.length); n++) { const [x, y] = order[n]; P.dot(x, y, 9, { color: C.pink }); P.text(String(n), x, y, { dy: 4, size: 10, color: "#fff" }); }
          const [x, y] = order[Math.min(k, order.length) - 1];
          A.set(`<span class="k">Walk the anti-diagonals x + y = 0, 1, 2, … in order. Pair number ${Math.min(k, order.length) - 1} is</span> <b>(${x}, ${y})</b>. <span class="k">Every pair is reached after finitely many steps, so ℕ × ℕ is countable. A fraction p/q is a pair, so ℚ is countable too.</span>`);
        }
      };
    },
  });
})();
