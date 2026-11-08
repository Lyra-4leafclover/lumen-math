/* Algebra, functions, trig, complex numbers */
(function () {
  const V = window.Viz, { fmt, clamp } = V.util;
  const R = (n, d = 2) => fmt(n, d);

  const BASE = {
    linear: { t: "y = mx + b", p: { m: [-4, 4, 0.1, 1], b: [-5, 5, 0.1, 0] }, f: (x, p) => p.m * x + p.b, tex: (p) => `y = ${R(p.m)}x ${p.b < 0 ? "-" : "+"} ${R(Math.abs(p.b))}` },
    quadratic: { t: "y = a(x − h)² + k", p: { a: [-3, 3, 0.1, 1], h: [-4, 4, 0.1, 0], k: [-5, 5, 0.1, -2] }, f: (x, p) => p.a * (x - p.h) ** 2 + p.k, tex: (p) => `y = ${R(p.a)}(x - ${R(p.h)})^2 + ${R(p.k)}` },
    exp: { t: "y = a · bˣ", p: { a: [0.2, 3, 0.1, 1], b: [0.2, 4, 0.05, 2] }, f: (x, p) => p.a * p.b ** x, tex: (p) => `y = ${R(p.a)}\\cdot ${R(p.b)}^{x}` },
    log: { t: "y = log_b(x)", p: { b: [1.1, 10, 0.1, 2] }, f: (x, p) => Math.log(x) / Math.log(p.b), tex: (p) => `y = \\log_{${R(p.b)}}(x)` },
    power: { t: "y = xⁿ", p: { n: [-3, 5, 0.5, 2] }, f: (x, p) => (Number.isInteger(p.n) ? x ** p.n : x >= 0 ? x ** p.n : NaN), tex: (p) => `y = x^{${R(p.n)}}` },
    sine: { t: "y = A sin(ωx + φ) + d", p: { A: [0, 4, 0.1, 2], w: [0.2, 4, 0.1, 1], phi: [-3.14, 3.14, 0.01, 0], d: [-3, 3, 0.1, 0] }, f: (x, p) => p.A * Math.sin(p.w * x + p.phi) + p.d, tex: (p) => `y = ${R(p.A)}\\sin(${R(p.w)}x + ${R(p.phi)}) + ${R(p.d)}` },
    cubic: { t: "y = ax³ + bx² + cx + d", p: { a: [-2, 2, 0.05, 0.3], b: [-3, 3, 0.1, 0], c: [-5, 5, 0.1, -2], d: [-4, 4, 0.1, 0] }, f: (x, p) => p.a * x ** 3 + p.b * x ** 2 + p.c * x + p.d, tex: (p) => `y = ${R(p.a)}x^3 + ${R(p.b)}x^2 + ${R(p.c)}x + ${R(p.d)}` },
    abs: { t: "y = a|x − h| + k", p: { a: [-3, 3, 0.1, 1], h: [-4, 4, 0.1, 0], k: [-4, 4, 0.1, 0] }, f: (x, p) => p.a * Math.abs(x - p.h) + p.k, tex: (p) => `y = ${R(p.a)}|x - ${R(p.h)}| + ${R(p.k)}` },
    rational: { t: "y = 1/(x − h) + k", p: { h: [-3, 3, 0.1, 0], k: [-3, 3, 0.1, 0] }, f: (x, p) => 1 / (x - p.h) + p.k, tex: (p) => `y = \\dfrac{1}{x - ${R(p.h)}} + ${R(p.k)}` },
  };
  const PARENT = { square: (x) => x * x, abs: Math.abs, sqrt: Math.sqrt, sin: Math.sin, exp: Math.exp, cube: (x) => x ** 3 };
  V.register("func", {
    title: "Function explorer", hint: "Move the sliders",
    setup(A, a) {
      if (a.kind === "transform") {
        A.title("Transformations: y = a·f(b(x − h)) + k");
        const P = A.plot({ x: [-8, 8], y: [-6, 6], h: 360 });
        let g = a.parent || "square";
        A.select("Parent f", Object.keys(PARENT).map((k) => [k, { square: "x²", abs: "|x|", sqrt: "√x", sin: "sin x", exp: "eˣ", cube: "x³" }[k]]), g, (v) => (g = v));
        const s = { a: A.slider("a (vertical stretch)", -3, 3, 0.1, 1), b: A.slider("b (horizontal)", -3, 3, 0.1, 1), h: A.slider("h (shift right)", -5, 5, 0.1, 0), k: A.slider("k (shift up)", -5, 5, 0.1, 0) };
        A.draw = () => {
          const f = PARENT[g], p = { a: s.a.v, b: s.b.v, h: s.h.v, k: s.k.v };
          P.clear().grid().axes();
          P.fn(f, { color: P.P.muted, width: 2, dash: [6, 6] });
          P.fn((x) => p.a * f(p.b * (x - p.h)) + p.k, { color: P.P.accent, width: 3 });
          A.set(`<span class="k">dashed = parent, solid = transformed</span> ${A.tex(`y = ${R(p.a)}\\,f\\big(${R(p.b)}(x - ${R(p.h)})\\big) + ${R(p.k)}`)}`);
        };
        return;
      }
      const kind = a.kind || "linear", B = BASE[kind];
      A.title(B.t);
      const P = A.plot({ x: a.x || [-8, 8], y: a.y || [-6, 6], h: 340 });
      const s = {};
      for (const [k, [mn, mx, st, v]] of Object.entries(B.p)) s[k] = A.slider(k === "w" ? "ω" : k === "phi" ? "φ" : k, mn, mx, st, a[k] != null ? a[k] : v);
      A.draw = () => {
        const p = {}; for (const k in s) p[k] = s[k].v;
        P.clear().grid().axes();
        if (kind === "log") P.fn((x) => Math.log(x), { color: P.P.muted, dash: [5, 5], width: 1.5 });
        if (kind === "exp") P.dot(0, p.a, 5, { color: P.P.pink });
        P.fn((x) => B.f(x, p), { color: P.P.accent, width: 3 });
        let extra = "";
        if (kind === "linear") { P.dot(0, p.b, 6, { color: P.P.pink }); const x0 = -p.b / p.m; extra = `<span class="k">slope</span> <b>${R(p.m)}</b> <span class="k">y-intercept</span> <b>${R(p.b)}</b> <span class="k">x-intercept</span> <b>${p.m ? R(x0) : "none"}</b>`; P.line(1, p.m + p.b, 2, p.m + p.b, { color: P.P.orange, width: 2 }); P.line(2, p.m + p.b, 2, 2 * p.m + p.b, { color: P.P.green, width: 2 }); P.text("run 1", 1.5, p.m + p.b, { dy: 16, color: P.P.orange, size: 11 }); P.text("rise " + R(p.m), 2, 1.5 * p.m + p.b, { dx: 30, color: P.P.green, size: 11 }); }
        if (kind === "quadratic") { P.dot(p.h, p.k, 6, { color: P.P.pink }); const D = -p.k / p.a; extra = `<span class="k">vertex</span> <b>(${R(p.h)}, ${R(p.k)})</b> <span class="k">opens</span> <b>${p.a > 0 ? "up" : p.a < 0 ? "down" : "flat"}</b> <span class="k">roots</span> <b>${D >= 0 && p.a ? `${R(p.h - Math.sqrt(D))}, ${R(p.h + Math.sqrt(D))}` : "none (real)"}</b>`; }
        if (kind === "sine") extra = `<span class="k">amplitude</span> <b>${R(p.A)}</b> <span class="k">period</span> <b>${R((2 * Math.PI) / p.w)}</b> <span class="k">midline</span> <b>y = ${R(p.d)}</b>`;
        if (kind === "exp") extra = `<span class="k">${p.b > 1 ? "growth" : p.b < 1 ? "decay" : "constant"}</span> <span class="k">each step right multiplies y by</span> <b>${R(p.b)}</b>`;
        if (kind === "log") extra = `<span class="k">log<sub>b</sub>(b) = 1, so it passes through</span> <b>(${R(p.b)}, 1)</b> <span class="k">and (1, 0). Dashed: ln x</span>`;
        A.set(A.tex(B.tex(p)) + " " + extra);
      };
    },
  });

  V.register("slope", {
    title: "Slope between two points", hint: "Drag the points",
    setup(A) {
      const P = A.plot({ x: [-6, 6], y: [-5, 5], h: 340 });
      const p = [-3, -2], q = [2, 2];
      P.handle(() => p, (x, y) => { p[0] = x; p[1] = y; }, { snap: 0.5 });
      P.handle(() => q, (x, y) => { q[0] = x; q[1] = y; }, { snap: 0.5 });
      A.draw = () => {
        P.clear().grid().axes();
        const dx = q[0] - p[0], dy = q[1] - p[1], m = dy / dx;
        if (dx) P.fn((x) => p[1] + m * (x - p[0]), { color: P.P.accent, width: 2.5 });
        else P.line(p[0], -99, p[0], 99, { color: P.P.accent, width: 2.5 });
        P.line(p[0], p[1], q[0], p[1], { color: P.P.orange, width: 2, dash: [5, 4] });
        P.line(q[0], p[1], q[0], q[1], { color: P.P.green, width: 2, dash: [5, 4] });
        P.text("run = " + R(dx), (p[0] + q[0]) / 2, p[1], { dy: dy >= 0 ? 18 : -8, color: P.P.orange });
        P.text("rise = " + R(dy), q[0], (p[1] + q[1]) / 2, { dx: dx >= 0 ? 44 : -44, color: P.P.green });
        P.drawHandle(...p, P.P.pink); P.drawHandle(...q, P.P.blue);
        const b = p[1] - m * p[0];
        A.set(dx ? `${A.tex(`m = \\frac{\\Delta y}{\\Delta x} = \\frac{${R(dy)}}{${R(dx)}} = ${R(m)}`)} <span class="k">line:</span> ${A.tex(`y = ${R(m)}x ${b < 0 ? "-" : "+"} ${R(Math.abs(b))}`)}` : `<b>Vertical line x = ${R(p[0])}: slope undefined (division by zero)</b>`);
      };
    },
  });

  V.register("numberline", {
    title: "Adding on the number line", hint: "Positive moves right, negative moves left",
    setup(A, a) {
      const P = A.plot({ x: [-12, 12], y: [-2, 2.5], equal: false, h: 170 });
      const sa = A.slider("a", -10, 10, 1, a.a ?? 3), sb = A.slider("b", -10, 10, 1, a.b ?? -7);
      let op = "+";
      A.seg([["+", "a + b"], ["-", "a − b"], ["*", "a × b"]], "+", (v) => (op = v));
      A.draw = () => {
        const x = sa.v, y = sb.v; P.clear();
        P.line(-12, 0, 12, 0, { color: P.P.muted, width: 2 });
        for (let i = -12; i <= 12; i++) { P.line(i, -0.12, i, 0.12, { color: P.P.muted, width: i % 5 ? 1 : 2 }); if (i % 2 === 0) P.text(String(i), i, -0.5, { color: P.P.muted, size: 11, weight: 500 }); }
        let res;
        if (op === "*") {
          res = x * y; let pos = 0; const step = y >= 0 ? x : -x, n = Math.abs(y);
          for (let i = 0; i < n; i++) { const lvl = 0.6 + (i % 3) * 0.45; if (Math.abs(pos + step) <= 12.5) P.arrow(pos, lvl, pos + step, lvl, { color: P.P.purple, width: 2.5 }); pos += step; }
          A.set(`${A.tex(`${x} \\times ${y} = ${res}`)} <span class="k">${n} jumps of size ${y >= 0 ? x : -x}${y < 0 ? " (multiplying by a negative flips direction)" : ""}</span>`);
        } else {
          const yy = op === "-" ? -y : y; res = x + yy;
          P.arrow(0, 0.7, x, 0.7, { color: P.P.blue, width: 3 }); P.text("a = " + x, x / 2, 0.7, { dy: -10, color: P.P.blue });
          P.arrow(x, 1.5, x + yy, 1.5, { color: P.P.pink, width: 3 }); P.text((op === "-" ? "−b = " : "b = ") + yy, x + yy / 2, 1.5, { dy: -10, color: P.P.pink });
          A.set(`${A.tex(op === "-" ? `${x} - (${y}) = ${x} + (${-y}) = ${res}` : `${x} + (${y}) = ${res}`)}${op === "-" ? ' <span class="k">subtracting = adding the opposite</span>' : ""}`);
        }
        if (Math.abs(res) <= 12) P.dot(res, 0, 7, { color: P.P.green, stroke: P.P.bg });
      };
    },
  });

  V.register("fraction", {
    title: "Fractions as parts of a whole", hint: "Change the numerator and denominator",
    setup(A, a) {
      const P = A.plot({ x: [0, 10], y: [0, 4], equal: false, h: 240 });
      const n1 = A.slider("a", 0, 12, 1, a.a ?? 2), d1 = A.slider("b", 1, 12, 1, a.b ?? 3), n2 = A.slider("c", 0, 12, 1, a.c ?? 3), d2 = A.slider("d", 1, 12, 1, a.d ?? 4);
      const gcd = (x, y) => (y ? gcd(y, x % y) : x);
      A.draw = () => {
        P.clear();
        const bar = (y, n, d, col) => {
          for (let i = 0; i < Math.max(d, n); i++) { const whole = Math.floor(i / d); const x = 0.5 + (i % d) * (9 / d) ; if (whole > 0) continue; P.rect(x, y, 9 / d, 0.9, { color: P.P.line2, width: 1.5, fill: i < n ? col : P.P.bg2, fa: i < n ? 0.75 : 1 }); }
          if (n > d) P.text(`+ ${Math.floor(n / d)} whole${n >= 2 * d ? "s" : ""} more`, 9.5, y + 1.1, { align: "right", size: 12, color: P.P.muted });
        };
        bar(2.6, Math.min(n1.v, d1.v) + (n1.v > d1.v ? 0 : 0), d1.v, P.P.blue);
        bar(1.0, Math.min(n2.v, d2.v), d2.v, P.P.pink);
        const num = n1.v * d2.v + n2.v * d1.v, den = d1.v * d2.v, g = gcd(num, den) || 1;
        const v1 = n1.v / d1.v, v2 = n2.v / d2.v;
        A.set(`${A.tex(`\\frac{${n1.v}}{${d1.v}} \\approx ${R(v1, 3)}`)} ${A.tex(v1 > v2 ? ">" : v1 < v2 ? "<" : "=")} ${A.tex(`\\frac{${n2.v}}{${d2.v}} \\approx ${R(v2, 3)}`)} <span class="k">sum:</span> ${A.tex(`\\frac{${n1.v}\\cdot${d2.v} + ${n2.v}\\cdot${d1.v}}{${d1.v}\\cdot${d2.v}} = \\frac{${num}}{${den}}${g > 1 ? ` = \\frac{${num / g}}{${den / g}}` : ""}`)}`);
      };
    },
  });

  V.register("system2", {
    title: "Two equations, two unknowns", hint: "Each equation is a line; the solution is where they cross",
    setup(A, a) {
      const P = A.plot({ x: [-8, 8], y: [-6, 6], h: 340 });
      const s = { a1: A.slider("a₁", -4, 4, 0.5, 1), b1: A.slider("b₁", -4, 4, 0.5, 1), c1: A.slider("c₁", -8, 8, 0.5, 4), a2: A.slider("a₂", -4, 4, 0.5, 1), b2: A.slider("b₂", -4, 4, 0.5, -1), c2: A.slider("c₂", -8, 8, 0.5, 0) };
      A.draw = () => {
        const [a1, b1, c1, a2, b2, c2] = ["a1", "b1", "c1", "a2", "b2", "c2"].map((k) => s[k].v);
        P.clear().grid().axes();
        const ln = (a, b, c, col) => { if (b) P.fn((x) => (c - a * x) / b, { color: col, width: 3 }); else if (a) P.line(c / a, -99, c / a, 99, { color: col, width: 3 }); };
        ln(a1, b1, c1, P.P.blue); ln(a2, b2, c2, P.P.pink);
        const det = a1 * b2 - a2 * b1;
        let msg;
        if (Math.abs(det) > 1e-9) { const x = (c1 * b2 - c2 * b1) / det, y = (a1 * c2 - a2 * c1) / det; P.dot(x, y, 7, { color: P.P.green, stroke: P.P.bg }); msg = `<b>One solution:</b> ${A.tex(`(x, y) = (${R(x)}, ${R(y)})`)}`; }
        else { const same = Math.abs(a1 * c2 - a2 * c1) < 1e-9 && Math.abs(b1 * c2 - b2 * c1) < 1e-9; msg = same ? "<b>Same line: infinitely many solutions</b>" : "<b>Parallel lines: no solution</b>"; }
        A.set(`${A.tex(`\\color{${P.P.blue}}{${R(a1)}x + ${R(b1)}y = ${R(c1)}}`)} ${A.tex(`\\color{${P.P.pink}}{${R(a2)}x + ${R(b2)}y = ${R(c2)}}`)} ${msg}`);
      };
    },
  });

  V.register("quadratic", {
    title: "y = ax² + bx + c and the quadratic formula", hint: "Watch the discriminant",
    setup(A) {
      const P = A.plot({ x: [-8, 8], y: [-8, 8], h: 360 });
      const sa = A.slider("a", -3, 3, 0.1, 1), sb = A.slider("b", -8, 8, 0.1, -2), sc = A.slider("c", -8, 8, 0.1, -3);
      A.draw = () => {
        const a = sa.v || 1e-9, b = sb.v, c = sc.v, D = b * b - 4 * a * c, h = -b / (2 * a), k = c - (b * b) / (4 * a);
        P.clear().grid().axes();
        P.line(h, -99, h, 99, { color: P.P.muted, dash: [4, 5], width: 1.5 });
        P.fn((x) => a * x * x + b * x + c, { color: P.P.accent, width: 3 });
        P.dot(h, k, 6, { color: P.P.purple }); P.dot(0, c, 5, { color: P.P.orange });
        let r = "";
        if (D > 1e-9) { const x1 = (-b - Math.sqrt(D)) / (2 * a), x2 = (-b + Math.sqrt(D)) / (2 * a); P.dot(x1, 0, 7, { color: P.P.green, stroke: P.P.bg }); P.dot(x2, 0, 7, { color: P.P.green, stroke: P.P.bg }); r = `<b>2 real roots:</b> ${R(Math.min(x1, x2))}, ${R(Math.max(x1, x2))}`; }
        else if (D > -1e-9) { P.dot(h, 0, 7, { color: P.P.green, stroke: P.P.bg }); r = `<b>1 repeated root:</b> ${R(h)}`; }
        else r = `<b>No real roots</b> (complex: ${R(h)} ± ${R(Math.sqrt(-D) / (2 * Math.abs(a)))}i)`;
        A.set(`${A.tex(`\\Delta = b^2 - 4ac = ${R(D)}`)} ${r} <span class="k">vertex</span> (${R(h)}, ${R(k)}) <span class="k">axis</span> x = ${R(h)}`);
      };
    },
  });

  const TERMS = { i: ["i", (i) => i], i2: ["i^2", (i) => i * i], one: ["1", () => 1], half: ["(1/2)^i", (i) => 0.5 ** i], odd: ["2i-1", (i) => 2 * i - 1], inv: ["1/i", (i) => 1 / i] };
  V.register("sigma", {
    title: "Summation notation, term by term", hint: "Each bar is one term",
    setup(A, a) {
      let t = a.term || "i";
      const P = A.plot({ x: [0, 13], y: [0, 10], equal: false, h: 300 });
      A.select("Term", Object.entries(TERMS).map(([k, v]) => [k, v[0]]), t, (v) => (t = v));
      const sn = A.slider("n", 1, 12, 1, a.n || 5);
      A.draw = () => {
        const [tx, f] = TERMS[t]; const n = sn.v; let S = 0; const vals = [];
        for (let i = 1; i <= n; i++) { vals.push(f(i)); S += f(i); }
        const mx = Math.max(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(f)) * 1.1;
        P.setView([0, 13], [0, mx]); P.clear();
        for (let i = 1; i <= 12; i++) { const v = f(i); P.rect(i - 0.4, 0, 0.8, v, { color: "none", fill: i <= n ? P.P.accent : P.P.line, fa: i <= n ? 0.8 : 0.5 }); P.text(String(i), i, 0, { dy: 14, size: 11, color: P.P.muted }); if (i <= n && n <= 8) P.text(R(v, 3), i, v, { dy: -6, size: 11 }); }
        A.set(`${A.tex(`\\sum_{i=1}^{${n}} ${tx.replace("(1/2)^i", "\\left(\\tfrac12\\right)^i").replace("1/i", "\\tfrac{1}{i}")} = ${vals.slice(0, 6).map((v) => R(v, 3)).join(" + ")}${n > 6 ? " + \\cdots" : ""} = ${R(S, 4)}`)}`);
      };
    },
  });

  V.register("unit-circle", {
    title: "The unit circle: where sine and cosine come from", hint: "Drag the point or press play",
    setup(A) {
      const P = A.plot({ x: [-1.6, 8.2], y: [-1.5, 1.5], h: 300 });
      let th = 0.9, playing = false;
      P.handle(() => [Math.cos(th), Math.sin(th)], (x, y) => { th = Math.atan2(y, x); if (th < 0) th += 2 * Math.PI; });
      A.buttons([{ label: "▶ Play", on: (el) => { playing = !playing; el.textContent = playing ? "❚❚ Pause" : "▶ Play"; if (playing) A.loop((dt) => { th = (th + dt * 1.2) % (2 * Math.PI); A.draw(); return playing; }); } }]);
      A.draw = () => {
        const c = Math.cos(th), s = Math.sin(th), X0 = 1.8, sc = 6 / (2 * Math.PI);
        P.clear();
        P.line(-1.4, 0, 1.4, 0, { color: P.P.line2, width: 1 }); P.line(0, -1.4, 0, 1.4, { color: P.P.line2, width: 1 });
        P.circle(0, 0, 1, { color: P.P.muted, width: 1.5 });
        P.line(X0, 0, X0 + 6.2, 0, { color: P.P.line2, width: 1 });
        [[Math.PI / 2, "π/2"], [Math.PI, "π"], [1.5 * Math.PI, "3π/2"], [2 * Math.PI, "2π"]].forEach(([v, l]) => P.text(l, X0 + v * sc, 0, { dy: 16, size: 11, color: P.P.muted }));
        P.fn((x) => Math.sin((x - X0) / sc), { from: X0, to: X0 + 6, color: P.P.pink, width: 1.5, alpha: 0.35 });
        P.fn((x) => Math.sin((x - X0) / sc), { from: X0, to: X0 + th * sc, color: P.P.pink, width: 3 });
        P.fn((x) => Math.cos((x - X0) / sc), { from: X0, to: X0 + th * sc, color: P.P.blue, width: 2, alpha: 0.6 });
        const ctx = P.ctx, o = P.px(0, 0), r = 0.25 * P.sx; ctx.strokeStyle = P.P.orange; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(o[0], o[1], r, 0, -th, true); ctx.stroke();
        P.line(0, 0, c, s, { color: P.P.ink, width: 2 });
        P.line(c, 0, c, s, { color: P.P.pink, width: 3 }); P.line(0, 0, c, 0, { color: P.P.blue, width: 3 });
        P.line(c, s, X0 + th * sc, s, { color: P.P.pink, dash: [3, 4], width: 1.5 });
        P.dot(X0 + th * sc, s, 5, { color: P.P.pink });
        P.drawHandle(c, s, P.P.accent);
        A.set(`${A.tex(`\\theta = ${R(th, 3)}\\text{ rad} = ${R((th * 180) / Math.PI, 1)}^\\circ`)} <span style="color:${P.P.blue}">${A.tex(`\\cos\\theta = ${R(c, 3)}`)}</span> <span style="color:${P.P.pink}">${A.tex(`\\sin\\theta = ${R(s, 3)}`)}</span> ${A.tex(`\\tan\\theta = ${Math.abs(c) < 1e-3 ? "\\text{undef}" : R(s / c, 3)}`)} ${A.tex(`\\cos^2+\\sin^2 = 1`)}`);
      };
    },
  });

  V.register("complex", {
    title: "Complex numbers on the plane", hint: "Drag z and w",
    setup(A, a) {
      const P = A.plot({ x: [-5, 5], y: [-4, 4], h: 360 });
      const z = [2, 1], w = [1, 1.5]; let op = a.op || "mul";
      P.handle(() => z, (x, y) => { z[0] = x; z[1] = y; }, { snap: 0.25 });
      P.handle(() => w, (x, y) => { w[0] = x; w[1] = y; }, { snap: 0.25 });
      A.seg([["add", "z + w"], ["mul", "z · w"], ["conj", "conjugate"], ["pow", "powers of z"]], op, (v) => (op = v));
      const mag = (p) => Math.hypot(p[0], p[1]), arg = (p) => Math.atan2(p[1], p[0]);
      A.draw = () => {
        P.clear().grid().axes({ xl: "Re", yl: "Im" });
        let r, txt;
        if (op === "add") { r = [z[0] + w[0], z[1] + w[1]]; P.line(z[0], z[1], r[0], r[1], { color: P.P.pink, dash: [4, 4] }); P.line(w[0], w[1], r[0], r[1], { color: P.P.blue, dash: [4, 4] }); txt = `${A.tex(`z + w = (${R(z[0])} + ${R(w[0])}) + (${R(z[1])} + ${R(w[1])})i = ${R(r[0])} + ${R(r[1])}i`)} <span class="k">adds like vectors</span>`; }
        else if (op === "mul") { r = [z[0] * w[0] - z[1] * w[1], z[0] * w[1] + z[1] * w[0]]; const ctx = P.ctx, o = P.px(0, 0); ctx.strokeStyle = P.P.orange; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(o[0], o[1], 30, -arg(z), -arg(z) - arg(w), arg(w) > 0); ctx.stroke(); txt = `${A.tex(`|zw| = |z||w| = ${R(mag(z))}\\cdot${R(mag(w))} = ${R(mag(r))}`)} ${A.tex(`\\arg(zw) = \\arg z + \\arg w = ${R((arg(z) * 180) / Math.PI, 0)}^\\circ + ${R((arg(w) * 180) / Math.PI, 0)}^\\circ`)} <span class="k">multiplying = scale and rotate</span>`; }
        else if (op === "conj") { r = [z[0], -z[1]]; P.line(-9, 0, 9, 0, { color: P.P.orange, width: 1, dash: [3, 4] }); txt = `${A.tex(`\\bar z = ${R(z[0])} - ${R(z[1])}i`)} ${A.tex(`z\\bar z = |z|^2 = ${R(mag(z) ** 2)}`)} <span class="k">mirror across the real axis</span>`; }
        else { let p = [1, 0]; const pts = [p]; for (let k = 1; k <= 8; k++) { p = [p[0] * z[0] - p[1] * z[1], p[0] * z[1] + p[1] * z[0]]; pts.push(p); } P.poly(pts, { color: P.P.purple, width: 1.5, alpha: 0.6 }); pts.forEach((q, k) => { P.dot(q[0], q[1], 4, { color: P.P.purple }); if (k < 6) P.text("z" + (k ? "^" + k : "⁰"), q[0], q[1], { dy: -9, size: 11, color: P.P.purple }); }); r = null; txt = `${A.tex(`|z| = ${R(mag(z))}`)} <span class="k">${mag(z) > 1.01 ? "powers spiral outward" : mag(z) < 0.99 ? "powers spiral inward" : "powers stay on the unit circle"}; each step rotates by</span> ${A.tex(`${R((arg(z) * 180) / Math.PI, 1)}^\\circ`)}`; }
        P.arrow(0, 0, z[0], z[1], { color: P.P.pink, width: 3 });
        if (op === "add" || op === "mul") P.arrow(0, 0, w[0], w[1], { color: P.P.blue, width: 3 });
        if (r) { P.arrow(0, 0, r[0], r[1], { color: P.P.green, width: 3.5 }); P.text(op === "conj" ? "z̄" : op === "add" ? "z+w" : "zw", r[0], r[1], { dy: -10, color: P.P.green }); }
        P.drawHandle(...z, P.P.pink); P.text("z", z[0], z[1], { dx: 12, dy: -8, color: P.P.pink });
        if (op === "add" || op === "mul") { P.drawHandle(...w, P.P.blue); P.text("w", w[0], w[1], { dx: 12, dy: -8, color: P.P.blue }); }
        A.set(txt);
      };
    },
  });

  V.register("euler", {
    title: "Euler's formula: e^{iθ} = cos θ + i sin θ", hint: "Slide θ, or build e^{iθ} from its series",
    setup(A) {
      const P = A.plot({ x: [-2, 2], y: [-1.6, 1.6], h: 340 });
      const st = A.slider("θ", 0, 6.283, 0.01, 1.2), sn = A.slider("series terms", 1, 14, 1, 14);
      A.draw = () => {
        const th = st.v; P.clear().grid(0.5).axes({ step: 0.5, xl: "Re", yl: "Im" });
        P.circle(0, 0, 1, { color: P.P.muted, width: 1.5 });
        let re = 0, im = 0, fact = 1; const pts = [[0, 0]];
        for (let k = 0; k < sn.v; k++) { if (k) fact *= k; const t = th ** k / fact; const m = k % 4; const d = [[t, 0], [0, t], [-t, 0], [0, -t]][m]; re += d[0]; im += d[1]; pts.push([re, im]); }
        pts.forEach((p, i) => i && P.arrow(pts[i - 1][0], pts[i - 1][1], p[0], p[1], { color: [P.P.blue, P.P.pink, P.P.orange, P.P.green][(i - 1) % 4], width: 2, head: 8 }));
        P.dot(Math.cos(th), Math.sin(th), 6, { color: P.P.accent, stroke: P.P.bg });
        A.set(`${A.tex(`e^{i\\cdot${R(th, 2)}} = ${R(Math.cos(th), 3)} + ${R(Math.sin(th), 3)}i`)} <span class="k">series after ${sn.v} terms:</span> ${A.tex(`${R(re, 3)} + ${R(im, 3)}i`)} <span class="k">Each term ${A.tex("\\frac{(i\\theta)^k}{k!}")} turns 90°.</span>`);
      };
    },
  });

  const POLAR = { rose: ["r = cos(kθ)", (t, k) => Math.cos(k * t)], cardioid: ["r = 1 + cos θ", (t, k) => 1 + Math.cos(t)], spiral: ["r = θ/6", (t, k) => t / 6], limacon: ["r = 0.5 + k·cos θ", (t, k) => 0.5 + (k / 3) * Math.cos(t)], circle: ["r = 2cos θ", (t) => 2 * Math.cos(t)] };
  V.register("polar", {
    title: "Polar curves", hint: "Watch r change as θ sweeps",
    setup(A) {
      let c = "rose";
      const P = A.plot({ x: [-2.4, 2.4], y: [-2.2, 2.2], h: 340 });
      A.select("Curve", Object.entries(POLAR).map(([k, v]) => [k, v[0]]), c, (v) => (c = v));
      const sk = A.slider("k", 1, 7, 1, 3), st = A.slider("θ sweep", 0, 6.283 * 2, 0.01, 6.283 * 2);
      A.draw = () => {
        const f = POLAR[c][1], k = sk.v, T = st.v;
        P.clear();
        for (let r = 0.5; r <= 2.5; r += 0.5) P.circle(0, 0, r, { color: P.P.line, width: 1 });
        for (let i = 0; i < 12; i++) { const a = (i * Math.PI) / 6; P.line(0, 0, 2.5 * Math.cos(a), 2.5 * Math.sin(a), { color: P.P.line, width: 1 }); }
        P.param((t) => { const r = f(t, k); return [r * Math.cos(t), r * Math.sin(t)]; }, 0, T, { color: P.P.accent, width: 2.5, n: 800 });
        const r = f(T, k); P.line(0, 0, r * Math.cos(T), r * Math.sin(T), { color: P.P.orange, width: 2 }); P.dot(r * Math.cos(T), r * Math.sin(T), 5, { color: P.P.orange });
        A.set(`${A.tex(POLAR[c][0].replace("θ", "\\theta").replace("·", "\\cdot "))} <span class="k">point:</span> ${A.tex(`(r,\\theta) = (${R(r)}, ${R(T)}) \\;\\to\\; (x,y) = (${R(r * Math.cos(T))}, ${R(r * Math.sin(T))})`)}`);
      };
    },
  });

  const INV = { exp: ["e^x", Math.exp, Math.log, "\\ln x"], square: ["x^2\\ (x\\ge0)", (x) => (x >= 0 ? x * x : NaN), Math.sqrt, "\\sqrt{x}"], cube: ["x^3", (x) => x ** 3, Math.cbrt, "\\sqrt[3]{x}"], lin: ["2x+1", (x) => 2 * x + 1, (x) => (x - 1) / 2, "\\frac{x-1}{2}"] };
  V.register("inverse", {
    title: "A function and its inverse mirror across y = x", hint: "Drag the point along f",
    setup(A) {
      let k = "exp", x = 0.8;
      const P = A.plot({ x: [-4, 5], y: [-4, 5], h: 360 });
      A.select("f(x)", Object.entries(INV).map(([a, v]) => [a, v[0].replace("\\ (x\\ge0)", " (x≥0)").replace("e^x", "eˣ").replace("x^2", "x²").replace("x^3", "x³")]), k, (v) => (k = v));
      P.handle(() => [x, INV[k][1](x)], (a) => (x = a));
      A.draw = () => {
        const [ft, f, g, gt] = INV[k]; P.clear().grid().axes();
        P.fn((t) => t, { color: P.P.muted, dash: [5, 5], width: 1.5 });
        P.fn(f, { color: P.P.blue, width: 3 }); P.fn(g, { color: P.P.pink, width: 3 });
        const y = f(x); if (isFinite(y)) { P.line(x, y, y, x, { color: P.P.orange, dash: [3, 4], width: 1.5 }); P.dot(y, x, 6, { color: P.P.pink }); P.drawHandle(x, y, P.P.blue); }
        A.set(`<span style="color:${P.P.blue}">${A.tex(`f(x) = ${ft}`)}</span> <span style="color:${P.P.pink}">${A.tex(`f^{-1}(x) = ${gt}`)}</span> ${A.tex(`f(${R(x)}) = ${R(y)} \\iff f^{-1}(${R(y)}) = ${R(x)}`)}`);
      };
    },
  });

  V.register("sequence", {
    title: "Arithmetic vs geometric sequences", hint: "Compare adding with multiplying",
    setup(A) {
      let t = "geo";
      const P = A.plot({ x: [0, 16], y: [0, 10], equal: false, h: 300 });
      A.seg([["ari", "arithmetic"], ["geo", "geometric"]], t, (v) => (t = v));
      const sa = A.slider("first term a", 0.5, 5, 0.5, 1), sd = A.slider("d or r", -1, 2.5, 0.05, 0.7);
      A.draw = () => {
        const a = sa.v, d = sd.v, N = 15; const terms = [], sums = []; let S = 0;
        for (let n = 0; n < N; n++) { const v = t === "ari" ? a + n * d : a * d ** n; terms.push(v); S += v; sums.push(S); }
        const all = terms.concat(sums).filter(isFinite); const mx = Math.max(1, ...all), mn = Math.min(0, ...all);
        P.setView([0, 16], [mn * 1.1, mx * 1.1]); P.clear().axes({ labels: false });
        terms.forEach((v, n) => P.rect(n + 0.7, 0, 0.6, v, { color: "none", fill: P.P.accent, fa: 0.8 }));
        P.poly(sums.map((v, n) => [n + 1, v]), { color: P.P.orange, width: 2.5 }); sums.forEach((v, n) => P.dot(n + 1, v, 3.5, { color: P.P.orange }));
        let lim = "";
        if (t === "geo" && Math.abs(d) < 1) { const L = a / (1 - d); P.line(0, L, 16, L, { color: P.P.green, dash: [6, 5], width: 2 }); lim = ` <span class="k">|r| &lt; 1, so the sum converges to</span> ${A.tex(`\\frac{a}{1-r} = ${R(L, 3)}`)}`; }
        A.set(`${A.tex(t === "ari" ? `a_n = ${R(a)} + ${R(d)}(n-1)` : `a_n = ${R(a)}\\cdot ${R(d)}^{\\,n-1}`)} <span class="k">bars = terms, orange = running sum</span> ${A.tex(`S_{15} = ${R(S, 3)}`)}${lim}`);
      };
    },
  });
})();
