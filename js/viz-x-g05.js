/* g05 visuals: computational graphs with backprop, Jacobian as local linear map, linear programming */
(function () {
  const V = window.Viz, { fmt } = V.util;
  const R = (n, d = 2) => fmt(n, d);

  /* ---------- computational graph: forward values and backward gradients ---------- */
  const sig = (z) => 1 / (1 + Math.exp(-z));
  const OPS = {
    mul: { s: "×", f: (a, b) => a * b, d: (a, b) => [b, a] },
    add: { s: "+", f: (a, b) => a + b, d: () => [1, 1] },
    sub: { s: "−", f: (a, b) => a - b, d: () => [1, -1] },
    sq: { s: "( )²", f: (a) => a * a, d: (a) => [2 * a] },
    hsq: { s: "½( )²", f: (a, y) => 0.5 * (a - y) ** 2, d: (a, y) => [a - y, 0] },
    sigmoid: { s: "σ", f: (a) => sig(a), d: (a) => [sig(a) * (1 - sig(a))] },
    relu: { s: "ReLU", f: (a) => Math.max(0, a), d: (a) => [a > 0 ? 1 : 0] },
    bce: { s: "CE", f: (p, y) => -(y * Math.log(p) + (1 - y) * Math.log(1 - p)), d: (p, y) => [-y / p + (1 - y) / (1 - p), 0] },
  };
  const GRAPHS = {
    linear: {
      t: "L = (wx + b − y)²",
      ins: { w: [3, -4, 4], x: [2, -4, 4], b: [1, -4, 4], y: [4, -4, 6] }, data: ["y"],
      nodes: [["u", "mul", "w", "x"], ["v", "add", "u", "b"], ["e", "sub", "v", "y"], ["L", "sq", "e"]],
    },
    neuron: {
      t: "p = σ(wx + b), L = cross-entropy(p, y)",
      ins: { w: [1, -4, 4], x: [2, -3, 3], b: [-1, -4, 4], y: [1, 0, 1] }, data: ["y"], step: { y: 1 },
      nodes: [["u", "mul", "w", "x"], ["z", "add", "u", "b"], ["p", "sigmoid", "z"], ["L", "bce", "p", "y"]],
    },
    mlp: {
      t: "h = ReLU(w₁x + b₁), ŷ = w₂h + b₂, L = ½(ŷ − y)²",
      ins: { x: [1.5, -3, 3], w1: [2, -3, 3], b1: [-1, -3, 3], w2: [1.5, -3, 3], b2: [0.5, -3, 3], y: [1, -4, 4] }, data: ["x", "y"],
      nodes: [["u1", "mul", "w1", "x"], ["a", "add", "u1", "b1"], ["h", "relu", "a"], ["u2", "mul", "w2", "h"], ["ŷ", "add", "u2", "b2"], ["L", "hsq", "ŷ", "y"]],
    },
  };
  V.register("g05-compgraph", {
    title: "Computational graph and backpropagation", hint: "Move the inputs, then step the backward pass",
    setup(A, a) {
      let gk = GRAPHS[a.graph] ? a.graph : "linear", shown = 0, sliders = {};
      const P = A.plot({ x: [-0.6, 6.6], y: [-1.75, 1.75], h: 300, equal: false });
      A.select("Graph", Object.keys(GRAPHS).map((k) => [k, GRAPHS[k].t]), gk, (v) => { gk = v; build(); });
      A.buttons([{ label: "◀ Backward step", on: () => (shown = Math.min(shown + 1, order().length)) }, { label: "All gradients", on: () => (shown = order().length) }, { label: "Reset", on: () => (shown = 0) }]);
      const box = document.createElement("div"); box.className = "viz-ctl"; A.root.insertBefore(box, A.stage);
      function build() {
        box.innerHTML = ""; sliders = {}; shown = 0; const G = GRAPHS[gk];
        Object.entries(G.ins).forEach(([k, [v, lo, hi]]) => {
          const w = document.createElement("div"); w.className = "ctl";
          w.innerHTML = `<label>${k}</label><input type="range"><output></output>`;
          const inp = w.children[1], out = w.children[2];
          Object.assign(inp, { min: lo, max: hi, step: (G.step && G.step[k]) || 0.1, value: v });
          const show = () => (out.textContent = R(+inp.value, 2));
          inp.oninput = () => { show(); A.draw(); }; show(); box.appendChild(w); sliders[k] = inp;
        });
      }
      const order = () => { const G = GRAPHS[gk]; return [...G.nodes.map((n) => n[0]).reverse(), ...Object.keys(G.ins).filter((k) => !G.data.includes(k))]; };
      function run(over) {
        const G = GRAPHS[gk], val = {};
        Object.keys(G.ins).forEach((k) => (val[k] = over && k in over ? over[k] : +sliders[k].value));
        G.nodes.forEach(([n, op, ...ps]) => (val[n] = OPS[op].f(...ps.map((p) => val[p]))));
        const grad = {}; Object.keys(val).forEach((k) => (grad[k] = 0)); const last = G.nodes[G.nodes.length - 1][0]; grad[last] = 1;
        const local = {};
        [...G.nodes].reverse().forEach(([n, op, ...ps]) => { const d = OPS[op].d(...ps.map((p) => val[p])); ps.forEach((p, i) => { grad[p] += grad[n] * d[i]; (local[p] = local[p] || []).push([n, d[i]]); }); });
        return { val, grad, local, L: val[last] };
      }
      function layout() {
        const G = GRAPHS[gk], pos = {}, dep = {};
        G.nodes.forEach(([n, , ...ps]) => (dep[n] = 1 + Math.max(...ps.map((p) => (p in dep ? dep[p] : 0)))));
        const used = {};
        G.nodes.forEach(([n]) => (pos[n] = [dep[n], 0]));
        Object.keys(G.ins).forEach((k) => { const ch = G.nodes.filter((nd) => nd.slice(2).includes(k)).map((nd) => dep[nd[0]]); const c = Math.min(...ch) - 1; used[c] = (used[c] || 0) + 1; pos[k] = [c, used[c] % 2 ? 1.05 : -1.05]; });
        const D = Math.max(...Object.values(dep)); return { pos, D };
      }
      build();
      A.draw = () => {
        const G = GRAPHS[gk], C = P.clear().P, { pos, D } = layout(), r = run(), ord = order(), vis = new Set(ord.slice(0, shown));
        P.setView([-0.7, D + 0.7], [-1.75, 1.75]);
        const rad = Math.max(15, Math.min(27, P.W / (D + 1.4) / 2.6)), fs = rad > 21 ? 12 : 10;
        G.nodes.forEach(([n, , ...ps]) => ps.forEach((p) => { const [x1, y1] = pos[p], [x2, y2] = pos[n]; const k = (rad + 6) / Math.hypot((x2 - x1) * P.sx, (y2 - y1) * P.sy); P.arrow(x1 + (x2 - x1) * k, y1 + (y2 - y1) * k, x2 - (x2 - x1) * k, y2 - (y2 - y1) * k, { color: vis.has(p) ? C.pink : C.muted, width: vis.has(p) ? 2.5 : 1.5, head: 9 }); }));
        Object.keys(pos).forEach((k) => {
          const [x, y] = pos[k], isIn = k in G.ins, nd = G.nodes.find((q) => q[0] === k);
          P.dot(x, y, rad, { color: isIn && !G.data.includes(k) ? C.yellow : C.bg2, stroke: k === "L" ? C.accent : vis.has(k) ? C.pink : C.line2, sw: k === "L" || vis.has(k) ? 3 : 1.5 });
          P.text(k, x, y, { dy: 1, size: fs + 2, base: "middle", halo: false });
          if (nd) P.text(OPS[nd[1]].s, x, y, { dy: -rad - 6, size: fs, color: C.muted });
          P.text("= " + R(r.val[k], 3), x, y, { dy: rad + 14, size: fs, color: C.ink2 });
          if (vis.has(k)) P.text("∂L/∂" + k + " = " + R(r.grad[k], 3), x, y, { dy: rad + 28, size: fs, color: C.pink });
        });
        const last = ord[shown - 1];
        let msg = `<span class="k">forward:</span> <b>L = ${R(r.L, 4)}</b> `;
        if (!shown) msg += `<span class="k">Press "Backward step" to send gradients from L back toward the inputs. Yellow nodes are parameters.</span>`;
        else if (last === G.nodes[G.nodes.length - 1][0]) msg += `<span class="k">start:</span> ${A.tex("\\partial L/\\partial L = 1")}`;
        else {
          const parts = r.local[last].map(([n, d]) => `${R(r.grad[n], 3)} × ${R(d, 3)}`).join(" + ");
          msg += `<span class="k">chain rule at <b>${last}</b>: upstream × local =</span> <b class="mono">${parts} = ${R(r.grad[last], 4)}</b>`;
        }
        const p0 = Object.keys(G.ins).find((k) => !G.data.includes(k)), h = 1e-5, v0 = +sliders[p0].value;
        const num = (run({ [p0]: v0 + h }).L - run({ [p0]: v0 - h }).L) / (2 * h);
        msg += ` <span class="k">gradient check for ${p0}: backprop ${R(r.grad[p0], 5)} vs finite difference</span> <b>${R(num, 5)}</b>`;
        A.set(msg);
      };
    },
  });

  /* ---------- Jacobian: a nonlinear map looks linear up close ---------- */
  const MAPS = {
    square: { t: "F(x, y) = (x² − y², 2xy)", F: (x, y) => [x * x - y * y, 2 * x * y], J: (x, y) => [[2 * x, -2 * y], [2 * y, 2 * x]], vin: [[-2.2, 2.2], [-1.6, 1.6]], vout: [[-5, 5], [-3.5, 3.5]], p: [1, 0.5] },
    polar: { t: "F(r, θ) = (r cos θ, r sin θ)", F: (r, t) => [r * Math.cos(t), r * Math.sin(t)], J: (r, t) => [[Math.cos(t), -r * Math.sin(t)], [Math.sin(t), r * Math.cos(t)]], vin: [[-0.5, 3], [-2, 2]], vout: [[-3, 3], [-2.6, 2.6]], p: [1.5, 0.6] },
    tanh: { t: "F(v) = tanh(Wv), W = [[1, 0.5], [−0.5, 1]]", F: (x, y) => [Math.tanh(x + 0.5 * y), Math.tanh(-0.5 * x + y)], J: (x, y) => { const a = 1 - Math.tanh(x + 0.5 * y) ** 2, b = 1 - Math.tanh(-0.5 * x + y) ** 2; return [[a, 0.5 * a], [-0.5 * b, b]]; }, vin: [[-2.5, 2.5], [-2, 2]], vout: [[-1.4, 1.4], [-1.1, 1.1]], p: [0.4, 0.2] },
    linear: { t: "F(v) = Av, A = [[2, 1], [0, 1]]", F: (x, y) => [2 * x + y, y], J: () => [[2, 1], [0, 1]], vin: [[-2.5, 2.5], [-2, 2]], vout: [[-6, 6], [-3, 3]], p: [0.5, 0.5] },
  };
  V.register("g05-jacobian", {
    title: "The Jacobian is the best local linear map", hint: "Drag the point; shrink the square",
    setup(A, a) {
      let mk = MAPS[a.map] ? a.map : "square"; const p = (a.px != null ? [a.px, a.py] : MAPS[mk].p).slice();
      A.select("Map", Object.keys(MAPS).map((k) => [k, MAPS[k].t]), mk, (v) => { mk = v; p.splice(0, 2, ...MAPS[v].p); setViews(); });
      const s = A.slider("square size", 0.05, 1.5, 0.05, a.size ?? 0.8);
      const Pin = A.plot({ x: [-2.2, 2.2], y: [-1.6, 1.6], h: 240 }), Pout = A.plot({ x: [-5, 5], y: [-3.5, 3.5], h: 260 });
      const setViews = () => { Pin.setView(...MAPS[mk].vin); Pout.setView(...MAPS[mk].vout); };
      setViews();
      Pin.handle(() => p, (x, y) => { p[0] = x; p[1] = y; });
      A.draw = () => {
        const M = MAPS[mk], h = s.v / 2, n = 6;
        let C = Pin.clear().grid(0.5).axes({ labels: false }).P;
        for (let i = 0; i <= n; i++) { const t = -h + (2 * h * i) / n; Pin.line(p[0] + t, p[1] - h, p[0] + t, p[1] + h, { color: C.blue, width: 1.2 }); Pin.line(p[0] - h, p[1] + t, p[0] + h, p[1] + t, { color: C.blue, width: 1.2 }); }
        Pin.text("input space", Pin.x0, Pin.y1, { dx: 8, dy: 16, align: "left", color: C.muted, size: 12 });
        Pin.drawHandle(...p, C.pink);
        C = Pout.clear().grid(1).axes({ labels: false }).P;
        const F0 = M.F(...p), J = M.J(...p), lin = (dx, dy) => [F0[0] + J[0][0] * dx + J[0][1] * dy, F0[1] + J[1][0] * dx + J[1][1] * dy];
        for (let i = 0; i <= n; i++) {
          const t = -h + (2 * h * i) / n;
          Pout.param((u) => M.F(p[0] + t, p[1] + u), -h, h, { color: C.blue, width: 1.4, n: 40 });
          Pout.param((u) => M.F(p[0] + u, p[1] + t), -h, h, { color: C.blue, width: 1.4, n: 40 });
          Pout.line(...lin(t, -h), ...lin(t, h), { color: C.orange, width: 1.4, dash: [4, 3] });
          Pout.line(...lin(-h, t), ...lin(h, t), { color: C.orange, width: 1.4, dash: [4, 3] });
        }
        Pout.arrow(...F0, ...lin(h, 0), { color: C.pink, width: 2.5 }); Pout.arrow(...F0, ...lin(0, h), { color: C.green, width: 2.5 });
        Pout.dot(...F0, 5, { color: C.pink });
        Pout.text("output space", Pout.x0, Pout.y1, { dx: 8, dy: 16, align: "left", color: C.muted, size: 12 });
        let err = 0; for (let i = 0; i <= 4; i++) for (let j = 0; j <= 4; j++) { const dx = -h + (h * i) / 2, dy = -h + (h * j) / 2, f = M.F(p[0] + dx, p[1] + dy), l = lin(dx, dy); err = Math.max(err, Math.hypot(f[0] - l[0], f[1] - l[1])); }
        const det = J[0][0] * J[1][1] - J[0][1] * J[1][0];
        A.set(`${A.tex(`J = \\begin{bmatrix}${R(J[0][0])} & ${R(J[0][1])}\\\\ ${R(J[1][0])} & ${R(J[1][1])}\\end{bmatrix}`)} <span class="k">at (${R(p[0])}, ${R(p[1])}) · det J =</span> <b>${R(det, 3)}</b> <span class="k">(local area scale) · blue = true image, orange dashed = linear approximation F(p) + J·Δ · largest gap</span> <b>${R(err, 4)}</b> <span class="k">(halve the square and the gap drops about 4×)</span>`);
      };
    },
  });

  /* ---------- linear programming: corners and the simplex walk ---------- */
  const CONS = [[1, 1, 6], [1, 3, 12], [2, 1, 10]];
  const VERTS = [[0, 0], [5, 0], [4, 2], [3, 3], [0, 4]];
  V.register("g05-lp", {
    title: "Linear programming: the best point is a corner", hint: "Change the objective, drag the test point, run simplex",
    setup(A, a) {
      const c1 = A.slider("c₁ (profit per x)", -3, 5, 0.1, a.c1 ?? 3), c2 = A.slider("c₂ (profit per y)", -3, 5, 0.1, a.c2 ?? 2);
      let path = [0]; const pt = [1.5, 1.5];
      const obj = (v) => c1.v * v[0] + c2.v * v[1];
      A.buttons([{ label: "Simplex step", on: () => { const i = path[path.length - 1], nb = [(i + 1) % 5, (i + 4) % 5].sort((u, w) => obj(VERTS[w]) - obj(VERTS[u])); if (obj(VERTS[nb[0]]) > obj(VERTS[i]) + 1e-9) path.push(nb[0]); } }, { label: "Reset walk", on: () => (path = [0]) }]);
      [c1, c2].forEach((sl) => sl.el.addEventListener("input", () => (path = [0])));
      const P = A.plot({ x: [-1, 7], y: [-0.8, 5.2], h: 340 });
      P.handle(() => pt, (x, y) => { pt[0] = x; pt[1] = y; }, { snap: 0.1 });
      A.draw = () => {
        const C = P.clear().grid(1).axes().P;
        CONS.forEach(([p, q, b]) => P.fn((x) => (b - p * x) / q, { color: C.line2, width: 1.5 }));
        P.poly(VERTS, { close: true, fill: C.accent, fa: 0.18, color: C.accent, width: 2.5 });
        const vals = VERTS.map(obj), best = Math.max(...vals), bi = vals.indexOf(best), cn = Math.hypot(c1.v, c2.v);
        if (cn > 1e-6 && Math.abs(c2.v) > 1e-6) for (let k = -3; k <= 3; k++) { const lv = best + (k * cn); P.fn((x) => (lv - c1.v * x) / c2.v, { color: k ? C.muted : C.orange, width: k ? 1 : 2.5, dash: k ? [4, 4] : [], alpha: k ? 0.6 : 1 }); }
        else if (cn > 1e-6) { const x0 = best / c1.v; P.line(x0, -1, x0, 6, { color: C.orange, width: 2.5 }); }
        if (cn > 1e-6) P.arrow(VERTS[bi][0], VERTS[bi][1], VERTS[bi][0] + c1.v / cn, VERTS[bi][1] + c2.v / cn, { color: C.pink, width: 3 });
        VERTS.forEach((v, i) => { P.dot(v[0], v[1], i === bi ? 8 : 5, { color: i === bi ? C.orange : C.ink }); P.text(`(${v[0]},${v[1]}) → ${R(vals[i], 2)}`, v[0], v[1], { dy: i === 0 ? 18 : -12, dx: i === 1 ? 10 : i === 4 ? 30 : 0, size: 11, color: C.ink2 }); });
        if (path.length > 1) P.poly(path.map((i) => VERTS[i]), { color: C.green, width: 4, alpha: 0.85 });
        P.dot(VERTS[path[path.length - 1]][0], VERTS[path[path.length - 1]][1], 6, { color: C.green });
        const feas = pt[0] >= -1e-9 && pt[1] >= -1e-9 && CONS.every(([p, q, b]) => p * pt[0] + q * pt[1] <= b + 1e-9);
        P.drawHandle(...pt, feas ? C.blue : C.bad);
        const cur = path[path.length - 1], done = [(cur + 1) % 5, (cur + 4) % 5].every((j) => vals[j] <= vals[cur] + 1e-9);
        A.set(`<span class="k">maximize</span> ${A.tex(`${R(c1.v)}x + ${R(c2.v)}y`)} <span class="k">s.t.</span> ${A.tex("x+y\\le6,\\ x+3y\\le12,\\ 2x+y\\le10,\\ x,y\\ge0")} <span class="k">· best corner</span> <b>(${VERTS[bi]}) = ${R(best, 3)}</b> <span class="k">· test point</span> <b style="color:var(${feas ? "--good" : "--bad"})">${feas ? "feasible" : "infeasible"}, value ${R(obj(pt), 3)}</b> <span class="k">· simplex at (${VERTS[cur]}) ${done ? "→ no neighbour is better: optimal" : "→ press Simplex step to move to a better neighbour"}</span>`);
      };
    },
  });
})();
