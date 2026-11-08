/* g10 visuals: graph property lab, network flow (Ford–Fulkerson), DAG topological sort */
(function () {
  const V = window.Viz;
  const COLS = (C) => [C.pink, C.blue, C.green, C.orange, C.purple, C.teal, C.yellow, C.accent, C.bad, C.muted, C.ink2, C.good];
  const ring = (n, cx, cy, r, ph = Math.PI / 2) => Array.from({ length: n }, (_, i) => [cx + r * Math.cos(ph + (2 * Math.PI * i) / n), cy + r * Math.sin(ph + (2 * Math.PI * i) / n)]);
  const cyc = (n, off = 0) => Array.from({ length: n }, (_, i) => [off + i, off + ((i + 1) % n)]);
  const all = (ids) => { const e = []; ids.forEach((a, i) => ids.slice(i + 1).forEach((b) => e.push([a, b]))); return e; };

  const LAB = {
    envelope: { n: [[2, 0.8], [8, 0.8], [8, 3.8], [2, 3.8], [5, 5.6]], e: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2], [1, 3], [2, 4], [3, 4]] },
    k4: { n: [[2.5, 1], [7.5, 1], [7.5, 5], [2.5, 5]], e: all([0, 1, 2, 3]) },
    k5: { n: ring(5, 5, 3.1, 2.6), e: all([0, 1, 2, 3, 4]) },
    k33: { n: [[2, 1], [2, 3], [2, 5], [8, 1], [8, 3], [8, 5]], e: [0, 1, 2].flatMap((a) => [3, 4, 5].map((b) => [a, b])) },
    petersen: { n: ring(5, 5, 3, 2.8).concat(ring(5, 5, 3, 1.3)), e: cyc(5).concat([0, 1, 2, 3, 4].map((i) => [i, i + 5]), [0, 1, 2, 3, 4].map((i) => [i + 5, ((i + 2) % 5) + 5])) },
    cube: { n: [[1.5, 0.5], [8.5, 0.5], [8.5, 5.5], [1.5, 5.5], [3.5, 2], [6.5, 2], [6.5, 4], [3.5, 4]], e: cyc(4).concat(cyc(4, 4), [0, 1, 2, 3].map((i) => [i, i + 4])) },
    c5: { n: ring(5, 5, 3, 2.6), e: cyc(5) },
    c6: { n: ring(6, 5, 3, 2.6), e: cyc(6) },
    wheel: { n: [[5, 3]].concat(ring(5, 5, 3, 2.6)), e: [1, 2, 3, 4, 5].map((i) => [0, i]).concat(cyc(5, 1)) },
    bridges: { n: [[1, 1.5], [1, 4.5], [3.4, 3], [5.6, 3], [7.8, 4.5], [7.8, 1.5], [9.6, 0.6]], e: [[0, 1], [1, 2], [0, 2], [2, 3], [3, 4], [4, 5], [3, 5], [5, 6]] },
    disconnected: { n: [[1, 1], [3, 1], [2, 3], [5, 4.5], [6.5, 2.5], [8, 4.5], [9.3, 1]], e: [[0, 1], [1, 2], [0, 2], [3, 4], [4, 5]] },
    tree: { n: [[5, 5.5], [2.5, 3.8], [7.5, 3.8], [1.2, 1.9], [3.8, 1.9], [6.4, 1.9], [8.8, 1.9], [1.2, 0.2]], e: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 7]] },
    jobs: { n: [[2, 5], [2, 3.67], [2, 2.33], [2, 1], [8, 5], [8, 3.67], [8, 2.33], [8, 1]], e: [[0, 4], [0, 5], [1, 4], [2, 5], [2, 6], [2, 7], [3, 6]] },
    "jobs-hall": { n: [[2, 5], [2, 3.67], [2, 2.33], [2, 1], [8, 5], [8, 3.67], [8, 2.33], [8, 1]], e: [[0, 4], [1, 4], [2, 5], [2, 6], [2, 7], [3, 5], [3, 6]] },
    grid: { n: Array.from({ length: 9 }, (_, i) => [2 + (i % 3) * 3, 1 + Math.floor(i / 3) * 2]), e: [[0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8], [0, 3], [3, 6], [1, 4], [4, 7], [2, 5], [5, 8]] },
  };
  const MODES = [["degree", "Degrees & handshake"], ["components", "Components, bridges, cut vertices"], ["walks", "Counting walks (Aᵏ)"], ["bipartite", "Bipartite test (2-colouring)"], ["euler", "Euler trail / circuit"], ["hamilton", "Hamilton cycle / path"], ["greedy", "Colouring: greedy in number order"], ["welsh", "Colouring: largest degree first"], ["optimal", "Colouring: optimal (χ)"], ["planar", "Planarity: crossings & Euler's formula"], ["matching", "Maximum matching & vertex cover"]];

  function analyse(n, E) {
    const L = Array.from({ length: n }, () => []);
    E.forEach(([u, v], k) => { L[u].push([v, k]); L[v].push([u, k]); });
    L.forEach((l) => l.sort((a, b) => a[0] - b[0]));
    return L;
  }
  function comps(n, E, skipV = -1, skipE = -1) {
    const L = analyse(n, E), lab = new Array(n).fill(-1); let c = 0;
    for (let s = 0; s < n; s++) { if (s === skipV || lab[s] >= 0) continue; const st = [s]; lab[s] = c; while (st.length) { const u = st.pop(); for (const [v, k] of L[u]) if (v !== skipV && k !== skipE && lab[v] < 0) { lab[v] = c; st.push(v); } } c++; }
    return { lab, c };
  }
  const segX = (a, b, c, d) => { const o = (p, q, r) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])); return o(a, b, c) * o(a, b, d) < 0 && o(c, d, a) * o(c, d, b) < 0; };
  const isect = (a, b, c, d) => { const den = (a[0] - b[0]) * (c[1] - d[1]) - (a[1] - b[1]) * (c[0] - d[0]); const t = ((a[0] - c[0]) * (c[1] - d[1]) - (a[1] - c[1]) * (c[0] - d[0])) / den; return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]; };

  V.register("g10-graph-lab", {
    title: "Graph property lab", hint: "Pick a graph and a question to ask about it",
    setup(A, a) {
      let gk = LAB[a.graph] ? a.graph : "envelope", mode = a.mode || "degree", sel = a.source ?? 0, edit = false, pick = -1, shown = 1e9, drag = null;
      const P = A.plot({ x: [0, 10], y: [-0.3, 6.3], h: 360 });
      const clone = () => ({ n: LAB[gk].n.map((p) => p.slice()), e: LAB[gk].e.map((x) => x.slice()) }); let G = clone();
      A.select("Graph", Object.keys(LAB), gk, (v) => { gk = v; G = clone(); sel = 0; pick = -1; shown = 1e9; });
      A.select("Ask", MODES, mode, (v) => { mode = v; shown = 1e9; });
      const kS = A.slider("walk length k", 1, 6, 1, a.k || 2);
      A.seg([["explore", "Explore (drag / select)"], ["edit", "Edit edges"]], "explore", (v) => { edit = v === "edit"; pick = -1; });
      A.buttons([{ label: "▶ Animate", on: () => { shown = 0; let t = 0; A.loop((dt) => { t += dt; if (t > 0.5) { t = 0; shown++; } A.draw(); return shown < 40; }); } }, { label: "Reset graph", on: () => { A.stop(); G = clone(); pick = -1; shown = 1e9; } }]);
      const clickV = (i) => {
        if (!edit) { sel = i; return; }
        if (pick < 0) { pick = i; return; }
        if (pick !== i) { const k = G.e.findIndex(([u, v]) => (u === pick && v === i) || (u === i && v === pick)); if (k >= 0) G.e.splice(k, 1); else G.e.push([pick, i]); }
        pick = -1;
      };
      for (let i = 0; i < 12; i++) P.handle(() => G.n[i] || [-9, -9], (x, y) => { if (!drag) drag = { i, x: G.n[i][0], y: G.n[i][1], moved: false }; if (Math.hypot(x - drag.x, y - drag.y) > 0.15) drag.moved = true; if (drag.moved) { G.n[i][0] = x; G.n[i][1] = y; } }, { hidden: () => !G.n[i], end: () => { if (!drag || !drag.moved) { clickV(i); A.draw(); } drag = null; } });
      P.onClick = (x, y) => { if (edit && G.n.length < 12 && pick < 0) { G.n.push([x, y]); A.draw(); } else { pick = -1; A.draw(); } };

      A.draw = () => {
        const C = P.clear().P, n = G.n.length, E = G.e, L = analyse(n, E), deg = L.map((l) => l.length), cols = COLS(C);
        const vcol = new Array(n).fill(null), vlab = new Array(n).fill(null), ecol = new Array(E.length).fill(null), elab = new Array(E.length).fill(null), ringV = new Set(); let msg = "", marks = [], dashE = new Set();
        const base = comps(n, E);
        if (mode === "degree") {
          deg.forEach((d, i) => { vlab[i] = "deg " + d; if (d % 2) ringV.add(i); });
          const sum = deg.reduce((s, d) => s + d, 0), odd = deg.filter((d) => d % 2).length;
          msg = `Degree sequence <b>(${deg.slice().sort((x, y) => y - x).join(", ")})</b> <span class="k">sum of degrees</span> <b>${sum}</b> = 2 × <b>${E.length}</b> edges. <span class="k">odd-degree vertices (ringed):</span> <b>${odd}</b> <span class="k">(always even)</span>`;
        } else if (mode === "components") {
          base.lab.forEach((c, i) => (vcol[i] = cols[c % cols.length]));
          const br = [], cut = [];
          E.forEach((_, k) => { if (comps(n, E, -1, k).c > base.c) { br.push(k); ecol[k] = C.bad; dashE.add(k); } });
          for (let v = 0; v < n; v++) if (comps(n, E, v).c > base.c) { cut.push(v); ringV.add(v); }
          msg = `<b>${base.c}</b> <span class="k">connected component(s), coloured separately.</span> <span class="k">bridges (red dashed):</span> <b>${br.map((k) => E[k].join("–")).join(", ") || "none"}</b> <span class="k">cut vertices (ringed):</span> <b>${cut.join(", ") || "none"}</b>`;
        } else if (mode === "walks") {
          const k = kS.v; let M = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
          const Adj = Array.from({ length: n }, () => new Array(n).fill(0)); E.forEach(([u, v]) => { Adj[u][v]++; Adj[v][u]++; });
          let dist = new Array(n).fill(null); dist[sel] = 0;
          for (let s = 1; s <= k; s++) { M = M.map((row) => Adj[0] ? row.map((_, j) => row.reduce((acc, x, t) => acc + x * Adj[t][j], 0)) : row); M[sel].forEach((x, j) => { if (x > 0 && dist[j] == null) dist[j] = s; }); }
          const s0 = sel < n ? sel : 0; M[s0].forEach((x, j) => (vlab[j] = String(x))); vcol[s0] = C.pink;
          msg = `<span class="k">row ${s0} of</span> ${A.tex("A^{" + k + "}")}: <b>[${M[s0].join(", ")}]</b> <span class="k">= number of walks of length ${k} from vertex ${s0} to each vertex (label above). Click a vertex to change the start.</span>`;
        } else if (mode === "bipartite") {
          const side = new Array(n).fill(-1), par = new Array(n).fill(-1); let bad = null;
          for (let s = 0; s < n && !bad; s++) { if (side[s] >= 0) continue; side[s] = 0; const q = [s]; while (q.length && !bad) { const u = q.shift(); for (const [v, k] of L[u]) { if (side[v] < 0) { side[v] = 1 - side[u]; par[v] = u; q.push(v); } else if (side[v] === side[u]) { bad = [u, v, k]; break; } } } }
          if (!bad) { side.forEach((s, i) => (vcol[i] = s ? C.blue : C.pink)); msg = `<b style="color:var(--good)">Bipartite.</b> <span class="k">Every edge joins a pink vertex to a blue vertex. Sides:</span> <b>{${side.map((s, i) => (s ? -1 : i)).filter((x) => x >= 0).join(", ")}}</b> <span class="k">and</span> <b>{${side.map((s, i) => (s ? i : -1)).filter((x) => x >= 0).join(", ")}}</b>`; }
          else {
            const [u, v, k] = bad, pu = [u], pv = [v]; let x = u; while (par[x] >= 0) { x = par[x]; pu.push(x); } x = v; while (par[x] >= 0) { x = par[x]; pv.push(x); }
            const lca = pu.find((y) => pv.includes(y)), cy = pu.slice(0, pu.indexOf(lca) + 1).concat(pv.slice(0, pv.indexOf(lca)).reverse());
            side.forEach((s, i) => (vcol[i] = s < 0 ? null : s ? C.blue : C.pink));
            for (let t = 0; t < cy.length; t++) { const a1 = cy[t], b1 = cy[(t + 1) % cy.length]; const kk = E.findIndex(([p, q]) => (p === a1 && q === b1) || (p === b1 && q === a1)); if (kk >= 0) ecol[kk] = C.bad; }
            msg = `<b style="color:var(--bad)">Not bipartite.</b> <span class="k">Edge ${u}–${v} joins two vertices of the same colour. Odd cycle found (red):</span> <b>${cy.join(" → ")} → ${cy[0]}</b> <span class="k">(length ${cy.length})</span>`;
          }
        } else if (mode === "euler") {
          const odd = deg.map((d, i) => (d % 2 ? i : -1)).filter((x) => x >= 0); odd.forEach((i) => ringV.add(i));
          const nz = deg.map((d, i) => (d ? i : -1)).filter((x) => x >= 0), conn = nz.every((i) => base.lab[i] === base.lab[nz[0]]);
          if (!E.length) msg = "No edges.";
          else if (!conn) msg = `<b style="color:var(--bad)">No Euler trail:</b> <span class="k">the edges are not all in one component.</span>`;
          else if (odd.length !== 0 && odd.length !== 2) msg = `<b style="color:var(--bad)">No Euler trail or circuit:</b> <span class="k">${odd.length} vertices have odd degree (ringed): ${odd.join(", ")}. You need 0 (circuit) or 2 (trail).</span>`;
          else {
            const start = odd.length ? (odd.includes(sel) ? sel : odd[0]) : deg[sel] ? sel : nz[0];
            const used = new Array(E.length).fill(false), ptr = new Array(n).fill(0), st = [start], es = [-1], path = [], ep = [];
            while (st.length) { const v = st[st.length - 1]; let mv = false; while (ptr[v] < L[v].length) { const [w, k] = L[v][ptr[v]++]; if (!used[k]) { used[k] = true; st.push(w); es.push(k); mv = true; break; } } if (!mv) { path.push(st.pop()); ep.push(es.pop()); } }
            path.reverse(); const order = ep.reverse().filter((k) => k >= 0);
            order.forEach((k, t) => { if (t < shown) { elab[k] = String(t + 1); ecol[k] = C.accent; } });
            vcol[start] = C.pink;
            msg = `<b style="color:var(--good)">Euler ${odd.length ? "trail" : "circuit"}</b> <span class="k">(${odd.length ? "exactly 2 odd vertices, so start at one and end at the other" : "every degree is even"}):</span> <b>${path.join(" → ")}</b> <span class="k">edge numbers show the order. Press Animate to watch it.</span>`;
          }
        } else if (mode === "hamilton") {
          let best = null, isC = false; const vis = new Array(n).fill(false), p = [];
          const rec = (u, wantCycle, s0) => { if (p.length === n) { if (!wantCycle || L[u].some(([v]) => v === s0)) return true; return false; } for (const [v] of L[u]) if (!vis[v]) { vis[v] = true; p.push(v); if (rec(v, wantCycle, s0)) return true; vis[v] = false; p.pop(); } return false; };
          if (n) { vis[0] = true; p.push(0); if (rec(0, true, 0)) { best = p.slice(); isC = true; } }
          if (!best) for (let s = 0; s < n && !best; s++) { vis.fill(false); p.length = 0; vis[s] = true; p.push(s); if (rec(s, false, s)) best = p.slice(); }
          const md = Math.min(...deg), dirac = n >= 3 && md >= n / 2;
          if (best) { const seq = isC ? best.concat([best[0]]) : best; for (let t = 0; t + 1 < seq.length; t++) { const kk = E.findIndex(([x, y]) => (x === seq[t] && y === seq[t + 1]) || (x === seq[t + 1] && y === seq[t])); if (t < shown) { ecol[kk] = C.accent; elab[kk] = String(t + 1); } } }
          msg = `${best ? `<b style="color:var(--good)">Hamilton ${isC ? "cycle" : "path (no cycle exists)"}:</b> <b>${(isC ? best.concat([best[0]]) : best).join(" → ")}</b>` : `<b style="color:var(--bad)">No Hamilton path or cycle.</b>`} <span class="k">found by trying every route (backtracking). Dirac: min degree ${md} ${dirac ? "≥" : "<"} n/2 = ${n / 2}${dirac ? ", so a Hamilton cycle is guaranteed" : ", so Dirac's theorem says nothing"}.</span>`;
        } else if (mode === "greedy" || mode === "welsh" || mode === "optimal") {
          let col = new Array(n).fill(-1);
          if (mode === "optimal") { for (let k = 1; k <= n; k++) { col.fill(-1); const bt = (i) => { if (i === n) return true; for (let c = 0; c < k; c++) if (L[i].every(([v]) => col[v] !== c)) { col[i] = c; if (bt(i + 1)) return true; col[i] = -1; } return false; }; if (bt(0)) break; } }
          else { const ord = [...Array(n).keys()]; if (mode === "welsh") ord.sort((x, y) => deg[y] - deg[x] || x - y); ord.forEach((i, t) => { if (t >= shown) return; let c = 0; while (L[i].some(([v]) => col[v] === c)) c++; col[i] = c; }); }
          col.forEach((c, i) => { if (c >= 0) { vcol[i] = cols[c % cols.length]; vlab[i] = "c" + (c + 1); } });
          const used = new Set(col.filter((c) => c >= 0)).size, D = n ? Math.max(...deg) : 0;
          msg = `<b>${used}</b> <span class="k">colours used ${mode === "optimal" ? "(this is the chromatic number χ, found by trying k = 1, 2, 3, …)" : "by greedy (each vertex takes the smallest colour none of its neighbours has)"}. Upper bound Δ + 1 =</span> <b>${D + 1}</b><span class="k">. No edge joins two vertices of the same colour.</span>`;
        } else if (mode === "planar") {
          let cr = 0; for (let i = 0; i < E.length; i++) for (let j = i + 1; j < E.length; j++) { const [a1, b1] = E[i], [c1, d1] = E[j]; if (a1 === c1 || a1 === d1 || b1 === c1 || b1 === d1) continue; if (segX(G.n[a1], G.n[b1], G.n[c1], G.n[d1])) { cr++; marks.push(isect(G.n[a1], G.n[b1], G.n[c1], G.n[d1])); } }
          const tri = L.some((l, u) => l.some(([v]) => v > u && l.some(([w]) => w > v && L[v].some(([x]) => x === w))));
          const b3 = 3 * n - 6, b2 = 2 * n - 4, ok3 = n < 3 || E.length <= b3, ok2 = tri || n < 3 || E.length <= b2;
          let f = ""; if (cr === 0) { const F = E.length - n + 1 + base.c; f = `<b style="color:var(--good)">No crossings: this drawing is a plane graph.</b> <span class="k">Faces F =</span> <b>${F}</b> <span class="k">(including the outside), so V − E + F =</span> <b>${n} − ${E.length} + ${F} = ${n - E.length + F}</b>${base.c > 1 ? ' <span class="k">(= 1 + number of components)</span>' : ""}.`; }
          else f = `<b>${cr}</b> <span class="k">crossing(s) in this drawing (marked ×). Drag vertices to try to remove them.</span>`;
          msg = `${f} <span class="k">V = ${n}, E = ${E.length}. Test E ≤ 3V − 6 = ${b3}:</span> <b>${ok3 ? "passes" : "FAILS, so not planar"}</b>${tri ? "" : ` <span class="k">no triangles, so also E ≤ 2V − 4 = ${b2}:</span> <b>${ok2 ? "passes" : "FAILS, so not planar"}</b>`}`;
        } else if (mode === "matching") {
          const memo = new Map();
          const best = (mask) => { if (memo.has(mask)) return memo.get(mask); let i = 0; while (i < n && mask & (1 << i)) i++; if (i >= n) return []; let r = best(mask | (1 << i)); for (const [v, k] of L[i]) if (!(mask & (1 << v))) { const s = best(mask | (1 << i) | (1 << v)); if (s.length + 1 > r.length) r = [k].concat(s); } memo.set(mask, r); return r; };
          const M = n ? best(0) : []; M.forEach((k) => (ecol[k] = C.accent));
          let cover = null; for (let sz = 0; sz <= n && !cover; sz++) for (let m = 0; m < 1 << n; m++) { let c = 0, x = m; while (x) { c += x & 1; x >>= 1; } if (c !== sz) continue; if (E.every(([u, v]) => m & (1 << u) || m & (1 << v))) { cover = m; break; } }
          for (let i = 0; i < n; i++) if (cover & (1 << i)) ringV.add(i);
          const bip = (() => { const s = new Array(n).fill(-1); for (let r = 0; r < n; r++) { if (s[r] >= 0) continue; s[r] = 0; const q = [r]; while (q.length) { const u = q.shift(); for (const [v] of L[u]) { if (s[v] < 0) { s[v] = 1 - s[u]; q.push(v); } else if (s[v] === s[u]) return false; } } } return true; })();
          const cs = [...ringV].length;
          msg = `<span class="k">maximum matching (thick):</span> <b>${M.map((k) => E[k].join("–")).join(", ") || "none"}</b> <span class="k">size</span> <b>${M.length}</b>${2 * M.length === n ? ' <b style="color:var(--good)">perfect</b>' : ""}. <span class="k">minimum vertex cover (ringed) size</span> <b>${cs}</b>. <span class="k">${bip ? "Bipartite, so König's theorem says these are equal." : "Not bipartite: cover can be larger than matching."}</span>`;
        }
        E.forEach(([u, v], k) => { const p = G.n[u], q = G.n[v]; P.line(p[0], p[1], q[0], q[1], { color: ecol[k] || C.line2, width: ecol[k] ? (mode === "matching" ? 6 : 4) : 2, dash: dashE.has(k) ? [7, 5] : null }); if (elab[k]) P.text(elab[k], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2, { dy: 4, size: 12, color: C.ink }); });
        marks.forEach(([x, y]) => P.text("×", x, y, { dy: 6, size: 20, color: C.bad }));
        G.n.forEach((p, i) => { const fill = vcol[i]; P.dot(p[0], p[1], 15, { color: fill || C.bg2, stroke: i === pick ? C.ink : ringV.has(i) ? C.bad : C.line2, sw: i === pick || ringV.has(i) ? 3.5 : 1.5 }); P.text(String(i), p[0], p[1], { dy: 5, size: 13, color: fill ? "#fff" : C.ink, halo: false }); if (vlab[i] != null) P.text(vlab[i], p[0], p[1], { dy: -21, size: 12, color: C.pink }); });
        A.set(`${msg} <span class="k">${edit ? (pick >= 0 ? `(vertex ${pick} picked: click another vertex to add/remove that edge)` : "(edit: click two vertices to add/remove an edge; click empty space to add a vertex)") : "(drag vertices to move them)"}</span>`);
      };
    },
  });

  const NETS = {
    classic: { names: ["s", "a", "b", "c", "d", "t"], n: [[0.6, 3], [3.5, 5.2], [3.5, 0.8], [6.5, 5.2], [6.5, 0.8], [9.4, 3]], e: [[0, 1, 10], [0, 2, 10], [1, 2, 2], [1, 3, 4], [1, 4, 8], [2, 4, 9], [4, 3, 6], [3, 5, 10], [4, 5, 10]] },
    small: { names: ["s", "a", "b", "t"], n: [[0.8, 3], [5, 5.2], [5, 0.8], [9.2, 3]], e: [[0, 1, 3], [0, 2, 2], [1, 2, 1], [1, 3, 2], [2, 3, 3]] },
    trap: { names: ["s", "a", "b", "t"], n: [[0.8, 3], [5, 5.2], [5, 0.8], [9.2, 3]], e: [[0, 1, 1], [0, 2, 1], [1, 2, 1], [1, 3, 1], [2, 3, 1]] },
    matching: { names: ["s", "w0", "w1", "w2", "w3", "j0", "j1", "j2", "j3", "t"], n: [[0.4, 3], [3, 5.4], [3, 3.8], [3, 2.2], [3, 0.6], [7, 5.4], [7, 3.8], [7, 2.2], [7, 0.6], [9.6, 3]], e: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [1, 5, 1], [1, 6, 1], [2, 5, 1], [3, 6, 1], [3, 7, 1], [3, 8, 1], [4, 7, 1], [5, 9, 1], [6, 9, 1], [7, 9, 1], [8, 9, 1]] },
  };
  V.register("g10-flow", {
    title: "Maximum flow, one augmenting path at a time", hint: "Press Step to push flow along a path",
    setup(A, a) {
      let nk = NETS[a.net] ? a.net : "classic", how = a.how || "bfs", f, hist, done, cur;
      const P = A.plot({ x: [0, 10], y: [0, 6.2], h: 360 });
      const reset = () => { A.stop(); f = NETS[nk].e.map(() => 0); hist = []; done = false; cur = null; };
      A.select("Network", Object.keys(NETS), nk, (v) => { nk = v; reset(); });
      A.seg([["bfs", "Shortest path first (Edmonds–Karp)"], ["dfs", "First path found (DFS)"]], how, (v) => { how = v; reset(); });
      const step = () => {
        if (done) return false; const N = NETS[nk], n = N.n.length, t = n - 1, arcs = [];
        N.e.forEach(([u, v, c], k) => { arcs.push([u, v, k, 1]); arcs.push([v, u, k, -1]); });
        const res = ([u, v, k, d]) => (d > 0 ? N.e[k][2] - f[k] : f[k]);
        const prev = new Array(n).fill(null); prev[0] = "src"; const out = (u) => arcs.filter((x) => x[0] === u && res(x) > 0).sort((x, y) => x[1] - y[1]);
        if (how === "bfs") { const q = [0]; while (q.length && !prev[t]) { const u = q.shift(); for (const x of out(u)) if (!prev[x[1]]) { prev[x[1]] = x; q.push(x[1]); } } }
        else { const dfs = (u) => { if (u === t) return true; for (const x of out(u)) if (!prev[x[1]]) { prev[x[1]] = x; if (dfs(x[1])) return true; } return false; }; dfs(0); }
        if (!prev[t]) { done = true; cur = null; return false; }
        const path = []; let v = t; while (v !== 0) { path.unshift(prev[v]); v = prev[v][0]; }
        const b = Math.min(...path.map(res)); path.forEach(([, , k, d]) => (f[k] += d * b));
        cur = path; hist.push({ path: [0].concat(path.map((x) => x[1])).map((i) => N.names[i]).join("→"), b, back: path.some((x) => x[3] < 0) }); return true;
      };
      A.buttons([{ label: "Step", on: () => step() }, { label: "▶ Run to the end", on: () => { let t = 0; A.loop((dt) => { t += dt; if (t > 0.9) { t = 0; if (!step()) { A.draw(); return false; } } A.draw(); return true; }); } }, { label: "Reset", on: reset }]);
      reset();
      A.draw = () => {
        const C = P.clear().P, N = NETS[nk], n = N.n.length, total = hist.reduce((s, h) => s + h.b, 0);
        let S = null; if (done) { S = new Set([0]); const st = [0]; while (st.length) { const u = st.pop(); N.e.forEach(([x, y, c], k) => { if (x === u && c - f[k] > 0 && !S.has(y)) { S.add(y); st.push(y); } if (y === u && f[k] > 0 && !S.has(x)) { S.add(x); st.push(x); } }); } }
        const onPath = new Set((cur || []).map((x) => x[2]));
        N.e.forEach(([u, v, c], k) => { const p = N.n[u], q = N.n[v], dx = q[0] - p[0], dy = q[1] - p[1], Ln = Math.hypot(dx, dy), r = 0.42; const cutE = S && S.has(u) && !S.has(v);
          P.arrow(p[0] + (dx / Ln) * r, p[1] + (dy / Ln) * r, q[0] - (dx / Ln) * r, q[1] - (dy / Ln) * r, { color: cutE ? C.bad : onPath.has(k) ? C.pink : f[k] === c ? C.accent : f[k] > 0 ? C.blue : C.line2, width: onPath.has(k) || cutE ? 4 : f[k] > 0 ? 3 : 2, head: 11, dash: cutE ? [8, 5] : null });
          P.text(`${f[k]}/${c}`, (p[0] + q[0]) / 2, (p[1] + q[1]) / 2, { dy: -6, size: 12, color: f[k] === c ? C.accent : C.ink }); });
        N.n.forEach((p, i) => { const inS = S && S.has(i); P.dot(p[0], p[1], 16, { color: inS ? C.green : i === 0 || i === n - 1 ? C.ink : C.bg2, stroke: C.line2, sw: 1.5 }); P.text(N.names[i], p[0], p[1], { dy: 5, size: 12, color: inS || i === 0 || i === n - 1 ? "#fff" : C.ink, halo: false }); });
        const last = hist[hist.length - 1];
        let m = `<span class="k">labels are flow/capacity.</span> <span class="k">total flow out of s:</span> <b>${total}</b> `;
        if (done) { const cap = N.e.reduce((s, [u, v, c]) => s + (S.has(u) && !S.has(v) ? c : 0), 0); m += `<b style="color:var(--good)">No augmenting path left: maximum flow = ${total}.</b> <span class="k">Green vertices are still reachable from s in the residual graph. The red dashed edges leave that set: a minimum cut of capacity</span> <b>${cap}</b> <span class="k">= max flow.</span>`; }
        else if (last) m += `<span class="k">last augmenting path</span> <b>${last.path}</b> <span class="k">bottleneck</span> <b>${last.b}</b>${last.back ? ' <b style="color:var(--warn)">(uses a backward residual edge: it cancels earlier flow)</b>' : ""}`;
        else m += `<span class="k">Press Step to find a path from s to t with spare capacity.</span>`;
        A.set(m);
      };
    },
  });

  const DAGS = {
    dressing: { names: ["undershorts", "socks", "shirt", "watch", "trousers", "tie", "shoes", "belt", "jacket"], e: [[0, 4], [0, 6], [1, 6], [4, 6], [4, 7], [2, 7], [2, 5], [5, 8], [7, 8]], cyc: [8, 2] },
    courses: { names: ["Algebra", "Calculus", "Lin. algebra", "Probability", "Multivariable", "Statistics", "ML"], e: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [3, 5], [2, 6], [4, 6], [5, 6]], cyc: [6, 0] },
    build: { names: ["utils", "parser", "net", "db", "api", "ui", "app"], e: [[0, 1], [0, 2], [0, 3], [1, 4], [3, 4], [2, 4], [4, 5], [4, 6], [5, 6]], cyc: [6, 1] },
  };
  V.register("g10-dag", {
    title: "Topological sort (Kahn's algorithm)", hint: "Step through: repeatedly remove a vertex with no incoming edges",
    setup(A, a) {
      let dk = DAGS[a.dag] ? a.dag : "dressing", cyc = !!a.cycle, steps = [], si = 0;
      const P = A.plot({ x: [0, 10], y: [0, 6.2], h: 360 });
      A.select("DAG", Object.keys(DAGS), dk, (v) => { dk = v; run(); });
      A.seg([["no", "As given"], ["yes", "Add an edge that makes a cycle"]], cyc ? "yes" : "no", (v) => { cyc = v === "yes"; run(); });
      A.buttons([{ label: "Step", on: () => (si = Math.min(si + 1, steps.length - 1)) }, { label: "▶ Play", on: () => { si = 0; let t = 0; A.loop((dt) => { t += dt; if (t > 0.8) { t = 0; si++; } A.draw(); return si < steps.length - 1; }); } }, { label: "Reset", on: () => { A.stop(); si = 0; } }]);
      let pos = [], lvl = [];
      function run() {
        A.stop(); const D = DAGS[dk], n = D.names.length, E = D.e.concat(cyc ? [D.cyc] : []);
        lvl = new Array(n).fill(0); for (let r = 0; r < n; r++) D.e.forEach(([u, v]) => (lvl[v] = Math.max(lvl[v], lvl[u] + 1)));
        const maxL = Math.max(...lvl), cnt = {}; pos = lvl.map((l, i) => { const same = lvl.filter((x) => x === l).length; cnt[l] = (cnt[l] || 0) + 1; return [1.1 + (l * 7.8) / Math.max(1, maxL), 6.2 - (cnt[l] * 6.2) / (same + 1)]; });
        const indeg = new Array(n).fill(0); E.forEach(([, v]) => indeg[v]++);
        const done = [], q = indeg.map((d, i) => (d === 0 ? i : -1)).filter((x) => x >= 0); steps = [{ indeg: indeg.slice(), q: q.slice(), done: [], cur: null, msg: `In-degrees computed. Vertices with in-degree 0 go in the queue: [${q.map((i) => D.names[i]).join(", ")}]` }];
        while (q.length) { q.sort((x, y) => x - y); const u = q.shift(); done.push(u); const freed = []; E.forEach(([x, v]) => { if (x === u) { indeg[v]--; if (indeg[v] === 0) { q.push(v); freed.push(v); } } }); steps.push({ indeg: indeg.slice(), q: q.slice(), done: done.slice(), cur: u, msg: `Output <b>${D.names[u]}</b> and delete its outgoing edges${freed.length ? `; now in-degree 0: ${freed.map((i) => D.names[i]).join(", ")}` : ""}.` }); }
        const fin = done.length === n;
        steps.push({ indeg: indeg.slice(), q: [], done: done.slice(), cur: null, end: true, msg: fin ? `<b style="color:var(--good)">Done. Topological order:</b> <b>${done.map((i) => D.names[i]).join(" → ")}</b> <span class="k">Longest chain has ${maxL + 1} vertices, so you need at least ${maxL + 1} rounds (columns) if independent tasks run in parallel.</span>` : `<b style="color:var(--bad)">Stuck after ${done.length} of ${n} vertices:</b> <span class="k">every remaining vertex still has an incoming edge, which only happens when there is a directed cycle. No topological order exists.</span>` });
        si = 0;
      }
      run();
      A.draw = () => {
        const C = P.clear().P, D = DAGS[dk], E = D.e.concat(cyc ? [D.cyc] : []), s = steps[Math.min(si, steps.length - 1)], w = 1.9, h = 0.62;
        E.forEach(([u, v], k) => { const p = pos[u], q = pos[v], gone = s.done.includes(u), isC = cyc && k === E.length - 1; const dx = q[0] - p[0], dy = q[1] - p[1], Ln = Math.hypot(dx, dy); const cut = (x, y) => { const tx = Math.abs(x) > 1e-9 ? w / 2 / Math.abs(x) : 1e9, ty = Math.abs(y) > 1e-9 ? h / 2 / Math.abs(y) : 1e9; return Math.min(tx, ty) + 0.08; };
          const t0 = cut(dx / Ln, dy / Ln); P.arrow(p[0] + (dx / Ln) * t0, p[1] + (dy / Ln) * t0, q[0] - (dx / Ln) * t0, q[1] - (dy / Ln) * t0, { color: isC ? C.bad : gone ? C.line : C.muted, width: isC ? 3 : 2, head: 10, alpha: gone ? 0.35 : 1, dash: gone ? [5, 4] : null }); });
        D.names.forEach((nm, i) => { const [x, y] = pos[i], dn = s.done.includes(i), inQ = s.q.includes(i), cu = s.cur === i; P.rect(x - w / 2, y - h / 2, w, h, { fill: cu ? C.pink : dn ? C.accent : inQ ? C.yellow : C.bg2, fa: dn || cu ? 0.95 : inQ ? 0.6 : 1, color: C.line2, width: 1.5 });
          P.text(nm, x, y, { dy: 4, size: 12, color: dn || cu ? "#fff" : C.ink, halo: false }); if (!dn) P.text("in " + s.indeg[i], x + w / 2, y + h / 2, { dy: -2, dx: -2, align: "right", size: 10, color: C.pink }); if (dn) P.text("#" + (s.done.indexOf(i) + 1), x + w / 2, y + h / 2, { dy: -2, dx: -2, align: "right", size: 10, color: "#fff", halo: false }); });
        A.set(`<span class="k">step ${si + 1}/${steps.length}</span> ${s.msg} <span class="k">queue: [${s.q.map((i) => D.names[i]).join(", ")}] · yellow = ready (in-degree 0), blue = output, #k = position in the order</span>`);
      };
    },
  });
})();
