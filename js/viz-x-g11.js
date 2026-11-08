/* Theory of computation visuals (g11): finite automata toolkit, pushdown automata + parse trees, Turing machines */
(function () {
  const V = window.Viz;
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const setStr = (S) => "{" + [...S].join(",") + "}";
  const btnRow = (A, list) => A.buttons(list);
  const textInput = (A, value, label, filter) => {
    const w = el("div", "ctl"); w.innerHTML = `<label>${label}</label>`; const inp = el("input"); inp.type = "text"; inp.value = value; inp.setAttribute("aria-label", label); inp.style.minWidth = "150px"; inp.style.font = "600 14px var(--mono)"; w.appendChild(inp); A.ctl().appendChild(w);
    inp.addEventListener("input", () => { if (filter) { const f = filter(inp.value); if (f !== inp.value) inp.value = f; } A.draw && A.draw(); }); return inp;
  };

  /* ---------- drawing a state diagram ---------- */
  function drawMachine(P, m, o = {}) {
    const C = P.P, pos = (s) => m.pos[s], groups = {};
    m.s.forEach((s) => ["0", "1", "e"].forEach((b) => (m.t[s] && m.t[s][b] || []).forEach((to) => { const k = s + ">" + to; (groups[k] = groups[k] || { s, to, l: [] }).l.push(b === "e" ? "ε" : b); })));
    Object.values(groups).forEach(({ s, to, l }) => {
      const p = pos(s), q = pos(to), lab = l.join(","), hot = o.hotEdge && o.hotEdge(s, to);
      const col = hot ? C.pink : C.muted, w = hot ? 2.6 : 1.5;
      if (s === to) { const up = p[1] > 5 ? -1 : 1; P.circle(p[0], p[1] + up * 0.85, 0.42, { color: col, width: w }); P.text(lab, p[0], p[1] + up * 1.5, { dy: up > 0 ? 0 : 10, size: 12 }); return; }
      const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L, off = groups[to + ">" + s] ? 0.3 : 0;
      P.arrow(p[0] + (dx / L) * 0.62 + nx * off, p[1] + (dy / L) * 0.62 + ny * off, q[0] - (dx / L) * 0.62 + nx * off, q[1] - (dy / L) * 0.62 + ny * off, { color: col, width: w, head: 9 });
      P.text(lab, (p[0] + q[0]) / 2 + nx * (off + 0.32), (p[1] + q[1]) / 2 + ny * (off + 0.32), { dy: 4, size: 12, color: lab.includes("ε") ? C.purple : C.ink });
    });
    const s0 = pos(m.start); P.arrow(s0[0] - 1.4, s0[1], s0[0] - 0.62, s0[1], { color: C.ink, width: 2 });
    m.s.forEach((s) => {
      const p = pos(s), on = o.active && o.active.has(s), fillC = o.colorOf ? o.colorOf(s) : null;
      P.circle(p[0], p[1], 0.55, { color: on ? C.pink : C.ink, width: on ? 3.5 : 2, fill: fillC || (on ? C.pink : C.bg), fa: fillC ? 0.35 : on ? 0.22 : 1 });
      if (m.acc.includes(s)) P.circle(p[0], p[1], 0.44, { color: C.ink, width: 1.5 });
      P.text(s, p[0], p[1], { dy: 5, size: 13 });
    });
  }
  const closure = (m, S) => { const out = new Set(S), st = [...S]; while (st.length) { const x = st.pop(); ((m.t[x] && m.t[x].e) || []).forEach((y) => { if (!out.has(y)) { out.add(y); st.push(y); } }); } return out; };
  const move = (m, S, b) => { const out = new Set(); S.forEach((x) => ((m.t[x] && m.t[x][b]) || []).forEach((y) => out.add(y))); return closure(m, out); };
  const sortSet = (m, S) => m.s.filter((x) => S.has(x));

  const NFAS = {
    "ends in 01": { s: ["q0", "q1", "q2"], start: "q0", acc: ["q2"], t: { q0: { 0: ["q0", "q1"], 1: ["q0"] }, q1: { 1: ["q2"] }, q2: {} }, pos: { q0: [2, 3], q1: [5, 3], q2: [8, 3] } },
    "contains 101": { s: ["q0", "q1", "q2", "q3"], start: "q0", acc: ["q3"], t: { q0: { 0: ["q0"], 1: ["q0", "q1"] }, q1: { 0: ["q2"] }, q2: { 1: ["q3"] }, q3: { 0: ["q3"], 1: ["q3"] } }, pos: { q0: [1.6, 3], q1: [4.2, 3], q2: [6.6, 3], q3: [9, 3] } },
    "3rd symbol from the end is 1": { s: ["q0", "q1", "q2", "q3"], start: "q0", acc: ["q3"], t: { q0: { 0: ["q0"], 1: ["q0", "q1"] }, q1: { 0: ["q2"], 1: ["q2"] }, q2: { 0: ["q3"], 1: ["q3"] }, q3: {} }, pos: { q0: [1.6, 3], q1: [4.2, 3], q2: [6.6, 3], q3: [9, 3] } },
    "ε-NFA: even # of 0s OR even # of 1s": { s: ["s", "a0", "a1", "b0", "b1"], start: "s", acc: ["a0", "b0"], t: { s: { e: ["a0", "b0"] }, a0: { 0: ["a1"], 1: ["a0"] }, a1: { 0: ["a0"], 1: ["a1"] }, b0: { 1: ["b1"], 0: ["b0"] }, b1: { 1: ["b0"], 0: ["b1"] } }, pos: { s: [2, 3], a0: [5, 4.4], a1: [8.4, 4.4], b0: [5, 1.6], b1: [8.4, 1.6] } },
  };
  const DFAS = {
    "ends in 01": { s: ["q0", "q1", "q2"], start: "q0", acc: ["q2"], t: { q0: { 0: ["q1"], 1: ["q0"] }, q1: { 0: ["q1"], 1: ["q2"] }, q2: { 0: ["q1"], 1: ["q0"] } }, pos: { q0: [2, 2.2], q1: [5, 4.2], q2: [8, 2.2] } },
    "binary number divisible by 3": { s: ["r0", "r1", "r2"], start: "r0", acc: ["r0"], t: { r0: { 0: ["r0"], 1: ["r1"] }, r1: { 0: ["r2"], 1: ["r0"] }, r2: { 0: ["r1"], 1: ["r2"] } }, pos: { r0: [2, 3], r1: [5, 3], r2: [8, 3] } },
    "contains 11": { s: ["a", "b", "c"], start: "a", acc: ["c"], t: { a: { 0: ["a"], 1: ["b"] }, b: { 0: ["a"], 1: ["c"] }, c: { 0: ["c"], 1: ["c"] } }, pos: { a: [2, 3], b: [5, 3], c: [8, 3] } },
    "even # of 1s": { s: ["even", "odd"], start: "even", acc: ["even"], t: { even: { 0: ["even"], 1: ["odd"] }, odd: { 0: ["odd"], 1: ["even"] } }, pos: { even: [3, 3], odd: [7, 3] } },
  };
  const ring = (names, cx, cy, r) => { const o = {}; names.forEach((n, i) => { const a = Math.PI - (2 * Math.PI * i) / names.length; o[n] = [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }); return o; };
  const REDUNDANT = { s: ["A", "B", "C", "D", "E", "F", "G"], start: "A", acc: ["A", "B"], t: { A: { 0: ["B"], 1: ["C"] }, B: { 0: ["A"], 1: ["D"] }, C: { 0: ["C"], 1: ["E"] }, D: { 0: ["C"], 1: ["F"] }, E: { 0: ["F"], 1: ["A"] }, F: { 0: ["E"], 1: ["B"] }, G: { 0: ["G"], 1: ["G"] } }, pos: Object.assign(ring(["A", "C", "E", "F", "D", "B"], 4.6, 3.1, 2.5), { G: [9.3, 1.2] }) };

  V.register("g11-automata", {
    title: "Finite automata workbench", hint: "Pick a mode, then type a string of 0s and 1s",
    setup(A, a) {
      let mode = a.mode || "nfa", nk = a.machine && NFAS[a.machine] ? a.machine : "ends in 01", dk = a.machine && DFAS[a.machine] ? a.machine : "ends in 01", k = Infinity, round = 0, rx = String(a.regex || "(0+1)*01").replace(/_/g, " ");
      const P = A.plot({ x: [0, 10], y: [0.2, 5.8], h: 290 });
      const box = el("div", "tt-wrap"); A.stage.appendChild(box);
      const modes = [["nfa", "Run an NFA"], ["subset", "Subset construction"], ["regex", "Regular expression"], ["pump", "Pumping lemma"], ["minimize", "Minimize a DFA"]];
      A.seg(modes, mode, (v) => { mode = v; k = Infinity; round = 0; sync(); });
      const selN = A.select("NFA", Object.keys(NFAS), nk, (v) => { nk = v; k = Infinity; });
      const selD = A.select("DFA", Object.keys(DFAS), dk, (v) => { dk = v; });
      const rxW = el("div", "ctl"); rxW.innerHTML = "<label>Regex</label>"; const rxI = el("input"); rxI.type = "text"; rxI.value = rx; rxI.style.font = "600 14px var(--mono)"; rxI.style.minWidth = "170px"; rxW.appendChild(rxI); A.ctl().appendChild(rxW); rxI.oninput = () => { rx = rxI.value; A.draw(); };
      const inp = textInput(A, a.input != null ? String(a.input) : "1101", "String", (v) => v.replace(/[^01]/g, ""));
      inp.addEventListener("input", () => { k = Infinity; });
      const pump = A.slider("pump i", 0, 4, 1, 2);
      const stepBtns = btnRow(A, [{ label: "◀ back", on: () => { k = Math.max(0, Math.min(k, inp.value.length) - 1); round = Math.max(0, round - 1); } }, { label: "step ▶", on: () => { k = Math.min(inp.value.length, (k === Infinity ? inp.value.length : k) + 1); round++; } }, { label: "start", on: () => { k = 0; round = 0; } }]);
      function sync() {
        selN.el.parentElement.style.display = mode === "nfa" || mode === "subset" ? "" : "none";
        selD.el.parentElement.style.display = mode === "pump" ? "" : "none";
        rxW.style.display = mode === "regex" ? "" : "none";
        pump.el.parentElement.style.display = mode === "pump" ? "" : "none";
        inp.parentElement.style.display = mode === "minimize" ? "none" : "";
        stepBtns[0].el.parentElement.style.display = mode === "nfa" || mode === "minimize" ? "" : "none";
        P.cv.style.display = mode === "regex" ? "none" : "";
      }
      sync();
      A.draw = () => {
        const C = P.clear().P, s = inp.value;
        if (mode === "nfa" || mode === "subset") {
          const m = NFAS[nk]; let cur = closure(m, [m.start]); const trace = [cur]; for (const ch of s) { cur = move(m, cur, ch); trace.push(cur); }
          const kk = Math.min(k, s.length), act = trace[kk];
          drawMachine(P, m, { active: act });
          const fin = trace[s.length], ok = sortSet(m, fin).some((x) => m.acc.includes(x));
          if (mode === "nfa") {
            const shown = s.split("").map((ch, i) => (i === kk ? `<b style="color:var(--c-pink);text-decoration:underline">${ch}</b>` : i < kk ? ch : `<span style="opacity:.45">${ch}</span>`)).join("");
            box.innerHTML = `<div class="mono" style="text-align:center;font-size:14px;line-height:1.9">${trace.slice(0, kk + 1).map((S, i) => (i ? ` <span style="color:var(--muted)">—${s[i - 1]}→</span> ` : "") + `<b>${setStr(sortSet(m, S)) === "{}" ? "∅" : setStr(sortSet(m, S))}</b>`).join("")}</div>`;
            A.set(`<span class="k">input:</span> <span class="mono">${shown || "ε"}</span> <span class="k">read ${kk} of ${s.length} symbols. Pink = every state the NFA could be in.</span> ${kk === s.length ? (ok ? `<b style="color:var(--good)">ACCEPT</b> <span class="k">(some active state is accepting)</span>` : `<b style="color:var(--bad)">REJECT</b> <span class="k">(no active state is accepting)</span>`) : ""}`);
          } else {
            const key = (S) => setStr(sortSet(m, S)), start = closure(m, [m.start]), seen = new Map([[key(start), start]]), order = [start];
            for (let i = 0; i < order.length; i++) ["0", "1"].forEach((b) => { const T = move(m, order[i], b); if (!seen.has(key(T))) { seen.set(key(T), T); order.push(T); } });
            const nm = (S) => (S.size ? key(S) : "∅"), fk = key(fin);
            box.innerHTML = `<table class="tt"><thead><tr><th>DFA state (set of NFA states)</th><th>on 0</th><th>on 1</th><th>accepting?</th></tr></thead><tbody>${order.map((S) => `<tr style="${key(S) === fk ? "background:color-mix(in srgb,var(--c-pink) 18%,transparent)" : ""}"><td>${nm(S)}${S === start ? " (start)" : ""}</td><td>${nm(move(m, S, "0"))}</td><td>${nm(move(m, S, "1"))}</td><td class="${sortSet(m, S).some((x) => m.acc.includes(x)) ? "t" : "f"}">${sortSet(m, S).some((x) => m.acc.includes(x)) ? "yes" : "no"}</td></tr>`).join("")}</tbody></table>`;
            A.set(`<span class="k">NFA states:</span> <b>${m.s.length}</b> <span class="k">possible subsets 2^${m.s.length} =</span> <b>${2 ** m.s.length}</b> <span class="k">reachable DFA states:</span> <b>${order.length}</b> <span class="k">after "${s}" the DFA is in the highlighted row →</span> ${ok ? `<b style="color:var(--good)">ACCEPT</b>` : `<b style="color:var(--bad)">REJECT</b>`}`);
          }
        } else if (mode === "regex") {
          let re = null, err = "";
          if (/[^01|*()ε+∪ ]/.test(rx)) err = "Use only 0 1 ( ) * ε, and | or + or ∪ for union"; else { try { re = new RegExp("^(?:" + rx.replace(/\s+/g, "").replace(/[+∪]/g, "|").replace(/ε/g, "(?:)") + ")$"); } catch (e) { err = "Couldn't parse that expression"; } }
          if (err) { box.innerHTML = `<div class="viz-err">${err}</div>`; A.set(""); return; }
          const rows = []; let total = 0;
          for (let n = 0; n <= 5; n++) { const ws = []; for (let v = 0; v < 2 ** n; v++) { const w = n ? v.toString(2).padStart(n, "0") : ""; if (re.test(w)) ws.push(w || "ε"); } total += ws.length; rows.push(`<tr><td>${n}</td><td>${ws.length} / ${2 ** n}</td><td style="text-align:left;max-width:520px;white-space:normal">${ws.join(" ") || "<span style='opacity:.5'>none</span>"}</td></tr>`); }
          box.innerHTML = `<table class="tt"><thead><tr><th>length</th><th>matches</th><th>strings in L(${esc(rx)})</th></tr></thead><tbody>${rows.join("")}</tbody></table>`;
          A.set(`<span class="k">your string</span> <span class="mono">"${s}"</span> ${re.test(s) ? `<b style="color:var(--good)">is in the language</b>` : `<b style="color:var(--bad)">is not in the language</b>`} <span class="k">${total} strings of length ≤ 5 match</span>`);
        } else if (mode === "pump") {
          const m = DFAS[dk], p = m.s.length, path = [m.start]; for (const ch of s) path.push(m.t[path[path.length - 1]][ch][0]);
          const run = (w) => { let q = m.start; for (const ch of w) q = m.t[q][ch][0]; return q; };
          if (s.length < p) { drawMachine(P, m, { active: new Set([path[path.length - 1]]) }); box.innerHTML = `<div style="text-align:center">This DFA has p = <b>${p}</b> states. Type a string of length at least ${p} to see the pumping lemma in action.</div>`; A.set(""); return; }
          let I = 0, J = 0; outer: for (let j = 1; j <= p; j++) for (let i = 0; i < j; i++) if (path[i] === path[j]) { I = i; J = j; break outer; }
          const x = s.slice(0, I), y = s.slice(I, J), z = s.slice(J), ii = pump.v, w = x + y.repeat(ii) + z, q = run(w), acc0 = m.acc.includes(path[path.length - 1]), acc = m.acc.includes(q);
          const loopStates = new Set(path.slice(I, J + 1)); drawMachine(P, m, { active: new Set([path[I]]), hotEdge: (a1, b1) => { for (let t = I; t < J; t++) if (path[t] === a1 && path[t + 1] === b1) return true; return false; } });
          box.innerHTML = `<div class="mono" style="text-align:center;font-size:15px;line-height:2">state path: ${path.slice(0, p + 1).map((st, t) => (t === I || t === J ? `<b style="color:var(--c-pink)">${st}</b>` : st)).join(" → ")}${path.length > p + 1 ? " → …" : ""}<br>x = "<b>${x || "ε"}</b>"  y = "<b style="color:var(--c-pink)">${y}</b>"  z = "<b>${z || "ε"}</b>"   |xy| = ${I + y.length} ≤ p = ${p},  |y| = ${y.length} ≥ 1<br>x y<sup>${ii}</sup> z = "<b>${w || "ε"}</b>"</div>`;
          A.set(`<span class="k">State ${path[I]} repeats (pigeonhole: ${p + 1} visits, ${p} states), so y is a loop. Original:</span> ${acc0 ? "<b style='color:var(--good)'>accept</b>" : "<b style='color:var(--bad)'>reject</b>"} <span class="k">pumped i = ${ii}:</span> ${acc ? "<b style='color:var(--good)'>accept</b>" : "<b style='color:var(--bad)'>reject</b>"} <span class="k">${acc === acc0 ? "same answer, as the lemma promises" : ""}</span> ${loopStates.size ? "" : ""}`);
        } else {
          const m = REDUNDANT, reach = closure({ t: Object.fromEntries(m.s.map((q) => [q, { e: [m.t[q][0][0], m.t[q][1][0]] }])) }, [m.start]);
          const live = m.s.filter((q) => reach.has(q)); let blk = Object.fromEntries(live.map((q) => [q, m.acc.includes(q) ? 0 : 1])); const rounds = [blk];
          for (let r = 0; r < 6; r++) { const sig = {}, nb = {}, ids = new Map(); live.forEach((q) => { sig[q] = blk[q] + "|" + blk[m.t[q][0][0]] + "|" + blk[m.t[q][1][0]]; if (!ids.has(sig[q])) ids.set(sig[q], ids.size); nb[q] = ids.get(sig[q]); }); const same = ids.size === new Set(Object.values(blk)).size; blk = nb; if (same) break; rounds.push(nb); }
          const R = Math.min(round, rounds.length - 1), b = rounds[R], pal = [C.green, C.orange, C.blue, C.purple, C.teal, C.yellow], groups = {};
          live.forEach((q) => (groups[b[q]] = (groups[b[q]] || []).concat(q)));
          drawMachine(P, m, { colorOf: (q) => (reach.has(q) ? pal[b[q] % pal.length] : C.line2) });
          const prev = rounds[Math.max(0, R - 1)];
          box.innerHTML = `<table class="tt"><thead><tr><th>state</th><th>block now</th><th>on 0 goes to block</th><th>on 1 goes to block</th></tr></thead><tbody>${live.map((q) => `<tr><td>${q}</td><td>${b[q] + 1}</td><td>${b[m.t[q][0][0]] + 1}</td><td>${b[m.t[q][1][0]] + 1}</td></tr>`).join("")}</tbody></table>`;
          A.set(`<span class="k">round ${R}${R === 0 ? " (split accepting {A,B} from non-accepting; G is unreachable, so it is deleted)" : ""}:</span> <b>${Object.values(groups).map((g) => "{" + g.join(",") + "}").join("  ")}</b> <span class="k">${R === rounds.length - 1 ? `stable after ${R} refinement round(s): ${Object.keys(groups).length} states in the minimal DFA. Language: number of 1s divisible by 3.` : "press step ▶ to refine: states whose rows differ must split"}</span>${prev ? "" : ""}`);
        }
      };
    },
  });

  /* ---------- pushdown automata and parse trees ---------- */
  const PDAS = {
    "0ⁿ1ⁿ": { alpha: /[^01]/g, def: "000111", g: "S → 0S1 | ε", step(c, ch) { const top = c.st[c.st.length - 1]; if (ch === "0" && c.q === "push") return { q: "push", st: [...c.st, "0"], d: "read 0, push 0" }; if (ch === "1" && top === "0") return { q: "pop", st: c.st.slice(0, -1), d: "read 1, pop 0" }; return null; }, acc: (c) => c.st.length === 1 },
    "balanced ( )": { alpha: /[^()]/g, def: "(()())", g: "S → (S)S | ε", step(c, ch) { const top = c.st[c.st.length - 1]; if (ch === "(") return { q: "q", st: [...c.st, "("], d: "read (, push (" }; if (ch === ")" && top === "(") return { q: "q", st: c.st.slice(0, -1), d: "read ), pop (" }; return null; }, acc: (c) => c.st.length === 1 },
    "w c wᴿ (marked palindromes)": { alpha: /[^abc]/g, def: "abcba", g: "S → aSa | bSb | c", step(c, ch) { const top = c.st[c.st.length - 1]; if (c.q === "push" && ch === "c") return { q: "pop", st: c.st, d: "read c, switch to matching" }; if (c.q === "push" && ch !== "c") return { q: "push", st: [...c.st, ch], d: `read ${ch}, push ${ch}` }; if (c.q === "pop" && ch === top && ch !== "c") return { q: "pop", st: c.st.slice(0, -1), d: `read ${ch}, pop ${ch}` }; return null; }, acc: (c) => c.q === "pop" && c.st.length === 1 },
    "equal # of a and b": { alpha: /[^ab]/g, def: "abba", g: "S → aSbS | bSaS | ε", step(c, ch) { const top = c.st[c.st.length - 1], other = ch === "a" ? "b" : "a"; if (top === other) return { q: "q", st: c.st.slice(0, -1), d: `read ${ch}, pop ${other} (cancel)` }; return { q: "q", st: [...c.st, ch], d: `read ${ch}, push ${ch}` }; }, acc: (c) => c.st.length === 1 },
  };
  const EXPRS = { "2 + 3 × 4": [2, "+", 3, "×", 4], "8 − 4 − 2": [8, "−", 4, "−", 2], "2 × 3 + 4": [2, "×", 3, "+", 4], "16 ÷ 4 ÷ 2": [16, "÷", 4, "÷", 2] };
  const OPS = { "+": (x, y) => x + y, "−": (x, y) => x - y, "×": (x, y) => x * y, "÷": (x, y) => x / y };
  const PREC = { "+": 1, "−": 1, "×": 2, "÷": 2 };

  V.register("g11-pda", {
    title: "Pushdown automata and parse trees", hint: "Step through the input and watch the stack",
    setup(A, a) {
      let view = a.view || "pda", pk = a.machine && PDAS[a.machine] ? a.machine : "0ⁿ1ⁿ", k = Infinity, ek = Object.keys(EXPRS)[0], tree = 1;
      const P = A.plot({ x: [0, 10], y: [0, 6.2], h: 300 });
      const box = el("div", "tt-wrap"); A.stage.appendChild(box);
      A.seg([["pda", "Pushdown automaton"], ["tree", "Parse trees & ambiguity"]], view, (v) => { view = v; sync(); });
      const sel = A.select("Language", Object.keys(PDAS), pk, (v) => { pk = v; inp.value = PDAS[pk].def; k = Infinity; });
      const inp = textInput(A, a.input != null ? String(a.input) : PDAS[pk].def, "Input", (v) => v.replace(PDAS[pk].alpha, "")); inp.addEventListener("input", () => (k = Infinity));
      const bt = btnRow(A, [{ label: "◀ back", on: () => (k = Math.max(0, Math.min(k, inp.value.length) - 1)) }, { label: "step ▶", on: () => (k = Math.min(inp.value.length, (k === Infinity ? inp.value.length : k) + 1)) }, { label: "start", on: () => (k = 0) }]);
      const selE = A.select("Expression", Object.keys(EXPRS), ek, (v) => (ek = v));
      const tseg = A.seg([[1, "Tree 1: group left (a∘b)∘c"], [2, "Tree 2: group right a∘(b∘c)"]], tree, (v) => (tree = v));
      function sync() { [sel.el.parentElement, inp.parentElement, bt[0].el.parentElement].forEach((e) => (e.style.display = view === "pda" ? "" : "none")); [selE.el.parentElement, tseg].forEach((e) => (e.style.display = view === "tree" ? "" : "none")); }
      sync();
      A.draw = () => {
        const C = P.clear().P;
        if (view === "pda") {
          const M = PDAS[pk], s = inp.value; let c = { q: pk === "0ⁿ1ⁿ" || pk.startsWith("w c") ? "push" : "q", st: ["$"], d: "start: push $ (bottom marker)" }; const tr = [c]; let dead = -1;
          for (let i = 0; i < s.length; i++) { const n = M.step(c, s[i]); if (!n) { dead = i; break; } c = n; tr.push(c); }
          const kk = Math.min(k, s.length), cfg = tr[Math.min(kk, tr.length - 1)], died = dead >= 0 && kk > dead;
          const cw = Math.min(0.8, 6.4 / Math.max(1, s.length));
          P.text("input tape", 0.4, 5.6, { align: "left", color: C.muted, size: 12 });
          for (let i = 0; i < s.length; i++) { const x0 = 0.4 + i * cw; P.rect(x0, 4.4, cw * 0.92, 0.8, { color: C.line2, fill: i < Math.min(kk, tr.length - 1) ? C.accent : C.bg2, fa: i < Math.min(kk, tr.length - 1) ? 0.25 : 1, width: 1.2 }); P.text(s[i], x0 + cw * 0.46, 4.8, { dy: 5, size: 14, mono: true }); }
          const hx = 0.4 + Math.min(kk, s.length) * cw + cw * 0.46; P.arrow(hx, 3.6, hx, 4.3, { color: C.pink, width: 2.5, head: 9 }); P.text("head", hx, 3.3, { color: C.pink, size: 11 });
          P.text(`state: ${died ? "stuck" : cfg.q}`, 0.4, 2.4, { align: "left", size: 14 }); P.text(died ? `no move for "${s[dead]}" → reject` : cfg.d, 0.4, 1.6, { align: "left", size: 13, color: C.muted });
          P.text("grammar: " + M.g, 0.4, 0.7, { align: "left", size: 13, color: C.purple });
          P.text("stack", 8.6, 5.6, { color: C.muted, size: 12 }); const st = cfg.st, h = Math.min(0.7, 4.6 / Math.max(1, st.length));
          st.forEach((x, i) => { const y0 = 0.3 + i * h; P.rect(7.8, y0, 1.6, h * 0.9, { color: C.line2, fill: i === st.length - 1 ? C.pink : C.bg2, fa: i === st.length - 1 ? 0.3 : 1, width: 1.2 }); P.text(x, 8.6, y0 + h * 0.45, { dy: 5, size: 13, mono: true }); });
          box.innerHTML = ""; const ok = dead < 0 && M.acc(c);
          A.set(`<span class="k">read ${Math.min(kk, tr.length - 1)} of ${s.length} symbols, stack height (without $)</span> <b>${st.length - 1}</b> ${kk === s.length ? (ok ? `<b style="color:var(--good)">ACCEPT</b> <span class="k">input used up with only $ left${pk.startsWith("w c") ? " after the c" : ""}</span>` : `<b style="color:var(--bad)">REJECT</b> <span class="k">${dead >= 0 ? "a symbol had no legal move" : "input ended but the stack is not back to $"}</span>`) : ""}`);
        } else {
          const [x, o1, y, o2, z] = EXPRS[ek], v1 = tree === 1 ? OPS[o2](OPS[o1](x, y), z) : OPS[o1](x, OPS[o2](y, z)), inner = tree === 1 ? OPS[o1](x, y) : OPS[o2](y, z);
          const N = tree === 1 ? { r: [5, 5.4], L: [2.6, 4.1], op: [5.6, 4.1], R: [8, 4.1], a: [1, 2.7], o: [2.6, 2.7], b: [4.2, 2.7] } : { r: [5, 5.4], L: [2, 4.1], op: [4.4, 4.1], R: [7.4, 4.1], a: [5.8, 2.7], o: [7.4, 2.7], b: [9, 2.7] };
          const sub = tree === 1 ? "L" : "R", leafX = tree === 1 ? [1, 4.2, 8] : [2, 5.8, 9], line = (p, q) => P.line(p[0], p[1] - 0.3, q[0], q[1] + 0.3, { color: C.muted, width: 1.5 });
          ["L", "op", "R"].forEach((n) => line(N.r, N[n])); ["a", "o", "b"].forEach((n) => line(N[sub], N[n]));
          const leaves = [[leafX[0], x], [leafX[1], y], [leafX[2], z]], parents = tree === 1 ? [N.a, N.b, N.R] : [N.L, N.a, N.b];
          leaves.forEach(([lx, val], i) => { line(parents[i], [lx, 1.2]); P.text(String(val), lx, 1.2, { dy: 5, size: 16, mono: true, color: C.accent }); });
          const node = (p, t, col, val) => { P.circle(p[0], p[1], 0.36, { color: col, width: 2, fill: C.bg, fa: 1 }); P.text(t, p[0], p[1], { dy: 5, size: 13, color: col }); if (val != null) P.text("= " + (+val.toFixed(3)), p[0] + 0.5, p[1] + 0.25, { align: "left", size: 11, color: C.green }); };
          node(N.r, "E", C.ink, v1); node(N[sub], "E", C.ink, inner); ["a", "b"].forEach((n) => node(N[n], "E", C.ink)); node(tree === 1 ? N.R : N.L, "E", C.ink);
          P.text(tree === 1 ? o2 : o1, N.op[0], N.op[1], { dy: 6, size: 18, color: C.pink }); P.text(tree === 1 ? o1 : o2, N.o[0], N.o[1], { dy: 6, size: 18, color: C.pink });
          const der = tree === 1 ? [`E`, `E ${o2} E`, `E ${o1} E ${o2} E`, `${x} ${o1} E ${o2} E`, `${x} ${o1} ${y} ${o2} E`, `${x} ${o1} ${y} ${o2} ${z}`] : [`E`, `E ${o1} E`, `${x} ${o1} E`, `${x} ${o1} E ${o2} E`, `${x} ${o1} ${y} ${o2} E`, `${x} ${o1} ${y} ${o2} ${z}`];
          const vOther = tree === 1 ? OPS[o1](x, OPS[o2](y, z)) : OPS[o2](OPS[o1](x, y), z), std = PREC[o2] > PREC[o1] ? 2 : 1;
          box.innerHTML = `<div style="text-align:center;font-size:14px">Grammar <span class="mono">E → E + E | E − E | E × E | E ÷ E | number</span><br>leftmost derivation: <span class="mono">${der.join(" ⇒ ")}</span></div>`;
          A.set(`<span class="k">this tree evaluates to</span> <b>${+v1.toFixed(3)}</b> <span class="k">the other tree gives</span> <b>${+vOther.toFixed(3)}</b> <span class="k">same string, two trees: the grammar is ambiguous. The precedence grammar E → E+T | T, T → T×F | F, F → number always builds</span> <b>Tree ${std}</b>`);
        }
      };
    },
  });

  /* ---------- Turing machines ---------- */
  const R_ = "R", L_ = "L";
  const TMS = {
    "binary increment (+1)": { alpha: /[^01]/g, def: "1011", d: { right: { 0: ["0", R_, "right"], 1: ["1", R_, "right"], _: ["_", L_, "carry"] }, carry: { 1: ["0", L_, "carry"], 0: ["1", L_, "halt"], _: ["1", L_, "halt"] } }, start: "right", note: "Walks to the right end, then adds 1 with carries." },
    "decide 0ⁿ1ⁿ": { alpha: /[^01]/g, def: "0011", d: { q0: { 0: ["X", R_, "q1"], Y: ["Y", R_, "q3"], _: ["_", R_, "accept"], 1: ["1", R_, "reject"] }, q1: { 0: ["0", R_, "q1"], Y: ["Y", R_, "q1"], 1: ["Y", L_, "q2"], _: ["_", R_, "reject"] }, q2: { 0: ["0", L_, "q2"], Y: ["Y", L_, "q2"], X: ["X", R_, "q0"] }, q3: { Y: ["Y", R_, "q3"], _: ["_", R_, "accept"], 0: ["0", R_, "reject"], 1: ["1", R_, "reject"] } }, start: "q0", note: "Crosses off one 0 (X) and one 1 (Y) per pass: about n² steps." },
    "decide palindromes": { alpha: /[^01]/g, def: "0110", d: { q0: { 0: ["_", R_, "has0"], 1: ["_", R_, "has1"], _: ["_", R_, "accept"] }, has0: { 0: ["0", R_, "has0"], 1: ["1", R_, "has0"], _: ["_", L_, "chk0"] }, has1: { 0: ["0", R_, "has1"], 1: ["1", R_, "has1"], _: ["_", L_, "chk1"] }, chk0: { 0: ["_", L_, "back"], 1: ["1", L_, "reject"], _: ["_", R_, "accept"] }, chk1: { 1: ["_", L_, "back"], 0: ["0", L_, "reject"], _: ["_", R_, "accept"] }, back: { 0: ["0", L_, "back"], 1: ["1", L_, "back"], _: ["_", R_, "q0"] } }, start: "q0", note: "Erases matching first and last symbols, then repeats." },
    "unary addition": { alpha: /[^1+]/g, def: "111+11", d: { q0: { 1: ["1", R_, "q0"], "+": ["1", R_, "q1"] }, q1: { 1: ["1", R_, "q1"], _: ["_", L_, "q2"] }, q2: { 1: ["_", L_, "halt"] } }, start: "q0", note: "Turns 111+11 into 11111 (3 + 2 = 5)." },
    "3-state busy beaver": { alpha: /[^]/g, def: "", blank: "0", d: { A: { 0: ["1", R_, "B"], 1: ["1", R_, "halt"] }, B: { 0: ["0", R_, "C"], 1: ["1", R_, "B"] }, C: { 0: ["1", L_, "C"], 1: ["1", L_, "A"] } }, start: "A", note: "Starts on a blank tape, writes six 1s and halts." },
    "loops when there is no 1": { alpha: /[^01]/g, def: "000", d: { q0: { 0: ["0", R_, "q0"], 1: ["1", R_, "accept"], _: ["_", R_, "q0"] } }, start: "q0", note: "Accepts if it finds a 1; otherwise walks right forever. A recognizer, not a decider." },
  };
  const HALT = new Set(["halt", "accept", "reject"]);
  V.register("g11-tm", {
    title: "Turing machine simulator", hint: "Choose a machine, then Step or Run",
    setup(A, a) {
      let mk = a.machine && TMS[a.machine] ? a.machine : "binary increment (+1)", cfg, steps, cap = 3000;
      const P = A.plot({ x: [0, 15], y: [0, 4], h: 200, equal: false });
      const box = el("div", "tt-wrap"); A.stage.appendChild(box);
      A.select("Machine", Object.keys(TMS), mk, (v) => { mk = v; inp.value = TMS[mk].def; reset(); });
      const inp = textInput(A, a.input != null ? String(a.input) : TMS[mk].def, "Input", (v) => v.replace(TMS[mk].alpha, "")); inp.addEventListener("input", () => reset());
      const blank = () => TMS[mk].blank || "_";
      const reset = () => { A.stop(); const t = {}; inp.value.split("").forEach((ch, i) => (t[i] = ch)); cfg = { t, h: 0, q: TMS[mk].start, last: null }; steps = 0; };
      const step = () => { if (HALT.has(cfg.q)) return false; const sym = cfg.t[cfg.h] ?? blank(), r = (TMS[mk].d[cfg.q] || {})[sym === "0" && blank() === "0" ? "0" : sym]; if (!r) { cfg.last = { q: cfg.q, sym, none: true }; cfg.q = mk === "binary increment (+1)" || mk === "unary addition" ? "halt" : "reject"; return false; } cfg.last = { q: cfg.q, sym, r }; cfg.t[cfg.h] = r[0]; cfg.h += r[1] === R_ ? 1 : -1; cfg.q = r[2]; steps++; return !HALT.has(cfg.q); };
      A.buttons([{ label: "step ▶", on: () => step() }, { label: "▶ run", on: () => A.loop(() => { for (let i = 0; i < 3; i++) if (!step() || steps >= cap) { A.draw(); return false; } A.draw(); }) }, { label: "finish", on: () => { while (steps < cap && step()); } }, { label: "reset", on: () => reset() }]);
      reset();
      A.draw = () => {
        const C = P.clear().P, n = 15, lo = cfg.h - 7, b = blank();
        for (let i = 0; i < n; i++) { const pos = lo + i, sym = cfg.t[pos] ?? b, here = pos === cfg.h; P.rect(i + 0.05, 1.4, 0.9, 1.1, { color: here ? C.pink : C.line2, width: here ? 2.5 : 1.2, fill: here ? C.pink : C.bg2, fa: here ? 0.18 : 1 }); P.text(sym === "_" ? "␣" : sym, i + 0.5, 1.95, { dy: 6, size: 17, mono: true, color: sym === b ? C.muted : C.ink }); }
        P.arrow(7.5, 3.5, 7.5, 2.6, { color: C.pink, width: 2.5, head: 10 }); P.text(cfg.q, 7.5, 3.65, { size: 14, color: HALT.has(cfg.q) ? (cfg.q === "reject" ? C.bad : C.good) : C.ink });
        P.text("… infinite tape in both directions …", 7.5, 0.6, { size: 11, color: C.muted });
        const D = TMS[mk].d, syms = [...new Set(Object.values(D).flatMap((r) => Object.keys(r)))];
        box.innerHTML = `<table class="tt"><thead><tr><th>state</th>${syms.map((x) => `<th>read ${x === "_" ? "␣" : x}</th>`).join("")}</tr></thead><tbody>${Object.keys(D).map((q) => `<tr>${`<td>${q}</td>`}${syms.map((x) => { const r = D[q][x], hot = cfg.last && cfg.last.q === q && cfg.last.sym === x && !cfg.last.none; return `<td style="${hot ? "background:color-mix(in srgb,var(--c-pink) 22%,transparent);font-weight:700" : ""}">${r ? `${r[0] === "_" ? "␣" : r[0]}, ${r[1]}, ${r[2]}` : "—"}</td>`; }).join("")}</tr>`).join("")}</tbody></table><div style="text-align:center;margin-top:8px;color:var(--muted);font-size:13px">${TMS[mk].note} Each cell is (write, move, next state); — means no rule, so the machine halts there.</div>`;
        const ones = Object.values(cfg.t).filter((x) => x === "1").length, len = inp.value.length, tape = (() => { const ks = Object.keys(cfg.t).map(Number).filter((i) => cfg.t[i] !== b); if (!ks.length) return "(blank)"; let s = ""; for (let i = Math.min(...ks); i <= Math.max(...ks); i++) s += cfg.t[i] ?? b; return s.replace(/_/g, "␣"); })();
        const status = HALT.has(cfg.q) ? `<b style="color:${cfg.q === "reject" ? "var(--bad)" : "var(--good)"}">${cfg.q.toUpperCase()}</b>` : steps >= cap ? `<b style="color:var(--warn)">still running after ${cap} steps</b> <span class="k">(has it looped forever? In general no program can always tell: that is the halting problem)</span>` : `<span class="k">running</span>`;
        A.set(`<span class="k">steps</span> <b>${steps}</b> <span class="k">input length n =</span> <b>${len}</b>${len ? ` <span class="k">n² =</span> <b>${len * len}</b>` : ""} <span class="k">tape:</span> <span class="mono">${tape}</span>${mk.startsWith("3-state") ? ` <span class="k">1s written</span> <b>${ones}</b>` : ""} ${status}${cfg.last && cfg.last.r ? ` <span class="k">last rule δ(${cfg.last.q}, ${cfg.last.sym === "_" ? "␣" : cfg.last.sym}) = (${cfg.last.r[2]}, ${cfg.last.r[0] === "_" ? "␣" : cfg.last.r[0]}, ${cfg.last.r[1]})</span>` : ""}`);
      };
    },
  });
})();
