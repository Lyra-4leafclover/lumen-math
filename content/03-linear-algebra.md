---
id: linear-algebra
title: Linear Algebra
tagline: Vectors, matrices, transformations, eigenvectors and SVD — the native language of machine learning.
desc: Data is vectors, models are matrices. You'll see vectors as arrows and lists, matrices as transformations of space, and build up to determinants, inverses, rank, orthogonality, least squares, eigendecomposition, SVD and PCA.
color: #6366f1
symbol: Ax
area: Linear algebra & calculus
paths: ml, cs
order: 3
---


# Unit: Vectors

## Lesson: What is a vector? {#vectors}
@summary: Arrows, lists of numbers and points in space: three views of one idea, plus length and unit vectors.

### Why start with vectors
Almost everything in machine learning is stored as a list of numbers. A photo is a list of pixel brightnesses. A song is a list of air-pressure samples. A customer is a list such as age, income and number of purchases. A word inside a language model is a list of a few thousand numbers. Linear algebra is the mathematics of these lists: how to add them, stretch them, compare them and transform them. The basic object, the list itself, is called a **vector**.

The word may remind you of physics class, where a vector was "an arrow with a size and a direction". That picture is still correct and still useful. The trick of linear algebra is that the arrow picture and the list picture are the same thing seen from two sides. When you can switch between them freely, a lot of hard-looking formulas turn into simple pictures, and a lot of pictures turn into easy arithmetic.

### An everyday scenario
Imagine you are standing in the middle of a town laid out on a grid. A friend texts you directions to a cafe: "walk 3 blocks east, then 1 block north". That instruction is a vector. You can draw it as an arrow from where you stand to the cafe, or you can write it as the pair of numbers $(3, 1)$. Both describe the same movement.

Notice two things. First, the instruction does not care where you start. If you were standing somewhere else, "3 east, 1 north" would still be a perfectly good instruction; it would just take you somewhere else. An arrow can slide around the page without changing, as long as its length and direction stay the same. Second, the order of the numbers matters. $(3, 1)$ means 3 east and 1 north, while $(1, 3)$ means 1 east and 3 north. A vector is an **ordered** list.

### Three views of one idea
There are three common ways to think about a vector, and you will use all three.

The **physics view** says a vector is an arrow with a length (also called magnitude) and a direction. Two arrows are equal if they have the same length and point the same way, even if they are drawn in different places.

The **computer science view** says a vector is an ordered list of numbers, like $v = (3, 1)$ or $v = (0.2, -1.7, 4.0)$. This is how vectors live inside a computer: as an array.

The **mathematician's view** says a vector is anything you can add together and multiply by numbers, as long as a few sensible rules hold. Arrows and lists both qualify, and so do some surprising things, such as polynomials and functions. You will meet this view properly in the lesson on vector spaces.

These views agree because of coordinates. If you put the tail of an arrow at the origin of a coordinate grid, its tip lands at some point. The coordinates of that point are the list of numbers. In linear algebra we usually write a vector as a **column**:
$$v = \begin{bmatrix} 3 \\ 1 \end{bmatrix} \in \mathbb{R}^2$$
The symbol $\mathbb{R}^2$ (read "R two") means "all lists of 2 real numbers", which is the flat plane. Similarly $\mathbb{R}^3$ is ordinary 3-D space, and $\mathbb{R}^n$ is the set of all lists of $n$ real numbers. You cannot picture $\mathbb{R}^{784}$, but you can compute in it exactly as you do in $\mathbb{R}^2$.

:::def Vector
An ordered list of $n$ real numbers $v = (v_1, v_2, \dots, v_n)$, also pictured as an arrow from the origin to the point with those coordinates. The set of all such lists is $\mathbb{R}^n$.
:::

:::def Component
One entry $v_i$ of a vector. In $\mathbb{R}^2$ the first component is the horizontal step and the second is the vertical step.
:::

### Components: walking along the axes
The numbers inside a vector are its **components**. For $v = (3, 1)$ the first component is 3 and the second is 1. You can read them as instructions: walk 3 units along the $x$-axis, then 1 unit along the $y$-axis. In 3-D, $w = (2, -1, 4)$ means 2 along $x$, 1 backwards along $y$, and 4 up along $z$. A negative component simply means "walk the other way".

A special vector is the **zero vector** $0 = (0, 0, \dots, 0)$. It is the instruction "don't move". As an arrow it has no length and no direction. It plays the same role for vectors that the number 0 plays for numbers.

### Length: Pythagoras in disguise
How long is the arrow $(3, 4)$? Walk 3 across and 4 up, and you have built a right triangle with legs 3 and 4. The arrow is the hypotenuse, so by Pythagoras its length is $\sqrt{3^2 + 4^2} = \sqrt{25} = 5$. We write the length of $v$ as $\|v\|$ and call it the **norm** (or magnitude) of $v$.

In 3-D the same idea works twice. For $w = (1, 2, 2)$, the floor diagonal has length $\sqrt{1^2 + 2^2} = \sqrt5$, and going up 2 more gives $\sqrt{5 + 2^2} = \sqrt9 = 3$. In general:
$$\|v\| = \sqrt{v_1^2 + v_2^2 + \dots + v_n^2}$$
This is the straight-line, "as the crow flies" length. Other ways of measuring size exist, and you'll meet them in the lesson on norms.

:::def Norm (length)
$\|v\| = \sqrt{v_1^2 + \dots + v_n^2}$, the straight-line length of the arrow $v$. It is never negative, and it is zero only for the zero vector.
:::

### Unit vectors: pure direction
Sometimes you only care about direction, not size. A **unit vector** is a vector of length exactly 1. To turn any nonzero vector into a unit vector pointing the same way, divide it by its own length:
$$\hat v = \frac{v}{\|v\|}$$
For $v = (3, 4)$, $\|v\| = 5$, so $\hat v = (0.6, 0.8)$. Check: $\sqrt{0.36 + 0.64} = 1$. This step is called **normalizing**. The hat symbol $\hat{}$ is the usual way to mark a unit vector.

Two unit vectors are so common that they get their own names: $\hat\imath = (1, 0)$ points one step along $x$ and $\hat\jmath = (0, 1)$ points one step along $y$. Every 2-D vector is built from them: $(3, 1) = 3\hat\imath + 1\hat\jmath$.

:::def Unit vector
A vector with length 1. Any nonzero $v$ can be normalized to $\hat v = v / \|v\|$, which keeps the direction and throws away the size.
:::

### Why it works
The reason the arrow view and the list view never disagree is that both are describing a displacement, a "how far in each direction". The list stores the displacement along each axis separately. The arrow shows the total displacement at once. Pythagoras connects them: the total length comes from the separate pieces. Because the axes are perpendicular, the pieces do not interfere with each other, and this is what makes the formula so simple.

:::warn Common mistakes
- Adding the components to get the length. $\|(3, 4)\|$ is $5$, not $7$. You square, add, then take the square root.
- Forgetting that squaring kills the sign: $\|(-3, 4)\| = 5$ as well.
- Trying to normalize the zero vector. It has length 0, and you can't divide by 0. It has no direction to keep.
- Mixing up a point and a vector. A point is a location; a vector is a movement. In coordinates they look the same, which is convenient but can confuse you when we start moving vectors around.
:::

### Summary
A vector is an ordered list of numbers that you can also picture as an arrow. Its entries are components, its length is the square root of the sum of squared components, and dividing by the length gives a unit vector that keeps only the direction. In ML, every input, every embedding and every set of model parameters is a vector, so this one idea is the foundation for everything that follows.

@viz vector mode=comps | Drag the tip of u. The orange and green segments are its components.

:::explore
**What to try**
1. Drag the tip to $(3, 4)$ and read the length in the panel. It should say 5.
2. Drag it to $(-3, 4)$ and then $(-3, -4)$. Watch the angle change but the length stay 5.
3. Drag it close to the origin, then far away, keeping the same direction. Compare the unit vector shown in the panel each time.
4. Put the tip exactly on an axis, such as $(0, 2)$. One component disappears.

**What to notice:** the components are the "shadows" of the arrow on each axis, exactly the right-triangle legs from the article. The unit vector stays the same when you only change the length, because normalizing throws away size and keeps direction.
:::

:::formulas
$$v = (v_1, \dots, v_n) \in \mathbb{R}^n$$
$$\|v\| = \sqrt{v_1^2 + v_2^2 + \dots + v_n^2}$$
$$\hat v = \frac{v}{\|v\|}\quad (v \ne 0)$$
:::

:::thm Length is zero only for the zero vector
$\|v\| \ge 0$ for every $v$, and $\|v\| = 0$ exactly when $v = 0$.
:::

:::proof
$\|v\|^2 = v_1^2 + \dots + v_n^2$ is a sum of squares, so it is at least 0. A sum of non-negative numbers is 0 only if every term is 0, so each $v_i = 0$.
:::

:::steps Find the length and unit vector of $v = (2, -1, 2)$
1. Square the components: $4, 1, 4$.
2. Add them: $4 + 1 + 4 = 9$.
3. Take the square root: $\|v\| = 3$.
4. Divide each component by 3: $\hat v = \left(\tfrac23, -\tfrac13, \tfrac23\right)$.
5. Check: $\tfrac49 + \tfrac19 + \tfrac49 = 1$, so $\|\hat v\| = 1$.
:::

:::steps A drone flies 6 m east, 8 m north and rises 24 m. How far is it from the start?
1. Write the displacement as a vector: $d = (6, 8, 24)$.
2. $\|d\|^2 = 36 + 64 + 576 = 676$.
3. $\|d\| = \sqrt{676} = 26$ m.
:::

:::mock Exam question
Find all values of $k$ for which the vector $(k, 2k, 2)$ has length 3.
:::solution
$\|(k, 2k, 2)\|^2 = k^2 + 4k^2 + 4 = 5k^2 + 4$. Setting this equal to $3^2 = 9$ gives $5k^2 = 5$, so $k^2 = 1$ and $k = 1$ or $k = -1$. Check $k = 1$: $\sqrt{1 + 4 + 4} = 3$.
:::
:::

:::ml Everything is a vector
- A 28×28 grayscale image is a vector in $\mathbb{R}^{784}$, one component per pixel.
- A word embedding is a vector in $\mathbb{R}^{300}$ (or several thousand dimensions in a large language model).
- A row of a spreadsheet (age, income, clicks) is a feature vector.
- All the weights of a neural network form one huge vector $\theta \in \mathbb{R}^{p}$, and training moves this vector around.
- Normalizing embeddings to unit length is standard before comparing them, so that only direction (meaning) matters, not size.
:::

:::real
A GPS fix, a wind reading ("15 km/h from the north-west") and the colour of a pixel $(R, G, B) = (255, 128, 0)$ are all vectors. A pilot adds the plane's velocity vector and the wind vector to get the actual ground velocity.
:::

:::cs
In code a vector is just an array: `v = [3, 1]`. Its length is `math.sqrt(sum(x*x for x in v))`, or `np.linalg.norm(v)` in NumPy. Graphics engines store positions, velocities and surface normals as 3-D vectors and normalize the normals constantly for lighting calculations.
:::

:::quiz
? What is $\left\| (3, 4) \right\|$?
= 5
> $\sqrt{9 + 16} = \sqrt{25} = 5$.

? What is the unit vector in the direction of $(0, -2)$?
- $(0, 2)$
+ $(0, -1)$
- $(0, -\tfrac12)$
> Divide by the length 2: $(0, -2)/2 = (0, -1)$.

? What is the length of $(1, 2, 2)$?
= 3
> $\sqrt{1 + 4 + 4} = 3$.

? Which statement is true about $(2, 5)$ and $(5, 2)$?
- They are the same vector because they have the same numbers.
+ They are different vectors with the same length.
- They have different lengths.
> Order matters, so they are different vectors, but both have length $\sqrt{29}$.

? A vector in $\mathbb{R}^{784}$ has how many components?
= 784
> $\mathbb{R}^n$ is the set of lists of $n$ numbers.

? The first component of the unit vector in the direction of $(3, 4)$ is...
= 0.6|3/5
> $\hat v = (3, 4)/5 = (0.6, 0.8)$.
:::

## Lesson: Vector addition and scaling {#vector-ops}
@summary: Tip-to-tail addition, scalar multiplication, subtraction and distance, and the rules they obey.

### Why we need operations on vectors
A list of numbers on its own is just storage. Vectors become powerful when we can combine them. Two operations do almost all the work in linear algebra: **adding** two vectors and **scaling** a vector by a number. Every other idea in this course, from spans to matrices to neural network layers, is built out of these two moves. They are simple, but it is worth understanding them in both the list view and the arrow view, because the arrow view is where the intuition comes from.

### An everyday scenario
Imagine you're rowing a boat across a river. You row straight across at 3 km/h, so your rowing velocity is $(3, 0)$. Meanwhile the river current pushes you downstream at 1 km/h, which is $(0, -1)$. Where do you actually go? Each hour you move 3 across *and* 1 downstream, so your real velocity is $(3, 0) + (0, -1) = (3, -1)$. That is vector addition: two effects acting together combine into one.

Now suppose you row twice as hard. Your rowing velocity becomes $2 \cdot (3, 0) = (6, 0)$. Same direction, double the length. That is scaling.

### Adding vectors
To add two vectors, add matching components:
$$\begin{bmatrix}1\\2\end{bmatrix} + \begin{bmatrix}3\\-1\end{bmatrix} = \begin{bmatrix}1 + 3\\2 + (-1)\end{bmatrix} = \begin{bmatrix}4\\1\end{bmatrix}$$
Both vectors must have the same number of components. Adding a 2-D vector to a 3-D vector makes no sense.

In the arrow view, addition is **tip-to-tail**. Draw the first arrow. Then slide the second arrow so its tail sits at the tip of the first. The sum is the arrow from the very start to the very end. This is exactly "walk $u$, then walk $v$". Since walking $v$ first and then $u$ takes you to the same place, $u + v = v + u$. The two possible paths form the sides of a parallelogram, and the sum is its diagonal. This is why vector addition is sometimes called the **parallelogram rule**.

### Scaling vectors
A plain number is called a **scalar** in linear algebra, because it scales things. To multiply a vector by a scalar $c$, multiply every component by $c$:
$$3\begin{bmatrix}1\\2\end{bmatrix} = \begin{bmatrix}3\\6\end{bmatrix}$$
In the arrow view, $cv$ points along the same line as $v$ and is $|c|$ times as long. If $c$ is between 0 and 1 it shrinks the arrow, if $c > 1$ it stretches it, if $c = 0$ it collapses to the zero vector, and if $c$ is negative it flips the arrow to point the opposite way. In particular $-v = (-1)v$ has the same length as $v$ but the opposite direction.

The length scales in a clean way: $\|cv\| = |c|\,\|v\|$. For example $\|(3, 6)\| = 3\|(1, 2)\| = 3\sqrt5$.

:::def Scalar
An ordinary real number, used to multiply (scale) a vector. Multiplying $v$ by $c$ multiplies each component by $c$ and its length by $|c|$.
:::

### Subtracting vectors and measuring distance
Subtraction is adding the negative: $u - v = u + (-v)$, done component by component. For $u = (4, 5)$ and $v = (1, 1)$, $u - v = (3, 4)$.

The arrow picture is the useful part. $u - v$ is the arrow that goes **from the tip of $v$ to the tip of $u$**. Check it: start at $v$, add $u - v$, and you land on $v + (u - v) = u$. So if $u$ and $v$ are two points, $u - v$ is the step you need to get from $v$ to $u$, and the **distance** between them is the length of that step:
$$\text{dist}(u, v) = \|u - v\|$$
For the points $(4, 5)$ and $(1, 1)$, the distance is $\|(3, 4)\| = 5$.

### Combining both moves
You can scale and add in one expression. For $u = (1, 2)$ and $v = (3, -1)$:
$$2u - v = (2, 4) - (3, -1) = (-1, 5)$$
The order of operations is the same as with numbers: do scaling before adding unless brackets say otherwise. Expressions like $au + bv$ are so important that they get a name, **linear combinations**, and they are the subject of the next lesson.

### The rules these operations follow
Vector addition and scaling obey the same algebra rules you already know from numbers. Addition is **commutative** ($u + v = v + u$) and **associative** ($(u + v) + w = u + (v + w)$). Adding the zero vector changes nothing. Every vector has a negative that cancels it. Scaling **distributes**: $c(u + v) = cu + cv$ and $(a + b)v = av + bv$. And $1v = v$. Each rule is true because it is true for every component separately, and components are just numbers. These eight rules are exactly what mathematicians use to define a "vector space".

:::key
Addition and scaling are done one component at a time. Geometrically, addition is walking one arrow after another, and scaling stretches, shrinks or flips an arrow along its own line.
:::

### Why it works
Each component tracks movement along one axis, and movements along different axes don't interfere. If you walk 1 east then 3 east, you walked 4 east, no matter how much you walked north along the way. That is why we can simply add the east parts and the north parts separately. Scaling works the same way: doing the same walk three times triples each part.

:::warn Common mistakes
- Thinking $\|u + v\| = \|u\| + \|v\|$. Lengths only add when the vectors point the same way. For $(3, 0) + (0, 4) = (3, 4)$ the lengths are $3 + 4 = 7$ but the sum has length 5.
- Getting subtraction backwards. $u - v$ points **to** $u$, **from** $v$.
- Forgetting that a negative scalar reverses direction; $-2v$ is not "a shorter $v$", it's twice as long and backwards.
- Adding vectors of different sizes, like $(1, 2) + (1, 2, 3)$. This is undefined.
:::

### Summary
Add vectors by adding components; picture it as tip-to-tail walking. Scale a vector by multiplying every component; picture it as stretching along its own line, flipping if the scalar is negative. Subtraction $u - v$ is the arrow from $v$ to $u$, and its length is the distance between them. These two operations, and the familiar rules they obey, are the entire toolkit linear algebra is built from.

@fig vector mode=add | Tip-to-tail: the dashed copies show walking u then v, or v then u. Both reach u + v.

@viz vector mode=add | Switch between u + v, u − v and c·u using the buttons. Drag the arrow tips.

:::explore
**What to try**
1. In **u + v** mode, drag $v$ around and watch the dashed parallelogram. The purple sum is always its diagonal.
2. Make $u$ and $v$ point the same way. The length of the sum equals the sum of the lengths. Now make them perpendicular and compare.
3. Switch to **u − v**. Put $u = (4, 2)$ and $v = (1, -2)$ and read off the distance between the tips. It should be 5.
4. Switch to **c · u** and drag the slider from 3 down to −3, stopping at 0.

**What to notice:** the sum walks one arrow after the other, the difference connects the two tips, and scaling never leaves the dashed line through $u$ (its span). These are the three pictures from the article.
:::

:::formulas
$$u + v = (u_1 + v_1, \dots, u_n + v_n)$$
$$cv = (cv_1, \dots, cv_n), \qquad \|cv\| = |c|\,\|v\|$$
$$\text{dist}(u, v) = \|u - v\|$$
:::

:::thm Triangle inequality
For any vectors $u, v$: $\|u + v\| \le \|u\| + \|v\|$, with equality exactly when one is a non-negative multiple of the other.
:::

:::proof Sketch
Tip-to-tail, $u$, $v$ and $u + v$ form a triangle. One side of a triangle can't be longer than the other two put together, because the straight path is the shortest. The two sides line up into one straight path only when $u$ and $v$ point the same way. (An algebraic proof uses the Cauchy–Schwarz inequality from the dot product lesson.)
:::

:::steps Compute $3(1, -2) - 2(2, 1)$
1. Scale first: $3(1, -2) = (3, -6)$ and $2(2, 1) = (4, 2)$.
2. Subtract component by component: $(3 - 4, -6 - 2) = (-1, -8)$.
:::

:::steps Find the distance between $(1, 1, 0)$ and $(3, -1, 1)$
1. Subtract: $(3, -1, 1) - (1, 1, 0) = (2, -2, 1)$.
2. Length: $\sqrt{4 + 4 + 1} = \sqrt9 = 3$.
:::

:::steps Find the midpoint of $p = (2, 6)$ and $q = (8, 2)$
1. The step from $p$ to $q$ is $q - p = (6, -4)$.
2. Go half of it: $p + \tfrac12(q - p) = (2, 6) + (3, -2) = (5, 4)$.
3. Equivalently, $\tfrac12(p + q) = \tfrac12(10, 8) = (5, 4)$.
:::

:::mock Exam question
Find scalars $a$ and $b$ such that $a(1, 2) + b(3, 1) = (7, 9)$.
:::solution
Componentwise: $a + 3b = 7$ and $2a + b = 9$. From the first, $a = 7 - 3b$. Substitute: $2(7 - 3b) + b = 9$, so $14 - 5b = 9$ and $b = 1$. Then $a = 4$. Check: $4(1, 2) + 1(3, 1) = (4 + 3, 8 + 1) = (7, 9)$.
:::
:::

:::ml
Word embeddings support arithmetic: $\text{king} - \text{man} + \text{woman}$ lands close to $\text{queen}$, because directions in embedding space carry meaning. Every gradient descent step is a scaled vector addition, $\theta_{\text{new}} = \theta - \eta\,\nabla L$: the learning rate $\eta$ scales the gradient, and we subtract it from the parameters. Averaging vectors (adding and scaling by $\tfrac1n$) gives the mean of a dataset or the centroid in k-means.
:::

:::real
Forces add as vectors: if two people pull a box with forces $(30, 40)$ N and $(50, -40)$ N, the box feels $(80, 0)$ N, straight ahead. Pilots and sailors add their own velocity to the wind or current velocity to find where they really go.
:::

:::cs
Game engines update positions every frame with `position = position + velocity * dt`, which is scaling and addition. In NumPy `u + v` and `3 * v` work component by component on whole arrays at once.
:::

:::quiz
? Compute $3(1, -2) - (2, 2)$.
+ $(1, -8)$
- $(1, -4)$
- $(5, -4)$
> $(3, -6) - (2, 2) = (1, -8)$.

? What is the distance between $(1, 1)$ and $(4, 5)$?
= 5
> The difference is $(3, 4)$, whose length is 5.

? If $\|v\| = 4$, what is $\|-3v\|$?
= 12
> $\|cv\| = |c|\,\|v\| = 3 \cdot 4$.

? The vector $u - v$ points...
- from the tip of $u$ to the tip of $v$
+ from the tip of $v$ to the tip of $u$
- from the origin to the midpoint
> $v + (u - v) = u$, so it starts at $v$ and ends at $u$.

? $\|(3, 0) + (0, 4)\|$ equals...
= 5
> The sum is $(3, 4)$. Lengths don't simply add unless the vectors point the same way.

? What is the first component of the midpoint of $(2, 6)$ and $(8, 2)$?
= 5
> $\tfrac12\big((2, 6) + (8, 2)\big) = (5, 4)$.
:::

## Lesson: Linear combinations, span and independence {#span}
@summary: Everything you can reach from a set of vectors, when vectors are redundant, and what a basis and dimension are.

### The question this lesson answers
Suppose someone hands you a few vectors and lets you scale them and add them together as much as you like. Which points can you reach? Can you reach everywhere, or only some places? And are all the vectors you were given actually needed, or are some of them just repeating what the others already do? These three questions lead to three of the most important words in linear algebra: **span**, **linear independence** and **basis**. They come up every time we ask whether a system of equations has a solution, whether a dataset has redundant features, or how many numbers we really need to describe something.

### An everyday scenario
Imagine a paint shop that only stocks two base paints, red and blue, and you can mix any amount of each. Every colour you can make is "some amount of red plus some amount of blue". You can make purples of every shade, but no amount of mixing will ever give you yellow. The set of all colours you can mix is the span of red and blue. Now suppose the shop also stocks purple. That doesn't let you make anything new, because purple was already a mix of red and blue. Purple is **redundant**: the three paints are not independent. To reach yellow you'd need a genuinely new direction, a paint that is not a mix of the ones you have.

### Linear combinations
A **linear combination** of vectors $v_1, \dots, v_k$ is any expression
$$c_1 v_1 + c_2 v_2 + \dots + c_k v_k$$
where the $c_i$ are scalars, called the **weights** or coefficients. You scale each vector by its weight and add the results. For example with $v = (2, 1)$ and $w = (-1, 1)$:
$$1v + 1w = (1, 2), \qquad 2v - w = (5, 1), \qquad 0v + 0w = (0, 0)$$
Notice that the zero vector is always a linear combination: just pick every weight to be 0.

### Span
The **span** of a set of vectors is the set of every linear combination of them, everything you can reach. Let's build intuition with small cases in the plane.

The span of a single nonzero vector $v$ is all the multiples $cv$. Those all lie on one line through the origin, the line through $v$. So the span of one vector is a line.

The span of two vectors $v$ and $w$ that point in different directions is the whole plane. Here is why. You can slide along the $v$-line any distance and then along the $w$-direction any distance. With two different directions available you can reach any point, the same way "east-west" and "north-south" streets reach every corner of a town, even if the streets are slanted.

But if $w$ is a multiple of $v$, for example $v = (1, 2)$ and $w = (-2, -4) = -2v$, then any combination $av + bw = (a - 2b)v$ is still just a multiple of $v$. The span collapses to a line. The second vector added nothing new.

In 3-D the pattern continues: one nonzero vector spans a line, two vectors in different directions span a plane through the origin, and three vectors that don't all lie in a common plane span all of space.

:::def Linear combination
A sum of scalar multiples $c_1v_1 + \dots + c_kv_k$ of the vectors $v_1, \dots, v_k$.
:::

:::def Span
The set of all linear combinations of a collection of vectors. It is always a line, plane or higher-dimensional flat space passing through the origin.
:::

### Linear independence: is anyone redundant?
A set of vectors is **linearly dependent** if at least one of them is a linear combination of the others, so it adds nothing to the span. If none of them is redundant, the set is **linearly independent**.

The official test is neat. The vectors $v_1, \dots, v_k$ are independent exactly when the **only** way to make zero,
$$c_1 v_1 + \dots + c_k v_k = 0,$$
is the boring way with every $c_i = 0$. Why does this capture redundancy? If some combination with a nonzero weight gives zero, say $2v_1 + v_2 - v_3 = 0$, then you can solve for the vector with nonzero weight: $v_3 = 2v_1 + v_2$. That vector was redundant.

Some quick checks: any set containing the zero vector is dependent (use weight 1 on the zero vector). Two vectors are dependent exactly when one is a multiple of the other. And in $\mathbb{R}^2$, any three vectors are dependent, because two independent ones already span the plane, so the third must be a combination of them.

:::def Linear independence
Vectors $v_1, \dots, v_k$ are linearly independent if $c_1v_1 + \dots + c_kv_k = 0$ forces $c_1 = \dots = c_k = 0$. Otherwise at least one of them is a combination of the others.
:::

### Basis and dimension
A **basis** of a space is a set of vectors that is both independent and spans the space. It is a "just right" set: enough vectors to reach everything, and no extras. The most familiar basis of $\mathbb{R}^2$ is the **standard basis** $\hat\imath = (1, 0)$, $\hat\jmath = (0, 1)$, and $(3, 1) = 3\hat\imath + 1\hat\jmath$. But $(2, 1)$ and $(-1, 1)$ are also a basis of $\mathbb{R}^2$. There are infinitely many bases.

A basis has a wonderful property: every vector in the space can be written as a combination of basis vectors in **exactly one** way. The weights are then called the **coordinates** of the vector in that basis. And although there are many bases, they all have the same number of vectors. That number is the **dimension** of the space: 2 for the plane, 3 for ordinary space, $n$ for $\mathbb{R}^n$.

:::def Basis
A linearly independent set of vectors that spans the space. Every vector in the space is a combination of basis vectors in exactly one way.
:::

:::def Dimension
The number of vectors in any basis of a space. $\mathbb{R}^n$ has dimension $n$; a plane through the origin has dimension 2.
:::

### Why it works
Uniqueness of coordinates comes straight from independence. Suppose a vector had two different recipes, $x = a_1b_1 + a_2b_2 = c_1b_1 + c_2b_2$. Subtracting gives $(a_1 - c_1)b_1 + (a_2 - c_2)b_2 = 0$. Independence says both weights must be zero, so $a_1 = c_1$ and $a_2 = c_2$. The two recipes were the same after all.

:::warn Common mistakes
- Thinking "more vectors means bigger span". Adding a redundant vector doesn't change the span at all.
- Thinking two vectors are independent just because they look different. $(1, 2)$ and $(-3, -6)$ look different but are parallel.
- Forgetting that a span always contains the origin. A line that doesn't pass through 0 is not the span of anything.
- Checking pairs only. Three vectors in 3-D can be pairwise non-parallel yet still lie in one plane, like $(1, 0, 0)$, $(0, 1, 0)$ and $(1, 1, 0)$.
:::

### Summary
A linear combination scales vectors and adds them. The span is everything you can reach that way. Vectors are independent when none is a combination of the others, which is the same as saying the only combination giving zero uses all-zero weights. A basis is an independent spanning set, it gives every vector unique coordinates, and its size is the dimension of the space.

@viz span | Move the sliders a and b to reach different points. Then drag w onto the line through v.

:::explore
**What to try**
1. Set $a = 2$, $b = -1$ and read the combination. Now try to reach the point $(0, 3)$ by moving only the sliders.
2. Drag $w$ around and notice the slanted grid: every grid crossing is a combination with whole-number weights.
3. Drag $w$ until it lies along the line through $v$ (for example $w = (-2, -1)$). The panel says "dependent" and the grid collapses to a single orange line.
4. With $w$ parallel to $v$, try to reach a point off the line using the sliders. You can't.

**What to notice:** with two independent vectors the slanted grid covers the whole plane, so the span is $\mathbb{R}^2$ and $(v, w)$ is a basis. When $w$ becomes a multiple of $v$ the span drops to a line, exactly the redundancy described in the article.
:::

:::formulas
$$\text{span}(v_1, \dots, v_k) = \{c_1v_1 + \dots + c_kv_k : c_i \in \mathbb{R}\}$$
$$\text{independent} \iff \left(c_1v_1 + \dots + c_kv_k = 0 \Rightarrow \text{all } c_i = 0\right)$$
$$\dim \mathbb{R}^n = n$$
:::

:::thm Too many vectors are always dependent
Any $n + 1$ (or more) vectors in $\mathbb{R}^n$ are linearly dependent. Any $n$ independent vectors in $\mathbb{R}^n$ form a basis.
:::

:::proof Idea
Solving $c_1v_1 + \dots + c_{n+1}v_{n+1} = 0$ is a system of $n$ equations in $n + 1$ unknowns with zero on the right. Elimination leaves at least one free unknown, so a nonzero solution exists. For the second claim: if $n$ independent vectors did not span $\mathbb{R}^n$, we could add a vector outside their span and get $n + 1$ independent vectors, contradicting the first claim.
:::

:::steps Are $(1, 2, 3)$, $(0, 1, 1)$ and $(2, 5, 7)$ independent?
1. Look for $a, b, c$ with $a(1,2,3) + b(0,1,1) + c(2,5,7) = 0$.
2. First component: $a + 2c = 0$, so $a = -2c$.
3. Second: $2a + b + 5c = 0$ gives $-4c + b + 5c = 0$, so $b = -c$.
4. Third: $3a + b + 7c = -6c - c + 7c = 0$. Always true, so $c$ is free. Take $c = -1$: $a = 2$, $b = 1$.
5. So $2v_1 + v_2 - v_3 = 0$. They are **dependent**: $(2, 5, 7) = 2(1, 2, 3) + (0, 1, 1)$, and they span only a plane.
:::

:::steps Write $(7, 4)$ in the basis $v = (2, 1)$, $w = (-1, 1)$
1. Solve $a(2, 1) + b(-1, 1) = (7, 4)$: $2a - b = 7$ and $a + b = 4$.
2. Add the equations: $3a = 11$, so $a = \tfrac{11}{3}$.
3. Then $b = 4 - \tfrac{11}{3} = \tfrac13$.
4. Check: $\tfrac{11}{3}(2, 1) + \tfrac13(-1, 1) = (\tfrac{22 - 1}{3}, \tfrac{11 + 1}{3}) = (7, 4)$.
:::

:::mock Exam question
For which value of $k$ are $(1, 3)$ and $(2, k)$ linearly dependent? What is their span then?
:::solution
Two vectors are dependent exactly when one is a multiple of the other. $(2, k) = 2(1, 3)$ requires $k = 6$. (Equivalently, $1\cdot k - 3\cdot 2 = 0$.) Then the span is the line through the origin in the direction $(1, 3)$, which is $y = 3x$. For every other $k$ the span is all of $\mathbb{R}^2$.
:::
:::

:::ml
- **Redundant features**: if one column of your data is a combination of others (say "total price" = "price" + "tax"), the features are dependent. Linear regression can't separate their effects and $X^TX$ becomes non-invertible.
- **Expressive power**: a linear layer's outputs always lie in the span of its weight columns. That's one reason we add nonlinearities between layers.
- **Embeddings**: the dimension of an embedding space is the number of independent directions available to encode meaning.
:::

:::real
Colour screens mix red, green and blue light. Every displayable colour is a combination of those three independent "basis colours", which is why colour is often described as 3-dimensional. A fourth primary would be redundant for most colours.
:::

:::quiz
? What is the dimension of the span of $(1, 1)$ and $(-2, -2)$?
= 1
> $(-2, -2) = -2(1, 1)$, so both lie on one line.

? How many vectors are in any basis of $\mathbb{R}^5$?
= 5
> The dimension of $\mathbb{R}^n$ is $n$.

? Any set of vectors containing the zero vector is...
+ linearly dependent
- linearly independent
- a basis
> $1\cdot 0 = 0$ is a combination with a nonzero weight that gives zero.

? Three vectors in $\mathbb{R}^2$ are always...
- independent
+ dependent
- a basis
> At most 2 vectors in $\mathbb{R}^2$ can be independent.

? For which $k$ are $(2, 4)$ and $(3, k)$ dependent?
= 6
> $(3, k) = 1.5(2, 4)$ needs $k = 6$.

? $(1, 0, 0)$, $(0, 1, 0)$ and $(1, 1, 0)$ span...
- all of $\mathbb{R}^3$
+ a plane
- a line
> The third is the sum of the first two, so only two independent directions remain.
:::

## Lesson: Vector spaces and subspaces {#vector-spaces}
@summary: The rules that make something a vector space, subspaces through the origin, and examples beyond arrows.

### Why define a "vector space" at all
So far a vector has been a list of numbers. But many other objects behave exactly like lists: you can add them and scale them, and the same rules hold. Polynomials, sound signals, images and even functions can be added and scaled. Mathematicians noticed that every theorem in linear algebra only ever uses those two operations and a handful of rules. So instead of proving everything separately for lists, for polynomials and for functions, they defined a **vector space** as "any collection where addition and scaling work properly". Prove a theorem once for vector spaces, and it holds for all of them. This lesson also introduces **subspaces**, the flat pieces of space through the origin that will show up again as column spaces, null spaces and the spaces PCA projects onto.

### An everyday scenario
Imagine a music app that stores every song clip as a list of 44,100 sound samples per second. If you play two clips at the same time, the speaker adds the samples together. If you turn the volume up by 50%, every sample is multiplied by 1.5. Audio clips therefore add and scale exactly like vectors. Audio engineers mixing tracks are, without saying it, doing linear algebra in a vector space with tens of thousands of dimensions.

### The rules
A **vector space** is a set $V$ of objects (called vectors) together with an addition and a scalar multiplication, such that the results stay in $V$ and these rules hold for all $u, v, w$ in $V$ and all scalars $a, b$:

The addition rules say $u + v = v + u$, $(u + v) + w = u + (v + w)$, there is a zero vector with $v + 0 = v$, and every $v$ has a negative $-v$ with $v + (-v) = 0$. The scaling rules say $a(u + v) = au + av$, $(a + b)v = av + bv$, $a(bv) = (ab)v$, and $1v = v$.

You don't need to memorize these eight rules. They are exactly the familiar rules of arithmetic, and they hold for lists because they hold for each component. The important part is the word "stay": adding two vectors, or scaling one, must never take you outside the set. This is called being **closed** under addition and scaling.

:::def Vector space
A set with an addition and a scalar multiplication that stay inside the set (closure) and obey the usual rules of arithmetic: commutativity, associativity, a zero vector, negatives and distributivity.
:::

### Examples beyond arrows
$\mathbb{R}^n$ is the main example. Here are others.

**Polynomials** of degree at most 2, like $p(x) = 3 + 2x - x^2$. Add two of them and you get another polynomial of degree at most 2; scale one and the same is true. A natural basis is $1, x, x^2$, so this space has dimension 3, and the polynomial $3 + 2x - x^2$ has coordinates $(3, 2, -1)$. Polynomials are secretly vectors of coefficients.

**Matrices** of a fixed shape, like all $2 \times 2$ matrices. You add them entry by entry and scale every entry. This space has dimension 4.

**Functions** from $\mathbb{R}$ to $\mathbb{R}$. The sum $(f + g)(x) = f(x) + g(x)$ and the scaling $(cf)(x) = c\,f(x)$ are again functions. This space is infinite-dimensional, which is the setting for Fourier analysis and kernel methods.

### Subspaces
A **subspace** is a subset of a vector space that is itself a vector space using the same operations. Because the rules are inherited automatically, you only need to check three things. A subset $S$ is a subspace if:

1. It contains the zero vector.
2. It is closed under addition: if $u$ and $v$ are in $S$, so is $u + v$.
3. It is closed under scaling: if $v$ is in $S$, so is $cv$ for every scalar $c$.

Let's test a few sets in $\mathbb{R}^2$. The line $y = 2x$ contains $(0, 0)$. If $(a, 2a)$ and $(b, 2b)$ are on it, their sum $(a + b, 2(a + b))$ is too, and $c(a, 2a) = (ca, 2ca)$ is too. So it is a subspace.

The line $y = 2x + 1$ does not contain $(0, 0)$, because $0 \ne 1$. It fails rule 1 immediately, so it is not a subspace, even though it is a perfectly straight line.

The first quadrant, all $(x, y)$ with $x \ge 0$ and $y \ge 0$, contains zero and is closed under addition. But $(1, 1)$ is in it and $-1\cdot(1, 1) = (-1, -1)$ isn't. It fails rule 3.

In $\mathbb{R}^3$ the subspaces are exactly: the origin alone, lines through the origin, planes through the origin, and all of $\mathbb{R}^3$. In general, every span is a subspace, and every subspace of $\mathbb{R}^n$ is the span of some basis.

:::def Subspace
A subset of a vector space that contains the zero vector and is closed under addition and scalar multiplication. In $\mathbb{R}^n$ these are the flat spaces (lines, planes, ...) through the origin.
:::

### Two subspaces you will meet constantly
The set of solutions of a **homogeneous** system $Ax = 0$ is always a subspace, called the null space. If $Ax = 0$ and $Ay = 0$, then $A(x + y) = 0 + 0 = 0$ and $A(cx) = c\cdot 0 = 0$. Similarly, the set of all outputs $Ax$, the column space, is a subspace because it is the span of the columns of $A$. Both are central in the lesson on rank.

By contrast, the solutions of $Ax = b$ with $b \ne 0$ are **not** a subspace, because $x = 0$ gives $A0 = 0 \ne b$. They form a shifted copy of the null space.

### Why it works
The three-rule test is enough because all the arithmetic rules (commutativity, distributivity and so on) are already true in the bigger space, so they remain true for any subset. The only things that can go wrong for a subset are that the zero vector or a negative might be missing, or that an operation could carry you out of the subset. Closure under scaling with $c = 0$ and $c = -1$ supplies zero and negatives, so really closure is the heart of the matter.

:::warn Common mistakes
- Calling any straight line a subspace. It must pass through the origin.
- Checking closure with one example. You must show it for **every** pair of vectors and every scalar, usually with letters, not numbers.
- Forgetting negative scalars. Sets like "vectors with non-negative entries" fail only because of negative scaling.
- Assuming the union of two subspaces is a subspace. The $x$-axis together with the $y$-axis is not: $(1, 0) + (0, 1) = (1, 1)$ is on neither.
:::

### Summary
A vector space is any set where addition and scaling stay inside the set and follow ordinary arithmetic rules. Lists, polynomials, matrices, signals and functions all qualify. A subspace is a subset that contains zero and is closed under addition and scaling; in $\mathbb{R}^n$ these are the lines, planes and higher flat pieces through the origin. Null spaces and column spaces are the subspaces linear algebra cares about most.

@viz span | Every point reachable with the sliders is in the span. A span always passes through the origin and is closed under adding and scaling.

:::explore
**What to try**
1. Set both sliders to 0. The combination is the zero vector, so the origin is always in the span.
2. Make $w$ parallel to $v$ so the span is a single line. Pick two points on the line (two slider settings) and add them in your head; the sum is still on the line.
3. Now set $a = -1$, $b = 0$: scaling by a negative number keeps you on the line too.

**What to notice:** the span of any set is a subspace. It always contains zero and never lets addition or scaling escape. A line that missed the origin could never appear as a span here, which is exactly why $y = 2x + 1$ is not a subspace.
:::

:::formulas
$$S \text{ is a subspace} \iff 0 \in S,\ u + v \in S,\ cv \in S \ \ (\forall u, v \in S,\ c \in \mathbb{R})$$
$$N(A) = \{x : Ax = 0\} \text{ is always a subspace}$$
:::

:::thm Every span is a subspace
For any vectors $v_1, \dots, v_k$ in a vector space, $\text{span}(v_1, \dots, v_k)$ is a subspace, and it is the smallest subspace containing them.
:::

:::proof
$0 = 0v_1 + \dots + 0v_k$ is in the span. Adding $\sum a_iv_i$ and $\sum b_iv_i$ gives $\sum (a_i + b_i)v_i$, again a combination. Scaling gives $\sum (ca_i)v_i$. So all three rules hold. Any subspace containing the $v_i$ must, by closure, contain all their combinations, so it contains the span.
:::

:::steps Is $S = \{(x, y, z) : x + y + z = 0\}$ a subspace of $\mathbb{R}^3$?
1. Zero: $0 + 0 + 0 = 0$, so $(0, 0, 0) \in S$.
2. Addition: if $x_1 + y_1 + z_1 = 0$ and $x_2 + y_2 + z_2 = 0$, the sum has $(x_1 + x_2) + (y_1 + y_2) + (z_1 + z_2) = 0 + 0 = 0$.
3. Scaling: $cx + cy + cz = c(x + y + z) = 0$.
4. Yes. It is a plane through the origin, with basis $(1, -1, 0)$ and $(1, 0, -1)$, so its dimension is 2.
:::

:::steps Is $T = \{(x, y) : xy = 0\}$ a subspace of $\mathbb{R}^2$?
1. It contains $(0, 0)$ and is closed under scaling: $(cx)(cy) = c^2xy = 0$.
2. But $(1, 0)$ and $(0, 1)$ are in $T$ while their sum $(1, 1)$ has $1\cdot1 = 1 \ne 0$.
3. Not a subspace: it is the union of the two axes, which fails closure under addition.
:::

:::mock Exam question
Let $P_2$ be the polynomials of degree at most 2. Show that $W = \{p \in P_2 : p(1) = 0\}$ is a subspace, and find its dimension.
:::solution
Zero polynomial: $0(1) = 0$. If $p(1) = q(1) = 0$ then $(p + q)(1) = 0$ and $(cp)(1) = c\cdot0 = 0$. So $W$ is a subspace. Writing $p = a + bx + cx^2$, the condition is $a + b + c = 0$, so $a = -b - c$ and $p = b(x - 1) + c(x^2 - 1)$. The polynomials $x - 1$ and $x^2 - 1$ are independent and span $W$, so $\dim W = 2$.
:::
:::

:::ml
- PCA, autoencoders and LoRA all assume data or updates live near a **low-dimensional subspace** of a huge space.
- Kernel methods treat functions as vectors in an infinite-dimensional space and still use dot products and projections.
- The null space of a weight matrix is the set of input directions a linear layer completely ignores.
:::

:::real
Mixing audio, blending photographs (a 30% / 70% cross-fade is $0.3a + 0.7b$) and combining recipes in fixed proportions all treat signals as vectors in a vector space.
:::

:::quiz
? Is the line $y = 3x + 2$ a subspace of $\mathbb{R}^2$?
- Yes
+ No
> It doesn't pass through the origin.

? What is the dimension of the space of polynomials of degree at most 3?
= 4
> A basis is $1, x, x^2, x^3$.

? What is the dimension of the plane $x + y + z = 0$ in $\mathbb{R}^3$?
= 2
> One linear condition removes one dimension from 3.

? Which set is a subspace of $\mathbb{R}^2$?
- all $(x, y)$ with $x \ge 0$
+ all $(x, y)$ with $x = 0$
- all $(x, y)$ with $x = 1$
> The $y$-axis contains 0 and is closed under addition and scaling.

? The solution set of $Ax = b$ with $b \ne 0$ is...
- always a subspace
+ never a subspace
- a subspace only if $A$ is square
> It doesn't contain $x = 0$, since $A0 = 0 \ne b$.

? What is the dimension of the space of all $2\times3$ matrices?
= 6
> There are 6 independent entries.
:::

## Lesson: The dot product {#dot-product}
@summary: Multiplying two vectors to get one number that measures how much they point the same way.

### Why we need a way to compare vectors
Adding and scaling tell us how to combine vectors, but not how to compare them. Are two vectors pointing in similar directions, opposite directions, or at right angles? How much of one vector lies along another? The **dot product** answers these questions with a single number. It is probably the most used operation in all of machine learning: every neuron, every linear model, every search engine similarity score and every attention head in a transformer is a dot product at heart.

### An everyday scenario
Imagine you're pulling a sled with a rope. If you pull straight forward, all your effort moves the sled. If the rope is tilted up at an angle, part of your pull is wasted lifting instead of moving forward. If you pull straight up, none of the pull moves the sled forward at all. The useful amount is your pulling force "measured along" the direction of travel. That measurement is exactly what the dot product computes. Physicists call the result **work**: work equals force dot displacement.

### The definition: multiply and add
The dot product of two vectors of the same length is found by multiplying matching components and adding:
$$u \cdot v = u_1v_1 + u_2v_2 + \dots + u_nv_n$$
For $u = (1, 2, 3)$ and $v = (4, -5, 6)$: $u \cdot v = 4 - 10 + 18 = 12$. The answer is a plain number (a scalar), not a vector. That's why it's also called the **scalar product** or **inner product**.

A useful special case: a vector dotted with itself gives its squared length, $v \cdot v = v_1^2 + \dots + v_n^2 = \|v\|^2$. For $v = (3, 4)$, $v \cdot v = 25 = 5^2$.

### The meaning: lengths and the angle
The same number has a geometric meaning. If $\theta$ is the angle between $u$ and $v$, then
$$u \cdot v = \|u\|\,\|v\|\cos\theta$$
So the dot product is "length times length times how aligned they are". The cosine does the comparing. When the vectors point the same way, $\theta = 0$ and $\cos\theta = 1$, so the dot product is as large as possible. At right angles, $\cos 90° = 0$, so the dot product is 0. Pointing opposite ways, $\cos 180° = -1$, and the dot product is as negative as possible.

This gives a quick sign test. If $u \cdot v > 0$ the angle is less than $90°$; if $u \cdot v = 0$ the vectors are **orthogonal** (perpendicular); if $u \cdot v < 0$ the angle is more than $90°$. For example $(1, 2) \cdot (2, -1) = 2 - 2 = 0$, so those two vectors are perpendicular, which you can confirm by sketching them.

:::def Dot product
$u \cdot v = u_1v_1 + \dots + u_nv_n = \|u\|\,\|v\|\cos\theta$. A single number measuring how much $u$ and $v$ point in the same direction.
:::

:::def Orthogonal vectors
Vectors whose dot product is 0. Nonzero orthogonal vectors are at right angles to each other.
:::

### Finding angles
Rearranging the geometric formula lets you compute the angle between any two vectors, even in 100 dimensions where you can't draw them:
$$\cos\theta = \frac{u \cdot v}{\|u\|\,\|v\|}$$
For $u = (1, 0)$ and $v = (1, 1)$: $u \cdot v = 1$, $\|u\| = 1$, $\|v\| = \sqrt2$, so $\cos\theta = 1/\sqrt2$ and $\theta = 45°$, as the picture says. The quantity $\frac{u \cdot v}{\|u\|\|v\|}$ is called the **cosine similarity**. It ignores lengths and only measures direction, ranging from $-1$ to $1$.

### Projection: the shadow of one vector on another
Back to the sled. The part of $v$ that lies along the direction of $u$ is called the projection of $v$ onto $u$. Its signed length is $\|v\|\cos\theta$, which by the formula above equals $\frac{u\cdot v}{\|u\|}$. As a vector it points along $u$:
$$\text{proj}_u v = \frac{u \cdot v}{u \cdot u}\,u$$
For $u = (2, 0)$ and $v = (3, 4)$: $u \cdot v = 6$ and $u \cdot u = 4$, so $\text{proj}_u v = 1.5(2, 0) = (3, 0)$. That is the shadow of $(3, 4)$ on the $x$-axis, just as expected. If $u$ is a unit vector the formula simplifies to $(u \cdot v)\,u$, which is why unit vectors are so convenient.

### Why the two formulas agree
Here is the argument using the law of cosines. Draw $u$ and $v$ from the same point; the third side of the triangle is $u - v$. The law of cosines says $\|u - v\|^2 = \|u\|^2 + \|v\|^2 - 2\|u\|\|v\|\cos\theta$. Now expand the left side with components: $\|u - v\|^2 = (u - v)\cdot(u - v) = u\cdot u - 2u\cdot v + v\cdot v$. Comparing the two expressions, the $\|u\|^2$ and $\|v\|^2$ terms cancel and we're left with $u \cdot v = \|u\|\|v\|\cos\theta$.

### Rules of the dot product
The dot product is **symmetric**, $u \cdot v = v \cdot u$, and it **distributes**, $u \cdot (v + w) = u\cdot v + u \cdot w$. Scalars pull out: $(cu)\cdot v = c(u \cdot v)$. These make it easy to expand expressions like $(u + v)\cdot(u + v) = \|u\|^2 + 2u\cdot v + \|v\|^2$.

:::warn Common mistakes
- Thinking the dot product gives a vector. It gives a single number.
- Multiplying components without adding them up. $(1, 2)\cdot(3, 4)$ is $3 + 8 = 11$, not $(3, 8)$.
- Dotting vectors of different lengths, which is undefined.
- Concluding that a large dot product means "very similar". It can be large just because the vectors are long. Use cosine similarity to compare directions only.
:::

### Summary
The dot product multiplies matching components and adds them. Geometrically it equals the product of the lengths times the cosine of the angle, so its sign tells you whether vectors point together, apart, or at right angles, and zero means orthogonal. Dividing by the lengths gives the cosine similarity, and the dot product with a direction gives a projection. This one operation is the workhorse of machine learning.

@viz dot | Drag u and v. The green bar is the projection of v onto u; it turns red when the dot product is negative.

:::explore
**What to try**
1. Make $u = (3, 0)$ and $v = (2, 2)$. Read the dot product (6) and the angle ($45°$).
2. Rotate $v$ until the dot product reads 0. Check the angle: $90°$. The green bar disappears.
3. Keep rotating past $90°$. The dot product goes negative and the projection bar turns red and points backwards.
4. Double the length of $u$ while keeping its direction. The dot product doubles, but the angle and the projection length stay the same.

**What to notice:** the dot product's sign follows $\cos\theta$, and the green bar is $\|v\|\cos\theta$, the "shadow" from the article. Step 4 shows why cosine similarity divides by lengths: the raw dot product mixes up size and direction.
:::

:::formulas
$$u \cdot v = \sum_i u_iv_i = \|u\|\,\|v\|\cos\theta$$
$$v \cdot v = \|v\|^2$$
$$\cos\theta = \frac{u \cdot v}{\|u\|\,\|v\|}$$
$$\text{proj}_u v = \frac{u\cdot v}{u\cdot u}\,u$$
:::

:::thm Cauchy–Schwarz inequality
For any vectors $u, v$: $|u\cdot v| \le \|u\|\,\|v\|$, with equality exactly when one is a multiple of the other.
:::

:::proof
If $v = 0$ both sides are 0. Otherwise, for every real $t$, $0 \le \|u - tv\|^2 = \|u\|^2 - 2t(u\cdot v) + t^2\|v\|^2$. Choose $t = \frac{u\cdot v}{\|v\|^2}$. Then $0 \le \|u\|^2 - \frac{(u\cdot v)^2}{\|v\|^2}$, so $(u\cdot v)^2 \le \|u\|^2\|v\|^2$. Equality needs $\|u - tv\| = 0$, that is, $u = tv$. This is why $\cos\theta$ always lies between $-1$ and $1$.
:::

:::steps Angle between $u = (1, 2, 2)$ and $v = (2, 0, 1)$
1. $u \cdot v = 2 + 0 + 2 = 4$.
2. $\|u\| = \sqrt{1 + 4 + 4} = 3$ and $\|v\| = \sqrt{4 + 0 + 1} = \sqrt5$.
3. $\cos\theta = \frac{4}{3\sqrt5} \approx 0.596$, so $\theta \approx 53.4°$.
:::

:::steps Find $k$ so that $(2, k, 1)$ is orthogonal to $(3, -1, 4)$
1. Set the dot product to zero: $6 - k + 4 = 0$.
2. So $k = 10$.
3. Check: $(2, 10, 1)\cdot(3, -1, 4) = 6 - 10 + 4 = 0$.
:::

:::steps Work done by a force $F = (10, 5)$ N moving a box by $d = (4, 0)$ m
1. Work is $F \cdot d = 10\cdot4 + 5\cdot0 = 40$ joules.
2. Only the horizontal part of the force (10 N) did work, because the motion was horizontal.
:::

:::mock Exam question
Vectors $u$ and $v$ satisfy $\|u\| = 3$, $\|v\| = 4$ and $\|u + v\| = 5$. Find $u \cdot v$ and the angle between them.
:::solution
$\|u + v\|^2 = \|u\|^2 + 2u\cdot v + \|v\|^2$, so $25 = 9 + 2u\cdot v + 16$, giving $u \cdot v = 0$. The vectors are orthogonal: $\theta = 90°$. (This is Pythagoras, $3^2 + 4^2 = 5^2$.)
:::
:::

:::ml The dot product is everywhere
- A **linear model** predicts $\hat y = w\cdot x + b$: a weighted sum of features.
- A **neuron** computes $\sigma(w \cdot x + b)$.
- **Attention** in transformers scores how well a query matches a key with $q\cdot k / \sqrt{d}$.
- **Cosine similarity** between embeddings powers semantic search, recommendation and retrieval for chatbots.
:::

:::real
A shopping total is a dot product: quantities $(2, 1, 3)$ of items priced 4, 10 and 1 dollars cost $(2, 1, 3)\cdot(4, 10, 1) = 8 + 10 + 3 = 21$ dollars. Solar panels produce power in proportion to the dot product of the sunlight direction and the panel's facing direction, which is why panels are tilted toward the sun.
:::

:::cs
`np.dot(u, v)` or `u @ v` computes a dot product. Graphics shaders compute `dot(normal, lightDir)` for every pixel to decide how brightly a surface is lit.
:::

:::quiz
? Compute $(2, -1, 3)\cdot(1, 4, 2)$.
= 4
> $2 - 4 + 6 = 4$.

? If $u \cdot v = 0$ and both are nonzero, the angle between them is...
- $0°$
+ $90°$
- $180°$
> $\cos\theta = 0$ means a right angle.

? What is $v \cdot v$ for $v = (1, 2, 2)$?
= 9
> $v\cdot v = \|v\|^2 = 9$.

? For which $k$ is $(1, k)$ orthogonal to $(4, 2)$?
= -2
> $4 + 2k = 0$.

? The dot product of two vectors is negative. The angle between them is...
- less than $90°$
- exactly $90°$
+ more than $90°$
> The sign of the dot product is the sign of $\cos\theta$.

? What is the first component of $\text{proj}_u v$ for $u = (1, 0)$ and $v = (3, 7)$?
= 3
> $\frac{u\cdot v}{u\cdot u}u = 3(1, 0) = (3, 0)$.
:::

## Lesson: The cross product {#cross-product}
@summary: A 3-D product that returns a vector perpendicular to both inputs, with length equal to the area they span.

### Why another product?
The dot product takes two vectors and returns a number that measures alignment. In three dimensions there is a second, very different product: the **cross product** $u \times v$. It takes two 3-D vectors and returns a **vector** that sticks straight out, perpendicular to both of them. Its length tells you the area of the parallelogram the two vectors make. Physics, robotics and 3-D graphics use it constantly: to find the direction a surface faces, to compute torque, and to tell whether a turn is clockwise or counterclockwise. In ML it appears less often, but it's essential for anything involving 3-D geometry, such as point clouds, pose estimation and rendering, and the related idea of "signed area" leads directly to determinants.

### An everyday scenario
Imagine tightening a bolt with a wrench. You push on the handle sideways, but the bolt moves along its own axis, in a direction perpendicular to both the handle and your push. Push harder, or use a longer wrench, and the turning effect grows. Push along the handle instead of across it, and nothing turns at all. That turning effect is called **torque**, and it is the cross product of the handle vector and the force vector. The direction of the answer is perpendicular to both inputs, and the size depends on how "across" the push is.

### The formula
For $u = (u_1, u_2, u_3)$ and $v = (v_1, v_2, v_3)$:
$$u \times v = \begin{bmatrix} u_2v_3 - u_3v_2 \\ u_3v_1 - u_1v_3 \\ u_1v_2 - u_2v_1 \end{bmatrix}$$
It looks arbitrary, but there's a pattern. Each component skips its own index and uses the other two in a cyclic order. The first component uses indices 2 and 3, the second uses 3 and 1, and the third uses 1 and 2. In each, it's "this times that, minus that times this".

Let's compute $(1, 0, 0) \times (0, 1, 0)$, the $x$-axis crossed with the $y$-axis. First component: $0\cdot0 - 0\cdot1 = 0$. Second: $0\cdot0 - 1\cdot0 = 0$. Third: $1\cdot1 - 0\cdot0 = 1$. The answer is $(0, 0, 1)$, the $z$-axis. So $\hat\imath \times \hat\jmath = \hat k$, perpendicular to both, as promised.

A messier example: $(1, 2, 3) \times (4, 5, 6)$. First: $2\cdot6 - 3\cdot5 = 12 - 15 = -3$. Second: $3\cdot4 - 1\cdot6 = 12 - 6 = 6$. Third: $1\cdot5 - 2\cdot4 = 5 - 8 = -3$. So the cross product is $(-3, 6, -3)$. Check perpendicularity with dot products: $(-3, 6, -3)\cdot(1, 2, 3) = -3 + 12 - 9 = 0$ and $(-3, 6, -3)\cdot(4, 5, 6) = -12 + 30 - 18 = 0$. Both zero.

:::def Cross product
For 3-D vectors, $u \times v = (u_2v_3 - u_3v_2,\ u_3v_1 - u_1v_3,\ u_1v_2 - u_2v_1)$. It is perpendicular to both $u$ and $v$, and its length is the area of the parallelogram they span.
:::

### Which way does it point? The right-hand rule
There are two directions perpendicular to a plane: "up" out of it and "down" into it. The cross product picks one using the **right-hand rule**. Point the fingers of your right hand along $u$, curl them toward $v$, and your thumb points along $u \times v$. With $u$ along $x$ and $v$ along $y$, your thumb points up the $z$-axis, matching the calculation above.

This means order matters. If you swap the inputs, your fingers curl the other way and the thumb flips: $v \times u = -(u \times v)$. The cross product is **anti-commutative**. For instance $\hat\jmath \times \hat\imath = -\hat k$.

### How long is it? Area
The length of the cross product is
$$\|u \times v\| = \|u\|\,\|v\|\sin\theta$$
where $\theta$ is the angle between the vectors. Compare this with the dot product, which uses $\cos\theta$. Geometrically, $\|u\|\,\|v\|\sin\theta$ is the area of the parallelogram with sides $u$ and $v$: the base is $\|u\|$ and the height is $\|v\|\sin\theta$. Half of it is the area of the triangle with those two sides.

Two consequences follow. If $u$ and $v$ are parallel, $\sin\theta = 0$, so the cross product is the zero vector: no parallelogram, no area, no well-defined perpendicular direction. And if $u$ and $v$ are perpendicular unit vectors, the cross product is another unit vector, which is how 3-D software builds a third axis from two.

### Rules of the cross product
It distributes over addition: $u \times (v + w) = u \times v + u \times w$. Scalars pull out: $(cu)\times v = c(u \times v)$. Any vector crossed with itself gives zero. But it is **not** associative: $(u \times v)\times w$ is usually different from $u \times (v \times w)$. For example $(\hat\imath \times \hat\imath)\times \hat\jmath = 0$, while $\hat\imath \times (\hat\imath \times \hat\jmath) = \hat\imath \times \hat k = -\hat\jmath$.

### Volume: the scalar triple product
Combine both products: $u \cdot (v \times w)$ is a single number whose absolute value is the volume of the slanted box (parallelepiped) with edges $u$, $v$ and $w$. The base area is $\|v \times w\|$, and dotting with $u$ picks up the height. If the three vectors lie in one plane, the volume is 0, so the triple product is a quick test for whether three 3-D vectors are dependent. This number is exactly the determinant of the $3\times3$ matrix with rows $u$, $v$, $w$, which you will meet later.

### Why it works
Why is $u \times v$ perpendicular to $u$? Expand the dot product: $u_1(u_2v_3 - u_3v_2) + u_2(u_3v_1 - u_1v_3) + u_3(u_1v_2 - u_2v_1)$. Multiply out and every term appears twice with opposite signs, for example $u_1u_2v_3$ and $-u_2u_1v_3$, so everything cancels to 0. The same happens for $v$. The length formula comes from the identity $\|u\times v\|^2 = \|u\|^2\|v\|^2 - (u\cdot v)^2$, and since $u\cdot v = \|u\|\|v\|\cos\theta$, this equals $\|u\|^2\|v\|^2(1 - \cos^2\theta) = \|u\|^2\|v\|^2\sin^2\theta$.

:::warn Common mistakes
- Using the cross product in 2-D or 5-D. The vector version only exists in 3-D. (In 2-D people often use the single number $u_1v_2 - u_2v_1$, the "2-D cross product", which is the signed area.)
- Getting the middle component's sign wrong. It's $u_3v_1 - u_1v_3$, not $u_1v_3 - u_3v_1$.
- Forgetting that order matters: $u \times v = -(v \times u)$.
- Expecting a number. The cross product is a vector; the dot product is the one that returns a number.
:::

### Summary
The cross product of two 3-D vectors is a vector perpendicular to both, pointing by the right-hand rule, with length $\|u\|\|v\|\sin\theta$, the area of their parallelogram. It is zero for parallel vectors and flips sign when the order is swapped. Dotting it with a third vector gives the volume of a box, which is the determinant. Always check your answer by dotting it with both inputs: you should get zero twice.

@viz g03-cross | Change u and v with the sliders and turn the camera. The purple arrow is u × v; the yellow parallelogram's area is its length.

:::explore
**What to try**
1. Start with $u = (2, 0, 0)$ and $v = (1, 2, 0)$. Both lie flat on the floor, so $u \times v$ points straight up. Read its length: 4, the area of the parallelogram (base 2, height 2).
2. Swap roles by making $u = (1, 2, 0)$ and $v = (2, 0, 0)$. The purple arrow flips downwards: anti-commutativity.
3. Make $v$ parallel to $u$, for example $v = (3, 0, 0)$. The parallelogram flattens and $u \times v$ becomes zero.
4. Give both vectors a $z$-component and turn the camera. The purple arrow stays at right angles to the yellow parallelogram, and the panel's two dot-product checks stay at 0.

**What to notice:** the direction of $u \times v$ is perpendicular to the plane of $u$ and $v$, and its length is the area, exactly the two facts in the article. Area depends on how "across" the vectors are, the $\sin\theta$ factor.
:::

:::formulas
$$u \times v = (u_2v_3 - u_3v_2,\ u_3v_1 - u_1v_3,\ u_1v_2 - u_2v_1)$$
$$\|u \times v\| = \|u\|\,\|v\|\sin\theta = \text{area of parallelogram}$$
$$v \times u = -(u \times v), \qquad u \times u = 0$$
$$\text{volume} = |u \cdot (v \times w)|$$
:::

:::thm Perpendicularity and Lagrange's identity
$(u \times v)\cdot u = (u\times v)\cdot v = 0$, and $\|u \times v\|^2 = \|u\|^2\|v\|^2 - (u\cdot v)^2$.
:::

:::proof
Perpendicularity: expanding $(u\times v)\cdot u$ gives six terms that cancel in pairs, as shown in the article; similarly for $v$. For the identity, expand both sides in components. The left side is $(u_2v_3 - u_3v_2)^2 + (u_3v_1 - u_1v_3)^2 + (u_1v_2 - u_2v_1)^2$ and the right side is $(u_1^2 + u_2^2 + u_3^2)(v_1^2 + v_2^2 + v_3^2) - (u_1v_1 + u_2v_2 + u_3v_3)^2$. Both simplify to $\sum_{i<j}(u_iv_j - u_jv_i)^2$. Substituting $u\cdot v = \|u\|\|v\|\cos\theta$ then gives $\|u\times v\| = \|u\|\|v\|\sin\theta$.
:::

:::steps Compute $(2, 1, -1) \times (1, 3, 2)$
1. First: $u_2v_3 - u_3v_2 = 1\cdot2 - (-1)\cdot3 = 2 + 3 = 5$.
2. Second: $u_3v_1 - u_1v_3 = (-1)\cdot1 - 2\cdot2 = -1 - 4 = -5$.
3. Third: $u_1v_2 - u_2v_1 = 2\cdot3 - 1\cdot1 = 5$.
4. Result $(5, -5, 5)$. Check: $(5, -5, 5)\cdot(2, 1, -1) = 10 - 5 - 5 = 0$ and $(5, -5, 5)\cdot(1, 3, 2) = 5 - 15 + 10 = 0$.
:::

:::steps Area of the triangle with corners $A = (0, 0, 0)$, $B = (3, 0, 0)$, $C = (0, 4, 0)$
1. Edge vectors: $B - A = (3, 0, 0)$ and $C - A = (0, 4, 0)$.
2. Cross product: $(0\cdot0 - 0\cdot4,\ 0\cdot0 - 3\cdot0,\ 3\cdot4 - 0\cdot0) = (0, 0, 12)$.
3. Parallelogram area 12, so the triangle's area is $6$. (Check: a right triangle with legs 3 and 4 has area $\tfrac12\cdot3\cdot4 = 6$.)
:::

:::mock Exam question
Find a unit vector perpendicular to the plane containing $P = (1, 0, 0)$, $Q = (0, 1, 0)$ and $R = (0, 0, 1)$, and the area of triangle $PQR$.
:::solution
Edges: $Q - P = (-1, 1, 0)$ and $R - P = (-1, 0, 1)$. Cross product: $(1\cdot1 - 0\cdot0,\ 0\cdot(-1) - (-1)\cdot1,\ (-1)\cdot0 - 1\cdot(-1)) = (1, 1, 1)$. Its length is $\sqrt3$, so a unit normal is $\tfrac{1}{\sqrt3}(1, 1, 1)$. The triangle's area is half the parallelogram's: $\tfrac{\sqrt3}{2} \approx 0.866$.
:::
:::

:::cs
3-D graphics compute a **surface normal** for every triangle in a mesh as $(B - A)\times(C - A)$, normalized. The normal decides lighting and whether a face points toward the camera (back-face culling). Computational geometry uses the 2-D cross product $u_1v_2 - u_2v_1$ to test whether three points make a left turn or a right turn, the key step in convex-hull algorithms.
:::

:::ml
3-D vision models (point-cloud networks, pose estimation, neural rendering) compute normals and rotations with cross products. Rotation matrices can be built from an axis and a cross-product matrix (Rodrigues' formula).
:::

:::real
Torque is $\tau = r \times F$: a 0.3 m wrench with a 50 N push at right angles gives $0.3\cdot50 = 15$ N·m of torque along the bolt. The magnetic force on a moving charge, $F = q\,v \times B$, is why electric motors spin.
:::

:::quiz
? What is $\hat\jmath \times \hat\imath$?
- $\hat k$
+ $-\hat k$
- $0$
> Anti-commutativity: $\hat\jmath\times\hat\imath = -(\hat\imath\times\hat\jmath) = -\hat k$.

? What is the third component of $(1, 2, 3)\times(4, 5, 6)$?
= -3
> $u_1v_2 - u_2v_1 = 5 - 8 = -3$.

? If $u$ and $v$ are parallel, $u \times v$ is...
+ the zero vector
- a unit vector
- parallel to $u$
> $\sin\theta = 0$, so there is no area.

? What is the area of the parallelogram spanned by $(2, 0, 0)$ and $(0, 3, 0)$?
= 6
> The cross product is $(0, 0, 6)$, of length 6.

? $(u \times v)\cdot u$ equals...
+ $0$
- $\|u\|^2$
- $u \cdot v$
> The cross product is perpendicular to both inputs.

? What is the volume of the box with edges $(1, 0, 0)$, $(0, 2, 0)$, $(0, 0, 3)$?
= 6
> $(0, 2, 0)\times(0, 0, 3) = (6, 0, 0)$, and dotting with $(1, 0, 0)$ gives 6.
:::

## Lesson: Norms and distances {#norms}
@summary: L1, L2, L∞ and Lp norms: different ways to measure size, and why regularization cares.

### Why more than one way to measure length?
In the first lesson the length of a vector came from Pythagoras: square, add, square-root. That's the right answer if you can fly in a straight line. But it isn't the only reasonable answer. A taxi in a city has to drive along streets. A chess king moves one square in any direction per turn. A warehouse robot might be limited by its slowest motor. Each situation measures "how far" differently. Mathematicians capture all of these with the idea of a **norm**, a function that measures the size of a vector and obeys a few common-sense rules. In machine learning, the choice of norm changes the behaviour of models: it decides whether a regularizer makes weights small or makes them exactly zero, and how robust a distance-based method is to outliers.

### An everyday scenario
Imagine you're in Manhattan at the corner of 1st Avenue and 1st Street, and you want to get to 4th Avenue and 5th Street. The blocks form a grid. A bird flies straight there: 3 blocks across and 4 blocks up gives a straight-line distance of $\sqrt{3^2 + 4^2} = 5$ blocks. A taxi can't cut through buildings. It must drive 3 blocks across and 4 blocks up, $3 + 4 = 7$ blocks, whatever route it takes along the grid. And if you only cared about the longest single leg of the trip, say because you're timing how long you wait at one long stretch, it would be $\max(3, 4) = 4$. Three different, sensible notions of distance for the same trip. These are the $L_2$, $L_1$ and $L_\infty$ norms of the vector $(3, 4)$.

### The three main norms
For a vector $x = (x_1, \dots, x_n)$:

The **$L_2$ norm** (Euclidean norm) is the straight-line length:
$$\|x\|_2 = \sqrt{x_1^2 + x_2^2 + \dots + x_n^2}$$
This is the default; when people write $\|x\|$ without a subscript, they usually mean $L_2$.

The **$L_1$ norm** (taxicab or Manhattan norm) adds the absolute values:
$$\|x\|_1 = |x_1| + |x_2| + \dots + |x_n|$$

The **$L_\infty$ norm** (max norm or Chebyshev norm) takes the largest absolute value:
$$\|x\|_\infty = \max_i |x_i|$$

For $x = (3, -4)$: $\|x\|_2 = 5$, $\|x\|_1 = 3 + 4 = 7$, $\|x\|_\infty = 4$. Notice that $\|x\|_\infty \le \|x\|_2 \le \|x\|_1$. This ordering holds for every vector.

### The whole family: $L_p$ norms
All three are members of one family. For any $p \ge 1$:
$$\|x\|_p = \left(|x_1|^p + \dots + |x_n|^p\right)^{1/p}$$
With $p = 1$ you get the taxicab norm and with $p = 2$ the Euclidean norm. As $p$ grows, the largest component dominates the sum more and more, and in the limit you get the max norm, which is why it's called $L_\infty$. For $x = (3, 4)$: $\|x\|_3 = (27 + 64)^{1/3} = 91^{1/3} \approx 4.50$, between $\|x\|_2 = 5$ and $\|x\|_\infty = 4$.

### What makes something a norm
A **norm** is any function $\|\cdot\|$ that satisfies three rules. **Positivity**: $\|x\| \ge 0$, and $\|x\| = 0$ only when $x = 0$. **Scaling**: $\|cx\| = |c|\,\|x\|$; doubling a vector doubles its size. **Triangle inequality**: $\|x + y\| \le \|x\| + \|y\|$; a detour is never shorter than going straight. All $L_p$ norms with $p \ge 1$ pass these tests. With $p < 1$ the triangle inequality fails, so those are not true norms, even though people sometimes use them.

:::def Norm
A function $\|\cdot\|$ with $\|x\| \ge 0$ (zero only for $x = 0$), $\|cx\| = |c|\,\|x\|$, and the triangle inequality $\|x + y\| \le \|x\| + \|y\|$.
:::

:::def Lp norm
$\|x\|_p = \left(\sum_i |x_i|^p\right)^{1/p}$ for $p \ge 1$. Special cases: $L_1$ (sum of absolute values), $L_2$ (Euclidean length), $L_\infty$ (largest absolute value).
:::

### Distances from norms
Every norm gives a distance: the distance between $x$ and $y$ is $\|x - y\|$. So there's a Euclidean distance, a Manhattan distance and a Chebyshev distance. For the points $(1, 1)$ and $(4, 5)$, the difference is $(3, 4)$, so the distances are 5, 7 and 4 respectively. Which one you choose changes which points count as "nearest neighbours".

### Picturing norms: unit balls
A great way to see the difference is to draw every vector whose norm equals 1, the **unit ball** (its boundary, really). For $L_2$ it's the familiar circle $x^2 + y^2 = 1$. For $L_1$ it's $|x| + |y| = 1$, a diamond with corners at $(\pm1, 0)$ and $(0, \pm1)$. For $L_\infty$ it's $\max(|x|, |y|) = 1$, a square with corners at $(\pm1, \pm1)$. As $p$ goes from 1 to $\infty$, the shape inflates smoothly from the diamond through the circle to the square. The sharp corners of the $L_1$ diamond sit exactly on the axes, where one coordinate is zero, and that fact is the secret behind sparse models.

### Why it works: why L1 gives sparse solutions
In machine learning we often minimize "error + $\lambda\cdot$ size of the weights". Picture the error's contour lines as ellipses and the size penalty as a norm ball that the solution must stay inside. The best solution is where the smallest error ellipse first touches the ball. A circle is smooth, so it is usually touched at a point where both coordinates are nonzero. A diamond has corners poking out along the axes, so an ellipse usually touches a corner first, and at a corner some weights are exactly zero. That's why $L_1$ regularization (lasso) performs automatic feature selection, while $L_2$ (ridge) only shrinks.

:::warn Common mistakes
- Forgetting the absolute values in $L_1$: $\|(3, -4)\|_1 = 7$, not $-1$.
- Forgetting the square root in $L_2$. $\|x\|_2^2$ (squared norm) is common in ML formulas because it's easier to differentiate, but it is not itself a norm.
- Thinking $L_\infty$ adds things up. It just takes the single largest absolute entry.
- Comparing distances computed with different norms. A 5 in $L_2$ and a 5 in $L_1$ mean different things.
:::

### Summary
A norm measures the size of a vector. $L_2$ is straight-line length, $L_1$ is taxicab length, $L_\infty$ is the largest component, and the $L_p$ family connects them. Every norm gives a distance $\|x - y\|$. Their unit balls are a diamond, a circle and a square, and the diamond's corners on the axes explain why $L_1$ regularization produces sparse weights.

@viz norms | Drag the pink vector and change p. The dashed shapes are the L1 diamond, L2 circle and L∞ square.

:::explore
**What to try**
1. Drag the pink vector to $(0.6, 0.8)$. Its $L_2$ norm is 1, so it sits on the circle. Read its $L_1$ norm (1.4) and $L_\infty$ norm (0.8).
2. Move it onto an axis, like $(1, 0)$. All three norms agree. The shapes all touch at the axes.
3. Move it to a diagonal like $(0.7, 0.7)$, where the norms disagree most.
4. Slide $p$ from 1 up to 8 and watch the shape grow from the diamond toward the square.

**What to notice:** norms agree on the axes and disagree most on diagonals, because they differ in how they combine several nonzero components. The diamond's pointed corners are on the axes, the picture behind sparse $L_1$ solutions in the article.
:::

:::formulas
$$\|x\|_1 = \sum_i |x_i| \qquad \|x\|_2 = \sqrt{\textstyle\sum_i x_i^2} \qquad \|x\|_\infty = \max_i |x_i|$$
$$\|x\|_p = \left(\textstyle\sum_i |x_i|^p\right)^{1/p}$$
$$\|x\|_\infty \le \|x\|_2 \le \|x\|_1 \le n\,\|x\|_\infty$$
:::

:::thm Norm inequalities
For any $x \in \mathbb{R}^n$: $\|x\|_\infty \le \|x\|_2 \le \|x\|_1 \le \sqrt n\,\|x\|_2$.
:::

:::proof
The largest $|x_i|^2$ is at most the sum of all $x_i^2$, giving $\|x\|_\infty \le \|x\|_2$. Squaring $\|x\|_1$ gives $\sum x_i^2 + \sum_{i\ne j}|x_i||x_j| \ge \sum x_i^2$, so $\|x\|_2 \le \|x\|_1$. Finally $\|x\|_1 = (|x_1|, \dots, |x_n|)\cdot(1, \dots, 1) \le \|x\|_2\,\sqrt n$ by Cauchy–Schwarz.
:::

:::steps Compute the $L_1$, $L_2$ and $L_\infty$ norms of $x = (1, -2, 2)$
1. $L_1$: $1 + 2 + 2 = 5$.
2. $L_2$: $\sqrt{1 + 4 + 4} = 3$.
3. $L_\infty$: the largest absolute value is $2$.
4. Check the ordering: $2 \le 3 \le 5$.
:::

:::steps Which point is closer to the origin, $a = (3, 3)$ or $b = (4, 0)$?
1. In $L_2$: $\|a\|_2 = \sqrt{18} \approx 4.24$ and $\|b\|_2 = 4$, so $b$ is closer.
2. In $L_1$: $\|a\|_1 = 6$ and $\|b\|_1 = 4$, so $b$ is closer.
3. In $L_\infty$: $\|a\|_\infty = 3$ and $\|b\|_\infty = 4$, so $a$ is closer.
4. The answer depends on the norm.
:::

:::mock Exam question
Find the $L_1$ distance and the $L_2$ distance between $p = (2, -1, 3)$ and $q = (5, 3, 3)$, and verify the triangle inequality for $u = (1, 2)$, $v = (2, -2)$ in $L_2$.
:::solution
$q - p = (3, 4, 0)$. $L_1$ distance $= 3 + 4 + 0 = 7$; $L_2$ distance $= \sqrt{9 + 16} = 5$. For the triangle inequality: $u + v = (3, 0)$ has length 3, while $\|u\| + \|v\| = \sqrt5 + \sqrt8 \approx 2.236 + 2.828 = 5.06$. Indeed $3 \le 5.06$.
:::
:::

:::ml L1 vs L2 regularization
Adding $\lambda\|w\|_2^2$ to a loss (**ridge** regression, **weight decay** in deep learning) shrinks all weights smoothly toward zero. Adding $\lambda\|w\|_1$ (**lasso**) pushes many weights to exactly zero, giving sparse, interpretable models. Elastic net uses both. k-nearest-neighbours and k-means can use any distance; $L_1$ is more robust to a single huge coordinate. Gradient clipping limits $\|g\|_2$, and adversarial robustness research often bounds perturbations in $L_\infty$ ("no pixel changes by more than $\epsilon$").
:::

:::real
Taxi and delivery apps in grid cities estimate travel with Manhattan distance. In chess, the number of moves a king needs between squares is the $L_\infty$ distance. Quality control often uses the max norm: a part passes only if **every** measurement is within tolerance.
:::

:::quiz
? Compute $\|(3, -4)\|_1$.
= 7
> $|3| + |-4| = 7$.

? Compute $\|(3, -4)\|_\infty$.
= 4
> The largest absolute value.

? Which regularizer tends to produce sparse weights (many exactly zero)?
+ L1
- L2
> The corners of the L1 diamond lie on the axes.

? The unit ball of the $L_\infty$ norm in 2-D is a...
- circle
- diamond
+ square
> $\max(|x|, |y|) = 1$ is a square with corners $(\pm1, \pm1)$.

? Compute $\|(1, -2, 2)\|_2$.
= 3
> $\sqrt{1 + 4 + 4}$.

? What is the Manhattan ($L_1$) distance between $(1, 1)$ and $(4, 5)$?
= 7
> $|4 - 1| + |5 - 1| = 3 + 4$.
:::

# Unit: Matrices

## Lesson: Matrices and matrix-vector multiplication {#matrices}
@summary: Grids of numbers, how they multiply a vector, and the row and column views of that product.

### Why matrices?
Once you have many vectors, or many equations, writing them one by one gets messy. A **matrix** is a rectangular grid of numbers that packs a lot of information into one object. A spreadsheet of data is a matrix: each row is an example, each column is a feature. A system of equations is a matrix of coefficients. And, most importantly, a matrix is a machine that takes in a vector and produces a new vector. Every layer of a neural network is such a machine. This lesson teaches you how to read a matrix and how to multiply it by a vector, which is the single most important computation in this course.

### An everyday scenario
Imagine you run a small bakery that sells cakes and pies. Each cake needs 2 eggs and 1 cup of sugar; each pie needs 1 egg and 3 cups of sugar. Tomorrow you plan to bake 5 cakes and 6 pies. How many eggs and how much sugar do you need? Eggs: $2\cdot5 + 1\cdot6 = 16$. Sugar: $1\cdot5 + 3\cdot6 = 23$. You just did a matrix-vector multiplication. The recipe table is the matrix, the order $(5, 6)$ is the input vector, and the shopping list $(16, 23)$ is the output vector:
$$\begin{bmatrix} 2 & 1 \\ 1 & 3 \end{bmatrix}\begin{bmatrix} 5 \\ 6 \end{bmatrix} = \begin{bmatrix} 16 \\ 23 \end{bmatrix}$$

### Reading a matrix
An $m \times n$ matrix ("m by n") has $m$ rows and $n$ columns. Rows run across, columns run down. The entry in row $i$ and column $j$ is written $A_{ij}$, always row first. For
$$A = \begin{bmatrix} 1 & 2 & 0 \\ 3 & -1 & 4 \end{bmatrix}$$
the shape is $2 \times 3$, $A_{12} = 2$ and $A_{23} = 4$. A matrix with the same number of rows and columns is **square**. A vector is a matrix with one column, so an $n$-vector is $n \times 1$.

:::def Matrix
A rectangular grid of numbers with $m$ rows and $n$ columns (an $m\times n$ matrix). The entry in row $i$, column $j$ is $A_{ij}$.
:::

### Multiplying a matrix by a vector: the row view
To compute $Ax$, take each row of $A$ and dot it with $x$. Each dot product gives one entry of the answer:
$$\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\begin{bmatrix} 5 \\ 6 \end{bmatrix} = \begin{bmatrix} 1\cdot5 + 2\cdot6 \\ 3\cdot5 + 4\cdot6 \end{bmatrix} = \begin{bmatrix} 17 \\ 39 \end{bmatrix}$$
Row 1 is $(1, 2)$, and $(1, 2)\cdot(5, 6) = 17$. Row 2 is $(3, 4)$, and $(3, 4)\cdot(5, 6) = 39$. This is the bakery calculation: each row is one ingredient, and its dot product with the order gives the total of that ingredient.

For the dot products to make sense, each row must have as many entries as $x$. So an $m \times n$ matrix can only multiply an $n$-vector, and the answer has one entry per row: an $m$-vector. In shapes: $(m \times n)(n \times 1) = (m \times 1)$. The inner numbers must match and the outer numbers give the result.

### The column view: a combination of columns
There is a second, deeper way to see the same product. Look at what the arithmetic does to the columns:
$$\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\begin{bmatrix} 5 \\ 6 \end{bmatrix} = 5\begin{bmatrix} 1 \\ 3 \end{bmatrix} + 6\begin{bmatrix} 2 \\ 4 \end{bmatrix} = \begin{bmatrix} 5 \\ 15 \end{bmatrix} + \begin{bmatrix} 12 \\ 24 \end{bmatrix} = \begin{bmatrix} 17 \\ 39 \end{bmatrix}$$
Same answer. $Ax$ is a **linear combination of the columns of $A$**, and the entries of $x$ are the weights. In the bakery, column 1 is "what one cake needs" and column 2 is "what one pie needs". The order says "5 of the first column plus 6 of the second".

This view connects matrices to everything from the vectors unit. The set of all possible outputs $Ax$ is the span of the columns. Asking "can I solve $Ax = b$?" is the same as asking "is $b$ a combination of the columns?", the span question from before.

:::key
Two views of one product. **Row view:** entry $i$ of $Ax$ is (row $i$ of $A$) $\cdot\ x$. **Column view:** $Ax = x_1(\text{col}_1) + \dots + x_n(\text{col}_n)$. The column view explains what outputs are possible; the row view is how you compute quickly by hand.
:::

### Linearity
Matrix-vector multiplication respects addition and scaling: $A(x + y) = Ax + Ay$ and $A(cx) = c(Ax)$. In the bakery, if you double the order, you double the shopping list; if you combine two orders, you combine the lists. This property is called **linearity**, and it is what puts the "linear" in linear algebra. It also means $A0 = 0$: ordering nothing needs no ingredients.

### Systems of equations as $Ax = b$
Matrices let us write a whole system of equations at once. The system
$$2x + y = 5, \qquad x - y = 1$$
is exactly
$$\begin{bmatrix} 2 & 1 \\ 1 & -1 \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 5 \\ 1 \end{bmatrix}$$
because the row view of the left side reproduces the left sides of the equations. The solution is $x = 2$, $y = 1$; check with the column view: $2(2, 1) + 1(1, -1) = (5, 1)$. Later lessons show how to solve such systems systematically.

### The identity matrix
The **identity matrix** $I$ has 1s on the main diagonal (top-left to bottom-right) and 0s elsewhere. It does nothing: $Ix = x$ for every $x$. In the column view, its columns are $\hat\imath$ and $\hat\jmath$, and $x_1\hat\imath + x_2\hat\jmath = x$.

:::def Identity matrix
The square matrix $I$ with 1 on the diagonal and 0 elsewhere. $Ix = x$ for every vector $x$.
:::

:::warn Common mistakes
- Mixing up rows and columns in $A_{ij}$. The first index is always the row.
- Multiplying when the shapes don't match. A $2\times3$ matrix needs a 3-vector.
- Dotting columns of $A$ with $x$ instead of rows.
- Writing the answer with the wrong length. An $m\times n$ matrix outputs a vector with $m$ entries, one per row, not $n$.
:::

### Summary
A matrix is a grid with $m$ rows and $n$ columns. It multiplies an $n$-vector to produce an $m$-vector. The row view computes each output entry as a dot product of a row with $x$. The column view shows $Ax$ as a combination of the columns weighted by $x$, which is why solving $Ax = b$ means writing $b$ as a combination of columns. The product is linear, and the identity matrix leaves every vector unchanged.

@viz matrix2 preset=shear | The matrix A acts on every vector of the plane. Its columns are where î and ĵ land. Drag them.

:::explore
**What to try**
1. Choose the **identity** preset. The grid doesn't move and the columns are $(1, 0)$ and $(0, 1)$.
2. Choose **shear**. The matrix is $\begin{bmatrix}1 & 1\\0 & 1\end{bmatrix}$: the pink arrow ($\hat\imath$) stays put and the blue arrow ($\hat\jmath$) lands at $(1, 1)$.
3. Drag the pink arrow to $(2, 1)$ and the blue arrow to $(1, 3)$. You've built the bakery matrix $\begin{bmatrix}2 & 1\\1 & 3\end{bmatrix}$ in column form.
4. Find where the grid point $(1, 1)$ lands: it's the corner of the yellow square opposite the origin, column 1 + column 2.

**What to notice:** the panel shows the columns of $A$ are exactly where $\hat\imath$ and $\hat\jmath$ go. Every other point $x$ goes to $x_1(\text{col}_1) + x_2(\text{col}_2)$, which is the column view of $Ax$ from the article.
:::

:::formulas
$$(Ax)_i = \sum_{j=1}^n A_{ij}x_j = (\text{row } i)\cdot x$$
$$Ax = x_1 a_1 + x_2 a_2 + \dots + x_n a_n \quad (a_j = \text{column } j)$$
$$(m\times n)(n\times1) = (m\times 1)$$
$$A(x + y) = Ax + Ay, \qquad A(cx) = cAx$$
:::

:::thm $Ax = b$ is solvable exactly when $b$ is in the span of the columns
The equation $Ax = b$ has a solution if and only if $b$ is a linear combination of the columns of $A$.
:::

:::proof
By the column view, $Ax = x_1a_1 + \dots + x_na_n$. So a vector $x$ with $Ax = b$ is exactly a set of weights that makes $b$ out of the columns.
:::

:::steps Compute $\begin{bmatrix} 2 & 0 & 1 \\ -1 & 3 & 2 \end{bmatrix}\begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}$
1. Shapes: $(2\times3)(3\times1)$ gives a 2-vector.
2. Row 1: $(2, 0, 1)\cdot(1, 2, 3) = 2 + 0 + 3 = 5$.
3. Row 2: $(-1, 3, 2)\cdot(1, 2, 3) = -1 + 6 + 6 = 11$.
4. Result $(5, 11)$. Column check: $1(2, -1) + 2(0, 3) + 3(1, 2) = (2 + 0 + 3, -1 + 6 + 6) = (5, 11)$.
:::

:::steps Write the system $x + 2y - z = 4$, $3x - y = 7$ as $Ax = b$
1. Unknowns $(x, y, z)$, so $A$ has 3 columns; two equations, so 2 rows.
2. Coefficients row by row (a missing variable has coefficient 0): $A = \begin{bmatrix} 1 & 2 & -1\\ 3 & -1 & 0\end{bmatrix}$.
3. Right side $b = (4, 7)$.
:::

:::mock Exam question
A matrix $A$ satisfies $A\begin{bmatrix}1\\0\end{bmatrix} = \begin{bmatrix}3\\-1\end{bmatrix}$ and $A\begin{bmatrix}0\\1\end{bmatrix} = \begin{bmatrix}2\\4\end{bmatrix}$. Find $A$ and compute $A\begin{bmatrix}2\\-3\end{bmatrix}$.
:::solution
$A\hat\imath$ is the first column and $A\hat\jmath$ the second, so $A = \begin{bmatrix}3 & 2\\-1 & 4\end{bmatrix}$. By linearity $A(2, -3) = 2(3, -1) - 3(2, 4) = (6 - 6, -2 - 12) = (0, -14)$.
:::
:::

:::ml
A dense (fully connected) layer computes $y = Wx + b$. With 784 inputs and 128 outputs, $W$ is $128 \times 784$: 100,352 learned numbers. Each output neuron is one row of $W$ dotted with the input (row view). A dataset with $n$ examples and $d$ features is an $n\times d$ matrix $X$, and a linear model's predictions for all examples at once are $Xw$.
:::

:::code
```python
import numpy as np
A = np.array([[1, 2], [3, 4]])
x = np.array([5, 6])
A @ x          # array([17, 39])
A.shape        # (2, 2)
```
:::

:::real
Nutrition labels work like a matrix: rows are nutrients, columns are foods, and multiplying by the servings you ate gives your total intake. Factories use the same idea to turn a production plan into a list of required parts.
:::

:::quiz
? Compute $\begin{bmatrix} 2 & 0 \\ 1 & 3 \end{bmatrix}\begin{bmatrix} 1 \\ 2 \end{bmatrix}$. Give the second entry.
= 7
> Row 2 dotted with $x$: $1\cdot1 + 3\cdot2 = 7$.

? A $3\times5$ matrix times a vector gives a vector of what length?
= 3
> One output entry per row.

? For $A = \begin{bmatrix} 4 & 1 & 0 \\ 2 & 5 & 7 \end{bmatrix}$, what is $A_{23}$?
= 7
> Row 2, column 3.

? In the column view, $Ax$ is...
+ a combination of the columns of $A$ weighted by the entries of $x$
- a combination of the rows of $x$
- the dot product of $A$ and $x$
> $Ax = x_1a_1 + \dots + x_na_n$.

? What is the first entry of $\begin{bmatrix} 1 & -1 \\ 2 & 2 \end{bmatrix}\begin{bmatrix} 3 \\ 5 \end{bmatrix}$?
= -2
> $3 - 5 = -2$.

? Can a $2\times3$ matrix multiply a 2-vector?
- Yes
+ No
> The number of columns (3) must equal the vector's length.
:::

## Lesson: Matrices as linear transformations {#transformations}
@summary: Every matrix moves space, keeping grid lines straight, parallel and evenly spaced, and its columns tell you how.

### Why think of matrices as motion?
You now know how to compute $Ax$. But staring at a grid of numbers gives little feeling for what the matrix does. The breakthrough idea is to think of $A$ as a **function** that moves every point of space to a new point. Some matrices rotate the plane, some stretch it, some shear it sideways, some flip it like a mirror, and some flatten it onto a line. Once you can see a matrix as a motion, determinants become "how much area changes", inverses become "the motion that undoes it", and eigenvectors become "the directions that don't turn". This picture is the heart of linear algebra.

### An everyday scenario
Imagine drawing a picture on a sheet of graph paper made of stretchy rubber. Now grab the sheet and deform it: stretch it wider, tilt it, slide the top edge sideways while holding the bottom still. There are many ways to deform rubber, but a **linear** transformation only allows the tidy ones. The grid lines must stay straight (no bending), stay parallel to each other, stay evenly spaced, and the origin must stay pinned in place. Every matrix is exactly one such tidy deformation, and every tidy deformation is exactly one matrix.

### What "linear" means
A transformation $T$ is **linear** if it respects addition and scaling:
$$T(u + v) = T(u) + T(v), \qquad T(cv) = c\,T(v)$$
In words: transforming a sum is the same as summing the transformed vectors, and transforming a stretched vector is the same as stretching the transformed one. Geometrically, this is the rubber-sheet rule: lines stay lines, parallel stays parallel, even spacing stays even, and $T(0) = 0$ because $T(0) = T(0\cdot v) = 0\cdot T(v) = 0$.

For example, $T(x, y) = (2x, x + y)$ is linear. But $T(x, y) = (x + 1, y)$ is not, since it moves the origin to $(1, 0)$. And $T(x, y) = (x^2, y)$ is not, since $T(2, 0) = (4, 0) \ne 2T(1, 0) = (2, 0)$.

:::def Linear transformation
A function $T$ from vectors to vectors with $T(u + v) = T(u) + T(v)$ and $T(cv) = cT(v)$. It keeps the origin fixed and maps straight, evenly spaced grid lines to straight, evenly spaced grid lines.
:::

### The key fact: watch where the basis vectors go
Here is the idea that makes everything easy. Every vector in the plane can be written as $x\hat\imath + y\hat\jmath$. If $T$ is linear, then
$$T(x\hat\imath + y\hat\jmath) = x\,T(\hat\imath) + y\,T(\hat\jmath)$$
So once you know where the two basis vectors land, you know where **every** vector lands. A linear transformation of the plane is completely described by just four numbers: the two coordinates of $T(\hat\imath)$ and the two of $T(\hat\jmath)$.

Put those landing spots in the columns of a matrix, and the formula above is exactly the column view of matrix-vector multiplication. **The columns of a matrix are where the basis vectors land.** For example, if a transformation sends $\hat\imath$ to $(1, 1)$ and $\hat\jmath$ to $(-1, 2)$, its matrix is $\begin{bmatrix}1 & -1\\1 & 2\end{bmatrix}$. To find where $(3, 2)$ goes: $3(1, 1) + 2(-1, 2) = (1, 7)$.

### A gallery of transformations
**Scaling.** $\begin{bmatrix}2 & 0\\0 & 0.5\end{bmatrix}$ sends $\hat\imath$ to $(2, 0)$ and $\hat\jmath$ to $(0, 0.5)$: it stretches horizontally by 2 and squashes vertically by half.

**Rotation.** To rotate by angle $\theta$ counterclockwise, $\hat\imath = (1, 0)$ goes to $(\cos\theta, \sin\theta)$ and $\hat\jmath = (0, 1)$ goes to $(-\sin\theta, \cos\theta)$. Those are the columns:
$$R_\theta = \begin{bmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{bmatrix}$$
For $90°$: $\begin{bmatrix}0 & -1\\1 & 0\end{bmatrix}$, which sends $(1, 0)$ to $(0, 1)$ and $(0, 1)$ to $(-1, 0)$.

**Shear.** $\begin{bmatrix}1 & k\\0 & 1\end{bmatrix}$ keeps $\hat\imath$ fixed and pushes $\hat\jmath$ sideways to $(k, 1)$. Squares become slanted parallelograms, like a deck of cards pushed sideways.

**Reflection.** $\begin{bmatrix}1 & 0\\0 & -1\end{bmatrix}$ flips across the $x$-axis: $(x, y) \to (x, -y)$. Swapping the columns of the identity, $\begin{bmatrix}0 & 1\\1 & 0\end{bmatrix}$, reflects across the line $y = x$.

**Projection.** $\begin{bmatrix}1 & 0\\0 & 0\end{bmatrix}$ sends $\hat\jmath$ to zero, so $(x, y) \to (x, 0)$: it flattens the whole plane onto the $x$-axis. Information is lost, and there is no way to undo it.

### Why it works
The reason four numbers suffice is linearity plus the basis. Since every vector is a unique combination of $\hat\imath$ and $\hat\jmath$, and $T$ preserves combinations, the image of any vector is the same combination of the images. Grid lines stay parallel and evenly spaced for the same reason: the line of points $\hat\imath + t\hat\jmath$ goes to $T(\hat\imath) + t\,T(\hat\jmath)$, again a straight line traced at a steady rate.

:::intuition
"Multiply by a matrix" and "apply a transformation" are the same sentence. When you see $Ax$, picture the whole plane being stretched, rotated or sheared, with $x$ riding along.
:::

:::warn Common mistakes
- Writing the landing spots as rows instead of columns. $T(\hat\imath)$ is the **first column**.
- Thinking a shift like $x \mapsto x + b$ is linear. It moves the origin, so it is **affine**, not linear.
- Assuming every transformation can be undone. Projections squash space and cannot be reversed.
- Rotating clockwise by mistake. The standard $R_\theta$ rotates counterclockwise for positive $\theta$.
:::

### Summary
A matrix is a linear transformation: it moves space while keeping grid lines straight, parallel and evenly spaced and the origin fixed. Because every vector is a combination of $\hat\imath$ and $\hat\jmath$, knowing where those two land tells you everything, and those landing spots are the matrix's columns. Rotations, scalings, shears, reflections and projections are all matrices you can now write down from a picture.

@viz matrix2 preset=rotate | Pick presets and press Animate to watch the grid move from the identity to A. Drag î and ĵ to build your own matrix.

:::explore
**What to try**
1. Choose **rotate** and press **Animate**. Every grid square turns by $45°$ without changing shape or size.
2. Choose **scale**, then **reflect**, then **shear**, animating each. Note the matrix in the panel each time and match it to the gallery in the article.
3. Choose **project**. The whole grid collapses onto the $x$-axis and the panel says it is not invertible.
4. Drag $\hat\imath$ to $(0, 1)$ and $\hat\jmath$ to $(-1, 0)$. You've built the $90°$ rotation by hand.

**What to notice:** the grid lines always stay straight, parallel and evenly spaced, and the origin never moves. The columns in the panel are always the tips of the pink and blue arrows: where $\hat\imath$ and $\hat\jmath$ land.
:::

:::formulas
$$T(u + v) = T(u) + T(v), \qquad T(cv) = cT(v)$$
$$A = \big[\,T(\hat\imath)\ \ T(\hat\jmath)\,\big]$$
$$R_\theta = \begin{bmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{bmatrix}$$
:::

:::thm Every linear transformation of $\mathbb{R}^n$ is a matrix
If $T:\mathbb{R}^n \to \mathbb{R}^m$ is linear, then $T(x) = Ax$ where $A$ is the $m\times n$ matrix whose $j$-th column is $T(e_j)$.
:::

:::proof
Write $x = x_1e_1 + \dots + x_ne_n$. By linearity $T(x) = x_1T(e_1) + \dots + x_nT(e_n)$, which is exactly $Ax$ by the column view.
:::

:::steps Find the matrix that reflects the plane across the line $y = x$
1. Reflecting across $y = x$ swaps coordinates. $\hat\imath = (1, 0)$ goes to $(0, 1)$.
2. $\hat\jmath = (0, 1)$ goes to $(1, 0)$.
3. Columns: $A = \begin{bmatrix}0 & 1\\1 & 0\end{bmatrix}$. Check: $A(3, 5) = (5, 3)$.
:::

:::steps Rotate the point $(2, 1)$ by $90°$ counterclockwise
1. $R_{90°} = \begin{bmatrix}0 & -1\\1 & 0\end{bmatrix}$.
2. $R(2, 1) = (0\cdot2 - 1\cdot1,\ 1\cdot2 + 0\cdot1) = (-1, 2)$.
3. Check: $(2, 1)\cdot(-1, 2) = 0$ (perpendicular) and both have length $\sqrt5$.
:::

:::mock Exam question
Is $T(x, y) = (x + 2y,\ 3x)$ linear? If so, find its matrix and $T(-1, 4)$. Is $S(x, y) = (xy, x)$ linear?
:::solution
$T$ is linear: each output is a fixed combination of $x$ and $y$. $T(\hat\imath) = (1, 3)$ and $T(\hat\jmath) = (2, 0)$, so $A = \begin{bmatrix}1 & 2\\3 & 0\end{bmatrix}$ and $T(-1, 4) = (-1 + 8, -3) = (7, -3)$. $S$ is not linear: $S(2, 2) = (4, 2)$ but $2S(1, 1) = (2, 2)$.
:::
:::

:::ml
Data augmentation rotates, scales and shears training images with $2\times2$ matrices (plus a shift). Inside a network, each linear layer transforms its input space before a nonlinearity bends it; stacking these lets networks untangle data that isn't linearly separable at first. Spatial transformer networks learn the transformation matrix itself.
:::

:::cs
Computer graphics represents every rotation, scaling and camera projection as a matrix, and GPUs apply them to millions of vertices per frame. To include shifts, graphics uses **homogeneous coordinates**: a 2-D point $(x, y)$ becomes $(x, y, 1)$, so a translation becomes a $3\times3$ matrix.
:::

:::real
Photo-editing tools such as "rotate", "flip horizontal", "skew" and "resize" are each a $2\times2$ matrix applied to every pixel position. A camera taking a picture of a tilted page performs a projection.
:::

:::quiz
? Which matrix rotates the plane by $90°$ counterclockwise?
+ $\begin{bmatrix}0 & -1\\1 & 0\end{bmatrix}$
- $\begin{bmatrix}0 & 1\\1 & 0\end{bmatrix}$
- $\begin{bmatrix}-1 & 0\\0 & -1\end{bmatrix}$
> $\hat\imath = (1,0)$ goes to $(0,1)$ and $\hat\jmath$ goes to $(-1, 0)$. Those are the columns.

? Is $T(x) = x + (1, 0)$ linear?
- Yes
+ No
> It moves the origin, so $T(0) \ne 0$. It's affine.

? A transformation sends $\hat\imath$ to $(2, 1)$ and $\hat\jmath$ to $(0, 3)$. What is the second entry of $T(1, 1)$?
= 4
> $T(1, 1) = (2, 1) + (0, 3) = (2, 4)$.

? The matrix $\begin{bmatrix}1 & 0\\0 & 0\end{bmatrix}$ performs a...
- rotation
- shear
+ projection onto the $x$-axis
> It sends $(x, y)$ to $(x, 0)$.

? Under any linear transformation, the origin...
+ stays at the origin
- moves to $(1, 1)$
- can go anywhere
> $T(0) = T(0\cdot v) = 0$.

? What is the first entry of $\begin{bmatrix}1 & 0\\0 & -1\end{bmatrix}\begin{bmatrix}4\\7\end{bmatrix}$?
= 4
> Reflection across the $x$-axis keeps $x$ and flips $y$: $(4, -7)$.
:::

## Lesson: Matrix multiplication {#matmul}
@summary: Multiplying matrices means doing one transformation after another. The row-column rule, shapes, and why order matters.

### Why multiply two matrices?
In the last lesson a matrix became a motion of space. A natural question follows: what happens if you do one motion and then another? Rotate a photo, then stretch it. Shear a shape, then reflect it. The result is again a tidy, grid-preserving motion, so it must be some single matrix. **Matrix multiplication** is the rule that finds that single matrix. This is why matrix multiplication is defined in a way that looks strange at first: it is designed so that multiplying two matrices gives you the matrix of "do one, then the other". Neural networks, computer graphics and almost every numerical algorithm are long chains of matrix multiplications, so this lesson is worth learning slowly.

### An everyday scenario
Go back to the bakery. Matrix $B$ turns an order of cakes and pies into amounts of eggs and sugar. Now imagine a second table, matrix $A$, that turns amounts of eggs and sugar into a cost in dollars and a weight in grams. If you want to go straight from "cakes and pies ordered" to "dollars and grams", you could apply $B$ and then $A$ every time, or you could combine the two tables once into a single table $AB$ that does the whole job. Multiplying the matrices is precomputing the combined table. Doing $B$ first and $A$ second is written $AB$, with $B$ on the right, because $B$ is the one that touches the vector first: $A(Bx)$.

### Building the product column by column
Here is the cleanest way to see what $AB$ must be. Recall that the columns of a matrix are where the basis vectors land. So to find the first column of $AB$, ask: where does $\hat\imath$ end up after doing $B$ and then $A$? First $B$ sends $\hat\imath$ to the first column of $B$, call it $b_1$. Then $A$ sends $b_1$ to $Ab_1$. So the first column of $AB$ is $Ab_1$. In general:
$$AB = \big[\,Ab_1\ \ Ab_2\ \ \cdots\ \ Ab_p\,\big]$$
Each column of the product is $A$ times the matching column of $B$. You already know how to do matrix-vector products, so you already know how to multiply matrices.

Try it with $A = \begin{bmatrix}1 & 2\\0 & 1\end{bmatrix}$ and $B = \begin{bmatrix}3 & 0\\1 & 2\end{bmatrix}$. The first column of $B$ is $(3, 1)$, and $A(3, 1) = (3 + 2, 1) = (5, 1)$. The second column of $B$ is $(0, 2)$, and $A(0, 2) = (0 + 4, 2) = (4, 2)$. So
$$AB = \begin{bmatrix}5 & 4\\1 & 2\end{bmatrix}$$

### The row-column rule
For fast hand computation there is a shortcut that gives each entry directly. The entry in row $i$, column $j$ of $AB$ is the dot product of row $i$ of $A$ with column $j$ of $B$:
$$(AB)_{ij} = \sum_k A_{ik}B_{kj}$$
In the example, entry $(1, 2)$ is row 1 of $A$, which is $(1, 2)$, dotted with column 2 of $B$, which is $(0, 2)$: $0 + 4 = 4$. Entry $(2, 1)$ is $(0, 1)\cdot(3, 1) = 1$. This rule is exactly the column view written out entry by entry.

@fig matrix2 preset=shear | A shear is one matrix. Composing it with a rotation gives another single matrix: the product.

### Shapes must match
The dot products only make sense when a row of $A$ is as long as a column of $B$. So $A$ must have as many columns as $B$ has rows. If $A$ is $m \times n$ and $B$ is $n \times p$, then $AB$ is $m \times p$:
$$(m\times n)(n\times p) = (m\times p)$$
The inner numbers must agree and disappear; the outer numbers give the shape. A $2\times3$ times a $3\times4$ is $2\times4$. A $3\times2$ times a $3\times2$ is undefined.

### Order matters
With ordinary numbers, $3\cdot5 = 5\cdot3$. With matrices this usually fails: in general $AB \ne BA$. In our example, $BA = \begin{bmatrix}3 & 0\\1 & 2\end{bmatrix}\begin{bmatrix}1 & 2\\0 & 1\end{bmatrix} = \begin{bmatrix}3 & 6\\1 & 4\end{bmatrix}$, which is not $AB$. Geometrically this makes sense: putting on socks then shoes is different from shoes then socks. Rotating a picture by $90°$ and then shearing it gives a different result from shearing and then rotating. Sometimes $BA$ is not even defined when $AB$ is, because the shapes don't match.

### Rules that do hold
Although order matters, grouping does not: $(AB)C = A(BC)$. This is **associativity**, and it holds because both sides mean "do $C$, then $B$, then $A$". Multiplication also distributes: $A(B + C) = AB + AC$. The identity acts like the number 1: $AI = IA = A$. Powers make sense for square matrices: $A^2 = AA$, $A^3 = AAA$.

### The transpose
The **transpose** $A^T$ flips a matrix across its diagonal, so rows become columns: $(A^T)_{ij} = A_{ji}$. If $A = \begin{bmatrix}1 & 2 & 3\\4 & 5 & 6\end{bmatrix}$, then $A^T = \begin{bmatrix}1 & 4\\2 & 5\\3 & 6\end{bmatrix}$, a $3\times2$ matrix. The transpose of a product reverses the order: $(AB)^T = B^TA^T$. The transpose also lets us write dot products as matrix products: for column vectors, $u\cdot v = u^Tv$.

:::def Matrix product
For $A$ ($m\times n$) and $B$ ($n\times p$), $AB$ is the $m\times p$ matrix with $(AB)_{ij} = \sum_k A_{ik}B_{kj}$. It represents doing $B$ first, then $A$.
:::

:::def Transpose
$A^T$ is $A$ flipped across its diagonal: $(A^T)_{ij} = A_{ji}$. An $m\times n$ matrix has an $n\times m$ transpose.
:::

:::warn Common mistakes
- Assuming $AB = BA$. Always keep the order.
- Reading $AB$ as "do $A$ first". The matrix on the right acts first.
- Multiplying entry by entry. That is a different operation (the Hadamard product, written $A\odot B$).
- Writing $(AB)^T = A^TB^T$. The order reverses.
- Forgetting to check shapes before starting.
:::

### Summary
The product $AB$ is the single matrix for "do $B$, then $A$". Its columns are $A$ times the columns of $B$, and its entries are rows of $A$ dotted with columns of $B$. An $m\times n$ matrix times an $n\times p$ matrix gives $m\times p$. Multiplication is associative and distributive but not commutative, and transposing a product reverses its order.

@viz matrix2 preset=rotate | Build the matrices from the article by dragging î and ĵ, and compare the results of doing them in different orders.

:::explore
**What to try**
1. Choose **rotate** and note the matrix $R$. Then choose **shear** and note $S$.
2. Work out $SR$ by hand with the column rule: where does $\hat\imath$ go after rotating then shearing?
3. Drag $\hat\imath$ and $\hat\jmath$ to the columns of your answer and compare the grid to what you predicted.
4. Now do $RS$ (shear first). Drag the arrows to its columns. The picture is different.

**What to notice:** each product is again a single grid-preserving motion, and its columns are where $\hat\imath$ and $\hat\jmath$ land after both steps. Changing the order changes the picture, which is why $AB \ne BA$.
:::

:::formulas
$$(AB)_{ij} = \sum_k A_{ik}B_{kj}$$
$$AB = [\,Ab_1 \ \cdots\ Ab_p\,]$$
$$(m\times n)(n\times p) = m\times p$$
$$(AB)C = A(BC), \quad A(B + C) = AB + AC, \quad AI = IA = A$$
$$(AB)^T = B^TA^T, \qquad u\cdot v = u^Tv$$
:::

:::thm Transpose of a product
For any matrices with $AB$ defined, $(AB)^T = B^TA^T$.
:::

:::proof
Entry $(i, j)$ of $(AB)^T$ is entry $(j, i)$ of $AB$, which is $\sum_k A_{jk}B_{ki}$. Entry $(i, j)$ of $B^TA^T$ is $\sum_k (B^T)_{ik}(A^T)_{kj} = \sum_k B_{ki}A_{jk}$. These are the same sum.
:::

:::steps Compute $\begin{bmatrix}2 & 1\\0 & 3\end{bmatrix}\begin{bmatrix}1 & 4\\2 & 0\end{bmatrix}$
1. Entry (1,1): $(2, 1)\cdot(1, 2) = 4$.
2. Entry (1,2): $(2, 1)\cdot(4, 0) = 8$.
3. Entry (2,1): $(0, 3)\cdot(1, 2) = 6$.
4. Entry (2,2): $(0, 3)\cdot(4, 0) = 0$.
5. Result: $\begin{bmatrix}4 & 8\\6 & 0\end{bmatrix}$.
:::

:::steps Find the single matrix for "rotate $90°$ counterclockwise, then shear with $S = \begin{bmatrix}1 & 1\\0 & 1\end{bmatrix}$"
1. Rotation first, so the product is $SR$ with $R = \begin{bmatrix}0 & -1\\1 & 0\end{bmatrix}$.
2. Column 1: $S(0, 1) = (1, 1)$. Column 2: $S(-1, 0) = (-1, 0)$.
3. $SR = \begin{bmatrix}1 & -1\\1 & 0\end{bmatrix}$. In the other order, $RS = \begin{bmatrix}0 & -1\\1 & 1\end{bmatrix}$, which is different.
:::

:::steps Shapes: $A$ is $3\times2$, $B$ is $2\times5$, $C$ is $5\times1$. Which products exist?
1. $AB$: inner 2 and 2 match, shape $3\times5$.
2. $BC$: inner 5 and 5 match, shape $2\times1$.
3. $ABC$: $3\times1$. $BA$: inner 5 and 3 don't match, undefined.
:::

:::mock Exam question
Let $A = \begin{bmatrix}1 & 2\\3 & 4\end{bmatrix}$ and $P = \begin{bmatrix}0 & 1\\1 & 0\end{bmatrix}$. Compute $AP$ and $PA$ and describe in words what multiplying by $P$ on each side does.
:::solution
$AP = \begin{bmatrix}2 & 1\\4 & 3\end{bmatrix}$: multiplying on the right swaps the **columns** of $A$. $PA = \begin{bmatrix}3 & 4\\1 & 2\end{bmatrix}$: multiplying on the left swaps the **rows**. Since $AP \ne PA$, this is another example of non-commutativity.
:::
:::

:::ml
A batch of $B$ inputs is stacked as the rows of $X$ ($B\times d$), and a layer computes $XW^T + b$ for the whole batch in one matrix multiply. A deep network without nonlinearities collapses: $W_3W_2W_1x$ is just one matrix $W = W_3W_2W_1$ times $x$, which is why activation functions are essential.
:::

:::cs
Multiplying two $n\times n$ matrices with the row-column rule takes $n^3$ multiplications. GPUs and libraries such as BLAS exist to do this fast. The order of a chain matters for cost: for an $n\times n$ $A$, $B$ and vector $x$, computing $A(Bx)$ costs about $2n^2$ operations, while $(AB)x$ costs about $n^3$.
:::

:::real
Animation software stacks transformations for a character's arm: shoulder rotation, elbow rotation, wrist rotation. The hand's final position is the product of those matrices applied to the hand's local coordinates.
:::

:::code
```python
import numpy as np
A = np.array([[1, 2], [0, 1]]); B = np.array([[3, 0], [1, 2]])
A @ B        # [[5, 4], [1, 2]]
B @ A        # [[3, 6], [1, 4]]  (different)
A.T          # transpose
```
:::

:::quiz
? If $A$ is $2\times3$ and $B$ is $3\times4$, what shape is $AB$?
+ $2\times4$
- $3\times3$
- $4\times2$
- undefined
> Inner dimensions 3 and 3 match; the outer ones give $2\times4$.

? Simplify $(AB)^T$.
- $A^TB^T$
+ $B^TA^T$
- $AB$
> Transposing reverses the order.

? Compute entry (2,1) of $\begin{bmatrix}1 & 0\\2 & 3\end{bmatrix}\begin{bmatrix}4 & 1\\1 & 5\end{bmatrix}$.
= 11
> Row 2 of $A$ is $(2, 3)$, column 1 of $B$ is $(4, 1)$: $8 + 3 = 11$.

? In $AB$, which matrix acts on a vector first?
- $A$
+ $B$
> $(AB)x = A(Bx)$, so $B$ touches $x$ first.

? For square matrices, is $AB = BA$ always true?
- Yes
+ No
> Example: $\begin{bmatrix}1 & 2\\0 & 1\end{bmatrix}$ and $\begin{bmatrix}3 & 0\\1 & 2\end{bmatrix}$ give different products.

? How many multiplications does the row-column rule use for two $3\times3$ matrices?
= 27
> Each of the 9 entries needs 3 multiplications: $3^3 = 27$.
:::

## Lesson: Special matrices {#special-matrices}
@summary: Diagonal, triangular, symmetric, orthogonal and permutation matrices, plus the trace: shapes that make computation easy.

### Why special matrices?
A general matrix can do almost anything, which makes it expensive to work with. But many matrices that appear in practice have a special pattern: lots of zeros in predictable places, or a mirror symmetry, or columns that are perfectly perpendicular. These patterns are not just cosmetic. A diagonal system can be solved in one step, a triangular one in a few, and an orthogonal matrix can be inverted by simply flipping it. Recognising these shapes saves enormous amounts of computation, and nearly every algorithm later in this course works by turning a general matrix into a product of special ones.

### An everyday scenario
Think of a team of workers. In a general team, everybody's output depends on everybody else's: hard to manage. In a **diagonal** team, each worker handles one job alone, so you can scale each person's output independently. In a **triangular** team, worker 1 works alone, worker 2 depends only on worker 1, worker 3 on workers 1 and 2, and so on, so you can sort everything out in order. An **orthogonal** team is a perfectly rotated copy of the original, with no stretching at all. Each pattern is a kind of order that makes life easier.

### Diagonal matrices
A **diagonal matrix** has nonzero entries only on the main diagonal. It scales each axis by its own factor:
$$D = \begin{bmatrix}2 & 0\\0 & 3\end{bmatrix}, \qquad D\begin{bmatrix}x\\y\end{bmatrix} = \begin{bmatrix}2x\\3y\end{bmatrix}$$
Everything about diagonal matrices is easy. Multiplying two diagonal matrices multiplies their diagonals. Powers are powers of the diagonal: $D^3 = \begin{bmatrix}8 & 0\\0 & 27\end{bmatrix}$. The inverse divides: $D^{-1} = \begin{bmatrix}1/2 & 0\\0 & 1/3\end{bmatrix}$, provided no diagonal entry is zero. The identity is the diagonal matrix with all ones.

### Triangular matrices
An **upper triangular** matrix has zeros below the diagonal, and a **lower triangular** matrix has zeros above it. Systems with triangular matrices are solved by substitution, one unknown at a time. For
$$\begin{bmatrix}2 & 0\\1 & 3\end{bmatrix}\begin{bmatrix}x_1\\x_2\end{bmatrix} = \begin{bmatrix}4\\5\end{bmatrix}$$
row 1 says $2x_1 = 4$, so $x_1 = 2$. Row 2 says $x_1 + 3x_2 = 5$, so $3x_2 = 3$ and $x_2 = 1$. This is **forward substitution**; with an upper triangular matrix you start from the bottom row instead, which is **back substitution**. Elimination, in a later lesson, is exactly the process of turning a general system into a triangular one.

### Symmetric matrices
A matrix is **symmetric** if it equals its own transpose, $A = A^T$, which means $A_{ij} = A_{ji}$: the entries mirror across the diagonal. For example $\begin{bmatrix}2 & 1\\1 & 3\end{bmatrix}$ is symmetric and $\begin{bmatrix}2 & 1\\0 & 3\end{bmatrix}$ is not. Symmetric matrices appear everywhere in data: the table of distances between cities is symmetric (A to B equals B to A), and so is a covariance matrix. A very useful fact is that $A^TA$ is symmetric for any matrix $A$, even a rectangular one. Symmetric matrices have the nicest possible eigenvalues and eigenvectors, as you'll see later.

### Orthogonal matrices
A square matrix $Q$ is **orthogonal** if its columns are orthonormal: each has length 1 and every pair is perpendicular. In matrix form this is $Q^TQ = I$, because entry $(i, j)$ of $Q^TQ$ is the dot product of column $i$ with column $j$. That gives a wonderful shortcut: $Q^{-1} = Q^T$. Rotations and reflections are orthogonal. For example the $45°$ rotation
$$Q = \frac{1}{\sqrt2}\begin{bmatrix}1 & -1\\1 & 1\end{bmatrix}$$
has columns of length $\sqrt{1/2 + 1/2} = 1$ whose dot product is $\frac12(-1 + 1) = 0$. Orthogonal matrices preserve lengths and angles: $\|Qx\| = \|x\|$. They move things rigidly without distortion, which makes them numerically stable.

### Permutation matrices
A **permutation matrix** is the identity with its rows reordered. Multiplying by it reorders the entries of a vector: $\begin{bmatrix}0 & 1\\1 & 0\end{bmatrix}(a, b) = (b, a)$. Permutation matrices are orthogonal, so undoing a shuffle is just the transpose.

### The trace
The **trace** of a square matrix is the sum of its diagonal entries: $\operatorname{tr}\begin{bmatrix}2 & 1\\1 & 3\end{bmatrix} = 5$. It is a single number summarising the matrix, and it has the surprising property $\operatorname{tr}(AB) = \operatorname{tr}(BA)$ even though $AB \ne BA$. Later you'll learn that the trace equals the sum of the eigenvalues.

:::def Symmetric matrix
A square matrix with $A^T = A$, i.e. $A_{ij} = A_{ji}$.
:::

:::def Orthogonal matrix
A square matrix $Q$ with orthonormal columns, equivalently $Q^TQ = I$, so $Q^{-1} = Q^T$.
:::

:::def Trace
$\operatorname{tr}(A) = \sum_i A_{ii}$, the sum of the diagonal entries of a square matrix.
:::

:::warn Common mistakes
- Calling a matrix orthogonal when its columns are perpendicular but not unit length. They must be orthonormal.
- Confusing symmetric ($A = A^T$) with orthogonal ($A^TA = I$). The identity is both, but most matrices are neither.
- Inverting a diagonal matrix with a zero on the diagonal. It has no inverse.
- Taking the trace of a non-square matrix. It's only defined for square ones.
:::

### Combining special matrices
Special matrices behave well together. The product of two diagonal matrices is diagonal, the product of two upper triangular matrices is upper triangular, and the product of two orthogonal matrices is orthogonal, since $(Q_1Q_2)^T(Q_1Q_2) = Q_2^TQ_1^TQ_1Q_2 = I$. The sum of two symmetric matrices is symmetric. These closure facts are why algorithms can safely build long chains of special matrices: rotating twice is still a rotation, and eliminating in several steps still gives a triangular result.

### Summary
Diagonal matrices scale each axis independently and are trivial to multiply, power and invert. Triangular matrices give systems that are solved by substitution. Symmetric matrices mirror across the diagonal, and $A^TA$ is always symmetric. Orthogonal matrices are rigid motions with $Q^{-1} = Q^T$ and preserve length. Permutations reorder entries, and the trace sums the diagonal.

@viz matrix2 preset=symmetric | Try the presets and identify which special type each matrix is.

:::explore
**What to try**
1. Choose **scale**. The matrix is diagonal: the grid is stretched along the axes without turning.
2. Choose **symmetric**. The off-diagonal entries match, and the grid stretches along two perpendicular (non-axis) directions.
3. Choose **rotate** and **reflect**. Both are orthogonal: the yellow square keeps its size and shape.
4. Choose **shear**. It is upper triangular but not orthogonal: the square changes shape.

**What to notice:** orthogonal matrices never distort the square, matching $\|Qx\| = \|x\|$ from the article. Diagonal matrices only stretch along the axes.
:::

:::formulas
$$D^k = \operatorname{diag}(d_1^k, \dots, d_n^k), \qquad D^{-1} = \operatorname{diag}(1/d_1, \dots, 1/d_n)$$
$$A \text{ symmetric} \iff A = A^T$$
$$Q^TQ = I \iff Q^{-1} = Q^T, \qquad \|Qx\| = \|x\|$$
$$\operatorname{tr}(A) = \sum_i A_{ii}, \qquad \operatorname{tr}(AB) = \operatorname{tr}(BA)$$
:::

:::thm $A^TA$ is always symmetric
For any $m\times n$ matrix $A$, the $n\times n$ matrix $A^TA$ is symmetric.
:::

:::proof
$(A^TA)^T = A^T(A^T)^T = A^TA$, using $(XY)^T = Y^TX^T$.
:::

:::thm Orthogonal matrices preserve length
If $Q^TQ = I$ then $\|Qx\| = \|x\|$ for every $x$.
:::

:::proof
$\|Qx\|^2 = (Qx)^T(Qx) = x^TQ^TQx = x^Tx = \|x\|^2$.
:::

:::steps Solve the upper triangular system $\begin{bmatrix}1 & 2 & 1\\0 & 3 & 3\\0 & 0 & 2\end{bmatrix}x = \begin{bmatrix}8\\9\\4\end{bmatrix}$
1. Bottom row: $2x_3 = 4$, so $x_3 = 2$.
2. Middle row: $3x_2 + 3(2) = 9$, so $x_2 = 1$.
3. Top row: $x_1 + 2(1) + 2 = 8$, so $x_1 = 4$. Solution $(4, 1, 2)$.
:::

:::steps Check that $Q = \begin{bmatrix}0.6 & -0.8\\0.8 & 0.6\end{bmatrix}$ is orthogonal and find $Q^{-1}$
1. Column lengths: $0.36 + 0.64 = 1$ for both.
2. Dot product of columns: $0.6(-0.8) + 0.8(0.6) = 0$.
3. So $Q$ is orthogonal and $Q^{-1} = Q^T = \begin{bmatrix}0.6 & 0.8\\-0.8 & 0.6\end{bmatrix}$.
:::

:::mock Exam question
Let $A = \begin{bmatrix}1 & 2\\0 & 1\\1 & 0\end{bmatrix}$. Compute $A^TA$, verify it is symmetric, and find its trace.
:::solution
$A^T = \begin{bmatrix}1 & 0 & 1\\2 & 1 & 0\end{bmatrix}$. Entry (1,1) is column 1 dotted with itself: $1 + 0 + 1 = 2$. Entry (1,2) is column 1 dotted with column 2: $2 + 0 + 0 = 2$. Entry (2,2): $4 + 1 + 0 = 5$. So $A^TA = \begin{bmatrix}2 & 2\\2 & 5\end{bmatrix}$, which is symmetric, with trace $7$.
:::
:::

:::ml
Covariance matrices and Hessians (second-derivative matrices) are symmetric. Diagonal matrices appear in optimisers such as Adam, which scales each parameter's step by its own factor. Orthogonal weight initialisation keeps signal lengths stable through deep networks, and the trace shows up in regularisers like $\operatorname{tr}(W^TW) = \|W\|_F^2$.
:::

:::cs
Sparse and structured matrices are stored without their zeros: a diagonal $n\times n$ matrix needs $n$ numbers, not $n^2$. Triangular solves cost $O(n^2)$ instead of $O(n^3)$. Permutation matrices describe row swaps inside library routines like LU with pivoting.
:::

:::real
A road-distance table between cities is symmetric. A GPS turning a map to face north applies an orthogonal rotation that keeps every distance on the map correct.
:::

:::quiz
? An orthogonal matrix $Q$ satisfies...
+ $Q^{-1} = Q^T$
- $Q = Q^T$
- $\det Q = 0$
> $Q^TQ = I$ means $Q^T$ undoes $Q$.

? Is $\begin{bmatrix}1 & 2\\2 & 1\end{bmatrix}$ symmetric?
+ Yes
- No
> The off-diagonal entries are equal, so $A = A^T$.

? For $D = \begin{bmatrix}2 & 0\\0 & 3\end{bmatrix}$, what is the bottom-right entry of $D^2$?
= 9
> Square each diagonal entry: $3^2 = 9$.

? What is the trace of $\begin{bmatrix}4 & 7\\-1 & 2\end{bmatrix}$?
= 6
> $4 + 2 = 6$.

? Solve $2x_1 = 6$, $x_1 + 4x_2 = 11$ for $x_2$.
= 2
> Forward substitution: $x_1 = 3$, then $4x_2 = 8$.

? If $Q$ is orthogonal and $\|x\| = 5$, what is $\|Qx\|$?
= 5
> Orthogonal matrices preserve length.
:::

# Unit: Systems, inverses and determinants

## Lesson: Solving linear systems with elimination {#elimination}
@summary: Gaussian elimination, pivots, back substitution, the three possible outcomes, and LU factorisation.

### Why learn elimination?
Systems of linear equations are everywhere: balancing chemical reactions, fitting models to data, computing currents in circuits, finding where two lines meet. With two unknowns you can often guess or substitute, but with ten or ten thousand unknowns you need a method that always works and that a computer can follow blindly. That method is **Gaussian elimination**. It is over two thousand years old (a version appears in an ancient Chinese text), and it is still the algorithm running inside `numpy.linalg.solve`. Every idea later in this unit, from inverses to rank to determinants, can be computed with it.

### An everyday scenario
Imagine buying fruit at a market. Two apples and one banana cost 5 dollars. One apple and three bananas cost 5 dollars as well. What does each fruit cost? You might think: "if I double the second purchase I get 2 apples and 6 bananas for 10 dollars; compared with the first purchase, the extra 5 bananas cost an extra 5 dollars, so a banana costs 1 dollar and an apple costs 2." That reasoning is elimination: you combined equations to make one unknown disappear, solved for the other, and then went back to finish. The algorithm just makes this tidy and systematic.

### The setup: an augmented matrix
A system like
$$x + y + z = 6, \qquad 2x + 3y + z = 11, \qquad x - y + 2z = 5$$
is $Ax = b$ with $A = \begin{bmatrix}1 & 1 & 1\\2 & 3 & 1\\1 & -1 & 2\end{bmatrix}$ and $b = (6, 11, 5)$. Since the variable names never change, we drop them and write the **augmented matrix** $[A \mid b]$, with the right-hand side as an extra column:
$$\left[\begin{array}{ccc|c}1 & 1 & 1 & 6\\2 & 3 & 1 & 11\\1 & -1 & 2 & 5\end{array}\right]$$

### The three allowed moves
Elimination uses three **row operations**, none of which changes the solutions: swap two rows (reorder the equations); multiply a row by a nonzero number (scale an equation); and add a multiple of one row to another (combine equations). The third move is the workhorse. Each is reversible, which is why the solution set stays the same.

### Forward elimination: making zeros below the pivots
The goal is to reach **upper triangular** (staircase) form. The first nonzero entry we use in each row is called a **pivot**. Here the first pivot is the 1 in the top-left corner. To clear the entries below it: replace row 2 by row 2 minus 2 times row 1, giving $(0, 1, -1 \mid -1)$, and replace row 3 by row 3 minus row 1, giving $(0, -2, 1 \mid -1)$.

The second pivot is the 1 in row 2, column 2. Clear below it: row 3 plus 2 times row 2 gives $(0, 0, -1 \mid -3)$. The system is now
$$\left[\begin{array}{ccc|c}1 & 1 & 1 & 6\\0 & 1 & -1 & -1\\0 & 0 & -1 & -3\end{array}\right]$$
The pivots are $1, 1, -1$.

### Back substitution
Now solve from the bottom up. The last row says $-z = -3$, so $z = 3$. The middle row says $y - z = -1$, so $y = 2$. The top row says $x + y + z = 6$, so $x = 1$. The solution is $(1, 2, 3)$. Always check in an original equation: $2(1) + 3(2) + 3 = 11$. Correct.

### Why it works
Each row operation produces an equivalent system: any solution of the old equations solves the new ones, and because each move can be undone, the reverse is true too. Elimination never changes the answer; it only rewrites the question until the answer can be read off. Geometrically, with two unknowns each equation is a line and the solution is where they cross. Row operations replace the lines with different lines through the same crossing point.

@fig system2 | Two equations in two unknowns are two lines. Elimination replaces them with simpler lines through the same intersection.

### Three possible outcomes
A linear system has exactly one solution, no solution, or infinitely many. Elimination tells you which. If every column gets a pivot, there is **one solution**. If you reach a row like $0 = 1$, the equations contradict each other and there is **no solution**: for $x + y = 2$ and $2x + 2y = 5$, subtracting twice the first from the second gives $0 = 1$ (two parallel lines). If you reach a row $0 = 0$ and some column has no pivot, there are **infinitely many solutions**: for $x + y = 2$ and $2x + 2y = 4$ you get $0 = 0$, and $y$ is a **free variable**. Every choice $y = t$ gives a solution $x = 2 - t$ (the same line twice).

### LU factorisation
If you record the multipliers you used, elimination factors the matrix. For $A = \begin{bmatrix}2 & 1\\4 & 5\end{bmatrix}$, subtracting 2 times row 1 from row 2 gives $U = \begin{bmatrix}2 & 1\\0 & 3\end{bmatrix}$. Put the multiplier 2 below the diagonal of an identity to get $L = \begin{bmatrix}1 & 0\\2 & 1\end{bmatrix}$. Then $A = LU$: check that $LU = \begin{bmatrix}2 & 1\\4 & 2 + 3\end{bmatrix} = A$. Once you have $L$ and $U$, solving $Ax = b$ for many different $b$ is cheap: forward substitution with $L$, then back substitution with $U$.

:::def Pivot
The leading nonzero entry used in a row during elimination. The number of pivots is the rank of the matrix.
:::

:::def Free variable
A variable whose column has no pivot after elimination. It can take any value, giving infinitely many solutions.
:::

:::def LU factorisation
Writing $A = LU$ with $L$ lower triangular (the elimination multipliers, ones on the diagonal) and $U$ upper triangular (the result of elimination).
:::

:::warn Common mistakes
- Changing only the left side of a row and forgetting the right-hand column.
- Subtracting in the wrong direction and getting sign errors. Write "$R_2 \to R_2 - 2R_1$" every time.
- Dividing by a zero pivot. If a pivot position holds 0, swap in a lower row first.
- Treating $0 = 0$ as "no solution". It means a free variable, so infinitely many solutions (if nothing contradicts).
:::

### Summary
Write the system as an augmented matrix. Use row operations to clear entries below each pivot until the matrix is upper triangular, then back-substitute from the bottom. A row $0 = c$ with $c \ne 0$ means no solution; a missing pivot means free variables and infinitely many solutions; a pivot in every column means exactly one solution. Recording the multipliers gives $A = LU$.

@viz system2 | Two lines in the plane. Change the equations to see one crossing, parallel lines, or the same line twice.

:::explore
**What to try**
1. Make the lines cross at a single point. Read off the solution: this is the "pivot in every column" case.
2. Make the second line's slope equal the first's but with a different intercept. The lines are parallel: no solution, the $0 = 1$ case.
3. Make the second equation an exact multiple of the first. The lines coincide: infinitely many solutions, a free variable.

**What to notice:** these are the only three pictures possible for two lines, matching the three outcomes of elimination. Row operations change which lines you draw but never move the intersection.
:::

:::formulas
$$\text{Row ops: } R_i \leftrightarrow R_j, \quad R_i \to cR_i\ (c \ne 0), \quad R_i \to R_i + cR_j$$
$$A = LU \quad\Rightarrow\quad Ly = b,\ \ Ux = y$$
$$\text{Cost of elimination on } n\times n: \ \approx \tfrac23 n^3 \text{ operations}$$
:::

:::thm Number of solutions
A linear system $Ax = b$ has either no solution, exactly one solution, or infinitely many solutions.
:::

:::proof
Suppose $x_1 \ne x_2$ are both solutions. Then for any $t$, $A(x_1 + t(x_2 - x_1)) = b + t(b - b) = b$, so every point on the line through $x_1$ and $x_2$ is a solution. Two solutions force infinitely many.
:::

:::steps Solve $x + 2y = 5$, $3x - y = 1$
1. $R_2 \to R_2 - 3R_1$: $(3 - 3)x + (-1 - 6)y = 1 - 15$, so $-7y = -14$.
2. $y = 2$.
3. Back-substitute: $x = 5 - 2(2) = 1$. Check: $3(1) - 2 = 1$.
:::

:::steps Decide the number of solutions of $x - y + z = 1$, $2x - 2y + 3z = 5$, $3x - 3y + 4z = 6$
1. $R_2 \to R_2 - 2R_1$: $(0, 0, 1 \mid 3)$. $R_3 \to R_3 - 3R_1$: $(0, 0, 1 \mid 3)$.
2. $R_3 \to R_3 - R_2$: $(0, 0, 0 \mid 0)$. No contradiction.
3. Pivots in columns 1 and 3 only, so $y$ is free. $z = 3$, $x = 1 + y - 3 = y - 2$: infinitely many solutions $(t - 2, t, 3)$.
:::

:::mock Exam question
For which values of $k$ does the system $x + 2y = 3$, $2x + ky = 6$ have exactly one solution? What happens otherwise?
:::solution
$R_2 \to R_2 - 2R_1$ gives $(k - 4)y = 0$. If $k \ne 4$, $y = 0$ and $x = 3$: exactly one solution. If $k = 4$, the row becomes $0 = 0$, $y$ is free and there are infinitely many solutions $x = 3 - 2t$, $y = t$. There is no value of $k$ with no solution, because the right side $6$ is exactly twice $3$.
:::
:::

:::ml
Solving normal equations in linear regression, Newton steps in optimisation and Gaussian-process predictions all require solving $Ax = b$. Libraries factor $A$ once (LU, or Cholesky for symmetric positive definite $A$) and reuse the factors.
:::

:::cs
Elimination on an $n\times n$ system costs about $\tfrac23n^3$ operations, so a $1000\times1000$ system needs under a billion: well under a second. Partial pivoting (swapping in the largest available pivot) keeps rounding errors small and is what LAPACK does.
:::

:::real
Balancing a chemical equation such as $a\,\text{H}_2 + b\,\text{O}_2 \to c\,\text{H}_2\text{O}$ is a linear system: matching hydrogen gives $2a = 2c$ and oxygen gives $2b = c$. Elimination gives $a = 2, b = 1, c = 2$. Circuit simulators solve huge systems from Kirchhoff's laws the same way.
:::

:::quiz
? Solve $x + y = 5$, $x - y = 1$. What is $x$?
= 3
> Adding the equations gives $2x = 6$.

? Elimination produces the row $0\ 0\ \mid\ 4$. The system has...
+ no solution
- one solution
- infinitely many solutions
> The row says $0 = 4$, a contradiction.

? After elimination on 3 unknowns there are 2 pivots and no contradiction. How many free variables are there?
= 1
> Free variables = unknowns minus pivots $= 3 - 2$.

? In the system $2x + y = 7$, $6x + 5y = 25$, what multiple of row 1 is subtracted from row 2 to clear $x$?
= 3
> $6/2 = 3$. This number is also the entry of $L$ in $A = LU$.

? Which row operation is NOT allowed?
- Swap two rows
- Add 3 times row 1 to row 2
+ Multiply a row by 0
> Scaling by 0 destroys an equation and cannot be undone.

? Using $A = \begin{bmatrix}2 & 1\\4 & 5\end{bmatrix} = LU$, what is the bottom-right entry of $U$?
= 3
> $5 - 2\cdot1 = 3$.
:::

## Lesson: The inverse matrix {#inverse}
@summary: The matrix that undoes a transformation: when it exists, the 2x2 formula, Gauss-Jordan, and the invertible matrix theorem.

### Why inverses?
With numbers, solving $3x = 12$ is easy: multiply both sides by $1/3$. It would be lovely to do the same for $Ax = b$: multiply by "one over $A$" and read off $x$. For matrices, the role of $1/3$ is played by the **inverse matrix** $A^{-1}$, the transformation that undoes $A$. Inverses give a clean formula for solutions, explain when a system has a unique answer, and appear throughout theory (change of basis, diagonalisation, the normal equations). In practice computers rarely build $A^{-1}$ explicitly, but understanding it is essential.

### An everyday scenario
Imagine a secret code that scrambles a pair of numbers $(x, y)$ into $(2x + y,\ 5x + 3y)$. Your friend receives $(4, 11)$. To read the message she needs a decoding rule that reverses the scrambling exactly. That decoder is the inverse matrix. Not every scrambler can be reversed: a rule like $(x + 2y,\ 2x + 4y)$ always produces a second number that is twice the first, so different messages can produce the same code, and nothing can tell them apart. That scrambler has no inverse.

### The definition
A square matrix $A$ is **invertible** if there is a matrix $A^{-1}$ with
$$A^{-1}A = I \quad\text{and}\quad AA^{-1} = I$$
Geometrically, $A^{-1}$ is the motion that puts every point back where it started. The inverse of a $90°$ counterclockwise rotation is a $90°$ clockwise rotation. The inverse of stretching by 2 horizontally is squashing by 2 horizontally. The inverse of a shear that pushes right is the shear that pushes left. If $A$ is invertible, then $Ax = b$ has exactly one solution, $x = A^{-1}b$, found by multiplying both sides on the left by $A^{-1}$.

:::def Inverse matrix
For a square matrix $A$, the matrix $A^{-1}$ with $A^{-1}A = AA^{-1} = I$. It exists only when $A$ is invertible (nonsingular).
:::

### When does an inverse fail to exist?
A matrix can be undone only if it never sends two different points to the same place. A projection flattens the plane onto a line, so many points land on top of each other and there is no way to separate them again. Such a matrix is called **singular**. For a $2\times2$ matrix, singular means the columns lie on one line (one is a multiple of the other), which flattens the plane. The matrix $\begin{bmatrix}1 & 2\\2 & 4\end{bmatrix}$ is singular because column 2 is twice column 1. The quick test is the **determinant**: for $\begin{bmatrix}a & b\\c & d\end{bmatrix}$ it is $ad - bc$, and the matrix is invertible exactly when this is not zero. For $\begin{bmatrix}1 & 2\\2 & 4\end{bmatrix}$, $ad - bc = 4 - 4 = 0$.

### The 2x2 formula
For a $2\times2$ matrix with $ad - bc \ne 0$:
$$\begin{bmatrix}a & b\\c & d\end{bmatrix}^{-1} = \frac{1}{ad - bc}\begin{bmatrix}d & -b\\-c & a\end{bmatrix}$$
In words: swap the diagonal entries, negate the off-diagonal entries, divide by the determinant. For the secret code, $A = \begin{bmatrix}2 & 1\\5 & 3\end{bmatrix}$ has $ad - bc = 6 - 5 = 1$, so $A^{-1} = \begin{bmatrix}3 & -1\\-5 & 2\end{bmatrix}$. Decode $(4, 11)$: $A^{-1}(4, 11) = (12 - 11,\ -20 + 22) = (1, 2)$. Check by scrambling $(1, 2)$: $(2 + 2,\ 5 + 6) = (4, 11)$. The message was $(1, 2)$.

### Gauss-Jordan: inverses of any size
For larger matrices, put $A$ and $I$ side by side as $[A \mid I]$ and row-reduce until the left half becomes $I$. The right half is then $A^{-1}$. This works because the row operations that turn $A$ into $I$, applied to $I$, build up exactly the matrix that undoes $A$. For $A = \begin{bmatrix}1 & 2\\3 & 7\end{bmatrix}$: start with $\left[\begin{array}{cc|cc}1 & 2 & 1 & 0\\3 & 7 & 0 & 1\end{array}\right]$. $R_2 \to R_2 - 3R_1$ gives $(0, 1 \mid -3, 1)$. $R_1 \to R_1 - 2R_2$ gives $(1, 0 \mid 7, -2)$. So $A^{-1} = \begin{bmatrix}7 & -2\\-3 & 1\end{bmatrix}$, which agrees with the formula since $ad - bc = 1$. If the left half develops a row of zeros, $A$ is singular and there is no inverse.

### Rules for inverses
The inverse of a product reverses the order: $(AB)^{-1} = B^{-1}A^{-1}$. This is the socks-and-shoes rule again: to undo "socks then shoes", you remove shoes first. Also $(A^{-1})^{-1} = A$, $(A^T)^{-1} = (A^{-1})^T$, and for orthogonal matrices $Q^{-1} = Q^T$.

### The invertible matrix theorem
For a square $n\times n$ matrix, all of the following say the same thing: $A$ is invertible; $\det A \ne 0$; $Ax = b$ has exactly one solution for every $b$; $Ax = 0$ only has the solution $x = 0$; elimination finds $n$ pivots; the columns are linearly independent; the columns span $\mathbb{R}^n$; and $0$ is not an eigenvalue. If any one is true, all are true. This single theorem ties together nearly everything in the course so far.

:::warn Common mistakes
- Writing $(AB)^{-1} = A^{-1}B^{-1}$. The order reverses.
- Forgetting to divide by $ad - bc$ in the $2\times2$ formula, or swapping the wrong entries.
- Trying to invert a non-square matrix. Only square matrices have two-sided inverses.
- Computing $A^{-1}b$ in code instead of solving $Ax = b$ directly. Solving is faster and more accurate.
:::

### Left and right inverses for rectangular matrices
A non-square matrix cannot have a two-sided inverse, but it can have a one-sided one. A tall matrix $A$ with independent columns has a **left inverse** $(A^TA)^{-1}A^T$, which satisfies $(A^TA)^{-1}A^TA = I$. This exact expression will reappear in the least-squares lesson, where it produces the best approximate solution of an equation that has no exact one. A wide matrix with independent rows has a right inverse instead. The general tool covering every case is the pseudoinverse, built from the SVD at the end of this course.

### Summary
The inverse $A^{-1}$ undoes $A$: $A^{-1}A = I$. It exists exactly when $A$ does not flatten space, which for $2\times2$ matrices means $ad - bc \ne 0$. Use the swap-negate-divide formula for $2\times2$ and Gauss-Jordan on $[A \mid I]$ in general. Then $Ax = b$ has the unique solution $x = A^{-1}b$, and products invert in reverse order.

@viz matrix2 preset=shear | Find a matrix, then imagine the motion that puts the grid back. Try the singular preset, which cannot be undone.

:::explore
**What to try**
1. With **shear** ($\hat\jmath \to (1, 1)$), work out the inverse with the formula: $\begin{bmatrix}1 & -1\\0 & 1\end{bmatrix}$. Drag $\hat\jmath$ to $(-1, 1)$ to see the opposite shear.
2. Choose **rotate**. Its inverse is the rotation by the same angle the other way.
3. Choose **singular** or **project**. The grid collapses to a line, and the panel says the matrix is not invertible.
4. Drag $\hat\jmath$ slowly toward the line through $\hat\imath$. Watch the yellow square's area shrink to zero just as invertibility is lost.

**What to notice:** a matrix can be undone exactly when it keeps the plane two-dimensional. The moment the columns line up, $ad - bc = 0$ and information is lost.
:::

:::formulas
$$AA^{-1} = A^{-1}A = I$$
$$\begin{bmatrix}a & b\\c & d\end{bmatrix}^{-1} = \frac{1}{ad - bc}\begin{bmatrix}d & -b\\-c & a\end{bmatrix}$$
$$Ax = b \Rightarrow x = A^{-1}b$$
$$(AB)^{-1} = B^{-1}A^{-1}, \quad (A^T)^{-1} = (A^{-1})^T$$
:::

:::thm Inverse of a product
If $A$ and $B$ are invertible $n\times n$ matrices, then $AB$ is invertible and $(AB)^{-1} = B^{-1}A^{-1}$.
:::

:::proof
$(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AIA^{-1} = AA^{-1} = I$, and similarly $(B^{-1}A^{-1})(AB) = I$.
:::

:::thm The 2x2 inverse formula
If $ad - bc \ne 0$, then $\frac{1}{ad - bc}\begin{bmatrix}d & -b\\-c & a\end{bmatrix}$ is the inverse of $\begin{bmatrix}a & b\\c & d\end{bmatrix}$.
:::

:::proof
$\begin{bmatrix}a & b\\c & d\end{bmatrix}\begin{bmatrix}d & -b\\-c & a\end{bmatrix} = \begin{bmatrix}ad - bc & -ab + ba\\cd - dc & -cb + da\end{bmatrix} = (ad - bc)I$. Dividing by $ad - bc$ gives $I$.
:::

:::steps Solve $2x + y = 4$, $5x + 3y = 11$ using the inverse
1. $A = \begin{bmatrix}2 & 1\\5 & 3\end{bmatrix}$, $ad - bc = 6 - 5 = 1$.
2. $A^{-1} = \begin{bmatrix}3 & -1\\-5 & 2\end{bmatrix}$.
3. $x = A^{-1}(4, 11) = (12 - 11, -20 + 22) = (1, 2)$.
:::

:::steps Find the inverse of $\begin{bmatrix}1 & 0 & 2\\0 & 1 & 0\\0 & 0 & 1\end{bmatrix}$ by Gauss-Jordan
1. Start with $[A \mid I]$. Rows 2 and 3 are already identity rows.
2. $R_1 \to R_1 - 2R_3$ turns row 1 into $(1, 0, 0 \mid 1, 0, -2)$.
3. $A^{-1} = \begin{bmatrix}1 & 0 & -2\\0 & 1 & 0\\0 & 0 & 1\end{bmatrix}$. Check: $AA^{-1}$ has row 1 equal to $(1, 0, -2 + 2) = (1, 0, 0)$.
:::

:::mock Exam question
Find the inverse of $A = \begin{bmatrix}4 & 7\\2 & 6\end{bmatrix}$ and use it to solve $Ax = (1, 2)$. For which $t$ is $\begin{bmatrix}t & 2\\3 & 6\end{bmatrix}$ singular?
:::solution
$ad - bc = 24 - 14 = 10$, so $A^{-1} = \frac{1}{10}\begin{bmatrix}6 & -7\\-2 & 4\end{bmatrix}$. Then $x = \frac1{10}(6 - 14,\ -2 + 8) = (-0.8, 0.6)$. Check: $4(-0.8) + 7(0.6) = 1$ and $2(-0.8) + 6(0.6) = 2$. The second matrix is singular when $6t - 6 = 0$, so $t = 1$.
:::
:::

:::ml
The closed-form solution of linear regression is $w = (X^TX)^{-1}X^Ty$, and Gaussian processes use $K^{-1}y$. In code you always call a solver (`np.linalg.solve`) rather than forming the inverse. Normalising flows, a type of generative model, need each layer to be invertible so that samples can be mapped back to the data.
:::

:::cs
Graphics engines invert the camera matrix to turn screen coordinates back into world coordinates, for example to figure out which object a mouse click hit. Because rotation matrices are orthogonal, their inverse is just a transpose, which is cheap.
:::

:::real
The Hill cipher, a classical encryption method, encrypts blocks of letters by multiplying by a matrix and decrypts by multiplying by its inverse (working modulo 26). A key matrix that is singular is useless because messages can't be recovered.
:::

:::quiz
? What is $ad - bc$ for $\begin{bmatrix}3 & 1\\2 & 1\end{bmatrix}$?
= 1
> $3 - 2 = 1$, so the matrix is invertible.

? What is the bottom-right entry of $\begin{bmatrix}3 & 1\\2 & 1\end{bmatrix}^{-1}$?
= 3
> Swap the diagonal: the inverse is $\begin{bmatrix}1 & -1\\-2 & 3\end{bmatrix}$ (divided by 1).

? Is $\begin{bmatrix}2 & 6\\1 & 3\end{bmatrix}$ invertible?
- Yes
+ No
> $ad - bc = 6 - 6 = 0$. Column 2 is three times column 1.

? Simplify $(AB)^{-1}$.
- $A^{-1}B^{-1}$
+ $B^{-1}A^{-1}$
- $AB$
> Undo the last step first.

? What is the top-left entry of $\begin{bmatrix}2 & 0\\0 & 4\end{bmatrix}^{-1}$?
= 1/2|0.5
> A diagonal matrix inverts entry by entry.

? If $A$ is invertible, how many solutions does $Ax = b$ have?
= 1
> Exactly one: $x = A^{-1}b$.
:::

## Lesson: Determinants {#determinants}
@summary: One number that measures how a matrix scales area or volume, whether it flips orientation, and whether it can be undone.

### Why determinants?
A matrix is a transformation, and some transformations stretch space while others squash it. It would be useful to have one number that says "by how much". That number is the **determinant**. It tells you the factor by which a matrix scales areas (in 2-D) or volumes (in 3-D), whether it flips space over like a mirror, and, most importantly, whether the matrix flattens space completely, which is exactly when it has no inverse. Determinants appear in the formula for eigenvalues, in the change-of-variables rule of calculus, and in probability densities used by generative models.

### An everyday scenario
Imagine printing a photo on a sheet of rubber and then stretching it with a machine. Before stretching, a little square on the photo has area 1 square centimetre. After stretching, it becomes a parallelogram. If every little square becomes a parallelogram of area 6, the whole photo has grown by a factor of 6. Because the stretch is linear, every region grows by the same factor, so a single number describes the whole machine. If the machine squashes the photo flat onto a line, every area becomes 0, and the picture can never be recovered.

### The 2x2 determinant
For $A = \begin{bmatrix}a & b\\c & d\end{bmatrix}$, the determinant is
$$\det A = ad - bc$$
The columns $(a, c)$ and $(b, d)$ are where $\hat\imath$ and $\hat\jmath$ land, so the unit square (area 1) becomes the parallelogram spanned by these two columns. Its area is $|ad - bc|$. For example, $\begin{bmatrix}3 & 1\\1 & 2\end{bmatrix}$ has determinant $6 - 1 = 5$: the unit square becomes a parallelogram of area 5, and any shape's area is multiplied by 5. A diagonal matrix $\begin{bmatrix}2 & 0\\0 & 3\end{bmatrix}$ has determinant 6, which makes sense: it stretches width by 2 and height by 3.

### Why the formula gives the area
Here is a picture-proof for the case where everything is positive. The parallelogram with sides $(a, c)$ and $(b, d)$ sits inside a rectangle of width $a + b$ and height $c + d$. The leftover pieces of the rectangle are two triangles of area $\frac12ac$, two triangles of area $\frac12bd$ and two small rectangles of area $bc$. Subtracting: $(a + b)(c + d) - ac - bd - 2bc = ad - bc$. The algebra matches the geometry.

@fig matrix2 preset=scale | The unit square (yellow) becomes a parallelogram. Its area is the absolute value of the determinant.

### The sign: orientation
The determinant can be negative. A negative sign means the transformation flips orientation, like looking in a mirror: $\hat\imath$ and $\hat\jmath$ swap their clockwise order. The reflection $\begin{bmatrix}1 & 0\\0 & -1\end{bmatrix}$ has determinant $-1$: areas are unchanged but space is flipped. Rotations always have determinant $+1$ because they neither stretch nor flip: $\cos^2\theta + \sin^2\theta = 1$.

### Zero determinant: flattening
If $\det A = 0$, the unit square becomes a parallelogram with no area, so the columns lie on a single line and the plane is crushed onto a line or a point. Information is lost and $A$ cannot be inverted. This gives the most-used test in linear algebra: **$A$ is invertible if and only if $\det A \ne 0$**. For example $\begin{bmatrix}2 & 4\\1 & 2\end{bmatrix}$ has determinant $4 - 4 = 0$, and indeed column 2 is twice column 1.

### Determinants of 3x3 matrices
In 3-D the determinant is the signed volume of the box (parallelepiped) spanned by the three columns. To compute it, expand along the first row, using $2\times2$ determinants of what remains after crossing out each entry's row and column, with signs $+, -, +$:
$$\det\begin{bmatrix}a & b & c\\d & e & f\\g & h & i\end{bmatrix} = a(ei - fh) - b(di - fg) + c(dh - eg)$$
For $\begin{bmatrix}2 & 1 & 0\\1 & 3 & 1\\0 & 1 & 2\end{bmatrix}$: $2(6 - 1) - 1(2 - 0) + 0 = 10 - 2 = 8$. This is called **cofactor expansion**, and it works along any row or column with the checkerboard of signs.

### Properties that make life easy
The determinant of a triangular matrix is the product of its diagonal entries, so $\det\begin{bmatrix}2 & 5 & 1\\0 & 3 & 7\\0 & 0 & 4\end{bmatrix} = 24$. This gives a fast method for big matrices: eliminate to triangular form, keeping track of row operations. Adding a multiple of one row to another does not change the determinant; swapping two rows flips its sign; scaling a row by $c$ scales the determinant by $c$. Most important of all, determinants multiply:
$$\det(AB) = \det A\,\det B$$
which makes sense, since doing $B$ scales areas by $\det B$ and then $A$ scales them by $\det A$. It follows that $\det(A^{-1}) = 1/\det A$. Also $\det(A^T) = \det A$, and for an $n\times n$ matrix, $\det(cA) = c^n\det A$, because each of the $n$ directions gets scaled by $c$.

:::def Determinant
A number $\det A$ attached to a square matrix. $|\det A|$ is the factor by which $A$ scales area or volume; its sign says whether orientation is flipped; $\det A = 0$ means $A$ is singular.
:::

:::def Singular matrix
A square matrix with determinant 0. It flattens space into a lower dimension and has no inverse.
:::

:::warn Common mistakes
- Computing $ad + bc$ or $ab - cd$. It is "main diagonal minus off-diagonal": $ad - bc$.
- Forgetting the alternating signs in cofactor expansion.
- Writing $\det(A + B) = \det A + \det B$. This is false in general; only products behave nicely.
- Writing $\det(2A) = 2\det A$ for a $3\times3$ matrix. It is $2^3\det A = 8\det A$.
:::

### Summary
The determinant measures how a matrix scales area or volume: $\det\begin{bmatrix}a & b\\c & d\end{bmatrix} = ad - bc$. A negative determinant means a flip; zero means space is flattened and the matrix has no inverse. Triangular matrices have determinant equal to the product of the diagonal, determinants multiply, and $\det(A^{-1}) = 1/\det A$.

@viz matrix2 preset=scale | The yellow square shows the image of the unit square. Its area is the absolute value of det A, shown in the panel.

:::explore
**What to try**
1. Start with **scale**. Check that the panel's determinant equals the product of the two stretch factors.
2. Choose **rotate**. The determinant is 1: the square turns but keeps its area.
3. Choose **reflect**. The determinant is $-1$: same area, flipped orientation.
4. Drag $\hat\jmath$ onto the line through $\hat\imath$, or choose **singular**. The square collapses and the determinant becomes 0.

**What to notice:** the size of the yellow region is always $|\det A|$, and the determinant changes sign at the exact moment the two columns pass through each other, matching the orientation discussion in the article.
:::

:::formulas
$$\det\begin{bmatrix}a & b\\c & d\end{bmatrix} = ad - bc$$
$$\det(AB) = \det A\det B, \quad \det(A^{-1}) = \frac{1}{\det A}, \quad \det(A^T) = \det A$$
$$\det(cA) = c^n\det A \ (n\times n), \qquad \det(\text{triangular}) = \prod_i A_{ii}$$
$$A \text{ invertible} \iff \det A \ne 0$$
:::

:::thm Determinant of an inverse
If $A$ is invertible, then $\det(A^{-1}) = 1/\det A$.
:::

:::proof
$AA^{-1} = I$, so $\det A\det(A^{-1}) = \det I = 1$ by the product rule. Since the product is 1, $\det A \ne 0$ and $\det(A^{-1}) = 1/\det A$.
:::

:::steps Find the area of the parallelogram with sides $(3, 1)$ and $(1, 2)$
1. Put the sides in the columns: $A = \begin{bmatrix}3 & 1\\1 & 2\end{bmatrix}$.
2. $\det A = 3\cdot2 - 1\cdot1 = 5$.
3. Area $= |5| = 5$.
:::

:::steps Compute $\det\begin{bmatrix}1 & 2 & 3\\0 & 4 & 5\\1 & 0 & 6\end{bmatrix}$
1. Expand along row 1: $1(4\cdot6 - 5\cdot0) - 2(0\cdot6 - 5\cdot1) + 3(0\cdot0 - 4\cdot1)$.
2. $= 24 - 2(-5) + 3(-4) = 24 + 10 - 12$.
3. $= 22$.
:::

:::mock Exam question
$A$ and $B$ are $3\times3$ with $\det A = 3$ and $\det B = -2$. Find $\det(AB)$, $\det(2A)$, $\det(A^{-1})$ and $\det(A^TB)$. Is $AB$ invertible?
:::solution
$\det(AB) = 3(-2) = -6$. $\det(2A) = 2^3\cdot3 = 24$. $\det(A^{-1}) = 1/3$. $\det(A^TB) = \det A\det B = -6$. Since $\det(AB) = -6 \ne 0$, $AB$ is invertible.
:::
:::

:::ml
Normalising flows compute probability densities with the change-of-variables formula, which divides by $|\det J|$, the determinant of a Jacobian matrix. The determinant of a covariance matrix appears in the Gaussian density $\frac{1}{\sqrt{(2\pi)^n\det\Sigma}}e^{-\frac12 x^T\Sigma^{-1}x}$, and $\det\Sigma$ measures how spread out the data is.
:::

:::cs
Computing a determinant by cofactor expansion takes $n!$ steps, hopeless for $n = 20$. Libraries use LU factorisation instead: $\det A = \pm\prod U_{ii}$, which costs $O(n^3)$. Computational geometry uses the sign of a $2\times2$ determinant to test whether three points turn left or right.
:::

:::real
When you zoom a map by a factor of 2 in both directions, every region's area grows by $\det\begin{bmatrix}2 & 0\\0 & 2\end{bmatrix} = 4$. Surveyors compute land areas from corner coordinates with the shoelace formula, which is a sum of $2\times2$ determinants.
:::

:::quiz
? Compute $\det\begin{bmatrix}4 & 2\\1 & 3\end{bmatrix}$.
= 10
> $4\cdot3 - 2\cdot1 = 10$.

? What is the determinant of an upper triangular matrix with diagonal 2, 3, 4?
= 24
> The product of the diagonal entries.

? If $\det A = 0$, then $A$...
+ has no inverse
- is the identity
- is orthogonal
> It flattens space, so it cannot be undone.

? For the $2\times2$ identity scaled by 3, what is $\det(3I)$?
= 9
> $3^2\cdot1 = 9$.

? Swapping two rows of a matrix with determinant 5 gives determinant...
= -5
> A row swap flips the sign.

? A transformation has determinant $-2$. A region of area 3 is mapped to a region of what area?
= 6
> Area scales by $|\det A| = 2$. The negative sign only means orientation flips.
:::

## Lesson: The four fundamental subspaces and rank {#rank}
@summary: Column space, null space, row space and left null space; rank as the true dimension of a matrix; the rank-nullity theorem.

### Why rank?
A $3\times3$ matrix looks like it moves 3-D space to 3-D space. But it might secretly squash everything onto a plane or a line. The **rank** of a matrix is the true number of dimensions in its output, and it answers the big practical questions about $Ax = b$: is there a solution for every $b$? If there is a solution, is it the only one? Rank also tells you how much information a dataset really contains, which is the starting point for compression, PCA and recommender systems.

### An everyday scenario
Imagine a recipe app that tracks three numbers per dish: grams of flour, grams of sugar, and total grams of flour plus sugar. It seems to store three pieces of information, but the third column is always the sum of the first two, so really there are only two independent pieces. The table of dishes has rank 2, not 3. Rank counts the genuinely independent directions, ignoring the redundant ones.

### The column space and rank
The **column space** of $A$ is the span of its columns: every possible output $Ax$. The **rank** is its dimension, which equals the number of linearly independent columns and also the number of pivots elimination finds. For
$$A = \begin{bmatrix}1 & 2 & 1\\2 & 4 & 3\\3 & 6 & 4\end{bmatrix}$$
column 2 is twice column 1, so it adds nothing new, while column 3 is not a multiple of column 1. Elimination confirms it: $R_2 - 2R_1 = (0, 0, 1)$, $R_3 - 3R_1 = (0, 0, 1)$, and then $R_3 - R_2 = (0, 0, 0)$. Two pivots, so rank 2: the outputs fill a plane inside 3-D space, not all of it. $Ax = b$ is solvable only when $b$ lies in that plane.

### The null space
The **null space** of $A$ is the set of all inputs that $A$ sends to zero: all $x$ with $Ax = 0$. It is always a subspace (it contains $0$, and sums and multiples of solutions are solutions). For the matrix above, the reduced equations are $x_1 + 2x_2 + x_3 = 0$ and $x_3 = 0$. So $x_3 = 0$, $x_1 = -2x_2$, and $x_2$ is free. Every null-space vector is a multiple of $(-2, 1, 0)$. Check: $A(-2, 1, 0) = (-2 + 2,\ -4 + 4,\ -6 + 6) = 0$. The null space is a line, dimension 1. Its dimension is called the **nullity**.

The null space measures how much information $A$ destroys. If $Ax_0 = b$, then $A(x_0 + n) = b$ for every $n$ in the null space too. So when the null space is just $\{0\}$, solutions are unique; when it is bigger, solutions come in whole families.

### Rank plus nullity
In the example, rank 2 plus nullity 1 equals 3, the number of columns. This always happens. Each column either gets a pivot (contributing to the rank) or is free (contributing a null-space direction):
$$\operatorname{rank}(A) + \operatorname{nullity}(A) = n \quad (\text{number of columns})$$
It is a conservation law: input dimensions are either kept (show up in the output) or crushed (sent to zero). A $3\times5$ matrix with rank 3 must have a 2-dimensional null space.

### Row space and left null space
The **row space** is the span of the rows, a subspace of the input space $\mathbb{R}^n$. Surprisingly, its dimension also equals the rank: row rank equals column rank. The **left null space** is the null space of $A^T$, a subspace of the output space $\mathbb{R}^m$, of dimension $m - r$. Together these are the **four fundamental subspaces**. In the input space, the row space and null space are perpendicular: if $Ax = 0$, every row dotted with $x$ is 0, so $x$ is perpendicular to every row. In the output space, the column space and left null space are perpendicular in the same way.

@fig span | Two vectors span a plane only when they are independent. Rank counts how many independent directions the columns really have.

### Reading off solvability
For an $m\times n$ matrix of rank $r$: $Ax = b$ has a solution for every $b$ exactly when $r = m$ (the columns fill the output space). Solutions are unique, when they exist, exactly when $r = n$ (no free variables, null space is $\{0\}$). A square matrix with $r = n$ is invertible. A matrix with $r = \min(m, n)$ is called **full rank**.

:::def Rank
The dimension of the column space of $A$: the number of independent columns, equal to the number of pivots and to the dimension of the row space.
:::

:::def Null space
All vectors $x$ with $Ax = 0$. Its dimension is the nullity.
:::

:::def Column space
The span of the columns of $A$; the set of all outputs $Ax$.
:::

:::warn Common mistakes
- Counting nonzero columns instead of independent columns. Redundant columns don't add to the rank.
- Thinking the null space is empty when $Ax = 0$ has only the trivial solution. It contains the zero vector, so it is $\{0\}$ with dimension 0.
- Using the number of rows in rank-nullity. It's the number of **columns**.
- Mixing up which space each subspace lives in. Column space is in $\mathbb{R}^m$; null space is in $\mathbb{R}^n$.
:::

### Summary
The rank of $A$ is the number of independent columns, the number of pivots, and the dimension of both the column space and the row space. The null space holds the inputs sent to zero, and rank plus nullity equals the number of columns. Full row rank means every $b$ is reachable; full column rank means solutions are unique. The four fundamental subspaces pair up as perpendicular partners.

@viz span | Two vectors in the plane. Make them independent (rank 2) or line them up (rank 1) and watch the span change.

:::explore
**What to try**
1. Set $v$ and $w$ pointing in different directions. Their span is the whole plane: the matrix $[v\ w]$ has rank 2.
2. Make $w$ a multiple of $v$. The span collapses to a line: rank 1.
3. In the rank-1 case, find weights $(a, b)$ other than $(0, 0)$ with $av + bw = 0$, for example $w = 2v$ gives $(2, -1)$. That is a null-space vector.

**What to notice:** losing a dimension of span (rank) is exactly gaining a dimension of null space, the rank-nullity balance $r + \text{nullity} = 2$.
:::

:::formulas
$$\operatorname{rank}(A) = \dim C(A) = \dim C(A^T) = \#\text{pivots}$$
$$\operatorname{rank}(A) + \dim N(A) = n$$
$$\dim N(A^T) = m - r$$
$$N(A) \perp C(A^T), \qquad N(A^T) \perp C(A)$$
:::

:::thm Rank-nullity theorem
For any $m\times n$ matrix $A$, $\operatorname{rank}(A) + \dim N(A) = n$.
:::

:::proof
After elimination, each of the $n$ columns either contains a pivot or corresponds to a free variable. The pivot columns number $r = \operatorname{rank}(A)$. Each free variable gives one independent null-space vector (set it to 1, the other free variables to 0, and solve for the pivots), so the nullity is $n - r$.
:::

:::steps Find the rank and a null-space basis for $A = \begin{bmatrix}1 & 2 & 3\\2 & 4 & 6\end{bmatrix}$
1. $R_2 - 2R_1 = (0, 0, 0)$. One pivot, so rank 1.
2. Nullity $= 3 - 1 = 2$. The equation is $x_1 + 2x_2 + 3x_3 = 0$ with $x_2, x_3$ free.
3. $x_2 = 1, x_3 = 0$ gives $(-2, 1, 0)$; $x_2 = 0, x_3 = 1$ gives $(-3, 0, 1)$. These form a basis.
:::

:::steps A $4\times6$ matrix has rank 4. Describe its solution sets
1. Nullity $= 6 - 4 = 2$.
2. Rank equals the number of rows (4), so the column space is all of $\mathbb{R}^4$: $Ax = b$ is solvable for every $b$.
3. Each solution set is a 2-dimensional plane of solutions $x_0 + N(A)$.
:::

:::mock Exam question
Let $A = \begin{bmatrix}1 & 1 & 2\\1 & 2 & 3\\2 & 3 & 5\end{bmatrix}$. Find the rank, a basis for the null space, and decide whether $Ax = (1, 0, 0)$ has a solution.
:::solution
Column 3 = column 1 + column 2. Elimination: $R_2 - R_1 = (0, 1, 1)$, $R_3 - 2R_1 = (0, 1, 1)$, $R_3 - R_2 = 0$. Rank 2, nullity 1. Null space: $x_3 = t$, $x_2 = -t$, $x_1 = -x_2 - 2x_3 = -t$: basis $(-1, -1, 1)$. For $b = (1, 0, 0)$ the same steps on the right side give $1, -1, -2$ then $-2 - (-1) = -1$, so the last row reads $0 = -1$: no solution. Indeed every column has third entry equal to the sum of the first two, but $b$ does not ($0 \ne 1 + 0$).
:::
:::

:::ml
Low-rank structure is everywhere in ML. A ratings matrix of users by movies is approximately low rank (a few hidden tastes explain most ratings), which is the idea behind matrix-factorisation recommenders. LoRA fine-tunes large language models by adding a low-rank update $BA$ to each weight matrix, training far fewer parameters. A feature matrix with rank less than the number of features means some features are redundant (multicollinearity), and $X^TX$ is not invertible.
:::

:::cs
Error-correcting codes are built from null spaces: valid codewords $c$ satisfy $Hc = 0$ for a parity-check matrix $H$, and a nonzero $Hc$ flags an error. Rank computations over finite fields are used in coding theory and cryptography.
:::

:::real
A survey asks height in centimetres and height in inches. The two columns are proportional, so they contribute rank 1, not 2: the survey contains less information than it seems.
:::

:::quiz
? What is the rank of $\begin{bmatrix}1 & 2\\2 & 4\end{bmatrix}$?
= 1
> Row 2 is twice row 1, so there is one pivot.

? A $4\times6$ matrix has rank 4. What is the dimension of its null space?
= 2
> $6 - 4 = 2$.

? What is the rank of the $3\times3$ identity matrix?
= 3
> Three independent columns.

? The null space of $A$ is the set of $x$ with...
+ $Ax = 0$
- $A = 0$
- $x = 0$ only
> It's every input sent to zero.

? A $5\times3$ matrix has rank 3. Are solutions of $Ax = b$ unique when they exist?
+ Yes
- No
> Rank equals the number of columns, so there are no free variables.

? A $3\times3$ matrix has a null space of dimension 1. What is its rank?
= 2
> $3 - 1 = 2$.
:::

## Lesson: Change of basis and similar matrices {#change-of-basis}
@summary: The same vector has different coordinates in different bases. Converting between them, and seeing a transformation from a better point of view.

### Why change basis?
So far every vector has been described with the standard basis $\hat\imath$ and $\hat\jmath$: "go 3 right and 1 up". But this choice is arbitrary. Sometimes a different set of directions makes a problem dramatically simpler. A matrix that looks complicated in the standard basis might just stretch along two special directions, and in a basis built from those directions it becomes a simple diagonal matrix. Changing basis is the idea behind diagonalisation, PCA, the Fourier transform and the SVD, so it is worth understanding on its own.

### An everyday scenario
Imagine a city whose streets run diagonally, at $45°$ to north. A tourist with a compass gives directions as "3 blocks east and 1 block north". A local would say "2 blocks along Main Street and 1 block back along Oak Avenue", because the streets are her natural directions. Both describe the same destination; they just use different measuring sticks. A **basis** is a choice of measuring sticks, and the **coordinates** of a point are the counts of each stick needed to reach it.

### Coordinates in a basis
Recall that a basis of $\mathbb{R}^2$ is any two independent vectors $b_1, b_2$. Every vector $v$ can be written in exactly one way as $v = c_1b_1 + c_2b_2$, and the numbers $(c_1, c_2)$ are the **coordinates of $v$ in the basis $\mathcal{B}$**, written $[v]_\mathcal{B}$. Take $b_1 = (1, 1)$ and $b_2 = (-1, 1)$, and $v = (3, 1)$. We need $c_1(1, 1) + c_2(-1, 1) = (3, 1)$, which is $c_1 - c_2 = 3$ and $c_1 + c_2 = 1$. Adding gives $2c_1 = 4$, so $c_1 = 2$ and $c_2 = -1$. So $[v]_\mathcal{B} = (2, -1)$: two of $b_1$ and minus one of $b_2$. Check: $2(1, 1) - (-1, 1) = (3, 1)$.

### The change-of-basis matrix
Put the basis vectors in the columns of a matrix $B = [\,b_1\ b_2\,]$. The equation $v = c_1b_1 + c_2b_2$ is exactly $v = B[v]_\mathcal{B}$ by the column view. So $B$ converts new coordinates into standard coordinates, and its inverse goes the other way:
$$v = B\,[v]_\mathcal{B}, \qquad [v]_\mathcal{B} = B^{-1}v$$
In the example, $B = \begin{bmatrix}1 & -1\\1 & 1\end{bmatrix}$ with determinant 2, so $B^{-1} = \frac12\begin{bmatrix}1 & 1\\-1 & 1\end{bmatrix}$ and $B^{-1}(3, 1) = \frac12(4, -2) = (2, -1)$, as before. The basis must be independent for $B^{-1}$ to exist, which is exactly why a basis needs independent vectors.

@fig g03-basis b1x=1 b1y=1 b2x=-1 b2y=1 vx=3 vy=1 | The same vector v measured with the standard grid and with the grid built from b₁ and b₂.

### Orthonormal bases make it easy
If the basis vectors are orthonormal (unit length, perpendicular), then $B$ is orthogonal and $B^{-1} = B^T$. Each coordinate is just a dot product: $c_i = b_i\cdot v$. With $q_1 = \frac1{\sqrt2}(1, 1)$ and $q_2 = \frac1{\sqrt2}(-1, 1)$, the vector $(3, 1)$ has coordinates $q_1\cdot v = 4/\sqrt2 = 2\sqrt2$ and $q_2\cdot v = -2/\sqrt2 = -\sqrt2$. No system to solve, which is why orthonormal bases are so popular.

### Transformations in a new basis
Now the powerful part. Suppose a matrix $A$ describes a transformation in standard coordinates. How does the same transformation look to someone using basis $\mathcal{B}$? To apply it to a vector given in $\mathcal{B}$-coordinates, convert to standard ($B$), apply $A$, and convert back ($B^{-1}$):
$$A_\mathcal{B} = B^{-1}AB$$
Matrices related this way are called **similar**: they are the same transformation seen in different bases. Take $A = \begin{bmatrix}2 & 1\\1 & 2\end{bmatrix}$ and the basis above. $A(1, 1) = (3, 3) = 3b_1$ and $A(-1, 1) = (-1, 1) = 1b_2$. So in this basis the transformation just triples the $b_1$-coordinate and leaves the $b_2$-coordinate alone: $A_\mathcal{B} = \begin{bmatrix}3 & 0\\0 & 1\end{bmatrix}$. A matrix full of numbers became a simple stretch, simply by looking along the right directions. Those special directions are eigenvectors, the subject of a later unit.

### Why it works
Coordinates are not the vector; they are a description of it relative to chosen sticks. The arrow itself doesn't change when you change sticks. $B$ is a dictionary that translates between two languages, and $B^{-1}AB$ means "translate into standard, act, translate back". Similar matrices share everything that doesn't depend on the description: determinant, trace, rank and eigenvalues.

:::def Coordinates in a basis
For a basis $\mathcal{B} = (b_1, \dots, b_n)$, the unique numbers $c_i$ with $v = \sum c_ib_i$, written $[v]_\mathcal{B}$.
:::

:::def Similar matrices
$A$ and $C$ are similar if $C = B^{-1}AB$ for some invertible $B$. They represent the same transformation in different bases.
:::

:::warn Common mistakes
- Using $B$ when you need $B^{-1}$. $B$ turns new coordinates into standard ones; $B^{-1}$ turns standard into new.
- Writing $BAB^{-1}$ instead of $B^{-1}AB$ for the new-basis matrix. Read right to left: convert in, act, convert out.
- Taking dot products for coordinates when the basis is not orthonormal. That shortcut only works for orthonormal bases.
- Thinking a change of basis moves the vector. It only changes the numbers used to describe it.
:::

### Summary
The coordinates of $v$ in a basis $\mathcal{B}$ are the weights that build $v$ from the basis vectors. With the basis in the columns of $B$, $v = B[v]_\mathcal{B}$ and $[v]_\mathcal{B} = B^{-1}v$; for an orthonormal basis, coordinates are dot products. A transformation $A$ looks like $B^{-1}AB$ in the new basis, and a good choice of basis can turn it into a diagonal matrix.

@viz g03-basis | Drag b₁, b₂ and v. The panel shows v's standard coordinates and its coordinates in the basis (b₁, b₂).

:::explore
**What to try**
1. Leave the default basis and read the two coordinate pairs for $v$ in the panel. Count steps along the tilted grid to confirm them.
2. Drag $b_1$ to $(1, 1)$, $b_2$ to $(-1, 1)$ and $v$ to $(3, 1)$. The panel should show $(2, -1)$, as in the article.
3. Make $b_2$ almost parallel to $b_1$. The tilted grid becomes long and thin and the coordinates blow up.
4. Make $b_2$ exactly parallel to $b_1$. The basis fails and no coordinates exist.

**What to notice:** the purple arrow $v$ never changes when you move the basis; only its coordinates do. The coordinates are computed with $B^{-1}$, which is why the basis must be independent.
:::

:::formulas
$$v = B[v]_\mathcal{B}, \qquad [v]_\mathcal{B} = B^{-1}v$$
$$\text{Orthonormal basis: } [v]_\mathcal{B} = Q^Tv, \ \ c_i = q_i\cdot v$$
$$A_\mathcal{B} = B^{-1}AB$$
$$\det(B^{-1}AB) = \det A, \qquad \operatorname{tr}(B^{-1}AB) = \operatorname{tr}A$$
:::

:::thm Similar matrices have the same determinant
If $C = B^{-1}AB$, then $\det C = \det A$.
:::

:::proof
$\det C = \det(B^{-1})\det A\det B = \frac{1}{\det B}\det A\det B = \det A$.
:::

:::steps Find the coordinates of $v = (5, 3)$ in the basis $b_1 = (2, 1)$, $b_2 = (1, 1)$
1. $B = \begin{bmatrix}2 & 1\\1 & 1\end{bmatrix}$, $\det B = 1$, $B^{-1} = \begin{bmatrix}1 & -1\\-1 & 2\end{bmatrix}$.
2. $[v]_\mathcal{B} = B^{-1}(5, 3) = (5 - 3, -5 + 6) = (2, 1)$.
3. Check: $2(2, 1) + 1(1, 1) = (5, 3)$.
:::

:::steps Compute $B^{-1}AB$ for $A = \begin{bmatrix}2 & 1\\1 & 2\end{bmatrix}$, $B = \begin{bmatrix}1 & -1\\1 & 1\end{bmatrix}$
1. $AB = [\,A(1, 1)\ \ A(-1, 1)\,] = \begin{bmatrix}3 & -1\\3 & 1\end{bmatrix}$.
2. $B^{-1} = \frac12\begin{bmatrix}1 & 1\\-1 & 1\end{bmatrix}$.
3. $B^{-1}AB = \frac12\begin{bmatrix}6 & 0\\0 & 2\end{bmatrix} = \begin{bmatrix}3 & 0\\0 & 1\end{bmatrix}$. Trace $4$ and determinant $3$ match $A$.
:::

:::mock Exam question
In the orthonormal basis $q_1 = (0.6, 0.8)$, $q_2 = (-0.8, 0.6)$, find the coordinates of $v = (2, 1)$ and then rebuild $v$ from them.
:::solution
$c_1 = q_1\cdot v = 1.2 + 0.8 = 2$ and $c_2 = q_2\cdot v = -1.6 + 0.6 = -1$. Rebuild: $2(0.6, 0.8) - 1(-0.8, 0.6) = (1.2 + 0.8, 1.6 - 0.6) = (2, 1)$.
:::
:::

:::ml
PCA rotates data into the basis of principal directions, where features are uncorrelated. Word embeddings and neural-network hidden layers are often analysed by changing basis to directions that mean something ("gender direction", "sentiment direction"). Whitening transforms data into a basis where its covariance is the identity.
:::

:::cs
The Fourier transform and JPEG compression are changes of basis: an image is rewritten in a basis of waves (cosines), where most coordinates are tiny and can be dropped. Robotics converts between the world frame, the robot frame and the camera frame with change-of-basis matrices.
:::

:::real
Converting a colour from RGB to YCbCr (brightness plus two colour differences) is a change of basis in colour space, used by every video format so that brightness can be stored at higher detail than colour.
:::

:::quiz
? In the basis $b_1 = (1, 0)$, $b_2 = (1, 1)$, the vector $(3, 2)$ has which first coordinate?
= 1
> $c_1(1, 0) + c_2(1, 1) = (3, 2)$ gives $c_2 = 2$ and $c_1 = 1$.

? To convert standard coordinates into $\mathcal{B}$-coordinates, multiply by...
- $B$
+ $B^{-1}$
- $B^T$ always
> $v = B[v]_\mathcal{B}$, so $[v]_\mathcal{B} = B^{-1}v$. ($B^T$ works only for orthonormal bases.)

? $A$ has determinant 7. What is $\det(B^{-1}AB)$?
= 7
> Similar matrices share their determinant.

? In an orthonormal basis $q_1 = (0, 1)$, $q_2 = (1, 0)$, what is the first coordinate of $(4, 9)$?
= 9
> $q_1\cdot v = 9$.

? The matrix of a transformation in basis $\mathcal{B}$ is...
+ $B^{-1}AB$
- $BAB^{-1}$
- $A^{-1}BA$
> Convert in with $B$, act with $A$, convert out with $B^{-1}$.

? A transformation sends $b_1 \to 4b_1$ and $b_2 \to -b_2$. What is the top-left entry of its matrix in basis $\mathcal{B}$?
= 4
> In $\mathcal{B}$ it is $\operatorname{diag}(4, -1)$.
:::

# Unit: Orthogonality and least squares

## Lesson: Orthogonal projections {#projections}
@summary: Dropping a perpendicular: the closest point on a line or subspace, the projection formula, and projection matrices.

### Why projections?
Many problems in data science boil down to one question: "what is the closest point I can actually reach?" You have a target vector, but you're only allowed to use vectors from some line or plane, and you want the best approximation. The answer is always to drop a perpendicular, and the foot of that perpendicular is called the **orthogonal projection**. Projections are the geometry behind least-squares regression, Gram-Schmidt, PCA, and attention in transformers. This lesson builds them from the dot product you already know.

### An everyday scenario
Imagine the sun directly overhead at noon, and a pole leaning in a field. Its shadow on the flat ground is the projection of the pole onto the ground: each point of the pole drops straight down. The shadow is the part of the pole that lies "along" the ground, and the vertical distance from the tip of the pole down to the tip of the shadow is the part that the ground can't capture. Notice that the drop is perpendicular to the ground; that's what makes the shadow tip the closest point on the ground to the pole's tip.

### Projecting onto a line
Let $u$ be a nonzero vector pointing along a line through the origin, and let $v$ be any vector. We want the point $p$ on the line closest to $v$. Since $p$ is on the line, $p = c\,u$ for some number $c$. The error $e = v - p$ should be perpendicular to the line, so $u\cdot(v - cu) = 0$. Expanding, $u\cdot v - c\,(u\cdot u) = 0$, which gives
$$c = \frac{u\cdot v}{u\cdot u}, \qquad p = \frac{u\cdot v}{u\cdot u}\,u$$
Try $u = (2, 1)$ and $v = (3, 4)$. Then $u\cdot v = 6 + 4 = 10$ and $u\cdot u = 4 + 1 = 5$, so $c = 2$ and $p = (4, 2)$. The error is $e = (3, 4) - (4, 2) = (-1, 2)$. Check perpendicularity: $e\cdot u = -2 + 2 = 0$. The distance from $v$ to the line is $\|e\| = \sqrt{1 + 4} = \sqrt5$.

If $u$ is a unit vector, $u\cdot u = 1$ and the formula simplifies to $p = (u\cdot v)\,u$. The number $u\cdot v$ is then the **scalar projection**: the signed length of the shadow.

@fig dot | The green bar is the projection of one vector onto the other. The dashed drop line is perpendicular.

### Why perpendicular means closest
Take any other point $q = c'u$ on the line. The vector from $q$ to $v$ is $(v - p) + (p - q)$, a sum of the error $e$ and a vector along the line. These two pieces are perpendicular, so by Pythagoras $\|v - q\|^2 = \|e\|^2 + \|p - q\|^2$. This is smallest when $p - q = 0$, that is when $q = p$. Perpendicular dropping always gives the closest point, and this argument works in any number of dimensions.

### The projection matrix
Projection is a linear transformation, so it has a matrix. Writing $p = \frac{u(u^Tv)}{u^Tu} = \frac{uu^T}{u^Tu}v$, the matrix is
$$P = \frac{uu^T}{u^Tu}$$
For $u = (2, 1)$: $uu^T = \begin{bmatrix}4 & 2\\2 & 1\end{bmatrix}$, so $P = \frac15\begin{bmatrix}4 & 2\\2 & 1\end{bmatrix}$. Check: $P(3, 4) = \frac15(12 + 8, 6 + 4) = (4, 2)$. Projection matrices have two signature properties. They are symmetric, $P^T = P$, and they are **idempotent**, $P^2 = P$: projecting something that is already on the line leaves it there. Their rank equals the dimension of the space you project onto, so this $P$ has rank 1 and determinant 0, which makes sense: it flattens the plane onto a line.

### Projecting onto a subspace
To project onto a plane or any subspace, put a basis of the subspace in the columns of a matrix $A$. The projection is $p = A\hat x$ for some weights $\hat x$, and the error must be perpendicular to every column: $A^T(v - A\hat x) = 0$. Rearranging gives the **normal equations** $A^TA\hat x = A^Tv$, so
$$\hat x = (A^TA)^{-1}A^Tv, \qquad P = A(A^TA)^{-1}A^T$$
When the columns of $A$ are orthonormal ($A = Q$), $Q^TQ = I$ and everything simplifies to $P = QQ^T$: just add up the projections onto each basis vector. For the $xy$-plane in 3-D, $Q$ has columns $(1, 0, 0)$ and $(0, 1, 0)$, and projecting $(1, 2, 3)$ gives $(1, 2, 0)$.

:::def Orthogonal projection
The point $p$ in a subspace closest to $v$, characterised by the error $v - p$ being perpendicular to the subspace.
:::

:::def Projection matrix
A matrix $P$ with $P^2 = P$ and $P^T = P$. Onto the line through $u$, $P = uu^T/(u^Tu)$; onto the column space of $A$, $P = A(A^TA)^{-1}A^T$.
:::

:::warn Common mistakes
- Forgetting to divide by $u\cdot u$ when $u$ is not a unit vector.
- Projecting $u$ onto $v$ when you meant $v$ onto $u$. The vector you project onto goes in the denominator and gives the direction.
- Thinking the error is $p - v$ and getting signs mixed. Either way it is perpendicular, but $v = p + e$ uses $e = v - p$.
- Using $P = QQ^T$ when the columns are not orthonormal.
:::

### Splitting a vector into two pieces
Projection always splits $v$ into two perpendicular pieces: $v = p + e$, with $p$ along the line and $e$ across it. Because the pieces are perpendicular, Pythagoras applies to their lengths: $\|v\|^2 = \|p\|^2 + \|e\|^2$. In the example, $\|(3, 4)\|^2 = 25$, $\|(4, 2)\|^2 = 20$ and $\|(-1, 2)\|^2 = 5$, and indeed $25 = 20 + 5$. This tells you that a projection can never be longer than the original vector, and it gives a measure of how well the line explains $v$: the fraction $\|p\|^2/\|v\|^2 = 20/25 = 0.8$ of the squared length is captured by the line. The same split, applied to data, becomes the "explained variance" of PCA and the $R^2$ of regression later in the course.

### Summary
The orthogonal projection of $v$ onto the line through $u$ is $p = \frac{u\cdot v}{u\cdot u}u$; the error $v - p$ is perpendicular to $u$, and $p$ is the closest point on the line. Projection matrices are symmetric and satisfy $P^2 = P$. Onto a subspace with basis in the columns of $A$, solve $A^TA\hat x = A^Tv$; with orthonormal columns, $P = QQ^T$.

@viz dot | The green bar is the projection of v onto u. The dashed line from v to the bar is perpendicular to u.

:::explore
**What to try**
1. Set $u = (2, 1)$ and $v = (3, 4)$. The projection should be $(4, 2)$, twice $u$.
2. Rotate $v$ until it is perpendicular to $u$. The projection shrinks to zero.
3. Point $v$ more than $90°$ away from $u$. The projection now points backwards: $c$ is negative.
4. Make $u$ longer without changing its direction. The projection stays exactly the same.

**What to notice:** the projection depends only on the direction of $u$, because dividing by $u\cdot u$ cancels its length. The drop line always meets the line through $u$ at a right angle, which is what makes $p$ the closest point.
:::

:::formulas
$$p = \frac{u\cdot v}{u\cdot u}u, \qquad e = v - p \perp u$$
$$P = \frac{uu^T}{u^Tu}, \qquad P^2 = P, \qquad P^T = P$$
$$A^TA\hat x = A^Tv, \qquad P = A(A^TA)^{-1}A^T$$
$$P = QQ^T \ \ (\text{orthonormal columns})$$
:::

:::thm The projection is the closest point
If $p$ is the orthogonal projection of $v$ onto a subspace $S$, then $\|v - p\| \le \|v - q\|$ for every $q$ in $S$, with equality only when $q = p$.
:::

:::proof
$v - q = (v - p) + (p - q)$. The first term is perpendicular to $S$ and the second lies in $S$, so they are perpendicular and $\|v - q\|^2 = \|v - p\|^2 + \|p - q\|^2 \ge \|v - p\|^2$.
:::

:::thm Projection matrices are idempotent
For $P = A(A^TA)^{-1}A^T$, $P^2 = P$.
:::

:::proof
$P^2 = A(A^TA)^{-1}(A^TA)(A^TA)^{-1}A^T = A(A^TA)^{-1}A^T = P$.
:::

:::steps Project $v = (1, 2, 3)$ onto the line through $u = (1, 1, 1)$
1. $u\cdot v = 6$, $u\cdot u = 3$, so $c = 2$.
2. $p = 2(1, 1, 1) = (2, 2, 2)$.
3. Error $e = (-1, 0, 1)$. Check $e\cdot u = -1 + 0 + 1 = 0$. Distance to the line $= \sqrt2$.
:::

:::steps Find the projection matrix onto the line through $u = (1, 2)$ and apply it to $(5, 0)$
1. $u^Tu = 5$ and $uu^T = \begin{bmatrix}1 & 2\\2 & 4\end{bmatrix}$, so $P = \frac15\begin{bmatrix}1 & 2\\2 & 4\end{bmatrix}$.
2. $P(5, 0) = \frac15(5, 10) = (1, 2)$.
3. Check with the formula: $u\cdot v/u\cdot u = 5/5 = 1$, so $p = u = (1, 2)$. Trace of $P$ is $1$, its rank.
:::

:::mock Exam question
Find the distance from the point $v = (4, 0, 2)$ to the line through the origin with direction $u = (1, 2, 2)$, and give the closest point on the line.
:::solution
$u\cdot v = 4 + 0 + 4 = 8$, $u\cdot u = 9$, so $p = \frac89(1, 2, 2) = (\frac89, \frac{16}9, \frac{16}9)$. Error $e = v - p = (\frac{28}9, -\frac{16}9, \frac29)$. Check $e\cdot u = \frac{28 - 32 + 4}{9} = 0$. Distance $\|e\| = \frac19\sqrt{784 + 256 + 4} = \frac{\sqrt{1044}}{9} = \frac{2\sqrt{29}}{3} \approx 3.59$.
:::
:::

:::ml
Linear regression's predictions $\hat y = X\hat w$ are the projection of the target vector $y$ onto the column space of the feature matrix; $P = X(X^TX)^{-1}X^T$ is called the "hat matrix". PCA projects data onto the top principal directions. Attention in transformers computes dot products between queries and keys, which are (unnormalised) scalar projections.
:::

:::cs
3-D graphics projects the world onto the 2-D screen. Collision detection projects shapes onto axes (the separating axis theorem): if the shadows on some axis don't overlap, the shapes don't touch.
:::

:::real
A ramp problem in physics splits gravity into the part along the ramp (the projection, which makes the box slide) and the part into the ramp (balanced by the surface). The shadow of a building at noon is a projection onto the ground.
:::

:::quiz
? What is the first entry of the projection of $(4, 3)$ onto $(1, 0)$?
= 4
> $p = \frac{4}{1}(1, 0) = (4, 0)$.

? Projecting $v = (3, 4)$ onto $u = (2, 1)$ gives $p = cu$. What is $c$?
= 2
> $u\cdot v/u\cdot u = 10/5 = 2$.

? A projection matrix satisfies...
+ $P^2 = P$
- $P^2 = I$
- $P^2 = 0$
> Projecting twice is the same as projecting once.

? The error $v - p$ of an orthogonal projection onto a line through $u$ is...
+ perpendicular to $u$
- parallel to $u$
- always zero
> That is what "orthogonal" projection means.

? What is the rank of a projection matrix onto a line in $\mathbb{R}^3$?
= 1
> Every output lies on the line.

? What is the distance from $(0, 5)$ to the $x$-axis, computed as $\|v - p\|$?
= 5
> $p = (0, 0)$ and $\|(0, 5)\| = 5$.
:::

## Lesson: Orthonormal bases and Gram–Schmidt {#gram-schmidt}
@summary: Why perpendicular unit vectors are the best basis, how Gram-Schmidt builds them from any basis, and the QR factorisation.

### Why orthonormal bases?
Some bases are much nicer than others. If your basis vectors have length 1 and are all perpendicular to each other, then finding coordinates needs no equation solving, just dot products. Lengths and angles are computed exactly as in the standard basis, and the matrix holding the basis is orthogonal, so its inverse is free. Numerical algorithms love such bases because they don't amplify rounding errors. The **Gram-Schmidt process** is a simple recipe that takes any basis and straightens it into an orthonormal one with the same span. It leads directly to the **QR factorisation**, used to solve least-squares problems stably and to compute eigenvalues.

### An everyday scenario
Imagine giving directions in a city where the two main avenues meet at a sharp $30°$ angle. Distances measured along them are confusing: walking "1 block along each" doesn't form a nice square. A planner decides to keep the first avenue but lay a new street exactly perpendicular to it. Now the grid is square, and every direction can be described simply. Gram-Schmidt does exactly that: keep the first direction, and from each later direction remove the parts that lean along the earlier ones, leaving only the genuinely new, perpendicular part.

### What orthonormal means
Vectors $q_1, \dots, q_k$ are **orthonormal** if each has length 1 and every pair is perpendicular: $q_i\cdot q_j = 0$ for $i \ne j$ and $q_i\cdot q_i = 1$. In matrix form, $Q^TQ = I$ when the $q$'s are the columns of $Q$. If they form a basis, then any vector $v$ has coordinates $c_i = q_i\cdot v$, so
$$v = (q_1\cdot v)q_1 + (q_2\cdot v)q_2 + \dots + (q_n\cdot v)q_n$$
Each term is the projection of $v$ onto one basis direction, and because the directions are perpendicular the projections don't interfere with each other. For a general basis you'd have to solve a linear system; here you just take dot products.

### The Gram-Schmidt process, step by step
Start with independent vectors $a_1, a_2, \dots$. Step 1: normalise the first, $q_1 = a_1/\|a_1\|$. Step 2: take $a_2$ and subtract its projection onto $q_1$, leaving the part perpendicular to $q_1$: $v_2 = a_2 - (q_1\cdot a_2)q_1$. Then normalise: $q_2 = v_2/\|v_2\|$. Step 3: from $a_3$ subtract its projections onto both $q_1$ and $q_2$, then normalise. Continue: each new vector has the shadows on all earlier $q$'s removed.

Let's do a 2-D example with $a_1 = (3, 4)$ and $a_2 = (1, 0)$. First, $\|a_1\| = 5$, so $q_1 = (0.6, 0.8)$. Next, $q_1\cdot a_2 = 0.6$, so $v_2 = (1, 0) - 0.6(0.6, 0.8) = (1 - 0.36,\ -0.48) = (0.64, -0.48)$. Its length is $\sqrt{0.4096 + 0.2304} = \sqrt{0.64} = 0.8$, so $q_2 = (0.8, -0.6)$. Check: $q_1\cdot q_2 = 0.48 - 0.48 = 0$, and both have length 1.

@fig gram-schmidt | q₂ is what remains of b after removing its shadow on q₁, then rescaled to length 1.

### Why it works
At each step, the vector $v_k$ is $a_k$ minus its projections onto the earlier $q$'s. By the projection lesson, what remains is perpendicular to each of them: for example $q_1\cdot v_2 = q_1\cdot a_2 - (q_1\cdot a_2)(q_1\cdot q_1) = 0$. Also $v_k$ is never zero, because $a_k$ is independent of the earlier vectors and so cannot be fully made from them. And since each $q_k$ is a combination of $a_1, \dots, a_k$ (and vice versa), the span never changes. You get an orthonormal basis for exactly the same subspace.

### The QR factorisation
Record what Gram-Schmidt did. Each original vector is a combination of the $q$'s built so far: $a_1 = \|a_1\|q_1$, and $a_2 = (q_1\cdot a_2)q_1 + \|v_2\|q_2$. In matrix form, $A = QR$, where $Q$ has orthonormal columns and $R$ is upper triangular with entries $R_{ij} = q_i\cdot a_j$. In the example, $R = \begin{bmatrix}5 & 0.6\\0 & 0.8\end{bmatrix}$. Check column 2: $0.6(0.6, 0.8) + 0.8(0.8, -0.6) = (0.36 + 0.64,\ 0.48 - 0.48) = (1, 0) = a_2$. QR is how libraries solve least squares without forming $A^TA$.

:::def Orthonormal set
Vectors that each have length 1 and are pairwise perpendicular: $q_i\cdot q_j = 0$ for $i \ne j$, $\|q_i\| = 1$.
:::

:::def Gram-Schmidt process
An algorithm that turns independent vectors $a_1, \dots, a_k$ into orthonormal $q_1, \dots, q_k$ with the same span, by subtracting projections onto earlier $q$'s and normalising.
:::

:::def QR factorisation
$A = QR$ with $Q$ having orthonormal columns and $R$ upper triangular, $R_{ij} = q_i\cdot a_j$.
:::

:::warn Common mistakes
- Forgetting to normalise at the end of each step, which breaks later projection formulas.
- Subtracting the projection onto the original $a_1$ instead of the unit $q_1$ without dividing by $a_1\cdot a_1$.
- Projecting only onto the previous vector instead of all earlier ones in 3 or more dimensions.
- Feeding in dependent vectors; some $v_k$ becomes zero and cannot be normalised.
:::

### When you have a full basis
If you run Gram-Schmidt on $n$ independent vectors in $\mathbb{R}^n$, you get $n$ orthonormal vectors, and the square matrix $Q$ holding them is an orthogonal matrix. Then $Q^{-1} = Q^T$, every vector has coordinates $Q^Tv$, and lengths are preserved, $\|Q^Tv\| = \|v\|$. In the 2-D example, $Q = \begin{bmatrix}0.6 & 0.8\\0.8 & -0.6\end{bmatrix}$, and the vector $(1, 0)$ has coordinates $(0.6, 0.8)$ in the new basis, a vector of length 1 as it should be. If you only have $k < n$ vectors, $Q$ is tall and thin, $Q^TQ = I$ still holds, but $QQ^T$ is not the identity: it is the projection onto the subspace the vectors span, exactly the $P = QQ^T$ from the projection lesson.

### Summary
An orthonormal basis has unit, pairwise perpendicular vectors, so coordinates are dot products and $Q^TQ = I$. Gram-Schmidt builds one from any independent set: normalise the first vector, then from each next vector subtract its projections onto all earlier $q$'s and normalise. Recording the coefficients gives $A = QR$ with $R$ upper triangular.

@viz gram-schmidt | Drag a and b. q₁ follows a; q₂ is what's left of b after removing its shadow on q₁.

:::explore
**What to try**
1. Set $a$ and $b$ nearly perpendicular. $q_2$ points almost the same way as $b$, because there is little shadow to remove.
2. Make $b$ nearly parallel to $a$. The leftover part is tiny before normalising: the process is close to dividing by zero.
3. Swap roles by dragging $b$ to where $a$ was. The resulting $q$'s change: Gram-Schmidt depends on the order of the inputs.

**What to notice:** $q_1$ and $q_2$ are always perpendicular unit vectors spanning the same plane as $a$ and $b$, exactly the "remove the shadow, then rescale" step of the article.
:::

:::formulas
$$q_1 = \frac{a_1}{\|a_1\|}, \qquad v_k = a_k - \sum_{i<k}(q_i\cdot a_k)q_i, \qquad q_k = \frac{v_k}{\|v_k\|}$$
$$v = \sum_i (q_i\cdot v)\,q_i \ \ (\text{orthonormal basis})$$
$$A = QR, \qquad Q^TQ = I, \qquad R_{ij} = q_i\cdot a_j$$
:::

:::thm Gram-Schmidt preserves span and produces orthonormal vectors
If $a_1, \dots, a_k$ are independent, the vectors $q_1, \dots, q_k$ produced by Gram-Schmidt are orthonormal and $\operatorname{span}(q_1, \dots, q_j) = \operatorname{span}(a_1, \dots, a_j)$ for every $j$.
:::

:::proof
By induction. Assume $q_1, \dots, q_{k-1}$ are orthonormal and span the same space as $a_1, \dots, a_{k-1}$. For $j < k$, $q_j\cdot v_k = q_j\cdot a_k - (q_j\cdot a_k)(q_j\cdot q_j) = 0$, since the other terms vanish by orthogonality. $v_k \ne 0$ because $a_k$ is not in the span of the earlier vectors. Normalising gives unit length, and $v_k$ is $a_k$ plus a combination of earlier vectors, so the spans agree.
:::

:::steps Apply Gram-Schmidt to $a_1 = (1, 1, 0)$, $a_2 = (1, 0, 1)$
1. $\|a_1\| = \sqrt2$, so $q_1 = \frac{1}{\sqrt2}(1, 1, 0)$.
2. $q_1\cdot a_2 = \frac1{\sqrt2}$, so $v_2 = (1, 0, 1) - \frac12(1, 1, 0) = (\frac12, -\frac12, 1)$.
3. $\|v_2\| = \sqrt{\frac14 + \frac14 + 1} = \sqrt{\frac32}$, so $q_2 = \frac{1}{\sqrt6}(1, -1, 2)$. Check $q_1\cdot q_2 = \frac{1 - 1 + 0}{\sqrt{12}} = 0$.
:::

:::steps Find the coordinates of $v = (2, 5)$ in the orthonormal basis $q_1 = (0.6, 0.8)$, $q_2 = (0.8, -0.6)$
1. $c_1 = q_1\cdot v = 1.2 + 4 = 5.2$.
2. $c_2 = q_2\cdot v = 1.6 - 3 = -1.4$.
3. Check: $5.2(0.6, 0.8) - 1.4(0.8, -0.6) = (3.12 - 1.12, 4.16 + 0.84) = (2, 5)$.
:::

:::mock Exam question
Find the QR factorisation of $A = \begin{bmatrix}1 & 1\\1 & 2\end{bmatrix}$.
:::solution
$a_1 = (1, 1)$, $\|a_1\| = \sqrt2$, $q_1 = \frac1{\sqrt2}(1, 1)$. $q_1\cdot a_2 = \frac{3}{\sqrt2}$, so $v_2 = (1, 2) - \frac32(1, 1) = (-\frac12, \frac12)$, with length $\frac1{\sqrt2}$, giving $q_2 = \frac1{\sqrt2}(-1, 1)$. Then $Q = \frac1{\sqrt2}\begin{bmatrix}1 & -1\\1 & 1\end{bmatrix}$ and $R = \begin{bmatrix}\sqrt2 & 3/\sqrt2\\0 & 1/\sqrt2\end{bmatrix}$. Check column 2: $\frac{3}{\sqrt2}q_1 + \frac{1}{\sqrt2}q_2 = \frac32(1, 1) + \frac12(-1, 1) = (1, 2)$.
:::
:::

:::ml
Least-squares solvers use QR: from $A = QR$, the normal equations become $R\hat x = Q^Ty$, a triangular system, which is much more stable than inverting $A^TA$. Orthogonal weight initialisation, orthogonal regularisation and some recurrent networks keep weight matrices close to orthonormal so gradients neither explode nor vanish.
:::

:::cs
The QR algorithm, the standard method for computing all eigenvalues of a matrix, repeatedly factors $A = QR$ and forms $RQ$. Numerical libraries use the "modified" Gram-Schmidt or Householder reflections because classical Gram-Schmidt can lose orthogonality to rounding errors.
:::

:::real
Surveyors and architects set up perpendicular reference axes on uneven sites: one baseline is chosen, then a second line is laid exactly at a right angle to it, which is one step of Gram-Schmidt in the field.
:::

:::quiz
? Normalise $a_1 = (0, 2)$. What is the second entry of $q_1$?
= 1
> $q_1 = (0, 2)/2 = (0, 1)$.

? With $q_1 = (1, 0)$, the part of $a_2 = (2, 3)$ perpendicular to $q_1$ is $(0, ?)$.
= 3
> $a_2 - (q_1\cdot a_2)q_1 = (2, 3) - 2(1, 0) = (0, 3)$.

? If $Q$ has orthonormal columns, $Q^TQ$ equals...
+ $I$
- $0$
- $Q$
> Entry $(i, j)$ is $q_i\cdot q_j$.

? In $A = QR$ from Gram-Schmidt, $R$ is...
+ upper triangular
- diagonal
- orthogonal
> $a_k$ only uses $q_1, \dots, q_k$.

? In an orthonormal basis, the coordinate $c_i$ of $v$ is...
+ $q_i\cdot v$
- $\|v\|$
- found only by elimination
> Orthonormality makes coordinates dot products.

? For $a_1 = (3, 4)$, what is the length that $a_1$ is divided by?
= 5
> $\sqrt{9 + 16} = 5$.
:::

## Lesson: Least squares and linear regression {#least-squares}
@summary: When a system has no exact solution, find the best one. The normal equations, the geometry of projection, and fitting a line to data.

### Why least squares?
Real data never fits a model perfectly. Measurements have noise, and you usually have far more data points than unknowns. If you try to draw a straight line through 100 scattered points, there is no line through all of them: the system $Xw = y$ has no solution. Instead of giving up, we ask for the line that is **wrong by the least amount**, measured by the sum of squared errors. This idea, invented by Gauss and Legendre around 1800 to predict the orbits of planets and comets, is now the foundation of linear regression, the first model every machine learning course teaches.

### An everyday scenario
Imagine you record how many hours you study and your quiz score: 1 hour gave 1 point, 2 hours gave 2 points, 3 hours gave 2 points. You want a rule "score $= c + m\cdot$ hours" to predict future scores. No single line passes through all three points. For any candidate line, each point has a **residual**: actual score minus predicted score. Some residuals are positive, some negative. We square them (so negatives don't cancel positives, and big misses count extra) and add them up. The best line makes this total as small as possible.

### Setting it up as a matrix problem
Each data point gives one equation $c + m x_i = y_i$. For the three points:
$$\begin{bmatrix}1 & 1\\1 & 2\\1 & 3\end{bmatrix}\begin{bmatrix}c\\m\end{bmatrix} \approx \begin{bmatrix}1\\2\\2\end{bmatrix}$$
The matrix $X$ has a column of ones (for the intercept) and a column of $x$-values. Three equations, two unknowns: no exact solution. We minimise $\|y - Xw\|^2$, the squared length of the residual vector.

### The geometry: projection again
Every vector $Xw$ lies in the column space of $X$, a plane inside $\mathbb{R}^3$. The target $y$ sticks out of that plane. The closest point in the plane is the orthogonal projection of $y$, so the best $Xw$ is the projection, and the residual $y - Xw$ must be perpendicular to every column of $X$. That condition is $X^T(y - Xw) = 0$, giving the **normal equations**
$$X^TX\,\hat w = X^Ty$$
The word "normal" means perpendicular, from the residual being normal to the column space.

@fig lstsq | The best-fit line minimises the total area of the squared-error boxes.

### Solving the example
Compute $X^TX = \begin{bmatrix}3 & 6\\6 & 14\end{bmatrix}$ (entries: number of points 3, $\sum x_i = 6$, $\sum x_i^2 = 14$) and $X^Ty = (5, 11)$ (entries: $\sum y_i = 5$, $\sum x_iy_i = 1 + 4 + 6 = 11$). The determinant is $42 - 36 = 6$, so
$$\hat w = \frac16\begin{bmatrix}14 & -6\\-6 & 3\end{bmatrix}\begin{bmatrix}5\\11\end{bmatrix} = \frac16\begin{bmatrix}4\\3\end{bmatrix} = \begin{bmatrix}2/3\\1/2\end{bmatrix}$$
The best line is $y = \frac23 + \frac12x$. Its predictions are $\frac76, \frac{10}6, \frac{13}6$ and the residuals are $-\frac16, \frac26, -\frac16$. They add to zero, and $\sum x_ir_i = -\frac16 + \frac46 - \frac36 = 0$: the residual is perpendicular to both columns, as the geometry promised.

### Why squares?
Squaring makes the error smooth and gives a single best answer with a clean formula. It also has a statistical meaning: if the noise is Gaussian, least squares gives the most likely line. A simple special case shows the flavour: the best constant prediction for data $2, 4, 9$ minimises $(2 - c)^2 + (4 - c)^2 + (9 - c)^2$, and the answer is the mean, $c = 5$. The mean is the least-squares summary of a list of numbers. If you used absolute values instead, you would get the median.

### When the normal equations fail
If the columns of $X$ are dependent (for example two identical features), $X^TX$ is singular and there are many equally good $w$'s. **Ridge regression** fixes this by adding a penalty $\lambda\|w\|^2$, which changes the equations to $(X^TX + \lambda I)\hat w = X^Ty$, always solvable for $\lambda > 0$.

:::def Least-squares solution
A vector $\hat w$ that minimises $\|y - Xw\|^2$. It satisfies the normal equations $X^TX\hat w = X^Ty$.
:::

:::def Residual
The difference $r = y - X\hat w$ between actual and predicted values. For the least-squares fit it is perpendicular to every column of $X$.
:::

:::warn Common mistakes
- Forgetting the column of ones, which forces the line through the origin.
- Minimising vertical distances but describing them as perpendicular distances to the line. Least squares uses vertical (output) errors.
- Computing $(X^TX)^{-1}$ explicitly in code. Use a least-squares solver; it is faster and more stable.
- Assuming a small total error means the model is right. Always look at the residuals for patterns.
:::

### Fitting more than a straight line
Least squares is far more flexible than it first appears. The model only has to be linear in the unknown weights, not in $x$. To fit a parabola $y = w_0 + w_1x + w_2x^2$, give $X$ three columns: ones, the $x$-values, and the squared $x$-values. The normal equations are unchanged. To predict a house price from size, age and number of rooms, give $X$ one column per feature plus the ones column. With $d$ features, $X^TX$ is a $(d + 1)\times(d + 1)$ matrix, and the same projection picture holds in higher dimensions: the prediction vector $X\hat w$ is the shadow of $y$ on the space spanned by the feature columns. This is why linear regression, polynomial regression and many basis-function models all share one formula.

### Summary
When $Xw = y$ has no exact solution, least squares picks $\hat w$ minimising the sum of squared residuals. Geometrically, $X\hat w$ is the projection of $y$ onto the column space, so the residual is perpendicular to the columns, which gives $X^TX\hat w = X^Ty$. For a line, $X$ has a column of ones and a column of $x$-values. The mean is least squares with one constant, and ridge regression adds $\lambda I$ to keep things solvable.

@viz lstsq | Drag the data points. The pink squares are squared errors; the best-fit line minimises their total area. Try fitting by hand.

:::explore
**What to try**
1. Use the controls to fit a line by hand and watch the total squared error. Then show the best fit and compare.
2. Drag one point far away from the others. The best line swings toward it: squared errors punish big misses heavily.
3. Line the points up exactly. The squares vanish and the residual is zero.

**What to notice:** the best line always balances the residuals so they sum to zero, and a single outlier has a big effect because its error is squared. This is the "squares" in least squares from the article.
:::

:::formulas
$$\hat w = \arg\min_w \|y - Xw\|^2$$
$$X^TX\hat w = X^Ty, \qquad \hat w = (X^TX)^{-1}X^Ty$$
$$\text{Line } y = c + mx: \ \begin{bmatrix}n & \sum x_i\\\sum x_i & \sum x_i^2\end{bmatrix}\begin{bmatrix}c\\m\end{bmatrix} = \begin{bmatrix}\sum y_i\\\sum x_iy_i\end{bmatrix}$$
$$\text{Ridge: } (X^TX + \lambda I)\hat w = X^Ty$$
:::

:::thm The normal equations give the minimum
$\hat w$ minimises $\|y - Xw\|^2$ if and only if $X^TX\hat w = X^Ty$.
:::

:::proof
The set of all $Xw$ is the column space of $X$. By the projection theorem, the closest point to $y$ is the $X\hat w$ with $y - X\hat w$ perpendicular to the column space, i.e. perpendicular to every column: $X^T(y - X\hat w) = 0$, which rearranges to the normal equations.
:::

:::steps Fit $y = c + mx$ to $(0, 1)$, $(1, 3)$, $(2, 4)$
1. $n = 3$, $\sum x = 3$, $\sum x^2 = 5$, $\sum y = 8$, $\sum xy = 0 + 3 + 8 = 11$.
2. Solve $\begin{bmatrix}3 & 3\\3 & 5\end{bmatrix}\begin{bmatrix}c\\m\end{bmatrix} = \begin{bmatrix}8\\11\end{bmatrix}$. Determinant $6$; $c = \frac{5\cdot8 - 3\cdot11}{6} = \frac76$, $m = \frac{3\cdot11 - 3\cdot8}{6} = \frac32$.
3. Line $y = \frac76 + \frac32x$. Residuals $-\frac16, \frac13, -\frac16$ sum to zero.
:::

:::steps Fit a line through the origin, $y = mx$, to $(1, 1)$ and $(2, 3)$
1. $X$ is the single column $(1, 2)$, so $X^TX = 1 + 4 = 5$ and $X^Ty = 1 + 6 = 7$.
2. $m = 7/5 = 1.4$.
3. Residuals $1 - 1.4 = -0.4$ and $3 - 2.8 = 0.2$; check $1(-0.4) + 2(0.2) = 0$.
:::

:::mock Exam question
Fit $y = c + mx$ by least squares to the points $(0, 0)$, $(1, 1)$, $(2, 1)$, $(3, 2)$, and verify the residuals are perpendicular to both columns of $X$.
:::solution
$n = 4$, $\sum x = 6$, $\sum x^2 = 14$, $\sum y = 4$, $\sum xy = 0 + 1 + 2 + 6 = 9$. Solve $\begin{bmatrix}4 & 6\\6 & 14\end{bmatrix}\begin{bmatrix}c\\m\end{bmatrix} = \begin{bmatrix}4\\9\end{bmatrix}$: determinant $56 - 36 = 20$, $c = \frac{14\cdot4 - 6\cdot9}{20} = 0.1$, $m = \frac{4\cdot9 - 6\cdot4}{20} = 0.6$. Predictions $0.1, 0.7, 1.3, 1.9$; residuals $-0.1, 0.3, -0.3, 0.1$. Their sum is $0$ (perpendicular to the ones column) and $\sum x_ir_i = 0 + 0.3 - 0.6 + 0.3 = 0$ (perpendicular to the $x$ column).
:::
:::

:::ml
Linear regression is least squares, and it is also the last layer of many networks trained with mean squared error. The mean squared error loss $\frac1n\|y - Xw\|^2$ has gradient $-\frac2nX^T(y - Xw)$; setting it to zero gives the normal equations, and gradient descent approaches the same answer iteratively. Ridge regression ($L_2$ regularisation) is weight decay.
:::

:::code
```python
import numpy as np
X = np.array([[1, 1], [1, 2], [1, 3]]); y = np.array([1, 2, 2])
w, *_ = np.linalg.lstsq(X, y, rcond=None)
w   # array([0.6667, 0.5])
```
:::

:::real
GPS receivers hear more satellites than the minimum needed and solve an overdetermined system by least squares to estimate position. Economists fit demand curves, and engineers calibrate sensors, the same way.
:::

:::quiz
? The best constant fit (least squares) to the data $2, 4, 9$ is...
= 5
> The mean minimises the sum of squared deviations.

? Fit $y = mx$ through the origin to $(1, 1)$ and $(2, 3)$. What is $m$?
= 7/5|1.4
> $m = \sum xy/\sum x^2 = 7/5$.

? The normal equations are...
+ $X^TX\hat w = X^Ty$
- $X\hat w = y$
- $XX^T\hat w = y$
> They come from the residual being perpendicular to the columns.

? The least-squares residual is perpendicular to...
+ the column space of $X$
- the vector $y$
- the vector $\hat w$
> $X\hat w$ is the projection of $y$ onto the column space.

? For 5 data points and the model $y = c + mx$, what is the top-left entry of $X^TX$?
= 5
> It is $\sum 1 = n$.

? Why are errors squared rather than just added?
+ So positive and negative errors don't cancel, and the minimum has a clean formula
- Because squares are always smaller
- To make big errors matter less
> Squaring makes every error count and gives a smooth objective. Big errors matter more, not less.
:::

# Unit: Eigenvalues and decompositions

## Lesson: Eigenvectors and eigenvalues {#eigen}
@summary: The special directions a matrix only stretches, how to find them with the characteristic polynomial, and why they matter.

### Why eigenvectors?
When a matrix acts on the plane, most vectors get knocked off their original direction: they are rotated as well as stretched. But for many matrices there are a few special directions where the vector is only stretched or shrunk, never turned. These directions are **eigenvectors**, and the stretch factors are **eigenvalues** (from the German *eigen*, meaning "own" or "characteristic"). They reveal the hidden skeleton of a matrix. Google's original PageRank was an eigenvector. PCA finds eigenvectors of a covariance matrix. The stability of a dynamical system, the vibration modes of a bridge, and the long-run behaviour of a Markov chain are all eigenvalue questions.

### An everyday scenario
Imagine stretching a rubber sheet with a picture of many arrows drawn on it, pulling it along one diagonal. After the stretch, almost every arrow points somewhere new. But the arrows lying exactly along the pulling diagonal still point the same way; they just got longer. And the arrows along the other diagonal might keep their direction too, perhaps shrinking. Those unchanging directions are the eigenvectors of the stretch, and "how much longer" is the eigenvalue.

### The definition
A nonzero vector $v$ is an **eigenvector** of a square matrix $A$ with **eigenvalue** $\lambda$ if
$$Av = \lambda v$$
The output points along the same line as the input, scaled by $\lambda$. If $\lambda = 3$ the vector triples; if $\lambda = 0.5$ it halves; if $\lambda = -1$ it flips to point backwards; if $\lambda = 0$ it is crushed to zero. For example, with $A = \begin{bmatrix}2 & 1\\1 & 2\end{bmatrix}$, $A(1, 1) = (3, 3) = 3(1, 1)$, so $(1, 1)$ is an eigenvector with eigenvalue 3. And $A(1, -1) = (1, -1)$, eigenvalue 1. But $A(1, 0) = (2, 1)$ is not a multiple of $(1, 0)$, so $(1, 0)$ is not an eigenvector. Any nonzero multiple of an eigenvector is also an eigenvector with the same eigenvalue, so really we find eigen-**directions**.

:::def Eigenvector and eigenvalue
A nonzero vector $v$ with $Av = \lambda v$. The scalar $\lambda$ is the eigenvalue; $v$ only gets scaled, not turned.
:::

### Finding eigenvalues: the characteristic equation
Rewrite $Av = \lambda v$ as $(A - \lambda I)v = 0$. We need a nonzero $v$ in the null space of $A - \lambda I$, which happens exactly when that matrix is singular, that is when
$$\det(A - \lambda I) = 0$$
This is the **characteristic equation**. For a $2\times2$ matrix it is a quadratic in $\lambda$. For $A = \begin{bmatrix}4 & 1\\2 & 3\end{bmatrix}$:
$$\det\begin{bmatrix}4 - \lambda & 1\\2 & 3 - \lambda\end{bmatrix} = (4 - \lambda)(3 - \lambda) - 2 = \lambda^2 - 7\lambda + 10 = (\lambda - 5)(\lambda - 2)$$
So the eigenvalues are $5$ and $2$. For any $2\times2$ matrix the characteristic polynomial is $\lambda^2 - (\operatorname{tr}A)\lambda + \det A$, here $7$ and $10$.

### Finding eigenvectors
For each eigenvalue, solve $(A - \lambda I)v = 0$. For $\lambda = 5$: $A - 5I = \begin{bmatrix}-1 & 1\\2 & -2\end{bmatrix}$. Row 1 says $-v_1 + v_2 = 0$, so $v = (1, 1)$. Check: $A(1, 1) = (5, 5)$. For $\lambda = 2$: $A - 2I = \begin{bmatrix}2 & 1\\2 & 1\end{bmatrix}$, so $2v_1 + v_2 = 0$ and $v = (1, -2)$. Check: $A(1, -2) = (4 - 2, 2 - 6) = (2, -4) = 2(1, -2)$. The rows of $A - \lambda I$ are always dependent when $\lambda$ is a true eigenvalue; if you find only $v = 0$, recheck your eigenvalue.

@fig matrix2 preset=symmetric eigen=1 | The green dashed lines are the eigenvector directions: vectors on them are stretched but not rotated.

### Useful facts and shortcuts
The eigenvalues of a triangular matrix are its diagonal entries. The sum of the eigenvalues equals the trace and their product equals the determinant (check: $5 + 2 = 7$ and $5\cdot2 = 10$). A matrix is singular exactly when $0$ is an eigenvalue. If $Av = \lambda v$, then $A^2v = \lambda^2v$, and in general $A^kv = \lambda^kv$; if $A$ is invertible, $A^{-1}v = \frac1\lambda v$. So the eigenvectors of $A$ also serve $A^2$, $A^{10}$ and $A^{-1}$.

Not every real matrix has real eigenvalues. The $90°$ rotation $\begin{bmatrix}0 & -1\\1 & 0\end{bmatrix}$ turns every vector, so no direction survives; its characteristic equation $\lambda^2 + 1 = 0$ has complex roots $\pm i$. Symmetric matrices, on the other hand, are always well behaved: their eigenvalues are real and their eigenvectors for different eigenvalues are perpendicular, as $(1, 1)$ and $(1, -1)$ were above. This is the **spectral theorem**, central to PCA.

### Why it works
Eigenvectors are directions the transformation leaves on their own line. The determinant test finds the special stretch factors $\lambda$ for which $A - \lambda I$ collapses some direction to zero; that collapsed direction is exactly a vector that $A$ maps to $\lambda$ times itself.

:::warn Common mistakes
- Accepting $v = 0$ as an eigenvector. Eigenvectors must be nonzero.
- Subtracting $\lambda$ from every entry instead of only the diagonal. It is $A - \lambda I$.
- Thinking eigenvectors must have length 1. Any nonzero multiple works.
- Assuming eigenvalues of $A + B$ or $AB$ are sums or products of the separate eigenvalues. That is false in general.
:::

### Eigenvalues as a fingerprint
Two matrices can look completely different and still share eigenvalues. If $C = B^{-1}AB$ is the same transformation in another basis, then $C$ has exactly the same eigenvalues as $A$, because stretching factors are a property of the motion, not of the coordinates used to describe it. This is why eigenvalues are called characteristic values. They answer questions that do not depend on your choice of axes: does repeated application blow up (some $|\lambda| > 1$) or die out (all $|\lambda| < 1$)? Does the transformation flip some direction (a negative $\lambda$)? Does it destroy information (a zero $\lambda$)?

### Summary
An eigenvector of $A$ is a nonzero vector that $A$ only scales: $Av = \lambda v$. Find eigenvalues by solving $\det(A - \lambda I) = 0$, which for $2\times2$ is $\lambda^2 - (\operatorname{tr}A)\lambda + \det A = 0$, then find eigenvectors from the null space of $A - \lambda I$. Eigenvalues sum to the trace and multiply to the determinant, powers of $A$ have eigenvalues $\lambda^k$, and symmetric matrices have real eigenvalues with perpendicular eigenvectors.

@viz eigen a=2 b=1 c=1 d=2 | Rotate x around the circle and watch Ax. When they line up, x is an eigenvector.

:::explore
**What to try**
1. Slowly rotate $x$ around the circle. Most of the time $Ax$ points in a different direction.
2. Find the angle where $Ax$ points exactly along $x$ ($45°$ for this matrix). Read the stretch: it should be 3.
3. Keep rotating until they line up again at $135°$: the stretch is 1.
4. Change the matrix to $a = 0, b = -1, c = 1, d = 0$ (a rotation). You will never get $Ax$ along $x$.

**What to notice:** the two lined-up directions are perpendicular, as the spectral theorem promises for symmetric matrices, and the stretch factors $3$ and $1$ add to the trace $4$ and multiply to the determinant $3$.
:::

:::formulas
$$Av = \lambda v, \quad v \ne 0$$
$$\det(A - \lambda I) = 0$$
$$2\times2: \ \lambda^2 - (\operatorname{tr}A)\lambda + \det A = 0$$
$$\sum\lambda_i = \operatorname{tr}A, \qquad \prod\lambda_i = \det A$$
$$A^kv = \lambda^kv, \qquad A^{-1}v = \lambda^{-1}v$$
:::

:::thm Eigenvalues and the determinant
$\lambda$ is an eigenvalue of $A$ if and only if $\det(A - \lambda I) = 0$.
:::

:::proof
$Av = \lambda v$ with $v \ne 0$ means $(A - \lambda I)v = 0$ has a nonzero solution, which happens exactly when $A - \lambda I$ is singular, i.e. its determinant is zero.
:::

:::thm Spectral theorem (real symmetric matrices)
If $A = A^T$, then all eigenvalues of $A$ are real, and $A$ has an orthonormal basis of eigenvectors.
:::

:::proof
Partial proof of perpendicularity: if $Au = \lambda u$ and $Av = \mu v$ with $\lambda \ne \mu$, then $\lambda(u\cdot v) = (Au)\cdot v = u\cdot(A^Tv) = u\cdot(Av) = \mu(u\cdot v)$. Since $\lambda \ne \mu$, $u\cdot v = 0$.
:::

:::steps Find the eigenvalues and eigenvectors of $A = \begin{bmatrix}1 & 2\\2 & 1\end{bmatrix}$
1. Trace $2$, determinant $1 - 4 = -3$: $\lambda^2 - 2\lambda - 3 = (\lambda - 3)(\lambda + 1) = 0$.
2. $\lambda = 3$: $A - 3I = \begin{bmatrix}-2 & 2\\2 & -2\end{bmatrix}$, so $v = (1, 1)$.
3. $\lambda = -1$: $A + I = \begin{bmatrix}2 & 2\\2 & 2\end{bmatrix}$, so $v = (1, -1)$. Perpendicular, as $A$ is symmetric.
:::

:::steps Find the eigenvalues of $\begin{bmatrix}3 & 7 & 1\\0 & -2 & 5\\0 & 0 & 4\end{bmatrix}$
1. The matrix is upper triangular, so $\det(A - \lambda I) = (3 - \lambda)(-2 - \lambda)(4 - \lambda)$.
2. Eigenvalues $3, -2, 4$.
3. Check: sum $5$ equals the trace $3 - 2 + 4$; product $-24$ equals the determinant.
:::

:::mock Exam question
$A = \begin{bmatrix}5 & -2\\1 & 2\end{bmatrix}$. Find its eigenvalues and an eigenvector for each, then give the eigenvalues of $A^2$ and $A^{-1}$.
:::solution
Trace $7$, determinant $10 + 2 = 12$: $\lambda^2 - 7\lambda + 12 = (\lambda - 3)(\lambda - 4)$, so $\lambda = 3, 4$. For $\lambda = 3$: $A - 3I = \begin{bmatrix}2 & -2\\1 & -1\end{bmatrix}$ gives $v = (1, 1)$; check $A(1, 1) = (3, 3)$. For $\lambda = 4$: $A - 4I = \begin{bmatrix}1 & -2\\1 & -2\end{bmatrix}$ gives $v = (2, 1)$; check $A(2, 1) = (8, 4)$. $A^2$ has eigenvalues $9, 16$, and $A^{-1}$ has $\frac13, \frac14$.
:::
:::

:::ml
PCA's principal directions are eigenvectors of the covariance matrix, and the eigenvalues are the variances along them. Spectral clustering uses eigenvectors of a graph Laplacian. The eigenvalues of a Hessian tell an optimiser whether it is at a minimum (all positive), a maximum, or a saddle, and the ratio of largest to smallest controls how fast gradient descent converges.
:::

:::cs
PageRank is the eigenvector with eigenvalue 1 of the web's link matrix, computed by power iteration: repeatedly multiply a vector by the matrix and it lines up with the dominant eigenvector. In RNNs, if the recurrent matrix has eigenvalues above 1 in size, signals explode over time; below 1, they vanish.
:::

:::real
Engineers compute the eigenvalues of a structure's stiffness matrix to find its natural vibration frequencies, so a bridge or building is not driven into resonance by wind, footsteps or earthquakes.
:::

:::quiz
? What is the larger eigenvalue of $\begin{bmatrix}3 & 0\\0 & 5\end{bmatrix}$?
= 5
> A diagonal matrix's eigenvalues are its diagonal entries.

? $A(1, 2) = (3, 6)$. What eigenvalue does the eigenvector $(1, 2)$ have?
= 3
> $(3, 6) = 3(1, 2)$.

? What is the product of the eigenvalues of $\begin{bmatrix}2 & 1\\1 & 2\end{bmatrix}$?
= 3
> The product equals the determinant, $4 - 1 = 3$.

? Can $v = 0$ be an eigenvector?
- Yes
+ No
> By definition eigenvectors are nonzero; $A0 = \lambda 0$ for every $\lambda$.

? If $\lambda = 2$ is an eigenvalue of $A$, which number is an eigenvalue of $A^3$?
= 8
> $A^3v = 2^3v$.

? The $90°$ rotation matrix has...
+ no real eigenvalues
- eigenvalues $1$ and $1$
- eigenvalue $0$
> It turns every direction; $\lambda^2 + 1 = 0$ has only complex roots.
:::

## Lesson: Diagonalization and matrix powers {#diagonalization}
@summary: Writing A = PDP⁻¹ with eigenvectors and eigenvalues, computing powers fast, and long-run behaviour of Markov chains.

### Why diagonalise?
Diagonal matrices are the easiest matrices there are: you can power them, invert them and understand them at a glance. Most matrices are not diagonal, but many of them are diagonal **in disguise**: if you look at them in a basis of eigenvectors, they just stretch each axis. Diagonalisation makes this precise by factoring $A = PDP^{-1}$. It turns hard problems, like computing $A^{100}$ or predicting the long-run state of a system, into easy ones. It explains the closed formula for Fibonacci numbers, the steady state of Markov chains, and the behaviour of linear dynamical systems.

### An everyday scenario
Imagine a town where each day the weather is sunny or rainy. If today is sunny, tomorrow is sunny with probability 0.9; if today is rainy, tomorrow is sunny with probability 0.5. What fraction of days are sunny in the long run? Today's probabilities form a vector, and tomorrow's are that vector multiplied by a fixed matrix. A year from now means multiplying by the matrix 365 times. Doing that directly is tedious, but eigenvectors tell you the answer almost instantly.

### The factorisation
Suppose an $n\times n$ matrix $A$ has $n$ independent eigenvectors $v_1, \dots, v_n$ with eigenvalues $\lambda_1, \dots, \lambda_n$. Put the eigenvectors in the columns of $P$ and the eigenvalues on the diagonal of $D$. The equations $Av_i = \lambda_iv_i$, written side by side, say $AP = PD$. Since the columns are independent, $P$ is invertible, so
$$A = PDP^{-1}$$
Read right to left, this says: $P^{-1}$ converts to eigenvector coordinates, $D$ stretches each coordinate by its eigenvalue, and $P$ converts back. It is exactly the change-of-basis formula $D = P^{-1}AP$ from earlier, with the eigenvector basis chosen so that the new matrix is diagonal.

For $A = \begin{bmatrix}2 & 1\\1 & 2\end{bmatrix}$ we found eigenvalues 3 and 1 with eigenvectors $(1, 1)$ and $(1, -1)$. So $P = \begin{bmatrix}1 & 1\\1 & -1\end{bmatrix}$, $D = \begin{bmatrix}3 & 0\\0 & 1\end{bmatrix}$, and $P^{-1} = \frac12\begin{bmatrix}1 & 1\\1 & -1\end{bmatrix}$.

### Powers become easy
The real payoff comes with powers. In $A^2 = PDP^{-1}PDP^{-1}$, the middle $P^{-1}P$ cancels to $I$, leaving $PD^2P^{-1}$. In general
$$A^k = PD^kP^{-1}$$
and $D^k$ just raises each eigenvalue to the $k$-th power. For our matrix,
$$A^k = \frac12\begin{bmatrix}3^k + 1 & 3^k - 1\\3^k - 1 & 3^k + 1\end{bmatrix}$$
Check with $k = 2$: the formula gives $\frac12\begin{bmatrix}10 & 8\\8 & 10\end{bmatrix} = \begin{bmatrix}5 & 4\\4 & 5\end{bmatrix}$, and direct multiplication gives $\begin{bmatrix}4 + 1 & 2 + 2\\2 + 2 & 1 + 4\end{bmatrix}$, the same. For $k = 100$ the formula is just as easy, while multiplying 100 times is not.

### Long-run behaviour
When $k$ is large, the biggest eigenvalue dominates. If $|\lambda_1|$ is larger than all the others, $A^kx$ points more and more along $v_1$. If every $|\lambda| < 1$, $A^kx \to 0$. If the largest is exactly 1, $A^kx$ settles down to a steady state along that eigenvector. In the weather example, the matrix is $M = \begin{bmatrix}0.9 & 0.5\\0.1 & 0.5\end{bmatrix}$ (columns are "from sunny" and "from rainy"). Its eigenvalues are $1$ and $0.4$ (trace $1.4$, determinant $0.45 - 0.05 = 0.4$). For $\lambda = 1$, $(M - I)v = 0$ gives $-0.1v_1 + 0.5v_2 = 0$, so $v = (5, 1)$. Scaling to probabilities, $(\frac56, \frac16)$. Since $0.4^k \to 0$, the other part dies out, and in the long run $\frac56$ of days are sunny, whatever today's weather.

@fig eigen a=2 b=1 c=1 d=2 | Along an eigenvector, A only stretches. Diagonalisation uses these directions as the new axes.

### When diagonalisation fails
Not every matrix can be diagonalised. The shear $\begin{bmatrix}1 & 1\\0 & 1\end{bmatrix}$ has eigenvalue 1 twice, but $A - I = \begin{bmatrix}0 & 1\\0 & 0\end{bmatrix}$ has only a one-dimensional null space, so there is only one eigenvector direction, $(1, 0)$. With too few eigenvectors, $P$ is not invertible. Good news: if all $n$ eigenvalues are distinct, the eigenvectors are automatically independent and $A$ is diagonalisable. And every symmetric matrix is diagonalisable with an orthogonal $P$: $A = Q\Lambda Q^T$.

:::def Diagonalisable matrix
A square matrix that can be written $A = PDP^{-1}$ with $D$ diagonal. The columns of $P$ are eigenvectors and the diagonal of $D$ holds the eigenvalues.
:::

:::def Markov matrix
A square matrix with nonnegative entries whose columns each sum to 1. It moves probability vectors to probability vectors and always has eigenvalue 1.
:::

:::warn Common mistakes
- Putting eigenvectors in the rows of $P$. They go in the columns, in the same order as the eigenvalues in $D$.
- Writing $A^k = P^kD^kP^{-k}$. Only $D$ gets the power.
- Assuming every matrix is diagonalisable. Repeated eigenvalues can leave too few eigenvectors.
- Forgetting to invert $P$; $A = PDP^T$ only when $P$ is orthogonal.
:::

### Seeing diagonalisation geometrically
It helps to picture what $A = PDP^{-1}$ does to a single vector. Take $x = (2, 0)$ and $A = \begin{bmatrix}2 & 1\\1 & 2\end{bmatrix}$. In eigenvector coordinates, $x = 1\cdot(1, 1) + 1\cdot(1, -1)$, so $P^{-1}x = (1, 1)$. Now $D$ multiplies the first coordinate by 3 and the second by 1, giving $(3, 1)$. Converting back, $3(1, 1) + 1(1, -1) = (4, 2)$, and indeed $Ax = (4, 2)$. After $k$ steps the coordinates are $(3^k, 1)$, so the $(1, 1)$ part grows rapidly while the $(1, -1)$ part stays the same size. That is why $A^kx$ swings around to point almost exactly along $(1, 1)$ for large $k$: the eigen-direction with the biggest eigenvalue wins.

### Summary
If $A$ has $n$ independent eigenvectors, then $A = PDP^{-1}$ with eigenvectors in $P$ and eigenvalues in $D$. Powers become $A^k = PD^kP^{-1}$, so large powers are dominated by the largest eigenvalue, which explains the long-run behaviour of Markov chains and other repeated processes. Distinct eigenvalues guarantee diagonalisability, symmetric matrices diagonalise as $Q\Lambda Q^T$, and some matrices, like the shear, can't be diagonalised.

@viz matrix2 preset=symmetric eigen=1 | The green dashed lines are the eigenvector axes. Press Animate: points on them only slide outward or inward.

:::explore
**What to try**
1. Press **Animate**. Watch points on the green dashed lines: they move straight out or in along their line.
2. Drag $\hat\imath$ and $\hat\jmath$ to make $\begin{bmatrix}2 & 1\\1 & 2\end{bmatrix}$. The eigen-axes are the diagonals $y = x$ and $y = -x$.
3. Choose **shear**. Only one eigen-direction remains: the shear cannot be diagonalised.
4. Choose **rotate**. No eigen-directions at all (over the real numbers).

**What to notice:** when two eigen-axes exist, the matrix is a pure stretch along them, which is what $A = PDP^{-1}$ says. Missing axes mean the factorisation fails.
:::

:::formulas
$$A = PDP^{-1}, \qquad D = P^{-1}AP$$
$$A^k = PD^kP^{-1}$$
$$\text{Symmetric: } A = Q\Lambda Q^T, \ Q^TQ = I$$
$$\text{Markov steady state: } Mv = v$$
:::

:::thm Distinct eigenvalues give independent eigenvectors
Eigenvectors belonging to distinct eigenvalues are linearly independent. In particular, an $n\times n$ matrix with $n$ distinct eigenvalues is diagonalisable.
:::

:::proof
For two vectors: suppose $c_1v_1 + c_2v_2 = 0$ with $\lambda_1 \ne \lambda_2$. Apply $A$: $c_1\lambda_1v_1 + c_2\lambda_2v_2 = 0$. Subtract $\lambda_2$ times the first equation: $c_1(\lambda_1 - \lambda_2)v_1 = 0$, so $c_1 = 0$, and then $c_2 = 0$. The general case follows by induction on the number of vectors.
:::

:::thm Powers of a diagonalisable matrix
If $A = PDP^{-1}$, then $A^k = PD^kP^{-1}$ for every positive integer $k$.
:::

:::proof
$A^k = (PDP^{-1})(PDP^{-1})\cdots(PDP^{-1})$. Every inner $P^{-1}P$ equals $I$, leaving $PD\cdots DP^{-1} = PD^kP^{-1}$.
:::

:::steps Diagonalise $A = \begin{bmatrix}4 & 1\\2 & 3\end{bmatrix}$
1. Eigenvalues $5$ and $2$ with eigenvectors $(1, 1)$ and $(1, -2)$ (from the eigen lesson).
2. $P = \begin{bmatrix}1 & 1\\1 & -2\end{bmatrix}$, $D = \begin{bmatrix}5 & 0\\0 & 2\end{bmatrix}$, $\det P = -3$, $P^{-1} = \frac13\begin{bmatrix}2 & 1\\1 & -1\end{bmatrix}$.
3. $A^n = \frac13\begin{bmatrix}2\cdot5^n + 2^n & 5^n - 2^n\\2\cdot5^n - 2^{n+1} & 5^n + 2^{n+1}\end{bmatrix}$. Check $n = 1$: $\frac13\begin{bmatrix}12 & 3\\6 & 9\end{bmatrix} = A$.
:::

:::steps Find the steady state of $M = \begin{bmatrix}0.8 & 0.3\\0.2 & 0.7\end{bmatrix}$
1. Solve $(M - I)v = 0$: $-0.2v_1 + 0.3v_2 = 0$, so $v = (3, 2)$.
2. Scale to sum 1: $(0.6, 0.4)$.
3. The other eigenvalue is $\operatorname{tr}M - 1 = 0.5$, which dies out, so every starting distribution approaches $(0.6, 0.4)$.
:::

:::mock Exam question
Fibonacci numbers satisfy $\begin{bmatrix}F_{n+1}\\F_n\end{bmatrix} = A\begin{bmatrix}F_n\\F_{n-1}\end{bmatrix}$ with $A = \begin{bmatrix}1 & 1\\1 & 0\end{bmatrix}$. Find the eigenvalues of $A$ and explain why $F_{n+1}/F_n$ approaches the larger one.
:::solution
Trace $1$, determinant $-1$: $\lambda^2 - \lambda - 1 = 0$, so $\lambda = \frac{1 \pm \sqrt5}{2}$, i.e. $\varphi \approx 1.618$ and $\psi \approx -0.618$. Writing the start vector in the eigenvector basis, $A^n$ multiplies the components by $\varphi^n$ and $\psi^n$. Since $|\psi| < 1$, that part shrinks to zero, so the vector points more and more along the $\varphi$ eigenvector $(\varphi, 1)$, giving $F_{n+1}/F_n \to \varphi$. The exact formula is $F_n = (\varphi^n - \psi^n)/\sqrt5$.
:::
:::

:::ml
Power iteration (repeatedly multiplying by $A$) finds the top eigenvector and is used in PageRank and spectral normalisation of GANs. Exploding and vanishing gradients in RNNs are diagonalisation in action: repeated multiplication by $W$ scales each eigen-direction by $\lambda^k$. Gaussian distributions are analysed by diagonalising the covariance $\Sigma = Q\Lambda Q^T$.
:::

:::cs
Linear recurrences in algorithms, such as counting paths in a graph ($A^k$ of the adjacency matrix counts walks of length $k$) or computing Fibonacci numbers in $O(\log n)$ by repeated squaring, rely on matrix powers.
:::

:::real
Population models (Leslie matrices) predict that an age-structured population eventually grows at a rate equal to the largest eigenvalue, with an age distribution given by its eigenvector. Ecologists use this to decide which life stage to protect.
:::

:::quiz
? For $D = \begin{bmatrix}2 & 0\\0 & 3\end{bmatrix}$, what is the bottom-right entry of $D^3$?
= 27
> $3^3 = 27$.

? In $A = PDP^{-1}$, the columns of $P$ are...
+ eigenvectors of $A$
- rows of $A$
- eigenvalues of $A$
> And $D$ holds the matching eigenvalues.

? What is the trace of $A^2$ for $A = \begin{bmatrix}2 & 1\\1 & 2\end{bmatrix}$?
= 10
> Eigenvalues of $A^2$ are $9$ and $1$; the trace is their sum. Directly, $A^2 = \begin{bmatrix}5 & 4\\4 & 5\end{bmatrix}$.

? Is $\begin{bmatrix}1 & 1\\0 & 1\end{bmatrix}$ diagonalisable?
- Yes
+ No
> It has only one eigenvector direction.

? A Markov chain has steady state $(5, 1)$ before scaling. What fraction of time is spent in state 1?
= 5/6
> Scale so the entries add to 1: $5/6$.

? A matrix has eigenvalues $0.5$ and $0.2$. What does $A^kx$ approach as $k$ grows?
+ the zero vector
- an eigenvector of length 1
- infinity
> Both components shrink by factors less than 1 each step.
:::

## Lesson: Quadratic forms and positive definite matrices {#positive-definite}
@summary: The expression xᵀAx, the bowl-saddle-trough picture, tests for positive definiteness, and the Cholesky factorisation.

### Why quadratic forms?
A huge part of machine learning is minimising a loss. Near any minimum, a smooth loss looks like a bowl, and bowls in many dimensions are described by a symmetric matrix through the expression $x^TAx$, called a **quadratic form**. Whether the surface is a true bowl (with a single lowest point), a saddle (down in one direction, up in another), or a flat trough is decided by one property of $A$: whether it is **positive definite**. The same property tells you whether a covariance matrix is valid, whether Newton's method will head downhill, and whether a fast Cholesky factorisation can be used to solve a system.

### An everyday scenario
Imagine pouring a marble onto different surfaces. In a salad bowl it rolls to the bottom and stays there: there is a unique lowest point. On a horse saddle it rolls off sideways, even though the centre looks flat, because the surface curves up front-to-back but down side-to-side. In a long gutter (a trough) it settles somewhere along the bottom line, but not at a single point. These three shapes are exactly the three kinds of quadratic form: positive definite, indefinite and positive semidefinite.

### What a quadratic form is
For a symmetric matrix $A = \begin{bmatrix}a & b\\b & c\end{bmatrix}$ and a vector $x = (x_1, x_2)$, the quadratic form is
$$x^TAx = ax_1^2 + 2bx_1x_2 + cx_2^2$$
It is a single number for each $x$. The off-diagonal entry appears twice, which is why we use the symmetric form. For $A = \begin{bmatrix}2 & 1\\1 & 3\end{bmatrix}$, $x^TAx = 2x_1^2 + 2x_1x_2 + 3x_2^2$. At $x = (1, 1)$ this is $2 + 2 + 3 = 7$; at $x = (1, -1)$ it is $2 - 2 + 3 = 3$. Going the other way, any expression like $x^2 + 4xy + y^2$ comes from a symmetric matrix: put the squared coefficients on the diagonal and split the cross term in half: $\begin{bmatrix}1 & 2\\2 & 1\end{bmatrix}$.

### Positive definite, semidefinite, indefinite
A symmetric matrix $A$ is **positive definite** if $x^TAx > 0$ for every nonzero $x$: the surface $z = x^TAx$ is a bowl with its only lowest point at the origin. It is **positive semidefinite** if $x^TAx \ge 0$ for all $x$: a bowl or a trough. It is **indefinite** if $x^TAx$ takes both signs: a saddle. For $\begin{bmatrix}1 & 2\\2 & 1\end{bmatrix}$, at $(1, -1)$ the form is $1 - 4 + 1 = -2$ while at $(1, 1)$ it is $6$, so it is indefinite. For $\begin{bmatrix}1 & 1\\1 & 1\end{bmatrix}$, the form is $(x_1 + x_2)^2 \ge 0$, which is zero along the whole line $x_2 = -x_1$: semidefinite, a trough.

@fig g03-quadform a=2 b=1 c=3 | The level curves of 2x² + 2xy + 3y² are ellipses: a bowl seen from above.

### Three practical tests
Checking every $x$ is impossible, so we use equivalent tests. **Eigenvalue test:** a symmetric matrix is positive definite exactly when all its eigenvalues are positive. The reason is the spectral theorem: in the orthonormal eigenvector basis, $x^TAx = \lambda_1y_1^2 + \lambda_2y_2^2 + \dots$, which is positive for all nonzero $y$ exactly when every $\lambda_i > 0$. **Determinant test:** for $2\times2$, $A$ is positive definite exactly when $a > 0$ and $ac - b^2 > 0$; for larger matrices, all the upper-left square determinants must be positive. For $\begin{bmatrix}2 & 1\\1 & 3\end{bmatrix}$: $2 > 0$ and $6 - 1 = 5 > 0$, so it is a bowl. **Pivot test:** elimination without row swaps gives all positive pivots.

### Completing the square shows why
Take $2x_1^2 + 2x_1x_2 + 3x_2^2$. Completing the square gives $2(x_1 + \tfrac12x_2)^2 + \tfrac52x_2^2$. Both coefficients, $2$ and $\tfrac52$, are positive, so the sum is positive unless both brackets are zero, which only happens at the origin. Those coefficients are exactly the pivots from elimination, and $2\cdot\tfrac52 = 5$ is the determinant. The tests are all the same idea in different clothing.

### Where positive definite matrices come from
For any matrix $B$, the matrix $B^TB$ is positive semidefinite, because $x^TB^TBx = \|Bx\|^2 \ge 0$. It is positive definite when $B$ has independent columns. Covariance matrices are semidefinite because $v^T\Sigma v$ is the variance of the data projected on $v$, and variances can't be negative. Conversely, every positive definite matrix can be written as $A = LL^T$ with $L$ lower triangular with positive diagonal: the **Cholesky factorisation**. For $\begin{bmatrix}4 & 2\\2 & 5\end{bmatrix}$, $L = \begin{bmatrix}2 & 0\\1 & 2\end{bmatrix}$, since $LL^T = \begin{bmatrix}4 & 2\\2 & 1 + 4\end{bmatrix}$.

:::def Quadratic form
For a symmetric matrix $A$, the function $x^TAx = \sum_{i,j}A_{ij}x_ix_j$. For $A = \begin{bmatrix}2 & 1\\1 & 3\end{bmatrix}$ it is $2x^2 + 2xy + 3y^2$.
:::

:::def Positive definite matrix
A symmetric matrix with $x^TAx > 0$ for every $x \ne 0$; equivalently, all eigenvalues are positive. Positive semidefinite allows $\ge 0$.
:::

:::def Cholesky factorisation
$A = LL^T$ with $L$ lower triangular with positive diagonal entries; it exists exactly when $A$ is symmetric positive definite.
:::

:::warn Common mistakes
- Forgetting to halve the cross term when building $A$ from an expression: $4xy$ means $b = 2$.
- Checking only that the diagonal entries are positive. $\begin{bmatrix}1 & 2\\2 & 1\end{bmatrix}$ has a positive diagonal but is indefinite.
- Checking only $\det A > 0$. $-I$ has determinant $1$ but is negative definite.
- Applying the tests to non-symmetric matrices without symmetrising first.
:::

### Summary
A quadratic form $x^TAx$ uses a symmetric matrix to describe a curved surface. Positive definite means a bowl ($x^TAx > 0$ for $x \ne 0$), semidefinite allows a flat trough, and indefinite means a saddle. Test with eigenvalues (all positive), with $a > 0$ and $\det A > 0$ in $2\times2$, or with positive pivots. $B^TB$ and covariance matrices are always semidefinite, and positive definite matrices factor as $LL^T$.

@viz g03-quadform | Move a, b and c to change the matrix. The panel classifies the form; drag x to read off xᵀAx.

:::explore
**What to try**
1. Start at $a = 2$, $b = 1$, $c = 2$. The level curves are ellipses: a bowl, positive definite.
2. Increase $b$ past $2$. When $ac - b^2$ becomes negative the curves turn into hyperbolas and the panel says indefinite (saddle).
3. Set $a = 1$, $b = 1$, $c = 1$. The level curves become parallel lines: a trough, semidefinite.
4. Drag $x$ around in the saddle case and find points where $x^TAx$ is negative.

**What to notice:** the shape changes exactly when an eigenvalue crosses zero, which is when $ac - b^2$ crosses zero, matching the determinant test in the article.
:::

:::formulas
$$x^TAx = ax_1^2 + 2bx_1x_2 + cx_2^2 \ \ \text{for } A = \begin{bmatrix}a & b\\b & c\end{bmatrix}$$
$$A \succ 0 \iff \text{all } \lambda_i > 0 \iff (2\times2)\ a > 0,\ ac - b^2 > 0$$
$$x^TB^TBx = \|Bx\|^2 \ge 0$$
$$A = LL^T \ (\text{Cholesky})$$
:::

:::thm Eigenvalue test
A symmetric matrix $A$ is positive definite if and only if all its eigenvalues are positive.
:::

:::proof
By the spectral theorem $A = Q\Lambda Q^T$. Let $y = Q^Tx$, which is nonzero exactly when $x$ is. Then $x^TAx = y^T\Lambda y = \sum\lambda_iy_i^2$. This is positive for all nonzero $y$ exactly when every $\lambda_i > 0$ (choose $y = e_i$ to see each $\lambda_i$ must be positive).
:::

:::steps Classify $f(x, y) = x^2 + 4xy + y^2$
1. Matrix: $A = \begin{bmatrix}1 & 2\\2 & 1\end{bmatrix}$ (half of $4$ off the diagonal).
2. $a = 1 > 0$ but $\det A = 1 - 4 = -3 < 0$.
3. Indefinite: a saddle. Check: $f(1, -1) = 1 - 4 + 1 = -2 < 0 < f(1, 1) = 6$.
:::

:::steps Find the Cholesky factor of $A = \begin{bmatrix}9 & 3\\3 & 5\end{bmatrix}$
1. $L = \begin{bmatrix}l_{11} & 0\\l_{21} & l_{22}\end{bmatrix}$ with $l_{11}^2 = 9$, so $l_{11} = 3$.
2. $l_{21}l_{11} = 3$, so $l_{21} = 1$.
3. $l_{21}^2 + l_{22}^2 = 5$, so $l_{22} = 2$. $L = \begin{bmatrix}3 & 0\\1 & 2\end{bmatrix}$; check $LL^T = \begin{bmatrix}9 & 3\\3 & 1 + 4\end{bmatrix}$.
:::

:::mock Exam question
For which values of $k$ is $A = \begin{bmatrix}2 & k\\k & 8\end{bmatrix}$ positive definite? For $k = 4$, find a nonzero $x$ with $x^TAx = 0$.
:::solution
Need $2 > 0$ (true) and $16 - k^2 > 0$, so $-4 < k < 4$. For $k = 4$, $x^TAx = 2x_1^2 + 8x_1x_2 + 8x_2^2 = 2(x_1 + 2x_2)^2$, which is zero for $x = (2, -1)$: check $2(2 - 2)^2 = 0$. So at $k = \pm4$ the matrix is only semidefinite.
:::
:::

:::ml
Near a minimum, a loss behaves like $L(w^* + d) \approx L(w^*) + \frac12d^THd$ with Hessian $H$. If $H$ is positive definite, $w^*$ is a strict local minimum; if indefinite, it is a saddle point, which is very common in deep networks. Kernel matrices in SVMs and Gaussian processes must be positive semidefinite, and Gaussian process libraries solve with Cholesky.
:::

:::cs
Cholesky solves symmetric positive definite systems about twice as fast as LU and is numerically stable without pivoting. To sample from a multivariate Gaussian with covariance $\Sigma = LL^T$, draw standard normals $z$ and return $\mu + Lz$.
:::

:::real
Energy in physics is often a quadratic form: the potential energy of a system of springs is $\frac12x^TKx$ with stiffness matrix $K$. A stable structure needs $K$ positive definite, so every small displacement costs energy.
:::

:::quiz
? For $A = \begin{bmatrix}2 & 1\\1 & 3\end{bmatrix}$ and $x = (1, 1)$, what is $x^TAx$?
= 7
> $2 + 2\cdot1 + 3 = 7$.

? Is $\begin{bmatrix}3 & 1\\1 & 2\end{bmatrix}$ positive definite?
+ Yes
- No
> $3 > 0$ and $\det = 6 - 1 = 5 > 0$.

? The quadratic form $x^2 + 6xy + y^2$ has which off-diagonal matrix entry?
= 3
> Split the cross term: $6/2 = 3$.

? A symmetric matrix has eigenvalues $4$ and $-1$. Its quadratic form is...
- a bowl
+ a saddle
- a trough
> Mixed signs mean indefinite.

? For any matrix $B$, the matrix $B^TB$ is...
+ positive semidefinite
- negative definite
- always indefinite
> $x^TB^TBx = \|Bx\|^2 \ge 0$.

? What is the largest whole number $k$ for which $\begin{bmatrix}1 & k\\k & 10\end{bmatrix}$ is positive definite?
= 3
> Need $10 - k^2 > 0$, so $k^2 < 10$; $k = 3$ works and $k = 4$ does not.
:::

## Lesson: Singular value decomposition {#svd}
@summary: Every matrix is a rotation, a stretch and another rotation. Singular values, low-rank approximation, and why the SVD is everywhere.

### Why the SVD?
Eigenvalues are powerful, but they have limitations: they only exist for square matrices, they can be complex, and not every matrix is diagonalisable. The **singular value decomposition** has none of these problems. Every matrix, of any shape, factors as
$$A = U\Sigma V^T$$
with $U$ and $V$ orthogonal and $\Sigma$ diagonal with nonnegative entries. It is often called the most important factorisation in applied linear algebra. It gives the best low-rank approximation of a matrix (the basis of compression and recommender systems), the pseudoinverse, the condition number, the rank, and PCA itself.

### An everyday scenario
Imagine squeezing a round balloon between your hands at some angle. It turns into an oval. The SVD says that every linear transformation does essentially this: it takes a circle (or sphere) of inputs and turns it into an ellipse (or ellipsoid). There are special perpendicular input directions that end up along the axes of the ellipse, and the lengths of those axes are the **singular values**. Everything else about the matrix is just rotation.

### The geometry: rotate, stretch, rotate
Read $A = U\Sigma V^T$ from right to left as three steps applied to a vector $x$. First $V^T$, an orthogonal matrix, rotates (or reflects) the input so that the special input directions line up with the axes. Then $\Sigma$ stretches each axis by a singular value $\sigma_1 \ge \sigma_2 \ge \dots \ge 0$. Then $U$ rotates the result into its final position. The columns of $V$ are the **right singular vectors** (special input directions), the columns of $U$ are the **left singular vectors** (directions of the ellipse's axes), and
$$Av_i = \sigma_iu_i$$
Each special input direction $v_i$ is sent to the axis $u_i$, stretched by $\sigma_i$. Unlike eigenvectors, the output direction is allowed to be different from the input direction; what's special is that perpendicular inputs go to perpendicular outputs.

@fig svd | Step through Vᵀ, Σ and U: a circle is rotated, stretched into an ellipse, then rotated again.

### How to compute it
The trick is the symmetric matrix $A^TA$. Using $A = U\Sigma V^T$, $A^TA = V\Sigma^TU^TU\Sigma V^T = V\Sigma^T\Sigma V^T$. That is a diagonalisation of $A^TA$! So the right singular vectors $v_i$ are eigenvectors of $A^TA$, and the singular values are the square roots of its eigenvalues, $\sigma_i = \sqrt{\lambda_i}$. Then each $u_i = Av_i/\sigma_i$.

Try $A = \begin{bmatrix}3 & 0\\4 & 5\end{bmatrix}$. Then $A^TA = \begin{bmatrix}25 & 20\\20 & 25\end{bmatrix}$, with trace $50$ and determinant $625 - 400 = 225$, so $\lambda^2 - 50\lambda + 225 = 0$ gives $\lambda = 45$ and $5$. The singular values are $\sigma_1 = \sqrt{45} = 3\sqrt5 \approx 6.71$ and $\sigma_2 = \sqrt5 \approx 2.24$. The eigenvectors are $v_1 = \frac1{\sqrt2}(1, 1)$ and $v_2 = \frac1{\sqrt2}(1, -1)$. Then $u_1 = Av_1/\sigma_1 = \frac{1}{\sqrt2}(3, 9)/(3\sqrt5) = \frac1{\sqrt{10}}(1, 3)$ and $u_2 = Av_2/\sigma_2 = \frac1{\sqrt2}(3, -1)/\sqrt5 = \frac1{\sqrt{10}}(3, -1)$. These are perpendicular: $3 - 3 = 0$. As a check, $\sigma_1\sigma_2 = 3\sqrt5\cdot\sqrt5 = 15 = |\det A|$.

### Rank-one pieces and the best approximation
Multiplying out $U\Sigma V^T$ writes $A$ as a sum of simple rank-one matrices:
$$A = \sigma_1u_1v_1^T + \sigma_2u_2v_2^T + \dots + \sigma_ru_rv_r^T$$
where $r$ is the rank (the number of nonzero singular values). The pieces are ordered by importance. Keeping only the first $k$ terms gives $A_k$, and the **Eckart–Young theorem** says $A_k$ is the closest rank-$k$ matrix to $A$. The error is controlled by the dropped singular values. For a $1000\times1000$ image, keeping 50 terms needs $50(1000 + 1000 + 1) = 100{,}050$ numbers instead of $1{,}000{,}000$, a tenfold saving, and the picture usually still looks good.

### What singular values tell you
The largest singular value $\sigma_1$ is the most $A$ can stretch any unit vector: the **spectral norm** $\|A\|_2$. The sum of squares of all the singular values equals the sum of squares of all entries: $\|A\|_F^2 = \sum\sigma_i^2$. The ratio $\sigma_1/\sigma_n$ is the **condition number**: a large value means $Ax = b$ is sensitive to small errors. For a symmetric positive definite matrix, the SVD and the eigendecomposition coincide.

:::def Singular value decomposition
$A = U\Sigma V^T$ with $U$, $V$ orthogonal and $\Sigma$ diagonal with entries $\sigma_1 \ge \sigma_2 \ge \dots \ge 0$. It exists for every matrix.
:::

:::def Singular values
The numbers $\sigma_i = \sqrt{\lambda_i(A^TA)}$: the lengths of the semi-axes of the ellipse that $A$ makes from the unit circle.
:::

:::warn Common mistakes
- Using eigenvalues of $A$ instead of square roots of eigenvalues of $A^TA$.
- Forgetting that singular values are never negative, even when $\det A < 0$; the sign goes into $U$ or $V$.
- Choosing $u_i$ independently of $v_i$ and getting the signs wrong. Compute $u_i = Av_i/\sigma_i$.
- Thinking the SVD needs a square matrix. It works for every shape.
:::

### SVD versus eigendecomposition
It is worth comparing the two factorisations side by side. The eigendecomposition $A = PDP^{-1}$ uses one basis for both input and output, needs a square matrix, and may involve a $P$ that is far from orthogonal or does not exist at all. The SVD $A = U\Sigma V^T$ uses two different bases, one for inputs and one for outputs, but both are orthonormal, and it always exists. For a symmetric positive definite matrix the two coincide: $U = V = Q$ and the singular values are the eigenvalues. For a symmetric matrix with a negative eigenvalue, the singular value is its absolute value and the sign is absorbed into $U$. Because orthogonal matrices never amplify errors, SVD-based computations are among the most reliable in numerical computing.

### Summary
Every matrix factors as $A = U\Sigma V^T$: rotate, stretch along the axes by the singular values, rotate again. The right singular vectors and squared singular values are the eigenvectors and eigenvalues of $A^TA$, and $u_i = Av_i/\sigma_i$. Writing $A$ as a sum of rank-one pieces $\sigma_iu_iv_i^T$ and keeping the largest gives the best low-rank approximation. The rank is the number of nonzero singular values, $\sigma_1$ is the spectral norm, and $\sigma_1/\sigma_n$ is the condition number.

@viz svd | Step through Vᵀ, Σ and U. The unit circle becomes an ellipse with semi-axes σ₁ and σ₂.

:::explore
**What to try**
1. Step through the three stages slowly. After $V^T$ the circle is just turned; after $\Sigma$ it is an axis-aligned ellipse; after $U$ the ellipse is rotated into place.
2. Change the matrix so it is nearly singular. $\sigma_2$ shrinks and the ellipse becomes a thin cigar.
3. Make the matrix a pure rotation. Both singular values become 1 and the circle stays a circle.

**What to notice:** the semi-axis lengths are always $\sigma_1$ and $\sigma_2$, and their product is the area factor $|\det A|$. A thin ellipse means a large condition number $\sigma_1/\sigma_2$, as described in the article.
:::

:::formulas
$$A = U\Sigma V^T = \sum_{i=1}^r \sigma_iu_iv_i^T$$
$$A^TA = V\Sigma^T\Sigma V^T, \qquad \sigma_i = \sqrt{\lambda_i(A^TA)}$$
$$Av_i = \sigma_iu_i, \qquad \operatorname{rank}A = \#\{\sigma_i > 0\}$$
$$\|A\|_2 = \sigma_1, \quad \|A\|_F^2 = \sum\sigma_i^2, \quad \kappa(A) = \sigma_1/\sigma_n$$
:::

:::thm Eckart–Young
The best rank-$k$ approximation of $A$ in the Frobenius (or spectral) norm is $A_k = \sum_{i=1}^k\sigma_iu_iv_i^T$, with error $\|A - A_k\|_F^2 = \sum_{i>k}\sigma_i^2$.
:::

:::proof
Sketch of the error formula: $A - A_k = \sum_{i>k}\sigma_iu_iv_i^T$, whose SVD has singular values $\sigma_{k+1}, \sigma_{k+2}, \dots$, so its squared Frobenius norm is their sum of squares. That no other rank-$k$ matrix does better is the content of the theorem; the full proof uses the fact that any rank-$k$ matrix has a null space meeting the span of $v_1, \dots, v_{k+1}$.
:::

:::steps Find the SVD of $A = \begin{bmatrix}1 & 1\\1 & 1\end{bmatrix}$
1. $A^TA = \begin{bmatrix}2 & 2\\2 & 2\end{bmatrix}$ has eigenvalues $4$ and $0$, so $\sigma_1 = 2$, $\sigma_2 = 0$. Rank 1.
2. $v_1 = \frac1{\sqrt2}(1, 1)$; $u_1 = Av_1/2 = \frac1{\sqrt2}(1, 1)$.
3. $A = 2u_1v_1^T = 2\cdot\frac12\begin{bmatrix}1 & 1\\1 & 1\end{bmatrix}$, which is $A$.
:::

:::steps Find the singular values of $A = \begin{bmatrix}2 & 0\\0 & -3\end{bmatrix}$ and its condition number
1. $A^TA = \begin{bmatrix}4 & 0\\0 & 9\end{bmatrix}$, so the singular values are $3$ and $2$ (sorted).
2. The minus sign goes into $U$: $u = (0, -1)$ for $v = (0, 1)$.
3. Condition number $3/2 = 1.5$; $\|A\|_F^2 = 4 + 9 = 13 = 3^2 + 2^2$.
:::

:::mock Exam question
For $A = \begin{bmatrix}3 & 0\\4 & 5\end{bmatrix}$, find the singular values and the best rank-one approximation error $\|A - A_1\|_F$. Verify $\|A\|_F^2 = \sigma_1^2 + \sigma_2^2$.
:::solution
From the article, $A^TA$ has eigenvalues $45$ and $5$, so $\sigma_1 = 3\sqrt5$, $\sigma_2 = \sqrt5$. The rank-one error is $\|A - A_1\|_F = \sigma_2 = \sqrt5 \approx 2.24$. Check: $\|A\|_F^2 = 9 + 0 + 16 + 25 = 50 = 45 + 5$.
:::
:::

:::ml
Recommender systems approximate a users-by-items ratings matrix by a low-rank SVD, so each user and item gets a short vector of hidden factors. Latent semantic analysis applies SVD to word-document matrices. LoRA updates and model compression use low-rank factors, and the spectral norm $\sigma_1$ is used to regularise GAN discriminators (spectral normalisation).
:::

:::cs
The pseudoinverse $A^+ = V\Sigma^+U^T$ (invert the nonzero singular values) gives least-squares solutions even when $A^TA$ is singular. Numerical libraries estimate rank by counting singular values above a tolerance, and image and video codecs exploit low-rank structure.
:::

:::real
A photo stored as a matrix of pixel brightnesses can be compressed by keeping its top singular values. Surveillance video is separated into a still background (low rank) and moving people (sparse) using the same ideas.
:::

:::quiz
? What is the larger singular value of $\begin{bmatrix}3 & 0\\0 & -5\end{bmatrix}$?
= 5
> Singular values are $|3|$ and $|-5|$, sorted: $5$ and $3$.

? Singular values are the square roots of the eigenvalues of...
+ $A^TA$
- $A$
- $A + A^T$
> $A^TA = V\Sigma^2V^T$.

? A matrix has singular values $3, 4$. What is $\|A\|_F^2$?
= 25
> $9 + 16 = 25$.

? A matrix has singular values $10, 2, 0, 0$. What is its rank?
= 2
> Count the nonzero singular values.

? Singular values $10$ and $0.1$: what is the condition number?
= 100
> $\sigma_1/\sigma_n = 10/0.1$.

? Does every real matrix, of any shape, have an SVD?
+ Yes
- No
> Unlike diagonalisation, the SVD always exists.
:::

## Lesson: Principal component analysis {#pca}
@summary: Finding the directions in which data varies most, compressing data onto them, and how PCA comes from eigenvectors and the SVD.

### Why PCA?
Real datasets often have many features: hundreds of pixel values, thousands of gene measurements, dozens of survey answers. But features are usually correlated, so the data doesn't really fill all those dimensions. It lies close to a much smaller subspace. **Principal component analysis (PCA)** finds that subspace. It identifies the directions along which the data spreads out most, ranks them by how much spread they capture, and lets you keep only the top few. That gives you compression, noise reduction, faster models, and plots of high-dimensional data in two dimensions. PCA brings together almost everything in this course: centring (vectors), covariance (matrix products), projection, eigenvectors of symmetric matrices, and the SVD.

### An everyday scenario
Imagine measuring the height and arm span of everyone in a class. Plotted, the points form a long, thin, tilted cloud, because tall people tend to have long arms. If you had to describe each student with a single number instead of two, you wouldn't pick height alone or arm span alone. You'd pick their position along the long axis of the cloud, a kind of "overall size" score. The short axis, "arm span relative to height", varies much less and carries less information. PCA finds that long axis automatically, in any number of dimensions.

### Step 1: centre the data
Put the data in a matrix $X$ with one row per example and one column per feature. First subtract the mean of each column, so the cloud is centred at the origin. PCA looks for directions through the centre of the data, so skipping this step gives wrong answers. Here is a tiny centred dataset of four points: $(2, 1)$, $(-2, -1)$, $(1, 2)$, $(-1, -2)$. Each column already averages to zero.

### Step 2: the covariance matrix
The spread of the data along a unit direction $u$ is measured by the variance of the projections $x_i\cdot u$. Because the data is centred, the projections have mean zero, and their variance is $\frac{1}{n-1}\sum(x_i\cdot u)^2 = u^TCu$, where
$$C = \frac{1}{n-1}X^TX$$
is the **covariance matrix**. Its diagonal entries are the variances of the individual features and its off-diagonal entries are covariances, which measure how features move together. For our data, $X^TX = \begin{bmatrix}10 & 8\\8 & 10\end{bmatrix}$ (for example, the top-left entry is $4 + 4 + 1 + 1$ and the off-diagonal is $2 + 2 + 2 + 2$), and with $n - 1 = 3$, $C = \frac13\begin{bmatrix}10 & 8\\8 & 10\end{bmatrix}$. The positive off-diagonal says the two features tend to increase together.

### Step 3: eigenvectors are the principal components
We want the unit vector $u$ that maximises the variance $u^TCu$. Since $C$ is symmetric, the spectral theorem says it has perpendicular unit eigenvectors, and in that basis $u^TCu = \lambda_1y_1^2 + \lambda_2y_2^2$ with $y_1^2 + y_2^2 = 1$. This is largest when all the weight goes on the biggest eigenvalue. So **the direction of maximum variance is the top eigenvector of $C$**, and the variance along it is the top eigenvalue. The next principal component is the best direction perpendicular to the first, which is the second eigenvector, and so on.

For our data, $\begin{bmatrix}10 & 8\\8 & 10\end{bmatrix}$ has eigenvalues $18$ and $2$ with eigenvectors $\frac1{\sqrt2}(1, 1)$ and $\frac1{\sqrt2}(1, -1)$. Dividing by 3, the variances are $6$ along the first principal component (PC1) and $\frac23$ along PC2. The cloud is stretched along the diagonal $y = x$, as you'd expect from the points.

@fig pca | PC1 points along the longest direction of the cloud; PC2 is perpendicular to it.

### Step 4: explained variance and projection
The total variance is the trace of $C$, which equals the sum of the eigenvalues: $6 + \frac23 = \frac{20}{3}$. The fraction captured by PC1 is $\frac{6}{20/3} = \frac{18}{20} = 0.9$. Keeping only PC1 keeps 90% of the spread while halving the number of numbers. To compress, project each centred point onto the chosen components: the PC1 score of $(2, 1)$ is $(2, 1)\cdot\frac1{\sqrt2}(1, 1) = \frac{3}{\sqrt2} \approx 2.12$. To reconstruct an approximation, multiply the score back by the component: $\frac{3}{\sqrt2}\cdot\frac1{\sqrt2}(1, 1) = (1.5, 1.5)$, close to the original $(2, 1)$. In matrix form, with the top $k$ components in the columns of $W$, scores are $Z = XW$ and the reconstruction is $ZW^T$.

### The SVD connection
In practice PCA is computed with the SVD of the centred data, $X = U\Sigma V^T$. Then $X^TX = V\Sigma^2V^T$, so the principal components are the right singular vectors (columns of $V$) and the variances are $\sigma_i^2/(n-1)$. This avoids forming $X^TX$, which is more accurate numerically. The scores are $XV = U\Sigma$.

### Why it works
PCA is the best possible projection in two equivalent senses: the top-$k$ components capture the most variance of any $k$-dimensional subspace, and they minimise the total squared reconstruction error. These are the same because of Pythagoras: each point's squared length splits into the captured part plus the error, so maximising one minimises the other.

:::def Principal component
A unit eigenvector of the data's covariance matrix. The first principal component is the direction of greatest variance; each later one is the direction of greatest variance perpendicular to the earlier ones.
:::

:::def Covariance matrix
For centred data $X$ ($n$ rows), $C = \frac{1}{n-1}X^TX$. Diagonal entries are feature variances; off-diagonal entries are covariances.
:::

:::def Explained variance ratio
$\lambda_i/\sum_j\lambda_j$: the fraction of the total variance captured by component $i$.
:::

:::warn Common mistakes
- Forgetting to centre the data first.
- Running PCA on features with wildly different units (metres and millimetres) without standardising; the largest-unit feature dominates.
- Reading principal components as original features. Each is a mix of features.
- Assuming PCA finds the most useful directions for prediction. It finds the most spread, which may not be what the labels depend on.
:::

### Summary
PCA centres the data, forms the covariance matrix $C = \frac{1}{n-1}X^TX$, and takes its eigenvectors as principal components, ordered by eigenvalue (variance). Keeping the top $k$ components and projecting gives the best $k$-dimensional summary, with explained variance ratio $\sum_{i\le k}\lambda_i/\sum\lambda_i$. Computationally, the components are the right singular vectors of the centred data matrix.

@viz pca | Change the spread and tilt. PC1 (orange) always points along the longest direction. Project to 1-D to compress.

:::explore
**What to try**
1. Make the cloud long and thin. PC1 lines up with its long axis and its share of the variance is close to 100%.
2. Rotate the tilt. PC1 rotates with the cloud: it depends on the data, not on the axes.
3. Make the cloud round. The two variances become similar and PC1's direction becomes unstable: no direction is special.
4. Project to 1-D. Each point drops perpendicularly onto PC1.

**What to notice:** projecting onto PC1 throws away only the short-axis spread, which is the fraction $1 - \lambda_1/(\lambda_1 + \lambda_2)$ from the article. Round clouds can't be compressed well.
:::

:::formulas
$$C = \frac{1}{n-1}X^TX \ \ (X \text{ centred}), \qquad \operatorname{Var}(Xu) = u^TCu$$
$$Cw_i = \lambda_iw_i, \qquad \text{explained ratio} = \frac{\lambda_i}{\sum_j\lambda_j}$$
$$Z = XW_k, \qquad \hat X = ZW_k^T$$
$$X = U\Sigma V^T \Rightarrow \lambda_i = \frac{\sigma_i^2}{n-1}$$
:::

:::thm The top eigenvector maximises variance
For symmetric $C$ with eigenvalues $\lambda_1 \ge \lambda_2 \ge \dots$, the maximum of $u^TCu$ over unit vectors $u$ is $\lambda_1$, attained at the top eigenvector.
:::

:::proof
Write $u = \sum y_iq_i$ in the orthonormal eigenbasis, with $\sum y_i^2 = 1$. Then $u^TCu = \sum\lambda_iy_i^2 \le \lambda_1\sum y_i^2 = \lambda_1$, with equality when $u = q_1$.
:::

:::steps Run PCA on the points $(0, 0)$, $(2, 2)$, $(4, 4)$
1. Mean $(2, 2)$; centred points $(-2, -2)$, $(0, 0)$, $(2, 2)$.
2. $X^TX = \begin{bmatrix}8 & 8\\8 & 8\end{bmatrix}$, eigenvalues $16$ and $0$.
3. PC1 $= \frac1{\sqrt2}(1, 1)$ explains $16/16 = 100\%$: the points lie exactly on a line.
:::

:::steps A 4-feature dataset has covariance eigenvalues $5, 3, 1, 1$. How many components keep at least 80% of the variance?
1. Total $= 10$.
2. One component: $5/10 = 50\%$. Two: $8/10 = 80\%$.
3. Two components are enough.
:::

:::mock Exam question
Centred 2-D data has covariance $C = \begin{bmatrix}5 & 2\\2 & 2\end{bmatrix}$. Find the principal components, the explained variance ratio of PC1, and the PC1 score of the centred point $(1, 3)$.
:::solution
Trace $7$, determinant $10 - 4 = 6$: $\lambda^2 - 7\lambda + 6 = (\lambda - 6)(\lambda - 1)$. For $\lambda = 6$: $C - 6I = \begin{bmatrix}-1 & 2\\2 & -4\end{bmatrix}$, so PC1 $= \frac1{\sqrt5}(2, 1)$. PC2 $= \frac1{\sqrt5}(-1, 2)$ (perpendicular, eigenvalue 1). Ratio $6/7 \approx 0.857$. Score of $(1, 3)$: $\frac{2 + 3}{\sqrt5} = \sqrt5 \approx 2.24$.
:::
:::

:::ml
PCA is used to reduce input dimension before training, to whiten data, and to visualise embeddings and hidden activations in 2-D. Eigenfaces represent faces as combinations of principal components of face images. Autoencoders with linear layers and squared loss learn the same subspace as PCA.
:::

:::cs
For very large datasets, randomised SVD and incremental PCA compute the top components without storing all of $X^TX$. Search engines and databases use PCA-like reductions to speed up nearest-neighbour search.
:::

:::real
Psychologists summarise dozens of personality-survey answers by a few principal factors; the "Big Five" traits emerged from this kind of analysis. Finance uses PCA on interest rates, where three components (level, slope, curvature) explain most daily movements.
:::

:::quiz
? Covariance eigenvalues are $9$ and $1$. What fraction of variance does PC1 explain?
= 9/10|0.9
> $9/(9 + 1)$.

? Before PCA, the data should be...
+ centred (mean subtracted from each feature)
- sorted
- squared
> PCA directions pass through the mean of the data.

? Principal components are eigenvectors of...
+ the covariance matrix
- the data matrix $X$ itself
- the identity
> They maximise $u^TCu$.

? Eigenvalues $6, 3, 1$. How many components are needed to explain at least 90%?
= 2
> $6/10 = 60\%$; $(6 + 3)/10 = 90\%$.

? Are two different principal components perpendicular?
+ Yes
- No
> They are eigenvectors of a symmetric matrix.

? With SVD of centred $X$ ($n = 11$ rows) and $\sigma_1 = 10$, what is the variance along PC1?
= 10
> $\sigma_1^2/(n - 1) = 100/10$.
:::

## Lesson: Tensors and vectorized thinking {#tensors}
@summary: Arrays with any number of axes, shapes, broadcasting, batched matrix multiplication, and why vectorised code is fast.

### Why tensors?
Scalars, vectors and matrices are arrays with zero, one and two axes. Machine learning constantly needs more. A colour image has height, width and three colour channels: three axes. A batch of 32 images adds a fourth. A batch of sentences in a transformer has batch, position and embedding axes. These multi-axis arrays are called **tensors** in ML libraries (PyTorch, TensorFlow, JAX), and fluency with their shapes is one of the most practical skills in the field. Most bugs in model code are shape bugs, and most speed-ups come from replacing loops with whole-tensor operations.

### An everyday scenario
Think of a filing system. A single number is one sticky note. A list of numbers is a row of sticky notes (a vector). A spreadsheet is a grid (a matrix). A binder of spreadsheets, one per month, is three-dimensional: month, row, column. A shelf of binders, one per year, is four-dimensional. Nothing new happens mathematically; you just keep adding labelled axes. A tensor's **shape** is the list of how long each axis is, like "4 years, 12 months, 30 rows, 5 columns".

### Shape, rank and size
In ML usage, a tensor's **rank** (also called `ndim`) is the number of axes, and its shape lists their lengths. A scalar has shape $()$, a vector of length 5 has shape $(5)$, a $3\times4$ matrix has shape $(3, 4)$, and a batch of 32 RGB images of size $224\times224$ has shape $(32, 3, 224, 224)$, rank 4. The total number of entries is the product of the shape: $32\cdot3\cdot224\cdot224 = 4{,}816{,}896$. Be careful: "rank" here means the number of axes, which is different from the rank of a matrix in the earlier lesson. An entry is picked out by one index per axis, like `x[b, c, i, j]`.

:::def Tensor
A multi-dimensional array of numbers. Its shape lists the length of each axis, and its rank (ndim) is the number of axes.
:::

### Reshaping and transposing
A **reshape** reorganises the same numbers into a new shape with the same total size. A tensor of shape $(2, 3, 4)$ holds 24 numbers and can be reshaped to $(6, 4)$, $(24)$ or $(4, 6)$, but not $(5, 5)$. Flattening an image of shape $(28, 28)$ into a vector of length 784 is how classic networks fed images into a dense layer. A **transpose** or **permute** reorders axes: converting images from $(B, H, W, C)$ to $(B, C, H, W)$ moves the channel axis.

### Elementwise operations and broadcasting
Adding or multiplying two tensors of the same shape works entry by entry. **Broadcasting** extends this to different shapes: compare shapes from the right; two axis lengths are compatible if they are equal or one of them is 1, and the length-1 axis is stretched (virtually copied) to match. So a $(3, 1)$ tensor plus a $(1, 4)$ tensor gives $(3, 4)$, and a $(32, 10)$ batch of scores plus a bias of shape $(10)$ adds the same bias to every row. For example, $\begin{bmatrix}1\\2\end{bmatrix} + \begin{bmatrix}10 & 20 & 30\end{bmatrix} = \begin{bmatrix}11 & 21 & 31\\12 & 22 & 32\end{bmatrix}$. Shapes $(3)$ and $(4)$ are not compatible and raise an error.

### Contractions: matrix multiplication generalised
The most important tensor operation is **contraction**: multiply along a shared axis and sum it away. Matrix multiplication contracts the last axis of $A$ with the first of $B$: $(n, m)$ times $(m, p)$ gives $(n, p)$. **Batched** matrix multiplication treats leading axes as batch axes: $(B, n, m)$ times $(B, m, p)$ gives $(B, n, p)$, one matrix product per batch element. Einstein summation notation writes these compactly: `einsum('bij,bjk->bik', A, B)` means "for each $b$, sum over $j$". In a transformer, queries of shape $(B, T, d)$ times transposed keys $(B, d, T)$ give attention scores of shape $(B, T, T)$: one score for every pair of positions in every sequence.

@fig matrix2 preset=rotate | Every grid point is moved by the same matrix: a whole batch of vectors transformed by one operation.

### Vectorised thinking
Suppose you need predictions for 10,000 examples with 100 features. A Python loop computes 10,000 separate dot products, one at a time. The vectorised version stacks the examples in a $(10000, 100)$ matrix $X$ and computes `X @ w` in one call. The answer is identical, but the library runs it in optimised compiled code that uses the CPU's vector units or the GPU's thousands of cores, often 100 times faster or more. Writing code this way means thinking about whole tensors and their shapes, rather than individual numbers. A good habit is to write the shape of every tensor as a comment next to each line.

### Why it works
Tensors are just organised collections of numbers, and tensor operations are the same linear algebra you already know applied many times in parallel. Broadcasting is shorthand for "repeat this operation across an axis". Contraction is the dot product, summed along a chosen axis. Because the operations are uniform, hardware can run them in parallel.

:::warn Common mistakes
- Confusing tensor rank (number of axes) with matrix rank (number of independent columns).
- Reshaping when you meant to transpose. Reshape keeps the memory order; it doesn't swap axes.
- Silent broadcasting bugs: $(32, 1)$ minus $(32)$ gives a $(32, 32)$ tensor, not $(32, 1)$.
- Multiplying with `*` (elementwise) when you meant `@` (matrix product), or the reverse.
:::

### Summary
A tensor is an array with any number of axes; its shape lists the axis lengths and its size is their product. Reshape changes the shape without changing the numbers; transpose reorders axes. Elementwise operations broadcast by stretching length-1 axes. Contractions, including batched matrix multiplication and einsum, multiply along a shared axis and sum it away. Vectorised code applies these to whole tensors at once, which is how ML runs fast.

@viz matrix2 preset=shear | The grid is a batch of points, a tensor of shape (N, 2). One matrix transforms all of them at once.

:::explore
**What to try**
1. Choose **shear** and press **Animate**. Every grid point moves at once: that is one matrix product applied to a whole batch of points.
2. Imagine the grid points stacked as the rows of a matrix $X$ of shape $(N, 2)$. The new points are $XA^T$, also $(N, 2)$.
3. Change the matrix by dragging $\hat\imath$ and $\hat\jmath$. The whole batch updates together, never one point at a time.

**What to notice:** the batch axis $N$ just comes along for the ride while the 2-length axis is contracted with the matrix, exactly the batched-operation idea from the article.
:::

:::formulas
$$\text{size} = \prod_i \text{shape}_i$$
$$(n, m) \times (m, p) \to (n, p), \qquad (B, n, m) \times (B, m, p) \to (B, n, p)$$
$$\text{Broadcast: } (3, 1) + (1, 4) \to (3, 4)$$
$$\langle A, B\rangle = \sum_{i,j}A_{ij}B_{ij} = \operatorname{tr}(A^TB)$$
:::

:::thm Elementwise inner product is a trace
For matrices $A$ and $B$ of the same shape, $\sum_{i,j}A_{ij}B_{ij} = \operatorname{tr}(A^TB)$.
:::

:::proof
The diagonal entry $(j, j)$ of $A^TB$ is $\sum_i(A^T)_{ji}B_{ij} = \sum_iA_{ij}B_{ij}$. Summing over $j$ gives $\sum_{i,j}A_{ij}B_{ij}$.
:::

:::steps A batch of 64 sentences, each 128 tokens, with embeddings of size 512, passes through a linear layer with weight $W$ of shape $(512, 256)$. Find the output shape and the number of weights
1. Input shape $(64, 128, 512)$. The last axis is contracted with the first axis of $W$.
2. Output shape $(64, 128, 256)$.
3. $W$ has $512\cdot256 = 131{,}072$ weights, shared across all 8,192 tokens.
:::

:::steps What shape results from adding tensors of shapes $(8, 1, 5)$ and $(3, 1)$?
1. Align from the right: $(8, 1, 5)$ and $(\ , 3, 1)$.
2. Last axis: 5 vs 1, gives 5. Middle: 1 vs 3, gives 3. First: 8 (missing axis treated as 1).
3. Result $(8, 3, 5)$.
:::

:::mock Exam question
A tensor has shape $(4, 3, 10)$. (a) How many entries does it hold? (b) Can it be reshaped to $(12, 10)$? To $(6, 20)$? To $(7, 17)$? (c) After `x.sum(axis=1)`, what is the shape?
:::solution
(a) $4\cdot3\cdot10 = 120$. (b) $(12, 10)$: yes, $120$ entries. $(6, 20)$: yes, $120$. $(7, 17)$: no, $119 \ne 120$. (c) Summing over axis 1 removes the length-3 axis, giving shape $(4, 10)$.
:::
:::

:::ml
Every layer of a deep network is a tensor operation: convolutions contract image patches with filters, attention contracts queries with keys, and dense layers contract features with weights. Gradients have the same shape as the parameters they belong to, so shape reasoning is also how you check backpropagation code.
:::

:::cs
Tensors are stored as flat memory plus a shape and strides (how far to jump in memory per step along each axis). Transposing usually just changes the strides without copying data, while reshaping a non-contiguous tensor may force a copy. GPUs are built to run the same operation on many entries at once (SIMD), which is why vectorised code is so much faster.
:::

:::code
```python
import numpy as np
x = np.zeros((32, 3, 224, 224)); x.size     # 4816896
a = np.arange(3).reshape(3, 1); b = np.arange(4)
(a + b).shape                                # (3, 4) by broadcasting
A = np.ones((8, 10, 20)); B = np.ones((8, 20, 7))
(A @ B).shape                                # (8, 10, 7)
```
:::

:::real
A colour video is a rank-4 tensor (time, height, width, colour). A weather model stores temperature on a grid of latitude, longitude, altitude and time. A shop's sales database by store, product and day is a rank-3 tensor.
:::

:::quiz
? How many entries does a tensor of shape $(2, 3, 4)$ have?
= 24
> $2\cdot3\cdot4$.

? A batch of images has shape $(B, C, H, W)$. What is its rank (number of axes)?
= 4
> One axis each for batch, channel, height and width.

? Broadcasting shapes $(5, 1)$ and $(1, 3)$ gives...
+ $(5, 3)$
- $(5, 1)$
- an error
> Length-1 axes stretch to match.

? What is the last dimension of $(8, 10, 20) @ (8, 20, 7)$?
= 7
> Batched matmul: $(8, 10, 7)$.

? A $(6, 4)$ tensor is reshaped to $(3, k)$. What is $k$?
= 8
> The size $24$ must be preserved: $24/3 = 8$.

? What is $\sum_{i,j}A_{ij}B_{ij}$ for $A = \begin{bmatrix}1 & 2\\3 & 4\end{bmatrix}$ and $B = I$?
= 5
> Only the diagonal survives: $1 + 4 = \operatorname{tr}(A)$.
:::
