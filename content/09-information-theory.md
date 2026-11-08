---
id: information-theory
title: Information Theory
tagline: Entropy, cross-entropy, KL divergence and mutual information — measuring surprise.
desc: Why is the classification loss called cross-entropy? Information theory measures information in bits. You'll learn surprise and entropy, joint and conditional entropy, coding and compression, cross-entropy, KL divergence, mutual information and channel capacity, and differential entropy, and see how they define the losses and objectives of modern ML.
color: #0ea5e9
symbol: H
area: ML math
paths: ml, cs
order: 8
---

# Unit: Entropy

## Lesson: Information and surprise {#surprise}
@summary: Rare events carry more information; measuring it in bits with −log₂ p.

### Why measure information at all?
Every day you receive messages. Some tell you almost nothing, and some change your plans completely. "The sun rose this morning" carries no news, because you were already sure of it. "It snowed in the Sahara" is headline material, because almost nobody expected it. In 1948 the engineer Claude Shannon asked a precise question: can we put a *number* on how much information a message carries? His answer founded information theory, and the same number now sits at the heart of every classification loss, every compression program and every language model.

The key idea is simple. Information is the same thing as **surprise**. A message is informative exactly to the extent that it was unlikely before you heard it. So the information in an event should depend only on its probability, and it should be large when the probability is small.

### An everyday scenario
Imagine a friend is thinking of a whole number from 1 to 8, and you may only ask yes/no questions. The smart strategy is to halve the possibilities each time: "Is it 5 or more?" "Is it 7 or more?" and so on. After 3 questions you always know the number, because $2^3 = 8$. Each yes/no answer that splits the possibilities in half gives you one **bit** of information, and learning which of 8 equally likely options is true is worth 3 bits.

Now suppose the number is from 1 to 1024. You need 10 questions, because $2^{10} = 1024$. Learning the answer is worth 10 bits. Notice the pattern: an outcome with probability $\frac18$ is worth 3 bits, and an outcome with probability $\frac{1}{1024}$ is worth 10 bits. In both cases the number of bits is the power of 2 in the denominator. That is a logarithm: $3 = \log_2 8$ and $10 = \log_2 1024$.

### The definition
For an event with probability $p$, Shannon defined its **information content**, also called its **surprisal**, as
$$I(p) = \log_2\frac{1}{p} = -\log_2 p \quad\text{bits.}$$
Let's test it on a few cases. A certain event has $p = 1$, and $-\log_2 1 = 0$: no surprise, no information. A fair coin landing heads has $p = \frac12$, so $I = -\log_2\frac12 = 1$ bit. Rolling a 6 on a fair die has $p = \frac16$, so $I = \log_2 6 \approx 2.585$ bits. Drawing the ace of spades from a shuffled deck has $p = \frac{1}{52}$, so $I = \log_2 52 \approx 5.70$ bits. The rarer the event, the bigger the number, exactly as our intuition demanded.

Probabilities that are not powers of $\frac12$ give fractional bits, and that is fine. An event with probability $0.9$ carries only $-\log_2 0.9 \approx 0.152$ bits, while an event with probability $0.01$ carries $-\log_2 0.01 \approx 6.64$ bits. A fractional bit simply means "less informative than a fair coin flip".

:::def Information content (surprisal)
The information carried by an event of probability $p$: $I(p) = -\log_2 p$ bits. It is 0 for a certain event and grows without bound as $p \to 0$.
:::

:::def Bit
The unit of information when logarithms are taken base 2. One bit is the information in the outcome of a fair coin flip, or in the answer to a yes/no question whose two answers were equally likely.
:::

### Why a logarithm and not something else?
You might wonder why Shannon chose a logarithm rather than, say, $\frac1p$. The reason is how information should behave for **independent** events. Suppose you flip a fair coin and roll a fair die. Learning both results should give you the information of the coin *plus* the information of the die, since the two facts have nothing to do with each other. But the probability of the combined event multiplies: $P(\text{heads and } 6) = \frac12\cdot\frac16 = \frac1{12}$.

So we need a function that turns multiplication into addition: $I(pq) = I(p) + I(q)$. The logarithm is exactly that function, since $\log(pq) = \log p + \log q$. Check it with our numbers: $1 + 2.585 = 3.585$ bits, and $\log_2 12 \approx 3.585$ bits. They agree. In fact the logarithm is the *only* well-behaved function with this property, which is proved in the Formulas & theorems section.

### Units: bits, nats and bans
The base of the logarithm only sets the unit, like choosing between metres and feet. Base 2 gives **bits**, natural logarithms (base $e$) give **nats**, and base 10 gives **bans** (also called hartleys). Converting is a single multiplication: $1 \text{ bit} = \ln 2 \approx 0.693$ nats, and $1$ nat $= \frac{1}{\ln 2} \approx 1.443$ bits. Machine learning code usually uses natural logs, so the losses you see printed during training are in nats.

:::def Nat
The unit of information when natural logarithms are used: $I = -\ln p$. One nat is about 1.443 bits.
:::

### Information adds up over many events
Because information adds for independent events, the total surprise of a long sequence is the sum of the surprises of its pieces. Three fair coin flips coming up heads, heads, heads has probability $\frac18$ and carries $1 + 1 + 1 = 3$ bits. A machine learning model that assigns probabilities to a whole dataset of independent examples has a total surprise equal to the sum of $-\log p$ over the examples. That sum is called the **negative log-likelihood**, and making it small is how most models are trained. You will meet it again as cross-entropy.

:::warn Common mistakes
- Information is about *probability*, not about meaning or importance. A coin flip that decides a million-dollar bet still carries exactly 1 bit.
- $-\log_2 p$ is never negative, because $0 < p \le 1$ makes $\log_2 p \le 0$. If you get a negative surprise, you dropped the minus sign.
- An event with $p = 0$ has infinite surprise. In code, $\log 0$ gives $-\infty$, which is why practical systems clip probabilities away from 0.
- Don't mix units. A value computed with `np.log` is in nats; divide by $\ln 2$ to get bits.
:::

### Summary
The information in an event of probability $p$ is $-\log_2 p$ bits. Certain events carry nothing, a fair coin flip carries 1 bit, and each halving of the probability adds one more bit. The logarithm is forced on us by the requirement that information from independent events adds up. Next we average this surprise over all outcomes of a random variable, which gives the most important quantity in the subject: entropy.

@viz binary-entropy | Slide P(heads) and read the surprise of heads, −log₂ p, in the readout.

:::explore
**What to try**
1. Set P(heads) to 0.5 and read the surprise of heads: exactly 1 bit.
2. Lower it to 0.25, then 0.125. Watch the surprise go to 2 bits, then 3 bits.
3. Push P(heads) toward 0.001 and see the surprise climb to about 10 bits.
4. Push it toward 0.999 and see the surprise of heads fall toward 0.

**What to notice:** each halving of the probability adds exactly one bit, which is the logarithm at work. The curve itself is the *average* surprise of the coin (its entropy), which is the subject of the next lesson. The readout line is the surprise of a single outcome, the quantity defined in this article.
:::

:::formulas
$$I(p) = -\log_2 p\ \text{bits} = -\ln p\ \text{nats}$$
$$I(pq) = I(p) + I(q)\quad\text{for independent events}$$
$$1\ \text{bit} = \ln 2 \approx 0.693\ \text{nats}$$
:::

:::thm The logarithm is the only measure of surprise
If $I(p)$ is continuous on $(0, 1]$, decreasing, and satisfies $I(pq) = I(p) + I(q)$ for all $p, q$, then $I(p) = -c\log_2 p$ for some constant $c > 0$. Choosing $I(\frac12) = 1$ gives $c = 1$.
:::

:::proof
Write $p = 2^{-x}$ with $x \ge 0$ and define $g(x) = I(2^{-x})$. The additivity rule becomes $g(x + y) = I(2^{-x}2^{-y}) = g(x) + g(y)$. A continuous function with $g(x + y) = g(x) + g(y)$ must be linear: first $g(n x) = n g(x)$ for whole numbers $n$, then $g(\frac mn) = \frac mn g(1)$ for fractions, and continuity extends this to every real $x$. So $g(x) = c x$ with $c = g(1) = I(\frac12)$, and since $x = -\log_2 p$, we get $I(p) = -c\log_2 p$. Because $I$ decreases, $c > 0$.
:::

:::steps How much information is in drawing the ace of spades?
1. There are 52 equally likely cards, so $p = \frac{1}{52}$.
2. $I = -\log_2\frac1{52} = \log_2 52 = \frac{\ln 52}{\ln 2}$.
3. $\ln 52 \approx 3.951$ and $\ln 2 \approx 0.693$, so $I \approx 5.70$ bits.
4. Sanity check: $2^5 = 32 < 52 < 64 = 2^6$, so the answer must be between 5 and 6 bits.
:::

:::steps A fair coin shows heads and a fair die shows 6. Total information?
1. Coin: $I = -\log_2\frac12 = 1$ bit.
2. Die: $I = -\log_2\frac16 = \log_2 6 \approx 2.585$ bits.
3. The events are independent, so information adds: $1 + 2.585 = 3.585$ bits.
4. Check directly: the joint probability is $\frac1{12}$ and $\log_2 12 \approx 3.585$ bits. Same answer.
:::

:::steps Convert 3 bits of surprise into nats
1. 3 bits means $p = 2^{-3} = \frac18$.
2. In nats, $I = -\ln\frac18 = \ln 8 = 3\ln 2$.
3. $3 \times 0.693 \approx 2.079$ nats.
:::

:::mock Exam question
A password is 8 characters, each chosen uniformly at random from the 26 lowercase letters. (a) How many bits of information does an attacker need to learn it? (b) Compare with a 4-digit PIN.
:::solution
(a) There are $26^8$ equally likely passwords, so the information is $\log_2 26^8 = 8\log_2 26 \approx 8 \times 4.700 = 37.6$ bits. An attacker guessing blindly needs about $2^{37.6}$ tries in the worst case.
(b) A PIN has $10^4$ options: $4\log_2 10 \approx 4 \times 3.322 = 13.3$ bits. The password carries almost three times as many bits, which means about $2^{24}$ (roughly 17 million) times as many possibilities.
:::
:::

:::ml
The **negative log-likelihood** of a model is the total surprise it feels at the training data: $-\sum_i \log q(y_i)$. Training a classifier or a language model means making the real data as unsurprising as possible. When a training log prints "loss 0.69" for a binary classifier, it is reporting about 0.69 nats per example, which is exactly the surprise of a fair coin ($\ln 2$): the model is still guessing.
:::

:::cs
Binary search is the yes/no game from the article: finding one item among $n$ sorted items takes about $\log_2 n$ comparisons because each comparison yields at most one bit. This is also why any comparison sort needs about $\log_2 n! \approx n\log_2 n$ comparisons: it must learn which of the $n!$ orderings is the right one.
:::

:::real
- **News:** "Man bites dog" is news and "dog bites man" is not, because the first is far less probable.
- **Weather in a desert:** a forecast of "sunny" in a place that is sunny 99% of days carries $-\log_2 0.99 \approx 0.014$ bits; a forecast of "rain" carries $-\log_2 0.01 \approx 6.6$ bits.
- **Security:** password strength meters estimate bits of surprise. Every extra random character from a 26-letter alphabet adds about 4.7 bits.
:::

:::quiz
? Information of an event with probability 1/16, in bits?
= 4
> $-\log_2\frac1{16} = \log_2 16 = 4$ bits.

? Three fair coin flips all land heads. How many bits of information is that?
= 3
> The probability is $\frac18$ and $\log_2 8 = 3$. Equivalently, 1 bit per independent flip.

? Which outcome carries more information?
- An event with probability 0.9
+ An event with probability 0.1
- They carry the same
> Rarer means more surprising: $-\log_2 0.1 \approx 3.32$ bits versus $-\log_2 0.9 \approx 0.15$ bits.

? Event A carries 2 bits and an independent event B carries 3 bits. How many bits does "A and B" carry?
= 5
> For independent events the probabilities multiply, so the logarithms add: $2 + 3 = 5$ bits.

? How many nats is one bit? (3 decimal places)
= 0.693|ln 2
> One bit is $-\ln\frac12 = \ln 2 \approx 0.693$ nats.

? How much information does an event with probability 1 carry?
= 0
> $-\log_2 1 = 0$. You learn nothing from something you were already certain of.
:::

## Lesson: Entropy {#entropy}
@summary: The average surprise of a random variable, its maximum, and why it is the limit of compression.

### From one outcome to a whole distribution
In the last lesson we measured the surprise of a single event. But usually we care about a **source** of events: a coin that will be flipped many times, a weather station reporting every day, a language model producing word after word. Before the next outcome arrives, we don't know which one it will be, so we can't know its exact surprise. What we *can* compute is the surprise we expect **on average**. That average is called **entropy**, and it measures how uncertain, unpredictable or "spread out" a random variable is.

### An everyday scenario
Imagine two towns. In Sunnyvale the forecast is "sunny" 9 days out of 10 and "rain" 1 day out of 10. In Coinflip City it is sunny or rainy with equal chance. Which town's forecast is more informative to hear each morning? In Sunnyvale you can almost guess the forecast without listening; the rare rainy day is very surprising, but it happens so seldom that, on average, the forecast tells you little. In Coinflip City every forecast settles a genuine 50/50 question. Entropy turns this intuition into a number.

### The definition
For a discrete random variable $X$ with probabilities $p(x)$, the **entropy** is the expected surprise:
$$H(X) = \sum_x p(x)\,\log_2\frac1{p(x)} = -\sum_x p(x)\log_2 p(x).$$
Each outcome contributes its surprise $-\log_2 p(x)$, weighted by how often it happens. Outcomes with $p(x) = 0$ contribute nothing, since we use the convention $0\log 0 = 0$ (the limit of $p\log p$ as $p \to 0$ is 0).

Let's compute the two towns. Coinflip City: $H = \frac12\cdot1 + \frac12\cdot1 = 1$ bit. Sunnyvale: the sunny days have surprise $-\log_2 0.9 \approx 0.152$ and the rainy days $-\log_2 0.1 \approx 3.322$, so
$$H = 0.9(0.152) + 0.1(3.322) \approx 0.137 + 0.332 = 0.469 \text{ bits.}$$
Sunnyvale's forecast carries less than half a bit per day on average, even though its rare rainy forecast is very surprising.

:::def Entropy
The average surprise of a random variable: $H(X) = -\sum_x p(x)\log_2 p(x)$. It measures uncertainty in bits (or nats with natural logs).
:::

### Building intuition with more outcomes
Take a distribution over three kinds of weather: sunny $\frac12$, cloudy $\frac14$, rainy $\frac14$. The surprises are 1, 2 and 2 bits, so $H = \frac12(1) + \frac14(2) + \frac14(2) = 1.5$ bits. If instead all three were equally likely, $H = \log_2 3 \approx 1.585$ bits, slightly more. Spreading probability evenly always increases uncertainty.

For four outcomes with probabilities $\frac12, \frac14, \frac18, \frac18$: $H = \frac12(1) + \frac14(2) + \frac18(3) + \frac18(3) = 1.75$ bits. For a fair six-sided die, every outcome has surprise $\log_2 6$, so $H = \log_2 6 \approx 2.585$ bits. In general, a uniform distribution over $n$ outcomes has entropy exactly $\log_2 n$.

### The two extremes
Entropy is never negative, because each term $-p\log_2 p$ is at least zero. It equals zero only when one outcome has probability 1, which is a variable with no uncertainty at all. At the other extreme, among all distributions on $n$ outcomes, the **uniform** distribution has the most entropy, $\log_2 n$. So for any distribution on $n$ outcomes,
$$0 \le H(X) \le \log_2 n.$$
A distribution "halfway" between, like $(\frac12, \frac14, \frac14)$, sits in between: 1.5 bits out of a maximum of 1.585.

For a coin with $P(\text{heads}) = p$, the entropy is the **binary entropy function** $h(p) = -p\log_2 p - (1 - p)\log_2(1 - p)$. It is 0 at $p = 0$ and $p = 1$, rises to its maximum of 1 bit at $p = \frac12$, and is symmetric: $h(0.1) = h(0.9) \approx 0.469$.

:::def Binary entropy function
The entropy of a coin with heads-probability $p$: $h(p) = -p\log_2 p - (1-p)\log_2(1-p)$, which peaks at 1 bit when $p = \frac12$.
:::

@fig binary-entropy | The binary entropy function h(p): zero for a certain coin, one bit for a fair coin.

### What entropy really measures: questions and code length
Here is the most useful interpretation. Entropy is the average number of yes/no questions you need to identify the outcome, if you ask cleverly. For $(\frac12, \frac14, \frac18, \frac18)$ over outcomes A, B, C, D, ask "Is it A?" first. Half the time you are done after 1 question. Otherwise ask "Is it B?" and a quarter of the time you are done after 2. Otherwise one more question separates C from D, for 3 questions. The average is $\frac12(1) + \frac14(2) + \frac14(3) = 1.75$ questions, which is exactly the entropy.

The same calculation describes **compression**. Give A the code `0`, B `10`, C `110` and D `111`, and the average code length is 1.75 bits per symbol instead of the 2 bits a fixed-length code would need. Shannon proved that no lossless code can beat the entropy on average, and that you can get as close to it as you like. That is why entropy is the fundamental limit of compression, a result we study properly in the coding lesson.

### Why it works
Why should the *average* of $-\log p$ be the right measure? Because surprise is the "cost" of an outcome in bits, and a long sequence of $N$ outcomes contains about $N p(x)$ copies of each outcome $x$. The total cost is about $\sum_x N p(x)(-\log_2 p(x)) = N H(X)$. So entropy is the cost per symbol of describing a long stream from the source. Predictable sources are cheap to describe; unpredictable ones are expensive.

:::warn Common mistakes
- Entropy belongs to a **distribution**, not to a single outcome. "The entropy of heads" doesn't make sense; "the surprise of heads" does.
- Entropy doesn't care about the *values* of outcomes, only their probabilities. A die labelled 1–6 and one labelled 10–60 have the same entropy.
- Don't forget the minus sign or the weights: $H$ is $-\sum p\log p$, not $-\sum \log p$.
- Bits and nats differ by a factor of $\ln 2$. The maximum for a coin is 1 bit, which is $\ln 2 \approx 0.693$ nats.
:::

### Summary
Entropy $H(X) = -\sum p\log_2 p$ is the average surprise of a random variable. It is 0 for a certain outcome and at most $\log_2 n$, reached by the uniform distribution. It equals the average number of clever yes/no questions needed to pin down the outcome, and the minimum average number of bits needed to compress it. Next we extend it to pairs of variables.

@viz binary-entropy | A coin is most uncertain at p = 0.5 (1 bit) and certain at 0 or 1.

:::explore
**What to try**
1. Put P(heads) at 0.5 and confirm the entropy is exactly 1 bit.
2. Move to 0.1 and then 0.9. Both give about 0.469 bits, Sunnyvale's number from the article.
3. Drag slowly from 0.5 toward 0 and notice the curve is flat near the top and steep near the edges.

**What to notice:** a slightly unfair coin (say 0.6) is still almost 1 bit (about 0.971), so small biases barely reduce uncertainty. Only strongly biased coins become predictable. The symmetry $h(p) = h(1 - p)$ shows that entropy doesn't care which outcome is likely, only how lopsided the distribution is.
:::

@viz entropy | Drag the p bars. Uniform has maximum entropy; a spike has zero.

:::explore
**What to try**
1. Set all four p sliders equal. The readout shows $H(p) = 2$ bits, the maximum $\log_2 4$.
2. Make p1 large and the others tiny. Watch $H(p)$ fall toward 0.
3. Recreate $(\frac12, \frac14, \frac18, \frac18)$ by setting p1 = 0.5, p2 = 0.25, p3 = p4 = 0.125 and check you get 1.75 bits.
4. Ignore the q sliders for now; they are used in the cross-entropy and KL lessons.

**What to notice:** every move that makes the bars more even raises the entropy, and every move that concentrates mass lowers it. This is the bound $0 \le H \le \log_2 n$ from the article made visible.
:::

:::formulas
$$H(X) = -\sum_x p(x)\log_2 p(x)$$
$$0 \le H(X) \le \log_2 n,\quad H = \log_2 n \iff X \text{ uniform}$$
$$h(p) = -p\log_2 p - (1-p)\log_2(1-p)$$
:::

:::thm Bounds on entropy
For a random variable with $n$ possible outcomes, $0 \le H(X) \le \log_2 n$. The lower bound holds with equality exactly when one outcome is certain; the upper bound exactly when $X$ is uniform.
:::

:::proof
Lower bound: each term $-p\log_2 p \ge 0$ for $0 \le p \le 1$, and it is 0 only when $p \in \{0, 1\}$. Upper bound: $\log_2$ is concave, so by Jensen's inequality the average of a log is at most the log of the average:
$$H(X) = \sum_x p(x)\log_2\frac{1}{p(x)} \le \log_2\Big(\sum_x p(x)\cdot\frac1{p(x)}\Big) = \log_2 n,$$
where the sum runs over the $n$ outcomes. Equality in Jensen's inequality requires $\frac1{p(x)}$ to be the same for every outcome, which means $p$ is uniform.
:::

:::thm Shannon's source coding theorem (preview)
No lossless code can compress symbols from $X$ to fewer than $H(X)$ bits per symbol on average, and by coding long blocks you can get arbitrarily close to $H(X)$.
:::

:::steps Entropy of (1/2, 1/4, 1/8, 1/8)
1. Surprises: $-\log_2\frac12 = 1$, $-\log_2\frac14 = 2$, $-\log_2\frac18 = 3$ (twice).
2. Weight by probability: $\frac12(1) + \frac14(2) + \frac18(3) + \frac18(3)$.
3. $= 0.5 + 0.5 + 0.375 + 0.375 = 1.75$ bits.
4. Compare with the maximum $\log_2 4 = 2$ bits for 4 outcomes.
:::

:::steps Entropy of a coin with P(heads) = 0.9
1. $-\log_2 0.9 \approx 0.152$ and $-\log_2 0.1 \approx 3.322$.
2. $H = 0.9(0.152) + 0.1(3.322) \approx 0.137 + 0.332$.
3. $H \approx 0.469$ bits, less than half the uncertainty of a fair coin.
:::

:::steps Weather: sunny 1/2, cloudy 1/4, rainy 1/4, versus uniform
1. $H = \frac12(1) + \frac14(2) + \frac14(2) = 1.5$ bits.
2. Uniform over 3 outcomes: $H = \log_2 3 \approx 1.585$ bits.
3. The uneven forecast is slightly more predictable, by about 0.085 bits per day.
:::

:::mock Exam question
A loaded die shows 6 with probability $\frac12$ and each of 1–5 with probability $\frac1{10}$. Find its entropy and compare it with a fair die.
:::solution
$H = -\frac12\log_2\frac12 - 5\cdot\frac1{10}\log_2\frac1{10} = 0.5 + 0.5\log_2 10 \approx 0.5 + 0.5(3.322) = 2.161$ bits. A fair die has $\log_2 6 \approx 2.585$ bits, so loading the die removes about 0.42 bits of uncertainty per roll.
:::
:::

:::ml
- **Decision trees** pick the split that reduces label entropy the most (information gain, next lesson).
- **Prediction uncertainty:** the entropy of a classifier's output distribution flags inputs it is unsure about; active learning asks humans to label the highest-entropy examples.
- **Entropy bonuses** in reinforcement learning (for example in soft actor-critic) add $\beta H(\pi)$ to the reward so the policy keeps exploring.
- **Maximum entropy modelling:** when you know only some constraints, choose the distribution with the highest entropy that satisfies them. Softmax classifiers arise this way.
:::

:::cs
Entropy is the limit for every lossless compressor. English text has an entropy of roughly 1 to 1.5 bits per character once context is used, much less than the 8 bits per character of plain ASCII, which is why text files compress so well. Random data (already maximum entropy) can't be compressed at all.
:::

:::real
- **Word games:** a good first guess in Wordle is one whose colour feedback has the highest entropy, because it splits the remaining words most evenly and so tells you the most on average.
- **Twenty questions:** 20 well-chosen yes/no questions can distinguish $2^{20} \approx 1$ million things, so 20 bits are enough for a very large dictionary.
:::

:::quiz
? Entropy of a fair 4-sided die, in bits?
= 2
> Uniform over 4 outcomes: $\log_2 4 = 2$ bits.

? Which distribution over 3 outcomes has the highest entropy?
+ (1/3, 1/3, 1/3)
- (1/2, 1/4, 1/4)
- (1, 0, 0)
> The uniform distribution maximizes entropy; $(1, 0, 0)$ has zero entropy.

? Entropy of (1/2, 1/4, 1/4) in bits?
= 1.5|3/2
> $\frac12(1) + \frac14(2) + \frac14(2) = 1.5$ bits.

? Entropy of a uniform distribution over 32 outcomes, in bits?
= 5
> $\log_2 32 = 5$.

? A coin with P(heads) = 1 has entropy:
+ 0 bits
- 1 bit
- infinite
> There is no uncertainty, so the average surprise is $1\cdot\log_2 1 = 0$.

? Entropy of a fair coin in nats (3 decimals)?
= 0.693|ln 2
> In nats, $H = -2\cdot\frac12\ln\frac12 = \ln 2 \approx 0.693$.
:::

## Lesson: Joint entropy, conditional entropy and information gain {#joint-conditional-entropy}
@summary: Uncertainty about two variables at once, what is left after you learn one, the chain rule, and information gain.

### Why look at two variables together?
Real questions almost always involve more than one variable. Does knowing the weather help you predict whether people carry umbrellas? Does the word "free" in an email help you predict whether it is spam? Does a patient's symptom help you predict the disease? In each case there is a variable you want to know (umbrella, spam, disease) and a variable you can observe (weather, a word, a symptom). Information theory gives three tools for this: the **joint entropy** of both variables, the **conditional entropy** of one given the other, and the difference between them, the **information gain**. Decision trees, one of the most widely used machine learning models, are built entirely out of these three quantities.

### An everyday scenario
Imagine you stand at a train station and watch people come in. Let $X$ be the weather (rain or dry) and $Y$ be whether a person carries an umbrella. Over many days you record this joint table of probabilities:

| | umbrella | no umbrella | total |
|---|---|---|---|
| rain | 0.20 | 0.05 | 0.25 |
| dry | 0.15 | 0.60 | 0.75 |
| total | 0.35 | 0.65 | 1 |

The row totals give the distribution of $X$ alone, $p(\text{rain}) = 0.25$, and the column totals give $Y$ alone, $p(\text{umbrella}) = 0.35$. These totals are called **marginal** distributions, because they are written in the margins.

### Joint entropy: uncertainty about the pair
The **joint entropy** $H(X, Y)$ is just the entropy of the pair $(X, Y)$, treated as one variable with four possible values:
$$H(X, Y) = -\sum_{x}\sum_{y} p(x, y)\log_2 p(x, y).$$
For the station table, the four probabilities are 0.20, 0.05, 0.15 and 0.60. Their surprises are about 2.322, 4.322, 2.737 and 0.737 bits, so
$$H(X, Y) \approx 0.2(2.322) + 0.05(4.322) + 0.15(2.737) + 0.6(0.737) \approx 1.533 \text{ bits.}$$
The marginal entropies are $H(X) = h(0.25) \approx 0.811$ bits and $H(Y) = h(0.35) \approx 0.934$ bits. Notice that $H(X, Y) \approx 1.533$ is **less** than $H(X) + H(Y) \approx 1.745$. The two variables overlap: part of the uncertainty about umbrellas is the same uncertainty as about the weather.

:::def Joint entropy
The entropy of a pair of random variables treated as one: $H(X, Y) = -\sum_{x, y} p(x, y)\log_2 p(x, y)$.
:::

### Conditional entropy: what is left after you learn X
Now suppose someone tells you it is raining. Among rainy moments, the umbrella probabilities are $\frac{0.20}{0.25} = 0.8$ and $\frac{0.05}{0.25} = 0.2$, so your remaining uncertainty is $H(Y \mid X = \text{rain}) = h(0.8) \approx 0.722$ bits. If instead it is dry, the probabilities are $\frac{0.15}{0.75} = 0.2$ and $\frac{0.60}{0.75} = 0.8$, and again $H(Y \mid X = \text{dry}) = h(0.2) \approx 0.722$ bits.

The **conditional entropy** $H(Y \mid X)$ is the average of these remaining uncertainties, weighted by how often each value of $X$ happens:
$$H(Y \mid X) = \sum_x p(x)\,H(Y \mid X = x) = 0.25(0.722) + 0.75(0.722) \approx 0.722 \text{ bits.}$$
Before you looked at the weather, the umbrella was worth $H(Y) \approx 0.934$ bits of uncertainty. After, only 0.722 bits remain on average. Looking at the sky removed about $0.934 - 0.722 = 0.212$ bits.

:::def Conditional entropy
The average uncertainty left in $Y$ once $X$ is known: $H(Y \mid X) = \sum_x p(x)H(Y \mid X = x) = -\sum_{x, y}p(x, y)\log_2 p(y \mid x)$.
:::

### The chain rule
Here is a beautiful fact. Learning the pair $(X, Y)$ is the same as learning $X$ first and then learning $Y$ given $X$. The uncertainties add in the same way:
$$H(X, Y) = H(X) + H(Y \mid X).$$
Check it with the station: $0.811 + 0.722 = 1.533$ bits, which is exactly the joint entropy we computed directly. It works the other way too: $H(X, Y) = H(Y) + H(X \mid Y)$, so $H(X \mid Y) = 1.533 - 0.934 = 0.599$ bits. This rule comes straight from the product rule of probability, $p(x, y) = p(x)p(y \mid x)$, because the logarithm turns that product into a sum.

:::def Chain rule for entropy
$H(X, Y) = H(X) + H(Y \mid X)$: the uncertainty of a pair equals the uncertainty of the first variable plus the remaining uncertainty of the second.
:::

### Two extreme cases
If $X$ and $Y$ are **independent**, knowing $X$ tells you nothing about $Y$, so $H(Y \mid X) = H(Y)$ and the chain rule gives $H(X, Y) = H(X) + H(Y)$. Two independent fair coins have $H(X, Y) = 2$ bits.

If $Y$ is completely **determined** by $X$ (for example $Y$ is a copy of $X$), there is nothing left to learn, so $H(Y \mid X) = 0$ and $H(X, Y) = H(X)$. A fair coin and its copy have $H(X, Y) = 1$ bit, not 2.

Every real situation sits between these two. In general, $0 \le H(Y \mid X) \le H(Y)$: on average, **conditioning never increases entropy**. A single observation can make you more confused (if you learn something unexpected), but averaged over what you might observe, information never hurts.

### Information gain and decision trees
The drop in uncertainty, $H(Y) - H(Y \mid X)$, is called the **information gain** of $X$ about $Y$. For the station it was about 0.212 bits. This is how a decision tree chooses its questions. Suppose 16 emails are half spam, so the label entropy is 1 bit. Splitting on "contains the word free" gives one group of 6 emails (5 spam, 1 not) with entropy $h(\frac56) \approx 0.650$ bits and another of 10 emails (3 spam, 7 not) with entropy $h(0.3) \approx 0.881$ bits. The weighted average is $\frac{6}{16}(0.650) + \frac{10}{16}(0.881) \approx 0.795$ bits, so the information gain is about $1 - 0.795 = 0.205$ bits. The tree tries every possible split and keeps the one with the biggest gain.

:::def Information gain
The reduction in entropy of a target $Y$ from learning a feature $X$: $IG = H(Y) - H(Y \mid X)$. Decision trees choose splits that maximize it. It equals the mutual information $I(X; Y)$.
:::

:::warn Common mistakes
- $H(Y \mid X)$ is an **average** over $x$, not the entropy for one particular $x$. Always weight by $p(x)$.
- $H(Y \mid X)$ and $H(X \mid Y)$ are usually different numbers (0.722 versus 0.599 at the station).
- Joint entropy is not the sum of the marginal entropies unless the variables are independent.
- In decision trees, weight each child's entropy by the fraction of examples that go to that child, not by one half.
:::

### Summary
Joint entropy is the uncertainty of a pair, conditional entropy is the uncertainty left in one variable after learning the other, and the chain rule $H(X, Y) = H(X) + H(Y \mid X)$ ties them together. Conditioning reduces entropy on average, and the size of the reduction, the information gain, is what decision trees maximize. In the mutual information lesson the same gain gets its own name.

@viz g07-joint | Change the four joint probabilities and watch the entropy bars overlap.

:::explore
**What to try**
1. Click **independent**. The orange $H(Y)$ bar starts exactly where the purple $H(X)$ bar ends, so there is no green overlap and $H(X, Y) = H(X) + H(Y)$.
2. Click **Y is a copy of X**. The two bars lie on top of each other, $H(Y \mid X) = 0$, and the joint bar is only 1 bit long.
3. Click **noisy copy** and read $H(Y \mid X)$: some uncertainty remains, about 0.469 bits.
4. Recreate the station table with sliders 0.20, 0.05, 0.15, 0.60 and check $H(X, Y) \approx 1.533$, $H(Y \mid X) \approx 0.722$ and $H(X \mid Y) \approx 0.599$.

**What to notice:** the grey bar is always the purple bar plus the part of the orange bar that sticks out to the right. That stick-out length is $H(Y \mid X)$, which is the chain rule drawn as lengths. The overlap is the information gain.
:::

:::formulas
$$H(X, Y) = -\sum_{x, y}p(x, y)\log_2 p(x, y)$$
$$H(Y \mid X) = \sum_x p(x)H(Y \mid X = x)$$
$$H(X, Y) = H(X) + H(Y \mid X) = H(Y) + H(X \mid Y)$$
$$0 \le H(Y \mid X) \le H(Y)$$
$$IG = H(Y) - H(Y \mid X)$$
:::

:::thm Chain rule for entropy
For any random variables, $H(X, Y) = H(X) + H(Y \mid X)$. More generally, $H(X_1, \dots, X_n) = \sum_{i} H(X_i \mid X_1, \dots, X_{i-1})$.
:::

:::proof
By the product rule, $p(x, y) = p(x)p(y \mid x)$, so $-\log_2 p(x, y) = -\log_2 p(x) - \log_2 p(y \mid x)$. Take the expectation over $p(x, y)$ on both sides. The left side becomes $H(X, Y)$. The first term on the right becomes $-\sum_x p(x)\log_2 p(x) = H(X)$, and the second becomes $-\sum_{x, y}p(x, y)\log_2 p(y \mid x) = H(Y \mid X)$. Applying the same argument repeatedly gives the version for $n$ variables.
:::

:::thm Conditioning reduces entropy
$H(Y \mid X) \le H(Y)$, with equality exactly when $X$ and $Y$ are independent.
:::

:::proof
$H(Y) - H(Y \mid X) = \sum_{x, y}p(x, y)\log_2\frac{p(x, y)}{p(x)p(y)}$, which is the KL divergence between $p(x, y)$ and $p(x)p(y)$. KL divergence is never negative and is zero only when the two distributions are equal (proved in the KL lesson), that is, when $p(x, y) = p(x)p(y)$ for all $x, y$.
:::

:::steps Station table: find H(Y), H(Y | X) and the information gain
1. $p(\text{umbrella}) = 0.35$, so $H(Y) = h(0.35) \approx 0.35(1.515) + 0.65(0.621) \approx 0.934$ bits.
2. Given rain: $p(\text{umbrella} \mid \text{rain}) = 0.8$, entropy $h(0.8) \approx 0.722$. Given dry: $0.2$, entropy $h(0.2) \approx 0.722$.
3. $H(Y \mid X) = 0.25(0.722) + 0.75(0.722) = 0.722$ bits.
4. Information gain $= 0.934 - 0.722 \approx 0.212$ bits.
:::

:::steps Decision tree split: 16 emails, 8 spam
1. Parent entropy: $h(\frac12) = 1$ bit.
2. Left child (contains "free"): 6 emails, 5 spam. $h(\frac56) = \frac56(0.263) + \frac16(2.585) \approx 0.650$ bits.
3. Right child: 10 emails, 3 spam. $h(0.3) \approx 0.3(1.737) + 0.7(0.515) \approx 0.881$ bits.
4. Weighted child entropy: $\frac{6}{16}(0.650) + \frac{10}{16}(0.881) \approx 0.244 + 0.551 = 0.795$ bits.
5. Information gain $\approx 1 - 0.795 = 0.205$ bits.
:::

:::steps Use the chain rule: H(X) = 1.5 and H(Y | X) = 0.5
1. $H(X, Y) = H(X) + H(Y \mid X) = 1.5 + 0.5 = 2$ bits.
2. If also $H(Y) = 1.2$, then $H(X \mid Y) = H(X, Y) - H(Y) = 0.8$ bits.
:::

:::mock Exam question
$X$ is a fair bit. $Y$ equals $X$ with probability 0.9 and is flipped with probability 0.1. Find $H(Y)$, $H(Y \mid X)$, $H(X, Y)$ and the information gain about $Y$ from $X$.
:::solution
By symmetry $Y$ is also a fair bit, so $H(Y) = 1$. Whatever $X$ is, $Y$ is "correct with probability 0.9", so $H(Y \mid X) = h(0.1) \approx 0.469$ bits. The chain rule gives $H(X, Y) = H(X) + H(Y \mid X) = 1 + 0.469 = 1.469$ bits. The information gain is $1 - 0.469 = 0.531$ bits.
:::
:::

:::ml
- **Decision trees and random forests** (ID3, C4.5, and scikit-learn with `criterion="entropy"`) split on the feature with the highest information gain. Gradient-boosted trees use similar impurity reductions.
- **Language models** use the chain rule directly: the entropy of a sentence is the sum of the conditional entropies of each token given the previous ones, which is why models are trained to predict one next token at a time.
:::

:::cs
Compressors that use context (like the PPM family and modern neural compressors) code each symbol using $p(\text{next} \mid \text{context})$. Their cost per symbol is the conditional entropy $H(X_t \mid X_{<t})$, which is much smaller than $H(X_t)$ for text.
:::

:::real
A doctor ordering tests is maximizing information gain: the best next test is the one whose result most reduces uncertainty about the diagnosis, averaged over the possible results. A test whose result you can already predict has nearly zero gain, however expensive it is.
:::

:::quiz
? X and Y are independent fair coins. What is H(X, Y) in bits?
= 2
> Independent, so $H(X, Y) = H(X) + H(Y) = 1 + 1$.

? Y is an exact copy of a fair coin X. What is H(X, Y)?
= 1
> $H(Y \mid X) = 0$ because $Y$ is determined, so $H(X, Y) = H(X) = 1$.

? H(X) = 1.5 bits and H(Y | X) = 0.5 bits. Find H(X, Y).
= 2
> Chain rule: $1.5 + 0.5 = 2$ bits.

? Can H(Y | X) be larger than H(Y)?
- Yes, often
+ No, conditioning never increases entropy on average
- Only when X and Y are independent
> $H(Y \mid X) \le H(Y)$ always, with equality exactly when they are independent.

? A parent node has entropy 1 bit; after a split the weighted child entropy is 0.6 bits. What is the information gain?
= 0.4|2/5
> $IG = 1 - 0.6 = 0.4$ bits.

? If Y is a deterministic function of X, then H(Y | X) =
= 0
> Once you know $X$ you know $Y$ exactly, so no uncertainty remains.
:::

## Lesson: Codes and compression {#source-coding}
@summary: Prefix codes, the Kraft inequality, Huffman coding and Shannon's source coding theorem.

### Why compression is an information question
Every file on your computer is a long string of symbols, and storing or sending it costs bits. If some symbols appear much more often than others, you can save space by giving them shorter codes. This is the idea behind ZIP files, PNG images, the MP3 and JPEG formats, and even Morse code. Information theory tells us exactly how much saving is possible: on average, no lossless code can use fewer bits per symbol than the entropy of the source. This lesson builds the codes that come close to that limit.

### An everyday scenario
Imagine you send weather reports from a mountain station using only 0s and 1s. There are four reports: Sunny (half of all days), Cloudy (a quarter), Rain (an eighth) and Snow (an eighth). The obvious plan is a **fixed-length code** with 2 bits each: Sunny `00`, Cloudy `01`, Rain `10`, Snow `11`. That costs exactly 2 bits per report.

Now try a **variable-length code**: Sunny `0`, Cloudy `10`, Rain `110`, Snow `111`. Sunny reports cost only 1 bit, and they are the most common. The average cost is
$$\tfrac12(1) + \tfrac14(2) + \tfrac18(3) + \tfrac18(3) = 1.75 \text{ bits per report,}$$
which saves 12.5%. A year of 1000 reports needs about 1750 bits instead of 2000. And 1.75 bits is exactly the entropy of this distribution, so no code can do better.

### Decoding without commas: prefix codes
Variable-length codes have a danger. Suppose we used A = `0`, B = `01`, C = `10`. The message `010` could mean A then C, or B then A. We can't tell where one codeword ends and the next begins. The fix is to use a **prefix code** (also called prefix-free or instantaneous): no codeword is the beginning of another. In our weather code, `0` is not the start of `10`, `110` or `111`, and `10` is not the start of `110` or `111`. So when the decoder reads `0`, it knows instantly that the report was Sunny. Reading `110100` gives Rain, Cloudy, Sunny with no ambiguity.

A prefix code is the same thing as a binary tree. Start at the root; a `0` means "go left" and a `1` means "go right". Each codeword is the path to a **leaf**. Because codewords are leaves, no codeword can lie on the path to another, which is exactly the prefix property.

:::def Prefix code
A code in which no codeword is a prefix (beginning) of any other codeword. It can be decoded symbol by symbol with no separators, and its codewords are the leaves of a binary tree.
:::

### How short can codewords be? The Kraft inequality
You can't make every codeword short. With only 1-bit codewords there are just two: `0` and `1`. A rule called the **Kraft inequality** says exactly which lengths are possible. A prefix code with lengths $\ell_1, \ell_2, \dots, \ell_n$ exists if and only if
$$\sum_{i=1}^n 2^{-\ell_i} \le 1.$$
Think of $2^{-\ell}$ as the "budget" a codeword uses: a 1-bit codeword uses half of all possible binary strings (all strings starting with `0`), a 2-bit codeword uses a quarter, and so on. The total budget is 1. Our weather code uses $\frac12 + \frac14 + \frac18 + \frac18 = 1$, the whole budget. Lengths $(1, 1, 2)$ would need $\frac12 + \frac12 + \frac14 = 1.25 > 1$, so no prefix code has those lengths.

:::def Kraft inequality
Lengths $\ell_1, \dots, \ell_n$ can be the codeword lengths of a binary prefix code exactly when $\sum_i 2^{-\ell_i} \le 1$.
:::

### The ideal length is the surprise
Which lengths minimize the average $\sum_i p_i\ell_i$ subject to the Kraft budget? The answer is $\ell_i = -\log_2 p_i$, the surprise of the symbol. Common symbols get short codes and rare symbols long ones, in exactly the amounts that information theory predicts. Plugging these lengths in gives an average of $\sum_i p_i(-\log_2 p_i) = H$, the entropy. When the probabilities are powers of $\frac12$, as in the weather example, these ideal lengths are whole numbers and we hit the entropy exactly. Otherwise we must round up, using $\ell_i = \lceil -\log_2 p_i\rceil$, which costs less than 1 extra bit per symbol.

### Huffman's algorithm
In 1952 David Huffman, then a student, found a simple procedure that builds the best possible prefix code for any list of probabilities:

1. Write each symbol as a tiny tree with its probability.
2. Take the two trees with the **smallest** probabilities and join them under a new node whose probability is their sum.
3. Repeat until only one tree is left.
4. Label every left branch `0` and every right branch `1`; each symbol's code is its path from the root.

Try it on probabilities A 0.4, B 0.2, C 0.2, D 0.1, E 0.1. Join D and E into a node of 0.2. Now the smallest are three nodes of 0.2; join two of them into 0.4. Then join the remaining 0.2 with a 0.4 to make 0.6, and finally 0.6 with 0.4 to make 1. One valid outcome gives lengths A 1, B 2, C 3, D 4, E 4, with average length $0.4 + 0.4 + 0.6 + 0.4 + 0.4 = 2.2$ bits. The entropy is about 2.122 bits, so Huffman is within 0.08 bits of the limit, and far better than the 3 bits a fixed-length code needs for 5 symbols.

:::def Huffman code
The optimal prefix code for known symbol probabilities, built by repeatedly merging the two least likely symbols or subtrees. Its average length $\bar L$ satisfies $H \le \bar L < H + 1$.
:::

### Getting even closer: coding blocks
The "less than 1 extra bit" can hurt when a source is very predictable. A coin with $p = 0.9$ has entropy 0.469 bits, but any code must use at least 1 bit per single flip. The fix is to code **blocks** of symbols together: pairs of flips have four outcomes, and coding them costs less than 1 extra bit per pair, which is less than half a bit per flip. With longer blocks the overhead per symbol shrinks toward zero, and the average approaches $H$. Modern **arithmetic coding** achieves this effect smoothly and gets within a tiny fraction of a bit of the entropy for the whole message.

:::warn Common mistakes
- Huffman needs the **two smallest** at every step, including merged nodes. Don't merge in the original order.
- Ties can give different trees with different individual lengths, but every Huffman tree has the same average length.
- A code that is not prefix-free can be impossible to decode even if every codeword is distinct.
- Compression works only on average. Some individual messages always get longer, and already-random data can't be compressed at all.
:::

### Summary
A prefix code can be decoded without separators and corresponds to a binary tree. The Kraft inequality $\sum 2^{-\ell_i} \le 1$ limits how short the codewords can be. The ideal length of a symbol is its surprise $-\log_2 p$, which makes the average length equal to the entropy. Huffman's algorithm gives the best prefix code, within 1 bit of $H$, and coding long blocks gets as close to $H$ as you like. That is Shannon's source coding theorem.

@viz g07-huffman | Move the weight sliders and watch Huffman rebuild the tree.

:::explore
**What to try**
1. Click **powers of 1/2**. The average length equals the entropy exactly (100% efficiency), because every ideal length $-\log_2 p$ is a whole number.
2. Click **skewed** and check the article: average length 2.2 bits, entropy about 2.122 bits.
3. Click **uniform**. With 5 equal symbols the codes have lengths 2 or 3, average 2.4 bits, against an entropy of $\log_2 5 \approx 2.32$.
4. Click **one dominant**. Entropy falls to about 0.65 bits but the average stays above 1 bit, because every symbol needs at least 1 bit.

**What to notice:** the surprise column and the length column track each other. Huffman lengths are whole-number roundings of the surprise, and the average always lands in the window $H \le \bar L < H + 1$. Case 4 shows why block coding is needed for very predictable sources.
:::

:::formulas
$$\bar L = \sum_i p_i\ell_i$$
$$\sum_i 2^{-\ell_i} \le 1 \quad\text{(Kraft)}$$
$$\ell_i^{\ast} = -\log_2 p_i,\qquad \ell_i = \lceil -\log_2 p_i\rceil$$
$$H(X) \le \bar L_{\text{Huffman}} < H(X) + 1$$
:::

:::thm Shannon's source coding theorem
For any prefix code, the average length satisfies $\bar L \ge H(X)$. There is a prefix code with $\bar L < H(X) + 1$, and by coding blocks of $k$ symbols the average per symbol can be made less than $H(X) + \frac1k$.
:::

:::proof
Lower bound: let $Z = \sum_i 2^{-\ell_i} \le 1$ and define the distribution $q_i = 2^{-\ell_i}/Z$. Then
$$\bar L - H = \sum_i p_i\ell_i + \sum_i p_i\log_2 p_i = \sum_i p_i\log_2\frac{p_i}{2^{-\ell_i}} = \sum_i p_i\log_2\frac{p_i}{q_i} - \log_2 Z.$$
The first sum is a KL divergence, which is $\ge 0$, and $-\log_2 Z \ge 0$ because $Z \le 1$. So $\bar L \ge H$. Upper bound: choose $\ell_i = \lceil -\log_2 p_i\rceil$. Then $2^{-\ell_i} \le p_i$, so the Kraft sum is at most $\sum p_i = 1$ and the code exists. Since $\ell_i < -\log_2 p_i + 1$, we get $\bar L < H + 1$. Applying this to blocks of $k$ symbols, whose entropy is $kH$, gives less than $kH + 1$ bits per block, or $H + \frac1k$ per symbol.
:::

:::thm Kraft inequality
A binary prefix code with lengths $\ell_1, \dots, \ell_n$ exists if and only if $\sum_i 2^{-\ell_i} \le 1$.
:::

:::proof
Let $\ell_{\max}$ be the longest length. A codeword of length $\ell$ is a prefix of exactly $2^{\ell_{\max} - \ell}$ of the $2^{\ell_{\max}}$ strings of length $\ell_{\max}$. In a prefix code these sets don't overlap, so $\sum_i 2^{\ell_{\max} - \ell_i} \le 2^{\ell_{\max}}$; divide by $2^{\ell_{\max}}$. Conversely, if the inequality holds, assign codewords in order of increasing length, each time taking the leftmost unused node at the right depth; the budget guarantees you never run out.
:::

:::steps Build a Huffman code for A 0.4, B 0.2, C 0.2, D 0.1, E 0.1
1. Merge the two smallest, D and E: new node 0.2. Remaining: 0.4, 0.2, 0.2, 0.2.
2. Merge two of the 0.2s (say C and DE): node 0.4. Remaining: 0.4, 0.4, 0.2.
3. Merge 0.2 (B) with a 0.4 (C, DE): node 0.6. Remaining: 0.6, 0.4.
4. Merge the last two: root 1.0. Reading paths gives A `0`, B `10`, C `110`, D `1110`, E `1111`.
5. Average length $= 0.4(1) + 0.2(2) + 0.2(3) + 0.1(4) + 0.1(4) = 2.2$ bits. Entropy $\approx 2.122$ bits.
:::

:::steps Which length lists can a prefix code have: (1, 2, 3, 3) and (1, 1, 2)?
1. $(1, 2, 3, 3)$: $\frac12 + \frac14 + \frac18 + \frac18 = 1 \le 1$. Possible, for example `0`, `10`, `110`, `111`.
2. $(1, 1, 2)$: $\frac12 + \frac12 + \frac14 = 1.25 > 1$. Impossible: the two 1-bit codewords use up every string.
:::

:::steps How big is a 1000-symbol file from (1/2, 1/4, 1/8, 1/8)?
1. Fixed-length code: 2 bits each, so 2000 bits.
2. Huffman code `0`, `10`, `110`, `111`: 1.75 bits each on average, so about 1750 bits.
3. Entropy is 1.75 bits, so 1750 bits is the best any lossless code can do on average.
:::

:::mock Exam question
A source emits A, B, C with probabilities 0.5, 0.3, 0.2. Build a Huffman code, find its average length, and compare it with the entropy.
:::solution
Merge the two smallest, C (0.2) and B (0.3), into 0.5, then merge with A. Codes: A `0`, B `10`, C `11`. Average length $= 0.5(1) + 0.3(2) + 0.2(2) = 1.5$ bits. Entropy $= 0.5(1) + 0.3\log_2\frac1{0.3} + 0.2\log_2\frac1{0.2} \approx 0.5 + 0.521 + 0.464 = 1.485$ bits. Efficiency $\approx 1.485/1.5 = 99\%$.
:::
:::

:::ml
- **Prediction is compression.** A model that assigns probability $q$ to the next symbol can be turned, via arithmetic coding, into a compressor using about $-\log_2 q$ bits for it. Lower cross-entropy loss literally means better compression; large language models compress text better than ZIP.
- **Tokenizers** such as byte-pair encoding (BPE) are compression algorithms: they repeatedly merge the most frequent pair of symbols, much like Huffman merges the least frequent.
- **Minimum description length:** the best model is the one that gives the shortest total description of model plus data, a principled guard against overfitting.
:::

:::cs
ZIP and gzip use DEFLATE, which finds repeated substrings (LZ77) and then Huffman-codes the result. JPEG and MP3 Huffman-code their quantized coefficients, and PNG uses DEFLATE. Video codecs use arithmetic coding (CABAC) to get closer to the entropy.
:::

:::real
Morse code is a hand-made variable-length code: E, the most common English letter, is a single dot, while rare letters like Q get four symbols. Samuel Morse reportedly estimated letter frequencies by counting the type in a printer's case. (Morse is not prefix-free on its own; it relies on pauses between letters as separators.)
:::

:::quiz
? A fixed-length binary code for 8 equally likely symbols needs how many bits per symbol?
= 3
> $2^3 = 8$ codewords of length 3, which also equals the entropy $\log_2 8$.

? Is {0, 01, 11} a prefix code?
- Yes
+ No
> `0` is the beginning of `01`, so a decoder reading `0` can't tell whether the symbol is finished.

? What is the Kraft sum for codeword lengths (2, 2, 2, 2)?
= 1
> $4 \times 2^{-2} = 1$. The four 2-bit codewords use the whole budget.

? Code A = 0, B = 10, C = 11 with probabilities 0.5, 0.25, 0.25. Average length in bits?
= 1.5|3/2
> $0.5(1) + 0.25(2) + 0.25(2) = 1.5$, which equals the entropy, so the code is optimal.

? Can a Huffman code have average length below the entropy?
- Yes, for skewed sources
+ No, H is a lower bound for every lossless prefix code
- Only for uniform sources
> Shannon's source coding theorem: $\bar L \ge H$ for every prefix code.

? A source has entropy 2.3 bits. The Huffman average length must lie in which range?
+ From 2.3 up to (but not including) 3.3 bits
- Exactly 2.3 bits
- Below 2.3 bits
> $H \le \bar L < H + 1$.
:::

# Unit: Comparing distributions

## Lesson: Cross-entropy {#cross-entropy}
@summary: The average surprise when reality is p but you believe q, and why it is the standard classification loss.

### Why we need a second distribution
Entropy measures the uncertainty of the true distribution $p$. But in practice we never know $p$ exactly. A weather app, a spam filter or a neural network only has a **model** $q$, its best guess at the probabilities. The natural question is: how good is that guess? If we use $q$ to anticipate outcomes that actually come from $p$, how surprised will we be on average? That average is the **cross-entropy**, and it is the loss function behind almost every classifier and language model in use today.

### An everyday scenario
Imagine a tourist arrives in a city and assumes the weather is like at home: sunny, cloudy and rainy each one third of the time. In reality this city is sunny half the time and cloudy or rainy a quarter each, so $p = (\frac12, \frac14, \frac14)$ and the tourist's belief is $q = (\frac13, \frac13, \frac13)$. Every morning the tourist feels a surprise of $-\log_2 q(\text{weather}) = \log_2 3 \approx 1.585$ bits, whatever the weather. A local who knows the true $p$ feels on average only $H(p) = 1.5$ bits. The tourist pays an extra $0.085$ bits per day for holding the wrong belief.

### The definition
The **cross-entropy** of $q$ relative to $p$ is the expected surprise under $q$ when outcomes are drawn from $p$:
$$H(p, q) = -\sum_x p(x)\log q(x).$$
The weights $p(x)$ come from reality (how often each outcome really happens), and the surprises $-\log q(x)$ come from the model. Compare entropy, $H(p) = -\sum p\log p$, where both come from $p$. When the model is perfect, $q = p$ and the cross-entropy equals the entropy.

In coding language, $H(p, q)$ is the average length of a code designed for $q$ (lengths $-\log_2 q(x)$) but used on data from $p$. A code built for the wrong distribution wastes bits.

:::def Cross-entropy
$H(p, q) = -\sum_x p(x)\log q(x)$: the average surprise, or code length, when outcomes follow $p$ but probabilities are taken from the model $q$.
:::

### Cross-entropy is never smaller than entropy
A key fact, called **Gibbs' inequality**, is that
$$H(p, q) \ge H(p),$$
with equality only when $q = p$. You can never do better on average than knowing the truth. The gap $H(p, q) - H(p)$ is the KL divergence of the next lesson, the exact price of a wrong belief. For the tourist, the gap is $1.585 - 1.5 = 0.085$ bits.

### Cross-entropy as a classification loss
Now the big application. A classifier sees an image and outputs probabilities over classes, for example $q = (0.7, 0.2, 0.1)$ for (cat, dog, bird). The true label is "cat". We write the truth as a **one-hot** distribution $p = (1, 0, 0)$: all probability on the correct class. Then every term of the cross-entropy except the true class vanishes:
$$H(p, q) = -1\cdot\log q(\text{cat}) = -\ln 0.7 \approx 0.357 \text{ nats.}$$
So the cross-entropy loss is simply **minus the log of the probability the model gave to the right answer**. If the model had given the cat only 0.1, the loss would be $-\ln 0.1 \approx 2.303$ nats. If it had given 0.99, the loss would be about 0.010. The loss rewards confidence when you are right and punishes confidence when you are wrong; as $q(\text{true}) \to 0$ the loss goes to infinity.

Averaged over a dataset of $N$ examples, the loss is $-\frac1N\sum_i \log q(y_i \mid x_i)$, the **negative log-likelihood** per example. So minimizing cross-entropy is the same as **maximum likelihood estimation**: choose model parameters that make the observed labels as probable as possible.

:::def Cross-entropy loss
For a classifier with predicted probabilities $q$ and true class $y$: $L = -\log q_y$. Averaged over the data, it is the negative log-likelihood.
:::

### The binary case
For yes/no problems the model outputs one probability $\hat y = P(\text{class } 1)$, usually from a sigmoid. With true label $y \in \{0, 1\}$ the cross-entropy is the **binary cross-entropy**
$$L = -\big[y\log\hat y + (1 - y)\log(1 - \hat y)\big].$$
Only one of the two terms is "switched on": if $y = 1$ the loss is $-\log\hat y$, and if $y = 0$ it is $-\log(1 - \hat y)$. A model that always says $\hat y = 0.5$ pays $\ln 2 \approx 0.693$ nats per example, which is why 0.693 is the loss you see at the start of training a binary classifier.

### Why softmax and cross-entropy go together
Neural networks produce raw scores $z_i$ (logits), which softmax turns into probabilities $q_i = e^{z_i}/\sum_j e^{z_j}$. When you combine softmax with cross-entropy, the gradient of the loss with respect to each logit is astonishingly simple:
$$\frac{\partial L}{\partial z_i} = q_i - p_i.$$
The gradient is "prediction minus truth". It is large when the model is confidently wrong and shrinks to zero as the prediction approaches the target. This clean gradient is a big reason cross-entropy trains much better than, say, squared error on probabilities.

### Perplexity
Language models report **perplexity**, the exponential of the cross-entropy: $2^{H}$ if $H$ is in bits, or $e^{H}$ if in nats. A perplexity of 8 means the model is, on average, as uncertain as if it were choosing uniformly among 8 tokens. Lower is better, and a perfect model would reach the true entropy of the language.

:::warn Common mistakes
- Order matters: $H(p, q)$ uses $p$ for the weights and $q$ inside the log. $H(q, p)$ is a different number.
- Never feed a probability of exactly 0 into the log. Frameworks compute cross-entropy from logits (for example `log_softmax`) to stay numerically safe.
- Cross-entropy loss is not "accuracy". A model can be right on every example and still have high loss if it is barely confident.
- Losses printed by PyTorch or TensorFlow are in nats, not bits.
:::

### Summary
Cross-entropy $H(p, q) = -\sum p\log q$ is the average surprise when reality is $p$ and your model is $q$. It is always at least the entropy, with equality only for a perfect model. With one-hot labels it reduces to $-\log q(\text{true class})$, the standard classification loss, which is the same as maximum likelihood. Its gradient with softmax is simply prediction minus truth.

@viz entropy | Set p, then move the q bars and watch H(p, q) rise above H(p).

:::explore
**What to try**
1. Make the q sliders match the p sliders exactly. The cross-entropy equals the entropy and KL reads 0.
2. Set p to (0.5, 0.25, 0.125, 0.125) and q uniform: $H(p) = 1.75$ and $H(p, q) = 2$ bits.
3. Make p1 large, then shrink q1 toward 0.01. Watch the cross-entropy shoot up: the model is confidently wrong about the most common outcome.
4. Imitate a one-hot label: put p1 at 1 and the other p sliders at 0.01, then raise q1 and see the loss fall.

**What to notice:** no setting of q ever makes $H(p, q)$ smaller than $H(p)$, which is Gibbs' inequality. Step 4 shows the classification case: the loss depends almost only on q of the true class.
:::

@viz sigmoid | Move the logits and the temperature; the softmax bars are the q a classifier would output.

:::explore
**What to try**
1. Treat class 1 (pink) as the true class. Raise $z_1$ and watch its softmax probability rise; the loss $-\ln q_1$ falls.
2. Lower the temperature T toward 0.1: probabilities become nearly one-hot, so a right answer gets near-zero loss but a wrong one gets a huge loss.
3. Raise T toward 5: everything flattens toward uniform and the loss approaches $\ln 4 \approx 1.386$.

**What to notice:** logits only matter through their differences, and confidence is a double-edged sword under cross-entropy. That is why techniques like label smoothing and temperature scaling exist.
:::

:::formulas
$$H(p, q) = -\sum_x p(x)\log q(x)$$
$$H(p, q) \ge H(p),\quad H(p, q) = H(p) + D_{KL}(p\,\|\,q)$$
$$L_{\text{CE}} = -\log q_y,\qquad L_{\text{BCE}} = -[y\log\hat y + (1-y)\log(1-\hat y)]$$
$$\frac{\partial L}{\partial z_i} = q_i - p_i \quad\text{(softmax + cross-entropy)}$$
$$\text{perplexity} = 2^{H_{\text{bits}}} = e^{H_{\text{nats}}}$$
:::

:::thm Gibbs' inequality
For distributions $p$ and $q$ on the same outcomes, $H(p, q) \ge H(p)$, with equality if and only if $q = p$.
:::

:::proof
Use natural logs and the inequality $\ln t \le t - 1$ (equality only at $t = 1$). Summing over outcomes with $p(x) > 0$,
$$H(p) - H(p, q) = \sum_x p(x)\ln\frac{q(x)}{p(x)} \le \sum_x p(x)\Big(\frac{q(x)}{p(x)} - 1\Big) = \sum_x q(x) - \sum_x p(x) \le 1 - 1 = 0.$$
Equality needs $q(x)/p(x) = 1$ for every $x$, so $q = p$.
:::

:::thm Gradient of softmax cross-entropy
If $q = \text{softmax}(z)$ and $L = -\sum_i p_i\ln q_i$ with $\sum_i p_i = 1$, then $\frac{\partial L}{\partial z_k} = q_k - p_k$.
:::

:::proof
$\ln q_i = z_i - \ln\sum_j e^{z_j}$, so $L = -\sum_i p_i z_i + \ln\sum_j e^{z_j}$ (using $\sum p_i = 1$). Differentiating, $\frac{\partial L}{\partial z_k} = -p_k + \frac{e^{z_k}}{\sum_j e^{z_j}} = q_k - p_k$.
:::

:::steps Predicted (0.7, 0.2, 0.1), true class 1
1. One-hot truth $p = (1, 0, 0)$, so $L = -\ln q_1 = -\ln 0.7 \approx 0.357$ nats.
2. If the model had said 0.1 for the true class: $-\ln 0.1 \approx 2.303$ nats.
3. Confident mistakes are punished heavily: the loss grows without bound as $q_1 \to 0$.
:::

:::steps Binary cross-entropy for labels (1, 0, 1) and predictions (0.9, 0.2, 0.6)
1. Example 1, $y = 1$: $-\ln 0.9 \approx 0.105$.
2. Example 2, $y = 0$: $-\ln(1 - 0.2) = -\ln 0.8 \approx 0.223$.
3. Example 3, $y = 1$: $-\ln 0.6 \approx 0.511$.
4. Mean loss $= (0.105 + 0.223 + 0.511)/3 \approx 0.280$ nats.
:::

:::steps Softmax of logits (2, 1, 0) with true class 1: loss and gradient
1. $e^2 \approx 7.389$, $e^1 \approx 2.718$, $e^0 = 1$; total $\approx 11.107$.
2. $q \approx (0.665, 0.245, 0.090)$.
3. Loss $= -\ln 0.665 \approx 0.408$ nats.
4. Gradient $q - p \approx (0.665 - 1, 0.245, 0.090) = (-0.335, 0.245, 0.090)$. Gradient descent raises $z_1$ and lowers the others.
:::

:::mock Exam question
A language model has an average cross-entropy of 3 bits per token on test text. (a) What is its perplexity? (b) After training longer the loss drops to 2.5 bits per token. What is the new perplexity, and what does it mean?
:::solution
(a) Perplexity $= 2^3 = 8$: on average the model is as unsure as a uniform choice among 8 tokens. (b) $2^{2.5} = 4\sqrt2 \approx 5.66$. The model now behaves as if choosing among about 5.7 equally likely tokens. Half a bit less per token shrinks the effective number of choices by a factor of $2^{0.5} \approx 1.41$.
:::
:::

:::ml
- **Classification:** `nn.CrossEntropyLoss` in PyTorch takes logits and true class indices and computes $-\log\text{softmax}(z)_y$ averaged over the batch.
- **Language models** are trained to minimize next-token cross-entropy, and evaluated by perplexity.
- **Label smoothing** replaces the one-hot $p$ with, say, 0.9 on the true class and the remaining 0.1 spread over the others, so the model is never pushed toward infinite confidence.
- **Knowledge distillation** trains a small student on the soft probabilities of a large teacher, using cross-entropy with a non-one-hot $p$.
:::

:::cs
Cross-entropy is the cost of compressing data with the wrong model. If a compressor's model is $q$ but the data follows $p$, it spends $H(p, q)$ bits per symbol instead of the optimal $H(p)$. Better predictive models therefore make better compressors.
:::

:::real
Weather services and forecasting competitions score probabilistic forecasts with the **log score**, which is cross-entropy: you are charged $-\log q$ of what actually happened. A forecaster who says "0% chance of rain" on a rainy day gets an infinite penalty, which encourages honest, calibrated probabilities.
:::

:::quiz
? Cross-entropy loss (natural log) when the true class gets probability 1?
= 0
> $-\ln 1 = 0$: a perfect, confident prediction has zero loss.

? A 4-class model outputs the uniform distribution. What is its cross-entropy loss in nats (3 decimals)?
= 1.386|ln 4
> $-\ln\frac14 = \ln 4 \approx 1.386$ for any true class.

? Binary cross-entropy for y = 1 and prediction 0.5, in nats (3 decimals)?
= 0.693|ln 2
> $-\ln 0.5 = \ln 2 \approx 0.693$.

? Which prediction for the true class gives the largest loss?
- 0.9
- 0.5
+ 0.01
> $-\ln 0.01 \approx 4.6$, far more than $-\ln 0.5 \approx 0.69$ or $-\ln 0.9 \approx 0.11$.

? Average cross-entropy is 2 bits per token. What is the perplexity?
= 4
> $2^2 = 4$.

? Which is always true?
+ $H(p, q) \ge H(p)$
- $H(p, q) = H(q, p)$
- $H(p, q) \le H(p)$
> Gibbs' inequality. Cross-entropy is not symmetric in general.
:::

## Lesson: KL divergence {#kl}
@summary: The extra cost of using q instead of p, why it is never negative, and why it is not symmetric.

### Measuring how wrong a belief is
Cross-entropy told us the total surprise of using a model $q$ when reality is $p$. Part of that surprise is unavoidable: even a perfect model feels the entropy $H(p)$. What we really want to measure is the **extra** surprise caused by the model being wrong. That extra is the **Kullback–Leibler divergence**, or KL divergence, named after Solomon Kullback and Richard Leibler who introduced it in 1951. It is the most common way to measure how different two probability distributions are, and it appears in variational autoencoders, reinforcement learning from human feedback, knowledge distillation and Bayesian inference.

### An everyday scenario
Imagine a coin that is perfectly fair, $p = (\frac12, \frac12)$, but a gambler believes it lands heads 90% of the time, $q = (0.9, 0.1)$. Each time tails comes up, the gambler is very surprised: $-\log_2 0.1 \approx 3.32$ bits instead of the 1 bit a correct believer would feel. Each time heads comes up, the gambler is a little less surprised than necessary: $-\log_2 0.9 \approx 0.15$ bits instead of 1. On average the gambler feels $\frac12(0.152) + \frac12(3.322) \approx 1.737$ bits of surprise per flip, compared with $H(p) = 1$ bit. The difference, about $0.737$ bits per flip, is the KL divergence. It is the price of the wrong belief.

### The definition
$$D_{KL}(p\,\|\,q) = \sum_x p(x)\log\frac{p(x)}{q(x)} = H(p, q) - H(p).$$
Read the double bar as "from $q$ to $p$" or "of $q$ relative to $p$": the expectation is always taken under $p$, the distribution we treat as the truth. Each term compares the two probabilities through the log-ratio $\log\frac{p(x)}{q(x)}$, which is positive where the model underestimates and negative where it overestimates. The weighted sum always comes out non-negative.

Let's verify the gambler: $D_{KL}(p\,\|\,q) = \frac12\log_2\frac{0.5}{0.9} + \frac12\log_2\frac{0.5}{0.1} \approx \frac12(-0.848) + \frac12(2.322) = 0.737$ bits. Same answer as the cross-entropy route.

:::def KL divergence
$D_{KL}(p\,\|\,q) = \sum_x p(x)\log\frac{p(x)}{q(x)}$: the expected extra surprise (or extra code length) from using $q$ when the truth is $p$. Also called relative entropy.
:::

### KL is never negative
By Gibbs' inequality from the previous lesson, $H(p, q) \ge H(p)$, so
$$D_{KL}(p\,\|\,q) \ge 0,$$
with equality exactly when $p = q$. This makes KL behave like a measure of distance: zero when the distributions agree, positive otherwise, and larger when they differ more.

### KL is not symmetric
But KL is **not** a true distance, because swapping the arguments usually changes the answer. Compute the gambler's case the other way round, treating $q = (0.9, 0.1)$ as the truth:
$$D_{KL}(q\,\|\,p) = 0.9\log_2\frac{0.9}{0.5} + 0.1\log_2\frac{0.1}{0.5} \approx 0.9(0.848) + 0.1(-2.322) \approx 0.531 \text{ bits.}$$
So $D_{KL}(p\|q) \approx 0.737$ but $D_{KL}(q\|p) \approx 0.531$. Which direction you use is a modelling choice with real consequences, as we'll see.

### When KL becomes infinite
Look at the term $p(x)\log\frac{p(x)}{q(x)}$. If the model says $q(x) = 0$ for an outcome that really can happen ($p(x) > 0$), the term is infinite. Saying "impossible" about something possible is the worst mistake a model can make, and KL punishes it without limit. The reverse is harmless: if $p(x) = 0$, the term is $0$ no matter what $q(x)$ is. This is why models should keep a little probability on everything plausible.

### Forward versus reverse KL
Suppose the truth $p$ has two separate peaks (say, the heights of two different species), and we must approximate it with a single bell curve $q$. Minimizing the **forward** KL $D_{KL}(p\,\|\,q)$ forces $q$ to put mass wherever $p$ does, because missing any part of $p$ is very costly. The result is a wide $q$ that covers both peaks, even the valley between them. This is called **mean-seeking** or mass-covering. Minimizing the **reverse** KL $D_{KL}(q\,\|\,p)$ instead punishes $q$ for putting mass where $p$ has little, so $q$ shrinks to sit snugly on *one* peak. This is **mode-seeking**. Maximum likelihood training is forward KL; variational inference usually uses reverse KL.

### KL between two Gaussians
A formula used constantly in ML: for one-dimensional Gaussians,
$$D_{KL}\big(\mathcal N(\mu, \sigma^2)\,\|\,\mathcal N(0, 1)\big) = \tfrac12\big(\sigma^2 + \mu^2 - 1 - \ln\sigma^2\big) \text{ nats.}$$
If $\mu = 0$ and $\sigma = 1$ the distributions match and the KL is $\frac12(1 + 0 - 1 - 0) = 0$. Shifting the mean to $\mu = 1$ gives $\frac12(1 + 1 - 1 - 0) = 0.5$ nats. Widening to $\sigma = 2$ gives $\frac12(4 - 1 - \ln 4) \approx 0.807$ nats. This is the regularizer in every variational autoencoder.

:::warn Common mistakes
- Don't call KL a distance metric: it is not symmetric and does not satisfy the triangle inequality.
- Always check which distribution sits in front. In $D_{KL}(p\|q)$ the average is under $p$.
- Individual terms can be negative; only the total is guaranteed non-negative.
- If some $q(x) = 0$ where $p(x) > 0$, the answer is infinite, not a large finite number. Smooth or clip $q$ in code.
:::

### Two more ways to read KL
There are two other pictures of KL that are worth keeping in your head. The first is about **codes**. If you compress data from $p$ using a code built for $q$, each symbol $x$ gets a codeword of about $-\log_2 q(x)$ bits instead of the ideal $-\log_2 p(x)$. The waste on that symbol is $\log_2\frac{p(x)}{q(x)}$ bits, and averaging the waste over how often each symbol really appears gives exactly $D_{KL}(p\|q)$. For the gambler's coin, a code designed for a 90/10 coin wastes about 0.737 bits on every flip of a fair coin.

The second picture is about **evidence**. Suppose you are trying to decide whether data comes from $p$ or from $q$. Each observation $x$ shifts the log-odds in favour of $p$ by $\log\frac{p(x)}{q(x)}$. If the data really comes from $p$, the average shift per observation is $D_{KL}(p\|q)$. So KL tells you how quickly evidence piles up: two distributions with a KL of 0.5 bits can be told apart in a handful of samples, while a KL of 0.001 bits needs thousands. This is why KL appears in the theory of hypothesis testing, and it is another reason the two directions differ: the evidence you collect depends on which distribution is actually producing the data.

### Summary
KL divergence $D_{KL}(p\|q) = \sum p\log\frac pq = H(p, q) - H(p)$ is the extra cost of believing $q$ when the truth is $p$. It is never negative, is zero only when the distributions match, is not symmetric, and becomes infinite when the model rules out something possible. Forward KL covers all the mass; reverse KL locks onto a mode.

@viz entropy | Drag p and q apart and together; the readout shows D_KL(p‖q) = H(p, q) − H(p).

:::explore
**What to try**
1. Match q to p exactly. KL reads 0, the only way to get zero.
2. Set p uniform and make q lopsided, then swap: make q uniform and p lopsided with the same shape. Compare the two KL values; they differ, showing the asymmetry.
3. Make p4 noticeable (say 0.3) and drag q4 down to 0.01. KL climbs steeply: the model nearly rules out something that happens.
4. Now do the reverse: make q4 large while p4 is tiny. KL grows only mildly.

**What to notice:** steps 3 and 4 are the "infinite when $q(x) = 0$" rule in action. Underestimating a real outcome is far worse than overestimating a rare one, which is exactly why forward KL makes models spread out to cover everything.
:::

:::formulas
$$D_{KL}(p\,\|\,q) = \sum_x p(x)\log\frac{p(x)}{q(x)} = H(p, q) - H(p)$$
$$D_{KL}(p\,\|\,q) \ge 0,\quad = 0 \iff p = q$$
$$D_{KL}(p\,\|\,q) \ne D_{KL}(q\,\|\,p)\ \text{in general}$$
$$D_{KL}\big(\mathcal N(\mu, \sigma^2)\,\|\,\mathcal N(0, 1)\big) = \tfrac12(\sigma^2 + \mu^2 - 1 - \ln\sigma^2)$$
:::

:::thm Non-negativity of KL (Gibbs)
$D_{KL}(p\,\|\,q) \ge 0$ for all distributions $p, q$, with equality if and only if $p = q$.
:::

:::proof
$-\log$ is convex, so by Jensen's inequality (summing over $x$ with $p(x) > 0$)
$$D_{KL}(p\,\|\,q) = \sum_x p(x)\Big(-\log\frac{q(x)}{p(x)}\Big) \ge -\log\sum_x p(x)\frac{q(x)}{p(x)} = -\log\sum_x q(x) \ge -\log 1 = 0.$$
Equality in Jensen requires $\frac{q(x)}{p(x)}$ to be constant, and the sums then force the constant to be 1, so $q = p$.
:::

:::steps Compute both directions for p = (0.5, 0.5) and q = (0.9, 0.1)
1. $D_{KL}(p\|q) = 0.5\log_2\frac{0.5}{0.9} + 0.5\log_2\frac{0.5}{0.1} \approx 0.5(-0.848) + 0.5(2.322) \approx 0.737$ bits.
2. $D_{KL}(q\|p) = 0.9\log_2\frac{0.9}{0.5} + 0.1\log_2\frac{0.1}{0.5} \approx 0.763 - 0.232 = 0.531$ bits.
3. The two directions differ, so KL is not symmetric.
:::

:::steps VAE regularizer for an encoder output mean 1, standard deviation 1
1. Formula: $\frac12(\sigma^2 + \mu^2 - 1 - \ln\sigma^2)$.
2. Plug in $\mu = 1$, $\sigma = 1$: $\frac12(1 + 1 - 1 - 0) = 0.5$ nats.
3. With $\mu = 0$, $\sigma = 2$: $\frac12(4 + 0 - 1 - \ln 4) = \frac12(3 - 1.386) \approx 0.807$ nats.
:::

:::steps KL from entropy and cross-entropy
1. Suppose $H(p) = 1.5$ bits and $H(p, q) \approx 1.585$ bits (the tourist from the cross-entropy lesson).
2. $D_{KL}(p\|q) = H(p, q) - H(p) \approx 0.085$ bits per day.
:::

:::mock Exam question
Let $p = (\frac12, \frac12)$ and $q = (\frac14, \frac34)$. Compute $D_{KL}(p\|q)$ and $D_{KL}(q\|p)$ in bits, and explain why they differ.
:::solution
$D_{KL}(p\|q) = \frac12\log_2\frac{1/2}{1/4} + \frac12\log_2\frac{1/2}{3/4} = \frac12(1) + \frac12\log_2\frac23 \approx 0.5 - 0.292 = 0.208$ bits.
$D_{KL}(q\|p) = \frac14\log_2\frac{1/4}{1/2} + \frac34\log_2\frac{3/4}{1/2} = \frac14(-1) + \frac34\log_2 1.5 \approx -0.25 + 0.439 = 0.189$ bits.
They differ because each version averages the log-ratio under a different distribution: the first weights the outcomes equally, the second weights the second outcome three times as much.
:::
:::

:::ml
- **VAEs** add $D_{KL}\big(q(z\mid x)\,\|\,\mathcal N(0, I)\big)$ to the loss to keep the latent space smooth and well-behaved.
- **RLHF and PPO** penalize the KL between the fine-tuned model and the original one, so fine-tuning doesn't drift into nonsense.
- **Knowledge distillation** minimizes the KL between teacher and student output distributions.
- **Variational inference** fits an approximate posterior by minimizing reverse KL, and **t-SNE** places points so that a KL between neighbourhood distributions is small.
- Minimizing cross-entropy over $q$ is the same as minimizing $D_{KL}(p\|q)$, since $H(p)$ doesn't depend on the model.
:::

:::cs
In coding terms, KL is the number of extra bits per symbol you pay for compressing data from $p$ with a code designed for $q$. It also measures how fast hypothesis tests can tell two sources apart: the probability of confusing them shrinks roughly like $2^{-nD_{KL}}$ after $n$ samples.
:::

:::real
**Betting:** a gambler who bets on horse races in proportion to their beliefs $q$, when the true win probabilities are $p$, grows their wealth more slowly than someone betting by $p$. The loss in long-run growth rate is exactly $D_{KL}(p\|q)$ (in bits, per race, as doublings of wealth). Wrong beliefs literally cost money at the rate given by KL.
:::

:::quiz
? Is KL divergence symmetric?
- Yes
+ No
> In general $D_{KL}(p\|q) \ne D_{KL}(q\|p)$, as the coin example showed (0.737 versus 0.531 bits).

? What is $D_{KL}(p\|p)$?
= 0
> Every log-ratio is $\log 1 = 0$.

? H(p) = 2 bits and H(p, q) = 2.5 bits. What is D_KL(p‖q)?
= 0.5|1/2
> $D_{KL} = H(p, q) - H(p) = 0.5$ bits.

? Can a KL divergence be negative?
- Yes, when q is better than p
+ No, it is always at least 0
- Only for continuous distributions
> Gibbs' inequality guarantees $D_{KL} \ge 0$.

? What happens to D_KL(p‖q) if q(x) = 0 for some x with p(x) > 0?
- It becomes 0
- Nothing special
+ It becomes infinite
> The term $p(x)\log\frac{p(x)}{0}$ is infinite: the model ruled out something that happens.

? KL from N(1, 1) to N(0, 1), in nats, using ½(σ² + μ² − 1 − ln σ²)?
= 0.5|1/2
> $\frac12(1 + 1 - 1 - 0) = 0.5$.
:::

## Lesson: Mutual information and channel capacity {#mutual-information}
@summary: How much knowing one variable tells you about another, why it beats correlation, and the capacity of a noisy channel.

### The question behind every prediction
Whenever we use one thing to predict another, we are betting that they share information. A thermometer reading tells you about the temperature, a symptom tells you about a disease, a pixel tells you about the pixel next to it, and a caption tells you about an image. **Mutual information** measures exactly how much: the number of bits that knowing one variable saves you, on average, in describing the other. It is symmetric, it catches any kind of relationship (not just straight-line ones), and it sets the speed limit for every communication system ever built.

### An everyday scenario
Go back to the train station from the joint entropy lesson. Before looking outside, your uncertainty about whether the next person carries an umbrella was $H(Y) \approx 0.934$ bits. After seeing the weather, it dropped on average to $H(Y \mid X) \approx 0.722$ bits. The weather "told you" about $0.212$ bits about umbrellas. That number is the mutual information $I(X; Y)$ between weather and umbrellas. Remarkably, if you had instead watched umbrellas and asked about the weather, you would have learned exactly the same $0.212$ bits about the weather. Information is shared equally in both directions.

### The definition
The **mutual information** between $X$ and $Y$ is the reduction in uncertainty about one from learning the other:
$$I(X; Y) = H(X) - H(X \mid Y) = H(Y) - H(Y \mid X).$$
Using the chain rule $H(X, Y) = H(X) + H(Y \mid X)$, we can also write it without conditionals:
$$I(X; Y) = H(X) + H(Y) - H(X, Y).$$
This form explains the symmetry: it treats $X$ and $Y$ identically. Picture two overlapping discs, one for $H(X)$ and one for $H(Y)$. Their union is $H(X, Y)$, the parts that don't overlap are the conditional entropies, and the overlap is $I(X; Y)$.

A third form is the one most useful in theory:
$$I(X; Y) = \sum_{x, y}p(x, y)\log\frac{p(x, y)}{p(x)p(y)} = D_{KL}\big(p(x, y)\,\|\,p(x)p(y)\big).$$
It compares the real joint distribution with what the joint would be if the variables were independent. The more the truth differs from independence, the more information is shared.

:::def Mutual information
$I(X; Y) = H(X) - H(X \mid Y) = H(X) + H(Y) - H(X, Y) = D_{KL}(p(x, y)\,\|\,p(x)p(y))$: the average number of bits that observing one variable tells you about the other.
:::

### A worked build-up
Take two fair bits with the joint table $p(0,0) = 0.4$, $p(0,1) = 0.1$, $p(1,0) = 0.1$, $p(1,1) = 0.4$. They agree 80% of the time. Each marginal is $(\frac12, \frac12)$, so $H(X) = H(Y) = 1$ bit. The joint entropy is $-2(0.4\log_2 0.4) - 2(0.1\log_2 0.1) \approx 1.058 + 0.664 = 1.722$ bits. So
$$I(X; Y) = 1 + 1 - 1.722 = 0.278 \text{ bits.}$$
If they agreed 100% of the time, $H(X, Y)$ would be 1 and $I = 1$ bit: knowing one tells you the other completely. If they were independent, $H(X, Y) = 2$ and $I = 0$.

### Key properties
Mutual information is always **non-negative**, because it is a KL divergence. It is **zero exactly when $X$ and $Y$ are independent**, because only then is $p(x, y) = p(x)p(y)$ everywhere. It is **symmetric**: $I(X; Y) = I(Y; X)$. And a variable shares all of its information with itself: $I(X; X) = H(X)$, which is why entropy is sometimes called "self-information".

### Better than correlation
Correlation only detects **straight-line** relationships. Mutual information detects **any** dependence. Here is the classic example. Let $X$ be $-1$, $0$ or $1$ with equal probability, and let $Y = X^2$. Clearly $Y$ depends on $X$: once you know $X$ you know $Y$ exactly. But the correlation is zero: $E[X] = 0$ and $E[XY] = E[X^3] = \frac13(-1 + 0 + 1) = 0$, so the covariance is $0$. Mutual information is not fooled: since $Y$ is determined by $X$, $I(X; Y) = H(Y)$, and $Y$ is 1 with probability $\frac23$, so $I = h(\frac23) \approx 0.918$ bits.

### Processing can't create information
If $X$ affects $Y$, and $Y$ alone affects $Z$ (a chain $X \to Y \to Z$), then
$$I(X; Z) \le I(X; Y).$$
This is the **data processing inequality**. No amount of clever computation on $Y$ can tell you more about $X$ than $Y$ itself contained. Every layer of a neural network is such a processing step, so deeper layers can only keep or lose information about the input; what they can do is reorganize it into a more useful form.

### Channel capacity
Shannon's most famous application is communication. A **channel** takes an input $X$ and produces a noisy output $Y$. The simplest is the **binary symmetric channel**: each bit is flipped with probability $f$. Its **capacity** is the most mutual information you can get between input and output:
$$C = \max_{p(x)} I(X; Y) = 1 - h(f) \text{ bits per use,}$$
reached with fair input bits. With $f = 0.1$, $C = 1 - 0.469 = 0.531$ bits per use. Shannon's **noisy-channel coding theorem** says that you can send data with as few errors as you like at any rate below $C$, and not above it. With $f = 0.5$ the output is pure noise and $C = 0$.

:::def Channel capacity
The maximum of $I(X; Y)$ over input distributions: the highest rate, in bits per channel use, at which information can be sent with arbitrarily small error.
:::

:::warn Common mistakes
- Zero correlation does **not** mean zero mutual information; $Y = X^2$ is the counterexample.
- Mutual information is a property of the joint distribution, not of a single pair of values.
- Don't confuse $I(X; Y)$ with $H(X, Y)$. The first is the overlap; the second is the union.
- Estimating mutual information from a small sample is hard and biased upward; use enough data or a dedicated estimator.
:::

### Conditional mutual information
Sometimes we want to know what $Y$ tells us about $X$ **after** we already know a third variable $Z$. That is the **conditional mutual information** $I(X; Y \mid Z) = H(X \mid Z) - H(X \mid Y, Z)$. It can be smaller or larger than $I(X; Y)$. If ice-cream sales and drownings are both driven by hot weather $Z$, they share information on their own, but once you condition on the temperature the shared information mostly disappears: $I(X; Y \mid Z) \approx 0$. On the other hand, if $X$ and $Y$ are two independent fair bits and $Z = X \oplus Y$ is their exclusive or, then $I(X; Y) = 0$ but $I(X; Y \mid Z) = 1$ bit, because once you know $Z$, learning $Y$ tells you $X$ exactly. Conditioning can both hide and reveal dependence, which is why careful causal reasoning always asks "conditional on what?". The chain rule ties these together: $I(X; Y, Z) = I(X; Z) + I(X; Y \mid Z)$, so the information two clues give together is the information of the first plus whatever new information the second adds.

### Summary
Mutual information $I(X; Y) = H(X) + H(Y) - H(X, Y)$ is the overlap of two uncertainties: how many bits one variable tells you about the other. It is symmetric, non-negative, zero only under independence, and it detects nonlinear dependence that correlation misses. Processing can't increase it, and its maximum over inputs is the capacity of a channel.

@viz g07-joint | Use the presets to see mutual information as the overlap of H(X) and H(Y).

:::explore
**What to try**
1. Click **independent**: the green overlap vanishes and $I(X; Y) = 0$.
2. Click **Y is a copy of X**: the bars coincide and $I(X; Y) = H(X) = 1$ bit.
3. Set the sliders to 0.4, 0.1, 0.1, 0.4 and confirm $I \approx 0.278$ bits from the article.
4. Click **noisy copy** (flip probability 0.1) and read $I \approx 0.531$ bits, the capacity of that binary symmetric channel.

**What to notice:** the green box is the same whether you think of it as "$H(X)$ minus what's left of $X$" or "$H(Y)$ minus what's left of $Y$". That is the symmetry of mutual information, drawn as one shared overlap.
:::

@viz scatter-corr | Correlation sees only straight-line patterns.

:::explore
**What to try**
1. Set ρ to 0 and notice the cloud looks shapeless: here X and Y really are independent, so mutual information is 0 too.
2. Raise ρ to 0.9: the points line up and both correlation and mutual information are large.

**What to notice:** this widget can only make linear relationships. A U-shaped cloud like $Y = X^2$ would also show $r \approx 0$, yet it has high mutual information. Correlation measures one kind of dependence; mutual information measures all of them.
:::

:::formulas
$$I(X; Y) = H(X) - H(X \mid Y) = H(Y) - H(Y \mid X)$$
$$I(X; Y) = H(X) + H(Y) - H(X, Y)$$
$$I(X; Y) = D_{KL}\big(p(x, y)\,\|\,p(x)p(y)\big) \ge 0$$
$$I(X; X) = H(X)$$
$$C_{\text{BSC}} = 1 - h(f)$$
:::

:::thm Independence and mutual information
$I(X; Y) \ge 0$, with equality if and only if $X$ and $Y$ are independent.
:::

:::proof
$I(X; Y) = D_{KL}(p(x, y)\,\|\,p(x)p(y))$, and KL divergence is non-negative and zero exactly when the two distributions are equal, which here means $p(x, y) = p(x)p(y)$ for all $x, y$: the definition of independence.
:::

:::thm Data processing inequality
If $X \to Y \to Z$ is a Markov chain ($Z$ depends on $X$ only through $Y$), then $I(X; Z) \le I(X; Y)$.
:::

:::proof
By the chain rule for mutual information, $I(X; Y, Z) = I(X; Z) + I(X; Y \mid Z) = I(X; Y) + I(X; Z \mid Y)$. The Markov property makes $X$ and $Z$ independent given $Y$, so $I(X; Z \mid Y) = 0$. Hence $I(X; Z) = I(X; Y) - I(X; Y \mid Z) \le I(X; Y)$, since conditional mutual information is non-negative.
:::

:::thm Noisy-channel coding theorem (Shannon, 1948)
For a channel with capacity $C$, every rate $R < C$ can be achieved with error probability as small as desired by using long enough codes, and no rate $R > C$ can.
:::

:::steps Mutual information of the table (0.4, 0.1; 0.1, 0.4)
1. Marginals are $(\frac12, \frac12)$, so $H(X) = H(Y) = 1$ bit.
2. $H(X, Y) = -2(0.4)\log_2 0.4 - 2(0.1)\log_2 0.1 \approx 0.8(1.322) + 0.2(3.322) \approx 1.722$ bits.
3. $I = 1 + 1 - 1.722 \approx 0.278$ bits. (Equivalently $1 - h(0.2)$, since $Y$ is $X$ flipped with probability 0.2.)
:::

:::steps Y = X² with X uniform on {−1, 0, 1}: correlation versus mutual information
1. $E[X] = 0$ and $E[XY] = E[X^3] = 0$, so $\text{Cov}(X, Y) = 0$ and the correlation is 0.
2. $Y$ is a function of $X$, so $H(Y \mid X) = 0$ and $I(X; Y) = H(Y)$.
3. $P(Y = 1) = \frac23$, $P(Y = 0) = \frac13$, so $I = h(\frac13) \approx 0.918$ bits. Strong dependence, zero correlation.
:::

:::steps Capacity of a binary symmetric channel with f = 0.1
1. $h(0.1) \approx 0.469$ bits.
2. $C = 1 - 0.469 = 0.531$ bits per use.
3. To send 1000 data bits reliably you need at least about $1000/0.531 \approx 1884$ channel uses.
:::

:::mock Exam question
A fair bit $X$ is sent through a channel that flips it with probability $\frac14$. Find $I(X; Y)$ and the minimum number of channel uses per data bit for reliable communication.
:::solution
$Y$ is also a fair bit, so $H(Y) = 1$. Given $X$, $Y$ is wrong with probability $\frac14$, so $H(Y \mid X) = h(\frac14) = \frac14\log_2 4 + \frac34\log_2\frac43 \approx 0.5 + 0.311 = 0.811$ bits. Hence $I(X; Y) = 1 - 0.811 = 0.189$ bits, which is the capacity since fair inputs are optimal here. Reliable communication needs at least $1/0.189 \approx 5.3$ channel uses per data bit.
:::
:::

:::ml
- **Feature selection:** rank features by $I(\text{feature}; \text{label})$; unlike correlation, this finds nonlinear signals.
- **Contrastive learning** (CLIP, SimCLR) trains with the InfoNCE loss, which maximizes a lower bound on the mutual information between two views of the same thing, such as an image and its caption.
- **Information bottleneck:** good representations keep the information about the label while discarding the rest of the input.
- Decision-tree information gain is exactly $I(\text{feature}; \text{label})$.
:::

:::cs
Channel capacity is the foundation of digital communication. Error-correcting codes (Hamming, Reed–Solomon, LDPC, turbo and polar codes) are designed to approach Shannon's limit; modern LDPC and polar codes in Wi-Fi and 5G get very close to it. QR codes and CDs use Reed–Solomon codes so scratched or smudged data can still be read.
:::

:::real
Mutual information is used to align medical images: a CT scan and an MRI of the same patient look completely different pixel by pixel, but when the images are correctly lined up the mutual information between their intensities is maximal. Registration software slides and rotates one image to maximize it.
:::

:::quiz
? If X and Y are independent, I(X;Y) = 
= 0
> Independence means $p(x, y) = p(x)p(y)$, so the KL form is 0.

? X is a fair coin. What is I(X; X) in bits?
= 1
> $I(X; X) = H(X) = 1$ bit.

? H(X) = 1 bit and H(X | Y) = 0.25 bits. What is I(X; Y)?
= 0.75|3/4
> $I = H(X) - H(X \mid Y) = 0.75$ bits.

? A binary symmetric channel flips bits with probability 0.5. What is its capacity?
= 0
> $1 - h(0.5) = 1 - 1 = 0$: the output is independent of the input.

? Zero correlation between X and Y implies:
- I(X;Y) = 0
+ Nothing about I(X;Y) in general; it can still be large
- X and Y are independent
> $Y = X^2$ with symmetric $X$ has zero correlation but $I(X; Y) = H(Y) > 0$.

? Which is true for a chain X → Y → Z?
+ I(X;Z) ≤ I(X;Y)
- I(X;Z) ≥ I(X;Y)
- I(X;Z) = H(X)
> The data processing inequality: processing $Y$ can't add information about $X$.
:::

## Lesson: Differential entropy and continuous variables {#differential-entropy}
@summary: Entropy for continuous distributions, why the Gaussian maximizes it, and why squared error is a cross-entropy.

### Why continuous variables need care
Heights, temperatures, pixel intensities and neural-network weights are continuous: they can take any value in a range, not just a list of options. We'd like the same tools (entropy, cross-entropy, KL) for them. The natural idea is to replace the sum with an integral and the probabilities with a **density** $f(x)$. That gives **differential entropy**, which behaves like entropy in most ways but has a couple of surprises you need to know about. It is also the bridge that explains one of the most important facts in machine learning: training with mean squared error is secretly minimizing a cross-entropy.

### An everyday scenario
Imagine measuring the time a bus arrives, uniformly at random within a 10-minute window. If you recorded the time to the nearest minute, there would be 10 equally likely values and an entropy of $\log_2 10 \approx 3.32$ bits. To the nearest 6 seconds, 100 values and $\log_2 100 \approx 6.64$ bits. To the nearest millisecond, even more. The exact arrival time, specified to infinite precision, carries infinitely many bits. So the "plain" entropy of a continuous variable is infinite, and we need a different measure that ignores the precision we choose and captures only the shape of the distribution.

### The definition
For a continuous random variable with density $f(x)$, the **differential entropy** is
$$h(X) = -\int f(x)\log f(x)\,dx.$$
Let's compute it for a uniform distribution on $[0, a]$, where $f(x) = \frac1a$ on the interval. Then
$$h(X) = -\int_0^a \frac1a\log_2\frac1a\,dx = \log_2 a \text{ bits.}$$
For the bus window, $a = 10$ minutes, so $h = \log_2 10 \approx 3.32$ bits, which matches the "nearest minute" count. That is no accident: if you round a continuous variable into bins of width $\Delta$, its discrete entropy is approximately $h(X) - \log_2\Delta$. Differential entropy is the part that depends on the distribution; the $-\log_2\Delta$ part depends only on your chosen precision. With $\Delta = 0.1$ minutes we add $\log_2 10$ bits, giving $6.64$ as before.

:::def Differential entropy
For a density $f$: $h(X) = -\int f(x)\log f(x)\,dx$. It measures the spread of a continuous distribution; unlike discrete entropy it can be negative and it changes when you rescale the variable.
:::

### Two surprises
First, differential entropy **can be negative**. A uniform distribution on $[0, \frac14]$ has $h = \log_2\frac14 = -2$ bits. That doesn't mean "negative information"; it means the distribution is narrower than a uniform on an interval of length 1, which is the reference point with $h = 0$. Second, it **depends on units**. Measuring in seconds instead of minutes multiplies every value by 60 and adds $\log_2 60$ bits. In general $h(cX) = h(X) + \log_2|c|$. Differences between differential entropies, and KL divergences, don't have this problem, which is why KL and mutual information are the quantities used most for continuous variables.

### The Gaussian
For a normal distribution $\mathcal N(\mu, \sigma^2)$ the integral works out to
$$h(X) = \tfrac12\log_2(2\pi e\sigma^2) \text{ bits} = \tfrac12\ln(2\pi e\sigma^2) \text{ nats.}$$
For $\sigma = 1$: $2\pi e \approx 17.08$, so $h \approx \frac12\log_2 17.08 \approx 2.047$ bits, or about $1.419$ nats. The mean doesn't appear: sliding a distribution left or right doesn't change its spread. Doubling $\sigma$ adds exactly 1 bit, consistent with the rescaling rule.

The Gaussian has a special status: **among all distributions with a given variance, the Gaussian has the largest differential entropy.** It is the "most random" or least-assuming distribution once you fix the spread. This is one reason Gaussians are the default noise model: assuming Gaussian noise means assuming nothing beyond the variance.

### Why mean squared error is a cross-entropy
Suppose a regression model predicts $\hat y$ and we assume the true $y$ is Gaussian around the prediction, $y \sim \mathcal N(\hat y, \sigma^2)$. The negative log-likelihood of one observation is
$$-\ln f(y) = \frac{(y - \hat y)^2}{2\sigma^2} + \frac12\ln(2\pi\sigma^2).$$
The second term is a constant. So minimizing the average negative log-likelihood, which is the cross-entropy between the data and the model, is exactly minimizing the **mean squared error**. For example with $y = 3$, $\hat y = 2.5$, $\sigma = 1$: $\frac{0.25}{2} + 0.919 \approx 1.044$ nats. Classification uses categorical cross-entropy; regression with MSE uses Gaussian cross-entropy. They are the same principle.

:::warn Common mistakes
- Don't read a negative differential entropy as an error; it is normal for narrow distributions.
- Don't compare differential entropies measured in different units.
- A density $f(x)$ can exceed 1, so $-\log f(x)$ can be negative; it is not a probability.
- Discrete entropy is the limit of differential entropy only after subtracting the $\log_2\Delta$ term; the two are not the same number.
:::

### Mutual information carries over cleanly
The good news is that the quantities built from **differences** behave exactly as in the discrete case. The mutual information of continuous variables is $I(X; Y) = h(X) - h(X \mid Y)$, and the $\log_2\Delta$ precision terms cancel when you subtract, so it is always non-negative, does not depend on units, and is zero exactly under independence. For two jointly Gaussian variables with correlation $\rho$ there is a neat closed form: $I(X; Y) = -\frac12\log_2(1 - \rho^2)$ bits. With $\rho = 0.6$, $1 - \rho^2 = 0.64$ and $I = -\frac12\log_2 0.64 \approx 0.322$ bits. As $\rho$ approaches 1 the mutual information grows without bound, because a perfectly correlated continuous variable pins down the other to infinite precision. The KL divergence between densities, $\int f\log\frac fg$, is likewise non-negative and unit-free, which is why it is the workhorse of continuous probabilistic machine learning.

### Summary
Differential entropy $h(X) = -\int f\log f$ extends entropy to continuous variables. A uniform on $[0, a]$ has $h = \log_2 a$, which can be negative; a Gaussian has $\frac12\log_2(2\pi e\sigma^2)$ and is the maximum-entropy distribution for its variance. KL divergence and mutual information carry over cleanly, and the Gaussian negative log-likelihood turns cross-entropy into mean squared error.

@viz distribution kind=normal lo=-1 hi=1 | Change the standard deviation and imagine its entropy: wider curve, more bits.

:::explore
**What to try**
1. Read the σ slider. Use $h = 2.047 + \log_2\sigma$ bits to compute the entropy.
2. Double σ, from 1 to 2. The curve gets wider and lower; the entropy rises by exactly 1 bit.
3. Drag σ down to its minimum, 0.3. The peak rises to about 1.33 and $h \approx 2.047 + \log_2 0.3 \approx 0.31$ bits, close to zero. Any σ below about 0.242 would make $h$ negative.
4. Switch the Distribution menu to uniform and compare its shape with the bell curve of the same spread.

**What to notice:** the μ slider only slides the curve and never changes the entropy, while the spread controls everything. For a fixed spread, no shape has more entropy than the bell curve.
:::

:::formulas
$$h(X) = -\int f(x)\log f(x)\,dx$$
$$h(\text{Uniform}[0, a]) = \log_2 a$$
$$h(\mathcal N(\mu, \sigma^2)) = \tfrac12\log_2(2\pi e\sigma^2)\ \text{bits}$$
$$h(cX) = h(X) + \log_2|c|$$
$$D_{KL}(\mathcal N(\mu_1, \sigma_1^2)\|\mathcal N(\mu_2, \sigma_2^2)) = \ln\frac{\sigma_2}{\sigma_1} + \frac{\sigma_1^2 + (\mu_1 - \mu_2)^2}{2\sigma_2^2} - \frac12$$
$$-\ln\mathcal N(y; \hat y, \sigma^2) = \frac{(y - \hat y)^2}{2\sigma^2} + \tfrac12\ln(2\pi\sigma^2)$$
:::

:::thm Maximum entropy of the Gaussian
Among all densities with variance $\sigma^2$, the normal distribution $\mathcal N(\mu, \sigma^2)$ has the largest differential entropy, $\frac12\ln(2\pi e\sigma^2)$ nats.
:::

:::proof
Let $f$ have variance $\sigma^2$ (and, without loss of generality, mean $\mu$), and let $g$ be the Gaussian with the same mean and variance. Then $0 \le D_{KL}(f\|g) = -h(f) - \int f\ln g$. Now $-\ln g(x) = \frac12\ln(2\pi\sigma^2) + \frac{(x-\mu)^2}{2\sigma^2}$, and its average under $f$ uses only the variance of $f$, which equals that of $g$: $-\int f\ln g = \frac12\ln(2\pi\sigma^2) + \frac12 = h(g)$. So $h(f) \le h(g)$, with equality only when $f = g$.
:::

:::steps Entropy of a uniform distribution on [0, 8] and on [0, 1/4]
1. $h = \log_2 a$.
2. $[0, 8]$: $\log_2 8 = 3$ bits.
3. $[0, \frac14]$: $\log_2\frac14 = -2$ bits. Negative, because the interval is shorter than 1.
:::

:::steps Entropy of N(0, 4) in nats
1. $\sigma = 2$, so $2\pi e\sigma^2 \approx 17.08 \times 4 = 68.3$.
2. $h = \frac12\ln 68.3 \approx \frac12(4.224) \approx 2.112$ nats.
3. Check: $1.419 + \ln 2 \approx 1.419 + 0.693 = 2.112$, using the rescaling rule.
:::

:::steps Gaussian negative log-likelihood for y = 3, prediction 2.5, σ = 1
1. Squared-error part: $\frac{(3 - 2.5)^2}{2} = 0.125$.
2. Constant part: $\frac12\ln(2\pi) \approx 0.919$.
3. NLL $\approx 1.044$ nats. Only the first part depends on the prediction, so minimizing NLL is minimizing squared error.
:::

:::mock Exam question
Compute $D_{KL}(\mathcal N(0, 1)\,\|\,\mathcal N(0, 4))$ and $D_{KL}(\mathcal N(0, 4)\,\|\,\mathcal N(0, 1))$ in nats. Which is larger, and why?
:::solution
Using the formula with $\sigma_1 = 1$, $\sigma_2 = 2$: $\ln 2 + \frac{1}{8} - \frac12 \approx 0.693 - 0.375 = 0.318$ nats. Reversed, $\sigma_1 = 2$, $\sigma_2 = 1$: $\ln\frac12 + \frac42 - \frac12 \approx -0.693 + 1.5 = 0.807$ nats. The second is larger: approximating a wide distribution with a narrow one assigns tiny density to values that really happen, which KL punishes heavily; a wide model covering a narrow truth only wastes some density.
:::
:::

:::ml
- **Regression losses:** MSE is Gaussian negative log-likelihood, and mean absolute error is Laplace negative log-likelihood. Choosing a loss is choosing a noise model.
- **VAEs and diffusion models** use closed-form Gaussian KL terms and Gaussian likelihoods throughout.
- **Maximum entropy reinforcement learning** maximizes the differential entropy of a continuous action policy, often Gaussian, to encourage exploration.
:::

:::cs
Lossy compression of audio and images is governed by rate–distortion theory, built on differential entropy: for a Gaussian source of variance $\sigma^2$ coded with mean squared error $D$, the minimum rate is $\frac12\log_2\frac{\sigma^2}{D}$ bits per sample. Each extra bit halves the allowed standard deviation of the error.
:::

:::real
The Shannon–Hartley formula for a telephone line, Wi-Fi link or any channel with Gaussian noise, $C = B\log_2(1 + \frac{S}{N})$, comes from differential entropy. A 1 MHz channel with signal-to-noise ratio 1000 (30 dB) can carry at most about $10^6\log_2 1001 \approx 10$ million bits per second.
:::

:::quiz
? Differential entropy of a uniform distribution on [0, 4], in bits?
= 2
> $\log_2 4 = 2$.

? Can differential entropy be negative?
+ Yes
- No
> A uniform on $[0, \frac14]$ has $h = -2$ bits.

? Which distribution has the largest differential entropy for a fixed variance?
- Uniform
+ Gaussian
- Exponential
> The maximum entropy theorem: the Gaussian.

? Doubling the standard deviation of a Gaussian adds how many bits of differential entropy?
= 1
> $h(2X) = h(X) + \log_2 2$.

? Differential entropy of Uniform[0, 1] in bits?
= 0
> $\log_2 1 = 0$.

? Minimizing mean squared error corresponds to maximum likelihood under which noise model?
+ Gaussian
- Bernoulli
- Uniform
> The Gaussian NLL is $\frac{(y - \hat y)^2}{2\sigma^2}$ plus a constant.
:::
