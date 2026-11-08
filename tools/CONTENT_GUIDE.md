# Lumen content format (content/NN-id.md -> python3 tools/build.py)
Front matter: id,title,tagline,desc,color,symbol,area(Foundations|Linear algebra & calculus|Probability & data|ML math|Discrete math|CS theory),paths(ml, cs),order
`# Unit: Title`  `## Lesson: Title {#lesson-id}`  `@summary: one line`  `### Section`
Blocks `:::kind Optional title` ... `:::` (nestable): tip note warn key ml cs example def(title=glossary term) thm proof steps(numbered list) formulas(collected into course formula sheet) try intuition history code solution hint more quiz
Quiz inside :::quiz — `? question` then `- wrong` / `+ right` options OR `= answer|alt` free response, `> explanation`. Blank line between questions.
Viz: `@viz name key=val key=val | caption`  (numbers auto; strings ok, use _ for spaces in truth-table expr)
Math: $inline$, $$display$$ (KaTeX)
VIZ NAMES:
algebra: func(kind=linear|quadratic|exp|log|power|sine|cubic|abs|rational|transform parent=square|abs|sqrt|sin|exp|cube) slope numberline(a,b) fraction(a,b,c,d) system2 quadratic sigma(term,n) unit-circle complex euler polar inverse sequence
linalg: vector(mode=add|sub|scale|comps) span dot matrix2(preset=identity|rotate|shear|scale|reflect|project|symmetric|singular, eigen=1) eigen(a,b,c,d) lstsq pca norms gram-schmidt svd
calculus: limit(kind=hole|sinc|jump|osc) tangent(f="x³ − 3x", x0) riemann ftc taylor(f="sin x") gradient(surface=bowl|ravine|saddle|rosen|bumpy) gd(surface,lr,sx,sy) lagrange newton convex float
prob: distribution(kind=normal|uniform|exponential|beta|binomial|poisson|geometric, lo, hi) lln clt(src) bayes(prior) venn mle ci hypothesis entropy binary-entropy sigmoid scatter-corr bias-variance
discrete: truth-table(expr) gates(circuit="half adder") binary(bits,value) graph(graph=sample|tree|grid, alg=bfs|dfs|dijkstra|prim|kruskal) modular(m,k) euclid(a,b) sieve pascal bigo dfa(machine) sort sets recursion-tree counting

## LESSON STANDARD (user request, mandatory)
User: "first teach properly like write an entire article ... teach normally first, then show visualisations and how to use them to understand, then formulas, questions, where to use it in ML, real life examples, mocks, quizzes, theorems".
build.py now AUTO-SORTS top-level blocks into sections: 1 Learn (prose, ###, def, key, tip, note, warn, intuition, history, more) -> 2 Visualize (@viz + :::explore) -> 3 Formulas & theorems (formulas, thm, proof) -> 4 Worked examples (example, steps, try, solution, mock) -> 5 Where it's used (ml, cs, real, code) -> 6 Practice (quiz). Course page has Mock test tab (random 15 qs from course).
Every lesson MUST have:
- Learn: a real article teaching from zero, MINIMUM 900+ raw words of flowing prose (user: 'at least 500-1000 words minimum not summary... like khan academy'). Khan-style: motivation/why, an 'Imagine...' scenario or everyday analogy, definitions, step-by-step build-up with small inline worked numbers, why it works, common mistakes, a short summary. Use ### subheadings; paragraphs, not bullet dumps. `python3 tools/build.py` writes tools/learn_report.txt listing every lesson whose Learn section is under 700 counted words (each math expression counts as 1 word) — it must list NONE of your lessons. Use `@fig name args | caption` to place a diagram INSIDE the article (stays in Learn; same names as @viz).
- After each @viz a `:::explore` block: "What to try" numbered actions + "What to notice" and how it connects to the article.
- :::formulas and :::thm/:::proof where relevant.
- 2-3 worked examples (:::steps titled with the problem), plus 1 :::mock exam-style problem with :::solution inside.
- :::ml, :::cs where relevant, and at least one :::real (real-life example).
- :::quiz with 4-6 questions with > explanations.
