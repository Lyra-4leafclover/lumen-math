/* g04 visuals: 3D surfaces (slices, tangent planes, volume), slope fields with Euler's method, vector fields with div/curl */
(function () {
  const V = window.Viz, { fmt, clamp } = V.util;
  const R = (n, d = 2) => fmt(n, d);
  const dark = () => document.documentElement.dataset.theme === "dark";
  const heatCol = (t, a = 1) => `hsla(${250 - 200 * t}, 70%, ${dark() ? 30 + 30 * t : 82 - 30 * t}%, ${a})`;

  const SURF = {
    bowl: { t: "f = x² + y² (bowl)", f: (x, y) => x * x + y * y, g: (x, y) => [2 * x, 2 * y] },
    saddle: { t: "f = x² − y² (saddle)", f: (x, y) => x * x - y * y, g: (x, y) => [2 * x, -2 * y] },
    dome: { t: "f = 4 − x² − y² (dome)", f: (x, y) => 4 - x * x - y * y, g: (x, y) => [-2 * x, -2 * y] },
    xy: { t: "f = xy", f: (x, y) => x * y, g: (x, y) => [y, x] },
    wave: { t: "f = sin x · cos y (waves)", f: (x, y) => Math.sin(x) * Math.cos(y), g: (x, y) => [Math.cos(x) * Math.cos(y), -Math.sin(x) * Math.sin(y)] },
    mixed: { t: "f = x³ − 3x + y² (min + saddle)", f: (x, y) => x ** 3 - 3 * x + y * y, g: (x, y) => [3 * x * x - 3, 2 * y] },
  };
  const hess = (S, x, y) => { const e = 1e-4, gx1 = S.g(x + e, y), gx0 = S.g(x - e, y), gy1 = S.g(x, y + e), gy0 = S.g(x, y - e); return [(gx1[0] - gx0[0]) / (2 * e), (gy1[0] - gy0[0]) / (2 * e), (gy1[1] - gy0[1]) / (2 * e)]; };

  V.register("g04-surface", {
    title: "Surfaces in 3D: slices, tangent planes and volume", hint: "Drag the picture to rotate it",
    setup(A, a) {
      let sk = SURF[a.surface] ? a.surface : "bowl", mode = a.mode || "slices", az = 0.7, el = 0.55, drag = null;
      const P = A.plot({ x: [-1, 1], y: [-1, 1], h: 380 });
      A.select("Surface", Object.keys(SURF).map((k) => [k, SURF[k].t]), sk, (v) => (sk = v));
      A.seg([["slices", "Slices (partials)"], ["plane", "Tangent plane"], ["boxes", "Volume (boxes)"]], mode, (v) => (mode = v));
      const sx = A.slider("x₀", -2, 2, 0.05, a.x0 ?? 1), sy = A.slider("y₀", -2, 2, 0.05, a.y0 ?? 0.5), sn = A.slider("boxes per side n", 1, 16, 1, a.n ?? 4);
      const cv = P.cv;
      cv.addEventListener("pointerdown", (e) => { drag = [e.clientX, e.clientY, az, el]; cv.setPointerCapture(e.pointerId); });
      cv.addEventListener("pointermove", (e) => { if (!drag) return; az = drag[2] + (e.clientX - drag[0]) * 0.01; el = clamp(drag[3] + (e.clientY - drag[1]) * 0.01, 0.05, 1.5); A.draw(); });
      const end = () => (drag = null); cv.addEventListener("pointerup", end); cv.addEventListener("pointercancel", end);
      A.draw = () => {
        const C = P.clear().P, S = SURF[sk], ctx = P.ctx, W = P.W, H = P.H;
        let zmin = Infinity, zmax = -Infinity;
        for (let i = 0; i <= 20; i++) for (let j = 0; j <= 20; j++) { const z = S.f(-2 + i / 5, -2 + j / 5); zmin = Math.min(zmin, z); zmax = Math.max(zmax, z); }
        const zs = 2.2 / Math.max(zmax - zmin, 1e-6), zc = (zmax + zmin) / 2, sc = Math.min(W, H) / 6.2, ca = Math.cos(az), sa = Math.sin(az), ce = Math.cos(el), se = Math.sin(el);
        const pr = (x, y, z) => { const X = x * ca - y * sa, D = x * sa + y * ca, Z = (z - zc) * zs; return [W / 2 + X * sc, H / 2 - (Z * ce + D * se) * sc, D * ce - Z * se]; };
        const seg3 = (p, q, col, w, dash) => { const A1 = pr(...p), B1 = pr(...q); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.setLineDash(dash || []); ctx.beginPath(); ctx.moveTo(A1[0], A1[1]); ctx.lineTo(B1[0], B1[1]); ctx.stroke(); ctx.setLineDash([]); };
        const curve3 = (fn, col, w) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); for (let i = 0; i <= 80; i++) { const p = pr(...fn(-2 + i / 20)); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke(); };
        // axes
        seg3([-2.4, 0, zc], [2.4, 0, zc], C.muted, 1, [4, 4]); seg3([0, -2.4, zc], [0, 2.4, zc], C.muted, 1, [4, 4]);
        const lx = pr(2.6, 0, zc), ly = pr(0, 2.6, zc); ctx.fillStyle = C.muted; ctx.font = "600 12px Inter, sans-serif"; ctx.fillText("x", lx[0], lx[1]); ctx.fillText("y", ly[0], ly[1]);
        const N = 22, h = 4 / N, quads = [];
        for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
          const x = -2 + i * h, y = -2 + j * h, pts = [[x, y], [x + h, y], [x + h, y + h], [x, y + h]].map(([u, v]) => pr(u, v, S.f(u, v)));
          quads.push({ pts, d: pts.reduce((s, p) => s + p[2], 0), t: (S.f(x + h / 2, y + h / 2) - zmin) / (zmax - zmin || 1) });
        }
        quads.sort((p, q) => q.d - p.d);
        const fa = mode === "boxes" ? 0.35 : 0.9;
        quads.forEach((q) => { ctx.beginPath(); q.pts.forEach((p, k) => (k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); ctx.fillStyle = heatCol(q.t, fa); ctx.fill(); ctx.strokeStyle = C.ink; ctx.globalAlpha = 0.18; ctx.lineWidth = 0.7; ctx.stroke(); ctx.globalAlpha = 1; });
        const x0 = sx.v, y0 = sy.v, z0 = S.f(x0, y0), [gx, gy] = S.g(x0, y0);
        if (mode === "boxes") {
          const n = sn.v, w = 2 / n; let sum = 0; const boxes = [];
          for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const cx = (i + 0.5) * w, cy = (j + 0.5) * w, z = S.f(cx, cy); sum += z * w * w; boxes.push({ x: i * w, y: j * w, z, d: pr(cx, cy, z)[2] }); }
          boxes.sort((p, q) => q.d - p.d);
          const base = 0;
          boxes.forEach((b) => {
            const c = [[b.x, b.y], [b.x + w, b.y], [b.x + w, b.y + w], [b.x, b.y + w]];
            const faces = [c.map(([u, v]) => [u, v, b.z])];
            for (let k = 0; k < 4; k++) { const p = c[k], q = c[(k + 1) % 4]; faces.push([[p[0], p[1], base], [q[0], q[1], base], [q[0], q[1], b.z], [p[0], p[1], b.z]]); }
            faces.forEach((f) => { ctx.beginPath(); f.forEach((p, k) => { const s = pr(...p); k ? ctx.lineTo(s[0], s[1]) : ctx.moveTo(s[0], s[1]); }); ctx.closePath(); ctx.fillStyle = C.blue; ctx.globalAlpha = 0.22; ctx.fill(); ctx.globalAlpha = 0.9; ctx.strokeStyle = C.blue; ctx.lineWidth = 1; ctx.stroke(); ctx.globalAlpha = 1; });
          });
          let ex = 0; const m = 200, q = 2 / m; for (let i = 0; i < m; i++) for (let j = 0; j < m; j++) ex += S.f((i + 0.5) * q, (j + 0.5) * q) * q * q;
          A.set(`<span class="k">region</span> ${A.tex("R = [0,2]\\times[0,2]")} <span class="k">${n * n} boxes, each of base</span> ${A.tex(`\\Delta A = ${R(w * w, 4)}`)} <span class="k">sum of box volumes</span> <b>${R(sum, 4)}</b> <span class="k">exact</span> ${A.tex(`\\iint_R f\\,dA = ${R(ex, 4)}`)} <span class="k">error</span> <b>${R(sum - ex, 4)}</b> <span class="k">(height below 0 counts as negative volume)</span>`);
          return;
        }
        if (mode === "slices") {
          curve3((t) => [t, y0, S.f(t, y0)], C.pink, 3); curve3((t) => [x0, t, S.f(x0, t)], C.orange, 3);
          seg3([x0 - 0.7, y0, z0 - 0.7 * gx], [x0 + 0.7, y0, z0 + 0.7 * gx], C.pink, 2.5, [5, 3]);
          seg3([x0, y0 - 0.7, z0 - 0.7 * gy], [x0, y0 + 0.7, z0 + 0.7 * gy], C.orange, 2.5, [5, 3]);
        } else {
          const r = 0.8, corners = [[-r, -r], [r, -r], [r, r], [-r, r]].map(([u, v]) => pr(x0 + u, y0 + v, z0 + gx * u + gy * v));
          ctx.beginPath(); corners.forEach((p, k) => (k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); ctx.fillStyle = C.green; ctx.globalAlpha = 0.35; ctx.fill(); ctx.globalAlpha = 1; ctx.strokeStyle = C.green; ctx.lineWidth = 2; ctx.stroke();
          for (let k = -2; k <= 2; k++) { const u = (k * r) / 2; seg3([x0 + u, y0 - r, z0 + gx * u - gy * r], [x0 + u, y0 + r, z0 + gx * u + gy * r], C.green, 1); seg3([x0 - r, y0 + u, z0 - gx * r + gy * u], [x0 + r, y0 + u, z0 + gx * r + gy * u], C.green, 1); }
        }
        const p0 = pr(x0, y0, z0); ctx.beginPath(); ctx.arc(p0[0], p0[1], 7, 0, 7); ctx.fillStyle = C.ink; ctx.fill(); ctx.strokeStyle = C.bg; ctx.lineWidth = 2.5; ctx.stroke();
        const [fxx, fxy, fyy] = hess(S, x0, y0), D = fxx * fyy - fxy * fxy, flat = Math.hypot(gx, gy) < 0.06;
        const cls = flat ? (D > 1e-6 ? (fxx > 0 ? "a local minimum" : "a local maximum") : D < -1e-6 ? "a saddle point" : "inconclusive (D = 0)") : "";
        const base = `${A.tex(`f(${R(x0)}, ${R(y0)}) = ${R(z0, 3)}`)} <span class="k">pink slope</span> ${A.tex(`\\frac{\\partial f}{\\partial x} = ${R(gx, 3)}`)} <span class="k">orange slope</span> ${A.tex(`\\frac{\\partial f}{\\partial y} = ${R(gy, 3)}`)}`;
        if (mode === "slices") A.set(`${base} <span class="k">pink curve: y frozen at ${R(y0)}; orange curve: x frozen at ${R(x0)}. ${flat ? "Both slopes are 0: this is a critical point, and the Hessian test says it is " + cls + "." : "Each partial derivative is the slope of one slice."}</span>`);
        else A.set(`${base} <span class="k">tangent plane</span> ${A.tex(`z \\approx ${R(z0, 3)} + ${R(gx, 3)}(x - ${R(x0)}) + ${R(gy, 3)}(y - ${R(y0)})`)} <span class="k">${flat ? "The plane is flat: a critical point (" + cls + ")." : "Near the dot the green plane and the surface almost coincide."}</span>`);
      };
    },
  });

  const ODE = {
    growth: { t: "y′ = 0.5y (exponential growth)", f: (x, y) => 0.5 * y, y: [-1, 6] },
    decay: { t: "y′ = −y (exponential decay)", f: (x, y) => -y, y: [-1, 5] },
    cooling: { t: "y′ = −0.8(y − 1) (cooling toward 1)", f: (x, y) => -0.8 * (y - 1), y: [-1, 5] },
    logistic: { t: "y′ = y(1 − y/4) (logistic)", f: (x, y) => y * (1 - y / 4), y: [-1, 5] },
    linear: { t: "y′ = x − y", f: (x, y) => x - y, y: [-2, 5] },
    wave: { t: "y′ = cos x", f: (x) => Math.cos(x), y: [-2, 3] },
  };
  V.register("g04-slope-field", {
    title: "Slope fields and Euler's method", hint: "Drag the starting point; change the step size",
    setup(A, a) {
      let k = ODE[a.ode] ? a.ode : "growth"; const st = [0, a.y0 ?? 1];
      const P = A.plot({ x: [-0.3, 6.3], y: ODE[k].y, h: 360, equal: false });
      A.select("Equation", Object.keys(ODE).map((q) => [q, ODE[q].t]), k, (v) => { k = v; P.setView([-0.3, 6.3], ODE[k].y); st[1] = clamp(st[1], ODE[k].y[0], ODE[k].y[1]); });
      const hs = A.slider("Euler step size h", 0.05, 1.5, 0.05, a.h ?? 0.5), xe = A.slider("end x", 1, 6, 0.5, a.xend ?? 4);
      P.handle(() => st, (x, y) => { st[0] = clamp(x, -0.3, 5); st[1] = y; });
      A.draw = () => {
        const C = P.clear().grid().axes().P, F = ODE[k].f, [y0a, y1a] = ODE[k].y, sy = (y1a - y0a) / 6.6;
        for (let x = 0; x <= 6; x += 0.5) for (let y = Math.ceil(y0a / sy) * sy; y <= y1a; y += sy * 0.6) {
          const m = F(x, y), dx = 0.18 / Math.sqrt(1 + (m * 0.9) ** 2); P.line(x - dx, y - m * dx, x + dx, y + m * dx, { color: C.muted, width: 1.4 });
        }
        const xend = Math.max(xe.v, st[0] + 0.1), rk = [[st[0], st[1]]]; let x = st[0], y = st[1]; const dh = 0.01;
        while (x < xend - 1e-9) { const h = Math.min(dh, xend - x), k1 = F(x, y), k2 = F(x + h / 2, y + (h * k1) / 2), k3 = F(x + h / 2, y + (h * k2) / 2), k4 = F(x + h, y + h * k3); y += (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4); x += h; rk.push([x, y]); }
        P.poly(rk, { color: C.green, width: 3 });
        const eu = [[st[0], st[1]]]; x = st[0]; y = st[1];
        while (x < xend - 1e-9) { const h = Math.min(hs.v, xend - x); y += h * F(x, y); x += h; eu.push([x, y]); }
        P.poly(eu, { color: C.orange, width: 2.5 }); eu.forEach((p) => P.dot(p[0], p[1], 3.5, { color: C.orange }));
        P.drawHandle(st[0], st[1], C.pink);
        const ye = eu[eu.length - 1][1], yt = rk[rk.length - 1][1];
        A.set(`<span class="k">start</span> <b>(${R(st[0])}, ${R(st[1])})</b> <span class="k">Euler:</span> ${A.tex("y_{n+1} = y_n + h\\,f(x_n, y_n)")} <span class="k">${eu.length - 1} steps give y(${R(xend)}) ≈</span> <b>${R(ye, 4)}</b> <span class="k">true solution (green)</span> <b>${R(yt, 4)}</b> <span class="k">error</span> <b>${R(ye - yt, 4)}</b> <span class="k">— halve h and the error roughly halves.</span>`);
      };
    },
  });

  const FIELD = {
    rotation: { t: "F = (−y, x) (rotation)", F: (x, y) => [-y, x] },
    source: { t: "F = (x, y) (source)", F: (x, y) => [x, y] },
    sink: { t: "F = −∇(x² + y²)/2 = (−x, −y) (sink)", F: (x, y) => [-x, -y] },
    gradxy: { t: "F = ∇(xy) = (y, x) (gradient field)", F: (x, y) => [y, x] },
    shear: { t: "F = (y, 0) (shear)", F: (x, y) => [y, 0] },
    spiral: { t: "F = (−y − 0.3x, x − 0.3y) (spiral sink)", F: (x, y) => [-y - 0.3 * x, x - 0.3 * y] },
  };
  V.register("g04-vector-field", {
    title: "Vector fields: flow, divergence and curl", hint: "Drag the point; press Flow",
    setup(A, a) {
      let k = FIELD[a.field] ? a.field : "rotation", parts = [], flowing = false; const p = [a.px ?? 1, a.py ?? 0.5];
      const P = A.plot({ x: [-3, 3], y: [-2.2, 2.2], h: 360 });
      A.select("Field", Object.keys(FIELD).map((q) => [q, FIELD[q].t]), k, (v) => { k = v; parts = []; });
      const rs = A.slider("loop radius r", 0.2, 1.5, 0.05, 0.6);
      const seed = () => { parts = []; for (let i = 0; i < 160; i++) parts.push([Math.random() * 6 - 3, Math.random() * 4.4 - 2.2, Math.random() * 3]); };
      A.buttons([{ label: "▶ Flow", on: () => { seed(); flowing = true; A.loop((dt) => { const F = FIELD[k].F; parts.forEach((q) => { const v = F(q[0], q[1]); q[0] += v[0] * dt * 0.6; q[1] += v[1] * dt * 0.6; q[2] -= dt; if (q[2] < 0 || Math.abs(q[0]) > 3.2 || Math.abs(q[1]) > 2.4) { q[0] = Math.random() * 6 - 3; q[1] = Math.random() * 4.4 - 2.2; q[2] = 3; } }); A.draw(); return flowing; }); } }, { label: "Stop", on: () => { flowing = false; A.stop(); } }]);
      A.onCleanup(() => (flowing = false));
      P.handle(() => p, (x, y) => { p[0] = x; p[1] = y; });
      A.draw = () => {
        const C = P.clear().grid().axes({ labels: false }).P, F = FIELD[k].F;
        for (let x = -2.75; x <= 2.8; x += 0.5) for (let y = -2; y <= 2.05; y += 0.5) { const v = F(x, y), n = Math.hypot(...v); if (n < 1e-9) continue; const s = 0.22 / Math.max(1, n / 2) ; P.arrow(x, y, x + v[0] * s, y + v[1] * s, { color: C.muted, width: 1.4, head: 7 }); }
        parts.forEach((q) => P.dot(q[0], q[1], 2.2, { color: C.blue, alpha: 0.75 }));
        const r = rs.v, M = 400; let circ = 0, flux = 0;
        for (let i = 0; i < M; i++) { const t = ((i + 0.5) / M) * 2 * Math.PI, c = Math.cos(t), s = Math.sin(t), v = F(p[0] + r * c, p[1] + r * s), ds = (2 * Math.PI * r) / M; circ += (v[0] * -s + v[1] * c) * ds; flux += (v[0] * c + v[1] * s) * ds; }
        const e = 1e-4, Fx1 = F(p[0] + e, p[1]), Fx0 = F(p[0] - e, p[1]), Fy1 = F(p[0], p[1] + e), Fy0 = F(p[0], p[1] - e);
        const div = (Fx1[0] - Fx0[0]) / (2 * e) + (Fy1[1] - Fy0[1]) / (2 * e), curl = (Fx1[1] - Fx0[1]) / (2 * e) - (Fy1[0] - Fy0[0]) / (2 * e);
        P.circle(p[0], p[1], r, { color: C.orange, width: 2 });
        const v = F(...p); P.arrow(p[0], p[1], p[0] + v[0] * 0.4, p[1] + v[1] * 0.4, { color: C.pink, width: 3 }); P.drawHandle(...p, C.pink);
        A.set(`${A.tex(`\\mathbf F(${R(p[0])}, ${R(p[1])}) = (${R(v[0])}, ${R(v[1])})`)} <span class="k">divergence</span> <b>${R(div, 3)}</b> <span class="k">curl</span> <b>${R(curl, 3)}</b> <span class="k">around the orange loop: circulation</span> ${A.tex(`\\oint \\mathbf F\\cdot d\\mathbf r = ${R(circ, 3)}`)} <span class="k">outward flux</span> <b>${R(flux, 3)}</b> <span class="k">(Green: circulation = curl × area = ${R(curl * Math.PI * r * r, 3)}, flux = div × area = ${R(div * Math.PI * r * r, 3)} for these fields)</span>`);
      };
    },
  });
})();
