---
id: optimization
title: Optimization
tagline: Gradient descent and its descendants, convexity, constraints and duality: how models are trained.
desc: Every model is trained by optimization. You'll learn how to state an optimization problem, convex sets and functions and Jensen's inequality, gradient descent and why the learning rate matters, stochastic and mini-batch methods with learning-rate schedules, momentum, RMSProp, Adam and AdamW, Newton and quasi-Newton methods, Lagrange multipliers, duality and the KKT conditions, linear programming and the simplex method, and practical training and debugging techniques.
color: #84cc16
symbol: min
area: ML math
paths: ml
order: 10
---

# Unit: Foundations

## Lesson: Optimization problems {#problems}
@summary: Decision variables, objectives and constraints; local versus global minima; and the conditions that identify a minimum.

### Choosing the best option
Every day you solve optimization problems without naming them. Which route gets you to work fastest? How many hours should you study each subject before an exam? How much should a café charge for a cup of lemonade? In each case there is something you control, something you want to make as small or as large as possible, and some rules you must respect. Machine learning is built on exactly the same idea: training a model means choosing its parameters to make a loss as small as possible.

Imagine you run a lemonade stand. From experience, if you charge $p$ euros per cup you sell $100 - 10p$ cups a day, and each cup costs you 2 euros to make. Your daily profit is
$$P(p) = (p - 2)(100 - 10p) = -10p^2 + 120p - 200$$
At $p = 4$ you make $2\times60 = 120$; at $p = 8$ you make $6\times20 = 120$ as well. Somewhere in between is a better price. The derivative $P'(p) = -20p + 120$ is zero at $p = 6$, where the profit is $4\times40 = 160$. Because $P'' = -20 < 0$ the curve is an upside-down bowl, so this is the best price. That small calculation contains every ingredient of an optimization problem.

### The ingredients
The quantities you control are the **decision variables**, usually collected in a vector $\theta$ (in the example, the price $p$). The quantity you want to minimize or maximize is the **objective** $f(\theta)$, also called the cost or loss. The rules are **constraints**, written as inequalities $g_i(\theta)\le0$ or equalities $h_j(\theta) = 0$. A price cannot be negative, for instance, so $-p\le0$. The standard form is
$$\min_\theta\ f(\theta)\quad\text{subject to}\quad g_i(\theta)\le0,\quad h_j(\theta) = 0$$
The set of all $\theta$ that satisfy the constraints is the **feasible set**. A problem with no constraints is called **unconstrained**. Maximizing $f$ is the same as minimizing $-f$, so we only ever need to talk about minimization; the lemonade problem is $\min_p\ 10p^2 - 120p + 200$.

:::def Objective function
The function $f(\theta)$ an optimization problem minimizes (or maximizes). In machine learning it is usually called the loss or cost.
:::

:::def Feasible set
The set of points that satisfy all the constraints of an optimization problem. A point in it is called feasible.
:::

### Local and global minima
A point $\theta^*$ is a **global minimum** if $f(\theta^*)\le f(\theta)$ for every feasible $\theta$. It is a **local minimum** if this holds only for $\theta$ near $\theta^*$. Picture a hilly landscape: the global minimum is the lowest valley anywhere, while a local minimum is the bottom of any valley, even a small one high up a mountain.

Here is a concrete function with both. Let $f(x) = \frac{x^4}4 - \frac{x^3}3 - x^2$. Its derivative is $f'(x) = x^3 - x^2 - 2x = x(x - 2)(x + 1)$, which is zero at $x = -1$, $0$ and $2$. The values are $f(-1) = -\frac5{12}\approx-0.42$, $f(0) = 0$ and $f(2) = -\frac83\approx-2.67$. So $x = 2$ is the global minimum, $x = -1$ is a local minimum that is not global, and $x = 0$ is a local maximum. An algorithm that only walks downhill and starts at $x = -2$ will settle at $x = -1$ and never discover the better valley.

:::def Local and global minimum
$\theta^*$ is a global minimum if $f(\theta^*)\le f(\theta)$ for all feasible $\theta$, and a local minimum if this holds for all feasible $\theta$ within some small distance of $\theta^*$.
:::

### How to recognise a minimum
At an interior minimum of a smooth function the ground is flat: the derivative, or in many dimensions the gradient, is zero. This is the **first-order condition** $\nabla f(\theta^*) = \mathbf 0$. Points where it holds are **stationary points**. But flat ground can also be a peak or a saddle, like the middle of a horse's saddle or a mountain pass, which goes up in one direction and down in another. The **second-order condition** settles it: if the second derivative is positive (in many dimensions, if the Hessian matrix is positive definite), the point is a strict local minimum. In the example, $f''(x) = 3x^2 - 2x - 2$ is $3$ at $x = -1$, $-2$ at $x = 0$ and $6$ at $x = 2$, confirming two minima and one maximum.

### Does a minimum even exist?
Not always. The function $f(x) = 1/x$ on $x > 0$ gets closer and closer to 0 but never reaches it, so it has no minimum. A linear function on the whole real line is unbounded below. The **extreme value theorem** gives a simple guarantee: a continuous function on a closed and bounded set always attains its minimum. In practice, losses that grow as parameters grow, such as a squared error plus a penalty on large weights, also have minima.

### Machine learning as optimization
Training a model with parameters $\theta$ on data $(x_i, y_i)$ almost always means solving
$$\min_\theta\ \frac1n\sum_{i=1}^n\ell(f_\theta(x_i), y_i) + \lambda R(\theta)$$
The first term is the average loss on the training data, the **empirical risk**. The second is a **regularizer** that discourages overly complex models. Even very simple statistics are solutions of such problems. For the data $\{1, 2, 6\}$, the constant $c$ that minimizes $\sum_i(x_i - c)^2$ is the mean, $3$, while the $c$ that minimizes $\sum_i|x_i - c|$ is the median, $2$. The choice of loss decides which answer you get.

:::warn Common mistakes
Assuming any point with zero gradient is a minimum: it may be a maximum or a saddle. Forgetting the boundary of the feasible set, where a constrained minimum often sits even though the gradient there is not zero. Assuming a minimum exists when the objective can keep decreasing forever. Mixing up "minimize $f$" with "find where $f = 0$".
:::

### Summary
An optimization problem has decision variables, an objective and constraints. A global minimum is the lowest feasible value; a local minimum is lowest only nearby. At an interior minimum the gradient vanishes, and positive curvature confirms it. Minima exist on closed bounded sets for continuous functions. Training a machine learning model is minimizing average loss plus a regularizer.

@viz gd surface=bumpy lr=0.1 | A bumpy loss surface with many valleys. Drag the start point, press Run, and see which valley gradient descent finds.

:::explore
**What to try**
1. Press Run from the default start and note the final loss value.
2. Drag the start point to a different valley and run again. Compare the final losses.
3. Start very close to the centre $(0, 0)$ and run. This is the global minimum, where the loss is 0.
4. Switch the surface to the saddle $x^2 - y^2$ and start on the $x$-axis. The path reaches the flat point $(0, 0)$, which is not a minimum.

**What to notice:** downhill methods find the bottom of whichever valley they start in, which is exactly the difference between local and global minima from the article. The saddle shows a stationary point (zero gradient) that is not a minimum; a tiny nudge off the axis makes the path escape downward.
:::

:::formulas
$$\min_\theta f(\theta)\ \text{s.t.}\ g_i(\theta)\le0,\ h_j(\theta) = 0\qquad\max f = -\min(-f)$$
$$\text{first order: }\nabla f(\theta^*) = \mathbf 0\qquad\text{second order: }\nabla^2f(\theta^*)\succ0\Rightarrow\text{strict local min}$$
$$\text{empirical risk: }\frac1n\sum_{i=1}^n\ell(f_\theta(x_i), y_i) + \lambda R(\theta)$$
$$\arg\min_c\sum_i(x_i - c)^2 = \bar x\qquad\arg\min_c\sum_i|x_i - c| = \operatorname{median}$$
:::

:::thm First-order necessary condition
If $f$ is differentiable and $\theta^*$ is a local minimum in the interior of the feasible set, then $\nabla f(\theta^*) = \mathbf 0$.
:::

:::proof Proof
Suppose $\mathbf g = \nabla f(\theta^*)\ne\mathbf 0$. For small $t > 0$, $f(\theta^* - t\mathbf g) = f(\theta^*) - t\|\mathbf g\|^2 + o(t)$, which is smaller than $f(\theta^*)$ once $t$ is small enough. That contradicts $\theta^*$ being a local minimum.
:::

:::thm Extreme value theorem
A continuous function on a closed and bounded (compact) set attains a minimum and a maximum.
:::

:::steps Find and classify the stationary points of $f(x) = x^3 - 3x$
1. $f'(x) = 3x^2 - 3 = 0$ gives $x = \pm1$.
2. $f''(x) = 6x$: $f''(1) = 6 > 0$, a local minimum with $f(1) = -2$; $f''(-1) = -6 < 0$, a local maximum with $f(-1) = 2$.
3. Neither is global: $f(x)\to-\infty$ as $x\to-\infty$, so there is no global minimum on the whole line.
:::

:::steps Show that the mean minimizes the sum of squared deviations from $\{1, 2, 6\}$
1. $S(c) = (1 - c)^2 + (2 - c)^2 + (6 - c)^2$.
2. $S'(c) = -2[(1 - c) + (2 - c) + (6 - c)] = -2(9 - 3c)$, zero at $c = 3$.
3. $S''(c) = 6 > 0$, so $c = 3$ is the minimum, with $S(3) = 4 + 1 + 9 = 14$.
:::

:::mock Exam question
A farmer has 40 metres of fence to enclose a rectangular pen against a long wall (the wall forms one side). (a) Write the problem in standard form with variables $x$ (the two sides perpendicular to the wall) and $y$ (the side parallel to it). (b) Solve it. (c) Explain why a maximum must exist.
:::solution
(a) Maximize $xy$ subject to $2x + y = 40$, $x\ge0$, $y\ge0$; equivalently minimize $-xy$.
(b) Substitute $y = 40 - 2x$: area $A(x) = 40x - 2x^2$. $A'(x) = 40 - 4x = 0$ at $x = 10$, so $y = 20$ and the area is 200 square metres. $A'' = -4 < 0$ confirms a maximum.
(c) The feasible values $0\le x\le20$ form a closed bounded interval and $A$ is continuous, so the extreme value theorem guarantees a maximum. The endpoints give area 0, so the maximum is at the interior stationary point.
:::
:::

:::ml
Linear regression minimizes squared error, logistic regression minimizes cross-entropy, and neural networks minimize the same losses over millions of parameters. Regularization terms like $\lambda\|\theta\|^2$ are part of the objective, and hyperparameter search is itself an outer optimization problem.
:::

:::cs
Many algorithm problems are optimization problems over discrete choices: shortest paths, minimum spanning trees, scheduling and the travelling salesman problem. Continuous optimization ideas such as relaxation and duality are used to design and analyse algorithms for them.
:::

:::real
Airlines decide how many seats to sell at each fare (variables) to maximize revenue (objective) without exceeding the plane's capacity (constraint). This revenue management problem is solved by optimization software every day for millions of flights.
:::

:::quiz
? Maximizing $f$ is equivalent to minimizing...
+ $-f$
- $1/f$
- $f^2$
> Negating flips the order of values, so the largest $f$ is the smallest $-f$.

? For the profit $P(p) = -10p^2 + 120p - 200$, what price maximizes profit?
= 6
> $P'(p) = -20p + 120 = 0$ gives $p = 6$.

? A stationary point with $f''(x^*) < 0$ is a...
- local minimum
+ local maximum
- global minimum
> Negative curvature means the graph bends downward, a peak.

? Which value of $c$ minimizes $\sum_i|x_i - c|$ for the data $\{1, 2, 10\}$?
= 2
> The sum of absolute deviations is minimized at the median.

? Does $f(x) = e^{-x}$ have a minimum on the whole real line?
- Yes, at $x = 0$
+ No, it approaches 0 but never reaches it
- Yes, at every point
> The infimum 0 is not attained, so there is no minimizer.

? At $(0, 0)$ the function $x^2 - y^2$ has zero gradient. This point is a...
+ saddle point
- local minimum
- global maximum
> It curves up along $x$ and down along $y$.
:::

## Lesson: Convexity {#convexity}
@summary: Convex sets and functions, the tests for convexity, why every local minimum of a convex function is global, and Jensen's inequality.

### Bowls versus egg cartons
Drop a marble into a smooth bowl and it rolls to the same bottom no matter where you release it. Drop it into an egg carton and it ends up in whichever cup is nearest. Optimization problems come in the same two flavours. The bowl-like ones are called **convex**, and they are wonderful: every downhill method reaches the true minimum. The egg-carton ones are **non-convex**, and you can get stuck. Knowing which kind of problem you have tells you how much you can trust the answer.

### Convex sets
A set $C$ is convex if, whenever two points $\mathbf a$ and $\mathbf b$ are in it, the whole straight segment between them is too. In symbols, $\lambda\mathbf a + (1 - \lambda)\mathbf b\in C$ for all $\lambda$ between 0 and 1. A disc, a square, a half-plane and a line are convex. A crescent moon or a doughnut is not, because some segments leave the shape. A very useful fact: the intersection of convex sets is convex, so a feasible set described by many linear inequalities is convex.

:::def Convex set
A set $C$ such that for all $\mathbf a, \mathbf b\in C$ and all $\lambda\in[0, 1]$, the point $\lambda\mathbf a + (1 - \lambda)\mathbf b$ is also in $C$.
:::

### Convex functions
A function is convex if the chord joining any two points on its graph lies on or above the graph:
$$f(\lambda x + (1 - \lambda)y)\le\lambda f(x) + (1 - \lambda)f(y)\quad\text{for all }\lambda\in[0, 1]$$
Check it for $f(x) = x^2$ with $x = 0$, $y = 2$ and $\lambda = \frac12$. The midpoint of the inputs is 1, where $f(1) = 1$. The midpoint of the chord is $\frac{0 + 4}2 = 2$. Since $1\le2$, the chord is above. For $f(x) = \sin x$ with $x = 0$ and $y = \pi$, the midpoint value is $\sin\frac\pi2 = 1$ while the chord midpoint is 0, so the chord is below and $\sin$ is not convex there. A function is **concave** if $-f$ is convex: chords lie below.

:::def Convex function
A function $f$ on a convex set such that $f(\lambda x + (1 - \lambda)y)\le\lambda f(x) + (1 - \lambda)f(y)$ for all $x, y$ and $\lambda\in[0, 1]$. It is strictly convex if the inequality is strict whenever $x\ne y$ and $0 < \lambda < 1$.
:::

### Three practical tests
Checking chords directly is tedious, so we use equivalent tests. For a differentiable function, convexity means the graph lies above every tangent line: $f(y)\ge f(x) + f'(x)(y - x)$. For a twice-differentiable function of one variable, it means $f''(x)\ge0$ everywhere. For many variables, it means the Hessian matrix is **positive semidefinite** everywhere, that is, all its eigenvalues are $\ge0$.

These tests show that $x^2$, $e^x$, $-\log x$ (for $x > 0$) and $|x|$ are convex, and that $x^3$ is not convex on the whole line, because $f''(x) = 6x$ is negative for $x < 0$. Note that $x^4$ is convex even though $f''(0) = 0$: the condition is $\ge0$, not $>0$.

### Building convex functions
You rarely test complicated losses from scratch. Instead you use rules that preserve convexity. A sum of convex functions with nonnegative weights is convex. A convex function composed with a linear (affine) map, $f(A\mathbf x + \mathbf b)$, is convex. The pointwise maximum of convex functions is convex. Every norm is convex. With these rules, the least-squares loss $\|X\mathbf w - \mathbf y\|^2$, the logistic regression loss, the SVM hinge loss $\max(0, 1 - y\,\mathbf w^T\mathbf x)$ and the lasso penalty $\lambda\|\mathbf w\|_1$ are all convex. Be careful: a product or a difference of convex functions need not be convex, and $-\|\mathbf x\|^2$ is concave.

### Why convexity is so valuable
For a convex function, **every local minimum is a global minimum**, and for a differentiable convex function, any point with $\nabla f = \mathbf 0$ is a global minimum. There are no false valleys to get stuck in. If the function is strictly convex, the minimizer is unique. This is why convex problems are considered "solved": efficient algorithms reliably find the optimum. Neural network losses are not convex, yet gradient methods work well on them in practice, a fact that is still an active research area.

### Jensen's inequality
Convexity also gives one of the most used inequalities in probability. If $f$ is convex and $X$ is a random variable,
$$f(\mathbb E[X])\le\mathbb E[f(X)]$$
Suppose $X$ is 0 or 2 with equal probability and $f(x) = x^2$. Then $f(\mathbb E[X]) = f(1) = 1$ while $\mathbb E[f(X)] = \frac{0 + 4}2 = 2$. The gap, $2 - 1 = 1$, is exactly the variance of $X$, which is another way to see that a variance is never negative. The chord definition is Jensen's inequality for a variable with two values.

:::warn Common mistakes
Confusing convex (curves up, chords above) with concave (curves down). Requiring $f'' > 0$ when $f''\ge0$ is enough. Assuming the product or difference of convex functions is convex. Checking only the diagonal of the Hessian: $\begin{bmatrix}1 & 3\\3 & 1\end{bmatrix}$ has positive diagonal entries but an eigenvalue of $-2$, so it is not positive semidefinite.
:::

### Summary
Convex sets contain the segment between any two of their points; convex functions have chords above their graphs. Test with tangents, $f''\ge0$, or a positive semidefinite Hessian, and build complicated convex functions from simple ones with sums, affine maps and maxima. For convex functions every local minimum is global. Jensen's inequality says $f(\mathbb E[X])\le\mathbb E[f(X)]$.

@viz convex | Drag the two chord endpoints. For a convex function the chord never dips below the curve.

:::explore
**What to try**
1. Choose $x^2$ and drag the endpoints anywhere. The chord always stays above the curve.
2. Choose $|x|$ and put one endpoint on each side of 0. The chord is above even at the kink, so convexity does not need a derivative.
3. Choose $x^4 - 3x^2$ and place both endpoints near $x = \pm1$. Find a chord that dips below the curve.
4. Choose $\sin x$ and find a position where the chord is above and another where it is below.

**What to notice:** the chord test from the article is a test you can see. Wherever you can make a chord go below the graph, the function has a bump, and a bump is exactly what creates a second valley where gradient descent can get stuck.
:::

:::formulas
$$f(\lambda x + (1 - \lambda)y)\le\lambda f(x) + (1 - \lambda)f(y),\quad\lambda\in[0, 1]$$
$$f(y)\ge f(x) + \nabla f(x)^T(y - x)\qquad f''\ge0\qquad\nabla^2f\succeq0$$
$$f(\mathbb E[X])\le\mathbb E[f(X)]\qquad(f\text{ convex})$$
$$\text{convex: }x^2,\ e^x,\ -\log x,\ |x|,\ \|\mathbf x\|,\ \log\textstyle\sum_ie^{x_i},\ \max(0, 1 - t)$$
:::

:::thm Local minima of convex functions are global
If $f$ is convex and $x^*$ is a local minimum, then $f(x^*)\le f(y)$ for every $y$ in the domain.
:::

:::proof Proof
Suppose $f(y) < f(x^*)$ for some $y$. For small $\lambda > 0$, the point $z = (1 - \lambda)x^* + \lambda y$ is close to $x^*$, and convexity gives $f(z)\le(1 - \lambda)f(x^*) + \lambda f(y) < f(x^*)$. So there are points arbitrarily close to $x^*$ with smaller value, contradicting that $x^*$ is a local minimum.
:::

:::thm Jensen's inequality
If $f$ is convex and $X$ is a random variable with finite mean, then $f(\mathbb E[X])\le\mathbb E[f(X)]$.
:::

:::proof Proof
Let $\mu = \mathbb E[X]$. A convex function lies above a supporting line through $(\mu, f(\mu))$: $f(x)\ge f(\mu) + c(x - \mu)$ for some slope $c$ (for differentiable $f$, $c = f'(\mu)$). Take expectations of both sides: $\mathbb E[f(X)]\ge f(\mu) + c(\mathbb E[X] - \mu) = f(\mu)$.
:::

:::steps Show $f(x) = x^2 - 4x + 7$ is convex and find its minimum
1. $f''(x) = 2\ge0$ everywhere, so $f$ is convex (in fact strictly convex).
2. $f'(x) = 2x - 4 = 0$ at $x = 2$.
3. By convexity this stationary point is the global minimum: $f(2) = 4 - 8 + 7 = 3$.
:::

:::steps Is $f(x, y) = x^2 + xy + y^2$ convex?
1. Hessian: $H = \begin{bmatrix}2 & 1\\1 & 2\end{bmatrix}$, constant everywhere.
2. Eigenvalues: $\det(H - tI) = (2 - t)^2 - 1 = 0$ gives $t = 1$ and $t = 3$.
3. Both are positive, so $H$ is positive definite and $f$ is strictly convex, with unique minimum at $(0, 0)$.
:::

:::steps Use Jensen to prove the AM-GM inequality for two numbers
1. $\log$ is concave, so Jensen reverses: $\log\mathbb E[X]\ge\mathbb E[\log X]$.
2. With $X$ equal to $a$ or $b$ with probability $\frac12$ each: $\log\frac{a + b}2\ge\frac{\log a + \log b}2 = \log\sqrt{ab}$.
3. Exponentiate: $\frac{a + b}2\ge\sqrt{ab}$. For $a = 1$, $b = 9$: $5\ge3$.
:::

:::mock Exam question
Let $f(x, y) = x^2 + 3xy + y^2$. (a) Compute its Hessian and eigenvalues. (b) Is $f$ convex? (c) Find two points whose chord midpoint lies below the graph, confirming your answer.
:::solution
(a) $H = \begin{bmatrix}2 & 3\\3 & 2\end{bmatrix}$, with $(2 - t)^2 = 9$, so $t = 5$ or $t = -1$.
(b) No. An eigenvalue is negative, so $H$ is not positive semidefinite.
(c) Along the eigenvector direction $(1, -1)$, $f(t, -t) = t^2 - 3t^2 + t^2 = -t^2$, which is concave. Take $(-1, 1)$ and $(1, -1)$, where $f = -1$. The midpoint $(0, 0)$ has $f = 0$, but the chord midpoint is $-1$. The chord lies below the graph.
:::
:::

:::ml
Linear regression, logistic regression, SVMs and the lasso are convex, so their training finds the global optimum and the answer does not depend on initialization. Jensen's inequality proves that KL divergence is nonnegative and gives the evidence lower bound (ELBO) used to train variational autoencoders.
:::

:::cs
Convex problems can be solved to high accuracy in polynomial time by interior-point methods. Modelling tools such as CVXPY check convexity automatically using exactly the composition rules in this lesson, a system called disciplined convex programming.
:::

:::real
Investment managers use Markowitz portfolio optimization: choose portfolio weights to minimize risk (a convex quadratic $\mathbf w^T\Sigma\mathbf w$) subject to a target expected return and weights summing to 1. Because the problem is convex, the computed portfolio is guaranteed to be the best one under the model.
:::

:::quiz
? Is $f(x) = e^x$ convex?
+ Yes
- No
> $f''(x) = e^x > 0$ everywhere.

? Is $\sin x$ convex on the whole real line?
- Yes
+ No
> $f''(x) = -\sin x$ is negative on $(0, \pi)$.

? Is $f(x, y) = x^2 - y^2$ convex?
- Yes
+ No
> Its Hessian has eigenvalues 2 and $-2$.

? The pointwise maximum of two convex functions is...
+ always convex
- never convex
- convex only if both are linear
> If both chords lie above each function, they lie above the maximum.

? $X$ is 1 or 3 with equal probability and $f(x) = x^2$. What is $\mathbb E[f(X)] - f(\mathbb E[X])$?
= 1
> $\mathbb E[X^2] = 5$ and $(\mathbb E X)^2 = 4$; the gap is the variance.

? $f(x) = x^4$ has $f''(0) = 0$. Is it convex?
+ Yes, because $f''(x) = 12x^2\ge0$ everywhere
- No, because $f''(0)$ is not positive
> Convexity needs $f''\ge0$, not $> 0$.
:::

# Unit: Gradient methods

## Lesson: Gradient descent {#gradient-descent}
@summary: Walk downhill along the negative gradient, choose the step size wisely, and understand why narrow valleys make progress slow.

### Walking down a hill in fog
Imagine you are on a hillside in thick fog and want to reach the bottom of the valley. You cannot see the valley, but you can feel which way the ground slopes under your feet. A sensible plan is to take a step in the steepest downhill direction, feel the slope again, and repeat. Gradient descent is exactly this plan. It needs no map of the whole landscape, only the local slope, which is why it works even for neural networks with billions of parameters.

### The update rule
For a differentiable function $f(\theta)$, the gradient $\nabla f(\theta)$ points in the direction of steepest increase, so $-\nabla f(\theta)$ points in the direction of steepest decrease. Gradient descent repeats
$$\theta_{t+1} = \theta_t - \eta\,\nabla f(\theta_t)$$
where $\eta > 0$ is the **learning rate** or step size. Why is $-\nabla f$ the steepest direction? The rate of change of $f$ in a unit direction $\mathbf u$ is $\nabla f^T\mathbf u$. By the Cauchy-Schwarz inequality this is at least $-\|\nabla f\|$, with equality exactly when $\mathbf u$ points along $-\nabla f$.

:::def Gradient descent
The iterative method $\theta_{t+1} = \theta_t - \eta\nabla f(\theta_t)$, which repeatedly steps in the direction of steepest decrease of $f$.
:::

:::def Learning rate
The positive step size $\eta$ in gradient descent. Too small makes progress slow; too large makes the iterates oscillate or diverge.
:::

### A first example
Take $f(x) = x^2$, so $f'(x) = 2x$, and start at $x_0 = 4$ with $\eta = 0.25$. The update is $x\leftarrow x - 0.25\cdot2x = 0.5x$, so the iterates are $4, 2, 1, 0.5, \ldots$, halving each time and heading to the minimum at 0. With $\eta = 0.1$ the update is $x\leftarrow0.8x$: steady but slower. With $\eta = 1$ it is $x\leftarrow-x$, which bounces between $4$ and $-4$ forever. With $\eta = 1.5$ it is $x\leftarrow-2x$, giving $4, -8, 16, \ldots$: divergence. The learning rate decides everything.

### Exactly when does it converge?
We can analyse any one-dimensional quadratic $f(x) = \frac a2x^2$ with curvature $a > 0$. Here $f'(x) = ax$ and the update is $x\leftarrow(1 - \eta a)x$. Each step multiplies the distance to the minimum by $|1 - \eta a|$. This shrinks the distance exactly when $|1 - \eta a| < 1$, that is,
$$0 < \eta < \frac2a$$
The best choice is $\eta = 1/a$, which reaches the minimum in one step. Between $1/a$ and $2/a$ the iterates overshoot and alternate sides but still converge. Above $2/a$ they diverge. For $f(x) = x^2$, $a = 2$, so the limit is $\eta < 1$, matching the example.

### Many dimensions and the condition number
Now take the bowl $f(x, y) = x^2 + 2y^2$. Its gradient is $(2x, 4y)$, so each coordinate evolves independently: $x\leftarrow(1 - 2\eta)x$ and $y\leftarrow(1 - 4\eta)y$. Both must shrink, so $\eta < 2/4 = 0.5$. The **steepest** direction sets the speed limit, and the learning rate must satisfy $\eta < 2/L$, where $L$ is the largest curvature (the largest eigenvalue of the Hessian).

The trouble comes when curvatures differ a lot. In the ravine $f = 0.2x^2 + 4y^2$ the curvatures are $0.4$ and $8$. Stability needs $\eta < 0.25$. With $\eta = 0.2$, the $y$ coordinate is multiplied by $1 - 1.6 = -0.6$, so it flips sign every step (a zig-zag across the valley), while $x$ is multiplied by $1 - 0.08 = 0.92$, crawling slowly along the valley floor. The ratio of largest to smallest curvature, here $8/0.4 = 20$, is the **condition number** $\kappa$. Large $\kappa$ means slow gradient descent, and the number of steps needed grows roughly in proportion to $\kappa$.

:::def Condition number
For a quadratic or a function near its minimum, the ratio $\kappa = L/\mu$ of the largest to the smallest curvature (Hessian eigenvalue). Large $\kappa$ means long narrow valleys and slow gradient descent.
:::

### A guarantee for general functions
Real losses are not quadratics, but a similar rule holds. A function is **$L$-smooth** if its gradient never changes faster than $L$ times the distance moved; for twice-differentiable functions this means the Hessian's eigenvalues are at most $L$ in size. For such functions, a step with $\eta = 1/L$ always decreases the loss by at least $\frac1{2L}\|\nabla f\|^2$. This is the **descent lemma**. It guarantees steady progress until the gradient is small. For convex smooth functions the error after $t$ steps shrinks like $1/t$, and for strongly convex functions it shrinks geometrically, by a factor of about $1 - 1/\kappa$ per step.

### When to stop
In practice you stop when the gradient norm is below a tolerance, when the loss stops improving, or after a fixed budget of steps. If you do not know $L$, a **backtracking line search** chooses each step automatically: start with a large $\eta$ and halve it until the loss decreases by a reasonable fraction of what the gradient predicts.

:::warn Common mistakes
Adding the gradient instead of subtracting it, which climbs the hill. Picking one learning rate without testing a range on a log scale (such as $10^{-4}$ to $1$). Blaming the algorithm when the real problem is badly scaled features: standardizing inputs reduces the condition number dramatically. Concluding that the minimum is reached just because the loss decreases slowly: a small gradient in a flat valley floor can still be far from the minimum.
:::

### Summary
Gradient descent steps along $-\nabla f$ with learning rate $\eta$. On a quadratic with curvature $a$ it converges exactly when $\eta < 2/a$, and in many dimensions the largest curvature sets that limit. Speed is governed by the condition number: narrow valleys cause zig-zags and slow progress. For $L$-smooth functions, $\eta = 1/L$ guarantees decrease.

@viz gd surface=bowl lr=0.1 | The bowl $f = x^2 + 2y^2$. Try learning rates 0.05, 0.1, 0.25, 0.45 and 0.55.

:::explore
**What to try**
1. Press Run with $\eta = 0.1$ and count how many steps it takes to get close to the centre.
2. Set $\eta = 0.25$. The $y$ factor $1 - 4\eta$ becomes 0, so the path drops to the $x$-axis in one step.
3. Set $\eta = 0.45$. The path zig-zags in $y$ (factor $-0.8$) but still converges.
4. Set $\eta = 0.55$ and run. The loss blows up, because $\eta > 2/4 = 0.5$.

**What to notice:** the threshold $\eta < 2/L$ from the article is sharp, and the steepest direction ($y$, curvature 4) is the one that misbehaves first.
:::

@viz gd surface=ravine lr=0.2 | The ravine $f = 0.2x^2 + 4y^2$ with condition number 20. Compare plain gradient descent with momentum.

:::explore
**What to try**
1. Run plain GD with $\eta = 0.2$ and watch the zig-zag across the narrow direction.
2. Lower $\eta$ to $0.05$. The zig-zag disappears, but progress along the valley floor becomes painfully slow.
3. Raise $\eta$ to $0.26$. The path diverges, since $2/8 = 0.25$.
4. Switch to Momentum and run again with $\eta = 0.05$.

**What to notice:** there is no learning rate that is good for both directions: the steep direction caps $\eta$, and the flat direction then moves at the rate $1 - 0.4\eta$. This is the condition-number problem, and it is what momentum and adaptive methods in later lessons are designed to fix.
:::

:::formulas
$$\theta_{t+1} = \theta_t - \eta\nabla f(\theta_t)$$
$$f = \tfrac a2x^2:\ x_{t+1} = (1 - \eta a)x_t,\quad\text{converges iff }0 < \eta < \tfrac2a,\ \text{best }\eta = \tfrac1a$$
$$\text{quadratic in }n\text{-D: }\eta < \frac2{\lambda_{\max}(H)},\qquad\kappa = \frac{\lambda_{\max}}{\lambda_{\min}}$$
$$L\text{-smooth, }\eta = \tfrac1L:\quad f(\theta_{t+1})\le f(\theta_t) - \tfrac1{2L}\|\nabla f(\theta_t)\|^2$$
:::

:::thm Steepest descent direction
Among all unit vectors $\mathbf u$, the directional derivative $\nabla f^T\mathbf u$ is smallest for $\mathbf u = -\nabla f/\|\nabla f\|$, where it equals $-\|\nabla f\|$.
:::

:::proof Proof
By Cauchy-Schwarz, $\nabla f^T\mathbf u\ge-\|\nabla f\|\|\mathbf u\| = -\|\nabla f\|$, with equality exactly when $\mathbf u$ is a negative multiple of $\nabla f$.
:::

:::thm Descent lemma
If $\nabla f$ is $L$-Lipschitz, then $f(\mathbf y)\le f(\mathbf x) + \nabla f(\mathbf x)^T(\mathbf y - \mathbf x) + \frac L2\|\mathbf y - \mathbf x\|^2$. With $\mathbf y = \mathbf x - \frac1L\nabla f(\mathbf x)$ this gives $f(\mathbf y)\le f(\mathbf x) - \frac1{2L}\|\nabla f(\mathbf x)\|^2$.
:::

:::proof Sketch
Write $f(\mathbf y) - f(\mathbf x) = \int_0^1\nabla f(\mathbf x + s(\mathbf y - \mathbf x))^T(\mathbf y - \mathbf x)\,ds$ and bound the difference between this gradient and $\nabla f(\mathbf x)$ by $Ls\|\mathbf y - \mathbf x\|$; integrating $s$ gives the $\frac L2$ term. Substituting the step and simplifying $-\frac1L\|\mathbf g\|^2 + \frac1{2L}\|\mathbf g\|^2$ gives the second statement.
:::

:::steps Gradient descent on $f(x) = x^2$ from $x_0 = 4$
1. $f'(x) = 2x$, so with $\eta = 0.25$ the update is $x\leftarrow0.5x$.
2. $x_1 = 2$, $x_2 = 1$, $x_3 = 0.5$: the error halves each step.
3. With $\eta = 1$: $x\leftarrow-x$, bouncing between $4$ and $-4$. With $\eta > 1$ the iterates grow: divergence.
:::

:::steps One step on the bowl $f = x^2 + 2y^2$ from $(-2.5, 1.5)$ with $\eta = 0.1$
1. Gradient: $(2x, 4y) = (-5, 6)$.
2. Step: $(-2.5, 1.5) - 0.1(-5, 6) = (-2, 0.9)$.
3. Loss: from $6.25 + 2\times2.25 = 10.75$ down to $4 + 2\times0.81 = 5.62$.
:::

:::mock Exam question
Let $f(x) = 3x^2 - 6x + 5$. (a) Find the minimizer. (b) For which learning rates does gradient descent converge? (c) Starting from $x_0 = 3$ with $\eta = 0.1$, compute $x_1$ and $x_2$ and the factor by which the error shrinks per step. (d) Which $\eta$ reaches the minimum in one step?
:::solution
(a) $f'(x) = 6x - 6 = 0$ at $x = 1$.
(b) The curvature is $a = f'' = 6$, so $0 < \eta < 2/6 = 1/3$.
(c) $x_1 = 3 - 0.1\times12 = 1.8$ and $x_2 = 1.8 - 0.1\times4.8 = 1.32$. The errors are $2, 0.8, 0.32$, shrinking by $|1 - 0.6| = 0.4$ each step.
(d) $\eta = 1/a = 1/6$: $x_1 = 3 - 12/6 = 1$.
:::
:::

:::ml
Every neural network is trained by some variant of gradient descent. Normalizing input features (zero mean, unit variance) and normalization layers inside networks improve the effective condition number, which is a large part of why they speed up training.
:::

:::cs
Gradient descent is an iterative numerical algorithm: each step costs one gradient evaluation, and the number of steps needed grows with the condition number and with the required accuracy. Analysing that trade-off is the same kind of reasoning as analysing an algorithm's running time.
:::

:::real
A thermostat adjusting a heater by an amount proportional to the temperature error is doing gradient descent on the squared error. Turn the gain up too far and the room temperature overshoots and oscillates, exactly like a learning rate above $2/a$.
:::

:::quiz
? Gradient descent on $f(x) = x^2$ with $\eta = 0.1$ from $x = 10$. What is $x_1$?
= 8
> $x_1 = 10 - 0.1\times20 = 8$.

? For $f(x) = 5x^2$, what is the largest learning rate for which gradient descent converges? (Give the boundary value.)
= 0.2|1/5
> Curvature $a = 10$, so $\eta < 2/10$.

? Gradient descent on $f(x) = x^2$ with $\eta = 0.5$ from $x = 3$. What is $x_1$?
= 0
> $\eta = 1/a$ with $a = 2$ jumps straight to the minimum.

? What is the condition number of $f(x, y) = 0.5x^2 + 8y^2$?
= 16
> Curvatures are 1 and 16.

? The direction of steepest descent at a point is...
+ $-\nabla f$
- $\nabla f$
- perpendicular to $\nabla f$
> The gradient points uphill; its negative points downhill most steeply.

? On a long narrow valley, plain gradient descent typically...
+ zig-zags across the valley and moves slowly along it
- converges in one step
- moves only along the valley floor
> The steep direction limits the step, so the flat direction is slow.
:::

## Lesson: Stochastic and mini-batch gradient descent {#sgd}
@summary: Replace the full gradient with a cheap, noisy estimate from a few examples; understand epochs, batch size, noise and learning-rate schedules.

### Why not use all the data?
The loss of a machine learning model is an average over the training set: $f(\theta) = \frac1n\sum_{i=1}^n\ell_i(\theta)$, where $\ell_i$ is the loss on example $i$. Its gradient is the average of the per-example gradients. For a dataset of a million images, a single exact gradient requires a million forward and backward passes, and gradient descent needs thousands of gradients. That is far too slow.

Imagine you want to know the average opinion of a country about a new policy. You do not ask all 60 million people; you poll a random sample of 1000 and accept a small margin of error. **Stochastic gradient descent** (SGD) applies the same idea to gradients: estimate the average gradient from a small random sample of examples, take a step, and repeat with a fresh sample.

### The algorithm
Plain SGD picks one random example $i$ and steps with its gradient: $\theta\leftarrow\theta - \eta\nabla\ell_i(\theta)$. **Mini-batch** SGD picks a random batch $B$ of examples and averages:
$$\theta\leftarrow\theta - \eta\,\frac1{|B|}\sum_{i\in B}\nabla\ell_i(\theta)$$
Batch sizes from 32 to a few thousand are typical. When people say "SGD" today they almost always mean the mini-batch version.

:::def Stochastic gradient descent (SGD)
Gradient descent in which the full gradient is replaced by the gradient of the loss on a randomly chosen example or mini-batch, giving a cheap unbiased estimate of the true gradient.
:::

:::def Epoch
One full pass through the training set. With $n$ examples and batch size $B$, an epoch contains $n/B$ update steps.
:::

### Why it works: unbiased but noisy
If the batch is chosen at random, the mini-batch gradient equals the true gradient **on average**: it is an unbiased estimate. Here is a tiny check. Suppose we fit a constant $c$ to the data $\{1, 2, 6\}$ with $\ell_i(c) = \frac12(c - x_i)^2$. The per-example gradients are $c - x_i$. At $c = 0$ they are $-1$, $-2$ and $-6$, and their average, $-3$, is the full gradient $c - \bar x$. A random single example gives $-1$, $-2$ or $-6$, each with probability $\frac13$: wrong individually, right on average. A batch of two, say $\{1, 6\}$, gives $-3.5$, closer.

The estimate's spread shrinks with the batch size. If one example's gradient has standard deviation $\sigma$, the average of $B$ independent ones has standard deviation $\sigma/\sqrt B$. Halving the noise therefore requires four times the batch, which is the same square-root law that governs polling margins.

### The noise floor and learning-rate schedules
With a constant learning rate, SGD never settles exactly at the minimum. Close to the minimum the true gradient is tiny, but the noise is not, so the parameters keep jittering in a small region whose size is proportional to $\eta$. To converge exactly, the learning rate must shrink over time. A classical sufficient condition (Robbins and Monro) is
$$\sum_t\eta_t = \infty\quad\text{and}\quad\sum_t\eta_t^2 < \infty$$
which holds for $\eta_t = \eta_0/t$. The first condition means the steps can travel any distance; the second means the noise they add eventually dies out.

In deep learning people use **schedules** that keep the rate high early (fast progress) and lower it later (fine settling). **Step decay** divides $\eta$ by 10 at fixed epochs. **Cosine decay** follows $\eta_t = \eta_{\min} + \frac12(\eta_{\max} - \eta_{\min})\left(1 + \cos\frac{\pi t}T\right)$ from $\eta_{\max}$ at $t = 0$ down to $\eta_{\min}$ at $t = T$. **Warmup** ramps $\eta$ up from near 0 over the first few hundred or thousand steps, which avoids instability while the network's statistics settle.

:::def Learning-rate schedule
A rule $\eta_t$ that changes the learning rate during training, such as step decay, cosine decay or linear warmup.
:::

### Choosing the batch size
Bigger batches give less noisy gradients and use parallel hardware efficiently, but each example contributes less to progress, and very large batches can generalize slightly worse. A useful heuristic is the **linear scaling rule**: if you multiply the batch size by $k$, multiply the learning rate by $k$ too (with warmup), because the averaged gradient is less noisy and can tolerate a larger step. Small batches add noise that can actually help: it pushes the parameters out of saddle points and sharp, narrow minima.

### Epochs and shuffling
Rather than sampling with replacement, practitioners shuffle the dataset at the start of each epoch and walk through it in batches. With $n = 50{,}000$ examples and $B = 100$, one epoch is 500 steps. Shuffling every epoch matters: if the data were sorted, for example by class, each batch would push the model in a biased direction.

:::warn Common mistakes
Not shuffling the data, so batches are not representative. Judging progress from the loss of a single mini-batch, which is noisy; average over many batches. Changing the batch size without retuning the learning rate. Expecting a constant-learning-rate run to converge exactly instead of hovering in a noise ball.
:::

### Summary
SGD replaces the full gradient with the average gradient of a random mini-batch: unbiased, cheap and noisy, with standard deviation $\sigma/\sqrt B$. An epoch is one pass through the data. Because of the noise, the learning rate must decrease over time, either by the Robbins-Monro conditions or by practical schedules such as cosine decay with warmup. Batch size trades noise against hardware efficiency, roughly following the linear scaling rule.

@viz lln | Each run averages more and more random samples. A mini-batch gradient is such an average, and its error shrinks as the batch grows.

:::explore
**What to try**
1. Press Flip 1000 × 5 runs and look at how far the five running averages are from the true value after 10 flips, then after 1000.
2. Estimate the spread after about 25 flips and after about 100 flips. It should roughly halve, since $\sqrt{100/25} = 2$.
3. Move the true probability toward 0 or 1 and repeat. The spread shrinks, because each sample has less variance.

**What to notice:** each run's average is an unbiased estimate that becomes accurate like $1/\sqrt n$. A mini-batch gradient behaves the same way, with the batch size playing the role of the number of flips. That is the $\sigma/\sqrt B$ rule from the article, and why quadrupling the batch only halves the noise.
:::

:::formulas
$$f(\theta) = \frac1n\sum_{i=1}^n\ell_i(\theta),\qquad\mathbf g_B = \frac1{|B|}\sum_{i\in B}\nabla\ell_i(\theta),\qquad\mathbb E[\mathbf g_B] = \nabla f(\theta)$$
$$\operatorname{sd}(\mathbf g_B) = \frac\sigma{\sqrt B}\qquad\text{steps per epoch} = \frac nB$$
$$\sum_t\eta_t = \infty,\quad\sum_t\eta_t^2 < \infty\qquad\text{(e.g. }\eta_t = \eta_0/t\text{)}$$
$$\eta_t = \eta_{\min} + \tfrac12(\eta_{\max} - \eta_{\min})\left(1 + \cos\tfrac{\pi t}{T}\right)$$
:::

:::thm Mini-batch gradients are unbiased with variance $\sigma^2/B$
If the $B$ indices are drawn independently and uniformly, then $\mathbb E[\mathbf g_B] = \nabla f(\theta)$ and, coordinatewise, $\operatorname{Var}(\mathbf g_B) = \sigma^2/B$, where $\sigma^2$ is the variance of a single example's gradient.
:::

:::proof Proof
Each sampled gradient has mean $\frac1n\sum_i\nabla\ell_i = \nabla f$, so their average has the same mean by linearity of expectation. The samples are independent, so the variance of their sum is $B\sigma^2$, and dividing by $B$ multiplies the variance by $1/B^2$, giving $\sigma^2/B$.
:::

:::thm Robbins-Monro convergence (informal)
For a strongly convex smooth objective with bounded gradient noise, SGD with step sizes satisfying $\sum_t\eta_t = \infty$ and $\sum_t\eta_t^2 < \infty$ converges to the minimizer with probability 1.
:::

:::steps Per-example and mini-batch gradients for fitting $c$ to $\{1, 2, 6\}$ at $c = 0$
1. Per-example gradients $c - x_i$: $-1$, $-2$, $-6$.
2. Full gradient: their average, $-3$, which equals $c - \bar x$.
3. Batch $\{1, 6\}$: $-3.5$; batch $\{1, 2\}$: $-1.5$. Averaged over all three possible pairs: $(-1.5 - 3.5 - 4)/3 = -3$. Unbiased.
:::

:::steps How big a batch to cut the noise?
1. Suppose a single example's gradient has standard deviation $\sigma = 2$.
2. With $B = 16$, the batch gradient has standard deviation $2/\sqrt{16} = 0.5$.
3. To reach $0.25$ you need $\sqrt B = 8$, so $B = 64$: four times the batch for half the noise.
:::

:::mock Exam question
A dataset has 60,000 examples and you train with batch size 200 for 10 epochs. (a) How many update steps is that? (b) If a single-example gradient coordinate has standard deviation 3, what is the standard deviation of the batch estimate? (c) You switch to batch size 800. By the linear scaling rule, what learning rate should replace $\eta = 0.01$? (d) With cosine decay from $\eta_{\max} = 0.04$ to $\eta_{\min} = 0$ over the whole run, what is the rate halfway through?
:::solution
(a) $60000/200 = 300$ steps per epoch, so 3000 steps.
(b) $3/\sqrt{200}\approx0.212$.
(c) The batch grew by a factor of 4, so $\eta = 0.04$.
(d) At $t = T/2$, $\cos\frac\pi2 = 0$, so $\eta = \frac12(0.04 + 0) = 0.02$.
:::
:::

:::ml
Essentially all deep networks are trained with mini-batch methods. When a desired batch does not fit in GPU memory, **gradient accumulation** sums the gradients of several smaller batches before one update, giving the same mean gradient. Large language models use warmup followed by cosine or linear decay.
:::

:::cs
SGD is an online algorithm: it processes data in a stream and needs memory only for the current batch, so it scales to datasets far larger than memory. Data loaders shuffle with a buffer and prefetch batches in parallel with computation.
:::

:::real
Opinion polls work on the same principle. A random sample of 1000 people estimates a national percentage with a margin of error of about 3 points, and quadrupling the sample to 4000 only halves that margin, the same $1/\sqrt B$ law that governs mini-batch noise.
:::

:::quiz
? Doubling the batch size divides the standard deviation of the gradient estimate by about...
+ $\sqrt2$
- 2
- 4
> Standard deviation scales like $1/\sqrt B$.

? A dataset has 1000 examples and the batch size is 50. How many steps are in one epoch?
= 20
> $1000/50 = 20$.

? Single-example gradients have standard deviation 4. What is the standard deviation of a batch of 16?
= 1
> $4/\sqrt{16} = 1$.

? Which step-size sequence satisfies the Robbins-Monro conditions?
+ $\eta_t = 1/t$
- $\eta_t = 0.1$ for all $t$
- $\eta_t = 1/t^2$
> $\sum1/t$ diverges and $\sum1/t^2$ converges. A constant fails the second condition, and $1/t^2$ fails the first.

? With cosine decay from $\eta_{\max}$ to $\eta_{\min}$, what is the rate at the final step $t = T$?
+ $\eta_{\min}$
- $\eta_{\max}$
- $(\eta_{\max} + \eta_{\min})/2$
> $\cos\pi = -1$, so the bracket is 0.

? Why does SGD with a constant learning rate not settle exactly at the minimum?
+ The gradient noise keeps moving the parameters even where the true gradient is zero.
- The true gradient is biased.
- It always diverges.
> Near the minimum the noise dominates, so the iterates jitter in a region whose size scales with $\eta$.
:::

## Lesson: Momentum, RMSProp, Adam and AdamW {#adam}
@summary: Optimizers that remember past gradients (momentum), adapt the step size of each parameter (RMSProp), combine both with bias correction (Adam), and decouple weight decay (AdamW).

### The problem with plain gradient descent
In the last two lessons we saw that plain gradient descent struggles in long narrow valleys: the steep direction forces a small learning rate, which leaves the gentle direction crawling, and the path zig-zags. Deep learning losses are full of such valleys, and different parameters can have gradients that differ in size by factors of a thousand. The optimizers in this lesson fix both problems with two simple ideas: **remember** the recent gradients, and **rescale** each parameter's step by how large its gradients usually are.

Imagine pushing a heavy shopping trolley down a bumpy, slightly sloping car park. Small bumps knock it left and right, but its weight smooths them out, and on a steady slope it gathers speed. That is momentum. Now imagine each wheel has its own suspension that stiffens on rough ground and loosens on smooth ground. That is the per-parameter adaptation of RMSProp. Adam is a trolley with both.

### Momentum
Momentum keeps a **velocity** $\mathbf v$, a running sum of past gradients that slowly forgets:
$$\mathbf v\leftarrow\beta\mathbf v + \mathbf g,\qquad\theta\leftarrow\theta - \eta\mathbf v$$
where $\mathbf g$ is the current gradient and $\beta$ (typically $0.9$) controls the memory. If the gradient keeps pointing the same way, the velocity grows. With $g = 1$ every step and $\beta = 0.9$, the velocity goes $1, 1.9, 2.71, 3.44, \ldots$ and approaches $1/(1 - \beta) = 10$. So along a consistent slope the effective learning rate is ten times larger. If the gradient alternates, $+1, -1, +1, \ldots$, the velocity goes $1, -0.1, 0.91, -0.18, \ldots$, staying small because the contributions cancel. In a ravine, the zig-zag component across the valley alternates and is damped, while the steady component along the valley accumulates. That is exactly what we wanted.

A popular variant, **Nesterov momentum**, evaluates the gradient at the look-ahead point $\theta - \eta\beta\mathbf v$ instead of at $\theta$, which corrects overshoots slightly earlier.

:::def Momentum
An optimizer that keeps an exponentially decaying sum of past gradients, $\mathbf v\leftarrow\beta\mathbf v + \mathbf g$, and steps along it, $\theta\leftarrow\theta - \eta\mathbf v$. It accelerates along consistent directions and damps oscillations.
:::

### RMSProp: a step size for every parameter
Suppose one weight always has gradients near $100$ and another near $0.01$. A single learning rate is too big for the first or too small for the second. RMSProp keeps a running average of each parameter's **squared** gradient and divides by its square root:
$$\mathbf s\leftarrow\rho\mathbf s + (1 - \rho)\mathbf g^2,\qquad\theta\leftarrow\theta - \eta\frac{\mathbf g}{\sqrt{\mathbf s} + \epsilon}$$
All operations are elementwise, and $\epsilon$ (such as $10^{-8}$) prevents division by zero. Dividing a gradient by its typical size makes the step roughly $\eta$ for both weights in the example, whatever the scale of their gradients. In a ravine, the steep direction has large squared gradients and so gets a smaller step, while the gentle direction gets a larger one, which reduces the condition-number problem.

### Adam: momentum plus RMSProp
Adam (adaptive moment estimation) keeps both a running mean of gradients $\mathbf m$ (the first moment) and a running mean of squared gradients $\mathbf v$ (the second moment):
$$\mathbf m\leftarrow\beta_1\mathbf m + (1 - \beta_1)\mathbf g,\qquad\mathbf v\leftarrow\beta_2\mathbf v + (1 - \beta_2)\mathbf g^2$$
$$\hat{\mathbf m} = \frac{\mathbf m}{1 - \beta_1^t},\qquad\hat{\mathbf v} = \frac{\mathbf v}{1 - \beta_2^t},\qquad\theta\leftarrow\theta - \eta\frac{\hat{\mathbf m}}{\sqrt{\hat{\mathbf v}} + \epsilon}$$
The defaults $\beta_1 = 0.9$, $\beta_2 = 0.999$, $\epsilon = 10^{-8}$ and $\eta = 10^{-3}$ work surprisingly often.

The hats are **bias corrections**. Both averages start at zero, so early on they are too small. After the first step with gradient $g = 4$: $m = 0.1\times4 = 0.4$ and $v = 0.001\times16 = 0.016$. Dividing by $1 - 0.9 = 0.1$ and $1 - 0.999 = 0.001$ gives $\hat m = 4$ and $\hat v = 16$, the right values. The first step is then $\eta\cdot4/\sqrt{16} = \eta$. In fact Adam's first step is $\eta$ times the sign of the gradient for every parameter, and later steps are typically no larger than about $\eta$. This makes the learning rate a natural "how far should each weight move per step" setting.

:::def Adam
An optimizer that maintains bias-corrected exponential moving averages of the gradient and the squared gradient for each parameter, and steps by $\eta\,\hat{\mathbf m}/(\sqrt{\hat{\mathbf v}} + \epsilon)$.
:::

### Weight decay and AdamW
A common regularizer is the L2 penalty $\frac\lambda2\|\theta\|^2$, whose gradient is $\lambda\theta$. In plain SGD, adding it gives $\theta\leftarrow\theta - \eta(\mathbf g + \lambda\theta) = (1 - \eta\lambda)\theta - \eta\mathbf g$: the weights shrink by a constant factor every step, which is why it is called **weight decay**. In Adam, however, adding $\lambda\theta$ to the gradient sends it through the division by $\sqrt{\hat{\mathbf v}}$, so weights with large gradients are barely decayed at all. **AdamW** fixes this by applying the decay directly to the weights, separately from the adaptive step:
$$\theta\leftarrow\theta - \eta\left(\frac{\hat{\mathbf m}}{\sqrt{\hat{\mathbf v}} + \epsilon} + \lambda\theta\right)$$
This "decoupled" weight decay regularizes every weight equally and is the default for training transformers.

:::def Weight decay
Shrinking the weights toward zero by a small fraction each step, $\theta\leftarrow(1 - \eta\lambda)\theta$, as a regularizer. In SGD it is equivalent to an L2 penalty; in adaptive methods it is not, which is why AdamW applies it separately.
:::

### Which optimizer should you use?
Adam or AdamW is the usual default because it needs little tuning and handles parameters of very different scales. SGD with momentum is still popular for image classifiers, where it sometimes generalizes slightly better with a well-tuned schedule. Both still need a learning-rate schedule and warmup.

:::warn Common mistakes
Forgetting bias correction, which makes the first steps much too large because $\hat{\mathbf v}$ is underestimated more than $\hat{\mathbf m}$. Using Adam's L2 penalty and expecting it to behave like weight decay; use AdamW. Reusing SGD's learning rate (such as $0.1$) for Adam, whose steps are about $\eta$ per weight and which therefore needs something like $10^{-3}$. Thinking momentum $\beta = 0.99$ is "a little more" than $0.9$: it multiplies the effective step by 100 instead of 10.
:::

### Summary
Momentum averages gradients over time, speeding up consistent directions and damping oscillations, with an effective step of $\eta/(1 - \beta)$ on steady slopes. RMSProp divides by the root mean square of recent gradients, giving each parameter its own scale. Adam combines both with bias correction, so each step moves each weight by roughly $\eta$. AdamW decouples weight decay from the adaptive step.

@viz gd surface=rosen lr=0.002 | The Rosenbrock banana valley, with its minimum at $(1, 1)$. Compare Plain GD, Momentum and Adam from the same start.

:::explore
**What to try**
1. Run Plain GD with $\eta = 0.002$ for 150 steps and note the final position and loss.
2. Reset, choose Momentum and run with the same $\eta$. Compare how far along the curved valley it gets.
3. Choose Adam. Its steps are about $\eta$ in each coordinate, so raise $\eta$ to around $0.02$ to $0.05$ and run.
4. Drag the start point to the other side of the valley and repeat the comparison.

**What to notice:** plain GD reaches the valley floor quickly and then crawls along it, the condition-number problem from the article. Momentum builds speed along the floor, and Adam rescales each coordinate so that the gentle direction no longer moves at a crawl.
:::

:::formulas
$$\text{Momentum: }\mathbf v\leftarrow\beta\mathbf v + \mathbf g,\quad\theta\leftarrow\theta - \eta\mathbf v$$
$$\text{RMSProp: }\mathbf s\leftarrow\rho\mathbf s + (1 - \rho)\mathbf g^2,\quad\theta\leftarrow\theta - \eta\,\mathbf g/(\sqrt{\mathbf s} + \epsilon)$$
$$\text{Adam: }\mathbf m\leftarrow\beta_1\mathbf m + (1 - \beta_1)\mathbf g,\ \mathbf v\leftarrow\beta_2\mathbf v + (1 - \beta_2)\mathbf g^2,\ \hat{\mathbf m} = \tfrac{\mathbf m}{1 - \beta_1^t},\ \hat{\mathbf v} = \tfrac{\mathbf v}{1 - \beta_2^t}$$
$$\theta\leftarrow\theta - \eta\frac{\hat{\mathbf m}}{\sqrt{\hat{\mathbf v}} + \epsilon}\qquad\text{AdamW: add }-\eta\lambda\theta\text{ separately}$$
:::

:::thm Momentum on a constant gradient
If $\mathbf g$ is constant and $\mathbf v_0 = \mathbf 0$, then $\mathbf v_t = \frac{1 - \beta^t}{1 - \beta}\mathbf g\to\frac{\mathbf g}{1 - \beta}$, so the effective learning rate approaches $\eta/(1 - \beta)$.
:::

:::proof Proof
Unrolling, $\mathbf v_t = \mathbf g(1 + \beta + \cdots + \beta^{t-1})$, a geometric series with sum $\frac{1 - \beta^t}{1 - \beta}$. For $0\le\beta < 1$, $\beta^t\to0$.
:::

:::thm Adam's bias correction
If the gradients have constant mean $\mathbb E[\mathbf g_t] = \mu$ and $\mathbf m_0 = \mathbf 0$, then $\mathbb E[\mathbf m_t] = (1 - \beta_1^t)\mu$, so $\mathbb E[\hat{\mathbf m}_t] = \mu$. The same holds for $\mathbf v_t$ and the mean squared gradient.
:::

:::proof Proof
$\mathbf m_t = (1 - \beta_1)\sum_{k=1}^t\beta_1^{t-k}\mathbf g_k$. Taking expectations, $\mathbb E[\mathbf m_t] = (1 - \beta_1)\mu\sum_{j=0}^{t-1}\beta_1^j = (1 - \beta_1^t)\mu$.
:::

:::steps Momentum velocities with $\beta = 0.9$ and a constant gradient $g = 1$
1. $v_1 = 1$, $v_2 = 0.9 + 1 = 1.9$, $v_3 = 1.71 + 1 = 2.71$.
2. By the theorem, $v_t = 10(1 - 0.9^t)$; check $v_3 = 10(1 - 0.729) = 2.71$.
3. In the long run the step is $10\eta$: momentum $0.9$ acts like a tenfold learning rate on steady slopes.
:::

:::steps Adam's first step for two very different gradients, $g = 4$ and $g = 0.01$
1. For $g = 4$: $\hat m = 4$, $\hat v = 16$, step $\eta\cdot4/4 = \eta$.
2. For $g = 0.01$: $\hat m = 0.01$, $\hat v = 0.0001$, step $\eta\cdot0.01/0.01 = \eta$ (ignoring $\epsilon$).
3. Both weights move by $\eta$ in the downhill direction: Adam's first step is $\eta$ times the sign of the gradient.
:::

:::steps Show that L2 regularization in SGD is weight decay
1. Loss with penalty: $f(\theta) + \frac\lambda2\|\theta\|^2$, gradient $\mathbf g + \lambda\theta$.
2. SGD step: $\theta - \eta(\mathbf g + \lambda\theta) = (1 - \eta\lambda)\theta - \eta\mathbf g$.
3. With $\eta = 0.1$ and $\lambda = 0.01$ the weights are multiplied by $0.999$ every step before the gradient update.
:::

:::mock Exam question
A single parameter starts at $\theta_0 = 1$ and receives gradient $g = 2$ on each of the first two steps. Use Adam with $\beta_1 = 0.9$, $\beta_2 = 0.999$, $\eta = 0.001$ and ignore $\epsilon$. (a) Compute $m$, $v$, $\hat m$, $\hat v$ and $\theta$ after each step. (b) What would the first step be without bias correction?
:::solution
(a) Step 1: $m = 0.2$, $v = 0.004$, $\hat m = 0.2/0.1 = 2$, $\hat v = 0.004/0.001 = 4$, step $0.001\cdot2/2 = 0.001$, so $\theta_1 = 0.999$.
Step 2: $m = 0.18 + 0.2 = 0.38$, $v = 0.003996 + 0.004 = 0.007996$, $\hat m = 0.38/0.19 = 2$, $\hat v = 0.007996/0.001999 = 4$, so $\theta_2 = 0.998$.
(b) $0.001\cdot0.2/\sqrt{0.004}\approx0.001\cdot0.2/0.0632\approx0.00316$, more than three times too large, because the uncorrected second moment is far too small.
:::
:::

:::ml
AdamW with warmup and cosine decay trains almost every transformer; large language models often use $\beta_2 = 0.95$ for extra stability. SGD with momentum $0.9$ remains standard for many convolutional networks. Learning-rate warmup is especially important for Adam, because $\hat{\mathbf v}$ is a poor estimate in the first steps.
:::

:::cs
Adam stores two extra numbers per parameter. For a 7-billion-parameter model in 32-bit floats that is $2\times7\times10^9\times4$ bytes, about 56 GB just for optimizer state, which is why memory-saving optimizers and sharded optimizer states are active engineering topics.
:::

:::real
Financial charts use exponential moving averages, exactly the update $m\leftarrow\beta m + (1 - \beta)g$, to smooth noisy daily prices and reveal the trend. Traders face the same trade-off as momentum: a larger $\beta$ smooths more but reacts more slowly when the trend changes.
:::

:::quiz
? In Adam, $\beta_1$ controls the averaging of...
+ gradients (the first moment)
- squared gradients
- the learning rate
> $\beta_2$ controls the squared gradients.

? With momentum $\beta = 0.9$ and a constant gradient, the long-run step is how many times $\eta g$?
= 10
> $1/(1 - \beta) = 10$.

? Momentum with $\beta = 0.5$ and gradient $g = 1$ on both of the first two steps, starting from $v = 0$. What is $v$ after two steps?
= 1.5|3/2
> $v_1 = 1$, $v_2 = 0.5 + 1 = 1.5$.

? Ignoring $\epsilon$, what is the size of Adam's first step when $\eta = 0.01$ and $g = -3$?
= 0.01|1/100
> The first step is $\eta$ times the sign of the gradient, whatever its size.

? What does RMSProp do to a parameter whose gradients are consistently large?
+ Gives it a smaller effective step
- Gives it a larger effective step
- Freezes it
> It divides by the root mean square of recent gradients.

? Why was AdamW introduced?
+ Adding an L2 term to Adam's gradient gets rescaled by $\sqrt{\hat{\mathbf v}}$, so decay is uneven; AdamW applies it directly.
- Adam cannot be used with mini-batches.
- Adam has no learning rate.
> Decoupled weight decay shrinks every weight by the same factor $1 - \eta\lambda$.
:::

## Lesson: Newton's method and second-order methods {#newton}
@summary: Use curvature as well as slope: fit a local parabola and jump to its bottom. Quadratic convergence, its costs, and the quasi-Newton methods that make it practical.

### Using the curvature
Gradient descent only knows the slope, so it must guess how far to step; that guess is the learning rate. Suppose you also knew how quickly the slope changes, the curvature. Then you could fit a parabola to the function at your current point and jump straight to the parabola's lowest point. That is Newton's method. Where it works, it is astonishingly fast: the number of correct digits roughly doubles every step.

Imagine sliding a hockey puck toward a target. If you only know the direction, you push and hope. If you also know how quickly the ice slows the puck, you can compute exactly how hard to push. Curvature plays the role of that extra knowledge.

### Newton's method for roots
Newton's method was first a way to solve equations $f(x) = 0$. At the current guess $x_n$, replace $f$ by its tangent line $f(x_n) + f'(x_n)(x - x_n)$ and find where that line crosses zero:
$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$
For $\sqrt2$, solve $x^2 - 2 = 0$, so the update is $x\leftarrow x - \frac{x^2 - 2}{2x}$. From $x_0 = 1$: $x_1 = 1.5$, $x_2 = 1.41667$, $x_3 = 1.4142157$. The true value is $1.4142136$. The errors are about $0.4$, $0.09$, $0.0025$ and $0.000002$: each is roughly the square of the one before (times a constant). This is **quadratic convergence**.

:::def Quadratic convergence
A sequence converges quadratically to $x^*$ if $|x_{n+1} - x^*|\le C|x_n - x^*|^2$ for some constant $C$ once $x_n$ is close enough. Roughly, the number of correct digits doubles every step.
:::

### Newton's method for minimization
To minimize $f$, find a root of $f'$. Applying the same idea to $f'$ gives
$$x_{n+1} = x_n - \frac{f'(x_n)}{f''(x_n)}$$
which is exactly the bottom of the parabola $f(x_n) + f'(x_n)(x - x_n) + \frac12f''(x_n)(x - x_n)^2$. Try $f(x) = x - \ln x$ for $x > 0$, whose minimum is at $x = 1$. Here $f'(x) = 1 - 1/x$ and $f''(x) = 1/x^2$, so the update simplifies to $x\leftarrow2x - x^2$. From $x_0 = 0.5$: $0.75$, $0.9375$, $0.99609$. The errors $0.5$, $0.25$, $0.0625$, $0.0039$ are each exactly the square of the previous one, because $1 - (2x - x^2) = (1 - x)^2$.

Compare this with gradient descent. Newton's step is gradient descent with learning rate $1/f''(x)$: the curvature picks the step size automatically. That is why, for a quadratic, Newton's method lands on the minimum in a single step from anywhere.

### Many dimensions
In $n$ dimensions the curvature is the Hessian matrix $H = \nabla^2f$, and the parabola becomes the quadratic model $f(\theta) + \nabla f^T\mathbf d + \frac12\mathbf d^TH\mathbf d$. Setting its gradient to zero gives the **Newton step**:
$$H\mathbf d = -\nabla f,\qquad\theta\leftarrow\theta + \mathbf d$$
In practice you solve this linear system rather than computing $H^{-1}$. Because Newton's method rescales every direction by its own curvature, a long narrow valley is no harder than a round bowl: the condition number that slowed gradient descent no longer matters.

:::def Newton step
The step $\mathbf d$ solving $\nabla^2f(\theta)\,\mathbf d = -\nabla f(\theta)$; it moves to the minimum of the local quadratic model of $f$.
:::

### Why not always use Newton?
Three problems. First, **cost**: for $n$ parameters the Hessian has $n^2$ entries and solving the system takes about $n^3$ operations. With a million parameters that is $10^{12}$ entries, about 8 terabytes in double precision. Second, **direction**: if the Hessian is not positive definite, as at a saddle point or far from a minimum of a non-convex function, the "bottom of the parabola" may be a maximum or a saddle, and the step can go uphill. Third, **distance**: far from the minimum the quadratic model may be poor and the full step may overshoot wildly. Practical versions add a line search, or use $(H + \lambda I)\mathbf d = -\nabla f$ (the Levenberg-Marquardt idea), which blends Newton with gradient descent.

### Quasi-Newton methods
**Quasi-Newton** methods keep most of Newton's speed without ever forming the Hessian. They watch how the gradient changes between steps. If the step was $\mathbf s = \theta_{t+1} - \theta_t$ and the gradient changed by $\mathbf y = \nabla f_{t+1} - \nabla f_t$, then the true Hessian approximately satisfies $H\mathbf s\approx\mathbf y$ (the **secant condition**). **BFGS** updates an approximation of $H^{-1}$ to satisfy it exactly at each step. **L-BFGS** stores only the last few pairs $(\mathbf s, \mathbf y)$, typically 5 to 20, so its memory is linear in $n$. For least-squares problems, the **Gauss-Newton** method uses $J^TJ$, built from the Jacobian of the residuals, as a positive semidefinite stand-in for the Hessian.

:::def Quasi-Newton method
An optimization method that builds an approximation of the Hessian (or its inverse) from successive gradient differences, such as BFGS and L-BFGS, achieving fast convergence without computing second derivatives.
:::

:::warn Common mistakes
Computing $H^{-1}$ explicitly instead of solving $H\mathbf d = -\nabla f$. Taking full Newton steps far from the minimum, where the quadratic model is unreliable. Using pure Newton on non-convex functions, where it can converge to maxima or saddles. Confusing Newton for roots ($f/f'$) with Newton for minimization ($f'/f''$).
:::

### Summary
Newton's method fits a local quadratic using the Hessian and jumps to its minimum, solving $H\mathbf d = -\nabla f$. Near a minimum with positive definite Hessian it converges quadratically, and it solves quadratics in one step regardless of conditioning. Its costs ($n^2$ memory, $n^3$ time) and its behaviour on non-convex functions limit it to small or medium problems; quasi-Newton methods such as L-BFGS approximate it cheaply.

@viz newton | Each step follows the tangent line down to the axis. Watch how quickly the digits settle.

:::explore
**What to try**
1. With $f(x) = x^2 - 2$, drag the start to $x_0 = 1$ and press Step four times. Compare the iterates with $1.5$, $1.41667$, $1.4142157$ from the article.
2. Start far away, at $x_0 = 3$, and count how many steps it takes to get 8 correct digits.
3. Choose $\cos x - x$ and step from a few different starts.
4. Choose $x^3 - 2x + 2$ and start at $x_0 = 0$. The iterates jump to 1 and back to 0 forever.

**What to notice:** once close, the number of correct digits roughly doubles each step, the quadratic convergence of the article. The last function shows the other side: from a bad start Newton's method can cycle or wander, which is why practical versions add safeguards such as line searches.
:::

:::formulas
$$\text{roots: }x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}\qquad\text{minimization: }x_{n+1} = x_n - \frac{f'(x_n)}{f''(x_n)}$$
$$\nabla^2f(\theta)\,\mathbf d = -\nabla f(\theta),\qquad\theta\leftarrow\theta + \mathbf d$$
$$|x_{n+1} - x^*|\le C|x_n - x^*|^2\qquad\text{(quadratic convergence)}$$
$$\text{secant: }B_{t+1}\mathbf s_t = \mathbf y_t,\ \mathbf s_t = \theta_{t+1} - \theta_t,\ \mathbf y_t = \nabla f_{t+1} - \nabla f_t\qquad\text{Gauss-Newton: }H\approx J^TJ$$
:::

:::thm Newton solves quadratics in one step
If $f(\theta) = \frac12\theta^TA\theta - \mathbf b^T\theta$ with $A$ positive definite, one Newton step from any $\theta$ lands on the minimizer $A^{-1}\mathbf b$.
:::

:::proof Proof
$\nabla f = A\theta - \mathbf b$ and $\nabla^2f = A$. The Newton step gives $\theta - A^{-1}(A\theta - \mathbf b) = A^{-1}\mathbf b$, where the gradient is zero.
:::

:::thm Local quadratic convergence
If $f'(x^*) = 0$, $f''(x^*) > 0$ and $f''$ is Lipschitz near $x^*$, then Newton's method started close enough to $x^*$ converges quadratically.
:::

:::proof Sketch
Let $e_n = x_n - x^*$. Taylor expansion gives $0 = f'(x^*) = f'(x_n) - f''(x_n)e_n + O(e_n^2)$. Dividing by $f''(x_n)$, $e_n - \frac{f'(x_n)}{f''(x_n)} = O(e_n^2)$, and the left side is $e_{n+1}$.
:::

:::steps Newton's method for $\sqrt2$ from $x_0 = 1$
1. $f(x) = x^2 - 2$, $f'(x) = 2x$: $x_1 = 1 - \frac{-1}2 = 1.5$.
2. $x_2 = 1.5 - \frac{0.25}3 = 1.41667$.
3. $x_3 = 1.41667 - \frac{0.0069444}{2.83333}\approx1.4142157$, already correct to 5 decimal places.
:::

:::steps Minimize $f(x) = x - \ln x$ from $x_0 = 0.5$
1. $f'(x) = 1 - 1/x$ and $f''(x) = 1/x^2$, so $x - f'/f'' = x - (x^2 - x) = 2x - x^2$.
2. $x_1 = 0.75$, $x_2 = 0.9375$, $x_3 = 0.99609$.
3. The error squares exactly: $1 - x_{n+1} = (1 - x_n)^2$.
:::

:::steps One Newton step for $f(x, y) = x^2 + xy + y^2 - 3x$ from $(0, 0)$
1. Gradient $(2x + y - 3,\ x + 2y) = (-3, 0)$; Hessian $H = \begin{bmatrix}2 & 1\\1 & 2\end{bmatrix}$.
2. Solve $H\mathbf d = (3, 0)$: $H^{-1} = \frac13\begin{bmatrix}2 & -1\\-1 & 2\end{bmatrix}$, so $\mathbf d = (2, -1)$.
3. New point $(2, -1)$: gradient $(4 - 1 - 3,\ 2 - 2) = (0, 0)$. The minimum in one step, since $f$ is quadratic.
:::

:::mock Exam question
Let $f(x) = e^x - 2x$. (a) Find the minimizer exactly. (b) Write the Newton update and run three steps from $x_0 = 0$. (c) Run one step of gradient descent from $x_0 = 0$ with $\eta = 0.5$ and compare. (d) Why is Newton's method not used directly for a network with $10^6$ parameters?
:::solution
(a) $f'(x) = e^x - 2 = 0$ at $x = \ln2\approx0.6931$, and $f'' = e^x > 0$, so it is the minimum.
(b) $x\leftarrow x - \frac{e^x - 2}{e^x} = x - 1 + 2e^{-x}$. $x_1 = 1$, $x_2 = 2/e\approx0.7358$, $x_3\approx-0.2642 + 2(0.4791)\approx0.6940$.
(c) $x_1 = 0 - 0.5(1 - 2) = 0.5$, still $0.19$ away, while Newton is $0.0009$ away after three steps.
(d) The Hessian would have $10^{12}$ entries (about 8 TB) and solving with it costs about $10^{18}$ operations; quasi-Newton or first-order methods are used instead.
:::
:::

:::ml
L-BFGS is the default solver for logistic regression in scikit-learn and is widely used for small and medium smooth problems. Deep learning uses cheaper curvature ideas: Hessian-vector products computed by autodiff, diagonal approximations, and structured approximations such as K-FAC and Shampoo. Adam's division by $\sqrt{\hat{\mathbf v}}$ can be seen as a crude diagonal curvature correction.
:::

:::cs
Processors and math libraries compute square roots and reciprocals with Newton iterations: $x\leftarrow x(2 - ax)$ converges quadratically to $1/a$ using only multiplications. The famous "fast inverse square root" trick in early 3D games used one Newton step after a clever initial guess.
:::

:::real
A GPS receiver computes its position by solving nonlinear equations relating its unknown location and clock error to the measured distances from several satellites. It does so with a few Gauss-Newton iterations, which converge so fast that the position updates many times per second.
:::

:::quiz
? Newton's method for $\sqrt2$ (root of $x^2 - 2$) from $x = 1$. What is the next iterate?
= 1.5|3/2
> $1 - \frac{1 - 2}{2} = 1.5$.

? Newton's method minimizes $f(x) = x^2 - 4x + 1$ starting from $x = 10$. Where is it after one step?
= 2
> A quadratic is minimized in one Newton step: $10 - \frac{16}2 = 2$.

? Newton's minimization step is equivalent to gradient descent with learning rate...
+ $1/f''(x)$
- $f''(x)$
- $f'(x)$
> $x - f'(x)/f''(x)$.

? What can go wrong if the Hessian has a negative eigenvalue?
+ The Newton step may move toward a maximum or saddle.
- Nothing; Newton always decreases $f$.
- The gradient becomes zero.
> The quadratic model has no minimum along that direction.

? If the error is $10^{-3}$ and convergence is quadratic with $C = 1$, what is the error after one more step?
= 0.000001|1/1000000
> $(10^{-3})^2 = 10^{-6}$.

? What does L-BFGS store instead of the Hessian?
+ The last few step and gradient-change pairs
- The full inverse Hessian
- Only the current gradient
> A handful of $(\mathbf s, \mathbf y)$ pairs gives memory linear in $n$.
:::

# Unit: Constraints, duality and practice

## Lesson: Constrained optimization, Lagrange multipliers, duality and KKT {#kkt}
@summary: Optimize subject to equality and inequality constraints with Lagrange multipliers, understand multipliers as prices, the dual problem, and the KKT conditions.

### Optimizing with rules attached
Most real decisions come with limits. You want the best laptop you can buy with 800 euros, the strongest bridge you can build with a fixed amount of steel, or the most accurate classifier whose weights are not too large. In each case the best unconstrained answer is usually not allowed, and the real optimum sits on the boundary of what is permitted. This lesson develops the standard tools for such problems: Lagrange multipliers for equality constraints, the KKT conditions for inequality constraints, and duality, which looks at the same problem from the point of view of prices.

### Equality constraints and parallel gradients
Imagine walking along a circular path on a hillside, trying to reach the highest point of the path, not of the hill. While you walk, the height changes unless your direction of travel is level. At the highest point on the path, moving along the path does not change your height to first order: the uphill direction (the gradient of the height) must be perpendicular to the path. The gradient of the constraint function is also perpendicular to the path. So at the optimum, the two gradients are parallel.

Formally, to optimize $f(\mathbf x)$ subject to $h(\mathbf x) = 0$, we look for points where $\nabla f(\mathbf x) + \mu\nabla h(\mathbf x) = \mathbf 0$ for some number $\mu$, together with $h(\mathbf x) = 0$. Packaging this with the **Lagrangian**
$$\mathcal L(\mathbf x, \mu) = f(\mathbf x) + \mu\,h(\mathbf x)$$
the conditions are simply that all partial derivatives of $\mathcal L$ are zero. The number $\mu$ is the **Lagrange multiplier**.

Try it: minimize $x^2 + y^2$ subject to $x + y = 2$. The Lagrangian is $x^2 + y^2 + \mu(x + y - 2)$. Setting derivatives to zero gives $2x + \mu = 0$ and $2y + \mu = 0$, so $x = y$, and the constraint forces $x = y = 1$ with $\mu = -2$. The minimum value is 2: the closest point to the origin on the line.

:::def Lagrangian
For $\min f(\mathbf x)$ subject to $g_i(\mathbf x)\le0$ and $h_j(\mathbf x) = 0$, the function $\mathcal L(\mathbf x, \boldsymbol\lambda, \boldsymbol\mu) = f(\mathbf x) + \sum_i\lambda_ig_i(\mathbf x) + \sum_j\mu_jh_j(\mathbf x)$. The numbers $\lambda_i$ and $\mu_j$ are Lagrange multipliers.
:::

### Multipliers are prices
The multiplier has a meaning. If we relax the constraint to $x + y = c$, the optimum is $x = y = c/2$ with value $f^*(c) = c^2/2$, whose derivative at $c = 2$ is 2. That is $-\mu$. In general, the multiplier tells you how much the optimal value would change per unit of relaxation of the constraint. Economists call it a **shadow price**: how much you should be willing to pay for one more unit of a limited resource.

### Inequality constraints
Now the constraint is $g(\mathbf x)\le0$. Two things can happen at the optimum. Either the constraint is **inactive** ($g < 0$): the optimum is inside the allowed region, the constraint does not matter, and its multiplier is $\lambda = 0$. Or it is **active** ($g = 0$): the optimum is pressed against the boundary, and the gradient of $f$ must point "outward", so that moving inward would increase $f$. This is expressed by $\lambda\ge0$ in the condition $\nabla f + \lambda\nabla g = \mathbf 0$. Both cases are summarized by **complementary slackness**: $\lambda\,g(\mathbf x) = 0$.

Example: minimize $(x - 3)^2$ subject to $x\le1$, that is $g = x - 1\le0$. The unconstrained minimum $x = 3$ is not allowed, so the constraint is active and $x = 1$. Stationarity $2(x - 3) + \lambda = 0$ gives $\lambda = 4\ge0$, as required. If instead the constraint were $x\le5$, the unconstrained minimum $x = 3$ would be allowed, the constraint would be inactive, and $\lambda = 0$.

### The KKT conditions
For $\min f$ subject to $g_i\le0$ and $h_j = 0$, the **Karush-Kuhn-Tucker (KKT) conditions** are: stationarity, $\nabla f + \sum_i\lambda_i\nabla g_i + \sum_j\mu_j\nabla h_j = \mathbf 0$; primal feasibility, $g_i\le0$ and $h_j = 0$; dual feasibility, $\lambda_i\ge0$; and complementary slackness, $\lambda_ig_i = 0$ for every $i$. Under mild regularity assumptions they are necessary at any optimum, and for convex problems they are also sufficient. To solve small problems by hand, guess which constraints are active, solve the resulting equations, and check that all conditions hold.

:::def Complementary slackness
The KKT condition $\lambda_ig_i(\mathbf x^*) = 0$: for each inequality constraint, either the constraint is tight or its multiplier is zero.
:::

### Duality
Duality turns a constrained minimization into a maximization over multipliers. The **dual function** is $q(\boldsymbol\lambda, \boldsymbol\mu) = \min_{\mathbf x}\mathcal L(\mathbf x, \boldsymbol\lambda, \boldsymbol\mu)$. For any $\boldsymbol\lambda\ge\mathbf 0$, $q$ is a lower bound on the optimal value $f^*$; this is **weak duality**. The **dual problem** finds the best such bound, $\max_{\boldsymbol\lambda\ge0,\boldsymbol\mu}q$. For convex problems satisfying a mild condition (Slater's condition: some strictly feasible point exists), the bound is tight, $\max q = f^*$, which is **strong duality**.

For example, minimize $x^2$ subject to $x\ge1$, written as $g = 1 - x\le0$. Then $\mathcal L = x^2 + \lambda(1 - x)$, minimized at $x = \lambda/2$, giving $q(\lambda) = \lambda - \lambda^2/4$. This is maximized at $\lambda = 2$ with $q = 1$, which equals the primal optimum $f(1) = 1$.

:::warn Common mistakes
Allowing negative multipliers on inequality constraints written as $g\le0$. Forgetting to check the inactive case, or the active case, when solving by hand. Mixing sign conventions: some texts write $f - \lambda g$, which flips the signs of the multipliers. Applying KKT as sufficient for non-convex problems, where a KKT point can be a saddle or a local optimum only.
:::

### Summary
At a constrained optimum, the gradient of the objective is balanced by a combination of constraint gradients, which the Lagrangian expresses compactly. Multipliers are shadow prices. Inequality constraints add $\lambda\ge0$ and complementary slackness. The KKT conditions collect all of this, and duality gives lower bounds that are tight for well-behaved convex problems.

@viz lagrange | Maximize $f = x + 2y$ on the unit circle. Slide along the constraint and watch the two gradients.

:::explore
**What to try**
1. Move the slider slowly around the circle and watch the value of $f$.
2. Find the position where the arrows for $\nabla f$ and $\nabla g$ line up. The readout reports the optimum, $f = \sqrt5\approx2.236$, at $(1/\sqrt5, 2/\sqrt5)\approx(0.447, 0.894)$.
3. Continue to the opposite side, where the gradients are parallel but point in opposite directions. That is the minimum, $-\sqrt5$.

**What to notice:** at both extremes the gradient of $f$ is perpendicular to the circle, exactly the parallel-gradient condition $\nabla f = \lambda\nabla g$ from the article. Everywhere else $\nabla f$ has a component along the circle, so moving along the path would improve $f$.
:::

:::formulas
$$\mathcal L(\mathbf x, \boldsymbol\lambda, \boldsymbol\mu) = f(\mathbf x) + \sum_i\lambda_ig_i(\mathbf x) + \sum_j\mu_jh_j(\mathbf x)$$
$$\text{KKT: }\nabla f + \sum_i\lambda_i\nabla g_i + \sum_j\mu_j\nabla h_j = \mathbf 0,\quad g_i\le0,\ h_j = 0,\quad\lambda_i\ge0,\quad\lambda_ig_i = 0$$
$$q(\boldsymbol\lambda, \boldsymbol\mu) = \min_{\mathbf x}\mathcal L\le f^*\ \ (\boldsymbol\lambda\ge0)\qquad\text{strong duality: }\max q = f^*$$
$$\frac{df^*}{dc} = -\mu\ \text{ for the constraint }h(\mathbf x) - c = 0$$
:::

:::thm KKT conditions
If $\mathbf x^*$ is a local minimum and a constraint qualification holds (for example, the gradients of the active constraints are linearly independent), then there exist multipliers satisfying the KKT conditions. If the problem is convex ($f$ and $g_i$ convex, $h_j$ affine), any point satisfying the KKT conditions is a global minimum.
:::

:::thm Weak duality
For any $\boldsymbol\lambda\ge\mathbf 0$ and any $\boldsymbol\mu$, $q(\boldsymbol\lambda, \boldsymbol\mu)\le f(\mathbf x)$ for every feasible $\mathbf x$.
:::

:::proof Proof
For feasible $\mathbf x$, $g_i(\mathbf x)\le0$ and $h_j(\mathbf x) = 0$, so with $\lambda_i\ge0$ the extra terms of $\mathcal L$ are $\le0$ and $\mathcal L(\mathbf x, \boldsymbol\lambda, \boldsymbol\mu)\le f(\mathbf x)$. The minimum over all $\mathbf x$ is even smaller: $q\le\mathcal L(\mathbf x, \boldsymbol\lambda, \boldsymbol\mu)\le f(\mathbf x)$.
:::

:::steps Maximize $x + 2y$ subject to $x^2 + y^2 = 1$
1. Stationarity: $(1, 2) = \lambda(2x, 2y)$, so $x = \frac1{2\lambda}$ and $y = \frac1\lambda$.
2. Constraint: $\frac1{4\lambda^2} + \frac1{\lambda^2} = 1$, so $\lambda^2 = \frac54$ and $\lambda = \frac{\sqrt5}2$ for the maximum.
3. $x = \frac1{\sqrt5}$, $y = \frac2{\sqrt5}$, and $f = \frac5{\sqrt5} = \sqrt5\approx2.236$.
:::

:::steps Minimize $(x - 3)^2$ subject to $x\le1$, then subject to $x\le5$
1. With $x\le1$: try inactive ($\lambda = 0$), giving $x = 3$, which is infeasible. Try active: $x = 1$, and $2(1 - 3) + \lambda = 0$ gives $\lambda = 4\ge0$. Optimum $x = 1$, value 4.
2. With $x\le5$: inactive, $x = 3$ is feasible and $\lambda = 0$. Optimum value 0.
3. The multiplier 4 in the first case is the shadow price: relaxing to $x\le1 + \epsilon$ lowers the value by about $4\epsilon$.
:::

:::steps The dual of $\min x^2$ subject to $x\ge1$
1. $\mathcal L = x^2 + \lambda(1 - x)$; minimizing over $x$ gives $x = \lambda/2$.
2. $q(\lambda) = \frac{\lambda^2}4 + \lambda - \frac{\lambda^2}2 = \lambda - \frac{\lambda^2}4$.
3. $q'(\lambda) = 1 - \frac\lambda2 = 0$ at $\lambda = 2$, so $q = 1$, equal to the primal optimum $f(1) = 1$: strong duality.
:::

:::mock Exam question
Maximize $xy$ subject to $x + y\le4$, $x\ge0$, $y\ge0$. (a) Write it as a minimization in standard form with its Lagrangian. (b) Solve the KKT conditions. (c) Interpret the multiplier of $x + y\le4$ and verify it by relaxing the constraint.
:::solution
(a) Minimize $-xy$ subject to $x + y - 4\le0$, $-x\le0$, $-y\le0$; $\mathcal L = -xy + \lambda(x + y - 4) - \nu_1x - \nu_2y$.
(b) At the optimum $x, y > 0$, so $\nu_1 = \nu_2 = 0$. Stationarity: $-y + \lambda = 0$ and $-x + \lambda = 0$, so $x = y = \lambda$. If $\lambda = 0$, then $x = y = 0$, which is not optimal. So the constraint is active: $2\lambda = 4$, $\lambda = 2$, $x = y = 2$, and the maximum is $xy = 4$.
(c) $\lambda = 2$ is the shadow price of the budget. With $x + y\le c$, the optimum is $c^2/4$, whose derivative at $c = 4$ is 2.
:::
:::

:::ml
Support vector machines are solved through their dual. Complementary slackness means only the training points on or inside the margin, the support vectors, have nonzero multipliers, and the dual depends on the data only through inner products, which enables the kernel trick. Lagrangian methods are also used for fairness constraints and constrained reinforcement learning.
:::

:::cs
The max-flow min-cut theorem is an instance of strong duality: the largest flow through a network equals the capacity of its smallest cut. Duality is also the basis of many approximation algorithms, where a dual solution certifies how close a found solution is to optimal.
:::

:::real
In consumer economics, a shopper maximizes satisfaction subject to a budget. The Lagrange multiplier on the budget constraint is the marginal utility of money: how much extra satisfaction one more euro would buy. Electricity markets publish such shadow prices, the cost of supplying one more megawatt-hour at each location, as their actual prices.
:::

:::quiz
? If an inequality constraint is not tight at the optimum, its KKT multiplier is...
= 0
> Complementary slackness: $\lambda_ig_i = 0$ with $g_i < 0$ forces $\lambda_i = 0$.

? For constraints written as $g_i(\mathbf x)\le0$ in a minimization, the multipliers must be...
+ nonnegative
- nonpositive
- zero
> Dual feasibility: $\lambda_i\ge0$.

? What is the minimum of $x^2 + y^2$ subject to $x + y = 4$?
= 8
> By symmetry $x = y = 2$, giving $4 + 4$.

? For $\min(x - 3)^2$ subject to $x\le1$, what is the multiplier $\lambda$?
= 4
> $2(1 - 3) + \lambda = 0$.

? Weak duality says that for any $\boldsymbol\lambda\ge0$ the dual function is...
+ a lower bound on the primal optimum
- an upper bound on the primal optimum
- equal to the primal optimum
> Equality (strong duality) needs extra conditions such as convexity and Slater's condition.

? At a constrained optimum with one equality constraint, the gradients of $f$ and $h$ are...
+ parallel
- perpendicular
- both zero
> $\nabla f = -\mu\nabla h$.
:::

## Lesson: Linear programming {#linear-programming}
@summary: Linear objectives with linear constraints: feasible polygons, the corner-point principle, the simplex method, special cases and LP duality.

### A workshop's production plan
A small workshop makes tables and chairs. Each table earns 3 hundred euros of profit and each chair 2 hundred. Making $x$ tables and $y$ chairs uses $x + y$ units of wood, of which 6 are available per week; $x + 3y$ hours of finishing, of which there are 12; and $2x + y$ hours of cutting, of which there are 10. How many of each should it make? This is a **linear program** (LP): maximize $3x + 2y$ subject to $x + y\le6$, $x + 3y\le12$, $2x + y\le10$, $x\ge0$, $y\ge0$. The objective and every constraint are linear, which makes the problem both very structured and very common: airlines, factories, refineries and delivery companies solve LPs with millions of variables every day.

### Standard form and the feasible region
In general an LP is
$$\max\ \mathbf c^T\mathbf x\quad\text{subject to}\quad A\mathbf x\le\mathbf b,\ \mathbf x\ge\mathbf 0$$
Each inequality cuts the plane (or space) in half along a straight line (or flat plane), and the feasible region is the intersection of these half-spaces: a convex polygon in two dimensions, a **polytope** in general. For the workshop, the region has five corners: $(0, 0)$, $(5, 0)$, $(4, 2)$, $(3, 3)$ and $(0, 4)$. For instance $(4, 2)$ is where the wood line $x + y = 6$ meets the cutting line $2x + y = 10$; subtracting the equations gives $x = 4$, then $y = 2$. It satisfies the finishing constraint too: $4 + 6 = 10\le12$.

:::def Linear program
An optimization problem with a linear objective and linear equality or inequality constraints, such as $\max\mathbf c^T\mathbf x$ subject to $A\mathbf x\le\mathbf b$, $\mathbf x\ge\mathbf 0$.
:::

:::def Vertex (corner point)
A point of the feasible polytope that is not between two other feasible points; in $n$ dimensions it is where $n$ linearly independent constraints are tight.
:::

### The corner-point principle
Draw the lines where the profit $3x + 2y$ equals a constant: they are parallel. Increasing the constant slides the line across the region. The largest constant for which the line still touches the region is the optimum, and the last point touched is always a corner (or a whole edge, if the line is parallel to it). So we only need to check corners: $(0, 0)$ gives 0, $(5, 0)$ gives 15, $(4, 2)$ gives 16, $(3, 3)$ gives 15 and $(0, 4)$ gives 8. The best plan is 4 tables and 2 chairs, for a profit of 16 hundred euros. This **corner-point principle** is the central fact of linear programming.

### The simplex method
Checking every corner is hopeless in high dimensions, where there can be astronomically many. The **simplex method**, invented by George Dantzig in 1947, walks from corner to neighbouring corner along edges, always improving the objective, and stops when no neighbour is better. For the workshop: start at $(0, 0)$ with profit 0. Its neighbours are $(5, 0)$ with 15 and $(0, 4)$ with 8; move to $(5, 0)$. Its other neighbour, $(4, 2)$, gives 16; move there. The neighbours of $(4, 2)$ are $(5, 0)$ and $(3, 3)$, both worth 15. No improvement is possible, and because the region is convex and the objective linear, a corner with no better neighbour is a global optimum.

In the worst case the simplex method can visit exponentially many corners, but in practice it needs a number of steps roughly proportional to the number of constraints. **Interior-point methods** take a different route through the inside of the region and are guaranteed to run in polynomial time.

### When things go wrong
Three special cases appear. An LP is **infeasible** if the constraints contradict each other, such as $x\le1$ and $x\ge2$. It is **unbounded** if the objective can grow forever, such as maximizing $x$ subject only to $x\ge0$. And it can have **multiple optima** when the objective is parallel to an edge: maximizing $x + y$ for the workshop gives 6 at both $(4, 2)$ and $(3, 3)$, and at every point on the edge between them.

### Duality and shadow prices
Every LP has a **dual**. For $\max\mathbf c^T\mathbf x$ subject to $A\mathbf x\le\mathbf b$, $\mathbf x\ge\mathbf 0$, the dual is $\min\mathbf b^T\mathbf y$ subject to $A^T\mathbf y\ge\mathbf c$, $\mathbf y\ge\mathbf 0$. The dual variables are prices for the resources. For the workshop, the finishing constraint is not tight at the optimum, so its price is 0. The prices $y_1$ (wood) and $y_3$ (cutting) satisfy $y_1 + 2y_3 = 3$ and $y_1 + y_3 = 2$, giving $y_1 = y_3 = 1$. The dual objective is $6\cdot1 + 12\cdot0 + 10\cdot1 = 16$, exactly the best profit. That equality is LP strong duality. One more unit of wood would raise the profit by about 1 hundred euros; more finishing time would be worthless.

:::warn Common mistakes
Checking only some corners, or including intersection points of constraint lines that lie outside the feasible region. Forgetting the nonnegativity constraints. Assuming an optimum exists without checking for unboundedness. Rounding an LP solution to integers and assuming it is the best integer solution: integer programming is a different and much harder problem.
:::

### Summary
A linear program optimizes a linear objective over a convex polytope defined by linear inequalities. The optimum, if it exists, is at a corner. The simplex method walks between neighbouring corners until no neighbour is better. LPs can be infeasible, unbounded or have many optima. The dual LP assigns prices to resources, and its optimal value equals the primal optimum.

@viz g05-lp c1=3 c2=2 | The workshop LP. The shaded polygon is the feasible region, the lines are profit contours, and the corners are labelled with their profit.

:::explore
**What to try**
1. With $c_1 = 3$ and $c_2 = 2$, read the corner values and confirm the best corner is $(4, 2)$ with value 16.
2. Press Reset walk, then Simplex step repeatedly. The walk goes $(0, 0)\to(5, 0)\to(4, 2)$ and stops.
3. Set $c_1 = c_2 = 1$. Two corners tie at 6: the contour line is parallel to an edge, so there are many optima.
4. Make $c_1$ negative and see the best corner move to the $y$-axis. Drag the test point outside the region to see a constraint fail.

**What to notice:** changing the objective only tilts the contour lines; the optimum jumps from corner to corner and never lands inside the polygon. That is the corner-point principle from the article, and the simplex walk is a local search that is guaranteed to be global because the region is convex.
:::

:::formulas
$$\max\ \mathbf c^T\mathbf x\ \ \text{s.t.}\ A\mathbf x\le\mathbf b,\ \mathbf x\ge\mathbf 0\qquad\Longleftrightarrow\qquad\min\ \mathbf b^T\mathbf y\ \ \text{s.t.}\ A^T\mathbf y\ge\mathbf c,\ \mathbf y\ge\mathbf 0$$
$$\text{weak duality: }\mathbf c^T\mathbf x\le\mathbf b^T\mathbf y\qquad\text{strong duality: }\max\mathbf c^T\mathbf x = \min\mathbf b^T\mathbf y$$
$$\text{complementary slackness: }y_i\,(b_i - (A\mathbf x)_i) = 0$$
:::

:::thm Corner-point principle
If a linear program has a bounded feasible polytope that is nonempty, its optimum is attained at a vertex.
:::

:::proof Proof
Every point of a bounded polytope is a convex combination of its vertices: $\mathbf x = \sum_k\alpha_k\mathbf v_k$ with $\alpha_k\ge0$ and $\sum_k\alpha_k = 1$. Then $\mathbf c^T\mathbf x = \sum_k\alpha_k\mathbf c^T\mathbf v_k\le\max_k\mathbf c^T\mathbf v_k$. So no point beats the best vertex.
:::

:::thm Weak duality for LP
If $\mathbf x$ is feasible for the primal and $\mathbf y$ for the dual, then $\mathbf c^T\mathbf x\le\mathbf b^T\mathbf y$.
:::

:::proof Proof
Since $\mathbf x\ge\mathbf 0$ and $A^T\mathbf y\ge\mathbf c$, $\mathbf c^T\mathbf x\le(A^T\mathbf y)^T\mathbf x = \mathbf y^TA\mathbf x$. Since $\mathbf y\ge\mathbf 0$ and $A\mathbf x\le\mathbf b$, $\mathbf y^TA\mathbf x\le\mathbf y^T\mathbf b$.
:::

:::steps Find the corners of the workshop region
1. Axes: $(0, 0)$; on $y = 0$ the tightest bound is $2x\le10$, giving $(5, 0)$; on $x = 0$ it is $3y\le12$, giving $(0, 4)$.
2. Wood meets cutting: $x + y = 6$ and $2x + y = 10$ give $(4, 2)$.
3. Wood meets finishing: $x + y = 6$ and $x + 3y = 12$ give $2y = 6$, so $(3, 3)$; check $2\cdot3 + 3 = 9\le10$.
4. Finishing meets cutting at $x = 3.6$, $y = 2.8$, but $3.6 + 2.8 = 6.4 > 6$ violates the wood limit, so it is not a corner.
:::

:::steps Compute the shadow prices for the workshop
1. At $(4, 2)$ the tight constraints are wood and cutting; finishing has slack, so $y_2 = 0$.
2. Dual constraints tight for $x, y > 0$: $y_1 + 2y_3 = 3$ and $y_1 + y_3 = 2$, so $y_3 = 1$ and $y_1 = 1$.
3. Dual value $6(1) + 12(0) + 10(1) = 16$, equal to the primal optimum.
:::

:::mock Exam question
A diet must provide at least 4 units of protein and 6 units of fibre. Food A costs 2 per unit and gives 1 protein and 1 fibre; food B costs 3 and gives 1 protein and 3 fibre. (a) Write the LP. (b) Solve it by the corner-point method. (c) Write the dual and verify that it has the same optimal value.
:::solution
(a) Minimize $2x + 3y$ subject to $x + y\ge4$, $x + 3y\ge6$, $x, y\ge0$.
(b) Corners of the (unbounded) feasible region: $(0, 4)$ with cost 12, the intersection of $x + y = 4$ and $x + 3y = 6$ at $(3, 1)$ with cost 9, and $(6, 0)$ with cost 12. Since costs are positive, the minimum is at a corner: $(3, 1)$, cost 9.
(c) Dual: maximize $4u + 6v$ subject to $u + v\le2$, $u + 3v\le3$, $u, v\ge0$. Both constraints are tight: $v = 0.5$, $u = 1.5$, value $6 + 3 = 9$.
:::
:::

:::ml
Least absolute deviations regression ($\min\sum_i|y_i - \mathbf w^T\mathbf x_i|$) and L1-regularized problems can be written as LPs. Optimal transport, which defines the Wasserstein distance between distributions, is an LP. LP relaxations are used for inference in graphical models and for verifying the robustness of neural networks.
:::

:::cs
Shortest paths, maximum flow, minimum-cost flow and bipartite matching can all be written as LPs. If variables must be integers, the problem becomes integer linear programming, which is NP-hard; solvers attack it with branch and bound using LP relaxations as bounds.
:::

:::real
The diet problem was one of the first LPs ever solved, in the 1940s: find the cheapest combination of foods that meets every nutritional requirement. Today oil refineries use LPs to decide how to blend crude oils, and airlines use them to assign crews to flights at minimum cost.
:::

:::quiz
? Where does a bounded, feasible LP attain its optimum?
+ At a vertex of the feasible region
- At its centre
- Anywhere inside
> The corner-point principle.

? What is the value of $3x + 2y$ at the corner $(4, 2)$?
= 16
> $12 + 4 = 16$.

? For the workshop region, what is the maximum of $x + y$?
= 6
> It is attained along the whole edge from $(4, 2)$ to $(3, 3)$.

? Maximize $x$ subject only to $x\ge0$. This LP is...
+ unbounded
- infeasible
- optimal at $x = 0$
> The objective can grow without limit.

? A constraint has slack at the optimum. Its dual variable (shadow price) is...
= 0
> Complementary slackness: extra units of an unused resource are worth nothing.

? What does the simplex method do at each step?
+ Moves to a neighbouring vertex with a better objective value
- Moves to the centre of the region
- Checks every vertex
> It stops at a vertex with no better neighbour, which is optimal.
:::

## Lesson: Practical training and debugging {#practical}
@summary: Sanity checks, initialization, input scaling, learning-rate tuning, reading loss curves, gradient clipping and early stopping: the craft of making optimization work.

### Theory meets messy reality
The previous lessons gave clean guarantees for clean problems. Real training runs are messier: the loss is non-convex, the data is noisy, the code may contain bugs, and a single bad setting can waste days of computation. Experienced practitioners rely on a short list of habits that catch most problems early. This lesson collects them, and each one connects back to an idea you have already met.

Imagine baking a new cake recipe that comes out flat. A good baker does not change five things at once. They check the oven temperature first, then whether the baking powder is fresh, and they bake a small test cake before committing to a wedding order. Debugging a training run works the same way: check the simplest things first, test small, and change one thing at a time.

### Sanity checks before training
Before training at all, compute the loss of the freshly initialized model. For a classifier with $K$ classes whose initial predictions are nearly uniform, the cross-entropy should be close to $-\ln(1/K) = \ln K$. With 10 classes that is $\ln10\approx2.30$. If you see 50 instead, something is wrong with the labels, the loss function or the initialization. Next, try to **overfit a single small batch**: train on 10 to 100 examples until the training loss is nearly zero. A model that cannot memorize a handful of examples has a bug, such as a detached gradient, a wrong label alignment or a learning rate of zero. Finally, compare with a trivial baseline, such as always predicting the most common class, so you know what "better than nothing" looks like.

### Initialization
Suppose a layer computes $z = \sum_{i=1}^nw_ix_i$ with independent zero-mean weights and inputs. Then $\operatorname{Var}(z) = n\operatorname{Var}(w)\operatorname{Var}(x)$. If $\operatorname{Var}(w)$ is too large, signals grow layer after layer and explode; too small, and they shrink toward zero, along with the gradients from the backpropagation lesson. Choosing $\operatorname{Var}(w) = 1/n$ keeps the variance constant. ReLU zeroes half its inputs, which halves the variance, so **He initialization** uses $\operatorname{Var}(w) = 2/n_{\text{in}}$. **Xavier (Glorot) initialization** uses $2/(n_{\text{in}} + n_{\text{out}})$, balancing the forward and backward passes, and suits tanh. For a ReLU layer with 512 inputs, He initialization gives standard deviation $\sqrt{2/512} = 1/16 = 0.0625$.

:::def He initialization
Initializing weights with variance $2/n_{\text{in}}$, where $n_{\text{in}}$ is the number of inputs to the layer, so that signal variance is preserved through ReLU layers.
:::

### Scale your inputs
Recall that gradient descent is slow when the condition number is large. Features measured on very different scales, such as age in years and income in euros, create exactly that kind of narrow valley. **Standardizing** each feature, $x\mapsto(x - \mu)/\sigma$ using the training set's mean and standard deviation, puts them on a common scale. A feature with mean 10 and standard deviation 2 maps the value 14 to $(14 - 10)/2 = 2$. Normalization layers inside networks (batch normalization, layer normalization) apply the same idea to hidden activations.

### The learning rate comes first
If you tune only one hyperparameter, tune the learning rate. Sweep it on a logarithmic scale, for example $10^{-5}, 10^{-4}, \ldots, 1$, train briefly with each, and pick the largest value that trains stably, or slightly below it. A **learning-rate range test** does this in a single run by increasing $\eta$ exponentially every few steps and plotting the loss; the best rate is usually a little below where the loss starts to rise sharply. Then add warmup and a decay schedule.

### Reading the loss curve
The training curve is your main diagnostic. A loss that becomes **NaN** or infinite usually means the learning rate is too high (the divergence we saw for $\eta > 2/L$), or there is a numerical problem such as $\log0$. A loss that stays **flat** suggests a learning rate that is far too small, dead ReLUs, or labels that do not match the inputs. A loss that **oscillates wildly** suggests a learning rate a bit too high or a batch size too small. A **training loss that keeps falling while the validation loss rises** is overfitting: the model is memorizing the training set. Remedies are more data, data augmentation, regularization such as weight decay or dropout, and early stopping.

### Gradient clipping
Occasionally a single batch produces a huge gradient, for example in recurrent networks or at the start of training, and one enormous step can wreck the model. **Gradient clipping by norm** rescales the gradient if its length exceeds a threshold $c$:
$$\mathbf g\leftarrow\mathbf g\cdot\min\left(1, \frac c{\|\mathbf g\|}\right)$$
With $\mathbf g = (3, 4)$ and $c = 1$, the norm is 5, so the clipped gradient is $(0.6, 0.8)$: same direction, length 1. Clipping keeps the direction of descent while capping the step.

:::def Gradient clipping
Rescaling the gradient so that its norm does not exceed a threshold $c$, which prevents rare huge gradients from causing destructive updates.
:::

### Early stopping and checkpoints
Evaluate on a held-out validation set regularly and save a **checkpoint** whenever the validation loss reaches a new best. **Early stopping** ends training when the validation loss has not improved for a set number of evaluations (the patience) and returns the best checkpoint. It is cheap, effective regularization, and it protects you from runs that crash late.

:::def Early stopping
Halting training when the validation loss stops improving and keeping the parameters from the best validation point, used to prevent overfitting.
:::

:::warn Common mistakes
Changing several hyperparameters at once, so you cannot tell what helped. Computing normalization statistics on the whole dataset, including validation and test data, which leaks information. Judging a run from a single noisy mini-batch loss. Tuning on the test set. Forgetting to switch the model to evaluation mode (for dropout and batch normalization) when measuring validation loss.
:::

### Summary
Check the initial loss against $\ln K$, overfit one batch, and compare with a baseline. Initialize with He or Xavier variance so signals neither explode nor vanish, and standardize inputs to improve conditioning. Tune the learning rate first on a log scale, then read the loss curve to diagnose divergence, stalling or overfitting. Clip gradients by norm, and use validation checkpoints with early stopping.

@viz gd surface=bowl lr=0.55 | A learning rate just above the stability limit $2/L = 0.5$. This is what a diverging training run looks like.

:::explore
**What to try**
1. Press Run with $\eta = 0.55$ and watch the loss readout grow until it reports divergence, the toy version of a NaN loss.
2. Lower $\eta$ to $0.45$ and run again: the path oscillates but converges, like a noisy but working training curve.
3. Lower $\eta$ to $0.005$ and run: the loss barely moves, the "flat curve" symptom.
4. Find by trial the largest $\eta$ that still converges, as a learning-rate sweep would.

**What to notice:** the three loss-curve symptoms in the article, divergence, oscillation and stalling, all come from the learning rate alone, which is why it is the first thing to tune and why lowering it is the first response to a NaN.
:::

:::formulas
$$\text{initial cross-entropy}\approx\ln K\qquad\operatorname{Var}\Big(\sum_{i=1}^nw_ix_i\Big) = n\operatorname{Var}(w)\operatorname{Var}(x)$$
$$\text{He: }\operatorname{Var}(w) = \frac2{n_{\text{in}}}\qquad\text{Xavier: }\operatorname{Var}(w) = \frac2{n_{\text{in}} + n_{\text{out}}}$$
$$\text{standardize: }x\mapsto\frac{x - \mu}\sigma\qquad\text{clip: }\mathbf g\leftarrow\mathbf g\min\Big(1, \frac c{\|\mathbf g\|}\Big)$$
:::

:::thm Variance of a weighted sum
If $w_1, \ldots, w_n$ and $x_1, \ldots, x_n$ are independent, the $w_i$ have mean 0 and variance $\sigma_w^2$, and the $x_i$ have mean 0 and variance $\sigma_x^2$, then $\operatorname{Var}\left(\sum_iw_ix_i\right) = n\sigma_w^2\sigma_x^2$.
:::

:::proof Proof
Each term $w_ix_i$ has mean $\mathbb E[w_i]\mathbb E[x_i] = 0$ and variance $\mathbb E[w_i^2x_i^2] = \mathbb E[w_i^2]\mathbb E[x_i^2] = \sigma_w^2\sigma_x^2$. The terms are independent, so their variances add, giving $n\sigma_w^2\sigma_x^2$.
:::

:::steps Check the initial loss of a 10-class classifier
1. With near-uniform predictions each class gets probability $\frac1{10}$.
2. Cross-entropy: $-\ln\frac1{10} = \ln10\approx2.303$.
3. An initial loss far above this means the model is confidently wrong from the start, usually a bug or a bad initialization scale.
:::

:::steps Clip the gradient $\mathbf g = (6, 8)$ at threshold $c = 5$
1. Norm: $\sqrt{36 + 64} = 10 > 5$.
2. Scale factor: $5/10 = 0.5$.
3. Clipped gradient: $(3, 4)$, with norm 5 and the same direction.
:::

:::mock Exam question
You train a 100-class image classifier with ReLU layers. (a) The initial loss is 4.6. Is that reasonable? (b) A hidden layer has 200 inputs. What standard deviation does He initialization use? (c) After 2 epochs the loss becomes NaN. Give two likely causes and fixes. (d) Later, training loss is 0.1 while validation loss has risen from 1.2 to 1.8 over ten epochs. Diagnose and suggest two remedies.
:::solution
(a) Yes: $\ln100\approx4.605$, as expected for near-uniform initial predictions.
(b) $\sqrt{2/200} = 0.1$.
(c) A learning rate above the stability limit (lower it, add warmup) or an occasional huge gradient (add gradient clipping); also check for $\log0$ by computing the loss from logits.
(d) Overfitting. Use early stopping at the best validation checkpoint, and add regularization such as weight decay, dropout or data augmentation.
:::
:::

:::ml
Large training runs log the loss, gradient norm and learning rate at every step. Spikes in the gradient norm often precede loss spikes, which is why clipping is standard for transformers. Learning-rate warmup, AdamW, gradient clipping at norm 1 and cosine decay together form the default recipe for many modern models.
:::

:::cs
Reproducibility is a software engineering problem: fix random seeds, record library versions and configurations, and save checkpoints atomically. Debugging by bisection, changing one thing at a time and halving the search space, applies to training runs just as it does to code.
:::

:::real
Pilots use checklists before every flight because experience shows that most failures come from a few simple, checkable causes. Training checklists play the same role: initial loss, one-batch overfit, learning-rate sweep and validation monitoring catch most failed runs before they waste days of compute.
:::

:::quiz
? Your loss becomes NaN early in training. What is the first thing to try?
+ Lower the learning rate
- Add more layers
- Train longer
> Divergence is most often caused by a learning rate that is too large.

? What initial cross-entropy do you expect for a 100-class classifier with near-uniform predictions? (2 decimal places)
= 4.61|4.605|4.6
> $\ln100\approx4.605$.

? A ReLU layer has 200 inputs. What standard deviation does He initialization use?
= 0.1|1/10
> $\sqrt{2/200} = \sqrt{0.01}$.

? Clip $\mathbf g = (6, 8)$ at norm $c = 5$. What is the first entry of the clipped gradient?
= 3
> The norm 10 is halved, giving $(3, 4)$.

? A feature has mean 10 and standard deviation 2. What is the standardized value of 14?
= 2
> $(14 - 10)/2 = 2$.

? Training loss keeps falling while validation loss rises. This indicates...
+ overfitting
- a learning rate that is too small
- a bug in the loss function
> The model is fitting noise in the training set; use early stopping or regularization.
:::
