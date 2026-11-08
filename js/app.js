(function () {
  "use strict";
  const D = window.LUMEN;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const app = $("#app");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byId = Object.fromEntries(D.courses.map((c) => [c.id, c]));
  const lessonsOf = (c) => c.units.flatMap((u) => u.lessons);
  const ALL = D.courses.flatMap((c) => lessonsOf(c).map((l) => ({ c, l })));

  const PATHS = {
    ml: {
      title: "Math for Machine Learning", short: "Machine Learning",
      desc: "Everything from algebra to backpropagation, in the order you actually need it to understand how models learn.",
      steps: [
        ["algebra", "The language every other course is written in: exponents, logs, functions and Σ notation appear in every ML paper."],
        ["precalc", "Exponentials, logs, trig and complex numbers show up in activations, positional encodings and Fourier features."],
        ["linear-algebra", "Data, weights and embeddings are vectors and matrices. A neural network layer is a matrix multiply."],
        ["calculus", "Learning means following derivatives downhill. Integrals give you probabilities and expectations."],
        ["multivariable", "Models have millions of parameters, so you need gradients, Jacobians and Hessians."],
        ["probability", "Models predict distributions. Uncertainty, likelihood and sampling are all probability."],
        ["statistics", "Estimation, MLE, regression, evaluation and the bias-variance tradeoff."],
        ["information-theory", "Entropy, cross-entropy and KL divergence are the losses you train with."],
        ["matrix-calculus", "Backpropagation and autodiff: how gradients are computed for a whole network."],
        ["optimization", "Gradient descent, SGD, momentum, Adam, convexity and constraints."],
        ["numerical", "Floating point, stability tricks like log-sum-exp, and the numerics that keep training from blowing up."],
      ],
    },
    cs: {
      title: "Math for Computer Science", short: "Computer Science",
      desc: "The discrete mathematics behind algorithms, data structures, cryptography and the theory of computation.",
      steps: [
        ["algebra", "Fluency with exponents, logs and summations makes algorithm analysis painless."],
        ["logic-proofs", "Logic is how programs branch and how you prove an algorithm is correct."],
        ["sets-relations", "Sets, relations and functions are the vocabulary of databases, types and data structures."],
        ["digital-logic", "Binary, two's complement, Boolean algebra and bitwise tricks: how computers store and compute."],
        ["combinatorics", "Counting possibilities, recurrences and generating functions for analysing algorithms."],
        ["graph-theory", "Networks, maps, dependencies and the web are graphs. So are many famous algorithms."],
        ["number-theory", "Modular arithmetic powers hashing, checksums and RSA cryptography."],
        ["algorithms-math", "Big-O, recurrences, the master theorem and amortized analysis."],
        ["probability", "Randomized algorithms, hashing and expected running times rely on probability."],
        ["linear-algebra", "Graphics, PageRank, search and every ML system use matrices."],
        ["computation-theory", "Automata, grammars, Turing machines, decidability and P vs NP: the limits of computing."],
      ],
    },
  };

  /* ---------- storage ---------- */
  const KEY = "lumen.v1";
  let S;
  try { S = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { S = {}; }
  S.done = S.done || {}; S.quiz = S.quiz || {}; S.last = S.last || null; S.days = S.days || {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const lk = (c, l) => c + "/" + l;
  const isDone = (c, l) => !!S.done[lk(c, l)];
  const courseProgress = (c) => { const ls = lessonsOf(c); const d = ls.filter((l) => isDone(c.id, l.id)).length; return { d, n: ls.length, p: ls.length ? Math.round((100 * d) / ls.length) : 0 }; };
  const today = () => new Date().toISOString().slice(0, 10);
  const touchDay = () => { S.days[today()] = 1; save(); };

  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2200); }

  /* ---------- lazy course data ---------- */
  const loaded = {}, waiting = {};
  window.LUMEN_LOAD = (d) => { loaded[d.id] = d; (waiting[d.id] || []).forEach((f) => f(d)); delete waiting[d.id]; };
  function loadCourse(id) {
    return new Promise((res, rej) => {
      if (loaded[id]) return res(loaded[id]);
      if (waiting[id]) return waiting[id].push(res);
      waiting[id] = [res];
      const s = document.createElement("script");
      s.src = "js/data/" + id + ".js"; s.onerror = () => rej(new Error("load " + id));
      document.head.appendChild(s);
    });
  }

  /* ---------- helpers ---------- */
  const art = (path, cls = "") => `<img class="${cls}" src="${path}" alt="" loading="lazy" onerror="this.remove()">`;
  const ART = /[?&]art=1/.test(location.search);
  document.documentElement.classList.toggle("no-art", !ART);
  const courseArt = (c) => ART ? art("art/courses/" + c.id + ".webp") : "";
  const sym = (c) => `<span class="cc-sym">${esc(c.symbol)}</span>`;
  const plural = (n, w) => n + " " + w + (n === 1 ? "" : "s");
  function courseStats(c) { const ls = lessonsOf(c); return { lessons: ls.length, viz: ls.reduce((a, l) => a + l.viz, 0), quiz: ls.reduce((a, l) => a + l.quiz, 0), mins: ls.reduce((a, l) => a + l.minutes, 0) }; }
  const hrs = (m) => (m < 60 ? m + " min" : (m / 60).toFixed(m < 600 ? 1 : 0).replace(/\.0$/, "") + " h");

  function renderMath(root) {
    if (!window.katex) return;
    $$(".m, .mb", root).forEach((el) => {
      if (el.dataset.k) return;
      el.dataset.k = 1;
      try { katex.render(el.textContent, el, { displayMode: el.classList.contains("mb"), throwOnError: false, strict: "ignore", trust: false }); } catch (e) {}
    });
  }
  window.LumenMath = (s) => { try { return katex.renderToString(s, { throwOnError: false, strict: "ignore" }); } catch (e) { return esc(s); } };

  function courseCard(c) {
    const st = courseStats(c), pr = courseProgress(c);
    return `<a class="ccard" href="#/course/${c.id}" style="--cc:${c.color}">
      <div class="cc-top">${courseArt(c)}${sym(c)}${ART ? "" : `<span class="cc-area">${esc(c.area)}</span>`}</div>
      <div class="cc-body"><h4>${esc(c.title)}</h4><p>${esc(c.tagline)}</p>
      <div class="cc-meta"><span>${plural(st.lessons, "lesson")} · ${st.viz} visuals</span><span>${pr.d ? pr.p + "%" : hrs(st.mins)}</span></div>
      ${pr.d ? `<div class="bar"><i style="width:${pr.p}%"></i></div>` : ""}</div></a>`;
  }

  /* ---------- views ---------- */
  function viewHome() {
    const T = D.totals;
    const last = S.last && byId[S.last.c] && lessonsOf(byId[S.last.c]).find((l) => l.id === S.last.l);
    const areas = groupAreas();
    app.innerHTML = `
    <section class="hero"><div class="wrap hero-grid">
      <div>
        <div class="eyebrow">Free · Visual · Interactive</div>
        <h1 style="margin-top:14px">See the math behind <em>machine learning</em> and computer science.</h1>
        <p class="lead">${D.courses.length} courses and ${T.lessons} hands-on lessons that take you from fractions to backpropagation, Bayes and Big-O. Every idea comes with pictures you can drag, steps you can follow and practice that tells you instantly if you got it.</p>
        <div class="hero-cta">
          ${last ? `<a class="btn" href="#/lesson/${S.last.c}/${S.last.l}">Continue: ${esc(last.title)} →</a>` : `<a class="btn" href="#/paths/ml">Start the ML path →</a>`}
          <a class="btn ghost" href="#/paths/cs">Math for CS</a>
          <a class="btn ghost" href="#/courses">Browse courses</a>
        </div>
        <div class="stats"><div class="stat"><b>${D.courses.length}</b><span>courses</span></div><div class="stat"><b>${T.lessons}</b><span>lessons</span></div><div class="stat"><b>${T.viz}</b><span>interactive visuals</span></div><div class="stat"><b>${T.quiz}</b><span>practice questions</span></div></div>
      </div>
      ${ART ? `<div class="hero-art">${art("art/hero.webp")}</div>` : `<div class="hero-tiles">${D.courses.map((c) => `<a class="ht" href="#/course/${c.id}" style="--cc:${c.color}" title="${esc(c.title)}"><span class="cc-sym">${esc(c.symbol)}</span><span class="ht-t">${esc(c.title)}</span></a>`).join("")}</div>`}
    </div></section>
    <section class="section"><div class="wrap">
      <div class="section-head"><div><div class="eyebrow">Learning paths</div><h2>Pick where you're headed</h2><p>Each path orders the courses so every lesson only uses ideas you've already met.</p></div></div>
      <div class="paths">${Object.entries(PATHS).map(([k, p]) => pathCard(k, p)).join("")}</div>
    </div></section>
    <section class="section" style="padding-top:0"><div class="wrap">
      <div class="features">
        <div class="feature"><div class="fi" style="background:color-mix(in srgb,var(--c-purple) 15%,transparent);color:var(--c-purple)">◐</div><h4>Play with it</h4><p>Drag vectors, bend functions, roll dice and watch gradient descent roll downhill. Intuition first.</p></div>
        <div class="feature"><div class="fi" style="background:color-mix(in srgb,var(--c-teal) 15%,transparent);color:var(--c-teal)">1·2·3</div><h4>Step by step</h4><p>Worked examples reveal one step at a time, so you can try the next move before peeking.</p></div>
        <div class="feature"><div class="fi" style="background:color-mix(in srgb,var(--c-green) 15%,transparent);color:var(--c-green)">✓</div><h4>Instant practice</h4><p>Every lesson ends with questions that check your answer and explain why.</p></div>
        <div class="feature"><div class="fi" style="background:color-mix(in srgb,var(--c-orange) 15%,transparent);color:var(--c-orange)">∑</div><h4>Why it matters</h4><p>Each idea is linked to where it shows up in real ML models and real CS problems.</p></div>
      </div>
    </div></section>
    <section class="section" style="padding-top:10px"><div class="wrap">
      <div class="section-head"><div><div class="eyebrow">All courses</div><h2>The whole map of math</h2></div><a class="btn ghost small" href="#/glossary">Open the glossary (${D.glossary.length} terms)</a></div>
      ${areas.map(([a, cs]) => `<div class="area"><h3>${esc(a)}</h3><div class="grid">${cs.map(courseCard).join("")}</div></div>`).join("")}
    </div></section>`;
  }
  function pathCard(k, p) {
    const n = p.steps.reduce((a, [id]) => a + (byId[id] ? lessonsOf(byId[id]).length : 0), 0);
    return `<a class="path-card" href="#/paths/${k}">${ART ? `<div class="pc-art">${art("art/path-" + k + ".webp")}</div>` : `<div class="pc-syms">${p.steps.map(([id]) => byId[id] ? `<span class="cc-sym" style="--cc:${byId[id].color}" title="${esc(byId[id].title)}">${esc(byId[id].symbol)}</span>` : "").join("")}</div>`}
      <div class="eyebrow">${p.steps.length} courses · ${n} lessons</div><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
      <div class="chips">${p.steps.map(([id]) => byId[id] ? `<span class="chip">${esc(byId[id].title)}</span>` : "").join("")}</div></a>`;
  }
  function groupAreas() {
    const m = new Map();
    D.courses.forEach((c) => { if (!m.has(c.area)) m.set(c.area, []); m.get(c.area).push(c); });
    return [...m.entries()];
  }
  function viewCourses() {
    app.innerHTML = `<div class="wrap"><div class="page-head"><div class="eyebrow">Courses</div><h1>Every course</h1><p>${D.courses.length} courses grouped by area. Start anywhere, or follow a <a href="#/paths">learning path</a>.</p></div>
      ${groupAreas().map(([a, cs]) => `<div class="area"><h3>${esc(a)}</h3><div class="grid">${cs.map(courseCard).join("")}</div></div>`).join("")}</div>`;
  }
  function viewPaths() {
    app.innerHTML = `<div class="wrap"><div class="page-head"><div class="eyebrow">Learning paths</div><h1>Choose your path</h1><p>Two complete roadmaps. They share some courses, and your progress counts in both.</p></div>
      <div class="paths" style="padding-bottom:60px">${Object.entries(PATHS).map(([k, p]) => pathCard(k, p)).join("")}</div></div>`;
  }
  function viewPath(k) {
    const p = PATHS[k]; if (!p) return notFound();
    app.innerHTML = `<div class="wrap" style="max-width:900px"><div class="page-head"><div class="crumbs"><a href="#/paths">Learning paths</a><span>/</span><span>${esc(p.short)}</span></div><h1>${esc(p.title)}</h1><p>${esc(p.desc)}</p></div>
      <div class="roadmap">${p.steps.map(([id, why], i) => {
        const c = byId[id]; if (!c) return ""; const pr = courseProgress(c), st = courseStats(c);
        return `<div class="rm-step" style="--cc:${c.color}"><div class="rm-n">${i + 1}</div><a class="rm-card" href="#/course/${c.id}">
          <h3>${esc(c.title)}</h3><p>${esc(c.tagline)}</p>
          <div class="chips"><span class="chip">${plural(st.lessons, "lesson")}</span><span class="chip">${st.viz} visuals</span><span class="chip">${hrs(st.mins)}</span>${pr.d ? `<span class="chip">${pr.p}% done</span>` : ""}</div>
          <div class="why"><b>Why here:</b> ${esc(why)}</div>${pr.d ? `<div class="bar" style="margin-top:12px"><i style="width:${pr.p}%"></i></div>` : ""}</a></div>`;
      }).join("")}</div></div>`;
  }
  function firstUndone(c) { return lessonsOf(c).find((l) => !isDone(c.id, l.id)) || lessonsOf(c)[0]; }
  function viewCourse(id, tab) {
    const c = byId[id]; if (!c) return notFound();
    const st = courseStats(c), pr = courseProgress(c), nxt = firstUndone(c);
    const prereq = c.prereq.filter((p) => byId[p]);
    app.innerHTML = `<div style="--cc:${c.color}"><section class="course-hero"><div class="wrap course-hero-grid"><div>
      <div class="crumbs"><a href="#/courses">Courses</a><span>/</span><span>${esc(c.area)}</span></div>
      <h1>${esc(c.title)}</h1><p>${esc(c.desc || c.tagline)}</p>
      <div class="chips" style="margin:14px 0 22px"><span class="chip">${c.units.length} units</span><span class="chip">${plural(st.lessons, "lesson")}</span><span class="chip">${st.viz} interactive visuals</span><span class="chip">${st.quiz} practice questions</span><span class="chip">about ${hrs(st.mins)}</span></div>
      ${prereq.length ? `<p style="font-size:14.5px;color:var(--muted)">Helpful first: ${prereq.map((p) => `<a href="#/course/${p}">${esc(byId[p].title)}</a>`).join(", ")}</p>` : ""}
      <div class="hero-cta"><a class="btn" href="#/lesson/${c.id}/${nxt.id}">${pr.d ? (pr.d === pr.n ? "Review course" : "Continue: " + esc(nxt.title)) : "Start course"} →</a>
      ${pr.d ? `<span style="align-self:center;color:var(--ink2);font-weight:600">${pr.d}/${pr.n} lessons done</span>` : ""}</div>
      ${pr.d ? `<div class="bar" style="max-width:420px;margin-top:16px"><i style="width:${pr.p}%"></i></div>` : ""}
      <div class="tabs"><a class="tab ${tab ? "" : "on"}" href="#/course/${c.id}">Lessons</a><a class="tab ${tab === "formulas" ? "on" : ""}" href="#/course/${c.id}/formulas">Formula sheet</a><a class="tab ${tab === "mock" ? "on" : ""}" href="#/course/${c.id}/mock">Mock test</a></div>
      </div>${ART ? `<div class="ch-art">${courseArt(c)}</div>` : `<div class="ch-sym"><span class="cc-sym">${esc(c.symbol)}</span></div>`}</div></section>
      <div class="wrap" id="courseBody"></div></div>`;
    const body = $("#courseBody");
    if (tab === "formulas") {
      body.innerHTML = `<div class="empty">Loading…</div>`;
      loadCourse(c.id).then((d) => {
        body.innerHTML = d.formulas.length ? `<div class="formula-sheet">${d.formulas.map((f) => `<div class="fs-item"><h4><a href="#/lesson/${c.id}/${f.l}">${esc(f.t)}</a></h4>${f.html}</div>`).join("")}</div>` : `<div class="empty">No formulas yet.</div>`;
        renderMath(body);
      });
      return;
    }
    if (tab === "mock") {
      body.innerHTML = `<div class="empty">Loading…</div>`;
      loadCourse(c.id).then((d) => mockTest(body, c, d));
      return;
    }
    let n = 0;
    body.innerHTML = `<div class="units">${c.units.map((u, ui) => {
      const d = u.lessons.filter((l) => isDone(c.id, l.id)).length;
      return `<div class="unit"><div class="unit-head"><div class="unit-num">${ui + 1}</div><div><div class="eyebrow" style="color:var(--muted)">Unit ${ui + 1}</div><h3>${esc(u.title)}</h3></div><div class="u-meta">${d}/${u.lessons.length} done</div></div>
      ${u.lessons.map((l) => { n++; const dn = isDone(c.id, l.id); return `<a class="lesson-row ${dn ? "done" : ""}" href="#/lesson/${c.id}/${l.id}"><span class="dot">${dn ? "✓" : ""}</span>
        <div><div class="lr-t">${n}. ${esc(l.title)}</div><div class="lr-s">${esc(l.summary)}</div></div>
        <div class="lr-m">${l.viz ? `<span class="tag v">${l.viz} visual${l.viz > 1 ? "s" : ""}</span>` : ""}${l.quiz ? `<span class="tag q">${l.quiz} Q</span>` : ""}<span class="tag">${l.minutes} min</span></div></a>`; }).join("")}</div>`;
    }).join("")}</div>`;
  }

  function sideNav(c, lid) {
    const pr = courseProgress(c);
    return `<a class="s-course" href="#/course/${c.id}">${sym(c)}<span>${esc(c.title)}</span></a>
      <div class="s-prog">${pr.d}/${pr.n} lessons complete<div class="bar"><i style="width:${pr.p}%"></i></div></div>
      ${c.units.map((u, ui) => `<h5>Unit ${ui + 1} · ${esc(u.title)}</h5>${u.lessons.map((l) => `<a class="sl ${l.id === lid ? "on" : ""} ${isDone(c.id, l.id) ? "done" : ""}" href="#/lesson/${c.id}/${l.id}"><i></i><span>${esc(l.title)}</span></a>`).join("")}`).join("")}`;
  }

  async function viewLesson(cid, lid) {
    const c = byId[cid]; if (!c) return notFound();
    const ls = lessonsOf(c), idx = ls.findIndex((l) => l.id === lid); if (idx < 0) return notFound();
    const l = ls[idx], unit = c.units.find((u) => u.lessons.includes(l));
    const prev = ls[idx - 1], next = ls[idx + 1];
    const ci = D.courses.indexOf(c), nextCourse = !next && D.courses[ci + 1];
    S.last = { c: cid, l: lid }; save(); touchDay();
    app.innerHTML = `<div class="lesson-layout" style="--cc:${c.color}">
      <aside class="side">${sideNav(c, lid)}</aside>
      <article class="article">
        <div class="lesson-top">
          <div class="crumbs"><a href="#/course/${c.id}">${esc(c.title)}</a><span>/</span><span>${esc(unit.title)}</span></div>
          <h1>${esc(l.title)}</h1><p class="summary">${esc(l.summary)}</p>
          <div class="meta"><span class="tag">${l.minutes} min read</span>${l.viz ? `<span class="tag v">${l.viz} interactive</span>` : ""}${l.quiz ? `<span class="tag q">${l.quiz} practice Q</span>` : ""}<span class="tag">Lesson ${idx + 1} of ${ls.length}</span></div>
        </div>
        <details class="reveal mobile-outline"><summary>Course outline</summary><div class="side" style="display:block;position:static;height:auto">${sideNav(c, lid)}</div></details>
        <div class="prose" id="prose"><div class="empty">Loading lesson…</div></div>
        <div class="lesson-end">
          <div class="le-done"><button class="btn ${isDone(cid, lid) ? "done" : ""}" id="doneBtn">${isDone(cid, lid) ? "✓ Completed" : "Mark lesson complete"}</button><p>${isDone(cid, lid) ? "Nice work. This lesson counts toward your progress." : "Finished reading and practising? Mark it done to track your progress."}</p></div>
          <div class="pn">${prev ? `<a href="#/lesson/${cid}/${prev.id}"><small>← Previous</small><b>${esc(prev.title)}</b></a>` : ""}
          ${next ? `<a class="next" href="#/lesson/${cid}/${next.id}"><small>Next →</small><b>${esc(next.title)}</b></a>` : nextCourse ? `<a class="next" href="#/course/${nextCourse.id}"><small>Next course →</small><b>${esc(nextCourse.title)}</b></a>` : ""}</div>
        </div>
      </article>
      <nav class="toc">${l.heads.length ? `<h5>On this page</h5>${l.heads.map((h) => `<a href="#/lesson/${cid}/${lid}?s=${h.id}" data-s="${h.id}">${h.t}</a>`).join("")}` : ""}</nav>
    </div>`;
    renderMath($(".toc"));
    const sl = $(".side .sl.on"); if (sl) sl.scrollIntoView({ block: "center" });
    $("#doneBtn").onclick = () => {
      const k = lk(cid, lid);
      if (S.done[k]) delete S.done[k]; else { S.done[k] = Date.now(); toast("Lesson complete! " + (next ? "Up next: " + next.title : "Course finished!")); }
      save(); const sy = scrollY; viewLesson(cid, lid).then(() => scrollTo(0, sy));
    };
    let d;
    try { d = await loadCourse(cid); } catch (e) { $("#prose").innerHTML = `<div class="empty">Couldn't load this lesson.</div>`; return; }
    if (location.hash.split("?")[0] !== `#/lesson/${cid}/${lid}`) return;
    const prose = $("#prose");
    prose.innerHTML = d.lessons[lid] || "<p>Coming soon.</p>";
    enhance(prose, cid, lid);
    setupToc();
    const s = new URLSearchParams(location.hash.split("?")[1] || "").get("s");
    if (s && document.getElementById(s)) document.getElementById(s).scrollIntoView();
  }

  function mockTest(body, c, d) {
    const tmp = document.createElement("div");
    tmp.innerHTML = Object.values(d.lessons).join("");
    const all = $$(".qcard", tmp);
    for (let i = all.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [all[i], all[j]] = [all[j], all[i]]; }
    const qs = all.slice(0, Math.min(15, all.length));
    if (!qs.length) { body.innerHTML = `<div class="empty">No questions yet.</div>`; return; }
    body.innerHTML = `<div class="mock"><div class="mock-head"><div><h2>Mock test: ${esc(c.title)}</h2><p>${qs.length} random questions from across the whole course. Your first answer to each question counts toward your score.</p></div>
      <div class="mock-score"><b id="mkScore">0</b><span>/ ${qs.length}</span><small id="mkLeft">${qs.length} left</small></div></div><div class="quiz" id="mkQs"></div>
      <div class="mock-foot"><button class="btn" id="mkNew">New mock test</button></div></div>`;
    const box = $("#mkQs");
    qs.forEach((q, i) => { q.dataset.q = "m" + i; const n = $(".qnum", q); if (n) n.textContent = `Question ${i + 1} of ${qs.length}`; box.appendChild(q); });
    renderMath(box);
    let score = 0, done = 0;
    $$(".qcard", box).forEach((card) => {
      let first = true;
      const finish = (ok) => {
        const fb = $(".qfeedback", card), ex = $(".qexp", card);
        fb.className = "qfeedback " + (ok ? "right" : "wrong");
        fb.textContent = ok ? (first ? "Correct!" : "Correct (not counted, it wasn't your first try).") : "Not quite. Read the explanation, then try again.";
        if (ex.innerHTML.trim()) ex.classList.add("show");
        if (first) { first = false; done++; if (ok) score++; $("#mkScore").textContent = score; $("#mkLeft").textContent = done === qs.length ? `${Math.round(100 * score / qs.length)}%` : `${qs.length - done} left`; if (done === qs.length) toast(`Mock test finished: ${score}/${qs.length}`); }
      };
      $$(".qopt", card).forEach((b) => b.onclick = () => { const ok = b.dataset.ok === "1"; b.classList.add(ok ? "right" : "wrong"); if (ok) $$(".qopt", card).forEach((x) => (x.disabled = true)); finish(ok); });
      const inp = $(".qinput input", card);
      if (inp) { const check = () => { const ok = answerMatches(inp.value, inp.dataset.ans); inp.classList.remove("right", "wrong"); void inp.offsetWidth; inp.classList.add(ok ? "right" : "wrong"); finish(ok); }; $(".qcheck", card).onclick = check; inp.onkeydown = (e) => e.key === "Enter" && check(); }
    });
    $("#mkNew").onclick = () => { mockTest(body, c, d); scrollTo(0, body.offsetTop - 80); };
  }

  function setupToc() {
    const links = $$(".toc a"); if (!links.length) return;
    const heads = links.map((a) => document.getElementById(a.dataset.s)).filter(Boolean);
    links.forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); const h = document.getElementById(a.dataset.s); if (h) h.scrollIntoView({ behavior: "smooth" }); }));
    const on = () => { let cur = heads[0]; heads.forEach((h) => { if (h.getBoundingClientRect().top < 140) cur = h; }); links.forEach((a) => a.classList.toggle("on", cur && a.dataset.s === cur.id)); };
    window.onscroll = on; on();
  }

  function enhance(root, cid, lid) {
    renderMath(root);
    // steps: reveal one at a time
    $$(".box.steps", root).forEach((box) => {
      const items = $$(".box-body > ol > li", box); if (items.length < 2) return;
      let shown = 1; items.forEach((li, i) => i >= shown && li.classList.add("hid"));
      const ctl = document.createElement("div"); ctl.className = "steps-ctl";
      ctl.innerHTML = `<button class="btn small">Next step →</button><button class="btn small ghost">Show all</button>`;
      const [nb, ab] = ctl.children;
      const upd = () => { items.forEach((li, i) => li.classList.toggle("hid", i >= shown)); if (shown >= items.length) ctl.remove(); else nb.textContent = `Next step (${shown + 1}/${items.length}) →`; };
      nb.onclick = () => { shown++; upd(); }; ab.onclick = () => { shown = items.length; upd(); };
      $(".box-body", box).appendChild(ctl); upd();
    });
    // quizzes
    $$(".qcard", root).forEach((card) => {
      const key = lk(cid, lid) + "#" + card.dataset.q, fb = $(".qfeedback", card), ex = $(".qexp", card);
      const finish = (ok) => { fb.className = "qfeedback " + (ok ? "right" : "wrong"); fb.textContent = ok ? pick(["Correct!", "Nice!", "Exactly right.", "You got it!"]) : "Not quite. Try again, or read the explanation."; if (ex.innerHTML.trim()) ex.classList.add("show"); if (ok) { S.quiz[key] = 1; save(); } };
      $$(".qopt", card).forEach((b) => b.onclick = () => {
        const ok = b.dataset.ok === "1"; b.classList.add(ok ? "right" : "wrong");
        if (ok) $$(".qopt", card).forEach((x) => (x.disabled = true));
        finish(ok);
      });
      const inp = $(".qinput input", card);
      if (inp) {
        const check = () => { const ok = answerMatches(inp.value, inp.dataset.ans); inp.classList.remove("right", "wrong"); void inp.offsetWidth; inp.classList.add(ok ? "right" : "wrong"); finish(ok); };
        $(".qcheck", card).onclick = check; inp.onkeydown = (e) => e.key === "Enter" && check();
      }
    });
    // visualizations
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { io.unobserve(en.target); mountViz(en.target); } }), { rootMargin: "300px" });
    $$("figure.viz", root).forEach((f) => io.observe(f));
    $$("pre code", root).forEach(() => {});
  }
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  function parseNum(s) {
    s = String(s).trim().replace(/\s+/g, "").replace(/−/g, "-").replace(/,/g, "");
    if (/^-?\d*\.?\d+(e-?\d+)?$/i.test(s)) return parseFloat(s);
    let m = s.match(/^(-?\d+)\/(\d+)$/); if (m) return +m[1] / +m[2];
    m = s.match(/^(-?\d*\.?\d+)%$/); if (m) return +m[1] / 100;
    return NaN;
  }
  function answerMatches(v, ans) {
    const norm = (x) => String(x).toLowerCase().replace(/\s+/g, "").replace(/[{}$\\]/g, "");
    return ans.split("|").some((a) => {
      const x = parseNum(v), y = parseNum(a);
      if (!isNaN(x) && !isNaN(y)) return Math.abs(x - y) <= Math.max(1e-6, Math.abs(y) * 0.01);
      return norm(v) === norm(a);
    });
  }
  function mountViz(fig) {
    const name = fig.dataset.viz; let args = {};
    try { args = JSON.parse(fig.dataset.args || "{}"); } catch (e) {}
    const body = $(".viz-body", fig);
    try { window.Viz.mount(name, body, args); renderMath(body); }
    catch (e) { console.error(e); body.innerHTML = `<div class="viz-err">This visual failed to load (${esc(name)}).</div>`; }
  }

  function viewGlossary() {
    const G = D.glossary;
    const letters = [...new Set(G.map((g) => g.term[0].toUpperCase()).filter((x) => /[A-Z]/.test(x)))];
    app.innerHTML = `<div class="wrap"><div class="page-head"><div class="eyebrow">Glossary</div><h1>${G.length} terms, one place</h1><p>Every definition from every lesson. Click a term's source to jump into the lesson where it's explained.</p></div>
      <input class="gl-search" id="glq" type="search" placeholder="Filter terms…"><div class="gl-letters">${letters.map((x) => `<a href="#/glossary?l=${x}">${x}</a>`).join("")}</div><div class="gl-list" id="gll"></div></div>`;
    const list = $("#gll");
    const draw = (q) => {
      q = (q || "").toLowerCase();
      const items = G.filter((g) => !q || g.term.toLowerCase().includes(q));
      list.innerHTML = items.map((g) => { const c = byId[g.c], l = c && lessonsOf(c).find((x) => x.id === g.l); return `<div class="gl-item" id="gl-${esc(g.term[0].toUpperCase())}" style="--cc:${c ? c.color : "#888"}"><div>${g.html}</div><a class="gl-from" href="#/lesson/${g.c}/${g.l}">From ${c ? esc(c.title) : ""} · ${l ? esc(l.title) : ""} →</a></div>`; }).join("") || `<div class="empty">No terms match.</div>`;
      renderMath(list);
    };
    $("#glq").oninput = (e) => draw(e.target.value);
    draw("");
    const L = new URLSearchParams(location.hash.split("?")[1] || "").get("l");
    if (L) { const el = document.getElementById("gl-" + L); if (el) el.scrollIntoView(); }
  }
  function viewProgress() {
    const done = Object.keys(S.done).length, q = Object.keys(S.quiz).length, days = Object.keys(S.days).length;
    const started = D.courses.filter((c) => courseProgress(c).d);
    app.innerHTML = `<div class="wrap"><div class="page-head"><div class="eyebrow">My progress</div><h1>Your learning</h1><p>Saved privately in this browser. Nothing is sent anywhere.</p></div>
      <div class="big-stats"><div class="bs"><b>${done}</b><span>of ${D.totals.lessons} lessons complete</span></div><div class="bs"><b>${q}</b><span>practice questions solved</span></div><div class="bs"><b>${started.length}</b><span>courses started</span></div><div class="bs"><b>${days}</b><span>days you studied</span></div></div>
      <div class="prog-grid">${D.courses.map((c) => { const p = courseProgress(c); return `<a class="prog-card" href="#/course/${c.id}" style="--cc:${c.color}"><div class="pc-h">${sym(c)}<b>${esc(c.title)}</b><span style="margin-left:auto;color:var(--muted);font-size:14px">${p.d}/${p.n}</span></div><div class="bar"><i style="width:${p.p}%"></i></div></a>`; }).join("")}</div>
      <p style="padding-bottom:60px"><button class="btn ghost small" id="resetBtn">Reset all progress</button></p></div>`;
    $("#resetBtn").onclick = () => { if (confirm("Erase all your progress in this browser?")) { S = { done: {}, quiz: {}, last: null, days: {} }; save(); viewProgress(); } };
  }
  function notFound() { app.innerHTML = `<div class="wrap empty"><h1>Page not found</h1><p><a href="#/">Go home</a></p></div>`; }

  /* ---------- search ---------- */
  const modal = $("#searchModal"), si = $("#searchInput"), sr = $("#searchResults");
  const IDX = ALL.map(({ c, l }) => ({ c, l, t: l.title.toLowerCase(), s: (l.summary + " " + l.search + " " + c.title).toLowerCase() }));
  const GIDX = D.glossary.map((g) => ({ g, t: g.term.toLowerCase() }));
  let sel = 0;
  function openSearch() { modal.hidden = false; si.value = ""; doSearch(); setTimeout(() => si.focus(), 10); }
  function closeSearch() { modal.hidden = true; }
  function doSearch() {
    const q = si.value.trim().toLowerCase(); sel = 0;
    if (!q) { sr.innerHTML = `<div class="sr-empty">Try “eigenvector”, “Bayes”, “chain rule”, “Big-O”, “KL divergence”…</div>`; return; }
    const words = q.split(/\s+/);
    const res = IDX.map((x) => { let sc = 0; for (const w of words) { if (x.t.includes(w)) sc += 10; else if (x.s.includes(w)) sc += 3; else return null; } if (x.t.startsWith(q)) sc += 8; return { x, sc }; }).filter(Boolean).sort((a, b) => b.sc - a.sc).slice(0, 12);
    const gres = GIDX.filter((x) => words.every((w) => x.t.includes(w))).slice(0, 5);
    sr.innerHTML = res.map(({ x }) => `<a class="sr" href="#/lesson/${x.c.id}/${x.l.id}" style="--cc:${x.c.color}">${sym(x.c)}<div><b>${esc(x.l.title)}</b><small>${esc(x.c.title)} · ${esc(x.l.summary)}</small></div></a>`).join("") +
      gres.map(({ g }) => { const c = byId[g.c]; return `<a class="sr" href="#/lesson/${g.c}/${g.l}" style="--cc:${c.color}"><span class="cc-sym">≡</span><div><b>${esc(g.term)}</b><small>Glossary · ${esc(c.title)}</small></div></a>`; }).join("") ||
      `<div class="sr-empty">No matches for “${esc(q)}”.</div>`;
    hl();
  }
  function hl() { $$(".sr", sr).forEach((a, i) => a.classList.toggle("on", i === sel)); }
  si.oninput = doSearch;
  si.onkeydown = (e) => {
    const items = $$(".sr", sr);
    if (e.key === "ArrowDown") { sel = Math.min(sel + 1, items.length - 1); hl(); e.preventDefault(); }
    else if (e.key === "ArrowUp") { sel = Math.max(sel - 1, 0); hl(); e.preventDefault(); }
    else if (e.key === "Enter" && items[sel]) { location.hash = items[sel].getAttribute("href"); closeSearch(); }
    else if (e.key === "Escape") closeSearch();
  };
  sr.onclick = (e) => { if (e.target.closest(".sr")) closeSearch(); };
  modal.onclick = (e) => { if (e.target === modal) closeSearch(); };
  $("#searchBtn").onclick = openSearch;
  document.addEventListener("keydown", (e) => {
    if ((e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); }
  });

  /* ---------- chrome ---------- */
  $("#themeBtn").onclick = () => {
    const d = document.documentElement, t = d.dataset.theme === "dark" ? "light" : "dark";
    d.dataset.theme = t; try { localStorage.setItem("lumen.theme", t); } catch (e) {}
    window.dispatchEvent(new Event("lumen-theme"));
  };
  const drawer = $("#drawer");
  $("#menuBtn").onclick = () => drawer.classList.toggle("open");
  $("#drawerCourses").innerHTML = `<h5 class="eyebrow" style="margin:6px 0">Courses</h5>` + D.courses.map((c) => `<a href="#/course/${c.id}">${esc(c.title)}</a>`).join("");
  drawer.onclick = (e) => { if (e.target.closest("a")) drawer.classList.remove("open"); };

  /* ---------- router ---------- */
  let lastPath = "";
  function route() {
    const h = location.hash.slice(1) || "/";
    const [path] = h.split("?");
    const parts = path.split("/").filter(Boolean);
    window.onscroll = null;
    window.Viz && window.Viz.cleanup && window.Viz.cleanup();
    $$(".topnav a").forEach((a) => a.classList.toggle("on", a.dataset.nav === (parts[0] === "paths" ? "paths" : parts[0] === "course" ? "courses" : parts[0])));
    const same = path === lastPath; lastPath = path;
    if (!parts.length) viewHome();
    else if (parts[0] === "courses") viewCourses();
    else if (parts[0] === "paths") parts[1] ? viewPath(parts[1]) : viewPaths();
    else if (parts[0] === "course") viewCourse(parts[1], parts[2]);
    else if (parts[0] === "lesson") viewLesson(parts[1], parts[2]);
    else if (parts[0] === "glossary") viewGlossary();
    else if (parts[0] === "progress") viewProgress();
    else notFound();
    if (!same || !h.includes("?")) scrollTo(0, 0);
    const t = { "": "Lumen — See the math behind ML & CS" };
    const c = parts[1] && byId[parts[1]];
    document.title = parts[0] === "lesson" && c ? (lessonsOf(c).find((l) => l.id === parts[2]) || {}).title + " · " + c.title + " · Lumen" : c ? c.title + " · Lumen" : t[""];
  }
  window.addEventListener("hashchange", route);
  route();
})();
