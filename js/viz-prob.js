/* Probability, statistics, information theory visuals */
(function () {
  const V = window.Viz, { fmt, clamp, rng, gauss } = V.util;
  const R = (n, d = 2) => fmt(n, d);
  const lgam = (z) => { const g = 7, c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]; if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lgam(1 - z); z -= 1; let x = c[0]; for (let i = 1; i < 9; i++) x += c[i] / (z + i); const t = z + g + 0.5; return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x); };
  const choose = (n, k) => Math.exp(lgam(n + 1) - lgam(k + 1) - lgam(n - k + 1));
  const erf = (x) => { const s = Math.sign(x); x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x); return s * (1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)); };
  const Phi = (z) => 0.5 * (1 + erf(z / Math.SQRT2));
  const npdf = (x, m = 0, s = 1) => Math.exp(-((x - m) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI));
  V.util.stats = { choose, Phi, npdf, lgam };

  function bars(P, xs, ps, C, o = {}) { const w = o.w || 0.8; xs.forEach((x, i) => P.rect(x - w / 2, 0, w, ps[i], { fill: o.hl && o.hl(x) ? C.pink : o.color || C.accent, fa: 0.75, color: "none" })); }

  V.register("distribution", {
    title: "Probability distributions", hint: "Pick a distribution and tune it",
    setup(A, a) {
      const D = {
        normal: { p: { "μ": [-3, 3, 0.1, 0], "σ": [0.3, 3, 0.05, 1] }, c: true, x: [-8, 8], f: (x, p) => npdf(x, p["μ"], p["σ"]), m: (p) => [p["μ"], p["σ"] ** 2], cdf: (x, p) => Phi((x - p["μ"]) / p["σ"]) },
        uniform: { p: { a: [-4, 2, 0.1, -1], b: [-2, 6, 0.1, 3] }, c: true, x: [-6, 8], f: (x, p) => (x >= p.a && x <= p.b ? 1 / (p.b - p.a) : 0), m: (p) => [(p.a + p.b) / 2, (p.b - p.a) ** 2 / 12] },
        exponential: { p: { "λ": [0.2, 4, 0.05, 1] }, c: true, x: [-0.5, 8], f: (x, p) => (x < 0 ? 0 : p["λ"] * Math.exp(-p["λ"] * x)), m: (p) => [1 / p["λ"], 1 / p["λ"] ** 2], cdf: (x, p) => (x < 0 ? 0 : 1 - Math.exp(-p["λ"] * x)) },
        beta: { p: { "α": [0.5, 10, 0.1, 2], "β": [0.5, 10, 0.1, 5] }, c: true, x: [-0.1, 1.1], f: (x, p) => (x <= 0 || x >= 1 ? 0 : Math.exp((p["α"] - 1) * Math.log(x) + (p["β"] - 1) * Math.log(1 - x) + lgam(p["α"] + p["β"]) - lgam(p["α"]) - lgam(p["β"]))), m: (p) => { const s = p["α"] + p["β"]; return [p["α"] / s, (p["α"] * p["β"]) / (s * s * (s + 1))]; } },
        binomial: { p: { n: [1, 40, 1, 10], p: [0.01, 0.99, 0.01, 0.5] }, c: false, x: [-1, 41], f: (k, p) => (k > p.n ? 0 : choose(p.n, k) * p.p ** k * (1 - p.p) ** (p.n - k)), m: (p) => [p.n * p.p, p.n * p.p * (1 - p.p)] },
        poisson: { p: { "λ": [0.2, 20, 0.1, 4] }, c: false, x: [-1, 30], f: (k, p) => Math.exp(k * Math.log(p["λ"]) - p["λ"] - lgam(k + 1)), m: (p) => [p["λ"], p["λ"]] },
        geometric: { p: { p: [0.05, 0.95, 0.01, 0.3] }, c: false, x: [0, 20], f: (k, p) => (k < 1 ? 0 : (1 - p.p) ** (k - 1) * p.p), m: (p) => [1 / p.p, (1 - p.p) / p.p ** 2] },
      };
      let k = a.kind || "normal", sl = {};
      const P = A.plot({ x: D[k].x, y: [0, 1], h: 320, equal: false });
      const ctl = A.ctl(); const sel = A.select("Distribution", Object.keys(D), k, (v) => { k = v; build(); });
      const box = document.createElement("div"); box.style.display = "contents"; ctl.appendChild(box);
      const lo = A.slider("shade from", -8, 40, 0.1, a.lo ?? -1), hi = A.slider("shade to", -8, 40, 0.1, a.hi ?? 1);
      function build() { box.innerHTML = ""; sl = {}; const d = D[k]; const tmp = A.ctl(); for (const [n, [mn, mx, st, v]] of Object.entries(d.p)) { sl[n] = A.slider(n, mn, mx, st, a[n] ?? v); box.appendChild(sl[n].el.parentElement); } P.setView(d.x, [0, 1]); }
      build(); sel;
      A.draw = () => {
        const d = D[k], p = {}; for (const n in sl) p[n] = sl[n].v; let ymax = 0;
        if (d.c) { for (let i = 0; i <= 200; i++) { const x = d.x[0] + ((d.x[1] - d.x[0]) * i) / 200; ymax = Math.max(ymax, d.f(x, p)); } } else for (let x = 0; x <= d.x[1]; x++) ymax = Math.max(ymax, d.f(x, p));
        P.setView(d.x, [-ymax * 0.05, Math.min(ymax * 1.15, 12)]);
        const C = P.clear().P; P.grid((d.x[1] - d.x[0]) > 20 ? 5 : 1, { stepY: Math.pow(10, Math.floor(Math.log10(ymax || 1))) / 2 }).axes({ labels: true, step: (d.x[1] - d.x[0]) > 20 ? 5 : 1, stepY: Math.pow(10, Math.floor(Math.log10(ymax || 1))) / 2 });
        let pr = 0;
        if (d.c) { P.area((x) => d.f(x, p), lo.v, Math.max(lo.v, hi.v), { fill: C.pink, fa: 0.35 }); P.fn((x) => d.f(x, p), { color: C.accent, width: 3, n: 800 }); const n = 400, w = (hi.v - lo.v) / n; for (let i = 0; i < n; i++) pr += d.f(lo.v + (i + 0.5) * w, p) * w; }
        else { const xs = [], ps = []; for (let x = 0; x <= d.x[1]; x++) { xs.push(x); ps.push(d.f(x, p)); if (x >= lo.v && x <= hi.v) pr += d.f(x, p); } bars(P, xs, ps, C, { hl: (x) => x >= lo.v && x <= hi.v }); }
        const [mu, vr] = d.m(p); P.line(mu, 0, mu, ymax * 1.1, { color: C.orange, width: 2, dash: [5, 4] });
        A.set(`<span class="k">mean (dashed)</span> <b>${R(mu, 3)}</b> <span class="k">variance</span> <b>${R(vr, 3)}</b> <span class="k">std dev</span> <b>${R(Math.sqrt(vr), 3)}</b> <span class="k">${d.c ? "P(" + R(lo.v) + " ≤ X ≤ " + R(hi.v) + ") = pink area =" : "P(" + R(Math.ceil(lo.v)) + " ≤ X ≤ " + R(Math.floor(hi.v)) + ") = pink bars ="}</span> <b>${R(Math.max(0, pr), 4)}</b>`);
      };
    },
  });

  V.register("lln", {
    title: "Law of large numbers", hint: "Flip lots of coins",
    setup(A, a) {
      const P = A.plot({ x: [0, 1000], y: [0, 1], h: 300, equal: false }); let runs = [], N = 1000;
      const p = A.slider("true P(heads)", 0.05, 0.95, 0.01, a.p ?? 0.5);
      const go = () => { runs = []; for (let r = 0; r < 5; r++) { let h = 0; const s = []; for (let i = 1; i <= N; i++) { h += Math.random() < p.v ? 1 : 0; s.push(h / i); } runs.push(s); } };
      A.buttons([{ label: "Flip 1000 × 5 runs", on: go }]); go();
      A.draw = () => {
        const C = P.clear().grid(100, { stepY: 0.1 }).axes({ step: 100, stepY: 0.1, every: 2 }).P, cols = [C.accent, C.pink, C.orange, C.green, C.blue];
        P.line(0, p.v, N, p.v, { color: C.ink, dash: [6, 4], width: 1.5 });
        runs.forEach((s, j) => P.poly(s.map((v, i) => [i + 1, v]), { color: cols[j], width: 1.8 }));
        A.set(`<span class="k">After 10 flips the runs are all over the place; after 1000 they hug</span> <b>${R(p.v)}</b>. <span class="k">Final averages:</span> <b>${runs.map((s) => R(s[N - 1], 3)).join(", ")}</b> <span class="k">Spread shrinks like 1/√n.</span>`);
      };
      A.draw.p = p;
      p.el.addEventListener("input", go);
    },
  });

  V.register("clt", {
    title: "Central limit theorem", hint: "Increase the sample size n",
    setup(A, a) {
      const S = { uniform: () => Math.random(), exponential: () => -Math.log(1 - Math.random()), "coin (0/1)": () => (Math.random() < 0.5 ? 0 : 1), "skewed die": () => [1, 1, 1, 2, 6, 6][Math.floor(Math.random() * 6)], bimodal: () => (Math.random() < 0.5 ? 0.1 : 0.9) + (Math.random() - 0.5) * 0.15 };
      const M = { uniform: [0.5, 1 / 12], exponential: [1, 1], "coin (0/1)": [0.5, 0.25], "skewed die": [17 / 6, 0], bimodal: [0.5, 0] };
      let sk = a.src || "exponential", means = [];
      const P = A.plot({ x: [0, 1], y: [0, 1], h: 300, equal: false }), Q = A.plot({ x: [0, 1], y: [0, 1], h: 120, equal: false });
      A.select("Population", Object.keys(S), sk, (v) => { sk = v; sim(); });
      const n = A.slider("sample size n", 1, 60, 1, a.n ?? 2, () => sim());
      function sim() { means = []; for (let i = 0; i < 4000; i++) { let s = 0; for (let j = 0; j < n.v; j++) s += S[sk](); means.push(s / n.v); } }
      A.buttons([{ label: "Resample", on: sim }]); sim();
      A.draw = () => {
        const pop = Array.from({ length: 4000 }, S[sk]); const lo = Math.min(...pop), hi = Math.max(...pop), pad = (hi - lo) * 0.05 + 0.01;
        const B = 50, hist = (arr) => { const h = new Array(B).fill(0); arr.forEach((v) => { h[clamp(Math.floor(((v - lo + pad) / (hi - lo + 2 * pad)) * B), 0, B - 1)]++; }); return h; };
        const w = (hi - lo + 2 * pad) / B, H1 = hist(pop), H2 = hist(means);
        Q.setView([lo - pad, hi + pad], [0, Math.max(...H1) * 1.1]); let C = Q.clear().P; Q.text("population", lo - pad, Math.max(...H1), { align: "left", dx: 8, dy: 6, color: C.muted, size: 11 });
        H1.forEach((c, i) => Q.rect(lo - pad + i * w, 0, w * 0.92, c, { fill: C.muted, fa: 0.5, color: "none" }));
        const mx = Math.max(...H2); P.setView([lo - pad, hi + pad], [0, mx * 1.15]); C = P.clear().P;
        H2.forEach((c, i) => P.rect(lo - pad + i * w, 0, w * 0.92, c, { fill: C.accent, fa: 0.7, color: "none" }));
        const mu = means.reduce((s, v) => s + v, 0) / means.length, sd = Math.sqrt(means.reduce((s, v) => s + (v - mu) ** 2, 0) / means.length);
        P.fn((x) => npdf(x, mu, sd) * means.length * w, { color: C.pink, width: 2.5 });
        A.set(`<span class="k">4000 sample means, each of n =</span> <b>${n.v}</b> <span class="k">draws. Mean</span> <b>${R(mu, 3)}</b> <span class="k">SD</span> <b>${R(sd, 3)}</b> <span class="k">Pink = normal curve. Whatever the population's shape, the means turn bell-shaped as n grows, with SD = σ/√n.</span>`);
      };
    },
  });

  V.register("bayes", {
    title: "Bayes' theorem as areas", hint: "Change the base rate and test accuracy",
    setup(A, a) {
      const P = A.plot({ x: [0, 1], y: [0, 1], h: 300, equal: false });
      const pr = A.slider("prior P(disease)", 0.001, 0.5, 0.001, a.prior ?? 0.01), se = A.slider("sensitivity P(+|D)", 0.5, 1, 0.005, 0.95), sp = A.slider("specificity P(−|¬D)", 0.5, 1, 0.005, 0.9);
      A.draw = () => {
        const C = P.clear().P, w = Math.max(pr.v, 0.012);
        P.rect(0, 0, w, se.v, { fill: C.bad, fa: 0.85, color: "none" }); P.rect(0, se.v, w, 1 - se.v, { fill: C.bad, fa: 0.2, color: "none" });
        P.rect(w, 0, 1 - w, 1 - sp.v, { fill: C.orange, fa: 0.7, color: "none" }); P.rect(w, 1 - sp.v, 1 - w, sp.v, { fill: C.good, fa: 0.15, color: "none" });
        P.line(w, 0, w, 1, { color: C.ink, width: 2 });
        P.text("sick", w / 2, 1, { dy: 18, size: 11, color: C.ink }); P.text("healthy & test −", (1 + w) / 2, 0.6, { color: C.good }); P.text("healthy but test + (false positives)", (1 + w) / 2, (1 - sp.v) / 2, { color: C.ink, size: 12 });
        const tp = pr.v * se.v, fp = (1 - pr.v) * (1 - sp.v), post = tp / (tp + fp);
        A.set(`${A.tex(`P(D\\mid +) = \\frac{P(+\\mid D)P(D)}{P(+)} = \\frac{${R(tp, 4)}}{${R(tp, 4)} + ${R(fp, 4)}} = ${R(post, 4)}`)} <span class="k">Of everyone who tests positive, only</span> <b>${R(post * 100, 1)}%</b> <span class="k">are sick. Red sliver (true +) vs orange block (false +).</span>`);
      };
    },
  });

  V.register("venn", {
    title: "Events and the addition rule", hint: "Move the sliders",
    setup(A) {
      const P = A.plot({ x: [-3, 3], y: [-1.8, 1.8], h: 280 }), pa = A.slider("P(A)", 0.05, 0.7, 0.01, 0.4), pb = A.slider("P(B)", 0.05, 0.7, 0.01, 0.3), pab = A.slider("P(A ∩ B)", 0, 0.7, 0.01, 0.12);
      let show = "union"; A.seg([["union", "A ∪ B"], ["inter", "A ∩ B"], ["cond", "A | B"], ["comp", "Aᶜ"]], show, (v) => (show = v));
      A.draw = () => {
        const C = P.clear().P, ab = Math.min(pab.v, pa.v, pb.v), ra = Math.sqrt(pa.v) * 1.6, rb = Math.sqrt(pb.v) * 1.6, d = (ra + rb) * (1 - ab / Math.min(pa.v, pb.v)) * 0.95 + Math.abs(ra - rb) * (ab / Math.min(pa.v, pb.v));
        P.rect(-2.9, -1.7, 5.8, 3.4, { fill: show === "comp" ? C.accent : C.bg2, fa: show === "comp" ? 0.25 : 0.5, color: C.line2 });
        const ca = [-d / 2, 0], cb = [d / 2, 0];
        P.circle(...ca, ra, { fill: show === "comp" ? C.bg : show === "union" || show === "inter" ? C.pink : C.pink, fa: show === "comp" ? 1 : show === "inter" || show === "cond" ? 0.15 : 0.45, color: C.pink, width: 2 });
        P.circle(...cb, rb, { fill: C.blue, fa: show === "union" ? 0.45 : show === "cond" ? 0.3 : 0.12, color: C.blue, width: 2 });
        P.text("A", ca[0] - ra * 0.5, 0, { color: C.pink, size: 16 }); P.text("B", cb[0] + rb * 0.5, 0, { color: C.blue, size: 16 }); P.text("S", -2.75, 1.5, { color: C.muted });
        const u = pa.v + pb.v - ab;
        const msg = { union: `${A.tex(`P(A\\cup B) = P(A) + P(B) - P(A\\cap B) = ${R(pa.v)} + ${R(pb.v)} - ${R(ab)} = ${R(u)}`)}`, inter: `${A.tex(`P(A\\cap B) = ${R(ab)}`)} <span class="k">${Math.abs(ab - pa.v * pb.v) < 0.005 ? "= P(A)P(B): independent!" : "≠ P(A)P(B) = " + R(pa.v * pb.v) + ", so A and B are dependent"}</span>`, cond: `${A.tex(`P(A\\mid B) = \\frac{P(A\\cap B)}{P(B)} = ${R(ab / pb.v, 3)}`)} <span class="k">B becomes the new universe</span>`, comp: `${A.tex(`P(A^c) = 1 - P(A) = ${R(1 - pa.v)}`)}` };
        A.set(msg[show]);
      };
    },
  });

  V.register("mle", {
    title: "Maximum likelihood for a coin", hint: "Set the data, slide θ",
    setup(A) {
      const P = A.plot({ x: [0, 1], y: [0, 1], h: 300, equal: false }), h = A.slider("heads observed", 0, 20, 1, 7), n = A.slider("total flips", 1, 20, 1, 10), th = A.slider("θ = P(heads)", 0.01, 0.99, 0.01, 0.5);
      let logm = false; A.seg([["lik", "Likelihood"], ["log", "Log-likelihood"]], "lik", (v) => (logm = v === "log"));
      A.draw = () => {
        const H = Math.min(h.v, n.v), N = n.v, L = (t) => (logm ? H * Math.log(t) + (N - H) * Math.log(1 - t) : t ** H * (1 - t) ** (N - H)), best = H / N;
        let ymax = -Infinity, ymin = Infinity; for (let i = 1; i < 100; i++) { const v = L(i / 100); ymax = Math.max(ymax, v); ymin = Math.min(ymin, v); }
        P.setView([0, 1], logm ? [Math.max(ymin, ymax - 15), ymax + 1] : [0, ymax * 1.15]);
        const C = P.clear().P; P.grid(0.1, { stepY: (P.y1 - P.y0) / 5 }); P.fn(L, { color: C.accent, width: 3, from: 0.001, to: 0.999 });
        P.line(best, P.y0, best, P.y1, { color: C.green, dash: [5, 4], width: 2 }); P.dot(th.v, L(th.v), 6, { color: C.pink });
        for (let i = 0; i <= 10; i++) P.text(R(i / 10, 1), i / 10, P.y0, { dy: -4, size: 10, color: C.muted });
        A.set(`${A.tex(`L(\\theta) = \\theta^{${H}}(1-\\theta)^{${N - H}}`)} <span class="k">at θ = ${R(th.v)}:</span> <b>${logm ? R(L(th.v), 3) : L(th.v).toExponential(3)}</b> <span class="k">peak (green) at</span> ${A.tex(`\\hat\\theta = \\tfrac{${H}}{${N}} = ${R(best, 3)}`)} <span class="k">— log doesn't move the peak.</span>`);
      };
    },
  });

  V.register("ci", {
    title: "What a 95% confidence interval means", hint: "Draw 100 samples",
    setup(A) {
      const P = A.plot({ x: [-1, 1], y: [0, 101], h: 380, equal: false }), n = A.slider("sample size n", 5, 200, 1, 25), cl = A.slider("confidence z", 1, 3, 0.01, 1.96); let ivs = [];
      const go = () => { ivs = []; for (let k = 0; k < 100; k++) { let s = 0, ss = 0; for (let i = 0; i < n.v; i++) { const x = gauss(); s += x; ss += x * x; } const m = s / n.v, sd = Math.sqrt((ss - n.v * m * m) / (n.v - 1)); ivs.push([m, sd / Math.sqrt(n.v)]); } };
      A.buttons([{ label: "Draw 100 new samples", on: go }]); go(); n.el.addEventListener("input", go);
      A.draw = () => {
        const C = P.clear().P; let hit = 0; P.line(0, 0, 0, 101, { color: C.ink, width: 2, dash: [5, 4] });
        ivs.forEach(([m, se], i) => { const lo = m - cl.v * se, hi = m + cl.v * se, ok = lo <= 0 && hi >= 0; hit += ok; P.line(lo, i + 1, hi, i + 1, { color: ok ? C.accent : C.bad, width: ok ? 1.6 : 2.6 }); P.dot(m, i + 1, 1.8, { color: ok ? C.accent : C.bad }); });
        A.set(`<b>${hit}</b><span class="k">/100 intervals caught the true mean μ = 0 (dashed). Expected ≈</span> <b>${R(100 * (2 * Phi(cl.v) - 1), 1)}</b>. <span class="k">The interval is random; μ is fixed. Bigger n → narrower intervals, same coverage.</span>`);
      };
    },
  });

  V.register("hypothesis", {
    title: "p-values and significance", hint: "Move the observed statistic",
    setup(A) {
      const P = A.plot({ x: [-4.5, 4.5], y: [-0.02, 0.45], h: 280, equal: false }), z = A.slider("observed z", -4, 4, 0.01, 2.1), al = A.slider("α", 0.001, 0.2, 0.001, 0.05); let two = true;
      A.seg([["two", "Two-sided"], ["one", "One-sided (>)"]], "two", (v) => (two = v === "two"));
      A.draw = () => {
        const C = P.clear().P, zc = two ? -inv(al.v / 2) : -inv(al.v), p = two ? 2 * (1 - Phi(Math.abs(z.v))) : 1 - Phi(z.v);
        P.line(-5, 0, 5, 0, { color: C.muted, width: 1 });
        P.area((x) => npdf(x), zc, 4.5, { fill: C.orange, fa: 0.2 }); if (two) P.area((x) => npdf(x), -4.5, -zc, { fill: C.orange, fa: 0.2 });
        if (two) { P.area((x) => npdf(x), Math.abs(z.v), 4.5, { fill: C.pink, fa: 0.55 }); P.area((x) => npdf(x), -4.5, -Math.abs(z.v), { fill: C.pink, fa: 0.55 }); } else P.area((x) => npdf(x), z.v, 4.5, { fill: C.pink, fa: 0.55 });
        P.fn((x) => npdf(x), { color: C.accent, width: 3 }); P.line(z.v, 0, z.v, 0.42, { color: C.ink, width: 2 }); P.text("observed", z.v, 0.42, { dy: -4, size: 11 });
        for (let i = -4; i <= 4; i++) P.text(String(i), i, 0, { dy: 14, size: 10, color: C.muted });
        A.set(`<span class="k">p-value (pink)</span> <b>${R(p, 4)}</b> <span class="k">rejection region (orange) beyond</span> <b>±${R(zc, 2)}</b> ${p < al.v ? `<b style="color:var(--bad)">p < α → reject H₀</b>` : `<b style="color:var(--good)">p ≥ α → fail to reject H₀</b>`} <span class="k">p = P(data at least this extreme | H₀ true)</span>`);
      };
      function inv(p) { let lo = -8, hi = 8; for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; Phi(m) < p ? (lo = m) : (hi = m); } return (lo + hi) / 2; }
    },
  });

  V.register("entropy", {
    title: "Entropy, cross-entropy and KL divergence", hint: "Reshape p and q",
    setup(A) {
      const P = A.plot({ x: [-0.5, 3.5], y: [0, 1], h: 260, equal: false });
      const p = [0.5, 0.25, 0.15, 0.1], q = [0.25, 0.25, 0.25, 0.25];
      const sp = [0, 1, 2, 3].map((i) => A.slider(`p${i + 1}`, 0.01, 1, 0.01, p[i], (v) => (p[i] = v))), sq = [0, 1, 2, 3].map((i) => A.slider(`q${i + 1}`, 0.01, 1, 0.01, q[i], (v) => (q[i] = v)));
      A.draw = () => {
        const C = P.clear().P, sP = p.reduce((a, b) => a + b), sQ = q.reduce((a, b) => a + b), pp = p.map((v) => v / sP), qq = q.map((v) => v / sQ);
        pp.forEach((v, i) => { P.rect(i - 0.36, 0, 0.34, v, { fill: C.accent, fa: 0.8, color: "none" }); P.rect(i + 0.02, 0, 0.34, qq[i], { fill: C.orange, fa: 0.8, color: "none" }); P.text("x" + (i + 1), i, 0, { dy: -4, size: 11, color: C.bg, halo: false }); });
        const H = -pp.reduce((s, v) => s + v * Math.log2(v), 0), CE = -pp.reduce((s, v, i) => s + v * Math.log2(qq[i]), 0);
        A.set(`<span class="k">purple = true p, orange = model q (both normalized)</span> ${A.tex(`H(p) = ${R(H, 3)}\\text{ bits}`)} ${A.tex(`H(p,q) = ${R(CE, 3)}`)} ${A.tex(`D_{KL}(p\\|q) = H(p,q) - H(p) = ${R(CE - H, 3)}`)} <span class="k">KL is 0 only when q = p</span>`);
      };
    },
  });

  V.register("binary-entropy", {
    title: "Entropy of a coin", hint: "Slide p",
    setup(A) {
      const P = A.plot({ x: [-0.05, 1.05], y: [-0.05, 1.1], h: 260, equal: false }), p = A.slider("P(heads)", 0.001, 0.999, 0.001, 0.2);
      A.draw = () => {
        const C = P.clear().grid(0.1).P, H = (x) => -x * Math.log2(x) - (1 - x) * Math.log2(1 - x);
        P.fn(H, { color: C.accent, width: 3, from: 0.0005, to: 0.9995 }); P.dot(p.v, H(p.v), 6, { color: C.pink });
        for (let i = 0; i <= 10; i += 2) P.text(R(i / 10, 1), i / 10, 0, { dy: 14, size: 10, color: C.muted });
        A.set(`${A.tex(`H(${R(p.v, 3)}) = ${R(H(p.v), 4)}\\text{ bits}`)} <span class="k">Max surprise (1 bit) at a fair coin; a sure thing carries no information.</span> <span class="k">surprise of heads:</span> ${A.tex(`-\\log_2 p = ${R(-Math.log2(p.v), 3)}`)}`);
      };
    },
  });

  V.register("sigmoid", {
    title: "Sigmoid, logits and softmax", hint: "Move the logits",
    setup(A) {
      const P = A.plot({ x: [-6, 6], y: [-0.1, 1.1], h: 220, equal: false }), Q = A.plot({ x: [-0.5, 3.5], y: [0, 1.05], h: 180, equal: false });
      const z = [2, 1, 0.1, -1].map((v, i) => A.slider(`z${i + 1}`, -5, 5, 0.1, v)), T = A.slider("temperature T", 0.1, 5, 0.05, 1);
      A.draw = () => {
        let C = P.clear().grid(1, { stepY: 0.25 }).axes({ stepY: 0.25 }).P; const s = (x) => 1 / (1 + Math.exp(-x));
        P.fn(s, { color: C.accent, width: 3 }); P.dot(z[0].v, s(z[0].v), 6, { color: C.pink }); P.line(-6, 0.5, 6, 0.5, { color: C.muted, dash: [4, 4], width: 1 });
        const e = z.map((q) => Math.exp(q.v / T.v)), S = e.reduce((a, b) => a + b), sm = e.map((v) => v / S);
        C = Q.clear().P; const cols = [C.pink, C.blue, C.orange, C.green];
        sm.forEach((v, i) => { Q.rect(i - 0.35, 0, 0.7, v, { fill: cols[i], fa: 0.8, color: "none" }); Q.text(R(v, 3), i, v, { dy: -6, size: 12 }); });
        A.set(`${A.tex(`\\sigma(z_1) = \\frac{1}{1+e^{-${R(z[0].v)}}} = ${R(s(z[0].v), 3)}`)} <span class="k">softmax</span> ${A.tex(`\\frac{e^{z_i/T}}{\\sum_j e^{z_j/T}}`)} <span class="k">sums to 1. Low T → winner-take-all, high T → uniform.</span>`);
      };
    },
  });

  V.register("scatter-corr", {
    title: "Covariance and correlation", hint: "Change the correlation",
    setup(A) {
      const P = A.plot({ x: [-3.5, 3.5], y: [-3.2, 3.2], h: 320 }), rho = A.slider("ρ", -1, 1, 0.01, 0.6), r = rng(11), base = Array.from({ length: 200 }, () => [gauss(r), gauss(r)]);
      A.draw = () => {
        const C = P.clear().grid().axes().P, pts = base.map(([a, b]) => [a, rho.v * a + Math.sqrt(1 - rho.v ** 2) * b]);
        const n = pts.length, mx = pts.reduce((s, p) => s + p[0], 0) / n, my = pts.reduce((s, p) => s + p[1], 0) / n; let cxy = 0, cx = 0, cy = 0;
        pts.forEach(([x, y]) => { cxy += (x - mx) * (y - my); cx += (x - mx) ** 2; cy += (y - my) ** 2; P.dot(x, y, 3, { color: (x - mx) * (y - my) > 0 ? C.accent : C.orange, alpha: 0.75 }); });
        const rr = cxy / Math.sqrt(cx * cy); P.fn((x) => my + (cxy / cx) * (x - mx), { color: C.pink, width: 2.5 });
        A.set(`<span class="k">sample covariance</span> <b>${R(cxy / (n - 1), 3)}</b> <span class="k">correlation r =</span> <b>${R(rr, 3)}</b> <span class="k">purple points push covariance up (same-sign deviations), orange push it down. r measures</span> <b>linear</b> <span class="k">association only.</span>`);
      };
    },
  });

  V.register("bias-variance", {
    title: "Overfitting and the bias–variance tradeoff", hint: "Raise the polynomial degree",
    setup(A) {
      const P = A.plot({ x: [-0.05, 1.05], y: [-1.6, 1.6], h: 320, equal: false }), deg = A.slider("degree", 0, 15, 1, 3), r = rng(5);
      const truth = (x) => Math.sin(2 * Math.PI * x); let pts;
      const gen = () => (pts = Array.from({ length: 14 }, (_, i) => { const x = (i + 0.5) / 14 + (r() - 0.5) * 0.03; return [x, truth(x) + gauss(r) * 0.25]; }));
      A.buttons([{ label: "New noisy data", on: gen }]); gen();
      const fit = (d) => { const n = d + 1, M = Array.from({ length: n }, () => new Array(n + 1).fill(0)); pts.forEach(([x, y]) => { for (let i = 0; i < n; i++) { for (let j = 0; j < n; j++) M[i][j] += (2 * x - 1) ** (i + j); M[i][n] += y * (2 * x - 1) ** i; } }); for (let i = 0; i < n; i++) M[i][i] += 1e-9; for (let i = 0; i < n; i++) { let p = i; for (let k = i + 1; k < n; k++) if (Math.abs(M[k][i]) > Math.abs(M[p][i])) p = k; [M[i], M[p]] = [M[p], M[i]]; for (let k = 0; k < n; k++) if (k !== i) { const f = M[k][i] / M[i][i]; for (let j = i; j <= n; j++) M[k][j] -= f * M[i][j]; } } const c = M.map((row, i) => row[n] / row[i]); return (x) => c.reduce((s, ci, i) => s + ci * (2 * x - 1) ** i, 0); };
      A.draw = () => {
        const C = P.clear().grid(0.1, { stepY: 0.5 }).P, f = fit(deg.v);
        P.fn(truth, { color: C.green, width: 2, dash: [6, 4] }); P.fn(f, { color: C.accent, width: 3 }); pts.forEach((p) => P.dot(...p, 5, { color: C.pink }));
        let tr = 0, te = 0; pts.forEach(([x, y]) => (tr += (f(x) - y) ** 2)); for (let i = 0; i < 200; i++) { const x = i / 199; te += (f(x) - truth(x)) ** 2; }
        A.set(`<span class="k">training error</span> <b>${R(tr / pts.length, 4)}</b> <span class="k">true (test) error</span> <b>${R(te / 200 + 0.0625, 4)}</b> <span class="k">${deg.v < 3 ? "Underfitting: high bias, the model is too simple." : deg.v > 8 ? "Overfitting: high variance, the curve chases the noise." : "Sweet spot."}</span>`);
      };
    },
  });
})();
