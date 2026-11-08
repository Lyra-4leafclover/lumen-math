/* Calculus, multivariable, optimization, numerical visuals */
(function () {
  const V = window.Viz, { fmt, clamp } = V.util;
  const R = (n, d = 2) => fmt(n, d);
  const FN = {
    "x²": [(x) => x * x, (x) => 2 * x], "x³ − 3x": [(x) => x ** 3 - 3 * x, (x) => 3 * x * x - 3], "sin x": [Math.sin, Math.cos],
    "eˣ": [Math.exp, Math.exp], "ln x": [Math.log, (x) => 1 / x], "√x": [Math.sqrt, (x) => 0.5 / Math.sqrt(x)], "1/x": [(x) => 1 / x, (x) => -1 / (x * x)], "|x|": [Math.abs, (x) => (x > 0 ? 1 : x < 0 ? -1 : NaN)],
  };

  V.register("limit", {
    title: "Limits: getting arbitrarily close", hint: "Shrink δ and watch the outputs",
    setup(A, a) {
      const K = { hole: { f: (x) => (x * x - 1) / (x - 1), c: 1, L: 2, t: "f(x) = (x² − 1)/(x − 1)" }, sinc: { f: (x) => Math.sin(x) / x, c: 0, L: 1, t: "f(x) = sin(x)/x" }, jump: { f: (x) => (x < 1 ? x : x + 1), c: 1, L: NaN, t: "f(x) = x (x<1), x+1 (x≥1)" }, osc: { f: (x) => Math.sin(1 / x), c: 0, L: NaN, t: "f(x) = sin(1/x)" } };
      let k = a.kind || "hole";
      const P = A.plot({ x: [-3, 4], y: [-1.5, 4.5], h: 340 });
      A.select("Function", Object.keys(K).map((x) => [x, K[x].t]), k, (v) => (k = v));
      const d = A.slider("δ (how close x is)", 0.01, 1.5, 0.01, 0.8);
      A.draw = () => {
        const C = P.clear().grid().axes().P, F = K[k];
        P.rect(F.c - d.v, -99, 2 * d.v, 200, { fill: C.blue, fa: 0.08, color: "none" });
        P.fn(F.f, { color: C.accent, width: 3, n: 2000 });
        if (!isNaN(F.L)) P.ring(F.c, F.L, 6, { color: C.accent, width: 2.5 });
        const L = F.f(F.c - d.v), Rr = F.f(F.c + d.v);
        P.dot(F.c - d.v, L, 5, { color: C.pink }); P.dot(F.c + d.v, Rr, 5, { color: C.orange });
        P.line(F.c, -99, F.c, 99, { color: C.muted, dash: [4, 4], width: 1 });
        A.set(`<span class="k">f(c − δ) =</span> <b>${R(L, 4)}</b> <span class="k">f(c + δ) =</span> <b>${R(Rr, 4)}</b> <span class="k">${isNaN(F.L) ? "the two sides don't settle on one value → the limit does not exist" : "both sides approach " + F.L + " — even though f(" + F.c + ") itself may be undefined (open circle)"}</span>`);
      };
    },
  });

  V.register("tangent", {
    title: "From secant to tangent: the derivative", hint: "Drag the point, shrink h",
    setup(A, a) {
      let fk = a.f || "x³ − 3x", x0 = a.x0 ?? 0.6;
      const P = A.plot({ x: [-3.5, 3.5], y: [-3.5, 3.5], h: 360 });
      A.select("f(x)", Object.keys(FN), fk, (v) => (fk = v));
      const h = A.slider("h", 0.001, 2, 0.001, 1.2); let showD = false;
      A.buttons([{ label: "Show f′(x)", on: (el) => { showD = !showD; el.classList.toggle("on", showD); } }]);
      P.handle(() => [x0, FN[fk][0](x0)], (x) => { x0 = x; });
      A.draw = () => {
        const C = P.clear().grid().axes().P, [f, df] = FN[fk], y0 = f(x0), x1 = x0 + h.v, y1 = f(x1), ms = (y1 - y0) / h.v, mt = df(x0);
        if (showD) P.fn(df, { color: C.green, width: 2, dash: [6, 4] });
        P.fn(f, { color: C.accent, width: 3 });
        P.fn((x) => y0 + ms * (x - x0), { color: C.orange, width: 2 });
        P.fn((x) => y0 + mt * (x - x0), { color: C.pink, width: 2, dash: [2, 4] });
        P.line(x0, y0, x1, y0, { color: C.muted, dash: [3, 3], width: 1 }); P.line(x1, y0, x1, y1, { color: C.muted, dash: [3, 3], width: 1 });
        P.dot(x1, y1, 5, { color: C.orange }); P.drawHandle(x0, y0, C.pink);
        A.set(`<span class="k">secant slope</span> ${A.tex(`\\frac{f(x+h)-f(x)}{h} = ${R(ms, 4)}`)} <span class="k">tangent slope</span> ${A.tex(`f'(${R(x0)}) = ${R(mt, 4)}`)} <span class="k">as h → 0 the orange line becomes the pink tangent</span>`);
      };
    },
  });

  V.register("riemann", {
    title: "Riemann sums → the integral", hint: "Add rectangles",
    setup(A, a) {
      const FS = { "x²": (x) => x * x, "sin x + 1": (x) => Math.sin(x) + 1, "√x": Math.sqrt, "eˣ/3": (x) => Math.exp(x) / 3 }, EX = { "x²": (a, b) => (b ** 3 - a ** 3) / 3, "sin x + 1": (a, b) => -Math.cos(b) + Math.cos(a) + b - a, "√x": (a, b) => (2 / 3) * (b ** 1.5 - a ** 1.5), "eˣ/3": (a, b) => (Math.exp(b) - Math.exp(a)) / 3 };
      let fk = a.f || "x²", rule = "mid";
      const P = A.plot({ x: [-0.4, 3.4], y: [-0.5, 5], h: 340, equal: false });
      A.select("f(x)", Object.keys(FS), fk, (v) => (fk = v));
      A.seg([["left", "Left"], ["right", "Right"], ["mid", "Midpoint"], ["trap", "Trapezoid"]], rule, (v) => (rule = v));
      const n = A.slider("n rectangles", 1, 100, 1, 6), b = A.slider("upper limit b", 0.5, 3, 0.05, 2);
      A.draw = () => {
        const C = P.clear().grid(0.5).axes({ step: 0.5 }).P, f = FS[fk], N = n.v, w = b.v / N; let S = 0;
        for (let i = 0; i < N; i++) {
          const x = i * w;
          if (rule === "trap") { const y1 = f(x), y2 = f(x + w); S += ((y1 + y2) / 2) * w; P.poly([[x, 0], [x, y1], [x + w, y2], [x + w, 0]], { close: true, fill: C.blue, fa: 0.25, color: C.blue, width: 1 }); }
          else { const xs = rule === "left" ? x : rule === "right" ? x + w : x + w / 2, y = f(xs); S += y * w; P.rect(x, 0, w, y, { fill: C.blue, fa: 0.25, color: C.blue, width: 1 }); }
        }
        P.fn(f, { color: C.accent, width: 3, from: 0 });
        const ex = EX[fk](0, b.v);
        A.set(`<span class="k">sum of ${N} pieces</span> <b>${R(S, 5)}</b> <span class="k">exact</span> ${A.tex(`\\int_0^{${R(b.v)}} f(x)\\,dx = ${R(ex, 5)}`)} <span class="k">error</span> <b>${R(S - ex, 5)}</b>`);
      };
    },
  });

  V.register("ftc", {
    title: "The Fundamental Theorem: area accumulates", hint: "Slide x",
    setup(A) {
      const f = (t) => Math.sin(t) + 0.3 * t, F = (x) => -Math.cos(x) + 1 + 0.15 * x * x;
      const P = A.plot({ x: [-0.3, 6.5], y: [-1.3, 4], h: 230, equal: false }), Q = A.plot({ x: [-0.3, 6.5], y: [-0.5, 8], h: 200, equal: false });
      const x = A.slider("x", 0, 6.28, 0.01, 2);
      A.draw = () => {
        let C = P.clear().grid().axes().P;
        P.area(f, 0, x.v, { fill: C.blue, fa: 0.3 }); P.fn(f, { color: C.accent, width: 3 }); P.line(x.v, 0, x.v, f(x.v), { color: C.pink, width: 2 }); P.text("f(t)", 6, f(6), { dy: -10, color: C.accent });
        Q.clear().grid().axes(); Q.fn(F, { color: C.muted, width: 1.5, dash: [4, 4] }); Q.fn(F, { color: C.green, width: 3, to: x.v }); Q.dot(x.v, F(x.v), 6, { color: C.pink });
        Q.fn((t) => F(x.v) + f(x.v) * (t - x.v), { color: C.orange, width: 1.5, from: x.v - 1, to: x.v + 1 }); Q.text("A(x)", 6, F(6), { dy: -10, color: C.green });
        A.set(`<span class="k">blue area so far</span> ${A.tex(`A(x) = \\int_0^x f(t)\\,dt = ${R(F(x.v), 3)}`)} <span class="k">slope of A at x (orange)</span> <b>${R(f(x.v), 3)}</b> <span class="k">= height f(x). That is the theorem:</span> ${A.tex("A'(x) = f(x)")}`);
      };
    },
  });

  const fact = (n) => (n < 2 ? 1 : n * fact(n - 1));
  V.register("taylor", {
    title: "Taylor polynomials", hint: "Add terms",
    setup(A, a) {
      const T = { "sin x": (k) => [0, 1, 0, -1][k % 4], "cos x": (k) => [1, 0, -1, 0][k % 4], "eˣ": () => 1, "ln(1+x)": (k) => (k === 0 ? 0 : ((k % 2 ? 1 : -1) * fact(k - 1))) }, F = { "sin x": Math.sin, "cos x": Math.cos, "eˣ": Math.exp, "ln(1+x)": (x) => Math.log(1 + x) };
      let fk = a.f || "sin x";
      const P = A.plot({ x: [-7, 7], y: [-3, 3], h: 340 });
      A.select("f(x)", Object.keys(T), fk, (v) => (fk = v));
      const n = A.slider("degree n", 0, 15, 1, 3);
      A.draw = () => {
        const C = P.clear().grid().axes().P, c = (k) => T[fk](k) / fact(k), p = (x) => { let s = 0; for (let k = 0; k <= n.v; k++) s += c(k) * x ** k; return s; };
        P.fn(F[fk], { color: C.muted, width: 4, alpha: 0.5 }); P.fn(p, { color: C.accent, width: 2.5 });
        const terms = []; for (let k = 0; k <= Math.min(n.v, 6); k++) { const q = c(k); if (Math.abs(q) > 1e-12) terms.push(`${k === 0 ? R(q, 4) : (Math.abs(q - 1) < 1e-12 ? "" : Math.abs(q + 1) < 1e-12 ? "-" : R(q, 4))}${k ? (k === 1 ? "x" : "x^{" + k + "}") : ""}`); }
        A.set(`${A.tex("P_{" + n.v + "}(x) = " + (terms.join(" + ").replace(/\+ -/g, "- ") || "0") + (n.v > 6 ? " + \\cdots" : ""))} <span class="k">grey = the real function; each new term hugs it further from 0</span>`);
      };
    },
  });

  const SURF = {
    bowl: { f: (x, y) => x * x + 2 * y * y, g: (x, y) => [2 * x, 4 * y], t: "f = x² + 2y²" },
    ravine: { f: (x, y) => 0.2 * x * x + 4 * y * y, g: (x, y) => [0.4 * x, 8 * y], t: "f = 0.2x² + 4y² (ill-conditioned)" },
    saddle: { f: (x, y) => x * x - y * y, g: (x, y) => [2 * x, -2 * y], t: "f = x² − y² (saddle)" },
    rosen: { f: (x, y) => (1 - x) ** 2 + 5 * (y - x * x) ** 2, g: (x, y) => [-2 * (1 - x) - 20 * x * (y - x * x), 10 * (y - x * x)], t: "Rosenbrock banana" },
    bumpy: { f: (x, y) => 0.3 * (x * x + y * y) - Math.cos(2 * x) - Math.cos(2 * y) + 2, g: (x, y) => [0.6 * x + 2 * Math.sin(2 * x), 0.6 * y + 2 * Math.sin(2 * y)], t: "bumpy (many local minima)" },
  };
  function heat(P, f, C) {
    const ctx = P.ctx, W = P.W, H = P.H, st = 6; let mn = Infinity, mx = -Infinity; const vals = [];
    for (let j = 0; j < H; j += st) for (let i = 0; i < W; i += st) { const [x, y] = P.world(i, j), v = f(x, y); vals.push(v); mn = Math.min(mn, v); mx = Math.max(mx, v); }
    let q = 0; const dark = document.documentElement.dataset.theme === "dark";
    for (let j = 0; j < H; j += st) for (let i = 0; i < W; i += st) { const t = Math.pow((vals[q++] - mn) / (mx - mn || 1), 0.5); const L = dark ? 14 + 40 * t : 97 - 38 * t; ctx.fillStyle = `hsl(${250 - 200 * t} 70% ${L}%)`; ctx.fillRect(i, j, st, st); }
    const lv = 12; ctx.strokeStyle = C.ink; ctx.globalAlpha = 0.25; ctx.lineWidth = 1;
    for (let j = 0; j < H - st; j += st) for (let i = 0; i < W - st; i += st) { const [x, y] = P.world(i, j), [x2, y2] = P.world(i + st, j + st); const a = Math.floor(Math.sqrt(Math.max(0, f(x, y) - mn)) * lv / Math.sqrt(mx - mn || 1)), b = Math.floor(Math.sqrt(Math.max(0, f(x2, y) - mn)) * lv / Math.sqrt(mx - mn || 1)), c = Math.floor(Math.sqrt(Math.max(0, f(x, y2) - mn)) * lv / Math.sqrt(mx - mn || 1)); if (a !== b || a !== c) ctx.fillRect(i + st / 2, j + st / 2, 1.5, 1.5); }
    ctx.globalAlpha = 1;
  }

  V.register("gradient", {
    title: "Contours and the gradient", hint: "Drag the point",
    setup(A, a) {
      let sk = a.surface || "bowl"; const p = [1.4, 0.8];
      const P = A.plot({ x: [-3, 3], y: [-2, 2], h: 360 });
      A.select("Surface", Object.keys(SURF).map((k) => [k, SURF[k].t]), sk, (v) => (sk = v));
      P.handle(() => p, (x, y) => { p[0] = x; p[1] = y; });
      A.draw = () => {
        const C = P.clear().P, S = SURF[sk]; heat(P, S.f, C); P.axes({ labels: false });
        const g = S.g(...p), n = Math.hypot(...g) || 1, s = 0.6 / Math.max(1, n / 3);
        P.arrow(p[0], p[1], p[0] + g[0] * s, p[1] + g[1] * s, { color: C.pink, width: 3.5 });
        P.arrow(p[0], p[1], p[0] - g[0] * s, p[1] - g[1] * s, { color: C.green, width: 2.5, dash: [5, 4] });
        P.line(p[0] - (g[1] / n) * 0.8, p[1] + (g[0] / n) * 0.8, p[0] + (g[1] / n) * 0.8, p[1] - (g[0] / n) * 0.8, { color: C.ink, width: 1.5, dash: [3, 3] });
        P.drawHandle(...p, C.pink);
        A.set(`${A.tex(`\\nabla f(${R(p[0])}, ${R(p[1])}) = (${R(g[0])}, ${R(g[1])})`)} <span class="k">|∇f| =</span> <b>${R(n)}</b> <span class="k">pink: steepest ascent · green: steepest descent · dashed: along the contour (no change). ∇f is always perpendicular to the contour.</span>`);
      };
    },
  });

  V.register("gd", {
    title: "Gradient descent", hint: "Pick a learning rate, press Run",
    setup(A, a) {
      let sk = a.surface || "ravine", method = "gd", path = [], start = [a.sx ?? -2.5, a.sy ?? 1.5], it = 0;
      const P = A.plot({ x: [-3, 3], y: [-2, 2], h: 360 });
      A.select("Surface", Object.keys(SURF).map((k) => [k, SURF[k].t]), sk, (v) => { sk = v; reset(); });
      A.seg([["gd", "Plain GD"], ["mom", "Momentum"], ["adam", "Adam"]], "gd", (v) => { method = v; reset(); });
      const lr = A.slider("learning rate η", 0.005, 0.6, 0.005, a.lr ?? 0.1, reset);
      let st = {}; function reset() { path = [start.slice()]; it = 0; st = { v: [0, 0], m: [0, 0], s: [0, 0] }; A.stop(); }
      const step = () => {
        const p = path[path.length - 1], g = SURF[sk].g(...p), e = lr.v; let q;
        if (method === "gd") q = [p[0] - e * g[0], p[1] - e * g[1]];
        else if (method === "mom") { st.v = [0.9 * st.v[0] + g[0], 0.9 * st.v[1] + g[1]]; q = [p[0] - e * st.v[0] * 0.3, p[1] - e * st.v[1] * 0.3]; }
        else { it++; const b1 = 0.9, b2 = 0.999; st.m = st.m.map((m, i) => b1 * m + (1 - b1) * g[i]); st.s = st.s.map((s, i) => b2 * s + (1 - b2) * g[i] * g[i]); q = [0, 1].map((i) => p[i] - e * (st.m[i] / (1 - b1 ** it)) / (Math.sqrt(st.s[i] / (1 - b2 ** it)) + 1e-8)); }
        if (!isFinite(q[0]) || Math.abs(q[0]) > 1e4) q = p; path.push(q);
      };
      A.buttons([{ label: "▶ Run", on: () => { let k = 0; A.loop(() => { step(); A.draw(); return ++k < 150; }); } }, { label: "Step", on: () => step() }, { label: "Reset", on: reset }]);
      P.handle(() => start, (x, y) => { start[0] = x; start[1] = y; reset(); });
      P.onClick = (x, y) => { start = [x, y]; reset(); A.draw(); };
      reset();
      A.draw = () => {
        const C = P.clear().P, S = SURF[sk]; heat(P, S.f, C); P.axes({ labels: false });
        P.poly(path, { color: C.pink, width: 2.5 }); path.forEach((q, i) => i && P.dot(q[0], q[1], 2.5, { color: C.pink }));
        P.drawHandle(...start, C.orange); const L = path[path.length - 1]; P.dot(L[0], L[1], 6, { color: C.ink });
        const fv = S.f(...L);
        A.set(`<span class="k">steps</span> <b>${path.length - 1}</b> <span class="k">position</span> <b>(${R(L[0])}, ${R(L[1])})</b> <span class="k">loss f</span> <b>${isFinite(fv) ? R(fv, 4) : "diverged!"}</b> <span class="k">${method === "gd" ? "Update: x ← x − η∇f(x). Too big η zig-zags or explodes; too small crawls." : method === "mom" ? "Momentum keeps a running velocity, so it rolls through ravines." : "Adam scales each coordinate by its own gradient history."}</span>`);
      };
    },
  });

  V.register("lagrange", {
    title: "Constrained optimization: Lagrange multipliers", hint: "Slide along the constraint",
    setup(A) {
      const P = A.plot({ x: [-2.5, 2.5], y: [-2, 2], h: 340 }), t = A.slider("position on circle", 0, 6.283, 0.01, 0.3);
      const f = (x, y) => x + 2 * y, g = [1, 2];
      A.draw = () => {
        const C = P.clear().grid(0.5).axes({ labels: false }).P;
        for (let c = -5; c <= 5; c += 0.5) P.fn((x) => (c - x) / 2, { color: c === 0 ? C.muted : C.line2, width: 1 });
        P.circle(0, 0, 1, { color: C.accent, width: 3 });
        const x = Math.cos(t.v), y = Math.sin(t.v), fv = f(x, y);
        P.fn((X) => (fv - X) / 2, { color: C.orange, width: 2.5 });
        P.arrow(x, y, x + g[0] * 0.35, y + g[1] * 0.35, { color: C.pink, width: 3 }); P.arrow(x, y, x + x * 0.6, y + y * 0.6, { color: C.green, width: 3 });
        P.drawHandle(x, y, C.orange);
        const par = Math.abs(g[0] * y - g[1] * x) < 0.05;
        A.set(`<span class="k">maximize</span> ${A.tex("f = x + 2y")} <span class="k">on</span> ${A.tex("x^2+y^2=1")} <span class="k">f here =</span> <b>${R(fv, 3)}</b> ${par ? `<b style="color:var(--good)">∇f ∥ ∇g → optimum! (${R(fv, 3)} = ±√5)</b>` : `<span class="k">pink ∇f and green ∇g are not parallel, so moving along the circle can still change f</span>`}`);
      };
    },
  });

  V.register("newton", {
    title: "Newton's method for roots", hint: "Drag the starting guess, then Step",
    setup(A, a) {
      const FS = { "x² − 2": [(x) => x * x - 2, (x) => 2 * x], "x³ − 2x − 5": [(x) => x ** 3 - 2 * x - 5, (x) => 3 * x * x - 2], "cos x − x": [(x) => Math.cos(x) - x, (x) => -Math.sin(x) - 1], "x³ − 2x + 2": [(x) => x ** 3 - 2 * x + 2, (x) => 3 * x * x - 2] };
      let fk = "x² − 2", x0 = a.x0 ?? 3, xs = [x0];
      const P = A.plot({ x: [-3, 4], y: [-4, 8], h: 340, equal: false });
      A.select("f(x)", Object.keys(FS), fk, (v) => { fk = v; xs = [x0]; });
      A.buttons([{ label: "Step", on: () => { const x = xs[xs.length - 1], [f, d] = FS[fk]; xs.push(x - f(x) / d(x)); } }, { label: "Reset", on: () => (xs = [x0]) }]);
      P.handle(() => [x0, 0], (x) => { x0 = x; xs = [x0]; });
      A.draw = () => {
        const C = P.clear().grid().axes().P, [f, d] = FS[fk]; P.fn(f, { color: C.accent, width: 3 });
        for (let i = 0; i < xs.length - 1; i++) { const x = xs[i], y = f(x); P.line(x, 0, x, y, { color: C.muted, dash: [3, 3], width: 1 }); P.line(x, y, xs[i + 1], 0, { color: C.orange, width: 2 }); P.dot(x, y, 4, { color: C.orange }); }
        P.drawHandle(x0, 0, C.pink); const L = xs[xs.length - 1]; P.dot(L, 0, 5, { color: C.green });
        A.set(`${A.tex(`x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}`)} <span class="k">iterates:</span> <b class="mono">${xs.slice(-5).map((x) => R(x, 8)).join(" → ")}</b> <span class="k">f(x) =</span> <b>${R(f(L), 10)}</b>`);
      };
    },
  });

  V.register("convex", {
    title: "Convex vs non-convex", hint: "Drag the two chord endpoints",
    setup(A) {
      const FS = { "x² (convex)": (x) => x * x / 2, "eˣ (convex)": (x) => Math.exp(x / 1.5) - 1, "|x| (convex)": Math.abs, "x⁴ − 3x² (not)": (x) => (x ** 4 - 3 * x * x) / 3, "sin x (not)": Math.sin };
      let fk = Object.keys(FS)[0]; const a = [-2], b = [1.5];
      const P = A.plot({ x: [-3, 3], y: [-2, 4], h: 320 });
      A.select("f(x)", Object.keys(FS), fk, (v) => (fk = v));
      P.handle(() => [a[0], FS[fk](a[0])], (x) => (a[0] = x)); P.handle(() => [b[0], FS[fk](b[0])], (x) => (b[0] = x));
      A.draw = () => {
        const C = P.clear().grid().axes().P, f = FS[fk];
        P.fn(f, { color: C.accent, width: 3 });
        let bad = false; for (let i = 1; i < 50; i++) { const t = i / 50, x = a[0] + (b[0] - a[0]) * t; if (f(x) > f(a[0]) + (f(b[0]) - f(a[0])) * t + 1e-9) bad = true; }
        P.line(a[0], f(a[0]), b[0], f(b[0]), { color: bad ? C.bad : C.good, width: 2.5 });
        P.drawHandle(a[0], f(a[0]), C.pink); P.drawHandle(b[0], f(b[0]), C.pink);
        A.set(bad ? `<b style="color:var(--bad)">The chord dips below the curve</b> <span class="k">→ not convex here. Gradient descent can get stuck in a local minimum.</span>` : `<b style="color:var(--good)">Chord stays above the curve</b> ${A.tex("f(tx+(1-t)y) \\le t f(x) + (1-t) f(y)")} <span class="k">For a convex function, any local min is the global min.</span>`);
      };
    },
  });

  V.register("float", {
    title: "Floating point: where the numbers live", hint: "Change the exponent range",
    setup(A) {
      const P = A.plot({ x: [0, 8.5], y: [-1, 1], h: 140, equal: false }), m = A.slider("mantissa bits", 1, 5, 1, 3);
      A.draw = () => {
        const C = P.clear().P; P.line(0, 0, 8.5, 0, { color: C.muted, width: 1.5 }); const vals = [];
        for (let e = -2; e <= 3; e++) for (let k = 0; k < 2 ** m.v; k++) vals.push((1 + k / 2 ** m.v) * 2 ** e);
        vals.forEach((v) => v <= 8.5 && P.line(v, -0.35, v, 0.35, { color: C.accent, width: 1.5 }));
        for (let i = 0; i <= 8; i++) P.text(String(i), i, 0, { dy: 30, color: C.muted, size: 11 });
        A.set(`<span class="k">A toy float with ${m.v} mantissa bits: ${2 ** m.v} values per power of two. The gaps double each time you cross a power of 2 — precision is </span><b>relative</b><span class="k">, not absolute. Real float64 has 52 mantissa bits, so</span> ${A.tex("\\varepsilon \\approx 2.2\\times10^{-16}")}`);
      };
    },
  });
})();
