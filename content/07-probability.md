---
id: probability
title: Probability
tagline: Uncertainty made precise — events, counting, conditional probability, Bayes, random variables, distributions, limit theorems and Markov chains.
desc: The language of uncertainty that underlies all of machine learning and randomized algorithms. You'll learn sample spaces and axioms, counting-based probability, conditional probability and independence, Bayes' theorem, discrete and continuous random variables, expectation and variance and their rules, the key discrete and continuous distributions, the normal and multivariate normal distributions, joint distributions and correlation, the inequalities and limit theorems that make averages trustworthy, and Markov chains.
color: #f43f5e
symbol: P(A)
area: Probability & data
paths: ml, cs
order: 6
---

# Unit: Foundations of probability
## Lesson: Sample spaces, events and the axioms of probability {#axioms}
@summary: What probability is, how to describe outcomes and events, and the three rules everything else follows from.

### Why we need a language for uncertainty
Will it rain tomorrow? Will this email turn out to be spam? Will a server get more than a thousand requests in the next second? None of these questions has a yes-or-no answer you can know in advance, yet we still make decisions about them every day. You take an umbrella, a spam filter moves a message, an engineer adds another machine. Probability is the part of mathematics that lets us talk about "how likely" in a precise, consistent way, so that different people (and different programs) reach the same conclusions from the same information.

Machine learning is built on this language. A classifier that says "this image is a cat with probability 0.92" is making a probabilistic statement. A language model choosing the next word is sampling from a probability distribution. Before we can understand any of that, we need the basic vocabulary: experiments, outcomes, sample spaces and events. Then we need the three rules, called axioms, that every probability must obey.

### Experiments and outcomes
Imagine you are about to roll an ordinary six-sided die. Before you roll, you don't know what will come up, but you do know the full list of things that *could* come up: 1, 2, 3, 4, 5 or 6. In probability, any process with an uncertain result is called an **experiment**, and each possible result is an **outcome**. Rolling a die, flipping a coin, measuring tomorrow's temperature, and recording how long a web page takes to load are all experiments.

The set of all possible outcomes is the **sample space**, written $S$ or $\Omega$ (the Greek capital omega). For one die, $S = \{1, 2, 3, 4, 5, 6\}$. For one coin, $S = \{H, T\}$. For two coins flipped one after the other, the outcomes are pairs, so $S = \{HH, HT, TH, TT\}$. Notice that $HT$ and $TH$ are different outcomes: the first coin and the second coin are different objects. Writing the sample space out carefully is often the single most useful step in solving a probability problem.

:::def Sample space
The set $S$ (or $\Omega$) of all possible outcomes of an experiment. For a die, $S = \{1, 2, 3, 4, 5, 6\}$.
:::

### Events are sets of outcomes
Usually we care about a *group* of outcomes rather than one. "Roll an even number" happens if the die shows 2, 4 or 6. So we describe it as the set $E = \{2, 4, 6\}$. Any subset of the sample space is called an **event**. We say the event "happens" if the actual outcome lands inside that set. A single outcome like $\{5\}$ is an event too, and so is the whole sample space $S$ (something certainly happens) and the empty set $\emptyset$ (an impossible event, such as rolling a 7).

:::def Event
Any subset of the sample space. "Roll an even number" is the event $\{2, 4, 6\}$.
:::

Because events are sets, we can combine them with set operations, and each operation has an everyday meaning. Let $A = \{2, 4, 6\}$ (even) and $B = \{4, 5, 6\}$ (at least 4).
The **union** $A \cup B$ means "$A$ or $B$ (or both)": $\{2, 4, 5, 6\}$.
The **intersection** $A \cap B$ means "$A$ and $B$": $\{4, 6\}$.
The **complement** $A^c$ means "not $A$": $\{1, 3, 5\}$.
Two events are **disjoint** (or mutually exclusive) if they share no outcomes, so they can never happen together. "Roll a 1" and "roll an even number" are disjoint.

:::def Disjoint events
Events $A$ and $B$ with $A \cap B = \emptyset$: they cannot both happen on the same trial.
:::

@fig venn | Two events inside the sample space S. The overlap is A ∩ B; everything outside A is Aᶜ.

### The three axioms
A **probability** is a rule $P$ that gives each event a number. In the 1930s the Russian mathematician Andrey Kolmogorov showed that you only need three rules, and everything else follows from them:

1. **Non-negativity:** $P(A) \ge 0$ for every event $A$.
2. **Normalization:** $P(S) = 1$. Something in the sample space certainly happens.
3. **Additivity:** if $A$ and $B$ are disjoint, then $P(A \cup B) = P(A) + P(B)$. (The full version allows any countable list of disjoint events.)

These rules match the way we think about proportions. If you picture probability as "the fraction of a big pile of sand sitting on each region", then no region can have negative sand, the whole pile is 1, and the sand on two separate regions adds up.

:::def Probability axioms (Kolmogorov)
A probability $P$ satisfies $P(A) \ge 0$, $P(S) = 1$, and $P(A\cup B) = P(A) + P(B)$ whenever $A$ and $B$ are disjoint.
:::

### What follows from the axioms
From just three rules we can prove the facts you probably already use.

**The complement rule.** $A$ and $A^c$ are disjoint and together make up $S$. So $P(A) + P(A^c) = P(S) = 1$, which gives $P(A^c) = 1 - P(A)$. If the chance of rain is 0.3, the chance of no rain is 0.7.

**The impossible event.** $\emptyset$ is the complement of $S$, so $P(\emptyset) = 1 - 1 = 0$.

**Probabilities are at most 1.** Since $P(A^c) \ge 0$, we get $P(A) = 1 - P(A^c) \le 1$.

**The addition rule for overlapping events.** If $A$ and $B$ overlap, simply adding $P(A) + P(B)$ counts the overlap twice. Subtracting it once fixes this:
$$P(A\cup B) = P(A) + P(B) - P(A\cap B)$$
With the die, $P(A) = \frac36$, $P(B) = \frac36$ and $P(A\cap B) = P(\{4,6\}) = \frac26$. So $P(A\cup B) = \frac36 + \frac36 - \frac26 = \frac46$, which matches counting $\{2, 4, 5, 6\}$ directly.

### Equally likely outcomes
When every outcome in a finite sample space is equally likely (a fair die, a well-shuffled deck), the axioms force each outcome to have probability $\frac{1}{|S|}$, where $|S|$ is the number of outcomes. Then any event's probability is just a count:
$$P(A) = \frac{|A|}{|S|} = \frac{\text{number of outcomes in } A}{\text{total number of outcomes}}$$
For two fair coins, $P(\text{exactly one head}) = \frac{|\{HT, TH\}|}{4} = \frac24 = \frac12$. This "count and divide" idea is so useful that the next lesson is devoted to counting.

### Where do the numbers come from?
The axioms tell us how probabilities must *behave*, not what they *are*. In practice there are three common ways to assign them. The **classical** view uses symmetry: a fair die has six equally likely faces. The **frequentist** view says a probability is the long-run fraction of times an event happens if you repeat the experiment many times: if 30% of days with these weather conditions had rain, $P(\text{rain}) = 0.3$. The **Bayesian** view treats probability as a degree of belief that gets updated with evidence. All three obey the same axioms, so all the rules in this course apply to all of them.

### Common mistakes
A frequent error is to treat outcomes as equally likely when they aren't. When you flip two coins, "two heads", "two tails" and "one of each" are *not* equally likely: "one of each" has two outcomes ($HT$ and $TH$), so it has probability $\frac12$, while each of the others has $\frac14$. Listing the sample space with ordered outcomes avoids this trap.

Another mistake is adding probabilities of events that overlap. $P(\text{even or at least 4})$ is not $\frac36 + \frac36 = 1$. Only add directly when the events are disjoint; otherwise subtract the overlap.

A third mistake is forgetting the complement trick. "At least one" questions are usually much easier through "none". The chance of at least one six in four rolls is $1 - P(\text{no sixes}) = 1 - \left(\frac56\right)^4 \approx 1 - 0.482 = 0.518$.

:::tip Use the complement
Whenever you see "at least one", compute the probability of "none" and subtract it from 1.
:::

### Summary
An experiment has a sample space $S$ of outcomes; events are subsets of $S$. A probability assigns each event a number obeying three axioms: never negative, total 1, and additive for disjoint events. From these come the complement rule $P(A^c) = 1 - P(A)$, the addition rule $P(A\cup B) = P(A) + P(B) - P(A\cap B)$, and, for equally likely outcomes, $P(A) = |A|/|S|$.

@viz venn | Switch between union, intersection, conditional and complement, and change the three probabilities.

:::explore
**What to try**
1. Choose the A ∪ B view and set $P(A) = 0.4$, $P(B) = 0.3$, $P(A\cap B) = 0$. Read off the union.
2. Now raise $P(A\cap B)$ to 0.12 and watch the union shrink to $0.4 + 0.3 - 0.12$.
3. Switch to the Aᶜ view and check that the shaded area is always $1 - P(A)$.
4. In the A ∩ B view, set $P(A\cap B) = P(A)P(B)$ (for example 0.4, 0.3 and 0.12) and read the message.

**What to notice:** the overlap is exactly the part that would be counted twice if you added $P(A)$ and $P(B)$. When the overlap is zero the events are disjoint and the plain addition axiom applies. The complement is everything outside $A$, which is why it always has probability $1 - P(A)$.
:::

:::formulas
$$P(A)\ge0,\qquad P(S) = 1,\qquad P(A\cup B) = P(A)+P(B)\ \text{ if } A\cap B=\emptyset$$
$$P(A^c) = 1 - P(A)\qquad P(\emptyset) = 0$$
$$P(A\cup B) = P(A) + P(B) - P(A\cap B)$$
$$P(A) = \frac{|A|}{|S|}\quad\text{(equally likely outcomes)}$$
$$P(A\cup B\cup C) = P(A)+P(B)+P(C) - P(A\cap B) - P(A\cap C) - P(B\cap C) + P(A\cap B\cap C)$$
:::

:::thm Addition rule (inclusion–exclusion for two events)
For any events $A$ and $B$, $P(A\cup B) = P(A) + P(B) - P(A\cap B)$.
:::

:::proof
Split $A\cup B$ into two disjoint pieces: $A$ and $B\cap A^c$ (the part of $B$ outside $A$). By additivity, $P(A\cup B) = P(A) + P(B\cap A^c)$. Also $B$ is the disjoint union of $B\cap A$ and $B\cap A^c$, so $P(B\cap A^c) = P(B) - P(A\cap B)$. Substituting gives the result.
:::

:::thm Monotonicity
If $A\subseteq B$ then $P(A)\le P(B)$.
:::

:::proof
$B$ is the disjoint union of $A$ and $B\cap A^c$, so $P(B) = P(A) + P(B\cap A^c)\ge P(A)$ because the second term is non-negative.
:::

:::steps Two fair dice are rolled. Find the probability that the sum is 7.
1. The sample space has $6\times6 = 36$ equally likely ordered pairs.
2. The pairs with sum 7 are $(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$: 6 outcomes.
3. $P(\text{sum } 7) = \frac{6}{36} = \frac16$.
:::

:::steps In a class, 60% study French, 50% study Spanish and 20% study both. What fraction study neither?
1. Let $F$ and $E$ be the two events. $P(F\cup E) = 0.6 + 0.5 - 0.2 = 0.9$.
2. "Neither" is the complement of "at least one": $1 - 0.9 = 0.1$.
3. So 10% study neither language.
:::

:::steps Probability of at least one head in 5 fair coin flips
1. Complement: "no heads" means all five are tails.
2. $P(\text{all tails}) = \left(\frac12\right)^5 = \frac{1}{32}$.
3. $P(\text{at least one head}) = 1 - \frac{1}{32} = \frac{31}{32}\approx 0.969$.
:::

:::mock Exam question
A card is drawn from a standard 52-card deck. Let $A$ = "the card is a heart" and $B$ = "the card is a face card (J, Q or K)". Find $P(A\cup B)$.
:::solution
$P(A) = \frac{13}{52}$ and $P(B) = \frac{12}{52}$. The overlap is the three heart face cards, so $P(A\cap B) = \frac{3}{52}$. By the addition rule, $P(A\cup B) = \frac{13 + 12 - 3}{52} = \frac{22}{52} = \frac{11}{26}\approx 0.423$.
:::
:::

:::ml
A classifier's output layer (softmax) produces a probability distribution over classes: every number is non-negative and they sum to 1, exactly the first two axioms. Treating the classes as disjoint events is what lets us add probabilities, for example $P(\text{cat or dog}) = P(\text{cat}) + P(\text{dog})$.
:::

:::cs
Randomized algorithms (hashing, quicksort with random pivots, load balancers) are analyzed with these rules. The **union bound** $P(A_1\cup\dots\cup A_n)\le\sum_i P(A_i)$, which follows from the addition rule, is used constantly: if each of 1000 servers fails with probability $10^{-6}$, the chance that any fails is at most $10^{-3}$.
:::

:::real
Weather forecasts are probabilities. "70% chance of rain" means that, on days with conditions like these, it rained about 70% of the time; the complement rule says there is a 30% chance of a dry day. Insurance companies use the same rules to price policies.
:::

:::quiz
? $P(A) = 0.5$, $P(B) = 0.4$, $P(A\cap B) = 0.2$. Find $P(A\cup B)$.
= 0.7
> Addition rule: $0.5 + 0.4 - 0.2 = 0.7$.

? What is the probability of at least one head in 3 fair coin flips?
= 7/8|0.875
> $1 - P(\text{TTT}) = 1 - \frac18 = \frac78$.

? Two fair coins are flipped. What is $P(\text{exactly one head})$?
= 1/2|0.5
> The outcomes $HT$ and $TH$ are 2 of the 4 equally likely outcomes.

? If $P(A) = 0.35$, what is $P(A^c)$?
= 0.65
> Complement rule: $1 - 0.35$.

? Events $A$ and $B$ are disjoint with $P(A) = 0.3$ and $P(B) = 0.5$. What is $P(A\cap B)$?
- 0.15
- 0.8
+ 0
> Disjoint events share no outcomes, so their intersection is empty and has probability 0.

? Which of these can NOT be a valid probability assignment for a coin, as $(P(H), P(T))$?
- $(0.5, 0.5)$
- $(0.9, 0.1)$
+ $(0.7, 0.4)$
- $(1, 0)$
> The probabilities of all outcomes must add to 1 (normalization). $0.7 + 0.4 = 1.1$.
:::
## Lesson: Counting outcomes: permutations and combinations {#counting-probability}
@summary: The multiplication principle, permutations, combinations and how to turn counting into probability.

### Why counting matters for probability
In the last lesson we saw that when all outcomes are equally likely, a probability is a fraction: the number of outcomes in the event divided by the total number of outcomes. That sounds easy until the numbers get big. How many ways can a five-card poker hand be dealt? How many different passwords of length 8 are there? How likely is it that two people in a room of 23 share a birthday? Nobody lists millions of outcomes by hand. Instead we use a few counting rules that let us count huge sets quickly and correctly. This lesson builds those rules from scratch.

### The multiplication principle
Imagine you are getting dressed and have 3 shirts and 4 pairs of trousers. How many different outfits can you make? For each of the 3 shirts there are 4 trousers to pair with it, so there are $3\times4 = 12$ outfits. If you also choose one of 2 pairs of shoes, every one of those 12 outfits can go with either pair, so the total becomes $3\times4\times2 = 24$.

This is the **multiplication principle**: if a task is done in a sequence of steps, and step 1 can be done in $n_1$ ways, step 2 in $n_2$ ways (no matter what happened in step 1), and so on, then the whole task can be done in $n_1\times n_2\times\cdots\times n_k$ ways. Drawing a tree diagram makes this clear: each step splits every branch into the same number of new branches, and the number of leaves at the end is the product.

A quick application: a 4-digit PIN uses digits 0 to 9, and digits may repeat. Each of the 4 positions has 10 choices, so there are $10^4 = 10{,}000$ PINs. In general, choosing $k$ things in order from $n$ options *with replacement* (repeats allowed) gives $n^k$ possibilities.

### Arranging things in order: permutations
Now suppose repeats are not allowed. Five runners race, and we want to know how many different orders they can finish in. The winner can be any of 5 runners. Once the winner is fixed, second place can be any of the remaining 4, then third any of 3, then 2, then 1. By the multiplication principle there are $5\times4\times3\times2\times1 = 120$ orders. This product is written $5!$ and read "5 factorial". In general,
$$n! = n\times(n-1)\times\cdots\times2\times1,\qquad 0! = 1.$$
(Defining $0! = 1$ makes the formulas below work: there is exactly one way to arrange nothing.)

Often we only care about the first few places. How many ways can gold, silver and bronze be awarded among 5 runners? That is $5\times4\times3 = 60$: we stop after three choices. An ordered selection of $k$ items from $n$ distinct items, without repeats, is called a **permutation**, and the count is
$$P(n, k) = n\times(n-1)\times\cdots\times(n-k+1) = \frac{n!}{(n-k)!}.$$
Check: $\frac{5!}{2!} = \frac{120}{2} = 60$.

:::def Permutation
An ordered arrangement of $k$ distinct items chosen from $n$. There are $P(n,k) = \frac{n!}{(n-k)!}$ of them.
:::

### When order doesn't matter: combinations
Many questions don't care about order. If you pick 3 friends out of 5 to come to the cinema, the group {Ana, Ben, Cy} is the same group whichever order you invite them in. Let's count carefully. There are $P(5,3) = 60$ ordered lists of 3 friends. But every group of 3 people appears in that list $3! = 6$ times (once for each way of ordering those three people). So the number of *groups* is $\frac{60}{6} = 10$.

This is the key idea: **count with order, then divide by the number of orderings of each group**. An unordered selection is called a **combination**, and the number of combinations of $k$ items from $n$ is
$$\binom{n}{k} = \frac{n!}{k!\,(n-k)!},$$
read "$n$ choose $k$". These numbers are also called **binomial coefficients** because they appear when you expand $(a + b)^n$.

:::def Combination
An unordered selection of $k$ items from $n$. There are $\binom nk = \frac{n!}{k!(n-k)!}$ of them.
:::

A few values are worth knowing by heart: $\binom n0 = \binom nn = 1$ (one way to choose nothing or everything), $\binom n1 = n$, and $\binom n2 = \frac{n(n-1)}{2}$, the number of pairs. A group of 10 people can form $\binom{10}{2} = 45$ handshakes. Choosing which $k$ to take is the same as choosing which $n - k$ to leave, so $\binom nk = \binom{n}{n-k}$.

### Turning counts into probabilities
Now we can compute real probabilities. A lottery draws 6 numbers from 1 to 49, and order doesn't matter. The number of possible tickets is $\binom{49}{6} = 13{,}983{,}816$, so a single ticket wins the jackpot with probability about 1 in 14 million.

Here is a more typical example. A committee of 3 is chosen at random from 5 men and 4 women. What is the probability that exactly 2 women are chosen? The total number of committees is $\binom93 = 84$. To get exactly 2 women we choose 2 of the 4 women, $\binom42 = 6$ ways, and 1 of the 5 men, $\binom51 = 5$ ways. By the multiplication principle that's $6\times5 = 30$ committees. So the probability is $\frac{30}{84} = \frac{5}{14}\approx0.357$. This "choose from each group, multiply, divide by the total" pattern is called the **hypergeometric** pattern, and it appears whenever you sample without replacement from a population with two kinds of items.

### Arrangements with repeated letters
How many different strings can you make by rearranging the letters of MISSISSIPPI? If all 11 letters were different there would be $11!$ arrangements. But swapping the four S's among themselves gives the same string, and the same is true for the four I's and the two P's. So we divide out those repeats:
$$\frac{11!}{4!\,4!\,2!} = 34{,}650.$$

### The birthday problem
How many people need to be in a room before there's a better than even chance two share a birthday? Ignoring leap years and assuming all 365 days equally likely, use the complement: compute the probability that all birthdays are *different*. The first person can have any day, the second must avoid 1 day, the third must avoid 2, and so on. For $n$ people,
$$P(\text{all different}) = \frac{365\times364\times\cdots\times(365 - n + 1)}{365^n}.$$
For $n = 23$ this is about $0.493$, so the chance of a shared birthday is about $0.507$. Most people guess a much larger number, because they think about matching *their own* birthday rather than counting all $\binom{23}{2} = 253$ pairs of people.

### Common mistakes
The most common error is using permutations when order doesn't matter, or the other way round. Ask yourself: "If I swap two of the chosen items, is it a different outcome?" If yes, use permutations; if no, use combinations. Another error is double counting with "at least" questions: counting "at least one woman" by first choosing one woman and then any others counts the same committee several times. Use the complement ("no women") instead. Finally, the counting formula $P(A) = |A|/|S|$ only works if every outcome is equally likely, so make sure your sample space is built from equally likely outcomes, such as ordered dice rolls or equally likely hands.

### Summary
The multiplication principle multiplies the number of choices at each step. Ordered selections without repeats are permutations, $\frac{n!}{(n-k)!}$; unordered selections are combinations, $\binom nk = \frac{n!}{k!(n-k)!}$; with repeats allowed, ordered selections number $n^k$. Divide out orderings you don't care about. For equally likely outcomes, probability is a favourable count over a total count, and complements make "at least one" questions easy.

@viz counting | List every permutation or combination of a few letters.

:::explore
**What to try**
1. Set $n = 4$, $k = 2$ with "Order matters" and count the listed strings (there should be 12).
2. Switch to "Order doesn't" and notice that AB and BA collapse into one (6 remain).
3. Increase $k$ to 3 and compare: $P(4,3) = 24$ against $\binom43 = 4$. The ratio is $3! = 6$.
4. Try $n = 6$, $k = 6$ to see all $720$ orderings start to fill the panel.

**What to notice:** every combination appears exactly $k!$ times among the permutations, which is precisely why $\binom nk = \frac{P(n,k)}{k!}$. That's the "count with order, then divide" idea from the article.
:::

@viz pascal | Each number is the sum of the two above it; row n lists the values of n choose k.

:::explore
**What to try**
1. Find row 5 (the sixth row, starting from row 0 at the top) and read $1, 5, 10, 10, 5, 1$.
2. Check that $10 = 4 + 6$, the two entries above it.
3. Add up a whole row and compare with $2^n$.

**What to notice:** $\binom 5 2 = 10$ is the number of 2-element committees from 5 people. Each row sums to $2^n$ because $\sum_k\binom nk$ counts all subsets of an $n$-element set, and each element is either in or out.
:::

:::formulas
$$\text{ordered, with repeats: } n^k$$
$$n! = n(n-1)\cdots 1,\quad 0! = 1$$
$$P(n,k) = \frac{n!}{(n-k)!}\qquad \binom nk = \frac{n!}{k!\,(n-k)!}$$
$$\binom nk = \binom n{n-k}\qquad \binom nk = \binom{n-1}{k-1} + \binom{n-1}{k}$$
$$\text{multiset arrangements: } \frac{n!}{n_1!\,n_2!\cdots n_r!}$$
$$(a+b)^n = \sum_{k=0}^n\binom nk a^kb^{n-k}$$
:::

:::thm Pascal's rule
For $1\le k\le n-1$: $\binom nk = \binom{n-1}{k-1} + \binom{n-1}{k}$.
:::

:::proof
Fix one special item among the $n$. A $k$-element subset either contains it (then we choose the other $k-1$ from the remaining $n-1$: $\binom{n-1}{k-1}$ ways) or doesn't (choose all $k$ from the other $n-1$: $\binom{n-1}{k}$ ways). These cases are disjoint and cover everything, so the counts add.
:::

:::thm Binomial theorem
$(a + b)^n = \sum_{k=0}^n\binom nk a^kb^{n-k}$.
:::

:::proof
Expanding the product of $n$ factors $(a+b)$ means picking $a$ or $b$ from each factor. The term $a^kb^{n-k}$ appears once for every way to choose which $k$ factors contribute an $a$, which is $\binom nk$ ways.
:::

:::steps Two cards are dealt from a shuffled deck. What is the probability both are aces?
1. Unordered hands: $\binom{52}{2} = \frac{52\times51}{2} = 1326$.
2. Hands of two aces: $\binom42 = 6$.
3. $P = \frac{6}{1326} = \frac{1}{221}\approx0.0045$.
:::

:::steps How many 5-card hands contain exactly 3 hearts?
1. Choose 3 of the 13 hearts: $\binom{13}{3} = 286$.
2. Choose the other 2 cards from the 39 non-hearts: $\binom{39}{2} = 741$.
3. Multiply: $286\times741 = 211{,}926$ hands.
:::

:::steps In how many ways can 8 people sit in a row if Ana and Ben must sit together?
1. Glue Ana and Ben into one block. Now arrange 7 units: $7! = 5040$.
2. Inside the block they can sit as AB or BA: 2 ways.
3. Total $2\times5040 = 10{,}080$.
:::

:::mock Exam question
A password is 4 characters long, each chosen uniformly from 26 lowercase letters. What is the probability that all 4 characters are different?
:::solution
Total passwords: $26^4 = 456{,}976$. Passwords with all different letters: $26\times25\times24\times23 = 358{,}800$. So $P = \frac{358{,}800}{456{,}976}\approx0.785$. Equivalently, $1\cdot\frac{25}{26}\cdot\frac{24}{26}\cdot\frac{23}{26}\approx0.785$, the same reasoning as the birthday problem.
:::
:::

:::cs
Counting is the heart of analyzing algorithms and security. A brute-force attack on an 8-character password over 62 symbols must try up to $62^8\approx2.2\times10^{14}$ guesses. Hash collisions follow the birthday problem: with an $m$-bit hash, collisions become likely after about $2^{m/2}$ items, which is why 64-bit hashes are too short for some uses.
:::

:::ml
Combinations count model and feature choices: picking 5 features out of 100 gives $\binom{100}{5}\approx7.5\times10^7$ subsets, which is why exhaustive feature selection is infeasible and greedy or regularized methods are used. The binomial coefficients also appear in the binomial distribution of the number of correct predictions.
:::

:::real
Lotteries, card games and sports brackets are counting problems. A March-Madness style bracket of 63 games has $2^{63}\approx9.2\times10^{18}$ possible fillings, so a "perfect bracket" is essentially impossible by guessing.
:::

:::quiz
? How many ways can 4 books be arranged on a shelf?
= 24
> $4! = 4\times3\times2\times1 = 24$.

? What is $\binom{6}{2}$?
= 15
> $\frac{6\times5}{2} = 15$.

? A club of 10 picks a president, a vice-president and a treasurer (different people). How many ways?
= 720
> Order matters: $10\times9\times8 = 720$.

? A fair coin is flipped 4 times. What is the probability of exactly 2 heads?
= 3/8|0.375
> $\binom42 = 6$ of the $2^4 = 16$ equally likely sequences.

? Choosing a 5-card poker hand is a question of...
- permutations
+ combinations
- choices with replacement
> The order in which you receive the cards doesn't change the hand.

? How many distinct arrangements are there of the letters in BOOK?
= 12
> $\frac{4!}{2!} = 12$ because the two O's are identical.
:::
## Lesson: Conditional probability and independence {#conditional}
@summary: Updating probabilities when you learn something, the multiplication rule, total probability, and what it means for events to be independent.

### Learning something changes the odds
Suppose a friend rolls a fair die behind a book and tells you only one thing: "it's even." What is the chance it's a 6? Before the hint, $P(6) = \frac16$. After the hint, the possible outcomes are just 2, 4 and 6, all still equally likely, so the chance is now $\frac13$. The information didn't change the die; it changed what you *know*, and that shrank the set of outcomes you need to consider.

This is **conditional probability**: the probability of an event $A$ *given* that another event $B$ has happened, written $P(A\mid B)$ and read "probability of $A$ given $B$." It is the most important idea in this course for machine learning, because almost every prediction is a conditional probability: the probability of a label given the features, the probability of the next word given the previous words, the probability of a disease given a test result.

### The definition
When we learn that $B$ happened, $B$ becomes our new sample space. The only part of $A$ that can still happen is the part inside $B$, which is $A\cap B$. To make the probabilities inside the new universe add up to 1, we divide by $P(B)$:
$$P(A\mid B) = \frac{P(A\cap B)}{P(B)},\qquad P(B) > 0.$$
Check with the die: $A = \{6\}$, $B = \{2, 4, 6\}$, $A\cap B = \{6\}$. So $P(A\mid B) = \frac{1/6}{3/6} = \frac13$, exactly what we reasoned out.

:::def Conditional probability
The probability of $A$ given that $B$ occurred: $P(A\mid B) = \dfrac{P(A\cap B)}{P(B)}$, defined when $P(B)>0$.
:::

### Reading conditional probabilities from a table
Data often arrives as a table of counts, and conditional probabilities are just fractions of rows or columns. Imagine a company surveys 200 employees:

| | Satisfied | Not satisfied | Total |
|---|---|---|---|
| Remote | 60 | 20 | 80 |
| Office | 60 | 60 | 120 |
| Total | 120 | 80 | 200 |

The overall chance an employee is satisfied is $\frac{120}{200} = 0.6$. But given that someone works remotely, we only look at the Remote row: $P(\text{satisfied}\mid\text{remote}) = \frac{60}{80} = 0.75$. Given that someone is satisfied, we only look at the Satisfied column: $P(\text{remote}\mid\text{satisfied}) = \frac{60}{120} = 0.5$. These two numbers are different. In general $P(A\mid B)\ne P(B\mid A)$, and mixing them up is one of the most common and most costly errors in reasoning with data.

### The multiplication rule and tree diagrams
Rearranging the definition gives the **multiplication rule**:
$$P(A\cap B) = P(A\mid B)\,P(B) = P(B\mid A)\,P(A).$$
This is how we compute probabilities of things that happen in stages. Draw two cards without replacement. The chance the first is an ace is $\frac{4}{52}$. Given that, 3 aces remain among 51 cards, so the chance the second is an ace is $\frac{3}{51}$. Multiply: $P(\text{both aces}) = \frac{4}{52}\cdot\frac{3}{51} = \frac{1}{221}$.

A **tree diagram** makes this visual. Each branch is labelled with a conditional probability, and the probability of reaching a leaf is the product of the probabilities along its path. The rule extends to any number of stages: $P(A\cap B\cap C) = P(A)\,P(B\mid A)\,P(C\mid A\cap B)$.

### The law of total probability
Sometimes $P(A)$ is hard to find directly but easy once you split into cases. A factory has two machines. Machine 1 makes 60% of the parts and 2% of its parts are defective. Machine 2 makes 40% and 5% of its parts are defective. What fraction of all parts are defective? Split by machine:
$$P(D) = P(D\mid M_1)P(M_1) + P(D\mid M_2)P(M_2) = 0.02\times0.6 + 0.05\times0.4 = 0.012 + 0.020 = 0.032.$$
In general, if $B_1,\dots,B_n$ **partition** the sample space (they are disjoint and together cover everything), then $P(A) = \sum_i P(A\mid B_i)P(B_i)$. It's a weighted average of the conditional probabilities, with the case probabilities as weights. In a tree diagram, it means "add up all the leaves where $A$ happens."

### Independence: when information tells you nothing
Sometimes learning $B$ doesn't change the probability of $A$ at all. Flip a coin and roll a die: knowing the coin landed heads tells you nothing about the die. We call $A$ and $B$ **independent** if
$$P(A\cap B) = P(A)\,P(B),$$
which, when $P(B) > 0$, is the same as $P(A\mid B) = P(A)$.

Independence isn't always obvious. Roll one die and let $A$ = "even" $= \{2,4,6\}$ and $B = \{1, 2\}$. Then $P(A\cap B) = P(\{2\}) = \frac16$, and $P(A)P(B) = \frac12\cdot\frac13 = \frac16$. They are independent, even though they come from the same roll! Knowing the roll is 1 or 2 leaves the chance of "even" at $\frac12$. Change $B$ to $\{1, 2, 3\}$ and the equality fails: $P(A\cap B) = \frac16$ but $P(A)P(B) = \frac14$.

:::def Independent events
$A$ and $B$ are independent if $P(A\cap B) = P(A)P(B)$; equivalently $P(A\mid B) = P(A)$. Knowing one tells you nothing about the other.
:::

For more than two events, **mutual independence** requires the product rule for every sub-collection, not just every pair. Flip two fair coins and let $A$ = "first is heads", $B$ = "second is heads", $C$ = "both coins match". Each pair is independent (check: $P(A\cap C) = P(HH) = \frac14 = \frac12\cdot\frac12$), but $P(A\cap B\cap C) = \frac14\ne\frac18$. So the three are pairwise independent but not mutually independent.

### Conditional independence
Two events can be dependent overall but independent once you know a third fact. Shoe size and reading ability are correlated in children, because older children have bigger feet and read better. Given a child's age, shoe size tells you nothing more about reading. We write $P(A\cap B\mid C) = P(A\mid C)P(B\mid C)$ and say $A$ and $B$ are **conditionally independent given $C$**. This idea is the foundation of Naive Bayes classifiers and graphical models.

### Common mistakes
**Independent is not the same as disjoint.** If two events with positive probability are disjoint, then learning that one happened tells you the other certainly did not: they are strongly *dependent*. **Don't flip the condition.** $P(\text{positive test}\mid\text{disease})$ can be 0.95 while $P(\text{disease}\mid\text{positive test})$ is under 0.1; the next lesson explains why. **The gambler's fallacy:** after five reds on a fair roulette wheel, black is not "due." Independent spins have no memory.

### Summary
Conditional probability $P(A\mid B) = P(A\cap B)/P(B)$ restricts attention to the world where $B$ happened. The multiplication rule $P(A\cap B) = P(A\mid B)P(B)$ handles multi-stage experiments, and the law of total probability adds up cases. Events are independent when $P(A\cap B) = P(A)P(B)$, meaning one gives no information about the other.

@viz venn | Pick the A | B view to see conditioning as zooming in on B.

:::explore
**What to try**
1. Choose the A | B view. Set $P(A) = 0.4$, $P(B) = 0.3$, $P(A\cap B) = 0.12$ and read $P(A\mid B)$.
2. Keep $P(B) = 0.3$ and raise $P(A\cap B)$ to 0.24. Watch $P(A\mid B)$ climb to 0.8.
3. Switch to A ∩ B and find the value of $P(A\cap B)$ that makes the panel say "independent".
4. Set $P(A\cap B) = 0$ and look at $P(A\mid B)$ again.

**What to notice:** conditioning ignores everything outside $B$ and asks what fraction of $B$ is also in $A$. Independence is the special case where that fraction equals the fraction of the whole space that is in $A$. With zero overlap, $P(A\mid B) = 0$: disjoint events are dependent.
:::

:::formulas
$$P(A\mid B) = \frac{P(A\cap B)}{P(B)}$$
$$P(A\cap B) = P(A\mid B)P(B) = P(B\mid A)P(A)$$
$$P(A\cap B\cap C) = P(A)P(B\mid A)P(C\mid A\cap B)$$
$$P(A) = \sum_i P(A\mid B_i)P(B_i)\quad (B_i \text{ a partition})$$
$$\text{independent: } P(A\cap B) = P(A)P(B)$$
$$P(A^c\mid B) = 1 - P(A\mid B)$$
:::

:::thm Law of total probability
If $B_1,\dots,B_n$ are disjoint events with positive probability whose union is $S$, then for any event $A$, $P(A) = \sum_{i=1}^n P(A\mid B_i)P(B_i)$.
:::

:::proof
The sets $A\cap B_i$ are disjoint and their union is $A$, so $P(A) = \sum_i P(A\cap B_i)$ by additivity. By the multiplication rule each term is $P(A\mid B_i)P(B_i)$.
:::

:::thm Complements of independent events are independent
If $A$ and $B$ are independent, so are $A$ and $B^c$.
:::

:::proof
$P(A\cap B^c) = P(A) - P(A\cap B) = P(A) - P(A)P(B) = P(A)(1 - P(B)) = P(A)P(B^c)$.
:::

:::steps A bag has 5 red and 3 blue marbles. Two are drawn without replacement. Find P(both red).
1. $P(\text{first red}) = \frac58$.
2. Given that, 4 red remain among 7: $P(\text{second red}\mid\text{first red}) = \frac47$.
3. $P(\text{both red}) = \frac58\cdot\frac47 = \frac{20}{56} = \frac{5}{14}\approx0.357$.
:::

:::steps Using the factory above, a part is defective. Is it more likely from machine 1 or 2?
1. $P(D\cap M_1) = 0.012$ and $P(D\cap M_2) = 0.020$, with $P(D) = 0.032$.
2. $P(M_1\mid D) = \frac{0.012}{0.032} = 0.375$.
3. $P(M_2\mid D) = \frac{0.020}{0.032} = 0.625$. Machine 2 is more likely, even though it makes fewer parts.
:::

:::steps Three independent servers each fail with probability 0.1. Find P(at least one works).
1. All three fail: $0.1^3 = 0.001$ by independence.
2. Complement: $1 - 0.001 = 0.999$.
:::

:::mock Exam question
In the Monty Hall game, a car is behind one of three doors. You pick door 1. The host, who knows where the car is, always opens a different door with a goat behind it, then offers you the chance to switch. What is the probability of winning if you switch?
:::solution
Your first pick is right with probability $\frac13$; in that case switching loses. With probability $\frac23$ your first pick is a goat; then the host must open the only other goat door, so switching lands on the car. So $P(\text{win by switching}) = \frac23$. The host's choice gives information because it depends on where the car is.
:::
:::

:::ml
**Naive Bayes** classifiers assume features are conditionally independent given the class: $P(x_1,\dots,x_n\mid y) = \prod_i P(x_i\mid y)$. This is usually false, but it turns an impossible estimation problem into $n$ easy ones, and it works surprisingly well for spam filtering and text classification. Language models use the multiplication rule (chain rule) to score a sentence: $P(w_1,\dots,w_n) = \prod_t P(w_t\mid w_1,\dots,w_{t-1})$.
:::

:::cs
Reliability engineering uses independence: a system that needs all of $n$ independent parts working succeeds with probability $\prod_i p_i$, and a system with redundant copies fails only if every copy fails. Assuming independence when failures share a cause (same power supply, same bug) badly underestimates risk.
:::

:::real
Medical screening, insurance and sports statistics are full of conditioning. "The probability a 30-year-old smoker has a heart attack this year" is a conditional probability given age and smoking status, and insurance prices are set from such tables.
:::

:::quiz
? Roll a fair die. What is $P(6\mid\text{even})$?
= 1/3
> Given "even", the outcomes are 2, 4, 6; one of them is a 6.

? $P(A) = 0.3$, $P(B) = 0.5$ and they're independent. Find $P(A\cap B)$.
= 0.15
> Independence: $0.3\times0.5$.

? $P(A\cap B) = 0.2$ and $P(B) = 0.5$. Find $P(A\mid B)$.
= 0.4|2/5
> $0.2/0.5 = 0.4$.

? Using the survey table, what is $P(\text{satisfied}\mid\text{office})$?
= 1/2|0.5
> 60 of the 120 office workers are satisfied.

? Two events have positive probability and are disjoint. Are they independent?
- Yes, always
+ No, never
- It depends
> If one happens the other cannot, so $P(A\cap B) = 0\ne P(A)P(B)$.

? Machines A and B make 70% and 30% of the parts, with defect rates 1% and 4%. What is P(defective)?
= 0.019
> $0.01\times0.7 + 0.04\times0.3 = 0.007 + 0.012 = 0.019$.
:::
## Lesson: Bayes' theorem {#bayes}
@summary: Reversing conditional probabilities: from evidence back to causes, with priors, likelihoods and posteriors.

### The problem of reversing a condition
Doctors, spam filters and detectives all face the same kind of question. We know how likely the *evidence* is if some *cause* is true, but we want the reverse: how likely the cause is, given the evidence we actually see. A medical test's sensitivity tells us $P(\text{positive}\mid\text{disease})$. A patient wants $P(\text{disease}\mid\text{positive})$. These two numbers can be wildly different, and Bayes' theorem is the exact rule that converts one into the other.

Imagine a disease that affects 1% of people. A test catches 95% of people who have it, but it also gives a positive result to 10% of healthy people. You test positive. How worried should you be? Most people guess "about 95%." The true answer is under 9%. By the end of this lesson you'll be able to compute it yourself and explain exactly why.

### Deriving the theorem
The multiplication rule from the last lesson can be written two ways:
$$P(H\cap E) = P(E\mid H)P(H) = P(H\mid E)P(E).$$
Here $H$ is a hypothesis (a possible cause, like "has the disease") and $E$ is the evidence ("tested positive"). Divide both sides by $P(E)$ and you get **Bayes' theorem**:
$$P(H\mid E) = \frac{P(E\mid H)\,P(H)}{P(E)}.$$
That's the whole derivation. The power lies in how the pieces are interpreted.

### Prior, likelihood, evidence and posterior
Each term has a name.
The **prior** $P(H)$ is how plausible the hypothesis was *before* seeing the evidence. For the disease, it's the base rate, 1%.
The **likelihood** $P(E\mid H)$ is how well the hypothesis predicts the evidence. If you have the disease, a positive result is very likely: 0.95.
The **evidence** (or marginal likelihood) $P(E)$ is the overall probability of seeing this evidence, whatever the truth. We usually compute it with the law of total probability: $P(E) = P(E\mid H)P(H) + P(E\mid H^c)P(H^c)$.
The **posterior** $P(H\mid E)$ is the updated plausibility *after* the evidence.

So Bayes' theorem says: posterior = likelihood × prior ÷ evidence. Or, in words: start with what you believed, and reweight it by how well each possibility explained what you saw.

:::def Prior
$P(H)$: the probability of a hypothesis before seeing the evidence.
:::

:::def Likelihood
$P(E\mid H)$: the probability of the observed evidence if the hypothesis is true.
:::

:::def Posterior
$P(H\mid E)$: the probability of the hypothesis after taking the evidence into account.
:::

### Working the disease example
Let $D$ be "has the disease" and $+$ be "tests positive." We know $P(D) = 0.01$, $P(+\mid D) = 0.95$ and $P(+\mid D^c) = 0.10$.

First, the top of the fraction: $P(+\mid D)P(D) = 0.95\times0.01 = 0.0095$.
Next, the probability of a positive among healthy people: $P(+\mid D^c)P(D^c) = 0.10\times0.99 = 0.099$.
Add these to get the evidence: $P(+) = 0.0095 + 0.099 = 0.1085$.
Finally, $P(D\mid +) = \frac{0.0095}{0.1085}\approx0.088$.

Only about 8.8% of people who test positive actually have the disease.

### Why the answer is so low: think in counts
Numbers like 0.0095 are hard to feel, so picture 10,000 people. About 100 of them have the disease; 95 of those test positive. Of the 9,900 healthy people, 10% (990) also test positive. So there are $95 + 990 = 1085$ positive tests, and only 95 of them are real. $\frac{95}{1085}\approx8.8\%$. The false positives outnumber the true positives ten to one, simply because there are so many more healthy people. This way of reasoning, called **natural frequencies**, is the easiest way to check any Bayes calculation.

:::key Base rates matter
Ignoring the prior is the **base rate fallacy**. When a condition is rare, even an accurate test produces mostly false alarms. A positive result raised the probability from 1% to 8.8%, nearly nine times higher, but not to 95%.
:::

### Updating again: posteriors become priors
Suppose the patient takes a second, independent test and it is also positive. Today's posterior becomes tomorrow's prior. Now $P(D) = 0.088$ and
$$P(D\mid ++) = \frac{0.95\times0.088}{0.95\times0.088 + 0.10\times0.912} = \frac{0.0836}{0.0836 + 0.0912}\approx0.478.$$
After two positives it's close to a coin flip, and a third positive would push it to about 90%. This step-by-step updating is how Bayesian reasoning accumulates evidence.

### Odds form
There's a neat way to write Bayes' theorem with **odds**. The odds of $H$ are $\frac{P(H)}{P(H^c)}$. Then
$$\frac{P(H\mid E)}{P(H^c\mid E)} = \frac{P(E\mid H)}{P(E\mid H^c)}\times\frac{P(H)}{P(H^c)}.$$
Posterior odds equal the **likelihood ratio** times the prior odds. For our test the likelihood ratio is $\frac{0.95}{0.10} = 9.5$, and the prior odds are $\frac{1}{99}$, so posterior odds are $\frac{9.5}{99}\approx0.096$, which is a probability of $\frac{0.096}{1.096}\approx0.088$. Same answer, and it shows clearly that each test multiplies the odds by 9.5.

### Many hypotheses
Bayes' theorem works with any number of competing hypotheses $H_1,\dots,H_n$ that partition the possibilities:
$$P(H_i\mid E) = \frac{P(E\mid H_i)P(H_i)}{\sum_j P(E\mid H_j)P(H_j)}.$$
The denominator is the same for every $H_i$, so to compare hypotheses you can just compare $P(E\mid H_i)P(H_i)$. That's why people often write $P(H\mid E)\propto P(E\mid H)P(H)$, "posterior is proportional to likelihood times prior."

### Where the prior comes from
A fair question is: where do we get the prior? Sometimes it is a measured base rate, like the share of the population with a disease or the share of past emails that were spam. Sometimes it comes from an earlier experiment, as in the two-test example above. And sometimes it is a reasonable judgement, such as "before looking at the data, I think the coin is probably close to fair." Two people with different priors who see the same strong evidence will end up with posteriors that are close together, because the likelihood eventually swamps the prior. With little evidence, the prior matters a lot, and it is honest to say so and to check how sensitive the conclusion is to that choice.

### Common mistakes
The biggest mistake is **confusing $P(E\mid H)$ with $P(H\mid E)$**, sometimes called the prosecutor's fallacy: "the chance of this DNA match if the suspect is innocent is one in a million, so the chance he is innocent is one in a million." Wrong: in a city of 10 million, about 10 innocent people would match too. Another mistake is forgetting the false-positive branch when computing $P(E)$. A third is treating the prior as optional. With very strong evidence the prior matters less, but with weak evidence or rare events it dominates.

### Summary
Bayes' theorem, $P(H\mid E) = \frac{P(E\mid H)P(H)}{P(E)}$, turns "how likely is the evidence if the cause is true" into "how likely is the cause given the evidence." The posterior combines the prior and the likelihood; the evidence term is found with total probability. Thinking in counts of people makes the calculation intuitive, and rare conditions produce many false positives.

@viz bayes prior=0.01 | A 95%-sensitive test for a rare disease. Most positives are false positives. Change the prior and watch the answer move.

:::explore
**What to try**
1. Start with prior 0.01, sensitivity 0.95, specificity 0.90. Confirm the posterior is about 0.088.
2. Raise specificity to 0.99 (only 1% false positives). The posterior jumps to about 0.49.
3. Put specificity back to 0.90 and raise the prior to 0.2, as if testing only people with symptoms.
4. Push sensitivity all the way to 1.0 and notice how little that helps when the prior is 0.01.

**What to notice:** the red sliver (true positives) and the orange block (false positives) together make up all positives. The posterior is the red sliver's share. When the disease is rare, the orange block is large even for a good test, so reducing false positives (specificity) or raising the prior matters much more than increasing sensitivity.
:::

:::formulas
$$P(H\mid E) = \frac{P(E\mid H)P(H)}{P(E)}$$
$$P(E) = P(E\mid H)P(H) + P(E\mid H^c)P(H^c)$$
$$P(H_i\mid E) = \frac{P(E\mid H_i)P(H_i)}{\sum_j P(E\mid H_j)P(H_j)}$$
$$\text{posterior odds} = \frac{P(E\mid H)}{P(E\mid H^c)}\times\text{prior odds}$$
$$p(\theta\mid\text{data})\propto p(\text{data}\mid\theta)\,p(\theta)$$
:::

:::thm Bayes' theorem
For events $H$ and $E$ with $P(E)>0$: $P(H\mid E) = \dfrac{P(E\mid H)P(H)}{P(E)}$.
:::

:::proof
By the definition of conditional probability, $P(H\cap E) = P(H\mid E)P(E)$ and also $P(H\cap E) = P(E\mid H)P(H)$. Set these equal and divide by $P(E)$.
:::

:::steps 1% have a disease; the test catches 95% of cases and has a 10% false-positive rate. Find P(disease | positive).
1. $P(+\mid D)P(D) = 0.95\times0.01 = 0.0095$.
2. $P(+\mid D^c)P(D^c) = 0.10\times0.99 = 0.099$.
3. $P(+) = 0.0095 + 0.099 = 0.1085$.
4. $P(D\mid +) = 0.0095/0.1085\approx0.088$, about 8.8%.
:::

:::steps 30% of emails are spam. The word "free" appears in 40% of spam and 5% of normal emails. An email contains "free". P(spam)?
1. $P(\text{free}\mid S)P(S) = 0.4\times0.3 = 0.12$.
2. $P(\text{free}\mid S^c)P(S^c) = 0.05\times0.7 = 0.035$.
3. $P(S\mid\text{free}) = \frac{0.12}{0.12 + 0.035} = \frac{0.12}{0.155}\approx0.774$.
:::

:::steps Box 1 has 3 red and 1 blue ball; box 2 has 1 red and 3 blue. A fair coin picks a box and a ball is drawn. It is red. P(box 1)?
1. $P(R\mid B_1)P(B_1) = \frac34\cdot\frac12 = \frac38$.
2. $P(R\mid B_2)P(B_2) = \frac14\cdot\frac12 = \frac18$.
3. $P(B_1\mid R) = \frac{3/8}{3/8 + 1/8} = \frac34$.
:::

:::mock Exam question
A factory's machines A, B and C produce 50%, 30% and 20% of items, with defect rates 1%, 2% and 3%. A randomly chosen item is defective. What is the probability it came from machine C?
:::solution
Weights: A $0.5\times0.01 = 0.005$, B $0.3\times0.02 = 0.006$, C $0.2\times0.03 = 0.006$. Total $P(D) = 0.017$. So $P(C\mid D) = \frac{0.006}{0.017} = \frac{6}{17}\approx0.353$.
:::
:::

:::ml
Bayesian machine learning treats model parameters as random: $p(\theta\mid\text{data})\propto p(\text{data}\mid\theta)\,p(\theta)$. Regularization is a prior in disguise: an L2 penalty corresponds to a Gaussian prior on the weights and an L1 penalty to a Laplace prior. Naive Bayes spam filters apply Bayes' rule over words, and a classifier calibrated on balanced data must be adjusted with the true class prior before deployment on imbalanced data.
:::

:::cs
Bayesian updating runs inside many systems: robot localization (particle filters), GPS sensor fusion (Kalman filters), A/B testing dashboards, and fraud detection, where each new transaction updates the probability that an account is compromised.
:::

:::real
Courts, doctors and journalists misuse conditional probabilities often. In the 1999 Sally Clark case in the UK, an expert's claim that two cot deaths in one family had a "1 in 73 million" chance was presented as if it were the probability of innocence. Ignoring the alternative explanation's own rarity, a Bayes error, contributed to a wrongful conviction later overturned.
:::

:::quiz
? $P(E\mid H) = 0.8$, $P(H) = 0.5$, $P(E) = 0.6$. Find $P(H\mid E)$.
= 2/3|0.667|0.6667
> $\frac{0.8\times0.5}{0.6} = \frac{0.4}{0.6} = \frac23$.

? In Bayes' theorem, $P(H)$ is called the...
+ prior
- likelihood
- posterior
> It's the belief before seeing the evidence.

? A test has sensitivity 0.9 and false-positive rate 0.1, and the condition has prevalence 0.5. Find $P(\text{condition}\mid +)$.
= 0.9|9/10
> $\frac{0.9\times0.5}{0.9\times0.5 + 0.1\times0.5} = \frac{0.45}{0.5} = 0.9$.

? Why do rare diseases produce many false positives even with accurate tests?
+ Healthy people vastly outnumber sick people, so a small false-positive rate still yields many positives
- Tests are less accurate for rare diseases
- Bayes' theorem doesn't apply to rare events
> 10% of 9,900 healthy people (990) is far more than 95% of 100 sick people (95).

? Prior odds are 1:4 and the likelihood ratio is 8. What is the posterior probability of $H$?
= 2/3|0.667|0.6667
> Posterior odds $8\times\frac14 = 2$, i.e. 2:1, so probability $\frac{2}{3}$.

? Two independent positive tests each have likelihood ratio 9.5, and the prior odds are 1:99. What are the posterior odds? (Round to 2 decimals.)
= 0.91|0.912
> Each test multiplies the odds by 9.5: $\frac{1}{99}\times9.5\times9.5 = \frac{90.25}{99}\approx0.91$, a probability of about 0.48.
:::
# Unit: Random variables and distributions

## Lesson: Discrete random variables {#discrete-rv}
@summary: Turning outcomes into numbers: random variables, probability mass functions, CDFs, expected value and variance.

### From outcomes to numbers
So far we've described random experiments by their outcomes: "heads, tails, heads," "the ace of spades," "a 4." But most questions we care about are about *numbers*. How many heads in ten flips? How much money will I win? How many customers will arrive in the next hour? A **random variable** is the tool that turns outcomes into numbers so we can do arithmetic with uncertainty.

Formally, a random variable $X$ is a function that assigns a real number to every outcome in the sample space. Flip a coin three times. The sample space has 8 outcomes such as HHT and TTT. Let $X$ be the number of heads. Then $X(\text{HHT}) = 2$, $X(\text{TTT}) = 0$ and $X(\text{HHH}) = 3$. The name is a little misleading: a random variable isn't a variable in the algebra sense and it isn't itself random. It is a fixed rule; the randomness comes from which outcome the experiment produces.

We use capital letters like $X$ for the random variable and lowercase like $x$ for a particular value it might take. The statement "$X = 2$" is an *event*: the set of outcomes where the rule gives 2, here $\{\text{HHT}, \text{HTH}, \text{THH}\}$. So $P(X = 2) = \frac38$.

:::def Random variable
A function $X$ from the sample space to the real numbers. It turns each outcome into a number.
:::

A random variable is **discrete** if it takes a finite or countable list of values, such as $0, 1, 2, 3$ or all whole numbers $0, 1, 2, \dots$. Counts are the typical example. (The next lessons treat **continuous** random variables, like heights and waiting times, which can take any value in an interval.)

### The probability mass function
The complete description of a discrete random variable is its **probability mass function** (PMF), $p(x) = P(X = x)$, which lists the probability of each possible value. For the three coin flips:

| $x$ | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| $p(x)$ | 1/8 | 3/8 | 3/8 | 1/8 |

Two rules always hold. Every value satisfies $p(x)\ge0$, and the probabilities add to one: $\sum_x p(x) = 1$. Here $\frac18 + \frac38 + \frac38 + \frac18 = 1$. Any table of non-negative numbers summing to 1 is a valid PMF. To find the probability of a set of values, add their masses: $P(X\ge2) = \frac38 + \frac18 = \frac12$. We draw a PMF as a bar chart: one bar per value, with heights equal to probabilities.

:::def Probability mass function (PMF)
For a discrete random variable, $p(x) = P(X = x)$. It satisfies $p(x)\ge0$ and $\sum_x p(x) = 1$.
:::

### The cumulative distribution function
Often we want "at most" probabilities. The **cumulative distribution function** (CDF) is $F(x) = P(X\le x)$. For the coins, $F(0) = \frac18$, $F(1) = \frac48$, $F(2) = \frac78$ and $F(3) = 1$. Between these values the CDF stays flat, so its graph is a staircase that jumps at each possible value by the height of that value's bar. A CDF always rises from 0 to 1 and never decreases. It's useful because interval probabilities become subtractions: $P(a < X\le b) = F(b) - F(a)$.

:::def Cumulative distribution function (CDF)
$F(x) = P(X\le x)$. It is non-decreasing, starts at 0 and ends at 1, and works for every type of random variable.
:::

### Expected value: the long-run average
Imagine playing a game many times: roll a die and win the number shown in dollars. What do you win on average? Each face appears about $\frac16$ of the time, so the average is $1\cdot\frac16 + 2\cdot\frac16 + \dots + 6\cdot\frac16 = \frac{21}{6} = 3.5$. This is the **expected value** or **mean**:
$$E[X] = \sum_x x\,p(x).$$
It is a weighted average of the values, with probabilities as weights. Picture the bar chart as a set of weights on a ruler; the expected value is the point where the ruler balances. Notice that $E[X] = 3.5$ is not a value the die can ever show. The expected value is a long-run average, not the most likely result. For three coin flips, $E[X] = 0\cdot\frac18 + 1\cdot\frac38 + 2\cdot\frac38 + 3\cdot\frac18 = \frac{12}{8} = 1.5$, which matches the intuition "half of three flips."

Expected values are how we decide whether bets are fair. A raffle ticket costs \$2, and there's a $\frac{1}{1000}$ chance of winning \$1,000. Your net gain $G$ is \$998 with probability 0.001 and $-\$2$ otherwise, so $E[G] = 998(0.001) - 2(0.999) = 0.998 - 1.998 = -1$. On average you lose a dollar per ticket.

### Expected value of a function
If you want the average of some function of $X$, such as $X^2$ or a payoff $g(X)$, you don't need to work out the distribution of $g(X)$ first. Just weight $g(x)$ by $p(x)$: $E[g(X)] = \sum_x g(x)\,p(x)$. This is sometimes called the *law of the unconscious statistician*. For a die, $E[X^2] = \frac{1 + 4 + 9 + 16 + 25 + 36}{6} = \frac{91}{6}$. Be careful: $E[X^2]$ is not $(E[X])^2 = 12.25$. In general $E[g(X)]\ne g(E[X])$.

### Variance: how spread out
Two games can have the same mean but feel very different. Game A always pays \$5. Game B pays \$0 or \$10 with equal chance. Both have mean 5, but B is riskier. The **variance** measures how far values typically land from the mean:
$$\operatorname{Var}(X) = E\big[(X - \mu)^2\big],\quad \mu = E[X].$$
We square deviations so that values above and below the mean don't cancel, and so that big deviations count more. For game A the variance is 0. For game B, $(0 - 5)^2\cdot\frac12 + (10 - 5)^2\cdot\frac12 = 25$.

There's a shortcut that's usually quicker: $\operatorname{Var}(X) = E[X^2] - (E[X])^2$. For a die, $\frac{91}{6} - 3.5^2 = \frac{91}{6} - \frac{49}{4} = \frac{182 - 147}{12} = \frac{35}{12}\approx2.92$.

Because variance is in squared units (dollars squared), we often report the **standard deviation** $\sigma = \sqrt{\operatorname{Var}(X)}$, which is back in the original units. Game B has $\sigma = 5$: values typically land about \$5 from the mean.

:::def Expected value
$E[X] = \sum_x x\,p(x)$: the probability-weighted average, the balance point of the distribution.
:::

:::def Variance and standard deviation
$\operatorname{Var}(X) = E[(X - \mu)^2] = E[X^2] - \mu^2$; the standard deviation is $\sigma = \sqrt{\operatorname{Var}(X)}$.
:::

### Common mistakes
Don't confuse the random variable with its values: $X$ is the rule, $x$ is a number. Don't forget to check that a PMF adds to 1; if a problem gives probabilities with an unknown $c$, that's how you solve for $c$. Remember that the expected value need not be a possible value and need not be the most likely value. When using the shortcut formula, square *after* averaging for the second term: it's $E[X^2] - (E[X])^2$, and the result must never be negative. Finally, standard deviation is the square root of variance, not the average absolute deviation.

### Summary
A random variable turns outcomes into numbers. A discrete one is described by its PMF $p(x)$, which is non-negative and sums to 1, or equivalently by its staircase CDF $F(x) = P(X\le x)$. The expected value $E[X] = \sum x\,p(x)$ is the long-run average and balance point, and the variance $E[X^2] - \mu^2$ measures spread, with standard deviation as its square root.

@viz distribution kind=binomial lo=2 hi=3 | Three coin flips is a binomial with n = 3. Set n = 3 to match the table in the article.

:::explore
**What to try**
1. Set $n = 3$ and $p = 0.5$. Check that the bars have heights 1/8, 3/8, 3/8, 1/8 and that the mean reads 1.5.
2. Shade from 2 to 3 and confirm $P(2\le X\le3) = 0.5$, matching $P(X\ge2)$ from the article.
3. Change $p$ to 0.8. Watch the bars and the dashed mean line slide to the right.
4. Switch to "geometric" and move $p$. The mean $1/p$ grows quickly as $p$ gets small.

**What to notice:** the dashed line is the balance point of the bars: heavier bars on one side pull it that way. The variance readout is largest when the bars are spread out and shrinks when the mass piles onto a few values.
:::

:::formulas
$$p(x) = P(X = x),\quad p(x)\ge0,\quad \sum_x p(x) = 1$$
$$F(x) = P(X\le x) = \sum_{t\le x}p(t)$$
$$E[X] = \sum_x x\,p(x),\qquad E[g(X)] = \sum_x g(x)p(x)$$
$$\operatorname{Var}(X) = E[(X-\mu)^2] = E[X^2] - (E[X])^2$$
$$\sigma_X = \sqrt{\operatorname{Var}(X)}$$
:::

:::thm Shortcut formula for variance
$\operatorname{Var}(X) = E[X^2] - (E[X])^2$.
:::

:::proof
Let $\mu = E[X]$. Expanding, $E[(X-\mu)^2] = \sum_x(x^2 - 2\mu x + \mu^2)p(x) = \sum x^2p(x) - 2\mu\sum xp(x) + \mu^2\sum p(x) = E[X^2] - 2\mu^2 + \mu^2 = E[X^2] - \mu^2$.
:::

:::steps A PMF is p(1) = c, p(2) = 2c, p(3) = 3c. Find c, E[X] and Var(X).
1. Sum to one: $c + 2c + 3c = 6c = 1$, so $c = \frac16$.
2. $E[X] = 1\cdot\frac16 + 2\cdot\frac26 + 3\cdot\frac36 = \frac{14}{6} = \frac73$.
3. $E[X^2] = \frac16 + \frac{8}{6} + \frac{27}{6} = \frac{36}{6} = 6$.
4. $\operatorname{Var}(X) = 6 - \frac{49}{9} = \frac{5}{9}$.
:::

:::steps A game: roll a die; win \$6 on a six, lose \$1 otherwise. Is it fair?
1. $E[\text{gain}] = 6\cdot\frac16 + (-1)\cdot\frac56 = \frac{6 - 5}{6} = \frac16$.
2. The expected gain is positive (about 17 cents), so the game favours the player.
:::

:::steps For X = number of heads in 3 fair flips, find F(1) and P(1 < X ≤ 3).
1. $F(1) = p(0) + p(1) = \frac18 + \frac38 = \frac12$.
2. $P(1 < X\le3) = F(3) - F(1) = 1 - \frac12 = \frac12$.
:::

:::mock Exam question
An insurer sells a one-year policy for \$200. With probability 0.01 the customer makes a claim of \$10,000; otherwise nothing is paid. Find the insurer's expected profit and the standard deviation of its profit on one policy.
:::solution
Profit is $200 - 10000 = -9800$ with probability 0.01 and $200$ with probability 0.99. $E = -9800(0.01) + 200(0.99) = -98 + 198 = 100$. $E[\text{profit}^2] = 9800^2(0.01) + 200^2(0.99) = 960400 + 39600 = 1000000$. Variance $= 1000000 - 100^2 = 990000$, so $\sigma = \sqrt{990000}\approx995$. Expected profit is \$100 but with a large spread, which is why insurers pool many policies.
:::
:::

:::ml
A classifier's output is a PMF over classes: a softmax layer produces non-negative numbers that sum to one. The training loss is an expected value over the data distribution, $E[\ell(f(x), y)]$, which we estimate by averaging over a sample. Reinforcement learning is built on expected rewards: an agent picks actions to maximize $E[\text{return}]$.
:::

:::cs
The average-case running time of an algorithm is an expected value over random inputs or random choices. Quicksort with random pivots makes about $2n\ln n$ comparisons on average, even though its worst case is $\binom n2$.
:::

:::real
Casinos, lotteries and insurers all live on expected value. A US roulette bet on red pays even money with probability $\frac{18}{38}$, so the expected gain per \$1 is $\frac{18}{38} - \frac{20}{38} = -\frac{2}{38}\approx-5.3$ cents. Over millions of bets, that average becomes the casino's guaranteed profit.
:::

:::quiz
? A fair die is rolled. What is $E[X]$?
= 3.5|7/2
> $(1+2+3+4+5+6)/6 = 21/6$.

? $X$ takes the values 0 and 10 with probability 1/2 each. Find $\operatorname{Var}(X)$.
= 25
> Mean 5; each deviation squared is 25.

? $p(0) = 0.2$, $p(1) = 0.5$, $p(2) = c$. Find $c$.
= 0.3|3/10
> The masses must sum to 1.

? With the PMF above ($c = 0.3$), find $E[X]$.
= 1.1
> $0(0.2) + 1(0.5) + 2(0.3) = 1.1$.

? Which statement about $E[X]$ is always true?
- It is the most likely value of $X$
+ It is the probability-weighted average of the values
- It is a value $X$ can take
> A die has mean 3.5, which it can never show.

? $E[X] = 2$ and $E[X^2] = 7$. Find the standard deviation of $X$.
= 1.732|1.73
> $\operatorname{Var}(X) = 7 - 4 = 3$, so $\sigma = \sqrt3\approx1.732$.
:::
## Lesson: Rules for expectation and variance {#expectation-properties}
@summary: Linearity of expectation, indicator variables, how variance scales and adds, and covariance between random variables.

### Why we need rules
Computing an expected value straight from the definition means listing every value and its probability. That's fine for one die, but what about the number of heads in 100 flips, or the number of people in a room of 30 who share a birthday with someone else? The distributions are messy. Fortunately, expectation and variance obey a handful of simple algebraic rules, and with them we can find means and spreads of complicated quantities without ever writing down their distributions. These rules are used constantly in statistics and machine learning, so it pays to know them by heart and to know *why* they hold.

### Shifting and scaling
Suppose $X$ is a temperature in Celsius with $E[X] = 20$ and $\operatorname{Var}(X) = 4$. In Fahrenheit the temperature is $Y = 1.8X + 32$. What are the mean and variance of $Y$?

The mean simply follows the formula: $E[aX + b] = aE[X] + b$. So $E[Y] = 1.8(20) + 32 = 68$. This makes sense: if every value is scaled by 1.8 and shifted by 32, so is their weighted average. Algebraically, $\sum(ax + b)p(x) = a\sum xp(x) + b\sum p(x) = aE[X] + b$.

The variance behaves differently: $\operatorname{Var}(aX + b) = a^2\operatorname{Var}(X)$. Adding the constant 32 moves every value and the mean together, so deviations from the mean don't change at all. Scaling by 1.8 scales every deviation by 1.8, and squaring turns that into $1.8^2 = 3.24$. So $\operatorname{Var}(Y) = 3.24\times4 = 12.96$ and $\operatorname{SD}(Y) = 1.8\times2 = 3.6$. Note the standard deviation scales by $|a|$, never by a negative number: $\operatorname{Var}(-X) = \operatorname{Var}(X)$.

### Linearity of expectation
The single most useful rule in probability is that **the expectation of a sum is the sum of the expectations**:
$$E[X + Y] = E[X] + E[Y].$$
This holds *always*, whether or not $X$ and $Y$ are independent. Roll two dice. The mean of each is 3.5, so the mean of the total is 7, with no need to list all 36 outcomes. Extend it to any number of terms: $E[X_1 + \dots + X_n] = E[X_1] + \dots + E[X_n]$. The average of $n$ dice totals $3.5n$.

Why is it true even for dependent variables? Write it using the joint probabilities: $E[X + Y] = \sum_{x,y}(x + y)P(X = x, Y = y)$. Split into $\sum_{x,y}x\,P(x, y) + \sum_{x,y}y\,P(x, y)$. Summing the joint probability over $y$ gives $P(X = x)$, so the first part is $E[X]$, and similarly the second is $E[Y]$. Dependence never entered the argument.

### Indicator variables: counting with linearity
An **indicator variable** $I_A$ equals 1 if the event $A$ happens and 0 if it doesn't. Its expected value is $E[I_A] = 1\cdot P(A) + 0\cdot P(A^c) = P(A)$. This little fact combined with linearity is a superpower for counting problems.

How many heads do you expect in 100 flips of a coin that lands heads with probability $p$? Let $I_k$ indicate "flip $k$ is heads." The number of heads is $I_1 + \dots + I_{100}$, so its expectation is $100p$.

Here's a harder one. Ten people throw their hats in a pile, and each grabs a hat at random. How many people expect to get their own hat back? Let $I_k$ indicate "person $k$ gets their own hat." Each person is equally likely to grab any of the 10 hats, so $P(I_k = 1) = \frac{1}{10}$. The expected number of matches is $10\times\frac{1}{10} = 1$. The indicators are dependent (if nine people match, the tenth must too), but linearity doesn't care. Remarkably, the answer is 1 no matter how many people there are.

:::def Indicator variable
$I_A = 1$ if event $A$ occurs and 0 otherwise. Its expectation is $E[I_A] = P(A)$.
:::

### Variance of a sum and covariance
Variance does *not* always add. If $X$ and $Y$ tend to move together, their sum swings more widely; if they move in opposite directions, the swings partly cancel. The precise statement uses the **covariance**
$$\operatorname{Cov}(X, Y) = E[(X - \mu_X)(Y - \mu_Y)] = E[XY] - E[X]E[Y].$$
Covariance is positive when $X$ and $Y$ tend to be above their means at the same time and negative when one is above while the other is below. Then
$$\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y) + 2\operatorname{Cov}(X, Y).$$
An extreme example: if $Y = -X$, then $X + Y = 0$ has variance 0, and indeed $\operatorname{Cov}(X, -X) = -\operatorname{Var}(X)$ cancels the two variances.

:::def Covariance
$\operatorname{Cov}(X, Y) = E[(X - \mu_X)(Y - \mu_Y)] = E[XY] - E[X]E[Y]$; it measures how two variables move together.
:::

### Independence makes variances add
If $X$ and $Y$ are independent, then $E[XY] = E[X]E[Y]$, so their covariance is 0 and
$$\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y).$$
The total of two independent dice has variance $\frac{35}{12} + \frac{35}{12} = \frac{35}{6}$. More generally, for independent $X_1,\dots,X_n$ with common variance $\sigma^2$, the sum has variance $n\sigma^2$, and the **average** $\bar X = \frac1n\sum X_i$ has variance $\frac{1}{n^2}\cdot n\sigma^2 = \frac{\sigma^2}{n}$. Its standard deviation is $\frac{\sigma}{\sqrt n}$. This one line is why averaging many measurements reduces noise, and it is the seed of the law of large numbers and of every confidence interval in statistics.

Notice the difference: $\operatorname{Var}(X + X) = \operatorname{Var}(2X) = 4\operatorname{Var}(X)$, but the sum of two *independent copies* has variance $2\operatorname{Var}(X)$. Doubling one bet is riskier than making two independent bets of the same size.

### Expectations of functions: careful with nonlinear ones
To find the expected value of a function $g(X)$ we don't need the distribution of $g(X)$ itself; we can weight each value $g(x)$ by the probability of $x$: $E[g(X)] = \sum_x g(x)P(X = x)$. Statisticians jokingly call this the law of the unconscious statistician, because it's so natural that people use it without noticing. The important warning is that expectation passes through *linear* functions but not through nonlinear ones. Let $X$ be equally likely to be 1, 2 or 3. Then $E[X] = 2$, so $(E[X])^2 = 4$, but $E[X^2] = \frac{1 + 4 + 9}{3} = \frac{14}{3}\approx4.67$. The gap, $\frac{14}{3} - 4 = \frac23$, is exactly the variance. In general, for a convex function such as $x^2$ or $e^x$, **Jensen's inequality** says $E[g(X)]\ge g(E[X])$. This is why the average of squared errors is never smaller than the square of the average error, and why plugging an average input into a nonlinear formula usually gives the wrong average output.

### Common mistakes
The most common error is writing $\operatorname{Var}(X - Y) = \operatorname{Var}(X) - \operatorname{Var}(Y)$. For independent variables, variances add even when you subtract: $\operatorname{Var}(X - Y) = \operatorname{Var}(X) + \operatorname{Var}(Y)$, because $-Y$ has the same variance as $Y$. Another mistake is assuming $E[XY] = E[X]E[Y]$ without independence, or assuming zero covariance means independence; it doesn't, as the next lesson on joint distributions shows. Finally, remember $E[g(X)]\ne g(E[X])$ for non-linear $g$: linearity is only for linear combinations.

### Summary
Expectation is linear: $E[aX + bY + c] = aE[X] + bE[Y] + c$, always. Indicators turn counting into adding probabilities. Variance ignores shifts and scales by $a^2$. Variances of sums add the covariance term, $\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y) + 2\operatorname{Cov}(X, Y)$, which vanishes under independence, so the mean of $n$ independent values has variance $\sigma^2/n$.

@viz lln p=0.5 | Each flip is an indicator with mean p. The running average of n flips has standard deviation sqrt(p(1-p)/n).

:::explore
**What to try**
1. Press "Flip 1000 × 5 runs" a few times with $p = 0.5$. Look at how far apart the five running averages are after 10 flips and after 1000 flips.
2. Set $p = 0.9$ and repeat. The curves settle near 0.9, and they wobble less than at $p = 0.5$.
3. Set $p = 0.05$. The spread is again smaller than at 0.5.

**What to notice:** the running average is $\bar X = \frac1n\sum I_k$, so by linearity its mean is $p$, and by independence its variance is $\frac{p(1-p)}{n}$. That's why the five runs pinch together like $1/\sqrt n$, and why $p(1-p)$, largest at $p = 0.5$, controls how wide the funnel is.
:::

:::formulas
$$E[aX + b] = aE[X] + b,\qquad \operatorname{Var}(aX + b) = a^2\operatorname{Var}(X)$$
$$E\Big[\sum_i a_iX_i\Big] = \sum_i a_iE[X_i]$$
$$E[I_A] = P(A)$$
$$\operatorname{Cov}(X,Y) = E[XY] - E[X]E[Y]$$
$$\operatorname{Var}(X \pm Y) = \operatorname{Var}(X) + \operatorname{Var}(Y) \pm 2\operatorname{Cov}(X,Y)$$
$$X_i \text{ i.i.d.}: \operatorname{Var}(\bar X) = \frac{\sigma^2}{n}$$
:::

:::thm Linearity of expectation
For any random variables $X, Y$ with finite means and constants $a, b$: $E[aX + bY] = aE[X] + bE[Y]$.
:::

:::proof
$E[aX + bY] = \sum_{x,y}(ax + by)P(X=x, Y=y) = a\sum_x x\sum_y P(x, y) + b\sum_y y\sum_x P(x, y) = a\sum_x xP(X = x) + b\sum_y yP(Y = y)$, using the fact that summing a joint PMF over one variable gives the other's marginal PMF.
:::

:::thm Variance of a sum
$\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y) + 2\operatorname{Cov}(X,Y)$.
:::

:::proof
Let $D_X = X - \mu_X$ and $D_Y = Y - \mu_Y$. Then $X + Y - (\mu_X + \mu_Y) = D_X + D_Y$, so $\operatorname{Var}(X+Y) = E[(D_X + D_Y)^2] = E[D_X^2] + E[D_Y^2] + 2E[D_XD_Y]$, which are the three terms.
:::

:::steps X has mean 3 and variance 4. Find E[5 − 2X] and Var(5 − 2X).
1. $E[5 - 2X] = 5 - 2(3) = -1$.
2. $\operatorname{Var}(5 - 2X) = (-2)^2\cdot4 = 16$; the constant 5 doesn't matter.
:::

:::steps Roll a die 12 times. What is the expected number of sixes, and of distinct faces that appear?
1. Sixes: indicators with $P = \frac16$, so $12\times\frac16 = 2$.
2. Distinct faces: let $J_f$ indicate "face $f$ appears at least once": $P = 1 - (\frac56)^{12}\approx1 - 0.112 = 0.888$.
3. Expected distinct faces $= 6\times0.888\approx5.33$.
:::

:::steps X and Y are independent with SDs 3 and 4. Find SD(X − Y).
1. $\operatorname{Var}(X - Y) = 9 + 16 = 25$.
2. $\operatorname{SD}(X - Y) = 5$.
:::

:::mock Exam question
A portfolio puts \$1 in each of two stocks. Each stock's one-year return has mean 0.08 and standard deviation 0.20. Find the mean and standard deviation of the total return (a) if the returns are independent, and (b) if their covariance is 0.02.
:::solution
The mean is $0.08 + 0.08 = 0.16$ in both cases. (a) $\operatorname{Var} = 0.04 + 0.04 = 0.08$, SD $= \sqrt{0.08}\approx0.283$. (b) $\operatorname{Var} = 0.04 + 0.04 + 2(0.02) = 0.12$, SD $\approx0.346$. Positive covariance reduces the benefit of diversification.
:::
:::

:::ml
Mini-batch stochastic gradient descent relies on these rules. The gradient on a random batch of $B$ examples is an average, so by linearity its expectation is the full gradient (it's unbiased), and by independence its variance is about $\sigma^2/B$. Larger batches give less noisy steps, with diminishing returns like $1/\sqrt B$. Ensembles average models for the same reason; correlated models (positive covariance) reduce variance less.
:::

:::cs
Linearity with indicators analyses randomized algorithms: the expected number of collisions when hashing $n$ keys into $m$ slots is $\binom n2\frac1m$, since each pair collides with probability $\frac1m$. Randomized quicksort's $O(n\log n)$ average comes from summing indicator variables "elements $i$ and $j$ are compared."
:::

:::real
Measurement labs repeat readings and report the average because its standard deviation is $\sigma/\sqrt n$: four readings halve the noise. Financial advisers diversify for the same reason, while warning that stocks in the same sector have positive covariance and protect each other less.
:::

:::quiz
? $E[X] = 4$. Find $E[3X - 2]$.
= 10
> $3(4) - 2 = 10$.

? $\operatorname{Var}(X) = 5$. Find $\operatorname{Var}(-2X + 7)$.
= 20
> $(-2)^2\times5 = 20$; the shift doesn't matter.

? $X$, $Y$ are independent with variances 2 and 3. Find $\operatorname{Var}(X - Y)$.
= 5
> Variances add for independent variables, even when subtracting.

? Eight people pick hats at random. What is the expected number who get their own hat?
= 1
> $8\times\frac18 = 1$ by linearity with indicators.

? Does $E[X + Y] = E[X] + E[Y]$ require independence?
- Yes
+ No, it always holds
> Linearity of expectation holds for any random variables with finite means.

? Single measurements have SD 6. What is the SD of the average of 9 independent measurements?
= 2
> $6/\sqrt9 = 2$.
:::
## Lesson: Common discrete distributions {#discrete-dists}
@summary: Bernoulli, binomial, geometric, Poisson and discrete uniform: when each one appears, its PMF, mean and variance.

### Patterns that keep coming back
A quality inspector checks 20 bolts and counts the defective ones. A basketball player takes free throws until she misses. A call center counts the calls that arrive in a minute. These look like different problems, but each of them follows a pattern that statisticians have studied so thoroughly that its PMF, mean and variance are known formulas. Learning to recognise these **named distributions** saves an enormous amount of work: once you see "count of successes in a fixed number of independent trials," you immediately know the answer is binomial, and you can write down any probability you need.

This lesson covers the five discrete distributions you'll meet most often. For each one we'll ask: what story produces it, what is its PMF, and what are its mean and variance?

### The Bernoulli distribution: one yes-or-no trial
The simplest random variable takes the value 1 ("success") with probability $p$ and 0 ("failure") with probability $1 - p$. A single coin flip, a single email being spam or not, a single customer clicking an ad or not: each is a **Bernoulli trial**. We write $X\sim\text{Bernoulli}(p)$.

The mean is $E[X] = 1\cdot p + 0\cdot(1 - p) = p$. Since $X^2 = X$ (both 0 and 1 are their own squares), $E[X^2] = p$ and $\operatorname{Var}(X) = p - p^2 = p(1 - p)$. The variance is largest at $p = \frac12$, where the outcome is most uncertain, and zero at $p = 0$ or $1$, where there's no uncertainty at all.

:::def Bernoulli distribution
A single trial with $P(X = 1) = p$ and $P(X = 0) = 1 - p$. Mean $p$, variance $p(1-p)$.
:::

### The binomial distribution: counting successes
Now repeat a Bernoulli trial $n$ times, independently, with the same $p$ each time, and count the successes. That count $X$ has a **binomial distribution**, $X\sim\text{Bin}(n, p)$. To find $P(X = k)$, think about one particular sequence with $k$ successes and $n - k$ failures, say SSFF...F. By independence its probability is $p^k(1 - p)^{n-k}$. Every other arrangement of $k$ successes has the same probability, and there are $\binom nk$ arrangements, so
$$P(X = k) = \binom nk p^k(1 - p)^{n-k},\qquad k = 0, 1, \dots, n.$$
For example, a fair coin flipped 10 times gives exactly 5 heads with probability $\binom{10}{5}\frac{1}{2^{10}} = \frac{252}{1024}\approx0.246$. Even the most likely result happens less than a quarter of the time.

The mean and variance follow beautifully from the last lesson. $X$ is a sum of $n$ independent Bernoulli($p$) indicators, so $E[X] = np$ and $\operatorname{Var}(X) = np(1 - p)$. Ten fair flips have mean 5 and standard deviation $\sqrt{2.5}\approx1.58$.

Check the conditions before using the binomial: a **fixed** number of trials, each with **two** outcomes, the **same** probability of success each time, and **independent** trials. Drawing 5 cards from a deck and counting hearts fails independence (no replacement), so it's not exactly binomial; that situation is called hypergeometric.

:::def Binomial distribution
The number of successes in $n$ independent trials each with success probability $p$: $P(X=k) = \binom nk p^k(1-p)^{n-k}$, mean $np$, variance $np(1-p)$.
:::

### The geometric distribution: waiting for the first success
Instead of fixing the number of trials, keep going until the first success and let $X$ be the number of trials needed. For the first success to occur on trial $k$, the first $k - 1$ trials must fail and the $k$-th must succeed:
$$P(X = k) = (1 - p)^{k-1}p,\qquad k = 1, 2, 3, \dots$$
If you roll a die until a six appears, $P(X = 3) = (\frac56)^2\frac16 = \frac{25}{216}\approx0.116$. The mean is $E[X] = \frac1p$: on average it takes 6 rolls to see a six. The variance is $\frac{1 - p}{p^2}$, which is 30 for the die, so the waiting time is very variable.

The geometric distribution is **memoryless**: if you've already failed 10 times, the number of further trials you'll need has the same distribution as when you started. The die doesn't remember your bad luck. Formally $P(X > m + k\mid X > m) = P(X > k)$, because $P(X > k) = (1 - p)^k$.

:::def Geometric distribution
The trial number of the first success in independent trials: $P(X = k) = (1-p)^{k-1}p$ for $k\ge1$, mean $1/p$, variance $(1-p)/p^2$.
:::

### The Poisson distribution: counting rare events
Many counts have no natural "number of trials": emails per hour, typos per page, earthquakes per year. Events happen at some average rate $\lambda$ in an interval, independently of each other. The count has a **Poisson distribution**:
$$P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!},\qquad k = 0, 1, 2, \dots$$
If a help desk gets on average 3 calls per hour, the chance of exactly 2 calls in an hour is $\frac{3^2e^{-3}}{2!} = 4.5e^{-3}\approx0.224$, and the chance of none is $e^{-3}\approx0.050$.

Where does this formula come from? Chop the hour into $n$ tiny slots, each with a small chance $p = \lambda/n$ of containing a call. The count is $\text{Bin}(n, \lambda/n)$, and as $n\to\infty$ the binomial PMF converges to the Poisson PMF. So the Poisson is the binomial for "many trials, each very unlikely," with $np = \lambda$ held fixed. Its mean and variance are both $\lambda$, which is a handy check on real data: if your counts have a variance much bigger than their mean, a plain Poisson model is wrong.

:::def Poisson distribution
Counts of events occurring independently at average rate $\lambda$: $P(X=k) = \lambda^ke^{-\lambda}/k!$; mean and variance both equal $\lambda$.
:::

### The discrete uniform distribution
Finally, when $X$ is equally likely to be any of the integers $a, a+1, \dots, b$, it is **discrete uniform**. A fair die is uniform on $1,\dots,6$. With $m = b - a + 1$ values, each has probability $\frac1m$, the mean is $\frac{a + b}{2}$ and the variance is $\frac{m^2 - 1}{12}$. For the die, $\frac{36 - 1}{12} = \frac{35}{12}$, matching what we computed directly before.

### Choosing the right model
Ask what is being counted. A fixed number of independent yes/no trials: binomial. Trials until the first success: geometric. Events in a continuous stretch of time or space with a constant rate: Poisson. All values equally likely: uniform. A common mistake is using the binomial when $p$ changes from trial to trial or trials are dependent. Another is forgetting whether a geometric variable counts the trials *including* the success (our convention, starting at 1) or the failures *before* it (starting at 0); textbooks use both, so always check.

### Summary
Bernoulli is one trial with mean $p$. Binomial counts successes in $n$ trials, with mean $np$ and variance $np(1-p)$. Geometric waits for the first success, with mean $1/p$, and is memoryless. Poisson counts rare events at rate $\lambda$, with mean and variance $\lambda$, and is the limit of the binomial. Matching a situation to its story is the key skill.

@viz distribution kind=binomial lo=5 hi=5 | Shade a single bar to read off an exact probability.

:::explore
**What to try**
1. Set $n = 10$, $p = 0.5$ and shade from 5 to 5. Confirm $P(X = 5)\approx0.246$.
2. Shade from 0 to 10 to see the bars sum to 1. Then raise $p$ to 0.8 and read the new mean $np = 8$ and variance $np(1-p) = 1.6$.
3. Set $n = 40$ and $p = 0.1$, note the mean 4 and variance 3.6, then switch to "poisson" with $\lambda = 4$ and compare the bar shapes.
4. Switch to "geometric" and set $p = 0.17$ (close to a die). See how the bars decay and how large the variance is.

**What to notice:** the binomial is symmetric at $p = 0.5$ and skewed otherwise. With many trials and small $p$, it looks almost exactly like a Poisson with the same mean, which is the limit argument in the article. The geometric always has its tallest bar at 1, yet its mean is $1/p$.
:::

:::formulas
$$\text{Bernoulli}(p): \; E = p,\; \operatorname{Var} = p(1-p)$$
$$\text{Bin}(n,p): \; P(k) = \binom nk p^k(1-p)^{n-k},\; E = np,\; \operatorname{Var} = np(1-p)$$
$$\text{Geom}(p): \; P(k) = (1-p)^{k-1}p,\; E = \tfrac1p,\; \operatorname{Var} = \tfrac{1-p}{p^2}$$
$$\text{Poisson}(\lambda): \; P(k) = \frac{\lambda^ke^{-\lambda}}{k!},\; E = \operatorname{Var} = \lambda$$
$$\text{Uniform}\{a..b\}: \; E = \tfrac{a+b}2,\; \operatorname{Var} = \tfrac{m^2-1}{12},\; m = b-a+1$$
:::

:::thm Poisson limit of the binomial
If $n\to\infty$ and $p = \lambda/n$, then $\binom nk p^k(1-p)^{n-k}\to\dfrac{\lambda^ke^{-\lambda}}{k!}$ for each fixed $k$.
:::

:::proof
Write $\binom nk\frac{\lambda^k}{n^k}(1 - \frac\lambda n)^{n-k} = \frac{\lambda^k}{k!}\cdot\frac{n(n-1)\cdots(n-k+1)}{n^k}\cdot(1-\frac\lambda n)^n\cdot(1-\frac\lambda n)^{-k}$. As $n\to\infty$ the second factor tends to 1, the third to $e^{-\lambda}$ and the fourth to 1.
:::

:::thm Memorylessness of the geometric distribution
For $X\sim\text{Geom}(p)$ and integers $m, k\ge0$: $P(X > m + k\mid X > m) = P(X > k)$.
:::

:::proof
$X > j$ means the first $j$ trials fail, so $P(X > j) = (1-p)^j$. Then $P(X > m+k\mid X > m) = \frac{(1-p)^{m+k}}{(1-p)^m} = (1-p)^k$.
:::

:::steps A multiple-choice test has 5 questions with 4 options each. A student guesses. Find P(at least 4 correct).
1. $X\sim\text{Bin}(5, \frac14)$.
2. $P(X = 4) = \binom54(\frac14)^4\frac34 = \frac{15}{1024}$.
3. $P(X = 5) = (\frac14)^5 = \frac{1}{1024}$.
4. $P(X\ge4) = \frac{16}{1024} = \frac{1}{64}\approx0.0156$.
:::

:::steps A website gets 2 sign-ups per hour on average. Find P(at least 1 sign-up in an hour).
1. $X\sim\text{Poisson}(2)$, so $P(X = 0) = e^{-2}\approx0.135$.
2. $P(X\ge1) = 1 - 0.135 = 0.865$.
:::

:::steps A salesperson closes each call with probability 0.2, independently. Find the expected calls to the first sale and P(first sale on call 3).
1. Geometric with $p = 0.2$: $E[X] = 1/0.2 = 5$ calls.
2. $P(X = 3) = 0.8^2\times0.2 = 0.128$.
:::

:::mock Exam question
A printer produces pages with typos at an average rate of 0.5 per page. (a) Find the probability a page has no typos. (b) A 4-page document is printed. Find the probability the whole document has at most one typo.
:::solution
(a) $P(0) = e^{-0.5}\approx0.607$. (b) Counts over 4 pages are Poisson with $\lambda = 4\times0.5 = 2$. $P(X\le1) = e^{-2}(1 + 2) = 3e^{-2}\approx0.406$.
:::
:::

:::ml
Bernoulli and binomial likelihoods underlie logistic regression and binary cross-entropy: the loss $-[y\log\hat p + (1-y)\log(1-\hat p)]$ is the negative log of a Bernoulli PMF. Poisson regression models counts such as clicks or page views, and the multinomial generalizes the binomial to many categories for softmax classifiers.
:::

:::cs
The geometric distribution describes retries: if a network packet is lost with probability $q$, the number of transmissions until success is geometric with mean $\frac{1}{1-q}$. Poisson processes model request arrivals in queueing theory, which is used to size servers and buffers.
:::

:::real
Poisson counts appear everywhere: goals in a football match (about 2.7 per game), radioactive decays per second, and customers arriving at a shop. The classic first example was soldiers in the Prussian army killed by horse kicks per year, which fit a Poisson distribution closely.
:::

:::quiz
? $X\sim\text{Bin}(20, 0.3)$. Find $E[X]$.
= 6
> $np = 20\times0.3$.

? $X\sim\text{Bin}(20, 0.3)$. Find $\operatorname{Var}(X)$.
= 4.2
> $np(1-p) = 20\times0.3\times0.7$.

? $X\sim\text{Poisson}(4)$. What is $\operatorname{Var}(X)$?
= 4
> Poisson mean and variance are both $\lambda$.

? A coin with $P(\text{heads}) = 0.25$ is flipped until heads. Expected number of flips?
= 4
> Geometric mean $1/p$.

? Count the defective items among 50 items made independently, each defective with probability 0.02. Which model fits best?
+ Binomial(50, 0.02)
- Geometric(0.02)
- Discrete uniform
> A fixed number of independent trials with the same success probability.

? Flip a fair coin 4 times. Find $P(\text{exactly 2 heads})$.
= 3/8|0.375
> $\binom42/16 = 6/16$.
:::
## Lesson: Continuous random variables {#continuous-rv}
@summary: Probability as area: density functions, CDFs, expectation and variance by integration, the uniform and exponential distributions.

### When values form a continuum
How long will you wait for the next bus? How tall is a randomly chosen adult? What fraction of a battery's charge is left? These quantities don't come in a list of separate values; they can be anything in an interval, like 4.2 minutes or 4.21837 minutes. Such quantities are modelled by **continuous random variables**, and they force us to rethink what probability of a single value means.

Here's the puzzle. Suppose a spinner points to a random number between 0 and 1, every number equally likely. What is the probability it lands on exactly 0.5? There are infinitely many possible values. If each had the same positive probability, even a tiny one, the total would be infinite rather than 1. So the probability of any single exact value must be **zero**. Yet the spinner certainly lands somewhere. The resolution is to stop assigning probability to points and start assigning it to **intervals**. The chance of landing between 0.2 and 0.5 is clearly 0.3, the length of that interval.

### Probability density functions
For a general continuous random variable, we describe how probability is spread along the number line with a **probability density function** (PDF) $f(x)$. Probabilities are **areas under the curve**:
$$P(a\le X\le b) = \int_a^b f(x)\,dx.$$
Think of $f$ as describing where probability is concentrated, like the density of sand piled along a ruler: where the pile is tall, values are more likely. For a PDF to make sense we need $f(x)\ge0$ everywhere and total area 1: $\int_{-\infty}^{\infty}f(x)\,dx = 1$.

Importantly, $f(x)$ itself is **not** a probability. It can be bigger than 1. A spinner on $[0, \frac12]$ has density $f(x) = 2$ there, because the total area $2\times\frac12$ must equal 1. What $f(x)$ tells you is probability per unit length: for a small interval of width $\Delta x$ around $x$, $P(x\le X\le x + \Delta x)\approx f(x)\Delta x$.

Because single points have zero probability, it doesn't matter whether interval endpoints are included: $P(a\le X\le b) = P(a < X < b)$ for continuous variables. That is not true for discrete ones.

:::def Probability density function (PDF)
A function $f(x)\ge0$ with total area 1 such that $P(a\le X\le b) = \int_a^b f(x)\,dx$. Its height is probability per unit length, not a probability.
:::

### The CDF ties it together
The cumulative distribution function $F(x) = P(X\le x) = \int_{-\infty}^x f(t)\,dt$ works exactly as for discrete variables, except now it is a smooth curve instead of a staircase. By the fundamental theorem of calculus, the density is the derivative of the CDF: $f(x) = F'(x)$. And interval probabilities are differences: $P(a\le X\le b) = F(b) - F(a)$. In practice we often use the CDF to avoid integrating again and again.

The CDF also gives **percentiles** (quantiles). The median $m$ solves $F(m) = 0.5$, and the 90th percentile solves $F(x) = 0.9$.

### The continuous uniform distribution
The spinner is the **uniform distribution** on $[a, b]$: $f(x) = \frac{1}{b - a}$ for $a\le x\le b$ and 0 elsewhere. Probabilities are just proportional to lengths. If a train arrives uniformly between 0 and 10 minutes from now, $P(\text{wait}\le3) = \frac{3}{10}$. The CDF is $F(x) = \frac{x - a}{b - a}$ on the interval.

### Expectation and variance by integration
Everything you learned for discrete variables carries over, with sums replaced by integrals and PMFs by densities:
$$E[X] = \int x f(x)\,dx,\qquad E[g(X)] = \int g(x)f(x)\,dx,\qquad \operatorname{Var}(X) = E[X^2] - (E[X])^2.$$
All the rules from the previous lesson, linearity, $\operatorname{Var}(aX + b) = a^2\operatorname{Var}(X)$ and so on, still apply.

For the uniform on $[0, 1]$: $E[X] = \int_0^1 x\,dx = \frac12$, and $E[X^2] = \int_0^1 x^2\,dx = \frac13$, so $\operatorname{Var}(X) = \frac13 - \frac14 = \frac{1}{12}$. For a general uniform on $[a, b]$, the mean is the midpoint $\frac{a + b}{2}$ and the variance is $\frac{(b - a)^2}{12}$.

### The exponential distribution: waiting times
Calls arrive at a help desk at an average rate of $\lambda$ per minute, independently (a Poisson process, from the last lesson). How long until the next call? This waiting time $T$ has the **exponential distribution**:
$$f(t) = \lambda e^{-\lambda t},\quad t\ge0.$$
The CDF comes from integrating: $F(t) = 1 - e^{-\lambda t}$. This has a lovely interpretation: $P(T > t) = e^{-\lambda t}$ is exactly the Poisson probability of *zero* calls in time $t$, since that count has mean $\lambda t$. If $\lambda = 2$ calls per minute, the chance of waiting more than 1 minute is $e^{-2}\approx0.135$.

The mean waiting time is $E[T] = \frac1\lambda$ (half a minute here), and the variance is $\frac{1}{\lambda^2}$. The median is smaller than the mean: solving $1 - e^{-\lambda m} = \frac12$ gives $m = \frac{\ln2}{\lambda}\approx\frac{0.693}{\lambda}$. The long right tail of occasional long waits pulls the mean up.

Like the geometric distribution, the exponential is **memoryless**: $P(T > s + t\mid T > s) = P(T > t)$. Having already waited 5 minutes doesn't make the call any more "due." The exponential is the only continuous distribution with this property.

:::def Exponential distribution
Waiting time until the next event in a process with rate $\lambda$: $f(t) = \lambda e^{-\lambda t}$ for $t\ge0$, CDF $1 - e^{-\lambda t}$, mean $1/\lambda$, variance $1/\lambda^2$.
:::

### Medians and percentiles of a continuous variable
The CDF also answers questions in reverse. The **median** of a continuous random variable is the value $m$ with $F(m) = 0.5$: half the probability lies on each side. More generally the $q$-th quantile solves $F(x) = q$. For an exponential waiting time with rate $\lambda$, $F(x) = 1 - e^{-\lambda x}$, so $1 - e^{-\lambda m} = 0.5$ gives $m = \frac{\ln 2}{\lambda}$. If buses arrive at rate $\lambda = 0.5$ per minute, the mean wait is $\frac{1}{\lambda} = 2$ minutes but the median is only $\frac{0.693}{0.5}\approx1.39$ minutes. Half of all waits are shorter than about 1.4 minutes, while a few long waits pull the mean up. This gap between mean and median is the signature of a right-skewed distribution, and it's why the median is often the better summary of a "typical" wait, income or file size.

### Common mistakes
Reading $f(x)$ as a probability is the classic error; only areas are probabilities. Forgetting that a density must integrate to 1 is another: if a problem gives $f(x) = cx^2$ on $[0, 1]$, you must solve $\int_0^1 cx^2\,dx = \frac c3 = 1$ to get $c = 3$. Mixing up rate and mean in the exponential is common too: rate 2 per minute means mean wait $\frac12$ minute, not 2 minutes. Finally, remember that $P(X = a) = 0$ for continuous $X$ does not mean the value $a$ is impossible, only that it has no probability mass by itself.

### Summary
Continuous random variables take values in intervals, each single value having probability zero. A density $f(x)\ge0$ with total area 1 gives probabilities as areas, $P(a\le X\le b) = \int_a^b f$, and $f = F'$. Means and variances are integrals. The uniform spreads probability evenly; the exponential models memoryless waiting times with mean $1/\lambda$.

@viz distribution kind=exponential lo=0 hi=1 | The pink area is the probability. With rate 1, P(0 ≤ T ≤ 1) = 1 − e^(−1) ≈ 0.632.

:::explore
**What to try**
1. With $\lambda = 1$, confirm the shaded area from 0 to 1 is about 0.632, which is $1 - e^{-1}$.
2. Set $\lambda = 2$ and shade from 1 to 8. The area $\approx e^{-2}\approx0.135$ is the chance of waiting more than a minute at 2 calls per minute.
3. Raise $\lambda$ to 4 and look at the height of the curve at 0: it is 4, bigger than 1, yet the total area is still 1.
4. Switch to "uniform" with $a = 0$, $b = 6$ and shade from 2 to 5: the area is width times height, $3\times\frac16 = 0.5$.

**What to notice:** probability lives in the pink area, never in the height. Increasing $\lambda$ squeezes the curve toward 0 and makes it taller, and the dashed mean $1/\lambda$ moves left. For the uniform, the area is just width times height.
:::

:::formulas
$$P(a\le X\le b) = \int_a^b f(x)\,dx = F(b) - F(a)$$
$$f(x)\ge0,\quad \int_{-\infty}^\infty f(x)\,dx = 1,\quad f(x) = F'(x)$$
$$E[X] = \int xf(x)\,dx,\quad \operatorname{Var}(X) = \int x^2f(x)\,dx - \mu^2$$
$$\text{Uniform}[a,b]: \; f = \tfrac{1}{b-a},\; E = \tfrac{a+b}{2},\; \operatorname{Var} = \tfrac{(b-a)^2}{12}$$
$$\text{Exp}(\lambda): \; f = \lambda e^{-\lambda t},\; F = 1 - e^{-\lambda t},\; E = \tfrac1\lambda,\; \operatorname{Var} = \tfrac{1}{\lambda^2}$$
:::

:::thm Memorylessness of the exponential distribution
If $T\sim\text{Exp}(\lambda)$, then for $s, t\ge0$, $P(T > s + t\mid T > s) = P(T > t)$.
:::

:::proof
$P(T > u) = 1 - F(u) = e^{-\lambda u}$. So $P(T > s+t\mid T > s) = \frac{e^{-\lambda(s+t)}}{e^{-\lambda s}} = e^{-\lambda t} = P(T > t)$.
:::

:::thm Mean of the exponential distribution
If $T\sim\text{Exp}(\lambda)$ then $E[T] = 1/\lambda$.
:::

:::proof
Integrate by parts with $u = t$, $dv = \lambda e^{-\lambda t}dt$: $\int_0^\infty t\lambda e^{-\lambda t}dt = [-te^{-\lambda t}]_0^\infty + \int_0^\infty e^{-\lambda t}dt = 0 + \frac1\lambda$.
:::

:::steps f(x) = cx on [0, 2] and 0 elsewhere. Find c, P(X ≤ 1) and E[X].
1. $\int_0^2 cx\,dx = 2c = 1$, so $c = \frac12$.
2. $P(X\le1) = \int_0^1\frac x2dx = \frac14$.
3. $E[X] = \int_0^2 x\cdot\frac x2dx = \frac{x^3}{6}\Big|_0^2 = \frac86 = \frac43$.
:::

:::steps A light bulb's lifetime is exponential with mean 1000 hours. Find P(it lasts more than 1500 hours) and its median lifetime.
1. $\lambda = \frac{1}{1000}$.
2. $P(T > 1500) = e^{-1.5}\approx0.223$.
3. Median $= 1000\ln2\approx693$ hours.
:::

:::steps X is uniform on [2, 8]. Find P(3 < X < 6), E[X] and Var(X).
1. Density $\frac16$; $P = \frac{6 - 3}{6} = \frac12$.
2. $E[X] = 5$.
3. $\operatorname{Var}(X) = \frac{36}{12} = 3$.
:::

:::mock Exam question
The time (in minutes) a customer spends in a shop has density $f(t) = \frac{t}{50}$ for $0\le t\le10$ and 0 otherwise. (a) Check that $f$ is a valid density. (b) Find the CDF and the median time. (c) Find the mean time.
:::solution
(a) $f\ge0$ and $\int_0^{10}\frac{t}{50}dt = \frac{100}{100} = 1$. (b) $F(t) = \frac{t^2}{100}$ on $[0, 10]$; the median solves $\frac{m^2}{100} = \frac12$, so $m = \sqrt{50}\approx7.07$ minutes. (c) $E[T] = \int_0^{10}\frac{t^2}{50}dt = \frac{1000}{150} = \frac{20}{3}\approx6.67$ minutes.
:::
:::

:::ml
Generative models such as normalizing flows and diffusion models learn densities over continuous data like images or audio. Continuous densities appear in likelihoods for regression, in weight initialization (uniform or normal), and in dropout-like noise. Sampling from any distribution can be done by the inverse CDF method: if $U$ is uniform on $[0,1]$, then $F^{-1}(U)$ has CDF $F$; for the exponential, $-\ln(1-U)/\lambda$.
:::

:::cs
Simulations and load tests generate exponential inter-arrival times to mimic real traffic, and random number libraries build every continuous distribution from a uniform generator. Reliability engineers model component lifetimes with exponential distributions when the failure rate is constant.
:::

:::real
Radioactive decay follows the exponential law: the half-life is the median, $\frac{\ln2}{\lambda}$. Carbon-14 has a half-life of about 5730 years, which is how archaeologists date organic material.
:::

:::quiz
? $X$ is uniform on $[0, 4]$. Find $P(1\le X\le2)$.
= 1/4|0.25
> Length 1 out of 4.

? For a continuous random variable, what is $P(X = 3)$?
+ 0
- $f(3)$
- It depends on the distribution
> Single points have zero area under the density.

? $f(x) = 3x^2$ on $[0, 1]$. Find $P(X\le\frac12)$.
= 1/8|0.125
> $\int_0^{1/2}3x^2dx = (1/2)^3$.

? $T\sim\text{Exp}(\lambda = 0.5)$. Find $E[T]$.
= 2
> Mean is $1/\lambda$.

? Can a density function take a value larger than 1?
+ Yes
- No
> Uniform on $[0, 0.25]$ has density 4; only the total area must be 1.

? Uniform on $[0, 6]$: find the variance.
= 3
> $(6-0)^2/12 = 3$.
:::
## Lesson: The normal distribution {#normal-distribution}
@summary: The bell curve: its formula, standardizing with z-scores, the 68-95-99.7 rule, sums of normals and the normal approximation to the binomial.

### The most important curve in statistics
Measure the heights of a thousand adults, the errors of a thousand repeated lab measurements, or the average scores of a thousand classes, and draw a histogram. Again and again you get the same shape: a symmetric hump in the middle with tails that fade quickly on both sides. This is the **normal distribution**, also called the Gaussian distribution or the bell curve. It is the default model for measurement noise, the shape that averages converge to (the central limit theorem, later in this course), and the starting point for most of classical statistics and a great deal of machine learning.

### The formula and its two parameters
A normal random variable $X$ with mean $\mu$ and standard deviation $\sigma$, written $X\sim N(\mu, \sigma^2)$, has density
$$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\exp\!\Big(-\frac{(x - \mu)^2}{2\sigma^2}\Big).$$
It looks intimidating, but each piece has a job. The squared distance $(x - \mu)^2$ is smallest at $x = \mu$, so the curve peaks at the mean and is symmetric around it. Dividing by $\sigma^2$ measures that distance in units of the standard deviation. The exponential of a negative number makes the curve fall off extremely fast as you move away: values 4 standard deviations from the mean are rarer than 1 in 15,000. The constant in front, $\frac{1}{\sigma\sqrt{2\pi}}$, is exactly what makes the total area equal 1.

The two parameters control location and spread. Changing $\mu$ slides the curve left or right without changing its shape. Changing $\sigma$ stretches it: a larger $\sigma$ makes it wider and flatter, a smaller one makes it narrow and tall. The mean, median and mode are all equal to $\mu$, and the inflection points, where the curve changes from bending down to bending up, are at $\mu\pm\sigma$.

:::def Normal distribution
$N(\mu, \sigma^2)$ has density $\frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/(2\sigma^2)}$, a symmetric bell curve with mean $\mu$ and standard deviation $\sigma$.
:::

### The standard normal and z-scores
There is no simple formula for the area under a bell curve, so we need tables or software. Fortunately, one table serves every normal distribution, because all normal curves are the same shape after rescaling. The **standard normal** $Z\sim N(0, 1)$ has mean 0 and standard deviation 1, and its CDF is written $\Phi(z) = P(Z\le z)$.

To use it for any normal variable, **standardize**: compute the **z-score**
$$z = \frac{x - \mu}{\sigma},$$
which says how many standard deviations $x$ is above the mean. If $X\sim N(\mu, \sigma^2)$, then $Z = \frac{X - \mu}{\sigma}\sim N(0, 1)$, which follows from the rules for shifting and scaling. So $P(X\le x) = \Phi\big(\frac{x - \mu}{\sigma}\big)$.

Suppose adult heights are $N(170, 10^2)$ in centimetres. What fraction of people are taller than 185 cm? The z-score is $\frac{185 - 170}{10} = 1.5$. From a table, $\Phi(1.5)\approx0.9332$, so $P(X > 185) = 1 - 0.9332 = 0.0668$, about 6.7%.

Going the other way, what height is the 90th percentile? We need $z$ with $\Phi(z) = 0.9$, which is $z\approx1.2816$. Then $x = \mu + z\sigma = 170 + 1.2816\times10\approx182.8$ cm.

:::def Z-score
$z = (x - \mu)/\sigma$: the number of standard deviations a value lies above (positive) or below (negative) the mean.
:::

A few values of $\Phi$ are worth remembering: $\Phi(0) = 0.5$ by symmetry, $\Phi(1)\approx0.8413$, $\Phi(1.645)\approx0.95$, $\Phi(1.96)\approx0.975$ and $\Phi(2.576)\approx0.995$. Symmetry also gives $\Phi(-z) = 1 - \Phi(z)$, so tables only need positive $z$.

### The 68-95-99.7 rule
For quick estimates, remember that about **68%** of a normal distribution lies within one standard deviation of the mean, about **95%** within two, and about **99.7%** within three. With heights $N(170, 10^2)$, roughly 68% of people are between 160 and 180 cm, and 95% are between 150 and 190 cm. Someone 200 cm tall is 3 standard deviations above the mean, a height reached by only about 0.15% of people. Precisely, $P(|Z|\le1) = 2\Phi(1) - 1\approx0.6827$, and $P(|Z|\le1.96) = 0.95$ exactly, which is where the famous 1.96 in confidence intervals comes from.

### Sums of normal variables
Normals have a special closure property: a linear function of a normal is normal, and the sum of *independent* normals is normal. Means add and variances add:
$$X\sim N(\mu_1, \sigma_1^2),\ Y\sim N(\mu_2, \sigma_2^2)\text{ independent}\ \Rightarrow\ X + Y\sim N(\mu_1 + \mu_2,\ \sigma_1^2 + \sigma_2^2).$$
If a commute has a walking part $N(10, 2^2)$ minutes and a train part $N(25, 3^2)$ minutes, independent, the total is $N(35, 13)$ with standard deviation $\sqrt{13}\approx3.61$ minutes. Note that it's the variances, not the standard deviations, that add. In particular the average of $n$ independent $N(\mu, \sigma^2)$ values is exactly $N(\mu, \sigma^2/n)$.

### Approximating the binomial
When $n$ is large, a binomial $\text{Bin}(n, p)$ looks very close to a normal with the same mean $np$ and variance $np(1-p)$. A common rule of thumb is that the approximation is good when $np\ge10$ and $n(1-p)\ge10$. Because the binomial is discrete, we use a **continuity correction**: treat the integer $k$ as the interval $[k - 0.5, k + 0.5]$. For 100 fair coin flips, $\mu = 50$ and $\sigma = 5$. The chance of 60 or more heads is about $P(Z\ge\frac{59.5 - 50}{5}) = P(Z\ge1.9) = 1 - 0.9713 = 0.0287$; the exact binomial answer is 0.0284.

### Comparing values from different normal distributions
Standardizing also lets us compare results measured on different scales. Suppose Maya scores 82 on a chemistry exam where scores are $N(70, 8^2)$, and 88 on a history exam where scores are $N(80, 5^2)$. The history score is higher in raw points, but her chemistry $z$-score is $\frac{82 - 70}{8} = 1.5$ while her history $z$-score is $\frac{88 - 80}{5} = 1.6$. Relative to classmates, the history result is slightly more impressive: it beats about 94.5% of students, against 93.3% for chemistry. Because every normal distribution becomes the same standard normal after standardizing, a $z$-score means the same thing whatever the original units, which is why test publishers, growth charts for children and quality engineers all report results as $z$-scores or the percentiles that go with them.

### Common mistakes
The most frequent error is using the variance instead of the standard deviation when standardizing: in $N(170, 100)$ the second number is $\sigma^2 = 100$, so $\sigma = 10$. Another is forgetting the direction: tables give $P(Z\le z)$, so "greater than" needs $1 - \Phi(z)$. Don't add standard deviations when summing independent normals. And don't assume every bell-shaped looking dataset is normal: incomes, file sizes and waiting times are often skewed with heavy right tails, and treating them as normal badly underestimates extreme values.

### Summary
The normal $N(\mu, \sigma^2)$ is a symmetric bell curve centred at $\mu$ with spread $\sigma$. Standardize with $z = (x - \mu)/\sigma$ and use $\Phi$ to find probabilities and percentiles. About 68%, 95% and 99.7% of values lie within 1, 2 and 3 standard deviations. Independent normals add to a normal with added means and variances, and large binomials are approximately normal.

@viz distribution kind=normal lo=-1 hi=1 | The pink area between −1 and 1 is about 0.683: the 68 in the 68-95-99.7 rule.

:::explore
**What to try**
1. With $\mu = 0$, $\sigma = 1$, shade from −1 to 1, then from −2 to 2, then from −3 to 3. Read off roughly 0.683, 0.954 and 0.997.
2. Shade from −1.96 to 1.96 and confirm the area is 0.95.
3. Shade from 1.5 to 8 to get $P(Z > 1.5)\approx0.067$, the tall-people answer from the article.
4. Change $\sigma$ to 2 and keep the shading from −1 to 1. The area drops to about 0.383, because now ±1 is only half a standard deviation.
5. Move $\mu$ and watch the whole curve slide while its shape stays fixed.

**What to notice:** only the distance measured in standard deviations matters. Any normal probability can be turned into a standard normal one by standardizing, which is why one table is enough.
:::

:::formulas
$$f(x) = \frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$
$$Z = \frac{X - \mu}{\sigma}\sim N(0,1),\qquad P(X\le x) = \Phi\!\Big(\frac{x-\mu}{\sigma}\Big)$$
$$\Phi(-z) = 1 - \Phi(z)$$
$$P(|Z|\le1)\approx0.683,\ P(|Z|\le2)\approx0.954,\ P(|Z|\le3)\approx0.997$$
$$aX + b\sim N(a\mu + b, a^2\sigma^2)$$
$$X + Y\sim N(\mu_1+\mu_2, \sigma_1^2+\sigma_2^2)\ \text{(independent)}$$
:::

:::thm Standardization
If $X\sim N(\mu, \sigma^2)$ then $Z = (X - \mu)/\sigma\sim N(0, 1)$.
:::

:::proof
$P(Z\le z) = P(X\le\mu + \sigma z) = \int_{-\infty}^{\mu+\sigma z}\frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/2\sigma^2}dx$. Substitute $u = (x - \mu)/\sigma$, $dx = \sigma\,du$: this becomes $\int_{-\infty}^z\frac{1}{\sqrt{2\pi}}e^{-u^2/2}du = \Phi(z)$.
:::

:::steps Exam scores are N(70, 8²). What fraction score between 62 and 86?
1. $z$-scores: $\frac{62 - 70}{8} = -1$ and $\frac{86 - 70}{8} = 2$.
2. $P(-1\le Z\le2) = \Phi(2) - \Phi(-1) = 0.9772 - 0.1587 = 0.8185$.
:::

:::steps Bags of flour weigh N(1000, 15²) grams. What weight is exceeded by only 5% of bags?
1. We need $\Phi(z) = 0.95$, so $z = 1.645$.
2. $x = 1000 + 1.645\times15\approx1024.7$ grams.
:::

:::steps Two independent measurements are N(5, 1) and N(3, 4). Find P(X − Y > 0).
1. $X - Y\sim N(5 - 3, 1 + 4) = N(2, 5)$.
2. $P(X - Y > 0) = P(Z > \frac{0 - 2}{\sqrt5}) = P(Z > -0.894) = \Phi(0.894)\approx0.814$.
:::

:::mock Exam question
A machine fills bottles with volumes $N(500, 4^2)$ ml. (a) What fraction of bottles contain less than 494 ml? (b) A pack holds 4 independent bottles. What is the probability the pack's total volume is less than 1990 ml?
:::solution
(a) $z = \frac{494 - 500}{4} = -1.5$, so $P = \Phi(-1.5) = 1 - 0.9332 = 0.0668$. (b) The total is $N(2000, 4\times16) = N(2000, 64)$ with $\sigma = 8$. $z = \frac{1990 - 2000}{8} = -1.25$, so $P = \Phi(-1.25) = 1 - 0.8944 = 0.1056$.
:::
:::

:::ml
Least-squares regression is exactly maximum likelihood under Gaussian noise: maximizing $\prod e^{-(y_i - \hat y_i)^2/2\sigma^2}$ means minimizing $\sum(y_i - \hat y_i)^2$. Neural network weights are often initialized from normal distributions with carefully chosen variances (Xavier and He initialization), batch normalization standardizes activations with z-scores, and variational autoencoders and diffusion models are built on Gaussian noise.
:::

:::cs
Anomaly detection systems flag measurements with $|z| > 3$ as unusual, such as a server whose response time is 3 standard deviations above normal. The Box-Muller transform generates normal random numbers from two uniform ones.
:::

:::real
Standardized tests are scaled so scores are roughly normal: IQ tests use $N(100, 15^2)$, so a score of 130 is 2 standard deviations above the mean, the top 2.3%. Manufacturers use "six sigma" quality targets to keep defects far out in the tails.
:::

:::quiz
? $X\sim N(50, 10^2)$. What is the z-score of 65?
= 1.5|3/2
> $(65 - 50)/10$.

? About what fraction of a normal distribution lies within 2 standard deviations of the mean?
- 68%
+ 95%
- 99.7%
> The 68-95-99.7 rule.

? $Z\sim N(0, 1)$ and $\Phi(1) = 0.8413$. Find $P(Z > 1)$.
= 0.1587
> $1 - 0.8413$.

? Using symmetry, find $P(Z < -1)$.
= 0.1587
> $\Phi(-1) = 1 - \Phi(1)$.

? $X\sim N(2, 9)$ and $Y\sim N(3, 16)$ are independent. What is the standard deviation of $X + Y$?
= 5
> Variances add: $9 + 16 = 25$.

? What is the median of $N(7, 4)$?
= 7
> The normal is symmetric, so the median equals the mean.
:::
## Lesson: Joint distributions, covariance and correlation {#joint}
@summary: Two random variables at once: joint and marginal distributions, conditional distributions, independence, covariance, correlation and the multivariate normal.

### Why look at two variables together
Real questions rarely involve one quantity in isolation. Does studying longer go with higher exam scores? Are taller people heavier? Does a customer who buys bread also buy butter? To answer these we need to describe two (or more) random variables *together*, including how they relate. This is the job of a **joint distribution**. It is also the foundation of machine learning, where every data point is a vector of features $x_1, x_2, \dots, x_d$ together with a label, and learning means understanding how those quantities depend on each other.

### Joint probability tables
For two discrete random variables $X$ and $Y$, the **joint PMF** gives the probability of every pair of values: $p(x, y) = P(X = x, Y = y)$. Suppose a shop records whether a customer buys coffee ($X = 1$) or not ($X = 0$), and whether they buy a pastry ($Y = 1$) or not ($Y = 0$):

| | $Y = 0$ | $Y = 1$ |
|---|---|---|
| $X = 0$ | 0.3 | 0.1 |
| $X = 1$ | 0.2 | 0.4 |

All four entries are non-negative and add to 1. Each one is the probability of a combination: the chance a customer buys coffee and a pastry is 0.4.

:::def Joint distribution
For discrete $X$ and $Y$, the function $p(x, y) = P(X = x, Y = y)$, which is non-negative and sums to 1 over all pairs. For continuous variables, a joint density $f(x, y)$ whose volume over a region gives its probability.
:::

### Marginal distributions
From the joint table we can recover the distribution of each variable on its own, called its **marginal distribution**, by adding across rows or down columns. Adding across the rows gives $P(X = 0) = 0.3 + 0.1 = 0.4$ and $P(X = 1) = 0.2 + 0.4 = 0.6$: 60% of customers buy coffee. Adding down the columns gives $P(Y = 0) = 0.5$ and $P(Y = 1) = 0.5$. In symbols, $p_X(x) = \sum_y p(x, y)$. The name comes from writing these totals in the margins of the table. Note that the marginals alone do not determine the joint table: many different tables have the same row and column totals. The joint distribution contains extra information about how the variables are connected.

:::def Marginal distribution
The distribution of one variable obtained from a joint distribution by summing (or integrating) out the others: $p_X(x) = \sum_y p(x, y)$.
:::

### Conditional distributions
If we know a customer bought coffee, what's the chance they also bought a pastry? Restrict to the $X = 1$ row and rescale it to sum to 1: $P(Y = 1\mid X = 1) = \frac{0.4}{0.6} = \frac23$. For non-coffee customers, $P(Y = 1\mid X = 0) = \frac{0.1}{0.4} = \frac14$. This is the **conditional distribution** of $Y$ given $X$: $p(y\mid x) = \frac{p(x, y)}{p_X(x)}$. Coffee buyers are much more likely to buy pastries, so the two variables are related.

### Independence of random variables
$X$ and $Y$ are **independent** if knowing one tells us nothing about the other, which means the joint probabilities factor into the marginals for every pair: $p(x, y) = p_X(x)p_Y(y)$. Here $p_X(1)p_Y(1) = 0.6\times0.5 = 0.3$, but $p(1, 1) = 0.4$, so coffee and pastries are not independent. In an independent table, every row would be a multiple of the same pattern. One failing cell is enough to show dependence, but to prove independence every cell must factor.

### Covariance: do they move together?
To summarize the relationship in one number, we use the **covariance** from the expectation lesson, $\operatorname{Cov}(X, Y) = E[XY] - E[X]E[Y]$. For the shop, $E[X] = 0.6$ and $E[Y] = 0.5$. The product $XY$ is 1 only when both purchases happen, so $E[XY] = 0.4$. Then $\operatorname{Cov}(X, Y) = 0.4 - 0.3 = 0.1$. Positive covariance means the variables tend to be high together and low together.

The problem with covariance is its units. If $X$ is height in centimetres and $Y$ is weight in kilograms, the covariance is in centimetre-kilograms, and switching to metres would divide it by 100 without changing the relationship at all. So we standardize.

### Correlation: a unit-free measure
The **correlation coefficient** divides covariance by both standard deviations:
$$\rho = \operatorname{Corr}(X, Y) = \frac{\operatorname{Cov}(X, Y)}{\sigma_X\sigma_Y}.$$
It always lies between $-1$ and $1$. A value of $1$ means $Y$ is an exact increasing linear function of $X$, and $-1$ an exact decreasing one. Values near 0 mean little *linear* relationship. For the shop, $\operatorname{Var}(X) = 0.6\times0.4 = 0.24$ and $\operatorname{Var}(Y) = 0.25$, so $\rho = \frac{0.1}{\sqrt{0.24\times0.25}} = \frac{0.1}{0.245}\approx0.41$, a moderate positive correlation.

:::def Correlation
$\rho = \operatorname{Cov}(X,Y)/(\sigma_X\sigma_Y)$, a number in $[-1, 1]$ measuring the strength and direction of the linear relationship between $X$ and $Y$.
:::

### Zero correlation is not independence
Independence implies zero covariance, but the reverse fails. Let $X$ be $-1$, 0 or 1 with equal probability, and let $Y = X^2$. Then $Y$ is completely determined by $X$, about as dependent as you can get. But $E[X] = 0$ and $E[XY] = E[X^3] = 0$, so the covariance is 0. Correlation only detects straight-line relationships; a U-shaped relationship can have zero correlation.

### Continuous joint distributions and the multivariate normal
For continuous variables, a joint density $f(x, y)$ describes a surface over the plane, and probabilities are volumes: $P((X, Y)\in R) = \iint_R f(x, y)\,dx\,dy$. Marginals come from integrating out the other variable. The most important example is the **bivariate normal**, whose density looks like a bell-shaped hill. With means $\mu$ and the **covariance matrix**
$$\Sigma = \begin{pmatrix}\sigma_X^2 & \rho\sigma_X\sigma_Y\\ \rho\sigma_X\sigma_Y & \sigma_Y^2\end{pmatrix},$$
its contour lines are ellipses. When $\rho = 0$ the ellipses line up with the axes; as $\rho$ approaches $\pm1$ they squash into a thin diagonal cigar. In $d$ dimensions, $N(\mu, \Sigma)$ has a $d\times d$ covariance matrix with variances on the diagonal and covariances off it. For jointly normal variables, and only in special cases like this, zero correlation does imply independence.

### Common mistakes
Correlation does not imply causation: ice cream sales and drownings are correlated because both rise in summer. A small correlation doesn't mean no relationship, only no linear one. Don't conclude independence from the marginals alone, and don't confuse the conditional $P(Y\mid X)$ with the joint $P(X, Y)$.

### Summary
A joint distribution describes several random variables at once. Marginals come from summing out variables, and conditionals from slicing and rescaling. Variables are independent when the joint factors into marginals. Covariance measures how they move together, correlation rescales it to $[-1, 1]$, and the multivariate normal is described completely by a mean vector and a covariance matrix.

@viz scatter-corr | 200 points drawn from a bivariate normal with correlation ρ. The pink line is the best-fit line.

:::explore
**What to try**
1. Start at $\rho = 0.6$. Count roughly how many points are purple (same-sign deviations from the means) versus orange.
2. Slide $\rho$ to 0 and see the cloud become round, with purple and orange points balanced.
3. Slide to $\rho = -0.9$ and then to $+1$. Watch the cloud become a thin line and the readout $r$ reach 1.
4. Compare the sample correlation $r$ in the readout with the slider $\rho$. They're close but not identical, because 200 points are only a sample.

**What to notice:** covariance is the average product of deviations, so it's driven by whether points sit in the purple quadrants (top-right and bottom-left) or the orange ones. The cloud's elliptical shape is the contour picture of the bivariate normal described in the article.
:::

:::formulas
$$p_X(x) = \sum_y p(x,y),\qquad f_X(x) = \int f(x,y)\,dy$$
$$p(y\mid x) = \frac{p(x,y)}{p_X(x)}$$
$$\text{independent}\iff p(x,y) = p_X(x)p_Y(y)\ \text{for all } x,y$$
$$\operatorname{Cov}(X,Y) = E[XY] - E[X]E[Y]$$
$$\rho = \frac{\operatorname{Cov}(X,Y)}{\sigma_X\sigma_Y},\qquad -1\le\rho\le1$$
$$\operatorname{Cov}(aX+b, cY+d) = ac\operatorname{Cov}(X,Y)$$
:::

:::thm Independence implies zero covariance
If $X$ and $Y$ are independent then $E[XY] = E[X]E[Y]$, so $\operatorname{Cov}(X, Y) = 0$.
:::

:::proof
$E[XY] = \sum_{x,y}xy\,p_X(x)p_Y(y) = \big(\sum_x xp_X(x)\big)\big(\sum_y yp_Y(y)\big) = E[X]E[Y]$.
:::

:::thm Correlation is between −1 and 1
For any $X$, $Y$ with positive variances, $|\rho|\le1$.
:::

:::proof
Let $U = (X - \mu_X)/\sigma_X$ and $V = (Y - \mu_Y)/\sigma_Y$, so $\operatorname{Var}(U) = \operatorname{Var}(V) = 1$ and $\operatorname{Cov}(U, V) = \rho$. Variances are non-negative: $0\le\operatorname{Var}(U\pm V) = 2\pm2\rho$, which gives $-1\le\rho\le1$.
:::

:::steps Using the coffee table, find P(X = 1 | Y = 1).
1. $P(Y = 1) = 0.1 + 0.4 = 0.5$.
2. $P(X = 1\mid Y = 1) = \frac{0.4}{0.5} = 0.8$.
:::

:::steps X and Y have joint PMF p(0,0) = 0.25, p(0,1) = 0.25, p(1,0) = 0.25, p(1,1) = 0.25. Are they independent?
1. Marginals: $p_X(0) = p_X(1) = 0.5$, $p_Y(0) = p_Y(1) = 0.5$.
2. Each cell equals $0.5\times0.5 = 0.25$, so yes, independent.
:::

:::steps Var(X) = 4, Var(Y) = 9, Cov(X, Y) = 3. Find ρ and Var(X + Y).
1. $\rho = \frac{3}{2\times3} = 0.5$.
2. $\operatorname{Var}(X + Y) = 4 + 9 + 2(3) = 19$.
:::

:::mock Exam question
$X$ and $Y$ have joint PMF $p(1,1) = 0.2$, $p(1,2) = 0.3$, $p(2,1) = 0.4$, $p(2,2) = 0.1$. (a) Find the marginal distributions. (b) Find $\operatorname{Cov}(X, Y)$. (c) Are $X$ and $Y$ independent?
:::solution
(a) $P(X=1) = 0.5$, $P(X=2) = 0.5$; $P(Y=1) = 0.6$, $P(Y=2) = 0.4$. (b) $E[X] = 1.5$, $E[Y] = 1.4$, $E[XY] = 1(0.2) + 2(0.3) + 2(0.4) + 4(0.1) = 2.0$. $\operatorname{Cov} = 2.0 - 2.1 = -0.1$. (c) No: $p(1,1) = 0.2\ne0.5\times0.6 = 0.3$ (and the covariance is non-zero).
:::
:::

:::ml
Every dataset is a sample from a joint distribution $p(x, y)$. Discriminative models learn the conditional $p(y\mid x)$, while generative models learn the joint. A covariance matrix of features drives PCA, whitening and Gaussian mixture models, and highly correlated features (multicollinearity) make regression weights unstable. Gaussian processes model functions as infinite-dimensional multivariate normals.
:::

:::cs
Recommender systems and market-basket analysis estimate joint and conditional probabilities of items, like $P(\text{butter}\mid\text{bread})$. Database query optimizers assume column independence to estimate result sizes, and they make large errors when columns are correlated.
:::

:::real
Finance runs on covariance: portfolio risk depends on the covariance matrix of asset returns. In medicine, correlation between a risk factor and a disease is the first clue, but establishing causation needs controlled trials.
:::

:::quiz
? In the coffee table, what is $P(Y = 1\mid X = 0)$?
= 1/4|0.25
> $0.1/0.4$.

? $\operatorname{Cov}(X, Y) = 6$, $\sigma_X = 2$, $\sigma_Y = 5$. Find $\rho$.
= 0.6|3/5
> $6/(2\times5)$.

? If $\operatorname{Cov}(X, Y) = 0$, must $X$ and $Y$ be independent?
- Yes
+ No
> $Y = X^2$ with $X$ symmetric around 0 has zero covariance but is fully dependent.

? $\operatorname{Cov}(X, Y) = 2$. Find $\operatorname{Cov}(3X, -Y + 4)$.
= -6
> $3\times(-1)\times2$; constants don't matter.

? A correlation of $-0.95$ means...
+ a strong decreasing linear relationship
- almost no relationship
- $X$ causes $Y$ to decrease
> Near $-1$ means points lie close to a downward line; correlation says nothing about cause.

? Joint PMF: $p(0,0) = 0.1$, $p(0,1) = 0.3$, $p(1,0) = 0.2$, $p(1,1) = 0.4$. Find $P(Y = 1)$.
= 0.7|7/10
> Sum the $Y = 1$ column: $0.3 + 0.4$.
:::
# Unit: Inequalities and limit theorems

## Lesson: Probability inequalities and the law of large numbers {#inequalities-lln}
@summary: Markov's and Chebyshev's inequalities bound tail probabilities, and the law of large numbers explains why averages settle down to the mean.

### Why averages can be trusted
Flip a fair coin 10 times and you might get 7 heads, a proportion of 0.7. Flip it 10,000 times and you will almost certainly get something between 0.49 and 0.51. Casinos rely on this, pollsters rely on it, and every machine learning model trained by averaging a loss over a dataset relies on it. The **law of large numbers** is the theorem that makes "the average settles down to the expected value" precise. To prove it we need tools for bounding how likely a random variable is to be far from its mean, even when we know almost nothing about its distribution. Those tools are Markov's and Chebyshev's inequalities.

### Markov's inequality
Suppose the average income in a town is \$40,000. What fraction of people can earn \$200,000 or more? Without knowing anything else, we can still say: at most a fifth. If more than a fifth earned at least \$200,000, those people alone would push the average above $\frac15\times200{,}000 = 40{,}000$, even if everyone else earned nothing. Incomes can't be negative, so this argument is airtight.

That's **Markov's inequality**: for any non-negative random variable $X$ and any $a > 0$,
$$P(X\ge a)\le\frac{E[X]}{a}.$$
It is crude, but it needs only the mean and the fact that $X\ge0$. With $E[X] = 40{,}000$ and $a = 200{,}000$, the bound is $\frac{40{,}000}{200{,}000} = 0.2$. Notice the bound is useless when $a$ is below the mean (it would exceed 1), and it's only tight for very particular distributions. Its real value is as a building block.

:::def Markov's inequality
For $X\ge0$ and $a > 0$: $P(X\ge a)\le E[X]/a$.
:::

### Chebyshev's inequality
If we also know the variance, we can do much better, and we can bound deviations in both directions. Apply Markov's inequality to the non-negative variable $(X - \mu)^2$ with threshold $(k\sigma)^2$:
$$P(|X - \mu|\ge k\sigma) = P\big((X - \mu)^2\ge k^2\sigma^2\big)\le\frac{E[(X - \mu)^2]}{k^2\sigma^2} = \frac{1}{k^2}.$$
This is **Chebyshev's inequality**: the probability of being at least $k$ standard deviations from the mean is at most $\frac{1}{k^2}$. For *any* distribution with a finite variance, at most $\frac14$ of the probability lies 2 or more standard deviations away, and at most $\frac19$ lies 3 or more away. Equivalently, at least 75% lies within 2 standard deviations and at least about 89% within 3.

Compare this with the normal distribution, where 95% lies within 2 standard deviations. Chebyshev's 75% is weaker because it must hold for every distribution, including strange, heavy-tailed ones. When you know the distribution is normal, use the normal; when you don't, Chebyshev is a guarantee.

:::def Chebyshev's inequality
For any $X$ with mean $\mu$ and standard deviation $\sigma$, and any $k > 0$: $P(|X - \mu|\ge k\sigma)\le 1/k^2$.
:::

Here's an example. A factory's bolts have mean length 50 mm and standard deviation 0.2 mm, but the shape of the distribution is unknown. What fraction can be outside 49.4 to 50.6 mm? That interval is $\pm0.6 = \pm3\sigma$, so at most $\frac19\approx11\%$.

### The sample mean
Now let $X_1, X_2, \dots, X_n$ be **independent and identically distributed** (i.i.d.): independent repeats of the same experiment, each with mean $\mu$ and variance $\sigma^2$. Their **sample mean** is $\bar X_n = \frac1n(X_1 + \dots + X_n)$. By the rules for expectation and variance, $E[\bar X_n] = \mu$ and $\operatorname{Var}(\bar X_n) = \frac{\sigma^2}{n}$. The average is centred on the true mean, and its spread shrinks as $n$ grows. Ten coin flips have a proportion of heads with standard deviation $\sqrt{0.25/10}\approx0.158$; ten thousand flips, $\sqrt{0.25/10000} = 0.005$.

:::def Independent and identically distributed (i.i.d.)
Random variables that are mutually independent and all share the same distribution, like repeated rolls of the same die.
:::

### The weak law of large numbers
Combine the two facts. Apply Chebyshev to $\bar X_n$, whose variance is $\frac{\sigma^2}{n}$. For any tolerance $\varepsilon > 0$,
$$P(|\bar X_n - \mu|\ge\varepsilon)\le\frac{\sigma^2}{n\varepsilon^2}.$$
As $n\to\infty$, the right side goes to zero. This is the **weak law of large numbers**: the probability that the sample mean is off by more than any fixed amount shrinks to zero. We say $\bar X_n$ **converges in probability** to $\mu$. (A stronger version, the strong law, says that with probability 1 the sequence of averages actually converges to $\mu$.)

The bound also tells us how many samples we need. To be at least 95% sure that a poll's proportion is within 0.05 of the truth, we need $\frac{\sigma^2}{n(0.05)^2}\le0.05$. Since a proportion has $\sigma^2 = p(1-p)\le\frac14$, it suffices that $n\ge\frac{0.25}{0.05\times0.0025} = 2000$. The central limit theorem in the next lesson will show that about 385 is actually enough, but Chebyshev gives a guarantee with no assumptions about shape.

### What the law does not say
The law of large numbers is about *proportions* and *averages*, not about counts balancing out. After 1000 flips you might have 520 heads, an excess of 20. After a million flips the excess might be 600, which is larger, yet the proportion 0.5006 is much closer to 0.5. The deviations in the count usually grow like $\sqrt n$, while the average divides by $n$. And it says nothing about any single flip: believing that tails is "due" after a run of heads is the **gambler's fallacy**. Independent trials have no memory. The average converges not because later flips compensate, but because early luck gets diluted by a huge number of ordinary flips.

### Monte Carlo methods
The law of large numbers lets us compute expectations by simulation. To estimate $E[g(X)]$, draw many independent samples and average $g$ of them. To estimate $\pi$, scatter $n$ random points in the unit square and count the fraction inside the quarter circle $x^2 + y^2\le1$; that fraction converges to $\frac\pi4$. The error shrinks like $\frac{1}{\sqrt n}$, so each extra digit of accuracy costs 100 times more samples.

### Summary
Markov's inequality bounds tails using only the mean of a non-negative variable. Chebyshev's inequality, $P(|X - \mu|\ge k\sigma)\le\frac{1}{k^2}$, works for any distribution with finite variance. The sample mean of i.i.d. values has mean $\mu$ and variance $\sigma^2/n$, and combining these gives the law of large numbers: averages converge to the expected value. This is what justifies estimating probabilities by frequencies and expectations by simulation.

@viz lln p=0.3 | Five independent runs of 1000 flips. The running proportion of heads converges to the true probability.

:::explore
**What to try**
1. With true $P(\text{heads}) = 0.3$, press "Flip 1000 × 5 runs" several times. Note how wild the five curves are for the first 20 flips.
2. Look at the curves near $n = 1000$. They should all be within a few hundredths of 0.3; the standard deviation there is $\sqrt{0.21/1000}\approx0.014$.
3. Change $p$ to 0.5 and repeat. The early spread is a little wider, because $p(1-p)$ is largest at 0.5.

**What to notice:** no curve "corrects" its early luck by producing extra tails later; the early wiggles simply get averaged away as $n$ grows. The funnel narrows like $1/\sqrt n$, which is the $\sigma^2/n$ from the article: going from 10 to 1000 flips makes the spread 10 times smaller.
:::

:::formulas
$$P(X\ge a)\le\frac{E[X]}{a}\quad(X\ge0)$$
$$P(|X-\mu|\ge k\sigma)\le\frac{1}{k^2}$$
$$E[\bar X_n] = \mu,\qquad \operatorname{Var}(\bar X_n) = \frac{\sigma^2}{n}$$
$$P(|\bar X_n - \mu|\ge\varepsilon)\le\frac{\sigma^2}{n\varepsilon^2}\to0$$
$$\text{Monte Carlo: } \frac1n\sum_{i=1}^n g(X_i)\to E[g(X)]$$
:::

:::thm Markov's inequality
If $X\ge0$ and $a > 0$, then $P(X\ge a)\le E[X]/a$.
:::

:::proof
Let $I$ indicate the event $X\ge a$. Then $aI\le X$ always: when $I = 1$, $X\ge a$; when $I = 0$, $X\ge0$. Taking expectations, $aP(X\ge a)\le E[X]$.
:::

:::thm Weak law of large numbers
If $X_1, X_2, \dots$ are i.i.d. with mean $\mu$ and finite variance $\sigma^2$, then for every $\varepsilon > 0$, $P(|\bar X_n - \mu|\ge\varepsilon)\to0$ as $n\to\infty$.
:::

:::proof
$E[\bar X_n] = \mu$ and $\operatorname{Var}(\bar X_n) = \sigma^2/n$. By Chebyshev with $k\sigma_{\bar X} = \varepsilon$, $P(|\bar X_n - \mu|\ge\varepsilon)\le\frac{\sigma^2}{n\varepsilon^2}$, which tends to 0.
:::

:::steps The average wait at a clinic is 20 minutes. Bound the probability of waiting at least an hour.
1. Wait times are non-negative, so Markov applies.
2. $P(W\ge60)\le\frac{20}{60} = \frac13$.
:::

:::steps A test has mean 70 and standard deviation 5. At least what fraction of scores lie between 60 and 80?
1. 60 and 80 are $k = 2$ standard deviations from the mean.
2. $P(|X - 70|\ge10)\le\frac14$.
3. So at least $1 - \frac14 = \frac34$ of the scores lie strictly between 60 and 80.
:::

:::steps How many rolls of a die guarantee, by Chebyshev, P(|average − 3.5| ≥ 0.5) ≤ 0.1?
1. $\sigma^2 = \frac{35}{12}$.
2. Need $\frac{35/12}{n(0.25)}\le0.1$, so $n\ge\frac{35/12}{0.025} = \frac{35}{0.3}\approx116.7$.
3. $n = 117$ rolls suffice.
:::

:::mock Exam question
A website's daily visitor count has mean 1000 and standard deviation 100, with an unknown distribution. (a) Use Markov's inequality to bound $P(X\ge2000)$. (b) Use Chebyshev's inequality to bound the same probability. (c) Which bound is better, and why?
:::solution
(a) $P(X\ge2000)\le\frac{1000}{2000} = 0.5$. (b) $X\ge2000$ means $X - 1000\ge1000 = 10\sigma$, so $P\le P(|X - 1000|\ge10\sigma)\le\frac{1}{100} = 0.01$. (c) Chebyshev is far better because it uses the variance as well as the mean.
:::
:::

:::ml
Training minimizes an average loss over the dataset, which by the law of large numbers approximates the expected loss over the true distribution; that is the justification for empirical risk minimization. Concentration inequalities like Hoeffding's, $P(|\bar X - \mu|\ge\varepsilon)\le2e^{-2n\varepsilon^2}$ for values in $[0,1]$, give generalization bounds and tell us how big a test set must be to trust an accuracy estimate.
:::

:::cs
Randomized algorithms use Markov's inequality to turn an expected running time into a high-probability guarantee: an algorithm with expected time $T$ finishes within $2T$ with probability at least $\frac12$, so restarting after $2T$ steps a few times makes failure very unlikely. Monte Carlo integration and rendering (path tracing) average random samples.
:::

:::real
Insurance companies can predict their total claims accurately even though individual claims are unpredictable, because the average over millions of policies is very close to its expectation. That same law makes a casino's small edge into a near-certain profit.
:::

:::quiz
? $X\ge0$ with $E[X] = 5$. What is the Markov bound on $P(X\ge20)$?
= 1/4|0.25
> $5/20$.

? By Chebyshev, at most what fraction of any distribution lies 4 or more standard deviations from the mean?
= 1/16|0.0625
> $1/k^2$ with $k = 4$.

? i.i.d. values with variance 16 are averaged in groups of 4. What is the variance of the average?
= 4
> $\sigma^2/n = 16/4$.

? A fair coin shows heads 8 times in a row. The probability of tails on the next flip is...
- more than 1/2, since tails is due
+ exactly 1/2
- less than 1/2, since heads is hot
> Independent flips have no memory; the gambler's fallacy.

? What does the law of large numbers say?
+ The sample average converges to the expected value as the sample size grows
- The number of heads minus tails converges to 0
- Every outcome eventually evens out exactly
> It's about averages; the count difference typically grows like $\sqrt n$.

? By Chebyshev, at least what fraction of values lie within 3 standard deviations of the mean?
= 8/9|0.889
> $1 - 1/9$.
:::
## Lesson: The central limit theorem {#limit-theorems}
@summary: Why sums and averages of many independent values are approximately normal, the standard error, and how to use the CLT for approximate probabilities.

### A surprising shape
Roll one die and the outcome is uniform: each face has probability $\frac16$, a flat bar chart. Roll two dice and add them, and the totals form a triangle peaking at 7. Roll five dice and the total's distribution already looks like a smooth hump. Roll thirty and it's almost a perfect bell curve. Nothing about a die is bell-shaped, yet the bell appears. This happens with almost any starting distribution: skewed waiting times, lopsided coin flips, weird bimodal distributions. Add up enough independent copies and the total is approximately normal.

This is the **central limit theorem** (CLT), and it explains why the normal distribution is everywhere. Heights, measurement errors and test scores are each the combined effect of many small independent influences, so they come out roughly normal. It is also the reason statistics works: it tells us the distribution of a sample average even when we know almost nothing about the population.

### From the law of large numbers to the CLT
The law of large numbers, from the previous lesson, says the sample mean $\bar X_n$ of $n$ i.i.d. values converges to the population mean $\mu$. Its spread shrinks: its standard deviation is $\frac{\sigma}{\sqrt n}$. But the law says nothing about the *shape* of the distribution of $\bar X_n$ for large but finite $n$. The CLT fills in that gap. It says that if we zoom in on $\bar X_n$ at exactly the right scale, by standardizing, we see a standard normal.

### Statement of the theorem
Let $X_1, \dots, X_n$ be i.i.d. with mean $\mu$ and finite variance $\sigma^2 > 0$. Then for large $n$,
$$\bar X_n\approx N\Big(\mu, \frac{\sigma^2}{n}\Big),\qquad\text{equivalently}\qquad Z_n = \frac{\bar X_n - \mu}{\sigma/\sqrt n}\approx N(0, 1).$$
For the sum $S_n = X_1 + \dots + X_n$, the same statement reads $S_n\approx N(n\mu, n\sigma^2)$. Precisely, $P(Z_n\le z)\to\Phi(z)$ for every $z$ as $n\to\infty$.

Three things are notable. First, the mean and variance aren't new: we already knew $E[\bar X_n] = \mu$ and $\operatorname{Var}(\bar X_n) = \frac{\sigma^2}{n}$ from linearity and independence. The new information is the normal shape. Second, the starting distribution can be almost anything, as long as it has a finite variance. Third, the result is an approximation, and how large $n$ must be depends on the starting distribution. For symmetric distributions, $n = 10$ is often plenty. For strongly skewed ones like the exponential, you may need 30 or more, and for very skewed ones like rare-event indicators, many more. The rule of thumb "$n\ge30$" is a rough guide, not a law.

:::def Central limit theorem
For i.i.d. values with mean $\mu$ and finite variance $\sigma^2$, the standardized sample mean $\frac{\bar X_n - \mu}{\sigma/\sqrt n}$ has approximately a standard normal distribution when $n$ is large.
:::

### The standard error
The standard deviation of the sample mean, $\frac{\sigma}{\sqrt n}$, is so important that it has its own name: the **standard error** (SE). It tells you how far a sample average typically lands from the true mean. Because of the square root, quadrupling the sample size only halves the standard error. A survey of 100 people with $\sigma = 20$ has SE 2; to get SE 1 you need 400 people, and to get SE 0.5 you need 1600.

:::def Standard error
The standard deviation of an estimator; for the sample mean it is $\sigma/\sqrt n$.
:::

### Using the CLT: a worked example
A coffee shop's daily customer counts are i.i.d. with mean 200 and standard deviation 40, and the distribution is somewhat skewed. What's the probability that over a 25-day month the average is above 210?

The CLT says $\bar X_{25}\approx N(200, \frac{40^2}{25})$, so the standard error is $\frac{40}{5} = 8$. The z-score of 210 is $\frac{210 - 200}{8} = 1.25$, and $P(Z > 1.25) = 1 - 0.8944 = 0.1056$. About a 10.6% chance. We did this without knowing the daily distribution's shape.

The same question about the monthly *total* is equivalent: the total is $25\bar X$, approximately $N(5000, 25\times1600) = N(5000, 200^2)$, and a total above 5250 has z-score $\frac{250}{200} = 1.25$.

### The normal approximation to the binomial, explained
A binomial count is a sum of $n$ independent Bernoulli indicators, each with mean $p$ and variance $p(1-p)$. By the CLT, $\text{Bin}(n, p)\approx N(np, np(1-p))$ for large $n$. This is where the normal approximation in the normal-distribution lesson comes from. The sample proportion $\hat p = X/n$ is approximately $N\big(p, \frac{p(1-p)}{n}\big)$, which is the basis of every poll's margin of error. For $p = 0.5$ and $n = 1000$, the standard error is $\sqrt{0.25/1000}\approx0.0158$, and 95% of polls land within $1.96\times0.0158\approx0.031$ of the truth: the familiar "plus or minus 3 points."

### Why it works, intuitively
Every time you add an independent variable, you smooth the distribution of the total: adding two dice blurs the flat shape into a triangle, and further additions keep blurring. Information about the starting shape, such as skewness, gets diluted; skewness of the sum shrinks like $\frac{1}{\sqrt n}$. The only features that survive are the mean and variance, and the normal is the one distribution determined by just those two. A rigorous proof uses moment generating functions or characteristic functions: the logarithm of the characteristic function of $Z_n$ converges to $-\frac{t^2}{2}$, which is that of $N(0,1)$.

### Common mistakes
The CLT is about the distribution of the **average or sum**, not of individual values. Collecting more data does not make the data themselves normal; a histogram of 10,000 incomes is still skewed. It needs independence (or weak dependence) and finite variance: for heavy-tailed distributions like the Cauchy, averages never settle down. Don't confuse $\sigma$ (spread of individual values) with $\sigma/\sqrt n$ (spread of the average). And remember it's an approximation that can be poor for small $n$ or very skewed data.

### Summary
The CLT says sums and averages of many i.i.d. values are approximately normal, with the average distributed as $N(\mu, \sigma^2/n)$. The standard error $\sigma/\sqrt n$ measures the precision of a sample mean and shrinks like $1/\sqrt n$. Standardize with $z = \frac{\bar x - \mu}{\sigma/\sqrt n}$ to compute approximate probabilities. The CLT underlies polls, confidence intervals and hypothesis tests.

@viz clt src=exponential n=2 | The top shows a skewed population. The bottom shows 4000 sample means of size n. Increase n.

:::explore
**What to try**
1. Start with the exponential population and $n = 1$: the sample means look just like the population, skewed right.
2. Move $n$ to 2, 5, 10 and then 30. Watch the histogram of means become symmetric and bell-shaped, and narrower.
3. Switch the population to "coin (0/1)". At $n = 1$ there are only two bars; by $n = 30$ there is a bell.
4. Try "bimodal": a population with a hole in the middle still produces bell-shaped averages.
5. Compare widths at $n = 4$ and $n = 16$. The second should be about half as wide.

**What to notice:** the centre of the sample means stays at $\mu$ while the width shrinks like $\sigma/\sqrt n$, the standard error. The shape becomes normal regardless of the population, faster for symmetric populations and slower for skewed ones like the exponential.
:::

:::formulas
$$\bar X_n\approx N\Big(\mu,\frac{\sigma^2}{n}\Big),\qquad S_n\approx N(n\mu, n\sigma^2)$$
$$Z = \frac{\bar X_n - \mu}{\sigma/\sqrt n}\approx N(0,1)$$
$$\text{SE}(\bar X) = \frac{\sigma}{\sqrt n}$$
$$\hat p\approx N\Big(p,\frac{p(1-p)}{n}\Big)$$
$$\text{Bin}(n,p)\approx N(np, np(1-p))$$
:::

:::thm Central limit theorem (Lindeberg–Lévy)
If $X_1, X_2, \dots$ are i.i.d. with mean $\mu$ and variance $0 < \sigma^2 < \infty$, then for every real $z$, $P\Big(\frac{\bar X_n - \mu}{\sigma/\sqrt n}\le z\Big)\to\Phi(z)$ as $n\to\infty$.
:::

:::proof
Sketch. Let $Y_i = (X_i - \mu)/\sigma$, so $Z_n = \frac{1}{\sqrt n}\sum Y_i$. With characteristic function $\varphi(t) = E[e^{itY}] = 1 - \frac{t^2}{2} + o(t^2)$ (since $E[Y] = 0$, $E[Y^2] = 1$), independence gives $E[e^{itZ_n}] = \varphi(t/\sqrt n)^n = \big(1 - \frac{t^2}{2n} + o(\frac1n)\big)^n\to e^{-t^2/2}$, the characteristic function of $N(0,1)$. Lévy's continuity theorem then gives convergence of the CDFs.
:::

:::steps A die is rolled 100 times. Approximate P(total ≥ 370).
1. One die: $\mu = 3.5$, $\sigma^2 = \frac{35}{12}$. Total: mean 350, variance $\frac{3500}{12}\approx291.7$, SD $\approx17.08$.
2. $z = \frac{370 - 350}{17.08}\approx1.17$.
3. $P(Z\ge1.17)\approx1 - 0.879 = 0.121$.
:::

:::steps Light bulbs have lifetimes with mean 800 hours and SD 100. Approximate P(average of 64 bulbs < 775 hours).
1. $\text{SE} = \frac{100}{\sqrt{64}} = 12.5$.
2. $z = \frac{775 - 800}{12.5} = -2$.
3. $P(Z < -2)\approx0.0228$.
:::

:::steps A poll of n = 400 voters is taken when the true support is p = 0.5. Approximate P(sample proportion > 0.55).
1. $\text{SE} = \sqrt{\frac{0.25}{400}} = 0.025$.
2. $z = \frac{0.55 - 0.5}{0.025} = 2$.
3. $P(Z > 2)\approx0.0228$.
:::

:::mock Exam question
An elevator has a maximum load of 1600 kg. Adult weights have mean 75 kg and standard deviation 15 kg. If 20 adults get in, approximately what is the probability the load limit is exceeded? What assumption does your answer depend on?
:::solution
The total $S\approx N(20\times75, 20\times15^2) = N(1500, 4500)$, SD $\sqrt{4500}\approx67.1$. $z = \frac{1600 - 1500}{67.1}\approx1.49$, so $P(S > 1600)\approx1 - \Phi(1.49) = 1 - 0.9319\approx0.068$. It assumes the weights are independent (a group of rugby players would violate this) and that $n = 20$ is large enough for the normal approximation.
:::
:::

:::ml
The CLT is why mini-batch gradients are roughly Gaussian around the true gradient, why we report model accuracy with error bars of $\pm1.96\sqrt{\hat p(1-\hat p)/n}$, and why many learning algorithms assume Gaussian noise. Ensembles and bootstrap estimates rely on averages behaving normally.
:::

:::cs
Load balancers and capacity planners model total traffic from many independent users as approximately normal, which lets them size servers for, say, the 99.9th percentile. Benchmarking reports average run times with standard errors because individual run times are noisy.
:::

:::real
Pollsters report a margin of error of about $\pm3$ points for 1000 respondents because the CLT makes the sample proportion approximately normal with standard error near 0.016. Quality control charts plot averages of small batches, which the CLT makes approximately normal even if single measurements aren't.
:::

:::quiz
? Population SD is 12 and $n = 36$. What is the standard error of the mean?
= 2
> $12/\sqrt{36} = 2$.

? To halve the standard error, multiply the sample size by...
= 4
> SE scales like $1/\sqrt n$.

? Does the CLT say that a large sample of incomes will itself look normal?
- Yes
+ No, it says the sample average is approximately normal
> The data keep their shape; only averages and sums become normal.

? i.i.d. values have mean 10 and SD 4. For $n = 64$, the sample mean is approximately normal with what mean?
= 10
> The center doesn't change; only the spread shrinks.

? Same setup: what is $P(\bar X > 11)$ approximately? (Use $\Phi(2) = 0.9772$.)
= 0.0228
> SE $= 4/8 = 0.5$, so $z = 2$ and $1 - 0.9772$.

? Which population makes the sample mean approach normality fastest?
+ A symmetric uniform distribution
- A highly skewed distribution
- They all converge equally fast
> Skewness slows convergence; symmetric populations need small $n$.
:::
# Unit: Random processes

## Lesson: Markov chains {#markov-chains}
@summary: Random processes with no memory beyond the present: transition matrices, multi-step probabilities, stationary distributions and the long-run behaviour behind PageRank and MCMC.

### Randomness that unfolds over time
So far our random variables have mostly been single draws or collections of independent ones. But many random things evolve step by step, and each step depends on where we are now. Tomorrow's weather depends on today's. The next word in a sentence depends on the current one. A visitor's next page on a website depends on the page they're reading. A board game piece moves from square to square according to dice rolls. A **Markov chain** is the simplest model of such a process, and it is remarkably powerful: it powers Google's original PageRank, text generators, queueing models and the sampling algorithms at the heart of Bayesian machine learning.

### States and the Markov property
A Markov chain moves among a set of **states**. Let's use weather with three states: Sunny, Cloudy and Rainy. Each day the chain is in one state, and we write $X_t$ for the state on day $t$. The defining assumption is the **Markov property**: the probability of tomorrow's state depends only on today's state, not on the earlier history.
$$P(X_{t+1} = j\mid X_t = i, X_{t-1}, \dots, X_0) = P(X_{t+1} = j\mid X_t = i).$$
In words, "the future depends on the past only through the present." This doesn't mean yesterday doesn't matter at all; it means everything relevant about the past is captured by where you are now.

:::def Markov chain
A sequence of random states $X_0, X_1, \dots$ in which the distribution of $X_{t+1}$ depends only on $X_t$ (the Markov property).
:::

### The transition matrix
Because only the current state matters, the whole chain is described by the **transition probabilities** $P_{ij} = P(X_{t+1} = j\mid X_t = i)$, arranged in a **transition matrix**. For our weather:
$$P = \begin{pmatrix}0.7 & 0.2 & 0.1\\ 0.3 & 0.4 & 0.3\\ 0.2 & 0.4 & 0.4\end{pmatrix}$$
with rows and columns in the order Sunny, Cloudy, Rainy. Row $i$ lists where you go from state $i$: from Sunny, it stays sunny with probability 0.7, turns cloudy with 0.2 and rainy with 0.1. Every entry is non-negative and **every row sums to 1**, because from any state you must go somewhere. We can draw the chain as a diagram with a circle for each state and an arrow from $i$ to $j$ labelled $P_{ij}$, including self-loops for staying put.

:::def Transition matrix
The matrix $P$ with entries $P_{ij} = P(X_{t+1} = j\mid X_t = i)$. Its entries are non-negative and each row sums to 1.
:::

### Multi-step probabilities
If today is Sunny, what's the chance it's Sunny two days from now? Add up the ways to get there: Sunny→Sunny→Sunny has probability $0.7\times0.7 = 0.49$; Sunny→Cloudy→Sunny has $0.2\times0.3 = 0.06$; Sunny→Rainy→Sunny has $0.1\times0.2 = 0.02$. The total is $0.57$. That sum over intermediate states is exactly a row-times-column product from matrix multiplication, so the two-step transition probabilities are the entries of $P^2$, and in general the $n$-step probabilities are the entries of $P^n$.

It's often clearer to track the whole **distribution** over states as a row vector. If $\pi_t$ gives the probabilities of each state on day $t$, then
$$\pi_{t+1} = \pi_t P,\qquad \pi_t = \pi_0P^t.$$
Starting from a known Sunny day, $\pi_0 = (1, 0, 0)$. Then $\pi_1 = (0.7, 0.2, 0.1)$, the first row of $P$. Then $\pi_2 = (0.57, 0.26, 0.17)$, matching our path calculation for Sunny. Each entry is checked the same way, for example Rainy: $0.7(0.1) + 0.2(0.3) + 0.1(0.4) = 0.17$.

### The stationary distribution
Keep multiplying and something striking happens: the distribution stops changing. Whether you start on a sunny or a rainy day, after a couple of weeks $\pi_t$ is essentially $(0.462, 0.308, 0.231)$. That limit is the **stationary distribution** $\pi$, the distribution that one more step leaves unchanged:
$$\pi = \pi P,\qquad \sum_i\pi_i = 1.$$
For the weather chain we can solve these linear equations exactly and get $\pi = \big(\frac{6}{13}, \frac{4}{13}, \frac{3}{13}\big)$. Check the Sunny entry: $\frac{6(0.7) + 4(0.3) + 3(0.2)}{13} = \frac{4.2 + 1.2 + 0.6}{13} = \frac{6}{13}$. In linear algebra terms, $\pi$ is a left eigenvector of $P$ with eigenvalue 1.

The stationary distribution has two meanings. It's the long-run probability of each state, regardless of the starting state. And it's the long-run **fraction of time** the chain spends in each state: over many years, about $\frac{6}{13}\approx46\%$ of days are sunny. That second fact is a law of large numbers for Markov chains, called the ergodic theorem.

:::def Stationary distribution
A probability vector $\pi$ with $\pi = \pi P$: if the chain starts with distribution $\pi$, it keeps that distribution forever.
:::

### A two-state chain you can solve by hand
Take a machine that is either Working (A) or Broken (B). Each day a working machine breaks with probability $p$, and a broken one is repaired with probability $q$. In the long run, the flow from A to B must balance the flow from B to A: $\pi_A p = \pi_B q$. Together with $\pi_A + \pi_B = 1$, this gives
$$\pi_A = \frac{q}{p + q},\qquad\pi_B = \frac{p}{p + q}.$$
With $p = 0.3$ and $q = 0.1$, the machine is working only a quarter of the time. This "flow in equals flow out" balance is a quick way to find stationary distributions.

### When does the chain settle down?
Convergence to a unique stationary distribution needs two conditions. The chain must be **irreducible**: every state can be reached from every other, so the chain doesn't split into separate pieces. And it must be **aperiodic**: it doesn't cycle with a fixed rhythm. A chain that deterministically alternates A, B, A, B has stationary distribution $(\frac12, \frac12)$, but $\pi_t$ flips back and forth forever without converging. Self-loops, like the 0.7 chance of Sunny staying Sunny, destroy periodicity. A chain that is irreducible and aperiodic with finitely many states always converges to its unique stationary distribution from any start.

### Common mistakes
Don't mix up rows and columns: in our convention row $i$ holds the probabilities of leaving $i$, and rows sum to 1. Multiply the distribution as a *row* vector on the left, $\pi P$. Don't assume a real process is Markov without thinking: if weather really depends on the past three days, you can still use a Markov chain by making each state a triple of days. And remember the stationary distribution describes the long run, not tomorrow; tomorrow depends heavily on today.

### Summary
A Markov chain moves between states with probabilities that depend only on the current state, collected in a transition matrix whose rows sum to 1. Distributions evolve by $\pi_{t+1} = \pi_tP$, so $n$-step probabilities come from $P^n$. An irreducible, aperiodic chain converges to a unique stationary distribution solving $\pi = \pi P$, which also gives the long-run fraction of time in each state.

@viz g06-markov chain=weather | The weather chain from the article. Walk it, and compare the visit fractions with the stationary distribution.

:::explore
**What to try**
1. Choose the weather chain, start in Sunny, and look at the probability-evolution plot: the curves start at (1, 0, 0) and flatten out at the dashed lines within about 10 steps.
2. Change the start state to Rainy. The early curves differ, but they end at the same dashed lines, $\frac{6}{13}$, $\frac{4}{13}$ and $\frac{3}{13}$.
3. Press "Walk 1 step" a few times to watch the walker move, then "Walk 500 steps" several times and compare the visit fractions with the stationary values.
4. Switch to the two-state chain with $P(A\to B) = 0.3$ and $P(B\to A) = 0.1$; check that $\pi_A = 0.25$. Then set both sliders to 1 and see the periodic chain flip back and forth without settling.
5. Try the web surfer chain and find which page gets the most long-run traffic.

**What to notice:** the long-run answer forgets the starting state, which is the convergence theorem from the article. The walker's visit fractions approach the same numbers as $\pi_t$, so "long-run probability" and "fraction of time" agree. Removing self-loops and making the chain alternate breaks convergence, which is the aperiodicity condition.
:::

:::formulas
$$P(X_{t+1}=j\mid X_t=i, \text{past}) = P_{ij},\qquad \sum_j P_{ij} = 1$$
$$\pi_{t+1} = \pi_tP,\qquad \pi_t = \pi_0P^t$$
$$P(X_{t+n} = j\mid X_t = i) = (P^n)_{ij}$$
$$\pi = \pi P,\qquad \sum_i\pi_i = 1$$
$$\text{two-state: } \pi = \Big(\frac{q}{p+q}, \frac{p}{p+q}\Big)$$
:::

:::thm Chapman–Kolmogorov equations
For a Markov chain, $(P^{m+n})_{ij} = \sum_k(P^m)_{ik}(P^n)_{kj}$: the probability of going from $i$ to $j$ in $m+n$ steps sums over the state $k$ reached after $m$ steps.
:::

:::proof
By the law of total probability over $X_{t+m} = k$: $P(X_{t+m+n} = j\mid X_t = i) = \sum_k P(X_{t+m} = k\mid X_t = i)\,P(X_{t+m+n} = j\mid X_{t+m} = k, X_t = i)$. By the Markov property the last factor is $(P^n)_{kj}$, and the first is $(P^m)_{ik}$.
:::

:::thm Convergence to the stationary distribution
If a finite Markov chain is irreducible and aperiodic, it has a unique stationary distribution $\pi$, and $\pi_0P^t\to\pi$ for every starting distribution $\pi_0$.
:::

:::steps For the weather chain, it's Cloudy today. Find P(Rainy in 2 days).
1. One step from Cloudy: $(0.3, 0.4, 0.3)$.
2. Rainy next: $0.3(0.1) + 0.4(0.3) + 0.3(0.4) = 0.03 + 0.12 + 0.12 = 0.27$.
:::

:::steps A customer buys brand X or Y each week. X-buyers switch to Y with probability 0.2; Y-buyers switch to X with probability 0.4. Find the long-run market share of X.
1. Two-state chain with $p = 0.2$ (X→Y) and $q = 0.4$ (Y→X).
2. $\pi_X = \frac{q}{p+q} = \frac{0.4}{0.6} = \frac23$.
:::

:::steps Verify that π = (6/13, 4/13, 3/13) satisfies the Cloudy equation of π = πP.
1. Cloudy column of $P$: $(0.2, 0.4, 0.4)$.
2. $\frac{6(0.2) + 4(0.4) + 3(0.4)}{13} = \frac{1.2 + 1.6 + 1.2}{13} = \frac{4}{13}$. It matches.
:::

:::mock Exam question
A frog jumps between lily pads 1 and 2. From pad 1 it jumps to pad 2 with probability 0.5 and otherwise stays; from pad 2 it jumps to pad 1 with probability 0.25 and otherwise stays. (a) Write the transition matrix. (b) If it starts on pad 1, find the distribution after 2 jumps. (c) Find the stationary distribution.
:::solution
(a) $P = \begin{pmatrix}0.5 & 0.5\\0.25 & 0.75\end{pmatrix}$. (b) $\pi_1 = (0.5, 0.5)$; $\pi_2 = (0.5\cdot0.5 + 0.5\cdot0.25,\ 0.5\cdot0.5 + 0.5\cdot0.75) = (0.375, 0.625)$. (c) $\pi_1(0.5) = \pi_2(0.25)$ and $\pi_1 + \pi_2 = 1$ give $\pi = (\frac13, \frac23)$.
:::
:::

:::ml
Markov chain Monte Carlo (MCMC) methods such as Metropolis–Hastings and Gibbs sampling build a chain whose stationary distribution is a Bayesian posterior that is too hard to compute directly, then run it and use the visited states as samples. Hidden Markov models power speech recognition and sequence labelling, and reinforcement learning is formulated as a Markov decision process. Simple n-gram language models are Markov chains over words.
:::

:::cs
Google's PageRank models a random surfer who follows links (and occasionally jumps to a random page). A page's rank is its probability in the stationary distribution, computed by repeatedly multiplying by the transition matrix (power iteration). Queueing systems, network protocols and cache models are analysed as Markov chains.
:::

:::real
Board games like Snakes and Ladders are Markov chains; you can compute the expected number of turns to finish. Credit-rating agencies use transition matrices for the probability a bond moves from rating A to B in a year, and epidemiologists model patients moving between healthy, sick and recovered states.
:::

:::quiz
? In a transition matrix, what must each row sum to?
= 1
> From any state the chain must go somewhere.

? Two-state chain with $p = 0.2$ (A→B) and $q = 0.3$ (B→A). Find $\pi_A$.
= 3/5|0.6
> $q/(p+q) = 0.3/0.5$.

? Weather chain, Sunny today. What is P(Sunny tomorrow)?
= 0.7|7/10
> The Sunny-to-Sunny entry of $P$.

? Weather chain, Sunny today. What is P(Sunny in 2 days)?
= 0.57
> $0.49 + 0.06 + 0.02$.

? The Markov property says the next state depends on...
+ only the current state
- the entire history of states
- nothing; states are independent
> The present carries all the relevant information about the past.

? A chain alternates deterministically A, B, A, B, ... Does $\pi_t$ converge?
- Yes, to (1/2, 1/2)
+ No, it is periodic
> The stationary distribution is (1/2, 1/2), but the chain is periodic and $\pi_t$ keeps flipping.
:::
