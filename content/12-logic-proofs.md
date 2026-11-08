---
id: logic-proofs
title: Logic & Proofs
tagline: Propositions, quantifiers, and the proof techniques every CS theory course assumes.
desc: Learn to reason with total precision. You'll master propositional logic, truth tables, logical equivalences, predicates and quantifiers, and the standard proof techniques — direct proof, contrapositive, contradiction, cases, and mathematical induction.
color: #a855f7
symbol: ⇒
area: Discrete math
paths: cs
order: 12
---

# Unit: Propositional logic

## Lesson: Propositions and logical connectives {#propositions}
@summary: True/false statements, and how NOT, AND, OR, XOR, IF-THEN and IFF combine them.

### Why logic comes first
Every proof you will ever read, every `if` statement you will ever write, and every database query you will ever run is built from a handful of tiny words: *not*, *and*, *or*, *if… then*. In everyday speech these words are vague. "You can have cake or ice cream" usually means one, not both. "If you finish your homework, you can play" leaves open what happens if you don't. Mathematics and computers cannot work with that kind of vagueness. They need every sentence to have exactly one meaning, so that two people (or two machines) always reach the same answer.

Propositional logic is the tool that removes the vagueness. It gives each connecting word a precise meaning, defined by a small table of cases. Once you know those tables, you can decide the truth of any compound sentence mechanically, the same way you can evaluate $3 + 4 \times 2$ once you know the rules of arithmetic.

### What counts as a proposition
Imagine you are a judge in a quiz show. A contestant says something, and you must press either the TRUE button or the FALSE button. Some sentences let you do that, and some don't.

"7 is a prime number" — press TRUE. "Paris is the capital of Germany" — press FALSE. Both are **propositions**: statements that are definitely true or definitely false, even if you don't yet know which. "The 10,000th digit of $\pi$ is 7" is also a proposition. It has a definite answer; you just have to look it up.

Now consider "Close the door." That is a command, not a claim, so it has no truth value. "Is it raining?" is a question. "$x + 2 = 5$" is not a proposition either, because its truth depends on $x$: it is true when $x = 3$ and false otherwise. Sentences with unknowns like this are called predicates, and they get their own lesson later. "This sentence is false" is the strangest case: if it were true it would be false, and if it were false it would be true, so it cannot be a proposition at all.

We name propositions with lowercase letters such as $p$, $q$ and $r$. For example, let $p$ be "it is raining" and $q$ be "I take an umbrella". Each letter stands for a whole sentence, and each one is either T (true) or F (false).

:::def Proposition
A declarative statement that is either true or false, but not both. Its truth value is written T or F (or 1 and 0).
:::

### Negation: NOT
The simplest operation flips a truth value. The **negation** of $p$, written $\neg p$ and read "not $p$", is true exactly when $p$ is false. If $p$ is "it is raining", then $\neg p$ is "it is not raining". Negating twice brings you back: $\neg\neg p$ has the same value as $p$.

### Conjunction and disjunction: AND, OR
The **conjunction** $p \land q$ ("$p$ and $q$") is true only when both parts are true. "It is raining and I take an umbrella" is false if either half fails. Out of the four possible combinations of T and F for two propositions, only one makes $p\land q$ true.

The **disjunction** $p \lor q$ ("$p$ or $q$") is true when at least one part is true. This is the *inclusive* or: if both halves are true, the whole is still true. Of the four combinations, three make $p\lor q$ true; only F-or-F is false.

When you do mean "one or the other but not both", logic uses a separate connective: **exclusive or**, $p \oplus q$, true when exactly one part is true. "The light switch is up xor the light is off" is the kind of rule that XOR describes.

### Implication: IF-THEN
The **implication** $p \to q$ is read "if $p$ then $q$". The part $p$ is the **hypothesis** (or premise) and $q$ is the **conclusion**. Think of it as a promise. Suppose a parent says: "If you clean your room, I'll give you 5 dollars." When has the parent broken the promise? Only in one case: the room is clean and no money appears. If the room stays messy, the parent made no claim about what happens, so whatever they do, the promise is not broken.

That is exactly the rule: $p\to q$ is **false only when $p$ is true and $q$ is false**. In the other three rows it is true. The two rows where $p$ is false are called **vacuously true**. "If pigs fly, then I am the Queen of England" is a true implication, simply because pigs don't fly.

There are many English phrasings of $p \to q$: "$p$ implies $q$", "$q$ if $p$", "$p$ only if $q$", "$p$ is sufficient for $q$", and "$q$ is necessary for $p$". The phrase "only if" trips up nearly everyone: "you can vote only if you are registered" means vote $\to$ registered, not the other way round.

### Biconditional: IF AND ONLY IF
The **biconditional** $p \leftrightarrow q$ ("$p$ if and only if $q$", often written "iff") is true when $p$ and $q$ have the same truth value. It says the implication holds in both directions: $p\to q$ and $q \to p$. "A number is even iff its last digit is 0, 2, 4, 6 or 8" is a biconditional. Notice that $p\leftrightarrow q$ is true exactly when $p\oplus q$ is false.

@fig truth-table expr=p_->_q | The four rows of an implication. It is false in exactly one row: p true, q false.

### Converse, inverse and contrapositive
From one implication $p\to q$ you can build three relatives:
- the **converse** $q \to p$,
- the **inverse** $\neg p\to\neg q$,
- the **contrapositive** $\neg q\to\neg p$.

Take "if it is a dog, then it has four legs". Its contrapositive, "if it doesn't have four legs, it isn't a dog", says the same thing and is equally true. But the converse, "if it has four legs, it is a dog", is false (cats exist). The inverse, "if it isn't a dog, it doesn't have four legs", is false for the same reason. In fact the converse and the inverse are contrapositives of each other, so they always agree with each other, but not necessarily with the original.

### Precedence and parentheses
Just as multiplication binds tighter than addition, logic has an order: $\neg$ first, then $\land$, then $\lor$, then $\to$, then $\leftrightarrow$. So $\neg p \lor q \to r$ means $((\neg p)\lor q)\to r$. When in doubt, add parentheses. They cost nothing and prevent mistakes.

:::warn Common mistakes
Reading "or" as exclusive when logic means inclusive. Thinking a false hypothesis makes an implication false (it makes it true). Confusing an implication with its converse, which is the single most common error in reasoning, in mathematics and in everyday arguments alike. And treating "only if" as "if".
:::

### Summary
A proposition is a statement with a definite truth value. Six connectives combine propositions: NOT flips, AND needs both, OR needs at least one, XOR needs exactly one, IF-THEN fails only when a true hypothesis leads to a false conclusion, and IFF needs both sides to match. Every implication is equivalent to its contrapositive, but not to its converse or inverse. The next lesson uses truth tables to check facts like these systematically.

@viz truth-table expr=(p_->_q)_<->_(!q_->_!p) | Edit the formula and watch every row update. Use ! & | -> <-> and xor for ¬ ∧ ∨ → ↔ ⊕.

:::explore
**What to try**
1. Leave the formula as the contrapositive check $(p\to q)\leftrightarrow(\neg q\to\neg p)$ and read the last column.
2. Change it to the converse check `(p -> q) <-> (q -> p)` and find the rows where the result is F.
3. Type `p -> q` and then `!p | q`, and compare the two result columns.
4. Type `p xor q` and then `!(p <-> q)`.

**What to notice:** the contrapositive check is T in all four rows, so an implication and its contrapositive always agree. The converse check fails in two rows (p true, q false, and p false, q true), which is exactly why "four legs, therefore dog" is bad reasoning. The columns for `p -> q` and `!p | q` match, a fact you'll use constantly. XOR is the negation of IFF.
:::

:::formulas
| $p$ | $q$ | $\neg p$ | $p\land q$ | $p\lor q$ | $p\oplus q$ | $p\to q$ | $p\leftrightarrow q$ |
|---|---|---|---|---|---|---|---|
| T | T | F | T | T | F | T | T |
| T | F | F | F | T | T | F | F |
| F | T | T | F | T | T | T | F |
| F | F | T | F | F | F | T | T |

$$p\to q\;\equiv\;\neg q\to\neg p\qquad p\to q\;\equiv\;\neg p\lor q\qquad p\leftrightarrow q\;\equiv\;(p\to q)\land(q\to p)$$
:::

:::thm Implication equals its contrapositive
For all propositions $p, q$: $p\to q$ and $\neg q\to\neg p$ have the same truth value.
:::

:::proof
$p\to q$ is false only when $p = \mathrm{T}$ and $q = \mathrm{F}$. $\neg q\to\neg p$ is false only when $\neg q = \mathrm{T}$ and $\neg p = \mathrm{F}$, that is, again only when $q = \mathrm{F}$ and $p = \mathrm{T}$. The two statements fail in exactly the same row and are true in the other three, so they are equivalent.
:::

:::steps Translate "You can take Algorithms only if you have passed Discrete Math or have permission"
1. Name the parts: $a$ = "you can take Algorithms", $d$ = "you passed Discrete Math", $m$ = "you have permission".
2. "$X$ only if $Y$" means $X\to Y$.
3. Here $Y$ is "$d$ or $m$", so the sentence is $a\to(d\lor m)$.
4. Its contrapositive is $\neg(d\lor m)\to\neg a$: if you passed neither and have no permission, you cannot take the course.
:::

:::steps Evaluate $(p\lor q)\to\neg r$ when $p = \mathrm{F}$, $q = \mathrm{T}$, $r = \mathrm{T}$
1. Inner disjunction: $p\lor q = \mathrm{F}$ $\lor$ T $=$ T.
2. Negation: $\neg r = \neg$T $=$ F.
3. Implication: T $\to$ F $=$ F.
4. The whole statement is **false**: a true hypothesis led to a false conclusion.
:::

:::steps Write the converse, inverse and contrapositive of "If $n$ is divisible by 6, then $n$ is even"
1. Converse: if $n$ is even, then $n$ is divisible by 6. False: $n = 4$.
2. Inverse: if $n$ is not divisible by 6, then $n$ is not even. False: $n = 4$ again.
3. Contrapositive: if $n$ is not even, then $n$ is not divisible by 6. True, like the original.
:::

:::mock Exam question
Let $p$: "the server is up" and $q$: "the backup ran". (a) Write in symbols: "The backup ran only if the server is up, and the server is not up." (b) Is it possible for this compound statement to be true? If so, give the truth values.
:::solution
(a) "The backup ran only if the server is up" is $q\to p$. The whole statement is $(q\to p)\land\neg p$.
(b) $\neg p$ must be T, so $p = \mathrm{F}$. Then $q\to p$ becomes $q\to$ F, which is T only when $q = \mathrm{F}$. So yes: it is true exactly when $p = \mathrm{F}$ and $q = \mathrm{F}$ (server down, backup didn't run). This is the pattern called *modus tollens*, which you'll meet in the lesson on rules of inference.
:::
:::

:::cs
Every `if`, `&&`, `||` and `!` in a program is propositional logic. Short-circuit evaluation uses the truth tables directly: in `a && b`, if `a` is false the result must be false, so `b` is never evaluated; in `a || b`, if `a` is true, `b` is skipped. That's why `if (user != null && user.isAdmin())` is safe. Code reviewers also rewrite `if (!(a && b))` as `if (!a || !b)` using De Morgan's law.
:::

:::ml
Rule-based and decision-tree models are stacks of implications: "if petal length < 2.5 then class = setosa". Each path from the root to a leaf is a conjunction of conditions, and the whole tree is a disjunction of those paths. Interpretable-ML methods that extract rules from a neural network produce exactly these propositional formulas.
:::

:::real
Contracts, warranties and legal rules are implications. "If the device fails within 12 months, it will be replaced" is not broken when a device works perfectly, or when it fails in month 14. Spotting the converse error also protects you from bad arguments: "Successful people wake up early, so if I wake up early I'll be successful" swaps hypothesis and conclusion.
:::

:::quiz
? If $p$ is false and $q$ is true, what is the truth value of $p\to q$?
+ True
- False
> An implication is false only when the hypothesis is true and the conclusion is false. Here the hypothesis is false, so the implication is vacuously true.

? Which statement is equivalent to "If it rains, the ground is wet"?
- If the ground is wet, it rained.
+ If the ground is not wet, it didn't rain.
- If it doesn't rain, the ground isn't wet.
> That is the contrapositive $\neg q\to\neg p$, which always has the same truth value. The other two are the converse and the inverse.

? "You can vote only if you are registered." With $v$ = vote and $r$ = registered, this is...
+ $v\to r$
- $r\to v$
- $v\leftrightarrow r$
> "$X$ only if $Y$" means $X\to Y$: voting requires registration, but registration doesn't force you to vote.

? In how many of the 4 rows of a truth table is $p\lor q$ true?
= 3
> Inclusive OR is false only when both parts are false.

? Exactly one of $p, q$ is true. Which connective is guaranteed to be true?
- $p\land q$
+ $p\oplus q$
- $p\leftrightarrow q$
> XOR is true exactly when the inputs differ. The biconditional is false in that case.

? Is "$x^2 = 9$" (with $x$ unspecified) a proposition?
- Yes
+ No
> Its truth depends on $x$ (true for 3 and −3, false otherwise), so it is a predicate, not a proposition.
:::

## Lesson: Truth tables and logical equivalences {#truth-tables}
@summary: Checking every case, tautologies and contradictions, and the laws that let you simplify logic like algebra.

### The idea: try every case
Suppose a friend claims "it's not true that I'm both tired and hungry" means the same as "I'm not tired or I'm not hungry". Are they right? You could argue in words for a while, or you could do something completely mechanical: list every possible situation and check both sentences in each one. There are only four situations (tired or not, hungry or not), so the check takes a minute and leaves no room for doubt.

That mechanical check is a **truth table**. It is the brute-force method of logic, and it has one huge advantage: it always works. For a formula with a few variables, a truth table gives you a guaranteed answer to "is this always true?", "can this ever be true?" and "do these two formulas mean the same thing?"

### Building a truth table step by step
A truth table has one column for each variable, one column for each intermediate piece of the formula, and one final column for the whole formula. Each row is one assignment of T/F to the variables.

How many rows? Each variable has 2 possible values, and the choices are independent, so $n$ variables give $2\times2\times\cdots\times2 = 2^n$ rows. Two variables give 4 rows, three give 8, four give 16, and ten would already give 1024. A standard way to list them is to count in binary: the first variable alternates in blocks of half the table, the next in blocks of a quarter, and the last alternates every row.

Let's build the table for $\neg(p\land q)$, the friend's first sentence, with $p$ = "tired" and $q$ = "hungry". Work from the inside out, exactly like evaluating $(3+4)\times 2$. First compute $p\land q$ in each row: T only in row TT. Then negate that column: F in row TT, T in the other three rows. So the final column, reading top to bottom (TT, TF, FT, FF), is F, T, T, T.

Now the second sentence, $\neg p\lor\neg q$. Compute $\neg p$ (F, F, T, T) and $\neg q$ (F, T, F, T), then OR them: F, T, T, T. The two final columns are identical in every row, so the friend is right. This is one of **De Morgan's laws**.

### Tautologies, contradictions and contingencies
When you finish a truth table, look at the final column. There are three possibilities.

If every entry is T, the formula is a **tautology**: true no matter what. $p\lor\neg p$ ("it's raining or it isn't") is the simplest example. If every entry is F, the formula is a **contradiction**: it can never be true, like $p\land\neg p$. Anything in between, with at least one T and at least one F, is a **contingency**: its truth depends on the facts.

A formula that has at least one T row is called **satisfiable**: some assignment makes it true. So a contradiction is exactly an unsatisfiable formula, and a formula is a tautology exactly when its negation is unsatisfiable. That last observation sounds abstract, but it is how computers check tautologies in practice.

:::def Tautology
A compound proposition that is true for every assignment of truth values to its variables, such as $p\lor\neg p$.
:::

:::def Contradiction
A compound proposition that is false for every assignment of truth values, such as $p\land\neg p$.
:::

:::def Satisfiable
A formula is satisfiable if at least one assignment of truth values makes it true.
:::

### Logical equivalence
Two formulas $A$ and $B$ are **logically equivalent**, written $A\equiv B$, if they have the same truth value in every row. Another way to say it: $A\equiv B$ exactly when $A\leftrightarrow B$ is a tautology. Equivalent formulas are interchangeable, just as $2(x+1)$ and $2x+2$ are interchangeable in algebra.

:::def Logical equivalence
Formulas $A$ and $B$ are logically equivalent ($A\equiv B$) when they have identical truth values under every assignment; equivalently, $A\leftrightarrow B$ is a tautology.
:::

### The laws of logic
Truth tables get big fast, so mathematicians collected a set of equivalences that you can apply like algebra rules. Each one has been checked once by a truth table, and from then on you can use it freely. The most important are:

**Identity and domination.** $p\land T\equiv p$ and $p\lor F\equiv p$; also $p\lor T\equiv T$ and $p\land F\equiv F$. Think of T as 1 and F as 0, with AND as multiplication: $p\cdot 1 = p$ and $p\cdot0 = 0$.

**Idempotence and double negation.** $p\land p\equiv p$, $p\lor p\equiv p$, and $\neg\neg p\equiv p$. Saying something twice adds nothing; denying a denial is an assertion.

**Commutative, associative, distributive.** Order and grouping don't matter for a chain of ANDs (or a chain of ORs), and each distributes over the other: $p\land(q\lor r)\equiv(p\land q)\lor(p\land r)$ and also $p\lor(q\land r)\equiv(p\lor q)\land(p\lor r)$. That second one has no analogue in ordinary arithmetic ($2 + 3\times4\ne(2+3)\times(2+4)$), so it often surprises people.

**De Morgan's laws.** $\neg(p\land q)\equiv\neg p\lor\neg q$ and $\neg(p\lor q)\equiv\neg p\land\neg q$. To push a NOT inside, flip each piece and swap AND with OR.

**Absorption.** $p\lor(p\land q)\equiv p$ and $p\land(p\lor q)\equiv p$. If $p$ is true, the left side is already true; if $p$ is false, the extra part $p\land q$ is false too.

**Implication and biconditional rewrites.** $p\to q\equiv\neg p\lor q$, and $p\leftrightarrow q\equiv(p\to q)\land(q\to p)$. These let you remove arrows entirely, leaving only NOT, AND and OR.

### Using the laws: a small simplification
Simplify $(p\land q)\lor(p\land\neg q)$. Factor out $p$ with the distributive law to get $p\land(q\lor\neg q)$. The bracket is a tautology, T, so the expression is $p\land T\equiv p$. Four symbols collapsed to one. A truth table confirms it: the result column equals the $p$ column.

### Why this matters beyond the classroom
Checking every row is reliable but explodes exponentially: 30 variables mean more than a billion rows. The question "is this formula satisfiable?" is called **SAT**, and it was the very first problem proven NP-complete. No one knows a fast method that works for every formula. Yet clever SAT solvers routinely handle formulas with millions of variables arising in chip verification, scheduling and software package installation, by using the laws above and smart search instead of full tables.

:::warn Common mistakes
Forgetting rows: always check you have exactly $2^n$. Negating $p\land q$ as $\neg p\land\neg q$ (wrong: De Morgan swaps AND to OR). Assuming that two formulas that agree in a few rows are equivalent; they must agree in all rows. And confusing "not a tautology" with "a contradiction": most formulas are neither.
:::

### Summary
A truth table lists all $2^n$ assignments and evaluates a formula from the inside out. Its final column tells you whether the formula is a tautology, a contradiction or a contingency, and comparing two final columns tells you whether formulas are equivalent. The laws of logic (identity, domination, distributive, De Morgan, absorption, and the implication rewrite) let you simplify without drawing a table each time.

@viz truth-table expr=!(p_&_q)_<->_(!p_∨_!q) | Type any formula with up to a few variables. The last column is the whole formula.

:::explore
**What to try**
1. Read the De Morgan check that is loaded. Every row should be T.
2. Change it to the wrong version `!(p & q) <-> (!p & !q)` and find the rows where it fails.
3. Type `(p & q) | (p & !q)` and compare its result column with the column for `p`.
4. Type `p | (q & r)` and then `(p | q) & (p | r)`. Count the rows: there should be 8.
5. Use the preset buttons for "tautology" and "contradiction".

**What to notice:** an equivalence check of the form `A <-> B` is a tautology exactly when $A\equiv B$. The broken De Morgan fails in the two rows where $p$ and $q$ differ. Adding a third variable doubles the rows, which is the $2^n$ growth from the article.
:::

:::formulas
$$\neg(p\land q)\equiv\neg p\lor\neg q\qquad\neg(p\lor q)\equiv\neg p\land\neg q\quad\text{(De Morgan)}$$
$$p\land(q\lor r)\equiv(p\land q)\lor(p\land r)\qquad p\lor(q\land r)\equiv(p\lor q)\land(p\lor r)$$
$$p\lor(p\land q)\equiv p\qquad p\land(p\lor q)\equiv p\quad\text{(absorption)}$$
$$p\to q\equiv\neg p\lor q\qquad p\leftrightarrow q\equiv(p\to q)\land(q\to p)\qquad\neg\neg p\equiv p$$
$$\text{number of rows for } n \text{ variables} = 2^n$$
:::

:::thm De Morgan's laws
For all propositions $p, q$: $\neg(p\land q)\equiv\neg p\lor\neg q$ and $\neg(p\lor q)\equiv\neg p\land\neg q$.
:::

:::proof
First law: $\neg(p\land q)$ is F only when $p\land q$ is T, i.e. only in row $p = q = \mathrm{T}$. $\neg p\lor\neg q$ is F only when both $\neg p$ and $\neg q$ are F, i.e. again only when $p = q = \mathrm{T}$. Same single F row, so they are equivalent. The second law follows by applying the first to $\neg p$ and $\neg q$ and negating both sides: $\neg(\neg p\land\neg q)\equiv p\lor q$, so $\neg p\land\neg q\equiv\neg(p\lor q)$.
:::

:::steps Show $\neg(p\to q)\equiv p\land\neg q$ using laws
1. Rewrite the implication: $p\to q\equiv\neg p\lor q$.
2. Negate: $\neg(\neg p\lor q)$.
3. De Morgan: $\neg\neg p\land\neg q$.
4. Double negation: $p\land\neg q$. An implication fails exactly when the hypothesis holds and the conclusion doesn't.
:::

:::steps Is $(p\to q)\land(q\to r)\to(p\to r)$ a tautology?
1. The only way an implication is false is a true hypothesis with a false conclusion, so look for a row where $p\to r$ is F: that forces $p = \mathrm{T}$, $r = \mathrm{F}$.
2. With $p = \mathrm{T}$, the hypothesis needs $p\to q$ true, so $q = \mathrm{T}$.
3. Then $q\to r$ is T $\to$ F $=$ F, so the hypothesis is false in that row.
4. No row makes the hypothesis T and the conclusion F, so it is a tautology. (This is the rule "hypothetical syllogism".)
:::

:::steps Simplify $\neg(\neg p\land q)\land(p\lor q)$
1. De Morgan on the first part: $\neg(\neg p\land q)\equiv p\lor\neg q$.
2. Now we have $(p\lor\neg q)\land(p\lor q)$.
3. Distributive law in reverse: $p\lor(\neg q\land q)$.
4. $\neg q\land q\equiv F$, and $p\lor F\equiv p$. The answer is $p$.
:::

:::mock Exam question
(a) How many rows does a truth table for a formula in variables $p, q, r, s, t$ have? (b) Decide, with justification, whether $(p\lor q)\land\neg p\land\neg q$ is a tautology, a contradiction or a contingency.
:::solution
(a) $2^5 = 32$ rows.
(b) By De Morgan, $\neg p\land\neg q\equiv\neg(p\lor q)$, so the formula is $(p\lor q)\land\neg(p\lor q)$, which has the form $x\land\neg x$. It is F in every row: a **contradiction**.
:::
:::

:::cs
Compilers and code reviewers simplify conditions with these laws (`!(a || b)` becomes `!a && !b`). **SAT solvers** decide satisfiability of huge formulas and are used for hardware verification, finding bugs in software, scheduling, and resolving package dependencies in tools like conda and some Linux package managers. Circuit designers use the same laws as Boolean algebra (see the Binary & Boolean Algebra course).
:::

:::ml
Logical constraints appear in ML pipelines: a data-validation rule like "if age < 18 then income is empty" is an implication, and checking that a set of rules is consistent is a satisfiability question. Neuro-symbolic models and formal verification of neural networks (proving that a classifier's output can't flip under small input changes) also reduce to SAT-style problems.
:::

:::real
A home alarm that should sound "if a door opens and the system is armed, or a window breaks" is a formula; writing out its truth table is how an installer checks it behaves correctly in every situation, including the strange ones nobody thought of.
:::

:::quiz
? How many rows does a truth table with 4 variables have?
= 16
> $2^4 = 16$: each variable doubles the number of rows.

? $\neg(p\lor q)$ is equivalent to...
- $\neg p\lor\neg q$
+ $\neg p\land\neg q$
- $p\land q$
> De Morgan: negate each part and swap OR for AND. "Not (tea or coffee)" means "no tea and no coffee".

? Which formula is a tautology?
+ $p\lor\neg p$
- $p\land\neg p$
- $p\to\neg p$
> $p\lor\neg p$ is T whichever value $p$ has. $p\to\neg p$ is F when $p$ is T.

? Simplify $p\land(p\lor q)$.
+ $p$
- $p\lor q$
- $q$
> Absorption: if $p$ is T the whole thing is T; if $p$ is F the whole thing is F. It always equals $p$.

? How many of the 8 rows make $p\land q\land r$ true?
= 1
> AND of three variables is true only in the single row where all three are T.

? $p\to q$ is equivalent to...
- $p\lor\neg q$
+ $\neg p\lor q$
- $\neg p\land q$
> The implication is false only when $p$ is T and $q$ is F, which is also the only row where $\neg p\lor q$ is false.
:::

## Lesson: Rules of inference and valid arguments {#inference}
@summary: Modus ponens, modus tollens, syllogisms and resolution: how to chain true statements into new ones without truth tables.

### From checking to deducing
Truth tables answer "is this formula always true?", but they are not how people actually reason. A detective doesn't list all 1024 combinations of ten clues. She says: "The thief had a key. Only the manager and the cleaner had keys. The cleaner was abroad. So the manager is the thief." Each step uses a small, trusted pattern to go from facts she has to a fact she didn't have.

Those trusted patterns are **rules of inference**. They are the moves of the game called proof. Learning them gives you a vocabulary for exactly why an argument is correct, and, just as importantly, a way to spot arguments that only look correct.

### Arguments, premises and validity
An **argument** is a list of statements called **premises** followed by a **conclusion**. We write it as
$$p_1,\ p_2,\ \dots,\ p_k\ \therefore\ c$$
where $\therefore$ means "therefore". The argument is **valid** when it is impossible for all the premises to be true while the conclusion is false. In the language of the previous lesson: the argument is valid exactly when $(p_1\land p_2\land\cdots\land p_k)\to c$ is a tautology.

Validity is about the *form* of the argument, not about whether the premises are actually true. "All cats can fly; Tom is a cat; therefore Tom can fly" is perfectly valid: *if* the premises were true, the conclusion would have to be. It is just not **sound**, because a premise is false. A sound argument is a valid argument with true premises, and only sound arguments guarantee true conclusions.

:::def Valid argument
An argument whose conclusion is true in every case where all its premises are true; equivalently, (conjunction of premises) $\to$ conclusion is a tautology.
:::

:::def Sound argument
A valid argument whose premises are all actually true. Its conclusion is therefore true.
:::

### Modus ponens: the workhorse
The most used rule of all has a Latin name, **modus ponens** ("the mode that affirms"):
$$p\to q,\quad p\quad\therefore\ q$$
"If it rains, the match is cancelled. It is raining. Therefore the match is cancelled." Why is it valid? The only row where $p\to q$ and $p$ are both true is $p = \mathrm{T}$, $q = \mathrm{T}$, and in that row $q$ is true. Every time you apply a theorem ("if a triangle is right-angled then $a^2+b^2=c^2$; this triangle is right-angled; so…") you are using modus ponens.

### Modus tollens: reasoning backwards
**Modus tollens** ("the mode that denies") runs the implication in reverse through its contrapositive:
$$p\to q,\quad\neg q\quad\therefore\ \neg p$$
"If the battery were charged, the phone would turn on. It doesn't turn on. So the battery isn't charged." This works because $p\to q\equiv\neg q\to\neg p$, and then it's just modus ponens on the contrapositive. Scientists use it to reject theories: if the theory predicts an observation and the observation fails, the theory is wrong.

### Syllogisms: chaining and choosing
**Hypothetical syllogism** chains implications: $p\to q,\ q\to r\ \therefore\ p\to r$. If studying leads to understanding and understanding leads to good marks, then studying leads to good marks. Long proofs are often a single hypothetical syllogism stretched over many links.

**Disjunctive syllogism** eliminates an option: $p\lor q,\ \neg p\ \therefore\ q$. "The key is in my bag or my coat. It's not in my bag. So it's in my coat." This is the detective's move.

### The small but useful rules
A few rules look almost too obvious to name, but proofs use them all the time. **Simplification**: from $p\land q$ you may conclude $p$. **Conjunction**: from $p$ and $q$ separately you may conclude $p\land q$. **Addition**: from $p$ you may conclude $p\lor q$ for *any* $q$ (if "it's Monday" is true, then "it's Monday or it's snowing" is true).

### Resolution: one rule for computers
Computers like a single, uniform rule. **Resolution** says
$$p\lor q,\quad\neg p\lor r\quad\therefore\ q\lor r$$
Why? Either $p$ is true, in which case $\neg p$ is false and $r$ must hold, or $p$ is false, in which case $q$ must hold. Either way $q\lor r$. Disjunctive syllogism is the special case where $r$ is missing. Resolution is the engine of automated theorem provers, the logic language Prolog, and modern SAT solvers.

### Two famous fallacies
A **fallacy** is an argument pattern that looks valid but isn't. Two of them are mirror images of the good rules above.

**Affirming the consequent**: $p\to q,\ q\ \therefore\ p$. "If it rained, the grass is wet. The grass is wet. So it rained." But a sprinkler could have wet the grass. The row $p = \mathrm{F}$, $q = \mathrm{T}$ makes both premises true and the conclusion false, so the form is invalid.

**Denying the antecedent**: $p\to q,\ \neg p\ \therefore\ \neg q$. "If you're a doctor, you studied biology. You're not a doctor. So you didn't study biology." Again, the same row $p = \mathrm{F}$, $q = \mathrm{T}$ breaks it.

To prove an argument form invalid you only need one **counterexample row**: an assignment making every premise true and the conclusion false.

### Putting rules together
Here is a short formal deduction. Premises: (1) $p\to q$, (2) $q\to r$, (3) $\neg r$. Goal: $\neg p$. From (1) and (2) by hypothetical syllogism, (4) $p\to r$. From (4) and (3) by modus tollens, (5) $\neg p$. Each line is justified by a rule and earlier lines; that is all a formal proof is.

:::warn Common mistakes
Treating a valid argument as proof that the conclusion is true (you also need true premises). Affirming the consequent, which is everywhere in advertising and politics. And skipping the justification for a step: in a formal proof every line must cite a premise or a rule.
:::

### Summary
An argument is valid when true premises force a true conclusion. The core rules are modus ponens, modus tollens, hypothetical and disjunctive syllogism, simplification, conjunction, addition and resolution. The fallacies of affirming the consequent and denying the antecedent are invalid, and a single counterexample row shows it. In the proof-technique lessons later, these rules are the steps inside every proof.

@viz truth-table expr=((p_->_q)_&_p)_->_q | Turn an argument into "premises → conclusion" and check whether it's a tautology.

:::explore
**What to try**
1. Read the loaded modus ponens check $((p\to q)\land p)\to q$: all rows T.
2. Change it to modus tollens: `((p -> q) & !q) -> !p`.
3. Now type the fallacy `((p -> q) & q) -> p` and find the F row.
4. Try resolution: `((p | q) & (!p | r)) -> (q | r)`.

**What to notice:** a valid rule is a tautology. Each fallacy has exactly one failing row, $p = \mathrm{F}$, $q = \mathrm{T}$, and that row is the counterexample described in the article (the sprinkler, the non-doctor biology student).
:::

:::formulas
| Rule | Premises | Conclusion |
|---|---|---|
| Modus ponens | $p\to q,\ p$ | $q$ |
| Modus tollens | $p\to q,\ \neg q$ | $\neg p$ |
| Hypothetical syllogism | $p\to q,\ q\to r$ | $p\to r$ |
| Disjunctive syllogism | $p\lor q,\ \neg p$ | $q$ |
| Simplification | $p\land q$ | $p$ |
| Conjunction | $p,\ q$ | $p\land q$ |
| Addition | $p$ | $p\lor q$ |
| Resolution | $p\lor q,\ \neg p\lor r$ | $q\lor r$ |

$$\text{valid}\iff(p_1\land\cdots\land p_k)\to c\ \text{is a tautology}$$
:::

:::thm Resolution is valid
$((p\lor q)\land(\neg p\lor r))\to(q\lor r)$ is a tautology.
:::

:::proof
Suppose both premises are true. Case $p = \mathrm{T}$: then $\neg p$ is F, so for $\neg p\lor r$ to be true, $r$ must be T, hence $q\lor r$ is T. Case $p = \mathrm{F}$: then for $p\lor q$ to be true, $q$ must be T, hence $q\lor r$ is T. In every case where the premises hold, the conclusion holds.
:::

:::steps Deduce $s$ from: $p\lor q$, $\neg p$, $q\to r$, $r\to s$
1. From $p\lor q$ and $\neg p$, disjunctive syllogism gives $q$.
2. From $q\to r$ and $r\to s$, hypothetical syllogism gives $q\to s$.
3. From $q\to s$ and $q$, modus ponens gives $s$.
:::

:::steps Is "If I study, I pass. I passed. So I studied." valid?
1. Symbolise: $s\to p,\ p\ \therefore\ s$. This is affirming the consequent.
2. Look for a counterexample row: premises true, conclusion false, so $s = \mathrm{F}$.
3. With $s = \mathrm{F}$, $s\to p$ is T for any $p$. Choose $p = \mathrm{T}$ so the second premise holds.
4. Row $s = \mathrm{F}$, $p = \mathrm{T}$ makes both premises T and the conclusion F. **Invalid**.
:::

:::mock Exam question
Premises: "If the code compiles, the tests run." "If the tests run, a report is emailed." "No report was emailed." What can you conclude about whether the code compiled? Name each rule you use.
:::solution
Let $c$: compiles, $t$: tests run, $e$: report emailed. Premises $c\to t$, $t\to e$, $\neg e$. Hypothetical syllogism gives $c\to e$. Modus tollens with $\neg e$ gives $\neg c$: **the code did not compile**.
:::
:::

:::cs
**Resolution** is how Prolog answers queries and how SAT solvers learn new clauses while they search. Type checkers and static analysers chain inference rules to prove facts like "this variable is never null here". In security, access-control engines evaluate policies ("if role = admin then allow") by forward chaining with modus ponens.
:::

:::ml
Classic expert systems and knowledge graphs infer new facts with modus ponens ("if X is a parent of Y and Y is a parent of Z, then X is a grandparent of Z"). Modern neuro-symbolic systems and reasoning benchmarks for large language models test exactly these rules, and models often fall for affirming the consequent, so knowing the valid forms helps you evaluate them.
:::

:::real
Medical tests show both patterns. "If you have the disease, the test is positive; the test is negative; so you don't have it" is modus tollens (valid, assuming the test never misses). "The test is positive, so you have the disease" is affirming the consequent: false positives exist.
:::

:::quiz
? From $p\to q$ and $\neg q$ you can conclude...
+ $\neg p$
- $p$
- $q$
> Modus tollens: if $p$ held, $q$ would hold; $q$ doesn't, so $p$ doesn't.

? "If it's a square, it has four sides. This shape has four sides, so it's a square." This is...
- modus ponens
+ affirming the consequent (invalid)
- disjunctive syllogism
> The argument has the form $p\to q,\ q\ \therefore\ p$. A rectangle that isn't a square is a counterexample.

? Resolution on $p\lor q$ and $\neg p\lor r$ gives...
+ $q\lor r$
- $q\land r$
- $p\lor r$
> The clashing pair $p$, $\neg p$ cancels and the leftovers are joined with OR.

? Can a valid argument have a false conclusion?
+ Yes, if some premise is false
- No, never
> Validity only guarantees the conclusion when all premises are true. With a false premise, a valid argument can reach a false conclusion.

? How many counterexample rows are needed to show an argument form is invalid?
= 1
> One assignment with all premises true and the conclusion false is enough.
:::

# Unit: Predicate logic

## Lesson: Predicates and quantifiers {#quantifiers}
@summary: Statements with variables, "for all" and "there exists", nested quantifiers, and how to negate them correctly.

### When propositions are not enough
Propositional logic treats "Socrates is mortal" as a single letter $p$. That works until you want to say something about *many* objects at once. "Every student in this class passed." "Some number is bigger than a million." "Every number has a number bigger than it." You can't write these with a fixed, finite list of letters, because they talk about all members of a collection, possibly an infinite one.

Mathematics is full of such sentences. The definition of a limit, the definition of Big-O, and the statement of nearly every theorem begin with "for every" or "there exists". Predicate logic adds exactly the two words needed to say them, and the rules for handling them precisely.

### Predicates: statements with blanks
A **predicate** is a statement with one or more blanks, written like a function: $P(x)$ = "$x$ is even". On its own, $P(x)$ is neither true nor false. Plug in a value and it becomes a proposition: $P(4)$ is true and $P(7)$ is false. Predicates can have several variables: $L(x, y)$ = "$x < y$" gives $L(2, 5)$ true and $L(5, 2)$ false.

Every predicate comes with a **domain** (also called the universe of discourse): the set of values the variable may take. The domain matters a lot. "$x^2 = 2$ has a solution" is true if $x$ ranges over the real numbers and false if $x$ ranges over the integers.

:::def Predicate
A statement $P(x_1,\dots,x_n)$ containing variables, which becomes a proposition once each variable is given a value from its domain.
:::

### The universal quantifier: for all
$\forall x\,P(x)$ means "for every $x$ in the domain, $P(x)$ is true". The symbol $\forall$ is an upside-down A, for "all". Imagine a teacher who says "everyone in this room has a pencil". To check, she must look at every single student. One student without a pencil makes the statement false.

If the domain is a finite set $\{a_1, a_2, \dots, a_n\}$, then $\forall x\,P(x)$ is just a long AND:
$$\forall x\,P(x)\equiv P(a_1)\land P(a_2)\land\cdots\land P(a_n).$$
For example, with domain $\{1, 2, 3\}$ and $P(x)$ = "$x < 5$", the statement is $T\land T\land T = \mathrm{T}$.

### The existential quantifier: there exists
$\exists x\,P(x)$ means "there is at least one $x$ in the domain with $P(x)$ true". The symbol $\exists$ is a backwards E, for "exists". To check "someone in this room has a pencil", the teacher only needs to find one. Over a finite domain it is a long OR:
$$\exists x\,P(x)\equiv P(a_1)\lor P(a_2)\lor\cdots\lor P(a_n).$$
With domain $\{1, 2, 3\}$ and $P(x)$ = "$x > 2$", the statement is $F\lor F\lor T = \mathrm{T}$, and the value $x = 3$ is called a **witness**.

:::def Universal quantifier
$\forall x\,P(x)$: "for all $x$ in the domain, $P(x)$". True when $P(x)$ holds for every element; false if there is even one counterexample.
:::

:::def Existential quantifier
$\exists x\,P(x)$: "there exists an $x$ in the domain with $P(x)$". True when at least one element (a witness) satisfies $P$.
:::

### Negating quantifiers
What is the opposite of "every student passed"? Not "every student failed", but "**some** student failed". And the opposite of "some student cheated" is "**no** student cheated", which means "every student did not cheat". In symbols:
$$\neg\forall x\,P(x)\equiv\exists x\,\neg P(x)\qquad\neg\exists x\,P(x)\equiv\forall x\,\neg P(x).$$
The rule of thumb: when a NOT passes through a quantifier, the quantifier flips ($\forall\leftrightarrow\exists$) and the NOT moves inward. Over a finite domain this is just De Morgan's law applied to the long AND or OR.

This is why one counterexample destroys a universal claim. "All swans are white" was believed in Europe for centuries; a single black swan in Australia made it false, because $\neg\forall x\,W(x)\equiv\exists x\,\neg W(x)$.

### Restricted quantifiers
Often we quantify over part of a domain: "every prime greater than 2 is odd". We write this as $\forall x\,(\text{Prime}(x)\land x > 2\to\text{Odd}(x))$. Notice the arrow. For "some", we use AND instead: "some prime is even" is $\exists x\,(\text{Prime}(x)\land\text{Even}(x))$. Mixing these up is a classic error. $\exists x\,(\text{Prime}(x)\to\text{Even}(x))$ is true for silly reasons: take $x = 4$, which isn't prime, so the implication is vacuously true.

### Nested quantifiers and why order matters
Statements with two variables can have two quantifiers. Read them left to right, like a game between two players. In $\forall x\,\exists y\,P(x, y)$, an opponent picks any $x$ first, and then you get to pick a $y$ that works *for that $x$*. In $\exists y\,\forall x\,P(x, y)$, you must commit to one $y$ first, and then it must work against every $x$ the opponent can throw at you.

Take integers and $P(x, y)$ = "$y > x$". $\forall x\,\exists y\,(y > x)$ is true: whatever $x$ is chosen, answer $y = x + 1$. But $\exists y\,\forall x\,(y > x)$ claims there is one integer bigger than every integer, including itself, which is false. Swapping the quantifiers changed the meaning completely.

Two quantifiers of the *same* kind can be swapped freely: $\forall x\,\forall y$ is the same as $\forall y\,\forall x$, and likewise for $\exists$.

To negate a nested statement, flip every quantifier from the outside in and negate the predicate at the end: $\neg\forall x\,\exists y\,P(x, y)\equiv\exists x\,\forall y\,\neg P(x, y)$.

:::warn Common mistakes
Negating "all are" as "all are not" (it should be "some are not"). Using $\land$ with $\forall$ or $\to$ with $\exists$ in restricted statements. Swapping the order of different quantifiers. And forgetting the domain, which can change a statement from true to false.
:::

### Translating English into quantifiers
Much of the difficulty with quantifiers is translation. A reliable recipe is to find the domain, name the predicates, and then decide which quantifier each phrase signals. "Every", "all", "each" and "any" usually mean $\forall$; "some", "there is", "at least one" mean $\exists$. Restricted phrases follow a fixed pattern: "every student passed" is $\forall x\,(S(x)\to P(x))$ with an implication, while "some student passed" is $\exists x\,(S(x)\land P(x))$ with a conjunction. Swapping these is the most common error. $\exists x\,(S(x)\to P(x))$ is true as soon as there is any non-student, which is not what anyone means.

Negative phrases need care. "No student failed" is $\forall x\,(S(x)\to\neg F(x))$, equivalently $\neg\exists x\,(S(x)\land F(x))$. "Not every student failed" is $\neg\forall x\,(S(x)\to F(x))$, which becomes $\exists x\,(S(x)\land\neg F(x))$: some student did not fail. Reading the formula back into plain English is the best check that your translation says what you meant.

### Summary
A predicate is a statement with variables. $\forall$ means "for every" (a big AND), $\exists$ means "for at least one" (a big OR). Negation flips each quantifier and pushes the NOT inside, which is why a single counterexample disproves a "for all" claim. In nested statements, order matters when the quantifiers differ: $\forall x\,\exists y$ lets $y$ depend on $x$; $\exists y\,\forall x$ does not.

@viz truth-table expr=!(a_&_b_&_c)_<->_(!a_∨_!b_∨_!c) | Over the domain {1, 2, 3}, let a, b, c stand for P(1), P(2), P(3). Then ∀x P(x) is a ∧ b ∧ c.

:::explore
**What to try**
1. The loaded formula checks $\neg\forall x\,P(x)\leftrightarrow\exists x\,\neg P(x)$ on a three-element domain, with `a & b & c` playing the role of $\forall$. Confirm every row is T.
2. Change it to the wrong negation `!(a & b & c) <-> (!a & !b & !c)` ("all are not") and find the failing rows.
3. Type `!(a | b | c) <-> (!a & !b & !c)`, which is $\neg\exists\equiv\forall\neg$.
4. Type `a & b & c` alone and count how many of the 8 rows are T.

**What to notice:** "for all" over a finite domain really is a big AND and "exists" is a big OR, so quantifier negation is De Morgan's law. The wrong version fails in the 6 rows where some but not all of $P(1), P(2), P(3)$ hold, exactly the "some student failed, but not all" situations. Only 1 of 8 rows makes a universal statement true, which is why a single counterexample is enough to break it.
:::

:::formulas
$$\neg\forall x\,P(x)\equiv\exists x\,\neg P(x)\qquad\neg\exists x\,P(x)\equiv\forall x\,\neg P(x)$$
$$\forall x\,(P(x)\land Q(x))\equiv\forall x\,P(x)\land\forall x\,Q(x)\qquad\exists x\,(P(x)\lor Q(x))\equiv\exists x\,P(x)\lor\exists x\,Q(x)$$
$$\text{"every } A \text{ is } B\text{"}:\ \forall x\,(A(x)\to B(x))\qquad\text{"some } A \text{ is } B\text{"}:\ \exists x\,(A(x)\land B(x))$$
$$\exists y\,\forall x\,P(x,y)\ \Rightarrow\ \forall x\,\exists y\,P(x,y)\quad\text{(the converse can fail)}$$
:::

:::thm Quantifier swap in one direction
If $\exists y\,\forall x\,P(x, y)$ is true, then $\forall x\,\exists y\,P(x, y)$ is true.
:::

:::proof
Suppose some $y_0$ satisfies $P(x, y_0)$ for every $x$. Now take any $x$. We need some $y$ with $P(x, y)$: choose $y = y_0$. So for every $x$ a suitable $y$ exists. The reverse fails: on the integers, $\forall x\,\exists y\,(y > x)$ is true but $\exists y\,\forall x\,(y > x)$ is false.
:::

:::steps Negate "every student passed some exam"
1. Symbolise: $\forall s\,\exists e\,\text{Passed}(s, e)$.
2. Push the negation through the first quantifier: $\exists s\,\neg\exists e\,\text{Passed}(s, e)$.
3. Through the second: $\exists s\,\forall e\,\neg\text{Passed}(s, e)$.
4. In English: "some student failed every exam".
:::

:::steps Decide the truth of $\forall x\,\exists y\,(x + y = 0)$ over $\mathbb{Z}$, then over $\mathbb{N}$
1. Over $\mathbb{Z}$: for any $x$, choose $y = -x$. Then $x + y = 0$. True.
2. Over $\mathbb{N} = \{0, 1, 2,\dots\}$: try $x = 1$. We'd need $y = -1$, which is not in $\mathbb{N}$.
3. So $x = 1$ is a counterexample, and the statement is false over $\mathbb{N}$. The domain changed the answer.
:::

:::steps Write "$f$ is bounded" and its negation
1. Bounded means some number $M$ beats every $|f(x)|$: $\exists M\,\forall x\,(|f(x)|\le M)$.
2. Negate: $\forall M\,\exists x\,(|f(x)| > M)$.
3. In English: however large a bound you propose, some input exceeds it. For example $f(x) = x$ is unbounded: given $M$, take $x = M + 1$.
:::

:::mock Exam question
Over the domain of real numbers, consider $S$: $\forall\varepsilon > 0\ \exists\delta > 0\ \forall x\ (|x| < \delta\to|3x| < \varepsilon)$. (a) Write the negation of $S$ with no $\neg$ in front of a quantifier. (b) Is $S$ true? Justify.
:::solution
(a) $\exists\varepsilon > 0\ \forall\delta > 0\ \exists x\ (|x| < \delta\land|3x|\ge\varepsilon)$. (Negating $A\to B$ gives $A\land\neg B$.)
(b) True. Given $\varepsilon > 0$, choose $\delta = \varepsilon/3$. If $|x| < \delta$ then $|3x| = 3|x| < 3\delta = \varepsilon$. This is the $\varepsilon$–$\delta$ proof that $3x\to0$ as $x\to0$.
:::
:::

:::cs
SQL is predicate logic. A `WHERE` clause is a predicate, `EXISTS (subquery)` is $\exists$, and "for all" is written as `NOT EXISTS (... WHERE NOT ...)`, using $\forall x\,P\equiv\neg\exists x\,\neg P$. Big-O is a nested quantifier statement: $f\in O(g)$ means $\exists c > 0\ \exists n_0\ \forall n\ge n_0\ (f(n)\le c\,g(n))$. Python's `all()` and `any()` are $\forall$ and $\exists$ over a finite list.
:::

:::ml
Robustness guarantees for neural networks are quantified statements: "for all inputs $x'$ with $\|x' - x\|\le\epsilon$, the predicted class equals the class of $x$". An adversarial example is precisely a witness for the negation, $\exists x'$ with $\|x'-x\|\le\epsilon$ and a different prediction. Generalisation bounds in learning theory also begin "for all $\delta > 0$, with probability at least $1-\delta$, for all hypotheses $h$…".
:::

:::real
"Some flights are delayed" and "all flights are delayed" are very different claims, and so are "every passenger has a seat" and "there is a seat for every passenger" in a booking system. Overbooking happens when the airline only guarantees the weaker statement. Lawyers and contract writers think carefully about the order of "every" and "some".
:::

:::quiz
? The negation of $\forall x\,(x^2\ge0)$ is...
+ $\exists x\,(x^2 < 0)$
- $\forall x\,(x^2 < 0)$
- $\exists x\,(x^2\ge0)$
> Flip $\forall$ to $\exists$ and negate the inside: $\neg(x^2\ge 0)$ is $x^2 < 0$.

? Over the integers, $\exists y\,\forall x\,(y > x)$ is...
- true
+ false
> It claims one integer exceeds every integer, including itself. No such integer exists.

? "Some dogs are brown" is best written as...
+ $\exists x\,(D(x)\land B(x))$
- $\exists x\,(D(x)\to B(x))$
- $\forall x\,(D(x)\to B(x))$
> For "some", use AND. The implication version is true even if no dog is brown, as long as some non-dog exists.

? Domain $\{1, 2, 3, 4\}$, $P(x)$ = "$x$ is odd". How many witnesses does $\exists x\,P(x)$ have?
= 2
> $x = 1$ and $x = 3$ both make $P(x)$ true.

? Which is the negation of $\forall x\,\exists y\,P(x, y)$?
- $\forall x\,\exists y\,\neg P(x, y)$
+ $\exists x\,\forall y\,\neg P(x, y)$
- $\exists y\,\forall x\,\neg P(x, y)$
> Flip each quantifier from left to right and negate the predicate, keeping the variable order.

? Over the real numbers, is $\exists x\,(x^2 = 2)$ true?
+ Yes
- No
> $x = \sqrt2$ is a witness. Over the integers the same statement would be false.
:::

# Unit: Proof techniques

## Lesson: Direct proof and proof by contrapositive {#direct-proof}
@summary: What a proof is, how to write one from definitions, and when proving the contrapositive is easier.

### What a proof is, and why examples aren't enough
Try this: $n^2 + n + 41$ is prime for $n = 0$ (41), $n = 1$ (43), $n = 2$ (47), $n = 3$ (53), and in fact for every $n$ from 0 up to 39. Forty examples in a row! Is it prime for every $n$? No: at $n = 40$ it equals $40^2 + 40 + 41 = 1681 = 41^2$. Forty confirming examples proved nothing.

That is why mathematicians and computer scientists insist on **proofs**. A proof is a chain of statements, each one justified by a definition, an earlier theorem, or a rule of inference, that ends in the claim. Once a statement is proved, it holds in *every* case, including the billions you never tried. When you verify that an algorithm is correct, or that a cryptographic protocol is secure, examples are not enough; you need the argument.

This lesson covers the two most common ways to prove an implication "if $P$ then $Q$".

### The structure of a direct proof
Most theorems have the form $P\to Q$: "if $n$ is odd, then $n^2$ is odd"; "if a graph is a tree, then it has one fewer edge than vertices". A **direct proof** follows the shape of modus ponens:

1. **Assume** $P$ is true. (If $P$ is false, the implication is automatically true, so this is the only case that needs work.)
2. **Unpack** $P$ using definitions, turning words into algebra.
3. **Manipulate** using algebra and known facts.
4. **Arrive** at a form that matches the definition of $Q$.

The whole craft lies in step 2. Most beginner proofs fail not because the algebra is hard, but because a definition wasn't written down.

### Definitions you will need
Proofs about integers rely on a few precise definitions. An integer $n$ is **even** if $n = 2k$ for some integer $k$, and **odd** if $n = 2k + 1$ for some integer $k$. Every integer is exactly one of these. An integer $a$ **divides** $b$, written $a\mid b$, if $b = ak$ for some integer $k$; for example $3\mid 12$ because $12 = 3\cdot4$. A real number is **rational** if it equals $p/q$ for integers $p, q$ with $q\ne0$.

Notice that every definition contains "for some integer $k$". That phrase is a hidden $\exists$, and it tells you what to write: "Let $n = 2k$ where $k$ is an integer."

### A first direct proof
**Claim.** If $n$ is odd, then $n^2$ is odd.

Assume $n$ is odd. By definition, $n = 2k + 1$ for some integer $k$. Then
$$n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1.$$
The number $m = 2k^2 + 2k$ is an integer (integers are closed under multiplication and addition), so $n^2 = 2m + 1$, which is the definition of odd. Done.

Check it with a number: $n = 7 = 2(3) + 1$, so $k = 3$, $m = 2(9) + 6 = 24$, and $n^2 = 49 = 2(24) + 1$. The algebra and the arithmetic agree.

Notice what we did *not* do: we didn't pick $n = 7$ and stop. We used a general $k$, so the argument covers every odd number at once.

### Another: divisibility is transitive
**Claim.** If $a\mid b$ and $b\mid c$, then $a\mid c$.

Assume $a\mid b$ and $b\mid c$. Then $b = aj$ and $c = bk$ for some integers $j, k$. (Use *different* letters: there is no reason the two multipliers are equal.) Substituting, $c = (aj)k = a(jk)$, and $jk$ is an integer, so $a\mid c$. For instance, $2\mid 6$ and $6\mid 18$, and indeed $18 = 2\cdot 9$.

### When direct proof gets stuck: the contrapositive
Now try: "if $n^2$ is even, then $n$ is even". Directly, we'd assume $n^2 = 2k$ and want to say something about $n$. But $n = \sqrt{2k}$ is a dead end: square roots don't preserve evenness in any obvious way.

Recall from the first lesson that $P\to Q$ is logically equivalent to its **contrapositive** $\neg Q\to\neg P$. So instead we may prove: "if $n$ is **not** even, then $n^2$ is **not** even", which is "if $n$ is odd then $n^2$ is odd". We already proved that! So the original statement is true too.

This is **proof by contrapositive**. It helps whenever the negated conclusion $\neg Q$ gives you something concrete to work with ($n = 2k + 1$) and the hypothesis $P$ doesn't. A good signal: the hypothesis involves a complicated expression ($n^2$, $3n + 7$, $xy$) and the conclusion involves a simple one ($n$, $x$).

### Proving an "if and only if"
A biconditional $P\leftrightarrow Q$ is two implications. Prove $P\to Q$ and $Q\to P$ separately, possibly with different methods. "$n$ is even iff $n^2$ is even": the forward direction is direct ($n = 2k$ gives $n^2 = 2(2k^2)$), and the backward direction is the contrapositive proof above.

### Disproving with a counterexample
To show a universal claim is false, give one specific counterexample, as with $n = 40$ above. "Every odd number is prime" fails at 9. A counterexample is a complete disproof; no further argument is needed.

:::def Direct proof
A proof of $P\to Q$ that assumes $P$ and derives $Q$ through a chain of justified steps.
:::

:::def Proof by contrapositive
A proof of $P\to Q$ obtained by giving a direct proof of the equivalent statement $\neg Q\to\neg P$.
:::

:::def Counterexample
A specific case where the hypothesis of a universal claim holds but the conclusion fails, which proves the claim false.
:::

:::tip How to start any proof
Write "Assume …" with the hypothesis, then translate every term with its definition, using a fresh variable for each "for some". Write down what you want to reach as a target. Work forwards from the assumption and backwards from the target until they meet. If you're stuck, try the contrapositive.
:::

:::warn Common mistakes
Proving with an example ("it works for 7") instead of a general $k$. Reusing the same letter for two different unknowns ($a = 2k$, $b = 2k$ would force $a = b$). Assuming the conclusion and working towards the hypothesis, which proves the converse, not the theorem. And confusing the contrapositive ($\neg Q\to\neg P$, valid) with the inverse ($\neg P\to\neg Q$, not valid).
:::

### Summary
A proof establishes a statement for all cases; examples cannot. A direct proof of $P\to Q$ assumes $P$, unpacks definitions and derives $Q$. When the negated conclusion is easier to use than the hypothesis, prove the contrapositive $\neg Q\to\neg P$ instead. Biconditionals need both directions, and a single counterexample disproves a universal claim.

@viz truth-table expr=(p_->_q)_<->_(!q_->_!p) | This tautology is the logical reason a proof by contrapositive is allowed.

:::explore
**What to try**
1. Confirm the loaded formula is T in every row: an implication and its contrapositive always agree.
2. Change the right side to the inverse, `(p -> q) <-> (!p -> !q)`, and find the rows where it fails.
3. Type `(p -> q) & (q -> p) <-> (p <-> q)` to see why an "iff" proof needs both directions.

**What to notice:** because the first formula is a tautology, proving $\neg Q\to\neg P$ is just as good as proving $P\to Q$. The inverse is not equivalent, which is why "if $n$ is not odd then $n^2$ is not odd" would be a different claim from the theorem in the article.
:::

@viz modular m=2 k=1 | Set m = 2 to see the integers split into even (0) and odd (1). Try k = 3, 5, 7 with m = 2.

:::explore
**What to try**
1. With $m = 2$, change $k$ to 3, then 5. Each $i$ is sent to $ki \bmod 2$.
2. Set $k = 2$ or $k = 4$ and see every point land on 0.

**What to notice:** multiplying by an odd $k$ keeps the parity of $i$ (odd times odd is odd, odd times even is even), while an even $k$ makes everything even. That is the same fact the article proves with $2k + 1$ algebra; the picture shows it, and the proof guarantees it for every integer.
:::

:::formulas
$$n\text{ even}\iff n = 2k,\quad n\text{ odd}\iff n = 2k + 1\quad(k\in\mathbb{Z})$$
$$a\mid b\iff b = ak\text{ for some }k\in\mathbb{Z}$$
$$P\to Q\ \equiv\ \neg Q\to\neg P\qquad P\leftrightarrow Q\ \equiv\ (P\to Q)\land(Q\to P)$$
:::

:::thm Parity of a square
For every integer $n$: $n$ is even if and only if $n^2$ is even.
:::

:::proof
($\Rightarrow$, direct) If $n = 2k$ then $n^2 = 4k^2 = 2(2k^2)$, which is even. ($\Leftarrow$, contrapositive) Suppose $n$ is odd, $n = 2k+1$. Then $n^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$, which is odd. So if $n^2$ is even, $n$ cannot be odd, hence $n$ is even.
:::

:::thm Sum of two odds
The sum of two odd integers is even.
:::

:::proof
Let $a = 2j + 1$ and $b = 2k + 1$. Then $a + b = 2j + 2k + 2 = 2(j + k + 1)$, which is 2 times an integer, so it is even.
:::

:::steps Prove: if $a\mid b$ and $a\mid c$, then $a\mid(b + c)$
1. Assume $b = aj$ and $c = ak$ for integers $j, k$.
2. Add: $b + c = aj + ak = a(j + k)$.
3. $j + k$ is an integer, so by definition $a\mid(b + c)$. Example: $5\mid 10$, $5\mid 35$, and $5\mid 45$.
:::

:::steps Prove: if $3n + 2$ is odd, then $n$ is odd
1. Direct is awkward, so use the contrapositive: if $n$ is even, then $3n + 2$ is even.
2. Let $n = 2k$. Then $3n + 2 = 6k + 2 = 2(3k + 1)$.
3. $3k + 1$ is an integer, so $3n + 2$ is even. The contrapositive holds, so the original statement holds.
:::

:::steps Prove: the product of two rational numbers is rational
1. Let $x = \frac ab$ and $y = \frac cd$ with integers $a, b, c, d$ and $b, d\ne 0$.
2. Then $xy = \frac{ac}{bd}$.
3. $ac$ and $bd$ are integers, and $bd\ne0$ because neither factor is 0. So $xy$ is rational.
:::

:::mock Exam question
(a) Prove that if $n$ is an integer and $n^2 + 5$ is odd, then $n$ is even. (b) Disprove: "for every integer $n$, $n^2 - n + 11$ is prime."
:::solution
(a) Contrapositive: suppose $n$ is odd, $n = 2k + 1$. Then $n^2 + 5 = 4k^2 + 4k + 6 = 2(2k^2 + 2k + 3)$, which is even. So if $n^2 + 5$ is odd, $n$ is not odd, i.e. $n$ is even.
(b) Counterexample $n = 11$: $121 - 11 + 11 = 121 = 11^2$, which is not prime.
:::
:::

:::cs
Proving code correct uses direct proofs: "if the input array is sorted, binary search returns the index of the target or −1" is shown by assuming sortedness and reasoning about each step. Proof assistants such as Lean, Coq and Isabelle check every step of a proof mechanically; they are used to verify compilers (CompCert), operating-system kernels (seL4) and cryptographic libraries.
:::

:::ml
Many ML results are short direct proofs: "if each loss term is convex, then their sum is convex" (assume the convexity inequality for each, add them), or "if a matrix is $A^\top A$, then it is positive semidefinite" (assume the form, compute $x^\top A^\top Ax = \|Ax\|^2\ge0$). Reading ML papers is much easier once this proof pattern is familiar.
:::

:::real
Engineers use the contrapositive when debugging: "if the network were working, the ping would succeed; the ping fails; so the network is not working". And the $n^2 + n + 41$ story is a real lesson: a pattern that holds for the first 40 cases can still fail, which is why safety-critical claims need proofs, not just tests.
:::

:::quiz
? To prove "if $n^2$ is odd then $n$ is odd" by contrapositive, you assume...
+ $n$ is even
- $n^2$ is even
- $n$ is odd
> The contrapositive of $P\to Q$ is $\neg Q\to\neg P$. Here $Q$ is "$n$ is odd", so you assume $n$ is not odd, i.e. even.

? In a direct proof that "the product of two even numbers is even", how should you start?
- Let $a = 2k$ and $b = 2k$
+ Let $a = 2j$ and $b = 2k$ for integers $j, k$
- Let $a = 4$ and $b = 6$
> Use different letters so the two numbers can be different. Specific numbers would only be an example.

? $n^2 + n + 41$ is prime for $n = 0,\dots,39$. What does that prove about all $n$?
- It is prime for all $n$
+ Nothing: $n = 40$ is a counterexample
> $40^2 + 40 + 41 = 1681 = 41^2$. Examples never prove a universal statement.

? Write $27$ as $2k + 1$. What is $k$?
= 13
> $2(13) + 1 = 27$, so 27 is odd.

? To prove $P\leftrightarrow Q$ you must prove...
- only $P\to Q$
+ both $P\to Q$ and $Q\to P$
- $\neg P\to\neg Q$ only
> A biconditional is two implications. (Proving $\neg P\to\neg Q$ is the same as proving $Q\to P$, so that could replace one direction.)
:::

## Lesson: Proof by contradiction and proof by cases {#contradiction}
@summary: Assume the opposite and reach an impossibility; or split a problem into cases that cover everything.

### A different strategy: rule out the alternative
Imagine you're told a coin is hidden in one of two boxes, and you open the left box and find it empty. You know the coin is in the right box without ever opening it. You didn't find the coin; you showed that the only alternative is impossible.

Proof by contradiction works the same way. Instead of building a path from hypothesis to conclusion, you assume the statement is **false** and follow the consequences until something impossible happens: a number that is both even and odd, a fraction that is and isn't in lowest terms, a list that both contains everything and misses something. Since true assumptions can't lead to impossibilities, the assumption "the statement is false" must have been wrong. So the statement is true.

This method is especially powerful for statements that say something *doesn't* exist ("there is no largest prime", "$\sqrt2$ is not a fraction"), because "doesn't exist" gives you nothing to work with directly, while "suppose it does exist" hands you an object to experiment on.

### The logic behind it
Write the statement you want to prove as $P$. A proof by contradiction shows $\neg P\to F$, where $F$ is some contradiction, a statement of the form $C\land\neg C$. Look at the truth table of $\neg P\to F$: an implication with a false conclusion is true only when its hypothesis is false. So if $\neg P\to F$ is true, $\neg P$ must be false, which means $P$ is true. In symbols, $(\neg P\to F)\equiv P$.

The recipe:
1. Write "Suppose, for contradiction, that $P$ is false", and state $\neg P$ precisely (use the quantifier negation rules if $P$ has quantifiers).
2. Reason forward using definitions and known facts.
3. Reach a statement that contradicts something: an earlier line, the assumption, or a known fact.
4. Conclude "this is a contradiction, so $P$ is true".

### Example: there is no largest integer
Suppose, for contradiction, that there is a largest integer $N$. Then $N + 1$ is also an integer, and $N + 1 > N$. That contradicts $N$ being the largest. So no largest integer exists. Small, but it shows the shape.

### Example: $\sqrt2$ is irrational
Suppose, for contradiction, that $\sqrt2$ is rational: $\sqrt2 = \frac pq$ with integers $p, q$, $q\ne0$, and the fraction in **lowest terms** (no common factor bigger than 1). Every fraction can be reduced this way, so this costs us nothing.

Square both sides: $2 = \frac{p^2}{q^2}$, so $p^2 = 2q^2$. Thus $p^2$ is even, and by the previous lesson $p$ is even: $p = 2k$. Substitute: $4k^2 = 2q^2$, so $q^2 = 2k^2$, which means $q^2$ is even and so $q$ is even. Now $p$ and $q$ are both even, so they share the factor 2, contradicting lowest terms. Hence $\sqrt2$ is irrational.

The contradiction here is "$p/q$ is in lowest terms" together with "$p$ and $q$ share a factor of 2". Choosing lowest terms at the start was the clever move that made the contradiction possible.

### Example: there are infinitely many primes
This proof, from Euclid around 300 BCE, is one of the most famous in mathematics. Suppose, for contradiction, that there are only finitely many primes, $p_1, p_2, \dots, p_n$. Form the number
$$N = p_1p_2\cdots p_n + 1.$$
When you divide $N$ by any $p_i$, the remainder is 1, so no $p_i$ divides $N$. But every integer greater than 1 has at least one prime factor. That prime factor is not on our "complete" list. Contradiction, so there are infinitely many primes.

A common misreading is "so $N$ itself is prime". Not necessarily! With the first six primes, $N = 2\cdot3\cdot5\cdot7\cdot11\cdot13 + 1 = 30031 = 59\times509$. It isn't prime, but its prime factors 59 and 509 are missing from the list, which is all the proof needs.

### Contradiction versus contrapositive
Both methods start with a negation, so they're easy to mix up. To prove $P\to Q$ by **contrapositive**, you assume $\neg Q$ and must reach the specific target $\neg P$. By **contradiction**, you assume $P$ *and* $\neg Q$ together and may reach *any* impossibility. Contradiction is more flexible, but contrapositive proofs are often cleaner to read. If your "contradiction" proof ends with "so $\neg P$, contradicting $P$", it was really a contrapositive proof in disguise.

### Proof by cases
Sometimes a single argument doesn't fit every situation, but a few arguments together do. **Proof by cases** splits the possibilities into a list that is **exhaustive** (every situation falls into at least one case) and proves the claim in each case. The logic is the rule $(p_1\lor p_2)\land(p_1\to q)\land(p_2\to q)\to q$.

Example: $n^2 + n$ is always even. Every integer is even or odd, so two cases cover everything. If $n = 2k$, then $n^2 + n = 2k(2k + 1)$, a multiple of 2. If $n = 2k + 1$, then $n^2 + n = (2k + 1)(2k + 2) = 2(2k + 1)(k + 1)$, again a multiple of 2. Both cases give even, so the claim holds for all integers. (Quick check: $n = 5$ gives $30$.)

Common case splits are even/odd, positive/zero/negative, remainder 0, 1 or 2 when dividing by 3, and $x\ge y$ versus $x < y$. When cases look identical up to renaming, mathematicians write "**without loss of generality** (WLOG), assume $x\le y$" and do just one.

A special case is **proof by exhaustion**: when there are only finitely many objects, check each one. "Every integer from 1 to 10 can be written as a sum of at most two squares or is 3, 6 or 7" can be checked by listing them.

:::def Proof by contradiction
A proof of $P$ that assumes $\neg P$ and derives a contradiction (a statement that is both true and false), concluding that $P$ must hold.
:::

:::def Proof by cases
A proof that divides all possibilities into an exhaustive list of cases and proves the statement separately in each case.
:::

:::warn Common mistakes
Writing a negation incorrectly at the start (the negation of "all primes are odd" is "some prime is even", not "all primes are even"). Claiming a contradiction that isn't one. Missing a case, such as forgetting $n = 0$ or negative numbers. And in Euclid's proof, claiming $N$ must be prime.
:::

### Summary
Proof by contradiction assumes the statement is false and derives something impossible, which works because $(\neg P\to F)\equiv P$. It is the natural tool for "there is no…" and "infinitely many…" statements, as in the irrationality of $\sqrt2$ and the infinitude of primes. Proof by cases splits the possibilities into an exhaustive list and handles each one; the even/odd split is the most common.

@viz truth-table expr=(!p_->_F)_<->_p | F is the constant "false". This tautology is the logic of proof by contradiction.

:::explore
**What to try**
1. Confirm that $(\neg p\to F)\leftrightarrow p$ is T in both rows.
2. Change it to the proof-by-cases rule: `((a | b) & (a -> q) & (b -> q)) -> q`.
3. Break the cases rule by deleting one case: `((a | b) & (a -> q)) -> q`, and find the failing row.

**What to notice:** an implication into F can only be true if its hypothesis is false, so showing "not P leads to F" forces P. In the cases rule, dropping a case lets the row $a = \mathrm{F}$, $b = \mathrm{T}$, $q = \mathrm{F}$ slip through: that's what a missed case looks like in a proof.
:::

@viz sieve | Run the sieve. The primes thin out but never stop, which Euclid's proof guarantees forever.

:::explore
**What to try**
1. Press "Next prime" a few times and watch which multiples disappear.
2. Press "Run all" and count the primes left below 100.
3. Multiply the first few primes and add 1: $2\cdot3 + 1 = 7$, $2\cdot3\cdot5 + 1 = 31$. Find them on the grid.

**What to notice:** every crossed-out number has a smaller prime factor, the fact Euclid's proof relies on. The sieve can only show finitely many primes; the proof by contradiction is what tells you the list never ends.
:::

:::formulas
$$(\neg P\to F)\equiv P\qquad\text{contradiction: } C\land\neg C$$
$$\big((p_1\lor p_2)\land(p_1\to q)\land(p_2\to q)\big)\to q\quad\text{(cases)}$$
$$N = p_1p_2\cdots p_n + 1\ \text{ is not divisible by any } p_i$$
:::

:::thm Infinitude of primes (Euclid)
There are infinitely many prime numbers.
:::

:::proof
Suppose there are finitely many, $p_1,\dots,p_n$. Let $N = p_1\cdots p_n + 1 > 1$. Each $p_i$ leaves remainder 1 when dividing $N$, so none divides $N$. But $N$ has some prime factor $p$, and $p$ is not among $p_1,\dots,p_n$. This contradicts the list being complete.
:::

:::thm Irrationality of $\sqrt2$
There are no integers $p, q$ with $q\ne 0$ such that $(p/q)^2 = 2$.
:::

:::proof
Suppose $\sqrt 2 = p/q$ in lowest terms. Then $p^2 = 2q^2$, so $p$ is even, $p = 2k$, giving $q^2 = 2k^2$, so $q$ is even. Then 2 divides both $p$ and $q$, contradicting lowest terms.
:::

:::steps Prove $\log_2 3$ is irrational
1. Suppose $\log_2 3 = \frac pq$ with positive integers $p, q$ (it is positive since $3 > 1$).
2. Then $2^{p/q} = 3$, so $2^p = 3^q$.
3. The left side is even (since $p\ge1$); the right side is a product of odd numbers, so odd.
4. An integer can't be both even and odd. Contradiction, so $\log_2 3$ is irrational.
:::

:::steps Prove every square leaves remainder 0 or 1 when divided by 3
1. Every integer is $3k$, $3k + 1$ or $3k + 2$: three exhaustive cases.
2. $(3k)^2 = 9k^2 = 3(3k^2)$: remainder 0.
3. $(3k+1)^2 = 9k^2 + 6k + 1 = 3(3k^2 + 2k) + 1$: remainder 1.
4. $(3k+2)^2 = 9k^2 + 12k + 4 = 3(3k^2 + 4k + 1) + 1$: remainder 1. So remainder 2 never happens.
:::

:::steps Prove there is no integer solution to $x^2 = 4y + 3$
1. Suppose integers $x, y$ satisfy it. Then $x^2$ is odd, so $x$ is odd: $x = 2k + 1$.
2. $x^2 = 4k^2 + 4k + 1 = 4(k^2 + k) + 1$, which leaves remainder 1 when divided by 4.
3. But $4y + 3$ leaves remainder 3. A number can't leave two different remainders. Contradiction.
:::

:::mock Exam question
(a) Prove by contradiction that if $a$ is rational and $b$ is irrational, then $a + b$ is irrational. (b) Prove by cases that $|xy| = |x|\,|y|$ for all real $x, y$.
:::solution
(a) Suppose $a + b = r$ is rational. Then $b = r - a$ is a difference of two rationals, hence rational ($\frac mn - \frac st = \frac{mt - sn}{nt}$). This contradicts $b$ irrational.
(b) Cases by signs. If $x, y\ge0$: $xy\ge 0$, so $|xy| = xy = |x||y|$. If $x\ge0 > y$: $xy\le0$, so $|xy| = -xy = x(-y) = |x||y|$. The case $x < 0\le y$ is the same with roles swapped (WLOG). If $x, y < 0$: $xy > 0$, so $|xy| = xy = (-x)(-y) = |x||y|$.
:::
:::

:::cs
The proof that the **halting problem** is undecidable is a proof by contradiction: assume a program `halts(P, x)` exists, build a program that does the opposite of what `halts` predicts about itself, and reach a contradiction. Many lower bounds ("no comparison sort beats $n\log n$") and impossibility results in distributed systems are proved the same way. Case analysis is everywhere in algorithm proofs, and a missing case is the logical version of a missing `else` branch.
:::

:::ml
"No free lunch" theorems in machine learning are impossibility results: no single learning algorithm beats all others averaged over every possible problem. The proof that a single perceptron cannot learn XOR is a short contradiction: assume weights exist, write the four inequalities, and add them to get an impossibility.
:::

:::real
Sudoku players use contradiction constantly: "suppose this cell is 4; then this row would need two 7s; so it isn't 4". Detectives, doctors ruling out diagnoses, and engineers ruling out failure modes all reason by assuming the alternative and showing it can't fit the evidence.
:::

:::quiz
? A proof by contradiction of $P$ begins by assuming...
+ $\neg P$
- $P$
- the converse of $P$
> You assume the statement is false and show this leads to an impossibility.

? In Euclid's proof with primes 2, 3, 5, 7, 11, 13, the number $N = 30031$ is...
- prime
+ not prime, but its prime factors are not on the list
- divisible by 13
> $30031 = 59\times509$. The proof only needs some prime factor that's missing from the list.

? To prove a statement about all integers by cases on remainders mod 3, how many cases do you need?
= 3
> Remainders 0, 1 and 2 cover every integer.

? What is the remainder when $(3k + 2)^2$ is divided by 3?
= 1
> $(3k+2)^2 = 3(3k^2 + 4k + 1) + 1$.

? Which statement is most naturally proved by contradiction?
+ There is no largest even number.
- The sum of two even numbers is even.
- $2^{10} = 1024$.
> "There is no…" claims give you nothing to compute directly; assuming such a number exists gives you an object to reach a contradiction with.
:::

## Lesson: Mathematical induction {#induction}
@summary: Prove a statement for every natural number with a base case and an inductive step, like toppling dominoes.

### The domino idea
Imagine an endless line of dominoes. You want to be certain that every single one will fall, but you can't watch infinitely many dominoes. What would convince you? Two facts are enough. First, the first domino is pushed over. Second, the dominoes are spaced so that *whenever* one falls, it knocks over the next one. Then the first knocks the second, the second knocks the third, and so on forever. No domino is left standing.

**Mathematical induction** is this argument turned into a proof method. It proves a statement $P(n)$ for every integer $n$ from some starting point $n_0$ onward, and it is the main tool for proving facts about sums, sequences, recursive algorithms and loops.

### The two steps
To prove "$P(n)$ is true for all $n\ge n_0$":

1. **Base case.** Prove $P(n_0)$ directly. (Push the first domino.)
2. **Inductive step.** Prove that for every $k\ge n_0$, $P(k)\to P(k + 1)$. You assume $P(k)$, called the **inductive hypothesis**, and use it to prove $P(k + 1)$. (Each domino knocks over the next.)

Then $P(n_0)$ is true; with $k = n_0$ the step gives $P(n_0 + 1)$; with $k = n_0 + 1$ it gives $P(n_0 + 2)$; and every $n$ is reached after finitely many steps.

It is tempting to object: "isn't assuming $P(k)$ assuming what we want to prove?" No. We are not assuming $P(k)$ is true for every $k$. We are proving a conditional: *if* it is true for one particular $k$, then it is true for the next. The base case supplies the first actual truth, and the conditional carries it forward.

### First example: adding up 1 to n
Legend says the young Gauss added $1 + 2 + \cdots + 100$ in seconds by pairing $1 + 100$, $2 + 99$, and so on: 50 pairs of 101, giving 5050. The general formula is
$$1 + 2 + \cdots + n = \frac{n(n+1)}{2}.$$
Let's prove it by induction. Let $P(n)$ be this equation.

**Base case** $n = 1$: the left side is 1, the right side is $\frac{1\cdot2}{2} = 1$. True.

**Inductive step.** Assume $P(k)$: $1 + \cdots + k = \frac{k(k+1)}{2}$. We want $P(k + 1)$: $1 + \cdots + (k + 1) = \frac{(k+1)(k+2)}{2}$. Start from the left side of what we want, and find the old sum inside it:
$$1 + \cdots + k + (k+1) = \frac{k(k+1)}{2} + (k + 1) = \frac{k(k+1) + 2(k+1)}{2} = \frac{(k+1)(k+2)}{2}.$$
The first equals sign is where the inductive hypothesis is used. The rest is algebra: factor out $(k + 1)$. We've reached exactly the formula for $k + 1$, so by induction it holds for all $n\ge1$.

### The key move: find $P(k)$ inside $P(k+1)$
Almost every induction proof has the same core trick. Write out the $(k+1)$ case, spot the $k$ case sitting inside it, replace that part using the inductive hypothesis, and simplify towards the target. For sums, the $k$ case is "all terms but the last". For divisibility, it's often an expression like $4^{k+1} = 4\cdot4^k$. For inequalities, it's multiplying or adding to both sides.

### Second example: the sum of odd numbers
Look at $1 = 1$, $1 + 3 = 4$, $1 + 3 + 5 = 9$, $1 + 3 + 5 + 7 = 16$. It seems the sum of the first $n$ odd numbers is $n^2$. The $n$-th odd number is $2n - 1$.

Base: $n = 1$ gives $1 = 1^2$. Step: assume $1 + 3 + \cdots + (2k - 1) = k^2$. Then adding the next odd number, $2(k + 1) - 1 = 2k + 1$:
$$1 + 3 + \cdots + (2k-1) + (2k + 1) = k^2 + 2k + 1 = (k + 1)^2.$$
Done. Geometrically, each odd number is an L-shaped border that grows a $k\times k$ square into a $(k+1)\times(k+1)$ square.

### Third example: an inequality
Claim: $2^n > n$ for all $n\ge 1$. Base: $2^1 = 2 > 1$. Step: assume $2^k > k$. Then $2^{k+1} = 2\cdot2^k > 2k = k + k\ge k + 1$, since $k\ge1$. So $2^{k+1} > k + 1$. Inequality proofs often need a small extra fact like $k\ge1$; that is why the base case and starting point matter.

### Choosing the starting point
Induction can start anywhere. "$2^n > n^2$" is false for $n = 2, 3, 4$ ($4 > 4$ fails, $8 > 9$ fails, $16 > 16$ fails) but true from $n = 5$ on ($32 > 25$). So you'd prove the base case $n = 5$ and the step for $k\ge 5$. Starting at the wrong place either makes the base case false or breaks the step.

:::def Mathematical induction
A proof method for "$P(n)$ for all $n\ge n_0$": prove the base case $P(n_0)$, and prove $P(k)\to P(k+1)$ for every $k\ge n_0$.
:::

:::def Inductive hypothesis
The assumption, made inside the inductive step, that $P(k)$ holds for a particular but arbitrary $k$.
:::

:::warn Common mistakes
Skipping the base case: the step "$P(k)\to P(k + 1)$" for $n = n + 1$ is easy to "prove" for false claims like "$n = n + 1$". Never using the inductive hypothesis (then it isn't really induction, and usually something is wrong). Proving $P(k+1)$ by starting from it and manipulating both sides until they "match", rather than reasoning forward. And the famous "all horses are the same colour" bug: a step that silently fails at one small value of $k$.
:::

### Induction and recursion are two sides of one idea
If you have written a recursive function, you have already used induction without the name. A recursive function to compute $1 + 2 + \dots + n$ says: if $n = 1$, return 1; otherwise, compute the answer for $n - 1$ and add $n$. Why do you trust it? Because the base case is correct, and because *if* the call for $n - 1$ returns the right answer, adding $n$ gives the right answer for $n$. That is precisely a base case plus an inductive step. Proving a recursive program correct is an induction proof, and writing an induction proof is like writing a recursive program that builds the proof for any $n$ you ask for.

This view also explains the most common bug in both. A recursive function with no base case runs forever, and an "induction" with no base case proves nothing: you can "prove" that $n = n + 1$ for all $n$, since assuming $k = k + 1$ gives $k + 1 = k + 2$, but no starting domino ever falls. Always check the base case with actual numbers, such as $n = 1$: $1 = \frac{1\cdot2}{2}$.

### Summary
Induction proves infinitely many statements with two finite arguments: a base case and an inductive step $P(k)\to P(k+1)$. The core trick is to find the $k$ case inside the $k + 1$ case and apply the hypothesis. It proves formulas like $1 + \cdots + n = \frac{n(n+1)}{2}$ and $1 + 3 + \cdots + (2n-1) = n^2$, divisibility facts and inequalities. The next lesson extends it to strong and structural induction.

@viz sigma term=odd n=5 | Choose "2i−1" and increase n. The total is always a perfect square.

:::explore
**What to try**
1. With term $2i - 1$, step $n$ from 1 to 8 and write down the totals.
2. Switch the term to $i$ and compare each total with $\frac{n(n+1)}{2}$.
3. Switch to $(1/2)^i$ and watch the total approach 1.

**What to notice:** the odd sums are 1, 4, 9, 16, … $= n^2$, and each new bar adds exactly $2n - 1$, which is what the inductive step uses: $k^2 + (2k + 1) = (k + 1)^2$. For the term $i$, going from $n$ to $n + 1$ adds a bar of height $n + 1$, matching the step in the Gauss proof. The picture suggests the pattern; induction proves it for every $n$.
:::

:::formulas
$$\text{Induction: } P(n_0)\ \land\ \forall k\ge n_0\,\big(P(k)\to P(k+1)\big)\ \Rightarrow\ \forall n\ge n_0\,P(n)$$
$$\sum_{i=1}^n i = \frac{n(n+1)}{2}\qquad\sum_{i=1}^n(2i-1) = n^2\qquad\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}$$
$$\sum_{i=0}^{n-1}2^i = 2^n - 1\qquad\sum_{i=0}^{n} r^i = \frac{r^{n+1}-1}{r-1}\ (r\ne1)$$
:::

:::thm Sum of squares
For all $n\ge1$: $1^2 + 2^2 + \cdots + n^2 = \frac{n(n+1)(2n+1)}{6}$.
:::

:::proof
Base $n = 1$: $1 = \frac{1\cdot2\cdot3}{6}$. Step: assume it for $k$. Then $\sum_{i=1}^{k+1}i^2 = \frac{k(k+1)(2k+1)}{6} + (k+1)^2 = \frac{(k+1)\left[k(2k+1) + 6(k+1)\right]}{6} = \frac{(k+1)(2k^2 + 7k + 6)}{6} = \frac{(k+1)(k+2)(2k+3)}{6}$, which is the formula with $n = k + 1$.
:::

:::steps Prove $3\mid(4^n - 1)$ for all $n\ge1$
1. Base $n = 1$: $4 - 1 = 3$, divisible by 3.
2. Hypothesis: $4^k - 1 = 3m$ for some integer $m$.
3. Find the old case inside the new: $4^{k+1} - 1 = 4\cdot4^k - 1 = 4(4^k - 1) + 3$.
4. Substitute: $= 4(3m) + 3 = 3(4m + 1)$, divisible by 3.
:::

:::steps Prove $1 + 2 + 4 + \cdots + 2^{n-1} = 2^n - 1$
1. Base $n = 1$: left side $1$, right side $2 - 1 = 1$.
2. Hypothesis: $1 + \cdots + 2^{k-1} = 2^k - 1$.
3. Add the next term: $(2^k - 1) + 2^k = 2\cdot2^k - 1 = 2^{k+1} - 1$.
4. That's the formula for $k + 1$. (This is why the largest 8-bit number is $2^8 - 1 = 255$.)
:::

:::steps Find the bug: "all horses are the same colour"
1. The "proof": base case, one horse is one colour. Step: given $k + 1$ horses, the first $k$ share a colour and the last $k$ share a colour; the groups overlap, so all $k + 1$ do.
2. Test the step at $k = 1$: two horses, "first 1" is horse A, "last 1" is horse B.
3. These groups don't overlap at all, so nothing links A's colour to B's.
4. The step fails for $k = 1$, so the chain of dominoes breaks between 1 and 2.
:::

:::mock Exam question
Prove by induction that $n^3 - n$ is divisible by 3 for all integers $n\ge 0$.
:::solution
Base $n = 0$: $0 - 0 = 0 = 3\cdot0$. Step: assume $k^3 - k = 3m$. Then $(k+1)^3 - (k+1) = k^3 + 3k^2 + 3k + 1 - k - 1 = (k^3 - k) + 3k^2 + 3k = 3m + 3(k^2 + k) = 3(m + k^2 + k)$, divisible by 3. By induction the claim holds for all $n\ge0$.
:::
:::

:::cs
**Loop invariants** are induction. To show a loop is correct, prove a property holds before the first iteration (base case) and that each iteration preserves it (inductive step); when the loop exits, the invariant gives the result. For a loop that adds `a[0..i-1]` into `total`, the invariant "total = sum of the first i elements" is proved exactly like the Gauss formula. Recursive functions are proved correct the same way, by induction on the input size.
:::

:::ml
Convergence proofs for optimisation algorithms use induction on the iteration count: for example, "after $t$ steps of gradient descent on a nice convex function, the error is at most $(1 - \mu/L)^t$ times the initial error" is proved by showing one step multiplies the error by at most $(1 - \mu/L)$ and inducting. Backpropagation's correctness is an induction over layers, from the output backwards.
:::

:::real
Climbing a ladder is induction: if you can get onto the first rung and you can always move from one rung to the next, you can reach any rung. Compound interest works the same way: if your balance is $P(1+r)^k$ after $k$ years, one more year multiplies it by $(1+r)$, so the formula holds for every year.
:::

:::quiz
? In induction, the inductive step proves...
+ $P(k)\to P(k+1)$
- $P(k+1)\to P(k)$
- $P(1)$ only
> The step shows each case implies the next; together with the base case this reaches every $n$.

? What is $1 + 2 + \cdots + 100$?
= 5050
> $\frac{100\cdot101}{2} = 5050$.

? What is the sum of the first 10 odd numbers?
= 100
> $1 + 3 + \cdots + 19 = 10^2 = 100$.

? For which smallest $n$ does $2^n > n^2$ start holding for good?
= 5
> $2^4 = 16 = 4^2$ fails the strict inequality; $2^5 = 32 > 25$, and the inductive step works from there.

? An "induction proof" proves the step $P(k)\to P(k+1)$ but has no base case. What has been proved?
- the statement for all $n$
+ nothing about any particular $n$
> Without a first true case, the chain never starts. "$n = n + 1$" has a valid-looking step but is never true.
:::

## Lesson: Strong induction, well-ordering and structural induction {#strong-induction}
@summary: Assume every earlier case, not just the last one; and induct over trees, lists and formulas.

### When one domino isn't enough
Ordinary induction lets you assume $P(k)$ and asks you to prove $P(k + 1)$. That's perfect when the $(k+1)$ case is built from the $k$ case, like adding one more term to a sum. But many objects are built from pieces that are much smaller, not just one smaller.

Think about splitting a chocolate bar. Every bar with $n$ squares can be split into single squares by repeatedly breaking one piece into two. When you break a bar of 12 squares, you might get pieces of 5 and 7, not 11 and 1. To reason about the 12-square bar, you want to know facts about the 5 and 7 bars, both of which are smaller than 12 but neither of which is 11. Ordinary induction only hands you the 11 case. **Strong induction** hands you all of them.

### The method
To prove $P(n)$ for all $n\ge n_0$ by strong induction:

1. **Base case(s).** Prove $P(n_0)$, and possibly a few more small cases.
2. **Inductive step.** For any $k\ge n_0$, assume $P(n_0), P(n_0 + 1), \dots, P(k)$ are **all** true, and prove $P(k + 1)$.

In domino terms, each domino is knocked over by the combined weight of all the dominoes before it. It's called "strong" because the hypothesis is stronger, not because the conclusion is. In fact strong and ordinary induction prove exactly the same things: you can always turn a strong induction into an ordinary one by letting $Q(n)$ = "$P(n_0), \dots, P(n)$ all hold". Strong induction is simply more convenient.

### Example: every integer is a product of primes
**Claim.** Every integer $n\ge2$ can be written as a product of one or more primes.

Base: $n = 2$ is prime, so it is a product of one prime. Step: assume every integer from 2 to $k$ is a product of primes, and consider $k + 1$. Two cases. If $k + 1$ is prime, we're done. If not, $k + 1 = ab$ with $2\le a, b\le k$. By the strong hypothesis, $a$ and $b$ are each products of primes, so multiplying the two lists gives $k + 1$ as a product of primes.

Ordinary induction couldn't do this: knowing that 35 factors tells you nothing about 36. But 36 $= 4\times9$ and both 4 and 9 are smaller, so strong induction applies. With numbers: $36 = 4\cdot9 = (2\cdot2)(3\cdot3)$.

### Example: postage stamps and multiple base cases
**Claim.** Any postage amount of 12 cents or more can be made with 4-cent and 5-cent stamps.

The idea for the step: to make $k + 1$ cents, make $k + 1 - 4 = k - 3$ cents and add one 4-cent stamp. That needs the case four back, not one back, so we use strong induction. But the step only works if $k - 3\ge12$, i.e. $k + 1\ge16$. So we need **four** base cases, 12 through 15:
$$12 = 4+4+4,\quad13 = 4+4+5,\quad14 = 4+5+5,\quad15 = 5+5+5.$$
Then for any $k + 1\ge16$, $k - 3\ge12$ is already covered, and one more 4-cent stamp finishes the job. How many base cases do you need? As many as the step "reaches back": here 4.

And 11 really can't be made: using 0, 1 or 2 fives leaves 11, 6 or 1, none of which is a multiple of 4. So 12 is the true starting point.

### The well-ordering principle
There is a third, equivalent way to think about induction. The **well-ordering principle** says that every non-empty set of natural numbers has a smallest element. That sounds obvious (it fails for the real numbers: the set of positive reals has no smallest member), but it's surprisingly powerful.

A proof by **minimal counterexample** uses it like this: suppose $P(n)$ fails for some $n$. Then there is a *smallest* failure $m$. Since everything below $m$ works, you show $m$ works too, a contradiction. This is just strong induction phrased as a proof by contradiction. It is also why algorithms that always decrease a natural-number quantity (like the remainder in Euclid's algorithm) must terminate: you can't decrease forever without going below zero.

### Structural induction
Many objects in computer science aren't numbers at all: lists, trees, arithmetic expressions, logical formulas. They are defined **recursively**: a few basic objects, plus rules that build bigger objects from smaller ones. For example, a **full binary tree** is either a single node (a leaf), or a root node with exactly two subtrees that are full binary trees.

**Structural induction** proves a property for all such objects:
1. **Base:** prove it for the basic objects.
2. **Step:** assume it for the smaller pieces, and prove it for the object built from them.

**Claim.** In a full binary tree, the number of leaves $L$ is one more than the number of internal nodes $I$: $L = I + 1$.

Base: a single node has $L = 1$, $I = 0$, and $1 = 0 + 1$. Step: suppose $T$ has a root with subtrees $T_1, T_2$, and assume $L_1 = I_1 + 1$ and $L_2 = I_2 + 1$. The leaves of $T$ are the leaves of $T_1$ and $T_2$, so $L = L_1 + L_2$. The internal nodes are those of $T_1$ and $T_2$ plus the root, so $I = I_1 + I_2 + 1$. Then $L = (I_1 + 1) + (I_2 + 1) = I + 1$. Check with a tree of 3 internal nodes: it has 4 leaves.

Structural induction is really strong induction on size, since each piece is smaller than the whole, but phrasing it over the structure keeps proofs short and clear.

:::def Strong induction
A proof method for $\forall n\ge n_0\,P(n)$: prove the base case(s), then prove $P(k+1)$ assuming $P(n_0),\dots,P(k)$ all hold.
:::

:::def Well-ordering principle
Every non-empty set of natural numbers has a least element.
:::

:::def Structural induction
A proof method for recursively defined objects: prove the property for the base objects, and prove that each construction rule preserves it.
:::

:::warn Common mistakes
Too few base cases: if the step uses $P(k - 3)$, you need enough base cases that $k - 3$ is always covered. Splitting into pieces that aren't actually smaller (a factor of 1 doesn't make $k + 1 = 1\cdot(k + 1)$ smaller). And in structural induction, forgetting one of the construction rules.
:::

### Summary
Strong induction assumes all earlier cases and is the natural tool when an object breaks into smaller pieces of any size: prime factorisation, recursive algorithms, postage problems with several base cases. It is equivalent to ordinary induction and to the well-ordering principle (every non-empty set of naturals has a least element). Structural induction applies the same idea to recursively defined structures like trees and formulas.

@viz recursion-tree | Each level of the tree is a smaller instance of the same problem; strong induction assumes the answer for every smaller size.

:::explore
**What to try**
1. Choose $T(n) = 2T(n/2) + n$ (merge sort) and read the cost of each level.
2. Switch to $T(n) = T(n/2) + 1$ (binary search) and compare the number of levels.
3. Try $T(n) = 3T(n/2) + n$.

**What to notice:** to solve size $n$, merge sort uses answers for size $n/2$, not $n - 1$, so proving its correctness or running time needs strong induction ("assume it works for every smaller size"). The base of the tree, size 1, is the base case.
:::

@viz euclid a=84 b=30 | Euclid's algorithm: each step replaces (a, b) by (b, a mod b), a strictly smaller pair.

:::explore
**What to try**
1. With $a = 84$, $b = 30$, read off the squares the rectangle is cut into: these are the division steps $84 = 2\cdot30 + 24$, $30 = 1\cdot24 + 6$, $24 = 4\cdot6$.
2. Set the sliders to two consecutive Fibonacci numbers such as 89 and 55 and count how many steps it takes.

**What to notice:** the second number strictly decreases and stays a natural number, so by the well-ordering principle it can't decrease forever: the algorithm must stop. Its correctness, $\gcd(a, b) = \gcd(b, a\bmod b)$, is applied to a smaller pair at every step, which is a strong-induction argument.
:::

:::formulas
$$\text{Strong: } \forall k\ge n_0\,\big(P(n_0)\land\cdots\land P(k)\to P(k+1)\big)\text{ plus base cases}\Rightarrow\forall n\ge n_0\,P(n)$$
$$\text{full binary tree: } L = I + 1,\qquad\text{nodes} = 2I + 1$$
$$F_0 = 0,\ F_1 = 1,\ F_{n} = F_{n-1} + F_{n-2}\ \Rightarrow\ F_n < 2^n$$
:::

:::thm Fibonacci growth bound
For all $n\ge0$, $F_n < 2^n$.
:::

:::proof
Base cases: $F_0 = 0 < 1$ and $F_1 = 1 < 2$. Step: for $k\ge1$, assume $F_j < 2^j$ for all $j\le k$. Then $F_{k+1} = F_k + F_{k-1} < 2^k + 2^{k-1} < 2^k + 2^k = 2^{k+1}$. Two base cases are needed because the step reaches back two places.
:::

:::steps Prove every integer $n\ge1$ is a sum of distinct powers of 2
1. Base $n = 1 = 2^0$.
2. Assume true for all $1\le j\le k$; consider $k + 1$. If $k + 1$ is even, $k + 1 = 2j$ with $j\le k$; write $j$ as distinct powers of 2 and double each one: still distinct.
3. If $k + 1$ is odd, then $k$ is even. Write $k$ as distinct powers of 2; none of them is $2^0 = 1$, since a sum of powers $\ge2$ is even and including 1 would make it odd. Add $2^0$.
4. Example: $13 = 8 + 4 + 1 = 1101_2$. This is why every number has a binary representation.
:::

:::steps How many base cases for 3- and 7-cent stamps, all amounts $\ge12$?
1. Base checks: $12 = 3+3+3+3$, $13 = 3+3+7$, $14 = 7+7$.
2. The step adds a 3-cent stamp to the amount 3 below, so it reaches back 3 places.
3. So 3 base cases (12, 13, 14) suffice; every $n\ge15$ uses $n - 3\ge12$.
4. And 11 is impossible: $11$, $11 - 7 = 4$ are not multiples of 3.
:::

:::mock Exam question
A full binary tree has 20 leaves. (a) How many internal nodes does it have? (b) How many nodes in total? (c) Which proof method establishes the formula you used, and what are its base case and step?
:::solution
(a) $L = I + 1$, so $I = 19$. (b) $L + I = 39$ (equivalently $2I + 1 = 39$). (c) Structural induction. Base: a single leaf has $L = 1$, $I = 0$. Step: a root joining subtrees $T_1, T_2$ has $L = L_1 + L_2$ and $I = I_1 + I_2 + 1$; using $L_i = I_i + 1$ gives $L = I + 1$.
:::
:::

:::cs
Correctness of divide-and-conquer algorithms (merge sort, quicksort, binary search) is proved by strong induction on input size: assume the recursive calls on smaller inputs are correct, then show the combine step is correct. Compilers and type checkers are proved correct by structural induction over the syntax tree of a program. Termination proofs use well-ordering: find a natural-number measure that decreases each step.
:::

:::ml
Decision trees are recursively defined, so facts like "a binary tree of depth $d$ has at most $2^d$ leaves" (and so at most $2^d$ distinct predictions) are proved by structural induction. Recursive neural networks over parse trees and the computation graphs used by automatic differentiation are also processed and analysed structurally, node by node from the leaves up.
:::

:::real
A tournament bracket is a full binary tree: teams are leaves and matches are internal nodes. With 64 teams, $L = I + 1$ says there are exactly 63 matches, which you can also see directly, because every match eliminates exactly one team and 63 teams must be eliminated.
:::

:::quiz
? Which technique is most natural for proving every integer $\ge2$ has a prime factorisation?
- ordinary induction
+ strong induction
- proof by cases only
> A composite $k + 1 = ab$ splits into factors much smaller than $k$, so you need the hypothesis for all smaller values.

? A full binary tree has 7 internal nodes. How many leaves does it have?
= 8
> $L = I + 1 = 8$.

? What is the largest amount that can NOT be made from 4-cent and 5-cent stamps?
= 11
> 12, 13, 14, 15 can be made, and then every larger amount by adding 4s. 11 cannot.

? Which set does NOT have a least element?
- $\{5, 9, 2, 40\}$
- the even natural numbers
+ the positive real numbers
> Well-ordering holds for natural numbers, not reals: for any positive real $x$, $x/2$ is smaller.

? If an inductive step uses $P(k - 1)$ and $P(k)$ to prove $P(k + 1)$, how many base cases are needed?
= 2
> The step reaches back two places, as in the Fibonacci proof.
:::
