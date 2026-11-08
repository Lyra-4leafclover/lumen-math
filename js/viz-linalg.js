/* Linear algebra visuals: vectors, spans, transformations, eigen, projection, PCA, norms */
(function () {
  const V = window.Viz, { fmt, clamp, rng, gauss } = V.util;
  const R = (n, d = 2) => fmt(n, d);
  const vtex = (v) => `\\begin{bmatrix}${R(v[0])}\\\\${R(v[1])}\\end{bmatrix}`;

  V.register("vector", {
    title: "Vectors: add, subtract, scale", hint: "Drag the arrow tips",
    setup(A, a) {
      const P = A.plot({ x: [-6, 6], y: [-4.5, 4.5], h: 360 });
      const u = [a.ux ?? 3, a.uy ?? 1], v = [a.vx ?? 1, a.vy ?? 2.5];
      let mode = a.mode || "add";
      const k = A.slider("scalar c", -3, 3, 0.1, 1.5);
      A.seg([["add", "u + v"], ["sub", "u − v"], ["scale", "c · u"], ["comps", "components"]], mode, (m) => (mode = m));
      P.handle(() => u, (x, y) => { u[0] = x; u[1] = y; }, { snap: 0.25 });
      P.handle(() => v, (x, y) => { v[0] = x; v[1] = y; }, { snap: 0.25, hidden: () => mode === "scale" || mode === "comps" });
      A.draw = () => {
        const C = P.clear().grid().axes().P; let out = "";
        if (mode === "add") {
          const s = [u[0] + v[0], u[1] + v[1]];
          P.arrow(u[0], u[1], s[0], s[1], { color: C.pink, width: 2, dash: [5, 5], alpha: 0.6 });
          P.arrow(v[0], v[1], s[0], s[1], { color: C.blue, width: 2, dash: [5, 5], alpha: 0.6 });
          P.arrow(0, 0, s[0], s[1], { color: C.purple, width: 3.5 }); P.text("u + v", s[0], s[1], { dy: -12, color: C.purple });
          out = `${A.tex(`u + v = ${vtex(u)} + ${vtex(v)} = ${vtex(s)}`)} <span class="k">tip-to-tail: walk u, then walk v</span>`;
        } else if (mode === "sub") {
          const s = [u[0] - v[0], u[1] - v[1]];
          P.arrow(v[0], v[1], u[0], u[1], { color: C.purple, width: 3.5 }); P.arrow(0, 0, s[0], s[1], { color: C.purple, width: 2, dash: [5, 5], alpha: 0.6 });
          P.text("u − v", (u[0] + v[0]) / 2, (u[1] + v[1]) / 2, { dy: -10, color: C.purple });
          out = `${A.tex(`u - v = ${vtex(s)}`)} <span class="k">u − v points from the tip of v to the tip of u. Its length is the distance</span> <b>${R(Math.hypot(...s))}</b>`;
        } else if (mode === "scale") {
          const s = [k.v * u[0], k.v * u[1]];
          P.line(-u[0] * 20, -u[1] * 20, u[0] * 20, u[1] * 20, { color: C.line2, dash: [4, 6], width: 1.5 });
          P.arrow(0, 0, s[0], s[1], { color: C.purple, width: 3.5 }); P.text("c·u", s[0], s[1], { dy: -12, color: C.purple });
          out = `${A.tex(`${R(k.v)}\\,u = ${vtex(s)}`)} <span class="k">length ×</span><b>${R(Math.abs(k.v))}</b> <span class="k">${k.v < 0 ? "direction flipped" : "same direction"}. Dashed line = the span of u</span>`;
        } else {
          P.line(0, 0, u[0], 0, { color: C.orange, width: 3 }); P.line(u[0], 0, u[0], u[1], { color: C.green, width: 3 });
          P.text("x = " + R(u[0]), u[0] / 2, 0, { dy: u[1] >= 0 ? 16 : -8, color: C.orange }); P.text("y = " + R(u[1]), u[0], u[1] / 2, { dx: 34, color: C.green });
          const ang = (Math.atan2(u[1], u[0]) * 180) / Math.PI;
          out = `${A.tex(`\\|u\\| = \\sqrt{${R(u[0])}^2 + ${R(u[1])}^2} = ${R(Math.hypot(...u))}`)} <span class="k">angle</span> <b>${R(ang, 1)}°</b> <span class="k">unit vector</span> ${A.tex(vtex([u[0] / Math.hypot(...u), u[1] / Math.hypot(...u)]))}`;
        }
        P.arrow(0, 0, u[0], u[1], { color: C.pink, width: 3 }); P.text("u", u[0], u[1], { dx: 12, dy: -6, color: C.pink });
        if (mode === "add" || mode === "sub") { P.arrow(0, 0, v[0], v[1], { color: C.blue, width: 3 }); P.text("v", v[0], v[1], { dx: 12, dy: -6, color: C.blue }); P.drawHandle(...v, C.blue); }
        P.drawHandle(...u, C.pink);
        A.set(out);
      };
    },
  });

  V.register("span", {
    title: "Linear combinations and span", hint: "Drag v and w, then move the sliders",
    setup(A) {
      const P = A.plot({ x: [-6, 6], y: [-4.5, 4.5], h: 360 });
      const v = [2, 1], w = [-1, 1.5];
      const a = A.slider("a", -3, 3, 0.1, 1), b = A.slider("b", -3, 3, 0.1, 1);
      P.handle(() => v, (x, y) => { v[0] = x; v[1] = y; }, { snap: 0.25 });
      P.handle(() => w, (x, y) => { w[0] = x; w[1] = y; }, { snap: 0.25 });
      A.draw = () => {
        const C = P.clear().P; const det = v[0] * w[1] - v[1] * w[0];
        if (Math.abs(det) > 0.05) {
          for (let i = -12; i <= 12; i++) { P.line(i * v[0] - 30 * w[0], i * v[1] - 30 * w[1], i * v[0] + 30 * w[0], i * v[1] + 30 * w[1], { color: C.line2, width: 1 }); P.line(i * w[0] - 30 * v[0], i * w[1] - 30 * v[1], i * w[0] + 30 * v[0], i * w[1] + 30 * v[1], { color: C.line2, width: 1 }); }
        } else P.line(-30 * v[0], -30 * v[1], 30 * v[0], 30 * v[1], { color: C.orange, width: 3, alpha: 0.5 });
        P.axes({ labels: false });
        const s = [a.v * v[0] + b.v * w[0], a.v * v[1] + b.v * w[1]];
        P.arrow(0, 0, a.v * v[0], a.v * v[1], { color: C.pink, width: 2, alpha: 0.5 });
        P.arrow(a.v * v[0], a.v * v[1], s[0], s[1], { color: C.blue, width: 2, alpha: 0.5 });
        P.arrow(0, 0, s[0], s[1], { color: C.purple, width: 3.5 });
        P.arrow(0, 0, v[0], v[1], { color: C.pink, width: 3 }); P.arrow(0, 0, w[0], w[1], { color: C.blue, width: 3 });
        P.drawHandle(...v, C.pink); P.drawHandle(...w, C.blue);
        P.text("v", v[0], v[1], { dx: 12, color: C.pink }); P.text("w", w[0], w[1], { dx: 12, color: C.blue });
        A.set(`${A.tex(`${R(a.v)}v + ${R(b.v)}w = ${vtex(s)}`)} ${Math.abs(det) > 0.05 ? `<span class="k">v and w are</span> <b>linearly independent</b> <span class="k">→ their span is the whole plane</span>` : `<b style="color:var(--c-orange)">dependent!</b> <span class="k">w is a multiple of v → the span collapses to a line</span>`}`);
      };
    },
  });

  V.register("dot", {
    title: "Dot product and projection", hint: "Drag either vector",
    setup(A) {
      const P = A.plot({ x: [-5, 5], y: [-3.5, 4], h: 340 });
      const u = [3, 1], v = [1.5, 2.5];
      P.handle(() => u, (x, y) => { u[0] = x; u[1] = y; }, { snap: 0.1 });
      P.handle(() => v, (x, y) => { v[0] = x; v[1] = y; }, { snap: 0.1 });
      A.draw = () => {
        const C = P.clear().grid().axes().P;
        const d = u[0] * v[0] + u[1] * v[1], nu = Math.hypot(...u), nv = Math.hypot(...v), cos = d / (nu * nv), t = d / (nu * nu), pr = [t * u[0], t * u[1]];
        P.line(-u[0] * 20, -u[1] * 20, u[0] * 20, u[1] * 20, { color: C.line2, dash: [4, 6], width: 1.2 });
        P.line(v[0], v[1], pr[0], pr[1], { color: C.muted, dash: [4, 4], width: 1.5 });
        P.line(0, 0, pr[0], pr[1], { color: d >= 0 ? C.green : C.bad, width: 7, alpha: 0.5 });
        P.arrow(0, 0, u[0], u[1], { color: C.pink, width: 3 }); P.arrow(0, 0, v[0], v[1], { color: C.blue, width: 3 });
        P.drawHandle(...u, C.pink); P.drawHandle(...v, C.blue);
        P.text("u", u[0], u[1], { dx: 12, color: C.pink }); P.text("v", v[0], v[1], { dx: 12, color: C.blue });
        const ang = (Math.acos(clamp(cos, -1, 1)) * 180) / Math.PI;
        A.set(`${A.tex(`u\\cdot v = ${R(u[0])}\\cdot${R(v[0])} + ${R(u[1])}\\cdot${R(v[1])} = ${R(d)}`)} <span class="k">angle</span> <b>${R(ang, 1)}°</b> <span class="k">cos θ</span> <b>${R(cos, 3)}</b> <span class="k">${Math.abs(d) < 0.05 ? "orthogonal!" : d > 0 ? "pointing the same way-ish" : "pointing opposite-ish"}. Green bar = projection of v onto u, length</span> <b>${R(d / nu)}</b>`);
      };
    },
  });

  const PRESET = { identity: [1, 0, 0, 1], rotate: [0.707, 0.707, -0.707, 0.707], shear: [1, 0, 1, 1], scale: [2, 0, 0, 0.5], reflect: [1, 0, 0, -1], project: [1, 0, 0, 0], symmetric: [2, 1, 1, 2], singular: [1, 0.5, 2, 1] };
  V.register("matrix2", {
    title: "A matrix is a transformation", hint: "Drag î (pink) and ĵ (blue)",
    setup(A, a) {
      const P = A.plot({ x: [-5, 5], y: [-4, 4], h: 380 });
      const M = (PRESET[a.preset] || PRESET.shear).slice(); // columns: i=(M0,M1) j=(M2,M3)
      const showEig = a.eigen != null; let t = 1, eig = showEig;
      A.select("Preset", Object.keys(PRESET), a.preset || "shear", (k) => { M.splice(0, 4, ...PRESET[k]); t = 0; A.loop((dt) => { t = Math.min(1, t + dt * 1.5); A.draw(); return t < 1; }); });
      A.buttons([{ label: "Animate", on: () => { t = 0; A.loop((dt) => { t = Math.min(1, t + dt * 1.2); A.draw(); return t < 1; }); } }, { label: "Eigenvectors", on: (el) => { eig = !eig; el.classList.toggle("on", eig); } }]).forEach((b) => b.label === "Eigenvectors" && b.el.classList.toggle("on", eig));
      const cur = () => [1 + (M[0] - 1) * t, M[1] * t, M[2] * t, 1 + (M[3] - 1) * t];
      P.handle(() => [M[0], M[1]], (x, y) => { M[0] = x; M[1] = y; t = 1; }, { snap: 0.1 });
      P.handle(() => [M[2], M[3]], (x, y) => { M[2] = x; M[3] = y; t = 1; }, { snap: 0.1 });
      A.draw = () => {
        const C = P.clear().P, m = cur(), T = (x, y) => [m[0] * x + m[2] * y, m[1] * x + m[3] * y];
        P.grid(1).axes({ labels: false });
        for (let i = -10; i <= 10; i++) { P.line(...T(i, -10), ...T(i, 10), { color: C.accent, width: i ? 1 : 2, alpha: i ? 0.35 : 0.8 }); P.line(...T(-10, i), ...T(10, i), { color: C.accent, width: i ? 1 : 2, alpha: i ? 0.35 : 0.8 }); }
        P.poly([[0, 0], T(1, 0), T(1, 1), T(0, 1)], { close: true, fill: C.yellow, fa: 0.35, color: C.orange, width: 1.5 });
        const det = m[0] * m[3] - m[1] * m[2];
        if (eig) {
          const tr = m[0] + m[3], disc = tr * tr - 4 * det;
          if (disc >= 0) { [(tr + Math.sqrt(disc)) / 2, (tr - Math.sqrt(disc)) / 2].forEach((l, i) => { let e = Math.abs(m[2]) > 1e-6 ? [m[2], l - m[0]] : Math.abs(m[1]) > 1e-6 ? [l - m[3], m[1]] : i ? [0, 1] : [1, 0]; const n = Math.hypot(...e); e = [e[0] / n, e[1] / n]; P.line(-e[0] * 20, -e[1] * 20, e[0] * 20, e[1] * 20, { color: C.green, width: 2, dash: [8, 5] }); P.arrow(0, 0, e[0] * l, e[1] * l, { color: C.green, width: 3 }); P.text("λ=" + R(l), e[0] * l, e[1] * l, { dy: -12, color: C.green }); }); }
          else P.text("No real eigenvectors: every direction gets rotated", 0, 3.4, { color: C.green });
        }
        P.arrow(0, 0, m[0], m[1], { color: C.pink, width: 3.5 }); P.arrow(0, 0, m[2], m[3], { color: C.blue, width: 3.5 });
        P.drawHandle(m[0], m[1], C.pink); P.drawHandle(m[2], m[3], C.blue);
        A.set(`${A.tex(`A = \\begin{bmatrix}${R(m[0])} & ${R(m[2])}\\\\ ${R(m[1])} & ${R(m[3])}\\end{bmatrix}`)} <span class="k">columns = where î and ĵ land</span> <span class="k">det A =</span> <b>${R(det)}</b> <span class="k">${Math.abs(det) < 0.02 ? "→ space is squashed flat (not invertible)" : det < 0 ? "→ orientation flipped; area ×" + R(Math.abs(det)) : "→ the yellow unit square's area is scaled by this"}</span>`);
      };
    },
  });

  V.register("eigen", {
    title: "Hunting for eigenvectors", hint: "Drag the yellow vector x around the circle",
    setup(A, a) {
      const P = A.plot({ x: [-4.5, 4.5], y: [-3.5, 3.5], h: 360 });
      const m = [a.a ?? 2, a.c ?? 1, a.b ?? 1, a.d ?? 2]; let th = 0.3;
      const s = ["a", "b", "c", "d"].map((k, i) => A.slider(k, -3, 3, 0.1, m[[0, 2, 1, 3][i]], (v) => (m[[0, 2, 1, 3][i]] = v)));
      P.handle(() => [Math.cos(th), Math.sin(th)], (x, y) => { th = Math.atan2(y, x); });
      A.draw = () => {
        const C = P.clear().grid().axes({ labels: false }).P, x = [Math.cos(th), Math.sin(th)], Ax = [m[0] * x[0] + m[2] * x[1], m[1] * x[0] + m[3] * x[1]];
        P.circle(0, 0, 1, { color: C.line2, width: 1.5 });
        P.param((t) => [m[0] * Math.cos(t) + m[2] * Math.sin(t), m[1] * Math.cos(t) + m[3] * Math.sin(t)], 0, 7, { color: C.line2, width: 1.5, dash: [4, 4] });
        const cross = x[0] * Ax[1] - x[1] * Ax[0], aligned = Math.abs(cross) < 0.06 * Math.hypot(...Ax) + 0.01;
        P.line(-x[0] * 20, -x[1] * 20, x[0] * 20, x[1] * 20, { color: aligned ? C.green : C.line2, width: aligned ? 2.5 : 1, dash: [6, 5] });
        P.arrow(0, 0, Ax[0], Ax[1], { color: C.purple, width: 3.5 }); P.text("Ax", Ax[0], Ax[1], { dy: -12, color: C.purple });
        P.arrow(0, 0, x[0], x[1], { color: C.orange, width: 3 }); P.drawHandle(...x, C.yellow);
        const lam = (Ax[0] * x[0] + Ax[1] * x[1]);
        A.set(aligned ? `<b style="color:var(--good)">Eigenvector found!</b> ${A.tex(`A x = ${R(lam)}\\,x`)} <span class="k">so λ =</span> <b>${R(lam)}</b>` : `<span class="k">Ax points in a different direction from x. Rotate x until Ax lies on the same line (dashed turns green).</span>`);
      };
    },
  });

  V.register("lstsq", {
    title: "Least squares: the best-fit line", hint: "Drag points, or click to add one",
    setup(A, a) {
      const P = A.plot({ x: [0, 10], y: [0, 8], h: 360, equal: false });
      const r = rng(7); const pts = []; for (let i = 0; i < 9; i++) { const x = 0.8 + i * 1.05; pts.push([x, clamp(1 + 0.55 * x + gauss(r) * 0.8, 0.2, 7.8)]); }
      let manual = false; const mS = A.slider("your slope", -1, 2, 0.01, 0.2), bS = A.slider("your intercept", -2, 6, 0.01, 3);
      A.seg([["best", "Show best fit"], ["manual", "Try it yourself"]], "best", (v) => (manual = v === "manual"));
      pts.forEach((p) => P.handle(() => p, (x, y) => { p[0] = x; p[1] = y; }, { snap: 0.05 }));
      P.onClick = (x, y) => { pts.push([x, y]); P.handle(() => pts[pts.length - 1], (X, Y) => { pts[pts.length - 1][0] = X; pts[pts.length - 1][1] = Y; }); A.draw(); };
      A.draw = () => {
        const C = P.clear().grid().axes().P, n = pts.length;
        const mx = pts.reduce((s, p) => s + p[0], 0) / n, my = pts.reduce((s, p) => s + p[1], 0) / n;
        let sxy = 0, sxx = 0; pts.forEach((p) => { sxy += (p[0] - mx) * (p[1] - my); sxx += (p[0] - mx) ** 2; });
        const m0 = sxy / sxx, b0 = my - m0 * mx, m = manual ? mS.v : m0, b = manual ? bS.v : b0;
        let sse = 0, best = 0;
        pts.forEach((p) => { const yh = m * p[0] + b, e = p[1] - yh; sse += e * e; best += (p[1] - m0 * p[0] - b0) ** 2; const sz = Math.abs(e); P.rect(p[0], yh, e >= 0 ? sz * (P.sy / P.sx) : -sz * (P.sy / P.sx), e, { fill: C.pink, fa: 0.12, color: "none" }); P.line(p[0], p[1], p[0], yh, { color: C.pink, width: 1.5 }); });
        P.fn((x) => m * x + b, { color: C.accent, width: 3 });
        pts.forEach((p) => P.drawHandle(p[0], p[1], C.blue, { r: 6 }));
        A.set(`${A.tex(`\\hat y = ${R(m)}x + ${R(b)}`)} <span class="k">sum of squared errors (pink squares)</span> <b>${R(sse)}</b> ${manual ? `<span class="k">best possible:</span> <b>${R(best)}</b>` : `<span class="k">no other line has smaller total area</span>`}`);
      };
    },
  });

  V.register("pca", {
    title: "Principal components of a point cloud", hint: "Change the spread and the tilt",
    setup(A) {
      const P = A.plot({ x: [-5, 5], y: [-3.6, 3.6], h: 360 });
      const sx = A.slider("spread 1", 0.2, 3, 0.05, 2.2), sy = A.slider("spread 2", 0.1, 2, 0.05, 0.6), ang = A.slider("tilt (°)", -90, 90, 1, 30);
      const r = rng(3), base = Array.from({ length: 160 }, () => [gauss(r), gauss(r)]); let proj = false;
      A.buttons([{ label: "Project to 1-D", on: (el) => { proj = !proj; el.classList.toggle("on", proj); } }]);
      A.draw = () => {
        const C = P.clear().grid().axes({ labels: false }).P, t = (ang.v * Math.PI) / 180, c = Math.cos(t), s = Math.sin(t);
        const pts = base.map(([u, v]) => [c * u * sx.v - s * v * sy.v, s * u * sx.v + c * v * sy.v]);
        let a = 0, b = 0, d = 0; const n = pts.length, mx = pts.reduce((q, p) => q + p[0], 0) / n, my = pts.reduce((q, p) => q + p[1], 0) / n;
        pts.forEach(([x, y]) => { a += (x - mx) ** 2; b += (x - mx) * (y - my); d += (y - my) ** 2; }); a /= n - 1; b /= n - 1; d /= n - 1;
        const tr = a + d, det = a * d - b * b, l1 = tr / 2 + Math.sqrt(tr * tr / 4 - det), l2 = tr / 2 - Math.sqrt(tr * tr / 4 - det);
        let e1 = Math.abs(b) > 1e-9 ? [l1 - d, b] : a >= d ? [1, 0] : [0, 1]; const ne = Math.hypot(...e1); e1 = [e1[0] / ne, e1[1] / ne]; const e2 = [-e1[1], e1[0]];
        pts.forEach(([x, y]) => { if (proj) { const k = (x - mx) * e1[0] + (y - my) * e1[1]; P.line(x, y, mx + k * e1[0], my + k * e1[1], { color: C.line2, width: 1 }); P.dot(mx + k * e1[0], my + k * e1[1], 3, { color: C.pink }); } P.dot(x, y, 3, { color: C.blue, alpha: proj ? 0.35 : 0.8 }); });
        P.arrow(mx, my, mx + e1[0] * 2 * Math.sqrt(l1), my + e1[1] * 2 * Math.sqrt(l1), { color: C.orange, width: 4 });
        P.arrow(mx, my, mx + e2[0] * 2 * Math.sqrt(l2), my + e2[1] * 2 * Math.sqrt(l2), { color: C.green, width: 4 });
        A.set(`<span class="k">covariance</span> ${A.tex(`\\Sigma = \\begin{bmatrix}${R(a)} & ${R(b)}\\\\ ${R(b)} & ${R(d)}\\end{bmatrix}`)} <span class="k">eigenvalues</span> <b>${R(l1)}</b>, <b>${R(l2)}</b> <span class="k">PC1 explains</span> <b>${R((100 * l1) / tr, 1)}%</b> <span class="k">of the variance</span>`);
      };
    },
  });

  V.register("norms", {
    title: "Unit balls of the Lp norms", hint: "Change p",
    setup(A) {
      const P = A.plot({ x: [-2, 2], y: [-1.5, 1.5], h: 320 });
      const p = A.slider("p", 0.5, 8, 0.05, 2); const pt = [0.9, 0.5];
      P.handle(() => pt, (x, y) => { pt[0] = x; pt[1] = y; }, { snap: 0.05 });
      A.draw = () => {
        const C = P.clear().grid(0.5).axes({ step: 0.5 }).P, q = p.v;
        const ball = (q, o) => P.param((t) => { const c = Math.cos(t), s = Math.sin(t), r = (Math.abs(c) ** q + Math.abs(s) ** q) ** (-1 / q); return [r * c, r * s]; }, 0, 2 * Math.PI, Object.assign({ n: 600 }, o));
        ball(1, { color: C.orange, width: 1.5, dash: [5, 4] }); ball(2, { color: C.green, width: 1.5, dash: [5, 4] }); ball(40, { color: C.blue, width: 1.5, dash: [5, 4] });
        ball(q, { color: C.accent, width: 3.5, fill: C.accent, fa: 0.12 });
        P.arrow(0, 0, pt[0], pt[1], { color: C.pink, width: 3 }); P.drawHandle(...pt, C.pink);
        const n = (k) => (Math.abs(pt[0]) ** k + Math.abs(pt[1]) ** k) ** (1 / k);
        A.set(`<span class="k">for the pink vector:</span> ${A.tex(`\\|x\\|_1 = ${R(n(1))}`)} ${A.tex(`\\|x\\|_2 = ${R(n(2))}`)} ${A.tex(`\\|x\\|_\\infty = ${R(Math.max(Math.abs(pt[0]), Math.abs(pt[1])))}`)} ${A.tex(`\\|x\\|_{${R(q)}} = ${R(n(q))}`)} <span class="k">dashed: L1 diamond, L2 circle, L∞ square</span>`);
      };
    },
  });

  V.register("gram-schmidt", {
    title: "Gram–Schmidt: making vectors orthogonal", hint: "Drag a and b",
    setup(A) {
      const P = A.plot({ x: [-4, 4], y: [-3, 3.5], h: 340 });
      const a = [2.5, 0.8], b = [1, 2.4];
      P.handle(() => a, (x, y) => { a[0] = x; a[1] = y; }, { snap: 0.1 }); P.handle(() => b, (x, y) => { b[0] = x; b[1] = y; }, { snap: 0.1 });
      A.draw = () => {
        const C = P.clear().grid().axes({ labels: false }).P, na = Math.hypot(...a), q1 = [a[0] / na, a[1] / na], k = b[0] * q1[0] + b[1] * q1[1], pr = [k * q1[0], k * q1[1]], perp = [b[0] - pr[0], b[1] - pr[1]], np = Math.hypot(...perp), q2 = [perp[0] / np, perp[1] / np];
        P.line(0, 0, pr[0], pr[1], { color: C.muted, width: 5, alpha: 0.35 }); P.line(b[0], b[1], pr[0], pr[1], { color: C.muted, dash: [4, 4] });
        P.arrow(pr[0], pr[1], b[0], b[1], { color: C.green, width: 2, alpha: 0.6 });
        P.arrow(0, 0, a[0], a[1], { color: C.pink, width: 2.5, alpha: 0.6 }); P.arrow(0, 0, b[0], b[1], { color: C.blue, width: 2.5, alpha: 0.6 });
        P.arrow(0, 0, q1[0], q1[1], { color: C.pink, width: 4 }); P.arrow(0, 0, q2[0], q2[1], { color: C.green, width: 4 });
        P.text("q₁", q1[0], q1[1], { dy: 16, color: C.pink }); P.text("q₂", q2[0], q2[1], { dx: -14, color: C.green });
        P.drawHandle(...a, C.pink); P.drawHandle(...b, C.blue);
        A.set(`<span class="k">1. normalize a →</span> q₁ <span class="k">2. subtract b's shadow on q₁ (grey):</span> ${A.tex(`b - (b\\cdot q_1)q_1`)} <span class="k">3. normalize →</span> q₂ <span class="k">check:</span> ${A.tex(`q_1\\cdot q_2 = ${R(q1[0] * q2[0] + q1[1] * q2[1], 3)}`)}`);
      };
    },
  });

  V.register("svd", {
    title: "SVD: rotate, stretch, rotate", hint: "Step through the three stages",
    setup(A, a) {
      const P = A.plot({ x: [-4, 4], y: [-3, 3], h: 340 });
      const m = [a.a ?? 1.5, a.c ?? 0.5, a.b ?? 1, a.d ?? 1]; let st = 3;
      ["a", "b", "c", "d"].forEach((k, i) => A.slider(k, -2.5, 2.5, 0.1, m[[0, 2, 1, 3][i]], (v) => (m[[0, 2, 1, 3][i]] = v)));
      A.seg([[0, "x"], [1, "Vᵀx"], [2, "ΣVᵀx"], [3, "UΣVᵀx = Ax"]], 3, (v) => (st = v));
      A.draw = () => {
        const C = P.clear().grid().axes({ labels: false }).P;
        // AᵀA eigen → V, singular values
        const [a0, c0, b0, d0] = m; const p = a0 * a0 + c0 * c0, q = a0 * b0 + c0 * d0, r = b0 * b0 + d0 * d0;
        const th = 0.5 * Math.atan2(2 * q, p - r), v1 = [Math.cos(th), Math.sin(th)], v2 = [-v1[1], v1[0]];
        const Av = (v) => [a0 * v[0] + b0 * v[1], c0 * v[0] + d0 * v[1]], s1 = Math.hypot(...Av(v1)), s2 = Math.hypot(...Av(v2));
        const f = (x) => { const y = [x[0] * v1[0] + x[1] * v1[1], x[0] * v2[0] + x[1] * v2[1]]; if (st === 0) return x; if (st === 1) return y; if (st === 2) return [y[0] * s1, y[1] * s2]; return Av(x); };
        P.param((t) => f([Math.cos(t), Math.sin(t)]), 0, 7, { color: C.accent, width: 3, fill: C.accent, fa: 0.1 });
        const e1 = st === 0 ? v1 : st === 1 ? [1, 0] : st === 2 ? [s1, 0] : Av(v1), e2 = st === 0 ? v2 : st === 1 ? [0, 1] : st === 2 ? [0, s2] : Av(v2);
        P.arrow(0, 0, ...e1, { color: C.orange, width: 3 }); P.arrow(0, 0, ...e2, { color: C.green, width: 3 });
        A.set(`<span class="k">singular values</span> ${A.tex(`\\sigma_1 = ${R(s1)},\\ \\sigma_2 = ${R(s2)}`)} <span class="k">${["The unit circle and the right-singular vectors v₁, v₂.", "Vᵀ rotates v₁, v₂ onto the axes.", "Σ stretches each axis by σᵢ: circle → ellipse.", "U rotates the ellipse into place. Same result as applying A directly."][st]}</span>`);
      };
    },
  });
})();
