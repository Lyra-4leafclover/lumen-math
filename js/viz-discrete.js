/* Discrete math & CS visuals: logic, binary, graphs, number theory, combinatorics, automata, algorithms */
(function () {
  const V = window.Viz, { fmt, clamp, rng } = V.util;
  const R = (n, d = 2) => fmt(n, d);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  function parseLogic(src) {
    const toks = src.replace(/\s+/g, "").replace(/<->|<=>|↔/g, "≡").replace(/->|=>|→/g, "⇒").replace(/&&|\^|∧|&/g, "∧").replace(/\|\||∨|\|/g, "∨").replace(/!|~|¬/g, "¬").replace(/⊕|xor/gi, "⊕").split("");
    let i = 0; const vars = new Set();
    const peek = () => toks[i], eat = (c) => (toks[i] === c ? (i++, true) : false);
    const prim = () => { if (eat("(")) { const e = iff(); if (!eat(")")) throw "missing )"; return e; } if (eat("¬")) { const e = prim(); return (env) => !e(env); } const c = toks[i++]; if (c === "T" || c === "1") return () => true; if (c === "F" || c === "0") return () => false; if (!c || !/[a-zA-Z]/.test(c)) throw "unexpected " + (c || "end"); vars.add(c); return (env) => env[c]; };
    const and = () => { let l = prim(); while (peek() === "∧") { i++; const a = l, b = prim(); l = (e) => a(e) && b(e); } return l; };
    const xor = () => { let l = and(); while (peek() === "⊕") { i++; const a = l, b = and(); l = (e) => a(e) !== b(e); } return l; };
    const or = () => { let l = xor(); while (peek() === "∨") { i++; const a = l, b = xor(); l = (e) => a(e) || b(e); } return l; };
    const imp = () => { const l = or(); if (peek() === "⇒") { i++; const r = imp(); return (e) => !l(e) || r(e); } return l; };
    const iff = () => { let l = imp(); while (peek() === "≡") { i++; const a = l, b = imp(); l = (e) => a(e) === b(e); } return l; };
    const f = iff(); if (i < toks.length) throw "unexpected " + toks[i]; return { f, vars: [...vars].sort() };
  }
  V.util.parseLogic = parseLogic;

  V.register("truth-table", {
    title: "Truth table builder", hint: "Type any formula: p, q, r with ¬ ∧ ∨ → ↔ ⊕",
    setup(A, a) {
      const ctl = A.ctl(); const inp = el("input"); inp.type = "text"; inp.value = (a.expr || "(p -> q) <-> (!q -> !p)").replace(/_/g, " "); inp.style.flex = "1"; inp.style.minWidth = "220px"; inp.setAttribute("aria-label", "Formula");
      ctl.appendChild(inp); A.seg([["(p -> q) <-> (!q -> !p)", "contrapositive"], ["!(p & q) <-> (!p | !q)", "De Morgan"], ["p | !p", "tautology"], ["(p -> q) & p & !q", "contradiction"], ["(p ^ q) | r", "mixed"]], null, (v) => (inp.value = v));
      const box = el("div", "tt-wrap"); A.stage.appendChild(box); inp.oninput = () => A.draw();
      A.draw = () => {
        let res; try { res = parseLogic(inp.value); } catch (e) { box.innerHTML = `<div class="viz-err">Couldn't parse: ${e}</div>`; A.set(""); return; }
        const { f, vars } = res, n = vars.length, rows = []; let t = 0;
        for (let m = 0; m < 1 << n; m++) { const env = {}; vars.forEach((v, j) => (env[v] = !((m >> (n - 1 - j)) & 1))); const r = f(env); t += r; rows.push(`<tr>${vars.map((v) => `<td class="${env[v] ? "t" : "f"}">${env[v] ? "T" : "F"}</td>`).join("")}<td class="res ${r ? "t" : "f"}">${r ? "T" : "F"}</td></tr>`); }
        box.innerHTML = `<table class="tt"><thead><tr>${vars.map((v) => `<th>${v}</th>`).join("")}<th class="res">${inp.value.replace(/</g, "&lt;")}</th></tr></thead><tbody>${rows.join("")}</tbody></table>`;
        A.set(`<b>${t}</b><span class="k">/${1 << n} rows true →</span> <b>${t === 1 << n ? "tautology (always true)" : t === 0 ? "contradiction (never true)" : "contingent (satisfiable)"}</b>`);
      };
    },
  });

  V.register("gates", {
    title: "Logic gates and circuits", hint: "Click the inputs to toggle them",
    setup(A, a) {
      const C0 = { "half adder": { ins: ["A", "B"], outs: { Sum: (x) => x.A !== x.B, Carry: (x) => x.A && x.B }, d: "Sum = A ⊕ B, Carry = A ∧ B" }, "full adder": { ins: ["A", "B", "Cin"], outs: { Sum: (x) => (x.A !== x.B) !== x.Cin, Cout: (x) => (x.A && x.B) || (x.Cin && x.A !== x.B) }, d: "Sum = A ⊕ B ⊕ Cin, Cout = AB + Cin(A ⊕ B)" }, AND: { ins: ["A", "B"], outs: { Out: (x) => x.A && x.B }, d: "1 only if both are 1" }, OR: { ins: ["A", "B"], outs: { Out: (x) => x.A || x.B }, d: "1 if at least one is 1" }, XOR: { ins: ["A", "B"], outs: { Out: (x) => x.A !== x.B }, d: "1 if inputs differ" }, NAND: { ins: ["A", "B"], outs: { Out: (x) => !(x.A && x.B) }, d: "universal: every gate can be built from NANDs" }, NOT: { ins: ["A"], outs: { Out: (x) => !x.A }, d: "flips the bit" }, "2:1 mux": { ins: ["S", "A", "B"], outs: { Out: (x) => (x.S ? x.B : x.A) }, d: "S picks which input passes through" } };
      let k = a.circuit || "half adder"; const st = {};
      A.select("Circuit", Object.keys(C0), k, (v) => (k = v));
      const box = el("div", "gates"); A.stage.appendChild(box);
      A.draw = () => {
        const c = C0[k]; c.ins.forEach((i) => (st[i] = !!st[i]));
        box.innerHTML = `<div class="g-col">${c.ins.map((i) => `<button class="bit ${st[i] ? "on" : ""}" data-i="${i}">${i}<b>${st[i] ? 1 : 0}</b></button>`).join("")}</div><div class="g-box">${k}<small>${c.d}</small></div><div class="g-col">${Object.entries(c.outs).map(([o, f]) => `<div class="bit out ${f(st) ? "on" : ""}">${o}<b>${f(st) ? 1 : 0}</b></div>`).join("")}</div>`;
        box.querySelectorAll("button").forEach((b) => (b.onclick = () => { st[b.dataset.i] = !st[b.dataset.i]; A.draw(); }));
        const rows = []; for (let m = 0; m < 1 << c.ins.length; m++) { const e = {}; c.ins.forEach((v, j) => (e[v] = !!((m >> (c.ins.length - 1 - j)) & 1))); rows.push(c.ins.map((v) => +e[v]).join("") + "→" + Object.values(c.outs).map((f) => +f(e)).join("")); }
        A.set(`<span class="k">full truth table:</span> <span class="mono">${rows.join("  ")}</span>`);
      };
    },
  });

  V.register("binary", {
    title: "Bits, binary, hex and two's complement", hint: "Click bits to flip them",
    setup(A, a) {
      const n = a.bits || 8; let bits = new Array(n).fill(0); let v0 = a.value ?? 45; for (let i = 0; i < n; i++) bits[n - 1 - i] = (v0 >> i) & 1;
      const box = el("div", "bits"); A.stage.appendChild(box);
      A.buttons([{ label: "+1", on: () => setV(val() + 1) }, { label: "−1", on: () => setV(val() - 1) }, { label: "<< 1", on: () => setV(val() << 1) }, { label: ">> 1", on: () => setV(val() >> 1) }, { label: "NOT", on: () => setV(~val()) }, { label: "negate (two's comp.)", on: () => setV(-val()) }]);
      const val = () => bits.reduce((s, b) => s * 2 + b, 0), setV = (v) => { v = ((v % 2 ** n) + 2 ** n) % 2 ** n; for (let i = 0; i < n; i++) bits[n - 1 - i] = (v >> i) & 1; };
      A.draw = () => {
        box.innerHTML = bits.map((b, i) => `<button class="bit ${b ? "on" : ""}" data-i="${i}"><small>2<sup>${n - 1 - i}</sup></small><b>${b}</b><small>${2 ** (n - 1 - i)}</small></button>`).join("");
        box.querySelectorAll("button").forEach((x) => (x.onclick = () => { bits[+x.dataset.i] ^= 1; A.draw(); }));
        const u = val(), s = bits[0] ? u - 2 ** n : u;
        A.set(`<span class="k">unsigned</span> <b>${u}</b> <span class="k">signed (two's complement)</span> <b>${s}</b> <span class="k">hex</span> <b class="mono">0x${u.toString(16).toUpperCase().padStart(n / 4, "0")}</b> <span class="k">octal</span> <b class="mono">${u.toString(8)}</b> <span class="k">sum of lit place values = ${bits.map((b, i) => (b ? 2 ** (n - 1 - i) : 0)).filter(Boolean).join(" + ") || 0}</span>`);
      };
    },
  });

  const GRAPHS = {
    sample: { n: [[1, 3], [3, 5.5], [3, 0.5], [5.5, 3], [7.5, 5.5], [7.5, 0.5], [9.5, 3]], e: [[0, 1, 4], [0, 2, 2], [1, 2, 1], [1, 3, 5], [2, 3, 8], [2, 5, 10], [3, 4, 2], [3, 5, 6], [4, 6, 3], [5, 6, 1], [4, 5, 2]] },
    tree: { n: [[5, 5.5], [2.5, 3.8], [7.5, 3.8], [1, 2], [4, 2], [6.5, 2], [9, 2], [0.3, 0.3], [1.8, 0.3]], e: [[0, 1, 1], [0, 2, 1], [1, 3, 1], [1, 4, 1], [2, 5, 1], [2, 6, 1], [3, 7, 1], [3, 8, 1]] },
    grid: { n: Array.from({ length: 12 }, (_, i) => [1 + (i % 4) * 2.6, 0.6 + Math.floor(i / 4) * 2.4]), e: [[0, 1, 2], [1, 2, 7], [2, 3, 1], [4, 5, 3], [5, 6, 2], [6, 7, 4], [8, 9, 1], [9, 10, 5], [10, 11, 2], [0, 4, 3], [1, 5, 1], [2, 6, 6], [3, 7, 2], [4, 8, 4], [5, 9, 2], [6, 10, 1], [7, 11, 3]] },
  };
  V.register("graph", {
    title: "Graph algorithms, step by step", hint: "Pick an algorithm and press Play",
    setup(A, a) {
      let gk = a.graph || "sample", alg = a.alg || "bfs", src = 0, steps = [], si = 0, directed = false;
      const P = A.plot({ x: [0, 10.5], y: [-0.4, 6.2], h: 360 });
      A.select("Graph", Object.keys(GRAPHS), gk, (v) => { gk = v; G = clone(); src = 0; run(); });
      A.seg([["bfs", "BFS"], ["dfs", "DFS"], ["dijkstra", "Dijkstra"], ["prim", "Prim MST"], ["kruskal", "Kruskal MST"]], alg, (v) => { alg = v; run(); });
      A.buttons([{ label: "▶ Play", on: () => { si = 0; let t = 0; A.loop((dt) => { t += dt; if (t > 0.6) { t = 0; si++; } A.draw(); return si < steps.length - 1; }); } }, { label: "Step", on: () => (si = Math.min(si + 1, steps.length - 1)) }, { label: "Reset", on: () => { A.stop(); si = 0; } }]);
      const clone = () => ({ n: GRAPHS[gk].n.map((p) => p.slice()), e: GRAPHS[gk].e.map((x) => x.slice()) }); let G = clone();
      P.onClick = (x, y) => { const d = G.n.map((p, i) => [Math.hypot(p[0] - x, p[1] - y), i]).sort((a, b) => a[0] - b[0])[0]; if (d[0] < 0.6) { src = d[1]; run(); A.draw(); } };
      G.n.forEach((_, i) => P.handle(() => G.n[i] || [0, 0], (x, y) => { G.n[i][0] = x; G.n[i][1] = y; }, { hidden: () => !G.n[i] }));
      const adj = () => { const L = G.n.map(() => []); G.e.forEach(([u, v, w], k) => { L[u].push([v, w, k]); L[v].push([u, w, k]); }); L.forEach((l) => l.sort((a, b) => a[0] - b[0])); return L; };
      function run() {
        const L = adj(), N = G.n.length; steps = []; si = 0;
        const snap = (o) => steps.push(JSON.parse(JSON.stringify(o)));
        if (alg === "bfs" || alg === "dfs") {
          const seen = new Array(N).fill(false), order = [], tree = [], dist = new Array(N).fill(null); let fr = [src]; seen[src] = true; dist[src] = 0;
          snap({ vis: [], fr: [src], tree: [], cur: null, dist, msg: `Start at ${src}. ${alg === "bfs" ? "Queue" : "Stack"}: [${src}]` });
          while (fr.length) { const u = alg === "bfs" ? fr.shift() : fr.pop(); if (alg === "dfs" && order.includes(u)) continue; order.push(u); seen[u] = true;
            for (const [v, , k] of alg === "dfs" ? L[u].slice().reverse() : L[u]) if (!seen[v] && (alg === "bfs" || !order.includes(v))) { if (alg === "bfs") { seen[v] = true; dist[v] = dist[u] + 1; tree.push(k); } else { tree.push(k); } fr.push(v); }
            snap({ vis: order.slice(), fr: fr.slice(), tree: alg === "bfs" ? tree.slice() : [], cur: u, dist, msg: `Visit ${u}. ${alg === "bfs" ? "Queue" : "Stack"}: [${fr.join(", ")}]   order: ${order.join(" → ")}` }); }
        } else if (alg === "dijkstra") {
          const d = new Array(N).fill(Infinity), done = new Array(N).fill(false), par = new Array(N).fill(-1); d[src] = 0;
          for (let it = 0; it < N; it++) { let u = -1; for (let i = 0; i < N; i++) if (!done[i] && (u < 0 || d[i] < d[u])) u = i; if (u < 0 || d[u] === Infinity) break; done[u] = true;
            for (const [v, w, k] of L[u]) if (d[u] + w < d[v]) { d[v] = d[u] + w; par[v] = k; }
            snap({ vis: done.map((x, i) => (x ? i : -1)).filter((x) => x >= 0), fr: [], tree: par.filter((x) => x >= 0), cur: u, dist: d.map((x) => (x === Infinity ? "∞" : x)), msg: `Finalize ${u} (dist ${d[u]}), relax its edges. Distances: ${d.map((x, i) => i + ":" + (x === Infinity ? "∞" : x)).join("  ")}` }); }
        } else if (alg === "prim") {
          const inT = new Array(N).fill(false), tree = []; inT[src] = true; let tot = 0; snap({ vis: [src], tree: [], cur: src, fr: [], msg: `Grow a tree from ${src}` });
          for (let it = 1; it < N; it++) { let best = null; G.e.forEach(([u, v, w], k) => { if (inT[u] !== inT[v] && (!best || w < best[0])) best = [w, k, inT[u] ? v : u]; }); if (!best) break; inT[best[2]] = true; tree.push(best[1]); tot += best[0];
            snap({ vis: inT.map((x, i) => (x ? i : -1)).filter((x) => x >= 0), tree: tree.slice(), cur: best[2], fr: [], msg: `Cheapest edge leaving the tree has weight ${best[0]} → add vertex ${best[2]}. Total weight ${tot}` }); }
        } else {
          const par = G.n.map((_, i) => i), find = (x) => (par[x] === x ? x : (par[x] = find(par[x]))), tree = [], rej = []; let tot = 0;
          const order = G.e.map((e, k) => [e[2], k]).sort((a, b) => a[0] - b[0]); snap({ vis: [], tree: [], rej: [], cur: null, fr: [], msg: `Sort edges by weight: ${order.map((x) => x[0]).join(", ")}` });
          for (const [w, k] of order) { const [u, v] = G.e[k]; if (find(u) !== find(v)) { par[find(u)] = find(v); tree.push(k); tot += w; snap({ vis: [], tree: tree.slice(), rej: rej.slice(), cur: null, fr: [], msg: `Edge ${u}–${v} (w=${w}) joins two components → keep. Total ${tot}` }); } else { rej.push(k); snap({ vis: [], tree: tree.slice(), rej: rej.slice(), cur: null, fr: [], msg: `Edge ${u}–${v} (w=${w}) would make a cycle → skip` }); } }
        }
      }
      run();
      A.draw = () => {
        const C = P.clear().P, s = steps[Math.min(si, steps.length - 1)] || { vis: [], tree: [], fr: [] }, weighted = alg !== "bfs" && alg !== "dfs";
        G.e.forEach(([u, v, w], k) => { const on = s.tree.includes(k), rj = (s.rej || []).includes(k); P.line(...G.n[u], ...G.n[v], { color: on ? C.accent : rj ? C.bad : C.line2, width: on ? 4 : 2, alpha: rj ? 0.4 : 1 }); if (weighted) P.text(String(w), (G.n[u][0] + G.n[v][0]) / 2, (G.n[u][1] + G.n[v][1]) / 2, { dy: 4, size: 12, color: C.muted }); });
        G.n.forEach((p, i) => { const vis = s.vis.includes(i), fr = s.fr.includes(i), cur = s.cur === i; P.dot(p[0], p[1], 16, { color: cur ? C.pink : vis ? C.accent : fr ? C.yellow : C.bg2, stroke: i === src ? C.ink : C.line2, sw: i === src ? 3 : 1.5 }); P.text(String(i), p[0], p[1], { dy: 5, color: vis || cur ? "#fff" : C.ink, halo: false, size: 13 }); if (s.dist && s.dist[i] != null && alg !== "dfs") P.text(String(s.dist[i]), p[0], p[1], { dy: -22, color: C.pink, size: 12 }); });
        A.set(`<span class="k">step ${si + 1}/${steps.length}</span> <b>${s.msg || ""}</b> <span class="k">(click a vertex to make it the source; drag to move)</span>`);
      };
    },
  });

  V.register("modular", {
    title: "Modular arithmetic on a clock", hint: "Pick m and a multiplier",
    setup(A, a) {
      const P = A.plot({ x: [-1.35, 1.35], y: [-1.3, 1.3], h: 360 }), m = A.slider("modulus m", 2, 60, 1, a.m ?? 12), k = A.slider("multiply by k", 0, 30, 1, a.k ?? 5);
      A.draw = () => {
        const C = P.clear().P, M = m.v, pos = (i) => [Math.sin((2 * Math.PI * i) / M), Math.cos((2 * Math.PI * i) / M)];
        P.circle(0, 0, 1, { color: C.line2, width: 1.5 }); const seen = new Set();
        for (let i = 0; i < M; i++) { const j = (i * k.v) % M; seen.add(j); P.line(...pos(i), ...pos(j), { color: C.accent, width: 1.2, alpha: 0.55 }); }
        for (let i = 0; i < M; i++) { const p = pos(i); P.dot(p[0], p[1], M > 30 ? 3 : 4, { color: seen.has(i) ? C.pink : C.muted }); if (M <= 30) P.text(String(i), p[0] * 1.13, p[1] * 1.13, { dy: 4, size: 11, color: C.muted }); }
        const g = (x, y) => (y ? g(y, x % y) : x), G = g(k.v, M);
        A.set(`<span class="k">each i is joined to</span> ${A.tex(`${k.v}i \\bmod ${M}`)}. <span class="k">gcd(${k.v}, ${M}) =</span> <b>${G}</b> ${G === 1 ? `<span class="k">→ k is invertible mod m: every residue gets hit exactly once</span>` : `<span class="k">→ only ${M / G} residues are reachable (pink); no inverse exists</span>`}`);
      };
    },
  });

  V.register("euclid", {
    title: "Euclid's algorithm with rectangles", hint: "Choose a and b",
    setup(A, a) {
      const P = A.plot({ x: [0, 1], y: [0, 1], h: 300, equal: true }), x = A.slider("a", 1, 120, 1, a.a ?? 42), y = A.slider("b", 1, 120, 1, a.b ?? 30);
      A.draw = () => {
        let W = Math.max(x.v, y.v), H = Math.min(x.v, y.v); P.setView([0, W], [0, H]); const C = P.clear().P, cols = [C.accent, C.pink, C.orange, C.green, C.blue, C.teal, C.yellow];
        let ox = 0, oy = 0, w = W, h = H, k = 0, lines = [], horiz = true;
        while (w > 0 && h > 0) { const s = Math.min(w, h), q = Math.floor(Math.max(w, h) / s), r = Math.max(w, h) % s; lines.push(`${Math.max(w, h)} = ${q}·${s} + ${r}`);
          for (let i = 0; i < q; i++) { if (w >= h) P.rect(ox + i * s, oy, s, s, { fill: cols[k % 7], fa: 0.45, color: C.bg, width: 2 }); else P.rect(ox, oy + i * s, s, s, { fill: cols[k % 7], fa: 0.45, color: C.bg, width: 2 }); }
          if (w >= h) { ox += q * s; w = r; } else { oy += q * s; h = r; } k++; if (k > 40) break; }
        A.set(`<span class="mono">${lines.join(" · ")}</span> <span class="k">→</span> <b>gcd = ${lines.length ? lines[lines.length - 1].split("·")[1].split(" +")[0] : W}</b> <span class="k">the smallest squares tile everything</span>`);
      };
    },
  });

  V.register("sieve", {
    title: "Sieve of Eratosthenes", hint: "Press Run",
    setup(A) {
      const N = 100, box = el("div", "sieve"); A.stage.appendChild(box); let cross = new Array(N + 1).fill(0), p = 1;
      A.buttons([{ label: "Next prime", on: () => next() }, { label: "Run all", on: () => { let t = 0; A.loop((dt) => { t += dt; if (t > 0.5) { t = 0; if (!next()) return false; } A.draw(); }); } }, { label: "Reset", on: () => { A.stop(); cross = new Array(N + 1).fill(0); p = 1; } }]);
      function next() { p++; while (p * p <= N && cross[p]) p++; if (p * p > N) { p = 11; return false; } for (let m = p * p; m <= N; m += p) if (!cross[m]) cross[m] = p; return true; }
      const cols = { 2: "var(--c-blue)", 3: "var(--c-orange)", 5: "var(--c-green)", 7: "var(--c-pink)" };
      A.draw = () => {
        box.innerHTML = Array.from({ length: N }, (_, i) => i + 1).map((n) => `<span class="${n === 1 ? "one" : cross[n] ? "x" : n <= p || p >= 11 ? "pr" : ""}" style="${cross[n] ? "--c:" + cols[cross[n]] : ""}">${n}</span>`).join("");
        const pr = []; for (let n = 2; n <= N; n++) if (!cross[n]) pr.push(n);
        A.set(p >= 11 ? `<b>Done.</b> <span class="k">Only primes up to √100 = 10 were needed. ${pr.length} primes ≤ 100.</span>` : `<span class="k">Crossing out multiples of</span> <b>${p > 1 ? p : "—"}</b> <span class="k">starting at ${p > 1 ? p + "² = " + p * p : "p²"}. Colors show which prime removed each number.</span>`);
      };
    },
  });

  V.register("pascal", {
    title: "Pascal's triangle", hint: "Color by divisibility",
    setup(A) {
      const P = A.plot({ x: [-1, 1], y: [0, 1], h: 360, equal: false }), rows = A.slider("rows", 4, 32, 1, 12), md = A.slider("color multiples of", 1, 7, 1, 2);
      A.draw = () => {
        const C = P.clear().P, n = rows.v, T = [[1]]; for (let r = 1; r < n; r++) { const p = T[r - 1], q = [1]; for (let i = 1; i < r; i++) q.push(p[i - 1] + p[i]); q.push(1); T.push(q); }
        P.setView([-n / 2 - 0.5, n / 2 + 0.5], [-n + 0.3, 0.7]); const r0 = Math.min(P.sx, P.sy) * 0.45;
        T.forEach((row, r) => row.forEach((v, i) => { const x = i - r / 2, y = -r, hit = md.v > 1 && v % md.v !== 0; P.dot(x, y, r0, { color: hit ? C.accent : C.bg2, stroke: C.line2, sw: 1 }); if (n <= 14) P.text(String(v), x, y, { dy: 4, size: Math.min(12, r0 * 0.9), color: hit ? "#fff" : C.ink, halo: false }); }));
        A.set(`<span class="k">each entry is</span> ${A.tex("\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}")} <span class="k">Row sums are powers of 2. ${md.v === 2 ? "Coloring odd entries reveals the Sierpiński triangle." : "Purple = not divisible by " + md.v + "."}</span>`);
      };
    },
  });

  V.register("bigo", {
    title: "Growth rates: why Big-O matters", hint: "Grow n",
    setup(A) {
      const P = A.plot({ x: [0, 1], y: [0, 1], h: 340, equal: false }), n = A.slider("n up to", 4, 2000, 1, 40); let logy = false;
      A.seg([["lin", "Linear y-axis"], ["log", "Log y-axis"]], "lin", (v) => (logy = v === "log"));
      const F = [["1", () => 1], ["log n", (x) => Math.log2(x)], ["√n", Math.sqrt], ["n", (x) => x], ["n log n", (x) => x * Math.log2(x)], ["n²", (x) => x * x], ["n³", (x) => x ** 3], ["2ⁿ", (x) => 2 ** x], ["n!", (x) => Math.exp(V.util.stats.lgam(x + 1))]];
      A.draw = () => {
        const N = n.v, Y = logy ? [0, Math.log10(Math.max(10, N * N * N)) + 1] : [0, N * 2]; P.setView([1, N], Y);
        const C = P.clear().P, cols = [C.muted, C.teal, C.green, C.blue, C.accent, C.orange, C.pink, C.bad, C.ink];
        F.forEach(([l, f], i) => { const g = (x) => (logy ? Math.log10(Math.max(f(x), 1e-9)) : f(x)); P.fn(g, { color: cols[i], width: 2.5, from: 1 }); let xl = N; while (xl > 1 && g(xl) > Y[1]) xl *= 0.97; P.text(l, xl, Math.min(g(xl), Y[1]), { dx: -4, dy: -6, align: "right", color: cols[i], size: 12 }); });
        const ops = (f) => { const v = f(N); return v > 1e15 ? v.toExponential(1) : Math.round(v).toLocaleString(); };
        A.set(`<span class="k">at n = ${N}:</span> ${F.slice(1).map(([l, f]) => `<span class="k">${l}</span> <b>${ops(f)}</b>`).join(" ")}`);
      };
    },
  });

  V.register("dfa", {
    title: "Finite automaton simulator", hint: "Type a string of 0s and 1s",
    setup(A, a) {
      const M = { "divisible by 3": { s: ["r0", "r1", "r2"], acc: ["r0"], t: { r0: ["r0", "r1"], r1: ["r2", "r0"], r2: ["r1", "r2"] }, pos: [[2, 3], [5, 4.6], [8, 3]] }, "ends in 01": { s: ["q0", "q1", "q2"], acc: ["q2"], t: { q0: ["q1", "q0"], q1: ["q1", "q2"], q2: ["q1", "q0"] }, pos: [[2, 3], [5, 3], [8, 3]] }, "even # of 1s": { s: ["even", "odd"], acc: ["even"], t: { even: ["even", "odd"], odd: ["odd", "even"] }, pos: [[3, 3], [7, 3]] }, "contains 11": { s: ["a", "b", "c"], acc: ["c"], t: { a: ["a", "b"], b: ["a", "c"], c: ["c", "c"] }, pos: [[2, 3], [5, 3], [8, 3]] } };
      let mk = a.machine || "divisible by 3"; const P = A.plot({ x: [0, 10], y: [0.5, 6], h: 300 });
      A.select("Machine", Object.keys(M), mk, (v) => (mk = v));
      const inp = el("input"); inp.type = "text"; inp.value = "1101"; inp.setAttribute("aria-label", "Input string"); A.ctl().appendChild(inp); inp.oninput = () => { inp.value = inp.value.replace(/[^01]/g, ""); A.draw(); };
      A.draw = () => {
        const C = P.clear().P, m = M[mk], path = [m.s[0]]; for (const ch of inp.value) path.push(m.t[path[path.length - 1]][+ch]);
        const cur = path[path.length - 1], pos = (s) => m.pos[m.s.indexOf(s)];
        m.s.forEach((s) => [0, 1].forEach((b) => { const to = m.t[s][b], p = pos(s), q = pos(to); if (s === to) { P.circle(p[0], p[1] + 0.85, 0.45, { color: C.muted, width: 1.5 }); P.text(String(b), p[0] + (b ? 0.3 : -0.3), p[1] + 1.55, { color: C.ink, size: 12 }); } else { const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L, off = 0.35; P.arrow(p[0] + (dx / L) * 0.65 + nx * off, p[1] + (dy / L) * 0.65 + ny * off, q[0] - (dx / L) * 0.65 + nx * off, q[1] - (dy / L) * 0.65 + ny * off, { color: C.muted, width: 1.5, head: 9 }); P.text(String(b), (p[0] + q[0]) / 2 + nx * 0.7, (p[1] + q[1]) / 2 + ny * 0.7, { dy: 4, size: 12 }); } }));
        const st0 = pos(m.s[0]); P.arrow(st0[0] - 1.6, st0[1], st0[0] - 0.65, st0[1], { color: C.ink, width: 2 });
        m.s.forEach((s) => { const p = pos(s); P.circle(p[0], p[1], 0.55, { color: s === cur ? C.pink : C.ink, width: s === cur ? 3.5 : 2, fill: s === cur ? C.pink : C.bg, fa: s === cur ? 0.2 : 1 }); if (m.acc.includes(s)) P.circle(p[0], p[1], 0.44, { color: C.ink, width: 1.5 }); P.text(s, p[0], p[1], { dy: 5, size: 13 }); });
        const ok = m.acc.includes(cur);
        A.set(`<span class="k">path:</span> <span class="mono">${path.join(" → ")}</span> ${ok ? `<b style="color:var(--good)">ACCEPT</b>` : `<b style="color:var(--bad)">REJECT</b>`} <span class="k">${inp.value ? "(\"" + inp.value + "\" = " + parseInt(inp.value, 2) + " in decimal)" : "(empty string)"} double circle = accepting state</span>`);
      };
    },
  });

  V.register("sort", {
    title: "Sorting algorithms, counted", hint: "Choose an algorithm and press Play",
    setup(A) {
      let alg = "bubble", arr, frames, fi = 0; const P = A.plot({ x: [0, 1], y: [0, 1], h: 260, equal: false }), n = A.slider("n", 8, 64, 1, 24);
      A.seg([["bubble", "Bubble"], ["insertion", "Insertion"], ["merge", "Merge"], ["quick", "Quick"]], alg, (v) => { alg = v; gen(); });
      A.buttons([{ label: "▶ Play", on: () => { fi = 0; A.loop(() => { fi = Math.min(frames.length - 1, fi + Math.max(1, Math.round(frames.length / 240))); A.draw(); return fi < frames.length - 1; }); } }, { label: "Shuffle", on: () => gen() }]);
      function gen() { A.stop(); const r = rng(n.v * 7 + alg.length); arr = Array.from({ length: n.v }, (_, i) => i + 1).sort(() => r() - 0.5); frames = []; let cmp = 0; const a = arr.slice(), F = (h) => frames.push({ a: a.slice(), h, cmp });
        const lt = (x, y) => (cmp++, x < y);
        if (alg === "bubble") { for (let i = 0; i < a.length; i++) for (let j = 0; j < a.length - 1 - i; j++) { if (lt(a[j + 1], a[j])) [a[j], a[j + 1]] = [a[j + 1], a[j]]; F([j, j + 1]); } }
        else if (alg === "insertion") { for (let i = 1; i < a.length; i++) { let j = i; while (j > 0 && lt(a[j], a[j - 1])) { [a[j], a[j - 1]] = [a[j - 1], a[j]]; j--; F([j, j + 1]); } F([j]); } }
        else if (alg === "merge") { const ms = (l, r) => { if (r - l < 2) return; const m = (l + r) >> 1; ms(l, m); ms(m, r); const t = []; let i = l, j = m; while (i < m && j < r) t.push(lt(a[j], a[i]) ? a[j++] : a[i++]); while (i < m) t.push(a[i++]); while (j < r) t.push(a[j++]); for (let k = 0; k < t.length; k++) { a[l + k] = t[k]; F([l + k]); } }; ms(0, a.length); }
        else { const qs = (l, r) => { if (l >= r) return; const p = a[r]; let i = l; for (let j = l; j < r; j++) { if (lt(a[j], p)) { [a[i], a[j]] = [a[j], a[i]]; i++; } F([j, r]); } [a[i], a[r]] = [a[r], a[i]]; F([i]); qs(l, i - 1); qs(i + 1, r); }; qs(0, a.length - 1); }
        F([]); fi = 0; }
      n.el.addEventListener("input", gen); gen();
      A.draw = () => { const f = frames[fi], N = f.a.length; P.setView([0, N], [0, N + 1]); const C = P.clear().P; f.a.forEach((v, i) => P.rect(i + 0.1, 0, 0.8, v, { fill: f.h.includes(i) ? C.pink : C.accent, fa: 0.85, color: "none" })); const N0 = n.v;
        A.set(`<span class="k">comparisons so far</span> <b>${f.cmp}</b> <span class="k">for n = ${N0}: n² ≈</span> <b>${N0 * N0}</b> <span class="k">n log₂ n ≈</span> <b>${Math.round(N0 * Math.log2(N0))}</b> <span class="k">${alg === "bubble" || alg === "insertion" ? "Θ(n²) worst case" : alg === "merge" ? "Θ(n log n) always" : "Θ(n log n) on average, Θ(n²) worst"}</span>`); };
    },
  });

  V.register("sets", {
    title: "Set operations", hint: "Pick an operation",
    setup(A) {
      const P = A.plot({ x: [-3, 3], y: [-1.7, 1.7], h: 260 }); let op = "union";
      A.seg([["union", "A ∪ B"], ["inter", "A ∩ B"], ["diff", "A \\ B"], ["sym", "A △ B"], ["compA", "Aᶜ"]], op, (v) => (op = v));
      const U = [...Array(12).keys()].map((i) => i + 1), Aset = new Set([1, 2, 3, 4, 6, 12]), Bset = new Set([2, 3, 5, 7, 11]);
      const pos = {}; [1, 4, 6, 12].forEach((v, i) => (pos[v] = [-1.6 + (i % 2) * 0.55, 0.6 - Math.floor(i / 2) * 0.9])); [2, 3].forEach((v, i) => (pos[v] = [0, 0.45 - i * 0.9])); [5, 7, 11].forEach((v, i) => (pos[v] = [1.3 + (i % 2) * 0.5, 0.6 - i * 0.55])); [8, 9, 10].forEach((v, i) => (pos[v] = [-2.5 + i * 2.5, -1.4]));
      A.draw = () => {
        const C = P.clear().P, inA = (x) => Aset.has(x), inB = (x) => Bset.has(x), f = { union: (x) => inA(x) || inB(x), inter: (x) => inA(x) && inB(x), diff: (x) => inA(x) && !inB(x), sym: (x) => inA(x) !== inB(x), compA: (x) => !inA(x) }[op];
        P.rect(-2.9, -1.65, 5.8, 3.3, { fill: C.bg2, fa: 0.6, color: C.line2 }); P.circle(-0.7, 0, 1.4, { color: C.pink, width: 2.5 }); P.circle(0.7, 0, 1.4, { color: C.blue, width: 2.5 });
        P.text("A", -1.9, 1.25, { color: C.pink, size: 15 }); P.text("B", 1.9, 1.25, { color: C.blue, size: 15 }); P.text("U", -2.7, 1.4, { color: C.muted });
        U.forEach((x) => { const p = pos[x]; P.dot(p[0], p[1], 13, { color: f(x) ? C.accent : C.bg, stroke: C.line2, sw: 1 }); P.text(String(x), p[0], p[1], { dy: 4, size: 12, color: f(x) ? "#fff" : C.ink, halo: false }); });
        const res = U.filter(f); A.set(`<span class="k">A = {1,2,3,4,6,12} (divisors of 12), B = {2,3,5,7,11} (primes), U = {1..12}</span> <b>{${res.join(", ")}}</b> <span class="k">size ${res.length}</span>`);
      };
    },
  });

  V.register("recursion-tree", {
    title: "Recurrences as trees", hint: "Choose a recurrence",
    setup(A) {
      const P = A.plot({ x: [0, 1], y: [0, 1], h: 300, equal: false }); let k = "merge";
      const RS = { merge: { a: 2, b: 2, f: (n) => n, t: "T(n) = 2T(n/2) + n", ans: "Θ(n log n): every level costs n, and there are log₂ n levels" }, binary: { a: 1, b: 2, f: () => 1, t: "T(n) = T(n/2) + 1", ans: "Θ(log n): one constant step per level" }, karatsuba: { a: 3, b: 2, f: (n) => n, t: "T(n) = 3T(n/2) + n", ans: "Θ(n^log₂3) ≈ Θ(n^1.585): leaves dominate" }, quad: { a: 2, b: 2, f: (n) => n * n, t: "T(n) = 2T(n/2) + n²", ans: "Θ(n²): the root dominates" } };
      A.seg(Object.keys(RS).map((x) => [x, RS[x].t]), k, (v) => (k = v));
      A.draw = () => {
        const C = P.clear().P, r = RS[k], N = 16, L = Math.round(Math.log2(N)); const rows = [];
        for (let d = 0; d <= L; d++) { const cnt = r.a ** d, sz = N / r.b ** d, cost = cnt * r.f(sz); rows.push([cnt, sz, cost]); const show = Math.min(cnt, 81); for (let i = 0; i < show; i++) { const x = (i + 0.5) / show, y = 1 - (d + 0.5) / (L + 1); P.dot(x * 0.72, y, Math.max(2, 10 - d * 1.6), { color: [C.accent, C.pink, C.orange, C.green, C.blue][d % 5] }); } P.text(`level ${d}: ${cnt} × f(${sz}) = ${cost}`, 0.76, 1 - (d + 0.5) / (L + 1), { align: "left", dy: 4, size: 12 }); }
        A.set(`${A.tex(r.t.replace("T(n/2)", "T(\\tfrac n2)"))} <span class="k">with n = 16. Total =</span> <b>${rows.reduce((s, x) => s + x[2], 0)}</b> <span class="k">→</span> <b>${r.ans}</b>`);
      };
    },
  });

  V.register("counting", {
    title: "Permutations vs combinations", hint: "Choose n and k",
    setup(A) {
      const box = el("div", "perm"); A.stage.appendChild(box); const n = A.slider("n items", 2, 6, 1, 4), k = A.slider("choose k", 1, 6, 1, 2); let ordered = true;
      A.seg([["p", "Order matters (permutations)"], ["c", "Order doesn't (combinations)"]], "p", (v) => (ordered = v === "p"));
      A.draw = () => {
        const N = n.v, K = Math.min(k.v, N), items = "ABCDEF".slice(0, N).split(""), out = [];
        const rec = (cur, used) => { if (cur.length === K) { out.push(cur.join("")); return; } items.forEach((x, i) => { if (used.has(i)) return; if (!ordered && cur.length && items.indexOf(cur[cur.length - 1]) > i) return; used.add(i); rec([...cur, x], used); used.delete(i); }); };
        rec([], new Set()); box.innerHTML = out.slice(0, 360).map((s) => `<span>${s}</span>`).join("");
        const f = (x) => (x < 2 ? 1 : x * f(x - 1));
        A.set(ordered ? A.tex(`P(${N},${K}) = \\frac{${N}!}{(${N}-${K})!} = ${f(N) / f(N - K)}`) + ` <span class="k">AB and BA count separately</span>` : A.tex(`\\binom{${N}}{${K}} = \\frac{${N}!}{${K}!\\,(${N}-${K})!} = ${f(N) / (f(K) * f(N - K))}`) + ` <span class="k">each group of ${K} appears once; divide out the ${K}! orderings</span>`);
      };
    },
  });
})();
