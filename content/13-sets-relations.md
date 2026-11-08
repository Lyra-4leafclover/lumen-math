---
id: sets-relations
title: Sets, Relations & Functions
tagline: The vocabulary of all of mathematics — sets, relations, equivalence classes, orders and cardinality.
desc: Every mathematical object is built from sets. You'll learn set notation and operations, power sets and Cartesian products, relations and their properties, equivalence relations and partial orders, functions as relations, and the surprising theory of infinite sizes.
color: #22c55e
symbol: ∈
area: Discrete math
paths: cs, ml
order: 13
---

# Unit: Sets

## Lesson: Sets, elements and subsets {#sets}
@summary: What a set is, roster and set-builder notation, the empty set, subsets, equality and cardinality.

### The simplest idea in mathematics
Almost every object in mathematics, from numbers to functions to probability events to the inputs of a neural network, is defined using sets. That sounds intimidating, but a set is about as simple an idea as exists: **a collection of things, considered as a single object**. Your music playlist (ignoring order and repeats), the students in a class, the even numbers, the pixels in an image that belong to a cat: each is a set.

The power of sets comes from treating the collection itself as one thing you can name, compare and combine. Once you can say "let $S$ be the set of spam emails", you can ask how big $S$ is, whether it overlaps with the set of emails from your contacts, and what fraction of $S$ a filter catches. The language of this lesson is the language every later course is written in.

### Elements and membership
The things in a set are its **elements** or **members**. We write $x\in A$ for "$x$ is an element of $A$" and $x\notin A$ for "$x$ is not an element of $A$". If $A$ is the set of vowels, then $e\in A$ and $k\notin A$.

Two rules make sets different from lists. First, **order doesn't matter**: $\{1, 2, 3\}$ and $\{3, 1, 2\}$ are the same set. Second, **repetition doesn't matter**: $\{1, 1, 2\}$ is the same set as $\{1, 2\}$. A set only records *whether* each thing belongs, not where or how often. If you need order, use a sequence or tuple; if you need counts, use a multiset.

Elements can be anything, including other sets. The set $\{1, \{2, 3\}\}$ has exactly two elements: the number 1, and the set $\{2, 3\}$. Note that $2\notin\{1, \{2, 3\}\}$; the 2 is inside an element, not an element itself. It's like a box containing a coin and a smaller box: the coin in the smaller box isn't directly in the big box.

### Describing a set
There are two standard ways to write a set. **Roster notation** lists the elements between braces: $\{2, 4, 6, 8\}$. For long or infinite sets with an obvious pattern, we use an ellipsis: $\{1, 2, 3, \dots, 100\}$ or $\{0, 2, 4, \dots\}$.

**Set-builder notation** describes the elements by a property:
$$\{x\in\mathbb{Z} : x\text{ is even and } 0 < x < 10\} = \{2, 4, 6, 8\}.$$
Read the colon (sometimes written as a vertical bar $|$) as "such that": "the set of integers $x$ such that $x$ is even and between 0 and 10". Set-builder notation is exactly a predicate from the logic course, used to carve a set out of a larger one. Another form builds elements from a formula: $\{n^2 : n\in\{1, 2, 3\}\} = \{1, 4, 9\}$.

Some sets are used so often they have their own symbols: $\mathbb{N}$ (natural numbers $0, 1, 2, \dots$), $\mathbb{Z}$ (integers), $\mathbb{Q}$ (rationals), $\mathbb{R}$ (reals), and intervals such as $[0, 1] = \{x\in\mathbb{R} : 0\le x\le1\}$.

### The empty set
The set with no elements at all is the **empty set**, written $\emptyset$ or $\{\}$. The set of even primes greater than 2, and the set of real solutions of $x^2 = -1$, are both $\emptyset$. There is only one empty set: any two sets with no elements have the same elements (none), so they're equal.

Be careful: $\{\emptyset\}$ is **not** empty. It is a box containing an empty box, so it has one element.

### Subsets
$A$ is a **subset** of $B$, written $A\subseteq B$, if every element of $A$ is also an element of $B$. In logic: $\forall x\,(x\in A\to x\in B)$. For example $\{1, 3\}\subseteq\{1, 2, 3\}$, and the set of squares is a subset of the set of rectangles.

Two facts follow straight from the definition. Every set is a subset of itself ($A\subseteq A$). And the empty set is a subset of *every* set: the statement "every element of $\emptyset$ is in $B$" is vacuously true, because there are no elements to check. (This is the same vacuous truth as an implication with a false hypothesis.)

If $A\subseteq B$ and $A\ne B$, then $A$ is a **proper subset**, written $A\subset B$ or $A\subsetneq B$. And $\subseteq$ is not the same as $\in$: $\{1\}\subseteq\{1, 2\}$ is true, but $\{1\}\in\{1, 2\}$ is false, because the set $\{1\}$ is not one of the listed elements.

### Equality of sets
Two sets are **equal** when they have exactly the same elements. The standard way to prove $A = B$ is the **double inclusion** method: show $A\subseteq B$ and $B\subseteq A$. For example, to show $\{x\in\mathbb{Z} : x^2 = 4\} = \{-2, 2\}$, check that $(-2)^2 = 2^2 = 4$ (so $\{-2, 2\}$ is inside), and that $x^2 = 4$ forces $x = \pm2$ (so nothing else is inside).

### Cardinality
The **cardinality** $|A|$ of a finite set is the number of distinct elements. $|\{a, b, c\}| = 3$, $|\emptyset| = 0$, $|\{1, 1, 2\}| = 2$ and $|\{1, \{2, 3\}\}| = 2$. If $A\subseteq B$ and both are finite, then $|A|\le|B|$. Cardinality for infinite sets is subtle and gets its own lesson later in this course.

### The universal set and Venn diagrams
In a given problem, all the sets usually live inside one big set called the **universal set** $U$, such as "all integers" or "all customers". A **Venn diagram** draws $U$ as a rectangle and each set as a circle inside it, so that $A\subseteq B$ appears as $A$'s circle inside $B$'s circle. Venn diagrams are pictures, not proofs, but they are excellent for building intuition.

:::def Set
An unordered collection of distinct objects, called its elements. Membership is written $x\in A$.
:::

:::def Subset
$A\subseteq B$ means every element of $A$ is an element of $B$: $\forall x\,(x\in A\to x\in B)$.
:::

:::def Empty set
The unique set with no elements, written $\emptyset$. It is a subset of every set.
:::

:::def Cardinality
The number of distinct elements of a finite set $A$, written $|A|$.
:::

:::warn Common mistakes
Confusing $\in$ (is an element of) with $\subseteq$ (is a subset of). Counting repeated elements in $|A|$. Thinking $\{\emptyset\}$ is empty. And forgetting that $\emptyset\subseteq A$ is always true, while $\emptyset\in A$ is usually false.
:::

### Summary
A set is an unordered collection with no repeats, described by roster or set-builder notation. $x\in A$ is membership; $A\subseteq B$ means everything in $A$ is in $B$, and two sets are equal when each is a subset of the other. The empty set has no elements and is a subset of every set. Cardinality counts distinct elements. The next lesson combines sets with union, intersection and more.

@viz sets | A is the divisors of 12, B is the primes, and U = {1, …, 12}. Use the operations to see which numbers belong where.

:::explore
**What to try**
1. Select $A\cap B$: these are numbers that are in both sets. Check that each one is a prime that divides 12.
2. Select $A\setminus B$ and count its elements.
3. Select $A^c$ and list what's left in $U$.
4. Ask yourself: is $\{2, 3\}\subseteq A$? Is $\{2, 3\}\subseteq B$? Is $\{1\}\subseteq B$?

**What to notice:** each dot appears once, no matter how many sets it belongs to, because a set records membership, not position or repetition. $\{2, 3\}$ is a subset of both $A$ and $B$ because both its elements sit in the overlap. 1 divides 12 but isn't prime, so $\{1\}\subseteq A$ but $\{1\}\not\subseteq B$.
:::

:::formulas
$$A\subseteq B\iff\forall x\,(x\in A\to x\in B)\qquad A = B\iff A\subseteq B\land B\subseteq A$$
$$\emptyset\subseteq A\ \text{ and }\ A\subseteq A\ \text{ for every set } A$$
$$A\subseteq B\ \Rightarrow\ |A|\le|B|\ \text{(finite sets)}$$
:::

:::thm Subset is transitive
If $A\subseteq B$ and $B\subseteq C$, then $A\subseteq C$.
:::

:::proof
Take any $x\in A$. Since $A\subseteq B$, $x\in B$. Since $B\subseteq C$, $x\in C$. So every element of $A$ is in $C$. (This is hypothetical syllogism applied to $x\in A\to x\in B$ and $x\in B\to x\in C$.)
:::

:::steps List $\{x\in\mathbb{Z} : -3 < x\le 2,\ x\text{ odd}\}$ and find its cardinality
1. Integers with $-3 < x\le2$: $-2, -1, 0, 1, 2$.
2. Keep the odd ones: $-1, 1$.
3. The set is $\{-1, 1\}$ and its cardinality is 2.
:::

:::steps Decide true or false for $A = \{1, \{1\}, \{2, 3\}\}$
1. $1\in A$: true, it is listed.
2. $\{1\}\in A$: true, the set $\{1\}$ is listed as an element.
3. $\{1\}\subseteq A$: true, its only element 1 is in $A$.
4. $2\in A$: false, 2 is inside the element $\{2, 3\}$ but not itself an element. $|A| = 3$.
:::

:::steps Prove $\{x\in\mathbb{R} : x^2 - 5x + 6 = 0\} = \{2, 3\}$
1. ($\supseteq$) $2^2 - 10 + 6 = 0$ and $9 - 15 + 6 = 0$, so 2 and 3 are in the left set.
2. ($\subseteq$) If $x^2 - 5x + 6 = 0$ then $(x - 2)(x - 3) = 0$, so $x = 2$ or $x = 3$.
3. Both inclusions hold, so the sets are equal.
:::

:::mock Exam question
Let $A = \{n\in\mathbb{N} : n\mid 12\}$ and $B = \{n\in\mathbb{N} : n\mid 18\}$. (a) List $A$ and $B$. (b) Is $A\subseteq B$? (c) Find $|A|$ and the cardinality of $\{n : n\in A\text{ and } n\in B\}$.
:::solution
(a) $A = \{1, 2, 3, 4, 6, 12\}$, $B = \{1, 2, 3, 6, 9, 18\}$.
(b) No: $4\in A$ but $4\notin B$ (one counterexample is enough).
(c) $|A| = 6$. The common elements are $\{1, 2, 3, 6\}$, the divisors of $\gcd(12, 18) = 6$, so the cardinality is 4.
:::
:::

:::cs
Python's `set`, Java's `HashSet` and SQL's `DISTINCT` implement mathematical sets: no duplicates, no order, and fast membership tests (`x in s` takes about constant time with hashing, versus scanning a whole list). `a <= b` in Python tests $a\subseteq b$. Deduplicating a list with `set(lst)` is just "forget order and repetition".
:::

:::ml
A dataset's label space is a set ($\{\text{cat}, \text{dog}, \text{bird}\}$), a vocabulary for a language model is a set of tokens, and an "event" in probability is a subset of the sample space. Feature selection chooses a subset of features, and the training, validation and test sets must be disjoint subsets of the data to avoid leakage.
:::

:::real
A shopping list where you cross out duplicates is a set. Group chats are sets of people: adding someone already in the chat changes nothing. And "all students who took Algebra" being a subset of "all students who can take Calculus" is exactly how course prerequisites are checked.
:::

:::quiz
? What is $|\{1, 1, 2, 3, 3\}|$?
= 3
> Repeats don't count: the set is $\{1, 2, 3\}$.

? Is $\emptyset\subseteq\{1, 2\}$?
+ Yes
- No
> The empty set is a subset of every set: there is no element of $\emptyset$ that could fail to be in $\{1, 2\}$.

? How many elements does $\{\emptyset, \{\emptyset\}\}$ have?
= 2
> Its elements are the empty set and the set containing the empty set: two different objects.

? Which is true?
- $\{2\}\in\{1, 2, 3\}$
+ $\{2\}\subseteq\{1, 2, 3\}$
- $2\subseteq\{1, 2, 3\}$
> 2 is an element, and the set $\{2\}$ is a subset. $\{2\}$ is not listed as an element.

? What is $|\{x\in\mathbb{Z} : x^2 < 10\}|$?
= 7
> The integers are $-3, -2, -1, 0, 1, 2, 3$.

? Are $\{1, 2, 3\}$ and $\{3, 2, 1, 1\}$ equal?
+ Yes
- No
> Order and repetition don't matter; both have exactly the elements 1, 2, 3.
:::

## Lesson: Set operations, power sets and Cartesian products {#set-operations}
@summary: Union, intersection, difference, complement, set identities, inclusion–exclusion, power sets and Cartesian products.

### Combining collections
Suppose a music app has two lists: $A$, the people who listened to jazz this month, and $B$, the people who listened to classical. The marketing team asks four questions. Who listened to *either*? Who listened to *both*? Who listened to jazz but *not* classical? Who listened to *neither*? Each question is a **set operation**, and each one corresponds exactly to a logical connective you already know: OR, AND, AND NOT, and NOT.

That correspondence is the key idea of this lesson. Set operations are logic applied to membership, so every law you learned for $\lor$, $\land$ and $\neg$ has a twin for sets.

### Union, intersection, difference
The **union** $A\cup B$ is the set of elements in $A$ or $B$ (or both):
$$A\cup B = \{x : x\in A\lor x\in B\}.$$
The **intersection** $A\cap B$ is the set of elements in both:
$$A\cap B = \{x : x\in A\land x\in B\}.$$
The **difference** $A\setminus B$ (also written $A - B$) is the set of elements in $A$ but not in $B$.

Take $A = \{1, 2, 3, 4\}$ and $B = \{3, 4, 5\}$. Then $A\cup B = \{1, 2, 3, 4, 5\}$, $A\cap B = \{3, 4\}$, $A\setminus B = \{1, 2\}$ and $B\setminus A = \{5\}$. Notice that difference is not symmetric: $A\setminus B\ne B\setminus A$.

Two sets with no common elements, $A\cap B = \emptyset$, are called **disjoint**. The even and odd integers are disjoint.

The **symmetric difference** $A\triangle B$ is the set of elements in exactly one of the two sets, $(A\setminus B)\cup(B\setminus A)$. For our example, $A\triangle B = \{1, 2, 5\}$. It is the set version of XOR.

### Complement
Inside a universal set $U$, the **complement** of $A$ is everything not in $A$: $A^c = U\setminus A$ (also written $\overline A$ or $A'$). If $U = \{1, \dots, 10\}$ and $A$ is the evens, $A^c = \{1, 3, 5, 7, 9\}$. The complement depends on $U$: the complement of the evens inside the integers is the odd integers, an infinite set.

### Set identities
Because each operation is a logical connective in disguise, the laws of logic become **set identities**. Union and intersection are commutative and associative. They distribute over each other:
$$A\cap(B\cup C) = (A\cap B)\cup(A\cap C),\qquad A\cup(B\cap C) = (A\cup B)\cap(A\cup C).$$
And **De Morgan's laws** say
$$(A\cup B)^c = A^c\cap B^c,\qquad(A\cap B)^c = A^c\cup B^c.$$
"Not (jazz or classical)" means "not jazz and not classical": the people who listened to neither. Other useful identities: $A\cup\emptyset = A$, $A\cap U = A$, $A\cup A^c = U$, $A\cap A^c = \emptyset$, $(A^c)^c = A$, and $A\setminus B = A\cap B^c$.

To prove a set identity, use double inclusion or translate it into logic. For De Morgan: $x\in(A\cup B)^c$ iff $\neg(x\in A\lor x\in B)$ iff $x\notin A\land x\notin B$ iff $x\in A^c\cap B^c$.

### Counting a union: inclusion–exclusion
How big is $A\cup B$? Adding $|A| + |B|$ counts the elements in the overlap twice, so subtract them once:
$$|A\cup B| = |A| + |B| - |A\cap B|.$$
In a class of 30, 18 study French, 12 study Spanish, and 5 study both. Then $18 + 12 - 5 = 25$ study at least one language, and $30 - 25 = 5$ study neither.

For three sets, add the singles, subtract the pairs, and add back the triple, which was added three times and subtracted three times:
$$|A\cup B\cup C| = |A| + |B| + |C| - |A\cap B| - |A\cap C| - |B\cap C| + |A\cap B\cap C|.$$
This is the **principle of inclusion–exclusion**, and the pattern of alternating signs continues for any number of sets.

### The power set
The **power set** $\mathcal P(A)$ is the set of *all* subsets of $A$. For $A = \{a, b\}$:
$$\mathcal P(A) = \{\emptyset, \{a\}, \{b\}, \{a, b\}\}.$$
How many subsets does an $n$-element set have? Building a subset means deciding, for each element, "in or out": two choices, $n$ times, giving $2^n$ subsets. So $|\mathcal P(A)| = 2^{|A|}$. A 3-element set has 8 subsets and a 10-element set has 1024. Each subset matches a binary string of length $n$: for $\{a, b, c\}$, the string 101 means $\{a, c\}$.

### Ordered pairs and the Cartesian product
Sets ignore order, but sometimes order matters, such as coordinates $(2, 5)\ne(5, 2)$. An **ordered pair** $(a, b)$ has a first entry and a second entry. The **Cartesian product** of $A$ and $B$ is the set of all ordered pairs with first entry from $A$ and second from $B$:
$$A\times B = \{(a, b) : a\in A,\ b\in B\}.$$
If $A = \{1, 2\}$ and $B = \{x, y, z\}$, then $A\times B = \{(1,x), (1,y), (1,z), (2,x), (2,y), (2,z)\}$, which has $2\times3 = 6$ elements. In general $|A\times B| = |A|\cdot|B|$. The plane $\mathbb{R}^2 = \mathbb{R}\times\mathbb{R}$ is a Cartesian product, named after René Descartes, and $\mathbb{R}^n$ is the product of $n$ copies of $\mathbb{R}$. Note $A\times B\ne B\times A$ in general.

:::def Union and intersection
$A\cup B = \{x : x\in A\text{ or }x\in B\}$; $A\cap B = \{x : x\in A\text{ and }x\in B\}$.
:::

:::def Complement
For a universal set $U$, $A^c = \{x\in U : x\notin A\}$.
:::

:::def Power set
$\mathcal P(A)$, the set of all subsets of $A$. If $|A| = n$ then $|\mathcal P(A)| = 2^n$.
:::

:::def Cartesian product
$A\times B = \{(a, b) : a\in A, b\in B\}$, the set of ordered pairs. $|A\times B| = |A||B|$.
:::

:::warn Common mistakes
Adding $|A| + |B|$ for a union without subtracting the overlap. Forgetting $\emptyset$ and $A$ itself when listing $\mathcal P(A)$. Writing $(A\cup B)^c = A^c\cup B^c$ (De Morgan swaps the operation). And treating $(a, b)$ as the set $\{a, b\}$: pairs are ordered.
:::

### Working with complements and counting "at least one"
Many counting questions are easiest through the complement. "How many 3-digit codes from the digits 0 to 9 contain at least one 7?" is awkward to count directly, because a code can contain one, two or three 7s. Instead, count the codes with **no** 7: each digit has 9 choices, giving $9^3 = 729$. All codes number $10^3 = 1000$, so $1000 - 729 = 271$ contain at least one 7. In set language, if $S$ is the set of codes with at least one 7, then $|S| = |U| - |S^c|$.

The complement trick and inclusion–exclusion fit together through De Morgan's law. The elements in *none* of $A$, $B$, $C$ form $(A\cup B\cup C)^c = A^c\cap B^c\cap C^c$, so "none" is the universe minus the union, and the union is computed by inclusion–exclusion. That's exactly how the worked examples below count numbers that are divisible by none of 2, 3 and 5: $100 - 74 = 26$. Probability works the same way: $P(\text{at least one}) = 1 - P(\text{none})$. For instance, the chance that three fair coin flips show at least one head is $1 - \frac18 = \frac78$, because the only way to get no heads is the single outcome TTT out of 8 equally likely outcomes.

### Summary
Union, intersection, difference, complement and symmetric difference are OR, AND, AND NOT, NOT and XOR on membership, so logical laws become set identities, including De Morgan's laws. Inclusion–exclusion counts unions without double counting. The power set of an $n$-element set has $2^n$ elements, and the Cartesian product $A\times B$ of ordered pairs has $|A||B|$ elements.

@viz sets | Switch between the five operations and read the resulting set and its size.

:::explore
**What to try**
1. Note the sizes: $|A| = 6$ and $|B| = 5$. Select $A\cap B$ and read its size.
2. Select $A\cup B$ and check $|A\cup B| = 6 + 5 - |A\cap B|$.
3. Select $A\triangle B$ and check it equals $A\cup B$ minus $A\cap B$.
4. Select $A^c$; then find $(A\cup B)^c$ by eye and compare it with $A^c\cap B^c$.

**What to notice:** $|A\cap B| = 2$ (the numbers 2 and 3), so $|A\cup B| = 9$, exactly as inclusion–exclusion predicts. The numbers 8, 9, 10 lie outside both circles: they form $(A\cup B)^c$, and they are also exactly the numbers outside $A$ and outside $B$, which is De Morgan's law.
:::

@viz counting | Set n to 4 and choose "order doesn't matter". Add up the counts for k = 1, 2, 3, 4.

:::explore
**What to try**
1. With $n = 4$, record $\binom4k$ for $k = 1, 2, 3, 4$.
2. Add them up and add 1 for the empty set.

**What to notice:** $4 + 6 + 4 + 1 + 1 = 16 = 2^4$. Counting subsets by size and counting them by "in or out" choices give the same answer, $|\mathcal P(A)| = 2^n$.
:::

:::formulas
$$A\cup B = \{x : x\in A\lor x\in B\}\qquad A\cap B = \{x : x\in A\land x\in B\}\qquad A\setminus B = A\cap B^c$$
$$(A\cup B)^c = A^c\cap B^c\qquad(A\cap B)^c = A^c\cup B^c$$
$$A\cap(B\cup C) = (A\cap B)\cup(A\cap C)\qquad A\cup(B\cap C) = (A\cup B)\cap(A\cup C)$$
$$|A\cup B| = |A| + |B| - |A\cap B|$$
$$|A\cup B\cup C| = |A| + |B| + |C| - |A\cap B| - |A\cap C| - |B\cap C| + |A\cap B\cap C|$$
$$|\mathcal P(A)| = 2^{|A|}\qquad|A\times B| = |A|\cdot|B|$$
:::

:::thm Size of the power set
If $|A| = n$, then $|\mathcal P(A)| = 2^n$.
:::

:::proof
By induction on $n$. Base $n = 0$: $\mathcal P(\emptyset) = \{\emptyset\}$ has $1 = 2^0$ element. Step: let $|A| = k + 1$, pick $a\in A$ and let $A' = A\setminus\{a\}$, so $|A'| = k$. Every subset of $A$ either omits $a$ (and is a subset of $A'$: $2^k$ choices) or contains $a$ (and is $S\cup\{a\}$ for a subset $S$ of $A'$: $2^k$ choices). Total $2^k + 2^k = 2^{k+1}$.
:::

:::steps 100 people: 60 use app X, 45 use app Y, 20 use both. How many use neither?
1. Inclusion–exclusion: $|X\cup Y| = 60 + 45 - 20 = 85$.
2. Neither is the complement: $100 - 85 = 15$.
:::

:::steps How many integers from 1 to 100 are divisible by 2, 3 or 5?
1. Singles: $\lfloor100/2\rfloor + \lfloor100/3\rfloor + \lfloor100/5\rfloor = 50 + 33 + 20 = 103$.
2. Pairs (divisible by 6, 10, 15): $16 + 10 + 6 = 32$.
3. Triple (divisible by 30): $3$.
4. Total: $103 - 32 + 3 = 74$.
:::

:::steps List $\mathcal P(\{1, 2, 3\})$
1. Size 0: $\emptyset$. Size 1: $\{1\}, \{2\}, \{3\}$.
2. Size 2: $\{1, 2\}, \{1, 3\}, \{2, 3\}$. Size 3: $\{1, 2, 3\}$.
3. Count: $1 + 3 + 3 + 1 = 8 = 2^3$.
:::

:::mock Exam question
Let $U = \{1, 2, \dots, 10\}$, $A = \{1, 2, 3, 4, 5\}$, $B = \{2, 4, 6, 8, 10\}$. (a) Find $A\cap B$, $A\cup B$, $A\setminus B$ and $(A\cup B)^c$. (b) Verify $|A\cup B| = |A| + |B| - |A\cap B|$. (c) How many elements does $\mathcal P(A\cap B)\times B$ have?
:::solution
(a) $A\cap B = \{2, 4\}$, $A\cup B = \{1, 2, 3, 4, 5, 6, 8, 10\}$, $A\setminus B = \{1, 3, 5\}$, $(A\cup B)^c = \{7, 9\}$.
(b) $5 + 5 - 2 = 8 = |A\cup B|$.
(c) $|\mathcal P(A\cap B)| = 2^2 = 4$ and $|B| = 5$, so $4\times5 = 20$.
:::
:::

:::ml
Evaluation metrics are set operations on predicted and true sets. **Precision** $= \frac{|\text{pred}\cap\text{true}|}{|\text{pred}|}$, **recall** $= \frac{|\text{pred}\cap\text{true}|}{|\text{true}|}$, and **Jaccard similarity** or **IoU** (intersection over union) $= \frac{|A\cap B|}{|A\cup B|}$ scores object detection and segmentation masks. In probability, $P(A\cup B) = P(A) + P(B) - P(A\cap B)$ is inclusion–exclusion with probabilities. A grid search over hyperparameters explores a Cartesian product.
:::

:::cs
SQL's `UNION`, `INTERSECT` and `EXCEPT` are $\cup$, $\cap$ and $\setminus$, and a `JOIN` without a condition is a Cartesian product. Bitmasks store subsets of a small universe as binary numbers, so union is bitwise OR and intersection is bitwise AND. Enumerating all $2^n$ subsets with a loop over `0 .. 2^n - 1` is the classic brute-force approach for small $n$.
:::

:::real
Planning a party menu, "guests who are vegetarian or gluten-free" is a union and "both" is an intersection, and inclusion–exclusion tells the caterer how many special meals are needed. A restaurant offering 3 starters and 4 mains offers $3\times4 = 12$ two-course meals: a Cartesian product.
:::

:::quiz
? How many subsets does $\{a, b, c, d\}$ have?
= 16
> $2^4 = 16$, including $\emptyset$ and the whole set.

? $|A\times B|$ when $|A| = 3$ and $|B| = 4$?
= 12
> Each of the 3 first entries pairs with each of the 4 second entries.

? $|A| = 10$, $|B| = 7$, $|A\cap B| = 3$. What is $|A\cup B|$?
= 14
> $10 + 7 - 3 = 14$.

? $(A\cap B)^c$ equals...
- $A^c\cap B^c$
+ $A^c\cup B^c$
- $A\cup B$
> De Morgan: the complement of an intersection is the union of the complements.

? With $A = \{1, 2, 3\}$ and $B = \{2, 3, 4\}$, what is $|A\triangle B|$?
= 2
> $A\triangle B = \{1, 4\}$, the elements in exactly one set.

? If $A$ and $B$ are disjoint, $|A\cup B|$ equals...
+ $|A| + |B|$
- $|A|\cdot|B|$
- $|A| + |B| - 1$
> Disjoint means $|A\cap B| = 0$, so nothing is double counted.
:::

# Unit: Relations

## Lesson: Relations and their properties {#relations}
@summary: Relations as sets of ordered pairs, three ways to draw them, and the properties reflexive, symmetric, antisymmetric and transitive.

### Connections between things
Much of the world is about how things are connected rather than about the things themselves. "Alice follows Bob" on a social network. "Course A is a prerequisite of course B." "3 is less than 5." "Paris is in the same country as Lyon." Each of these is a statement that a certain pair of objects is linked in a certain way. Mathematics captures all of them with one idea: a **relation**.

The trick is surprisingly simple. Instead of trying to define what "follows" or "less than" *means*, we just record **which pairs** are linked. The relation "follows" is the set of all pairs $(x, y)$ such that $x$ follows $y$. Everything we want to know about the relation can be read off from that set.

### The definition
A **relation** $R$ from a set $A$ to a set $B$ is any subset of the Cartesian product $A\times B$. If $(a, b)\in R$ we say $a$ is related to $b$ and write $aRb$. When $A = B$, we call $R$ a relation **on** $A$.

For example, on $A = \{1, 2, 3\}$ the relation "less than" is
$$R_< = \{(1, 2), (1, 3), (2, 3)\}.$$
Order matters: $(1, 2)\in R_<$ but $(2, 1)\notin R_<$. The relation "divides" on $\{1, 2, 3, 4\}$ is $\{(1,1), (1,2), (1,3), (1,4), (2,2), (2,4), (3,3), (4,4)\}$, since $a\mid b$ means $b$ is a multiple of $a$.

Because a relation is just a subset of $A\times A$, and $A\times A$ has $n^2$ pairs when $|A| = n$, there are $2^{n^2}$ possible relations on an $n$-element set. Even for $n = 3$ that is $2^9 = 512$ relations, so it pays to sort them by their properties.

### Three ways to picture a relation
**A list of pairs**, as above, is precise but hard to read.

**A matrix**: make a grid with a row for each $a$ and a column for each $b$, and put a 1 in row $a$, column $b$ if $aRb$, otherwise 0. For "less than" on $\{1, 2, 3\}$ the matrix has 1s strictly above the diagonal. The diagonal entries say whether each element is related to itself.

**A directed graph**: draw each element as a dot and an arrow from $a$ to $b$ whenever $aRb$. A pair $(a, a)$ appears as a small loop. Social networks are drawn exactly this way, as are road maps with one-way streets.

Switching between these views is a key skill, because each property below is easiest to see in one of them.

### Reflexive
$R$ is **reflexive** on $A$ if every element is related to itself: $aRa$ for all $a\in A$. In the matrix, the whole diagonal is 1s; in the graph, every dot has a loop. "$\le$" is reflexive ($3\le3$) and "divides" is reflexive ($a\mid a$), but "$<$" is not ($3 < 3$ is false). "Has the same birthday as" is reflexive.

### Symmetric
$R$ is **symmetric** if $aRb$ always implies $bRa$. In the matrix, this means the grid is a mirror image across the diagonal; in the graph, every arrow comes with a return arrow. "Is a sibling of" and "is married to" are symmetric; "follows" on social media is not, since you can follow a celebrity who doesn't follow you.

### Antisymmetric
$R$ is **antisymmetric** if $aRb$ and $bRa$ together force $a = b$. In other words, two *different* elements are never related in both directions: no two-way arrows between distinct dots. "$\le$" is antisymmetric: if $x\le y$ and $y\le x$ then $x = y$. "Divides" on positive integers is antisymmetric too.

Antisymmetric is *not* the opposite of symmetric. The relation "$=$" is both symmetric and antisymmetric. The relation $\{(1, 2), (2, 1), (1, 3)\}$ is neither, because $(1, 2)$ and $(2, 1)$ break antisymmetry while $(1, 3)$ without $(3, 1)$ breaks symmetry.

### Transitive
$R$ is **transitive** if $aRb$ and $bRc$ imply $aRc$. Chains of arrows can be shortcut: whenever you can go $a\to b\to c$, there's a direct arrow $a\to c$. "$<$" is transitive (if $2 < 5$ and $5 < 9$ then $2 < 9$), "is an ancestor of" is transitive, and "divides" is transitive (if $a\mid b$ and $b\mid c$ then $a\mid c$). "Is a friend of" is famously *not* transitive: your friend's friend may be a stranger.

To check transitivity by hand, look at every pair of pairs that chain together. For $R = \{(1, 2), (2, 3)\}$, the chain $(1, 2), (2, 3)$ requires $(1, 3)$, which is missing, so $R$ is not transitive. Adding $(1, 3)$ fixes it.

### Closures and inverses
If a relation lacks a property, the **closure** is the smallest relation containing it that has the property. The reflexive closure adds all loops $(a, a)$. The symmetric closure adds the reverse of every pair. The **transitive closure** keeps adding shortcut pairs until no chain is left without one; for a graph, it answers "can I get from $a$ to $b$ by following arrows?". The **inverse relation** $R^{-1} = \{(b, a) : (a, b)\in R\}$ reverses every arrow, so the inverse of "$<$" is "$>$", and $R$ is symmetric exactly when $R = R^{-1}$.

### Why these four properties?
These properties are not chosen at random. Combinations of them define the two most important kinds of relation in mathematics. Reflexive + symmetric + transitive gives an **equivalence relation**, a notion of "the same in some respect", studied in the next lesson. Reflexive + antisymmetric + transitive gives a **partial order**, a notion of "comes before", studied after that.

:::def Relation
A relation from $A$ to $B$ is a subset $R\subseteq A\times B$. We write $aRb$ when $(a, b)\in R$.
:::

:::def Reflexive
$R$ on $A$ is reflexive if $aRa$ for every $a\in A$.
:::

:::def Symmetric
$R$ is symmetric if $aRb$ implies $bRa$.
:::

:::def Antisymmetric
$R$ is antisymmetric if $aRb$ and $bRa$ imply $a = b$.
:::

:::def Transitive
$R$ is transitive if $aRb$ and $bRc$ imply $aRc$.
:::

:::def Transitive closure
The smallest transitive relation containing $R$; $(a, b)$ is in it exactly when there is a path of arrows from $a$ to $b$.
:::

:::warn Common mistakes
Thinking antisymmetric means "not symmetric". Declaring a relation reflexive when only *some* elements have loops (it needs all of them). Forgetting that $(a, b)$ and $(b, a)$ are different pairs. And concluding "transitive" after checking only a few chains: one failing chain is enough to break it.
:::

### Summary
A relation is a set of ordered pairs, which you can draw as a list, a 0/1 matrix or a directed graph. Reflexive means every element relates to itself, symmetric means every arrow has a return arrow, antisymmetric means no two-way arrows between distinct elements, and transitive means every chain has a shortcut. Closures add the fewest pairs needed to gain a property.

@viz g08-relation preset=divides n=6 | The relation "a divides b" on {1, …, 6}: matrix on one side, directed graph on the other, properties checked live.

:::explore
**What to try**
1. With "divides", read the property checks: which of reflexive, symmetric, antisymmetric, transitive hold?
2. Click the cell in row 2, column 1 to add the pair $(2, 1)$ and watch which properties break and why.
3. Switch the preset to "<", then to "same parity", and compare the patterns in the matrix.
4. Press "clear", click in $(1,2)$ and $(2,3)$, then press "transitive closure".

**What to notice:** "divides" is reflexive, antisymmetric and transitive. Adding $(2, 1)$ creates a two-way arrow between 1 and 2, breaking antisymmetry. "<" has an empty diagonal, so it isn't reflexive, and "same parity" gives a mirror-image matrix: it is symmetric. The transitive closure adds exactly $(1, 3)$, the shortcut of the chain.
:::

:::formulas
$$R\subseteq A\times B,\qquad aRb\iff(a, b)\in R$$
$$\text{number of relations on an } n\text{-element set} = 2^{n^2}$$
$$R^{-1} = \{(b, a) : (a, b)\in R\}\qquad R\text{ symmetric}\iff R = R^{-1}$$
$$\text{Reflexive: }\forall a\,(aRa)\quad\text{Symmetric: }aRb\to bRa\quad\text{Antisymmetric: }aRb\land bRa\to a = b\quad\text{Transitive: }aRb\land bRc\to aRc$$
:::

:::thm Divides is transitive
For integers $a, b, c$: if $a\mid b$ and $b\mid c$, then $a\mid c$.
:::

:::proof
$a\mid b$ means $b = ak$ for some integer $k$, and $b\mid c$ means $c = bm$ for some integer $m$. Then $c = (ak)m = a(km)$, and $km$ is an integer, so $a\mid c$.
:::

:::steps Classify $R = \{(1,1), (2,2), (3,3), (1,2), (2,1)\}$ on $\{1, 2, 3\}$
1. Reflexive: all of $(1,1), (2,2), (3,3)$ are present. Yes.
2. Symmetric: the only off-diagonal pairs $(1,2)$ and $(2,1)$ come together. Yes.
3. Antisymmetric: $(1,2)$ and $(2,1)$ with $1\ne2$. No.
4. Transitive: chains $(1,2),(2,1)$ need $(1,1)$ ✓, and $(2,1),(1,2)$ need $(2,2)$ ✓; all others involve a loop. Yes.
:::

:::steps Find the transitive closure of $\{(1,2), (2,3), (3,4)\}$
1. Chains of length 2: $1\to2\to3$ adds $(1,3)$; $2\to3\to4$ adds $(2,4)$.
2. Now $1\to3\to4$ adds $(1,4)$.
3. No new chains remain. Closure: $\{(1,2), (1,3), (1,4), (2,3), (2,4), (3,4)\}$, which is "$<$" on $\{1, 2, 3, 4\}$.
:::

:::steps How many relations on $\{a, b, c\}$ are reflexive?
1. The 3 diagonal pairs are forced to be in the relation.
2. The other $9 - 3 = 6$ pairs are each in or out freely.
3. Total $2^6 = 64$.
:::

:::mock Exam question
On $\mathbb{Z}$, define $aRb$ iff $a - b$ is even, and $aSb$ iff $a < b + 1$. For each of $R$ and $S$, decide whether it is reflexive, symmetric, antisymmetric and transitive, with a reason or counterexample.
:::solution
$R$: reflexive ($a - a = 0$ is even), symmetric ($b - a = -(a - b)$ is even), not antisymmetric ($0R2$ and $2R0$ but $0\ne2$), transitive ($a - c = (a - b) + (b - c)$ is a sum of evens).
$S$: for integers, $a < b + 1$ means $a\le b$. So $S$ is "$\le$": reflexive, not symmetric ($1S2$ but not $2S1$), antisymmetric, transitive.
:::
:::

:::cs
Databases store relations as tables of rows; a table with columns (student, course) is literally a subset of Students × Courses, which is why they're called *relational* databases. Graphs in algorithms are relations stored as adjacency matrices or lists, and the Floyd–Warshall algorithm computes the transitive closure ("is there any path?") in $O(n^3)$ time, the same triple loop the widget uses.
:::

:::ml
Knowledge graphs used in search and recommendation store facts as relations (head, relation, tail), like (Paris, capital_of, France), and models such as TransE learn embeddings so that related pairs are close. Graph neural networks pass messages along the arrows of a relation's adjacency matrix. Whether the relation is symmetric decides if you use an undirected or directed graph.
:::

:::real
Family trees are full of relations: "is a parent of" is not transitive, but "is an ancestor of" is its transitive closure. "Lives in the same city as" is reflexive, symmetric and transitive. Airline route maps are directed graphs, and "can I fly from here to there with connections?" is a transitive closure question.
:::

:::quiz
? How many relations are there on a 2-element set?
= 16
> $A\times A$ has $2^2 = 4$ pairs, and each is in or out: $2^4 = 16$.

? Is "$<$" on the integers reflexive?
- Yes
+ No
> $a < a$ is never true.

? $R = \{(1,2), (2,3)\}$ on $\{1, 2, 3\}$. Which single pair must be added to make it transitive?
- $(2,1)$
+ $(1,3)$
- $(3,1)$
> The chain $1\to2\to3$ needs the shortcut $(1,3)$.

? Can a relation be both symmetric and antisymmetric?
+ Yes, for example "="
- No, never
> If there are no arrows between distinct elements, both conditions hold. Equality is the standard example.

? The matrix of a symmetric relation is...
+ the same as its transpose
- all 1s on the diagonal
- upper triangular
> $aRb\iff bRa$ means entry $(a,b)$ equals entry $(b,a)$.

? How many pairs are in "divides" on $\{1, 2, 3, 4\}$?
= 8
> $(1,1),(1,2),(1,3),(1,4),(2,2),(2,4),(3,3),(4,4)$.
:::

## Lesson: Equivalence relations and partitions {#equivalence}
@summary: Relations that mean "the same in some respect", equivalence classes, partitions, and congruence mod n.

### When different things count as the same
A cashier doesn't care which particular one-dollar coin you hand over; any of them will do. A clock doesn't distinguish 3 o'clock from 15 o'clock. A colour-blind sorting machine might treat red and green apples as the same. In all these cases, objects that are genuinely different are treated as **equivalent** for some purpose. Mathematics makes this precise with **equivalence relations**, and it turns out to be one of the most useful ideas in all of abstract math: it is how we build fractions from pairs of integers, clock arithmetic from the integers, and categories from raw data.

### The definition
An **equivalence relation** on a set $A$ is a relation $\sim$ that is
1. **reflexive**: $a\sim a$ (everything is equivalent to itself),
2. **symmetric**: if $a\sim b$ then $b\sim a$,
3. **transitive**: if $a\sim b$ and $b\sim c$ then $a\sim c$.

These are exactly the properties we expect of "is the same as" in some respect. If two students have the same birthday as each other, the order you say it in doesn't matter (symmetric), and if Ana shares a birthday with Ben and Ben with Cara, then Ana shares one with Cara (transitive).

Examples are everywhere. "Has the same remainder when divided by 3" on the integers. "Has the same length as" on strings. "Lives in the same country as" on people. Equality itself is the strictest equivalence relation. Non-examples are just as instructive: "$\le$" is not symmetric; "is a friend of" is not transitive; "differs by at most 1" on the integers is reflexive and symmetric but not transitive ($1\sim2$ and $2\sim3$, but $1\not\sim3$).

### Equivalence classes
Given $a\in A$, the **equivalence class** of $a$ is the set of everything equivalent to it:
$$[a] = \{x\in A : x\sim a\}.$$
For "same remainder mod 3" on $\mathbb{Z}$, there are exactly three classes:
$$[0] = \{\dots, -3, 0, 3, 6, \dots\},\quad[1] = \{\dots, -2, 1, 4, 7, \dots\},\quad[2] = \{\dots, -1, 2, 5, 8, \dots\}.$$
Notice that $[1] = [4] = [7]$: any member of a class can **represent** it. Classes are the "bins" that the relation sorts elements into.

### Partitions
A **partition** of $A$ is a way to cut $A$ into non-empty pieces that don't overlap and together cover everything. The pieces of a partition are called its **blocks**. Sorting laundry into whites, colours and darks partitions the laundry, provided every item goes into exactly one pile.

The central theorem of this lesson is that **equivalence relations and partitions are the same thing seen from two sides**. Every equivalence relation's classes form a partition, and every partition defines an equivalence relation ("is in the same block as"). If someone gives you bins, you get a relation; if someone gives you a relation, you get bins.

### Why the classes never overlap
Here is the heart of the matter. Suppose two classes $[a]$ and $[b]$ share some element $c$. Then $c\sim a$ and $c\sim b$. By symmetry $a\sim c$, and by transitivity with $c\sim b$ we get $a\sim b$. Now any $x\in[a]$ has $x\sim a\sim b$, so $x\in[b]$; likewise every element of $[b]$ lies in $[a]$. So $[a] = [b]$. Two classes are either **identical or disjoint**; they can never partly overlap. Reflexivity guarantees $a\in[a]$, so no class is empty and every element lies in some class. That's exactly a partition.

This argument also gives a practical test: $[a] = [b]$ if and only if $a\sim b$. To check whether two fractions are equal, or two times are the same on a clock, you don't need to list classes; you just test the relation.

### Congruence modulo n
The most important equivalence relation in computer science is **congruence modulo $n$**. For a positive integer $n$, we write
$$a\equiv b\pmod n\iff n\mid(a - b),$$
which says $a$ and $b$ leave the same remainder when divided by $n$. For instance $17\equiv5\pmod{12}$ because $17 - 5 = 12$, which is why 17:00 is 5 pm. It's reflexive ($n\mid0$), symmetric ($n\mid(a - b)$ implies $n\mid(b - a)$) and transitive ($a - c = (a - b) + (b - c)$). Its $n$ classes $[0], [1], \dots, [n - 1]$ are the **residue classes**, and the set of them is written $\mathbb{Z}_n$. Clock arithmetic, hashing, cryptography and checksums all work inside $\mathbb{Z}_n$.

### Building new objects from old
Equivalence relations let us *define* new mathematical objects as classes. A fraction like $\frac12$ is really the class of all integer pairs $(a, b)$ with $b\ne0$ under the relation $(a, b)\sim(c, d)\iff ad = bc$, so $(1, 2)\sim(2, 4)\sim(3, 6)$. That's why $\frac12 = \frac24$: they are two names for one class. The set of classes of $A$ under $\sim$ is called the **quotient set** $A/{\sim}$.

### Counting with classes
If all classes have the same size $k$ and $|A| = n$, then there are $n/k$ classes. Seating $n$ people around a round table counts arrangements up to rotation: each class of $n$ rotations has $n$ members, so there are $n!/n = (n - 1)!$ distinct seatings.

:::def Equivalence relation
A relation that is reflexive, symmetric and transitive.
:::

:::def Equivalence class
$[a] = \{x\in A : x\sim a\}$, the set of all elements equivalent to $a$.
:::

:::def Partition
A collection of non-empty, pairwise disjoint subsets (blocks) of $A$ whose union is $A$.
:::

:::def Congruence modulo n
$a\equiv b\pmod n$ means $n$ divides $a - b$; equivalently $a$ and $b$ have the same remainder on division by $n$.
:::

:::def Quotient set
$A/{\sim}$, the set of all equivalence classes of $A$ under $\sim$.
:::

:::warn Common mistakes
Checking only reflexive and symmetric and forgetting transitivity (the "differs by at most 1" trap). Thinking classes can partially overlap: they are always identical or disjoint. Treating a class as a single number rather than a set. And forgetting that a partition's blocks must be non-empty.
:::

### Summary
An equivalence relation is reflexive, symmetric and transitive; it captures "the same in some respect". Its equivalence classes are identical or disjoint and cover the whole set, so they form a partition, and every partition comes from an equivalence relation. $[a] = [b]$ exactly when $a\sim b$. Congruence mod $n$, with its $n$ residue classes, is the key example.

@viz g08-relation preset=same_remainder_mod_3 n=6 | "Same remainder mod 3" on {1, …, 6}: the checker lists the equivalence classes when all three properties hold.

:::explore
**What to try**
1. Read the property checks and the listed equivalence classes.
2. Click the cell $(1, 2)$ to add the pair $(1, 2)$. Which property fails now?
3. Press "symmetric closure" and then "transitive closure". What are the classes now?
4. Switch the preset to "same parity", then to "≤", and compare.

**What to notice:** mod 3 on $\{1,\dots,6\}$ gives the classes $\{1,4\}, \{2,5\}, \{3,6\}$, the matrix is block-like once you group equivalent elements, and every row's 1s pick out that row's class. After adding $(1, 2)$ and closing, the classes $\{1, 4\}$ and $\{2, 5\}$ merge into one: once two classes share a link, transitivity forces them to become a single class. "≤" isn't symmetric, so no classes are shown.
:::

@viz modular m=12 k=5 | A clock with 12 positions, one for each residue class mod 12. Each i is joined to 5i mod 12.

:::explore
**What to try**
1. With $m = 12$ and $k = 5$, follow the line from 5. It lands on 1, because $5\cdot5 = 25 = 2\cdot12 + 1$, so $25\equiv1\pmod{12}$.
2. Follow the line from 7: $35 = 2\cdot12 + 11$, so it lands on 11.
3. Change the modulus to 5 and count the positions on the clock.

**What to notice:** however large $ki$ gets, it lands on one of only $m$ positions $0, 1, \dots, m - 1$. Each position is a residue class, so congruence mod $m$ always has exactly $m$ classes, and computing "mod $m$" just means naming the class by its representative between 0 and $m - 1$.
:::

:::formulas
$$[a] = \{x\in A : x\sim a\}\qquad a\sim b\iff[a] = [b]$$
$$[a]\cap[b] = \emptyset\ \text{ or }\ [a] = [b]$$
$$a\equiv b\pmod n\iff n\mid(a - b)\qquad\mathbb{Z}_n = \{[0], [1], \dots, [n - 1]\}$$
$$\text{equal classes of size } k \text{ in a set of size } n\ \Rightarrow\ n/k\ \text{classes}$$
:::

:::thm Equivalence classes form a partition
If $\sim$ is an equivalence relation on $A$, then the distinct equivalence classes are non-empty, pairwise disjoint, and their union is $A$.
:::

:::proof
Non-empty and covering: by reflexivity $a\in[a]$ for every $a$. Disjoint or equal: suppose $c\in[a]\cap[b]$. Then $c\sim a$ and $c\sim b$, so by symmetry and transitivity $a\sim b$. For any $x\in[a]$, $x\sim a$ and $a\sim b$ give $x\sim b$, so $[a]\subseteq[b]$; by the symmetric argument $[b]\subseteq[a]$. Hence $[a] = [b]$.
:::

:::steps Show that $aRb\iff a^2 = b^2$ on $\mathbb{Z}$ is an equivalence relation and find its classes
1. Reflexive: $a^2 = a^2$. Symmetric: $a^2 = b^2\Rightarrow b^2 = a^2$. Transitive: $a^2 = b^2$ and $b^2 = c^2$ give $a^2 = c^2$.
2. $a^2 = b^2$ iff $b = a$ or $b = -a$.
3. Classes: $[0] = \{0\}$ and $[a] = \{a, -a\}$ for $a\ge1$.
:::

:::steps Is $aRb\iff|a - b|\le1$ on $\mathbb{Z}$ an equivalence relation?
1. Reflexive: $|a - a| = 0\le1$. Yes.
2. Symmetric: $|a - b| = |b - a|$. Yes.
3. Transitive: $0R1$ and $1R2$, but $|0 - 2| = 2 > 1$. No, so it is not an equivalence relation.
:::

:::steps List the residue class of 7 mod 4 between $-10$ and 20
1. $7 = 4\cdot1 + 3$, so the class is $[3]$: numbers $4k + 3$.
2. In range: $-9, -5, -1, 3, 7, 11, 15, 19$.
:::

:::mock Exam question
On $A = \{1, 2, 3, 4, 5, 6\}$ the partition $\{\{1, 4\}, \{2, 3, 6\}, \{5\}\}$ is given. (a) How many ordered pairs are in the corresponding equivalence relation? (b) Is $(3, 6)$ in it? (c) In general, how many pairs does an equivalence relation with blocks of sizes $k_1, \dots, k_m$ contain?
:::solution
(a) Each block of size $k$ contributes $k^2$ pairs (every element relates to every element of its block, including itself): $2^2 + 3^2 + 1^2 = 4 + 9 + 1 = 14$.
(b) Yes, 3 and 6 lie in the same block.
(c) $k_1^2 + k_2^2 + \dots + k_m^2$.
:::
:::

:::cs
Union–find (disjoint-set union) maintains a partition under "merge these two classes" operations in nearly constant time per operation, and powers Kruskal's minimum spanning tree algorithm and image segmentation. Hash tables bucket keys by their residue class mod the table size. Minimizing a DFA merges states that are equivalent, meaning no input string can tell them apart.
:::

:::ml
Clustering produces a partition of data points, so each clustering is an equivalence relation "is in the same cluster as". Classification itself partitions inputs by predicted label. Data augmentation treats an image and its flips or crops as equivalent, and models built to give the same output on every member of a class are called *invariant*.
:::

:::real
Currency is equivalence in action: any two 10-euro notes are interchangeable. Time zones and the 12-hour clock use congruence mod 12 or 24. Blood types partition people into groups, and the days of the week are the residue classes of day numbers mod 7.
:::

:::quiz
? How many equivalence classes does congruence mod 7 have on $\mathbb{Z}$?
= 7
> The classes are $[0], [1], \dots, [6]$, one for each possible remainder.

? Is $38\equiv14\pmod{12}$?
+ Yes
- No
> $38 - 14 = 24 = 2\cdot12$.

? Which property does "is a friend of" usually fail?
- Symmetric
+ Transitive
- Being a relation
> Friendship is (ideally) symmetric, but a friend of a friend need not be your friend.

? Two equivalence classes share one element. Then they are...
+ equal
- disjoint
- impossible to compare
> Classes are either identical or disjoint, so one shared element forces them to be equal.

? How many ordered pairs are in the equivalence relation with blocks $\{1, 2\}, \{3, 4, 5\}$?
= 13
> $2^2 + 3^2 = 4 + 9 = 13$.

? 6 people sit at a round table, where rotations count as the same seating. How many seatings are there?
= 120
> $6!/6 = 5! = 120$: each class contains 6 rotations.
:::

## Lesson: Partial orders and Hasse diagrams {#partial-orders}
@summary: Relations that mean "comes before": posets, Hasse diagrams, total orders, minimal and maximal elements, bounds and topological sorting.

### Putting things in order when not everything compares
Getting dressed in the morning has rules. Socks go on before shoes, underwear before trousers, a shirt before a tie. But some pairs of items have no rule at all: it doesn't matter whether you put on your watch before or after your socks. So "must come before" orders some pairs of tasks and leaves others free. That is exactly what a **partial order** is: an ordering in which some pairs are comparable and others aren't.

Partial orders are everywhere in computer science. Build systems compile files in an order that respects dependencies, spreadsheets recalculate cells after the cells they depend on, course catalogues list prerequisites, and version-control systems order commits by ancestry. Understanding the structure of these orders tells you how to schedule work, detect impossible requirements (circular dependencies), and find "first" and "last" items.

### The definition
A **partial order** on a set $A$ is a relation $\preceq$ that is
1. **reflexive**: $a\preceq a$,
2. **antisymmetric**: if $a\preceq b$ and $b\preceq a$ then $a = b$,
3. **transitive**: if $a\preceq b$ and $b\preceq c$ then $a\preceq c$.

A set with a partial order is a **partially ordered set**, or **poset**, written $(A, \preceq)$. Compare this with an equivalence relation: the only change is that symmetry has been replaced by antisymmetry. Equivalence says "the same as"; a partial order says "at most" or "comes no later than".

Three standard examples:
- $(\mathbb{R}, \le)$: the usual ordering of numbers.
- $(\mathbb{Z}^+, \mid)$: divisibility. $2\mid6$ and $3\mid6$, but neither $2\mid3$ nor $3\mid2$.
- $(\mathcal P(S), \subseteq)$: subsets ordered by inclusion. $\{a\}\subseteq\{a, b\}$, but $\{a\}$ and $\{b\}$ are not comparable.

### Comparable and incomparable; total orders
Two elements $a$ and $b$ are **comparable** if $a\preceq b$ or $b\preceq a$; otherwise they are **incomparable**. In the divisibility poset, 4 and 6 are incomparable. If every pair of elements is comparable, the order is a **total order** (or linear order). The usual $\le$ on numbers is total, and so is alphabetical order on words. Divisibility and subset inclusion are not total, which is why they're called *partial*.

There is also a strict version. A **strict partial order** $\prec$ is irreflexive ($a\not\prec a$) and transitive; "$<$" and "is a proper subset of" are examples. You can always move between the two: $a\prec b$ means $a\preceq b$ and $a\ne b$.

### Hasse diagrams
Drawing every arrow of a partial order makes a mess: divisibility on $\{1, \dots, 6\}$ has 14 pairs. A **Hasse diagram** keeps only the essential information. We draw each element as a dot, place bigger elements higher up, and draw a line from $a$ up to $b$ only when $b$ **covers** $a$: $a\prec b$ with nothing strictly in between. We leave out the loops (reflexivity is assumed), the arrowheads (up is the direction) and the shortcut lines (transitivity recovers them).

For divisibility on $\{1, 2, 3, 4, 5, 6\}$: 1 sits at the bottom. Above it are 2, 3 and 5, each joined to 1. Above 2 is 4. Above both 2 and 3 is 6. There's no line from 1 to 6, because the path $1 - 2 - 6$ already shows $1\mid6$. Only 6 lines remain from 14 pairs, and the structure becomes readable at a glance: $a\preceq b$ exactly when you can climb from $a$ to $b$.

### Special elements
In a poset, an element is **minimal** if nothing is strictly below it, and **maximal** if nothing is strictly above it. It is the **least** element if it is below *every* element, and the **greatest** element if it is above every element. These are different ideas. In divisibility on $\{2, 3, 4, 5, 6\}$, the minimal elements are 2, 3 and 5, and there is no least element, because 2 and 3 are incomparable. The maximal elements are 4, 5 and 6, with no greatest element.

A least element, if it exists, is unique and is the only minimal element. Every finite non-empty poset has at least one minimal element: start anywhere and keep stepping down to something strictly smaller; since the set is finite and you can't revisit an element (antisymmetry plus transitivity rule out cycles), you must stop, and where you stop is minimal.

### Bounds, joins and meets
An **upper bound** of $a$ and $b$ is an element above both. The **least upper bound** (or **join**, $a\vee b$) is the smallest of these, if it exists; the **greatest lower bound** (or **meet**, $a\wedge b$) is defined the same way from below. In divisibility, the join of 4 and 6 is $\operatorname{lcm}(4, 6) = 12$ and the meet is $\gcd(4, 6) = 2$. In $(\mathcal P(S), \subseteq)$, the join is union and the meet is intersection. A poset in which every pair has both a join and a meet is called a **lattice**. The logic connectives OR and AND are the join and meet of the two-element order false $\preceq$ true, which is why the same symbols $\vee$ and $\wedge$ are used.

### Topological sorting
Can every partial order be stretched into a total order without breaking any of its rules? For finite posets, yes. Repeatedly remove a minimal element and write it down; the list you produce is a **topological sort**, or **linear extension**. For getting dressed it might read underwear, socks, trousers, shirt, shoes, tie, watch. There can be many valid sorts, and every valid schedule for a set of dependent tasks is one of them.

If a set of "must come before" rules contains a cycle, such as $A$ before $B$, $B$ before $C$ and $C$ before $A$, it is not a partial order (antisymmetry and transitivity would force $A = B = C$), and no schedule exists. That is what a build tool means by a "circular dependency".

:::def Partial order
A relation that is reflexive, antisymmetric and transitive. A set with one is a poset.
:::

:::def Total order
A partial order in which every two elements are comparable.
:::

:::def Hasse diagram
A drawing of a finite poset showing only cover relations, with larger elements higher, and no loops, arrows or implied lines.
:::

:::def Minimal element
An element with nothing strictly below it. A least element is below every element.
:::

:::def Topological sort
A listing of a finite poset's elements as a total order that respects the partial order: if $a\prec b$ then $a$ comes before $b$.
:::

:::warn Common mistakes
Confusing minimal with least: a poset can have several minimal elements and no least one. Drawing implied lines in a Hasse diagram. Assuming any two elements are comparable. And treating "partial order" and "equivalence relation" as the same: one needs antisymmetry, the other symmetry.
:::

### Summary
A partial order is reflexive, antisymmetric and transitive; total orders compare every pair. Hasse diagrams draw only covering lines, with "up" meaning "bigger". Minimal and maximal elements always exist in finite posets, but least and greatest might not. Joins and meets are least upper and greatest lower bounds, and every finite poset can be topologically sorted, which is how dependent tasks are scheduled.

@viz g08-relation preset=divides n=6 | Divisibility on {1, …, 6}: the checker confirms a partial order and tests whether it is total.

:::explore
**What to try**
1. Read the checks for "divides": reflexive, antisymmetric and transitive should all say yes.
2. Find a pair of numbers with a 0 in both $(a, b)$ and $(b, a)$. Those are incomparable.
3. Switch to "≤" and see whether the order is total.
4. Switch back to "divides" and press "symmetric closure".

**What to notice:** 4 and 6 (or 2 and 3) are incomparable, so divisibility is partial but not total, while "≤" fills the whole upper triangle and is total. Making the relation symmetric destroys antisymmetry, so it stops being a partial order: you can't have "comes before" and "two-way" at the same time.
:::

@viz graph graph=tree alg=dfs | A tree as a dependency structure: each node must come after its parent.

:::explore
**What to try**
1. Step through the depth-first search and write down the order in which nodes are first visited.
2. Check that every node appears after its parent in your list.

**What to notice:** the visit order respects "parent before child", so it is a topological sort of the tree's ancestor order. Real build tools run the same kind of search on dependency graphs.
:::

:::formulas
$$\text{partial order: reflexive} + \text{antisymmetric} + \text{transitive}$$
$$\text{total order: partial order with } a\preceq b\text{ or } b\preceq a\text{ for all } a, b$$
$$a\prec b\iff a\preceq b\land a\ne b$$
$$\text{in } (\mathbb{Z}^+, \mid):\ a\vee b = \operatorname{lcm}(a, b),\ a\wedge b = \gcd(a, b)\qquad\text{in } (\mathcal P(S), \subseteq):\ A\vee B = A\cup B,\ A\wedge B = A\cap B$$
:::

:::thm Every finite non-empty poset has a minimal element
If $(A, \preceq)$ is a poset with $A$ finite and non-empty, some $m\in A$ has no $x\in A$ with $x\prec m$.
:::

:::proof
Suppose not. Pick $a_1\in A$. It isn't minimal, so there is $a_2\prec a_1$; then $a_3\prec a_2$, and so on, forever. Since $A$ is finite, some element repeats: $a_i = a_j$ with $i < j$. By transitivity $a_j\prec a_i$, i.e. $a_i\prec a_i$, which contradicts irreflexivity of $\prec$. So a minimal element exists.
:::

:::steps Draw the Hasse diagram of divisibility on $\{1, 2, 3, 4, 6, 12\}$
1. Covers: 1 is covered by 2 and 3. 2 is covered by 4 and 6. 3 is covered by 6.
2. 4 is covered by 12, and 6 is covered by 12.
3. Lines: $1-2, 1-3, 2-4, 2-6, 3-6, 4-12, 6-12$: seven lines, with 1 at the bottom and 12 at the top. Least element 1, greatest 12.
:::

:::steps Find minimal and maximal elements of divisibility on $\{2, 3, 4, 6, 9, 12\}$
1. Minimal: 2 and 3 (no other element divides them).
2. Maximal: 9 and 12 (neither divides anything else in the set).
3. No least element (2 and 3 incomparable) and no greatest (9 and 12 incomparable).
:::

:::steps Give a topological sort of the tasks: A before C, B before C, C before D, B before E
1. Minimal elements: A and B. Remove A.
2. Remaining minimal: B. Remove B. Now C and E are minimal; remove C, then D, then E.
3. One valid order: A, B, C, D, E. (B, E, A, C, D is another.)
:::

:::mock Exam question
Consider $(\mathcal P(\{a, b, c\}), \subseteq)$. (a) How many elements and how many lines does its Hasse diagram have? (b) Name the least and greatest elements. (c) Find the join and meet of $\{a\}$ and $\{b, c\}$. (d) Is the order total?
:::solution
(a) $2^3 = 8$ elements. Each subset of size $k$ is covered by the $3 - k$ sets obtained by adding one more element: $1\cdot3 + 3\cdot2 + 3\cdot1 = 12$ lines (the edges of a cube).
(b) Least $\emptyset$, greatest $\{a, b, c\}$.
(c) Join $= \{a\}\cup\{b, c\} = \{a, b, c\}$; meet $= \{a\}\cap\{b, c\} = \emptyset$.
(d) No: $\{a\}$ and $\{b\}$ are incomparable.
:::
:::

:::cs
Build tools (make, Bazel), package managers and spreadsheet engines topologically sort a dependency graph and reject cycles. Git history is a partial order on commits, and the "merge base" of two branches is a greatest lower bound. In concurrent systems, Lamport's "happened before" relation is a partial order: some events are causally ordered and others are concurrent (incomparable).
:::

:::ml
Neural networks are computation graphs, and frameworks like PyTorch run the forward pass in a topological order and backpropagation in the reverse order. Ranking problems learn from partial preferences ("item A is better than B") rather than full rankings, and hierarchies of labels (dog $\preceq$ mammal $\preceq$ animal) form posets used in hierarchical classification.
:::

:::real
University prerequisites form a poset: a valid study plan is a topological sort. Recipes order steps partially (boil water before adding pasta, but chop vegetables any time). Military and company ranks form a total order, while the Olympic medal comparison "better in every event" is only partial.
:::

:::quiz
? Which property separates a partial order from an equivalence relation?
- Reflexivity
+ Antisymmetry instead of symmetry
- Transitivity
> Both are reflexive and transitive; a partial order is antisymmetric, an equivalence relation is symmetric.

? How many maximal elements does divisibility on $\{1, 2, \dots, 10\}$ have?
= 5
> 6, 7, 8, 9 and 10: none of them divides another number in the set.

? In $(\mathbb{Z}^+, \mid)$, what is the join of 4 and 6?
= 12
> The least common upper bound under divisibility is $\operatorname{lcm}(4, 6) = 12$.

? Is $(\mathcal P(\{1, 2\}), \subseteq)$ a total order?
- Yes
+ No
> $\{1\}$ and $\{2\}$ are incomparable.

? A poset can have more than one minimal element.
+ True
- False
> For example 2, 3 and 5 are all minimal in divisibility on $\{2, 3, 4, 5, 6\}$.

? How many lines are in the Hasse diagram of $\le$ on $\{1, 2, 3, 4, 5\}$?
= 4
> A total order on 5 elements is a single chain $1-2-3-4-5$ with 4 cover lines.
:::

# Unit: Functions and infinity

## Lesson: Functions, injections, surjections and bijections {#functions}
@summary: Functions as special relations, domain, codomain and range, one-to-one and onto maps, counting functions and the pigeonhole principle.

### Machines that give one answer
A vending machine is a good picture of a function. You press a button, and you get exactly one item. Pressing B3 never gives you a choice of two snacks, and it never gives you nothing (assuming it's stocked). Different buttons might give the same snack, and some snacks in the warehouse might not be in the machine at all, but each button has exactly one output. That single rule, **every input gets exactly one output**, is the definition of a function.

You have used functions like $f(x) = x^2$ for years. In discrete mathematics and computer science, we need a more general view, because inputs and outputs don't have to be numbers. A function might send each student to their grade, each word to its length, each image to a label, or each password to its hash. The language of sets and relations lets us talk about all of these at once.

### The definition
A **function** $f$ from a set $A$ to a set $B$, written $f : A\to B$, is a relation from $A$ to $B$ in which every element $a\in A$ is related to **exactly one** element of $B$. That element is written $f(a)$, the **image** of $a$.

$A$ is the **domain**, the set of allowed inputs. $B$ is the **codomain**, the set where outputs are allowed to land. The **range** (or image of $f$) is the set of outputs actually produced:
$$f(A) = \{f(a) : a\in A\}\subseteq B.$$
For $f : \mathbb{Z}\to\mathbb{Z}$ with $f(x) = x^2$, the codomain is $\mathbb{Z}$ but the range is $\{0, 1, 4, 9, \dots\}$. The codomain is part of the definition; the range is something you calculate.

Two things can stop a relation from being a function. Some input might have **no** output: "$f(x) = 1/x$" on $\mathbb{R}$ fails at $x = 0$. Or some input might have **two** outputs: the relation "$y^2 = x$" relates 4 to both 2 and $-2$. In the relation matrix, a function has exactly one 1 in every row; in an arrow diagram, every dot on the left has exactly one arrow leaving it.

### One-to-one functions (injections)
A function is **injective**, or **one-to-one**, if different inputs always give different outputs:
$$f(a_1) = f(a_2)\ \Rightarrow\ a_1 = a_2.$$
On a list of student ID numbers, "student $\mapsto$ ID" is injective: no two students share an ID. But "student $\mapsto$ birthday month" is not, because two students can share a month.

To prove injectivity, assume $f(a_1) = f(a_2)$ and show $a_1 = a_2$. For $f(x) = 3x + 1$ on $\mathbb{R}$: $3a_1 + 1 = 3a_2 + 1$ gives $a_1 = a_2$. To disprove it, give one collision: $g(x) = x^2$ on $\mathbb{R}$ has $g(-2) = g(2)$. For real functions, injectivity is the **horizontal line test**: no horizontal line hits the graph twice.

### Onto functions (surjections)
A function is **surjective**, or **onto**, if every element of the codomain is hit: for every $b\in B$ there is some $a$ with $f(a) = b$. Equivalently, range = codomain. In the matrix, every column has at least one 1.

$f : \mathbb{R}\to\mathbb{R}$, $f(x) = 3x + 1$ is onto: given $b$, the input $a = (b - 1)/3$ works. But $g : \mathbb{R}\to\mathbb{R}$, $g(x) = x^2$ is not, because negative numbers are never outputs. Surjectivity depends on the codomain: change it to $[0, \infty)$ and $g$ becomes onto.

### Bijections
A function that is both injective and surjective is a **bijection**, or **one-to-one correspondence**. Every element of $B$ is hit by exactly one element of $A$: the elements are perfectly paired up. Assigning each seat in a full theatre to one ticket holder, with no empty seats and no sharing, is a bijection. Bijections are exactly the functions that can be undone, which the next lesson explores.

### Functions between finite sets
For finite sets, counting tells us a lot. Let $|A| = m$ and $|B| = n$.

The number of functions $A\to B$ is $n^m$: each of the $m$ inputs independently chooses one of $n$ outputs. From a 3-element set to a 2-element set there are $2^3 = 8$ functions.

The number of injections is $n(n - 1)(n - 2)\cdots(n - m + 1) = \frac{n!}{(n - m)!}$, because each new input must avoid the outputs already used. This is zero when $m > n$.

If $f$ is injective, then $m\le n$; if $f$ is surjective, then $m\ge n$; if $f$ is a bijection, then $m = n$. And when $m = n$, injective, surjective and bijective all mean the same thing, which is very handy: to show a function between two sets of equal finite size is a bijection, you only need to check one of the two properties.

### The pigeonhole principle
The fact that an injection needs $m\le n$ has a famous name. **The pigeonhole principle**: if $m$ pigeons fly into $n$ holes and $m > n$, some hole contains at least two pigeons. In any group of 13 people, two share a birth month. Among any 5 integers, two leave the same remainder mod 4. The **generalized** version says some hole holds at least $\lceil m/n\rceil$ pigeons: among 100 people, at least $\lceil100/12\rceil = 9$ share a birth month.

### Floor, ceiling and other useful functions
Some functions appear constantly in computer science. The **floor** $\lfloor x\rfloor$ is the greatest integer $\le x$ and the **ceiling** $\lceil x\rceil$ is the least integer $\ge x$: $\lfloor3.7\rfloor = 3$, $\lceil3.2\rceil = 4$, $\lfloor-1.5\rfloor = -2$. $x\bmod n$ gives the remainder. A function $\{1, \dots, n\}\to B$ is just a **sequence** or array of length $n$, and a function from a set to $\{0, 1\}$ is its **characteristic function**, picking out a subset.

:::def Function
$f : A\to B$ is a relation in which every element of the domain $A$ is related to exactly one element of the codomain $B$.
:::

:::def Range
The set of outputs actually produced, $f(A) = \{f(a) : a\in A\}$, a subset of the codomain.
:::

:::def Injective
One-to-one: $f(a_1) = f(a_2)$ implies $a_1 = a_2$.
:::

:::def Surjective
Onto: every element of the codomain is $f(a)$ for some $a$.
:::

:::def Bijection
A function that is both injective and surjective.
:::

:::def Pigeonhole principle
If more than $n$ objects are placed in $n$ boxes, some box holds at least two objects; in general some box holds at least $\lceil m/n\rceil$.
:::

:::warn Common mistakes
Confusing codomain and range. Proving injectivity by checking a few inputs instead of assuming $f(a_1) = f(a_2)$ in general. Forgetting that surjectivity depends on the codomain you choose. And mixing up the counts: $n^m$ counts all functions from an $m$-set to an $n$-set, not $m^n$.
:::

### Summary
A function assigns every input exactly one output; it has a domain, a codomain and a range. Injective means no two inputs collide, surjective means every codomain element is hit, and bijective means both. There are $n^m$ functions from an $m$-set to an $n$-set, and the pigeonhole principle says no injection exists when $m > n$.

@viz g08-relation preset=ceil n=6 | The function f(x) = ⌈x/2⌉ on {1, …, 6}, drawn as a relation. The checker reports whether it is a function, injective and surjective.

:::explore
**What to try**
1. Read the function check for $\lceil x/2\rceil$: every row should have exactly one 1.
2. Look at the columns: which outputs are hit twice, and which are never hit?
3. Switch the preset to "f(x) = x mod n + 1" and read the checks again.
4. Click a cell to add a second 1 to some row.

**What to notice:** $\lceil x/2\rceil$ sends 1 and 2 to 1, 3 and 4 to 2, and 5 and 6 to 3. Columns 1 to 3 have two 1s (not injective) and columns 4 to 6 are empty (not surjective). The shift $x\mapsto x\bmod n + 1$ has exactly one 1 in every row and every column, so it is a bijection. A row with two 1s means an input with two outputs, and the relation stops being a function.
:::

@viz func kind=quadratic | The graph of a quadratic. Use horizontal lines to test injectivity and the set of heights reached to test surjectivity.

:::explore
**What to try**
1. Imagine a horizontal line above the vertex. How many times does it cross the parabola?
2. Imagine a horizontal line below the vertex (for an upward parabola).

**What to notice:** a line above the vertex hits twice, so the quadratic is not injective on all of $\mathbb{R}$, and lines below the vertex miss, so it is not onto $\mathbb{R}$ either. Restricting the domain to one side of the vertex makes it injective.
:::

:::formulas
$$f : A\to B,\qquad f(A) = \{f(a) : a\in A\}\subseteq B$$
$$\text{injective: } f(a_1) = f(a_2)\Rightarrow a_1 = a_2\qquad\text{surjective: }\forall b\in B\ \exists a\in A,\ f(a) = b$$
$$\#\{A\to B\} = n^m\qquad\#\{\text{injections}\} = \frac{n!}{(n - m)!}\qquad\#\{\text{bijections } A\to A\} = n!$$
$$\text{pigeonhole: some box holds at least } \lceil m/n\rceil$$
:::

:::thm Pigeonhole principle
If $f : A\to B$ with $|A| = m > n = |B|$, then $f$ is not injective.
:::

:::proof
Suppose $f$ were injective. Then the $m$ outputs $f(a)$ are all different, so the range has $m$ elements. But the range is a subset of $B$, which has only $n < m$ elements. Contradiction.
:::

:::steps Is $f : \mathbb{Z}\to\mathbb{Z}$, $f(x) = 2x + 5$, injective? Surjective?
1. Injective: $2a + 5 = 2b + 5\Rightarrow a = b$. Yes.
2. Surjective: we need $2x + 5 = 6$, so $x = 1/2\notin\mathbb{Z}$. No: every output is odd.
3. So $f$ is an injection but not a bijection of $\mathbb{Z}$.
:::

:::steps How many functions, and how many injections, go from $\{1, 2, 3\}$ to $\{a, b, c, d\}$?
1. Functions: $4^3 = 64$.
2. Injections: $4\cdot3\cdot2 = 24$.
3. Surjections: none, since 3 inputs cannot cover 4 outputs.
:::

:::steps Prove that among any 6 integers, two have a difference divisible by 5
1. Boxes: the 5 remainders mod 5. Pigeons: the 6 integers.
2. $6 > 5$, so two integers $a, b$ share a remainder.
3. Then $5\mid(a - b)$.
:::

:::mock Exam question
Let $f : \mathbb{R}\to\mathbb{R}$, $f(x) = x^3 - x$. (a) Is $f$ injective? (b) Is $f$ surjective? (c) How many surjections are there from a 4-element set onto a 2-element set?
:::solution
(a) No: $f(0) = f(1) = f(-1) = 0$.
(b) Yes: $f$ is continuous, $f(x)\to\infty$ as $x\to\infty$ and $f(x)\to-\infty$ as $x\to-\infty$, so by the intermediate value theorem every real $b$ is reached.
(c) All $2^4 = 16$ functions, minus the 2 constant functions that miss an output: $16 - 2 = 14$.
:::
:::

:::cs
Hash functions map a huge set of keys into a small table, so by the pigeonhole principle collisions are unavoidable and hash tables must handle them. Lossless compression cannot shrink every file, because an injection from all $n$-bit files into shorter files is impossible. Pure functions in programming (same input, same output) are mathematical functions, and arrays and dictionaries store functions from indices or keys to values.
:::

:::ml
A trained model is a function from inputs to predictions, $f_\theta : \mathbb{R}^d\to\mathbb{R}^k$. Encoders map data to embeddings; if the encoding is not injective, different inputs become indistinguishable. Invertible (bijective) layers are the basis of normalizing flows, which transform simple distributions into complex ones while still allowing exact likelihood computation.
:::

:::real
A cloakroom ticket system is an injection from coats to tickets: two coats never get the same number. A fully booked flight is a bijection between passengers and seats. And the pigeonhole principle guarantees that in any city of over a million people, two people have exactly the same number of hairs on their head, since nobody has more than about 200,000.
:::

:::quiz
? How many functions are there from a 2-element set to a 5-element set?
= 25
> $5^2 = 25$: each of the 2 inputs picks one of 5 outputs.

? Is $f(x) = x^2$ from $\mathbb{R}$ to $[0, \infty)$ surjective?
+ Yes
- No
> Every $b\ge0$ is $(\sqrt b)^2$. Changing the codomain changed the answer.

? $f : A\to B$ is injective and $|A| = 7$. What is the smallest possible $|B|$?
= 7
> An injection needs at least as many outputs as inputs.

? How many bijections are there from $\{1, 2, 3, 4\}$ to itself?
= 24
> $4! = 24$ permutations.

? At least how many of 50 people share a birth month (guaranteed)?
= 5
> $\lceil50/12\rceil = 5$.

? What is $\lfloor-2.3\rfloor$?
= -3
> The floor is the greatest integer less than or equal to $-2.3$, which is $-3$.
:::

## Lesson: Composition and inverse functions {#composition-inverses}
@summary: Chaining functions together, why order matters, the identity function, when a function can be undone, and preimages.

### Doing one thing after another
Think about converting a temperature from Celsius to Fahrenheit and then rounding it for a weather app. Or think about a photo filter app that first crops a picture, then brightens it, then compresses it. Each step is a function, and the whole pipeline is a single function made by feeding the output of one step into the next. This is **composition**, and it is how almost every complex process in computing is built: from simple pieces, connected end to end.

The reverse question is just as important. If I know the output, can I recover the input? Can I decompress the photo, decrypt the message, convert Fahrenheit back to Celsius? A function that undoes another is its **inverse**, and this lesson shows exactly when one exists.

### Composition
Given $f : A\to B$ and $g : B\to C$, the **composition** $g\circ f : A\to C$ is defined by
$$(g\circ f)(x) = g(f(x)).$$
Read $g\circ f$ as "$g$ after $f$": you apply $f$ first, even though it is written on the right. This order mirrors the way we write $g(f(x))$, where the innermost function acts first.

Take $f(x) = x + 1$ and $g(x) = x^2$ on $\mathbb{R}$. Then $(g\circ f)(x) = g(x + 1) = (x + 1)^2$, while $(f\circ g)(x) = f(x^2) = x^2 + 1$. At $x = 2$, $g\circ f$ gives $9$ and $f\circ g$ gives $5$. So **composition is not commutative**: order matters, just as putting on socks then shoes differs from shoes then socks.

Composition needs the outputs of $f$ to be valid inputs for $g$. With $f(x) = x - 5$ and $g(x) = \sqrt x$ on non-negative reals, $g\circ f$ only makes sense for $x\ge5$.

### Composition is associative
Although order matters, grouping doesn't. For $f : A\to B$, $g : B\to C$, $h : C\to D$,
$$h\circ(g\circ f) = (h\circ g)\circ f,$$
because both sides send $x$ to $h(g(f(x)))$. So we can write $h\circ g\circ f$ without brackets. A data pipeline of ten steps can be grouped into stages any way you like, as long as the order of steps is kept.

### The identity function
The **identity function** on $A$ is $\operatorname{id}_A(x) = x$. It does nothing, and it plays the role that the number 1 plays in multiplication: $f\circ\operatorname{id}_A = f$ and $\operatorname{id}_B\circ f = f$ for any $f : A\to B$.

### Inverse functions
A function $g : B\to A$ is an **inverse** of $f : A\to B$ if it undoes $f$ in both directions:
$$g(f(a)) = a\ \text{ for all } a\in A\quad\text{and}\quad f(g(b)) = b\ \text{ for all } b\in B.$$
In composition language, $g\circ f = \operatorname{id}_A$ and $f\circ g = \operatorname{id}_B$. We write the inverse as $f^{-1}$. Careful: $f^{-1}(x)$ means the inverse function, not $1/f(x)$.

For $f(x) = 2x + 3$ on $\mathbb{R}$, solve $y = 2x + 3$ for $x$: $x = (y - 3)/2$. So $f^{-1}(y) = (y - 3)/2$. Check: $f^{-1}(f(4)) = f^{-1}(11) = 4$ and $f(f^{-1}(11)) = f(4) = 11$. Celsius to Fahrenheit, $F = \frac95C + 32$, has inverse $C = \frac59(F - 32)$.

### When does an inverse exist?
Not every function can be undone. If $f$ is not injective, two inputs share an output, say $f(a_1) = f(a_2) = b$, and $f^{-1}(b)$ would have to be both $a_1$ and $a_2$, which is impossible. If $f$ is not surjective, some $b$ is never an output, and $f^{-1}(b)$ has no value at all. So an inverse needs both properties. Conversely, if $f$ is a bijection, every $b$ is the output of exactly one $a$, and defining $f^{-1}(b) = a$ works. This gives the key theorem: **$f$ has an inverse if and only if $f$ is a bijection**. The inverse is then unique and is itself a bijection, with $(f^{-1})^{-1} = f$.

This is why $x^2$ has no inverse on all of $\mathbb{R}$, but $\sqrt x$ is the inverse of $x^2$ restricted to $[0, \infty)\to[0, \infty)$. Restricting the domain and codomain is the standard way to make a function invertible; $\arcsin$ and $\ln$ come from this idea. On a graph, the inverse is the mirror image of $f$ in the line $y = x$, because swapping input and output swaps $x$ and $y$.

### The inverse of a composition
If $f$ and $g$ are bijections, then $g\circ f$ is a bijection and
$$(g\circ f)^{-1} = f^{-1}\circ g^{-1}.$$
The order reverses. To undo "put on socks, then shoes", you take off shoes first, then socks. Check with $f(x) = x + 1$ and $g(x) = 2x$: $(g\circ f)(x) = 2x + 2$, whose inverse is $(y - 2)/2$. And $f^{-1}(g^{-1}(y)) = \frac y2 - 1 = \frac{y - 2}2$. They agree.

### How properties pass through composition
If $f$ and $g$ are both injective, so is $g\circ f$: different inputs stay different after $f$, and stay different after $g$. If both are surjective, so is $g\circ f$. There are also partial converses: if $g\circ f$ is injective, then $f$ must be injective; if $g\circ f$ is surjective, then $g$ must be surjective.

### Preimages
Even when $f$ has no inverse, we can ask which inputs land in a set $S\subseteq B$. The **preimage** is $f^{-1}(S) = \{a\in A : f(a)\in S\}$. For $f(x) = x^2$, $f^{-1}(\{4\}) = \{-2, 2\}$ and $f^{-1}(\{-1\}) = \emptyset$. Same notation, different meaning: a preimage is a set, always defined.

:::def Composition
For $f : A\to B$ and $g : B\to C$, $(g\circ f)(x) = g(f(x))$, "$g$ after $f$".
:::

:::def Identity function
$\operatorname{id}_A(x) = x$; it satisfies $f\circ\operatorname{id}_A = f$ and $\operatorname{id}_B\circ f = f$.
:::

:::def Inverse function
$f^{-1} : B\to A$ with $f^{-1}\circ f = \operatorname{id}_A$ and $f\circ f^{-1} = \operatorname{id}_B$. It exists exactly when $f$ is a bijection.
:::

:::def Preimage
$f^{-1}(S) = \{a : f(a)\in S\}$, the set of inputs whose outputs lie in $S$.
:::

:::warn Common mistakes
Applying $g\circ f$ in the wrong order ($f$ acts first). Assuming $g\circ f = f\circ g$. Reading $f^{-1}(x)$ as $1/f(x)$. Writing $(g\circ f)^{-1} = g^{-1}\circ f^{-1}$ instead of reversing the order. And claiming an inverse exists without checking that the function is a bijection.
:::

### Composition on small finite sets
It helps to compute compositions on tiny sets where you can see every arrow. Let $A = \{1, 2, 3\}$, and let $f$ send $1\mapsto2$, $2\mapsto3$, $3\mapsto1$, while $g$ swaps 1 and 2 and keeps 3 fixed. Then $(g\circ f)(1) = g(2) = 1$, $(g\circ f)(2) = g(3) = 3$ and $(g\circ f)(3) = g(1) = 2$. On the other hand $(f\circ g)(1) = f(2) = 3$, $(f\circ g)(2) = f(1) = 2$ and $(f\circ g)(3) = f(3) = 1$. Two different results again, confirming that order matters even for simple shuffles.

Bijections from a set to itself are called **permutations**, and composing two permutations always gives another permutation. The inverse of $f$ just reverses its arrows: $f^{-1}$ sends $2\mapsto1$, $3\mapsto2$ and $1\mapsto3$. Composing $f$ three times returns every element home, $f\circ f\circ f = \operatorname{id}$, so $f^{-1} = f\circ f$. Shuffling cards, rotating a Rubik's cube and permuting the rows of a matrix are all compositions of permutations.

### Summary
Composition chains functions, $(g\circ f)(x) = g(f(x))$; it is associative but not commutative, with the identity function as its neutral element. A function has an inverse exactly when it is a bijection, the inverse's graph is the reflection in $y = x$, and inverting a composition reverses the order. Preimages make sense for every function.

@viz inverse | A function in blue and its inverse in pink, mirrored across the dashed line y = x. Drag the point along f.

:::explore
**What to try**
1. Choose $f(x) = 2x + 1$ and drag the point to $x = 1$. Where is the mirrored point on the pink curve?
2. Choose $e^x$ and drag the point to $x = 0$.
3. Choose $x^2\ (x\ge0)$ and notice that only half the parabola is drawn.

**What to notice:** the point $(1, 3)$ on $f$ mirrors to $(3, 1)$ on $f^{-1}$, which says $f^{-1}(3) = 1$, matching $f^{-1}(y) = (y - 1)/2$. For $e^x$, $(0, 1)$ mirrors to $(1, 0)$: $\ln1 = 0$. The parabola is cut to $x\ge0$ because $x^2$ is not injective on all of $\mathbb{R}$; restricting it makes it a bijection, and $\sqrt x$ becomes its inverse.
:::

@viz g08-relation preset=mod n=5 | The shift f(x) = x mod 5 + 1 on {1, …, 5}. Every row and every column has exactly one 1, so f is a bijection.

:::explore
**What to try**
1. Read the function checks: injective and surjective should both say yes.
2. Write down the inverse by reversing each arrow: if $f(x) = y$, then $f^{-1}(y) = x$.
3. Switch to "f(x) = ⌈x/2⌉" and see that it can't be reversed.

**What to notice:** reversing the arrows of the shift gives the shift the other way, $y\mapsto y - 1$ (with $1\mapsto5$), which is again a function: transposing the matrix of a bijection gives the matrix of its inverse. For $\lceil x/2\rceil$, transposing gives rows with two 1s or none, so the reverse is not a function.
:::

:::formulas
$$(g\circ f)(x) = g(f(x))\qquad h\circ(g\circ f) = (h\circ g)\circ f$$
$$f^{-1}\circ f = \operatorname{id}_A\qquad f\circ f^{-1} = \operatorname{id}_B$$
$$f\text{ invertible}\iff f\text{ bijective}\qquad(g\circ f)^{-1} = f^{-1}\circ g^{-1}\qquad(f^{-1})^{-1} = f$$
$$f^{-1}(S) = \{a\in A : f(a)\in S\}$$
:::

:::thm Invertible means bijective
A function $f : A\to B$ has an inverse if and only if it is a bijection.
:::

:::proof
($\Rightarrow$) Suppose $g$ is an inverse. If $f(a_1) = f(a_2)$, apply $g$: $a_1 = g(f(a_1)) = g(f(a_2)) = a_2$, so $f$ is injective. For any $b\in B$, $a = g(b)$ satisfies $f(a) = f(g(b)) = b$, so $f$ is surjective.
($\Leftarrow$) If $f$ is bijective, each $b$ equals $f(a)$ for exactly one $a$ (surjective gives at least one, injective at most one). Define $g(b)$ to be that $a$. Then $g(f(a)) = a$ and $f(g(b)) = b$.
:::

:::steps With $f(x) = 3x - 1$ and $g(x) = x^2 + 2$, find $(g\circ f)(2)$ and $(f\circ g)(2)$
1. $f(2) = 5$, so $(g\circ f)(2) = g(5) = 27$.
2. $g(2) = 6$, so $(f\circ g)(2) = f(6) = 17$.
3. The results differ, so $g\circ f\ne f\circ g$.
:::

:::steps Find the inverse of $f(x) = \frac{x + 4}{3}$ and check it
1. Write $y = \frac{x + 4}3$, so $3y = x + 4$ and $x = 3y - 4$.
2. $f^{-1}(y) = 3y - 4$.
3. Check: $f(5) = 3$ and $f^{-1}(3) = 9 - 4 = 5$. ✓
:::

:::steps Verify $(g\circ f)^{-1} = f^{-1}\circ g^{-1}$ for $f(x) = x + 3$, $g(x) = 5x$
1. $(g\circ f)(x) = 5(x + 3) = 5x + 15$, so $(g\circ f)^{-1}(y) = \frac{y - 15}5$.
2. $g^{-1}(y) = y/5$ and $f^{-1}(y) = y - 3$, so $f^{-1}(g^{-1}(y)) = \frac y5 - 3 = \frac{y - 15}5$.
3. They are equal. ✓
:::

:::mock Exam question
Let $f : \mathbb{R}\to\mathbb{R}$, $f(x) = 4x - 7$, and $g : \mathbb{R}\to\mathbb{R}$, $g(x) = x^3$. (a) Find $g\circ f$ and its inverse. (b) Evaluate $(g\circ f)^{-1}(1)$. (c) Is $h(x) = x^2 - 7$ from $\mathbb{R}$ to $\mathbb{R}$ invertible? Explain.
:::solution
(a) $(g\circ f)(x) = (4x - 7)^3$. Both $f$ and $g$ are bijections, so $(g\circ f)^{-1} = f^{-1}\circ g^{-1}$, with $g^{-1}(y) = \sqrt[3]y$ and $f^{-1}(y) = \frac{y + 7}4$: $(g\circ f)^{-1}(y) = \frac{\sqrt[3]y + 7}4$.
(b) $\frac{1 + 7}4 = 2$. Check: $(4\cdot2 - 7)^3 = 1$. ✓
(c) No: $h(1) = h(-1) = -6$, so $h$ is not injective (and it is not surjective either, since $h(x)\ge-7$).
:::
:::

:::ml
A deep network is a composition of layers, $f = f_L\circ\dots\circ f_2\circ f_1$, and backpropagation is the chain rule applied to that composition. Feature scaling $z = (x - \mu)/\sigma$ must be inverted, $x = \sigma z + \mu$, to report predictions in original units. Autoencoders train a decoder to approximately invert an encoder, and normalizing flows use exactly invertible layers so that $(g\circ f)^{-1} = f^{-1}\circ g^{-1}$ can be computed.
:::

:::cs
Unix pipes (`cat file | sort | uniq`) compose programs, and functional languages have a composition operator (`.` in Haskell). Encryption and decryption are inverse bijections on messages, encoding then decoding (Base64, UTF-8) must give back the original, and an "undo" stack applies inverses in reverse order, exactly $(g\circ f)^{-1} = f^{-1}\circ g^{-1}$.
:::

:::real
Currency exchange: converting dollars to euros and euros to yen composes two functions, and converting back requires inverting both in reverse order (ignoring fees, which make the round trip lose money and spoil invertibility). Getting dressed and undressed is the everyday version of reversing the order of inverses.
:::

:::quiz
? $f(x) = 2x + 1$, $g(x) = x^2$. What is $(g\circ f)(2)$?
= 25
> $f(2) = 5$ and $g(5) = 25$.

? With the same functions, what is $(f\circ g)(2)$?
= 9
> $g(2) = 4$ and $f(4) = 9$.

? If $f(x) = 3x - 6$, what is $f^{-1}(0)$?
= 2
> $f^{-1}(y) = (y + 6)/3$, so $f^{-1}(0) = 2$. Check: $f(2) = 0$.

? Which functions have inverses?
- All injective functions
- All surjective functions
+ Exactly the bijections
> An inverse needs every output hit exactly once.

? $(g\circ f)^{-1}$ equals...
- $g^{-1}\circ f^{-1}$
+ $f^{-1}\circ g^{-1}$
- $g\circ f$
> Undoing reverses the order: undo $g$ first, then $f$.

? For $f(x) = x^2$ on $\mathbb{R}$, how many elements are in the preimage $f^{-1}(\{9\})$?
= 2
> $f^{-1}(\{9\}) = \{-3, 3\}$.
:::

## Lesson: Cardinality, countable and uncountable sets {#cardinality}
@summary: Comparing sizes with bijections, countably infinite sets, Cantor's diagonal argument, Cantor's theorem and why some problems can't be computed.

### How do you count without counting?
Imagine a huge concert hall and you want to know whether there are exactly as many seats as people, but you can't count either. There's an easy solution: ask everyone to sit down. If every person has a seat and every seat has a person, the numbers are equal. You learned something about size without ever using a number. That idea, **comparing sizes by pairing things up**, is how mathematicians measure infinite sets, and it leads to one of the most surprising discoveries in mathematics: some infinities are bigger than others.

This is not just a curiosity. The same reasoning proves that there are problems no computer program can ever solve, which is a foundational fact of computer science.

### Same size means a bijection
For finite sets we already know $|A|$ is the number of elements. We now define: two sets $A$ and $B$ have the **same cardinality**, written $|A| = |B|$, if there is a bijection $f : A\to B$. For finite sets, this agrees with counting: $\{a, b, c\}$ and $\{1, 2, 3\}$ pair up perfectly. We write $|A|\le|B|$ if there is an injection $A\to B$, meaning $A$ fits inside $B$ without collisions.

For infinite sets, this definition gives strange results. Let $E = \{0, 2, 4, \dots\}$ be the even naturals. The map $f(n) = 2n$ is a bijection $\mathbb{N}\to E$: $0\mapsto0$, $1\mapsto2$, $2\mapsto4$. So $|E| = |\mathbb{N}|$, even though $E$ is a proper subset of $\mathbb{N}$. For an infinite set, a part can be as big as the whole. This is the famous **Hilbert's hotel**: a hotel with rooms $1, 2, 3, \dots$, all full, can still welcome a new guest by moving everyone from room $n$ to room $n + 1$.

### Countable sets
A set is **countably infinite** if it has the same cardinality as $\mathbb{N}$, and **countable** if it is finite or countably infinite. Being countable means the elements can be listed in a sequence $a_0, a_1, a_2, \dots$ in which every element eventually appears. The size of $\mathbb{N}$ is written $\aleph_0$ ("aleph-null").

The integers are countable, even though they extend in both directions. List them as $0, -1, 1, -2, 2, -3, 3, \dots$. The explicit bijection $\mathbb{N}\to\mathbb{Z}$ is $f(n) = n/2$ for even $n$ and $f(n) = -(n + 1)/2$ for odd $n$: $f(0) = 0$, $f(1) = -1$, $f(2) = 1$, $f(3) = -2$. Every integer appears exactly once.

Pairs of naturals are countable too. Arrange $\mathbb{N}\times\mathbb{N}$ in a grid and walk along the diagonals: $(0,0)$; then $(1,0), (0,1)$; then $(2,0), (1,1), (0,2)$; and so on. Each diagonal is finite, so every pair is reached. A formula for this walk is the **Cantor pairing function** $\pi(a, b) = \frac{(a + b)(a + b + 1)}2 + b$, for example $\pi(1, 1) = 4$.

The rationals are countable as well: every positive rational is $p/q$ for a pair $(p, q)$, so list the pairs diagonally and skip fractions already seen. That's surprising, because between any two rationals lie infinitely many more, yet they can still be listed one by one. By the same idea, the set of all finite strings over a finite alphabet is countable: list strings by length, then alphabetically. In particular, **the set of all computer programs is countable**.

### Cantor's diagonal argument
Are the real numbers countable too? In 1891 Georg Cantor showed they are not. Focus on the reals in $(0, 1)$, written as infinite decimals. Suppose, for contradiction, that someone gives a complete list $r_1, r_2, r_3, \dots$. Write out the decimal digits:
$$r_1 = 0.\mathbf{5}1092\ldots,\quad r_2 = 0.4\mathbf{1}375\ldots,\quad r_3 = 0.89\mathbf{9}02\ldots,\quad\dots$$
Now build a new number $d$ digit by digit: make the $n$-th digit of $d$ different from the $n$-th digit of $r_n$ (say, use 5 unless that digit is 5, in which case use 4). Here $d = 0.455\ldots$. Then $d$ differs from $r_1$ in the 1st digit, from $r_2$ in the 2nd, and from every $r_n$ in the $n$-th digit. So $d$ is not on the list, contradicting completeness. (Using only digits 4 and 5 avoids the issue that $0.4999\ldots = 0.5$.) No list can contain all reals: $\mathbb{R}$ is **uncountable**, and $|\mathbb{N}| < |\mathbb{R}|$.

### Cantor's theorem: there is no biggest infinity
The diagonal idea works for any set. **Cantor's theorem** says $|A| < |\mathcal P(A)|$ for every set $A$. For a finite set this is $n < 2^n$, but it also holds for infinite sets. Given any function $f : A\to\mathcal P(A)$, consider $D = \{a\in A : a\notin f(a)\}$. If $D = f(d)$ for some $d$, then $d\in D$ exactly when $d\notin f(d) = D$, a contradiction. So $f$ is never surjective. Repeating, $|\mathbb{N}| < |\mathcal P(\mathbb{N})| < |\mathcal P(\mathcal P(\mathbb{N}))| < \dots$: an endless ladder of bigger infinities.

### Comparing sizes and Schröder–Bernstein
Building a bijection directly can be hard. The **Schröder–Bernstein theorem** helps: if there are injections $A\to B$ and $B\to A$, then $|A| = |B|$. For example, $(0, 1)$ and $[0, 1]$ have the same cardinality: $x\mapsto x$ injects one way and $x\mapsto\frac{x + 1}3$ injects $[0, 1]$ into $[\frac13, \frac23]\subset(0, 1)$.

### Why computer scientists care
Programs are finite strings, so there are only countably many of them. But the functions from $\mathbb{N}$ to $\{0, 1\}$, which correspond to subsets of $\mathbb{N}$, are uncountable by Cantor's theorem. So most such functions cannot be computed by any program. Turing's proof that the **halting problem** is undecidable is a diagonal argument of exactly this kind.

:::def Same cardinality
$|A| = |B|$ when there is a bijection from $A$ to $B$; $|A|\le|B|$ when there is an injection from $A$ to $B$.
:::

:::def Countable
A set that is finite or in bijection with $\mathbb{N}$, so its elements can be listed $a_0, a_1, a_2, \dots$
:::

:::def Uncountable
An infinite set that is not countable, such as $\mathbb{R}$ or $\mathcal P(\mathbb{N})$.
:::

:::def Diagonal argument
A proof that a list is incomplete by building an object that differs from the $n$-th item in its $n$-th position.
:::

:::warn Common mistakes
Thinking a proper subset must be smaller (true for finite sets, false for infinite ones). Believing "dense" means uncountable: $\mathbb{Q}$ is dense but countable. Trying to list reals or subsets "in order" and assuming the list is complete. And thinking all infinite sets have the same size.
:::

### Summary
Sets have the same cardinality when there is a bijection between them. $\mathbb{N}$, $\mathbb{Z}$, $\mathbb{N}\times\mathbb{N}$, $\mathbb{Q}$ and the set of all programs are countable. Cantor's diagonal argument shows $\mathbb{R}$ is uncountable, and Cantor's theorem $|A| < |\mathcal P(A)|$ gives infinitely many sizes of infinity. Since programs are countable and problems are not, some problems are uncomputable.

@viz g08-cantor mode=diagonal | A supposed complete list of infinite binary sequences. The highlighted diagonal is flipped to build a sequence that is not on the list.

:::explore
**What to try**
1. Read the highlighted diagonal digits and the flipped sequence below the list.
2. Check that the new sequence differs from row 1 in position 1, from row 2 in position 2, and so on.
3. Press "add the missing sequence to the list", then look at the new diagonal.
4. Press "new list" a few times.

**What to notice:** adding the missing sequence never helps: the diagonal changes and a new missing sequence appears. This is exactly the diagonal argument from the article, so no list of infinite binary sequences (equivalently, of subsets of $\mathbb{N}$) can be complete.
:::

@viz g08-cantor mode=integers | Switch between ℕ ↔ ℤ and ℕ ↔ ℕ × ℕ to see two countable sets being listed.

:::explore
**What to try**
1. In ℕ ↔ ℤ, find which label each of $-3$ and $3$ gets.
2. Switch to ℕ ↔ ℕ × ℕ and follow the path through the grid diagonal by diagonal.

**What to notice:** $f(5) = -3$ and $f(6) = 3$, matching the formula in the article, and no integer is skipped or repeated. In the grid, each diagonal is finite, so the path reaches every pair after finitely many steps. That is what "countable" means.
:::

:::formulas
$$|A| = |B|\iff\exists\text{ bijection } A\to B\qquad|A|\le|B|\iff\exists\text{ injection } A\to B$$
$$f : \mathbb{N}\to\mathbb{Z},\ f(n) = \begin{cases}n/2 & n\text{ even}\\ -(n + 1)/2 & n\text{ odd}\end{cases}$$
$$\pi(a, b) = \frac{(a + b)(a + b + 1)}2 + b\quad(\mathbb{N}\times\mathbb{N}\to\mathbb{N}\text{ bijection})$$
$$|\mathbb{N}| = |\mathbb{Z}| = |\mathbb{Q}| = \aleph_0 < |\mathbb{R}| = |\mathcal P(\mathbb{N})|\qquad|A| < |\mathcal P(A)|$$
:::

:::thm Cantor's theorem
For every set $A$, there is no surjection $A\to\mathcal P(A)$. Hence $|A| < |\mathcal P(A)|$.
:::

:::proof
Let $f : A\to\mathcal P(A)$ be any function and set $D = \{a\in A : a\notin f(a)\}$. Suppose $D = f(d)$ for some $d\in A$. If $d\in D$, then by the definition of $D$, $d\notin f(d) = D$. If $d\notin D = f(d)$, then $d$ satisfies the condition, so $d\in D$. Both cases are contradictions, so $D$ is not in the range of $f$. The map $a\mapsto\{a\}$ is an injection, so $|A|\le|\mathcal P(A)|$, and with no bijection, $|A| < |\mathcal P(A)|$.
:::

:::steps Show that the odd naturals $O = \{1, 3, 5, \dots\}$ are countably infinite
1. Define $f : \mathbb{N}\to O$ by $f(n) = 2n + 1$.
2. Injective: $2a + 1 = 2b + 1\Rightarrow a = b$.
3. Surjective: any odd $m = 2k + 1$ equals $f(k)$. So $f$ is a bijection and $|O| = |\mathbb{N}|$.
:::

:::steps Compute the Cantor pairing $\pi(2, 3)$ and decode it
1. $a + b = 5$, so $\pi(2, 3) = \frac{5\cdot6}2 + 3 = 15 + 3 = 18$.
2. Decode: the largest $s$ with $\frac{s(s + 1)}2\le18$ is $s = 5$ (value 15).
3. $b = 18 - 15 = 3$ and $a = s - b = 2$. ✓
:::

:::steps Apply the diagonal construction to $s_1 = 0110\ldots$, $s_2 = 1010\ldots$, $s_3 = 0001\ldots$, $s_4 = 1111\ldots$
1. Diagonal digits: $s_1$'s 1st is 0, $s_2$'s 2nd is 0, $s_3$'s 3rd is 0, $s_4$'s 4th is 1.
2. Flip each: $d = 1110\ldots$
3. $d$ differs from each $s_n$ in position $n$, so it is not among them.
:::

:::mock Exam question
(a) Give an explicit bijection from $\mathbb{N}$ to $\{\dots, -10, -5, 0, 5, 10, \dots\}$, the multiples of 5. (b) Is the set of all finite subsets of $\mathbb{N}$ countable? (c) Is the set of all subsets of $\mathbb{N}$ countable?
:::solution
(a) Compose the $\mathbb{N}\to\mathbb{Z}$ bijection with $k\mapsto5k$: $g(n) = 5n/2$ for even $n$ and $g(n) = -5(n + 1)/2$ for odd $n$. So $0\mapsto0$, $1\mapsto-5$, $2\mapsto5$, $3\mapsto-10$.
(b) Yes. Each finite subset matches a finite binary string (or the binary number $\sum_{i\in S}2^i$), and that gives a bijection with $\mathbb{N}$.
(c) No. By Cantor's theorem $|\mathcal P(\mathbb{N})| > |\mathbb{N}|$; the diagonal argument builds a subset missed by any list.
:::
:::

:::cs
The halting problem is undecidable by a diagonal argument: from any claimed halting-checker you build a program that does the opposite of what the checker predicts about itself. Countability also explains why every program, file or string can be numbered (Gödel numbering, IDs in a database), while most real numbers can never be stored exactly, which is why floating point only represents a finite set of values.
:::

:::ml
A model with finitely many parameters stored as floats can only represent finitely many functions, while the set of all functions from inputs to labels is uncountable. So learning must assume the target lies in a restricted hypothesis class, the core idea behind generalization theory and no-free-lunch theorems. Universal approximation theorems are about getting *close* to functions, not representing all of them exactly.
:::

:::real
Hilbert's hotel makes the strangeness concrete: an infinitely large full hotel can take one more guest, or even infinitely many more (move guest $n$ to room $2n$, freeing all odd rooms). Taking attendance by pairing each student with a seat is the finite version of a bijection.
:::

:::quiz
? Under the bijection $f(n) = n/2$ (even $n$), $-(n + 1)/2$ (odd $n$), what is $f(7)$?
= -4
> 7 is odd, so $f(7) = -(7 + 1)/2 = -4$.

? Is $\mathbb{Q}$ countable?
+ Yes
- No
> Rationals can be listed by walking through pairs $(p, q)$ diagonally and skipping repeats.

? Which set is uncountable?
- $\mathbb{Z}$
- $\mathbb{N}\times\mathbb{N}$
+ $\mathcal P(\mathbb{N})$
> By Cantor's theorem, $\mathcal P(\mathbb{N})$ is strictly bigger than $\mathbb{N}$.

? What is the Cantor pairing value $\pi(1, 2) = \frac{(a + b)(a + b + 1)}2 + b$?
= 8
> $\frac{3\cdot4}2 + 2 = 6 + 2 = 8$.

? If a set $A$ has 5 elements, how many elements does $\mathcal P(A)$ have?
= 32
> $2^5 = 32 > 5$, the finite case of Cantor's theorem.

? A proper subset of an infinite set can have the same cardinality as the whole set.
+ True
- False
> The even naturals are a proper subset of $\mathbb{N}$, and $n\mapsto2n$ is a bijection.
:::
