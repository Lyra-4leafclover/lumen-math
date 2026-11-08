---
id: calculus
title: Calculus
tagline: Limits, derivatives, integrals, series and differential equations — the mathematics of change.
desc: Calculus is how models learn. You'll build limits from scratch, understand derivatives as slopes and rates, master every differentiation rule including the chain rule, optimize functions, integrate by several techniques, apply integrals to areas, averages and probability, test infinite series for convergence, approximate functions with Taylor series, and solve your first differential equations.
color: #10b981
symbol: ∫
area: Linear algebra & calculus
paths: ml, cs
order: 4
---

# Unit: Limits and continuity

## Lesson: Limits {#limits}
@summary: What a function approaches as the input gets close to a point, even where the function isn't defined.

### Why we need limits
Calculus is the mathematics of change, and almost every question in it sounds like this: what happens when something gets *very, very small*? How fast is a car going at one exact instant? How much area is under a curve if we cut it into infinitely thin strips? In both cases a naive calculation gives nonsense like $\frac{0}{0}$. Limits are the tool that lets us ask "what value is this heading towards?" instead of "what is this value right here?". Every other idea in this course, the derivative, the integral, the Taylor series, is a limit in disguise.

### An everyday picture
Imagine walking toward a wall. Each step covers half the remaining distance: first 1 m from the wall, then 0.5 m, then 0.25 m, then 0.125 m. You never actually touch the wall, but it is completely clear where you are heading: the distance is approaching 0. A limit captures exactly this idea of "where you are heading", separately from "where you are".

### The definition in plain words
We write
$$\lim_{x\to c} f(x) = L$$
and read it as "the limit of $f(x)$ as $x$ approaches $c$ is $L$". It means: you can make $f(x)$ as close to $L$ as you like by taking $x$ close enough to $c$, **but not equal to $c$**. The value of $f$ *at* $c$ is ignored. It may be different from $L$, or it may not exist at all.

Here is the classic example. Let
$$f(x) = \frac{x^2 - 1}{x - 1}.$$
At $x = 1$ this is $\frac{0}{0}$, which is undefined. But look at nearby inputs. $f(0.9) = \frac{0.81 - 1}{-0.1} = 1.9$. $f(0.99) = 1.99$. $f(1.01) = 2.01$. $f(1.001) = 2.001$. The outputs are clearly closing in on 2 from both sides. Algebra confirms it: for $x \ne 1$ we can factor $x^2 - 1 = (x-1)(x+1)$ and cancel, so $f(x) = x + 1$, which is near 2 when $x$ is near 1. The graph is the line $y = x + 1$ with a single missing point, a "hole", at $(1, 2)$.

@fig limit kind=hole | The graph of (x² − 1)/(x − 1): a straight line with one missing point. The limit at x = 1 is the height of the hole, 2.

:::def Limit
$\lim_{x\to c} f(x) = L$ means $f(x)$ can be made arbitrarily close to $L$ by taking $x$ sufficiently close to $c$, with $x \ne c$.
:::

### One-sided limits
Sometimes the two sides disagree. Think of a parking garage that charges \$5 for anything up to 1 hour and \$8 for anything over 1 hour. As your parking time approaches 1 hour from below, the price is \$5; just above 1 hour it is \$8. We write the **left-hand limit** as $\lim_{x\to c^-} f(x)$ (approach from smaller values) and the **right-hand limit** as $\lim_{x\to c^+} f(x)$ (approach from larger values).

The two-sided limit exists **only when both one-sided limits exist and are equal**. For the parking price at 1 hour, the left limit is 5 and the right limit is 8, so the two-sided limit does not exist.

:::def One-sided limit
$\lim_{x\to c^-} f(x)$ uses only inputs $x < c$; $\lim_{x\to c^+} f(x)$ uses only inputs $x > c$. The two-sided limit exists exactly when both exist and agree.
:::

### How to compute limits step by step
Most limits you will meet can be handled by a short routine.

First, **try plugging in**. If $f$ is a polynomial, or any "nice" function defined at $c$, the limit is just $f(c)$. For example $\lim_{x\to 2}(x^2 + 3x) = 4 + 6 = 10$.

Second, if plugging in gives $\frac{0}{0}$, that is a signal, not an answer. It means some factor is hiding in both the top and the bottom. **Simplify**: factor and cancel, multiply by a conjugate when there are square roots, or combine fractions. For example $\lim_{x\to 3}\frac{x^2 - 9}{x - 3} = \lim_{x\to3}(x + 3) = 6$.

Third, if you get a nonzero number over 0, like $\frac{5}{0}$, the function is blowing up near $c$: there is a vertical asymptote. Check the sign on each side to see whether it heads to $+\infty$ or $-\infty$. For $\frac{1}{x}$ near 0, the right side goes to $+\infty$ and the left side to $-\infty$.

### Limits at infinity
We can also ask what happens as $x$ grows without bound. For rational functions, divide every term by the highest power of $x$ in the denominator. For example
$$\lim_{x\to\infty}\frac{3x^2 + 1}{5x^2 - x} = \lim_{x\to\infty}\frac{3 + 1/x^2}{5 - 1/x} = \frac{3}{5},$$
because $1/x$ and $1/x^2$ shrink to 0. A finite limit at infinity gives a **horizontal asymptote**: the graph flattens out toward the line $y = \frac35$. Comparing growth rates is the same game computer scientists play with running times: as $n\to\infty$, the highest power wins.

@fig func kind=rational | y = 1/(x − h) + k: a vertical asymptote at x = h (the function blows up) and a horizontal asymptote at y = k (the limit at infinity).

### Two famous limits
Two limits appear so often that they are worth memorizing. The first is
$$\lim_{x\to 0}\frac{\sin x}{x} = 1.$$
Try it with a calculator in radians: $\frac{\sin 0.1}{0.1} \approx 0.99833$ and $\frac{\sin 0.01}{0.01} \approx 0.99998$. It says that for small angles, $\sin x \approx x$. The second is
$$\lim_{n\to\infty}\left(1 + \frac1n\right)^n = e \approx 2.71828,$$
which is where the number $e$ comes from (compound interest, compounded more and more often).

### Why the precise definition works
"Close enough" can be made exact. The formal definition says: for every tolerance $\varepsilon > 0$ on the output, there is a tolerance $\delta > 0$ on the input such that $0 < |x - c| < \delta$ guarantees $|f(x) - L| < \varepsilon$. Think of it as a game. Your opponent demands the output be within $\varepsilon = 0.01$ of 2. For $f(x) = x + 1$ (away from the hole) you answer "take $x$ within $\delta = 0.01$ of 1", and you win. If you can win for *every* $\varepsilon$, the limit is 2.

### Common mistakes
The most common mistake is thinking that $\frac00$ means the limit does not exist. It only means "more work needed". The second is thinking the limit must equal $f(c)$. It only does for continuous functions (next lesson). The third is forgetting to check both sides when the denominator goes to 0, or when the function is defined piecewise. Finally, a calculator table is good evidence but not proof: $\sin(1/x)$ looks random near 0 and has no limit at all.

### Summary
A limit describes the value a function approaches, not the value it takes. Compute limits by plugging in, simplifying when you get $\frac00$, checking signs for $\frac{c}{0}$, and dividing by the top power for limits at infinity. Two-sided limits need both sides to agree. These ideas are the foundation for derivatives, which are limits of slopes, and integrals, which are limits of sums.

@viz limit kind=hole | Shrink δ. Both sides approach 2, even though the function has a hole at x = 1.

:::explore
**What to try**
1. With the "hole" function selected, drag δ from 1.5 down to 0.01 and read the two output values $f(c - \delta)$ and $f(c + \delta)$.
2. Switch to $\frac{\sin x}{x}$ and repeat. Notice the open circle at $x = 0$.
3. Switch to the "jump" function and shrink δ again.
4. Switch to $\sin(1/x)$ and shrink δ slowly.

**What to notice:** for the hole and $\frac{\sin x}{x}$, both outputs squeeze toward a single number (2 and 1), which is exactly the limit, even though the function is undefined at $c$. For the jump, the left and right outputs approach different numbers (1 and 2), so the two-sided limit does not exist, just like the parking-garage price. For $\sin(1/x)$ the outputs never settle: oscillation is another way for a limit to fail.
:::

:::formulas
$$\lim_{x\to c}[f(x) \pm g(x)] = \lim f \pm \lim g \qquad \lim_{x\to c} f(x)g(x) = \lim f\cdot\lim g$$
$$\lim_{x\to c}\frac{f(x)}{g(x)} = \frac{\lim f}{\lim g}\ \ (\lim g \ne 0)$$
$$\lim_{x\to0}\frac{\sin x}{x} = 1 \qquad \lim_{x\to 0}\frac{1 - \cos x}{x} = 0 \qquad \lim_{n\to\infty}\left(1 + \frac1n\right)^n = e$$
$$\lim_{x\to\infty}\frac{1}{x^p} = 0\ \ (p > 0)$$
:::

:::thm Squeeze theorem
If $g(x) \le f(x) \le h(x)$ for all $x$ near $c$, and $\lim_{x\to c} g(x) = \lim_{x\to c} h(x) = L$, then $\lim_{x\to c} f(x) = L$.
:::

:::proof Using the squeeze theorem on $x^2\sin(1/x)$
Since $-1 \le \sin(1/x) \le 1$, multiplying by $x^2 \ge 0$ gives $-x^2 \le x^2\sin(1/x) \le x^2$. Both $-x^2$ and $x^2$ approach 0 as $x \to 0$, so the function trapped between them must also approach 0. Hence $\lim_{x\to0}x^2\sin(1/x) = 0$, even though $\sin(1/x)$ alone has no limit.
:::

:::steps $\displaystyle\lim_{x\to 0}\frac{\sqrt{x + 4} - 2}{x}$
1. Plugging in gives $\frac{\sqrt4 - 2}{0} = \frac00$, so we must simplify.
2. Multiply top and bottom by the conjugate $\sqrt{x+4} + 2$: the top becomes $(x + 4) - 4 = x$.
3. The expression is $\dfrac{x}{x(\sqrt{x+4}+2)} = \dfrac{1}{\sqrt{x+4} + 2}$ for $x \ne 0$.
4. Now plug in: $\dfrac{1}{2 + 2} = \dfrac14$.
:::

:::steps $\displaystyle\lim_{x\to 2}\frac{x^2 - 5x + 6}{x^2 - 4}$
1. Plugging in: top $4 - 10 + 6 = 0$, bottom $0$. Form $\frac00$.
2. Factor: $\dfrac{(x-2)(x-3)}{(x-2)(x+2)}$.
3. Cancel $(x - 2)$: $\dfrac{x - 3}{x + 2}$.
4. Plug in: $\dfrac{-1}{4} = -0.25$.
:::

:::steps $\displaystyle\lim_{x\to\infty}\frac{4x^3 - x}{2x^3 + 7x^2}$
1. The highest power in the denominator is $x^3$. Divide every term by $x^3$.
2. Get $\dfrac{4 - 1/x^2}{2 + 7/x}$.
3. As $x \to\infty$, $1/x^2 \to 0$ and $7/x \to 0$.
4. The limit is $\frac42 = 2$, so $y = 2$ is a horizontal asymptote.
:::

:::mock Exam question
Let $f(x) = \begin{cases} x^2 + 1 & x < 2 \\ 3x - k & x \ge 2\end{cases}$. Find the value of $k$ for which $\lim_{x\to2} f(x)$ exists, and state the limit.
:::solution
Left limit: $\lim_{x\to2^-}(x^2 + 1) = 5$. Right limit: $\lim_{x\to2^+}(3x - k) = 6 - k$. The two-sided limit exists only if they agree: $6 - k = 5$, so $k = 1$. The limit is then $5$.
:::
:::

:::ml Limits behind the scenes
The derivative of a loss, used by every training algorithm, is defined as a limit. Limits at infinity describe what happens as training runs forever: a learning-rate schedule $\eta_t = \frac{\eta_0}{1 + t}$ satisfies $\lim_{t\to\infty}\eta_t = 0$, which is one of the conditions that makes stochastic gradient descent settle down. The sigmoid has horizontal asymptotes $\lim_{z\to\infty}\sigma(z) = 1$ and $\lim_{z\to-\infty}\sigma(z) = 0$, which is why its outputs can be read as probabilities.
:::

:::cs Asymptotic analysis
Comparing algorithms is a limit at infinity. If $\lim_{n\to\infty}\frac{f(n)}{g(n)} = 0$, then $f$ grows strictly slower than $g$. For example $\lim_{n\to\infty}\frac{n\log n}{n^2} = 0$, so merge sort ($n\log n$) eventually beats insertion sort ($n^2$) no matter the constant factors.
:::

:::real Speed from a dashcam
A dashcam records a car's position every frame. Speed between two frames is distance divided by time. As the frame rate increases, the time gap shrinks toward 0 and the computed speed approaches the true instantaneous speed shown on the speedometer. The speedometer reading is a limit.
:::

:::quiz
? $\displaystyle\lim_{x\to3}\frac{x^2 - 9}{x - 3}$ =
= 6
> Factor: $\frac{(x-3)(x+3)}{x-3} = x + 3 \to 6$.

? $\displaystyle\lim_{x\to\infty}\frac{3x^2 + 1}{5x^2 - x}$ =
= 3/5|0.6
> Divide by $x^2$: $\frac{3 + 1/x^2}{5 - 1/x} \to \frac35$.

? $\displaystyle\lim_{x\to0}\frac{\sin 3x}{x}$ =
= 3
> $\frac{\sin3x}{x} = 3\cdot\frac{\sin 3x}{3x}$, and $\frac{\sin u}{u} \to 1$.

? If $\lim_{x\to 1^-}f(x) = 4$ and $\lim_{x\to1^+}f(x) = 4$ but $f(1) = 7$, then $\lim_{x\to1}f(x)$ is...
+ 4
- 7
- does not exist
> The limit ignores the value at the point. Both sides approach 4.

? What happens to $\frac{1}{x}$ as $x \to 0^-$?
- it approaches 0
+ it goes to $-\infty$
- it goes to $+\infty$
> For small negative $x$, $\frac1x$ is a large negative number, e.g. $\frac{1}{-0.001} = -1000$.

? $\displaystyle\lim_{x\to 4}\frac{\sqrt x - 2}{x - 4}$ =
= 1/4|0.25
> Multiply by the conjugate: $\frac{x - 4}{(x-4)(\sqrt x + 2)} = \frac{1}{\sqrt x + 2} \to \frac14$.
:::

## Lesson: Continuity {#continuity}
@summary: Functions you can draw without lifting your pen, the three ways to break continuity, and the intermediate value theorem.

### Why continuity matters
Most of the functions we use in science and machine learning are "smooth enough" that small changes in the input cause small changes in the output. A thermostat that reads 20.0 °C will not suddenly read 35 °C if the room warms by a hundredth of a degree. This property is called **continuity**, and it is what makes approximation possible. If a function is continuous, you can evaluate it at a nearby point and trust the answer. Many of the big theorems of calculus, such as the intermediate value theorem and the extreme value theorem, only work for continuous functions, so it pays to know exactly what the word means.

### An everyday picture
Imagine drawing the graph of your height over your lifetime. You never jump instantly from 150 cm to 160 cm; you pass through every height in between. You could draw that graph without lifting your pen. Now imagine the graph of the price of a postage stamp over time. It stays flat for years and then jumps the day the price changes. You must lift your pen at each jump. The height graph is continuous; the stamp-price graph is not.

### The precise definition
The pen picture is a good intuition, but we need something we can check with algebra. We say $f$ is **continuous at $c$** if three things are all true:

1. $f(c)$ is defined (there is a point on the graph at $x = c$),
2. $\lim_{x\to c} f(x)$ exists (both sides approach the same value), and
3. the two are equal: $\lim_{x\to c} f(x) = f(c)$.

In words: the value the function is heading toward is the value it actually has. A function is **continuous on an interval** if it is continuous at every point of the interval.

Let us check a simple example. Take $f(x) = x^2 + 1$ at $c = 2$. The value is $f(2) = 5$. The limit is $\lim_{x\to2}(x^2+1) = 5$. They match, so $f$ is continuous at 2. In fact every polynomial is continuous everywhere, because the limit of a polynomial is always found by plugging in.

:::def Continuous function
$f$ is continuous at $c$ if $f(c)$ is defined, $\lim_{x\to c} f(x)$ exists, and $\lim_{x\to c} f(x) = f(c)$.
:::

### Three ways to break continuity
Each of the three conditions can fail, and each failure has a name and a look.

A **removable discontinuity** (a hole) happens when the limit exists but the function is undefined there, or defined with the "wrong" value. Our friend $\frac{x^2 - 1}{x - 1}$ has a hole at $x = 1$: the limit is 2 but $f(1)$ is undefined. It is called removable because you could fix it by defining $f(1) = 2$, filling in the hole.

A **jump discontinuity** happens when the left and right limits both exist but differ. The function $f(x) = x$ for $x < 1$ and $f(x) = x + 1$ for $x \ge 1$ has left limit 1 and right limit 2 at $x = 1$. No single value could fix that.

An **infinite discontinuity** happens near a vertical asymptote. $f(x) = \frac{1}{x - 2}$ shoots off to $\pm\infty$ near $x = 2$, so the limit does not exist as a finite number.

@fig limit kind=jump | A jump discontinuity: the left side approaches 1, the right side approaches 2.

:::def Removable discontinuity
A point where $\lim_{x\to c}f(x)$ exists but $f(c)$ is undefined or not equal to it. Redefining one value removes it.
:::

:::def Jump discontinuity
A point where both one-sided limits exist but are different.
:::

### Which functions are continuous?
You rarely need to check the definition from scratch, because continuity is preserved by the usual ways of building functions. Polynomials, $e^x$, $\sin x$ and $\cos x$ are continuous everywhere. Rational functions like $\frac{p(x)}{q(x)}$ are continuous wherever the denominator is not zero. $\ln x$ is continuous for $x > 0$ and $\sqrt x$ for $x \ge 0$. Sums, differences, products, quotients (where the denominator is nonzero) and compositions of continuous functions are continuous.

So, for example, $g(x) = e^{\sin x} + x^3$ is continuous everywhere: $\sin x$ is continuous, $e^u$ is continuous, their composition is continuous, and adding $x^3$ keeps it continuous. And $h(x) = \frac{x + 1}{x^2 - 9}$ is continuous everywhere except $x = 3$ and $x = -3$, where the denominator vanishes.

### The intermediate value theorem
Continuity has a powerful consequence. Suppose you drive from a town at 100 m altitude to a mountain village at 900 m. At some moment you must have been at exactly 500 m. You cannot skip an altitude because your altitude changes continuously. That is the **intermediate value theorem** (IVT): if $f$ is continuous on $[a, b]$, then $f$ takes every value between $f(a)$ and $f(b)$ somewhere in between.

A classic use is to prove an equation has a solution without solving it. Does $x^3 + x - 1 = 0$ have a solution between 0 and 1? Let $f(x) = x^3 + x - 1$. Then $f(0) = -1 < 0$ and $f(1) = 1 > 0$. The polynomial is continuous, and 0 lies between $-1$ and $1$, so some $c$ in $(0, 1)$ has $f(c) = 0$. We know a root exists even though we have not found it.

### Why it works
The IVT relies on the real number line having no gaps. If the graph went from below zero to above zero without crossing zero, it would have to "jump over" the line $y = 0$, and continuity forbids jumps. This is also why the theorem fails for discontinuous functions: the stamp price jumps from 50 cents to 55 cents without ever being 52 cents.

### Common mistakes
Students often think "continuous" means "smooth". It does not: $|x|$ is continuous everywhere, even though it has a sharp corner at 0. Smoothness (having a derivative) is a stronger condition we meet in the next unit. Another mistake is to forget condition 1: a function can have a perfectly good limit at a point and still be discontinuous because it is not defined there. Finally, the IVT says a value is reached; it does not say where, and it does not say the value is reached only once.

### Summary
A function is continuous at a point when its limit there equals its value there. It can fail by a hole, a jump, or an infinite blow-up. Most familiar functions are continuous on their domains, and combining continuous functions keeps them continuous. The intermediate value theorem guarantees that a continuous function hits every value in between, which is the basis of the bisection method for finding roots.

@viz limit kind=jump | Compare the jump with the removable hole. Which one could you fix by changing a single value?

:::explore
**What to try**
1. Start on "jump" and shrink δ to its smallest value. Read the left and right outputs.
2. Switch to "hole" and shrink δ again.
3. Switch to $\sin(1/x)$ and watch the outputs as δ shrinks.

**What to notice:** on the jump, the two sides stay about 1 apart however small δ gets, so no value of $f(1)$ could make the function continuous. On the hole, the sides agree, so defining $f(1) = 2$ would repair it: a removable discontinuity. The oscillating function is a fourth, stranger kind of discontinuity where neither side settles. Compare each case with the three conditions in the article.
:::

:::formulas
$$f \text{ continuous at } c \iff \lim_{x\to c}f(x) = f(c)$$
$$\text{If } f, g \text{ are continuous at } c: \ f\pm g,\ fg,\ \tfrac fg\ (g(c)\ne0) \text{ are continuous at } c$$
$$\lim_{x\to c} f(g(x)) = f\left(\lim_{x\to c} g(x)\right)\ \text{ if } f \text{ is continuous there}$$
:::

:::thm Intermediate value theorem
If $f$ is continuous on $[a, b]$ and $N$ is any number between $f(a)$ and $f(b)$, then there is at least one $c$ in $(a, b)$ with $f(c) = N$.
:::

:::thm Extreme value theorem
If $f$ is continuous on a closed interval $[a, b]$, then $f$ attains a maximum value and a minimum value on $[a, b]$.
:::

:::steps Find $k$ so that $f(x) = \begin{cases}kx + 1 & x \le 3\\ x^2 - 2 & x > 3\end{cases}$ is continuous
1. Both pieces are polynomials, so the only possible problem is at $x = 3$.
2. Value and left limit: $f(3) = 3k + 1$.
3. Right limit: $\lim_{x\to3^+}(x^2 - 2) = 7$.
4. Continuity needs $3k + 1 = 7$, so $k = 2$.
:::

:::steps Classify the discontinuities of $f(x) = \dfrac{x^2 - 4}{x^2 - x - 2}$
1. Factor: $\dfrac{(x-2)(x+2)}{(x-2)(x+1)}$. The function is undefined at $x = 2$ and $x = -1$.
2. At $x = 2$ the factor cancels: $\lim_{x\to2}\frac{x+2}{x+1} = \frac43$. The limit exists, so it is a removable discontinuity.
3. At $x = -1$ the simplified form $\frac{x+2}{x+1}$ has top $1$ and bottom $0$, so the function blows up: an infinite discontinuity (vertical asymptote).
:::

:::steps Show that $\cos x = x$ has a solution in $[0, 1]$
1. Rewrite as $f(x) = \cos x - x = 0$. $f$ is continuous (difference of continuous functions).
2. $f(0) = 1 - 0 = 1 > 0$.
3. $f(1) = \cos 1 - 1 \approx 0.540 - 1 = -0.460 < 0$.
4. Zero lies between $1$ and $-0.460$, so by the IVT there is a $c$ in $(0, 1)$ with $\cos c = c$. (Numerically $c \approx 0.739$.)
:::

:::mock Exam question
Let $f(x) = x^3 - 4x + 1$. Use the intermediate value theorem to show that $f$ has at least three real roots, giving an interval for each.
:::solution
$f$ is a polynomial, so it is continuous everywhere. Evaluate: $f(-3) = -27 + 12 + 1 = -14$, $f(-2) = -8 + 8 + 1 = 1$, $f(0) = 1$, $f(1) = 1 - 4 + 1 = -2$, $f(2) = 8 - 8 + 1 = 1$. Sign changes occur on $[-3, -2]$ ($-14$ to $1$), on $[0, 1]$ ($1$ to $-2$) and on $[1, 2]$ ($-2$ to $1$). By the IVT there is a root in each of these three intervals, and since a cubic has at most three roots, there are exactly three.
:::
:::

:::cs Bisection is binary search for roots
The IVT justifies the **bisection method**: if $f(a) < 0 < f(b)$, a root lies between. Check the midpoint $m$, keep whichever half still has a sign change, and repeat. Each step halves the interval, so after 30 steps an interval of length 1 has shrunk to about $10^{-9}$. It is slow but guaranteed, and it is the same idea as binary search on a sorted array.
:::

:::ml Continuity and trainability
ReLU, $\max(0, x)$, is continuous but has a corner at 0. The step function used by the original perceptron, $1$ if $x > 0$ else $0$, has a jump at 0. Its derivative is 0 everywhere else, so a gradient gives no signal about which way to move. Replacing jumps with continuous (and nearly differentiable) functions like the sigmoid is what made multi-layer networks trainable by gradient descent.
:::

:::real Thermostats and tax brackets
A heater's temperature changes continuously, so if it is 18 °C at 7 am and 22 °C at 8 am, the IVT guarantees it was exactly 20 °C at some moment. Postage prices, parking fees and the "marginal tax rate" are jump functions: they change abruptly at thresholds, which is why people care so much about being just under a cutoff.
:::

:::quiz
? $f(x) = \frac{1}{x - 2}$ has what kind of discontinuity at $x = 2$?
- removable
- jump
+ infinite
> The denominator goes to 0 while the numerator stays 1, so the function blows up.

? Which function is continuous at $x = 0$?
+ $|x|$
- $\frac{1}{x}$
- $\frac{\sin x}{x}$ (undefined at 0)
> $|x|$ has a corner but no break: its limit and value at 0 are both 0.

? For which value of $a$ is $f(x) = ax$ for $x < 1$, $f(x) = 5$ for $x \ge 1$ continuous?
= 5
> Left limit $a$ must equal $f(1) = 5$.

? $f(x) = \frac{x^2 - 9}{x - 3}$ has a removable discontinuity at 3. What value of $f(3)$ removes it?
= 6
> The limit is $\lim(x + 3) = 6$.

? $f$ is continuous on $[0, 4]$, $f(0) = 3$ and $f(4) = -1$. Which must be true?
+ $f(c) = 0$ for some $c$ in $(0, 4)$
- $f(2) = 1$
- $f$ is decreasing
> The IVT only promises that every value between $-1$ and $3$, including 0, is hit somewhere.
:::

# Unit: Derivatives

## Lesson: The derivative {#derivative}
@summary: Instantaneous rate of change, defined as the limit of secant slopes, and read as the slope of the tangent line.

### The question the derivative answers
Your car's speedometer shows 60 km/h. What does that number actually mean? Speed is distance divided by time, but at a single instant no time passes and no distance is covered, so the formula gives $\frac{0}{0}$. Yet the speedometer clearly shows something meaningful. The derivative is the mathematical answer to this puzzle: it is the **instantaneous rate of change** of one quantity with respect to another. In machine learning it answers the most important question in training: "if I nudge this weight a tiny bit, how much does the loss change?"

### Average rate of change
Start with something we can compute. Suppose a ball is dropped and its distance fallen after $t$ seconds is $s(t) = 5t^2$ metres. Between $t = 1$ and $t = 3$ it falls $s(3) - s(1) = 45 - 5 = 40$ m in 2 s, an **average speed** of $\frac{40}{2} = 20$ m/s. In general the average rate of change of $f$ from $x$ to $x + h$ is
$$\frac{f(x + h) - f(x)}{h}.$$
On the graph this is the slope of the **secant line** through the two points $(x, f(x))$ and $(x + h, f(x + h))$.

### Shrinking the interval
To get the speed *at* $t = 1$, shrink the interval. From $t = 1$ to $t = 1.1$: $\frac{5(1.21) - 5}{0.1} = \frac{1.05}{0.1} = 10.5$ m/s. From 1 to 1.01: $\frac{5(1.0201) - 5}{0.01} = 10.05$ m/s. From 1 to 1.001: $10.005$ m/s. The averages are closing in on 10 m/s. That limiting value is the instantaneous speed. On the graph, the secant line pivots and settles into the **tangent line**, the line that just touches the curve at that point and has the same direction as the curve there.

### The definition
The **derivative** of $f$ at $x$ is the limit of the secant slopes:
$$f'(x) = \lim_{h\to0}\frac{f(x+h) - f(x)}{h}.$$
If this limit exists, $f$ is **differentiable** at $x$. Doing it for every $x$ gives a new function $f'$, the derivative function, which tells you the slope of $f$ at each point.

Let us compute it for $f(x) = x^2$. We have $f(x + h) = x^2 + 2xh + h^2$. The difference quotient is
$$\frac{x^2 + 2xh + h^2 - x^2}{h} = \frac{2xh + h^2}{h} = 2x + h.$$
As $h \to 0$ this becomes $2x$. So $f'(x) = 2x$: the slope of the parabola at $x = 3$ is 6, at $x = 0$ it is 0 (the bottom of the bowl), and at $x = -1$ it is $-2$ (going downhill). The ball example is just $5$ times this: $s'(t) = 10t$, so $s'(1) = 10$ m/s, matching our table.

:::def Derivative
$f'(x) = \lim_{h\to0}\frac{f(x+h) - f(x)}{h}$: the instantaneous rate of change of $f$ at $x$, equal to the slope of the tangent line.
:::

:::def Tangent line
The line through $(a, f(a))$ with slope $f'(a)$: $y = f(a) + f'(a)(x - a)$.
:::

### Notation
Several notations mean the same thing, and you will see all of them: $f'(x)$ (Lagrange), $\frac{df}{dx}$ or $\frac{dy}{dx}$ (Leibniz), $\frac{d}{dx}f(x)$, and $\dot y$ (Newton, used for time derivatives in physics). Leibniz's $\frac{dy}{dx}$ is especially helpful because it reminds you that the derivative is a ratio of a tiny change in $y$ to a tiny change in $x$.

### Three ways to read a derivative
The same number has three interpretations. As **slope**, $f'(a)$ is the steepness of the graph at $a$. As **rate**, if $s(t)$ is position then $s'(t)$ is velocity, and the derivative of velocity, $s''(t)$, is acceleration. As **sensitivity**, $f'(a)$ tells you how much the output responds to a small nudge of the input:
$$f(a + \Delta x) \approx f(a) + f'(a)\,\Delta x.$$
For example, with $f(x) = x^2$ at $a = 3$, a nudge of $\Delta x = 0.1$ changes the output by about $f'(3)\cdot 0.1 = 0.6$; the true change is $3.1^2 - 9 = 0.61$. This sensitivity reading is the one machine learning uses all the time.

### When the derivative does not exist
A function can fail to be differentiable in three ways. At a **corner**, like $|x|$ at 0, the slope from the left ($-1$) differs from the slope from the right ($+1$), so the limit does not exist. At a **vertical tangent**, like $\sqrt[3]{x}$ at 0, the slope is infinite. And at any **discontinuity** the derivative cannot exist. That last fact is a theorem: differentiable implies continuous. The reverse is false, as $|x|$ shows.

### Common mistakes
Do not confuse the derivative at a point (a number, like $f'(3) = 6$) with the derivative function (a formula, like $f'(x) = 2x$). Do not plug $h = 0$ into the difference quotient before simplifying; that gives $\frac00$ every time. And remember the units: if $f$ is in metres and $x$ in seconds, $f'$ is in metres per second. Units are a quick sanity check on any derivative.

### Summary
The derivative is the limit of average rates of change as the interval shrinks to zero. Geometrically it is the slope of the tangent line; physically it is an instantaneous rate; practically it measures sensitivity, $\Delta f \approx f'\Delta x$. Functions with corners, vertical tangents or breaks are not differentiable there. Next we learn rules that let us find derivatives without computing a limit every time.

@viz tangent | Shrink h and watch the orange secant line become the pink tangent. Toggle f′(x) to see the slope as its own function.

:::explore
**What to try**
1. Leave $f(x) = x^3 - 3x$ and set h to about 1.5. Read the secant slope. Now drag h toward 0.001 and watch the secant slope approach the tangent slope.
2. Drag the pink point to $x = 1$ and $x = -1$. What is the tangent slope there?
3. Press "Show f′(x)". Compare where the green curve crosses zero with where the original curve is flat.
4. Switch $f$ to $|x|$ and put the point at 0.

**What to notice:** the secant slope is the average rate of change and the tangent slope is its limit, exactly as in the ball example. The derivative is 0 at $x = \pm1$, the tops and bottoms of the hills. Where $f$ rises the green curve is positive, where it falls it is negative. At the corner of $|x|$ the secant slope depends on which side $h$ is on, so no tangent exists.
:::

:::formulas
$$f'(x) = \lim_{h\to0}\frac{f(x+h) - f(x)}{h} \qquad f'(a) = \lim_{x\to a}\frac{f(x) - f(a)}{x - a}$$
$$\text{tangent line at } a: \ y = f(a) + f'(a)(x - a)$$
$$f(a + \Delta x) \approx f(a) + f'(a)\,\Delta x$$
:::

:::thm Differentiable implies continuous
If $f$ is differentiable at $a$, then $f$ is continuous at $a$.
:::

:::proof
For $x \ne a$, write $f(x) - f(a) = \frac{f(x) - f(a)}{x - a}\cdot(x - a)$. As $x \to a$ the first factor tends to $f'(a)$ and the second to 0, so the product tends to $f'(a)\cdot 0 = 0$. Hence $\lim_{x\to a}f(x) = f(a)$, which is continuity.
:::

:::steps Derivative of $f(x) = \dfrac{1}{x}$ from the definition
1. Difference quotient: $\dfrac{\frac{1}{x+h} - \frac1x}{h}$.
2. Combine the top: $\frac{1}{x+h} - \frac1x = \frac{x - (x + h)}{x(x+h)} = \frac{-h}{x(x+h)}$.
3. Divide by $h$: $\dfrac{-1}{x(x+h)}$.
4. Let $h\to0$: $f'(x) = -\dfrac{1}{x^2}$. At $x = 2$ the slope is $-\frac14$.
:::

:::steps Tangent line to $f(x) = x^2$ at $x = 3$
1. Point: $f(3) = 9$, so the line passes through $(3, 9)$.
2. Slope: $f'(x) = 2x$, so $f'(3) = 6$.
3. Line: $y = 9 + 6(x - 3) = 6x - 9$.
4. Check: at $x = 3.1$ the line gives $9.6$ and the curve gives $9.61$. Very close.
:::

:::steps Derivative of $f(x) = \sqrt{x}$ at $x = 4$ from the definition
1. $\dfrac{\sqrt{4 + h} - 2}{h}$. Multiply by the conjugate $\sqrt{4+h} + 2$.
2. Top becomes $(4 + h) - 4 = h$, so the quotient is $\dfrac{1}{\sqrt{4+h} + 2}$.
3. Let $h\to 0$: $\dfrac{1}{4}$.
:::

:::mock Exam question
A stone's height in metres after $t$ seconds is $h(t) = 20t - 5t^2$. (a) Find its average velocity over $[1, 2]$. (b) Use the definition of the derivative to find its velocity at $t = 1$. (c) When is it momentarily at rest?
:::solution
(a) $h(1) = 15$, $h(2) = 20$, so the average velocity is $\frac{20 - 15}{1} = 5$ m/s.
(b) $\frac{h(1 + k) - h(1)}{k} = \frac{20(1 + k) - 5(1 + k)^2 - 15}{k} = \frac{20 + 20k - 5 - 10k - 5k^2 - 15}{k} = \frac{10k - 5k^2}{k} = 10 - 5k \to 10$ m/s.
(c) In general $h'(t) = 20 - 10t$, which is 0 at $t = 2$ s, the top of its flight.
:::
:::

:::ml The derivative is the learning signal
If $L(w)$ is the loss as a function of a single weight $w$, then $L'(w)$ says how the loss responds to a nudge in $w$. If $L'(w) = 3$, increasing $w$ by $0.01$ raises the loss by about $0.03$, so we should decrease $w$. Gradient descent does exactly this: $w \leftarrow w - \eta L'(w)$. A model with a billion weights uses a billion of these derivatives, collected into a gradient.
:::

:::cs Numerical derivatives
A computer can approximate $f'(x)$ by the difference quotient with a small $h$. The central difference $\frac{f(x + h) - f(x - h)}{2h}$ is far more accurate than the one-sided one. Programmers use it for **gradient checking**: comparing a hand-coded or autodiff derivative against a numerical estimate to catch bugs.
:::

:::real Marginal cost
If $C(q)$ is the cost of producing $q$ items, economists call $C'(q)$ the **marginal cost**: the approximate cost of making one more item. If $C(q) = 1000 + 2q + 0.01q^2$, then $C'(q) = 2 + 0.02q$, so the 500th item costs about $C'(500) = 12$ dollars to make.
:::

:::quiz
? Using the definition, the derivative of $f(x) = 3x + 5$ is...
= 3
> $\frac{3(x+h) + 5 - (3x + 5)}{h} = \frac{3h}{h} = 3$.

? If $s(t) = t^2$ is position in metres, what is the velocity at $t = 4$?
= 8
> $s'(t) = 2t$, so $s'(4) = 8$ m/s.

? The average rate of change of $f(x) = x^2$ from $x = 1$ to $x = 3$ is...
= 4
> $\frac{9 - 1}{3 - 1} = 4$.

? Where is $f(x) = |x - 2|$ not differentiable?
= 2
> It has a corner at $x = 2$.

? If $f(5) = 10$ and $f'(5) = 3$, estimate $f(5.2)$.
= 10.6
> $f(5.2) \approx 10 + 3(0.2) = 10.6$.

? Which statement is true?
+ Every differentiable function is continuous.
- Every continuous function is differentiable.
- A function with a corner has derivative 0 there.
> $|x|$ is continuous but not differentiable at 0, so the converse fails.
:::

## Lesson: Differentiation rules {#diff-rules}
@summary: The power, sum, product and quotient rules, and the derivatives of exponentials, logs and trig functions.

### Why we need rules
Computing every derivative from the limit definition is like computing every multiplication by repeated addition: possible, but painfully slow. After working out a handful of limits once, mathematicians noticed patterns. Those patterns are the **differentiation rules**, and with a small toolkit of them you can differentiate almost any formula you will ever write down, in seconds. This lesson builds that toolkit and explains where each rule comes from, so you are not just memorizing.

### An everyday picture
Think of a derivative as asking "how fast is this changing?". If you earn money from two jobs, the rate your total income grows is the sum of the two rates. If a recipe calls for three times as much flour, the flour runs out three times as fast. These two common-sense facts are the **sum rule** and the **constant multiple rule**. The product rule is a little more subtle, and we will see a picture for it below.

### Constants and powers
A constant function, like $f(x) = 7$, has a flat graph, so its slope is 0 everywhere: $\frac{d}{dx}c = 0$. The line $f(x) = x$ has slope 1 everywhere.

For powers we found $\frac{d}{dx}x^2 = 2x$ in the previous lesson. If you do the same algebra for $x^3$, expanding $(x+h)^3 = x^3 + 3x^2h + 3xh^2 + h^3$, the difference quotient becomes $3x^2 + 3xh + h^2$, which tends to $3x^2$. The pattern is the **power rule**:
$$\frac{d}{dx}x^n = nx^{n-1}.$$
Bring the exponent down in front, then lower the exponent by one. It works for every real exponent, not just whole numbers. For example $\sqrt x = x^{1/2}$ has derivative $\frac12x^{-1/2} = \frac{1}{2\sqrt x}$, and $\frac1x = x^{-1}$ has derivative $-x^{-2} = -\frac{1}{x^2}$, matching what we found from the definition.

:::def Power rule
$\frac{d}{dx}x^n = nx^{n-1}$ for any real constant $n$.
:::

### Sums and constant multiples
Derivatives are **linear**: $(f + g)' = f' + g'$ and $(cf)' = cf'$. So a polynomial can be differentiated term by term. For $p(x) = 4x^3 - 5x^2 + 2x - 9$:
$$p'(x) = 12x^2 - 10x + 2.$$
At $x = 1$ the slope is $12 - 10 + 2 = 4$.

### The product rule
The derivative of a product is *not* the product of the derivatives. Picture a rectangle with sides $f$ and $g$, so its area is $fg$. If both sides grow a little, by $\Delta f$ and $\Delta g$, the area grows by two thin strips, $f\,\Delta g$ and $g\,\Delta f$, plus a tiny corner $\Delta f\,\Delta g$ that is negligible. Dividing by $\Delta x$ and shrinking gives
$$(fg)' = f'g + fg'.$$
"Derivative of the first times the second, plus the first times the derivative of the second." Check it on $x^2\cdot x^3 = x^5$: the rule gives $2x\cdot x^3 + x^2\cdot 3x^2 = 5x^4$, which matches the power rule. Multiplying the derivatives would have given $2x\cdot3x^2 = 6x^3$, which is wrong.

:::def Product rule
$(fg)' = f'g + fg'$.
:::

### The quotient rule
For a fraction $\frac{f}{g}$,
$$\left(\frac fg\right)' = \frac{f'g - fg'}{g^2}.$$
The minus sign means order matters: derivative of the top comes first. A popular chant is "low d-high minus high d-low, over low squared". For $\frac{x}{x + 1}$: $\frac{1\cdot(x + 1) - x\cdot1}{(x+1)^2} = \frac{1}{(x+1)^2}$.

### Exponentials and logarithms
The number $e \approx 2.718$ is special precisely because of calculus: $e^x$ is the function that is its own derivative,
$$\frac{d}{dx}e^x = e^x.$$
At every point, the height of the graph equals its slope. Other bases pick up a constant: $\frac{d}{dx}2^x = 2^x\ln 2$, since $2^x = e^{x\ln2}$. The natural log has the beautifully simple derivative $\frac{d}{dx}\ln x = \frac1x$ for $x > 0$. So $\ln x$ is steep near 0 and very flat for large $x$; it grows forever but ever more slowly.

### Trigonometric functions
With angles in radians, $\frac{d}{dx}\sin x = \cos x$ and $\frac{d}{dx}\cos x = -\sin x$. You can see the first one on a graph: $\sin x$ is steepest (slope 1) at $x = 0$, where $\cos 0 = 1$, and flat at its peak $x = \frac\pi2$, where $\cos\frac\pi2 = 0$. The quotient rule then gives $\frac{d}{dx}\tan x = \sec^2 x$. The proofs rely on the famous limit $\lim_{h\to0}\frac{\sin h}{h} = 1$, which is exactly why radians are used: in degrees, every trig derivative would carry an ugly factor of $\frac{\pi}{180}$.

### Putting rules together
Real formulas mix rules. For $y = x^2e^x$, the product rule with $f = x^2$, $g = e^x$ gives $y' = 2xe^x + x^2e^x = xe^x(x + 2)$. For $y = \frac{\ln x}{x}$, the quotient rule gives $\frac{\frac1x\cdot x - \ln x\cdot 1}{x^2} = \frac{1 - \ln x}{x^2}$. Always simplify the original expression first if you can: $\frac{x^3 + x}{x} = x^2 + 1$ for $x \ne 0$ has derivative $2x$ with no quotient rule needed.

### Common mistakes
The biggest one is $(fg)' = f'g'$; it is wrong, as the $x^5$ check shows. Next is mixing up the order in the quotient rule, which flips the sign. Another is applying the power rule to exponentials: $\frac{d}{dx}2^x$ is **not** $x2^{x-1}$, because the variable is in the exponent, not the base. And $\frac{d}{dx}e^5 = 0$, because $e^5$ is just a constant.

### Summary
Derivatives are linear, so differentiate sums term by term and pull constants out. Powers use $nx^{n-1}$. Products use $f'g + fg'$; quotients use $\frac{f'g - fg'}{g^2}$. $e^x$ is its own derivative, $\ln x$ has derivative $\frac1x$, and $\sin$ and $\cos$ swap into each other with a sign. The one missing rule, for functions inside other functions, is the chain rule in the next lesson.

@viz tangent f="sin x" | Press Show f′(x): the green slope curve of sin x is exactly cos x.

:::explore
**What to try**
1. With $f = \sin x$, press "Show f′(x)". Drag the point to $x = 0$, then to about $x = 1.57$ ($\frac\pi2$).
2. Switch to $e^x$ with f′ shown. Compare the height of the curve with the tangent slope readout.
3. Switch to $\ln x$, put the point near $x = 0.5$, then near $x = 3$.
4. Switch to $x^2$ and check that the slope at each point is twice the $x$-coordinate.

**What to notice:** the green curve for $\sin x$ is the cosine wave, shifted a quarter period left. For $e^x$ the green and blue curves sit on top of each other, because $e^x$ is its own derivative. For $\ln x$ the slope at $x$ is $\frac1x$: 2 at $x = 0.5$ and $\frac13$ at $x = 3$. Each picture is one rule from the table.
:::

@viz sigmoid | The sigmoid squashes any input into (0, 1). Its slope is largest at 0.

:::explore
**What to try**
1. Look at the sigmoid curve in the top panel and find where it is steepest.
2. Imagine the tangent at $z = 4$ or $z = -4$: how steep is it?

**What to notice:** the sigmoid's derivative, $\sigma'(z) = \sigma(z)(1 - \sigma(z))$, peaks at $z = 0$ with value $0.5\cdot0.5 = 0.25$ and is nearly 0 far from the centre. That small maximum is one reason deep networks of sigmoids learned slowly (vanishing gradients).
:::

:::formulas
$$\frac{d}{dx}c = 0 \qquad \frac{d}{dx}x^n = nx^{n-1}$$
$$\frac{d}{dx}e^x = e^x \qquad \frac{d}{dx}a^x = a^x\ln a \qquad \frac{d}{dx}\ln x = \frac1x \qquad \frac{d}{dx}\log_a x = \frac{1}{x\ln a}$$
$$\frac{d}{dx}\sin x = \cos x \qquad \frac{d}{dx}\cos x = -\sin x \qquad \frac{d}{dx}\tan x = \sec^2x$$
$$(cf)' = cf' \qquad (f \pm g)' = f' \pm g'$$
$$(fg)' = f'g + fg' \qquad \left(\frac fg\right)' = \frac{f'g - fg'}{g^2}$$
:::

:::thm Product rule
If $f$ and $g$ are differentiable at $x$, then $(fg)'(x) = f'(x)g(x) + f(x)g'(x)$.
:::

:::proof
Add and subtract $f(x+h)g(x)$ in the numerator: $\frac{f(x+h)g(x+h) - f(x)g(x)}{h} = f(x+h)\frac{g(x+h) - g(x)}{h} + g(x)\frac{f(x+h) - f(x)}{h}$. As $h\to0$, $f(x+h)\to f(x)$ (differentiable functions are continuous) and the two quotients tend to $g'(x)$ and $f'(x)$. The sum tends to $f(x)g'(x) + g(x)f'(x)$.
:::

:::steps Differentiate $y = 4x^3 - \frac{2}{x} + \sqrt x$
1. Rewrite with powers: $4x^3 - 2x^{-1} + x^{1/2}$.
2. Power rule term by term: $12x^2 + 2x^{-2} + \frac12x^{-1/2}$.
3. Tidy: $y' = 12x^2 + \dfrac{2}{x^2} + \dfrac{1}{2\sqrt x}$.
:::

:::steps Product rule: $y = x^2 e^x$
1. $f = x^2$, $g = e^x$, so $f' = 2x$, $g' = e^x$.
2. $y' = f'g + fg' = 2xe^x + x^2e^x$.
3. Factor: $y' = xe^x(x + 2)$. The slope is 0 at $x = 0$ and $x = -2$.
:::

:::steps Quotient rule: $y = \dfrac{x^2}{x + 1}$ at $x = 1$
1. Top $f = x^2$, $f' = 2x$; bottom $g = x + 1$, $g' = 1$.
2. $y' = \dfrac{2x(x+1) - x^2}{(x+1)^2} = \dfrac{x^2 + 2x}{(x+1)^2}$.
3. At $x = 1$: $\dfrac{1 + 2}{4} = \dfrac34$.
:::

:::mock Exam question
Show that the sigmoid $\sigma(x) = \dfrac{1}{1 + e^{-x}}$ satisfies $\sigma'(x) = \sigma(x)\,(1 - \sigma(x))$, and find $\sigma'(0)$.
:::solution
Write $\sigma = (1 + e^{-x})^{-1}$. Using the quotient rule with top 1 and bottom $g = 1 + e^{-x}$, $g' = -e^{-x}$: $\sigma' = \frac{0\cdot g - 1\cdot(-e^{-x})}{g^2} = \frac{e^{-x}}{(1 + e^{-x})^2}$. Split it as $\frac{1}{1 + e^{-x}}\cdot\frac{e^{-x}}{1 + e^{-x}}$. The first factor is $\sigma$, and the second is $\frac{(1 + e^{-x}) - 1}{1 + e^{-x}} = 1 - \sigma$. So $\sigma' = \sigma(1 - \sigma)$. At 0, $\sigma(0) = \frac12$, so $\sigma'(0) = \frac14$.
:::
:::

:::ml Derivatives of activation functions
Every activation function in a neural network needs a derivative for backpropagation. Sigmoid: $\sigma' = \sigma(1 - \sigma)$, at most $0.25$. Tanh: $\tanh' = 1 - \tanh^2$, at most 1. ReLU, $\max(0, x)$: derivative 1 for $x > 0$ and 0 for $x < 0$ (frameworks just pick 0 at the corner). Softplus, $\ln(1 + e^x)$: its derivative is exactly the sigmoid. Knowing these lets you predict which networks will have vanishing gradients.
:::

:::cs Symbolic differentiation
Computer algebra systems differentiate formulas by applying exactly these rules recursively to an expression tree: a sum node becomes a sum of derivatives, a product node uses the product rule, and so on. The rules are simple enough to code in an afternoon, but naive symbolic differentiation can blow up the expression size, which is one reason ML frameworks use automatic differentiation instead.
:::

:::real Revenue
A shop sells $q(p) = 200 - 4p$ items when the price is $p$ dollars. Revenue is $R(p) = p\,q(p) = 200p - 4p^2$, so $R'(p) = 200 - 8p$. At $p = 20$, $R' = 40$: raising the price by a dollar adds about \$40 of revenue. The derivative is zero at $p = 25$, the revenue-maximizing price.
:::

:::quiz
? $\frac{d}{dx}(5x^4)$ =
+ $20x^3$
- $5x^3$
- $20x^4$
> Power rule: $5\cdot4x^3$.

? $\frac{d}{dx}(x\ln x)$ =
+ $\ln x + 1$
- $\frac1x$
- $\ln x$
> Product rule: $1\cdot\ln x + x\cdot\frac1x$.

? What is the derivative of $\sigma(x)$ at $x = 0$?
= 0.25|1/4
> $\sigma(0) = 0.5$, so $\sigma'(0) = 0.5\cdot 0.5$.

? If $f(x) = x^3 - 6x$, what is $f'(2)$?
= 6
> $f'(x) = 3x^2 - 6$, so $f'(2) = 12 - 6$.

? $\frac{d}{dx}\left(e^x\sin x\right)$ =
+ $e^x(\sin x + \cos x)$
- $e^x\cos x$
- $e^x\sin x$
> Product rule: $e^x\sin x + e^x\cos x$.

? $\frac{d}{dx}\left(\frac{1}{x^2}\right)$ at $x = 1$ is...
= -2
> $\frac{1}{x^2} = x^{-2}$ has derivative $-2x^{-3}$, which is $-2$ at $x = 1$.
:::

## Lesson: The chain rule {#chain-rule}
@summary: Differentiating functions inside functions by multiplying rates of change — the engine of backpropagation.

### Why the chain rule is the most important rule
Most interesting functions are built by plugging one function into another. $\sin(3x)$ puts $3x$ inside $\sin$. $e^{-x^2}$ puts $-x^2$ inside the exponential. A neural network is dozens of layers, each one fed into the next. The rules from the previous lesson handle sums, products and quotients, but not this "function of a function" structure, called a **composition**. The **chain rule** fills that gap, and it is no exaggeration to say that modern deep learning is the chain rule applied billions of times per second.

### An everyday picture: gears
Imagine three gears in a row. Turning gear A once turns gear B three times, and turning gear B once turns gear C twice. How many times does C turn per turn of A? Obviously $3 \times 2 = 6$. Rates of change along a chain multiply. That is the entire chain rule. If $u$ changes 3 times as fast as $x$, and $y$ changes 2 times as fast as $u$, then $y$ changes 6 times as fast as $x$.

### The rule
Suppose $y = f(g(x))$. Call the inside function $u = g(x)$, so $y = f(u)$. The chain rule says
$$\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx} = f'(g(x))\cdot g'(x).$$
In words: **differentiate the outside function, leaving the inside alone, then multiply by the derivative of the inside.** Leibniz's notation makes it look like fractions cancelling, $\frac{dy}{du}\cdot\frac{du}{dx}$, which is a helpful memory aid (though $du$ is not literally a number you cancel).

:::def Composition
$(f\circ g)(x) = f(g(x))$: apply $g$ first, then feed the result into $f$. Here $g$ is the inside function and $f$ the outside function.
:::

:::def Chain rule
$\frac{d}{dx}f(g(x)) = f'(g(x))\,g'(x)$, or $\frac{dy}{dx} = \frac{dy}{du}\frac{du}{dx}$.
:::

### A first example, step by step
Take $y = (3x^2 + 1)^5$. Expanding that to a polynomial would take ages. Instead, spot the layers. The inside is $u = 3x^2 + 1$; the outside is $y = u^5$. Then $\frac{dy}{du} = 5u^4$ and $\frac{du}{dx} = 6x$. Multiply and put $u$ back:
$$\frac{dy}{dx} = 5(3x^2 + 1)^4\cdot 6x = 30x(3x^2 + 1)^4.$$
Let us sanity-check with numbers at $x = 0$: the inside has slope $6\cdot 0 = 0$ there, so the whole thing has slope 0, which makes sense because $3x^2 + 1$ is at its minimum when $x = 0$.

### Why it works
Nudge $x$ by a small $\Delta x$. The inside changes by about $\Delta u \approx g'(x)\Delta x$. The outside then changes by about $\Delta y \approx f'(u)\Delta u \approx f'(u)g'(x)\Delta x$. Dividing by $\Delta x$ and letting it shrink gives $f'(g(x))g'(x)$. Each layer scales the nudge by its own derivative, and scalings multiply.

### Common patterns
A few compositions appear so often that it is worth knowing their derivatives on sight:
$$\frac{d}{dx}e^{g(x)} = e^{g(x)}g'(x) \qquad \frac{d}{dx}\ln g(x) = \frac{g'(x)}{g(x)} \qquad \frac{d}{dx}[g(x)]^n = n[g(x)]^{n-1}g'(x).$$
For example $\frac{d}{dx}e^{5x} = 5e^{5x}$, $\frac{d}{dx}\ln(x^2 + 1) = \frac{2x}{x^2 + 1}$, and $\frac{d}{dx}\sin(2x) = 2\cos(2x)$. Notice the pattern with linear insides: replacing $x$ by $ax + b$ simply multiplies the derivative by $a$. Squeezing a graph horizontally by a factor of 2 makes it twice as steep.

### Longer chains
The rule extends to any number of layers: multiply one derivative per layer, working from the outside in. For $y = \sin^2(3x) = [\sin(3x)]^2$ there are three layers: square, sine, times 3. So
$$y' = 2\sin(3x)\cdot\cos(3x)\cdot 3 = 6\sin(3x)\cos(3x).$$
Writing the layers out explicitly, as $u = 3x$, $v = \sin u$, $y = v^2$, prevents most errors.

### Using the rule with numbers only
Sometimes you do not have formulas at all, only measured values. Suppose a table tells you that $g(1) = 2$ and $g'(1) = 3$, and that $f'(2) = 4$. Then the rate of change of $f(g(x))$ at $x = 1$ is $f'(g(1))\cdot g'(1) = f'(2)\cdot 3 = 12$. Notice that we evaluate $f'$ at $2$, the *output* of the inside function, not at $1$. This is exactly how the rule is used in practice: the forward computation tells you where each layer is being evaluated, and the derivative of each layer is looked up at that point.

### Related rates
Many word problems involve quantities that all change with time. A balloon's radius grows, so its volume grows; a ladder slides, so the height of its top falls. In each case one quantity is a function of another, which is a function of time $t$, so the chain rule links their rates: $\frac{dV}{dt} = \frac{dV}{dr}\cdot\frac{dr}{dt}$. If a balloon's radius grows at 2 cm per second, then at $r = 5$ its volume $V = \frac43\pi r^3$ grows at $4\pi r^2\cdot 2 = 200\pi$ cm³ per second. The method is always the same: write the relationship, differentiate both sides with respect to time, then substitute the numbers at the moment you care about.

### Common mistakes
The most frequent error is forgetting to multiply by the inside derivative: writing $\frac{d}{dx}\sin(2x) = \cos(2x)$ instead of $2\cos(2x)$. The second is differentiating the inside *inside* the outer derivative, writing $f'(g'(x))$ instead of $f'(g(x))g'(x)$. The third is confusing a composition with a product. $\sin(x)\cdot x^2$ is a product (use the product rule); $\sin(x^2)$ is a composition (use the chain rule). When in doubt, ask "what would I compute last if I evaluated this on a calculator?". That last step is the outside function.

### Summary
The chain rule differentiates compositions: derivative of the outside evaluated at the inside, times the derivative of the inside. Rates multiply along a chain, like gears. Write out the layers, differentiate each one, and multiply. Backpropagation in neural networks is this same idea, organized so that the products are computed efficiently from the output back to the input.

@viz func kind=transform parent=sin | Set b = 2: the graph is squeezed horizontally, so every slope doubles. That factor b is the inside derivative.

:::explore
**What to try**
1. With parent $\sin x$, move the "b (horizontal)" slider from 1 to 2. Compare the steepness of the solid curve at $x = 0$ with the dashed parent.
2. Try $b = 3$ and $b = 0.5$.
3. Change the parent to $e^x$ and set $b = 2$.

**What to notice:** the transformed function is $\sin(bx)$, a composition with inside $u = bx$. The chain rule says its slope is $b\cos(bx)$, so at $x = 0$ the slope is exactly $b$: twice as steep at $b = 2$, half as steep at $b = 0.5$. Whatever the outside function, a horizontal squeeze by $b$ multiplies every slope by $b$.
:::

:::formulas
$$\frac{d}{dx}f(g(x)) = f'(g(x))\,g'(x) \qquad \frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}$$
$$\frac{d}{dx}e^{g} = e^{g}g' \qquad \frac{d}{dx}\ln g = \frac{g'}{g} \qquad \frac{d}{dx}g^n = ng^{n-1}g'$$
$$\frac{d}{dx}f(ax + b) = a\,f'(ax + b)$$
$$\frac{dy}{dx} = \frac{dy}{dv}\cdot\frac{dv}{du}\cdot\frac{du}{dx}\ \text{ (three layers)}$$
:::

:::thm Chain rule
If $g$ is differentiable at $x$ and $f$ is differentiable at $g(x)$, then $f\circ g$ is differentiable at $x$ and $(f\circ g)'(x) = f'(g(x))\,g'(x)$.
:::

:::steps Differentiate $y = (3x^2 + 1)^5$
1. Inside $u = 3x^2 + 1$, outside $u^5$.
2. $\frac{dy}{du} = 5u^4$, $\frac{du}{dx} = 6x$.
3. Multiply: $5(3x^2 + 1)^4\cdot 6x = 30x(3x^2 + 1)^4$.
:::

:::steps Differentiate $y = e^{-x^2/2}$ and find the slope at $x = 1$
1. Outside $e^u$, inside $u = -\frac{x^2}{2}$, so $\frac{du}{dx} = -x$.
2. $\frac{dy}{dx} = e^{-x^2/2}\cdot(-x) = -xe^{-x^2/2}$.
3. At $x = 1$: $-e^{-1/2} \approx -0.607$. (This bell curve is the shape of the normal distribution.)
:::

:::steps Differentiate $y = \ln(\cos x)$
1. Outside $\ln u$, inside $u = \cos x$.
2. $\frac{dy}{dx} = \frac{1}{\cos x}\cdot(-\sin x)$.
3. Simplify: $y' = -\tan x$.
:::

:::mock Exam question
A tiny "network" computes $h = \tanh(wx + b)$ and the loss $L = (h - t)^2$. With $x = 1$, $w = 0.5$, $b = -0.5$ and target $t = 1$, find $\frac{dL}{dw}$. (Use $\tanh'(z) = 1 - \tanh^2 z$.)
:::solution
Layers: $z = wx + b$, $h = \tanh z$, $L = (h - t)^2$. Forward pass: $z = 0.5 - 0.5 = 0$, $h = \tanh 0 = 0$, $L = 1$. Backward: $\frac{dL}{dh} = 2(h - t) = -2$; $\frac{dh}{dz} = 1 - 0^2 = 1$; $\frac{dz}{dw} = x = 1$. Chain rule: $\frac{dL}{dw} = (-2)(1)(1) = -2$. The negative sign says increasing $w$ lowers the loss.
:::
:::

:::ml Backpropagation in one line
A network computes $L = \ell(f_3(f_2(f_1(x))))$. The chain rule gives
$$\frac{\partial L}{\partial x} = \ell'\cdot f_3'\cdot f_2'\cdot f_1'$$
with each factor evaluated at the value computed in the forward pass. Backprop multiplies these factors starting from the loss and moving backwards, reusing each partial product, so computing all gradients costs about the same as one forward pass. It also explains vanishing gradients: multiply many factors smaller than 1 (like sigmoid slopes of at most 0.25) and the product shrinks exponentially.
:::

:::cs Automatic differentiation
Libraries such as PyTorch and JAX record every elementary operation as a node in a computational graph, each with a known local derivative. Calling `backward()` walks the graph in reverse, multiplying local derivatives with the chain rule. This is exact (no $h$ to choose) and efficient, which is why hand-derived gradients are rarely needed today.
:::

:::real Melting ice
A spherical snowball's radius shrinks at 0.5 cm per minute. Its volume is $V = \frac43\pi r^3$, and $r$ depends on time, so $\frac{dV}{dt} = 4\pi r^2\frac{dr}{dt}$. When $r = 10$ cm, $\frac{dV}{dt} = 4\pi(100)(-0.5) = -200\pi \approx -628$ cm³ per minute. The chain rule converts a rate you know into a rate you want.
:::

:::quiz
? $\frac{d}{dx}\sin(2x)$ =
+ $2\cos(2x)$
- $\cos(2x)$
- $-2\cos 2x$
> Outside $\sin$, inside $2x$ with derivative 2.

? $\frac{d}{dx}\ln(x^2 + 1)$ =
+ $\frac{2x}{x^2 + 1}$
- $\frac{1}{x^2 + 1}$
- $2x\ln x$
> $\frac{g'}{g}$ with $g = x^2 + 1$.

? If $y = u^3$ and $u = 2x + 1$, what is $dy/dx$ at $x = 0$?
= 6
> $3u^2\cdot 2$ with $u = 1$.

? $\frac{d}{dx}e^{3x}$ at $x = 0$ is...
= 3
> $3e^{3x}$, which is 3 at $x = 0$.

? Which function needs the chain rule (not just the product rule)?
+ $\cos(x^3)$
- $x^3\cos x$
- $3\cos x$
> $\cos(x^3)$ puts $x^3$ inside $\cos$.

? If $f(2) = 5$, $f'(2) = 4$, $g(1) = 2$ and $g'(1) = 3$, what is $(f\circ g)'(1)$?
= 12
> $f'(g(1))\,g'(1) = f'(2)\cdot 3 = 12$.
:::

## Lesson: Implicit differentiation, inverse functions and related rates {#implicit}
@summary: Differentiating equations that are not solved for y, finding derivatives of inverse functions, and linking rates that change together.

### When y is tangled up with x
So far every function has arrived in the form $y = \text{(formula in } x)$. Many curves do not come that way. The circle of radius 5 is described by $x^2 + y^2 = 25$. You could solve for $y = \pm\sqrt{25 - x^2}$, but that splits the circle into two halves and the algebra gets messy. Some equations, like $y^5 + y = x$, cannot be solved for $y$ with any standard formula at all. Yet these curves still have tangent lines, and we still want their slopes. **Implicit differentiation** finds $\frac{dy}{dx}$ without ever solving for $y$.

### An everyday scenario
Imagine walking on a circular running track of radius 5 (units of 10 metres, say). At a certain moment you are at the point $(3, 4)$. Which direction are you heading? The track is not the graph of a single function, but at that point it certainly has a direction. Implicit differentiation answers this: the slope there is $-\frac34$.

### The method
The key idea is to treat $y$ as an unknown function of $x$, $y = y(x)$, and differentiate both sides of the equation with respect to $x$. Terms that involve only $x$ differentiate normally. Terms that involve $y$ need the chain rule, because $y$ is a function of $x$: for example
$$\frac{d}{dx}y^2 = 2y\frac{dy}{dx}.$$
That extra factor $\frac{dy}{dx}$ (often written $y'$) is the chain rule's "derivative of the inside". After differentiating, you collect the $y'$ terms on one side and solve for $y'$.

Apply this to the circle $x^2 + y^2 = 25$. Differentiating both sides gives $2x + 2y\,y' = 0$, so
$$y' = -\frac{x}{y}.$$
At $(3, 4)$ the slope is $-\frac34$. At $(3, -4)$, on the lower half, it is $+\frac34$. One formula handles both halves at once, which is a real advantage. Notice the answer depends on both $x$ and $y$; that is normal for implicit derivatives, since a single $x$ can correspond to several points on the curve.

:::def Implicit differentiation
Differentiating both sides of an equation in $x$ and $y$ with respect to $x$, treating $y$ as a function of $x$ (so each $y$-term picks up a factor $y'$ by the chain rule), then solving for $y'$.
:::

### Products with y
When $x$ and $y$ multiply, use the product rule. For $xy = 6$: $\frac{d}{dx}(xy) = 1\cdot y + x\cdot y'$, so $y + xy' = 0$ and $y' = -\frac yx$. At $(2, 3)$ the slope is $-\frac32$. Check: solving explicitly, $y = \frac6x$ has $y' = -\frac{6}{x^2} = -\frac64 = -\frac32$ at $x = 2$. The two methods agree, which is a good habit to test when you can.

### Derivatives of inverse functions
If $f$ and $g$ are inverse functions, then $f(g(x)) = x$ for every $x$ in the domain. Differentiate both sides with the chain rule: $f'(g(x))\,g'(x) = 1$, so
$$g'(x) = \frac{1}{f'(g(x))}.$$
Geometrically, the graph of an inverse is the mirror image of the original across the line $y = x$. Mirroring swaps rise and run, so slopes become reciprocals. For example, $\ln x$ is the inverse of $e^x$. Set $y = \ln x$, so $e^y = x$. Differentiating implicitly: $e^y y' = 1$, so $y' = \frac{1}{e^y} = \frac1x$. That is where the formula $\frac{d}{dx}\ln x = \frac1x$ comes from.

The same trick gives the inverse trig derivatives. If $y = \arctan x$ then $\tan y = x$, so $\sec^2 y\cdot y' = 1$ and $y' = \frac{1}{\sec^2 y} = \frac{1}{1 + \tan^2 y} = \frac{1}{1 + x^2}$. Similarly $\frac{d}{dx}\arcsin x = \frac{1}{\sqrt{1 - x^2}}$.

:::def Inverse function derivative
If $g = f^{-1}$ and $f'(g(x)) \ne 0$, then $g'(x) = \dfrac{1}{f'(g(x))}$: slopes of inverse functions are reciprocals at mirrored points.
:::

@fig func kind=log | The log curve is the mirror image of the exponential, so its slopes are reciprocals: very steep near 0, very flat for large x.

### Logarithmic differentiation
For functions like $y = x^x$, neither the power rule (exponent is not constant) nor the exponential rule (base is not constant) applies. Take logs first: $\ln y = x\ln x$. Differentiate implicitly: $\frac{y'}{y} = \ln x + 1$, so $y' = x^x(\ln x + 1)$. Logs turn powers into products and products into sums, which are easier to differentiate.

### Related rates
In many real situations, several quantities change over time and are tied together by an equation. Differentiating that equation with respect to time $t$ links their rates. Example: a 5 m ladder leans against a wall. Its foot is $x$ metres from the wall and its top is $y$ metres high, so $x^2 + y^2 = 25$. The foot slides away at $\frac{dx}{dt} = 1$ m/s. How fast does the top fall when $x = 3$? Differentiate with respect to $t$: $2x\frac{dx}{dt} + 2y\frac{dy}{dt} = 0$. At $x = 3$, $y = 4$, so $6 + 8\frac{dy}{dt} = 0$ and $\frac{dy}{dt} = -\frac34$ m/s. The recipe is: draw a picture, name the variables, write the equation that relates them, differentiate with respect to time, and only then substitute the numbers for the moment in question.

### Common mistakes
Forgetting the factor $y'$ when differentiating a $y$ term is the classic error: $\frac{d}{dx}y^2$ is $2yy'$, not $2y$. Another is substituting numbers *before* differentiating in related-rates problems; if you plug in $x = 3$ first, $x$ becomes a constant and its rate disappears. Finally, remember the inverse-function formula evaluates $f'$ at $g(x)$, not at $x$.

### Summary
Implicit differentiation treats $y$ as a function of $x$ and uses the chain rule on every $y$ term, then solves for $y'$. Inverse functions have reciprocal slopes at mirrored points, which explains the derivatives of $\ln x$, $\arctan x$ and $\arcsin x$. Logarithmic differentiation handles variable exponents. Related rates apply the same idea with time as the variable.

@viz inverse | Drag the point along f: its mirror point on the inverse has the reciprocal slope.

:::explore
**What to try**
1. Keep $f(x) = e^x$ and drag the point to $x = 0$. The mirror point on $\ln x$ is $(1, 0)$.
2. Drag to $x = 1$, where $e^x$ has slope $e \approx 2.72$. Look at the inverse near $x = 2.72$.
3. Switch to $2x + 1$ and compare the steepness of the two lines.

**What to notice:** at $x = 0$ the exponential has slope 1, and so does $\ln x$ at $x = 1$; the line $y = x$ is its own mirror image. Where $e^x$ is steep (slope $e$), the log is shallow (slope $\frac1e \approx 0.37$). For the line $2x + 1$ with slope 2, the inverse $\frac{x - 1}{2}$ has slope $\frac12$. This is the rule $g'(x) = \frac{1}{f'(g(x))}$.
:::

:::formulas
$$\frac{d}{dx}y^n = ny^{n-1}\frac{dy}{dx} \qquad \frac{d}{dx}(xy) = y + x\frac{dy}{dx}$$
$$(f^{-1})'(x) = \frac{1}{f'(f^{-1}(x))}$$
$$\frac{d}{dx}\ln x = \frac1x \qquad \frac{d}{dx}\arctan x = \frac{1}{1 + x^2} \qquad \frac{d}{dx}\arcsin x = \frac{1}{\sqrt{1 - x^2}}$$
$$\frac{d}{dx}x^x = x^x(\ln x + 1)$$
:::

:::thm Inverse function rule
If $f$ is differentiable and one-to-one near $a$, with $f(a) = b$ and $f'(a) \ne 0$, then $f^{-1}$ is differentiable at $b$ and $(f^{-1})'(b) = \dfrac{1}{f'(a)}$.
:::

:::proof
Assuming $f^{-1}$ is differentiable, differentiate the identity $f(f^{-1}(x)) = x$ with the chain rule: $f'(f^{-1}(x))\cdot(f^{-1})'(x) = 1$. At $x = b$, $f^{-1}(b) = a$, so $f'(a)(f^{-1})'(b) = 1$, and dividing by $f'(a) \ne 0$ gives the result.
:::

:::steps Find the tangent slope of $x^2 + xy + y^2 = 7$ at $(1, 2)$
1. Differentiate: $2x + (y + xy') + 2yy' = 0$.
2. Collect $y'$: $y'(x + 2y) = -(2x + y)$, so $y' = -\dfrac{2x + y}{x + 2y}$.
3. At $(1, 2)$: $y' = -\dfrac{4}{5}$. (Check the point is on the curve: $1 + 2 + 4 = 7$.)
:::

:::steps Derivative of $\arcsin x$ at $x = \frac12$
1. Let $y = \arcsin x$, so $\sin y = x$ and $\cos y\cdot y' = 1$.
2. $y' = \frac{1}{\cos y} = \frac{1}{\sqrt{1 - \sin^2 y}} = \frac{1}{\sqrt{1 - x^2}}$ (cos is positive on the range of arcsin).
3. At $x = \frac12$: $\frac{1}{\sqrt{3/4}} = \frac{2}{\sqrt3} \approx 1.155$.
:::

:::steps Related rates: a cone filling with water
1. A cone-shaped tank (point down) has water depth $h$ and surface radius $r = \frac h2$, so $V = \frac13\pi r^2h = \frac{\pi}{12}h^3$.
2. Differentiate in time: $\frac{dV}{dt} = \frac{\pi}{4}h^2\frac{dh}{dt}$.
3. Water enters at $\frac{dV}{dt} = 2\pi$ m³/min. At $h = 4$: $2\pi = 4\pi\frac{dh}{dt}$, so $\frac{dh}{dt} = \frac12$ m/min.
:::

:::mock Exam question
For the curve $y^3 + y = x$, find $\frac{dy}{dx}$ at the point $(2, 1)$, and use it to give the derivative of the inverse function of $f(y) = y^3 + y$ at $x = 2$.
:::solution
Check: $1 + 1 = 2$, so $(2, 1)$ is on the curve. Differentiate: $3y^2y' + y' = 1$, so $y' = \frac{1}{3y^2 + 1}$. At $y = 1$: $y' = \frac14$. The curve is exactly the graph of $f^{-1}$, so $(f^{-1})'(2) = \frac14$. Consistent with the inverse rule: $f'(1) = 3 + 1 = 4$ and $\frac{1}{4}$ is its reciprocal.
:::
:::

:::ml Normalizing flows and inverse derivatives
Normalizing flows are generative models built from invertible functions. To compute the probability of data, they need how much each function stretches space, which is the derivative of the transformation, and the inverse direction uses exactly the reciprocal rule $(f^{-1})' = \frac{1}{f'}$ (in many dimensions, the inverse Jacobian). Implicit differentiation also appears in "implicit layers" and in hyperparameter optimization, where a model's optimal weights are defined by an equation (gradient equals zero) rather than an explicit formula.
:::

:::cs Plotting implicit curves
Graphics programs draw implicit curves such as $x^2 + y^2 = 25$ by evaluating $F(x, y) = x^2 + y^2 - 25$ on a grid and tracing where it changes sign. The implicit slope $y' = -\frac{F_x}{F_y}$ tells the tracer which direction to step next, and the same idea underlies rendering of implicit surfaces in ray marching.
:::

:::real Shadows and ladders
A person 1.8 m tall walks away from a 6 m street lamp at 1.4 m/s. By similar triangles, the shadow length $s$ satisfies $\frac{6}{x + s} = \frac{1.8}{s}$, which simplifies to $s = \frac{3}{7}x$. Differentiating, $\frac{ds}{dt} = \frac37\cdot1.4 = 0.6$ m/s: the shadow grows at a constant 0.6 m/s no matter how far away the person is.
:::

:::quiz
? Differentiating $y^2$ with respect to $x$ gives...
+ $2y\,\frac{dy}{dx}$
- $2y$
- $2x$
> Chain rule: $y$ is a function of $x$.

? For $x^2 + y^2 = 25$, what is $dy/dx$ at $(4, 3)$?
= -4/3|-1.3333
> $y' = -\frac xy = -\frac43$.

? $\frac{d}{dx}\arctan x$ at $x = 1$ is...
= 1/2|0.5
> $\frac{1}{1 + 1^2}$.

? If $f(2) = 5$ and $f'(2) = 4$, what is $(f^{-1})'(5)$?
= 1/4|0.25
> Reciprocal slope at the mirrored point.

? A circle's radius grows at 3 cm/s. How fast (in cm²/s, divided by π) is its area growing when r = 2?
= 12
> $\frac{dA}{dt} = 2\pi r\frac{dr}{dt} = 2\pi\cdot2\cdot3 = 12\pi$.

? In related-rates problems, when should you substitute the numbers for the specific moment?
+ After differentiating with respect to time
- Before differentiating
- It does not matter
> Substituting first freezes quantities that are actually changing.
:::

## Lesson: Linear approximation, Newton's method and L'Hôpital's rule {#approximation}
@summary: Using the tangent line to estimate values, find roots, and evaluate tricky limits.

### The tangent line as a cheap stand-in
Zoom far enough into any smooth curve and it looks like a straight line: its tangent line. That observation is surprisingly powerful. Lines are easy: you can evaluate them, solve them, and reason about them in your head. If a complicated function is well approximated by a line near some point, we can use the line to estimate values, to hunt for roots, and even to evaluate limits that are otherwise stuck at "$\frac00$". This lesson covers all three uses.

### An everyday scenario
What is $\sqrt{4.1}$? Without a calculator, you probably know $\sqrt4 = 2$ and suspect the answer is "a bit more than 2". Calculus tells you how much more. The slope of $\sqrt x$ at $x = 4$ is $\frac{1}{2\sqrt4} = \frac14$. Moving $0.1$ to the right should raise the output by about $\frac14\times0.1 = 0.025$. So $\sqrt{4.1} \approx 2.025$. The true value is $2.02485\ldots$, so the estimate is off by less than 0.0002.

### Linearization
The tangent line to $f$ at $x = a$ is called the **linearization** of $f$ at $a$:
$$L(x) = f(a) + f'(a)(x - a).$$
It matches $f$ in value and slope at $a$, so near $a$ we have $f(x) \approx L(x)$. The approximation is excellent close to $a$ and degrades as you move away, because the curve bends away from its tangent. How fast it degrades depends on the curvature, measured by $f''$: the error is roughly $\frac12 f''(a)(x - a)^2$. Doubling the distance roughly quadruples the error.

A second classic example: near $a = 0$, $\sin x \approx x$ (since $\sin 0 = 0$, $\cos 0 = 1$), $e^x \approx 1 + x$, and $\ln(1 + x) \approx x$. So $e^{0.02} \approx 1.02$ (true value $1.0202$). These small-angle and small-$x$ approximations are used constantly in physics and engineering.

Another useful one is $(1 + x)^n \approx 1 + nx$ for small $x$. It says, for example, that $1.01^{10} \approx 1.1$ (true value $1.1046$), and it is the reason a small percentage change in a quantity raised to the power $n$ produces roughly $n$ times that percentage change in the result. Each of these approximations is just the tangent line of a familiar function at a convenient point, so you never need to memorize them: compute $f(a)$ and $f'(a)$ and write down the line.

:::def Linearization
$L(x) = f(a) + f'(a)(x - a)$, the tangent line at $a$, used as the approximation $f(x) \approx L(x)$ for $x$ near $a$.
:::

@fig tangent f="√x" x0=1 | The tangent line at x = 1 hugs the square-root curve nearby, so it gives good estimates of values such as √1.2.

### Differentials and error propagation
Writing $\Delta x = dx$ for a small change in input, the linearization says the output changes by about $dy = f'(x)\,dx$. This **differential** is how scientists estimate how measurement errors spread through a formula. If a cube's side is measured as 10 cm with a possible error of 0.1 cm, the volume $V = s^3$ has error about $dV = 3s^2\,ds = 3(100)(0.1) = 30$ cm³, which is 3% of 1000 cm³. A 1% error in length became a 3% error in volume, because of the exponent 3.

:::def Differential
$dy = f'(x)\,dx$: the change in the tangent line's output for an input change $dx$, approximating the true change $\Delta y$.
:::

### Newton's method for finding roots
Suppose we want to solve $f(x) = 0$, for example $x^2 - 2 = 0$, whose positive root is $\sqrt2$. Start with a guess $x_0$. Replace $f$ by its tangent line at $x_0$ and solve the *line* instead, which is easy: $f(x_0) + f'(x_0)(x - x_0) = 0$ gives
$$x_1 = x_0 - \frac{f(x_0)}{f'(x_0)}.$$
Repeat from $x_1$. For $x^2 - 2$ starting at $x_0 = 1$: $x_1 = 1 - \frac{-1}{2} = 1.5$, then $x_2 = 1.5 - \frac{0.25}{3} = 1.41667$, then $x_3 \approx 1.414216$. The true value is $1.4142136$. The number of correct digits roughly doubles each step, a property called quadratic convergence. Newton's method can fail if $f'(x_n)$ is near zero (the tangent is nearly flat and shoots you far away) or if the starting guess is poor.

:::def Newton's method
The iteration $x_{n+1} = x_n - \dfrac{f(x_n)}{f'(x_n)}$, which jumps to where the tangent line crosses zero.
:::

### L'Hôpital's rule
Limits like $\lim_{x\to0}\frac{\sin x}{x}$ give "$\frac00$" when you substitute. Near 0, both top and bottom are close to their linearizations: $\sin x \approx x$ and $x \approx x$, so the ratio is about 1. In general, if $f(a) = g(a) = 0$, then near $a$
$$\frac{f(x)}{g(x)} \approx \frac{f'(a)(x - a)}{g'(a)(x - a)} = \frac{f'(a)}{g'(a)}.$$
This is **L'Hôpital's rule**: for a $\frac00$ or $\frac\infty\infty$ form, $\lim\frac fg = \lim\frac{f'}{g'}$, provided the right-hand limit exists. Example: $\lim_{x\to0}\frac{e^x - 1}{x} = \lim\frac{e^x}{1} = 1$. You may apply it repeatedly: $\lim_{x\to0}\frac{1 - \cos x}{x^2} = \lim\frac{\sin x}{2x} = \lim\frac{\cos x}{2} = \frac12$. It also shows that exponentials beat powers: $\lim_{x\to\infty}\frac{x^2}{e^x} = \lim\frac{2x}{e^x} = \lim\frac{2}{e^x} = 0$.

### Common mistakes
L'Hôpital's rule differentiates the top and bottom *separately*; it is not the quotient rule. It only applies to indeterminate forms: $\lim_{x\to0}\frac{x + 1}{x + 2} = \frac12$ by substitution, and blindly differentiating would give the wrong answer 1. For linearization, remember it is only reliable near $a$; using the tangent at 4 to estimate $\sqrt{9}$ gives $3.25$, a poor answer.

### Summary
The tangent line $L(x) = f(a) + f'(a)(x - a)$ approximates $f$ near $a$, with error that grows like the square of the distance. Differentials estimate how errors propagate. Newton's method repeatedly solves the tangent line to home in on roots very quickly. L'Hôpital's rule compares the linear rates of top and bottom to resolve $\frac00$ and $\frac\infty\infty$ limits.

@viz tangent f="√x" x0=1 | The tangent line is the linearization. Drag the point and compare the line with the curve a short distance away.

:::explore
**What to try**
1. With $f = \sqrt x$ at $x_0 = 1$, read the slope (it should be $0.5$). Follow the tangent line $L(x) = 1 + \frac12(x - 1)$ to $x = 1.2$ and to $x = 3$.
2. Switch to $\sin x$ and drag the point to $x = 0$: the tangent is the line $y = x$.
3. Switch to $e^x$ at $x = 0$: the tangent is $y = 1 + x$.

**What to notice:** close to the point of tangency, line and curve are almost indistinguishable, which is why $L(1.2) = 1.1$ is so close to $\sqrt{1.2} = 1.0954$. Far away (at $x = 3$) they separate: the line gives $2$ while $\sqrt3 \approx 1.732$. The same thing happens for the estimate $\sqrt{4.1} \approx 2.025$ from the article, using the tangent at 4 instead. The more the curve bends, the faster the gap grows.
:::

@viz newton | Each Step follows the tangent line down to the x-axis to get the next guess.

:::explore
**What to try**
1. With $x^2 - 2$, start at $x_0 = 3$ and press Step four times. Watch the readout of $x_n$.
2. Drag the starting point close to 0 and press Step once.
3. Try $\cos x - x$ from several starting points.

**What to notice:** from 3 the guesses go $3, 1.833, 1.462, 1.4149, 1.41421$, doubling correct digits each time. Starting near 0, the tangent is almost flat, so the first step flies far away, the failure mode described in the article. For $\cos x - x$ every reasonable start converges to about $0.739$.
:::

:::formulas
$$L(x) = f(a) + f'(a)(x - a) \qquad dy = f'(x)\,dx$$
$$\sin x \approx x,\quad e^x \approx 1 + x,\quad \ln(1 + x) \approx x,\quad (1 + x)^n \approx 1 + nx \quad (x \text{ near } 0)$$
$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$
$$\lim_{x\to a}\frac{f(x)}{g(x)} = \lim_{x\to a}\frac{f'(x)}{g'(x)}\quad\left(\text{for } \tfrac00 \text{ or } \tfrac\infty\infty\right)$$
:::

:::thm L'Hôpital's rule
Suppose $f$ and $g$ are differentiable near $a$ (except possibly at $a$), $g'(x) \ne 0$ near $a$, and $\lim f = \lim g = 0$ (or both $\pm\infty$). If $\lim_{x\to a}\frac{f'(x)}{g'(x)}$ exists, then $\lim_{x\to a}\frac{f(x)}{g(x)}$ equals it.
:::

:::proof
(Simple case: $f, g$ have continuous derivatives, $f(a) = g(a) = 0$, $g'(a) \ne 0$.) For $x \ne a$, $\frac{f(x)}{g(x)} = \frac{f(x) - f(a)}{g(x) - g(a)} = \frac{\frac{f(x) - f(a)}{x - a}}{\frac{g(x) - g(a)}{x - a}}$. As $x \to a$ the top and bottom difference quotients tend to $f'(a)$ and $g'(a)$, so the ratio tends to $\frac{f'(a)}{g'(a)} = \lim\frac{f'}{g'}$ by continuity of the derivatives. The general case uses the Cauchy mean value theorem.
:::

:::steps Estimate $\sqrt[3]{8.06}$ with a linearization
1. Use $f(x) = x^{1/3}$ at $a = 8$: $f(8) = 2$, $f'(x) = \frac13x^{-2/3}$, so $f'(8) = \frac{1}{3\cdot4} = \frac{1}{12}$.
2. $L(8.06) = 2 + \frac{1}{12}(0.06) = 2.005$.
3. True value: $2.004988\ldots$, so the error is about $0.00001$.
:::

:::steps One Newton step for $x^3 - 2x - 5 = 0$ from $x_0 = 2$
1. $f(2) = 8 - 4 - 5 = -1$, $f'(x) = 3x^2 - 2$, so $f'(2) = 10$.
2. $x_1 = 2 - \frac{-1}{10} = 2.1$.
3. Check: $f(2.1) = 9.261 - 4.2 - 5 = 0.061$, already much closer to 0. (The root is about $2.0946$.)
:::

:::steps Evaluate $\lim_{x\to0}\dfrac{1 - \cos x}{x^2}$
1. Substituting gives $\frac00$, so L'Hôpital applies: $\lim\frac{\sin x}{2x}$.
2. Still $\frac00$; apply again: $\lim\frac{\cos x}{2}$.
3. Substitute: $\frac12$.
:::

:::mock Exam question
A pendulum's period is $T = 2\pi\sqrt{\ell/g}$. If the length $\ell$ is measured with a 2% error, estimate the percentage error in $T$ using differentials. Then evaluate $\lim_{x\to\infty}\frac{\ln x}{x}$.
:::solution
$T = c\,\ell^{1/2}$ with $c = \frac{2\pi}{\sqrt g}$, so $dT = \frac12c\,\ell^{-1/2}d\ell$ and $\frac{dT}{T} = \frac12\frac{d\ell}{\ell}$. A 2% error in $\ell$ gives about a 1% error in $T$. For the limit, both top and bottom go to $\infty$, so L'Hôpital gives $\lim\frac{1/x}{1} = 0$: logs grow slower than any line.
:::
:::

:::ml Linearization everywhere in ML
Gradient descent trusts the linearization $L(\theta + \Delta) \approx L(\theta) + \nabla L\cdot\Delta$, which is only accurate for small steps; that is why the learning rate must be small. Newton's method applied to $f'(x) = 0$ gives second-order optimizers ($x_{n+1} = x_n - \frac{f'(x_n)}{f''(x_n)}$), and the "delta method" in statistics uses differentials to approximate the variance of a transformed estimate: $\operatorname{Var}(g(X)) \approx g'(\mu)^2\operatorname{Var}(X)$.
:::

:::cs How computers compute square roots and divisions
Hardware and math libraries compute $\sqrt a$ and $\frac1a$ with Newton iterations. For $\sqrt a$, Newton on $x^2 - a$ gives the ancient Babylonian rule $x_{n+1} = \frac12\left(x_n + \frac{a}{x_n}\right)$. The famous "fast inverse square root" in the Quake III engine used a clever bit-level initial guess followed by one Newton step.
:::

:::real Small-angle approximation
A pendulum swinging through a small angle $\theta$ obeys $\theta'' = -\frac g\ell\sin\theta$. Replacing $\sin\theta$ by its linearization $\theta$ turns this into simple harmonic motion with period $2\pi\sqrt{\ell/g}$, accurate to within 1% for swings up to about 23 degrees. Clockmakers relied on exactly this approximation.
:::

:::quiz
? The linearization of $e^x$ at $a = 0$ is...
+ $1 + x$
- $x$
- $e + ex$
> $f(0) = 1$, $f'(0) = 1$.

? Use the linearization of $\sqrt x$ at 9 to estimate $\sqrt{9.6}$.
= 3.1
> $3 + \frac16(0.6) = 3.1$ (true value $3.098$).

? One Newton step for $x^2 - 2$ from $x_0 = 2$ gives $x_1$ =
= 1.5|3/2
> $2 - \frac{2}{4} = 1.5$.

? $\lim_{x\to0}\frac{e^x - 1}{x}$ =
= 1
> L'Hôpital: $\lim\frac{e^x}{1} = 1$.

? A sphere's radius is measured as 10 with error 0.1. Approximately what percentage error is there in its volume?
= 3
> $\frac{dV}{V} = 3\frac{dr}{r} = 3\%$.

? When is L'Hôpital's rule NOT allowed?
+ When substitution gives a finite value like $\frac12$
- For $\frac00$ forms
- For $\frac\infty\infty$ forms
> It applies only to indeterminate forms.
:::

# Unit: Applications of derivatives

## Lesson: Optimization with derivatives {#optimization}
@summary: Finding maxima and minima with critical points, the first and second derivative tests, and closed-interval checks.

### Why optimization matters
A huge share of applied mathematics comes down to one question: what is the best choice? The cheapest design, the fastest route, the price that earns the most, the model parameters with the smallest error. "Best" means largest or smallest, and derivatives are the tool for finding largest and smallest values. Training a machine learning model is, at heart, an optimization problem, so this lesson is one of the most directly useful in the course.

### An everyday scenario
You have 40 metres of fencing and want to enclose a rectangular garden with the largest possible area. If one side is $x$ metres, the other is $20 - x$ (because the perimeter is $2x + 2(20 - x) = 40$), and the area is $A(x) = x(20 - x) = 20x - x^2$. A long thin rectangle with $x = 1$ has area 19; a square with $x = 10$ has area 100; $x = 15$ gives 75. The best choice seems to be the square. Calculus confirms it: $A'(x) = 20 - 2x$, which is zero exactly at $x = 10$.

### Flat tangents at peaks and valleys
Picture the graph of a smooth function as a hilly landscape. At the top of a hill, the ground is momentarily level: if it were sloping up, you could go higher; if sloping down, you came from higher. So at a smooth peak or valley, the tangent line is horizontal and $f'(x) = 0$. Points where $f'(x) = 0$, or where $f'$ does not exist (such as the corner of $|x|$), are called **critical points**. They are the only candidates for peaks and valleys in the interior of the domain.

:::def Critical point
A point $c$ in the domain of $f$ where $f'(c) = 0$ or $f'(c)$ does not exist.
:::

:::def Local and global extrema
$f$ has a **local maximum** at $c$ if $f(c) \ge f(x)$ for all $x$ near $c$, and a **global (absolute) maximum** if $f(c) \ge f(x)$ for all $x$ in the domain. Minima are defined the same way with $\le$. Maxima and minima together are called **extrema**.
:::

Be careful: not every critical point is an extremum. $f(x) = x^3$ has $f'(0) = 0$, but the graph keeps rising through 0; it just flattens for a moment. So once we find critical points, we must classify them.

### The first derivative test
Look at the sign of $f'$ on either side of a critical point $c$. If $f'$ changes from positive to negative, the function rises then falls: a local maximum. If it changes from negative to positive: a local minimum. If the sign does not change, it is neither. For $f(x) = x^3 - 3x$, $f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$. Testing a point in each interval: $f'(-2) = 9 > 0$, $f'(0) = -3 < 0$, $f'(2) = 9 > 0$. So $f$ rises, falls, rises: a local max at $x = -1$ (value 2) and a local min at $x = 1$ (value $-2$).

@fig tangent f="x³ − 3x" x0=1 | At the local minimum x = 1 of x³ − 3x the tangent line is flat; on either side the slope has opposite signs.

### The second derivative test
The second derivative $f''$ measures how the slope is changing. At a critical point with $f''(c) > 0$, the slope is increasing through zero, from negative to positive, so the curve is cupped upward and $c$ is a local minimum. If $f''(c) < 0$, it is a local maximum. If $f''(c) = 0$, the test is inconclusive: $x^4$, $-x^4$ and $x^3$ all have $f'(0) = f''(0) = 0$, yet they have a min, a max and neither. For $x^3 - 3x$, $f''(x) = 6x$, so $f''(1) = 6 > 0$ (min) and $f''(-1) = -6 < 0$ (max), agreeing with the first test.

### Global extrema on a closed interval
Often the variable is restricted to an interval $[a, b]$: lengths cannot be negative, a budget has a ceiling. The **extreme value theorem** guarantees that a continuous function on a closed interval has a global max and min, and they occur either at critical points or at the endpoints. That gives the **closed interval method**: find the critical points inside $(a, b)$, evaluate $f$ at them and at $a$ and $b$, and pick the largest and smallest values. No classification is needed; just compare numbers.

### Solving word problems
Most real optimization problems follow the same five steps. First, draw a picture and name the variables. Second, write the quantity to optimize (the objective). Third, use the constraint to reduce it to a function of one variable. Fourth, find the critical points and the domain's endpoints. Fifth, compare values and answer in context, with units. The fencing problem above is a complete example: objective $A = xy$, constraint $x + y = 20$, so $A(x) = 20x - x^2$ on $[0, 20]$. The endpoints give area 0 and the critical point $x = 10$ gives 100, so the square wins.

### Common mistakes
Forgetting the endpoints is the most common error; the best value can sit at the boundary. Assuming every critical point is a max or min is the second; check with a test. Third, solving $f'(x) = 0$ but reporting $x$ when the question asked for the maximum *value* $f(x)$, or vice versa. Finally, points where $f'$ is undefined are critical points too, and they are easy to overlook.

### Summary
Extrema of smooth functions occur where the tangent is flat, so solve $f'(x) = 0$ and also note where $f'$ is undefined. Classify with the sign change of $f'$ or the sign of $f''$. On a closed interval, compare the values at critical points and endpoints. Gradient descent, the workhorse of machine learning, is this same idea for functions too complicated to solve by hand: it follows the slope downhill to a point where the derivative is zero.

@viz tangent f="x³ − 3x" x0=0.6 | Drag the point and press Show f′(x): the extrema of f sit exactly where f′ crosses zero.

:::explore
**What to try**
1. Press "Show f′(x)". Drag the point to $x = -1$ and then to $x = 1$ and read the slope.
2. Move the point slowly from $x = -2$ to $x = 2$ and watch the sign of the slope readout.
3. Switch to $x^2$ and find the one point with a flat tangent.

**What to notice:** the slope is 0 at $x = \pm1$, exactly where the green derivative curve crosses the axis. To the left of $-1$ the slope is positive, between the critical points it is negative, and after 1 it is positive again: rise, fall, rise. That sign pattern is the first derivative test from the article.
:::

@viz func kind=cubic | A cubic y = ax³ + bx² + cx + d. Change c to create or remove the hill and valley.

:::explore
**What to try**
1. Start with the default cubic. Locate the local max and local min by eye.
2. Increase the slider $c$ slowly toward and past 0.
3. Make $a$ negative.

**What to notice:** the derivative $3ax^2 + 2bx + c$ is a quadratic, so a cubic has 0, 1 or 2 critical points. As $c$ increases with $b = 0$, the hill and valley merge and vanish once $c > 0$ (for $a > 0$): the quadratic $f'$ then has no roots, and the cubic is monotonic with no extrema at all.
:::

:::formulas
$$\text{critical points: } f'(c) = 0 \text{ or } f'(c) \text{ undefined}$$
$$f' : + \to - \Rightarrow \text{local max} \qquad f' : - \to + \Rightarrow \text{local min}$$
$$f'(c) = 0,\ f''(c) > 0 \Rightarrow \text{local min} \qquad f'(c) = 0,\ f''(c) < 0 \Rightarrow \text{local max}$$
$$\max_{[a,b]} f = \max\{f(a),\ f(b),\ f(c_1), \ldots, f(c_k)\}$$
:::

:::thm Fermat's theorem
If $f$ has a local maximum or minimum at an interior point $c$ and $f'(c)$ exists, then $f'(c) = 0$.
:::

:::proof
Suppose $c$ is a local max. For small $h > 0$, $f(c + h) \le f(c)$, so $\frac{f(c + h) - f(c)}{h} \le 0$; letting $h \to 0^+$ gives $f'(c) \le 0$. For small $h < 0$ the numerator is still $\le 0$ but the denominator is negative, so the quotient is $\ge 0$, giving $f'(c) \ge 0$. Hence $f'(c) = 0$. The minimum case is identical with inequalities reversed.
:::

:::thm Extreme value theorem
A continuous function on a closed interval $[a, b]$ attains a global maximum and a global minimum, each at a critical point or at an endpoint.
:::

:::steps Find the global extrema of $f(x) = x^3 - 3x$ on $[-2, 3]$
1. $f'(x) = 3x^2 - 3 = 0$ gives $x = \pm1$, both inside the interval.
2. Evaluate: $f(-2) = -2$, $f(-1) = 2$, $f(1) = -2$, $f(3) = 18$.
3. Global max 18 at $x = 3$ (an endpoint); global min $-2$ at both $x = -2$ and $x = 1$.
:::

:::steps An open-top box from a 12 × 12 sheet
1. Cut squares of side $x$ from each corner and fold: volume $V = x(12 - 2x)^2$ for $0 \le x \le 6$.
2. $V' = (12 - 2x)^2 - 4x(12 - 2x) = (12 - 2x)(12 - 6x)$, so $x = 6$ or $x = 2$.
3. $V(0) = V(6) = 0$ and $V(2) = 2\cdot64 = 128$. The best cut is $x = 2$, giving volume 128.
:::

:::steps Minimize the squared error $E(c) = (c - 1)^2 + (c - 4)^2 + (c - 7)^2$
1. $E'(c) = 2(c - 1) + 2(c - 4) + 2(c - 7) = 6c - 24$.
2. $E'(c) = 0$ at $c = 4$; $E'' = 6 > 0$, so it is a minimum.
3. The best single number is $4$, the mean of the data. Least squares always picks the mean.
:::

:::mock Exam question
A can (closed cylinder) must hold $V = 250\pi$ cm³. Find the radius that minimizes the metal used (surface area), and the corresponding height.
:::solution
Volume: $\pi r^2h = 250\pi$, so $h = \frac{250}{r^2}$. Surface area $S = 2\pi r^2 + 2\pi rh = 2\pi r^2 + \frac{500\pi}{r}$ for $r > 0$. $S' = 4\pi r - \frac{500\pi}{r^2} = 0$ gives $r^3 = 125$, so $r = 5$. $S'' = 4\pi + \frac{1000\pi}{r^3} > 0$, so it is a minimum. Height $h = \frac{250}{25} = 10$ cm, equal to the diameter.
:::
:::

:::ml Training is optimization
Fitting a model means choosing parameters $\theta$ that minimize a loss $L(\theta)$. For one parameter and squared error, setting $L'(\theta) = 0$ gives the answer directly, as in the "best constant is the mean" example. With millions of parameters there is no closed form, so gradient descent repeatedly steps $\theta \leftarrow \theta - \eta L'(\theta)$ toward a critical point. Second-derivative information tells you whether you reached a minimum, a maximum or a saddle, and it is the basis of Newton-type optimizers.
:::

:::cs Ternary search and convex tuning
When a function has a single peak on an interval (unimodal), ternary search finds the maximum without derivatives by repeatedly discarding a third of the interval. In systems work, engineers tune parameters such as cache size or batch size by measuring throughput, which often rises and then falls; finding the critical point of a fitted curve gives the sweet spot.
:::

:::real Pricing for maximum revenue
A café sells $q = 300 - 20p$ coffees a day at price $p$ dollars. Revenue $R = pq = 300p - 20p^2$ has $R' = 300 - 40p = 0$ at $p = 7.5$, with $R'' = -40 < 0$, a maximum. At \$7.50 they sell 150 coffees for \$1125; at \$6 or \$9, revenue drops to \$1080.
:::

:::quiz
? Where does $f(x) = x^2 - 6x + 2$ have its minimum?
= 3
> $f'(x) = 2x - 6 = 0$ at $x = 3$, and $f'' = 2 > 0$.

? If $f'(c) = 0$ and $f''(c) = -4$, then $c$ is a...
+ local maximum
- local minimum
- inflection point
> Negative second derivative means concave down.

? What is the maximum value of $f(x) = 4x - x^2$?
= 4
> Critical point $x = 2$; $f(2) = 8 - 4 = 4$.

? $f(x) = x^3$ at $x = 0$ is...
+ a critical point but not an extremum
- a local minimum
- not a critical point
> $f'(0) = 0$, but $f'$ is positive on both sides.

? On $[0, 5]$, the global minimum of $f(x) = (x - 1)^2$ is at $x$ =
= 1
> The critical point $x = 1$ gives 0; endpoints give 1 and 16.

? Two positive numbers add to 10. What is the largest possible product?
= 25
> $P = x(10 - x)$ is maximized at $x = 5$.
:::

## Lesson: Concavity, the mean value theorem and curve sketching {#concavity}
@summary: The second derivative and the shape of a graph, inflection points, the mean value theorem, and a full curve-sketching routine.

### Beyond up and down
The first derivative tells you whether a function is increasing or decreasing. But two increasing functions can look very different. The value of a savings account with compound interest rises faster and faster; the height of a ball thrown upward rises slower and slower until it stops. The difference is **concavity**, the way the graph bends, and it is measured by the second derivative. Understanding concavity lets you sketch graphs accurately, interpret data (is growth accelerating or slowing?), and recognize the convex functions that make optimization easy.

### An everyday scenario
News reports often say things like "unemployment is still rising, but more slowly". That sentence describes a first derivative (positive: rising) and a second derivative (negative: the rate of rise is falling). Graphically, the curve is still going up but bending downward, and economists watch for the **inflection point** where the bend changes, because it often signals a turning point ahead.

### The second derivative
The second derivative $f''$ is the derivative of $f'$: the rate at which the slope changes. If $f''(x) > 0$ on an interval, slopes are increasing, so the graph bends upward like a cup that holds water; we say $f$ is **concave up**. If $f''(x) < 0$, slopes are decreasing and the graph bends downward like a cap: **concave down**. For $f(x) = x^2$, $f'' = 2 > 0$ everywhere: concave up. For $f(x) = \sqrt x$, $f'' = -\frac14x^{-3/2} < 0$: concave down, rising but flattening.

:::def Concave up and concave down
$f$ is concave up on an interval if $f'$ is increasing there (for twice-differentiable $f$, $f'' > 0$); the graph lies above its tangent lines. It is concave down if $f'$ is decreasing ($f'' < 0$); the graph lies below its tangent lines.
:::

A useful geometric fact: a concave-up graph lies *above* each of its tangent lines, and below each chord joining two of its points. That is exactly the definition of a **convex** function, which you will meet in optimization: for a convex function, any point where $f' = 0$ is a global minimum.

### Inflection points
An **inflection point** is where the concavity changes. For $f(x) = x^3$, $f''(x) = 6x$ is negative for $x < 0$ and positive for $x > 0$, so $(0, 0)$ is an inflection point. To find them, solve $f''(x) = 0$ (or find where $f''$ is undefined) and check that the sign of $f''$ actually changes. $f(x) = x^4$ has $f''(0) = 0$ but $f'' = 12x^2 \ge 0$ on both sides, so it is not an inflection point. At an inflection point, the tangent line crosses the curve, and the slope $f'$ reaches a local max or min. In the unemployment example, that is the moment unemployment was rising fastest.

:::def Inflection point
A point on the graph where the concavity changes from up to down or vice versa.
:::

@fig func kind=cubic | A cubic bends one way, then the other. The inflection point is where the bend switches, halfway between the hill and the valley.

### The mean value theorem
Here is a fact you know from driving. If you travel 120 km in 1.5 hours, your average speed is 80 km/h, and at some instant your speedometer must have read exactly 80. You could not have been always slower or always faster. The **mean value theorem** (MVT) says the same for any smooth function: if $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, there is some $c$ between $a$ and $b$ where
$$f'(c) = \frac{f(b) - f(a)}{b - a}.$$
Geometrically, somewhere the tangent line is parallel to the chord joining the endpoints. For $f(x) = x^2$ on $[0, 2]$, the chord slope is $\frac{4 - 0}{2} = 2$, and $f'(c) = 2c = 2$ at $c = 1$.

The MVT is the reason the derivative tests work. If $f' > 0$ on an interval, then for any $x_1 < x_2$ there, $f(x_2) - f(x_1) = f'(c)(x_2 - x_1) > 0$, so $f$ is increasing. It also proves that a function with $f' = 0$ everywhere on an interval is constant, which is why antiderivatives are unique up to a constant $+C$.

### A curve-sketching routine
To sketch $f$ by hand, collect information in a fixed order. Find the domain and intercepts. Find asymptotes and the behaviour as $x\to\pm\infty$. Compute $f'$ to find where $f$ increases, decreases and has local extrema. Compute $f''$ to find concavity and inflection points. Finally plot the special points and join them with the correct shapes. For $f(x) = xe^{-x}$: the intercept is $(0, 0)$; $f \to 0$ as $x \to \infty$; $f' = e^{-x}(1 - x)$ gives a max at $(1, \frac1e)$; $f'' = e^{-x}(x - 2)$ gives an inflection point at $(2, \frac{2}{e^2})$.

### Common mistakes
Do not confuse "concave down" with "decreasing": $\sqrt x$ is increasing and concave down. Do not declare an inflection point just because $f'' = 0$; check the sign change. And remember the MVT only promises that some $c$ exists; it does not tell you where, and it fails if $f$ has a corner or a jump, such as $|x|$ on $[-1, 1]$, whose chord slope 0 is never a tangent slope.

### Summary
$f''$ measures bending: positive means concave up (slopes increasing), negative means concave down. Inflection points are where concavity flips. The mean value theorem guarantees an instant where the instantaneous rate equals the average rate, and it underpins the derivative tests. Combine $f$, $f'$ and $f''$ to sketch any reasonable graph.

@viz convex | Drag the chord endpoints. For a convex (concave-up) function, the chord always stays above the curve.

:::explore
**What to try**
1. With $x^2$, drag the two chord endpoints to many positions.
2. Switch to $\sin x$ and stretch the chord over a hump, then over a valley.
3. Try $x^4 - 3x^2$ and find where it is concave down.

**What to notice:** for concave-up functions the chord never dips below the graph, matching "lies below each chord". For $\sin x$ the chord lies below the curve over a hump (concave down) and above it over a valley (concave up). The function $x^4 - 3x^2$ is concave down near 0, where $f'' = 12x^2 - 6 < 0$, that is for $|x| < 0.707$.
:::

@viz tangent f="x³ − 3x" x0=0 | Show f′(x) and slide the point: at the inflection point x = 0 the slope reaches its lowest value.

:::explore
**What to try**
1. Press "Show f′(x)" and move the point across $x = 0$.
2. Watch which side of the curve the tangent line lies on for $x < 0$ and $x > 0$.

**What to notice:** for $x < 0$ the tangent sits above the curve (concave down) and for $x > 0$ below it (concave up); at $x = 0$ it crosses. The slope there is $-3$, the minimum of $f'(x) = 3x^2 - 3$. Inflection points are extrema of the derivative.
:::

:::formulas
$$f'' > 0 \Rightarrow \text{concave up} \qquad f'' < 0 \Rightarrow \text{concave down}$$
$$\text{inflection: } f'' \text{ changes sign}$$
$$\text{MVT: } f'(c) = \frac{f(b) - f(a)}{b - a} \text{ for some } c \in (a, b)$$
$$\text{Rolle: } f(a) = f(b) \Rightarrow f'(c) = 0 \text{ for some } c \in (a, b)$$
:::

:::thm Mean value theorem
If $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, there exists $c \in (a, b)$ with $f'(c) = \dfrac{f(b) - f(a)}{b - a}$.
:::

:::proof
First, Rolle's theorem: if also $f(a) = f(b)$, then by the extreme value theorem $f$ has a max and a min on $[a, b]$. If both are at endpoints, $f$ is constant and $f' = 0$ everywhere. Otherwise one is at an interior point $c$, and Fermat's theorem gives $f'(c) = 0$. For the general case, subtract the chord: $g(x) = f(x) - \frac{f(b) - f(a)}{b - a}(x - a)$. Then $g(a) = g(b) = f(a)$, so Rolle gives $c$ with $g'(c) = 0$, which says $f'(c) = \frac{f(b) - f(a)}{b - a}$.
:::

:::steps Concavity and inflection of $f(x) = x^3 - 6x^2 + 9x$
1. $f'(x) = 3x^2 - 12x + 9 = 3(x - 1)(x - 3)$: local max at $x = 1$ ($f = 4$), local min at $x = 3$ ($f = 0$).
2. $f''(x) = 6x - 12$: negative for $x < 2$, positive for $x > 2$.
3. Inflection point at $x = 2$, where $f(2) = 8 - 24 + 18 = 2$: the point $(2, 2)$.
:::

:::steps Find the MVT point for $f(x) = x^3$ on $[0, 3]$
1. Chord slope: $\frac{27 - 0}{3 - 0} = 9$.
2. Solve $f'(c) = 3c^2 = 9$: $c^2 = 3$.
3. $c = \sqrt3 \approx 1.732$, which is inside $(0, 3)$.
:::

:::steps Sketch $f(x) = xe^{-x}$
1. Intercept $(0, 0)$; as $x\to\infty$, $f\to0^+$; as $x\to-\infty$, $f\to-\infty$.
2. $f' = e^{-x}(1 - x)$: increasing for $x < 1$, decreasing after; max $(1, \frac1e \approx 0.368)$.
3. $f'' = e^{-x}(x - 2)$: concave down for $x < 2$, up after; inflection at $(2, \frac{2}{e^2} \approx 0.271)$.
:::

:::mock Exam question
A car's position is $s(t) = t^3 - 6t^2 + 15t$ metres for $0 \le t \le 4$ seconds. (a) Show the car never moves backwards. (b) When is its velocity smallest? (c) Use the MVT to say what speed it must hit at some moment.
:::solution
(a) $v = s' = 3t^2 - 12t + 15 = 3(t - 2)^2 + 3 \ge 3 > 0$, so the car always moves forward. (b) $v' = s'' = 6t - 12 = 0$ at $t = 2$, an inflection point of $s$; velocity is smallest there, $v(2) = 3$ m/s. (c) Average velocity is $\frac{s(4) - s(0)}{4} = \frac{64 - 96 + 60}{4} = 7$ m/s, so by the MVT the velocity equals exactly 7 m/s at some time in $(0, 4)$. (Solving, $3(t - 2)^2 + 3 = 7$ gives $t = 2 + \frac{2}{\sqrt3} \approx 3.15$.)
:::
:::

:::ml Convexity and loss landscapes
A loss function that is convex (concave up everywhere, $f'' \ge 0$) has no bad local minima: any flat point is the global minimum, so gradient descent cannot get stuck. Linear and logistic regression have convex losses; deep networks do not. The second derivative also sets safe learning rates: for a quadratic with curvature $f'' = k$, gradient descent converges only if the step size satisfies $\eta < \frac2k$.
:::

:::cs Growth curves in benchmarks
When you plot a program's running time against input size, concavity reveals the complexity class: $n\log n$ and $n^2$ are concave up (the cost per extra item grows), while caches can create concave-down regions. Throughput curves that are concave down show diminishing returns, and the inflection point of an S-shaped adoption curve marks peak growth.
:::

:::real Epidemic curves
Cumulative cases in an outbreak often follow an S-shaped curve. Before the inflection point, cases accelerate ($f'' > 0$); after it, new cases per day decline ($f'' < 0$) even though the total still rises. Public health officials watch for that inflection because it marks the peak of daily new cases.
:::

:::quiz
? $f(x) = x^3$ has an inflection point at $x$ =
= 0
> $f'' = 6x$ changes sign at 0.

? If $f''(x) < 0$ on an interval, the graph is...
+ concave down
- decreasing
- concave up
> Negative second derivative means slopes are decreasing.

? For $f(x) = x^2$ on $[1, 3]$, the mean value theorem point is $c$ =
= 2
> Chord slope $\frac{9 - 1}{2} = 4 = 2c$.

? Where is the inflection point of $f(x) = x^3 - 3x^2$?
= 1
> $f'' = 6x - 6 = 0$ at $x = 1$, with a sign change.

? Does $f(x) = x^4$ have an inflection point at 0?
+ No, $f''$ does not change sign
- Yes, because $f''(0) = 0$
- Yes, because $f'(0) = 0$
> $f'' = 12x^2 \ge 0$ on both sides.

? You drive 150 km in 2 hours. What speed (km/h) must your speedometer have shown at some instant?
= 75
> Mean value theorem: the average rate is attained.
:::

# Unit: Integrals

## Lesson: Area, Riemann sums and the definite integral {#riemann}
@summary: Approximating area with rectangles, sigma notation, and the definite integral as a limit of sums.

### The second big question of calculus
Derivatives answer "how fast is it changing?". The second great question runs the other way: if I know the rate at every moment, how much has accumulated in total? If a car's speedometer reading is known at every instant, how far did it travel? If water flows into a tank at a changing rate, how much water is in it? Both questions turn out to be the same as asking for the **area under a curve**, and the tool that computes it is the **integral**.

### An everyday scenario
Suppose you drive at a constant 60 km/h for 2 hours. Distance is speed times time: 120 km. On a graph of speed against time, that is the area of a rectangle 2 wide and 60 tall. Now suppose your speed changes. Over a short enough time, your speed is nearly constant, so the distance in that short interval is nearly (speed) × (short time), the area of a thin rectangle. Adding up many thin rectangles gives the total distance. That is the whole idea of integration: chop, approximate each piece by a rectangle, add, and then make the pieces infinitely thin.

### Approximating area with rectangles
Let us find the area under $f(x) = x^2$ from $x = 0$ to $x = 2$. Split $[0, 2]$ into $n = 4$ strips, each of width $\Delta x = \frac{2 - 0}{4} = 0.5$. In each strip, build a rectangle whose height is the function's value at one sample point.

Using the **right endpoints** $0.5, 1, 1.5, 2$, the heights are $0.25, 1, 2.25, 4$, so the area estimate is $0.5(0.25 + 1 + 2.25 + 4) = 3.75$. Because $x^2$ is increasing, right-endpoint rectangles poke above the curve, so this is an overestimate. Using **left endpoints** $0, 0.5, 1, 1.5$ gives $0.5(0 + 0.25 + 1 + 2.25) = 1.75$, an underestimate. The **midpoint rule** uses $0.25, 0.75, 1.25, 1.75$, giving $0.5(0.0625 + 0.5625 + 1.5625 + 3.0625) = 2.625$. The true area, which we will soon compute exactly, is $\frac83 \approx 2.667$. The midpoint estimate is already close.

@fig riemann | Rectangles under the curve. Their total area approximates the area under the curve, and the approximation improves as the rectangles get thinner.

### Riemann sums and sigma notation
Writing out every term is tedious, so we use sigma notation. Split $[a, b]$ into $n$ equal pieces of width $\Delta x = \frac{b - a}{n}$, and choose a sample point $x_i^*$ in the $i$-th piece. The **Riemann sum** is
$$S_n = \sum_{i=1}^{n} f(x_i^*)\,\Delta x.$$
Each term is height times width: one rectangle. With right endpoints, $x_i^* = a + i\Delta x$.

:::def Riemann sum
$\sum_{i=1}^n f(x_i^*)\Delta x$, the total area of $n$ rectangles of width $\Delta x = \frac{b-a}{n}$ with heights given by $f$ at sample points $x_i^*$.
:::

### The definite integral
As $n$ grows, the rectangles get thinner and the left, right and midpoint sums all squeeze toward the same number. That limit is the **definite integral**:
$$\int_a^b f(x)\,dx = \lim_{n\to\infty}\sum_{i=1}^n f(x_i^*)\,\Delta x.$$
The notation was designed to look like the sum: the elongated S, $\int$, stands for "sum", $f(x)$ is the height, and $dx$ is the infinitely thin width. The numbers $a$ and $b$ are the **limits of integration**. Every continuous function on $[a, b]$ is integrable, meaning this limit exists.

:::def Definite integral
$\int_a^b f(x)\,dx = \lim_{n\to\infty}\sum_{i=1}^n f(x_i^*)\Delta x$, the signed area between the graph of $f$ and the $x$-axis from $a$ to $b$.
:::

We can compute $\int_0^2 x^2\,dx$ exactly from the definition. With right endpoints, $x_i = \frac{2i}{n}$, so the sum is $\sum\left(\frac{2i}{n}\right)^2\frac2n = \frac{8}{n^3}\sum_{i=1}^n i^2 = \frac{8}{n^3}\cdot\frac{n(n+1)(2n+1)}{6}$. As $n \to \infty$, $\frac{n(n+1)(2n+1)}{n^3} \to 2$, so the limit is $\frac{8\cdot2}{6} = \frac83$. It works, but it is laborious; the next lesson gives a far faster method.

### Signed area
When $f$ is negative, $f(x_i^*)\Delta x$ is negative, so area below the axis counts as negative. For example $\int_0^{2\pi}\sin x\,dx = 0$: the hump above the axis exactly cancels the hump below. If you want total (unsigned) area, integrate $|f(x)|$ instead, which here gives 4.

### Properties of the integral
Integrals inherit the properties of sums. They are linear: $\int(f + g) = \int f + \int g$ and $\int cf = c\int f$. Intervals add: $\int_a^b f + \int_b^c f = \int_a^c f$. Reversing the limits flips the sign, $\int_b^a f = -\int_a^b f$, and $\int_a^a f = 0$. If $f \le g$ on $[a, b]$ then $\int_a^b f \le \int_a^b g$. These rules let you break complicated integrals into simple pieces.

### Common mistakes
Forgetting $\Delta x$ in a Riemann sum (adding heights instead of areas) is the classic slip. Another is assuming left sums always underestimate; that is true only for increasing functions. For decreasing functions the roles swap. Finally, remember that the integral is signed: a result of 0 does not mean there is no area.

### Summary
Area under a curve is approximated by summing rectangles, a Riemann sum $\sum f(x_i^*)\Delta x$. The definite integral is the limit as the rectangles become infinitely thin. It measures signed area and represents any accumulated total of a rate: distance from speed, water from flow rate, probability from density. The next lesson shows how antiderivatives compute integrals without any limits.

@viz riemann | Choose a rule and increase n. The sum converges to the exact integral shown in the readout.

:::explore
**What to try**
1. With $f = x^2$, upper limit $b = 2$ and the Left rule, set $n = 4$. Compare the sum with the exact value $\frac83 \approx 2.667$.
2. Switch to Right, then Midpoint, keeping $n = 4$.
3. Increase $n$ to 20 and then 100 for each rule.
4. Try the Trapezoid rule and compare its error with Midpoint.

**What to notice:** at $n = 4$ the left sum is $1.75$ and the right sum $3.75$, bracketing the truth, and the midpoint sum $2.625$ is far better, exactly as computed in the article. As $n$ increases every rule converges to $2.667$; the left and right errors shrink like $\frac1n$, while midpoint and trapezoid errors shrink like $\frac{1}{n^2}$.
:::

:::formulas
$$\Delta x = \frac{b - a}{n} \qquad x_i = a + i\,\Delta x$$
$$\int_a^b f(x)\,dx = \lim_{n\to\infty}\sum_{i=1}^n f(x_i^*)\,\Delta x$$
$$\sum_{i=1}^n i = \frac{n(n+1)}{2} \qquad \sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}$$
$$\int_a^b (cf + g) = c\int_a^b f + \int_a^b g \qquad \int_a^b f + \int_b^c f = \int_a^c f \qquad \int_b^a f = -\int_a^b f$$
:::

:::thm Integrability of continuous functions
If $f$ is continuous on $[a, b]$, then the Riemann sums converge to the same limit for every choice of sample points as $n\to\infty$, so $\int_a^b f(x)\,dx$ exists.
:::

:::thm Comparison property
If $m \le f(x) \le M$ on $[a, b]$, then $m(b - a) \le \int_a^b f(x)\,dx \le M(b - a)$.
:::

:::proof
Every Riemann sum satisfies $\sum m\Delta x \le \sum f(x_i^*)\Delta x \le \sum M\Delta x$, and $\sum_{i=1}^n \Delta x = b - a$. Taking the limit preserves non-strict inequalities.
:::

:::steps Left and right sums for $f(x) = \frac1x$ on $[1, 3]$ with $n = 4$
1. $\Delta x = 0.5$; points $1, 1.5, 2, 2.5, 3$, values $1, 0.667, 0.5, 0.4, 0.333$.
2. Left sum: $0.5(1 + 0.667 + 0.5 + 0.4) = 1.283$. Right sum: $0.5(0.667 + 0.5 + 0.4 + 0.333) = 0.950$.
3. $\frac1x$ is decreasing, so left overestimates and right underestimates; the true value $\ln 3 \approx 1.099$ lies between.
:::

:::steps Evaluate $\int_0^3 (2x + 1)\,dx$ using geometry
1. The region under the line from 0 to 3 is a trapezoid with parallel sides $f(0) = 1$ and $f(3) = 7$.
2. Area $= \frac{1 + 7}{2}\cdot 3 = 12$.
3. So $\int_0^3(2x + 1)\,dx = 12$.
:::

:::steps Use properties: given $\int_0^2 f = 5$ and $\int_0^5 f = 9$, find $\int_2^5 3f(x)\,dx$
1. $\int_2^5 f = \int_0^5 f - \int_0^2 f = 9 - 5 = 4$.
2. Constant multiple: $\int_2^5 3f = 3\cdot4$.
3. Answer: $12$.
:::

:::mock Exam question
A runner's speed (m/s) is recorded every 10 seconds: $t = 0, 10, 20, 30, 40$ gives $v = 2, 4, 5, 5, 4$. (a) Estimate the distance run in 40 s with the trapezoid rule. (b) With the left and right sums. (c) Which estimate would you trust most and why?
:::solution
$\Delta t = 10$. (a) Trapezoid: $10\left(\frac{2}{2} + 4 + 5 + 5 + \frac42\right) = 10(17) = 170$ m. (b) Left: $10(2 + 4 + 5 + 5) = 160$ m; right: $10(4 + 5 + 5 + 4) = 180$ m. (c) The trapezoid estimate, the average of left and right, because it uses both endpoints of every interval and its error shrinks like $\Delta t^2$ instead of $\Delta t$.
:::
:::

:::ml Expectations are integrals
For a continuous random variable with density $p(x)$, probabilities and expectations are integrals: $P(a \le X \le b) = \int_a^b p(x)\,dx$ and $\mathbb E[g(X)] = \int g(x)p(x)\,dx$. In practice ML approximates them by sums, either on a grid (like a Riemann sum) or by averaging over random samples (Monte Carlo), which is what a minibatch loss does.
:::

:::cs Numerical integration
Scientific libraries compute integrals numerically with refined Riemann-type rules: the trapezoid rule, Simpson's rule (fitting parabolas), and adaptive quadrature that uses more points where the function wiggles. The ROC-AUC metric in classification is computed exactly with the trapezoid rule over the points of the ROC curve.
:::

:::real Water usage from a flow meter
A smart meter records the flow rate into a house every minute. The total litres used in a day is the integral of the flow rate, computed by adding (rate × 1 minute) for all 1440 readings. Electricity meters do the same with power to get energy in kilowatt-hours.
:::

:::quiz
? The right-endpoint sum for $x^2$ on $[0, 2]$ with $n = 2$ is...
= 5
> $\Delta x = 1$; heights $1$ and $4$, so $1 + 4 = 5$.

? $\int_0^4 3\,dx$ =
= 12
> A rectangle of height 3 and width 4.

? $\int_0^{2\pi}\sin x\,dx$ =
= 0
> The positive and negative humps cancel.

? For an increasing function, the left Riemann sum is...
+ an underestimate
- an overestimate
- always exact
> Each left-height is the lowest value on its strip.

? If $\int_1^4 f = 6$, then $\int_4^1 f$ =
= -6
> Reversing the limits flips the sign.

? $\int_{-1}^{1} x^3\,dx$ =
= 0
> $x^3$ is odd, so the areas on either side cancel.
:::

## Lesson: The fundamental theorem of calculus {#ftc}
@summary: Integration and differentiation are inverse processes: accumulation functions, antiderivatives, and evaluating integrals with F(b) − F(a).

### Two ideas that turn out to be one
For centuries, finding tangent slopes and finding areas looked like unrelated problems. Areas were computed by ingenious, problem-specific tricks, while slopes came from a different set of tricks. Newton and Leibniz realized that the two problems are inverses of each other. That discovery, the **fundamental theorem of calculus** (FTC), turned the laborious limit of Riemann sums into a two-line calculation, and it is the main reason calculus became such a practical tool.

### An everyday scenario
Think about a car's odometer and speedometer. The speedometer shows the rate at which distance changes: it is the derivative of the odometer reading. The odometer shows the total distance accumulated from the speeds: it is the integral of the speedometer. So the distance travelled between times $a$ and $b$ can be found two ways: by adding up speed × tiny time intervals (an integral), or simply by subtracting odometer readings, $D(b) - D(a)$. The FTC says these always agree.

### The accumulation function
Fix a starting point $a$ and define a new function by measuring area from $a$ up to a variable endpoint $x$:
$$A(x) = \int_a^x f(t)\,dt.$$
(We use $t$ inside so it does not clash with the endpoint $x$.) $A(x)$ is the "odometer" for $f$: it records how much has accumulated so far. For $f(t) = 2$ and $a = 0$, the area is a rectangle, so $A(x) = 2x$. For $f(t) = t$, the area is a triangle, $A(x) = \frac{x^2}{2}$.

Look at those examples. The derivative of $2x$ is $2 = f(x)$, and the derivative of $\frac{x^2}{2}$ is $x = f(x)$. Differentiating the accumulated area gives back the original function. That is not a coincidence.

:::def Accumulation function
$A(x) = \int_a^x f(t)\,dt$, the signed area under $f$ from a fixed $a$ to a variable endpoint $x$.
:::

### Part 1: the derivative of accumulated area
Why should $A'(x) = f(x)$? Increase $x$ by a tiny amount $h$. The extra area $A(x + h) - A(x)$ is a thin sliver of width $h$ and height about $f(x)$, so it is approximately $f(x)\,h$. Dividing by $h$: $\frac{A(x+h) - A(x)}{h} \approx f(x)$, and the approximation becomes exact as $h \to 0$. In words: **the rate at which area accumulates equals the height of the curve at the moving edge.** When the curve is tall, area piles up fast; where the curve is at zero, area is momentarily not changing.
$$\frac{d}{dx}\int_a^x f(t)\,dt = f(x).$$

@fig ftc | The area A(x) grows at a rate equal to the height f(x) of the moving edge.

### Antiderivatives
A function $F$ with $F' = f$ is called an **antiderivative** of $f$. Part 1 says that every continuous function has one, namely its accumulation function. Antiderivatives are not unique: $x^2$, $x^2 + 5$ and $x^2 - 3$ all have derivative $2x$. By the mean value theorem, any two antiderivatives differ by a constant, so the general antiderivative is written $F(x) + C$ and called the **indefinite integral**, $\int f(x)\,dx = F(x) + C$.

:::def Antiderivative
A function $F$ with $F'(x) = f(x)$. The family of all antiderivatives is the indefinite integral $\int f(x)\,dx = F(x) + C$.
:::

### Part 2: evaluating definite integrals
Now the payoff. Let $F$ be any antiderivative of $f$. The accumulation function $A$ is also an antiderivative, so $A(x) = F(x) + C$ for some constant. At $x = a$, $A(a) = 0$, so $C = -F(a)$. Then at $x = b$:
$$\int_a^b f(x)\,dx = F(b) - F(a).$$
We write this as $\big[F(x)\big]_a^b$. To compute the area under $x^2$ from 0 to 2, use the antiderivative $F(x) = \frac{x^3}{3}$: $\frac{8}{3} - 0 = \frac83$. That matches the painful Riemann-sum limit from the last lesson, in one line. Any constant $C$ cancels in the subtraction, so we can ignore it for definite integrals.

### Basic antiderivatives
Reading the derivative table backwards gives the first integrals: $\int x^n\,dx = \frac{x^{n+1}}{n+1} + C$ for $n \ne -1$, $\int\frac1x\,dx = \ln|x| + C$, $\int e^x\,dx = e^x + C$, $\int\cos x\,dx = \sin x + C$, $\int\sin x\,dx = -\cos x + C$. Always check an antiderivative by differentiating it.

### Net change
Part 2 has a powerful interpretation: the integral of a rate of change is the total change. If $v(t)$ is velocity, $\int_a^b v(t)\,dt = s(b) - s(a)$ is the displacement. If $r(t)$ is the rate water flows into a tank, $\int_a^b r(t)\,dt$ is how much the volume changed. This **net change theorem** is how integrals show up in physics, economics and data science.

### Common mistakes
Writing $F(a) - F(b)$ instead of $F(b) - F(a)$ flips the sign. Forgetting $+C$ on indefinite integrals loses information (it matters when solving differential equations). Applying the power rule to $n = -1$ gives $\frac{x^0}{0}$, nonsense; use $\ln|x|$. And the FTC needs $f$ continuous on $[a, b]$: $\int_{-1}^1\frac{1}{x^2}\,dx$ cannot be computed as $\left[-\frac1x\right]_{-1}^1 = -2$, because the function blows up at 0 (and the area is actually infinite).

### Summary
The accumulation function $A(x) = \int_a^x f$ has derivative $f(x)$ (Part 1): area grows at the rate of the curve's height. Consequently, for any antiderivative $F$, $\int_a^b f = F(b) - F(a)$ (Part 2). Differentiation and integration undo each other, and the integral of a rate is the net change.

@viz ftc | Slide x: the blue area A(x) is plotted below, and the slope of A at x always equals the height f(x).

:::explore
**What to try**
1. Slide $x$ slowly from 0 to 6 and watch both readouts: area so far and slope of $A$.
2. Stop where the top curve $f(t)$ is highest, and look at how steep the green curve is there.
3. Find where $f$ dips toward its lowest value and check the slope of $A$.

**What to notice:** the orange tangent slope on the lower graph always equals the height of the pink line on the upper graph. That is Part 1 of the FTC. Where $f$ is large, $A$ climbs steeply; where $f$ is small, $A$ is nearly flat; if $f$ were negative, $A$ would decrease. The lower curve is an antiderivative of the upper one.
:::

:::formulas
$$\frac{d}{dx}\int_a^x f(t)\,dt = f(x) \qquad \frac{d}{dx}\int_a^{g(x)} f(t)\,dt = f(g(x))\,g'(x)$$
$$\int_a^b f(x)\,dx = F(b) - F(a) \text{ where } F' = f$$
$$\int x^n\,dx = \frac{x^{n+1}}{n+1} + C\ (n \ne -1) \qquad \int\frac1x\,dx = \ln|x| + C$$
$$\int e^x\,dx = e^x + C \qquad \int\cos x\,dx = \sin x + C \qquad \int\sin x\,dx = -\cos x + C$$
:::

:::thm Fundamental theorem of calculus
Let $f$ be continuous on $[a, b]$. (1) $A(x) = \int_a^x f(t)\,dt$ is differentiable with $A'(x) = f(x)$. (2) If $F' = f$ on $[a, b]$, then $\int_a^b f(x)\,dx = F(b) - F(a)$.
:::

:::proof
(1) $\frac{A(x+h) - A(x)}{h} = \frac1h\int_x^{x+h} f(t)\,dt$. By the comparison property this lies between the minimum and maximum of $f$ on $[x, x+h]$, and by continuity both tend to $f(x)$ as $h \to 0$. (2) $A$ and $F$ are both antiderivatives of $f$, so by the mean value theorem $A - F$ is a constant $C$. Since $A(a) = 0$, $C = -F(a)$, and $\int_a^b f = A(b) = F(b) - F(a)$.
:::

:::steps Evaluate $\int_1^3 (3x^2 - 2x)\,dx$
1. Antiderivative: $F(x) = x^3 - x^2$.
2. $F(3) = 27 - 9 = 18$ and $F(1) = 1 - 1 = 0$.
3. Integral $= 18 - 0 = 18$.
:::

:::steps Evaluate $\int_0^{\pi}\sin x\,dx$
1. Antiderivative: $-\cos x$.
2. $-\cos\pi - (-\cos 0) = 1 + 1$.
3. Answer: $2$. One hump of the sine wave has area exactly 2.
:::

:::steps Differentiate $G(x) = \int_0^{x^2} e^{-t^2}\,dt$
1. By FTC Part 1 with the chain rule, $G'(x) = e^{-(x^2)^2}\cdot\frac{d}{dx}x^2$.
2. $G'(x) = 2x\,e^{-x^4}$.
3. No antiderivative of $e^{-t^2}$ in elementary functions is needed.
:::

:::mock Exam question
A tank holds 100 litres at $t = 0$. Water flows in at $r(t) = 20 - 4t$ litres per minute for $0 \le t \le 8$ (negative values mean water flowing out). (a) How much water is in the tank at $t = 8$? (b) When does the tank hold the most water, and how much?
:::solution
(a) Net change $= \int_0^8 (20 - 4t)\,dt = [20t - 2t^2]_0^8 = 160 - 128 = 32$, so the tank holds $132$ litres. (b) The volume $V(t) = 100 + 20t - 2t^2$ has $V'(t) = r(t) = 0$ at $t = 5$, where the flow switches from in to out. $V(5) = 100 + 100 - 50 = 150$ litres, the maximum.
:::
:::

:::ml Cumulative distribution functions
The CDF of a continuous random variable is an accumulation function: $F(x) = P(X \le x) = \int_{-\infty}^x p(t)\,dt$. By FTC Part 1, the density is its derivative, $p(x) = F'(x)$, and probabilities of intervals are $F(b) - F(a)$ by Part 2. Normalizing flows and survival models use this relationship constantly.
:::

:::cs Prefix sums
The discrete version of the FTC is the prefix-sum array: $P[k] = a_0 + \dots + a_{k-1}$. The sum of any range $a_i + \dots + a_{j-1}$ is $P[j] - P[i]$, computed in constant time, exactly like $F(b) - F(a)$, and the differences $P[k+1] - P[k] = a_k$ recover the data, like $A' = f$. Summed-area tables in image processing use the 2D version.
:::

:::real Distance from a speedometer
A train accelerates with velocity $v(t) = 3t$ m/s for 20 seconds. The distance covered is $\int_0^{20}3t\,dt = \left[\frac32t^2\right]_0^{20} = 600$ m, the area of the triangle under the velocity graph, and also the change in the train's odometer.
:::

:::quiz
? $\int_0^2 x^2\,dx$ =
= 8/3|2.6667
> $\left[\frac{x^3}{3}\right]_0^2 = \frac83$.

? $\frac{d}{dx}\int_0^x \cos(t^2)\,dt$ =
+ $\cos(x^2)$
- $\sin(x^2)$
- $2x\cos(x^2)$
> FTC Part 1.

? $\int_1^e \frac1x\,dx$ =
= 1
> $\ln e - \ln 1 = 1$.

? $\int_0^1 e^x\,dx$ (to 3 decimal places) is...
= 1.718
> $e - 1 \approx 1.718$.

? A velocity $v(t) = 2t + 1$ m/s acts from $t = 0$ to $t = 3$. Displacement in metres?
= 12
> $[t^2 + t]_0^3 = 12$.

? If $F' = f$, then $\int_a^b f(x)\,dx$ equals...
+ $F(b) - F(a)$
- $F(a) - F(b)$
- $f(b) - f(a)$
> FTC Part 2.
:::

## Lesson: Antiderivatives and u-substitution {#substitution}
@summary: The table of basic antiderivatives, the constant of integration, and u-substitution, which undoes the chain rule.

### Integration as reverse differentiation
The fundamental theorem tells us that to compute $\int_a^b f(x)\,dx$ we only need an antiderivative $F$ with $F' = f$. So the practical skill of integration is the skill of running differentiation backwards. Differentiation is mechanical: there is a rule for every situation. Integration is more like a puzzle: you look at the integrand and ask "what function, when differentiated, gives this?". This lesson builds the basic table and the single most important technique, **u-substitution**, which reverses the chain rule.

### An everyday scenario
Suppose you know that the population of a bacterial culture grows at a rate of $r(t) = 6e^{2t}$ thousand cells per hour. How many cells are added in the first hour? You need $\int_0^1 6e^{2t}\,dt$. You can guess that the answer involves $e^{2t}$, because exponentials differentiate to themselves. But $\frac{d}{dt}e^{2t} = 2e^{2t}$, thanks to the chain rule, so to get $6e^{2t}$ you need $3e^{2t}$. Then the answer is $3e^2 - 3 \approx 19.2$ thousand cells. That "guess, check by differentiating, and fix the constant" reasoning is the heart of substitution.

### The basic table
Each derivative rule gives an integral rule when read backwards. The power rule gives
$$\int x^n\,dx = \frac{x^{n+1}}{n+1} + C \quad (n \ne -1),$$
"raise the power by one and divide by the new power". For example $\int x^3\,dx = \frac{x^4}{4} + C$ and $\int\sqrt x\,dx = \int x^{1/2}\,dx = \frac23x^{3/2} + C$. The missing case $n = -1$ is the logarithm: $\int\frac1x\,dx = \ln|x| + C$. The absolute value is there because $\ln(-x)$ also has derivative $\frac1x$ for negative $x$. Exponentials and trig functions give $\int e^x\,dx = e^x + C$, $\int\cos x\,dx = \sin x + C$, $\int\sin x\,dx = -\cos x + C$, $\int\sec^2x\,dx = \tan x + C$, and from the inverse trig derivatives, $\int\frac{1}{1 + x^2}\,dx = \arctan x + C$.

Integrals are linear, so you can integrate polynomials term by term: $\int(6x^2 - 4x + 5)\,dx = 2x^3 - 2x^2 + 5x + C$.

### Why the constant C
Since any constant differentiates to 0, $x^2$, $x^2 + 1$ and $x^2 - 7$ are all antiderivatives of $2x$. Graphically they are the same curve shifted up and down, all with identical slopes. The $+C$ represents that whole family. When extra information is given, such as $F(0) = 4$, you can pin down $C$; this is called an **initial value problem**. If $F'(x) = 2x$ and $F(0) = 4$, then $F(x) = x^2 + C$ and $4 = 0 + C$, so $F(x) = x^2 + 4$.

:::def Indefinite integral
$\int f(x)\,dx = F(x) + C$, the family of all antiderivatives of $f$, where $F' = f$ and $C$ is an arbitrary constant of integration.
:::

### u-substitution: reversing the chain rule
The chain rule says $\frac{d}{dx}F(g(x)) = F'(g(x))\,g'(x)$. Reading backwards:
$$\int f(g(x))\,g'(x)\,dx = F(g(x)) + C.$$
So whenever the integrand contains a function **and the derivative of its inside**, we can simplify by naming the inside $u = g(x)$. Then $du = g'(x)\,dx$, and the integral becomes $\int f(u)\,du$, which is often in the basic table.

Here is the method on $\int 2x\cos(x^2)\,dx$. The inside is $x^2$, and its derivative $2x$ is sitting right there. Let $u = x^2$, so $du = 2x\,dx$. The integral becomes $\int\cos u\,du = \sin u + C = \sin(x^2) + C$. Check by differentiating: $\cos(x^2)\cdot2x$. Correct.

:::def u-substitution
The technique of setting $u = g(x)$, $du = g'(x)\,dx$ to rewrite $\int f(g(x))g'(x)\,dx$ as $\int f(u)\,du$; it is the chain rule in reverse.
:::

### Fixing constants
Often the derivative of the inside is present only up to a constant factor. For $\int x\,e^{x^2}\,dx$, let $u = x^2$, $du = 2x\,dx$, so $x\,dx = \frac12du$. The integral is $\frac12\int e^u\,du = \frac12e^{x^2} + C$. Constant factors can always be fixed this way; a missing *variable* factor cannot. For instance $\int e^{x^2}\,dx$ has no $x$ outside to pair with $du$, and in fact it has no elementary antiderivative at all.

A special case worth memorizing: for a linear inside, $\int f(ax + b)\,dx = \frac1aF(ax + b) + C$. So $\int\cos(3x)\,dx = \frac13\sin(3x) + C$ and $\int e^{-x/2}\,dx = -2e^{-x/2} + C$.

### Substitution in definite integrals
For a definite integral, you can change the limits along with the variable: if $u = g(x)$, then $x = a$ becomes $u = g(a)$ and $x = b$ becomes $u = g(b)$. For $\int_0^2 2x(x^2 + 1)^3\,dx$, let $u = x^2 + 1$: the limits become $u = 1$ and $u = 5$, and the integral is $\int_1^5 u^3\,du = \left[\frac{u^4}{4}\right]_1^5 = \frac{625 - 1}{4} = 156$. No need to substitute back.

### Choosing u
Good choices for $u$ are the inside of a composition (inside a power, an exponential, a trig function or a root), or a denominator whose derivative appears in the numerator. The second pattern gives a famous result: $\int\frac{g'(x)}{g(x)}\,dx = \ln|g(x)| + C$. For instance $\int\frac{2x}{x^2 + 1}\,dx = \ln(x^2 + 1) + C$ and $\int\tan x\,dx = \int\frac{\sin x}{\cos x}\,dx = -\ln|\cos x| + C$.

### Common mistakes
Forgetting to convert $dx$ into $du$ is the most common error; every piece of the integrand, including $dx$, must be rewritten in terms of $u$. Mixing variables (some $x$ left over with $du$) means the substitution did not work, so try another $u$. In definite integrals, either change the limits or substitute back, but not neither. And always remember that $\int x^{-1}\,dx$ is $\ln|x|$, not $\frac{x^0}{0}$.

### Summary
Integration reverses differentiation, so each derivative rule gives an integral rule, with a $+C$ for the family of antiderivatives. u-substitution reverses the chain rule: when you see a function and the derivative of its inside, set $u$ equal to the inside, convert $dx$ to $du$, integrate, and convert back (or change the limits). Always check by differentiating your answer.

@viz func kind=transform parent=exp | Set b = 2: the curve e^(2x) is twice as steep, so its antiderivative needs a factor 1/2. That is ∫f(ax + b)dx = F(ax + b)/a.

:::explore
**What to try**
1. With parent $e^x$, set the horizontal slider $b = 2$ and leave $a = 1$. The solid curve is $e^{2x}$.
2. Now set $a = 0.5$ as well, so the solid curve is $\frac12e^{2x}$, and compare its height at $x = 0$ with the dashed $e^x$.
3. Switch the parent to $\sin x$ and set $b = 3$.

**What to notice:** $\frac{d}{dx}\frac12e^{2x} = e^{2x}$, so the curve you built in step 2 is an antiderivative of the one in step 1. A horizontal squeeze by $b$ multiplies slopes by $b$ (the chain rule), so undoing it requires a vertical factor $\frac1b$. This is why $\int e^{2x}\,dx = \frac12e^{2x} + C$ and $\int\cos(3x)\,dx = \frac13\sin(3x) + C$.
:::

@viz distribution kind=normal lo=-1 hi=1 | Change μ and σ and move the shading limits with them: the shaded probability depends only on the standardized limits.

:::explore
**What to try**
1. With $\mu = 0$, $\sigma = 1$, shade from $-1$ to $1$ and read the probability (about $0.683$).
2. Set $\sigma = 2$ and shade from $-2$ to $2$.
3. Set $\mu = 1$, $\sigma = 2$ and shade from $-1$ to $3$.

**What to notice:** every time the limits are "one standard deviation each side of the mean", the area is the same $0.683$. That is substitution at work: $z = \frac{x - \mu}{\sigma}$, $dz = \frac{dx}{\sigma}$ turns $\int_{\mu - \sigma}^{\mu + \sigma}\frac{1}{\sigma\sqrt{2\pi}}e^{-(x - \mu)^2/(2\sigma^2)}\,dx$ into $\int_{-1}^{1}\frac{1}{\sqrt{2\pi}}e^{-z^2/2}\,dz$. The $\frac1\sigma$ in front cancels with $dx = \sigma\,dz$.
:::

:::formulas
$$\int x^n\,dx = \frac{x^{n+1}}{n+1} + C\ (n\ne-1) \qquad \int\frac{dx}{x} = \ln|x| + C$$
$$\int e^{ax}\,dx = \frac1ae^{ax} + C \qquad \int\cos ax\,dx = \frac1a\sin ax + C \qquad \int\sin ax\,dx = -\frac1a\cos ax + C$$
$$\int\sec^2x\,dx = \tan x + C \qquad \int\frac{dx}{1 + x^2} = \arctan x + C$$
$$\int f(g(x))\,g'(x)\,dx = \int f(u)\,du,\quad u = g(x)$$
$$\int_a^b f(g(x))g'(x)\,dx = \int_{g(a)}^{g(b)} f(u)\,du \qquad \int\frac{g'}{g}\,dx = \ln|g| + C$$
:::

:::thm Substitution rule
If $g'$ is continuous on $[a, b]$ and $f$ is continuous on the range of $g$, then $\int_a^b f(g(x))\,g'(x)\,dx = \int_{g(a)}^{g(b)} f(u)\,du$.
:::

:::proof
Let $F$ be an antiderivative of $f$. By the chain rule, $\frac{d}{dx}F(g(x)) = f(g(x))g'(x)$, so by FTC Part 2 the left side equals $F(g(b)) - F(g(a))$. The right side is also $F(g(b)) - F(g(a))$ by FTC Part 2.
:::

:::steps $\int (2x + 3)^5\,dx$
1. $u = 2x + 3$, $du = 2\,dx$, so $dx = \frac12du$.
2. $\frac12\int u^5\,du = \frac{u^6}{12} + C$.
3. Answer: $\frac{(2x + 3)^6}{12} + C$. Check: derivative is $\frac{6(2x+3)^5\cdot2}{12} = (2x + 3)^5$.
:::

:::steps $\int_0^1 x\,e^{x^2}\,dx$
1. $u = x^2$, $du = 2x\,dx$; limits $x = 0 \to u = 0$, $x = 1 \to u = 1$.
2. $\frac12\int_0^1 e^u\,du = \frac12[e^u]_0^1$.
3. $= \frac12(e - 1) \approx 0.859$.
:::

:::steps $\int\frac{\ln x}{x}\,dx$
1. $u = \ln x$, $du = \frac1x\,dx$.
2. $\int u\,du = \frac{u^2}{2} + C$.
3. Answer: $\frac{(\ln x)^2}{2} + C$.
:::

:::mock Exam question
(a) Find $F$ if $F'(x) = 3x^2 + \cos x$ and $F(0) = 2$. (b) Evaluate $\int_0^{\pi/2}\sin^3x\cos x\,dx$. (c) Evaluate $\int_0^1\frac{2x}{1 + x^2}\,dx$.
:::solution
(a) $F(x) = x^3 + \sin x + C$; $F(0) = C = 2$, so $F(x) = x^3 + \sin x + 2$. (b) $u = \sin x$, $du = \cos x\,dx$, limits $0$ to $1$: $\int_0^1u^3\,du = \frac14$. (c) $u = 1 + x^2$, $du = 2x\,dx$, limits $1$ to $2$: $\int_1^2\frac{du}{u} = \ln 2 \approx 0.693$.
:::
:::

:::ml The reparameterization trick
Variational autoencoders need gradients of expectations like $\mathbb E_{z\sim\mathcal N(\mu, \sigma^2)}[f(z)]$ with respect to $\mu$ and $\sigma$. The trick is a substitution: write $z = \mu + \sigma\varepsilon$ with $\varepsilon \sim \mathcal N(0, 1)$. The integral over $z$ becomes an integral over $\varepsilon$ whose density does not depend on the parameters, so gradients can flow through $\mu$ and $\sigma$ by the chain rule. Changing variables in probability densities always involves the factor $\left|\frac{dz}{d\varepsilon}\right| = \sigma$, the same factor as $du = g'(x)\,dx$.
:::

:::cs Symbolic integration
Computer algebra systems try a sequence of strategies: table lookup, linearity, then pattern-matching for substitutions like $f(g(x))g'(x)$ and $\frac{g'}{g}$. The Risch algorithm can decide whether an elementary antiderivative exists at all, which is how software knows that $e^{x^2}$ has none.
:::

:::real Drug concentration
After a dose, a drug enters the bloodstream at rate $r(t) = 10e^{-0.5t}$ mg per hour. The total absorbed in the first 4 hours is $\int_0^4 10e^{-0.5t}\,dt = [-20e^{-0.5t}]_0^4 = 20(1 - e^{-2}) \approx 17.3$ mg, out of a total of 20 mg that would eventually be absorbed.
:::

:::quiz
? $\int x^4\,dx$ =
+ $\frac{x^5}{5} + C$
- $4x^3 + C$
- $\frac{x^4}{4} + C$
> Raise the power, divide by the new power.

? $\int_0^1 3x^2\,dx$ =
= 1
> $[x^3]_0^1 = 1$.

? $\int\cos(5x)\,dx$ =
+ $\frac15\sin(5x) + C$
- $5\sin(5x) + C$
- $-\frac15\sin(5x) + C$
> Linear inside: divide by 5.

? $\int_0^2 2x(x^2 + 1)^3\,dx$ =
= 156
> $u = x^2 + 1$: $\left[\frac{u^4}{4}\right]_1^5 = 156$.

? If $F'(x) = 4x$ and $F(1) = 5$, what is $F(2)$?
= 11
> $F = 2x^2 + C$, $C = 3$, so $F(2) = 8 + 3$.

? $\int_1^{e^2}\frac{dx}{x}$ =
= 2
> $\ln e^2 - \ln 1 = 2$.
:::

## Lesson: Integration by parts, partial fractions and improper integrals {#techniques}
@summary: Reversing the product rule, splitting rational functions, trigonometric integrals, and integrals over infinite ranges.

### When substitution is not enough
u-substitution handles integrands of the form "function of the inside times the derivative of the inside". Many important integrals have a different structure: a product of unrelated functions like $xe^x$ or $x\cos x$, a fraction like $\frac{1}{x^2 - 1}$, or an infinite range like $\int_0^\infty e^{-x}\,dx$. This lesson adds three techniques that cover most of the remaining cases you will meet in ML and CS: **integration by parts**, **partial fractions**, and **improper integrals**.

### An everyday scenario
A light bulb's lifetime is modelled by an exponential distribution: the probability density of failing at time $t$ (in thousands of hours) is $p(t) = e^{-t}$. What is the average lifetime? The mean is $\int_0^\infty t\,e^{-t}\,dt$. That integral is a product ($t$ times $e^{-t}$) over an infinite range. By the end of this lesson you will compute it in three lines: the answer is exactly 1 thousand hours.

### Integration by parts
The product rule says $(uv)' = u'v + uv'$. Integrating both sides and rearranging gives
$$\int u\,dv = uv - \int v\,du.$$
This trades one integral for another. The trick is to choose $u$ (to differentiate) and $dv$ (to integrate) so that the new integral $\int v\,du$ is simpler than the original.

Take $\int xe^x\,dx$. If we set $u = x$, then $du = dx$, which is simpler. Set $dv = e^x\,dx$, so $v = e^x$. Then
$$\int xe^x\,dx = xe^x - \int e^x\,dx = xe^x - e^x + C = e^x(x - 1) + C.$$
Check by differentiating: $e^x(x - 1) + e^x = xe^x$. Correct. If we had chosen the other way round, $u = e^x$ and $dv = x\,dx$, the new integral would be $\int\frac{x^2}{2}e^x\,dx$, which is worse. A handy guide for choosing $u$ is the order **LIATE**: Logarithms, Inverse trig, Algebraic (powers), Trig, Exponentials. Pick $u$ from whichever type comes first.

:::def Integration by parts
The rule $\int u\,dv = uv - \int v\,du$, obtained by integrating the product rule; for definite integrals, $\int_a^b u\,dv = [uv]_a^b - \int_a^b v\,du$.
:::

Some integrals need parts twice. For $\int x^2e^x\,dx$, one round gives $x^2e^x - \int2xe^x\,dx$, and the remaining integral is the one we just did, so the result is $e^x(x^2 - 2x + 2) + C$. Parts also handles $\int\ln x\,dx$, using $u = \ln x$, $dv = dx$: $x\ln x - \int x\cdot\frac1x\,dx = x\ln x - x + C$.

### Partial fractions
A rational function like $\frac{1}{x^2 - 1}$ can be broken into simpler fractions. Factor the denominator, $x^2 - 1 = (x - 1)(x + 1)$, and look for constants with
$$\frac{1}{(x - 1)(x + 1)} = \frac{A}{x - 1} + \frac{B}{x + 1}.$$
Multiply through: $1 = A(x + 1) + B(x - 1)$. Setting $x = 1$ gives $A = \frac12$; setting $x = -1$ gives $B = -\frac12$. Each piece integrates to a logarithm:
$$\int\frac{dx}{x^2 - 1} = \frac12\ln|x - 1| - \frac12\ln|x + 1| + C = \frac12\ln\left|\frac{x - 1}{x + 1}\right| + C.$$
This method requires the degree of the top to be less than the degree of the bottom; otherwise do polynomial long division first. Repeated factors like $(x - 1)^2$ need terms $\frac{A}{x - 1} + \frac{B}{(x - 1)^2}$, and irreducible quadratics like $x^2 + 1$ lead to arctangents.

:::def Partial fraction decomposition
Rewriting a rational function as a sum of simpler fractions with linear or irreducible quadratic denominators, each of which can be integrated directly.
:::

### Trigonometric integrals
Powers of sine and cosine are handled with identities. If one power is odd, peel off one factor and substitute: $\int\sin^3x\,dx = \int(1 - \cos^2x)\sin x\,dx$, then $u = \cos x$. If both are even, use the half-angle identities $\sin^2x = \frac{1 - \cos2x}{2}$ and $\cos^2x = \frac{1 + \cos2x}{2}$. For example $\int_0^\pi\sin^2x\,dx = \int_0^\pi\frac{1 - \cos2x}{2}\,dx = \frac\pi2$.

### Improper integrals
An integral over an infinite interval, or of a function that blows up, is defined as a limit:
$$\int_a^\infty f(x)\,dx = \lim_{b\to\infty}\int_a^b f(x)\,dx.$$
If the limit is finite, the integral **converges**; otherwise it **diverges**. For example, $\int_0^\infty e^{-x}\,dx = \lim_{b\to\infty}(1 - e^{-b}) = 1$: an infinitely long region can have finite area. The important family is $\int_1^\infty\frac{dx}{x^p}$, which converges to $\frac{1}{p - 1}$ when $p > 1$ and diverges when $p \le 1$. So $\int_1^\infty\frac{dx}{x^2} = 1$ but $\int_1^\infty\frac{dx}{x} = \lim\ln b = \infty$.

Now the bulb: $\int_0^\infty te^{-t}\,dt$. By parts with $u = t$, $dv = e^{-t}dt$, $v = -e^{-t}$: $[-te^{-t}]_0^b + \int_0^be^{-t}\,dt$. As $b\to\infty$, $be^{-b}\to0$ (exponentials beat powers) and the remaining integral tends to 1. The mean lifetime is 1.

:::def Improper integral
An integral with an infinite limit or an unbounded integrand, defined as a limit of ordinary integrals; it converges if that limit exists and is finite.
:::

### Choosing a technique
Faced with an unfamiliar integral, run through a short checklist. First, simplify: expand products, split fractions, use identities. Second, check the basic table. Third, look for an inside function whose derivative is present, which means substitution. Fourth, if the integrand is a product of two different types of function, try parts. Fifth, if it is a ratio of polynomials, try partial fractions. If the range is infinite or the integrand blows up, write it as a limit before doing anything else. Some integrals, such as $\int e^{-x^2}\,dx$, have no elementary antiderivative at all; for those we use numerical methods or series, which is perfectly normal in practice.

### Common mistakes
Choosing $u$ and $dv$ the wrong way round makes integration by parts harder, not easier; if the new integral looks worse, swap. Forgetting the $uv$ boundary term in definite integrals is another frequent slip. In partial fractions, check the degrees first. For improper integrals, never just "plug in infinity"; write the limit, and watch for hidden blow-ups inside the interval.

### Summary
Integration by parts, $\int u\,dv = uv - \int v\,du$, reverses the product rule and handles products like $xe^x$ and $x\cos x$. Partial fractions split rational functions into logarithms and arctangents. Trigonometric powers yield to identities. Improper integrals are limits, and they can converge even over infinite ranges, which is essential for probability distributions.

@viz distribution kind=exponential lo=0 hi=8 | The exponential density over [0, ∞): its total area is 1 and its mean (orange line) is 1/λ, both improper integrals.

:::explore
**What to try**
1. With $\lambda = 1$, shade from 0 to 8 and read the probability. Then shade from 0 to 3 and from 0 to 1.
2. Change $\lambda$ to 2 and watch the orange mean line.
3. Shade from 2 to 8 with $\lambda = 1$.

**What to notice:** the area from 0 to 8 is almost exactly 1, because $\int_0^\infty\lambda e^{-\lambda t}\,dt = 1$ and the tail beyond 8 is only $e^{-8}$. The mean line sits at $\frac1\lambda$, the value of the integration-by-parts calculation $\int_0^\infty t\lambda e^{-\lambda t}\,dt$. The area from 2 onward is $e^{-2} \approx 0.135$, computed as $\lim_{b\to\infty}[-e^{-t}]_2^b$.
:::

:::formulas
$$\int u\,dv = uv - \int v\,du \qquad \int_a^b u\,dv = [uv]_a^b - \int_a^b v\,du$$
$$\int xe^x\,dx = e^x(x - 1) + C \qquad \int\ln x\,dx = x\ln x - x + C$$
$$\frac{1}{(x - a)(x - b)} = \frac{1}{a - b}\left(\frac{1}{x - a} - \frac{1}{x - b}\right)$$
$$\sin^2x = \frac{1 - \cos2x}{2} \qquad \cos^2x = \frac{1 + \cos2x}{2}$$
$$\int_a^\infty f = \lim_{b\to\infty}\int_a^b f \qquad \int_1^\infty\frac{dx}{x^p} = \frac{1}{p - 1}\ (p > 1),\ \text{diverges for } p \le 1$$
$$\int_0^\infty x^ne^{-x}\,dx = n!$$
:::

:::thm The p-integral test
$\int_1^\infty\frac{dx}{x^p}$ converges if and only if $p > 1$, in which case it equals $\frac{1}{p - 1}$.
:::

:::proof
For $p \ne 1$, $\int_1^b x^{-p}\,dx = \frac{b^{1-p} - 1}{1 - p}$. If $p > 1$, $b^{1-p}\to0$, giving $\frac{-1}{1 - p} = \frac{1}{p - 1}$. If $p < 1$, $b^{1-p}\to\infty$. For $p = 1$, $\int_1^b\frac{dx}{x} = \ln b\to\infty$.
:::

:::steps $\int x\cos x\,dx$
1. LIATE: $u = x$ (algebraic), $dv = \cos x\,dx$; so $du = dx$, $v = \sin x$.
2. $x\sin x - \int\sin x\,dx$.
3. $= x\sin x + \cos x + C$. Check: $\sin x + x\cos x - \sin x = x\cos x$.
:::

:::steps $\int_2^3\frac{dx}{x^2 - 1}$
1. Partial fractions: $\frac12\left(\frac{1}{x - 1} - \frac{1}{x + 1}\right)$.
2. Antiderivative: $\frac12\ln\left|\frac{x - 1}{x + 1}\right|$.
3. $\frac12\left(\ln\frac24 - \ln\frac13\right) = \frac12\ln\frac32 \approx 0.203$.
:::

:::steps $\int_1^\infty\frac{dx}{x^3}$
1. $\lim_{b\to\infty}\int_1^bx^{-3}\,dx = \lim_{b\to\infty}\left[-\frac{1}{2x^2}\right]_1^b$.
2. $= \lim_{b\to\infty}\left(-\frac{1}{2b^2} + \frac12\right)$.
3. $= \frac12$. (Matches $\frac{1}{p - 1}$ with $p = 3$.)
:::

:::mock Exam question
For the exponential distribution with rate $\lambda > 0$, density $p(x) = \lambda e^{-\lambda x}$ on $[0, \infty)$: (a) show the total probability is 1; (b) find the mean $\mathbb E[X] = \int_0^\infty x\lambda e^{-\lambda x}\,dx$; (c) give the mean for $\lambda = 4$.
:::solution
(a) $\int_0^b\lambda e^{-\lambda x}\,dx = 1 - e^{-\lambda b}\to1$. (b) Parts with $u = x$, $dv = \lambda e^{-\lambda x}dx$, $v = -e^{-\lambda x}$: $[-xe^{-\lambda x}]_0^b + \int_0^be^{-\lambda x}\,dx$. The boundary term $-be^{-\lambda b}\to0$, and the integral tends to $\frac1\lambda$. So $\mathbb E[X] = \frac1\lambda$. (c) $\frac14 = 0.25$.
:::
:::

:::ml Where these techniques appear
Integration by parts proves that the mean of an exponential distribution is $\frac1\lambda$, computes the variance of the Gaussian, and underlies "score function" identities such as Stein's lemma $\mathbb E[g(X)(X - \mu)] = \sigma^2\mathbb E[g'(X)]$. Improper integrals define every continuous distribution's normalization and moments. The Gamma function $\Gamma(n) = \int_0^\infty x^{n-1}e^{-x}\,dx = (n - 1)!$, computed by repeated parts, appears in the Gamma, Beta, Dirichlet and chi-squared distributions.
:::

:::cs Algorithm analysis with integrals
Sums that are hard to evaluate exactly are bounded by improper or ordinary integrals. Comparing $\sum_{k=1}^n\frac1k$ with $\int_1^n\frac{dx}{x} = \ln n$ shows the harmonic numbers grow like $\ln n$, giving the $O(n\log n)$ expected cost of quicksort and the coupon-collector bound. Comparing $\sum\frac{1}{k^2}$ with $\int\frac{dx}{x^2}$ shows that sum stays bounded.
:::

:::real Total radiation from a decaying source
A radioactive sample emits $R(t) = 50e^{-0.1t}$ units per day. The total radiation it will ever emit is $\int_0^\infty 50e^{-0.1t}\,dt = \frac{50}{0.1} = 500$ units: an infinite amount of time, but a finite total, which is how safety officers plan long-term storage.
:::

:::quiz
? For $\int x e^{2x}\,dx$, LIATE suggests $u$ =
+ $x$
- $e^{2x}$
- $xe^{2x}$
> Algebraic comes before Exponential.

? $\int_0^1 xe^x\,dx$ =
= 1
> $[e^x(x - 1)]_0^1 = 0 - (-1) = 1$.

? $\int_1^\infty\frac{dx}{x^2}$ =
= 1
> $\frac{1}{p - 1}$ with $p = 2$.

? Does $\int_1^\infty\frac{dx}{\sqrt x}$ converge?
+ No, it diverges
- Yes, to 2
- Yes, to 1
> $p = \frac12 \le 1$.

? In $\frac{1}{x(x + 1)} = \frac Ax + \frac{B}{x + 1}$, what is $A$?
= 1
> Set $x = 0$: $1 = A(1)$. (And $B = -1$.)

? $\int_0^\infty x^2e^{-x}\,dx$ =
= 2
> $\Gamma(3) = 2! = 2$, from parts twice.
:::

## Lesson: Applications of integrals {#integral-applications}
@summary: Area between curves, average value, volumes of revolution, arc length, work, and probability as integrals.

### One idea, many uses
The integral was introduced as area under a curve, but its real meaning is broader: **an integral adds up infinitely many tiny pieces**. Whenever a quantity can be chopped into thin slices, each approximately "rate × small width", the total is an integral. Area, volume, length, work, mass, total cost, probability and expected value can all be computed this way. This lesson shows the general strategy and the most common applications, so that when you meet a new situation you can set up the integral yourself rather than hunting for a formula.

### An everyday scenario
A city wants to know the average temperature over a day, not just at a few times. If temperature is recorded continuously as $T(t)$, the average of finitely many readings $\frac{1}{n}\sum T(t_i)$ becomes, as readings become infinitely frequent, $\frac{1}{24}\int_0^{24}T(t)\,dt$. The same reasoning tells an engineer the total force of water on a dam, a pharmacist the total dose absorbed, and a data scientist the probability that a measurement falls in a range.

### The slice-and-sum strategy
Every application in this lesson follows four steps. First, decide how to slice the object into thin pieces of width $dx$. Second, approximate one slice: its area, volume, length or work is (something) × $dx$. Third, add the slices with an integral. Fourth, evaluate. Memorizing formulas is less important than practising this way of thinking.

### Area between two curves
If $f(x) \ge g(x)$ on $[a, b]$, a thin vertical strip at $x$ has height $f(x) - g(x)$ and width $dx$, so
$$\text{Area} = \int_a^b\big(f(x) - g(x)\big)\,dx.$$
For the region between $y = x$ and $y = x^2$: they meet where $x = x^2$, at $x = 0$ and $x = 1$. On $[0, 1]$, $x \ge x^2$ (for instance at $x = 0.5$, $0.5 > 0.25$). So the area is $\int_0^1(x - x^2)\,dx = \frac12 - \frac13 = \frac16$. Always find the intersection points first, and check which curve is on top; if they cross inside the interval, split it.

### Average value
The average of a function over $[a, b]$ is
$$f_{\text{avg}} = \frac{1}{b - a}\int_a^b f(x)\,dx.$$
Geometrically, it is the height of the rectangle over $[a, b]$ with the same area as the region under the curve. For $\sin x$ on $[0, \pi]$, the area is 2, so the average is $\frac2\pi \approx 0.637$. The **mean value theorem for integrals** says a continuous function actually attains its average somewhere in the interval.

:::def Average value of a function
$f_{\text{avg}} = \frac{1}{b - a}\int_a^b f(x)\,dx$, the constant height whose rectangle has the same area as the region under $f$ on $[a, b]$.
:::

### Volumes by slicing
To find the volume of a solid, slice it perpendicular to an axis. If the cross-section at $x$ has area $A(x)$, a slice of thickness $dx$ has volume about $A(x)\,dx$, so $V = \int_a^bA(x)\,dx$. When the solid is made by rotating the curve $y = f(x)$ around the $x$-axis, each slice is a disc of radius $f(x)$, so $A(x) = \pi f(x)^2$ and
$$V = \pi\int_a^b f(x)^2\,dx.$$
Rotating $y = \sqrt x$ for $0 \le x \le 4$ gives a bowl-shaped solid with volume $\pi\int_0^4x\,dx = 8\pi$. Rotating the line $y = \frac rhx$ from 0 to $h$ gives a cone: $\pi\int_0^h\frac{r^2}{h^2}x^2\,dx = \frac13\pi r^2h$, the familiar cone formula, now derived.

:::def Volume of revolution (disc method)
$V = \pi\int_a^b f(x)^2\,dx$, the volume swept out by rotating $y = f(x)$, $a \le x \le b$, about the $x$-axis.
:::

@fig riemann | Thin slices: each strip, disc or shell contributes (something) × dx, and the integral adds them up.

### Arc length
A tiny piece of a curve is nearly a straight segment with horizontal run $dx$ and vertical rise $dy = f'(x)\,dx$. By Pythagoras its length is $\sqrt{dx^2 + dy^2} = \sqrt{1 + f'(x)^2}\,dx$, so the length of the curve is $L = \int_a^b\sqrt{1 + f'(x)^2}\,dx$. For the line $y = 2x$ on $[0, 1]$ this gives $\sqrt5$, matching the distance formula. Arc-length integrals are often impossible to do by hand and are evaluated numerically.

### Work
In physics, work is force × distance. If the force varies with position, chop the path into pieces: $W = \int_a^bF(x)\,dx$. A spring with stiffness $k$ pulls back with force $F = kx$ when stretched by $x$, so stretching it from 0 to 0.2 m with $k = 50$ N/m takes $\int_0^{0.2}50x\,dx = 25(0.04) = 1$ joule.

### Probability and expected value
For a continuous random variable with density $p(x)$, the probability of landing between $a$ and $b$ is the area $\int_a^bp(x)\,dx$, the total area is 1, and the mean is $\int x\,p(x)\,dx$, the "balance point" of the density. For the uniform density $p(x) = 1$ on $[0, 1]$, $P(0.2 \le X \le 0.5) = 0.3$ and the mean is $\int_0^1x\,dx = \frac12$.

### Common mistakes
Subtracting curves in the wrong order gives a negative area; check which is on top. In disc volumes, square the radius: $\pi\int f^2$, not $\pi\int f$ and not $(\pi\int f)^2$. For average value, remember to divide by the length of the interval. And make sure units make sense: an integral of a rate (litres per minute) over time (minutes) gives litres.

### Summary
Integrals add up thin slices. Area between curves integrates top minus bottom; average value divides an integral by the interval length; volumes integrate cross-sectional area, $\pi f^2$ for discs; arc length integrates $\sqrt{1 + f'^2}$; work integrates force over distance; probabilities and means integrate densities. Slice, approximate, sum, evaluate.

@viz riemann f="sin x + 1" | Each rectangle is one slice. The total area divided by the width b is the average height of the curve.

:::explore
**What to try**
1. With $f = \sin x + 1$ and $b = 3$, increase $n$ until the sum matches the exact value.
2. Divide that area by $b = 3$ in your head to get the average height, and picture a rectangle of that height over $[0, 3]$.
3. Change $b$ to about $3.14$ ($\pi$) and repeat.

**What to notice:** at $b = \pi$ the exact area is $\int_0^\pi(\sin x + 1)\,dx = 2 + \pi \approx 5.14$, so the average height is $\frac{2 + \pi}{\pi} = 1 + \frac2\pi \approx 1.64$. Some rectangles are taller and some shorter than that average, and the mean value theorem for integrals says the curve crosses that height somewhere in the interval.
:::

@viz distribution kind=uniform lo=0.2 hi=0.5 | Probability is area under the density. For the uniform density, area is width × height.

:::explore
**What to try**
1. Read the shaded probability for the default limits, then move them to cover the whole support.
2. Switch to the normal distribution and shade from $-2$ to $2$.

**What to notice:** probability is an integral of the density, so it behaves like area: adding intervals adds probabilities, and the total over everything is 1. For the normal distribution, about 95% of the area lies within 2 standard deviations of the mean.
:::

:::formulas
$$A = \int_a^b\big(f(x) - g(x)\big)\,dx \qquad f_{\text{avg}} = \frac{1}{b - a}\int_a^b f(x)\,dx$$
$$V = \int_a^bA(x)\,dx \qquad V_{\text{disc}} = \pi\int_a^bf(x)^2\,dx \qquad V_{\text{shell}} = 2\pi\int_a^b x\,f(x)\,dx$$
$$L = \int_a^b\sqrt{1 + f'(x)^2}\,dx \qquad W = \int_a^bF(x)\,dx$$
$$P(a \le X \le b) = \int_a^bp(x)\,dx \qquad \mathbb E[X] = \int x\,p(x)\,dx \qquad \operatorname{Var}(X) = \int(x - \mu)^2p(x)\,dx$$
:::

:::thm Mean value theorem for integrals
If $f$ is continuous on $[a, b]$, there is some $c \in [a, b]$ with $f(c) = \frac{1}{b - a}\int_a^bf(x)\,dx$.
:::

:::proof
Let $m$ and $M$ be the minimum and maximum of $f$ on $[a, b]$ (they exist by the extreme value theorem). The comparison property gives $m \le \frac{1}{b - a}\int_a^bf \le M$. Since $f$ is continuous and takes the values $m$ and $M$, the intermediate value theorem gives a $c$ where $f(c)$ equals the average.
:::

:::steps Area between $y = 4 - x^2$ and $y = x + 2$
1. Intersections: $4 - x^2 = x + 2 \Rightarrow x^2 + x - 2 = 0 \Rightarrow x = -2, 1$.
2. On $[-2, 1]$ the parabola is on top (at $x = 0$: $4 > 2$). Area $= \int_{-2}^1(2 - x - x^2)\,dx$.
3. $= \left[2x - \frac{x^2}{2} - \frac{x^3}{3}\right]_{-2}^1 = \left(2 - \frac12 - \frac13\right) - \left(-4 - 2 + \frac83\right) = \frac76 + \frac{10}{3} = \frac92$.
:::

:::steps Volume of a sphere of radius $r$
1. Rotate $y = \sqrt{r^2 - x^2}$, $-r \le x \le r$, about the $x$-axis.
2. $V = \pi\int_{-r}^r(r^2 - x^2)\,dx = \pi\left[r^2x - \frac{x^3}{3}\right]_{-r}^r$.
3. $= \pi\left(\frac23r^3 + \frac23r^3\right) = \frac43\pi r^3$.
:::

:::steps Average value of $f(x) = x^2$ on $[0, 3]$
1. $\int_0^3x^2\,dx = 9$.
2. Divide by the length 3: $f_{\text{avg}} = 3$.
3. It is attained at $c = \sqrt3 \approx 1.73$, as the mean value theorem promises.
:::

:::mock Exam question
A random variable has density $p(x) = kx$ on $[0, 2]$ and 0 elsewhere. (a) Find $k$. (b) Find $P(X \le 1)$. (c) Find the mean $\mathbb E[X]$.
:::solution
(a) Total area must be 1: $\int_0^2kx\,dx = 2k = 1$, so $k = \frac12$. (b) $\int_0^1\frac x2\,dx = \frac14$. (c) $\int_0^2x\cdot\frac x2\,dx = \left[\frac{x^3}{6}\right]_0^2 = \frac86 = \frac43$. The mean is to the right of the midpoint 1 because the density is heavier on the right.
:::
:::

:::ml Expected loss and probability calculations
The quantity a model minimizes in theory is an expected loss, $\int\ell(f(x), y)\,p(x, y)\,dx\,dy$; the training loss is its sample average. Means, variances, entropies ($-\int p\ln p$) and KL divergences ($\int p\ln\frac pq$) are all integrals of exactly this "density times something" form. The area-between-curves idea also appears in the AUC metric, the area under the ROC curve.
:::

:::cs Graphics and simulation
Physics engines integrate force over distance to get work and energy, and rendering integrates light arriving over a pixel's area and over all directions. These integrals are computed numerically, usually by summing many samples (Monte Carlo), which is the slice-and-sum strategy with random slices.
:::

:::real Average speed and fuel
A delivery van's speed over a 2-hour shift is $v(t) = 30 + 10t$ km/h. The distance driven is $\int_0^2(30 + 10t)\,dt = 80$ km and its average speed is $\frac{80}{2} = 40$ km/h. If it burns 0.1 litres per km, the fuel used is 8 litres: integrals turn rates into totals for planning and billing.
:::

:::quiz
? The area between $y = x$ and $y = x^2$ on $[0, 1]$ is...
= 1/6|0.1667
> $\int_0^1(x - x^2)\,dx = \frac12 - \frac13$.

? The average value of $f(x) = 2x$ on $[0, 4]$ is...
= 4
> $\frac14\int_0^42x\,dx = \frac{16}{4}$.

? The volume from rotating $y = \sqrt x$, $0 \le x \le 2$, about the x-axis, divided by π, is...
= 2
> $\pi\int_0^2x\,dx = 2\pi$.

? Work to stretch a spring ($k = 100$ N/m) from 0 to 0.1 m, in joules:
= 0.5|1/2
> $\int_0^{0.1}100x\,dx = 50(0.01)$.

? For the uniform density on $[0, 4]$ ($p = \frac14$), $P(1 \le X \le 2)$ =
= 1/4|0.25
> Width 1 times height $\frac14$.

? In the disc method, the cross-sectional area of a slice is...
+ $\pi f(x)^2$
- $2\pi f(x)$
- $\pi f(x)$
> Each slice is a disc of radius $f(x)$.
:::

# Unit: Series

## Lesson: Sequences, series and convergence tests {#series-convergence}
@summary: Infinite sums, geometric and harmonic series, and the tests that decide whether a series converges.

### Can you add infinitely many numbers?
Walk halfway to a wall, then half of the remaining distance, then half again, forever. You take infinitely many steps, yet you never travel more than the original distance. In symbols, $\frac12 + \frac14 + \frac18 + \cdots = 1$. Adding infinitely many numbers can produce a finite answer. But not always: $1 + 1 + 1 + \cdots$ obviously grows without bound, and, more surprisingly, so does $1 + \frac12 + \frac13 + \frac14 + \cdots$. This lesson makes "infinite sum" precise and gives you tests to decide which sums settle down. These ideas are the foundation for Taylor series, for analysing algorithms, and for understanding when iterative methods converge.

### Sequences
A **sequence** is an infinite list $a_1, a_2, a_3, \ldots$, usually given by a formula such as $a_n = \frac1n$. It **converges** to $L$ if $a_n$ gets and stays arbitrarily close to $L$ as $n$ grows, written $\lim_{n\to\infty}a_n = L$. So $\frac1n\to0$, $\frac{n}{n + 1}\to1$, and $(-1)^n$ (bouncing between $-1$ and 1) diverges. A geometric sequence $r^n$ converges to 0 when $|r| < 1$ and blows up when $|r| > 1$.

### Series and partial sums
A **series** is the sum of a sequence's terms, $\sum_{n=1}^\infty a_n$. We cannot literally add forever, so we define it through **partial sums**: $S_N = a_1 + a_2 + \cdots + a_N$. If the sequence of partial sums $S_N$ converges to a number $S$, the series converges and its sum is $S$; otherwise it diverges. For $\sum\frac{1}{2^n}$, the partial sums are $0.5, 0.75, 0.875, 0.9375, \ldots$, and $S_N = 1 - \frac{1}{2^N}\to1$.

:::def Series and partial sums
A series $\sum_{n=1}^\infty a_n$ converges to $S$ if its partial sums $S_N = \sum_{n=1}^Na_n$ satisfy $S_N\to S$; otherwise it diverges.
:::

### Geometric series
The most important series is the **geometric series** $a + ar + ar^2 + \cdots$. Its partial sum has a closed form: multiply $S_N = a + ar + \cdots + ar^{N-1}$ by $r$ and subtract, and almost everything cancels, leaving $S_N(1 - r) = a(1 - r^N)$. If $|r| < 1$, $r^N\to0$, so
$$\sum_{n=0}^\infty ar^n = \frac{a}{1 - r} \quad (|r| < 1).$$
If $|r| \ge 1$, it diverges. Example: $3 + 1 + \frac13 + \cdots$ has $a = 3$, $r = \frac13$, sum $\frac{3}{2/3} = 4.5$. The repeating decimal $0.999\ldots = \frac{9}{10} + \frac{9}{100} + \cdots = \frac{0.9}{0.9} = 1$.

:::def Geometric series
$\sum_{n=0}^\infty ar^n$, which converges to $\frac{a}{1 - r}$ when $|r| < 1$ and diverges when $|r| \ge 1$.
:::

### The divergence test
If the terms do not shrink to 0, the sum cannot settle: each new term keeps pushing it by a noticeable amount. So: **if $a_n \not\to 0$, the series diverges.** For example $\sum\frac{n}{n + 1}$ diverges because its terms approach 1. Warning: the converse is false. Terms going to 0 is necessary but not sufficient, as the next example shows.

### The harmonic series diverges
The harmonic series $\sum\frac1n$ has terms going to 0, yet it diverges. Group the terms: $1 + \frac12 + \left(\frac13 + \frac14\right) + \left(\frac15 + \cdots + \frac18\right) + \cdots$. Each bracket is at least $\frac12$ (for example $\frac13 + \frac14 > \frac14 + \frac14$). Infinitely many halves add to infinity. The growth is very slow, about $\ln N$: the first million terms add to only about 14.4.

### Tests for convergence
For series of positive terms there are several standard tests. The **integral test** compares $\sum f(n)$ with $\int_1^\infty f(x)\,dx$ for a positive decreasing $f$: both converge or both diverge. It gives the **p-series** rule: $\sum\frac{1}{n^p}$ converges exactly when $p > 1$. So $\sum\frac{1}{n^2}$ converges (to $\frac{\pi^2}{6}$) while $\sum\frac{1}{\sqrt n}$ diverges. The **comparison test** says that if $0 \le a_n \le b_n$ and $\sum b_n$ converges, so does $\sum a_n$; if $\sum a_n$ diverges, so does $\sum b_n$. So $\sum\frac{1}{n^2 + 1}$ converges by comparison with $\sum\frac{1}{n^2}$. The **ratio test** looks at $\rho = \lim\left|\frac{a_{n+1}}{a_n}\right|$: if $\rho < 1$ the series converges, if $\rho > 1$ it diverges, and $\rho = 1$ is inconclusive. It is ideal for factorials and exponentials: for $\sum\frac{1}{n!}$, $\rho = \lim\frac{1}{n + 1} = 0$, so it converges (to $e - 1$, starting from $n = 1$).

### Alternating series
A series whose signs alternate, like $1 - \frac12 + \frac13 - \frac14 + \cdots$, converges if the sizes of the terms decrease to 0: the partial sums zig-zag with shrinking steps and close in on a limit (here $\ln2$). Moreover, the error after stopping is at most the size of the first omitted term. A series that converges but whose absolute values do not (like this one) is called **conditionally convergent**; if $\sum|a_n|$ converges, the series is **absolutely convergent**, which is the safer, better-behaved kind.

### Common mistakes
The biggest error is believing "terms go to 0, so it converges"; the harmonic series is the counterexample. Another is using the geometric formula when $|r| \ge 1$, or forgetting that it needs the first term $a$, not $ar$. And the ratio test says nothing when $\rho = 1$; for p-series it always gives 1, so use the integral test instead.

### Summary
A series converges when its partial sums approach a limit. Geometric series converge to $\frac{a}{1 - r}$ for $|r| < 1$. If terms do not go to 0, the series diverges, but terms going to 0 is not enough: the harmonic series diverges. Use p-series, comparison, integral, ratio and alternating-series tests to decide convergence.

@viz sequence | Choose geometric and change r: the orange partial sums level off when |r| < 1 and run away otherwise.

:::explore
**What to try**
1. Choose "geometric" with first term $a = 1$ and $r = 0.5$. Watch the orange partial sums.
2. Increase $r$ to $0.9$, then to $1$, then to $1.2$.
3. Set $r = -0.5$.

**What to notice:** with $r = 0.5$ the partial sums approach $\frac{1}{1 - 0.5} = 2$; with $r = 0.9$ they approach 10, more slowly. At $r = 1$ and beyond they never level off, matching the rule $|r| < 1$. With $r = -0.5$ they zig-zag toward $\frac{1}{1.5} \approx 0.667$, an alternating series in action.
:::

@viz sigma term=inv n=12 | The terms 1/i shrink, but the running total keeps growing: the harmonic series diverges, slowly.

:::explore
**What to try**
1. With term $\frac1i$, slide $n$ from 1 to 12 and note the total.
2. Switch the term to $(1/2)^i$ and repeat.

**What to notice:** both term sequences shrink toward 0, but the totals behave differently. $\sum(1/2)^i$ creeps up to 1 and stops, while $\sum\frac1i$ reaches about $3.10$ at $n = 12$ and keeps going forever (about $\ln n + 0.577$). Shrinking terms are necessary but not sufficient.
:::

:::formulas
$$S_N = \sum_{n=1}^Na_n \qquad \sum_{n=1}^\infty a_n = \lim_{N\to\infty}S_N$$
$$\sum_{n=0}^\infty ar^n = \frac{a}{1 - r}\ (|r| < 1) \qquad \sum_{n=0}^{N-1}ar^n = a\frac{1 - r^N}{1 - r}$$
$$\sum\frac{1}{n^p} \text{ converges} \iff p > 1 \qquad \sum_{n=1}^N\frac1n \approx \ln N + 0.5772$$
$$\rho = \lim_{n\to\infty}\left|\frac{a_{n+1}}{a_n}\right|:\ \rho < 1 \text{ converges},\ \rho > 1 \text{ diverges}$$
$$\left|S - S_N\right| \le |a_{N+1}| \text{ (alternating, decreasing terms)}$$
:::

:::thm Divergence test
If $\sum a_n$ converges, then $a_n\to0$. Equivalently, if $a_n\not\to0$, the series diverges.
:::

:::proof
If $S_N\to S$, then also $S_{N-1}\to S$. Since $a_N = S_N - S_{N-1}$, we get $a_N\to S - S = 0$.
:::

:::thm Integral test
If $f$ is positive, continuous and decreasing for $x \ge 1$ and $a_n = f(n)$, then $\sum_{n=1}^\infty a_n$ and $\int_1^\infty f(x)\,dx$ either both converge or both diverge.
:::

:::steps Sum $\sum_{n=1}^\infty \frac{2}{3^n}$
1. First term ($n = 1$): $a = \frac23$; ratio $r = \frac13$.
2. $|r| < 1$, so the sum is $\frac{a}{1 - r} = \frac{2/3}{2/3}$.
3. $= 1$.
:::

:::steps Does $\sum\frac{n^2}{2^n}$ converge?
1. Ratio: $\frac{a_{n+1}}{a_n} = \frac{(n + 1)^2}{2^{n+1}}\cdot\frac{2^n}{n^2} = \frac12\left(\frac{n + 1}{n}\right)^2$.
2. As $n\to\infty$, this tends to $\rho = \frac12$.
3. $\rho < 1$, so the series converges (its sum is 6).
:::

:::steps Classify $\sum\frac{1}{n^{3/2}}$, $\sum\frac{n}{2n + 1}$ and $\sum\frac{(-1)^{n+1}}{n}$
1. $\sum\frac{1}{n^{3/2}}$: p-series with $p = 1.5 > 1$, converges.
2. $\sum\frac{n}{2n + 1}$: terms tend to $\frac12 \ne 0$, diverges by the divergence test.
3. $\sum\frac{(-1)^{n+1}}{n}$: alternating with decreasing terms to 0, converges (conditionally, to $\ln2$).
:::

:::mock Exam question
A ball is dropped from 10 m. After each bounce it rises to 60% of its previous height. (a) Find the total vertical distance it travels. (b) Use the alternating series bound to say how many terms of $1 - \frac12 + \frac13 - \cdots$ guarantee an error below 0.01.
:::solution
(a) Down 10, then up and down $6$, $3.6$, $2.16$, ... each twice: $10 + 2(6 + 3.6 + \cdots) = 10 + 2\cdot\frac{6}{1 - 0.6} = 10 + 30 = 40$ m. (b) The error after $N$ terms is at most $\frac{1}{N + 1}$; we need $\frac{1}{N + 1} < 0.01$, so $N + 1 > 100$, i.e. $N = 100$ terms suffice.
:::
:::

:::ml Discounted rewards and convergence
In reinforcement learning the return is $G = r_0 + \gamma r_1 + \gamma^2r_2 + \cdots$ with discount $0 \le \gamma < 1$. If rewards are bounded by $R$, comparison with a geometric series shows $|G| \le \frac{R}{1 - \gamma}$, so the infinite-horizon return is finite. Learning-rate schedules for stochastic gradient descent require $\sum\eta_t = \infty$ but $\sum\eta_t^2 < \infty$; $\eta_t = \frac1t$ works precisely because the harmonic series diverges while $\sum\frac{1}{t^2}$ converges.
:::

:::cs Series in algorithm analysis
Geometric series explain why a dynamic array that doubles its capacity has amortized $O(1)$ appends: total copying is $1 + 2 + 4 + \cdots + n < 2n$. The harmonic series gives $H_n \approx \ln n$ for the expected cost of quicksort's comparisons and the coupon collector problem, and convergent series bound the running time of divide-and-conquer recurrences.
:::

:::real Loans and perpetuities
A perpetuity pays \$100 every year forever. With a 5% interest rate, its present value is $\frac{100}{1.05} + \frac{100}{1.05^2} + \cdots = \frac{100/1.05}{1 - 1/1.05} = \frac{100}{0.05} = 2000$ dollars. Mortgage payment formulas come from finite geometric sums of exactly this type.
:::

:::quiz
? $\sum_{n=0}^\infty\left(\frac12\right)^n$ =
= 2
> $\frac{1}{1 - 1/2}$.

? $\sum_{n=0}^\infty 5\left(\frac15\right)^n$ =
= 25/4|6.25
> $\frac{5}{1 - 1/5} = \frac{5}{4/5}$.

? Does $\sum\frac1n$ converge?
+ No
- Yes, to 1
- Yes, to $\ln2$
> The harmonic series diverges, even though its terms go to 0.

? $\sum\frac{1}{n^p}$ converges exactly when $p$ is greater than...
= 1
> The p-series rule.

? For $\sum\frac{3^n}{n!}$, the ratio test limit $\rho$ is...
= 0
> $\frac{3}{n + 1}\to0$, so it converges.

? Terms tend to 0 is...
+ necessary but not sufficient for convergence
- sufficient for convergence
- neither necessary nor sufficient
> The divergence test shows necessity; the harmonic series shows it is not sufficient.
:::

## Lesson: Taylor series and power series {#taylor}
@summary: Approximating functions by polynomials, Taylor and Maclaurin series, error bounds, and the radius of convergence.

### Why approximate with polynomials?
Polynomials are the easiest functions there are. To evaluate $3 + 2x - x^2$ you only add and multiply, which is all a computer chip really does. Functions like $\sin x$, $e^x$ and $\ln x$ are not polynomials, so how does a calculator compute $\sin(0.3)$? It uses a polynomial that imitates $\sin x$ extremely well near the point of interest. That polynomial is a **Taylor polynomial**, and the infinite version is a **Taylor series**. The same idea explains why gradient descent works, how optimizers use curvature, and why approximations like $\sin x \approx x$ are so accurate for small $x$.

### An everyday scenario
Suppose you know a car's position, velocity and acceleration right now. Can you predict where it will be one second later? If the car kept its velocity, it would move by $v\cdot t$ (a linear guess). Accounting for acceleration adds $\frac12at^2$. If you also knew the rate of change of acceleration, you could add a cubic term. Each extra derivative you know adds one more correction and improves the prediction. A Taylor polynomial is exactly this: a prediction of $f$ near a point, built from the derivatives at that point.

### Building the polynomial
We want a polynomial $p(x)$ that matches $f$ at $x = 0$ as closely as possible. Matching value and slope gives the linearization $p_1(x) = f(0) + f'(0)x$. To also match the curvature, add a quadratic term $c_2x^2$ with $p''(0) = f''(0)$. Since $\frac{d^2}{dx^2}c_2x^2 = 2c_2$, we need $c_2 = \frac{f''(0)}{2}$. Similarly, the $x^3$ coefficient must satisfy $3!\,c_3 = f'''(0)$. In general, the $n$-th coefficient is $\frac{f^{(n)}(0)}{n!}$, where $n!$ ("$n$ factorial") is $1\cdot2\cdot\cdots\cdot n$. So the degree-$n$ **Maclaurin polynomial** is
$$p_n(x) = f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \cdots + \frac{f^{(n)}(0)}{n!}x^n.$$
Centred at a general point $a$, replace $x$ by $x - a$ and evaluate the derivatives at $a$: this is the **Taylor polynomial** about $a$.

:::def Taylor polynomial
$p_n(x) = \sum_{k=0}^n\frac{f^{(k)}(a)}{k!}(x - a)^k$, the degree-$n$ polynomial that matches $f$ and its first $n$ derivatives at $x = a$. With $a = 0$ it is called a Maclaurin polynomial.
:::

### Three famous examples
For $e^x$, every derivative is $e^x$, which equals 1 at 0. So every coefficient is $\frac{1}{n!}$:
$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots.$$
At $x = 1$: $1 + 1 + 0.5 + 0.1667 + 0.0417 + 0.0083 = 2.7167$ after six terms, already close to $e = 2.71828$.

For $\sin x$, the derivatives cycle $\sin, \cos, -\sin, -\cos$, with values $0, 1, 0, -1$ at 0. Only odd powers survive, with alternating signs:
$$\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots.$$
So $\sin(0.3) \approx 0.3 - \frac{0.027}{6} = 0.2955$, and the true value is $0.29552$. Cosine gets the even powers: $\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots$.

For $\frac{1}{1 - x}$, the geometric series from the previous lesson is already a Taylor series: $1 + x + x^2 + \cdots$ for $|x| < 1$. Integrating the related series $\frac{1}{1 + x} = 1 - x + x^2 - \cdots$ term by term gives $\ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots$.

@fig taylor f="sin x" | Taylor polynomials of sin x of increasing degree hug the curve over a wider and wider range.

### Taylor series and power series
Letting the degree go to infinity gives the **Taylor series** $\sum_{n=0}^\infty\frac{f^{(n)}(a)}{n!}(x - a)^n$. More generally, any series of the form $\sum c_n(x - a)^n$ is called a **power series**. A power series converges in an interval centred at $a$: there is a **radius of convergence** $R$ such that it converges for $|x - a| < R$ and diverges for $|x - a| > R$. For $e^x$, $\sin x$ and $\cos x$, $R = \infty$: the series equals the function everywhere. For $\frac{1}{1 - x}$ and $\ln(1 + x)$, $R = 1$; no matter how many terms you add, the polynomials cannot follow $\ln(1 + x)$ beyond $x = 1$. The ratio test usually finds $R$.

:::def Radius of convergence
The number $R \ge 0$ (possibly $\infty$) such that a power series $\sum c_n(x - a)^n$ converges for $|x - a| < R$ and diverges for $|x - a| > R$.
:::

### How big is the error?
Taylor's theorem says the error after the degree-$n$ term is
$$R_n(x) = \frac{f^{(n+1)}(c)}{(n + 1)!}(x - a)^{n+1}$$
for some $c$ between $a$ and $x$. The factorial in the denominator grows extremely fast, which is why a few terms often suffice. For $\sin x$ at $x = 0.3$ using $x - \frac{x^3}{6}$, the next term is $\frac{x^5}{120}$, about $0.00000203$, so the approximation is accurate to about 6 decimal places.

### Working with series
Known series can be combined instead of recomputing derivatives. Substitute: replacing $x$ by $-x^2$ in $e^x$ gives $e^{-x^2} = 1 - x^2 + \frac{x^4}{2} - \cdots$. Multiply by constants or powers of $x$. Differentiate or integrate term by term inside the radius of convergence: differentiating the $\sin$ series gives the $\cos$ series, as it should. Integrating $e^{-x^2}$ term by term gives a series for an integral that has no elementary antiderivative, which is how values of the normal distribution's CDF are computed.

### Common mistakes
Forgetting the factorials is the most common error. Another is using a Taylor polynomial far from its centre and expecting accuracy; the approximation is local. Also, outside the radius of convergence the series is meaningless even though the function may be perfectly well defined (as $\ln(1 + x)$ is at $x = 3$). And remember that in trig series, $x$ must be in radians.

### Summary
A Taylor polynomial matches a function's value and first $n$ derivatives at a point, using coefficients $\frac{f^{(n)}(a)}{n!}$. Key series: $e^x = \sum\frac{x^n}{n!}$, $\sin x = \sum(-1)^n\frac{x^{2n+1}}{(2n+1)!}$, $\cos x = \sum(-1)^n\frac{x^{2n}}{(2n)!}$, $\frac{1}{1 - x} = \sum x^n$. Power series converge within a radius of convergence, and the remainder term bounds the error.

@viz taylor f="sin x" | Increase the degree: the polynomial hugs sin x over a wider window, but it always peels away eventually.

:::explore
**What to try**
1. With $\sin x$, set degree 1, then 3, 5, 7 and 9. Note how far from 0 each polynomial stays close.
2. Switch to $e^x$ and compare degree 2 with degree 6 at $x = 2$.
3. Switch to $\ln(1 + x)$ and push the degree to 15. Look beyond $x = 1$.

**What to notice:** each extra odd term extends the good region for $\sin x$; by degree 9 the polynomial tracks the wave over nearly $[-4, 4]$, because the factorials win eventually ($R = \infty$). For $\ln(1 + x)$, however, adding terms helps only inside $(-1, 1]$; beyond $x = 1$ the polynomials swing wildly. That is the radius of convergence $R = 1$.
:::

:::formulas
$$f(x) = \sum_{n=0}^\infty\frac{f^{(n)}(a)}{n!}(x - a)^n$$
$$e^x = \sum_{n=0}^\infty\frac{x^n}{n!} \qquad \sin x = \sum_{n=0}^\infty\frac{(-1)^nx^{2n+1}}{(2n+1)!} \qquad \cos x = \sum_{n=0}^\infty\frac{(-1)^nx^{2n}}{(2n)!}$$
$$\frac{1}{1 - x} = \sum_{n=0}^\infty x^n\ (|x| < 1) \qquad \ln(1 + x) = \sum_{n=1}^\infty\frac{(-1)^{n+1}x^n}{n}\ (-1 < x \le 1)$$
$$(1 + x)^k = 1 + kx + \frac{k(k - 1)}{2!}x^2 + \cdots\ (|x| < 1)$$
$$R_n(x) = \frac{f^{(n+1)}(c)}{(n + 1)!}(x - a)^{n+1}$$
$$f(x + h) \approx f(x) + f'(x)h + \tfrac12f''(x)h^2$$
:::

:::thm Taylor's theorem with remainder
If $f$ has $n + 1$ continuous derivatives on an interval containing $a$ and $x$, then $f(x) = p_n(x) + R_n(x)$ with $R_n(x) = \frac{f^{(n+1)}(c)}{(n+1)!}(x - a)^{n+1}$ for some $c$ between $a$ and $x$. In particular, if $|f^{(n+1)}| \le M$ there, $|R_n(x)| \le \frac{M|x - a|^{n+1}}{(n + 1)!}$.
:::

:::thm Convergence of the exponential series
For every real $x$, $\sum_{n=0}^\infty\frac{x^n}{n!}$ converges to $e^x$.
:::

:::proof
On the interval between 0 and $x$, every derivative of $e^t$ is at most $M = e^{|x|}$. Taylor's theorem gives $|e^x - p_n(x)| \le \frac{e^{|x|}|x|^{n+1}}{(n + 1)!}$. For fixed $x$, the factorial eventually dominates the power (each new factor $\frac{|x|}{n + 1}$ is less than $\frac12$ once $n + 1 > 2|x|$), so the bound tends to 0.
:::

:::steps Maclaurin polynomial of degree 3 for $f(x) = \sqrt{1 + x}$
1. $f = (1 + x)^{1/2}$; $f' = \frac12(1 + x)^{-1/2}$, $f'' = -\frac14(1 + x)^{-3/2}$, $f''' = \frac38(1 + x)^{-5/2}$.
2. At 0: $1, \frac12, -\frac14, \frac38$. Divide by $0!, 1!, 2!, 3!$: $1, \frac12, -\frac18, \frac{1}{16}$.
3. $p_3(x) = 1 + \frac x2 - \frac{x^2}{8} + \frac{x^3}{16}$. Check: $p_3(0.2) = 1.095500$ vs $\sqrt{1.2} = 1.095445$.
:::

:::steps Radius of convergence of $\sum\frac{x^n}{n\,2^n}$
1. Ratio test: $\left|\frac{x^{n+1}}{(n+1)2^{n+1}}\cdot\frac{n2^n}{x^n}\right| = \frac{|x|}{2}\cdot\frac{n}{n + 1}$.
2. The limit is $\frac{|x|}{2}$; convergence needs $\frac{|x|}{2} < 1$.
3. $R = 2$.
:::

:::steps Approximate $\int_0^1e^{-x^2}\,dx$ with a series
1. $e^{-x^2} = 1 - x^2 + \frac{x^4}{2} - \frac{x^6}{6} + \frac{x^8}{24} - \cdots$.
2. Integrate term by term from 0 to 1: $1 - \frac13 + \frac1{10} - \frac1{42} + \frac1{216} - \cdots$.
3. $\approx 1 - 0.3333 + 0.1 - 0.0238 + 0.0046 = 0.7475$ (true value $0.74682$; the alternating error is at most the next term, $\frac{1}{1320} \approx 0.0008$).
:::

:::mock Exam question
(a) Find the degree-2 Taylor polynomial of $f(x) = \ln x$ about $a = 1$. (b) Use it to estimate $\ln 1.1$. (c) Bound the error using the remainder term.
:::solution
(a) $f(1) = 0$, $f'(x) = \frac1x$ so $f'(1) = 1$, $f''(x) = -\frac{1}{x^2}$ so $f''(1) = -1$. $p_2(x) = (x - 1) - \frac{(x - 1)^2}{2}$. (b) $p_2(1.1) = 0.1 - 0.005 = 0.095$. (c) $f'''(x) = \frac{2}{x^3}$, at most 2 on $[1, 1.1]$, so $|R_2| \le \frac{2(0.1)^3}{3!} = \frac{0.002}{6} \approx 0.00033$. Indeed $\ln1.1 = 0.09531$, off by $0.00031$.
:::
:::

:::ml Taylor expansions behind optimization
Gradient descent is justified by the first-order expansion $L(\theta + \Delta) \approx L(\theta) + \nabla L^\top\Delta$: moving against the gradient lowers the loss for small steps. Newton's method uses the second-order expansion $L(\theta) + \nabla L^\top\Delta + \frac12\Delta^\top H\Delta$ and jumps to its minimum. The GELU activation is often computed with a tanh-based approximation, and the softmax/log-sum-exp trick, Laplace approximations and the delta method in statistics are all second-order Taylor expansions.
:::

:::cs How libraries compute sin, exp and log
Math libraries reduce the argument to a small range (for example, using $\sin(x + 2\pi) = \sin x$ and symmetry) and then evaluate a carefully tuned polynomial, often a minimax variant of the Taylor polynomial, using Horner's rule to minimize multiplications. Fewer than a dozen terms give full double-precision accuracy on the reduced range.
:::

:::real Small-angle physics and engineering
Engineers routinely use $\sin\theta \approx \theta$, $\cos\theta \approx 1 - \frac{\theta^2}{2}$ and $(1 + x)^k \approx 1 + kx$. Einstein's kinetic energy $mc^2\left(\frac{1}{\sqrt{1 - v^2/c^2}} - 1\right)$ expands to $\frac12mv^2 + \cdots$: Newton's formula is the first Taylor term of relativity, accurate whenever $v$ is much smaller than the speed of light.
:::

:::quiz
? The coefficient of $x^3$ in the Maclaurin series of $e^x$ is...
= 1/6|0.1667
> $\frac{1}{3!}$.

? The Maclaurin series of $\sin x$ contains...
+ only odd powers of $x$
- only even powers of $x$
- all powers of $x$
> $\sin$ is odd; even derivatives vanish at 0.

? Using $1 - \frac{x^2}{2}$, estimate $\cos(0.2)$.
= 0.98
> $1 - 0.02$. (True value $0.98007$.)

? The radius of convergence of $\sum x^n$ is...
= 1
> The geometric series needs $|x| < 1$.

? The degree-1 Taylor polynomial of $f$ at $a$ is...
+ the tangent line
- the secant line
- the normal line
> It matches value and slope.

? The coefficient of $x^2$ in the Maclaurin series of $\cos x$ is...
= -1/2|-0.5
> $-\frac{1}{2!}$.
:::

# Unit: Differential equations

## Lesson: Differential equations {#diff-eq}
@summary: Equations involving derivatives: separable equations, exponential growth and decay, slope fields, Euler's method, and the logistic model.

### Equations about change
Most laws of nature are not formulas for a quantity but rules for how it changes. "The rate of cooling is proportional to the temperature difference." "The growth rate of a population is proportional to its size." "Acceleration equals force divided by mass." Each of these is a **differential equation**: an equation relating an unknown function to its derivatives. Solving one means finding the function. Differential equations describe populations, epidemics, circuits, chemical reactions, and, in machine learning, the continuous-time limit of gradient descent and the dynamics behind diffusion models.

### An everyday scenario
A cup of coffee at 90°C sits in a 20°C room. It cools quickly at first and more slowly as it approaches room temperature. Newton's law of cooling says the rate of change of temperature $T$ is proportional to the difference from the room: $\frac{dT}{dt} = -k(T - 20)$. Without knowing $T(t)$ yet, this already tells us a lot: when $T$ is far above 20, the derivative is very negative (fast cooling); when $T$ is near 20, the derivative is near 0.

### Vocabulary
A differential equation (DE) involving only derivatives with respect to one variable is an **ordinary differential equation (ODE)**. Its **order** is the highest derivative that appears: $y' = 2y$ is first order, $y'' = -y$ is second order. A **solution** is a function that makes the equation true. Usually a DE has infinitely many solutions, a family with arbitrary constants, and an **initial condition** like $y(0) = 3$ picks out one of them. An equation plus an initial condition is an **initial value problem (IVP)**.

:::def Differential equation
An equation relating an unknown function to one or more of its derivatives, such as $y' = ky$. A solution is a function satisfying it; an initial condition $y(t_0) = y_0$ selects one solution from the family.
:::

### Checking a solution
You can verify a proposed solution without knowing how it was found: just substitute. Is $y = 3e^{2t}$ a solution of $y' = 2y$? Its derivative is $6e^{2t}$, and $2y = 6e^{2t}$. Yes. And $y(0) = 3$, so it solves the IVP $y' = 2y$, $y(0) = 3$. Is $y = \sin t$ a solution of $y'' = -y$? $y'' = -\sin t = -y$. Yes.

### Exponential growth and decay
The simplest and most important DE is $y' = ky$: the rate of change is proportional to the current amount. Its solution is
$$y(t) = y_0e^{kt}.$$
For $k > 0$ this is exponential growth (bacteria, compound interest, early epidemics); for $k < 0$, exponential decay (radioactivity, drug elimination). The **doubling time** is $\frac{\ln2}{k}$ and the **half-life** is $\frac{\ln 2}{|k|}$. If a culture grows with $k = 0.5$ per hour from 100 cells, after 4 hours there are $100e^{2} \approx 739$ cells.

### Separation of variables
Many first-order equations can be written as $\frac{dy}{dx} = g(x)h(y)$. Treat $dy$ and $dx$ like differentials: move all the $y$'s to one side and the $x$'s to the other, then integrate both sides:
$$\int\frac{dy}{h(y)} = \int g(x)\,dx.$$
For $y' = ky$: $\int\frac{dy}{y} = \int k\,dt$, so $\ln|y| = kt + C$, and exponentiating gives $y = Ae^{kt}$. For Newton's cooling, let $u = T - 20$; then $u' = -ku$, so $u = u_0e^{-kt}$ and $T(t) = 20 + 70e^{-kt}$. If after 10 minutes the coffee is at 55°C, then $35 = 70e^{-10k}$, $k = \frac{\ln2}{10} \approx 0.069$ per minute: the temperature difference halves every 10 minutes.

:::def Separable equation
A first-order ODE that can be written $\frac{dy}{dx} = g(x)h(y)$, solved by integrating $\int\frac{dy}{h(y)} = \int g(x)\,dx$.
:::

### Slope fields
Even when we cannot solve a DE, we can picture it. The equation $y' = f(x, y)$ tells us the slope of the solution curve at every point. Drawing a short line segment with that slope at many grid points gives a **slope field**. Solution curves are the curves that follow the segments, like a leaf floating on a stream. Equilibrium solutions, where $y' = 0$ for all $x$, show up as horizontal rows of flat segments.

### Euler's method
To compute a solution numerically, start at $(x_0, y_0)$, walk a small step $h$ along the current slope, recompute the slope, and repeat:
$$y_{n+1} = y_n + h\,f(x_n, y_n).$$
This is the linearization from earlier in the course, used over and over. For $y' = y$, $y(0) = 1$ with $h = 0.5$: $y_1 = 1 + 0.5(1) = 1.5$, $y_2 = 1.5 + 0.5(1.5) = 2.25$. The true value $y(1) = e \approx 2.718$, so Euler underestimates here; halving $h$ roughly halves the error.

### The logistic equation
Pure exponential growth cannot last: resources run out. The **logistic equation** $y' = ry\left(1 - \frac yK\right)$ behaves like exponential growth when $y$ is small but slows to zero as $y$ approaches the **carrying capacity** $K$. It has two equilibria: $y = 0$ (unstable) and $y = K$ (stable). Its S-shaped solutions grow fastest at $y = \frac K2$, the inflection point.

### Common mistakes
Forgetting the constant of integration when separating variables loses the whole family of solutions. Dividing by $h(y)$ can lose equilibrium solutions such as $y = 0$; check them separately. In Euler's method, use the slope at the *current* point, not the next one. And remember that a large step size can make Euler's method wildly inaccurate or even unstable.

### Summary
A differential equation relates a function to its derivatives; an initial condition picks one solution. $y' = ky$ gives $y = y_0e^{kt}$. Separable equations are solved by integrating both sides. Slope fields show solutions graphically, Euler's method computes them numerically, and the logistic equation models growth with a limit.

@viz g04-slope-field ode=growth y0=1 h=0.5 xend=4 | The slope field of an ODE. Drag the starting point; the orange Euler path is compared with the true green solution.

:::explore
**What to try**
1. With $y' = 0.5y$ and $h = 0.5$, read Euler's estimate and the true value at the end. Then reduce $h$ to 0.1 and to 0.05.
2. Switch to the logistic equation and drag the starting point to $y = 0.3$, then to $y = 5$.
3. Switch to cooling and start above and below the equilibrium $y = 1$.
4. Increase $h$ to 1.5 with the decay equation $y' = -y$.

**What to notice:** Euler's error shrinks roughly in proportion to $h$, as the article predicted. Logistic solutions starting below 4 rise in an S-shape and level off at the carrying capacity $K = 4$; starting above 4 they decay down to it. Cooling solutions approach 1 from either side, the exponential approach of Newton's law. With $h = 1.5$ on $y' = -y$, Euler overshoots and oscillates, showing why step sizes, like learning rates, must be small enough.
:::

:::formulas
$$y' = ky \Rightarrow y = y_0e^{kt} \qquad t_{\text{double}} = \frac{\ln2}{k} \qquad t_{1/2} = \frac{\ln2}{|k|}$$
$$\frac{dy}{dx} = g(x)h(y) \Rightarrow \int\frac{dy}{h(y)} = \int g(x)\,dx$$
$$T' = -k(T - T_{\text{env}}) \Rightarrow T(t) = T_{\text{env}} + (T_0 - T_{\text{env}})e^{-kt}$$
$$y' = ry\left(1 - \frac yK\right) \Rightarrow y(t) = \frac{K}{1 + Ae^{-rt}},\ A = \frac{K - y_0}{y_0}$$
$$y_{n+1} = y_n + h\,f(x_n, y_n) \text{ (Euler)}$$
$$y'' = -\omega^2y \Rightarrow y = c_1\cos\omega t + c_2\sin\omega t$$
:::

:::thm Uniqueness of exponential solutions
Every solution of $y' = ky$ on an interval has the form $y = Ce^{kt}$ for a constant $C$.
:::

:::proof
Let $y$ be any solution and set $u(t) = y(t)e^{-kt}$. By the product rule, $u' = y'e^{-kt} - kye^{-kt} = (ky - ky)e^{-kt} = 0$. A function with zero derivative on an interval is constant (mean value theorem), so $u = C$ and $y = Ce^{kt}$.
:::

:::thm Existence and uniqueness (Picard–Lindelöf)
If $f(x, y)$ and $\frac{\partial f}{\partial y}$ are continuous near $(x_0, y_0)$, the IVP $y' = f(x, y)$, $y(x_0) = y_0$ has exactly one solution on some interval around $x_0$. Geometrically, solution curves in a slope field never cross.
:::

:::steps Solve $y' = xy$, $y(0) = 2$
1. Separate: $\frac{dy}{y} = x\,dx$.
2. Integrate: $\ln|y| = \frac{x^2}{2} + C$, so $y = Ae^{x^2/2}$.
3. $y(0) = A = 2$: $y = 2e^{x^2/2}$. Check: $y' = 2xe^{x^2/2} = xy$.
:::

:::steps Carbon-14 dating
1. Carbon-14 has half-life 5730 years, so $k = -\frac{\ln2}{5730}$ and $N = N_0e^{kt}$.
2. A sample has 25% of its original carbon-14: $0.25 = e^{kt}$, i.e. two half-lives.
3. $t = 2\times5730 = 11460$ years.
:::

:::steps Two Euler steps for $y' = x + y$, $y(0) = 1$, $h = 0.1$
1. $y_1 = 1 + 0.1(0 + 1) = 1.1$ at $x = 0.1$.
2. $y_2 = 1.1 + 0.1(0.1 + 1.1) = 1.22$ at $x = 0.2$.
3. The exact solution $y = 2e^x - x - 1$ gives $y(0.2) = 1.2428$; Euler underestimates because solutions curve upward.
:::

:::mock Exam question
A population follows $P' = 0.4P\left(1 - \frac{P}{1000}\right)$ with $P(0) = 100$. (a) Identify the equilibria and their stability. (b) At what population is growth fastest, and what is that growth rate? (c) Write the solution $P(t)$.
:::solution
(a) $P' = 0$ at $P = 0$ and $P = 1000$. For $0 < P < 1000$, $P' > 0$, so solutions move away from 0 and toward 1000: 0 is unstable, 1000 stable. (b) $P' = 0.4P - 0.0004P^2$ is a downward parabola in $P$ with maximum at $P = 500$, where $P' = 0.4(500)(0.5) = 100$ per unit time. (c) $A = \frac{1000 - 100}{100} = 9$, so $P(t) = \frac{1000}{1 + 9e^{-0.4t}}$.
:::
:::

:::ml Gradient flow and neural ODEs
Gradient descent $\theta_{n+1} = \theta_n - \eta\nabla L(\theta_n)$ is exactly Euler's method with step $\eta$ for the ODE $\theta'(t) = -\nabla L(\theta)$, called gradient flow. Too large a learning rate makes gradient descent oscillate or diverge, just as too large an Euler step does. A residual network layer $x_{k+1} = x_k + f(x_k)$ is also an Euler step, which inspired neural ODEs, and diffusion models generate images by numerically solving a learned differential equation backwards in time.
:::

:::cs Numerical ODE solvers
Simulations in physics engines, circuit simulators and epidemiological models rely on ODE solvers. Euler's method is simple but inaccurate; Runge–Kutta methods (RK4) sample the slope several times per step and are far more accurate, and adaptive solvers change $h$ automatically. Stiff equations require implicit methods to stay stable.
:::

:::real Epidemic and drug models
The SIR epidemic model is a system of differential equations for susceptible, infected and recovered people; its early phase is exponential growth with rate depending on $R_0$. In pharmacology, a drug eliminated at a rate proportional to its concentration follows $C' = -kC$, so doctors use the half-life $\frac{\ln2}{k}$ to space doses.
:::

:::quiz
? The general solution of $y' = 3y$ is...
+ $y = Ce^{3t}$
- $y = 3e^{t} + C$
- $y = Ce^{t/3}$
> $y' = ky$ gives $Ce^{kt}$.

? If $y' = -0.5y$ and $y(0) = 8$, what is $y$ at the half-life $t = 2\ln 2$?
= 4
> One half-life halves the amount.

? One Euler step for $y' = y$, $y(0) = 2$, with $h = 0.1$ gives $y_1$ =
= 2.2
> $2 + 0.1\cdot2$.

? For the logistic equation $y' = 2y(1 - y/10)$, the carrying capacity is...
= 10
> The stable equilibrium $y = K$.

? What is the order of $y'' + 3y' + 2y = 0$?
= 2
> The highest derivative is the second.

? Which is a solution of $y'' = -y$?
+ $y = \cos t$
- $y = e^t$
- $y = t^2$
> $(\cos t)'' = -\cos t$.
:::
