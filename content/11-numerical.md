---
id: numerical
title: Numerical Methods
tagline: Floating point, error, root finding, interpolation, numerical calculus, linear systems and Monte Carlo: math on real computers.
desc: Computers don't do exact math. You'll learn how floating-point numbers work and fail, the kinds of error and conditioning, root finding, interpolation, numerical differentiation and integration, solving differential equations step by step, solving linear systems stably and iteratively, and Monte Carlo simulation.
color: #64748b
symbol: ≈
area: ML math
paths: ml, cs
order: 11
---

# Unit: Numbers on a computer

## Lesson: Floating-point numbers {#floating-point}
@summary: How computers store real numbers in scientific notation with a fixed number of bits, and the surprises that follow.

### Why a computer can't store every number
Between 0 and 1 there are infinitely many real numbers, but a computer has a finite amount of memory. A 64-bit number can take at most $2^{64}$ different bit patterns, which is a huge number (about $1.8 \times 10^{19}$) but still finite. So the computer must choose a finite set of real numbers it can represent exactly, and round everything else to the nearest one of them. The scheme almost every computer uses is called **floating point**, standardised as IEEE 754. Every neural network, physics simulation and spreadsheet runs on it, and understanding it explains strange results like `0.1 + 0.2 == 0.3` being false.

### An everyday scenario
Imagine a calculator display that shows only four significant digits plus a power of ten, like $1.234 \times 10^{5}$. It can show $123{,}400$ and $0.0001234$ equally well, because the decimal point "floats" to wherever the digits are. But it cannot show $123{,}456$: it must round to $1.235 \times 10^{5}$, an error of $44$. Near $1$, the same display can only step from $1.000$ to $1.001$, a gap of $0.001$. Near $100{,}000$ the gap is $100$. The gaps are large for large numbers and small for small ones, but always about the same *relative* size, roughly one part in a thousand. Floating point works exactly like this display, except in base 2 and with many more digits.

### Scientific notation in binary
A floating-point number is stored as
$$x = (-1)^s \times 1.f \times 2^{e},$$
where $s$ is a **sign bit**, $1.f$ is the **significand** (also called the mantissa), a binary number between 1 and 2, and $e$ is an integer **exponent**. Because every nonzero binary number can be shifted so it starts with "1.", that leading 1 doesn't need to be stored. Only the fraction bits $f$ are kept.

Let's encode $6.5$. In binary, $6 = 110_2$ and $0.5 = 0.1_2$, so $6.5 = 110.1_2$. Shift the point two places left: $110.1_2 = 1.101_2 \times 2^2$. So the sign is 0, the exponent is 2 and the stored fraction bits are $101$ followed by zeros. Check: $1.101_2 = 1 + \frac12 + \frac18 = 1.625$, and $1.625 \times 4 = 6.5$.

@fig float | A toy floating-point system: the tick marks are the only representable numbers, and the gaps double at each power of 2.

### The standard formats
IEEE 754 **double precision** (64 bits, `float64`) uses 1 sign bit, 11 exponent bits and 52 fraction bits. **Single precision** (32 bits, `float32`) uses 1, 8 and 23. The exponent is stored with a **bias** so that it is never negative: 1023 for double and 127 for single. For $6.5$ in single precision the stored exponent is $2 + 127 = 129$.

The number of fraction bits sets the precision. The gap between 1 and the next representable number is called **machine epsilon**: $\varepsilon = 2^{-52} \approx 2.2 \times 10^{-16}$ in double and $2^{-23} \approx 1.2 \times 10^{-7}$ in single. That gives about 16 significant decimal digits in double and about 7 in single. The exponent bits set the range: doubles reach about $1.8 \times 10^{308}$, singles about $3.4 \times 10^{38}$.

:::def Floating-point number
A number stored as sign, significand and exponent, $(-1)^s \times 1.f \times 2^e$, with a fixed number of bits for each. IEEE 754 double precision uses 64 bits; single precision uses 32.
:::

:::def Machine epsilon
The gap between 1 and the next larger floating-point number: $2^{-52}$ in double precision, $2^{-23}$ in single. Rounding to nearest has relative error at most half of this, the unit roundoff.
:::

### Gaps grow with size
Between consecutive powers of two there are always $2^{52}$ evenly spaced doubles. Between 1 and 2 the spacing is $2^{-52}$; between 2 and 4 it is $2^{-51}$; between $2^{53} \approx 9.0 \times 10^{15}$ and $2^{54}$ it is exactly 2. So in double precision $10^{16} + 1$ rounds back to $10^{16}$: the 1 is smaller than half the gap and simply disappears. In general the spacing near $x$ is about $\varepsilon|x|$, and rounding to the nearest float has **relative error** at most $\frac{\varepsilon}{2}$. This is the single most useful fact about floating point: errors are relative, not absolute.

### Why 0.1 + 0.2 is not 0.3
In base 10, $\frac13 = 0.333\ldots$ never ends. In base 2 the same happens to $\frac{1}{10}$: $0.1 = 0.0001100110011\ldots_2$, repeating forever. The computer stores the nearest double, which is slightly more than $0.1$. The same happens to $0.2$ and $0.3$, and the rounding errors don't cancel: in double precision $0.1 + 0.2$ gives $0.30000000000000004$, while the literal $0.3$ is stored as $0.29999999999999998\ldots$. The two differ in the last bit. Fractions whose denominator is a power of two, like $0.5$, $0.25$ and $0.375$, are stored exactly.

### Special values and the edges of the range
The standard reserves bit patterns for special cases. A result too large to represent **overflows** to `inf`; for example $e^{710}$ in double precision is `inf`, because $\ln(1.8 \times 10^{308}) \approx 709.8$. A result too small **underflows** gradually through **subnormal** numbers (tiny values with lost precision, down to about $4.9 \times 10^{-324}$) and then to 0. Undefined operations like $0/0$ or $\infty - \infty$ give `NaN`, "not a number", which spreads through every calculation it touches and is not even equal to itself. There are also two zeros, $+0$ and $-0$, which compare equal.

### Arithmetic is not quite algebra
Each operation is computed exactly and then rounded. That small rule breaks familiar laws. Addition is not associative: $(10^{16} + 1) - 10^{16} = 0$, but $10^{16} - 10^{16} + 1 = 1$. Adding a long list of small numbers to a big running total can lose them all. Order matters, which is why parallel GPU sums can give slightly different answers from run to run.

:::warn Common mistakes
- Testing floats with `==`. Compare with a tolerance instead: $|a - b| \le \text{tol}\cdot\max(|a|, |b|)$.
- Thinking more decimal places printed means more accuracy. A double has about 16 meaningful digits no matter how many you print.
- Forgetting that integers above $2^{53}$ are not all representable as doubles (and above $2^{24}$ as singles).
- Computing $e^{x}$ for large $x$ directly, for example inside softmax. Subtract the maximum first.
:::

### Summary
Floating point stores numbers in binary scientific notation with fixed numbers of sign, exponent and fraction bits. Representable numbers are dense near zero and spread out for large magnitudes, so rounding errors are relative: at most $\varepsilon/2$, about $1.1 \times 10^{-16}$ in double. Most decimals like 0.1 are not exact, arithmetic is rounded at every step, and special values (`inf`, `NaN`, subnormals) handle the edges of the range.

@viz float | A toy float with only a few fraction bits, so you can see every representable value.

:::explore
**What to try**
1. Start at 3 mantissa bits. Count the ticks between 1 and 2: there are $2^3 = 8$ values, spaced $\frac18$ apart.
2. Look between 2 and 4 and between 4 and 8. There are still 8 values in each, but the gaps are $\frac14$ and $\frac12$.
3. Drop to 1 mantissa bit, then raise to 5. Each extra bit doubles the number of values per power of two and halves every gap.
4. Find where $6.5$ would sit with 3 bits ($1.101_2 \times 2^2$). It is exactly on a tick; $6.6$ is not, and would round to $6.5$.

**What to notice:** the gap sizes double every time you cross a power of 2, so the gap divided by the number's size stays roughly constant. That is exactly the "errors are relative" rule from the article, and the extra mantissa bits are what double precision buys over single.
:::

:::formulas
$$x = (-1)^s \times 1.f \times 2^{e}$$
$$\text{stored exponent} = e + \text{bias},\quad \text{bias} = 1023\ (\text{double}),\ 127\ (\text{single})$$
$$\varepsilon_{\text{double}} = 2^{-52} \approx 2.22\times10^{-16},\quad \varepsilon_{\text{single}} = 2^{-23} \approx 1.19\times10^{-7}$$
$$\text{fl}(x) = x(1 + \delta),\quad |\delta| \le u = \tfrac{\varepsilon}{2}$$
$$\text{spacing near } x \approx \varepsilon|x|$$
:::

:::thm Relative rounding error bound
If $x$ lies in the normal range and $\text{fl}(x)$ is $x$ rounded to the nearest floating-point number with $p$ fraction bits, then $\frac{|\text{fl}(x) - x|}{|x|} \le 2^{-p-1} = u$.
:::

:::proof
Suppose $2^e \le |x| < 2^{e+1}$. In that range the floats are evenly spaced with gap $2^{e}\cdot 2^{-p}$. Rounding to nearest moves $x$ by at most half a gap, $2^{e-p-1}$. Dividing by $|x| \ge 2^e$ gives a relative error at most $2^{-p-1}$.
:::

:::steps Encode −6.5 as a 32-bit single
1. Binary: $6.5 = 110.1_2 = 1.101_2 \times 2^2$.
2. Sign bit 1 (negative). Exponent field $2 + 127 = 129 = 10000001_2$.
3. Fraction field: $101$ followed by 20 zeros.
4. Bits: `1 10000001 10100000000000000000000`, which is `0xC0D00000` in hexadecimal.
:::

:::steps Spacing of single-precision floats near 1000
1. $512 = 2^9 \le 1000 < 2^{10}$, so the exponent is 9.
2. Gap $= 2^9 \times 2^{-23} = 2^{-14} \approx 6.1 \times 10^{-5}$.
3. So a `float32` stores 1000 to about 4 decimal places; 1000.00001 rounds to 1000.
:::

:::steps Why (1e16 + 1) − 1e16 is 0 in double precision
1. $2^{53} \approx 9.007 \times 10^{15} \le 10^{16} < 2^{54}$, so the spacing there is $2^{53}\cdot 2^{-52} = 2$.
2. $10^{16} + 1$ is exactly halfway between two neighbours; ties round to the one with an even last bit, which is $10^{16}$ itself.
3. Subtracting $10^{16}$ then gives 0, while $(10^{16} - 10^{16}) + 1 = 1$. Addition is not associative.
:::

:::mock Exam question
Half precision (`float16`) has 10 fraction bits. (a) What is the spacing between consecutive float16 numbers in $[512, 1024)$ and in $[2048, 4096)$? (b) What does $2048 + 1$ evaluate to in float16?
:::solution
(a) The spacing in $[2^e, 2^{e+1})$ is $2^{e-10}$. For $e = 9$ it is $2^{-1} = 0.5$; for $e = 11$ it is $2^{1} = 2$. (b) The neighbours of 2049 are 2048 and 2050, and 2049 is exactly halfway. Round-half-to-even picks the neighbour whose last fraction bit is 0, which is 2048. So $2048 + 1 = 2048$ in float16. This is why integer counters must never be stored in half precision.
:::
:::

:::ml
- **Mixed-precision training** stores weights in float32 but does most arithmetic in float16 or **bfloat16** (1 sign, 8 exponent, 7 fraction bits). bfloat16 keeps float32's range so gradients rarely overflow, at the cost of only about 2 to 3 significant digits.
- float16 tops out at 65504 and loses tiny gradients to underflow, so training with it uses **loss scaling**: multiply the loss by a large constant before backpropagation and divide afterwards.
- **Quantization** goes further, storing weights as 8-bit or 4-bit integers with a scale factor, trading precision for speed and memory.
- Softmax is computed as $e^{z_i - \max z}/\sum_j e^{z_j - \max z}$ so the exponentials never overflow.
:::

:::cs
Money should never be stored as binary floats, since $0.1 + 0.2 \ne 0.3$. Financial systems use integer cents or decimal floating point. Database and JSON systems that pass 64-bit IDs through JavaScript (where every number is a double) silently corrupt IDs above $2^{53}$, which is why some APIs send large IDs as strings.
:::

:::real
In 1991 a Patriot missile battery failed to intercept an incoming missile. Its clock counted time in tenths of a second, and 0.1 was stored in a 24-bit fixed-point register, which cut off the repeating binary expansion with an error of about $9.5 \times 10^{-8}$ seconds per tick. After 100 hours of continuous running the accumulated error was about 0.34 seconds, enough for the target to move over half a kilometre outside the tracking window.
:::

:::quiz
? How many bits does an IEEE 754 double-precision number use?
= 64
> 1 sign bit, 11 exponent bits and 52 fraction bits.

? In double precision, is 0.1 + 0.2 == 0.3 true?
- Yes
+ No
> 0.1, 0.2 and 0.3 are all rounded; $0.1 + 0.2$ gives $0.30000000000000004$.

? In a toy float with 3 fraction bits, what is the gap between consecutive numbers in [1, 2)?
= 1/8|0.125
> There are $2^3 = 8$ evenly spaced values per power of two, so the gap is $\frac18$.

? In single precision, what is the stored (biased) exponent of 6.5 = 1.625 × 2²?
= 129
> Bias 127 plus exponent 2.

? Which decimal number is stored exactly in binary floating point?
- 0.1
- 0.3
+ 0.375
> $0.375 = \frac38 = 0.011_2$ has a power-of-two denominator.

? Roughly how many significant decimal digits does a double carry?
- 7
+ 16
- 32
> $2^{-52} \approx 2.2 \times 10^{-16}$, so about 15 to 16 digits.
:::

## Lesson: Error, cancellation and conditioning {#error}
@summary: Absolute and relative error, how subtraction destroys digits, and the difference between a hard problem and a bad algorithm.

### Every computed answer is approximate
When a computer gives you a number, it is almost never exactly right. The input data may be measured with limited accuracy, the method may be an approximation like a truncated series, and every arithmetic step adds a tiny rounding error. Usually these errors are harmless. Sometimes they grow until the answer is meaningless. The skill this lesson teaches is to tell the two apart: to measure error properly, to recognise the operations that magnify it, and to separate problems that are inherently sensitive from algorithms that are just badly designed.

### An everyday scenario
Imagine measuring two planks with a tape measure that is accurate to the nearest millimetre. Plank A is $2.000$ m and plank B is $1.998$ m, each uncertain by about $0.5$ mm. The relative uncertainty of each measurement is tiny: $0.5$ mm out of 2 m is $0.025\%$. Now you need the **difference** in length: $2$ mm. But each measurement could be off by $0.5$ mm, so the difference could be anything from 1 mm to 3 mm, an uncertainty of $50\%$. Nothing went wrong with the tape measure. Subtracting two nearly equal quantities simply cancels the digits you knew well and leaves the digits you didn't. This effect, **catastrophic cancellation**, is the most common cause of numerical disasters.

### Measuring error
If the true value is $x$ and the computed approximation is $\hat x$, the **absolute error** is $|\hat x - x|$ and the **relative error** is $\frac{|\hat x - x|}{|x|}$. Approximating $\pi$ by $3.14$ gives an absolute error of about $0.0016$ and a relative error of about $0.0005$, or $0.05\%$. An absolute error of 1 is tiny when measuring the distance to the Moon but huge when measuring a dose of medicine; relative error is usually the meaningful one. A relative error of about $10^{-k}$ means the answer has about $k$ correct significant digits.

:::def Absolute and relative error
For a true value $x$ and approximation $\hat x$: absolute error $|\hat x - x|$, relative error $|\hat x - x|/|x|$. A relative error near $10^{-k}$ means about $k$ correct significant digits.
:::

### Where error comes from
There are four main sources. **Modelling error** comes from simplifying the real world, such as ignoring air resistance. **Data error** comes from measurements and earlier computations. **Truncation error** comes from replacing an infinite process with a finite one: approximating $e = 1 + 1 + \frac12 + \frac16 + \frac1{24} + \cdots$ by its first four terms gives $2.6667$, a truncation error of about $0.0516$. **Rounding error** comes from storing every intermediate result in floating point. Truncation error shrinks as you do more work (more terms, smaller steps); rounding error usually grows with more work. Many numerical methods are a tug of war between the two.

### Catastrophic cancellation
Let's see cancellation with five-digit decimal arithmetic. Suppose the true values are $a = 1.23456$ and $b = 1.23454$, so $a - b = 0.00002$. Rounded to five significant digits they become $1.2346$ and $1.2345$, each with a relative error under $0.004\%$. Their computed difference is $0.0001$, five times the truth: a relative error of $400\%$. The subtraction itself was exact. It just exposed the earlier rounding, because the leading digits that agreed cancelled away and only the uncertain last digit remained.

The cure is almost always algebra: rewrite the formula so the subtraction disappears. For large $x$, $\sqrt{x + 1} - \sqrt{x}$ subtracts two nearly equal numbers, but multiplying top and bottom by $\sqrt{x+1} + \sqrt{x}$ gives the equivalent $\frac{1}{\sqrt{x + 1} + \sqrt{x}}$, which only adds. At $x = 10^8$ the first form loses about half of the 16 digits of a double; the second keeps them all. Similarly $1 - \cos x$ for small $x$ should be computed as $2\sin^2(x/2)$, and libraries provide `log1p(x)` $= \ln(1 + x)$ and `expm1(x)` $= e^x - 1$ for small $x$.

### Conditioning: is the problem itself sensitive?
Some problems amplify input errors no matter how you solve them. The **condition number** measures how much: it is the ratio of the relative change in output to the relative change in input. For a function of one variable,
$$\kappa(x) = \left|\frac{x f'(x)}{f(x)}\right|.$$
For $f(x) = \sqrt x$, $\kappa = \left|\frac{x\cdot\frac{1}{2\sqrt x}}{\sqrt x}\right| = \frac12$: square roots actually halve relative errors. For $f(x) = x - 1$ near $x = 1.001$, $\kappa = \frac{1.001}{0.001} = 1001$: a $0.01\%$ error in $x$ becomes about a $10\%$ error in the answer. That is the cancellation from the planks, measured. A rule of thumb: **you can lose about $\log_{10}\kappa$ significant digits**. With $\kappa = 10^6$ and 16-digit doubles, expect about 10 correct digits.

:::def Condition number
How strongly a problem amplifies relative input errors: $\kappa = \frac{\text{relative change in output}}{\text{relative change in input}}$, equal to $|x f'(x)/f(x)|$ for a smooth function. Large $\kappa$ means ill-conditioned.
:::

### Stability: is the algorithm sensible?
Conditioning belongs to the problem; **stability** belongs to the algorithm. An algorithm is **backward stable** if its computed answer is the exact answer for a slightly perturbed input, perturbed by about machine epsilon. A backward stable algorithm on a well-conditioned problem gives an accurate answer. A backward stable algorithm on an ill-conditioned problem gives an answer with error about $\kappa\cdot u$, which is the best anyone can do. An unstable algorithm, like the naive quadratic formula for a tiny root, can ruin even a well-conditioned problem.

:::def Stable algorithm
An algorithm whose computed result is the exact result for input data perturbed by only a few units of roundoff (backward stability). Its error is then at most about the condition number times machine epsilon.
:::

:::warn Common mistakes
- Blaming floating point for an ill-conditioned problem. If $\kappa$ is $10^{12}$, no algorithm can give 16 digits.
- Blaming the problem for an unstable algorithm. The quadratic formula can be fixed by rearranging.
- Using absolute error to compare numbers of very different sizes.
- Computing a variance as $E[x^2] - (E[x])^2$ with large means: two big nearly equal numbers cancel. Subtract the mean first.
:::

### Summary
Measure accuracy by relative error, which counts correct digits. Error comes from modelling, data, truncation and rounding. Subtracting nearly equal numbers cancels good digits and exposes bad ones, and is usually cured by rewriting the formula. The condition number $\kappa = |xf'/f|$ says how sensitive the problem is (lose about $\log_{10}\kappa$ digits); stability says whether the algorithm adds damage of its own.

@viz g07-approx mode=diff | The error of a finite-difference derivative as the step h shrinks: truncation error falls, rounding error rises.

:::explore
**What to try**
1. Start at $h = 10^{-1}$ and move left toward $10^{-5}$. The error falls steadily: this is truncation error shrinking.
2. Keep going to $h = 10^{-12}$ and beyond. The error starts rising again and becomes jagged: this is rounding error and cancellation in $f(x + h) - f(x)$.
3. Find the lowest point of the orange (forward) curve, near $h \approx 10^{-8}$, and of the purple (central) curve, near $h \approx 10^{-5}$.
4. At $h = 10^{-16}$ the step is below machine epsilon relative to $x = 1$, so $f(x + h) = f(x)$ and the estimate collapses.

**What to notice:** this is the tug of war from the article in one picture. More work (smaller $h$) cuts truncation error but magnifies cancellation, so the best accuracy lies in the middle. The best forward error is only about $10^{-8}$, half the digits of a double, exactly as cancellation predicts.
:::

:::formulas
$$\text{absolute error} = |\hat x - x|,\qquad \text{relative error} = \frac{|\hat x - x|}{|x|}$$
$$\kappa(x) = \left|\frac{x f'(x)}{f(x)}\right|$$
$$\text{relative output error} \approx \kappa \times \text{relative input error}$$
$$\sqrt{x + 1} - \sqrt{x} = \frac{1}{\sqrt{x + 1} + \sqrt{x}},\qquad 1 - \cos x = 2\sin^2\tfrac{x}{2}$$
$$x_{1} = \frac{-b - \text{sign}(b)\sqrt{b^2 - 4ac}}{2a},\quad x_2 = \frac{c}{a x_1}$$
:::

:::thm Error amplification by the condition number
For a differentiable $f$ and a small relative input error $\delta$ (so the input is $x(1 + \delta)$), the relative output error is approximately $\kappa(x)\,|\delta|$.
:::

:::proof
By Taylor's theorem, $f(x + x\delta) \approx f(x) + f'(x)x\delta$. So
$$\frac{f(x + x\delta) - f(x)}{f(x)} \approx \frac{x f'(x)}{f(x)}\delta,$$
whose absolute value is $\kappa(x)|\delta|$. The approximation ignores terms of order $\delta^2$.
:::

:::steps Condition number of f(x) = x³ and of f(x) = ln x at x = 1.01
1. $f(x) = x^3$: $\kappa = \left|\frac{x\cdot3x^2}{x^3}\right| = 3$ everywhere. A 1% input error gives about 3% output error.
2. $f(x) = \ln x$: $\kappa = \left|\frac{x\cdot\frac1x}{\ln x}\right| = \frac{1}{|\ln x|}$.
3. At $x = 1.01$: $\ln 1.01 \approx 0.00995$, so $\kappa \approx 100.5$. Logs near 1 are ill-conditioned; expect to lose about 2 digits.
:::

:::steps The small root of x² − 10⁸x + 1 = 0
1. Roots: $\frac{10^8 \pm \sqrt{10^{16} - 4}}{2}$. The large root is about $10^8$; the small one is about $10^{-8}$.
2. Naive small root: $\frac{10^8 - \sqrt{10^{16} - 4}}{2}$ subtracts two numbers that agree in about 16 digits. In double precision it returns about $7.45 \times 10^{-9}$, a 25% error.
3. Stable route: compute the large root $x_1 \approx 10^8$ without cancellation, then use the product of the roots $x_1 x_2 = c/a = 1$, giving $x_2 = 1/x_1 \approx 1.0 \times 10^{-8}$, correct to full precision.
:::

:::steps Relative error of an approximation
1. True value 50, computed value 49.
2. Absolute error $= 1$.
3. Relative error $= 1/50 = 0.02 = 2\%$, so about 2 significant digits are right.
:::

:::mock Exam question
(a) Compute the condition number of $f(x) = x - 1$ at $x = 1.0001$. (b) If $x$ carries a relative error of $10^{-8}$, roughly how large is the relative error of $f(x)$? (c) Is this caused by the algorithm or by the problem?
:::solution
(a) $\kappa = \left|\frac{x\cdot1}{x - 1}\right| = \frac{1.0001}{0.0001} = 10001$. (b) About $10001 \times 10^{-8} \approx 10^{-4}$, so roughly 4 of the original 8 correct digits survive. (c) The problem: subtracting 1 from a number very close to 1 is ill-conditioned. The subtraction itself is computed exactly; it is the input's error that gets magnified.
:::
:::

:::ml
- **Gradient checking** compares backpropagated gradients with finite differences; the step must balance truncation and rounding, as in the widget.
- **Log-domain arithmetic:** multiplying thousands of probabilities underflows to 0, so models add log-probabilities instead and use the log-sum-exp trick.
- **Variance and batch normalization:** frameworks compute variance with the mean subtracted (or with Welford's algorithm) to avoid cancellation, and add a small $\epsilon$ before dividing by a standard deviation.
- **Ill-conditioned optimization:** a loss surface whose curvature differs hugely between directions has a large condition number, which slows gradient descent.
:::

:::cs
Summing many numbers accumulates rounding error proportional to the count. **Kahan summation** keeps a running compensation term that captures the low-order bits lost at each step, making the error essentially independent of the number of terms. Python's `math.fsum` goes further and returns the correctly rounded sum.
:::

:::real
In 1982 the Vancouver Stock Exchange started a new index at 1000. After each of thousands of daily trades it was recomputed and **truncated** (not rounded) to three decimal places. The tiny downward bias of each truncation accumulated, and 22 months later the index read about 524.8. Recomputed correctly, the value was about 1098.9.
:::

:::quiz
? True value 200, computed value 202. What is the relative error?
= 0.01|1/100
> $|202 - 200|/200 = 0.01$, or 1%.

? Condition number of f(x) = √x?
= 1/2|0.5
> $|x\cdot\frac{1}{2\sqrt x}/\sqrt x| = \frac12$.

? Condition number of f(x) = x³?
= 3
> $|x\cdot3x^2/x^3| = 3$.

? With κ = 10⁶ and double precision (about 16 digits), roughly how many correct digits should you expect?
= 10
> You lose about $\log_{10}\kappa = 6$ digits.

? Which operation causes catastrophic cancellation?
- Multiplying two large numbers
+ Subtracting two nearly equal numbers
- Adding two positive numbers
> Leading digits cancel and only the uncertain trailing digits remain.

? A backward stable algorithm applied to an ill-conditioned problem gives:
- A fully accurate answer
+ An answer with error about κ times machine epsilon
- Always NaN
> Stability limits the algorithm's damage, but the problem's sensitivity remains.
:::

# Unit: Equations and approximation

## Lesson: Root finding: bisection, Newton and secant {#root-finding}
@summary: Solving f(x) = 0 by repeatedly shrinking a bracket or following tangent lines, and how fast each method converges.

### Why we need numerical root finding
Many questions in science and engineering boil down to "for which $x$ is $f(x) = 0$?". At what interest rate does an investment break even? At what angle does a projectile hit the target? Where is the gradient of a loss zero? For a quadratic there is a formula, but for something as simple as $\cos x = x$ or $x^5 - x - 1 = 0$ there is none (and the Abel–Ruffini theorem proves no general formula exists for degree five and above). Instead we use **iterative methods**: start with a guess and improve it step by step until it is good enough. This lesson covers the three classic methods and, just as important, how quickly each one homes in on the answer.

### An everyday scenario
Imagine guessing a number between 1 and 100 where the only feedback is "too high" or "too low". The smart strategy is to guess the middle, 50, and throw away the half that can't contain the answer. After 7 guesses you are certain, since $2^7 = 128 > 100$. That is the **bisection method**. Now imagine that instead of "too high" you are told *how far* off you are and in which direction the error is changing. You could jump straight toward the answer instead of halving. That is the idea behind **Newton's method**, and it is spectacularly faster when it works.

### The bisection method
Bisection relies on the **intermediate value theorem**: if $f$ is continuous and $f(a)$ and $f(b)$ have opposite signs, there is a root between $a$ and $b$. So pick such a bracket, evaluate $f$ at the midpoint $m = \frac{a + b}{2}$, and keep whichever half still has a sign change. Let's find $\sqrt2$ as the root of $f(x) = x^2 - 2$ on $[1, 2]$, where $f(1) = -1 < 0$ and $f(2) = 2 > 0$:

At $m = 1.5$, $f = 0.25 > 0$, so the root is in $[1, 1.5]$. At $m = 1.25$, $f = -0.4375 < 0$, so $[1.25, 1.5]$. At $m = 1.375$, $f \approx -0.109$, so $[1.375, 1.5]$. At $m = 1.4375$, $f \approx 0.066$, so $[1.375, 1.4375]$. The true root $1.41421\ldots$ is trapped in an interval of width $\frac1{16}$.

Each step halves the bracket, so after $n$ steps the error is at most $\frac{b - a}{2^{n}}$ (or half that if you report the midpoint). To get from width 1 to $10^{-6}$ takes 20 steps, since $2^{20} \approx 10^6$. Bisection is slow but **guaranteed**: it can't diverge, and it needs only the sign of $f$.

:::def Bisection method
Repeatedly halve an interval $[a, b]$ on which $f$ changes sign, keeping the half where the sign change remains. After $n$ steps the root is located within $(b - a)/2^n$.
:::

### Newton's method
Newton's method uses the derivative. Near the current guess $x_n$, the curve looks like its tangent line $y = f(x_n) + f'(x_n)(x - x_n)$. Instead of solving the hard equation $f(x) = 0$, solve the easy linear one: set the tangent to zero and get
$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}.$$
For $f(x) = x^2 - 2$, $f'(x) = 2x$, and the update simplifies to $x_{n+1} = \frac12\left(x_n + \frac{2}{x_n}\right)$, the ancient Babylonian square-root method. Starting from $x_0 = 1$: $x_1 = 1.5$, $x_2 \approx 1.416667$, $x_3 \approx 1.414215686$, $x_4 \approx 1.41421356237469$. The number of correct digits goes 1, 3, 6, 12: it roughly **doubles** every step. That is **quadratic convergence**: the new error is about a constant times the square of the old error, $e_{n+1} \approx C e_n^2$. An error of $10^{-3}$ becomes about $10^{-6}$, then $10^{-12}$.

:::def Newton's method
The iteration $x_{n+1} = x_n - f(x_n)/f'(x_n)$, which jumps to the root of the tangent line at the current guess. Near a simple root it converges quadratically.
:::

### When Newton goes wrong
Newton's speed comes with no guarantee. If $f'(x_n)$ is zero or tiny, the tangent is flat and the next guess flies off to infinity. If the starting point is far from the root, the iteration can wander or even cycle: for $f(x) = x^3 - 2x + 2$ starting at $x_0 = 0$, we get $x_1 = 0 - \frac{2}{-2} = 1$ and then $x_2 = 1 - \frac{1}{1} = 0$, bouncing between 0 and 1 forever. At a **double root**, where $f'(r) = 0$ too, convergence drops to linear. Robust software therefore combines methods: it keeps a bisection bracket as a safety net and takes Newton or secant steps when they stay inside it, as in Brent's method.

### The secant method
Often the derivative is unavailable or expensive. The **secant method** replaces the tangent with the line through the last two points:
$$x_{n+1} = x_n - f(x_n)\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}.$$
For $x^2 - 2$ with $x_0 = 1$, $x_1 = 2$: $x_2 = 2 - 2\cdot\frac{1}{2 - (-1)} = \frac43 \approx 1.333$, then $x_3 = 1.4$. Its convergence order is the golden ratio, $\frac{1 + \sqrt5}{2} \approx 1.618$: slower than Newton per step, but each step needs only one new function value, so it is often faster in total time.

### Stopping and measuring convergence
In practice we stop when the step $|x_{n+1} - x_n|$ or the residual $|f(x_n)|$ falls below a tolerance, and also cap the number of iterations. A method has **order** $p$ if $|e_{n+1}| \approx C|e_n|^p$: $p = 1$ is linear (bisection, with $C = \frac12$), $p \approx 1.618$ is the secant method, and $p = 2$ is Newton.

:::warn Common mistakes
- Using bisection without first checking that $f(a)$ and $f(b)$ have opposite signs.
- Trusting Newton from any starting point. Check the derivative isn't near zero and that the residual is actually shrinking.
- Stopping only when $|f(x)|$ is small: for a very flat function $|f|$ can be tiny far from the root.
- Expecting bisection to find roots where $f$ touches zero without crossing, like $x^2 = 0$.
:::

### Summary
Bisection halves a sign-change bracket each step: slow (linear, one bit per step) but guaranteed. Newton's method follows tangent lines, $x_{n+1} = x_n - f/f'$, doubling the correct digits each step near a simple root but able to fail far from it. The secant method replaces the derivative with a difference quotient and converges with order about 1.618. Practical solvers combine a safe bracket with fast steps.

@viz newton x0=1 | Each Step jumps to where the tangent line crosses zero.

:::explore
**What to try**
1. With $f(x) = x^2 - 2$ and $x_0 = 1$, press Step four times and compare the iterates with the article: 1.5, 1.41667, 1.414216, 1.41421356.
2. Switch to $x^3 - 2x - 5$ (Newton's own 1669 example) and step from the default start. The root is about 2.0946.
3. Switch to $x^3 - 2x + 2$ and start at $x_0 = 0$. Watch the iterates bounce between 0 and 1: the cycle from the article.
4. Try $\cos x - x$ and count how many steps it takes to settle near 0.7391.

**What to notice:** when Newton works, the error column drops like $10^{-1}, 10^{-3}, 10^{-6}, 10^{-12}$, doubling the digits. When it fails, the tangent line points somewhere unhelpful. Speed and safety are the trade-off every root finder balances.
:::

:::formulas
$$\text{Bisection: } |x_n - r| \le \frac{b - a}{2^{n+1}}\ \text{(midpoint after } n \text{ halvings)}$$
$$\text{Newton: } x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$
$$\text{Secant: } x_{n+1} = x_n - f(x_n)\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$$
$$\text{Order } p:\ |e_{n+1}| \approx C|e_n|^p;\quad p = 1,\ 1.618,\ 2$$
$$\text{Newton error: } e_{n+1} \approx \frac{f''(r)}{2f'(r)}e_n^2$$
:::

:::thm Convergence of bisection
If $f$ is continuous on $[a, b]$ and $f(a)f(b) < 0$, bisection's midpoints converge to a root $r$, with $|m_n - r| \le (b - a)/2^{n+1}$ after $n$ halvings.
:::

:::proof
By the intermediate value theorem each bracket contains a root. Each step keeps a half with a sign change, so after $n$ steps the bracket has width $(b - a)/2^n$ and contains a root; its midpoint is within half the width, $(b - a)/2^{n+1}$, of that root. The width tends to 0, so the midpoints converge.
:::

:::thm Quadratic convergence of Newton's method
If $f$ is twice continuously differentiable, $f(r) = 0$ and $f'(r) \ne 0$, then for $x_0$ close enough to $r$ the Newton errors satisfy $e_{n+1} \approx \frac{f''(r)}{2f'(r)}e_n^2$.
:::

:::proof
Let $e_n = x_n - r$. Taylor expand about $x_n$: $0 = f(r) = f(x_n) - f'(x_n)e_n + \frac12 f''(\xi)e_n^2$ for some $\xi$ between $r$ and $x_n$. Divide by $f'(x_n)$ and rearrange: $x_n - \frac{f(x_n)}{f'(x_n)} - r = \frac{f''(\xi)}{2f'(x_n)}e_n^2$. The left side is $x_{n+1} - r = e_{n+1}$, and as $x_n \to r$ the factor tends to $\frac{f''(r)}{2f'(r)}$.
:::

:::steps One Newton step for x³ − 2x − 5 = 0 from x₀ = 2
1. $f(2) = 8 - 4 - 5 = -1$ and $f'(x) = 3x^2 - 2$, so $f'(2) = 10$.
2. $x_1 = 2 - \frac{-1}{10} = 2.1$.
3. $f(2.1) = 9.261 - 4.2 - 5 = 0.061$, $f'(2.1) = 11.23$, so $x_2 = 2.1 - 0.00543 \approx 2.09457$. The true root is $2.094551\ldots$.
:::

:::steps How many bisection steps for 10⁻⁶ accuracy on [0, 1]?
1. After $n$ halvings the midpoint error is at most $\frac{1}{2^{n+1}}$.
2. Need $2^{n+1} \ge 10^6$; since $2^{20} = 1{,}048{,}576$, $n + 1 = 20$ works.
3. So 19 halvings suffice for the midpoint (20 if you require the whole bracket to be that narrow). Newton from a good start would need about 4 or 5 steps.
:::

:::steps Two secant steps for x² − 2 from x₀ = 1, x₁ = 2
1. $f(1) = -1$, $f(2) = 2$: $x_2 = 2 - 2\cdot\frac{2 - 1}{2 - (-1)} = \frac43$.
2. $f(\frac43) = \frac{16}{9} - 2 = -\frac29$: $x_3 = \frac43 - \left(-\frac29\right)\frac{\frac43 - 2}{-\frac29 - 2} = \frac43 + \frac{1}{15} = 1.4$.
:::

:::mock Exam question
Computers can find $1/a$ without division by applying Newton's method to $f(x) = \frac1x - a$. (a) Show that the update is $x_{n+1} = x_n(2 - a x_n)$. (b) With $a = 3$ and $x_0 = 0.3$, compute $x_1$ and $x_2$. (c) Show that $1 - a x_{n+1} = (1 - a x_n)^2$ and explain what this says about convergence.
:::solution
(a) $f'(x) = -\frac1{x^2}$, so $x_{n+1} = x_n - \frac{1/x_n - a}{-1/x_n^2} = x_n + x_n - a x_n^2 = x_n(2 - a x_n)$. (b) $x_1 = 0.3(2 - 0.9) = 0.33$; $x_2 = 0.33(2 - 0.99) = 0.3333$. (c) $1 - a x_n(2 - a x_n) = 1 - 2ax_n + a^2x_n^2 = (1 - ax_n)^2$. The relative error is squared each step: $0.1, 0.01, 0.0001, 10^{-8}$. That is quadratic convergence, and it works whenever $0 < x_0 < 2/a$.
:::
:::

:::ml
- **Second-order optimization:** a minimum of a loss $L$ is a root of $\nabla L$, and Newton's method for it is $\theta \leftarrow \theta - H^{-1}\nabla L$, with $H$ the Hessian. Logistic regression is classically fitted this way (iteratively reweighted least squares).
- **Line search** in optimizers like L-BFGS solves a one-dimensional root or minimum problem at every step.
- **Implicit layers and equilibrium models** find the output by solving $z = g(z, x)$ with Newton-type or fixed-point solvers.
- **Inverse CDFs** for sampling and quantiles are often computed by Newton's method on $F(x) - u = 0$.
:::

:::cs
Hardware and math libraries compute square roots and reciprocals with a cheap initial estimate followed by one or two Newton steps. The famous "fast inverse square root" in the game Quake III used a bit-level trick for the first guess and then one Newton step for $1/\sqrt{x}$.
:::

:::real
The **internal rate of return** of an investment is the interest rate $r$ that makes the net present value zero: $\sum_t \frac{C_t}{(1 + r)^t} = 0$. There is no formula for it; spreadsheet functions like `IRR` find it with Newton or secant iterations from a starting guess, and occasionally fail to converge for exactly the reasons in this lesson.
:::

:::quiz
? One Newton step for f(x) = x² − 9 from x₀ = 5?
= 3.4|17/5
> $5 - \frac{25 - 9}{10} = 5 - 1.6 = 3.4$.

? One Newton step for x² − 2 from x₀ = 1?
= 1.5|3/2
> $1 - \frac{-1}{2} = 1.5$.

? Bisection starts with an interval of width 1. What is the bracket width after 10 steps?
= 1/1024|0.0009765625
> Each step halves it: $2^{-10} = \frac{1}{1024}$.

? What does bisection require to start?
+ A continuous function with f(a) and f(b) of opposite signs
- The derivative of f
- A starting point near the root
> The intermediate value theorem then guarantees a root in the bracket.

? Near a simple root, Newton's method roughly:
- Adds one correct digit per step
+ Doubles the number of correct digits per step
- Halves the error per step
> Quadratic convergence: $e_{n+1} \approx Ce_n^2$.

? The convergence order of the secant method is about:
- 1
+ 1.618
- 3
> The golden ratio $\frac{1 + \sqrt5}{2}$.
:::

## Lesson: Interpolation and the Runge phenomenon {#interpolation}
@summary: Drawing a curve exactly through data points with polynomials and splines, and why more points can make things worse.

### Filling in between the data
Data usually arrives as points: a temperature reading every hour, a value of $\sin x$ from a printed table, a few frames of an animation, a handful of expensive simulation results. Often we need values **between** the points. **Interpolation** builds a function that passes exactly through every given point and uses it to estimate the values in between. It is the foundation of numerical integration and differentiation, of the curves in fonts and graphics, of image resizing and of audio resampling. It also hides a famous trap: adding more points to a polynomial can make it *worse*.

### An everyday scenario
Imagine a printed table that gives $\sin 0.5 = 0.4794$ and $\sin 0.6 = 0.5646$, and you need $\sin 0.55$. The simplest idea is to draw a straight line between the two points and read off the middle: $\frac{0.4794 + 0.5646}{2} = 0.5220$. The true value is $0.52269$, so the straight line is off by about $0.0007$. Before calculators, people did exactly this with books of tables. Can we do better? With three points we can fit a parabola, which bends like the real curve; with more points, a higher-degree polynomial.

### Linear interpolation
Through two points $(x_0, y_0)$ and $(x_1, y_1)$ there is exactly one line:
$$p(x) = y_0 + \frac{y_1 - y_0}{x_1 - x_0}(x - x_0).$$
For points $(2, 10)$ and $(4, 20)$, $p(3) = 10 + 5\cdot1 = 15$. Linear interpolation is exact for straight lines and has error at most $\frac{h^2}{8}\max|f''|$ for a smooth function with spacing $h$. For the sine table, $h = 0.1$ and $|f''| = |\sin x| \le 0.565$ on that interval, so the error is at most $\frac{0.01}{8}(0.565) \approx 0.0007$, exactly what we saw.

### Polynomial interpolation
Given $n + 1$ points with distinct $x$-values, there is **exactly one** polynomial of degree at most $n$ through all of them. For the points $(0, 1)$, $(1, 3)$ and $(2, 7)$ it is $p(x) = x^2 + x + 1$: check $p(0) = 1$, $p(1) = 3$, $p(2) = 7$. There are several ways to write the same polynomial.

The **Lagrange form** builds it from basis polynomials $L_i(x) = \prod_{j \ne i}\frac{x - x_j}{x_i - x_j}$, each equal to 1 at its own node $x_i$ and 0 at every other node. Then $p(x) = \sum_i y_i L_i(x)$ obviously passes through every point.

The **Newton form** builds it one point at a time with **divided differences**. For our three points: $f[x_0] = 1$; $f[x_0, x_1] = \frac{3 - 1}{1 - 0} = 2$; $f[x_1, x_2] = \frac{7 - 3}{2 - 1} = 4$; and $f[x_0, x_1, x_2] = \frac{4 - 2}{2 - 0} = 1$. Then $p(x) = 1 + 2(x - 0) + 1(x - 0)(x - 1) = x^2 + x + 1$, the same polynomial. Adding a fourth point just adds one more term, which is why the Newton form is convenient in practice.

:::def Interpolating polynomial
For $n + 1$ points $(x_i, y_i)$ with distinct $x_i$, the unique polynomial $p$ of degree at most $n$ with $p(x_i) = y_i$ for every $i$.
:::

:::def Divided differences
$f[x_i] = y_i$ and $f[x_i, \ldots, x_{i+k}] = \frac{f[x_{i+1}, \ldots, x_{i+k}] - f[x_i, \ldots, x_{i+k-1}]}{x_{i+k} - x_i}$; they are the coefficients of the Newton form of the interpolating polynomial.
:::

### How big is the error?
If the data come from a smooth function $f$, the error of the interpolating polynomial is
$$f(x) - p(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}\prod_{i=0}^{n}(x - x_i)$$
for some $\xi$ in the range of the points. Two things control it: how wild the $(n+1)$st derivative of $f$ is, and the size of the **node polynomial** $\prod(x - x_i)$, which depends only on where you put the points. Between closely packed nodes the product is small; near the ends of an evenly spaced grid it becomes large.

### The Runge phenomenon
In 1901 Carl Runge tried interpolating the innocent-looking bell $f(x) = \frac{1}{1 + 25x^2}$ on $[-1, 1]$ with evenly spaced points. With 5 points the fit is rough. With 11 points it fits the middle beautifully but swings wildly near the ends, overshooting to almost 2. With 21 points the swings are in the dozens. **More data made the fit worse**, because the derivatives of this $f$ grow very fast and the node polynomial is huge near the ends.

There are two cures. First, move the points: **Chebyshev nodes**, $x_i = \cos\frac{(2i + 1)\pi}{2(n + 1)}$, cluster toward the ends of the interval, which keeps the node polynomial as small as possible everywhere. With them, the error for this function shrinks steadily as $n$ grows. Second, stop using one high-degree polynomial: a **spline** joins low-degree pieces.

### Splines
A **cubic spline** uses a separate cubic polynomial on each interval between neighbouring points, chosen so that the whole curve passes through all the points and has continuous first and second derivatives at the joins. The result looks smooth to the eye and doesn't oscillate, because each piece only has to bend a little. Adding points makes a spline better, not worse. Splines draw the letters on your screen, the curves in vector graphics tools and the paths of animated objects.

:::def Cubic spline
A piecewise cubic function through the data points whose value, first derivative and second derivative are continuous at every interior point.
:::

:::warn Common mistakes
- Assuming a higher-degree polynomial is always more accurate. With evenly spaced points it can diverge (Runge).
- **Extrapolating** far outside the data. Polynomials grow rapidly outside the range of the nodes.
- Solving for polynomial coefficients through the Vandermonde matrix with many points: that system is badly ill-conditioned. Use Newton, barycentric Lagrange or Chebyshev forms.
- Confusing interpolation (pass through every point) with regression (fit a trend through noisy points).
:::

### Summary
Interpolation builds a function through given points to estimate values between them. Through $n + 1$ points there is exactly one polynomial of degree at most $n$, written in Lagrange or Newton form. Its error depends on the function's derivatives and on the node placement; evenly spaced high-degree interpolation can oscillate wildly (Runge's phenomenon), while Chebyshev nodes or piecewise cubic splines stay accurate.

@viz g07-approx mode=interp | Interpolate Runge's function with evenly spaced points, Chebyshev points or a cubic spline.

:::explore
**What to try**
1. With **Evenly spaced polynomial**, set the degree to 4, then 10, then 20. Watch the max error grow and the ends swing wildly: the Runge phenomenon.
2. Switch to **Chebyshev nodes polynomial** at degree 20. The pink points crowd toward the ends and the max error is now small.
3. Switch to **Cubic spline (even)** with the same evenly spaced points. The curve hugs the bell with no wild swings.
4. Compare the max error readouts of all three at degree 10.

**What to notice:** the function and the number of points never changed, only where the points sit or what kind of curve joins them. That is the error formula at work: node placement controls $\prod(x - x_i)$, and splines avoid high degrees altogether.
:::

@viz bias-variance | The statistical cousin: a high-degree polynomial fitted to noisy points.

:::explore
**What to try**
1. Raise the degree from 3 to 15 and watch the curve chase the noisy points.
2. Compare the training and test errors at high degree.

**What to notice:** high-degree polynomials wiggle both in interpolation (Runge) and in regression (overfitting). In both cases flexibility without control hurts accuracy away from the data points.
:::

:::formulas
$$p(x) = y_0 + \frac{y_1 - y_0}{x_1 - x_0}(x - x_0)$$
$$p(x) = \sum_{i=0}^n y_i L_i(x),\quad L_i(x) = \prod_{j \ne i}\frac{x - x_j}{x_i - x_j}$$
$$p(x) = f[x_0] + f[x_0, x_1](x - x_0) + f[x_0, x_1, x_2](x - x_0)(x - x_1) + \cdots$$
$$f(x) - p(x) = \frac{f^{(n+1)}(\xi)}{(n + 1)!}\prod_{i=0}^n(x - x_i)$$
$$\text{Chebyshev nodes: } x_i = \cos\frac{(2i + 1)\pi}{2(n + 1)}$$
:::

:::thm Existence and uniqueness of the interpolating polynomial
For any $n + 1$ points with distinct $x_0, \ldots, x_n$ there is exactly one polynomial of degree at most $n$ through all of them.
:::

:::proof
Existence: the Lagrange form $\sum y_i L_i(x)$ has degree at most $n$ and satisfies $p(x_k) = y_k$ because $L_i(x_k)$ is 1 if $i = k$ and 0 otherwise. Uniqueness: if $p$ and $q$ both interpolate, then $p - q$ has degree at most $n$ and vanishes at $n + 1$ distinct points. A nonzero polynomial of degree at most $n$ has at most $n$ roots, so $p - q = 0$.
:::

:::steps Interpolate (0, 1), (1, 3), (2, 7) with divided differences and evaluate at x = 3
1. First differences: $f[0, 1] = 2$, $f[1, 2] = 4$.
2. Second difference: $f[0, 1, 2] = \frac{4 - 2}{2 - 0} = 1$.
3. $p(x) = 1 + 2x + x(x - 1) = x^2 + x + 1$.
4. $p(3) = 9 + 3 + 1 = 13$.
:::

:::steps Linear interpolation for sin 0.55
1. Points $(0.5, 0.4794)$ and $(0.6, 0.5646)$; $x = 0.55$ is the midpoint.
2. $p(0.55) = 0.4794 + \frac{0.0852}{0.1}(0.05) = 0.5220$.
3. True value $0.52269$; error $\approx 0.0007$, matching the bound $\frac{h^2}{8}\max|f''|$.
:::

:::mock Exam question
Interpolate $f(x) = \frac1x$ at $x = 1, 2, 4$ with a quadratic. (a) Find the Newton form. (b) Estimate $f(3)$ and compare with the true value. (c) Use the error formula to explain the sign of the error.
:::solution
(a) Values $1, \frac12, \frac14$. $f[1, 2] = \frac{0.5 - 1}{1} = -0.5$, $f[2, 4] = \frac{0.25 - 0.5}{2} = -0.125$, $f[1, 2, 4] = \frac{-0.125 + 0.5}{3} = 0.125$. So $p(x) = 1 - 0.5(x - 1) + 0.125(x - 1)(x - 2)$.
(b) $p(3) = 1 - 1 + 0.125(2)(1) = 0.25$, while $f(3) = \frac13 \approx 0.333$, an error of about $0.083$.
(c) $f'''(x) = -\frac{6}{x^4}$, so $f(3) - p(3) = \frac{-6/\xi^4}{6}(3 - 1)(3 - 2)(3 - 4) = \frac{2}{\xi^4} > 0$. The interpolant underestimates, as observed (the value $\xi \approx 2.21$ makes it exact).
:::
:::

:::ml
- **Learning-rate schedules and lookup tables** are often piecewise-linear interpolations between a few set values.
- **Image resizing** in data augmentation uses bilinear or bicubic interpolation; upsampling layers in neural networks use the same idea.
- **Positional embeddings** in vision transformers are interpolated when the model is run at a new image resolution.
- The Runge phenomenon is the deterministic mirror of **overfitting**: perfect agreement at the data points, wild behaviour between them.
:::

:::cs
Fonts (TrueType and PostScript) and vector graphics store shapes as quadratic or cubic Bézier and spline curves. Audio sample-rate conversion and video frame interpolation are interpolation problems, and the Fast Fourier Transform is closely related to interpolation by trigonometric polynomials.
:::

:::real
Weather maps show smooth temperature contours even though stations are scattered; the values between stations are interpolated. Animators set a few key frames and let software interpolate the motion between them with splines ("tweening").
:::

:::quiz
? Through how many points does a unique polynomial of degree at most 3 pass?
= 4
> $n + 1$ points determine a polynomial of degree at most $n$.

? Linear interpolation between (2, 10) and (4, 20) at x = 3?
= 15
> The midpoint of the line: $10 + 5 = 15$.

? The quadratic through (0, 1), (1, 3), (2, 7) is x² + x + 1. What is p(3)?
= 13
> $9 + 3 + 1 = 13$.

? What does the Runge phenomenon describe?
- Splines failing at the ends
+ High-degree interpolation on evenly spaced points oscillating wildly near the ends
- Linear interpolation being exact
> Seen with $1/(1 + 25x^2)$ on $[-1, 1]$.

? Which fixes the Runge phenomenon?
- Using more evenly spaced points
+ Using Chebyshev nodes or splines
- Extrapolating instead
> Chebyshev nodes cluster near the ends; splines use low-degree pieces.

? Divided difference f[x₀, x₁] for points (1, 4) and (3, 10)?
= 3
> $\frac{10 - 4}{3 - 1} = 3$.
:::

# Unit: Numerical calculus

## Lesson: Numerical differentiation {#num-calculus}
@summary: Estimating derivatives from function values with finite differences, their error orders, the best step size, and how this compares with automatic differentiation.

### Derivatives without a formula
Calculus teaches us to differentiate formulas, but computers often face functions without a usable formula: a physics simulation, a black-box program, a measured signal, or a loss computed by thousands of lines of code. We can still evaluate such a function at any point we like. **Numerical differentiation** estimates the derivative from a few of those values. It is the oldest trick in the book (it is just the definition of the derivative with a small, finite step) and it has a surprising twist: making the step smaller only helps up to a point.

### An everyday scenario
Imagine you are in a car with a broken speedometer but a working odometer. At 2:00:00 the odometer reads 100.000 km and at 2:00:10 it reads 100.250 km. Your average speed over those 10 seconds was $0.25$ km per 10 s, which is 90 km/h. That is a **finite difference**: change in distance divided by change in time. If the car was accelerating, 90 km/h is not exactly your speed at 2:00:00. Using a shorter interval would be more accurate, but if the odometer only shows three decimal places, a 0.1-second interval would show a change of 0.002 or 0.003 km, and rounding would ruin the estimate. Shorter steps reduce one error and amplify another. That exact tension is the heart of this lesson.

### The forward difference
The derivative is defined as the limit $f'(x) = \lim_{h \to 0}\frac{f(x + h) - f(x)}{h}$. If we stop before the limit and use a small but finite $h$, we get the **forward difference**
$$D_+ f(x) = \frac{f(x + h) - f(x)}{h}.$$
How wrong is it? Taylor's theorem says $f(x + h) = f(x) + hf'(x) + \frac{h^2}{2}f''(\xi)$ for some $\xi$ between $x$ and $x + h$. Substituting,
$$D_+ f(x) = f'(x) + \frac{h}{2}f''(\xi).$$
So the **truncation error** is about $\frac h2 f''$: it is proportional to $h$. We say the method is **first order**. Halve $h$ and the error halves. For $f(x) = x^2$ at $x = 3$ with $h = 0.1$: $\frac{9.61 - 9}{0.1} = 6.1$, while the true derivative is 6. The error is $0.1$, exactly $\frac h2 f'' = \frac{0.1}{2}\cdot 2$.

:::def Finite difference
An approximation of a derivative by a difference quotient of function values at nearby points, such as $\frac{f(x + h) - f(x)}{h}$.
:::

### The central difference
Now look both ways. Using one point on each side, the **central difference** is
$$D_0 f(x) = \frac{f(x + h) - f(x - h)}{2h}.$$
Expanding both values with Taylor's theorem, the $f''$ terms have opposite signs and cancel:
$$D_0 f(x) = f'(x) + \frac{h^2}{6}f'''(\xi).$$
The error is now proportional to $h^2$: a **second-order** method. Halving $h$ cuts the error by a factor of four. For $f(x) = x^2$ at $x = 3$, $\frac{9.61 - 8.41}{0.2} = 6$ exactly, because $f''' = 0$. For $f(x) = e^x$ at $x = 0$ with $h = 0.1$, the forward difference gives $1.0517$ (error $0.052$) but the central difference gives $1.00167$ (error $0.0017$, matching $\frac{h^2}{6} = 0.00167$). For the same two function evaluations, the central difference is about 30 times more accurate here.

:::def Order of accuracy
A finite-difference formula has order $p$ if its truncation error is proportional to $h^p$. Forward differences are first order; central differences are second order.
:::

### The second derivative
Adding the Taylor expansions of $f(x + h)$ and $f(x - h)$ cancels the odd terms instead, giving
$$f''(x) \approx \frac{f(x + h) - 2f(x) + f(x - h)}{h^2},$$
with error $\frac{h^2}{12}f''''$. This formula is the building block of numerical methods for heat flow, waves and diffusion, and it is how image-processing software detects edges (the discrete Laplacian).

### The step-size trade-off
In exact arithmetic we would just make $h$ tiny. On a computer, $f(x + h)$ and $f(x)$ are each stored with a relative rounding error of about $u \approx 10^{-16}$. When $h$ is small the two values are nearly equal, and subtracting them is catastrophic cancellation: the rounding error in the numerator is about $u|f|$, and dividing by $h$ blows it up to about $\frac{u|f|}{h}$. The total error of the forward difference is therefore roughly
$$\frac h2|f''| + \frac{2u|f|}{h}.$$
The first term falls as $h$ shrinks, the second rises. The best compromise is near $h \approx \sqrt u \approx 10^{-8}$, where the total error is also about $10^{-8}$: only half of the 16 available digits. For the central difference the balance point is near $h \approx u^{1/3} \approx 10^{-5}$, with error about $10^{-10}$ to $10^{-11}$. Going smaller makes things worse, which the widget below shows vividly.

### Richardson extrapolation
If we know the error behaves like $Ch^2$, we can cancel it. Let $D(h)$ be the central difference. Then $D(h) \approx f' + Ch^2$ and $D(h/2) \approx f' + Ch^2/4$, so
$$\frac{4D(h/2) - D(h)}{3} \approx f'$$
with the $h^2$ term gone. For $e^x$ at 0: $D(0.1) \approx 1.0016675$ and $D(0.05) \approx 1.0004167$, and the combination gives $0.9999998$, an error of only $2 \times 10^{-7}$. This idea of combining estimates at different step sizes reappears in Romberg integration and in adaptive ODE solvers.

### Automatic differentiation
Machine learning rarely uses finite differences for training. A network with a million parameters would need a million extra function evaluations per gradient. Instead, frameworks use **automatic differentiation**: they apply the chain rule to every elementary operation in the program, giving derivatives that are exact up to rounding at the cost of a few function evaluations. Reverse-mode automatic differentiation is **backpropagation**. Finite differences remain essential for one job: **gradient checking**, testing that a hand-written or automatic gradient is correct.

:::warn Common mistakes
- Choosing $h = 10^{-15}$ "for accuracy". Below about $10^{-8}$ (forward) or $10^{-5}$ (central) rounding dominates.
- Using a fixed absolute $h$ when $x$ is huge; scale it, for example $h = \sqrt u\,\max(1, |x|)$.
- Differentiating noisy measured data directly. Noise of size $\sigma$ becomes error of size $\sigma/h$; smooth or fit first.
- Confusing automatic differentiation with symbolic or numerical differentiation. It is neither: it is exact chain-rule bookkeeping on the program.
:::

### Summary
Finite differences estimate derivatives from function values. The forward difference has error proportional to $h$, the central difference to $h^2$, and the second-difference formula estimates $f''$ with error proportional to $h^2$. Rounding error grows like $u/h$, so the step size has a sweet spot (about $10^{-8}$ forward, $10^{-5}$ central). Richardson extrapolation cancels the leading error term, and automatic differentiation is the exact alternative used in deep learning.

@viz g07-approx mode=diff | Forward (orange) and central (purple) difference errors at x = 1, on log-log axes.

:::explore
**What to try**
1. With $\sin x$ selected, put the pink line at $h = 10^{-2}$ and read the forward and central estimates. Compare their errors with $\frac h2|f''|$ and $\frac{h^2}{6}|f'''|$.
2. Slide from $h = 1$ to $h = 10^{-4}$. On the right side the orange line falls with slope 1 and the purple with slope 2: first and second order.
3. Find each curve's minimum: about $10^{-8}$ for forward and about $10^{-5}$ for central.
4. Switch to $x^3$. The central difference now has error exactly $h^2$ (since $f''' = 6$ and $\frac{6h^2}{6} = h^2$), while the forward error is about $3h$.

**What to notice:** the right half of each V is truncation error and the left half is rounding error. The slopes tell you the order of the method, and the bottom of the V tells you the best achievable accuracy, exactly as predicted by the error formula in the article.
:::

@viz tangent | A secant line approaching the tangent: the geometric picture of a forward difference.

:::explore
**What to try**
1. Start with a large $h$ and read the secant slope; compare it with the tangent slope.
2. Shrink $h$ step by step and watch the secant swing toward the tangent.

**What to notice:** the secant slope is exactly the forward difference. Its distance from the tangent slope shrinks roughly in proportion to $h$, the first-order error from the article.
:::

:::formulas
$$\frac{f(x + h) - f(x)}{h} = f'(x) + \frac h2f''(\xi)$$
$$\frac{f(x + h) - f(x - h)}{2h} = f'(x) + \frac{h^2}{6}f'''(\xi)$$
$$\frac{f(x + h) - 2f(x) + f(x - h)}{h^2} = f''(x) + \frac{h^2}{12}f''''(\xi)$$
$$h_{\text{opt}} \approx \sqrt{u}\ \text{(forward)},\quad u^{1/3}\ \text{(central)}$$
$$\text{Richardson: } \frac{4D(h/2) - D(h)}{3}$$
:::

:::thm Error of the central difference
If $f$ has a continuous third derivative near $x$, then $\frac{f(x + h) - f(x - h)}{2h} - f'(x) = \frac{h^2}{6}f'''(\xi)$ for some $\xi \in (x - h, x + h)$.
:::

:::proof
By Taylor's theorem with remainder, $f(x \pm h) = f(x) \pm hf'(x) + \frac{h^2}{2}f''(x) \pm \frac{h^3}{6}f'''(\xi_\pm)$. Subtracting, $f(x + h) - f(x - h) = 2hf'(x) + \frac{h^3}{6}\big(f'''(\xi_+) + f'''(\xi_-)\big)$. Divide by $2h$; by the intermediate value theorem the average $\frac12(f'''(\xi_+) + f'''(\xi_-))$ equals $f'''(\xi)$ for some $\xi$ in between, giving the result.
:::

:::steps Forward and central differences for eˣ at x = 0 with h = 0.1
1. $e^{0.1} \approx 1.105171$, $e^{-0.1} \approx 0.904837$; the true derivative is 1.
2. Forward: $\frac{1.105171 - 1}{0.1} = 1.05171$, error $\approx 0.052 \approx \frac h2$.
3. Central: $\frac{1.105171 - 0.904837}{0.2} = 1.00167$, error $\approx 0.00167 \approx \frac{h^2}{6}$.
:::

:::steps Effect of halving h
1. Forward differences are first order: error $\approx Ch$, so halving $h$ halves the error.
2. Central differences are second order: error $\approx Ch^2$, so halving $h$ divides the error by 4.
3. Check with $e^x$ at 0: central error at $h = 0.1$ is $0.001668$, at $h = 0.05$ it is $0.000417$, a ratio of 4.
:::

:::mock Exam question
Estimate $f''(1)$ for $f(x) = x^4$ using the second-difference formula with $h = 0.1$. Compare with the exact value and with the error formula $\frac{h^2}{12}f''''$.
:::solution
$f(1.1) = 1.4641$, $f(1) = 1$, $f(0.9) = 0.6561$. Estimate $= \frac{1.4641 - 2 + 0.6561}{0.01} = \frac{0.1202}{0.01} = 12.02$. Exact: $f''(x) = 12x^2$, so $f''(1) = 12$, error $0.02$. Since $f'''' = 24$ everywhere, the formula predicts $\frac{0.01}{12}\cdot 24 = 0.02$, matching exactly.
:::
:::

:::ml
- **Gradient checking:** compare each backprop gradient component with $\frac{L(\theta + he_i) - L(\theta - he_i)}{2h}$ using $h \approx 10^{-5}$ in double precision; a relative difference around $10^{-7}$ or below means the gradient is almost certainly right.
- **Backpropagation** is reverse-mode automatic differentiation: one backward pass gives the exact gradient with respect to all parameters.
- **Zeroth-order optimization** (for black-box models or hyperparameters) estimates gradients from finite differences or random perturbations.
- **Hessian-vector products** can be approximated by $\frac{\nabla L(\theta + hv) - \nabla L(\theta - hv)}{2h}$.
:::

:::cs
Finite differences turn differential equations into systems of algebraic equations on a grid: the heat equation, wave equation and Laplace's equation are all discretised with the second-difference formula. In images, the same formula in two dimensions is the Laplacian filter used for edge detection and sharpening.
:::

:::real
Your phone estimates walking speed from GPS positions taken about once a second, a forward or central difference of position. Because GPS positions are noisy by a few metres, differencing over very short intervals gives jumpy speeds, so the software smooths over several seconds: the step-size trade-off in daily life.
:::

:::quiz
? Forward difference for f(x) = x² at x = 3 with h = 0.1?
= 6.1
> $\frac{9.61 - 9}{0.1} = 6.1$; the error equals $\frac h2 f'' = 0.1$.

? Central difference for f(x) = x² at x = 3 with h = 0.1?
= 6
> $\frac{9.61 - 8.41}{0.2} = 6$, exact because $f''' = 0$.

? What is the order of accuracy of the central difference?
= 2
> Its error is proportional to $h^2$.

? Halving h in a central difference multiplies the truncation error by about:
= 1/4|0.25
> $(h/2)^2 = h^2/4$.

? In double precision, roughly which step size minimises the total error of a forward difference?
- 10⁻¹⁶
+ 10⁻⁸
- 10⁻²
> The balance point is about $\sqrt u \approx 10^{-8}$.

? How do deep-learning frameworks compute gradients for training?
- Forward differences
- Symbolic algebra
+ Reverse-mode automatic differentiation (backpropagation)
> It is exact up to rounding and costs only a few forward passes.
:::

## Lesson: Numerical integration (quadrature) {#quadrature}
@summary: Approximating areas with rectangles, trapezoids and parabolas, their error orders, Gaussian quadrature, and the curse of dimensionality.

### Areas without antiderivatives
The fundamental theorem of calculus says $\int_a^b f(x)\,dx = F(b) - F(a)$ when we know an antiderivative $F$. But many important integrals have no elementary antiderivative at all: $\int e^{-x^2}dx$, the area under the bell curve, is the famous example. Others involve functions known only by measurements or by a computer program. **Numerical integration**, also called **quadrature**, estimates the integral from function values at chosen points. It is how calculators compute normal probabilities, how engineers compute volumes and work, and how machine learning computes expected values.

### An everyday scenario
Imagine you want the area of an irregular garden pond. You stretch a tape across it and measure its width every metre along its length: 0, 3.0, 4.0, 3.5 and 0 metres. A simple estimate treats each one-metre strip as a rectangle. A better one treats each strip as a trapezoid, with the two measured widths as its parallel sides: $1\cdot\left(\frac{0}{2} + 3.0 + 4.0 + 3.5 + \frac02\right) = 10.5$ square metres. An even better one fits a parabola through each pair of strips. Every method in this lesson is a version of this idea: replace the curve by simple shapes whose areas we know.

### Riemann sums and the midpoint rule
Split $[a, b]$ into $n$ strips of width $h = \frac{b - a}{n}$. The **left rule** uses the height at the left edge of each strip, the **right rule** at the right edge, and the **midpoint rule** at the middle:
$$M_n = h\sum_{i=1}^{n} f\big(a + (i - \tfrac12)h\big).$$
For $\int_0^1 x^2\,dx = \frac13$ with $n = 2$ ($h = 0.5$): the left rule gives $0.5(0 + 0.25) = 0.125$, very poor; the midpoint rule gives $0.5(0.0625 + 0.5625) = 0.3125$, an error of only $0.021$. Left and right rules are first order (error proportional to $h$); the midpoint rule is second order, because on each strip it overestimates on one side and underestimates on the other, and the first-order errors cancel.

### The trapezoid rule
Join neighbouring points by straight lines and add the trapezoid areas:
$$T_n = h\left[\frac{f(x_0)}{2} + f(x_1) + \cdots + f(x_{n-1}) + \frac{f(x_n)}{2}\right].$$
For $\int_0^1 x^2\,dx$ with $n = 2$: $T_2 = 0.5\left(0 + 0.25 + 0.5\right) = 0.375$, an error of $0.0417$. The error formula is
$$\int_a^b f\,dx - T_n = -\frac{(b - a)h^2}{12}f''(\xi),$$
which here gives $-\frac{1\cdot0.25}{12}\cdot2 = -0.0417$: exact, since $f''$ is constant. The trapezoid rule is also second order, with an error about twice the midpoint rule's and of opposite sign. Halving $h$ divides both errors by about 4.

:::def Quadrature rule
A formula $\int_a^b f(x)\,dx \approx \sum_i w_i f(x_i)$ that estimates an integral from function values at nodes $x_i$ with weights $w_i$.
:::

### Simpson's rule
Since the midpoint error is about $-\frac12$ of the trapezoid error, the combination $\frac{2M + T}{3}$ cancels the $h^2$ terms. The result is **Simpson's rule**, which fits a parabola through each group of three points. With an even number $n$ of strips,
$$S_n = \frac h3\left[f(x_0) + 4f(x_1) + 2f(x_2) + 4f(x_3) + \cdots + 4f(x_{n-1}) + f(x_n)\right].$$
For $\int_0^1 x^2\,dx$ with $n = 2$: $\frac{0.5}{3}(0 + 4\cdot0.25 + 1) = \frac13$, exact. Simpson's rule is exact for every cubic and has error $-\frac{(b - a)h^4}{180}f''''(\xi)$: **fourth order**. Halving $h$ divides the error by 16. For $\int_0^\pi\sin x\,dx = 2$, Simpson with $n = 4$ already gives $2.0046$.

:::def Simpson's rule
The quadrature rule $\frac h3[f_0 + 4f_1 + 2f_2 + 4f_3 + \cdots + f_n]$ (with $n$ even), which integrates a parabola through each pair of strips exactly and has error proportional to $h^4$.
:::

### Gaussian quadrature
So far the nodes were evenly spaced. If we may choose the nodes too, we can do much better. **Gauss–Legendre quadrature** with $n$ well-chosen nodes integrates every polynomial of degree up to $2n - 1$ exactly. With just two nodes at $\pm\frac{1}{\sqrt3}$ and weights 1, $\int_{-1}^1 f\,dx \approx f(-\tfrac{1}{\sqrt3}) + f(\tfrac{1}{\sqrt3})$ is exact for cubics: for $x^2$ it gives $\frac13 + \frac13 = \frac23$, the true value. Gaussian rules are the method of choice for smooth integrands, and **Gauss–Hermite** quadrature handles integrals against a Gaussian weight $e^{-x^2}$, which appear constantly in statistics.

### Adaptivity and the curse of dimensionality
Real software uses **adaptive quadrature**: estimate each piece twice (say, with Simpson on $h$ and $h/2$), and subdivide only where the two disagree. Effort goes where the function is difficult. In many dimensions, though, grid-based rules break down. A grid with just 10 points per axis needs $10^{d}$ function evaluations in $d$ dimensions: $10^{10}$ for $d = 10$, and hopelessly many for the millions of dimensions of a neural network's parameter space. This **curse of dimensionality** is why high-dimensional integrals are done by Monte Carlo, the final lesson of this course.

:::warn Common mistakes
- Using Simpson's rule with an odd number of strips. It needs pairs.
- Forgetting the halves on the end values of the trapezoid rule.
- Expecting high-order rules to help with a kink or a jump. Error formulas assume smooth derivatives; split the interval at the trouble spot.
- Using grids for integrals in more than a handful of dimensions.
:::

### Summary
Quadrature replaces $\int f$ with a weighted sum of function values. Left and right rules are first order; midpoint and trapezoid are second order with errors of opposite sign; Simpson's rule combines them to fourth order and is exact for cubics. Gaussian quadrature chooses the nodes to be exact up to degree $2n - 1$, adaptive methods concentrate effort where needed, and in high dimensions Monte Carlo takes over.

@viz riemann | Switch rules and change n; the readout compares the estimate with the exact integral.

:::explore
**What to try**
1. Choose $f(x) = x^2$ with upper limit $b = 2$ (exact area $\frac83 \approx 2.667$). With 4 rectangles compare Left, Right, Midpoint and Trapezoid.
2. Check the trapezoid value: $0.5\left(0 + 0.25 + 1 + 2.25 + \frac42\right) = 2.75$, an error of $0.083$, as the formula $\frac{(b - a)h^2}{12}f''$ predicts.
3. Double n from 4 to 8 and then 16. Left and right errors halve; midpoint and trapezoid errors drop by about 4.
4. Notice that midpoint and trapezoid errors have opposite signs, with the trapezoid error about twice as big.

**What to notice:** steps 3 and 4 are exactly the facts used to build Simpson's rule. Averaging $\frac{2M + T}{3}$ cancels the leading error, which is why Simpson's is fourth order.
:::

:::formulas
$$M_n = h\sum_{i=1}^n f(a + (i - \tfrac12)h),\quad E_M = \frac{(b - a)h^2}{24}f''(\xi)$$
$$T_n = h\left[\tfrac12f_0 + f_1 + \cdots + f_{n-1} + \tfrac12f_n\right],\quad E_T = -\frac{(b - a)h^2}{12}f''(\xi)$$
$$S_n = \frac h3[f_0 + 4f_1 + 2f_2 + \cdots + 4f_{n-1} + f_n],\quad E_S = -\frac{(b - a)h^4}{180}f''''(\xi)$$
$$S = \frac{2M + T}{3}$$
$$\int_{-1}^1 f\,dx \approx f\big(-\tfrac{1}{\sqrt3}\big) + f\big(\tfrac{1}{\sqrt3}\big)\ \ \text{(exact to degree 3)}$$
:::

:::thm Simpson's rule is exact for cubics
For every polynomial $f$ of degree at most 3, $\int_{-h}^{h} f\,dx = \frac h3\big[f(-h) + 4f(0) + f(h)\big]$.
:::

:::proof
Both sides are linear in $f$, so it suffices to check $1, x, x^2, x^3$. For $1$: $2h = \frac h3(6)$. For $x$ and $x^3$: both sides are 0 by symmetry. For $x^2$: $\int_{-h}^h x^2dx = \frac{2h^3}{3}$ and $\frac h3(h^2 + 0 + h^2) = \frac{2h^3}{3}$. Shifting the interval doesn't change this, so the composite rule is exact for cubics on every pair of strips.
:::

:::steps ∫₀^π sin x dx with the trapezoid and Simpson rules
1. Exact value: $[-\cos x]_0^\pi = 2$.
2. Trapezoid, $n = 2$, $h = \frac\pi2$: $\frac\pi2\left(0 + 1 + 0\right) \approx 1.571$, error $0.43$.
3. Simpson, $n = 2$: $\frac{\pi}{6}(0 + 4\cdot1 + 0) \approx 2.094$, error $0.094$.
4. Simpson, $n = 4$, $h = \frac\pi4$: $\frac{\pi}{12}\left(0 + 4(0.7071) + 2(1) + 4(0.7071) + 0\right) \approx 2.0046$, error $0.0046$, about 20 times smaller than with $n = 2$, close to the factor 16 that fourth-order convergence predicts for halving $h$.
:::

:::steps Two-point Gaussian quadrature on x⁴
1. Exact: $\int_{-1}^1 x^4\,dx = \frac25 = 0.4$.
2. Gauss: $2\left(\frac{1}{\sqrt3}\right)^4 = 2\cdot\frac19 = \frac29 \approx 0.222$.
3. Not exact: degree 4 exceeds $2n - 1 = 3$. For $x^2$ and $x^3$ the same rule is exact.
:::

:::mock Exam question
Estimate $\ln 2 = \int_1^2\frac{dx}{x}$ with (a) the trapezoid rule and (b) Simpson's rule, both with $n = 2$. Compare with $\ln 2 \approx 0.693147$.
:::solution
$h = 0.5$, values $f(1) = 1$, $f(1.5) = \frac23$, $f(2) = 0.5$. (a) $T_2 = 0.5\left(\frac12 + \frac23 + \frac14\right) = 0.5(1.41667) \approx 0.70833$, error $\approx 0.0152$ (too big, since $\frac1x$ is convex and chords lie above it). (b) $S_2 = \frac{0.5}{3}\left(1 + 4\cdot\frac23 + 0.5\right) = \frac16(4.16667) \approx 0.69444$, error $\approx 0.0013$, more than ten times smaller for the same three function values.
:::
:::

:::ml
- **ROC AUC** is computed with the trapezoid rule over the points of the ROC curve (for example `sklearn.metrics.auc`).
- **Expectations under Gaussians** in Bayesian models, Gaussian-process classification and variational inference are often computed with Gauss–Hermite quadrature.
- **Normalizing constants and marginal likelihoods** in low dimensions are found by quadrature; in high dimensions they need Monte Carlo or variational bounds.
- **Diffusion and neural ODE models** integrate over time, which is quadrature applied along a trajectory.
:::

:::cs
Library functions such as SciPy's `quad` use adaptive Gauss–Kronrod rules: a Gauss rule and an extended rule share nodes, their difference estimates the error, and intervals are bisected until the estimate meets the tolerance.
:::

:::real
Simpson's rule has been used in naval architecture for centuries to compute a ship's displacement and stability from cross-section measurements taken at regular stations along the hull, exactly the garden-pond idea at a larger scale.
:::

:::quiz
? Trapezoid rule with one strip for ∫₀¹ x² dx?
= 1/2|0.5
> $1\cdot\frac{0 + 1}{2} = \frac12$.

? Midpoint rule with one strip for ∫₀¹ x² dx?
= 1/4|0.25
> $1\cdot(0.5)^2 = \frac14$.

? Up to what degree is Simpson's rule exact?
= 3
> It is exact for all cubics, thanks to symmetry.

? Halving h in Simpson's rule divides the error by about:
= 16
> Fourth order: $2^4 = 16$.

? Halving h in the trapezoid rule divides the error by about:
= 4
> Second order: $2^2 = 4$.

? Why is Monte Carlo preferred for integrals in high dimensions?
+ Grid rules need a number of points that grows exponentially with dimension
- Monte Carlo is exact
- Simpson's rule only works in one dimension by definition
> With 10 points per axis, $d$ dimensions need $10^d$ points.
:::

## Lesson: Solving differential equations step by step {#ode-solvers}
@summary: Euler's method, Runge–Kutta methods, stability and stiffness, and why gradient descent is Euler's method in disguise.

### Predicting the future one small step at a time
A **differential equation** describes how something changes: the rate of change of a population depends on its size, the acceleration of a planet depends on its position, the rate of change of a neural network's weights depends on the gradient of the loss. Written as $y'(t) = f(t, y)$ with a known starting value $y(0) = y_0$, it is called an **initial value problem**. Only a few such equations have formula solutions. For the rest, including weather models, epidemic models, circuits and orbits, we compute the solution numerically by marching forward in small time steps.

### An everyday scenario
Imagine driving in fog with a map that tells you, at any point, which direction the road goes. You can't see the whole road, but you can look at the map, drive straight in the indicated direction for 10 metres, check the map again, and repeat. If the road curves gently and your steps are short, you'll follow it closely. If your steps are long, you'll overshoot bends and drift off the road. That is **Euler's method**: follow the current slope for one step, then re-evaluate.

### Euler's method
Starting from $(t_0, y_0)$ with step size $h$, Euler's method uses the tangent line:
$$y_{n+1} = y_n + h f(t_n, y_n),\qquad t_{n+1} = t_n + h.$$
Let's solve $y' = y$, $y(0) = 1$, whose true solution is $y = e^t$, up to $t = 1$. With $h = 0.5$: $y_1 = 1 + 0.5(1) = 1.5$, then $y_2 = 1.5 + 0.5(1.5) = 2.25$. The true value is $e \approx 2.718$, so the error is $0.468$. With $h = 0.25$ we get $1.25^4 \approx 2.441$ (error $0.277$); with $h = 0.1$, $1.1^{10} \approx 2.594$ (error $0.125$). Each time the step shrinks, the error shrinks roughly in proportion. Euler's method is **first order**: its global error is proportional to $h$.

Where does the error come from? Each step follows a straight line while the true curve bends, giving a **local error** of about $\frac{h^2}{2}y''$ per step. Over $\frac{T}{h}$ steps these add up to a **global error** proportional to $h$.

:::def Euler's method
The time-stepping rule $y_{n+1} = y_n + hf(t_n, y_n)$ for $y' = f(t, y)$: follow the slope at the current point for one step. Its global error is proportional to $h$.
:::

### Runge–Kutta methods
To do better, sample the slope at several points within the step and average them cleverly. **Heun's method** (improved Euler) takes a trial Euler step, evaluates the slope at its end, and averages the two slopes:
$$k_1 = f(t_n, y_n),\quad k_2 = f(t_n + h, y_n + hk_1),\quad y_{n+1} = y_n + \frac h2(k_1 + k_2).$$
For $y' = y$ with $h = 0.5$, each step multiplies by $1 + h + \frac{h^2}{2} = 1.625$, giving $1.625^2 \approx 2.641$ at $t = 1$, an error of $0.078$: six times better than Euler with the same step. Heun's method is second order.

The workhorse is the classical **fourth-order Runge–Kutta method** (RK4), which uses four slope samples per step:
$$k_1 = f(t_n, y_n),\ k_2 = f(t_n + \tfrac h2, y_n + \tfrac h2k_1),\ k_3 = f(t_n + \tfrac h2, y_n + \tfrac h2k_2),\ k_4 = f(t_n + h, y_n + hk_3),$$
$$y_{n+1} = y_n + \frac h6(k_1 + 2k_2 + 2k_3 + k_4).$$
For $y' = y$, one RK4 step multiplies by $1 + h + \frac{h^2}{2} + \frac{h^3}{6} + \frac{h^4}{24}$, the Taylor series of $e^h$ up to $h^4$. With $h = 0.5$ that is $1.6484$, and two steps give $2.7173$, an error of only $0.0009$. Halving the step divides RK4's error by about 16. Modern solvers such as `RK45` pair two Runge–Kutta formulas of different orders to estimate the error and choose the step size automatically.

:::def Runge–Kutta method
A one-step ODE method that combines several slope evaluations within each step to match the Taylor series of the true solution to higher order. RK4 is fourth order.
:::

### Stability and stiffness
Accuracy is not the only concern. Consider the decaying equation $y' = -\lambda y$ with $\lambda > 0$, whose solution $y_0e^{-\lambda t}$ shrinks to zero. Euler gives $y_{n+1} = (1 - h\lambda)y_n$. If $h\lambda < 2$, then $|1 - h\lambda| < 1$ and the numerical solution decays too. But if $h > \frac{2}{\lambda}$, the factor is less than $-1$ and the numbers oscillate and **grow without bound**, even though the true solution decays. With $\lambda = 10$ and $h = 0.3$, the factor is $-2$ and $y$ goes $1, -2, 4, -8, \ldots$. This is **numerical instability**.

An equation is **stiff** when it contains both very fast and slow processes, such as chemical reactions with very different rates. The fast part forces explicit methods like Euler to take tiny steps for stability, long after it has died away. **Implicit methods** fix this. **Backward Euler** evaluates the slope at the *new* point, $y_{n+1} = y_n + hf(t_{n+1}, y_{n+1})$, which for $y' = -\lambda y$ gives $y_{n+1} = \frac{y_n}{1 + h\lambda}$: stable for every step size. The price is solving an equation (often with Newton's method) at every step.

:::def Stiff equation
A differential equation whose solution has components changing on very different time scales, so that explicit methods need tiny steps for stability rather than accuracy.
:::

### Gradient descent is Euler's method
Here is a connection that matters for machine learning. The **gradient flow** $\theta'(t) = -\nabla L(\theta)$ describes a ball rolling downhill on the loss surface. Apply Euler's method with step $\eta$: $\theta_{n+1} = \theta_n - \eta\nabla L(\theta_n)$. That is exactly **gradient descent**, with the learning rate as the step size. The stability analysis carries over: on a quadratic loss $L = \frac{\lambda}{2}\theta^2$, gradient descent multiplies $\theta$ by $1 - \eta\lambda$ each step, so it diverges when $\eta > \frac{2}{\lambda}$. A too-large learning rate is a too-large Euler step, and the curvature $\lambda$ plays the role of stiffness.

:::warn Common mistakes
- Assuming small errors per step mean small total error. Local errors accumulate, and instability can amplify them.
- Using an explicit method on a stiff problem and blaming the model when the numbers explode.
- Forgetting that halving the step doubles the work; a higher-order method is usually a better investment.
- Using plain Euler for long-time physics such as orbits. It steadily gains energy; symplectic methods like leapfrog are designed to avoid that.
:::

### Summary
Initial value problems $y' = f(t, y)$ are solved by stepping forward in time. Euler's method follows the current slope and is first order; Heun's method is second order and RK4 fourth order. Explicit methods are unstable when the step is too large relative to the fastest decay rate ($h > 2/\lambda$ for Euler); implicit methods such as backward Euler stay stable on stiff problems. Gradient descent is Euler's method on gradient flow, and its learning-rate limit is this stability limit.

@viz gd surface=bowl lr=0.1 | Gradient descent as Euler steps on the gradient flow of f = x² + 2y².

:::explore
**What to try**
1. Run with learning rate $\eta = 0.1$ and watch smooth Euler steps roll into the minimum.
2. The steepest direction has curvature $\lambda = 4$ (since $\frac{\partial^2f}{\partial y^2} = 4$), so the stability limit is $\eta < \frac{2}{4} = 0.5$. Try $\eta = 0.4$: the path zig-zags across the valley but still converges.
3. Try $\eta = 0.55$: the $y$-coordinate is multiplied by $1 - 4(0.55) = -1.2$ each step and the iterates spiral outward.
4. Switch to the ravine surface $0.2x^2 + 4y^2$. Its curvatures are $0.4$ and $8$, so stability needs $\eta < 0.25$, but then the gentle direction crawls. That is stiffness.

**What to notice:** the divergence in step 3 is exactly the Euler instability $|1 - h\lambda| > 1$ from the article, with learning rate as the step size. Ill-conditioned problems are stiff problems.
:::

:::formulas
$$\text{Euler: } y_{n+1} = y_n + hf(t_n, y_n)$$
$$\text{Heun: } y_{n+1} = y_n + \tfrac h2\big[f(t_n, y_n) + f(t_n + h, y_n + hf(t_n, y_n))\big]$$
$$\text{RK4: } y_{n+1} = y_n + \tfrac h6(k_1 + 2k_2 + 2k_3 + k_4)$$
$$\text{Backward Euler: } y_{n+1} = y_n + hf(t_{n+1}, y_{n+1})$$
$$y' = -\lambda y:\ \text{Euler stable iff } 0 < h\lambda \le 2$$
$$\text{Global error: } O(h)\ \text{Euler},\ O(h^2)\ \text{Heun},\ O(h^4)\ \text{RK4}$$
:::

:::thm Stability of Euler's method on the test equation
For $y' = -\lambda y$ with $\lambda > 0$, Euler's method gives $y_n = (1 - h\lambda)^ny_0$, which tends to 0 if $0 < h < \frac{2}{\lambda}$ and grows without bound if $h > \frac{2}{\lambda}$. Backward Euler gives $y_n = (1 + h\lambda)^{-n}y_0$, which tends to 0 for every $h > 0$.
:::

:::proof
Euler: $y_{n+1} = y_n + h(-\lambda y_n) = (1 - h\lambda)y_n$, so $y_n = (1 - h\lambda)^ny_0$. This tends to 0 iff $|1 - h\lambda| < 1$, i.e. $0 < h\lambda < 2$, and grows iff $h\lambda > 2$. Backward Euler: $y_{n+1} = y_n - h\lambda y_{n+1}$ gives $y_{n+1} = \frac{y_n}{1 + h\lambda}$, and $0 < \frac{1}{1 + h\lambda} < 1$ for all $h > 0$.
:::

:::steps Euler's method for y′ = y, y(0) = 1 to t = 1 with h = 0.5 and h = 0.25
1. $h = 0.5$: each step multiplies by $1.5$: $y(1) \approx 1.5^2 = 2.25$, error $0.468$.
2. $h = 0.25$: each step multiplies by $1.25$: $y(1) \approx 1.25^4 \approx 2.441$, error $0.277$.
3. The error ratio is about $0.6$, approaching $\frac12$ as $h$ shrinks: first-order convergence.
:::

:::steps One RK4 step for y′ = y, y(0) = 1, h = 1
1. $k_1 = 1$; $k_2 = 1 + \frac12(1) = 1.5$; $k_3 = 1 + \frac12(1.5) = 1.25$; $k_4 = 1 + 1.25 = 2.25$.
2. $y_1 = 1 + \frac16(1 + 3 + 2.5 + 2.25) = 1 + \frac{8.75}{6} \approx 2.4583$.
3. True value $e \approx 2.7183$. Even with one huge step RK4 beats Euler with ten steps ($2.594$).
:::

:::mock Exam question
For $y' = -2y$, $y(0) = 1$: (a) apply forward Euler with $h = 0.25$ to reach $t = 1$; (b) apply backward Euler with the same step; (c) compare with $e^{-2}$; (d) find the largest step for which forward Euler does not blow up.
:::solution
(a) Factor $1 - 2(0.25) = 0.5$ per step, so $y(1) \approx 0.5^4 = 0.0625$. (b) Factor $\frac{1}{1 + 0.5} = \frac23$, so $y(1) \approx \left(\frac23\right)^4 = \frac{16}{81} \approx 0.198$. (c) $e^{-2} \approx 0.135$: forward Euler undershoots and backward Euler overshoots, both by first-order errors. (d) Stability needs $h\lambda \le 2$, so $h \le 1$; for $h > 1$ the iterates oscillate and grow.
:::
:::

:::ml
- **Gradient descent** is Euler's method on gradient flow; momentum methods discretise a heavy-ball ODE, and the learning-rate limit $\eta < 2/\lambda_{\max}$ is Euler's stability condition with $\lambda_{\max}$ the largest Hessian eigenvalue.
- **Diffusion models** generate images by integrating a probability-flow ODE backwards in time; sampler names like "Euler", "Heun" and "DPM-Solver" are exactly these ODE methods.
- **Neural ODEs** define a network layer as the solution of $z' = f_\theta(z, t)$ and call an adaptive Runge–Kutta solver in the forward pass.
- **Hamiltonian Monte Carlo** uses the leapfrog integrator to simulate a particle moving through parameter space.
:::

:::cs
Game physics engines update positions and velocities every frame with semi-implicit (symplectic) Euler or Verlet integration, which are cheap and keep energy roughly constant. Too large a time step and objects tunnel through walls or explode, a visible version of numerical instability.
:::

:::real
Epidemic forecasts use the SIR model, $S' = -\beta SI$, $I' = \beta SI - \gamma I$, $R' = \gamma I$, solved numerically by Runge–Kutta methods. Weather forecasts step huge systems of differential equations forward in time steps of minutes, on supercomputers, to predict the next week.
:::

:::quiz
? One Euler step for y′ = y from y(0) = 1 with h = 0.1?
= 1.1
> $1 + 0.1(1) = 1.1$.

? Euler's method for y′ = y, y(0) = 1, h = 0.5, two steps. What is y(1)?
= 2.25|9/4
> $1.5^2 = 2.25$.

? What is the order of the classical RK4 method?
= 4
> Its global error is proportional to $h^4$.

? Forward Euler on y′ = −10y is stable for h up to:
= 0.2|1/5
> Needs $h\lambda \le 2$, so $h \le 0.2$.

? Why use backward Euler on stiff problems?
- It is more accurate per step
+ It is stable for any step size on decaying problems
- It needs no equation solving
> Its factor $\frac{1}{1 + h\lambda}$ is always between 0 and 1.

? Gradient descent with learning rate η is:
+ Euler's method on the gradient flow θ′ = −∇L
- RK4 on the loss
- Backward Euler on the gradient
> $\theta_{n+1} = \theta_n - \eta\nabla L(\theta_n)$ is one Euler step of size $\eta$.
:::

# Unit: Numerical linear algebra

## Lesson: Solving linear systems: LU, pivoting and conditioning {#num-linalg}
@summary: How computers really solve Ax = b, why they never form the inverse, why pivoting matters, and how the condition number limits accuracy.

### The most common computation in science
Solving a system of linear equations $Ax = b$ is probably the single most frequent task in scientific computing. Fitting a regression model, simulating a bridge, rendering a scene, solving a differential equation and taking a Newton step all end up as linear systems, sometimes with millions of unknowns. You learned to solve small systems by elimination in algebra. This lesson is about doing it on a computer: efficiently, in a way that rounding errors cannot wreck, and with an honest idea of how accurate the answer can be.

### An everyday scenario
Imagine two friends who buy snacks. One buys 2 coffees and 1 muffin for 3 dollars; the other buys 4 coffees and 5 muffins for 9 dollars. What does each item cost? Subtract twice the first purchase from the second: $4 - 2\cdot2 = 0$ coffees and $5 - 2\cdot1 = 3$ muffins cost $9 - 2\cdot3 = 3$ dollars, so a muffin costs 1 dollar, and then $2c + 1 = 3$ gives a coffee at 1 dollar. That is Gaussian elimination. Now imagine the two receipts were almost identical, say 1 coffee and 1 muffin for 2.00 dollars and 1 coffee and 1.0001 muffins for 2.0001 dollars. A typo of one hundredth of a cent on the second receipt would completely change the answer. Some systems are simply sensitive, and no algorithm can fix that.

### Gaussian elimination is LU factorization
Elimination subtracts multiples of rows to create zeros below the diagonal, leaving an upper triangular matrix $U$. If we record the multipliers in a lower triangular matrix $L$ with ones on the diagonal, we get the factorization
$$A = LU.$$
For the snack system, $A = \begin{bmatrix}2 & 1\\4 & 5\end{bmatrix}$: the multiplier for row 2 is $\frac42 = 2$, so $L = \begin{bmatrix}1 & 0\\2 & 1\end{bmatrix}$ and $U = \begin{bmatrix}2 & 1\\0 & 3\end{bmatrix}$. Check: $LU = \begin{bmatrix}2 & 1\\4 & 2 + 3\end{bmatrix} = A$.

Solving $Ax = b$ is now two easy triangular solves. First **forward substitution** for $Ly = b$: $y_1 = 3$, $y_2 = 9 - 2\cdot3 = 3$. Then **back substitution** for $Ux = y$: $x_2 = \frac33 = 1$, $x_1 = \frac{3 - 1}{2} = 1$. The factorization costs about $\frac23n^3$ arithmetic operations, while each triangular solve costs only about $n^2$. So once $A$ is factored you can solve for many right-hand sides cheaply.

:::def LU factorization
Writing $A = LU$ (or $PA = LU$ with a row permutation $P$), where $L$ is lower triangular with unit diagonal and $U$ is upper triangular. It is Gaussian elimination with the multipliers saved.
:::

### Why you should never compute the inverse
It's tempting to write $x = A^{-1}b$ in code. Don't. Computing $A^{-1}$ costs about three times as much as an LU factorization, and multiplying by it is usually less accurate. Libraries provide `solve(A, b)` precisely so you never form the inverse. When a formula contains $A^{-1}B$, read it as "solve $AX = B$".

### Pivoting
Elimination divides by the diagonal entry, the **pivot**. If a pivot is zero the method fails, and if it is merely tiny the method becomes wildly inaccurate. Consider $\begin{bmatrix}10^{-20} & 1\\1 & 1\end{bmatrix}x = \begin{bmatrix}1\\2\end{bmatrix}$, whose solution is very close to $x = (1, 1)$. Eliminating with the tiny pivot uses the multiplier $10^{20}$: the new bottom-right entry is $1 - 10^{20}$, which rounds to $-10^{20}$, and the right side $2 - 10^{20}$ also rounds to $-10^{20}$. Back substitution gives $x_2 = 1$ and then $x_1 = \frac{1 - 1}{10^{-20}} = 0$. Completely wrong. **Partial pivoting** swaps rows so the largest available entry in the column becomes the pivot. Swapping the two rows here gives multiplier $10^{-20}$, no catastrophe, and the correct answer $x \approx (1, 1)$. With partial pivoting, Gaussian elimination is stable in practice, and it is what every library uses: $PA = LU$.

### Special structure: Cholesky
Many matrices in statistics and machine learning are **symmetric positive definite** (SPD), such as covariance matrices and $A^TA$. For them there is the **Cholesky factorization** $A = LL^T$, which costs half as much as LU and needs no pivoting. For $A = \begin{bmatrix}4 & 2\\2 & 3\end{bmatrix}$: $L_{11} = \sqrt4 = 2$, $L_{21} = \frac22 = 1$, $L_{22} = \sqrt{3 - 1^2} = \sqrt2$. Cholesky also gives a fast test for positive definiteness: it succeeds exactly when the matrix is SPD.

### The condition number of a matrix
How sensitive is $x$ to small changes in $b$ or $A$? The **condition number** $\kappa(A) = \|A\|\,\|A^{-1}\|$ answers that. In the 2-norm it is the ratio of the largest to the smallest singular value; for an SPD matrix, the ratio of the largest to smallest eigenvalue. It satisfies
$$\frac{\|\Delta x\|}{\|x\|} \le \kappa(A)\frac{\|\Delta b\|}{\|b\|}.$$
Take $A = \begin{bmatrix}1 & 1\\1 & 1.0001\end{bmatrix}$ from the receipts. With $b = (2, 2.0001)$ the solution is $x = (1, 1)$. Change $b_2$ by just $0.0001$ to $2.0002$ and the solution becomes $x = (0, 2)$. Its eigenvalues are about $2.00005$ and $0.00005$, so $\kappa \approx 4 \times 10^4$. The rule of thumb from the error lesson applies: you lose about $\log_{10}\kappa$ digits. A matrix with $\kappa \approx 10^{16}$ is numerically singular in double precision.

:::def Matrix condition number
$\kappa(A) = \|A\|\,\|A^{-1}\| = \sigma_{\max}/\sigma_{\min}$ in the 2-norm. It bounds how much relative errors in the data can be amplified in the solution of $Ax = b$.
:::

### Least squares: QR instead of normal equations
When there are more equations than unknowns, we seek the least-squares solution minimizing $\|Ax - b\|^2$. The textbook route is the **normal equations** $A^TAx = A^Tb$. But $\kappa(A^TA) = \kappa(A)^2$: if $\kappa(A) = 10^6$, the normal equations have $\kappa = 10^{12}$ and lose 12 digits instead of 6. Stable software factors $A = QR$ with orthonormal $Q$ and triangular $R$, then solves $Rx = Q^Tb$, which works with $\kappa(A)$ directly. For extremely ill-conditioned problems the SVD is the safest tool.

:::warn Common mistakes
- Computing `inv(A) @ b`. Use a solver.
- Eliminating without pivoting. Tiny pivots cause disaster even when the matrix is well-conditioned.
- Confusing a small determinant with ill-conditioning. $\det(0.1I_{10}) = 10^{-10}$, but $\kappa = 1$; scaling changes the determinant, not the condition number.
- Solving least squares with the normal equations when $A$ is ill-conditioned.
:::

### Summary
Gaussian elimination factors $A = LU$ in about $\frac23n^3$ operations, after which each solve is two cheap triangular substitutions. Partial pivoting ($PA = LU$) makes it stable; Cholesky ($A = LL^T$) is twice as fast for symmetric positive definite matrices. The condition number $\kappa(A)$ limits accuracy (about $\log_{10}\kappa$ digits lost), and least squares should be solved with QR or the SVD rather than normal equations, which square $\kappa$.

@viz matrix2 preset=singular | Drag the columns of A; as the determinant approaches 0 the plane is squashed toward a line.

:::explore
**What to try**
1. Start from the singular preset: both columns lie on one line, the unit square has collapsed and $Ax = b$ has no unique solution.
2. Drag $\hat\jmath$ slightly off the line. The matrix becomes invertible but nearly singular, like the receipts matrix, and the square is a thin sliver.
3. Rotate $\hat\jmath$ until it is perpendicular to $\hat\imath$. The square becomes a healthy parallelogram: well-conditioned.

**What to notice:** in the thin-sliver state, many different inputs $x$ land almost on top of each other, so recovering $x$ from $Ax$ is sensitive to tiny errors. That is ill-conditioning. Its size is measured by the stretch ratio $\sigma_{\max}/\sigma_{\min}$, not by the determinant alone.
:::

@viz lstsq | Least squares: the line minimizing total squared error.

:::explore
**What to try**
1. Move the slope and intercept sliders to make the pink squares as small as you can, then compare with the "best possible" value.
2. Drag one point far away and watch the best line tilt toward it.

**What to notice:** the best line is the solution of an overdetermined linear system. Software finds it with a QR factorization rather than by forming $A^TA$, for the conditioning reasons in the article.
:::

:::formulas
$$PA = LU,\quad Ly = Pb,\quad Ux = y$$
$$\text{cost: } \tfrac23n^3\ \text{(LU)},\ \tfrac13n^3\ \text{(Cholesky)},\ n^2\ \text{per triangular solve}$$
$$A = LL^T\ \text{for SPD } A$$
$$\kappa(A) = \|A\|\|A^{-1}\| = \frac{\sigma_{\max}}{\sigma_{\min}},\qquad \frac{\|\Delta x\|}{\|x\|} \le \kappa(A)\frac{\|\Delta b\|}{\|b\|}$$
$$\kappa(A^TA) = \kappa(A)^2,\qquad A = QR \Rightarrow Rx = Q^Tb$$
:::

:::thm Perturbation bound for linear systems
If $Ax = b$ and $A(x + \Delta x) = b + \Delta b$ with $A$ invertible and $b \ne 0$, then $\frac{\|\Delta x\|}{\|x\|} \le \kappa(A)\frac{\|\Delta b\|}{\|b\|}$.
:::

:::proof
Subtracting the equations gives $A\Delta x = \Delta b$, so $\Delta x = A^{-1}\Delta b$ and $\|\Delta x\| \le \|A^{-1}\|\|\Delta b\|$. Also $\|b\| = \|Ax\| \le \|A\|\|x\|$, so $\frac{1}{\|x\|} \le \frac{\|A\|}{\|b\|}$. Multiplying the two inequalities gives $\frac{\|\Delta x\|}{\|x\|} \le \|A\|\|A^{-1}\|\frac{\|\Delta b\|}{\|b\|}$.
:::

:::steps Solve [[2, 1], [4, 5]] x = (3, 9) with LU
1. Multiplier $\ell_{21} = 4/2 = 2$: $L = \begin{bmatrix}1 & 0\\2 & 1\end{bmatrix}$, $U = \begin{bmatrix}2 & 1\\0 & 3\end{bmatrix}$.
2. Forward: $y_1 = 3$, $y_2 = 9 - 2(3) = 3$.
3. Back: $x_2 = 3/3 = 1$, $x_1 = (3 - 1)/2 = 1$. So $x = (1, 1)$.
:::

:::steps Cholesky factor of [[4, 2], [2, 3]]
1. $L_{11} = \sqrt{4} = 2$.
2. $L_{21} = 2/L_{11} = 1$.
3. $L_{22} = \sqrt{3 - L_{21}^2} = \sqrt2$. Check: $LL^T = \begin{bmatrix}4 & 2\\2 & 1 + 2\end{bmatrix}$.
:::

:::steps Least squares line through (0, 1), (1, 2), (2, 2)
1. $A = \begin{bmatrix}1 & 0\\1 & 1\\1 & 2\end{bmatrix}$, $b = (1, 2, 2)$; $A^TA = \begin{bmatrix}3 & 3\\3 & 5\end{bmatrix}$, $A^Tb = (5, 6)$.
2. Solve: $\det = 6$, so $(c, m) = \frac16(5\cdot5 - 3\cdot6,\ -3\cdot5 + 3\cdot6) = \left(\frac76, \frac12\right)$.
3. Best line $y = \frac76 + \frac12x$. (For a tiny well-conditioned problem the normal equations are fine; QR gives the same answer.)
:::

:::mock Exam question
Solve $\begin{bmatrix}1 & 2\\3 & 4\end{bmatrix}x = \begin{bmatrix}5\\11\end{bmatrix}$ by Gaussian elimination with partial pivoting. Give $P$, $L$, $U$ and $x$.
:::solution
The largest entry in column 1 is 3, so swap rows: $P = \begin{bmatrix}0 & 1\\1 & 0\end{bmatrix}$, giving $\begin{bmatrix}3 & 4\\1 & 2\end{bmatrix}$ and $Pb = (11, 5)$. Multiplier $\frac13$: $L = \begin{bmatrix}1 & 0\\\frac13 & 1\end{bmatrix}$, $U = \begin{bmatrix}3 & 4\\0 & 2 - \frac43\end{bmatrix} = \begin{bmatrix}3 & 4\\0 & \frac23\end{bmatrix}$. Forward: $y = (11, 5 - \frac{11}{3}) = (11, \frac43)$. Back: $x_2 = \frac{4/3}{2/3} = 2$, $x_1 = \frac{11 - 8}{3} = 1$. Check: $1 + 4 = 5$ and $3 + 8 = 11$.
:::
:::

:::ml
- **Linear regression** is least squares: libraries solve it with QR or the SVD (`numpy.linalg.lstsq`), and **ridge regression** adds $\lambda I$ to $A^TA$, which also improves its condition number.
- **Gaussian processes** need $K^{-1}y$ and $\log\det K$ for a kernel matrix $K$; both come from one Cholesky factorization, plus a small "jitter" on the diagonal to keep it numerically positive definite.
- **Sampling from a multivariate Gaussian** uses the Cholesky factor: $x = \mu + Lz$ with $z$ standard normal.
- **Newton and natural-gradient** steps solve linear systems with the Hessian or Fisher matrix.
:::

:::cs
LAPACK, the library behind NumPy, MATLAB and R, implements LU with partial pivoting, Cholesky and QR in blocked form so that most of the work is matrix-matrix multiplication, which runs near peak speed on modern CPUs and GPUs. The LINPACK benchmark used to rank the world's supercomputers is exactly a large LU solve.
:::

:::real
Structural engineers model a bridge as thousands of connected beams; the forces and displacements solve a large SPD linear system, typically by Cholesky. GPS receivers compute their position each second by solving a small least-squares system built from the distances to four or more satellites.
:::

:::quiz
? Solve 2x + y = 3, 4x + 5y = 9. What is y?
= 1
> Elimination leaves $3y = 3$.

? Roughly how does the cost of LU factorization grow with n?
- n
- n²
+ n³
> About $\frac23n^3$ operations.

? Condition number (2-norm) of diag(10, 0.1)?
= 100
> $\sigma_{\max}/\sigma_{\min} = 10/0.1$.

? If κ(A) = 10⁴, what is κ(AᵀA)?
= 100000000|1e8
> Normal equations square the condition number.

? Why do solvers use partial pivoting?
+ To avoid dividing by tiny pivots that amplify rounding errors
- To make the matrix symmetric
- To compute the inverse
> Large multipliers from small pivots destroy accuracy.

? Cholesky factorization A = LLᵀ requires A to be:
- Diagonal
+ Symmetric positive definite
- Upper triangular
> It succeeds exactly for SPD matrices.
:::

## Lesson: Iterative methods and power iteration {#iterative-methods}
@summary: Jacobi, Gauss–Seidel and conjugate gradients for huge sparse systems, and power iteration for the dominant eigenvector.

### When direct methods are too expensive
LU factorization costs about $\frac23n^3$ operations. For $n = 1000$ that is under a billion, a fraction of a second. For a million unknowns, which is routine in simulations, image processing and graph problems, it is about $7 \times 10^{17}$ operations and terabytes of memory. Yet such matrices are usually **sparse**: each row has only a handful of nonzero entries, because each unknown interacts with only a few neighbours. **Iterative methods** exploit this. They start from a guess and improve it using only matrix-vector products, which cost just a few operations per nonzero. A good iterative method reaches useful accuracy long before a direct method would finish.

### An everyday scenario
Imagine a row of houses where everyone wants their thermostat set to the average of their neighbours' plus a small personal adjustment. Nobody can compute the final settings directly, but each evening every household looks at its neighbours' current settings and updates its own. Day by day the settings stop changing: they have converged to the solution of a linear system, without anyone ever writing the system down. This is the **Jacobi method**. If households update one at a time, each using the newest values of the neighbours who already updated, that is **Gauss–Seidel**, and it usually settles faster.

### The Jacobi method
Write the equations so that each one solves for its own diagonal unknown. For the system
$$4x + y = 9,\qquad x + 3y = 5,$$
whose solution is $x = 2$, $y = 1$, rewrite as $x = \frac{9 - y}{4}$ and $y = \frac{5 - x}{3}$. Jacobi plugs the *old* values into the right sides. From $(0, 0)$: $(x_1, y_1) = (2.25, 1.667)$, then $(1.833, 0.917)$, then $(2.021, 1.056)$. The iterates circle in on $(2, 1)$, the error shrinking by a factor of about $0.29$ each step.

### Gauss–Seidel
Gauss–Seidel uses each new value as soon as it is available. From $(0, 0)$: $x_1 = 2.25$, then immediately $y_1 = \frac{5 - 2.25}{3} = 0.917$. Next $x_2 = \frac{9 - 0.917}{4} = 2.021$, $y_2 = \frac{5 - 2.021}{3} = 0.993$. Then $x_3 = 2.0017$, $y_3 = 0.9994$. For this system each step cuts the error by about $\frac{1}{12} \approx 0.083$, the square of Jacobi's factor. It also needs only one copy of the solution vector in memory.

:::def Iterative method
A method that produces a sequence of approximations $x^{(0)}, x^{(1)}, \ldots$ converging to the solution of $Ax = b$, typically using only matrix-vector products. Examples: Jacobi, Gauss–Seidel, conjugate gradient.
:::

### When do they converge?
Both methods have the form $x^{(k+1)} = Gx^{(k)} + c$ for an **iteration matrix** $G$. The error obeys $e^{(k+1)} = Ge^{(k)}$, so it shrinks to zero for every starting guess exactly when the **spectral radius** $\rho(G)$, the largest absolute eigenvalue of $G$, is less than 1. Then the error falls roughly by a factor $\rho(G)$ per step. For Jacobi on our system, $G = \begin{bmatrix}0 & -\frac14\\-\frac13 & 0\end{bmatrix}$, whose eigenvalues are $\pm\sqrt{1/12} \approx \pm0.289$. A simple sufficient condition is **strict diagonal dominance**: each diagonal entry is larger in absolute value than the sum of the others in its row ($4 > 1$ and $3 > 1$ here).

:::def Spectral radius
$\rho(G) = \max|\lambda_i(G)|$, the largest absolute eigenvalue. A stationary iteration $x \leftarrow Gx + c$ converges for every start if and only if $\rho(G) < 1$.
:::

### Conjugate gradients
For symmetric positive definite systems the star method is **conjugate gradients** (CG). Solving $Ax = b$ is the same as minimizing the quadratic $\frac12x^TAx - b^Tx$, whose gradient is $Ax - b$. Plain gradient descent zig-zags down narrow valleys. CG instead chooses each new search direction to be "conjugate" to all the previous ones, so it never undoes earlier progress. In exact arithmetic it finds the exact solution in at most $n$ steps, and in practice it gets a good answer far sooner. Its error shrinks by about $\frac{\sqrt\kappa - 1}{\sqrt\kappa + 1}$ per step, compared with $\frac{\kappa - 1}{\kappa + 1}$ for gradient descent with the best fixed step. With $\kappa = 100$, that is $0.82$ per step for CG versus $0.98$ for gradient descent. **Preconditioning**, multiplying by an easy approximation of $A^{-1}$ to reduce $\kappa$, makes CG faster still.

### Power iteration for eigenvectors
The same idea of repeated multiplication finds eigenvectors. **Power iteration** starts from any vector and repeatedly multiplies by $A$ and rescales. Each multiplication stretches the component along the dominant eigenvector more than the others, so the direction converges to it. Take $A = \begin{bmatrix}2 & 1\\1 & 2\end{bmatrix}$, with eigenvalues 3 and 1 and dominant eigenvector $(1, 1)$. From $(1, 0)$: $(2, 1)$, $(5, 4)$, $(14, 13)$, $(41, 40)$. The entries quickly become nearly equal. The **Rayleigh quotient** $\frac{x^TAx}{x^Tx}$ estimates the eigenvalue: for $x = (14, 13)$ it is $\frac{1094}{365} \approx 2.997$. The error shrinks by the ratio $|\lambda_2/\lambda_1| = \frac13$ per step, so close eigenvalues mean slow convergence.

:::def Power iteration
The iteration $x_{k+1} = Ax_k/\|Ax_k\|$, which converges to the eigenvector of the largest-magnitude eigenvalue when that eigenvalue is strictly dominant, at rate $|\lambda_2/\lambda_1|$.
:::

:::warn Common mistakes
- Running Jacobi or Gauss–Seidel on a matrix with $\rho(G) \ge 1$. The iterates diverge; check diagonal dominance or use CG or GMRES.
- Using CG on a matrix that isn't symmetric positive definite.
- Stopping when consecutive iterates are close rather than checking the residual $\|b - Ax\|$.
- Forgetting to normalize in power iteration, so the numbers overflow or underflow.
:::

### Summary
Iterative methods solve huge sparse systems with matrix-vector products. Jacobi updates every unknown from old values; Gauss–Seidel uses new values immediately and is often twice as fast. Stationary methods converge if and only if the spectral radius of the iteration matrix is below 1, which diagonal dominance guarantees. Conjugate gradients solve SPD systems at a rate set by $\sqrt\kappa$, and power iteration finds the dominant eigenvector at rate $|\lambda_2/\lambda_1|$.

@viz eigen a=2 b=1 c=1 d=2 | Rotate x until Ax lies along x; power iteration finds the dominant one automatically.

:::explore
**What to try**
1. With $A = \begin{bmatrix}2 & 1\\1 & 2\end{bmatrix}$, drag x around the circle until the widget reports an eigenvector. You should find the direction $(1, 1)$ with $\lambda = 3$ and $(1, -1)$ with $\lambda = 1$.
2. Put x at $(1, 0)$ and note where $Ax = (2, 1)$ points. Now move x to that direction: $Ax$ moves even closer to $(1, 1)$. You are doing power iteration by hand.
3. Change $d$ so the two eigenvalues get closer together and repeat step 2; each step gains less.

**What to notice:** repeatedly applying $A$ pulls every direction toward the dominant eigenvector, faster when $|\lambda_2/\lambda_1|$ is small. That ratio is the convergence rate from the article.
:::

@viz gd surface=ravine lr=0.2 | Gradient descent on an ill-conditioned quadratic: the zig-zag that conjugate gradients avoid.

:::explore
**What to try**
1. Run with the default learning rate and watch the path bounce across the narrow valley while crawling along it.
2. Lower the learning rate: the bouncing stops but progress along the valley becomes very slow.

**What to notice:** the curvatures are 0.4 and 8, a condition number of 20. Gradient descent's speed is limited by $\kappa$, while conjugate gradients would reach the minimum of this two-dimensional quadratic in exactly 2 steps.
:::

:::formulas
$$\text{Jacobi: } x_i^{(k+1)} = \frac{1}{a_{ii}}\Big(b_i - \sum_{j \ne i}a_{ij}x_j^{(k)}\Big)$$
$$\text{Gauss–Seidel: } x_i^{(k+1)} = \frac{1}{a_{ii}}\Big(b_i - \sum_{j < i}a_{ij}x_j^{(k+1)} - \sum_{j > i}a_{ij}x_j^{(k)}\Big)$$
$$e^{(k+1)} = Ge^{(k)},\quad \text{converges} \iff \rho(G) < 1$$
$$\text{CG rate} \approx \frac{\sqrt\kappa - 1}{\sqrt\kappa + 1},\qquad \text{GD rate} \approx \frac{\kappa - 1}{\kappa + 1}$$
$$x_{k+1} = \frac{Ax_k}{\|Ax_k\|},\qquad \lambda \approx \frac{x^TAx}{x^Tx}$$
:::

:::thm Jacobi converges for strictly diagonally dominant matrices
If $|a_{ii}| > \sum_{j \ne i}|a_{ij}|$ for every row $i$, the Jacobi iteration converges to the solution of $Ax = b$ from any starting vector.
:::

:::proof
The Jacobi iteration matrix has entries $G_{ij} = -a_{ij}/a_{ii}$ for $j \ne i$ and $G_{ii} = 0$. Its row-sum norm is $\|G\|_\infty = \max_i\sum_{j \ne i}\frac{|a_{ij}|}{|a_{ii}|} < 1$. Since $e^{(k+1)} = Ge^{(k)}$, we get $\|e^{(k)}\|_\infty \le \|G\|_\infty^k\|e^{(0)}\|_\infty \to 0$.
:::

:::thm Convergence of power iteration
If $A$ has eigenvalues $|\lambda_1| > |\lambda_2| \ge \cdots$ with a full set of eigenvectors $v_i$, and the start $x_0$ has a nonzero component along $v_1$, then the direction of $A^kx_0$ converges to $v_1$, with error proportional to $|\lambda_2/\lambda_1|^k$.
:::

:::proof
Write $x_0 = c_1v_1 + c_2v_2 + \cdots$ with $c_1 \ne 0$. Then $A^kx_0 = \lambda_1^k\big(c_1v_1 + c_2(\lambda_2/\lambda_1)^kv_2 + \cdots\big)$. Every ratio $(\lambda_i/\lambda_1)^k$ for $i \ge 2$ tends to 0 at least as fast as $|\lambda_2/\lambda_1|^k$, so after rescaling only the $v_1$ term survives.
:::

:::steps Two Jacobi steps for 4x + y = 9, x + 3y = 5 from (0, 0)
1. Step 1: $x = 9/4 = 2.25$, $y = 5/3 \approx 1.667$.
2. Step 2: $x = (9 - 1.667)/4 \approx 1.833$, $y = (5 - 2.25)/3 \approx 0.917$.
3. The exact solution is $(2, 1)$; the error went from $(2, 1)$ to about $(0.25, 0.67)$ to $(0.17, 0.08)$.
:::

:::steps Spectral radius of the Jacobi iteration matrix for the same system
1. $G = \begin{bmatrix}0 & -1/4\\-1/3 & 0\end{bmatrix}$.
2. $\det(G - \lambda I) = \lambda^2 - \frac{1}{12} = 0$, so $\lambda = \pm\frac{1}{\sqrt{12}}$.
3. $\rho(G) \approx 0.289 < 1$: Jacobi converges, gaining about half a digit per step. Gauss–Seidel's rate here is $\rho^2 = \frac{1}{12}$.
:::

:::mock Exam question
Apply power iteration to $A = \begin{bmatrix}4 & 1\\2 & 3\end{bmatrix}$ from $x_0 = (1, 0)$, scaling so the first entry is 1 after each step. (a) Do three steps. (b) Estimate the dominant eigenvalue. (c) The eigenvalues are 5 and 2; how fast does the error shrink?
:::solution
(a) $Ax_0 = (4, 2) \to x_1 = (1, 0.5)$. $Ax_1 = (4.5, 3.5) \to x_2 = (1, 0.778)$. $Ax_2 = (4.778, 4.333) \to x_3 = (1, 0.907)$. The direction approaches $(1, 1)$. (b) The scale factors 4, 4.5, 4.78 approach 5; indeed $A(1, 1) = (5, 5)$. (c) The error shrinks by about $|\lambda_2/\lambda_1| = \frac25 = 0.4$ per step: check $1 - 0.5 = 0.5$, $1 - 0.778 = 0.222$, $1 - 0.907 = 0.093$, ratios about 0.44 and 0.42, tending to 0.4.
:::
:::

:::ml
- **PageRank** is power iteration on the web's link matrix: the dominant eigenvector gives each page's importance.
- **Spectral normalization** in GANs estimates each weight matrix's largest singular value with one step of power iteration per training step.
- **PCA on huge datasets** uses Lanczos or randomized methods, sophisticated relatives of power iteration, to find the top eigenvectors of the covariance matrix.
- **Hessian-free optimization and Gaussian processes** solve large SPD systems with preconditioned conjugate gradients, using only Hessian-vector or kernel-vector products.
:::

:::cs
Simulations of heat flow, electric fields and fluids produce sparse systems with millions of unknowns, solved by preconditioned CG, GMRES or multigrid. Multigrid applies a few Gauss–Seidel sweeps on grids of several resolutions and can solve such systems in time proportional to the number of unknowns.
:::

:::real
Search engines rank pages, and social networks rank influential accounts, with eigenvector computations performed by power-iteration-style algorithms on graphs with billions of nodes, where a direct method would be impossible.
:::

:::quiz
? First Jacobi step for 4x + y = 9 from (x, y) = (0, 0): what is x?
= 2.25|9/4
> $x = (9 - 0)/4$.

? A stationary iteration converges for every start exactly when the spectral radius of G is:
- Greater than 1
+ Less than 1
- Equal to 1
> The error is multiplied by $G$ each step.

? Power iteration on a matrix with eigenvalues 3 and 1: by what factor does the error shrink per step?
= 1/3|0.333
> $|\lambda_2/\lambda_1| = \frac13$.

? Is the matrix [[4, 1], [1, 3]] strictly diagonally dominant?
+ Yes
- No
> $4 > 1$ and $3 > 1$.

? In exact arithmetic, conjugate gradients solves an n × n SPD system in at most how many steps?
- 1
+ n
- n³
> Each step eliminates the error along a new conjugate direction.

? Rayleigh quotient xᵀAx / xᵀx for A = [[2, 1], [1, 2]] and x = (1, 1)?
= 3
> $Ax = (3, 3)$, so $\frac{6}{2} = 3$.
:::

# Unit: Randomness as a tool

## Lesson: Monte Carlo methods {#monte-carlo}
@summary: Estimating integrals and expectations by averaging random samples, the 1/√n error law, variance reduction and importance sampling.

### Using randomness to compute
It sounds backwards to use randomness to get a precise answer, but it is one of the most powerful ideas in computing. **Monte Carlo methods** estimate a quantity by simulating many random samples and averaging. They were developed in the 1940s by Stanislaw Ulam and John von Neumann while working on nuclear physics, and named after the Monte Carlo casino. Today they price financial options, render the lighting in animated films, quantify risk, fit Bayesian models and train neural networks: every stochastic gradient is a Monte Carlo estimate. Their great strength is that their accuracy does not get worse as the number of dimensions grows, which is exactly where the grid methods of the quadrature lesson fail.

### An everyday scenario
Imagine you want to know the area of an oddly shaped lake on a map. You put the map inside a 1 km by 1 km square and throw 1000 darts at random, uniformly over the square. If 300 darts land in the lake, a sensible estimate of its area is $\frac{300}{1000}\times1 = 0.3$ km². You never needed a formula for the lake's outline, only the ability to check whether a point is inside it. Throw more darts and the estimate gets better. How much better, and how fast, is the main question of this lesson.

### Estimating π with darts
Let's make the darts concrete. Pick points $(x, y)$ uniformly in the unit square $[0, 1]^2$. The quarter-disc $x^2 + y^2 \le 1$ has area $\frac\pi4 \approx 0.785$, so about 78.5% of the points land inside it. If $k$ of $n$ points land inside, then $\frac kn \approx \frac\pi4$ and $\pi \approx \frac{4k}{n}$. With $n = 1000$ and $k = 785$ we would get $3.140$; a typical run gives something like $3.10$ or $3.18$. It works, but slowly, as we'll see.

### The general recipe
Most quantities of interest can be written as an **expected value** $\mu = E[f(X)]$ of some function of a random variable $X$. An integral $\int_0^1 g(x)\,dx$ is $E[g(U)]$ with $U$ uniform on $[0, 1]$, and the darts estimate is $E[\mathbf 1\{\text{inside}\}]$. The **Monte Carlo estimator** draws independent samples $X_1, \ldots, X_n$ and averages:
$$\hat\mu_n = \frac1n\sum_{i=1}^n f(X_i).$$
For $\int_0^1 x^2\,dx = \frac13$ with three random points $0.2$, $0.5$ and $0.9$, the estimate is $\frac{0.04 + 0.25 + 0.81}{3} \approx 0.367$. With thousands of points it would be close to $0.333$.

:::def Monte Carlo estimator
$\hat\mu_n = \frac1n\sum_{i=1}^n f(X_i)$ for independent samples $X_i$, an estimate of $\mu = E[f(X)]$. It is unbiased, and the law of large numbers guarantees $\hat\mu_n \to \mu$.
:::

### Why it works, and how accurate it is
Two theorems from probability do the work. The **law of large numbers** says the average of independent samples converges to the expected value, so the estimate is consistent. Its **variance** tells us how far off it typically is. Each sample has variance $\sigma^2 = \text{Var}(f(X))$, and averaging $n$ independent ones divides the variance by $n$:
$$\text{Var}(\hat\mu_n) = \frac{\sigma^2}{n},\qquad \text{standard error} = \frac{\sigma}{\sqrt n}.$$
The **central limit theorem** adds that the error is approximately normal, so a 95% confidence interval is $\hat\mu_n \pm 1.96\frac{\hat\sigma}{\sqrt n}$, using the sample standard deviation $\hat\sigma$. Monte Carlo doesn't just give an answer; it tells you how much to trust it.

For the π darts, each sample is $4$ or $0$ with $P(4) = p = \frac\pi4$, so $\sigma = 4\sqrt{p(1 - p)} \approx 4(0.41) = 1.64$. With $n = 1000$ the standard error is $\frac{1.64}{\sqrt{1000}} \approx 0.052$, which is why runs land around $3.14 \pm 0.1$. With $n = 100{,}000$ it is about $0.005$.

### The square-root law
The error falls like $\frac{1}{\sqrt n}$. That is slow: **to halve the error you need four times as many samples, and to gain one more decimal digit you need a hundred times as many.** Simpson's rule in one dimension gains four digits when you multiply the points by ten. So for smooth one-dimensional integrals, Monte Carlo is a poor choice. But the rate $\frac{\sigma}{\sqrt n}$ does not depend on the dimension at all. For an integral over 100 dimensions, a grid with only 2 points per axis needs $2^{100}$ evaluations, while Monte Carlo with a million samples still gives an error of about $\frac{\sigma}{1000}$. In high dimensions Monte Carlo is often the only option.

:::def Standard error
The standard deviation of an estimator; for a Monte Carlo average of $n$ independent samples it is $\sigma/\sqrt n$.
:::

### Variance reduction
Since the error is $\frac{\sigma}{\sqrt n}$, we can improve it either by increasing $n$ or by decreasing $\sigma$. Reducing $\sigma$ is often far cheaper. **Antithetic sampling** pairs each sample $U$ with $1 - U$, so that errors partly cancel. **Control variates** subtract a correlated quantity whose expectation is known exactly. **Stratified sampling** splits the domain into pieces and samples each one, so no region is accidentally missed. A tenfold reduction in $\sigma$ is worth a hundredfold increase in samples.

### Importance sampling
Some expectations are dominated by rare events. The probability that a standard normal exceeds 4 is about $3.2 \times 10^{-5}$; with plain sampling you would see about 3 such events in 100,000 draws, giving a very noisy estimate. **Importance sampling** draws from a different distribution $q$ that produces the important region more often, then corrects with weights:
$$E_p[f(X)] = E_q\left[f(X)\frac{p(X)}{q(X)}\right] \approx \frac1n\sum_{i=1}^n f(X_i)\frac{p(X_i)}{q(X_i)},\quad X_i \sim q.$$
Sampling from a normal centred at 4 makes about half the draws land beyond 4, and the weights $\frac{p}{q}$ shrink each contribution to the right size. A good $q$ can reduce variance by many orders of magnitude; a bad one, with lighter tails than $p$, can make it infinite.

### Markov chain Monte Carlo
Sometimes we can't sample from the distribution directly, for example a Bayesian posterior known only up to a constant. **Markov chain Monte Carlo** (MCMC) builds a random walk whose long-run distribution is the target, such as the Metropolis algorithm, which proposes a move and accepts it with probability $\min(1, \frac{p(\text{new})}{p(\text{old})})$. Averages along the walk then estimate expectations, at the cost of samples that are correlated rather than independent.

:::warn Common mistakes
- Reporting a Monte Carlo estimate without its standard error.
- Expecting doubling the samples to halve the error. It reduces it by only $\sqrt2$.
- Using a poor random number generator, or reusing the same seed by accident across experiments.
- Choosing an importance distribution with lighter tails than the target, which can give huge or infinite variance.
:::

### Summary
Monte Carlo methods write the target as an expectation and estimate it by averaging $n$ independent random samples. The estimate is unbiased, converges by the law of large numbers, and has standard error $\sigma/\sqrt n$ regardless of dimension, with confidence intervals from the central limit theorem. Variance reduction and importance sampling shrink $\sigma$; MCMC handles distributions that can't be sampled directly.

@viz lln p=0.785 | Each run is a running average of random 0/1 outcomes, like darts landing inside the quarter-circle.

:::explore
**What to try**
1. With the true probability set to 0.785 (the quarter-circle's share, $\frac\pi4$), press **Flip 1000 × 5 runs**. Each line is the running fraction of hits; multiply by 4 for an estimate of π.
2. Look at how far the five runs spread after 10, 100 and 1000 flips. The spread shrinks, but slowly.
3. Compare the spread at 100 and at 400 flips: it should be roughly halved, since $\sqrt{400/100} = 2$.
4. Set the probability to 0.5 and then 0.05. The relative spread for 0.05 is much larger: rare events are hard to estimate, the motivation for importance sampling.

**What to notice:** every run converges (law of large numbers), but the funnel narrows like $\frac{1}{\sqrt n}$. Getting one more digit requires 100 times as many flips, exactly the square-root law from the article.
:::

@viz clt | Averages of random samples look normal, which is what justifies Monte Carlo confidence intervals.

:::explore
**What to try**
1. Choose the exponential population, which is very skewed, and set the sample size to 1. The histogram is skewed.
2. Raise the sample size to 30 and resample. The histogram of averages becomes a bell curve, and narrower.

**What to notice:** the width of the bell shrinks like $\frac{\sigma}{\sqrt n}$, and its normal shape is why $\hat\mu \pm 1.96\,\frac{\hat\sigma}{\sqrt n}$ is a valid 95% interval for a Monte Carlo estimate.
:::

:::formulas
$$\hat\mu_n = \frac1n\sum_{i=1}^n f(X_i),\qquad E[\hat\mu_n] = \mu$$
$$\text{Var}(\hat\mu_n) = \frac{\sigma^2}{n},\qquad \text{SE} = \frac{\sigma}{\sqrt n}$$
$$95\%\ \text{CI: } \hat\mu_n \pm 1.96\frac{\hat\sigma}{\sqrt n}$$
$$\int_0^1 g(x)\,dx \approx \frac1n\sum g(U_i),\qquad \pi \approx \frac{4k}{n}$$
$$E_p[f] = E_q\left[f\frac pq\right]\ \text{(importance sampling)}$$
:::

:::thm Unbiasedness and variance of the Monte Carlo estimator
If $X_1, \ldots, X_n$ are independent with the same distribution as $X$, and $\text{Var}(f(X)) = \sigma^2 < \infty$, then $E[\hat\mu_n] = E[f(X)]$ and $\text{Var}(\hat\mu_n) = \sigma^2/n$.
:::

:::proof
By linearity of expectation, $E[\hat\mu_n] = \frac1n\sum E[f(X_i)] = \frac1n\cdot n\mu = \mu$. Variances of independent variables add, and $\text{Var}(cY) = c^2\text{Var}(Y)$, so $\text{Var}(\hat\mu_n) = \frac{1}{n^2}\sum\text{Var}(f(X_i)) = \frac{1}{n^2}\cdot n\sigma^2 = \frac{\sigma^2}{n}$.
:::

:::thm Unbiasedness of importance sampling
If $q(x) > 0$ wherever $f(x)p(x) \ne 0$, then $E_q\left[f(X)\frac{p(X)}{q(X)}\right] = E_p[f(X)]$.
:::

:::proof
$E_q\left[f\frac pq\right] = \int f(x)\frac{p(x)}{q(x)}q(x)\,dx = \int f(x)p(x)\,dx = E_p[f]$. The condition on $q$ ensures no part of the integral is lost.
:::

:::steps Standard error of the π estimate with n = 10,000 darts
1. Each sample is $4\cdot\mathbf 1\{\text{inside}\}$ with $p = \frac\pi4 \approx 0.785$.
2. $\sigma = 4\sqrt{p(1 - p)} \approx 4\sqrt{0.785 \times 0.215} \approx 4(0.411) \approx 1.64$.
3. $\text{SE} = \frac{1.64}{\sqrt{10000}} = 0.0164$, so a 95% interval is about $\pm0.032$.
:::

:::steps Variance of the estimate of ∫₀¹ x² dx with 10,000 uniform samples
1. $\sigma^2 = \text{Var}(U^2) = E[U^4] - (E[U^2])^2 = \frac15 - \frac19 = \frac{4}{45} \approx 0.0889$.
2. $\sigma \approx 0.298$.
3. $\text{SE} = \frac{0.298}{100} \approx 0.003$: the estimate is typically within about $0.003$ of $\frac13$.
:::

:::steps How many samples to cut the error by a factor of 10?
1. $\text{SE} \propto \frac{1}{\sqrt n}$, so dividing the SE by 10 requires $\sqrt n$ to grow by 10.
2. $n$ must grow by $10^2 = 100$.
3. Going from 1,000 to 100,000 samples gains one decimal digit.
:::

:::mock Exam question
You estimate the probability that two dice sum to at least 10 by simulating 3600 rolls. (a) What is the exact probability? (b) What is the standard error of the estimate? (c) How many rolls would give a standard error of about 0.001?
:::solution
(a) Sums 10, 11, 12 occur in $3 + 2 + 1 = 6$ of 36 outcomes, so $p = \frac16$. (b) Each roll is a 0/1 indicator with variance $p(1 - p) = \frac16\cdot\frac56 = \frac{5}{36}$, so $\text{SE} = \sqrt{\frac{5/36}{3600}} = \frac{\sqrt5}{360} \approx 0.0062$. A 95% interval is about $\pm0.012$. (c) Need $\sqrt{\frac{5/36}{n}} = 0.001$, so $n = \frac{5/36}{10^{-6}} \approx 138{,}900$ rolls.
:::
:::

:::ml
- **Stochastic gradient descent:** a minibatch gradient is a Monte Carlo estimate of the full-data gradient, unbiased with variance shrinking like $\frac{1}{\text{batch size}}$. That is why doubling the batch does not halve the noise.
- **VAEs and the reparameterization trick** estimate the expected reconstruction loss with a few samples $z = \mu + \sigma\epsilon$.
- **Policy gradients** (REINFORCE) in reinforcement learning are Monte Carlo estimates, and baselines are control variates.
- **MC dropout and deep ensembles** estimate predictive uncertainty by averaging several stochastic forward passes; **Bayesian inference** uses MCMC (for example Hamiltonian Monte Carlo in Stan) to sample posteriors.
:::

:::cs
**Monte Carlo tree search** chooses moves in games by playing many random continuations and averaging the outcomes; combined with neural networks it powered AlphaGo. **Randomized algorithms** such as randomized quicksort, hashing and the Miller–Rabin primality test use the same principle: randomness makes bad cases unlikely.
:::

:::real
Banks price complex options and estimate risk by simulating thousands of possible futures for interest rates and stock prices and averaging the payoffs. Animated films render light with **path tracing**, which follows millions of random light rays per frame; the grainy noise in an early render is Monte Carlo error that fades like $\frac{1}{\sqrt n}$ as more rays are added.
:::

:::quiz
? 1000 random darts in the unit square, 780 inside the quarter-circle. Estimate of π?
= 3.12|78/25
> $4 \times 0.78 = 3.12$.

? To halve the Monte Carlo standard error you need how many times as many samples?
= 4
> $\text{SE} \propto 1/\sqrt n$, so $\sqrt n$ must double.

? Each sample has standard deviation 2 and n = 400. What is the standard error?
= 0.1|1/10
> $2/\sqrt{400} = 2/20$.

? Three uniform samples on [0, 1] give f-values 1, 2 and 3. What is the Monte Carlo estimate of ∫₀¹ f(x) dx?
= 2
> The average of the function values: $6/3$.

? How does the Monte Carlo error rate depend on the dimension of the integral?
+ It doesn't: the rate is σ/√n in any dimension
- It grows exponentially with dimension
- It is σ/n in one dimension and σ/√n in two
> Only $\sigma$ may change with dimension; the $1/\sqrt n$ rate does not.

? What is importance sampling mainly used for?
- Making estimates biased on purpose
+ Reducing variance, especially for rare events
- Avoiding random numbers
> Sample where it matters and reweight by $p/q$.
:::
