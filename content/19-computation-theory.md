---
id: computation-theory
title: Theory of Computation
tagline: Automata, grammars, Turing machines, decidability and P vs NP: what computers can do, and how fast.
desc: The mathematics of computation itself. You'll start with strings and languages, build finite automata, regular expressions and grammars, climb up to pushdown automata and Turing machines, prove that some problems (like the halting problem) can never be solved by any program, and finish with complexity theory: P, NP, NP-completeness, Cook-Levin, classic reductions and space complexity.
color: #8b5cf6
symbol: Σ*
area: CS theory
paths: cs
order: 19
prereq: logic-proofs, sets-relations
---

# Unit: Strings, languages and finite automata

## Lesson: Alphabets, strings and languages {#alphabets-strings-languages}
@summary: The vocabulary of computation theory: alphabets, strings, the empty string, concatenation, and languages as sets of strings.

### Why we talk about strings at all
Every computer program you have ever used reads some input and produces some output. A spell checker reads a word and answers "is this spelled correctly?" A compiler reads source code and answers "is this a valid program?" A login page reads a password and answers "does this match the rules: at least 8 characters, one digit, one capital letter?" Underneath very different-looking tasks there is one common shape: some input, written as a sequence of symbols, and a yes-or-no question about it.

The theory of computation studies exactly that shape. Instead of worrying about Python, phones or graphics cards, it strips computation down to the bare bones: a finite set of symbols, finite sequences of those symbols, and sets of sequences that we want a machine to recognise. Once you have this vocabulary, you can ask very precise questions. Which sets of strings can be recognised by a machine with a fixed, small amount of memory? Which need a stack? Which can be recognised by any program at all? Which can be recognised quickly? This whole course answers those questions, and it all starts with three words: alphabet, string and language.

### Imagine a door keypad
Imagine the keypad on an office door. It has the keys 0 to 9 and nothing else. Every attempt to open the door is a finite sequence of key presses, like 4, 0, 7, 1. The door opens for some sequences (the correct code) and stays shut for everything else. The keys are the **alphabet**, each attempt is a **string**, and the set of attempts that open the door is a **language**. That is the whole picture in miniature, and every idea in this lesson is just a careful version of it.

### Alphabets
An **alphabet** is any finite, non-empty set of symbols. We usually call it $\Sigma$ (capital sigma). Some examples:

The binary alphabet is $\Sigma = \{0, 1\}$. The alphabet of DNA is $\{A, C, G, T\}$. The alphabet of the door keypad is $\{0, 1, 2, \dots, 9\}$, which has 10 symbols. The alphabet of English lowercase letters has 26 symbols. What a symbol "means" does not matter to the theory; only that we can tell symbols apart, and that there are finitely many of them.

:::def Alphabet
A finite, non-empty set of symbols, usually written $\Sigma$. Example: $\Sigma = \{0,1\}$.
:::

### Strings, length and the empty string
A **string** (also called a word) over $\Sigma$ is a finite sequence of symbols from $\Sigma$, written next to each other. Over $\{0,1\}$, the strings $0110$, $1$ and $00000$ are all fine. The **length** of a string $w$, written $|w|$, is the number of symbols in it, counting repeats: $|0110| = 4$ and $|1| = 1$.

There is one special string that confuses almost everyone at first: the **empty string**, written $\varepsilon$ (epsilon). It is the sequence with no symbols at all, so $|\varepsilon| = 0$. Think of it as the door attempt where nobody pressed a key. It is a perfectly real string, the same way 0 is a perfectly real number.

:::def Empty string ($\varepsilon$)
The unique string with no symbols. Its length is $|\varepsilon| = 0$, and $\varepsilon w = w\varepsilon = w$ for every string $w$.
:::

### Building new strings: concatenation, powers and reversal
The most important operation on strings is **concatenation**: writing one string right after another. If $u = 01$ and $v = 110$ then $uv = 01110$. Lengths simply add: $|uv| = |u| + |v| = 2 + 3 = 5$. Concatenation is associative, $(uv)w = u(vw)$, but not commutative: $vu = 11001$, which is a different string from $uv$. The empty string behaves like the number 1 in multiplication: $\varepsilon u = u$.

Repeated concatenation gives **powers**: $w^0 = \varepsilon$, $w^1 = w$, $w^2 = ww$, and so on. So $(01)^3 = 010101$, and its length is $3 \times 2 = 6$. The **reversal** $w^R$ writes $w$ backwards: $(0111)^R = 1110$. A string that equals its own reversal, like $0110$ or $10101$, is a **palindrome**.

Three more words describe pieces of strings. A **prefix** of $w$ is a piece taken from the start, a **suffix** is a piece taken from the end, and a **substring** is any consecutive piece. For $w = 0110$, the prefixes are $\varepsilon, 0, 01, 011, 0110$. A string of length $n$ always has exactly $n + 1$ prefixes, because you can cut it at any of $n + 1$ places.

### Counting strings
Let $\Sigma^k$ be the set of all strings of length exactly $k$. Each of the $k$ positions can hold any of the $|\Sigma|$ symbols independently, so by the multiplication rule
$$|\Sigma^k| = |\Sigma|^k.$$
Over $\{0,1\}$ there are $2^3 = 8$ strings of length 3: $000, 001, 010, 011, 100, 101, 110, 111$. Over DNA there are $4^3 = 64$ strings of length 3, which is exactly why biology has 64 codons. And $\Sigma^0 = \{\varepsilon\}$ has one element, matching $|\Sigma|^0 = 1$.

The set of all strings of every finite length is written $\Sigma^*$ (read "sigma star"):
$$\Sigma^* = \Sigma^0 \cup \Sigma^1 \cup \Sigma^2 \cup \cdots$$
It is infinite, but every single string in it is finite. That distinction matters: there is no "infinitely long string" in $\Sigma^*$.

### Languages
A **language** over $\Sigma$ is any set of strings over $\Sigma$, that is, any subset $L \subseteq \Sigma^*$. It can be finite, like the set of correct door codes $\{4071\}$, or infinite, like "all binary strings with an even number of 1s". It can even be empty.

Here is the key move of the entire subject: every yes-or-no question about inputs is a language. The question "is this binary number divisible by 3?" is the language $\{0, 11, 110, 1001, \dots\}$ of strings whose value is a multiple of 3. "Is this a syntactically valid Python program?" is the language of all valid Python files. Solving the problem means building a machine that, given any string, correctly says whether it belongs to the language.

:::def Language
Any set of strings over an alphabet $\Sigma$, i.e. a subset $L \subseteq \Sigma^*$. A decision problem is the same thing as a language: the set of inputs whose answer is yes.
:::

### Operations on languages
Because languages are sets, you can take unions, intersections and complements: $\overline{L} = \Sigma^* \setminus L$ is everything not in $L$. Languages also inherit operations from strings. The **concatenation** of two languages is
$$L_1 L_2 = \{xy : x \in L_1,\ y \in L_2\}.$$
For $L_1 = \{0, 01\}$ and $L_2 = \{1, 11\}$ you get $\{01, 011, 011, 0111\}$, and since sets ignore duplicates, $L_1L_2 = \{01, 011, 0111\}$, only 3 strings even though $2 \times 2 = 4$ pairs were tried.

The **Kleene star** $L^*$ is the set of all strings formed by gluing together zero or more strings from $L$: $L^* = L^0 \cup L^1 \cup L^2 \cup \cdots$ where $L^0 = \{\varepsilon\}$. If $L = \{01\}$ then $L^* = \{\varepsilon, 01, 0101, 010101, \dots\}$.

:::def Kleene star
For a language $L$, $L^* = \bigcup_{k \ge 0} L^k$: all concatenations of zero or more strings from $L$. It always contains $\varepsilon$.
:::

### Why it works this way, and common mistakes
These definitions are chosen so that strings behave like a number system for text: concatenation is the "multiplication", $\varepsilon$ is the "1", and length turns concatenation into addition. That makes counting and induction proofs about strings straightforward.

Three sets are easy to mix up. $\varepsilon$ is a string. $\{\varepsilon\}$ is a language containing exactly one string, the empty one. $\varnothing$ is the empty language, with no strings at all. They behave very differently: $L\{\varepsilon\} = L$, but $L\varnothing = \varnothing$, because there is no string in $\varnothing$ to glue onto. Another classic trap: $\varnothing^* = \{\varepsilon\}$, not $\varnothing$, because zero pieces glued together always gives the empty string. Finally, remember that $\Sigma^*$ contains infinitely many strings, yet each one has finite length.

### Summary
An alphabet is a finite set of symbols, a string is a finite sequence of them, and a language is a set of strings. Concatenation glues strings, $\varepsilon$ is the empty string, $\Sigma^k$ has $|\Sigma|^k$ members, and $\Sigma^*$ is all strings. Every decision problem is a language, so "can a machine solve this problem?" becomes "can a machine recognise this set of strings?" The rest of the course is about which machines can recognise which languages.

@viz g11-automata mode=regex regex="(0+1)*" input="0110" | The regular expression (0+1)* describes every binary string. The table lists them by length.

:::explore
**What to try**
1. Look at the "matches" column: count how many strings of each length appear.
2. Change the expression to `(0+1)(0+1)(0+1)` to see only $\Sigma^3$.
3. Change it to `(01)*` to see the Kleene star of the language $\{01\}$.
4. Type different strings in the String box and watch whether they are "in the language".

**What to notice:** the counts for `(0+1)*` are 1, 2, 4, 8, 16, 32: exactly $|\Sigma|^k = 2^k$, with the single string of length 0 being $\varepsilon$. With `(01)*` only even lengths appear, one string each, because $L^*$ only contains glued copies of $01$. This is the counting rule and the Kleene star from the article, made visible.
:::

:::formulas
$$|uv| = |u| + |v|, \qquad |w^k| = k\,|w|, \qquad (uv)^R = v^R u^R$$
$$|\Sigma^k| = |\Sigma|^k, \qquad \Sigma^* = \bigcup_{k\ge0} \Sigma^k$$
$$\text{binary strings of length} \le n:\ \ 1 + 2 + \cdots + 2^n = 2^{n+1} - 1$$
$$L_1L_2 = \{xy : x\in L_1, y\in L_2\}, \qquad L^* = \bigcup_{k\ge0} L^k,\ L^0 = \{\varepsilon\}$$
:::

:::thm $\Sigma^*$ is countably infinite
For any alphabet $\Sigma$, the strings in $\Sigma^*$ can be listed in a single infinite sequence that contains every string exactly once.
:::

:::proof
List strings in **shortlex order**: first by length, and within each length alphabetically. Over $\{0,1\}$ this gives $\varepsilon, 0, 1, 00, 01, 10, 11, 000, \dots$ Each length class $\Sigma^k$ is finite ($|\Sigma|^k$ strings), so any particular string $w$ of length $k$ appears after at most $1 + |\Sigma| + \cdots + |\Sigma|^k$ entries. Every string therefore gets a finite position in the list, which is what countable means.
:::

:::thm Reversal of a concatenation
For all strings $u, v$: $(uv)^R = v^R u^R$.
:::

:::proof
Write $u = a_1\cdots a_m$ and $v = b_1 \cdots b_n$. Then $uv = a_1\cdots a_m b_1 \cdots b_n$, and reading it backwards gives $b_n \cdots b_1 a_m \cdots a_1 = v^R u^R$.
:::

:::steps Count the strings of length at most 3 over $\Sigma = \{a, b, c\}$
1. Strings of length 0: $3^0 = 1$ (just $\varepsilon$).
2. Length 1: $3^1 = 3$. Length 2: $3^2 = 9$. Length 3: $3^3 = 27$.
3. Add the disjoint groups: $1 + 3 + 9 + 27 = 40$.
:::

:::steps Compute $L_1 L_2$ for $L_1 = \{a, ab\}$ and $L_2 = \{b, bb\}$
1. Glue every $x \in L_1$ to every $y \in L_2$: $a\cdot b = ab$, $a \cdot bb = abb$, $ab \cdot b = abb$, $ab \cdot bb = abbb$.
2. Remove duplicates, since a language is a set: $abb$ appears twice.
3. $L_1L_2 = \{ab, abb, abbb\}$, which has 3 strings, not 4.
:::

:::steps List the first 8 strings of $\{0,1\}^*$ in shortlex order
1. Length 0: $\varepsilon$.
2. Length 1, alphabetical: $0, 1$.
3. Length 2: $00, 01, 10, 11$.
4. Length 3 starts with $000$. So the list begins $\varepsilon, 0, 1, 00, 01, 10, 11, 000$.
:::

:::mock Exam question
Let $L = \{0, 01\}$. (a) List all strings in $L^2$. (b) Is $0010 \in L^*$? (c) Is $0110 \in L^*$?
:::solution
(a) $L^2 = \{00, 001, 010, 0101\}$ (four distinct strings).
(b) Yes: $0010 = 0 \cdot 01 \cdot 0$, three pieces from $L$, so it is in $L^3 \subseteq L^*$.
(c) No. Every piece from $L$ starts with $0$ and contains at most one $1$, which must directly follow a $0$. In $0110$ the second $1$ follows a $1$, so no split into pieces from $L$ exists.
:::
:::

:::cs
Compilers start with a **lexer** that splits source code into tokens: the alphabet is the character set, and each token type (identifiers, numbers, keywords) is a language. Every decision problem in complexity theory, from "is this graph 3-colourable?" to "does this program halt?", is formally a language of encoded inputs.
:::

:::ml
Language models work over an alphabet of **tokens** (a vocabulary of perhaps 50,000 pieces). A sequence of $k$ tokens is a string in $\Sigma^k$, and there are $50{,}000^k$ of them, which is why models must generalise instead of memorising. Byte-pair encoding builds that vocabulary by repeatedly concatenating frequent pairs of symbols.
:::

:::real
DNA is a string over $\{A, C, G, T\}$. Genes are read in substrings of length 3 called codons, and there are $4^3 = 64$ of them, coding for 20 amino acids plus stop signals. Searching a genome for a motif is a substring problem on a string with billions of symbols.
:::

:::quiz
? How many binary strings have length exactly 4?
= 16
> $|\Sigma^4| = 2^4 = 16$.

? What is the length of the empty string $\varepsilon$?
= 0
> $\varepsilon$ has no symbols, so $|\varepsilon| = 0$.

? For any language $L$, what is $L\varnothing$?
- $L$
+ $\varnothing$
- $\{\varepsilon\}$
- $L^*$
> To form a string in $L\varnothing$ you need a string from $\varnothing$ to glue on, and there are none. Compare $L\{\varepsilon\} = L$.

? If $L = \{a, bb\}$, how many strings are in $L^2$?
= 4
> $aa, abb, bba, bbbb$: all four combinations are different strings.

? How many strings over $\{a, b, c\}$ have length at most 2?
= 13
> $1 + 3 + 9 = 13$, counting $\varepsilon$.

? What is $\varnothing^*$?
- $\varnothing$
+ $\{\varepsilon\}$
- $\Sigma^*$
> $L^0 = \{\varepsilon\}$ for every $L$, and every higher power of $\varnothing$ is empty. So $\varnothing^* = \{\varepsilon\}$.
:::
## Lesson: Deterministic finite automata (DFAs) {#dfa}
@summary: Machines with a fixed, finite memory: states, transitions, accepting states, and how to design them.

### A machine with almost no memory
Think about a subway turnstile. It has only two situations it can be in: locked or unlocked. Put in a coin and it unlocks. Push through and it locks again. Push while locked and nothing happens. The turnstile does not remember how many people went through yesterday or what coins it has seen; it only remembers which of its two situations it is currently in. Yet that tiny memory is enough to do its job perfectly.

A **deterministic finite automaton** (DFA) is the mathematical version of the turnstile. It is the simplest model of a computer that reads input: a machine with a fixed, finite number of internal situations, called **states**, which reads a string one symbol at a time and moves between states according to fixed rules. When the string ends, the machine says yes or no depending on which state it finished in. DFAs sound almost too simple to be useful, but they power text search, network packet filters, lexical analysers in every compiler, and the controllers in vending machines and traffic lights.

### The parts of a DFA
Formally a DFA is a 5-tuple $M = (Q, \Sigma, \delta, q_0, F)$:

- $Q$ is a finite set of **states**.
- $\Sigma$ is the input alphabet.
- $\delta : Q \times \Sigma \to Q$ is the **transition function**: in state $q$, reading symbol $a$, go to state $\delta(q, a)$.
- $q_0 \in Q$ is the **start state**.
- $F \subseteq Q$ is the set of **accepting** (or final) states.

We draw DFAs as diagrams: circles for states, an arrow from nowhere into the start state, a double circle for each accepting state, and a labelled arrow from $q$ to $\delta(q,a)$ for every state and symbol. The word **deterministic** means that for every state and every symbol there is exactly one arrow to follow. The machine never has a choice and never gets stuck.

:::def Deterministic finite automaton (DFA)
A 5-tuple $(Q, \Sigma, \delta, q_0, F)$ with finite state set $Q$, alphabet $\Sigma$, total transition function $\delta: Q\times\Sigma\to Q$, start state $q_0$ and accepting states $F \subseteq Q$.
:::

### Running a DFA on a string
To run $M$ on a string $w = a_1 a_2 \cdots a_n$, start in $q_0$, read $a_1$ and move to $\delta(q_0, a_1)$, read $a_2$ and move again, and so on until the string is used up. If the final state is in $F$, the DFA **accepts** $w$; otherwise it **rejects**. The set of all strings $M$ accepts is the **language of** $M$, written $L(M)$.

Let us build one. Suppose we want to accept binary strings with an even number of 1s. What does the machine need to remember while reading? Not the whole string, and not even the count of 1s: just whether the count so far is even or odd. That gives two states, *even* (the start state, and accepting, since zero 1s is an even number) and *odd*. Reading a 0 leaves the parity alone, so 0 loops back to the same state. Reading a 1 flips the parity, so 1 swaps the states. On input $1011$: even $\to$ odd (read 1) $\to$ odd (read 0) $\to$ even (read 1) $\to$ odd (read 1). It ends in *odd*, so it rejects, and indeed $1011$ has three 1s.

@fig dfa machine="even # of 1s" | A two-state DFA for "even number of 1s". Type strings and watch the path.

### States are summaries of the past
The big design idea is this: **a state is a summary of everything about the input so far that you still need**. To design a DFA, ask "what is the minimum I must remember to decide the answer at the end?" and make one state for each possible value of that memory.

Here is a more surprising example: accept binary numbers divisible by 3. You might think the machine needs to remember the whole number, which can be arbitrarily large. But it only needs the remainder mod 3, which is 0, 1 or 2. When you append a bit $b$ to a binary number with value $v$, the new value is $2v + b$. So if the old remainder was $r$, the new remainder is $(2r + b) \bmod 3$. That gives three states $r_0, r_1, r_2$ and the rule $\delta(r, b) = (2r+b) \bmod 3$. Try $110$, which is 6: $r_0 \xrightarrow{1} r_1 \xrightarrow{1} r_0 \xrightarrow{0} r_0$. It ends in $r_0$, so 6 is accepted. Try $1101$, which is 13: $r_0 \to r_1 \to r_0 \to r_0 \to r_1$, rejected, and indeed $13 = 4\times 3 + 1$.

### The extended transition function
It is handy to have notation for "where does a whole string take me?" Define $\hat\delta(q, w)$ by $\hat\delta(q, \varepsilon) = q$ and $\hat\delta(q, wa) = \delta(\hat\delta(q, w), a)$. This just says: to process $wa$, first process $w$, then take one more step on $a$. Then $L(M) = \{ w : \hat\delta(q_0, w) \in F \}$.

### Regular languages
A language is called **regular** if some DFA recognises it. "Even number of 1s", "divisible by 3" and "contains 11" are all regular. Later we will see that regular languages are exactly the ones described by regular expressions, and we will also prove that some languages, like $\{0^n1^n : n \ge 0\}$, are not regular, because no finite memory can count unboundedly high.

:::def Regular language
A language $L$ is regular if $L = L(M)$ for some DFA $M$.
:::

### Building new DFAs from old ones
Because a DFA always finishes in exactly one state, **complement** is easy: swap accepting and non-accepting states. The new machine accepts exactly the strings the old one rejected.

For **intersection** we use the **product construction**. To accept strings that have an even number of 1s *and* are divisible by 3, run both machines at the same time. A state of the combined machine is a pair (parity state, remainder state), so there are $2 \times 3 = 6$ states. On each symbol, both parts move according to their own rules. Accept when both parts are accepting. For union, accept when at least one part is accepting. This shows that the regular languages are closed under complement, intersection and union.

### Common mistakes
The most frequent error is a **missing transition**. A DFA must have exactly one arrow for every state and every symbol. If some situation should lead to "reject forever", add a **dead state** (also called a trap state): a non-accepting state that loops to itself on every symbol. Second, check the empty string: $\varepsilon$ is accepted exactly when the start state is accepting. Third, remember that accepting states do not stop the machine. A DFA always reads the whole input; passing through an accepting state in the middle means nothing. Finally, complementing by swapping states only works when every transition is present; with a missing arrow, strings that would "fall off" the machine are rejected both before and after the swap.

### Summary
A DFA is a finite set of states with exactly one transition per state and symbol, a start state and a set of accepting states. It reads its input left to right and accepts if it ends in an accepting state. Each state stands for a summary of the input so far, and good design means choosing the smallest summary that is enough to answer the question. Languages recognised by DFAs are called regular, and they are closed under complement, union and intersection.

@viz dfa machine="divisible by 3" | Type a binary number. The DFA tracks its remainder mod 3.

:::explore
**What to try**
1. Type $1$, then $11$, then $110$, then $1101$. Before each step, predict the state using $(2r+b) \bmod 3$.
2. Type the binary for 9 ($1001$) and for 10 ($1010$). Which is accepted?
3. Switch the machine to "contains 11" and find the state that, once entered, is never left.
4. Switch to "even # of 1s" and try the empty string.

**What to notice:** the state is always the remainder of the number read so far, exactly as in the article, so the machine handles numbers of any size with three states. In "contains 11" the accepting state loops to itself on both symbols, because once you have seen $11$ nothing can undo it. And the empty string is accepted by "even # of 1s" because zero is even and the start state is accepting.
:::

:::formulas
$$M = (Q, \Sigma, \delta, q_0, F), \qquad \delta: Q\times\Sigma \to Q$$
$$\hat\delta(q,\varepsilon) = q, \qquad \hat\delta(q, wa) = \delta(\hat\delta(q,w), a)$$
$$L(M) = \{w \in \Sigma^* : \hat\delta(q_0, w) \in F\}$$
$$\text{mod-}m \text{ DFA: } \delta(r, b) = (2r + b) \bmod m$$
$$\text{product DFA: } Q = Q_1 \times Q_2,\ \ \delta((p,q),a) = (\delta_1(p,a), \delta_2(q,a))$$
:::

:::thm Closure under complement, union and intersection
If $L_1$ and $L_2$ are regular, so are $\overline{L_1}$, $L_1 \cup L_2$ and $L_1 \cap L_2$.
:::

:::proof
Complement: take a DFA for $L_1$ and replace $F$ by $Q \setminus F$. Since the run on any $w$ ends in exactly one state, $w$ is accepted by the new machine iff it was rejected by the old one.
Intersection and union: given $M_1, M_2$, build the product DFA with states $Q_1 \times Q_2$, start $(q_1, q_2)$ and $\delta((p,q),a) = (\delta_1(p,a), \delta_2(q,a))$. By induction on $|w|$, $\hat\delta((q_1,q_2), w) = (\hat\delta_1(q_1, w), \hat\delta_2(q_2, w))$. Choosing accepting states $F_1 \times F_2$ gives $L_1 \cap L_2$; choosing $\{(p,q) : p\in F_1 \text{ or } q \in F_2\}$ gives $L_1 \cup L_2$.
:::

:::steps Trace the divisible-by-3 DFA on $10010$ (the number 18)
1. Start in $r_0$. Read 1: $(2\cdot0+1) \bmod 3 = 1$, go to $r_1$.
2. Read 0: $(2\cdot1+0) \bmod 3 = 2$, go to $r_2$.
3. Read 0: $(2\cdot2+0) \bmod 3 = 1$, go to $r_1$.
4. Read 1: $(2\cdot1+1) \bmod 3 = 0$, go to $r_0$.
5. Read 0: $(0+0) \bmod 3 = 0$, stay in $r_0$. It ends in $r_0$, so accept. Check: $18 = 6 \times 3$.
:::

:::steps Design a DFA for "even number of 0s and odd number of 1s"
1. Memory needed: parity of 0s (2 options) and parity of 1s (2 options), so $2 \times 2 = 4$ states: $(E,E), (E,O), (O,E), (O,O)$, where the first letter is the 0-parity.
2. Start state $(E,E)$, since the empty string has zero of each.
3. Reading 0 flips the first coordinate; reading 1 flips the second. For example $\delta((E,O), 0) = (O,O)$.
4. The only accepting state is $(E,O)$. Check with $001$: $(E,E)\to(O,E)\to(E,E)\to(E,O)$, accept. It has two 0s and one 1.
:::

:::steps How many states does the product construction use for "length divisible by 4" $\cap$ "divisible by 5 in binary"?
1. Length mod 4 needs 4 states.
2. Value mod 5 needs 5 states (remainders 0 to 4).
3. The product has one state per pair: $4 \times 5 = 20$ states.
:::

:::mock Exam question
Give a DFA over $\{0,1\}$ for the language of strings that do **not** contain $11$ as a substring, and trace it on $10101$ and $0110$.
:::solution
First build a DFA for "contains 11": state $a$ (last symbol was not 1, or nothing read yet), $b$ (last symbol was a 1, no $11$ seen), $c$ ($11$ seen). Transitions: $a \xrightarrow0 a$, $a \xrightarrow1 b$, $b\xrightarrow0 a$, $b \xrightarrow1 c$, $c \xrightarrow{0,1} c$; accepting $\{c\}$.
Complement it by swapping: accepting states become $\{a, b\}$.
$10101$: $a\to b\to a\to b\to a\to b$, ends in $b$, accept (no $11$). $0110$: $a\to a\to b\to c\to c$, ends in $c$, reject.
:::
:::

:::cs
**Lexers** in compilers (tools like `lex` and `flex`) turn token patterns into one big DFA and scan source code in a single left-to-right pass. Network intrusion detection, `grep`, protocol parsers and hardware controllers (traffic lights, elevators, vending machines) are DFAs too, because a fixed number of states means constant memory and one step per input symbol.
:::

:::ml
Simple sequence models are finite-state: a **hidden Markov model** is a probabilistic finite automaton, and weighted finite-state transducers are used in speech recognition pipelines. Researchers also probe how well recurrent networks and transformers can learn to simulate DFAs such as "parity of 1s", a classic hard case for generalising to longer inputs.
:::

:::real
A **vending machine** that sells a 30-cent item and takes 10-cent coins is a DFA with states 0, 10, 20 and "dispense": each coin moves it to the next state, and it only needs to remember the amount inserted so far, never the history of which coins.
:::

:::quiz
? In a DFA, how many transitions leave each state for each input symbol?
- zero or one
+ exactly one
- one or more
- any number
> Deterministic means total and unique: $\delta(q,a)$ is defined and is a single state for every $q$ and $a$.

? After reading $1011$ (the number 11), which remainder state is the divisible-by-3 DFA in? Give the remainder.
= 2
> $11 = 3 \times 3 + 2$. Step by step: $r_0\to r_1\to r_2\to r_2\to r_2$, since $(2\cdot2+1) \bmod 3 = 2$.

? A DFA accepts $\varepsilon$ exactly when...
+ its start state is accepting
- it has a dead state
- every state is accepting
> On the empty input the machine never moves, so it ends where it started.

? The product of a 4-state DFA and a 5-state DFA has how many states?
= 20
> Product states are pairs: $4 \times 5 = 20$.

? How do you get a DFA for the complement of $L(M)$?
- reverse every arrow
+ swap accepting and non-accepting states
- add a dead state
> Each run ends in exactly one state, so swapping $F$ with $Q\setminus F$ flips every answer.

? What is the fewest states a DFA needs to accept strings whose length is a multiple of 3?
= 3
> It must remember length mod 3, which has 3 possible values, and those three situations really are different.
:::

## Lesson: Nondeterministic finite automata (NFAs) {#nfa}
@summary: Machines that may have several (or zero) moves at once, plus ε-moves; acceptance means some path accepts.

### What if a machine could guess?
Suppose you are scanning a long list of binary strings and want to accept those that end in $01$. Reading left to right, you face an annoying problem: every time you see a $0$, it *might* be the second-to-last symbol, or it might not. A DFA handles this by carefully tracking what the last couple of symbols were. But imagine a machine that could simply **guess**: "this 0 is the start of the final $01$". If the guess is right, the rest of the input confirms it; if the guess is wrong, that line of reasoning just dies. The machine accepts if *any* sequence of guesses works.

That is a **nondeterministic finite automaton** (NFA). Nondeterminism is not randomness and it is not a physical machine; it is a way of describing computations in which several possibilities are explored at once. NFAs are often far smaller and easier to design than DFAs, and, remarkably, they recognise exactly the same languages. They are also the bridge between regular expressions and DFAs, and nondeterminism comes back later as the heart of the P versus NP question.

### The definition
An NFA is a 5-tuple $N = (Q, \Sigma, \delta, q_0, F)$, just like a DFA, except the transition function returns a **set** of states:
$$\delta : Q \times \Sigma_\varepsilon \to \mathcal{P}(Q), \qquad \Sigma_\varepsilon = \Sigma \cup \{\varepsilon\}.$$
Here $\mathcal{P}(Q)$ is the power set, the set of all subsets of $Q$. Three new things can happen. A state can have **several** arrows with the same label, so the machine has a choice. A state can have **no** arrow for some symbol; a computation path that needs that arrow simply dies. And there can be **ε-transitions**: arrows labelled $\varepsilon$ that the machine may follow without reading any input.

:::def Nondeterministic finite automaton (NFA)
A 5-tuple $(Q,\Sigma,\delta,q_0,F)$ where $\delta: Q \times (\Sigma\cup\{\varepsilon\}) \to \mathcal P(Q)$. It accepts $w$ if at least one way of following transitions while reading all of $w$ ends in an accepting state.
:::

An NFA **accepts** $w$ if there is at least one path from $q_0$ that reads all of $w$ (possibly taking ε-moves in between) and ends in an accepting state. It **rejects** $w$ only if every possible path either dies or ends in a non-accepting state. The asymmetry is important: acceptance needs one witness; rejection needs all paths to fail.

### The "ends in 01" NFA
Here is the guessing machine: states $q_0, q_1, q_2$ with $q_2$ accepting. In $q_0$, on 0 you may stay in $q_0$ or jump to $q_1$ (the guess "this is the final 0"); on 1 you stay in $q_0$. From $q_1$, a 1 leads to $q_2$, and $q_1$ has no arrow on 0. State $q_2$ has no outgoing arrows at all, so if any input remains after reaching it, that path dies. Three states, and the design follows directly from the description of the language.

### Simulating an NFA: track the set of possible states
How do we actually run an NFA? Picture each choice splitting the machine into clones, one per option. Instead of following clones individually, keep track of the **set** of states that some clone is in. Start with $\{q_0\}$. For each symbol, the new set is everything reachable from any state in the current set on that symbol.

Run the "ends in 01" NFA on $1101$:
$$\{q_0\} \xrightarrow{1} \{q_0\} \xrightarrow{1} \{q_0\} \xrightarrow{0} \{q_0, q_1\} \xrightarrow{1} \{q_0, q_2\}.$$
The final set contains the accepting state $q_2$, so the NFA accepts. On $0110$ the sets are $\{q_0\}, \{q_0,q_1\}, \{q_0,q_2\}, \{q_0\}, \{q_0,q_1\}$, and since no state in the final set is accepting, it rejects. Notice that $q_2$ appeared in the middle, but that does not matter: only the set after the last symbol counts.

### ε-transitions and ε-closure
An ε-transition lets the machine change state "for free". This is very useful for combining machines. Suppose you have one machine for "even number of 0s" and another for "even number of 1s", and you want their union. Add a new start state $s$ with ε-arrows to both old start states. From $s$ the machine instantly becomes both machines at once, and it accepts if either one accepts.

To handle ε-moves in the set simulation, we use the **ε-closure** $E(S)$: all states reachable from states in $S$ using zero or more ε-arrows. The start set is $E(\{q_0\})$, and after each symbol we take the ε-closure of the result. In the union machine, $E(\{s\}) = \{s, a_0, b_0\}$, so before reading anything the machine is already in both start states.

:::def ε-closure
For a set of NFA states $S$, $E(S)$ is the set of states reachable from $S$ by following zero or more ε-transitions. It always contains $S$ itself.
:::

### Why NFAs are not "magic"
It can feel like cheating that an NFA always guesses right. But the set simulation shows there is nothing magical: a deterministic computer can follow all guesses at once, because a finite machine has only finitely many states, so the set of possible states is one of finitely many subsets. In the next lesson we turn that observation into the **subset construction**, which converts any NFA into an equivalent DFA. So NFAs give convenience and compactness, not extra power.

### Common mistakes
Do not think of nondeterminism as "picking randomly"; an NFA accepts if **some** choice works, no matter how unlikely. Do not forget that a missing arrow kills only that path, not the whole computation. Always apply ε-closure both at the start and after every symbol; the most common bug in hand simulations is forgetting the closure at the start. And remember that complementing an NFA by swapping accepting states does **not** work in general, because "some path accepts" flipped is not "some path rejects".

### Summary
An NFA may have several, one or no transitions on a symbol, and may take ε-moves without reading input. It accepts if at least one path ends in an accepting state after reading the whole string. You simulate it by tracking the set of all states it could be in, closing under ε-moves at each step. NFAs are often much smaller than DFAs and make constructions like union easy, yet they recognise exactly the regular languages.

@viz g11-automata mode=nfa machine="ends in 01" input="1101" | Pink states are all the states the NFA could be in. Use step to read one symbol at a time.

:::explore
**What to try**
1. Press "start", then "step ▶" four times on $1101$. Compare each set with the trace in the article.
2. Type $0110$ and step through. Watch $q_2$ light up and then disappear.
3. Switch the NFA to "ε-NFA: even # of 0s OR even # of 1s" and press start. Count the states that are active before any symbol is read.
4. On the ε-NFA, try $01$, $001$ and $0101$.

**What to notice:** an NFA's "current state" is really a set. In step 2 the machine passes through an accepting state but rejects, because only the final set counts. In step 3 three states are active at the start, $\{s, a_0, b_0\}$: that is the ε-closure. In step 4, $01$ is rejected (one 0 and one 1, both odd), while $001$ is accepted because it has two 0s.
:::

:::formulas
$$\delta: Q\times\Sigma_\varepsilon \to \mathcal P(Q)$$
$$S_0 = E(\{q_0\}), \qquad S_{k+1} = E\Big(\bigcup_{q\in S_k} \delta(q, a_{k+1})\Big)$$
$$N \text{ accepts } a_1\cdots a_n \iff S_n \cap F \ne \varnothing$$
:::

:::thm Union of regular languages via an NFA
If NFAs $N_1$ and $N_2$ recognise $L_1$ and $L_2$, then the NFA with a new start state $s$ and ε-transitions $s \to q_1$, $s \to q_2$ (keeping all old states and arrows) recognises $L_1 \cup L_2$.
:::

:::proof
Any accepting path of the new machine starts with an ε-move into $q_1$ or $q_2$, and from then on it is an accepting path of $N_1$ or of $N_2$, because the two machines share no states. Conversely, an accepting path of $N_1$ (or $N_2$) on $w$, with the extra ε-step in front, is an accepting path of the new machine. So it accepts $w$ exactly when $w \in L_1$ or $w \in L_2$.
:::

:::steps Simulate the "ends in 01" NFA on $0101$
1. Start: $S_0 = \{q_0\}$.
2. Read 0: $q_0$ goes to $\{q_0, q_1\}$. $S_1 = \{q_0, q_1\}$.
3. Read 1: $q_0 \to q_0$, $q_1 \to q_2$. $S_2 = \{q_0, q_2\}$.
4. Read 0: $q_0 \to \{q_0,q_1\}$, $q_2$ has no arrows. $S_3 = \{q_0, q_1\}$.
5. Read 1: $S_4 = \{q_0, q_2\}$. It contains $q_2$, so accept.
:::

:::steps Run the union ε-NFA on $01$
1. Start set: $E(\{s\}) = \{s, a_0, b_0\}$.
2. Read 0: $s$ has no 0-arrow, $a_0 \to a_1$, $b_0 \to b_0$. New set $\{a_1, b_0\}$ (no ε-moves to add).
3. Read 1: $a_1 \to a_1$, $b_0 \to b_1$. New set $\{a_1, b_1\}$.
4. Neither $a_1$ nor $b_1$ is accepting, so reject. Check: $01$ has an odd number of 0s and an odd number of 1s.
:::

:::steps Design an NFA for strings containing $101$
1. State $q_0$ loops on 0 and 1 (wait for the pattern to start). On 1 it may also guess "the pattern starts here" and go to $q_1$.
2. $q_1 \xrightarrow{0} q_2$, $q_2 \xrightarrow{1} q_3$.
3. $q_3$ is accepting and loops on 0 and 1, since anything may follow the pattern.
4. Four states in total; wrong guesses die automatically when the next symbol does not match.
:::

:::mock Exam question
Design an NFA for binary strings whose **second-to-last** symbol is 1, and simulate it on $0110$.
:::solution
States $q_0$ (start), $q_1$, $q_2$ (accepting). $q_0$ loops on 0 and 1, and on 1 also moves to $q_1$ (guess: this 1 is second to last). $q_1$ moves to $q_2$ on 0 or 1. $q_2$ has no outgoing arrows.
Simulation of $0110$: $\{q_0\} \xrightarrow0 \{q_0\} \xrightarrow1 \{q_0,q_1\} \xrightarrow1 \{q_0,q_1,q_2\} \xrightarrow0 \{q_0, q_2\}$. The final set contains $q_2$, so accept. Indeed, the second-to-last symbol of $0110$ is 1.
:::
:::

:::cs
Regular-expression engines such as Thompson's algorithm (used in `grep`, RE2 and Go's `regexp`) compile a pattern into an NFA and simulate it with the set-of-states method. That guarantees time proportional to (pattern size) $\times$ (text length), avoiding the exponential blow-ups of backtracking engines.
:::

:::ml
Tokenizers and text-normalisation steps in ML pipelines use NFA-based regex matching to split and clean text. In speech recognition, decoding searches a huge nondeterministic network of word and phone states, keeping the most probable active states at each time step (beam search), a weighted cousin of NFA simulation.
:::

:::real
Think of reading a mystery novel and keeping a list of suspects. Each clue can add suspects or rule some out, and you keep the whole list rather than committing to one. At the end, the case is "solved" if at least one remaining suspect fits. That is exactly how an NFA keeps a set of possible states.
:::

:::quiz
? An NFA accepts a string when...
- every computation path ends in an accepting state
+ at least one computation path ends in an accepting state
- the majority of paths accept
> Acceptance needs just one successful path. Rejection requires all paths to fail.

? In the "ends in 01" NFA, how many states are in the set after reading $10$?
= 2
> $\{q_0\} \xrightarrow1 \{q_0\} \xrightarrow0 \{q_0, q_1\}$: two states.

? What happens to a computation path that reaches a state with no arrow for the next symbol?
+ that path dies, other paths continue
- the whole NFA rejects
- the NFA accepts
> A missing transition only ends that branch.

? For the second-to-last-is-1 NFA, how many states are active after reading $11$?
= 3
> $\{q_0\} \to \{q_0, q_1\} \to \{q_0,q_1,q_2\}$.

? Does swapping accepting and non-accepting states of an NFA always give an NFA for the complement?
- Yes
+ No
> An NFA may have both accepting and rejecting paths on the same string; after swapping, it would still accept. Convert to a DFA first, then swap.

? The ε-closure $E(S)$ always contains...
+ $S$ itself
- only accepting states
- the start state
> It is the set reachable by zero or more ε-moves, and zero moves leaves you in $S$.
:::
## Lesson: The subset construction (NFA to DFA) {#subset-construction}
@summary: Every NFA can be turned into an equivalent DFA whose states are sets of NFA states, with at most 2ⁿ states.

### The question
In the last lesson NFAs looked more powerful than DFAs. They can guess, split into clones, and jump along ε-arrows. So a natural question is: are there languages an NFA can recognise but no DFA can? The answer is no, and the proof is one of the most useful constructions in computer science. It is called the **subset construction** (or powerset construction), and it is exactly how tools like `lex` turn the patterns you write into fast scanning code.

### Imagine a detective with a notebook
Picture a detective following a suspect through a city. At each crossroads the suspect might have turned left or right, so the detective cannot know the exact position. Instead, she writes in her notebook the **set of places the suspect could be**. At the next crossroads she updates the whole set at once. Her notebook entry is completely determined by the previous entry and the new clue: there is no guessing in her method at all. Our DFA will be that detective. Each of its states is one possible notebook entry, that is, one set of NFA states.

### The idea in one sentence
When we simulated an NFA, the "current situation" was a set of states $S \subseteq Q$, and the next set was completely determined by $S$ and the next symbol. A machine whose situation is determined by the previous situation and the input is deterministic. Since $Q$ is finite, there are only finitely many subsets: exactly $2^{|Q|}$. So we can make a DFA with one state per subset.

### The construction
Start with an NFA $N = (Q, \Sigma, \delta, q_0, F)$. Build a DFA $D$ as follows.

- **States:** subsets of $Q$. (In practice we only build the ones we can actually reach.)
- **Start state:** $E(\{q_0\})$, the ε-closure of the NFA's start state.
- **Transitions:** for a subset $S$ and symbol $a$, $\delta_D(S, a) = E\big(\bigcup_{q\in S} \delta(q, a)\big)$: everywhere any member of $S$ can go on $a$, then close under ε-moves.
- **Accepting states:** every subset that contains at least one NFA accepting state, $\{S : S \cap F \ne \varnothing\}$.

:::def Subset construction
The method that converts an NFA with state set $Q$ into a DFA whose states are subsets of $Q$, whose start state is $E(\{q_0\})$, whose moves are $\delta_D(S,a) = E(\bigcup_{q \in S}\delta(q,a))$, and whose accepting states are the subsets containing an NFA accepting state.
:::

### Working it out by hand: "ends in 01"
Recall the NFA: $q_0 \xrightarrow{0} \{q_0, q_1\}$, $q_0 \xrightarrow1 \{q_0\}$, $q_1 \xrightarrow{1} \{q_2\}$, and $q_2$ accepting with no arrows. There are no ε-moves, so closures change nothing. We build a table, adding new subsets as they appear.

Start with $\{q_0\}$. On 0 it goes to $\{q_0, q_1\}$ (new). On 1 it goes to $\{q_0\}$.

Next row, $\{q_0, q_1\}$. On 0: $q_0$ gives $\{q_0,q_1\}$ and $q_1$ gives nothing, so $\{q_0,q_1\}$. On 1: $q_0$ gives $\{q_0\}$ and $q_1$ gives $\{q_2\}$, so $\{q_0, q_2\}$ (new).

Next row, $\{q_0, q_2\}$. On 0: $\{q_0, q_1\}$. On 1: $\{q_0\}$. No new subsets appeared, so we stop.

The DFA has **3 states** out of $2^3 = 8$ possible subsets. Only $\{q_0, q_2\}$ contains $q_2$, so it is the single accepting state. Read the subsets as meanings: $\{q_0\}$ means "haven't just seen a 0", $\{q_0, q_1\}$ means "just saw a 0", and $\{q_0, q_2\}$ means "just saw 01". That is exactly the DFA you would have designed by hand.

### Why only reachable subsets?
Writing down all $2^n$ subsets is wasteful. Most are never entered: for the "ends in 01" NFA, no reachable subset is missing $q_0$, because $q_0$ loops on everything. The standard algorithm is a search: put the start subset on a to-do list, and repeatedly take a subset off the list, compute its moves on every symbol, and add any subset not yet seen. This is breadth-first search over subsets, and it stops because there are finitely many.

### When the blow-up is real
Sometimes the DFA really needs exponentially many states. Take the NFA for "the 3rd symbol from the end is 1": $q_0$ loops on 0 and 1, on 1 it also guesses $q_1$, then $q_1 \to q_2 \to q_3$ on any symbol, with $q_3$ accepting. The NFA has 4 states. The subset construction produces **8** reachable DFA states: every subset that contains $q_0$, one for each possible pattern of the last three symbols. You cannot do better: a DFA reading this language must remember the last three symbols, because any two different 3-symbol endings can be told apart by appending a suitable suffix. For "the $n$th symbol from the end is 1" the NFA has $n+1$ states but the smallest DFA has $2^n$.

### Why it works
The proof is a careful version of the detective story. By induction on the length of $w$, the DFA state after reading $w$ equals the set of NFA states reachable by reading $w$. For $w = \varepsilon$ both are $E(\{q_0\})$. If it holds for $w$, then reading one more symbol $a$, both sides take every state reachable from the current set on $a$ and close under ε. So after the whole input, the DFA is in exactly the set of states the NFA could be in, and the DFA accepts iff that set contains an accepting state, which is precisely when the NFA accepts.

### Common mistakes
Forgetting the ε-closure of the start state is the number one error. The second is forgetting the empty set: if a subset has no moves on some symbol, its successor is $\varnothing$, which becomes a dead state in the DFA. It is a real state and must be included. Third, a subset is accepting if it contains **any** NFA accepting state, not all of them. And finally, do not assume the result is minimal: the subset construction can produce redundant states that a minimisation step will merge.

### Summary
The subset construction turns any NFA with $n$ states into an equivalent DFA whose states are sets of NFA states, with at most $2^n$ of them. The start state is the ε-closure of $q_0$, transitions take all possible moves then close under ε, and accepting subsets are those containing an accepting NFA state. So NFAs and DFAs recognise exactly the same class of languages, the regular languages. The price of determinism can be an exponential number of states, and sometimes that price is unavoidable.

@viz g11-automata mode=subset machine="ends in 01" input="1101" | The table is the DFA built by the subset construction. The highlighted row is where the DFA ends on your string.

:::explore
**What to try**
1. Check each row of the table against the hand computation in the article.
2. Switch the NFA to "3rd symbol from the end is 1". Read off how many DFA states are reachable, and compare with $2^4$.
3. Switch to "contains 101" and count the accepting rows.
4. Switch to the ε-NFA and look at the start row: which states are in it?

**What to notice:** for "ends in 01" only 3 of the 8 subsets are reachable. For "3rd from the end" there are 8 reachable states, every subset containing $q_0$, which is the real exponential blow-up. For "contains 101" three rows are accepting, and they all behave the same way, a hint that minimisation could merge them. The ε-NFA's start row is $\{s, a_0, b_0\}$, the ε-closure.
:::

:::formulas
$$Q_D \subseteq \mathcal P(Q), \qquad |Q_D| \le 2^{|Q|}$$
$$q_D = E(\{q_0\}), \qquad \delta_D(S,a) = E\Big(\bigcup_{q\in S}\delta(q,a)\Big)$$
$$F_D = \{S \subseteq Q : S\cap F \ne\varnothing\}$$
:::

:::thm NFAs and DFAs are equivalent
For every NFA $N$ there is a DFA $D$ with $L(D) = L(N)$. Hence a language is regular if and only if some NFA recognises it.
:::

:::proof
Build $D$ by the subset construction. Claim: for every string $w$, $\hat\delta_D(q_D, w)$ equals the set $R(w)$ of NFA states reachable from $q_0$ while reading $w$. Base case: $R(\varepsilon) = E(\{q_0\}) = q_D$. Step: $R(wa) = E(\bigcup_{q \in R(w)} \delta(q,a)) = \delta_D(R(w), a)$. So $D$ accepts $w$ iff $R(w) \cap F \ne \varnothing$ iff some path of $N$ on $w$ ends in $F$ iff $N$ accepts $w$. The other direction is trivial: every DFA is already an NFA.
:::

:::thm The blow-up can be necessary
The language "the $n$th symbol from the end is 1" has an NFA with $n+1$ states, but every DFA for it has at least $2^n$ states.
:::

:::proof
Suppose a DFA has fewer than $2^n$ states. There are $2^n$ binary strings of length $n$, so by the pigeonhole principle two different ones, $x \ne y$, end in the same state. They differ in some position $i$ (counting from 1 on the left); say $x$ has 1 there and $y$ has 0. Append $z = 0^{i-1}$. Now the symbol at position $i$ is exactly $n$th from the end in both $xz$ and $yz$, so $xz$ is in the language and $yz$ is not. But the DFA is in the same state after $x$ and $y$, so it is also in the same state after $xz$ and $yz$, and gives the same answer. Contradiction.
:::

:::steps Convert the "contains 101" NFA to a DFA
1. NFA: $q_0 \xrightarrow0 \{q_0\}$, $q_0\xrightarrow1\{q_0,q_1\}$, $q_1 \xrightarrow0 \{q_2\}$, $q_2 \xrightarrow1 \{q_3\}$, $q_3 \xrightarrow{0,1} \{q_3\}$.
2. $\{q_0\}$: on 0 $\{q_0\}$, on 1 $\{q_0,q_1\}$.
3. $\{q_0,q_1\}$: on 0 $\{q_0,q_2\}$, on 1 $\{q_0, q_1\}$.
4. $\{q_0,q_2\}$: on 0 $\{q_0\}$, on 1 $\{q_0,q_1,q_3\}$.
5. $\{q_0,q_1,q_3\}$: on 0 $\{q_0,q_2,q_3\}$, on 1 $\{q_0,q_1,q_3\}$. $\{q_0,q_2,q_3\}$: on 0 $\{q_0,q_3\}$, on 1 $\{q_0,q_1,q_3\}$. $\{q_0,q_3\}$: on 0 $\{q_0, q_3\}$, on 1 $\{q_0,q_1,q_3\}$.
6. Result: 6 reachable states, 3 of them accepting (those containing $q_3$).
:::

:::steps Subset construction for the union ε-NFA (even 0s or even 1s)
1. Start: $E(\{s\}) = \{s, a_0, b_0\}$, accepting.
2. From the start: on 0 go to $\{a_1, b_0\}$, on 1 go to $\{a_0, b_1\}$. Both accepting (each contains $a_0$ or $b_0$).
3. $\{a_1,b_0\}$: on 0 $\{a_0,b_0\}$, on 1 $\{a_1,b_1\}$. $\{a_0,b_1\}$: on 0 $\{a_1,b_1\}$, on 1 $\{a_0,b_0\}$.
4. $\{a_0,b_0\}$ and $\{a_1,b_1\}$ produce no new subsets.
5. Total: 5 states; only $\{a_1, b_1\}$ (both parities odd) rejects.
:::

:::mock Exam question
An NFA over $\{a,b\}$ has states $p$ (start), $r$ (accepting) with transitions $p \xrightarrow{a} \{p, r\}$, $p \xrightarrow b \{p\}$, and no transitions out of $r$. Apply the subset construction, give the DFA table, and describe the language.
:::solution
Start $\{p\}$: on $a$ go to $\{p,r\}$, on $b$ go to $\{p\}$.
$\{p,r\}$: on $a$, $p$ gives $\{p,r\}$ and $r$ gives nothing, so $\{p,r\}$; on $b$, $\{p\}$.
Two DFA states; $\{p,r\}$ is accepting. The DFA is in $\{p,r\}$ exactly when the last symbol read was $a$, so the language is "strings ending in $a$".
:::
:::

:::cs
Lexer generators (`lex`, `flex`, and the scanners in many compilers) translate each token's regular expression into an NFA, combine them with ε-arrows, and run the subset construction once at build time. The resulting DFA scans source code in one pass with a single table lookup per character.
:::

:::ml
Constrained decoding for language models (forcing output to match a JSON schema or a regex) compiles the constraint into an automaton, often determinised with the subset construction, and masks out tokens that would leave the DFA in a dead state.
:::

:::real
When you track a package that "could be at any of these three depots", each new scan updates the whole set of possibilities. Logistics software that keeps a set of possible locations and updates it deterministically is performing the subset construction in real time.
:::

:::quiz
? An NFA has 5 states. What is the maximum number of states the subset construction can produce?
= 32
> One DFA state per subset: $2^5 = 32$.

? In the subset construction, which DFA states are accepting?
- subsets containing only accepting states
+ subsets containing at least one accepting state
- the full set $Q$ only
> The NFA accepts if some path ends in $F$, i.e. if the current set meets $F$.

? How many reachable DFA states does the subset construction give for the "ends in 01" NFA?
= 3
> $\{q_0\}, \{q_0,q_1\}, \{q_0,q_2\}$.

? What is the DFA start state when the NFA has ε-moves?
- $\{q_0\}$
+ $E(\{q_0\})$
- $\varnothing$
> The NFA can follow ε-arrows before reading anything, so the start set must be closed.

? The smallest DFA for "the 4th symbol from the end is 1" has how many states?
= 16
> $2^n$ with $n = 4$. The NFA needs only 5.

? If a subset has no moves on symbol $a$, its $a$-successor in the DFA is...
+ the empty set, which acts as a dead state
- undefined, so the DFA is incomplete
- the start state
> $\varnothing$ is a legitimate DFA state that loops to itself and rejects.
:::

## Lesson: Regular expressions {#regular-expressions}
@summary: A compact algebra for describing regular languages using union, concatenation and star.

### A shorter way to say it
Drawing a state diagram is a fine way to describe "strings that end in 01", but it is slow to write and hard to type into a search box. When you type a search pattern into a text editor, or validate an email address in a web form, you use a much shorter notation: a **regular expression**. In a regular expression, $(0 \cup 1)^*01$ says "anything, followed by 01" in eight characters. Regular expressions are an algebra for languages, the way ordinary algebra is a notation for numbers.

### Imagine describing house numbers
Imagine telling a friend which house numbers on a street are valid: "a nonzero digit, followed by any number of digits, optionally followed by a single letter". You built the description from three ideas: **choose** one of several options, **follow** one thing with another, and **repeat** something any number of times. Those three ideas, union, concatenation and star, are the whole of regular expressions.

### The definition
Regular expressions over an alphabet $\Sigma$ are built up from small pieces, and each one describes a language $L(R)$:

1. $\varnothing$ is a regular expression describing the empty language.
2. $\varepsilon$ is a regular expression describing $\{\varepsilon\}$.
3. Each symbol $a \in \Sigma$ is a regular expression describing $\{a\}$.
4. If $R_1$ and $R_2$ are regular expressions, so are $(R_1 \cup R_2)$, describing $L(R_1)\cup L(R_2)$; $(R_1R_2)$, describing the concatenation $L(R_1)L(R_2)$; and $(R_1^*)$, describing $L(R_1)^*$.

Nothing else is a regular expression. Many books write union as $+$ (so $0+1$) and programming languages write it as `|` (so `0|1`); they all mean the same thing. The interactive visual on this page accepts all three.

:::def Regular expression
An expression built from $\varnothing$, $\varepsilon$ and single symbols using union $\cup$, concatenation and Kleene star $^*$. It describes the language obtained by applying the corresponding set operations.
:::

### Precedence
Just as multiplication binds tighter than addition in $2 + 3 \times 4$, regular expressions have an order of operations: **star first, then concatenation, then union**. So $01^* \cup 1$ means $(0(1^*)) \cup 1$: a 0 followed by any number of 1s, or the single string 1. If you want "any number of copies of 01", you need brackets: $(01)^*$.

### Reading expressions
Let us read some examples over $\{0,1\}$, writing $\Sigma$ for $(0\cup1)$.

$0^*1^*$ is "some 0s, then some 1s": $\varepsilon, 0, 1, 00, 01, 11, 001, \dots$ but not $10$. Of length 3 there are exactly 4 such strings: $000, 001, 011, 111$. In general a length-$n$ string of this form is decided by where the 1s start, so there are $n+1$ of them.

$\Sigma^*01$ is "ends in 01". $\Sigma^*11\Sigma^*$ is "contains 11". $\Sigma^*1\Sigma\Sigma$ is "the 3rd symbol from the end is 1". $(\Sigma\Sigma)^*$ is "even length". And $1^*(01^*01^*)^*$ is "an even number of 0s": the 0s come in pairs, each pair possibly separated and followed by 1s.

### Writing expressions
To write a regular expression for a language, describe its strings as a pattern of choices, sequences and repetitions. "Strings that start and end with the same symbol" over $\{0,1\}$: either it is a single symbol, or it starts with 0 and ends with 0, or it starts with 1 and ends with 1. That gives
$$0 \cup 1 \cup 0\Sigma^*0 \cup 1\Sigma^*1.$$
"Strings with no two consecutive 1s": every 1 except possibly the last must be followed by a 0, so think in blocks of $0$ and $10$, with an optional 1 at the end: $(0 \cup 10)^*(\varepsilon \cup 1)$. Check $0101$: it is $0 \cdot 10 \cdot 1$, matching. Check $0110$: after the block $0$, the next block would have to start with $1$ and then need a $0$, but the next symbol is another 1. No match, as required.

### Useful identities
Regular expressions obey algebraic laws. Union is commutative and associative, and concatenation distributes over union: $R(S\cup T) = RS \cup RT$. The empty set and empty string behave like 0 and 1: $R \cup \varnothing = R$, $R\varepsilon = \varepsilon R = R$, and $R\varnothing = \varnothing$. For stars, $(R^*)^* = R^*$, $\varnothing^* = \varepsilon$, and $R^+ = RR^*$ (one or more copies). These laws let you simplify expressions, and they are the same facts about languages you met in the first lesson.

### Why regular expressions matter
Regular expressions are the human-friendly language; DFAs are the machine-friendly one. In the next lesson, **Kleene's theorem** shows that they describe exactly the same languages: every regular expression can be converted to an NFA (and then to a DFA), and every DFA can be converted back to a regular expression. So "regular language" can mean any of three equivalent things.

### Common mistakes
Watch precedence: $ab^*$ is not $(ab)^*$. Do not confuse $\varnothing$ and $\varepsilon$: $\varnothing$ matches nothing, while $\varepsilon$ matches only the empty string. Remember that $R^*$ always includes $\varepsilon$, so $0^*$ matches the empty string. Be careful with programming-language regexes: tools like Perl, Python and JavaScript add **backreferences** such as `(a*)b\1`, which can describe languages that are *not* regular. In this course, "regular expression" means only the three operations. Finally, when testing your expression, check both strings that should match and strings that should not; most wrong expressions accept too much.

### Summary
A regular expression is built from $\varnothing$, $\varepsilon$ and single symbols with union, concatenation and star, with star binding tightest and union loosest. Each expression describes a language. Read expressions by turning them into words ("some 0s then some 1s"), write them by breaking a language into choices, sequences and repetitions, and simplify them with algebraic identities. They describe exactly the regular languages.

@viz g11-automata mode=regex regex="0*1*" input="0011" | Type any regular expression over 0 and 1. The table lists every matching string up to length 5.

:::explore
**What to try**
1. With `0*1*`, check that the counts for lengths 0 to 5 are 1, 2, 3, 4, 5, 6.
2. Type `1*(01*01*)*` and confirm every listed string has an even number of 0s.
3. Compare `01*` with `(01)*`, and `0+1*` with `(0+1)*`.
4. Type `(0+10)*(ε+1)` and test the strings $0101$ and $0110$ in the String box.

**What to notice:** the count for `0*1*` is $n+1$ at length $n$, as argued in the article. The pairs in step 3 show precedence: star binds before concatenation and union, so brackets change the language completely. Step 4 confirms the "no two consecutive 1s" expression: $0101$ matches and $0110$ does not.
:::

:::formulas
$$L(R_1\cup R_2) = L(R_1)\cup L(R_2), \quad L(R_1R_2) = L(R_1)L(R_2), \quad L(R^*) = L(R)^*$$
$$\text{precedence: } {}^* \ > \ \text{concatenation} \ > \ \cup$$
$$R\cup\varnothing = R,\quad R\varepsilon = R,\quad R\varnothing = \varnothing,\quad \varnothing^* = \varepsilon,\quad (R^*)^* = R^*,\quad R^+ = RR^*$$
$$R(S\cup T) = RS\cup RT, \qquad (S\cup T)R = SR\cup TR$$
:::

:::thm Every finite language is regular
If $L = \{w_1, \dots, w_k\}$ is finite, then $R = w_1 \cup w_2 \cup \cdots \cup w_k$ is a regular expression for $L$ (with $R = \varnothing$ when $k = 0$).
:::

:::proof
Each string $w_i = a_1\cdots a_m$ is the concatenation of single-symbol expressions, which describes exactly $\{w_i\}$ (and $\varepsilon$ describes $\{\varepsilon\}$). The union of these $k$ expressions describes $\{w_1\}\cup\cdots\cup\{w_k\} = L$.
:::

:::steps Write a regular expression for binary strings of length at least 2 that start and end with the same symbol
1. Split by the first symbol: either it is 0 or it is 1.
2. If it starts with 0 it must also end with 0, with anything in between: $0\Sigma^*0$.
3. Similarly $1\Sigma^*1$.
4. Combine: $0(0\cup1)^*0 \ \cup\ 1(0\cup1)^*1$. (Add $0 \cup 1$ if single symbols should count.)
:::

:::steps How many strings of length 4 match $(0\cup1)^*1(0\cup1)$?
1. The pattern says the second-to-last symbol is 1, and the others are free.
2. Length 4 has positions 1 to 4; position 3 is fixed to 1.
3. Positions 1, 2 and 4 are free: $2^3 = 8$ strings.
:::

:::steps Simplify $(\varepsilon \cup 0)0^*\ \cup\ \varnothing 1$
1. $\varnothing 1 = \varnothing$, and $R\cup\varnothing = R$, so the second part vanishes.
2. $(\varepsilon\cup0)0^* = \varepsilon0^* \cup 00^* = 0^* \cup 0^+$.
3. Every string in $0^+$ is already in $0^*$, so the answer is $0^*$.
:::

:::mock Exam question
Give a regular expression for binary strings containing **exactly two** 1s, and list all such strings of length 4.
:::solution
Any number of 0s, a 1, any number of 0s, a 1, any number of 0s: $0^*10^*10^*$.
Length 4 strings with exactly two 1s: choose 2 of 4 positions, $\binom42 = 6$: $1100, 1010, 1001, 0110, 0101, 0011$.
:::
:::

:::cs
Regular expressions are everywhere in software: `grep` and text editors for search, form validation, log parsing, URL routing in web frameworks, and the token definitions of every programming language. Knowing that true regular expressions compile to DFAs explains why they can be matched in linear time, while engines with backreferences can take exponential time on unlucky inputs.
:::

:::ml
Data cleaning for ML relies heavily on regexes: stripping HTML, extracting numbers and dates, normalising whitespace, and **pre-tokenisation** in GPT-style tokenizers, which use a regular expression to split text into chunks before byte-pair encoding.
:::

:::real
A UK postcode, a phone number like `+44 20 7946 0958`, or a product code like `AB-1234` all have fixed shapes made of choices, sequences and repetitions. Websites check them with regular expressions before you can press Submit.
:::

:::quiz
? Which strings does $0^*1^*$ match?
- $10$
+ $0011$
- $0101$
> Some 0s and then some 1s. $10$ and $0101$ have a 0 after a 1.

? How many strings of length 3 match $0^*1^*$?
= 4
> $000, 001, 011, 111$: $n + 1 = 4$.

? In $01^* \cup 1$, which operation is applied first?
+ the star
- the concatenation
- the union
> Star binds tightest, then concatenation, then union.

? What language does $\varnothing^*$ describe?
- $\varnothing$
+ $\{\varepsilon\}$
- all strings
> Zero copies of anything is $\varepsilon$, and there is nothing else to glue.

? How many strings of length 5 match $(0\cup1)^*1$?
= 16
> The last symbol is fixed as 1; the other four are free: $2^4 = 16$.

? Which expression describes binary strings of even length?
- $(0\cup1)^*(0\cup1)$
+ $((0\cup1)(0\cup1))^*$
- $0^*1^*$
> Gluing any number of length-2 blocks gives exactly the even lengths, including 0.
:::
## Lesson: Kleene's theorem and closure properties {#kleene-theorem}
@summary: Regular expressions, DFAs and NFAs describe exactly the same languages; regular languages are closed under union, concatenation, star, complement and intersection.

### Three descriptions, one idea
We now have three ways to describe a language: a DFA, an NFA, and a regular expression. We already proved that DFAs and NFAs are equally powerful. **Kleene's theorem**, proved by Stephen Kleene in 1956, closes the circle: a language can be described by a regular expression if and only if some finite automaton recognises it. This is a little like learning that a map, a list of directions, and a GPS route all describe the same journey. Each is convenient for something different, and you can always translate between them.

### Why we care
The theorem is practical. People like writing regular expressions, because they are short. Computers like running DFAs, because they are fast. Kleene's theorem guarantees that every expression a person writes can be compiled into a machine, and that every machine can be described back as an expression. It also gives us powerful **closure properties**: ways of combining regular languages that always produce regular languages.

:::def Kleene's theorem
A language is regular (recognised by some DFA or NFA) if and only if it is described by some regular expression.
:::

### Direction 1: regular expression to NFA
We build an NFA by following the structure of the expression, one piece at a time. This is called **Thompson's construction**. For the base cases: $\varnothing$ is an NFA with one non-accepting start state and no arrows; $\varepsilon$ is a single state that is both start and accepting; a symbol $a$ is two states with one arrow labelled $a$ from the start to the accepting state.

For the three operations, assume we already have NFAs $N_1$ and $N_2$.

- **Union** $R_1 \cup R_2$: add a new start state with ε-arrows to the start states of $N_1$ and $N_2$. The machine guesses which branch to follow.
- **Concatenation** $R_1R_2$: add ε-arrows from every accepting state of $N_1$ to the start of $N_2$, and make only $N_2$'s accepting states accept. The machine guesses where the first part ends.
- **Star** $R_1^*$: add a new start state that is also accepting (so $\varepsilon$ is accepted), with an ε-arrow to $N_1$'s start, and ε-arrows from $N_1$'s accepting states back to $N_1$'s start, so the machine can go round again.

Each step is small, and the NFA grows by only a constant number of states per symbol or operator. Let us count for $(0\cup1)^*01$ with these rules. The NFAs for $0$ and $1$ have 2 states each; their union adds one start state, giving 5; the star adds one more, giving 6; the final $0$ and $1$ add 2 states each, giving $6 + 2 + 2 = 10$ states. The result is bigger than the 3-state NFA you would design by hand, but it is produced mechanically, and that is the point.

@fig g11-automata mode=nfa machine="ends in 01" input="1101" | A hand-made 3-state NFA for (0∪1)*01. Thompson's construction gives a larger but equivalent machine.

### Direction 2: DFA to regular expression
The reverse direction uses **state elimination**. First turn the DFA into a *generalised* NFA, where arrows may be labelled by regular expressions instead of single symbols. Add a new start state with an ε-arrow to the old start, and a new single accepting state with ε-arrows from every old accepting state. Then remove the original states one at a time. When you remove a state $q$ that has an incoming arrow from $p$ labelled $R_1$, a self-loop labelled $R_2$, and an outgoing arrow to $r$ labelled $R_3$, you replace the path $p \to q \to r$ by a direct arrow
$$p \xrightarrow{R_1R_2^*R_3} r,$$
combining it with union if an arrow from $p$ to $r$ already existed. When only the new start and the new accepting state are left, the label on the arrow between them is the answer.

Here is a small example. The DFA for "even number of 1s" has states $A$ (start, accepting) and $B$, with $A \xrightarrow0 A$, $A \xrightarrow1 B$, $B \xrightarrow0 B$, $B\xrightarrow1 A$. Eliminate $B$: there is a path $A \xrightarrow{1} B \xrightarrow{1} A$ and $B$ has a self-loop labelled $0$, so we get a new loop on $A$ labelled $10^*1$. Combined with the existing loop, $A$ now loops on $0 \cup 10^*1$. Eliminating $A$ between the new start and the new accepting state gives the regular expression
$$(0 \cup 10^*1)^*.$$
Read it aloud: repeatedly, either a 0, or a 1 followed by some 0s and another 1. The 1s come in pairs, so their number is even.

### Closure properties
A class of languages is **closed** under an operation if applying the operation to members of the class always gives a member. Regular languages are closed under many operations, and Kleene's theorem lets us prove it in whichever description is easiest.

**Union, concatenation and star** are immediate from regular expressions: if $L_1 = L(R_1)$ and $L_2 = L(R_2)$ then $R_1\cup R_2$, $R_1R_2$ and $R_1^*$ describe the results.

**Complement** is easy with a DFA: swap accepting and non-accepting states. Every string ends in exactly one state, so it is now accepted exactly when it was rejected before. (This needs a *complete DFA* with a dead state; swapping on an NFA does not work.)

**Intersection** follows from De Morgan's law, $L_1\cap L_2 = \overline{\overline{L_1}\cup\overline{L_2}}$, or directly with the **product construction**: run both DFAs at once, using pairs of states $(p, q)$, and accept when both components accept. Two DFAs with 2 and 3 states give a product with $2\times3 = 6$ states. **Reversal** is also regular: reverse every arrow of an NFA and swap the roles of start and accepting states.

### Common mistakes
Do not complement an NFA by swapping states: an NFA rejects only when *every* path rejects, so swapping does not flip its answers. Do not forget the dead state when complementing a DFA with missing arrows. When eliminating states, remember to handle *every* pair of incoming and outgoing arrows, including loops on the remaining states. And note that the expression you get from elimination depends on the order you remove states; different orders give different-looking but equivalent expressions.

### Summary
Kleene's theorem says regular expressions and finite automata describe exactly the same languages. Thompson's construction turns an expression into an ε-NFA piece by piece, and state elimination turns a DFA back into an expression using the rule $R_1R_2^*R_3$. As a result, regular languages are closed under union, concatenation, star, complement, intersection and reversal, which gives us a toolkit for building complicated regular languages from simple ones.

@viz g11-automata mode=regex regex="(0+10*1)*" input="1001" | The expression obtained by state elimination. Every listed string should have an even number of 1s.

:::explore
**What to try**
1. Scan the listed strings and count the 1s in each: are they all even?
2. Compare the counts per length with $2^{n-1}$ (half of all strings of length $n \ge 1$).
3. Edit the expression to `(1+01*0)*` and decide which DFA it came from.
4. Type `1001` and `1011` in the String box.

**What to notice:** every match has an even number of 1s, and for $n \ge 1$ exactly half of the $2^n$ strings match, because flipping the last bit changes the parity. The expression in step 3 is the same idea with the roles of 0 and 1 swapped: an even number of 0s. $1001$ matches and $1011$ does not, exactly as the DFA in the article would decide.
:::

@viz dfa machine="even # of 1s" | The DFA we eliminated. Feed it the same strings and compare with the regular expression.

:::explore
**What to try**
1. Type `1001`, then `1011`.
2. Find the path $A \to B \to \cdots \to A$ that the expression $10^*1$ describes.

**What to notice:** each return to the start state corresponds to one round of the star in $(0\cup10^*1)^*$: either a single 0 loop, or a trip out on a 1, some 0 loops at the other state, and back on a 1.
:::

:::formulas
$$\text{state elimination: } p \xrightarrow{R_1} q \xrightarrow{R_2 \text{ (loop)}} q \xrightarrow{R_3} r \ \leadsto\ p \xrightarrow{R_1R_2^*R_3 \,\cup\, R_4} r$$
$$\text{complement: } F' = Q\setminus F \quad(\text{complete DFA})$$
$$\text{product: } Q = Q_1\times Q_2,\ \ \delta((p,q),a) = (\delta_1(p,a),\delta_2(q,a)),\ \ F = F_1\times F_2$$
$$L_1\cap L_2 = \overline{\overline{L_1}\cup\overline{L_2}}$$
:::

:::thm Kleene's theorem
For every regular expression $R$ there is an NFA $N$ with $L(N) = L(R)$, and for every DFA $D$ there is a regular expression $R$ with $L(R) = L(D)$.
:::

:::proof
($R \Rightarrow N$) Induction on the structure of $R$. The base cases $\varnothing$, $\varepsilon$, $a$ have the small NFAs described in the article. If $N_1, N_2$ recognise $L(R_1), L(R_2)$, the union, concatenation and star constructions recognise $L(R_1)\cup L(R_2)$, $L(R_1)L(R_2)$ and $L(R_1)^*$: an accepting path of the new machine is exactly an accepting path of one machine (union), an accepting path of $N_1$ followed by one of $N_2$ (concatenation), or zero or more accepting paths of $N_1$ joined end to end (star).

($D \Rightarrow R$) Convert $D$ to a generalised NFA with a fresh start and a fresh single accepting state. Eliminating a state $q$ with the rule $R_1R_2^*R_3$ preserves the language: any path through $q$ enters on $R_1$, loops some number of times on $R_2$, and leaves on $R_3$. After all original states are gone, one arrow remains, and its label describes exactly the strings on accepting paths of $D$.
:::

:::thm Closure of regular languages
If $L_1$ and $L_2$ are regular, so are $L_1\cup L_2$, $L_1L_2$, $L_1^*$, $\overline{L_1}$, $L_1\cap L_2$ and $L_1^R$.
:::

:::steps Build the product DFA for "even number of 0s AND ends in 1"
1. DFA 1 tracks the parity of 0s: states $E, O$ (start $E$, accept $E$).
2. DFA 2 tracks the last symbol: states $N$ ("not ending in 1", start) and $Y$ ("ends in 1", accept).
3. Product states: $(E,N), (E,Y), (O,N), (O,Y)$, so $2 \times 2 = 4$ states.
4. On 0: parity flips and the second component goes to $N$. On 1: parity stays and the second component goes to $Y$.
5. Accepting: only $(E, Y)$. Check $011$: $(E,N)\xrightarrow0(O,N)\xrightarrow1(O,Y)\xrightarrow1(O,Y)$, reject (one 0). Check $0011$: ends in $(E,Y)$, accept.
:::

:::steps Count Thompson's construction states for $(ab\cup b)^*$
1. $a$, $b$, $b$: 2 states each, 6 in total.
2. Concatenation $ab$ joins two NFAs with an ε-arrow, adding no states: 4 states.
3. Union with $b$ adds a new start: $4 + 2 + 1 = 7$.
4. Star adds a new accepting start: $8$ states.
:::

:::mock Exam question
A DFA over $\{a,b\}$ has states $1$ (start) and $2$ (accepting), with $1\xrightarrow{a}2$, $1\xrightarrow{b}1$, $2\xrightarrow{a}2$, $2\xrightarrow{b}1$. Use state elimination to find a regular expression for its language, and describe the language in words.
:::solution
Add new start $s \xrightarrow\varepsilon 1$ and new accept $2 \xrightarrow\varepsilon f$.
Eliminate state 2: it is entered from 1 on $a$, loops on $a$, and leaves to 1 on $b$ and to $f$ on $\varepsilon$. New arrows: $1 \xrightarrow{aa^*b} 1$ (combined with the loop $b$: $1$ loops on $b\cup aa^*b$) and $1\xrightarrow{aa^*} f$.
Eliminate state 1: $s \xrightarrow{(b\cup aa^*b)^*aa^*} f$.
Answer: $(b\cup aa^*b)^*aa^*$, which is the set of strings ending in $a$. (Equivalently $(a\cup b)^*a$.)
:::
:::

:::cs
Compilers and search tools use both directions of Kleene's theorem: Thompson's construction compiles patterns to NFAs (as in RE2 and many `grep` implementations), and closure under intersection and complement lets model checkers combine "the system's behaviour" with "the bad behaviours" and check whether the intersection is empty.
:::

:::ml
Weighted finite-state transducers, built using the same union, concatenation, star and product constructions, were the backbone of classical speech recognition: separate automata for pronunciations, words and grammar were composed into one large machine and searched for the best path.
:::

:::real
A spam filter rule like "subject contains *free* AND body does not contain *unsubscribe*" combines regular languages using intersection and complement. Closure properties guarantee that the combined rule can still be checked by a single fast automaton.
:::

:::quiz
? Kleene's theorem states that regular expressions describe exactly the languages recognised by...
+ finite automata
- pushdown automata
- Turing machines
> Regular expressions, DFAs and NFAs are three equivalent descriptions of the regular languages.

? In state elimination, a path $p\xrightarrow{a}q\xrightarrow{b\text{ loop}}q\xrightarrow{c}r$ becomes which label?
- $abc$
+ $ab^*c$
- $(abc)^*$
> Enter on $a$, loop any number of times on $b$, leave on $c$.

? The product of a 3-state DFA and a 4-state DFA has how many states?
= 12
> Pairs of states: $3 \times 4 = 12$.

? To complement a language using an automaton, you can swap accepting and non-accepting states of...
+ a complete DFA
- any NFA
- either, it does not matter
> In an NFA, swapping does not flip the answer, since acceptance means "some path accepts".

? Using the counting rules in the article (2 states per symbol, +1 for union, +1 for star, +0 for concatenation), how many states does Thompson's construction give for $a^*$?
= 3
> 2 for $a$, plus 1 new accepting start state for the star.

? If $L_1$ is regular and $L_2$ is regular, which of these is NOT guaranteed by the closure properties in this lesson?
- $L_1 \cap L_2$ is regular
- $\overline{L_1}$ is regular
+ every subset of $L_1$ is regular
> Subsets of regular languages can be non-regular: $\{0^n1^n\}$ is a subset of the regular language $0^*1^*$.
:::

## Lesson: The pumping lemma for regular languages {#pumping-lemma-regular}
@summary: Every long enough string in a regular language contains a loop that can be repeated; this proves languages like 0ⁿ1ⁿ are not regular.

### Some things a finite machine cannot do
DFAs are powerful, but they have a strict limit: a fixed, finite number of states. Think of a bouncer who must check that the number of people who have entered a club equals the number who have left, but who can only remember one of five hand signals. After six people have come in, he has run out of signals and can no longer tell exactly how many are inside. A DFA trying to recognise $\{0^n1^n : n \ge 0\}$ (some 0s followed by *the same number* of 1s) is in the same position. It would need to count the 0s with no upper limit, and finite memory cannot do that.

The **pumping lemma** turns this intuition into a proof technique. It gives a property that every regular language must have. If a language lacks the property, it cannot be regular.

### The key observation: long paths must loop
Suppose a DFA has $p$ states, and you feed it a string $w$ of length at least $p$. While reading the first $p$ symbols, the machine visits $p+1$ states (counting the start). There are only $p$ different states, so by the **pigeonhole principle** some state appears twice. The part of the string read between the two visits takes the machine around a loop and back to the same state.

Call the part before the loop $x$, the loop itself $y$, and the rest $z$, so $w = xyz$. Because the machine is back in the same state after $xy$ as after $x$, it does not "know" whether it went around the loop. So it can go around the loop zero times, twice, or a hundred times, and still end in the same final state. If $w$ was accepted, so is $xz$, $xyyz$, $xyyyz$, and so on.

For instance, the 3-state DFA for "binary number divisible by 3" reads $110$ (six) through remainders $0 \to 1 \to 0 \to 0$. Remainder $0$ repeats after reading $11$, so $x = \varepsilon$, $y = 11$, $z = 0$. Pumping gives $0$ (zero), $11110$ (thirty) and $1111110$ (one hundred and twenty-six), all divisible by 3.

:::def Pumping length
For a regular language $L$, a number $p$ such that every string in $L$ of length at least $p$ can be pumped. If a DFA for $L$ has $p$ states, $p$ works.
:::

### The statement
**Pumping lemma.** If $L$ is regular, there is a number $p \ge 1$ such that every string $w\in L$ with $|w| \ge p$ can be split as $w = xyz$ where

1. $|y| > 0$ (the loop is not empty),
2. $|xy| \le p$ (the loop happens within the first $p$ symbols),
3. $xy^iz \in L$ for every $i \ge 0$.

Condition 2 comes from where we found the loop: in the first $p$ symbols. It is the condition that makes most proofs work.

:::def Pumping lemma (regular)
If $L$ is regular then there exists $p$ such that every $w \in L$ with $|w|\ge p$ splits as $w = xyz$ with $|y|>0$, $|xy|\le p$, and $xy^iz\in L$ for all $i\ge0$.
:::

### Using it: a game against an opponent
To prove a language $L$ is **not** regular, we argue by contradiction, and it helps to think of it as a game.

1. Assume $L$ is regular. Then the opponent hands you some pumping length $p$. You do not get to choose $p$.
2. **You** choose a string $w \in L$ with $|w| \ge p$, cleverly, in terms of $p$.
3. The opponent chooses any split $w = xyz$ obeying $|y| > 0$ and $|xy| \le p$. You must handle every possible split.
4. **You** choose an $i$ so that $xy^iz \notin L$. That contradicts the lemma.

### Example: $0^n1^n$ is not regular
Assume it is regular with pumping length $p$. Choose $w = 0^p1^p$, which is in the language and has length $2p \ge p$. Any split has $|xy| \le p$, and the first $p$ symbols of $w$ are all 0s, so $y$ consists only of 0s: say $y = 0^k$ with $k \ge 1$. Pump with $i = 2$: $xy^2z = 0^{p+k}1^p$. It has more 0s than 1s, so it is not in the language. Contradiction, so $\{0^n1^n\}$ is not regular. With concrete numbers: if $p = 4$, then $w = 00001111$; whatever split is chosen, $y$ is one to four 0s, and pumping gives something like $000001111$, which is unbalanced.

### Example: perfect squares
Let $L = \{1^{n^2} : n\ge0\}$, strings of 1s whose length is a perfect square. Choose $w = 1^{p^2}$. Any split has $1 \le |y| \le p$. Pumping with $i = 2$ gives length $p^2 + |y|$, and
$$p^2 < p^2 + |y| \le p^2 + p < p^2 + 2p + 1 = (p+1)^2.$$
The new length lies strictly between two consecutive squares, so it is not a square. Contradiction again.

### Combining with closure properties
Sometimes it is easier to use closure. The language $L$ of binary strings with equally many 0s and 1s is not regular: if it were, then $L\cap 0^*1^*$ would be regular too (intersection of regular languages), but $L \cap 0^*1^* = \{0^n1^n\}$, which we just showed is not regular.

### Common mistakes
The pumping lemma is a **one-way** statement: every regular language satisfies it, but some non-regular languages satisfy it too. So you can use it only to prove a language is **not** regular, never to prove that it is. You cannot choose $p$ or the split; you must defeat every split. Choose $w$ so that the condition $|xy|\le p$ pins down what $y$ looks like; a careless choice like $w = 0^{p/2}1^{p/2}$ lets $y$ contain 1s and makes the argument messy. Remember that $i = 0$ (deleting $y$) is allowed and is sometimes the winning move. And to show a language *is* regular, just build a DFA, NFA or regular expression for it.

### Summary
Because a DFA has finitely many states, any accepted string of length at least $p$ (the number of states) drives the machine around a loop within its first $p$ symbols. Repeating or deleting the loop keeps the string in the language. To prove a language is not regular, assume a pumping length $p$, choose a clever string of length at least $p$, show that every legal split can be pumped out of the language, and conclude by contradiction. Closure properties can reduce new problems to known non-regular languages.

@viz g11-automata mode=pump machine="binary number divisible by 3" input="110" | The DFA has p = 3 states. The path of states shows where a state repeats; that loop is y.

:::explore
**What to try**
1. With input `110`, find the repeated state and read off $x$, $y$, $z$.
2. Move the "pump i" slider from 0 to 4 and check that each pumped string is divisible by 3.
3. Type `1001` (nine) and `10010` (eighteen) and find their loops.
4. Switch to the DFA "contains 11" and pump a string such as `0110`.

**What to notice:** the repeated state always appears within the first $p = 3$ symbols, which is condition $|xy|\le p$. Pumping never changes the answer: the machine ends in the same state whatever $i$ is, exactly as the proof argues. This is why the pumping lemma holds for *every* regular language, and why a language whose strings cannot all be pumped has no DFA.
:::

:::formulas
$$L \text{ regular} \Rightarrow \exists p\ \forall w\in L,\ |w|\ge p:\ \exists\, w = xyz,\ |y|>0,\ |xy|\le p,\ \forall i\ge 0:\ xy^iz\in L$$
$$p \le \text{number of states of any DFA for } L$$
$$\text{reading } p \text{ symbols visits } p+1 \text{ states} \Rightarrow \text{a repeat (pigeonhole)}$$
:::

:::thm Pumping lemma for regular languages
Every regular language $L$ has a pumping length $p$ as in the statement above.
:::

:::proof
Let $D$ be a DFA for $L$ with $p$ states, and let $w = w_1\cdots w_n\in L$ with $n\ge p$. Let $r_0, r_1, \dots, r_p$ be the states after reading $0, 1, \dots, p$ symbols. These are $p+1$ states from a set of size $p$, so $r_j = r_k$ for some $0 \le j < k \le p$. Let $x = w_1\cdots w_j$, $y = w_{j+1}\cdots w_k$ and $z$ the rest. Then $|y| = k - j > 0$ and $|xy| = k \le p$. Reading $y$ from state $r_j$ returns to $r_j$, so reading $y^i$ also returns to $r_j$ for any $i \ge 0$. Hence $xy^iz$ ends in the same state as $w$, which is accepting.
:::

:::thm Some languages are not regular
$\{0^n1^n : n\ge 0\}$, $\{1^{n^2}: n\ge0\}$, $\{ww : w\in\{0,1\}^*\}$, and the set of binary strings with equally many 0s and 1s are not regular.
:::

:::steps Prove $L = \{ww : w \in \{0,1\}^*\}$ is not regular
1. Assume $L$ is regular with pumping length $p$.
2. Choose $w = 0^p1\,0^p1$, which is $uu$ with $u = 0^p1$, so $w \in L$, and $|w| = 2p+2 \ge p$.
3. Since $|xy|\le p$, $y$ lies in the first block of 0s: $y = 0^k$, $k\ge1$.
4. Pump $i = 2$: $0^{p+k}1\,0^p1$. Its length is $2p + 2 + k$. If $k$ is odd it cannot be $uu$. If $k$ is even, the first half is $0^{p + k/2}$, which contains no 1, while the second half ends in 1, so the halves differ.
5. Either way $xy^2z \notin L$, a contradiction.
:::

:::steps Prove $\{0^i1^j : i > j\}$ is not regular, using $i = 0$
1. Assume pumping length $p$, and choose $w = 0^{p+1}1^p$.
2. $|xy|\le p$ forces $y = 0^k$ with $1 \le k \le p$.
3. Pumping up only adds 0s, which keeps $i > j$: no contradiction there.
4. Pump **down**, $i = 0$: $0^{p+1-k}1^p$ has at most $p$ zeros and $p$ ones, so $i \le j$. Not in $L$. Contradiction.
:::

:::mock Exam question
Use the pumping lemma to show that the language of balanced parentheses (strings over $\{(,)\}$ in which brackets match correctly) is not regular. Then explain why the language $(()^*)$, i.e. the strings in $L\big((\,(\,)\,)^*\big)$, *is* regular.
:::solution
Assume the balanced language is regular with pumping length $p$. Choose $w = (^p)^p$, which is balanced and of length $2p$. Since $|xy| \le p$, $y = (^k$ with $k \ge 1$. Pumping with $i = 2$ gives $(^{p+k})^p$, which has more opening than closing brackets, so it is not balanced. Contradiction.
The second language consists only of repetitions of the fixed block $()$; it is described by a regular expression, so it is regular. (It is a regular *subset* of the balanced strings; the non-regularity comes from unbounded nesting depth.)
:::
:::

:::cs
The pumping lemma explains why you cannot write a true regular expression that checks balanced brackets, matching HTML tags or nested comments. Parsers for programming languages therefore use context-free grammars (next unit), while regular expressions handle only the flat tokens.
:::

:::ml
Recurrent neural networks with finite precision behave like finite-state machines, and research on formal languages and neural networks uses languages such as $a^nb^n$ and Dyck (bracket) languages as test cases precisely because they are non-regular and require counting or a stack.
:::

:::real
A turnstile that only remembers "locked" or "unlocked" cannot report whether exactly as many people left a stadium as entered. Any device with fixed finite memory has the same limit, which is the everyday content of the pumping lemma.
:::

:::quiz
? A DFA for $L$ has 7 states. What pumping length does the proof give?
= 7
> The proof uses $p$ equal to the number of states.

? The pumping lemma can be used to prove that a language is...
+ not regular
- regular
- both, depending on the language
> Some non-regular languages also satisfy the pumping conditions, so it only works in one direction.

? In the proof that $0^n1^n$ is not regular with $w = 0^p1^p$, what does $y$ consist of?
+ only 0s
- only 1s
- some 0s and some 1s
> $|xy| \le p$ and the first $p$ symbols are all 0s.

? With $p = 5$ and $w = 0^51^5$, suppose $y = 00$. How many 0s does $xy^0z$ have?
= 3
> Deleting $y$ removes two 0s: $5 - 2 = 3$.

? In the perfect-squares proof with $p = 4$, $|y|$ is at most 4. What is the largest possible length of $xy^2z$?
= 20
> $p^2 + |y| \le 16 + 4 = 20$, which is less than $25 = 5^2$.

? Which choice of $i$ is allowed in the pumping lemma?
- only $i \ge 2$
- only $i = 1$
+ any $i \ge 0$, including $i = 0$
> Pumping down ($i = 0$) is allowed and sometimes needed.
:::
## Lesson: DFA minimization and the Myhill-Nerode theorem {#dfa-minimization}
@summary: Merge states that can never be told apart to get the unique smallest DFA, and use distinguishable strings to count the states any DFA needs.

### Why fewer states?
The subset construction and the product construction are mechanical, and mechanical methods often produce machines with more states than necessary. A DFA used in a network router or a lexer is stored as a table with one row per state, so a smaller machine means less memory and better use of the processor cache. There is a beautiful fact here: for every regular language there is a **unique smallest DFA**, and there is a simple algorithm to find it. Minimisation also answers a theoretical question: how much memory does a language *really* need?

### Imagine two receptionists
Imagine two receptionists at the same hotel who follow different rule books. One writes notes in blue ink and one in black. If every possible future conversation with a guest ends with the same answer from both, then as far as the guests can tell, they are the same receptionist; the colour of the ink is irrelevant. States of a DFA are the same. Two states that give the same accept or reject answer for **every possible remaining input** are indistinguishable, and we can merge them without changing the language.

### Equivalent and distinguishable states
Two states $p$ and $q$ of a DFA are **equivalent**, written $p \equiv q$, if for every string $z$, reading $z$ from $p$ ends in an accepting state exactly when reading $z$ from $q$ does. If some string $z$ makes one accept and the other reject, $z$ **distinguishes** them.

The empty string already distinguishes every accepting state from every non-accepting state. Longer strings find subtler differences. If $p$ and $q$ both move on symbol $a$ to states that are distinguished by $z$, then $az$ distinguishes $p$ and $q$. This "push back one symbol" rule is the whole algorithm.

:::def Equivalent states
States $p, q$ of a DFA are equivalent if for every string $z$, $\hat\delta(p,z) \in F \iff \hat\delta(q,z)\in F$. Otherwise some string $z$ distinguishes them.
:::

:::def Minimal DFA
A DFA for $L$ with the fewest possible states. It is unique up to renaming of states.
:::

### The algorithm: partition refinement
First delete **unreachable** states, ones that no input can ever reach from the start. They can never affect the answer. Then refine a partition of the remaining states into groups:

1. Start with two groups: accepting and non-accepting states.
2. For each group, look at where each state goes on each symbol, and record which *group* it lands in. If two states in the same group land in different groups on some symbol, split them.
3. Repeat step 2 until a round produces no split.
4. Each final group becomes one state of the minimal DFA.

This is often called **Moore's algorithm**; an equivalent pencil-and-paper version is the **table-filling algorithm**, where you mark pairs of states as distinguishable, starting from (accepting, non-accepting) pairs and repeatedly marking $(p, q)$ if some symbol takes them to a marked pair.

### A worked run
Take the 7-state DFA used in the visual below, over $\{0,1\}$, with accepting states $A, B$:

$A$: 0 to $B$, 1 to $C$. $B$: 0 to $A$, 1 to $D$. $C$: 0 to $C$, 1 to $E$. $D$: 0 to $C$, 1 to $F$. $E$: 0 to $F$, 1 to $A$. $F$: 0 to $E$, 1 to $B$. $G$ loops to itself on both symbols, and nothing points to $G$.

Step 0: $G$ is unreachable, so delete it. Six states remain.

Round 1: the groups are $\{A, B\}$ (accepting) and $\{C, D, E, F\}$. Look at the non-accepting group on symbol 1: $C \to E$ and $D \to F$ stay in the non-accepting group, but $E \to A$ and $F \to B$ land in the accepting group. So split into $\{C, D\}$ and $\{E, F\}$. The pair $A, B$ behaves the same: on 0 both stay in $\{A, B\}$, on 1 both go to the non-accepting group.

Round 2: the groups are $\{A, B\}$, $\{C, D\}$, $\{E, F\}$. Check: $A$ and $B$ go on 0 to $\{A,B\}$ and on 1 to $\{C,D\}$. $C$ and $D$ go on 0 to $\{C,D\}$ and on 1 to $\{E,F\}$. $E$ and $F$ go on 0 to $\{E,F\}$ and on 1 to $\{A,B\}$. No splits, so we stop.

The minimal DFA has **3 states**. Reading the groups as meanings, they track the number of 1s modulo 3: $\{A,B\}$ is remainder 0, $\{C,D\}$ remainder 1, $\{E,F\}$ remainder 2. The original machine was wastefully also remembering whether the number of 0s was odd or even, information that never affected the answer.

### The Myhill-Nerode theorem
Minimisation has a machine-free version. For a language $L$, call two strings $x$ and $y$ **indistinguishable by $L$**, written $x \equiv_L y$, if for every string $z$, $xz \in L$ exactly when $yz\in L$. This is an equivalence relation on strings, and its classes are the "things a machine must remember".

The **Myhill-Nerode theorem** says: $L$ is regular if and only if $\equiv_L$ has finitely many classes, and in that case the number of classes equals the number of states of the minimal DFA.

It has two great uses. First, **lower bounds**: if you find $k$ strings that are pairwise distinguishable, every DFA for $L$ needs at least $k$ states. For "ends in 01", the strings $\varepsilon$, $0$, $01$ are pairwise distinguishable (append $1$ to separate $\varepsilon$ from $0$; $01$ is in the language and the others are not), so 3 states are necessary, and the 3-state DFA is minimal. Second, **non-regularity**: for $\{0^n1^n\}$, the strings $0^i$ and $0^j$ with $i\ne j$ are distinguished by $z = 1^i$. That gives infinitely many classes, so the language is not regular. This argument is often cleaner than the pumping lemma.

### Common mistakes
Do not forget to remove unreachable states first: they can survive partition refinement as an extra group. Keep the dead state if there is one: a complete minimal DFA includes it. Do not stop after one round just because the first split looked final; you must do a full round with no change. When splitting, compare the **groups** that successors land in, not the successor states themselves: $A \to B$ and $B \to A$ are fine because $A$ and $B$ are in the same group. Finally, minimisation works on DFAs; minimising NFAs is a much harder problem with no efficient general algorithm known.

### Summary
Two DFA states are equivalent if no future input can tell them apart. Removing unreachable states and then refining the partition {accepting, non-accepting} until it is stable merges all equivalent states and produces the unique minimal DFA. The Myhill-Nerode theorem describes the same structure in terms of strings: the number of classes of $\equiv_L$ is the number of states the minimal DFA needs, and infinitely many classes means the language is not regular.

@viz g11-automata mode=minimize | A 7-state DFA with redundant and unreachable states. Press step to run one round of partition refinement.

:::explore
**What to try**
1. Before stepping, find the unreachable state.
2. Press step once and check that the first partition is {accepting} versus {non-accepting}.
3. Press step again and predict which group splits, using the article's round 1.
4. Keep stepping until nothing changes, and count the final groups.

**What to notice:** the state $G$ is removed first because no arrow reaches it. The non-accepting group splits because $E$ and $F$ jump to an accepting state on 1 while $C$ and $D$ do not. The refinement stabilises at three groups, matching the three classes "number of 1s mod 3". This is the Myhill-Nerode count for that language.
:::

:::formulas
$$p\equiv q \iff \forall z\in\Sigma^*:\ \big(\hat\delta(p,z)\in F \iff \hat\delta(q,z)\in F\big)$$
$$\text{split } p,q \text{ if } \exists a:\ [\delta(p,a)] \ne [\delta(q,a)]$$
$$x\equiv_L y \iff \forall z:\ (xz\in L\iff yz\in L)$$
$$\#\text{states of minimal DFA} = \text{number of classes of } \equiv_L$$
:::

:::thm Myhill-Nerode theorem
A language $L$ is regular if and only if $\equiv_L$ has finitely many equivalence classes. When it does, the minimal DFA for $L$ has exactly that many states, and it is unique up to renaming.
:::

:::proof
If a DFA $D$ with $k$ states recognises $L$, strings that lead to the same state are indistinguishable by $L$ (the same future happens from the same state), so $\equiv_L$ has at most $k$ classes. Conversely, if $\equiv_L$ has finitely many classes, build a DFA whose states are the classes $[x]$, with start $[\varepsilon]$, transitions $\delta([x],a) = [xa]$ and accepting states $\{[x] : x\in L\}$. This is well defined: if $x\equiv_L y$ then $xa \equiv_L ya$ (any $z$ distinguishing $xa$ and $ya$ would make $az$ distinguish $x$ and $y$), and $x\in L \iff y\in L$ (take $z = \varepsilon$). After reading $w$ it is in state $[w]$, so it accepts $L$. Its number of states equals the number of classes, which by the first part is the smallest possible.
:::

:::thm Partition refinement is correct
The refinement algorithm stops after at most $|Q|$ rounds, and two reachable states end in the same group exactly when they are equivalent.
:::

:::steps Minimise the DFA $1\xrightarrow{a}2, 1\xrightarrow b 3, 2 \xrightarrow{a,b} 4, 3 \xrightarrow{a,b} 4, 4\xrightarrow{a,b}4$ with accepting state 4
1. All states are reachable from start state 1.
2. Round 0: $\{4\}$ and $\{1, 2, 3\}$.
3. Round 1: on $a$, $1\to2$ (non-accepting group) but $2\to4$ and $3\to4$ (accepting group). Split: $\{1\}$, $\{2,3\}$, $\{4\}$.
4. Round 2: $2$ and $3$ both go to $\{4\}$ on both symbols. No split.
5. Minimal DFA: 3 states. The language is "length at least 2".
:::

:::steps Prove that any DFA for "contains 11" needs at least 3 states
1. Choose the strings $\varepsilon$, $1$, $11$.
2. $\varepsilon$ vs $1$: append $z = 1$. $1 \notin L$, $11\in L$. Distinguished.
3. $\varepsilon$ vs $11$: $z = \varepsilon$. Distinguished.
4. $1$ vs $11$: $z = \varepsilon$. Distinguished.
5. Three pairwise distinguishable strings means at least 3 states, and the 3-state DFA from the DFA lesson is minimal.
:::

:::mock Exam question
A DFA over $\{0,1\}$ has states $P$ (start), $Q$, $R$, $S$ with accepting states $R$ and $S$, and transitions $P\xrightarrow0 Q$, $P\xrightarrow1 R$, $Q\xrightarrow0 Q$, $Q\xrightarrow1 S$, $R\xrightarrow{0} Q$, $R\xrightarrow1 R$, $S\xrightarrow0 Q$, $S\xrightarrow1 S$. Minimise it and describe its language.
:::solution
All four states are reachable. Round 0: $\{R,S\}$ and $\{P,Q\}$.
Round 1: $P$: 0 to $Q$ (non-acc), 1 to $R$ (acc). $Q$: 0 to $Q$ (non-acc), 1 to $S$ (acc). Same pattern, no split. $R$: 0 to $Q$, 1 to $R$; $S$: 0 to $Q$, 1 to $S$. Same, no split.
Stable after one round: 2 states, $\{P,Q\}$ and $\{R,S\}$. The machine is in $\{R,S\}$ exactly when the last symbol was 1, so the language is "strings ending in 1".
:::
:::

:::cs
Lexer generators, regex engines and hardware designers minimise automata routinely: Hopcroft's refinement algorithm runs in $O(n\log n)$ time for $n$ states. In hardware, a smaller state machine means fewer flip-flops on the chip.
:::

:::ml
Myhill-Nerode classes are the theoretical basis of automata learning algorithms such as Angluin's $L^*$, which learns a minimal DFA by asking membership and equivalence queries, and which is used to extract interpretable automata from trained recurrent neural networks.
:::

:::real
A vending machine designed by two engineers might have separate states for "inserted a 5 then a 10" and "inserted a 10 then a 5". Since every future behaviour is identical (15 cents credited), the states can be merged. Minimisation finds every such merge automatically.
:::

:::quiz
? Which states should be removed before partition refinement?
+ unreachable states
- accepting states
- the dead state
> Unreachable states never affect the answer and can otherwise survive as an extra group.

? What does the first partition in Moore's algorithm separate?
- the start state from the rest
+ accepting from non-accepting states
- states with self-loops from the rest
> The empty string already distinguishes these.

? How many states does the minimal DFA have for the 7-state machine in this lesson?
= 3
> Remove $G$, then the groups $\{A,B\}, \{C,D\}, \{E,F\}$ remain.

? For the language "ends in 01", how many pairwise distinguishable strings did we find?
= 3
> $\varepsilon$, $0$, $01$, so at least 3 states are needed.

? For $L = \{0^n1^n\}$, which string distinguishes $0^2$ from $0^5$?
+ $11$
- $00$
- $\varepsilon$
> $0^211 \in L$ while $0^511\notin L$.

? A language whose relation $\equiv_L$ has infinitely many classes is...
- regular but with a large DFA
+ not regular
- always context-free
> By Myhill-Nerode, regular means finitely many classes.
:::
# Unit: Context-free languages

## Lesson: Context-free grammars {#context-free-grammars}
@summary: Rewriting rules that generate languages with nesting, such as balanced brackets and arithmetic, beyond the reach of finite automata.

### Beyond finite memory
The pumping lemma showed that finite automata cannot handle $\{0^n1^n\}$ or balanced brackets. Yet programming languages are full of nesting: brackets inside brackets, `if` statements inside loops inside functions. We need a description method that can express "every opening has a matching closing", at any depth. **Context-free grammars** do exactly that. Instead of describing a machine that reads strings, a grammar describes how to *generate* strings by repeatedly replacing symbols according to rules.

### Imagine building sentences
Think of how a child learns sentence patterns. A sentence is a noun phrase followed by a verb phrase. A noun phrase is "the" followed by a noun. A noun is "cat" or "dog". A verb phrase is a verb, or a verb followed by a noun phrase. From these few rules you can produce "the cat sees the dog", and with a rule like "a noun phrase can be a noun phrase followed by *who* and a verb phrase" you can produce sentences of unlimited length and nesting. Linguist Noam Chomsky formalised this idea in the 1950s, and it became the foundation of how compilers understand code.

### The definition
A context-free grammar (CFG) is a 4-tuple $G = (V, \Sigma, R, S)$ where

- $V$ is a finite set of **variables** (also called non-terminals), usually capital letters;
- $\Sigma$ is a finite set of **terminals**, the alphabet of the strings we generate, disjoint from $V$;
- $R$ is a finite set of **rules** (productions) of the form $A \to w$, with $A\in V$ and $w$ a string of variables and terminals (possibly $\varepsilon$);
- $S\in V$ is the **start variable**.

"Context-free" means the left side of each rule is a single variable: you may replace $A$ by $w$ wherever $A$ appears, regardless of its surroundings. We write several rules for the same variable on one line with a bar: $S \to 0S1 \mid \varepsilon$ means the two rules $S\to0S1$ and $S\to\varepsilon$.

:::def Context-free grammar
A 4-tuple $(V,\Sigma,R,S)$ of variables, terminals, rules of the form $A \to w$ with $A$ a single variable, and a start variable. Its language is the set of terminal strings derivable from $S$.
:::

### Derivations
To generate a string, start with $S$ and repeatedly pick a variable and replace it using one of its rules. Each replacement is a **derivation step**, written $\Rightarrow$; a sequence of zero or more steps is written $\Rightarrow^*$. When no variables remain, you have a string of terminals, and it is in the language.

With the grammar $S \to 0S1 \mid \varepsilon$:
$$S \Rightarrow 0S1 \Rightarrow 00S11 \Rightarrow 000S111 \Rightarrow 000111.$$
Each use of $S\to0S1$ adds one 0 on the left and one 1 on the right, so the counts always stay equal, and the final step $S\to\varepsilon$ removes the variable. The language is exactly $\{0^n1^n : n\ge0\}$, and deriving $0^n1^n$ takes $n + 1$ steps. So a non-regular language has a two-rule grammar.

:::def Derivation
A sequence $S \Rightarrow u_1 \Rightarrow u_2 \Rightarrow \cdots \Rightarrow w$ where each step replaces one variable by the right side of one of its rules. The language of $G$ is $L(G) = \{w\in\Sigma^* : S\Rightarrow^* w\}$.
:::

:::def Context-free language
A language generated by some context-free grammar.
:::

### More examples
**Balanced brackets.** $S \to (S)S \mid \varepsilon$. A balanced string is either empty, or an opening bracket, a balanced inside, its closing bracket, and then another balanced string. For example $S \Rightarrow (S)S \Rightarrow ()S \Rightarrow ()(S)S \Rightarrow ()()S \Rightarrow ()()$.

**Palindromes** over $\{0,1\}$: $S\to 0S0 \mid 1S1 \mid 0 \mid 1 \mid \varepsilon$. Each rule wraps the same symbol around both ends, building the string from the outside in. $S \Rightarrow 1S1 \Rightarrow 10S01\Rightarrow 10101$.

**Arithmetic expressions**: $E \to E + E \mid E \times E \mid (E) \mid a$, where $a$ stands for a number. It generates $a + a \times a$, $(a + a) \times a$, and so on.

**Equal numbers of $a$ and $b$**: $S\to aSbS \mid bSaS \mid \varepsilon$. Every string generated has equal counts, since each rule adds one $a$ and one $b$, and with more care one can show that every such string can be generated.

### Designing a grammar
A good strategy is to ask: how can a string in the language be **broken into smaller strings in the language**? That recursive structure becomes the rules. For $\{0^n1^{2n}\}$, each 0 on the left is matched with two 1s on the right, so $S \to 0S11 \mid \varepsilon$. For $\{0^i1^j : i \ne j\}$, split into "more 0s" and "more 1s": $S\to A\mid B$, where $A$ generates $0^i1^j$ with $i>j$ (one forced extra 0 plus a balanced middle, $A \to 0A \mid 0C$, $C\to 0C1\mid\varepsilon$) and $B$ is similar with extra 1s.

### Regular languages are context-free
Every regular language has a CFG. Given a DFA, make a variable $R_q$ for each state $q$, add a rule $R_q \to aR_{r}$ for each transition $q\xrightarrow{a} r$, and add $R_q\to\varepsilon$ for each accepting state $q$. A derivation then simulates a run of the DFA, one symbol per step. Such grammars, with at most one variable at the right-hand end, are called **right-linear**. Since $\{0^n1^n\}$ is context-free but not regular, the context-free languages are a strictly larger class.

### Closure properties
Context-free languages are closed under **union** (new start $S\to S_1\mid S_2$), **concatenation** ($S \to S_1S_2$) and **star** ($S\to SS_1\mid\varepsilon$). Unlike regular languages, they are **not** closed under intersection or complement; we will prove this after the context-free pumping lemma.

### Common mistakes
A string is in $L(G)$ only if it contains **no variables**; $0S1$ is a sentential form, not a member of the language. Forgetting the base rule (such as $S \to \varepsilon$) gives a grammar that never finishes. When checking a grammar, test both directions: everything it generates must be in the language, and everything in the language must be generable. A grammar like $S\to 0S1 \mid 01$ misses the empty string, which may or may not matter. Finally, "context-free" refers to the form of the rules, not to whether the language is simple.

### Summary
A context-free grammar generates strings by repeatedly replacing a single variable with the right side of one of its rules, starting from the start variable, until only terminals remain. Grammars can express nesting and matching, such as $\{0^n1^n\}$ with $S\to0S1\mid\varepsilon$ and balanced brackets with $S\to(S)S\mid\varepsilon$. Every regular language is context-free, and context-free languages are closed under union, concatenation and star.

@viz g11-pda machine="balanced ( )" input="(()())" | A preview of the next lessons: a machine with a stack checks the language of the grammar S → (S)S | ε.

:::explore
**What to try**
1. Step through `(()())` and watch the stack height after each symbol.
2. Try `())(` and find the exact symbol where it fails.
3. Derive `(()())` with the grammar $S\to(S)S\mid\varepsilon$ on paper, and compare the nesting of your derivation with the stack heights.

**What to notice:** the stack height is the number of brackets still waiting to be matched, which is the nesting depth of the grammar's derivation at that point. It is never negative and returns to zero at the end for balanced strings. A finite automaton cannot track an unbounded height, which is why we need grammars (and stacks) for this language.
:::

:::formulas
$$G = (V,\Sigma,R,S), \quad A \to w,\ A\in V,\ w\in(V\cup\Sigma)^*$$
$$L(G) = \{w\in\Sigma^* : S\Rightarrow^* w\}$$
$$S\to 0S1\mid\varepsilon:\ \ L = \{0^n1^n\},\quad 0^n1^n \text{ takes } n+1 \text{ steps}$$
$$\text{DFA} \to \text{CFG}: \ R_q \to aR_{\delta(q,a)},\ \ R_q\to\varepsilon \ (q\in F)$$
:::

:::thm Regular languages are context-free
Every regular language is generated by a right-linear context-free grammar, and $\{0^n1^n\}$ is context-free but not regular. So regular languages form a proper subclass of context-free languages.
:::

:::proof
Given a DFA $(Q,\Sigma,\delta,q_0,F)$, build the grammar described in the article with start variable $R_{q_0}$. By induction on $|w|$, $R_{q_0}\Rightarrow^* wR_q$ exactly when $\hat\delta(q_0,w) = q$. A terminal string $w$ is derived precisely by finishing with $R_q\to\varepsilon$ for an accepting $q$, i.e. when the DFA accepts $w$. The grammar $S\to0S1\mid\varepsilon$ generates the non-regular language $\{0^n1^n\}$: by induction each sentential form is $0^kS1^k$ or $0^k1^k$.
:::

:::thm Closure of context-free languages
If $L_1 = L(G_1)$ and $L_2 = L(G_2)$ with start variables $S_1, S_2$ (and disjoint variable sets), then $S\to S_1\mid S_2$, $S\to S_1S_2$ and $S\to SS_1\mid\varepsilon$ generate $L_1\cup L_2$, $L_1L_2$ and $L_1^*$.
:::

:::steps Derive $0011$ with $S\to0S1\mid\varepsilon$ and count the steps
1. $S\Rightarrow 0S1$ (rule 1).
2. $0S1\Rightarrow 00S11$ (rule 1).
3. $00S11\Rightarrow 0011$ (rule 2).
4. Three steps, matching $n + 1$ with $n = 2$.
:::

:::steps Write a grammar for $\{a^ib^jc^k : i = j\}$ (any number of $c$s)
1. Split the string into a matched part $a^ib^i$ and a free part $c^k$.
2. Matched part: $A\to aAb\mid\varepsilon$.
3. Free part: $C\to cC\mid\varepsilon$.
4. Combine: $S\to AC$. Check $aabbc$: $S\Rightarrow AC \Rightarrow aAbC\Rightarrow aaAbbC\Rightarrow aabbC \Rightarrow aabbcC\Rightarrow aabbc$.
:::

:::steps Convert the DFA for "even number of 1s" into a grammar
1. States $A$ (start, accepting) and $B$; transitions $A\xrightarrow0A$, $A\xrightarrow1B$, $B\xrightarrow0B$, $B\xrightarrow1A$.
2. Rules: $A\to 0A\mid 1B\mid\varepsilon$ and $B\to0B\mid1A$.
3. Derive $101$? $A\Rightarrow1B\Rightarrow10B\Rightarrow101A\Rightarrow101$. It has two 1s: accepted, as expected.
:::

:::mock Exam question
Give a context-free grammar for $L = \{0^n1^m : m \ge n \ge 0\}$ and use it to derive $0111$.
:::solution
Each 0 is matched with a 1, and extra 1s may be added at the end: $S\to 0S1\mid T$, $T\to 1T\mid\varepsilon$.
Derivation of $0111$: $S\Rightarrow0S1\Rightarrow0T1\Rightarrow01T1\Rightarrow011T1\Rightarrow0111$.
(Check correctness: every derived string is $0^n1^{n+k}$ with $k\ge0$, and every such string is derived by using $S\to0S1$ $n$ times and $T\to1T$ $k$ times.)
:::
:::

:::cs
The syntax of almost every programming language is specified by a context-free grammar, usually written in BNF or EBNF notation. Parser generators such as Yacc, Bison and ANTLR read the grammar and produce a parser automatically. JSON, SQL and HTML's nested structure are all defined this way.
:::

:::ml
Probabilistic context-free grammars attach a probability to each rule and were the standard model for statistical parsing in NLP. Today, grammar-constrained decoding forces a language model's output to be valid JSON or valid code by allowing only tokens that keep the output derivable from a grammar.
:::

:::real
A recipe can contain sub-recipes ("for the sauce, first make a roux"), which can contain their own steps. That nested structure is context-free: a recipe is a list of steps, and a step can itself be a recipe.
:::

:::quiz
? In a context-free grammar, the left side of every rule is...
+ a single variable
- a single terminal
- any string
> That is what "context-free" means: replace $A$ regardless of its surroundings.

? How many derivation steps does $S\to0S1\mid\varepsilon$ need to produce $0^41^4$?
= 5
> Four uses of $S\to 0S1$ and one of $S\to\varepsilon$.

? Which grammar generates balanced brackets?
- $S\to(S\mid)S\mid\varepsilon$
+ $S\to(S)S\mid\varepsilon$
- $S\to()S$
> Opening bracket, balanced inside, matching close, then more balanced brackets.

? Is $0S1$ a member of $L(G)$?
- yes
+ no, it still contains a variable
> Members of the language are terminal strings only.

? The grammar $S\to 0S11\mid\varepsilon$ generates $0^21^k$ for which $k$?
= 4
> Each 0 comes with two 1s.

? Every regular language is context-free. Is every context-free language regular?
- yes
+ no, for example $\{0^n1^n\}$
> It has a CFG but fails the pumping lemma for regular languages.
:::

## Lesson: Parse trees and ambiguity {#parse-trees-ambiguity}
@summary: Parse trees show the structure of a derivation; a grammar is ambiguous if some string has two different trees, which can give two different meanings.

### Structure, not just membership
Knowing that $2 + 3\times4$ belongs to the language of arithmetic expressions is not enough for a calculator. It also needs to know the **structure**: is it $2 + (3\times 4) = 14$ or $(2+3)\times4 = 20$? Grammars give structure through **parse trees**, and a grammar that allows two different structures for the same string is called **ambiguous**. Ambiguity is a real practical problem: it is the difference between a program doing what you meant and doing something else.

### Imagine a newspaper headline
Consider the headline "Scientists study whales from space". Are the scientists in space, or are the whales? The words are the same, but the sentence can be grouped in two ways, and the groupings have different meanings. Programming languages cannot afford that kind of confusion, so language designers write grammars in which every program has exactly one grouping.

### Parse trees
A **parse tree** for a derivation is a tree whose root is the start variable, whose internal nodes are variables, and whose leaves are terminals (or $\varepsilon$). Whenever a rule $A\to X_1X_2\cdots X_k$ is used, the node $A$ gets children $X_1, \dots, X_k$ in order. Reading the leaves from left to right gives the derived string, called the **yield** of the tree.

For the grammar $S\to0S1\mid\varepsilon$ and the string $0011$, the tree is a spine: $S$ has children $0, S, 1$, the middle $S$ again has children $0, S, 1$, and the innermost $S$ has the single child $\varepsilon$. Notice how the tree makes the matching visible: each 0 and the 1 that matches it are children of the same node.

:::def Parse tree
A tree whose root is the start variable, whose internal nodes are variables expanded by a rule (children = right side of the rule in order), and whose leaves read left to right give the derived string.
:::

### Many derivations, one tree
A single tree can come from several derivations, because the order in which you expand variables does not matter to the tree. For example, with $S\to AB$, $A\to a$, $B\to b$, you could expand $A$ first or $B$ first, but the tree is the same. To pick one canonical derivation per tree, we use the **leftmost derivation**, which always replaces the leftmost variable. Trees and leftmost derivations are in one-to-one correspondence.

:::def Leftmost derivation
A derivation in which every step replaces the leftmost variable of the current string.
:::

### Ambiguity
A grammar is **ambiguous** if some string in its language has **two or more different parse trees** (equivalently, two different leftmost derivations). Consider
$$E\to E+E \mid E\times E\mid a.$$
The string $a + a\times a$ has two trees. In the first, the root uses $E\to E+E$, and the right $E$ becomes $a\times a$: this means $a + (a\times a)$. In the second, the root uses $E\to E\times E$, and the left $E$ becomes $a + a$: this means $(a+a)\times a$. Put in numbers $2$, $3$, $4$: the first tree evaluates to $14$, the second to $20$.

Subtraction shows the same issue with only one operator. $8-4-2$ has trees $(8-4)-2 = 2$ and $8-(4-2) = 6$. Since everyone agrees the answer is $2$ (subtraction groups to the left), the second tree is "wrong", and a grammar that allows it is a bad grammar for arithmetic.

:::def Ambiguous grammar
A grammar in which some string has at least two different parse trees (equivalently, two different leftmost derivations).
:::

### How many trees?
With $E\to E+E\mid a$, a string with $n$ plus signs has as many trees as there are ways to fully bracket $n+1$ operands. For $n = 1$ there is 1 tree, for $n = 2$ there are 2, for $n = 3$ there are 5, and for $n = 4$ there are 14. These are the **Catalan numbers** $C_n = \frac{1}{n+1}\binom{2n}{n}$. So ambiguity can multiply quickly: a 10-operator expression has $C_{10} = 16{,}796$ trees.

### Removing ambiguity
We can usually rewrite the grammar to force the intended structure. The standard fix for arithmetic uses one variable per **precedence level**:
$$E\to E+T\mid T,\qquad T\to T\times F\mid F,\qquad F\to(E)\mid a.$$
Here $E$ is a sum of terms, $T$ is a product of factors, and $F$ is a number or a bracketed expression. Because a $+$ can only be introduced at the $E$ level, multiplication is always grouped first, giving $a + (a\times a)$. Because $E\to E+T$ has the recursion on the **left**, $a + a + a$ groups as $(a+a)+a$: left associativity. This grammar is unambiguous and generates the same strings as the ambiguous one.

### Inherent ambiguity and the dangling else
Some languages are **inherently ambiguous**: every grammar for them is ambiguous. The classic example is $\{a^ib^jc^k : i = j \text{ or } j = k\}$; strings like $a^nb^nc^n$ fit both conditions, and it can be proved that any grammar must produce them in two ways. A famous practical case is the **dangling else**: in `if A then if B then X else Y`, does the `else` belong to the inner or the outer `if`? Most languages resolve it by a rule, "an else belongs to the nearest unmatched if", built into the grammar or the parser. There is no general algorithm to decide whether a given CFG is ambiguous; we will see later in the course why such questions can be undecidable.

### Common mistakes
Two different derivations do not make a grammar ambiguous; two different **trees** (or two different *leftmost* derivations) do. Ambiguity is a property of the **grammar**, not the language, except in the special case of inherently ambiguous languages. When removing ambiguity, check that the new grammar still generates the same language. And do not confuse ambiguity with the language being complicated: $S\to SS\mid a$ generates the very simple language $a^+$ but is ambiguous.

### Summary
A parse tree records which rules were used and how the string is grouped; its leaves spell the string. Leftmost derivations correspond one-to-one with trees. A grammar is ambiguous if some string has two trees, and different trees can mean different things, as with $2 + 3\times4$ evaluating to 14 or 20. Precedence levels and left recursion give an unambiguous grammar for arithmetic, but some languages are inherently ambiguous, and ambiguity of a CFG cannot be decided in general.

@viz g11-pda view=tree | The ambiguous grammar E → E∘E | number. Compare the two parse trees of the same expression and their values.

:::explore
**What to try**
1. For `2 + 3 × 4`, switch between Tree 1 and Tree 2 and note both values.
2. Choose `8 − 4 − 2` and decide which tree matches the usual rule for subtraction.
3. Choose `16 ÷ 4 ÷ 2` and compute both values before looking.
4. Choose `2 × 3 + 4` and decide which tree the unambiguous grammar $E\to E+T\mid T$, $T\to T\times F\mid F$ would build.

**What to notice:** the leaves are the same in both trees, only the grouping differs, and the grouping changes the value: 14 or 20, 2 or 6, 2 or 8, 10 or 14. The tree that groups subtraction and division to the left is the conventional one. For `2 × 3 + 4` the unambiguous grammar forces the product to be grouped first, giving 10.
:::

:::formulas
$$\text{yield}(T) = \text{leaves of } T \text{ read left to right}$$
$$\text{ambiguous} \iff \exists w:\ w \text{ has} \ge 2 \text{ parse trees} \iff \ge 2 \text{ leftmost derivations}$$
$$\#\text{trees of } a{+}a{+}\cdots{+}a \ (n \text{ pluses}) = C_n = \tfrac{1}{n+1}\tbinom{2n}{n}$$
$$E\to E+T\mid T,\quad T\to T\times F\mid F,\quad F\to(E)\mid a$$
:::

:::thm Trees and leftmost derivations correspond
For a fixed grammar and terminal string $w$, there is a one-to-one correspondence between parse trees with yield $w$ and leftmost derivations of $w$.
:::

:::proof
Given a tree, produce a derivation by repeatedly expanding the leftmost unexpanded variable node using the rule recorded at that node; this is leftmost and determined by the tree. Given a leftmost derivation, build the tree by attaching children for each rule used, at the leftmost variable leaf; this is determined by the derivation. The two procedures undo each other, so the correspondence is a bijection.
:::

:::thm Inherent ambiguity exists
The language $\{a^ib^jc^k : i=j \text{ or } j=k\}$ is context-free, but every context-free grammar for it is ambiguous.
:::

:::steps Show that $S\to SS\mid a$ is ambiguous
1. Take the string $aaa$.
2. Tree 1: $S\to SS$, with the left $S\to SS\to aa$ and the right $S\to a$: grouping $(aa)a$.
3. Tree 2: $S\to SS$, with the left $S\to a$ and the right $S\to SS\to aa$: grouping $a(aa)$.
4. Two different trees for one string, so the grammar is ambiguous (though $L = a^+$ is simple).
:::

:::steps Give the leftmost derivation of $a + a\times a$ in the unambiguous grammar
1. $E\Rightarrow E + T$
2. $\Rightarrow T + T\Rightarrow F + T\Rightarrow a + T$
3. $\Rightarrow a + T\times F \Rightarrow a + F\times F\Rightarrow a + a\times F\Rightarrow a+a\times a$.
4. The $\times$ is created inside the right $T$, so the only tree means $a + (a\times a)$.
:::

:::steps Count the parse trees of $a+a+a+a$ in $E\to E+E\mid a$
1. There are $n = 3$ plus signs, so 4 operands.
2. The root's plus can be the 1st, 2nd or 3rd. If it is the 1st, the right side $a+a+a$ has $C_2 = 2$ trees; 2nd: $1\times1 = 1$; 3rd: $2$.
3. Total $2 + 1 + 2 = 5 = C_3$.
:::

:::mock Exam question
Consider the grammar $S\to aS\mid aSbS\mid\varepsilon$. Show that it is ambiguous by giving two different leftmost derivations of $aab$.
:::solution
Derivation 1: $S\Rightarrow aS\Rightarrow aaSbS\Rightarrow aabS\Rightarrow aab$. (The first $a$ uses $S\to aS$, the second $a$ is matched with $b$.)
Derivation 2: $S\Rightarrow aSbS\Rightarrow aaSbS\Rightarrow aabS\Rightarrow aab$. (The first $a$ is matched with $b$, and the inner $S\to aS$ produces the second $a$, followed by $S\to\varepsilon$.)
Let us check the second carefully: $aSbS\Rightarrow a(aS)bS = aaSbS$, then the leftmost $S\to\varepsilon$ gives $aabS$, then $S\to\varepsilon$ gives $aab$. The first steps differ ($S\to aS$ versus $S\to aSbS$), so the leftmost derivations, and hence the trees, are different. The grammar is ambiguous. (This is the grammar of the dangling-else problem, with $a$ = if and $b$ = else.)
:::
:::

:::cs
Compilers build a parse tree (or a compressed abstract syntax tree) for every program, and code generation walks it. Parser generators report "shift/reduce conflicts" when a grammar is ambiguous, and languages resolve cases like the dangling else and operator precedence with explicit rules.
:::

:::ml
In NLP, a sentence like "I saw the man with the telescope" has several parse trees. Statistical and neural parsers score the possible trees and pick the most probable one, and the parse structure is used as a feature in tasks such as relation extraction.
:::

:::real
Calculators that follow the order of operations implement the unambiguous grammar. Spreadsheets do too: typing `=2+3*4` gives 14, not 20, because the formula parser groups multiplication first.
:::

:::quiz
? Reading the leaves of a parse tree from left to right gives...
+ the derived string
- the list of rules used
- the leftmost derivation
> This is the yield of the tree.

? With $2 + 3\times 4$, what does the tree grouping $(2+3)\times4$ evaluate to?
= 20
> $5\times4 = 20$; the conventional tree gives 14.

? A grammar is ambiguous when some string has...
- two different derivations
+ two different parse trees
- a very long derivation
> Different derivation orders can give the same tree; only different trees count.

? How many parse trees does $a+a+a$ have in $E\to E+E\mid a$?
= 2
> $(a+a)+a$ and $a+(a+a)$: $C_2 = 2$.

? What value does $8-(4-2)$ give?
= 6
> The conventional left grouping $(8-4)-2$ gives 2.

? In the unambiguous grammar $E\to E+T\mid T$, why does $a+a+a$ group to the left?
+ the recursion $E\to E+T$ is on the left
- because $+$ has lower precedence than $\times$
- because $F\to(E)$
> Only the left child can contain another $+$, so earlier additions are grouped first.
:::
## Lesson: Chomsky normal form and the CYK algorithm {#chomsky-normal-form}
@summary: Every context-free grammar can be rewritten so that rules have the form A → BC or A → a, which makes parsing by dynamic programming possible.

### Why a normal form?
Grammars can be written in endlessly many styles: long rules, rules that produce nothing, rules that just rename one variable as another. That freedom is pleasant for people but awkward for algorithms and proofs. A **normal form** is a standard shape that every grammar can be converted into without changing its language. The most important one is **Chomsky normal form** (CNF). Once a grammar is in CNF, we can answer the question "is this string in the language?" with a clean, guaranteed-polynomial algorithm called **CYK**, and we can prove theorems such as the pumping lemma for context-free languages.

### Imagine a family tree with two children
Imagine a strange family in which every parent has exactly two children, or else is a "leaf" person who has a single named role. Every family tree then has a very regular shape: it is a binary tree. If you know how many leaf people there are, you know exactly how many parents there are. CNF makes every parse tree look like that, and that regularity is what algorithms exploit.

### The definition
A grammar is in **Chomsky normal form** if every rule has one of these forms:

- $A\to BC$, where $B$ and $C$ are variables and neither is the start variable;
- $A\to a$, where $a$ is a terminal;
- $S\to\varepsilon$, allowed only for the start variable $S$, and only if $\varepsilon$ is in the language.

So no long rules, no mixtures of terminals and variables on a right side, no ε-rules except possibly one at the start, and no **unit rules** like $A\to B$.

:::def Chomsky normal form
A CFG whose rules all have the form $A\to BC$ (with $B$, $C$ non-start variables), $A\to a$ (a terminal), or $S\to\varepsilon$ for the start variable.
:::

### Counting derivation steps
CNF gives an exact count. To derive a string of length $n\ge1$, the rules $A\to BC$ build a binary tree skeleton with $n$ leaves-to-be, which needs $n-1$ uses, and then each of the $n$ variables at the bottom is turned into a terminal with one use of $A\to a$. In total, **every derivation of a length-$n$ string takes exactly $2n-1$ steps**. For $n = 4$ that is 7 steps. This means the number of possible derivations to check is finite, which is the first hint that membership is decidable.

### Converting a grammar to CNF
Any CFG can be converted to CNF in four stages.

1. **New start variable.** Add $S_0\to S$, so the start variable never appears on a right side.
2. **Remove ε-rules.** For each variable $A$ that can derive $\varepsilon$ (a *nullable* variable), delete $A\to\varepsilon$ and, for every rule with $A$ on the right, add a copy with that occurrence of $A$ left out. For example, if $B$ is nullable then $A\to uBv$ gets the extra rule $A\to uv$. Keep $S_0\to\varepsilon$ if the start was nullable.
3. **Remove unit rules.** Replace each $A\to B$ by $A\to w$ for every rule $B\to w$ (repeating as needed).
4. **Shorten and separate.** Replace each terminal $a$ inside a longer right side with a new variable $U_a$ and rule $U_a\to a$. Then break each long rule $A\to B_1B_2\cdots B_k$ into a chain $A\to B_1C_1$, $C_1\to B_2C_2$, ..., $C_{k-2}\to B_{k-1}B_k$.

Here is a short example. Start with $S\to 0S1\mid 01$, which generates $\{0^n1^n : n\ge1\}$. There are no ε-rules and no unit rules. Introduce $A\to0$, $B\to1$, so the rules become $S\to ASB\mid AB$. Break $ASB$ into $S\to AT$, $T\to SB$. The final CNF grammar is
$$S\to AT\mid AB,\qquad T\to SB,\qquad A\to0,\qquad B\to1.$$
(Here $S$ appears on a right side, inside $T \to SB$; strictly, stage 1 would add a new start $S_0 \to AT \mid AB$. We skip it because $\varepsilon$ is not in the language, so it changes nothing important for parsing.)

### The CYK algorithm
The **Cocke-Younger-Kasami** algorithm decides whether a string $w = w_1\cdots w_n$ is generated by a CNF grammar. It is a classic example of **dynamic programming**. For every substring $w_i\cdots w_j$, it computes the set $T[i,j]$ of variables that can derive that substring, starting with substrings of length 1 and building up.

- Length 1: $T[i,i] = \{A : A\to w_i\}$.
- Length $\ell > 1$: $A\in T[i,j]$ if there is a rule $A\to BC$ and a split point $k$ with $i\le k<j$ such that $B\in T[i,k]$ and $C\in T[k+1,j]$.

The string is in the language iff the start variable is in $T[1,n]$.

Let us run it on $w = 0011$ with the grammar above. Length 1: positions 1 and 2 hold $\{A\}$, positions 3 and 4 hold $\{B\}$. Length 2: $T[1,2]$ needs a rule with right side $AA$, which does not exist, so it is empty; $T[2,3]$ has $AB$, so $S\in T[2,3]$; $T[3,4]$ would need $BB$, empty. Length 3: $T[1,3]$ tries $A$ followed by $T[2,3] = \{S\}$, giving $AS$, no rule; and $T[1,2]\cdot T[3,3]$, empty. So empty. $T[2,4]$ tries $T[2,3]\cdot T[4,4]$, which is $SB$, so $T\in T[2,4]$. Length 4: $T[1,4]$ tries $T[1,1]\cdot T[2,4]$, which is $AT$, so $S \in T[1,4]$. The string is accepted.

### How fast is it?
There are about $n^2/2$ cells, and filling one cell tries up to $n-1$ split points and every rule. So CYK runs in $O(n^3\cdot|G|)$ time, where $|G|$ is the size of the grammar. For a 100-symbol string that is around a million basic steps times the grammar size: fine for a computer, and vastly better than trying every possible derivation. Practical compilers use faster linear-time parsers (LL and LR) for restricted grammars, but CYK works for **every** context-free grammar.

### Common mistakes
When removing ε-rules, you must add copies for **every subset** of nullable occurrences: if $A\to BCB$ with $B$ nullable, you add $A\to CB$, $A\to BC$ and $A\to C$. Do not forget that unit rules can chain ($A\to B\to C$). In CYK, the cell for a substring depends on **all** split points, not just one. And the $2n-1$ count applies only to CNF grammars and strings of length $n\ge1$.

### Summary
Chomsky normal form restricts rules to $A\to BC$, $A\to a$, and possibly $S\to\varepsilon$. Every CFG can be converted to CNF by adding a new start, removing ε-rules and unit rules, and splitting long rules. In CNF every length-$n$ string has derivations of exactly $2n-1$ steps, and the CYK dynamic programming algorithm decides membership in $O(n^3)$ time by filling a triangular table of variable sets.

@viz bigo | CYK fills about n²/2 table cells and tries up to n split points each, so its running time grows like n³.

:::explore
**What to try**
1. Set $n$ to 40 and compare the values shown for $n^2$ and $n^3$.
2. Increase $n$ to 1000 and read off $n^3$, the rough number of steps CYK needs for a 1000-symbol input.
3. Compare $n^3$ with $2^n$ at $n = 40$.

**What to notice:** $n^3$ at $n = 40$ is $64{,}000$, so CYK on a 40-symbol string is quick. At $n = 1000$ it is $10^9$: slow but feasible, which is why compilers prefer linear-time parsers for restricted grammars. Meanwhile $2^{40}$ is over a trillion; trying all parse trees blindly grows exponentially, and dynamic programming is what keeps CYK polynomial.
:::

:::formulas
$$A\to BC,\quad A\to a,\quad S\to\varepsilon \ (\text{start only})$$
$$\text{CNF derivation of } w,\ |w| = n\ge1: \ \text{exactly } 2n-1 \text{ steps}$$
$$T[i,i] = \{A : A\to w_i\},\qquad T[i,j] = \{A : A\to BC,\ B\in T[i,k],\ C\in T[k+1,j],\ i\le k<j\}$$
$$\text{CYK time} = O(n^3\cdot|G|)$$
:::

:::thm Every CFG has an equivalent CNF grammar
For every context-free grammar $G$ there is a grammar $G'$ in Chomsky normal form with $L(G') = L(G)$.
:::

:::proof
Apply the four stages. Adding $S_0\to S$ does not change the language. Removing ε-rules while adding copies with nullable variables omitted preserves every derivation of a non-empty string (an occurrence that would have derived $\varepsilon$ is simply omitted), and we keep $S_0\to\varepsilon$ exactly when $\varepsilon\in L(G)$. Replacing unit rules $A\to B$ by $A\to w$ for $B\to w$ shortcuts chains of renamings. Finally, introducing $U_a\to a$ and splitting long rules into chains of binary rules produces the same strings, since each chain can only be expanded in one way. Every stage preserves the language and the final rules have CNF form.
:::

:::thm Derivation length in CNF
If $G$ is in CNF and $w\in L(G)$ with $|w| = n\ge1$, every derivation of $w$ has exactly $2n-1$ steps.
:::

:::proof
Each step either uses $A\to BC$, which increases the number of symbols in the sentential form by 1, or $A\to a$, which turns one variable into a terminal. Starting from 1 symbol and ending with $n$ symbols needs $n-1$ binary steps, and each of the $n$ terminals is produced by exactly one $A\to a$ step: $(n-1)+n = 2n-1$.
:::

:::steps Derive $0011$ in the CNF grammar $S\to AT\mid AB$, $T\to SB$, $A\to0$, $B\to1$
1. $S\Rightarrow AT\Rightarrow 0T$
2. $\Rightarrow 0SB\Rightarrow 0ABB$
3. $\Rightarrow 00BB\Rightarrow 001B\Rightarrow0011$.
4. Count: 7 steps, which is $2\cdot4-1$.
:::

:::steps Remove ε-rules from $S\to AB$, $A\to aA\mid\varepsilon$, $B\to b$
1. Nullable variables: only $A$.
2. For $S\to AB$, add the copy without $A$: $S\to B$.
3. For $A\to aA$, add $A\to a$; delete $A\to\varepsilon$.
4. Result: $S\to AB\mid B$, $A\to aA\mid a$, $B\to b$, which still generates $a^*b$.
:::

:::steps Use CYK to show $001$ is not generated by the same grammar
1. Length 1: $\{A\}, \{A\}, \{B\}$.
2. Length 2: $T[1,2]$ needs $AA$: empty. $T[2,3]$ has $AB$: $\{S\}$.
3. Length 3: $T[1,3]$: $A\cdot S$ gives $AS$, no rule; $T[1,2]\cdot B$ is empty. So $T[1,3] = \varnothing$.
4. $S\notin T[1,3]$, so $001$ is rejected, as it should be (two 0s, one 1).
:::

:::mock Exam question
Convert $S\to aSb\mid ab$ into Chomsky normal form and state how many steps a CNF derivation of $aaabbb$ takes.
:::solution
Introduce $U\to a$ and $V\to b$: $S\to USV\mid UV$. Split $USV$ into $S\to UW$, $W\to SV$.
CNF grammar: $S\to UW\mid UV$, $W\to SV$, $U\to a$, $V\to b$. (There are no ε-rules or unit rules; if a strict new start variable is required, add $S_0\to UW\mid UV$.)
$|aaabbb| = 6$, so any derivation takes $2\cdot6-1 = 11$ steps.
:::
:::

:::cs
CYK and its relatives (Earley parsing, GLR) are used when grammars are ambiguous or too general for LR parsers, for example in parsing natural language, in some IDE tools, and in RNA secondary structure prediction, where a CYK-like dynamic program finds the best folding of a molecule.
:::

:::ml
The inside algorithm for probabilistic CFGs is CYK with sums of probabilities instead of yes/no answers, and it is the basis of the inside-outside EM algorithm for learning grammar probabilities from text. Similar span-based dynamic programs power neural constituency parsers.
:::

:::real
Proofreading a sentence by asking "can these two words form a phrase? can that phrase and the next one form a bigger phrase?" and building upwards is exactly the CYK table, filled by hand.
:::

:::quiz
? Which rule is allowed in Chomsky normal form?
+ $A\to BC$
- $A\to aB$
- $A\to B$
> CNF allows only $A\to BC$, $A\to a$ and $S\to\varepsilon$.

? How many steps does a CNF derivation of a string of length 5 take?
= 9
> $2n-1 = 9$.

? What is the running time of CYK on a string of length $n$ (fixed grammar)?
- $O(n)$
- $O(n^2)$
+ $O(n^3)$
> About $n^2$ cells and up to $n$ split points each.

? In CYK, the string is accepted when...
+ the start variable is in the cell for the whole string
- every cell is non-empty
- the last row contains a terminal
> $T[1,n]$ holds the variables deriving all of $w$.

? With $n = 10$, how many cells $T[i,j]$ with $i\le j$ does CYK fill?
= 55
> $n(n+1)/2 = 55$.

? When removing the ε-rule for nullable $B$ from $A\to BcB$, how many new rules are added?
= 3
> Omit the first $B$, the second $B$, or both: $cB$, $Bc$, $c$.
:::

## Lesson: Pushdown automata {#pushdown-automata}
@summary: Finite automata with a stack; nondeterministic PDAs recognise exactly the context-free languages.

### Adding memory, carefully
A finite automaton fails on $\{0^n1^n\}$ because it cannot count without limit. What is the smallest amount of extra memory that fixes this? Not a full random-access memory, just a **stack**: a pile where you can only add to the top (**push**) and remove from the top (**pop**). A finite automaton with a stack is called a **pushdown automaton** (PDA), and it turns out to recognise exactly the context-free languages, matching the power of grammars the way finite automata matched regular expressions.

### Imagine a pile of plates
Picture checking a row of opening and closing brackets with a pile of plates. Each time you see an opening bracket, put a plate on the pile. Each time you see a closing bracket, take a plate off. If you ever need to remove a plate from an empty pile, there was a closing bracket with no partner. If plates remain at the end, some opening bracket never closed. The pile can grow as high as needed, which is the extra power a finite machine lacks, yet you only ever look at the top plate.

### The definition
A PDA is a 6-tuple $(Q,\Sigma,\Gamma,\delta,q_0,F)$ where $Q$ is a finite set of states, $\Sigma$ the input alphabet, $\Gamma$ the **stack alphabet**, $q_0$ the start state, $F$ the accepting states, and the transition function
$$\delta: Q\times\Sigma_\varepsilon\times\Gamma_\varepsilon\to\mathcal P(Q\times\Gamma_\varepsilon),$$
where $\Sigma_\varepsilon = \Sigma\cup\{\varepsilon\}$ and $\Gamma_\varepsilon = \Gamma\cup\{\varepsilon\}$. A transition written $a, X\to Y$ means: read input symbol $a$ (or nothing if $a = \varepsilon$), pop $X$ from the top of the stack (or nothing), and push $Y$ (or nothing). The machine is **nondeterministic**: there may be several choices, and it accepts if some sequence of choices consumes the whole input and ends in an accepting state.

It is common to push a special bottom marker such as $\bot$ at the start, so the machine can tell when its stack is empty. (The visual below draws it as a dollar sign.)

:::def Pushdown automaton
A nondeterministic finite automaton equipped with an unbounded stack. Each move reads an input symbol or ε, pops a stack symbol or ε, pushes a stack symbol or ε, and changes state.
:::

:::def Stack
A last-in, first-out store: push adds a symbol on top, pop removes the top symbol, and only the top is visible.
:::

### A PDA for $0^n1^n$
The machine has a "pushing" phase and a "popping" phase. It starts by pushing $\bot$. In the pushing state, each 0 is read and pushed. On the first 1 it switches to the popping state, and each 1 pops one 0. Reading a 0 after a 1 is impossible, so such strings die. At the end, if the top of the stack is $\bot$, every 0 was matched and the machine accepts.

Trace $0011$: push $\bot$; read 0, push (stack $\bot 0$); read 0, push ($\bot 00$); read 1, pop ($\bot 0$); read 1, pop ($\bot$); end of input with $\bot$ on top: accept. Trace $001$: after reading everything, the stack is $\bot 0$, one 0 unmatched: reject. Trace $011$: after one pop the stack is $\bot$, and the next 1 has nothing to pop: the machine is stuck and rejects.

### Using nondeterminism: palindromes
For **marked palindromes** $\{wcw^R\}$, where a special centre symbol $c$ is present, a PDA pushes every symbol until it reads $c$, then pops and compares each following symbol with the top. This works deterministically. For **ordinary even palindromes** $\{ww^R\}$ there is no centre marker, so the PDA must **guess** where the middle is: at every step it may nondeterministically jump from pushing to popping. On input $0110$, the branch that guesses the middle after $01$ pushes 0 and 1, then matches 1 and 0, and accepts. It can be proved that no deterministic PDA recognises $\{ww^R\}$, so unlike finite automata, **nondeterministic PDAs are strictly more powerful than deterministic ones**.

### Equivalence with grammars
The central theorem: a language is context-free if and only if some PDA recognises it.

From a grammar to a PDA the idea is to **simulate a leftmost derivation on the stack**. Push $\bot$ and the start variable. Then loop: if the top is a variable $A$, pop it and push the right side of some rule $A\to w$ (chosen nondeterministically); if the top is a terminal, read the next input symbol and check that it matches, popping it; if the top is $\bot$, accept. For $S\to0S1\mid\varepsilon$ and input $01$: the stack goes $\bot S$, then $\bot 1S0$ (rule $S\to0S1$, with 0 on top), match 0 to give $\bot 1S$, replace $S$ by $\varepsilon$ to give $\bot 1$, match 1 to give $\bot$, accept.

The direction from PDA to grammar is more technical: one creates a variable $A_{pq}$ that generates all strings taking the PDA from state $p$ with some stack to state $q$ with the same stack. We state it without the full proof.

### Deterministic context-free languages
A **deterministic PDA** has at most one move available in every situation. The languages they recognise, the deterministic context-free languages, include most programming-language syntax, and they can be parsed in linear time; this is what LR parsers do. They are closed under complement, unlike general context-free languages.

### Common mistakes
A PDA can only see the **top** of the stack; it cannot count the stack or look inside it. Do not forget the ε-moves: a transition may read nothing, pop nothing, or push nothing. Acceptance requires consuming the **entire input**; reaching an accepting state halfway does not count. Remember the bottom marker if your design needs to test for an empty stack. And since PDAs are nondeterministic by default, a PDA accepts if **any** branch accepts, so a design with guesses is correct as long as the right guess leads to acceptance and no guess accepts a wrong string.

### Summary
A pushdown automaton is a finite automaton plus a stack, with moves that read, pop and push. The stack provides unbounded but last-in-first-out memory, enough to match $0^n$ with $1^n$, balance brackets, or check palindromes by guessing the middle. Nondeterministic PDAs recognise exactly the context-free languages; a grammar is turned into a PDA by simulating leftmost derivations on the stack. Deterministic PDAs are strictly weaker, yet they cover most programming languages and parse in linear time.

@viz g11-pda machine="0ⁿ1ⁿ" input="000111" | The stack grows by one 0 per 0 read and shrinks by one per 1. Acceptance means the bottom marker (shown as a dollar sign) is on top at the end.

:::explore
**What to try**
1. Step through `000111` and write down the stack after each symbol.
2. Try `00111` and `00011`; find the exact moment each one fails.
3. Try `0101`.
4. Switch the machine to "w c wᴿ (marked palindromes)" and run `abcba`, then `abcab`.
5. Switch to "equal # of a and b" and run `abba`.

**What to notice:** the stack height after reading the 0s equals the number of 0s, which is the unbounded count a DFA cannot keep. `00111` gets stuck when a 1 finds only the bottom marker; `00011` ends with a 0 left on the stack; `0101` fails because a 0 arrives after the popping phase has begun. The palindrome machine pushes the first half and compares the second half in reverse order, which is the stack's last-in-first-out rule at work. The equal-count machine keeps only the surplus symbol on the stack.
:::

:::formulas
$$\delta: Q\times\Sigma_\varepsilon\times\Gamma_\varepsilon\to\mathcal P(Q\times\Gamma_\varepsilon)$$
$$a,\ X\to Y:\ \text{read } a,\ \text{pop } X,\ \text{push } Y\quad(\text{any may be } \varepsilon)$$
$$\text{CFG} \to \text{PDA}:\ \text{top } A \Rightarrow \text{replace by } w \ (A\to w);\ \ \text{top } a \Rightarrow \text{match input}$$
$$\text{regular} \subsetneq \text{DCFL} \subsetneq \text{CFL}$$
:::

:::thm PDAs and CFGs are equivalent
A language is context-free if and only if some (nondeterministic) pushdown automaton recognises it.
:::

:::proof
(CFG to PDA) Build the PDA in the article. Claim: it accepts $w$ iff $S\Rightarrow^* w$ by a leftmost derivation. At every moment, the input read so far followed by the stack contents (top first, above $\bot$) is a sentential form of a leftmost derivation. Replacing the top variable performs one derivation step, and matching a terminal moves it from the stack to the "read" part. The stack reaches $\bot$ with all input read exactly when the sentential form has become $w$. (PDA to CFG) For each pair of states $p, q$, a variable $A_{pq}$ generates the strings that take the PDA from $p$ with empty stack to $q$ with empty stack; rules $A_{pq}\to aA_{rs}b$ (a push matched by a later pop) and $A_{pq}\to A_{pr}A_{rq}$ (the stack empties in between) capture every computation. The details are a careful induction.
:::

:::thm Nondeterminism matters for PDAs
The language $\{ww^R : w\in\{0,1\}^*\}$ is recognised by a nondeterministic PDA but by no deterministic PDA.
:::

:::steps Trace the PDA for $0^n1^n$ on $0011$
1. Push $\bot$. Stack (bottom to top): $\bot$.
2. Read 0, push 0: $\bot 0$. Read 0, push 0: $\bot 00$.
3. Read 1, pop 0: $\bot 0$. Read 1, pop 0: $\bot$.
4. Input finished and $\bot$ is on top: accept.
:::

:::steps Simulate the grammar $S\to(S)S\mid\varepsilon$ on the stack for input $()$
1. Start: stack $\bot S$ (top on the right).
2. Replace $S$ by $(S)S$, pushing so that $($ is on top: $\bot S)S($.
3. Match input $($: stack $\bot S)S$. Replace $S$ by $\varepsilon$: $\bot S)$.
4. Match input $)$: stack $\bot S$. Replace $S$ by $\varepsilon$: $\bot$. Input finished: accept.
:::

:::steps Design a PDA for $\{0^n1^{2n}\}$
1. In the pushing state, on each 0 push **two** symbols $X$ (two moves, the second with input ε).
2. On the first 1 switch to popping, and pop one $X$ per 1.
3. Accept when the input is finished and $\bot$ is on top.
4. Check $0011$: after $00$ the stack holds 4 $X$s, but only 2 ones arrive: 2 $X$s remain, reject. Check $001111$: four pops, accept.
:::

:::mock Exam question
Describe a PDA for $L = \{a^ib^jc^k : i = j + k\}$ and trace it on $aaabcc$.
:::solution
Push one $A$ for each $a$. Then pop one $A$ for each $b$, and continue popping one $A$ for each $c$ (allowing the $b$ phase to be skipped, but never a $b$ after a $c$). Accept when the input ends with $\bot$ on top.
Trace $aaabcc$: push three $A$s ($\bot AAA$); read $b$, pop ($\bot AA$); read $c$, pop ($\bot A$); read $c$, pop ($\bot$); end of input with $\bot$ on top: accept. Indeed $3 = 1 + 2$.
:::
:::

:::cs
Every function call in a running program pushes a stack frame and every return pops it, so a program's control flow is a pushdown system. LR parsers in compilers are deterministic PDAs, and XML and JSON validators use a stack to check that every opened element is closed in the right order.
:::

:::ml
Stack-augmented neural networks (such as neural stack RNNs) and research on whether Transformers can recognise Dyck languages study precisely this boundary: which models can simulate a pushdown automaton, and which behave only like finite automata.
:::

:::real
The Back button in a web browser is a stack: each page you visit is pushed, and Back pops the most recent one. Undo in a text editor works the same way.
:::

:::quiz
? What extra memory does a PDA have compared with an NFA?
+ an unbounded stack
- a second tape
- a finite counter
> The stack is unbounded, but only its top is visible.

? After the PDA for $0^n1^n$ reads $00011$, how many 0s remain on the stack?
= 1
> Three pushes and two pops.

? Which language needs nondeterminism in a PDA?
- $\{wcw^R\}$
+ $\{ww^R\}$
- $\{0^n1^n\}$
> Without a centre marker the PDA must guess where the middle is.

? PDAs (nondeterministic) recognise exactly the...
- regular languages
+ context-free languages
- decidable languages
> This is the CFG-PDA equivalence theorem.

? In the PDA for $\{0^n1^{2n}\}$ that pushes two symbols per 0, how many symbols (excluding the bottom marker) are on the stack after reading $000$?
= 6
> Two per 0.

? When converting a CFG to a PDA, what happens when a terminal is on top of the stack?
+ it is matched against the next input symbol and popped
- it is replaced by a rule
- the PDA accepts
> Variables are expanded, terminals are matched.
:::
## Lesson: The pumping lemma for context-free languages {#cfl-pumping-lemma}
@summary: Long strings in a context-free language contain two pieces that can be pumped together; this shows aⁿbⁿcⁿ is not context-free and that CFLs are not closed under intersection.

### Where stacks run out
A stack can match one count against another: as many 1s as 0s, as many closing brackets as opening ones. But what about matching **three** counts, as in $\{a^nb^nc^n\}$? A PDA could push the $a$s and pop them against the $b$s, but then the stack is empty and the information about $n$ is gone before the $c$s arrive. Intuition says no PDA can do it. To prove it we need a context-free version of the pumping lemma, and its proof uses parse trees instead of state diagrams.

### Imagine a set of nesting dolls
Imagine a Russian nesting doll where, somewhere inside, a doll of the same design appears again, holding a smaller copy of the same design. You could swap the inner copy for the outer one, making the doll bigger, or remove a layer, making it smaller, and you would still have a valid nesting doll. A parse tree that is tall enough must contain the same variable twice on one path, one inside the other, and the same "swap" works. Because the outer copy surrounds the inner one on both sides, pumping adds material in **two places at once**.

### The key observation: tall trees repeat a variable
Suppose a grammar has $|V|$ variables and every right side has at most $b\ge2$ symbols. A parse tree of height $h$ (the number of edges on the longest root-to-leaf path) has at most $b^h$ leaves. So if a string is long, its parse tree must be tall: if the string has at least $b^{|V|+1}$ symbols, some path from the root has at least $|V|+1$ variables on it besides the leaf. With only $|V|$ distinct variables, some variable $R$ appears twice on that path, by the pigeonhole principle.

Look at the two occurrences. The upper $R$ generates some substring $vxy$, and the lower $R$, inside it, generates the middle part $x$. So the whole string splits as $s = uvxyz$. Now the swaps: replace the lower $R$'s subtree with a copy of the upper one, and you get $uv^2xy^2z$. Replace the upper subtree with the lower one, and you get $uxz = uv^0xy^0z$. Repeating gives $uv^ixy^iz$ for every $i\ge0$, all in the language.

For example, in $S\to0S1\mid\varepsilon$, the path from the root of the tree for $0011$ passes through $S$ several times. Taking two consecutive occurrences gives $v = 0$ and $y = 1$, and pumping produces $0^{k}1^{k}$ for every $k\ge 1$, all still in the language. The two pieces must grow **together**, which is exactly the matching that grammars are good at.

:::def Pumping lemma (context-free)
If $L$ is context-free, there is a $p$ such that every $s\in L$ with $|s|\ge p$ splits as $s = uvxyz$ with $|vy| > 0$, $|vxy|\le p$, and $uv^ixy^iz\in L$ for all $i\ge0$.
:::

### The statement
**Pumping lemma for CFLs.** If $L$ is context-free, there is a number $p$ (the pumping length) such that every $s\in L$ with $|s|\ge p$ can be written as $s = uvxyz$ where

1. $|vy| > 0$ (at least one of the two pumped pieces is non-empty),
2. $|vxy|\le p$ (the pumped region is short),
3. $uv^ixy^iz\in L$ for every $i\ge0$.

Compare with the regular version: there, one piece $y$ was pumped and it had to be near the start ($|xy|\le p$). Here, two pieces $v$ and $y$ are pumped together, and the window $vxy$ can be **anywhere** in the string, but it is short.

### Using it: $a^nb^nc^n$ is not context-free
The proof is again a game. Assume $L = \{a^nb^nc^n : n\ge0\}$ is context-free with pumping length $p$. Choose $s = a^pb^pc^p$. The opponent chooses any split with $|vy| > 0$ and $|vxy|\le p$.

Because the window $vxy$ has length at most $p$, it cannot contain both an $a$ and a $c$: there are $p$ $b$s between the last $a$ and the first $c$. So $v$ and $y$ together contain at most two of the three letters. Pump with $i = 2$. The pumped string gains at least one extra symbol, but at least one of the three letters does not increase. So the three counts are no longer all equal, and $uv^2xy^2z\notin L$. (If $v$ or $y$ contained two different letters, the pumped string would even have them out of order, such as $abab$, which is also not in $L$.) Contradiction: $L$ is not context-free.

With numbers: if $p = 3$, then $s = aaabbbccc$. A legal window like $vxy = abb$ with $v = a$, $x = b$, $y = b$ pumps to $aaaab\,bbb\,ccc$, which has 4 $a$s, 4 $b$s and only 3 $c$s.

### More non-context-free languages
The same style works for $\{ww : w\in\{0,1\}^*\}$ (choose $s = 0^p1^p0^p1^p$; the short window can only disturb nearby blocks, which breaks the "two equal halves" structure), for $\{a^{n^2}\}$ and $\{a^{2^n}\}$ over one letter (pumping adds a bounded amount that cannot keep up with the gaps), and for $\{a^ib^jc^k : i\le j\le k\}$.

### Closure properties, revisited
Now we can settle the closure questions left open earlier. Context-free languages are **not closed under intersection**: $L_1 = \{a^nb^nc^m\}$ and $L_2 = \{a^mb^nc^n\}$ are both context-free (each matches only two counts), but
$$L_1\cap L_2 = \{a^nb^nc^n\},$$
which is not context-free. They are also **not closed under complement**: if they were, then since they are closed under union, De Morgan's law $L_1\cap L_2 = \overline{\overline{L_1}\cup\overline{L_2}}$ would make them closed under intersection.

There is one useful positive result: the **intersection of a context-free language with a regular language is context-free**. Run a PDA and a DFA side by side, using pairs of states and the PDA's stack, just like the product construction. This lets us simplify problems: to show a language $L$ is not context-free, intersect it with a well-chosen regular language and show the result is not context-free.

### The Chomsky hierarchy so far
We now have a ladder of language classes: **regular** (finite automata, regular expressions) inside **context-free** (grammars, PDAs). Above them sit context-sensitive languages and, at the top, the languages recognised by **Turing machines**, which we meet in the next unit. $\{a^nb^nc^n\}$ is a natural example sitting above context-free: a simple program can check it easily, which tells us that real computers are more powerful than PDAs.

### Common mistakes
Remember that $v$ and $y$ are pumped **the same number of times**. Do not assume $vxy$ is at the start of the string; it can be anywhere, so you must consider every position. Make sure your argument handles the cases where $v$ or $y$ is empty (only one of them has to be non-empty). As before, the lemma only proves that a language is **not** context-free. And watch out for languages that look non-context-free but are not, such as $\{a^nb^mc^{n+m}\}$, which has the grammar $S\to aSc\mid T$, $T\to bTc\mid\varepsilon$.

### Summary
Because a long string has a tall parse tree, and a tall tree repeats a variable on some path, every long string in a context-free language splits as $uvxyz$ with a short window $vxy$ in which $v$ and $y$ can be pumped together. Choosing $s = a^pb^pc^p$ shows that matching three counts is impossible for CFLs. As consequences, context-free languages are not closed under intersection or complement, though intersecting with a regular language keeps them context-free.

@viz g11-pda machine="0ⁿ1ⁿ" input="0011" | Pumping in a context-free language adds material in two places at once: one 0 on the left and one 1 on the right.

:::explore
**What to try**
1. Run `0011`, then pump $v = 0$ and $y = 1$ together: run `000111` and `00001111`.
2. Now pump only one side: run `00011` and `00111`.
3. Pump down ($i = 0$): run `01`, then clear the input box to run the empty string.

**What to notice:** pumping both pieces together keeps the string in the language every time, as the lemma promises for $u = 0$, $v = 0$, $x = \varepsilon$, $y = 1$, $z = 1$ in $0011$. Pumping only one side breaks the match, which is why the lemma insists $v$ and $y$ are pumped the same number of times. A language with three linked counts, like $a^nb^nc^n$, cannot be pumped this way, because two pieces can repair at most two of the counts.
:::

:::formulas
$$L \text{ CFL} \Rightarrow \exists p\ \forall s\in L,\ |s|\ge p:\ s = uvxyz,\ |vy|>0,\ |vxy|\le p,\ \forall i\ge0:\ uv^ixy^iz\in L$$
$$\text{height } h \Rightarrow \le b^h \text{ leaves};\qquad p = b^{|V|+1}$$
$$\{a^nb^nc^m\}\cap\{a^mb^nc^n\} = \{a^nb^nc^n\}$$
$$\text{CFL}\cap\text{regular} = \text{CFL}$$
:::

:::thm Pumping lemma for context-free languages
Every context-free language $L$ has a pumping length $p$ with the property above.
:::

:::proof
Take a grammar for $L$ with $|V|$ variables and at most $b\ge2$ symbols on any right side, and let $p = b^{|V|+1}$. Let $s\in L$ with $|s|\ge p$, and choose a parse tree for $s$ with the fewest nodes. A tree of height $h$ has at most $b^h$ leaves, so its height is at least $|V|+1$, and its longest path has at least $|V|+1$ variables. Among the lowest $|V|+1$ variables on that path, some variable $R$ repeats. Let the upper $R$ generate $vxy$ and the lower $R$ generate $x$, so $s = uvxyz$. Replacing subtrees gives $uv^ixy^iz$ for all $i\ge 0$. If $v$ and $y$ were both empty, replacing the upper subtree by the lower would give a smaller tree for $s$, contradicting minimality, so $|vy|>0$. The subtree of the upper $R$ has height at most $|V|+1$, so $|vxy|\le b^{|V|+1} = p$.
:::

:::thm CFLs are not closed under intersection or complement
There are context-free $L_1, L_2$ with $L_1\cap L_2$ not context-free, and there is a context-free language whose complement is not context-free.
:::

:::steps Prove $\{a^nb^nc^n\}$ is not context-free with $p = 4$ in mind
1. Choose $s = a^4b^4c^4$, length $12\ge4$.
2. Any window $vxy$ of length $\le4$ lies within at most two adjacent blocks.
3. Case $vxy$ inside the $a$s and $b$s: pumping $i = 2$ raises the $a$ or $b$ count but leaves 4 $c$s.
4. Case $vxy$ inside the $b$s and $c$s: the $a$ count stays at 4 while another rises.
5. In every case the counts become unequal, so the pumped string is not in $L$.
:::

:::steps Show that $\{a^ib^jc^k : i,j,k \text{ all equal}\}$ is obtained from a CFL and a regular language
1. Let $E$ be the language of strings over $\{a,b,c\}$ with equally many $a$s, $b$s and $c$s.
2. Intersect with the regular language $a^*b^*c^*$: $E\cap a^*b^*c^* = \{a^nb^nc^n\}$.
3. If $E$ were context-free, this intersection would be context-free (CFL ∩ regular).
4. It is not, so $E$ is not context-free either.
:::

:::steps Show that $\{a^nb^mc^{n+m}\}$ IS context-free
1. Each $a$ is matched with a $c$ at the far end, and each $b$ with a $c$ just inside: $S\to aSc\mid T$, $T\to bTc\mid\varepsilon$.
2. Derive $abcc$: $S\Rightarrow aSc\Rightarrow aTc\Rightarrow abTcc\Rightarrow abcc$. Here $n = m = 1$, $n + m = 2$.
3. A grammar exists, so the pumping lemma would never produce a contradiction for this language.
:::

:::mock Exam question
Use the pumping lemma to show that $L = \{a^n b^n c^k : k \ge n\}$ is not context-free. (Hint: choose $s = a^pb^pc^p$ and consider where the window $vxy$ lies; you may need $i = 0$ in one case.)
:::solution
Assume $L$ is CFL with pumping length $p$, and take $s = a^pb^pc^p \in L$. The window $vxy$ (length $\le p$) cannot contain both $a$s and $c$s.
Case 1: $v$ or $y$ contains an $a$ or a $b$ (so the window touches the $a$ and $b$ blocks). If $v$ and $y$ together contain both letters, or only one of $a$, $b$, consider $i = 2$. If the number of $a$s and the number of $b$s change by different amounts, they become unequal: not in $L$. If both rise equally (one $a$-piece and one equal $b$-piece), then $n$ rises above $p$ while the $c$s stay at $p$, so $k < n$: not in $L$.
Case 2: $v$ and $y$ contain only $c$s. Pump down, $i = 0$: the number of $c$s drops below $p$ while $n = p$, so $k < n$: not in $L$.
(Out-of-order strings such as $aabab\cdots$ are never in $L$.) Every split fails, so $L$ is not context-free.
:::
:::

:::cs
Type checking is not context-free: "every variable must be declared before it is used" requires matching a name with an arbitrarily distant earlier occurrence, like $\{ww\}$. That is why compilers parse with a context-free grammar and then check declarations and types in a separate semantic-analysis pass.
:::

:::ml
Benchmarks for sequence models include $a^nb^nc^n$ precisely because it is just beyond context-free. Studies show LSTMs can learn to count several quantities, while some attention-only models struggle to generalise to longer $n$, which links the Chomsky hierarchy to neural architecture design.
:::

:::real
A dance routine in which every forward step must later be matched by a backward step, and also by a turn, in the same order and number, requires keeping track of three linked counts. A single stack of reminders is not enough, which is the everyday meaning of $a^nb^nc^n$.
:::

:::quiz
? How many pieces are pumped in the CFL pumping lemma?
- one
+ two, together
- three
> $v$ and $y$ are both repeated $i$ times.

? For $s = a^pb^pc^p$, why can the window $vxy$ not contain both an $a$ and a $c$?
+ there are $p$ $b$s between them and $|vxy|\le p$
- because $|vy|>0$
- because $u$ must be non-empty
> The window would need length at least $p + 2$.

? With $s = a^3b^3c^3$, $v = a$, $x = b$, $y = b$ and $i = 2$, how many symbols does the pumped string have?
= 11
> Two extra symbols are added to the original 9.

? $\{a^nb^nc^m\}\cap\{a^mb^nc^n\}$ equals...
+ $\{a^nb^nc^n\}$
- $\{a^nb^n\}$
- the empty set
> The first condition matches $a$ with $b$, the second $b$ with $c$.

? A grammar has right sides of length at most 2 and 3 variables. What pumping length $p = b^{|V|+1}$ does the proof give?
= 16
> $2^{3+1} = 16$.

? The intersection of a context-free language and a regular language is...
+ always context-free
- always regular
- possibly not context-free
> Run the PDA and DFA in parallel with the product construction.
:::
# Unit: Turing machines and computability

## Lesson: Turing machines {#turing-machines}
@summary: A finite control with an unbounded read-write tape: the standard mathematical model of a general-purpose computer.

### What is a computer, really?
Finite automata have a fixed memory, and pushdown automata have a stack they can only use from the top. Neither can check $\{a^nb^nc^n\}$, yet a five-line program can. So what is the right mathematical model of a real, general-purpose computer? In 1936, before electronic computers existed, Alan Turing answered this by imagining a human clerk doing a calculation with pencil and paper, and stripping the activity down to its bare essentials. The result, the **Turing machine**, is still the standard definition of "algorithm" in computer science.

### Imagine a clerk with a paper strip
Picture a clerk sitting in front of an endless strip of paper divided into squares. Each square holds one symbol or is blank. The clerk looks at one square at a time, and has a rule book that depends only on the clerk's current "state of mind" (one of finitely many) and the symbol in the current square. Each rule says: write this symbol in the square, move one square left or right, and switch to that state of mind. That is all. There is no limit on how much paper is used, and the clerk can go back and reread or erase anything. Turing argued that any mechanical calculation a person can do can be broken down into steps like these.

### The definition
A Turing machine (TM) is a 7-tuple $(Q,\Sigma,\Gamma,\delta,q_0,q_{\text{acc}},q_{\text{rej}})$ where

- $Q$ is a finite set of states;
- $\Sigma$ is the input alphabet, not containing the blank symbol $\sqcup$;
- $\Gamma$ is the tape alphabet, with $\Sigma\subseteq\Gamma$ and $\sqcup\in\Gamma$;
- $\delta: Q\times\Gamma\to Q\times\Gamma\times\{L,R\}$ is the transition function;
- $q_0$ is the start state, and $q_{\text{acc}}\ne q_{\text{rej}}$ are the accept and reject states, where the machine halts.

The input is written on the leftmost squares of the tape, the rest is blank, and the head starts on the first input symbol. A transition $\delta(q, a) = (r, b, R)$ means: in state $q$ reading $a$, write $b$, move right, and go to state $r$.

Three differences from a DFA are crucial. The machine can **write** on the tape. The head can move **both ways**. And the tape is **unbounded**, so memory never runs out. The price is that the machine might **never halt**.

:::def Turing machine
A finite-state control with an infinite tape and a read-write head. Each step reads the symbol under the head, writes a symbol, moves left or right, and changes state. It halts on entering the accept or reject state.
:::

### Configurations and computation
A snapshot of the machine is a **configuration**: the tape contents, the head position and the state. It is common to write it as a string $u\,q\,v$, meaning the tape holds $uv$, the machine is in state $q$, and the head is on the first symbol of $v$. For example, $10\,q_3\,11$ means tape $1011$, state $q_3$, head on the third square. A computation is a sequence of configurations, each following from the last by one transition. On a given input there are three possible outcomes: the machine **accepts**, **rejects**, or **loops** forever.

:::def Configuration
The complete state of a TM at one moment: tape contents, head position and current state, written $u\,q\,v$.
:::

### Example 1: adding one in binary
A TM can compute functions, not only answer yes or no. To add 1 to a binary number, the machine first moves right to the end of the input. When it sees a blank, it steps back left and enters a "carry" state. In carry, a 1 becomes 0 and the carry continues left; a 0 becomes 1 and the machine halts; a blank (the number was all 1s) becomes 1 and it halts. On input $1011$ (eleven), it walks right over 4 symbols, steps back, changes the last two 1s to 0s, changes the 0 to 1, and halts with $1100$ (twelve) after 8 steps.

### Example 2: deciding $0^n1^n$
To decide $\{0^n1^n\}$ the machine repeatedly **crosses off** one 0 and one matching 1. It replaces the leftmost 0 with $X$, scans right past 0s and $Y$s to the first 1, replaces it with $Y$, scans back left to the $X$, and repeats. When no 0s remain, it checks that only $Y$s are left and accepts; any stray symbol leads to reject. On $0011$ it makes two crossing rounds and then a final check. The same idea, with three letters crossed off per round, decides $\{a^nb^nc^n\}$, which no PDA can do.

### Recognisers and deciders
A TM **recognises** the language $L(M)$ of inputs it accepts. On inputs not in $L(M)$ it may reject *or loop*. A TM that halts on **every** input is a **decider**. This distinction is central to the rest of the course:

- A language is **Turing-recognisable** (recursively enumerable) if some TM recognises it.
- A language is **decidable** (recursive) if some TM decides it.

Every decidable language is recognisable. The converse fails: in a few lessons we will meet the halting problem, which is recognisable but not decidable. A simple recogniser that is not a decider: "scan right; if you find a 1, accept". On $0001$ it accepts, but on $000$ it walks right over the blanks forever, never rejecting.

:::def Decider
A Turing machine that halts (accepts or rejects) on every input.
:::

:::def Turing-recognisable language
A language $L$ for which some TM accepts exactly the strings in $L$; on other inputs it may reject or run forever. Also called recursively enumerable.
:::

:::def Decidable language
A language $L$ for which some TM halts on every input and accepts exactly the strings in $L$. Also called recursive.
:::

### How powerful are such simple steps?
It seems unbelievable that this primitive device can do everything a laptop can. But each laptop operation, reading memory, adding numbers, comparing, jumping, can be simulated by a (long) sequence of tape moves. The busy beaver shows how much can happen in tiny machines: a 3-state TM started on a blank tape can write six 1s in 14 steps and halt, and the maximum running times of small machines grow faster than any computable function. Turing machines are slow, but speed is not the point. The point is **what can be computed at all**.

### Common mistakes
A TM's tape is infinite in one direction in the standard model; if the head is on the leftmost square and moves left, it stays put. Halting happens only in $q_{\text{acc}}$ or $q_{\text{rej}}$; reaching the end of the input does not stop the machine. A recogniser is allowed to loop on inputs it rejects, so "recognisable" is weaker than "decidable". And do not confuse the tape alphabet with the input alphabet: the blank and helper symbols like $X$, $Y$ are in $\Gamma$ but not in $\Sigma$.

### Summary
A Turing machine is a finite control plus an unbounded tape and a head that reads, writes and moves both ways. Each step is determined by the state and the symbol under the head. On each input it accepts, rejects or loops. Machines that always halt are deciders. Turing machines can compute functions such as binary increment and decide languages such as $\{0^n1^n\}$ and $\{a^nb^nc^n\}$, beyond the power of PDAs, and they are the standard model of what an algorithm can do.

@viz g11-tm machine="binary increment (+1)" input="1011" | Step the machine and watch the head, the state and the tape. The step counter shows the running time.

:::explore
**What to try**
1. Run `1011` step by step and check that it ends with `1100` after 8 steps.
2. Try `111` and watch the carry run off the left end of the number.
3. Switch to "decide 0ⁿ1ⁿ" and run `0011`, watching the $X$ and $Y$ marks appear.
4. Run "decide 0ⁿ1ⁿ" on `0010` and find the step where it rejects.
5. Switch to "loops when there is no 1" and run `000`.

**What to notice:** the increment machine first walks to the end and then works backwards, just like adding by hand. On `111` the carry reaches the blank to the left of the number, which becomes a new leading 1 (seven plus one is eight, `1000`); the visual's tape extends in both directions, a harmless variant explained in the next lesson. The $0^n1^n$ decider crosses off one pair per round. The last machine never halts on `000`: it is a recogniser but not a decider, the distinction from the article.
:::

:::formulas
$$M = (Q,\Sigma,\Gamma,\delta,q_0,q_{\text{acc}},q_{\text{rej}}),\qquad \delta: Q\times\Gamma\to Q\times\Gamma\times\{L,R\}$$
$$\text{configuration } u\,q\,v:\ \text{tape } uv,\ \text{state } q,\ \text{head on first symbol of } v$$
$$\text{outcomes: accept, reject, loop};\qquad \text{decidable}\subseteq\text{recognisable}$$
$$\text{regular}\subsetneq\text{CFL}\subsetneq\text{decidable}\subsetneq\text{recognisable}$$
:::

:::thm Every context-free language is decidable
For every CFL $L$ there is a Turing machine that decides $L$.
:::

:::proof
Convert a grammar for $L$ to Chomsky normal form. A TM can run the CYK algorithm (or, more simply, try every derivation of exactly $2n-1$ steps, of which there are finitely many) on its tape, and halts with the correct answer on every input. So $L$ is decidable. Since $\{a^nb^nc^n\}$ is decidable but not context-free, the inclusion is strict.
:::

:::thm A TM can decide $\{a^nb^nc^n\}$
The crossing-off machine that marks one $a$, one $b$ and one $c$ per round, and finally checks that nothing unmarked remains, halts on every input and accepts exactly $\{a^nb^nc^n\}$.
:::

:::steps Run the binary-increment TM on $0111$
1. Walk right over $0, 1, 1, 1$ (4 steps); see a blank, move left into carry (step 5).
2. Carry: $1\to0$, move left (step 6); $1\to0$ (step 7); $1\to0$ (step 8).
3. Read $0$: write $1$ and halt (step 9).
4. Tape: $1000$. Seven plus one is eight.
:::

:::steps Write the configurations of a TM that replaces every 0 by 1, on input $00$
1. Rule: in $q$ on 0, write 1 and move R; in $q$ on $\sqcup$, accept.
2. $q\,00$ (start).
3. $1\,q\,0$ after step 1, then $11\,q\,\sqcup$ after step 2.
4. Step 3 reads the blank and accepts: $11\sqcup\,q_{\text{acc}}$. Three steps in total.
:::

:::mock Exam question
Describe a Turing machine that decides $L = \{w\in\{0,1\}^* : w \text{ has equally many 0s and 1s}\}$, and estimate how many steps it takes on an input of length $n$.
:::solution
Repeat: scan from the left for an unmarked symbol. If there is none, accept. If the first unmarked symbol is a 0, mark it $X$ and scan right for an unmarked 1; if none exists, reject; otherwise mark it $X$ and return to the left end. Do the symmetric thing if the first unmarked symbol is a 1.
Each round marks two symbols and scans the tape at most twice, so at most $n/2$ rounds of $O(n)$ steps each: $O(n^2)$ steps. The machine always halts, so it is a decider.
:::
:::

:::cs
The Turing machine is the reference model behind every statement of the form "no algorithm can do X" and behind the formal definitions of running time and memory used in algorithm analysis. Programming languages are called **Turing-complete** when they can simulate any Turing machine; this includes C, Python, SQL with recursion, and even spreadsheet formulas with LAMBDA.
:::

:::ml
"Can a neural network compute any algorithm?" is a Turing-machine question. Results show that recurrent networks with unbounded precision, and Transformers with enough chain-of-thought steps, are Turing-complete in principle, while fixed-depth models without extra steps are much more limited.
:::

:::real
A knitting pattern or a player-piano roll is a long tape of instructions read one step at a time. A Turing machine is the same idea, with the extra power to write on the tape and to move back and forth.
:::

:::quiz
? Which of these can a Turing machine do that a DFA cannot?
+ write on its tape and move left
- read one input symbol per step
- have finitely many states
> The read-write, two-way, unbounded tape is the key difference.

? How many steps does the binary-increment TM take on $1011$?
= 8
> 4 to walk right, 1 to step back, 3 in the carry state.

? A TM that halts on every input is called...
- a recogniser
+ a decider
- an enumerator
> Recognisers may loop on inputs they do not accept.

? What are the three possible outcomes of running a TM on an input?
+ accept, reject, loop
- accept, reject, error
- halt, pause, loop
> A TM may run forever without halting.

? The 3-state busy beaver in the visual halts after how many steps?
= 14
> It writes six 1s on a blank tape and halts after 14 steps.

? Which language is decidable but not context-free?
- $\{0^n1^n\}$
+ $\{a^nb^nc^n\}$
- $0^*1^*$
> A crossing-off TM decides it; the CFL pumping lemma rules out a PDA.
:::

## Lesson: Variants of Turing machines {#tm-variants}
@summary: Multitape, nondeterministic, two-way and other extended machines compute exactly the same things, which is strong evidence that the model is right.

### Does the fine print matter?
Our definition of a Turing machine made many arbitrary choices: one tape, infinite in one direction, a head that must move left or right, deterministic rules. What if we allowed several tapes, or a head that can stay put, or nondeterministic guessing? A model of computation is only convincing if such details do not change what can be computed. This lesson shows that every reasonable variant computes **exactly the same class** of languages and functions. This robustness is the main evidence that Turing machines capture computation itself.

### Imagine a kitchen with more counters
A cook with one long counter can prepare the same dishes as a cook with three counters; it just takes more walking back and forth to fetch things. Extra counters make cooking faster, but they never make a new dish possible. Turing machine variants are like that: they can change running time, sometimes a lot, but never the set of problems that can be solved.

### Simulation: the method of proof
To show that variant B is no more powerful than the standard model A, we show that **A can simulate B**: given any B-machine, build an A-machine that accepts, rejects and loops on exactly the same inputs. The converse direction (B can simulate A) is usually obvious, since B is an extension of A. When both directions hold, the models are **equivalent**.

### Stay-put and two-way infinite tapes
Allow the head to stay put ($S$) as well as move. A standard machine simulates a stay-put move by moving right and then immediately left, using an extra intermediate state. So one step becomes two, and nothing new is computed.

Allow the tape to be infinite in **both** directions. A one-way tape simulates it by folding the tape in half: square $i \ge 0$ and square $-i-1$ share one cell of the one-way tape, using a tape alphabet of pairs, and the control remembers which half it is currently working on. Again the running time grows by only a constant factor.

### Multitape machines
A $k$-tape TM has $k$ tapes, each with its own head; a transition reads all $k$ symbols at once and writes, moves and changes state accordingly:
$$\delta: Q\times\Gamma^k\to Q\times\Gamma^k\times\{L,R,S\}^k.$$
Multiple tapes make programs much easier. To decide $\{0^n1^n\}$ with two tapes, copy the 0s to tape 2, then move back along tape 2 while reading the 1s on tape 1, one-for-one. That takes about $2n$ steps instead of the $O(n^2)$ back-and-forth of the single-tape crossing-off machine.

The simulation by one tape stores all $k$ tapes on one tape separated by a marker $\#$, with a dot over the symbol where each virtual head is. To simulate one step, the single-tape machine scans the whole tape to read the dotted symbols, then scans again to update them, shifting the tape contents to the right if a virtual tape needs more room. If the multitape machine runs for $t(n)$ steps, each virtual tape has length at most $t(n)$, so one simulated step costs $O(t(n))$ single-tape steps and the whole simulation costs $O(t(n)^2)$. A quadratic slowdown, but the same answers.

:::def Multitape Turing machine
A TM with $k$ tapes and $k$ independent heads, whose transitions read and write all $k$ tapes in one step. It is equivalent to a single-tape TM with at most quadratic slowdown.
:::

### Nondeterministic Turing machines
A **nondeterministic TM** (NTM) may have several possible moves in a configuration: $\delta: Q\times\Gamma\to\mathcal P(Q\times\Gamma\times\{L,R\})$. Its computation is a **tree** of branches, and it accepts if **some** branch reaches the accept state.

A deterministic machine simulates an NTM by exploring the tree **breadth-first**: first all branches of length 1, then of length 2, and so on. If some branch accepts after $t$ steps, the search reaches it. Depth-first search would be wrong, because it could follow an infinite branch forever and never try the accepting one. If each configuration has at most $b$ choices, there are at most $b^t$ branches of length $t$, so the simulation takes about $b^{t}$ steps: an **exponential** slowdown. Whether this slowdown is unavoidable is, essentially, the P versus NP question we meet in the last unit.

:::def Nondeterministic Turing machine
A TM whose transition function gives a set of possible moves. It accepts an input if some branch of its computation tree accepts.
:::

### Enumerators
An **enumerator** is a TM with a printer: it starts on a blank tape and prints a (possibly infinite) list of strings. A language is Turing-recognisable if and only if some enumerator prints exactly its strings. Given a recogniser $M$, an enumerator runs $M$ for $1, 2, 3, \dots$ steps on the first $1, 2, 3, \dots$ strings in shortlex order, printing those accepted. This **dovetailing** trick makes sure no single looping computation blocks the others.

:::def Enumerator
A Turing machine with an output printer that lists strings; the language it enumerates is the set of strings it eventually prints.
:::

### The universal Turing machine
A TM is a finite object, so it can be **encoded** as a string $\langle M\rangle$, listing its states and transitions. Turing showed that there is a single **universal Turing machine** $U$ that, given $\langle M, w\rangle$, simulates $M$ on $w$: it accepts if $M$ accepts, rejects if $M$ rejects, and loops if $M$ loops. This is the idea of the stored-program computer, invented on paper a decade before one was built: one fixed machine runs any program it is given as data.

:::def Universal Turing machine
A Turing machine $U$ that takes an encoding $\langle M,w\rangle$ of a machine and an input and simulates $M$ on $w$.
:::

### Common mistakes
Equivalent does not mean equally fast: multitape-to-single-tape costs a quadratic factor, and nondeterministic-to-deterministic costs an exponential factor (as far as anyone knows). When simulating an NTM, use breadth-first search, not depth-first. Models that are genuinely **weaker**, such as a TM whose head can never move left (which is no stronger than a DFA) or a TM that may only use the squares holding the input (a linear bounded automaton), are not counterexamples to robustness; they are restrictions, not reasonable variants. And the universal machine is a single, fixed machine; it is not a different machine for each program.

### Summary
Turing machines with stay-put moves, two-way infinite tapes, several tapes, or nondeterministic choices all recognise exactly the same languages as the basic model. Proofs work by simulation: multitape machines are simulated with $O(t^2)$ overhead, and nondeterministic machines by breadth-first search with exponential overhead. Enumerators characterise the recognisable languages, and the universal Turing machine shows that one machine can run every program given to it as data.

@viz g11-tm machine="unary addition" input="111+11" | A single-tape machine that adds numbers written in unary. Count its steps and compare with what a multitape machine would need.

:::explore
**What to try**
1. Run `111+11` and check that the result is `11111` and the step counter reads 8.
2. Try `1+1` and `1111+111`, recording the number of steps each time.
3. Switch to "decide palindromes" and run `0110`, then `01110`, watching the head travel back and forth.
4. Try a palindrome of length 8, such as `01111110`, and compare its step count with the length-4 case.

**What to notice:** unary addition takes about $n$ steps for an input of length $n$, since one pass suffices. The palindrome machine, with only one tape, must run to the far end and back for every pair of symbols, so its step count grows roughly like $n^2$: doubling the length roughly quadruples the time. A two-tape machine could copy the input and compare it with its reverse in about $3n$ steps, the speed-up (but not extra power) that multitape machines provide.
:::

:::formulas
$$k\text{-tape}: \ \delta: Q\times\Gamma^k\to Q\times\Gamma^k\times\{L,R,S\}^k$$
$$\text{multitape time } t(n) \ \Rightarrow\ \text{single-tape time } O(t(n)^2)$$
$$\text{NTM time } t(n),\ \le b \text{ choices} \ \Rightarrow\ \text{deterministic time } 2^{O(t(n))}$$
$$U(\langle M,w\rangle) = M(w)\quad(\text{accept / reject / loop})$$
:::

:::thm Multitape machines are equivalent to single-tape machines
Every $k$-tape TM that runs in time $t(n)\ge n$ has an equivalent single-tape TM running in time $O(t(n)^2)$.
:::

:::proof
Store the $k$ tapes consecutively on one tape, separated by $\#$, with dotted symbols marking head positions. To simulate one step: scan from the left end to the last $\#$ to learn the $k$ symbols under the virtual heads (remembered in the finite control), then scan again, writing new symbols and moving dots. If a dot moves onto a $\#$, shift the rest of the tape one cell right to make room. After $t$ steps each virtual tape has at most $t + n$ used cells, so one scan costs $O(t(n))$ steps and $t(n)$ simulated steps cost $O(t(n)^2)$.
:::

:::thm Nondeterministic machines are equivalent to deterministic ones
Every nondeterministic TM has an equivalent deterministic TM. If the NTM is a decider, so is the deterministic machine.
:::

:::proof
Use three tapes: the input (never changed), a simulation tape, and an address tape that lists a sequence of choices $c_1c_2\cdots c_t$ with each $c_i \le b$. For each address in order of length (breadth-first), copy the input to the simulation tape and follow the choices; accept if this branch accepts. If some branch accepts, its address is eventually tried. If every branch of the NTM halts, the tree is finite (by König's lemma), so the search can detect when all branches of the current length have halted and reject.
:::

:::steps How many steps does the one-tape simulation of a 2-tape machine take, roughly, if the 2-tape machine runs for 1,000 steps?
1. Each simulated step scans a tape of length $O(t)$, about $1{,}000$ cells (up to a constant).
2. There are $1{,}000$ simulated steps.
3. Total: about $1{,}000\times1{,}000 = 10^6$ steps, up to a constant factor. Quadratic, not exponential.
:::

:::steps How many branches of length 10 must a breadth-first simulation explore if an NTM has 2 choices per step?
1. Each step doubles the number of branches.
2. After 10 steps: $2^{10} = 1{,}024$ branches.
3. Summing all lengths 1 to 10 gives $2 + 4 + \cdots + 1024 = 2{,}046$ branch prefixes.
:::

:::mock Exam question
A **queue machine** is like a PDA, but its memory is a queue (first in, first out) instead of a stack. Argue that queue machines are as powerful as Turing machines.
:::solution
Store the TM's tape contents in the queue, with a special marker showing the head position. To simulate one TM step, rotate the queue: repeatedly remove the front symbol and add it to the back, until the marked symbol is reached; apply the transition (write the new symbol and move the marker left or right), then keep rotating to complete the cycle. Moving right is easy; moving left needs the machine to remember the previous symbol in its finite control during the rotation (or do a second full rotation). Since a queue machine can simulate any TM, and a TM can easily simulate a queue on its tape, the models are equivalent.
:::
:::

:::cs
The universal Turing machine is the theoretical ancestor of interpreters, virtual machines (such as the JVM and Python's bytecode interpreter) and emulators. Equivalence of models also justifies analysing algorithms on the RAM model: anything a RAM computes in time $t$, a Turing machine computes in polynomial time in $t$.
:::

:::ml
Neural Turing Machines and Differentiable Neural Computers add a differentiable read-write memory to a neural network, inspired directly by the TM's tape, so that the network can learn algorithms such as copying and sorting sequences.
:::

:::real
Your phone can run an emulator of a 1980s game console, and that console's games run correctly inside it. One general-purpose machine simulating another, at some cost in speed, is the universal Turing machine idea in everyday life.
:::

:::quiz
? Adding more tapes to a Turing machine...
- lets it decide more languages
+ can make it faster but does not change what it can compute
- makes it weaker
> Every multitape TM can be simulated by a single-tape TM.

? If a 3-tape TM runs in $t(n)$ steps, the single-tape simulation runs in about...
- $O(t(n))$
+ $O(t(n)^2)$
- $O(2^{t(n)})$
> Each simulated step scans a tape of length $O(t(n))$.

? Why must the deterministic simulation of an NTM use breadth-first search?
+ depth-first search could follow an infinite branch forever
- breadth-first search is faster in every case
- NTMs have no infinite branches
> BFS guarantees that an accepting branch of finite length is found.

? An NTM has 3 choices per step. How many branches of length 4 are there?
= 81
> $3^4 = 81$.

? How many steps does the unary addition TM take on $111+11$?
= 8
> Three 1s, the plus, two 1s, one step back, and one erase.

? What does a universal Turing machine take as input?
- only a string $w$
+ an encoding of a machine $M$ together with an input $w$
- a list of all Turing machines
> $U$ simulates $M$ on $w$: one fixed machine runs every program.
:::
## Lesson: The Church-Turing thesis {#church-turing-thesis}
@summary: The claim that "computable by an algorithm" means exactly "computable by a Turing machine", the evidence for it, and what it lets us prove.

### What does "algorithm" mean?
For centuries mathematicians used algorithms (long division, Euclid's method for the greatest common divisor) without defining the word. That was fine as long as they only wanted to show that something **can** be computed: you just present the method. But in 1900 David Hilbert asked, as the tenth of his famous problems, for "a process according to which it can be determined in a finite number of operations" whether a polynomial equation with integer coefficients has an integer solution. To prove that **no** such process exists, you need a precise definition of every possible process. The **Church-Turing thesis** supplies it.

### Imagine judging a recipe contest
Suppose a contest asks: "Is there any recipe at all that turns these ingredients into a soufflé?" To answer yes, you show one recipe. To answer no, you must rule out every conceivable recipe, which is hopeless unless you first agree on what counts as a recipe: which kitchen actions are allowed. The Church-Turing thesis is that agreement for computation: the allowed actions are the steps of a Turing machine.

### The statement
**Church-Turing thesis.** A function is computable by an effective, step-by-step mechanical procedure (an algorithm) if and only if it is computable by a Turing machine.

It is called a **thesis**, not a theorem, because one side, "effective mechanical procedure", is an informal idea. It cannot be proved mathematically, any more than one can prove that a definition of "continuous" captures our intuition of an unbroken curve. It can, however, be **supported by evidence**, and the evidence is overwhelming.

:::def Church-Turing thesis
The hypothesis that the intuitive notion of an algorithm coincides with Turing machine computability: anything that can be computed by a mechanical procedure can be computed by a Turing machine.
:::

:::def Algorithm
A finite, precise list of instructions that can be followed mechanically, step by step, without insight or guessing. By the Church-Turing thesis, equivalently a Turing machine that halts on every input.
:::

### The evidence
**Independent models agree.** In the 1930s several people, working separately, proposed definitions of computability: Alonzo Church's lambda calculus (functions built from abstraction and application), Kurt Gödel and Stephen Kleene's general recursive functions (functions built from zero, successor, composition, recursion and minimisation), Emil Post's production systems, and Turing's machines. These look nothing alike, yet every one of them was proved to define **exactly the same** class of functions. Later models, such as register machines, cellular automata (including Conway's Game of Life), and every general-purpose programming language, also land in exactly this class.

**Robustness.** As the previous lesson showed, Turing machines can be extended with extra tapes, nondeterminism and other features without becoming more powerful.

**Turing's analysis.** Turing's own argument looked at what a human computer (a clerk) can do: look at a bounded region of paper, be in one of finitely many states of mind, and make small local changes. He argued that any such process can be simulated by his machines.

**No counterexample.** In nearly a century, nobody has found a procedure that everyone agrees is mechanical but that no Turing machine can perform.

### How we use the thesis
The thesis has a practical consequence: we may describe algorithms in ordinary language or pseudocode, and trust that a Turing machine could carry them out. From now on, a "Turing machine" description will usually be a high-level algorithm, such as "convert the grammar to Chomsky normal form and run CYK". Inputs that are not strings, such as graphs, grammars or other machines, are first **encoded** as strings; we write $\langle G\rangle$ for the encoding of an object $G$. Any reasonable encoding works, since a TM can translate between them.

The other consequence is the dramatic one. If we prove that no Turing machine solves a problem, then by the thesis **no algorithm of any kind** solves it, in any programming language, on any computer that will ever be built. Hilbert's tenth problem was settled this way in 1970: Yuri Matiyasevich, building on work of Martin Davis, Hilary Putnam and Julia Robinson, proved that no algorithm decides whether a polynomial equation has integer solutions.

### Computable functions grow, but not too fast
To get a feel for the boundary, consider the **busy beaver** function. Among all $n$-state, 2-symbol Turing machines that eventually halt when started on a blank tape, let $S(n)$ be the largest number of steps any of them takes. Known values are $S(1) = 1$, $S(2) = 6$, $S(3) = 21$, $S(4) = 107$ and, proved by a large collaborative project in 2024, $S(5) = 47{,}176{,}870$. The function $S(n)$ is perfectly well defined, yet it grows faster than every computable function, so by the thesis no algorithm can compute it. The 3-state machine in the visual below writes six 1s in 14 steps; it is not the longest-running 3-state machine, but six 1s is the most any 3-state machine can write.

### Physical and complexity versions
The original thesis is about **what** can be computed. A stronger and more controversial claim, the **extended (or strong) Church-Turing thesis**, says that every reasonable model can be simulated by a Turing machine with only **polynomial** slowdown. This is what makes complexity classes like P model-independent. Quantum computers are the main challenge to the extended thesis: they are not believed to compute anything a Turing machine cannot, but they may compute some things, such as factoring large numbers with Shor's algorithm, exponentially faster.

### Common mistakes
The thesis is not a theorem and is not "proved" by the equivalence results; those results are evidence. It is about computability, not efficiency: the plain thesis says nothing about speed. It does not say that the human mind or the physical universe is a Turing machine; it says that *mechanical procedures* are captured by Turing machines. And "computable" here means computable in principle with unlimited time and memory, not feasible in practice.

### Summary
The Church-Turing thesis identifies the informal idea of an algorithm with the precise idea of a Turing machine. It cannot be proved, but it is supported by the equivalence of every proposed model of computation, by the robustness of Turing machines, and by Turing's analysis of human calculation. It lets us describe algorithms at a high level and, crucially, lets us prove that some problems have no algorithm at all. The extended thesis adds a claim about polynomial-time simulation, which quantum computing may challenge.

@viz g11-tm machine="3-state busy beaver" | A 3-state Turing machine started on a blank tape. It halts after 14 steps having written six 1s.

:::explore
**What to try**
1. Step through the machine and count the 1s on the tape after each step.
2. Watch the transition table: which entries are used, and which entry finally halts the machine?
3. Switch to "loops when there is no 1" with input `000` and let it run.

**What to notice:** a tiny machine with three states and two symbols already behaves in a complicated, hard-to-predict way, and it is far from obvious in advance that it halts. For larger $n$, deciding which $n$-state machines halt becomes impossible for any algorithm, which is why the busy beaver function is uncomputable. The looping machine is the other side of the story: to know it will run forever, you have to reason about it; just watching never gives you an answer.
:::

:::formulas
$$\text{algorithm} \ \overset{\text{thesis}}{\Longleftrightarrow}\ \text{Turing machine that halts on every input}$$
$$\text{TM} \equiv \lambda\text{-calculus} \equiv \mu\text{-recursive functions} \equiv \text{RAM} \equiv \text{any general programming language}$$
$$S(1)=1,\ S(2)=6,\ S(3)=21,\ S(4)=107,\ S(5)=47{,}176{,}870$$
$$\text{extended thesis: model time } t \ \Rightarrow\ \text{TM time } t^{O(1)}$$
:::

:::thm Equivalence of classical models
The functions computable by Turing machines, by the lambda calculus, and by general recursive functions are exactly the same.
:::

:::thm The busy beaver function is not computable
No Turing machine computes $S(n)$, and for every computable function $f$ we have $S(n) > f(n)$ for all sufficiently large $n$.
:::

:::proof
(Sketch of why $S$ is uncomputable.) If some TM computed $S$, we could decide whether an $n$-state machine $M$ halts on a blank tape: compute $S(n)$, run $M$ for $S(n)$ steps, and answer "halts" if it has halted by then and "loops" otherwise, since any halting $n$-state machine halts within $S(n)$ steps. In the next lessons we prove that this halting question is undecidable, so $S$ cannot be computable.
:::

:::steps Describe a "high-level" TM for deciding whether a graph is connected
1. Input: an encoding $\langle G\rangle$ of a graph, such as a list of vertices and edges.
2. Mark the first vertex.
3. Repeat: mark every unmarked vertex joined by an edge to a marked vertex, until nothing new is marked.
4. Accept if every vertex is marked, otherwise reject.
5. Each stage is clearly mechanical, so by the Church-Turing thesis a TM can do it. (It also halts: at most $|V|$ rounds.)
:::

:::steps Show that $S(2)\ge 6$ by running a 2-state machine
1. Machine: $A$ on 0: write 1, R, go to $B$. $A$ on 1: write 1, L, go to $B$. $B$ on 0: write 1, L, go to $A$. $B$ on 1: write 1, R, halt.
2. Steps: $A$ writes 1, R (1); $B$ on 0 writes 1, L (2); $A$ on 1 writes 1, L (3); $B$ on 0 writes 1, L (4); $A$ on 0 writes 1, R (5); $B$ on 1 halts (6).
3. It halts after 6 steps with four 1s on the tape, so $S(2)\ge6$ (in fact $S(2) = 6$).
:::

:::mock Exam question
Explain why the Church-Turing thesis is needed to conclude that "no computer program in any language can solve problem X" from a proof that "no Turing machine decides X". Why can the thesis not be proved?
:::solution
The proof about Turing machines is a mathematical theorem about one formal model. Programs in Python, C or any future language are not Turing machines by definition. To transfer the result, we need that every such program can be simulated by a TM. For each existing language this can be proved, but for "any algorithm, by any method" we rely on the thesis that every mechanical procedure is TM-computable.
It cannot be proved because "mechanical procedure" is an informal concept; a proof needs both sides defined precisely, and any precise definition would just be another formal model whose equivalence to TMs is again a theorem, not the thesis itself.
:::
:::

:::cs
Every claim that a language is "Turing-complete" (C, Python, SQL with recursive queries, TeX, even CSS with user interaction and the Game of Life) means it can simulate a Turing machine, and by the thesis it can therefore express every algorithm. This is also why compilers can translate between languages: they all compute the same functions.
:::

:::ml
The thesis frames what learning systems can and cannot do: a trained neural network, however large, is a computable function, so it cannot solve problems that are uncomputable, such as deciding in general whether a program halts. Results on Turing-completeness of Transformers with chain of thought are statements about which side of this boundary a model sits on.
:::

:::real
A cooking recipe, a tax form, and the instructions for assembling furniture are all algorithms in the everyday sense: mechanical steps requiring no insight. The Church-Turing thesis claims that any such procedure, however complicated, could be carried out by a Turing machine.
:::

:::quiz
? Why is the Church-Turing thesis called a thesis and not a theorem?
+ it relates a formal model to the informal notion of an algorithm
- it has been disproved
- it only holds for one-tape machines
> One side is not mathematically defined, so it cannot be proved.

? Which of these is NOT evidence for the thesis?
- the lambda calculus and TMs compute the same functions
- multitape TMs are no more powerful than single-tape TMs
+ Turing machines are fast in practice
> The thesis is about what is computable, not about speed.

? What is $S(4)$, the maximum number of steps of a halting 4-state busy beaver?
= 107
> Proved in the 1980s; $S(5) = 47{,}176{,}870$ was proved in 2024.

? The extended Church-Turing thesis claims that reasonable models simulate each other with...
- no slowdown
+ polynomial slowdown
- exponential slowdown
> This makes complexity classes such as P model-independent.

? How many steps does the 2-state machine in the worked example take before halting?
= 6
> It shows $S(2)\ge 6$, and in fact $S(2) = 6$.

? Hilbert's tenth problem asks for an algorithm to decide whether polynomial equations have integer solutions. What was the answer?
+ no such algorithm exists
- yes, using Gaussian elimination
- it is still open
> Matiyasevich (1970), building on Davis, Putnam and Robinson.
:::

## Lesson: Decidable problems {#decidability}
@summary: Many natural questions about automata and grammars can be decided by algorithms; counting shows that most languages cannot even be recognised.

### Questions about machines as inputs
So far our machines have answered questions about strings. Now we turn it around and ask questions about **machines themselves**: does this DFA accept this string? Does this grammar generate anything at all? Do these two DFAs accept the same language? Because machines can be encoded as strings, each question becomes a language, and we can ask whether that language is **decidable**: is there an algorithm that always halts with the correct yes-or-no answer? This lesson collects the problems that **are** decidable, and ends with a counting argument showing that undecidable problems must exist.

### Imagine a quality-control office
Picture an office that receives blueprints of vending machines and must answer questions about each one: "Will this design ever give out a drink?" or "Does this new design behave exactly like the old one?" The office cannot build each machine and test it forever. It needs a method that looks at the blueprint and always finishes with an answer. For finite automata, such methods exist. For Turing machines, as we will see next, they mostly do not.

### Problems as languages
Each problem is a set of encoded instances whose answer is yes. For example
$$A_{\text{DFA}} = \{\langle B, w\rangle : B \text{ is a DFA that accepts } w\}.$$
Deciding $A_{\text{DFA}}$ means building one TM that, given any pair $\langle B,w\rangle$, halts and says whether $B$ accepts $w$. Inputs that are not valid encodings are simply rejected.

:::def Decision problem
A question with a yes-or-no answer about an input object, identified with the language of encodings of yes-instances.
:::

### Acceptance problems
**$A_{\text{DFA}}$ is decidable.** Simulate $B$ on $w$: keep track of the current state, follow one transition per symbol, and at the end check whether the state is accepting. This takes $|w|$ steps of simulation and always halts. With the DFA for "divisible by 3" and $w = 110$, the states visited are $0, 1, 0, 0$; the final state is accepting, so $\langle B, 110\rangle \in A_{\text{DFA}}$.

**$A_{\text{NFA}}$ and $A_{\text{REX}}$ are decidable** too: convert the NFA to a DFA with the subset construction, or the regular expression to an NFA with Thompson's construction and then to a DFA, and use the previous decider. Reducing a new problem to one already solved is a pattern we will use constantly.

**$A_{\text{CFG}}$ is decidable**: convert the grammar to Chomsky normal form and run CYK, or list every derivation with exactly $2n-1$ steps. Either way the procedure halts. This proves again that every context-free language is decidable.

### Emptiness problems
**$E_{\text{DFA}} = \{\langle B\rangle : L(B) = \varnothing\}$ is decidable.** A DFA accepts some string exactly when some accepting state can be reached from the start. So mark the start state, repeatedly mark every state that has an arrow from a marked state, and when nothing changes, accept $\langle B\rangle$ if no accepting state is marked. This is graph search and takes at most $|Q|$ rounds.

**$E_{\text{CFG}}$ is decidable.** Mark every terminal. Repeatedly mark a variable $A$ if some rule $A\to X_1\cdots X_k$ has every $X_i$ marked (so $A$ can generate a terminal string). When nothing changes, the language is empty exactly when the start variable is unmarked.

### Equivalence of DFAs
**$EQ_{\text{DFA}} = \{\langle B, C\rangle : L(B) = L(C)\}$ is decidable.** Two languages are equal exactly when their **symmetric difference** is empty:
$$L(B)\,\triangle\,L(C) = \big(L(B)\cap\overline{L(C)}\big)\cup\big(\overline{L(B)}\cap L(C)\big) = \varnothing.$$
Regular languages are closed under complement, intersection and union, so we can build a DFA for the symmetric difference with the product construction and run the $E_{\text{DFA}}$ decider. Another method: minimise both DFAs and check whether the results are identical up to renaming.

By contrast, $EQ_{\text{CFG}}$, the question whether two grammars generate the same language, is **undecidable**. Context-free languages are not closed under complement or intersection, so the trick above fails, and in fact no algorithm exists.

### Recognisable and co-recognisable
A language is **co-recognisable** if its complement is recognisable. A key theorem: **a language is decidable if and only if it is both recognisable and co-recognisable.** Given a recogniser for $L$ and one for $\overline L$, run them in parallel, one step each in turn. Every input is in exactly one of the two languages, so one of the machines eventually accepts, and we answer accordingly. This gives a convenient strategy: if $L$ is recognisable but not decidable, its complement cannot be recognisable.

### Most languages are not recognisable
Here is a surprising counting fact. Every Turing machine has a finite description, so the set of all TMs is **countable**: we can list them $M_1, M_2, M_3, \dots$ in shortlex order of their encodings. But the set of all languages over $\{0,1\}$ is **uncountable**. Suppose we could list all languages $L_1, L_2, \dots$, and list all strings $s_1, s_2, \dots$. Define the diagonal language $D = \{s_i : s_i\notin L_i\}$. Then $D$ differs from each $L_i$ on the string $s_i$, so $D$ is not on the list, a contradiction. Since there are only countably many recognisers and uncountably many languages, **some languages are not recognised by any Turing machine**, indeed almost all of them. The next lesson finds a specific, natural one.

### Common mistakes
"Decidable" requires halting on **every** input, including the no-instances; a procedure that runs forever when the answer is no is only a recogniser. Simulating a machine is a decider only when the simulation is guaranteed to stop, which is true for DFAs ($|w|$ steps) but not for TMs. Do not assume a problem that is decidable for DFAs stays decidable for CFGs: acceptance and emptiness survive, but equivalence does not. And the counting argument shows that undecidable languages exist but does not name one.

### Summary
Questions about automata and grammars become languages of encodings. Acceptance, emptiness and equivalence are decidable for DFAs, acceptance and emptiness are decidable for CFGs, and equivalence for CFGs is undecidable. A language is decidable exactly when it and its complement are both recognisable. Because Turing machines are countable but languages are uncountable, most languages cannot be recognised by any machine.

@viz dfa machine="divisible by 3" | Deciding A_DFA is just simulation: follow one arrow per symbol and check the final state.

:::explore
**What to try**
1. Type `110` and check the path $0\to1\to0\to0$ from the article.
2. Type a few long strings and notice the simulation always finishes after one step per symbol.
3. Without typing anything, find which states are reachable from the start; is any accepting state reachable?

**What to notice:** the simulation halts after exactly $|w|$ steps, so the procedure is a decider for $A_{\text{DFA}}$. Step 3 is the $E_{\text{DFA}}$ algorithm: the accepting state is reachable (it is the start state itself), so the language is non-empty. For a Turing machine, neither trick works, because a simulation may never end.
:::

:::formulas
$$A_{\text{DFA}},\ A_{\text{NFA}},\ A_{\text{REX}},\ E_{\text{DFA}},\ EQ_{\text{DFA}},\ A_{\text{CFG}},\ E_{\text{CFG}}\ \text{are decidable};\quad EQ_{\text{CFG}} \text{ is undecidable}$$
$$L(B) = L(C) \iff \big(L(B)\cap\overline{L(C)}\big)\cup\big(\overline{L(B)}\cap L(C)\big) = \varnothing$$
$$L \text{ decidable} \iff L \text{ and } \overline L \text{ are recognisable}$$
$$|\{\text{TMs}\}| = \aleph_0 < 2^{\aleph_0} = |\mathcal P(\Sigma^*)|$$
:::

:::thm Decidable problems about regular languages and CFLs
$A_{\text{DFA}}$, $A_{\text{NFA}}$, $A_{\text{REX}}$, $E_{\text{DFA}}$, $EQ_{\text{DFA}}$, $A_{\text{CFG}}$ and $E_{\text{CFG}}$ are decidable.
:::

:::thm Decidable iff recognisable and co-recognisable
$L$ is decidable if and only if both $L$ and $\overline L$ are Turing-recognisable.
:::

:::proof
If $L$ is decided by $M$, then $M$ recognises $L$, and $M$ with accept and reject swapped recognises (indeed decides) $\overline L$. Conversely, let $M_1$ recognise $L$ and $M_2$ recognise $\overline L$. On input $w$, alternate steps of $M_1$ and $M_2$ on $w$. Since $w$ lies in $L$ or in $\overline L$, one of them eventually accepts. If $M_1$ accepts, accept; if $M_2$ accepts, reject. This machine always halts and decides $L$.
:::

:::thm Some languages are not Turing-recognisable
There are languages over $\{0,1\}$ recognised by no Turing machine.
:::

:::proof
The set of TMs is countable, since each has a finite encoding and the finite strings over a finite alphabet can be listed. The set of all languages is uncountable by diagonalisation: given any list $L_1, L_2,\dots$ of languages and the list $s_1, s_2, \dots$ of all strings, $D = \{s_i : s_i\notin L_i\}$ differs from every $L_i$. A countable set of machines cannot recognise uncountably many languages.
:::

:::steps Decide whether the grammar $S\to AB$, $A\to aA$, $B\to b$ generates anything
1. Mark the terminals $a$, $b$.
2. $B\to b$: all marked, so mark $B$.
3. $A\to aA$ needs $A$ itself; $A$ has no other rule, so $A$ is never marked.
4. $S\to AB$ needs $A$: $S$ is never marked. Answer: $L = \varnothing$, the grammar is in $E_{\text{CFG}}$.
:::

:::steps Decide $EQ_{\text{DFA}}$ for "ends in 1" and "odd binary numbers"
1. A binary string represents an odd number exactly when its last bit is 1.
2. So the two DFAs describe the same language, and the symmetric difference is empty.
3. Mechanically: build the product DFA accepting where exactly one machine accepts; no such product state is reachable, so the $E_{\text{DFA}}$ test answers "empty", and we accept.
:::

:::mock Exam question
Show that $\text{INF}_{\text{DFA}} = \{\langle B\rangle : L(B) \text{ is infinite}\}$ is decidable.
:::solution
Let $B$ have $k$ states. Claim: $L(B)$ is infinite iff $B$ accepts some string $w$ with $k\le|w|<2k$.
If such $w$ exists, the pumping lemma (with $p = k$) pumps it to infinitely many accepted strings. Conversely, if $L(B)$ is infinite it contains a string of length $\ge k$; take the shortest one of length $\ge k$. If its length were $\ge 2k$, pumping down (removing a loop of length between 1 and $k$ within the first $k$ symbols) would give a shorter accepted string of length $\ge k$, a contradiction.
Decider: test all strings of length $k$ to $2k-1$ with the $A_{\text{DFA}}$ decider; finitely many, so it halts. (Alternatively: check for a cycle on some path from the start to an accepting state.)
:::
:::

:::cs
Decidable questions about automata power real tools: regex engines check whether two patterns are equivalent, firewalls check whether a rule set can ever match, and model checkers check that "the system's behaviour intersected with the bad behaviours" is empty. The undecidability of grammar equivalence explains why tools cannot always tell you whether two grammars define the same language.
:::

:::ml
Verification of neural networks asks decidable questions about finite objects ("is there an input in this box that changes the label?"), which are decidable but often NP-hard. Knowing which questions are decidable, and at what cost, shapes which robustness guarantees can be offered.
:::

:::real
A spell checker that checks one word against a finite dictionary always finishes: a decidable problem. Asking "will this computer program ever crash for any input?" is a question about machines of unlimited power, and, as the next lessons show, no general checker can always answer it.
:::

:::quiz
? Why is $A_{\text{DFA}}$ decidable?
+ simulating a DFA on $w$ always stops after $|w|$ steps
- DFAs have no accepting states
- every language is decidable
> Simulation halts, so the decider always answers.

? Which problem is undecidable?
- $E_{\text{DFA}}$
- $A_{\text{CFG}}$
+ $EQ_{\text{CFG}}$
> Equivalence is decidable for DFAs but not for grammars.

? $EQ_{\text{DFA}}$ reduces to which decidable problem?
+ emptiness of the symmetric difference
- acceptance of the empty string
- the halting problem
> $L(B) = L(C)$ iff $L(B)\triangle L(C) = \varnothing$.

? A language is decidable if and only if it and its complement are...
- finite
+ recognisable
- context-free
> Run the two recognisers in parallel; one must accept.

? The DFA for "divisible by 3" has 3 states. How many states does the product DFA for comparing it with a 2-state DFA have?
= 6
> $3\times2 = 6$ pairs of states.

? The set of Turing machines is countable and the set of languages is uncountable. What follows?
+ some languages are not recognised by any TM
- every language is decidable
- there are more TMs than languages
> A countable set of recognisers cannot cover uncountably many languages.
:::
## Lesson: The halting problem {#halting-problem}
@summary: No algorithm can decide whether an arbitrary program halts on an arbitrary input; the proof is a diagonal argument.

### The ultimate debugging tool
Every programmer has wished for a tool that looks at a program and its input and says: "this will finish" or "this will run forever". It would catch infinite loops before they happen, verify that servers respond, and settle mathematical conjectures automatically. Alan Turing proved in 1936 that such a tool is **impossible**. Not merely hard to build, not too slow on today's hardware: impossible for any algorithm, ever. This result, the undecidability of the halting problem, is the foundation for nearly every impossibility result in computer science.

### Imagine a perfect fortune teller
Imagine a fortune teller who claims to predict perfectly whether any person will do whatever she predicts. Now a contrarian walks in, determined to do the opposite of whatever she says he will do. Whatever she predicts about him, he does the other thing, so she is wrong about him. Her claim to be perfect must be false. The proof of the halting problem builds exactly such a contrarian program, using the supposed halting checker against itself.

### The problems
Two closely related languages:
$$A_{\text{TM}} = \{\langle M,w\rangle : M \text{ is a TM that accepts } w\},$$
$$\textit{HALT}_{\text{TM}} = \{\langle M,w\rangle : M \text{ is a TM that halts on } w\}.$$
Both are **recognisable**: the universal machine $U$ simulates $M$ on $w$ and accepts if $M$ accepts (or, for HALT, if $M$ halts). If $M$ runs forever, so does $U$, which is allowed for a recogniser. The question is whether we can do better and always halt with an answer.

:::def Acceptance problem for TMs
$A_{\text{TM}} = \{\langle M,w\rangle : M \text{ accepts } w\}$. It is recognisable (by the universal TM) but undecidable.
:::

:::def Halting problem
$\textit{HALT}_{\text{TM}} = \{\langle M,w\rangle : M \text{ halts on input } w\}$. It is recognisable but undecidable.
:::

### Why simulation is not enough
The obvious approach is to run $M$ on $w$ and wait. If it halts, we know. But if it has not halted after a million steps, it might halt after a million and one, or never. There is no point at which waiting longer tells us "never". A cleverer approach would analyse the program's code instead of running it, and for many specific programs this works. Turing's theorem says that no single method can work for **all** programs.

### The diagonal proof
Suppose, for contradiction, that some TM $H$ decides $A_{\text{TM}}$: on input $\langle M,w\rangle$, $H$ always halts, accepting if $M$ accepts $w$ and rejecting otherwise.

Build a new machine $D$ that uses $H$ as a subroutine. On input $\langle M\rangle$, the encoding of a machine:

1. Run $H$ on $\langle M,\langle M\rangle\rangle$, asking "does $M$ accept its own description?"
2. If $H$ accepts, **reject**. If $H$ rejects, **accept**.

$D$ is the contrarian: it does the opposite of what $M$ does on $\langle M \rangle$. Since $H$ always halts, so does $D$. Now feed $D$ its own description, $\langle D\rangle$. By construction,
$$D \text{ accepts } \langle D\rangle \iff H \text{ rejects } \langle D,\langle D\rangle\rangle \iff D \text{ does not accept } \langle D\rangle.$$
That is a contradiction. So no such $H$ exists, and $A_{\text{TM}}$ is undecidable.

### Why it is called diagonal
List all Turing machines $M_1, M_2, M_3, \dots$ down the side of a table and their descriptions $\langle M_1\rangle, \langle M_2\rangle,\dots$ across the top. In row $i$, column $j$, write "accept" if $M_i$ accepts $\langle M_j\rangle$. The machine $D$ is built to disagree with the **diagonal**: on input $\langle M_i\rangle$ it does the opposite of entry $(i, i)$. So $D$ differs from every row, yet $D$ is a Turing machine and must be some row. This is Cantor's diagonal argument, the same idea used to show the real numbers are uncountable, applied to programs.

### From acceptance to halting
$\textit{HALT}_{\text{TM}}$ is undecidable too. Suppose $R$ decided it. Then we could decide $A_{\text{TM}}$: on $\langle M,w\rangle$, run $R$; if $M$ does not halt on $w$, reject. If it does halt, it is now safe to simulate $M$ on $w$ to the end, and answer as $M$ does. Since $A_{\text{TM}}$ is undecidable, $R$ cannot exist. This "if you could solve B, you could solve A" argument is called a **reduction**, and the next lesson develops it fully.

### A language that is not even recognisable
$A_{\text{TM}}$ is recognisable but not decidable. By the theorem from the previous lesson (decidable iff recognisable and co-recognisable), its complement $\overline{A_{\text{TM}}}$ **cannot be recognisable**: otherwise $A_{\text{TM}}$ would be decidable. So $\overline{A_{\text{TM}}}$, "pairs where $M$ does not accept $w$", is a concrete, natural example of a language no Turing machine can even recognise.

### What it means in practice
The theorem does not say that we can never tell whether a specific program halts; for most simple programs we can. It says that **every** method fails on some program. Real tools respond in three ways: they answer only for restricted kinds of programs (for example, loops with a fixed bound), they allow the answer "don't know", or they settle for time limits. Many famous open problems could be settled by a halting checker: a program that searches for a counterexample to Goldbach's conjecture halts if and only if the conjecture is false.

### Common mistakes
The proof does not show that $D$ "crashes"; it shows the assumed decider $H$ cannot exist. Running $D$ on $\langle D\rangle$ is legitimate because programs can take program descriptions as input; compilers do this every day. "Undecidable" is not the same as "unrecognisable": $A_{\text{TM}}$ is recognisable. And the result concerns a single algorithm for all inputs, not individual instances; each specific pair $\langle M, w\rangle$ either halts or does not, and for that one instance a trivial "always yes" or "always no" machine is correct.

### Summary
The halting problem and the acceptance problem for Turing machines are recognisable, by simulation, but undecidable. The proof assumes a decider $H$, builds a contrarian machine $D$ that does the opposite of what each machine does on its own description, and derives a contradiction by running $D$ on itself, which is a diagonal argument. Consequently $\overline{A_{\text{TM}}}$ is not recognisable, and no general method can predict whether every program halts.

@viz g11-tm machine="loops when there is no 1" input="0001" | A recogniser for "contains a 1". On inputs without a 1 it runs forever, and watching it never tells you so.

:::explore
**What to try**
1. Run `0001` and watch it accept after a few steps.
2. Run `000` and keep pressing step or let it run. When would you be sure it will never halt?
3. Run `00000001` and compare: at step 5 the two runs look exactly alike.
4. Switch to "decide 0ⁿ1ⁿ" and run any input: does it ever fail to halt?

**What to notice:** at every moment, the run on `000` looks like a run that might still find a 1 later, just as the run on `00000001` did. Watching a computation can confirm halting but never non-halting, which is why simulation only gives a recogniser. For this tiny machine, reading its code tells us it loops forever on `000`; the halting theorem says no single algorithm can do such reasoning correctly for every machine.
:::

:::formulas
$$A_{\text{TM}} = \{\langle M,w\rangle : M \text{ accepts } w\},\quad \textit{HALT}_{\text{TM}} = \{\langle M,w\rangle : M \text{ halts on } w\}$$
$$D(\langle M\rangle) = \begin{cases}\text{reject} & \text{if } M \text{ accepts } \langle M\rangle\\ \text{accept} & \text{otherwise}\end{cases}$$
$$D \text{ accepts } \langle D\rangle \iff D \text{ does not accept } \langle D\rangle$$
$$A_{\text{TM}} \text{ recognisable, undecidable};\quad \overline{A_{\text{TM}}} \text{ not recognisable}$$
:::

:::thm $A_{\text{TM}}$ is undecidable
No Turing machine decides $A_{\text{TM}}$.
:::

:::proof
Suppose $H$ decides $A_{\text{TM}}$. Define $D$: on input $\langle M\rangle$, run $H$ on $\langle M,\langle M\rangle\rangle$ and output the opposite answer. $D$ halts on all inputs. Then $D$ accepts $\langle D\rangle$ iff $H$ rejects $\langle D,\langle D\rangle\rangle$ iff $D$ does not accept $\langle D\rangle$, a contradiction.
:::

:::thm The halting problem is undecidable
$\textit{HALT}_{\text{TM}}$ is undecidable.
:::

:::proof
Suppose $R$ decides $\textit{HALT}_{\text{TM}}$. Decide $A_{\text{TM}}$ as follows: on $\langle M,w\rangle$, run $R$. If it rejects, $M$ loops on $w$, so reject. If it accepts, simulate $M$ on $w$, which is guaranteed to halt, and accept iff $M$ accepts. This decides $A_{\text{TM}}$, contradicting the previous theorem.
:::

:::thm A non-recognisable language
$\overline{A_{\text{TM}}}$ is not Turing-recognisable.
:::

:::proof
$A_{\text{TM}}$ is recognisable. If $\overline{A_{\text{TM}}}$ were also recognisable, $A_{\text{TM}}$ would be decidable by the decidable-iff-recognisable-and-co-recognisable theorem. It is not, so $\overline{A_{\text{TM}}}$ is not recognisable.
:::

:::steps Fill in the diagonal for three machines and build $D$'s answers
1. Suppose $M_1$ accepts every input, $M_2$ rejects every input, and $M_3$ accepts exactly the descriptions of even length, with $|\langle M_3\rangle|$ even.
2. Diagonal entries: $M_1$ on $\langle M_1\rangle$: accept. $M_2$ on $\langle M_2\rangle$: reject. $M_3$ on $\langle M_3\rangle$: accept.
3. $D$ flips each: reject $\langle M_1\rangle$, accept $\langle M_2\rangle$, reject $\langle M_3\rangle$.
4. So $D$ differs from $M_1$, $M_2$ and $M_3$ on their own descriptions, and the same holds for every machine in the list.
:::

:::steps Turn Goldbach's conjecture into a halting question
1. Write a program $G$ that tests $n = 4, 6, 8, \dots$ in turn, checking whether $n$ is a sum of two primes (a finite check for each $n$).
2. If some $n$ fails, $G$ halts and prints it.
3. $G$ halts iff Goldbach's conjecture is false.
4. A halting decider would settle the conjecture, which illustrates how strong such a decider would be and why its impossibility is believable.
:::

:::mock Exam question
A student claims: "I can decide the halting problem. Run $M$ on $w$ for $10^9$ steps. If it has halted, answer yes; otherwise answer no." Give a precise argument that this method is wrong, using a concrete machine.
:::solution
Let $M$ be a machine that counts from 1 to $10^9 + 1$ (incrementing a counter on its tape) and then halts. It halts on every input, but takes more than $10^9$ steps, so the student's method answers "no", which is wrong. Any fixed time bound $T$ fails in the same way for a machine that deliberately runs for $T + 1$ steps. More generally, by the halting theorem, every algorithm that always halts gives a wrong answer on some input, so no modification of this method can be fully correct.
:::
:::

:::cs
The halting problem explains why compilers cannot detect all infinite loops, why antivirus software cannot perfectly detect all malicious behaviour, and why static analysers (type checkers, linters, termination checkers in proof assistants like Coq and Lean) must be conservative: they reject some correct programs, or answer "unknown", in order to always halt.
:::

:::ml
There is no general algorithm that can look at an arbitrary trained model with tool use or code execution and guarantee it will never perform some behaviour, because such a guarantee would imply deciding properties of arbitrary programs. Practical AI safety work therefore relies on restricted settings, testing and probabilistic guarantees rather than complete verification.
:::

:::real
Your computer's "this program is not responding" dialog cannot know whether the program is stuck forever or just slow. It waits for a while and then asks you, because no software can decide in general whether the program will ever respond.
:::

:::quiz
? Which statement about $A_{\text{TM}}$ is true?
+ it is recognisable but not decidable
- it is decidable
- it is not recognisable
> The universal TM recognises it; the diagonal argument shows it is undecidable.

? In the diagonal proof, what does $D$ do on input $\langle M\rangle$?
- it simulates $M$ on the empty string
+ it does the opposite of what $H$ says $M$ does on $\langle M\rangle$
- it always loops
> $D$ disagrees with every machine on that machine's own description.

? Which language is not Turing-recognisable?
- $A_{\text{TM}}$
- $\textit{HALT}_{\text{TM}}$
+ $\overline{A_{\text{TM}}}$
> If it were, $A_{\text{TM}}$ would be decidable.

? A machine runs for exactly 500 steps on input $w$ and then halts. If a "checker" waits only 400 steps, how many more steps would it have needed to see the halt?
= 100
> $500 - 400 = 100$. Any fixed time limit can be beaten by a slower machine.

? How many steps does the recogniser "loops when there is no 1" take to accept $0001$?
= 4
> It reads three 0s (3 steps) and accepts on the 1 (the fourth step).

? Why does simulating $M$ on $w$ not decide the halting problem?
+ if $M$ never halts, the simulation never halts either
- simulation is too slow on modern computers
- the universal TM cannot read encodings
> Simulation confirms halting but can never confirm looping.
:::

## Lesson: Reductions {#reductions}
@summary: Transform one problem into another with a computable function; reductions transfer undecidability from known problems to new ones.

### Solving problems by translating them
Once we know one problem is undecidable, we rarely need another diagonal argument. Instead we **reduce**: we show that if some new problem $B$ could be solved, then the known undecidable problem $A$ could be solved too. Since $A$ cannot be solved, neither can $B$. Reductions are the main tool of computability theory, and in the final unit the same idea, with a time limit added, becomes the foundation of NP-completeness.

### Imagine converting units
Suppose you can only measure temperatures in Celsius, and someone asks whether a liquid is above 212 degrees Fahrenheit. You translate the question: 212 F is 100 C, so you ask your Celsius thermometer whether it is above 100 C. Every Fahrenheit question becomes a Celsius question with the same answer. If Fahrenheit questions were impossible to answer, Celsius ones would have to be impossible too, since one translates into the other. That translation is a reduction.

### Mapping reductions
A function $f:\Sigma^*\to\Sigma^*$ is **computable** if some TM, on every input $w$, halts with $f(w)$ on its tape. Language $A$ is **mapping reducible** to $B$, written $A\le_m B$, if there is a computable $f$ such that for every $w$:
$$w\in A \iff f(w)\in B.$$
Both directions matter: yes-instances must map to yes-instances, and no-instances to no-instances.

A tiny example with numbers: let EVEN and ODD be the binary encodings of even and odd numbers. The function $f(n) = n+1$ is computable (it is the binary-increment machine), and $n$ is even iff $n+1$ is odd, so EVEN $\le_m$ ODD. For instance $f(6) = 7$: 6 is even and 7 is odd; $f(3) = 4$: 3 is not even and 4 is not odd.

:::def Computable function
A function $f$ for which some Turing machine, on every input $w$, halts with $f(w)$ on its tape.
:::

:::def Mapping reduction
A computable function $f$ with $w\in A\iff f(w)\in B$ for all $w$. We write $A\le_m B$: "A is no harder than B".
:::

### What reductions tell us
If $A\le_m B$ and $B$ is decidable, then $A$ is decidable: on input $w$, compute $f(w)$ and run $B$'s decider. Turned around, this is how we prove undecidability:

**If $A\le_m B$ and $A$ is undecidable, then $B$ is undecidable.**

The direction is the most common source of errors. To show a new problem $B$ is hard, reduce a **known hard problem to $B$**, not the other way round. The same holds for recognisability: if $A\le_m B$ and $B$ is recognisable, so is $A$; so if $A$ is not recognisable, neither is $B$.

### Example 1: $A_{\text{TM}}\le_m \textit{HALT}_{\text{TM}}$
Given $\langle M,w\rangle$, construct a machine $M'$: "on input $x$, run $M$ on $x$; if $M$ accepts, accept; if $M$ rejects, loop forever". Let $f(\langle M,w\rangle) = \langle M',w\rangle$. Then $M'$ halts on $w$ exactly when $M$ accepts $w$. Constructing $M'$ is just editing the code of $M$, so $f$ is computable. Hence HALT is undecidable, confirming the last lesson's result in reduction form.

### Example 2: emptiness, $E_{\text{TM}}$
Let $E_{\text{TM}} = \{\langle M\rangle : L(M) = \varnothing\}$. Given $\langle M,w\rangle$, build $M_w$: "on input $x$, ignore $x$, run $M$ on $w$, and accept if $M$ accepts". Then $L(M_w)$ is everything if $M$ accepts $w$, and empty otherwise. So
$$\langle M,w\rangle\in A_{\text{TM}} \iff \langle M_w\rangle\notin E_{\text{TM}}.$$
This maps $A_{\text{TM}}$ to the **complement** of $E_{\text{TM}}$, so $\overline{E_{\text{TM}}}$ is undecidable, and since decidable languages are closed under complement, $E_{\text{TM}}$ is undecidable too. Notice the trick: the reduction never runs $M$; it only builds a new machine description, which always takes finite time.

### Example 3: equivalence, $EQ_{\text{TM}}$
Let $EQ_{\text{TM}} = \{\langle M_1,M_2\rangle : L(M_1) = L(M_2)\}$. Reduce from $E_{\text{TM}}$: map $\langle M\rangle$ to $\langle M, M_\varnothing\rangle$, where $M_\varnothing$ rejects everything. Then $L(M) = L(M_\varnothing)$ iff $L(M) = \varnothing$. So $E_{\text{TM}}\le_m EQ_{\text{TM}}$ and $EQ_{\text{TM}}$ is undecidable. In fact $EQ_{\text{TM}}$ is neither recognisable nor co-recognisable.

### Beyond Turing machines
Reductions reach problems that look nothing like machines. In the **Post correspondence problem**, you are given dominoes with a string on top and a string on the bottom, such as $\left[\frac{b}{ca}\right], \left[\frac{a}{ab}\right], \left[\frac{ca}{a}\right], \left[\frac{abc}{c}\right]$, and you ask whether some sequence of them (with repeats allowed) spells the same string on top and bottom. Here the sequence $\left[\frac{a}{ab}\right]\left[\frac{b}{ca}\right]\left[\frac{ca}{a}\right]\left[\frac{a}{ab}\right]\left[\frac{abc}{c}\right]$ spells $abcaaabc$ on both rows. Deciding this in general is undecidable, by a reduction that encodes a TM's computation history as dominoes. From PCP, further reductions show that ambiguity of context-free grammars and equivalence of CFGs are undecidable, and Hilbert's tenth problem was handled the same way.

### Common mistakes
The direction: $A\le_m B$ with $A$ undecidable shows $B$ undecidable; reducing $B$ to a hard problem shows nothing. The reduction function must be **computable and total**: it must halt on every input, so it may construct machines but must not run them in a way that might loop. The equivalence must hold in **both** directions. And when your reduction maps $A$ to the complement of $B$ (as with $E_{\text{TM}}$), say so: for decidability that is fine, but for recognisability it changes the conclusion.

### Summary
A mapping reduction $A\le_m B$ is a computable translation $f$ with $w\in A\iff f(w)\in B$. Decidability and recognisability flow downward along reductions, so undecidability flows upward: reducing a known undecidable problem, such as $A_{\text{TM}}$, to a new problem proves the new problem undecidable. With this method, halting, emptiness and equivalence of Turing machines, the Post correspondence problem, and problems about grammars are all undecidable.

@viz g11-tm machine="binary increment (+1)" input="110" | The reduction from EVEN to ODD is the computable function f(n) = n + 1, computed by this machine.

:::explore
**What to try**
1. Run `110` (six) and check that the output is `111` (seven), an odd number.
2. Run `11` (three), not even, and check that the output `100` (four) is not odd.
3. Try several inputs and confirm that the machine halts on every one.

**What to notice:** the output's last bit is 1 exactly when the input's last bit was 0, so "input even" and "output odd" always agree: that is the condition $w\in A\iff f(w)\in B$. The machine halts on every input, which makes $f$ a **computable** function, the other requirement of a mapping reduction. The undecidability reductions in this lesson are the same thing with a fancier $f$: one that edits machine descriptions.
:::

:::formulas
$$A\le_m B \iff \exists \text{ computable } f\ \forall w:\ w\in A\iff f(w)\in B$$
$$A\le_m B,\ B \text{ decidable} \Rightarrow A \text{ decidable};\qquad A\le_m B,\ A\text{ undecidable}\Rightarrow B\text{ undecidable}$$
$$A\le_m B \iff \overline A\le_m\overline B;\qquad A\le_m B,\ B\le_m C\Rightarrow A\le_m C$$
$$A_{\text{TM}}\le_m\textit{HALT}_{\text{TM}},\quad A_{\text{TM}}\le_m\overline{E_{\text{TM}}},\quad E_{\text{TM}}\le_m EQ_{\text{TM}}$$
:::

:::thm Reductions transfer decidability
If $A\le_m B$ and $B$ is decidable, then $A$ is decidable. If $A\le_m B$ and $B$ is recognisable, then $A$ is recognisable.
:::

:::proof
Let $f$ be the reduction and $M_B$ decide (or recognise) $B$. On input $w$, compute $f(w)$, which halts because $f$ is computable, then run $M_B$ on $f(w)$ and give its answer. Since $w\in A\iff f(w)\in B$, this machine accepts exactly $A$, and it halts whenever $M_B$ does.
:::

:::thm Undecidability of emptiness and equivalence
$E_{\text{TM}}$ and $EQ_{\text{TM}}$ are undecidable.
:::

:::steps Check the reduction EVEN $\le_m$ ODD on three inputs
1. $f(n) = n + 1$.
2. $n = 10$: even; $f = 11$, odd. Both "yes".
3. $n = 7$: not even; $f = 8$, not odd. Both "no".
4. $n = 0$: even; $f = 1$, odd. Both "yes". The equivalence holds in both directions.
:::

:::steps Prove that $\textit{ACCEPT}_\varepsilon = \{\langle M\rangle : M \text{ accepts } \varepsilon\}$ is undecidable
1. Reduce from $A_{\text{TM}}$. Given $\langle M,w\rangle$, build $M_w$: "on any input, erase it, write $w$, run $M$ on $w$".
2. $M_w$ accepts $\varepsilon$ iff $M$ accepts $w$.
3. Building $M_w$ from $\langle M, w\rangle$ is computable (it only writes code).
4. So $A_{\text{TM}}\le_m\textit{ACCEPT}_\varepsilon$, and $\textit{ACCEPT}_\varepsilon$ is undecidable.
:::

:::steps Verify the PCP solution from the article
1. Top strings in order: $a$, $b$, $ca$, $a$, $abc$, giving $abcaaabc$.
2. Bottom strings: $ab$, $ca$, $a$, $ab$, $c$, giving $abcaaabc$.
3. Both rows spell the same 8-symbol string, so this instance is a yes-instance.
:::

:::mock Exam question
Show that $\textit{REGULAR}_{\text{TM}} = \{\langle M\rangle : L(M) \text{ is regular}\}$ is undecidable by reduction from $A_{\text{TM}}$.
:::solution
Given $\langle M,w\rangle$, build $R$: "on input $x$: if $x$ has the form $0^n1^n$, accept. Otherwise run $M$ on $w$ and accept if $M$ accepts."
If $M$ accepts $w$, $R$ accepts every string, so $L(R) = \Sigma^*$, which is regular. If $M$ does not accept $w$, $R$ accepts exactly $\{0^n1^n\}$, which is not regular.
So $\langle M,w\rangle\in A_{\text{TM}}\iff\langle R\rangle\in\textit{REGULAR}_{\text{TM}}$, and $f(\langle M,w\rangle) = \langle R\rangle$ is computable because it only writes a machine description. Hence $A_{\text{TM}}\le_m\textit{REGULAR}_{\text{TM}}$, and $\textit{REGULAR}_{\text{TM}}$ is undecidable.
:::
:::

:::cs
Reductions are how computer scientists classify problems. Proving that a static-analysis question (does this variable ever become null? is this code reachable?) is undecidable is done by reducing the halting problem to it, which tells tool builders that they must approximate. The same technique, with polynomial-time functions, underlies NP-hardness proofs.
:::

:::ml
Many ML problems are solved by reduction: multi-class classification reduced to several binary problems (one-vs-rest), ranking reduced to pairwise classification, and inference in one graphical model reduced to another. "Learning reductions" is an area that studies how errors transfer through such translations.
:::

:::real
If you can parallel park a car, you can park a small van: the van problem reduces to the car problem with a few adjustments. Conversely, if an expert shows that parking the van in some spot is impossible, and every car instance can be translated into that van instance, then the car instance is impossible too. Reductions carry both good news and bad news.
:::

:::quiz
? To prove a new problem $B$ is undecidable using a known undecidable problem $A$, you show...
+ $A\le_m B$
- $B\le_m A$
- $A$ and $B$ have the same size
> Hardness flows from $A$ up to $B$.

? In a mapping reduction $f$ from $A$ to $B$, which must hold?
- $w\in A\Rightarrow f(w)\in B$ only
+ $w\in A\iff f(w)\in B$, and $f$ is computable
- $f$ must be one-to-one
> Yes-instances map to yes-instances and no-instances to no-instances, by a halting computation.

? Using the reduction $f(n) = n+1$ from EVEN to ODD, what is $f(12)$?
= 13
> 12 is even and 13 is odd, as required.

? $A_{\text{TM}}$ reduces to which language via the machine $M_w$ that ignores its input?
+ the complement of $E_{\text{TM}}$
- $E_{\text{TM}}$ directly
- $A_{\text{DFA}}$
> $M$ accepts $w$ iff $L(M_w)$ is non-empty.

? How many dominoes are used in the PCP solution in the article?
= 5
> $\frac{a}{ab}, \frac{b}{ca}, \frac{ca}{a}, \frac{a}{ab}, \frac{abc}{c}$.

? If $A\le_m B$ and $B$ is decidable, then $A$ is...
+ decidable
- undecidable
- not recognisable
> Compute $f(w)$ and run $B$'s decider.
:::
## Lesson: Rice's theorem {#rice-theorem}
@summary: Every non-trivial question about the language a program recognises is undecidable; questions about the code itself may still be decidable.

### One theorem instead of a hundred reductions
In the last lesson we proved, one at a time, that emptiness, equivalence and regularity of Turing machine languages are undecidable. Each proof built a machine that behaved one way if $M$ accepted $w$ and another way otherwise. The pattern is so regular that it can be turned into a single theorem, proved by Henry Rice in 1953. **Rice's theorem** says that *every* interesting question about the behaviour of programs, in the sense of what they accept, is undecidable. It is the reason no tool can perfectly answer "does this program ever output a password?" or "does this function compute the same thing as that one?".

### Imagine judging books by their content
Suppose a library hires you to sort books automatically. Some rules depend only on the cover: "does the book have more than 300 pages?" You can always check that quickly. Others depend on the story: "does the hero survive at the end?" Two books printed in different fonts but with the same story must get the same answer. Rice's theorem says that for programs, every "story" question (about what the program does) is undecidable, unless the answer is the same for every program. "Cover" questions about the code itself are a different matter.

### Semantic properties
A **property** of Turing machine languages is just a set $P$ of languages; a machine $M$ "has the property" if $L(M)\in P$. The property is about the **language**, not the machine, so two machines with the same language either both have it or both lack it. Such properties are called **semantic**. Examples: "$L(M)$ is empty", "$L(M)$ is regular", "$L(M)$ contains the string 101", "$L(M)$ is finite", "$L(M) = \Sigma^*$".

A property is **trivial** if it holds for every recognisable language or for none of them. Trivial properties are decidable for a silly reason: the machine that always says yes (or always says no) decides them.

:::def Semantic property
A set $P$ of Turing-recognisable languages. A TM $M$ has property $P$ when $L(M)\in P$, so machines with the same language agree on it.
:::

:::def Non-trivial property
A property that some recognisable language has and some recognisable language lacks.
:::

### The statement
**Rice's theorem.** Let $P$ be a non-trivial property of Turing-recognisable languages. Then
$$L_P = \{\langle M\rangle : L(M)\in P\}$$
is undecidable.

### The proof idea
We reduce $A_{\text{TM}}$ to $L_P$, generalising the reductions from the last lesson. We may assume the empty language does **not** have $P$ (otherwise use the complement property $\overline P$, which is also non-trivial; if $L_{\overline P}$ is undecidable, so is $L_P$). Because $P$ is non-trivial, some recognisable language $L_0$ **does** have $P$; let $T$ be a machine recognising it.

Given $\langle M,w\rangle$, build a machine $S$: "on input $x$, first run $M$ on $w$. If that accepts, run $T$ on $x$ and accept if $T$ accepts". Two cases:

- If $M$ accepts $w$, then $S$ behaves exactly like $T$, so $L(S) = L_0$, which has $P$.
- If $M$ does not accept $w$, then $S$ accepts nothing, so $L(S) = \varnothing$, which lacks $P$.

So $\langle M,w\rangle\in A_{\text{TM}}\iff\langle S\rangle\in L_P$. Building $S$ is computable (we only write a description; we never run $M$). Therefore $A_{\text{TM}}\le_m L_P$, and $L_P$ is undecidable.

### Using Rice's theorem
To apply the theorem to a set of machines, check two things:

1. **Is it semantic?** Whenever $L(M_1) = L(M_2)$, do $M_1$ and $M_2$ get the same answer?
2. **Is it non-trivial?** Give one recognisable language with the property and one without.

If both hold, the problem is undecidable, with no further work. For "$L(M)$ contains 101": it is semantic, since it depends only on $L(M)$, and non-trivial, since $\Sigma^*$ contains 101 and $\varnothing$ does not. So it is undecidable. For "$L(M)$ is finite": semantic; $\varnothing$ is finite and $\Sigma^*$ is not; undecidable.

### When Rice does not apply
Questions about the **machine** rather than its language can be decidable. "Does $M$ have at least 5 states?" is not semantic: two machines with the same language can have 3 and 50 states. It is decidable by reading the code. "Does $M$ run for more than 10 steps on input $\varepsilon$?" is also not semantic, and it is decidable: simulate $M$ for at most 11 steps. Be careful, though: Rice's theorem **simply does not tell us** anything about non-semantic properties, and each one must be analysed separately. Some are decidable and some are not. For example, "does $M$ ever enter state $q_7$ on input $\varepsilon$?" is not semantic, but it is undecidable by a direct reduction from the halting problem.

Rice's theorem is also about **Turing machines**. For DFAs and CFGs, many semantic questions are decidable: emptiness, finiteness and membership. The theorem bites because Turing machines are so powerful.

### Decidable versus recognisable
Rice's theorem says nothing about recognisability. Some semantic properties are recognisable: "$L(M)$ is non-empty" can be recognised by running $M$ on all strings in parallel (dovetailing) and accepting when any of them accepts. Others, like "$L(M)$ is empty" or "$L(M)$ is infinite", are not even recognisable. Rice's theorem only tells us that none of them is **decidable**.

### Common mistakes
Check that the property is about the language, not the code. "$M$ accepts $\langle M\rangle$" is not a property of $L(M)$ alone in the required sense, so apply the theorem carefully. Check non-triviality with **recognisable** languages: "$L(M)$ is not recognisable" is trivial, because every $L(M)$ is recognisable. Do not use Rice's theorem to conclude that a question about DFAs, grammars or bounded computations is undecidable. And remember that undecidable does not mean that no instance can be answered; it means no single algorithm answers all instances correctly.

### Summary
Rice's theorem states that every non-trivial semantic property of Turing machines, any property of the recognised language that some but not all recognisable languages have, is undecidable. The proof reduces $A_{\text{TM}}$ by building a machine whose language is either $\varnothing$ or a fixed language with the property, depending on whether $M$ accepts $w$. Properties of the code itself, and properties of weaker models such as DFAs, fall outside the theorem and may be decidable.

@viz g11-tm machine="decide palindromes" input="0110" | The transition table is the machine's code; the set of strings it accepts is its language. Rice's theorem is about the second, not the first.

:::explore
**What to try**
1. Count the rows of the transition table: that is a property of the code, decidable just by looking.
2. Run `0110`, `010` and `0111` and note which are accepted.
3. Ask: "does this machine's language contain 0110?" and "is this machine's language infinite?".

**What to notice:** the number of states is a syntactic property; a different palindrome machine could have more or fewer states and the same language. Questions in step 3 are semantic. For this particular machine you can answer them by understanding it, but Rice's theorem says that no single algorithm can answer such questions for every Turing machine. The visual shows exactly the dividing line: reading the table is easy, predicting the language in general is impossible.
:::

:::formulas
$$P \text{ semantic}: \ L(M_1) = L(M_2)\Rightarrow\big(\langle M_1\rangle\in L_P\iff\langle M_2\rangle\in L_P\big)$$
$$P \text{ non-trivial}: \ \exists\, L_1\in P,\ L_2\notin P \ \ (L_1, L_2 \text{ recognisable})$$
$$\text{Rice}: \ P \text{ semantic and non-trivial}\Rightarrow L_P = \{\langle M\rangle : L(M)\in P\} \text{ undecidable}$$
$$\text{reduction: } L(S) = \begin{cases}L_0\in P & M \text{ accepts } w\\ \varnothing\notin P & \text{otherwise}\end{cases}$$
:::

:::thm Rice's theorem
If $P$ is a non-trivial property of Turing-recognisable languages, then $\{\langle M\rangle : L(M)\in P\}$ is undecidable.
:::

:::proof
Assume $\varnothing\notin P$ (otherwise replace $P$ by its complement; a set is decidable iff its complement is). Pick a recognisable $L_0\in P$ with recogniser $T$. Map $\langle M,w\rangle$ to $\langle S\rangle$, where $S$ on input $x$ runs $M$ on $w$ and, if $M$ accepts, runs $T$ on $x$ and accepts if $T$ does. If $M$ accepts $w$ then $L(S) = L_0\in P$; otherwise $L(S) = \varnothing\notin P$. The map is computable, so $A_{\text{TM}}\le_m L_P$ and $L_P$ is undecidable.
:::

:::steps Is "$L(M)$ contains at least 3 strings" decidable?
1. Semantic? It depends only on $L(M)$: yes.
2. Non-trivial? $\Sigma^*$ has at least 3 strings; $\varnothing$ has none. Yes.
3. By Rice's theorem it is undecidable.
:::

:::steps Is "$M$ halts within 100 steps on input 0" decidable?
1. Semantic? No: two machines with the same language can take different numbers of steps.
2. So Rice's theorem does not apply.
3. Decide it directly: simulate $M$ on $0$ for at most 100 steps and check whether it has halted. This always finishes, so the problem is decidable.
:::

:::steps Is "$L(M) = L(M)^R$" (the language is closed under reversal) decidable?
1. Semantic: it depends only on $L(M)$.
2. Non-trivial: $\Sigma^*$ equals its reversal; $\{01\}$ does not ($\{01\}^R = \{10\}$).
3. Undecidable by Rice's theorem.
:::

:::mock Exam question
For each set, say whether Rice's theorem applies, and whether the set is decidable: (a) $\{\langle M\rangle : L(M) = \{0,1\}^*\}$; (b) $\{\langle M\rangle : M \text{ has an even number of states}\}$; (c) $\{\langle M\rangle : L(M) \text{ is recognisable}\}$.
:::solution
(a) Semantic, and non-trivial ($\Sigma^*$ has it, $\varnothing$ does not). Rice applies: undecidable.
(b) Not semantic (state count is about the code). Rice does not apply. Decidable: count the states in the encoding.
(c) Semantic but trivial: every $L(M)$ is recognisable, so every machine has the property. The set is all valid encodings, which is decidable.
:::
:::

:::cs
Rice's theorem is why program analysis tools must approximate. A tool that answers "does this program ever divide by zero?" or "is this function pure?" for all programs is impossible, so real analysers are sound but incomplete (they may raise false alarms) or complete but unsound (they may miss bugs), and they operate on abstractions of programs.
:::

:::ml
Questions like "does this neural network implement the same function as that one for all inputs?" are decidable only because networks of fixed size over bounded inputs are finite objects. Once models can run arbitrary code or loop, semantic questions about their behaviour fall under Rice's theorem, so auditing relies on testing and interpretability rather than complete decision procedures.
:::

:::real
App stores cannot build a perfect automatic checker that rejects exactly the apps that will ever leak your contacts. Leaking is a property of behaviour, so by Rice's theorem any automatic reviewer either misses some leaks or wrongly flags some innocent apps, which is why manual review and runtime permissions exist.
:::

:::quiz
? Rice's theorem applies to properties of...
+ the language a TM recognises
- the number of states of a TM
- the running time of a TM
> It is about semantic properties only.

? Is "$L(M)$ contains the string 101" decidable?
- yes
+ no, by Rice's theorem
> Semantic and non-trivial.

? Is "$M$ has exactly 4 states" decidable?
+ yes, by reading the encoding
- no, by Rice's theorem
> It is a syntactic property, outside Rice's theorem.

? A property held by every recognisable language is...
- undecidable
+ trivial, hence decidable
- not semantic
> The machine that always says yes decides it.

? A decider for "$M$ halts within $k$ steps on $\varepsilon$" simulates at most how many steps when $k = 50$?
= 50
> Simulate up to 50 steps and check; it always finishes.

? In the proof of Rice's theorem, if $M$ does not accept $w$, what is $L(S)$?
+ the empty language
- $L_0$
- $\Sigma^*$
> $S$ never gets past running $M$ on $w$, so it accepts nothing.
:::
# Unit: Complexity theory

## Lesson: Time complexity {#time-complexity}
@summary: Measuring the running time of Turing machines as a function of input length, with big-O notation and time classes TIME(t(n)).

### From "can it be done?" to "how fast?"
Computability theory sorted problems into those an algorithm can solve and those it cannot. But a decidable problem whose algorithm needs longer than the age of the universe is not much use. **Complexity theory** asks how much of a resource, usually time, a problem needs. This lesson sets up the measuring stick: the running time of a Turing machine as a function of the length of its input, compared using big-O notation.

### Imagine sorting exam papers
A teacher sorting 30 exam papers by surname might compare every pair, about $30\times29/2 = 435$ comparisons. A cleverer teacher splits the pile, sorts each half and merges them, needing roughly $30\log_2 30\approx 147$ comparisons. With 30 papers both are fine. With a million papers the first method needs about $5\times10^{11}$ comparisons and the second about $2\times10^{7}$. What matters is not the exact count for one input but **how the count grows** as inputs get bigger. That growth rate is what time complexity measures.

### Running time
Let $M$ be a deterministic TM that halts on every input. Its **running time** is the function $t:\mathbb N\to\mathbb N$ where $t(n)$ is the **maximum** number of steps $M$ takes on any input of length $n$. This is **worst-case** analysis: the time is guaranteed for every input of that length. We say $M$ runs in time $t(n)$ or is a $t(n)$-time machine.

Measuring by input **length** is important. For a number $N$ written in binary, the length is about $\log_2 N$ digits, not $N$. An algorithm that takes $N$ steps on the number $N$ is therefore **exponential** in the input length, since $N\approx2^n$.

:::def Running time
For a decider $M$, the function $t(n)$ giving the maximum number of steps $M$ uses on any input of length $n$.
:::

### Big-O notation
Exact step counts depend on details of the machine, so we compare growth rates. We write $f(n) = O(g(n))$ if there are constants $c>0$ and $n_0$ such that $f(n)\le c\,g(n)$ for all $n\ge n_0$: eventually, $f$ is at most a constant multiple of $g$. For example $5n^2+3n+7 = O(n^2)$, since for $n\ge1$ it is at most $15n^2$. We write $f(n) = o(g(n))$ if $f(n)/g(n)\to0$: $f$ grows strictly slower, as in $n\log n = o(n^2)$.

In big-O, only the **fastest-growing term** matters, and constant factors disappear. Logarithm bases do not matter either, since $\log_2 n = \log_2 10\cdot\log_{10}n$. The common rates, from slow to fast, are
$$1,\ \log n,\ \sqrt n,\ n,\ n\log n,\ n^2,\ n^3,\ 2^n,\ n!.$$
Polynomials $n^k$ are often called **feasible**, while exponential functions $2^{n^k}$ quickly become hopeless: $n^3$ at $n = 100$ is a million, while $2^{100}$ is about $1.27\times10^{30}$.

:::def Big-O notation
$f(n) = O(g(n))$ if there exist $c>0$ and $n_0$ with $f(n)\le c\cdot g(n)$ for all $n\ge n_0$.
:::

:::def Time complexity class
$\text{TIME}(t(n))$ is the set of languages decided by some (multitape, deterministic) Turing machine in time $O(t(n))$.
:::

### Analysing a machine: $0^n1^n$
Consider the single-tape crossing-off decider for $\{0^k1^k\}$ from the Turing machine lesson, on an input of length $n$. First it scans the input to check it has the form $0^*1^*$: $O(n)$ steps. Then each round crosses off one 0 and one 1, scanning across the tape and back, which is $O(n)$ steps, and there are at most $n/2$ rounds. Total: $O(n) + (n/2)\cdot O(n) = O(n^2)$. So $\{0^k1^k\}\in\text{TIME}(n^2)$.

Can we do better? A cleverer single-tape machine crosses off **every other** 0 and every other 1 in each pass, checking that the parities of the remaining counts agree. Each pass halves the counts, so there are $O(\log n)$ passes of $O(n)$ steps each: $O(n\log n)$. With **two tapes** it is even simpler: copy the 0s to the second tape, then match them against the 1s in one pass: $O(n)$. It is a theorem that no single-tape machine can do better than $O(n\log n)$ for this language, so here the model makes a real difference.

### How models change time
Different models change running times, but only by limited amounts. A $t(n)$-time multitape TM can be simulated by a single-tape TM in time $O(t(n)^2)$, a **polynomial** change. A $t(n)$-time nondeterministic TM can be simulated deterministically in time $2^{O(t(n))}$, an **exponential** change, as far as anyone knows. That is why the complexity classes in the next lessons are defined to be insensitive to polynomial changes, and why nondeterminism gets its own classes.

### More time means more problems
The **time hierarchy theorem** says that, for well-behaved time bounds, more time really lets you solve more problems: for instance $\text{TIME}(n)\subsetneq\text{TIME}(n^2)\subsetneq\text{TIME}(n^3)\subsetneq\cdots$, and $\text{TIME}(2^n)\subsetneq\text{TIME}(2^{2n})$. The proof is a time-limited version of the diagonal argument from the halting problem: a machine with more time simulates every faster machine on its own description and does the opposite.

### Common mistakes
Measure time in terms of the **length** of the input, not its numeric value; trial division up to $\sqrt N$ looks fast but is exponential in the number of digits. Big-O is an **upper bound**: saying an algorithm is $O(n^3)$ is true even if it is actually $O(n)$, so state the tightest bound you can. Worst-case running time is a maximum over **all** inputs of length $n$, not the time on a typical input. And do not ignore the model: one-tape versus multitape can change $O(n)$ into $O(n\log n)$ or $O(n^2)$, though never polynomial into exponential.

### Summary
The running time of a decider is the worst-case number of steps as a function of input length, compared with big-O notation, which ignores constant factors and lower-order terms. $\text{TIME}(t(n))$ collects the languages decidable in time $O(t(n))$. The single-tape decider for $\{0^n1^n\}$ takes $O(n^2)$, a smarter one $O(n\log n)$, and a two-tape machine $O(n)$. Reasonable deterministic models differ by at most a polynomial factor, nondeterminism may cost an exponential factor, and the time hierarchy theorem shows that extra time really increases power.

@viz bigo | Each curve is a running time. Grow n and watch polynomials stay manageable while exponential and factorial curves explode.

:::explore
**What to try**
1. Set $n = 40$ and compare $n^2$ ($1{,}600$) with $2^n$.
2. Switch to the log y-axis and see how the polynomial curves become nearly straight lines, while $2^n$ and $n!$ keep bending upward.
3. Push $n$ to 1000 and read off $n\log n$ and $n^2$: the crossing-off decider for $0^k1^k$ against the halving decider.

**What to notice:** at $n = 40$, $2^{40}\approx1.1\times10^{12}$, while $n^3$ is only $64{,}000$. On the log axis, every polynomial is eventually dominated by every exponential. At $n = 1000$ the $O(n\log n)$ machine needs about $10^4$ steps where the $O(n^2)$ machine needs $10^6$: both polynomial, but a factor of 100 apart, which is why constant-free big-O still matters for comparing algorithms.
:::

:::formulas
$$t_M(n) = \max_{|w| = n}\ \#\text{steps of } M \text{ on } w$$
$$f = O(g)\iff \exists c,n_0\ \forall n\ge n_0:\ f(n)\le c\,g(n);\qquad f = o(g)\iff f(n)/g(n)\to0$$
$$\text{TIME}(t(n)) = \{L : L \text{ decided in time } O(t(n))\}$$
$$\text{multitape } t \Rightarrow \text{single-tape } O(t^2);\qquad \text{NTM } t\Rightarrow\text{DTM } 2^{O(t)}$$
:::

:::thm Time hierarchy theorem
If $t_1(n)\log t_1(n) = o(t_2(n))$ and $t_2$ is time-constructible, then $\text{TIME}(t_1(n))\subsetneq\text{TIME}(t_2(n))$.
:::

:::thm A lower bound for one tape
Every single-tape TM deciding $\{0^n1^n\}$ needs $\Omega(n\log n)$ time, and $O(n\log n)$ is achievable; with two tapes $O(n)$ is achievable.
:::

:::steps Show that $3n^3 + 20n^2 + 5 = O(n^3)$
1. For $n\ge1$: $20n^2\le20n^3$ and $5\le5n^3$.
2. So $3n^3+20n^2+5\le(3+20+5)n^3 = 28n^3$.
3. With $c = 28$ and $n_0 = 1$ the definition holds.
:::

:::steps Analyse trial division for primality in terms of input length
1. Input: $N$ in binary, length $n\approx\log_2 N$.
2. Trial division tests divisors up to $\sqrt N$, about $\sqrt N = 2^{n/2}$ divisions.
3. So the time is exponential in $n$: for a 2048-bit number, about $2^{1024}$ divisions.
4. Moral: "linear in $N$" or "square root of $N$" can still be exponential in the input length.
:::

:::steps Count the passes of the halving decider on $0^{16}1^{16}$
1. Each pass removes half of the remaining 0s and half of the 1s.
2. Counts go $16\to8\to4\to2\to1\to0$: 5 passes.
3. In general $\lfloor\log_2 k\rfloor+1$ passes, each $O(n)$, for $O(n\log n)$ total.
:::

:::mock Exam question
An algorithm on graphs with $v$ vertices takes $4v^3 + 2^{10}v^2$ steps. (a) Give its big-O running time in terms of $v$. (b) For which $v$ is the second term larger than the first? (c) If the input is an adjacency matrix of length $n = v^2$, give the running time in terms of $n$.
:::solution
(a) $O(v^3)$, the dominant term.
(b) $2^{10}v^2 > 4v^3 \iff 1024 > 4v\iff v < 256$. So for $v < 256$ the "lower-order" term dominates, a reminder that big-O describes large inputs.
(c) $v = \sqrt n$, so $v^3 = n^{3/2}$: the time is $O(n^{1.5})$, which is still polynomial in the input length.
:::
:::

:::cs
Time complexity is how engineers choose algorithms: a database query planner chooses between an $O(n\log n)$ sort-merge join and an $O(n^2)$ nested loop, and a hashing scheme with $O(1)$ expected lookups replaces an $O(\log n)$ search tree only when the constant factors favour it.
:::

:::ml
Training costs in ML are complexity statements: self-attention takes $O(n^2d)$ time for sequence length $n$, which motivated linear-time attention variants; $k$-nearest-neighbours prediction costs $O(nd)$ per query without an index; and exact Gaussian process regression costs $O(n^3)$, which is why sparse approximations exist.
:::

:::real
A delivery company that plans routes by checking every possible order of 15 stops faces $15!\approx1.3\times10^{12}$ orders, which is too many even for a fast computer. Growth rate, not computer speed, decides what is practical.
:::

:::quiz
? Running time is measured as a function of...
+ the length of the input
- the numeric value of the input
- the number of states of the machine
> For numbers in binary, the length is about $\log_2 N$.

? $7n^2 + 100n + 3$ is...
- $O(n)$
+ $O(n^2)$
- not $O(n^3)$
> The dominant term is $n^2$; it is also $O(n^3)$, a weaker bound.

? What is $n^2$ when $n = 1000$?
= 1000000
> $10^6$ steps.

? How many passes does the halving decider make on $0^81^8$?
= 4
> $8\to4\to2\to1\to0$.

? A two-tape TM can decide $\{0^n1^n\}$ in time...
+ $O(n)$
- $O(n\log n)$
- $O(n^2)$
> Copy the 0s to the second tape and match them with the 1s in one pass.

? Simulating a nondeterministic $t(n)$-time machine deterministically is known to take at most...
- $O(t(n))$
- $O(t(n)^2)$
+ $2^{O(t(n))}$
> Breadth-first search over the computation tree.
:::

## Lesson: The class P {#class-p}
@summary: Problems solvable in polynomial time: a robust, model-independent definition of "efficiently solvable".

### What counts as efficient?
Running times like $n$, $n^2$ and $n^3$ are manageable; running times like $2^n$ are not. Complexity theory draws its first big line exactly there. The class **P** contains every problem that can be solved in time bounded by some polynomial in the input length. It is the standard formal meaning of "efficiently solvable", sometimes called the **Cobham-Edmonds thesis**.

### Imagine checking a road map
Suppose you have a map of 500 towns and the roads between them, and you want to know whether you can drive from Ashford to Zennor. You do not need to try every possible route, of which there are astronomically many. Instead you spread outward: mark Ashford, then every town one road away, then every town one road from those, and so on. Each road is looked at a bounded number of times, so the work is roughly proportional to the size of the map. That spreading search is a polynomial-time algorithm, and it puts this problem in P.

### The definition
$$\text{P} = \bigcup_{k\ge1}\text{TIME}(n^k).$$
A language is in P if some deterministic Turing machine decides it in time $O(n^k)$ for some constant $k$.

Why polynomials? Three reasons. **Robustness**: every reasonable deterministic model (single-tape TMs, multitape TMs, RAM machines, real programming languages) simulates the others with polynomial overhead, and a polynomial of a polynomial is a polynomial, so P is the same class in all of them. **Closure**: running a polynomial-time subroutine a polynomial number of times stays polynomial. **Practice**: problems that are in P usually have algorithms with small exponents, and the gap between polynomial and exponential is enormous in practice.

:::def The class P
The set of languages decidable by a deterministic Turing machine in time $O(n^k)$ for some constant $k$.
:::

:::def Polynomial-time algorithm
An algorithm whose worst-case running time is $O(n^k)$ for some constant $k$, where $n$ is the input length.
:::

### Encoding matters, a little
Inputs must be encoded reasonably. Graphs can be given as adjacency matrices or edge lists, which differ in length polynomially, so either is fine. Numbers must be written in **binary** (or any base at least 2), not **unary**: writing $N$ as $N$ ones inflates the input exponentially and makes slow algorithms look fast.

### Example 1: PATH
$\text{PATH} = \{\langle G,s,t\rangle : G \text{ is a directed graph with a path from } s \text{ to } t\}$. Breadth-first search marks $s$, then repeatedly marks every vertex reachable by one edge from a marked vertex, until nothing changes, and accepts if $t$ is marked. With $v$ vertices there are at most $v$ rounds, each scanning all edges, so the time is polynomial; a careful implementation takes $O(v + e)$ steps. Brute force, listing all possible paths, could take exponential time. So PATH $\in$ P.

### Example 2: RELPRIME and Euclid
$\text{RELPRIME} = \{\langle x,y\rangle : \gcd(x,y) = 1\}$. Trying all divisors up to $\min(x,y)$ is exponential in the number of digits. Euclid's algorithm repeatedly replaces $(x,y)$ by $(y, x\bmod y)$ until $y = 0$. Every two steps the larger number at least halves, so the number of steps is at most about $2\log_2 x$, which is linear in the number of digits. For example $\gcd(84, 35)$: $(84,35)\to(35,14)\to(14,7)\to(7,0)$, giving 7, so 84 and 35 are not relatively prime. Each step is a division of $n$-digit numbers, so the total time is polynomial.

### Example 3: every context-free language
The CYK algorithm decides membership for a fixed CNF grammar in $O(n^3)$ time. So every context-free language is in P.

### Example 4: primality
Is a given number prime? For centuries the best known methods were exponential in the number of digits. In 2002, Manindra Agrawal, Neeraj Kayal and Nitin Saxena proved that PRIMES is in P with the AKS algorithm. In practice, randomised tests such as Miller-Rabin are used because they are faster, but the theoretical question was settled.

### Closure properties
P is closed under union, intersection, complement, concatenation and star. For complement, flip the answer of the decider. For concatenation, try all $n+1$ split points and run both deciders on each piece: polynomial. For star, a dynamic programming table over all substrings does the job in polynomial time, just like CYK.

### Beyond P
Not everything is in P. By the time hierarchy theorem, there are decidable problems that need exponential time. And for many important problems, such as finding the shortest tour through cities or satisfying a Boolean formula, nobody knows a polynomial algorithm, but nobody can prove one does not exist. That is the subject of the next lessons.

### Common mistakes
A running time like $O(n^{100})$ is in P but useless in practice; P is a theoretical idealisation, and in practice exponents are usually small. "Polynomial in the value of a number" is not polynomial time; algorithms like that are called **pseudo-polynomial**. Average-case speed does not count: the bound must hold for the worst input. And "we don't know a polynomial algorithm" is not the same as "the problem is not in P".

### Summary
P is the class of problems decidable in polynomial time by a deterministic machine. It is robust across reasonable models and encodings, closed under the usual operations, and captures the practical idea of efficient computation. PATH (by breadth-first search), RELPRIME (by Euclid's algorithm), every context-free language (by CYK) and primality (by AKS) are all in P. Whether many other natural problems are in P is one of the great open questions.

@viz graph graph=sample alg=bfs | Breadth-first search decides PATH in polynomial time: each step marks the vertices one edge further from the start.

:::explore
**What to try**
1. Step through the search and record which vertices are marked after each round.
2. Count how many rounds it takes until nothing new is marked.
3. Pick a target vertex and note the round in which it is first marked.

**What to notice:** the number of rounds is at most the number of vertices, and each round looks at each edge at most once, so the total work is polynomial, matching the PATH analysis in the article. The order of discovery is by distance from the start: BFS never needs to consider whole paths, which is why it avoids the exponential number of routes a brute-force search would try.
:::

:::formulas
$$\text{P} = \bigcup_{k\ge1}\text{TIME}(n^k)$$
$$\text{PATH: BFS in } O(v+e);\qquad \gcd(x,y) = \gcd(y, x\bmod y) \text{ in } O(\log x) \text{ steps}$$
$$\text{CFL}\subseteq\text{P}\ (\text{CYK } O(n^3));\qquad \text{PRIMES}\in\text{P}\ (\text{AKS, 2002})$$
$$\text{poly}(\text{poly}(n)) = \text{poly}(n)$$
:::

:::thm PATH is in P
PATH is decidable in polynomial time by breadth-first search.
:::

:::thm RELPRIME is in P
Euclid's algorithm decides RELPRIME in time polynomial in the number of digits of $x$ and $y$.
:::

:::proof
Let $x\ge y$. After one step the pair is $(y, x\bmod y)$. If $y\le x/2$ then the new first number $y$ is at most $x/2$. If $y > x/2$ then $x\bmod y = x - y < x/2$, so after the second step the first number is less than $x/2$. Either way the first number at least halves every two steps, so there are at most $2\log_2 x + 2$ steps, linear in the number of digits. Each step is a division, computable in polynomial time.
:::

:::thm Closure of P
If $A, B\in$ P then $A\cup B$, $A\cap B$, $\overline A$, $AB$ and $A^*$ are in P.
:::

:::steps Run Euclid's algorithm on $(144, 89)$ and count the steps
1. $(144,89)\to(89,55)\to(55,34)\to(34,21)\to(21,13)\to(13,8)$
2. $\to(8,5)\to(5,3)\to(3,2)\to(2,1)\to(1,0)$.
3. 10 steps, gcd 1, so the pair is relatively prime. Consecutive Fibonacci numbers are the worst case, and even they need only about 1.44 times the number of bits.
:::

:::steps Show that P is closed under concatenation
1. Let $M_A$, $M_B$ decide $A$, $B$ in times $O(n^a)$, $O(n^b)$.
2. On input $w$ of length $n$, for each of the $n+1$ split points $w = xy$, run $M_A$ on $x$ and $M_B$ on $y$.
3. Accept if both accept for some split.
4. Time: $(n+1)\cdot O(n^a + n^b) = O(n^{\max(a,b)+1})$, polynomial.
:::

:::mock Exam question
The problem SUBSET-SUM-UNARY gives a list of positive integers $a_1,\dots,a_k$ and a target $T$, all written in **unary**, and asks whether some subset sums to exactly $T$. Show that it is in P, and explain why this does not show that the usual (binary) SUBSET-SUM is in P.
:::solution
Use dynamic programming: maintain the set $R\subseteq\{0,1,\dots,T\}$ of reachable sums, starting with $R = \{0\}$, and for each $a_i$ replace $R$ by $R\cup\{r + a_i : r\in R, r + a_i\le T\}$. Accept iff $T\in R$. This takes $O(kT)$ steps. In unary, the input length $n$ is at least $T + \sum a_i\ge T$ and at least $k$, so $O(kT) = O(n^2)$: polynomial.
In binary, $T$ can be about $2^n$, so $O(kT)$ is exponential in the input length. The algorithm is only pseudo-polynomial, and binary SUBSET-SUM is in fact NP-complete.
:::
:::

:::cs
Most of an algorithms course is a tour of P: sorting, shortest paths (Dijkstra), minimum spanning trees, maximum flow, matching, linear programming (proved polynomial by the ellipsoid and interior-point methods) and parsing. Knowing a problem is in P is the first step to engineering a fast solution.
:::

:::ml
Many core ML computations are in P: least-squares regression (solving the normal equations in $O(nd^2 + d^3)$), training linear SVMs as convex quadratic programs, and inference in tree-structured graphical models by message passing. Training a general neural network to optimality, by contrast, is NP-hard, which is why we rely on heuristics like gradient descent.
:::

:::real
Satellite navigation computes the fastest route across a country with millions of road segments in a fraction of a second. Shortest paths are in P, and good polynomial algorithms plus preprocessing make them practical at enormous scale.
:::

:::quiz
? P is defined as the union of $\text{TIME}(n^k)$ over all...
+ constants $k\ge1$
- $k\le 3$
- functions $k(n)$
> Each language in P has some fixed polynomial bound.

? Euclid's algorithm on $(84, 35)$ returns which gcd?
= 7
> $(84,35)\to(35,14)\to(14,7)\to(7,0)$.

? Why must numbers be encoded in binary rather than unary when defining P?
+ unary inflates input length exponentially, making slow algorithms look polynomial
- unary cannot represent zero
- Turing machines cannot read unary
> A number $N$ takes $N$ symbols in unary but about $\log_2 N$ in binary.

? Which problem is known to be in P?
+ PRIMES (is $N$ prime?)
- factoring $N$ into primes
- the halting problem
> AKS (2002). No polynomial factoring algorithm is known.

? Trying all split points to show closure under concatenation: how many split points does a string of length 9 have?
= 10
> $n + 1$ ways to split a string of length $n$, including empty pieces.

? A problem has an algorithm running in time $O(2^n)$ but no known polynomial algorithm. What can we conclude?
- it is not in P
+ nothing yet; it might still be in P
- it is undecidable
> Absence of a known algorithm is not a proof of impossibility.
:::
## Lesson: The class NP {#class-np}
@summary: Problems whose yes-answers can be checked quickly given a certificate; equivalently, problems solvable in polynomial time by a nondeterministic machine.

### Finding versus checking
Some problems are hard to solve but easy to check. A Sudoku puzzle can take an hour to solve, but if a friend hands you a completed grid, you can check it in a minute: every row, column and box contains each digit once. A huge number may be hard to factor, but if someone tells you that $91 = 7\times13$, one multiplication confirms it. The class **NP** captures exactly this kind of problem: those whose "yes" answers come with a short proof, a **certificate**, that can be checked quickly.

### Imagine a seating plan
Imagine planning a wedding with 200 guests and a list of pairs who must not sit at the same table. Finding a seating plan that works may take days of trial and error, because the number of possible plans is astronomical. But if the wedding planner hands you a finished plan, you can verify it by going through the list of forbidden pairs once. The plan itself is the certificate, and checking it is fast. Whether finding can always be made as fast as checking is the P versus NP question.

### Verifiers and certificates
A **verifier** for a language $A$ is an algorithm $V$ that takes two inputs, $w$ and a string $c$ called a **certificate** (or witness), such that
$$w\in A \iff \text{there is some } c \text{ with } V \text{ accepting } \langle w,c\rangle.$$
A **polynomial-time verifier** runs in time polynomial in $|w|$. Since it can only read polynomially many symbols, the certificate it uses must be polynomially short as well.

**NP** is the class of languages that have polynomial-time verifiers.

:::def Verifier
An algorithm $V$ such that $w\in A$ exactly when some certificate $c$ makes $V$ accept $\langle w,c\rangle$.
:::

:::def Certificate
A string that proves membership of $w$ in $A$ when checked by a verifier, such as a satisfying assignment or a path.
:::

:::def The class NP
The set of languages that have a polynomial-time verifier; equivalently, the languages decided by a nondeterministic Turing machine in polynomial time.
:::

### Examples
**SAT**: given a Boolean formula, is there an assignment of true and false to its variables that makes it true? Certificate: the assignment. Check: evaluate the formula, which takes time linear in its length. The formula $(p\lor q)\land(\lnot p\lor r)\land(\lnot q\lor\lnot r)$ has the certificate $p$ = false, $q$ = true, $r$ = false: the clauses evaluate to true, true, true.

**HAMPATH**: does a directed graph have a path from $s$ to $t$ visiting every vertex exactly once? Certificate: the ordered list of vertices. Check: every vertex appears exactly once, the list starts at $s$, ends at $t$, and each consecutive pair is an edge.

**CLIQUE**: does a graph contain $k$ vertices that are all joined to each other? Certificate: the $k$ vertices. Check: all $\binom k2$ pairs are edges.

**SUBSET-SUM**: given numbers $S$ and a target $t$, does some subset of $S$ sum to $t$? For $S = \{4, 11, 16, 21, 27\}$ and $t = 25$, the certificate $\{4, 21\}$ is checked by one addition. Without a certificate, a brute-force search would try up to $2^5 = 32$ subsets, and $2^n$ in general.

**COMPOSITES**: is $N$ composite? Certificate: a factor $d$ with $1<d<N$. Check: divide. For $N = 91$, $d = 7$ works.

### The nondeterministic view
NP stands for **nondeterministic polynomial time**. An equivalent definition: $A\in$ NP iff some nondeterministic TM decides $A$ in polynomial time. The two views match. Given a verifier, a nondeterministic machine **guesses** the certificate one symbol at a time (branching on every possible symbol) and then runs the verifier; some branch accepts exactly when a certificate exists. Conversely, given a nondeterministic machine, the certificate is the **sequence of choices** made on an accepting branch, and the verifier simply replays them.

### P is inside NP
Every language in P is in NP: the verifier ignores the certificate and solves the problem directly. So $\text{P}\subseteq\text{NP}$. The other direction, whether every efficiently checkable problem is efficiently solvable, is the **P versus NP** question, one of the seven Millennium Prize Problems with a one-million-dollar prize. Most researchers believe $\text{P}\ne\text{NP}$, but there is no proof.

We also know $\text{NP}\subseteq\text{EXPTIME}$: a deterministic machine can try every certificate of length up to $p(n)$, of which there are $2^{O(p(n))}$, and run the verifier on each. So NP problems are always solvable, just possibly slowly.

### coNP
The class **coNP** contains the complements of NP languages: problems whose **no** answers have short certificates. TAUTOLOGY (is a formula true under every assignment?) is in coNP, since a falsifying assignment proves a formula is not a tautology. Nobody knows whether NP equals coNP. If $\text{P} = \text{NP}$, then both would equal P, since P is closed under complement.

### Common mistakes
NP does **not** mean "not polynomial"; it means nondeterministic polynomial, and it includes all of P. A certificate only has to exist for yes-instances; for no-instances, no certificate works, but we do not need a proof of "no" (that would be coNP). The verifier must run in time polynomial in the length of $w$, not of $c$; long certificates are not allowed. And being in NP is not the same as being hard: sorting is in NP, because it is in P.

### Summary
NP is the class of problems whose yes-instances have certificates that can be checked in polynomial time, or equivalently the problems solved in polynomial time by a nondeterministic Turing machine that guesses a certificate. SAT, HAMPATH, CLIQUE, SUBSET-SUM and COMPOSITES are in NP. $\text{P}\subseteq\text{NP}\subseteq\text{EXPTIME}$, and whether $\text{P} = \text{NP}$ is the most famous open question in computer science. coNP is the class of complements, with short certificates for no-answers.

@viz truth-table expr=(p_∨_q)_∧_(¬p_∨_r)_∧_(¬q_∨_¬r) | Solving SAT by brute force means filling every row. Checking a certificate means evaluating one row.

:::explore
**What to try**
1. Find the rows where the formula is true and count them.
2. Check the article's certificate, $p$ false, $q$ true, $r$ false, by reading that single row.
3. Add a fourth variable to the expression (for example append `_∧_(s_∨_¬s)`) and see how many rows the table needs now.

**What to notice:** exactly 2 of the 8 rows are true: $(p,q,r) = (0,1,0)$ and $(1,0,1)$. Verifying a given row takes one quick evaluation, but finding a true row by brute force means scanning up to $2^n$ rows, and each extra variable doubles the table. That gap between checking one row and searching all rows is the gap between NP verification and the best known solving methods.
:::

:::formulas
$$A\in\text{NP}\iff\exists\ \text{poly-time } V,\ \text{polynomial } p:\ w\in A\iff\exists c,\ |c|\le p(|w|),\ V(\langle w,c\rangle) = \text{accept}$$
$$\text{NP} = \bigcup_k\text{NTIME}(n^k)$$
$$\text{P}\subseteq\text{NP}\subseteq\text{EXPTIME};\qquad \text{coNP} = \{\overline A : A\in\text{NP}\}$$
$$\text{brute force over certificates}: \ 2^{p(n)}\cdot\text{poly}(n)$$
:::

:::thm Verifiers and nondeterministic machines agree
A language has a polynomial-time verifier if and only if it is decided by some nondeterministic polynomial-time Turing machine.
:::

:::proof
Given verifier $V$ running in time $n^k$, build an NTM that on input $w$ nondeterministically writes a string $c$ of length at most $n^k$ and then runs $V$ on $\langle w,c\rangle$, accepting if $V$ does. It accepts iff some certificate exists, in polynomial time. Conversely, given an NTM $N$ running in time $n^k$, let the certificate be the list of nondeterministic choices on an accepting branch; the verifier simulates $N$ on $w$ following those choices and accepts iff that branch accepts. This takes polynomial time.
:::

:::thm P is contained in NP
$\text{P}\subseteq\text{NP}$, and $\text{NP}\subseteq\text{EXPTIME}$.
:::

:::steps Verify a CLIQUE certificate
1. Graph edges: $12, 13, 14, 23, 24, 34, 45$. Claim: $\{1,2,3,4\}$ is a clique of size 4.
2. Pairs to check: $\binom42 = 6$: $12, 13, 14, 23, 24, 34$.
3. All six are edges, so the certificate is valid. The check took 6 lookups, polynomial in the graph size.
:::

:::steps Verify a HAMPATH certificate
1. Graph edges: $s\to a$, $a\to b$, $b\to t$, $s\to b$, $a\to t$. Certificate: $s, a, b, t$.
2. Each of the 4 vertices appears exactly once, it starts at $s$ and ends at $t$.
3. Consecutive pairs $s\to a$, $a\to b$, $b\to t$ are all edges. Valid.
4. A wrong certificate such as $s, b, a, t$ fails, because $b\to a$ is not an edge.
:::

:::mock Exam question
Show that $\textit{DOUBLE-SAT} = \{\langle\varphi\rangle : \varphi \text{ has at least two different satisfying assignments}\}$ is in NP. Then give a certificate showing that $(p\lor q)\land(\lnot p\lor\lnot q)$ is in DOUBLE-SAT.
:::solution
Certificate: two assignments $a_1\ne a_2$. Verifier: check that they differ in some variable and that each makes $\varphi$ true. This is two formula evaluations and one comparison, polynomial in $|\varphi|$, so DOUBLE-SAT $\in$ NP.
For $(p\lor q)\land(\lnot p\lor\lnot q)$ (exactly one of $p,q$ true): $a_1 = (p{=}1, q{=}0)$ gives $(1)\land(1) = 1$, and $a_2 = (p{=}0,q{=}1)$ gives $(1)\land(1) = 1$. They differ, so the formula is in DOUBLE-SAT.
:::
:::

:::cs
NP is the natural home of search problems in software: scheduling, register allocation, package dependency resolution (installing a set of versions that satisfies all constraints), and test generation. Their solutions are easy to check, which is why tools can confidently report "here is a valid solution" even when finding one took exponential worst-case time.
:::

:::ml
Many learning problems are NP problems in disguise: finding the smallest decision tree consistent with data, the sparsest linear model with a given error (best subset selection), or the optimal clustering for $k$-means. A proposed solution is easy to score, but finding the best one is hard, which motivates greedy methods and convex relaxations such as the lasso.
:::

:::real
A teacher checking homework answers works in "verify" mode, while the student solving it works in "search" mode. Crossword and Sudoku puzzles are fun precisely because checking is easy and solving is hard.
:::

:::quiz
? NP stands for...
- not polynomial
+ nondeterministic polynomial time
- numerically polynomial
> It includes all of P.

? For SUBSET-SUM with $S = \{4,11,16,21,27\}$, how many subsets would brute force consider?
= 32
> $2^5 = 32$.

? A certificate for SAT is...
+ an assignment that makes the formula true
- a proof that no assignment works
- the number of variables
> The verifier evaluates the formula under the given assignment.

? Which inclusion is known to hold?
+ $\text{P}\subseteq\text{NP}$
- $\text{NP}\subseteq\text{P}$
- $\text{EXPTIME}\subseteq\text{NP}$
> A polynomial-time decider is a verifier that ignores the certificate.

? What is the smallest prime factor of 91, a certificate that 91 is composite?
= 7
> $91 = 7\times13$.

? TAUTOLOGY (true under every assignment) is naturally in which class?
- NP
+ coNP
- neither
> A single falsifying assignment certifies that a formula is not a tautology.
:::

## Lesson: NP-completeness {#np-completeness}
@summary: Polynomial-time reductions, NP-hard and NP-complete problems: the hardest problems in NP, any one of which would decide P versus NP.

### The hardest problems in NP
In the early 1970s, Stephen Cook and Leonid Levin independently made a startling discovery. Among the problems in NP there are some that are **as hard as all the others combined**: if any one of them has a polynomial-time algorithm, then every problem in NP does, and $\text{P} = \text{NP}$. These problems are called **NP-complete**. Soon afterwards Richard Karp showed that 21 famous problems from graph theory, scheduling and logic were all NP-complete. Today thousands are known. NP-completeness is the standard way to show that a problem is "probably intractable".

### Imagine a universal adapter
Imagine a travel adapter that converts any plug in the world into one standard shape. If you own one charger for that standard shape, you can charge every device. An NP-complete problem is the standard shape: every NP problem can be quickly converted into it, so a fast solver for it would be a fast solver for everything in NP.

### Polynomial-time reductions
A language $A$ is **polynomial-time reducible** to $B$, written $A\le_p B$, if there is a function $f$ computable in polynomial time with
$$w\in A\iff f(w)\in B \quad\text{for all } w.$$
This is the mapping reduction from computability with a time limit. If $A\le_p B$ and $B\in$ P, then $A\in$ P: compute $f(w)$ in polynomial time (so $|f(w)|$ is polynomial in $|w|$) and run $B$'s polynomial algorithm on it. Polynomials compose to polynomials. Reductions are also **transitive**: if $A\le_p B$ and $B\le_p C$ then $A\le_p C$.

:::def Polynomial-time reduction
A polynomial-time computable $f$ with $w\in A\iff f(w)\in B$. We write $A\le_p B$.
:::

### NP-hard and NP-complete
A language $B$ is **NP-hard** if every $A\in$ NP satisfies $A\le_p B$. It is **NP-complete** if, in addition, $B\in$ NP. So NP-complete problems are the hardest problems inside NP; NP-hard problems are at least that hard but may lie outside NP (the halting problem is NP-hard but not in NP, as it is undecidable).

The key consequence: **if any NP-complete problem is in P, then $\text{P} = \text{NP}$**. And if $\text{P}\ne\text{NP}$, then no NP-complete problem has a polynomial algorithm.

:::def NP-hard
A problem to which every problem in NP reduces in polynomial time.
:::

:::def NP-complete
A problem that is in NP and NP-hard.
:::

### How to prove a problem is NP-complete
Proving NP-hardness from scratch means handling every NP problem at once, which is what the Cook-Levin theorem (next lesson) does for SAT. After that, there is a two-step recipe:

1. Show $B\in$ NP by describing a certificate and a polynomial-time verifier.
2. Choose a **known** NP-complete problem $A$ and show $A\le_p B$.

Since every NP problem reduces to $A$, and $A$ reduces to $B$, transitivity makes every NP problem reduce to $B$. Mind the direction: reduce the known hard problem **to** the new problem.

### A first family of reductions
Let $G$ have vertex set $V$ with $n$ vertices. An **independent set** is a set of vertices with no edges between them. A **vertex cover** is a set of vertices touching every edge. A **clique** is a set of vertices all joined to each other.

**INDEPENDENT-SET and VERTEX-COVER.** A set $S$ is independent exactly when $V\setminus S$ is a vertex cover. Indeed, $S$ has no internal edge iff every edge has at least one endpoint outside $S$. So $G$ has an independent set of size $k$ iff it has a vertex cover of size $n - k$. The reduction $f(\langle G,k\rangle) = \langle G,n-k\rangle$ runs in polynomial time. For a graph with 10 vertices, an independent set of size 4 corresponds to a vertex cover of size 6.

**CLIQUE and INDEPENDENT-SET.** The **complement graph** $\overline G$ has an edge exactly where $G$ does not. A clique in $G$ is an independent set in $\overline G$, so $f(\langle G,k\rangle) = \langle\overline G,k\rangle$ reduces CLIQUE to INDEPENDENT-SET. Building $\overline G$ takes $O(n^2)$ time.

Once CLIQUE is shown NP-complete (in the reductions lesson, from 3SAT), these one-line reductions make INDEPENDENT-SET and VERTEX-COVER NP-complete as well.

### What NP-completeness means in practice
Showing a problem is NP-complete is not a reason to give up; it is a reason to change strategy. Options include exact algorithms that are exponential but fast on typical inputs (modern SAT solvers handle millions of variables in industrial instances), approximation algorithms with guaranteed quality (a vertex cover at most twice the optimum, in polynomial time), restricting to special cases that are in P (2-SAT, or independent sets in trees), and heuristics. Also, if $\text{P}\ne\text{NP}$, Ladner's theorem guarantees problems in NP that are neither in P nor NP-complete; factoring and graph isomorphism are suspected examples.

### Common mistakes
The direction of the reduction is the most common error: to prove $B$ is hard, reduce a known hard problem to $B$, never $B$ to a known hard problem. The reduction must preserve both yes and no answers and run in polynomial time. NP-complete requires membership in NP; NP-hard does not. "NP-complete" is a statement about worst cases, so many instances may still be easy. And NP-completeness does not prove that no polynomial algorithm exists; it shows that finding one would prove $\text{P} = \text{NP}$.

### Summary
A polynomial-time reduction $A\le_p B$ translates instances of $A$ into instances of $B$ with the same answer. NP-hard problems are those to which all of NP reduces; NP-complete problems are NP-hard problems in NP. A polynomial algorithm for any NP-complete problem would prove $\text{P} = \text{NP}$. To prove a problem NP-complete, show it is in NP and reduce a known NP-complete problem to it. Independent set, vertex cover and clique are linked by simple reductions using complements.

@viz graph graph=sample | Use this graph to practise the three related problems: independent sets, vertex covers and cliques.

:::explore
**What to try**
1. Find a set of vertices with no edges between any two of them (an independent set). Make it as large as you can.
2. Take all the other vertices: check that every edge touches at least one of them (a vertex cover).
3. Find the largest group of vertices that are all joined to each other (a clique).
4. Count: does (size of your independent set) + (size of your vertex cover) equal the number of vertices?

**What to notice:** the complement of an independent set is always a vertex cover, so the two sizes add up to $n$, which is the reduction $\langle G,k\rangle\mapsto\langle G,n-k\rangle$. Checking each answer is quick, edge by edge, but convincing yourself that your independent set is the **largest** possible is much harder; for big graphs no polynomial method is known, because the problem is NP-complete.
:::

:::formulas
$$A\le_p B\iff\exists f \text{ poly-time}:\ w\in A\iff f(w)\in B$$
$$A\le_p B,\ B\in\text{P}\Rightarrow A\in\text{P};\qquad A\le_p B\le_p C\Rightarrow A\le_p C$$
$$B \text{ NP-complete} \iff B\in\text{NP}\ \land\ \forall A\in\text{NP}: A\le_p B$$
$$S \text{ independent}\iff V\setminus S \text{ vertex cover};\qquad \text{clique in } G\iff\text{independent set in }\overline G$$
:::

:::thm NP-complete problems decide P versus NP
If some NP-complete problem $B$ is in P, then $\text{P} = \text{NP}$.
:::

:::proof
Let $A\in$ NP. Since $B$ is NP-hard, $A\le_p B$ by some $f$ running in time $n^a$, so $|f(w)|\le|w|^a$ (plus a constant). $B$ is decided in time $m^b$. On input $w$, compute $f(w)$ and decide $B$: total time $O(n^a + n^{ab})$, polynomial. So $A\in$ P, and as $A$ was arbitrary, $\text{NP}\subseteq\text{P}$.
:::

:::thm Transitivity
If $A\le_p B$ and $B\le_p C$, then $A\le_p C$. Hence if $A$ is NP-complete, $C\in$ NP and $A\le_p C$, then $C$ is NP-complete.
:::

:::proof
Compose the reductions: $g(f(w))$. $f$ runs in time $n^a$, producing output of length at most $n^a$; $g$ then runs in time $(n^a)^b = n^{ab}$. The composition is polynomial and $w\in A\iff f(w)\in B\iff g(f(w))\in C$.
:::

:::steps Reduce INDEPENDENT-SET to VERTEX-COVER on a path of 5 vertices
1. Path $1-2-3-4-5$, so $n = 5$. Question: is there an independent set of size 3?
2. Reduction output: is there a vertex cover of size $5 - 3 = 2$?
3. $\{2,4\}$ touches every edge $12, 23, 34, 45$: yes, a cover of size 2.
4. Its complement $\{1,3,5\}$ is independent of size 3. Both answers are "yes", as the reduction promises.
:::

:::steps Reduce CLIQUE to INDEPENDENT-SET with the complement graph
1. $G$: vertices $1,2,3,4$, edges $12, 13, 23, 34$. Is there a clique of size 3? Yes: $\{1,2,3\}$.
2. $\overline G$ has the missing edges: $14, 24$ (the complete graph has 6 edges, $G$ has 4, so $\overline G$ has 2).
3. In $\overline G$, $\{1,2,3\}$ has no internal edges: an independent set of size 3. The answers agree.
:::

:::mock Exam question
Suppose you have proved $\text{VERTEX-COVER}\le_p X$ for a new problem $X$. (a) What else must you show to conclude $X$ is NP-complete? (b) A classmate instead proves $X\le_p\text{VERTEX-COVER}$. What does that show? (c) If someone finds an $O(n^4)$ algorithm for $X$, what follows?
:::solution
(a) That $X\in$ NP: give a certificate and a polynomial-time verifier. Together with the reduction from the NP-complete VERTEX-COVER, $X$ is NP-complete.
(b) Only that $X$ is no harder than VERTEX-COVER; in particular $X\in$ NP (if the reduction is polynomial). It says nothing about $X$ being hard.
(c) Since VERTEX-COVER $\le_p X$ and $X\in$ P, VERTEX-COVER $\in$ P, and because VERTEX-COVER is NP-complete, $\text{P} = \text{NP}$.
:::
:::

:::cs
When a software requirement turns out to be NP-complete (optimal timetabling, bin packing of virtual machines onto servers, minimal test suites), engineers switch to approximation algorithms, integer programming solvers or SAT/SMT solvers, and stop searching for an exact polynomial algorithm. Recognising NP-completeness early saves enormous effort.
:::

:::ml
Exact inference in general Bayesian networks, finding the maximum a posteriori assignment in a Markov random field, and training a 3-node neural network to zero error are NP-hard. These results explain why ML relies on approximate inference (variational methods, sampling) and on local optimisation.
:::

:::real
Airlines assigning crews to flights, universities scheduling exams without clashes, and delivery firms loading trucks all face NP-complete problems. They succeed in practice with good heuristics and solvers, not by finding a polynomial algorithm.
:::

:::quiz
? To prove a new problem $B$ is NP-hard, you show...
+ a known NP-complete problem reduces to $B$
- $B$ reduces to a known NP-complete problem
- $B$ has an exponential algorithm
> The hardness flows from the known problem to $B$.

? A graph has 12 vertices. It has an independent set of size 5 exactly when it has a vertex cover of size...
= 7
> $n - k = 12 - 5 = 7$.

? Which problem is NP-hard but not NP-complete?
- SAT
- CLIQUE
+ the halting problem
> It is NP-hard but undecidable, so not in NP.

? If an NP-complete problem is shown to be in P, then...
+ $\text{P} = \text{NP}$
- every problem is decidable
- nothing changes
> Every NP problem reduces to it in polynomial time.

? The complete graph on 5 vertices has 10 edges. If $G$ on 5 vertices has 6 edges, how many edges does $\overline G$ have?
= 4
> $10 - 6 = 4$.

? An NP-complete problem must be...
+ in NP and NP-hard
- outside NP
- solvable in polynomial time
> Both conditions are required.
:::
## Lesson: The Cook-Levin theorem {#cook-levin}
@summary: SAT is NP-complete: any polynomial-time nondeterministic computation can be encoded as a Boolean formula that is satisfiable exactly when the machine accepts.

### The first domino
Reductions let us spread NP-completeness from one problem to another, but the chain has to start somewhere. Some problem must be shown NP-hard **directly**, by reducing every NP problem to it at once. In 1971 Stephen Cook proved this for SAT, the satisfiability problem for Boolean formulas; Leonid Levin found the same result independently in the Soviet Union. The **Cook-Levin theorem** is the first domino, and every later NP-completeness proof leans on it.

### Imagine a film strip
Imagine filming a Turing machine at work, one frame per step. Each frame shows the tape, the head position and the state. A computation is correct if the first frame shows the input, each frame follows legally from the previous one, and some frame shows the accept state. Checking that a film is legitimate is a **local** job: you only ever compare a small patch of one frame with the patch just below it. The Cook-Levin proof writes these local checks as a Boolean formula. The formula is satisfiable exactly when some legitimate accepting film exists.

### What we need to show
SAT is in NP: the certificate is a satisfying assignment, checked by evaluating the formula. The hard part is NP-hardness. Take any language $A\in$ NP, decided by a nondeterministic TM $N$ in time $n^k$ (we can arrange $n^k$ exactly, by padding). For each input $w$ of length $n$, we must build, in polynomial time, a formula $\varphi_w$ such that
$$\varphi_w \text{ is satisfiable}\iff N \text{ accepts } w.$$

### The tableau
An accepting computation of $N$ on $w$ takes at most $n^k$ steps and so uses at most $n^k$ tape cells. Write its configurations as the rows of an $n^k\times n^k$ table, the **tableau**: row 1 is the start configuration, row $i+1$ follows from row $i$ by one move of $N$, and each row is a configuration written as a string with the state symbol placed just before the head's cell, framed by a boundary symbol $\#$ at each end. If $N$ accepts earlier, the last configuration is simply repeated.

Each cell holds one symbol from $C = Q\cup\Gamma\cup\{\#\}$. For every cell $(i,j)$ and symbol $s\in C$ we create a Boolean variable $x_{i,j,s}$ meaning "cell $(i,j)$ contains $s$". With an $n^k\times n^k$ tableau there are $n^{2k}\cdot|C|$ variables. For example, if $n^k = 10$ and $|C| = 20$, there are $100$ cells and $2{,}000$ variables. Since $N$ is fixed, $|C|$ is a constant, so the number of variables is polynomial in $n$.

:::def Tableau
An $n^k\times n^k$ table whose rows are the successive configurations of a nondeterministic TM on input $w$, from the start configuration to (possibly) an accepting one.
:::

### The four parts of the formula
$\varphi_w = \varphi_{\text{cell}}\land\varphi_{\text{start}}\land\varphi_{\text{move}}\land\varphi_{\text{accept}}$.

**$\varphi_{\text{cell}}$: each cell holds exactly one symbol.** For each cell, "at least one symbol" is the clause $\bigvee_{s\in C}x_{i,j,s}$, and "at most one" is $\bigwedge_{s\ne t}(\lnot x_{i,j,s}\lor\lnot x_{i,j,t})$. That is $O(|C|^2)$ clauses per cell, so $O(n^{2k})$ in total.

**$\varphi_{\text{start}}$: the first row is the start configuration.** It is a conjunction of single variables: $x_{1,1,\#}\land x_{1,2,q_0}\land x_{1,3,w_1}\land\cdots\land x_{1,n+2,w_n}\land x_{1,n+3,\sqcup}\land\cdots$, ending with $\#$. That is $n^k$ variables.

**$\varphi_{\text{accept}}$: the accept state appears somewhere.** $\bigvee_{i,j}x_{i,j,q_{\text{acc}}}$, one big clause of $n^{2k}$ variables.

**$\varphi_{\text{move}}$: each row follows legally from the one above.** This is the clever part. Look at every $2\times3$ **window** of the tableau: three adjacent cells in one row and the three cells directly below. A window is **legal** if it could appear in a correct computation according to $N$'s transition function. For example, if $\delta(q_1, a)$ includes $(q_2, b, R)$, then the window with top row $q_1\,a\,c$ and bottom row $b\,q_2\,c$ is legal, and a window away from the head, such as $a\,b\,a$ above $a\,b\,a$, is legal because cells away from the head do not change. The key fact is that **if the top row is a configuration and every window is legal, then each row is a legal successor of the row above it**. Since $N$ is fixed, there are only finitely many legal windows, and for each window position we write "the window is one of the legal ones" as a formula of constant size. There are $O(n^{2k})$ window positions.

:::def Legal window
A $2\times3$ block of tableau cells that is consistent with the transition function: it could occur in two consecutive configurations of the machine.
:::

### Why it works
If $N$ accepts $w$, take an accepting branch and fill in its tableau: setting $x_{i,j,s}$ true exactly for the symbols in that tableau satisfies all four parts. Conversely, a satisfying assignment picks one symbol per cell ($\varphi_{\text{cell}}$), the first row is the start configuration ($\varphi_{\text{start}}$), each row legally follows the previous one ($\varphi_{\text{move}}$), and the accept state appears ($\varphi_{\text{accept}}$). So it describes an accepting computation of $N$ on $w$. The whole formula has size $O(n^{2k})$, and it can be written down by a simple program in polynomial time, which makes the construction a polynomial-time reduction from $A$ to SAT.

### 3SAT
The formula above can be put into **conjunctive normal form**: $\varphi_{\text{cell}}$, $\varphi_{\text{start}}$ and $\varphi_{\text{accept}}$ already are, and each constant-size window formula can be converted to CNF with constant blow-up. Long clauses can be split into clauses of exactly three literals using new variables: $(a\lor b\lor c\lor d)$ becomes $(a\lor b\lor z)\land(\lnot z\lor c\lor d)$, which is satisfiable exactly when the original is. So **3SAT**, satisfiability of formulas in CNF with three literals per clause, is also NP-complete. This is the most popular starting point for further reductions. By contrast, **2SAT** is in P, solvable in linear time using implication graphs.

### Common mistakes
The theorem does not say that SAT is hard to solve on typical formulas; modern SAT solvers handle huge industrial instances. It is a worst-case statement. The reduction depends on the fixed machine $N$ for the language $A$, so constants like $|C|$ are fixed while $n$ varies. Checking only that consecutive rows agree away from the head is not enough; the $2\times3$ windows must also capture the head's moves, which is why the window is 3 cells wide. And splitting a long clause into 3-clauses requires fresh variables for each clause; reusing them can change satisfiability.

### Summary
The Cook-Levin theorem states that SAT is NP-complete. For any language decided by a nondeterministic machine in time $n^k$, the reduction encodes a possible computation as an $n^k\times n^k$ tableau with Boolean variables $x_{i,j,s}$, and builds a formula of polynomial size stating that cells hold one symbol each, the first row is the start configuration, every $2\times3$ window is legal, and the accept state appears. The formula is satisfiable exactly when the machine accepts. With a conversion to three literals per clause, 3SAT is NP-complete too.

@viz g11-tm machine="binary increment (+1)" input="1011" | Each step is one row of the tableau. Only the cells next to the head can change, which is why checking 2×3 windows is enough.

:::explore
**What to try**
1. Step the machine and, for each step, write the tape as one row of a table, with the state written just before the head's cell.
2. Compare two consecutive rows: mark the cells that changed.
3. Repeat for several steps, including the carry steps that move left.

**What to notice:** between consecutive rows, at most the cell under the head and its immediate neighbours change: the symbol written, and where the state marker moves. Everything else is copied. That is exactly why legal $2\times3$ windows, checked at every position, are enough to certify that the whole row follows legally. The Cook-Levin formula is a list of such local checks for every window of an $n^k\times n^k$ table.
:::

:::formulas
$$\varphi_w = \varphi_{\text{cell}}\land\varphi_{\text{start}}\land\varphi_{\text{move}}\land\varphi_{\text{accept}}$$
$$\varphi_{\text{cell}} = \bigwedge_{i,j}\Big[\Big(\bigvee_{s\in C}x_{i,j,s}\Big)\land\bigwedge_{s\ne t}(\lnot x_{i,j,s}\lor\lnot x_{i,j,t})\Big]$$
$$\#\text{variables} = n^{2k}\cdot|C|;\qquad |\varphi_w| = O(n^{2k})$$
$$(a\lor b\lor c\lor d)\ \leadsto\ (a\lor b\lor z)\land(\lnot z\lor c\lor d)$$
:::

:::thm Cook-Levin theorem
SAT is NP-complete.
:::

:::proof
SAT is in NP: a satisfying assignment is a certificate checkable in linear time. For NP-hardness, let $A\in$ NP be decided by an NTM $N$ in time $n^k$. Map $w$ to $\varphi_w$ as constructed. If $N$ accepts $w$, the tableau of an accepting branch gives a satisfying assignment. If $\varphi_w$ is satisfied, the true variables define a tableau with one symbol per cell whose first row is the start configuration, every window legal (hence every row a legal successor of the previous one), and containing $q_{\text{acc}}$: an accepting computation. The formula has $O(n^{2k})$ size and is produced by a polynomial-time procedure, so $A\le_p$ SAT.
:::

:::thm 3SAT is NP-complete
Satisfiability of CNF formulas with exactly three literals per clause is NP-complete.
:::

:::proof
3SAT is in NP. Reduce SAT (in the CNF form produced by Cook-Levin) to 3SAT: a clause $(\ell_1\lor\cdots\lor\ell_m)$ with $m > 3$ becomes $(\ell_1\lor\ell_2\lor z_1)\land(\lnot z_1\lor\ell_3\lor z_2)\land\cdots\land(\lnot z_{m-3}\lor\ell_{m-1}\lor\ell_m)$ with fresh $z$s; shorter clauses are padded by repeating a literal. If some $\ell_i$ is true, set the $z$s to satisfy the other clauses of the chain; if all $\ell_i$ are false, the chain forces a contradiction. The output is linear in the input size.
:::

:::steps Count the variables and cells for a small tableau
1. Suppose $n^k = 8$ and $|C| = 15$.
2. Cells: $8\times8 = 64$.
3. Variables: $64\times15 = 960$.
4. Clauses in $\varphi_{\text{cell}}$ per cell: $1 + \binom{15}2 = 1 + 105 = 106$, so $64\times106 = 6{,}784$ in total. Polynomial in $n$, as required.
:::

:::steps Split a 5-literal clause into 3SAT
1. Clause: $(a\lor b\lor c\lor d\lor e)$, $m = 5$, so $m - 3 = 2$ new variables.
2. Output: $(a\lor b\lor z_1)\land(\lnot z_1\lor c\lor z_2)\land(\lnot z_2\lor d\lor e)$.
3. If $c$ is true: set $z_1$ = true (satisfies clause 1), clause 2 holds by $c$, set $z_2$ = false (clause 3 holds by $\lnot z_2$).
4. If all five are false: clause 1 forces $z_1$, clause 2 then forces $z_2$, and clause 3 fails. Satisfiability is preserved.
:::

:::steps Decide whether a window is legal
1. Transition: $\delta(q, 0) = \{(r, 1, R)\}$.
2. Window top: $0\ q\ 0$; bottom: $0\ 1\ r$. The head was on the second 0, it wrote 1 and moved right, so the state symbol now sits before the third cell: legal.
3. Window top: $0\ q\ 0$; bottom: $1\ 1\ r$. The left cell changed although the head was not on it: illegal.
:::

:::mock Exam question
In the Cook-Levin construction, explain why $\varphi_{\text{move}}$ uses windows of size $2\times3$ rather than $2\times1$ (single cells), and estimate the total size of $\varphi_{\text{move}}$ for an $n^k\times n^k$ tableau.
:::solution
A single cell cannot tell whether it should change: that depends on whether the head (the state symbol) is next to it, and which way the head moves. A width-3 window contains the head's cell and both neighbours, so it sees the state, the symbol read, and where the state symbol goes; a $2\times3$ window is the smallest that captures one move of the head.
There are $(n^k-1)(n^k-2) = O(n^{2k})$ window positions, and for each the formula "the window is one of the legal windows" has constant size (the number of legal windows depends only on the fixed machine $N$). So $|\varphi_{\text{move}}| = O(n^{2k})$, polynomial.
:::
:::

:::cs
The Cook-Levin idea, encoding computations as formulas, is the basis of **bounded model checking** and symbolic execution: hardware and software are unrolled for $k$ steps, turned into a SAT formula, and handed to a SAT solver to find bugs. Intel, AMD and Amazon use such tools to verify chips and cloud security policies.
:::

:::ml
Neurosymbolic methods and verification tools encode a neural network with ReLU activations as constraints and ask a SAT or SMT solver whether an input exists that changes the output. This is NP-hard, as the Cook-Levin style encoding suggests, but practical for small networks.
:::

:::real
Sudoku, scheduling and product-configuration puzzles (which options of a car can be combined?) are solved in practice by translating them into SAT formulas and running a SAT solver, the same translation idea the Cook-Levin theorem uses in reverse.
:::

:::quiz
? What is the first problem proved NP-complete by the Cook-Levin theorem?
+ SAT
- CLIQUE
- HAMPATH
> Other problems follow by reductions from SAT or 3SAT.

? An $n^k\times n^k$ tableau with $n^k = 10$ has how many cells?
= 100
> $10\times10$.

? With $100$ cells and $|C| = 20$ symbols, how many variables $x_{i,j,s}$ are there?
= 2000
> One per cell and symbol.

? Why is a $2\times3$ window enough to check a move?
+ only cells next to the head can change in one step
- the tape has only three cells
- each configuration has three states
> The window sees the head's cell and both neighbours.

? How many new variables are needed to split a clause with 6 literals into 3-literal clauses?
= 3
> $m - 3 = 3$.

? Which satisfiability problem is in P?
- 3SAT
+ 2SAT
- SAT
> 2SAT is solvable in linear time with implication graphs.
:::

## Lesson: Classic NP-complete reductions {#np-complete-reductions}
@summary: 3SAT reduces to CLIQUE, VERTEX-COVER, SUBSET-SUM, HAMPATH and 3-COLOURING; how gadgets turn logic into graphs and numbers.

### Spreading the hardness
With 3SAT known to be NP-complete, we can prove other problems NP-complete by reducing 3SAT to them. The art lies in designing **gadgets**: small pieces of graph or number that behave like variables ("choose true or false") and like clauses ("at least one of these must hold"). This lesson walks through the classic reductions from Karp's 1972 paper, which turned NP-completeness from a curiosity into a central idea of computer science.

### Imagine translating a puzzle
Suppose you can only solve jigsaw puzzles, and someone hands you a logic puzzle. If you could design jigsaw pieces so that the jigsaw can be completed exactly when the logic puzzle has a solution, you could solve logic puzzles too. A reduction is that translation. The pieces have to force the right behaviour: a "variable piece" fits in exactly two ways, and a "clause piece" fits only if a neighbouring variable piece is turned the right way.

### 3SAT to CLIQUE
Let $\varphi$ be a 3-CNF formula with $k$ clauses. Build a graph $G$ with $3k$ vertices, one for each literal occurrence, grouped into $k$ triples, one per clause. Join two vertices by an edge **unless** they are in the same clause, or they are contradictory literals such as $x$ and $\lnot x$. Ask whether $G$ has a clique of size $k$.

If $\varphi$ has a satisfying assignment, pick one true literal from each clause. These $k$ vertices lie in different clauses, and no two are contradictory (they are all true), so they form a $k$-clique. Conversely, a $k$-clique must use exactly one vertex per clause (vertices in the same clause are not joined), and contains no contradictory pair, so we can set all its literals true consistently, satisfying every clause. The construction takes $O(k^2)$ time.

Example: $\varphi = (x_1\lor x_1\lor x_2)\land(\lnot x_1\lor\lnot x_2\lor\lnot x_2)\land(\lnot x_1\lor x_2\lor x_2)$ has $k = 3$ clauses, so $G$ has 9 vertices. The assignment $x_1$ = false, $x_2$ = true makes $x_2$ (clause 1), $\lnot x_1$ (clause 2) and $x_2$ (clause 3) true; these three vertices are pairwise joined, a 3-clique.

:::def Gadget
A small component of a reduction that simulates one part of the source problem, such as a variable's choice of value or a clause's requirement.
:::

### 3SAT to VERTEX-COVER
For each variable $x$, create two vertices $x$ and $\lnot x$ joined by an edge (a variable gadget: a cover must take at least one of them). For each clause, create a triangle of three vertices, one per literal (a clause gadget: a cover must take at least two of its three corners). Join each triangle corner to the variable vertex with the same literal. With $m$ variables and $l$ clauses, there are $2m + 3l$ vertices, and we ask for a vertex cover of size $k = m + 2l$.

Given a satisfying assignment, put the true literal of each variable gadget into the cover ($m$ vertices). In each triangle, some corner is joined to a true literal, whose edge is already covered; put the other two corners in the cover ($2l$ vertices). Every edge is covered. Conversely, a cover of size exactly $m + 2l$ must use exactly one vertex per variable edge and two per triangle, and the uncovered corner of each triangle must have its outside edge covered by a variable vertex, which tells us a true literal in that clause.

### 3SAT to SUBSET-SUM
Numbers can simulate logic too. Write numbers in decimal with one digit position per variable and one per clause. For each variable $x_i$ make two numbers $y_i$ (for $x_i$ true) and $z_i$ (for $x_i$ false), both with a 1 in variable position $i$; $y_i$ also has a 1 in each clause position where $x_i$ appears, and $z_i$ a 1 in each clause position where $\lnot x_i$ appears. For each clause add two "slack" numbers with a 1 in its position. The target $t$ has 1 in every variable position and 3 in every clause position. Choosing exactly one of $y_i, z_i$ is forced by the variable digits; a clause digit can reach 3 with the slack numbers only if at least one true literal contributes. Because no digit position ever sums to more than 5, there are no carries, and digits act independently.

### HAMPATH and 3-COLOURING
**HAMPATH** is NP-complete by a reduction in which each variable becomes a "diamond" chain of vertices that a Hamiltonian path can traverse left-to-right (true) or right-to-left (false), and each clause becomes a single vertex that can be visited by a detour only from a chain traversed in the matching direction. From HAMPATH, the **travelling salesman** decision problem ("is there a tour of length at most $L$?") follows easily.

**3-COLOURING** (can the vertices be coloured with 3 colours so that adjacent vertices differ?) is NP-complete via a gadget with a "palette" triangle of colours True, False and Base; each variable is joined to Base so it must be True or False, and a small OR-gadget per clause can be coloured only if one of its literals is True. In contrast, 2-COLOURING is in P: it is just testing whether a graph is bipartite with BFS.

### The family tree
These reductions form a tree rooted at SAT: SAT $\to$ 3SAT $\to$ {CLIQUE, VERTEX-COVER, SUBSET-SUM, HAMPATH, 3-COLOURING}, with INDEPENDENT-SET reached from CLIQUE, TSP from HAMPATH, and KNAPSACK and PARTITION from SUBSET-SUM. Thousands of problems hang off this tree in scheduling, biology, games and logistics.

### Common mistakes
A reduction must work in **both directions**: satisfiable formulas must map to yes-instances and unsatisfiable ones to no-instances. Always check the size: the output must be polynomial in the input, and parameters such as $k = m + 2l$ must be computed, not guessed. In SUBSET-SUM, the digits must not carry, which is why a large enough base is used. And always prove the target problem is in NP; a reduction alone only gives NP-hardness.

### Summary
Classic NP-completeness proofs reduce 3SAT to new problems using gadgets. For CLIQUE, literal occurrences become vertices joined unless they conflict, and a $k$-clique picks one true literal per clause. For VERTEX-COVER, variable edges and clause triangles give a cover of size $m + 2l$ exactly when the formula is satisfiable. SUBSET-SUM encodes variables and clauses as decimal digits, HAMPATH uses direction-choosing chains, and 3-COLOURING uses a palette triangle. Together they make a large family of natural problems NP-complete.

@viz truth-table expr=(x_∨_y_∨_z)_∧_(¬x_∨_¬y_∨_z)_∧_(x_∨_¬z_∨_y) | A 3-CNF formula with 3 clauses. Each satisfying row picks a true literal in every clause, which is a 3-clique in the CLIQUE reduction graph.

:::explore
**What to try**
1. Find a row where the formula is true.
2. For that row, pick one true literal in each of the three clauses.
3. Check that your three literals are not contradictory, so they would be joined pairwise in the 9-vertex reduction graph.
4. Find a false row and see which clause has no true literal.

**What to notice:** every true row gives a choice of one true literal per clause, and such a choice never contains both $x$ and $\lnot x$, so it is a 3-clique in the reduction graph. A false row leaves some clause with all literals false, so no clique can use that clause's triple. The table and the graph answer the same question in two languages, which is exactly what the reduction promises.
:::

:::formulas
$$\text{3SAT}\to\text{CLIQUE}:\ 3k \text{ vertices},\ \text{edge unless same clause or } x,\lnot x;\ \text{target } k$$
$$\text{3SAT}\to\text{VERTEX-COVER}:\ 2m + 3l \text{ vertices},\ \text{target } k = m + 2l$$
$$\text{SUBSET-SUM target}: \ t = \underbrace{1\cdots1}_{m}\underbrace{3\cdots3}_{l}\ (\text{decimal})$$
$$\text{SAT}\to\text{3SAT}\to\{\text{CLIQUE, VC, SUBSET-SUM, HAMPATH, 3COL}\}$$
:::

:::thm CLIQUE is NP-complete
CLIQUE is in NP, and $\text{3SAT}\le_p\text{CLIQUE}$.
:::

:::proof
A $k$-clique is a certificate checked with $\binom k2$ edge lookups, so CLIQUE $\in$ NP. Map $\varphi$ with $k$ clauses to $\langle G,k\rangle$ as described. A satisfying assignment gives one true literal per clause; these are in distinct triples and non-contradictory, so pairwise adjacent. A $k$-clique has at most one vertex per triple, hence exactly one, and no complementary pair, so setting its literals true is consistent and satisfies every clause. $G$ is built in $O(k^2)$ time.
:::

:::thm Karp's NP-complete problems
VERTEX-COVER, INDEPENDENT-SET, SUBSET-SUM, HAMPATH, TSP (decision version) and 3-COLOURING are NP-complete.
:::

:::steps Size of the CLIQUE reduction for a 5-clause formula
1. $k = 5$ clauses, so $3k = 15$ vertices.
2. Vertices in the same clause are never joined: each vertex has at most $15 - 3 = 12$ possible neighbours.
3. Target clique size: $k = 5$.
:::

:::steps Size of the VERTEX-COVER reduction
1. Formula with $m = 4$ variables and $l = 3$ clauses.
2. Vertices: $2m + 3l = 8 + 9 = 17$.
3. Edges: $m$ variable edges, $3l$ triangle edges and $3l$ connecting edges: $4 + 9 + 9 = 22$.
4. Target: $k = m + 2l = 4 + 6 = 10$.
:::

:::steps Build the SUBSET-SUM instance for $(x_1\lor\lnot x_2\lor x_2)$
1. Digit positions: $x_1, x_2, c_1$.
2. $y_1 = 101$ ($x_1$ true, appears in $c_1$); $z_1 = 100$. $y_2 = 011$ ($x_2$ appears in $c_1$); $z_2 = 011$ ($\lnot x_2$ appears in $c_1$).
3. Slack: $001, 001$. Target $t = 113$.
4. For the assignment $x_1$ true, $x_2$ false, take $y_1 + z_2 = 101 + 011 = 112$. The clause digit is 2, so add one slack number: $112 + 001 = 113 = t$. The target is reached exactly, as the reduction promises for a satisfying assignment.
:::

:::mock Exam question
The problem DOMINATING-SET asks: does a graph have a set $D$ of at most $k$ vertices such that every vertex is in $D$ or adjacent to a vertex of $D$? Show it is NP-complete by reduction from VERTEX-COVER (assume the graph has no isolated vertices).
:::solution
In NP: $D$ is a certificate, checked by scanning each vertex's neighbours.
Reduction: given $\langle G,k\rangle$, form $G'$ by adding, for every edge $uv$, a new vertex $w_{uv}$ joined to $u$ and $v$. Output $\langle G',k\rangle$.
If $C$ is a vertex cover of $G$ with $|C|\le k$: every original vertex has an edge, whose covering endpoint is in $C$ and adjacent to it (or it is in $C$); every $w_{uv}$ is adjacent to $u$ or $v$, one of which is in $C$. So $C$ dominates $G'$.
If $D$ dominates $G'$ with $|D|\le k$: replace each $w_{uv}\in D$ by $u$; still dominating and no larger. Now each $w_{uv}$ is dominated by $u$ or $v\in D$, so $D$ covers every edge $uv$: a vertex cover of size $\le k$. The construction is polynomial, so DOMINATING-SET is NP-complete.
:::
:::

:::cs
Recognising a disguised NP-complete problem is a key skill: register allocation is graph colouring, assigning frequencies to radio towers is colouring, and finding a minimal set of servers that touches every service is vertex cover. Libraries and solvers (integer programming, SAT, constraint programming) are the practical response.
:::

:::ml
Feature selection under a budget, finding a minimal set of training examples that explains a model's predictions, and optimal sparse coding are NP-hard via reductions like these, typically from set cover or exact cover. This is why ML uses greedy selection and $\ell_1$ relaxations with approximation guarantees.
:::

:::real
A sports league scheduling matches so that no team plays twice in a week, with venue and TV constraints, faces a problem that reduces from graph colouring. League planners use solvers that handle such instances well in practice, despite NP-completeness.
:::

:::quiz
? In the 3SAT-to-CLIQUE reduction, a formula with 4 clauses gives a graph with how many vertices?
= 12
> $3k = 12$.

? Two vertices of the CLIQUE reduction graph are NOT joined when...
+ they are in the same clause or are contradictory literals
- they are in different clauses
- they are both positive literals
> All other pairs are joined.

? For VERTEX-COVER with $m = 3$ variables and $l = 2$ clauses, what is the target $k$?
= 7
> $k = m + 2l = 3 + 4 = 7$.

? Why does the SUBSET-SUM reduction use digits that never carry?
+ so each digit position can be analysed independently
- so the numbers are small
- because subset sums must be even
> Without carries, each variable and clause digit acts as a separate constraint.

? Which colouring problem is in P?
+ 2-COLOURING
- 3-COLOURING
- both
> 2-colourability is bipartiteness, checked by BFS.

? Every reduction proof of NP-completeness also needs...
+ a proof that the problem is in NP
- an exponential algorithm
- a reduction to 2SAT
> Reductions alone give NP-hardness.
:::
## Lesson: Space complexity {#space-complexity}
@summary: Measuring memory instead of time: PSPACE, Savitch's theorem, PSPACE-completeness of quantified formulas and games, the log-space classes L and NL, and the big picture of complexity classes.

### Memory as a resource
Time is not the only cost of computing. A phone has limited memory, a router processes packets with a tiny buffer, and a database may be far too large to load at once. **Space complexity** measures how many tape cells a computation uses. Space behaves very differently from time, because space can be **reused**: a cell can be overwritten again and again, while a step, once taken, is gone. This lesson introduces the main space classes and fits them into one picture with P and NP.

### Imagine solving a maze with chalk
Imagine exploring a huge maze. One explorer draws chalk marks everywhere she has been, so her "memory" is spread over the whole maze. Another carries only a small notebook with room for a few numbers, and repeatedly asks "can I get from here to there in at most so many steps?", erasing and reusing the notebook. The second explorer is much slower but uses far less memory. Savitch's theorem, below, is exactly this second strategy.

### Definitions
The **space** used by a decider $M$ on inputs of length $n$ is the maximum number of tape cells it scans on any such input, written $s(n)$. For a nondeterministic machine, we take the maximum over all branches.
$$\text{SPACE}(f(n)) = \{L : L \text{ decided by a deterministic TM using } O(f(n)) \text{ space}\},$$
$$\text{NSPACE}(f(n)) = \{L : L \text{ decided by a nondeterministic TM using } O(f(n)) \text{ space}\}.$$
$$\text{PSPACE} = \bigcup_k\text{SPACE}(n^k),\qquad \text{NPSPACE} = \bigcup_k\text{NSPACE}(n^k).$$

:::def Space complexity
For a decider, the function $s(n)$ giving the maximum number of tape cells used on any input of length $n$.
:::

:::def PSPACE
The class of languages decidable by a deterministic Turing machine using a polynomial amount of space.
:::

### Space versus time
A machine that runs for $t$ steps can visit at most $t$ cells, so $\text{TIME}(f(n))\subseteq\text{SPACE}(f(n))$. In particular $\text{P}\subseteq\text{PSPACE}$, and also $\text{NP}\subseteq\text{PSPACE}$: a deterministic machine can try every certificate one after another, **reusing the same space** for each attempt. SAT, for instance, needs only enough space to hold the current assignment and evaluate the formula.

In the other direction, a machine using space $s$ has a limited number of distinct configurations: with $|Q|$ states, $s$ cells and $|\Gamma|$ tape symbols, at most $|Q|\cdot s\cdot|\Gamma|^s$. A decider can never repeat a configuration (it would loop), so its running time is at most that number, which is $2^{O(s)}$. For example, with $|Q| = 5$, $s = 10$ and $|\Gamma| = 2$ there are at most $5\cdot10\cdot2^{10} = 51{,}200$ configurations. So $\text{SPACE}(f(n))\subseteq\text{TIME}(2^{O(f(n))})$ and $\text{PSPACE}\subseteq\text{EXPTIME}$.

### Savitch's theorem
For time, nondeterminism seems to cost an exponential. For space it costs only a **square**. **Savitch's theorem**: for $f(n)\ge\log n$,
$$\text{NSPACE}(f(n))\subseteq\text{SPACE}(f(n)^2).$$
The idea is the notebook explorer. Let $\textsc{CanYield}(c_1,c_2,t)$ ask whether the nondeterministic machine can go from configuration $c_1$ to $c_2$ in at most $t$ steps. If $t = 1$, check directly. Otherwise, try every possible middle configuration $c_m$ and recursively ask $\textsc{CanYield}(c_1,c_m,t/2)$ and $\textsc{CanYield}(c_m,c_2,t/2)$, reusing the space between the two calls. Each level of recursion stores one configuration, $O(f(n))$ cells, and since $t\le2^{O(f(n))}$ the recursion depth is $\log_2 t = O(f(n))$. Total space: $O(f(n))\cdot O(f(n)) = O(f(n)^2)$. As a consequence, $\text{PSPACE} = \text{NPSPACE}$, since the square of a polynomial is a polynomial.

### PSPACE-completeness: quantified formulas and games
A problem is **PSPACE-complete** if it is in PSPACE and every PSPACE problem reduces to it in polynomial time. The standard example is **TQBF**, true quantified Boolean formulas: formulas with $\forall$ and $\exists$ over Boolean variables, such as
$$\forall x\,\exists y\,[(x\lor y)\land(\lnot x\lor\lnot y)].$$
This is true: whatever $x$ is, choose $y = \lnot x$. Swapping the quantifiers gives $\exists y\,\forall x\,[\dots]$, which is false, since no single $y$ works for both values of $x$. A recursive evaluator decides TQBF in linear space by trying both values of each variable in turn and reusing the space.

Quantifiers alternate like moves in a **game**: "there exists a move for me such that for every reply of my opponent there exists a move for me..." That is why many two-player games are PSPACE-complete when generalised to $n\times n$ boards, including generalised geography, Hex and Othello, while some, like generalised chess and Go with certain rules, are even EXPTIME-complete.

### Log space: L and NL
Sublinear space needs care, since the input itself has length $n$. We use a two-tape model: a read-only input tape and a work tape, and count only the work tape. Then $\text{L} = \text{SPACE}(\log n)$ and $\text{NL} = \text{NSPACE}(\log n)$. Logarithmic space is enough for a constant number of counters and pointers into the input: for example, $\{0^n1^n\}$ is in L, by counting the 0s and the 1s in binary and comparing.

PATH (is there a path from $s$ to $t$ in a directed graph?) is in NL: guess the path one vertex at a time, keeping only the current vertex and a step counter, both $O(\log n)$ bits. PATH is **NL-complete** under log-space reductions. By Savitch, NL $\subseteq\text{SPACE}(\log^2 n)$. A configuration graph argument shows NL $\subseteq$ P. Surprisingly, the Immerman-Szelepcsényi theorem shows **NL = coNL**: there is also a log-space nondeterministic way to certify that **no** path exists.

### The big picture
Putting it together:
$$\text{L}\subseteq\text{NL}\subseteq\text{P}\subseteq\text{NP}\subseteq\text{PSPACE} = \text{NPSPACE}\subseteq\text{EXPTIME}.$$
The hierarchy theorems tell us that $\text{NL}\ne\text{PSPACE}$ and $\text{P}\ne\text{EXPTIME}$, so at least one inclusion in each stretch is strict. But which ones are strict is unknown: nobody has even proved $\text{P}\ne\text{PSPACE}$.

### Common mistakes
Space can be reused but time cannot, which is why brute-force search over exponentially many certificates fits in polynomial space. Do not count the read-only input tape in log-space classes. Savitch's theorem squares the space; it does not show that nondeterminism is free. And PSPACE-complete problems are believed to be harder than NP-complete ones, though this, too, is unproved.

### Summary
Space complexity counts tape cells. PSPACE contains P and NP and is contained in EXPTIME. Savitch's theorem shows nondeterministic space $f(n)$ can be simulated in deterministic space $f(n)^2$, so PSPACE = NPSPACE. TQBF and many generalised games are PSPACE-complete. Logarithmic space gives the classes L and NL, with PATH NL-complete and NL = coNL. All these classes fit into one chain from L to EXPTIME, in which some inclusions must be strict, but the exact picture remains open.

@viz g11-tm machine="decide palindromes" input="0110" | Watch how many cells the machine uses versus how many steps it takes. Time grows like n², but space stays about n.

:::explore
**What to try**
1. Run `0110` and note the step count and the number of tape cells the head ever visits.
2. Run `01111110` (twice as long) and compare both numbers.
3. Run `0101010110101010` (length 16) and compare again.

**What to notice:** the head never leaves the input plus one blank on each side, so the space is about $n$ cells, while the step count roughly quadruples each time the length doubles, like $n^2$. The machine keeps reusing the same few cells, erasing the symbols it has matched. That is the asymmetry the article describes: space can be reused, time cannot, which is why $\text{TIME}(f)\subseteq\text{SPACE}(f)$ but the reverse inclusion costs an exponential.
:::

:::formulas
$$\text{TIME}(f)\subseteq\text{SPACE}(f)\subseteq\text{TIME}(2^{O(f)})$$
$$\#\text{configurations}\le|Q|\cdot s\cdot|\Gamma|^s$$
$$\text{Savitch}: \ \text{NSPACE}(f)\subseteq\text{SPACE}(f^2)\ \ (f\ge\log n)$$
$$\text{L}\subseteq\text{NL}\subseteq\text{P}\subseteq\text{NP}\subseteq\text{PSPACE} = \text{NPSPACE}\subseteq\text{EXPTIME}$$
:::

:::thm Savitch's theorem
For any space-constructible $f(n)\ge\log n$, $\text{NSPACE}(f(n))\subseteq\text{SPACE}(f(n)^2)$. In particular $\text{PSPACE} = \text{NPSPACE}$.
:::

:::proof
Let $N$ decide $A$ in nondeterministic space $f(n)$; it has at most $2^{df(n)}$ configurations for some constant $d$, so if it accepts, it does so within $t = 2^{df(n)}$ steps. (We may assume a unique accepting configuration.) The recursive procedure $\textsc{CanYield}(c_1,c_2,t)$ tries every $c_m$ and checks both halves with $t/2$, reusing space. Recursion depth is $\log_2 t = df(n)$, and each level stores $O(f(n))$ cells, so the total is $O(f(n)^2)$. Accept iff $\textsc{CanYield}(c_{\text{start}},c_{\text{accept}},t)$.
:::

:::thm TQBF is PSPACE-complete
The language of true fully quantified Boolean formulas is in PSPACE, and every PSPACE language reduces to it in polynomial time.
:::

:::thm Space hierarchy theorem
For space-constructible $g$ with $f(n) = o(g(n))$, $\text{SPACE}(f(n))\subsetneq\text{SPACE}(g(n))$. Hence $\text{NL}\subsetneq\text{PSPACE}$.
:::

:::steps Evaluate $\forall x\,\exists y\,[(x\lor y)\land(\lnot x\lor\lnot y)]$
1. Case $x = 0$: need $y$ with $(y)\land(1)$: take $y = 1$. True.
2. Case $x = 1$: need $y$ with $(1)\land(\lnot y)$: take $y = 0$. True.
3. Both cases succeed, so the formula is true. The evaluator only ever stores the current values of $x$ and $y$: linear space.
:::

:::steps Bound the number of configurations
1. Machine with $|Q| = 4$ states, tape alphabet $|\Gamma| = 3$, using $s = 5$ cells.
2. Configurations: $4\cdot5\cdot3^5 = 20\cdot243 = 4{,}860$.
3. A decider using this space halts within 4,860 steps, since a repeated configuration would mean an infinite loop.
:::

:::steps Space used by Savitch's simulation
1. Suppose $f(n) = 20$ cells per configuration and $t = 2^{20}$ steps.
2. Recursion depth: $\log_2 t = 20$.
3. Space: about $20\times20 = 400$ cells, compared with $2^{20}\approx10^6$ steps of running time. Space squares; time explodes.
:::

:::mock Exam question
(a) Explain why SAT $\in$ PSPACE using only linear space. (b) Explain why $\text{NP}\subseteq\text{PSPACE}$ in general. (c) Is $\exists x\,\forall y\,[(x\lor y)\land(x\lor\lnot y)]$ true?
:::solution
(a) Try assignments one at a time in binary-counter order, evaluating the formula for each and erasing between tries. Only the current assignment (one bit per variable) and the evaluation workspace are stored: $O(n)$ space, although the time is exponential.
(b) For $A\in$ NP with verifier $V$ and certificates of length $p(n)$, loop over all certificates, reusing the same $p(n)$ cells, and run $V$ (which uses polynomial time, hence polynomial space) on each. Total space is polynomial.
(c) Take $x = 1$: then $(1\lor y)\land(1\lor\lnot y)$ is true for both values of $y$. So the formula is true.
:::
:::

:::cs
Streaming algorithms, which process data in one pass using polylogarithmic memory (counting distinct elements, finding frequent items), live at the low end of the space hierarchy. At the high end, PSPACE-completeness of games and of model checking temporal logic explains why verifying concurrent systems and solving games are so demanding.
:::

:::ml
Memory, not time, is often the binding constraint in deep learning: activation checkpointing trades extra computation for lower memory, exactly the time-space trade-off of this lesson, and game-playing systems such as AlphaZero tackle PSPACE-hard games by learning to search only a tiny part of the game tree.
:::

:::real
Solving a large maze by marking every visited junction uses memory proportional to the maze; following a smarter rule that only remembers your current position and a counter uses tiny memory but may take much longer. Choosing between them is a space-time trade-off.
:::

:::quiz
? Why is $\text{NP}\subseteq\text{PSPACE}$?
+ certificates can be tried one at a time, reusing the same space
- NP problems use no memory
- PSPACE allows nondeterminism
> Space can be reused across attempts; time cannot.

? Savitch's theorem says $\text{NSPACE}(f)\subseteq$...
- $\text{SPACE}(f)$
+ $\text{SPACE}(f^2)$
- $\text{TIME}(f^2)$
> The recursion has depth $O(f)$ with $O(f)$ space per level.

? A machine has 5 states, a 2-symbol tape alphabet and uses 10 cells. How many configurations can it have, at most?
= 51200
> $5\cdot10\cdot2^{10} = 51{,}200$.

? Which formula is true?
+ $\forall x\,\exists y\,[x\ne y]$
- $\exists y\,\forall x\,[x\ne y]$
> For every $x$ choose $y = \lnot x$; but no single $y$ differs from both values.

? Which problem is NL-complete?
+ PATH in directed graphs
- TQBF
- SAT
> Guess the path one vertex at a time with $O(\log n)$ memory.

? Using Savitch's simulation with $f(n) = 30$, roughly how many cells are used?
= 900
> $f^2 = 30^2 = 900$.
:::
