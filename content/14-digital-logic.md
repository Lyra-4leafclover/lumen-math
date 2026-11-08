---
id: digital-logic
title: Binary & Boolean Algebra
tagline: Number systems, two's complement, Boolean algebra and logic gates — the math inside the machine.
desc: How computers represent and compute with numbers. You'll learn binary, octal and hexadecimal, conversions, binary arithmetic, two's complement, bitwise operations, Boolean algebra and simplification, logic gates, and build adders from scratch.
color: #06b6d4
symbol: 01
area: Discrete math
paths: cs
order: 14
---

# Unit: Number systems

## Lesson: Number bases: binary, octal and hexadecimal {#bases}
@summary: Positional notation in any base, converting between decimal, binary, octal and hex, and how many values n bits can hold.

### Why computers count in twos
You count in tens because you have ten fingers. There is nothing special about ten mathematically; it's a historical accident. Computers, on the other hand, are built from billions of tiny switches, and a switch has two states: off or on, low voltage or high voltage, 0 or 1. Building reliable hardware that distinguishes two states is far easier than distinguishing ten. So computers store every number, letter, pixel and instruction in **base 2**, or **binary**. To understand memory sizes, colour codes, network addresses, file formats and much of machine learning hardware, you need to be fluent in reading numbers in other bases.

### Positional notation
Start with something you know well. In the decimal number 3,407, each digit's meaning depends on its **position**:
$$3407 = 3\cdot10^3 + 4\cdot10^2 + 0\cdot10^1 + 7\cdot10^0.$$
The rightmost position is worth $10^0 = 1$, the next is worth 10, then 100, then 1000. The 0 is a placeholder saying "no tens". This is **positional notation** with **base** (or **radix**) 10, and it uses the ten digits 0 to 9.

Nothing forces the base to be 10. In base $b$, we use digits $0, 1, \dots, b - 1$, and the positions are worth $b^0, b^1, b^2, \dots$ from the right. A number written $d_{k}d_{k-1}\dots d_1d_0$ in base $b$ means
$$d_k b^k + d_{k-1}b^{k-1} + \dots + d_1b + d_0.$$
We write the base as a subscript when it isn't clear, as in $1011_2$ or $2F_{16}$.

### Binary
In **binary**, base 2, the digits are 0 and 1, called **bits** (binary digits), and the place values are $1, 2, 4, 8, 16, 32, 64, 128, \dots$, each double the one before. To read a binary number, add the place values where there's a 1:
$$101101_2 = 32 + 8 + 4 + 1 = 45.$$
Counting in binary looks like $0, 1, 10, 11, 100, 101, 110, 111, 1000$: just like decimal, when a position runs out of digits it resets to 0 and carries 1 to the left. So $111_2 + 1 = 1000_2$, the binary version of $999 + 1 = 1000$.

### Converting decimal to binary
There are two reliable methods. The **subtract powers** method: find the largest power of 2 that fits, subtract, and repeat. For 45: $32$ fits (remainder 13), $16$ doesn't, $8$ fits (remainder 5), $4$ fits (remainder 1), $2$ doesn't, $1$ fits. Reading 1s and 0s for $32, 16, 8, 4, 2, 1$ gives $101101$.

The **repeated division** method divides by 2 and records remainders: $45 = 2\cdot22 + 1$, $22 = 2\cdot11 + 0$, $11 = 2\cdot5 + 1$, $5 = 2\cdot2 + 1$, $2 = 2\cdot1 + 0$, $1 = 2\cdot0 + 1$. Reading the remainders **from the last to the first** gives $101101$. Why bottom to top? The first remainder is the ones digit, since it is what's left after removing all multiples of 2, so it belongs on the right. This method works for any base: divide by $b$ repeatedly.

### How many values fit in n bits?
With $n$ bits, each bit has 2 choices, so there are $2^n$ different patterns, representing the unsigned values $0$ to $2^n - 1$. Eight bits, a **byte**, hold $2^8 = 256$ values, 0 to 255. That's why colour channels range from 0 to 255 and why old video games had scores capped at 255. Sixteen bits give 65,536 values and 32 bits about 4.3 billion. Going the other way, to represent $N$ different values you need $\lceil\log_2N\rceil$ bits: 1000 values need 10 bits, since $2^{10} = 1024\ge1000$ but $2^9 = 512 < 1000$.

### Hexadecimal and octal
Binary numbers get long quickly. **Hexadecimal**, base 16, is the standard shorthand. It needs sixteen digits, so after 0 to 9 it uses A = 10, B = 11, C = 12, D = 13, E = 14, F = 15. The key fact is that $16 = 2^4$, so **each hex digit stands for exactly 4 bits**. To convert binary to hex, group bits in fours from the right: $0010\,1101_2 = 2D_{16}$, because $0010 = 2$ and $1101 = 13 = D$. Going back, expand each hex digit into 4 bits: $F3_{16} = 1111\,0011_2$. In code, hex numbers are written with the prefix `0x`, as in `0x2D`. A byte is always exactly two hex digits, from `0x00` to `0xFF`.

**Octal**, base 8, groups bits in threes, since $8 = 2^3$: $101\,101_2 = 55_8$. It's less common today but still appears in Unix file permissions like `chmod 755`.

To convert hex to decimal, use place values $1, 16, 256, \dots$: $2D_{16} = 2\cdot16 + 13 = 45$ and $1A3_{16} = 1\cdot256 + 10\cdot16 + 3 = 419$.

### Binary addition
Adding in binary uses the same column method as decimal with tiny tables: $0 + 0 = 0$, $0 + 1 = 1$, $1 + 1 = 10$ (write 0, carry 1) and $1 + 1 + 1 = 11$ (write 1, carry 1). For example $1011_2 + 0110_2$: right column $1 + 0 = 1$; next $1 + 1 = 10$, write 0 carry 1; next $0 + 1 + 1 = 10$, write 0 carry 1; next $1 + 0 + 1 = 10$, write 0 carry 1; then the final carry. Result $10001_2 = 17$, and indeed $11 + 6 = 17$. Hardware adders, which you'll meet in the gates lesson, implement this column rule directly.

:::def Base
The number $b$ whose powers give the place values in positional notation; digits run from 0 to $b - 1$.
:::

:::def Bit
A binary digit, 0 or 1. A byte is 8 bits.
:::

:::def Hexadecimal
Base 16, with digits 0–9 and A–F; each hex digit corresponds to exactly 4 bits.
:::

:::def Positional notation
Writing a number as digits whose value is digit × (base raised to the position), summed over positions.
:::

:::warn Common mistakes
Reading repeated-division remainders top to bottom instead of bottom to top. Grouping bits for hex from the left instead of the right. Forgetting that $n$ bits reach only $2^n - 1$, not $2^n$. And treating $10_2$ as ten: it is two.
:::

### Summary
In base $b$ the place values are powers of $b$. Binary uses bits with place values $1, 2, 4, 8, \dots$; convert to binary by subtracting powers of 2 or by repeated division, reading remainders upward. $n$ bits give $2^n$ values, $0$ to $2^n - 1$. Hex groups bits in fours and octal in threes, which makes them compact names for binary patterns.

@viz binary bits=8 value=45 | An 8-bit register holding 45. Click bits to flip them and read the unsigned, hex and octal values.

:::explore
**What to try**
1. Read the "sum of lit place values" line and check $32 + 8 + 4 + 1 = 45$.
2. Turn every bit on. What is the largest unsigned value?
3. Press "+1" several times from 7 (binary 00000111) and watch the carry ripple left.
4. Set the value to 0x2D and then 0xF3 by clicking bits, using four bits per hex digit.

**What to notice:** all eight bits on gives 255, which is $2^8 - 1$. Adding 1 to $00000111$ flips the three trailing 1s to 0 and the next 0 to 1, giving $00001000 = 8$, exactly like $999 + 1 = 1000$. The hex readout changes one digit at a time as you edit each group of four bits.
:::

:::formulas
$$(d_k\dots d_1d_0)_b = \sum_{i = 0}^{k}d_i\,b^i$$
$$n\text{ bits represent } 2^n\text{ values: } 0\text{ to } 2^n - 1\qquad\text{bits needed for } N\text{ values} = \lceil\log_2N\rceil$$
$$1\text{ hex digit} = 4\text{ bits}\qquad1\text{ octal digit} = 3\text{ bits}\qquad1\text{ byte} = 8\text{ bits} = 2\text{ hex digits}$$
:::

:::thm Every positive integer has a unique base-b representation
For any integer base $b\ge2$, every positive integer $N$ can be written uniquely as $\sum_{i=0}^k d_ib^i$ with digits $0\le d_i < b$ and leading digit $d_k\ne0$.
:::

:::proof
Existence, by strong induction: if $N < b$, it is a single digit. Otherwise divide: $N = qb + r$ with $0\le r < b$ and $1\le q < N$. By the inductive hypothesis $q$ has a representation; shifting it one place left (multiplying by $b$) and appending $r$ as the last digit represents $N$. Uniqueness: the last digit of any representation of $N$ must be $N\bmod b$, since all other terms are multiples of $b$; removing it and dividing by $b$ leaves a representation of $q$, which is unique by induction.
:::

:::steps Convert 156 to binary and hex
1. Powers of 2: $156 = 128 + 16 + 8 + 4$.
2. Bits for $128, 64, 32, 16, 8, 4, 2, 1$: $10011100_2$.
3. Group in fours: $1001\,1100 = 9C_{16}$. Check: $9\cdot16 + 12 = 156$. ✓
:::

:::steps Convert $3B7_{16}$ to decimal and binary
1. Decimal: $3\cdot256 + 11\cdot16 + 7 = 768 + 176 + 7 = 951$.
2. Binary: expand each digit to 4 bits: $0011\,1011\,0111_2$.
:::

:::steps How many bits are needed to give each of 5000 users a distinct ID?
1. $2^{12} = 4096 < 5000$.
2. $2^{13} = 8192\ge5000$.
3. So $\lceil\log_25000\rceil = 13$ bits.
:::

:::mock Exam question
(a) Convert 200 to binary, octal and hexadecimal. (b) Compute $10110_2 + 1111_2$ in binary and check in decimal. (c) What is the largest number representable with 12 unsigned bits?
:::solution
(a) $200 = 128 + 64 + 8$, so $11001000_2$. Octal: group in threes from the right, $11\,001\,000 = 310_8$ (check $3\cdot64 + 1\cdot8 = 200$). Hex: $1100\,1000 = C8_{16}$ (check $12\cdot16 + 8 = 200$).
(b) $10110_2 = 22$, $1111_2 = 15$. Column addition gives $100101_2 = 32 + 4 + 1 = 37 = 22 + 15$. ✓
(c) $2^{12} - 1 = 4095$.
:::
:::

:::cs
Memory addresses and machine code are printed in hex; colours on the web are three bytes like `#FF8800` (red 255, green 136, blue 0); IPv4 addresses are four bytes; Unix permissions are octal; and UTF-8 encodes characters as 1 to 4 bytes. Knowing that $2^{10} = 1024\approx10^3$ lets you estimate sizes: 1 KiB is 1024 bytes and $2^{32}$ is about 4 billion.
:::

:::ml
Model size depends on how many bits each parameter uses: a 7-billion-parameter model needs about 28 GB in 32-bit floats but about 3.5 GB when **quantized** to 4 bits, since $7\times10^9\times4/8$ bytes $= 3.5\times10^9$ bytes. Tokenizers map text to integer IDs, and a vocabulary of 50,000 tokens needs 16 bits per ID because $2^{16} = 65{,}536\ge50{,}000$.
:::

:::real
Barcodes, QR codes and the music on a CD are all stored as bits. Your internet plan's "megabits per second" is measured in bits while file sizes are in bytes, so divide by 8: a 100 Mbit/s connection downloads at most about 12.5 megabytes per second.
:::

:::quiz
? What is $110101_2$ in decimal?
= 53
> $32 + 16 + 4 + 1 = 53$.

? What is the decimal value of $FF_{16}$?
= 255
> $15\cdot16 + 15 = 255$, the largest value of one byte.

? How many different values can 6 bits represent?
= 64
> $2^6 = 64$, namely 0 to 63.

? Which hex number equals $1010\,0111_2$?
- $A9$
+ $A7$
- $7A$
> $1010 = A$ and $0111 = 7$.

? What is $11_2 + 1_2$ in decimal?
= 4
> $11_2 = 3$, and $3 + 1 = 4 = 100_2$.

? What is $17_8$ in decimal?
= 15
> $1\cdot8 + 7 = 15$.
:::

## Lesson: Negative numbers and two's complement {#twos-complement}
@summary: How computers store negative integers, why two's complement makes subtraction free, its range, sign extension and overflow.

### The problem with a minus sign
On paper, a negative number is just a positive number with a minus sign in front. But a computer register is only a row of bits: there is no extra place to draw a minus sign. We need a way to encode negative numbers using 0s and 1s alone, and ideally a way that lets the same adding circuit handle positive and negative numbers without special cases. **Two's complement** is the encoding that achieves this, and it is used by essentially every modern processor. Understanding it explains strange bugs, like a counter jumping from a large positive number to a large negative one.

### An everyday picture: the odometer
Picture an old car odometer showing 000000 kilometres. Roll it backwards by one and it shows 999999. If the odometer only had to display values from $-500000$ to $499999$, it would be natural to read 999999 as $-1$, 999998 as $-2$, and so on. Adding 1 to 999999 rolls it over to 000000, just as $-1 + 1 = 0$. Two's complement is exactly this idea in binary: a fixed number of digits, arithmetic that wraps around, and the "top half" of patterns reinterpreted as negative.

### First attempts: sign-magnitude and ones' complement
The most obvious idea, **sign-magnitude**, uses the leftmost bit as a sign (0 for plus, 1 for minus) and the rest as the size. In 8 bits, $+5 = 00000101$ and $-5 = 10000101$. Two problems appear. There are two zeros, $00000000$ and $10000000$. And ordinary binary addition gives nonsense: $00000101 + 10000101 = 10001010$, which would mean $-10$, not 0. Hardware would need separate subtraction logic.

**Ones' complement** writes $-x$ by flipping every bit of $x$: $-5 = 11111010$. Addition almost works, but there are still two zeros ($00000000$ and $11111111$) and an awkward "end-around carry".

### Two's complement
In $n$-bit **two's complement**, the leftmost bit has a *negative* place value. For 8 bits the place values are
$$-128,\ 64,\ 32,\ 16,\ 8,\ 4,\ 2,\ 1.$$
So $11111011 = -128 + 64 + 32 + 16 + 8 + 2 + 1 = -5$, and $10000000 = -128$. Numbers starting with 0 are the usual non-negative values. In general an $n$-bit pattern $b_{n-1}\dots b_0$ means
$$-b_{n-1}2^{n-1} + \sum_{i=0}^{n-2}b_i2^i.$$
Equivalently, read the bits as an unsigned number $u$; if the top bit is 1, subtract $2^n$. The pattern $11111011$ is 251 unsigned, and $251 - 256 = -5$.

### The negation rule: flip and add one
To find $-x$, **flip all the bits and add 1**. For $5 = 00000101$: flipping gives $11111010$, and adding 1 gives $11111011$, which we just checked is $-5$. Negating again: flip to $00000100$, add 1, back to $00000101 = 5$.

Why does this work? Flipping all bits of $x$ gives $11111111 - x$, since each bit becomes $1 - b_i$, and $11111111 = 2^n - 1 = -1$ in two's complement. So the flipped value is $-1 - x$, and adding 1 gives $-x$. Another shortcut: copy bits from the right up to and including the first 1, then flip the rest.

### Range
With $n$ bits, two's complement represents integers from $-2^{n-1}$ to $2^{n-1} - 1$. For 8 bits that's $-128$ to $127$; for 32 bits, about $\pm2.1$ billion. There is exactly one zero, and the range is lopsided: $-128$ exists but $+128$ doesn't. Negating $-128$ with flip-and-add-one gives $-128$ back, a classic edge case.

### Why addition just works
The deep reason two's complement is so convenient is **modular arithmetic**. An $n$-bit adder discards any carry out of the top bit, so it really computes sums modulo $2^n$. And in two's complement, the pattern for $-x$ is the unsigned value $2^n - x$, which is congruent to $-x$ mod $2^n$. Since congruence respects addition, the ordinary unsigned adder automatically gives the right signed answer (as long as it's in range).

Try $7 + (-5)$ in 8 bits: $00000111 + 11111011 = 1\,00000010$. Drop the carry out of the top: $00000010 = 2$. Correct. So **subtraction is addition of the negation**, $a - b = a + (\overline{b} + 1)$, and processors need only one adder plus a row of NOT gates.

### Overflow
If the true answer is outside the range, the result wraps around. In 8 bits, $100 + 50 = 150$, but 150 is too big. The adder produces $10010110$, which in two's complement is $150 - 256 = -106$. This is **signed overflow**. It can only happen when adding two numbers of the same sign, and it shows up as a result whose sign is wrong: two positives giving a negative, or two negatives giving a positive. Adding a positive and a negative can never overflow.

### Sign extension
To widen a two's complement number, copy the sign bit into the new positions. $-5$ in 8 bits is $11111011$; in 16 bits it is $11111111\,11111011$. Padding with zeros instead would turn it into 251. Positive numbers get zeros, as usual.

:::def Two's complement
An $n$-bit encoding of integers in which the top bit has place value $-2^{n-1}$; it represents $-2^{n-1}$ to $2^{n-1} - 1$.
:::

:::def Sign bit
The leftmost bit of a signed number; 1 means negative in two's complement.
:::

:::def Overflow
When the true result of an operation lies outside the representable range, so the stored result wraps around.
:::

:::def Sign extension
Widening a two's complement number by copying its sign bit into the new high positions.
:::

:::warn Common mistakes
Negating by flipping bits only and forgetting the "+1". Thinking the range is symmetric. Padding a negative number with zeros when widening it. Treating the carry out of the top bit as overflow: for signed numbers, overflow means the sign came out wrong, not that a carry occurred.
:::

### Summary
Two's complement gives the top bit a negative place value, so $n$ bits cover $-2^{n-1}$ to $2^{n-1} - 1$ with a single zero. Negate by flipping all bits and adding 1. Because the hardware works mod $2^n$, one adder handles both addition and subtraction. Overflow occurs when two same-sign numbers give a result of the opposite sign, and widening uses sign extension.

@viz binary bits=8 value=5 | An 8-bit register holding 5. Watch the unsigned and signed readings as you change bits.

:::explore
**What to try**
1. Press "negate (two's comp.)" and compare the new bits with $00000101$.
2. Press "NOT" on 5, then "+1", and compare with step 1.
3. Set only the leftmost bit to 1 and read both values.
4. Start at 127 (01111111) and press "+1".

**What to notice:** negating 5 gives $11111011$, which reads as 251 unsigned and $-5$ signed: $251 - 256 = -5$. NOT followed by +1 gives the same pattern, confirming "flip and add one". The top bit alone is $-128$, and $127 + 1$ wraps around to $-128$: that wrap is signed overflow.
:::

:::formulas
$$\text{value}(b_{n-1}\dots b_0) = -b_{n-1}2^{n-1} + \sum_{i=0}^{n-2}b_i2^i$$
$$-x = \overline{x} + 1\qquad a - b = a + \overline{b} + 1\pmod{2^n}$$
$$\text{range: } -2^{n-1}\le x\le2^{n-1} - 1\qquad\text{signed value} = u - 2^n\text{ if the top bit is 1}$$
:::

:::thm Flip-and-add-one negates
For any $n$-bit pattern $x$, $\overline{x} + 1\equiv-x\pmod{2^n}$.
:::

:::proof
Each bit of $\overline x$ is $1 - b_i$, so $x + \overline x = \sum_{i=0}^{n-1}2^i = 2^n - 1$. Hence $\overline x + 1 = 2^n - x\equiv-x\pmod{2^n}$. Since the $n$-bit adder works modulo $2^n$, the pattern $\overline x + 1$ behaves as $-x$ in all additions.
:::

:::steps Write $-37$ in 8-bit two's complement
1. $37 = 32 + 4 + 1 = 00100101$.
2. Flip: $11011010$.
3. Add 1: $11011011$. Check: $-128 + 64 + 16 + 8 + 2 + 1 = -37$. ✓
:::

:::steps Compute $12 - 20$ with 8-bit two's complement
1. $12 = 00001100$; $20 = 00010100$, so $-20 = 11101011 + 1 = 11101100$.
2. Add: $00001100 + 11101100 = 11111000$ (no carry out).
3. $11111000 = -128 + 64 + 32 + 16 + 8 = -8$. ✓
:::

:::steps Does $-100 + (-60)$ overflow in 8 bits?
1. The true sum is $-160 < -128$, so it must overflow.
2. Bits: $-100 = 10011100$, $-60 = 11000100$; the sum is $1\,01100000$, and dropping the carry leaves $01100000 = 96$.
3. Two negatives gave a positive: overflow. ($-160 + 256 = 96$.)
:::

:::mock Exam question
Using 6-bit two's complement: (a) What is the range? (b) Encode $-13$. (c) Decode $101010$. (d) Compute $9 + 25$ and say whether it overflows.
:::solution
(a) $-2^5 = -32$ to $2^5 - 1 = 31$.
(b) $13 = 001101$, flip $110010$, add 1: $110011$. Check $-32 + 16 + 2 + 1 = -13$. ✓
(c) $-32 + 8 + 2 = -22$.
(d) $9 = 001001$, $25 = 011001$, sum $100010 = -32 + 2 = -30$. The true sum 34 exceeds 31: two positives gave a negative, so it overflows.
:::
:::

:::cs
In C and Java, `int` is 32-bit two's complement, so `INT_MAX + 1` wraps to `INT_MIN`; the 2038 problem is a 32-bit signed seconds counter overflowing. Binary search once had a famous bug where `(low + high) / 2` overflowed for huge arrays; `low + (high - low) / 2` avoids it. `abs(INT_MIN)` is still negative because $+2^{31}$ isn't representable.
:::

:::ml
Quantized neural networks store weights as 8-bit or 4-bit signed integers, usually two's complement: int8 covers $-128$ to $127$ and int4 covers $-8$ to $7$. Accumulating many int8 products can overflow, so hardware accumulates into 32-bit registers before rescaling.
:::

:::real
A car odometer rolling back from 000000 to 999999 behaves like $-1$ in a fixed-width system. The Ariane 5 rocket was lost in 1996 partly because a 64-bit value was converted to a 16-bit signed integer that couldn't hold it, an overflow that crashed its guidance software.
:::

:::quiz
? What is the 8-bit two's complement value of $11111111$?
= -1
> Unsigned it's 255, and $255 - 256 = -1$.

? What is the most negative 8-bit two's complement number?
= -128
> The range is $-2^7$ to $2^7 - 1$.

? To negate in two's complement you...
- flip the sign bit only
+ flip all bits, then add 1
- flip all bits only
> Flipping alone gives $-x - 1$; adding 1 corrects it.

? What is the 4-bit two's complement value of $1010$?
= -6
> $-8 + 2 = -6$.

? Can adding a positive and a negative number overflow?
- Yes
+ No
> The result lies between the two inputs, so it stays in range.

? What is the largest value in 16-bit two's complement?
= 32767
> $2^{15} - 1 = 32767$.
:::

## Lesson: Bitwise operations, masks and shifts {#bitwise}
@summary: AND, OR, XOR and NOT applied bit by bit, masks for setting, clearing and testing bits, shifts as multiplication by powers of two, and classic bit tricks.

### Logic, one column at a time
A light-switch panel in a theatre has eight switches, each controlling one stage light. The technician wants to turn on lights 2 and 5 without touching the others, or check whether light 7 is on, or flip every light at once. If the panel's state is stored as an 8-bit number, each of these jobs is a single **bitwise operation**. Bitwise operations treat a number not as a quantity but as a row of independent true/false flags, and apply logic to every position at the same time. They are among the fastest instructions a processor has, and they appear in graphics, networking, compression, cryptography, databases and low-level machine learning kernels.

### The four basic operations
Line up two binary numbers and apply a logical connective to each column separately. With $a = 12 = 1100_2$ and $b = 10 = 1010_2$:

**AND** ($a\mathbin{\&}b$): a column is 1 only if both bits are 1. $1100\mathbin\&1010 = 1000 = 8$.

**OR** ($a\mid b$): a column is 1 if at least one bit is 1. $1100\mid1010 = 1110 = 14$.

**XOR** (`a ^ b` in code, $a\oplus b$ in math): a column is 1 if the bits differ. $1100\oplus1010 = 0110 = 6$.

**NOT** ($\sim a$): flip every bit. In 4 bits, $\sim1100 = 0011 = 3$. In a wider register the result depends on the width; in two's complement, $\sim a = -a - 1$, so $\sim12 = -13$.

These are exactly the truth tables of $\land$, $\lor$, $\oplus$ and $\neg$ from the logic course, run in parallel on every bit. Notice that bitwise AND is not the same as logical AND: in many languages `12 && 10` is simply "true", while `12 & 10` is 8.

### Masks: picking out bits
A **mask** is a number chosen so that a bitwise operation affects only selected positions. Number the bits from the right starting at 0, so bit $k$ has place value $2^k$. The mask for bit $k$ alone is $1 \ll k$, a 1 shifted left $k$ places; for bit 3 it is $00001000 = 8$.

To **set** bit $k$ (turn it on): `x | (1 << k)`. OR with 1 forces a 1, and OR with 0 leaves bits unchanged.

To **clear** bit $k$ (turn it off): `x & ~(1 << k)`. The mask $\sim(1 \ll k)$ has a 0 only at position $k$, and AND with 0 forces 0 while AND with 1 keeps the bit.

To **toggle** bit $k$: `x ^ (1 << k)`. XOR with 1 flips, XOR with 0 keeps.

To **test** bit $k$: `(x >> k) & 1`, or check whether `x & (1 << k)` is non-zero.

For example, starting from $x = 01010010$ (82): setting bit 0 gives $01010011$ (83), clearing bit 4 gives $01000010$ (66), and testing bit 6 gives 1.

Masks with several 1s extract a field. `x & 0xF` keeps the lowest 4 bits (the last hex digit), and `(x >> 4) & 0xF` gives the next 4. Colour code $\texttt{0xFF8800}$ has its green channel at `(c >> 8) & 0xFF` $= \texttt{0x88} = 136$.

### Shifts
The **left shift** `x << k` moves every bit $k$ places to the left, filling with zeros on the right. Each position is worth twice the one to its right, so shifting left by $k$ multiplies by $2^k$: $5 \ll 3 = 101000_2 = 40 = 5\cdot8$. Bits pushed off the left end are lost, which is overflow.

The **right shift** `x >> k` moves bits right, dropping the lowest $k$ bits. For non-negative numbers this is division by $2^k$, rounded down: $45 \gg 2 = 1011_2 = 11 = \lfloor45/4\rfloor$. For signed numbers there are two kinds. A **logical** shift fills with zeros. An **arithmetic** shift copies the sign bit, so negative numbers stay negative: $-8 \gg 1 = -4$. In Java, `>>` is arithmetic and `>>>` is logical.

### Useful identities and tricks
Because XOR flips exactly where bits differ, $x\oplus x = 0$ and $x\oplus0 = x$, and XOR is associative and commutative. So $a\oplus b\oplus a = b$: XOR-ing twice with the same value cancels. This is the basis of the "find the one number that appears once" puzzle, simple stream ciphers and RAID parity disks, where a lost disk is rebuilt by XOR-ing the survivors.

The expression `x & (x - 1)` **clears the lowest set bit**. Subtracting 1 turns the lowest 1 into 0 and all the 0s to its right into 1s, and the AND wipes out that whole tail. For $x = 101000$: $x - 1 = 100111$ and $x\mathbin\&(x - 1) = 100000$. Consequently, a positive $x$ is a **power of two** exactly when `x & (x - 1) == 0`, since a power of two has a single 1 bit. Repeating the operation until $x = 0$ counts the 1 bits, called the **population count**. Similarly, `x & -x` isolates the lowest set bit: for $40 = 101000$ it gives $8$.

### Bit sets: subsets as numbers
A number with $n$ bits can represent a subset of $\{0, 1, \dots, n - 1\}$: bit $k$ is 1 when $k$ is in the set. Then union is OR, intersection is AND, symmetric difference is XOR and complement is NOT. The set $\{1, 3, 4\}$ is $11010_2 = 26$, and $\{3, 4\}\cup\{0\}$ is $11000\mid00001 = 11001 = 25$. Looping over all integers from $0$ to $2^n - 1$ visits every subset exactly once, connecting this lesson with power sets.

:::def Bitwise operation
An operation that applies a logical connective (AND, OR, XOR, NOT) independently to each bit position.
:::

:::def Mask
A bit pattern used with AND, OR or XOR to read or modify chosen bits while leaving the rest alone.
:::

:::def Shift
Moving all bits left or right by $k$ places; a left shift multiplies by $2^k$, a right shift divides by $2^k$ (rounding down).
:::

:::def Arithmetic right shift
A right shift that fills vacated high bits with copies of the sign bit, preserving the sign of two's complement numbers.
:::

:::warn Common mistakes
Confusing `&` with `&&` or `|` with `||`. Writing `^` expecting exponentiation (in C, Python and Java it means XOR). Forgetting operator precedence: in C, `x & 1 == 0` parses as `x & (1 == 0)`, so use brackets. Off-by-one bit numbering: bit 0 is the rightmost bit. And assuming `~x` is positive.
:::

### Summary
Bitwise AND, OR, XOR and NOT apply logic to every bit position at once. Masks built from $1 \ll k$ set (OR), clear (AND with NOT), toggle (XOR) and test bits. Left shifts multiply by powers of 2 and right shifts divide, with arithmetic shifts preserving sign. XOR cancels itself, `x & (x - 1)` clears the lowest 1, and an $n$-bit number can store a whole subset.

@viz binary bits=8 value=82 | The value 82 = 01010010. Use the shift and NOT buttons, and click bits to play the role of masks.

:::explore
**What to try**
1. Press "<< 1" and compare the new value with $2\times82$.
2. Press ">> 1" twice and compare with $\lfloor164/4\rfloor$.
3. Click bit 0 (place value 1) to set it, then click bit 4 (value 16) to clear it, mimicking `x | 1` and `x & ~16`.
4. Press "NOT" and read the signed value.

**What to notice:** shifting left once gives 164, double 82, and shifting right twice gives 41. Setting bit 0 changes 82 to 83 and clearing bit 4 changes 83 to 67: each flip changes the value by exactly that bit's place value. NOT of $x$ reads as $-x - 1$ in the signed display.
:::

@viz truth-table expr=(p_xor_q)_xor_q | XOR applied twice with the same q gives back p.

:::explore
**What to try**
1. Compare the result column with the $p$ column.
2. Edit the expression to `(p & q) | (p & !q)` and compare again.

**What to notice:** $(p\oplus q)\oplus q$ always equals $p$, which is why XOR-ing twice with a key decrypts, and why $a\oplus b\oplus a = b$. Since bitwise operations act on each column independently, a one-bit truth table proves the identity for numbers of every width.
:::

:::formulas
$$\text{set: } x\mid(1\ll k)\qquad\text{clear: } x\mathbin\&\sim(1\ll k)\qquad\text{toggle: } x\oplus(1\ll k)\qquad\text{test: }(x\gg k)\mathbin\&1$$
$$x\ll k = x\cdot2^k\qquad x\gg k = \lfloor x/2^k\rfloor\ (x\ge0)$$
$$x\oplus x = 0\qquad x\oplus0 = x\qquad\sim x = -x - 1\ \text{(two's complement)}$$
$$x\mathbin\&(x - 1)\text{ clears the lowest 1 bit}\qquad x > 0\text{ is a power of 2}\iff x\mathbin\&(x - 1) = 0$$
:::

:::thm Clearing the lowest set bit
For any positive integer $x$, $x\mathbin\&(x - 1)$ equals $x$ with its lowest 1 bit changed to 0.
:::

:::proof
Write $x = w\,1\,0\cdots0$ in binary, where the lowest 1 is followed by $t\ge0$ zeros and $w$ is the higher part. Subtracting 1 borrows through the zeros: $x - 1 = w\,0\,1\cdots1$. Bitwise AND keeps $w$ (it is the same in both), and in the last $t + 1$ positions one of the two numbers has a 0 in every column, so those bits become 0. The result is $w\,0\,0\cdots0$.
:::

:::steps Compute $45\mathbin\&27$, $45\mid27$ and $45\oplus27$
1. $45 = 101101$, $27 = 011011$.
2. AND: $001001 = 9$. OR: $111111 = 63$. XOR: $110110 = 54$.
3. Check: $\text{AND} + \text{OR} = 9 + 63 = 72 = 45 + 27$, and $\text{XOR} = \text{OR} - \text{AND} = 54$. ✓
:::

:::steps Extract the red, green and blue channels of the colour 0x3A7FC2
1. Red: `(c >> 16) & 0xFF` $= \texttt{0x3A} = 3\cdot16 + 10 = 58$.
2. Green: `(c >> 8) & 0xFF` $= \texttt{0x7F} = 127$.
3. Blue: `c & 0xFF` $= \texttt{0xC2} = 12\cdot16 + 2 = 194$.
:::

:::steps Count the 1 bits in 52 using $x\mathbin\&(x - 1)$
1. $52 = 110100$. $52\mathbin\&51 = 110100\mathbin\&110011 = 110000 = 48$.
2. $48\mathbin\&47 = 110000\mathbin\&101111 = 100000 = 32$; $32\mathbin\&31 = 0$.
3. Three steps reached 0, so 52 has three 1 bits.
:::

:::mock Exam question
Let $x = 0b10110100$ (180). (a) What is $x$ after setting bit 0, then clearing bit 7? (b) What is $x\gg3$? (c) Is $x$ a power of two? Use $x\mathbin\&(x - 1)$. (d) Interpreting $x$ as a set of bit positions, list the set.
:::solution
(a) Setting bit 0: $10110101 = 181$. Clearing bit 7 (value 128): $00110101 = 53$.
(b) $180\gg3 = 10110_2 = 22 = \lfloor180/8\rfloor$.
(c) $180\mathbin\&179 = 10110100\mathbin\&10110011 = 10110000 = 176\ne0$, so it is not a power of two.
(d) Bits 2, 4, 5, 7 are 1: $\{2, 4, 5, 7\}$. Check: $4 + 16 + 32 + 128 = 180$.
:::
:::

:::cs
Unix file permissions are bit flags (`rwx` = 4 + 2 + 1), network subnet masks select address bits (`192.168.1.37 & 255.255.255.0`), chess engines represent boards as 64-bit "bitboards", and Bloom filters and database bitmap indexes answer membership queries with ANDs and ORs over huge bit arrays. Hash functions mix bits with shifts and XORs.
:::

:::ml
Binary neural networks replace multiply-accumulate with XNOR and popcount, which is very fast on simple hardware. Locality-sensitive hashing produces binary codes whose Hamming distance, the popcount of their XOR, approximates similarity for fast nearest-neighbour search. Dropout masks and attention masks are applied element-wise exactly like bit masks.
:::

:::real
A light panel, a hotel's room-status board and the toggle switches in a car's settings menu are all bit flags. RAID 5 storage protects your files with XOR: if one disk dies, XOR-ing the remaining disks rebuilds it.
:::

:::quiz
? What is $12\mathbin\&10$?
= 8
> $1100\mathbin\&1010 = 1000 = 8$.

? What is $12\oplus10$?
= 6
> $1100\oplus1010 = 0110 = 6$.

? What is $3\ll4$?
= 48
> Shifting left by 4 multiplies by $2^4 = 16$.

? Which expression clears bit 2 of $x$?
- `x | (1 << 2)`
+ `x & ~(1 << 2)`
- `x ^ 4` always
> AND with a mask that is 0 only at position 2. XOR would *flip* the bit, turning a 0 into 1.

? What is $x\oplus x$ for any $x$?
= 0
> Every bit matches itself, so every XOR column is 0.

? How many 1 bits does 255 have?
= 8
> $255 = 11111111_2$.
:::

# Unit: Boolean algebra and circuits

## Lesson: Boolean algebra and canonical forms {#boolean-algebra}
@summary: The algebra of 0 and 1, its laws, simplifying expressions, duality, sum-of-products and product-of-sums forms, minterms, and functional completeness.

### Algebra for switches
In ordinary algebra, the letters stand for numbers and you simplify $3x + 5x$ to $8x$. In 1854 George Boole had the idea of doing algebra where the letters stand for **true and false**. Almost a century later, Claude Shannon noticed that Boole's algebra describes electrical switching circuits exactly: a switch is closed (1) or open (0), switches in series behave like AND, and switches in parallel behave like OR. That observation made it possible to *design* digital circuits with algebra, and **Boolean algebra** remains the mathematical language of chip design, compiler optimizations and database query planners.

The practical goal is simplification. Every gate in a circuit costs area, power and time. If $AB + A\overline{B}$ can be rewritten as just $A$, a circuit with three gates becomes a wire.

### Notation
Boolean variables take values 0 and 1. Engineers use a compact notation: $AB$ (or $A\cdot B$) means AND, $A + B$ means OR, and $\overline{A}$ (or $A'$) means NOT. So $\overline{A}B + C$ means $(\neg A\land B)\lor C$. NOT binds tightest, then AND, then OR, just like negation, multiplication and addition in arithmetic.

Some rules look like ordinary arithmetic and some don't. $1 + 1 = 1$ in Boolean algebra (true OR true is true), and $A + A = A$, not $2A$.

### The laws
These identities hold for all values of the variables, and each can be checked with a truth table of at most 8 rows.

**Identity and annihilation:** $A + 0 = A$, $A\cdot1 = A$, $A + 1 = 1$, $A\cdot0 = 0$.

**Idempotence:** $A + A = A$, $AA = A$.

**Complement:** $A + \overline A = 1$, $A\overline A = 0$, and $\overline{\overline A} = A$.

**Commutative and associative:** order and grouping don't matter for $+$ or for $\cdot$.

**Distributive:** $A(B + C) = AB + AC$, as in arithmetic, *and also* $A + BC = (A + B)(A + C)$, which has no arithmetic counterpart.

**Absorption:** $A + AB = A$ and $A(A + B) = A$. If $A$ is true, $A + AB$ is true; if $A$ is false, $AB$ is false too.

**De Morgan:** $\overline{A + B} = \overline A\,\overline B$ and $\overline{AB} = \overline A + \overline B$.

A very handy derived law is **combining**: $AB + A\overline B = A(B + \overline B) = A\cdot1 = A$. Another is $A + \overline AB = A + B$: by the second distributive law it equals $(A + \overline A)(A + B) = A + B$.

### Duality
Look at the laws in pairs: each one turns into another if you swap $+$ with $\cdot$ and $0$ with $1$. $A + 0 = A$ becomes $A\cdot1 = A$; the first absorption law becomes the second. This is the **duality principle**: the dual of any valid identity is also valid. It halves the work of learning and proving the laws.

### Simplifying step by step
Start with a warm-up: $G = \overline{A}B + AB + A\overline B$. Group the first two: $\overline AB + AB = B(\overline A + A) = B$. So $G = B + A\overline B = B + A$ using $X + \overline XY = X + Y$. Check with one row: $A = 1, B = 0$ gives $G = 0 + 0 + 1 = 1$ and $A + B = 1$. ✓

Now $F = AB + A\overline BC + \overline AC$. Factor $A$ from the first two terms: $A(B + \overline BC) = A(B + C) = AB + AC$. So $F = AB + AC + \overline AC = AB + C(A + \overline A) = AB + C$. From three products with seven literals we reached two products with three literals.

Algebraic simplification relies on spotting patterns, which takes practice. The next lesson introduces Karnaugh maps, which make the same simplifications visual.

### Canonical forms: sum of products
Any truth table can be turned into a formula mechanically. A **minterm** is an AND of all the variables, each either plain or complemented, that is 1 in exactly one row. For variables $A, B, C$, the row $A = 1, B = 0, C = 1$ has the minterm $A\overline BC$, and we label it $m_5$ because $101_2 = 5$.

To get a formula, OR together the minterms of every row where the function is 1. This is the **sum of products** (SOP), or disjunctive normal form. If $F(A, B, C) = 1$ exactly in rows 1, 3 and 6, then
$$F = \sum m(1, 3, 6) = \overline A\,\overline BC + \overline ABC + AB\overline C.$$
This always works, which proves that **every** Boolean function can be built from AND, OR and NOT.

Dually, a **maxterm** is an OR of all variables that is 0 in exactly one row, and the **product of sums** (POS, conjunctive normal form) ANDs the maxterms of the rows where $F = 0$. For the row $A = 0, B = 1, C = 0$ the maxterm is $A + \overline B + C$, which is 0 only there. POS is the format SAT solvers use.

### How many Boolean functions are there?
A function of $n$ variables is determined by its truth table, which has $2^n$ rows, each with output 0 or 1. So there are $2^{2^n}$ functions: 4 of one variable, 16 of two variables, 256 of three. All 16 two-variable functions have names (AND, OR, XOR, NAND, NOR, implication, and so on).

### Functional completeness
A set of operations is **functionally complete** if it can express every Boolean function. $\{\text{AND}, \text{OR}, \text{NOT}\}$ is complete by the SOP construction. By De Morgan, $A + B = \overline{\overline A\,\overline B}$, so $\{\text{AND}, \text{NOT}\}$ alone is complete. Remarkably, the single operation **NAND**, $\overline{AB}$, is complete: $\overline A = \overline{AA}$ (NAND of $A$ with itself), $AB = \overline{\overline{AB}}$ (NAND followed by a NOT made from NAND), and OR follows by De Morgan. NOR is complete as well. That's why chips can be made from a single kind of gate.

:::def Boolean algebra
The algebra of the values 0 and 1 with OR ($+$), AND ($\cdot$) and NOT ($\overline{\ }$), governed by laws such as distributivity, complement and De Morgan.
:::

:::def Minterm
A product of all $n$ variables, each plain or complemented, that equals 1 in exactly one row of the truth table.
:::

:::def Sum of products
An OR of AND terms. The canonical SOP of a function is the OR of the minterms of all rows where it is 1.
:::

:::def Functionally complete
A set of operations from which every Boolean function can be built, such as {AND, OR, NOT} or {NAND}.
:::

:::def Duality principle
Swapping $+$ with $\cdot$ and 0 with 1 in a valid Boolean identity gives another valid identity.
:::

:::warn Common mistakes
Writing $A + A = 2A$ or $1 + 1 = 0$ (that's XOR, not OR). Forgetting the second distributive law $A + BC = (A + B)(A + C)$. Applying De Morgan without swapping the operation. And mislabelling minterms: the row number is the binary number formed by the variables in order, so $\overline AB\overline C$ is $m_2$.
:::

### Summary
Boolean algebra manipulates 0/1 expressions with laws that mostly mirror arithmetic, plus extra ones like idempotence, absorption, De Morgan and the second distributive law; every law has a dual. Any truth table converts to a sum of minterms or a product of maxterms, proving that AND, OR and NOT can build any of the $2^{2^n}$ functions, and NAND alone suffices.

@viz truth-table expr=((p_&_q)_∨_(p_&_!q_&_r)_∨_(!p_&_r))_<->_((p_&_q)_∨_r) | Checking the simplification AB + AB̄C + ĀC = AB + C, with p, q, r standing for A, B, C.

:::explore
**What to try**
1. Confirm that the final column is all 1s, so the two sides agree on all 8 rows.
2. Edit the right side to `(p & q) | (p & r)` and find a row where they now differ.
3. Try `!(p | q) <-> (!p & !q)` to check De Morgan's law.

**What to notice:** a Boolean identity is just a tautology of the form left $\leftrightarrow$ right, so 8 rows settle it for three variables. Dropping the $\overline AC$ term breaks the identity in the rows with $A = 0, C = 1$: that's where $\overline AC$ was needed.
:::

:::formulas
$$A + 0 = A\quad A\cdot1 = A\quad A + 1 = 1\quad A\cdot0 = 0\quad A + A = A\quad AA = A$$
$$A + \overline A = 1\quad A\overline A = 0\quad A + AB = A\quad A(A + B) = A\quad A + \overline AB = A + B$$
$$A(B + C) = AB + AC\qquad A + BC = (A + B)(A + C)$$
$$\overline{A + B} = \overline A\,\overline B\qquad\overline{AB} = \overline A + \overline B\qquad AB + A\overline B = A$$
$$\#\{\text{Boolean functions of } n\text{ variables}\} = 2^{2^n}$$
:::

:::thm Every Boolean function has a sum-of-products form
For every function $F : \{0, 1\}^n\to\{0, 1\}$, $F$ equals the OR of the minterms of the rows where $F = 1$ (and $F = 0$ if there are none).
:::

:::proof
Each minterm $m_r$ is 1 in row $r$ and 0 in every other row, because some literal is 0 wherever the input differs from row $r$. The OR of the chosen minterms is therefore 1 in exactly the rows where at least one chosen minterm is 1, which are exactly the rows where $F = 1$. So the two functions agree everywhere.
:::

:::steps Simplify $\overline{A}\,\overline{B} + \overline AB + AB$
1. Combine the first two: $\overline A(\overline B + B) = \overline A$.
2. Now $\overline A + AB = \overline A + B$ (using $X + \overline XY = X + Y$ with $X = \overline A$).
3. Result: $\overline A + B$, which is the implication $A\to B$.
:::

:::steps Write the canonical SOP for $F(A, B) = A\oplus B$
1. Rows where $F = 1$: $A = 0, B = 1$ (row 1) and $A = 1, B = 0$ (row 2).
2. Minterms: $m_1 = \overline AB$ and $m_2 = A\overline B$.
3. $A\oplus B = \overline AB + A\overline B$.
:::

:::steps Build NOT, AND and OR from NAND only
1. NOT: $\overline A = \overline{A\cdot A} = \text{NAND}(A, A)$.
2. AND: $AB = \overline{\overline{AB}} = \text{NAND}(\text{NAND}(A, B), \text{NAND}(A, B))$.
3. OR: $A + B = \overline{\overline A\,\overline B} = \text{NAND}(\text{NAND}(A, A), \text{NAND}(B, B))$.
:::

:::mock Exam question
$F(A, B, C) = \sum m(0, 2, 3, 7)$. (a) Write the canonical SOP. (b) Simplify it algebraically. (c) Verify your answer on rows 3 and 5.
:::solution
(a) $m_0 = \overline A\,\overline B\,\overline C$, $m_2 = \overline AB\overline C$, $m_3 = \overline ABC$, $m_7 = ABC$, so $F = \overline A\,\overline B\,\overline C + \overline AB\overline C + \overline ABC + ABC$.
(b) $m_0 + m_2 = \overline A\,\overline C(\overline B + B) = \overline A\,\overline C$, and $m_3 + m_7 = BC(\overline A + A) = BC$. So $F = \overline A\,\overline C + BC$.
(c) Row 3 is $011$: $\overline A\,\overline C = 0$, $BC = 1$, so $F = 1$ ✓ (3 is a minterm). Row 5 is $101$: $\overline A\,\overline C = 0$, $BC = 0$, so $F = 0$ ✓.
:::
:::

:::cs
Compilers simplify Boolean conditions and short-circuit them using these laws; SQL optimizers rewrite `WHERE` clauses with De Morgan and distributivity. Hardware synthesis tools convert Verilog into minimized gate networks. Boolean satisfiability (SAT), checking whether a CNF formula can be made true, is the first problem proven NP-complete, and modern SAT solvers verify chips and solve scheduling problems with millions of variables.
:::

:::ml
Decision trees compute Boolean functions of threshold tests, and a tree can be read off as a sum of products, one product per path to a "yes" leaf. A single perceptron can compute AND, OR and NAND but not XOR, which famously showed the need for multi-layer networks: XOR needs the SOP $\overline AB + A\overline B$, two "hidden" terms combined.
:::

:::real
A car's interior light is on if (door open) OR (switch on AND engine off), a Boolean expression wired directly into the car. Alarm systems, elevator controllers and washing machines all run on small Boolean functions, and simplifying them saves components and cost.
:::

:::quiz
? How many Boolean functions of 2 variables are there?
= 16
> $2^{2^2} = 2^4 = 16$.

? Simplify $A + AB$.
+ $A$
- $AB$
- $A + B$
> Absorption: if $A = 1$ both are 1; if $A = 0$ both are 0.

? Which minterm number is $A\overline BC$ (variables in order $A, B, C$)?
= 5
> $A = 1, B = 0, C = 1$ is $101_2 = 5$.

? $\overline{A + B}$ equals...
- $\overline A + \overline B$
+ $\overline A\,\overline B$
- $AB$
> De Morgan swaps OR for AND when the bar is split.

? What is $A + \overline AB$?
+ $A + B$
- $AB$
- $B$
> By the second distributive law, $(A + \overline A)(A + B) = A + B$.

? How many 1-rows does the canonical SOP $\sum m(1, 4, 6, 7)$ have?
= 4
> One minterm per row where the function is 1.
:::

## Lesson: Karnaugh maps and circuit minimization {#karnaugh}
@summary: Simplifying Boolean functions visually: Gray-code layout, grouping adjacent 1s in powers of two, wrap-around, don't-care cells and minimal sums of products.

### Simplification without guesswork
In the Boolean algebra lesson we simplified $AB + A\overline BC + \overline AC$ to $AB + C$, but it took insight: you had to spot which terms to group and which law to apply. With five or six terms it becomes easy to miss a simplification, or to go round in circles. Engineers in the 1950s wanted a method that a person could apply reliably, with pencil and paper, and get the simplest answer every time. Maurice Karnaugh's 1953 answer was a cleverly arranged truth table, now called a **Karnaugh map** or **K-map**, that turns algebraic simplification into spotting rectangles in a picture.

### The key law behind it all
Every K-map simplification is the same algebraic step used over and over:
$$XA + X\overline A = X.$$
If two product terms are identical except that one variable appears plain in one and complemented in the other, they merge and that variable disappears. For example $\overline ABC + ABC = BC$: whether $A$ is 0 or 1 doesn't matter, as long as $B$ and $C$ are both 1. Two minterms that differ in exactly one variable are called **adjacent**. The whole trick of a K-map is to lay out the truth table so that **adjacent minterms are next to each other on paper**.

### Gray code layout
In a normal truth table the rows go $00, 01, 10, 11$. But $01$ and $10$ differ in two bits, so they're not adjacent, even though they sit next to each other. A K-map orders its rows and columns in **Gray code**, $00, 01, 11, 10$, in which neighbouring codes differ in exactly one bit. With this order, any two cells that share an edge differ in exactly one variable.

For three variables $A, B, C$, use 2 rows for $A$ (0 and 1) and 4 columns for $BC$ in the order $00, 01, 11, 10$. The cell in row $A$, column $BC$ holds the output for that input, and its minterm number is the binary number $ABC$. So row 0 contains $m_0, m_1, m_3, m_2$ and row 1 contains $m_4, m_5, m_7, m_6$. Notice the order 3 before 2: that is the Gray code at work.

For four variables, use 4 rows for $AB$ and 4 columns for $CD$, both in Gray order, giving a $4\times4$ grid of 16 cells.

The map also **wraps around**. The left and right columns ($BC = 00$ and $BC = 10$) differ only in $B$, so they count as adjacent, as if the map were drawn on a cylinder. In a 4-variable map the top and bottom rows are adjacent too, so the map behaves like the surface of a doughnut, and the four corner cells form a single group.

### Grouping the 1s
To simplify a function, write its outputs into the map, then cover all the 1s with **rectangular groups** following three rules:
1. Each group must contain only 1s (or don't-cares, below).
2. Each group's size must be a power of two: 1, 2, 4, 8 or 16 cells.
3. Groups may overlap, and may wrap around the edges.

Each group becomes one product term: keep the variables that are **constant** across the group, and drop the ones that change. A group of $2^k$ cells eliminates $k$ variables. In a 3-variable map, a pair gives a 2-literal term, a group of four gives a 1-literal term, and the whole map of eight gives the constant 1.

To get the **simplest** sum of products, make groups **as large as possible** and use **as few groups as possible**. Larger groups mean fewer literals per term; fewer groups mean fewer terms.

### A worked picture
Take $F = \sum m(0, 2, 3, 7)$, the function from the Boolean algebra mock exam. In the 3-variable map, row $A = 0$ has 1s at $BC = 00$ ($m_0$), $BC = 11$ ($m_3$) and $BC = 10$ ($m_2$), and row $A = 1$ has a 1 at $BC = 11$ ($m_7$). The cells $m_0$ and $m_2$ are at opposite ends of row 0, but they are adjacent by wrap-around: in both, $A = 0$ and $C = 0$, while $B$ changes. So they form the term $\overline A\,\overline C$. The cells $m_3$ and $m_7$ are stacked in the $BC = 11$ column: $B = C = 1$ while $A$ changes, giving $BC$. Every 1 is covered, so $F = \overline A\,\overline C + BC$, which matches the algebra exactly, but required no cleverness.

### Prime and essential implicants
A group that can't be enlarged is a **prime implicant**. If some 1 is covered by only one prime implicant, that implicant is **essential** and must appear in every minimal answer. A systematic procedure is: find all prime implicants, include every essential one, and then cover any remaining 1s with as few extra primes as possible. Sometimes there are several equally minimal answers.

### Don't-care conditions
Sometimes certain inputs can never happen, or we don't care about the output for them. A digit display driven by a 4-bit input only receives the codes 0 to 9; codes 10 to 15 never occur. These cells are marked **X**, for **don't care**. When grouping, you may treat an X as a 1 if it helps make a group bigger, and as a 0 otherwise. You never need to cover an X. Don't-cares often lead to dramatically simpler circuits.

### Limits
K-maps are excellent for up to four variables and manageable for five or six with layered maps, but beyond that the pictures become impractical. Computer tools use the **Quine–McCluskey** algorithm (the systematic version of the same idea) or heuristic methods such as Espresso. Finding a truly minimal circuit is computationally hard in general, which is why real tools settle for very good rather than perfect answers.

:::def Karnaugh map
A grid arrangement of a truth table, with rows and columns in Gray-code order, so that cells sharing an edge (including wrap-around) differ in one variable.
:::

:::def Gray code
An ordering of binary strings in which consecutive strings differ in exactly one bit, such as $00, 01, 11, 10$.
:::

:::def Prime implicant
A product term (a maximal group of 1s and don't-cares) that cannot be enlarged while still implying the function.
:::

:::def Essential prime implicant
A prime implicant that is the only one covering some 1 of the function; it appears in every minimal sum of products.
:::

:::def Don't-care condition
An input combination whose output does not matter, marked X; it may be grouped as a 1 or ignored.
:::

:::warn Common mistakes
Labelling columns $00, 01, 10, 11$ instead of Gray order. Making groups of 3 or 6 cells (sizes must be powers of two). Forgetting wrap-around and corner groups. Stopping at small groups when a larger one is possible. And including groups made only of don't-cares, which add terms without covering any 1.
:::

### Summary
A Karnaugh map arranges a truth table in Gray-code order so that adjacent cells differ in one variable. Cover the 1s with the largest possible rectangular groups of size $2^k$, wrapping around edges, using as few groups as possible; each group of $2^k$ cells removes $k$ variables. Prime implicants can't be enlarged, essential ones are forced, and don't-cares may be used as 1s when helpful.

@viz g08-kmap vars=3 m=0,2,3,7 | The function Σm(0, 2, 3, 7) on a 3-variable map. The coloured dots show the minimal groups.

:::explore
**What to try**
1. Find $m_0$ and $m_2$ and check that the simplifier groups them across the wrap-around edge.
2. Click $m_6$ (row $A = 1$, column $BC = 10$) to make it a 1 and watch the groups change.
3. Click $m_6$ again to turn it into an X (don't care), and then click $m_4$ so it becomes 1.
4. Switch to 4 variables, press "clear", and set the four corner cells.

**What to notice:** the answer $\overline A\,\overline C + BC$ appears with 2 terms and 4 literals, exactly as in the article. Adding $m_6$ lets a group of four ($m_2, m_3, m_6, m_7$) form, which is $B$, so $F = \overline A\,\overline C + B$. With $m_6 = X$ and $m_4 = 1$, the don't-care is used as a 1 to complete the group $m_0, m_2, m_4, m_6$, which is $\overline C$, so $F = \overline C + BC$. The four corners of a 4-variable map form one group, $\overline B\,\overline D$, thanks to wrap-around in both directions.
:::

@viz g08-kmap vars=4 m=1,3,7,11,15 d=0,2,5 | A 4-variable map with three don't-care cells.

:::explore
**What to try**
1. Read the minimal expression and see which don't-cares were used.
2. Turn the don't-cares into 0s by clicking them, and compare the result.

**What to notice:** with don't-cares the function needs only 2 terms with 2 literals each, such as $CD + \overline AD$, because $m_5$ is used as a 1 to complete a group of four. Without them, the cover needs a longer term: don't-cares are free simplification.
:::

:::formulas
$$XA + X\overline A = X\qquad\text{(the adjacency law behind every group)}$$
$$\text{Gray order for 2 bits: } 00, 01, 11, 10$$
$$\text{a group of } 2^k\text{ cells in an } n\text{-variable map gives a term with } n - k\text{ literals}$$
$$\text{3-variable cell order: row } A = 0: m_0, m_1, m_3, m_2;\ \text{row } A = 1: m_4, m_5, m_7, m_6$$
:::

:::thm Groups of size 2^k give single product terms
In an $n$-variable K-map, a rectangle of $2^k$ cells (with wrap-around) in which exactly $k$ variables change and $n - k$ stay fixed equals the product of the $n - k$ fixed literals.
:::

:::proof
The OR of the $2^k$ minterms is (fixed literals) $\times$ (sum of all $2^k$ products of the $k$ free variables). That sum covers every combination of the free variables, so it equals 1; by repeated use of $XA + X\overline A = X$ it collapses one variable at a time. What remains is the product of the fixed literals.
:::

:::steps Minimize $F(A, B, C) = \sum m(1, 3, 5, 7)$
1. These are the cells where $C = 1$: columns $BC = 01$ and $11$, in both rows.
2. They form one group of 4, in which $A$ and $B$ change and $C$ stays 1.
3. $F = C$.
:::

:::steps Minimize $F(A, B, C, D) = \sum m(0, 2, 8, 10)$
1. These are the four corners of the 4-variable map: $AB\in\{00, 10\}$, $CD\in\{00, 10\}$.
2. Rows 00 and 10 are adjacent by wrap-around, and so are columns 00 and 10, so they form one group of 4.
3. Fixed: $B = 0$ and $D = 0$. $F = \overline B\,\overline D$.
:::

:::steps Minimize $F(A, B, C) = \sum m(0, 1, 2, 5, 6, 7)$
1. Row 0 has $m_0, m_1, m_2$; row 1 has $m_5, m_7, m_6$.
2. Pairs: $m_0, m_1$ give $\overline A\,\overline B$; $m_5, m_7$ give $AC$; $m_2, m_6$ give $B\overline C$.
3. All six 1s are covered: $F = \overline A\,\overline B + AC + B\overline C$. (An equally minimal answer is $\overline A\,\overline C + \overline BC + AB$.)
:::

:::mock Exam question
A 4-variable function has $F = \sum m(4, 5, 6, 7, 12, 13, 14, 15)$. (a) Minimize it with a K-map. (b) Now suppose instead $F = \sum m(5, 7, 13, 15) + d(4, 6)$. Minimize it. (c) How many literals does each answer have?
:::solution
(a) The cells are exactly the rows $AB = 01$ and $AB = 11$, which are adjacent; a group of 8 with $B = 1$ fixed: $F = B$.
(b) $m_5, m_7, m_{13}, m_{15}$ are the rows $AB = 01, 11$ with $D = 1$ (columns 01 and 11): a group of 4 giving $BD$. Using $d_4, d_6$ as 1s would only allow the group $\overline AB$ in addition, which isn't needed, so $F = BD$.
(c) (a) has 1 literal, (b) has 2 literals.
:::
:::

:::cs
Logic synthesis tools in chip design (Synopsys, Yosys) minimize two-level logic with Espresso, a refined version of the K-map idea, and then optimize multi-level circuits. Gray codes are also used in rotary encoders and for passing counters between clock domains, because only one bit changes at a time and so a momentary misread is off by at most one.
:::

:::ml
Simplifying a rule-based classifier is exactly Boolean minimization: a decision list or decision tree's "yes" paths form a sum of products, and merging rules that differ in one condition is the law $XA + X\overline A = X$. Interpretable ML methods such as rule learners search for small DNF formulas that fit the data, and don't-cares correspond to input regions with no training data.
:::

:::real
A seven-segment digital clock display uses one small circuit per segment, and K-maps with don't-cares for the unused codes 10 to 15 make those circuits cheap. Designers of vending machines, traffic lights and washing-machine controllers use the same technique to reduce part counts.
:::

:::quiz
? In Gray-code order, which code follows 01?
- 10
+ 11
- 00
> Consecutive Gray codes differ in one bit: $00, 01, 11, 10$.

? A group of 4 cells in a 4-variable K-map gives a term with how many literals?
= 2
> $n - k = 4 - 2 = 2$.

? Is a group of 6 cells allowed?
- Yes
+ No
> Group sizes must be powers of two.

? In a 3-variable map, which minterm sits next to $m_3$ in the same row, on the right?
= 2
> Row 0 is ordered $m_0, m_1, m_3, m_2$.

? Minimize $\sum m(4, 5, 6, 7)$ for variables $A, B, C$.
+ $A$
- $AB$
- $\overline A$
> These are all four cells of the row $A = 1$.

? Must every don't-care cell be covered by a group?
- Yes
+ No
> Don't-cares are used only when they help enlarge a group of 1s.
:::

## Lesson: Logic gates and combinational circuits {#gates}
@summary: The seven standard gates, building circuits from expressions, half and full adders, ripple-carry addition, multiplexers and decoders.

### From algebra to hardware
Everything a computer does, from adding numbers to rendering video to running a neural network, is eventually carried out by tiny electronic components called **logic gates**. A gate takes one or two input wires, each carrying a 0 (low voltage) or a 1 (high voltage), and produces an output wire whose value is a fixed Boolean function of the inputs. A modern processor contains billions of them. The remarkable fact is that a handful of gate types, wired together cleverly, can compute *anything* a computer can compute. In this lesson we go from single gates to a circuit that adds binary numbers, the heart of every arithmetic unit.

### An everyday scenario
Think of a hallway light with two switches, one at each end. Flipping either switch changes the light. If both switches are down the light is off; flip one and it's on; flip the other too and it's off again. The light is on exactly when the switches **differ**: that is the XOR function. An electrician wiring it is building a logic gate out of switches. Chips do the same thing with transistors, billions of times smaller.

### The standard gates
Each gate has a name, a Boolean expression and a standard symbol in circuit diagrams.

**NOT** (inverter) has one input: output $\overline A$. Its symbol is a triangle with a small circle (a "bubble") at the tip; bubbles always mean "invert".

**AND** outputs $AB$: 1 only when both inputs are 1. Its symbol has a flat back and a round front, like a D.

**OR** outputs $A + B$: 1 when at least one input is 1. Its symbol has a curved back and a pointed front.

**XOR** outputs $A\oplus B$: 1 when the inputs differ. It looks like OR with an extra curved line at the back.

**NAND**, **NOR** and **XNOR** are AND, OR and XOR followed by NOT, drawn with a bubble at the output: $\overline{AB}$, $\overline{A + B}$ and $\overline{A\oplus B}$. XNOR is 1 when the inputs are *equal*, so it is a one-bit equality tester.

Gates with more inputs work the same way: a 3-input AND outputs $ABC$, which is 1 only if all three inputs are 1.

### Why NAND is king
In the Boolean algebra lesson we proved that NAND alone is functionally complete. In real chips (CMOS technology), NAND and NOR are also the cheapest gates to build, each using four transistors, while AND needs six (a NAND plus an inverter). So designers often think in NAND. A neat fact: an AND-OR circuit (sum of products) can be converted into an all-NAND circuit of the same shape, because $AB + CD = \overline{\overline{AB}\cdot\overline{CD}}$ by De Morgan.

### From expression to circuit and back
Any Boolean expression becomes a circuit: each operation is a gate, and each variable is an input wire. The expression $F = AB + \overline C$ needs an AND gate for $AB$, a NOT gate for $\overline C$, and an OR gate combining them. Going the other way, you can read a circuit by labelling every wire with its expression, working from the inputs to the output. The number of gates is the circuit's **size**, and the longest path from an input to the output, counted in gates, is its **depth**. Each gate takes a tiny amount of time to switch (its **propagation delay**, around picoseconds), so depth determines speed. That's why simplifying expressions matters: fewer gates means less area and power, and fewer levels means a faster circuit.

A circuit whose outputs depend only on its current inputs, with no memory and no loops, is called **combinational**. Everything in this lesson is combinational; circuits with memory come in the sequential logic lesson.

### The half adder
Add two single bits $A$ and $B$. The possible sums are $0 + 0 = 0$, $0 + 1 = 1$, $1 + 0 = 1$ and $1 + 1 = 10_2$. So we need two outputs: a **sum** bit $S$ and a **carry** bit $C$. Reading the truth table, $S$ is 1 when exactly one input is 1, so $S = A\oplus B$, and $C$ is 1 only when both are 1, so $C = AB$. One XOR and one AND gate: this is the **half adder**.

### The full adder
To add multi-bit numbers, each column must also accept a carry coming in from the column to its right. A **full adder** adds three bits $A$, $B$ and $C_{in}$ and outputs a sum $S$ and a carry $C_{out}$. The sum of three bits ranges from 0 to 3, so
$$S = A\oplus B\oplus C_{in},\qquad C_{out} = AB + C_{in}(A\oplus B).$$
$S$ is 1 when an odd number of inputs are 1. $C_{out}$ is 1 when at least two inputs are 1; the formula says "either $A$ and $B$ both carry, or exactly one of them is 1 and the incoming carry tips it over". Check $A = 1, B = 1, C_{in} = 1$: $S = 1$, $C_{out} = 1$, giving $11_2 = 3$. ✓ A full adder is two half adders plus an OR gate: 2 XOR, 2 AND and 1 OR.

### Ripple-carry addition
Chain $n$ full adders, connecting each $C_{out}$ to the next column's $C_{in}$, and you get an $n$-bit adder. Add $0110 + 0111$ ($6 + 7$): column 0 gives $0 + 1 = 1$, carry 0; column 1 gives $1 + 1 = 10$, sum 0 carry 1; column 2 gives $1 + 1 + 1 = 11$, sum 1 carry 1; column 3 gives $0 + 0 + 1 = 1$, carry 0. Result $1101 = 13$. ✓ This is called **ripple-carry** because each carry must "ripple" through every stage before the top bit is final, so the delay grows linearly with $n$. Faster designs such as **carry-lookahead** adders compute carries in parallel, trading more gates for less depth. With two's complement from the earlier lesson, the same adder subtracts: feed in $\overline B$ and set the first carry to 1.

### Multiplexers and decoders
Two more building blocks appear everywhere. A **multiplexer** (MUX) is a data selector: a 2-to-1 MUX has data inputs $A$ and $B$, a select input $S$, and output $Y = \overline SA + SB$, so it passes $A$ when $S = 0$ and $B$ when $S = 1$. With $k$ select lines a MUX picks one of $2^k$ inputs. It is the hardware version of an `if` statement. A **decoder** does the reverse: $k$ input bits switch on exactly one of $2^k$ output lines, each line being one minterm. Memory chips use decoders to select which row of cells an address refers to.

:::def Logic gate
An electronic component that computes a fixed Boolean function of its input bits, such as AND, OR, NOT, NAND, NOR, XOR or XNOR.
:::

:::def Combinational circuit
A circuit of gates without memory or feedback; its outputs depend only on its current inputs.
:::

:::def Half adder
A circuit adding two bits: $S = A\oplus B$, $C = AB$.
:::

:::def Full adder
A circuit adding three bits: $S = A\oplus B\oplus C_{in}$, $C_{out} = AB + C_{in}(A\oplus B)$.
:::

:::def Multiplexer
A data selector that routes one of $2^k$ inputs to its output according to $k$ select bits; for two inputs, $Y = \overline SA + SB$.
:::

:::warn Common mistakes
Forgetting that a bubble on a symbol means inversion. Writing the half-adder sum as OR instead of XOR ($1 + 1$ gives sum 0, carry 1). Ignoring the carry-in when adding columns. And confusing a MUX (many inputs, one output) with a decoder (few inputs, many outputs).
:::

### Summary
Logic gates compute Boolean functions in hardware; NAND and NOR are each complete and cheap. Any expression becomes a combinational circuit, whose size and depth measure cost and speed. A half adder ($S = A\oplus B$, $C = AB$) adds two bits, a full adder adds three, and a chain of full adders adds $n$-bit numbers by rippling carries. Multiplexers select data and decoders select lines.

@viz gates circuit="half adder" | A half adder. Click the inputs A and B to toggle them and read Sum and Carry.

:::explore
**What to try**
1. Set $A = 1$, $B = 0$, then $A = 1$, $B = 1$, reading Sum and Carry each time.
2. Compare the full truth table printed below with $A\oplus B$ and $AB$.

**What to notice:** $1 + 1$ gives Sum 0 and Carry 1, the binary number 10. Sum is exactly the XOR column and Carry is exactly the AND column of the truth table, which is the whole design of the half adder.
:::

@viz gates circuit="full adder" | A full adder with a carry-in. Toggle A, B and Cin.

:::explore
**What to try**
1. Turn on all three inputs and read the outputs.
2. Find every input combination with Cout = 1.
3. Check that Sum is 1 exactly when an odd number of inputs are on.

**What to notice:** all three on gives Sum 1, Cout 1, which is $11_2 = 3$. Cout is 1 in the four rows with at least two 1s (011, 101, 110, 111), matching $C_{out} = AB + C_{in}(A\oplus B)$. This is one column of the ripple-carry adder described in the article.
:::

:::formulas
$$\text{NAND} = \overline{AB}\quad\text{NOR} = \overline{A + B}\quad\text{XNOR} = \overline{A\oplus B}$$
$$\text{half adder: } S = A\oplus B,\ C = AB$$
$$\text{full adder: } S = A\oplus B\oplus C_{in},\ C_{out} = AB + C_{in}(A\oplus B)$$
$$\text{2-to-1 MUX: } Y = \overline SA + SB\qquad k\text{-to-}2^k\text{ decoder: outputs are the minterms of the inputs}$$
:::

:::thm The full adder adds three bits
For bits $A, B, C_{in}$, the integer $A + B + C_{in}$ equals $2C_{out} + S$, where $S = A\oplus B\oplus C_{in}$ and $C_{out} = AB + C_{in}(A\oplus B)$.
:::

:::proof
Let $k = A + B + C_{in}\in\{0, 1, 2, 3\}$. XOR is 1 exactly when an odd number of its inputs are 1, so $S = k\bmod2$. $C_{out}$ is 1 when $A = B = 1$, or when exactly one of $A, B$ is 1 and $C_{in} = 1$; these are exactly the cases $k\ge2$, so $C_{out} = \lfloor k/2\rfloor$. Hence $2C_{out} + S = 2\lfloor k/2\rfloor + (k\bmod2) = k$.
:::

:::steps Draw the gates for $F = \overline{A}B + A\overline{C}$ and count size and depth
1. NOT gates: $\overline A$ and $\overline C$ (2 gates, depth 1).
2. AND gates: $\overline AB$ and $A\overline C$ (2 gates, depth 2).
3. One OR gate combines them (depth 3). Size 5, depth 3.
:::

:::steps Add $1011 + 0011$ with a 4-bit ripple-carry adder
1. Column 0: $1 + 1 = 10$: sum 0, carry 1. Column 1: $1 + 1 + 1 = 11$: sum 1, carry 1.
2. Column 2: $0 + 0 + 1$: sum 1, carry 0. Column 3: $1 + 0 + 0$: sum 1, carry 0.
3. Result $1110 = 14 = 11 + 3$. ✓
:::

:::steps Build XOR from four NAND gates
1. $N_1 = \overline{AB}$.
2. $N_2 = \overline{A N_1}$ and $N_3 = \overline{B N_1}$.
3. $N_4 = \overline{N_2N_3}$. Checking all four rows gives 0, 1, 1, 0, which is $A\oplus B$.
:::

:::mock Exam question
(a) How many full adders does a 32-bit ripple-carry adder need, and how many gates in total if each full adder uses 5? (b) Using a full adder, what are $S$ and $C_{out}$ for $A = 0, B = 1, C_{in} = 1$? (c) Write the output of a 2-to-1 MUX with $A = 1$, $B = 0$, $S = 1$.
:::solution
(a) 32 full adders, $32\times5 = 160$ gates. (The first column could use a half adder if there is no carry-in.)
(b) $0 + 1 + 1 = 2 = 10_2$: $S = 0$, $C_{out} = 1$. By formula, $S = 0\oplus1\oplus1 = 0$ and $C_{out} = 0 + 1\cdot(0\oplus1) = 1$. ✓
(c) $Y = \overline SA + SB = 0\cdot1 + 1\cdot0 = 0$: it selects $B$.
:::
:::

:::cs
A CPU's arithmetic logic unit (ALU) is a set of adders, bitwise gates and a multiplexer choosing which result to output based on the instruction. Hardware description languages such as Verilog let engineers write `assign s = a ^ b ^ cin;` and tools turn it into gates. FPGAs implement circuits with small programmable lookup tables, each storing an arbitrary truth table.
:::

:::ml
GPUs and TPUs devote most of their chip area to multiply-accumulate units, which are built from arrays of full adders. Reducing numeric precision from 32-bit to 8-bit cuts the adder and multiplier circuitry dramatically, which is why quantized models run faster and use less energy. Early neural networks were inspired by gates: McCulloch and Pitts showed in 1943 that threshold neurons can implement AND, OR and NOT.
:::

:::real
The two-way hallway light switch is an XOR circuit. A car that beeps when the key is in AND the door is open, or a microwave that runs only when the door is closed AND the timer is set, is a logic gate built into an everyday appliance.
:::

:::quiz
? What does a half adder output as (Sum, Carry) for $A = 1$, $B = 1$? Give Sum.
= 0
> $1 + 1 = 10_2$: Sum 0, Carry 1.

? Which gate outputs 1 only when its inputs are equal?
- XOR
+ XNOR
- NAND
> XNOR is NOT XOR, so it is 1 for 00 and 11.

? What is NAND(1, 1)?
= 0
> AND gives 1, then NOT gives 0.

? A full adder's inputs are 1, 0, 1. What is $C_{out}$?
= 1
> $1 + 0 + 1 = 2 = 10_2$.

? How many full adders does an 8-bit ripple-carry adder use?
= 8
> One per bit column.

? A 2-to-1 multiplexer with select $S = 0$ outputs...
+ input $A$
- input $B$
- $A\cdot B$
> $Y = \overline SA + SB = A$ when $S = 0$.
:::

## Lesson: Sequential logic: latches, flip-flops, registers and state machines {#sequential}
@summary: Circuits with memory: feedback, the SR latch, D flip-flops and clocks, registers and counters, and finite state machines.

### Circuits that remember
Every circuit in the gates lesson was **combinational**: its output depended only on what its inputs were at that instant. But a computer must remember things. A calculator must remember the first number while you type the second; a traffic light must remember whether it's currently red or green; a processor must remember which instruction comes next. A circuit whose output depends on its **inputs and its past** is called **sequential**, and the past is stored in its **state**.

Think of a push-button lamp: press once and it turns on, press again and it turns off. The button signal is the same each time, a brief press, yet the result differs. The lamp must remember its state. That small requirement, memory, is what turns a calculator circuit into a computer.

### Feedback: the trick that creates memory
How can gates remember anything? By **feedback**: feeding a gate's output back into its own input. The simplest memory circuit is two NOR gates, each feeding its output into the other. This is the **SR latch** (set–reset latch). It has inputs $S$ (set) and $R$ (reset) and outputs $Q$ and $\overline Q$, with
$$Q = \overline{R + \overline Q},\qquad\overline Q = \overline{S + Q}.$$
Work through the cases. If $S = 1$ and $R = 0$, the second gate outputs $\overline Q = 0$ (NOR with a 1 input is 0), and then the first gate gives $Q = \overline{0 + 0} = 1$. The latch is **set**. If $S = 0$ and $R = 1$, the first gate gives $Q = 0$, then $\overline Q = 1$: the latch is **reset**. Now the interesting case: $S = 0$ and $R = 0$. Then the equations reduce to $Q = \overline{\overline Q}$ and $\overline Q = \overline{Q}$: each gate just inverts the other's output, so whatever state the pair was in, it **stays** in. If it was set, $Q$ stays 1; if it was reset, $Q$ stays 0. The circuit remembers one bit. The input $S = R = 1$ is **forbidden**, because it forces both outputs to 0, which contradicts $\overline Q$ being the complement of $Q$, and the next state is unpredictable when both inputs drop.

### The D latch and the clock
The SR latch is awkward to use: two inputs and a forbidden combination. The **D latch** fixes this with a single data input $D$ and an **enable** input $E$. When $E = 1$, the output follows the input, $Q = D$ (the latch is "transparent"). When $E = 0$, the latch holds whatever value it had. Internally, $D$ and $E$ are combined so that $S = DE$ and $R = \overline DE$, which can never both be 1.

Large digital systems coordinate all their memory with a **clock**: a signal that switches between 0 and 1 at a steady rate, billions of times per second in a modern processor. A 2 GHz clock has $2\times10^9$ cycles per second, so each cycle lasts $\frac1{2\times10^9}$ s $= 0.5$ nanoseconds.

### The D flip-flop
A **D flip-flop** is a memory cell that captures its input only at an instant, the **rising edge** of the clock (the moment it goes from 0 to 1), and ignores $D$ the rest of the time. It can be built from two D latches in a row, one transparent while the clock is low and the other while it's high. Its behaviour is summed up by one rule:
$$Q_{\text{next}} = D\quad\text{(at each rising clock edge)}.$$
Edge-triggering is what makes large designs reliable. Between clock edges, combinational logic computes the next values, which may flicker as signals settle. At the edge, every flip-flop in the system captures its input at the same moment. The clock period must be longer than the slowest combinational path, which is why circuit depth limits clock speed.

### Registers and counters
Put $n$ D flip-flops side by side with a shared clock and you have an $n$-bit **register**: it stores an $n$-bit number and loads a new one on each clock edge. Processor registers, the fastest storage in a computer, are exactly this.

Connect a register's output to an adder that adds 1, and feed the sum back into the register's input. On every clock edge, the stored value increases by one: a **counter**. Because the register has $n$ bits, it counts modulo $2^n$: a 3-bit counter goes $0, 1, 2, \dots, 7$ and then wraps to $0$. For a 2-bit counter with bits $Q_1Q_0$, the next-state equations are
$$Q_0^{\text{next}} = \overline{Q_0},\qquad Q_1^{\text{next}} = Q_1\oplus Q_0,$$
which you can check: $00\to01\to10\to11\to00$. The lowest bit toggles every cycle, and each higher bit toggles when all bits below it are 1. Counters time events, generate addresses and keep the program counter that tells a processor which instruction to run next.

A **shift register** passes bits along a chain of flip-flops, one position per clock tick. It converts serial data (one bit at a time, as on a USB cable) into parallel data (a whole byte at once) and back.

### Finite state machines
The general design pattern behind every sequential circuit is the **finite state machine** (FSM). It has a finite set of states, stored in flip-flops, and on each clock tick it moves to a new state determined by the current state and the current input. With $k$ flip-flops there are up to $2^k$ states, so a machine with $N$ states needs $\lceil\log_2N\rceil$ flip-flops. In a **Moore machine** the output depends only on the state; in a **Mealy machine** it depends on the state and the input.

A beautiful example is a machine that reads a binary number one bit at a time, most significant bit first, and keeps track of the remainder modulo 3. If the number read so far has remainder $r$, appending a bit $b$ gives the number $2\cdot(\text{old}) + b$, whose remainder is $(2r + b)\bmod3$. Three states, $r = 0, 1, 2$, are enough, no matter how long the number. Reading $110$ (6): $0\xrightarrow{1}1\xrightarrow{1}0\xrightarrow{0}0$, ending in remainder 0, so 6 is divisible by 3. This same object is the deterministic finite automaton of theoretical computer science.

To design an FSM: list the states, draw the state diagram with arrows for each input, assign each state a binary code, write the truth table of next state and output, and minimize it with K-maps. Traffic lights, vending machines, network protocols and keyboard controllers are all designed this way.

:::def Sequential circuit
A circuit whose outputs depend on its current inputs and its stored state, built using feedback or flip-flops.
:::

:::def SR latch
Two cross-coupled NOR (or NAND) gates storing one bit; $S$ sets $Q = 1$, $R$ resets $Q = 0$, and $S = R = 0$ holds the state.
:::

:::def D flip-flop
A one-bit memory element that copies its input $D$ to its output $Q$ at each rising edge of the clock and holds it otherwise.
:::

:::def Register
A group of $n$ flip-flops sharing a clock, storing an $n$-bit value.
:::

:::def Finite state machine
A system with finitely many states that, at each step, moves to a next state determined by the current state and input, and produces an output.
:::

:::warn Common mistakes
Treating a latch and a flip-flop as the same: a latch is level-sensitive (transparent while enabled), a flip-flop is edge-triggered. Using the forbidden input $S = R = 1$. Forgetting that an $n$-bit counter wraps around after $2^n - 1$. And thinking $N$ states need $N$ flip-flops: $\lceil\log_2N\rceil$ suffice.
:::

### Summary
Sequential circuits remember through feedback. The SR latch stores one bit; the D latch and edge-triggered D flip-flop make storage controllable, with a clock synchronizing everything. Registers store $n$-bit values, counters add 1 every clock tick modulo $2^n$, and shift registers move bits along. All of these are finite state machines: states in flip-flops, next-state logic in combinational gates.

@viz dfa machine="divisible by 3" | A three-state machine tracking the remainder mod 3 of a binary number read left to right.

:::explore
**What to try**
1. Type `110` (6) and follow the path of states.
2. Type `111` (7) and `1001` (9) and note the final state each time.
3. Type a long string such as `1111111` (127) and predict the final state before reading it.

**What to notice:** each state is a remainder: $110$ ends in $r_0$ (accepted, since 6 is divisible by 3), $111$ ends in $r_1$ ($7 = 2\cdot3 + 1$) and $1001$ in $r_0$. However long the input, the machine needs only three states, stored in just two flip-flops, because it remembers the remainder, not the whole number. $127 = 42\cdot3 + 1$ ends in $r_1$.
:::

@viz binary bits=4 value=13 | A 4-bit register. Pressing "+1" plays the role of one clock tick of a counter.

:::explore
**What to try**
1. Press "+1" repeatedly from 13 and watch what happens after 15.
2. Watch bit 0 and bit 1: how often does each change?

**What to notice:** the 4-bit counter wraps from 15 ($1111$) to 0, counting modulo $2^4 = 16$. Bit 0 flips on every tick, bit 1 flips every second tick, bit 2 every fourth: each bit toggles when all the bits below it are 1, exactly the rule $Q_1^{\text{next}} = Q_1\oplus Q_0$ from the article.
:::

:::formulas
$$\text{SR latch (NOR): } Q = \overline{R + \overline Q},\quad\overline Q = \overline{S + Q}$$
$$\text{D flip-flop: } Q_{\text{next}} = D\text{ at each rising clock edge}$$
$$n\text{-bit counter: } Q_{\text{next}} = (Q + 1)\bmod2^n\qquad\text{2-bit: } Q_0' = \overline{Q_0},\ Q_1' = Q_1\oplus Q_0$$
$$\text{flip-flops for } N\text{ states} = \lceil\log_2N\rceil\qquad\text{clock period} = 1/f$$
$$\text{mod-3 machine: } r_{\text{next}} = (2r + b)\bmod3$$
:::

:::thm The mod-3 machine is correct
After reading the bits $b_1b_2\dots b_k$ of a number $N$ (most significant first), starting from state 0 and using $r_{\text{next}} = (2r + b)\bmod3$, the state equals $N\bmod3$.
:::

:::proof
By induction on $k$. With no bits read, $N = 0$ and the state is $0$. Suppose after $k$ bits the state is $r = N_k\bmod3$, where $N_k$ is the number formed by those bits. Reading bit $b$ gives $N_{k+1} = 2N_k + b$, and $N_{k+1}\bmod3 = (2(N_k\bmod3) + b)\bmod3 = (2r + b)\bmod3$, which is the next state.
:::

:::steps Trace an SR NOR latch through the inputs (S, R) = (1, 0), (0, 0), (0, 1), (0, 0)
1. $(1, 0)$: set, $Q = 1$.
2. $(0, 0)$: hold, $Q$ stays 1.
3. $(0, 1)$: reset, $Q = 0$. Then $(0, 0)$: hold, $Q$ stays 0.
:::

:::steps A 3-bit counter starts at 5. What does it show after 6 clock ticks?
1. It computes $(5 + 6)\bmod8$.
2. $11\bmod8 = 3$.
3. It shows $011$: the sequence was $6, 7, 0, 1, 2, 3$.
:::

:::steps How many flip-flops does a traffic-light controller with 6 states need?
1. $2^2 = 4 < 6$.
2. $2^3 = 8\ge6$.
3. So $\lceil\log_26\rceil = 3$ flip-flops (2 of the 8 codes go unused and can be don't-cares).
:::

:::mock Exam question
Design a 2-bit counter that counts $00\to01\to10\to11\to00$ using two D flip-flops $Q_1Q_0$. (a) Write the next-state truth table. (b) Give minimal expressions for $D_1$ and $D_0$. (c) If each tick lasts 0.5 ns, how long until the counter returns to 00 for the first time?
:::solution
(a) $00\to01$, $01\to10$, $10\to11$, $11\to00$.
(b) $D_0 = Q_0^{\text{next}}$ is 1 in rows 00 and 10: $D_0 = \overline{Q_0}$. $D_1 = Q_1^{\text{next}}$ is 1 in rows 01 and 10: $D_1 = Q_1\oplus Q_0$.
(c) It takes 4 ticks to return: $4\times0.5 = 2$ ns.
:::
:::

:::cs
CPU pipelines are chains of combinational stages separated by registers, all clocked together. The program counter is a register that usually adds 4 each cycle. Regular-expression engines, lexers and network protocol handlers (like TCP's connection states) are finite state machines in software, and hardware engineers write FSMs in Verilog as a state register plus next-state logic.
:::

:::ml
Recurrent neural networks are sequential systems: a hidden state $h_t = f(h_{t-1}, x_t)$ is updated at each time step, just like an FSM's state, except it is a vector of real numbers learned from data. LSTMs add gates that decide what to keep, forget and output, which are analogues of a latch's set, reset and hold. In hardware, ML accelerators stream weights and activations through register arrays every clock cycle.
:::

:::real
A traffic light, an elevator controller, a washing machine's cycle selector and a digital watch are finite state machines. A push-button lamp that toggles on each press is a one-bit sequential circuit, and the turnstile at a subway station (locked, unlocked) is a textbook two-state machine.
:::

:::quiz
? For a NOR SR latch, what does $S = 0$, $R = 0$ do?
- Sets $Q = 1$
- Resets $Q = 0$
+ Holds the previous state
> With both inputs 0, each gate inverts the other, so the stored bit persists.

? How many flip-flops are needed for a machine with 20 states?
= 5
> $2^4 = 16 < 20\le32 = 2^5$.

? A 4-bit counter starts at 0. What does it show after 18 ticks?
= 2
> $18\bmod16 = 2$.

? What is the clock period, in nanoseconds, of a 2 GHz clock?
= 0.5
> $1/(2\times10^9)$ s $= 0.5$ ns.

? A D flip-flop changes its output...
- whenever $D$ changes
+ only at the active clock edge
- only when $D = 1$
> Edge-triggering is what distinguishes a flip-flop from a transparent latch.

? The mod-3 machine reads 101 (five). What is the final state (remainder)?
= 2
> $0\to1\to(2\cdot1 + 0)\bmod3 = 2\to(2\cdot2 + 1)\bmod3 = 2$, and $5\bmod3 = 2$.
:::
