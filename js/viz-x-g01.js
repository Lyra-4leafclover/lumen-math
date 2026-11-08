/* g01 algebra visuals: inequality number line, area model, floor/ceiling step graphs */
(function () {
  const V = window.Viz, { fmt } = V.util;
  const R = (n, d = 2) => fmt(n, d);
  const OPS = { lt: ["<", "<"], le: ["≤", "\\le"], gt: [">", ">"], ge: ["≥", "\\ge"] };
  const FLIP = { lt: "gt", le: "ge", gt: "lt", ge: "le" };
  const test = (v, op, c) => (op === "lt" ? v < c : op === "le" ? v <= c : op === "gt" ? v > c : v >= c);
  const num = (v) => R(v).replace("−", "-");

  function numberLine(P, lo, hi) {
    P.line(lo, 0, hi, 0, { color: P.P.muted, width: 2 });
    for (let i = Math.ceil(lo); i <= hi; i++) {
      P.line(i, -0.12, i, 0.12, { color: P.P.muted, width: i % 5 ? 1 : 2 });
      if (i % 2 === 0) P.text(String(i), i, -0.55, { color: P.P.muted, size: 11, weight: 500 });
    }
  }
  function endpoint(P, x, closed, col) {
    if (closed) P.dot(x, 0, 7, { color: col, stroke: P.P.bg });
    else { P.dot(x, 0, 7, { color: P.P.bg }); P.ring(x, 0, 7, { color: col, width: 3 }); }
  }

  V.register("g01-inequality", {
    title: "Inequalities on the number line", hint: "Change the inequality, then move the test point",
    setup(A, a) {
      let mode = a.mode === "abs" ? "abs" : "linear", op = OPS[a.op] ? a.op : "lt";
      const P = A.plot({ x: [-10.5, 10.5], y: [-1.4, 1.6], equal: false, h: 180 });
      A.seg([["linear", "ax + b ? c"], ["abs", "|x − h| ? r"]], mode, (v) => { mode = v; show(); });
      A.select("Relation", Object.entries(OPS).map(([k, v]) => [k, v[0]]), op, (v) => (op = v));
      const s = { a: A.slider("a", -5, 5, 1, a.a ?? 2), b: A.slider("b", -9, 9, 1, a.b ?? 1), c: A.slider("c", -12, 12, 1, a.c ?? 7),
        h: A.slider("h (centre)", -6, 6, 0.5, a.h ?? 1), r: A.slider("r (radius)", 0, 6, 0.5, a.r ?? 3), t: A.slider("test point x", -10, 10, 0.5, a.t ?? 0) };
      const show = () => { ["a", "b", "c"].forEach((k) => (s[k].el.parentElement.style.display = mode === "linear" ? "" : "none")); ["h", "r"].forEach((k) => (s[k].el.parentElement.style.display = mode === "abs" ? "" : "none")); };
      show();
      A.draw = () => {
        P.clear(); numberLine(P, -10.5, 10.5);
        const col = P.P.accent, t = s.t.v; let ok, msg;
        const ray = (x0, dir, closed) => { const end = dir > 0 ? 10.5 : -10.5; if (Math.abs(x0) <= 10.5) { P.line(x0, 0, end, 0, { color: col, width: 6, alpha: 0.85 }); endpoint(P, x0, closed, col); } else if ((dir > 0) === (x0 < 0)) P.line(-10.5, 0, 10.5, 0, { color: col, width: 6, alpha: 0.85 }); P.arrow(dir > 0 ? 9.6 : -9.6, 0, end, 0, { color: col, width: 4 }); };
        if (mode === "linear") {
          const av = s.a.v, bv = s.b.v, cv = s.c.v, sym = OPS[op][1];
          const lhs = `${av === 1 ? "" : av === -1 ? "-" : num(av)}x ${bv < 0 ? "-" : "+"} ${Math.abs(bv)}`;
          ok = test(av * t + bv, op, cv);
          if (av === 0) {
            const all = test(bv, op, cv);
            if (all) P.line(-10.5, 0, 10.5, 0, { color: col, width: 6, alpha: 0.85 });
            msg = `${A.tex(`${bv} ${sym} ${cv}`)} <b>${all ? "is always true: every x works" : "is never true: no solution"}</b>`;
          } else {
            const x0 = (cv - bv) / av, op2 = av < 0 ? FLIP[op] : op, closed = op2 === "le" || op2 === "ge";
            ray(x0, op2 === "gt" || op2 === "ge" ? 1 : -1, closed);
            const iv = op2 === "lt" ? `(-\\infty, ${num(x0)})` : op2 === "le" ? `(-\\infty, ${num(x0)}]` : op2 === "gt" ? `(${num(x0)}, \\infty)` : `[${num(x0)}, \\infty)`;
            msg = `${A.tex(`${lhs} ${sym} ${cv} \\;\\Rightarrow\\; ${num(av)}x ${sym} ${num(cv - bv)} \\;\\Rightarrow\\; x ${OPS[op2][1]} ${num(x0)}`)}${av < 0 ? ' <b>divided by a negative, so the sign flipped</b>' : ""} <span class="k">interval</span> ${A.tex(iv)}`;
          }
        } else {
          const h = s.h.v, r = s.r.v, sym = OPS[op][1], d = Math.abs(t - h); ok = test(d, op, r);
          const closed = op === "le" || op === "ge", L = h - r, Rr = h + r;
          P.dot(h, 0, 4, { color: P.P.pink });
          if (op === "lt" || op === "le") {
            if (r > 0 || closed) { P.line(L, 0, Rr, 0, { color: col, width: 6, alpha: 0.85 }); endpoint(P, L, closed, col); endpoint(P, Rr, closed, col); }
            msg = `${A.tex(`|x - ${num(h)}| ${sym} ${num(r)} \\iff ${num(L)} ${sym} x ${sym} ${num(Rr)}`)} <span class="k">within ${R(r)} of ${R(h)}: one interval</span>`;
          } else {
            ray(L, -1, closed); ray(Rr, 1, closed);
            msg = `${A.tex(`|x - ${num(h)}| ${sym} ${num(r)} \\iff x ${op === "gt" ? "<" : "\\le"} ${num(L)} \\text{ or } x ${sym} ${num(Rr)}`)} <span class="k">farther than ${R(r)} from ${R(h)}: two rays</span>`;
          }
          P.text("h", h, 0.45, { color: P.P.pink, size: 11 });
        }
        P.dot(t, 0.95, 7, { color: ok ? P.P.good : P.P.bad, stroke: P.P.bg });
        P.line(t, 0.85, t, 0.15, { color: ok ? P.P.good : P.P.bad, width: 1.5, dash: [3, 3] });
        A.set(`${msg} <span class="k">test x = ${R(t)}:</span> <b style="color:${ok ? P.P.good : P.P.bad}">${ok ? "satisfies it" : "does not satisfy it"}</b>`);
      };
    },
  });

  V.register("g01-area-model", {
    title: "Area model: multiplying sums", hint: "Every piece of the rectangle is one term of the product",
    setup(A, a) {
      let mode = a.mode === "binomial" ? "binomial" : "numbers";
      const P = A.plot({ x: [0, 17], y: [0, 9.5], h: 340 });
      A.seg([["numbers", "a × (b + c)"], ["binomial", "(x + p)(x + q)"]], mode, (v) => { mode = v; show(); });
      const s = { a: A.slider("a", 1, 8, 1, a.a ?? 3), b: A.slider("b", 1, 8, 1, a.b ?? 4), c: A.slider("c", 1, 8, 1, a.c ?? 2),
        p: A.slider("p", -5, 5, 1, a.p ?? 3), q: A.slider("q", -5, 5, 1, a.q ?? 2) };
      const show = () => { ["a", "b", "c"].forEach((k) => (s[k].el.parentElement.style.display = mode === "numbers" ? "" : "none")); ["p", "q"].forEach((k) => (s[k].el.parentElement.style.display = mode === "binomial" ? "" : "none")); };
      show();
      A.draw = () => {
        if (mode === "numbers") {
          const av = s.a.v, bv = s.b.v, cv = s.c.v; P.setView([0, 18], [0, 10]); P.clear();
          const y0 = 9 - av;
          for (let i = 0; i < av; i++) for (let j = 0; j < bv + cv; j++) P.rect(1 + j, y0 + i, 1, 1, { color: P.P.bg, width: 1.5, fill: j < bv ? P.P.blue : P.P.pink, fa: 0.75 });
          P.line(1 + bv, y0 - 0.3, 1 + bv, 9.3, { color: P.P.ink, width: 2, dash: [5, 4] });
          P.text("b = " + bv, 1 + bv / 2, 9.35, { color: P.P.blue }); P.text("c = " + cv, 1 + bv + cv / 2, 9.35, { color: P.P.pink });
          P.text("a = " + av, 0.5, y0 + av / 2, { align: "right", dx: 6, color: P.P.ink });
          P.text(String(av * bv), 1 + bv / 2, y0 + av / 2, { size: 16, dy: 5 }); P.text(String(av * cv), 1 + bv + cv / 2, y0 + av / 2, { size: 16, dy: 5 });
          A.set(A.tex(`${av}\\times(${bv} + ${cv}) = ${av}\\times${bv + cv} = ${av * (bv + cv)} \\quad\\text{and}\\quad ${av}\\times${bv} + ${av}\\times${cv} = ${av * bv} + ${av * cv} = ${av * bv + av * cv}`));
        } else {
          const p = s.p.v, q = s.q.v, L = 4; P.setView([0, 11], [0, 11]); P.clear();
          const sc = (v) => (v > 0 ? P.P.green : P.P.bad), top = 10, x0 = 1;
          P.rect(x0, top - L, L, L, { color: P.P.bg, width: 2, fill: P.P.blue, fa: 0.7 }); P.text("x²", x0 + L / 2, top - L / 2, { size: 18, dy: 6 });
          for (let i = 0; i < Math.abs(p); i++) { P.rect(x0 + L + i, top - L, 1, L, { color: P.P.bg, width: 2, fill: sc(p), fa: 0.7 }); P.text(p > 0 ? "x" : "−x", x0 + L + i + 0.5, top - L / 2, { size: 12, dy: 4 }); }
          for (let j = 0; j < Math.abs(q); j++) { P.rect(x0, top - L - j - 1, L, 1, { color: P.P.bg, width: 2, fill: sc(q), fa: 0.7 }); P.text(q > 0 ? "x" : "−x", x0 + L / 2, top - L - j - 0.5, { size: 12, dy: 4 }); }
          for (let i = 0; i < Math.abs(p); i++) for (let j = 0; j < Math.abs(q); j++) { P.rect(x0 + L + i, top - L - j - 1, 1, 1, { color: P.P.bg, width: 2, fill: sc(p * q), fa: 0.55 }); P.text(p * q > 0 ? "1" : "−1", x0 + L + i + 0.5, top - L - j - 0.5, { size: 11, dy: 4 }); }
          P.text("x", x0 + L / 2, top + 0.35, { color: P.P.muted }); if (p) P.text((p > 0 ? "+" : "−") + Math.abs(p), x0 + L + Math.abs(p) / 2, top + 0.35, { color: sc(p) });
          P.text("x", x0 - 0.35, top - L / 2, { color: P.P.muted, align: "right" }); if (q) P.text((q > 0 ? "+" : "−") + Math.abs(q), x0 - 0.35, top - L - Math.abs(q) / 2, { color: sc(q), align: "right", dy: 4 });
          const sg = (v) => (v < 0 ? "-" : "+");
          const mid = p + q === 0 ? "" : ` ${sg(p + q)} ${Math.abs(p + q) === 1 ? "" : Math.abs(p + q)}x`, cst = p * q === 0 ? "" : ` ${sg(p * q)} ${Math.abs(p * q)}`;
          A.set(`${A.tex(`(x ${sg(p)} ${Math.abs(p)})(x ${sg(q)} ${Math.abs(q)}) = x^2${mid}${cst}`)} <span class="k">x-strips:</span> <b>${p} + ${q} = ${p + q}</b> <span class="k">unit squares:</span> <b>${p} × ${q} = ${p * q}</b> <span class="k">(green = positive, red = negative)</span>`);
        }
      };
    },
  });

  const STEP = {
    floor: { t: "⌊x⌋ (floor)", f: Math.floor, seg: (n) => [n, n + 1, n, true, false] },
    ceil: { t: "⌈x⌉ (ceiling)", f: Math.ceil, seg: (n) => [n, n + 1, n + 1, false, true] },
    round: { t: "round(x), halves up", f: (x) => Math.floor(x + 0.5), seg: (n) => [n - 0.5, n + 0.5, n, true, false] },
    frac: { t: "x − ⌊x⌋ (fractional part)", f: (x) => x - Math.floor(x), seg: null },
  };
  V.register("g01-step", {
    title: "Floor, ceiling and rounding", hint: "Drag the x slider and read all four values",
    setup(A, a) {
      let k = STEP[a.kind] ? a.kind : "floor";
      const P = A.plot({ x: [-5.5, 5.5], y: [-5.5, 5.5], h: 360 });
      A.select("Graph", Object.entries(STEP).map(([key, v]) => [key, v.t]), k, (v) => (k = v));
      const sx = A.slider("x", -4.9, 4.9, 0.1, a.x ?? 2.3);
      A.draw = () => {
        const x = Math.round(sx.v * 10) / 10, S = STEP[k];
        P.clear().grid().axes();
        const col = P.P.accent;
        P.fn((t) => t, { color: P.P.muted, dash: [5, 5], width: 1.2 });
        for (let n = -7; n <= 6; n++) {
          if (S.seg) { const [x1, x2, y, c1, c2] = S.seg(n); P.line(x1, y, x2, y, { color: col, width: 3 }); [[x1, c1], [x2, c2]].forEach(([xx, c]) => (c ? P.dot(xx, y, 5, { color: col }) : (P.dot(xx, y, 5, { color: P.P.bg }), P.ring(xx, y, 5, { color: col, width: 2 })))); }
          else { P.line(n, 0, n + 1, 1, { color: col, width: 3 }); P.dot(n, 0, 5, { color: col }); P.dot(n + 1, 1, 5, { color: P.P.bg }); P.ring(n + 1, 1, 5, { color: col, width: 2 }); }
        }
        const y = S.f(x + 1e-12 * 0) ; const yy = k === "frac" ? Math.round((x - Math.floor(x)) * 10) / 10 : y;
        P.line(x, 0, x, yy, { color: P.P.pink, width: 1.5, dash: [3, 3] }); P.dot(x, yy, 7, { color: P.P.pink, stroke: P.P.bg });
        const fl = Math.floor(x), ce = Math.ceil(x), ro = Math.floor(x + 0.5), fr = Math.round((x - fl) * 10) / 10;
        A.set(`${A.tex(`x = ${num(x)}`)} ${A.tex(`\\lfloor x\\rfloor = ${fl}`)} ${A.tex(`\\lceil x\\rceil = ${ce}`)} <span class="k">round</span> <b>${R(ro)}</b> <span class="k">fractional part</span> <b>${R(fr)}</b>${x < 0 && fl !== ce ? ' <span class="k">negative: the floor moves away from zero</span>' : ""}${fl === ce ? ' <span class="k">x is an integer, so floor = ceiling = x</span>' : ""}`);
      };
    },
  });
})();
