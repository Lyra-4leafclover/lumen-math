---
id: precalc
title: Functions & Precalculus
tagline: Functions, graphs, trigonometry, complex numbers and sequences — the language calculus is written in.
desc: Learn to think in functions. You'll transform graphs, compose and invert functions, master exponentials and logs as functions, build trigonometry from the unit circle, meet complex numbers and Euler's formula, and work with sequences and series.
color: #ec4899
symbol: f(x)
area: Foundations
paths: ml, cs
order: 2
---

# Unit: Functions

## Lesson: What is a function? {#functions}
@summary: Inputs, outputs, domain, range, function notation, the vertical line test, and even and odd symmetry.

### Why functions are the language of everything after algebra
Almost every sentence in science and engineering has the shape "this depends on that". The price of a taxi ride depends on the distance. The temperature of your tea depends on how long it has been sitting. The prediction a spam filter makes depends on the words in the email. A **function** is the mathematical way of writing down "depends on" precisely, so that we can calculate with it, draw it, combine it with other dependencies, and eventually (in calculus) ask how fast it changes.

In algebra you mostly solved equations: find the one number $x$ that makes $2x + 3 = 11$ true. In precalculus the point of view shifts. Instead of hunting for one special number, we look at a whole rule that turns *every* allowed input into an output, and we study the rule itself: where it is defined, what values it can produce, what its graph looks like, and how it behaves as the input changes. That shift is the single most important idea in this course.

### An everyday picture: the vending machine
Imagine a vending machine with numbered buttons. Press button 3 and you get a bag of crisps. Press button 7 and you get a bottle of water. A working machine has one essential property: every time you press button 3, you get crisps. It never gives you crisps on Monday and chocolate on Tuesday for the same button, and it never drops two different items at once.

That is exactly what a function is. The buttons are the **inputs**, the snacks are the **outputs**, and the rule is "each input produces exactly one output". Notice what is allowed: two different buttons may give the same snack (buttons 3 and 4 might both be crisps). What is *not* allowed is one button giving two different things. Some buttons might be broken or missing; those are inputs that are simply not in the machine's list of allowed inputs.

### The definition
:::def Function
A rule $f: A \to B$ that assigns to every element $x$ of the set $A$ exactly one element $f(x)$ of the set $B$. $A$ is the **domain** (allowed inputs) and $B$ is the **codomain** (where outputs live).
:::

:::def Range
The set of outputs a function actually produces, $\{f(x) : x \in A\}$. It is always a subset of the codomain, and may be smaller than it. Also called the **image**.
:::

The notation $f: \mathbb{R} \to \mathbb{R}$ is read "$f$ maps real numbers to real numbers". The symbol $f(x)$ is read "$f$ of $x$" and means "the output of $f$ when the input is $x$". It does **not** mean $f$ times $x$. The letter $x$ is just a placeholder: $f(x) = x^2$, $f(t) = t^2$ and $f(\text{banana}) = \text{banana}^2$ all describe the same squaring rule.

### Evaluating a function step by step
To evaluate, replace every copy of the input variable with the given value, using brackets to be safe. Take $f(x) = 2x^2 - 3x + 1$.

To find $f(2)$: $2(2)^2 - 3(2) + 1 = 8 - 6 + 1 = 3$.

To find $f(-1)$: $2(-1)^2 - 3(-1) + 1 = 2 + 3 + 1 = 6$. The brackets matter here. Without them you might write $-1^2 = -1$ and get the wrong answer.

You can also feed in an expression. For $f(a + 1)$, replace $x$ by $(a + 1)$ everywhere: $2(a+1)^2 - 3(a+1) + 1 = 2a^2 + 4a + 2 - 3a - 3 + 1 = 2a^2 + a$. This skill matters later, when calculus asks for $f(x + h)$.

### Four ways to describe the same function
One rule can be shown in four ways, and fluent mathematicians move between them constantly.

**In words:** "square the input and add one". **As a formula:** $f(x) = x^2 + 1$. **As a table:** inputs $-2, -1, 0, 1, 2$ give outputs $5, 2, 1, 2, 5$. **As a graph:** the set of all points $(x, f(x))$ drawn in the plane, here a U-shaped curve with its lowest point at $(0, 1)$.

The graph is the most powerful view because it shows the whole function at once. Height above the $x$-axis is the output. Reading the graph at $x = 2$ means going to $x = 2$ on the horizontal axis and moving up until you hit the curve.

@fig func kind=quadratic a=1 h=0 k=1 | The graph of f(x) = x² + 1. Every point on the curve is a pair (input, output).

### Domain: what you are allowed to feed in
When a function is given only as a formula, its **natural domain** is every real number for which the formula makes sense. Three things can make a formula break, and checking for them finds almost every restriction.

First, **division by zero**. In $f(x) = \frac{1}{x - 4}$, the input $x = 4$ makes the denominator zero, so the domain is all reals except 4.

Second, **even roots of negative numbers**. In $g(x) = \sqrt{x + 2}$, we need $x + 2 \ge 0$, so $x \ge -2$.

Third, **logarithms of zero or negative numbers**. In $h(x) = \ln(5 - x)$, we need $5 - x > 0$, so $x < 5$.

When several restrictions appear, all of them must hold at once. For $k(x) = \frac{\sqrt{x}}{x - 1}$ we need $x \ge 0$ and $x \ne 1$.

### Interval notation
Domains and ranges are usually sets of real numbers, written with **interval notation**. A square bracket means the endpoint is included and a round bracket means it is excluded. So $[2, 5]$ means $2 \le x \le 5$, $(2, 5)$ means $2 < x < 5$, and $[2, 5)$ means $2 \le x < 5$. Infinity always gets a round bracket, because it is not a number you can actually reach: $x \ge -2$ is $[-2, \infty)$. To join two pieces we use the union symbol: "all reals except 4" is $(-\infty, 4) \cup (4, \infty)$.

### Range: what comes out
Finding the range is often harder than finding the domain, and the graph helps most. For $f(x) = x^2 + 1$, the square $x^2$ is never negative, so $x^2 + 1 \ge 1$, and every value from 1 upward is reached (to get output 10, use $x = 3$). The range is $[1, \infty)$, even though the codomain was all of $\mathbb{R}$.

### The vertical line test
How can you tell from a picture whether a curve is the graph of a function? A vertical line $x = c$ collects every point with input $c$. If such a line hits the curve twice, the input $c$ has two outputs, which breaks the rule. So a curve is the graph of a function exactly when **every vertical line meets it at most once**. A parabola opening upward passes. A circle fails, because the line $x = 0$ meets the circle $x^2 + y^2 = 1$ at both $(0, 1)$ and $(0, -1)$.

### Even and odd functions
Some functions have a mirror symmetry that saves work. A function is **even** if $f(-x) = f(x)$ for every $x$: flipping the input's sign changes nothing, so the graph is symmetric about the $y$-axis. Examples are $x^2$, $x^4$, $|x|$ and $\cos x$. A function is **odd** if $f(-x) = -f(x)$: flipping the input flips the output, so the graph looks the same after a half-turn about the origin. Examples are $x$, $x^3$ and $\sin x$. Most functions, like $x^2 + x$, are neither.

To test, compute $f(-x)$ and simplify. For $f(x) = x^3 - 4x$, we get $f(-x) = -x^3 + 4x = -(x^3 - 4x) = -f(x)$, so it is odd.

:::def Even and odd functions
$f$ is **even** if $f(-x) = f(x)$ for all $x$ in the domain (symmetric about the $y$-axis), and **odd** if $f(-x) = -f(x)$ (symmetric about the origin).
:::

### Common mistakes
:::warn Watch out
- $f(x)$ is not multiplication. $f(2 + 3)$ is $f(5)$, not $f(2) + f(3)$ in general. For $f(x) = x^2$, $f(5) = 25$ but $f(2) + f(3) = 13$.
- Forgetting brackets when substituting negatives: for $f(x) = x^2$, $f(-3) = (-3)^2 = 9$, not $-9$.
- Mixing up range and codomain. The codomain is where outputs are allowed to live; the range is what actually comes out.
- Thinking "two inputs share an output" breaks the definition. It does not. Only one input with two outputs does.
:::

### Summary
A function is a rule that gives each allowed input exactly one output. Its domain is the set of allowed inputs, found by avoiding division by zero, even roots of negatives and logs of non-positive numbers. Its range is the set of outputs it actually produces. A graph shows a function when every vertical line hits it at most once, and even and odd functions have mirror and half-turn symmetry. Every later lesson, from transformations to trigonometry, builds on this one idea.

@viz func kind=power n=2 | Change the exponent n. Every vertical line still meets the curve at most once, so each curve is a function.

:::explore
**What to try**
1. Leave $n = 2$ and imagine sliding a vertical line across the graph. Count how many times it meets the curve.
2. Set $n = 3$. Check that the curve is odd: the point at $x = 1$ has height 1, the point at $x = -1$ has height $-1$.
3. Set $n = 4$ and then $n = 2$ again and compare: both are even, mirror images across the $y$-axis.
4. Set $n = -1$. Look at what happens at $x = 0$: there is no point at all.
5. Set $n = 0.5$ (the square root). Notice the graph only exists for $x \ge 0$.

**What to notice:** the shape of the graph tells you the domain (where the curve exists left to right) and the range (which heights it reaches). $n = -1$ shows the "division by zero" domain killer and $n = 0.5$ shows the "even root of a negative" killer from the article. Even powers give $y$-axis symmetry and odd powers give origin symmetry.
:::

:::formulas
$$f: A \to B,\quad x \mapsto f(x)\ \text{(exactly one output per input)}$$
$$\text{range}(f) = \{f(x) : x \in A\} \subseteq B$$
$$\text{even: } f(-x) = f(x) \qquad \text{odd: } f(-x) = -f(x)$$
:::

:::thm Vertical line test
A set of points in the plane is the graph of a function of $x$ if and only if every vertical line meets it in at most one point.
:::

:::proof Why the vertical line test works
The vertical line $x = c$ contains exactly the points whose input is $c$. If it meets the set at $(c, y_1)$ and $(c, y_2)$ with $y_1 \ne y_2$, then the input $c$ has two outputs, so the set is not a function. Conversely, if every such line meets the set at most once, each input $c$ has at most one output, which is exactly the definition (the inputs that do get a point form the domain).
:::

:::steps Find the domain of $g(x) = \dfrac{\sqrt{x - 1}}{x - 3}$
1. The square root needs a non-negative inside: $x - 1 \ge 0$, so $x \ge 1$.
2. The denominator cannot be zero: $x - 3 \ne 0$, so $x \ne 3$.
3. Both must hold: $x \ge 1$ and $x \ne 3$.
4. In interval notation: $[1, 3) \cup (3, \infty)$.
:::

:::steps For $f(x) = x^2 - 2x$, find $f(3)$, $f(-1)$ and $f(x + h) - f(x)$
1. $f(3) = 9 - 6 = 3$.
2. $f(-1) = (-1)^2 - 2(-1) = 1 + 2 = 3$. Two inputs share the output 3, which is allowed.
3. $f(x + h) = (x + h)^2 - 2(x + h) = x^2 + 2xh + h^2 - 2x - 2h$.
4. Subtract $f(x) = x^2 - 2x$: $f(x + h) - f(x) = 2xh + h^2 - 2h$.
:::

:::steps Decide whether $f(x) = \dfrac{x}{x^2 + 1}$ is even, odd or neither
1. Compute $f(-x) = \dfrac{-x}{(-x)^2 + 1} = \dfrac{-x}{x^2 + 1}$.
2. Compare with $-f(x) = -\dfrac{x}{x^2 + 1}$. They are equal.
3. So $f$ is odd: its graph is unchanged by a half-turn about the origin.
:::

:::mock Exam question
Let $f(x) = \sqrt{9 - x^2}$. (a) Find the domain. (b) Find the range. (c) Is $f$ even, odd or neither?
:::solution
(a) Need $9 - x^2 \ge 0$, so $x^2 \le 9$, giving $-3 \le x \le 3$: domain $[-3, 3]$.
(b) Inside the root, $9 - x^2$ ranges from 0 (at $x = \pm3$) to 9 (at $x = 0$). Square roots of $[0, 9]$ give $[0, 3]$. Range $[0, 3]$. (The graph is the top half of the circle of radius 3.)
(c) $f(-x) = \sqrt{9 - (-x)^2} = \sqrt{9 - x^2} = f(x)$, so $f$ is even.
:::
:::

:::ml
A trained model *is* a function. A digit classifier is $f: \mathbb{R}^{784} \to \{0, 1, \dots, 9\}$: it takes the 784 pixel brightnesses of a $28 \times 28$ image and returns one digit. "Exactly one output per input" is why the same image always gets the same prediction. The model's domain matters too: feed it a $32 \times 32$ image and it fails, just like plugging $x = 4$ into $\frac{1}{x - 4}$.
:::

:::cs
In programming, a **pure function** is the same idea: same input, same output, no side effects. A lookup table or dictionary is a function given as a table. Type signatures like `int -> bool` are domain and codomain written in code.
:::

:::real
A taxi fare of $\$3$ plus $\$2$ per kilometre is the function $F(d) = 3 + 2d$. Its domain is $d \ge 0$ (you cannot drive negative distance), and its range is $[3, \infty)$: the cheapest possible ride costs $\$3$. A 5 km ride costs $F(5) = 13$ dollars.
:::

:::quiz
? What is the domain of $f(x) = \ln(5 - x)$?
- $x > 5$
+ $x < 5$
- $x \le 5$
- all real numbers
> The log needs a positive input: $5 - x > 0$ gives $x < 5$.

? If $f(x) = 2x^2 - 1$, what is $f(-2)$?
= 7
> $2 \cdot (-2)^2 - 1 = 2 \cdot 4 - 1 = 7$.

? Is $f(x) = x^3 + x$ even, odd, or neither?
- Even
+ Odd
- Neither
> $f(-x) = -x^3 - x = -(x^3 + x) = -f(x)$.

? Which of these is NOT the graph of a function of $x$?
- A straight line $y = 3x - 1$
- The parabola $y = x^2$
+ The circle $x^2 + y^2 = 4$
- The curve $y = \sqrt{x}$
> The vertical line $x = 0$ meets the circle at $(0, 2)$ and $(0, -2)$, so it fails the vertical line test.

? What is the smallest number in the range of $f(x) = x^2 + 4$?
= 4
> $x^2 \ge 0$, so $x^2 + 4 \ge 4$, with equality at $x = 0$.

? Which interval describes $-1 < x \le 6$?
- $[-1, 6]$
+ $(-1, 6]$
- $[-1, 6)$
- $(-1, 6)$
> Round bracket for the excluded endpoint $-1$, square bracket for the included endpoint 6.
:::

## Lesson: Piecewise functions, absolute value and ReLU {#piecewise}
@summary: Functions built from different rules on different intervals: absolute value, step functions, floor and ceiling, clipping, and the ReLU at the heart of neural networks.

### When one formula is not enough
Many real rules change their behaviour at certain thresholds. A phone plan might charge a flat $\$20$ for the first 5 GB of data and then $\$4$ for every extra gigabyte. A parking garage charges $\$2$ per started hour. Income tax uses brackets: one rate up to a limit, a higher rate above it. A thermostat turns the heater fully on below 19 degrees and fully off above it. None of these is described by a single tidy formula like $3x + 1$. Each is described by **several formulas, each in charge of its own range of inputs**. Such a function is called **piecewise**.

Piecewise functions are not an exotic extra. The most widely used function in modern deep learning, the ReLU, is piecewise. So are absolute value, rounding, clipping a value into a range, and every "if-else" statement in a program that returns a number. Learning to read, evaluate and graph them is a practical skill you will use constantly.

### Reading piecewise notation
A piecewise function is written with a big left brace, a list of rules, and a condition for each rule:
$$f(x) = \begin{cases} x + 2 & \text{if } x < 0 \\ 3 & \text{if } 0 \le x \le 2 \\ 7 - 2x & \text{if } x > 2 \end{cases}$$
Read it like a decision procedure. Given an input, look down the list of conditions, find the one that is true, and use only that rule. The conditions must not overlap, otherwise one input could get two outputs and $f$ would not be a function. Usually they also cover every allowed input, with no gaps.

Let's evaluate. For $x = -5$: the first condition $x < 0$ is true, so $f(-5) = -5 + 2 = -3$. For $x = 1$: the middle condition holds, so $f(1) = 3$. For $x = 4$: the last condition holds, so $f(4) = 7 - 8 = -1$. The boundary points need care. At $x = 0$, the first condition $0 < 0$ is false and the second $0 \le 0 \le 2$ is true, so $f(0) = 3$. At $x = 2$, the middle condition includes 2, so $f(2)$ uses the middle rule and equals 3. The last rule would also give $7 - 4 = 3$, so here the two agree, but often they do not, and then the inequality signs decide.

:::def Piecewise function
A function defined by different formulas on different, non-overlapping parts of its domain. To evaluate it, find the part that contains the input and apply only that part's formula.
:::

### Graphing a piece at a time
To graph a piecewise function, graph each rule only over its own interval and erase the rest. For the example above, draw the line $y = x + 2$ but only to the left of $x = 0$; draw the flat line $y = 3$ between $x = 0$ and $x = 2$; draw the line $y = 7 - 2x$ only to the right of $x = 2$.

Endpoints are marked with a convention you should learn: a **filled dot** means the endpoint is included and a **hollow (open) dot** means it is excluded. At $x = 0$ the first piece approaches height 2 but does not include $x = 0$, so it ends in a hollow dot at $(0, 2)$; the middle piece starts with a filled dot at $(0, 3)$. The graph has a **jump** there. At $x = 2$, the middle piece ends at height 3 and the last piece starts at height $7 - 4 = 3$, so the two pieces meet and there is no jump. A piecewise function whose pieces meet at every boundary has an unbroken graph; we call it **continuous** (calculus makes this precise).

### Absolute value as a piecewise function
You know $|x|$ as "distance from zero": $|5| = 5$ and $|-5| = 5$. As a piecewise function,
$$|x| = \begin{cases} -x & \text{if } x < 0 \\ x & \text{if } x \ge 0 \end{cases}$$
The rule "$-x$" for negative $x$ often confuses beginners, because it looks negative. But if $x = -5$ then $-x = -(-5) = 5$, which is positive. The graph is a V with its corner at the origin: slope $-1$ on the left, slope $1$ on the right.

This way of writing it makes absolute value equations mechanical. To solve $|2x - 1| = 7$, split into the two cases $2x - 1 = 7$ (giving $x = 4$) and $2x - 1 = -7$ (giving $x = -3$).

### ReLU and its relatives
The **rectified linear unit** is
$$\operatorname{ReLU}(x) = \max(0, x) = \begin{cases} 0 & \text{if } x < 0 \\ x & \text{if } x \ge 0 \end{cases}$$
It passes positive inputs through unchanged and replaces negative inputs with zero: $\operatorname{ReLU}(3) = 3$, $\operatorname{ReLU}(-2) = 0$, $\operatorname{ReLU}(0) = 0$. Its graph is flat along the negative axis and then rises at 45 degrees. That bend at the origin is the whole point: stacking many bent lines lets a neural network build curves of any shape, something straight lines alone can never do.

A common variation is the **leaky ReLU**, which uses a small slope $\alpha$ (such as $0.01$) instead of zero on the left: $\alpha x$ for $x < 0$ and $x$ for $x \ge 0$. With $\alpha = 0.1$, the input $-2$ gives $-0.2$ instead of $0$.

:::def ReLU
The function $\operatorname{ReLU}(x) = \max(0, x)$: zero for negative inputs and the identity for non-negative inputs. The most common activation function in neural networks.
:::

### Step functions, floor and ceiling
A **step function** is constant on intervals and jumps between them, so its graph looks like a staircase. The simplest is the **Heaviside step** $H(x)$, equal to 0 for $x < 0$ and 1 for $x \ge 0$: an on/off switch. The **sign function** returns $-1$, $0$ or $1$ depending on whether $x$ is negative, zero or positive.

The **floor** $\lfloor x \rfloor$ is the largest integer less than or equal to $x$, and the **ceiling** $\lceil x \rceil$ is the smallest integer greater than or equal to $x$. So $\lfloor 3.7 \rfloor = 3$, $\lceil 3.2 \rceil = 4$ and $\lfloor 5 \rfloor = \lceil 5 \rceil = 5$. Be careful with negatives: $\lfloor -2.3 \rfloor = -3$, because $-3$ is the largest integer that is not bigger than $-2.3$. As piecewise functions they have infinitely many pieces, one per integer: $\lfloor x \rfloor = n$ for $n \le x < n + 1$. Their graphs are staircases of short flat segments, each with a filled dot at one end and a hollow dot at the other.

Ceilings appear whenever you count things that come only in whole units. If a garage charges $\$2$ per started hour, then $3.25$ hours costs $2\lceil 3.25 \rceil = 2 \cdot 4 = 8$ dollars.

### Clipping
**Clipping** (or clamping) forces a value into a range $[a, b]$: values below $a$ become $a$, values above $b$ become $b$, and values in between are left alone. Clipping to $[-1, 1]$ sends $0.4$ to $0.4$, $3$ to $1$ and $-7$ to $-1$. In formula form, $\operatorname{clip}(x) = \min(b, \max(a, x))$, a composition of two piecewise functions.

### Common mistakes
:::warn Watch out
- Using the wrong piece at a boundary. Always check which condition uses $\le$ or $\ge$; that piece owns the boundary point.
- Overlapping conditions, such as $x \le 2$ in one piece and $x \ge 2$ in the next with different values at 2. That gives $x = 2$ two outputs, so it is not a function.
- Reading the "$-x$" in $|x|$ as "negative". For negative $x$, $-x$ is positive.
- $\lfloor -2.3 \rfloor$ is $-3$, not $-2$. Floor always rounds toward $-\infty$, not toward zero.
:::

:::tip Graph the pieces lightly first
Sketch each formula as a full faint line or curve, then darken only the part inside its interval and add filled or hollow dots at the ends. This avoids almost every graphing error.
:::

### Summary
A piecewise function uses different formulas on different intervals. Evaluate it by finding the interval that contains the input; graph it by drawing each piece only on its interval, with filled dots for included endpoints and hollow dots for excluded ones. Absolute value, ReLU, step functions, floor, ceiling and clipping are all piecewise, and they show up everywhere from tax tables to neural networks.

@viz g02-piecewise fn=relu x=1.5 | Choose a function and move x. The readout tells you which rule is active.

:::explore
**What to try**
1. With ReLU selected, slide $x$ from positive to negative. Watch the output stick at 0 once $x < 0$.
2. Switch to Leaky ReLU and move the $\alpha$ slider between 0 and 0.5. The left half tilts; $\alpha = 0$ gives back the plain ReLU.
3. Choose floor, then set $x = -2.3$. Confirm the output is $-3$, not $-2$.
4. Compare floor and ceiling at an integer such as $x = 2$. Look at which end of each step has the filled dot.
5. Choose "Shipping cost by weight" and find the weight where the price stops rising.

**What to notice:** the readout always names exactly one active rule, which is the "one output per input" rule from the article. Filled and hollow dots tell you which piece owns each boundary. ReLU and absolute value have a corner but no jump; the step, sign, floor and ceiling functions have jumps.
:::

:::formulas
$$|x| = \begin{cases} -x & x < 0 \\ x & x \ge 0 \end{cases} \qquad \operatorname{ReLU}(x) = \max(0, x)$$
$$\lfloor x \rfloor = n \iff n \le x < n + 1 \qquad \lceil x \rceil = n \iff n - 1 < x \le n$$
$$\operatorname{clip}_{[a,b]}(x) = \min(b, \max(a, x)) \qquad |x| = \operatorname{ReLU}(x) + \operatorname{ReLU}(-x)$$
:::

:::thm Pieces that meet give an unbroken graph
If each piece is a polynomial (or other continuous function) on its interval, the piecewise function has no jumps exactly when neighbouring pieces give the same value at every shared boundary point.
:::

:::steps Evaluate $f(x) = \begin{cases} x^2 & x < 1 \\ 4 - x & 1 \le x < 3 \\ 2 & x \ge 3 \end{cases}$ at $x = -2, 1, 3$, and find any jumps
1. $x = -2$: first piece, $f(-2) = 4$.
2. $x = 1$: the second piece includes 1, so $f(1) = 4 - 1 = 3$.
3. $x = 3$: the third piece includes 3, so $f(3) = 2$.
4. At $x = 1$: the first piece approaches $1^2 = 1$ but the function equals 3, so there is a jump of size 2.
5. At $x = 3$: the second piece approaches $4 - 3 = 1$ but the function equals 2, so there is another jump, of size 1.
:::

:::steps Write $g(x) = |x - 3| + 1$ as a piecewise function
1. $|x - 3|$ switches rule where its inside is zero: $x = 3$.
2. For $x < 3$, $x - 3 < 0$, so $|x - 3| = -(x - 3) = 3 - x$ and $g(x) = 4 - x$.
3. For $x \ge 3$, $|x - 3| = x - 3$ and $g(x) = x - 2$.
4. Check at $x = 3$: both rules give 1, so the V has its corner at $(3, 1)$.
:::

:::steps A parking garage charges $\$2$ per started hour, capped at $\$15$ per day. Find the cost of 3.25 hours and of 9 hours
1. Without the cap, the cost is $C(t) = 2\lceil t \rceil$.
2. For $t = 3.25$: $\lceil 3.25 \rceil = 4$, so $C = 8$ dollars.
3. For $t = 9$: $2 \cdot 9 = 18$, which exceeds the cap, so the cost is $\min(15, 18) = 15$ dollars.
4. The full rule is $C(t) = \min(15, 2\lceil t \rceil)$, a ceiling followed by a clip.
:::

:::mock Exam question
A data plan costs $\$20$ for up to 5 GB, plus $\$4$ per GB (charged continuously) above 5 GB. (a) Write the cost $C(x)$ for $x$ GB as a piecewise function. (b) Find $C(3)$ and $C(8)$. (c) How much data can you use for $\$40$?
:::solution
(a) $C(x) = 20$ for $0 \le x \le 5$ and $C(x) = 20 + 4(x - 5)$ for $x > 5$.
(b) $C(3) = 20$. $C(8) = 20 + 4 \cdot 3 = 32$.
(c) $40 > 20$, so use the second piece: $20 + 4(x - 5) = 40$ gives $x - 5 = 5$, so $x = 10$ GB.
:::
:::

:::ml
ReLU is the default activation in deep networks. A layer computes $\operatorname{ReLU}(Wx + b)$, so each neuron is a bent line, and a network of them is a piecewise linear function with a huge number of pieces. ReLU is popular because its slope is exactly 1 for positive inputs, which keeps gradients from shrinking as they pass back through many layers. Gradient clipping, which caps the size of updates during training, is the clip function applied to gradients.
:::

:::cs
Every `if`/`else` chain that returns a number defines a piecewise function. Integer division in Python, `a // b`, is $\lfloor a / b \rfloor$, which is why `-7 // 2` gives `-4`. The number of pages needed for $n$ items at $k$ per page is $\lceil n / k \rceil$, and the number of bits needed to write $n \ge 1$ in binary is $\lfloor \log_2 n \rfloor + 1$.
:::

:::real
Progressive income tax is piecewise linear. Suppose income up to $\$10{,}000$ is taxed at 0% and income above that at 20%. Then tax is $T(x) = 0$ for $x \le 10000$ and $T(x) = 0.2(x - 10000)$ for $x > 10000$. Someone earning $\$25{,}000$ pays $0.2 \cdot 15000 = 3000$ dollars. A raise never lowers take-home pay, because only the income above the threshold gets the higher rate, and the pieces meet with no jump.
:::

:::quiz
? What is $\operatorname{ReLU}(-4)$?
= 0
> ReLU replaces every negative input with 0.

? What is $\lfloor -1.5 \rfloor$?
= -2
> Floor is the largest integer that is less than or equal to $-1.5$, which is $-2$.

? For $f(x) = \begin{cases} 2x & x < 3 \\ x + 1 & x \ge 3 \end{cases}$, what is $f(3)$?
= 4
> The second piece owns $x = 3$ (because of $\ge$), so $f(3) = 3 + 1 = 4$.

? On a graph, a hollow dot at the end of a piece means...
- the function is undefined everywhere near that point
+ that endpoint is not part of this piece
- the function has a corner there
- the value there is zero
> Hollow means excluded; filled means included.

? How many buses with 40 seats are needed for 130 people?
= 4
> $\lceil 130 / 40 \rceil = \lceil 3.25 \rceil = 4$.

? Which function has a corner but no jump at $x = 0$?
+ $|x|$
- the Heaviside step $H(x)$
- $\operatorname{sign}(x)$
- $\lfloor x \rfloor$
> The two halves of $|x|$ meet at the origin, so there is no jump, only a sharp corner. The others jump at 0.
:::

## Lesson: Transforming graphs {#transformations}
@summary: Shifts, stretches and reflections of any graph, the rule that changes inside the function act backwards, and how to combine several moves in the right order.

### Why learn to move graphs around
You already know a handful of basic graphs by shape: the line $y = x$, the parabola $y = x^2$, the V of $y = |x|$, the half-parabola $y = \sqrt x$, the wave $y = \sin x$, the growth curve $y = e^x$. These are called **parent functions**. Here is the good news: a huge number of functions you will ever meet are just one of these parents that has been slid, stretched or flipped. Once you know how each change to the formula moves the picture, you can sketch $y = -2(x + 1)^2 + 3$ in seconds without plotting a single point, and you can read a formula's meaning straight off its graph.

### An everyday picture: editing a photo
Imagine you have a photo on your phone. You can drag it up or down, drag it left or right, stretch it taller or squash it flatter, make it wider or narrower, and mirror it. None of these edits changes *what is in the photo*; the cat is still a cat. Transforming a graph is exactly this. The shape stays recognisable, and only its position, size and orientation change. Our job is to learn which part of the formula corresponds to which editing button.

### Vertical shifts: adding outside
Start with $f(x) = x^2$ and consider $g(x) = x^2 + 3$. For every input, the output of $g$ is 3 more than the output of $f$. At $x = 0$, $f$ gives 0 and $g$ gives 3. At $x = 2$, $f$ gives 4 and $g$ gives 7. Every point moves straight up 3 units. In general, $y = f(x) + k$ shifts the graph **up** by $k$ if $k > 0$ and down by $|k|$ if $k < 0$. This one behaves exactly as you would expect, because the change happens to the output, which is the height.

### Horizontal shifts: inside goes backwards
Now consider $g(x) = (x - 2)^2$. Many people guess this moves the parabola left, because of the minus sign. It moves it **right** by 2. Here is why. The parent $x^2$ has its lowest point when its input is 0. In $g$, the input to the squaring is $x - 2$, which is 0 when $x = 2$. So the lowest point now happens at $x = 2$. Whatever $f$ used to do at input 0, $g$ does at $x = 2$; whatever $f$ did at input 1, $g$ does at $x = 3$. Every feature arrives 2 units later, which means 2 units to the right.

So $y = f(x - h)$ shifts the graph **right** by $h$, and $y = f(x + h)$ shifts it **left** by $h$. The general lesson is that changes made *inside* the function, to the input, act in the opposite direction to how they look. This is the most important idea in the lesson.

### Vertical stretches and reflections: multiplying outside
In $y = a\,f(x)$, every output is multiplied by $a$. With $a = 2$, a point at height 3 moves to height 6 and a point at height $-1$ moves to $-2$; points on the $x$-axis stay put, because $2 \cdot 0 = 0$. The graph is **stretched vertically** by a factor of 2. With $a = \frac12$ it is squashed to half height. With a negative $a$, every height also changes sign, so the graph is **flipped upside down** across the $x$-axis. For example $y = -x^2$ is a parabola opening downward, and $y = -3x^2$ is a downward parabola three times as steep.

### Horizontal stretches and reflections: multiplying inside
In $y = f(bx)$, the input is multiplied by $b$ before $f$ sees it. Take $b = 2$ and $f(x) = \sin x$. The parent completes one wave as its input goes from 0 to $2\pi$. In $\sin(2x)$, the input $2x$ goes from 0 to $2\pi$ when $x$ goes only from 0 to $\pi$. So the wave finishes twice as fast: the graph is **squeezed horizontally** by a factor of 2. Once again, the inside acts backwards: multiplying by 2 squeezes rather than stretches, and multiplying by $\frac12$ stretches to double width. A negative $b$ also reflects left and right: $y = f(-x)$ is the mirror image of $f$ across the $y$-axis. For example, $y = e^{-x}$ is $e^x$ flipped to decay instead of grow.

### Putting all four together
The general form is
$$y = a\,f\big(b(x - h)\big) + k.$$
The outside numbers $a$ and $k$ act on heights in the natural direction: stretch by $a$, then shift up by $k$. The inside numbers $b$ and $h$ act on horizontal positions in the backwards way: squeeze by $b$, shift right by $h$. A useful way to track a single point: the parent point $(x_0, y_0)$ moves to $\left(\frac{x_0}{b} + h,\ a\,y_0 + k\right)$.

Let's check that with $y = -2(x + 1)^2 + 3$. Here $a = -2$, $b = 1$, $h = -1$ and $k = 3$. The parent's vertex $(0, 0)$ moves to $(0 + (-1),\ -2 \cdot 0 + 3) = (-1, 3)$. The parent point $(1, 1)$ moves to $(0, -2 + 3) = (0, 1)$. So the graph is a downward parabola with vertex $(-1, 3)$, passing through $(0, 1)$. You can confirm: $-2(0 + 1)^2 + 3 = 1$.

### Order matters
When a formula has both a stretch and a shift on the same axis, the order you apply them changes the answer. Outside, the formula $a f(x) + k$ means "stretch first, then shift", because that is the order of operations. Compare $2x^2 + 3$ (stretch then up 3: vertex at height 3) with $2(x^2 + 3) = 2x^2 + 6$ (up 3 then stretch: vertex at height 6). Inside, write the input in the factored form $b(x - h)$ before reading off the shift. For $y = \sqrt{2x - 6}$, factor to $\sqrt{2(x - 3)}$: squeeze by 2 and shift right by 3, not by 6.

:::def Parent function
A basic function, such as $x^2$, $|x|$, $\sqrt x$, $\sin x$ or $e^x$, whose shifted, stretched and reflected versions form a whole family of graphs.
:::

:::def Transformation of a graph
Replacing $f(x)$ with $a\,f(b(x - h)) + k$. $k$ shifts vertically, $h$ shifts horizontally, $a$ stretches vertically (and reflects if negative), and $b$ squeezes horizontally (and reflects if negative).
:::

:::key Inside backwards, outside forwards
Changes outside $f$ act on outputs and behave as they look. Changes inside $f$ act on inputs and behave the opposite way: $-h$ moves right, multiplying by $b$ squeezes.
:::

### Common mistakes
:::warn Watch out
- $f(x - 2)$ shifts **right**, not left. The point that was at input 0 now appears at $x = 2$.
- $f(2x)$ **squeezes** the graph horizontally; it does not stretch it.
- Not factoring the inside: in $f(3x + 6) = f(3(x + 2))$ the shift is left 2, not left 6.
- Reflecting the wrong way: $-f(x)$ flips across the $x$-axis (upside down); $f(-x)$ flips across the $y$-axis (left and right).
:::

### Summary
Every graph in a family is a parent function edited by four moves. Outside changes ($a$ and $k$) stretch and shift vertically in the expected direction. Inside changes ($b$ and $h$) squeeze and shift horizontally in the opposite direction. Track a key point such as a vertex through the moves, and factor the inside before reading the horizontal shift.

@viz func kind=transform parent=square | Pick a parent function and move each slider one at a time.

:::explore
**What to try**
1. With parent $x^2$, move only $k$. The whole curve slides up and down; the dashed parent stays as a reference.
2. Reset $k$ and move only $h$ to $+2$. Notice the vertex goes to $x = 2$, matching "$x - h$ moves right".
3. Set $a = -1$, then $a = 2$, then $a = 0.5$. Watch the flip and the vertical stretch and squash.
4. Switch the parent to $\sin x$ and set $b = 2$. Count the waves: twice as many fit in the window, so the graph is squeezed.
5. Set $b = -1$ with parent $e^x$. The growth curve becomes a decay curve, mirrored across the $y$-axis.

**What to notice:** $a$ and $k$ do what they look like they do, while $b$ and $h$ act backwards, exactly as the article explained. The shape of the curve never changes, only its placement, just like editing a photo.
:::

:::formulas
$$y = a\,f\big(b(x - h)\big) + k$$
$$(x_0, y_0) \mapsto \left(\tfrac{x_0}{b} + h,\ a y_0 + k\right)$$
$$-f(x):\ \text{reflect in the } x\text{-axis} \qquad f(-x):\ \text{reflect in the } y\text{-axis}$$
:::

:::thm Point-tracking rule
If $(x_0, y_0)$ lies on the graph of $y = f(x)$, then $\left(\frac{x_0}{b} + h,\ a y_0 + k\right)$ lies on the graph of $y = a f(b(x - h)) + k$ (for $b \ne 0$).
:::

:::proof Why the rule holds
Put $x = \frac{x_0}{b} + h$ into the new function. Then $b(x - h) = b \cdot \frac{x_0}{b} = x_0$, so the output is $a f(x_0) + k = a y_0 + k$. So that point is on the new graph.
:::

:::steps Describe $y = -2(x + 1)^2 + 3$ and find its vertex
1. Parent: $x^2$, vertex $(0, 0)$.
2. $x + 1 = x - (-1)$: shift left 1.
3. $a = -2$: stretch vertically by 2 and flip upside down.
4. $+3$: shift up 3.
5. The vertex moves to $(-1, 3)$ and the parabola opens downward.
:::

:::steps Write the equation of $|x|$ shifted right 4, flipped upside down, and moved down 1
1. Shift right 4: replace $x$ with $x - 4$, giving $|x - 4|$.
2. Flip upside down: multiply outside by $-1$, giving $-|x - 4|$.
3. Move down 1: subtract 1 outside, giving $y = -|x - 4| - 1$.
4. Check: the corner is at $(4, -1)$ and the V points down.
:::

:::steps Find the transformations in $y = \sqrt{2x - 6} + 1$
1. Factor the inside: $2x - 6 = 2(x - 3)$, so $y = \sqrt{2(x - 3)} + 1$.
2. $b = 2$: squeeze horizontally by 2.
3. $h = 3$: shift right 3.
4. $k = 1$: shift up 1.
5. The parent's starting point $(0, 0)$ moves to $(0/2 + 3, 0 + 1) = (3, 1)$. Check: $\sqrt{2 \cdot 3 - 6} + 1 = 1$.
:::

:::mock Exam question
The graph of $y = f(x)$ passes through $(2, 5)$ and has a maximum at $(-1, 4)$. For $g(x) = 3f(x - 2) - 1$, find (a) the image of $(2, 5)$ and (b) the location of the maximum of $g$.
:::solution
Here $a = 3$, $b = 1$, $h = 2$, $k = -1$, so $(x_0, y_0) \mapsto (x_0 + 2,\ 3y_0 - 1)$.
(a) $(2, 5) \mapsto (4, 14)$.
(b) $(-1, 4) \mapsto (1, 11)$. Since $a = 3 > 0$ there is no flip, so it is still a maximum, at $(1, 11)$.
:::
:::

:::ml
Feature scaling is a transformation. Standardizing $x \mapsto \frac{x - \mu}{\sigma}$ shifts the data so its centre is 0 and stretches it so its spread is 1; the shape of the distribution does not change. Inside a neuron, the bias $b$ in $\sigma(wx + b)$ shifts the activation curve left or right and the weight $w$ squeezes it, which is how a network places each "switch" where it is needed.
:::

:::cs
Graphics and game engines position sprites with exactly these moves: translate, scale and reflect. Audio software that pitches a sound up by an octave is computing $f(2t)$, squeezing the waveform in time.
:::

:::real
Temperature conversion is a transformation: $F = \frac95 C + 32$ stretches the Celsius scale by $\frac95$ and shifts it up by 32. A daily temperature curve that looks like $\sin t$ in Celsius looks like the same shape, taller and higher, in Fahrenheit.
:::

:::quiz
? The graph of $y = \sqrt{x - 4} + 1$ is $\sqrt x$ moved...
- left 4, up 1
+ right 4, up 1
- right 4, down 1
- left 1, up 4
> Inside $x - 4$ shifts right 4; outside $+1$ shifts up 1.

? $y = f(-x)$ is the graph of $f$ reflected across the...
+ $y$-axis
- $x$-axis
- line $y = x$
> Replacing $x$ with $-x$ swaps left and right.

? The vertex of $y = 2(x - 3)^2 - 5$ has which $x$-coordinate?
= 3
> $x - 3 = 0$ at $x = 3$.

? Compared with $y = \sin x$, the graph of $y = \sin(3x)$ is...
- stretched horizontally by 3
+ squeezed horizontally by 3
- stretched vertically by 3
- shifted right 3
> Inside multiplication by 3 makes the wave repeat 3 times as fast.

? The point $(1, 2)$ is on $y = f(x)$. Which point is on $y = f(x + 4) - 3$? Give the new $x$-coordinate.
= -3
> Inside $+4$ shifts left 4: $x = 1 - 4 = -3$. (The new point is $(-3, -1)$.)

? $y = -x^2$ is the parabola $y = x^2$...
+ flipped upside down
- shifted down 1
- flipped left to right
- squeezed
> Multiplying the output by $-1$ reflects across the $x$-axis.
:::

## Lesson: Composition and inverse functions {#composition-inverse}
@summary: Chaining functions so one feeds the next, undoing a function with its inverse, one-to-one functions, and the mirror across y = x.

### Functions that feed into each other
Real processes rarely happen in one step. Your salary is converted to after-tax pay, then that pay is converted into another currency. A photo is resized, then sharpened, then compressed. A neural network applies one layer, then the next, then the next. Each step is a function, and the output of one becomes the input of the next. Doing functions one after another is called **composition**, and it is how complicated functions are built from simple ones.

The opposite question is just as important. If a function turns inputs into outputs, can we go backwards, from an output to the input that produced it? A function that does this is called an **inverse**. Encryption and decryption, converting Celsius to Fahrenheit and back, taking exponentials and logarithms: all of these are pairs of functions that undo each other.

### An everyday picture: an assembly line
Imagine a juice factory with two machines. Machine $g$ washes and peels fruit. Machine $f$ squeezes peeled fruit into juice. Fruit goes into $g$, and whatever comes out goes straight into $f$. The whole factory is a single new machine, "first $g$, then $f$". Notice two things. First, the order matters: squeezing unpeeled fruit and then trying to peel the juice makes no sense. Second, the output of $g$ must be something $f$ can accept; you cannot feed $f$ an item it was not designed for.

### Composition: the definition
The composition of $f$ with $g$ is written $f \circ g$ and read "$f$ of $g$" or "$f$ after $g$":
$$(f \circ g)(x) = f(g(x)).$$
Work from the inside out: first compute $g(x)$, then feed that number to $f$. Take $f(x) = x^2$ and $g(x) = x + 3$. Then $(f \circ g)(2) = f(g(2)) = f(5) = 25$. In general, $(f \circ g)(x) = f(x + 3) = (x + 3)^2$.

Now reverse the order: $(g \circ f)(2) = g(f(2)) = g(4) = 7$, and $(g \circ f)(x) = x^2 + 3$. The two answers are different. Composition is **not commutative**: $f \circ g$ and $g \circ f$ are usually different functions, just as peeling-then-squeezing differs from squeezing-then-peeling.

The domain of $f \circ g$ consists of inputs $x$ that are in the domain of $g$ *and* whose output $g(x)$ is in the domain of $f$. For $f(x) = \sqrt{x}$ and $g(x) = x - 5$, the composition $f(g(x)) = \sqrt{x - 5}$ needs $x - 5 \ge 0$, so its domain is $x \ge 5$, even though $g$ alone accepts every real number.

### Decomposing a function
It is equally useful to go the other way and spot a composition hidden inside a formula. The function $h(x) = (3x - 1)^5$ is "multiply by 3 and subtract 1, then raise to the fifth power", so $h = f \circ g$ with $g(x) = 3x - 1$ (inner) and $f(u) = u^5$ (outer). Likewise $\sqrt{x^2 + 1}$ is a square root applied to $x^2 + 1$, and $e^{-x^2}$ is the exponential applied to $-x^2$. Calculus uses this constantly: the chain rule differentiates compositions by handling the inner and outer functions separately.

### Inverses: undoing a function
The function $f(x) = 2x + 1$ doubles and then adds 1. To undo it, reverse each step in reverse order: subtract 1, then halve. That gives $f^{-1}(x) = \frac{x - 1}{2}$. Check: $f(3) = 7$ and $f^{-1}(7) = \frac{6}{2} = 3$. We are back where we started. In symbols, an inverse satisfies
$$f^{-1}(f(x)) = x \quad\text{and}\quad f(f^{-1}(y)) = y.$$
The notation $f^{-1}$ means "inverse function", **not** $\frac{1}{f}$. For $f(x) = 2x + 1$, $f^{-1}(7) = 3$ but $\frac{1}{f(7)} = \frac{1}{15}$.

### Which functions have inverses?
Consider $f(x) = x^2$. Both $3$ and $-3$ give the output 9. If someone tells you "the output was 9", you cannot know whether the input was 3 or $-3$, so no single inverse exists on all real numbers. A function can be inverted only if **different inputs always give different outputs**. Such a function is called **one-to-one** (or injective).

There is a picture test for this, the partner of the vertical line test. A horizontal line $y = c$ collects all inputs with output $c$. If it hits the graph twice, two inputs share an output. So a function is one-to-one exactly when **every horizontal line meets its graph at most once**. The line $y = 2x + 1$ passes. The parabola $y = x^2$ fails, because $y = 9$ meets it at $x = \pm 3$. Any function that is always increasing, or always decreasing, passes automatically.

### Finding an inverse algebraically
The reliable method has three steps. Write $y = f(x)$. Solve this equation for $x$ in terms of $y$. Then rename the variables so the input is called $x$ again. For $f(x) = \frac{2x + 1}{3}$: $y = \frac{2x + 1}{3}$, so $3y = 2x + 1$, so $x = \frac{3y - 1}{2}$, giving $f^{-1}(x) = \frac{3x - 1}{2}$. Always finish by checking one value.

### The mirror picture
Because an inverse swaps inputs and outputs, every point $(a, b)$ on the graph of $f$ becomes the point $(b, a)$ on the graph of $f^{-1}$. Swapping coordinates is the same as reflecting across the diagonal line $y = x$. So the graph of $f^{-1}$ is the mirror image of the graph of $f$ in the line $y = x$. For example, $e^x$ passes through $(0, 1)$ and $(1, e)$, so its inverse $\ln x$ passes through $(1, 0)$ and $(e, 1)$.

### Restricting the domain
If a function fails the horizontal line test, we can often keep just one part of it that passes. The parabola $x^2$ is one-to-one on $[0, \infty)$, and its inverse there is $\sqrt{x}$. That is exactly why $\sqrt{9} = 3$ and not $-3$: the square root is defined as the inverse of the right half of the parabola. The inverse trigonometric functions later in this course use the same trick.

:::def Composition
$(f \circ g)(x) = f(g(x))$: apply $g$ first, then apply $f$ to the result. Defined for inputs $x$ in the domain of $g$ with $g(x)$ in the domain of $f$.
:::

:::def Inverse function
A function $f^{-1}$ with $f^{-1}(f(x)) = x$ for every $x$ in the domain of $f$ and $f(f^{-1}(y)) = y$ for every $y$ in the range of $f$. It exists exactly when $f$ is one-to-one.
:::

:::def One-to-one, onto, bijection
**Injective** (one-to-one): $f(a) = f(b)$ implies $a = b$. **Surjective** (onto): every element of the codomain is an output. **Bijective**: both; these are exactly the functions with an inverse defined on the whole codomain.
:::

### Common mistakes
:::warn Watch out
- $f^{-1}(x)$ is not $\frac{1}{f(x)}$. The $-1$ means "inverse", not "reciprocal".
- Composing in the wrong order. In $f(g(x))$, $g$ acts first even though $f$ is written first.
- Forgetting domain restrictions. $\sqrt{x}$ undoes $x^2$ only for $x \ge 0$: $\sqrt{(-3)^2} = 3$, not $-3$.
- Undoing steps in the original order. To invert "double, then add 1", subtract 1 first, then halve.
:::

### Summary
Composition chains functions: $f(g(x))$ applies $g$ then $f$, and order matters. An inverse undoes a function and exists exactly when the function is one-to-one, which you can check with the horizontal line test. Find it by solving $y = f(x)$ for $x$; its graph is the mirror image across $y = x$. When a function is not one-to-one, restrict its domain to a piece that is.

@viz inverse | Drag the point along f. Its mirror image across y = x lands on the inverse.

:::explore
**What to try**
1. With $f(x) = e^x$, drag the blue point to $x = 0$. Its mirror is at $(1, 0)$ on $\ln x$.
2. Drag to $x = 1$. The readout shows $f(1) \approx 2.72$ and $f^{-1}(2.72) = 1$: the coordinates simply swap.
3. Choose $2x + 1$ and check that both lines are straight and mirror each other across the dashed diagonal.
4. Choose $x^2\ (x \ge 0)$. Only the right half of the parabola is drawn, which is why the inverse $\sqrt{x}$ exists.

**What to notice:** every orange dashed segment crosses the line $y = x$ at a right angle, which is what "mirror image" means. The point $(a, b)$ on $f$ always pairs with $(b, a)$ on $f^{-1}$, exactly the swap described in the article.
:::

:::formulas
$$(f \circ g)(x) = f(g(x)) \qquad f \circ g \ne g \circ f \text{ in general}$$
$$f^{-1}(f(x)) = x,\quad f(f^{-1}(y)) = y$$
$$(a, b) \in \text{graph}(f) \iff (b, a) \in \text{graph}(f^{-1})$$
$$(f \circ g)^{-1} = g^{-1} \circ f^{-1}$$
:::

:::thm Existence of an inverse
A function has an inverse (on its range) if and only if it is one-to-one. Every strictly increasing or strictly decreasing function is one-to-one.
:::

:::proof Inverse of a composition: socks and shoes
You put on socks ($g$) and then shoes ($f$), so getting dressed is $f \circ g$. To undo it you must remove shoes first ($f^{-1}$), then socks ($g^{-1}$). In symbols, $(g^{-1} \circ f^{-1})(f(g(x))) = g^{-1}(f^{-1}(f(g(x)))) = g^{-1}(g(x)) = x$, so $(f \circ g)^{-1} = g^{-1} \circ f^{-1}$.
:::

:::steps Invert $f(x) = \dfrac{2x + 1}{3}$
1. Write $y = \dfrac{2x+1}{3}$.
2. Solve for $x$: $3y = 2x + 1$, so $x = \dfrac{3y - 1}{2}$.
3. Rename: $f^{-1}(x) = \dfrac{3x - 1}{2}$.
4. Check: $f(5) = \frac{11}{3}$ and $f^{-1}\!\left(\frac{11}{3}\right) = \frac{11 - 1}{2} = 5$.
:::

:::steps For $f(x) = \sqrt{x}$ and $g(x) = 4 - x$, find $f(g(x))$, $g(f(x))$ and their domains
1. $f(g(x)) = \sqrt{4 - x}$. Need $4 - x \ge 0$, so the domain is $(-\infty, 4]$.
2. $g(f(x)) = 4 - \sqrt{x}$. Need $x \ge 0$ for the root, so the domain is $[0, \infty)$.
3. The two compositions have different formulas and different domains.
:::

:::steps Invert $f(x) = \dfrac{x}{x - 2}$
1. $y = \dfrac{x}{x - 2}$, so $y(x - 2) = x$.
2. Expand: $xy - 2y = x$. Collect $x$ terms: $xy - x = 2y$.
3. Factor: $x(y - 1) = 2y$, so $x = \dfrac{2y}{y - 1}$.
4. $f^{-1}(x) = \dfrac{2x}{x - 1}$. Check: $f(3) = 3$ and $f^{-1}(3) = \frac{6}{2} = 3$.
:::

:::mock Exam question
Let $f(x) = 3x - 4$ and $g(x) = x^2 + 1$. (a) Find $(f \circ g)(2)$ and $(g \circ f)(2)$. (b) Find $f^{-1}(x)$. (c) Explain why $g$ has no inverse on all of $\mathbb{R}$, and give a domain on which it does, with the inverse.
:::solution
(a) $g(2) = 5$, so $f(g(2)) = 11$. $f(2) = 2$, so $g(f(2)) = 5$.
(b) $y = 3x - 4$ gives $x = \frac{y + 4}{3}$, so $f^{-1}(x) = \frac{x + 4}{3}$.
(c) $g(1) = g(-1) = 2$, so $g$ is not one-to-one. On $[0, \infty)$ it is increasing; solving $y = x^2 + 1$ with $x \ge 0$ gives $g^{-1}(x) = \sqrt{x - 1}$ for $x \ge 1$.
:::
:::

:::ml
A neural network is a long composition: $\hat y = f_L(\cdots f_2(f_1(x)))$, where each layer is $f_i(x) = \sigma(W_i x + b_i)$. Backpropagation is the chain rule applied to this composition. Invertible functions matter too: **normalizing flows** build generative models from compositions of invertible layers, so you can map noise to images and images back to noise, using $(f \circ g)^{-1} = g^{-1} \circ f^{-1}$.
:::

:::cs
Function composition is a core idea in functional programming (Unix pipes `a | b | c` compose programs). Encryption $E$ and decryption $D$ must be inverses: $D(E(m)) = m$. Hashing is deliberately *not* one-to-one, which is why you cannot invert a hash to recover a password.
:::

:::real
Converting temperatures: $F(C) = \frac95 C + 32$ and its inverse $C(F) = \frac59(F - 32)$. A 20 °C day is $F(20) = 68$ °F, and $C(68) = \frac59 \cdot 36 = 20$, so the round trip returns the original value.
:::

:::quiz
? If $f(x) = 3x - 2$ and $g(x) = x^2$, find $f(g(2))$.
= 10
> $g(2) = 4$, then $f(4) = 12 - 2 = 10$.

? What is $f^{-1}(x)$ for $f(x) = e^x$?
- $e^{-x}$
- $1/e^x$
+ $\ln x$
- $x^e$
> The natural logarithm undoes the exponential.

? Which function has an inverse on all of $\mathbb{R}$?
- $x^2$
+ $x^3$
- $|x|$
- $\cos x$
> $x^3$ is strictly increasing, so it passes the horizontal line test.

? If $f(x) = 5x + 2$, what is $f^{-1}(17)$?
= 3
> Solve $5x + 2 = 17$: $x = 3$.

? The graph of $f^{-1}$ is the graph of $f$ reflected across...
- the $x$-axis
- the $y$-axis
+ the line $y = x$
- the origin
> Inverses swap $(a, b)$ to $(b, a)$, which is reflection in $y = x$.

? For $f(x) = x + 1$ and $g(x) = 2x$, what is $(g \circ f)(3)$?
= 8
> $f(3) = 4$, then $g(4) = 8$.
:::

## Lesson: Polynomial and rational functions {#poly-rational}
@summary: Degree and end behaviour, roots and multiplicity, turning points, the factor and remainder theorems, and the asymptotes and holes of rational functions.

### The workhorses of function building
Polynomials are the functions you can compute with nothing but adding and multiplying: $3x^2 - 5x + 2$, $x^3 - x$, $7$. Because computers and calculators are fundamentally adding and multiplying machines, polynomials are the easiest functions to evaluate, and they are used to approximate almost everything else (your calculator finds $\sin(0.3)$ with a polynomial). Rational functions, which are fractions of polynomials, add the ability to model things that blow up or level off, like the average cost per item as production grows. Understanding the shapes of these two families is a major goal of precalculus.

### An everyday scenario: the cost of a print run
Imagine you are printing a zine. The printer charges a $\$200$ setup fee plus $\$2$ per copy. The total cost of $x$ copies is a polynomial, $C(x) = 2x + 200$. But what you really care about is the cost *per copy*, $A(x) = \frac{2x + 200}{x}$, which is a rational function. For 10 copies, $A(10) = \frac{220}{10} = 22$ dollars each. For 1000 copies, $A(1000) = \frac{2200}{1000} = 2.2$ dollars each. As $x$ grows, the setup fee is shared among more copies and $A(x)$ settles down toward $\$2$, but never quite reaches it. That "settling toward a value" is a horizontal asymptote, one of the main ideas of this lesson.

### Polynomials: the vocabulary
A **polynomial** in $x$ is a sum of terms $a_k x^k$ with whole-number powers:
$$p(x) = a_n x^n + a_{n-1}x^{n-1} + \dots + a_1 x + a_0.$$
The highest power with a non-zero coefficient is the **degree** $n$, and its coefficient $a_n$ is the **leading coefficient**. The term $a_0$ is the **constant term**, and it equals $p(0)$, the $y$-intercept. In $p(x) = -2x^3 + 4x - 1$, the degree is 3, the leading coefficient is $-2$, and the graph crosses the $y$-axis at $-1$. Expressions such as $\sqrt{x}$ or $\frac1x$ are not polynomials, because their powers ($\frac12$ and $-1$) are not whole numbers.

### End behaviour: the leading term wins
What does a polynomial do when $x$ is huge? Try $p(x) = x^3 - 100x^2$ at $x = 1000$: $x^3 = 10^9$ while $100x^2 = 10^8$. The cubic term is ten times larger, and the gap widens as $x$ grows. In general, for large $|x|$ the highest-power term dominates all the others combined. So the **end behaviour** of a polynomial is the end behaviour of its leading term $a_n x^n$, and only two facts matter: whether $n$ is even or odd, and whether $a_n$ is positive or negative.

If the degree is **even** (like $x^2$), both ends point the same way: both up if $a_n > 0$, both down if $a_n < 0$. If the degree is **odd** (like $x^3$), the ends point in opposite directions: down on the left and up on the right if $a_n > 0$, and the reverse if $a_n < 0$. So $-2x^3 + 4x - 1$ rises on the far left and falls on the far right.

### Roots, factors and multiplicity
A **root** (or zero) of $p$ is an input $r$ with $p(r) = 0$; on the graph, it is where the curve meets the $x$-axis. Roots and factors are two views of the same thing: $r$ is a root exactly when $(x - r)$ is a factor. So $p(x) = (x - 1)(x + 2)(x - 4)$ has roots $1$, $-2$ and $4$, which you can read straight off the factors.

A factor can appear more than once. In $q(x) = (x - 1)^2(x + 3)$, the root 1 has **multiplicity** 2 and the root $-3$ has multiplicity 1. Multiplicity controls how the graph behaves at the root. At a root of **odd** multiplicity the graph **crosses** the axis, because the factor changes sign. At a root of **even** multiplicity the graph **touches** the axis and turns back, because a squared factor is never negative. Check with $(x - 1)^2$: at $x = 0.9$ it is $0.01$ and at $x = 1.1$ it is $0.01$, positive on both sides, so the graph bounces.

A polynomial of degree $n$ has at most $n$ real roots and at most $n - 1 $ **turning points** (peaks and valleys). A cubic can have up to two turning points; a quadratic has exactly one.

### Sketching a polynomial
Combine the facts. To sketch $p(x) = (x + 2)(x - 1)^2$: the degree is 3 with positive leading coefficient, so the graph starts low on the left and ends high on the right. It crosses at $x = -2$ (multiplicity 1) and touches at $x = 1$ (multiplicity 2). The $y$-intercept is $p(0) = 2 \cdot 1 = 2$. So the curve rises from the lower left, crosses at $-2$, climbs to a peak somewhere between $-2$ and $1$, comes down to touch the axis at 1, and rises again.

### Rational functions
A **rational function** is a fraction of two polynomials, $r(x) = \frac{p(x)}{q(x)}$. It is undefined wherever $q(x) = 0$, and that is where interesting things happen.

**Vertical asymptotes.** Look at $r(x) = \frac{1}{x - 2}$ near $x = 2$. At $x = 2.01$ it is $100$; at $x = 2.001$ it is $1000$; at $x = 1.999$ it is $-1000$. The graph shoots up on one side and down on the other, hugging the vertical line $x = 2$ without touching it. That line is a vertical asymptote. They occur where the denominator is zero and the numerator is not.

**Holes.** If a factor cancels between top and bottom, you get a single missing point instead of an asymptote. $\frac{x^2 - 1}{x - 1} = \frac{(x - 1)(x + 1)}{x - 1}$ equals $x + 1$ everywhere except at $x = 1$, where the original is undefined. The graph is the line $y = x + 1$ with a hollow dot at $(1, 2)$.

**Horizontal asymptotes.** These describe the far ends and come from comparing degrees. If the top's degree is smaller, the bottom wins for large $x$ and $r(x) \to 0$, so the asymptote is $y = 0$. If the degrees are equal, the leading terms dominate both, so $r(x)$ approaches the ratio of leading coefficients; for $\frac{3x^2 + 1}{x^2 - 4}$ that is $y = 3$. If the top's degree is bigger, there is no horizontal asymptote; when it is bigger by exactly one, polynomial division gives a slanted line called an **oblique asymptote**. The zine example had equal degrees with leading coefficients 2 and 1, giving $y = 2$, the $\$2$ per copy floor.

:::def Polynomial, degree, leading coefficient
A polynomial is $a_n x^n + \dots + a_1 x + a_0$ with whole-number powers. Its degree is the largest power $n$ with $a_n \ne 0$, and $a_n$ is the leading coefficient.
:::

:::def Multiplicity
The number of times a factor $(x - r)$ appears in a polynomial. Odd multiplicity: the graph crosses the axis at $r$. Even multiplicity: it touches and turns back.
:::

:::def Asymptote
A line the graph approaches more and more closely. Vertical asymptotes come from zeros of the denominator; horizontal asymptotes describe the value approached as $x \to \pm\infty$.
:::

### Common mistakes
:::warn Watch out
- Reading roots with the wrong sign: $(x + 2)$ gives the root $x = -2$.
- Calling every zero of the denominator an asymptote. If the factor cancels, it is a hole.
- Thinking a graph can never cross a horizontal asymptote. It can, in the middle; the asymptote only describes the far ends.
- Using the first term written rather than the highest power. In $5 + 3x - x^4$ the leading term is $-x^4$.
:::

### Summary
A polynomial's end behaviour comes from its leading term, its roots come from its factors, and each root's multiplicity says whether the graph crosses or bounces. A rational function has vertical asymptotes where its denominator is zero (unless the factor cancels, giving a hole) and a horizontal asymptote decided by comparing degrees.

@viz func kind=cubic | Change the coefficients. Count roots and turning points.

:::explore
**What to try**
1. Make $a$ positive, then negative. Watch the two ends swap direction, as the end-behaviour rule predicts for odd degree.
2. Adjust $c$ and $d$ until the curve crosses the axis three times, then until it crosses only once.
3. Try to make the curve just touch the axis at one point. That is a root of multiplicity 2.
4. Count the peaks and valleys. You will never see more than 2.

**What to notice:** a cubic always has at least one real root, because its ends point in opposite directions and the curve must cross the axis in between. It has at most 3 roots and at most 2 turning points, matching the degree rules.
:::

@viz func kind=rational | Shift the vertical asymptote with h and the horizontal asymptote with k.

:::explore
**What to try**
1. Move $h$ and watch the vertical gap in the graph slide left and right; it sits where the denominator $x - h$ is zero.
2. Move $k$ and watch both branches flatten out toward the new height $y = k$ at the far ends.
3. Zoom your attention near $x = h$: the outputs grow without bound on one side and drop without bound on the other.

**What to notice:** this is $\frac{1}{x}$ transformed, so the vertical asymptote is at $x = h$ and the horizontal asymptote at $y = k$, combining this lesson with the transformations lesson.
:::

:::formulas
$$p(x) = a_n x^n + \dots + a_0:\ \text{end behaviour of } a_n x^n$$
$$\text{at most } n \text{ real roots and } n - 1 \text{ turning points}$$
$$\deg p < \deg q \Rightarrow y = 0;\quad \deg p = \deg q \Rightarrow y = \tfrac{a_n}{b_n};\quad \deg p > \deg q \Rightarrow \text{none}$$
:::

:::thm Factor theorem
$r$ is a root of the polynomial $p$ if and only if $(x - r)$ is a factor of $p(x)$.
:::

:::thm Remainder theorem
When $p(x)$ is divided by $(x - r)$, the remainder is $p(r)$.
:::

:::proof Remainder and factor theorems
Divide $p(x)$ by $(x - r)$ to get a quotient $s(x)$ and a constant remainder $R$: $p(x) = (x - r)s(x) + R$. Put $x = r$: $p(r) = 0 \cdot s(r) + R = R$. That is the remainder theorem. In particular $p(r) = 0$ exactly when the remainder is 0, that is, when $(x - r)$ divides $p(x)$. That is the factor theorem.
:::

:::steps Factor $p(x) = x^3 - 2x^2 - 5x + 6$ and describe its graph
1. Try small integers: $p(1) = 1 - 2 - 5 + 6 = 0$, so $(x - 1)$ is a factor.
2. Divide: $x^3 - 2x^2 - 5x + 6 = (x - 1)(x^2 - x - 6)$.
3. Factor the quadratic: $x^2 - x - 6 = (x - 3)(x + 2)$.
4. So $p(x) = (x - 1)(x - 3)(x + 2)$, with roots $-2, 1, 3$, all crossing.
5. Degree 3, leading coefficient positive: low on the left, high on the right. $y$-intercept $p(0) = 6$.
:::

:::steps Analyze $r(x) = \dfrac{2x^2 - 2}{x^2 - x - 2}$
1. Factor: $\dfrac{2(x-1)(x+1)}{(x-2)(x+1)}$.
2. $(x+1)$ cancels: a hole at $x = -1$, where the simplified form $\frac{2(x-1)}{x-2}$ gives $\frac{-4}{-3} = \frac43$, so the hole is at $\left(-1, \frac43\right)$.
3. Vertical asymptote at $x = 2$.
4. Degrees equal (2 and 2): horizontal asymptote $y = \frac21 = 2$.
5. Root: the simplified numerator is zero at $x = 1$.
:::

:::steps Find the remainder when $x^4 - 3x + 5$ is divided by $x + 2$
1. $x + 2 = x - (-2)$, so by the remainder theorem the remainder is $p(-2)$.
2. $p(-2) = 16 + 6 + 5 = 27$.
:::

:::mock Exam question
For $f(x) = \dfrac{x^2 - 9}{x^2 - 2x - 3}$, find (a) the domain, (b) any holes, (c) vertical and horizontal asymptotes, (d) the $x$- and $y$-intercepts.
:::solution
Factor: $f(x) = \dfrac{(x - 3)(x + 3)}{(x - 3)(x + 1)}$.
(a) The denominator is zero at $x = 3$ and $x = -1$, so the domain is all reals except $3$ and $-1$.
(b) $(x - 3)$ cancels, giving a hole at $x = 3$. The simplified form $\frac{x + 3}{x + 1}$ gives $\frac{6}{4} = \frac32$, so the hole is at $\left(3, \frac32\right)$.
(c) Vertical asymptote $x = -1$. Equal degrees with leading coefficients 1 and 1: horizontal asymptote $y = 1$.
(d) $x$-intercept where $x + 3 = 0$: $(-3, 0)$. $y$-intercept $f(0) = \frac{-9}{-3} = 3$: $(0, 3)$.
:::
:::

:::ml
Polynomial regression fits $y \approx a_0 + a_1 x + \dots + a_n x^n$ to data. Low degrees underfit; very high degrees wiggle through every point and overfit, a direct consequence of having up to $n - 1$ turning points. Polynomial features (adding $x^2$, $x_1 x_2$ and so on) let linear models capture curves.
:::

:::cs
Computers evaluate polynomials with **Horner's method**: $a_3x^3 + a_2x^2 + a_1x + a_0 = ((a_3 x + a_2)x + a_1)x + a_0$, which uses only $n$ multiplications. Polynomials over finite fields are the basis of error-correcting codes (Reed-Solomon, used in QR codes) and checksums (CRC).
:::

:::real
Average cost is rational. With a $\$200$ setup fee and $\$2$ per item, the average cost $\frac{2x + 200}{x}$ has a vertical asymptote at $x = 0$ (one copy is very expensive) and a horizontal asymptote at $y = 2$ (bulk orders approach the per-item price).
:::

:::quiz
? What is the horizontal asymptote of $\dfrac{3x + 1}{x^2 + 5}$?
+ $y = 0$
- $y = 3$
- none
> The bottom has higher degree, so the fraction shrinks to 0.

? At a root of multiplicity 2, the graph...
- crosses the axis
+ touches and turns back
- has an asymptote
> A squared factor does not change sign, so the graph bounces.

? What is the maximum number of turning points of a degree 5 polynomial?
= 4
> At most $n - 1 = 4$.

? What is the horizontal asymptote of $\dfrac{6x^2 - x}{2x^2 + 7}$? Give the $y$-value.
= 3
> Equal degrees, so $y = \frac{6}{2} = 3$.

? What is the remainder when $x^3 + 2x - 1$ is divided by $x - 1$?
= 2
> By the remainder theorem it is $p(1) = 1 + 2 - 1 = 2$.

? As $x \to \infty$, $p(x) = -x^4 + 10x^3$ goes to...
- $+\infty$
+ $-\infty$
- 0
- 10
> The leading term $-x^4$ dominates: even degree, negative coefficient, so both ends go down.
:::

## Lesson: Exponential and logarithmic functions {#exp-log-functions}
@summary: Exponential growth and decay as functions, the special base e, logarithms as inverses, their graphs, solving exponential equations, half-life and doubling time, and log scales.

### Two kinds of growth
Suppose you are offered two jobs. Job A pays $\$100$ more each week than the week before. Job B pays 1 cent in week one and doubles every week. Job A grows by **adding** a fixed amount; that is linear growth. Job B grows by **multiplying** by a fixed factor; that is exponential growth. In the first weeks Job A is far ahead. But by week 20, Job B pays $0.01 \cdot 2^{19} \approx \$5{,}243$ that week, and by week 30 it pays over $\$5$ million a week. Multiplying always beats adding in the long run.

Exponential functions describe anything that changes by a fixed *percentage* per unit of time: populations, compound interest, viruses spreading, radioactive decay, the cooling of coffee, and the number of possible passwords as you add characters. Logarithms are the tool for running these questions backwards: "how long until...?" and "how many doublings...?". In the algebra course you met exponent rules and logarithms as operations on numbers. Here we treat them as functions and study their graphs.

### Exponential functions
An **exponential function** has the form
$$f(x) = a \cdot b^x, \quad b > 0,\ b \ne 1.$$
The variable is in the exponent, which is the difference from a power function like $x^2$. The number $a = f(0)$ is the starting value, and $b$ is the **growth factor**: every time $x$ increases by 1, the output is multiplied by $b$. For $f(x) = 3 \cdot 2^x$: $f(0) = 3$, $f(1) = 6$, $f(2) = 12$, $f(3) = 24$. Equal steps in $x$ give equal *ratios* in $y$, which is the fingerprint of exponential behaviour in a table of data.

If $b > 1$, the function shows **growth**. If $0 < b < 1$, it shows **decay**: $g(x) = 80 \cdot (0.5)^x$ gives $80, 40, 20, 10, \dots$. A percentage rate converts to a factor directly: growing 5% per year means $b = 1.05$; shrinking 20% per year means $b = 0.8$.

### The shape of the graph
Every exponential $b^x$ passes through $(0, 1)$, because $b^0 = 1$. Its outputs are always positive, because a positive number raised to any power is positive, so the range is $(0, \infty)$ and the domain is all real numbers. A growth curve hugs the $x$-axis on the left (as $x \to -\infty$, $2^x \to 0$), so the $x$-axis is a horizontal asymptote; then it rises ever more steeply on the right. A decay curve is the mirror image: $\left(\frac12\right)^x = 2^{-x}$, which is $2^x$ reflected across the $y$-axis.

### The special base $e$
Among all bases, one is singled out: $e \approx 2.71828$. It arises from compounding continuously. If $\$1$ earns 100% interest per year compounded $n$ times, it grows to $\left(1 + \frac1n\right)^n$: that is $2$ for $n = 1$, $2.613$ for $n = 12$, $2.7146$ for $n = 365$, and it approaches $e$ as $n$ grows without limit. The function $e^x$ has a remarkable property that calculus will prove: the slope of its graph at every point equals its height. That makes it the natural base for describing growth, and any exponential can be rewritten with it, since $b^x = e^{x \ln b}$.

### Logarithms as the inverse function
Every exponential function is one-to-one (it always increases or always decreases), so it has an inverse. The inverse of $b^x$ is the **logarithm** base $b$:
$$y = \log_b x \iff b^y = x.$$
In words, $\log_b x$ is "the power you must raise $b$ to in order to get $x$". So $\log_2 8 = 3$ because $2^3 = 8$, $\log_{10} 1000 = 3$, and $\log_5 \frac{1}{25} = -2$. The logarithm with base $e$ is the **natural log**, written $\ln x$.

Because $\log_b$ is the inverse of $b^x$, its graph is the mirror image of the exponential across $y = x$. Every point swaps: $(0, 1)$ on $2^x$ becomes $(1, 0)$ on $\log_2 x$, and $(3, 8)$ becomes $(8, 3)$. So every log graph passes through $(1, 0)$, is defined only for $x > 0$ (the domain of the log is the range of the exponential), has the $y$-axis as a vertical asymptote, and rises forever but more and more slowly. Going from $x = 1$ to $x = 1{,}000{,}000$, $\log_{10} x$ climbs only from 0 to 6.

### Solving exponential equations
To solve for an unknown in the exponent, apply a logarithm to both sides and use the power rule $\log(b^x) = x \log b$. Solve $5 \cdot 3^x = 200$. Divide by 5: $3^x = 40$. Take natural logs: $x \ln 3 = \ln 40$, so $x = \frac{\ln 40}{\ln 3} \approx \frac{3.689}{1.099} \approx 3.36$. Check: $3^{3.36} \approx 40$.

If both sides can be written with the same base, it is quicker: $4^x = 32$ becomes $2^{2x} = 2^5$, so $2x = 5$ and $x = 2.5$.

### Doubling time and half-life
A quantity growing by factor $b$ per unit time doubles after time $T$ where $b^T = 2$, so $T = \frac{\ln 2}{\ln b}$. For 7% annual growth, $T = \frac{0.693}{0.0677} \approx 10.2$ years. (The quick "rule of 70" says $70 / 7 = 10$ years.) For decay, the **half-life** is the time to halve. If a medicine has a half-life of 6 hours, the amount left after $t$ hours is $A_0 \left(\frac12\right)^{t/6}$; after 18 hours, three half-lives, one-eighth remains.

### Log scales
When data spans many powers of ten, an ordinary axis squashes most of it into a corner. A **log scale** places $1, 10, 100, 1000$ at equal spacing, so equal steps mean equal *ratios*. The Richter scale for earthquakes, decibels for sound and pH for acidity are all logarithmic: each step of 1 on the Richter scale is 10 times the ground motion. On a plot with a log $y$-axis, exponential growth becomes a straight line, which is a quick way to recognise it in data.

:::def Exponential function
$f(x) = a \cdot b^x$ with $b > 0$, $b \ne 1$. It multiplies by $b$ each time $x$ increases by 1: growth if $b > 1$, decay if $0 < b < 1$.
:::

:::def Logarithm
$\log_b x$ is the exponent $y$ with $b^y = x$, defined for $x > 0$. The function $\log_b x$ is the inverse of $b^x$. The natural logarithm is $\ln x = \log_e x$.
:::

:::def Half-life
The time it takes for a quantity that decays exponentially to fall to half its value. It is the same no matter how much you start with.
:::

### Common mistakes
:::warn Watch out
- Confusing $2^x$ with $x^2$. At $x = 10$, $2^{10} = 1024$ but $10^2 = 100$.
- $\log(a + b)$ is not $\log a + \log b$. The product rule is $\log(ab) = \log a + \log b$.
- Taking the log of zero or a negative number. $\ln(-3)$ is undefined in the real numbers.
- A 5% rate is the factor $1.05$, not $5$ or $0.05$.
:::

### Summary
Exponential functions multiply by a fixed factor per step, pass through $(0, a)$, stay positive, and either grow or decay. Logarithms are their inverses, with mirror-image graphs through $(1, 0)$ defined only for positive inputs. Taking logs turns "unknown in the exponent" problems into ordinary algebra, giving doubling times and half-lives, and log scales make huge ranges readable.

@viz func kind=exp | Base above 1 grows, base below 1 decays. Every curve passes through (0, a).

:::explore
**What to try**
1. Set $a = 1$ and $b = 2$. Step from $x = 0$ to $x = 1$ to $x = 2$ on the graph: the height doubles each step.
2. Lower $b$ below 1, say $b = 0.5$. The curve flips into decay, mirrored across the $y$-axis.
3. Set $b = 1$. The "curve" is flat, which is why $b = 1$ is excluded from the definition.
4. Change $a$ and see the pink dot at $(0, a)$ move: $a$ is the starting value.

**What to notice:** the curve never touches the $x$-axis, because $b^x > 0$ always. Whatever $b$ is, each unit step right multiplies the height by $b$, the "equal steps give equal ratios" rule from the article.
:::

@viz func kind=log | All log curves cross (1, 0). Larger bases flatten the curve.

:::explore
**What to try**
1. Find where the curve crosses the $x$-axis for several bases. It is always at $x = 1$.
2. Read off where the curve reaches height 1. The readout confirms it is at $x = b$, because $\log_b b = 1$.
3. Increase $b$ toward 10 and watch the curve flatten; compare with the dashed $\ln x$.
4. Look to the left of $x = 0$: nothing is drawn, because logs of non-positive numbers are undefined.

**What to notice:** the log curve is the exponential curve reflected across $y = x$. Its slow climb is the mirror of the exponential's fast climb.
:::

:::formulas
$$f(x) = a\,b^x,\quad f(x + 1) = b \cdot f(x)$$
$$y = \log_b x \iff b^y = x \qquad \log_b(b^x) = x,\quad b^{\log_b x} = x$$
$$\log_b(xy) = \log_b x + \log_b y,\quad \log_b(x^k) = k\log_b x,\quad \log_b x = \frac{\ln x}{\ln b}$$
$$T_{\text{double}} = \frac{\ln 2}{\ln b} \qquad A(t) = A_0\left(\tfrac12\right)^{t/T_{1/2}}$$
:::

:::thm Exponentials and logs are inverse functions
For $b > 0$, $b \ne 1$: $\log_b(b^x) = x$ for every real $x$, and $b^{\log_b x} = x$ for every $x > 0$.
:::

:::proof Change of base
Let $y = \log_b x$, so $b^y = x$. Take the natural log of both sides: $y \ln b = \ln x$. Divide: $y = \frac{\ln x}{\ln b}$. So $\log_b x = \frac{\ln x}{\ln b}$, which is how calculators compute any base.
:::

:::steps Half-life: how long until 1000 mg decays to 100 mg if it halves every 6 hours?
1. Model: $A(t) = 1000 \cdot \left(\frac12\right)^{t/6}$.
2. Set $A(t) = 100$: $0.1 = \left(\frac12\right)^{t/6}$.
3. Take logs: $\ln 0.1 = \frac t6 \ln 0.5$.
4. Solve: $t = 6 \cdot \dfrac{\ln 0.1}{\ln 0.5} \approx 6 \cdot 3.32 \approx 19.9$ hours.
:::

:::steps $\$2000$ is invested at 6% per year, compounded yearly. When does it reach $\$5000$?
1. Model: $A(t) = 2000 \cdot 1.06^t$.
2. Set equal: $1.06^t = 2.5$.
3. Take logs: $t = \dfrac{\ln 2.5}{\ln 1.06} \approx \dfrac{0.9163}{0.0583} \approx 15.7$ years.
4. So it passes $\$5000$ during year 16.
:::

:::steps Find the exponential $f(x) = a b^x$ through $(0, 5)$ and $(2, 45)$
1. $f(0) = a = 5$.
2. $f(2) = 5b^2 = 45$, so $b^2 = 9$ and $b = 3$ (a base must be positive).
3. $f(x) = 5 \cdot 3^x$. Check: $f(1) = 15$, and $15$ is the geometric middle of 5 and 45.
:::

:::mock Exam question
A bacteria culture starts with 500 cells and has 4000 cells after 6 hours, growing exponentially. (a) Find the hourly growth factor. (b) Find the doubling time. (c) When will there be 100,000 cells?
:::solution
(a) $500 b^6 = 4000$, so $b^6 = 8$ and $b = 8^{1/6} = 2^{1/2} = \sqrt2 \approx 1.414$.
(b) Since $b^2 = 2$, the doubling time is exactly 2 hours.
(c) $500 \cdot 2^{t/2} = 100000$ gives $2^{t/2} = 200$, so $\frac t2 = \log_2 200 = \frac{\ln 200}{\ln 2} \approx 7.64$, and $t \approx 15.3$ hours.
:::
:::

:::ml Why logs are everywhere in ML
1. **Products become sums:** $\log \prod p_i = \sum \log p_i$. Multiplying thousands of small probabilities underflows to 0 on a computer; summing their logs does not.
2. **Log-likelihood** and **cross-entropy loss** are logs of probabilities, and the softmax function uses $e^x$ to turn scores into probabilities.
3. $\log$ is increasing, so maximizing $\log f$ gives the same answer as maximizing $f$.
4. Learning rates are searched on a log scale: $10^{-1}, 10^{-2}, 10^{-3}, \dots$
:::

:::cs
Binary search halves the search range each step, so it needs about $\log_2 n$ steps: around 20 for a million items. A balanced binary tree with $n$ nodes has height about $\log_2 n$. Each extra bit doubles the number of values a register can hold, which is exponential growth in the other direction.
:::

:::real
Carbon-14 has a half-life of about 5730 years. A bone with 25% of its original carbon-14 has been through two half-lives, so it is about $2 \times 5730 = 11{,}460$ years old. Sound loudness in decibels is $10\log_{10}(I / I_0)$, so a 20 dB increase means 100 times the intensity.
:::

:::quiz
? Solve $2^{x} = 32$.
= 5
> $32 = 2^5$.

? Which is the inverse of $y = 10^x$?
+ $y = \log_{10} x$
- $y = x^{10}$
- $y = 10/x$
> The base-10 log undoes raising 10 to a power.

? A population doubles every 3 years. By what factor does it grow in 12 years?
= 16
> 12 years is 4 doublings: $2^4 = 16$.

? What is $\log_3 81$?
= 4
> $3^4 = 81$.

? Which point lies on the graph of every function $y = \log_b x$?
- $(0, 1)$
+ $(1, 0)$
- $(b, 0)$
- $(0, 0)$
> $\log_b 1 = 0$ for every base, because $b^0 = 1$.

? A substance has a half-life of 4 days. What fraction remains after 12 days?
= 1/8|0.125
> 12 days is 3 half-lives: $\left(\frac12\right)^3 = \frac18$.
:::

## Lesson: Comparing growth: logarithmic, polynomial, exponential {#growth-rates}
@summary: Which functions eventually win, the hierarchy log < power < exponential < factorial, how to compare growth with ratios, and why it decides whether an algorithm is usable.

### Why "who wins eventually" matters
Two programs solve the same problem. On a test with 10 items both finish instantly. On real data with a million items, one finishes in a second and the other would take longer than the age of the universe. The difference is not the speed of the computer; it is the *shape* of the function that counts how many steps each program needs. One grows like $n \log n$, the other like $2^n$. For small $n$ such functions can look similar, or the "worse" one can even be smaller. For large $n$ there is a strict ranking, and knowing it is one of the most useful pieces of precalculus for computer science and machine learning.

### An everyday picture: three savings plans
Imagine three ways to save, measured in cents. Plan L gives you as many cents as the number of digits in the day number, so it grows like $\log n$. Plan P gives you $n^2$ cents on day $n$, a polynomial. Plan E starts with one cent and doubles your balance every day, so on day $n$ you have $2^n$ cents. On day 5, Plan P has 25 cents and Plan E has 32 cents. On day 10 Plan P has 100 cents but Plan E has 1024. On day 30, Plan P has 900 cents while Plan E has over 10 million dollars. Plan L hardly moves at all. The lesson: early on, the ranking can be misleading, but eventually the type of growth decides everything.

### The growth hierarchy
For large positive $n$, these families are ordered from slowest to fastest:
$$1 \ll \log n \ll \sqrt n \ll n \ll n \log n \ll n^2 \ll n^3 \ll 2^n \ll n! \ll n^n.$$
The symbol $f \ll g$ here means "$g$ eventually grows so much faster that the ratio $\frac{f(n)}{g(n)}$ shrinks toward 0". It does **not** mean $f(n) < g(n)$ for every $n$. For example, $n^3 > 2^n$ at $n = 2, 3, \dots, 9$ ($9^3 = 729 > 512 = 2^9$), but from $n = 10$ on, $2^n$ is larger forever ($1024 > 1000$), and the gap explodes.

### Comparing with ratios
The cleanest way to compare two functions is to look at their ratio. Take $f(n) = n^2$ and $g(n) = 2^n$. Compute $\frac{n^2}{2^n}$: at $n = 10$ it is $\frac{100}{1024} \approx 0.098$; at $n = 20$ it is $\frac{400}{1048576} \approx 0.00038$; at $n = 30$ it is about $8 \times 10^{-7}$. The ratio heads to 0, so $2^n$ wins.

Why does every exponential beat every power? Look at what happens when $n$ increases by 1. The exponential $2^n$ always doubles. The power $n^2$ is multiplied by $\left(\frac{n+1}{n}\right)^2$, which is $4$ when $n = 1$ but only $1.21$ when $n = 10$ and about $1.02$ when $n = 100$. Powers grow by smaller and smaller percentages, while exponentials keep growing by the same percentage. A fixed percentage always beats a shrinking one in the long run.

### Logs lose to every power
At the other end, the logarithm grows more slowly than any positive power, even a tiny one like $n^{0.1}$. At $n = 10^{6}$, $\log_{10} n = 6$ while $\sqrt{n} = 1000$. Doubling $n$ adds only a constant to $\log_2 n$ (exactly 1), while doubling $n$ multiplies $\sqrt n$ by about 1.41. This is the mirror image of the previous fact: since $\log$ is the inverse of $\exp$, "exp beats every power" becomes "log loses to every power".

### Constants and lower-order terms do not change the ranking
Multiplying by a constant does not change a function's place in the hierarchy. $1000n$ is larger than $n^2$ until $n = 1000$, but after that $n^2$ wins forever, since $\frac{1000n}{n^2} = \frac{1000}{n} \to 0$. Similarly, $n^2 + 50n + 7$ grows like $n^2$: its ratio with $n^2$ is $1 + \frac{50}{n} + \frac{7}{n^2}$, which approaches 1. This is exactly why computer scientists summarise an algorithm's cost by its fastest-growing term and drop constants. That summary is called **Big-O notation**: $3n^2 + 5n$ is $O(n^2)$.

Also, the base of a logarithm is just a constant factor, because $\log_2 n = \frac{\ln n}{\ln 2} \approx 1.44 \ln n$. So $O(\log_2 n)$ and $O(\ln n)$ are the same class. Bases of exponentials are *not* interchangeable: $\frac{2^n}{3^n} = \left(\frac23\right)^n \to 0$, so $3^n$ grows strictly faster than $2^n$.

### Factorials
The factorial $n! = 1 \cdot 2 \cdot 3 \cdots n$ grows faster than any exponential $b^n$. Each step multiplies by $n + 1$, a factor that keeps getting bigger, while $b^n$ always multiplies by the same $b$. $10! = 3{,}628{,}800$ and $20! \approx 2.4 \times 10^{18}$. Factorials count orderings: there are $n!$ ways to arrange $n$ items, which is why trying every route through 20 cities is hopeless.

### Reading growth from data
A table of values reveals the type of growth. If equal steps in $n$ give equal *differences*, the growth is linear. If they give equal *ratios*, it is exponential. If doubling $n$ multiplies the output by 4, it behaves like $n^2$; by 8, like $n^3$. If doubling $n$ *adds* a constant, it is logarithmic. Engineers time a program at $n = 1000$ and $n = 2000$ to guess its complexity exactly this way.

:::def Dominates (grows faster)
$g$ dominates $f$ if $\frac{f(n)}{g(n)} \to 0$ as $n \to \infty$. Then $g$ is eventually larger than any constant multiple of $f$.
:::

:::def Big-O notation
$f(n) = O(g(n))$ means that for some constant $C$ and all large enough $n$, $|f(n)| \le C\,g(n)$: $f$ grows no faster than $g$, ignoring constant factors.
:::

### Common mistakes
:::warn Watch out
- Judging growth from small inputs. $n^3$ beats $2^n$ up to $n = 9$, then loses forever.
- Thinking a big constant can save a slow algorithm. $1000n$ still beats $n^2$ only until $n = 1000$.
- Treating $2^n$ and $3^n$ as the same class. Their ratio goes to 0; exponential bases matter.
- Treating different log bases as different classes. They differ only by a constant factor.
:::

### Summary
For large inputs, logarithms grow slower than any power, powers slower than any exponential, and exponentials slower than factorials. Compare two functions by checking whether their ratio tends to 0. Constants and lower-order terms never change the ranking, which is why Big-O keeps only the dominant term.

@viz bigo | Grow n and switch to a log y-axis to see every curve at once.

:::explore
**What to try**
1. Set $n$ small (around 5 to 10) on the linear axis. The curves are tangled together and the ranking is unclear.
2. Increase $n$ to 40, then 200. Watch $2^n$ and $n!$ shoot off the top while $\log n$ stays nearly flat.
3. Switch to the log $y$-axis. Now all curves fit on screen, and power functions $n, n^2, n^3$ become gentle curves while $2^n$ becomes a steep straight line.
4. Read the operation counts in the readout at $n = 2000$ and compare $n \log n$ with $n^2$.

**What to notice:** the order of the curves at the right edge is exactly the hierarchy from the article. On a log axis exponentials look like straight lines, the same "equal ratios" fingerprint from the exponential lesson.
:::

:::formulas
$$1 \ll \log n \ll n^{a} \ll b^n \ll n! \qquad (a > 0,\ b > 1)$$
$$f \ll g \iff \frac{f(n)}{g(n)} \to 0$$
$$\log_a n = \frac{\log_b n}{\log_b a} \quad(\text{log bases differ by a constant})$$
:::

:::thm Exponentials beat powers, powers beat logs
For every $k > 0$ and $b > 1$: $\dfrac{n^k}{b^n} \to 0$ and $\dfrac{\log n}{n^k} \to 0$ as $n \to \infty$.
:::

:::proof Why $n^k / b^n \to 0$ (sketch)
Let $a_n = \frac{n^k}{b^n}$. Then $\frac{a_{n+1}}{a_n} = \left(\frac{n+1}{n}\right)^k \cdot \frac1b$. As $n$ grows, $\left(\frac{n+1}{n}\right)^k \to 1$, so the ratio tends to $\frac1b < 1$. Eventually each term is less than, say, $r = \frac{1 + 1/b}{2} < 1$ times the previous one, so the terms shrink at least as fast as a geometric sequence $r^n \to 0$. Replacing $n$ with $\log n$ in this result gives $\frac{\log n}{n^k} \to 0$.
:::

:::steps Order from slowest to fastest growth: $n^2$, $2^n$, $50n$, $\log_2 n$, $n\log_2 n$
1. $\log_2 n$ is slower than any power.
2. $50n$ is linear (the 50 does not matter).
3. $n\log_2 n$ is slightly faster than linear: $\frac{n\log n}{n} = \log n \to \infty$.
4. $n^2$ beats $n \log n$: $\frac{n \log n}{n^2} = \frac{\log n}{n} \to 0$.
5. $2^n$ beats every power. Order: $\log_2 n,\ 50n,\ n\log_2 n,\ n^2,\ 2^n$.
:::

:::steps Find the first whole number $n \ge 2$ where $2^n > n^3$ stays true
1. $n = 9$: $2^9 = 512$, $9^3 = 729$, not yet.
2. $n = 10$: $2^{10} = 1024$, $10^3 = 1000$. Now $2^n$ is ahead.
3. From here, $2^n$ doubles each step while $n^3$ grows by the factor $\left(\frac{n+1}{n}\right)^3 \le 1.1^3 \approx 1.33$, so it stays ahead. Answer: $n = 10$.
:::

:::steps A program takes 2 seconds for $n = 1000$ and 8 seconds for $n = 2000$. Estimate its growth and the time for $n = 8000$
1. Doubling $n$ multiplied the time by 4, which matches $n^2$.
2. Going from 1000 to 8000 is three doublings, multiplying the time by $4^3 = 64$.
3. Estimated time: $2 \times 64 = 128$ seconds.
:::

:::mock Exam question
Algorithm A takes $100n\log_2 n$ steps and algorithm B takes $n^2$ steps. (a) Which is faster for $n = 64$? (b) Which is faster for $n = 4096$? (c) Which would you choose for large inputs, and why?
:::solution
(a) A: $100 \cdot 64 \cdot 6 = 38{,}400$. B: $64^2 = 4096$. B is faster.
(b) A: $100 \cdot 4096 \cdot 12 = 4{,}915{,}200$. B: $4096^2 = 16{,}777{,}216$. A is faster.
(c) A, because $\frac{100 n \log n}{n^2} = \frac{100\log n}{n} \to 0$: for all large enough inputs A wins by a growing margin, despite its bigger constant.
:::
:::

:::cs
Big-O classes decide feasibility. With $10^9$ simple steps per second and $n = 10^6$: an $O(n\log n)$ sort takes about 0.02 seconds, an $O(n^2)$ algorithm about 17 minutes, and an $O(2^n)$ brute force is impossible. This is why merge sort ($n\log n$) replaced bubble sort ($n^2$) and why problems that seem to need $2^n$ work (like many scheduling problems) are studied so intensely.
:::

:::ml
Training cost guides model design. Standard attention in a transformer compares every token with every other, costing $O(n^2)$ in sequence length $n$; doubling the context quadruples the work, which motivated "linear attention" variants. Grid search over $k$ hyperparameters with $m$ values each needs $m^k$ runs, exponential in $k$, which is why random search and Bayesian optimization are used instead.
:::

:::real
Passwords: with 62 possible characters, an 8-character password has $62^8 \approx 2.2 \times 10^{14}$ possibilities, and each extra character multiplies that by 62. Exponential growth in the number of options is what makes long passwords strong.
:::

:::quiz
? Which grows fastest as $n \to \infty$?
- $n^{10}$
- $1000n^2$
+ $1.1^n$
- $n\log n$
> Any exponential with base greater than 1 eventually beats any power.

? Which grows slowest?
+ $\log n$
- $\sqrt n$
- $n$
- $n^{0.1}$
> Logarithms grow slower than every positive power.

? Doubling $n$ multiplies a program's running time by 8. What power of $n$ does that suggest?
= 3
> $2^3 = 8$, so the time behaves like $n^3$.

? $1000n$ and $n^2$ are equal at which positive $n$?
= 1000
> $1000n = n^2$ gives $n = 1000$; after that $n^2$ is larger.

? Is $3n^2 + 100n + 7$ in $O(n^2)$?
+ Yes
- No
> The dominant term is $n^2$; constants and lower-order terms are dropped.

? $\log_2 n$ and $\ln n$ differ by...
+ a constant factor
- a power of $n$
- an exponential factor
> $\log_2 n = \frac{\ln n}{\ln 2}$, about $1.44\ln n$.
:::

# Unit: Trigonometry

## Lesson: Angles and radians {#radians}
@summary: What an angle measures, degrees versus radians, converting between them, coterminal and reference angles, arc length, sector area and angular speed.

### Why a new way to measure angles?
You have measured angles in degrees for years: 90 degrees for a corner, 360 for a full turn. Degrees work perfectly well for building shelves. But the number 360 is arbitrary; it was chosen by ancient astronomers, probably because a year has roughly 360 days and 360 divides evenly by many numbers. Nothing about circles themselves says "360". When mathematicians started studying how angles *change* (rotations, waves, oscillations), they discovered that one particular unit, the **radian**, makes every formula simpler. In calculus, the rules for differentiating $\sin$ and $\cos$ only work cleanly in radians. So from here on, radians are the default unit, and you need to be fluent in them.

### What an angle measures
An angle measures an amount of **turning**. Picture a ray starting along the positive $x$-axis, pinned at the origin. Rotate it counterclockwise and the angle grows; rotate it clockwise and we count the angle as negative. The starting ray is the **initial side** and the ray where you stop is the **terminal side**. Because you can keep turning, angles are not limited to 360 degrees: $450°$ is a full turn plus another $90°$.

### An everyday picture: measuring by walking
Imagine a round running track with radius 50 metres, and you stand at the centre holding one end of a rope tied to a runner. As the runner jogs around the edge, the rope sweeps out an angle. Now ask: how far along the edge has the runner gone *compared to the length of the rope*? If the runner has covered 50 metres of track (one rope length), the rope has turned through exactly **one radian**. If the runner covers 100 metres (two rope lengths), that is 2 radians. The radian measures angle by "how many radii of arc have you walked".

### The definition of a radian
:::def Radian
The angle at the centre of a circle that cuts off an arc whose length equals the radius. In general, an angle in radians is $\theta = \frac{s}{r}$, the arc length divided by the radius.
:::

Because it is a length divided by a length, the radian is really a pure number, which is part of why it fits so naturally into formulas. It does not depend on the size of the circle: double the radius and the arc doubles too, so the ratio stays the same.

How many radians in a full turn? A full turn walks the whole circumference, $2\pi r$. Dividing by $r$ gives $2\pi$. So
$$360° = 2\pi \text{ radians}, \qquad 180° = \pi \text{ radians}.$$
One radian is $\frac{180°}{\pi} \approx 57.3°$, a bit less than a sixth of a turn. Since $2\pi \approx 6.28$, a full turn contains a little more than six radians.

### Converting
The key fact $180° = \pi$ gives both conversion rules. To go from degrees to radians, multiply by $\frac{\pi}{180}$; to go from radians to degrees, multiply by $\frac{180}{\pi}$.

For example, $60° = 60 \cdot \frac{\pi}{180} = \frac{\pi}{3}$. And $\frac{5\pi}{4}$ radians $= \frac{5\pi}{4} \cdot \frac{180}{\pi} = 225°$. A radian measure written without the symbol $\pi$ is still fine: $2$ radians $= 2 \cdot \frac{180}{\pi} \approx 114.6°$.

It pays to memorise the common angles as fractions of $\pi$. Think in terms of fractions of a half-turn: $90°$ is half of a half-turn, so $\frac{\pi}{2}$; $45°$ is a quarter of a half-turn, so $\frac{\pi}{4}$; $30°$ is a sixth, so $\frac{\pi}{6}$; $60°$ is a third, so $\frac{\pi}{3}$. Then build others from these: $120° = 2 \cdot 60°$ is $\frac{2\pi}{3}$, $135° = 3 \cdot 45°$ is $\frac{3\pi}{4}$, and $150° = 5 \cdot 30°$ is $\frac{5\pi}{6}$.

### Coterminal and reference angles
Angles that differ by a whole number of full turns end on the same terminal side and are called **coterminal**. In radians, $\theta$ and $\theta + 2\pi k$ are coterminal for any integer $k$. So $\frac{\pi}{4}$, $\frac{9\pi}{4}$ and $-\frac{7\pi}{4}$ all point in the same direction. To find the coterminal angle between $0$ and $2\pi$, add or subtract $2\pi$ until you land in that range: $\frac{17\pi}{6} - 2\pi = \frac{5\pi}{6}$.

The **reference angle** of $\theta$ is the acute angle between its terminal side and the $x$-axis. For $\frac{5\pi}{6}$ (in the second quadrant) it is $\pi - \frac{5\pi}{6} = \frac{\pi}{6}$. Reference angles let you reduce any trig value to one of the familiar acute angles, as the next lesson shows.

### Arc length and sector area
Rearranging the definition $\theta = \frac{s}{r}$ gives the **arc length** formula
$$s = r\theta.$$
A pizza slice with radius 20 cm and angle $\frac{\pi}{4}$ has a crust length of $20 \cdot \frac{\pi}{4} = 5\pi \approx 15.7$ cm. In degrees you would need $s = \frac{\theta}{360} \cdot 2\pi r$, the same idea with an extra conversion factor.

The **sector area** follows from proportion: a sector with angle $\theta$ is the fraction $\frac{\theta}{2\pi}$ of the full disc, whose area is $\pi r^2$. So
$$A = \frac{\theta}{2\pi} \cdot \pi r^2 = \tfrac12 r^2 \theta.$$
The same pizza slice has area $\frac12 \cdot 400 \cdot \frac{\pi}{4} = 50\pi \approx 157$ cm².

### Angular speed
When something spins, its **angular speed** $\omega$ is the angle turned per unit time, usually in radians per second. A point at distance $r$ from the centre then moves with linear speed $v = r\omega$, straight from $s = r\theta$. A wheel of radius $0.3$ m spinning at $10$ rad/s moves the bike at $3$ m/s. Notice how cleanly this works in radians, with no stray factors of $\frac{\pi}{180}$.

:::key Why radians are natural
In radians, arc length is $r\theta$, sector area is $\frac12 r^2\theta$ and linear speed is $r\omega$, with no conversion constants. Calculus facts like $\frac{d}{dx}\sin x = \cos x$ and $\sin x \approx x$ for small $x$ are only true in radians.
:::

### Common mistakes
:::warn Watch out
- Leaving the calculator in degree mode. $\sin(2)$ in degree mode computes $\sin(2°)$.
- Thinking 1 radian equals $\pi$ or $180°$. One radian is about $57.3°$; $\pi$ radians is $180°$.
- Using $s = r\theta$ with $\theta$ in degrees. It needs radians.
- Forgetting that negative angles are measured clockwise.
:::

### Summary
A radian is the angle that cuts off an arc equal to the radius, so $\theta = s/r$ and a full turn is $2\pi$. Convert using $180° = \pi$. Coterminal angles differ by multiples of $2\pi$, and reference angles reduce any angle to an acute one. In radians, arc length is $r\theta$, sector area is $\frac12 r^2\theta$, and linear speed is $r\omega$.

@viz unit-circle | Drag the point around the circle and read the angle in both radians and degrees.

:::explore
**What to try**
1. Drag the point to the top of the circle. The readout shows about $1.571$ rad $= 90°$, which is $\frac{\pi}{2}$.
2. Drag to the far left: $3.142$ rad $= 180°$, exactly $\pi$.
3. Find the angle where the readout says $1$ rad. Notice it is a little less than $60°$ (about $57.3°$).
4. Press Play and count: one full lap takes the angle from 0 to about $6.283 = 2\pi$.

**What to notice:** on a circle of radius 1, the angle in radians *is* the length of arc walked, so the number in the readout is literally the distance travelled around the circle. That is the definition from the article.
:::

:::formulas
$$\theta = \frac{s}{r} \qquad 2\pi \text{ rad} = 360°,\quad \pi \text{ rad} = 180°$$
$$\text{rad} = \text{deg} \times \frac{\pi}{180} \qquad \text{deg} = \text{rad} \times \frac{180}{\pi}$$
$$s = r\theta,\quad A = \tfrac12 r^2\theta,\quad v = r\omega$$
:::

:::thm Sector area
A sector of a circle with radius $r$ and central angle $\theta$ (in radians) has area $\frac12 r^2\theta$.
:::

:::proof Sector area by proportion
Area is proportional to angle, and the full angle $2\pi$ gives the full area $\pi r^2$. So the sector area is $\frac{\theta}{2\pi}\cdot\pi r^2 = \frac12 r^2\theta$.
:::

:::steps Convert $225°$ to radians and $\frac{7\pi}{6}$ to degrees
1. $225 \cdot \frac{\pi}{180} = \frac{225\pi}{180} = \frac{5\pi}{4}$.
2. $\frac{7\pi}{6} \cdot \frac{180}{\pi} = \frac{7 \cdot 180}{6} = 210°$.
:::

:::steps Find the coterminal angle in $[0, 2\pi)$ and the reference angle of $-\frac{5\pi}{3}$
1. Add $2\pi = \frac{6\pi}{3}$: $-\frac{5\pi}{3} + \frac{6\pi}{3} = \frac{\pi}{3}$.
2. $\frac{\pi}{3}$ is already in the first quadrant, so the reference angle is $\frac{\pi}{3}$.
:::

:::steps A sector has radius 6 cm and arc length 9 cm. Find the angle and the area
1. $\theta = \frac{s}{r} = \frac{9}{6} = 1.5$ radians.
2. $A = \frac12 r^2 \theta = \frac12 \cdot 36 \cdot 1.5 = 27$ cm².
3. In degrees, $1.5 \cdot \frac{180}{\pi} \approx 85.9°$.
:::

:::mock Exam question
A car tyre has radius 0.35 m and turns at 600 revolutions per minute. (a) Find its angular speed in radians per second. (b) Find the car's speed in metres per second. (c) How far does the car travel while the wheel turns through $100$ radians?
:::solution
(a) 600 rev/min is 10 rev/s, and each revolution is $2\pi$ rad, so $\omega = 20\pi \approx 62.8$ rad/s.
(b) $v = r\omega = 0.35 \cdot 20\pi = 7\pi \approx 22.0$ m/s.
(c) $s = r\theta = 0.35 \cdot 100 = 35$ m.
:::
:::

:::ml
Rotary position embeddings (RoPE), used in many large language models, rotate pairs of features by angles proportional to a token's position, measured in radians. Periodic features such as time of day are often encoded as $(\cos\theta, \sin\theta)$ with $\theta = 2\pi \cdot \frac{\text{hour}}{24}$, so that 23:00 and 01:00 end up close together.
:::

:::cs
Every programming language's `sin`, `cos` and `atan2` functions use radians. Graphics code converts with `rad = deg * Math.PI / 180`. Game engines store rotations in radians and compute angular velocity in radians per second.
:::

:::real
A clock's minute hand turns $2\pi$ radians per hour. In 20 minutes it turns $\frac{2\pi}{3}$ radians. If it is 10 cm long, its tip travels $10 \cdot \frac{2\pi}{3} \approx 20.9$ cm in that time.
:::

:::quiz
? Convert $135°$ to radians.
+ $\frac{3\pi}{4}$
- $\frac{2\pi}{3}$
- $\frac{5\pi}{6}$
- $\frac{3\pi}{2}$
> $135 \cdot \frac{\pi}{180} = \frac{3\pi}{4}$.

? An arc of a circle of radius 4 subtends 2 radians. How long is it?
= 8
> $s = r\theta = 4 \cdot 2 = 8$.

? How many degrees is $\frac{\pi}{6}$?
= 30
> $\frac{\pi}{6}\cdot\frac{180}{\pi} = 30$.

? Which angle is coterminal with $\frac{\pi}{3}$?
- $\frac{2\pi}{3}$
+ $\frac{7\pi}{3}$
- $-\frac{\pi}{3}$
- $\frac{4\pi}{3}$
> $\frac{7\pi}{3} - 2\pi = \frac{\pi}{3}$.

? What is the area of a sector with radius 2 and angle $\pi$ radians? Give a multiple of $\pi$: enter the number in front of $\pi$.
= 2
> $\frac12 \cdot 4 \cdot \pi = 2\pi$, a half disc.

? Roughly how many degrees is one radian?
- $1°$
- $3.14°$
+ $57.3°$
- $180°$
> $\frac{180}{\pi} \approx 57.3$.
:::

## Lesson: The unit circle, sine and cosine {#unit-circle}
@summary: Sine and cosine as the coordinates of a point moving around a circle, the right-triangle view, exact values, signs by quadrant, reference angles, and tangent and the other ratios.

### Why define trig with a circle?
You may have met sine and cosine as ratios of sides in a right triangle: "SOH CAH TOA". That definition is useful, but it has a serious limit. The angles in a right triangle (other than the right angle) are always between $0°$ and $90°$. What is the sine of $150°$, or of $-40°$, or of 10 radians? A triangle cannot tell you. Yet waves, rotations and anything periodic need sines and cosines of every angle, including angles beyond one full turn. The **unit circle** gives one definition that works for every angle and agrees with the triangle definition where both apply.

### An everyday picture: a Ferris wheel
Imagine riding a Ferris wheel of radius 1 (in some unit), whose centre is at the origin. You start at the rightmost point, $(1, 0)$, and the wheel turns counterclockwise. At every moment you have a horizontal position (how far right or left of the centre you are) and a vertical position (how far above or below the centre). As the wheel turns, your height rises to 1 at the top, falls back to 0, drops to $-1$ at the bottom, and returns. Your horizontal position does the same thing, just a quarter-turn out of step. Those two numbers, as functions of the angle turned, are cosine and sine.

### The definition
Draw the **unit circle**, the circle of radius 1 centred at the origin, whose equation is $x^2 + y^2 = 1$. Start at $(1, 0)$ and walk an angle $\theta$ counterclockwise (clockwise if $\theta$ is negative). The point where you land is defined to be
$$(\cos\theta,\ \sin\theta).$$
So $\cos\theta$ is the $x$-coordinate (horizontal position) and $\sin\theta$ is the $y$-coordinate (height). That really is the whole definition, and everything else in trigonometry follows from it.

:::def Sine and cosine
For any angle $\theta$, the point on the unit circle at angle $\theta$ from the positive $x$-axis is $(\cos\theta, \sin\theta)$. Cosine is the $x$-coordinate and sine is the $y$-coordinate.
:::

Some values can be read off immediately. At $\theta = 0$ you are at $(1, 0)$, so $\cos 0 = 1$ and $\sin 0 = 0$. A quarter turn, $\theta = \frac{\pi}{2}$, takes you to the top, $(0, 1)$: $\cos\frac{\pi}{2} = 0$ and $\sin\frac{\pi}{2} = 1$. A half turn, $\theta = \pi$, reaches $(-1, 0)$, so $\cos\pi = -1$ and $\sin\pi = 0$. Three quarters, $\frac{3\pi}{2}$, is the bottom $(0, -1)$.

Because the point lies on the circle $x^2 + y^2 = 1$, we get for free the most important identity in trigonometry:
$$\cos^2\theta + \sin^2\theta = 1.$$
And since coordinates on this circle are between $-1$ and $1$, so are sine and cosine. Because walking a full turn $2\pi$ brings you back to the same point, both functions repeat: $\sin(\theta + 2\pi) = \sin\theta$.

### Connecting to right triangles
For an acute angle $\theta$, drop a vertical line from the point $(\cos\theta, \sin\theta)$ to the $x$-axis. You get a right triangle with hypotenuse 1 (the radius), horizontal side $\cos\theta$ and vertical side $\sin\theta$. So in this triangle, $\sin\theta = \frac{\text{opposite}}{\text{hypotenuse}}$ and $\cos\theta = \frac{\text{adjacent}}{\text{hypotenuse}}$, with hypotenuse 1. For a bigger similar triangle with hypotenuse $h$, every side is scaled by $h$, and the ratios stay the same. That is SOH CAH TOA:
$$\sin\theta = \frac{\text{opp}}{\text{hyp}},\quad \cos\theta = \frac{\text{adj}}{\text{hyp}},\quad \tan\theta = \frac{\text{opp}}{\text{adj}}.$$
For a 3-4-5 right triangle, the angle opposite the side 3 has $\sin\theta = \frac35$, $\cos\theta = \frac45$ and $\tan\theta = \frac34$.

### Exact values to know
Two special triangles give exact values. The **45-45-90** triangle is half of a square; with legs 1 the hypotenuse is $\sqrt2$, so $\sin\frac\pi4 = \cos\frac\pi4 = \frac{1}{\sqrt2} = \frac{\sqrt2}{2} \approx 0.707$. The **30-60-90** triangle is half of an equilateral triangle with side 2; its sides are $1$, $\sqrt3$ and $2$, so $\sin\frac\pi6 = \frac12$, $\cos\frac\pi6 = \frac{\sqrt3}{2}$, $\sin\frac\pi3 = \frac{\sqrt3}{2}$ and $\cos\frac\pi3 = \frac12$.

| $\theta$ | $0$ | $\frac\pi6$ | $\frac\pi4$ | $\frac\pi3$ | $\frac\pi2$ |
|---|---|---|---|---|---|
| $\sin\theta$ | $0$ | $\frac12$ | $\frac{\sqrt2}2$ | $\frac{\sqrt3}2$ | $1$ |
| $\cos\theta$ | $1$ | $\frac{\sqrt3}2$ | $\frac{\sqrt2}2$ | $\frac12$ | $0$ |

:::tip A memory pattern
For $0, \frac\pi6, \frac\pi4, \frac\pi3, \frac\pi2$, sine is $\frac{\sqrt0}{2}, \frac{\sqrt1}{2}, \frac{\sqrt2}{2}, \frac{\sqrt3}{2}, \frac{\sqrt4}{2}$. Cosine is the same list backwards.
:::

### Signs by quadrant
The axes split the plane into four quadrants. In quadrant I both coordinates are positive, so sine and cosine are both positive. In quadrant II ($\frac\pi2 < \theta < \pi$) you are left of the axis but above it: cosine negative, sine positive. In quadrant III both are negative. In quadrant IV cosine is positive and sine negative. The phrase "All Students Take Calculus" records which functions are positive in quadrants I to IV: All, Sine, Tangent, Cosine.

### Reference angles: any angle from the first quadrant
To find a trig value for any angle, find its **reference angle** (the acute angle to the $x$-axis), take the known value for that, and attach the sign for the quadrant. Let's find $\sin\frac{5\pi}{6}$. The angle $\frac{5\pi}{6}$ ($150°$) is in quadrant II with reference angle $\pi - \frac{5\pi}{6} = \frac\pi6$. So $\sin\frac{5\pi}{6} = +\sin\frac\pi6 = \frac12$, positive because sine is positive in quadrant II. Similarly $\cos\frac{4\pi}{3}$: quadrant III, reference angle $\frac\pi3$, cosine negative there, so the answer is $-\frac12$.

This works because the four points at angles $\alpha$, $\pi - \alpha$, $\pi + \alpha$ and $2\pi - \alpha$ are mirror images of each other across the axes, so they have the same coordinates up to sign.

### Tangent and the other ratios
The **tangent** is $\tan\theta = \frac{\sin\theta}{\cos\theta}$. Geometrically it is the slope of the radius line from the origin to the point: rise $\sin\theta$ over run $\cos\theta$. It is undefined when $\cos\theta = 0$, at $\theta = \frac\pi2$ and $\frac{3\pi}{2}$, where the radius is vertical. Three reciprocal functions complete the set: secant $\sec\theta = \frac{1}{\cos\theta}$, cosecant $\csc\theta = \frac{1}{\sin\theta}$ and cotangent $\cot\theta = \frac{\cos\theta}{\sin\theta}$.

:::def Tangent
$\tan\theta = \frac{\sin\theta}{\cos\theta}$, the slope of the line from the origin to the point at angle $\theta$ on the unit circle. Undefined where $\cos\theta = 0$.
:::

### Common mistakes
:::warn Watch out
- Swapping sine and cosine: cosine is the $x$-coordinate (horizontal), sine is the $y$-coordinate (height).
- Forgetting the sign: the reference angle gives the size, the quadrant gives the sign.
- Writing $\sin^2\theta$ as $\sin(\theta^2)$. $\sin^2\theta$ means $(\sin\theta)^2$.
- Using degree values in a calculator set to radians, or the reverse.
:::

### Summary
Walk angle $\theta$ around the unit circle from $(1, 0)$; the point you reach is $(\cos\theta, \sin\theta)$. This works for every angle and agrees with SOH CAH TOA for acute angles. Learn the exact values at $0, \frac\pi6, \frac\pi4, \frac\pi3, \frac\pi2$, use reference angles plus quadrant signs for everything else, and remember $\cos^2\theta + \sin^2\theta = 1$ and $\tan\theta = \frac{\sin\theta}{\cos\theta}$.

@viz unit-circle | Drag around the circle. Watch the sine (height) and cosine (width) trace waves.

:::explore
**What to try**
1. Drag the point to about $30°$ ($0.524$ rad). Check that $\sin\theta \approx 0.5$ and $\cos\theta \approx 0.866 = \frac{\sqrt3}{2}$.
2. Move into quadrant II, say $150°$. Sine is still $0.5$ but cosine is now $-0.866$: same reference angle, different sign.
3. Drag to $90°$ and watch $\tan\theta$ become undefined.
4. Press Play and watch the pink height trace out the sine wave on the right while the blue width traces cosine.
5. At any position, check the readout $\cos^2 + \sin^2 = 1$.

**What to notice:** the pink vertical segment is $\sin\theta$ and the blue horizontal segment is $\cos\theta$, exactly the coordinates from the definition. Their lengths are the legs of a right triangle with hypotenuse 1, which is the Pythagorean identity.
:::

:::formulas
$$(\cos\theta, \sin\theta) \text{ on } x^2 + y^2 = 1 \qquad \cos^2\theta + \sin^2\theta = 1$$
$$\tan\theta = \frac{\sin\theta}{\cos\theta},\ \sec\theta = \frac{1}{\cos\theta},\ \csc\theta = \frac{1}{\sin\theta},\ \cot\theta = \frac{\cos\theta}{\sin\theta}$$
$$\sin(-\theta) = -\sin\theta,\quad \cos(-\theta) = \cos\theta,\quad \sin(\pi - \theta) = \sin\theta,\quad \cos(\pi - \theta) = -\cos\theta$$
:::

:::thm Pythagorean identity
For every angle $\theta$, $\sin^2\theta + \cos^2\theta = 1$.
:::

:::proof From the circle
The point $(\cos\theta, \sin\theta)$ lies on the unit circle, whose equation is $x^2 + y^2 = 1$. Substituting $x = \cos\theta$ and $y = \sin\theta$ gives the identity.
:::

:::steps Find $\cos\frac{7\pi}{4}$ and $\sin\frac{7\pi}{4}$
1. $\frac{7\pi}{4} = 315°$ is in quadrant IV.
2. Reference angle: $2\pi - \frac{7\pi}{4} = \frac\pi4$.
3. In quadrant IV, cosine is positive and sine is negative.
4. $\cos\frac{7\pi}{4} = \frac{\sqrt2}{2}$ and $\sin\frac{7\pi}{4} = -\frac{\sqrt2}{2}$.
:::

:::steps Given $\sin\theta = -\frac{5}{13}$ with $\theta$ in quadrant III, find $\cos\theta$ and $\tan\theta$
1. $\cos^2\theta = 1 - \frac{25}{169} = \frac{144}{169}$, so $\cos\theta = \pm\frac{12}{13}$.
2. In quadrant III cosine is negative: $\cos\theta = -\frac{12}{13}$.
3. $\tan\theta = \frac{-5/13}{-12/13} = \frac{5}{12}$, positive as expected in quadrant III.
:::

:::steps A ladder 5 m long leans against a wall at $60°$ to the ground. How high does it reach?
1. The ladder is the hypotenuse and the height is opposite the $60°$ angle.
2. Height $= 5\sin 60° = 5 \cdot \frac{\sqrt3}{2} \approx 4.33$ m.
3. The foot is $5\cos 60° = 2.5$ m from the wall.
:::

:::mock Exam question
(a) Find the exact value of $\sin\frac{2\pi}{3} + \cos\frac{5\pi}{4}$. (b) Find all $\theta$ in $[0, 2\pi)$ with $\cos\theta = -\frac12$.
:::solution
(a) $\frac{2\pi}{3}$: quadrant II, reference $\frac\pi3$, sine positive, so $\frac{\sqrt3}{2}$. $\frac{5\pi}{4}$: quadrant III, reference $\frac\pi4$, cosine negative, so $-\frac{\sqrt2}{2}$. Sum: $\frac{\sqrt3 - \sqrt2}{2} \approx 0.159$.
(b) Reference angle with cosine $\frac12$ is $\frac\pi3$. Cosine is negative in quadrants II and III: $\theta = \pi - \frac\pi3 = \frac{2\pi}{3}$ and $\theta = \pi + \frac\pi3 = \frac{4\pi}{3}$.
:::
:::

:::ml
**Cosine similarity**, the standard way to compare embedding vectors in search and language models, is the cosine of the angle between two vectors: 1 means the same direction, 0 means unrelated (perpendicular) and $-1$ means opposite. Cyclic features like day of the year are encoded as $(\cos\theta, \sin\theta)$, a point on the unit circle, so December 31 and January 1 are neighbours.
:::

:::cs
Computer graphics rotates a point $(x, y)$ by angle $\theta$ using $x' = x\cos\theta - y\sin\theta$, $y' = x\sin\theta + y\cos\theta$. Every rotating sprite, map and 3D camera uses these formulas, built directly from the unit circle.
:::

:::real
On a Ferris wheel of radius 20 m whose centre is 25 m above the ground, a rider at angle $\theta$ (measured from the horizontal) is at height $25 + 20\sin\theta$. At $\theta = \frac\pi6$ the height is $25 + 10 = 35$ m.
:::

:::quiz
? What is $\sin\left(\frac{5\pi}{6}\right)$?
= 1/2|0.5
> $\frac{5\pi}6$ is in quadrant II with reference angle $\frac\pi6$; sine is positive there.

? What is $\cos(\pi)$?
= -1
> A half turn lands at $(-1, 0)$.

? In which quadrant is $\sin\theta < 0$ and $\cos\theta > 0$?
- I
- II
- III
+ IV
> Below the $x$-axis and to the right of the $y$-axis.

? If $\cos\theta = \frac{3}{5}$ and $\theta$ is acute, what is $\tan\theta$?
= 4/3
> $\sin\theta = \frac45$, so $\tan\theta = \frac{4/5}{3/5} = \frac43$.

? Where is $\tan\theta$ undefined?
- $\theta = 0$
+ $\theta = \frac{\pi}{2}$
- $\theta = \pi$
- $\theta = \frac{\pi}{4}$
> $\cos\frac\pi2 = 0$, so $\frac{\sin}{\cos}$ divides by zero.

? What is $\sin^2(1.2) + \cos^2(1.2)$?
= 1
> The Pythagorean identity holds for every angle.
:::

## Lesson: Graphs of trig functions {#trig-graphs}
@summary: The sine and cosine waves, amplitude, period, frequency, phase shift and midline, fitting a sinusoid to data, and the graph of tangent.

### Why waves?
Many things in the world repeat. Tides rise and fall about twice a day. Daylight hours swing up and down over a year. Your heart beats, a guitar string vibrates, alternating current reverses direction 50 or 60 times a second, and a sound wave pushes air back and forth. A function that repeats is called **periodic**, and the sine and cosine functions are the basic building blocks of periodic behaviour. In fact, a famous result (Fourier analysis) says that *any* reasonable periodic signal can be built by adding together sines and cosines. So learning to read and adjust a sine wave is learning the alphabet of signals.

### From the circle to the wave
In the last lesson, $\sin\theta$ was the height of a point moving around the unit circle. Now plot that height against the angle. Start at $\theta = 0$ with height 0. As $\theta$ grows to $\frac\pi2$, the height rises to 1. By $\pi$ it is back to 0, by $\frac{3\pi}{2}$ it reaches $-1$, and at $2\pi$ it returns to 0, having completed one full cycle. Then it repeats forever in both directions. The result is the **sine wave**.

Cosine, the horizontal position, gives the same shape shifted: it starts at its top, 1, at $\theta = 0$. In fact $\cos x = \sin\left(x + \frac\pi2\right)$: cosine is a sine wave moved left by a quarter of a cycle. Both have domain all real numbers and range $[-1, 1]$. Sine is odd (symmetric through the origin) and cosine is even (symmetric about the $y$-axis), which matches $\sin(-x) = -\sin x$ and $\cos(-x) = \cos x$.

@fig func kind=sine A=1 w=1 phi=0 d=0 | The basic sine wave y = sin x: one full cycle every 2π.

### An everyday scenario: hours of daylight
Imagine tracking the hours of daylight in a city through the year. In midsummer there are about 16 hours, in midwinter about 8, and in spring and autumn about 12. Plotted over a year, the values trace a smooth wave. To describe it with a formula, we need four numbers: how high the wave swings, how long one cycle lasts, where the cycle starts, and the average level. These four numbers are the amplitude, period, phase shift and midline, and they are exactly the transformation parameters from the transformations lesson applied to $\sin x$.

### The general sinusoid
The general sine wave, or **sinusoid**, is
$$y = A\sin\big(B(x - C)\big) + D.$$

**Amplitude** $|A|$: the vertical stretch. The wave swings $|A|$ units above and below its centre. The distance from a peak to a trough is $2|A|$. If $A$ is negative, the wave is flipped upside down.

**Period** $\frac{2\pi}{B}$ (with $B > 0$): the horizontal length of one cycle. Multiplying the input by $B$ squeezes the graph horizontally by $B$, so the period $2\pi$ shrinks to $\frac{2\pi}{B}$. For $\sin(3x)$ the period is $\frac{2\pi}{3}$; for $\sin\left(\frac{x}{2}\right)$ it is $4\pi$. The number of cycles per unit of $x$ is the **frequency**, $\frac{1}{\text{period}} = \frac{B}{2\pi}$, and $B$ itself is called the **angular frequency** (often written $\omega$).

**Phase shift** $C$: the horizontal shift. As always with inside changes, $x - C$ moves the graph **right** by $C$. A sine cycle normally starts (at its midline, going up) at $x = 0$; now it starts at $x = C$.

**Midline** $y = D$: the vertical shift, the average level the wave oscillates around. The maximum value is $D + |A|$ and the minimum is $D - |A|$.

### A worked reading
Take $y = 3\sin\left(2\left(x - \frac\pi4\right)\right) + 1$. The amplitude is 3, the period is $\frac{2\pi}{2} = \pi$, the phase shift is $\frac\pi4$ to the right, and the midline is $y = 1$. So the wave runs between $1 - 3 = -2$ and $1 + 3 = 4$. One cycle starts at $x = \frac\pi4$ (height 1, rising), peaks a quarter period later at $x = \frac\pi4 + \frac\pi4 = \frac\pi2$ (height 4), returns to the midline at $x = \frac{3\pi}{4}$, hits its minimum at $x = \pi$ (height $-2$), and finishes at $x = \frac{5\pi}{4}$.

A useful habit is to split one period into four equal quarters. The five key points (start, peak, middle, trough, end) occur at those quarter marks, and they are enough to sketch the whole wave accurately.

### Watch the factoring
Some formulas are written as $y = A\sin(Bx + \varphi) + D$, with the phase inside unfactored. To read the shift, factor out $B$: $\sin(2x - \pi) = \sin\left(2\left(x - \frac\pi2\right)\right)$, so the shift is $\frac\pi2$ right, not $\pi$. In general the shift is $-\frac{\varphi}{B}$.

### Fitting a sinusoid to data
Back to daylight. Suppose the maximum is 16 hours on day 172 (late June) and the minimum is 8 hours, and the cycle is 365 days. The midline is the average of max and min, $D = \frac{16 + 8}{2} = 12$. The amplitude is half the distance between them, $A = \frac{16 - 8}{2} = 4$. The period is 365, so $B = \frac{2\pi}{365}$. A cosine wave starts at its peak, so using cosine with the peak at day 172 gives
$$h(t) = 4\cos\left(\frac{2\pi}{365}(t - 172)\right) + 12.$$
Check: at $t = 172$, $h = 4 + 12 = 16$. Half a year later, at $t \approx 354.5$, the cosine is $-1$ and $h = 8$.

### The tangent graph
The tangent function $\tan x = \frac{\sin x}{\cos x}$ behaves very differently. It is zero where sine is zero ($x = 0, \pm\pi, \dots$) and undefined where cosine is zero ($x = \pm\frac\pi2, \pm\frac{3\pi}{2}, \dots$), where it has vertical asymptotes. Between asymptotes it rises from $-\infty$ to $+\infty$, passing through 0. Its period is $\pi$, not $2\pi$, because $\tan(x + \pi) = \frac{-\sin x}{-\cos x} = \tan x$. Its range is all real numbers.

:::def Periodic function
A function with $f(x + P) = f(x)$ for all $x$, for some $P > 0$. The smallest such $P$ is the **period**.
:::

:::def Amplitude, period, phase shift, midline
For $y = A\sin(B(x - C)) + D$: amplitude $|A|$, period $\frac{2\pi}{B}$, phase shift $C$ (to the right), midline $y = D$.
:::

### Common mistakes
:::warn Watch out
- Period is $\frac{2\pi}{B}$, not $B$ and not $2\pi B$. A bigger $B$ means a *shorter* period.
- Reading the phase shift without factoring: in $\sin(3x + \pi)$ the shift is $\frac\pi3$ left, not $\pi$.
- Giving a negative amplitude. Amplitude is $|A|$; the sign of $A$ means a flip.
- Thinking tangent has period $2\pi$. Its period is $\pi$.
:::

### Summary
Sine and cosine graphs are waves between $-1$ and $1$ with period $2\pi$, and cosine is sine shifted left by $\frac\pi2$. In $y = A\sin(B(x - C)) + D$, $|A|$ is the amplitude, $\frac{2\pi}{B}$ the period, $C$ the phase shift and $D$ the midline. Sketch with five key points per period. Tangent has period $\pi$ and vertical asymptotes where cosine is zero.

@viz func kind=sine | Tune amplitude, frequency, phase and midline.

:::explore
**What to try**
1. Move $A$ from 2 to 4. Peaks get taller; the readout's amplitude changes but the period does not.
2. Move $\omega$ from 1 to 2. Count the waves: twice as many, and the period drops from $6.28$ to $3.14$.
3. Move $\varphi$ and watch the wave slide sideways without changing shape. Positive $\varphi$ slides it left (the shift is $-\varphi/\omega$).
4. Move $d$ to 2 and see the whole wave lift; the midline in the readout follows.
5. Set $\varphi = 1.57$. The sine wave now looks exactly like a cosine wave.

**What to notice:** each slider controls exactly one feature, matching the four parameters in the article. Changing $\omega$ is the only slider that changes the period, and it acts inversely: bigger $\omega$, shorter period.
:::

:::formulas
$$y = A\sin(B(x - C)) + D:\ \text{amplitude } |A|,\ \text{period } \tfrac{2\pi}{B},\ \text{shift } C,\ \text{midline } D$$
$$\text{frequency } f = \frac{B}{2\pi} = \frac{1}{\text{period}}$$
$$\cos x = \sin\left(x + \tfrac\pi2\right) \qquad \tan(x + \pi) = \tan x$$
$$\max = D + |A|,\quad \min = D - |A|$$
:::

:::thm Period under horizontal scaling
If $f$ has period $P$, then $f(Bx)$ has period $\frac{P}{|B|}$ for $B \ne 0$.
:::

:::proof
$f(B(x + \frac{P}{B})) = f(Bx + P) = f(Bx)$, so $\frac{P}{|B|}$ is a period of $f(Bx)$. A smaller period for $f(Bx)$ would give, by the same argument in reverse, a period of $f$ smaller than $P$, which is impossible.
:::

:::steps Describe $y = -2\cos(4x) + 3$
1. Amplitude $|-2| = 2$; the negative sign flips the wave, so it starts at a minimum.
2. Period $\frac{2\pi}{4} = \frac\pi2$.
3. No phase shift; midline $y = 3$.
4. Range: from $3 - 2 = 1$ to $3 + 2 = 5$. At $x = 0$, $y = -2 + 3 = 1$, the minimum.
:::

:::steps Find the phase shift and period of $y = \sin(2x + \frac{\pi}{3})$
1. Factor out 2: $2x + \frac\pi3 = 2\left(x + \frac\pi6\right)$.
2. Phase shift: $\frac\pi6$ to the left.
3. Period: $\frac{2\pi}{2} = \pi$.
:::

:::steps Write a sinusoid with maximum 10, minimum 2, and period 4, with a maximum at $x = 0$
1. Midline $D = \frac{10 + 2}{2} = 6$, amplitude $A = \frac{10 - 2}{2} = 4$.
2. $B = \frac{2\pi}{4} = \frac\pi2$.
3. Cosine starts at a maximum, so $y = 4\cos\left(\frac\pi2 x\right) + 6$.
4. Check: $x = 2$ gives $4\cos\pi + 6 = 2$, the minimum, half a period later.
:::

:::mock Exam question
The depth of water in a harbour varies sinusoidally. High tide of 9 m occurs at 3 am and the next low tide of 3 m occurs at 9:15 am. (a) Find the amplitude, midline and period. (b) Write a model $d(t)$, with $t$ in hours after midnight. (c) What is the depth at 6 am?
:::solution
(a) Amplitude $\frac{9 - 3}{2} = 3$ m, midline $\frac{9 + 3}{2} = 6$ m. High to low is half a period, 6.25 h, so the period is 12.5 h.
(b) Use cosine with its peak at $t = 3$: $d(t) = 3\cos\left(\frac{2\pi}{12.5}(t - 3)\right) + 6$.
(c) $d(6) = 3\cos\left(\frac{2\pi \cdot 3}{12.5}\right) + 6 = 3\cos(1.508) + 6 \approx 3(0.063) + 6 \approx 6.19$ m.
:::
:::

:::ml
Transformers encode the position of each token with sines and cosines of many frequencies: $PE(pos, 2i) = \sin\left(pos / 10000^{2i/d}\right)$ and $PE(pos, 2i+1) = \cos\left(pos / 10000^{2i/d}\right)$. Low-frequency waves change slowly and capture coarse position; high-frequency waves capture fine position, so together they give each position a unique pattern. Fourier features ($\sin(2\pi f x)$, $\cos(2\pi f x)$) help neural networks learn detailed functions such as images in NeRF models.
:::

:::cs
Digital audio stores samples of waves. A pure tone of frequency $f$ Hz is $\sin(2\pi f t)$; concert A is 440 Hz. The Fast Fourier Transform breaks any recorded signal into its component sine waves, which is how equalizers, MP3 compression and spectrograms work.
:::

:::real
Household electricity in Europe is close to $V(t) = 325\sin(2\pi \cdot 50\, t)$ volts: amplitude 325 V, frequency 50 Hz, period $\frac{1}{50} = 0.02$ s. (The "230 V" rating is the root-mean-square value, $\frac{325}{\sqrt2} \approx 230$.)
:::

:::quiz
? What is the period of $y = \sin(4x)$?
+ $\frac\pi2$
- $4\pi$
- $\frac\pi4$
- $2\pi$
> $\frac{2\pi}{4} = \frac{\pi}{2}$.

? What is the amplitude of $y = -3\cos(x) + 1$?
= 3
> Amplitude is $|A| = 3$; the minus sign only flips the wave.

? What is the maximum value of $y = 2\sin x + 5$?
= 7
> $D + |A| = 5 + 2 = 7$.

? What is the period of $y = \tan x$?
- $2\pi$
+ $\pi$
- $\frac{\pi}{2}$
- $4\pi$
> $\tan(x + \pi) = \tan x$.

? $y = \sin\left(x - \frac{\pi}{3}\right)$ is $\sin x$ shifted...
+ right by $\frac\pi3$
- left by $\frac\pi3$
- up by $\frac\pi3$
- down by $\frac\pi3$
> Inside $x - C$ moves the graph right by $C$.

? A wave repeats 5 times per second. What is its period in seconds?
= 1/5|0.2
> Period is $\frac{1}{\text{frequency}} = \frac15$ s.
:::

## Lesson: Trig identities {#trig-identities}
@summary: The Pythagorean identities, symmetry identities, angle-sum and difference formulas, double- and half-angle formulas, how to prove identities, and how to use them to solve trig equations.

### What an identity is, and why we need them
An **equation** like $\sin x = \frac12$ is true only for certain values of $x$. An **identity** like $\sin^2 x + \cos^2 x = 1$ is true for *every* value of $x$. Identities are rewriting rules: they let you swap one expression for another that is equal but more useful. That is exactly what you did in algebra with $(a + b)^2 = a^2 + 2ab + b^2$. In trigonometry, identities let you simplify messy expressions, compute exact values such as $\cos 75°$ without a calculator, solve equations, and (in calculus) integrate things like $\sin^2 x$ that look impossible at first.

### An everyday picture: different names for the same thing
Think of the number of eggs in "a dozen", "12", "6 + 6" and "3 × 4". All are the same quantity, but each is handy in a different situation: "6 + 6" if you are splitting between two people, "3 × 4" if you are arranging them in a grid. Trig identities are the same idea. $\sin 2x$ and $2\sin x\cos x$ are the same function; one form is short, and the other is better when you need to factor.

### The Pythagorean identities
The point $(\cos\theta, \sin\theta)$ lies on the unit circle, so
$$\sin^2\theta + \cos^2\theta = 1.$$
This single fact is used more than any other. It lets you find one of $\sin\theta$ and $\cos\theta$ from the other (up to sign). If $\sin\theta = 0.6$, then $\cos^2\theta = 1 - 0.36 = 0.64$, so $\cos\theta = \pm 0.8$, with the sign fixed by the quadrant.

Dividing the identity by $\cos^2\theta$ gives a second version, and dividing by $\sin^2\theta$ gives a third:
$$\tan^2\theta + 1 = \sec^2\theta, \qquad 1 + \cot^2\theta = \csc^2\theta.$$
You do not need to memorise these separately; derive them from the first whenever needed.

### Symmetry identities
The unit circle's mirror symmetries give a family of quick rules. Reflecting across the $x$-axis turns angle $\theta$ into $-\theta$, keeping the $x$-coordinate and flipping the $y$-coordinate: $\cos(-\theta) = \cos\theta$ and $\sin(-\theta) = -\sin\theta$. Reflecting across the $y$-axis turns $\theta$ into $\pi - \theta$: $\sin(\pi - \theta) = \sin\theta$ and $\cos(\pi - \theta) = -\cos\theta$. Reflecting across the line $y = x$ turns $\theta$ into $\frac\pi2 - \theta$ and swaps the coordinates: $\sin\left(\frac\pi2 - \theta\right) = \cos\theta$. That last rule is where the name "co-sine" comes from: the cosine of an angle is the sine of its **complementary** angle. For example, $\sin 30° = \cos 60° = \frac12$.

### Angle-sum and difference formulas
Is $\sin(a + b)$ equal to $\sin a + \sin b$? Test with $a = b = 90°$: $\sin 180° = 0$, but $\sin 90° + \sin 90° = 2$. So no. The correct formulas are
$$\sin(a \pm b) = \sin a\cos b \pm \cos a\sin b,$$
$$\cos(a \pm b) = \cos a\cos b \mp \sin a\sin b.$$
Notice the sign flip in the cosine formula: $\cos(a + b)$ has a minus. A short way to remember: sine mixes ("sin cos, cos sin") and keeps the sign; cosine keeps like with like ("cos cos, sin sin") and flips the sign.

These formulas let you compute exact values for new angles from known ones. Since $15° = 45° - 30°$,
$$\sin 15° = \sin 45°\cos 30° - \cos 45°\sin 30° = \frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2} - \frac{\sqrt2}{2}\cdot\frac12 = \frac{\sqrt6 - \sqrt2}{4} \approx 0.2588.$$
A calculator agrees: $\sin 15° \approx 0.2588$.

Dividing the sine formula by the cosine formula gives the tangent version:
$$\tan(a + b) = \frac{\tan a + \tan b}{1 - \tan a\tan b}.$$

### Why the sum formulas are true
Here is a geometric idea. Rotating the point $(\cos a, \sin a)$ by a further angle $b$ lands on $(\cos(a + b), \sin(a + b))$. A rotation by $b$ sends any point $(x, y)$ to $(x\cos b - y\sin b,\ x\sin b + y\cos b)$, because it sends $(1, 0)$ to $(\cos b, \sin b)$ and $(0, 1)$ to $(-\sin b, \cos b)$, and rotations preserve sums and scalings. Applying this to $(x, y) = (\cos a, \sin a)$ gives exactly $\cos a\cos b - \sin a\sin b$ and $\cos a\sin b + \sin a\cos b$. Later in this course, Euler's formula gives an even shorter proof.

### Double-angle formulas
Set $b = a$ in the sum formulas:
$$\sin 2a = 2\sin a\cos a, \qquad \cos 2a = \cos^2 a - \sin^2 a.$$
Using $\sin^2 a + \cos^2 a = 1$, the cosine version has two other forms: $\cos 2a = 1 - 2\sin^2 a = 2\cos^2 a - 1$. Check with $a = 30°$: $\cos 60° = \frac12$ and $1 - 2\left(\frac12\right)^2 = \frac12$.

### Half-angle and power-reducing formulas
Solving the double-angle forms for the squares gives the **power-reducing** formulas:
$$\sin^2 a = \frac{1 - \cos 2a}{2}, \qquad \cos^2 a = \frac{1 + \cos 2a}{2}.$$
They turn a square into a first power of a cosine at double the angle, which is essential in calculus and signal processing. Replacing $a$ by $\frac{\theta}{2}$ gives the half-angle formulas, for example $\cos\frac\theta2 = \pm\sqrt{\frac{1 + \cos\theta}{2}}$.

### How to prove an identity
To show that an equation is an identity, start from one side (usually the more complicated one) and transform it step by step into the other side, using known identities and algebra. Do not "do the same thing to both sides" as if solving, because that can hide mistakes. Useful moves: write everything in terms of $\sin$ and $\cos$, combine fractions, factor, and look for $\sin^2 + \cos^2$.

For instance, prove $\frac{1 - \cos^2 x}{\sin x\cos x} = \tan x$. The numerator is $\sin^2 x$ by the Pythagorean identity, so the left side is $\frac{\sin^2 x}{\sin x\cos x} = \frac{\sin x}{\cos x} = \tan x$.

### Using identities to solve equations
Identities turn hard equations into easy ones. Solve $\sin 2x = \sin x$ for $0 \le x < 2\pi$. Replace $\sin 2x$ with $2\sin x\cos x$: $2\sin x\cos x - \sin x = 0$, so $\sin x(2\cos x - 1) = 0$. Either $\sin x = 0$, giving $x = 0$ or $\pi$, or $\cos x = \frac12$, giving $x = \frac\pi3$ or $\frac{5\pi}{3}$. Four solutions. Notice we factored rather than divided by $\sin x$, which would have lost the solutions where $\sin x = 0$.

:::def Identity
An equation that is true for every value of the variable for which both sides are defined, such as $\sin^2 x + \cos^2 x = 1$.
:::

:::def Complementary angles
Two angles adding to $\frac\pi2$ ($90°$). The sine of one equals the cosine of the other: $\sin\left(\frac\pi2 - \theta\right) = \cos\theta$.
:::

### A strategy for choosing an identity
With so many identities, beginners often ask which one to use. Look at what the problem contains and what it wants. If you see a square of sine or cosine, think Pythagorean or power-reducing. If you see a sum or difference of angles, use the angle-sum formulas. If you see an angle and its double together, rewrite the double angle so that everything uses the same angle. Converting everything to one function of one angle is usually the goal.

### Common mistakes
:::warn Watch out
- $\sin(a + b) \ne \sin a + \sin b$ and $\sin 2x \ne 2\sin x$.
- The cosine sum formula has a minus: $\cos(a + b) = \cos a\cos b - \sin a\sin b$.
- Dividing both sides of a trig equation by $\sin x$ or $\cos x$ loses the solutions where it is zero. Factor instead.
- Taking $\sqrt{\ }$ and forgetting $\pm$; the quadrant decides the sign.
:::

### Summary
Identities are true for all angles and let you rewrite expressions. The core is $\sin^2 + \cos^2 = 1$; the symmetry rules come from reflecting the unit circle; the sum formulas come from rotation; double-angle and power-reducing formulas follow from the sum formulas. Prove identities by transforming one side into the other, and solve equations by rewriting and factoring.

@viz unit-circle | Drag the point and check the Pythagorean identity, then compare angles θ and π − θ.

:::explore
**What to try**
1. Drag to any angle and confirm the readout shows $\cos^2 + \sin^2 = 1$. Try angles in all four quadrants.
2. Drag to $\theta = 40°$ and note $\sin\theta$. Then drag to $140°$ ($= 180° - 40°$). The sine is the same and the cosine has flipped sign: $\sin(\pi - \theta) = \sin\theta$.
3. Compare $30°$ and $60°$: the sine of one is the cosine of the other, the complementary-angle rule.
4. Compare $40°$ with $-40°$ (that is, $320°$): same cosine, opposite sine.

**What to notice:** every symmetry identity in the article is a mirror reflection of the point on the circle, and the Pythagorean identity is the circle's own equation.
:::

@viz func kind=sine A=1 w=2 | This is sin(2x). Compare its shape with 2 sin x cos x by setting A and ω.

:::explore
**What to try**
1. With $A = 1$, $\omega = 2$, note the period is $\pi$ and the peak height is 1. This is $\sin 2x = 2\sin x\cos x$.
2. Set $A = 2$, $\omega = 1$: this is $2\sin x$, a different curve with peak 2 and period $2\pi$. It shows $\sin 2x \ne 2\sin x$.
3. Set $A = 0.5$, $\omega = 2$, $d = 0.5$, and $\varphi = -1.57$. This is $\frac12 - \frac12\cos 2x$, which by the power-reducing formula equals $\sin^2 x$: it stays between 0 and 1.

**What to notice:** squaring $\sin x$ doubles the frequency and lifts the wave so it never goes negative, exactly as $\sin^2 x = \frac{1 - \cos 2x}{2}$ predicts.
:::

:::formulas
$$\sin^2\theta + \cos^2\theta = 1,\quad 1 + \tan^2\theta = \sec^2\theta,\quad 1 + \cot^2\theta = \csc^2\theta$$
$$\sin(a \pm b) = \sin a\cos b \pm \cos a\sin b$$
$$\cos(a \pm b) = \cos a\cos b \mp \sin a\sin b$$
$$\tan(a + b) = \frac{\tan a + \tan b}{1 - \tan a\tan b}$$
$$\sin 2a = 2\sin a\cos a,\quad \cos 2a = \cos^2 a - \sin^2 a = 1 - 2\sin^2 a = 2\cos^2 a - 1$$
$$\sin^2 a = \tfrac{1 - \cos 2a}{2},\quad \cos^2 a = \tfrac{1 + \cos 2a}{2}$$
:::

:::thm Angle-addition formulas
For all angles $a, b$: $\cos(a + b) = \cos a\cos b - \sin a\sin b$ and $\sin(a + b) = \sin a\cos b + \cos a\sin b$.
:::

:::proof Double-angle and power-reducing formulas from the sum formulas
Put $b = a$: $\sin 2a = \sin a\cos a + \cos a\sin a = 2\sin a\cos a$, and $\cos 2a = \cos^2 a - \sin^2 a$. Replace $\cos^2 a$ with $1 - \sin^2 a$ to get $\cos 2a = 1 - 2\sin^2 a$, and solve for $\sin^2 a = \frac{1 - \cos 2a}{2}$. Similarly, replacing $\sin^2 a$ with $1 - \cos^2 a$ gives $\cos 2a = 2\cos^2 a - 1$ and $\cos^2 a = \frac{1 + \cos 2a}{2}$.
:::

:::steps Find $\cos 75°$ exactly
1. $75° = 45° + 30°$.
2. $\cos(45° + 30°) = \cos45°\cos30° - \sin45°\sin30°$.
3. $= \frac{\sqrt2}2\cdot\frac{\sqrt3}2 - \frac{\sqrt2}2\cdot\frac12 = \frac{\sqrt6 - \sqrt2}{4} \approx 0.2588$.
:::

:::steps If $\sin a = \frac35$ with $a$ acute, find $\sin 2a$ and $\cos 2a$
1. $\cos a = \sqrt{1 - \frac{9}{25}} = \frac45$ (positive, since $a$ is acute).
2. $\sin 2a = 2 \cdot \frac35 \cdot \frac45 = \frac{24}{25}$.
3. $\cos 2a = 1 - 2 \cdot \frac{9}{25} = \frac{7}{25}$.
4. Check: $\left(\frac{24}{25}\right)^2 + \left(\frac{7}{25}\right)^2 = \frac{576 + 49}{625} = 1$.
:::

:::steps Solve $2\cos^2 x - \cos x - 1 = 0$ for $0 \le x < 2\pi$
1. Treat it as a quadratic in $c = \cos x$: $2c^2 - c - 1 = (2c + 1)(c - 1) = 0$.
2. $\cos x = 1$ gives $x = 0$.
3. $\cos x = -\frac12$ gives $x = \frac{2\pi}{3}$ or $\frac{4\pi}{3}$.
4. Solutions: $0, \frac{2\pi}{3}, \frac{4\pi}{3}$.
:::

:::mock Exam question
(a) Prove that $\dfrac{\sin 2x}{1 + \cos 2x} = \tan x$. (b) Hence find the exact value of $\tan 15°$.
:::solution
(a) Use $\sin 2x = 2\sin x\cos x$ and $1 + \cos 2x = 1 + (2\cos^2 x - 1) = 2\cos^2 x$. The left side becomes $\frac{2\sin x\cos x}{2\cos^2 x} = \frac{\sin x}{\cos x} = \tan x$.
(b) With $x = 15°$: $\tan 15° = \frac{\sin 30°}{1 + \cos 30°} = \frac{1/2}{1 + \sqrt3/2} = \frac{1}{2 + \sqrt3}$. Multiply top and bottom by $2 - \sqrt3$: $\frac{2 - \sqrt3}{4 - 3} = 2 - \sqrt3 \approx 0.268$.
:::
:::

:::ml
Rotary position embeddings (RoPE) rely on the angle-sum formulas: rotating a query by angle $m\theta$ and a key by $n\theta$ makes their dot product depend only on $(m - n)\theta$, the relative position, because $\cos(m\theta)\cos(n\theta) + \sin(m\theta)\sin(n\theta) = \cos((m - n)\theta)$. Sinusoidal positional encodings use the same fact so that a fixed offset is a fixed linear transformation.
:::

:::cs
Graphics code composes rotations: rotating by $a$ then by $b$ equals rotating by $a + b$, which is the angle-sum formulas written as a matrix product. Signal processing uses product-to-sum identities such as $\sin a\cos b = \frac12[\sin(a + b) + \sin(a - b)]$ to explain how radio mixing shifts frequencies.
:::

:::real
When two musical notes with close frequencies play together, you hear "beats", a slow throbbing. The identity $\sin a + \sin b = 2\sin\frac{a + b}{2}\cos\frac{a - b}{2}$ explains it: the sum is a tone at the average frequency whose loudness rises and falls at the slow difference frequency. Musicians tune instruments by adjusting until the beats disappear.
:::

:::quiz
? If $\sin\theta = \frac35$ and $\theta$ is acute, what is $\cos\theta$?
= 4/5|0.8
> $\cos^2\theta = 1 - \frac9{25} = \frac{16}{25}$.

? Simplify $2\sin x\cos x$.
+ $\sin 2x$
- $\cos 2x$
- $\sin^2 x$
- $1$
> This is the double-angle formula for sine.

? Which is equal to $\cos(a + b)$?
- $\cos a + \cos b$
- $\cos a\cos b + \sin a\sin b$
+ $\cos a\cos b - \sin a\sin b$
- $\sin a\cos b + \cos a\sin b$
> The cosine sum formula has a minus sign.

? What is $\cos^2(15°) - \sin^2(15°)$?
= 0.866
> It is $\cos 30° = \frac{\sqrt3}{2} \approx 0.866$.

? $\sin\left(\frac{\pi}{2} - \theta\right)$ equals...
+ $\cos\theta$
- $-\sin\theta$
- $\sin\theta$
- $-\cos\theta$
> Complementary angles: the sine of one is the cosine of the other.

? If $\cos 2a = \frac{1}{9}$, what is $\sin^2 a$?
= 4/9
> $\sin^2 a = \frac{1 - \cos 2a}{2} = \frac{8/9}{2} = \frac49$.
:::

## Lesson: Inverse trig functions and trig equations {#inverse-trig}
@summary: Recovering an angle from a ratio with arcsin, arccos and arctan, why their ranges are restricted, atan2, and finding every solution of a trig equation.

### Running trigonometry backwards
So far you have gone from angles to ratios: given $\theta = 30°$, find $\sin\theta = \frac12$. Very often the question runs the other way. A ramp rises 1 metre over a horizontal run of 12 metres; what angle does it make with the ground? A robot arm's tip is at $(3, 4)$; what angle is the arm pointing? Here you know a ratio and want the angle. That is the job of the **inverse trigonometric functions**.

### An everyday scenario: the wheelchair ramp
Building codes often say a wheelchair ramp may rise at most 1 unit for every 12 units of horizontal run. The slope is $\frac{1}{12}$, which is the tangent of the ramp's angle: $\tan\theta = \frac{1}{12}$. To find $\theta$ we need "the angle whose tangent is $\frac{1}{12}$". That is written $\theta = \arctan\frac{1}{12} \approx 0.0831$ radians, about $4.76°$. Almost every practical angle measurement, from surveying to computer vision, ends with an inverse trig function like this.

### The problem: sine is not one-to-one
The inverse functions lesson taught that only one-to-one functions have inverses. Sine is far from one-to-one: $\sin\frac\pi6$, $\sin\frac{5\pi}{6}$, $\sin\frac{13\pi}{6}$ and infinitely many other angles all equal $\frac12$. If you ask "which angle has sine $\frac12$?", there are infinitely many correct answers. A function must give one output, so we make a choice: we **restrict the domain** of sine to an interval where it takes each value exactly once, and invert only that piece. This is the same trick that made $\sqrt{x}$ the inverse of $x^2$ on $[0, \infty)$.

### Arcsine
On the interval $\left[-\frac\pi2, \frac\pi2\right]$, sine increases steadily from $-1$ to $1$, hitting each value once. So we define
$$\arcsin x = \text{the angle } \theta \in \left[-\tfrac\pi2, \tfrac\pi2\right] \text{ with } \sin\theta = x.$$
Its domain is $[-1, 1]$ (sine never leaves that range) and its range is $\left[-\frac\pi2, \frac\pi2\right]$, the right half of the unit circle. Examples: $\arcsin\frac12 = \frac\pi6$, $\arcsin 1 = \frac\pi2$, $\arcsin\left(-\frac{\sqrt2}{2}\right) = -\frac\pi4$. And $\arcsin 2$ is undefined, because no angle has sine 2. The notation $\sin^{-1}x$ means the same thing, but beware: it does not mean $\frac{1}{\sin x}$.

### Arccosine
Cosine is not one-to-one on $\left[-\frac\pi2, \frac\pi2\right]$ (it is even), so it needs a different interval. On $[0, \pi]$, cosine decreases from 1 to $-1$, taking each value once. So
$$\arccos x = \text{the angle } \theta \in [0, \pi] \text{ with } \cos\theta = x.$$
Domain $[-1, 1]$, range $[0, \pi]$, the top half of the circle. Examples: $\arccos 0 = \frac\pi2$, $\arccos\left(-\frac12\right) = \frac{2\pi}{3}$, $\arccos 1 = 0$. Note that $\arccos$ of a negative number is an obtuse angle, while $\arcsin$ of a negative number is a negative angle.

### Arctangent
Tangent runs through every real value exactly once between its asymptotes at $\pm\frac\pi2$. So
$$\arctan x = \text{the angle } \theta \in \left(-\tfrac\pi2, \tfrac\pi2\right) \text{ with } \tan\theta = x.$$
Its domain is all real numbers and its range is the open interval $\left(-\frac\pi2, \frac\pi2\right)$. Examples: $\arctan 1 = \frac\pi4$, $\arctan\left(-\sqrt3\right) = -\frac\pi3$, $\arctan 0 = 0$. As $x \to \infty$, $\arctan x$ approaches $\frac\pi2$ but never reaches it, so its graph is an S-shaped curve with horizontal asymptotes $y = \pm\frac\pi2$.

### Inverse rules and their limits
By the definition of an inverse, $\sin(\arcsin x) = x$ for every $x$ in $[-1, 1]$. But $\arcsin(\sin\theta) = \theta$ only when $\theta$ is in the restricted range. For example, $\arcsin\left(\sin\frac{5\pi}{6}\right) = \arcsin\frac12 = \frac\pi6$, not $\frac{5\pi}{6}$. The inverse function always returns its "official" angle, the one in its range.

### Composite expressions with a triangle
To evaluate something like $\cos\left(\arcsin\frac35\right)$, draw a picture. Let $\theta = \arcsin\frac35$, so $\sin\theta = \frac35$ with $\theta$ in the first quadrant (since $\frac35 > 0$). Draw a right triangle with opposite side 3 and hypotenuse 5; Pythagoras gives adjacent side 4. So $\cos\theta = \frac45$. The same technique gives formulas, for example $\cos(\arcsin x) = \sqrt{1 - x^2}$.

### atan2: the angle of a point
To find the direction of a point $(x, y)$, it is tempting to compute $\arctan\frac{y}{x}$. But $\arctan$ only returns angles in quadrants I and IV. The points $(1, 1)$ and $(-1, -1)$ give the same ratio $\frac{y}{x} = 1$, yet they point in opposite directions ($45°$ and $225°$). The two-argument function $\operatorname{atan2}(y, x)$ fixes this by looking at the signs of both coordinates, and it also handles $x = 0$. It returns an angle in $(-\pi, \pi]$: $\operatorname{atan2}(1, -1) = \frac{3\pi}{4}$ and $\operatorname{atan2}(-1, -1) = -\frac{3\pi}{4}$.

### Solving trig equations: finding every solution
An inverse trig function gives *one* solution; usually there are more. To solve $\sin x = 0.6$ for $0 \le x < 2\pi$: first $x_1 = \arcsin 0.6 \approx 0.6435$. Sine is also positive in quadrant II, at the mirror angle $\pi - x_1 \approx 2.498$. So there are two solutions in one turn. If all real solutions are wanted, add any whole number of full turns: $x = 0.6435 + 2\pi k$ or $x = 2.498 + 2\pi k$.

The general patterns are: for $\sin x = c$, use $\alpha = \arcsin c$ and $\pi - \alpha$; for $\cos x = c$, use $\alpha = \arccos c$ and $-\alpha$ (equivalently $2\pi - \alpha$); for $\tan x = c$, use $\alpha = \arctan c$ plus multiples of $\pi$, because tangent repeats every $\pi$.

If the equation involves a multiple angle, such as $\cos 2x = \frac12$ on $[0, 2\pi)$, solve for $2x$ first over $[0, 4\pi)$: $2x = \frac\pi3, \frac{5\pi}{3}, \frac{7\pi}{3}, \frac{11\pi}{3}$. Then halve: $x = \frac\pi6, \frac{5\pi}{6}, \frac{7\pi}{6}, \frac{11\pi}{6}$. Doubling the angle doubles the number of solutions.

:::def Arcsine, arccosine, arctangent
$\arcsin x \in \left[-\frac\pi2, \frac\pi2\right]$, $\arccos x \in [0, \pi]$ and $\arctan x \in \left(-\frac\pi2, \frac\pi2\right)$ are the unique angles in those ranges whose sine, cosine or tangent is $x$.
:::

:::def atan2
$\operatorname{atan2}(y, x)$ is the angle in $(-\pi, \pi]$ from the positive $x$-axis to the point $(x, y)$, using the signs of both coordinates to pick the correct quadrant.
:::

### Checking answers
Because inverse trig answers are easy to get subtly wrong, always check by going forwards. If you found $x = \frac{4\pi}{3}$ as a solution of $\sin x = -\frac{\sqrt3}{2}$, compute $\sin\frac{4\pi}{3}$ and confirm it really is $-\frac{\sqrt3}{2}$. This takes seconds and catches quadrant errors.

### Common mistakes
:::warn Watch out
- $\sin^{-1}x$ means $\arcsin x$, not $\frac{1}{\sin x}$ (that is $\csc x$).
- Stopping at one solution. The calculator gives one angle; use symmetry to find the others in the interval.
- $\arcsin(\sin\theta) = \theta$ only if $\theta$ is in $\left[-\frac\pi2, \frac\pi2\right]$.
- Using $\arctan(y/x)$ for a point's direction. It is wrong in quadrants II and III; use atan2.
:::

### Summary
Inverse trig functions turn ratios back into angles. Because trig functions repeat, each inverse is defined on a restricted range: $\arcsin$ and $\arctan$ return angles near zero on the right half of the circle, and $\arccos$ returns angles in $[0, \pi]$. Use triangles to evaluate compositions, atan2 for the direction of a point, and symmetry plus periodicity to find all solutions of a trig equation.

@viz inverse | Restricting a function to a one-to-one piece is what makes an inverse possible.

:::explore
**What to try**
1. Choose $x^2\ (x \ge 0)$. Only half the parabola is shown, and its mirror is $\sqrt x$. This is the same restriction trick used for arcsine.
2. Choose $x^3$, which needs no restriction because it already passes the horizontal line test.
3. Drag the point and watch the coordinates swap between $f$ and $f^{-1}$.

**What to notice:** sine, like $x^2$, fails the horizontal line test on its full domain. Keeping only $\left[-\frac\pi2, \frac\pi2\right]$ is the analogue of keeping $x \ge 0$, and arcsine is the mirror image of that piece across $y = x$.
:::

@viz unit-circle | Find both angles in one turn that share the same sine.

:::explore
**What to try**
1. Drag the point until $\sin\theta \approx 0.6$ in quadrant I. Note the angle (about $0.64$ rad).
2. Now find the other point with $\sin\theta \approx 0.6$: it is in quadrant II, at about $2.50$ rad $= \pi - 0.64$.
3. Do the same for $\cos\theta = -0.5$: you should find $\frac{2\pi}{3} \approx 2.09$ and $\frac{4\pi}{3} \approx 4.19$.

**What to notice:** a horizontal line at height $c$ crosses the circle at two points, mirror images across the $y$-axis. Arcsine reports only the one on the right half; the article's "$\pi - \alpha$" rule finds the other.
:::

:::formulas
$$\arcsin: [-1, 1] \to \left[-\tfrac\pi2, \tfrac\pi2\right],\quad \arccos: [-1, 1] \to [0, \pi],\quad \arctan: \mathbb{R} \to \left(-\tfrac\pi2, \tfrac\pi2\right)$$
$$\sin(\arcsin x) = x,\quad \cos(\arcsin x) = \sqrt{1 - x^2},\quad \arcsin x + \arccos x = \tfrac\pi2$$
$$\sin x = c:\ x = \alpha + 2\pi k \text{ or } \pi - \alpha + 2\pi k,\ \alpha = \arcsin c$$
$$\cos x = c:\ x = \pm\alpha + 2\pi k,\ \alpha = \arccos c \qquad \tan x = c:\ x = \arctan c + \pi k$$
:::

:::thm Complementary inverses
For every $x$ in $[-1, 1]$, $\arcsin x + \arccos x = \frac\pi2$.
:::

:::proof
Let $\theta = \arcsin x$, so $\theta \in \left[-\frac\pi2, \frac\pi2\right]$ and $\sin\theta = x$. Then $\frac\pi2 - \theta \in [0, \pi]$ and $\cos\left(\frac\pi2 - \theta\right) = \sin\theta = x$. Since arccos returns the unique angle in $[0, \pi]$ with cosine $x$, $\arccos x = \frac\pi2 - \theta$. Adding gives the result.
:::

:::steps Evaluate $\tan\left(\arccos\left(-\frac{5}{13}\right)\right)$
1. Let $\theta = \arccos\left(-\frac{5}{13}\right)$. Then $\cos\theta = -\frac{5}{13}$ and $\theta \in [0, \pi]$, so $\theta$ is in quadrant II.
2. $\sin\theta = \sqrt{1 - \frac{25}{169}} = \frac{12}{13}$ (positive in quadrant II).
3. $\tan\theta = \frac{12/13}{-5/13} = -\frac{12}{5}$.
:::

:::steps Solve $2\sin x + \sqrt3 = 0$ for $0 \le x < 2\pi$
1. $\sin x = -\frac{\sqrt3}{2}$.
2. Reference angle: $\frac\pi3$. Sine is negative in quadrants III and IV.
3. $x = \pi + \frac\pi3 = \frac{4\pi}{3}$ and $x = 2\pi - \frac\pi3 = \frac{5\pi}{3}$.
:::

:::steps A 10 m ladder reaches 8 m up a wall. Find the angle with the ground
1. $\sin\theta = \frac{8}{10} = 0.8$.
2. $\theta = \arcsin 0.8 \approx 0.9273$ rad $\approx 53.1°$.
3. Check with cosine: the foot is $\sqrt{100 - 64} = 6$ m out, and $\arccos 0.6 \approx 53.1°$ too.
:::

:::mock Exam question
(a) Find $\arcsin\left(\sin\frac{3\pi}{4}\right)$. (b) Find all solutions of $\tan 2x = 1$ in $[0, 2\pi)$. (c) Find the angle of the point $(-3, 3)$ measured counterclockwise from the positive $x$-axis.
:::solution
(a) $\sin\frac{3\pi}{4} = \frac{\sqrt2}{2}$, and $\arcsin\frac{\sqrt2}{2} = \frac\pi4$ (in the restricted range). Answer $\frac\pi4$.
(b) $2x = \frac\pi4 + \pi k$, so $x = \frac\pi8 + \frac{\pi k}{2}$. In $[0, 2\pi)$: $\frac\pi8, \frac{5\pi}{8}, \frac{9\pi}{8}, \frac{13\pi}{8}$.
(c) $\arctan\frac{3}{-3} = -\frac\pi4$ points into quadrant IV, but the point is in quadrant II. $\operatorname{atan2}(3, -3) = \frac{3\pi}{4}$ ($135°$).
:::
:::

:::ml
Inverse trig functions appear in geometry-aware models. The angle between two embedding vectors is $\arccos$ of their cosine similarity. The arctangent is a smooth S-shaped "squashing" function, like the sigmoid and $\tanh$ activations, mapping all reals into a bounded interval. Pose estimation and robotics models output angles, often via atan2 of two predicted numbers to avoid the jump at $\pm\pi$.
:::

:::cs
Always use `atan2(y, x)` in code, not `atan(y/x)`: it returns the correct quadrant and does not divide by zero when $x = 0$. Game engines use it to make a character face the mouse pointer; GPS software uses it to compute compass headings.
:::

:::real
A drone camera sees the top of a 30 m tower from 50 m away horizontally. The angle of elevation is $\arctan\frac{30}{50} = \arctan 0.6 \approx 31.0°$. Surveyors use exactly this calculation, run backwards, to measure heights they cannot climb.
:::

:::quiz
? $\arccos(0) = $
+ $\frac\pi2$
- $0$
- $\pi$
> $\cos\frac\pi2 = 0$ and $\frac\pi2$ is in $[0, \pi]$.

? What is $\arcsin\left(-\frac12\right)$ in degrees?
= -30
> The angle in $[-90°, 90°]$ with sine $-\frac12$ is $-30°$.

? What is the range of $\arctan x$?
- $[0, \pi]$
- $[-1, 1]$
+ $\left(-\frac\pi2, \frac\pi2\right)$
- all real numbers
> Tangent is inverted on the open interval between its asymptotes.

? How many solutions does $\sin x = 0.3$ have in $[0, 2\pi)$?
= 2
> One in quadrant I and its mirror in quadrant II.

? What is $\cos\left(\arcsin\frac{3}{5}\right)$?
= 4/5|0.8
> A 3-4-5 triangle: adjacent 4 over hypotenuse 5.

? Which is undefined?
- $\arctan 100$
+ $\arcsin 2$
- $\arccos(-1)$
- $\arcsin 0$
> No angle has sine 2; arcsine's domain is $[-1, 1]$.
:::

## Lesson: Solving any triangle: the laws of sines and cosines {#triangle-laws}
@summary: Extending trigonometry beyond right triangles with the law of sines, the law of cosines, the ambiguous case, and the area formula ½ab sin C.

### Beyond right triangles
SOH CAH TOA only works when the triangle has a right angle. Most triangles in the real world do not: the triangle formed by two cell towers and a phone, by three cities on a map, or by the arms of a robot. Surveyors, navigators and engineers need to find unknown sides and angles of *any* triangle from a few measurements. Two formulas do almost all of that work: the **law of sines** and the **law of cosines**. Both come straight from the unit-circle definitions you already know.

### An everyday scenario: measuring across a lake
Imagine you want the distance between two trees, A and B, on opposite sides of a lake. You cannot stretch a tape measure across the water. But you can stand at a point C on the shore, measure the distance to each tree (say $CA = 120$ m and $CB = 150$ m), and measure the angle between the two directions ($\angle C = 70°$). Two sides and the angle between them pin down the triangle completely, so the distance $AB$ is determined. The law of cosines computes it: $AB^2 = 120^2 + 150^2 - 2 \cdot 120 \cdot 150\cos 70° \approx 14400 + 22500 - 12313 = 24587$, so $AB \approx 156.8$ m.

### Labels
The standard labelling makes the formulas easy to read. Name the corners $A$, $B$, $C$, and use the same letters for the angles there. Name each side with the lower-case letter of the **opposite** corner: side $a$ is opposite angle $A$ (it joins $B$ and $C$), side $b$ is opposite $B$, and side $c$ is opposite $C$. The angles always add to $180°$, or $\pi$ radians.

### The law of cosines
$$c^2 = a^2 + b^2 - 2ab\cos C.$$
It is Pythagoras's theorem with a correction term. When $C = 90°$, $\cos C = 0$ and it becomes $c^2 = a^2 + b^2$. When $C$ is acute, $\cos C > 0$, so $c^2$ is *less* than $a^2 + b^2$: the side opposite a sharp angle is shorter than it would be for a right angle. When $C$ is obtuse, $\cos C < 0$, the correction is added, and $c$ is longer. The same formula holds for any side by relabelling: $a^2 = b^2 + c^2 - 2bc\cos A$.

**Why it is true.** Place $C$ at the origin with side $b$ along the $x$-axis, so $A = (b, 0)$. The point $B$ is at distance $a$ from the origin in the direction of angle $C$, so by the unit-circle definition $B = (a\cos C, a\sin C)$. The distance formula gives
$$c^2 = (a\cos C - b)^2 + (a\sin C)^2 = a^2\cos^2 C - 2ab\cos C + b^2 + a^2\sin^2 C = a^2 + b^2 - 2ab\cos C,$$
using $\cos^2 C + \sin^2 C = 1$.

The law of cosines is used in two ways. If you know two sides and the angle between them (SAS), it gives the third side, as in the lake example. If you know all three sides (SSS), rearrange it to find any angle:
$$\cos C = \frac{a^2 + b^2 - c^2}{2ab}.$$
For a triangle with sides 5, 7 and 8, the angle opposite 7 has $\cos = \frac{25 + 64 - 49}{2 \cdot 5 \cdot 8} = \frac{40}{80} = \frac12$, so that angle is exactly $60°$.

### The law of sines
$$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}.$$
In words: each side divided by the sine of its opposite angle gives the same number for all three pairs. Bigger angles face bigger sides. This number has a beautiful meaning: it equals $2R$, the diameter of the circle through all three corners (the **circumcircle**).

**Why it is true.** Drop a perpendicular from $C$ to side $c$, with height $h$. In the right triangle containing $A$, $\sin A = \frac{h}{b}$, so $h = b\sin A$. In the one containing $B$, $h = a\sin B$. So $b\sin A = a\sin B$, which rearranges to $\frac{a}{\sin A} = \frac{b}{\sin B}$. The same argument with another height gives the third ratio.

The law of sines is the tool when you know an angle and its opposite side, plus one more piece. With two angles and any side (AAS or ASA), first find the third angle from the $180°$ total, then use the ratio. For example, if $A = 40°$, $B = 60°$ and $a = 10$, then $C = 80°$ and $b = \frac{10\sin 60°}{\sin 40°} \approx \frac{8.660}{0.6428} \approx 13.47$.

### The ambiguous case (SSA)
If you know two sides and an angle that is *not* between them, the information may fit zero, one or two triangles. Suppose $A = 30°$, $a = 6$ and $b = 10$. The law of sines gives $\sin B = \frac{10\sin 30°}{6} = \frac{5}{6} \approx 0.833$. One solution is $B \approx 56.4°$. But sine is also $0.833$ at $180° - 56.4° = 123.6°$, and $30° + 123.6° < 180°$, so that works too: two different triangles fit the data. Picture side $a$ as a swinging gate of length 6 hinged at $C$; it can reach the base line in two places. If instead $a$ were 4, we would get $\sin B = 1.25$, which is impossible, so no triangle exists. Always check the second angle $180° - B$.

### Area: one half a b sin C
The familiar area formula is $\frac12 \times \text{base} \times \text{height}$. Take $b$ as the base; the height from $B$ is $a\sin C$. So
$$\text{Area} = \tfrac12 ab\sin C.$$
Two sides and the included angle give the area directly. The lake triangle has area $\frac12 \cdot 120 \cdot 150 \cdot \sin 70° \approx 8457$ square metres. When all three sides are known, you can find an angle with the law of cosines first, or use Heron's formula: with $s = \frac{a + b + c}{2}$, the area is $\sqrt{s(s - a)(s - b)(s - c)}$.

### Choosing the right tool
Match the given information to the method. **SAS** (two sides, included angle): law of cosines for the third side. **SSS** (three sides): law of cosines for an angle. **ASA or AAS** (two angles and a side): angle sum, then law of sines. **SSA**: law of sines, then check for a second triangle. After finding an angle with the law of sines, a quick sanity check is that the largest angle faces the largest side.

:::def Law of cosines
In any triangle, $c^2 = a^2 + b^2 - 2ab\cos C$, where $C$ is the angle opposite side $c$.
:::

:::def Law of sines
In any triangle, $\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R$, where $R$ is the radius of the circumcircle.
:::

:::def Circumcircle
The circle passing through all three vertices of a triangle. Its radius $R$ satisfies $2R = \frac{a}{\sin A}$.
:::

### Common mistakes
:::warn Watch out
- Mismatched pairs in the law of sines: each side must go with its *opposite* angle.
- Forgetting the second solution in the SSA case; $\arcsin$ only gives the acute angle.
- Using the law of sines first in an SSS or SAS problem, where it has nothing to start from.
- Calculator in the wrong mode (degrees vs radians).
:::

### Summary
The law of cosines generalises Pythagoras and handles SAS and SSS triangles. The law of sines says side over sine of opposite angle is constant (equal to the circumcircle's diameter) and handles AAS, ASA and SSA, where SSA may have two answers. Area is $\frac12 ab\sin C$. With these, any triangle can be solved from three suitable measurements.

@viz g02-triangle | Drag the corners. The three law-of-sines ratios always agree, and they equal the diameter of the dashed circle.

:::explore
**What to try**
1. Drag any corner and watch the three ratios $\frac{a}{\sin A}$, $\frac{b}{\sin B}$, $\frac{c}{\sin C}$ in the readout: they stay equal to each other.
2. Toggle the circumcircle on and check that the common ratio matches its diameter (twice the radius).
3. Drag $C$ until angle $C$ is about $90°$. The law-of-cosines correction vanishes and $c^2 = a^2 + b^2$.
4. Make angle $C$ obtuse. Notice $c^2$ is now larger than $a^2 + b^2$, because $\cos C < 0$.
5. Watch the area readout as you drag $C$ along a line parallel to $AB$: the height stays the same, so the area does not change.

**What to notice:** the readout confirms both laws for every triangle you make, not just right triangles, and the angle sum is always $180°$, as the article's derivations required.
:::

:::formulas
$$c^2 = a^2 + b^2 - 2ab\cos C \qquad \cos C = \frac{a^2 + b^2 - c^2}{2ab}$$
$$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R$$
$$\text{Area} = \tfrac12 ab\sin C = \sqrt{s(s - a)(s - b)(s - c)},\quad s = \tfrac{a + b + c}{2}$$
$$A + B + C = \pi$$
:::

:::thm Law of cosines
For any triangle with sides $a, b, c$ and angle $C$ opposite $c$: $c^2 = a^2 + b^2 - 2ab\cos C$.
:::

:::proof Law of sines equals the circumdiameter
Let $O$ be the circumcentre and draw the diameter from $B$ through $O$, meeting the circle again at $D$. Angles inscribed in the same arc are equal, so $\angle BDC = A$ (if $A$ is acute), and $\angle BCD = 90°$ because it stands on a diameter. In right triangle $BCD$, $\sin A = \frac{BC}{BD} = \frac{a}{2R}$, so $\frac{a}{\sin A} = 2R$. The same holds for each side, so all three ratios equal $2R$. (The obtuse case uses $\sin(180° - A) = \sin A$.)
:::

:::steps Find side $c$ and angle $A$ when $a = 7$, $b = 9$, $C = 50°$
1. SAS, so use the law of cosines: $c^2 = 49 + 81 - 126\cos 50° \approx 130 - 126(0.6428) \approx 49.01$.
2. $c \approx 7.00$.
3. For angle $A$: $\cos A = \frac{b^2 + c^2 - a^2}{2bc} \approx \frac{81 + 49.01 - 49}{2 \cdot 9 \cdot 7.00} \approx \frac{81.01}{126.0} \approx 0.643$.
4. $A \approx 50.0°$. (Here $a \approx c$, so $A \approx C$, a good check.) Then $B \approx 180° - 50° - 50° = 80°$.
:::

:::steps Two angles and a side: $A = 35°$, $B = 75°$, $c = 12$. Find $a$
1. $C = 180° - 35° - 75° = 70°$.
2. Law of sines: $a = \frac{c\sin A}{\sin C} = \frac{12\sin 35°}{\sin 70°} \approx \frac{12(0.5736)}{0.9397} \approx 7.32$.
:::

:::steps Ambiguous case: $A = 40°$, $a = 8$, $b = 11$. How many triangles?
1. $\sin B = \frac{11\sin 40°}{8} \approx \frac{11(0.6428)}{8} \approx 0.884$.
2. $B_1 = \arcsin 0.884 \approx 62.1°$. Then $C_1 \approx 77.9°$, which is valid.
3. $B_2 = 180° - 62.1° = 117.9°$. Then $A + B_2 = 157.9° < 180°$, so $C_2 \approx 22.1°$, also valid.
4. Two triangles fit the data.
:::

:::mock Exam question
A ship sails 40 km on a bearing that turns it, then changes course by $35°$ and sails 25 km more, so the angle between the two legs at the turning point is $145°$. (a) How far is it from its starting point? (b) What is the area of the triangle formed by the start, the turn and the finish?
:::solution
(a) The two legs and the included angle $145°$ form SAS. $d^2 = 40^2 + 25^2 - 2 \cdot 40 \cdot 25\cos 145° = 1600 + 625 - 2000(-0.8192) \approx 2225 + 1638.3 = 3863.3$, so $d \approx 62.2$ km.
(b) Area $= \frac12 \cdot 40 \cdot 25 \cdot \sin 145° \approx 500 \cdot 0.5736 \approx 286.8$ km².
:::
:::

:::ml
The law of cosines is the dot product in disguise: for vectors $u$ and $v$ with angle $\theta$ between them, $\|u - v\|^2 = \|u\|^2 + \|v\|^2 - 2\|u\|\|v\|\cos\theta$, and $u \cdot v = \|u\|\|v\|\cos\theta$. That is why **cosine similarity** $\frac{u \cdot v}{\|u\|\|v\|}$ measures the angle between embeddings, and why, for unit vectors, squared distance is $2 - 2\cos\theta$: nearest neighbours by distance and by cosine agree.
:::

:::cs
GPS and phone positioning use triangulation and trilateration: from known distances or angles to towers or satellites, the laws of sines and cosines locate the receiver. Robotics inverse kinematics uses the law of cosines to find the elbow angle of a two-link arm that must reach a given point.
:::

:::real
A surveyor at point C measures $CA = 120$ m, $CB = 150$ m and $\angle C = 70°$ to find the width of a lake: $AB = \sqrt{120^2 + 150^2 - 2(120)(150)\cos 70°} \approx 156.8$ m, all without crossing the water.
:::

:::quiz
? A triangle has $a = 3$, $b = 4$, $C = 60°$. Find $c^2$.
= 13
> $9 + 16 - 2\cdot3\cdot4\cdot\frac12 = 13$.

? Which law should you use first for a triangle with three known sides?
+ law of cosines
- law of sines
- SOH CAH TOA
> With SSS there is no known angle-side pair, so the law of sines has no starting point.

? In a triangle, $A = 30°$, $a = 5$. What is $\frac{b}{\sin B}$?
= 10
> All ratios equal $\frac{a}{\sin A} = \frac{5}{1/2} = 10$.

? What is the area of a triangle with sides 6 and 10 and included angle $30°$?
= 15
> $\frac12 \cdot 6 \cdot 10 \cdot \frac12 = 15$.

? If angle $C$ is obtuse, then $c^2$ is...
- less than $a^2 + b^2$
- equal to $a^2 + b^2$
+ greater than $a^2 + b^2$
> $\cos C < 0$, so $-2ab\cos C$ is positive.

? A triangle has sides 5, 7, 8. What is the cosine of the angle opposite the side 7?
= 1/2|0.5
> $\frac{25 + 64 - 49}{2 \cdot 5 \cdot 8} = \frac{40}{80} = \frac12$.
:::

# Unit: Complex numbers, polar coordinates and conics

## Lesson: Complex numbers {#complex}
@summary: The imaginary unit i, arithmetic with a + bi, the complex plane, modulus and conjugate, dividing complex numbers, and why every quadratic has complex roots.

### A number whose square is negative
Try to solve $x^2 + 1 = 0$. You need $x^2 = -1$, but every real number squared is zero or positive, so there is no real solution. For centuries mathematicians simply said "no solution". Then, while solving cubic equations in the 1500s, Italian mathematicians noticed something odd: formulas that gave perfectly real answers sometimes passed *through* square roots of negative numbers on the way. If they pretended $\sqrt{-1}$ was a number and followed the ordinary rules, the right real answer came out at the end. That pretend number turned out to be completely consistent, and today **complex numbers** are essential in electrical engineering, signal processing, quantum physics, control systems and machine learning.

### An everyday scenario: directions as numbers
Positive and negative numbers were once "impossible" too: you cannot have $-3$ apples. They became natural once people thought of them as positions on a line, with negative meaning "behind zero". Complex numbers become natural the same way when you think of them as positions on a *plane*. A real number is a step east or west. An imaginary number is a step north or south. A complex number is any combination, like the instruction "go 3 blocks east and 2 blocks north", written $3 + 2i$.

### The imaginary unit
We define a new number $i$ with the single property
$$i^2 = -1.$$
Multiples of $i$, such as $2i$ or $-0.5i$, are called **imaginary numbers**, and they give square roots of all negative numbers: $\sqrt{-9} = 3i$ because $(3i)^2 = 9i^2 = -9$. Powers of $i$ cycle with period 4: $i^1 = i$, $i^2 = -1$, $i^3 = -i$, $i^4 = 1$, then $i^5 = i$ again. So to find $i^{27}$, divide 27 by 4: remainder 3, so $i^{27} = i^3 = -i$.

### Complex numbers and their arithmetic
A **complex number** has the form $z = a + bi$, where $a$ and $b$ are real. The number $a$ is the **real part**, written $\operatorname{Re} z$, and $b$ is the **imaginary part**, $\operatorname{Im} z$. Real numbers are the special case $b = 0$.

**Adding and subtracting** works part by part, like collecting like terms: $(3 + 2i) + (1 - 5i) = 4 - 3i$.

**Multiplying** uses the distributive law, then replaces $i^2$ with $-1$:
$$(3 + 2i)(1 - 5i) = 3 - 15i + 2i - 10i^2 = 3 - 13i + 10 = 13 - 13i.$$
In general $(a + bi)(c + di) = (ac - bd) + (ad + bc)i$. You do not need to memorise this; just expand.

### The complex plane
Plot $a + bi$ as the point $(a, b)$, with the real part on the horizontal axis and the imaginary part on the vertical axis. This is the **complex plane** (or Argand diagram). Addition is then exactly vector addition: to add $z$ and $w$, place the arrow for $w$ at the tip of the arrow for $z$.

@fig complex | The complex number 3 + 2i is the point 3 units right and 2 units up. Its distance from 0 is its modulus.

Multiplication is more surprising. Multiplying by $i$ sends $a + bi$ to $ai + bi^2 = -b + ai$, which is the point $(a, b)$ rotated $90°$ counterclockwise about the origin. Doing it twice rotates $180°$, which is multiplying by $-1$. So "$i^2 = -1$" has a geometric meaning: two quarter turns make a half turn. In general, multiplying complex numbers multiplies their lengths and adds their angles, a fact the Euler's formula lesson makes precise.

### Modulus and conjugate
The **modulus** $|z|$ is the distance from 0 to $z$: by Pythagoras, $|a + bi| = \sqrt{a^2 + b^2}$. For $3 + 4i$ it is $\sqrt{9 + 16} = 5$.

The **complex conjugate** of $z = a + bi$ is $\bar z = a - bi$, the mirror image across the real axis. Multiplying a number by its conjugate gives a real number:
$$z\bar z = (a + bi)(a - bi) = a^2 - b^2i^2 = a^2 + b^2 = |z|^2.$$
For $3 + 4i$: $(3 + 4i)(3 - 4i) = 9 + 16 = 25 = 5^2$. Conjugates also satisfy $\overline{z + w} = \bar z + \bar w$ and $\overline{zw} = \bar z\,\bar w$.

### Dividing complex numbers
To divide, multiply the top and bottom by the conjugate of the bottom. This makes the denominator real, exactly like rationalising a denominator with a square root:
$$\frac{2 + 3i}{1 + i} = \frac{(2 + 3i)(1 - i)}{(1 + i)(1 - i)} = \frac{2 - 2i + 3i - 3i^2}{1 + 1} = \frac{5 + i}{2} = \frac52 + \frac12 i.$$
Check by multiplying back: $\left(\frac52 + \frac12 i\right)(1 + i) = \frac52 + \frac52 i + \frac12 i - \frac12 = 2 + 3i$.

### Quadratics always have roots
The quadratic formula gives $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$. When the discriminant $b^2 - 4ac$ is negative, the square root is now available as an imaginary number. For $x^2 - 2x + 5 = 0$: the discriminant is $4 - 20 = -16$, $\sqrt{-16} = 4i$, so $x = \frac{2 \pm 4i}{2} = 1 \pm 2i$. Check: $(1 + 2i)^2 - 2(1 + 2i) + 5 = 1 + 4i - 4 - 2 - 4i + 5 = 0$.

The two roots are conjugates of each other. That always happens for a polynomial with real coefficients: non-real roots come in conjugate pairs. More generally, the **fundamental theorem of algebra** says every polynomial of degree $n \ge 1$ has exactly $n$ complex roots, counted with multiplicity. With complex numbers, no polynomial equation is ever "impossible" again.

### Why the rules are consistent
You might worry that inventing $i$ could break arithmetic. It does not. You can define complex numbers purely as ordered pairs of reals, with $(a, b) + (c, d) = (a + c, b + d)$ and $(a, b)(c, d) = (ac - bd, ad + bc)$, and check that all the usual laws (commutative, associative, distributive) hold. The pair $(0, 1)$ then satisfies $(0, 1)(0, 1) = (-1, 0)$, so it behaves exactly like $i$. Complex numbers are as solid as the real numbers; only the name "imaginary" is misleading.

:::def Complex number
A number $z = a + bi$ with real part $a$ and imaginary part $b$, where $i^2 = -1$.
:::

:::def Modulus
$|a + bi| = \sqrt{a^2 + b^2}$, the distance from $0$ to the point $(a, b)$ in the complex plane.
:::

:::def Complex conjugate
$\overline{a + bi} = a - bi$, the reflection across the real axis. It satisfies $z\bar z = |z|^2$.
:::

### Common mistakes
:::warn Watch out
- $i^2 = -1$, not $1$. Forgetting the minus sign when expanding is the most common error.
- $\sqrt{-4}\sqrt{-9} \ne \sqrt{36}$. The rule $\sqrt a\sqrt b = \sqrt{ab}$ fails for negatives: $2i \cdot 3i = -6$.
- The modulus is $\sqrt{a^2 + b^2}$, not $a + b$ and not $\sqrt{a^2 - b^2}$.
- To divide, multiply by the conjugate of the *denominator*, on top and bottom.
:::

### Summary
The imaginary unit $i$ satisfies $i^2 = -1$. Complex numbers $a + bi$ are points in a plane; they add like vectors and multiply by scaling and rotating, with multiplication by $i$ a quarter turn. The modulus is the distance from 0, the conjugate is the mirror image, and $z\bar z = |z|^2$ lets you divide. With complex numbers, every polynomial has as many roots as its degree.

@viz complex op=mul | Drag z and w. Multiplying multiplies the lengths and adds the angles.

:::explore
**What to try**
1. Choose "z + w". The sum is the far corner of the parallelogram: addition is vector addition.
2. Choose "z · w" and drag $w$ to $0 + 1i$. The product is $z$ rotated by $90°$: multiplying by $i$ is a quarter turn.
3. Drag $w$ to $-1 + 0i$ and see $zw$ point the opposite way: multiplying by $-1$ is a half turn.
4. Read $|zw| = |z||w|$ from the readout for a few positions.
5. Choose "conjugate". $\bar z$ is the mirror image across the real axis, and the readout confirms $z\bar z = |z|^2$.

**What to notice:** each arithmetic operation from the article has a picture: adding is placing arrows tip to tail, multiplying is scaling and rotating, and conjugating is reflecting.
:::

:::formulas
$$i^2 = -1,\quad i^3 = -i,\quad i^4 = 1$$
$$(a + bi) \pm (c + di) = (a \pm c) + (b \pm d)i$$
$$(a + bi)(c + di) = (ac - bd) + (ad + bc)i$$
$$|a + bi| = \sqrt{a^2 + b^2},\quad \overline{a + bi} = a - bi,\quad z\bar z = |z|^2$$
$$\frac{z}{w} = \frac{z\bar w}{|w|^2},\quad |zw| = |z||w|$$
:::

:::thm Fundamental theorem of algebra
Every polynomial of degree $n \ge 1$ with complex coefficients has exactly $n$ complex roots, counted with multiplicity. If the coefficients are real, non-real roots occur in conjugate pairs.
:::

:::proof Conjugate pairs for real polynomials
Let $p(x) = a_nx^n + \cdots + a_1x + a_0$ with all $a_k$ real, and suppose $p(z) = 0$. Take the conjugate of both sides. Because conjugation respects sums and products and $\bar a_k = a_k$, we get $a_n\bar z^n + \cdots + a_1\bar z + a_0 = \bar 0 = 0$. So $p(\bar z) = 0$: the conjugate is also a root. (The full fundamental theorem needs tools from analysis and is proved in later courses.)
:::

:::steps Compute $(2 - 3i)^2$
1. $(2 - 3i)^2 = 4 - 12i + 9i^2$.
2. $9i^2 = -9$, so the result is $4 - 9 - 12i = -5 - 12i$.
3. Check the modulus: $|2 - 3i|^2 = 13$ and $|-5 - 12i| = 13$, which matches $|z^2| = |z|^2$.
:::

:::steps Write $\frac{5}{2 - i}$ in the form $a + bi$
1. Multiply top and bottom by $2 + i$: $\frac{5(2 + i)}{(2 - i)(2 + i)}$.
2. Denominator: $4 + 1 = 5$.
3. Result: $\frac{5(2 + i)}{5} = 2 + i$.
:::

:::steps Solve $x^2 + 4x + 13 = 0$
1. Discriminant: $16 - 52 = -36$, so $\sqrt{-36} = 6i$.
2. $x = \frac{-4 \pm 6i}{2} = -2 \pm 3i$.
3. The roots are conjugates, as expected for a real quadratic.
:::

:::mock Exam question
Let $z = 1 + 2i$ and $w = 3 - i$. (a) Find $zw$. (b) Find $\frac{z}{w}$ in the form $a + bi$. (c) Find $|z|$, $|w|$ and $|zw|$, and verify $|zw| = |z||w|$. (d) Find $i^{50}$.
:::solution
(a) $zw = 3 - i + 6i - 2i^2 = 5 + 5i$.
(b) $\frac{z}{w} = \frac{(1 + 2i)(3 + i)}{(3 - i)(3 + i)} = \frac{3 + i + 6i + 2i^2}{10} = \frac{1 + 7i}{10} = 0.1 + 0.7i$.
(c) $|z| = \sqrt5$, $|w| = \sqrt{10}$, $|zw| = \sqrt{50} = 5\sqrt2$, and $\sqrt5 \cdot \sqrt{10} = \sqrt{50}$.
(d) $50 = 4 \cdot 12 + 2$, so $i^{50} = i^2 = -1$.
:::
:::

:::ml
Complex numbers are the natural language of frequency analysis. The Fourier transform of an audio clip or image is complex-valued; its modulus is the strength of each frequency and its angle is the phase. Spectrograms used by speech recognition models are moduli of complex Fourier coefficients. Complex-valued neural networks and the eigenvalues of non-symmetric weight matrices (which can be complex) also appear in the analysis of recurrent networks.
:::

:::cs
Most languages have a complex type (`complex` in Python, `std::complex` in C++). The Mandelbrot set is drawn by repeatedly computing $z \to z^2 + c$ for complex $c$ and checking whether $|z|$ stays at most 2. Quantum computing represents qubit amplitudes as complex numbers whose squared moduli are probabilities.
:::

:::real
Electrical engineers write the impedance of a circuit as a complex number $Z = R + iX$ (they often write $j$ for $i$): $R$ is resistance and $X$ is the reactance of capacitors and coils. A resistor of 3 ohms in series with a coil of reactance 4 ohms has impedance $3 + 4i$, and the size of the opposition to current is $|Z| = 5$ ohms.
:::

:::quiz
? What is $i^2$?
= -1
> By definition.

? Simplify $(2 + i)(2 - i)$.
= 5
> $4 - i^2 = 4 + 1 = 5$; a number times its conjugate is $|z|^2$.

? What is $|6 - 8i|$?
= 10
> $\sqrt{36 + 64} = 10$.

? What is $i^{23}$?
- $1$
- $i$
- $-1$
+ $-i$
> $23 = 4 \cdot 5 + 3$, so $i^{23} = i^3 = -i$.

? What does multiplying a complex number by $i$ do in the complex plane?
+ rotates it $90°$ counterclockwise
- reflects it across the real axis
- doubles its length
- moves it 1 unit up
> $i(a + bi) = -b + ai$, a quarter turn.

? What is the real part of $\frac{1}{1 + i}$?
= 1/2|0.5
> $\frac{1 - i}{2} = \frac12 - \frac12 i$.
:::

## Lesson: Euler's formula {#euler}
@summary: Why e to the power iθ equals cos θ + i sin θ, the polar (exponential) form of complex numbers, multiplying by rotating, De Moivre's theorem, roots of unity, and Euler's identity.

### The strangest-looking formula in mathematics
What could $e^{i\theta}$ possibly mean? We know $e^2$ means $e \cdot e$, and $e^{1/2}$ means $\sqrt e$, but multiplying $e$ by itself "$i$ times" makes no sense. In this lesson you will see that there is exactly one sensible meaning, and it leads to one of the most useful formulas in all of science:
$$e^{i\theta} = \cos\theta + i\sin\theta.$$
It ties together exponentials, trigonometry and complex numbers. It turns rotations into multiplication, turns trig identities into algebra, and is the foundation of the Fourier transform used in audio, images, and machine learning.

### An everyday scenario: the hands of a clock
The tip of a clock's second hand moves around a circle at a steady rate. Its position at any moment can be described by two numbers, the horizontal and vertical coordinates $(\cos\theta, \sin\theta)$, which change in a complicated-looking wavy way. Or it can be described by one idea: "rotate by a steady amount each second". Euler's formula says these are the same description. The complex number $e^{i\theta}$ is the clock hand at angle $\theta$, and multiplying by $e^{i\varphi}$ advances the hand by $\varphi$.

### Meaning one: the power series
In calculus you will meet the series
$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \cdots,$$
which is true for every real $x$ and only uses adding and multiplying. Those operations work perfectly well for complex numbers, so we can *define* $e^{i\theta}$ by putting $x = i\theta$. The powers of $i$ cycle: $i^2 = -1$, $i^3 = -i$, $i^4 = 1$. So
$$e^{i\theta} = 1 + i\theta - \frac{\theta^2}{2!} - i\frac{\theta^3}{3!} + \frac{\theta^4}{4!} + i\frac{\theta^5}{5!} - \cdots.$$
Group the real terms and the imaginary terms:
$$\left(1 - \frac{\theta^2}{2!} + \frac{\theta^4}{4!} - \cdots\right) + i\left(\theta - \frac{\theta^3}{3!} + \frac{\theta^5}{5!} - \cdots\right).$$
These two brackets are exactly the known series for $\cos\theta$ and $\sin\theta$. So $e^{i\theta} = \cos\theta + i\sin\theta$. Let us check numerically with $\theta = 1$: the first six terms of the real part give $1 - 0.5 + 0.0417 - 0.0014 \approx 0.5403$, and $\cos 1 \approx 0.5403$. The imaginary part gives $1 - 0.1667 + 0.0083 - 0.0002 \approx 0.8415$, and $\sin 1 \approx 0.8415$.

### Meaning two: compound growth sideways
Recall that $e^x = \lim_{n\to\infty}\left(1 + \frac{x}{n}\right)^n$, the result of compounding many tiny growth steps. Now compound tiny *rotations*. The number $1 + \frac{i\theta}{n}$ is very close to 1 but pointing slightly upward; multiplying by it rotates by about $\frac{\theta}{n}$ radians and barely changes the length. Do it $n$ times and you rotate by about $\theta$ in total, landing on the unit circle at angle $\theta$. As $n$ grows, the approximation becomes exact. So exponential growth in an imaginary direction is not growth at all; it is rotation.

### The unit circle in exponential form
Because $\cos^2\theta + \sin^2\theta = 1$, the number $e^{i\theta}$ always has modulus 1: it lies on the unit circle at angle $\theta$. Some values: $e^{i\cdot 0} = 1$, $e^{i\pi/2} = i$, $e^{i\pi} = -1$, $e^{3i\pi/2} = -i$, and $e^{2\pi i} = 1$ again. Since angles that differ by $2\pi$ are the same point, $e^{i\theta}$ is periodic with period $2\pi$.

The value at $\theta = \pi$ gives **Euler's identity**,
$$e^{i\pi} + 1 = 0,$$
often called the most beautiful equation in mathematics because it links $e$, $i$, $\pi$, 1 and 0 in one line. Geometrically it simply says: rotating halfway around the circle from 1 lands on $-1$.

### Exponential (polar) form of any complex number
Any complex number $z = a + bi$ has a modulus $r = |z| = \sqrt{a^2 + b^2}$ and an argument $\theta$, the angle it makes with the positive real axis. Then $a = r\cos\theta$ and $b = r\sin\theta$, so
$$z = r(\cos\theta + i\sin\theta) = re^{i\theta}.$$
For example $z = 1 + i$ has $r = \sqrt2$ and $\theta = \frac\pi4$, so $1 + i = \sqrt2\,e^{i\pi/4}$. And $z = -2$ is $2e^{i\pi}$.

### Multiplication is rotation and scaling
Exponent rules still hold, so
$$r_1 e^{i\theta_1} \cdot r_2 e^{i\theta_2} = r_1 r_2\, e^{i(\theta_1 + \theta_2)}.$$
To multiply complex numbers, **multiply the lengths and add the angles**. Multiplying by $i = e^{i\pi/2}$ rotates by $90°$. Multiplying by $2e^{i\pi/6}$ doubles the length and turns by $30°$. Division divides lengths and subtracts angles.

This makes the angle-sum identities almost free. Expand $e^{i(a + b)} = e^{ia}e^{ib} = (\cos a + i\sin a)(\cos b + i\sin b) = (\cos a\cos b - \sin a\sin b) + i(\sin a\cos b + \cos a\sin b)$. Comparing real and imaginary parts with $\cos(a + b) + i\sin(a + b)$ gives both sum formulas at once.

### Powers and De Moivre's theorem
Raising to a power repeats the multiplication: $(re^{i\theta})^n = r^n e^{in\theta}$. In trig form this is **De Moivre's theorem**: $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$. It makes large powers easy. For $(1 + i)^8$: $(\sqrt2)^8 e^{i \cdot 8\pi/4} = 16e^{2\pi i} = 16$. Doing that by expanding brackets would take a long time.

### Roots of unity
Which complex numbers satisfy $z^n = 1$? Writing $z = e^{i\theta}$, we need $e^{in\theta} = 1$, so $n\theta$ must be a whole number of turns: $\theta = \frac{2\pi k}{n}$ for $k = 0, 1, \ldots, n - 1$. These $n$ numbers, the **$n$th roots of unity**, sit evenly spaced around the unit circle like the vertices of a regular $n$-sided polygon. For $n = 4$ they are $1, i, -1, -i$. For $n = 3$ they are $1$ and $-\frac12 \pm \frac{\sqrt3}{2}i$. So a degree-$n$ equation has $n$ complex roots, matching the fundamental theorem of algebra.

### Cosine and sine from exponentials
Adding $e^{i\theta} = \cos\theta + i\sin\theta$ and $e^{-i\theta} = \cos\theta - i\sin\theta$ cancels the sines; subtracting cancels the cosines:
$$\cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2}, \qquad \sin\theta = \frac{e^{i\theta} - e^{-i\theta}}{2i}.$$
Every wave can thus be written as a combination of rotating arrows, which is the starting point of Fourier analysis.

:::def Euler's formula
For every real $\theta$, $e^{i\theta} = \cos\theta + i\sin\theta$: the point on the unit circle at angle $\theta$.
:::

:::def Exponential form
Writing a complex number as $z = re^{i\theta}$, where $r = |z|$ is its modulus and $\theta = \arg z$ is its argument.
:::

:::def Roots of unity
The $n$ solutions of $z^n = 1$, namely $e^{2\pi ik/n}$ for $k = 0, 1, \ldots, n - 1$, evenly spaced on the unit circle.
:::

### Why this matters in practice
Engineers and programmers rarely use the formula to admire it. They use it because multiplying exponentials is far easier than juggling sine and cosine products, so problems about waves, rotations and oscillations become short calculations.

### Common mistakes
:::warn Watch out
- $e^{i\theta}$ is not a real number; its modulus is always 1, never "large".
- When multiplying in exponential form, add the angles but *multiply* (not add) the moduli.
- The argument is only defined up to multiples of $2\pi$; $e^{i\pi/3}$ and $e^{7i\pi/3}$ are equal.
- Forgetting that $z^n = 1$ has $n$ solutions, not just $z = 1$.
:::

### Summary
Euler's formula $e^{i\theta} = \cos\theta + i\sin\theta$ follows from the power series of $e^x$, and says that imaginary exponentials are rotations. Every complex number is $re^{i\theta}$; multiplying multiplies lengths and adds angles, so powers and roots become easy (De Moivre's theorem, roots of unity), trig identities become algebra, and $e^{i\pi} = -1$.

@viz euler | Slide θ to move around the circle, then reduce the number of series terms to watch the power series build e^{iθ}.

:::explore
**What to try**
1. Set $\theta = 3.14$ (about $\pi$). The readout shows $e^{i\pi} \approx -1 + 0i$: Euler's identity.
2. Set $\theta = 1.57$ and confirm you are at $i$ (real part 0, imaginary part 1).
3. Set series terms to 1, then 2, 3, 4 and so on. Each new term is a step that turns $90°$ from the last, spiralling in toward the point on the circle.
4. With $\theta$ large (say 6), notice more terms are needed before the series lands on the circle.

**What to notice:** the series from the article really does converge to $\cos\theta + i\sin\theta$, and the turning of each step by $90°$ is the cycle $i, -1, -i, 1$ of powers of $i$.
:::

@viz complex op=pow | Powers of z: the length is raised to a power and the angle is multiplied.

:::explore
**What to try**
1. Drag $z$ onto the unit circle (for example to $0$ + $1i$). Its powers stay on the circle, stepping around by equal angles.
2. Drag $z$ slightly outside the circle (length a bit more than 1). The powers spiral outward.
3. Drag $z$ inside the circle. The powers spiral in toward 0.

**What to notice:** this is De Moivre's theorem, $(re^{i\theta})^n = r^n e^{in\theta}$: angles add up step by step while lengths multiply.
:::

:::formulas
$$e^{i\theta} = \cos\theta + i\sin\theta, \qquad e^{i\pi} + 1 = 0$$
$$z = a + bi = re^{i\theta},\quad r = \sqrt{a^2 + b^2},\quad \theta = \operatorname{atan2}(b, a)$$
$$r_1e^{i\theta_1} \cdot r_2e^{i\theta_2} = r_1r_2\,e^{i(\theta_1 + \theta_2)}, \qquad \frac{r_1e^{i\theta_1}}{r_2e^{i\theta_2}} = \frac{r_1}{r_2}e^{i(\theta_1 - \theta_2)}$$
$$(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$$
$$\cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2},\quad \sin\theta = \frac{e^{i\theta} - e^{-i\theta}}{2i},\quad z^n = 1 \iff z = e^{2\pi ik/n}$$
:::

:::thm De Moivre's theorem
For every integer $n$ and real $\theta$, $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$.
:::

:::proof
For $n \ge 0$, use induction. The case $n = 0$ is $1 = 1$. If it holds for $n$, then $(\cos\theta + i\sin\theta)^{n+1} = (\cos n\theta + i\sin n\theta)(\cos\theta + i\sin\theta) = (\cos n\theta\cos\theta - \sin n\theta\sin\theta) + i(\sin n\theta\cos\theta + \cos n\theta\sin\theta)$, which by the angle-sum formulas is $\cos(n + 1)\theta + i\sin(n + 1)\theta$. For negative $n$, note $(\cos\theta + i\sin\theta)^{-1} = \cos\theta - i\sin\theta = \cos(-\theta) + i\sin(-\theta)$ and apply the positive case.
:::

:::steps Write $z = -\sqrt3 + i$ in exponential form
1. $r = \sqrt{3 + 1} = 2$.
2. The point is in quadrant II with $\tan\theta = \frac{1}{-\sqrt3}$, so $\theta = \pi - \frac\pi6 = \frac{5\pi}{6}$.
3. $z = 2e^{5\pi i/6}$. Check: $2\cos\frac{5\pi}{6} = -\sqrt3$ and $2\sin\frac{5\pi}{6} = 1$.
:::

:::steps Compute $(1 + i)^{10}$
1. $1 + i = \sqrt2\,e^{i\pi/4}$.
2. $(1 + i)^{10} = (\sqrt2)^{10}e^{10i\pi/4} = 32e^{5i\pi/2}$.
3. $\frac{5\pi}{2} = 2\pi + \frac\pi2$, so $e^{5i\pi/2} = i$.
4. $(1 + i)^{10} = 32i$.
:::

:::steps Find the cube roots of $8$
1. Write $8 = 8e^{0i}$. Cube roots have modulus $\sqrt[3]{8} = 2$ and angles $\frac{0 + 2\pi k}{3}$.
2. $k = 0$: $2$. $k = 1$: $2e^{2\pi i/3} = -1 + \sqrt3 i$. $k = 2$: $2e^{4\pi i/3} = -1 - \sqrt3 i$.
3. Check one: $(-1 + \sqrt3 i)^2 = 1 - 2\sqrt3 i - 3 = -2 - 2\sqrt3 i$, and times $(-1 + \sqrt3 i)$ gives $2 - 2\sqrt3 i + 2\sqrt3 i + 6 = 8$.
:::

:::mock Exam question
Let $z = 2e^{i\pi/3}$ and $w = 3e^{i\pi/2}$. (a) Find $zw$ in exponential form and in $a + bi$ form. (b) Find $z^6$. (c) Use Euler's formula to show $\cos 2\theta = \cos^2\theta - \sin^2\theta$.
:::solution
(a) $zw = 6e^{i(\pi/3 + \pi/2)} = 6e^{5\pi i/6} = 6\left(-\frac{\sqrt3}{2} + \frac12 i\right) = -3\sqrt3 + 3i$.
(b) $z^6 = 2^6e^{6i\pi/3} = 64e^{2\pi i} = 64$.
(c) $e^{2i\theta} = (e^{i\theta})^2 = (\cos\theta + i\sin\theta)^2 = \cos^2\theta - \sin^2\theta + 2i\sin\theta\cos\theta$. Its real part must equal $\cos 2\theta$, giving the identity (and the imaginary part gives $\sin 2\theta = 2\sin\theta\cos\theta$).
:::
:::

:::ml
The discrete Fourier transform writes a signal as a sum of rotating arrows $e^{-2\pi ikn/N}$, the roots of unity. Spectrogram features for speech models, FFT-based convolution, and Fourier feature networks all depend on it. Rotary position embeddings (RoPE) in large language models multiply pairs of coordinates by $e^{im\theta}$, so that relative position appears as a difference of angles.
:::

:::cs
The fast Fourier transform (FFT) multiplies two $n$-digit numbers or polynomials in $O(n\log n)$ time by evaluating them at the $n$th roots of unity, using the fact that squaring the $2n$th roots gives the $n$th roots. Graphics code rotates 2D points by multiplying by $e^{i\theta}$, and quaternions extend the same idea to 3D.
:::

:::real
Electrical engineers describe alternating current with **phasors**: a voltage $V\cos(\omega t + \varphi)$ is the real part of $Ve^{i\varphi}e^{i\omega t}$. Adding two AC voltages with different phases becomes adding two complex numbers, which is how power grids and household circuits are analysed.
:::

:::quiz
? What is $e^{i\pi}$?
= -1
> Rotating halfway around the unit circle from 1 lands at $-1$.

? What is the modulus $|e^{i\theta}|$ for any real $\theta$?
= 1
> $\sqrt{\cos^2\theta + \sin^2\theta} = 1$.

? Multiplying a complex number by $e^{i\pi/2}$...
+ rotates it by $90°$ counterclockwise
- doubles its length
- reflects it in the real axis
- rotates it by $180°$
> $e^{i\pi/2} = i$, a quarter turn with length 1.

? If $z = 2e^{i\pi/6}$, what is $|z^3|$?
= 8
> Moduli multiply: $2^3 = 8$.

? How many solutions does $z^5 = 1$ have in the complex numbers?
= 5
> The fifth roots of unity, $e^{2\pi ik/5}$ for $k = 0, \ldots, 4$.

? What is the real part of $e^{i\pi/3}$?
= 1/2|0.5
> $\cos\frac\pi3 = \frac12$.
:::

## Lesson: Polar coordinates and polar curves {#polar}
@summary: Describing points by distance and angle, converting between polar and Cartesian coordinates, negative r, and graphing circles, cardioids, roses, limaçons and spirals.

### Distance and direction
There are two natural ways to tell someone where something is. One is the grid way: "3 blocks east, 4 blocks north". The other is the radar way: "5 blocks away, in the direction $53°$ north of east". The first gives Cartesian coordinates $(x, y)$. The second gives **polar coordinates** $(r, \theta)$: a distance $r$ from a fixed point and an angle $\theta$ from a fixed direction. Both describe the same plane, but some shapes and problems are dramatically simpler in one of them. Circles centred at the origin, spirals, rotations and anything with radial symmetry belong to polar coordinates.

### An everyday scenario: an air traffic radar
A radar screen sweeps a beam around and around. Each aircraft appears as a blip described by how far it is from the radar station and in which direction. Controllers say "range 40 km, bearing 120°", not "34.6 km east and 20 km south". The radar naturally measures $r$ and $\theta$, and only converts to a map grid when needed. Lidar sensors on self-driving cars, sonar, and the joints of a robot arm all measure the world the same way.

### Polar coordinates
Choose a point $O$ called the **pole** (the origin) and a ray from it called the **polar axis** (the positive $x$-axis). A point $P$ has polar coordinates $(r, \theta)$ if it is at distance $r$ from $O$ and the ray $OP$ makes angle $\theta$ with the polar axis, measured counterclockwise. For example $\left(2, \frac\pi2\right)$ is 2 units straight up, the same point as $(0, 2)$ in Cartesian coordinates.

@fig polar | A point in polar coordinates: distance r from the origin at angle θ. Its Cartesian coordinates are x = r cos θ and y = r sin θ.

### Converting between the systems
The unit circle lesson gives the conversion immediately. A point at distance $r$ and angle $\theta$ is $r$ times the unit-circle point $(\cos\theta, \sin\theta)$:
$$x = r\cos\theta, \qquad y = r\sin\theta.$$
For $\left(4, \frac\pi3\right)$: $x = 4 \cdot \frac12 = 2$ and $y = 4 \cdot \frac{\sqrt3}{2} = 2\sqrt3 \approx 3.46$.

Going the other way, Pythagoras gives the distance and the inverse tangent gives the angle:
$$r = \sqrt{x^2 + y^2}, \qquad \theta = \operatorname{atan2}(y, x).$$
For $(-1, 1)$: $r = \sqrt2$, and since the point is in quadrant II, $\theta = \frac{3\pi}{4}$, not $\arctan(-1) = -\frac\pi4$. Always check the quadrant, as in the inverse trig lesson.

### One point, many names
In Cartesian coordinates each point has exactly one name. In polar coordinates each point has infinitely many, because adding a full turn does not move it: $\left(2, \frac\pi6\right)$, $\left(2, \frac{13\pi}{6}\right)$ and $\left(2, -\frac{11\pi}{6}\right)$ are all the same point. The origin is $(0, \theta)$ for every $\theta$.

We also allow negative $r$, meaning "face direction $\theta$, then walk backwards". So $(-2, 0)$ is the point $(-2, 0)$ in Cartesian terms, the same as $(2, \pi)$. In general $(-r, \theta)$ is the same point as $(r, \theta + \pi)$. Negative $r$ appears naturally when graphing curves like $r = \cos 2\theta$, where the formula sometimes gives negative values.

### Polar equations and their graphs
A polar equation $r = f(\theta)$ describes a curve: for each angle, go out the distance the formula says. To graph one, make a table of values at convenient angles and imagine a radar beam sweeping around, with the curve's distance growing and shrinking.

**Circles.** The simplest polar equation is $r = 3$: every point at distance 3, which is a circle of radius 3 centred at the origin. Compare its Cartesian equation $x^2 + y^2 = 9$. The equation $r = 2\cos\theta$ is also a circle. Multiply both sides by $r$: $r^2 = 2r\cos\theta$, which in Cartesian form is $x^2 + y^2 = 2x$, or $(x - 1)^2 + y^2 = 1$, a circle of radius 1 centred at $(1, 0)$ passing through the origin.

**Lines through the origin.** The equation $\theta = \frac\pi4$ is the line $y = x$: every point at that angle, at any distance (including negative $r$).

**Cardioids.** $r = 1 + \cos\theta$ starts at $r = 2$ when $\theta = 0$, shrinks to $r = 1$ at $\theta = \frac\pi2$, reaches $r = 0$ at $\theta = \pi$, then grows back. The result is a heart shape with a point (a cusp) at the origin. The name means "heart-shaped". Microphones with a "cardioid" pickup pattern pick up sound most strongly from the front in exactly this shape.

**Limaçons.** More generally $r = a + b\cos\theta$ is a limaçon. If $|a| > |b|$ the curve never reaches the origin and has a dimple or is nearly circular. If $|a| < |b|$, $r$ becomes negative for some angles, and the curve has an inner loop.

**Roses.** $r = \cos(k\theta)$ produces petals. When $k$ is odd the rose has $k$ petals; when $k$ is even it has $2k$. For $k = 3$: three petals, at angles $0$, $\frac{2\pi}{3}$ and $\frac{4\pi}{3}$. For $k = 2$: four petals.

**Spirals.** $r = \theta$ (or $r = \frac{\theta}{6}$) grows steadily as the angle increases, giving an Archimedean spiral whose loops are evenly spaced, like a rolled-up carpet or the groove of a record.

### Symmetry tests
Symmetry halves the work. If replacing $\theta$ with $-\theta$ leaves the equation unchanged, the curve is symmetric about the $x$-axis. All the cosine curves above pass this test, because $\cos(-\theta) = \cos\theta$. If replacing $r$ with $-r$ or $\theta$ with $\theta + \pi$ gives the same curve, it is symmetric about the origin.

### Why bother with polar coordinates?
Shapes with rotational symmetry have short, clear equations in polar form, while their Cartesian equations are messy. The cardioid $r = 1 + \cos\theta$ is, in Cartesian form, $(x^2 + y^2 - x)^2 = x^2 + y^2$. Polar coordinates also connect directly to complex numbers: the point $(r, \theta)$ is the complex number $re^{i\theta}$, so rotating by $\alpha$ is simply adding $\alpha$ to $\theta$.

:::def Polar coordinates
A point's description $(r, \theta)$ by its distance $r$ from the origin and the angle $\theta$ from the positive $x$-axis, with $x = r\cos\theta$, $y = r\sin\theta$.
:::

:::def Polar equation
An equation relating $r$ and $\theta$, such as $r = 1 + \cos\theta$, whose graph is all points whose polar coordinates satisfy it.
:::

:::def Cardioid
The heart-shaped curve $r = a(1 + \cos\theta)$, which passes through the origin with a cusp.
:::

### Common mistakes
:::warn Watch out
- Using $\theta = \arctan\frac{y}{x}$ without checking the quadrant. Use atan2.
- Thinking each point has one polar name. Adding $2\pi$ to $\theta$, or using $(-r, \theta + \pi)$, gives the same point.
- Plotting negative $r$ in the direction $\theta$; it goes in the opposite direction.
- Counting rose petals: $r = \cos 2\theta$ has 4 petals, not 2.
:::

### Summary
Polar coordinates locate points by distance and angle. Convert with $x = r\cos\theta$, $y = r\sin\theta$, $r = \sqrt{x^2 + y^2}$, $\theta = \operatorname{atan2}(y, x)$. Each point has many polar names, and negative $r$ points backwards. Polar equations give simple descriptions of circles, cardioids, limaçons, roses and spirals, and connect directly to the exponential form of complex numbers.

@viz polar | Choose a curve, change k, and slow the θ sweep to watch the curve being drawn.

:::explore
**What to try**
1. Choose the rose $r = \cos(k\theta)$ with $k = 3$ and count 3 petals. Change to $k = 2$ and count 4 petals, then try $k = 5$ and $k = 4$.
2. Reduce the θ sweep to about $1.57$ ($\frac\pi2$) and watch which part of the rose is drawn first. Increase it slowly to see the petals appear one by one.
3. Choose the cardioid $r = 1 + \cos\theta$. Sweep slowly from 0 and check that $r$ is 2 at $\theta = 0$ and 0 at $\theta = \pi$.
4. Choose the circle $r = 2\cos\theta$. It is the circle centred at $(1, 0)$ with radius 1, traced once for $\theta$ from 0 to $\pi$.
5. Choose the limaçon and increase $k$ until an inner loop appears; that is where $r$ goes negative.

**What to notice:** each curve is drawn by a beam sweeping around the origin with length $r(\theta)$, exactly like the radar picture in the article, and negative $r$ draws on the opposite side.
:::

:::formulas
$$x = r\cos\theta,\quad y = r\sin\theta$$
$$r = \sqrt{x^2 + y^2},\quad \theta = \operatorname{atan2}(y, x)$$
$$(r, \theta) = (r, \theta + 2\pi k) = (-r, \theta + \pi)$$
$$r = 2a\cos\theta \iff (x - a)^2 + y^2 = a^2$$
$$r = \cos k\theta:\ k \text{ petals if } k \text{ odd},\ 2k \text{ petals if } k \text{ even}$$
:::

:::thm Polar circles through the origin
The polar equation $r = 2a\cos\theta$ (with $a \ne 0$) is the circle with centre $(a, 0)$ and radius $|a|$.
:::

:::proof
Multiply by $r$: $r^2 = 2ar\cos\theta$. Substitute $r^2 = x^2 + y^2$ and $r\cos\theta = x$: $x^2 + y^2 = 2ax$. Complete the square: $x^2 - 2ax + a^2 + y^2 = a^2$, so $(x - a)^2 + y^2 = a^2$. Multiplying by $r$ only adds the origin, which is already on the curve (at $\theta = \frac\pi2$), so no points are gained or lost.
:::

:::steps Convert $(-2, -2\sqrt3)$ to polar coordinates
1. $r = \sqrt{4 + 12} = 4$.
2. The point is in quadrant III. The reference angle is $\arctan\frac{2\sqrt3}{2} = \frac\pi3$.
3. $\theta = \pi + \frac\pi3 = \frac{4\pi}{3}$ (or $-\frac{2\pi}{3}$).
4. Answer: $\left(4, \frac{4\pi}{3}\right)$.
:::

:::steps Convert $r = 6\sin\theta$ to Cartesian form and identify it
1. Multiply by $r$: $r^2 = 6r\sin\theta$.
2. Substitute: $x^2 + y^2 = 6y$.
3. Complete the square: $x^2 + (y - 3)^2 = 9$.
4. A circle with centre $(0, 3)$ and radius 3.
:::

:::steps Find $r$ on the cardioid $r = 2 + 2\cos\theta$ at $\theta = \frac{\pi}{3}$ and give the Cartesian point
1. $r = 2 + 2 \cdot \frac12 = 3$.
2. $x = 3\cos\frac\pi3 = 1.5$, $y = 3\sin\frac\pi3 = \frac{3\sqrt3}{2} \approx 2.60$.
:::

:::mock Exam question
(a) Convert the point $\left(-3, \frac{\pi}{4}\right)$ to Cartesian coordinates. (b) Write the line $x + y = 4$ as a polar equation. (c) How many petals does $r = 2\sin 5\theta$ have, and how long is each petal?
:::solution
(a) $x = -3\cos\frac\pi4 = -\frac{3\sqrt2}{2} \approx -2.12$ and $y = -3\sin\frac\pi4 \approx -2.12$. Negative $r$ puts the point in quadrant III.
(b) $r\cos\theta + r\sin\theta = 4$, so $r = \frac{4}{\cos\theta + \sin\theta}$.
(c) $k = 5$ is odd, so there are 5 petals, each of length 2 (the maximum of $|r|$).
:::
:::

:::ml
Converting to polar coordinates is a classic feature transformation. Data arranged in concentric rings cannot be separated by a straight line in $(x, y)$, but in $(r, \theta)$ coordinates the rings become horizontal bands that a single threshold on $r$ separates. Kernel methods and neural networks learn such transformations automatically. Lidar point clouds for self-driving cars arrive in polar form (range and angle) and are often processed that way.
:::

:::cs
Graphics and game code use polar coordinates to place objects around a circle (for example, $n$ menu items at angles $\frac{2\pi k}{n}$), to draw radial gradients, and to animate orbits. The function `Math.atan2(y, x)` and `Math.hypot(x, y)` perform the Cartesian-to-polar conversion.
:::

:::real
A ship's radar reports a buoy at range 8 nautical miles and an angle of $30°$ from the east axis. Its position on the chart is $x = 8\cos 30° \approx 6.93$ miles east and $y = 8\sin 30° = 4$ miles north.
:::

:::quiz
? What are the Cartesian coordinates of the polar point $(2, \pi)$? Give the $x$-coordinate.
= -2
> $x = 2\cos\pi = -2$, $y = 0$.

? What is $r$ for the point $(5, 12)$?
= 13
> $\sqrt{25 + 144} = 13$.

? How many petals does $r = \cos 4\theta$ have?
= 8
> $k = 4$ is even, so there are $2k = 8$ petals.

? Which polar equation is a circle of radius 5 centred at the origin?
+ $r = 5$
- $\theta = 5$
- $r = 5\theta$
- $r = 5\cos\theta$
> Every point at distance 5 from the origin.

? The polar point $(-1, 0)$ is the same as...
- $(1, 0)$
+ $(1, \pi)$
- $\left(1, \frac\pi2\right)$
- $(-1, \pi)$
> $(-r, \theta) = (r, \theta + \pi)$.

? On the cardioid $r = 1 + \cos\theta$, what is $r$ at $\theta = \frac{\pi}{2}$?
= 1
> $1 + \cos\frac\pi2 = 1$.
:::

## Lesson: Conic sections: circles, ellipses, parabolas and hyperbolas {#conics}
@summary: The four curves you get by slicing a cone, defined by distances to foci and directrices, their standard equations, completing the square to identify them, and eccentricity.

### Four curves from one cone
Shine a torch straight at a wall and the patch of light is a circle. Tilt the torch and the circle stretches into an ellipse. Tilt it further and one edge of the light runs off to infinity, giving a parabola; tilt further still and you get one branch of a hyperbola. The beam of a torch is a cone, and the wall slices it. These four curves, the **conic sections**, were studied by the ancient Greeks purely for their beauty. Centuries later, Kepler discovered that planets move in ellipses, Newton showed that every orbit under gravity is a conic, and engineers learned that parabolic mirrors focus light and radio waves. Conics are the simplest curves after straight lines: every one of them has an equation of degree 2 in $x$ and $y$.

### An everyday scenario: the whispering gallery
In some domed buildings, such as the Statuary Hall in the United States Capitol, a person whispering at one particular spot can be heard clearly by someone standing at another particular spot across the room, while people in between hear nothing. The ceiling is shaped like part of an ellipse, and the two spots are its **foci**. Any sound wave from one focus bounces off the ellipse straight towards the other focus, and every path has the same length, so all the echoes arrive together. That reflection property comes directly from the definition of an ellipse that you are about to learn.

### Circles: one fixed distance
A **circle** is the set of points at a fixed distance $r$ from a centre $(h, k)$. By the distance formula, $(x, y)$ is on the circle when $\sqrt{(x - h)^2 + (y - k)^2} = r$, so
$$(x - h)^2 + (y - k)^2 = r^2.$$
For centre $(2, -1)$ and radius 3, the equation is $(x - 2)^2 + (y + 1)^2 = 9$. The point $(5, -1)$ is on it, since $9 + 0 = 9$.

### Ellipses: a constant sum of distances
Push two pins into a board, loop a string around them, and pull it tight with a pencil. As you move the pencil, the total distance from the pencil to the two pins stays equal to the string length, and the pencil draws an **ellipse**. So an ellipse is the set of points whose distances $d_1$ and $d_2$ to two fixed points (the foci) add to a constant, $d_1 + d_2 = 2a$.

With the centre at the origin and the foci at $(\pm c, 0)$, this becomes the standard equation
$$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1, \qquad c^2 = a^2 - b^2.$$
Here $a$ is the **semi-major axis** (half the longest width) and $b$ is the **semi-minor axis**. The ellipse crosses the axes at $(\pm a, 0)$ and $(0, \pm b)$. For $\frac{x^2}{25} + \frac{y^2}{9} = 1$: $a = 5$, $b = 3$, $c = \sqrt{25 - 9} = 4$, so the foci are $(\pm 4, 0)$. Check with the vertex $(5, 0)$: its distances to the foci are 1 and 9, which add to $10 = 2a$. Check with $(0, 3)$: each distance is $\sqrt{16 + 9} = 5$, again adding to 10. If $a = b$, then $c = 0$, both foci sit at the centre, and the ellipse is a circle.

### Parabolas: equal distance to a point and a line
A **parabola** is the set of points equally far from a fixed point (the **focus**) and a fixed line (the **directrix**). Take the focus at $(0, p)$ and the directrix $y = -p$. A point $(x, y)$ has distance $\sqrt{x^2 + (y - p)^2}$ to the focus and $y + p$ to the directrix. Setting them equal and squaring:
$$x^2 + y^2 - 2py + p^2 = y^2 + 2py + p^2 \implies x^2 = 4py \implies y = \frac{x^2}{4p}.$$
So the familiar graph $y = x^2$ is a parabola with $4p = 1$, focus $\left(0, \frac14\right)$ and directrix $y = -\frac14$. Every parabola from the quadratics lesson has a focus.

The reflection property: rays travelling parallel to the axis bounce off a parabola and pass through the focus. That is why satellite dishes, telescope mirrors and car headlights are parabolic. A headlight bulb at the focus sends light out in a parallel beam.

### Hyperbolas: a constant difference of distances
A **hyperbola** is the set of points where the *difference* of the distances to two foci is constant, $|d_1 - d_2| = 2a$. With foci $(\pm c, 0)$ the standard equation is
$$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1, \qquad c^2 = a^2 + b^2.$$
Notice the minus sign in the equation and the plus sign in the relation for $c$, the opposite of the ellipse. A hyperbola has two separate branches that open left and right, crossing the $x$-axis at $(\pm a, 0)$. Far from the centre, the branches approach two straight lines, the **asymptotes** $y = \pm\frac{b}{a}x$. For $\frac{x^2}{9} - \frac{y^2}{16} = 1$: $a = 3$, $b = 4$, $c = 5$, foci $(\pm 5, 0)$, and asymptotes $y = \pm\frac43 x$. The graph of $y = \frac1x$ from the rational functions lesson is also a hyperbola, rotated by $45°$.

### Eccentricity: how stretched a conic is
One number describes the shape of every conic: the **eccentricity** $e = \frac{c}{a}$. A circle has $e = 0$. Ellipses have $0 < e < 1$; the closer to 1, the more elongated. A parabola has $e = 1$, and hyperbolas have $e > 1$. Earth's orbit has eccentricity about $0.017$, so it is almost a circle; Halley's comet has $e \approx 0.967$, a long thin ellipse.

### Identifying a conic by completing the square
Equations often come expanded, like $x^2 + 4y^2 - 6x + 16y + 21 = 0$. To identify the curve, group the $x$ terms and the $y$ terms and complete the square:
$$(x^2 - 6x + 9) + 4(y^2 + 4y + 4) = -21 + 9 + 16 \implies (x - 3)^2 + 4(y + 2)^2 = 4.$$
Dividing by 4: $\frac{(x - 3)^2}{4} + \frac{(y + 2)^2}{1} = 1$, an ellipse centred at $(3, -2)$ with $a = 2$ and $b = 1$. A quick test before any algebra: if $x^2$ and $y^2$ have the same sign and equal coefficients, it is a circle; same sign and different coefficients, an ellipse; opposite signs, a hyperbola; only one of them squared, a parabola.

:::def Conic section
A curve formed by slicing a double cone with a plane: a circle, ellipse, parabola or hyperbola. Each has an equation of degree 2 in $x$ and $y$.
:::

:::def Focus
A special fixed point used to define a conic. Ellipses and hyperbolas have two foci, parabolas have one, and a circle's focus is its centre.
:::

:::def Eccentricity
The ratio $e = \frac{c}{a}$ measuring how far a conic is from circular: $e = 0$ circle, $0 < e < 1$ ellipse, $e = 1$ parabola, $e > 1$ hyperbola.
:::

### Common mistakes
:::warn Watch out
- Mixing up $c^2 = a^2 - b^2$ (ellipse) and $c^2 = a^2 + b^2$ (hyperbola).
- Forgetting to square the radius: $(x - 1)^2 + y^2 = 16$ has radius 4, not 16.
- Sign errors in the centre: $(x + 2)^2$ means the centre has $x = -2$.
- When completing the square with a coefficient, factor it out first and add the right amount to the other side.
:::

### Summary
Conics are defined by distances. A circle keeps a fixed distance from a centre; an ellipse keeps a constant sum of distances to two foci; a hyperbola keeps a constant difference; a parabola is equidistant from a focus and a directrix. Their standard forms are $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$, $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$ and $x^2 = 4py$, and eccentricity measures their shape. Completing the square reveals which conic an expanded equation describes.

@viz g02-conic | Choose a conic and move the point along it. The readout checks the distance property from the article.

:::explore
**What to try**
1. Choose "ellipse" with $a = 4$, $b = 2.5$. Slide the point $t$ all the way around. The two distances to the foci change, but their sum stays at $2a = 8$.
2. Increase $b$ towards $a$. The foci move together and the eccentricity drops towards 0: the ellipse becomes a circle.
3. Choose "parabola". Move the point and compare the distance to the focus with the distance to the directrix: they always match.
4. Choose "hyperbola". Check that $|d_1 - d_2| = 2a$ on both branches, and watch the asymptote slopes $\pm\frac{b}{a}$ change as you move the sliders.
5. Choose "circle" and confirm the distance from the centre is always $a$.

**What to notice:** the four definitions in the article (fixed distance, constant sum, equal distances, constant difference) hold at every point of each curve.
:::

@viz func kind=quadratic a=1 h=0 k=0 | A parabola as a graph. Change a and see the focus distance p = 1/(4a) change.

:::explore
**What to try**
1. With $a = 1$, the parabola is $y = x^2$, with focus at height $\frac14$.
2. Set $a = 0.25$. The curve widens; now $4p = 4$, so the focus is at height 1.
3. Make $a$ negative and see the parabola open downward, with its focus below the vertex.

**What to notice:** a wide parabola has a focus far from its vertex, and a narrow one has a focus close to it, because $p = \frac{1}{4a}$.
:::

:::formulas
$$\text{Circle: } (x - h)^2 + (y - k)^2 = r^2$$
$$\text{Ellipse: } \frac{x^2}{a^2} + \frac{y^2}{b^2} = 1,\quad c^2 = a^2 - b^2,\quad d_1 + d_2 = 2a$$
$$\text{Hyperbola: } \frac{x^2}{a^2} - \frac{y^2}{b^2} = 1,\quad c^2 = a^2 + b^2,\quad |d_1 - d_2| = 2a,\quad y = \pm\tfrac{b}{a}x$$
$$\text{Parabola: } x^2 = 4py,\ \text{focus } (0, p),\ \text{directrix } y = -p$$
$$e = \frac{c}{a}$$
:::

:::thm Focus of a parabola
The set of points equidistant from the focus $(0, p)$ and the directrix $y = -p$ is exactly the parabola $x^2 = 4py$.
:::

:::proof
A point $(x, y)$ is at distance $\sqrt{x^2 + (y - p)^2}$ from the focus and $|y + p|$ from the directrix. These are equal exactly when their squares are equal: $x^2 + y^2 - 2py + p^2 = y^2 + 2py + p^2$. Cancelling gives $x^2 = 4py$. Every step is reversible (both distances are non-negative), so the two sets are the same.
:::

:::steps Find the centre and radius of $x^2 + y^2 + 8x - 2y - 8 = 0$
1. Group: $(x^2 + 8x) + (y^2 - 2y) = 8$.
2. Complete the squares: $(x + 4)^2 - 16 + (y - 1)^2 - 1 = 8$.
3. $(x + 4)^2 + (y - 1)^2 = 25$.
4. Centre $(-4, 1)$, radius 5.
:::

:::steps Find the foci and eccentricity of $\frac{x^2}{169} + \frac{y^2}{144} = 1$
1. $a = 13$, $b = 12$.
2. $c = \sqrt{169 - 144} = 5$, so the foci are $(\pm 5, 0)$.
3. $e = \frac{5}{13} \approx 0.385$.
:::

:::steps A satellite dish is a parabola 2 m wide and 0.25 m deep. Where should the receiver go?
1. Put the vertex at the origin: $x^2 = 4py$, passing through $(1, 0.25)$.
2. $1 = 4p(0.25) = p$, so $p = 1$.
3. The receiver belongs at the focus, 1 m above the centre of the dish.
:::

:::mock Exam question
Consider $9x^2 - 4y^2 - 36 = 0$. (a) Identify the conic and write it in standard form. (b) Find its vertices, foci and asymptotes. (c) Find its eccentricity.
:::solution
(a) $x^2$ and $y^2$ have opposite signs, so it is a hyperbola. $9x^2 - 4y^2 = 36$ gives $\frac{x^2}{4} - \frac{y^2}{9} = 1$.
(b) $a = 2$, $b = 3$. Vertices $(\pm 2, 0)$. $c = \sqrt{4 + 9} = \sqrt{13}$, so foci $(\pm\sqrt{13}, 0)$. Asymptotes $y = \pm\frac32 x$.
(c) $e = \frac{\sqrt{13}}{2} \approx 1.80$, greater than 1 as expected.
:::
:::

:::ml
Many ML objects are ellipses. The level sets of a Gaussian distribution, $\{x : (x - \mu)^\top\Sigma^{-1}(x - \mu) = k\}$, are ellipses whose axes are the eigenvectors of the covariance matrix. The contours of a quadratic loss are ellipses too; when they are very elongated (high eccentricity), gradient descent zig-zags, which is why feature scaling and optimisers like Adam help. A support vector machine with a degree-2 polynomial kernel draws conic-shaped decision boundaries.
:::

:::cs
Computer graphics fonts and vector images (SVG, PostScript, TrueType) are built from quadratic Bézier curves, which are segments of parabolas. Collision detection for round or oval objects tests points against circle and ellipse equations.
:::

:::real
Planets and satellites travel on ellipses with the Sun or Earth at one focus (Kepler's first law). Earth's orbit has $e \approx 0.017$, so the distance to the Sun varies only about $3\%$ over a year. Comets on hyperbolic paths ($e > 1$) pass by once and never return.
:::

:::quiz
? What is the radius of the circle $(x - 1)^2 + (y + 2)^2 = 49$?
= 7
> $r^2 = 49$, so $r = 7$.

? For the ellipse $\frac{x^2}{25} + \frac{y^2}{16} = 1$, what is $c$ (the distance from the centre to a focus)?
= 3
> $c = \sqrt{25 - 16} = 3$.

? For the hyperbola $\frac{x^2}{16} - \frac{y^2}{9} = 1$, what is $c$?
= 5
> $c = \sqrt{16 + 9} = 5$.

? Where is the focus of $y = \frac{x^2}{8}$? Give its $y$-coordinate.
= 2
> $x^2 = 8y = 4py$ with $p = 2$.

? Which conic has eccentricity exactly 1?
- circle
- ellipse
+ parabola
- hyperbola
> Parabolas have $e = 1$; ellipses less, hyperbolas more.

? What kind of conic is $3x^2 + 5y^2 = 15$?
+ ellipse
- circle
- parabola
- hyperbola
> Both squares positive with different coefficients: $\frac{x^2}{5} + \frac{y^2}{3} = 1$.
:::

# Unit: Sequences, series and the binomial theorem

## Lesson: Sequences {#sequences}
@summary: Ordered lists that follow a rule: explicit and recursive formulas, arithmetic and geometric sequences, Fibonacci, and what it means for a sequence to converge.

### Patterns you can predict
A savings plan adds 50 dollars every month. A population of bacteria doubles every hour. A bouncing ball rises to $60\%$ of its previous height after every bounce. In each case we have a list of numbers, one for each step, that follows a rule. Such a list is a **sequence**. Sequences are how mathematics describes anything that happens in steps: loan payments, algorithm running times, the iterations of gradient descent, the training loss after each epoch. Once you know the rule, you can predict any term without listing all the earlier ones, and you can ask what happens in the long run.

### An everyday scenario: stacking cups
Picture a stack of paper cups. One cup is 12 cm tall, and each extra cup adds 1.5 cm because they nest. The heights of stacks of 1, 2, 3, 4 cups are $12, 13.5, 15, 16.5, \ldots$ centimetres. To find the height of a 40-cup stack you do not need to stack 40 cups: you start at 12 and add 1.5 a total of 39 times, giving $12 + 39 \times 1.5 = 70.5$ cm. That reasoning is the formula for an arithmetic sequence.

### What a sequence is
A **sequence** is an ordered list $a_1, a_2, a_3, \ldots$. The number $a_n$ is the **$n$th term**, and $n$ is its **index** (position). Formally, a sequence is a function whose inputs are the positive integers: $a_n$ is just $a(n)$. Sometimes it is convenient to start at $a_0$ instead.

There are two main ways to describe a sequence. An **explicit formula** gives $a_n$ directly from $n$. For $a_n = 2n + 1$: $a_1 = 3$, $a_2 = 5$, $a_{10} = 21$. A **recursive formula** gives a starting value and a rule for getting each term from earlier ones. For $a_1 = 3$, $a_n = a_{n-1} + 2$: start at 3 and keep adding 2, which produces the same odd numbers. Explicit formulas are fast for jumping to a far-away term; recursive formulas often match how a process actually works, step by step.

### Arithmetic sequences: add the same amount
An **arithmetic sequence** adds a constant **common difference** $d$ each step: $a_n = a_{n-1} + d$. Starting from $a_1$, after $n - 1$ steps you have added $d$ a total of $n - 1$ times:
$$a_n = a_1 + (n - 1)d.$$
For $5, 8, 11, 14, \ldots$, we have $a_1 = 5$ and $d = 3$, so $a_{20} = 5 + 19 \times 3 = 62$. If $d$ is negative the sequence decreases: $100, 93, 86, \ldots$ has $d = -7$. Plotted against $n$, an arithmetic sequence lies on a straight line with slope $d$; it is the "discrete version" of a linear function.

To test whether a list is arithmetic, subtract each term from the next. The list $2, 6, 10, 14$ has differences $4, 4, 4$, so it is arithmetic. The list $1, 4, 9, 16$ has differences $3, 5, 7$, so it is not.

### Geometric sequences: multiply by the same amount
A **geometric sequence** multiplies by a constant **common ratio** $r$ each step: $a_n = r \cdot a_{n-1}$. After $n - 1$ steps,
$$a_n = a_1 r^{n-1}.$$
The bacteria example, starting with 100 cells and doubling, gives $100, 200, 400, 800, \ldots$, so after 10 hours (the 11th term) there are $100 \times 2^{10} = 102400$ cells. The bouncing ball dropped from 5 m reaches $5 \times 0.6 = 3$ m, then $1.8$ m, then $1.08$ m: a geometric sequence with $r = 0.6$. To test whether a list is geometric, divide each term by the previous one and check that the ratios match. Geometric sequences are the discrete version of exponential functions, which is why they grow (or shrink) so dramatically.

If $r$ is negative, the terms alternate in sign: $3, -6, 12, -24, \ldots$ has $r = -2$.

### Other important sequences
Not every sequence is arithmetic or geometric. The square numbers $a_n = n^2$ give $1, 4, 9, 16, \ldots$. The **Fibonacci sequence** is defined recursively by two starting values and a rule using the previous *two* terms: $F_1 = F_2 = 1$ and $F_n = F_{n-1} + F_{n-2}$, giving $1, 1, 2, 3, 5, 8, 13, 21, \ldots$. The ratios of consecutive Fibonacci numbers, $\frac{21}{13} \approx 1.615$, $\frac{34}{21} \approx 1.619$, approach the golden ratio $\varphi = \frac{1 + \sqrt5}{2} \approx 1.618$.

### Convergence: where is the sequence heading?
Look at $a_n = \frac{1}{n}$: $1, 0.5, 0.333, 0.25, \ldots, 0.01$ (at $n = 100$), $0.001$ (at $n = 1000$). The terms get closer and closer to 0, and they stay close. We say the sequence **converges** to the **limit** 0 and write $\lim_{n\to\infty}\frac1n = 0$ or $\frac1n \to 0$. Precisely, $a_n \to L$ means that for any tolerance you choose, however small, the terms are eventually all within that tolerance of $L$. For $\frac1n$ and a tolerance of $0.001$, every term from $n = 1001$ on is within $0.001$ of 0.

A sequence that does not converge **diverges**. It may grow without bound, like $a_n = 2n$ or $2^n$, or it may oscillate, like $(-1)^n$, which jumps between $-1$ and $1$ forever and never settles.

For a geometric sequence $r^n$, the behaviour depends only on $r$. If $|r| < 1$, the terms shrink to 0: $0.9^{10} \approx 0.349$, $0.9^{100} \approx 0.0000266$. If $r = 1$, every term is 1. If $|r| > 1$, the terms blow up in size, and if $r = -1$ they oscillate.

For a ratio of polynomials, compare the leading terms. In $a_n = \frac{3n + 1}{n + 2}$, divide the top and bottom by $n$: $\frac{3 + 1/n}{1 + 2/n}$. As $n$ grows, $\frac1n$ and $\frac2n$ go to 0, so $a_n \to 3$. Check: $a_{1000} = \frac{3001}{1002} \approx 2.995$.

:::def Sequence
An ordered list of numbers $a_1, a_2, a_3, \ldots$; equivalently, a function from the positive integers to the reals.
:::

:::def Arithmetic sequence
A sequence with a constant difference $d$ between consecutive terms: $a_n = a_1 + (n - 1)d$.
:::

:::def Geometric sequence
A sequence with a constant ratio $r$ between consecutive terms: $a_n = a_1 r^{n-1}$.
:::

:::def Limit of a sequence
$\lim_{n\to\infty} a_n = L$ if the terms eventually stay within any chosen distance of $L$. A sequence with a limit converges; otherwise it diverges.
:::

### Common mistakes
:::warn Watch out
- Using $a_1 + nd$ instead of $a_1 + (n - 1)d$. The first term has had zero steps added.
- Confusing difference and ratio: $2, 4, 8$ has ratio 2, not difference 2.
- Thinking terms that get smaller must converge to 0. The sequence $1 + \frac1n$ decreases but converges to 1.
- Assuming a recursive rule needs only one starting value. Fibonacci needs two.
:::

### Summary
A sequence is a list indexed by $n$, given explicitly or recursively. Arithmetic sequences add a constant $d$ and grow linearly; geometric sequences multiply by a constant $r$ and grow or decay exponentially. A sequence converges if its terms settle down to a limit; $r^n \to 0$ exactly when $|r| < 1$.

@viz sequence | Compare adding (arithmetic) with multiplying (geometric). Bars are terms; the orange line is the running sum.

:::explore
**What to try**
1. Choose "arithmetic" with $a = 1$ and $d = 0.5$. The bars rise in a straight line, like the cup stack.
2. Make $d$ negative and watch the bars fall steadily.
3. Choose "geometric" with $r = 0.7$. The bars shrink toward 0: convergence because $|r| < 1$.
4. Set $r = 1.2$ and then $r = 1.5$. The bars eventually shoot up much faster than any arithmetic sequence.
5. Set $r = -0.8$ and watch the terms alternate sign while shrinking.

**What to notice:** arithmetic sequences change by a constant amount and geometric sequences by a constant factor, exactly as in the article, and only geometric sequences with $|r| < 1$ settle at 0.
:::

:::formulas
$$\text{Arithmetic: } a_n = a_1 + (n - 1)d,\quad a_n = a_{n-1} + d$$
$$\text{Geometric: } a_n = a_1r^{n-1},\quad a_n = r\,a_{n-1}$$
$$\text{Fibonacci: } F_n = F_{n-1} + F_{n-2},\ F_1 = F_2 = 1$$
$$r^n \to 0 \text{ if } |r| < 1,\qquad \tfrac{1}{n^p} \to 0 \text{ for } p > 0$$
:::

:::thm Limits of geometric sequences
$r^n \to 0$ if $|r| < 1$; $r^n = 1$ for all $n$ if $r = 1$; and $r^n$ diverges if $r = -1$ or $|r| > 1$.
:::

:::proof For $r > 1$
Write $r = 1 + h$ with $h > 0$. By expanding (or by the binomial theorem), $(1 + h)^n \ge 1 + nh$, which grows without bound as $n$ increases. So $r^n \to \infty$. For $0 < |r| < 1$, apply this to $\frac{1}{|r|} > 1$: $\frac{1}{|r|^n} \to \infty$, so $|r|^n \to 0$, and hence $r^n \to 0$.
:::

:::steps The 4th term of an arithmetic sequence is 17 and the 10th is 41. Find $a_1$ and $d$
1. From term 4 to term 10 is 6 steps: $6d = 41 - 17 = 24$, so $d = 4$.
2. $a_4 = a_1 + 3d$: $17 = a_1 + 12$, so $a_1 = 5$.
3. Check: $a_{10} = 5 + 9 \times 4 = 41$.
:::

:::steps A car worth 20000 dollars loses $15\%$ of its value every year. What is it worth after 6 years?
1. Each year it keeps $85\%$, so $r = 0.85$.
2. After 6 years: $20000 \times 0.85^6$.
3. $0.85^6 \approx 0.3771$, so the value is about 7543 dollars.
:::

:::steps Find the limit of $a_n = \frac{2n^2 - 1}{5n^2 + n}$
1. Divide top and bottom by $n^2$: $\frac{2 - 1/n^2}{5 + 1/n}$.
2. As $n \to \infty$, $\frac{1}{n^2} \to 0$ and $\frac1n \to 0$.
3. The limit is $\frac25 = 0.4$.
:::

:::mock Exam question
A ball is dropped from 8 m and each bounce reaches $\frac34$ of the previous height. (a) Write a formula for the height $h_n$ of the $n$th bounce. (b) Find $h_5$. (c) After how many bounces is the height first below 1 m? (d) What is $\lim_{n\to\infty} h_n$?
:::solution
(a) $h_1 = 8 \times \frac34 = 6$, so $h_n = 6\left(\frac34\right)^{n-1} = 8\left(\frac34\right)^n$.
(b) $h_5 = 8 \times 0.75^5 \approx 8 \times 0.2373 \approx 1.90$ m.
(c) We need $8(0.75)^n < 1$, so $0.75^n < 0.125$. Taking logs: $n > \frac{\ln 0.125}{\ln 0.75} \approx 7.23$. So the 8th bounce is the first below 1 m ($h_8 \approx 0.80$ m, while $h_7 \approx 1.07$ m).
(d) $0$, since $\left|\frac34\right| < 1$.
:::
:::

:::ml
Training is a sequence. The losses $L_1, L_2, L_3, \ldots$ after each step should converge, and with a learning rate that is too large they diverge or oscillate. Learning-rate schedules are sequences too: exponential decay $\eta_t = \eta_0\gamma^t$ is geometric. Momentum and Adam keep exponential moving averages $m_t = \beta m_{t-1} + (1 - \beta)g_t$, a recursive sequence in which old gradients fade geometrically.
:::

:::cs
Recursive definitions become recursive functions. A direct translation of Fibonacci, `fib(n) = fib(n-1) + fib(n-2)`, takes exponential time because it recomputes the same values; storing results (memoisation) or looping from the bottom up makes it linear. Arrays are sequences in memory, and loops generate arithmetic sequences of indices.
:::

:::real
A gym membership charges a 60 dollar joining fee and 25 dollars per month. The total paid after $n$ months is the arithmetic sequence $60 + 25n$: after a year, $60 + 300 = 360$ dollars.
:::

:::quiz
? Find the 10th term of $3, 7, 11, 15, \ldots$
= 39
> $a_1 = 3$, $d = 4$: $3 + 9 \times 4 = 39$.

? What is the common ratio of $81, 27, 9, 3, \ldots$?
= 1/3|0.3333
> Each term is one third of the previous one.

? Find the 6th term of the geometric sequence with $a_1 = 2$ and $r = 3$.
= 486
> $2 \times 3^5 = 2 \times 243 = 486$.

? What is $\lim_{n\to\infty}\frac{n}{n + 1}$?
= 1
> Divide by $n$: $\frac{1}{1 + 1/n} \to 1$.

? Which sequence diverges?
- $0.5^n$
- $\frac{1}{n}$
+ $(-1)^n$
- $1 + \frac{1}{n}$
> It oscillates between $-1$ and $1$ and never settles.

? What is the 8th Fibonacci number ($F_1 = F_2 = 1$)?
= 21
> $1, 1, 2, 3, 5, 8, 13, 21$.
:::

## Lesson: Series and sigma notation {#series}
@summary: Adding up terms of a sequence: sigma notation, arithmetic and geometric sums, infinite series as limits of partial sums, the harmonic series, and convergence tests.

### From lists to totals
A sequence is a list; a **series** is what you get when you add up the list. If you save 50 dollars in month 1, 60 in month 2, 70 in month 3, and so on, the sequence tells you each deposit, but the question you care about is the total. If a ball bounces forever with each bounce smaller, the heights form a sequence, but the total distance travelled is a series. Remarkably, adding infinitely many positive numbers can give a finite answer, and this idea is at the heart of calculus, probability and the discounted rewards used in reinforcement learning.

### An everyday scenario: walking to the wall
Stand 2 metres from a wall. Walk half the distance (1 m), then half of what remains (0.5 m), then half again (0.25 m), and so on forever. You take infinitely many steps, yet the total distance walked is
$$1 + 0.5 + 0.25 + 0.125 + \cdots = 2.$$
After 1 step you have covered 1 m, after 2 steps 1.5 m, after 3 steps 1.75 m, after 10 steps about 1.998 m. You never pass the wall, and you get as close as you like. The total is exactly 2. This is the ancient puzzle of Zeno, and its resolution is the idea of a convergent series.

### Sigma notation
Writing long sums out is tedious, so we use the Greek capital letter sigma:
$$\sum_{k=1}^{n} a_k = a_1 + a_2 + \cdots + a_n.$$
Read it as "the sum of $a_k$ for $k$ from 1 to $n$". The letter $k$ is the **index**; it is a placeholder and could be any letter. For example, $\sum_{k=1}^{4} k^2 = 1 + 4 + 9 + 16 = 30$, and $\sum_{k=0}^{3} 2^k = 1 + 2 + 4 + 8 = 15$.

Sigma notation obeys simple rules because addition does. Constants factor out: $\sum 5a_k = 5\sum a_k$. Sums split: $\sum (a_k + b_k) = \sum a_k + \sum b_k$. And a constant added $n$ times gives $\sum_{k=1}^{n} c = nc$. But beware: $\sum a_kb_k$ is **not** $\left(\sum a_k\right)\left(\sum b_k\right)$.

### Arithmetic series: Gauss's trick
The story goes that the young Carl Friedrich Gauss was asked to add the numbers from 1 to 100. He wrote the sum forwards and backwards:
$$S = 1 + 2 + \cdots + 100, \qquad S = 100 + 99 + \cdots + 1.$$
Adding column by column, every pair sums to 101, and there are 100 pairs. So $2S = 100 \times 101$ and $S = 5050$. The same trick works for any arithmetic sequence: the sum is the number of terms times the average of the first and last terms,
$$S_n = \frac{n(a_1 + a_n)}{2}, \qquad \sum_{k=1}^{n} k = \frac{n(n + 1)}{2}.$$
For the savings example (50, 60, 70, ... for 12 months), the last deposit is $50 + 11 \times 10 = 160$, so the total is $\frac{12(50 + 160)}{2} = 1260$ dollars.

### Geometric series: the shift-and-subtract trick
For $S_n = a + ar + ar^2 + \cdots + ar^{n-1}$, multiply by $r$ to shift every term one place:
$$rS_n = ar + ar^2 + \cdots + ar^n.$$
Subtracting, almost everything cancels: $S_n - rS_n = a - ar^n$. So, for $r \ne 1$,
$$S_n = a\,\frac{1 - r^n}{1 - r}.$$
Check with $1 + 2 + 4 + 8$: $a = 1$, $r = 2$, $n = 4$, so $S_4 = \frac{1 - 16}{1 - 2} = 15$. A famous example: one grain of rice on the first square of a chessboard, two on the second, four on the third, doubling each time. The total over 64 squares is $2^{64} - 1 \approx 1.8 \times 10^{19}$ grains, far more rice than has ever been grown.

### Infinite series and partial sums
What could $\sum_{k=1}^{\infty} a_k$ mean, when we can never finish adding? We define it through the **partial sums** $S_n = a_1 + \cdots + a_n$, which form an ordinary sequence. If the partial sums converge to a limit $S$, we say the series **converges** and its sum is $S$. Otherwise it **diverges**. In the wall example, $S_n = 2 - 2\left(\frac12\right)^n$, which converges to 2.

For a geometric series with $|r| < 1$, the term $r^n$ in the finite formula goes to 0, which gives the infinite geometric series:
$$\sum_{k=0}^{\infty} ar^k = \frac{a}{1 - r} \quad (|r| < 1).$$
For example $3 + 1 + \frac13 + \frac19 + \cdots = \frac{3}{1 - 1/3} = 4.5$. This also explains repeating decimals: $0.999\ldots = \frac{9}{10} + \frac{9}{100} + \cdots = \frac{0.9}{1 - 0.1} = 1$. If $|r| \ge 1$, the terms do not shrink, and the series diverges.

### Shrinking terms are not enough: the harmonic series
If a series converges, its terms must go to 0, because $a_n = S_n - S_{n-1}$ and both partial sums approach the same limit. That gives the **divergence test**: if the terms do not tend to 0, the series diverges. But the converse is false. The **harmonic series**
$$1 + \frac12 + \frac13 + \frac14 + \frac15 + \cdots$$
has terms that go to 0, yet it diverges. Group the terms: $\frac13 + \frac14 > \frac14 + \frac14 = \frac12$; the next four terms $\frac15$ to $\frac18$ are each at least $\frac18$, so they add to more than $\frac12$; the next eight add to more than $\frac12$; and so on. Infinitely many groups each worth more than $\frac12$ add up to infinity. It grows very slowly (about $\ln n$; the first million terms sum to only about 14.4), but it grows without bound.

### Convergence tests
For a **p-series** $\sum \frac{1}{k^p}$, the rule is: it converges exactly when $p > 1$. So $\sum \frac{1}{k^2}$ converges (to $\frac{\pi^2}{6} \approx 1.645$), but $\sum \frac{1}{\sqrt k}$ diverges. The **comparison test** says that a series of positive terms smaller than a convergent series converges, and one larger than a divergent series diverges. The **ratio test** says that if $\left|\frac{a_{k+1}}{a_k}\right|$ approaches a limit $L < 1$, the series converges, behaving eventually like a geometric series; if $L > 1$ it diverges. For $\sum \frac{1}{k!}$, the ratio is $\frac{1}{k + 1} \to 0$, so it converges (to $e - 1$, when started at $k = 1$).

:::def Series
The sum of the terms of a sequence. A finite series is written $\sum_{k=1}^{n} a_k$; an infinite series $\sum_{k=1}^{\infty} a_k$ is defined as the limit of its partial sums.
:::

:::def Partial sum
$S_n = a_1 + a_2 + \cdots + a_n$, the sum of the first $n$ terms of a series.
:::

:::def Harmonic series
$\sum_{k=1}^{\infty} \frac1k = 1 + \frac12 + \frac13 + \cdots$, which diverges even though its terms tend to 0.
:::

### Common mistakes
:::warn Watch out
- Using $\frac{a}{1 - r}$ when $|r| \ge 1$. The infinite sum only exists for $|r| < 1$.
- Thinking that terms tending to 0 guarantees convergence. The harmonic series is the counterexample.
- Off-by-one errors in the index: $\sum_{k=0}^{n} r^k$ has $n + 1$ terms.
- Treating $\sum a_kb_k$ as the product of the two sums.
:::

### Summary
A series adds the terms of a sequence. Sigma notation writes sums compactly. Arithmetic sums are $\frac{n(\text{first} + \text{last})}{2}$; geometric sums are $a\frac{1 - r^n}{1 - r}$, and for $|r| < 1$ the infinite geometric series sums to $\frac{a}{1 - r}$. An infinite series converges when its partial sums have a limit. Terms must tend to 0, but that alone is not enough: the harmonic series diverges, while $\sum\frac{1}{k^p}$ converges for $p > 1$.

@viz sigma term=half n=8 | Bars are the terms, and the readout adds them. Compare a convergent series with the harmonic series.

:::explore
**What to try**
1. With the term $\left(\frac12\right)^i$, raise $n$ from 1 to 12. The total creeps up to $0.5, 0.75, 0.875, \ldots$ and never exceeds 1: this is the wall walk (scaled by a half).
2. Switch the term to $\frac1i$ (harmonic). At $n = 12$ the sum is already about $3.10$, and it would keep growing past any number if $n$ could go on.
3. Switch to $2i - 1$ (odd numbers). Check that the sum of the first $n$ odd numbers is $n^2$: 1, 4, 9, 16, ...
4. Switch to $i$ and confirm $\sum_{i=1}^{n} i = \frac{n(n + 1)}{2}$, for example 78 at $n = 12$.

**What to notice:** both $\left(\frac12\right)^i$ and $\frac1i$ have bars shrinking to 0, but only the geometric one has a finite total, exactly the difference the article explains.
:::

@viz sequence | Choose geometric and watch the running sum (orange) level off when |r| < 1.

:::explore
**What to try**
1. Choose "geometric" with $a = 1$ and $r = 0.5$. The running sum approaches $\frac{1}{1 - 0.5} = 2$.
2. Set $r = 0.8$. The sum approaches $\frac{1}{0.2} = 5$, more slowly.
3. Set $r = 1.1$. The running sum keeps climbing: no finite total.

**What to notice:** the orange line is the sequence of partial sums. When it levels off, the series converges, and its level matches $\frac{a}{1 - r}$.
:::

:::formulas
$$\sum_{k=1}^{n} k = \frac{n(n + 1)}{2},\quad \sum_{k=1}^{n} k^2 = \frac{n(n + 1)(2n + 1)}{6},\quad \sum_{k=1}^{n}(2k - 1) = n^2$$
$$\text{Arithmetic: } S_n = \frac{n(a_1 + a_n)}{2}$$
$$\text{Geometric: } \sum_{k=0}^{n-1} ar^k = a\frac{1 - r^n}{1 - r},\quad \sum_{k=0}^{\infty} ar^k = \frac{a}{1 - r}\ (|r| < 1)$$
$$\sum_{k=1}^{\infty}\frac{1}{k^p} \text{ converges} \iff p > 1$$
:::

:::thm Infinite geometric series
If $|r| < 1$, then $\sum_{k=0}^{\infty} ar^k = \frac{a}{1 - r}$. If $|r| \ge 1$ and $a \ne 0$, the series diverges.
:::

:::proof
The partial sums are $S_n = a\frac{1 - r^n}{1 - r}$, from the shift-and-subtract argument. If $|r| < 1$ then $r^n \to 0$, so $S_n \to \frac{a}{1 - r}$. If $|r| \ge 1$, then $|ar^n| \ge |a| > 0$, so the terms do not tend to 0, and by the divergence test the series diverges.
:::

:::steps Find $\sum_{k=1}^{20}(3k + 2)$
1. Split: $3\sum_{k=1}^{20} k + \sum_{k=1}^{20} 2$.
2. $\sum k = \frac{20 \times 21}{2} = 210$, and $\sum 2 = 40$.
3. Total: $3 \times 210 + 40 = 670$.
:::

:::steps Write $0.\overline{36} = 0.363636\ldots$ as a fraction
1. $0.\overline{36} = \frac{36}{100} + \frac{36}{10000} + \cdots$, geometric with $a = 0.36$, $r = 0.01$.
2. Sum: $\frac{0.36}{1 - 0.01} = \frac{0.36}{0.99} = \frac{36}{99} = \frac{4}{11}$.
3. Check: $4 \div 11 = 0.3636\ldots$
:::

:::steps Find $\sum_{k=1}^{\infty} 5\left(\frac{2}{3}\right)^k$
1. The first term ($k = 1$) is $a = \frac{10}{3}$, and $r = \frac23$.
2. Sum: $\frac{10/3}{1 - 2/3} = \frac{10/3}{1/3} = 10$.
:::

:::mock Exam question
A ball is dropped from 10 m and each bounce rises to $\frac{3}{5}$ of the previous height. (a) Find the total distance travelled, going down and up, if it bounces forever. (b) Does $\sum_{k=1}^{\infty}\frac{k}{k + 1}$ converge? Explain.
:::solution
(a) Down: $10 + 6 + 3.6 + \cdots = \frac{10}{1 - 0.6} = 25$ m. Up: $6 + 3.6 + \cdots = \frac{6}{0.4} = 15$ m. Total: $40$ m.
(b) No. The terms $\frac{k}{k + 1} \to 1 \ne 0$, so by the divergence test the series diverges.
:::
:::

:::ml
In reinforcement learning, the return is the discounted sum $G = \sum_{t=0}^{\infty}\gamma^t r_t$ with $0 \le \gamma < 1$. If every reward is at most $r_{\max}$, the geometric series bounds the return by $\frac{r_{\max}}{1 - \gamma}$, so values stay finite; with $\gamma = 0.99$ the agent effectively looks about $\frac{1}{1 - \gamma} = 100$ steps ahead. Loss functions are sums over examples, $\frac1n\sum_{i} \ell_i$, and the convergence analysis of SGD requires step sizes with $\sum\eta_t = \infty$ but $\sum\eta_t^2 < \infty$.
:::

:::cs
$1 + 2 + 4 + \cdots + 2^k = 2^{k+1} - 1$. That is why a dynamic array that doubles its capacity does a total copying work of less than twice its size, giving amortised $O(1)$ appends, and why a complete binary tree with $2^k$ leaves has $2^{k+1} - 1$ nodes. A nested loop where the inner loop runs $i$ times does $\sum_{i=1}^{n} i = \frac{n(n + 1)}{2}$ steps, which is $O(n^2)$.
:::

:::real
A loan or savings plan with regular payments is a geometric series. Saving 100 dollars at the end of each year for 10 years at $5\%$ interest gives $100(1 + 1.05 + 1.05^2 + \cdots + 1.05^9) = 100\frac{1.05^{10} - 1}{0.05} \approx 1257.79$ dollars.
:::

:::quiz
? Compute $1 + 2 + \cdots + 100$.
= 5050
> $\frac{100 \times 101}{2}$.

? Compute $\sum_{k=0}^{\infty}\left(\frac13\right)^k$.
= 3/2|1.5
> $\frac{1}{1 - 1/3} = \frac32$.

? Compute $\sum_{k=1}^{4} k^2$.
= 30
> $1 + 4 + 9 + 16$.

? Does $\sum\frac{1}{k^2}$ converge?
+ Yes
- No
> A p-series with $p = 2 > 1$. Its sum is $\frac{\pi^2}{6}$.

? Does the harmonic series $\sum\frac1k$ converge?
- Yes, because the terms go to 0
+ No, it grows without bound
> Grouping terms gives infinitely many blocks each worth more than $\frac12$.

? What is $1 + 2 + 4 + \cdots + 512$?
= 1023
> $2^{10} - 1 = 1023$ (ten terms, from $2^0$ to $2^9$).
:::

## Lesson: The binomial theorem and Pascal's triangle {#binomial-theorem}
@summary: Expanding (a + b) to any power without multiplying it out, binomial coefficients, Pascal's triangle and its patterns, and finding a single term of an expansion.

### Why expanding powers matters
You know $(a + b)^2 = a^2 + 2ab + b^2$. What about $(a + b)^5$, or $(x + 2)^{10}$? Multiplying out ten brackets by hand would take a long time and invite errors. The **binomial theorem** gives the answer directly. It also explains coin-flip probabilities, counts subsets, approximates powers like $1.01^{10}$, and lies behind the binomial distribution used throughout statistics and machine learning.

### An everyday scenario: choosing pizza toppings
A pizza shop offers 5 toppings, and you want exactly 2. How many choices do you have? List them as pairs: there are $\binom{5}{2} = 10$. Now think about $(a + b)^5 = (a + b)(a + b)(a + b)(a + b)(a + b)$. When you expand, each term comes from choosing either $a$ or $b$ from each of the 5 brackets. The term $a^3b^2$ appears once for each way to choose which 2 of the 5 brackets supply a $b$, which is 10 ways. So the coefficient of $a^3b^2$ is 10. Expanding a binomial is a counting problem in disguise.

### Binomial coefficients
The number of ways to choose $k$ items from $n$, ignoring order, is the **binomial coefficient**
$$\binom{n}{k} = \frac{n!}{k!\,(n - k)!},$$
read "$n$ choose $k$", where $n! = n(n - 1)\cdots 2 \cdot 1$ and $0! = 1$. For example, $\binom{5}{2} = \frac{120}{2 \times 6} = 10$, and $\binom{6}{3} = \frac{720}{6 \times 6} = 20$. A faster way to compute: $\binom{n}{k} = \frac{n(n - 1)\cdots(n - k + 1)}{k!}$, so $\binom{10}{3} = \frac{10 \times 9 \times 8}{6} = 120$.

Two properties are worth knowing. **Symmetry**: $\binom{n}{k} = \binom{n}{n - k}$, because choosing $k$ to take is the same as choosing $n - k$ to leave. And $\binom{n}{0} = \binom{n}{n} = 1$: there is one way to choose nothing, and one way to choose everything.

### The binomial theorem
Putting the counting argument into a formula:
$$(a + b)^n = \sum_{k=0}^{n}\binom{n}{k}a^{n-k}b^k = a^n + \binom{n}{1}a^{n-1}b + \binom{n}{2}a^{n-2}b^2 + \cdots + b^n.$$
In each term the powers of $a$ and $b$ add to $n$, the power of $a$ falls by one each time, and the power of $b$ rises by one. For $n = 4$, the coefficients are $1, 4, 6, 4, 1$:
$$(a + b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4.$$
Quick check with $a = b = 1$: the left side is $2^4 = 16$, and the right side is $1 + 4 + 6 + 4 + 1 = 16$.

### Pascal's triangle
Write the coefficients for $n = 0, 1, 2, \ldots$ in rows:

$$\begin{array}{c} 1 \\ 1\quad 1 \\ 1\quad 2\quad 1 \\ 1\quad 3\quad 3\quad 1 \\ 1\quad 4\quad 6\quad 4\quad 1 \\ 1\quad 5\quad 10\quad 10\quad 5\quad 1 \end{array}$$

Each entry is the sum of the two entries just above it: $6 = 3 + 3$, $10 = 4 + 6$. This is **Pascal's rule**, $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$. The reason: to choose $k$ items from $n$, consider one particular item. Either you choose it (then pick $k - 1$ more from the other $n - 1$), or you do not (then pick all $k$ from the other $n - 1$). Pascal's triangle lets you build coefficients by addition alone, with no factorials.

The triangle hides many patterns. Each row sums to a power of 2: row 5 gives $1 + 5 + 10 + 10 + 5 + 1 = 32 = 2^5$, because a set of 5 items has 32 subsets. The rows are symmetric. And colouring the odd entries produces the fractal Sierpinski triangle.

### Using the theorem with numbers and signs
For $(x - 2)^3$, take $a = x$ and $b = -2$, and keep the sign inside the powers:
$$(x - 2)^3 = x^3 + 3x^2(-2) + 3x(-2)^2 + (-2)^3 = x^3 - 6x^2 + 12x - 8.$$
Check at $x = 3$: $(3 - 2)^3 = 1$ and $27 - 54 + 36 - 8 = 1$. The signs alternate whenever $b$ is negative.

### Finding one term
Often you only need one term. The general term of $(a + b)^n$ is $\binom{n}{k}a^{n-k}b^k$. To find the coefficient of $x^3$ in $(2x + 1)^5$: we need $a^{n-k} = (2x)^3$, so $n - k = 3$ and $k = 2$. The term is $\binom52(2x)^3(1)^2 = 10 \times 8x^3 = 80x^3$, so the coefficient is 80.

### Approximations
When $b$ is small, the first few terms dominate. For $(1 + x)^n \approx 1 + nx + \binom{n}{2}x^2$: $1.01^{10} \approx 1 + 0.1 + 45 \times 0.0001 = 1.1045$. The true value is $1.10462\ldots$, very close. This is why a small interest rate compounded a few times grows almost linearly at first.

:::def Binomial coefficient
$\binom{n}{k} = \frac{n!}{k!(n - k)!}$, the number of ways to choose $k$ items from $n$ without regard to order; also the coefficient of $a^{n-k}b^k$ in $(a + b)^n$.
:::

:::def Pascal's triangle
The triangular array whose $n$th row lists $\binom{n}{0}, \ldots, \binom{n}{n}$, in which each entry is the sum of the two above it.
:::

### Seeing the counting argument in a small case
It helps to watch the counting argument happen once by hand. Expand $(a + b)^3 = (a + b)(a + b)(a + b)$ by picking one letter from each bracket in every possible way. There are $2 \times 2 \times 2 = 8$ choices: $aaa$, $aab$, $aba$, $baa$, $abb$, $bab$, $bba$ and $bbb$. Now group them by how many $b$'s they contain. One choice has no $b$ and gives $a^3$. Three choices have exactly one $b$ (the $b$ came from the first, second or third bracket) and give $3a^2b$. Three have two $b$'s and give $3ab^2$. One has three and gives $b^3$. So $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$, and the coefficients $1, 3, 3, 1$ are exactly $\binom30, \binom31, \binom32, \binom33$. Every coefficient in every expansion is found the same way: count how many of the $2^n$ letter choices produce that term. This is also why the coefficients in a row add to $2^n$: together they count all the choices.

### Coin flips and probability
The same counting answers probability questions. Flip a fair coin 4 times. Each of the $2^4 = 16$ sequences of heads and tails is equally likely. The number of sequences with exactly 2 heads is the number of ways to choose which 2 of the 4 flips are heads, $\binom42 = 6$. So the probability of exactly 2 heads is $\frac{6}{16} = 0.375$. The full row $1, 4, 6, 4, 1$ gives the chances of 0, 1, 2, 3 and 4 heads, which add to $\frac{16}{16} = 1$. When the coin is biased, with probability $p$ of heads, the theorem applied to $(p + (1 - p))^n$ gives the binomial distribution that you will meet in the probability course.

### Common mistakes
:::warn Watch out
- $(a + b)^n \ne a^n + b^n$. For example $(1 + 1)^2 = 4$, not 2.
- Forgetting to raise the coefficient: in $(2x)^3$ the 2 is cubed too, giving $8x^3$.
- Dropping signs: for $(x - 3)^n$ use $b = -3$, so odd powers of $b$ are negative.
- Row numbering starts at $n = 0$; row "1 4 6 4 1" is row 4.
:::

### Summary
Expanding $(a + b)^n$ is a counting problem: the coefficient of $a^{n-k}b^k$ is $\binom{n}{k}$, the number of ways to choose $k$ brackets to supply $b$. Coefficients can be computed by factorials or read from Pascal's triangle, where each entry is the sum of the two above it and each row sums to $2^n$. Use the general term $\binom{n}{k}a^{n-k}b^k$ to find one term, and the first few terms for quick approximations.

@viz pascal | Pascal's triangle. Change the number of rows and colour entries by divisibility.

:::explore
**What to try**
1. Set rows to 6 and check row 4 reads $1, 4, 6, 4, 1$, the coefficients of $(a + b)^4$.
2. Pick any entry and verify it equals the sum of the two entries above it.
3. Add up a row and confirm it is a power of 2.
4. Increase rows to 32 with "color multiples of" set to 2. The odd entries form the Sierpinski triangle.

**What to notice:** every number in the triangle is a binomial coefficient $\binom{n}{k}$, and Pascal's rule from the article is visible as "add the two above".
:::

:::formulas
$$(a + b)^n = \sum_{k=0}^{n}\binom{n}{k}a^{n-k}b^k$$
$$\binom{n}{k} = \frac{n!}{k!(n - k)!},\quad \binom{n}{k} = \binom{n}{n - k},\quad \binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$$
$$\sum_{k=0}^{n}\binom{n}{k} = 2^n,\quad (1 + x)^n \approx 1 + nx + \tfrac{n(n - 1)}{2}x^2 \text{ for small } x$$
:::

:::thm Pascal's rule
For $1 \le k \le n - 1$: $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$.
:::

:::proof
Algebraically: $\binom{n-1}{k-1} + \binom{n-1}{k} = \frac{(n-1)!}{(k-1)!(n-k)!} + \frac{(n-1)!}{k!(n-k-1)!}$. Put both over $k!(n - k)!$: the numerators become $(n - 1)!\,k$ and $(n - 1)!\,(n - k)$, which add to $(n - 1)!\,n = n!$. So the sum is $\frac{n!}{k!(n - k)!} = \binom{n}{k}$.
:::

:::steps Expand $(2x + 3)^3$
1. Coefficients for $n = 3$: $1, 3, 3, 1$.
2. Terms: $(2x)^3 + 3(2x)^2(3) + 3(2x)(3)^2 + 3^3$.
3. $= 8x^3 + 36x^2 + 54x + 27$.
4. Check at $x = 1$: $5^3 = 125$ and $8 + 36 + 54 + 27 = 125$.
:::

:::steps Find the coefficient of $x^2$ in $(x - 1)^6$
1. General term $\binom6k x^{6-k}(-1)^k$. We need $6 - k = 2$, so $k = 4$.
2. $\binom64(-1)^4 = 15$.
3. The coefficient is 15.
:::

:::steps Find the constant term of $\left(x + \frac{1}{x}\right)^4$
1. General term $\binom4k x^{4-k}x^{-k} = \binom4k x^{4-2k}$.
2. Constant when $4 - 2k = 0$, so $k = 2$.
3. $\binom42 = 6$.
:::

:::mock Exam question
(a) Write the first four terms of $(1 + 2x)^8$ in ascending powers of $x$. (b) Use them to estimate $1.02^8$. (c) What is the probability of exactly 3 heads in 5 fair coin flips?
:::solution
(a) $1 + 8(2x) + 28(2x)^2 + 56(2x)^3 = 1 + 16x + 112x^2 + 448x^3$.
(b) $1.02 = 1 + 2(0.01)$, so $x = 0.01$: $1 + 0.16 + 0.0112 + 0.000448 = 1.171648$. (The true value is $1.171659\ldots$)
(c) There are $2^5 = 32$ equally likely outcomes, and $\binom53 = 10$ of them have exactly 3 heads, so the probability is $\frac{10}{32} = \frac{5}{16} = 0.3125$.
:::
:::

:::ml
The binomial distribution, $P(k \text{ successes in } n \text{ trials}) = \binom{n}{k}p^k(1 - p)^{n-k}$, models the number of correct predictions on a test set, the number of clicks out of $n$ ad impressions, and the number of active units under dropout. Its coefficients are exactly the binomial coefficients, and summing it over $k$ is the binomial theorem applied to $(p + (1 - p))^n = 1$.
:::

:::cs
$\binom{n}{k}$ counts subsets, so it appears whenever an algorithm examines combinations: checking all pairs costs $\binom{n}{2} = \frac{n(n - 1)}{2}$ comparisons, which is $O(n^2)$. Computing $\binom{n}{k}$ with Pascal's rule is a classic dynamic-programming example, avoiding the overflow of huge factorials.
:::

:::real
A lottery that asks you to pick 6 numbers from 49 has $\binom{49}{6} = 13983816$ possible tickets, so a single ticket has about a 1 in 14 million chance of winning the jackpot.
:::

:::quiz
? What is $\binom{6}{2}$?
= 15
> $\frac{6 \times 5}{2} = 15$.

? What is the coefficient of $a^2b^3$ in $(a + b)^5$?
= 10
> $\binom53 = 10$.

? What is the sum of the entries in row 7 of Pascal's triangle?
= 128
> $2^7 = 128$.

? Which equals $\binom{10}{7}$?
+ $\binom{10}{3}$
- $\binom{7}{10}$
- $\binom{10}{1}$
- $7!$
> Symmetry: $\binom{n}{k} = \binom{n}{n - k}$.

? What is the coefficient of $x$ in $(x + 3)^4$?
= 108
> $\binom43 x \cdot 3^3 = 4 \times 27 = 108$.

? What is the constant term of $(x - 2)^3$?
= -8
> $(-2)^3 = -8$.
:::
