/* g02 extra visuals for Functions & Precalculus: piecewise functions, conic sections, triangle laws */
(function () {
  const V = window.Viz, { fmt } = V.util;
  const R = (n, d = 2) => fmt(n, d);

  const INF = 1e9;
  function stepPieces(kind) {
    const out = [];
    for (let n = -9; n <= 9; n++) {
      if (kind === "floor") out.push({ lo: n, hi: n + 1, lc: true, hc: false, f: () => n, tex: `\\lfloor x \\rfloor = ${n}\\ \\text{ for } ${n} \\le x < ${n + 1}` });
      else out.push({ lo: n - 1, hi: n, lc: false, hc: true, f: () => n, tex: `\\lceil x \\rceil = ${n}\\ \\text{ for } ${n - 1} < x \\le ${n}` });
    }
    return out;
  }
  const PW = {
    relu: { t: "ReLU(x) = max(0, x)", p: () => [{ lo: -INF, hi: 0, lc: false, hc: false, f: () => 0, tex: "0 \\ (x < 0)" }, { lo: 0, hi: INF, lc: true, hc: false, f: (x) => x, tex: "x \\ (x \\ge 0)" }] },
    leaky: { t: "Leaky ReLU (slope α for x < 0)", p: (al) => [{ lo: -INF, hi: 0, lc: false, hc: false, f: (x) => al * x, tex: `${R(al)}x \\ (x < 0)` }, { lo: 0, hi: INF, lc: true, hc: false, f: (x) => x, tex: "x \\ (x \\ge 0)" }] },
    abs: { t: "|x|", p: () => [{ lo: -INF, hi: 0, lc: false, hc: false, f: (x) => -x, tex: "-x \\ (x < 0)" }, { lo: 0, hi: INF, lc: true, hc: false, f: (x) => x, tex: "x \\ (x \\ge 0)" }] },
    step: { t: "Heaviside step H(x)", p: () => [{ lo: -INF, hi: 0, lc: false, hc: false, f: () => 0, tex: "0 \\ (x < 0)" }, { lo: 0, hi: INF, lc: true, hc: false, f: () => 1, tex: "1 \\ (x \\ge 0)" }] },
    sign: { t: "sign(x)", p: () => [{ lo: -INF, hi: 0, lc: false, hc: false, f: () => -1, tex: "-1 \\ (x < 0)" }, { lo: 0, hi: 0, lc: true, hc: true, f: () => 0, tex: "0 \\ (x = 0)" }, { lo: 0, hi: INF, lc: false, hc: false, f: () => 1, tex: "1 \\ (x > 0)" }] },
    clip: { t: "clip(x) to [−1, 1]", p: () => [{ lo: -INF, hi: -1, lc: false, hc: false, f: () => -1, tex: "-1 \\ (x < -1)" }, { lo: -1, hi: 1, lc: true, hc: true, f: (x) => x, tex: "x \\ (-1 \\le x \\le 1)" }, { lo: 1, hi: INF, lc: false, hc: false, f: () => 1, tex: "1 \\ (x > 1)" }] },
    floor: { t: "floor ⌊x⌋", p: () => stepPieces("floor") },
    ceil: { t: "ceiling ⌈x⌉", p: () => stepPieces("ceil") },
    shipping: { t: "Shipping cost by weight", p: () => [{ lo: 0, hi: 1, lc: true, hc: true, f: () => 3, tex: "3 \\ (0 \\le x \\le 1)" }, { lo: 1, hi: 3, lc: false, hc: true, f: (x) => 3 + 1.5 * (x - 1), tex: "3 + 1.5(x - 1) \\ (1 < x \\le 3)" }, { lo: 3, hi: INF, lc: false, hc: false, f: () => 5, tex: "5 \\ (x > 3)" }] },
  };
  const inPiece = (q, x) => (x > q.lo || (q.lc && x === q.lo)) && (x < q.hi || (q.hc && x === q.hi));

  V.register("g02-piecewise", {
    title: "Piecewise functions: one rule per interval", hint: "Pick a function and slide x",
    setup(A, a) {
      let k = a.fn || "relu";
      const P = A.plot({ x: [-5, 5], y: [-3, 5], h: 340 });
      A.select("Function", Object.entries(PW).map(([key, v]) => [key, v.t]), k, (v) => (k = v));
      const sx = A.slider("x", -4.5, 4.5, 0.05, a.x != null ? a.x : 1.5), sa = A.slider("α (leaky slope)", 0, 0.5, 0.01, 0.1);
      A.draw = () => {
        const pieces = PW[k].p(sa.v), x = sx.v;
        P.clear().grid().axes();
        const cols = [P.P.accent, P.P.pink, P.P.blue, P.P.orange];
        pieces.forEach((q, i) => {
          const lo = Math.max(q.lo, -6), hi = Math.min(q.hi, 6), col = cols[i % cols.length];
          if (hi > lo) P.fn(q.f, { from: lo, to: hi, color: col, width: 3, n: 120 });
          [[q.lo, q.lc], [q.hi, q.hc]].forEach(([e, closed]) => {
            if (Math.abs(e) > 6) return; const y = q.f(e);
            if (closed) P.dot(e, y, 5, { color: col }); else P.dot(e, y, 5, { color: col, fill: P.P.bg, stroke: col, sw: 2 });
          });
        });
        const q = pieces.find((p) => inPiece(p, x)) || pieces.find((p) => inPiece(p, Math.round(x * 1e6) / 1e6));
        if (q) {
          const y = q.f(x);
          P.line(x, 0, x, y, { color: P.P.muted, dash: [4, 4], width: 1.5 });
          P.drawHandle(x, y, P.P.green);
          A.set(`<b>${PW[k].t}</b> <span class="k">at</span> ${A.tex(`x = ${R(x)}`)} <span class="k">the active rule is</span> ${A.tex(q.tex)} <span class="k">so the output is</span> <b>${R(y, 3)}</b> <span class="k">filled dot = endpoint included, hollow = excluded</span>`);
        } else A.set(`<span class="k">x = ${R(x)} is outside the domain</span>`);
      };
    },
  });

  V.register("g02-conic", {
    title: "Conic sections and their focus properties", hint: "Pick a conic, change a and b, move the point",
    setup(A, a) {
      let k = a.conic || "ellipse";
      const P = A.plot({ x: [-6, 6], y: [-4.5, 4.5], h: 360 });
      A.seg([["circle", "circle"], ["ellipse", "ellipse"], ["parabola", "parabola"], ["hyperbola", "hyperbola"]], k, (v) => (k = v));
      const sa = A.slider("a", 0.5, 5, 0.1, a.a || 4), sb = A.slider("b (or p for parabola)", 0.3, 4, 0.1, a.b || 2.5), st = A.slider("point t", -3.1, 3.1, 0.01, 0.8);
      const d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
      A.draw = () => {
        const A_ = sa.v, B = sb.v, t = st.v; P.clear().grid().axes();
        let pt, txt, F = [];
        if (k === "circle") {
          P.circle(0, 0, A_, { color: P.P.accent, width: 3 }); pt = [A_ * Math.cos(t), A_ * Math.sin(t)]; F = [[0, 0]];
          P.line(0, 0, ...pt, { color: P.P.orange, width: 2 });
          txt = `${A.tex(`x^2 + y^2 = ${R(A_ * A_)}`)} <span class="k">distance from centre</span> <b>${R(d(pt, [0, 0]))}</b> <span class="k">= r = a, always</span>`;
        } else if (k === "ellipse") {
          P.param((s) => [A_ * Math.cos(s), B * Math.sin(s)], 0, 2 * Math.PI, { color: P.P.accent, width: 3 });
          const big = Math.max(A_, B), c = Math.sqrt(Math.abs(A_ * A_ - B * B));
          F = A_ >= B ? [[-c, 0], [c, 0]] : [[0, -c], [0, c]]; pt = [A_ * Math.cos(t), B * Math.sin(t)];
          const d1 = d(pt, F[0]), d2 = d(pt, F[1]);
          P.line(...F[0], ...pt, { color: P.P.pink, width: 2 }); P.line(...F[1], ...pt, { color: P.P.blue, width: 2 });
          txt = `${A.tex(`\\frac{x^2}{${R(A_ * A_)}} + \\frac{y^2}{${R(B * B)}} = 1`)} <span class="k">c =</span> <b>${R(c)}</b> <span class="k">d₁ + d₂ =</span> <b>${R(d1)} + ${R(d2)} = ${R(d1 + d2)}</b> <span class="k">= 2·(major semi-axis) =</span> <b>${R(2 * big)}</b> <span class="k">eccentricity</span> <b>${R(c / big, 3)}</b>`;
        } else if (k === "parabola") {
          const p = B, f = (x) => (x * x) / (4 * p); P.fn(f, { color: P.P.accent, width: 3 });
          P.line(-9, -p, 9, -p, { color: P.P.orange, dash: [6, 5], width: 2 }); P.text("directrix y = −p", -5.5, -p, { dy: 16, align: "left", color: P.P.orange, size: 11 });
          F = [[0, p]]; const x = t * 1.3; pt = [x, f(x)];
          P.line(0, p, ...pt, { color: P.P.pink, width: 2 }); P.line(pt[0], pt[1], pt[0], -p, { color: P.P.blue, width: 2 });
          txt = `${A.tex(`y = \\frac{x^2}{4\\cdot ${R(p)}}`)} <span class="k">focus (0, ${R(p)}). distance to focus</span> <b>${R(d(pt, F[0]))}</b> <span class="k">= distance to directrix</span> <b>${R(pt[1] + p)}</b>`;
        } else {
          const c = Math.sqrt(A_ * A_ + B * B); F = [[-c, 0], [c, 0]];
          P.line(-9, (-9 * B) / A_, 9, (9 * B) / A_, { color: P.P.muted, dash: [5, 5], width: 1.5 }); P.line(-9, (9 * B) / A_, 9, (-9 * B) / A_, { color: P.P.muted, dash: [5, 5], width: 1.5 });
          P.param((s) => [A_ * Math.cosh(s), B * Math.sinh(s)], -3, 3, { color: P.P.accent, width: 3 });
          P.param((s) => [-A_ * Math.cosh(s), B * Math.sinh(s)], -3, 3, { color: P.P.accent, width: 3 });
          pt = [A_ * Math.cosh(t * 0.7), B * Math.sinh(t * 0.7)]; const d1 = d(pt, F[0]), d2 = d(pt, F[1]);
          P.line(...F[0], ...pt, { color: P.P.pink, width: 2 }); P.line(...F[1], ...pt, { color: P.P.blue, width: 2 });
          txt = `${A.tex(`\\frac{x^2}{${R(A_ * A_)}} - \\frac{y^2}{${R(B * B)}} = 1`)} <span class="k">c =</span> <b>${R(c)}</b> <span class="k">|d₁ − d₂| =</span> <b>|${R(d1)} − ${R(d2)}| = ${R(Math.abs(d1 - d2))}</b> <span class="k">= 2a =</span> <b>${R(2 * A_)}</b> <span class="k">asymptotes y = ±${R(B / A_)}x</span>`;
        }
        F.forEach((q) => P.dot(q[0], q[1], 6, { color: P.P.purple }));
        P.drawHandle(pt[0], pt[1], P.P.green);
        A.set(txt + ` <span class="k">purple = focus (or centre)</span>`);
      };
    },
  });

  V.register("g02-triangle", {
    title: "Solving triangles: law of sines and law of cosines", hint: "Drag the three corners",
    setup(A, a) {
      const P = A.plot({ x: [-5, 5], y: [-3.5, 4.5], h: 360 });
      const pA = [-3, -2], pB = [3.5, -2], pC = [0.5, 2.5];
      [pA, pB, pC].forEach((p) => P.handle(() => p, (x, y) => { p[0] = x; p[1] = y; }, { snap: 0.25 }));
      let showCirc = true;
      A.buttons([{ label: "Toggle circumcircle", on: () => (showCirc = !showCirc) }]);
      const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
      A.draw = () => {
        P.clear().grid();
        const a_ = dist(pB, pC), b = dist(pA, pC), c = dist(pA, pB);
        const ang = (x, y, z) => Math.acos(Math.max(-1, Math.min(1, (y * y + z * z - x * x) / (2 * y * z))));
        const Aa = ang(a_, b, c), Bb = ang(b, a_, c), Cc = Math.PI - Aa - Bb, deg = (r) => (r * 180) / Math.PI;
        const D = 2 * (pA[0] * (pB[1] - pC[1]) + pB[0] * (pC[1] - pA[1]) + pC[0] * (pA[1] - pB[1]));
        if (showCirc && Math.abs(D) > 1e-6) {
          const s = (p) => p[0] * p[0] + p[1] * p[1];
          const ux = (s(pA) * (pB[1] - pC[1]) + s(pB) * (pC[1] - pA[1]) + s(pC) * (pA[1] - pB[1])) / D;
          const uy = (s(pA) * (pC[0] - pB[0]) + s(pB) * (pA[0] - pC[0]) + s(pC) * (pB[0] - pA[0])) / D;
          P.circle(ux, uy, dist([ux, uy], pA), { color: P.P.muted, dash: [5, 5], width: 1.5 }); P.dot(ux, uy, 3, { color: P.P.muted });
        }
        P.poly([pA, pB, pC], { close: true, color: P.P.accent, width: 3, fill: P.P.accent, fa: 0.08 });
        const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
        P.text("a = " + R(a_), ...mid(pB, pC), { dx: 10, dy: -6, align: "left", color: P.P.pink, size: 12 });
        P.text("b = " + R(b), ...mid(pA, pC), { dx: -10, dy: -6, align: "right", color: P.P.blue, size: 12 });
        P.text("c = " + R(c), ...mid(pA, pB), { dy: 18, color: P.P.orange, size: 12 });
        [[pA, "A", Aa], [pB, "B", Bb], [pC, "C", Cc]].forEach(([p, l, t]) => { P.drawHandle(p[0], p[1], P.P.green); P.text(`${l} ${R(deg(t), 1)}°`, p[0], p[1], { dy: p[1] > 0 ? -14 : 24, size: 12 }); });
        const area = 0.5 * a_ * b * Math.sin(Cc);
        A.set(`<span class="k">law of sines</span> ${A.tex(`\\frac{a}{\\sin A} = ${R(a_ / Math.sin(Aa))},\\ \\frac{b}{\\sin B} = ${R(b / Math.sin(Bb))},\\ \\frac{c}{\\sin C} = ${R(c / Math.sin(Cc))}`)} <span class="k">(= diameter of the dashed circle)</span> <span class="k">law of cosines</span> ${A.tex(`c^2 = ${R(c * c)},\\ a^2 + b^2 - 2ab\\cos C = ${R(a_ * a_ + b * b - 2 * a_ * b * Math.cos(Cc))}`)} <span class="k">area</span> ${A.tex(`\\tfrac12 ab\\sin C = ${R(area)}`)} <span class="k">angle sum</span> <b>${R(deg(Aa + Bb + Cc), 1)}°</b>`);
      };
    },
  });
})();
