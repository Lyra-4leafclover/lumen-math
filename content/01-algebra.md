---
id: algebra
title: Algebra Foundations
tagline: Numbers, exponents, logarithms, equations and the notation every other course is written in.
desc: The toolkit underneath everything else. You'll rebuild arithmetic from the ground up, master exponents and logarithms, solve equations and inequalities, factor polynomials, and learn to read Σ notation fluently.
color: #f97316
symbol: x²
area: Foundations
paths: ml, cs
order: 1
---

# Unit: Numbers and arithmetic

## Lesson: The number systems {#number-systems}
@summary: Natural numbers, integers, rationals, reals and complex numbers, and why each one was invented.

### Why there is more than one kind of number
When you were small, "number" meant 1, 2, 3. Later you met negatives, then fractions, then strange things like $\sqrt2$ and $\pi$. It can feel like mathematicians keep adding new numbers for no reason. In fact every new kind of number was invented to fix one specific problem: a question that had no answer using the numbers people already had.

Seeing that story is the easiest way to remember the whole family. Each system contains the one before it, like nested boxes. Each new box makes one more operation always work. By the end of this article you will be able to take any number you meet, in a textbook, a spreadsheet or a line of code, and say exactly which box it lives in and why that matters.

### Counting: the natural numbers
Imagine you are a shepherd thousands of years ago. You need to know whether all your sheep came home, so you count them. The first numbers anyone needs are exactly these counting numbers, the **natural numbers**:
$$\mathbb{N} = \{0, 1, 2, 3, 4, \dots\}$$
Some books start at 1. Computer scientists usually include 0, because arrays start at index 0 and "zero items" is a perfectly good count.

Add two natural numbers and you always get another natural number: $3 + 5 = 8$. The same is true for multiplication: $4 \times 6 = 24$. Mathematicians say $\mathbb{N}$ is **closed** under addition and multiplication. "Closed" just means you can never fall out of the set by doing that operation.

Now try subtraction: $5 - 3 = 2$ is fine, but $3 - 5$ has no answer among the natural numbers. If you owe someone 5 coins and have 3, you can't describe what you have with a counting number. That's the first problem.

:::def Closed (under an operation)
A set is closed under an operation if applying the operation to any members of the set always gives a result that is still in the set.
:::

### Fixing subtraction: the integers
The fix is to add the negatives. The **integers** are
$$\mathbb{Z} = \{\dots, -3, -2, -1, 0, 1, 2, 3, \dots\}$$
The letter $\mathbb{Z}$ comes from the German word *Zahlen*, meaning "numbers". Now $3 - 5 = -2$, and subtraction always works. Think of a thermometer, a bank balance, or floors in a building with a basement: the number line runs in both directions from zero.

The integers are closed under addition, subtraction and multiplication. But division still breaks. $6 \div 3 = 2$ works, but $1 \div 3$ is not an integer. If three friends split one pizza, no integer describes each share.

:::def Integer
A whole number that may be positive, negative or zero: $\dots, -2, -1, 0, 1, 2, \dots$ The set of integers is written $\mathbb{Z}$.
:::

### Fixing division: the rational numbers
The **rational numbers** $\mathbb{Q}$ are all fractions
$$\frac{p}{q}\quad\text{where } p, q \text{ are integers and } q \ne 0$$
"Rational" comes from **ratio**, and $\mathbb{Q}$ comes from *quotient*. Every integer is rational too, since $5 = \frac51$ and $-2 = \frac{-2}{1}$. Now you can divide by anything except zero, and the answer is still rational. Why not zero? Because $6 \div 0$ would have to be a number that, multiplied by 0, gives 6, and no number does that.

One rational number has many names: $\frac12 = \frac24 = \frac{50}{100}$. They are all the same point on the number line, just written with different-sized pieces.

Written as decimals, rationals behave in one of two ways. Some **stop**: $\frac14 = 0.25$ and $\frac38 = 0.375$. Others **repeat forever** in a fixed pattern: $\frac13 = 0.333\ldots$ and $\frac{1}{7} = 0.142857142857\ldots$ We write the repeating block with a bar, so $\frac17 = 0.\overline{142857}$.

The reverse is also true. Any decimal that stops or repeats is a fraction. For example, if $x = 0.\overline{12}$ then $100x = 12.\overline{12}$, and subtracting gives $99x = 12$, so $x = \frac{12}{99} = \frac{4}{33}$. The trick works because multiplying by 100 shifts the decimal exactly one repeating block, so the endless tails line up and cancel.

:::def Rational number
A number that can be written as $\frac pq$ with $p$ and $q$ integers and $q \ne 0$. Its decimal either terminates or repeats.
:::

### Filling the gaps: the real numbers
For a long time people believed every length could be written as a fraction. Then the ancient Greeks found a problem. Draw a square with sides of length 1. By Pythagoras, its diagonal $d$ satisfies $d^2 = 1^2 + 1^2 = 2$, so $d = \sqrt2$. And $\sqrt2$ is **not** a fraction (the proof is in the Formulas & theorems section). A perfectly ordinary length, the diagonal of a tile, had no rational name.

Numbers like this are **irrational**: their decimals go on forever and never fall into a repeating pattern. $\sqrt2 = 1.41421356\ldots$, $\pi = 3.14159265\ldots$, $e = 2.71828182\ldots$ You can approximate them as closely as you like with fractions, for example $\frac{141}{100}$, $\frac{1414}{1000}$, $\frac{14142}{10000}$ creeping towards $\sqrt2$, but no fraction ever hits them exactly.

Put the rationals and irrationals together and you get the **real numbers** $\mathbb{R}$: every point on the number line, with no holes. When you picture a smooth, continuous line, you are picturing $\mathbb{R}$.

:::def Real numbers ($\mathbb{R}$)
Every point on the continuous number line: all rational numbers together with all irrational numbers like $\sqrt2$, $\pi$ and $e$.
:::

:::def Irrational number
A real number that cannot be written as a fraction of integers. Its decimal expansion never ends and never repeats.
:::

### Between any two numbers there is another
Here is a surprising fact about both $\mathbb{Q}$ and $\mathbb{R}$. Pick any two different numbers, say $0.3$ and $0.31$. Their average, $0.305$, lies strictly between them. Now take the average of $0.3$ and $0.305$, and so on. You can keep going forever, so between any two numbers there are infinitely many others. This property is called **density**. It is why there is no "next" real number after 1: whatever you suggest, there is something smaller that is still bigger than 1.

Density is also why we need irrationals at all. The rationals are dense, yet they still have holes, such as the exact spot where $\sqrt2$ sits. The reals are what you get when you fill every one of those holes.

@fig numberline a=-2 b=3 | Every point on this line is a real number, and between any two of them there are infinitely many more.

### Square roots of negatives: the complex numbers
One equation still has no answer: $x^2 = -1$. Any real number squared is zero or positive: $3^2 = 9$ and $(-3)^2 = 9$ as well. So mathematicians invented a new number $i$ with $i^2 = -1$. Numbers of the form $a + bi$, with $a$ and $b$ real, are the **complex numbers** $\mathbb{C}$. For example, $(2 + 3i) + (1 - i) = 3 + 2i$.

This sounds like pure fantasy, but complex numbers turned out to describe rotations and waves perfectly. Electrical engineers, physicists and signal-processing code use them every day. You'll study them properly in the Functions & Precalculus course.

### The big picture
$$\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R} \subset \mathbb{C}$$

| System | Fixes | Example that needs it |
|---|---|---|
| $\mathbb{N}$ natural | counting | $3$ |
| $\mathbb{Z}$ integers | subtraction | $3 - 5 = -2$ |
| $\mathbb{Q}$ rationals | division | $1 \div 3 = \frac13$ |
| $\mathbb{R}$ reals | gaps in the line | $\sqrt2$, $\pi$ |
| $\mathbb{C}$ complex | roots of negatives | $\sqrt{-1} = i$ |

:::tip How to classify any number
Ask in order: Is it a counting number? An integer? Can I write it as a fraction (or does its decimal stop or repeat)? If not, it's irrational. Always pick the **smallest** box that holds it.
:::

### Common mistakes
The most common mistake is to think $\frac{22}{7}$ equals $\pi$. It is only a rational approximation: $\frac{22}{7} = 3.142857\ldots$ while $\pi = 3.141592\ldots$, so they already disagree in the third decimal place.

A second mistake is to assume every square root is irrational. $\sqrt9 = 3$ and $\sqrt{\frac{4}{25}} = \frac25$ are rational. Only square roots of numbers that are not perfect squares, like $\sqrt5$ or $\sqrt{12}$, are irrational.

A third mistake is to trust a calculator screen. A long string of digits doesn't prove a number is irrational, because the calculator simply stops showing digits. $\frac{1}{17} = 0.0588235294117647\ldots$ looks random, yet it repeats with a block of 16 digits.

Finally, remember that being in a bigger box doesn't stop a number belonging to the smaller ones. $5$ is natural, an integer, rational, real and complex all at once. When asked for "the" system, give the smallest one.

### Summary
Each number system adds one ability: integers allow subtraction, rationals allow division, reals fill the gaps in the line, and complex numbers allow square roots of negatives. Rationals are exactly the stopping or repeating decimals; irrationals never stop and never repeat. In machine learning and computer science you'll mostly work in $\mathbb{R}$ (and $\mathbb{R}^n$, lists of real numbers). Computers can only approximate that set, which matters more than you'd expect.

@viz numberline a=-2 b=3 | Choose a and b and an operation. Watch where the answer lands on the line.

:::explore
**What to try**
1. Set $a = 3$, $b = 5$ and choose $a - b$. The answer lands left of zero: subtraction pushed you out of $\mathbb{N}$ and into $\mathbb{Z}$.
2. Try $a + b$ and $a \times b$ with two positive values. The answer always stays on the right side: $\mathbb{N}$ is closed under these.
3. Pick two negative numbers and multiply. The product is positive, still an integer: $\mathbb{Z}$ is closed under multiplication.
4. Notice the widget only lands on whole-number ticks. Mentally mark the point halfway between 1 and 2: that is $\frac32$, a rational the integers cannot reach.

**What to notice:** the operations that are "safe" in each system are exactly the closure facts from the article. The integer ticks leave gaps, which the rationals start to fill, and the reals fill completely. That completeness is what calculus (which zooms in forever) relies on.
:::

:::thm Rational ⇔ stopping or repeating decimal
A real number is rational exactly when its decimal expansion either terminates or eventually repeats.
:::

:::proof Why $\sqrt 2$ is irrational
Suppose $\sqrt2 = \frac pq$ in lowest terms (no common factors). Squaring gives $p^2 = 2q^2$, so $p^2$ is even, which means $p$ is even: write $p = 2k$. Then $4k^2 = 2q^2$, so $q^2 = 2k^2$ and $q$ is even too. But then $p$ and $q$ share the factor 2, so the fraction wasn't in lowest terms. Contradiction. So no such fraction exists.
:::

:::thm Density of the rationals
Between any two different real numbers $a < b$ there is a rational number (for example a suitable decimal cut off early), and therefore infinitely many.
:::

:::formulas
$$\mathbb{N}\subset\mathbb{Z}\subset\mathbb{Q}\subset\mathbb{R}\subset\mathbb{C}$$
$$\mathbb{Q} = \left\{\tfrac pq : p, q\in\mathbb{Z},\ q\ne0\right\}$$
$$0.\overline{d_1d_2\cdots d_k} = \frac{d_1d_2\cdots d_k}{\underbrace{99\cdots9}_{k\text{ nines}}}$$
$$a < \tfrac{a+b}{2} < b \quad (a < b)$$
:::

:::steps Write $0.\overline{36}$ as a fraction
1. Let $x = 0.363636\ldots$
2. The repeating block has 2 digits, so multiply by $10^2$: $100x = 36.3636\ldots$
3. Subtract to cancel the repeating tail: $100x - x = 36$, so $99x = 36$.
4. Solve and simplify: $x = \frac{36}{99} = \frac{4}{11}$.
:::

:::steps Write $0.1\overline{6}$ as a fraction
1. Let $x = 0.1666\ldots$ Only the 6 repeats, after one non-repeating digit.
2. $10x = 1.666\ldots$ and $100x = 16.666\ldots$ have the same tail.
3. Subtract: $100x - 10x = 16 - 1 = 15$, so $90x = 15$.
4. $x = \frac{15}{90} = \frac16$.
:::

:::steps Classify $-7$, $\frac{10}{2}$, $0.1\overline{6}$, $\sqrt{12}$, $\pi^2$
1. $-7$: an integer, not natural. Smallest system $\mathbb{Z}$.
2. $\frac{10}{2} = 5$: natural. Smallest system $\mathbb{N}$.
3. $0.1\overline6 = \frac16$: repeating, so rational. $\mathbb{Q}$.
4. $\sqrt{12} = 2\sqrt3$: 12 is not a perfect square, so irrational. $\mathbb{R}$.
5. $\pi^2 \approx 9.8696$: irrational (it's known that $\pi^2$ isn't a fraction). $\mathbb{R}$.
:::

:::mock Exam question
Show that $0.\overline{9} = 1$, and find a rational number strictly between $\frac13$ and $\frac{9}{25}$.
:::solution
Let $x = 0.999\ldots$ Then $10x = 9.999\ldots$ Subtracting, $9x = 9$, so $x = 1$. They are two decimal names for the same real number.

For the second part, $\frac13 \approx 0.3333$ and $\frac{9}{25} = 0.36$. Their average is $\frac12\left(\frac13 + \frac9{25}\right) = \frac12\cdot\frac{25 + 27}{75} = \frac{26}{75} \approx 0.3467$, which lies strictly between them. (Any answer such as $0.35 = \frac{7}{20}$ also works.)
:::
:::

:::real
- **Money:** bank balances use integers (negative when overdrawn), and prices use rationals like $\$4.99$.
- **Measurement:** a circle's circumference is $\pi d$, so a wheel of diameter 1 m rolls an irrational distance per turn.
- **Music:** equal-tempered semitones go up by a factor of $\sqrt[12]{2}$, an irrational number. That's why perfect fifths on a piano are very slightly "off".
:::

:::cs
Computers can't store most real numbers exactly. An `int` is a finite slice of $\mathbb{Z}$ (for example $-2^{31}$ to $2^{31}-1$), and a `float` is a finite set of rationals that approximates $\mathbb{R}$. Bugs like `0.1 + 0.2 != 0.3` come from this gap, because $0.1$ repeats forever in binary. Python's `fractions.Fraction` stores exact rationals when you need them. See the Numerical Methods course.
:::

:::ml
Data, weights and predictions in ML are real numbers, and inputs are vectors in $\mathbb{R}^n$. Labels are often natural numbers (class 0, 1, 2…). Complex numbers appear in Fourier features, audio models and the rotary position embeddings used in many language models.
:::

:::quiz
? Which is the smallest number system that contains $-\frac{3}{4}$?
- $\mathbb{N}$
- $\mathbb{Z}$
+ $\mathbb{Q}$
- $\mathbb{R}$
> It's a ratio of integers, so it's rational. It isn't an integer, so $\mathbb{Z}$ is too small.

? Is $0.121212\ldots$ (repeating forever) rational?
+ Yes
- No
> Any repeating decimal is rational: $x = 0.\overline{12}$ gives $99x = 12$, so $x = \frac{4}{33}$.

? Which of these is irrational?
- $\sqrt{9}$
- $0.75$
+ $\sqrt{5}$
- $\frac{22}{7}$
> 5 isn't a perfect square, so $\sqrt5$ is irrational. $\frac{22}{7}$ is just a fraction close to $\pi$.

? Which operation is the set of natural numbers NOT closed under?
- addition
- multiplication
+ subtraction
> $3 - 5 = -2$ is not a natural number.

? Write $0.\overline{3}$ as a fraction.
= 1/3
> $10x - x = 3$, so $x = \frac39 = \frac13$.

? What is the average of $\frac14$ and $\frac12$ (a rational between them)?
= 3/8|0.375
> $\frac12\left(\frac14 + \frac12\right) = \frac12\cdot\frac34 = \frac38$.
:::

## Lesson: Order of operations and the laws of arithmetic {#arithmetic-laws}
@summary: PEMDAS, the commutative, associative and distributive laws, identities and inverses, and why they let you rearrange anything.

### Why we need rules for the order
Look at $2 + 3 \times 4$. If you go left to right you get $5 \times 4 = 20$. If you multiply first you get $2 + 12 = 14$. Both feel reasonable, but a calculation must mean one thing, or nobody could share formulas. Imagine a recipe that said "2 plus 3 times 4 grams of salt" and two cooks produced different dishes. So mathematicians agreed on a fixed order. It isn't a law of nature; it's a convention, like driving on one side of the road. Everyone following the same convention is what matters.

This lesson has two halves. The first half is about what an expression **means**: the order in which you carry out the operations. The second half is about the **laws** that let you rewrite an expression into a different but equal form. Those laws are the engine of all algebra. Every time you "simplify", "expand" or "factor" later in this course, you are using one of them.

### The order: PEMDAS (or BODMAS)
Work through an expression in these levels, from top to bottom:

1. **P**arentheses and other grouping: brackets, fraction bars, the inside of a root.
2. **E**xponents (powers and roots).
3. **M**ultiplication and **D**ivision, with equal rank, left to right.
4. **A**ddition and **S**ubtraction, with equal rank, left to right.

In the UK and India it's often called **BODMAS** (Brackets, Orders, Division/Multiplication, Addition/Subtraction). Same rules, different letters.

So $2 + 3\times4 = 2 + 12 = 14$. If you really wanted $20$, you'd write $(2 + 3)\times4$. Parentheses are how you override the default order. When there are parentheses inside parentheses, start with the innermost pair: $2\times[3 + (4 - 1)^2] = 2\times[3 + 9] = 2\times12 = 24$.

Why this particular order? It ranks operations by how "strong" they are. Multiplication is repeated addition, and an exponent is repeated multiplication, so stronger operations bind more tightly. In $3 + 2^4$, the $2^4$ is a single compact quantity, $16$, before the weaker addition touches it.

### The most common mistake
The letters suggest multiplication comes before division, but it doesn't. They are on the **same level**, and you go **left to right**:
$$8 \div 2 \times 4 = 4 \times 4 = 16 \quad(\text{not } 8 \div 8 = 1)$$
Addition and subtraction work the same way: $10 - 3 + 2 = 7 + 2 = 9$, not $10 - 5 = 5$. A good way to remember this is that division is really multiplication by a reciprocal, and subtraction is really addition of a negative. Once you write $8 \div 2 \times 4$ as $8 \times \frac12 \times 4$, the order no longer matters and the answer is clearly 16.

A fraction bar is a hidden pair of parentheses around the top and around the bottom: $\dfrac{6 + 2}{4 - 2}$ means $(6+2)\div(4-2) = 8 \div 2 = 4$. Typing `6+2/4-2` into a calculator gives $6 + 0.5 - 2 = 4.5$, a different answer, because the hidden parentheses are lost.

### Exponents and the minus sign
$-3^2$ means "the negative of $3^2$", which is $-9$. The exponent attaches only to the 3. If you want to square $-3$, write $(-3)^2 = 9$. Calculators and programming languages follow this rule too (in Python, `-3**2` is `-9`). The same care is needed with multiplication: $2\cdot3^2 = 2\cdot9 = 18$, whereas $(2\cdot3)^2 = 36$.

### The laws that let you rearrange
Once you know what an expression means, some laws let you rewrite it into an easier form without changing its value. They hold for every real number $a, b, c$.

**Commutative laws: order doesn't matter.** $a + b = b + a$ and $ab = ba$. Putting 3 apples then 5 in a bag gives the same as 5 then 3. Three rows of five chairs is the same number of chairs as five rows of three.

**Associative laws: grouping doesn't matter.** $(a + b) + c = a + (b + c)$ and $(ab)c = a(bc)$. To add $17 + 8 + 2$, group $8 + 2$ first: $17 + 10 = 27$. To multiply $4 \times 7 \times 25$, use both laws to pair $4\times25 = 100$ first, giving $700$.

**Identity elements.** Adding 0 changes nothing: $a + 0 = a$. Multiplying by 1 changes nothing: $a\cdot1 = a$. So 0 is the *additive identity* and 1 is the *multiplicative identity*. Multiplying by a clever form of 1, like $\frac{2}{2}$, is how you will later rewrite fractions.

**Inverses.** Every number has an opposite that brings you back to the identity: $a + (-a) = 0$, and for $a \ne 0$, $a\cdot\frac1a = 1$. Subtraction is really "add the opposite" and division is "multiply by the reciprocal". This is why only addition and multiplication need laws: the other two operations are built from them.

:::def Commutative law
An operation is commutative if the order of the inputs doesn't change the result: $a + b = b + a$ and $ab = ba$.
:::

:::def Associative law
An operation is associative if the grouping doesn't change the result: $(a + b) + c = a + (b + c)$ and $(ab)c = a(bc)$.
:::

### The distributive law: the most important one
$$a(b + c) = ab + ac$$
Multiplying a sum is the same as multiplying each part and adding. Picture a rectangle of height $a$ and width $b + c$. Its area is $a(b + c)$, and it splits into two smaller rectangles of areas $ab$ and $ac$. For example, $3 \times (4 + 2) = 3 \times 6 = 18$, and also $3\times4 + 3\times2 = 12 + 6 = 18$.

@fig g01-area-model mode=numbers a=3 b=4 c=2 | A 3 by (4 + 2) rectangle is a 3 by 4 rectangle plus a 3 by 2 rectangle.

Read left to right, the law **expands**: $3(x + 5) = 3x + 15$. Read right to left, it **factors**: $6x + 9 = 3(2x + 3)$. Almost every algebra skill you'll learn, from expanding brackets to factoring quadratics, is the distributive law in some form. It also works with subtraction, $a(b - c) = ab - ac$, and with the multiplier on the right, $(b + c)a = ba + ca$.

It makes mental math easy too: $7\times98 = 7\times(100 - 2) = 700 - 14 = 686$.

:::def Distributive law
Multiplication spreads over addition: $a(b + c) = ab + ac$. It links the two operations and is the basis of expanding and factoring.
:::

### What does NOT work
Subtraction isn't commutative: $5 - 3 = 2$ but $3 - 5 = -2$. It isn't associative either: $(8 - 4) - 2 = 2$ but $8 - (4 - 2) = 6$. Division fails both laws in the same way: $12 \div 6 = 2$ but $6 \div 12 = \frac12$. That is precisely why the left-to-right rule exists for them.

There is a fraction trap that catches many students. You can split a fraction over a sum on **top**, $\frac{a + b}{c} = \frac ac + \frac bc$, because dividing by $c$ is multiplying by $\frac1c$ and the distributive law applies. But you can never split over a sum on the bottom: $\frac{12}{2 + 4} = 2$, while $\frac{12}{2} + \frac{12}{4} = 9$.

Similarly, exponents don't distribute over addition: $(3 + 4)^2 = 49$, but $3^2 + 4^2 = 25$.

:::key
PEMDAS tells you what an expression **means**. The laws tell you how to **rewrite** it without changing that meaning. Algebra is just using these two ideas over and over.
:::

### Summary
Grouping first, then exponents, then multiplication and division left to right, then addition and subtraction left to right. Addition and multiplication can be reordered (commutative) and regrouped (associative) freely; subtraction and division can't. Zero and one are the identities, and every number has an additive inverse and (if non-zero) a reciprocal. The distributive law links multiplication and addition and drives expanding and factoring in all of algebra.

@viz g01-area-model mode=numbers a=4 b=5 c=3 | Change a, b and c. The two coloured blocks always add up to the whole rectangle.

:::explore
**What to try**
1. Set $a = 4$, $b = 5$, $c = 3$. Count the blue squares ($4\times5$) and the pink squares ($4\times3$), then the whole rectangle ($4\times8$).
2. Swap $b$ and $c$. The picture changes but the total doesn't: that is the commutative law for addition inside the bracket.
3. Use $a = 7$, $b = 8$, $c = 2$ to see the mental-math trick $7\times10 = 7\times8 + 7\times2$.
4. Switch to $(x + p)(x + q)$ for a preview: the same rectangle idea expands a product of two sums.

**What to notice:** the dashed line splits one multiplication into two smaller ones. Distributing is literally cutting a rectangle into pieces, which is why $a(b + c)$ and $ab + ac$ must always agree.
:::

:::formulas
$$a + b = b + a,\quad ab = ba$$
$$(a + b) + c = a + (b + c),\quad (ab)c = a(bc)$$
$$a(b + c) = ab + ac$$
$$a + 0 = a,\quad a\cdot 1 = a$$
$$a + (-a) = 0,\quad a\cdot\tfrac1a = 1\ (a\ne0)$$
$$a - b = a + (-b),\quad a \div b = a\cdot\tfrac1b$$
:::

:::thm Multiplying by zero
For every real number $a$, $a\cdot 0 = 0$.
:::

:::proof Why $a \cdot 0 = 0$
Since $0 + 0 = 0$, the distributive law gives $a\cdot0 = a(0 + 0) = a\cdot0 + a\cdot0$. Add the inverse $-(a\cdot0)$ to both sides: $0 = a\cdot0$. So even this "obvious" fact follows from the laws.
:::

:::steps Evaluate $3 + 2 \cdot (4 - 1)^2 \div 6$
1. Parentheses first: $4 - 1 = 3$, giving $3 + 2 \cdot 3^2 \div 6$.
2. Exponent: $3^2 = 9$, giving $3 + 2 \cdot 9 \div 6$.
3. Multiply and divide left to right: $2 \cdot 9 = 18$, then $18 \div 6 = 3$.
4. Add: $3 + 3 = 6$.
:::

:::steps Evaluate $\dfrac{12 - 2^3}{2} + 5(3 - 7)$
1. Inside the fraction's top: exponent first, $2^3 = 8$, so $12 - 8 = 4$.
2. The fraction: $4 \div 2 = 2$.
3. The other parentheses: $3 - 7 = -4$, so $5(-4) = -20$.
4. Add: $2 + (-20) = -18$.
:::

:::steps Expand and simplify $4(2x - 3) - 2(x + 5)$
1. Distribute the 4: $8x - 12$.
2. Distribute the $-2$ (watch the sign on both terms): $-2x - 10$.
3. Combine like terms: $8x - 2x = 6x$ and $-12 - 10 = -22$.
4. Result: $6x - 22$.
:::

:::mock Exam question
Without a calculator, compute $25 \times 36$ and $17\times 99$ using the laws of arithmetic. Name the law used at each step.
:::solution
$25\times36 = 25\times(4\times9) = (25\times4)\times9 = 100\times9 = 900$. Associativity lets us regroup so the easy product $25\times4$ comes first.

$17\times99 = 17\times(100 - 1) = 1700 - 17 = 1683$. This is the distributive law over subtraction.
:::
:::

:::real
- **Shopping:** 3 shirts at \$12 and 3 trousers at \$20 cost $3(12 + 20) = 3\times32 = \$96$, the same as $36 + 60$. That's the distributive law.
- **Spreadsheets:** `=A1+B1*2` multiplies first. Forgetting parentheses in spreadsheet formulas is one of the most common causes of wrong financial reports.
- **Splitting a bill:** whether you add everyone's items first and then add the tip percentage, or add the tip to each item, you pay the same: $1.1(a + b + c) = 1.1a + 1.1b + 1.1c$.
:::

:::cs
Programming languages have **operator precedence** tables that extend PEMDAS to operators like `%`, `<<`, `&&` and `==`. When in doubt, add parentheses: they cost nothing and make code clearer. Compilers use the commutative and associative laws to reorder calculations for speed, but they can't always do it for floating-point numbers, where $(a + b) + c$ can differ slightly from $a + (b + c)$.
:::

:::ml
Matrix multiplication is associative but **not** commutative: $AB \ne BA$ in general. Associativity lets libraries choose the cheapest order to multiply a chain of matrices, a real speed trick in deep learning. The distributive law $W(x + y) = Wx + Wy$ is exactly what makes a layer "linear".
:::

:::quiz
? Evaluate $20 - 4 \times 3 + 6 \div 2$.
= 11
> $4\times3 = 12$, $6\div2 = 3$, then $20 - 12 + 3 = 11$.

? Evaluate $-2^4$.
= -16
> The exponent applies only to 2: $-(2^4) = -16$.

? Which law justifies $3(x + 5) = 3x + 15$?
- Commutative
- Associative
+ Distributive
- Identity
> The 3 multiplies each term of the sum.

? Evaluate $8 \div 2 \times 4$.
= 16
> Same rank, so left to right: $4\times4$.

? Which is true for all numbers?
- $a - b = b - a$
+ $(ab)c = a(bc)$
- $\frac{c}{a + b} = \frac ca + \frac cb$
> Multiplication is associative. Subtraction isn't commutative, and fractions don't split over a sum in the denominator.

? Evaluate $\dfrac{6 + 2}{4 - 2}$.
= 4
> The fraction bar groups the top and bottom: $8 \div 2 = 4$.
:::

## Lesson: Negative numbers and absolute value {#negatives}
@summary: Signed numbers on the number line, the sign rules for all four operations, and absolute value as distance.

### Why we need numbers below zero
Imagine a winter morning when the thermometer reads 3 degrees and the forecast says it will drop 7 degrees by night. Where does it end up? Counting down from 3 you pass 2, 1, 0 and keep going: the answer is "4 below zero", written $-4$. Negative numbers exist so that every subtraction has an answer, and they show up everywhere: temperatures, bank overdrafts, elevations below sea level, losses in a business, and the floors of an underground car park.

In this article you'll learn to picture signed numbers on a line, to add and subtract them by thinking about moves, to multiply and divide them using two short sign rules, and to measure size with absolute value. These skills sound basic, but sign errors are the single most common reason for wrong answers all the way up to calculus, so it is worth getting them completely solid.

### Numbers as positions and moves
Picture a number line running left to right, with 0 in the middle. Positive numbers sit to the right, negatives to the left. Every number has two jobs. It can be a **position** ("I'm at $-3$") or a **move** ("go 3 steps left"). Adding a number means making that move: start at 2, add $-5$, and you walk 5 steps left to land on $-3$. So $2 + (-5) = -3$.

Each number $a$ has an **opposite** $-a$, the same distance from zero on the other side. The opposite of 4 is $-4$, and the opposite of $-4$ is $4$. That is why $-(-4) = 4$: "the opposite of the opposite" brings you back. A number and its opposite always add to zero: $4 + (-4) = 0$.

:::def Opposite (additive inverse)
The opposite of $a$ is $-a$, the number the same distance from zero on the other side. $a + (-a) = 0$.
:::

Order on the number line is simple: the number further right is bigger. So $-2 > -5$, even though 5 is bigger than 2. Think of temperatures: $-2^\circ$ is warmer than $-5^\circ$.

### Adding signed numbers
With moves, every addition becomes a walk. Two rules summarise all the cases.

If the signs are the **same**, add the sizes and keep the sign: $(-3) + (-4) = -7$, because two leftward moves make one longer leftward move.

If the signs are **different**, subtract the smaller size from the larger and take the sign of the larger: $(-8) + 5 = -3$, because the 8-step left move beats the 5-step right move by 3. And $9 + (-4) = 5$.

### Subtracting means adding the opposite
Subtraction can feel confusing with negatives until you use one rule:
$$a - b = a + (-b)$$
Subtracting a number is the same as adding its opposite. So $3 - 7 = 3 + (-7) = -4$, matching the thermometer. And subtracting a negative turns into adding a positive: $5 - (-2) = 5 + 2 = 7$.

Why should subtracting a negative make things bigger? Think of a bank balance with a \$2 fee on it. If the bank removes the fee, that is subtracting $-2$, and your balance goes up by 2. Or think of $a - b$ as "how far is it from $b$ up to $a$?" From $-2$ up to 5 is 7 steps, so $5 - (-2) = 7$.

### Multiplying and dividing
Multiplication is repeated addition: $3 \times (-2) = (-2) + (-2) + (-2) = -6$. Three debts of \$2 each are a debt of \$6. Order doesn't matter, so $(-2) \times 3 = -6$ too.

But what is $(-3) \times (-2)$? Look at the pattern as the first number decreases by 1:
$$3\times(-2) = -6,\quad 2\times(-2) = -4,\quad 1\times(-2) = -2,\quad 0\times(-2) = 0$$
Each step adds 2 to the answer. Continuing the pattern, $(-1)\times(-2) = 2$, $(-2)\times(-2) = 4$ and $(-3)\times(-2) = 6$. A negative times a negative is positive. Another way to see it: multiplying by $-1$ flips a number to the other side of zero. Flip twice and you are back on the positive side.

The rules for multiplying and dividing are therefore:
- same signs give a **positive** result: $(-6)\div(-3) = 2$,
- different signs give a **negative** result: $(-6)\div 3 = -2$ and $6 \div (-3) = -2$.

For a longer product, just count the negative factors. An even number of them gives a positive answer, an odd number gives a negative one: $(-1)(-2)(-3) = -6$ has three negatives, so it's negative. This also explains powers: $(-2)^4 = 16$ but $(-2)^3 = -8$.

### Absolute value: distance from zero
Sometimes you only care about size, not direction. A drop of 7 degrees and a rise of 7 degrees are the same size of change. The **absolute value** $|x|$ is the distance from $x$ to zero, so it is never negative:
$$|5| = 5, \qquad |-5| = 5, \qquad |0| = 0$$
Formally, $|x| = x$ if $x \ge 0$, and $|x| = -x$ if $x < 0$. That second line looks odd, but if $x = -5$ then $-x = 5$, which is positive, as it should be.

:::def Absolute value
$|x|$ is the distance from $x$ to $0$ on the number line: $|x| = x$ when $x \ge 0$ and $|x| = -x$ when $x < 0$. It is always $\ge 0$.
:::

The most useful idea is that $|a - b|$ is the **distance between** $a$ and $b$. The distance from $-3$ to $4$ is $|4 - (-3)| = |7| = 7$, and it doesn't matter which order you subtract in: $|-3 - 4| = |-7| = 7$ as well.

@fig numberline a=4 b=-7 | Start at a, then move by b. Adding a negative moves you left.

### Common mistakes
First, mixing up $-3^2$ and $(-3)^2$. Without brackets the square applies only to 3, so $-3^2 = -9$; with brackets $(-3)^2 = 9$.

Second, "two negatives make a positive" is a rule for **multiplication and division only**. $(-3) + (-4)$ is $-7$, not 7.

Third, absolute value doesn't split over sums: $|-3 + 5| = 2$, but $|-3| + |5| = 8$. It does split over products: $|(-3)(5)| = 15 = |-3|\cdot|5|$.

Fourth, $-x$ is not automatically negative. If $x = -6$ then $-x = 6$. The minus sign means "opposite of", not "negative number".

### Summary
Negative numbers sit left of zero; adding a negative moves left, and subtracting means adding the opposite. Multiplying or dividing two numbers with the same sign gives a positive result, and different signs give a negative result; count the negatives in a long product. Absolute value measures distance from zero, and $|a - b|$ is the distance between two numbers.

@viz numberline a=3 b=-7 | Set a and b and pick an operation. The arrows show the moves; the green dot is the answer.

:::explore
**What to try**
1. Keep $a = 3$, $b = -7$ with $a + b$. The pink arrow goes left 7 and lands on $-4$, the thermometer example from the article.
2. Switch to $a - b$. The readout rewrites it as $3 + 7 = 10$: subtracting a negative is adding a positive.
3. Choose $a \times b$ with $a = 3$, $b = -2$, then change $b$ to $2$. Watch the jumps reverse direction when the sign of $b$ changes.
4. Set $a = -3$, $b = -2$ and multiply. The jumps of size $-3$ are flipped by the negative $b$ and land on $+6$.

**What to notice:** every rule in the article is a statement about direction. Adding a negative points left, subtracting flips the arrow, and multiplying by a negative mirrors the jumps across zero, which is why two flips give a positive.
:::

:::formulas
$$a - b = a + (-b),\qquad -(-a) = a$$
$$(-a)b = -(ab),\qquad (-a)(-b) = ab$$
$$|x| = \begin{cases} x & x \ge 0 \\ -x & x < 0\end{cases}$$
$$|ab| = |a|\,|b|,\qquad \text{distance}(a, b) = |a - b|$$
$$|a + b| \le |a| + |b|$$
:::

:::thm Triangle inequality
For all real numbers $a$ and $b$: $|a + b| \le |a| + |b|$. Equality holds exactly when $a$ and $b$ have the same sign (or one is zero).
:::

:::proof Why the triangle inequality holds
We always have $-|a| \le a \le |a|$ and $-|b| \le b \le |b|$. Adding these, $-(|a| + |b|) \le a + b \le |a| + |b|$. A number lying between $-M$ and $M$ has absolute value at most $M$, so $|a + b| \le |a| + |b|$.
:::

:::steps Evaluate $-3 - (-8) + (-2)(-5)$
1. Multiply first: $(-2)(-5) = 10$ (same signs, positive).
2. Rewrite the subtraction: $-3 - (-8) = -3 + 8 = 5$.
3. Add: $5 + 10 = 15$.
:::

:::steps Evaluate $\dfrac{(-6)(4)}{-3} - |2 - 9|$
1. Top of the fraction: $(-6)(4) = -24$.
2. Divide: $-24 \div (-3) = 8$ (same signs, positive).
3. Absolute value: $|2 - 9| = |-7| = 7$.
4. Subtract: $8 - 7 = 1$.
:::

:::steps A diver is at $-18$ m. She rises 7 m, then sinks 12 m. How far is she from a boat at $+2$ m?
1. Rising is adding: $-18 + 7 = -11$.
2. Sinking is subtracting: $-11 - 12 = -23$ m.
3. Distance to the boat: $|2 - (-23)| = |25| = 25$ m.
:::

:::mock Exam question
Evaluate $(-1)^{2025} + (-2)^3 - |{-4}| \cdot (-3)$.
:::solution
$(-1)^{2025} = -1$ because 2025 is odd. $(-2)^3 = -8$. $|-4| = 4$, and $4\cdot(-3) = -12$. So the expression is $-1 + (-8) - (-12) = -9 + 12 = 3$.
:::
:::

:::real
- **Weather:** a temperature change from $-5^\circ$C to $3^\circ$C is a rise of $3 - (-5) = 8$ degrees.
- **Finance:** a profit of $-\$200$ is a loss. Three months of $-\$200$ make $3\times(-200) = -\$600$.
- **Elevation:** the Dead Sea shore is about $-430$ m and Mount Everest about $8849$ m; the height difference is $|8849 - (-430)| = 9279$ m.
:::

:::cs
Computers store signed integers with **two's complement**, where the leftmost bit carries a negative weight. In 8 bits, `11111111` means $-1$. Beware of overflow: in 8-bit arithmetic, $127 + 1$ wraps around to $-128$. Absolute value also has a trap: $|-128|$ doesn't fit in 8 bits.
:::

:::ml
Errors in ML are signed: a prediction can be too high (positive residual) or too low (negative). Absolute value turns errors into sizes, giving the **mean absolute error** $\frac1n\sum|y_i - \hat y_i|$ and the L1 penalty $\sum|w_i|$ used in Lasso regression to push weights to exactly zero.
:::

:::quiz
? Evaluate $-7 - (-10)$.
= 3
> Subtracting $-10$ is adding 10: $-7 + 10 = 3$.

? Evaluate $(-4)(-3)(-2)$.
= -24
> Three negative factors (odd), so the result is negative: $-24$.

? What is $|-12| - |5 - 9|$?
= 8
> $12 - |-4| = 12 - 4 = 8$.

? Which is larger, $-3$ or $-8$?
+ $-3$
- $-8$
> $-3$ is further right on the number line.

? What is the distance between $-6$ and $9$ on the number line?
= 15
> $|9 - (-6)| = 15$.

? Is $|a + b| = |a| + |b|$ true for $a = -3$, $b = 5$?
- Yes
+ No
> $|2| = 2$ but $3 + 5 = 8$. Equality needs the same sign.
:::

## Lesson: Factors, primes, GCD and LCM {#factors-primes}
@summary: Divisibility, prime numbers, prime factorization, and the greatest common divisor and least common multiple.

### Why break numbers apart?
Imagine you are packing 24 cupcakes into boxes and want every box to hold the same number with none left over. You could use boxes of 1, 2, 3, 4, 6, 8, 12 or 24, but not boxes of 5 or 7. The numbers that work are the **factors** of 24. Questions like this, about splitting things evenly, are everywhere: arranging chairs in rows, scheduling events that repeat, simplifying fractions, and, in computer science, building the encryption that protects every online payment.

This lesson builds the toolkit for these questions. You'll learn what it means for one number to divide another, meet the prime numbers (the atoms that every whole number is built from), and learn two workhorse tools: the **greatest common divisor** (GCD), used to simplify fractions, and the **least common multiple** (LCM), used to add them.

### Factors, multiples and divisibility
We say $a$ **divides** $b$, written $a \mid b$, when $b$ is $a$ times some whole number. So $3 \mid 12$ because $12 = 3\times4$, but $5 \nmid 12$ because $12 \div 5 = 2.4$ is not whole. When $a \mid b$ we also say $a$ is a **factor** (or divisor) of $b$, and $b$ is a **multiple** of $a$.

Factors come in pairs. To list all the factors of 36, try divisors from 1 upwards and record each partner: $1\times36$, $2\times18$, $3\times12$, $4\times9$, $6\times6$. Once you reach $\sqrt{36} = 6$, the pairs start repeating in reverse, so you can stop. The factors are $1, 2, 3, 4, 6, 9, 12, 18, 36$. Multiples go the other way and never end: the multiples of 6 are $6, 12, 18, 24, \dots$

:::def Factor (divisor)
$a$ is a factor of $b$ (written $a \mid b$) if $b = a\cdot k$ for some integer $k$. Then $b$ is a multiple of $a$.
:::

A few quick divisibility tests save time. A number is divisible by 2 if its last digit is even, by 5 if it ends in 0 or 5, by 10 if it ends in 0, by 3 if its digit sum is divisible by 3, and by 9 if its digit sum is divisible by 9. For example, $471$ has digit sum $4 + 7 + 1 = 12$, so $3 \mid 471$ (indeed $471 = 3\times157$), but $9 \nmid 471$.

### Prime numbers: the atoms
A **prime** is a whole number greater than 1 whose only factors are 1 and itself. The first few are
$$2, 3, 5, 7, 11, 13, 17, 19, 23, 29, \dots$$
A whole number greater than 1 that is not prime is **composite**, like $12 = 2\times6$. The number 1 is neither prime nor composite. That is not an arbitrary decision: if 1 counted as prime, the factorization theorem below would stop being unique, because you could tack on as many 1s as you like.

Notice that 2 is the only even prime, since every other even number has 2 as a factor. To test whether a number $n$ is prime, you only need to try dividing by primes up to $\sqrt n$. To test 97, try 2, 3, 5 and 7 (because $11^2 = 121 > 97$). None divide it, so 97 is prime.

:::def Prime number
A whole number greater than 1 whose only positive factors are 1 and itself.
:::

### Prime factorization
Every whole number above 1 can be broken into a product of primes. Build a **factor tree**: split the number into any two factors, then keep splitting until every branch ends in a prime. For 360:
$$360 = 36\times10 = (4\times9)\times(2\times5) = 2^3\times3^2\times5$$
If you had started with $360 = 8\times45$ instead, you would still end with three 2s, two 3s and one 5. This is the **Fundamental Theorem of Arithmetic**: the prime factorization is unique, apart from the order of the factors. Primes are to whole numbers what atoms are to molecules.

The factorization tells you everything about the factors. A factor of $360 = 2^3\cdot3^2\cdot5$ must use at most three 2s, two 3s and one 5. That gives $4\times3\times2 = 24$ choices, so 360 has exactly 24 factors.

### The greatest common divisor (GCD)
The **greatest common divisor** of two numbers is the largest number that divides both. For 12 and 18, the common factors are 1, 2, 3 and 6, so $\gcd(12, 18) = 6$. Listing works for small numbers, but primes make it systematic: write both factorizations and take each prime to the **smaller** power that appears.
$$84 = 2^2\cdot3\cdot7,\quad 90 = 2\cdot3^2\cdot5 \;\Rightarrow\; \gcd(84, 90) = 2\cdot3 = 6$$
The GCD is what you divide by to put a fraction in lowest terms: $\frac{84}{90} = \frac{84\div6}{90\div6} = \frac{14}{15}$. Two numbers with $\gcd = 1$ are called **coprime**, such as 8 and 15.

For large numbers there is an even faster method, **Euclid's algorithm**, over 2000 years old. It uses the fact that $\gcd(a, b) = \gcd(b, r)$ where $r$ is the remainder of $a \div b$. For $\gcd(252, 105)$: $252 = 2\cdot105 + 42$, then $105 = 2\cdot42 + 21$, then $42 = 2\cdot21 + 0$. The last non-zero remainder is 21, so $\gcd(252, 105) = 21$.

:::def Greatest common divisor (GCD)
The largest positive integer that divides each of the given integers. Two numbers are coprime when their GCD is 1.
:::

@fig euclid a=84 b=36 | Euclid's algorithm as rectangles: cut the largest squares you can; the last square's side is the GCD.

### The least common multiple (LCM)
The **least common multiple** is the smallest positive number that is a multiple of both. Imagine one bus comes every 12 minutes and another every 18 minutes, and both just left together. They meet again after $\operatorname{lcm}(12, 18)$ minutes. Multiples of 12 are 12, 24, 36, … and of 18 are 18, 36, … so the answer is 36 minutes. With prime factorizations, take each prime to the **larger** power:
$$12 = 2^2\cdot3,\quad 18 = 2\cdot3^2 \;\Rightarrow\; \operatorname{lcm}(12, 18) = 2^2\cdot3^2 = 36$$
The LCM is the lowest common denominator when you add fractions, as you'll see in the next lesson.

:::def Least common multiple (LCM)
The smallest positive integer that is a multiple of each of the given integers.
:::

### How GCD and LCM fit together
Because the GCD takes the smaller power of each prime and the LCM takes the larger, together they use every prime factor exactly once from each number. That gives a beautiful shortcut:
$$\gcd(a, b)\cdot\operatorname{lcm}(a, b) = a\cdot b$$
Check: $6\times36 = 216 = 12\times18$. So once you know the GCD (fast, by Euclid), the LCM is just $\frac{ab}{\gcd(a,b)}$.

### Common mistakes
Students often think 1 is prime, or that every odd number is prime. But 9, 15, 21 and 91 ($= 7\times13$) are odd and composite. Another mistake is to mix up GCD and LCM: the GCD is never bigger than the smaller number, and the LCM is never smaller than the larger number. If your "GCD" of 8 and 12 came out as 24, you found the LCM. Finally, when listing factors, remember to stop at the square root and include both members of each pair.

### Summary
$a \mid b$ means $b$ is a whole-number multiple of $a$. Primes have exactly two factors, and every whole number above 1 factors into primes in exactly one way. The GCD takes the smaller power of each shared prime and simplifies fractions; the LCM takes the larger power and gives common denominators and repeating schedules. Their product equals the product of the two numbers.

@viz euclid a=84 b=36 | Change a and b. Each square cut is one step of Euclid's algorithm; the last square size is the GCD.

:::explore
**What to try**
1. Start with $a = 84$, $b = 36$. The readout shows $84 = 2\cdot36 + 12$ and $36 = 3\cdot12 + 0$, so $\gcd(84, 36) = 12$. Check it against the prime method: $84 = 2^2\cdot3\cdot7$ and $36 = 2^2\cdot3^2$ share $2^2\cdot3 = 12$.
2. Try two consecutive numbers such as 34 and 21. The GCD is 1: neighbours are always coprime.
3. Try a pair where one divides the other, like 96 and 24. The algorithm finishes in one step.
4. Try 105 and 42 (the middle of the 252, 105 example in the article). You get 21 again.

**What to notice:** every step keeps the same GCD while making the numbers smaller, which is why the method is so fast even for huge numbers. Then use $\operatorname{lcm} = \frac{ab}{\gcd}$ to get the LCM for free.
:::

@viz sieve | The sieve of Eratosthenes crosses out multiples of each prime. What survives is prime.

:::explore
**What to try**
1. Watch the multiples of 2 disappear, then of 3, then of 5 and 7.
2. Notice when the sieve can stop: after crossing out multiples of primes up to $\sqrt{100} = 10$.

**What to notice:** this is the "test up to $\sqrt n$" rule from the article, run for every number at once. Every crossed-out number had a smaller prime factor.
:::

:::formulas
$$a \mid b \iff b = ak \text{ for some integer } k$$
$$n = p_1^{e_1}p_2^{e_2}\cdots p_k^{e_k}\ \text{(unique)}$$
$$\#\text{factors}(n) = (e_1 + 1)(e_2 + 1)\cdots(e_k + 1)$$
$$\gcd(a, b) = \gcd(b,\ a \bmod b),\quad \gcd(a, 0) = a$$
$$\gcd(a, b)\cdot\operatorname{lcm}(a, b) = ab$$
:::

:::thm Fundamental Theorem of Arithmetic
Every integer $n > 1$ can be written as a product of primes, and this factorization is unique apart from the order of the factors.
:::

:::thm There are infinitely many primes
No list of primes is complete: for any finite list there is a prime not on it.
:::

:::proof Euclid's proof that the primes never end
Suppose $p_1, p_2, \dots, p_k$ were all the primes. Let $N = p_1p_2\cdots p_k + 1$. Dividing $N$ by any $p_i$ leaves remainder 1, so no $p_i$ divides $N$. But $N > 1$ has some prime factor, which must therefore be missing from the list. Contradiction.
:::

:::steps Find the prime factorization of 1260
1. $1260 = 10\times126 = (2\times5)\times126$.
2. $126 = 2\times63 = 2\times9\times7 = 2\times3^2\times7$.
3. Collect: $1260 = 2^2\times3^2\times5\times7$.
4. Number of factors: $(2 + 1)(2 + 1)(1 + 1)(1 + 1) = 36$.
:::

:::steps Find $\gcd(48, 180)$ and $\operatorname{lcm}(48, 180)$
1. $48 = 2^4\cdot3$ and $180 = 2^2\cdot3^2\cdot5$.
2. GCD: smaller powers, $2^2\cdot3 = 12$.
3. LCM: larger powers, $2^4\cdot3^2\cdot5 = 720$.
4. Check: $12\times720 = 8640 = 48\times180$.
:::

:::steps Simplify $\dfrac{252}{105}$ using Euclid's algorithm
1. $252 = 2\cdot105 + 42$; $105 = 2\cdot42 + 21$; $42 = 2\cdot21 + 0$. So $\gcd = 21$.
2. Divide top and bottom by 21: $\frac{252}{105} = \frac{12}{5}$.
:::

:::mock Exam question
Two lighthouses flash every 15 seconds and every 40 seconds. They flash together at midnight. How many times in the first 10 minutes after midnight (not counting midnight) do they flash together?
:::solution
They coincide every $\operatorname{lcm}(15, 40)$ seconds. $15 = 3\cdot5$ and $40 = 2^3\cdot5$, so the LCM is $2^3\cdot3\cdot5 = 120$ seconds, or 2 minutes. In 10 minutes that happens $10 \div 2 = 5$ times.
:::
:::

:::real
- **Gears:** a bicycle gear with 48 teeth meshing with one of 18 teeth returns to the same tooth pair after $\operatorname{lcm}(48, 18) = 144$ teeth have passed. Engineers choose coprime tooth counts so wear spreads evenly.
- **Packaging and tiling:** the largest square tile that exactly covers a 240 cm by 180 cm floor has side $\gcd(240, 180) = 60$ cm.
- **Calendars:** events every 4 days and every 6 days line up every 12 days.
:::

:::cs
**RSA encryption**, used in HTTPS, relies on the fact that multiplying two large primes is easy but factoring the product back apart is extremely hard. Euclid's algorithm (and its extended version) computes modular inverses for RSA keys. Hash tables often use a prime number of buckets so that keys spread evenly.
:::

:::ml
Prime and coprime choices appear in practical ML code: hashing tricks for feature vectors use prime moduli to reduce collisions, and data loaders sometimes use coprime strides to visit every example. More broadly, the habit of factoring a big object into simple unique parts returns later as matrix factorizations (LU, QR, SVD).
:::

:::quiz
? Which of these is prime?
- 51
- 91
+ 97
- 1
> $51 = 3\times17$, $91 = 7\times13$, and 1 is not prime. 97 has no prime factor up to $\sqrt{97} < 10$.

? What is $\gcd(36, 60)$?
= 12
> $36 = 2^2\cdot3^2$, $60 = 2^2\cdot3\cdot5$; smaller powers give $2^2\cdot3 = 12$.

? What is $\operatorname{lcm}(8, 12)$?
= 24
> $2^3\cdot3 = 24$.

? If $\gcd(a, b) = 4$ and $ab = 192$, what is $\operatorname{lcm}(a, b)$?
= 48
> $\operatorname{lcm} = \frac{ab}{\gcd} = \frac{192}{4} = 48$.

? How many positive factors does $2^3\cdot 3^2$ (= 72) have?
= 12
> $(3 + 1)(2 + 1) = 12$.

? Is 471 divisible by 3?
+ Yes
- No
> Its digit sum $4 + 7 + 1 = 12$ is divisible by 3.
:::

## Lesson: Fractions, decimals, percents and ratios {#fractions}
@summary: What a fraction means, the four operations with fractions, converting between fractions, decimals and percents, and ratios and proportions.

### Why fractions matter
Imagine three friends ordering two pizzas. How much does each person get? Not a whole pizza, and not one slice of an unknown size: each gets exactly $\frac23$ of a pizza. Fractions are how we describe amounts that fall between whole numbers, and they hide inside almost every number you meet: prices, probabilities, recipe quantities, test scores, interest rates and the 80/20 split of a dataset into training and test data.

This article starts from what a fraction actually is, then builds up the four operations one at a time, shows how fractions, decimals and percents are three spellings of the same numbers, and finishes with ratios and proportions. If you have ever memorised "flip and multiply" without knowing why, this is the lesson that explains it.

### What a fraction means
The fraction $\frac ab$ has a **numerator** $a$ on top and a **denominator** $b$ on the bottom. The denominator says how many equal pieces the whole is cut into, and the numerator says how many of those pieces you have. So $\frac34$ of a chocolate bar means: cut the bar into 4 equal pieces and take 3.

A fraction is also a **division**: $\frac34 = 3 \div 4 = 0.75$. Both views are useful. "Pieces of a whole" helps you picture sizes, and "division" helps you calculate. When the numerator is bigger than the denominator, as in $\frac74$, you have more than one whole: $\frac74 = 1\frac34$, a **mixed number**. Fractions like $\frac74$ are called **improper**, but there is nothing wrong with them, and in algebra they are usually more convenient than mixed numbers.

:::def Fraction
$\frac ab$ (with $b \ne 0$) means $a$ parts of a whole cut into $b$ equal parts, which is the same as $a \div b$. $a$ is the numerator and $b$ the denominator.
:::

### Equivalent fractions and simplifying
Cut a pizza into 2 halves and take one, or cut it into 4 quarters and take two. You get the same amount of pizza, so $\frac12 = \frac24$. In general, multiplying the top and bottom by the same non-zero number doesn't change the value, because you are multiplying by $\frac kk = 1$:
$$\frac ab = \frac{a\cdot k}{b\cdot k}$$
Running this backwards **simplifies** a fraction. Divide top and bottom by their greatest common divisor: $\frac{18}{24} = \frac{18\div6}{24\div6} = \frac34$. A fraction is in **lowest terms** when the top and bottom share no common factor except 1.

To compare two fractions, rewrite them with the same denominator or convert to decimals. Is $\frac58$ bigger than $\frac35$? With denominator 40, $\frac58 = \frac{25}{40}$ and $\frac35 = \frac{24}{40}$, so $\frac58$ is slightly bigger.

### Multiplying fractions
Multiplication is the easy one: multiply straight across.
$$\frac ab\cdot\frac cd = \frac{ac}{bd}$$
Why? "Of" means multiply. Half of a third of a cake is $\frac12\cdot\frac13 = \frac16$: cut the cake into thirds, then cut one third in half, and that piece is one sixth of the cake. You can cancel common factors before multiplying to keep numbers small: $\frac{4}{9}\cdot\frac{3}{8} = \frac{4\cdot3}{9\cdot8}$, and cancelling 4 with 8 and 3 with 9 gives $\frac{1}{3\cdot2} = \frac16$.

Notice that multiplying by a fraction less than 1 makes things **smaller**: $\frac12\cdot 10 = 5$. This surprises people who learned that "multiplying makes bigger", which is only true for numbers above 1.

### Dividing fractions
To divide by a fraction, multiply by its **reciprocal** (flip it upside down):
$$\frac ab\div\frac cd = \frac ab\cdot\frac dc$$
Here is why. Dividing asks "how many of these fit into that?". How many halves fit into 3? Six, because each whole holds two halves. And $3 \div \frac12 = 3\cdot\frac21 = 6$. Dividing by $\frac12$ is the same as doubling. More generally, the reciprocal $\frac dc$ is the number that undoes multiplication by $\frac cd$, so dividing by $\frac cd$ and multiplying by $\frac dc$ do the same job. For example, $\frac34 \div \frac38 = \frac34\cdot\frac83 = \frac{24}{12} = 2$: two eighths-of-three fit into three quarters.

:::def Reciprocal
The reciprocal of a non-zero number $x$ is $\frac1x$; the reciprocal of $\frac cd$ is $\frac dc$. A number times its reciprocal is 1.
:::

### Adding and subtracting: you need a common denominator
You can only add pieces of the **same size**. Adding $\frac13 + \frac14$ is like adding 1 apple and 1 orange: you can't just say "2 of something". First re-cut both into pieces of a common size. The smallest size that works comes from the least common multiple of the denominators, here 12:
$$\frac13 + \frac14 = \frac{4}{12} + \frac{3}{12} = \frac{7}{12}$$
The general formula uses the product of the denominators, which always works but may need simplifying afterwards:
$$\frac ab + \frac cd = \frac{ad + bc}{bd}$$
Subtraction works the same way: $\frac56 - \frac14 = \frac{10}{12} - \frac{3}{12} = \frac{7}{12}$.

@fig fraction a=1 b=3 c=1 d=4 | One third and one quarter are different-sized pieces. Re-cutting both into twelfths lets you add them.

:::warn The most common fraction mistakes
- $\frac ab + \frac cd \ne \frac{a + c}{b + d}$. For example $\frac12 + \frac12 = 1$, not $\frac24$. Add tops only after the bottoms match.
- You can cancel **factors**, not **terms**: $\frac{2x}{2y} = \frac xy$, but $\frac{x + 2}{y + 2} \ne \frac xy$.
- Dividing by zero is never allowed: $\frac{5}{0}$ is undefined.
:::

### Decimals and percents
To turn a fraction into a decimal, divide: $\frac38 = 3\div8 = 0.375$. To go back, write the decimal over a power of ten and simplify: $0.45 = \frac{45}{100} = \frac{9}{20}$. A fraction in lowest terms gives a terminating decimal exactly when its denominator has no prime factors other than 2 and 5; otherwise the decimal repeats, like $\frac16 = 0.1\overline6$.

**Percent** means "per hundred": $35\% = \frac{35}{100} = 0.35$. To find a percentage of something, multiply by the decimal: 35% of 80 is $0.35\times80 = 28$. To find what percent one number is of another, divide and multiply by 100: 18 out of 24 is $\frac{18}{24} = 0.75 = 75\%$.

**Percent change** compares a new value with the old one:
$$\text{percent change} = \frac{\text{new} - \text{old}}{\text{old}}\times100\%$$
From 50 to 65 is $\frac{15}{50} = 30\%$ up. A neat shortcut: increasing by $p\%$ means multiplying by $1 + \frac{p}{100}$, and decreasing means multiplying by $1 - \frac{p}{100}$. A 15% tip on \$40 is $40\times1.15 = 46$ total.

:::warn Percent ups and downs don't cancel
A price rises 20% then falls 20%. It does **not** return to the start: $100\times1.2\times0.8 = 96$. Each percentage is taken of a different base.
:::

### Ratios and proportions
A **ratio** compares quantities: a recipe with 2 cups flour to 3 cups milk has ratio $2:3$, meaning flour is $\frac23$ of the milk, or $\frac25$ of the total mixture. Ratios simplify like fractions, so $10:15 = 2:3$. To split an amount in a given ratio, add the parts: sharing \$50 in the ratio $2:3$ gives 5 parts of \$10, so \$20 and \$30.

A **proportion** says two ratios are equal, $\frac ab = \frac cd$, and is solved by **cross-multiplying**: $ad = bc$. If 3 notebooks cost \$7.50, then 8 cost $x$ where $\frac{3}{7.50} = \frac{8}{x}$, so $3x = 60$ and $x = \$20$. Cross-multiplying is just multiplying both sides by $bd$ to clear the fractions.

:::def Ratio
A comparison $a:b$ of two quantities, equivalent to the fraction $\frac ab$. Two equal ratios form a proportion.
:::

### Summary
A fraction is parts of a whole and also a division. Equivalent fractions come from multiplying top and bottom by the same number, and simplifying divides by the GCD. Multiply straight across; divide by multiplying by the reciprocal; add or subtract only with a common denominator. Decimals, percents and fractions are three spellings of the same numbers, percent change is measured against the old value, and ratios compare quantities and are solved by cross-multiplying.

@viz fraction a=2 b=3 c=3 d=4 | Change the two fractions. The bars show their sizes and the readout shows the sum built with a common denominator.

:::explore
**What to try**
1. Set the fractions to $\frac12$ and $\frac24$. The bars are filled to the same length: equivalent fractions.
2. Set $\frac13$ and $\frac14$. Read the sum $\frac{1\cdot4 + 1\cdot3}{12} = \frac7{12}$, the cross-multiplication formula from the article.
3. Compare $\frac58$ and $\frac35$. The readout shows which is bigger, matching the common-denominator comparison.
4. Try $\frac46 + \frac36$. The readout simplifies $\frac{42}{36}$ to $\frac76$ by dividing by the GCD.

**What to notice:** the formula $\frac{ad + bc}{bd}$ re-cuts both bars into $bd$ pieces before combining. The bar picture makes it obvious that adding tops and bottoms separately can't be right.
:::

:::formulas
$$\frac ab = \frac{ak}{bk}\ (k\ne0)$$
$$\frac ab\cdot\frac cd = \frac{ac}{bd}\qquad\frac ab\div\frac cd = \frac ab\cdot\frac dc$$
$$\frac ab + \frac cd = \frac{ad + bc}{bd}$$
$$x\% = \frac{x}{100}\qquad\text{change} = \frac{\text{new} - \text{old}}{\text{old}}$$
$$\frac ab = \frac cd \iff ad = bc\quad(b, d \ne 0)$$
:::

:::thm Terminating decimals
A fraction in lowest terms has a terminating decimal expansion if and only if its denominator has no prime factors other than 2 and 5.
:::

:::steps Adding $\frac{5}{6} + \frac{3}{4}$
1. Find a common denominator. The least common multiple of 6 and 4 is 12.
2. Rewrite each fraction: $\frac56 = \frac{10}{12}$ and $\frac34 = \frac9{12}$.
3. Add the numerators: $\frac{10 + 9}{12} = \frac{19}{12}$.
4. Optionally write it as a mixed number: $1\frac{7}{12}$.
:::

:::steps Simplify $\dfrac{\frac23 - \frac16}{\frac34}$
1. Top: common denominator 6, so $\frac46 - \frac16 = \frac36 = \frac12$.
2. Divide by $\frac34$: $\frac12\cdot\frac43$.
3. Multiply: $\frac46 = \frac23$.
:::

:::steps A \$80 jacket is 25% off, then 8% tax is added. Final price?
1. Discount: pay 75%, so $80\times0.75 = 60$.
2. Tax: pay 108%, so $60\times1.08 = 64.80$.
3. Final price: \$64.80.
:::

:::mock Exam question
A model's accuracy improves from 80% to 92%. By how many percentage points did it improve, and by what percent? By what percent did the error rate fall?
:::solution
Percentage points: $92 - 80 = 12$ points. Percent improvement: $\frac{12}{80} = 0.15 = 15\%$. The error rate fell from 20% to 8%, a change of $\frac{8 - 20}{20} = -0.6$, so a 60% reduction. The same change can sound very different depending on how you describe it.
:::
:::

:::real
- **Cooking:** doubling a recipe that uses $\frac34$ cup of sugar needs $\frac32 = 1\frac12$ cups.
- **Maps:** a scale of $1:50{,}000$ means 2 cm on the map is $100{,}000$ cm = 1 km on the ground.
- **Sales:** "buy 2, get the third free" is a discount of $\frac13 \approx 33.3\%$ per item.
:::

:::ml
Probabilities are fractions between 0 and 1. Accuracy, precision and recall are ratios like $\frac{\text{correct}}{\text{total}}$. A **train/test split** of 80/20 is a ratio, and class imbalance (1 fraud per 1000 transactions) is described with ratios and percents. Learning rates like $0.001$ and dropout rates like $0.5$ are fractions too.
:::

:::cs
Integer division truncates: in many languages `7 / 2` gives `3`. To get `3.5` you need floating-point numbers. Python has a `fractions.Fraction` type for exact rational arithmetic when rounding errors aren't acceptable, and `7 // 2` and `7 % 2` give the quotient 3 and remainder 1.
:::

:::quiz
? Compute $\frac23 + \frac15$.
= 13/15
> Common denominator 15: $\frac{10}{15} + \frac{3}{15} = \frac{13}{15}$.

? Compute $\frac34 \div \frac38$.
= 2
> $\frac34\cdot\frac83 = \frac{24}{12} = 2$.

? Simplify $\frac{18}{24}$.
= 3/4|0.75
> Divide top and bottom by $\gcd = 6$.

? A shirt costs \$40 after a 20% discount. What was the original price?
= 50
> The sale price is 80% of the original: $0.8x = 40$, so $x = 50$.

? Which is bigger, $\frac58$ or $\frac35$?
+ $\frac58$
- $\frac35$
- They are equal
> $\frac{25}{40} > \frac{24}{40}$.

? Share 45 sweets in the ratio $4:5$. How many does the smaller share get?
= 20
> 9 parts of 5 sweets each; $4\times5 = 20$.
:::

# Unit: Exponents, roots and logarithms

## Lesson: Exponent rules {#exponents}
@summary: Powers as repeated multiplication, the product, quotient and power rules, zero and negative exponents, and why they all follow from one idea.

### Why exponents exist
Imagine a rumour. You tell 2 friends, each of them tells 2 more the next hour, and so on. After 10 hours, how many new people hear it in that hour? It is $2\times2\times2\times2\times2\times2\times2\times2\times2\times2$, which is tiring to write and easy to miscount. Exponents are the shorthand: $2^{10} = 1024$. Whenever something is multiplied by the same factor again and again, as with population growth, compound interest, computer memory sizes or the number of possible passwords, exponents appear.

This article builds the exponent rules from scratch. You won't need to memorise them, because each one follows from the meaning of a power in a single line. Then we'll extend exponents to zero and negative numbers in the only way that keeps the rules working, and finish with the mistakes that trip people up most often.

### Exponents are shorthand for repeated multiplication
For a whole number $n \ge 1$,
$$a^n = \underbrace{a\cdot a\cdots a}_{n\text{ factors}}$$
$a$ is the **base** and $n$ is the **exponent** (or power). So $3^4 = 3\cdot3\cdot3\cdot3 = 81$, and $10^3 = 1000$. Read $a^2$ as "$a$ squared" (the area of a square of side $a$) and $a^3$ as "$a$ cubed" (the volume of a cube).

:::def Exponent
In $a^n$, the exponent $n$ says how many copies of the base $a$ are multiplied together. For negative and fractional $n$ the meaning is extended so the exponent rules keep working.
:::

### Discovering the rules yourself
**Product rule.** What is $2^3\cdot2^4$? Write it out: $(2\cdot2\cdot2)\cdot(2\cdot2\cdot2\cdot2)$, which is seven 2s, so $2^7$. In general, multiplying powers of the same base **adds** the exponents:
$$a^m\cdot a^n = a^{m+n}$$

**Quotient rule.** What is $\frac{5^6}{5^2}$? Six 5s on top, two on the bottom; two pairs cancel, leaving four: $5^4$. Dividing **subtracts** exponents:
$$\frac{a^m}{a^n} = a^{m-n}\quad(a \ne 0)$$

**Power of a power.** What is $(x^3)^2$? That is $x^3\cdot x^3 = x^6$. Raising a power to a power **multiplies** the exponents:
$$(a^m)^n = a^{mn}$$

**Power of a product or quotient.** $(3x)^2 = 3x\cdot3x = 9x^2$. The exponent applies to every factor inside the brackets: $(ab)^n = a^nb^n$, and likewise $\left(\frac ab\right)^n = \frac{a^n}{b^n}$. For instance $\left(\frac23\right)^3 = \frac{8}{27}$.

### Zero and negative exponents
What should $2^0$ mean? "Zero copies of 2 multiplied together" sounds meaningless, so let the rules decide. The quotient rule says $\frac{2^3}{2^3} = 2^{3-3} = 2^0$, but anything divided by itself is 1. So we define
$$a^0 = 1\quad(a\ne0)$$
The same pattern appears if you walk down the powers of 2: $2^3 = 8$, $2^2 = 4$, $2^1 = 2$, $2^0 = 1$. Each step down divides by 2. Keep going and you get $2^{-1} = \frac12$, $2^{-2} = \frac14$, $2^{-3} = \frac18$. So a negative exponent means a **reciprocal**:
$$a^{-n} = \frac{1}{a^n}$$
A negative exponent does **not** make the number negative. $2^{-3} = \frac18 = 0.125$ is positive and small. A handy consequence is that moving a factor across a fraction bar flips the sign of its exponent: $\frac{1}{x^{-4}} = x^4$ and $\frac{a^{-2}}{b^{-3}} = \frac{b^3}{a^2}$. For a fraction base, flip it: $\left(\frac23\right)^{-2} = \left(\frac32\right)^2 = \frac94$.

@fig func kind=power n=-1 | y = x to the power -1 is y = 1/x: negative exponents give reciprocals.

### Fractional exponents (preview)
The rules even tell us what $9^{1/2}$ must be. By the power rule, $(9^{1/2})^2 = 9^1 = 9$, so $9^{1/2}$ is the number whose square is 9, namely $\sqrt9 = 3$. In general $a^{1/n} = \sqrt[n]{a}$, and $a^{m/n} = (\sqrt[n]{a})^m$. So $8^{2/3} = (\sqrt[3]8)^2 = 2^2 = 4$. The next lesson covers roots properly.

### Watch the parentheses
Exponents bind tightly, so brackets matter. $-3^2 = -9$ because the square applies only to 3, while $(-3)^2 = 9$. Similarly $2x^3$ means $2\cdot x^3$, and only $(2x)^3 = 8x^3$ cubes the 2 as well. A negative base to an even power is positive, and to an odd power is negative: $(-2)^4 = 16$ but $(-2)^5 = -32$.

### Common mistakes
The biggest one is treating exponents as if they distribute over addition: $(a + b)^2 \ne a^2 + b^2$. Check with numbers: $(3 + 4)^2 = 49$ but $9 + 16 = 25$. The missing piece, $2ab$, appears in the polynomials lesson.

Second, the rules need the **same base**. $2^3\cdot3^2$ can't be combined into one power; it is just $8\cdot9 = 72$. But $2^3\cdot5^3 = (2\cdot5)^3 = 1000$ works because the exponents match.

Third, don't multiply the base by the exponent: $3^4$ is $81$, not $12$. And $a^m\cdot a^n$ adds exponents, it doesn't multiply them: $x^2\cdot x^3 = x^5$, not $x^6$.

Finally, $0^0$ is a special case. Many areas of maths and most programming languages define it as 1 for convenience, but it should be treated with care; $0^{-1}$ is undefined because it would mean $\frac10$.

### Growing fast
Exponents grow astonishingly quickly. Folding a sheet of paper 0.1 mm thick doubles its thickness each time; after 42 folds it would be $0.1\times2^{42}$ mm, about 440,000 km, further than the Moon. That explosive growth is why exponents describe pandemics, chain reactions and the cost of brute-force search.

### Putting the rules together
Real problems usually need several rules at once, and the trick is to work slowly, one rule per line. Take $\left(\frac{x^4}{x}\right)^2$. First simplify inside the brackets with the quotient rule: $\frac{x^4}{x} = x^{4-1} = x^3$. Then apply the power rule: $(x^3)^2 = x^6$. You could also apply the power to top and bottom first, $\frac{x^8}{x^2}$, and then subtract to get $x^6$. Both routes must give the same answer, and checking that they do is an excellent way to catch mistakes.

When a problem mixes different bases, try rewriting everything in terms of one base. Since $4 = 2^2$, $8 = 2^3$ and $16 = 2^4$, an expression like $4^3\cdot8$ becomes $2^6\cdot2^3 = 2^9 = 512$. This idea, rewriting in a common base, is also the first step in solving exponential equations, and it returns in the logarithms lesson. A final habit worth building is to test any rule you are unsure of with small numbers such as 2 and 3. If the rule fails for them, it is not a rule.

### Summary
$a^n$ means $n$ copies of $a$ multiplied. Same base: multiply means add exponents, divide means subtract, power of a power means multiply. $a^0 = 1$ and $a^{-n} = \frac1{a^n}$ because those are the only definitions that keep the rules consistent. Exponents distribute over products, never over sums.

@viz func kind=power n=2 | Change the exponent n, including negative values, and watch the shape of y = xⁿ.

:::explore
**What to try**
1. Set $n = 2$, then $n = 4$. Both are even, so the graph is symmetric: negative inputs give positive outputs, as in $(-2)^4 = 16$.
2. Set $n = 3$ and $n = 5$. Odd powers keep the sign, so the left half goes down: $(-2)^3 = -8$.
3. Set $n = 0$. The graph is the flat line $y = 1$: every non-zero base to the zero power is 1.
4. Set $n = -1$ and $n = -2$. The graph becomes $\frac1x$ and $\frac1{x^2}$, shooting up near $x = 0$ and shrinking towards 0 for large $x$.

**What to notice:** for $x > 1$, larger exponents give much larger values, while between 0 and 1 they give smaller values ($0.5^2 = 0.25$). Negative exponents turn growth into shrinking, exactly the reciprocal rule from the article.
:::

:::formulas
$$a^m a^n = a^{m+n}\qquad \frac{a^m}{a^n} = a^{m-n}$$
$$(a^m)^n = a^{mn}\qquad (ab)^n = a^nb^n\qquad \left(\tfrac ab\right)^n = \tfrac{a^n}{b^n}$$
$$a^0 = 1\qquad a^{-n} = \frac1{a^n}\qquad \left(\tfrac ab\right)^{-n} = \left(\tfrac ba\right)^n$$
$$a^{1/n} = \sqrt[n]a\qquad a^{m/n} = \left(\sqrt[n]a\right)^m$$
:::

:::thm The exponent laws
For real $a, b > 0$ and any real exponents $m, n$: $a^ma^n = a^{m+n}$, $(a^m)^n = a^{mn}$ and $(ab)^n = a^nb^n$. For whole-number exponents they hold for any non-zero $a, b$.
:::

:::proof Product rule for whole numbers
$a^m a^n$ is $m$ copies of $a$ followed by $n$ more copies, all multiplied. By associativity the brackets don't matter, so it is $m + n$ copies: $a^{m+n}$. The other rules are counted the same way.
:::

:::steps Simplify $\dfrac{(2x^3y)^2}{4x^{-1}y^5}$
1. Power of a product on top: $(2x^3y)^2 = 4x^6y^2$.
2. Divide the numbers: $\frac44 = 1$.
3. Subtract exponents of $x$: $x^{6-(-1)} = x^7$.
4. Subtract exponents of $y$: $y^{2-5} = y^{-3} = \frac1{y^3}$.
5. Result: $\dfrac{x^7}{y^3}$.
:::

:::steps Evaluate $\left(\frac23\right)^{-2} + 5^0 - 2^{-1}$
1. Flip the fraction: $\left(\frac23\right)^{-2} = \left(\frac32\right)^2 = \frac94$.
2. $5^0 = 1$ and $2^{-1} = \frac12$.
3. Add: $\frac94 + 1 - \frac12 = \frac94 + \frac44 - \frac24 = \frac{11}{4}$.
:::

:::steps Write $\dfrac{8^3\cdot 4^{-2}}{2^5}$ as a single power of 2
1. Rewrite in base 2: $8^3 = (2^3)^3 = 2^9$ and $4^{-2} = (2^2)^{-2} = 2^{-4}$.
2. Top: $2^{9 + (-4)} = 2^5$.
3. Divide: $2^{5 - 5} = 2^0 = 1$.
:::

:::mock Exam question
Solve $4^{x+1} = 8^{x}$ by writing both sides as powers of 2.
:::solution
$4^{x+1} = (2^2)^{x+1} = 2^{2x+2}$ and $8^x = (2^3)^x = 2^{3x}$. Equal powers of the same base must have equal exponents, so $2x + 2 = 3x$, giving $x = 2$. Check: $4^3 = 64 = 8^2$.
:::
:::

:::real
- **Computer storage:** a kilobyte in binary is $2^{10} = 1024$ bytes, a megabyte $2^{20}$, a gigabyte $2^{30}$ bytes.
- **Passwords:** an 8-character password from 62 letters and digits has $62^8 \approx 2.2\times10^{14}$ possibilities; adding one character multiplies that by 62.
- **Sound:** every 10 decibels means $10^1$ times the sound intensity, so 80 dB is $10^{2} = 100$ times more intense than 60 dB.
:::

:::cs
An $n$-bit number can hold $2^n$ different values: 8 bits give 256. Binary search halves the problem each step, so after $k$ steps $\frac{n}{2^k}$ items remain. Exponential running times like $2^n$ are what make brute-force algorithms impractical for large inputs.
:::

:::ml
Learning rates are written with negative powers of ten, like $10^{-3}$. Weight decay $\lambda = 10^{-4}$, the tiny $\epsilon = 10^{-8}$ in the Adam optimiser, and the softmax function's $e^{z}$ all rely on exponent rules. Squared errors $(y - \hat y)^2$ are powers too.
:::

:::quiz
? Simplify $x^5\cdot x^{-2}$.
- $x^{-10}$
+ $x^3$
- $x^7$
> Add exponents: $5 + (-2) = 3$.

? Evaluate $2^{-3}$.
= 1/8|0.125
> $\frac{1}{2^3} = \frac18$.

? Evaluate $(-2)^5$.
= -32
> Odd power of a negative base is negative.

? Evaluate $\dfrac{3^7}{3^5}$.
= 9
> $3^{7-5} = 3^2 = 9$.

? Is $(a + b)^2 = a^2 + b^2$ for all numbers?
- Yes
+ No
> $(1 + 1)^2 = 4$ but $1^2 + 1^2 = 2$.

? Evaluate $8^{2/3}$.
= 4
> $(\sqrt[3]8)^2 = 2^2 = 4$.
:::

## Lesson: Roots and fractional exponents {#roots}
@summary: Square roots, cube roots and nth roots, simplifying radicals, rationalizing denominators, and roots as fractional exponents.

### Undoing a power
Imagine you have a square garden with an area of 49 square metres and you want to buy fencing for one side. You need the side length: the number that, multiplied by itself, gives 49. That number is 7, and we call it the **square root** of 49, written $\sqrt{49} = 7$. Roots are the reverse of powers, in the same way that subtraction reverses addition. Squaring takes you from side to area; the square root takes you from area back to side.

Roots appear any time a squared quantity needs to be undone: distances in geometry ($\sqrt{x^2 + y^2}$), the standard deviation in statistics, the length of a vector in machine learning, and the quadratic formula. This article covers square roots, cube roots and $n$th roots, how to simplify them, how to clear them from denominators, and how they fit perfectly into the exponent rules as fractional powers.

### Square roots
For $a \ge 0$, $\sqrt a$ is the **non-negative** number whose square is $a$:
$$\sqrt a = b \iff b^2 = a \text{ and } b \ge 0$$
So $\sqrt{25} = 5$, $\sqrt{0} = 0$, $\sqrt{\frac{9}{16}} = \frac34$ and $\sqrt{0.01} = 0.1$. Numbers like 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 are **perfect squares** and have whole-number roots. Others, like $\sqrt2 \approx 1.414$ and $\sqrt{10} \approx 3.162$, are irrational. You can estimate them by bracketing: since $3^2 = 9 < 10 < 16 = 4^2$, $\sqrt{10}$ is between 3 and 4, and closer to 3.

:::def Square root
For $a \ge 0$, $\sqrt a$ is the unique non-negative number whose square is $a$.
:::

### Two answers, one symbol
The equation $x^2 = 25$ has **two** solutions, $x = 5$ and $x = -5$, because $(-5)^2 = 25$ too. But the symbol $\sqrt{25}$ means only the positive one, 5. That's why we write $x = \pm\sqrt{25} = \pm5$ when solving. This also explains a subtle identity:
$$\sqrt{x^2} = |x|$$
For example $\sqrt{(-3)^2} = \sqrt9 = 3 = |-3|$, not $-3$. In the real numbers, the square root of a negative number doesn't exist: no real number squares to $-4$. (The complex numbers fix that with $i$.)

### Cube roots and nth roots
The **cube root** $\sqrt[3]{a}$ is the number whose cube is $a$: $\sqrt[3]{8} = 2$ because $2^3 = 8$. Unlike square roots, cube roots of negatives are fine: $\sqrt[3]{-27} = -3$ because $(-3)^3 = -27$. A cube with volume 64 cm³ has side $\sqrt[3]{64} = 4$ cm.

In general, the $n$th root $\sqrt[n]{a}$ undoes the $n$th power. For even $n$ it needs $a \ge 0$ and gives the non-negative answer; for odd $n$ any real $a$ works. So $\sqrt[4]{81} = 3$, $\sqrt[5]{32} = 2$ and $\sqrt[5]{-32} = -2$. The small number $n$ is called the **index**.

### Simplifying radicals
Roots multiply and divide nicely:
$$\sqrt{ab} = \sqrt a\,\sqrt b,\qquad \sqrt{\frac ab} = \frac{\sqrt a}{\sqrt b}\qquad(a, b \ge 0)$$
This lets us pull perfect squares out of a root. To simplify $\sqrt{72}$, find the largest perfect-square factor: $72 = 36\cdot2$, so $\sqrt{72} = \sqrt{36}\sqrt2 = 6\sqrt2$. Similarly $\sqrt{50} = \sqrt{25\cdot2} = 5\sqrt2$, and $\sqrt[3]{54} = \sqrt[3]{27\cdot2} = 3\sqrt[3]2$.

Simplified roots can be combined like terms when the part under the root matches: $5\sqrt2 + 3\sqrt2 = 8\sqrt2$, just as $5x + 3x = 8x$. But $\sqrt2 + \sqrt3$ can't be combined.

:::warn Roots don't split over sums
$\sqrt{a + b} \ne \sqrt a + \sqrt b$. Check: $\sqrt{9 + 16} = \sqrt{25} = 5$, but $\sqrt9 + \sqrt{16} = 3 + 4 = 7$. Roots split over products and quotients only.
:::

### Rationalizing the denominator
By convention, answers are written without roots in the denominator. To remove one, multiply top and bottom by a clever form of 1. For a single root:
$$\frac{6}{\sqrt3} = \frac{6}{\sqrt3}\cdot\frac{\sqrt3}{\sqrt3} = \frac{6\sqrt3}{3} = 2\sqrt3$$
For a sum or difference such as $2 + \sqrt3$, multiply by the **conjugate** $2 - \sqrt3$. The difference of squares $(a + b)(a - b) = a^2 - b^2$ makes the root disappear: $(2 + \sqrt3)(2 - \sqrt3) = 4 - 3 = 1$. So $\frac{1}{2 + \sqrt3} = \frac{2 - \sqrt3}{1} = 2 - \sqrt3$. Besides tidiness, rationalizing made hand calculation easier before calculators, and it is still useful when simplifying exact answers.

:::def Conjugate
The conjugate of $a + \sqrt b$ is $a - \sqrt b$. Their product $a^2 - b$ has no root.
:::

### Roots are fractional exponents
Here is the beautiful link with the previous lesson. If the power rule $(a^m)^n = a^{mn}$ is to keep working, then $(a^{1/2})^2 = a^1 = a$. So $a^{1/2}$ must be the square root. In general:
$$a^{1/n} = \sqrt[n]a,\qquad a^{m/n} = \left(\sqrt[n]a\right)^m = \sqrt[n]{a^m}$$
Read $a^{m/n}$ as "take the $n$th root, then raise to the $m$th power" (doing the root first keeps numbers small). $27^{2/3} = (\sqrt[3]{27})^2 = 3^2 = 9$. With a negative exponent, also take the reciprocal: $16^{-3/4} = \frac{1}{(\sqrt[4]{16})^3} = \frac{1}{2^3} = \frac18$.

Fractional exponents make root algebra easy, because all the exponent rules apply. $\sqrt x\cdot\sqrt[3]x = x^{1/2}x^{1/3} = x^{5/6}$, and $\sqrt{\sqrt x} = (x^{1/2})^{1/2} = x^{1/4}$.

@fig func kind=power n=0.5 | y = x to the power 1/2 is the square root curve: the mirror image of y = x² for x ≥ 0.

### Common mistakes
Writing $\sqrt{16} = \pm4$ is wrong: the symbol means the non-negative root, 4. The $\pm$ only appears when you solve an equation like $x^2 = 16$. Another common slip is $\sqrt{x^2 + 9} = x + 3$; test with $x = 4$ to see $\sqrt{25} = 5 \ne 7$. And remember that $a^{1/2}$ is not $\frac a2$: $16^{1/2} = 4$, not 8.

### Estimating and checking roots
You don't always need a calculator to get a good feel for a root. Find the two perfect squares on either side and judge the distance. For $\sqrt{50}$, the neighbours are $49 = 7^2$ and $64 = 8^2$. Since 50 is very close to 49, $\sqrt{50}$ is just above 7, about $7.07$. For $\sqrt{30}$, the neighbours are 25 and 36, and 30 is a little under halfway, so the root is a little under $5.5$; the true value is about $5.48$.

Checking is even easier, because a root is defined by its square. If you think $\sqrt{2.25} = 1.5$, multiply: $1.5\times1.5 = 2.25$, so you are right. If you simplified $\sqrt{72}$ to $6\sqrt2$, square your answer: $36\cdot2 = 72$. Squaring to check is the same idea as checking a division by multiplying back, and it catches most errors in seconds. It also warns you about extraneous solutions when you solve equations that contain roots, as the mock question shows.

### Summary
$\sqrt a$ is the non-negative number whose square is $a$, and $\sqrt[n]a$ undoes the $n$th power. Roots split over products and quotients but never sums, which lets you simplify $\sqrt{72} = 6\sqrt2$. Multiply by the root or the conjugate to rationalize a denominator. Most usefully, roots are fractional exponents, $a^{m/n} = (\sqrt[n]a)^m$, so every exponent rule works for them too.

@viz func kind=power n=0.5 | Start at n = 0.5 (the square root) and compare it with n = 2 and other fractional powers.

:::explore
**What to try**
1. At $n = 0.5$, find $x = 4$ on the curve: $y = 2$. Find $x = 9$: $y = 3$. That is $\sqrt4$ and $\sqrt9$.
2. Change to $n = 2$ and compare: the parabola and the root curve are reflections of each other in the line $y = x$, because they undo each other.
3. Try $n = 1.5$. The curve passes through $(4, 8)$ since $4^{3/2} = (\sqrt4)^3 = 8$.
4. Notice the half-power curve only exists for $x \ge 0$: even roots of negatives aren't real.

**What to notice:** every fractional power passes through $(0, 0)$ and $(1, 1)$, and between 0 and 1 the order flips: $\sqrt{0.25} = 0.5$ is bigger than $0.25$. Roots grow slowly, which is why square roots tame large numbers in formulas like the standard deviation.
:::

:::formulas
$$\sqrt a = b \iff b^2 = a,\ b \ge 0$$
$$\sqrt{x^2} = |x|$$
$$\sqrt{ab} = \sqrt a\sqrt b\qquad \sqrt{\tfrac ab} = \tfrac{\sqrt a}{\sqrt b}$$
$$a^{1/n} = \sqrt[n]a\qquad a^{m/n} = \left(\sqrt[n]a\right)^m\qquad a^{-m/n} = \frac1{\left(\sqrt[n]a\right)^m}$$
$$\frac{1}{a + \sqrt b} = \frac{a - \sqrt b}{a^2 - b}$$
:::

:::thm Product rule for roots
For $a, b \ge 0$ and any positive integer $n$: $\sqrt[n]{ab} = \sqrt[n]a\cdot\sqrt[n]b$.
:::

:::proof Why $\sqrt{ab} = \sqrt a\sqrt b$
Both sides are non-negative. Square the right side: $(\sqrt a\sqrt b)^2 = (\sqrt a)^2(\sqrt b)^2 = ab$. So $\sqrt a\sqrt b$ is a non-negative number whose square is $ab$, which is exactly the definition of $\sqrt{ab}$.
:::

:::steps Simplify $\sqrt{50} + \sqrt{18} - \sqrt{8}$
1. $\sqrt{50} = \sqrt{25\cdot2} = 5\sqrt2$.
2. $\sqrt{18} = \sqrt{9\cdot2} = 3\sqrt2$.
3. $\sqrt8 = \sqrt{4\cdot2} = 2\sqrt2$.
4. Combine like terms: $5\sqrt2 + 3\sqrt2 - 2\sqrt2 = 6\sqrt2$.
:::

:::steps Evaluate $27^{-2/3}$
1. Negative exponent: $27^{-2/3} = \frac1{27^{2/3}}$.
2. Root first: $\sqrt[3]{27} = 3$.
3. Then the power: $3^2 = 9$.
4. Result: $\frac19$.
:::

:::steps Rationalize $\dfrac{4}{3 - \sqrt5}$
1. Multiply top and bottom by the conjugate $3 + \sqrt5$.
2. Bottom: $(3 - \sqrt5)(3 + \sqrt5) = 9 - 5 = 4$.
3. Top: $4(3 + \sqrt5)$.
4. Simplify: $\frac{4(3 + \sqrt5)}{4} = 3 + \sqrt5$.
:::

:::mock Exam question
Solve $\sqrt{2x + 3} = x$ and check for extra solutions.
:::solution
Square both sides: $2x + 3 = x^2$, so $x^2 - 2x - 3 = 0$, which factors as $(x - 3)(x + 1) = 0$. Candidates: $x = 3$ and $x = -1$. Check: $\sqrt{9} = 3$ works. For $x = -1$, $\sqrt{1} = 1 \ne -1$, so it is an **extraneous** solution created by squaring. The only solution is $x = 3$.
:::
:::

:::real
- **Screens:** a TV with a 16:9 screen 80 cm wide is 45 cm tall, so its diagonal is $\sqrt{80^2 + 45^2} = \sqrt{8425} \approx 91.8$ cm.
- **Paper sizes:** A4 paper has sides in the ratio $1:\sqrt2$, so cutting it in half gives A5 with the same shape.
- **Falling objects:** a stone dropped from height $h$ metres hits the ground after about $\sqrt{h/4.9}$ seconds; from 20 m that is $\sqrt{4.08} \approx 2$ s.
:::

:::ml
The length (L2 norm) of a vector is $\|x\| = \sqrt{x_1^2 + \cdots + x_n^2}$. The standard deviation is the square root of the variance. Transformers scale attention scores by $\frac{1}{\sqrt{d}}$, and the RMSprop and Adam optimisers divide by $\sqrt{v} + \epsilon$.
:::

:::cs
Computers calculate square roots with fast iterative methods (Newton's method roughly doubles the correct digits each step). Game engines famously used a "fast inverse square root" trick to compute $\frac{1}{\sqrt x}$ for lighting. In code, `x ** 0.5` and `math.sqrt(x)` are the same idea as $x^{1/2}$.
:::

:::quiz
? Evaluate $\sqrt{144}$.
= 12
> $12^2 = 144$, and the root is the non-negative one.

? Simplify $\sqrt{75}$.
- $25\sqrt3$
+ $5\sqrt3$
- $3\sqrt5$
> $75 = 25\cdot3$, so $\sqrt{75} = 5\sqrt3$.

? Evaluate $16^{3/4}$.
= 8
> $(\sqrt[4]{16})^3 = 2^3 = 8$.

? Evaluate $\sqrt[3]{-64}$.
= -4
> $(-4)^3 = -64$. Odd roots of negatives are allowed.

? What is $\sqrt{(-7)^2}$?
= 7
> $\sqrt{x^2} = |x|$, so the answer is 7.

? Evaluate $9^{-1/2}$.
= 1/3
> $\frac{1}{\sqrt9} = \frac13$.
:::

## Lesson: Scientific notation and orders of magnitude {#scientific-notation}
@summary: Writing very large and very small numbers as a times 10 to the n, converting both ways, calculating with them, significant figures and orders of magnitude.

### Numbers too big and too small to write
The Sun is about 150,000,000,000 metres from Earth. A human red blood cell is about 0.000008 metres across. Written this way, both numbers are hard to read: you have to count the zeros, and one slip changes the answer by a factor of ten. Scientists, engineers and programmers solve this with **scientific notation**, which writes any number as a modest number times a power of ten. The Sun's distance becomes $1.5\times10^{11}$ m and the blood cell $8\times10^{-6}$ m. At a glance you can see that one is enormous, one is tiny, and roughly how they compare.

This article explains the format, how to convert in both directions, how to multiply, divide, add and subtract in scientific notation, how significant figures express precision, and how to think in orders of magnitude. All of it rests on the exponent rules from earlier in this unit.

### The format
A number is in scientific notation when it is written as
$$a\times10^n,\qquad 1 \le |a| < 10,\ n\text{ an integer}$$
The number $a$ is called the **coefficient** (or significand) and $n$ is the **exponent**. The rule $1 \le |a| < 10$ means the coefficient has exactly one non-zero digit before the decimal point. So $3.2\times10^5$ is in scientific notation, but $32\times10^4$ and $0.32\times10^6$ are not, even though all three equal 320,000.

:::def Scientific notation
A way of writing a number as $a\times10^n$ with $1 \le |a| < 10$ and $n$ an integer.
:::

### Why multiplying by 10 moves the decimal point
Our number system is built on powers of ten. Multiplying by 10 shifts every digit one place to the left, which looks like moving the decimal point one place right: $3.2\times10 = 32$. Multiplying by $10^5$ does that five times, so $3.2\times10^5 = 320{,}000$. Since $10^{-1} = \frac1{10}$, multiplying by a negative power of ten moves the point to the left: $4.7\times10^{-3} = 0.0047$. The exponent simply counts how many places the point moves, and its sign tells you which way.

### Converting a normal number into scientific notation
Move the decimal point until exactly one non-zero digit is in front of it, and count the moves. For 6,020,000: put the point after the 6 to get 6.02. The point moved 6 places left, so we must multiply by $10^6$ to get back to the original size: $6.02\times10^6$. For 0.00031: put the point after the 3 to get 3.1. The point moved 4 places right, which made the number bigger, so we compensate with $10^{-4}$: $3.1\times10^{-4}$.

A quick sanity check saves many errors: **big numbers (10 or more) have positive exponents, numbers between 0 and 1 have negative exponents, and numbers from 1 to 9.99... have exponent 0**. For example $7.5 = 7.5\times10^0$.

### Converting back
Reverse the process. $2.81\times10^4$: move the point 4 places right, filling with zeros, to get 28,100. $9.6\times10^{-5}$: move it 5 places left to get 0.000096. Count carefully: the first non-zero digit of $9.6\times10^{-5}$ is in the fifth decimal place.

@fig func kind=log b=10 | y = log₁₀ x: the height of the curve is the exponent n when x = 10ⁿ, so it reads off the order of magnitude.

### Multiplying and dividing
This is where scientific notation shines. Multiply the coefficients, add the exponents, then tidy up:
$$(3\times10^4)(5\times10^7) = 15\times10^{11} = 1.5\times10^{12}$$
The last step is needed because 15 is not between 1 and 10; we wrote $15 = 1.5\times10$ and added one to the exponent. Division works the same way, subtracting exponents:
$$\frac{8\times10^{3}}{2\times10^{-5}} = 4\times10^{3-(-5)} = 4\times10^{8}$$
If the coefficient drops below 1, as in $\frac{2\times10^6}{8\times10^2} = 0.25\times10^4$, shift the other way: $0.25 = 2.5\times10^{-1}$, giving $2.5\times10^3$.

### Adding and subtracting
Addition needs matching exponents, just like adding fractions needs a common denominator. To compute $4.2\times10^5 + 3\times10^4$, rewrite the second number as $0.3\times10^5$. Then $4.2 + 0.3 = 4.5$, so the answer is $4.5\times10^5$. If one number is vastly larger than the other, the smaller one barely matters: $10^{20} + 1$ is $10^{20}$ to any reasonable precision. Computers face exactly this problem, as the CS box below explains.

### Significant figures
The coefficient also tells you how precisely a number is known. The Sun's distance $1.5\times10^{11}$ m has two **significant figures**: it is known to about the nearest $10^{10}$ m. Writing $1.496\times10^{11}$ claims four significant figures. In normal notation, 150,000,000,000 hides this: are the zeros measured or just placeholders? Scientific notation removes the ambiguity. When you multiply or divide measurements, round the answer to the fewest significant figures among the inputs.

:::def Significant figures
The digits of a number that carry real information about its precision. In $a\times10^n$, they are all the digits of $a$.
:::

### Orders of magnitude
The exponent $n$ is called the **order of magnitude**. It gives a rough size when exact values don't matter. A person is about $10^0$ m tall (1.7 m), a city about $10^4$ m across, and Earth about $10^7$ m in diameter. Two quantities differ by three orders of magnitude if one is about 1000 times the other. Estimating to the nearest power of ten, sometimes called a Fermi estimate, is a powerful skill: it tells you instantly whether an answer is plausible before you do any precise work.

### Common mistakes
The most frequent error is getting the sign of the exponent backwards; use the big-or-small check above. Another is forgetting to normalise after multiplying, leaving answers like $12\times10^5$. A third is adding exponents when adding numbers: $2\times10^3 + 3\times10^3 = 5\times10^3$, not $5\times10^6$. On calculators, `2E6` or `2e6` means $2\times10^6$; typing `2 × 10^6` with a misplaced bracket is a classic source of wrong answers.

### Summary
Scientific notation writes a number as $a\times10^n$ with $1 \le |a| < 10$. The exponent counts how far the decimal point moves: positive for large numbers, negative for small ones. Multiply and divide by combining coefficients and adding or subtracting exponents, then normalise. Add and subtract only after matching exponents. The coefficient shows precision through its significant figures, and the exponent alone gives the order of magnitude.

@viz func kind=log b=10 | The graph of y = log₁₀ x. Its height at x is the power of ten that gives x, the exponent in scientific notation.

:::explore
**What to try**
1. Keep $b = 10$. Read $y$ at $x = 1$ and $x = 10$: you get $0$ and $1$, because $1 = 10^0$ and $10 = 10^1$.
2. Read $y$ at $x = 0.1$: it is $-1$, since $0.1 = 10^{-1}$. Numbers between 0 and 1 have negative exponents, as in the article.
3. Read $y$ at $x = 5$: about $0.7$. So $5 = 10^{0.7}$, and every number from 1 to 10 has a log between 0 and 1. That is why the coefficient $a$ is kept in $[1, 10)$: the exponent $n$ carries the whole-number part of the log.
4. Notice how slowly the curve climbs. Going from 1 to 10 raises it by 1, and going from 10 to 100 would raise it by only 1 more.

**What to notice:** multiplying $x$ by 10 always adds exactly 1 to $y$. Moving the decimal point one place is the same as changing the exponent by one, and the order of magnitude of a number is the whole-number part of its $\log_{10}$.
:::

:::formulas
$$a\times10^n,\quad 1 \le |a| < 10$$
$$(a\times10^m)(b\times10^n) = ab\times10^{m+n}$$
$$\frac{a\times10^m}{b\times10^n} = \frac ab\times10^{m-n}$$
$$a\times10^n + b\times10^n = (a + b)\times10^n$$
:::

:::steps Compute $(6\times10^{-4})(7\times10^{9})$ in scientific notation
1. Multiply coefficients: $6\times7 = 42$.
2. Add exponents: $-4 + 9 = 5$, so $42\times10^5$.
3. Normalise: $42 = 4.2\times10^1$, giving $4.2\times10^6$.
:::

:::steps Compute $\dfrac{3.6\times10^{2}}{9\times10^{-3}}$
1. Divide coefficients: $\frac{3.6}{9} = 0.4$.
2. Subtract exponents: $2 - (-3) = 5$, so $0.4\times10^5$.
3. Normalise: $0.4 = 4\times10^{-1}$, giving $4\times10^4$.
:::

:::steps Add $5.1\times10^{6} + 4\times10^{5}$
1. Match exponents: $4\times10^5 = 0.4\times10^6$.
2. Add coefficients: $5.1 + 0.4 = 5.5$.
3. Result: $5.5\times10^6$.
:::

:::mock Exam question
Light travels at about $3\times10^8$ m/s and the Sun is $1.5\times10^{11}$ m away. How many seconds does sunlight take to reach Earth, and roughly how many minutes is that?
:::solution
Time = distance / speed $= \frac{1.5\times10^{11}}{3\times10^8} = 0.5\times10^3 = 5\times10^2 = 500$ s. Dividing by 60 gives about $8.3$ minutes.
:::
:::

:::real
- **Medicine:** a typical bacterium is about $2\times10^{-6}$ m long, a virus about $1\times10^{-7}$ m, so a bacterium is about 20 times longer.
- **Chemistry:** one mole contains $6.022\times10^{23}$ particles (Avogadro's number).
- **Money:** a national debt of 30 trillion dollars is $3\times10^{13}$ dollars; shared among $3.3\times10^8$ people it is about $9\times10^4$ dollars each.
:::

:::cs
Computers store real numbers in floating point, which is scientific notation in base 2: a value is $\pm m\times2^e$. A 64-bit double has about 15 to 16 significant decimal digits, so adding $1$ to $10^{17}$ changes nothing. Code writes scientific notation as `6.02e23` or `1e-9`.
:::

:::ml
Hyperparameters span many orders of magnitude, so they are written and searched in scientific notation: learning rates from $10^{-5}$ to $10^{-1}$, regularisation $\lambda = 10^{-4}$. Large language models have around $10^{9}$ to $10^{12}$ parameters and train on roughly $10^{12}$ tokens. Thinking in orders of magnitude is how practitioners estimate compute and memory.
:::

:::quiz
? Write 45,000 in scientific notation.
- $45\times10^3$
+ $4.5\times10^4$
- $4.5\times10^3$
> Move the point 4 places left to get 4.5, so the exponent is 4.

? Write 0.0062 in scientific notation.
- $6.2\times10^{3}$
- $6.2\times10^{-2}$
+ $6.2\times10^{-3}$
> The first non-zero digit is in the third decimal place.

? What is $(2\times10^3)(4\times10^5)$ written as a coefficient times $10^8$? Give the coefficient.
= 8
> $2\times4 = 8$ and $3 + 5 = 8$, so $8\times10^8$.

? $\dfrac{9\times10^{7}}{3\times10^{2}} = 3\times10^{k}$. Find $k$.
= 5
> Subtract exponents: $7 - 2 = 5$.

? $3\times10^4 + 2\times10^4 = c\times10^4$. Find $c$.
= 5
> Exponents match, so add coefficients.

? How many significant figures does $3.040\times10^{5}$ have?
= 4
> All digits of the coefficient count, including the final 0.
:::

## Lesson: Logarithms {#logarithms}
@summary: Logarithms as the inverse of exponents: definition, the product, quotient and power laws, change of base, natural log, and solving exponential equations.

### Asking the reverse question
Suppose a bacteria colony doubles every hour and you start with one cell. Exponents answer the forward question: after 5 hours there are $2^5 = 32$ cells. But often we want the reverse: **how many hours until there are 1000 cells?** We need the exponent $x$ in $2^x = 1000$. That reverse question, "what power do I need?", is exactly what a **logarithm** answers. Logarithms are not a strange new operation; they are exponents read backwards.

They also turn hard problems into easy ones. A logarithm converts multiplication into addition and powers into multiplication, which is why for 350 years scientists computed with log tables and slide rules. Today logs measure earthquakes, sound and acidity, describe how fast algorithms run, and appear in nearly every machine learning loss function. This article defines the logarithm, explains its three laws, shows how to change base, and uses logs to solve exponential equations.

### The definition
For a base $b > 0$ with $b \ne 1$, and $x > 0$,
$$\log_b x = y \iff b^y = x$$
Read $\log_b x$ as "log base $b$ of $x$": the power you raise $b$ to in order to get $x$. Some examples: $\log_2 8 = 3$ because $2^3 = 8$. $\log_{10} 1000 = 3$ because $10^3 = 1000$. $\log_5 25 = 2$. $\log_3 \frac19 = -2$ because $3^{-2} = \frac19$. And $\log_{4} 2 = \frac12$ because $4^{1/2} = 2$.

Every log statement can be rewritten as an exponent statement and back again. When a logarithm question feels confusing, translate it: "$\log_2 32 = ?$" becomes "$2^? = 32$", and the answer 5 is easy.

:::def Logarithm
$\log_b x$ is the exponent $y$ such that $b^y = x$. It is defined for $b > 0$, $b \ne 1$ and $x > 0$.
:::

### Special values and special bases
Because $b^1 = b$ and $b^0 = 1$, every log has $\log_b b = 1$ and $\log_b 1 = 0$. Logs of numbers between 0 and 1 are negative ($\log_{10}0.01 = -2$), and the log of zero or a negative number is undefined, since a positive base raised to any power is always positive.

Two bases get their own notation. The **common logarithm** $\log x$ (or $\log_{10}x$) uses base 10 and counts digits: $\log_{10}$ of a number between 100 and 1000 is between 2 and 3. The **natural logarithm** $\ln x$ uses base $e \approx 2.718$, the number studied in the next lesson; it is the default in calculus and machine learning. Computer science often uses $\log_2$, which counts how many times you can halve something.

### Logs and exponentials undo each other
Since a log answers "what power?", the two operations cancel:
$$b^{\log_b x} = x\qquad\text{and}\qquad \log_b(b^y) = y$$
For instance $10^{\log_{10}7} = 7$ and $\ln(e^4) = 4$. Graphically, $y = \log_b x$ is the reflection of $y = b^x$ in the line $y = x$, just as the square root curve reflects the squaring curve.

@fig func kind=log b=2 | y = log₂ x passes through (1, 0), (2, 1), (4, 2) and (8, 3): it climbs by 1 each time x doubles.

### The three laws
Each law comes straight from an exponent rule. Let $\log_b M = m$ and $\log_b N = n$, so $M = b^m$ and $N = b^n$.

**Product law.** $MN = b^mb^n = b^{m+n}$, so $\log_b(MN) = m + n$:
$$\log_b(MN) = \log_b M + \log_b N$$
Check: $\log_2(4\cdot8) = \log_2 32 = 5$ and $\log_2 4 + \log_2 8 = 2 + 3 = 5$.

**Quotient law.** $\frac MN = b^{m-n}$, so $\log_b\frac MN = \log_b M - \log_b N$. Check: $\log_{10}\frac{1000}{10} = 3 - 1 = 2$.

**Power law.** $M^k = b^{mk}$, so $\log_b(M^k) = k\log_b M$. Check: $\log_2(8^2) = \log_2 64 = 6 = 2\cdot3$.

These laws let you expand and combine expressions. $\log(x^3y) = 3\log x + \log y$, and $\log 5 + \log 2 = \log 10 = 1$.

### Change of base
Calculators usually have only $\ln$ and $\log_{10}$. To find any other log, use
$$\log_b x = \frac{\log_k x}{\log_k b}\quad\text{for any valid base } k$$
So $\log_2 1000 = \frac{\ln 1000}{\ln 2} \approx \frac{6.908}{0.693} \approx 9.97$. This answers our bacteria question: about 10 hours to reach 1000 cells. That makes sense, since $2^{10} = 1024$.

### Solving exponential equations
When the unknown is in an exponent, take a log of both sides and use the power law to bring it down. To solve $3^x = 20$: $\ln 3^x = \ln 20$, so $x\ln3 = \ln20$ and $x = \frac{\ln 20}{\ln 3} \approx 2.727$. Check: $3^{2.727} \approx 20$. When both sides can be written with the same base, you don't even need a calculator: $5^{x} = 125 = 5^3$ gives $x = 3$.

### Common mistakes
The laws do not cover sums: $\log(M + N) \ne \log M + \log N$. Check: $\log_{10}(10 + 10) = \log 20 \approx 1.30$, not 2. Also $\frac{\log M}{\log N}$ is not $\log M - \log N$; the quotient law is about the log of a quotient. Third, $\log_b x^2 = 2\log_b x$ is only safe for $x > 0$. Finally, remember that logs of zero and negative numbers do not exist in the real numbers, so check that answers keep every log's input positive.

### Logarithms as counting
A helpful way to feel what a logarithm does is to think of it as counting multiplications. $\log_{10}$ counts how many times you multiply by ten, which is close to counting digits. The number 5,000 has four digits and its common log is about 3.7, while 50,000 has five digits and a log of about 4.7. Adding one digit adds one to the log. In the same way, $\log_2$ counts doublings or halvings. How many times can you fold a list of 64 names in half before only one name is left? You go 64, 32, 16, 8, 4, 2, 1, which is six halvings, and indeed $\log_2 64 = 6$.

This counting view explains why logarithms grow so slowly. To raise $\log_{10}x$ from 6 to 7, $x$ must grow from a million to ten million. That slow growth is exactly what makes logs useful for squeezing a huge range of values onto a readable scale. A sound meter, a star brightness chart and a graph with a logarithmic axis all use this idea: equal steps on the scale mean equal multiplication factors, not equal additions. Whenever data spans many powers of ten, such as incomes, city sizes or word frequencies, plotting the log reveals patterns that a normal scale would flatten into a single corner of the graph. Logs make the big picture visible.

### Summary
$\log_b x$ is the power of $b$ that gives $x$, so logs undo exponentials. Products become sums, quotients become differences and powers become multipliers. Change of base, $\log_b x = \frac{\ln x}{\ln b}$, lets any calculator find any log, and taking logs brings an unknown exponent down so you can solve for it.

@viz func kind=log b=2 | Change the base b and see how y = log_b x changes. The dashed curve is ln x for comparison.

:::explore
**What to try**
1. With $b = 2$, read $y$ at $x = 1, 2, 4, 8$. You get $0, 1, 2, 3$: doubling $x$ adds 1, the product law with $\log_2 2 = 1$.
2. Change $b$ to 10. The curve rises much more slowly: you must multiply $x$ by 10 to add 1 to $y$.
3. Set $b$ close to $2.7$. The curve almost sits on the dashed $\ln x$ curve, because $e \approx 2.718$.
4. Look left of $x = 1$: the curve is negative, matching $\log_{10}0.01 = -2$. It never reaches $x = 0$.

**What to notice:** every log curve passes through $(1, 0)$ and $(b, 1)$. All the curves are stretched copies of each other, which is exactly what change of base says: $\log_b x = \frac{\ln x}{\ln b}$ is $\ln x$ times a constant.
:::

@viz inverse | Compare an exponential function with its inverse, the logarithm, reflected in y = x.

:::explore
**What to try**
1. Choose the $e^x$ option and find a point such as $(1, 2.718)$ on the exponential curve.
2. Find its mirror point $(2.718, 1)$ on the $\ln x$ curve.
3. Compare with the square and cube options to see that every inverse pair is a reflection in $y = x$.

**What to notice:** swapping inputs and outputs is exactly what the definition $\log_b x = y \iff b^y = x$ says.
:::

:::formulas
$$\log_b x = y \iff b^y = x$$
$$\log_b 1 = 0\qquad \log_b b = 1\qquad b^{\log_b x} = x\qquad \log_b b^y = y$$
$$\log_b(MN) = \log_b M + \log_b N\qquad \log_b\frac MN = \log_b M - \log_b N$$
$$\log_b M^k = k\log_b M\qquad \log_b x = \frac{\ln x}{\ln b}$$
:::

:::thm Product law of logarithms
For $b > 0$, $b \ne 1$ and $M, N > 0$: $\log_b(MN) = \log_b M + \log_b N$.
:::

:::proof
Let $m = \log_b M$ and $n = \log_b N$, so $M = b^m$ and $N = b^n$. Then $MN = b^mb^n = b^{m+n}$ by the product rule for exponents. By the definition of a logarithm, $\log_b(MN) = m + n$.
:::

:::thm Change of base
For valid bases $b$ and $k$ and $x > 0$: $\log_b x = \dfrac{\log_k x}{\log_k b}$.
:::

:::proof
Let $y = \log_b x$, so $b^y = x$. Take $\log_k$ of both sides: $\log_k b^y = \log_k x$, and the power law gives $y\log_k b = \log_k x$. Divide by $\log_k b$ (non-zero since $b \ne 1$).
:::

:::steps Evaluate $\log_2 48 - \log_2 3$
1. Quotient law: $\log_2\frac{48}{3} = \log_2 16$.
2. $2^4 = 16$, so the answer is $4$.
:::

:::steps Solve $2^{x+1} = 40$, to 3 decimal places
1. Take natural logs: $(x + 1)\ln 2 = \ln 40$.
2. Divide: $x + 1 = \frac{\ln 40}{\ln 2} \approx \frac{3.6889}{0.6931} \approx 5.3219$.
3. Subtract 1: $x \approx 4.322$.
4. Check: $2^{5.322} \approx 40$.
:::

:::steps Solve $\log_3(x) + \log_3(x - 8) = 2$
1. Product law: $\log_3(x(x - 8)) = 2$.
2. Rewrite as an exponent: $x(x - 8) = 3^2 = 9$.
3. Rearrange: $x^2 - 8x - 9 = 0$, so $(x - 9)(x + 1) = 0$.
4. $x = -1$ would make $\log_3 x$ undefined, so reject it. The answer is $x = 9$.
:::

:::mock Exam question
An investment grows by 6% per year, so its value is $P(1.06)^t$. How many whole years until it first doubles?
:::solution
Solve $(1.06)^t = 2$: $t = \frac{\ln 2}{\ln 1.06} \approx \frac{0.6931}{0.05827} \approx 11.9$. So it first doubles during year 12; after 12 whole years $(1.06)^{12} \approx 2.012$. (The rule of 72 estimates $72/6 = 12$.)
:::
:::

:::real
- **Earthquakes:** each step of 1 on the Richter scale is 10 times the wave amplitude, so magnitude 7 is $10^2 = 100$ times magnitude 5.
- **Acidity:** pH $= -\log_{10}[\text{H}^+]$; lemon juice at pH 2 has 100,000 times more hydrogen ions than water at pH 7.
- **Music:** each octave doubles the frequency, so pitch is $\log_2$ of frequency.
:::

:::cs
Binary search on $n$ sorted items needs about $\log_2 n$ steps: 1,000,000 items take only about 20. A number $n$ needs $\lfloor\log_2 n\rfloor + 1$ bits. Balanced trees have height $O(\log n)$, and merge sort runs in $O(n\log n)$.
:::

:::ml
Cross-entropy loss is $-\sum y\log\hat y$, and logistic regression maximises the log-likelihood, turning a product of probabilities into a sum that is easy to differentiate. Logs also prevent underflow: multiplying 1000 probabilities of 0.01 gives $10^{-2000}$, but adding their logs gives a manageable $-2000\log 10$.
:::

:::quiz
? Evaluate $\log_3 81$.
= 4
> $3^4 = 81$.

? Evaluate $\log_{10} 0.001$.
= -3
> $10^{-3} = 0.001$.

? Which equals $\log_b(MN)$?
- $\log_b M\cdot\log_b N$
+ $\log_b M + \log_b N$
- $\log_b(M + N)$
> Products inside become sums outside.

? Evaluate $\log_2 5 + \log_2 \frac{8}{5}$.
= 3
> $\log_2(5\cdot\frac85) = \log_2 8 = 3$.

? Solve $4^x = 8$.
= 3/2|1.5
> $2^{2x} = 2^3$, so $2x = 3$.

? Evaluate $\log_{9} 3$.
= 1/2|0.5
> $9^{1/2} = 3$.
:::

## Lesson: The number e and exponential growth {#e-and-growth}
@summary: Exponential growth and decay, compound interest, how the number e arises from continuous compounding, the natural log, half-life and doubling time.

### Growth that feeds on itself
Some things grow by adding the same amount each step: a savings jar that gets 10 dollars every week goes 10, 20, 30, 40. That is **linear** growth. Other things grow by multiplying by the same factor each step: a population that grows 10% a year goes 100, 110, 121, 133.1. The increase itself keeps getting bigger, because each year's growth is calculated on a larger amount. That is **exponential** growth, and it describes money earning interest, viruses spreading, bacteria dividing and computing power doubling. Its mirror image, **exponential decay**, describes radioactive atoms, cooling coffee and medicine leaving the bloodstream.

This article builds exponential models from scratch, shows how compound interest leads naturally to a special number called $e \approx 2.71828$, and explains why $e$ and the natural logarithm are the standard tools for describing continuous change.

### The exponential model
If a quantity starts at $a$ and is multiplied by a factor $b$ each time step, then after $t$ steps it is
$$y = a\cdot b^t$$
The starting value is $a$ (at $t = 0$, $b^0 = 1$). If $b > 1$ the quantity grows; if $0 < b < 1$ it decays. A growth rate of $r$ per step gives $b = 1 + r$, so 10% growth means $b = 1.1$, and 20% decay means $b = 0.8$. For example, a 500-dollar phone losing 20% of its value each year is worth $500(0.8)^3 = 256$ dollars after 3 years.

:::def Exponential function
A function of the form $f(t) = a\cdot b^t$ with $a \ne 0$, $b > 0$ and $b \ne 1$. The variable is in the exponent.
:::

### Compound interest
Banks add interest on top of interest. If you invest $P$ at an annual rate $r$, compounded once a year, after $t$ years you have $P(1 + r)^t$. Many accounts compound more often. If interest is added $n$ times a year, each period earns rate $\frac rn$ and there are $nt$ periods:
$$A = P\left(1 + \frac rn\right)^{nt}$$
For 1000 dollars at 6% for 10 years: yearly compounding gives $1000(1.06)^{10} \approx 1790.85$; monthly gives $1000(1.005)^{120} \approx 1819.40$. More frequent compounding earns a little more, because interest starts earning interest sooner.

### Where e comes from
Here is a famous thought experiment. Invest 1 dollar at an impossible 100% interest for one year. Compounded once: $(1 + 1)^1 = 2$. Twice: $(1 + \frac12)^2 = 2.25$. Monthly: $(1 + \frac1{12})^{12} \approx 2.613$. Daily: $(1 + \frac1{365})^{365} \approx 2.7146$. Every second: about $2.71828$. The amount keeps growing, but more and more slowly, and it never passes a certain limit. That limit is the number $e$:
$$e = \lim_{n\to\infty}\left(1 + \frac1n\right)^n \approx 2.718281828$$
Like $\pi$, $e$ is irrational: its decimals never repeat. It is the growth factor you get after one unit of time when growth is happening **continuously** at a 100% rate.

:::def Euler's number e
The constant $e = \lim_{n\to\infty}(1 + \frac1n)^n \approx 2.71828$, the base of natural exponential growth.
:::

@fig sequence | Linear sequences add the same amount each step; geometric (exponential) ones multiply by the same factor, and soon leave linear growth far behind.

### Continuous growth
With rate $r$ instead of 100%, the same limit gives $\left(1 + \frac rn\right)^n \to e^r$. So compounding continuously for $t$ years gives
$$A = Pe^{rt}$$
For 1000 dollars at 6% for 10 years, $1000e^{0.6} \approx 1822.12$, only a little more than monthly compounding. The same formula models any quantity whose rate of growth is proportional to its size: populations, bacteria, and (with negative $r$) decay. The special property of $e^x$, studied in calculus, is that its rate of change equals its own value. That is why $e$ appears naturally rather than any other base.

### The natural logarithm
The logarithm with base $e$ is the **natural log**, $\ln x$. It undoes $e^x$: $\ln(e^x) = x$ and $e^{\ln x} = x$. To find how long continuous growth takes, take $\ln$ of both sides. When does $Pe^{rt}$ double? Solve $e^{rt} = 2$: $rt = \ln2$, so $t = \frac{\ln 2}{r} \approx \frac{0.693}{r}$. At 7% this is about 9.9 years. That's the origin of the **rule of 70** (or 72): doubling time is roughly 70 divided by the percentage rate.

### Exponential decay and half-life
For decay we write $N(t) = N_0e^{-kt}$ with $k > 0$, or $N(t) = N_0\left(\frac12\right)^{t/h}$ where $h$ is the **half-life**, the time for half the substance to disappear. Carbon-14 has a half-life of about 5730 years: after 5730 years half remains, after 11,460 years a quarter, after 17,190 an eighth. The two forms match when $h = \frac{\ln 2}{k}$.

:::def Half-life
The time it takes for a decaying quantity to fall to half its value. It is the same no matter how much you start with.
:::

### Linear versus exponential
Exponential growth always beats linear growth eventually, however small the rate. A town gaining 1000 people a year and one growing 3% a year might look similar for a while, but the exponential town wins by an enormous margin over a century. Our intuition is linear, which is why the speed of epidemics and the power of compound interest so often surprise people.

### Spotting exponential data
How can you tell from a table whether something is growing exponentially? Look at ratios instead of differences. For the values 3, 6, 12, 24 the differences are 3, 6, 12, which keep changing, but each value divided by the one before is 2, every time. A constant ratio means an exponential model, while a constant difference means a linear one. Real data is never perfect, so in practice people take the logarithm of the values: if $y = ab^t$, then $\ln y = \ln a + t\ln b$, which is a straight line in $t$. A straight line on a log scale is the signature of exponential growth, and its slope is the continuous growth rate.

### Common mistakes
Don't confuse $2t$ with $2^t$: after 10 steps, $2t = 20$ but $2^{10} = 1024$. A rate of 5% means $b = 1.05$, not $b = 5$ or $b = 0.05$. Decay of 30% means multiplying by $0.7$, not $0.3$. And losing 50% then gaining 50% does not return you to the start: $100\times0.5\times1.5 = 75$.

### Summary
Exponential models $y = ab^t$ multiply by the same factor each step. Compounding more often pushes $(1 + \frac1n)^n$ up towards $e \approx 2.718$, giving continuous growth $Pe^{rt}$. The natural log undoes $e^x$ and gives doubling time $\frac{\ln2}{r}$ and half-life $\frac{\ln2}{k}$.

@viz func kind=exp a=1 b=2 | Change a and b. Bases above 1 grow, bases between 0 and 1 decay. Every curve crosses the y-axis at a.

:::explore
**What to try**
1. With $a = 1$, $b = 2$, read off $y$ at $x = 1, 2, 3$: $2, 4, 8$. Each step multiplies by 2.
2. Set $b = 2.7$, close to $e$. This is approximately $y = e^x$, the continuous-growth curve from the article.
3. Set $b = 0.5$. The curve now halves each step: that is half-life decay with $h = 1$.
4. Change $a$ to 3. The curve starts at 3 on the y-axis but keeps the same multiplying factor, like starting with a bigger investment.

**What to notice:** an exponential curve looks flat at first and then shoots up. Equal steps right always multiply $y$ by $b$, which is why exponential growth outruns any straight line.
:::

@viz sequence | Compare arithmetic (linear) and geometric (exponential) sequences side by side.

:::explore
**What to try**
1. View the arithmetic sequence: each term adds the same difference.
2. Switch to the geometric sequence: each term multiplies by the same ratio.
3. Compare the heights after several terms.

**What to notice:** at first the two may be close, but multiplying soon dominates adding. This is the linear-versus-exponential point from the article.
:::

:::formulas
$$y = a\cdot b^t\qquad b = 1 + r$$
$$A = P\left(1 + \frac rn\right)^{nt}\qquad A = Pe^{rt}$$
$$e = \lim_{n\to\infty}\left(1 + \frac1n\right)^n \approx 2.71828$$
$$N = N_0e^{-kt} = N_0\left(\tfrac12\right)^{t/h},\quad h = \frac{\ln2}{k}$$
$$\text{doubling time} = \frac{\ln 2}{r}$$
:::

:::thm Constant doubling time
If $y = ae^{rt}$ with $r > 0$, then $y$ doubles every $\frac{\ln2}{r}$ time units, whatever the starting time.
:::

:::proof
At time $t + T$ with $T = \frac{\ln2}{r}$: $ae^{r(t + T)} = ae^{rt}e^{rT} = ae^{rt}e^{\ln2} = 2ae^{rt}$.
:::

:::steps A town of 20,000 grows 3% per year. Find its population after 5 years
1. Factor: $b = 1.03$.
2. $P = 20000(1.03)^5$.
3. $(1.03)^5 \approx 1.15927$.
4. Population $\approx 23{,}185$.
:::

:::steps A drug has a half-life of 4 hours. What fraction remains after 12 hours?
1. Number of half-lives: $\frac{12}{4} = 3$.
2. Fraction remaining: $\left(\frac12\right)^3 = \frac18$.
3. So 12.5% remains.
:::

:::steps How long does it take money to triple at 5% compounded continuously?
1. Solve $e^{0.05t} = 3$.
2. Take $\ln$: $0.05t = \ln 3 \approx 1.0986$.
3. $t \approx 21.97$ years.
:::

:::mock Exam question
A culture has 500 bacteria and 2000 after 3 hours, growing as $N = 500e^{kt}$. Find $k$ and the population after 5 hours.
:::solution
$2000 = 500e^{3k}$ gives $e^{3k} = 4$, so $k = \frac{\ln4}{3} \approx 0.4621$ per hour. Then $N(5) = 500e^{5k} = 500\cdot4^{5/3} \approx 500\times10.079 \approx 5040$ bacteria.
:::
:::

:::real
- **Savings:** 1000 dollars at 5% compounded yearly for 30 years becomes $1000(1.05)^{30} \approx 4322$ dollars.
- **Archaeology:** a bone with 25% of its original carbon-14 is about two half-lives, roughly 11,460 years, old.
- **Epidemics:** if each infected person infects 2 others per week, cases multiply by 3 each week, so 10 cases become $10\cdot3^4 = 810$ in four weeks.
:::

:::ml
Exponential decay schedules shrink the learning rate as $\eta_t = \eta_0e^{-kt}$. The sigmoid $\frac1{1 + e^{-z}}$ and softmax $\frac{e^{z_i}}{\sum_j e^{z_j}}$ are built on $e^x$, and exponential moving averages (as in momentum and Adam) weight older gradients by decaying powers like $0.9^k$.
:::

:::cs
Algorithms with running time $2^n$ grow exponentially and become infeasible quickly: $2^{60}$ steps would take decades even at a billion per second. Exponential backoff in networking doubles the wait after each failed retry, a deliberate use of exponential growth.
:::

:::quiz
? A quantity grows 8% per step. What is the factor $b$?
= 1.08
> $b = 1 + 0.08$.

? Which is closest to $e$?
- 2.5
+ 2.718
- 3.14
> $e \approx 2.71828$.

? A car loses 15% of its value each year. What is the yearly factor?
= 0.85
> Keep $1 - 0.15$ of the value each year.

? A substance has a half-life of 10 years. What fraction remains after 30 years?
= 1/8|0.125
> Three half-lives: $(\frac12)^3$.

? Evaluate $\ln(e^5)$.
= 5
> $\ln$ undoes $e^x$.

? Which grows faster in the long run?
- $100t$
+ $1.01^t$
> Any exponential with base above 1 eventually beats any linear function.
:::

# Unit: Equations and inequalities

## Lesson: Variables, expressions and equations {#expressions}
@summary: What a variable is, the parts of an expression, evaluating by substitution, combining like terms, expanding brackets, and the difference between an expression, an equation and an identity.

### From words to symbols
Suppose a taxi charges 3 dollars to start and 2 dollars per kilometre. A 5 km ride costs $3 + 2\times5 = 13$ dollars, a 12 km ride costs $3 + 2\times12 = 27$ dollars. Instead of writing a new calculation for every trip, we can describe every trip at once: if the ride is $x$ kilometres, the cost is $2x + 3$ dollars. That short phrase is an **algebraic expression**, and the letter $x$ is a **variable**. Algebra is the language that lets us state a rule once and use it for any number.

This article explains what variables and expressions are, the vocabulary used to describe their parts, how to evaluate and simplify them, and how an expression differs from an equation. These skills are the grammar for everything that follows, from solving equations to writing machine learning models.

### Variables
A **variable** is a symbol, usually a letter, that stands for a number we don't know yet or a number that can change. In $2x + 3$, $x$ can be 5 or 12 or 0.4. In a formula like the area of a rectangle, $A = lw$, there are three variables: length, width and area. Letters are chosen for convenience: $t$ often means time, $r$ a rate, $n$ a count. A letter that stands for a fixed value, such as $\pi$, is a **constant**.

:::def Variable
A symbol that stands for a number that is unknown or can vary.
:::

### The parts of an expression
An **expression** is a combination of numbers, variables and operations, with no equals sign. Take $4x^2 - 7x + 5$. It is made of **terms**, the pieces separated by plus or minus signs: $4x^2$, $-7x$ and $5$. Notice that the minus sign belongs to the term after it. The number in front of a variable is its **coefficient**: 4 is the coefficient of $x^2$ and $-7$ the coefficient of $x$. A term with no variable, like 5, is the **constant term**. When there is no visible coefficient, it is 1: in $x^2 + x$ both coefficients are 1, and in $-y$ the coefficient is $-1$.

:::def Term
A single piece of an expression: a number, a variable, or a product of them. Terms are separated by $+$ and $-$.
:::

:::def Coefficient
The numerical factor multiplying the variable part of a term, such as $-7$ in $-7x$.
:::

Writing conventions matter. $3x$ means $3\times x$; we drop the multiplication sign. $xy$ means $x\times y$. A fraction bar groups like brackets: $\frac{x + 1}{2}$ means $(x + 1)\div2$. Numbers are written before letters, so we write $5a$, not $a5$.

### Evaluating by substitution
To **evaluate** an expression, replace each variable with its value and calculate using the order of operations. For $4x^2 - 7x + 5$ at $x = 2$: $4(2)^2 - 7(2) + 5 = 16 - 14 + 5 = 7$. Always put the substituted number in brackets, especially if it is negative. At $x = -1$: $4(-1)^2 - 7(-1) + 5 = 4 + 7 + 5 = 16$. Without brackets you might compute $-1^2 = -1$ and get the wrong answer.

With several variables, substitute each one. If $a = 3$ and $b = -2$, then $a^2 - 2ab + b^2 = 9 - 2(3)(-2) + 4 = 9 + 12 + 4 = 25$.

### Combining like terms
**Like terms** have exactly the same variable part, including powers. $3x$ and $5x$ are like terms, so are $2x^2$ and $-x^2$, but $3x$ and $3x^2$ are not, and neither are $xy$ and $x$. You combine like terms by adding their coefficients, which is just the distributive law in reverse: $3x + 5x = (3 + 5)x = 8x$. Think of it as counting objects: 3 apples plus 5 apples is 8 apples, but 3 apples plus 5 bananas stays as it is.

For example, $6x + 2y - 4x + 7 - y = (6 - 4)x + (2 - 1)y + 7 = 2x + y + 7$. A useful habit is to underline or colour each family of like terms before combining.

### Expanding and factoring
The distributive law $a(b + c) = ab + ac$ lets us remove brackets. $3(2x - 5) = 6x - 15$. A minus sign in front of brackets multiplies every term by $-1$: $-(x - 4) = -x + 4$. To simplify $5(x + 2) - 2(3x - 1)$, expand both: $5x + 10 - 6x + 2$, then combine: $-x + 12$. Going the other way, pulling a common factor out, is **factoring**: $6x + 9 = 3(2x + 3)$.

@fig g01-area-model mode=numbers a=3 b=4 c=2 | Expanding a(b + c): the whole rectangle equals the sum of its two parts.

### Expressions, equations and identities
An **expression** like $2x + 3$ has a value but makes no claim. An **equation** like $2x + 3 = 13$ claims two expressions are equal, and is true only for certain values of $x$ (here $x = 5$). Finding those values is solving the equation. An **identity** like $2(x + 3) = 2x + 6$ is true for **every** value of $x$; it says two expressions are the same expression written differently. A quick test is to substitute two or three values: if both sides always agree, it may be an identity; one failure proves it isn't.

:::def Equation
A statement that two expressions are equal. Its solutions are the values of the variables that make it true.
:::

### Translating words into algebra
Many problems start in words. "Five more than twice a number" is $2n + 5$. "Three less than a number" is $n - 3$ (not $3 - n$). "The product of a number and 4, divided by 7" is $\frac{4n}{7}$. "The sum of two consecutive integers" is $n + (n + 1) = 2n + 1$. Read slowly, identify the unknown, and choose a letter for it before writing anything.

### Common mistakes
Adding unlike terms is the most common slip: $2x + 3$ is not $5x$. Another is forgetting to distribute to every term: $2(x + 3) = 2x + 6$, not $2x + 3$. Signs after a minus are another trap: $5 - (x - 2) = 5 - x + 2 = 7 - x$. Finally, $x^2$ and $2x$ are different: at $x = 5$ they are 25 and 10.

### Summary
A variable stands for a number, and an expression combines numbers and variables with operations. Expressions are made of terms with coefficients. Evaluate by substituting in brackets, simplify by expanding with the distributive law and combining like terms, and remember that an equation is a claim that may be true for some values, while an identity is true for all.

@viz func kind=linear m=2 b=3 | The expression 2x + 3 drawn for every x at once. Change m and b to change the expression.

:::explore
**What to try**
1. Keep $m = 2$, $b = 3$, the taxi expression $2x + 3$. Read $y$ at $x = 5$: it is 13, the cost of a 5 km ride.
2. Read $y$ at $x = 0$: it is 3, the constant term (the starting fee).
3. Change $m$ to 3. Each extra kilometre now adds 3, so the coefficient of $x$ controls the rate.
4. Set $m = 0$. The expression becomes just the constant $b$: the variable term has vanished.

**What to notice:** an expression gives one output for every input. Substituting a value is the same as reading one point off this graph, and the coefficient and constant term each have a visible meaning.
:::

@viz g01-area-model mode=numbers a=4 b=5 c=3 | Change a, b and c to see a(b + c) = ab + ac as areas.

:::explore
**What to try**
1. With $a = 4$, $b = 5$, $c = 3$ check that $4\cdot8 = 32 = 20 + 12$.
2. Change $c$ to 1 and watch only the right block shrink.
3. Think of $b$ as $x$: the picture shows $4(x + 3) = 4x + 12$, the expanding step from the article.

**What to notice:** expanding brackets never changes the value; it just splits one product into a sum of smaller products.
:::

:::formulas
$$a(b + c) = ab + ac\qquad -(b - c) = -b + c$$
$$px + qx = (p + q)x\quad\text{(combining like terms)}$$
$$\text{expression: no } = \qquad \text{equation: } A = B$$
:::

:::thm Combining like terms
For any numbers $p$, $q$ and any $x$: $px + qx = (p + q)x$.
:::

:::proof
This is the distributive law $x(p + q) = xp + xq$ read from right to left, together with commutativity of multiplication.
:::

:::steps Simplify $3(2a - 4) - 2(a + 5) + 7a$
1. Expand: $6a - 12 - 2a - 10 + 7a$.
2. Group like terms: $(6a - 2a + 7a) + (-12 - 10)$.
3. Combine: $11a - 22$.
:::

:::steps Evaluate $\dfrac{x^2 - 3y}{2x + y}$ when $x = -2$ and $y = 4$
1. Numerator: $(-2)^2 - 3(4) = 4 - 12 = -8$.
2. Denominator: $2(-2) + 4 = 0$.
3. Division by zero: the expression is undefined at these values.
:::

:::steps Write an expression for the perimeter of a rectangle whose length is 3 more than twice its width $w$, and evaluate it for $w = 4$
1. Length: $2w + 3$.
2. Perimeter: $2(2w + 3) + 2w = 4w + 6 + 2w = 6w + 6$.
3. At $w = 4$: $6(4) + 6 = 30$.
:::

:::mock Exam question
Show that $(n + 1)^2 - n^2$ is always odd for whole numbers $n$.
:::solution
Expand: $(n + 1)^2 = (n + 1)(n + 1) = n^2 + 2n + 1$. Subtract $n^2$ to get $2n + 1$. Since $2n$ is even, $2n + 1$ is odd for every whole number $n$. For example $n = 3$: $16 - 9 = 7$.
:::
:::

:::real
- **Phone plans:** a plan costing 15 dollars plus 0.10 per text is $15 + 0.1t$; 200 texts cost 35 dollars.
- **Temperature:** Fahrenheit is $\frac95C + 32$; at $C = 25$ that is $77$ degrees F.
- **Shopping:** buying $a$ apples at 0.5 and $b$ bananas at 0.3 costs $0.5a + 0.3b$; they are unlike terms and stay separate.
:::

:::cs
Variables in code work like algebraic variables: `cost = 2 * x + 3` evaluates the expression for the current `x`. Compilers simplify expressions using the same algebra (constant folding, combining like terms), and a parser turns text like `2*x+3` into a tree of terms and operations.
:::

:::ml
A linear model is an expression: $\hat y = w_1x_1 + w_2x_2 + b$. The weights $w_i$ are coefficients and $b$ is the constant term (the bias). Training means choosing coefficient values; prediction means substituting a data point.
:::

:::quiz
? What is the coefficient of $x$ in $5 - 4x + x^2$?
= -4
> The term is $-4x$; the sign belongs to it.

? Simplify $7y - 3 + 2y + 8$.
- $14y$
+ $9y + 5$
- $9y + 11$
> $7y + 2y = 9y$ and $-3 + 8 = 5$.

? Evaluate $3x^2 - x$ at $x = -2$.
= 14
> $3(4) - (-2) = 12 + 2 = 14$.

? Expand $-2(3 - x)$.
- $-6 - 2x$
+ $-6 + 2x$
- $6 - 2x$
> $-2\cdot3 = -6$ and $-2\cdot(-x) = 2x$.

? Which is an identity?
- $2x + 1 = 7$
+ $3(x + 2) = 3x + 6$
- $x^2 = 2x$
> It holds for every $x$.

? Evaluate $2a - b$ when $a = 3$, $b = -5$.
= 11
> $6 - (-5) = 11$.
:::

## Lesson: Solving linear equations {#linear-equations}
@summary: The balance method for one-variable linear equations, variables on both sides, brackets and fractions, equations with no or infinitely many solutions, and rearranging formulas.

### A puzzle with a missing number
"I'm thinking of a number. I triple it and subtract 4, and I get 11. What's my number?" You might work backwards: undo the subtraction ($11 + 4 = 15$), then undo the tripling ($15 \div 3 = 5$). The number is 5. Written in algebra, the puzzle is the **equation** $3x - 4 = 11$, and working backwards is exactly how we solve it. This lesson turns that instinct into a reliable method that works even when the unknown appears on both sides, inside brackets or in fractions.

Linear equations are everywhere: finding the break-even point of a business, converting temperatures, working out how long a journey takes, and calibrating a sensor. They are also the building block for systems of equations and, eventually, for the linear algebra at the heart of machine learning.

### What makes an equation linear
A **linear equation** in one variable can be written as $ax + b = 0$ with $a \ne 0$. The variable appears only to the first power: no $x^2$, no $\sqrt x$, no $\frac1x$. Examples are $3x - 4 = 11$, $5(x + 2) = 2x - 7$ and $\frac{x}{4} + 1 = 3$. A **solution** is a value of $x$ that makes both sides equal. You can always check a proposed solution by substituting it: $3(5) - 4 = 11$ confirms $x = 5$.

:::def Linear equation
An equation that can be written as $ax + b = 0$ with $a \ne 0$; the variable appears only to the first power.
:::

### The balance idea
Think of an equation as a balanced scale. Whatever is on the left weighs the same as what is on the right. If you add 4 to one pan, you must add 4 to the other to keep it balanced. The same goes for subtracting, multiplying or dividing (by anything except zero). These **equivalent operations** produce a new equation with exactly the same solutions. Our goal is to apply them until $x$ stands alone on one side.

For $3x - 4 = 11$: add 4 to both sides to get $3x = 15$. Divide both sides by 3 to get $x = 5$. We undo operations in the reverse order to how they were applied to $x$: the multiplication by 3 happened first and the subtraction second, so we undo the subtraction first.

### Variables on both sides
When $x$ appears on both sides, first collect the $x$ terms on one side and the numbers on the other. Solve $5x - 7 = 2x + 8$. Subtract $2x$ from both sides: $3x - 7 = 8$. Add 7: $3x = 15$. Divide by 3: $x = 5$. Check: left side $25 - 7 = 18$, right side $10 + 8 = 18$. It's often easiest to move the smaller $x$ term so that the coefficient stays positive.

### Brackets
Expand brackets first, then proceed. Solve $4(x - 3) = 2(x + 5)$. Expand: $4x - 12 = 2x + 10$. Subtract $2x$: $2x - 12 = 10$. Add 12: $2x = 22$. Divide: $x = 11$. Check: $4(8) = 32$ and $2(16) = 32$.

### Fractions
Fractions are easier to remove than to work with. Multiply **every term** on both sides by the least common denominator. Solve $\frac{x}{3} + \frac{x}{4} = 7$. The LCD is 12. Multiply each term by 12: $4x + 3x = 84$, so $7x = 84$ and $x = 12$. Check: $4 + 3 = 7$. With binomial numerators, use brackets: $\frac{x + 1}{2} = \frac{x - 2}{5}$ becomes $5(x + 1) = 2(x - 2)$, so $5x + 5 = 2x - 4$, $3x = -9$, $x = -3$.

@fig system2 | Solving an equation with x on both sides is finding where two lines cross.

### No solution, or every number
Sometimes the variable disappears. Solve $2(x + 3) = 2x + 1$. Expanding gives $2x + 6 = 2x + 1$; subtracting $2x$ leaves $6 = 1$, which is false. No value of $x$ can work: the equation has **no solution**. In contrast, $3(x + 2) = 3x + 6$ reduces to $6 = 6$, which is always true: **every** real number is a solution, because the equation is an identity. A genuine linear equation with $a \ne 0$ always has exactly one solution, $x = -\frac ba$.

### Rearranging formulas
The same steps let you rearrange a formula for a different variable. The Celsius-to-Fahrenheit formula $F = \frac95C + 32$ can be solved for $C$: subtract 32 to get $F - 32 = \frac95C$, then multiply both sides by $\frac59$: $C = \frac59(F - 32)$. So $F = 98.6$ gives $C = \frac59(66.6) = 37$. Treat the other letters as if they were known numbers and isolate the one you want.

### A strategy that always works
1. Clear fractions by multiplying by the LCD. 2. Expand brackets. 3. Combine like terms on each side. 4. Move variable terms to one side and numbers to the other. 5. Divide by the coefficient. 6. Check by substitution. Numbering the steps like this is helpful on exams because it stops you skipping a stage.

### Why checking matters
Checking a solution takes only a few seconds, and it is the one step that tells you for certain whether your work is right. Substitute your answer into the **original** equation, not a later line, because an error made early on would carry through every step after it. Evaluate the left side and the right side separately and compare the two numbers. If they match, you are done. If they don't, look back for the first line where a substitution of your answer fails; the mistake is in the step just before it. This habit turns solving equations from guesswork into a process you can trust, and in word problems it also confirms that the answer makes sense in context, such as a positive number of months or a sensible price.

### Common mistakes
The classic error is doing something to only one side or only one term. When clearing fractions, multiply every term, including whole numbers: $\frac x2 + 3 = 5$ times 2 is $x + 6 = 10$, not $x + 3 = 10$. A sign slip when moving a term is also common: moving $-7$ to the other side makes it $+7$, because you are really adding 7 to both sides. And dividing by a variable can lose solutions, so only divide by numbers.

### Summary
A linear equation keeps its solutions when you do the same thing to both sides. Clear fractions, expand, collect $x$ terms on one side, and divide by the coefficient. Check every answer by substitution. If the variable cancels, the equation has no solution or infinitely many. The same balance steps rearrange any formula.

@viz system2 | Each side of an equation drawn as a line. Where they cross, the two sides are equal.

:::explore
**What to try**
1. Set the first line to $3x - y = 4$ ($a_1 = 3$, $b_1 = -1$, $c_1 = 4$). That is $y = 3x - 4$, the left side of $3x - 4 = x + 2$.
2. Set the second line to $x - y = -2$ ($a_2 = 1$, $b_2 = -1$, $c_2 = -2$). That is $y = x + 2$, the right side.
3. Read the crossing point: $(3, 5)$. So $x = 3$ solves $3x - 4 = x + 2$, and both sides equal 5 there. Check by algebra: $2x = 6$.
4. Make the lines parallel by setting $a_2 = 3$ and $c_2 = -2$. They never meet: the equation $3x - 4 = 3x + 2$ has no solution.

**What to notice:** solving an equation algebraically and finding a crossing point graphically are the same thing. Parallel lines match the "no solution" case and identical lines match the "every number" case from the article.
:::

:::formulas
$$ax + b = c \implies x = \frac{c - b}{a}\quad(a \ne 0)$$
$$ax + b = cx + d \implies x = \frac{d - b}{a - c}\quad(a \ne c)$$
$$\text{If } A = B \text{ then } A + k = B + k,\ kA = kB$$
:::

:::thm Uniqueness of the solution
If $a \ne 0$, the equation $ax + b = 0$ has exactly one solution, $x = -\frac ba$.
:::

:::proof
Subtracting $b$ and dividing by $a$ are reversible steps, so $ax + b = 0$ is equivalent to $x = -\frac ba$. Every solution must equal $-\frac ba$, and that value does satisfy the equation: $a(-\frac ba) + b = 0$.
:::

:::steps Solve $7 - 2(x - 4) = 3x$
1. Expand: $7 - 2x + 8 = 3x$.
2. Combine: $15 - 2x = 3x$.
3. Add $2x$: $15 = 5x$.
4. Divide: $x = 3$. Check: $7 - 2(-1) = 9 = 3(3)$.
:::

:::steps Solve $\dfrac{2x - 1}{3} - \dfrac{x}{2} = 1$
1. LCD 6. Multiply every term: $2(2x - 1) - 3x = 6$.
2. Expand: $4x - 2 - 3x = 6$.
3. Combine: $x - 2 = 6$, so $x = 8$.
4. Check: $\frac{15}{3} - 4 = 1$.
:::

:::steps Solve $v = u + at$ for $t$
1. Subtract $u$: $v - u = at$.
2. Divide by $a$: $t = \dfrac{v - u}{a}$ (for $a \ne 0$).
:::

:::mock Exam question
A gym charges a 40-dollar joining fee plus 25 dollars a month. A rival charges no fee but 32 dollars a month. After how many months do they cost the same?
:::solution
Let $m$ be the number of months. Set $40 + 25m = 32m$. Subtract $25m$: $40 = 7m$, so $m = \frac{40}{7} \approx 5.7$. They cost the same between months 5 and 6; from month 6 on, the first gym is cheaper ($40 + 150 = 190 < 192$).
:::
:::

:::real
- **Taxi fares:** with fare $3 + 2x$, a 25-dollar budget allows $3 + 2x = 25$, so $x = 11$ km.
- **Break-even:** a stall with 120 dollars of fixed costs selling drinks at 4 dollars that cost 1.50 each breaks even when $2.5n = 120$, that is $n = 48$ drinks.
- **Cooking:** converting an oven setting of 356 F gives $C = \frac59(324) = 180$ degrees C.
:::

:::cs
Solving $ax + b = c$ is one line of code, `x = (c - b) / a`, but robust code must handle $a = 0$ (no solution or infinitely many). Linear equations also appear when computing the index of an element in an evenly spaced array, or the time when a moving object reaches a position.
:::

:::ml
Setting a derivative equal to zero often gives a linear equation. For the one-parameter loss $(w - 3)^2$, the derivative $2(w - 3) = 0$ gives $w = 3$. In linear regression the "normal equations" are a system of linear equations whose solution is the best-fit set of weights.
:::

:::quiz
? Solve $4x + 9 = 1$.
= -2
> $4x = -8$, so $x = -2$.

? Solve $6x - 5 = 2x + 15$.
= 5
> $4x = 20$.

? Solve $3(x + 2) = 18$.
= 4
> $3x + 6 = 18$, $3x = 12$.

? Solve $\frac{x}{5} - 1 = 3$.
= 20
> $\frac x5 = 4$.

? How many solutions does $2(x + 1) = 2x + 3$ have?
+ None
- One
- Infinitely many
> It reduces to $2 = 3$, which is false.

? Solve $\frac{x}{2} + \frac{x}{3} = 10$.
= 12
> Multiply by 6: $3x + 2x = 60$.
:::

## Lesson: Lines, slope and linear functions {#lines-slope}
@summary: Slope as rate of change, slope-intercept, point-slope and standard form, intercepts, parallel and perpendicular lines, and linear functions as models.

### A constant rate of change
A water tank already holds 20 litres, and a hose adds 5 litres every minute. After 1 minute it holds 25, after 2 minutes 30, after 3 minutes 35. If you plot minutes across and litres up, the points lie perfectly on a straight line. That straightness is no accident: the amount changes by the **same amount for every equal step**. Any quantity that changes at a constant rate draws a straight line, and the steepness of that line, its **slope**, is the rate. This lesson explains how to measure slope, how to write the equation of a line in several useful forms, and how to tell when two lines are parallel or perpendicular.

Lines are the simplest functions in mathematics and the most used. Linear models predict costs, convert units, describe constant speeds, and form the core of linear regression, the first model taught in machine learning.

### Coordinates and the idea of slope
Every point in the plane has coordinates $(x, y)$: how far across, then how far up. Given two points on a line, $(x_1, y_1)$ and $(x_2, y_2)$, the **rise** is the change in $y$, $y_2 - y_1$, and the **run** is the change in $x$, $x_2 - x_1$. The slope is rise over run:
$$m = \frac{y_2 - y_1}{x_2 - x_1}$$
For the points $(1, 3)$ and $(4, 9)$: $m = \frac{9 - 3}{4 - 1} = \frac63 = 2$. For every 1 step right, the line goes up 2. It doesn't matter which point you call "first", as long as you are consistent: $\frac{3 - 9}{1 - 4} = \frac{-6}{-3} = 2$ too.

:::def Slope
The ratio $m = \dfrac{\Delta y}{\Delta x} = \dfrac{y_2 - y_1}{x_2 - x_1}$: how much $y$ changes for each unit increase in $x$.
:::

### Reading the sign of the slope
A **positive** slope rises from left to right, like the tank filling. A **negative** slope falls: a phone battery losing 8% per hour has slope $-8$. A slope of **zero** gives a horizontal line, $y = c$, where nothing changes. A **vertical** line, $x = c$, has zero run, so the slope would require dividing by zero: it is **undefined**. The bigger $|m|$ is, the steeper the line. A slope of $\frac12$ is gentle, a slope of 5 is steep.

Slope always carries units: litres per minute, dollars per item, kilometres per hour. That makes it a **rate of change**, an idea that becomes the derivative in calculus.

### Slope-intercept form
The most common equation of a line is
$$y = mx + b$$
where $m$ is the slope and $b$ is the **y-intercept**, the value of $y$ when $x = 0$ (where the line crosses the y-axis). The tank is $y = 5x + 20$. To graph $y = -\frac23x + 4$, plot $(0, 4)$, then from there go 3 right and 2 down to $(3, 2)$, and join the points. To find the **x-intercept**, where the line crosses the x-axis, set $y = 0$: $0 = -\frac23x + 4$ gives $x = 6$.

:::def Intercept
The y-intercept is where a graph crosses the y-axis ($x = 0$); an x-intercept is where it crosses the x-axis ($y = 0$).
:::

### Point-slope form
If you know the slope $m$ and one point $(x_1, y_1)$, write
$$y - y_1 = m(x - x_1)$$
This is just the slope formula rearranged: any other point $(x, y)$ on the line satisfies $\frac{y - y_1}{x - x_1} = m$. For a line through $(2, -1)$ with slope 3: $y + 1 = 3(x - 2)$, which simplifies to $y = 3x - 7$. To find the line through two points, compute the slope first, then use either point.

### Standard form
Lines are also written as $Ax + By = C$, such as $2x + 3y = 12$. This form handles vertical lines ($x = 5$ is $1x + 0y = 5$) and makes intercepts quick: set $y = 0$ to get $x = 6$, set $x = 0$ to get $y = 4$. Solving for $y$ gives the slope: $y = -\frac23x + 4$, so $m = -\frac AB$.

@fig func kind=linear m=0.5 b=1 | y = 0.5x + 1: the line crosses the y-axis at 1 and rises 1 for every 2 steps right.

### Parallel and perpendicular lines
**Parallel** lines never meet, so they must have the same steepness: equal slopes, different intercepts. $y = 2x + 1$ and $y = 2x - 5$ are parallel. **Perpendicular** lines meet at a right angle, and their slopes are negative reciprocals: $m_1m_2 = -1$. A line with slope 2 is perpendicular to one with slope $-\frac12$. Picture rotating a staircase step of "1 across, 2 up" by 90 degrees: it becomes "2 across, 1 down", slope $-\frac12$. (A horizontal and a vertical line are also perpendicular, the one case the product rule can't express.)

### Linear functions as models
A **linear function** is $f(x) = mx + b$. In a model, $b$ is the starting value and $m$ the rate. A plumber who charges a 60-dollar call-out fee plus 45 dollars per hour has cost $C(h) = 45h + 60$. Two hours cost $150$. If you are told two data points instead, such as 3 hours costing 195 and 5 hours costing 285, the slope is $\frac{285 - 195}{5 - 3} = 45$ per hour, and substituting gives $b = 195 - 135 = 60$.

### Choosing the right form
Each form of a line is best for a different job, so it pays to recognise which one a problem is asking for. If you are given a starting value and a rate, such as a fee plus a price per hour, slope-intercept form is natural, because $b$ and $m$ are exactly those two numbers. If you are given a point and a direction, point-slope form saves a step. If you need intercepts quickly, or the line might be vertical, standard form is the tidiest. All three describe the same set of points, and you can always convert between them with the equation-solving steps from the previous lesson.

### Common mistakes
Mixing up the order in the slope formula, such as $\frac{y_2 - y_1}{x_1 - x_2}$, flips the sign. Confusing $x$ and $y$ (computing run over rise) gives the reciprocal. In $y = 3 - 2x$ the slope is $-2$, not 3: the slope is the coefficient of $x$, wherever it sits. Finally, the slope of a vertical line is undefined, not zero.

### Summary
Slope $m = \frac{\Delta y}{\Delta x}$ measures the constant rate of change of a line. Write a line as $y = mx + b$ (slope and intercept), $y - y_1 = m(x - x_1)$ (slope and a point) or $Ax + By = C$ (standard). Parallel lines share a slope; perpendicular slopes multiply to $-1$. Linear functions model anything that changes at a steady rate.

@viz slope | Drag the two points. Vertical lines have undefined slope; horizontal lines have slope 0.

:::explore
**What to try**
1. Start with the default points $(-3, -2)$ and $(2, 2)$. Rise 4, run 5, so the slope is $\frac45 = 0.8$.
2. Drag the right point lower than the left one. The slope turns negative: the line falls from left to right.
3. Drag the points to the same height. The rise is 0, so the slope is 0: a horizontal line.
4. Drag them directly above each other. The run is 0 and the slope is undefined.

**What to notice:** the slope stays the same wherever you pick two points on the same line, which is why a line has one slope. Swapping which point is first changes both signs and leaves the ratio unchanged.
:::

@viz func kind=linear m=0.5 b=1 | m tilts the line, b slides it up and down.

:::explore
**What to try**
1. Set $m = 4$ and $b = 2$ to model a tank that starts with 2 litres and fills at 4 litres per minute. Read the y-intercept: 2, the starting amount.
2. Change $b$ without touching $m$. The line slides but keeps its steepness: you are drawing parallel lines.
3. Set $m = 2$, note the line, then set $m = -0.5$. These two slopes multiply to $-1$, so the lines would be perpendicular.
4. Find the x-intercept for $m = 0.5$, $b = 1$: the line crosses at $x = -2$, since $0 = 0.5x + 1$.

**What to notice:** $m$ and $b$ control independent features. That separation is exactly why slope-intercept form is so convenient.
:::

:::formulas
$$m = \frac{y_2 - y_1}{x_2 - x_1}$$
$$y = mx + b\qquad y - y_1 = m(x - x_1)\qquad Ax + By = C$$
$$\text{parallel: } m_1 = m_2\qquad \text{perpendicular: } m_1m_2 = -1$$
:::

:::thm Perpendicular slopes
Two non-vertical lines with slopes $m_1$ and $m_2$ are perpendicular exactly when $m_1m_2 = -1$.
:::

:::proof Sketch
Direction vectors of the lines are $(1, m_1)$ and $(1, m_2)$. Rotating $(1, m_1)$ by 90 degrees gives $(-m_1, 1)$, whose slope is $-\frac1{m_1}$. So the second line is perpendicular exactly when $m_2 = -\frac1{m_1}$, that is $m_1m_2 = -1$. (With the dot product: $1 + m_1m_2 = 0$.)
:::

:::steps Find the line through $(-2, 5)$ and $(4, -7)$
1. Slope: $m = \frac{-7 - 5}{4 - (-2)} = \frac{-12}{6} = -2$.
2. Point-slope with $(-2, 5)$: $y - 5 = -2(x + 2)$.
3. Simplify: $y = -2x + 1$.
4. Check $(4, -7)$: $-8 + 1 = -7$.
:::

:::steps Find the line perpendicular to $y = \frac13x + 2$ through $(1, 4)$
1. Perpendicular slope: $-3$.
2. $y - 4 = -3(x - 1)$.
3. $y = -3x + 7$.
:::

:::steps Find the slope and intercepts of $3x - 4y = 12$
1. $x$-intercept: $y = 0$ gives $x = 4$.
2. $y$-intercept: $x = 0$ gives $y = -3$.
3. Slope: $y = \frac34x - 3$, so $m = \frac34$.
:::

:::mock Exam question
A car rental costs 210 dollars for 3 days and 330 dollars for 5 days, and the cost is linear in days. Find the daily rate, the fixed fee, and the cost for 8 days.
:::solution
Slope: $\frac{330 - 210}{5 - 3} = 60$ dollars per day. Fixed fee: $210 = 60(3) + b$, so $b = 30$. The model is $C = 60d + 30$, and 8 days cost $60(8) + 30 = 510$ dollars.
:::
:::

:::real
- **Roads:** a road sign showing a 10% grade means a slope of $0.1$: it climbs 10 m per 100 m.
- **Ramps:** accessibility guidelines often require a maximum slope of $\frac1{12}$ for wheelchair ramps.
- **Conversion:** $F = 1.8C + 32$ is a line with slope 1.8 degrees F per degree C and intercept 32.
:::

:::ml
Linear regression fits $\hat y = wx + b$ to data: the weight $w$ is the slope and the bias $b$ is the intercept. With many inputs this becomes a plane or hyperplane $w_1x_1 + \cdots + w_nx_n + b$. A linear classifier's decision boundary is exactly such a line or plane.
:::

:::cs
Drawing a line on a pixel screen uses Bresenham's algorithm, which steps along the run and tracks accumulated rise using only integer arithmetic. Linear interpolation, `a + t * (b - a)`, is the point-slope form used in animation and graphics.
:::

:::quiz
? Find the slope through $(2, 1)$ and $(6, 9)$.
= 2
> $\frac{9 - 1}{6 - 2} = \frac84$.

? What is the slope of $y = 7 - 3x$?
= -3
> The coefficient of $x$.

? What is the y-intercept of $y = 4x - 5$?
= -5
> The value at $x = 0$.

? What slope is perpendicular to slope $\frac25$?
= -5/2|-2.5
> Negative reciprocal.

? What is the slope of the line $x = 3$?
- 0
- 3
+ Undefined
> Vertical lines have zero run.

? Find the x-intercept of $y = 2x - 8$.
= 4
> $0 = 2x - 8$.
:::

## Lesson: Systems of linear equations {#systems}
@summary: Solving two equations in two unknowns by graphing, substitution and elimination, the three possible outcomes, three-variable systems, and the link to matrices.

### Two clues, two unknowns
At a cinema, 2 adult tickets and 3 child tickets cost 39 dollars, and 1 adult and 2 child tickets cost 23 dollars. What does each ticket cost? One equation with two unknowns has endless solutions, but two independent equations usually pin down a single answer. A collection of equations that must all be true at once is called a **system**, and finding values that satisfy every equation simultaneously is solving the system. Here the answer turns out to be 9 dollars for an adult and 7 for a child; this article shows three ways to find it.

Systems are how we deal with problems that have several unknowns: mixtures, prices, flows in networks, balancing chemical equations, and fitting models to data. In machine learning, large systems of linear equations are solved constantly, which is why linear algebra grew out of this topic.

### What a solution means
For the system
$$2a + 3c = 39,\qquad a + 2c = 23$$
a solution is a pair $(a, c)$ that makes **both** equations true. Check $(9, 7)$: $18 + 21 = 39$ and $9 + 14 = 23$. Both hold, so it is a solution. The pair $(6, 9)$ satisfies the first ($12 + 27 = 39$) but not the second ($6 + 18 = 24$), so it is not.

:::def System of equations
A set of equations in the same unknowns that must all hold at the same time. A solution satisfies every equation.
:::

### Method 1: graphing
Every linear equation in $x$ and $y$ is a line, and its points are exactly its solutions. A solution of the system must lie on **both** lines, so it is where they **intersect**. For $x + y = 4$ and $x - y = 0$, the lines cross at $(2, 2)$. Graphing gives a clear picture and a good estimate, but reading exact values from a graph is unreliable when the answer is not a whole number.

### Method 2: substitution
Solve one equation for one variable, then substitute into the other. Using the cinema system, the second equation gives $a = 23 - 2c$. Substitute into the first: $2(23 - 2c) + 3c = 39$, so $46 - 4c + 3c = 39$, giving $-c = -7$ and $c = 7$. Back-substitute: $a = 23 - 14 = 9$. Substitution works best when some variable already has coefficient 1 or $-1$.

### Method 3: elimination
Add or subtract multiples of the equations so that one variable cancels. This relies on a simple fact: if $A = B$ and $C = D$, then $A + C = B + D$. Multiply the second cinema equation by 2: $2a + 4c = 46$. Subtract the first equation, $2a + 3c = 39$: the $a$ terms cancel, leaving $c = 7$. Then $a = 9$ as before.

When neither variable lines up, scale both equations. For $3x + 2y = 16$ and $2x - 3y = -11$, multiply the first by 3 and the second by 2 to get $9x + 6y = 48$ and $4x - 6y = -22$. Adding gives $13x = 26$, so $x = 2$, and then $6 + 2y = 16$ gives $y = 5$. Checking in the second equation, $4 - 15 = -11$. Always check in the equation you didn't use last.

@fig system2 | Each equation is a line. One crossing point means one solution.

### One, none, or infinitely many
Two lines in a plane can relate in three ways, so a two-variable linear system has three possible outcomes. If the lines cross, there is **exactly one** solution; the system is **consistent and independent**. If the lines are parallel, they never meet and there is **no solution**; the system is **inconsistent**. Algebraically the variables cancel and you get a false statement, such as $0 = 5$, from $x + y = 2$ and $x + y = 7$. If the two equations describe the same line, every point on it is a solution: **infinitely many** solutions, and elimination gives $0 = 0$. For example $x + 2y = 3$ and $2x + 4y = 6$ are the same line.

:::def Inconsistent system
A system with no solution, such as two parallel lines.
:::

### Three equations, three unknowns
The same elimination idea works with more variables: use pairs of equations to eliminate one variable, leaving a two-variable system, then back-substitute. Each equation in three variables is a plane in space, and a unique solution is where three planes meet at a point. Doing this systematically, row by row, is called **Gaussian elimination**, and it is the algorithm behind solving linear systems on computers.

### Setting up word problems
Choose letters for the unknowns, write one equation per fact, and solve. A shop sells 50 items, some at 3 dollars and some at 5, for 190 dollars total. Let $x$ and $y$ be the counts: $x + y = 50$ and $3x + 5y = 190$. Elimination: $3x + 3y = 150$, subtract to get $2y = 40$, $y = 20$, $x = 30$.

### Which method should you choose?
All three methods give the same answer, so choose the one that makes the arithmetic easiest. Graphing is best for a quick picture or for checking whether a solution exists at all. Substitution is best when one equation already says $y = \ldots$ or $x = \ldots$, as often happens in word problems where one quantity is described in terms of another. Elimination is usually fastest when both equations are in standard form, especially when a pair of coefficients are already equal or opposite. Whatever you choose, finish by substituting both values into both original equations. That final check catches the sign errors that systems are famous for, and it takes far less time than redoing the whole problem. With practice you will spot the easiest method at a glance.

### Common mistakes
When subtracting equations, subtract **every** term, including the right-hand side: $(2a + 4c) - (2a + 3c) = c$ and $46 - 39 = 7$. When scaling an equation, multiply both sides. And finding one variable isn't the end: a solution is a pair, so always back-substitute for the other.

### Summary
A system's solution satisfies every equation at once, and for two variables it is where the lines meet. Substitution replaces a variable with an expression; elimination adds multiples of equations to cancel a variable. Two-variable systems have one solution, none (parallel lines) or infinitely many (the same line). Gaussian elimination extends the idea to any number of unknowns.

@viz system2 | Make the lines parallel to see "no solution", or identical to see "infinitely many".

:::explore
**What to try**
1. Start with $x + y = 4$ and $x - y = 0$. They cross at $(2, 2)$, the graphing example in the article.
2. Set the second equation to $x + y = 0$ ($b_2 = 1$). Now the slopes match, the lines are parallel and there is no solution.
3. Set the second equation to $2x + 2y = 8$ ($a_2 = 2$, $b_2 = 2$, $c_2 = 8$). It is the first line scaled by 2, so the lines coincide: infinitely many solutions.
4. Set $x + 2y = 7$ ($a_1 = 1$, $b_1 = 2$, $c_1 = 7$) and $2x - y = -1$ ($a_2 = 2$, $b_2 = -1$, $c_2 = -1$). Solve by elimination first (double the second and add: $5x = 5$), then confirm the crossing at $(1, 3)$.

**What to notice:** scaling an equation never moves its line, which is why elimination is allowed to multiply equations. The three outcomes are exactly the three ways two lines can sit in the plane.
:::

:::formulas
$$\begin{cases}a_1x + b_1y = c_1\\ a_2x + b_2y = c_2\end{cases}$$
$$D = a_1b_2 - a_2b_1,\quad x = \frac{c_1b_2 - c_2b_1}{D},\quad y = \frac{a_1c_2 - a_2c_1}{D}\quad(D \ne 0)$$
$$D = 0 \implies \text{no solution or infinitely many}$$
:::

:::thm Cramer's rule for two equations
The system $a_1x + b_1y = c_1$, $a_2x + b_2y = c_2$ has a unique solution exactly when $D = a_1b_2 - a_2b_1 \ne 0$, given by the formulas above.
:::

:::proof
Multiply the first equation by $b_2$ and the second by $b_1$ and subtract: $(a_1b_2 - a_2b_1)x = c_1b_2 - c_2b_1$. If $D \ne 0$, divide to get $x$. Eliminating $x$ the same way gives $Dy = a_1c_2 - a_2c_1$. If $D = 0$, the left sides are proportional and the lines are parallel or identical.
:::

:::steps Solve $y = 2x - 1$ and $3x + 2y = 12$ by substitution
1. Substitute: $3x + 2(2x - 1) = 12$.
2. $7x - 2 = 12$, so $x = 2$.
3. $y = 2(2) - 1 = 3$.
4. Check: $6 + 6 = 12$.
:::

:::steps Solve $5x + 2y = 1$ and $3x - 4y = 24$ by elimination
1. Double the first: $10x + 4y = 2$.
2. Add to the second: $13x = 26$, so $x = 2$.
3. $10 + 2y = 1$ gives $y = -\frac92$.
4. Check: $6 - 4(-4.5) = 6 + 18 = 24$.
:::

:::steps Solve $x + y + z = 6$, $x - y + z = 2$, $2x + y - z = 1$
1. Subtract the second from the first: $2y = 4$, so $y = 2$.
2. The first becomes $x + z = 4$; the third becomes $2x - z = -1$.
3. Add these: $3x = 3$, so $x = 1$ and $z = 3$.
4. Check the third: $2 + 2 - 3 = 1$.
:::

:::mock Exam question
A chemist mixes a 10% salt solution with a 40% salt solution to make 30 litres of a 20% solution. How many litres of each are needed?
:::solution
Let $x$ litres of 10% and $y$ litres of 40%. Volume: $x + y = 30$. Salt: $0.1x + 0.4y = 0.2(30) = 6$. Multiply the first by 0.1: $0.1x + 0.1y = 3$; subtract: $0.3y = 3$, $y = 10$, $x = 20$. Use 20 L of 10% and 10 L of 40%. Check: $2 + 4 = 6$ L of salt.
:::
:::

:::real
- **Shopping:** 3 coffees and 2 muffins cost 17 dollars, 1 coffee and 1 muffin cost 7: coffee is 3 and a muffin is 4.
- **Business:** costs $C = 500 + 20n$ and revenue $R = 45n$ meet at the break-even point $n = 20$.
- **Nutrition:** planners solve systems to hit protein and calorie targets with different foods.
:::

:::ml
Linear regression's best weights solve the normal equations $X^\top Xw = X^\top y$, a system with one equation per weight. Neural network libraries solve or approximate huge linear systems, and the condition $D \ne 0$ generalises to a matrix being invertible (non-zero determinant).
:::

:::cs
Gaussian elimination solves $n$ equations in about $\frac23n^3$ arithmetic operations. Circuit simulators, physics engines and GPS receivers all solve linear systems; GPS finds your position by solving equations from several satellite signals.
:::

:::quiz
? Solve $x + y = 10$, $x - y = 4$. What is $x$?
= 7
> Adding gives $2x = 14$.

? In the same system, what is $y$?
= 3
> $7 + y = 10$.

? How many solutions do $y = 3x + 1$ and $y = 3x - 2$ have?
+ None
- One
- Infinitely many
> Same slope, different intercepts: parallel lines.

? Solve $2x + y = 7$, $y = x + 1$. What is $x$?
= 2
> $2x + x + 1 = 7$, so $3x = 6$.

? Elimination on a system gives $0 = 0$. What does that mean?
- No solution
+ Infinitely many solutions
- The solution is $(0, 0)$
> The equations describe the same line.

? Compute $D = a_1b_2 - a_2b_1$ for $2x + 3y = 5$, $4x + 6y = 1$.
= 0
> $2\cdot6 - 4\cdot3 = 0$, so there is no unique solution.
:::

## Lesson: Inequalities and absolute value {#inequalities}
@summary: Solving linear inequalities and the sign-flip rule, interval notation, compound inequalities, absolute value equations and inequalities as distances.

### When "equals" is too strict
A ride at a theme park requires riders to be at least 120 cm tall. A phone plan gives you up to 5 GB of data. A recipe says to bake for between 25 and 30 minutes. None of these is a single value; each describes a whole **range** of acceptable numbers. Mathematics expresses ranges with **inequalities**. Height $h \ge 120$, data $d \le 5$, time $25 \le t \le 30$. Solving an inequality means finding every number that makes it true, and the answer is usually an interval on the number line rather than a single point.

This article covers the inequality symbols, how to solve linear inequalities (including the one rule that differs from equations), how to write answers in interval notation, compound inequalities, and absolute value equations and inequalities, which describe distances.

### The symbols
There are four inequality symbols: $<$ (less than), $>$ (greater than), $\le$ (less than or equal to) and $\ge$ (greater than or equal to). The pointy end faces the smaller number: $3 < 7$ and $7 > 3$ say the same thing. On a number line, $x > 2$ is drawn with an **open circle** at 2 (2 itself is not included) and an arrow to the right; $x \ge 2$ uses a **filled circle** because 2 is included.

:::def Inequality
A statement that one expression is less than, greater than, at most, or at least another, using $<$, $>$, $\le$ or $\ge$.
:::

### Solving linear inequalities
Most of the balance method from linear equations still works. You may add or subtract the same number on both sides, and you may multiply or divide both sides by the same **positive** number. Solve $3x + 4 < 19$: subtract 4 to get $3x < 15$, divide by 3 to get $x < 5$. Every number less than 5 works: $x = 4$ gives $16 < 19$, and $x = 0$ gives $4 < 19$. The boundary value 5 gives $19 < 19$, which is false, so 5 is excluded.

### The one new rule: flip when multiplying by a negative
Start with a true statement, $2 < 5$. Multiply both sides by $-1$: you get $-2$ and $-5$. But $-2$ is **greater** than $-5$, so the true statement is $-2 > -5$. Multiplying by a negative number reflects the number line, which reverses order. So:

**When you multiply or divide both sides of an inequality by a negative number, reverse the inequality sign.**

Solve $5 - 2x \ge 11$. Subtract 5: $-2x \ge 6$. Divide by $-2$ and flip: $x \le -3$. Check with $x = -4$: $5 + 8 = 13 \ge 11$, true. Check with $x = 0$: $5 \ge 11$, false, as expected. You can avoid the flip by moving the variable term to the side where it stays positive: $5 - 11 \ge 2x$ gives $-3 \ge x$, the same answer.

### Interval notation
Instead of writing $x < 5$, we can write the set of solutions as an **interval**: $(-\infty, 5)$. A round bracket means the endpoint is excluded, a square bracket means it is included, and infinity always gets a round bracket because it isn't a number you can reach. So $x \ge -3$ is $[-3, \infty)$, and $-1 < x \le 4$ is $(-1, 4]$.

:::def Interval notation
A way to write a set of real numbers by its endpoints: $(a, b)$ excludes both ends, $[a, b]$ includes both, and mixed brackets include one.
:::

### Compound inequalities
A **compound inequality** joins two conditions. "And" means both must hold, giving the overlap: $-2 < 3x + 1 \le 10$. Do the same operation to all three parts: subtract 1 to get $-3 < 3x \le 9$, divide by 3 to get $-1 < x \le 3$, the interval $(-1, 3]$. "Or" means at least one holds, giving the union of two pieces: $x < -2$ or $x > 4$, written $(-\infty, -2)\cup(4, \infty)$.

@fig g01-inequality mode=linear a=-2 b=5 c=11 op=ge | 5 − 2x ≥ 11 simplifies to x ≤ −3: dividing by −2 flips the sign.

### Absolute value as distance
The absolute value $|x|$ is the distance from $x$ to 0, and $|x - h|$ is the distance from $x$ to $h$. This viewpoint makes absolute value problems easy. The equation $|x - 3| = 5$ asks which numbers are 5 units from 3: the answers are $x = 8$ and $x = -2$. Algebraically, $|A| = k$ (with $k \ge 0$) means $A = k$ or $A = -k$. If $k < 0$ there is no solution, since a distance can't be negative: $|x + 1| = -2$ has none.

### Absolute value inequalities
$|x - 3| < 5$ asks for numbers **within** 5 of 3: the interval $-2 < x < 8$. In general $|A| < k$ means $-k < A < k$, a single interval. $|x - 3| > 5$ asks for numbers **more than** 5 away from 3: $x < -2$ or $x > 8$, two separate rays. In general $|A| > k$ means $A < -k$ or $A > k$. Engineers write tolerances this way: a bolt specified as $|L - 50| \le 0.2$ mm must be between 49.8 and 50.2 mm long.

### Common mistakes
Forgetting to flip the sign when dividing by a negative is by far the most common error, so always test one value from your answer. Another is writing an "or" situation as a single chain, like $8 < x < -2$, which no number satisfies. Third, $|x| > 3$ is not $-3 > x > 3$; it is two separate pieces. Finally, an open circle and a round bracket mean the endpoint is excluded; mixing them up changes the answer.

### Testing your answer
After solving, pick one number inside your solution set and one outside, and substitute both into the original inequality. The inside number should make it true and the outside one false. For $|2x - 1| \le 5$, the solution is $-2 \le x \le 3$; testing $x = 0$ gives $1 \le 5$ (true) and $x = 4$ gives $7 \le 5$ (false). This two-point test catches nearly every sign and direction error.

### Summary
Inequalities describe ranges of numbers. Solve them like equations, except that multiplying or dividing by a negative reverses the sign. Write answers in interval notation, with square brackets for included endpoints. "And" gives an overlap, "or" a union. $|x - h|$ is the distance from $h$: $|A| < k$ is one interval, $|A| > k$ is two rays, and $|A| = k$ has two, one or no solutions.

@viz g01-inequality mode=linear a=-2 b=5 c=11 op=ge | Change a, b, c and the relation. Watch the solution set and test a point.

:::explore
**What to try**
1. Start with $-2x + 5 \ge 11$, the example from the article. The shaded set is $x \le -3$: the sign flipped because $a = -2$ is negative.
2. Change $a$ to $2$. Now $2x + 5 \ge 11$ gives $x \ge 3$, and the shading points the other way.
3. Switch the relation to $>$. The circle at the endpoint opens because the endpoint is no longer included.
4. Move the test point into and out of the shaded region and watch the true/false readout.

**What to notice:** the endpoint is always $\frac{c - b}{a}$, as for the matching equation. Only the direction depends on the sign of $a$, which is the flip rule.
:::

@viz g01-inequality mode=abs h=3 r=5 op=lt | Absolute value as distance: |x − h| compared with r.

:::explore
**What to try**
1. With $h = 3$, $r = 5$ and $<$, the solution is $(-2, 8)$: numbers within 5 of 3.
2. Switch to $>$. The solution becomes two rays, $x < -2$ or $x > 8$.
3. Set $r = 0$ with $<$. No number is less than 0 units away, so nothing is shaded.

**What to notice:** $|x - h| < r$ is always one interval centred at $h$, and $|x - h| > r$ is always its outside.
:::

:::formulas
$$a < b \implies a + c < b + c$$
$$a < b,\ c > 0 \implies ac < bc\qquad a < b,\ c < 0 \implies ac > bc$$
$$|A| = k \iff A = k \text{ or } A = -k\quad(k \ge 0)$$
$$|A| < k \iff -k < A < k\qquad |A| > k \iff A < -k \text{ or } A > k$$
:::

:::thm Multiplying by a negative reverses order
If $a < b$ and $c < 0$, then $ac > bc$.
:::

:::proof
$a < b$ means $b - a > 0$. Since $c < 0$, $-c > 0$, and the product of two positives is positive: $(b - a)(-c) > 0$. Expanding, $ac - bc > 0$, so $ac > bc$.
:::

:::steps Solve $4 - 3x > 2x - 11$ and write it in interval notation
1. Subtract $2x$: $4 - 5x > -11$.
2. Subtract 4: $-5x > -15$.
3. Divide by $-5$ and flip: $x < 3$.
4. Interval: $(-\infty, 3)$. Test $x = 0$: $4 > -11$, true.
:::

:::steps Solve $|2x - 1| \le 5$
1. Rewrite: $-5 \le 2x - 1 \le 5$.
2. Add 1: $-4 \le 2x \le 6$.
3. Divide by 2: $-2 \le x \le 3$, that is $[-2, 3]$.
:::

:::steps Solve $|x + 4| = 7$
1. $x + 4 = 7$ gives $x = 3$.
2. $x + 4 = -7$ gives $x = -11$.
3. Both are 7 units from $-4$.
:::

:::mock Exam question
A student needs an average of at least 80 over four tests. Their first three scores are 72, 85 and 79. What scores on the fourth test will do it, given the maximum is 100?
:::solution
Let $s$ be the fourth score. $\frac{72 + 85 + 79 + s}{4} \ge 80$, so $236 + s \ge 320$ and $s \ge 84$. Combined with $s \le 100$: $84 \le s \le 100$, the interval $[84, 100]$.
:::
:::

:::real
- **Speed limits:** driving at speed $v$ legally on a motorway might mean $60 \le v \le 120$ km/h.
- **Manufacturing:** a 500 g bag with tolerance 5 g must satisfy $|w - 500| \le 5$.
- **Budgets:** with 50 dollars and items at 6 dollars, $6n \le 50$ gives $n \le 8.33$, so at most 8 items.
:::

:::ml
Constraints in optimisation are inequalities, such as probabilities $0 \le p \le 1$. Support vector machines require $y_i(w\cdot x_i + b) \ge 1$ for every training point. The ReLU activation $\max(0, z)$ and gradient clipping $|g| \le c$ are inequality ideas, and the L1 penalty $\sum|w_i|$ uses absolute values.
:::

:::cs
Every `if (x < limit)` is an inequality test. Bounds checks like `0 <= i && i < n` are compound inequalities, the half-open interval $[0, n)$. Comparing floating point numbers uses tolerances: `abs(a - b) < 1e-9` instead of `a == b`.
:::

:::quiz
? Solve $2x - 7 < 5$. The answer is $x < k$. Find $k$.
= 6
> $2x < 12$.

? Solve $-3x \ge 12$.
- $x \ge -4$
+ $x \le -4$
- $x \le 4$
> Dividing by $-3$ flips the sign.

? Which interval is $-2 \le x < 5$?
- $(-2, 5]$
+ $[-2, 5)$
- $[-2, 5]$
> Square bracket for the included $-2$, round for the excluded 5.

? How many solutions does $|x - 1| = -3$ have?
= 0
> An absolute value is never negative.

? Solve $|x| < 4$. What is the largest integer solution?
= 3
> $-4 < x < 4$.

? Solve $|x - 2| = 6$. What is the negative solution?
= -4
> $x - 2 = -6$.
:::

# Unit: Polynomials and quadratics

## Lesson: Polynomials and factoring {#polynomials}
@summary: Polynomial vocabulary, adding and multiplying polynomials, special products, and factoring by common factor, grouping, trinomials and difference of squares.

### Building blocks of algebra
Suppose you make an open box from a 20 cm by 20 cm sheet of card by cutting a square of side $x$ from each corner and folding up the sides. The box's volume is $x(20 - 2x)^2$, which expands to $4x^3 - 80x^2 + 400x$. Expressions like this, sums of terms made of a number times a whole-number power of $x$, are called **polynomials**. They are the most important family of expressions in algebra: easy to evaluate, easy to differentiate, and flexible enough to approximate almost any smooth curve.

This article introduces polynomial vocabulary, shows how to add, subtract and multiply polynomials, collects the special products worth knowing by heart, and then reverses multiplication to **factor** polynomials, the skill that unlocks solving equations.

### Vocabulary
A **polynomial** in $x$ is a sum of terms $a_kx^k$ where each exponent $k$ is a whole number ($0, 1, 2, \ldots$). So $3x^4 - 2x^2 + x - 7$ is a polynomial, but $x^{-1}$ and $\sqrt x$ are not allowed as terms. The **degree** is the highest exponent, 4 here. The term with the highest power is the **leading term** and its coefficient is the **leading coefficient**, 3. The term without $x$ is the constant term, $-7$. We usually write polynomials in **standard form**, with powers decreasing.

Polynomials have names by degree: degree 0 is a constant, 1 linear ($2x + 1$), 2 quadratic ($x^2 - 5x + 6$), 3 cubic, 4 quartic. By number of terms: a monomial has one term, a binomial two, a trinomial three.

:::def Polynomial
A sum of terms of the form $a_kx^k$ with real coefficients $a_k$ and whole-number exponents $k$.
:::

:::def Degree
The highest power of the variable that appears with a non-zero coefficient.
:::

### Adding and subtracting
Add polynomials by combining like terms. $(3x^2 + 2x - 5) + (x^2 - 6x + 1) = 4x^2 - 4x - 4$. To subtract, distribute the minus sign to **every** term of the second polynomial first: $(3x^2 + 2x - 5) - (x^2 - 6x + 1) = 3x^2 + 2x - 5 - x^2 + 6x - 1 = 2x^2 + 8x - 6$.

### Multiplying
Multiply every term of the first polynomial by every term of the second, then combine like terms. For two binomials, $(x + 3)(x + 2) = x^2 + 2x + 3x + 6 = x^2 + 5x + 6$. The area model shows why: a rectangle of sides $x + 3$ and $x + 2$ splits into four pieces, $x^2$, $2x$, $3x$ and $6$. For longer polynomials the same rule applies: $(x + 1)(x^2 - x + 1) = x^3 - x^2 + x + x^2 - x + 1 = x^3 + 1$. When multiplying, degrees add: degree 2 times degree 3 gives degree 5.

@fig g01-area-model mode=binomial p=3 q=2 | (x + 3)(x + 2): four rectangles give x², 2x, 3x and 6.

### Special products
Three patterns appear so often that they are worth memorising:
$$(a + b)^2 = a^2 + 2ab + b^2,\qquad (a - b)^2 = a^2 - 2ab + b^2,\qquad (a + b)(a - b) = a^2 - b^2$$
The middle term $2ab$ is the reason $(a + b)^2 \ne a^2 + b^2$. For example $(x + 5)^2 = x^2 + 10x + 25$, and $(2x - 3)^2 = 4x^2 - 12x + 9$. The difference of squares gives mental-arithmetic tricks: $51\times49 = (50 + 1)(50 - 1) = 2500 - 1 = 2499$.

### Factoring: multiplication in reverse
To **factor** a polynomial is to write it as a product of simpler polynomials. It is useful because a product is zero exactly when one of its factors is zero, so factoring turns hard equations into easy ones. Always try these steps in order.

**1. Greatest common factor.** Take out anything every term shares. $6x^3 + 9x^2 = 3x^2(2x + 3)$.

**2. Difference of squares.** $x^2 - 49 = (x + 7)(x - 7)$, and $9x^2 - 4 = (3x + 2)(3x - 2)$. A **sum** of squares like $x^2 + 4$ does not factor over the real numbers.

**3. Trinomials $x^2 + bx + c$.** Find two numbers that **multiply to $c$** and **add to $b$**. For $x^2 + 7x + 12$, the pair 3 and 4 works ($3\times4 = 12$, $3 + 4 = 7$), so it factors as $(x + 3)(x + 4)$. For $x^2 - x - 12$, we need product $-12$ and sum $-1$: that's $-4$ and $3$, giving $(x - 4)(x + 3)$.

**4. Leading coefficient not 1.** For $ax^2 + bx + c$, find two numbers multiplying to $ac$ and adding to $b$, split the middle term, then group. For $2x^2 + 7x + 3$: $ac = 6$, and $6 + 1 = 7$. Write $2x^2 + 6x + x + 3 = 2x(x + 3) + 1(x + 3) = (2x + 1)(x + 3)$.

**5. Grouping.** With four terms, pair them: $x^3 + 2x^2 + 3x + 6 = x^2(x + 2) + 3(x + 2) = (x^2 + 3)(x + 2)$.

You can always check a factorisation by multiplying it back out.

### Roots and factors
A **root** (or zero) of a polynomial $p$ is a value with $p(r) = 0$. If $x^2 - x - 12 = (x - 4)(x + 3)$, then the roots are 4 and $-3$. The connection runs both ways: $r$ is a root exactly when $(x - r)$ is a factor. This is the **factor theorem**, explored in the next lesson. A polynomial of degree $n$ has at most $n$ real roots, and its graph has at most $n - 1$ turning points.

### Evaluating polynomials
To evaluate a polynomial, substitute the value in brackets and follow the order of operations. For $p(x) = 2x^3 - 3x^2 + 4$ at $x = 2$: $2(8) - 3(4) + 4 = 16 - 12 + 4 = 8$, so $p(2) = 8$. At $x = -1$: $2(-1) - 3(1) + 4 = -1$. Notice that $p(-1)$ is negative and $p(2)$ is positive. Because polynomial graphs are smooth and unbroken, the graph must cross the x-axis somewhere between $-1$ and $2$, so there is a root in that interval. This simple observation is the basis of numerical root-finding methods such as bisection, which repeatedly halves an interval where the sign changes.

### Why factoring is worth the effort
Factoring can feel like a puzzle for its own sake, but it is one of the most practical skills in algebra. A factored polynomial tells you its roots immediately, shows where its graph crosses the axis, and makes fractions of polynomials simplify by cancelling common factors, as you will see in the rational expressions lesson. Expanded form is better for adding polynomials and reading off the degree and constant term. Being able to move freely between the two forms, in either direction, is the real goal of this lesson.

### Common mistakes
The most common error is $(a + b)^2 = a^2 + b^2$; remember the middle term. Another is losing a sign when subtracting a polynomial. When factoring, forgetting to take out the GCF first leads to messy, incomplete answers: $2x^2 - 18 = 2(x^2 - 9) = 2(x + 3)(x - 3)$. And always check by expanding.

### Summary
A polynomial is a sum of whole-number powers of $x$ with coefficients; its degree is its highest power. Add by combining like terms, multiply by multiplying every pair of terms. Learn $(a \pm b)^2$ and $(a + b)(a - b)$. Factor by GCF, difference of squares, the product-sum method, splitting the middle term and grouping. Roots of a polynomial match its linear factors.

@viz g01-area-model mode=binomial p=3 q=2 | Change p and q to see (x + p)(x + q) as four areas.

:::explore
**What to try**
1. With $p = 3$, $q = 2$, read the four pieces: $x^2$, $2x$, $3x$, $6$. Together $x^2 + 5x + 6$, matching the article.
2. Set $p = q = 4$. The picture is a square: $(x + 4)^2 = x^2 + 8x + 16$. The two $4x$ strips are the $2ab$ term.
3. Set $q = -2$ and $p = 3$. One piece becomes negative: $(x + 3)(x - 2) = x^2 + x - 6$.
4. Set $p = 5$, $q = -5$. The middle terms cancel: $x^2 - 25$, the difference of squares.

**What to notice:** the constant term is always $pq$ and the coefficient of $x$ is always $p + q$. That is exactly why factoring $x^2 + bx + c$ means finding two numbers that multiply to $c$ and add to $b$.
:::

@viz func kind=cubic | A degree-n polynomial has at most n roots and at most n − 1 turning points.

:::explore
**What to try**
1. Use the default cubic and count where it crosses the x-axis: up to 3 roots.
2. Increase $d$ until only one crossing remains. A cubic always has at least one real root.
3. Make $a$ negative. The ends swap: the graph now rises on the left and falls on the right.

**What to notice:** the leading term controls the ends of the graph, and each crossing of the x-axis is a root, matching a factor $(x - r)$.
:::

:::formulas
$$(a + b)^2 = a^2 + 2ab + b^2\qquad (a - b)^2 = a^2 - 2ab + b^2$$
$$(a + b)(a - b) = a^2 - b^2$$
$$(x + p)(x + q) = x^2 + (p + q)x + pq$$
$$a^3 - b^3 = (a - b)(a^2 + ab + b^2)\qquad a^3 + b^3 = (a + b)(a^2 - ab + b^2)$$
$$\deg(pq) = \deg p + \deg q$$
:::

:::thm Zero product property
If $AB = 0$, then $A = 0$ or $B = 0$.
:::

:::proof
If $A \ne 0$, multiply both sides of $AB = 0$ by $\frac1A$ to get $B = 0$. So at least one factor is zero.
:::

:::steps Expand $(2x - 3)(x^2 + 4x - 1)$
1. $2x\cdot(x^2 + 4x - 1) = 2x^3 + 8x^2 - 2x$.
2. $-3\cdot(x^2 + 4x - 1) = -3x^2 - 12x + 3$.
3. Combine: $2x^3 + 5x^2 - 14x + 3$.
:::

:::steps Factor $3x^2 - 10x - 8$
1. $ac = -24$; find two numbers multiplying to $-24$ and adding to $-10$: $-12$ and $2$.
2. Split: $3x^2 - 12x + 2x - 8$.
3. Group: $3x(x - 4) + 2(x - 4)$.
4. Factor: $(3x + 2)(x - 4)$.
:::

:::steps Factor completely $2x^3 - 50x$
1. GCF: $2x(x^2 - 25)$.
2. Difference of squares: $2x(x + 5)(x - 5)$.
:::

:::mock Exam question
Solve $x^3 - 4x^2 - 9x + 36 = 0$ by factoring.
:::solution
Group: $x^2(x - 4) - 9(x - 4) = (x^2 - 9)(x - 4) = (x + 3)(x - 3)(x - 4)$. By the zero product property, $x = -3$, $3$ or $4$. Check $x = 3$: $27 - 36 - 27 + 36 = 0$.
:::
:::

:::real
- **Packaging:** the box volume $V(x) = x(20 - 2x)^2$ from the introduction is a cubic; at $x = 3$ it is $3\cdot14^2 = 588$ cm³.
- **Projectiles:** the height of a thrown ball is a quadratic polynomial in time.
- **Finance:** the value of regular savings after $n$ years involves a polynomial in the growth factor $1 + r$.
:::

:::ml
Polynomial regression fits $\hat y = w_0 + w_1x + w_2x^2 + \cdots + w_dx^d$. Choosing the degree $d$ is a classic example of the bias-variance trade-off: too low underfits, too high overfits. Polynomial kernels in SVMs and polynomial feature expansion use the same idea.
:::

:::cs
Horner's method evaluates $a_nx^n + \cdots + a_0$ with only $n$ multiplications by nesting: $((a_nx + a_{n-1})x + \cdots)x + a_0$. Error-detecting codes such as CRC treat bit strings as polynomials and use polynomial division.
:::

:::quiz
? What is the degree of $5x^3 - x^7 + 2$?
= 7
> The highest power is $x^7$.

? Expand $(x - 4)^2$.
- $x^2 + 16$
- $x^2 - 16$
+ $x^2 - 8x + 16$
> $(a - b)^2 = a^2 - 2ab + b^2$.

? Factor $x^2 + 2x - 15$.
+ $(x + 5)(x - 3)$
- $(x - 5)(x + 3)$
- $(x + 15)(x - 1)$
> $5\cdot(-3) = -15$ and $5 + (-3) = 2$.

? Compute $102\times98$ using a difference of squares.
= 9996
> $100^2 - 2^2$.

? What is the coefficient of $x$ in $(x + 6)(x - 2)$?
= 4
> $p + q = 6 - 2$.

? What are the roots of $(x - 1)(x + 7)$? Give the smaller one.
= -7
> Set each factor to zero.
:::

## Lesson: Quadratic equations {#quadratics}
@summary: Solving ax² + bx + c = 0 by factoring, square roots, completing the square and the quadratic formula; the discriminant, vertex form and parabolas.

### Where quadratics come from
Throw a ball straight up at 20 metres per second. Its height after $t$ seconds is roughly $h = 20t - 5t^2$. When does it land? We need $20t - 5t^2 = 0$. A garden that is 3 m longer than it is wide has area 40 m²: if the width is $w$, then $w(w + 3) = 40$. Both problems lead to an equation containing the square of the unknown, called a **quadratic equation**. Quadratics describe projectiles, areas, profit curves and optimal designs, and they are the first equations where the answer is often two numbers rather than one.

This article explains four methods for solving quadratics, from quickest to most general, how the discriminant predicts the number of solutions, and how the graph of a quadratic, a parabola, connects to it all.

### Standard form
A quadratic equation can be written as
$$ax^2 + bx + c = 0,\qquad a \ne 0$$
For the ball, $-5t^2 + 20t + 0 = 0$, so $a = -5$, $b = 20$, $c = 0$. For the garden, $w^2 + 3w - 40 = 0$. Always rearrange so that one side is zero before solving: the methods below all rely on it.

:::def Quadratic equation
An equation that can be written as $ax^2 + bx + c = 0$ with $a \ne 0$.
:::

### Method 1: factoring
If the quadratic factors, the zero product property finishes the job. The garden: $w^2 + 3w - 40 = (w + 8)(w - 5) = 0$, so $w = -8$ or $w = 5$. A width can't be negative, so the garden is 5 m by 8 m. The ball: $-5t^2 + 20t = -5t(t - 4) = 0$, so $t = 0$ (when it is thrown) or $t = 4$ seconds (when it lands). Factoring is fastest when it works, but many quadratics, like $x^2 + 4x - 1$, don't factor nicely.

### Method 2: square roots
If there is no $x$ term, isolate $x^2$ and take square roots, remembering both signs. $3x^2 - 48 = 0$ gives $x^2 = 16$, so $x = \pm4$. The same works for a squared bracket: $(x - 2)^2 = 9$ gives $x - 2 = \pm3$, so $x = 5$ or $x = -1$.

### Method 3: completing the square
Any quadratic can be rewritten as a squared bracket plus a number. Since $(x + k)^2 = x^2 + 2kx + k^2$, the number needed to complete $x^2 + bx$ into a square is $\left(\frac b2\right)^2$. Solve $x^2 + 6x - 7 = 0$. Move the constant: $x^2 + 6x = 7$. Half of 6 is 3, and $3^2 = 9$; add 9 to both sides: $x^2 + 6x + 9 = 16$, that is $(x + 3)^2 = 16$. So $x + 3 = \pm4$, giving $x = 1$ or $x = -7$. If $a \ne 1$, divide by $a$ first.

### Method 4: the quadratic formula
Completing the square on the general equation $ax^2 + bx + c = 0$ produces a formula that solves every quadratic:
$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$
For $2x^2 - 3x - 2 = 0$: $a = 2$, $b = -3$, $c = -2$. Then $b^2 - 4ac = 9 + 16 = 25$, so $x = \frac{3 \pm 5}{4}$, giving $x = 2$ or $x = -\frac12$. For $x^2 + 4x - 1 = 0$: $16 + 4 = 20$, so $x = \frac{-4 \pm \sqrt{20}}{2} = -2 \pm\sqrt5$, about $0.236$ and $-4.236$.

### The discriminant
The expression under the root, $\Delta = b^2 - 4ac$, is called the **discriminant**, and it tells you how many real solutions there are before you finish. If $\Delta > 0$ there are two distinct real roots. If $\Delta = 0$ there is exactly one (a repeated root): $x^2 - 6x + 9 = (x - 3)^2$ has $\Delta = 36 - 36 = 0$. If $\Delta < 0$ there are no real roots, because you can't take the square root of a negative number; the roots are complex. $x^2 + 2x + 5$ has $\Delta = 4 - 20 = -16$.

:::def Discriminant
For $ax^2 + bx + c$, the number $\Delta = b^2 - 4ac$. Its sign gives the number of real roots: 2, 1 or 0.
:::

### Parabolas and vertex form
The graph of $y = ax^2 + bx + c$ is a **parabola**. It opens upward if $a > 0$ and downward if $a < 0$. Its turning point is the **vertex**, at $x = -\frac{b}{2a}$, and the parabola is symmetric about the vertical line through it. The roots are where it crosses the x-axis, so the discriminant's three cases are a parabola crossing twice, touching once, or missing the axis. Completing the square gives **vertex form** $y = a(x - h)^2 + k$ with vertex $(h, k)$: $x^2 - 4x + 1 = (x - 2)^2 - 3$, vertex $(2, -3)$. For the ball, the vertex is at $t = -\frac{20}{2(-5)} = 2$ s, with height $40 - 20 = 20$ m, the maximum.

@fig quadratic | The parabola y = ax² + bx + c: roots are x-axis crossings, and the vertex sits halfway between them.

:::def Vertex
The turning point of a parabola, at $x = -\frac b{2a}$; the minimum if $a > 0$, the maximum if $a < 0$.
:::

### Sum and product of roots
If the roots are $r_1$ and $r_2$, then $ax^2 + bx + c = a(x - r_1)(x - r_2)$, and expanding shows $r_1 + r_2 = -\frac ba$ and $r_1r_2 = \frac ca$. For $x^2 - 7x + 10$, the roots 2 and 5 add to 7 and multiply to 10. This is a fast check on any answer.

### Choosing a method
With four methods available, a little judgement saves a lot of time. First look for a missing term. If there is no constant term, as in $5x^2 - 15x = 0$, factor out $x$ at once: $5x(x - 3) = 0$. If there is no $x$ term, as in $2x^2 - 18 = 0$, isolate $x^2$ and take square roots. Otherwise, spend a few seconds looking for a factor pair; small whole-number coefficients often factor. If nothing appears quickly, go straight to the quadratic formula, which never fails. Completing the square is the method of choice when you also want the vertex, because it produces vertex form at the same time.

Whatever method you use, it is worth computing the discriminant early. It tells you whether to expect two neat answers, a single repeated one, or none at all in the real numbers, so you know what kind of answer you are looking for before you start the arithmetic. If $\Delta$ is a perfect square such as 25 or 49, the quadratic factors over the whole numbers or fractions, which is a useful hint that factoring would have worked.

### Common mistakes
Forgetting the $\pm$ loses a solution. In the formula, the whole numerator is divided by $2a$, not just the square root. Watch the sign of $b$: if $b = -3$, then $-b = 3$ and $b^2 = 9$, never $-9$. And don't divide both sides by $x$: from $x^2 = 5x$ you'd lose $x = 0$; factor instead as $x(x - 5) = 0$.

### Summary
Write the equation as $ax^2 + bx + c = 0$. Factor if you can, take square roots when there is no $x$ term, and otherwise complete the square or use $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$. The discriminant counts real roots. The graph is a parabola with vertex at $x = -\frac b{2a}$, and roots are its x-intercepts.

@viz quadratic | Drag c down to create two roots, up to remove them. The discriminant tells you which.

:::explore
**What to try**
1. Start with $a = 1$, $b = -2$, $c = -3$. The roots are $-1$ and $3$, and $\Delta = 4 + 12 = 16 > 0$.
2. Raise $c$ to $1$. The parabola touches the axis at $x = 1$: $\Delta = 4 - 4 = 0$, a repeated root.
3. Raise $c$ to $3$. The parabola floats above the axis: $\Delta = 4 - 12 < 0$, no real roots.
4. Make $a$ negative. The parabola opens downward and the vertex becomes a maximum, like the ball's highest point.

**What to notice:** the vertex always sits at $x = -\frac b{2a}$, exactly halfway between the roots. Moving $c$ slides the parabola up and down, which is why it changes the number of crossings.
:::

@viz func kind=quadratic | Vertex form: h moves the parabola sideways, k moves it up, a stretches it.

:::explore
**What to try**
1. Set $a = 1$, $h = 2$, $k = -3$: the graph of $(x - 2)^2 - 3$, which is $x^2 - 4x + 1$ from the article.
2. Change $k$ to 0 and then to 2. The vertex moves up and the roots disappear when $k > 0$ with $a > 0$.
3. Change $a$ to $0.5$ and then $3$. Small $|a|$ widens the parabola, large $|a|$ narrows it.

**What to notice:** in vertex form the vertex can be read straight off as $(h, k)$, which is why completing the square is useful for graphing and optimisation.
:::

:::formulas
$$ax^2 + bx + c = 0\implies x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$
$$\Delta = b^2 - 4ac$$
$$x_{\text{vertex}} = -\frac{b}{2a}\qquad y = a(x - h)^2 + k$$
$$r_1 + r_2 = -\frac ba\qquad r_1r_2 = \frac ca$$
:::

:::thm The quadratic formula
For $a \ne 0$, the solutions of $ax^2 + bx + c = 0$ are $x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ (real when $b^2 - 4ac \ge 0$).
:::

:::proof By completing the square
Divide by $a$: $x^2 + \frac bax = -\frac ca$. Add $\frac{b^2}{4a^2}$: $\left(x + \frac{b}{2a}\right)^2 = \frac{b^2 - 4ac}{4a^2}$. Take square roots: $x + \frac{b}{2a} = \pm\frac{\sqrt{b^2 - 4ac}}{2a}$. Subtract $\frac b{2a}$.
:::

:::steps Solve $x^2 - 5x - 14 = 0$
1. Two numbers multiplying to $-14$ and adding to $-5$: $-7$ and $2$.
2. $(x - 7)(x + 2) = 0$.
3. $x = 7$ or $x = -2$. Check: sum 5, product $-14$.
:::

:::steps Solve $3x^2 + 2x - 2 = 0$ exactly
1. $a = 3$, $b = 2$, $c = -2$; $\Delta = 4 + 24 = 28$.
2. $x = \frac{-2 \pm\sqrt{28}}{6} = \frac{-2 \pm 2\sqrt7}{6}$.
3. Simplify: $x = \frac{-1 \pm\sqrt7}{3}$, about $0.215$ and $-1.215$.
:::

:::steps Write $2x^2 + 12x + 7$ in vertex form
1. Factor 2 from the $x$ terms: $2(x^2 + 6x) + 7$.
2. Complete the square: $2(x^2 + 6x + 9) - 18 + 7$.
3. $2(x + 3)^2 - 11$. Vertex $(-3, -11)$.
:::

:::mock Exam question
A farmer has 60 m of fencing to make a rectangular pen against a wall (the wall forms one side). What dimensions give the largest area?
:::solution
Let the two sides perpendicular to the wall be $x$; the side parallel is $60 - 2x$. Area $A = x(60 - 2x) = -2x^2 + 60x$. This parabola opens down, with vertex at $x = -\frac{60}{2(-2)} = 15$. So the pen is 15 m by 30 m, with area 450 m².
:::
:::

:::real
- **Sport:** a ball's height $h = -4.9t^2 + 14.7t + 2$ shows when it peaks ($t = 1.5$ s) and lands.
- **Business:** profit $P = -2p^2 + 80p - 600$ is maximised at price $p = 20$, giving profit $200$.
- **Satellite dishes:** parabolic reflectors focus signals at a single point.
:::

:::ml
The mean squared error of a one-weight model is a quadratic in the weight, so its minimum is at the vertex $w = -\frac b{2a}$. In many dimensions the loss of linear regression is a quadratic bowl, which is why gradient descent reliably finds its minimum.
:::

:::cs
Computing the quadratic formula naively in floating point can lose accuracy when $b^2 \gg 4ac$; numerical libraries use $x_1 = \frac{-b - \operatorname{sign}(b)\sqrt\Delta}{2a}$ and $x_2 = \frac{c}{ax_1}$. Ray tracers solve a quadratic to find where a ray hits a sphere.
:::

:::quiz
? Solve $x^2 = 49$. What is the negative solution?
= -7
> $x = \pm7$.

? What is the discriminant of $x^2 + 4x + 4$?
= 0
> $16 - 16 = 0$, a repeated root.

? How many real roots does $2x^2 + x + 3 = 0$ have?
= 0
> $\Delta = 1 - 24 < 0$.

? What is the x-coordinate of the vertex of $y = x^2 - 8x + 3$?
= 4
> $-\frac{-8}{2}$.

? Solve $x^2 - 9x + 20 = 0$. What is the larger root?
= 5
> $(x - 4)(x - 5)$.

? The roots of $2x^2 - 6x + 1 = 0$ multiply to what?
= 1/2|0.5
> $\frac ca = \frac12$.
:::

## Lesson: Polynomial division and the factor theorem {#polynomial-division}
@summary: Long division and synthetic division of polynomials, the remainder theorem, the factor theorem and the rational root theorem for finding roots.

### Why divide polynomials?
When you divide 157 by 12 you get 13 remainder 1, which we can write as $157 = 12\times13 + 1$. Polynomials can be divided in exactly the same way, and for much the same reasons. Suppose you know that $x = 2$ is a root of $p(x) = x^3 - 2x^2 - x + 2$ because $p(2) = 8 - 8 - 2 + 2 = 0$. Then $(x - 2)$ must be a factor, and dividing $p(x)$ by $(x - 2)$ gives the other factor, $x^2 - 1$, which you can factor further. Division is how we break a cubic or higher-degree polynomial down into pieces small enough to solve.

This article shows polynomial long division, the faster shortcut called synthetic division, and three theorems that make factoring higher-degree polynomials systematic: the remainder theorem, the factor theorem and the rational root theorem.

### The division statement
For whole numbers, dividing $a$ by $b$ gives a quotient $q$ and remainder $r$ with $a = bq + r$ and $0 \le r < b$. For polynomials, dividing $p(x)$ by a non-zero $d(x)$ gives a **quotient** $q(x)$ and **remainder** $r(x)$ with
$$p(x) = d(x)\,q(x) + r(x),\qquad \deg r < \deg d$$
When dividing by a linear factor like $x - 2$, the remainder has degree less than 1, so it is just a number. If the remainder is zero, $d(x)$ divides $p(x)$ exactly and is a factor.

:::def Quotient and remainder
When $p(x) = d(x)q(x) + r(x)$ with $\deg r < \deg d$, $q$ is the quotient and $r$ the remainder of dividing $p$ by $d$.
:::

### Long division step by step
Divide $2x^3 + 3x^2 - 5x + 6$ by $x + 3$. The process mirrors long division of numbers: divide the leading terms, multiply back, subtract, bring down, repeat.

First, $2x^3 \div x = 2x^2$. Multiply: $2x^2(x + 3) = 2x^3 + 6x^2$. Subtract from the first two terms: $(2x^3 + 3x^2) - (2x^3 + 6x^2) = -3x^2$. Bring down $-5x$ to get $-3x^2 - 5x$.

Second, $-3x^2 \div x = -3x$. Multiply: $-3x(x + 3) = -3x^2 - 9x$. Subtract: $(-3x^2 - 5x) - (-3x^2 - 9x) = 4x$. Bring down $+6$ to get $4x + 6$.

Third, $4x \div x = 4$. Multiply: $4(x + 3) = 4x + 12$. Subtract: $6 - 12 = -6$.

So the quotient is $2x^2 - 3x + 4$ and the remainder is $-6$:
$$2x^3 + 3x^2 - 5x + 6 = (x + 3)(2x^2 - 3x + 4) - 6$$
If a power is missing from the dividend, write it with a zero coefficient so the columns line up: divide $x^3 - 8$ as $x^3 + 0x^2 + 0x - 8$.

### Synthetic division
For divisors of the form $x - c$, there is a compact method that uses only the coefficients. To divide $2x^3 + 3x^2 - 5x + 6$ by $x + 3$, note that $x + 3 = x - (-3)$, so $c = -3$. Write the coefficients $2, 3, -5, 6$. Bring down the 2. Multiply by $c$: $2\times(-3) = -6$; add to the next coefficient: $3 + (-6) = -3$. Multiply: $-3\times(-3) = 9$; add: $-5 + 9 = 4$. Multiply: $4\times(-3) = -12$; add: $6 - 12 = -6$. The bottom row $2, -3, 4 \mid -6$ gives the quotient $2x^2 - 3x + 4$ and remainder $-6$, the same as long division with far less writing.

### The remainder theorem
Look at the division statement with $d(x) = x - c$: $p(x) = (x - c)q(x) + r$. Substitute $x = c$: the first term becomes zero, leaving $p(c) = r$. So **the remainder when dividing by $x - c$ equals $p(c)$**. Check with our example: $p(-3) = 2(-27) + 3(9) - 5(-3) + 6 = -54 + 27 + 15 + 6 = -6$. This gives a fast way to evaluate polynomials (synthetic division is Horner's method) and a fast way to test for factors.

### The factor theorem
Combining the remainder theorem with the idea of a zero remainder gives one of the most useful facts in algebra: $(x - c)$ is a factor of $p(x)$ **if and only if** $p(c) = 0$. Roots and linear factors are two descriptions of the same thing. For $p(x) = x^3 - 2x^2 - x + 2$: $p(1) = 1 - 2 - 1 + 2 = 0$, so $(x - 1)$ is a factor. Dividing gives $x^2 - x - 2 = (x - 2)(x + 1)$, so $p(x) = (x - 1)(x - 2)(x + 1)$ with roots $1, 2, -1$.

@fig func kind=cubic a=1 b=-2 c=-1 d=2 | y = x³ − 2x² − x + 2 crosses the x-axis at −1, 1 and 2: one crossing for each linear factor.

### Where to look for roots: the rational root theorem
Trying random values is slow. If a polynomial has integer coefficients, any rational root $\frac pq$ in lowest terms must have $p$ dividing the constant term and $q$ dividing the leading coefficient. For $2x^3 - 3x^2 - 3x + 2$, the candidates are $\pm1, \pm2, \pm\frac12$. Testing: $p(2) = 16 - 12 - 6 + 2 = 0$, so $x - 2$ is a factor. Synthetic division gives $2x^2 + x - 1 = (2x - 1)(x + 1)$, so the roots are $2, \frac12, -1$. The theorem doesn't promise a rational root exists, but it makes the search finite.

### A complete strategy for higher-degree polynomials
Putting these tools together gives a reliable plan for factoring a cubic or quartic with integer coefficients. First take out any common factor, including a power of $x$. Second, list the candidate rational roots from the rational root theorem. Third, test candidates by substitution, starting with the easy ones, $\pm1$, because $p(1)$ is just the sum of the coefficients and $p(-1)$ is the alternating sum. Fourth, as soon as you find a root $c$, divide by $x - c$ using synthetic division. The quotient has degree one less, so a cubic becomes a quadratic, which you can finish by factoring or the quadratic formula. For a quartic, repeat the search on the cubic quotient.

Each successful division also gives you a check: the remainder must be exactly zero. If it isn't, either the value was not a root or there is an arithmetic slip. Working this way turns what looks like a hard problem into a sequence of small, checkable steps, and it is exactly how computer algebra systems approached factoring before more advanced algorithms were developed. With practice, the whole process for a typical cubic takes only a few minutes by hand.

### Common mistakes
In synthetic division, use $c$, not $-c$: dividing by $x + 3$ means $c = -3$. Forgetting zero placeholders for missing powers shifts every column and ruins the answer. In long division, subtracting means changing the sign of **every** term you subtract. And the remainder theorem gives the remainder for $x - c$ only; for a divisor like $2x - 1$, the root is $c = \frac12$.

### Summary
Polynomial division writes $p = dq + r$ with $\deg r < \deg d$. Long division works for any divisor; synthetic division is a shortcut for $x - c$. The remainder on dividing by $x - c$ is $p(c)$, so $(x - c)$ is a factor exactly when $p(c) = 0$. The rational root theorem lists the only possible rational roots, and each root found lets you divide down to a smaller polynomial.

@viz func kind=cubic | Set a = 1, b = −2, c = −1, d = 2 to see the cubic from the article and its three roots.

:::explore
**What to try**
1. Set $a = 1$, $b = -2$, $c = -1$, $d = 2$. The graph crosses at $x = -1$, $1$ and $2$, matching $(x + 1)(x - 1)(x - 2)$.
2. Read the y-intercept: 2, the constant term, which equals $(+1)(-1)(-2)$.
3. Change $d$ to $0$. The polynomial becomes $x^3 - 2x^2 - x$, so $x = 0$ is now a root: $x$ is a factor.
4. Increase $d$ to 4. Two roots vanish: the remaining cubic has only one real root, so only one real linear factor.

**What to notice:** each x-intercept $c$ is a point where $p(c) = 0$, which by the factor theorem means $(x - c)$ divides the polynomial.
:::

:::formulas
$$p(x) = d(x)q(x) + r(x),\quad \deg r < \deg d$$
$$\text{Remainder theorem: } p(x) \div (x - c) \text{ leaves } p(c)$$
$$\text{Factor theorem: } (x - c) \mid p(x) \iff p(c) = 0$$
$$\text{Rational roots: } \frac pq,\ p \mid a_0,\ q \mid a_n$$
:::

:::thm Remainder theorem
The remainder when a polynomial $p(x)$ is divided by $x - c$ is $p(c)$.
:::

:::proof
Division gives $p(x) = (x - c)q(x) + r$ where $r$ is a constant, since its degree is less than 1. Substituting $x = c$ gives $p(c) = 0\cdot q(c) + r = r$.
:::

:::thm Factor theorem
$(x - c)$ is a factor of $p(x)$ if and only if $p(c) = 0$.
:::

:::proof
By the remainder theorem, $p(x) = (x - c)q(x) + p(c)$. If $p(c) = 0$, then $p(x) = (x - c)q(x)$. Conversely, if $p(x) = (x - c)q(x)$, substituting $x = c$ gives $p(c) = 0$.
:::

:::steps Divide $x^3 - 7x + 6$ by $x - 2$ using synthetic division
1. Coefficients with placeholder: $1, 0, -7, 6$; $c = 2$.
2. Bring down 1. $1\cdot2 = 2$, $0 + 2 = 2$. $2\cdot2 = 4$, $-7 + 4 = -3$. $-3\cdot2 = -6$, $6 - 6 = 0$.
3. Quotient $x^2 + 2x - 3$, remainder 0, so $x^3 - 7x + 6 = (x - 2)(x + 3)(x - 1)$.
:::

:::steps Find the remainder when $x^4 - 3x^2 + 5$ is divided by $x + 2$
1. By the remainder theorem, evaluate $p(-2)$.
2. $16 - 12 + 5 = 9$.
3. The remainder is 9.
:::

:::steps Find $k$ if $x - 3$ is a factor of $x^3 - 4x^2 + kx - 6$
1. Factor theorem: $p(3) = 0$.
2. $27 - 36 + 3k - 6 = 0$.
3. $3k = 15$, so $k = 5$.
:::

:::mock Exam question
Fully factor $p(x) = x^3 + 2x^2 - 5x - 6$ and solve $p(x) = 0$.
:::solution
Candidates are $\pm1, \pm2, \pm3, \pm6$. $p(-1) = -1 + 2 + 5 - 6 = 0$, so $x + 1$ is a factor. Synthetic division with $c = -1$ on $1, 2, -5, -6$ gives $1, 1, -6 \mid 0$, so $p(x) = (x + 1)(x^2 + x - 6) = (x + 1)(x + 3)(x - 2)$. The solutions are $x = -1, -3, 2$.
:::
:::

:::real
- **Engineering:** stability of a control system depends on the roots of its characteristic polynomial; engineers factor or locate them.
- **Design:** a box with volume formula $x(10 - 2x)(8 - 2x) = 48$ becomes a cubic; finding one root by testing and dividing gives the rest.
:::

:::cs
Synthetic division is Horner's method, the standard way to evaluate a polynomial in $O(n)$ steps. Cyclic redundancy checks (CRCs) in networking divide a message polynomial by a generator polynomial over bits and send the remainder as a checksum. Reed-Solomon codes on QR codes and CDs rely on polynomial arithmetic.
:::

:::ml
Characteristic polynomials give the eigenvalues of a matrix, used in PCA and in analysing how fast gradient descent converges. In practice libraries find roots numerically, but the factor theorem explains why an $n\times n$ matrix has at most $n$ eigenvalues.
:::

:::quiz
? What is the remainder when $x^2 + 4x + 1$ is divided by $x - 1$?
= 6
> $p(1) = 1 + 4 + 1$.

? Is $x + 2$ a factor of $x^3 + 8$?
+ Yes
- No
> $(-2)^3 + 8 = 0$.

? When dividing by $x + 5$ synthetically, what is $c$?
= -5
> $x + 5 = x - (-5)$.

? Divide $x^2 - 9$ by $x - 3$. What is the quotient's constant term?
= 3
> The quotient is $x + 3$.

? Which is NOT a possible rational root of $3x^3 + x - 2$?
- $\frac23$
- $-1$
+ $\frac32$
> The denominator must divide 3 and the numerator must divide 2.

? Find $k$ so that $p(x) = x^2 + kx + 6$ has $x - 2$ as a factor.
= -5
> $4 + 2k + 6 = 0$.
:::

## Lesson: Rational expressions {#rational-expressions}
@summary: Fractions with polynomials: domain restrictions, simplifying by cancelling factors, multiplying, dividing, adding with common denominators, solving rational equations, holes and asymptotes.

### Fractions with variables
If 3 friends share a 60-dollar bill, each pays $\frac{60}{3} = 20$. If $n$ friends share it, each pays $\frac{60}{n}$. If a car travels 120 km at speed $v$, the trip takes $\frac{120}{v}$ hours. Expressions like these, fractions whose top and bottom are polynomials, are called **rational expressions**. They describe shares, rates, averages and anything that varies inversely, and they behave exactly like the ordinary fractions from earlier in this course. Every skill you learned there, simplifying, multiplying, dividing, finding common denominators, carries over. The only new ingredient is that the denominator contains a variable, so we must keep track of values that would make it zero.

This article covers the domain of a rational expression, simplifying by cancelling factors, the four operations, solving rational equations, and what the graphs look like near the forbidden values.

### Definition and domain
A **rational expression** is a quotient $\frac{P(x)}{Q(x)}$ of two polynomials with $Q$ not the zero polynomial. Since division by zero is undefined, the expression is undefined wherever $Q(x) = 0$. The set of allowed inputs is its **domain**. For $\frac{x + 1}{x^2 - 4}$, the denominator is $(x - 2)(x + 2)$, so the domain is all real numbers except $2$ and $-2$. Finding these excluded values is always the first step, because they stay excluded even after simplifying.

:::def Rational expression
A fraction $\frac{P(x)}{Q(x)}$ whose numerator and denominator are polynomials; it is undefined where $Q(x) = 0$.
:::

### Simplifying
To simplify $\frac{12}{18}$ you divide out the common factor 6 to get $\frac23$. With polynomials, factor top and bottom completely, then cancel common **factors**:
$$\frac{x^2 - 9}{x^2 + 5x + 6} = \frac{(x - 3)(x + 3)}{(x + 2)(x + 3)} = \frac{x - 3}{x + 2},\qquad x \ne -3, -2$$
The restriction $x \ne -3$ must be kept: the original expression is undefined at $-3$ even though the simplified one isn't. Watch for factors that are negatives of each other: $\frac{5 - x}{x - 5} = \frac{-(x - 5)}{x - 5} = -1$ for $x \ne 5$.

:::warn You can cancel factors, not terms
$\frac{x + 3}{x}$ does **not** simplify to 3. Test $x = 1$: $\frac41 = 4$. Only something multiplying the whole numerator and the whole denominator can be cancelled.
:::

### Multiplying and dividing
Multiply numerators together and denominators together, cancelling common factors along the way. Factor first to keep things small:
$$\frac{x^2 - 1}{x}\cdot\frac{3x}{x + 1} = \frac{(x - 1)(x + 1)}{x}\cdot\frac{3x}{x + 1} = 3(x - 1)$$
for $x \ne 0, -1$. To divide, multiply by the reciprocal: $\frac{A}{B}\div\frac CD = \frac AB\cdot\frac DC$. For example $\frac{x + 2}{x - 3}\div\frac{x + 2}{x^2 - 9} = \frac{x + 2}{x - 3}\cdot\frac{(x - 3)(x + 3)}{x + 2} = x + 3$, with $x \ne 3, -3, -2$.

### Adding and subtracting
As with numerical fractions, you need a common denominator, ideally the **least common denominator** (LCD), built from the factors of each denominator. For $\frac{2}{x} + \frac{3}{x + 1}$, the LCD is $x(x + 1)$:
$$\frac{2(x + 1)}{x(x + 1)} + \frac{3x}{x(x + 1)} = \frac{5x + 2}{x(x + 1)}$$
When denominators share factors, use each factor only as many times as it is needed. For $\frac{1}{x^2 - 4} - \frac{1}{x - 2}$, the LCD is $(x - 2)(x + 2)$, giving $\frac{1 - (x + 2)}{(x - 2)(x + 2)} = \frac{-x - 1}{(x - 2)(x + 2)}$. Put the subtracted numerator in brackets so the minus sign reaches every term.

### Solving rational equations
To solve an equation containing rational expressions, multiply both sides by the LCD to clear all denominators, solve the resulting polynomial equation, then **check that no solution makes an original denominator zero**. Solve $\frac{3}{x} + \frac{1}{2} = \frac{5}{x}$. Multiply by $2x$: $6 + x = 10$, so $x = 4$, which is allowed. Now solve $\frac{x}{x - 2} = \frac{2}{x - 2} + 3$. Multiply by $x - 2$: $x = 2 + 3(x - 2)$, so $x = 3x - 4$ and $x = 2$. But $x = 2$ makes the denominator zero, so it is **extraneous** and the equation has no solution.

### Graphs: asymptotes and holes
The simplest rational function, $y = \frac1x$, has no value at $x = 0$. As $x$ approaches 0 from the right, $y$ shoots up towards $+\infty$; from the left, it plunges towards $-\infty$. The line $x = 0$ is a **vertical asymptote**. As $x$ grows large, $\frac1x$ approaches 0, so $y = 0$ is a **horizontal asymptote**. In general, a factor left in the denominator after simplifying gives a vertical asymptote, while a factor that cancels gives a **hole**, a single missing point. $\frac{x^2 - 9}{x^2 + 5x + 6}$ has a vertical asymptote at $x = -2$ and a hole at $x = -3$.

@fig func kind=rational h=1 k=2 | y = 1/(x − 1) + 2: a vertical asymptote at x = 1 and a horizontal asymptote at y = 2.

:::def Asymptote
A line that a graph approaches more and more closely, without necessarily reaching it, as $x$ or $y$ grows without bound.
:::

### Complex fractions
Sometimes a fraction has fractions inside it, such as $\dfrac{1 + \frac1x}{1 - \frac1x}$. This is called a **complex fraction**, and the cleanest way to simplify it is to multiply the top and the bottom by the LCD of all the small fractions inside. Here the LCD is $x$, so the expression becomes $\dfrac{x + 1}{x - 1}$, valid for $x \ne 0$ and $x \ne 1$. The same idea explains the average speed example below: dividing a total distance by a total time built from several rational pieces always produces a complex fraction, and clearing the inner denominators makes it easy to evaluate. It is worth noticing that every technique in this lesson comes back to one principle from ordinary fractions: multiplying the top and bottom by the same non-zero quantity never changes the value. Cancelling, building common denominators and clearing complex fractions are all that principle applied in different directions. Keep that one idea in mind and the rules stop feeling like separate tricks to memorise. Always state the excluded values alongside your final answer.

### Common mistakes
Cancelling terms instead of factors is the most common error. Others: forgetting the excluded values, multiplying only some terms by the LCD when clearing an equation, and missing extraneous solutions. When subtracting, forgetting to distribute the minus to the whole numerator gives wrong signs.

### Summary
Rational expressions are fractions of polynomials. Find excluded values first. Simplify by factoring and cancelling common factors. Multiply straight across, divide by multiplying by the reciprocal, and add or subtract over the LCD. Clear denominators to solve equations and reject extraneous solutions. Remaining denominator factors give vertical asymptotes; cancelled ones give holes.

@viz func kind=rational | The graph shoots to infinity near x = h: a vertical asymptote.

:::explore
**What to try**
1. Start with $h = 0$, $k = 0$: the graph of $\frac1x$. Trace towards $x = 0$ from both sides and see it go to $+\infty$ and $-\infty$.
2. Set $h = 1$. The asymptote moves to $x = 1$, where $x - 1 = 0$ makes the denominator vanish.
3. Set $k = 2$. The whole graph lifts and the horizontal asymptote becomes $y = 2$.
4. Read the values at $x = h + 1$ and $x = h - 1$: they are $k + 1$ and $k - 1$, symmetric about the centre.

**What to notice:** the excluded value of the domain is exactly where the vertical asymptote sits. Far from it the fraction $\frac{1}{x - h}$ becomes tiny, so the graph settles towards $y = k$.
:::

:::formulas
$$\frac{AC}{BC} = \frac AB\quad(C \ne 0)$$
$$\frac AB\cdot\frac CD = \frac{AC}{BD}\qquad \frac AB\div\frac CD = \frac{AD}{BC}$$
$$\frac AB + \frac CD = \frac{AD + BC}{BD}$$
:::

:::thm Cancellation of common factors
If $B(x) \ne 0$ and $C(x) \ne 0$, then $\frac{A(x)C(x)}{B(x)C(x)} = \frac{A(x)}{B(x)}$.
:::

:::proof
$\frac{AC}{BC} = \frac AB\cdot\frac CC = \frac AB\cdot1$, which is valid only where $C \ne 0$; that is why cancelled factors still restrict the domain.
:::

:::steps Simplify $\dfrac{2x^2 - 8}{x^2 - x - 2}$
1. Factor: $\frac{2(x - 2)(x + 2)}{(x - 2)(x + 1)}$.
2. Restrictions: $x \ne 2, -1$.
3. Cancel: $\frac{2(x + 2)}{x + 1}$.
:::

:::steps Subtract $\dfrac{x}{x - 3} - \dfrac{2}{x + 1}$
1. LCD $(x - 3)(x + 1)$.
2. Numerator: $x(x + 1) - 2(x - 3) = x^2 + x - 2x + 6 = x^2 - x + 6$.
3. Result: $\dfrac{x^2 - x + 6}{(x - 3)(x + 1)}$.
:::

:::steps Solve $\dfrac{4}{x + 1} = \dfrac{3}{x - 2}$
1. Cross-multiply: $4(x - 2) = 3(x + 1)$.
2. $4x - 8 = 3x + 3$, so $x = 11$.
3. Check denominators: $12$ and $9$ are non-zero, so $x = 11$.
:::

:::mock Exam question
Pipe A fills a tank in 6 hours and pipe B in 3 hours. How long do they take together?
:::solution
Rates: A fills $\frac16$ of the tank per hour, B $\frac13$. Together $\frac16 + \frac13 = \frac16 + \frac26 = \frac12$ per hour. So the tank takes $t$ hours with $\frac t2 = 1$, giving $t = 2$ hours. As a rational equation: $\frac1t = \frac16 + \frac13$.
:::
:::

:::real
- **Travel:** average speed over a round trip at 60 and 40 km/h is $\frac{2}{\frac1{60} + \frac1{40}} = 48$ km/h, not 50.
- **Electronics:** resistors in parallel combine as $\frac1R = \frac1{R_1} + \frac1{R_2}$; 6 and 3 ohms give 2 ohms.
- **Medicine:** Young's rule for child doses, $\frac{a}{a + 12}\times\text{adult dose}$, is a rational expression in age $a$.
:::

:::ml
The F1 score $\frac{2PR}{P + R}$, precision $\frac{TP}{TP + FP}$ and the softmax $\frac{e^{z_i}}{\sum e^{z_j}}$ are rational expressions. Adding a tiny $\epsilon$ to denominators, as in $\frac{g}{\sqrt v + \epsilon}$, avoids the division-by-zero problem discussed here.
:::

:::cs
Average-case analyses produce rational expressions such as the expected probes in hashing, $\frac1{1 - \alpha}$ for load factor $\alpha$, which has a vertical asymptote at $\alpha = 1$: performance explodes as the table fills. Code must guard denominators with checks like `if q != 0`.
:::

:::quiz
? What value is excluded from the domain of $\frac{x}{x - 7}$?
= 7
> The denominator is zero at 7.

? Simplify $\frac{x^2 - 4}{x + 2}$ for $x \ne -2$.
+ $x - 2$
- $x + 2$
- $x^2 - 2$
> $(x - 2)(x + 2)\div(x + 2)$.

? Can $\frac{x + 5}{x}$ be simplified to 5?
- Yes
+ No
> $x$ is a term of the numerator, not a factor.

? Solve $\frac{6}{x} = 2$.
= 3
> $6 = 2x$.

? Compute $\frac1x + \frac1{2x}$ at $x = 3$.
= 1/2|0.5
> $\frac{3}{2x} = \frac36$.

? Where is the vertical asymptote of $y = \frac{1}{x + 4}$?
= -4
> The denominator is zero at $x = -4$.
:::

# Unit: Notation you'll see everywhere

## Lesson: Summation and product notation {#sigma-notation}
@summary: Reading and writing sigma and pi notation, index shifting, linearity rules, the famous closed forms for sums of integers, squares and geometric series, and double sums.

### A shorthand for long additions
Suppose you save 1 dollar in week 1, 2 dollars in week 2, 3 in week 3, and so on for a year. How much have you saved? You need $1 + 2 + 3 + \cdots + 52$. Writing every term is tedious, and "dots" can be ambiguous. Mathematicians use the Greek capital letter sigma, $\Sigma$, the letter S for "sum", to write such additions compactly and precisely:
$$\sum_{i=1}^{52} i = 1 + 2 + 3 + \cdots + 52 = 1378$$
Sigma notation is everywhere in statistics and machine learning: averages, variances, loss functions, dot products and probabilities are all written as sums. Reading it fluently is a skill you'll use in nearly every later course. This article teaches you how to read and write sums, the rules for manipulating them, the most useful closed-form formulas, and the matching notation for products.

### Reading sigma notation
In $\sum_{i=1}^{n} a_i$, the letter $i$ is the **index** of summation. The number under the sigma, 1, is the **lower limit**, where $i$ starts, and the number on top, $n$, is the **upper limit**, where it stops. The expression to the right, $a_i$, is the **term**, a formula that says what to add for each value of $i$. To expand a sum, substitute $i = 1, 2, \ldots, n$ into the term and add the results. For example
$$\sum_{i=1}^{4} i^2 = 1^2 + 2^2 + 3^2 + 4^2 = 1 + 4 + 9 + 16 = 30$$
and
$$\sum_{k=0}^{3} 2^k = 1 + 2 + 4 + 8 = 15.$$
The number of terms is upper minus lower plus one: $\sum_{i=3}^{7}$ has $7 - 3 + 1 = 5$ terms.

:::def Sigma notation
$\sum_{i=m}^{n} a_i = a_m + a_{m+1} + \cdots + a_n$: add the term $a_i$ for every whole number $i$ from $m$ to $n$.
:::

### The index is a dummy variable
The letter used for the index doesn't matter: $\sum_{i=1}^5 i$ and $\sum_{k=1}^5 k$ both equal 15. The index exists only inside the sum, like a loop counter in code. You can also **shift** the index: $\sum_{i=1}^{5}(i - 1) = \sum_{j=0}^{4} j$, using $j = i - 1$. Both are $0 + 1 + 2 + 3 + 4 = 10$. When you shift, change the limits and the term together.

### Writing sums in sigma notation
To go the other way, find a pattern for the general term. $3 + 5 + 7 + \cdots + 21$ is odd numbers starting at 3, so the term is $2i + 1$, from $i = 1$ (giving 3) to $i = 10$ (giving 21): $\sum_{i=1}^{10}(2i + 1)$. Alternating signs use $(-1)^i$: $1 - \frac12 + \frac13 - \frac14 = \sum_{i=1}^{4}\frac{(-1)^{i+1}}{i}$.

### Rules for sums
Because addition is commutative and associative and multiplication distributes over it, sums obey three simple rules, often called **linearity**:
$$\sum (a_i + b_i) = \sum a_i + \sum b_i,\qquad \sum c\,a_i = c\sum a_i,\qquad \sum_{i=1}^{n} c = nc$$
So $\sum_{i=1}^{10}(3i + 2) = 3\sum_{i=1}^{10} i + \sum_{i=1}^{10} 2 = 3(55) + 20 = 185$. A warning: there is no such rule for products of terms. $\sum a_ib_i$ is generally **not** $\left(\sum a_i\right)\left(\sum b_i\right)$. Try $a = b = (1, 1)$: $\sum a_ib_i = 2$ but the product of sums is 4.

### Famous closed forms
A **closed form** gives the value of a sum without adding term by term. The young Gauss is said to have added $1 + 2 + \cdots + 100$ by pairing the first and last terms: $1 + 100$, $2 + 99$, and so on, 50 pairs each totalling 101, giving 5050. In general
$$\sum_{i=1}^{n} i = \frac{n(n + 1)}{2}$$
So the year of savings is $\frac{52\cdot53}{2} = 1378$ dollars. Two more you will meet often:
$$\sum_{i=1}^{n} i^2 = \frac{n(n + 1)(2n + 1)}{6},\qquad \sum_{i=0}^{n-1} r^i = \frac{1 - r^n}{1 - r}\ (r \ne 1)$$
Check the squares formula at $n = 4$: $\frac{4\cdot5\cdot9}{6} = 30$, matching the expansion above. The geometric formula with $r = 2$, $n = 4$ gives $\frac{1 - 16}{1 - 2} = 15$. When $|r| < 1$ the terms shrink and the infinite sum converges: $\sum_{i=0}^{\infty} r^i = \frac{1}{1 - r}$, so $1 + \frac12 + \frac14 + \cdots = 2$.

@fig sigma term=i n=5 | The sum of 1 to 5 drawn as a staircase of bars: the total area is 15 = 5·6/2.

### Product notation
The capital pi, $\Pi$, does for multiplication what sigma does for addition:
$$\prod_{i=1}^{n} a_i = a_1\cdot a_2\cdots a_n$$
For example $\prod_{i=1}^{5} i = 1\cdot2\cdot3\cdot4\cdot5 = 120$, which is $5!$. Probabilities of independent events multiply, so the probability of a whole data set under a model is a product, $\prod_i p(x_i)$. Taking logarithms turns products into sums: $\ln\prod a_i = \sum\ln a_i$, which is why sums are the more common tool.

:::def Product notation
$\prod_{i=m}^{n} a_i$ means the product $a_m a_{m+1}\cdots a_n$.
:::

### Double sums
A sum can contain another sum. $\sum_{i=1}^{2}\sum_{j=1}^{3} ij$ means: for each $i$, add $ij$ over $j = 1, 2, 3$, then add those results. For $i = 1$: $1 + 2 + 3 = 6$. For $i = 2$: $2 + 4 + 6 = 12$. Total 18. Double sums add up every entry of a table, like a spreadsheet grid or a matrix. When the limits don't depend on each other, the order can be swapped.

### Sums in statistics
Much of the sigma notation you will meet later comes from statistics, so it is worth seeing a small example now. Suppose five test scores are $x_1 = 70$, $x_2 = 80$, $x_3 = 90$, $x_4 = 60$ and $x_5 = 100$. Their sum is $\sum_{i=1}^{5} x_i = 400$, and the mean is $\bar x = \frac15\sum_{i=1}^5 x_i = 80$. To measure spread, we look at how far each score is from the mean, $x_i - \bar x$, giving $-10, 0, 10, -20, 20$. Notice that these deviations always add to zero, because $\sum(x_i - \bar x) = \sum x_i - n\bar x = 400 - 400 = 0$. That is a nice use of the linearity rules. Squaring first avoids the cancellation: $\sum(x_i - \bar x)^2 = 100 + 0 + 100 + 400 + 400 = 1000$, and dividing by $n$ gives the variance, 200.

Formulas like these look intimidating when you first meet them in a textbook, but each one is just an instruction: for every data point, compute something, then add the results. Reading a sum aloud in words, such as "add up the squared distance of each score from the mean", is often the quickest way to understand it.

### Sums as loops
If you have written any code, you already understand sigma notation. The lower limit is where a loop counter starts, the upper limit is where it stops, and the term is the line of code inside the loop that adds something to a running total. A double sum is a nested loop. Thinking this way also explains the dummy-variable rule: renaming a loop counter from `i` to `k` changes nothing about the result.

### Common mistakes
Counting terms wrongly is common: $\sum_{i=0}^{n}$ has $n + 1$ terms, not $n$. A constant summed $n$ times is $nc$, not $c$: $\sum_{i=1}^{5}3 = 15$. Watch brackets: $\sum_{i=1}^{3} i^2$ is 14, while $\left(\sum_{i=1}^3 i\right)^2 = 36$.

### Summary
$\sum_{i=m}^{n}a_i$ adds the term for each index from $m$ to $n$; $\prod$ multiplies instead. The index is a dummy variable and can be shifted. Sums split over addition and let constants out, but not over products. Key closed forms are $\frac{n(n + 1)}{2}$, $\frac{n(n + 1)(2n + 1)}{6}$ and $\frac{1 - r^n}{1 - r}$.

@viz sigma term=i n=5 | Pick a term and n. Notice how (1/2)^i approaches 1 and 1/i keeps growing.

:::explore
**What to try**
1. With term $i$ and $n = 5$, read the total 15 and compare with $\frac{5\cdot6}{2}$.
2. Raise $n$ to 10: the total becomes 55. Check $\frac{10\cdot11}{2} = 55$.
3. Switch to $i^2$ with $n = 4$: the total is 30, matching the article's expansion.
4. Switch to $2i - 1$: the sums are 1, 4, 9, 16, ... perfect squares. The first $n$ odd numbers add to $n^2$.
5. Switch to $(1/2)^i$ and increase $n$: the total creeps towards 1 but never passes it. Then try $1/i$: it keeps growing, slowly but without limit.

**What to notice:** a closed form predicts the bar-chart total instantly. Geometric terms with ratio below 1 shrink fast enough to converge; $\frac1i$ shrinks too slowly, so its sum diverges.
:::

:::formulas
$$\sum_{i=1}^{n} c = nc\qquad \sum (a_i + b_i) = \sum a_i + \sum b_i\qquad \sum ca_i = c\sum a_i$$
$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}\qquad \sum_{i=1}^{n} i^2 = \frac{n(n+1)(2n+1)}{6}\qquad \sum_{i=1}^{n} i^3 = \left(\frac{n(n+1)}{2}\right)^2$$
$$\sum_{i=0}^{n-1} r^i = \frac{1 - r^n}{1 - r}\qquad \sum_{i=0}^{\infty} r^i = \frac{1}{1 - r}\ (|r| < 1)$$
$$\prod_{i=1}^{n} i = n!\qquad \ln\prod a_i = \sum\ln a_i$$
:::

:::thm Gauss's formula
For every positive integer $n$, $\sum_{i=1}^{n} i = \dfrac{n(n+1)}{2}$.
:::

:::proof
Write $S = 1 + 2 + \cdots + n$ and also backwards, $S = n + (n - 1) + \cdots + 1$. Add the two lines term by term: each of the $n$ columns sums to $n + 1$, so $2S = n(n + 1)$.
:::

:::thm Geometric series
For $r \ne 1$, $\sum_{i=0}^{n-1} r^i = \dfrac{1 - r^n}{1 - r}$.
:::

:::proof
Let $S = 1 + r + \cdots + r^{n-1}$. Then $rS = r + r^2 + \cdots + r^n$. Subtracting, almost everything cancels: $S - rS = 1 - r^n$, so $S(1 - r) = 1 - r^n$.
:::

:::steps Evaluate $\sum_{i=1}^{20}(4i - 3)$
1. Split: $4\sum i - \sum 3$.
2. $\sum_{i=1}^{20} i = \frac{20\cdot21}{2} = 210$.
3. $4(210) - 3(20) = 840 - 60 = 780$.
:::

:::steps Evaluate $\sum_{k=1}^{6} 3\cdot2^{k-1}$
1. Factor: $3\sum_{k=1}^{6}2^{k-1} = 3\sum_{j=0}^{5}2^j$.
2. Geometric: $\frac{1 - 2^6}{1 - 2} = 63$.
3. Total: $3\times63 = 189$.
:::

:::steps Write $2 + 6 + 18 + 54 + 162$ in sigma notation and evaluate
1. Each term is 3 times the previous, starting at 2: term $2\cdot3^i$ for $i = 0$ to 4.
2. $\sum_{i=0}^{4}2\cdot3^i = 2\cdot\frac{1 - 3^5}{1 - 3} = 2\cdot121 = 242$.
:::

:::mock Exam question
Find $\sum_{i=1}^{10}(i^2 - 2i)$.
:::solution
Split: $\sum i^2 - 2\sum i = \frac{10\cdot11\cdot21}{6} - 2\cdot\frac{10\cdot11}{2} = 385 - 110 = 275$.
:::
:::

:::real
- **Saving:** putting away 1, 2, 3, ... dollars per week for 52 weeks totals 1378 dollars.
- **Mortgages and loans:** the total of regular payments with interest is a geometric sum.
- **Sport:** a ball dropped from 2 m that bounces back to half its height travels $2 + 2(1 + \frac12 + \frac14 + \cdots) = 2 + 2\cdot2 = 6$ m in total.
:::

:::ml
The mean is $\bar x = \frac1n\sum x_i$ and mean squared error is $\frac1n\sum(y_i - \hat y_i)^2$. A neuron computes $\sum_i w_ix_i + b$, and a dot product $w\cdot x = \sum w_ix_i$. The likelihood $\prod_i p(x_i)$ becomes the log-likelihood $\sum_i\ln p(x_i)$.
:::

:::cs
A sum is a loop: `total = 0; for i in range(1, n + 1): total += i`. Closed forms replace $O(n)$ loops with $O(1)$ formulas. Nested loops over $i < j$ do $\sum_{j=1}^{n}(j - 1) = \frac{n(n - 1)}{2}$ comparisons, which is why simple sorting algorithms are $O(n^2)$.
:::

:::quiz
? Evaluate $\sum_{i=1}^{5}(2i)$.
= 30
> $2(1 + 2 + 3 + 4 + 5)$.

? Evaluate $\sum_{i=1}^{100} i$.
= 5050
> $\frac{100\cdot101}{2}$.

? How many terms are in $\sum_{k=4}^{12} a_k$?
= 9
> $12 - 4 + 1$.

? Evaluate $\sum_{i=1}^{7} 5$.
= 35
> Seven copies of 5.

? Evaluate $\prod_{i=1}^{4} i$.
= 24
> $1\cdot2\cdot3\cdot4 = 4!$.

? Evaluate $\sum_{i=0}^{\infty}\left(\frac13\right)^i$.
= 3/2|1.5
> $\frac{1}{1 - \frac13}$.
:::

## Lesson: Factorials, floor, ceiling, min and max {#special-notation}
@summary: Factorials, floor, ceiling and rounding, the modulo operation, min, max, argmin and argmax, and the everyday symbols of mathematical writing.

### Small symbols, big ideas
Mathematical writing uses a handful of compact symbols that you will see constantly in computer science and machine learning papers. How many ways can 5 people stand in a line? The answer, 120, is written $5!$. How many 4-seat cars do 18 people need? You need $\lceil 18/4\rceil = 5$, rounding up. Which model setting gives the lowest error? That setting is the $\arg\min$ of the error. Each of these symbols captures an idea that would take a sentence to say in words. This article explains them one at a time, with the reasoning behind each and the mistakes to avoid, so that formulas full of them become easy to read.

### Factorials
For a positive whole number $n$, **$n$ factorial** is the product of all whole numbers from 1 to $n$:
$$n! = n\times(n - 1)\times\cdots\times2\times1$$
So $3! = 6$, $4! = 24$ and $5! = 120$. Factorials count arrangements. To line up 5 people, there are 5 choices for the first position, then 4 for the second, 3 for the third, 2 for the fourth and 1 for the last, giving $5\times4\times3\times2\times1 = 120$ orderings.

Factorials satisfy the recursive rule $n! = n\times(n - 1)!$, for example $6! = 6\times120 = 720$. Using it with $n = 1$ gives $1! = 1\times0!$, so we define $0! = 1$. This also matches counting: there is exactly one way to arrange nothing. The recursive rule makes fractions of factorials easy: $\frac{10!}{8!} = 10\times9 = 90$, because everything from 8 down cancels. Factorials grow faster than any exponential: $10! = 3{,}628{,}800$ and $20!$ is about $2.4\times10^{18}$.

:::def Factorial
$n! = 1\cdot2\cdots n$ for $n \ge 1$, and $0! = 1$. It counts the orderings of $n$ distinct objects.
:::

### Floor and ceiling
The **floor** of $x$, written $\lfloor x\rfloor$, is the greatest integer less than or equal to $x$: round down. The **ceiling**, $\lceil x\rceil$, is the least integer greater than or equal to $x$: round up. So $\lfloor 3.7\rfloor = 3$, $\lceil 3.2\rceil = 4$, and integers are unchanged: $\lfloor 5\rfloor = \lceil 5\rceil = 5$.

Be careful with negatives. "Down" means towards $-\infty$, not towards zero, so $\lfloor -2.3\rfloor = -3$ and $\lceil -2.3\rceil = -2$. On a number line, the floor is the integer just to the left (or on the spot), and the ceiling is the integer just to the right.

These functions answer everyday questions. With 18 people and 4-seat cars, $\lceil 18/4\rceil = \lceil 4.5\rceil = 5$ cars are needed. With 50 dollars and 6-dollar tickets you can buy $\lfloor 50/6\rfloor = \lfloor 8.33\rfloor = 8$ tickets. A number $n$ has $\lfloor\log_{10}n\rfloor + 1$ digits.

:::def Floor and ceiling
$\lfloor x\rfloor$ is the greatest integer $\le x$; $\lceil x\rceil$ is the least integer $\ge x$.
:::

@fig g01-step kind=floor x=2.3 | The floor function is a staircase: it is constant on each interval [n, n + 1) and jumps at every integer.

### Rounding and the fractional part
Ordinary rounding goes to the nearest integer. With halves rounded up, $\text{round}(x) = \lfloor x + 0.5\rfloor$: $\text{round}(2.5) = 3$ and $\text{round}(2.4) = 2$. (Some software, including Python's `round`, rounds halves to the nearest even number to avoid bias, so `round(2.5)` gives 2.) The **fractional part** $x - \lfloor x\rfloor$ is what is left after removing the floor; it is always in $[0, 1)$. For $x = 3.75$ it is $0.75$, and for $x = -1.25$ it is $-1.25 - (-2) = 0.75$.

### Remainders and mod
Floor division connects to remainders. Dividing $a$ by a positive integer $n$ gives quotient $\lfloor a/n\rfloor$ and remainder
$$a \bmod n = a - n\lfloor a/n\rfloor$$
So $17 \bmod 5 = 17 - 5\cdot3 = 2$, and $-7 \bmod 3 = -7 - 3\lfloor -2.33\rfloor = -7 + 9 = 2$. Clock arithmetic is mod 12: 5 hours after 10 o'clock is $15 \bmod 12 = 3$ o'clock. A number is even exactly when $n \bmod 2 = 0$.

:::def Modulo
$a \bmod n$ is the remainder $r$ with $0 \le r < n$ when $a$ is divided by $n$.
:::

### min, max, argmin and argmax
$\min(a, b)$ is the smaller of two numbers and $\max(a, b)$ the larger: $\min(3, 8) = 3$, $\max(-2, -5) = -2$. For a set or list, $\max\{4, 9, 1, 7\} = 9$. For a function, $\max_x f(x)$ is its largest value: $\max_{x}\left(-(x - 2)^2 + 5\right) = 5$.

Often we care not about the best **value** but **where** it occurs. That is $\arg\max$: the input that gives the maximum. For $f(x) = -(x - 2)^2 + 5$, the maximum value is 5, but $\arg\max_x f(x) = 2$. In machine learning, training finds $\arg\min_w L(w)$, the weights that minimise the loss; the minimum loss value itself is less interesting than the weights that achieve it. Similarly, a classifier predicts $\arg\max_k p_k$, the class with the highest probability.

Useful identities include $\max(a, b) = -\min(-a, -b)$ and $\min(a, b) + \max(a, b) = a + b$. The ReLU function is $\max(0, x)$, and absolute value is $|x| = \max(x, -x)$.

:::def Argmax
$\arg\max_x f(x)$ is the input $x$ at which $f$ reaches its maximum value (and $\arg\min$ likewise for the minimum).
:::

### Other symbols worth knowing
A few more appear constantly. $\approx$ means "approximately equal", as in $\pi \approx 3.14$. $:=$ means "is defined as". $\propto$ means "is proportional to": $y \propto x$ means $y = kx$ for some constant $k$. $\in$ means "is an element of": $3 \in \mathbb{Z}$. $\forall$ reads "for all" and $\exists$ reads "there exists". $\implies$ means "implies", and $\iff$ means "if and only if". $\pm$ means plus or minus. Learning to read these aloud turns a dense line of symbols into an ordinary sentence.

### Reading a formula aloud
Here is a line you might meet in a machine learning paper: $\hat y = \arg\max_{k \in \{1, \ldots, K\}} p_k$. Read aloud, it says "the predicted label is the class $k$, from 1 to $K$, whose probability $p_k$ is largest". Another example is $n_{\text{batches}} = \lceil N/B\rceil$: "the number of batches is the number of examples divided by the batch size, rounded up", because a final partial batch still has to be processed. Practising this kind of translation is the fastest way to become comfortable with notation.

### Common mistakes
$\lfloor -2.3\rfloor$ is $-3$, not $-2$; floors of negatives move away from zero. $0!$ is 1, not 0. $\frac{n!}{(n-1)!} = n$, not 1 or $(n - 1)$. And $\max$ and $\arg\max$ are different things: one is the best output, the other the input that produces it.

### Summary
$n!$ multiplies the integers up to $n$ and counts orderings, with $0! = 1$. Floor rounds down, ceiling rounds up, and both treat negatives by moving along the number line. $a \bmod n = a - n\lfloor a/n\rfloor$ is the remainder. $\max$ and $\min$ give extreme values, while $\arg\max$ and $\arg\min$ give where they occur.

@viz g01-step kind=floor x=2.3 | Choose floor, ceiling, rounding or fractional part and drag x.

:::explore
**What to try**
1. With floor and $x = 2.3$, read $\lfloor 2.3\rfloor = 2$. Drag $x$ up to 2.9: still 2. At 3.0 it jumps to 3.
2. Drag $x$ to $-2.3$. The floor is $-3$, the integer to the left, as in the article.
3. Switch to ceiling at $x = -2.3$: the answer is $-2$. Compare with floor: they differ by 1 except at integers.
4. Switch to round and check $x = 2.5$ goes to 3 while $2.4$ goes to 2.
5. Switch to fractional part. The sawtooth climbs from 0 towards 1 on every interval and never reaches 1.

**What to notice:** each step graph is constant between integers and jumps at integers. The filled and open dots show which side of each jump includes the endpoint, which is exactly the "less than or equal" in the definitions.
:::

:::formulas
$$n! = n(n - 1)!\qquad 0! = 1\qquad \frac{n!}{k!} = n(n - 1)\cdots(k + 1)$$
$$\lfloor x\rfloor \le x < \lfloor x\rfloor + 1\qquad \lceil x\rceil - 1 < x \le \lceil x\rceil$$
$$\lceil x\rceil = -\lfloor -x\rfloor\qquad \text{round}(x) = \lfloor x + \tfrac12\rfloor$$
$$a \bmod n = a - n\left\lfloor\tfrac an\right\rfloor$$
$$\max(a, b) = \frac{a + b + |a - b|}{2}\qquad \min(a, b) = \frac{a + b - |a - b|}{2}$$
:::

:::thm Number of orderings
There are exactly $n!$ ways to arrange $n$ distinct objects in a row.
:::

:::proof
There are $n$ choices for the first position. For each, $n - 1$ objects remain for the second position, then $n - 2$, and so on until 1 remains. By the multiplication principle, the total is $n(n - 1)\cdots1 = n!$.
:::

:::steps Evaluate $\dfrac{8!}{5!\,3!}$
1. Cancel: $\frac{8!}{5!} = 8\cdot7\cdot6 = 336$.
2. $3! = 6$.
3. $\frac{336}{6} = 56$. (This counts the ways to choose 3 items from 8.)
:::

:::steps Compute $\lfloor -4.5\rfloor + \lceil 2.1\rceil - \lfloor 7\rfloor$
1. $\lfloor -4.5\rfloor = -5$.
2. $\lceil 2.1\rceil = 3$.
3. $\lfloor 7\rfloor = 7$.
4. Total: $-5 + 3 - 7 = -9$.
:::

:::steps For $f(x) = x^2 - 6x + 10$, find $\min_x f(x)$ and $\arg\min_x f(x)$
1. Complete the square: $f(x) = (x - 3)^2 + 1$.
2. The square is smallest (0) at $x = 3$.
3. So $\arg\min f = 3$ and $\min f = 1$.
:::

:::mock Exam question
A file of 1,000,000 bytes is sent in packets of at most 1500 bytes. How many packets are needed, and how many bytes are in the last one?
:::solution
Packets: $\lceil 1000000/1500\rceil = \lceil 666.67\rceil = 667$. The first 666 packets carry $666\times1500 = 999{,}000$ bytes, so the last one carries $1000000 \bmod 1500 = 1000$ bytes.
:::
:::

:::real
- **Parking:** a car park charging per started hour bills $\lceil t\rceil$ hours; 2 hours 10 minutes costs 3 hours.
- **Ages:** your age in whole years is $\lfloor\text{days lived}/365.25\rfloor$.
- **Scheduling:** 26 students in teams of 4 make $\lfloor 26/4\rfloor = 6$ full teams with $26 \bmod 4 = 2$ left over.
:::

:::cs
Integer division `a // b` is the floor of $\frac ab$ in Python, and `a % b` is $a \bmod b$. Pagination needs $\lceil n/k\rceil$ pages, and array index wrapping uses `i % n`. Brute force over all orderings of $n$ items costs $n!$, which is why the travelling salesman problem is hard.
:::

:::ml
Classifiers predict $\hat y = \arg\max_k p_k$, and training is $w^* = \arg\min_w L(w)$. ReLU is $\max(0, x)$, max-pooling takes the max over a window, and gradient clipping uses $\min(\max(g, -c), c)$. Quantising weights to integers uses rounding and floor.
:::

:::quiz
? Evaluate $5!$.
= 120
> $5\cdot4\cdot3\cdot2\cdot1$.

? Evaluate $\lfloor -1.5\rfloor$.
= -2
> The greatest integer less than or equal to $-1.5$.

? Evaluate $\lceil 7.01\rceil$.
= 8
> Round up to the next integer.

? Evaluate $23 \bmod 6$.
= 5
> $23 = 6\cdot3 + 5$.

? For $f(x) = -(x - 4)^2 + 9$, what is $\arg\max_x f(x)$?
= 4
> The maximum value 9 occurs at $x = 4$.

? Evaluate $\dfrac{7!}{6!}$.
= 7
> $7! = 7\cdot6!$.
:::

