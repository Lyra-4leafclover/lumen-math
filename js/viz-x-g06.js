/* g06 widgets: Markov chains, ROC / confusion matrix, data explorer + bootstrap */
(function () {
  const V = window.Viz, { fmt, clamp, rng } = V.util;
  const R = (n, d = 2) => fmt(n, d);
  const erf = (x) => { const s = Math.sign(x); x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x); return s * (1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)); };
  const Phi = (z) => 0.5 * (1 + erf(z / Math.SQRT2));
  const npdf = (x, m = 0, s = 1) => Math.exp(-((x - m) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI));

  V.register("g06-markov", {
    title: "Markov chains and the stationary distribution", hint: "Pick a chain, then walk it",
    setup(A, a) {
      const CH = {
        "two-state": { names: ["A", "B"], pos: [[-1.6, 0], [1.6, 0]], M: null },
        weather: { names: ["Sunny", "Cloudy", "Rainy"], pos: [[-1.9, -0.9], [0, 1.3], [1.9, -0.9]], M: [[0.7, 0.2, 0.1], [0.3, 0.4, 0.3], [0.2, 0.4, 0.4]] },
        "web surfer": { names: ["Home", "Blog", "Shop"], pos: [[-1.9, -0.9], [0, 1.3], [1.9, -0.9]], M: [[0.1, 0.6, 0.3], [0.5, 0.2, 0.3], [0.8, 0.1, 0.1]] },
      };
      let ck = CH[a.chain] ? a.chain : "weather", cur = 0, visits = [], steps = 0, start = 0;
      const P = A.plot({ x: [-3, 3], y: [-1.6, 2.1], h: 280 }), Q = A.plot({ x: [-1, 26], y: [-0.05, 1.05], h: 190, equal: false });
      A.select("Chain", Object.keys(CH), ck, (v) => { ck = v; build(); reset(); });
      const box = document.createElement("div"); box.style.display = "contents"; A.ctl().appendChild(box);
      let sa = null, sb = null;
      const stSel = A.select("Start in state", [["0", "state 1"], ["1", "state 2"], ["2", "state 3"]], "0", (v) => { start = Math.min(+v, CH[ck].names.length - 1); reset(); });
      function build() { box.innerHTML = ""; sa = sb = null; if (ck === "two-state") { sa = A.slider("P(A → B)", 0, 1, 0.01, a.p ?? 0.3); sb = A.slider("P(B → A)", 0, 1, 0.01, a.q ?? 0.1); box.appendChild(sa.el.parentElement); box.appendChild(sb.el.parentElement); } }
      const M = () => { if (ck === "two-state") { const p = sa.v, q = sb.v; return [[1 - p, p], [q, 1 - q]]; } return CH[ck].M; };
      function reset() { const n = CH[ck].names.length; start = Math.min(start, n - 1); cur = start; visits = new Array(n).fill(0); visits[cur] = 1; steps = 0; }
      function step(k) { const T = M(); for (let s = 0; s < k; s++) { let u = Math.random(), j = 0; while (j < T[cur].length - 1 && u > T[cur][j]) { u -= T[cur][j]; j++; } cur = j; visits[cur]++; steps++; } }
      A.buttons([{ label: "Walk 1 step", on: () => step(1) }, { label: "Walk 500 steps", on: () => step(500) }, { label: "Reset walker", on: reset }]);
      build(); reset();
      const evolve = (T, v) => v.map((_, j) => v.reduce((s, vi, i) => s + vi * T[i][j], 0));
      A.draw = () => {
        const T = M(), c = CH[ck], n = c.names.length; let C = P.clear().P; const cols = [C.accent, C.pink, C.orange];
        let pi = new Array(n).fill(1 / n); for (let i = 0; i < 3000; i++) pi = evolve(T, pi);
        const conv = T.every((r, i) => Math.abs(r[i] - 1) < 1e-9);
        for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
          if (T[i][j] <= 0) continue; const [x1, y1] = c.pos[i], [x2, y2] = c.pos[j];
          if (i === j) { const up = y1 > 0.5, ox = up ? 0 : Math.sign(x1) * 0.62, oy = up ? 0.6 : 0; P.ring(x1 + ox, y1 + oy, 14, { color: C.muted, width: 1.5 }); P.text(R(T[i][j]), x1 + ox * 1.75, y1 + oy * 1.6, { dy: up ? 0 : 4, size: 12, color: C.ink2 }); continue; }
          const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy * 0.13, ny = ux * 0.13, r0 = 0.5;
          P.arrow(x1 + ux * r0 + nx, y1 + uy * r0 + ny, x2 - ux * r0 + nx, y2 - uy * r0 + ny, { color: C.muted, width: 1.5 + 3 * T[i][j], head: 10 });
          P.text(R(T[i][j]), (x1 + x2) / 2 + nx * 2.6, (y1 + y2) / 2 + ny * 2.6, { size: 12, color: C.ink2 });
        }
        c.pos.forEach(([x, y], i) => { P.circle(x, y, 0.45, { fill: cols[i], fa: i === cur ? 0.9 : 0.35, color: cols[i], width: i === cur ? 4 : 2 }); P.text(c.names[i], x, y, { dy: 5, size: 13 }); });
        let v = new Array(n).fill(0); v[start] = 1; const traj = [v]; for (let t = 1; t <= 25; t++) { v = evolve(T, v); traj.push(v); }
        C = Q.clear().grid(5, { stepY: 0.25 }).axes({ step: 5, stepY: 0.25 }).P;
        for (let i = 0; i < n; i++) { Q.line(0, pi[i], 25, pi[i], { color: cols[i], dash: [5, 4], width: 1.2 }); Q.poly(traj.map((w, t) => [t, w[i]]), { color: cols[i], width: 2.5 }); }
        Q.text("step t →", 25, 0, { dy: -6, align: "right", size: 11, color: C.muted });
        const tot = visits.reduce((s, x) => s + x, 0);
        A.set(`<span class="k">walker is in</span> <b>${c.names[cur]}</b> <span class="k">after</span> <b>${steps}</b> <span class="k">steps. Visit fractions:</span> <b>${visits.map((x, i) => c.names[i] + " " + R(x / tot, 3)).join(", ")}</b><br><span class="k">stationary π (dashed lines, solves π = πP):</span> <b>${pi.map((x, i) => c.names[i] + " " + R(x, 3)).join(", ")}</b> <span class="k">${conv ? "Some state never leaves itself, so the start matters." : "The curves show P(state at step t) from the chosen start; they forget the start and settle on π."}</span>`);
      };
      stSel;
    },
  });

  V.register("g06-roc", {
    title: "Thresholds, confusion matrix and the ROC curve", hint: "Move the threshold",
    setup(A, a) {
      const P = A.plot({ x: [-4, 7], y: [0, 0.48], h: 230, equal: false }), Q = A.plot({ x: [-0.05, 1.05], y: [-0.05, 1.08], h: 240, equal: false });
      const sep = A.slider("separation d", 0, 5, 0.05, a.d ?? 2), th = A.slider("threshold t", -3, 6, 0.05, a.t ?? 1), prev = A.slider("% positive", 1, 50, 1, a.prev ?? 10);
      A.draw = () => {
        const d = sep.v, t = th.v, N = 1000, pos = Math.round((N * prev.v) / 100), neg = N - pos;
        const tpr = 1 - Phi(t - d), fpr = 1 - Phi(t), TP = Math.round(pos * tpr), FN = pos - TP, FP = Math.round(neg * fpr), TN = neg - FP;
        let C = P.clear().P; const wn = neg / N, wp = pos / N, ym = Math.max(npdf(0) * wn, npdf(0) * wp) * 1.15; P.setView([-4, 7], [0, ym]); C = P.clear().P;
        P.area((x) => npdf(x) * wn, t, 7, { fill: C.orange, fa: 0.45 }); P.area((x) => npdf(x, d) * wp, t, 7, { fill: C.accent, fa: 0.55 });
        P.fn((x) => npdf(x) * wn, { color: C.orange, width: 2.5 }); P.fn((x) => npdf(x, d) * wp, { color: C.accent, width: 2.5 });
        P.line(t, 0, t, ym, { color: C.ink, width: 2 }); P.text("threshold", t, ym, { dy: 14, size: 11 });
        P.text("negatives", 0, npdf(0) * wn, { dy: -6, size: 11, color: C.orange }); P.text("positives", d, npdf(0) * wp, { dy: -6, size: 11, color: C.accent });
        C = Q.clear().grid(0.25).P; Q.rect(0, 0, 1, 1, { color: C.line2, width: 1 }); Q.line(0, 0, 1, 1, { color: C.muted, dash: [4, 4], width: 1 });
        Q.fn((x) => 1 - Phi(Phi_inv(1 - x) - d), { color: C.accent, width: 3, from: 0.0005, to: 0.9995 });
        Q.dot(fpr, tpr, 7, { color: C.pink, stroke: C.bg, sw: 2 }); Q.text("false positive rate →", 1, 0, { dy: -6, align: "right", size: 11, color: C.muted }); Q.text("true positive rate", 0, 1, { dx: 6, dy: 12, align: "left", size: 11, color: C.muted });
        const prec = TP + FP ? TP / (TP + FP) : NaN, rec = TP / Math.max(pos, 1), f1 = prec + rec ? (2 * prec * rec) / (prec + rec) : 0, auc = Phi(d / Math.SQRT2);
        A.set(`<span class="k">predict + when score > t. Of ${N} cases:</span> <b>TP ${TP}</b> · <b>FN ${FN}</b> · <b>FP ${FP}</b> · <b>TN ${TN}</b><br><span class="k">accuracy</span> <b>${R((TP + TN) / N, 3)}</b> <span class="k">precision</span> <b>${isNaN(prec) ? "—" : R(prec, 3)}</b> <span class="k">recall (TPR)</span> <b>${R(rec, 3)}</b> <span class="k">FPR</span> <b>${R(fpr, 3)}</b> <span class="k">F1</span> <b>${R(f1, 3)}</b> <span class="k">AUC</span> <b>${R(auc, 3)}</b> <span class="k">The pink dot is this threshold on the ROC curve; sliding t moves it along the curve.</span>`);
      };
      function Phi_inv(p) { let lo = -9, hi = 9; for (let i = 0; i < 50; i++) { const m = (lo + hi) / 2; Phi(m) < p ? (lo = m) : (hi = m); } return (lo + hi) / 2; }
    },
  });

  V.register("g06-data", {
    title: "Data explorer: center, spread and the bootstrap", hint: "Drag points, click to add",
    setup(A, a) {
      const PRE = { symmetric: [42, 45, 47, 48, 50, 50, 51, 52, 53, 55, 58], "right-skewed": [28, 31, 33, 35, 36, 38, 40, 42, 45, 52, 60, 75, 95], outlier: [40, 42, 45, 47, 50, 52, 55, 98], bimodal: [15, 18, 20, 22, 24, 70, 72, 75, 77, 80] };
      let pk = PRE[a.data] ? a.data : "right-skewed", xs = PRE[pk].slice(), mode = a.mode === "bootstrap" ? "boot" : "desc", stat = "mean", boots = [], last = null;
      const P = A.plot({ x: [0, 100], y: [-1.1, 1.3], h: 240, equal: false }), Q = A.plot({ x: [0, 100], y: [0, 1], h: 170, equal: false });
      A.select("Data set", Object.keys(PRE), pk, (v) => { pk = v; xs = PRE[v].slice(); clearB(); });
      A.seg([["desc", "Describe"], ["boot", "Bootstrap"]], mode, (v) => (mode = v));
      A.seg([["mean", "statistic: mean"], ["median", "statistic: median"]], stat, (v) => { stat = v; clearB(); });
      const clearB = () => { boots = []; last = null; };
      const resample = () => { const n = xs.length, cnt = new Array(n).fill(0), s = []; for (let i = 0; i < n; i++) { const j = Math.floor(Math.random() * n); cnt[j]++; s.push(xs[j]); } boots.push(S(s)); last = cnt; };
      A.buttons([{ label: "1 resample", on: () => { mode = "boot"; resample(); } }, { label: "1000 resamples", on: () => { mode = "boot"; for (let i = 0; i < 1000; i++) resample(); } }, { label: "Remove last point", on: () => { if (xs.length > 2) xs.pop(); clearB(); } }]);
      const sorted = (v) => v.slice().sort((p, q) => p - q);
      const med = (v) => { const s = sorted(v), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
      const mean = (v) => v.reduce((p, q) => p + q, 0) / v.length;
      const S = (v) => (stat === "mean" ? mean(v) : med(v));
      const quart = (v) => { const s = sorted(v), n = s.length, h = Math.floor(n / 2); return [med(s.slice(0, h)), med(s), med(s.slice(n - h))]; };
      for (let i = 0; i < 30; i++) P.handle(() => [i < xs.length ? xs[i] : -999, lane(i)], (x) => { if (i < xs.length) { xs[i] = Math.round(clamp(x, 0, 100)); clearB(); } }, { hidden: () => i >= xs.length });
      const lane = (i) => 0.15 + (i % 4) * 0.25;
      P.onClick = (x, y) => { if (y > -0.05 && xs.length < 30) { xs.push(Math.round(clamp(x, 0, 100))); clearB(); A.draw(); } };
      A.draw = () => {
        const n = xs.length, m = mean(xs), md = med(xs), sd = Math.sqrt(xs.reduce((s, x) => s + (x - m) ** 2, 0) / (n - 1)), [q1, , q3] = quart(xs), iqr = q3 - q1, lf = q1 - 1.5 * iqr, uf = q3 + 1.5 * iqr;
        let C = P.clear().grid(10, { stepY: 10 }).P;
        for (let x = 0; x <= 100; x += 10) P.text(String(x), x, -1.1, { dy: -4, size: 10, color: C.muted });
        P.rect(m - sd, 0.02, 2 * sd, 1.0, { fill: C.accent, fa: 0.1, color: "none" });
        P.line(m, 0, m, 1.1, { color: C.accent, width: 2.5 }); P.text("mean " + R(m, 1), m, 1.1, { dy: -4, size: 11, color: C.accent });
        P.line(md, 0, md, 1.1, { color: C.green, width: 2.5, dash: [6, 4] }); P.text("median " + R(md, 1), md, 1.1, { dy: 12, size: 11, color: C.green });
        const inl = xs.filter((x) => x >= lf && x <= uf), lo = Math.min(...inl), hi = Math.max(...inl);
        P.rect(q1, -0.75, q3 - q1, 0.45, { fill: C.orange, fa: 0.25, color: C.orange }); P.line(md, -0.75, md, -0.3, { color: C.green, width: 3 });
        P.line(lo, -0.525, q1, -0.525, { color: C.orange, width: 2 }); P.line(q3, -0.525, hi, -0.525, { color: C.orange, width: 2 }); P.line(lo, -0.65, lo, -0.4, { color: C.orange }); P.line(hi, -0.65, hi, -0.4, { color: C.orange });
        P.text("box plot", 0, -0.2, { align: "left", dx: 4, size: 10, color: C.muted });
        xs.forEach((x, i) => { const out = x < lf || x > uf, k = mode === "boot" && last ? last[i] : null; P.dot(x, lane(i), 7, { color: out ? C.bad : C.pink, alpha: k === 0 ? 0.25 : 1, stroke: C.bg, sw: 2 }); if (out) P.dot(x, -0.525, 4, { color: C.bad }); if (k > 1) P.text("×" + k, x, lane(i), { dy: -10, size: 11 }); });
        if (mode === "boot") {
          const B = 40, hist = new Array(B).fill(0); boots.forEach((v) => hist[clamp(Math.floor(v / 2.5), 0, B - 1)]++); const mx = Math.max(1, ...hist);
          Q.setView([0, 100], [0, mx * 1.2]); C = Q.clear().P; hist.forEach((c, i) => c && Q.rect(i * 2.5, 0, 2.3, c, { fill: C.accent, fa: 0.7, color: "none" }));
          for (let x = 0; x <= 100; x += 10) Q.text(String(x), x, 0, { dy: -3, size: 10, color: C.muted });
          let txt = `<span class="k">${boots.length} bootstrap ${stat}s so far.</span>`;
          if (boots.length >= 20) { const b = sorted(boots), bm = mean(b), se = Math.sqrt(b.reduce((s, v) => s + (v - bm) ** 2, 0) / (b.length - 1)), lo2 = b[Math.floor(0.025 * (b.length - 1))], hi2 = b[Math.ceil(0.975 * (b.length - 1))]; Q.rect(lo2, 0, hi2 - lo2, mx * 1.15, { fill: C.green, fa: 0.12, color: C.green }); txt += ` <span class="k">bootstrap SE</span> <b>${R(se, 2)}</b> ${stat === "mean" ? `<span class="k">(formula s/√n =</span> <b>${R(sd / Math.sqrt(n), 2)}</b><span class="k">)</span>` : ""} <span class="k">95% percentile interval (green)</span> <b>[${R(lo2, 1)}, ${R(hi2, 1)}]</b>`; }
          A.set(txt + ` <span class="k">Faded dots were left out of the last resample; ×k marks repeats.</span>`);
        } else {
          Q.setView([0, 100], [0, 1]); C = Q.clear().P; const bw = 10, hist = new Array(10).fill(0); xs.forEach((x) => hist[clamp(Math.floor(x / bw), 0, 9)]++); const mx = Math.max(...hist); Q.setView([0, 100], [0, mx * 1.25]); C = Q.clear().P;
          hist.forEach((c, i) => c && (Q.rect(i * bw + 0.5, 0, bw - 1, c, { fill: C.pink, fa: 0.55, color: "none" }), Q.text(String(c), i * bw + bw / 2, c, { dy: -4, size: 11 })));
          Q.text("histogram (bins of 10)", 100, mx * 1.2, { align: "right", dy: 10, size: 10, color: C.muted });
          A.set(`<span class="k">n</span> <b>${n}</b> <span class="k">mean</span> <b>${R(m, 2)}</b> <span class="k">median</span> <b>${R(md, 2)}</b> <span class="k">SD s</span> <b>${R(sd, 2)}</b> <span class="k">Q1</span> <b>${R(q1, 2)}</b> <span class="k">Q3</span> <b>${R(q3, 2)}</b> <span class="k">IQR</span> <b>${R(iqr, 2)}</b> <span class="k">range</span> <b>${Math.max(...xs) - Math.min(...xs)}</b> <span class="k">outliers (red) lie beyond 1.5×IQR from the box.</span>`);
        }
      };
    },
  });
})();
