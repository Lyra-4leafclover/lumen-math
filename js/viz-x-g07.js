/* g07 visuals: joint entropy diagram, Huffman coding, numerical error lab (finite differences and interpolation) */
(function () {
  const V = window.Viz, { fmt } = V.util;
  const R = (n, d = 2) => fmt(n, d);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const H = (ps) => -ps.reduce((s, p) => s + (p > 0 ? p * Math.log2(p) : 0), 0);
  const show = (ctlEl, on) => { const box = ctlEl.classList && ctlEl.classList.contains("viz-btns") ? ctlEl : ctlEl.parentElement; box.style.display = on ? "" : "none"; };

  V.register("g07-joint", {
    title: "Joint entropy, conditional entropy and mutual information", hint: "Reshape the joint table or pick a preset",
    setup(A, a) {
      const w = [0.4, 0.1, 0.1, 0.4];
      const names = ["p(X=0, Y=0)", "p(X=0, Y=1)", "p(X=1, Y=0)", "p(X=1, Y=1)"];
      const sl = w.map((v, i) => A.slider(names[i], 0, 1, 0.01, v, (x) => (w[i] = x)));
      const PRE = { "independent": [0.42, 0.18, 0.28, 0.12], "Y is a copy of X": [0.5, 0, 0, 0.5], "noisy copy": [0.45, 0.05, 0.05, 0.45], "uniform": [0.25, 0.25, 0.25, 0.25] };
      A.buttons(Object.entries(PRE).map(([k, v]) => ({ label: k, on: () => v.forEach((x, i) => { w[i] = x; sl[i].set(x); }) })));
      const G = A.plot({ x: [-0.1, 2.1], y: [-0.1, 2.1], h: 220 });
      const B = A.plot({ x: [-0.08, 2.15], y: [-0.35, 3.3], h: 210, equal: false });
      A.draw = () => {
        let s = w.reduce((x, y) => x + y, 0); const p = s > 0 ? w.map((v) => v / s) : [0.25, 0.25, 0.25, 0.25];
        const px = [p[0] + p[1], p[2] + p[3]], py = [p[0] + p[2], p[1] + p[3]];
        const HXY = H(p), HX = H(px), HY = H(py), I = Math.max(0, HX + HY - HXY), HXgY = HXY - HY, HYgX = HXY - HX, mx = Math.max(...p) || 1;
        let C = G.clear().P;
        for (let x = 0; x < 2; x++) for (let y = 0; y < 2; y++) {
          const v = p[2 * x + y];
          G.rect(y + 0.04, 1 - x + 0.04, 0.92, 0.92, { fill: C.accent, fa: 0.08 + 0.7 * (v / mx), color: C.line2, width: 1 });
          G.text(`X=${x}, Y=${y}`, y + 0.5, 1 - x + 0.7, { size: 11, color: C.muted });
          G.text(R(v, 3), y + 0.5, 1 - x + 0.38, { size: 17 });
        }
        C = B.clear().P;
        for (let t = 0; t <= 2; t += 0.5) { B.line(t, -0.05, t, 3.2, { color: C.line, width: 1 }); B.text(R(t, 1), t, -0.3, { size: 10, color: C.muted }); }
        const bar = (x0, x1, y, col, lab) => { B.rect(x0, y, Math.max(0, x1 - x0), 0.7, { fill: col, fa: 0.55, color: col, width: 1.5 }); B.text(lab, x0 + 0.02, y + 0.35, { align: "left", base: "middle", size: 12 }); };
        bar(0, HXY, 2.3, C.muted, `H(X,Y) = ${R(HXY, 3)}`);
        bar(0, HX, 1.3, C.accent, `H(X) = ${R(HX, 3)}`);
        bar(HXgY, HXY, 0.3, C.orange, `H(Y) = ${R(HY, 3)}`);
        if (I > 1e-4) { B.rect(HXgY, 0.3, I, 1.7, { fill: C.green, fa: 0.25, color: C.green, width: 2, dash: [5, 4] }); }
        A.set(`<span class="k">marginals</span> ${A.tex(`p_X = (${R(px[0], 3)}, ${R(px[1], 3)}),\\ p_Y = (${R(py[0], 3)}, ${R(py[1], 3)})`)} ${A.tex(`H(X\\mid Y) = ${R(HXgY, 3)}`)} ${A.tex(`H(Y\\mid X) = ${R(HYgX, 3)}`)} ${A.tex(`I(X;Y) = H(X) + H(Y) - H(X,Y) = ${R(I, 3)}\\text{ bits}`)} <span class="k">green dashed box = the overlap of the two bars = mutual information</span>`);
      };
    },
  });

  V.register("g07-huffman", {
    title: "Huffman coding vs entropy", hint: "Change the symbol frequencies",
    setup(A, a) {
      const S = ["A", "B", "C", "D", "E"], w = [0.4, 0.2, 0.2, 0.1, 0.1];
      const sl = w.map((v, i) => A.slider(`weight of ${S[i]}`, 0.01, 1, 0.01, v, (x) => (w[i] = x)));
      const PRE = { "skewed": [0.4, 0.2, 0.2, 0.1, 0.1], "powers of 1/2": [0.5, 0.25, 0.125, 0.0625, 0.0625], "uniform": [0.2, 0.2, 0.2, 0.2, 0.2], "one dominant": [0.9, 0.04, 0.03, 0.02, 0.01] };
      A.buttons(Object.entries(PRE).map(([k, v]) => ({ label: k, on: () => v.forEach((x, i) => { w[i] = x; sl[i].set(x); }) })));
      const P = A.plot({ x: [0, 10], y: [-0.4, 6], h: 260, equal: false });
      const box = el("div", "tt-wrap"); A.stage.appendChild(box);
      A.draw = () => {
        const s = w.reduce((x, y) => x + y, 0), p = w.map((v) => v / s);
        let id = 0; const pool = p.map((q, i) => ({ p: q, sym: i, id: id++ }));
        while (pool.length > 1) { pool.sort((u, v) => u.p - v.p || u.id - v.id); const l = pool.shift(), r = pool.shift(); pool.push({ p: l.p + r.p, l: r, r: l, id: id++ }); }
        const root = pool[0], code = [], leaves = []; let maxD = 0;
        const walk = (n, c, d) => { n.d = d; maxD = Math.max(maxD, d); if (n.sym != null) { code[n.sym] = c; leaves.push(n); return; } walk(n.l, c + "0", d + 1); walk(n.r, c + "1", d + 1); };
        walk(root, "", 0);
        leaves.forEach((n, i) => (n.x = 1 + (8 * (i + 0.5)) / leaves.length));
        const place = (n) => { if (n.sym != null) return n.x; n.x = (place(n.l) + place(n.r)) / 2; return n.x; };
        place(root);
        const yOf = (d) => 5.4 - (d * 4.6) / Math.max(1, maxD);
        const C = P.clear().P;
        const draw = (n) => { if (n.sym != null) return; [[n.l, "0"], [n.r, "1"]].forEach(([c, b]) => { P.line(n.x, yOf(n.d), c.x, yOf(c.d), { color: C.line2, width: 2 }); P.text(b, (n.x + c.x) / 2 + (b === "0" ? -0.15 : 0.15), (yOf(n.d) + yOf(c.d)) / 2, { size: 12, color: C.accent }); draw(c); }); };
        draw(root);
        const nodes = (n) => { P.dot(n.x, yOf(n.d), n.sym != null ? 9 : 6, { color: n.sym != null ? C.orange : C.muted }); P.text(n.sym != null ? `${S[n.sym]} ${R(n.p, 3)}` : R(n.p, 3), n.x, yOf(n.d), { dy: n.sym != null ? 24 : -10, size: 11 }); if (n.sym == null) { nodes(n.l); nodes(n.r); } };
        nodes(root);
        const L = p.reduce((t, q, i) => t + q * code[i].length, 0), Hp = H(p);
        box.innerHTML = `<table class="tt"><thead><tr><th>symbol</th><th>probability p</th><th>surprise −log₂ p</th><th>Huffman code</th><th>length</th></tr></thead><tbody>${p.map((q, i) => `<tr><td>${S[i]}</td><td>${R(q, 3)}</td><td>${R(-Math.log2(q), 3)}</td><td class="res">${code[i]}</td><td>${code[i].length}</td></tr>`).join("")}</tbody></table>`;
        A.set(`${A.tex(`H(p) = ${R(Hp, 3)}\\text{ bits}`)} <span class="k">average Huffman length</span> ${A.tex(`\\bar L = \\sum p_i \\ell_i = ${R(L, 3)}\\text{ bits}`)} <span class="k">efficiency H/L =</span> <b>${R((100 * Hp) / L, 1)}%</b> <span class="k">always</span> ${A.tex(`H \\le \\bar L < H + 1`)} <span class="k">vs 3 bits for a fixed-length code</span>`);
      };
    },
  });

  function spline(xs, ys) {
    const n = xs.length - 1, h = [], al = [0], l = [1], mu = [0], z = [0], c = new Array(n + 1).fill(0), b = [], d = [];
    for (let i = 0; i < n; i++) h.push(xs[i + 1] - xs[i]);
    for (let i = 1; i < n; i++) al.push((3 / h[i]) * (ys[i + 1] - ys[i]) - (3 / h[i - 1]) * (ys[i] - ys[i - 1]));
    for (let i = 1; i < n; i++) { l[i] = 2 * (xs[i + 1] - xs[i - 1]) - h[i - 1] * mu[i - 1]; mu[i] = h[i] / l[i]; z[i] = (al[i] - h[i - 1] * z[i - 1]) / l[i]; }
    for (let j = n - 1; j >= 0; j--) { c[j] = (j < n ? z[j] || 0 : 0) - mu[j] * c[j + 1]; b[j] = (ys[j + 1] - ys[j]) / h[j] - (h[j] * (c[j + 1] + 2 * c[j])) / 3; d[j] = (c[j + 1] - c[j]) / (3 * h[j]); }
    c[0] = 0;
    return (x) => { let j = 0; while (j < n - 1 && x > xs[j + 1]) j++; const t = x - xs[j]; return ys[j] + b[j] * t + c[j] * t * t + d[j] * t * t * t; };
  }
  function lagr(xs, ys) {
    const n = xs.length, wt = xs.map((xj, j) => { let p = 1; for (let k = 0; k < n; k++) if (k !== j) p *= xj - xs[k]; return 1 / p; });
    return (x) => { let num = 0, den = 0; for (let j = 0; j < n; j++) { const dx = x - xs[j]; if (dx === 0) return ys[j]; const t = wt[j] / dx; num += t * ys[j]; den += t; } return num / den; };
  }

  V.register("g07-approx", {
    title: "Numerical error lab", hint: "Switch between finite differences and interpolation",
    setup(A, a) {
      let mode = a.mode === "interp" ? "interp" : "diff", nodes = "equi", fk = "sin x";
      const P = A.plot({ x: [-16.5, 0.5], y: [-18, 1.5], h: 330, equal: false });
      const FD = { "sin x": [Math.sin, Math.cos], "eˣ": [Math.exp, Math.exp], "x³": [(x) => x ** 3, (x) => 3 * x * x] };
      A.seg([["diff", "Finite differences"], ["interp", "Interpolation (Runge)"]], mode, (v) => { mode = v; sync(); });
      const fSel = A.select("f(x) at x = 1", Object.keys(FD), fk, (v) => (fk = v));
      const lh = A.slider("log₁₀ h", -16, 0, 0.1, -5);
      const nS = A.slider("degree n (n + 1 points)", 1, 20, 1, 10);
      const nodeSeg = A.seg([["equi", "Evenly spaced polynomial"], ["cheb", "Chebyshev nodes polynomial"], ["spline", "Cubic spline (even)"]], nodes, (v) => (nodes = v));
      function sync() { show(fSel.el, mode === "diff"); show(lh.el, mode === "diff"); show(nS.el, mode === "interp"); show(nodeSeg, mode === "interp"); P.setView(mode === "diff" ? [-16.5, 0.5] : [-1.1, 1.1], mode === "diff" ? [-18, 1.5] : [-0.8, 1.8]); }
      sync();
      const runge = (x) => 1 / (1 + 25 * x * x);
      A.draw = () => {
        if (mode === "diff") {
          const C = P.clear().grid(2, { stepY: 2 }).P, [f, df] = FD[fk], x = 1, ex = df(x);
          const err = (t, kind) => { const h = 10 ** t; const v = kind === "f" ? (f(x + h) - f(x)) / h : (f(x + h) - f(x - h)) / (2 * h); return Math.log10(Math.max(Math.abs(v - ex), 1e-17)); };
          const F = [], Cn = []; for (let t = -16; t <= 0.001; t += 0.05) { F.push([t, err(t, "f")]); Cn.push([t, err(t, "c")]); }
          for (let t = -16; t <= 0; t += 2) P.text(`1e${t}`, t, -17.7, { size: 10, color: C.muted });
          for (let k = -16; k <= 0; k += 4) P.text(`1e${k}`, -16.4, k, { size: 10, color: C.muted, align: "left", dy: 4 });
          P.poly(F, { color: C.orange, width: 2.2 }); P.poly(Cn, { color: C.accent, width: 2.2 });
          P.line(lh.v, -17.3, lh.v, 1.5, { color: C.pink, width: 2, dash: [5, 4] });
          P.text("forward (orange)", -2.2, 0.6, { size: 11, color: C.orange }); P.text("central (purple)", -2.2, -0.6, { size: 11, color: C.accent });
          const h = 10 ** lh.v, fw = (f(x + h) - f(x)) / h, ce = (f(x + h) - f(x - h)) / (2 * h);
          A.set(`<span class="k">x-axis: step h, y-axis: |error| (both log scale). exact f′(1) =</span> <b class="mono">${ex.toPrecision(12)}</b> <span class="k">at h = ${h.toExponential(1)}: forward</span> <b class="mono">${fw.toPrecision(12)}</b> <span class="k">error ${Math.abs(fw - ex).toExponential(1)}; central</span> <b class="mono">${ce.toPrecision(12)}</b> <span class="k">error ${Math.abs(ce - ex).toExponential(1)}. Right side: truncation error; left side: rounding error.</span>`);
        } else {
          const C = P.clear().grid(0.25, { stepY: 0.5 }).axes({ step: 0.5, stepY: 0.5 }).P, n = nS.v;
          const xs = Array.from({ length: n + 1 }, (_, i) => (nodes === "cheb" ? Math.cos(((2 * i + 1) * Math.PI) / (2 * (n + 1))) : -1 + (2 * i) / n)).sort((u, v) => u - v), ys = xs.map(runge);
          const g = nodes === "spline" ? (n >= 2 ? spline(xs, ys) : lagr(xs, ys)) : lagr(xs, ys);
          P.fn(runge, { color: C.muted, width: 4, alpha: 0.5, from: -1, to: 1 }); P.fn(g, { color: C.accent, width: 2.5, from: -1, to: 1 });
          xs.forEach((x, i) => P.dot(x, ys[i], 4.5, { color: C.pink }));
          let me = 0; for (let i = 0; i <= 600; i++) { const x = -1 + i / 300; me = Math.max(me, Math.abs(g(x) - runge(x))); }
          A.set(`<span class="k">grey: f(x) = 1/(1 + 25x²); purple: the interpolant through the pink points.</span> <span class="k">max error on [−1, 1] =</span> <b>${me < 1e3 ? R(me, 4) : me.toExponential(2)}</b> <span class="k">${nodes === "equi" ? "Evenly spaced points: the error at the edges grows as n grows (Runge's phenomenon)." : nodes === "cheb" ? "Chebyshev points cluster at the ends, and the error shrinks as n grows." : "Piecewise cubics: each piece only sees its neighbours, so no wild edge oscillation."}</span>`);
        }
      };
    },
  });
})();
