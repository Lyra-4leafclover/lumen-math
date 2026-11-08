---
id: number-theory
title: Number Theory
tagline: Divisibility, primes and modular arithmetic: the integer mathematics behind cryptography, hashing and random numbers.
desc: Number theory studies the whole numbers, and it is the mathematics that secures the internet. You'll learn divisibility and the division algorithm, primes and unique factorization, gcd with Euclid's and the extended Euclidean algorithm, modular arithmetic and inverses, the Chinese Remainder Theorem, Fermat's and Euler's theorems, RSA encryption, hashing and pseudo-random number generators.
color: #14b8a6
symbol: ≡
area: Discrete math
paths: cs
order: 17
---

# Unit: Divisibility and primes

## Lesson: Divisibility and the division algorithm {#divisibility}
@summary: What it means for one integer to divide another, quotients and remainders, the division algorithm, and divisibility rules.

### Sharing things out evenly
Suppose 24 cookies are to be shared among a group of friends with nothing left over. With 2, 3, 4, 6, 8 or 12 friends it works perfectly, but with 5 friends you get 4 cookies each and 4 cookies remain. The friend counts that work are exactly the numbers that **divide** 24. This simple idea, sharing whole things without breaking them, is where number theory begins. Number theory is the study of the integers: the whole numbers $\dots, -2, -1, 0, 1, 2, \dots$. Because computers store and manipulate integers constantly, it is one of the most practical branches of mathematics for computer science, powering everything from hash tables to the encryption that protects online banking.

### The definition of divides
We say that an integer $a$ **divides** an integer $b$, written $a \mid b$, if there is an integer $k$ with $b = ak$. In that case $a$ is a **divisor** (or factor) of $b$, and $b$ is a **multiple** of $a$. For example, $3 \mid 12$ because $12 = 3\cdot 4$, and $7 \mid -21$ because $-21 = 7\cdot(-3)$. But $5 \nmid 12$, because no integer times 5 equals 12.

Two small cases surprise people. Every integer divides 0, because $0 = a\cdot0$. And 1 divides every integer. Notice also that $a \mid b$ is a *statement* (true or false), not a number. Do not confuse it with the fraction $a/b$; the vertical bar means "goes evenly into".

:::def Divides
For integers $a \ne 0$ and $b$, $a \mid b$ means $b = ak$ for some integer $k$. Then $a$ is a divisor of $b$ and $b$ is a multiple of $a$.
:::

### Basic properties
A few rules follow directly from the definition and are used constantly.

If $a \mid b$ and $b \mid c$, then $a \mid c$. Divisibility is **transitive**: since 3 divides 12 and 12 divides 60, 3 divides 60. The reason is that $b = ak$ and $c = bl$ give $c = a(kl)$.

If $a \mid b$ and $a \mid c$, then $a$ divides every combination $bx + cy$ with integer $x, y$. Since 4 divides 12 and 4 divides 20, 4 also divides $12\cdot2 - 20 = 4$ and $12 + 20 = 32$. The reason: $b = ak$ and $c = al$ give $bx + cy = a(kx + ly)$. This "linear combination" property is the engine behind Euclid's algorithm in a later lesson.

If $a \mid b$ and $b \ne 0$, then $|a| \le |b|$. A non-zero number cannot have a divisor bigger than itself in size.

### The division algorithm
When $a$ does not divide $b$, we still divide and get a remainder. You learned this in primary school: 17 divided by 5 is 3 remainder 2, because $17 = 5\cdot3 + 2$. The **division algorithm** states that this always works, and in exactly one way. For any integer $a$ and any positive integer $b$ there are unique integers $q$ (the **quotient**) and $r$ (the **remainder**) such that
$$a = bq + r, \qquad 0 \le r < b.$$
The condition $0 \le r < b$ is what makes the answer unique. We could also write $17 = 5\cdot2 + 7$, but 7 is too big to be a remainder.

Negative numbers need care. For $a = -17$ and $b = 5$, the rule requires a remainder between 0 and 4. Since $-17 = 5\cdot(-4) + 3$, the quotient is $-4$ and the remainder is 3. Many programming languages give $-2$ for `-17 % 5`, because they round the quotient towards zero; mathematicians, and Python, use the non-negative remainder 3. When you write code that uses remainders of negative numbers, check which convention your language uses.

:::def Quotient and remainder
For an integer $a$ and positive integer $b$, the unique $q, r$ with $a = bq + r$ and $0 \le r < b$. We write $r = a \bmod b$ and $q = \lfloor a/b\rfloor$.
:::

@fig modular m=5 k=1 | Remainders on division by 5 wrap around a clock with five positions, 0 to 4.

### Why the division algorithm is true
Imagine walking along the number line in steps of size $b$, starting from 0, in both directions. The multiples of $b$ cut the line into blocks of length $b$. The number $a$ lands in exactly one block, say the one starting at $bq$. Its distance from the start of that block is $r = a - bq$, which is at least 0 and less than $b$. Uniqueness holds because the blocks do not overlap. This picture also explains why the remainder is always one of $0, 1, \dots, b - 1$, exactly $b$ possibilities, a fact we used in the pigeonhole lesson.

### Divisibility rules
Some quick tests come from the decimal system. A number is divisible by 2 if its last digit is even, by 5 if its last digit is 0 or 5, and by 10 if its last digit is 0. A number is divisible by 3 if the sum of its digits is divisible by 3, and by 9 if the digit sum is divisible by 9. For example, 4518 has digit sum $4 + 5 + 1 + 8 = 18$, so it is divisible by 9: indeed $4518 = 9\cdot502$. The reason is that $10 = 9 + 1$ leaves remainder 1 on division by 9 (and by 3), so every power of 10 does too, and a number has the same remainder as its digit sum. A similar argument with $10 = 11 - 1$ gives the rule for 11: alternate adding and subtracting digits. For 918, $8 - 1 + 9 = 16$, not a multiple of 11, so 11 does not divide 918.

### Counting multiples
How many multiples of 7 are there between 1 and 100? The multiples are $7, 14, \dots, 7q$ where $7q \le 100$, so the count is the quotient $\lfloor 100/7\rfloor = 14$. The floor of $n/d$ counts multiples of $d$ up to $n$, which is the basic step in every inclusion-exclusion count of divisible numbers.

### Common mistakes
Writing $a \mid b$ when you mean $b \mid a$: "3 divides 12" is $3 \mid 12$, with the smaller number first. Allowing a remainder equal to or larger than the divisor. Getting negative remainders wrong, as above. And thinking 0 divides things: division by 0 is undefined, so $0 \mid b$ is only used, if at all, to mean $b = 0$.

### Summary
$a \mid b$ means $b$ is an integer multiple of $a$. Divisibility is transitive, and a common divisor of two numbers divides every integer combination of them. The division algorithm gives a unique quotient and remainder $a = bq + r$ with $0 \le r < b$, including for negative $a$. Digit-sum rules for 3, 9 and 11 come from the remainders of powers of 10, and $\lfloor n/d\rfloor$ counts the multiples of $d$ up to $n$.

@viz modular m=12 k=3 | Each residue i is joined to 3i mod 12. Multiples of 3 only reach some of the clock.

:::explore
**What to try**
1. With $m = 12$ and $k = 1$, read off the 12 possible remainders on division by 12.
2. Set $k = 3$. The positions reached, 0, 3, 6, 9, are the remainders of multiples of 3: because 3 divides 12, they form a small cycle.
3. Set $k = 5$. Now every position is reached; 5 shares no factor with 12.
4. Try $m = 9$ with $k = 3$ and then $k = 10$.

**What to notice:** the remainders always lie in $0, \dots, m - 1$, just as the division algorithm says. Whether a multiplier reaches every remainder depends on what it shares with $m$, which leads to the gcd lessons.
:::

:::formulas
$$a \mid b \iff b = ak \text{ for some } k\in\mathbb Z$$
$$a\mid b,\ b\mid c\ \Rightarrow\ a \mid c$$
$$a\mid b,\ a\mid c\ \Rightarrow\ a \mid bx + cy$$
$$a = bq + r,\quad 0\le r<b,\quad q = \lfloor a/b\rfloor$$
$$\#\{\text{multiples of } d \text{ in } 1..n\} = \lfloor n/d\rfloor$$
:::

:::thm Division algorithm
For every integer $a$ and every integer $b > 0$ there exist unique integers $q, r$ with $a = bq + r$ and $0 \le r < b$.
:::

:::proof
Existence: let $q = \lfloor a/b\rfloor$, the largest integer with $bq \le a$, and set $r = a - bq \ge 0$. If $r \ge b$ then $b(q+1) \le a$, contradicting the choice of $q$; so $0 \le r < b$. Uniqueness: if $a = bq + r = bq' + r'$ with both remainders in $[0, b)$, then $b(q - q') = r' - r$, and $|r' - r| < b$. A multiple of $b$ smaller than $b$ in size is 0, so $r = r'$ and $q = q'$.
:::

:::steps Find the quotient and remainder of $-23$ divided by 6
1. We need $-23 = 6q + r$ with $0 \le r \le 5$.
2. $6\cdot(-4) = -24 \le -23$, and $6\cdot(-3) = -18 > -23$, so $q = -4$.
3. $r = -23 + 24 = 1$. Check: $6\cdot(-4) + 1 = -23$.
:::

:::steps Is 7,425 divisible by 3, by 9 and by 11?
1. Digit sum $7 + 4 + 2 + 5 = 18$: divisible by 3 and by 9.
2. Alternating sum from the right: $5 - 2 + 4 - 7 = 0$: divisible by 11.
3. Indeed $7425 = 9\cdot825 = 11\cdot675$.
:::

:::steps Show that if $d \mid 35$ and $d \mid 21$ then $d \mid 7$
1. $d$ divides every combination $35x + 21y$.
2. Take $x = 2$, $y = -3$: $70 - 63 = 7$.
3. So $d \mid 7$.
:::

:::mock Exam question
Prove that the product of any three consecutive integers is divisible by 6, and find the remainder of $2^{10}$ on division by 7.
:::solution
Among three consecutive integers $n, n+1, n+2$, the remainders on division by 3 are three consecutive values, so one of them is 0 and 3 divides the product. At least one of any two consecutive integers is even, so 2 divides the product. Since the product is divisible by 2 and by 3, which share no factor, it is divisible by 6. For the second part, $2^3 = 8 = 7 + 1$ leaves remainder 1, so $2^9 = (2^3)^3$ leaves remainder 1 and $2^{10} = 2\cdot2^9$ leaves remainder 2. Check: $1024 = 7\cdot146 + 2$.
:::
:::

:::cs
The `%` operator, integer division `//`, array index wrap-around `i % n`, checking whether a number is even with `n & 1`, and splitting a number into digits with repeated `divmod(n, 10)` are the division algorithm in code. Check-digit schemes such as ISBN and credit card Luhn checks use divisibility by 10 or 11 to catch typing errors.
:::

:::real
Calendars are a division algorithm: a date 100 days from a Monday falls on $100 \bmod 7 = 2$ days later, a Wednesday. Packing 1,000 eggs into boxes of 12 gives quotient 83 full boxes and remainder 4 loose eggs.
:::

:::quiz
? What is the remainder when 100 is divided by 7?
= 2
> $100 = 7\cdot14 + 2$.

? What is $-17 \bmod 5$ (non-negative remainder)?
= 3
> $-17 = 5\cdot(-4) + 3$.

? How many multiples of 7 lie between 1 and 100?
= 14
> $\lfloor100/7\rfloor = 14$.

? What is the remainder of 1234 on division by 9?
= 1
> Digit sum $1 + 2 + 3 + 4 = 10$, and $10$ leaves remainder 1.

? If $a \mid b$ and $a \mid c$, which must $a$ divide?
+ $3b - 2c$
- $b/c$
- $b + 1$
> A common divisor divides every integer combination of $b$ and $c$.

? True or false: $0 \mid 5$.
- true
+ false
> No integer $k$ has $0\cdot k = 5$.
:::

## Lesson: Primes and unique factorization {#primes}
@summary: Prime numbers, the fundamental theorem of arithmetic, Euclid's proof that primes never run out, trial division and the sieve.

### The atoms of multiplication
Chemists break substances into atoms; number theorists break integers into primes. A **prime** is an integer greater than 1 whose only positive divisors are 1 and itself. The first primes are 2, 3, 5, 7, 11, 13, 17, 19, 23, 29. An integer greater than 1 that is not prime is **composite**: it can be written as a product of two smaller positive integers, like $12 = 3\cdot4$ or $91 = 7\cdot13$. The number 1 is neither prime nor composite. That is a convention, but a good one: if 1 were prime, factorizations would stop being unique, since $6 = 2\cdot3 = 1\cdot2\cdot3 = 1\cdot1\cdot2\cdot3$.

Why should a computer scientist care? Because the security of most of the internet rests on one fact about primes: multiplying two large primes is easy, but recovering them from their product seems to be extremely hard. We will see exactly how in the RSA lesson. Primes also choose hash table sizes, appear in random number generators, and drive error-correcting codes.

:::def Prime
An integer $p > 1$ whose only positive divisors are 1 and $p$. An integer $n > 1$ that is not prime is composite.
:::

### Breaking numbers into primes
Take 360. It is even, so $360 = 2\cdot180$. Keep splitting: $180 = 2\cdot90$, $90 = 2\cdot45$, $45 = 3\cdot15$, $15 = 3\cdot5$. So
$$360 = 2\cdot2\cdot2\cdot3\cdot3\cdot5 = 2^3\cdot3^2\cdot5.$$
Whatever order you split in, for example starting with $360 = 10\cdot36$, you always end with the same three 2s, two 3s and one 5. This is the **fundamental theorem of arithmetic**: every integer greater than 1 can be written as a product of primes, and this product is unique apart from the order of the factors.

Existence is easy to see. If $n$ is prime we are done. Otherwise $n = ab$ with both factors smaller than $n$, and we break each of them down further. The numbers keep getting smaller, so the process must stop, and it can only stop at primes. Uniqueness is the deep part. It rests on **Euclid's lemma**: if a prime $p$ divides a product $ab$, then $p$ divides $a$ or $p$ divides $b$. For example 3 divides $4\cdot 15 = 60$, and indeed 3 divides 15. This fails for composite numbers: 6 divides $4\cdot 9 = 36$ but divides neither 4 nor 9. We will prove Euclid's lemma in the extended Euclid lesson using Bézout's identity.

:::def Prime factorization
The expression of an integer $n > 1$ as $p_1^{e_1}p_2^{e_2}\cdots p_k^{e_k}$ with distinct primes $p_i$ and positive exponents $e_i$. It is unique up to order.
:::

### What factorizations tell you
Once you know the factorization, many questions become easy. A divisor of $360 = 2^3\cdot3^2\cdot5$ must be of the form $2^a3^b5^c$ with $0\le a\le3$, $0\le b\le2$ and $0\le c\le1$. By the product rule from combinatorics there are $4\cdot3\cdot2 = 24$ divisors. In general, $n = p_1^{e_1}\cdots p_k^{e_k}$ has $(e_1+1)(e_2+1)\cdots(e_k+1)$ positive divisors. The greatest common divisor of two numbers takes the smaller exponent of each prime, and the least common multiple takes the larger. For $12 = 2^2\cdot3$ and $18 = 2\cdot3^2$, the gcd is $2\cdot3 = 6$ and the lcm is $2^2\cdot3^2 = 36$.

### There are infinitely many primes
Do the primes ever run out? About 2,300 years ago Euclid proved that they do not, with one of the most elegant arguments in mathematics. Suppose there were only finitely many primes, $p_1, p_2, \dots, p_k$. Form the number $N = p_1p_2\cdots p_k + 1$. Dividing $N$ by any $p_i$ leaves remainder 1, so none of the listed primes divides $N$. But $N > 1$ has some prime factor, which must be a prime not on the list. That contradicts the assumption that the list contained every prime. So there are infinitely many. (Note that $N$ itself need not be prime: $2\cdot3\cdot5\cdot7\cdot11\cdot13 + 1 = 30031 = 59\cdot509$. It just has a prime factor not on the list.)

### Testing whether a number is prime
To test whether $n$ is prime by **trial division**, you only need to try dividing by the primes up to $\sqrt n$. The reason: if $n = ab$ with $1 < a \le b$, then $a\cdot a \le ab = n$, so $a \le \sqrt n$. A composite number always has a factor no bigger than its square root. To test 97, try 2, 3, 5 and 7 (since $\sqrt{97}\approx9.8$); none divide it, so 97 is prime. To test 221, try up to 14; 13 works, since $221 = 13\cdot17$.

To find *all* the primes up to some limit, the **sieve of Eratosthenes** is faster. List the numbers from 2 to $N$. Circle 2 and cross out all its larger multiples. The next uncrossed number, 3, is prime; cross out its multiples. Continue. You only need to sieve with primes up to $\sqrt N$, and every number left uncrossed is prime. Up to 100 this leaves 25 primes.

### How common are primes?
Primes thin out as numbers grow: there are 25 primes below 100, 168 below 1000 and 78,498 below a million. The **prime number theorem** says the number of primes up to $x$, written $\pi(x)$, is approximately $x/\ln x$. Near a number $x$, roughly one number in $\ln x$ is prime. For 300-digit numbers, $\ln x \approx 690$, so about one odd number in 345 is prime. This is why generating large random primes for cryptography is practical: you pick random odd numbers and test them until one passes, and you do not have to wait long.

### Common mistakes
Calling 1 a prime. Forgetting that 2 is prime (the only even prime). Testing divisors all the way to $n$ instead of stopping at $\sqrt n$. And assuming Euclid's number $p_1\cdots p_k + 1$ is always prime.

### Summary
A prime has exactly two positive divisors, 1 and itself. Every integer above 1 factors uniquely into primes, which tells you its divisors, and gcds and lcms through minimum and maximum exponents. Euclid's argument shows there are infinitely many primes. Trial division up to $\sqrt n$ tests one number, the sieve of Eratosthenes finds all primes up to a bound, and the prime number theorem says primes near $x$ have density about $1/\ln x$.

@viz sieve | Run the sieve of Eratosthenes on 1 to 100.

:::explore
**What to try**
1. Press Run and watch the multiples of 2 disappear, starting from $2^2 = 4$.
2. Notice that the crossing for 3 starts at $9$, for 5 at $25$ and for 7 at $49$: smaller multiples were already removed by smaller primes.
3. Watch the sieve stop after 7. The next prime, 11, has $11^2 = 121 > 100$.
4. Count the survivors: 25 primes.

**What to notice:** every composite number up to 100 is crossed out by a prime at most 10, which is the $\sqrt n$ rule from the article. The colours show the smallest prime factor of each composite.
:::

@viz euclid a=60 b=36 | The gcd of two numbers is built from the primes they share.

:::explore
**What to try**
1. With $a = 60 = 2^2\cdot3\cdot5$ and $b = 36 = 2^2\cdot3^2$, read the gcd: 12, the product of the shared primes with the smaller exponents, $2^2\cdot3$.
2. Change $b$ to 49, which shares no prime with 60. The gcd drops to 1.

**What to notice:** the factorization method and Euclid's rectangle method always agree; the next lesson explains Euclid's method, which needs no factoring at all.
:::

:::formulas
$$n = p_1^{e_1}p_2^{e_2}\cdots p_k^{e_k}\ \text{(unique)}$$
$$\#\text{divisors}(n) = (e_1+1)(e_2+1)\cdots(e_k+1)$$
$$\gcd = \prod p_i^{\min(e_i,f_i)},\quad \operatorname{lcm} = \prod p_i^{\max(e_i,f_i)}$$
$$n \text{ composite} \Rightarrow n \text{ has a prime factor} \le\sqrt n$$
$$\pi(x)\approx\frac{x}{\ln x}$$
:::

:::thm Fundamental theorem of arithmetic
Every integer $n > 1$ can be written as a product of primes, and any two such products are the same apart from the order of the factors.
:::

:::proof
Existence by strong induction: if $n$ is prime it is its own factorization; otherwise $n = ab$ with $1 < a, b < n$, and both $a$ and $b$ factor by induction. Uniqueness: suppose $p_1\cdots p_r = q_1\cdots q_s$ are two factorizations. The prime $p_1$ divides the right side, so by Euclid's lemma it divides some $q_j$, and since $q_j$ is prime, $p_1 = q_j$. Cancel it from both sides and repeat; the factors match one by one.
:::

:::thm Infinitude of primes (Euclid)
There are infinitely many prime numbers.
:::

:::proof
If $p_1, \dots, p_k$ were all the primes, $N = p_1\cdots p_k + 1$ leaves remainder 1 on division by each $p_i$, so no $p_i$ divides $N$. But $N > 1$ has a prime factor, which is then not in the list, a contradiction.
:::

:::steps How many positive divisors does 720 have?
1. $720 = 2^4\cdot3^2\cdot5$.
2. Divisors: $(4+1)(2+1)(1+1) = 30$.
:::

:::steps Is 211 prime?
1. $\sqrt{211}\approx14.5$, so test the primes 2, 3, 5, 7, 11, 13.
2. 211 is odd; digit sum 4, so not divisible by 3; does not end in 0 or 5.
3. $211 = 7\cdot30 + 1$, $211 = 11\cdot19 + 2$, $211 = 13\cdot16 + 3$.
4. No divisor found, so 211 is prime.
:::

:::steps Find gcd and lcm of 84 and 90 by factoring
1. $84 = 2^2\cdot3\cdot7$, $90 = 2\cdot3^2\cdot5$.
2. gcd: smaller exponents of shared primes, $2\cdot3 = 6$.
3. lcm: larger exponents of all primes, $2^2\cdot3^2\cdot5\cdot7 = 1260$.
4. Check: $6\cdot1260 = 7560 = 84\cdot90$.
:::

:::mock Exam question
Find the prime factorization of 1001, list how many positive divisors it has, and decide whether $2\cdot3\cdot5\cdot7 + 1$ is prime.
:::solution
$1001 = 7\cdot143 = 7\cdot11\cdot13$, so it has $2\cdot2\cdot2 = 8$ divisors: 1, 7, 11, 13, 77, 91, 143, 1001. Next, $2\cdot3\cdot5\cdot7 + 1 = 211$. By the trial division above (primes up to 13), 211 is prime. Euclid's construction happens to give a prime here, but it does not always, as $30031 = 59\cdot509$ shows.
:::
:::

:::cs
Cryptographic libraries generate 1024-bit primes by picking random odd numbers and running fast probabilistic primality tests such as Miller-Rabin, relying on the prime number theorem to know a prime will turn up within a few hundred tries. Hash tables often use a prime number of buckets so that patterns in keys do not line up with the table size.
:::

:::real
The security of online banking and messaging depends on the fact that nobody knows how to quickly factor a product of two random 1000-bit primes. Periodical cicadas emerge every 13 or 17 years; one theory is that prime cycles minimise overlap with predators' shorter cycles.
:::

:::quiz
? How many primes are there below 50?
= 15
> 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47.

? How many positive divisors does 72 have?
= 12
> $72 = 2^3\cdot3^2$, so $(3+1)(2+1) = 12$.

? To test whether 97 is prime by trial division, what is the largest prime you need to try?
= 7
> $\sqrt{97}<10$, so trying 2, 3, 5, 7 is enough.

? What is the lcm of 12 and 18?
= 36
> $2^2\cdot3^2 = 36$.

? Which of these is prime?
- 91
- 221
+ 101
- 1001
> $91 = 7\cdot13$, $221 = 13\cdot17$, $1001 = 7\cdot11\cdot13$; 101 has no prime factor up to 10.

? Why is 1 not considered prime?
+ It would make prime factorizations non-unique
- It is even
- It has too many divisors
> Allowing 1 would let us insert any number of 1s into a factorization.
:::

## Lesson: Greatest common divisor and Euclid's algorithm {#gcd-euclid}
@summary: The gcd and lcm, coprime numbers, and Euclid's fast remainder algorithm with its proof and running time.

### Tiling a floor with square tiles
A rectangular room measures 42 by 30 tiles' worth of length units, and you want to cover it with identical square tiles, as large as possible, without cutting any. The side of the tile must divide 42 and must divide 30. The common divisors are 1, 2, 3 and 6, so the largest tile has side 6. That number is the **greatest common divisor** of 42 and 30, written $\gcd(42, 30) = 6$.

The gcd shows up whenever two quantities must be split into equal pieces at the same time: reducing fractions ($\frac{42}{30} = \frac{7}{5}$ after dividing by 6), synchronising cycles, and, most importantly for us, deciding when a number has an inverse in modular arithmetic. Computing it quickly for numbers with hundreds of digits is essential in cryptography, and the method we use is more than two thousand years old.

:::def Greatest common divisor
For integers $a, b$ not both zero, $\gcd(a,b)$ is the largest positive integer dividing both. By convention $\gcd(a, 0) = |a|$.
:::

:::def Coprime
Integers $a$ and $b$ are coprime (relatively prime) if $\gcd(a,b) = 1$, that is, they share no prime factor.
:::

### The slow ways
One way to find a gcd is to list all divisors of both numbers and pick the largest common one. Another is to factor both numbers into primes and take the shared primes with their smaller exponents, as in the previous lesson. Both are fine for small numbers, but both are hopeless for large ones: listing divisors takes time proportional to the number itself, and factoring large numbers is so hard that internet security relies on it being slow. We need a method that never factors anything.

### Euclid's key observation
Here is the insight. Any number that divides both $a$ and $b$ also divides $a - b$, and also $a - qb$ for any integer $q$, because a common divisor divides every combination. Conversely, anything dividing both $b$ and $a - qb$ divides $a = (a - qb) + qb$. So the pairs $(a, b)$ and $(b, a - qb)$ have exactly the same common divisors, and therefore the same gcd. Choosing $q$ to be the quotient makes $a - qb$ the remainder $r = a \bmod b$:
$$\gcd(a, b) = \gcd(b,\ a \bmod b).$$
The new pair is smaller. Repeat until the remainder is 0, and use $\gcd(g, 0) = g$.

### Running the algorithm
Let us find $\gcd(252, 198)$. Each line divides the previous divisor by the previous remainder.
$$252 = 1\cdot198 + 54$$
$$198 = 3\cdot54 + 36$$
$$54 = 1\cdot36 + 18$$
$$36 = 2\cdot18 + 0$$
The last non-zero remainder is 18, so $\gcd(252, 198) = 18$. We never factored anything, yet the answer agrees with the factorizations $252 = 2^2\cdot3^2\cdot7$ and $198 = 2\cdot3^2\cdot11$, whose shared part is $2\cdot3^2 = 18$.

A second example: $\gcd(1071, 462)$. We get $1071 = 2\cdot462 + 147$, then $462 = 3\cdot147 + 21$, then $147 = 7\cdot21 + 0$. So the gcd is 21.

### The picture: squares in a rectangle
Euclid thought of this geometrically. Take a $42\times30$ rectangle. Cut off the largest square you can, $30\times30$, leaving a $30\times12$ strip ($42 = 1\cdot30 + 12$). From that strip cut two $12\times12$ squares, leaving $12\times6$ ($30 = 2\cdot12 + 6$). Finally the $12\times6$ piece splits exactly into two $6\times6$ squares. The smallest squares, of side 6, tile every piece, and so they tile the original rectangle. Each cut is one division step.

@fig euclid a=42 b=30 | Repeatedly cutting the largest possible square out of a 42 by 30 rectangle leaves squares of side 6, the gcd.

### How fast is it?
Each step replaces $(a, b)$ by $(b, r)$ with $r < b$. Better still, after two steps the larger number is at least halved: if $r$ is the remainder of $a$ on division by $b$, then $r < a/2$ (either $b \le a/2$ and $r < b$, or $b > a/2$ and $r = a - b < a/2$). So the number of steps is at most about $2\log_2$ of the smaller input, which grows with the number of *digits*, not with the size of the number. Gabriel Lamé showed in 1844 that the number of division steps is at most five times the number of decimal digits of the smaller number. The worst case is two consecutive Fibonacci numbers, where every quotient is 1: $\gcd(13, 8)$ takes five divisions ($13, 8, 5, 3, 2, 1$). For 600-digit numbers, a few thousand divisions suffice, which a computer does in microseconds.

### The least common multiple
The **least common multiple** $\operatorname{lcm}(a, b)$ is the smallest positive integer divisible by both. Two buses leave together, one every 12 minutes and one every 18; they next leave together after $\operatorname{lcm}(12, 18) = 36$ minutes. The gcd and lcm are linked by
$$\gcd(a,b)\cdot\operatorname{lcm}(a,b) = ab \quad (a, b > 0).$$
So $\operatorname{lcm}(12, 18) = 216/6 = 36$, and Euclid's algorithm computes lcms too. The reason is visible from prime exponents: for each prime, the gcd takes the smaller exponent and the lcm the larger, and $\min + \max$ is the sum of the two exponents.

### Euclid's algorithm in code
The algorithm is short enough to remember exactly. While the second number is not zero, replace the pair (a, b) by (b, a mod b); when the second number becomes zero, return the first. In Python that is a two-line loop, and almost every language ships it in its standard library. A useful habit when doing it by hand is to write each step as a full equation, dividend equals quotient times divisor plus remainder, rather than just the remainders. Those full lines are exactly what the extended algorithm in the next lesson needs, so writing them out now saves you from redoing the work later.

### Common mistakes
Stopping one step too early and reporting the last divisor instead of the last non-zero remainder is fine only if you remember which is which: the gcd is the divisor in the step whose remainder is 0. Dividing the smaller number by the larger: if $a < b$, the first step just swaps them, since $a \bmod b = a$. And thinking two numbers must be prime to be coprime: $8$ and $15$ are both composite but coprime.

### Summary
The gcd of two integers is their largest common divisor; coprime numbers have gcd 1. Euclid's algorithm uses $\gcd(a, b) = \gcd(b, a\bmod b)$ until the remainder is 0, and the last non-zero remainder is the gcd. It needs no factoring, takes a number of steps proportional to the number of digits, and is worst on consecutive Fibonacci numbers. The lcm follows from $\gcd\cdot\operatorname{lcm} = ab$.

@viz euclid a=42 b=30 | Each square cut is one step of Euclid's algorithm.

:::explore
**What to try**
1. With $a = 42$ and $b = 30$, follow the line of steps and match it to the rectangle cuts in the article.
2. Set $a = 89$, $b = 55$ (consecutive Fibonacci numbers) and count the steps; every quotient is 1, the slowest case.
3. Set $a = 100$, $b = 25$: one step, since 25 divides 100.
4. Pick two numbers with gcd 1, such as 35 and 12, and see the tiling end with unit squares.

**What to notice:** the smallest squares always tile the whole rectangle, because each piece is made of whole copies of the next smaller square. The gcd is the side of the smallest square, exactly the last non-zero remainder.
:::

:::formulas
$$\gcd(a,b) = \gcd(b,\ a\bmod b),\qquad \gcd(a,0) = |a|$$
$$\gcd(a,b)\cdot\operatorname{lcm}(a,b) = ab$$
$$\#\text{steps} \le 5\cdot(\text{digits of the smaller number})$$
$$\gcd(ka, kb) = k\gcd(a,b)$$
:::

:::thm Correctness of Euclid's algorithm
For integers $a$ and $b > 0$, $\gcd(a, b) = \gcd(b, a\bmod b)$. Consequently Euclid's algorithm terminates and returns $\gcd(a,b)$.
:::

:::proof
Write $a = qb + r$. If $d$ divides $a$ and $b$, it divides $r = a - qb$; if $d$ divides $b$ and $r$, it divides $a = qb + r$. So the two pairs have the same set of common divisors and hence the same greatest one. The second entry strictly decreases at each step and stays non-negative, so it reaches 0 after finitely many steps, at which point $\gcd(g, 0) = g$ is the answer.
:::

:::steps Find $\gcd(1071, 462)$
1. $1071 = 2\cdot462 + 147$.
2. $462 = 3\cdot147 + 21$.
3. $147 = 7\cdot21 + 0$, so the gcd is 21.
:::

:::steps Two lighthouses flash every 18 and every 24 seconds. They flash together now. When do they next flash together?
1. $\gcd(24, 18)$: $24 = 1\cdot18 + 6$, $18 = 3\cdot6$, so it is 6.
2. $\operatorname{lcm} = 24\cdot18/6 = 72$ seconds.
:::

:::steps Reduce the fraction $\frac{391}{667}$
1. $667 = 1\cdot391 + 276$; $391 = 1\cdot276 + 115$; $276 = 2\cdot115 + 46$; $115 = 2\cdot46 + 23$; $46 = 2\cdot23$.
2. The gcd is 23, and $391 = 23\cdot17$, $667 = 23\cdot29$.
3. So $\frac{391}{667} = \frac{17}{29}$.
:::

:::mock Exam question
Use Euclid's algorithm to find $\gcd(1001, 770)$ and then $\operatorname{lcm}(1001, 770)$.
:::solution
$1001 = 1\cdot770 + 231$; $770 = 3\cdot231 + 77$; $231 = 3\cdot77 + 0$. So $\gcd = 77$. Then $\operatorname{lcm} = \frac{1001\cdot770}{77} = 1001\cdot10 = 10010$. Check with factorizations: $1001 = 7\cdot11\cdot13$, $770 = 2\cdot5\cdot7\cdot11$; shared part $7\cdot11 = 77$, and the lcm is $2\cdot5\cdot7\cdot11\cdot13 = 10010$.
:::
:::

:::cs
`math.gcd` in Python, `std::gcd` in C++ and the reduction of rational numbers in every computer algebra system run Euclid's algorithm. Its logarithmic running time is why RSA key generation can check $\gcd(e, \varphi(n)) = 1$ instantly for 2048-bit numbers. A gcd of two RSA moduli that is not 1 reveals a shared prime, an attack that has broken real-world keys generated with poor randomness.
:::

:::ml
Learning-rate and batch schedules with periods $p$ and $q$ realign after $\operatorname{lcm}(p,q)$ steps, and data loaders that cycle two datasets of sizes $a$ and $b$ revisit the same pairing after $\operatorname{lcm}(a,b)$ batches. Choosing coprime periods avoids short repeating patterns.
:::

:::real
Gear trains: two meshing gears with 42 and 30 teeth return to their starting alignment after $\operatorname{lcm}(42,30) = 210$ teeth have passed, which is 5 turns of the large gear and 7 of the small one. Musicians meet the same idea in polyrhythms: a 3-beat and a 4-beat pattern line up every 12 beats.
:::

:::quiz
? What is $\gcd(48, 18)$?
= 6
> $48 = 2\cdot18 + 12$, $18 = 1\cdot12 + 6$, $12 = 2\cdot6$.

? What is $\gcd(1071, 462)$?
= 21
> See the worked example.

? What is $\operatorname{lcm}(21, 6)$?
= 42
> $\gcd = 3$, so $126/3 = 42$.

? How many division steps does Euclid's algorithm take for $\gcd(13, 8)$?
= 5
> $13 = 8 + 5$, $8 = 5 + 3$, $5 = 3 + 2$, $3 = 2 + 1$, $2 = 2\cdot1 + 0$.

? Which pair is coprime?
+ 8 and 15
- 12 and 18
- 21 and 35
> $8 = 2^3$ and $15 = 3\cdot5$ share no prime.

? $\gcd(a,b)\cdot\operatorname{lcm}(a,b)$ equals
+ $ab$
- $a + b$
- $\gcd(a,b)^2$
> For each prime, min plus max of the exponents is their sum.
:::

## Lesson: The extended Euclidean algorithm and Bézout's identity {#extended-euclid}
@summary: Writing the gcd as an integer combination, solving linear Diophantine equations, and proving Euclid's lemma.

### Measuring with two jugs
You have a 9-litre jug and a 4-litre jug and a tap, and you need exactly 1 litre. Fill the 9-litre jug and pour from it into the 4-litre jug twice, emptying the small jug each time: $9 - 4 - 4 = 1$ litre remains. In symbols, $1 = 1\cdot9 - 2\cdot4$. Could you measure 1 litre with a 6-litre and a 4-litre jug? No. Every amount you can make is a combination $6x + 4y$, which is always even. What separates the two cases is the gcd: $\gcd(9,4) = 1$ but $\gcd(6, 4) = 2$.

This lesson is about the precise statement behind that puzzle. **Bézout's identity** says the gcd of two numbers can always be written as an integer combination of them, and the **extended Euclidean algorithm** finds the combination. This is the single most important computational tool in this course: it is how computers find modular inverses, solve the Chinese Remainder Theorem and build RSA keys.

:::def Integer linear combination
An expression $ax + by$ where $x$ and $y$ are integers (possibly negative).
:::

:::def Bézout coefficients
Integers $x, y$ with $ax + by = \gcd(a, b)$. They exist for every $a, b$ not both zero, but are not unique.
:::

### Running Euclid backwards
Let us find integers $x, y$ with $99x + 78y = \gcd(99, 78)$. First run Euclid's algorithm and keep every line:
$$99 = 1\cdot78 + 21,\quad 78 = 3\cdot21 + 15,\quad 21 = 1\cdot15 + 6,\quad 15 = 2\cdot6 + 3,\quad 6 = 2\cdot3 + 0.$$
So the gcd is 3. Now rewrite each line as "remainder equals something" and substitute upwards, starting from the line that produced 3:
$$3 = 15 - 2\cdot6.$$
Replace 6 using $6 = 21 - 15$: $3 = 15 - 2(21 - 15) = 3\cdot15 - 2\cdot21$. Replace 15 using $15 = 78 - 3\cdot21$: $3 = 3\cdot78 - 9\cdot21 - 2\cdot21 = 3\cdot78 - 11\cdot21$. Replace 21 using $21 = 99 - 78$: $3 = 3\cdot78 - 11\cdot99 + 11\cdot78 = 14\cdot78 - 11\cdot99$. So $x = -11$, $y = 14$. Always check: $99\cdot(-11) + 78\cdot14 = -1089 + 1092 = 3$.

The key discipline is to keep the two original numbers as the "variables" and only collect coefficients. Each substitution replaces the smaller of the two current numbers by a combination of earlier ones.

### The table method
Back-substitution is error-prone, so programmers run the algorithm forwards, keeping track of how every remainder is expressed. Keep rows of the form (remainder, $x$, $y$) meaning remainder $= 99x + 78y$. Start with $(99, 1, 0)$ and $(78, 0, 1)$. Each new row is the row two above minus the quotient times the row above. With quotient 1: $(21, 1, -1)$. Quotient 3: $(15, -3, 4)$. Quotient 1: $(6, 4, -5)$. Quotient 2: $(3, -11, 14)$. The row with the gcd carries the coefficients $x = -11$, $y = 14$ directly. This is how `extended_gcd` is implemented in practice, often recursively in three lines.

### Bézout's identity and why it is true
For any integers $a, b$ not both zero, there are integers $x, y$ with $ax + by = \gcd(a, b)$. Moreover, $\gcd(a,b)$ is the *smallest positive* number of the form $ax + by$, and the numbers of that form are exactly the multiples of the gcd. The extended algorithm proves existence by construction. The second part explains the jug puzzle: the amounts you can measure are precisely the multiples of the gcd of the jug sizes.

### Linear Diophantine equations
An equation $ax + by = c$ to be solved in integers is called a linear Diophantine equation. It has a solution exactly when $\gcd(a,b)$ divides $c$. To find one, get Bézout coefficients for the gcd $d$ and multiply by $c/d$. For example, $21x + 15y = 6$: here $d = 3$ and $21\cdot(-2) + 15\cdot3 = 3$, so doubling gives $x = -4$, $y = 6$. All solutions are then
$$x = x_0 + \frac bd t,\qquad y = y_0 - \frac ad t,\qquad t\in\mathbb Z,$$
because adding $\frac bd$ to $x$ and subtracting $\frac ad$ from $y$ changes $ax + by$ by $\frac{ab}d - \frac{ab}d = 0$. So $21x + 15y = 6$ has solutions $x = -4 + 5t$, $y = 6 - 7t$; with $t = 1$ we get $x = 1$, $y = -1$, and indeed $21 - 15 = 6$. By contrast, $6x + 9y = 7$ has no integer solutions, since 3 does not divide 7.

### Euclid's lemma at last
Now we can prove the fact that made prime factorization unique: if a prime $p$ divides $ab$ and does not divide $a$, then $\gcd(p, a) = 1$, so there are $x, y$ with $px + ay = 1$. Multiply by $b$: $pbx + aby = b$. Both terms on the left are multiples of $p$ (the second because $p \mid ab$), so $p \mid b$. More generally, if $n \mid ab$ and $\gcd(n, a) = 1$ then $n \mid b$.

### A preview of inverses
If $\gcd(a, m) = 1$, Bézout gives $ax + my = 1$, so $ax$ leaves remainder 1 on division by $m$. That $x$ is the **inverse of $a$ modulo $m$**, the number that "undoes" multiplication by $a$ in clock arithmetic. For $a = 7$ and $m = 26$, the algorithm gives $7\cdot(-11) + 26\cdot3 = 1$, so the inverse is $-11$, or $15$ after adding 26: check $7\cdot15 = 105 = 4\cdot26 + 1$. We return to this in the modular inverses lesson.

### Checking and choosing your answer
There are infinitely many pairs of Bézout coefficients, so it is natural to ask which one to report. For a modular inverse we usually want the coefficient of the first number reduced to lie between 0 and the modulus minus one, which you get by adding or subtracting the modulus. For a linear Diophantine equation with a practical meaning, such as numbers of jugs poured or coins used, you may need the solution with both values non-negative, which you find by choosing a suitable value of the free parameter in the general solution. In every case the final check is the same and takes only a moment: multiply out and confirm that the combination really equals the gcd or the target value. That habit catches almost every sign error in back-substitution.

It also helps to see why the coefficients stay small. In the table method, each coefficient is bounded by the size of the other input divided by the gcd, so even for 2048-bit numbers the coefficients never grow beyond 2048 bits. The extended algorithm is therefore just as fast as the ordinary one, a few thousand steps at most for numbers used in cryptography.

### Common mistakes
Arithmetic slips in back-substitution: always check $ax + by$ at the end. Forgetting that Bézout coefficients are not unique; your answer may differ from a friend's by a multiple of $(b/d, -a/d)$ and both are right. And claiming $ax + by = c$ is solvable for every $c$; it needs $\gcd(a, b) \mid c$.

### Summary
The extended Euclidean algorithm tracks each remainder as a combination of the inputs and outputs integers $x, y$ with $ax + by = \gcd(a,b)$. Bézout's identity says this is always possible and that the gcd is the smallest positive combination. The equation $ax + by = c$ is solvable exactly when the gcd divides $c$, with solutions $x_0 + \frac bd t$, $y_0 - \frac ad t$. The same identity proves Euclid's lemma and computes modular inverses.

@viz euclid a=99 b=78 | Run Euclid's algorithm on 99 and 78; the extended algorithm reuses each of these lines.

:::explore
**What to try**
1. Read the five division lines and match them with the five lines in the article.
2. Write each line as "remainder = dividend - quotient × divisor" and redo the back-substitution yourself.
3. Change $b$ to 26 and $a$ to 7 and find the steps used for the inverse of 7 mod 26.
4. Try $a = 6$, $b = 4$: the gcd is 2, so no combination can equal 1.

**What to notice:** every remainder in the list is a combination of the two starting numbers, which is what the table method records. The final non-zero remainder is the gcd and the smallest positive combination.
:::

:::formulas
$$ax + by = \gcd(a,b)\ \text{has integer solutions}$$
$$(r_{i+1}, x_{i+1}, y_{i+1}) = (r_{i-1}, x_{i-1}, y_{i-1}) - q_i(r_i, x_i, y_i)$$
$$ax + by = c \text{ solvable} \iff \gcd(a,b)\mid c$$
$$x = x_0 + \tfrac bd t,\quad y = y_0 - \tfrac ad t$$
$$p\mid ab,\ p \text{ prime}\ \Rightarrow\ p\mid a \text{ or } p\mid b$$
:::

:::thm Bézout's identity
For integers $a, b$ not both zero, the smallest positive integer of the form $ax + by$ ($x, y\in\mathbb Z$) is $\gcd(a, b)$.
:::

:::proof
Let $S$ be the set of positive values of $ax + by$; it is non-empty, so it has a least element $s = ax_0 + by_0$. Divide $a$ by $s$: $a = qs + r$ with $0 \le r < s$. Then $r = a - qs = a(1 - qx_0) + b(-qy_0)$ is also a combination, so by minimality of $s$ it cannot be positive: $r = 0$ and $s \mid a$. Similarly $s \mid b$, so $s \le \gcd(a,b)$. On the other hand $\gcd(a,b)$ divides $a$ and $b$, hence divides $s$, so $\gcd(a,b) \le s$. Therefore $s = \gcd(a, b)$.
:::

:::steps Find $x, y$ with $35x + 12y = 1$
1. Euclid: $35 = 2\cdot12 + 11$, $12 = 1\cdot11 + 1$.
2. $1 = 12 - 11 = 12 - (35 - 2\cdot12) = 3\cdot12 - 35$.
3. So $x = -1$, $y = 3$. Check: $-35 + 36 = 1$.
:::

:::steps Find the inverse of 17 modulo 43
1. Euclid: $43 = 2\cdot17 + 9$, $17 = 1\cdot9 + 8$, $9 = 1\cdot8 + 1$.
2. Back-substitute: $1 = 9 - 8 = 9 - (17 - 9) = 2\cdot9 - 17 = 2(43 - 2\cdot17) - 17 = 2\cdot43 - 5\cdot17$.
3. So $17\cdot(-5) \equiv 1$, and the inverse is $-5 + 43 = 38$. Check: $17\cdot38 = 646 = 15\cdot43 + 1$.
:::

:::steps Can a 6-litre and a 15-litre jug measure exactly 4 litres?
1. $\gcd(6, 15) = 3$.
2. Measurable amounts are the multiples of 3; 4 is not one.
3. So it is impossible.
:::

:::mock Exam question
Find integers $x, y$ with $252x + 198y = 18$, and describe all integer solutions.
:::solution
From Euclid: $252 = 198 + 54$, $198 = 3\cdot54 + 36$, $54 = 36 + 18$. Back-substitute: $18 = 54 - 36 = 54 - (198 - 3\cdot54) = 4\cdot54 - 198 = 4(252 - 198) - 198 = 4\cdot252 - 5\cdot198$. So $x_0 = 4$, $y_0 = -5$ (check: $1008 - 990 = 18$). Since $d = 18$, $b/d = 11$ and $a/d = 14$, all solutions are $x = 4 + 11t$, $y = -5 - 14t$ for integers $t$.
:::
:::

:::cs
Every RSA implementation computes the private exponent $d = e^{-1} \bmod \varphi(n)$ with the extended Euclidean algorithm, and elliptic-curve libraries use it (or a constant-time variant) for every modular division. Solving $ax \equiv b \pmod m$ in compilers' loop analysis and in hash-table probing is the same computation.
:::

:::ml
Integer programming and lattice methods used in quantised neural networks rely on gcd and Bézout reasoning to know which integer weight combinations are reachable. When two periodic signals with integer periods are combined, Bézout explains which phase offsets can ever be realised.
:::

:::real
With 4-litre and 9-litre jugs you can measure any whole number of litres up to 9 because $\gcd(4, 9) = 1$. A shop that only has 5-unit and 7-unit packs can supply any order of 24 or more units: $24 = 2\cdot5 + 2\cdot7$; the existence of non-negative solutions for large amounts is the Frobenius coin problem, whose answer for coprime $a, b$ is that $ab - a - b = 23$ is the largest impossible amount.
:::

:::quiz
? $99x + 78y = 3$ has the solution $x = -11$. What is $y$?
= 14
> $99\cdot(-11) = -1089$, and $-1089 + 78y = 3$ gives $y = 14$.

? What is the inverse of 7 modulo 26 (between 0 and 25)?
= 15
> $7\cdot15 = 105 = 4\cdot26 + 1$.

? What is the smallest positive integer of the form $12x + 20y$ with integers $x, y$?
= 4
> It is $\gcd(12, 20) = 4$.

? Does $6x + 9y = 7$ have integer solutions?
- yes
+ no
> $\gcd(6, 9) = 3$ does not divide 7.

? One solution of $21x + 15y = 6$ is $(-4, 6)$. Which is another?
+ $(1, -1)$
- $(-3, 5)$
- $(2, 2)$
> Solutions are $(-4 + 5t, 6 - 7t)$; $t = 1$ gives $(1, -1)$.

? What is the largest amount that cannot be made from 5-unit and 7-unit packs?
= 23
> For coprime $a, b$ it is $ab - a - b = 35 - 12 = 23$.
:::

# Unit: Modular arithmetic

## Lesson: Modular arithmetic and congruences {#modular-arithmetic}
@summary: Clock arithmetic: congruence modulo m, residue classes, adding and multiplying remainders, and fast modular exponentiation.

### Arithmetic on a clock
If it is 9 o'clock now, what time will it be in 5 hours? Not 14 o'clock, but 2 o'clock, because a clock wraps around after 12. In 29 hours it will be 2 o'clock as well, since 29 hours is two full days and 5 extra hours. Clock arithmetic only cares about the remainder after removing full cycles. This idea, doing arithmetic where numbers wrap around after a fixed **modulus**, is called **modular arithmetic**. Carl Friedrich Gauss introduced the notation in 1801, and today it is everywhere in computing: integers stored in 32 or 64 bits wrap around modulo $2^{32}$ or $2^{64}$, hash functions reduce keys modulo the table size, and every public-key cryptosystem calculates modulo huge numbers.

### Congruence
Two integers $a$ and $b$ are **congruent modulo $m$**, written
$$a \equiv b \pmod m,$$
if they leave the same remainder on division by $m$. Equivalently, $m$ divides their difference $a - b$. For example, $29 \equiv 5 \pmod{12}$ because $29 - 5 = 24$ is a multiple of 12, and $-3 \equiv 9 \pmod{12}$ because $-3 - 9 = -12$. On the other hand $10 \not\equiv 4 \pmod 4$, since $6$ is not a multiple of 4.

Congruence behaves very much like equality. It is reflexive ($a \equiv a$), symmetric (if $a \equiv b$ then $b \equiv a$) and transitive (if $a \equiv b$ and $b \equiv c$ then $a \equiv c$). In the language of the sets and relations course, it is an equivalence relation. Its equivalence classes are called **residue classes**: modulo 5 there are exactly five, the classes of 0, 1, 2, 3 and 4, and every integer lies in exactly one. The set of these classes is written $\mathbb Z_m$ (or $\mathbb Z/m\mathbb Z$), and we usually name each class by its smallest non-negative member.

:::def Congruence modulo m
For a positive integer $m$, $a \equiv b \pmod m$ means $m \mid (a - b)$; equivalently $a$ and $b$ have the same remainder on division by $m$.
:::

:::def Residue class
The set of all integers congruent to a given $a$ modulo $m$, such as $\{\dots, -7, -2, 3, 8, 13, \dots\}$ modulo 5. The $m$ classes form $\mathbb Z_m = \{0, 1, \dots, m-1\}$.
:::

### Adding and multiplying remainders
The reason modular arithmetic is useful is that addition, subtraction and multiplication respect congruence. If $a \equiv a'$ and $b \equiv b' \pmod m$, then
$$a + b \equiv a' + b',\qquad a - b \equiv a' - b',\qquad ab \equiv a'b' \pmod m.$$
In practice, this means you may replace any number by its remainder at any stage of a calculation. What is $17\cdot23 \bmod 5$? Reduce first: $17 \equiv 2$ and $23 \equiv 3$, so the product is $\equiv 6 \equiv 1 \pmod 5$. Check: $17\cdot23 = 391 = 5\cdot78 + 1$. Reducing early keeps numbers small, which is exactly what computers do when they work with numbers far too large to multiply out.

Why does it work? Write $a' = a + km$ and $b' = b + lm$. Then $a'b' = ab + alm + bkm + klm^2 = ab + m(\text{something})$, so $a'b' \equiv ab$. The extra terms are all multiples of $m$, and multiples of $m$ are invisible modulo $m$.

### Powers and last digits
Because multiplication respects congruence, so do powers: if $a \equiv b$ then $a^k \equiv b^k$. Together with a little pattern-spotting, this answers questions that look impossible. What is the last digit of $2^{2026}$? The last digit is the remainder mod 10. The powers of 2 end in $2, 4, 8, 6, 2, 4, 8, 6, \dots$, repeating every 4, because $2^5 = 32 \equiv 2$. Since $2026 = 4\cdot506 + 2$, the last digit of $2^{2026}$ matches that of $2^2$, which is 4.

### Fast exponentiation by repeated squaring
Patterns are not always easy to spot, so computers use **repeated squaring**. To compute $a^{n} \bmod m$, write $n$ in binary, square repeatedly to get $a, a^2, a^4, a^8, \dots$ (reducing mod $m$ every time), and multiply together the powers that correspond to 1-bits. For $3^{13} \bmod 7$: $13 = 8 + 4 + 1$. Squares: $3^1 \equiv 3$, $3^2 = 9 \equiv 2$, $3^4 \equiv 2^2 = 4$, $3^8 \equiv 4^2 = 16 \equiv 2$. So $3^{13} \equiv 2\cdot4\cdot3 = 24 \equiv 3 \pmod 7$. This takes about $2\log_2 n$ multiplications instead of $n - 1$. For an exponent with 2048 bits that is the difference between about 4000 multiplications and more steps than there are atoms in the universe. RSA would be impossible without it.

### What does not carry over: division
Division is the one operation that does not automatically work. Modulo 10 we have $2\cdot3 \equiv 2\cdot8$ (both are 6 mod 10), yet $3 \not\equiv 8$. We cannot "cancel the 2" because 2 shares a factor with 10. Even stranger, $2\cdot5 \equiv 0 \pmod{10}$ although neither factor is 0: non-zero numbers can multiply to zero. Such numbers are called **zero divisors**. Cancelling $a$ from both sides is allowed exactly when $\gcd(a, m) = 1$; when $m$ is prime that is every non-zero $a$, which is why prime moduli are so pleasant. The next lesson develops this into modular inverses.

@fig modular m=12 k=1 | The 12 residue classes modulo 12 arranged on a clock; adding moves around the circle.

### Negative numbers and code
In mathematics, $-3 \bmod 12 = 9$, always a value from $0$ to $m - 1$. In C, Java and JavaScript, `-3 % 12` is `-3`, while Python returns 9. When you need the mathematical residue in those languages, use `((a % m) + m) % m`. Integer overflow is also modular arithmetic: in 8-bit unsigned arithmetic, $200 + 100 = 300 \equiv 44 \pmod{256}$.

### Thinking in residues
A helpful mental shift is to stop thinking of a number like 29 as "twenty-nine" and start thinking of it, modulo 12, as "the same as 5". Once you are working modulo 12, there are really only twelve numbers in the world, and every calculation lands back on one of them. Big numbers are just long names for small residues. That is why the method scales: the size of the inputs never matters, only the size of the modulus.

### Common mistakes
Dividing both sides of a congruence by a number that shares a factor with the modulus. Forgetting to reduce intermediate results, so numbers explode. Reducing exponents modulo $m$: $a^k \bmod m$ is generally not $a^{k \bmod m} \bmod m$; the right rule for exponents is Euler's theorem, coming later. And mixing up "$a \equiv b \pmod m$", a relation, with "$a \bmod m$", the operation that produces a remainder.

### Summary
$a \equiv b \pmod m$ means $m$ divides $a - b$, and it splits the integers into $m$ residue classes. Addition, subtraction, multiplication and powers respect congruence, so you can reduce at every step. Repeated squaring computes $a^n \bmod m$ with about $2\log_2 n$ multiplications. Division is only safe by numbers coprime to $m$, because otherwise zero divisors appear.

@viz modular m=12 k=5 | Each residue i is joined to 5i mod 12, the multiplication table of 5 on a clock.

:::explore
**What to try**
1. With $m = 12$ and $k = 5$, follow the chord from 1: it lands on 5. From 5 it lands on $25 \equiv 1$. Multiplying by 5 twice gets you back where you started.
2. Set $k = 4$. Only 0, 4 and 8 are reachable; and $4\cdot3 \equiv 0$, a zero divisor.
3. Set $k = 17$ and compare with $k = 5$: the picture is identical because $17 \equiv 5 \pmod{12}$.
4. Change $m$ to a prime such as 13 and try several $k$ from 1 to 12.

**What to notice:** replacing $k$ by anything congruent to it changes nothing, which is the rule "you may reduce at any stage". For a prime modulus every non-zero $k$ reaches every residue, which is why cancellation always works mod a prime.
:::

:::formulas
$$a \equiv b \pmod m \iff m \mid a - b$$
$$a\equiv a',\ b\equiv b' \Rightarrow a\pm b\equiv a'\pm b',\ ab\equiv a'b'$$
$$a \equiv b \Rightarrow a^k \equiv b^k \pmod m$$
$$a^n:\ \text{square-and-multiply in } \approx 2\log_2 n \text{ steps}$$
$$ax \equiv ay \pmod m,\ \gcd(a,m) = 1 \Rightarrow x \equiv y$$
:::

:::thm Congruence respects addition and multiplication
If $a \equiv a' \pmod m$ and $b \equiv b' \pmod m$, then $a + b \equiv a' + b'$ and $ab \equiv a'b' \pmod m$.
:::

:::proof
Write $a' = a + km$ and $b' = b + lm$. Then $a' + b' = a + b + (k + l)m$ and $a'b' = ab + (al + bk + klm)m$. In both cases the difference from the original is a multiple of $m$.
:::

:::steps Compute $7^{100} \bmod 10$ (the last digit of $7^{100}$)
1. Powers of 7 mod 10: $7, 9, 3, 1$, then repeat (since $7^4 = 2401 \equiv 1$).
2. $100 = 4\cdot25$, so $7^{100} = (7^4)^{25} \equiv 1$.
3. The last digit is 1.
:::

:::steps Compute $5^{13} \bmod 11$ by repeated squaring
1. $13 = 8 + 4 + 1$ in binary.
2. $5^1 \equiv 5$, $5^2 = 25 \equiv 3$, $5^4 \equiv 9$, $5^8 \equiv 81 \equiv 4$.
3. $5^{13} \equiv 4\cdot9\cdot5 = 180 \equiv 4 \pmod{11}$ (since $180 = 16\cdot11 + 4$).
:::

:::steps What day of the week is it 1000 days after a Tuesday?
1. $1000 = 7\cdot142 + 6$, so $1000 \equiv 6 \pmod 7$.
2. Six days after Tuesday is Monday.
:::

:::mock Exam question
Compute $3^{200} \bmod 13$, and show that $n^2 \bmod 4$ is always 0 or 1.
:::solution
$3^3 = 27 = 2\cdot13 + 1 \equiv 1 \pmod{13}$. Since $200 = 3\cdot66 + 2$, $3^{200} = (3^3)^{66}\cdot3^2 \equiv 1\cdot9 = 9$. For the second part, every $n$ is congruent to 0, 1, 2 or 3 mod 4, and the squares are $0, 1, 4 \equiv 0, 9 \equiv 1$. So a perfect square leaves remainder 0 or 1 mod 4; for instance no number of the form $4k + 3$ is a perfect square.
:::
:::

:::cs
Fixed-width integers are arithmetic modulo $2^{w}$, so overflow is wrap-around, not an error, in C and in hardware. Circular buffers use `(head + 1) % capacity`, and modular exponentiation `pow(a, n, m)` in Python is the square-and-multiply loop. Checksums such as ISBN-10 (mod 11) and IBAN (mod 97) detect typing errors with congruences.
:::

:::ml
Positional encodings in transformers use sines and cosines of the position, which are periodic: position $p$ and $p + 2\pi/\omega$ look identical to that frequency, a continuous version of congruence. The hashing trick for features computes `hash(word) % n_buckets`, and integer arithmetic in quantised inference wraps modulo $2^8$ or $2^{32}$.
:::

:::real
Clocks (mod 12 or 24), days of the week (mod 7), compass bearings (mod 360 degrees) and odometers that roll over are all modular arithmetic. A delivery scheduled 50 hours after 10 a.m. arrives at $(10 + 50) \bmod 24 = 12$, noon, two days later.
:::

:::quiz
? What is $17\cdot23 \bmod 5$?
= 1
> $17\equiv2$, $23\equiv3$, $2\cdot3 = 6\equiv1$.

? What is $-7 \bmod 12$ (between 0 and 11)?
= 5
> $-7 + 12 = 5$.

? What is the last digit of $3^{2026}$?
= 9
> Powers of 3 end in $3, 9, 7, 1$; $2026 \equiv 2 \pmod 4$, so the digit is 9.

? What is $2^{10} \bmod 11$?
= 1
> $1024 = 93\cdot11 + 1$.

? Modulo 10, $2\cdot3 \equiv 2\cdot8$. Can we conclude $3 \equiv 8$?
- yes
+ no
> 2 shares a factor with 10, so cancelling it is not allowed.

? Which integer is congruent to 29 modulo 12?
+ $-7$
- 7
- 3
> $29 - (-7) = 36 = 3\cdot12$.
:::

## Lesson: Modular inverses and linear congruences {#modular-inverses}
@summary: When division works modulo m, computing inverses with extended Euclid, solving ax ≡ b, units and the affine cipher.

### Undoing multiplication
In ordinary arithmetic, dividing by 3 undoes multiplying by 3. Modulo 7, there are no fractions, but we can still undo multiplication by 3: since $3\cdot5 = 15 \equiv 1 \pmod 7$, multiplying by 5 has the same effect as dividing by 3. If $3x \equiv 4 \pmod 7$, multiply both sides by 5 to get $x \equiv 20 \equiv 6$. Check: $3\cdot6 = 18 \equiv 4$. The number 5 plays the role of $\frac13$ modulo 7; it is called the **inverse** of 3 modulo 7.

Inverses are what make modular arithmetic a complete system for solving equations, and they are the crucial ingredient in the Chinese Remainder Theorem and RSA. They are also how a cipher is decrypted: if a message is scrambled by multiplying by $a$, it is unscrambled by multiplying by $a^{-1}$.

:::def Modular inverse
An integer $x$ with $ax \equiv 1 \pmod m$ is an inverse of $a$ modulo $m$, written $a^{-1} \bmod m$. It is unique modulo $m$ when it exists.
:::

:::def Unit
A residue $a$ that has an inverse modulo $m$. The units modulo $m$ are exactly the residues coprime to $m$; there are $\varphi(m)$ of them.
:::

### When does an inverse exist?
Not every number has an inverse. Modulo 10, try to invert 2: the products $2x \bmod 10$ are $0, 2, 4, 6, 8$, always even, never 1. In general, $ax \equiv 1 \pmod m$ means $ax + my = 1$ for some integer $y$. By Bézout's identity, such $x, y$ exist exactly when $\gcd(a, m) = 1$. So:

$a$ has an inverse modulo $m$ if and only if $\gcd(a, m) = 1$.

Modulo 10, the invertible residues are 1, 3, 7 and 9 (the ones coprime to 10), with $1\cdot1 = 1$, $3\cdot7 = 21 \equiv 1$ and $9\cdot9 = 81 \equiv 1$. Modulo a prime $p$, every residue from 1 to $p - 1$ is coprime to $p$, so every non-zero number has an inverse. Modulo 7, the pairs are $1 \leftrightarrow 1$, $2 \leftrightarrow 4$, $3 \leftrightarrow 5$ and $6 \leftrightarrow 6$. This makes $\mathbb Z_p$ a **field**, a number system where you can add, subtract, multiply and divide (except by zero), just like the rationals or reals.

### Computing inverses with extended Euclid
For small moduli you can search: try $x = 1, 2, 3, \dots$ until $ax \equiv 1$. For large moduli that is far too slow, but the extended Euclidean algorithm finds $x$ with $ax + my = 1$ in a logarithmic number of steps, and that $x$, reduced mod $m$, is the inverse. For $5^{-1} \bmod 26$: $26 = 5\cdot5 + 1$, so $1 = 26 - 5\cdot5$, giving $x = -5 \equiv 21$. Check: $5\cdot21 = 105 = 4\cdot26 + 1$. For a prime modulus there is a second method, Fermat's little theorem, which gives $a^{-1} \equiv a^{p-2} \pmod p$; we will prove it in the Fermat and Euler lesson.

### Solving linear congruences
A linear congruence is an equation $ax \equiv b \pmod m$. There are three cases.

If $\gcd(a, m) = 1$, there is exactly one solution modulo $m$: $x \equiv a^{-1}b$. For $3x \equiv 4 \pmod 7$ we found $x \equiv 6$.

If $d = \gcd(a, m) > 1$ and $d$ does not divide $b$, there is no solution. For example $4x \equiv 3 \pmod{10}$: the left side is always even modulo 10 (it differs from $4x$ by a multiple of 10), so it cannot be 3.

If $d > 1$ and $d \mid b$, divide everything by $d$ and solve the smaller congruence, which then has exactly one solution modulo $m/d$; this gives $d$ solutions modulo $m$. For $4x \equiv 6 \pmod{10}$, $d = 2$ divides 6, so we solve $2x \equiv 3 \pmod 5$. The inverse of 2 mod 5 is 3, so $x \equiv 9 \equiv 4 \pmod 5$. Modulo 10 the solutions are $x = 4$ and $x = 9$. Check: $16 \equiv 6$ and $36 \equiv 6 \pmod{10}$.

### The affine cipher
Number the letters A = 0 to Z = 25 and encrypt each letter $x$ as $E(x) = (5x + 8) \bmod 26$. The letter H ($x = 7$) becomes $(35 + 8) \bmod 26 = 43 - 26 = 17$, the letter R. To decrypt, solve $y \equiv 5x + 8$ for $x$: $x \equiv 5^{-1}(y - 8) = 21(y - 8) \pmod{26}$. For $y = 17$: $21\cdot9 = 189 = 7\cdot26 + 7$, so $x = 7$, H again. The multiplier must be coprime to 26, otherwise two letters would encrypt to the same letter and decryption would be impossible. This toy cipher is easily broken, but its structure, encryption by an invertible modular operation, is the same as in serious ones.

@fig modular m=7 k=3 | Multiplying by 3 modulo 7 permutes the residues; following the arrows backwards is multiplying by the inverse, 5.

### A table of inverses
For a small modulus it is worth writing out a full table once, because it makes the pattern obvious. Modulo 11, which is prime, every non-zero residue has a partner: 1 pairs with 1, 2 with 6, 3 with 4, 5 with 9, 7 with 8, and 10 with 10. Notice that 1 and 10 are their own inverses. In general, modulo a prime, the only numbers that are their own inverse are 1 and the number one less than the modulus, because the congruence "x squared is 1" factors into "x minus 1 times x plus 1 is 0", and a prime can only divide a product by dividing one of the factors.

Modulo 12, which is not prime, the table is much emptier. Only 1, 5, 7 and 11 have inverses, and each is its own inverse: 5 times 5 is 25, which is one more than 24. The other eight residues share a factor with 12 and have no partner at all. This contrast is the practical reason many algorithms prefer a prime modulus: with a prime, every non-zero value can be divided by, and no information is lost when you multiply.

### Why the inverse is unique
If $x$ and $x'$ are both inverses of $a$ modulo $m$, then $x \equiv x(ax') = (xa)x' \equiv x'$. So there is only one inverse in the range $0$ to $m - 1$, and we can talk about *the* inverse.

### Common mistakes
Writing $a^{-1}$ as the fraction $1/a$ and computing a decimal; modular inverses are integers. Trying to invert a number that shares a factor with the modulus. Forgetting to reduce a negative Bézout coefficient into the range $0$ to $m - 1$. And reporting only one solution of $ax \equiv b \pmod m$ when $\gcd(a, m) = d > 1$ divides $b$, in which case there are $d$ of them.

### Summary
$a$ has an inverse modulo $m$ exactly when $\gcd(a, m) = 1$, and the extended Euclidean algorithm computes it. Modulo a prime every non-zero residue is invertible, so $\mathbb Z_p$ is a field. The congruence $ax \equiv b \pmod m$ has one solution if $\gcd(a, m) = 1$, none if $d = \gcd(a,m)$ does not divide $b$, and $d$ solutions otherwise. Invertible multiplication is the basis of decryption in modular ciphers.

@viz modular m=26 k=5 | Multiplication by 5 modulo 26, the scrambling step of the affine cipher.

:::explore
**What to try**
1. With $m = 26$ and $k = 5$, check that every residue is hit exactly once: multiplying by 5 is a reversible shuffle.
2. Set $k = 21$, the inverse of 5. Follow 1 to 21, then imagine applying 5: $105 \equiv 1$, back to the start.
3. Set $k = 13$. Only two residues are reachable, so 13 has no inverse mod 26.
4. Change $m$ to 7 and try $k = 3$, then $k = 5$.

**What to notice:** the widget reports that $k$ is invertible exactly when $\gcd(k, m) = 1$, the criterion from the article. A reversible shuffle of the residues is what a valid cipher multiplier must produce.
:::

:::formulas
$$a^{-1} \bmod m \text{ exists} \iff \gcd(a, m) = 1$$
$$ax + my = 1 \Rightarrow a^{-1} \equiv x \pmod m$$
$$a^{-1} \equiv a^{p-2} \pmod p \quad (p \text{ prime},\ p\nmid a)$$
$$ax\equiv b \pmod m \text{ has } \begin{cases}1 & \gcd(a,m)=1\\ 0 & d\nmid b\\ d & d \mid b\end{cases}\ \text{solutions mod } m$$
:::

:::thm Existence of inverses
An integer $a$ has a multiplicative inverse modulo $m$ if and only if $\gcd(a, m) = 1$, and the inverse is unique modulo $m$.
:::

:::proof
If $ax \equiv 1 \pmod m$, then $ax - 1 = my$ for some $y$, so $ax - my = 1$, and any common divisor of $a$ and $m$ divides 1. Conversely, if $\gcd(a, m) = 1$, Bézout gives $ax + my = 1$, so $ax \equiv 1$. Uniqueness: if $ax \equiv ax' \equiv 1$, multiplying by $x$ gives $x' \equiv x(ax') \equiv (xa)x' \equiv x$.
:::

:::steps Find the inverse of 11 modulo 26
1. $26 = 2\cdot11 + 4$, $11 = 2\cdot4 + 3$, $4 = 1\cdot3 + 1$.
2. $1 = 4 - 3 = 4 - (11 - 2\cdot4) = 3\cdot4 - 11 = 3(26 - 2\cdot11) - 11 = 3\cdot26 - 7\cdot11$.
3. So $11^{-1} \equiv -7 \equiv 19$. Check: $11\cdot19 = 209 = 8\cdot26 + 1$.
:::

:::steps Solve $4x \equiv 6 \pmod{10}$
1. $d = \gcd(4, 10) = 2$ divides 6, so there are 2 solutions.
2. Divide by 2: $2x \equiv 3 \pmod 5$; $2^{-1} \equiv 3$, so $x \equiv 9 \equiv 4 \pmod 5$.
3. Solutions modulo 10: $x = 4$ and $x = 9$.
:::

:::steps Decrypt the letter T (19) from the affine cipher $E(x) = 5x + 8 \bmod 26$
1. $x \equiv 21(y - 8) = 21\cdot11 = 231$.
2. $231 = 8\cdot26 + 23$, so $x = 23$, the letter X.
3. Check: $5\cdot23 + 8 = 123 = 4\cdot26 + 19$.
:::

:::mock Exam question
Solve $9x \equiv 6 \pmod{15}$ completely, and find the inverse of 9 modulo 16 or explain why it does not exist.
:::solution
$\gcd(9, 15) = 3$ divides 6, so there are 3 solutions mod 15. Divide by 3: $3x \equiv 2 \pmod 5$. The inverse of 3 mod 5 is 2, so $x \equiv 4 \pmod 5$, giving $x \in \{4, 9, 14\}$ mod 15. Check: $36 = 2\cdot15 + 6$, $81 = 5\cdot15 + 6$, $126 = 8\cdot15 + 6$. For the second part, $\gcd(9, 16) = 1$, so the inverse exists. Since $9\cdot9 = 81 = 5\cdot16 + 1$, the inverse of 9 modulo 16 is 9.
:::
:::

:::cs
Elliptic-curve and RSA libraries perform millions of modular inversions; division in finite fields (used in Reed-Solomon error-correcting codes on QR codes, CDs and in RAID-6 storage) is multiplication by an inverse. Compilers replace division by a constant with multiplication by a modular inverse of the divisor modulo $2^{64}$ when the result is known to be exact.
:::

:::ml
Some secure-aggregation protocols for federated learning mask each client's model update with random values modulo a large prime and later cancel the masks, which requires inverses in $\mathbb Z_p$. Exact integer linear algebra, for example in lattice-based privacy-preserving inference, solves linear systems modulo primes using inverses instead of floating-point division.
:::

:::real
Affine and Hill ciphers in recreational cryptography decrypt with inverses modulo 26. Check-digit systems choose weights coprime to the modulus so that any single wrong digit changes the check value, which is the same invertibility condition.
:::

:::quiz
? What is the inverse of 3 modulo 11?
= 4
> $3\cdot4 = 12 \equiv 1$.

? What is the inverse of 5 modulo 26?
= 21
> $5\cdot21 = 105 = 4\cdot26 + 1$.

? Solve $3x \equiv 4 \pmod 7$ (answer between 0 and 6).
= 6
> $x \equiv 5\cdot4 = 20 \equiv 6$.

? How many residues modulo 12 have an inverse?
= 4
> Those coprime to 12: 1, 5, 7, 11.

? Does 6 have an inverse modulo 9?
- yes
+ no
> $\gcd(6, 9) = 3 \ne 1$.

? What is the inverse of 2 modulo 101?
= 51
> $2\cdot51 = 102 \equiv 1$.
:::

## Lesson: The Chinese Remainder Theorem {#chinese-remainder}
@summary: Solving several congruences at once: existence and uniqueness for coprime moduli, the constructive formula, and non-coprime cases.

### An ancient puzzle
Around the third century, the Chinese mathematician Sun Zi posed this problem: "There are certain things whose number is unknown. Counted by threes, two are left over; counted by fives, three are left over; counted by sevens, two are left over. How many things are there?" In modern notation we want $x$ with
$$x \equiv 2 \pmod 3,\qquad x \equiv 3 \pmod 5,\qquad x \equiv 2 \pmod 7.$$
The answer is 23 (check: $23 = 7\cdot3 + 2 = 4\cdot5 + 3 = 3\cdot7 + 2$), and any number that differs from 23 by a multiple of $3\cdot5\cdot7 = 105$ also works, such as 128 or 233. The general statement that such systems can always be solved when the moduli share no factors is called the **Chinese Remainder Theorem** (CRT).

Why should a programmer care? Because the CRT says that a number modulo $mn$ is completely described by its remainders modulo $m$ and modulo $n$. That lets you split one big computation into several small independent ones, run them in parallel, and glue the answers back together. RSA decryption is about four times faster this way, and big-integer libraries and signal processing use the same idea.

:::def System of congruences
A set of conditions $x \equiv a_1 \pmod{m_1}, \dots, x \equiv a_k \pmod{m_k}$ to be satisfied by the same integer $x$.
:::

:::def Pairwise coprime
Moduli $m_1, \dots, m_k$ are pairwise coprime if $\gcd(m_i, m_j) = 1$ for every $i \ne j$.
:::

### Two moduli by hand
Start with two conditions: $x \equiv 2 \pmod 3$ and $x \equiv 3 \pmod 5$. The first says $x$ is one of $2, 5, 8, 11, 14, \dots$. Look down that list for a number that leaves remainder 3 mod 5: 2 (no), 5 (no), 8 (yes). So $x \equiv 8 \pmod{15}$. This listing method, called **sieving**, works for small moduli.

A more systematic way is **substitution**. From the first condition, $x = 3k + 2$. Substituting into the second: $3k + 2 \equiv 3 \pmod 5$, so $3k \equiv 1$, and since $3^{-1} \equiv 2 \pmod 5$, $k \equiv 2$. Thus $k = 5j + 2$ and $x = 3(5j + 2) + 2 = 15j + 8$. Same answer: $x \equiv 8 \pmod{15}$. Now add the third condition, $x \equiv 2 \pmod 7$: $15j + 8 \equiv 2$, so $15j \equiv -6 \equiv 1 \pmod 7$. As $15 \equiv 1 \pmod 7$, $j \equiv 1$, and $x = 15(7i + 1) + 8 = 105i + 23$. The solution is $x \equiv 23 \pmod{105}$.

### Why there is exactly one answer
With coprime moduli $m$ and $n$, think about the numbers $0, 1, \dots, mn - 1$ and the pair of remainders (mod $m$, mod $n$) for each. There are exactly $mn$ possible pairs. If two different numbers $x, y$ in this range had the same pair, then $m \mid x - y$ and $n \mid x - y$; since $m$ and $n$ share no prime factor, $mn \mid x - y$, which is impossible for two different numbers less than $mn$ apart. So all $mn$ numbers give different pairs, and since there are exactly $mn$ pairs, every pair is hit exactly once. This is the pigeonhole principle used in reverse: a one-to-one map between two sets of the same finite size must be onto.

@fig g09-crt m=3 n=5 a=2 b=3 | Every number from 0 to 14 written in the cell (x mod 3, x mod 5). Each cell holds exactly one number.

### The constructive formula
Sometimes it is convenient to have a single formula. Let $M = m_1m_2\cdots m_k$ and $M_i = M/m_i$, the product of all the other moduli. Because the moduli are pairwise coprime, $M_i$ is coprime to $m_i$ and has an inverse $y_i \equiv M_i^{-1} \pmod{m_i}$. Then
$$x \equiv \sum_{i=1}^k a_iM_iy_i \pmod M.$$
Each term $a_iM_iy_i$ is $\equiv a_i$ modulo $m_i$ (because $M_iy_i \equiv 1$) and $\equiv 0$ modulo every other $m_j$ (because $M_i$ contains the factor $m_j$). So the sum has exactly the right remainder for every modulus. For Sun Zi's problem, $M = 105$, $M_1 = 35$, $M_2 = 21$, $M_3 = 15$. The inverses are $35^{-1} \equiv 2^{-1} \equiv 2 \pmod 3$, $21^{-1} \equiv 1 \pmod 5$ and $15^{-1} \equiv 1 \pmod 7$. So $x \equiv 2\cdot35\cdot2 + 3\cdot21\cdot1 + 2\cdot15\cdot1 = 140 + 63 + 30 = 233 \equiv 23 \pmod{105}$.

### When the moduli are not coprime
If the moduli share a factor, the system may have no solution or many. Take $x \equiv 1 \pmod 4$ and $x \equiv 2 \pmod 6$. The first says $x$ is odd, the second says $x$ is even: they contradict each other modulo $\gcd(4, 6) = 2$, so there is no solution. But $x \equiv 1 \pmod 4$ and $x \equiv 3 \pmod 6$ agree modulo 2 (both odd), and the solution is $x \equiv 9 \pmod{12}$, unique modulo $\operatorname{lcm}(4,6) = 12$ rather than modulo 24. In general a system $x \equiv a \pmod m$, $x \equiv b \pmod n$ is solvable exactly when $a \equiv b \pmod{\gcd(m,n)}$, and then the solution is unique modulo $\operatorname{lcm}(m, n)$.

### Computing in pieces
The CRT means you can represent a number modulo $M = 105$ by its three remainders. Adding or multiplying such representations works component by component: to multiply $23 \leftrightarrow (2, 3, 2)$ by $2 \leftrightarrow (2, 2, 2)$, multiply each component, $(4, 6, 4) \equiv (1, 1, 4)$, which corresponds to $46$. Indeed $23\cdot2 = 46$, and $46 \bmod 3 = 1$, $46 \bmod 5 = 1$, $46 \bmod 7 = 4$. Big calculations can be done as many small ones on separate processors, with no carries passing between them.

### A strategy for any system
When you face a system of congruences in an exam or in code, a simple routine works every time. First, check the moduli pairwise: if any two share a factor, check that their remainders agree modulo that common factor, or stop and report that there is no solution. Second, solve the first two congruences by substitution, which leaves one combined congruence modulo the lcm of the two moduli. Third, combine that result with the next congruence in the same way, and keep going until every condition has been absorbed. Finally, check your answer against every original condition, because a single arithmetic slip is easy to make and very easy to detect. This routine never needs the big formula, works even when the moduli are not coprime, and only ever requires one modular inverse per step.

### Common mistakes
Using the formula when the moduli are not pairwise coprime; the inverses $y_i$ may not exist. Forgetting the "mod $M$" at the end and reporting only one of infinitely many solutions without saying so. Computing $M_i^{-1}$ modulo $M$ instead of modulo $m_i$. And assuming a system with non-coprime moduli is always unsolvable; it is solvable when the remainders agree modulo the gcd.

### Summary
For pairwise coprime moduli, a system of congruences has exactly one solution modulo the product $M$. You can find it by sieving, by successive substitution, or by the formula $x = \sum a_iM_iy_i$ with $y_i = M_i^{-1} \bmod m_i$. Without coprimality, a solution exists exactly when the conditions agree modulo the gcds, and it is unique modulo the lcm. The CRT lets big modular computations be split into small independent ones.

@viz g09-crt m=3 n=5 a=2 b=3 | Rows are x mod m, columns are x mod n. Choose the two remainders and find the highlighted solution.

:::explore
**What to try**
1. With $m = 3$, $n = 5$, $a = 2$, $b = 3$, find the highlighted cell: it contains 8, matching the hand calculation in the article.
2. Move $a$ and $b$ through all values and check that every cell contains exactly one number from 0 to 14.
3. Set $m = 4$, $n = 6$. Now only 12 of the 24 cells are used. Try $a = 1$, $b = 2$ (no solution) and $a = 1$, $b = 3$ (solution 9).
4. Try $m = 5$, $n = 7$ and solve $x \equiv 3 \pmod 5$, $x \equiv 2 \pmod 7$.

**What to notice:** for coprime moduli the numbers fill the grid one per cell, which is the uniqueness argument from the article. When $\gcd(m, n) > 1$, the numbers only fill cells whose remainders agree modulo the gcd.
:::

:::formulas
$$\gcd(m,n) = 1:\ x \equiv a \ (m),\ x \equiv b\ (n) \text{ has a unique solution mod } mn$$
$$x \equiv \sum_i a_iM_iy_i \pmod M,\quad M_i = \tfrac{M}{m_i},\ y_i \equiv M_i^{-1} \pmod{m_i}$$
$$\text{solvable} \iff a \equiv b \pmod{\gcd(m,n)},\ \text{unique mod } \operatorname{lcm}(m,n)$$
:::

:::thm Chinese Remainder Theorem
If $m_1, \dots, m_k$ are pairwise coprime and $M = m_1\cdots m_k$, then for any integers $a_1, \dots, a_k$ the system $x \equiv a_i \pmod{m_i}$ has a solution, and any two solutions are congruent modulo $M$.
:::

:::proof
Existence: $x = \sum_i a_iM_iy_i$ works, since modulo $m_j$ every term with $i \ne j$ vanishes ($m_j \mid M_i$) and the $j$-th term is $a_jM_jy_j \equiv a_j$. Uniqueness: if $x$ and $x'$ are solutions, each $m_i$ divides $x - x'$. The $m_i$ are pairwise coprime, so by unique factorization their product $M$ divides $x - x'$.
:::

:::steps Solve $x \equiv 3 \pmod 4$, $x \equiv 5 \pmod 9$
1. $x = 4k + 3$, so $4k + 3 \equiv 5 \pmod 9$, i.e. $4k \equiv 2$.
2. $4^{-1} \equiv 7 \pmod 9$ (since $28 \equiv 1$), so $k \equiv 14 \equiv 5$.
3. $x = 4\cdot5 + 3 = 23$, so $x \equiv 23 \pmod{36}$.
:::

:::steps Find the smallest positive $x$ with remainder 1 when divided by 2, 3, 4, 5 and 6, and divisible by 7
1. Remainder 1 by 2, 3, 4, 5, 6 means $x \equiv 1 \pmod{\operatorname{lcm} = 60}$.
2. Solve $60j + 1 \equiv 0 \pmod 7$: $60 \equiv 4$, so $4j \equiv -1 \equiv 6$, and $j \equiv 6\cdot2 = 12 \equiv 5$ (as $4^{-1} \equiv 2$).
3. $x = 301$. Check: $301 = 7\cdot43$ and $300$ is divisible by 60.
:::

:::steps Is the system $x \equiv 1 \pmod 4$, $x \equiv 2 \pmod 6$ solvable?
1. $\gcd(4, 6) = 2$.
2. The remainders 1 and 2 differ modulo 2 (odd versus even).
3. No solution.
:::

:::mock Exam question
Solve Sun Zi's system $x \equiv 2 \pmod 3$, $x \equiv 3 \pmod 5$, $x \equiv 2 \pmod 7$ using the constructive formula, and give the smallest positive solution.
:::solution
$M = 105$; $M_1 = 35$, $M_2 = 21$, $M_3 = 15$. Inverses: $35 \equiv 2 \pmod 3$ and $2\cdot2 = 4 \equiv 1$, so $y_1 = 2$; $21 \equiv 1 \pmod 5$, so $y_2 = 1$; $15 \equiv 1 \pmod 7$, so $y_3 = 1$. Then $x \equiv 2\cdot35\cdot2 + 3\cdot21\cdot1 + 2\cdot15\cdot1 = 233 \equiv 23 \pmod{105}$. The smallest positive solution is 23.
:::
:::

:::cs
RSA implementations decrypt with CRT: they compute $c^d$ modulo $p$ and modulo $q$ separately, with exponents half the size, and recombine, roughly a fourfold speed-up. Residue number systems in hardware and fast multiplication algorithms work modulo several primes in parallel and use the CRT to rebuild the answer. Secret-sharing schemes use the CRT so that a secret can be rebuilt only from enough remainders.
:::

:::ml
Some exact integer linear algebra and polynomial routines, used in symbolic and verified computations around ML models, work modulo several word-sized primes and combine the results with the CRT. Hash-based feature schemes sometimes use two coprime table sizes so that the pair of bucket indices identifies an item modulo their product, a CRT-style trick to reduce collisions.
:::

:::real
Calendar coincidences are CRT problems: if one event repeats every 4 years and another every 7, a year with given positions in both cycles recurs every 28 years, and the Julian calendar's 28-year cycle of weekdays comes from exactly this. Astronomers use the same reasoning to predict when cycles of different lengths realign.
:::

:::quiz
? Find $x$ between 0 and 14 with $x \equiv 1 \pmod 3$ and $x \equiv 2 \pmod 5$.
= 7
> $7 = 2\cdot3 + 1 = 5 + 2$.

? Find $x$ between 0 and 11 with $x \equiv 2 \pmod 3$ and $x \equiv 3 \pmod 4$.
= 11
> $11 = 3\cdot3 + 2 = 2\cdot4 + 3$.

? Solutions of $x \equiv 2\ (3)$, $x \equiv 3\ (5)$, $x \equiv 2\ (7)$ are unique modulo what number?
= 105
> The moduli are pairwise coprime, so modulo $3\cdot5\cdot7$.

? Smallest positive $x$ with $x \equiv 1 \pmod{60}$ and $7 \mid x$?
= 301
> See the worked example.

? The system $x \equiv 1 \pmod 4$, $x \equiv 3 \pmod 6$ has solutions unique modulo
- 24
+ 12
- 2
> The remainders agree mod 2, so the solution is unique modulo $\operatorname{lcm}(4,6) = 12$.

? Which pair of moduli is pairwise coprime?
+ 8 and 9
- 6 and 9
- 10 and 15
> $\gcd(8, 9) = 1$.
:::

## Lesson: Fermat's little theorem and Euler's theorem {#fermat-euler}
@summary: Powers modulo a prime always return to 1; Euler's totient function and its generalisation; reducing huge exponents and testing primality.

### Powers that come back around
Compute the powers of 3 modulo 7: $3, 2, 6, 4, 5, 1$, and then the list repeats. The sixth power is 1. Try 2 modulo 7: $2, 4, 1, 2, 4, 1$, so $2^3 \equiv 1$ and therefore also $2^6 \equiv 1$. Try any number from 1 to 6, and its sixth power is 1 modulo 7. Try modulo 11: every number from 1 to 10 has tenth power 1. This pattern, noticed by Pierre de Fermat in 1640, is **Fermat's little theorem**: if $p$ is prime and $p$ does not divide $a$, then
$$a^{p-1} \equiv 1 \pmod p.$$
It is called "little" to distinguish it from his famous last theorem, but it is far more useful in practice. It lets us reduce huge exponents, compute inverses, and test whether numbers are prime, and it is the mathematical heart of RSA.

### Why it works
Fix a prime $p$ and a number $a$ not divisible by $p$. Multiply each of the non-zero residues $1, 2, \dots, p - 1$ by $a$. Because $a$ has an inverse mod $p$, the results $a, 2a, \dots, (p-1)a$ are all different modulo $p$ (if $ia \equiv ja$, cancel $a$ to get $i \equiv j$), and none of them is 0. So they are just the numbers $1, \dots, p - 1$ again, shuffled. Multiply them all together:
$$a\cdot2a\cdots(p-1)a \equiv 1\cdot2\cdots(p-1) \pmod p,$$
that is, $a^{p-1}(p-1)! \equiv (p-1)!$. The factorial is coprime to $p$, so we may cancel it, leaving $a^{p-1} \equiv 1$. The shuffling picture is exactly what the modular clock widget shows when you multiply by a number modulo a prime.

An equivalent form, valid for every integer $a$, is $a^p \equiv a \pmod p$. For $p = 5$ and $a = 2$: $2^5 = 32 = 6\cdot5 + 2$.

### Reducing huge exponents
What is $3^{100} \bmod 7$? Since $3^6 \equiv 1$, we can throw away multiples of 6 from the exponent: $100 = 6\cdot16 + 4$, so $3^{100} = (3^6)^{16}\cdot3^4 \equiv 3^4 = 81 \equiv 4 \pmod 7$. The rule is: modulo a prime $p$, exponents can be reduced modulo $p - 1$ (for bases not divisible by $p$). Similarly $2^{2026} \bmod 101$: since 101 is prime, $2^{100} \equiv 1$, and $2026 \equiv 26 \pmod{100}$, so $2^{2026} \equiv 2^{26} \pmod{101}$, which a few squarings reduce to 20.

### Inverses from Fermat
Rewriting $a^{p-1} = a\cdot a^{p-2} \equiv 1$ shows that $a^{p-2}$ is the inverse of $a$ modulo $p$. For $5^{-1} \bmod 7$: $5^5 = 3125 = 446\cdot7 + 3$, so the inverse is 3, and indeed $5\cdot3 = 15 \equiv 1$. With fast exponentiation this is a practical alternative to extended Euclid when the modulus is prime.

### Euler's totient function
What about a composite modulus? Leonhard Euler found the right generalisation. Define the **totient** $\varphi(n)$ as the number of integers from 1 to $n$ that are coprime to $n$. For example $\varphi(10) = 4$ (namely 1, 3, 7, 9), $\varphi(12) = 4$ (1, 5, 7, 11) and $\varphi(7) = 6$. For a prime, $\varphi(p) = p - 1$. Using the factorization of $n$, inclusion-exclusion gives
$$\varphi(n) = n\prod_{p\mid n}\left(1 - \frac1p\right),$$
so $\varphi(36) = 36\cdot\frac12\cdot\frac23 = 12$ and $\varphi(100) = 100\cdot\frac12\cdot\frac45 = 40$. For two different primes, $\varphi(pq) = (p-1)(q-1)$, a formula RSA depends on.

:::def Euler's totient function
$\varphi(n)$ is the number of integers $k$ with $1 \le k \le n$ and $\gcd(k, n) = 1$; equivalently, the number of units modulo $n$.
:::

:::def Order of an element
The order of $a$ modulo $n$ (with $\gcd(a, n) = 1$) is the smallest positive $k$ with $a^k \equiv 1 \pmod n$. It always divides $\varphi(n)$.
:::

### Euler's theorem
**Euler's theorem**: if $\gcd(a, n) = 1$ then $a^{\varphi(n)} \equiv 1 \pmod n$. The proof is the same shuffle argument, using only the $\varphi(n)$ residues coprime to $n$ instead of all non-zero residues. Fermat's little theorem is the special case $n = p$. For example, the last digit of $7^{222}$: $\varphi(10) = 4$ and $222 \equiv 2 \pmod 4$, so $7^{222} \equiv 7^2 = 49 \equiv 9$. The last two digits of $3^{40}$: $\varphi(100) = 40$, so $3^{40} \equiv 1 \pmod{100}$; the last two digits are 01.

### Testing primality
Fermat's theorem gives a quick test that a number is *not* prime. If $a^{n-1} \not\equiv 1 \pmod n$ for some $a$ coprime to $n$, then $n$ is certainly composite. For $n = 15$: $2^{14} = 16384 = 1092\cdot15 + 4$, not 1, so 15 is composite, and we learned this without finding a factor. The converse fails: $2^{340} \equiv 1 \pmod{341}$ although $341 = 11\cdot31$. Worse, **Carmichael numbers** such as $561 = 3\cdot11\cdot17$ satisfy $a^{560} \equiv 1 \pmod{561}$ for every $a$ coprime to 561. Practical tests like Miller-Rabin strengthen the Fermat test so that every composite fails for most bases.

@fig modular m=7 k=3 | Multiplying the residues 1 to 6 by 3 modulo 7 just shuffles them, the key step in the proof.

### Seeing the cycle of powers
It helps to look at the powers of a fixed number as a cycle. Modulo 7, the powers of 3 run through all six non-zero residues before returning to 1, so 3 is said to have order 6. The powers of 2 run through only three residues, 2, 4 and 1, so 2 has order 3. Fermat's theorem does not say that every number needs exactly six steps to return to 1; it says that six steps always bring it back, because the length of every cycle divides six. A number whose cycle is as long as possible is called a primitive root, and primitive roots are what Diffie-Hellman key exchange uses as its base.

This cycle view also explains the exponent-reduction rule in plain words. If a sequence repeats every six steps, then to find the hundredth term you only need to know where one hundred falls in the cycle, which is its remainder after dividing by six. Euler's theorem gives the same guarantee for any modulus: the powers of a unit repeat with a cycle length dividing the totient, so the totient is always a safe number to reduce exponents by.

### A worked check with small numbers
Take the modulus 10 and the base 3. The totient of 10 is 4, so Euler predicts that the fourth power of 3 is congruent to 1. Indeed the powers of 3 end in 3, 9, 7 and then 1, since the fourth power is 81. The cycle of last digits has length exactly 4. For the base 9 the cycle is 9, 1, of length 2, which divides 4 as promised.

### Common mistakes
Using Fermat when $p$ divides $a$ (then $a^{p-1} \equiv 0$, not 1). Reducing exponents modulo $p$ instead of $p - 1$, or modulo $n$ instead of $\varphi(n)$. Applying Euler's theorem when $\gcd(a, n) \ne 1$. And treating a passed Fermat test as proof of primality.

### Summary
Fermat: for prime $p$ not dividing $a$, $a^{p-1} \equiv 1 \pmod p$, so exponents reduce modulo $p - 1$ and $a^{p-2}$ is the inverse of $a$. Euler: $a^{\varphi(n)} \equiv 1 \pmod n$ whenever $\gcd(a,n) = 1$, with $\varphi(n) = n\prod(1 - 1/p)$ and $\varphi(pq) = (p-1)(q-1)$. Both proofs rest on multiplication by a unit shuffling the units. Failing the Fermat test proves compositeness; passing it does not prove primality.

@viz modular m=7 k=3 | Multiplication by k modulo a prime m permutes the non-zero residues.

:::explore
**What to try**
1. With $m = 7$, $k = 3$, check that the arrows from 1, 2, 3, 4, 5, 6 land on 3, 6, 2, 5, 1, 4: the same six residues, shuffled.
2. Try every $k$ from 1 to 6. Each is a shuffle, because 7 is prime.
3. Set $m = 10$ and $k = 3$. The units 1, 3, 7, 9 are shuffled among themselves, which is the setting of Euler's theorem with $\varphi(10) = 4$.
4. Set $m = 10$, $k = 2$: not a unit, and the arrows collapse.

**What to notice:** the product of the residues before and after shuffling is the same, which is exactly the equation $a^{p-1}(p-1)! \equiv (p-1)!$ in the proof.
:::

:::formulas
$$a^{p-1} \equiv 1 \pmod p\quad(p \text{ prime},\ p \nmid a)$$
$$a^p \equiv a \pmod p\quad(\text{all } a)$$
$$a^{\varphi(n)} \equiv 1 \pmod n\quad(\gcd(a,n) = 1)$$
$$\varphi(n) = n\prod_{p\mid n}\Big(1 - \frac1p\Big),\quad \varphi(pq) = (p-1)(q-1)$$
$$a^{-1} \equiv a^{p-2} \pmod p$$
:::

:::thm Euler's theorem
If $\gcd(a, n) = 1$, then $a^{\varphi(n)} \equiv 1 \pmod n$. In particular (Fermat) $a^{p-1} \equiv 1 \pmod p$ for a prime $p$ not dividing $a$.
:::

:::proof
Let $r_1, \dots, r_{\varphi(n)}$ be the residues coprime to $n$. The products $ar_1, \dots, ar_{\varphi(n)}$ are coprime to $n$ and pairwise incongruent (since $a$ is invertible, $ar_i \equiv ar_j$ forces $r_i \equiv r_j$), so they are the same residues in some order. Multiplying all of them, $a^{\varphi(n)}\prod r_i \equiv \prod r_i \pmod n$. The product $\prod r_i$ is coprime to $n$, hence invertible; cancelling it gives $a^{\varphi(n)} \equiv 1$.
:::

:::steps Compute $2^{100} \bmod 13$
1. 13 is prime, so $2^{12} \equiv 1$.
2. $100 = 12\cdot8 + 4$, so $2^{100} \equiv 2^4 = 16 \equiv 3$.
:::

:::steps Compute $\varphi(36)$ and $\varphi(35)$
1. $36 = 2^2\cdot3^2$: $\varphi = 36\cdot\frac12\cdot\frac23 = 12$.
2. $35 = 5\cdot7$: $\varphi = 4\cdot6 = 24$.
:::

:::steps Show that 15 is composite with a Fermat test
1. Compute $2^{14} \bmod 15$: $2^4 = 16 \equiv 1$, so $2^{14} = (2^4)^3\cdot2^2 \equiv 4$.
2. $4 \ne 1$, so 15 cannot be prime.
:::

:::mock Exam question
Find $2^{2026} \bmod 101$ and the last digit of $7^{222}$.
:::solution
101 is prime, so $2^{100} \equiv 1$ and $2^{2026} \equiv 2^{26}$. Square repeatedly mod 101: $2^8 = 256 \equiv 54$, $2^{16} \equiv 54^2 = 2916 \equiv 88$ (since $2916 - 28\cdot101 = 88$), $2^{24} = 2^{16}\cdot2^8 \equiv 88\cdot54 = 4752 \equiv 5$ (since $4752 - 47\cdot101 = 5$), so $2^{26} \equiv 5\cdot4 = 20$. Hence $2^{2026} \equiv 20 \pmod{101}$. For the last digit of $7^{222}$, use $\varphi(10) = 4$ and $222 \equiv 2 \pmod 4$: $7^{222} \equiv 49 \equiv 9 \pmod{10}$. The last digit is 9.
:::
:::

:::cs
RSA correctness is Euler's theorem: $m^{ed} \equiv m \pmod n$ because $ed \equiv 1 \pmod{\varphi(n)}$. Key generation finds large primes with Miller-Rabin, a strengthened Fermat test. Diffie-Hellman key exchange works in the group of units modulo a prime, whose size $p - 1$ is governed by Fermat's theorem.
:::

:::ml
Pseudo-random generators for simulations and data shuffling (multiplicative congruential generators like $x \mapsto 16807x \bmod (2^{31}-1)$) get their period from the order of the multiplier, which divides $p - 1$ by Fermat. Secure multi-party ML protocols use exponentiation modulo primes and rely on these theorems to reduce exponents.
:::

:::real
Every time a browser shows a padlock, a key exchange or signature that depends on Fermat's and Euler's theorems has just run. Credit-card terminals and smart cards perform these modular exponentiations in dedicated hardware.
:::

:::quiz
? What is $2^{100} \bmod 13$?
= 3
> $2^{12}\equiv1$; $100\equiv4 \pmod{12}$; $2^4 = 16\equiv3$.

? What is $\varphi(36)$?
= 12
> $36\cdot\frac12\cdot\frac23 = 12$.

? What is $\varphi(100)$?
= 40
> $100\cdot\frac12\cdot\frac45 = 40$.

? Using Fermat, what is $5^{-1} \bmod 7$?
= 3
> $5^{5} \equiv 3$, and $5\cdot3 = 15\equiv1$.

? What is $3^{100} \bmod 7$?
= 4
> $3^6\equiv1$, $100\equiv4 \pmod 6$, $3^4 = 81\equiv4$.

? If $2^{n-1} \equiv 1 \pmod n$, then $n$ is
- certainly prime
+ possibly prime, possibly composite
- certainly composite
> Pseudoprimes like 341 and Carmichael numbers like 561 pass the test.
:::

# Unit: Number theory in computing

## Lesson: RSA public-key cryptography {#rsa}
@summary: How RSA builds a public lock and a private key from two primes, why decryption works by Euler's theorem, and why it is believed secure.

### A lock anyone can close
Imagine you want strangers to send you secret letters. You could mail out thousands of open padlocks: anyone can snap one shut on a box, but only you have the key that opens them. You never have to share the key, so nobody can steal it in transit. That is the idea of **public-key cryptography**, invented in the 1970s. The most famous system, **RSA**, named after Ron Rivest, Adi Shamir and Leonard Adleman who published it in 1977, builds such a padlock out of the number theory of the previous lessons. Every time you see a padlock icon in a browser, RSA or a close relative is helping to set up the connection.

The puzzle RSA solves is this. We need a function that is easy for anyone to compute (closing the lock) but hard to undo (opening it) unless you know a secret (the key). RSA's function is modular exponentiation, $m \mapsto m^e \bmod n$, and the secret is the factorization of $n$.

:::def Public key and private key
In RSA, the public key is a pair $(n, e)$ that anyone may use to encrypt; the private key is an exponent $d$ (with the primes $p, q$) that only the owner knows and uses to decrypt.
:::

:::def RSA modulus
$n = pq$, the product of two large distinct primes $p$ and $q$. Its security rests on the difficulty of recovering $p$ and $q$ from $n$.
:::

### Building the keys, step by step
Here is the whole recipe, first with tiny numbers so that every step can be checked by hand.

Step 1: choose two different primes. Take $p = 5$ and $q = 11$.

Step 2: multiply them to get the modulus $n = pq = 55$.

Step 3: compute $\varphi(n) = (p-1)(q-1) = 4\cdot10 = 40$. Only someone who knows $p$ and $q$ can do this easily.

Step 4: choose a public exponent $e$ with $\gcd(e, \varphi(n)) = 1$. Take $e = 3$; indeed $\gcd(3, 40) = 1$.

Step 5: compute the private exponent $d = e^{-1} \bmod \varphi(n)$ with the extended Euclidean algorithm. Since $40 = 13\cdot3 + 1$, we get $1 = 40 - 13\cdot3$, so $d \equiv -13 \equiv 27 \pmod{40}$. Check: $3\cdot27 = 81 = 2\cdot40 + 1$.

Publish $(n, e) = (55, 3)$. Keep $d = 27$ (and $p$, $q$) secret.

### Encrypting and decrypting
A message is first turned into a number $m$ with $0 \le m < n$. To encrypt, anyone computes $c = m^e \bmod n$. To decrypt, the owner computes $c^d \bmod n$. Let us send $m = 7$. Encryption: $7^3 = 343 = 6\cdot55 + 13$, so the ciphertext is $c = 13$. Decryption: $13^{27} \bmod 55$, computed by repeated squaring, comes out as 7. The message is recovered.

### Why decryption works
Decryption computes $(m^e)^d = m^{ed}$. Since $ed \equiv 1 \pmod{\varphi(n)}$, write $ed = 1 + k\varphi(n)$. If $\gcd(m, n) = 1$, Euler's theorem gives $m^{\varphi(n)} \equiv 1$, so
$$m^{ed} = m\cdot\left(m^{\varphi(n)}\right)^k \equiv m\cdot1^k = m \pmod n.$$
The rare messages that share a factor with $n$ also decrypt correctly; the proof checks the congruence modulo $p$ and modulo $q$ separately using Fermat's little theorem, then combines them with the Chinese Remainder Theorem. So every lesson in this course plays a part: primes, gcd, extended Euclid, modular powers, inverses, Euler, Fermat and the CRT.

### Why it is believed secure
An attacker sees $n$, $e$ and $c$. To decrypt they would like $d$, which is easy to compute from $\varphi(n)$, which is easy to compute from $p$ and $q$. So the attacker needs to factor $n$. For $n = 55$ that is trivial, but real RSA uses primes of about 1024 bits each, so $n$ has about 617 decimal digits. The best known classical factoring algorithms would take far longer than the age of the universe on such numbers, although nobody has proved that no fast algorithm exists. A large quantum computer running Shor's algorithm could factor such numbers, which is why new "post-quantum" schemes are being deployed.

Meanwhile, everything the legitimate users must do is fast. Finding big primes is quick thanks to the prime number theorem and fast primality tests; Euclid's algorithm computes $d$ in a few thousand steps; and repeated squaring computes $m^e$ and $c^d$ with a few thousand multiplications. The gap between "easy for the owner" and "hard for everyone else" is exactly the gap between multiplying and factoring.

### Digital signatures
RSA also works in reverse. To sign a message $m$, the owner computes $s = m^d \bmod n$ using the private key. Anyone can verify by checking that $s^e \equiv m \pmod n$ with the public key. Only the holder of $d$ could have produced an $s$ that passes, so the signature proves who sent the message and that it was not altered. In practice one signs a hash of the message rather than the message itself.

### Speeding up with the CRT
The owner knows $p$ and $q$, so decryption can be split. Compute $c^d$ modulo $p$ and modulo $q$ separately, with the exponents reduced modulo $p - 1$ and $q - 1$ by Fermat, and recombine with the CRT. In our example, $c = 13 \equiv 3 \pmod 5$ and $d = 27 \equiv 3 \pmod 4$, so modulo 5 we get $3^3 = 27 \equiv 2$; and $13 \equiv 2 \pmod{11}$, $27 \equiv 7 \pmod{10}$, so modulo 11 we get $2^7 = 128 \equiv 7$. The unique number modulo 55 that is 2 mod 5 and 7 mod 11 is 7, the message. Real implementations gain about a factor of four this way.

@fig g09-crt m=5 n=11 a=2 b=7 | CRT decryption: the residues 2 mod 5 and 7 mod 11 identify the message 7 modulo 55.

### Common mistakes in using RSA
"Textbook" RSA as described here is not safe on its own. Because encryption is deterministic, the same message always gives the same ciphertext, so an attacker can test guesses; and small messages with small $e$ can be recovered by taking ordinary roots. Real systems add random padding (such as OAEP) before encrypting. Other classic mistakes are reusing a prime across keys (a gcd of two moduli then reveals it), choosing $p$ and $q$ too close together, and computing $d$ modulo $n$ instead of modulo $\varphi(n)$.

### Summary
RSA picks primes $p, q$, publishes $n = pq$ and an $e$ coprime to $\varphi(n) = (p-1)(q-1)$, and keeps $d = e^{-1} \bmod \varphi(n)$. Encryption is $c = m^e \bmod n$ and decryption $m = c^d \bmod n$, which works by Euler's theorem because $ed \equiv 1 \pmod{\varphi(n)}$. Signing swaps the roles of $e$ and $d$. Security rests on the difficulty of factoring $n$, and practical RSA needs random padding and the CRT speed-up.

@viz euclid a=40 b=3 | Computing the private key starts with checking gcd(e, φ(n)) = 1; extended Euclid on these lines gives d.

:::explore
**What to try**
1. With $a = 40 = \varphi(55)$ and $b = 3 = e$, confirm the gcd is 1, so $e$ is a valid public exponent.
2. Read the first line, $40 = 13\cdot3 + 1$, and rewrite it as $1 = 40 - 13\cdot3$. That gives $d \equiv -13 \equiv 27$.
3. Change $b$ to 5. Now $\gcd(40, 5) = 5$, so $e = 5$ would not work: no private exponent exists.
4. Try $b = 7$ and find $d$ yourself (it is 23, because $7\cdot23 = 161 = 4\cdot40 + 1$).

**What to notice:** key generation is just the extended Euclidean algorithm from the earlier lesson, applied to $e$ and $\varphi(n)$.
:::

@viz g09-crt m=5 n=11 a=2 b=7 | Decrypting modulo 5 and 11 separately, then combining with the CRT.

:::explore
**What to try**
1. With $m = 5$, $n = 11$, set $a = 2$ and $b = 7$: the highlighted cell is 7, the decrypted message from the article.
2. Encrypt a different message yourself, say $m = 2$: $2^3 = 8$. Then $8 \bmod 5 = 3$ and $8 \bmod 11 = 8$; set $a = 3$, $b = 8$ to see 8 in the grid.

**What to notice:** every number below 55 has its own pair of residues, so knowing the answer modulo $p$ and modulo $q$ is the same as knowing it modulo $n$.
:::

:::formulas
$$n = pq,\quad \varphi(n) = (p-1)(q-1)$$
$$\gcd(e, \varphi(n)) = 1,\quad d \equiv e^{-1} \pmod{\varphi(n)}$$
$$c = m^e \bmod n,\qquad m = c^d \bmod n$$
$$s = m^d \bmod n,\quad \text{verify } s^e \equiv m$$
:::

:::thm Correctness of RSA
If $n = pq$ with distinct primes $p, q$ and $ed \equiv 1 \pmod{(p-1)(q-1)}$, then $(m^e)^d \equiv m \pmod n$ for every integer $m$.
:::

:::proof
Write $ed = 1 + k(p-1)(q-1)$. Modulo $p$: if $p \nmid m$, Fermat gives $m^{p-1}\equiv1$, so $m^{ed} = m\cdot(m^{p-1})^{k(q-1)} \equiv m$; if $p \mid m$, both sides are $0$. So $m^{ed} \equiv m \pmod p$, and likewise modulo $q$. Since $p$ and $q$ are distinct primes, both divide $m^{ed} - m$, hence $pq = n$ divides it.
:::

:::steps Build an RSA key with $p = 3$, $q = 11$, $e = 3$
1. $n = 33$, $\varphi(n) = 2\cdot10 = 20$, and $\gcd(3, 20) = 1$.
2. $d = 3^{-1} \bmod 20 = 7$, since $21 \equiv 1$.
3. Public key $(33, 3)$, private key $7$.
:::

:::steps Encrypt $m = 4$ with $(n, e) = (33, 3)$ and decrypt
1. $c = 4^3 = 64 \equiv 31 \pmod{33}$.
2. $31 \equiv -2$, so $c^7 \equiv (-2)^7 = -128 \equiv -128 + 132 = 4$.
3. The message 4 is recovered.
:::

:::steps The classic example: $p = 61$, $q = 53$, $e = 17$
1. $n = 3233$, $\varphi(n) = 60\cdot52 = 3120$.
2. Extended Euclid gives $d = 2753$; check $17\cdot2753 = 46801 = 15\cdot3120 + 1$.
3. Encrypting $m = 65$ gives $c = 65^{17} \bmod 3233 = 2790$, and $2790^{2753} \bmod 3233 = 65$.
:::

:::mock Exam question
Alice's public key is $(n, e) = (55, 7)$. Find her private exponent $d$, and decrypt the ciphertext $c = 2$.
:::solution
Factor $55 = 5\cdot11$, so $\varphi(n) = 40$. We need $7d \equiv 1 \pmod{40}$: $40 = 5\cdot7 + 5$, $7 = 5 + 2$, $5 = 2\cdot2 + 1$, so $1 = 5 - 2\cdot2 = 5 - 2(7 - 5) = 3\cdot5 - 2\cdot7 = 3(40 - 5\cdot7) - 2\cdot7 = 3\cdot40 - 17\cdot7$, and $d \equiv -17 \equiv 23$. Check $7\cdot23 = 161 = 4\cdot40 + 1$. Decrypt: $2^{23} \bmod 55$. Using the CRT: modulo 5, $23 \equiv 3 \pmod 4$ so $2^3 = 8 \equiv 3$; modulo 11, $23 \equiv 3 \pmod{10}$ so $2^3 = 8$. The number below 55 that is 3 mod 5 and 8 mod 11 is 8. So $m = 8$; check $8^7 \bmod 55$: $8^2 = 64 \equiv 9$, $8^4 \equiv 81 \equiv 26$, $8^7 = 8^4\cdot8^2\cdot8 \equiv 26\cdot9\cdot8 = 1872 = 34\cdot55 + 2$. Correct.
:::
:::

:::cs
TLS certificates, SSH keys, PGP email and code-signing all use RSA or its successors. Libraries implement it with big-integer arithmetic, square-and-multiply, CRT decryption, OAEP or PSS padding and constant-time code to avoid leaking $d$ through timing.
:::

:::ml
Privacy-preserving machine learning uses public-key encryption: homomorphic schemes (descendants of the same modular ideas, such as Paillier encryption) let a server add encrypted gradients or score an encrypted input without seeing the data. Model weights and datasets are distributed with RSA or elliptic-curve signatures so users can verify they have not been tampered with.
:::

:::real
When you visit your bank's website, your browser checks a certificate signed with a public-key algorithm such as RSA, and the two sides agree on a session key. Software updates on phones and laptops are verified with signatures before installation, so a forged update is rejected.
:::

:::quiz
? With $p = 5$, $q = 11$, what is $\varphi(n)$?
= 40
> $(5-1)(11-1) = 40$.

? With $\varphi(n) = 40$ and $e = 3$, what is $d$?
= 27
> $3\cdot27 = 81 \equiv 1 \pmod{40}$.

? Encrypt $m = 7$ with $(n, e) = (55, 3)$.
= 13
> $343 = 6\cdot55 + 13$.

? With $p = 3$, $q = 11$, $e = 3$, what is $d$?
= 7
> $\varphi = 20$ and $3\cdot7 = 21\equiv1$.

? Which public exponent is valid when $\varphi(n) = 40$?
- 5
- 10
+ 7
- 4
> Only 7 is coprime to 40.

? The security of RSA rests mainly on the difficulty of
+ factoring $n$
- multiplying large primes
- computing gcds
> Multiplying and gcds are fast; factoring large $n$ is believed hard.
:::

## Lesson: Hashing with modular arithmetic {#hashing}
@summary: Hash functions built from remainders, why table sizes are often prime, polynomial string hashing, the birthday paradox and universal hashing.

### Finding things fast
A library with a million books could find a title by checking every shelf, but that is slow. Instead, imagine a rule that turns each title directly into a shelf number, so that you walk straight to the right shelf. A **hash function** is such a rule: it turns a key (a number, a word, a file) into a small integer called its **hash**, which is used as the index of a **bucket** in a table. Python dictionaries, database indexes, caches, compilers' symbol tables and spell checkers all work this way, and they find items in roughly constant time no matter how many are stored.

The simplest and most widely used hash functions are built from modular arithmetic. This lesson explains how they work, why the choice of modulus matters, and what number theory says about the collisions that are bound to happen.

:::def Hash function
A function $h$ that maps keys from a large set to bucket indices $\{0, 1, \dots, m - 1\}$. A good hash function spreads typical keys evenly over the buckets.
:::

:::def Collision
Two different keys $k \ne k'$ with $h(k) = h(k')$. By the pigeonhole principle, collisions are unavoidable once there are more keys than buckets.
:::

### The division method
The most basic hash function for integer keys is the remainder:
$$h(k) = k \bmod m.$$
With $m = 10$ buckets, the key 1234 goes to bucket 4 and the key 987 to bucket 7. It is fast and it always gives a valid index. But the quality depends heavily on $m$. With $m = 10$, the hash is just the last decimal digit, so if all your keys happen to end in 0 (prices in cents rounded to tens, say), they all land in one bucket.

The problem is worse whenever the keys follow a pattern that shares a factor with $m$. Suppose the keys are $10, 16, 22, 28, \dots$, increasing in steps of 6, and $m = 12$. The remainders are $10, 4, 10, 4, \dots$: only 2 of the 12 buckets are ever used. In general, keys in an arithmetic progression with step $s$ reach only $m / \gcd(s, m)$ different buckets. With $m = 13$, a prime, $\gcd(6, 13) = 1$, and the same keys spread over all 13 buckets. This is the number-theoretic reason that many hash tables use a prime number of buckets: a prime shares no factor with any step size smaller than itself, so regular patterns in the keys do not collapse onto a few buckets.

### Hashing strings
To hash a word, first turn it into a number. Treat the characters as digits in some base $b$ and reduce modulo a prime $p$:
$$h(s_0s_1\dots s_{n-1}) = \left(s_0b^{n-1} + s_1b^{n-2} + \cdots + s_{n-1}\right) \bmod p.$$
Using character codes a = 97 and b = 98, base 31 and $p = 101$, the string "ab" hashes to $(97\cdot31 + 98) \bmod 101 = 3105 \bmod 101 = 75$. The computation is done with Horner's rule, multiplying by $b$ and adding the next character, reducing modulo $p$ at every step so the numbers never get large, which is legal because of the rules of modular arithmetic. Java's `String.hashCode` uses this formula with base 31, reducing modulo $2^{32}$ by integer overflow.

A lovely feature of this polynomial hash is that it can be **rolled**: the hash of the next window of a text can be computed from the previous one in constant time by subtracting the first character's contribution, multiplying by $b$ and adding the new character. The **Rabin-Karp** string search algorithm uses this to compare a pattern against every window of a long text quickly, checking the actual characters only when the hashes match.

### How soon do collisions appear? The birthday paradox
Suppose a hash function behaves like a random function into $m$ buckets. How many keys can we insert before two collide? Intuition says around $m/2$, but the truth is much smaller. With $m = 365$ (birthdays), only 23 people give a better than even chance that two share a birthday: the probability that all 23 differ is $\frac{365}{365}\cdot\frac{364}{365}\cdots\frac{343}{365} \approx 0.493$, so a shared birthday has probability about $0.507$. The reason is that collisions involve *pairs*, and $n$ keys form $\binom n2 \approx n^2/2$ pairs. Each pair collides with probability $1/m$, so the expected number of colliding pairs is $\binom n2/m$, which reaches about 1 when $n \approx \sqrt{2m}$. As a rule of thumb, collisions become likely after about $\sqrt m$ keys.

This has two consequences. For hash tables, collisions are a normal event and must be handled, by **chaining** (each bucket holds a list) or **open addressing** (probe other buckets). For security, a hash with $b$-bit outputs can be broken by a birthday attack in about $2^{b/2}$ tries, which is why cryptographic hashes use 256 bits.

### Load factor and expected cost
If $n$ keys are spread by a good hash over $m$ buckets, the **load factor** is $\alpha = n/m$, the average number of keys per bucket. With chaining, an unsuccessful search looks through about $\alpha$ keys on average, so keeping $\alpha$ bounded (say below 1 or 2) keeps operations constant time. When the table fills up, it is resized, typically to about double the size, and every key is rehashed.

### Universal hashing
Any single fixed hash function has bad inputs: an adversary who knows $h$ can choose keys that all collide, turning a fast table into a slow list. This has been used for real denial-of-service attacks on web servers. The fix is to choose the hash function at random when the program starts. A classic **universal family** takes a prime $p$ larger than every key and random $a \in \{1, \dots, p-1\}$, $b \in \{0, \dots, p - 1\}$:
$$h_{a,b}(k) = \big((ak + b) \bmod p\big) \bmod m.$$
For any two different keys, the probability over the random choice of $a, b$ that they collide is at most about $1/m$, so no fixed set of keys is bad on average. The proof uses the fact that $a$ is invertible modulo the prime $p$: the map $k \mapsto ak + b$ sends different keys to different values mod $p$.

### Common mistakes
Choosing $m$ as a power of 10 or 2 with the division method, which uses only the last few digits or bits of the key. Assuming a good hash means no collisions; collisions are guaranteed and must be handled. Forgetting that the birthday bound is about $\sqrt m$, not $m/2$. And using non-cryptographic hashes like these where security matters; passwords and signatures need cryptographic hash functions.

### Summary
A hash function maps keys to buckets; the division method $k \bmod m$ is the simplest. Keys stepping by $s$ reach only $m/\gcd(s,m)$ buckets, so prime table sizes avoid pattern collisions. Strings are hashed as polynomials modulo a prime, which can be rolled for Rabin-Karp search. Collisions become likely after about $\sqrt m$ keys (the birthday paradox), the load factor $n/m$ governs the cost, and universal hashing $((ak + b) \bmod p) \bmod m$ defeats adversarial inputs.

@viz g09-lcg mode=hash m=12 a=6 c=10 | Ten keys stepping by s are hashed by k mod m. Watch how many buckets they reach.

:::explore
**What to try**
1. With $m = 12$, stride $s = 6$ and 10 keys, read the result: only 2 buckets are used, because $\gcd(6, 12) = 6$ and $12/6 = 2$.
2. Change $m$ to 13. The same keys now spread over 10 different buckets.
3. Back at $m = 12$, try strides 1, 2, 3, 4, 5 and predict the number of reachable buckets as $12/\gcd(s, 12)$ before looking.
4. Increase the number of keys to 30 with $m = 13$ and $s = 1$, and check the largest bucket is $\lceil 30/13\rceil = 3$.

**What to notice:** patterns in the keys interact with the factors of $m$ exactly as the gcd predicts. A prime modulus has no factors for the pattern to line up with, which is why prime table sizes are popular with the division method.
:::

:::formulas
$$h(k) = k \bmod m$$
$$\text{keys } k_0 + is \text{ reach } \frac{m}{\gcd(s, m)} \text{ buckets}$$
$$h(s) = \Big(\sum_{i} s_ib^{n-1-i}\Big) \bmod p$$
$$E[\text{colliding pairs}] = \binom n2\frac1m,\quad \text{collisions likely once } n \approx \sqrt m$$
$$h_{a,b}(k) = \big((ak+b) \bmod p\big) \bmod m,\qquad \alpha = n/m$$
:::

:::thm Buckets reached by an arithmetic progression
The keys $k_0, k_0 + s, k_0 + 2s, \dots$ hashed by $k \bmod m$ occupy exactly $m / \gcd(s, m)$ distinct buckets.
:::

:::proof
Let $d = \gcd(s, m)$. Two keys $k_0 + is$ and $k_0 + js$ land in the same bucket exactly when $m \mid (i - j)s$, i.e. when $\frac md \mid (i - j)\frac sd$. Since $\frac md$ and $\frac sd$ are coprime, this happens exactly when $\frac md \mid i - j$. So the buckets repeat with period $m/d$, and the first $m/d$ keys land in different buckets.
:::

:::steps Hash the string "ab" with base 31 modulo 101 (a = 97, b = 98)
1. Horner: start with 97.
2. Multiply by 31 and add 98: $97\cdot31 + 98 = 3105$.
3. Reduce: $3105 - 30\cdot101 = 75$.
:::

:::steps With 20 keys and 100 buckets, how many colliding pairs do you expect?
1. Pairs: $\binom{20}2 = 190$.
2. Each collides with probability $1/100$.
3. Expected collisions $190/100 = 1.9$.
:::

:::steps Keys are multiples of 4. How many of the 64 buckets of $k \bmod 64$ are used? What if $m = 61$?
1. $\gcd(4, 64) = 4$, so $64/4 = 16$ buckets.
2. $\gcd(4, 61) = 1$, so all 61 buckets are reachable.
:::

:::mock Exam question
A hash table uses $h(k) = k \bmod m$. The keys are 1000 order numbers that are all multiples of 15. Compare $m = 100$ with $m = 101$, and estimate how many random keys a 1,000,000-bucket table can hold before a collision is more likely than not.
:::solution
With $m = 100$: $\gcd(15, 100) = 5$, so only $100/5 = 20$ buckets are ever used, about 50 keys each. With $m = 101$ (prime), $\gcd(15, 101) = 1$ and all 101 buckets are used, about 10 keys each. For the birthday estimate, collisions become likely around $n\approx\sqrt{2m\ln2}\approx1.18\sqrt m$; with $m = 10^6$ that is about 1,180 keys, far fewer than a million.
:::
:::

:::cs
Hash tables (Python `dict`, Java `HashMap`, C++ `unordered_map`), Bloom filters, consistent hashing for distributing data across servers, Rabin-Karp search, deduplication and content-addressed storage (Git object ids) are all built on hash functions. Many languages randomise their string hash per process to block hash-flooding attacks, the practical form of universal hashing.
:::

:::ml
The **hashing trick** maps words or categorical features straight to column indices with `hash(feature) % n_columns`, giving a fixed-size input without storing a vocabulary. Locality-sensitive hashing finds approximate nearest neighbours in embedding search, and MinHash estimates set similarity for deduplicating training data.
:::

:::real
Library call numbers, cloakroom tickets and the last digits of a phone number used to file paper records are everyday hash functions. With 23 people in a room the chance that two share a birthday is about 51 percent, which surprises almost everyone.
:::

:::quiz
? Which bucket does key 1234 go to with $h(k) = k \bmod 10$?
= 4
> The remainder is the last digit.

? Keys step by 6 and $m = 12$. How many buckets can they reach?
= 2
> $12/\gcd(6, 12) = 2$.

? What is the load factor with 300 keys in 100 buckets?
= 3
> $\alpha = n/m = 3$.

? With 20 keys and 100 buckets, what is the expected number of colliding pairs?
= 1.9|19/10
> $\binom{20}{2}/100 = 190/100$.

? Why are prime table sizes popular with the division method?
+ Patterns in keys rarely share a factor with a prime, so they spread over all buckets
- Primes make the remainder faster to compute
- Primes guarantee no collisions
> Keys stepping by $s$ reach $m/\gcd(s,m)$ buckets, which is all of them when $m$ is a prime not dividing $s$.

? Roughly how many people make a shared birthday more likely than not?
= 23
> $1 - \frac{365\cdot364\cdots343}{365^{23}} \approx 0.507$.
:::

## Lesson: Pseudo-random number generators {#pseudo-random}
@summary: Linear congruential generators, period and the Hull-Dobell theorem, multiplicative generators modulo primes, seeds and the weaknesses of simple generators.

### Randomness from a formula
Computers are deterministic machines: given the same input, they do the same thing. Yet games shuffle cards, simulations roll virtual dice, and machine learning initialises weights and shuffles data at random. Where does the randomness come from? Usually from a **pseudo-random number generator** (PRNG): a simple formula that produces a sequence of numbers that *looks* random, although it is completely determined by a starting value called the **seed**. Run it twice with the same seed and you get exactly the same sequence, which is a feature: it makes experiments reproducible.

The oldest and simplest family of PRNGs is built directly on modular arithmetic, and number theory tells us exactly when it works well.

:::def Pseudo-random number generator
A deterministic algorithm that, starting from a seed, produces a sequence of numbers designed to pass statistical tests for randomness.
:::

:::def Linear congruential generator
A PRNG defined by $x_{k+1} = (ax_k + c) \bmod m$ with multiplier $a$, increment $c$, modulus $m$ and seed $x_0$.
:::

### The linear congruential generator
A **linear congruential generator** (LCG) repeats one step: multiply by $a$, add $c$, reduce modulo $m$. Take $m = 16$, $a = 5$, $c = 3$ and seed $x_0 = 1$. Then $x_1 = 5 + 3 = 8$, $x_2 = 43 \bmod 16 = 11$, $x_3 = 58 \bmod 16 = 10$, and continuing,
$$1, 8, 11, 10, 5, 12, 15, 14, 9, 0, 3, 2, 13, 4, 7, 6, 1, \dots$$
All 16 residues appear once before the sequence returns to 1. To get a "random real number" in $[0, 1)$, divide by $m$: the value 8 becomes $8/16 = 0.5$.

### Every LCG eventually repeats
Each new value depends only on the previous one, and there are only $m$ possible values. By the pigeonhole principle, within $m + 1$ steps some value repeats, and from then on the sequence cycles forever. The length of the cycle is called the **period**. The period can never exceed $m$, so real generators use huge moduli such as $2^{64}$.

The choice of constants matters enormously. With $m = 16$, $a = 4$, $c = 1$ and seed 1 we get $1, 5, 5, 5, \dots$: since $4\cdot5 + 1 = 21 \equiv 5$, the generator is stuck at a fixed point with period 1. With $a = 3$, $c = 0$, $m = 10$ and seed 7 we get $7, 1, 3, 9, 7, \dots$, period 4. Good constants give the maximum possible period.

### The Hull-Dobell theorem
When does an LCG with $c \ne 0$ achieve the full period $m$ for every seed? The **Hull-Dobell theorem** (1962) gives exactly three conditions: $c$ is coprime to $m$; $a - 1$ is divisible by every prime factor of $m$; and $a - 1$ is divisible by 4 if $m$ is divisible by 4. Our good example satisfies them: $\gcd(3, 16) = 1$, the only prime factor of 16 is 2 and $a - 1 = 4$ is divisible by 2, and 4 divides $a - 1 = 4$. The bad example fails: $a - 1 = 3$ is not divisible by 2. Notice how this theorem uses the gcd and prime factorization from earlier lessons.

### Multiplicative generators modulo a prime
If $c = 0$, the generator $x_{k+1} = ax_k \bmod m$ never leaves 0 once it gets there, so 0 is excluded. Choosing $m$ prime makes every non-zero residue invertible, and the sequence is $x_k = a^kx_0 \bmod p$. Its period is the order of $a$ modulo $p$, which by Fermat's little theorem divides $p - 1$. The period is the maximum $p - 1$ exactly when $a$ is a **primitive root**. The famous "minimal standard" generator of Lewis, Goodman and Miller uses $p = 2^{31} - 1$ (a prime) and $a = 16807 = 7^5$, a primitive root, so its period is $2^{31} - 2$, a little over two billion.

### Weaknesses of simple generators
LCGs are fast and tiny, but their structure shows. When $m$ is a power of 2, the low bits are very poor: in our full-period example the last bit simply alternates $1, 0, 1, 0, \dots$, because modulo 2 the recurrence becomes $x_{k+1} \equiv x_k + 1$. Taking consecutive outputs as coordinates also exposes a pattern: points $(x_k, x_{k+1})$ fall on a small number of parallel lines, and in three dimensions on planes. The infamous RANDU generator ($a = 65539$, $m = 2^{31}$) puts all its triples on just 15 planes, which ruined many scientific simulations in the 1960s and 70s. Modern libraries therefore use generators such as the Mersenne Twister or PCG (a well-mixed LCG variant), and cryptographic generators for anything security related, because an LCG's future outputs can be predicted from a few past ones.

@fig g09-lcg mode=prng m=16 a=5 c=3 | Plotting each value against the next reveals the lattice structure of an LCG.

### Seeds and reproducibility in practice
In experiments, the seed is part of the recipe. If you report a result from a simulation or a trained model, recording the seed lets anyone rerun the exact same random choices and check your numbers. A good habit is to run the same experiment with several different seeds and report the spread of the results, because a conclusion that holds for only one lucky seed is not a conclusion at all. When many processes run in parallel, each needs its own seed or its own independent stream, otherwise they may silently produce identical "random" numbers and your averages will be far less reliable than they look.

### Common mistakes
Seeding every run with the same constant and then believing the results are independent; or seeding with the clock and losing reproducibility. Using the low bits of a power-of-two LCG, for example `rand() % 2`. Using an LCG for passwords, tokens or cryptographic keys. And assuming a long period means good randomness; RANDU had a long period and terrible structure.

### Summary
A PRNG produces a deterministic but random-looking sequence from a seed. The LCG $x_{k+1} = (ax_k + c) \bmod m$ must eventually cycle, with period at most $m$. Hull-Dobell gives the full-period conditions: $\gcd(c, m) = 1$, $a - 1$ divisible by every prime factor of $m$, and by 4 if $4 \mid m$. Multiplicative generators modulo a prime have period equal to the order of $a$, at most $p - 1$, achieved by primitive roots. Simple LCGs have weak low bits and lattice structure, so serious work uses better or cryptographic generators.

@viz g09-lcg mode=prng m=16 a=5 c=3 | Each dot is a pair (current value, next value). The readout shows the sequence, its period and the Hull-Dobell test.

:::explore
**What to try**
1. With $m = 16$, $a = 5$, $c = 3$, read the sequence and check it matches the article: period 16, and Hull-Dobell passes.
2. Change $a$ to 4. The test fails and the period collapses, exactly as predicted.
3. Set $c = 2$ (not coprime to 16) with $a = 5$ and compare the period.
4. Set $m = 64$, $a = 21$, $c = 1$. Look at the dots: they line up in a few parallel lines, the lattice weakness described in the article.

**What to notice:** the period never exceeds $m$, because of the pigeonhole principle, and the three Hull-Dobell conditions predict exactly which settings reach the full period. The dot pattern shows that consecutive outputs are far from independent.
:::

:::formulas
$$x_{k+1} = (ax_k + c) \bmod m,\qquad u_k = x_k/m \in [0,1)$$
$$\text{period} \le m$$
$$\text{full period} \iff \gcd(c,m) = 1,\ p\mid m \Rightarrow p\mid a-1,\ 4\mid m \Rightarrow 4\mid a-1$$
$$x_k = a^kx_0 \bmod p,\quad \text{period} = \operatorname{ord}_p(a) \mid p - 1$$
:::

:::thm Hull-Dobell theorem
The LCG $x_{k+1} = (ax_k + c) \bmod m$ with $c \ne 0$ has period $m$ for every seed if and only if (1) $\gcd(c, m) = 1$, (2) every prime dividing $m$ divides $a - 1$, and (3) if $4 \mid m$ then $4 \mid a - 1$.
:::

:::proof
We prove the easier direction for condition (1): if $d = \gcd(c, m) > 1$, start from a seed that is a multiple of $d$. Then $ax_k + c$ stays a multiple of $d$, and so does its remainder mod $m$, because $d \mid m$. So only the $m/d < m$ multiples of $d$ can ever appear, and the period is less than $m$. The full proof of sufficiency uses the factorization of $m$ and the CRT to analyse each prime power separately.
:::

:::steps Generate the first five values of $x_{k+1} = (5x_k + 3) \bmod 16$ from $x_0 = 1$
1. $x_1 = 8$, $x_2 = 43 \bmod 16 = 11$.
2. $x_3 = 58 \bmod 16 = 10$, $x_4 = 53 \bmod 16 = 5$.
:::

:::steps Does $a = 13$, $c = 7$, $m = 32$ give full period?
1. $\gcd(7, 32) = 1$: condition 1 holds.
2. The only prime factor of 32 is 2, and $a - 1 = 12$ is even: condition 2 holds.
3. $4 \mid 32$ and $4 \mid 12$: condition 3 holds. Full period 32.
:::

:::steps Find the period of $x_{k+1} = 3x_k \bmod 7$
1. Powers of 3 mod 7: $3, 2, 6, 4, 5, 1$.
2. The order of 3 is 6, so the period is $6 = p - 1$ and 3 is a primitive root mod 7.
:::

:::mock Exam question
For $m = 100$, which of these LCGs have full period: (a) $a = 21$, $c = 3$; (b) $a = 11$, $c = 3$; (c) $a = 21$, $c = 5$? Explain why every LCG must eventually repeat.
:::solution
$100 = 2^2\cdot5^2$, so we need $c$ coprime to 100, $a - 1$ divisible by 2 and 5, and by 4. (a) $a - 1 = 20$ is divisible by 2, 5 and 4, and $\gcd(3, 100) = 1$: full period. (b) $a - 1 = 10$ is not divisible by 4: not full period. (c) $\gcd(5, 100) = 5$: not full period. Every LCG repeats because each value determines the next and only $m$ values exist; by the pigeonhole principle some value recurs within $m + 1$ steps, after which the sequence cycles.
:::
:::

:::ml
Weight initialisation, dropout masks, data shuffling and minibatch sampling all use PRNGs; fixing the seed makes training runs reproducible, and frameworks like NumPy and PyTorch let you set it. Monte Carlo methods, stochastic gradient descent and MCMC sampling depend on the quality of the generator; a generator with lattice structure can bias estimates.
:::

:::cs
Games, simulations and randomised algorithms (quicksort pivots, skip lists, hashing) use fast PRNGs such as PCG or xoshiro. Security-sensitive code must use a cryptographically secure generator (`secrets` in Python, `/dev/urandom`), because LCG outputs can be predicted after observing a handful of values.
:::

:::real
Old video games used tiny LCGs for enemy behaviour, and speedrunners exploit the predictability to manipulate "random" events. Lottery and casino machines are regulated precisely because their generators must be unpredictable.
:::

:::quiz
? For $x_{k+1} = (5x_k + 3) \bmod 16$ with $x_0 = 1$, what is $x_1$?
= 8
> $5 + 3 = 8$.

? What is the period of $x_{k+1} = (5x_k + 3) \bmod 16$?
= 16
> All three Hull-Dobell conditions hold.

? What is the period of $x_{k+1} = 3x_k \bmod 10$ starting from 7?
= 4
> $7, 1, 3, 9, 7$.

? What is the largest possible period of an LCG with modulus 64?
= 64
> There are only 64 possible values.

? Does $a = 4$, $c = 1$, $m = 16$ give full period?
- yes
+ no
> $a - 1 = 3$ is odd, failing condition 2; from seed 1 it sticks at 5.

? Should an LCG be used to generate password reset tokens?
- yes, if the period is long
+ no, its outputs are predictable
> LCGs are not cryptographically secure.
:::
