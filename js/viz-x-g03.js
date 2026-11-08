/* Linear algebra extras (g03): 3-D cross product, change of basis, quadratic forms */
(function () {
  const V = window.Viz, { fmt } = V.util;
  const R = (n, d = 2) => fmt(n, d);
  const col = (v) => `\\begin{bmatrix}${v.map((x) => R(x)).join("\\\\")}\\end{bmatrix}`;

  V.register("g03-cross", {
    title: "The cross product in 3-D", hint: "Move the sliders; turn the view with the camera slider",
    setup(A, a) {
      const P = A.plot({ x: [-6, 6], y: [-4.5, 4.5], h: 380 });
      const u = [a.ux ?? 2, a.uy ?? 0, a.uz ?? 0], v = [a.vx ?? 1, a.vy ?? 2, a.vz ?? 0];
      ["u₁", "u₂", "u₃"].forEach((l, i) => A.slider(l, -3, 3, 0.5, u[i], (x) => (u[i] = x)));
      ["v₁", "v₂", "v₃"].forEach((l, i) => A.slider(l, -3, 3, 0.5, v[i], (x) => (v[i] = x)));
      const cam = A.slider("camera", -180, 180, 1, 35, null, (x) => x + "°");
      A.draw = () => {
        const C = P.clear().P, th = (cam.v * Math.PI) / 180, ph = 0.42;
        const pr = (p) => [p[0] * Math.cos(th) - p[1] * Math.sin(th), p[2] * Math.cos(ph) - (p[0] * Math.sin(th) + p[1] * Math.cos(th)) * Math.sin(ph)];
        const L = (p, q, o) => { const s = pr(p), t = pr(q); P.line(s[0], s[1], t[0], t[1], o); };
        const Ar = (q, o) => { const t = pr(q); P.arrow(0, 0, t[0], t[1], o); };
        for (let i = -4; i <= 4; i++) { L([i, -4, 0], [i, 4, 0], { color: C.line, width: 1 }); L([-4, i, 0], [4, i, 0], { color: C.line, width: 1 }); }
        [[[5, 0, 0], "x"], [[0, 5, 0], "y"], [[0, 0, 4.2], "z"]].forEach(([e, n]) => { L([0, 0, 0], e, { color: C.muted, width: 1.5 }); const t = pr(e); P.text(n, t[0], t[1], { dy: -6, color: C.muted }); });
        const w = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
        P.poly([[0, 0, 0], u, [u[0] + v[0], u[1] + v[1], u[2] + v[2]], v].map(pr), { close: true, fill: C.yellow, fa: 0.3, color: C.orange, width: 1.5 });
        Ar(u, { color: C.pink, width: 3.5 }); Ar(v, { color: C.blue, width: 3.5 });
        const nw = Math.hypot(...w);
        if (nw > 1e-9) Ar(w, { color: C.purple, width: 4 });
        const tu = pr(u), tv = pr(v), tw = pr(w);
        P.text("u", tu[0], tu[1], { dx: 10, dy: -6, color: C.pink }); P.text("v", tv[0], tv[1], { dx: 10, dy: -6, color: C.blue });
        if (nw > 1e-9) P.text("u × v", tw[0], tw[1], { dy: -10, color: C.purple });
        const dot = (p, q) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
        A.set(`${A.tex(`u \\times v = ${col(w)}`)} <span class="k">length = area of the yellow parallelogram:</span> <b>${R(nw)}</b> <span class="k">checks:</span> ${A.tex(`(u\\times v)\\cdot u = ${R(dot(w, u))},\\ (u\\times v)\\cdot v = ${R(dot(w, v))}`)} ${nw < 1e-9 ? `<b style="color:var(--c-orange)">u and v are parallel (or one is zero), so u × v = 0</b>` : ""}`);
      };
    },
  });

  V.register("g03-basis", {
    title: "Change of basis: one vector, two coordinate systems", hint: "Drag b₁ (pink), b₂ (blue) and the vector v (purple)",
    setup(A, a) {
      const P = A.plot({ x: [-6, 6], y: [-4.5, 4.5], h: 380 });
      const b1 = [a.b1x ?? 2, a.b1y ?? 1], b2 = [a.b2x ?? -1, a.b2y ?? 1], v = [a.vx ?? 3, a.vy ?? 3];
      let showStd = true;
      A.buttons([{ label: "Standard grid", on: (el) => { showStd = !showStd; el.classList.toggle("on", showStd); } }]).forEach((b) => b.el.classList.add("on"));
      P.handle(() => b1, (x, y) => { b1[0] = x; b1[1] = y; }, { snap: 0.25 });
      P.handle(() => b2, (x, y) => { b2[0] = x; b2[1] = y; }, { snap: 0.25 });
      P.handle(() => v, (x, y) => { v[0] = x; v[1] = y; }, { snap: 0.25 });
      A.draw = () => {
        const C = P.clear().P; if (showStd) P.grid(); P.axes({ labels: showStd });
        const det = b1[0] * b2[1] - b1[1] * b2[0];
        if (Math.abs(det) > 0.05) {
          for (let i = -12; i <= 12; i++) {
            P.line(i * b1[0] - 30 * b2[0], i * b1[1] - 30 * b2[1], i * b1[0] + 30 * b2[0], i * b1[1] + 30 * b2[1], { color: C.accent, width: 1, alpha: 0.4 });
            P.line(i * b2[0] - 30 * b1[0], i * b2[1] - 30 * b1[1], i * b2[0] + 30 * b1[0], i * b2[1] + 30 * b1[1], { color: C.accent, width: 1, alpha: 0.4 });
          }
          const c1 = (v[0] * b2[1] - v[1] * b2[0]) / det, c2 = (b1[0] * v[1] - b1[1] * v[0]) / det;
          P.arrow(0, 0, c1 * b1[0], c1 * b1[1], { color: C.pink, width: 2, dash: [6, 4], alpha: 0.8 });
          P.arrow(c1 * b1[0], c1 * b1[1], v[0], v[1], { color: C.blue, width: 2, dash: [6, 4], alpha: 0.8 });
          A.set(`<span class="k">standard coordinates</span> ${A.tex(`v = ${col(v)}`)} <span class="k">coordinates in the new basis</span> ${A.tex(`[v]_B = ${col([c1, c2])}`)} <span class="k">because</span> ${A.tex(`${R(c1)}\\,b_1 + ${R(c2)}\\,b_2 = v`)} <span class="k">det B =</span> <b>${R(det)}</b>`);
        } else {
          A.set(`<b style="color:var(--c-orange)">b₁ and b₂ are parallel, so they are not a basis.</b> <span class="k">Most vectors can't be written as a combination of them, and B has no inverse.</span>`);
        }
        P.arrow(0, 0, b1[0], b1[1], { color: C.pink, width: 3.5 }); P.arrow(0, 0, b2[0], b2[1], { color: C.blue, width: 3.5 }); P.arrow(0, 0, v[0], v[1], { color: C.purple, width: 3.5 });
        P.text("b₁", b1[0], b1[1], { dx: 12, dy: -6, color: C.pink }); P.text("b₂", b2[0], b2[1], { dx: -12, dy: -6, color: C.blue }); P.text("v", v[0], v[1], { dx: 12, dy: -6, color: C.purple });
        P.drawHandle(...b1, C.pink); P.drawHandle(...b2, C.blue); P.drawHandle(...v, C.purple);
      };
    },
  });

  V.register("g03-quadform", {
    title: "Quadratic forms: bowls, saddles and troughs", hint: "Move a, b, c; drag the point x",
    setup(A, a) {
      const P = A.plot({ x: [-4, 4], y: [-3, 3], h: 360 });
      const m = { a: a.a ?? 2, b: a.b ?? 1, c: a.c ?? 2 }, x = [1, 0.5];
      A.slider("a", -3, 3, 0.1, m.a, (t) => (m.a = t)); A.slider("b", -3, 3, 0.1, m.b, (t) => (m.b = t)); A.slider("c", -3, 3, 0.1, m.c, (t) => (m.c = t));
      P.handle(() => x, (p, q) => { x[0] = p; x[1] = q; }, { snap: 0.05 });
      A.draw = () => {
        const C = P.clear().grid().axes({ labels: false }).P, { a: A0, b: B0, c: C0 } = m;
        const q = (p, r) => A0 * p * p + 2 * B0 * p * r + C0 * r * r;
        const curve = (lev, color) => {
          let seg = [];
          const flush = () => { if (seg.length > 1) P.poly(seg, { color, width: 1.6 }); seg = []; };
          for (let i = 0; i <= 720; i++) { const t = (i / 720) * 2 * Math.PI, ct = Math.cos(t), st = Math.sin(t), qq = q(ct, st);
            if (qq * lev > 1e-6) { const r = Math.sqrt(lev / qq); if (r < 9) { seg.push([r * ct, r * st]); continue; } } flush(); }
          flush();
        };
        [0.5, 1, 2, 4, 8].forEach((l) => { curve(l, C.blue); curve(-l, C.pink); });
        const tr = A0 + C0, det = A0 * C0 - B0 * B0, disc = Math.sqrt(Math.max(0, tr * tr / 4 - det)), l1 = tr / 2 + disc, l2 = tr / 2 - disc;
        [l1, l2].forEach((l, i) => { let e = Math.abs(B0) > 1e-9 ? [B0, l - A0] : (A0 >= C0) === (i === 0) ? [1, 0] : [0, 1]; const n = Math.hypot(...e); e = [e[0] / n, e[1] / n]; P.line(-e[0] * 9, -e[1] * 9, e[0] * 9, e[1] * 9, { color: C.green, width: 1.5, dash: [7, 5] }); });
        const qx = q(...x); P.arrow(0, 0, x[0], x[1], { color: C.orange, width: 3 }); P.drawHandle(...x, C.orange);
        const e = 1e-9, kind = l2 > e ? "positive definite: a bowl, q(x) > 0 for every x ≠ 0" : l2 > -e && l1 > e ? "positive semidefinite: a trough, q(x) ≥ 0 but zero along a line" : l1 < -e ? "negative definite: an upside-down bowl" : l1 < e && l2 < -e ? "negative semidefinite: an upside-down trough" : l1 > e && l2 < -e ? "indefinite: a saddle, q takes both signs" : "zero form";
        A.set(`${A.tex(`A = \\begin{bmatrix}${R(A0)} & ${R(B0)}\\\\ ${R(B0)} & ${R(C0)}\\end{bmatrix}`)} <span class="k">eigenvalues</span> <b>${R(l1)}</b>, <b>${R(l2)}</b> <span class="k">→</span> <b>${kind}</b> <span class="k">at the orange point</span> ${A.tex(`x^TAx = ${R(qx)}`)} <span class="k">(blue rings: q > 0, pink: q < 0, green: eigenvector axes)</span>`);
      };
    },
  });
})();
