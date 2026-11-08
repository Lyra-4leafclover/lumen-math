---
id: combinatorics
title: Combinatorics
tagline: The art of counting without listing: permutations, combinations, binomials, recurrences and generating functions.
desc: Counting is the hidden engine behind probability, algorithm analysis and cryptography. You'll learn the sum and product rules, permutations and combinations, the binomial and multinomial theorems, stars and bars, inclusion-exclusion, the pigeonhole principle, derangements, recurrence relations, generating functions and the Catalan numbers.
color: #eab308
symbol: n!
area: Discrete math
paths: cs, ml
order: 15
---

# Unit: The basic counting rules

## Lesson: The sum and product rules {#counting-principles}
@summary: Count choices made one after another (multiply) or instead of each other (add), and count the complement when that is easier.

### Why learn to count all over again?
You have been counting since you were two years old, so a whole course on counting may sound strange. But the counting in this course is different. Nobody wants to list every possible password, every possible poker hand or every possible route through a city and then count the list. There are far too many. Combinatorics is the skill of finding *how many* without writing them all down.

This matters everywhere in computer science and machine learning. To know whether a brute-force search will finish before the universe ends, you have to count the cases. To compute a probability like "the chance of drawing two aces", you count the good outcomes and divide by all outcomes. To know how secure a password is, you count how many passwords an attacker must try. Almost every formula in this course grows out of two simple rules, which this lesson builds carefully.

### Imagine a small café
Imagine a café with a tiny menu: 3 soups, 4 main dishes and 2 desserts. You are hungry, but only a little, so you decide to order exactly one dish, either a soup or a main. How many different orders can you make? You can pick any of the 3 soups, or any of the 4 mains. The two groups don't overlap (no dish is both a soup and a main), so you have $3 + 4 = 7$ choices.

The next day you are very hungry and order a full meal: one soup **and** one main **and** one dessert. Now the count is very different. For each of the 3 soups you can pair any of the 4 mains, giving $3 \times 4 = 12$ soup-and-main pairs. For each of those 12 pairs you can add either of the 2 desserts, giving $12 \times 2 = 24$ full meals.

Those two situations are the two basic rules of counting. The word "or" (choose one thing from several separate groups) leads to adding. The word "and" (make several choices in a row) leads to multiplying.

### The sum rule
Suppose a task can be done in one of several ways, and the ways fall into groups that do not overlap. If the first group has $m$ options and the second has $n$ options, the total number of options is $m + n$. In set language, if $A$ and $B$ are **disjoint** sets (they share no elements), then $|A \cup B| = |A| + |B|$, where $|A|$ means the number of elements of $A$.

The rule extends to any number of groups. If a student may pick one elective from 5 art courses, 7 science courses or 3 language courses, and no course is listed twice, there are $5 + 7 + 3 = 15$ possible electives.

:::def Sum rule
If a choice can be made from one of several pairwise disjoint groups of sizes $n_1, n_2, \dots, n_k$, the number of possible choices is $n_1 + n_2 + \dots + n_k$.
:::

### The product rule
Now suppose a task is done in stages. Stage one can be done in $m$ ways, and **no matter what you chose in stage one**, stage two can be done in $n$ ways. Then the whole task can be done in $m \times n$ ways.

The phrase "no matter what you chose" is important. It means the *number* of options in stage two is always the same, even if the options themselves change. That is exactly what happens when you pick a president and then a vice-president from a club of 10 people. There are 10 choices for president. Whoever wins, 9 people remain for vice-president. The second stage always has 9 options, so there are $10 \times 9 = 90$ ways to fill both posts, even though which 9 people are available depends on the first choice.

A picture helps. Draw a **decision tree**: a root, one branch for each first choice, then from the end of every branch one new branch for each second choice. Every path from the root to a leaf is one complete outcome. If every node at the first level has the same number of children, the leaves can be counted level by level, which is just multiplication.

@fig graph graph=tree alg=bfs | A decision tree. Each level is one stage of choices and each leaf is one complete outcome; counting leaves level by level is the product rule.

:::def Product rule
If a procedure has $k$ stages and stage $i$ can always be done in $n_i$ ways regardless of earlier choices, the whole procedure can be done in $n_1 \cdot n_2 \cdots n_k$ ways.
:::

### Strings: the product rule in action
A **string** of length $k$ over an alphabet of $n$ symbols is a sequence of $k$ symbols. Each position is a stage with $n$ choices, so there are $n^k$ strings. A bit is a binary digit, either 0 or 1, so there are $2^3 = 8$ bit strings of length 3: 000, 001, 010, 011, 100, 101, 110, 111. A 4-digit PIN has $10^4 = 10{,}000$ possibilities. A password of 8 lowercase letters has $26^8 \approx 2.09 \times 10^{11}$ possibilities.

Notice how quickly these numbers grow. Adding one more position multiplies the count by the alphabet size. That is why each extra character makes a password much harder to guess.

### Counting the complement
Sometimes the thing you want is messy but its opposite is easy. How many 4-digit PINs have **at least one repeated digit**? Counting "at least one repeat" directly means handling one repeat, two repeats, three of a kind and so on. Instead count the PINs with **no** repeats: $10 \times 9 \times 8 \times 7 = 5040$. Every PIN either has a repeat or doesn't, so the answer is $10{,}000 - 5040 = 4960$. This trick, "total minus the bad ones", is called **complementary counting**, and you will use it constantly.

### When the groups overlap: the subtraction rule
The sum rule needs disjoint groups. If the groups overlap, adding counts the shared items twice. The fix is to subtract them once: $|A \cup B| = |A| + |B| - |A \cap B|$. For example, how many bit strings of length 8 start with 1 **or** end with 00? Strings starting with 1: the other 7 bits are free, $2^7 = 128$. Strings ending in 00: the first 6 bits are free, $2^6 = 64$. Strings doing both: 5 free middle bits, $2^5 = 32$. So the answer is $128 + 64 - 32 = 160$. This idea grows into the full inclusion-exclusion principle later in the course.

### The division rule
One more tool. If every outcome you care about appears exactly $d$ times in an easier count, divide by $d$. Seating 4 people around a round table, where only who sits next to whom matters, gives $4! = 24$ seatings in a row, but each round arrangement appears 4 times (once for each rotation), so there are $24 / 4 = 6$ round seatings.

:::warn Common mistakes
Multiplying when the number of options at a stage depends on earlier choices in a way you haven't accounted for. Adding groups that overlap, which double counts. Forgetting that "at least one" problems are usually easiest by complement. And confusing "or" with "and": one dish *or* another adds, one dish *and* another multiplies.
:::

### Summary
Separate, non-overlapping alternatives add. Stages made one after another multiply, as long as each stage always has the same number of options. When groups overlap, subtract what you counted twice. When something is hard to count, count its complement or count an easier set where each target appears equally often and divide. Every later formula in this course, from $n!$ to the binomial coefficients, is these rules applied cleverly.

@viz binary bits=4 value=5 | Each bit is one stage with two choices. Flip bits to walk through all the strings.

:::explore
**What to try**
1. Starting from 0000, press **+1** repeatedly and count how many different patterns appear before you return to 0000.
2. Change the number of bits in your head: with 4 bits you saw 16 patterns. Predict 5 bits.
3. Freeze the first bit at 1 and count only patterns that begin with 1.

**What to notice:** every bit doubles the number of patterns, which is the product rule $2 \times 2 \times 2 \times 2 = 2^4 = 16$. Fixing one bit removes one stage of choice and halves the count to $2^3 = 8$, the same reasoning used for "strings that start with 1" in the article.
:::

@viz venn | Set P(A), P(B) and their overlap, then compare A ∪ B with A + B.

:::explore
**What to try**
1. Slide the overlap $P(A \cap B)$ to 0, so the circles are disjoint.
2. Now raise the overlap and watch the union shrink compared with $P(A) + P(B)$.

**What to notice:** when the overlap is 0, the union is just the sum (the sum rule). When the circles overlap, the shared part would be counted twice, so it is subtracted once. The same formula holds for counts as for probabilities.
:::

:::formulas
$$|A\cup B| = |A| + |B| \quad\text{if } A\cap B = \emptyset$$
$$|A_1\times A_2\times\cdots\times A_k| = |A_1|\,|A_2|\cdots|A_k|$$
$$\#\{\text{strings of length } k \text{ over } n \text{ symbols}\} = n^k$$
$$|A\cup B| = |A| + |B| - |A\cap B|$$
$$\#\text{good} = \#\text{all} - \#\text{bad}$$
:::

:::thm Product rule for Cartesian products
For finite sets $A$ and $B$, $|A\times B| = |A|\cdot|B|$, where $A\times B$ is the set of ordered pairs $(a, b)$ with $a\in A$, $b\in B$.
:::

:::proof
Group the pairs by their first coordinate. For each fixed $a\in A$ the pairs $(a, b)$ form a group of exactly $|B|$ pairs, one for each $b$. There are $|A|$ such groups, and they are disjoint because pairs with different first coordinates are different. By the sum rule the total is $|B| + |B| + \dots + |B|$ ($|A|$ times) $= |A|\cdot|B|$. Induction on the number of factors extends this to $k$ sets.
:::

:::steps How many license plates have 3 letters followed by 3 digits?
1. There are 6 stages: three letter positions and three digit positions.
2. Each letter position has 26 options and each digit position has 10, whatever was chosen before.
3. Product rule: $26 \cdot 26 \cdot 26 \cdot 10 \cdot 10 \cdot 10 = 17{,}576 \cdot 1000 = 17{,}576{,}000$.
:::

:::steps How many 4-digit PINs have at least one repeated digit?
1. Total PINs: $10^4 = 10{,}000$.
2. Count the complement, PINs with all digits different: $10 \cdot 9 \cdot 8 \cdot 7 = 5040$.
3. Subtract: $10{,}000 - 5040 = 4960$.
:::

:::steps How many bit strings of length 8 start with 1 or end with 00?
1. Start with 1: 7 free bits, $2^7 = 128$.
2. End with 00: 6 free bits, $2^6 = 64$.
3. Both: 5 free bits, $2^5 = 32$, counted in both groups.
4. Subtraction rule: $128 + 64 - 32 = 160$.
:::

:::mock Exam question
How many positive divisors does $720$ have?
:::solution
Factor: $720 = 2^4\cdot 3^2\cdot 5$. A divisor is $2^a 3^b 5^c$ with $0\le a\le 4$, $0\le b\le 2$, $0\le c\le 1$. Choosing a divisor means choosing $a$ (5 ways), $b$ (3 ways) and $c$ (2 ways) independently, so by the product rule there are $5\cdot 3\cdot 2 = 30$ divisors.
:::
:::

:::ml
**Grid search.** Tuning 4 learning rates, 3 batch sizes and 5 network depths gives $4\cdot3\cdot5 = 60$ training runs. Every new hyperparameter multiplies the cost, which is why random search and Bayesian optimisation replaced full grids. **Hypothesis spaces.** With $n$ binary features there are $2^n$ possible inputs and $2^{2^n}$ possible yes/no classifiers, a count that explains why learning needs assumptions (inductive bias).
:::

:::cs
An $n$-bit register holds $2^n$ values, so 32-bit addresses reach $2^{32}\approx 4.3$ billion bytes and IPv6 uses 128 bits. Security people measure passwords in bits of entropy: a random 8-character password over 62 symbols has $62^8\approx 2^{47.6}$ possibilities, so about 47.6 bits.
:::

:::real
A clothing store advertises "over 100 outfits" from 6 shirts, 4 pairs of trousers and 5 pairs of shoes: $6\cdot4\cdot5 = 120$. Car license plates, phone numbers and lottery tickets are all designed with the product rule so that there are enough distinct codes for everyone.
:::

:::quiz
? You own 5 shirts and 3 pairs of trousers. How many shirt-and-trousers outfits are there?
= 15
> Two stages, 5 and 3 options: $5\cdot 3 = 15$.

? A reading list has 4 novels and 6 comics (no book is both). You read exactly one book. How many choices do you have?
= 10
> "One from this group or one from that group", disjoint groups: sum rule $4 + 6 = 10$.

? How many 3-letter strings over the 26-letter alphabet have no repeated letter?
= 15600
> $26\cdot 25\cdot 24 = 15{,}600$. Each stage has one fewer option, but always the same number.

? How many strings of length 4 over $\{a, b\}$ contain at least one $a$?
= 15
> Complement: all $2^4 = 16$ strings minus the single string bbbb.

? 30 students take French, 25 take Spanish and 10 take both. How many take at least one of the two?
- 55
+ 45
- 35
- 65
> $30 + 25 - 10 = 45$. The 10 who take both were counted twice.

? Which rule fits "choose a soup and then a dessert"?
- Sum rule
+ Product rule
- Division rule
> "And then" means stages, so multiply.
:::

## Lesson: Permutations {#permutations}
@summary: Arrangements where order matters: factorials, k-permutations, repetition and circular arrangements.

### Order matters
Picture the final of a 100 m race with 8 runners. A sports website wants to show every possible podium: who wins gold, who wins silver and who wins bronze. Alice gold and Bob silver is a different podium from Bob gold and Alice silver. When the **order** of the chosen objects matters, we are counting **permutations**. This lesson builds the formulas for permutations from the product rule, so you will never need to memorise them blindly.

Permutations appear whenever things are ranked, scheduled, queued or seated. A playlist is a permutation of songs. A route that visits every city once is a permutation of the cities. Sorting a list means finding the right permutation of its elements. Being able to count permutations tells you, for example, why trying every route of a travelling salesperson is hopeless beyond about 15 cities.

### Arranging everything: factorials
Start with the simplest question. In how many orders can you arrange 4 different books on a shelf? Fill the shelf from left to right. The first slot can hold any of the 4 books. Whichever you chose, 3 books are left for the second slot, then 2 for the third, and the last book goes in the last slot. By the product rule there are $4\cdot3\cdot2\cdot1 = 24$ orders.

This product appears so often that it has a name and a symbol. The **factorial** of $n$, written $n!$ and read "$n$ factorial", is
$$n! = n\cdot(n-1)\cdot(n-2)\cdots 2\cdot 1.$$
So $1! = 1$, $2! = 2$, $3! = 6$, $4! = 24$, $5! = 120$ and $10! = 3{,}628{,}800$. In words: **there are $n!$ ways to arrange $n$ different objects in a row.**

What about $0!$? There is exactly one way to arrange zero objects: do nothing. So we define $0! = 1$. This also keeps formulas tidy, because $n! = n\cdot(n-1)!$ holds for $n = 1$ only if $0! = 1$.

:::def Factorial
For a whole number $n\ge 1$, $n! = n(n-1)\cdots 2\cdot 1$, and $0! = 1$. It counts the arrangements of $n$ distinct objects in a row.
:::

### Arranging only some: k-permutations
Back to the race. We don't arrange all 8 runners, only the first 3 places. Gold can go to any of 8 runners, silver to any of the 7 others, bronze to any of the 6 left: $8\cdot7\cdot6 = 336$ podiums. We stopped the factorial early, after 3 factors.

In general, a **$k$-permutation** of $n$ objects is an ordered selection of $k$ different objects out of $n$. The number of them is written $P(n, k)$ (some books write $_nP_k$ or $n^{\underline k}$):
$$P(n, k) = n(n-1)(n-2)\cdots(n-k+1) = \frac{n!}{(n-k)!}.$$
The fraction form works because dividing $n!$ by $(n-k)!$ cancels exactly the factors we didn't use: $\frac{8!}{5!} = \frac{8\cdot7\cdot6\cdot5!}{5!} = 336$. Check the extremes: $P(n, n) = \frac{n!}{0!} = n!$ (arrange everyone), and $P(n, 1) = n$ (pick one person for one post).

:::def Permutation
An ordered arrangement of distinct objects. A $k$-permutation of an $n$-set is an ordered list of $k$ different elements; there are $P(n,k) = \frac{n!}{(n-k)!}$ of them.
:::

### Repetition allowed
If objects can be reused, every stage has the full $n$ options and the count is $n^k$, as you saw with strings. A 3-character code using the letters A, B, C, D with repetition has $4^3 = 64$ possibilities; without repetition it has $P(4,3) = 24$. Always ask: **can a choice be repeated?** That single question decides between $n^k$ and $P(n,k)$.

### Restrictions: blocks and gaps
Real problems add conditions. Suppose 5 books must be arranged and two particular books, a two-volume novel, must stand next to each other. Glue the two volumes together into a single block. Now we arrange 4 objects (the block and the other 3 books) in $4! = 24$ ways, and inside the block the volumes can be in 2 orders. Total $24\cdot 2 = 48$.

What if two people must **not** sit together? Use the complement: all arrangements minus the ones where they *are* together. For 7 people in a row with A and B kept apart: $7! - 2\cdot 6! = 5040 - 1440 = 3600$.

### Round tables: circular permutations
When people sit around a round table, only their positions relative to each other matter: rotating everyone one seat to the left gives the same seating. Line arrangements number $n!$, and each circular arrangement shows up $n$ times (once per rotation). By the division rule there are $\frac{n!}{n} = (n-1)!$ circular arrangements. Another way to see it: seat one person anywhere to fix the rotation, then arrange the remaining $n - 1$ people in $(n-1)!$ ways. For 6 friends: $5! = 120$.

### How fast factorials grow
Factorials grow faster than any exponential $c^n$. $10!$ is about 3.6 million, $20!$ is about $2.4\times10^{18}$, and $52!$ (the orders of a deck of cards) is about $8\times10^{67}$. Every time you shuffle a deck properly, you almost certainly create an order nobody has ever held before. **Stirling's approximation** gives the size: $n! \approx \sqrt{2\pi n}\,(n/e)^n$. For $n = 10$ it gives about $3{,}598{,}696$, within 1% of the true $3{,}628{,}800$.

:::warn Common mistakes
Using $n!$ when only $k$ positions are filled (use $P(n,k)$). Using $P(n,k)$ when repetition is allowed (use $n^k$). Forgetting the internal arrangements of a glued block. Treating a round table like a row, which overcounts by a factor of $n$. And using permutations when order doesn't matter at all, which is the subject of the next lesson.
:::

### Deciding which formula to use
Most permutation mistakes come from choosing the wrong formula rather than doing the arithmetic badly. A reliable habit is to ask three questions in order. First, **does order matter?** If swapping two chosen objects gives a different outcome (gold and silver swapped, two songs swapped in a playlist), you are counting permutations. Second, **can an object be used more than once?** Digits in a PIN can repeat, runners on a podium cannot. Third, **are all the objects used, or only some?** Arranging every book on a shelf uses all of them; filling 3 medal places from 8 runners uses only some.

The answers map directly onto the formulas. Order matters, no repetition, all used: $n!$. Order matters, no repetition, $k$ used: $P(n,k)$. Order matters, repetition allowed: $n^k$. If order does not matter, none of these apply, and you need the combinations of the next lesson. Try it on "how many 4-letter arrangements of the letters in WORD": order matters, no letter repeats, all four used, so $4! = 24$.

### Summary
A permutation is an arrangement where order matters. $n$ distinct objects can be lined up in $n!$ ways; choosing and ordering $k$ of them gives $P(n,k) = n!/(n-k)!$; with repetition allowed it's $n^k$; around a circle it's $(n-1)!$. Restrictions are handled by gluing objects into blocks or by subtracting the bad arrangements.

@viz counting | Keep "Order matters" selected and change n and k. Every listed string is one k-permutation.

:::explore
**What to try**
1. Set $n = 4$, $k = 2$ and read the list. Find AB and BA: both are present.
2. Increase $k$ to 4 so every item is used. Count the strings and compare with $4! = 24$.
3. Set $n = 6$, $k = 3$ and check the readout against $6\cdot5\cdot4$.

**What to notice:** the list is organised by first letter, then second letter, exactly like the decision tree behind the product rule. When $k = n$ you get the full factorial, and each extra position multiplies by one fewer option, which is why $P(n,k)$ is a "stopped" factorial.
:::

@viz bigo | Compare how n! grows next to 2ⁿ and n².

:::explore
**What to try**
1. Grow $n$ slowly and watch where $n!$ overtakes $2^n$.
2. Push $n$ further and notice the scale needed for $n!$.

**What to notice:** factorial growth is why "try every ordering" algorithms (brute-force travelling salesperson, checking every schedule) become impossible very quickly, exactly as the article's $52!$ example suggests.
:::

:::formulas
$$n! = n(n-1)\cdots 2\cdot 1,\qquad 0! = 1$$
$$P(n,k) = \frac{n!}{(n-k)!}$$
$$\text{with repetition: } n^k \qquad \text{circular: } (n-1)!$$
$$n! \approx \sqrt{2\pi n}\left(\frac ne\right)^n$$
:::

:::thm Number of permutations
The number of orderings of $n$ distinct objects is $n!$, and the number of ordered selections of $k$ of them ($0\le k\le n$) is $\frac{n!}{(n-k)!}$.
:::

:::proof
Fill positions $1, 2, \dots, k$ in order. Position $i$ can hold any object not already used; $i-1$ objects are used, so there are $n-i+1$ options whatever the earlier choices were. By the product rule the count is $n(n-1)\cdots(n-k+1)$, which equals $n!/(n-k)!$ after cancelling. With $k = n$ this is $n!$.
:::

:::thm Sorting lower bound
Any sorting algorithm that only compares pairs of elements needs at least $\lceil\log_2(n!)\rceil$ comparisons in the worst case, and $\log_2(n!) = \Theta(n\log n)$.
:::

:::proof
The algorithm must be able to output any of the $n!$ orderings. Each comparison has two outcomes, so after $c$ comparisons it can distinguish at most $2^c$ cases. We need $2^c\ge n!$, so $c\ge\log_2(n!)$. Since $(n/2)^{n/2}\le n!\le n^n$, $\log_2 n!$ lies between $\frac n2\log_2\frac n2$ and $n\log_2 n$.
:::

:::steps 8 runners race. How many gold-silver-bronze podiums are possible?
1. Order matters (gold differs from silver), no repetition: a 3-permutation of 8.
2. $P(8,3) = 8\cdot7\cdot6 = 336$.
:::

:::steps 5 books, two of them a set that must stand together. How many shelf orders?
1. Glue the pair into one block: now 4 objects.
2. Arrange the 4 objects: $4! = 24$.
3. Arrange the two volumes inside the block: $2! = 2$.
4. Total: $24\cdot 2 = 48$.
:::

:::steps 6 friends sit around a round table. How many seatings, if only relative positions matter?
1. Fix one friend's seat to remove rotations.
2. Arrange the other 5 in the remaining seats: $5! = 120$.
3. Check with the division rule: $6!/6 = 720/6 = 120$.
:::

:::mock Exam question
Seven people, including Ana and Ben, stand in a line. In how many lines are Ana and Ben **not** next to each other?
:::solution
All lines: $7! = 5040$. Lines with Ana and Ben together: glue them into a block, arrange 6 objects in $6! = 720$ ways, times 2 internal orders, giving $1440$. By complementary counting, $5040 - 1440 = 3600$ lines keep them apart.
:::
:::

:::ml
**Permutation invariance.** A set of points has no order, but a neural network sees an ordered list. Models for sets and point clouds (Deep Sets, PointNet) and the attention mechanism without positional encodings give the same output for all $n!$ orderings of the input. **Permutation feature importance** shuffles one column to see how much accuracy drops, and **permutation tests** compare a statistic against its value over random relabelings.
:::

:::cs
Brute-force travelling salesperson tries $(n-1)!/2$ tours: 12 cities already give about 20 million tours, 20 cities about $6\times10^{16}$. The $\Omega(n\log n)$ comparison lower bound for sorting comes straight from counting $n!$ permutations. Generating permutations (Heap's algorithm, next-permutation in C++) is a standard library task.
:::

:::real
Shuffling a playlist of 12 songs can produce $12! = 479{,}001{,}600$ orders. A combination lock is really a "permutation lock": 3 numbers from 0 to 39, repetition allowed, gives $40^3 = 64{,}000$ codes.
:::

:::quiz
? What is $5!$?
= 120
> $5\cdot4\cdot3\cdot2\cdot1 = 120$.

? A club of 6 elects a president and a treasurer (different people). How many outcomes?
= 30
> $P(6,2) = 6\cdot 5 = 30$.

? In how many ways can 5 people sit around a round table (rotations count as the same)?
= 24
> $(5-1)! = 4! = 24$.

? How many 3-character codes can be made from A, B, C, D if letters may repeat?
= 64
> Repetition allowed: $4^3 = 64$.

? What is $0!$?
- 0
+ 1
- undefined
> There is exactly one way to arrange nothing, and $1! = 1\cdot 0!$ requires $0! = 1$.

? Which grows fastest as $n$ gets large?
- $n^3$
- $2^n$
+ $n!$
> Each new factor of $n!$ is $n$, which eventually exceeds any fixed base like 2.
:::

## Lesson: Combinations {#combinations}
@summary: Choosing groups where order doesn't matter: the binomial coefficient, its symmetry, and Pascal's rule.

### When order stops mattering
In the last lesson a podium of gold, silver and bronze was an ordered list. Now imagine a different question about the same 8 runners: the coach picks 3 of them to travel to a competition. There are no medals here. The team {Alice, Bob, Chen} is the same team whichever name the coach writes first. When we choose a **group** and order inside the group doesn't matter, we are counting **combinations**.

Combinations are probably the most useful counting tool there is. Lottery odds, poker hands, committee selections, the number of ways to choose which $k$ of $n$ coin flips came up heads, the number of edges a network could have: all of these are combinations. The answer has its own symbol, $\binom{n}{k}$, read "$n$ choose $k$".

### From permutations to combinations
We already know how to count ordered selections: $P(8,3) = 8\cdot7\cdot6 = 336$ podiums. Every *team* of 3 runners appears in that list several times, once for each way of ordering the team. A team of 3 people can be ordered in $3! = 6$ ways (ABC, ACB, BAC, BCA, CAB, CBA). So the 336 podiums are just the teams, each counted 6 times. By the division rule the number of teams is
$$\frac{336}{6} = 56.$$

The same reasoning works for any $n$ and $k$. Ordered selections number $\frac{n!}{(n-k)!}$, and each unordered group is counted $k!$ times, so
$$\binom{n}{k} = \frac{P(n,k)}{k!} = \frac{n!}{k!\,(n-k)!}.$$
This number is called a **binomial coefficient** (the next lesson explains the name). For small values, cancel before multiplying: $\binom{10}{3} = \frac{10\cdot9\cdot8}{3\cdot2\cdot1} = \frac{720}{6} = 120$.

:::def Combination
An unordered selection of $k$ distinct objects from $n$, in other words a $k$-element subset of an $n$-element set.
:::

:::def Binomial coefficient
$\binom{n}{k} = \frac{n!}{k!(n-k)!}$ for $0\le k\le n$ (and $0$ otherwise): the number of $k$-element subsets of an $n$-element set.
:::

### Small values you should know by heart
There is exactly one way to choose nothing and exactly one way to choose everything, so $\binom{n}{0} = \binom{n}{n} = 1$. There are $n$ ways to choose a single item, so $\binom n1 = n$. And $\binom n2 = \frac{n(n-1)}{2}$ counts pairs. At a party of 8 people where everyone shakes hands with everyone once, there are $\binom82 = 28$ handshakes, because a handshake is an unordered pair of people.

### Symmetry: choosing who stays behind
Choosing 3 runners to travel is the same as choosing 5 runners to stay home: each choice of travellers determines the stay-at-home group and vice versa. So $\binom83 = \binom85 = 56$. In general
$$\binom{n}{k} = \binom{n}{n-k}.$$
You can also see it in the formula, where swapping $k$ and $n-k$ leaves $k!(n-k)!$ unchanged. This is handy for computing: $\binom{100}{98} = \binom{100}{2} = 4950$.

### Pascal's rule: the special-element argument
Here is one of the most important ideas in combinatorics, a **combinatorial proof**: show two expressions are equal by showing they count the same thing.

Take 8 runners and single out one of them, say Alice. Every team of 3 either includes Alice or doesn't. If it includes Alice, we still need 2 more runners from the other 7: $\binom72 = 21$ teams. If it excludes Alice, all 3 come from the other 7: $\binom73 = 35$ teams. These cases don't overlap, so $\binom83 = 21 + 35 = 56$. In general
$$\binom nk = \binom{n-1}{k-1} + \binom{n-1}{k}.$$
This is **Pascal's rule**. Writing the binomial coefficients in rows, with each entry the sum of the two above it, gives **Pascal's triangle**.

@fig pascal | Pascal's triangle. Row n lists the binomial coefficients from (n choose 0) to (n choose n); each entry is the sum of the two entries above it.

### Constraints: at least, at most, exactly
Committee problems often add conditions. From 5 men and 4 women, choose a committee of 3 with **at least one woman**. Direct counting splits into "exactly 1, 2 or 3 women". Complementary counting is faster: all committees $\binom93 = 84$, minus all-men committees $\binom53 = 10$, giving $74$. To check, the direct way: $\binom41\binom52 + \binom42\binom51 + \binom43\binom50 = 40 + 30 + 4 = 74$. When a problem says "exactly $j$ of type A", multiply: choose the A's, then choose the rest, $\binom{a}{j}\binom{b}{k-j}$.

### Lattice paths: a combination in disguise
A robot moves on a grid from $(0,0)$ to $(4,3)$, one step right (R) or up (U) at a time. Every shortest route uses exactly 4 R's and 3 U's in some order, for 7 steps in total. A route is decided completely by *which 3 of the 7 steps are U*. So there are $\binom73 = 35$ routes. Recognising that a counting problem is really "choose positions" is a skill you will use again with binomial expansions and Catalan numbers.

:::warn Common mistakes
Using combinations when order matters (president and treasurer are different jobs, so use $P(n,k)$), or permutations when it doesn't (a hand of cards is a set). Overcounting "at least one" by first picking the guaranteed member and then picking the rest freely: that counts a committee with two women twice. Computing huge factorials instead of cancelling first.
:::

### Checking the formula by listing
Formulas are easier to trust once you have seen them match a list. Take the letters A, B, C, D and choose 2. Listing ordered pairs first gives AB, AC, AD, BA, BC, BD, CA, CB, CD, DA, DB, DC, which is $P(4,2) = 12$. Now cross out every pair that is just a reordering of an earlier one: BA repeats AB, CA repeats AC, and so on. Six survive: AB, AC, AD, BC, BD, CD. The formula says $\binom42 = \frac{12}{2!} = 6$. Each unordered pair appeared exactly twice in the ordered list, because two letters can be ordered in $2! = 2$ ways, and that is precisely why we divide.

The same picture explains why the denominator has *two* factorials. The $k!$ removes the orderings of the chosen items, and the $(n-k)!$ is left over from the permutation formula, where it removed the orderings of the items we did not use. You can think of $\binom nk$ as "arrange all $n$ items in a row, then declare the first $k$ chosen and the rest not chosen"; rearranging inside either block changes nothing, so divide by both $k!$ and $(n-k)!$.

### Summary
A combination is a subset: order doesn't matter. Divide the ordered count by the $k!$ orderings of each group to get $\binom nk = \frac{n!}{k!(n-k)!}$. Binomial coefficients are symmetric, satisfy Pascal's rule, and secretly count lattice paths, bit strings with $k$ ones and many other things. "Is order important?" is the first question to ask in every counting problem.

@viz counting | Switch between "Order matters" and "Order doesn't" with the same n and k.

:::explore
**What to try**
1. Set $n = 4$, $k = 2$ with order mattering, then switch to combinations.
2. Count how many strings disappear: AB and BA collapse into one.
3. Set $k = 3$ and compare the two counts: $24$ versus $4$.

**What to notice:** the combination count is always the permutation count divided by $k!$, because each group of $k$ appears in $k!$ orders. That is the derivation in the article, done live.
:::

@viz pascal | Grow the rows, then color by divisibility.

:::explore
**What to try**
1. Read row 4: 1, 4, 6, 4, 1. Check that $\binom42 = 6$.
2. Pick any interior entry and add the two entries above it.
3. Color multiples of 2 and grow to 32 rows.

**What to notice:** every entry is the sum of the two above it (Pascal's rule from the special-element argument), the rows are symmetric ($\binom nk = \binom n{n-k}$), and the odd entries form a fractal pattern.
:::

:::formulas
$$\binom nk = \frac{n!}{k!(n-k)!} = \frac{P(n,k)}{k!}$$
$$\binom nk = \binom n{n-k} \qquad \binom n0 = \binom nn = 1 \qquad \binom n2 = \frac{n(n-1)}2$$
$$\binom nk = \binom{n-1}{k-1} + \binom{n-1}{k}$$
$$\#\{\text{lattice paths } (0,0)\to(a,b)\} = \binom{a+b}{a}$$
:::

:::thm Pascal's rule
For $1\le k\le n-1$, $\binom nk = \binom{n-1}{k-1} + \binom{n-1}{k}$.
:::

:::proof
Count $k$-subsets of $\{1, \dots, n\}$ by whether they contain $n$. Subsets containing $n$ are formed by choosing the other $k-1$ elements from $\{1,\dots,n-1\}$: $\binom{n-1}{k-1}$. Subsets not containing $n$ choose all $k$ elements from $\{1,\dots,n-1\}$: $\binom{n-1}k$. The two cases are disjoint and cover everything, so the sum rule gives the identity.
:::

:::steps A committee of 3 is chosen from 5 men and 4 women. How many have at least one woman?
1. All committees: $\binom93 = 84$.
2. Committees with no women: $\binom53 = 10$.
3. Complement: $84 - 10 = 74$.
:::

:::steps How many shortest grid paths go from (0,0) to (4,3)?
1. Each path is a word with 4 R's and 3 U's (7 letters).
2. Choose which 3 positions hold U: $\binom73 = \frac{7\cdot6\cdot5}{6} = 35$.
:::

:::steps How many 5-card poker hands are "four of a kind"?
1. Choose the rank that appears four times: 13 ways. All 4 cards of that rank are taken.
2. Choose the fifth card from the other 48 cards: 48 ways.
3. Total: $13\cdot 48 = 624$, out of $\binom{52}5 = 2{,}598{,}960$ hands.
:::

:::mock Exam question
How many 5-card hands are a **full house** (three cards of one rank and two of another)?
:::solution
Choose the rank of the triple: 13 ways; choose 3 of its 4 suits: $\binom43 = 4$. Choose a different rank for the pair: 12 ways; choose 2 of its suits: $\binom42 = 6$. Product rule: $13\cdot4\cdot12\cdot6 = 3744$. (Order of the two ranks matters here because the triple and the pair play different roles, so we don't divide by 2.)
:::
:::

:::ml
**Feature selection** from $n$ features has $2^n$ subsets and $\binom nk$ subsets of size $k$; with $n = 50$, $k = 5$ that is already $2{,}118{,}760$ models, so greedy or regularised methods are used instead. **Shapley values** (SHAP explanations) average a feature's contribution over subsets weighted by binomial coefficients. A contrastive batch of $n$ examples contains $\binom n2$ pairs.
:::

:::cs
A simple undirected graph on $n$ vertices has at most $\binom n2$ edges, and there are $2^{\binom n2}$ such graphs. Brute-force search for a $k$-clique checks $\binom nk$ vertex sets. Python's `math.comb(n, k)` and `itertools.combinations` compute and list combinations.
:::

:::real
In a "6 from 49" lottery the number of tickets is $\binom{49}6 = 13{,}983{,}816$, so one ticket wins with probability about 1 in 14 million. A pizza place offering 10 toppings, choose any 3, has $\binom{10}3 = 120$ different three-topping pizzas.
:::

:::quiz
? What is $\binom52$?
= 10
> $\frac{5\cdot4}{2} = 10$.

? What is $\binom{10}{8}$?
= 45
> By symmetry $\binom{10}8 = \binom{10}2 = \frac{10\cdot9}2 = 45$.

? 8 people each shake hands once with every other person. How many handshakes?
= 28
> A handshake is an unordered pair: $\binom82 = 28$.

? How many shortest grid paths go from (0,0) to (2,2)?
= 6
> Choose which 2 of the 4 steps are "up": $\binom42 = 6$.

? A class of 20 picks a 3-person study group. Does order matter?
- Yes, use $P(20,3)$
+ No, use $\binom{20}{3}$
> A group has no first or second member, so it's a combination: $\binom{20}3 = 1140$.

? Which identity is Pascal's rule?
- $\binom nk = \binom n{n-k}$
+ $\binom nk = \binom{n-1}{k-1}+\binom{n-1}k$
- $\binom nk = n\binom{n-1}{k-1}$
> Split the subsets by whether they contain one special element.
:::

# Unit: Binomial coefficients and their cousins

## Lesson: The binomial theorem {#binomial-theorem}
@summary: Expanding (a + b)ⁿ with binomial coefficients, and the identities that fall out of it.

### Why expand powers at all?
Squaring a sum is something you learned in algebra: $(a+b)^2 = a^2 + 2ab + b^2$. Cubing is more work: $(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$. Raising to the 10th power by repeated multiplication would take ages. The **binomial theorem** gives the answer in one line, and the coefficients that appear are exactly the "$n$ choose $k$" numbers from the last lesson. That's why they are called *binomial* coefficients: they are the coefficients of a power of a binomial (a two-term sum).

This connection between algebra and counting is more than a curiosity. It powers the binomial distribution in probability, error estimates in numerical methods, quick mental approximations like $1.01^{10}\approx 1.1$, and many identities used to analyse algorithms.

### Imagine choosing from brackets
Write $(a+b)^3$ as three brackets multiplied together:
$$(a+b)(a+b)(a+b).$$
To multiply out, you pick **one term from each bracket** (either $a$ or $b$) and multiply your picks; then you add up the results of every possible way of picking. Picking $a, a, a$ gives $a^3$. Picking $b$ from exactly one bracket and $a$ from the other two gives $a^2b$, and there are 3 ways to decide *which* bracket supplies the $b$. Picking $b$ from two brackets gives $ab^2$, again in $\binom32 = 3$ ways. Picking $b$ from all three gives $b^3$ in one way. So
$$(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3.$$
The coefficient of $a^{3-k}b^k$ is the number of ways to choose which $k$ of the 3 brackets give $b$, namely $\binom3k$.

### The binomial theorem
The same argument works for any whole number $n$. In $(a+b)^n$ there are $n$ brackets. A term $a^{n-k}b^k$ arises once for every choice of $k$ brackets supplying $b$, and there are $\binom nk$ such choices. Therefore
$$(a+b)^n = \sum_{k=0}^{n}\binom nk a^{n-k}b^k = \binom n0 a^n + \binom n1 a^{n-1}b + \cdots + \binom nn b^n.$$
The expansion has $n+1$ terms, the powers of $a$ go down while the powers of $b$ go up, and the exponents in each term add to $n$. The coefficients are row $n$ of Pascal's triangle.

For example, $(x+2)^4$ uses row 4, which is 1, 4, 6, 4, 1:
$$(x+2)^4 = x^4 + 4x^3(2) + 6x^2(2^2) + 4x(2^3) + 2^4 = x^4 + 8x^3 + 24x^2 + 32x + 16.$$

:::def Binomial theorem
For any numbers $a, b$ and whole number $n\ge0$, $(a+b)^n = \sum_{k=0}^n\binom nk a^{n-k}b^k$.
:::

### Finding one coefficient without expanding everything
Exams love asking for a single coefficient. To find the coefficient of $x^3$ in $(2x+1)^5$, think "which term has $x^3$?" The general term is $\binom5k(2x)^{k}(1)^{5-k}$, and we need $k = 3$: $\binom53\cdot 2^3 = 10\cdot 8 = 80$. Be careful with signs and constants: the coefficient of $x^2y^3$ in $(x - 2y)^5$ is $\binom53(-2)^3 = 10\cdot(-8) = -80$. The constant goes inside the power along with the variable.

### Identities for free
Plug in special values and the theorem hands you identities.

Put $a = b = 1$: $(1+1)^n = \sum_k\binom nk$, so **each row of Pascal's triangle sums to $2^n$**. That also has a counting meaning: the total number of subsets of an $n$-set (of all sizes) is $2^n$, because each element is either in or out. Row 4: $1+4+6+4+1 = 16 = 2^4$.

Put $a = 1$, $b = -1$: $0 = (1-1)^n = \sum_k(-1)^k\binom nk$ for $n\ge1$. The alternating sum of a row is zero, which means an $n$-set has as many even-sized subsets as odd-sized ones. Row 4: $1 - 4 + 6 - 4 + 1 = 0$.

Two more identities often appear. **Vandermonde's identity** $\sum_j\binom mj\binom n{k-j} = \binom{m+n}k$ says: to choose $k$ people from $m$ women and $n$ men, choose $j$ women and $k-j$ men, over every $j$. The **hockey-stick identity** $\sum_{i=k}^{n}\binom ik = \binom{n+1}{k+1}$ gets its name from its shape in Pascal's triangle: a diagonal run of entries adds up to the entry just below and beside the end of the run.

### Quick approximations
If $x$ is small, the terms with $x^2$, $x^3$ and higher powers are tiny, so $(1+x)^n\approx 1 + nx + \binom n2x^2$. For example, $1.01^{10} = (1 + 0.01)^{10}\approx 1 + 10(0.01) + 45(0.0001) = 1.1045$. The true value is $1.10462\ldots$, so three terms already give four correct digits. This is how compound interest and small error growth are estimated in your head.

:::warn Common mistakes
Writing $(a+b)^n = a^n + b^n$ (the "freshman's dream"); the middle terms are not zero. Forgetting to raise the constant to the power: in $(2x+1)^5$ the $x^3$ coefficient includes $2^3$. Losing negative signs in $(a - b)^n$, where the terms alternate in sign. Counting the expansion as having $n$ terms instead of $n+1$.
:::

### Seeing the theorem as a probability statement
Here is a way to make the theorem feel concrete. Flip a fair coin 4 times and write down the sequence of heads (H) and tails (T). There are $2^4 = 16$ equally likely sequences. How many contain exactly 2 heads? Each such sequence is decided by choosing which 2 of the 4 flips are heads, so there are $\binom42 = 6$ of them: HHTT, HTHT, HTTH, THHT, THTH, TTHH. The probability of exactly 2 heads is therefore $\frac{6}{16} = 0.375$.

Now look at $(T + H)^4$ and pretend the letters are variables. Expanding gives $T^4 + 4T^3H + 6T^2H^2 + 4TH^3 + H^4$. The coefficient 6 in front of $T^2H^2$ is the number of sequences with two tails and two heads. In other words, expanding the power *is* listing all the coin sequences and grouping them by how many heads they contain. If the coin is biased with probability $p$ of heads, replace $H$ by $p$ and $T$ by $1-p$; the terms become the probabilities of 0, 1, 2, 3 and 4 heads, and they must add to $(p + 1 - p)^4 = 1$. This is the binomial distribution, and you will meet it again in the probability course.

### Working through a full expansion carefully
It is worth doing one expansion slowly, because most errors come from rushing. Expand $(3 - x)^3$. Step one: identify $a = 3$ and $b = -x$, keeping the minus sign attached to $b$. Step two: read row 3 of Pascal's triangle, which is 1, 3, 3, 1. Step three: write each term as coefficient times $a$ to a falling power times $b$ to a rising power: $1\cdot 3^3$, then $3\cdot3^2\cdot(-x)$, then $3\cdot 3\cdot(-x)^2$, then $1\cdot(-x)^3$. Step four: simplify each one to get $27 - 27x + 9x^2 - x^3$. Step five: check by substituting an easy value, say $x = 1$, where the original is $2^3 = 8$ and the expansion gives $27 - 27 + 9 - 1 = 8$. The substitution check takes ten seconds and catches almost every slip.

### Summary
Multiplying out $(a+b)^n$ means choosing $a$ or $b$ from each of $n$ brackets, and the number of ways to get $a^{n-k}b^k$ is $\binom nk$. That gives the binomial theorem, Pascal's triangle as its table of coefficients, the identities $\sum_k\binom nk = 2^n$ and $\sum_k(-1)^k\binom nk = 0$, and fast approximations for $(1+x)^n$ when $x$ is small.

@viz pascal | Read off the coefficients of (a + b)ⁿ from row n.

:::explore
**What to try**
1. Find row 5 and write $(a+b)^5$ from it.
2. Add the entries of rows 1 to 6 and list the sums.
3. Look at a diagonal: add 1 + 3 + 6 + 10 and find the total elsewhere in the triangle.

**What to notice:** row sums are $2, 4, 8, 16, 32, 64$, which is $(1+1)^n$; the diagonal sum lands on 20 just below and beside the run, the hockey-stick identity.
:::

@viz distribution kind=binomial | Binomial probabilities are the binomial theorem with a = 1 − p and b = p.

:::explore
**What to try**
1. Set $n = 10$, $p = 0.5$ and compare the bar heights with row 10 of Pascal's triangle divided by $2^{10}$.
2. Move $p$ to 0.2 and watch the bars shift.

**What to notice:** the probability of $k$ successes is $\binom nk p^k(1-p)^{n-k}$, one term of $(p + (1-p))^n$. All the bars add to $1^n = 1$, which is the binomial theorem again.
:::

:::formulas
$$(a+b)^n = \sum_{k=0}^n\binom nk a^{n-k}b^k$$
$$\sum_{k=0}^n\binom nk = 2^n \qquad \sum_{k=0}^n(-1)^k\binom nk = 0\ (n\ge1)$$
$$\sum_j\binom mj\binom n{k-j} = \binom{m+n}k \qquad \sum_{i=k}^n\binom ik = \binom{n+1}{k+1}$$
$$(1+x)^n\approx 1 + nx + \tbinom n2 x^2\ \text{ for small } x$$
:::

:::thm Binomial theorem
For every integer $n\ge0$, $(a+b)^n = \sum_{k=0}^n\binom nk a^{n-k}b^k$.
:::

:::proof
By induction. For $n = 0$ both sides are 1. Assume it for $n$. Then $(a+b)^{n+1} = (a+b)\sum_k\binom nk a^{n-k}b^k$. The coefficient of $a^{n+1-k}b^k$ collects $\binom nk$ (from multiplying by $a$) and $\binom n{k-1}$ (from multiplying by $b$). By Pascal's rule that is $\binom{n+1}k$, which is the claim for $n+1$.
:::

:::steps Expand $(x+2)^4$
1. Row 4 of Pascal's triangle: 1, 4, 6, 4, 1.
2. Terms: $x^4$, $4x^3\cdot2$, $6x^2\cdot4$, $4x\cdot8$, $16$.
3. Result: $x^4 + 8x^3 + 24x^2 + 32x + 16$.
4. Check with $x = 1$: $3^4 = 81$ and $1+8+24+32+16 = 81$.
:::

:::steps Find the coefficient of $x^2y^3$ in $(x - 2y)^5$
1. General term: $\binom5k x^{5-k}(-2y)^k$.
2. We need $y^3$, so $k = 3$ (and then $x^{2}$ automatically).
3. Coefficient: $\binom53(-2)^3 = 10\cdot(-8) = -80$.
:::

:::steps Estimate $1.01^{10}$
1. Write it as $(1 + 0.01)^{10}$.
2. Keep three terms: $1 + 10(0.01) + \binom{10}2(0.01)^2 = 1 + 0.1 + 0.0045$.
3. Estimate $1.1045$; true value $1.104622\ldots$
:::

:::mock Exam question
Prove that $\sum_{k=0}^n k\binom nk = n\,2^{n-1}$.
:::solution
**Counting proof.** Count ways to pick a committee of any size from $n$ people together with a chair who is on the committee. Left side: choose a committee of size $k$ ($\binom nk$ ways), then its chair ($k$ ways), summed over $k$. Right side: choose the chair first ($n$ ways), then decide for each of the other $n-1$ people whether they join ($2^{n-1}$ ways). Both count the same set. **Algebra proof.** Differentiate $(1+x)^n = \sum_k\binom nk x^k$ to get $n(1+x)^{n-1} = \sum_k k\binom nk x^{k-1}$ and set $x = 1$.
:::
:::

:::ml
The **binomial distribution** $P(K = k) = \binom nk p^k(1-p)^{n-k}$ models how many of $n$ independent predictions are correct, how many users click, or how many neurons dropout keeps. It explains why **majority-vote ensembles** help: 5 independent classifiers each 70% accurate give a majority-correct probability of $\sum_{k=3}^5\binom5k0.7^k0.3^{5-k}\approx 0.837$.
:::

:::cs
The number of $n$-bit strings with exactly $k$ ones is $\binom nk$, which sizes the "Hamming ball" in error-correcting codes: a code that fixes 1 error in 7-bit words needs each codeword to own $1 + \binom71 = 8$ words, and the Hamming(7,4) code fits $16\cdot 8 = 128 = 2^7$ exactly.
:::

:::real
If a basketball player makes 80% of free throws, the chance she makes exactly 4 of 5 is $\binom54(0.8)^4(0.2) = 5\cdot0.4096\cdot0.2 = 0.4096$. Bankers use $(1+r)^n\approx 1 + nr$ to estimate small-rate interest.
:::

:::quiz
? What is the coefficient of $x^2$ in $(1+x)^6$?
= 15
> $\binom62 = 15$.

? What is the sum of the entries in row 5 of Pascal's triangle?
= 32
> $(1+1)^5 = 2^5 = 32$.

? How many terms does the expansion of $(a+b)^{10}$ have?
= 11
> $k$ runs from 0 to 10, which is 11 terms.

? What is the constant term of $(x + \frac1x)^4$?
= 6
> The term $\binom4k x^{4-k}x^{-k}$ is constant when $4 - 2k = 0$, so $k = 2$: $\binom42 = 6$.

? What is the coefficient of $x^3$ in $(2x+1)^5$?
= 80
> $\binom53 2^3 = 10\cdot 8 = 80$.

? Which statement is true for every $n\ge1$?
- $(a+b)^n = a^n + b^n$
+ $\sum_k(-1)^k\binom nk = 0$
- $\sum_k\binom nk = n^2$
> Put $a = 1$, $b = -1$ in the binomial theorem.
:::

## Lesson: Multinomial coefficients and repeated objects {#multinomial}
@summary: Arranging objects with repeats, splitting a set into labelled groups, and the multinomial theorem.

### When some objects look the same
How many different "words" can you make by rearranging the letters of BOOK? If all four letters were different, the answer would be $4! = 24$. But the two O's are identical. Swapping them produces exactly the same word, so the list of 24 contains every word twice. The real answer is $\frac{24}{2} = 12$.

This situation is everywhere. A DNA strand has many copies of the same four bases. A schedule might contain three identical "study" blocks and two identical "exercise" blocks. A string of bits has many identical 0's and 1's. Counting arrangements when some objects are indistinguishable leads to **multinomial coefficients**, which generalise binomial coefficients from two kinds of object to any number of kinds.

### Imagine labelling the copies
The cleanest way to reason is to pretend the identical objects are different, count, and then correct for the pretence. Take BANANA: 6 letters with 3 A's, 2 N's and 1 B. Paint the copies so they become distinguishable: $A_1, A_2, A_3, N_1, N_2, B$. Six different symbols can be arranged in $6! = 720$ ways.

Now wash off the paint. Any arrangement of the painted letters looks like the same plain word if we reorder the three A's among themselves ($3! = 6$ ways) or the two N's among themselves ($2! = 2$ ways). So each plain word corresponds to exactly $3!\cdot2!\cdot1! = 12$ painted arrangements. By the division rule the number of distinct words is
$$\frac{6!}{3!\,2!\,1!} = \frac{720}{12} = 60.$$

The famous example is MISSISSIPPI: 11 letters with 1 M, 4 I's, 4 S's and 2 P's, giving $\frac{11!}{1!\,4!\,4!\,2!} = \frac{39{,}916{,}800}{1152} = 34{,}650$ arrangements.

### The general formula
Suppose you arrange $n$ objects of $k$ types, with $n_1$ identical objects of type 1, $n_2$ of type 2, and so on, where $n_1 + n_2 + \dots + n_k = n$. The number of distinct arrangements is the **multinomial coefficient**
$$\binom{n}{n_1, n_2, \dots, n_k} = \frac{n!}{n_1!\,n_2!\cdots n_k!}.$$
When there are only two types, this is the ordinary binomial coefficient: a string of $k$ ones and $n-k$ zeros can be arranged in $\frac{n!}{k!(n-k)!} = \binom nk$ ways, matching the earlier idea of choosing which positions hold the ones.

:::def Multinomial coefficient
$\binom{n}{n_1,\dots,n_k} = \frac{n!}{n_1!\cdots n_k!}$ where $n_1+\dots+n_k = n$: the number of ways to arrange $n$ objects consisting of $n_i$ identical copies of type $i$, or to split $n$ distinct objects into labelled groups of sizes $n_1,\dots,n_k$.
:::

### A second meaning: splitting people into labelled groups
The same number answers a question that looks different. A teacher splits 9 students into a group of 2 for the poster, a group of 3 for the slides and a group of 4 for the demo. Choose the poster group: $\binom92$. From the 7 left, choose the slides group: $\binom73$. The remaining 4 form the demo group: $\binom44 = 1$. Multiplying,
$$\binom92\binom73\binom44 = 36\cdot35\cdot1 = 1260 = \frac{9!}{2!\,3!\,4!}.$$
Why are the two problems the same? Line the 9 students up and give each one a label P, S or D for their task. Assigning tasks is exactly writing a 9-letter word with two P's, three S's and four D's.

### Labelled versus unlabelled groups
Be careful when the groups have no names. Split 6 people into 3 pairs for a tennis practice, where the pairs are not numbered or assigned to courts. If the pairs were labelled (court 1, court 2, court 3) there would be $\frac{6!}{2!\,2!\,2!} = 90$ ways. But with unlabelled pairs, permuting the three pairs among the courts gives the same pairing, so divide by $3! = 6$: there are $15$ pairings. A useful check: person 1 can be paired with any of 5 others, then the smallest unpaired person has 3 choices, then the last two are forced: $5\cdot3\cdot1 = 15$.

The rule: divide by $k!$ for each set of $k$ groups that have the **same size and no labels**. Groups of different sizes are automatically distinguishable by size, so no extra division is needed for them.

### The multinomial theorem
Just as $\binom nk$ appears in $(a+b)^n$, multinomial coefficients appear in powers of longer sums:
$$(x_1 + x_2 + \dots + x_k)^n = \sum_{n_1+\dots+n_k = n}\binom{n}{n_1,\dots,n_k}x_1^{n_1}x_2^{n_2}\cdots x_k^{n_k}.$$
The reason is the same bracket-picking argument. In $(x+y+z)^4$, a term $x^2yz$ appears once for each way to decide which 2 of the 4 brackets supply $x$, which one supplies $y$ and which one supplies $z$. That's the number of arrangements of the word $xxyz$: $\frac{4!}{2!\,1!\,1!} = 12$. So the coefficient of $x^2yz$ is 12.

Setting every $x_i = 1$ shows that the multinomial coefficients with a fixed $n$ and $k$ add up to $k^n$. That's no surprise: assigning each of $n$ people to one of $k$ labelled groups, with any sizes, can be done in $k^n$ ways by the product rule.

### Why dividing is valid
The division rule needs every outcome to be counted the **same** number of times. That holds here: every plain word, whatever it looks like, comes from exactly $n_1!\,n_2!\cdots n_k!$ painted versions, because the paint on each type can be permuted independently. If some outcomes were overcounted more than others, simple division would give the wrong answer, so it is always worth asking "is each outcome repeated equally often?" before you divide.

:::warn Common mistakes
Forgetting a type with a count of 1 is harmless, since $1! = 1$, but forgetting a type with a repeat (like the second O in BOOK) doubles your answer. Dividing by $k!$ for labelled groups, or not dividing for unlabelled equal-size groups. Mixing up "the letters are identical" (divide) with "the people are distinct" (don't).
:::

### Summary
When objects repeat, count as if they were all different and divide by the factorial of each repeat count: $\frac{n!}{n_1!\cdots n_k!}$. The same multinomial coefficient counts splits of $n$ distinct people into labelled groups of given sizes, and it is the coefficient of $x_1^{n_1}\cdots x_k^{n_k}$ in $(x_1+\dots+x_k)^n$. Divide by an extra $k!$ only when $k$ groups of equal size carry no labels.

@viz counting | With order mattering, imagine two of the letters were identical.

:::explore
**What to try**
1. Set $n = 3$, $k = 3$ to list all 6 arrangements of A, B, C.
2. Now pretend B and C are the same letter (call both B). Cross out duplicates in your head: ABC and ACB both become ABB.
3. Count what is left and compare with $\frac{3!}{2!} = 3$.

**What to notice:** each plain word appears $2! = 2$ times in the full list, once for each order of the identical letters. Dividing by the factorial of each repeat count is exactly the "wash off the paint" step in the article.
:::

@viz pascal | The two-type case of the multinomial is the binomial coefficient.

:::explore
**What to try**
1. Find $\binom63 = 20$ in row 6.
2. Compare with the number of words using three A's and three B's: $\frac{6!}{3!3!}$.

**What to notice:** with two types of object, the multinomial coefficient is the entry of Pascal's triangle. Multinomials are the same idea extended to three or more types.
:::

:::formulas
$$\binom{n}{n_1,\dots,n_k} = \frac{n!}{n_1!\,n_2!\cdots n_k!},\qquad n_1+\dots+n_k = n$$
$$(x_1+\dots+x_k)^n = \sum\binom{n}{n_1,\dots,n_k}x_1^{n_1}\cdots x_k^{n_k}$$
$$\sum_{n_1+\dots+n_k=n}\binom{n}{n_1,\dots,n_k} = k^n$$
$$\binom{n}{n_1,\dots,n_k} = \binom n{n_1}\binom{n-n_1}{n_2}\cdots\binom{n_k}{n_k}$$
:::

:::thm Arrangements of a multiset
The number of distinct sequences using exactly $n_i$ copies of symbol $i$ ($i = 1,\dots,k$) is $\frac{n!}{n_1!\cdots n_k!}$.
:::

:::proof
Label the copies to make all $n$ symbols distinct; they have $n!$ arrangements. Map each labelled arrangement to the plain sequence by erasing labels. Two labelled arrangements map to the same sequence exactly when they differ by permuting labels within each type, and there are $n_1!\cdots n_k!$ such permutations. Every plain sequence therefore has the same number of preimages, and the division rule gives the result.
:::

:::steps How many distinct arrangements of BANANA are there?
1. Letters: A three times, N twice, B once; $n = 6$.
2. $\frac{6!}{3!\,2!\,1!} = \frac{720}{12} = 60$.
:::

:::steps Split 9 students into labelled groups of sizes 2, 3 and 4
1. Choose the size-2 group: $\binom92 = 36$.
2. Choose the size-3 group from the remaining 7: $\binom73 = 35$.
3. The last 4 form the size-4 group: 1 way.
4. Total $36\cdot35 = 1260 = \frac{9!}{2!3!4!}$.
:::

:::steps Find the coefficient of $x^2yz$ in $(x+y+z)^4$
1. Exponents $2, 1, 1$ add to 4, so the term exists.
2. Coefficient $\frac{4!}{2!\,1!\,1!} = \frac{24}{2} = 12$.
:::

:::mock Exam question
In how many ways can 6 people be split into 3 unlabelled pairs?
:::solution
Labelled pairs: $\frac{6!}{2!2!2!} = 90$. The 3 pairs have equal size and no labels, so each pairing was counted $3! = 6$ times: $90/6 = 15$. Check directly: person 1 has 5 possible partners, the next unpaired person has 3, the last pair is forced: $5\cdot3 = 15$.
:::
:::

:::ml
The **multinomial distribution** $P(n_1,\dots,n_k) = \frac{n!}{n_1!\cdots n_k!}p_1^{n_1}\cdots p_k^{n_k}$ is the model behind bag-of-words text classifiers and multinomial naive Bayes: a document of $n$ words is $n$ draws from a vocabulary distribution. Class-count histograms of a dataset, dice-like categorical outcomes and the counts produced by sampling from a softmax all follow it.
:::

:::cs
Counting distinct permutations of a string with repeated characters is a classic interview problem; `std::next_permutation` generates exactly the $\frac{n!}{\prod n_i!}$ distinct ones. In information theory, $\log_2\frac{n!}{\prod n_i!}\approx nH(p)$ explains why entropy measures compressibility.
:::

:::real
A hand of 12 cards dealt equally to 3 labelled players can be dealt in $\frac{12!}{4!4!4!} = 34{,}650$ ways. A word game asking "how many words can be formed from the tiles LEVEL" needs $\frac{5!}{2!\,2!\,1!} = 30$.
:::

:::quiz
? How many distinct arrangements of the letters AAB are there?
= 3
> $\frac{3!}{2!} = 3$: AAB, ABA, BAA.

? How many distinct arrangements of LEVEL are there?
= 30
> L twice, E twice, V once: $\frac{5!}{2!2!1!} = 30$.

? What is the coefficient of $abc$ in $(a+b+c)^3$?
= 6
> $\frac{3!}{1!1!1!} = 6$.

? In how many ways can 12 distinct cards be dealt to 3 labelled players, 4 each?
= 34650
> $\frac{12!}{4!\,4!\,4!} = 34{,}650$.

? What is the sum of all coefficients of $(x+y+z)^2$?
= 9
> Set $x=y=z=1$: $3^2 = 9$.

? Splitting people into groups: when must you divide by an extra $k!$?
- Always
+ When $k$ groups have the same size and no labels
- When the groups have different sizes
> Unlabelled groups of equal size can be permuted without changing the split.
:::

## Lesson: Stars and bars {#stars-and-bars}
@summary: Distributing identical objects into distinct boxes, counting integer solutions, and choosing with repetition.

### A different kind of sharing problem
Imagine you have 10 identical chocolates to share among 3 children: Ana, Ben and Cai. The chocolates are all the same, so the only thing that matters is **how many** each child gets. Ana 5, Ben 3, Cai 2 is one way. Ana 0, Ben 0, Cai 10 is another (unfair, but allowed). How many ways are there?

You can't use permutations, because the chocolates are identical. You can't use a single combination either, because a child can get any number, including more than one. This problem, distributing identical objects into distinct boxes, needs a new trick, called **stars and bars**. It is one of the most satisfying ideas in counting, because a confusing problem turns into a simple choice of positions.

Algebraically, the question is: how many solutions does $x_1 + x_2 + x_3 = 10$ have in **non-negative integers** (whole numbers $0, 1, 2, \dots$)? Here $x_1$ is Ana's share, $x_2$ is Ben's and $x_3$ is Cai's. Many counting problems secretly have this shape.

### The picture: stars separated by bars
Draw each chocolate as a star ★. Line up all 10 stars. Now insert 2 bars | to cut the line into 3 pieces: everything left of the first bar goes to Ana, everything between the bars goes to Ben, everything after the second bar goes to Cai. For example
$$\star\star\star\star\star\,|\,\star\star\star\,|\,\star\star \quad\text{means}\quad (5, 3, 2),$$
$$|\,|\,\star\star\star\star\star\star\star\star\star\star \quad\text{means}\quad (0, 0, 10).$$
Every distribution gives exactly one such picture, and every picture gives exactly one distribution. This kind of perfect matching is called a **bijection**, and it means the two sets have the same size.

Now count pictures. Each picture is a row of $10 + 2 = 12$ symbols, of which 10 are stars and 2 are bars. A picture is completely determined by **which 2 of the 12 positions are bars**. So the number of pictures is
$$\binom{12}{2} = 66.$$
There are 66 ways to share the chocolates.

### The general rule
With $n$ identical stars and $k$ boxes, you need $k - 1$ bars, because cutting a line into $k$ sections takes $k - 1$ cuts. The row has $n + k - 1$ symbols, and choosing the positions of the bars gives
$$\#\{(x_1,\dots,x_k)\in\mathbb{Z}_{\ge0}^k : x_1+\dots+x_k = n\} = \binom{n+k-1}{k-1} = \binom{n+k-1}{n}.$$
The two forms are equal by symmetry (choosing bar positions or star positions).

:::def Stars and bars
The bijection between distributions of $n$ identical objects into $k$ distinct boxes and rows of $n$ stars and $k-1$ bars. It shows there are $\binom{n+k-1}{k-1}$ non-negative integer solutions of $x_1+\dots+x_k = n$.
:::

### Every box at least one
Often each box must get **at least one** object: every child gets at least one chocolate. One approach: give each child one chocolate first. That uses $k$ chocolates, leaving $n - k$ to share freely, which gives $\binom{(n-k)+k-1}{k-1} = \binom{n-1}{k-1}$ ways.

A second picture gives the same answer. Line up the $n$ stars; there are $n - 1$ gaps between neighbouring stars. Put each bar in a different gap (never at the ends, never two in the same gap) and every box automatically gets at least one star. Choosing $k-1$ of the $n-1$ gaps gives $\binom{n-1}{k-1}$. For 12 cookies and 4 children, each getting at least one: $\binom{11}3 = 165$.

### Other lower bounds: shift the variables
If each $x_i$ must be at least 2 in $x_1 + x_2 + x_3 = 10$, substitute $y_i = x_i - 2\ge0$. Then $y_1 + y_2 + y_3 = 10 - 6 = 4$, which has $\binom{4+2}{2} = 15$ solutions. The general trick: give each box its minimum first, then distribute what's left freely.

### Choosing with repetition
Stars and bars also counts **multisets**, which are selections where repetition is allowed and order doesn't matter. A donut shop sells 5 kinds of donut, and you buy 3 donuts. Two glazed and one chocolate is one selection; the order you pick them in doesn't matter. Let $x_i$ be the number of donuts of kind $i$. Then $x_1 + \dots + x_5 = 3$, which has $\binom{3+5-1}{3} = \binom73 = 35$ solutions. So the number of ways to choose $r$ items from $n$ kinds with repetition is $\binom{n+r-1}{r}$.

Together with the earlier lessons, this completes the four basic selection formulas:

| | order matters | order doesn't matter |
|---|---|---|
| no repetition | $P(n,r) = \frac{n!}{(n-r)!}$ | $\binom nr$ |
| repetition allowed | $n^r$ | $\binom{n+r-1}{r}$ |

### Upper bounds need more work
If each child can get **at most** 5 chocolates, stars and bars alone isn't enough, but combined with complementary counting it is. Count all distributions, then subtract the ones where some child gets 6 or more (shift that child down by 6 and count again). When two children could both exceed the limit you need inclusion-exclusion, the topic of a later lesson. The mock exam question below works one such problem fully.

:::warn Common mistakes
Using $k$ bars instead of $k - 1$. Using $\binom{n+k-1}{k-1}$ when boxes must be non-empty (use $\binom{n-1}{k-1}$). Applying stars and bars to **distinct** objects: if the chocolates were all different flavours, each of the 10 would independently choose a child, giving $3^{10}$ ways. Stars and bars only works when the objects are identical and the boxes are distinct.
:::

### Checking a stars-and-bars answer
A small case is always worth listing by hand. Splitting $n = 2$ identical sweets between $k = 2$ children gives the formula $\binom{3}{1} = 3$, and the list is (2,0), (1,1), (0,2): three distributions, matching. With the positive version, $\binom{1}{1} = 1$, and indeed only (1,1) gives each child at least one sweet. Checking tiny cases like this catches the most common slip, which is using $\binom{n+k-1}{k}$ instead of $\binom{n+k-1}{k-1}$.

### Summary
To distribute $n$ identical objects into $k$ distinct boxes, draw $n$ stars and $k-1$ bars; choosing the bar positions gives $\binom{n+k-1}{k-1}$. If every box needs at least one, use $\binom{n-1}{k-1}$. Lower bounds are handled by handing out the minimum first, upper bounds by subtracting the overflow cases. The same count gives the number of multisets of size $r$ from $n$ kinds, $\binom{n+r-1}{r}$.

@viz g09-arrange mode=stars n=5 k=3 | Every listing is one row of stars and bars. Change n and k and compare the count with the formula.

:::explore
**What to try**
1. With $n = 5$ stars and $k = 3$ boxes, read a few rows: ★★|★|★★ is $(2, 1, 2)$, and ·|·|★★★★★ is $(0, 0, 5)$.
2. Check the count: $\binom{5+2}{2} = 21$.
3. Press the "at least one each" toggle and compare the new count with $\binom{4}{2} = 6$.
4. Set $k = 2$ and confirm there are $n + 1$ ways (the first box gets $0, 1, \dots, n$).

**What to notice:** each listing has exactly $n$ stars and $k-1$ bars, so listing distributions is the same as choosing bar positions, the bijection from the article. Requiring every box to be non-empty is the same as forbidding bars at the ends or next to each other.
:::

:::formulas
$$\#\{x_1+\dots+x_k = n,\ x_i\ge0\} = \binom{n+k-1}{k-1}$$
$$\#\{x_1+\dots+x_k = n,\ x_i\ge1\} = \binom{n-1}{k-1}$$
$$\text{multisets of size } r \text{ from } n \text{ kinds: } \binom{n+r-1}{r}$$
$$\#\{\text{monomials of degree } d \text{ in } k \text{ variables}\} = \binom{d+k-1}{k-1}$$
:::

:::thm Stars and bars
For integers $n\ge0$, $k\ge1$, the equation $x_1+\dots+x_k = n$ has exactly $\binom{n+k-1}{k-1}$ solutions in non-negative integers.
:::

:::proof
Map a solution $(x_1,\dots,x_k)$ to the string $\star^{x_1}\,|\,\star^{x_2}\,|\cdots|\,\star^{x_k}$, which has $n$ stars and $k-1$ bars. Conversely, any string of $n$ stars and $k-1$ bars determines a solution by counting the stars before the first bar, between consecutive bars, and after the last bar. These maps are inverse to each other, so the sets are the same size. Strings of length $n+k-1$ with $k-1$ bars are counted by choosing the bar positions: $\binom{n+k-1}{k-1}$.
:::

:::steps How many non-negative integer solutions does $x_1+x_2+x_3 = 10$ have?
1. $n = 10$ stars, $k = 3$ boxes, so $2$ bars.
2. $\binom{12}{2} = 66$.
:::

:::steps Solve the same equation with every $x_i\ge2$
1. Substitute $y_i = x_i - 2$, so $y_i\ge0$.
2. New equation: $y_1+y_2+y_3 = 10 - 6 = 4$.
3. $\binom{4+2}2 = \binom62 = 15$.
:::

:::steps 12 identical cookies go to 4 children, each getting at least one. How many ways?
1. At least one each: $\binom{n-1}{k-1}$.
2. $\binom{11}3 = \frac{11\cdot10\cdot9}{6} = 165$.
:::

:::mock Exam question
How many non-negative integer solutions does $x_1+x_2+x_3 = 10$ have with every $x_i\le5$?
:::solution
All solutions: $\binom{12}2 = 66$. Bad solutions have some $x_i\ge6$. If $x_1\ge6$, set $y_1 = x_1-6$: $y_1+x_2+x_3 = 4$ has $\binom62 = 15$ solutions, and the same for $x_2$ and $x_3$. Two variables can't both be at least 6 since $12 > 10$, so nothing is subtracted twice. Answer: $66 - 3\cdot15 = 21$. Check by listing $x_1 = 0,\dots,5$: the counts of $(x_2,x_3)$ are $1, 2, 3, 4, 5, 6$, which add to 21.
:::
:::

:::ml
**Polynomial features.** Expanding $n$ input features into all monomials of degree at most $d$ creates $\binom{n+d}{d}$ features: 10 features with $d = 3$ give $\binom{13}3 = 286$, which is why polynomial kernels compute inner products without building them. The **Dirichlet distribution** and bag-of-words counts live on the set of non-negative integer vectors summing to $n$, exactly the stars-and-bars set.
:::

:::cs
Distributing $n$ identical jobs over $k$ servers, counting multisets of size $r$, or counting the states of $k$ counters whose total is $n$ are stars-and-bars problems. Python can list the compositions with `itertools.combinations(range(n+k-1), k-1)` by choosing bar positions.
:::

:::real
An ice-cream shop with 3 flavours lets you pick a cup of 4 scoops (repeats allowed, order irrelevant): $\binom{4+3-1}{4} = 15$ cups. Allocating a budget of 10 identical tokens among 4 projects can be done in $\binom{13}3 = 286$ ways.
:::

:::quiz
? How many non-negative integer solutions does $x+y+z = 5$ have?
= 21
> $\binom{5+2}2 = 21$.

? How many positive integer solutions does $x+y+z = 5$ have?
= 6
> $\binom{4}{2} = 6$.

? A cup holds 4 scoops from 3 flavours, repeats allowed, order irrelevant. How many cups?
= 15
> Multisets: $\binom{4+3-1}4 = \binom64 = 15$.

? How many monomials of degree exactly 2 are there in 3 variables?
= 6
> $\binom{2+2}2 = 6$: $x^2, y^2, z^2, xy, xz, yz$.

? 10 identical balls go into 2 distinct boxes. How many ways?
= 11
> $\binom{11}1 = 11$: the first box gets 0 to 10.

? 10 **different** balls go into 3 distinct boxes. Which count is right?
- $\binom{12}2$
+ $3^{10}$
- $\binom{10}3$
> Distinct balls each choose a box independently. Stars and bars is only for identical objects.
:::

# Unit: Advanced counting principles

## Lesson: Inclusion-exclusion {#inclusion-exclusion}
@summary: Counting unions of overlapping sets by alternately adding and subtracting intersections; surjections and Stirling numbers.

### The double-counting problem
A school club survey finds that 30 students play football, 25 play basketball and 10 play both. How many students play at least one of the two sports? Adding $30 + 25 = 55$ is wrong, because the 10 students who play both were counted once among the football players and again among the basketball players. Subtracting them once fixes it: $30 + 25 - 10 = 45$.

That small correction is the beginning of a powerful method called the **principle of inclusion-exclusion** (often shortened to PIE or IE). It answers questions of the form "how many objects have at least one of these properties?" and, by complement, "how many have none of them?". It is how we count numbers not divisible by any of several primes, functions that hit every output, arrangements where nothing is in its original place, and much more.

### Two sets
For two finite sets,
$$|A\cup B| = |A| + |B| - |A\cap B|.$$
Think of it as a bookkeeping rule. An element only in $A$ is counted once by $|A|$. An element only in $B$ is counted once by $|B|$. An element in both is counted twice by $|A| + |B|$ and then subtracted once by $|A\cap B|$, so it ends up counted once. Every element of the union is counted exactly once, which is what we want.

### Three sets: add, subtract, add back
Now imagine three sets $A$, $B$, $C$. Start by adding $|A| + |B| + |C|$. An element in exactly two of the sets has been counted twice, so subtract the pairwise intersections $|A\cap B| + |A\cap C| + |B\cap C|$. But look at an element lying in all three sets. It was added 3 times, then subtracted 3 times (it lies in all three pairwise intersections), so it is now counted 0 times. Add it back with $|A\cap B\cap C|$:
$$|A\cup B\cup C| = |A|+|B|+|C| - |A\cap B| - |A\cap C| - |B\cap C| + |A\cap B\cap C|.$$
Signs alternate: add single sets, subtract pairs, add triples.

### A worked example with divisibility
How many integers from 1 to 100 are divisible by 2, 3 or 5? Let $A_2$, $A_3$, $A_5$ be the multiples of 2, 3 and 5. The number of multiples of $d$ up to 100 is $\lfloor 100/d\rfloor$ (the floor, or round-down). A number is divisible by both 2 and 3 exactly when it is divisible by 6, and so on. So
$$|A_2| = 50,\ |A_3| = 33,\ |A_5| = 20,\quad |A_2\cap A_3| = 16,\ |A_2\cap A_5| = 10,\ |A_3\cap A_5| = 6,\quad |A_2\cap A_3\cap A_5| = 3.$$
Inclusion-exclusion gives $50 + 33 + 20 - 16 - 10 - 6 + 3 = 74$. The complement, numbers from 1 to 100 divisible by none of 2, 3, 5, is $100 - 74 = 26$.

### The general principle
For $n$ sets, add the sizes of all single sets, subtract all pairwise intersections, add all triple intersections, and keep alternating until the intersection of all $n$:
$$\Big|\bigcup_{i=1}^n A_i\Big| = \sum_i|A_i| - \sum_{i<j}|A_i\cap A_j| + \sum_{i<j<k}|A_i\cap A_j\cap A_k| - \cdots + (-1)^{n+1}|A_1\cap\cdots\cap A_n|.$$
Why does it work? Take an element that lies in exactly $r\ge1$ of the sets. It is counted $\binom r1$ times in the first sum, $\binom r2$ times in the second, and so on. Its total count is $\binom r1 - \binom r2 + \binom r3 - \cdots$. From the binomial theorem, $\sum_{j=0}^r(-1)^j\binom rj = 0$, so $\binom r1 - \binom r2 + \cdots = \binom r0 = 1$. Every element of the union is counted exactly once. The alternating binomial sum from the binomial-theorem lesson is the whole proof.

:::def Inclusion-exclusion principle
The size of a union of finite sets equals the sum of the sizes of all non-empty intersections, each taken with sign $+$ if it involves an odd number of sets and $-$ if even.
:::

### Counting "none of the properties"
Frequently we want the elements of a universe $U$ that avoid every bad property. By complement,
$$|U\setminus(A_1\cup\cdots\cup A_n)| = |U| - \sum|A_i| + \sum|A_i\cap A_j| - \cdots$$
This is the form used most in practice, because the intersections ("has properties $i$ and $j$") are usually easy to count even when "has none" is not.

### Onto functions and Stirling numbers
A function from a set of $n$ elements to a set of $k$ elements is **onto** (or **surjective**) if every output is hit. How many onto functions are there from a 4-element set to $\{a, b, c\}$? All functions: $3^4 = 81$. Let $A_a$ be the functions that miss $a$; they map into the other two outputs, so $|A_a| = 2^4 = 16$, and similarly for $b$ and $c$. Functions missing two outputs map everything to the third: $1^4 = 1$ each. Missing all three is impossible. Onto functions: $81 - 3\cdot16 + 3\cdot1 - 0 = 36$. In general
$$\#\text{onto}(n\to k) = \sum_{j=0}^{k}(-1)^j\binom kj(k-j)^n.$$
If the outputs are unlabelled "blocks" instead, divide by $k!$: the number of ways to partition an $n$-set into $k$ non-empty blocks is the **Stirling number of the second kind** $S(n,k) = \frac{1}{k!}\#\text{onto}(n\to k)$. Here $S(4,3) = 36/6 = 6$: one of the six blocks structures puts two of the four elements together, and there are $\binom42 = 6$ ways to choose that pair.

:::def Stirling number of the second kind
$S(n,k)$ is the number of ways to partition a set of $n$ elements into $k$ non-empty, unlabelled blocks. $k!\,S(n,k)$ counts onto functions from an $n$-set to a $k$-set.
:::

:::warn Common mistakes
Stopping after the pairwise terms when three or more sets can overlap. Getting the signs wrong: odd-size intersections are added, even-size are subtracted. Computing $|A_2\cap A_3|$ as $|A_2|\cdot|A_3|$ instead of counting multiples of 6. And forgetting to subtract from the total when the question asks for elements with **none** of the properties.
:::

### A quick sanity check
Inclusion-exclusion answers can be checked with a rough estimate. Among the numbers 1 to 100, about half avoid 2, two thirds of those avoid 3, and four fifths of those avoid 5, so about $100\cdot\frac12\cdot\frac23\cdot\frac45\approx 26.7$ numbers avoid all three. Our exact answer 26 is close, which is reassuring. If an inclusion-exclusion calculation ever gives a negative count or a count larger than the universe, a sign or an intersection is wrong. Another check is to try a tiny case, such as the numbers 1 to 10, where you can list everything by hand and compare.

### Summary
Adding set sizes overcounts elements that lie in several sets, so inclusion-exclusion alternates: add singles, subtract pairs, add triples, and so on. It works because an element in $r$ sets is counted $\binom r1-\binom r2+\cdots = 1$ time. The complement form counts objects with none of the bad properties, which gives counts of numbers coprime to $n$, onto functions, Stirling numbers and derangements.

@viz venn | Move the three sliders and watch the union update.

:::explore
**What to try**
1. Set $P(A) = 0.4$, $P(B) = 0.3$, overlap $0.1$ and read the union: $0.4 + 0.3 - 0.1 = 0.6$.
2. Push the overlap up to $0.3$ (B inside A). The union becomes just $P(A)$.
3. Set the overlap to 0 and confirm the sum rule.

**What to notice:** the subtraction is exactly the size of the double-counted lens. With three circles the triple-overlap region would be subtracted three times by the pairwise terms, which is why it has to be added back.
:::

@viz sets | Compare A ∪ B with the sizes of A, B and A ∩ B.

:::explore
**What to try**
1. Select $A\cup B$ and count its elements.
2. Select $A\cap B$ and count those.
3. Check that $|A\cup B| = |A| + |B| - |A\cap B|$: $6 + 5 - 2 = 9$.

**What to notice:** the elements 2 and 3 sit in both sets, so adding $|A|$ and $|B|$ counts them twice. Inclusion-exclusion removes exactly that duplicate.
:::

:::formulas
$$|A\cup B| = |A|+|B|-|A\cap B|$$
$$|A\cup B\cup C| = \textstyle\sum|A| - \sum|A\cap B| + |A\cap B\cap C|$$
$$\Big|\bigcup_{i=1}^nA_i\Big| = \sum_{\emptyset\ne S\subseteq\{1..n\}}(-1)^{|S|+1}\Big|\bigcap_{i\in S}A_i\Big|$$
$$\#\text{onto}(n\to k) = \sum_{j=0}^k(-1)^j\binom kj(k-j)^n = k!\,S(n,k)$$
:::

:::thm Inclusion-exclusion
For finite sets $A_1,\dots,A_n$, $\big|\bigcup A_i\big| = \sum_{\emptyset\ne S}(-1)^{|S|+1}\big|\bigcap_{i\in S}A_i\big|$.
:::

:::proof
Let $x$ belong to exactly $r\ge1$ of the sets. It belongs to $\bigcap_{i\in S}A_i$ exactly when $S$ is a non-empty subset of those $r$ sets; there are $\binom rj$ such $S$ of size $j$. So the right side counts $x$ exactly $\sum_{j=1}^r(-1)^{j+1}\binom rj = 1 - \sum_{j=0}^r(-1)^j\binom rj = 1 - (1-1)^r = 1$ time. Elements in no set are counted 0 times. Hence the right side equals the size of the union.
:::

:::steps How many integers in 1..100 are divisible by 2, 3 or 5?
1. Singles: $\lfloor100/2\rfloor + \lfloor100/3\rfloor + \lfloor100/5\rfloor = 50 + 33 + 20 = 103$.
2. Pairs (multiples of 6, 10, 15): $16 + 10 + 6 = 32$.
3. Triple (multiples of 30): $3$.
4. $103 - 32 + 3 = 74$.
:::

:::steps How many onto functions are there from a 4-element set to a 3-element set?
1. All functions: $3^4 = 81$.
2. Missing a given output: $2^4 = 16$, three choices: subtract $48$.
3. Missing two given outputs: $1^4 = 1$, three choices: add back $3$.
4. $81 - 48 + 3 = 36$.
:::

:::steps Use inclusion-exclusion to count integers in 1..30 coprime to 30
1. $30 = 2\cdot3\cdot5$; count those divisible by 2, 3 or 5: $15 + 10 + 6 - 5 - 3 - 2 + 1 = 22$.
2. Coprime ones: $30 - 22 = 8$ (they are 1, 7, 11, 13, 17, 19, 23, 29).
:::

:::mock Exam question
How many integers from 1 to 1000 are divisible by **none** of 2, 3 and 7?
:::solution
Singles: $\lfloor1000/2\rfloor = 500$, $\lfloor1000/3\rfloor = 333$, $\lfloor1000/7\rfloor = 142$, total $975$. Pairs: multiples of 6: $166$, of 14: $71$, of 21: $47$, total $284$. Triple, multiples of 42: $23$. Divisible by at least one: $975 - 284 + 23 = 714$. Divisible by none: $1000 - 714 = 286$. (Sanity check: $1000\cdot\frac12\cdot\frac23\cdot\frac67\approx 285.7$.)
:::
:::

:::ml
In probability, inclusion-exclusion gives $P(A\cup B) = P(A)+P(B)-P(A\cap B)$. Dropping all the correction terms leaves the **union bound** $P(\bigcup A_i)\le\sum P(A_i)$, the workhorse of learning theory: it bounds the chance that *any* of many hypotheses looks good by accident, which leads to generalisation bounds that grow with $\log|\mathcal H|$.
:::

:::cs
Counting strings that avoid several forbidden patterns, counting satisfying assignments of small formulas, and computing Euler's totient $\varphi(n)$ from the prime factors of $n$ are all inclusion-exclusion. Bitmask DP over subsets ("sum over all subsets $S$ with sign $(-1)^{|S|}$") is the programming form.
:::

:::real
A streaming service reports 60% of users watch dramas, 50% comedies and 20% both; the share watching at least one is $60 + 50 - 20 = 90$ percent, so 10% watch neither. Epidemiologists use the same arithmetic for overlapping symptoms.
:::

:::quiz
? $|A| = 10$, $|B| = 8$, $|A\cap B| = 3$. What is $|A\cup B|$?
= 15
> $10 + 8 - 3 = 15$.

? How many integers in 1..30 are divisible by 2 or 3?
= 20
> $15 + 10 - 5 = 20$.

? How many onto functions are there from a 3-element set to a 2-element set?
= 6
> $2^3 - 2\cdot1^3 = 6$: every function except the two constant ones.

? What is the Stirling number $S(4,2)$?
= 7
> Onto functions $4\to2$: $2^4 - 2 = 14$; divide by $2! = 2$ to get 7.

? In the three-set formula, the triple intersection is
+ added
- subtracted
- ignored
> Elements in all three were added 3 times and subtracted 3 times, so they must be added back once.

? In 1..100, how many numbers are divisible by none of 2, 3, 5?
= 26
> $100 - 74 = 26$.
:::

## Lesson: The pigeonhole principle {#pigeonhole}
@summary: If more objects than boxes, some box holds two; the generalized form with ceilings, and its uses in proofs, hashing and compression.

### An idea so simple it feels like cheating
Suppose 13 people are in a room. Is it guaranteed that two of them were born in the same month? Yes. There are only 12 months, and if each month held at most one person there would be at most 12 people. With 13, some month must hold at least two. Notice what we did not do: we did not find the two people, and we did not compute any probability. We proved that a coincidence *must* exist simply because there are more objects than places to put them.

This is the **pigeonhole principle**: if you put more than $k$ pigeons into $k$ holes, some hole contains at least two pigeons. It sounds obvious, and it is, but it is one of the most useful tools in discrete mathematics. Its strength comes from choosing clever "pigeons" and "holes" so that two pigeons in the same hole means something interesting.

:::def Pigeonhole principle
If $n$ objects are placed into $k$ boxes and $n > k$, then at least one box contains at least two objects.
:::

### Why it is true
The proof is a contradiction in one line. Suppose every box held at most one object. Then the total number of objects would be at most $1 + 1 + \cdots + 1 = k$. But we have $n > k$ objects, a contradiction. So some box holds two or more.

### The generalized version
Often we want more than "two in a box". If 100 students are divided among 7 tutorial groups, how big must the largest group be? If every group had at most 14 students, there would be at most $7 \cdot 14 = 98 < 100$ students. So some group has at least 15. In general, if $n$ objects go into $k$ boxes, some box contains at least $\lceil n/k\rceil$ objects, where $\lceil x\rceil$ (the ceiling) rounds up to the nearest integer. Here $\lceil 100/7\rceil = \lceil 14.29\rceil = 15$.

The reasoning is the same averaging idea: the average box holds $n/k$ objects, and not every box can be below average. Since box counts are integers, "at least the average" means at least the ceiling of the average.

:::def Generalized pigeonhole principle
If $n$ objects are placed into $k$ boxes, some box contains at least $\lceil n/k\rceil$ objects. Equivalently, to force some box to contain at least $r$ objects you need $n = k(r-1) + 1$ objects.
:::

### "How many do you need?" questions
A drawer has red, blue and green socks, all mixed up, and the room is dark. How many socks must you pull out to be sure of a matching pair? The holes are the 3 colours. With 3 socks you might get one of each, so 3 is not enough. With 4 socks, some colour appears twice. Answer: 4. This is the reverse form: to guarantee $r$ in one box among $k$ boxes, you need $k(r-1)+1$ objects. For a matching pair ($r = 2$) in 3 colours, $3\cdot1 + 1 = 4$. To guarantee three people sharing a birth month you need $12\cdot2 + 1 = 25$ people.

The worst case is the key to these questions. Ask: how many objects can I take while still avoiding the goal? That maximum is $k(r-1)$, filling every box with $r - 1$. One more object breaks it.

### Choosing clever holes
The art is in the choice of holes. Here are three classic examples.

*Pairs that sum to a target.* Pick numbers from $\{1, 2, \dots, 20\}$. How many must you pick to be sure two of them add up to 21? Group the numbers into 10 pairs $\{1,20\}, \{2,19\}, \dots, \{10,11\}$; each pair sums to 21. These pairs are the holes. Picking 10 numbers could take one from each pair and avoid the goal, but picking 11 forces two numbers from the same pair. Answer: 11.

*Points in a square.* Place 5 points in a $2\times2$ square. Cut the square into four $1\times1$ squares (holes). Two points share a small square, and any two points in a $1\times1$ square are at most its diagonal $\sqrt2$ apart. So some two of the five points are within distance $\sqrt2$.

*Remainders.* Among any $m + 1$ integers, two have the same remainder when divided by $m$, because there are only $m$ possible remainders $0, 1, \dots, m-1$. Their difference is then divisible by $m$. For example, among any 6 integers, two differ by a multiple of 5. This remainder trick appears everywhere in number theory.

@fig modular m=5 | Five possible remainders mod 5 are five holes; six integers must put two in the same hole.

### Pigeonhole in computing
A hash function maps a huge set of possible keys into a small table of $m$ buckets. As soon as more than $m$ keys are stored, two must collide. No cleverness in designing the hash can avoid this; it is forced by counting. The same argument shows no lossless compression program can shrink *every* file: there are $2^n$ files of $n$ bits but only $2^n - 1$ files shorter than $n$ bits, so if every $n$-bit file were mapped to a shorter one, two would share an output and could not both be recovered.

### Common mistakes
The most frequent mistake is an off-by-one: for a pair among $k$ boxes you need $k+1$ objects, not $k$. Another mistake is expecting the principle to tell you *which* box is crowded; it only says one exists. Finally, the boxes must cover every possibility. In the sum-to-21 example, every number from 1 to 20 belongs to exactly one pair, and that is what makes the argument airtight.

### Summary
If $n$ objects fill $k$ boxes, some box holds at least $\lceil n/k\rceil$ objects; in particular $n > k$ forces a pair. To guarantee $r$ objects in one box, take $k(r-1)+1$ objects. Most of the skill is choosing the holes: months, colours, remainders, pairs or sub-squares. The same simple count explains unavoidable hash collisions and the impossibility of compressing every file.

@viz g09-lcg mode=hash m=10 a=1 c=11 | Eleven keys, ten buckets. Some bucket must hold two keys.

:::explore
**What to try**
1. With $m = 10$ buckets and 11 keys, read the largest bucket size. It is at least 2, exactly as the pigeonhole principle promises.
2. Lower the number of keys to 10. Now it is possible for every bucket to hold exactly one key.
3. Raise the keys to 31 and check the largest bucket is at least $\lceil 31/10\rceil = 4$.
4. Change the stride $s$ to 5. The keys collide much more, because they can only reach a few buckets.

**What to notice:** no matter what stride or first key you choose, once there are more keys than buckets the largest bucket is at least 2. The principle gives a floor on the worst crowding, which is the generalized form $\lceil n/k\rceil$ from the article.
:::

@viz modular m=7 | Remainders mod 7 are the seven holes.

:::explore
**What to try**
1. Pick any 8 integers in your head and find their remainders mod 7 on the clock.
2. Find two that land on the same position, and check that their difference is a multiple of 7.

**What to notice:** with only 7 positions, 8 integers must share one, which is the remainder argument from the article.
:::

:::formulas
$$n > k \implies \text{some box has} \ge 2$$
$$\text{some box has} \ge \left\lceil \tfrac{n}{k}\right\rceil$$
$$\text{to force } r \text{ in one of } k \text{ boxes: } n = k(r-1)+1$$
:::

:::thm Generalized pigeonhole principle
If $n$ objects are distributed among $k$ boxes, then some box contains at least $\lceil n/k\rceil$ objects.
:::

:::proof
Suppose every box contains at most $\lceil n/k\rceil - 1$ objects. Since $\lceil n/k\rceil < n/k + 1$, each box holds fewer than $n/k$ objects, so the total is less than $k\cdot n/k = n$, a contradiction.
:::

:::steps How many cards must you draw from a standard deck to guarantee 3 of the same suit?
1. Holes: 4 suits. Goal: $r = 3$ in one hole.
2. Worst case without success: 2 of each suit, $4\cdot2 = 8$ cards.
3. One more card forces a third in some suit: $8 + 1 = 9$.
:::

:::steps Show that among any 6 integers, two differ by a multiple of 5
1. Holes: the remainders $0,1,2,3,4$ mod 5.
2. Six integers, five holes, so two integers $a, b$ share a remainder $r$.
3. Then $a = 5q + r$, $b = 5q' + r$, so $a - b = 5(q - q')$ is a multiple of 5.
:::

:::steps 1000 keys are stored in a hash table with 100 buckets. What is the smallest possible size of the fullest bucket?
1. Generalized pigeonhole: some bucket has at least $\lceil 1000/100\rceil = 10$ keys.
2. Spreading the keys perfectly, 10 per bucket, achieves this, so the answer is exactly 10.
:::

:::mock Exam question
Prove that in any group of 6 people, there are either 3 who all know each other or 3 who are all strangers (assume "knowing" is mutual).
:::solution
Pick one person $P$. The other 5 people each either know $P$ or do not. Two holes, five pigeons, so by the generalized principle at least $\lceil5/2\rceil = 3$ people are in the same hole. Suppose 3 people $X, Y, Z$ all know $P$ (the stranger case is symmetric). If any two of $X, Y, Z$ know each other, those two together with $P$ form 3 mutual acquaintances. Otherwise $X, Y, Z$ are 3 mutual strangers. Either way we are done. This shows the Ramsey number $R(3,3)\le 6$; a 5-cycle arrangement shows 5 people are not enough, so $R(3,3) = 6$.
:::
:::

:::cs
Hash collisions are unavoidable once the number of keys exceeds the number of buckets, so every hash table needs a collision strategy (chaining or open addressing). The pigeonhole argument also proves no lossless compressor shortens every input, and that any deterministic finite automaton reading a long enough string must revisit a state, which is the heart of the pumping lemma.
:::

:::ml
Feature hashing maps millions of words into, say, $2^{18}$ columns, so collisions are guaranteed; models tolerate them because each column mixes only a few unrelated words. Pigeonhole style counting also limits what a fixed-size model can memorise: a network with $b$ bits of parameters can represent at most $2^b$ different functions.
:::

:::real
A city with more than 1 million residents who each have fewer than 300,000 hairs on their head must contain two people with exactly the same number of hairs, because there are only 300,000 possible hair counts. Airlines and hotels overbook knowing that a guaranteed seat for everyone cannot be promised once bookings exceed seats.
:::

:::quiz
? How many socks must you take from a drawer of black, white and grey socks to guarantee a matching pair?
= 4
> 3 colours are the holes; 3 socks can all differ, the 4th forces a pair.

? How many people are needed to guarantee that 3 share a birth month?
= 25
> $12\cdot(3-1) + 1 = 25$.

? 100 students are split into 7 groups. What is the least possible size of the largest group?
= 15
> $\lceil 100/7\rceil = 15$.

? How many numbers must you pick from 1..20 to be sure two of them sum to 21?
= 11
> Ten pairs $\{i, 21-i\}$ are the holes; 11 picks force two in one pair.

? Among how many integers are two always guaranteed to have the same remainder mod 9?
= 10
> There are 9 remainders, so 10 integers force a repeat.

? The pigeonhole principle tells you which box contains two objects.
- true
+ false
> It only guarantees that such a box exists.
:::

## Lesson: Derangements {#derangements}
@summary: Permutations with no fixed points: the inclusion-exclusion formula, the recurrence, and why the probability tends to 1/e.

### The hat-check problem
At a party, $n$ guests check their hats. At the end of the evening, the attendant hands the hats back completely at random. What is the chance that **nobody** gets their own hat back? Or think of a class Secret Santa: everyone writes their name on a slip, the slips are shuffled and each person draws one. The draw "fails" if somebody draws their own name. How often does a random shuffle give a valid Secret Santa?

These are both questions about **derangements**: permutations in which no element stays in its original position. The answer turns out to be one of the prettiest results in combinatorics, linking counting, inclusion-exclusion and the number $e \approx 2.71828$.

:::def Fixed point
In a permutation $\sigma$ of $\{1, \dots, n\}$, a fixed point is an element $i$ with $\sigma(i) = i$, that is, an element left in its own position.
:::

:::def Derangement
A derangement is a permutation with no fixed points. The number of derangements of $n$ elements is written $D_n$ (also $!n$, read "subfactorial $n$").
:::

### Small cases by hand
With one item, the only permutation leaves it in place, so $D_1 = 0$. With two items $(1,2)$, the swap $(2,1)$ is the only derangement: $D_2 = 1$. With three items, the 6 permutations are $123, 132, 213, 231, 312, 321$. Those with nothing in place are $231$ and $312$, so $D_3 = 2$. With four items you can check by listing that $D_4 = 9$ of the 24 permutations are derangements. The listing gets painful quickly, so we need a formula.

### Counting with inclusion-exclusion
Let $A_i$ be the set of permutations that fix element $i$ (and maybe others). We want permutations in none of the $A_i$. If a permutation fixes a particular set of $j$ elements, the other $n - j$ elements can be arranged freely, in $(n-j)!$ ways. There are $\binom nj$ ways to choose which $j$ elements are fixed. Inclusion-exclusion in complement form gives
$$D_n = \sum_{j=0}^n (-1)^j\binom nj (n-j)! = \sum_{j=0}^n(-1)^j\frac{n!}{j!} = n!\left(1 - \frac1{1!} + \frac1{2!} - \frac1{3!} + \cdots + \frac{(-1)^n}{n!}\right).$$
Check with $n = 4$: $24(1 - 1 + \tfrac12 - \tfrac16 + \tfrac1{24}) = 24 - 24 + 12 - 4 + 1 = 9$. With $n = 5$: $120 - 120 + 60 - 20 + 5 - 1 = 44$.

### Where $e$ comes from
The bracket in the formula is the beginning of the series $e^{-1} = \sum_{j\ge0}\frac{(-1)^j}{j!} = 1 - 1 + \tfrac12 - \tfrac16 + \cdots$. So the fraction of permutations that are derangements is
$$\frac{D_n}{n!} = \sum_{j=0}^n\frac{(-1)^j}{j!} \longrightarrow \frac1e \approx 0.3679.$$
The series converges extremely fast because of the factorials. Already for $n = 4$ the probability is $9/24 = 0.375$, and for $n = 7$ it is $1854/5040 \approx 0.36786$, agreeing with $1/e$ to four decimal places. A remarkable consequence: the chance that nobody gets their own hat is about 37% whether there are 10 guests or 10,000. In fact $D_n$ is the integer nearest to $n!/e$ for every $n\ge1$.

### A recurrence
There is also a neat recursive way to count. In a derangement of $\{1,\dots,n\}$, element 1 goes to some position $k \ne 1$; there are $n - 1$ choices for $k$. Now look at where element $k$ goes. Either $k$ goes to position 1, a swap; the remaining $n-2$ elements must form a derangement, giving $D_{n-2}$ ways. Or $k$ does not go to position 1; then treat position 1 as $k$'s "forbidden" spot, and the remaining $n - 1$ elements must avoid one forbidden spot each, giving $D_{n-1}$ ways. Therefore
$$D_n = (n-1)(D_{n-1} + D_{n-2}),\qquad D_1 = 0,\ D_2 = 1.$$
This produces $D_3 = 2(1+0) = 2$, $D_4 = 3(2+1) = 9$, $D_5 = 4(9+2) = 44$, $D_6 = 5(44+9) = 265$, $D_7 = 6(265+44) = 1854$. It is a good example of a recurrence relation, the topic of the next unit.

### Partial derangements
Sometimes we want exactly $r$ fixed points. Choose which $r$ elements stay put ($\binom nr$ ways), then derange the remaining $n - r$: the count is $\binom nr D_{n-r}$. For 4 hats, the number of ways exactly one guest gets their own hat is $\binom41 D_3 = 4\cdot2 = 8$. Notice that exactly $n - 1$ fixed points is impossible: if all but one element are in place, the last one must be too, and indeed $\binom{n}{n-1}D_1 = 0$. We take $D_0 = 1$, because the empty arrangement has no fixed points.

### How many people get their own hat, on average?
Derangements answer "what is the chance of zero matches?", but a related question is "how many matches should we expect?". The answer is surprisingly simple. Each individual guest gets their own hat with probability exactly one in $n$, because their hat is equally likely to go to any of the $n$ guests. There are $n$ guests, and expected values add up even when events are not independent, so the expected number of guests who get their own hat back is $n$ times one in $n$, which is exactly 1. This is true for 3 guests and for 3 million guests. So a random shuffle typically leaves about one item in place, and about 37 percent of the time it leaves none at all.

This also explains why the zero-match probability does not shrink as the party gets bigger. Adding guests adds more chances for a match, but each chance becomes smaller, and the two effects balance. In fact, the number of fixed points of a large random permutation behaves almost exactly like a Poisson random variable with mean 1, whose probability of being zero is $e^{-1}$. That is a second, probabilistic route to the same constant.

### Thinking about it step by step
If you ever forget the formula, rebuild it from the inclusion-exclusion pattern. Start with all arrangements. Remove those where at least one person is matched. You removed the arrangements with two matches twice, so add them back. Then correct the triple matches, and so on. Every term has the same shape: choose who is matched, then arrange everyone else freely. Writing that sentence in symbols gives the alternating sum.

### Common mistakes
Students often think the probability of no match should go to 0 or to 1 as $n$ grows. It does neither; it settles at $1/e$. Another mistake is to compute $(n-1)^n/n!$ by assuming each person independently avoids their own hat; the choices are not independent because hats cannot be given out twice. Finally, remember $D_1 = 0$ and $D_0 = 1$ when using the recurrence or the exactly-$r$ formula.

### Summary
A derangement is a permutation with no fixed points. Inclusion-exclusion gives $D_n = n!\sum_{j=0}^n(-1)^j/j!$, which is the nearest integer to $n!/e$. The recurrence $D_n = (n-1)(D_{n-1}+D_{n-2})$ gives the values $0, 1, 2, 9, 44, 265, 1854$. The probability that a random permutation has no fixed point tends to $1/e \approx 0.368$ very quickly, and $\binom nr D_{n-r}$ counts permutations with exactly $r$ fixed points.

@viz g09-arrange mode=derange n=4 | Every permutation of 1..n is listed. Purple ones are derangements; underlined digits are fixed points.

:::explore
**What to try**
1. With $n = 3$, find the two purple permutations, 231 and 312, and check they match the hand count.
2. Set $n = 4$ and count the purple entries: there should be 9 of 24.
3. Press "show only derangements" to hide the rest, then step $n$ from 1 to 6.
4. Watch the ratio $D_n/n!$ next to $1/e \approx 0.3679$.

**What to notice:** the ratio jumps around for tiny $n$ (0, 0.5, 0.333, 0.375) and then locks on to $1/e$, just as the alternating series in the article predicts. Look at $n = 4$ with all permutations shown: the 8 permutations with exactly one underlined digit are the "exactly one fixed point" case $\binom41D_3$.
:::

:::formulas
$$D_n = n!\sum_{j=0}^n\frac{(-1)^j}{j!}$$
$$D_n = (n-1)(D_{n-1}+D_{n-2}),\quad D_0 = 1,\ D_1 = 0$$
$$D_n = \operatorname{round}(n!/e)\ \ (n\ge1)$$
$$\#\{\text{exactly } r \text{ fixed points}\} = \binom nr D_{n-r}$$
:::

:::thm Derangement formula
The number of permutations of $n$ elements with no fixed points is $D_n = \sum_{j=0}^n(-1)^j\frac{n!}{j!}$, and $D_n/n!\to 1/e$.
:::

:::proof
Let $A_i$ be the permutations with $\sigma(i) = i$. For any set $S$ of $j$ indices, $|\bigcap_{i\in S}A_i| = (n-j)!$, since the elements outside $S$ may be permuted freely. By inclusion-exclusion the number in no $A_i$ is $\sum_{j=0}^n(-1)^j\binom nj(n-j)! = \sum_j(-1)^j n!/j!$. Dividing by $n!$ gives the partial sum of the series for $e^{-1}$, which converges to $1/e$.
:::

:::steps Compute $D_5$ with the formula and check with the recurrence
1. $D_5 = 120 - 120 + 60 - 20 + 5 - 1 = 44$.
2. Recurrence: $D_5 = 4(D_4 + D_3) = 4(9 + 2) = 44$. They agree.
:::

:::steps Five people do a Secret Santa draw. What is the probability nobody draws themself?
1. Favourable outcomes: $D_5 = 44$.
2. All outcomes: $5! = 120$.
3. Probability $44/120 = 11/30 \approx 0.367$, already very close to $1/e$.
:::

:::steps In how many permutations of 1..6 are exactly two elements fixed?
1. Choose the two fixed elements: $\binom62 = 15$.
2. Derange the other four: $D_4 = 9$.
3. Total $15\cdot9 = 135$.
:::

:::mock Exam question
Four guests receive their hats back at random. What is the probability that exactly one guest gets their own hat?
:::solution
Choose the lucky guest in $\binom41 = 4$ ways; the other three must form a derangement, $D_3 = 2$ ways. That gives $8$ favourable permutations out of $4! = 24$, so the probability is $8/24 = 1/3$. As a check, the counts for exactly $0,1,2,3,4$ fixed points are $9, 8, 6, 0, 1$, which sum to 24.
:::
:::

:::cs
Testing a shuffle algorithm often checks the fraction of fixed-point-free outputs against $1/e$; a biased shuffle shows a different rate. Sattolo's algorithm, a one-line change to Fisher-Yates, produces only cyclic permutations, which are always derangements; that is the right tool when you need "nobody keeps their own item".
:::

:::ml
Contrastive learning often pairs each example with a "negative" by shuffling the batch. The pairs where an example is matched with itself are wasted, and derangement counts tell you that a random shuffle of a batch of size $n$ gives on average exactly one such self-pair (expected number of fixed points is 1 for any $n$), so implementations use a derangement such as a cyclic shift instead.
:::

:::real
Secret Santa organisers who simply shuffle names have about a 63% chance that someone draws themself, so on average they need $e \approx 2.7$ shuffles to get a valid draw. The same calculation describes randomly returned coats, mismatched letters and envelopes, and "nobody sits in their old seat" seating plans.
:::

:::quiz
? What is $D_4$?
= 9
> $24 - 24 + 12 - 4 + 1 = 9$.

? What is $D_5$?
= 44
> $4(D_4 + D_3) = 4\cdot11 = 44$.

? Three letters are placed in three addressed envelopes at random. What is the probability none is in the right envelope?
= 1/3|0.3333
> $D_3/3! = 2/6$.

? How many permutations of 1..5 have exactly two fixed points?
= 20
> $\binom52 D_3 = 10\cdot2 = 20$.

? As $n\to\infty$, the probability a random permutation is a derangement tends to
- 0
+ $1/e$
- $1/2$
- 1
> The partial sums of $\sum(-1)^j/j!$ converge to $e^{-1}\approx0.368$.

? How many permutations of 1..4 have exactly 3 fixed points?
= 0
> If three items are in place, the fourth must be too.
:::

# Unit: Recurrences and generating functions

## Lesson: Recurrence relations {#recurrences}
@summary: Defining sequences by earlier terms, solving linear recurrences with characteristic equations, and divide-and-conquer recurrences.

### Counting by building on smaller cases
Some counting problems are hard to attack head-on but easy if you already know the answer for smaller sizes. How many bit strings of length $n$ contain no two consecutive 1s? Listing works for tiny $n$: of length 1 there are 2 (0 and 1); of length 2 there are 3 (00, 01, 10). For length 10 listing is hopeless. But think about the last bit. If a valid string ends in 0, the first $n - 1$ bits can be any valid string of length $n - 1$. If it ends in 1, the bit before must be 0, and the first $n - 2$ bits can be any valid string of length $n - 2$. So if $a_n$ is the number of valid strings,
$$a_n = a_{n-1} + a_{n-2},\qquad a_1 = 2,\ a_2 = 3.$$
From this rule, $a_3 = 5$, $a_4 = 8$, $a_5 = 13$, and so on. These are Fibonacci numbers. We have answered the question for any length without listing anything, just by relating the problem to smaller copies of itself.

### What a recurrence is
A **recurrence relation** is a rule that defines each term of a sequence from earlier terms. To pin down a unique sequence it needs **initial conditions**, the first few values. The Fibonacci recurrence $F_n = F_{n-1} + F_{n-2}$ with $F_0 = 0$, $F_1 = 1$ gives $0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55$. Change the starting values and the same rule gives a different sequence.

:::def Recurrence relation
An equation expressing the $n$-th term $a_n$ of a sequence in terms of earlier terms, together with initial conditions that fix the first values.
:::

:::def Closed form
A formula for $a_n$ that uses only $n$, not earlier terms; solving a recurrence means finding a closed form.
:::

### The Tower of Hanoi and unrolling
In the Tower of Hanoi puzzle, $n$ discs of decreasing size sit on one peg and must move to another, one disc at a time, never placing a larger disc on a smaller one. To move $n$ discs, you must first move the top $n - 1$ out of the way, then move the largest disc, then move the $n - 1$ discs back on top. If $T_n$ is the minimum number of moves,
$$T_n = 2T_{n-1} + 1,\qquad T_1 = 1.$$
The simplest way to solve this is to **unroll** it, substituting the rule into itself: $T_n = 2T_{n-1} + 1 = 4T_{n-2} + 2 + 1 = 8T_{n-3} + 4 + 2 + 1 = \cdots = 2^{n-1}T_1 + 2^{n-2} + \cdots + 1$. That is a geometric series, so $T_n = 2^n - 1$. Check: $T_1 = 1$, $T_2 = 3$, $T_3 = 7$, matching $2T_{n-1}+1$. With 64 discs the legend's monks need $2^{64} - 1 \approx 1.8\times10^{19}$ moves.

@fig recursion-tree | A recurrence as a tree: each node splits into smaller subproblems and the total work is the sum over all levels.

### Linear recurrences with constant coefficients
Many recurrences have the form $a_n = c_1a_{n-1} + c_2a_{n-2}$, with fixed numbers $c_1, c_2$. These are called **linear homogeneous recurrences of order 2**. The trick is to guess a solution of the form $a_n = r^n$. Substituting gives $r^n = c_1r^{n-1} + c_2r^{n-2}$; dividing by $r^{n-2}$ leaves the **characteristic equation**
$$r^2 - c_1 r - c_2 = 0.$$
If this quadratic has two different roots $r_1$ and $r_2$, every solution is $a_n = \alpha r_1^n + \beta r_2^n$, and the constants $\alpha, \beta$ come from the initial conditions.

Let us solve $a_n = 5a_{n-1} - 6a_{n-2}$ with $a_0 = 1$, $a_1 = 4$. The characteristic equation is $r^2 - 5r + 6 = 0$, which factors as $(r-2)(r-3) = 0$, so $r = 2$ or $3$. The general solution is $a_n = \alpha 2^n + \beta 3^n$. Initial conditions: $\alpha + \beta = 1$ and $2\alpha + 3\beta = 4$. Subtracting twice the first equation from the second gives $\beta = 2$, so $\alpha = -1$. Therefore $a_n = 2\cdot3^n - 2^n$. Check $a_2$: the rule gives $5\cdot4 - 6\cdot1 = 14$ and the formula gives $18 - 4 = 14$.

### Repeated roots
If the characteristic equation has a double root $r$, the solutions $r^n$ alone are not enough to match two initial conditions, and the general solution becomes $a_n = (\alpha + \beta n)r^n$. For $a_n = 4a_{n-1} - 4a_{n-2}$, the equation $r^2 - 4r + 4 = (r-2)^2$ has the double root 2. With $a_0 = 1$, $a_1 = 6$ we get $\alpha = 1$ and $2(1 + \beta) = 6$, so $\beta = 2$ and $a_n = (1 + 2n)2^n$.

### Fibonacci in closed form
For Fibonacci the characteristic equation is $r^2 - r - 1 = 0$, with roots $\varphi = \frac{1+\sqrt5}2\approx1.618$ (the golden ratio) and $\psi = \frac{1-\sqrt5}2\approx-0.618$. Fitting $F_0 = 0$, $F_1 = 1$ gives **Binet's formula** $F_n = \frac{\varphi^n - \psi^n}{\sqrt5}$. Since $|\psi| < 1$, the second term shrinks to zero, so Fibonacci numbers grow like $\varphi^n/\sqrt5$, exponentially. That is why the naive recursive Fibonacci program, whose running time obeys the same recurrence, is so slow.

### Non-homogeneous recurrences
When there is an extra term, like the $+1$ in Hanoi, find one **particular solution** and add the general solution of the homogeneous part. For $T_n = 2T_{n-1} + 1$, try a constant $c$: $c = 2c + 1$ gives $c = -1$. So $T_n = A\cdot2^n - 1$, and $T_1 = 1$ gives $A = 1$, recovering $T_n = 2^n - 1$.

### Divide-and-conquer recurrences
Algorithms that split a problem in parts give recurrences such as $T(n) = 2T(n/2) + n$ for merge sort: two half-size subproblems plus linear work to merge. Drawing the recursion tree, each of the $\log_2 n$ levels costs about $n$, so $T(n) = \Theta(n\log n)$. The **master theorem** packages this: for $T(n) = aT(n/b) + f(n)$, compare $f(n)$ with $n^{\log_b a}$. If $f$ is smaller by a polynomial factor, the leaves dominate and $T = \Theta(n^{\log_b a})$; if they match, $T = \Theta(n^{\log_b a}\log n)$; if $f$ is larger (and regular), the root dominates and $T = \Theta(f(n))$.

### Common mistakes
Forgetting initial conditions, or fitting the constants to the wrong indices (check whether the sequence starts at $a_0$ or $a_1$). Using $\alpha r^n + \beta r^n$ for a double root, which is really just one free constant. And writing the characteristic equation with the wrong signs: $a_n = c_1a_{n-1}+c_2a_{n-2}$ becomes $r^2 - c_1r - c_2 = 0$.

### Choosing a method
Faced with a new recurrence, first compute a few terms by hand; patterns such as powers of 2 or Fibonacci numbers often jump out, and the early terms are needed anyway to check any closed form you find. If the recurrence is linear with constant coefficients, use the characteristic equation. If it splits the input into fractions like $n/2$, draw the recursion tree or use the master theorem. And whatever method you use, always verify your final formula against two or three of the terms you computed directly.

### Summary
A recurrence defines a sequence from earlier terms plus initial conditions. Simple ones can be unrolled. Linear recurrences with constant coefficients are solved by the characteristic equation: distinct roots give $\alpha r_1^n + \beta r_2^n$, a double root gives $(\alpha + \beta n)r^n$, and a particular solution handles extra terms. Divide-and-conquer recurrences are read off a recursion tree or the master theorem.

@viz recursion-tree | Switch between the four divide-and-conquer recurrences and read the cost of each level.

:::explore
**What to try**
1. Choose $T(n) = 2T(n/2) + n$ (merge sort) and check that every level costs the same, 16, for $n = 16$.
2. Choose $T(n) = T(n/2) + 1$ (binary search): one node per level, constant cost per level.
3. Choose $3T(n/2) + n$: the level costs grow as you go down, so the leaves dominate.
4. Choose $2T(n/2) + n^2$: the level costs shrink, so the root dominates.

**What to notice:** the three cases of the master theorem in the article are just "costs equal across levels", "costs grow downward" and "costs shrink downward". Summing the levels is unrolling the recurrence.
:::

@viz sequence | Geometric mode shows $a_n = a\,r^n$, the building block of every linear recurrence solution.

:::explore
**What to try**
1. Choose geometric mode and set $r$ close to 1.6, the golden ratio, to see how Fibonacci numbers grow.
2. Set $r$ to $-0.6$ and watch the terms alternate and shrink, like the $\psi^n$ term in Binet's formula.

**What to notice:** a solution $\alpha r_1^n + \beta r_2^n$ is a mixture of two geometric sequences, and the root with the larger absolute value takes over for large $n$.
:::

:::formulas
$$a_n = c_1a_{n-1}+c_2a_{n-2}\ \Rightarrow\ r^2 - c_1r - c_2 = 0$$
$$\text{distinct roots: } a_n = \alpha r_1^n + \beta r_2^n$$
$$\text{double root: } a_n = (\alpha + \beta n)r^n$$
$$T_n = 2T_{n-1}+1,\ T_1 = 1\ \Rightarrow\ T_n = 2^n - 1$$
$$F_n = \frac{\varphi^n - \psi^n}{\sqrt5},\quad \varphi,\psi = \frac{1\pm\sqrt5}{2}$$
$$T(n) = aT(n/b) + f(n):\ \text{compare } f(n) \text{ with } n^{\log_b a}$$
:::

:::thm Solution of second-order linear recurrences
If $r^2 - c_1r - c_2 = 0$ has distinct roots $r_1, r_2$, then every sequence satisfying $a_n = c_1a_{n-1} + c_2a_{n-2}$ has the form $a_n = \alpha r_1^n + \beta r_2^n$ for unique constants $\alpha, \beta$.
:::

:::proof
Each $r_i^n$ satisfies the recurrence because $r_i^2 = c_1r_i + c_2$; multiply by $r_i^{n-2}$. Any combination $\alpha r_1^n + \beta r_2^n$ then satisfies it too, since the recurrence is linear. Given $a_0, a_1$, the system $\alpha + \beta = a_0$, $\alpha r_1 + \beta r_2 = a_1$ has a unique solution because $r_1 \ne r_2$. The resulting sequence and the given one agree at $n = 0, 1$ and obey the same recurrence, so by induction they agree for all $n$.
:::

:::steps Solve $a_n = a_{n-1} + 6a_{n-2}$ with $a_0 = 2$, $a_1 = 1$
1. Characteristic equation $r^2 - r - 6 = (r-3)(r+2) = 0$, roots $3, -2$.
2. $a_n = \alpha3^n + \beta(-2)^n$; $\alpha + \beta = 2$, $3\alpha - 2\beta = 1$.
3. Solving: $5\alpha = 5$, so $\alpha = 1$, $\beta = 1$; $a_n = 3^n + (-2)^n$.
4. Check $a_2 = 1 + 12 = 13 = 9 + 4$.
:::

:::steps How many bit strings of length 6 have no two consecutive 1s?
1. $a_n = a_{n-1} + a_{n-2}$, $a_1 = 2$, $a_2 = 3$.
2. $a_3 = 5$, $a_4 = 8$, $a_5 = 13$, $a_6 = 21$.
:::

:::steps Use the master theorem on $T(n) = 4T(n/2) + n$
1. $a = 4$, $b = 2$, so $n^{\log_2 4} = n^2$.
2. $f(n) = n$ is polynomially smaller than $n^2$, so the leaves dominate.
3. $T(n) = \Theta(n^2)$.
:::

:::mock Exam question
Solve $a_n = 5a_{n-1} - 6a_{n-2}$ with $a_0 = 1$, $a_1 = 4$, and find $a_5$.
:::solution
Characteristic equation $r^2 - 5r + 6 = 0$ gives $r = 2, 3$. Write $a_n = \alpha2^n + \beta3^n$. From $a_0$: $\alpha + \beta = 1$; from $a_1$: $2\alpha + 3\beta = 4$. So $\beta = 2$, $\alpha = -1$ and $a_n = 2\cdot3^n - 2^n$. Then $a_5 = 2\cdot243 - 32 = 454$. Check by iterating: $a_2 = 14$, $a_3 = 46$, $a_4 = 146$, $a_5 = 5\cdot146 - 6\cdot46 = 730 - 276 = 454$.
:::
:::

:::cs
Running times of recursive algorithms are recurrences: merge sort $\Theta(n\log n)$, binary search $\Theta(\log n)$, Karatsuba multiplication $\Theta(n^{1.585})$, naive Fibonacci $\Theta(\varphi^n)$. Dynamic programming is the programming form of a recurrence: compute $a_1, a_2, \dots$ in order and store them, turning exponential recursion into a linear loop.
:::

:::ml
Recurrent neural networks update a hidden state by $h_t = W h_{t-1} + \dots$; in the linear case $h_t$ behaves like $\lambda^t$ for the eigenvalues $\lambda$ of $W$, which is exactly the characteristic-root picture. Roots with $|\lambda| > 1$ explode and roots with $|\lambda| < 1$ vanish, the exploding and vanishing gradient problems. Momentum in gradient descent and exponential moving averages are first and second order linear recurrences too.
:::

:::real
A loan balance obeys $B_n = (1 + i)B_{n-1} - p$: grow by interest, then subtract the payment. This is a first-order non-homogeneous recurrence whose closed form gives the familiar mortgage payment formula. Population models such as "rabbits breed from their second month" give the Fibonacci recurrence.
:::

:::quiz
? Minimum moves for the Tower of Hanoi with 5 discs?
= 31
> $2^5 - 1 = 31$.

? If $a_n = 3a_{n-1}$ and $a_0 = 2$, what is $a_4$?
= 162
> $a_n = 2\cdot3^n$, so $a_4 = 2\cdot81 = 162$.

? How many bit strings of length 4 have no two consecutive 1s?
= 8
> $2, 3, 5, 8$.

? What is the larger root of the characteristic equation of $a_n = a_{n-1} + 6a_{n-2}$?
= 3
> $r^2 - r - 6 = (r - 3)(r + 2)$.

? By the master theorem, $T(n) = 2T(n/2) + n$ is
- $\Theta(n)$
+ $\Theta(n\log n)$
- $\Theta(n^2)$
- $\Theta(\log n)$
> $n^{\log_2 2} = n$ matches $f(n)$, giving an extra $\log n$.

? What is $F_{10}$ if $F_0 = 0$, $F_1 = 1$?
= 55
> $0,1,1,2,3,5,8,13,21,34,55$.
:::

## Lesson: Generating functions {#generating-functions}
@summary: Encoding a sequence as the coefficients of a power series so that counting becomes algebra with polynomials.

### A clothesline for numbers
The mathematician Herbert Wilf described a generating function as "a clothesline on which we hang up a sequence of numbers for display". The idea is to take a sequence $a_0, a_1, a_2, \dots$ and pack it into a single object,
$$A(x) = a_0 + a_1x + a_2x^2 + a_3x^3 + \cdots,$$
where the power of $x$ is just a label saying which term is which. We are not usually interested in plugging in a value of $x$. The point is that ordinary algebra on these expressions (adding, multiplying, dividing) turns out to perform counting automatically.

Here is a first taste. Suppose you have a coin and a die, and you ask how many ways each total can come up if the coin is worth 0 or 1 point and the die 1 to 6 points. Write the coin as $1 + x$ (one way to score 0, one way to score 1) and the die as $x + x^2 + \cdots + x^6$. Multiplying, each term of the product picks one option from each factor and adds their exponents, which is exactly adding the scores. The coefficient of $x^4$ in $(1+x)(x + \cdots + x^6)$ is 2 (score 4 = 0 + 4 or 1 + 3). Polynomial multiplication *is* the sum rule and product rule working together.

:::def Ordinary generating function
The ordinary generating function of a sequence $(a_n)_{n\ge0}$ is the formal power series $A(x) = \sum_{n\ge0}a_nx^n$. We write $[x^n]A(x)$ for the coefficient $a_n$.
:::

:::def Formal power series
An infinite polynomial $\sum a_nx^n$ manipulated by the usual rules of algebra, without worrying about whether it converges for particular numbers $x$.
:::

### The most important series
Everything rests on the geometric series
$$\frac{1}{1-x} = 1 + x + x^2 + x^3 + \cdots,$$
the generating function of the all-ones sequence $1, 1, 1, \dots$. You can check it by multiplying: $(1-x)(1 + x + x^2 + \cdots) = 1 + x + x^2 + \cdots - x - x^2 - \cdots = 1$. Replacing $x$ by $ax$ gives $\frac1{1-ax} = \sum a^nx^n$, the generating function of the powers $1, a, a^2, \dots$. Replacing $x$ by $x^2$ gives $\frac1{1-x^2} = 1 + x^2 + x^4 + \cdots$, which "allows only even numbers".

Two more facts come straight from earlier lessons. The binomial theorem says $(1+x)^n = \sum_k\binom nkx^k$, so $(1+x)^n$ generates the binomial coefficients. And multiplying $k$ copies of $\frac1{1-x}$ chooses a non-negative number from each of $k$ boxes with a fixed total, which is stars and bars:
$$\frac{1}{(1-x)^k} = \sum_{n\ge0}\binom{n+k-1}{k-1}x^n.$$

### Multiplication is convolution
If $A(x) = \sum a_nx^n$ and $B(x) = \sum b_nx^n$, then the coefficient of $x^n$ in $A(x)B(x)$ is
$$c_n = a_0b_n + a_1b_{n-1} + \cdots + a_nb_0.$$
In words: to get a total of $n$ from two independent choices, split $n$ as $k + (n - k)$ and count $a_k b_{n-k}$ for each split. This sum is called a **convolution**, and it is exactly what counting problems with several independent parts need.

### Counting with restrictions
Generating functions shine when each part has its own restriction. In how many ways can you make 10 cents from pennies (1 cent), nickels (5) and dimes (10)? Pennies can contribute any amount: $\frac1{1-x}$. Nickels contribute multiples of 5: $\frac1{1-x^5}$. Dimes contribute multiples of 10: $\frac1{1-x^{10}}$. The answer is the coefficient of $x^{10}$ in the product. Working it out (or just listing: 10 pennies; 1 nickel and 5 pennies; 2 nickels; 1 dime) gives 4. For 10 cents listing is easy, but the same product answers the question for a dollar or for any amount, and computers expand such products instantly.

### Solving recurrences
Generating functions also solve recurrences. Take $a_n = 3a_{n-1}$ for $n\ge1$, $a_0 = 2$. Multiply the recurrence by $x^n$ and sum over $n\ge1$: $A(x) - 2 = 3xA(x)$. So $A(x) = \frac{2}{1-3x} = \sum 2\cdot3^nx^n$ and $a_n = 2\cdot3^n$. For Fibonacci, the same steps give
$$F(x) = \sum F_nx^n = \frac{x}{1 - x - x^2}.$$
Splitting this fraction into partial fractions with the roots of $1 - x - x^2$ reproduces Binet's formula. Recurrence questions become questions about simplifying fractions.

### Probability generating functions
If a random variable $X$ takes values $0, 1, 2, \dots$, its probability generating function is $G(x) = \sum P(X = n)x^n$. Then $G(1) = 1$, the mean is $G'(1)$, and the distribution of a sum of independent variables has generating function equal to the product. A fair die has $G(x) = \frac16(x + x^2 + \cdots + x^6)$, and the sum of two dice has $G(x)^2$, whose coefficient of $x^7$ is $6/36$.

### Building a generating function step by step
When you meet a new counting problem, the recipe is always the same, and it helps to say it in words. First, identify the independent parts of the choice: the types of coin, the kinds of fruit, the separate dice. Second, for each part, write a series whose exponents are the amounts that part is allowed to contribute, each with coefficient equal to the number of ways of contributing that amount. A part that may contribute any amount gets one over one minus $x$; a part that may contribute at most three gets a short polynomial; a part restricted to even amounts gets only even powers. Third, multiply the series together. Fourth, read off the coefficient of the total you care about.

The power of the method is that the hard thinking happens once, part by part, and the rest is mechanical. You never have to list the combinations themselves, and the same product answers the question for every possible total at the same time. Often the product also simplifies in a surprising way, as in the fruit problem below, where four complicated restrictions collapse into the plain answer "one more than the number of fruits". When a product does not simplify, a computer can still expand it in a fraction of a second, which is how real software counts change, partitions and lattice structures.

### A note on exponential generating functions
For problems where the objects are labelled and order matters, such as arranging distinct people, mathematicians use exponential generating functions, which divide each coefficient by $n!$. They behave the same way, but their products count ways of merging labelled structures. You will meet them in more advanced courses; for this lesson, ordinary generating functions are enough.

### Common mistakes
Mixing up which exponent stands for which count. Forgetting the constant term (a part that may be chosen zero times contributes $x^0 = 1$). Writing $\frac1{1-x^5}$ as $1 + x + \cdots + x^5$; it is $1 + x^5 + x^{10} + \cdots$. And treating $x$ as a number to plug in, which is rarely needed and can cause convergence confusion; the coefficients are what matter.

### Summary
A generating function stores a sequence as coefficients of a power series. Multiplying generating functions convolves sequences, which counts combinations of independent parts. Key series: $\frac1{1-x}$, $\frac1{1-ax}$, $(1+x)^n$ and $\frac1{(1-x)^k}$. Restrictions are encoded factor by factor, recurrences become equations for $A(x)$, and probability generating functions do the same for distributions.

@viz sigma term=half n=6 | Each bar is one term of the geometric series. The partial sums approach a closed form.

:::explore
**What to try**
1. With the term $(1/2)^i$, increase $n$ from 1 to 12 and watch the total approach 1.
2. Compare with the formula: $\sum_{i\ge0}x^i = \frac1{1-x}$ at $x = \tfrac12$ is 2; the widget starts at $i = 1$, so it approaches $2 - 1 = 1$.
3. Switch the term to $1$ and see the sum grow without bound: at $x = 1$ the series $\frac1{1-x}$ blows up.

**What to notice:** an infinite list of coefficients really is captured by one compact expression. That is the trade generating functions make: a whole sequence in exchange for one formula you can do algebra on.
:::

@viz pascal | Row $n$ of Pascal's triangle is the list of coefficients of $(1+x)^n$.

:::explore
**What to try**
1. Read row 4: $1, 4, 6, 4, 1$, the coefficients of $(1+x)^4$.
2. Check that each entry is the sum of two above it; that is the multiplication $(1+x)^4 = (1+x)(1+x)^3$ as a convolution.

**What to notice:** multiplying by $(1+x)$ adds each coefficient to its neighbour, exactly the convolution rule from the article.
:::

:::formulas
$$\frac1{1-x} = \sum_{n\ge0}x^n,\qquad \frac1{1-ax} = \sum_{n\ge0}a^nx^n$$
$$(1+x)^n = \sum_k\binom nkx^k,\qquad \frac1{(1-x)^k} = \sum_n\binom{n+k-1}{k-1}x^n$$
$$[x^n]\,A(x)B(x) = \sum_{j=0}^na_jb_{n-j}$$
$$\sum_{n\ge0}F_nx^n = \frac{x}{1-x-x^2}$$
:::

:::thm Product rule for generating functions
If $a_n$ counts ways to choose an object of type A of size $n$ and $b_n$ counts objects of type B of size $n$, then the number of pairs (one of each) of total size $n$ is $[x^n]A(x)B(x)$.
:::

:::proof
A pair of total size $n$ consists of an A-object of some size $j$ and a B-object of size $n - j$, for $j = 0, \dots, n$. By the product rule there are $a_jb_{n-j}$ such pairs for each $j$, and by the sum rule the total is $\sum_ja_jb_{n-j}$, which is exactly the coefficient of $x^n$ in the product of the two series.
:::

:::steps Find the coefficient of $x^3$ in $\frac1{(1-x)^3}$
1. By stars and bars, $[x^n](1-x)^{-k} = \binom{n+k-1}{k-1}$.
2. With $n = 3$, $k = 3$: $\binom{5}{2} = 10$.
:::

:::steps How many ways can two dice show a total of 7?
1. One die: $x + x^2 + \cdots + x^6$.
2. Two dice: the square. The $x^7$ coefficient counts pairs $(j, 7-j)$ with $1\le j\le6$.
3. All six values of $j$ work, so the coefficient is 6.
:::

:::steps Use a generating function to solve $a_n = 2a_{n-1} + 1$, $a_0 = 0$
1. Sum over $n\ge1$: $A(x) = 2xA(x) + \frac{x}{1-x}$.
2. $A(x) = \frac{x}{(1-x)(1-2x)} = \frac{1}{1-2x} - \frac{1}{1-x}$.
3. So $a_n = 2^n - 1$, the Tower of Hanoi numbers.
:::

:::mock Exam question
A fruit bag must contain an even number of apples, a multiple of 5 bananas, at most 4 oranges and at most 1 pear. In how many ways can you pack a bag of 6 fruits?
:::solution
The generating functions are: apples $\frac1{1-x^2}$, bananas $\frac1{1-x^5}$, oranges $1 + x + x^2 + x^3 + x^4 = \frac{1-x^5}{1-x}$, pears $1 + x$. The product is $\frac{1}{1-x^2}\cdot\frac1{1-x^5}\cdot\frac{1-x^5}{1-x}\cdot(1+x) = \frac{1+x}{(1-x)(1-x^2)} = \frac1{(1-x)^2}$, since $1 - x^2 = (1-x)(1+x)$. So the number of bags of $n$ fruits is $[x^n](1-x)^{-2} = n + 1$, and for $n = 6$ the answer is 7.
:::
:::

:::ml
Probability generating functions and their cousins, moment generating functions $E[e^{tX}]$, make sums of independent random variables easy: the generating function of the sum is the product. This is the cleanest route to the distribution of a sum of dice or Bernoulli trials and to proofs of the central limit theorem. Polynomial multiplication is also the convolution used in convolutional layers and in fast Fourier transform algorithms.
:::

:::cs
Generating functions are the standard tool for analysing algorithms: the average depth of binary search trees, the number of comparisons in quicksort and the count of trees of each size all come from solving equations for $A(x)$. Computer algebra systems count combinatorial structures by expanding these series.
:::

:::real
Cashiers and vending machines face the change-making problem: how many ways can an amount be paid in given coins? The coefficient of $x^{\text{amount}}$ in $\prod\frac1{1-x^{c}}$ over coin values $c$ answers it. Insurers combine the distributions of independent claims by multiplying their generating functions.
:::

:::quiz
? What is the coefficient of $x^5$ in $\frac1{1-2x}$?
= 32
> $\frac1{1-2x} = \sum2^nx^n$, so the coefficient is $2^5$.

? What is the coefficient of $x^4$ in $(1+x)^6$?
= 15
> $\binom64 = 15$.

? How many ways can you make 10 cents from pennies, nickels and dimes?
= 4
> The coefficient of $x^{10}$ in $\frac{1}{(1-x)(1-x^5)(1-x^{10})}$: 10p, 1n+5p, 2n, 1d.

? Which sequence does $\frac1{1-x^2}$ generate?
- $1,1,1,1,\dots$
+ $1,0,1,0,\dots$
- $1,2,4,8,\dots$
> It is $1 + x^2 + x^4 + \cdots$: coefficient 1 on even powers, 0 on odd.

? What is the coefficient of $x^2$ in $\frac1{(1-x)^4}$?
= 10
> $\binom{2+3}{3} = 10$.

? The coefficient of $x^n$ in $A(x)B(x)$ equals
+ $\sum_{j=0}^n a_jb_{n-j}$
- $a_nb_n$
- $a_n + b_n$
> Multiplication of series is convolution of coefficients.
:::

## Lesson: Catalan numbers {#catalan-numbers}
@summary: The sequence 1, 1, 2, 5, 14, 42 counting balanced parentheses, Dyck paths, binary trees and triangulations, with the reflection proof.

### One sequence, many disguises
Write down all the ways to arrange three pairs of parentheses so that they balance: ((())), (()()), (())(), ()(()), ()()(). There are 5. Now count the ways to cut a pentagon into triangles using non-crossing diagonals: also 5. Count the binary trees with 3 nodes: 5 again. Count the paths on a grid from $(0,0)$ to $(3,3)$ moving right or up that never rise above the diagonal: 5. This is not a coincidence. All of these are counted by the **Catalan numbers**
$$1,\ 1,\ 2,\ 5,\ 14,\ 42,\ 132,\ 429,\ 1430,\ \dots$$
named after the Belgian mathematician Eugène Catalan. They appear in so many problems (one famous book lists over two hundred interpretations) that recognising them is a core skill for computer scientists, who meet them in parsing, trees and stack algorithms.

:::def Catalan numbers
$C_n = \frac{1}{n+1}\binom{2n}{n}$ for $n\ge0$. $C_n$ counts balanced strings of $n$ pairs of parentheses, among many other structures.
:::

:::def Dyck path
A path of $n$ up-steps and $n$ down-steps that starts and ends at height 0 and never goes below height 0.
:::

### Parentheses as paths
To see why all these are the same, translate. Read a parenthesis string left to right; draw an up-step for "(" and a down-step for ")". Balancing means two things: equal numbers of each symbol, so the path ends at height 0; and at no point more ")" than "(" so far, so the path never dips below 0. A balanced string is exactly a Dyck path. Rotating by 45 degrees turns Dyck paths into the grid paths below the diagonal. Translations like these, called **bijections**, are how one count serves many problems.

@fig g09-arrange mode=catalan n=3 | Balanced parentheses drawn as mountain paths: "(" is up, ")" is down, and the path never crosses the floor.

### The reflection trick
Without the "never below 0" condition, a path of $n$ ups and $n$ downs is just a choice of positions for the ups: $\binom{2n}{n}$ paths. We need to subtract the bad ones, which touch height $-1$ at some point. Here is a beautiful trick due to Désiré André. Take a bad path and find the first moment it touches $-1$. Reflect everything after that moment (swap ups and downs). The original path ended at 0; reflected, it ends at $-2$. So it now has $n - 1$ ups and $n + 1$ downs. Conversely, any path with $n - 1$ ups and $n + 1$ downs must touch $-1$, and reflecting after its first touch gives back a bad path. So bad paths correspond one to one with paths of $n+1$ downs, of which there are $\binom{2n}{n+1}$. Hence
$$C_n = \binom{2n}{n} - \binom{2n}{n+1} = \frac{1}{n+1}\binom{2n}{n}.$$
For $n = 3$: $\binom63 - \binom64 = 20 - 15 = 5$. For $n = 4$: $70 - 56 = 14$.

### The Catalan recurrence
Every non-empty balanced string can be written uniquely as $(A)B$, where $A$ and $B$ are balanced: $A$ is what sits inside the parenthesis that matches the first "(", and $B$ is what follows. If $A$ has $k$ pairs, $B$ has $n - 1 - k$. Summing over $k$,
$$C_n = \sum_{k=0}^{n-1}C_kC_{n-1-k},\qquad C_0 = 1.$$
Check: $C_3 = C_0C_2 + C_1C_1 + C_2C_0 = 2 + 1 + 2 = 5$, and $C_4 = 5 + 2 + 2 + 5 = 14$. The same "first piece plus the rest" decomposition works for binary trees (left subtree and right subtree of the root) and for triangulations (the triangle on a fixed edge splits the polygon in two), which is why those are counted by Catalan numbers too. A binary tree with $n$ nodes and a triangulation of a polygon with $n + 2$ sides are both counted by $C_n$.

### How fast do they grow?
From the formula, $\frac{C_{n+1}}{C_n} = \frac{2(2n+1)}{n+2}$, which tends to 4. In fact $C_n \approx \frac{4^n}{n^{3/2}\sqrt\pi}$. They grow exponentially, but more slowly than $\binom{2n}n\approx 4^n/\sqrt{\pi n}$: only about a $1/(n+1)$ fraction of all up-down paths stay above the floor.

### Listing small cases carefully
It is worth building the first few Catalan numbers by hand, because the listing shows the structure behind the formula. With zero pairs there is one string, the empty string, so the first value is 1. With one pair the only string is (). With two pairs we have (()) and ()(), two strings. With three pairs we get the five strings from the opening paragraph. Notice how each three-pair string starts with an opening bracket whose partner closes somewhere: after one pair inside, after two pairs inside, or right away. Sorting the strings by where that first partner closes is exactly the recurrence.

The formula also tells you something that is not obvious: dividing the central binomial coefficient by $n + 1$ always gives a whole number. For example, the central coefficient for $n = 6$ is 924, and 924 divided by 7 is exactly 132. The reflection argument explains why, because the Catalan number is a difference of two whole numbers.

### Recognising a Catalan problem
How do you know a problem might have a Catalan answer? Look for three signs. The objects split into a "first piece" and "the rest", each of the same kind. There is some sort of balance or nesting condition, such as brackets that must match or a path that must not cross a line. And the small cases come out as 1, 2, 5, 14. When you see those numbers, try to build a bijection with balanced parentheses; once you have one, the formula comes for free.

### Common mistakes
Off-by-one indexing is the main trap: $n$ pairs of parentheses give $C_n$, but a polygon with $n$ sides gives $C_{n-2}$, and $n$ matrices multiplied in a chain give $C_{n-1}$ ways to bracket the product. Always test the smallest case. Another mistake is to subtract $\binom{2n}{n-1}$ for the wrong reason; it happens to equal $\binom{2n}{n+1}$, but understanding the reflection makes the formula impossible to forget.

### Summary
Catalan numbers $C_n = \frac1{n+1}\binom{2n}n = \binom{2n}n - \binom{2n}{n+1}$ count balanced parentheses, Dyck paths, binary trees with $n$ nodes, triangulations of an $(n+2)$-gon and many more. The reflection trick counts the bad paths, and the decomposition $(A)B$ gives the recurrence $C_n = \sum C_kC_{n-1-k}$. The first values are $1, 1, 2, 5, 14, 42, 132, 429$.

@viz g09-arrange mode=catalan n=3 | Each balanced parenthesis string is drawn as a path. Step through them with the path slider.

:::explore
**What to try**
1. With $n = 3$, step the path slider from 1 to 5 and watch each of the five strings become a mountain path.
2. Check that no path ever dips below the red floor line.
3. Increase $n$ to 4, 5 and 6 and compare the count with $1, 2, 5, 14, 42, 132$.
4. Pick a path and find the first return to the floor: the part before it is $(A)$ and the rest is $B$, the decomposition behind the recurrence.

**What to notice:** every listing satisfies "never below the floor", and the count matches $\frac1{n+1}\binom{2n}n$ exactly. The paths that would dip below are the ones the reflection argument removes.
:::

@viz pascal | Find the central entries $\binom{2n}{n}$ and their right neighbours $\binom{2n}{n+1}$.

:::explore
**What to try**
1. In row 6 find $\binom63 = 20$ and its neighbour $\binom64 = 15$; their difference is $C_3 = 5$.
2. In row 8 find $70$ and $56$; the difference is $C_4 = 14$.

**What to notice:** each Catalan number is a difference of two neighbouring Pascal entries, which is the reflection formula from the article.
:::

:::formulas
$$C_n = \frac1{n+1}\binom{2n}{n} = \binom{2n}{n} - \binom{2n}{n+1}$$
$$C_n = \sum_{k=0}^{n-1}C_kC_{n-1-k},\quad C_0 = 1$$
$$C_{n+1} = \frac{2(2n+1)}{n+2}C_n$$
$$C_n\sim\frac{4^n}{n^{3/2}\sqrt\pi}$$
:::

:::thm Catalan count of Dyck paths
The number of paths with $n$ up-steps and $n$ down-steps that never go below height 0 is $C_n = \frac{1}{n+1}\binom{2n}{n}$.
:::

:::proof
All paths with $n$ ups and $n$ downs number $\binom{2n}{n}$. Reflecting the portion of a bad path after its first visit to height $-1$ gives a bijection between bad paths and paths with $n-1$ ups and $n+1$ downs, of which there are $\binom{2n}{n+1}$. So $C_n = \binom{2n}n - \binom{2n}{n+1} = \binom{2n}{n}\left(1 - \frac{n}{n+1}\right) = \frac1{n+1}\binom{2n}n$, using $\binom{2n}{n+1} = \binom{2n}{n}\frac{n}{n+1}$.
:::

:::steps Compute $C_5$
1. $\binom{10}{5} = 252$.
2. $C_5 = 252/6 = 42$.
3. Check with the reflection form: $252 - \binom{10}{6} = 252 - 210 = 42$.
:::

:::steps How many ways can a convex hexagon be triangulated?
1. A polygon with $n + 2$ sides has $C_n$ triangulations; a hexagon has $6 = 4 + 2$ sides.
2. $C_4 = \frac15\binom84 = 70/5 = 14$.
:::

:::steps How many binary trees have 3 nodes?
1. Root plus left and right subtrees with $k$ and $2 - k$ nodes: $C_0C_2 + C_1C_1 + C_2C_0$.
2. $= 2 + 1 + 2 = 5$.
:::

:::mock Exam question
A grid path from $(0,0)$ to $(5,5)$ uses unit steps right (R) or up (U). How many such paths never go above the diagonal $y = x$? What fraction of all such paths is this?
:::solution
Read R as "(" and U as ")". Staying on or below the diagonal means that at every point the number of R steps is at least the number of U steps, so the paths are Dyck paths with 5 pairs and there are $C_5 = \frac16\binom{10}5 = 42$ of them. All paths number $\binom{10}{5} = 252$. The fraction is $42/252 = 1/6 = 1/(n+1)$.
:::
:::

:::cs
Balanced parentheses are the language that every parser and compiler checks with a stack, and $C_n$ counts the ways to fully parenthesise a product of $n + 1$ factors, the search space of the matrix-chain multiplication DP. The number of different binary search tree shapes on $n$ keys is $C_n$, and the permutations that can be sorted by a single stack are counted by $C_n$ too.
:::

:::ml
Expression trees and parse trees in program synthesis and grammar induction are binary trees, so the search spaces grow like $C_n\approx4^n$; this is why such methods rely on heuristics or learned guidance. In random-walk models, the probability that a symmetric walk first returns to its start at step $2n$ is $\frac{C_{n-1}}{2^{2n-1}}$, a Catalan expression.
:::

:::real
In an election where candidate A receives $n$ votes and B receives $n$ votes, the number of counting orders in which A is never behind is $C_n$; this is the classical ballot problem. Mountain silhouettes, non-crossing handshakes around a round table ($n$ pairs of people shaking hands across the table without crossing arms: $C_n$ ways) and folded road maps are other everyday sightings.
:::

:::quiz
? What is $C_3$?
= 5
> $\frac14\binom63 = 20/4 = 5$.

? How many balanced strings use 4 pairs of parentheses?
= 14
> $C_4 = \frac15\binom84 = 14$.

? What is $C_5$?
= 42
> $252/6 = 42$.

? How many ways can a convex pentagon be triangulated?
= 5
> A pentagon has $3 + 2$ sides, so the count is $C_3 = 5$.

? Compute $\binom{8}{4} - \binom{8}{5}$.
= 14
> $70 - 56 = 14 = C_4$, the reflection formula.

? In the reflection argument, a bad path with $n$ ups and $n$ downs becomes a path ending at height
- 0
+ $-2$
- $2$
- $-1$
> After the first touch at $-1$ the remaining part, which would have climbed $+1$ back to 0, is flipped to go down 1 more, ending at $-2$.
:::
