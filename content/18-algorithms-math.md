---
id: algorithms-math
title: Mathematics of Algorithms
tagline: How to measure, predict and prove how fast an algorithm runs and why it is correct.
desc: The mathematical toolkit of algorithm analysis. Asymptotic notation, summations for loops, recurrences solved by substitution, recursion trees and the master theorem, divide and conquer, the n log n lower bound for sorting, amortized analysis, probabilistic analysis and randomized algorithms, the mathematics of dynamic programming, exchange-argument proofs for greedy algorithms, and an introduction to P, NP and NP-completeness.
color: #f97316
symbol: O
area: CS theory
paths: cs
order: 18
---

# Unit: Measuring growth

## Lesson: Asymptotic notation: Big-O, Big-Omega and Big-Theta {#asymptotic-notation}
@summary: Describing how running time grows with input size while ignoring constant factors: the precise definitions of O, Ω and Θ, how to prove them with constants, the limit test, and the standard growth hierarchy.

### Why not just time the program?
Suppose two programmers each write a program to sort a list. On a list of 1000 numbers, the first program takes 2 milliseconds and the second takes 5. Is the first one better? Not necessarily. Run them on a million numbers and the first might take 30 minutes while the second takes one second. The timing on one input tells you little, because it depends on the computer, the programming language, and above all on the *size* of the input. What we really want to know is how the cost **grows** as the input gets bigger.

So we count basic steps (comparisons, additions, memory reads) as a function $T(n)$ of the input size $n$, and then ask about the *shape* of that function for large $n$. If $T(n) = 3n^2 + 5n + 2$, then for $n = 1000$ the $3n^2$ term is 3,000,000 while $5n + 2$ is only 5002. The lower-order terms barely matter, and the constant 3 depends on details like how we count steps. What matters is that the cost grows like $n^2$: double the input and the work roughly quadruples. Asymptotic notation is the precise language for saying this.

### Big-O: an upper bound
:::def Big-O
$f(n) = O(g(n))$ means there are constants $c > 0$ and $n_0$ such that $f(n) \le c\, g(n)$ for all $n \ge n_0$. In words: eventually, $f$ is at most a constant multiple of $g$.
:::

Think of $g$ as a ceiling: past some point, $f$ never rises above $c$ times that ceiling. Let us prove $3n^2 + 5n + 2 = O(n^2)$. For $n \ge 1$ we have $5n \le 5n^2$ and $2 \le 2n^2$, so $3n^2 + 5n + 2 \le 3n^2 + 5n^2 + 2n^2 = 10n^2$. So $c = 10$ and $n_0 = 1$ work. Any constants that work are fine; we do not need the smallest ones.

Big-O is only an upper bound, so it is also true that $3n^2 + 5n + 2 = O(n^3)$, just less informative. And $n^2 \ne O(n)$: for any constant $c$, $n^2 \le cn$ fails as soon as $n > c$.

### Big-Omega and Big-Theta
:::def Big-Omega
$f(n) = \Omega(g(n))$ means there are constants $c > 0$ and $n_0$ such that $f(n) \ge c\, g(n)$ for all $n \ge n_0$: eventually $f$ is at least a constant multiple of $g$.
:::

:::def Big-Theta
$f(n) = \Theta(g(n))$ means $f(n) = O(g(n))$ and $f(n) = \Omega(g(n))$: there are constants $c_1, c_2 > 0$ and $n_0$ with $c_1 g(n) \le f(n) \le c_2 g(n)$ for all $n \ge n_0$.
:::

Since $3n^2 + 5n + 2 \ge 3n^2$ for all $n \ge 1$, it is $\Omega(n^2)$ with $c = 3$. Combined with the upper bound, $3n^2 + 5n + 2 = \Theta(n^2)$: it is sandwiched between $3n^2$ and $10n^2$. Big-Theta is the "tight" statement, and it is what people usually mean informally when they say "this algorithm is $O(n^2)$".

There are also strict versions: $f = o(g)$ ("little-o") means $f / g \to 0$, so $f$ grows strictly slower, like $n = o(n^2)$. And $f = \omega(g)$ means $f/g \to \infty$.

### The limit test
Finding constants by hand is fine for polynomials, but limits are often quicker. If $\lim_{n \to \infty} f(n)/g(n) = L$ exists, then:
- if $0 < L < \infty$, $f = \Theta(g)$;
- if $L = 0$, $f = O(g)$ but not $\Theta(g)$ (in fact $f = o(g)$);
- if $L = \infty$, $f = \Omega(g)$ but not $\Theta(g)$.

For example $\lim \frac{n \log_2 n}{n^2} = \lim \frac{\log_2 n}{n} = 0$, so $n \log n$ grows strictly slower than $n^2$. And $\lim \frac{n^{100}}{2^n} = 0$ (any polynomial loses to any exponential with base above 1, which you can show by repeated L'Hôpital or by noting each increase of $n$ by 1 doubles the denominator but multiplies the numerator by only $(1 + 1/n)^{100} \to 1$).

### The growth hierarchy
The common functions, from slowest to fastest growing, are
$$1 \;<\; \log n \;<\; \sqrt{n} \;<\; n \;<\; n \log n \;<\; n^2 \;<\; n^3 \;<\; 2^n \;<\; n! \;<\; n^n,$$
where each is $o$ of the next. To feel the difference: with $n = 1{,}000{,}000$ and a computer doing $10^9$ steps per second, $n \log_2 n \approx 2 \times 10^7$ steps take 0.02 seconds, $n^2 = 10^{12}$ steps take about 17 minutes, and $2^n$ steps would take far longer than the age of the universe.

A few useful facts. The base of a logarithm does not matter inside $O$: $\log_2 n = \frac{\ln n}{\ln 2}$, a constant multiple of $\ln n$, so we just write $\log n$. The same is not true of exponentials: $4^n = (2^n)^2$ is not $O(2^n)$. Constant factors in exponents matter too: $2^{n+1} = 2 \cdot 2^n = \Theta(2^n)$, but $2^{2n} = 4^n$ is not. A polynomial of degree $k$ with positive leading coefficient is $\Theta(n^k)$. And $\log(n!) = \Theta(n \log n)$, a fact we will need for the sorting lower bound.

### Rules for combining
If $f_1 = O(g_1)$ and $f_2 = O(g_2)$, then $f_1 + f_2 = O(\max(g_1, g_2))$ and $f_1 f_2 = O(g_1 g_2)$. So code that runs an $O(n)$ loop followed by an $O(n^2)$ loop is $O(n^2)$ in total, and an $O(n)$ loop whose body costs $O(\log n)$ is $O(n \log n)$.

### Best, worst and average case
An algorithm's running time usually depends on *which* input of size $n$ it gets, not only on $n$. Searching a list for a value from left to right takes 1 step if the value is first and $n$ steps if it is last or missing. So we define the **worst-case** time $T_{\text{worst}}(n)$ as the maximum number of steps over all inputs of size $n$, the **best case** as the minimum, and the **average case** as the expected number of steps when inputs are drawn from some distribution. For linear search, the worst case is $n$, the best case is 1, and if the target is equally likely to be in any of the $n$ positions the average is $\frac{1 + 2 + \cdots + n}{n} = \frac{n+1}{2}$, still $\Theta(n)$. Worst-case bounds are the most common because they are guarantees: no input can do worse. When someone says "binary search is $O(\log n)$", they mean its worst case grows at most logarithmically. Each of the three is a separate function of $n$, and each can be described with $O$, $\Omega$ or $\Theta$.

### Common mistakes
"$f = O(g)$" is a one-way statement, not an equation: $n = O(n^2)$ is true, but $n^2 = O(n)$ is false, so you cannot swap sides. Big-O is not the same as "worst case": $O$, $\Omega$ and $\Theta$ are statements about functions, and you can apply any of them to the worst-case, best-case or average-case running time. Finally, asymptotic notation hides constants, which matter in practice for small inputs: an algorithm costing $1000n$ is slower than one costing $n^2$ for every $n < 1000$.

### Summary
We measure algorithms by how their step count $T(n)$ grows. $O$ gives an eventual upper bound up to a constant factor, $\Omega$ an eventual lower bound, and $\Theta$ both. Prove bounds by exhibiting constants $c$ and $n_0$, or with the limit of $f/g$. Lower-order terms and constant factors disappear, log bases do not matter, and the hierarchy $1 < \log n < \sqrt n < n < n\log n < n^2 < 2^n < n!$ tells you which costs dominate.

@viz bigo | Grow n and watch the faster-growing functions take over.

:::explore
**What to try**
1. Start with $n$ around 10. The curves are tangled; for small $n$, $n^2$ can even be below $n \log n$ times a constant.
2. Slide $n$ up to 40, then 200, then 2000. Watch $2^n$ and $n!$ shoot off the top of the chart first, then $n^3$, then $n^2$.
3. Switch to the log y-axis. Now polynomials appear as gently sloping curves and exponentials as steep straight lines; the gap between $n^2$ and $2^n$ keeps widening.
4. At $n = 2000$, compare $n \log n$ with $n^2$: about 22,000 versus 4,000,000.

**What to notice:** for large $n$ the order of the curves is exactly the growth hierarchy from the article, no matter what happens at small $n$. That eventual order is what $O$, $\Omega$ and $\Theta$ capture, and why constant factors stop mattering.
:::

:::formulas
$$f = O(g) \iff \exists\, c > 0, n_0 : \; f(n) \le c\, g(n) \;\; \forall n \ge n_0$$
$$f = \Omega(g) \iff \exists\, c > 0, n_0 : \; f(n) \ge c\, g(n) \;\; \forall n \ge n_0$$
$$f = \Theta(g) \iff f = O(g) \text{ and } f = \Omega(g)$$
$$\lim_{n\to\infty} \frac{f(n)}{g(n)} = L \in (0, \infty) \Rightarrow f = \Theta(g)$$
$$1 < \log n < \sqrt{n} < n < n\log n < n^2 < n^3 < 2^n < n! < n^n$$
$$\log_a n = \frac{\log_b n}{\log_b a} = \Theta(\log_b n), \qquad \log(n!) = \Theta(n \log n)$$
:::

:::thm Polynomials are Theta of their leading term
If $p(n) = a_k n^k + a_{k-1}n^{k-1} + \cdots + a_0$ with $a_k > 0$, then $p(n) = \Theta(n^k)$.
:::

:::proof
For $n \ge 1$, $|a_i| n^i \le |a_i| n^k$, so $p(n) \le (|a_0| + \cdots + |a_k|) n^k$: an upper bound with $c_2 = \sum |a_i|$. For the lower bound, $p(n)/n^k = a_k + a_{k-1}/n + \cdots + a_0/n^k \to a_k$, so for $n$ large enough $p(n)/n^k \ge a_k/2$, giving $c_1 = a_k/2$.
:::

:::steps Prove $5n^3 - 2n^2 + 7 = \Theta(n^3)$ with explicit constants
1. Upper: for $n \ge 1$, $5n^3 - 2n^2 + 7 \le 5n^3 + 7n^3 = 12n^3$. So $c_2 = 12$.
2. Lower: we want $5n^3 - 2n^2 + 7 \ge 3n^3$, i.e. $2n^3 - 2n^2 + 7 \ge 0$, i.e. $2n^2(n - 1) + 7 \ge 0$, true for all $n \ge 1$. So $c_1 = 3$.
3. With $n_0 = 1$: $3n^3 \le 5n^3 - 2n^2 + 7 \le 12n^3$. Hence $\Theta(n^3)$.
:::

:::steps Compare $n \log_2 n$ and $n^{1.5}$
1. Ratio: $\dfrac{n \log_2 n}{n^{1.5}} = \dfrac{\log_2 n}{\sqrt{n}}$.
2. Logarithms grow slower than any positive power, so this tends to 0.
3. Hence $n \log n = o(n^{1.5})$: $n\log n = O(n^{1.5})$ but not $\Theta(n^{1.5})$.
4. Check numerically at $n = 2^{20} \approx 10^6$: $\log_2 n / \sqrt n = 20/1024 \approx 0.02$.
:::

:::mock Exam question
For each pair, say whether $f = O(g)$, $f = \Omega(g)$, or both ($\Theta$). (a) $f = 100n + 50$, $g = n^2$. (b) $f = \log_2(n^3)$, $g = \log_{10} n$. (c) $f = 2^{n+3}$, $g = 2^n$. (d) $f = 3^n$, $g = 2^n$.
:::solution
(a) $f/g \to 0$: $f = O(g)$ only. (b) $\log_2(n^3) = 3\log_2 n = \frac{3}{\log_{10} 2}\log_{10} n \approx 9.97\log_{10} n$: $\Theta$. (c) $2^{n+3} = 8 \cdot 2^n$: $\Theta$. (d) $3^n/2^n = 1.5^n \to \infty$: $f = \Omega(g)$ only.
:::
:::

:::cs
Asymptotic analysis is how every algorithm is compared in textbooks, papers and interviews. It predicts which data structure scales: a hash table lookup ($\Theta(1)$ expected) versus a balanced tree ($\Theta(\log n)$) versus a list scan ($\Theta(n)$). It also tells you what input sizes are feasible: roughly $n \le 10^8$ for linear time, $10^4$ for quadratic and about 25 for $2^n$ within a second.
:::

:::ml
Training cost is asymptotic analysis too. Self-attention in a transformer costs $\Theta(n^2 d)$ for sequence length $n$, which is why long-context models use sparse or linear attention. Exact $k$-nearest-neighbour search is $\Theta(nd)$ per query, motivating approximate methods, and kernel methods need an $n \times n$ Gram matrix, $\Theta(n^2)$ memory and up to $\Theta(n^3)$ time to invert.
:::

:::real
Looking up a word in a printed dictionary by opening near the right letter and halving the search is logarithmic: even a 100,000-word dictionary needs only about 17 halvings. Reading every page from the start is linear.
:::

:::quiz
? Which is the tightest correct statement about $T(n) = 4n^2 + 100n$?
- $T(n) = O(n)$
+ $T(n) = \Theta(n^2)$
- $T(n) = \Theta(n^3)$
> The leading term $4n^2$ dominates; $\Theta(n^3)$ is false because $T$ is not $\Omega(n^3)$.

? Is $n^2 = O(n^3)$?
+ yes
- no
> Big-O is an upper bound; $n^2 \le n^3$ for $n \ge 1$.

? Is $4^n = O(2^n)$?
- yes
+ no
> $4^n/2^n = 2^n \to \infty$.

? If $\lim f(n)/g(n) = 7$, which holds?
+ $f = \Theta(g)$
- $f = o(g)$
- $f = \omega(g)$
> A finite positive limit means the same growth rate.

? An algorithm does $n^2$ steps on a computer doing $10^9$ steps per second. About how many seconds does it take for $n = 10^5$?
= 10
> $(10^5)^2 = 10^{10}$ steps, divided by $10^9$ per second.

? Which grows fastest?
- $n^{10}$
- $2^n$
+ $n!$
> $n!$ beats every exponential $c^n$.
:::

## Lesson: Analysing loops with sums {#loop-analysis}
@summary: Turning code into arithmetic: count how often the innermost statement runs by writing nested loops as sums, then evaluate them with the arithmetic, square, geometric and harmonic sum formulas.

### From code to counting
To find the running time of an algorithm we count how many times its basic operations run. For straight-line code this is easy: each statement runs once. The interesting part is loops. A loop that runs $n$ times with a constant-time body costs $\Theta(n)$. A loop inside a loop is where things get interesting, and the tool for handling it is the summation sign $\Sigma$. In this lesson you will learn to translate loops into sums and to evaluate the sums that come up again and again.

### Imagine a handshake party
At a party of $n$ people everyone shakes hands with everyone else exactly once. How many handshakes happen? Write it as code: for each person $i$ from 1 to $n$, shake hands with each person $j$ from $i + 1$ to $n$. Person 1 shakes $n - 1$ hands, person 2 shakes $n - 2$ new hands, and so on, down to person $n$, who shakes none. The total is $(n - 1) + (n - 2) + \cdots + 1 + 0 = \frac{n(n-1)}{2}$. For 10 people that is 45 handshakes. This is exactly the work done by many quadratic algorithms, like comparing every pair of items in a list, and it is our first sum formula in disguise.

### One loop: the cost is a sum
Consider
```
for i = 1 to n:
    for j = 1 to i:
        work()
```
For a fixed $i$, the inner loop runs $i$ times. So the total number of calls to `work()` is
$$\sum_{i=1}^{n} i = 1 + 2 + \cdots + n.$$
The famous trick (often credited to the young Gauss) is to write the sum forwards and backwards and add: each column gives $n + 1$, and there are $n$ columns, so twice the sum is $n(n+1)$:
$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}.$$
For $n = 10$ that is 55. As a function of $n$ this is $\frac{1}{2}n^2 + \frac{1}{2}n = \Theta(n^2)$. Notice that even though the inner loop runs only $i$ times, not $n$ times, the total is still quadratic, just with constant $\frac12$ instead of 1.

### The core sum formulas
A handful of sums cover most loop analysis.

The **arithmetic** sums: $\sum_{i=1}^n 1 = n$, $\sum_{i=1}^n i = \frac{n(n+1)}{2}$, $\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}$. For $n = 3$: $1 + 4 + 9 = 14 = \frac{3 \cdot 4 \cdot 7}{6}$. In general $\sum_{i=1}^n i^k = \Theta(n^{k+1})$, which you can remember as "summing is like integrating": $\int_0^n x^k\,dx = \frac{n^{k+1}}{k+1}$.

The **geometric** sum: for $r \ne 1$, $\sum_{i=0}^{n} r^i = \frac{r^{n+1} - 1}{r - 1}$. For $r = 2$: $1 + 2 + 4 + \cdots + 2^n = 2^{n+1} - 1$. For example $1 + 2 + 4 + 8 = 15 = 2^4 - 1$. The key behaviour: if $r > 1$ the sum is $\Theta(r^n)$, dominated by its **last** term; if $0 < r < 1$ the sum is $\Theta(1)$, dominated by its **first** term, since $\sum_{i \ge 0} r^i = \frac{1}{1 - r}$. For $r = \tfrac12$, $1 + \tfrac12 + \tfrac14 + \cdots = 2$.

The **harmonic** sum: $H_n = \sum_{i=1}^n \frac{1}{i} = 1 + \frac12 + \frac13 + \cdots + \frac1n = \ln n + O(1)$. For $n = 4$, $H_4 = \frac{25}{12} \approx 2.08$, while $\ln 4 \approx 1.39$; the difference approaches Euler's constant $\gamma \approx 0.577$.

### Loops that do not count by one
Not every loop steps by 1. A loop like `i = 1; while i <= n: i = 2*i` runs for $i = 1, 2, 4, \ldots$ up to $n$, which is $\lfloor \log_2 n \rfloor + 1$ times, so $\Theta(\log n)$. A loop `i = 1; while i*i <= n: i += 1` runs $\lfloor \sqrt{n} \rfloor$ times. And this loop
```
for i = 1 to n:
    for j = i, 2i, 3i, ... up to n:
        work()
```
runs its inner loop $\lfloor n/i \rfloor$ times, for a total of about $\sum_{i=1}^n \frac{n}{i} = n H_n = \Theta(n \log n)$. This pattern is behind the sieve of Eratosthenes and many number-theory algorithms.

When the inner work depends on a doubling variable, the geometric sum appears. If a loop processes sizes $1, 2, 4, \ldots, n$ and spends time proportional to the size each time, the total is $1 + 2 + 4 + \cdots + n < 2n$, which is only $\Theta(n)$, not $\Theta(n \log n)$. This fact powers the analysis of dynamic arrays in the amortized analysis lesson.

### A full example: insertion sort
Let us analyse a real algorithm. Insertion sort goes through the list from left to right, and for each position $i$ from 2 to $n$ it takes the item there and slides it left past every larger item before it, like sorting a hand of playing cards. In the worst case, when the list starts in reverse order, item $i$ must be compared with all $i - 1$ items before it. So the worst-case number of comparisons is
$$\sum_{i=2}^{n} (i - 1) = 1 + 2 + \cdots + (n - 1) = \frac{(n-1)n}{2}.$$
For a list of 8 items in reverse order that is $\frac{7 \cdot 8}{2} = 28$ comparisons, and for 1000 items it is 499,500. In the best case, an already sorted list, each item is compared once with its left neighbour and stays put, so there are only $n - 1$ comparisons. The same algorithm is $\Theta(n^2)$ in the worst case and $\Theta(n)$ in the best case, and the sum told us both exactly.

### Bounding instead of computing exactly
Often we only need $\Theta$, not an exact count. Two quick tricks: **bound each term by the largest**, and **drop the small half**. For $\sum_{i=1}^n i^2$: each term is at most $n^2$, so the sum is at most $n^3$; and the top half of the terms (from $i = n/2$ to $n$) are each at least $(n/2)^2$, and there are $n/2$ of them, so the sum is at least $n^3/8$. Hence $\Theta(n^3)$ without needing the exact formula.

### Common mistakes
Do not multiply loop bounds blindly. Two nested loops are not always $n^2$: if the inner loop doubles its variable, the total is $n \log n$; if the inner loop's range shrinks with the outer variable, you may get $\frac{n^2}{2}$, still $\Theta(n^2)$ but with a different constant. Watch off-by-one details when exact counts are asked for: $\sum_{i=0}^{n} 2^i$ has $n + 1$ terms. And remember that a geometric sum with ratio above 1 is dominated by its last term, not by "number of terms times the largest term".

### Summary
To analyse loops, write the number of executions of the innermost statement as a sum, one $\Sigma$ per loop, with the inner bounds depending on the outer variables. Evaluate it with $\sum i = \frac{n(n+1)}{2}$, $\sum i^2 = \frac{n(n+1)(2n+1)}{6}$, geometric sums $\frac{r^{n+1} - 1}{r - 1}$ and harmonic sums $H_n \approx \ln n$, or bound it above and below to get $\Theta$ directly. Doubling loops cost $\log n$ iterations, and geometric growth makes totals proportional to the last term.

@viz sigma term=i n=10 | Each bar is one term of the sum; the total is the work done by the nested loop.

:::explore
**What to try**
1. With term $i$ and $n = 10$, read the total: 55, which is $\frac{10 \cdot 11}{2}$. Each bar is one pass of the outer loop, with height equal to the number of inner iterations.
2. Change $n$ and check $\frac{n(n+1)}{2}$ each time. The bars form a triangle, half of an $n \times n$ square.
3. Switch the term to $i^2$ and check $\sum_{i=1}^{4} i^2 = 30$.
4. Switch to $(1/2)^i$: the total approaches 1 however large $n$ gets, a decreasing geometric sum dominated by its first term.
5. Switch to $1/i$: the harmonic sum grows, but very slowly, like $\ln n$.

**What to notice:** the shape of the bars tells you the growth: a triangle of area about $n^2/2$ for $\sum i$, a sum stuck below a constant for a shrinking geometric series, and a slowly creeping total for the harmonic series.
:::

:::formulas
$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}, \qquad \sum_{i=1}^{n} i^2 = \frac{n(n+1)(2n+1)}{6}, \qquad \sum_{i=1}^{n} i^3 = \left(\frac{n(n+1)}{2}\right)^2$$
$$\sum_{i=0}^{n} r^i = \frac{r^{n+1} - 1}{r - 1} \;(r \ne 1), \qquad \sum_{i=0}^{\infty} r^i = \frac{1}{1-r} \;(|r| < 1)$$
$$H_n = \sum_{i=1}^n \frac1i = \ln n + \gamma + o(1), \quad \gamma \approx 0.577$$
$$\sum_{i=1}^n i^k = \Theta(n^{k+1}), \qquad \#\{\text{iterations of } i \leftarrow 2i \text{ up to } n\} = \lfloor \log_2 n \rfloor + 1$$
:::

:::thm Gauss's sum
For every integer $n \ge 1$, $\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$.
:::

:::proof
By induction. For $n = 1$: $1 = \frac{1 \cdot 2}{2}$. If it holds for $n$, then $\sum_{i=1}^{n+1} i = \frac{n(n+1)}{2} + (n+1) = \frac{(n+1)(n + 2)}{2}$, which is the formula for $n + 1$.
:::

:::thm Geometric sum
For $r \ne 1$, $\sum_{i=0}^{n} r^i = \frac{r^{n+1}-1}{r-1}$.
:::

:::proof
Let $S = 1 + r + \cdots + r^n$. Then $rS = r + r^2 + \cdots + r^{n+1}$. Subtracting, all middle terms cancel: $rS - S = r^{n+1} - 1$, so $S = \frac{r^{n+1}-1}{r-1}$.
:::

:::steps Count the calls to work(): for i = 1..n, for j = i..n, for k = 1..3: work()
1. The innermost loop always runs 3 times.
2. For fixed $i$, $j$ runs from $i$ to $n$: $n - i + 1$ values.
3. Total $= \sum_{i=1}^n 3(n - i + 1) = 3\sum_{m=1}^{n} m = \frac{3n(n+1)}{2}$.
4. For $n = 4$: $\frac{3 \cdot 4 \cdot 5}{2} = 30$. Overall $\Theta(n^2)$.
:::

:::steps Find the running time of: for i = 1..n: j = n; while j > 1: j = j / 2
1. The inner loop halves $j$ from $n$ down to 1: about $\log_2 n$ iterations.
2. The outer loop runs $n$ times, independently of the inner loop.
3. Total $\approx n \log_2 n = \Theta(n \log n)$. For $n = 1024$: $1024 \times 10 = 10{,}240$ inner steps.
:::

:::steps Evaluate $\sum_{i=0}^{9} 3^i$
1. Geometric with $r = 3$, last exponent $n = 9$.
2. $\frac{3^{10} - 1}{3 - 1} = \frac{59049 - 1}{2} = 29524$.
3. Compare to the last term $3^9 = 19683$: the sum is less than $1.5\times$ the last term, as predicted for $r = 3$ (ratio $\frac{r}{r-1} = 1.5$).
:::

:::mock Exam question
Analyse this code exactly and asymptotically:
```
count = 0
for i = 1 to n:
    for j = 1 to i*i:
        count += 1
```
(a) Give count as a closed formula in $n$. (b) Evaluate it for $n = 5$. (c) Give its $\Theta$ class.
:::solution
(a) count $= \sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}$. (b) $\frac{5 \cdot 6 \cdot 11}{6} = 55$ (check: $1 + 4 + 9 + 16 + 25 = 55$). (c) $\Theta(n^3)$.
:::
:::

:::cs
Every complexity claim about iterative code ("this nested loop is quadratic", "this sieve is $n \log\log n$") is a summation argument. Database query planners estimate nested-loop joins as $\sum$ over outer rows of inner-row scans, and profilers' "hot loop" warnings are the same counting done empirically.
:::

:::ml
A naive matrix multiplication of an $m \times k$ matrix by a $k \times n$ matrix is three nested loops doing $\sum_{i=1}^m \sum_{j=1}^n \sum_{l=1}^k 1 = mnk$ multiply-adds, and this count drives the FLOP estimates for neural network layers. A dense layer mapping 1024 inputs to 1024 outputs on a batch of 64 costs $64 \times 1024 \times 1024 \approx 6.7 \times 10^7$ multiply-adds.
:::

:::real
Folding a sheet of paper doubles its thickness each time, a geometric sequence. After 10 folds it is $2^{10} = 1024$ sheets thick, and the total paper added over all folds is $1 + 2 + \cdots + 512 = 1023$ sheets, one less than the final thickness, exactly as the geometric sum predicts.
:::

:::quiz
? How many times does the inner statement run in: for i = 1..20, for j = 1..i?
= 210
> $\frac{20 \cdot 21}{2} = 210$.

? What is $1 + 2 + 4 + \cdots + 2^9$?
= 1023
> $2^{10} - 1$.

? A loop doubles $i$ from 1 until it exceeds $n = 1000$. About how many iterations?
= 10
> $i = 1, 2, 4, \ldots, 512$: $\lfloor \log_2 1000 \rfloor + 1 = 10$.

? What is $\sum_{i=1}^{4} i^2$?
= 30
> $1 + 4 + 9 + 16 = 30$, and $\frac{4 \cdot 5 \cdot 9}{6} = 30$.

? The total $\sum_{i=1}^{n} n/i$ grows like:
- $\Theta(n)$
+ $\Theta(n \log n)$
- $\Theta(n^2)$
> It equals $n H_n$ and $H_n \approx \ln n$.

? What is $1 + \tfrac12 + \tfrac14 + \tfrac18 + \cdots$ (forever)?
= 2
> $\frac{1}{1 - 1/2} = 2$.
:::

# Unit: Recurrences and divide and conquer

## Lesson: Recurrence relations {#recurrences}
@summary: Recursive algorithms have running times defined in terms of themselves. Write the recurrence, then solve it by unrolling, by guessing and proving with induction (substitution), or with the characteristic equation for linear recurrences.

### When an algorithm calls itself
Many of the best algorithms are recursive: to solve a problem, they solve smaller copies of the same problem and combine the answers. Binary search looks in half the list. Merge sort sorts two halves and merges them. The Towers of Hanoi moves a smaller tower out of the way. When we try to count the steps of such an algorithm, the count is naturally described in terms of itself: "the time for size $n$ is the time for size $n/2$, plus one comparison." An equation like this is called a **recurrence relation**, and this lesson is about turning recurrences into ordinary formulas.

:::def Recurrence relation
A recurrence defines a sequence $T(n)$ by expressing $T(n)$ in terms of values $T(m)$ for smaller $m$, together with one or more base cases such as $T(1) = 1$.
:::

### Imagine a stack of plates
Imagine you must count a tall stack of plates, but you are only allowed to look at the top plate and hand the rest of the stack to a friend, who follows the same rule. If counting one plate takes one second, the time for $n$ plates is $T(n) = T(n - 1) + 1$, with $T(1) = 1$. Unrolling it: $T(n) = T(n-2) + 2 = T(n-3) + 3 = \cdots = T(1) + (n - 1) = n$. Linear time, as you would expect.

### Writing the recurrence from code
To write a recurrence, look at a recursive function and ask two questions: how many recursive calls does it make and on what sizes, and how much work does it do outside the calls? Binary search makes one call on half the list and does a constant amount of other work: $T(n) = T(n/2) + 1$. Merge sort makes two calls on halves and spends about $n$ steps merging: $T(n) = 2T(n/2) + n$. The Towers of Hanoi with $n$ discs moves $n - 1$ discs aside, moves the biggest disc, then moves the $n - 1$ discs back on top: $T(n) = 2T(n - 1) + 1$. A recursive Fibonacci function calls itself on $n - 1$ and $n - 2$: $T(n) = T(n-1) + T(n-2) + 1$.

### Method 1: unrolling (iteration)
Substitute the recurrence into itself repeatedly until a pattern appears, then sum the pattern. For binary search with $T(1) = 1$ and $n$ a power of 2:
$$T(n) = T(n/2) + 1 = T(n/4) + 2 = T(n/8) + 3 = \cdots = T(n/2^k) + k.$$
The pattern stops when $n/2^k = 1$, that is $k = \log_2 n$, giving $T(n) = \log_2 n + 1$. For $n = 1024$, that is 11 steps.

For the Towers of Hanoi with $T(1) = 1$: $T(n) = 2T(n-1) + 1 = 4T(n-2) + 2 + 1 = 8T(n-3) + 4 + 2 + 1$, and after $n - 1$ steps $T(n) = 2^{n-1}T(1) + 2^{n-2} + \cdots + 1 = 2^{n-1} + 2^{n-1} - 1 = 2^n - 1$. Three discs need 7 moves; 64 discs, as in the legend, need $2^{64} - 1 \approx 1.8 \times 10^{19}$ moves.

For $T(n) = T(n-1) + n$ with $T(1) = 1$: $T(n) = n + (n - 1) + \cdots + 1 = \frac{n(n+1)}{2}$. This is the recurrence of a naive selection sort or of quicksort's worst case.

### Method 2: guess and prove (substitution)
Unrolling can get messy. The **substitution method** is: guess the form of the answer, then prove it by induction. Try merge sort, $T(n) = 2T(n/2) + n$ with $T(1) = 1$, for $n$ a power of 2. Compute a few values: $T(2) = 2 + 2 = 4$, $T(4) = 8 + 4 = 12$, $T(8) = 24 + 8 = 32$. Guess $T(n) = n\log_2 n + n$: check $8 \cdot 3 + 8 = 32$. Proof by induction: if $T(n/2) = \frac n2 \log_2 \frac n2 + \frac n2$, then
$$T(n) = 2\Big(\tfrac n2 (\log_2 n - 1) + \tfrac n2\Big) + n = n\log_2 n - n + n + n = n\log_2 n + n.$$
So $T(n) = \Theta(n \log n)$.

Substitution is precise but you must prove *exactly* the statement you guessed. A classic trap: "prove" $T(n) = 2T(n/2) + n$ is $O(n)$ by assuming $T(n/2) \le c\frac{n}{2}$, giving $T(n) \le cn + n$, and then saying "$= O(n)$". That is wrong. The induction needs $T(n) \le cn$ with the *same* $c$, and $cn + n > cn$. The guess $O(n)$ is false, and the failed induction is the warning sign.

### Method 3: linear recurrences with constant coefficients
Recurrences like $a_n = 5a_{n-1} - 6a_{n-2}$ have a neat recipe. Try $a_n = r^n$: dividing by $r^{n-2}$ gives the **characteristic equation** $r^2 = 5r - 6$, i.e. $r^2 - 5r + 6 = 0$, with roots $r = 2$ and $r = 3$. Every solution has the form $a_n = A\,2^n + B\,3^n$, and the base cases fix $A$ and $B$. With $a_0 = 2$ and $a_1 = 5$: $A + B = 2$ and $2A + 3B = 5$, so $B = 1$, $A = 1$, and $a_n = 2^n + 3^n$. Check: $a_2 = 5 \cdot 5 - 6 \cdot 2 = 13 = 4 + 9$. For Fibonacci, $r^2 = r + 1$ gives $r = \frac{1 \pm \sqrt5}{2}$, so $F_n$ grows like $\varphi^n$ with $\varphi \approx 1.618$: the naive recursive Fibonacci function is exponential.

### Choosing a method
With three methods available, which should you reach for first? A good habit is to start by computing the first few values by hand. This costs a minute and almost always tells you something: whether the values grow by a fixed amount each time (linear), by roughly doubling (exponential), or by something in between. Next, try unrolling two or three times and look for a pattern in the leftover terms. If the pattern is a familiar sum, such as an arithmetic or geometric series, you can finish the calculation directly, as we did for binary search and the Towers of Hanoi. If the unrolled expression becomes messy, use the pattern only as a guess, and then confirm the guess with an induction proof, because a guess that matches the first few values can still be wrong for larger ones. Finally, if the recurrence is a fixed linear combination of earlier terms with no extra work added, the characteristic equation is usually the quickest route of all.

It also helps to remember that, for running times, we usually only need the growth rate, not the exact formula. Two recurrences that differ only in their base case, or only in a constant amount of extra work at each step, nearly always have the same growth rate. That freedom lets you simplify a recurrence before solving it: round sizes to powers of 2, ignore floors and ceilings, and replace "about $n$ steps" with exactly $n$. The next two lessons build on this idea, first with pictures (recursion trees) and then with a ready-made formula (the master theorem) that solves the most common type of divide-and-conquer recurrence in one line.

### Common mistakes
Always include the base case; the same recurrence with different base cases gives different exact answers (though often the same $\Theta$). Do not drop the non-recursive work: $T(n) = 2T(n/2)$ is $\Theta(n)$, while $2T(n/2) + n$ is $\Theta(n \log n)$. And in substitution proofs, keep the constant fixed through the induction step.

### Summary
A recurrence expresses a recursive algorithm's cost in terms of smaller instances plus the local work. Solve it by unrolling into a sum, by guessing and proving with induction, or, for linear recurrences with constant coefficients, by the characteristic equation. Standard results: $T(n-1) + 1 \to n$, $T(n-1) + n \to \Theta(n^2)$, $T(n/2) + 1 \to \Theta(\log n)$, $2T(n/2) + n \to \Theta(n\log n)$ and $2T(n-1) + 1 \to 2^n - 1$.

@viz recursion-tree | Each recurrence drawn as a tree of calls; the totals are the solutions you derived by unrolling.

:::explore
**What to try**
1. Choose $T(n) = T(n/2) + 1$ (binary search). The tree is a single chain; count its levels for $n = 16$: $\log_2 16 + 1 = 5$, matching the unrolled formula.
2. Choose $T(n) = 2T(n/2) + n$ (merge sort). Every level costs $n$ in total; with $\log_2 n$ levels plus the leaves you get $n\log_2 n + n$, the formula proved by substitution.
3. Compare with $T(n) = 2T(n/2) + n^2$: the work is concentrated at the top.
4. Read each recurrence's stated answer and match it against the methods in the article.

**What to notice:** unrolling a recurrence is exactly adding up the tree level by level. The tree picture is the subject of the next lesson.
:::

:::formulas
$$T(n) = T(n-1) + c \Rightarrow \Theta(n), \qquad T(n) = T(n-1) + n \Rightarrow \tfrac{n(n+1)}{2}$$
$$T(n) = T(n/2) + 1,\; T(1) = 1 \Rightarrow \log_2 n + 1$$
$$T(n) = 2T(n/2) + n,\; T(1) = 1 \Rightarrow n\log_2 n + n$$
$$T(n) = 2T(n-1) + 1,\; T(1) = 1 \Rightarrow 2^n - 1$$
$$a_n = c_1 a_{n-1} + c_2 a_{n-2}: \; r^2 = c_1 r + c_2, \; a_n = A r_1^n + B r_2^n \;(r_1 \ne r_2)$$
:::

:::thm Towers of Hanoi
The minimum number of moves to transfer $n$ discs is $2^n - 1$.
:::

:::proof
The largest disc must move at some point; at that moment all $n - 1$ other discs must be on the third peg, which takes at least $T(n-1)$ moves, and afterwards they must be moved back on top of it, at least $T(n-1)$ more. So $T(n) \ge 2T(n-1) + 1$, and the recursive strategy achieves equality. With $T(1) = 1$, induction gives $T(n) = 2(2^{n-1} - 1) + 1 = 2^n - 1$.
:::

:::steps Solve $T(n) = T(n-1) + 2n$ with $T(0) = 0$
1. Unroll: $T(n) = 2n + 2(n-1) + \cdots + 2(1) + T(0)$.
2. $= 2\sum_{i=1}^n i = 2 \cdot \frac{n(n+1)}{2} = n(n+1)$.
3. Check: $T(1) = 0 + 2 = 2 = 1 \cdot 2$; $T(2) = 2 + 4 = 6 = 2 \cdot 3$. So $\Theta(n^2)$.
:::

:::steps Solve $a_n = a_{n-1} + 6a_{n-2}$ with $a_0 = 0$, $a_1 = 5$
1. Characteristic equation $r^2 = r + 6$: $(r - 3)(r + 2) = 0$, roots $3$ and $-2$.
2. $a_n = A\,3^n + B(-2)^n$. From $a_0$: $A + B = 0$. From $a_1$: $3A - 2B = 5$.
3. So $A = 1$, $B = -1$: $a_n = 3^n - (-2)^n$.
4. Check $a_2 = 5 + 0 = 5$ and $9 - 4 = 5$. Correct.
:::

:::mock Exam question
A recursive algorithm on input size $n$ makes one recursive call on size $n - 1$ and then does $n$ units of work, with $T(1) = 1$. (a) Write the recurrence. (b) Solve it exactly. (c) Another algorithm has $T(n) = 3T(n - 1)$ with $T(0) = 2$. Find $T(5)$.
:::solution
(a) $T(n) = T(n-1) + n$, $T(1) = 1$. (b) $T(n) = 1 + 2 + \cdots + n = \frac{n(n+1)}{2}$. (c) $T(n) = 2 \cdot 3^n$, so $T(5) = 2 \cdot 243 = 486$.
:::
:::

:::cs
Recurrences give the running time of every recursive algorithm: binary search, merge sort, quicksort, tree traversals, recursive descent parsers. They also count structures: the number of binary strings without two consecutive 1s satisfies a Fibonacci recurrence, and so does the number of ways to tile a $2 \times n$ board with dominoes.
:::

:::ml
Recurrent neural networks are recurrences: $h_t = \sigma(W h_{t-1} + U x_t)$. Unrolling the linear part gives powers $W^t$, and just like $a_n = A r_1^n + B r_2^n$, the behaviour is governed by the eigenvalues of $W$: magnitudes above 1 explode and below 1 vanish, which is the exploding and vanishing gradient problem.
:::

:::real
Compound interest is a recurrence: with 5% annual interest and a deposit of 100 each year, $B_n = 1.05 B_{n-1} + 100$. Solving it the same way gives a closed form for your savings after $n$ years.
:::

:::quiz
? Binary search satisfies which recurrence?
+ $T(n) = T(n/2) + 1$
- $T(n) = 2T(n/2) + 1$
- $T(n) = T(n-1) + 1$
> One recursive call on half the input, plus constant work.

? How many moves does the Towers of Hanoi with 6 discs need?
= 63
> $2^6 - 1 = 63$.

? With $T(1) = 1$ and $T(n) = 2T(n/2) + n$, what is $T(8)$?
= 32
> $8 \log_2 8 + 8 = 24 + 8 = 32$.

? $T(n) = T(n-1) + n$ grows like:
- $\Theta(n)$
- $\Theta(n \log n)$
+ $\Theta(n^2)$
> It sums to $\frac{n(n+1)}{2}$.

? What are the roots of the characteristic equation of $a_n = 7a_{n-1} - 12a_{n-2}$? Give the larger root.
= 4
> $r^2 - 7r + 12 = (r - 3)(r - 4)$.
:::

## Lesson: Recursion trees {#recursion-trees}
@summary: Draw a recurrence as a tree of subproblems, add up the work level by level, and see whether the root, the leaves or every level dominates.

### Seeing where the work goes
Unrolling a recurrence by algebra works, but it is easy to get lost in the symbols. A **recursion tree** draws the same calculation as a picture. Each node is one call of the recursive algorithm, labelled with the work done *in that call outside its recursive calls*. Its children are the calls it makes. The total running time is the sum of all the labels. Because subproblems at the same depth have the same size, it is easiest to add up the tree one level at a time.

### Imagine a company org chart
Imagine a company where the boss receives a task of size $n$, spends $n$ minutes planning, and hands two half-sized tasks to two managers. Each manager spends $n/2$ minutes planning and hands two quarter-sized tasks to two employees, and so on until the tasks are of size 1. How much total time does the company spend? Level 0 is the boss: $n$ minutes. Level 1 is two managers at $n/2$ each: $n$ minutes. Level 2 is four people at $n/4$: again $n$. Every level costs $n$, and the number of levels is $\log_2 n$ (halving until we reach 1), plus the bottom level of $n$ workers each spending 1 minute. Total about $n\log_2 n + n$. That is merge sort's recurrence $T(n) = 2T(n/2) + n$, solved by looking at a picture.

### The general recipe
For a recurrence $T(n) = a\,T(n/b) + f(n)$:
1. **Depth $i$** has $a^i$ nodes, each working on a subproblem of size $n/b^i$.
2. The **cost of level $i$** is $a^i f(n/b^i)$.
3. The tree has depth $\log_b n$, and the bottom level has $a^{\log_b n} = n^{\log_b a}$ leaves, each costing a constant.
4. Add up: $T(n) = \sum_{i=0}^{\log_b n - 1} a^i f(n/b^i) + \Theta(n^{\log_b a})$.

The identity $a^{\log_b n} = n^{\log_b a}$ is worth checking once: take $\log_b$ of both sides, getting $\log_b n \cdot \log_b a$ in both cases. For $a = 4$, $b = 2$: $4^{\log_2 n} = (2^{\log_2 n})^2 = n^2$.

### Three behaviours
The level costs $a^i f(n/b^i)$ usually form a geometric sequence, and from the loop-analysis lesson we know a geometric sum is dominated by its largest term. So there are three possibilities.

**Every level costs the same.** For $2T(n/2) + n$, level $i$ costs $2^i \cdot \frac{n}{2^i} = n$. With about $\log_2 n$ levels, the total is $\Theta(n\log n)$.

**Costs grow towards the leaves.** For $T(n) = 3T(n/2) + n$ (Karatsuba multiplication), level $i$ costs $3^i \cdot \frac{n}{2^i} = (\tfrac32)^i n$. This is an increasing geometric sequence, dominated by the last level, the leaves: there are $3^{\log_2 n} = n^{\log_2 3} \approx n^{1.585}$ of them. So $T(n) = \Theta(n^{\log_2 3})$. Similarly $T(n) = 4T(n/2) + n$ has level costs $2^i n$ and $n^2$ leaves: $\Theta(n^2)$.

**Costs shrink towards the leaves.** For $T(n) = 2T(n/2) + n^2$, level $i$ costs $2^i \cdot \frac{n^2}{4^i} = \frac{n^2}{2^i}$: $n^2, \frac{n^2}{2}, \frac{n^2}{4}, \ldots$, a decreasing geometric series summing to less than $2n^2$. The root dominates: $\Theta(n^2)$.

### Unbalanced trees
Recursion trees also handle recurrences the master theorem cannot, like $T(n) = T(n/3) + T(2n/3) + n$, which describes quicksort when every pivot splits 1 : 2. The two children of a node of size $m$ have sizes $m/3$ and $2m/3$, which add up to $m$, so every full level costs exactly $n$. The shortest branch (always taking the $1/3$ side) reaches size 1 after $\log_3 n$ levels, and the longest (always $2/3$) after $\log_{3/2} n$ levels. So the total is between $n\log_3 n$ and $n\log_{3/2} n$: both $\Theta(n\log n)$. Even a lopsided split gives $n \log n$, as long as the split is a constant fraction.

### Drawing a tree by hand
When you draw a recursion tree on paper, there is no need to draw every node. Draw the root and its children, then one or two more levels, and write to the right of each level three things: how many nodes it has, how big each subproblem is, and the total cost of the level. Then stop drawing and look at the column of level costs. If those numbers are all the same, multiply by the number of levels. If each one is a fixed multiple bigger than the one above, the bottom level is where the work is, so count the leaves. If each one is a fixed fraction of the one above, the top level is where the work is, so the answer is simply the cost of the root. In each case the column of level costs is a geometric sequence, and the lesson on loops already taught you how such sums behave.

This habit is useful far beyond exam questions. When a recursive program is too slow, the recursion tree tells you where to look. If the root dominates, the problem is the combining step, and a faster merge or partition will help. If the leaves dominate, the problem is the sheer number of subproblems, and the cure is usually to make fewer recursive calls, as Karatsuba and Strassen do by cleverly replacing one of the recursive multiplications with a few cheap additions. If every level costs the same, both parts matter equally, and the logarithmic number of levels is the price of splitting the problem in half.

### Using a tree to guess, then proving
A recursion tree can be slightly sloppy, ignoring floors and ceilings or the exact bottom of an unbalanced tree. That is fine for finding the answer; if you need full rigour, use the tree's answer as the guess in the substitution method.

### Common mistakes
Label each node with the *non-recursive* work only; the children account for the rest. Do not forget the leaves: in $3T(n/2) + n$ the leaves are the dominant cost, and summing only the internal levels "$\approx n$ per level" would be wrong because the level costs are not equal. Count depth correctly: halving gives $\log_2 n$ levels, splitting into thirds gives $\log_3 n$.

### Summary
A recursion tree has $a^i$ nodes at depth $i$, each of size $n/b^i$, so level $i$ costs $a^i f(n/b^i)$, and there are $n^{\log_b a}$ leaves at depth $\log_b n$. When level costs are equal the answer is $f(n)\log n$; when they grow, the leaves dominate and the answer is $n^{\log_b a}$; when they shrink, the root dominates and the answer is $f(n)$. This picture is the intuition behind the master theorem.

@viz recursion-tree | Switch recurrences and compare how the work is distributed across levels.

:::explore
**What to try**
1. Select $T(n) = 2T(n/2) + n$. Read the cost of each level: they are all equal to $n$.
2. Select $T(n) = 3T(n/2) + n$. The level costs grow by a factor $\tfrac32$ per level; the leaves carry the most work, giving $n^{\log_2 3}$.
3. Select $T(n) = 2T(n/2) + n^2$. Now the level costs halve each level and the root dominates.
4. Select $T(n) = T(n/2) + 1$: one node per level, total $\log_2 n + 1$.

**What to notice:** the three shapes match the three behaviours in the article: equal levels (multiply by the number of levels), growing levels (count the leaves), shrinking levels (just the root). The master theorem in the next lesson is a formula for deciding which one you are in.
:::

:::formulas
$$\text{level } i: \; a^i \text{ nodes of size } \frac{n}{b^i}, \quad \text{cost } a^i f\!\left(\frac{n}{b^i}\right)$$
$$\text{depth} = \log_b n, \qquad \#\text{leaves} = a^{\log_b n} = n^{\log_b a}$$
$$T(n) = \sum_{i=0}^{\log_b n - 1} a^i f\!\left(\frac{n}{b^i}\right) + \Theta\big(n^{\log_b a}\big)$$
:::

:::thm Leaves of a recursion tree
In the recursion tree of $T(n) = aT(n/b) + f(n)$ with $n$ a power of $b$, the number of leaves is $n^{\log_b a}$.
:::

:::proof
Each level multiplies the number of nodes by $a$, and the subproblem size reaches 1 at depth $d = \log_b n$, so there are $a^{\log_b n}$ leaves. Write $a = b^{\log_b a}$; then $a^{\log_b n} = b^{\log_b a \cdot \log_b n} = (b^{\log_b n})^{\log_b a} = n^{\log_b a}$.
:::

:::steps Solve $T(n) = 4T(n/2) + n$ with a recursion tree
1. Level $i$: $4^i$ nodes of size $n/2^i$, cost $4^i \cdot \frac{n}{2^i} = 2^i n$.
2. Costs $n, 2n, 4n, \ldots$ grow geometrically, so the leaves dominate.
3. Leaves: $4^{\log_2 n} = n^{\log_2 4} = n^2$.
4. $T(n) = \Theta(n^2)$. (Check the sum: $n(1 + 2 + \cdots + 2^{\log_2 n - 1}) = n(n - 1)$, plus $n^2$ leaves.)
:::

:::steps Solve $T(n) = 3T(n/3) + n$ and count the levels for $n = 81$
1. Level $i$: $3^i$ nodes of size $n/3^i$, cost $n$. All levels are equal.
2. Depth $\log_3 n$; for $n = 81$, $\log_3 81 = 4$ levels of internal nodes plus the leaf level.
3. $T(n) = \Theta(n \log n)$; with $T(1) = 1$, exactly $n \log_3 n + n = 81 \cdot 4 + 81 = 405$.
:::

:::mock Exam question
Use a recursion tree for $T(n) = 2T(n/4) + \sqrt{n}$. (a) What is the cost of level $i$? (b) How many leaves are there? (c) Give $T(n)$ in $\Theta$ form.
:::solution
(a) $2^i$ nodes of size $n/4^i$, each costing $\sqrt{n/4^i} = \sqrt{n}/2^i$. Level cost $2^i \cdot \sqrt n / 2^i = \sqrt n$: all levels equal. (b) $2^{\log_4 n} = n^{\log_4 2} = n^{1/2}$. (c) $\log_4 n$ equal levels of $\sqrt n$: $T(n) = \Theta(\sqrt n \log n)$.
:::
:::

:::cs
Recursion trees explain why merge sort is $n \log n$, why naive recursive matrix multiplication with 8 half-size products is $n^3$ while Strassen's 7 products give $n^{\log_2 7} \approx n^{2.81}$, and why quicksort with any constant-fraction split stays $n \log n$.
:::

:::ml
Decision trees and k-d trees built by recursively splitting data have the same structure: if each split halves the data and costs time linear in the node's size, building the tree takes $\Theta(n\log n)$, exactly the equal-levels case. The FFT used in convolution layers and signal processing has recurrence $2T(n/2) + n$ for the same reason.
:::

:::real
A phone tree for spreading news, where each person calls three others, reaches 1, 3, 9, 27, ... people per round. After $k$ rounds $3^k$ people get the news at the bottom level, the "leaves" of the tree, which is why such trees reach thousands of people in only a few rounds.
:::

:::quiz
? In the tree for $T(n) = 2T(n/2) + n$, what is the total cost of each level?
- $n/2$
+ $n$
- $n^2$
> $2^i$ nodes, each costing $n/2^i$.

? How many leaves does the tree of $T(n) = 8T(n/2) + n$ have when $n = 16$?
= 4096
> $n^{\log_2 8} = 16^3 = 4096$.

? For $T(n) = 2T(n/2) + n^2$, which part of the tree dominates?
+ the root
- the leaves
- all levels equally
> Level costs $n^2/2^i$ shrink geometrically.

? What is the depth of the recursion tree for $T(n) = T(n/2) + 1$ with $n = 64$?
= 6
> $\log_2 64 = 6$ halvings to reach size 1.

? $T(n) = T(n/3) + T(2n/3) + n$ is:
+ $\Theta(n\log n)$
- $\Theta(n)$
- $\Theta(n^2)$
> Every full level costs $n$ and the depth is between $\log_3 n$ and $\log_{3/2} n$.
:::

## Lesson: The master theorem {#master-theorem}
@summary: A ready-made answer for divide-and-conquer recurrences T(n) = aT(n/b) + f(n): compare f(n) with n^(log_b a) and read off which of three cases applies.

### A shortcut for a common pattern
Divide-and-conquer algorithms keep producing recurrences of the same shape: split a problem of size $n$ into $a$ subproblems, each of size $n/b$, solve them recursively, and spend $f(n)$ time splitting and combining. That is
$$T(n) = a\,T(n/b) + f(n), \qquad a \ge 1,\; b > 1.$$
In the last lesson you solved such recurrences by drawing recursion trees and noticing whether the level costs grow, shrink or stay the same. The **master theorem** turns that observation into a recipe you can apply in a few seconds. It is one of the most used results in algorithm analysis, and it is worth understanding *why* it works rather than memorising three cases.

### Imagine a tug of war
Think of the recurrence as a tug of war between two forces. On one side is the **combining work** $f(n)$, done at the top of the tree. On the other side is the **number of leaves**, $n^{\log_b a}$, which measures how fast the subproblems multiply. Call $n^{\log_b a}$ the **watershed function**. Whichever side is polynomially bigger wins, and the answer is that side. If they are evenly matched, every level of the tree costs about the same, and we pay that cost once per level, which adds a logarithmic factor.

### The three cases
Let $c^* = \log_b a$, the **critical exponent**.

**Case 1: leaves win.** If $f(n) = O(n^{c^* - \varepsilon})$ for some constant $\varepsilon > 0$, then $T(n) = \Theta(n^{c^*})$. The combining work is polynomially smaller than the leaf count, level costs grow geometrically down the tree, and the leaves dominate.

**Case 2: a tie.** If $f(n) = \Theta(n^{c^*} \log^k n)$ for some $k \ge 0$, then $T(n) = \Theta(n^{c^*}\log^{k+1} n)$. The most common use is $k = 0$: if $f(n) = \Theta(n^{c^*})$, then $T(n) = \Theta(n^{c^*}\log n)$. Every level costs about the same and there are $\log_b n$ levels.

**Case 3: root wins.** If $f(n) = \Omega(n^{c^* + \varepsilon})$ for some $\varepsilon > 0$, and also the **regularity condition** $a\,f(n/b) \le c\,f(n)$ holds for some constant $c < 1$ and large $n$, then $T(n) = \Theta(f(n))$. Level costs shrink geometrically and the root dominates. The regularity condition says exactly that the children's total work is a fixed fraction of the parent's; for ordinary polynomial $f$ it always holds.

### Using it step by step
Always do the same three steps: identify $a$, $b$ and $f(n)$; compute $n^{\log_b a}$; compare.

Merge sort: $T(n) = 2T(n/2) + n$. Here $a = 2$, $b = 2$, so $n^{\log_2 2} = n^1$. And $f(n) = n$ matches exactly: Case 2, $T(n) = \Theta(n \log n)$.

Binary search: $T(n) = T(n/2) + 1$. $a = 1$, $b = 2$, $n^{\log_2 1} = n^0 = 1$. $f(n) = 1$ matches: Case 2, $\Theta(\log n)$.

$T(n) = 9T(n/3) + n$. $n^{\log_3 9} = n^2$, and $f(n) = n = O(n^{2 - 1})$: Case 1 with $\varepsilon = 1$, $\Theta(n^2)$.

$T(n) = 2T(n/2) + n^2$. $n^{\log_2 2} = n$, $f(n) = n^2 = \Omega(n^{1 + 1})$. Regularity: $2 \cdot (n/2)^2 = \frac{n^2}{2} \le \frac12 n^2$, so $c = \frac12$ works. Case 3: $\Theta(n^2)$.

Strassen's matrix multiplication: $T(n) = 7T(n/2) + n^2$. $n^{\log_2 7} \approx n^{2.807}$, and $n^2$ is polynomially smaller: Case 1, $\Theta(n^{\log_2 7})$, beating the $\Theta(n^3)$ of the schoolbook method.

### The simple version for polynomial work
Most of the time $f(n) = \Theta(n^d)$ for some $d \ge 0$. Then the comparison is between $a$ and $b^d$, and you do not even need logarithms:
- if $a < b^d$, $T(n) = \Theta(n^d)$ (root wins);
- if $a = b^d$, $T(n) = \Theta(n^d \log n)$ (tie);
- if $a > b^d$, $T(n) = \Theta(n^{\log_b a})$ (leaves win).

For example $T(n) = 4T(n/2) + n^2$ has $a = 4 = 2^2 = b^d$: $\Theta(n^2 \log n)$. And $T(n) = 3T(n/2) + n$ has $3 > 2^1$: $\Theta(n^{\log_2 3})$.

### Where it does not apply
The master theorem has gaps. It needs $a$ and $b$ to be constants and all subproblems to have the same size, so it does not apply to $T(n) = T(n/3) + T(2n/3) + n$ (use a recursion tree) or to $T(n) = T(n - 1) + n$ (subproblems shrink by subtraction, not division; unroll instead). It also misses functions between the cases: $T(n) = 2T(n/2) + \frac{n}{\log n}$ has $f$ smaller than $n$ but not *polynomially* smaller, so neither Case 1 nor Case 2 fits as stated. (A recursion tree gives $\Theta(n \log\log n)$.) The more general **Akra–Bazzi** theorem covers unequal splits.

### Why designers care about the three cases
The master theorem is not only a tool for checking answers in a textbook; it tells algorithm designers where to spend their effort. Suppose you have a divide-and-conquer algorithm and you want it to be faster. The theorem says the answer depends on which side of the tug of war is winning. If the leaves are winning, then making the combining step faster does nothing at all, because the combining work was never the bottleneck. The only way to improve is to reduce the number of subproblems or make them smaller. This is exactly the trick used by Karatsuba, who multiplied two large numbers with three half-size multiplications instead of four, and by Strassen, who multiplied matrices with seven half-size products instead of eight. Each of these saved one recursive call per level, and because the saving is repeated at every level, it lowers the exponent of the whole algorithm.

If, on the other hand, the root is winning, then the recursion is cheap and the combining step is the whole story. In that situation the clever work goes into a faster way to split or merge. And when the two sides are tied, as in merge sort, both matter equally, and the familiar $\log n$ factor appears because the same amount of work is repeated once for each level of the tree. Thinking in these terms, rather than memorising three formulas, is what lets you predict the effect of a change before you write any code.

### Common mistakes
The comparison must be *polynomial*: $n \log n$ versus $n$ is not Case 3, because $n \log n$ is not $\Omega(n^{1+\varepsilon})$ for any $\varepsilon > 0$; it is Case 2 with $k = 1$, giving $\Theta(n \log^2 n)$. Do not confuse $a$ and $b$: $a$ is the number of subproblems, $b$ is the factor by which the size shrinks. And check the regularity condition in Case 3 if $f$ is unusual.

### Summary
For $T(n) = aT(n/b) + f(n)$, compare $f(n)$ with the watershed $n^{\log_b a}$, the number of leaves. Polynomially smaller $f$: the leaves win, $\Theta(n^{\log_b a})$. Equal up to $\log^k n$: a tie, multiply by one more $\log n$. Polynomially larger and regular: the root wins, $\Theta(f(n))$. For $f(n) = n^d$, just compare $a$ with $b^d$.

@viz recursion-tree | Each recurrence here is one case of the master theorem.

:::explore
**What to try**
1. Select $T(n) = 3T(n/2) + n$. Compute $n^{\log_2 3} \approx n^{1.585}$, larger than $f(n) = n$: Case 1. Check that the leaf level carries the most work.
2. Select $T(n) = 2T(n/2) + n$: $n^{\log_2 2} = n = f(n)$, Case 2. Check that all levels cost the same.
3. Select $T(n) = 2T(n/2) + n^2$: $f$ beats $n^1$ polynomially, Case 3. Check that the root dominates.
4. Select $T(n) = T(n/2) + 1$: $a = 1 = 2^0 = b^d$, Case 2 with $d = 0$, giving $\Theta(\log n)$.

**What to notice:** the three cases are nothing more than the three tree shapes from the last lesson. The theorem's comparison of $f(n)$ with $n^{\log_b a}$ is a comparison of the root's work with the leaves' work.
:::

:::formulas
$$T(n) = a\,T(n/b) + f(n), \qquad c^* = \log_b a$$
$$f = O(n^{c^*-\varepsilon}) \Rightarrow T = \Theta(n^{c^*})$$
$$f = \Theta(n^{c^*}\log^k n) \Rightarrow T = \Theta(n^{c^*}\log^{k+1} n)$$
$$f = \Omega(n^{c^*+\varepsilon}),\; a f(n/b) \le c f(n),\, c < 1 \Rightarrow T = \Theta(f(n))$$
$$f = \Theta(n^d): \; a < b^d \Rightarrow \Theta(n^d), \quad a = b^d \Rightarrow \Theta(n^d\log n), \quad a > b^d \Rightarrow \Theta(n^{\log_b a})$$
:::

:::thm Master theorem (polynomial form)
Let $a \ge 1$, $b > 1$, $d \ge 0$ be constants and $T(n) = aT(n/b) + \Theta(n^d)$. Then $T(n) = \Theta(n^d)$ if $a < b^d$, $\Theta(n^d \log n)$ if $a = b^d$, and $\Theta(n^{\log_b a})$ if $a > b^d$.
:::

:::proof
In the recursion tree, level $i$ costs $a^i \cdot \Theta\big((n/b^i)^d\big) = \Theta(n^d) \cdot r^i$ with $r = a/b^d$, for $i = 0, \ldots, \log_b n$. So $T(n) = \Theta(n^d)\sum_{i=0}^{\log_b n} r^i$. If $r < 1$ the geometric sum is $\Theta(1)$, giving $\Theta(n^d)$. If $r = 1$ every term is 1 and there are $\log_b n + 1$ terms, giving $\Theta(n^d\log n)$. If $r > 1$ the sum is dominated by its last term $r^{\log_b n}$, so $T(n) = \Theta(n^d r^{\log_b n}) = \Theta\big(n^d \cdot a^{\log_b n}/n^d\big) = \Theta(a^{\log_b n}) = \Theta(n^{\log_b a})$.
:::

:::steps Solve $T(n) = 8T(n/2) + n^2$
1. $a = 8$, $b = 2$, $d = 2$. Compare $a = 8$ with $b^d = 4$.
2. $8 > 4$: leaves win.
3. $T(n) = \Theta(n^{\log_2 8}) = \Theta(n^3)$. (This is naive recursive matrix multiplication with 8 half-size products.)
:::

:::steps Solve $T(n) = 3T(n/4) + n\log n$
1. $n^{\log_4 3} \approx n^{0.79}$.
2. $f(n) = n \log n = \Omega(n^{0.79 + 0.2})$: polynomially larger.
3. Regularity: $3 \cdot \frac n4 \log\frac n4 \le \frac34 n\log n$, so $c = \frac34 < 1$.
4. Case 3: $T(n) = \Theta(n \log n)$.
:::

:::steps Solve $T(n) = 2T(n/2) + n\log n$
1. $n^{\log_2 2} = n$, and $f(n) = n\log n = \Theta(n \log^1 n)$.
2. Not polynomially larger than $n$, so not Case 3. It is Case 2 with $k = 1$.
3. $T(n) = \Theta(n \log^2 n)$.
:::

:::mock Exam question
Give $\Theta$ bounds, naming the case used. (a) $T(n) = 16T(n/4) + n$. (b) $T(n) = 16T(n/4) + n^2$. (c) $T(n) = 16T(n/4) + n^3$. (d) Can the master theorem solve $T(n) = 2T(n - 1) + 1$?
:::solution
$n^{\log_4 16} = n^2$. (a) $f = n$ is polynomially smaller: Case 1, $\Theta(n^2)$. (b) Equal: Case 2, $\Theta(n^2 \log n)$. (c) Larger, and $16(n/4)^3 = n^3/4 \le \frac14 n^3$: Case 3, $\Theta(n^3)$. (d) No: the size decreases by subtraction. Unrolling gives $2^n - 1$, $\Theta(2^n)$.
:::
:::

:::cs
The master theorem is the standard tool for analysing divide-and-conquer algorithms: merge sort ($n\log n$), binary search ($\log n$), Karatsuba multiplication ($n^{1.585}$), Strassen ($n^{2.807}$), closest pair of points ($n \log n$) and the FFT ($n\log n$).
:::

:::ml
Fast algorithms behind ML often come from beating a recurrence's leaf count. The FFT ($2T(n/2) + n$) makes long convolutions $\Theta(n \log n)$ instead of $\Theta(n^2)$. Fast matrix multiplication algorithms in the Strassen family reduce the exponent of the dominant cost in linear algebra, and recursive tree-building in gradient-boosted trees is analysed the same way.
:::

:::real
Splitting a big job between teams only pays off if you can combine the results cheaply. If a manager splits a task into 4 quarter-size tasks but then spends time proportional to $n^2$ combining them, the combining dominates ($a = 4 < 4^2 = 16$) and the splitting was pointless.
:::

:::quiz
? For $T(n) = 4T(n/2) + n$, what is $n^{\log_b a}$? Give the exponent.
= 2
> $\log_2 4 = 2$.

? $T(n) = 4T(n/2) + n$ is:
- $\Theta(n)$
- $\Theta(n \log n)$
+ $\Theta(n^2)$
> $a = 4 > 2^1$: leaves win.

? $T(n) = 2T(n/4) + \sqrt{n}$ is which case?
- Case 1
+ Case 2
- Case 3
> $n^{\log_4 2} = n^{1/2} = f(n)$: a tie, so $\Theta(\sqrt n \log n)$.

? $T(n) = T(n/2) + n$ is:
+ $\Theta(n)$
- $\Theta(\log n)$
- $\Theta(n\log n)$
> $a = 1 < 2^1$: the root wins.

? Why can't the master theorem (as stated) handle $T(n) = T(n/3) + T(2n/3) + n$?
+ the subproblems have different sizes
- $f(n)$ is not a polynomial
- $a < 1$
> It requires $a$ equal-size subproblems of size $n/b$.
:::

## Lesson: Divide and conquer {#divide-and-conquer}
@summary: Split a problem into smaller copies, solve them recursively, and combine the answers. Merge sort, quicksort, Karatsuba multiplication and counting inversions, with correctness by induction and running times from the master theorem.

### Big problems from small ones
Some problems look hard until you notice that half of the problem is just a smaller copy of the whole thing. Sorting a list of a million names is daunting, but if someone hands you two sorted lists of half a million names each, combining them into one sorted list is easy: repeatedly take whichever list's front name comes first. That observation is the heart of **divide and conquer**, one of the most powerful design patterns in computer science. It has three steps:
1. **Divide** the problem into smaller subproblems of the same kind.
2. **Conquer** each subproblem by solving it recursively (tiny ones are solved directly).
3. **Combine** the sub-answers into an answer for the whole problem.

### Imagine sorting exam papers
Imagine a teacher with a pile of 32 exam papers to sort by name. She splits the pile in two and gives each half to a teaching assistant. Each assistant splits their pile in two and passes the halves to two students, and so on, until each person holds a single paper, which is already sorted. Then the work flows back up: each pair of people merges their two sorted piles into one, handing it to the person above, until the teacher merges the final two piles of 16. No one ever does anything harder than merging two sorted piles, yet the whole stack ends up sorted.

### Merge sort and the merge step
Merging two sorted lists works by comparing their front elements and moving the smaller one to the output. Merge $[2, 5, 8]$ with $[3, 4, 9]$: compare 2 and 3, output 2; compare 5 and 3, output 3; compare 5 and 4, output 4; compare 5 and 9, output 5; compare 8 and 9, output 8; one list is empty, so copy 9. Result $[2, 3, 4, 5, 8, 9]$ with 5 comparisons. Each comparison outputs one element and the last element needs no comparison, so merging lists with $n$ elements in total takes at most $n - 1$ comparisons.

Merge sort splits the list into halves, sorts each half recursively, and merges. Its cost satisfies $T(n) = 2T(n/2) + \Theta(n)$, which the master theorem (Case 2) solves as $\Theta(n \log n)$. For $n$ a power of 2, the worst-case number of comparisons is exactly $n\log_2 n - n + 1$: for 8 elements, $24 - 8 + 1 = 17$. Compared with the $\frac{n(n-1)}{2}$ comparisons of insertion sort's worst case, this is a dramatic saving: for a million elements, about 20 million comparisons instead of 500 billion.

### Why it is correct: induction
Divide-and-conquer algorithms are proved correct by **strong induction** on the input size. For merge sort: a list of size 0 or 1 is already sorted (base case). For a larger list, assume merge sort correctly sorts every smaller list (induction hypothesis). Then both halves come back sorted, and the merge step, which always outputs the smallest remaining element, produces a sorted list containing exactly the original elements. So the algorithm is correct for size $n$. The same template, "assume the recursive calls work, show the combine step works", proves almost every recursive algorithm correct.

### Quicksort: do the work before recursing
Quicksort reverses the order of effort. It picks a **pivot** element, **partitions** the list into elements smaller than the pivot and elements larger, and recursively sorts the two parts. There is no combine step: once both parts are sorted, the list is sorted. The partition costs $n - 1$ comparisons. If the pivot always lands in the middle, $T(n) = 2T(n/2) + n = \Theta(n\log n)$. If the pivot is always the smallest element (for example, choosing the first element of an already sorted list), one part is empty and $T(n) = T(n - 1) + (n - 1) = \frac{n(n-1)}{2}$, which is $\Theta(n^2)$. With a random pivot, the expected number of comparisons is about $2n\ln n \approx 1.39\, n\log_2 n$, as we will prove in the randomized algorithms lesson. In practice quicksort is often the fastest sort because its partition step is simple and works in place.

### Karatsuba: fewer multiplications
Multiplying two $n$-digit numbers by the school method takes about $n^2$ single-digit multiplications. Split each number into a high half and a low half: $x = a \cdot 10^m + b$ and $y = c\cdot 10^m + d$. Then $xy = ac\cdot 10^{2m} + (ad + bc)\cdot 10^m + bd$, which seems to need four half-size products, giving $T(n) = 4T(n/2) + n = \Theta(n^2)$, no better. Karatsuba's insight in 1960 was that $ad + bc = (a + b)(c + d) - ac - bd$, so three products are enough. Try $12 \times 34$: $a = 1$, $b = 2$, $c = 3$, $d = 4$; $ac = 3$, $bd = 8$, $(a + b)(c + d) = 3 \times 7 = 21$, so $ad + bc = 21 - 3 - 8 = 10$, and $xy = 300 + 100 + 8 = 408$. The recurrence becomes $T(n) = 3T(n/2) + n = \Theta(n^{\log_2 3}) \approx \Theta(n^{1.585})$.

### Counting inversions
An **inversion** in a list is a pair of positions $i < j$ with the earlier element larger. The list $[3, 1, 2]$ has two inversions, $(3, 1)$ and $(3, 2)$. Counting all pairs takes $\Theta(n^2)$, but a modified merge sort counts them in $\Theta(n\log n)$: during the merge, whenever an element of the right half is output before the remaining elements of the left half, it forms an inversion with each of them. Inversion counts measure how similar two rankings are, which recommendation systems use to compare users' preferences.

### Common mistakes
A divide-and-conquer algorithm is only fast if the combine step is cheap and the subproblems are genuinely smaller by a constant factor. Splitting off one element at a time gives $T(n) = T(n-1) + n$, which is quadratic. Always handle the base case, or the recursion never stops. And check that the subproblems really are independent copies of the original problem; if they overlap heavily, dynamic programming is the better tool.

### Summary
Divide and conquer solves a problem by dividing it into smaller copies, solving those recursively, and combining the results. Correctness follows by strong induction, and running time from the recurrence $T(n) = aT(n/b) + f(n)$ and the master theorem. Merge sort and well-pivoted quicksort run in $\Theta(n\log n)$, Karatsuba multiplies in $\Theta(n^{1.585})$, and a merge-based count finds inversions in $\Theta(n\log n)$.

@viz sort | Compare merge sort and quicksort with the quadratic sorts by counting comparisons.

:::explore
**What to try**
1. Choose Merge and press Play with $n = 24$. Watch sorted runs of length 1, 2, 4, 8 being merged into longer runs, exactly the exam-paper picture.
2. Read the comparison count at the end and compare it with the readout's $n^2$ and $n\log_2 n$ values.
3. Choose Quick and play. The pivot splits the list and each side is sorted separately; there is no merge.
4. Choose Bubble or Insertion with the same $n$ and compare the counts. Increase $n$ to 64 and watch the gap widen.

**What to notice:** the divide-and-conquer sorts stay close to $n\log_2 n$ comparisons while bubble and insertion sort grow like $n^2$, just as the recurrences $2T(n/2) + n$ and $T(n-1) + n$ predict.
:::

:::formulas
$$\text{merge sort: } T(n) = 2T(n/2) + n - 1 \Rightarrow n\log_2 n - n + 1 \text{ comparisons } (n = 2^k)$$
$$\text{quicksort: best/average } \Theta(n\log n), \quad \text{worst } \frac{n(n-1)}{2}$$
$$\text{Karatsuba: } ad + bc = (a+b)(c+d) - ac - bd, \quad T(n) = 3T(n/2) + O(n) = \Theta(n^{\log_2 3})$$
$$\text{Strassen: } T(n) = 7T(n/2) + O(n^2) = \Theta(n^{\log_2 7})$$
:::

:::thm Correctness of merge sort
Merge sort returns the elements of its input in sorted order, for every input list.
:::

:::proof
Strong induction on the length $n$. Lists of length 0 or 1 are returned unchanged and are sorted. For $n \ge 2$, the halves have lengths less than $n$, so by the induction hypothesis the recursive calls return them sorted. The merge repeatedly outputs the smaller of the two front elements; since each list is sorted, this is the smallest element remaining overall. So the output is non-decreasing and contains every input element exactly once.
:::

:::steps Count the worst-case comparisons of merge sort on 16 elements
1. $n = 16$, $\log_2 16 = 4$.
2. Formula $n\log_2 n - n + 1 = 64 - 16 + 1 = 49$.
3. Check by recurrence: $C(1) = 0$, $C(2) = 1$, $C(4) = 2 + 3 = 5$, $C(8) = 10 + 7 = 17$, $C(16) = 34 + 15 = 49$.
:::

:::steps Multiply $23 \times 45$ with Karatsuba
1. $a = 2$, $b = 3$, $c = 4$, $d = 5$.
2. $ac = 8$, $bd = 15$, $(a + b)(c + d) = 5 \times 9 = 45$.
3. $ad + bc = 45 - 8 - 15 = 22$.
4. $xy = 8 \cdot 100 + 22 \cdot 10 + 15 = 800 + 220 + 15 = 1035$. Check: $23 \times 45 = 1035$.
:::

:::mock Exam question
(a) How many inversions does $[4, 3, 2, 1]$ have? (b) Quicksort always picks the first element as pivot. How many comparisons does it make on the already sorted list $[1, 2, \ldots, 10]$? (c) A divide-and-conquer algorithm splits into 5 subproblems of size $n/2$ with linear combining. Give its running time.
:::solution
(a) Every pair is inverted: $\binom{4}{2} = 6$. (b) Each partition of $k$ elements makes $k - 1$ comparisons and removes only the pivot: $9 + 8 + \cdots + 1 = 45$. (c) $T(n) = 5T(n/2) + n$; $5 > 2$, so $\Theta(n^{\log_2 5}) \approx \Theta(n^{2.32})$.
:::
:::

:::cs
Divide and conquer underlies merge sort (used in Python's Timsort and Java's object sort), quicksort (C's qsort, C++ introsort), binary search, the FFT, closest-pair algorithms in computational geometry and big-integer multiplication in cryptography libraries. MapReduce and parallel computing frameworks are divide and conquer spread across many machines.
:::

:::ml
Training on huge datasets uses divide and conquer: gradients are computed on shards of the data in parallel and combined by summation (an all-reduce, itself a tree of pairwise combines). Decision-tree learning recursively splits the data, and hierarchical clustering can be run top-down by splitting clusters recursively.
:::

:::real
Finding a word in a dictionary, searching for a bug by testing the middle commit of a history ("git bisect"), and guessing a number between 1 and 100 by asking "higher or lower?" all halve the problem each step, reaching the answer in about $\log_2$ of the size.
:::

:::quiz
? Merging two sorted lists of total length 10 takes at most how many comparisons?
= 9
> Each comparison outputs one element and the final one needs none: $n - 1$.

? Merge sort's recurrence is:
+ $T(n) = 2T(n/2) + \Theta(n)$
- $T(n) = T(n-1) + \Theta(n)$
- $T(n) = 2T(n/2) + \Theta(1)$
> Two half-size calls and a linear merge.

? How many half-size multiplications does Karatsuba use?
= 3
> $ac$, $bd$ and $(a+b)(c+d)$.

? What is the worst-case running time of quicksort?
- $\Theta(n\log n)$
+ $\Theta(n^2)$
- $\Theta(n)$
> Unbalanced pivots give $T(n) = T(n-1) + n$.

? How many inversions does $[2, 1, 3, 5, 4]$ have?
= 2
> $(2,1)$ and $(5,4)$.
:::

# Unit: Lower bounds, amortized and probabilistic analysis

## Lesson: The lower bound for comparison sorting {#sorting-lower-bound}
@summary: Why no algorithm that sorts by comparing pairs can beat n log n comparisons in the worst case: decision trees, the n! leaves argument, Stirling's estimate, and how counting and radix sort escape the bound.

### Can we sort faster?
Merge sort makes about $n\log_2 n$ comparisons. People have invented hundreds of sorting algorithms, and none of the comparison-based ones do better than that in the worst case. Is that because nobody has been clever enough, or because it is impossible? This lesson proves it is impossible. That is a different kind of result from anything so far. Until now we have analysed specific algorithms and shown upper bounds: "this algorithm takes at most so many steps". A **lower bound** says something about *every* algorithm for a problem, including ones nobody has invented yet: "any algorithm must take at least so many steps". Lower bounds tell us when to stop searching for a faster method.

:::def Comparison sort
A sorting algorithm that learns about the order of its input only by comparing pairs of elements, asking questions of the form "is $a_i < a_j$?". Merge sort, quicksort, heapsort and insertion sort are all comparison sorts.
:::

### Imagine a game of twenty questions
Imagine a friend has secretly put three cards labelled A, B and C into some order, and you must find the order by asking yes-or-no questions of the form "is A before B?". There are $3! = 6$ possible orders. Each answer at best cuts the remaining possibilities in half. After one question you might still have 3 possibilities, after two questions at least 2 in the worst case, so you need a third question. No strategy can always succeed with 2 questions, because 2 questions have only $2^2 = 4$ possible answer patterns, fewer than the 6 orders you must tell apart. Sorting is exactly this game: an algorithm must identify which of the $n!$ orderings its input is in.

### Decision trees
Any comparison sort, run on inputs of size $n$, can be drawn as a **decision tree**. Each internal node is a comparison "$a_i < a_j$?", with a left branch for yes and a right branch for no. Each leaf is a final answer: a permutation saying how to rearrange the input. Running the algorithm on a particular input means following one path from the root to a leaf, and the number of comparisons made is the length of that path. So the algorithm's **worst-case** number of comparisons is the **height** of its tree.

:::def Decision tree
A binary tree modelling a comparison algorithm on inputs of a fixed size: internal nodes are comparisons, branches are their outcomes, and leaves are outputs. The worst-case number of comparisons equals the height of the tree.
:::

For a correct sorting algorithm, every one of the $n!$ input orders needs a different output, so the tree must have at least $n!$ leaves. Now use a simple fact about binary trees: a binary tree of height $h$ has at most $2^h$ leaves, because the number of nodes at most doubles at each level. So $2^h \ge n!$, which means
$$h \ge \log_2(n!).$$

### How big is $\log_2(n!)$?
For small $n$ we can just compute it. For $n = 3$: $\log_2 6 \approx 2.58$, so at least 3 comparisons. For $n = 4$: $\log_2 24 \approx 4.58$, so at least 5. For $n = 10$: $10! = 3{,}628{,}800$ and $\log_2(10!) \approx 21.8$, so at least 22 comparisons. Merge sort on 4 elements uses at most 5, so it is optimal there.

For large $n$, here is a quick lower estimate. The product $n! = 1 \cdot 2 \cdots n$ contains at least $n/2$ factors that are each at least $n/2$ (the top half), so $n! \ge (n/2)^{n/2}$ and
$$\log_2(n!) \ge \frac n2 \log_2 \frac n2 = \Omega(n\log n).$$
And clearly $n! \le n^n$, so $\log_2(n!) \le n\log_2 n$. Together, $\log_2(n!) = \Theta(n\log n)$. A sharper approximation comes from **Stirling's formula** $n! \approx \sqrt{2\pi n}\,(n/e)^n$, giving $\log_2(n!) \approx n\log_2 n - 1.44n$.

### What the theorem means
Every comparison sort makes $\Omega(n\log n)$ comparisons in the worst case. Merge sort and heapsort achieve $O(n\log n)$, so they are **asymptotically optimal**: no comparison sort can beat them by more than a constant factor. The argument also works for the average case: a binary tree with $n!$ leaves has average leaf depth at least $\log_2(n!)$, so even on random inputs the average is $\Omega(n\log n)$. That is why quicksort's average of $1.39\,n\log_2 n$ cannot be improved to $o(n\log n)$.

### Escaping the bound
The lower bound only applies to algorithms that learn about the input *only by comparisons*. If we know more about the keys, we can do better. **Counting sort** sorts $n$ integers in the range $0$ to $k - 1$ by counting how many times each value appears and then writing the values out in order, in $\Theta(n + k)$ time. To sort exam scores from 0 to 100 for 10,000 students, it uses about 10,100 steps, far fewer than $n\log_2 n \approx 133{,}000$. **Radix sort** sorts $d$-digit numbers by running a stable counting sort on each digit from least to most significant, in $\Theta(d(n + k))$. These algorithms never compare two keys; they use the keys as array indices, which is information a comparison sort does not have.

### The same idea elsewhere
The counting-leaves argument gives other lower bounds. Searching a sorted list of $n$ items by comparisons has $n + 1$ possible outcomes (found at one of $n$ positions, or absent), so any algorithm needs at least $\lceil\log_2(n + 1)\rceil$ comparisons in the worst case, and binary search achieves this. Finding the maximum of $n$ items needs $n - 1$ comparisons for a different reason: every element except the maximum must lose at least one comparison, and each comparison has only one loser.

### Common mistakes
The bound is on *comparisons* in the *comparison model*. It does not say sorting always takes $n\log n$ time: counting and radix sort are faster on suitable keys. It is also a worst-case (or average-case) bound; on a sorted input, insertion sort makes only $n - 1$ comparisons, which is not a contradiction. And remember the direction of the logic: we bound the height of *every* possible decision tree, not just those of known algorithms.

### Summary
A comparison sort on $n$ elements is a binary decision tree whose leaves include all $n!$ orderings. A binary tree of height $h$ has at most $2^h$ leaves, so the worst-case number of comparisons is at least $\log_2(n!) = \Theta(n\log n)$. Merge sort and heapsort meet this bound, while counting and radix sort avoid it by using the values of the keys rather than comparisons.

@viz counting | Count the orderings of n items: the number of leaves every sorting decision tree must have.

:::explore
**What to try**
1. Keep "Order matters (permutations)" selected and set both $n$ and $k$ to 3. The count is $3! = 6$: a sorting tree for 3 elements needs at least 6 leaves, and $2^2 = 4 < 6 \le 8 = 2^3$, so it needs height at least 3.
2. Set $n = k = 4$: 24 orderings. Since $2^4 = 16 < 24 \le 32 = 2^5$, at least 5 comparisons are needed.
3. Set $n = k = 6$: 720 orderings, and $2^9 = 512 < 720 \le 1024$, so at least 10 comparisons.
4. Notice how fast $n!$ grows compared with $2^h$ for small $h$.

**What to notice:** each comparison can at most double the number of distinguishable outcomes, so the minimum number of comparisons is $\lceil \log_2(n!) \rceil$. Watching $n!$ grow shows why this is about $n\log_2 n$.
:::

:::formulas
$$\text{leaves} \ge n!, \qquad \text{leaves} \le 2^h \;\Rightarrow\; h \ge \lceil \log_2 n! \rceil$$
$$\frac n2\log_2\frac n2 \le \log_2(n!) \le n\log_2 n, \qquad \log_2(n!) = \Theta(n\log n)$$
$$n! \approx \sqrt{2\pi n}\left(\frac ne\right)^n, \qquad \log_2(n!) \approx n\log_2 n - 1.44\,n$$
$$\text{counting sort: } \Theta(n + k), \qquad \text{radix sort: } \Theta(d(n+k))$$
:::

:::thm Comparison-sorting lower bound
Every comparison-based sorting algorithm makes at least $\lceil\log_2(n!)\rceil = \Omega(n\log n)$ comparisons in the worst case on inputs of size $n$.
:::

:::proof
Fix $n$ and draw the algorithm's decision tree. The $n!$ orderings of distinct input values require pairwise different outputs, so they reach different leaves: there are at least $n!$ leaves. A binary tree of height $h$ has at most $2^h$ leaves (by induction: level $i$ has at most $2^i$ nodes). Hence $2^h \ge n!$ and $h \ge \log_2(n!)$, and since $h$ is an integer, $h \ge \lceil \log_2(n!)\rceil$. Finally $n! \ge (n/2)^{n/2}$ gives $\log_2(n!) \ge \frac n2\log_2\frac n2 = \Omega(n\log n)$.
:::

:::steps Lower bound for sorting 5 elements
1. $5! = 120$ orderings, so at least 120 leaves.
2. $2^6 = 64 < 120 \le 128 = 2^7$.
3. Height at least 7: every comparison sort needs 7 comparisons in the worst case for 5 elements. (An optimal algorithm achieving exactly 7 exists.)
:::

:::steps Compare the bound with merge sort for $n = 8$
1. $8! = 40320$, $\log_2 40320 \approx 15.3$, so at least 16 comparisons.
2. Merge sort's worst case for $n = 8$ is $n\log_2 n - n + 1 = 17$.
3. Merge sort is within 1 comparison of the information-theoretic bound here.
:::

:::mock Exam question
(a) Using a decision tree, find the minimum worst-case number of comparisons to sort 4 elements. (b) A company says its new comparison sort sorts any $n$ items with at most $10n$ comparisons. Explain why this is false for large $n$. (c) You must sort a million integers between 0 and 999. Which algorithm would you use and how many basic steps does it take, roughly?
:::solution
(a) $4! = 24$ leaves, $2^4 = 16 < 24 \le 32$, so 5. (b) Worst case needs $\log_2(n!) \approx n\log_2 n - 1.44n$, which exceeds $10n$ once $\log_2 n > 11.44$, i.e. $n$ above about 2800. (c) Counting sort with $k = 1000$: about $n + k \approx 1{,}001{,}000$ steps, less than the $\approx 2 \times 10^7$ needed by any comparison sort.
:::
:::

:::cs
Lower bounds guide library design: standard libraries use $O(n\log n)$ comparison sorts for general data because nothing better is possible, but switch to radix or counting sort for fixed-width integers and strings (as GPUs and database engines do). The same information-counting argument shows that a balanced search tree's $\log n$ lookup is optimal among comparison-based dictionaries.
:::

:::ml
The argument "$h$ yes/no questions distinguish at most $2^h$ cases" is the basic idea of information theory: identifying one of $N$ equally likely outcomes needs $\log_2 N$ bits. It is why a decision tree classifier separating $K$ classes needs depth at least $\log_2 K$, and why entropy, measured in bits, appears in cross-entropy losses.
:::

:::real
In a knockout tennis tournament of 64 players, finding the champion takes 63 matches, since every player except the champion must lose exactly once. But fairly ranking all 64 players from best to worst would need at least $\log_2(64!) \approx 296$ matches.
:::

:::quiz
? How many leaves must a decision tree for sorting 4 elements have, at least?
= 24
> One for each of the $4! = 24$ orderings.

? What is the minimum worst-case number of comparisons to sort 3 elements?
= 3
> $\lceil\log_2 6\rceil = 3$.

? A binary tree of height 10 has at most how many leaves?
= 1024
> $2^{10}$.

? Counting sort beats the $n\log n$ bound because:
+ it does not compare keys; it uses them as indices
- it is a comparison sort with a clever pivot
- the bound only applies to the average case
> The lower bound only applies to the comparison model.

? Which is true of $\log_2(n!)$?
- $\Theta(n)$
+ $\Theta(n\log n)$
- $\Theta(n^2)$
> It lies between $\frac n2\log_2\frac n2$ and $n\log_2 n$.
:::

## Lesson: Amortized analysis {#amortized-analysis}
@summary: When an operation is usually cheap but occasionally expensive, average the cost over a whole sequence of operations. The aggregate, accounting and potential methods, applied to dynamic arrays, binary counters and stacks.

### Expensive sometimes, cheap on average
A list in Python or a vector in C++ lets you append items forever, even though memory is allocated in fixed-size blocks. How? The list keeps an array with some spare room. Most appends just drop the new item into the next free slot, which costs one step. But when the array is full, the list allocates a new array twice as big and copies every item across, which costs as many steps as there are items. One append might cost a million steps. Does that make appending slow? Intuitively no, because the expensive appends are rare, and after each one there is plenty of room for many cheap appends. **Amortized analysis** makes this intuition precise: instead of the worst cost of a single operation, it bounds the *total* cost of any sequence of $n$ operations, and divides by $n$.

:::def Amortized cost
An operation has amortized cost $c$ if every sequence of $n$ operations, starting from the initial state, costs at most $c \cdot n$ in total. Individual operations may cost more, as long as the total stays within the bound.
:::

Amortized cost is a *guarantee about every sequence*, not an average over random inputs. No probability is involved: even an adversary choosing the worst possible sequence cannot make the total exceed $cn$.

### Imagine a monthly travel pass
Imagine paying for a monthly train pass. On the first of the month you pay a lot, and every other day the train costs you nothing. Is commuting expensive? Spread over the month, the cost per day is modest. The accountant's way of thinking is to set aside a little money every day so that the big payment is already covered when it comes. Amortized analysis uses exactly this idea for algorithms, and it even borrows the accountant's word: to *amortize* a cost is to spread it over time.

### Method 1: the aggregate method
Compute the total cost of $n$ operations directly and divide by $n$. For the doubling array, start with capacity 1. Appending the items numbered $1, 2, 3, 5, 9, 17, \ldots$ (one more than a power of 2) triggers a copy of $1, 2, 4, 8, 16, \ldots$ items. Over $n$ appends, the copies cost at most $1 + 2 + 4 + \cdots + 2^k$ where $2^k < n$, a geometric sum less than $2n$. Adding 1 step for writing each new item, the total is less than $3n$. So the amortized cost of an append is at most 3: constant, even though a single append can cost $\Theta(n)$. For example, 16 appends cost $16$ writes plus $1 + 2 + 4 + 8 = 15$ copies, total 31, under $3 \times 16 = 48$.

Compare growing by a fixed amount instead of doubling. If the array grows by 10 slots each time, there are about $n/10$ resizes, copying $10, 20, 30, \ldots$ items, a total of about $\frac{n^2}{20}$. That is quadratic: a million appends would copy about 50 billion items. The geometric growth is what makes the analysis work, because a geometric sum is dominated by its last term.

### A second example: the binary counter
A $k$-bit binary counter starts at 0 and is incremented $n$ times. An increment flips the trailing 1s to 0 and the next 0 to 1: from 0111 to 1000 flips 4 bits. In the worst case one increment flips all $k$ bits. But in aggregate, bit 0 flips every increment, bit 1 every second increment, bit 2 every fourth, and so on. The total number of flips is at most $n + \frac n2 + \frac n4 + \cdots < 2n$. Counting from 0 to 8 flips $1 + 2 + 1 + 3 + 1 + 2 + 1 + 4 = 15$ bits, less than 16. So an increment costs at most 2 amortized.

### Method 2: the accounting method
Charge each operation a fixed fee, possibly more than its real cost, and store the surplus as **credit** attached to parts of the data structure. Expensive operations are paid for by spending stored credit. The analysis is valid if the credit never goes negative. For the counter, charge 2 for each increment: 1 pays for setting a single bit from 0 to 1, and 1 is left on that bit as credit. Later, when the bit is reset from 1 to 0, its stored credit pays. Every 1 bit always carries a credit, so the account never goes negative, and the amortized cost is 2.

### Method 3: the potential method
The potential method replaces credits with a single number $\Phi$, the **potential** of the data structure, like stored energy. Define the amortized cost of operation $i$ as
$$\hat c_i = c_i + \Phi_i - \Phi_{i-1},$$
the actual cost plus the change in potential. Summing over $n$ operations, the potential terms telescope:
$$\sum_{i=1}^n \hat c_i = \sum_{i=1}^n c_i + \Phi_n - \Phi_0.$$
If $\Phi_n \ge \Phi_0$, the total actual cost is at most the total amortized cost. For the counter, let $\Phi$ be the number of 1 bits. An increment that resets $t$ ones and sets one zero has actual cost $t + 1$ and changes $\Phi$ by $1 - t$, so its amortized cost is $(t + 1) + (1 - t) = 2$, whatever $t$ is. For the doubling array, $\Phi = 2\cdot\text{size} - \text{capacity}$ works: a cheap append raises $\Phi$ by 2 (amortized cost 3), and an append that doubles a full array of size $m$ costs $m + 1$ but drops $\Phi$ from $m$ to 2, giving amortized cost $m + 1 + 2 - m = 3$.

### Common mistakes
Amortized is not average case: average-case analysis assumes random inputs and can be broken by a bad input, while an amortized bound holds for every sequence. Amortized bounds also say nothing about the latency of a single operation; a real-time system that cannot tolerate a single slow step may need a different design. In the potential method, check that the potential starts at zero (or its minimum) and never falls below its starting value, or the telescoping argument fails.

### Summary
Amortized analysis bounds the total cost of a sequence of operations, guaranteeing a cost per operation on average over the sequence even when single operations are expensive. The aggregate method sums the total directly, the accounting method prepays expensive operations with credits stored by cheap ones, and the potential method uses a function $\Phi$ with amortized cost $c_i + \Delta\Phi$. Doubling arrays, binary counters and multipop stacks all have $O(1)$ amortized cost per operation.

@viz sequence | A geometric sequence with ratio 2 is the list of copy costs of a doubling array.

:::explore
**What to try**
1. Choose geometric, set the first term $a = 1$ and the ratio to 2. The terms $1, 2, 4, 8, \ldots$ are the copy costs at each resize of a doubling array.
2. Notice that each term is one more than the sum of all the earlier terms: $8 = 1 + 2 + 4 + 1$. The total of all copies is less than twice the last term, which is less than $2n$.
3. Set the ratio to 1.5 (a common growth factor in real libraries). The terms grow more slowly but still geometrically, so total copying is still linear in $n$, about $3n$.
4. Choose arithmetic with a common difference: this models growing by a fixed number of slots. The costs grow linearly, so their total grows quadratically.

**What to notice:** geometric growth keeps the total copy cost proportional to the final size, so each append is $O(1)$ amortized. Arithmetic growth makes the total quadratic, the mistake described in the article.
:::

:::formulas
$$\text{amortized cost} = \frac{\text{total cost of any } n \text{ operations}}{n}$$
$$\hat c_i = c_i + \Phi_i - \Phi_{i-1}, \qquad \sum_i c_i = \sum_i \hat c_i - (\Phi_n - \Phi_0) \le \sum_i \hat c_i \text{ if } \Phi_n \ge \Phi_0$$
$$\text{doubling array: } \sum_{j=0}^{k} 2^j < 2n \Rightarrow \text{total} < 3n$$
$$\text{binary counter: } \sum_{j \ge 0} \left\lfloor \frac{n}{2^j} \right\rfloor < 2n \text{ flips}$$
:::

:::thm Dynamic array appends
For an array that doubles its capacity when full, starting from capacity 1, any sequence of $n$ appends costs less than $3n$ elementary steps, so each append is $O(1)$ amortized.
:::

:::proof
Each append writes one item: $n$ steps. Resizes happen when the size reaches $1, 2, 4, \ldots, 2^k$ with $2^k < n$, copying that many items. The copying totals $\sum_{j=0}^{k} 2^j = 2^{k+1} - 1 < 2n$. So the total is less than $n + 2n = 3n$.
:::

:::steps A stack supports push (cost 1) and multipop(k), which pops min(k, size) items at cost 1 each. Find the amortized cost.
1. A single multipop can cost up to $n$.
2. Aggregate: each item can be popped at most once after being pushed, so the total number of pops over any sequence is at most the number of pushes, at most $n$.
3. Total cost of $n$ operations $\le 2n$: amortized $O(1)$ per operation.
4. Potential view: $\Phi$ = stack size. Push: $1 + 1 = 2$. Multipop of $m$ items: $m - m = 0$.
:::

:::steps Count the total cost of 33 appends to a doubling array starting at capacity 1
1. Writes: 33.
2. Resizes copy $1, 2, 4, 8, 16, 32$ items (when appending items 2, 3, 5, 9, 17, 33): total $63$.
3. Total $33 + 63 = 96$, an average of $96/33 \approx 2.9$ per append, below 3.
:::

:::mock Exam question
A binary counter starts at 0 and is incremented 16 times. (a) What is the largest number of bits flipped by a single increment in this sequence? (b) What is the exact total number of bit flips? (c) Using the potential $\Phi$ = number of 1 bits, show the amortized cost of an increment is 2.
:::solution
(a) Going from 15 (01111) to 16 (10000) flips 5 bits. (b) Bit $j$ flips $\lfloor 16/2^j\rfloor$ times: $16 + 8 + 4 + 2 + 1 = 31$. (c) An increment resetting $t$ ones costs $t + 1$ and changes $\Phi$ by $1 - t$; the amortized cost is $(t + 1) + (1 - t) = 2$. Since $\Phi \ge 0 = \Phi_0$, the total of 16 increments is at most 32, and indeed $31 \le 32$.
:::
:::

:::cs
Amortized analysis justifies the $O(1)$ append of Python lists, C++ vectors and Java ArrayLists, the $O(1)$ expected-amortized insert of hash tables that rehash when they grow, splay trees and the near-constant union-find with path compression ($O(\alpha(n))$ amortized). Garbage collectors and log-structured storage are also analysed this way.
:::

:::ml
Deep learning frameworks reuse memory pools that grow geometrically, so allocating tensors is cheap on average. Data loaders that buffer batches, and replay buffers in reinforcement learning, are dynamic arrays or ring buffers whose costs are amortized in the same way.
:::

:::real
A household that sets aside a little money each month for a yearly insurance bill is using the accounting method: the monthly "credit" pays for the rare expensive event, so no month is ever short.
:::

:::quiz
? What is the amortized cost per append for a doubling array, at most?
= 3
> Total cost of $n$ appends is under $3n$.

? Counting from 0 up to 8 with a binary counter flips how many bits in total?
= 15
> $1 + 2 + 1 + 3 + 1 + 2 + 1 + 4 = 15$.

? If an array grows by a fixed 100 slots whenever it is full, the total cost of $n$ appends is:
- $\Theta(n)$
- $\Theta(n\log n)$
+ $\Theta(n^2)$
> The copies cost $100 + 200 + 300 + \cdots$, an arithmetic series of about $n/100$ terms.

? Amortized analysis assumes the input is random.
- true
+ false
> It bounds the total cost of every sequence, with no probability.

? In the potential method, an operation with actual cost 5 that decreases the potential by 3 has amortized cost:
= 2
> $\hat c = c + \Delta\Phi = 5 - 3 = 2$.
:::

## Lesson: Probabilistic analysis and indicator variables {#probabilistic-analysis}
@summary: Average-case analysis with probability: expected values, indicator random variables and linearity of expectation, applied to the hiring problem, random permutations, the birthday problem, hashing and coupon collecting.

### Averages over random inputs
Worst-case analysis is pessimistic: it assumes the input is always the nastiest possible. Sometimes it is more useful to ask how an algorithm behaves *on average* when its input is random, for example a list in a random order or keys that hash to random slots. This is **probabilistic analysis**. Its answer is an **expected value**: the long-run average of the running time over many random inputs. This lesson builds the main tool, indicator random variables combined with linearity of expectation, which turns many hard-looking counting problems into one-line calculations.

:::def Expected value
For a random variable $X$ taking values $x$ with probabilities $P(X = x)$, the expected value is $E[X] = \sum_x x\, P(X = x)$, the probability-weighted average of its values.
:::

### Imagine hiring an assistant
Suppose you interview $n$ candidates for a job, one per day, in a random order. After each interview, if the candidate is better than everyone you have seen so far, you immediately fire your current assistant and hire the new one, paying a hiring fee each time. In the worst case (candidates arrive from worst to best) you hire all $n$. But if the order is random, how many times do you expect to hire?

Here is the trick. Let $X_i$ be 1 if candidate $i$ is hired and 0 otherwise. Then the number of hires is $X = X_1 + X_2 + \cdots + X_n$. Candidate $i$ is hired exactly when they are the best of the first $i$ candidates, and in a random order each of those $i$ candidates is equally likely to be the best, so $P(X_i = 1) = \frac1i$. Therefore
$$E[X] = \sum_{i=1}^n E[X_i] = \sum_{i=1}^n \frac1i = H_n \approx \ln n.$$
With 100 candidates you expect only about $H_{100} \approx 5.19$ hires, not 100.

### Indicator random variables
:::def Indicator random variable
For an event $A$, the indicator $I_A$ is 1 if $A$ happens and 0 otherwise. Its expected value is the probability of the event: $E[I_A] = 1\cdot P(A) + 0 \cdot P(\text{not } A) = P(A)$.
:::

Indicators are useful because many quantities we want to count are sums of yes/no events: the number of hires, the number of pairs that collide, the number of elements out of place. Write the count as a sum of indicators, find each probability, and add.

### Linearity of expectation
The step that made the hiring problem easy was $E[X_1 + \cdots + X_n] = E[X_1] + \cdots + E[X_n]$. This is **linearity of expectation**, and the remarkable thing is that it holds *even when the variables are dependent*. Whether candidate 5 is hired is related to whether candidate 4 was, yet we could simply add the probabilities. This is what makes indicator arguments so powerful: you never need the complicated joint distribution.

### Example: fixed points of a random shuffle
Shuffle $n$ cards labelled $1$ to $n$. How many cards do we expect to land in their original position? Let $X_i$ indicate that card $i$ is in position $i$; that happens with probability $\frac1n$. So $E[X] = n \cdot \frac1n = 1$. Whether you shuffle 3 cards or a million, on average exactly one card stays in place. In the classic "hat-check" story, if $n$ people get their hats back at random, on average one person gets their own hat.

### Example: the birthday problem
In a room of $k$ people with birthdays uniformly random over 365 days, how many pairs share a birthday? There are $\binom k2$ pairs, and each pair matches with probability $\frac1{365}$. So the expected number of matching pairs is $\binom k2 / 365$. For $k = 23$, that is $253/365 \approx 0.69$, and for $k = 28$ it is $378/365 \approx 1.04$. The probability that *at least one* pair matches is $1 - \frac{365}{365}\cdot\frac{364}{365}\cdots\frac{365 - k + 1}{365}$, which first exceeds $\frac12$ at $k = 23$ (about 0.507). The surprise is that the number of *pairs* grows like $k^2$, so collisions appear long before $k$ approaches 365.

### Example: hashing with chaining
A hash table with $m$ slots stores $n$ keys, each hashed to a uniformly random slot, with colliding keys kept in a list in that slot. For a particular slot, let $X_j$ indicate that key $j$ lands there, with probability $\frac1m$. The expected list length is $\frac nm = \alpha$, the **load factor**. A search for a key not in the table scans one list, expected length $\alpha$, so its expected cost is $\Theta(1 + \alpha)$. Keep $\alpha$ bounded (for example by doubling the table when $\alpha$ exceeds 1) and searches take expected constant time.

### Waiting times and the coupon collector
If each trial succeeds with probability $p$, the number of trials until the first success is **geometric** with $E = \frac1p$. Rolling a die until you see a six takes 6 rolls on average. Now suppose you want to see *all six faces*. After you have seen $j$ distinct faces, each roll shows a new face with probability $\frac{6-j}{6}$, so the wait for the next new face averages $\frac{6}{6 - j}$. Adding these by linearity, the expected total is $6\left(\frac16 + \frac15 + \cdots + 1\right) = 6H_6 = 14.7$ rolls. In general collecting all $n$ coupons takes $nH_n \approx n\ln n$ draws.

### From expectation to likely behaviour
An expected value does not tell you how spread out the outcomes are. **Markov's inequality** gives a basic guarantee: for a non-negative random variable $X$ and any $a > 0$, $P(X \ge a) \le \frac{E[X]}{a}$. If a randomized search takes 10 steps on average, the chance that it takes 100 or more steps is at most $\frac{10}{100} = 10\%$. Stronger tail bounds (Chebyshev and Chernoff) show that sums of many independent indicators are very likely to be close to their expectation.

### Common mistakes
Probabilistic analysis needs an assumption about the input distribution, and if real inputs are not random (for example, already sorted lists), the analysis may not apply; the next lesson fixes this by putting the randomness inside the algorithm. Do not multiply probabilities of dependent events as if they were independent, but remember that adding expectations never requires independence. And $E[X^2] \ne E[X]^2$ in general, and $E[1/X] \ne 1/E[X]$.

### Summary
Probabilistic analysis computes expected costs on random inputs. Write the quantity as a sum of indicator variables, use $E[I_A] = P(A)$, and add by linearity of expectation, which works even for dependent events. This gives $H_n \approx \ln n$ hires, one fixed point per shuffle, $\binom k2/365$ shared birthdays, expected chain length $n/m$ in hashing and $nH_n$ draws to collect $n$ coupons.

@viz sigma term=inv n=10 | The harmonic sum: the expected number of hires, one term per candidate.

:::explore
**What to try**
1. With term $1/i$ and $n = 10$, each bar is $P(\text{candidate } i \text{ is hired}) = \frac1i$. Read the total: $H_{10} \approx 2.93$ expected hires among 10 candidates.
2. Increase $n$ to 12. The total barely moves (about 3.10): later candidates are rarely the best so far.
3. Set $n = 6$ and multiply the total ($H_6 = 2.45$) by 6: about 14.7, the expected number of die rolls to see every face.
4. Switch to the term 1 for comparison: that is the worst case, where every candidate is hired.

**What to notice:** linearity lets us add one small probability per candidate, and the slowly growing harmonic sum shows why random order is so much cheaper than the worst case.
:::

:::formulas
$$E[X] = \sum_x x\,P(X = x), \qquad E[I_A] = P(A)$$
$$E[X + Y] = E[X] + E[Y] \text{ (always)}, \qquad E[cX] = cE[X]$$
$$\text{hiring: } E[\text{hires}] = H_n \approx \ln n, \qquad \text{fixed points: } E = 1$$
$$\text{birthday: } E[\text{matching pairs}] = \binom k2\frac1{365}, \qquad \text{hashing: } E[\text{chain}] = \frac nm = \alpha$$
$$\text{geometric: } E = \frac1p, \qquad \text{coupon collector: } E = nH_n, \qquad P(X \ge a) \le \frac{E[X]}a$$
:::

:::thm Linearity of expectation
For any random variables $X$ and $Y$ (independent or not) with finite expectations, $E[X + Y] = E[X] + E[Y]$.
:::

:::proof
For discrete variables, $E[X + Y] = \sum_{x,y}(x + y)P(X = x, Y = y) = \sum_{x,y} x P(X = x, Y = y) + \sum_{x,y} y P(X = x, Y = y)$. Summing the joint probabilities over $y$ gives $P(X = x)$, and over $x$ gives $P(Y = y)$, so this equals $\sum_x xP(X = x) + \sum_y yP(Y = y) = E[X] + E[Y]$. No independence was used.
:::

:::steps Expected number of hires among 4 candidates in random order
1. $P(\text{candidate } i \text{ hired}) = \frac1i$.
2. $E = 1 + \frac12 + \frac13 + \frac14 = \frac{12 + 6 + 4 + 3}{12} = \frac{25}{12}$.
3. About 2.08 hires, versus 4 in the worst case.
:::

:::steps Expected number of empty slots when 10 keys hash into 10 slots
1. Let $Y_s$ indicate that slot $s$ is empty: every key misses it, probability $(1 - \frac1{10})^{10} = 0.9^{10} \approx 0.349$.
2. By linearity, $E[\text{empty}] = 10 \times 0.349 \approx 3.49$.
3. So about a third of the slots are empty even at load factor 1, close to the limit $e^{-1} \approx 0.368$.
:::

:::mock Exam question
A list of $n$ distinct numbers is in random order. An **inversion** is a pair $i < j$ with $a_i > a_j$. (a) What is the probability that a given pair is an inversion? (b) What is the expected number of inversions? (c) Insertion sort makes about one comparison per inversion plus $n - 1$. Estimate its average number of comparisons for $n = 100$.
:::solution
(a) By symmetry, either element of the pair is equally likely to be larger: $\frac12$. (b) $\binom n2 \cdot \frac12 = \frac{n(n-1)}{4}$. (c) $\frac{100 \cdot 99}{4} = 2475$ inversions, so about $2475 + 99 = 2574$ comparisons, roughly half the worst case of 4950: still $\Theta(n^2)$.
:::
:::

:::cs
Hash tables, caches, load balancers and peer-to-peer networks are all designed using these calculations. The birthday bound explains why a 64-bit hash starts producing collisions after about $2^{32}$ items, why cryptographic hashes need 256 bits, and why randomly generated IDs need enough bits to avoid clashes.
:::

:::ml
Expected values and indicators are everyday ML tools: the expected number of misclassified points is the sum of per-point error probabilities, dropout keeps each unit with probability $p$ so the expected number of active units is $pn$, and stochastic gradient descent uses the fact that a random mini-batch gradient has expectation equal to the full gradient (linearity of expectation again).
:::

:::real
Collecting all the stickers in a set of 50 by buying random packs of one takes on average $50 H_{50} \approx 225$ stickers, which is why the last few stickers always seem to take forever.
:::

:::quiz
? What is the expected number of fixed points of a random permutation of 52 cards?
= 1
> Each card stays put with probability $\frac1{52}$, and there are 52 cards.

? What is $E[I_A]$ if $P(A) = 0.3$?
= 0.3|3/10
> The expectation of an indicator is the probability of its event.

? Expected number of rolls of a fair die until the first six?
= 6
> Geometric with $p = \frac16$: $E = \frac1p$.

? Linearity of expectation requires the variables to be independent.
- true
+ false
> It holds for all random variables.

? 200 keys are hashed uniformly into 50 slots. What is the expected length of a slot's chain?
= 4
> $\alpha = n/m = 200/50$.

? A non-negative random variable has mean 5. Markov's inequality says $P(X \ge 20)$ is at most:
= 1/4|0.25
> $E[X]/a = 5/20$.
:::

## Lesson: Randomized algorithms {#randomized-algorithms}
@summary: Algorithms that flip coins: Las Vegas versus Monte Carlo, randomized quicksort and its expected 2n ln n comparisons, quickselect, Freivalds' matrix check, amplification by repetition, and Monte Carlo estimation.

### Putting the randomness inside
In the last lesson we assumed the *input* was random. Real inputs often are not: lists arrive already sorted, attackers choose keys that collide, and users repeat the same query. A **randomized algorithm** moves the randomness into the algorithm itself: it makes random choices as it runs, such as picking a random pivot. Then the analysis holds for *every* input, because the probabilities come from the algorithm's own coin flips, which no input can control. Randomness often makes algorithms simpler, faster, or both.

:::def Randomized algorithm
An algorithm that makes random choices during its execution. Its running time, and sometimes its output, are random variables, analysed for each fixed input over the algorithm's own random choices.
:::

### Imagine finding a parking space
Imagine a car park whose operator knows your habits. If you always check the spaces in the same order from the entrance, an unfriendly operator could keep the early spaces full and make you walk to the far end every day. If you instead pick a random row each day, no arrangement of parked cars can make you unlucky every time: whatever they do, your expected walk is the average over the rows. That is exactly how a random pivot protects quicksort from sorted inputs.

### Two kinds of randomized algorithm
A **Las Vegas** algorithm always gives the correct answer, but its running time is random. Randomized quicksort is Las Vegas: it always sorts correctly, and only its speed depends on luck. A **Monte Carlo** algorithm always runs quickly, but its answer is correct only with high probability. Freivalds' check below is Monte Carlo. The two are related: if you can check an answer, you can turn a Monte Carlo algorithm into a Las Vegas one by repeating until the check passes.

:::def Las Vegas algorithm
A randomized algorithm that always returns a correct answer; its running time is a random variable, analysed by its expectation.
:::

:::def Monte Carlo algorithm
A randomized algorithm with a bounded running time whose answer may be wrong with some small, bounded probability.
:::

### Randomized quicksort
Quicksort with a uniformly random pivot has expected running time $\Theta(n\log n)$ on every input. Here is the beautiful indicator proof. Name the elements in sorted order $z_1 < z_2 < \cdots < z_n$. Two elements are compared at most once, and only when one of them is the pivot. Consider $z_i$ and $z_j$ with $i < j$, and the block $z_i, z_{i+1}, \ldots, z_j$ of $j - i + 1$ elements. As long as no pivot is chosen from this block, the block stays together in one part. The first time a pivot is chosen from it, if it is $z_i$ or $z_j$, they are compared; if it is something in between, they are separated forever and never compared. Every element of the block is equally likely to be that first pivot, so
$$P(z_i \text{ and } z_j \text{ compared}) = \frac{2}{j - i + 1}.$$
By linearity of expectation, the expected number of comparisons is
$$\sum_{i < j}\frac{2}{j - i + 1} \le \sum_{i=1}^{n}\sum_{k=2}^{n}\frac2k < 2nH_n \approx 2n\ln n \approx 1.39\,n\log_2 n.$$
For $n = 3$, the pairs at distance 1 are always compared and the outer pair with probability $\frac23$, for an expected $1 + 1 + \frac23 = \frac83 \approx 2.67$ comparisons. With a million elements, the expectation is about $2.8 \times 10^7$, and the probability of anything close to the quadratic worst case is astronomically small.

### Quickselect: finding the median
To find the $k$-th smallest element, partition around a random pivot as in quicksort, but recurse only into the side containing the answer. With probability at least $\frac12$ the pivot falls in the middle half, which shrinks the problem to at most $\frac34$ of its size. So on average a constant number of partitions reduces the size by a constant fraction, and the expected work is bounded by a geometric series $n + \frac34 n + (\frac34)^2 n + \cdots$ times a constant: expected $\Theta(n)$. Finding the median does not require sorting.

### Freivalds' check: verifying a matrix product
Someone gives you three $n \times n$ matrices $A$, $B$, $C$ and claims $AB = C$. Multiplying $A$ and $B$ yourself takes about $n^3$ steps. Freivalds' idea: choose a random vector $r$ with entries 0 or 1, and check whether $A(Br) = Cr$. That takes three matrix-vector products, about $3n^2$ steps. If $AB = C$, the check always passes. If $AB \ne C$, it fails with probability at least $\frac12$. Repeat with 20 independent vectors and a wrong claim survives with probability at most $2^{-20} \approx 10^{-6}$.

### Amplification
This repetition trick, called **amplification**, is the reason Monte Carlo algorithms are practical. If one run errs with probability at most $\frac12$ and errors are one-sided (a "fail" is always a true failure), then $k$ independent runs all err with probability at most $2^{-k}$: 10 runs give under 0.1%, 30 runs under one in a billion. For two-sided errors with probability below $\frac13$, take the majority vote of many runs; Chernoff bounds show the error then drops exponentially as well.

### Monte Carlo estimation
Randomness also estimates quantities that are hard to compute exactly. Throw random points into the unit square and count the fraction landing inside the quarter circle $x^2 + y^2 \le 1$: that fraction approaches $\frac\pi4 \approx 0.785$. The error of such an estimate shrinks like $\frac1{\sqrt N}$ for $N$ samples, by the law of large numbers and the central limit theorem: to get one more decimal digit, use 100 times as many samples.

### Common mistakes
"Expected $O(n\log n)$" is not the same as "average over random inputs": for randomized quicksort the expectation is over the pivots, and it holds for each input. A random pivot does not make the worst case impossible, only extremely unlikely. Monte Carlo answers need an error probability stated, and repetitions must use *independent* random choices, or amplification fails. Finally, computers use pseudo-random generators; for algorithms this is almost always fine, but security uses need cryptographically secure randomness.

### Summary
Randomized algorithms use their own random choices, so their guarantees hold for every input. Las Vegas algorithms are always correct with random running time; Monte Carlo algorithms are fast but correct with high probability, and repetition shrinks the error exponentially. Randomized quicksort makes fewer than $2nH_n \approx 1.39\,n\log_2 n$ comparisons on average, quickselect finds medians in expected linear time, Freivalds checks a matrix product in $O(n^2)$, and Monte Carlo estimates converge at rate $1/\sqrt N$.

@viz sort | Run quicksort several times on fresh shuffles and watch the comparison count stay near n log n.

:::explore
**What to try**
1. Choose Quick, set $n = 64$ and press Play. Note the number of comparisons and compare it with the readout's $n\log_2 n = 384$ and $n^2 = 4096$.
2. Press Shuffle and Play again, several times. The counts vary from run to run, but stay in the same range, typically a few hundred.
3. Compare with Insertion on the same $n$: around $n^2/4 \approx 1000$ comparisons on random data.
4. Reduce $n$ to 8 and repeat: the counts vary more in relative terms, because fluctuations matter more for small inputs.

**What to notice:** the comparison count is a random variable concentrated near its expectation of about $2n\ln n$, exactly the indicator calculation in the article.
:::

@viz lln p=0.785 | Monte Carlo estimation: the fraction of random hits settles towards its true probability.

:::explore
**What to try**
1. The probability is set to $0.785 \approx \pi/4$, the chance a random point in the unit square lands inside the quarter circle. Press the flip button.
2. Each of the 5 runs wanders at first, then settles near 0.785.
3. Look at the spread after 100 samples and after 1000: it shrinks by a factor of about $\sqrt{10} \approx 3.2$.
4. Run it again several times and see different random paths with the same final behaviour.

**What to notice:** Monte Carlo estimates are random, but their error shrinks like $1/\sqrt N$, so more samples buy more accuracy, slowly.
:::

:::formulas
$$P(z_i, z_j \text{ compared}) = \frac{2}{j - i + 1}, \qquad E[\text{comparisons}] = \sum_{i<j}\frac2{j-i+1} < 2nH_n \approx 1.39\,n\log_2 n$$
$$\text{quickselect: } E[T(n)] \le c\left(n + \tfrac34n + (\tfrac34)^2 n + \cdots\right) = O(n)$$
$$\text{amplification: } P(\text{all } k \text{ runs wrong}) \le \varepsilon^k$$
$$\text{Freivalds: } AB \ne C \Rightarrow P(ABr = Cr) \le \tfrac12, \quad r \in \{0,1\}^n$$
$$\text{Monte Carlo error} \propto \frac{1}{\sqrt N}$$
:::

:::thm Expected comparisons of randomized quicksort
On any input of $n$ distinct elements, randomized quicksort makes fewer than $2nH_n = O(n\log n)$ comparisons in expectation.
:::

:::proof
Let $X_{ij}$ indicate that $z_i$ and $z_j$ are compared. As argued above, $E[X_{ij}] = \frac2{j-i+1}$. By linearity, $E[X] = \sum_{i=1}^{n-1}\sum_{j=i+1}^{n} \frac2{j-i+1}$. Substituting $k = j - i + 1$, the inner sum is $\sum_{k=2}^{n-i+1}\frac2k < 2H_n$. Summing over at most $n$ values of $i$ gives $E[X] < 2nH_n$, and $H_n \le \ln n + 1$.
:::

:::thm Freivalds' error bound
If $AB \ne C$ and $r$ has independent uniform entries in $\{0,1\}$, then $P(ABr = Cr) \le \frac12$.
:::

:::proof
Let $D = AB - C \ne 0$, with some nonzero entry $d_{ij}$. Then $(Dr)_i = d_{ij}r_j + s$, where $s$ depends only on the other entries of $r$. Fix those other entries. At most one of the two values $r_j \in \{0, 1\}$ makes $d_{ij}r_j + s = 0$, because $d_{ij} \ne 0$. So $P((Dr)_i = 0) \le \frac12$, and hence $P(Dr = 0) \le \frac12$.
:::

:::steps Expected comparisons of randomized quicksort for $n = 4$
1. Pairs at distance 1 (three pairs): probability $\frac22 = 1$ each, total 3.
2. Distance 2 (two pairs): $\frac23$ each, total $\frac43$.
3. Distance 3 (one pair): $\frac24 = \frac12$.
4. Expected total $3 + \frac43 + \frac12 = \frac{29}{6} \approx 4.83$, close to the minimum possible worst case of 5.
:::

:::steps How many repetitions make a Monte Carlo test with one-sided error $\frac12$ wrong with probability below 0.001?
1. After $k$ runs the error is at most $2^{-k}$.
2. Need $2^{-k} < 0.001$, i.e. $2^k > 1000$.
3. $2^{10} = 1024$, so $k = 10$ repetitions suffice.
:::

:::mock Exam question
(a) In randomized quicksort on 10 elements, what is the probability that the smallest and largest elements are ever compared? (b) What is the probability that the 3rd and 4th smallest are compared? (c) A Monte Carlo primality test wrongly says "prime" for a composite number with probability at most $\frac14$ per run. After 5 independent runs all say "prime", bound the probability that the number is composite.
:::solution
(a) $\frac{2}{10 - 1 + 1} = \frac15$: they are compared only if one of them is the first pivot chosen from the whole list. (b) Adjacent in sorted order: $\frac22 = 1$, they are always compared. (c) At most $(\frac14)^5 = \frac1{1024}$.
:::
:::

:::cs
Randomization is everywhere in systems: randomized quicksort and introsort, random hashing to defeat collision attacks, skip lists, treaps, consistent hashing in distributed caches, the Miller–Rabin primality test used to generate RSA keys, and randomized load balancing ("power of two choices").
:::

:::ml
Machine learning is built on randomized algorithms: stochastic gradient descent samples random mini-batches, random initialisation breaks symmetry, dropout randomly removes units, random forests bootstrap data and features, and randomized SVD and random projections (Johnson–Lindenstrauss) compress huge matrices with provable error bounds. Monte Carlo sampling estimates expectations in Bayesian inference and reinforcement learning.
:::

:::real
Opinion polls are Monte Carlo estimation: asking about 1000 randomly chosen people estimates a proportion to within about 3 percentage points, whatever the size of the country, because the error depends on the sample size like $1/\sqrt N$.
:::

:::quiz
? Randomized quicksort always returns a correctly sorted list. Which kind of algorithm is it?
+ Las Vegas
- Monte Carlo
> Its answer is always correct; only its running time is random.

? In randomized quicksort, what is the probability that two elements adjacent in sorted order are compared?
= 1
> $\frac{2}{j - i + 1} = \frac22$.

? A test with one-sided error at most $\frac12$ is repeated 8 times independently. What is the maximum probability all runs are wrong?
= 1/256|0.00390625
> $(\frac12)^8$.

? Freivalds' check of $AB = C$ for $n \times n$ matrices costs about:
- $n^3$
+ $n^2$
- $n\log n$
> Three matrix-vector products.

? To halve the error of a Monte Carlo estimate, multiply the number of samples by:
= 4
> Error $\propto 1/\sqrt N$.
:::

# Unit: Algorithm design and hardness

## Lesson: The mathematics of dynamic programming {#dynamic-programming}
@summary: Solve a problem by writing its answer as a recurrence over smaller subproblems, then compute each subproblem once. Optimal substructure, overlapping subproblems, memoization versus tables, and the cost formula subproblems times work per subproblem, with Fibonacci, grid paths, coin change, knapsack and edit distance.

### Recursion that remembers
In divide and conquer the subproblems were independent: the two halves of merge sort never share any work. Many problems are different. When you break them into smaller pieces, the same pieces keep appearing again and again. A plain recursive solution then recomputes the same answers an enormous number of times. **Dynamic programming** (DP) fixes this with a simple idea: solve each distinct subproblem once, store the answer, and look it up whenever it is needed again. The mathematics of DP is the mathematics of recurrences, plus a way of counting how many distinct subproblems there are.

### Imagine climbing stairs
You are climbing a staircase of $n$ steps and can take either 1 or 2 steps at a time. In how many ways can you reach the top? Think about your *last* move. Either you arrived from step $n - 1$ with a single step, or from step $n - 2$ with a double step. So the number of ways $W(n)$ satisfies $W(n) = W(n-1) + W(n-2)$, with $W(1) = 1$ and $W(2) = 2$. That gives $1, 2, 3, 5, 8, 13, \ldots$: the Fibonacci numbers, and $W(10) = 89$. The question "what was the last decision?" is the standard way to find a DP recurrence.

### Why naive recursion is slow
Compute Fibonacci numbers recursively: $F(n) = F(n - 1) + F(n - 2)$ with $F(1) = F(2) = 1$. To compute $F(5)$ we compute $F(4)$ and $F(3)$; but $F(4)$ itself computes $F(3)$ again, and $F(2)$ is computed three times. The number of calls grows like the Fibonacci numbers themselves, about $\varphi^n$ with $\varphi \approx 1.618$; computing $F(5)$ makes 9 calls and $F(40)$ makes more than 200 million. Yet there are only $n$ distinct subproblems, $F(1)$ to $F(n)$. This is the signature of a DP problem: **overlapping subproblems**, few distinct ones but many repeated calls.

### Two ways to remember
**Memoization (top-down)** keeps the recursive code but stores each result in a table the first time it is computed; later calls just look it up. **Tabulation (bottom-up)** fills the table in an order where every subproblem's dependencies are already filled: $F(1), F(2), F(3), \ldots$ Both compute each subproblem once. Bottom-up for Fibonacci keeps only the last two values: $O(n)$ time and $O(1)$ memory.

### The cost formula
For any DP the running time is
$$\text{time} = (\text{number of distinct subproblems}) \times (\text{time per subproblem}),$$
not counting the lookups. Fibonacci has $n$ subproblems each costing $O(1)$: $O(n)$. This formula is the main calculation you do when designing a DP.

### Optimal substructure
For *optimisation* problems, DP needs one more property. **Optimal substructure** means that an optimal solution is built from optimal solutions of subproblems. Shortest paths have it: if the shortest route from A to C passes through B, its A-to-B part must itself be a shortest route from A to B, otherwise we could swap in a shorter one and improve the whole route. This "cut and paste" argument is how you prove a DP recurrence correct.

:::def Optimal substructure
A problem has optimal substructure if every optimal solution contains optimal solutions to its subproblems, so that the optimal value can be written as a recurrence over subproblem values.
:::

:::def Overlapping subproblems
A recursive formulation has overlapping subproblems if the same subproblems are needed many times, so storing their answers saves work.
:::

### Coin change
With coins of value 1, 3 and 4, what is the fewest number of coins making 6? The greedy idea, always take the largest coin that fits, gives $4 + 1 + 1$, three coins. But $3 + 3$ uses only two. DP finds this reliably. Let $C(a)$ be the minimum number of coins for amount $a$. The last coin used is 1, 3 or 4, so
$$C(a) = 1 + \min\{C(a - 1), C(a - 3), C(a - 4)\}, \qquad C(0) = 0,$$
ignoring terms with negative arguments. Filling the table: $C(1) = 1$, $C(2) = 2$, $C(3) = 1$, $C(4) = 1$, $C(5) = 2$, $C(6) = 1 + \min\{C(5), C(3), C(2)\} = 1 + 1 = 2$. For amount $A$ and $k$ coin types there are $A + 1$ subproblems costing $O(k)$ each: $O(Ak)$.

### Two-dimensional tables: grid paths and edit distance
How many paths go from the top-left corner of a grid to a point $m$ steps right and $n$ steps down, moving only right or down? The last move came from the left or from above, so $P(i, j) = P(i - 1, j) + P(i, j - 1)$ with $P(i, 0) = P(0, j) = 1$. This is exactly the recurrence of Pascal's triangle, and the answer is $\binom{m + n}{m}$: for 3 right and 3 down, $\binom63 = 20$ paths.

The **edit distance** between two words is the fewest insertions, deletions and substitutions turning one into the other. Let $D(i, j)$ be the distance between the first $i$ letters of $x$ and the first $j$ letters of $y$. The last operation either deletes $x_i$, inserts $y_j$, or matches/substitutes $x_i$ with $y_j$:
$$D(i,j) = \min\{D(i-1,j) + 1,\; D(i,j-1) + 1,\; D(i-1,j-1) + [x_i \ne y_j]\},$$
with $D(i,0) = i$ and $D(0,j) = j$. For "kitten" and "sitting" the answer is 3: substitute k with s, e with i, and insert g. The table has $(m+1)(n+1)$ entries, each $O(1)$: $O(mn)$ time.

### Knapsack and pseudo-polynomial time
In the 0/1 **knapsack** problem, items have weights and values, and you want the most valuable set with total weight at most $W$. Let $K(i, w)$ be the best value using the first $i$ items with capacity $w$. Item $i$ is either left out or taken: $K(i, w) = \max\{K(i-1, w),\; v_i + K(i-1, w - w_i)\}$ (the second only if $w_i \le w$). There are $(n + 1)(W + 1)$ subproblems, so the time is $O(nW)$. That looks polynomial, but $W$ is a number in the input, written with only $\log_2 W$ digits; doubling the number of digits squares $W$. Such running times are called **pseudo-polynomial**, and this subtlety matters in the P versus NP lesson.

### Common mistakes
The most common error is a recurrence that does not consider every possibility for the last decision, which silently gives wrong answers. Another is filling a table in the wrong order, so that an entry is read before it is computed. Greedy shortcuts often look right on small examples but fail, as coin change showed. And always include base cases for the edges of the table.

### Summary
Dynamic programming applies when a problem has optimal substructure and overlapping subproblems. Write a recurrence by asking what the last decision was, then compute each subproblem once, top-down with memoization or bottom-up with a table. The running time is the number of subproblems times the work per subproblem: $O(n)$ for Fibonacci, $O(Ak)$ for coin change, $O(mn)$ for edit distance and $O(nW)$, pseudo-polynomial, for knapsack.

@viz pascal | Pascal's triangle is a dynamic-programming table: each entry is the sum of the two above it.

:::explore
**What to try**
1. Look at the first few rows. Each entry is computed from two entries in the row above, $\binom nk = \binom{n-1}{k-1} + \binom{n-1}k$, just like the grid-path recurrence $P(i,j) = P(i-1,j) + P(i,j-1)$.
2. Find the entry $\binom63 = 20$ in row 6 (counting the top row as row 0): the number of grid paths with 3 right and 3 down moves.
3. Increase the number of rows to 14. Every entry was computed once with one addition: about $\frac{n^2}{2}$ additions in total. A naive recursive computation of $\binom{n}{k}$ would call itself as many times as the answer is large.
4. Check that each row sums to a power of 2, the total number of paths of that length.

**What to notice:** a DP table is just a recurrence computed in an order where the entries it needs already exist. The triangle shape is the dependency order.
:::

:::formulas
$$\text{DP time} = \#\text{subproblems} \times \text{time per subproblem}$$
$$F(n) = F(n-1) + F(n-2): \;\text{naive } \Theta(\varphi^n), \;\text{DP } \Theta(n)$$
$$C(a) = 1 + \min_{c \le a} C(a - c), \qquad P(i,j) = P(i-1,j) + P(i,j-1) \Rightarrow \binom{m+n}{m}$$
$$D(i,j) = \min\{D(i-1,j)+1,\; D(i,j-1)+1,\; D(i-1,j-1) + [x_i \ne y_j]\}$$
$$K(i,w) = \max\{K(i-1,w),\; v_i + K(i-1,w-w_i)\}, \qquad O(nW)$$
:::

:::thm Optimal substructure of shortest paths
If $p$ is a shortest path from $u$ to $v$ and $x$ is a vertex on $p$, then the part of $p$ from $u$ to $x$ is a shortest path from $u$ to $x$.
:::

:::proof
Suppose not: some path $q$ from $u$ to $x$ is shorter than the $u$-to-$x$ part of $p$. Replace that part with $q$. The new walk from $u$ to $v$ is shorter than $p$ (and contains a path that is at least as short), contradicting that $p$ is a shortest path. This cut-and-paste argument is the template for proving DP recurrences correct.
:::

:::steps Fewest coins for amount 7 with coins 1, 3, 4
1. From the article: $C(0..6) = 0, 1, 2, 1, 1, 2, 2$.
2. $C(7) = 1 + \min\{C(6), C(4), C(3)\} = 1 + \min\{2, 1, 1\} = 2$.
3. Two coins: $3 + 4$.
:::

:::steps Knapsack with capacity 7 and items (weight, value) = (1, 1), (3, 4), (4, 5), (5, 7)
1. Try combinations whose weight fits: $\{3, 4\}$ weighs 7, value 9; $\{1, 5\}$ weighs 6, value 8; $\{5\}$ alone 7; $\{1, 3\}$ value 5.
2. No set containing the weight-5 item and another of weight at least 3 fits.
3. The DP table $K(4, 7)$ confirms the maximum value is 9, using items of weight 3 and 4.
:::

:::steps Count grid paths from (0, 0) to (2, 3) moving right or up
1. Total moves: 2 right and 3 up, 5 in all.
2. Choose which 2 of the 5 moves are "right": $\binom52 = 10$.
3. Check with the table: row $i = 1$ gives $1, 2, 3, 4$; row $i = 2$ gives $1, 3, 6, 10$.
:::

:::mock Exam question
(a) Using the stairs recurrence $W(n) = W(n-1) + W(n-2)$ with $W(1) = 1$, $W(2) = 2$, find $W(8)$. (b) Find the edit distance between "cat" and "cut", and between "cat" and "act". (c) A DP has subproblems indexed by pairs $(i, j)$ with $1 \le i \le j \le n$, each taking $O(n)$ time to compute. What is its running time?
:::solution
(a) $1, 2, 3, 5, 8, 13, 21, 34$: $W(8) = 34$. (b) "cat" to "cut": one substitution, distance 1. "cat" to "act": 2 (for example substitute c with a and a with c; no single operation works). (c) About $\frac{n^2}2$ subproblems times $O(n)$: $O(n^3)$, the pattern of matrix-chain multiplication.
:::
:::

:::cs
DP is behind diff tools and spell checkers (edit distance), DNA sequence alignment (Needleman–Wunsch, Smith–Waterman), shortest paths (Bellman–Ford, Floyd–Warshall), parsing (CYK), text justification, compilers' instruction selection and query optimisation in databases.
:::

:::ml
Reinforcement learning is built on the Bellman equation $V(s) = \max_a \big(r(s,a) + \gamma \sum_{s'} P(s' \mid s, a)V(s')\big)$, a DP recurrence over states. The Viterbi algorithm for hidden Markov models, the forward-backward algorithm, CTC loss in speech recognition and dynamic time warping are all dynamic programs over tables of size (sequence length) times (states).
:::

:::real
Planning the cheapest way to fly across several cities, choosing which stops to make, or splitting a long text into lines so that the spacing looks even, are all solved by asking "what was the last choice?" and reusing the best answers to smaller trips or shorter texts.
:::

:::quiz
? How many ways are there to climb 6 stairs taking 1 or 2 steps at a time?
= 13
> $1, 2, 3, 5, 8, 13$.

? With coins 1, 3, 4, what is the fewest number of coins for amount 6?
= 2
> $3 + 3$; greedy gives 3 coins.

? How many monotone grid paths take 3 right moves and 3 down moves?
= 20
> $\binom63 = 20$.

? The edit distance between "kitten" and "sitting" is:
= 3
> Two substitutions and one insertion.

? Knapsack's $O(nW)$ algorithm is called pseudo-polynomial because:
+ $W$ can be exponential in the number of digits used to write it
- it only works for small $n$
- it is a greedy algorithm
> The input size is about $\log_2 W$ digits for the capacity.
:::

## Lesson: Proving greedy algorithms correct {#greedy-proofs}
@summary: Greedy algorithms make the locally best choice at every step. Learn when that is globally optimal and how to prove it with the "greedy stays ahead" and exchange arguments, using interval scheduling, shortest-job-first, fractional knapsack, Huffman codes and minimum spanning trees.

### The appeal and danger of greed
A **greedy algorithm** builds a solution one piece at a time, always taking the choice that looks best right now and never reconsidering. Greedy algorithms are simple and fast, often just a sort followed by a single pass. The danger is that a choice that looks best now can rule out a better overall solution. In the dynamic programming lesson, the greedy rule "take the largest coin" used 3 coins for the amount 6 with coins $\{1, 3, 4\}$, when 2 coins suffice. So for every greedy algorithm, correctness needs a proof. This lesson teaches the two standard proof techniques.

:::def Greedy algorithm
An algorithm that makes a sequence of choices, each time picking the option that is best by some simple local rule, without revisiting earlier choices.
:::

### Imagine booking a meeting room
One meeting room, many requested meetings, each with a start and finish time. You want to accept as many non-overlapping meetings as possible. Several greedy rules come to mind. "Pick the shortest meeting first" fails: a short meeting from 10:00 to 11:00 can overlap two longer ones, 9:00 to 10:30 and 10:30 to 12:00, which together would have been better. "Pick the meeting that starts first" fails: one all-day meeting starting at 8:00 would block everything. The rule that works is: **always pick the meeting that finishes first**, discard everything overlapping it, and repeat. It frees the room as early as possible, leaving the most time for the rest.

Try it on meetings $[1,4), [3,5), [0,6), [5,7), [3,9), [5,9), [6,10), [8,11), [8,12), [2,14), [12,16)$. The earliest finish is $[1,4)$. The next meeting starting at 4 or later with the earliest finish is $[5,7)$, then $[8,11)$, then $[12,16)$. Four meetings, and no schedule can fit five.

### Proof technique 1: greedy stays ahead
To prove earliest-finish-first optimal, compare the greedy choices $g_1, g_2, \ldots, g_k$ (in time order) with any optimal schedule $o_1, o_2, \ldots, o_m$. We show by induction that greedy **stays ahead**: $\text{finish}(g_r) \le \text{finish}(o_r)$ for every $r \le k$. For $r = 1$ this holds because greedy chose the earliest finisher of all. If it holds for $r - 1$, then $o_r$ starts after $o_{r-1}$ finishes, hence after $g_{r-1}$ finishes, so $o_r$ was available to greedy at step $r$, and greedy picked something finishing no later. Finally, if $m > k$, the meeting $o_{k+1}$ starts after $o_k$, hence after $g_k$, finishes, so greedy would not have stopped. So $k \ge m$: greedy is optimal.

### Proof technique 2: the exchange argument
The other method starts with any optimal solution and **exchanges** parts of it, step by step, for the greedy choices, without ever making it worse. If you can transform any optimal solution into the greedy one this way, greedy is optimal too.

Example: a single machine must run jobs with processing times $t_1, \ldots, t_n$, and you want to minimise the sum of their completion times. The greedy rule is **shortest job first**. With jobs of length 3, 1 and 2, the order $1, 2, 3$ completes at times 1, 3, 6, total 10, while the order $3, 1, 2$ completes at 3, 4, 6, total 13. Proof by exchange: in any order where a longer job $a$ runs immediately before a shorter job $b$, swap them. Jobs before and after the pair are unaffected; the pair's completion times change from $(T + t_a, T + t_a + t_b)$ to $(T + t_b, T + t_b + t_a)$, reducing the total by $t_a - t_b > 0$. So an optimal order never has a longer job before a shorter one: it is shortest-first.

### Fractional versus 0/1 knapsack
If you may take *fractions* of items (like scooping flour or spices), the greedy rule "take items in decreasing order of value per unit weight" is optimal, by an exchange argument: any solution using weight on a lower-ratio item while a higher-ratio item is not fully taken can swap a little weight and increase its value. With capacity 50 and items (weight 10, value 60), (20, 100), (30, 120), the ratios are 6, 5 and 4. Greedy takes all of the first two (value 160) and $\frac{20}{30}$ of the third (value 80): total 240. But for the 0/1 knapsack, where items are whole, the same greedy takes the first two for 160, while the second and third give 220. Greedy fails, and dynamic programming is needed. A tiny change in the problem destroys the greedy property.

### Huffman codes
To compress text, give frequent letters short binary codes and rare letters long ones, with no code a prefix of another so decoding is unambiguous. **Huffman's algorithm** repeatedly merges the two least frequent symbols into a combined symbol whose frequency is their sum, building a tree from the bottom up. For frequencies A 5, B 2, C 1, D 1: merge C and D (2), then B with that (4), then A with that (9). A gets a 1-bit code, B 2 bits, C and D 3 bits, total cost $5\cdot1 + 2\cdot2 + 1\cdot3 + 1\cdot3 = 15$ bits, versus 18 bits with fixed 2-bit codes. The proof is an exchange argument: in some optimal tree, the two rarest symbols can be swapped to the deepest pair of sibling leaves without increasing the cost.

### Minimum spanning trees: the cut property
Kruskal's and Prim's algorithms for minimum spanning trees are greedy, and both are proved by the **cut property**: for any division of the vertices into two groups, the cheapest edge crossing between the groups belongs to some minimum spanning tree. The proof is again an exchange: if an MST $T$ avoids that edge $e$, adding $e$ to $T$ creates a cycle, which must cross the cut at another edge $f$ with weight at least that of $e$; swapping $f$ for $e$ gives a spanning tree no heavier than $T$.

### Common mistakes
Do not trust a greedy rule because it works on a few examples; try to find a counterexample first, and only then look for a proof. A proof must cover *every* optimal solution or show greedy is at least as good as an arbitrary one, not just a particular one. And be precise about what "best" means: earliest finish, not shortest duration, is the right choice for interval scheduling.

### Summary
Greedy algorithms commit to the locally best choice at every step. They are correct only for problems with the right structure, and a proof is essential. "Greedy stays ahead" shows by induction that greedy's partial solution is always at least as good as any other; the exchange argument transforms any optimal solution into greedy's without making it worse. These prove earliest-finish-first scheduling, shortest-job-first, fractional knapsack, Huffman coding and Kruskal/Prim, while coin change and 0/1 knapsack show greedy can fail.

@viz graph alg=kruskal | Kruskal's algorithm: a greedy algorithm justified by the cut property.

:::explore
**What to try**
1. Step through Kruskal's algorithm. Each step takes the cheapest remaining edge that does not create a cycle, a purely local choice.
2. Each time an edge is accepted, picture the cut separating the two components it joins: the accepted edge is the cheapest edge crossing that cut, so the cut property says it is safe.
3. Watch an edge being rejected because it would close a cycle, and check that it is the heaviest edge on that cycle.
4. Switch to Prim's algorithm and compare: different greedy order, same total weight.

**What to notice:** greedy works here because of the exchange argument behind the cut property. Every accepted edge could be swapped into any optimal tree without making it heavier.
:::

:::formulas
$$\text{interval scheduling: pick earliest finish; } \text{finish}(g_r) \le \text{finish}(o_r) \;\forall r$$
$$\text{SPT: } \sum_j C_j \text{ minimised by } t_{(1)} \le t_{(2)} \le \cdots; \quad \text{swap gain} = t_a - t_b$$
$$\text{fractional knapsack: sort by } v_i / w_i \text{ decreasing}$$
$$\text{Huffman cost} = \sum_i f_i \cdot \text{depth}(i)$$
:::

:::thm Earliest finish time is optimal
For interval scheduling, the greedy algorithm that repeatedly selects the compatible interval with the earliest finish time selects the maximum possible number of non-overlapping intervals.
:::

:::proof
Let greedy choose $g_1, \ldots, g_k$ and let $o_1, \ldots, o_m$ be an optimal solution, both sorted by finish time. By induction $f(g_r) \le f(o_r)$: true for $r = 1$ by the greedy choice; if $f(g_{r-1}) \le f(o_{r-1})$, then $o_r$ starts after $f(o_{r-1}) \ge f(g_{r-1})$, so $o_r$ is compatible with greedy's choices and greedy's $r$-th pick finishes no later. If $m > k$, then $o_{k+1}$ starts after $f(o_k) \ge f(g_k)$ and would be available to greedy, contradicting that greedy stopped. So $k = m$.
:::

:::thm Cut property
Let $S$ be a set of vertices and $e$ a minimum-weight edge with one end in $S$ and one outside. Then some minimum spanning tree contains $e$.
:::

:::proof
Take an MST $T$. If $e \in T$, done. Otherwise $T + e$ contains a cycle through $e$, which crosses between $S$ and its complement at least twice, so it contains another crossing edge $f$, with $w(f) \ge w(e)$. Then $T + e - f$ is a spanning tree with weight at most $w(T)$, so it is also an MST, and it contains $e$.
:::

:::steps Schedule jobs of lengths 4, 2, 7, 1 to minimise total completion time
1. Shortest first: 1, 2, 4, 7.
2. Completion times: 1, 3, 7, 14.
3. Sum $= 25$. (The order 7, 4, 2, 1 gives $7 + 11 + 13 + 14 = 45$.)
:::

:::steps Fractional knapsack: capacity 10, items (weight, value) = (5, 10), (4, 12), (6, 9)
1. Ratios: 2, 3, 1.5. Order: (4, 12), (5, 10), (6, 9).
2. Take (4, 12): capacity left 6. Take (5, 10): capacity left 1.
3. Take $\frac16$ of (6, 9): value 1.5.
4. Total $12 + 10 + 1.5 = 23.5$.
:::

:::mock Exam question
(a) Give a set of intervals where "shortest interval first" selects fewer intervals than optimal. (b) Using earliest finish time, how many of the intervals $[0,3), [2,5), [4,7), [6,9), [8,11)$ can be scheduled? (c) Coins are 1, 5, 10, 25. Is greedy optimal for 30? Now with coins 1, 10, 25, is greedy optimal for 30?
:::solution
(a) $[0, 5)$, $[4, 6)$, $[5, 10)$: shortest first picks $[4,6)$, which overlaps both others, giving 1; optimal picks $[0,5)$ and $[5,10)$, giving 2. (b) Greedy picks $[0,3)$, $[4,7)$, $[8,11)$: 3. (c) With 1, 5, 10, 25: greedy gives $25 + 5$, 2 coins, optimal. With 1, 10, 25: greedy gives $25 + 1+1+1+1+1$, 6 coins, but $10 + 10 + 10$ uses 3, so greedy fails.
:::
:::

:::cs
Greedy algorithms with proofs include Dijkstra's shortest paths, Kruskal and Prim, Huffman coding (used inside ZIP, PNG and JPEG), interval scheduling in operating systems and calendars, and caching with the furthest-in-future rule. Matroid theory characterises exactly when the greedy algorithm is optimal for picking a maximum-weight independent set.
:::

:::ml
Many ML procedures are greedy: decision trees choose the best split at each node without lookahead (so they are not globally optimal), forward feature selection adds the most useful feature each step, and greedy decoding in language models picks the most likely next token, which is why beam search can find better sequences. For submodular objectives, such as choosing diverse data points or sensor locations, greedy is provably within a factor $1 - 1/e \approx 0.63$ of optimal.
:::

:::real
Making change in euros or US dollars by always giving the largest coin that fits is greedy, and it happens to be optimal for those coin systems. Booking the meeting that ends soonest first is the best way to fit the most meetings into one room.
:::

:::quiz
? Which greedy rule maximises the number of non-overlapping intervals?
- shortest interval first
- earliest start first
+ earliest finish first
> Proved by greedy stays ahead.

? Jobs of lengths 2, 5, 1 are run shortest first. What is the total completion time?
= 12
> Order 1, 2, 5 finishes at 1, 3, 8: total 12.

? Fractional knapsack, capacity 8, items (weight, value) (4, 20), (8, 24). What is the greedy (optimal) value?
= 32
> Ratios 5 and 3: take all of the first (20) and half of the second (12).

? Huffman merges which two symbols first?
+ the two least frequent
- the two most frequent
- the most and least frequent
> Rare symbols end up deepest, with the longest codes.

? With coins 1, 3, 4, greedy is optimal for every amount.
- true
+ false
> For 6, greedy uses $4 + 1 + 1$ but $3 + 3$ is better.
:::

## Lesson: An introduction to P versus NP {#p-vs-np}
@summary: Which problems can be solved efficiently? Polynomial time, the classes P and NP via certificates and verifiers, polynomial-time reductions, NP-completeness and the Cook–Levin theorem, classic NP-complete problems, and what to do when your problem is NP-hard.

### Easy and hard problems
Some problems have fast algorithms: sorting, shortest paths, minimum spanning trees, matching. Others seem to resist every attempt. Can a map be coloured with 3 colours so that neighbouring regions differ? Is there a route visiting every city exactly once? Can a set of numbers be split into two groups with equal sums? For thousands of such problems, nobody knows an algorithm much better than trying all possibilities, and nobody has proved that a fast one is impossible. The question of whether these problems truly are hard is **P versus NP**, the most famous open problem in computer science, with a one-million-dollar Clay Millennium Prize for its solution.

### Imagine a jigsaw puzzle
Imagine someone hands you a finished 1000-piece jigsaw puzzle and asks whether it is correct. Checking is quick: look at each join. But solving the puzzle from a pile of pieces takes much longer. Many hard problems share this lopsided feel: **checking a proposed answer is easy, but finding one seems hard**. P versus NP asks whether that lopsidedness is real, or whether every problem whose answers are easy to check also has answers that are easy to find.

### Polynomial time means efficient
We call an algorithm **efficient** if its worst-case running time is $O(n^k)$ for some constant $k$, where $n$ is the size of the input in bits. This is a convention, but a useful one. Polynomials are closed under addition, multiplication and composition, so combining efficient pieces stays efficient. And the gap between polynomial and exponential is enormous: at $10^9$ steps per second, $n^3$ steps for $n = 1000$ take one second, while $2^n$ steps for only $n = 60$ take about 36 years and for $n = 100$ vastly longer than the age of the universe.

We focus on **decision problems**, whose answer is yes or no: "is there a colouring with 3 colours?", "is there a route of length at most 500?". Optimisation versions are usually just as hard, because you can find the best value by asking yes/no questions with binary search.

:::def The class P
P is the set of decision problems that can be solved by an algorithm running in polynomial time in the input size.
:::

### NP: answers you can check quickly
:::def The class NP
NP is the set of decision problems for which every yes-instance has a **certificate** (a proposed solution) of polynomial size that a polynomial-time **verifier** can check. If the answer is no, no certificate is accepted.
:::

For 3-colouring, the certificate is a colouring; the verifier checks every edge, in time linear in the number of edges. For the Hamilton cycle problem, the certificate is the order of the vertices. For **subset sum** ("does some subset of these numbers add up to the target?"), the certificate is the subset: for the numbers $\{3, 34, 4, 12, 5, 2\}$ and target 9, the certificate $\{4, 5\}$ is checked with one addition. NP stands for *nondeterministic polynomial time*, not "not polynomial". Every problem in P is in NP, since the verifier can ignore the certificate and solve the problem directly. So $P \subseteq NP$, and the open question is whether $P = NP$.

### Reductions: comparing difficulty
To compare problems we use **reductions**. A polynomial-time reduction from problem $A$ to problem $B$, written $A \le_p B$, is a polynomial-time transformation turning every instance $x$ of $A$ into an instance $f(x)$ of $B$ with the same answer. Then a fast algorithm for $B$ gives a fast algorithm for $A$: transform, then solve. So $A \le_p B$ means "$A$ is no harder than $B$".

A simple example: a set $S$ of vertices is **independent** (no edges inside it) exactly when the remaining vertices $V \setminus S$ form a **vertex cover** (touching every edge). So "is there an independent set of size at least $k$?" reduces to "is there a vertex cover of size at most $n - k$?". On a 5-cycle, the largest independent set has 2 vertices and the smallest vertex cover has $5 - 2 = 3$.

### NP-completeness
:::def NP-complete
A problem $B$ is NP-complete if $B$ is in NP and every problem in NP reduces to $B$ in polynomial time. A problem satisfying only the second condition is NP-hard.
:::

NP-complete problems are the hardest problems in NP: if *any one* of them has a polynomial-time algorithm, then every NP problem does, and $P = NP$. The **Cook–Levin theorem** (1971) showed that the Boolean satisfiability problem SAT ("can the variables of this logical formula be set to make it true?") is NP-complete, by encoding the step-by-step computation of any verifier as a formula. After that, proving a new problem NP-complete only needs one reduction from a known NP-complete problem: in 1972 Karp proved 21 problems NP-complete this way, and today thousands are known, including 3-SAT, 3-colouring, Hamilton cycle, travelling salesperson (decision version), clique, vertex cover, independent set, subset sum and 0/1 knapsack.

### What we believe and what it means
Most researchers believe $P \ne NP$, partly because decades of effort have found no fast algorithm for any NP-complete problem. If $P = NP$ were proved with a practical algorithm, much of modern cryptography would break, since finding a secret key is a problem whose answers are easy to check. Some problems are in NP but not known to be either in P or NP-complete, notably integer factoring and graph isomorphism.

### Living with NP-hardness
Learning that a problem is NP-hard is not the end, but a change of strategy. Options include: exact algorithms that are exponential but fast in practice (SAT solvers and integer programming routinely solve instances with millions of variables); **approximation algorithms** with guarantees, such as taking both ends of a maximal matching, which gives a vertex cover at most twice the optimal size; heuristics like local search; and special cases that are easy, such as 2-colouring, which is solvable by BFS, or knapsack with small capacities, solvable by the pseudo-polynomial DP.

### Common mistakes
NP does not mean "not polynomial"; P is inside NP. NP-hard problems need not be in NP. A reduction must go *from* the known hard problem *to* the new one to prove the new one hard; reducing the new problem to SAT only shows it is in NP-like territory, not that it is hard. And a pseudo-polynomial algorithm like knapsack's $O(nW)$ does not prove $P = NP$, because $W$ is exponential in its number of digits.

### Summary
P is the class of yes/no problems solvable in polynomial time; NP is the class whose yes-answers have certificates checkable in polynomial time, so $P \subseteq NP$. A reduction $A \le_p B$ shows $A$ is no harder than $B$. NP-complete problems, starting with SAT by the Cook–Levin theorem, are the hardest in NP: a polynomial algorithm for one would give one for all. Whether $P = NP$ is unknown; in practice NP-hard problems are tackled with clever exponential search, approximation and special cases.

@viz bigo | Polynomial versus exponential: why polynomial time is the dividing line.

:::explore
**What to try**
1. Set $n$ to about 20 with the log y-axis. $n^3 = 8000$ while $2^n \approx 10^6$: the exponential is already far ahead.
2. Slide $n$ to 60 and compare: $n^3 = 216{,}000$ against $2^{60} \approx 1.15 \times 10^{18}$, the 36 years of the article.
3. Watch $n!$, the cost of trying every ordering of cities in a travelling salesperson tour, grow even faster.
4. Notice that on the log axis every polynomial eventually flattens relative to $2^n$.

**What to notice:** however large the power $k$, $n^k$ is eventually dwarfed by $2^n$. That is why "has a polynomial-time algorithm" is the line between P and the problems believed to be intractable.
:::

@viz g10-graph-lab graph=petersen mode=hamilton | Hamilton cycles are NP-complete: easy to check, hard to find.

:::explore
**What to try**
1. Read the readout for the Petersen graph: the widget searches all possibilities and reports that there is a Hamilton path but no Hamilton cycle.
2. Switch to the cube graph: a Hamilton cycle exists. Given that cycle as a certificate, checking it means only verifying 8 edges.
3. Switch the mode to optimal colouring on the Petersen graph: $\chi = 3$, another NP-complete question (is 3 enough?) answered here by exhaustive search on a small graph.
4. Compare: the verifier's work grows linearly with the graph, while the search tries exponentially many orderings in the worst case.

**What to notice:** this asymmetry between finding and checking is exactly the definition of NP. The widget can afford exhaustive search only because these graphs have 10 or fewer vertices.
:::

:::formulas
$$\text{P} = \{\text{decision problems solvable in } O(n^k)\}, \qquad \text{P} \subseteq \text{NP}$$
$$\text{NP: } x \text{ is a yes-instance} \iff \exists\, c,\; |c| \le \text{poly}(|x|),\; V(x, c) = \text{yes}$$
$$A \le_p B \text{ and } B \in \text{P} \Rightarrow A \in \text{P}$$
$$B \text{ NP-complete and } B \in \text{P} \Rightarrow \text{P} = \text{NP}$$
$$S \text{ independent} \iff V \setminus S \text{ is a vertex cover}$$
:::

:::thm Reductions transfer efficiency
If $A \le_p B$ and $B$ can be solved in polynomial time, then $A$ can be solved in polynomial time.
:::

:::proof
Let the reduction $f$ run in time $O(n^a)$ and $B$'s algorithm in time $O(m^b)$. On an input $x$ of size $n$, the output $f(x)$ has size at most $O(n^a)$, since the reduction writes at most one symbol per step. Solving $B$ on it takes $O((n^a)^b) = O(n^{ab})$. The total $O(n^a + n^{ab})$ is polynomial, and the answer is correct because $f$ preserves yes and no answers.
:::

:::thm Cook–Levin theorem
SAT is NP-complete.
:::

:::proof
(Idea.) SAT is in NP: a satisfying assignment is a certificate checked in linear time. For hardness, take any NP problem with verifier $V$ running in time $p(n)$. Its computation on input $x$ and an unknown certificate can be written as a table of $p(n) \times p(n)$ cells describing the machine's state at each step. Boolean variables encode the cell contents, and clauses of polynomial total size express that the first row holds $x$, each row follows from the previous by the machine's rules, and the final state accepts. The formula is satisfiable exactly when some certificate makes $V$ accept, and it is built in polynomial time.
:::

:::steps Verify the subset-sum certificate $\{12, 5, 2\}$ for the numbers $\{3, 34, 4, 12, 5, 2\}$ and target 19
1. Check each element is in the list: 12, 5 and 2 are.
2. Add: $12 + 5 + 2 = 19$.
3. Equal to the target, so the answer is yes. Two additions; finding the subset by brute force could need checking $2^6 = 64$ subsets.
:::

:::steps Turn an independent-set question into a vertex-cover question
1. Graph: a path $1 - 2 - 3 - 4$. Question: is there an independent set of size 2?
2. Reduction: ask whether there is a vertex cover of size at most $4 - 2 = 2$.
3. $\{2, 3\}$ is a vertex cover (it touches edges 12, 23, 34), so the answer is yes.
4. Its complement $\{1, 4\}$ is indeed independent.
:::

:::mock Exam question
(a) Explain why 3-colouring is in NP. (b) A brute-force algorithm for 3-colouring tries every assignment of 3 colours to $n$ vertices. How many assignments are there for $n = 20$? (c) Suppose someone finds an $O(n^4)$ algorithm for vertex cover. What follows, and why? (d) True or false: if $A \le_p B$ and $A$ is NP-complete, then $B$ is NP-hard.
:::solution
(a) A certificate is a colouring; the verifier checks that each vertex has one of 3 colours and that the two ends of every edge differ, in $O(n + m)$ time. (b) $3^{20} = 3{,}486{,}784{,}401$. (c) Vertex cover is NP-complete, so every NP problem reduces to it in polynomial time; combining the reduction with the $O(n^4)$ algorithm solves every NP problem in polynomial time, so $P = NP$. (d) True: every NP problem reduces to $A$, and $A$ reduces to $B$; composing two polynomial reductions is a polynomial reduction.
:::
:::

:::cs
Recognising NP-hardness saves wasted effort: compilers' register allocation is graph colouring, package dependency resolution is SAT, and chip layout, timetabling and vehicle routing are NP-hard, so industry uses SAT solvers, integer programming, approximation and heuristics. Public-key cryptography relies on problems believed hard (factoring, discrete logarithms), whose security would collapse if $P = NP$ with a practical algorithm.
:::

:::ml
Many learning problems are NP-hard in the worst case: training a small neural network to zero error, finding the optimal decision tree, sparse regression with exactly $k$ nonzero weights, and $k$-means clustering. ML responds just as the article describes: gradient descent and Lloyd's algorithm are heuristics, Lasso replaces the hard $\ell_0$ constraint with a convex $\ell_1$ penalty, and greedy tree-growing replaces exhaustive search.
:::

:::real
Making a school timetable in which no teacher, room or class is double-booked is an NP-hard scheduling problem. Checking a finished timetable is easy, but building one is hard, which is why schools use specialised solver software and still sometimes need manual fixes.
:::

:::quiz
? Which is known to be true?
+ $P \subseteq NP$
- $P = NP$
- $P \ne NP$
> Any polynomial algorithm is also a verifier; equality is open.

? Which problem was the first proved NP-complete?
- graph colouring
+ SAT
- travelling salesperson
> The Cook–Levin theorem (1971).

? A graph has 10 vertices and its largest independent set has 4 vertices. What is the size of its smallest vertex cover?
= 6
> Complements of independent sets are vertex covers: $10 - 4$.

? At $10^9$ steps per second, about how many years do $2^{60}$ steps take? Give a whole number.
= 36|37
> $2^{60} \approx 1.15 \times 10^{18}$ steps is about $1.15 \times 10^9$ seconds, roughly 36.5 years.

? If $A \le_p B$ and $B \in P$, then:
+ $A \in P$
- $B$ is NP-complete
- nothing follows
> Transform with the reduction, then run $B$'s algorithm.

? NP stands for:
- not polynomial
+ nondeterministic polynomial time
- non-practical
> It is the class of problems verifiable in polynomial time.
:::
