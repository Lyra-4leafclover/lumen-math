/* g09 extra visuals for Combinatorics and Number Theory: arrangements (stars and bars, derangements, Catalan), CRT grid, LCG / hashing */
(function () {
  const V = window.Viz, { fmt } = V.util;
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const fact = (n) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };
  const binom = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return Math.round(r); };
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const primeFactors = (n) => { const s = []; for (let p = 2; p * p <= n; p++) if (n % p === 0) { s.push(p); while (n % p === 0) n /= p; } if (n > 1) s.push(n); return s; };

  V.register("g09-arrange", {
    title: "Counting arrangements by listing them", hint: "Pick a mode, then change the sliders",
    setup(A, a) {
      let mode = a.mode || "stars", only = false, atLeastOne = !!a.positive;
      A.seg([["stars", "Stars and bars"], ["derange", "Derangements"], ["catalan", "Catalan paths"]], mode, (v) => (mode = v));
      const sn = A.slider("n", 1, 8, 1, a.n ?? 5), sk = A.slider("k boxes", 1, 5, 1, a.k ?? 3), si = A.slider("path #", 1, 132, 1, 1);
      A.buttons([{ label: "toggle: boxes may be empty / at least one each", on: () => (atLeastOne = !atLeastOne) }, { label: "toggle: show only derangements", on: () => (only = !only) }]);
      const P = A.plot({ x: [0, 12], y: [0, 6], h: 230, equal: true });
      const box = el("div", "perm"); A.stage.appendChild(box);
      A.draw = () => {
        const C = P.clear().P; P.cv.style.display = mode === "catalan" ? "" : "none";
        if (mode === "stars") {
          const n = sn.v, k = sk.v, out = [], lo = atLeastOne ? 1 : 0;
          const rec = (left, parts) => { if (parts.length === k - 1) { if (left >= lo) out.push([...parts, left]); return; } for (let x = lo; x <= left - lo * (k - 1 - parts.length); x++) rec(left - x, [...parts, x]); };
          rec(n, []);
          box.innerHTML = out.slice(0, 400).map((p) => `<span title="(${p.join(", ")})">${p.map((x) => "★".repeat(x) || "·").join("|")}</span>`).join("");
          const f = atLeastOne ? `\\binom{n-1}{k-1} = \\binom{${n - 1}}{${k - 1}} = ${binom(n - 1, k - 1)}` : `\\binom{n+k-1}{k-1} = \\binom{${n + k - 1}}{${k - 1}} = ${binom(n + k - 1, k - 1)}`;
          A.set(`<b>${out.length}</b> <span class="k">ways to put ${n} identical stars into ${k} boxes (${atLeastOne ? "every box gets at least one" : "boxes may be empty, shown as ·"}). Formula:</span> ${A.tex(f)} <span class="k">Each listing is a row of ${n} stars and ${k - 1} bars.</span>`);
        } else if (mode === "derange") {
          const n = Math.min(sn.v, 6), perms = [], base = [...Array(n).keys()].map((i) => i + 1);
          const rec = (cur, used) => { if (cur.length === n) { perms.push(cur.slice()); return; } base.forEach((x) => { if (used.has(x)) return; used.add(x); cur.push(x); rec(cur, used); cur.pop(); used.delete(x); }); };
          rec([], new Set()); let D = 0;
          box.innerHTML = perms.map((p) => { const fixed = p.filter((x, i) => x === i + 1).length; if (!fixed) D++; if (only && fixed) return ""; return `<span style="${fixed ? "" : "background:var(--accent);color:#fff;border-color:var(--accent)"}">${p.map((x, i) => (x === i + 1 ? `<u>${x}</u>` : x)).join("")}</span>`; }).join("");
          const r = D / fact(n);
          A.set(`${n < sn.v ? '<span class="k">(capped at n = 6 so the list stays readable)</span> ' : ""}<span class="k">Purple = no letter in its own slot. Underlined digits are fixed points.</span> ${A.tex(`D_{${n}} = ${D}`)} <span class="k">out of</span> ${A.tex(`${n}! = ${fact(n)}`)} <span class="k">ratio</span> <b>${fmt(r, 4)}</b> <span class="k">vs</span> ${A.tex("1/e \\approx 0.3679")}`);
        } else {
          const n = Math.min(sn.v, 6), words = [];
          const rec = (s, o, c) => { if (s.length === 2 * n) { words.push(s); return; } if (o < n) rec(s + "(", o + 1, c); if (c < o) rec(s + ")", o, c + 1); };
          rec("", 0, 0); const Cn = words.length; si.el.max = Cn; if (si.v > Cn) si.set(Cn); const w = words[si.v - 1];
          P.setView([-0.5, 2 * n + 0.5], [-0.6, n + 0.6]); P.clear();
          for (let x = 0; x <= 2 * n; x++) P.line(x, 0, x, n, { color: C.line, width: 1 });
          for (let y = 0; y <= n; y++) P.line(0, y, 2 * n, y, { color: C.line, width: 1 });
          P.line(0, 0, 2 * n, 0, { color: C.bad, width: 2, dash: [5, 4] });
          let x = 0, y = 0; const pts = [[0, 0]]; for (const ch of w) { x++; y += ch === "(" ? 1 : -1; pts.push([x, y]); }
          P.poly(pts, { color: C.accent, width: 3.5 }); pts.forEach((p) => P.dot(p[0], p[1], 4, { color: C.accent }));
          box.innerHTML = words.map((s, i) => `<span style="${i === si.v - 1 ? "background:var(--accent);color:#fff;border-color:var(--accent)" : ""}">${s}</span>`).join("");
          A.set(`${n < sn.v ? '<span class="k">(capped at n = 6)</span> ' : ""}<span class="k">"(" = up step, ")" = down step. The path never dips below the red floor.</span> ${A.tex(`C_{${n}} = \\frac{1}{${n}+1}\\binom{${2 * n}}{${n}} = ${binom(2 * n, n) / (n + 1)}`)} <span class="k">showing #${si.v}:</span> <b class="mono">${w}</b>`);
        }
      };
    },
  });

  V.register("g09-crt", {
    title: "Chinese Remainder Theorem grid", hint: "Choose two moduli and two remainders",
    setup(A, a) {
      const sm = A.slider("m", 2, 12, 1, a.m ?? 3), sn = A.slider("n", 2, 12, 1, a.n ?? 5), sa = A.slider("x mod m = a", 0, 11, 1, a.a ?? 2), sb = A.slider("x mod n = b", 0, 11, 1, a.b ?? 3);
      const box = el("div", "tt-wrap"); A.stage.appendChild(box);
      A.draw = () => {
        const m = sm.v, n = sn.v, ra = sa.v % m, rb = sb.v % n, N = (m * n) / gcd(m, n), cell = {};
        for (let x = 0; x < m * n; x++) { const key = (x % m) + "," + (x % n); if (x < N) (cell[key] = cell[key] || []).push(x); }
        let h = `<table class="tt"><thead><tr><th>x mod ${m} ↓ / x mod ${n} →</th>${[...Array(n).keys()].map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>`;
        for (let r = 0; r < m; r++) { h += `<tr><th>${r}</th>`; for (let c = 0; c < n; c++) { const v = cell[r + "," + c], hit = r === ra && c === rb; h += `<td style="${hit ? "background:var(--accent);color:#fff;font-weight:700" : v ? "" : "color:var(--muted)"}">${v ? v.join(",") : "–"}</td>`; } h += "</tr>"; }
        box.innerHTML = h + "</tbody></table>";
        const g = gcd(m, n), sol = cell[ra + "," + rb];
        A.set(`<span class="k">Each number x from 0 to ${N - 1} (= lcm) is written in row x mod ${m}, column x mod ${n}.</span> <span class="k">gcd(${m}, ${n}) =</span> <b>${g}</b> ${g === 1 ? `<span class="k">→ coprime: all ${m * n} cells hold exactly one number.</span>` : `<span class="k">→ not coprime: only ${N} of ${m * n} cells are used.</span>`} ${sol ? `${A.tex(`x \\equiv ${ra} \\pmod{${m}},\\; x \\equiv ${rb} \\pmod{${n}} \\Rightarrow x \\equiv ${sol[0]} \\pmod{${N}}`)}` : `<b>No solution</b> <span class="k">for remainders ${ra}, ${rb}: they disagree mod ${g}.</span>`}`);
      };
    },
  });

  V.register("g09-lcg", {
    title: "Pseudo-random generators and hash buckets", hint: "Switch mode, then move the sliders",
    setup(A, a) {
      let mode = a.mode || "prng";
      A.seg([["prng", "LCG random numbers"], ["hash", "Hashing k mod m"]], mode, (v) => (mode = v));
      const sm = A.slider("modulus m", 2, 64, 1, a.m ?? 16), sa = A.slider("a / stride", 1, 40, 1, a.a ?? 5), sc = A.slider("c / keys", 0, 60, 1, a.c ?? 3), ss = A.slider("seed / first key", 0, 63, 1, 1);
      const P = A.plot({ x: [0, 1], y: [0, 1], h: 300, equal: false });
      A.draw = () => {
        const C = P.clear().P, m = sm.v;
        if (mode === "prng") {
          const aa = sa.v, c = sc.v, seen = new Map(), seq = []; let x = ss.v % m;
          while (!seen.has(x)) { seen.set(x, seq.length); seq.push(x); x = (aa * x + c) % m; }
          const start = seen.get(x), period = seq.length - start;
          P.setView([-1, m], [-1, m]); P.clear(); P.rect(-0.5, -0.5, m, m, { color: C.line2, width: 1 });
          for (let i = 0; i + 1 < seq.length; i++) P.dot(seq[i], seq[i + 1], m > 40 ? 3 : 4.5, { color: i >= start ? C.accent : C.orange });
          P.dot(seq[seq.length - 1], x, m > 40 ? 3 : 4.5, { color: C.accent });
          P.text("x_k →", m - 1, -0.5, { dy: 14, align: "right", size: 11, color: C.muted }); P.text("x_{k+1} ↑", -0.5, m - 0.5, { dx: 4, align: "left", size: 11, color: C.muted });
          const pf = primeFactors(m), hd = gcd(c, m) === 1 && pf.every((p) => (aa - 1) % p === 0) && (m % 4 !== 0 || (aa - 1) % 4 === 0);
          A.set(`${A.tex(`x_{k+1} = (${aa}x_k + ${c}) \\bmod ${m}`)} <span class="k">sequence:</span> <span class="mono">${seq.slice(0, 24).join(", ")}${seq.length > 24 ? ", …" : ""}</span> <span class="k">→ repeats with period</span> <b>${period}</b> <span class="k">of a possible ${m}.</span> <span class="k">Hull–Dobell full-period test:</span> <b>${hd ? "passes" : "fails"}</b> <span class="k">(dots = pairs (x_k, x_{k+1}); orange = tail before the cycle)</span>`);
        } else {
          const s = sa.v, nk = Math.max(1, sc.v), k0 = ss.v, load = new Array(m).fill(0);
          for (let i = 0; i < nk; i++) load[(k0 + i * s) % m]++;
          const mx = Math.max(...load), empty = load.filter((v) => !v).length;
          P.setView([-0.5, m - 0.5], [0, mx * 1.18 + 0.5]); P.clear();
          load.forEach((v, i) => { P.rect(i - 0.38, 0, 0.76, v, { color: "none", fill: v ? C.accent : C.line, fa: 0.85 }); if (m <= 32) P.text(String(i), i, 0, { dy: 13, size: 10, color: C.muted }); });
          const g = gcd(s, m);
          A.set(`<span class="k">${nk} keys</span> ${A.tex(`k = ${k0}, ${k0 + s}, ${k0 + 2 * s}, \\dots`)} <span class="k">hashed by</span> ${A.tex(`h(k) = k \\bmod ${m}`)}. <span class="k">largest bucket</span> <b>${mx}</b>, <span class="k">empty buckets</span> <b>${empty}</b>. ${A.tex(`\\gcd(${s}, ${m}) = ${g}`)} ${g > 1 ? `<span class="k">→ the keys can only ever land in ${m / g} of the ${m} buckets.</span>` : `<span class="k">→ the stride is coprime to m, so keys cycle through every bucket.</span>`}`);
        }
      };
    },
  });
})();
