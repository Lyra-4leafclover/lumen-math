---
id: matrix-calculus
title: Matrix Calculus & Backpropagation
tagline: Gradients of vectors and matrices, computational graphs, and how neural networks learn.
desc: The bridge from calculus to deep learning. You'll learn the shapes of derivatives and layout conventions, Jacobians as local linear maps, the core identities for gradients with respect to vectors and matrices, matrix differentials and the trace trick, the vector chain rule, computational graphs and automatic differentiation, and derive backpropagation for linear regression, logistic regression, softmax cross-entropy and a full multilayer network.
color: #8b5cf6
symbol: ∂L
area: ML math
paths: ml
order: 9
---

# Unit: Derivatives with vectors and matrices

## Lesson: Shapes of derivatives {#shapes}
@summary: Scalar-by-vector, vector-by-vector and scalar-by-matrix derivatives, layout conventions, and the shape rule that catches most mistakes.

### Why we need more than one kind of derivative
In single-variable calculus everything is one number. You have an input $x$, an output $y = f(x)$, and the derivative $f'(x)$ tells you how fast $y$ changes when you nudge $x$. That picture is perfect for a ball rolling down a ramp, but it is far too small for machine learning.

Imagine you run a small bakery and you are trying to set the prices of 40 different products. Your weekly profit depends on all 40 prices at once. If someone asks "how sensitive is profit to the price of croissants?", that is one ordinary derivative. But you really want the answer for every product at the same time, neatly organised so you can adjust all 40 prices in one go. The natural way to store those 40 answers is in a list with the same layout as your price list.

A neural network is the same story with millions of knobs instead of 40. Its parameters live in vectors and matrices, and its loss is a single number. Matrix calculus is simply the bookkeeping that tells us how to arrange all those partial derivatives so that the formulas stay short and the shapes line up. Nothing in this course needs new calculus. Every result comes from ordinary partial derivatives, organised cleverly.

### The four basic cases
There are four combinations that come up constantly, depending on whether the input and output are single numbers or vectors.

**Scalar in, scalar out.** This is the familiar derivative $\frac{dy}{dx}$, one number.

**Vector in, scalar out.** Here $f(\mathbf x)$ takes $\mathbf x\in\mathbb{R}^n$ and returns one number. There are $n$ partial derivatives, one per input, and we stack them into the **gradient** $\nabla f(\mathbf x)$, a vector in $\mathbb{R}^n$. For example, if $f(\mathbf x) = x_1^2 + 3x_2$ then $\frac{\partial f}{\partial x_1} = 2x_1$ and $\frac{\partial f}{\partial x_2} = 3$, so $\nabla f = (2x_1, 3)$. At the point $(1, 2)$ the gradient is $(2, 3)$: nudging $x_1$ by a tiny amount $h$ raises $f$ by about $2h$, and nudging $x_2$ raises it by about $3h$.

**Scalar in, vector out.** A curve $\mathbf y(t)$ in space has a velocity $\frac{d\mathbf y}{dt}$, which is just the vector of derivatives of each coordinate. If $\mathbf y(t) = (t^2, 5t)$ then $\frac{d\mathbf y}{dt} = (2t, 5)$.

**Vector in, vector out.** Now $\mathbf y = g(\mathbf x)$ with $\mathbf x\in\mathbb{R}^n$ and $\mathbf y\in\mathbb{R}^m$. Every output can depend on every input, so there are $m\times n$ partial derivatives. We arrange them in an $m\times n$ grid called the **Jacobian**, with row $i$ holding the derivatives of output $y_i$ and column $j$ holding the derivatives with respect to input $x_j$:
$$J_{ij} = \frac{\partial y_i}{\partial x_j}$$
For $\mathbf y = (x_1x_2,\ x_1 + x_2,\ x_2^2)$ we have three outputs and two inputs, so $J$ is $3\times2$. Its first row is $(x_2, x_1)$, its second row is $(1, 1)$, and its third row is $(0, 2x_2)$.

:::def Jacobian matrix
For $g:\mathbb{R}^n\to\mathbb{R}^m$, the $m\times n$ matrix of all first partial derivatives, $J_{ij} = \partial y_i/\partial x_j$. Row $i$ is the gradient of output $i$ (written as a row).
:::

:::def Gradient (of a scalar)
For $f:\mathbb{R}^n\to\mathbb{R}$, the vector $\nabla f = \left(\frac{\partial f}{\partial x_1},\dots,\frac{\partial f}{\partial x_n}\right)$, the same shape as $\mathbf x$. It points in the direction of steepest increase.
:::

### Derivatives with respect to a matrix
Machine learning adds one more important case: a scalar loss $L$ that depends on a whole matrix of weights $W$ with $m$ rows and $n$ columns. Each entry $W_{ij}$ is just another variable, so there are $mn$ partial derivatives $\frac{\partial L}{\partial W_{ij}}$. We store them in a matrix of the same size as $W$, placing the derivative with respect to $W_{ij}$ in position $(i, j)$.

A tiny example makes this concrete. Let $L = \sum_{i,j}W_{ij}^2$, the sum of squares of all entries. Each partial derivative is $\frac{\partial L}{\partial W_{ij}} = 2W_{ij}$, so the whole thing is $\frac{\partial L}{\partial W} = 2W$. If $W$ is $2\times3$, so is $2W$.

The truly awkward case is a vector output with a matrix input. That derivative has three indices (output, row, column), a three-dimensional array. In practice we never build it. Backpropagation is designed so that every derivative we actually store is a scalar's derivative, which keeps everything two-dimensional at most.

### The shape rule
Here is the single most useful habit in this whole course.

:::key The shape rule
The gradient of a scalar with respect to anything has **the same shape as that thing**. $\frac{\partial L}{\partial W}$ is the same shape as $W$, so the update $W \leftarrow W - \eta\frac{\partial L}{\partial W}$ makes sense. When you derive a formula, check that its shape matches. A wrong shape always means a wrong answer.
:::

The rule is not just tidy, it is how optimizers work. Gradient descent subtracts a small multiple of the gradient from the parameter, entry by entry. That only works if the two arrays line up exactly.

The shape rule also lets you guess answers. Suppose $W$ is $m\times n$, $\mathbf x\in\mathbb{R}^n$, and $L = \|W\mathbf x - \mathbf y\|^2$. The answer must be $m\times n$. The natural ingredients are the residual $\mathbf r = W\mathbf x - \mathbf y$ (size $m$) and $\mathbf x$ (size $n$). The only way to combine an $m$-vector and an $n$-vector into an $m\times n$ matrix is the outer product $\mathbf r\mathbf x^T$. The true answer is indeed $2\mathbf r\mathbf x^T$, as you will derive later. The other ordering, $\mathbf x\mathbf r^T$, is $n\times m$ and must be wrong.

### Layout conventions
Different books store these derivatives differently, and this causes endless confusion. In **numerator layout** the Jacobian is $m\times n$ (outputs index the rows), as we defined above. In **denominator layout** it is the transpose, $n\times m$. Neither is wrong, but you must not mix them in one derivation.

In this course we use numerator layout for Jacobians and "same shape as the variable" for gradients of scalars. That pairing is what PyTorch, JAX and NumPy code effectively uses. One consequence is worth remembering: for a scalar function, the Jacobian is a $1\times n$ row, and the gradient is its transpose, an $n\times1$ column.

### Common mistakes
The most common mistake is getting the transpose wrong, for example writing $\mathbf x\mathbf r^T$ instead of $\mathbf r\mathbf x^T$. A shape check catches it instantly. The second mistake is copying a formula from a book that uses the other layout convention, so that every Jacobian comes out transposed. The third is forgetting that a gradient describes the change for a **tiny** nudge: if $\frac{\partial L}{\partial W_{23}} = 0.5$, raising $W_{23}$ by $0.02$ changes $L$ by about $0.01$, but raising it by $10$ need not change $L$ by $5$.

### Summary
A derivative collects every "how much does this output move when I nudge that input" number. A scalar's gradient has the input's shape. A vector function's Jacobian is $m\times n$, outputs by inputs. A scalar's derivative with respect to a matrix is a matrix of the same size. Checking shapes is the fastest way to catch errors in any derivation you will meet.

@viz gradient surface=bowl | Drag the point. The pink arrow is the gradient: one number per input coordinate.

:::explore
**What to try**
1. Drag the point to $(1, 0)$, then to $(0, 1)$. Read off the gradient each time.
2. Drag it to the origin and watch the gradient shrink to $(0, 0)$.
3. Switch the surface to the saddle and repeat.

**What to notice:** the function $f = x^2 + 2y^2$ takes two inputs and returns one number, so its gradient has exactly two entries, the same shape as the input $(x, y)$. That is the shape rule in action. At $(1, 0)$ the gradient is $(2, 0)$ and at $(0, 1)$ it is $(0, 4)$, matching $\nabla f = (2x, 4y)$. Because the gradient lives in the same space as the input, you can draw it as an arrow on the input plane and step against it, which is exactly what gradient descent does.
:::

| Output \\ Input | scalar $x$ | vector $\mathbf x\in\mathbb{R}^n$ | matrix $W\in\mathbb{R}^{m\times n}$ |
|---|---|---|---|
| scalar $y$ | $\frac{dy}{dx}$ scalar | $\nabla_{\mathbf x}y\in\mathbb{R}^n$ | $\frac{\partial y}{\partial W}\in\mathbb{R}^{m\times n}$ |
| vector $\mathbf y\in\mathbb{R}^m$ | $\frac{d\mathbf y}{dx}\in\mathbb{R}^m$ | Jacobian $m\times n$ | 3-D array (avoid) |

:::formulas
$$\nabla f(\mathbf x) = \left(\tfrac{\partial f}{\partial x_1},\dots,\tfrac{\partial f}{\partial x_n}\right)^T\in\mathbb{R}^n$$
$$J_{ij} = \frac{\partial y_i}{\partial x_j},\qquad J\in\mathbb{R}^{m\times n}\ \text{for}\ g:\mathbb{R}^n\to\mathbb{R}^m$$
$$\left(\frac{\partial L}{\partial W}\right)_{ij} = \frac{\partial L}{\partial W_{ij}},\qquad \Delta L\approx\sum_{i,j}\frac{\partial L}{\partial W_{ij}}\Delta W_{ij}$$
:::

:::thm First-order change for matrix variables
If $L$ is differentiable in $W$, then for a small change $\Delta W$,
$$L(W + \Delta W)\approx L(W) + \sum_{i,j}\left(\frac{\partial L}{\partial W}\right)_{ij}\Delta W_{ij} = L(W) + \operatorname{tr}\!\left(\left(\frac{\partial L}{\partial W}\right)^T\Delta W\right).$$
:::

:::proof Why
Treat the $mn$ entries of $W$ as one long vector of variables. The ordinary multivariable linear approximation says the change in $L$ is the sum, over every variable, of its partial derivative times its change. Arranging those partials in the shape of $W$ and using $\operatorname{tr}(A^TB) = \sum_{ij}A_{ij}B_{ij}$ gives the trace form.
:::

:::steps Find the gradient of $f(\mathbf x) = x_1^2x_2 + 3x_2$ at $(1, 2)$
1. Differentiate with respect to $x_1$, treating $x_2$ as a constant: $\frac{\partial f}{\partial x_1} = 2x_1x_2$.
2. Differentiate with respect to $x_2$: $\frac{\partial f}{\partial x_2} = x_1^2 + 3$.
3. Stack them: $\nabla f = (2x_1x_2,\ x_1^2 + 3)$.
4. Plug in $(1, 2)$: $\nabla f = (4, 4)$. Two inputs, two entries.
:::

:::steps Find the Jacobian of $\mathbf y = (x_1x_2,\ x_1 + x_2,\ x_2^2)$ at $(2, 3)$
1. Three outputs, two inputs, so $J$ is $3\times2$.
2. Row 1: $\left(\frac{\partial(x_1x_2)}{\partial x_1}, \frac{\partial(x_1x_2)}{\partial x_2}\right) = (x_2, x_1) = (3, 2)$.
3. Row 2: $(1, 1)$. Row 3: $(0, 2x_2) = (0, 6)$.
4. $J = \begin{bmatrix}3 & 2\\1 & 1\\0 & 6\end{bmatrix}$.
:::

:::steps Use shapes to pick the right formula for $\partial L/\partial W$, with $L = \|W\mathbf x - \mathbf y\|^2$, $W$ of size $4\times3$
1. The answer must be $4\times3$.
2. The residual $\mathbf r = W\mathbf x - \mathbf y$ has size 4 and $\mathbf x$ has size 3.
3. $\mathbf r\mathbf x^T$ is $(4\times1)(1\times3) = 4\times3$. $\mathbf x\mathbf r^T$ is $3\times4$. $\mathbf r^T\mathbf r$ is $1\times1$.
4. Only $\mathbf r\mathbf x^T$ (times a constant) can be right. The exact answer is $2\mathbf r\mathbf x^T$.
:::

:::mock Exam question
Let $f(W) = \mathbf u^TW\mathbf v$ with $\mathbf u = (1, -1)$ and $\mathbf v = (2, 0, 3)$. (a) What shape is $W$, and what shape is $\partial f/\partial W$? (b) Compute $\partial f/\partial W$. (c) If $W_{13}$ increases by $0.1$, by how much does $f$ change?
:::solution
(a) $\mathbf u^TW\mathbf v$ must be $1\times1$, so $W$ is $2\times3$, and so is $\partial f/\partial W$.
(b) $f = \sum_{i,j}u_iW_{ij}v_j$, so $\frac{\partial f}{\partial W_{ij}} = u_iv_j$. That is the outer product $\mathbf u\mathbf v^T = \begin{bmatrix}2 & 0 & 3\\-2 & 0 & -3\end{bmatrix}$.
(c) $\frac{\partial f}{\partial W_{13}} = 3$, so $f$ changes by $3\times0.1 = 0.3$. Since $f$ is linear in $W$ this is exact, not just approximate.
:::
:::

:::ml
Every parameter tensor in PyTorch has a `.grad` attribute with exactly the same shape as the parameter. A linear layer with weight of shape `(out, in)` gets a gradient of shape `(out, in)`, and the optimizer step `p -= lr * p.grad` is the shape rule in code. When you write a custom layer, asserting `grad.shape == param.shape` catches most bugs.
:::

:::cs
Shape errors are the most common runtime error in numerical code. Libraries like NumPy check shapes when you multiply arrays, and tools such as `jaxtyping` let you annotate functions with shapes like `Float[Array, "batch in"]` so that mismatches are caught early.
:::

:::real
A shop that sets prices for many products can estimate how weekly profit changes when each price moves by one cent. Those sensitivities form a list with the same layout as the price list, which is a gradient. A manager can then raise the prices with positive sensitivity and lower those with negative sensitivity, one small step at a time.
:::

:::quiz
? $L$ is a scalar and $W$ is $64\times 128$. What is the shape of $\partial L/\partial W$?
+ $64\times128$
- $128\times64$
- $1\times1$
- $8192\times1$
> By the shape rule, the gradient of a scalar has the same shape as the variable.

? $\mathbf y\in\mathbb{R}^3$ depends on $\mathbf x\in\mathbb{R}^5$. In numerator layout, what is the shape of the Jacobian $\partial\mathbf y/\partial\mathbf x$?
+ $3\times5$
- $5\times3$
- $15\times1$
> Rows are outputs and columns are inputs, so there are 3 rows and 5 columns.

? For $f(\mathbf x) = x_1^2 + 3x_2$, what is $\partial f/\partial x_1$ at the point $(1, 2)$?
= 2
> $\partial f/\partial x_1 = 2x_1 = 2$.

? How many entries does the Jacobian of a function from $\mathbb{R}^4$ to $\mathbb{R}^{10}$ have?
= 40
> It is $10\times4$, one entry for every (output, input) pair.

? $W$ is $m\times n$, $\boldsymbol\delta\in\mathbb{R}^m$ and $\mathbf x\in\mathbb{R}^n$. Which expression has the right shape to be $\partial L/\partial W$?
+ $\boldsymbol\delta\mathbf x^T$
- $\mathbf x\boldsymbol\delta^T$
- $\boldsymbol\delta^T\mathbf x$
> $(m\times1)(1\times n) = m\times n$, the shape of $W$.

? $\partial L/\partial W_{23} = 0.5$. If you increase $W_{23}$ by $0.02$ and leave the rest alone, by about how much does $L$ change?
= 0.01
> First-order change: $0.5\times0.02 = 0.01$.
:::

## Lesson: Jacobians, Hessians and local linear maps {#mc-jacobians}
@summary: Why every smooth vector function looks like a matrix when you zoom in, what the Jacobian's columns and determinant mean, and how the Hessian is the Jacobian of the gradient.

### Zooming in until things look straight
Take any smooth curve, say the graph of $y = x^2$, and zoom in on one point. The more you zoom, the straighter the curve looks, until it is indistinguishable from its tangent line. That is the deepest idea in calculus: smooth functions are **locally linear**. In one variable we write it as
$$f(x + h)\approx f(x) + f'(x)\,h$$
The derivative $f'(x)$ is the slope of the straight line that the function resembles near $x$.

Matrix calculus asks the same question for functions that take a vector in and give a vector out. What is the "straight" thing such a function resembles when you zoom in? It cannot be a single slope, because the output can move in different directions depending on which way you nudge the input. The answer is a **matrix**, and that matrix is the Jacobian.

### An everyday picture: a rubber sheet
Imagine printing a square grid on a sheet of rubber and then stretching and twisting the sheet. Far away, the grid lines become curved and the squares become odd shapes. But look at one tiny square under a magnifying glass. It has become a tiny **parallelogram**, with nearly straight sides. A parallelogram is exactly what a matrix does to a square. So near each point, the stretched sheet behaves like a linear transformation, and the matrix of that transformation is the Jacobian at that point.

Written as a formula, for $F:\mathbb{R}^n\to\mathbb{R}^m$ near a point $\mathbf p$,
$$F(\mathbf p + \boldsymbol\Delta)\approx F(\mathbf p) + J(\mathbf p)\,\boldsymbol\Delta$$
where $J(\mathbf p)$ is the $m\times n$ Jacobian evaluated at $\mathbf p$. This is the one-variable formula with $f'(x)$ replaced by a matrix and $h$ replaced by a small vector.

:::def Linearization
The approximation $F(\mathbf p + \boldsymbol\Delta)\approx F(\mathbf p) + J(\mathbf p)\boldsymbol\Delta$, valid for small $\boldsymbol\Delta$. It replaces a curved map by the best straight (affine) map near $\mathbf p$.
:::

### A worked example with numbers
Let $F(x, y) = (x^2 - y^2,\ 2xy)$. The four partial derivatives are $\frac{\partial}{\partial x}(x^2 - y^2) = 2x$, $\frac{\partial}{\partial y}(x^2 - y^2) = -2y$, $\frac{\partial}{\partial x}(2xy) = 2y$ and $\frac{\partial}{\partial y}(2xy) = 2x$. So
$$J(x, y) = \begin{bmatrix}2x & -2y\\ 2y & 2x\end{bmatrix}$$
At $\mathbf p = (1, 0.5)$ we get $F(\mathbf p) = (1 - 0.25,\ 1) = (0.75, 1)$ and $J = \begin{bmatrix}2 & -1\\1 & 2\end{bmatrix}$.

Now nudge the input by $\boldsymbol\Delta = (0.1, 0)$. The linear prediction is $F(\mathbf p) + J\boldsymbol\Delta = (0.75, 1) + (0.2, 0.1) = (0.95, 1.1)$. The true value is $F(1.1, 0.5) = (1.21 - 0.25,\ 1.1) = (0.96, 1.1)$. The prediction is off by only $0.01$, and that error shrinks like the **square** of the step size: halve the step and the error falls to about a quarter.

### What the columns mean
Look at $J\boldsymbol\Delta$ when $\boldsymbol\Delta$ points along one axis. If $\boldsymbol\Delta = (h, 0)$, then $J\boldsymbol\Delta = h\times(\text{first column of }J)$. So the first column tells you where the output moves when you nudge the first input, and the second column does the same for the second input. In the example the first column $(2, 1)$ says "moving $x$ to the right pushes the output right by twice as much and up by the same amount".

This is the same story as in linear algebra, where a matrix's columns are the images of the basis vectors. The Jacobian is the matrix of the local linear map, so its columns are the images of tiny steps along each axis.

### What the determinant means
For a square Jacobian ($m = n$), the determinant measures how the map scales area (or volume) locally. A tiny square of area $a$ near $\mathbf p$ is mapped to a tiny parallelogram of area about $|\det J(\mathbf p)|\,a$. For our example $\det J = 4x^2 + 4y^2$, which at $(1, 0.5)$ is $4 + 1 = 5$. Little squares near that point come out five times bigger.

A classic case is polar coordinates, $F(r, \theta) = (r\cos\theta,\ r\sin\theta)$. Its Jacobian is $\begin{bmatrix}\cos\theta & -r\sin\theta\\ \sin\theta & r\cos\theta\end{bmatrix}$, whose determinant is $r\cos^2\theta + r\sin^2\theta = r$. That is why the area element in polar coordinates is $r\,dr\,d\theta$: rectangles in the $(r, \theta)$ plane get stretched by a factor $r$.

If $\det J(\mathbf p) = 0$, the map squashes the neighbourhood flat, and it cannot be undone locally. If $\det J < 0$ the map flips orientation, like a mirror.

### Linear maps have a constant Jacobian
If $F(\mathbf x) = A\mathbf x$ for a fixed matrix $A$, then $F_i = \sum_jA_{ij}x_j$ and $\frac{\partial F_i}{\partial x_j} = A_{ij}$. So $J = A$ everywhere. A linear map is its own linearization, which is a good sanity check for any formula you derive.

### The Hessian: the Jacobian of the gradient
For a scalar function $f:\mathbb{R}^n\to\mathbb{R}$, the gradient $\nabla f$ is itself a function from $\mathbb{R}^n$ to $\mathbb{R}^n$. Its Jacobian is an $n\times n$ matrix of second derivatives, called the **Hessian**:
$$H_{ij} = \frac{\partial^2 f}{\partial x_i\,\partial x_j}$$
For $f = x^2y + y^3$ the gradient is $(2xy,\ x^2 + 3y^2)$, and differentiating again gives $H = \begin{bmatrix}2y & 2x\\2x & 6y\end{bmatrix}$. The off-diagonal entries are equal. For smooth functions this is always true, so the Hessian is symmetric. The Hessian describes curvature, and it reappears in Newton's method and in the test for whether a critical point is a minimum.

:::def Hessian matrix
For $f:\mathbb{R}^n\to\mathbb{R}$, the $n\times n$ symmetric matrix of second partial derivatives $H_{ij} = \partial^2f/\partial x_i\partial x_j$. It is the Jacobian of $\nabla f$.
:::

:::warn Common mistakes
Putting inputs on the rows instead of outputs gives the transpose of the Jacobian. Forgetting that $J$ depends on the point: a Jacobian is a matrix-valued **function**, so always say where you evaluate it. Reading $\det J$ as a length scale rather than an area (or volume) scale.
:::

### Summary
Near any point, a smooth map $F$ behaves like the linear map $\boldsymbol\Delta\mapsto J\boldsymbol\Delta$. The columns of $J$ are the images of tiny steps along each input axis, $|\det J|$ is the local area scale, a linear map's Jacobian is the matrix itself, and the Hessian is the Jacobian of the gradient. Backpropagation is built entirely from these local linear maps.

@viz g05-jacobian map=square | Drag the pink point in the input plane, then shrink the square. Blue is the true image; orange dashed is the Jacobian's prediction.

:::explore
**What to try**
1. Leave the point at $(1, 0.5)$ and read $J$ and $\det J$ from the panel. Compare with the article.
2. Drag the square-size slider from 1.5 down to 0.1 and watch the blue and orange grids merge.
3. Move the point close to the origin and watch $\det J$ approach 0.
4. Switch the map to "polar" and check that $\det J$ equals the first coordinate $r$.
5. Switch to "linear" and drag the point anywhere.

**What to notice:** big squares come out curved, but small squares come out as parallelograms that match the orange prediction. The "largest gap" number drops roughly fourfold every time you halve the square, which is the second-order error in the theorem below. For the linear map the gap is always zero and $J$ never changes, because a linear map is its own linearization.
:::

:::formulas
$$F(\mathbf p + \boldsymbol\Delta)\approx F(\mathbf p) + J(\mathbf p)\boldsymbol\Delta$$
$$F(\mathbf x) = A\mathbf x\ \Rightarrow\ J = A$$
$$H_{ij} = \frac{\partial^2f}{\partial x_i\partial x_j},\qquad H = J_{\nabla f}$$
$$f(\mathbf x + \boldsymbol\Delta)\approx f(\mathbf x) + \nabla f^T\boldsymbol\Delta + \tfrac12\boldsymbol\Delta^TH\boldsymbol\Delta$$
$$\text{area}(F(S))\approx|\det J|\cdot\text{area}(S)\ \text{for a small region } S$$
:::

:::thm The linearization error is second order
If $F$ has continuous second derivatives near $\mathbf p$, there is a constant $C$ such that $\|F(\mathbf p + \boldsymbol\Delta) - F(\mathbf p) - J(\mathbf p)\boldsymbol\Delta\|\le C\|\boldsymbol\Delta\|^2$ for all small $\boldsymbol\Delta$.
:::

:::proof Sketch
Apply the one-variable Taylor theorem with remainder to each component along the segment from $\mathbf p$ to $\mathbf p + \boldsymbol\Delta$: $F_i(\mathbf p + \boldsymbol\Delta) = F_i(\mathbf p) + \nabla F_i(\mathbf p)^T\boldsymbol\Delta + \frac12\boldsymbol\Delta^TH_i(\boldsymbol\xi)\boldsymbol\Delta$ for some point $\boldsymbol\xi$ on the segment. The rows $\nabla F_i^T$ form $J$, and the remainders are bounded by $\frac12\max\|H_i\|\,\|\boldsymbol\Delta\|^2$. Combining the components gives the bound.
:::

:::thm Symmetry of second derivatives (Schwarz)
If $f$ has continuous second partial derivatives, then $\frac{\partial^2f}{\partial x_i\partial x_j} = \frac{\partial^2f}{\partial x_j\partial x_i}$, so the Hessian is symmetric.
:::

:::steps Jacobian and area scale of polar coordinates at $(r, \theta) = (2, \pi/2)$
1. $J = \begin{bmatrix}\cos\theta & -r\sin\theta\\ \sin\theta & r\cos\theta\end{bmatrix}$.
2. At $\theta = \pi/2$: $\cos\theta = 0$, $\sin\theta = 1$, so $J = \begin{bmatrix}0 & -2\\1 & 0\end{bmatrix}$.
3. Interpret the columns: nudging $r$ moves the point straight up (radially outward at the top of the circle); nudging $\theta$ moves it left by twice as much (along the circle of radius 2).
4. $\det J = 0\cdot0 - (-2)(1) = 2 = r$. Small regions are stretched by a factor of 2 in area.
:::

:::steps Approximate $F(1.1, 0.5)$ for $F(x, y) = (x^2 - y^2, 2xy)$ using the Jacobian at $(1, 0.5)$
1. $F(1, 0.5) = (0.75, 1)$ and $J = \begin{bmatrix}2 & -1\\1 & 2\end{bmatrix}$.
2. $\boldsymbol\Delta = (0.1, 0)$, so $J\boldsymbol\Delta = (0.2, 0.1)$.
3. Prediction: $(0.95, 1.1)$. True value: $(0.96, 1.1)$.
4. Error $0.01 = (0.1)^2$, consistent with second-order error.
:::

:::steps Hessian of $f(x, y) = x^2y + y^3$ at $(1, 1)$
1. Gradient: $\nabla f = (2xy,\ x^2 + 3y^2)$.
2. Differentiate each component again: $H = \begin{bmatrix}2y & 2x\\2x & 6y\end{bmatrix}$.
3. At $(1, 1)$: $H = \begin{bmatrix}2 & 2\\2 & 6\end{bmatrix}$. It is symmetric, as Schwarz's theorem promises.
:::

:::mock Exam question
Let $F(x, y) = (xy,\ x + y^2)$. (a) Find the Jacobian at $(2, 1)$. (b) Use it to approximate $F(2.1, 0.9)$ and compare with the exact value. (c) What does $\det J(2, 1)$ tell you?
:::solution
(a) $J = \begin{bmatrix}y & x\\1 & 2y\end{bmatrix}$, so $J(2, 1) = \begin{bmatrix}1 & 2\\1 & 2\end{bmatrix}$.
(b) $F(2, 1) = (2, 3)$ and $\boldsymbol\Delta = (0.1, -0.1)$, so $J\boldsymbol\Delta = (0.1 - 0.2,\ 0.1 - 0.2) = (-0.1, -0.1)$. Prediction $(1.9, 2.9)$. Exact: $(2.1\times0.9,\ 2.1 + 0.81) = (1.89, 2.91)$. Both coordinates are off by $0.01$.
(c) $\det J = 1\cdot2 - 2\cdot1 = 0$. Near $(2, 1)$ the map squashes small regions onto (almost) a line, so it is not locally invertible there.
:::
:::

:::ml
Every layer of a network is a vector function, and its Jacobian says how a small change in its input changes its output. **Normalizing flows** generate data by passing noise through invertible layers and use the change-of-variables rule $\log p(\mathbf x) = \log p(\mathbf z) - \log|\det J|$, so they are designed to have cheap Jacobian determinants. The Hessian of the loss describes the curvature of the training landscape and governs which learning rates are stable.
:::

:::cs
Robot arms use the Jacobian of the map from joint angles to hand position. To move the hand by a small $\Delta\mathbf p$, the controller solves $J\Delta\boldsymbol\theta = \Delta\mathbf p$ for the joint changes. Points where $\det J = 0$ are called **singularities**: the arm cannot move its hand in some direction there.
:::

:::real
Flat world maps distort area. The Mercator projection's Jacobian has determinant that grows like $1/\cos^2(\text{latitude})$, which is why Greenland looks as large as Africa even though Africa is about 14 times bigger.
:::

:::quiz
? $F(\mathbf x) = A\mathbf x$ where $A$ is a fixed $3\times2$ matrix. What is the Jacobian of $F$?
+ $A$, at every point
- $A^T$
- $2A$
- It depends on $\mathbf x$
> $F_i = \sum_jA_{ij}x_j$, so $\partial F_i/\partial x_j = A_{ij}$.

? For $F(x, y) = (x^2 - y^2, 2xy)$, what is $\det J$ at $(1, 0)$?
= 4
> $J(1, 0) = \begin{bmatrix}2 & 0\\0 & 2\end{bmatrix}$, so $\det J = 4$.

? In polar coordinates $F(r, \theta) = (r\cos\theta, r\sin\theta)$, what is $\det J$ at $r = 3$?
= 3
> $\det J = r$ for every $\theta$.

? For $f(x, y) = x^2 + 3xy$, what is the Hessian entry $H_{12} = \partial^2f/\partial x\partial y$?
= 3
> $\partial f/\partial x = 2x + 3y$, and differentiating with respect to $y$ gives 3.

? For $f(x, y) = xy$, use the linearization at $(2, 3)$ to estimate $f(2.1, 3)$.
= 6.3
> $\nabla f = (y, x) = (3, 2)$, so $f\approx6 + 3(0.1) + 2(0) = 6.3$. Here it is exact, since $f$ is linear in $x$.

? If $\det J(\mathbf p) = 0$, then near $\mathbf p$ the map...
+ squashes small regions to zero area, so it is not locally invertible
- preserves area exactly
- is a rotation
> A zero determinant means the local linear map collapses at least one direction.
:::

## Lesson: The essential identities {#identities}
@summary: The handful of gradient formulas you will use over and over, each derived from scratch by index notation.

### Why learn a few identities by heart
When you learned arithmetic, you memorised the times tables so you would not have to count on your fingers every time. Matrix calculus has its own small times table: about ten gradient formulas that appear in almost every derivation in machine learning. Knowing them lets you differentiate a loss like $\|X\mathbf w - \mathbf y\|^2 + \lambda\|\mathbf w\|^2$ in one line instead of a page.

But you should never treat them as magic. Every one of them can be derived in a few lines with one reliable method, and we will derive them all here. If you forget one, you can rebuild it in a minute.

### The universal method: go to indices
Any expression built from vectors and matrices can be written as a sum over indices. Once it is a sum of ordinary numbers, you differentiate with respect to one coordinate using normal calculus, and then pack the answers back into a vector or matrix. The method has three steps: **expand** into a sum, **differentiate** with respect to $x_k$ (or $W_{kl}$), **re-pack** into matrix form.

The one fact you need is how to differentiate a variable with respect to another: $\frac{\partial x_i}{\partial x_k}$ is 1 when $i = k$ and 0 otherwise. So in a sum, only the terms that contain $x_k$ survive.

### Linear functions: $\mathbf a^T\mathbf x$
Let $f(\mathbf x) = \mathbf a^T\mathbf x = \sum_ia_ix_i$. Differentiating with respect to $x_k$, every term except $a_kx_k$ disappears, leaving $\frac{\partial f}{\partial x_k} = a_k$. Packing these up, $\nabla_{\mathbf x}(\mathbf a^T\mathbf x) = \mathbf a$. With $\mathbf a = (1, -2, 5)$, $f = x_1 - 2x_2 + 5x_3$ and the gradient is $(1, -2, 5)$, the same at every point. This is the vector version of "the derivative of $ax$ is $a$".

### Squared length: $\mathbf x^T\mathbf x$
Now $f = \sum_ix_i^2$, and $\frac{\partial f}{\partial x_k} = 2x_k$. So $\nabla(\mathbf x^T\mathbf x) = 2\mathbf x$, the vector version of "the derivative of $x^2$ is $2x$". At $\mathbf x = (3, 4)$ the gradient is $(6, 8)$, pointing straight away from the origin, which makes sense: squared length grows fastest when you move outward. The plain length $\|\mathbf x\| = \sqrt{\mathbf x^T\mathbf x}$ has gradient $\frac{\mathbf x}{\|\mathbf x\|}$ by the chain rule, a unit vector pointing outward.

### Quadratic forms: $\mathbf x^TA\mathbf x$
This one matters most, because every quadratic loss has this form. Write $f = \sum_i\sum_jx_iA_{ij}x_j$. The variable $x_k$ appears in two ways: as the left factor (when $i = k$), giving $\sum_jA_{kj}x_j = (A\mathbf x)_k$, and as the right factor (when $j = k$), giving $\sum_ix_iA_{ik} = (A^T\mathbf x)_k$. Adding the two,
$$\nabla_{\mathbf x}(\mathbf x^TA\mathbf x) = (A + A^T)\mathbf x$$
When $A$ is symmetric this is $2A\mathbf x$, the vector version of "the derivative of $ax^2$ is $2ax$".

Check it with numbers. Let $A = \begin{bmatrix}1 & 2\\0 & 3\end{bmatrix}$. Expanding, $f = x_1^2 + 2x_1x_2 + 3x_2^2$, so $\frac{\partial f}{\partial x_1} = 2x_1 + 2x_2$ and $\frac{\partial f}{\partial x_2} = 2x_1 + 6x_2$. At $(1, 1)$ that is $(4, 8)$. The formula gives $(A + A^T)\mathbf x = \begin{bmatrix}2 & 2\\2 & 6\end{bmatrix}\begin{bmatrix}1\\1\end{bmatrix} = (4, 8)$. They agree. Notice that $2A\mathbf x = (6, 6)$ would be wrong here, because this $A$ is not symmetric.

### Least squares: $\|A\mathbf x - \mathbf b\|^2$
Expand the squared norm: $(A\mathbf x - \mathbf b)^T(A\mathbf x - \mathbf b) = \mathbf x^TA^TA\mathbf x - 2\mathbf b^TA\mathbf x + \mathbf b^T\mathbf b$. Use the quadratic-form rule with the symmetric matrix $A^TA$ and the linear rule with $\mathbf a = A^T\mathbf b$:
$$\nabla_{\mathbf x}\|A\mathbf x - \mathbf b\|^2 = 2A^TA\mathbf x - 2A^T\mathbf b = 2A^T(A\mathbf x - \mathbf b)$$
Read it as "transpose of the matrix, times the residual". This shape, $A^T\times(\text{error})$, will appear again and again in backpropagation.

### Gradients with respect to a matrix
For $f(W) = \mathbf u^TW\mathbf v = \sum_{i,j}u_iW_{ij}v_j$, differentiating with respect to $W_{kl}$ leaves only $u_kv_l$. Packing into a matrix gives the outer product $\mathbf u\mathbf v^T$. Similarly $\operatorname{tr}(AX) = \sum_{i,j}A_{ij}X_{ji}$, so $\frac{\partial}{\partial X_{kl}} = A_{lk}$ and the gradient is $A^T$.

### Log-sum-exp gives softmax
In classification we often meet $\operatorname{LSE}(\mathbf z) = \log\sum_je^{z_j}$. Differentiating with respect to $z_k$ by the chain rule gives $\frac{e^{z_k}}{\sum_je^{z_j}}$, which is exactly the $k$-th softmax probability. So $\nabla\operatorname{LSE} = \operatorname{softmax}(\mathbf z)$. For $\mathbf z = (0, \ln3)$, the exponentials are $1$ and $3$, so the gradient is $(\frac14, \frac34)$.

:::tip When stuck, go to indices
Any matrix derivative can be done by writing everything as sums over indices, taking ordinary partial derivatives, and re-packing. It is slower than remembering an identity, but it never fails, and it is the best way to check a formula you found online.
:::

:::warn Common mistakes
Using $2A\mathbf x$ for a non-symmetric $A$ (the correct answer is $(A + A^T)\mathbf x$). Writing $\nabla\|A\mathbf x - \mathbf b\|^2 = 2A(A\mathbf x - \mathbf b)$ without the transpose, which usually does not even have the right shape. Forgetting the factor 2 that comes from a square.
:::

### Why a transpose keeps appearing
You may have noticed that transposes pop up in the answers even when the original expression had none, as in $2A^T(A\mathbf x - \mathbf b)$. There is a simple reason. The matrix $A$ sends inputs (size $n$) to outputs (size $m$). The residual $A\mathbf x - \mathbf b$ lives in the output space, but the gradient must live in the input space, because it has the shape of $\mathbf x$. The only natural way to carry a vector from the output space back to the input space is to multiply by $A^T$, which is $n\times m$. So whenever an error measured at the output of a matrix is turned into a gradient for that matrix's input, expect a transpose. This single observation is the heart of backpropagation: errors travel backwards through each layer by multiplication with the transposed weight matrix.

### Combining identities
Real losses are sums of these building blocks, and gradients add. Take $L(\mathbf w) = \|X\mathbf w - \mathbf y\|^2 + \lambda\|\mathbf w\|^2$, the ridge regression loss. The first term contributes $2X^T(X\mathbf w - \mathbf y)$ by the least-squares identity, and the second contributes $2\lambda\mathbf w$ by the squared-length identity, scaled by the constant $\lambda$. The total gradient is simply the sum. No new calculus was needed, only two lines of the table. The same approach handles a constant factor (it multiplies the gradient), a constant offset (its gradient is zero), and sums over data points (the gradient is the sum of the individual gradients). In practice, almost every derivation in this course is "split the loss into recognisable pieces, look up each piece, add".

It is also worth checking any combined result with a tiny example. If $X$ is the $1\times1$ matrix $[2]$, $y = 4$, $\lambda = 1$ and $w = 1$, then $L = (2 - 4)^2 + 1 = 5$, and the formula gives $2\cdot2\cdot(2 - 4) + 2\cdot1 = -6$. Differentiating $L(w) = (2w - 4)^2 + w^2$ directly gives $4(2w - 4) + 2w = -6$ at $w = 1$. A one-dimensional check like this takes seconds and catches most sign and transpose errors.

### Summary
Linear terms have constant gradients ($\mathbf a$), squares give a factor of two ($2\mathbf x$), quadratic forms give $(A + A^T)\mathbf x$, least squares gives $2A^T(\text{residual})$, bilinear forms in a matrix give outer products, and log-sum-exp gives softmax. All of them come from the same three steps: expand, differentiate, re-pack.

@viz gradient surface=bowl | The bowl is $f = \mathbf x^TA\mathbf x$ with $A = \operatorname{diag}(1, 2)$. Drag the point and compare the arrow with $2A\mathbf x$.

:::explore
**What to try**
1. Drag the point to $(1, 1)$. The identity predicts $\nabla f = 2A\mathbf x = (2, 4)$. Check the panel.
2. Drag it to $(-1.5, 0.5)$ and predict the gradient before you look: $(-3, 2)$.
3. Switch to the saddle, which is $\mathbf x^TA\mathbf x$ with $A = \operatorname{diag}(1, -1)$, and predict $(2x, -2y)$.

**What to notice:** the gradient of a quadratic form is a **linear** function of $\mathbf x$: double the distance from the origin and the arrow doubles. On the bowl the arrow always points uphill and away from the minimum at the origin. On the saddle the second component flips sign, because the negative entry of $A$ makes $f$ decrease in the $y$ direction.
:::

:::formulas
$$\nabla_{\mathbf x}(\mathbf a^T\mathbf x) = \mathbf a \qquad \nabla_{\mathbf x}(\mathbf x^T\mathbf x) = 2\mathbf x \qquad \nabla_{\mathbf x}\|\mathbf x\| = \frac{\mathbf x}{\|\mathbf x\|}$$
$$\nabla_{\mathbf x}(\mathbf x^TA\mathbf x) = (A + A^T)\mathbf x \ \ (= 2A\mathbf x \text{ if } A \text{ symmetric})$$
$$\frac{\partial (A\mathbf x)}{\partial \mathbf x} = A \qquad \nabla_{\mathbf x}\|A\mathbf x - \mathbf b\|^2 = 2A^T(A\mathbf x - \mathbf b)$$
$$\frac{\partial}{\partial W}(\mathbf u^TW\mathbf v) = \mathbf u\mathbf v^T \qquad \frac{\partial}{\partial X}\operatorname{tr}(AX) = A^T \qquad \frac{\partial}{\partial X}\operatorname{tr}(X^TA) = A$$
$$\nabla_{\mathbf z}\log\textstyle\sum_j e^{z_j} = \operatorname{softmax}(\mathbf z)$$
:::

:::thm Normal equations
If $\mathbf w$ minimises $L(\mathbf w) = \|X\mathbf w - \mathbf y\|^2$, then $X^TX\mathbf w = X^T\mathbf y$. If $X$ has independent columns, the unique minimiser is $\mathbf w = (X^TX)^{-1}X^T\mathbf y$.
:::

:::proof Proof
$L$ is a convex quadratic (its Hessian $2X^TX$ is positive semidefinite), so a point is a minimiser exactly when the gradient is zero. Setting $\nabla L = 2X^T(X\mathbf w - \mathbf y) = 0$ gives $X^TX\mathbf w = X^T\mathbf y$. Independent columns make $X^TX$ invertible, giving the unique solution.
:::

:::steps Derive $\nabla_{\mathbf x}(\mathbf x^TA\mathbf x)$ by index notation
1. Expand: $f = \sum_i\sum_j x_iA_{ij}x_j$.
2. Differentiate with respect to $x_k$. Terms with $i = k$ give $\sum_j A_{kj}x_j$; terms with $j = k$ give $\sum_i x_iA_{ik}$.
3. So $\frac{\partial f}{\partial x_k} = (A\mathbf x)_k + (A^T\mathbf x)_k$.
4. Re-pack: $\nabla f = (A + A^T)\mathbf x$.
:::

:::steps Ridge regression in three lines
1. $L(\mathbf w) = \|X\mathbf w - \mathbf y\|^2 + \lambda\|\mathbf w\|^2$.
2. $\nabla L = 2X^T(X\mathbf w - \mathbf y) + 2\lambda\mathbf w$.
3. Set to zero: $(X^TX + \lambda I)\mathbf w = X^T\mathbf y$. For $\lambda > 0$ the matrix is always invertible.
:::

:::steps Gradient of log-sum-exp at $\mathbf z = (1, 1, 1 + \ln 2)$
1. $\nabla\operatorname{LSE} = \operatorname{softmax}(\mathbf z)$, and softmax ignores a common shift, so subtract 1: $(0, 0, \ln2)$.
2. Exponentials: $(1, 1, 2)$, which sum to 4.
3. Gradient $= (\frac14, \frac14, \frac12)$. The entries are positive and sum to 1.
:::

:::mock Exam question
Let $f(\mathbf x) = \mathbf x^TA\mathbf x - 2\mathbf b^T\mathbf x$ with $A = \begin{bmatrix}2 & 0\\0 & 4\end{bmatrix}$ and $\mathbf b = (2, 4)$. Find $\nabla f$, the minimiser, and the minimum value.
:::solution
$A$ is symmetric, so $\nabla f = 2A\mathbf x - 2\mathbf b$. Setting it to zero gives $A\mathbf x = \mathbf b$, so $\mathbf x = (2/2, 4/4) = (1, 1)$. Since $A$ is positive definite this is the minimum. The value is $\mathbf x^TA\mathbf x - 2\mathbf b^T\mathbf x = (2 + 4) - 2(2 + 4) = -6$.
:::
:::

:::ml
Linear regression, ridge regression, Gaussian log-likelihoods, Gaussian process marginal likelihoods and the second-order Taylor model of any loss are all quadratic forms, so these identities give their gradients directly. The softmax identity is the reason the cross-entropy gradient is so simple, as you will see in the losses lesson.
:::

:::real
A delivery company that fits travel time as a linear function of distance, traffic and weather solves exactly the normal equations $X^TX\mathbf w = X^T\mathbf y$, derived here with one identity. Spreadsheet "trendline" features do the same thing behind the scenes.
:::

:::quiz
? $\nabla_{\mathbf x}(3\mathbf x^T\mathbf x)$ is...
+ $6\mathbf x$
- $3\mathbf x$
- $3$
- $6$
> $\nabla(\mathbf x^T\mathbf x) = 2\mathbf x$, times 3.

? If $f(\mathbf x) = \mathbf a^T\mathbf x$ with $\mathbf a = (1, -2, 5)$, what is $\partial f/\partial x_3$?
= 5
> The gradient of $\mathbf a^T\mathbf x$ is $\mathbf a$.

? For a non-symmetric matrix $A$, $\nabla_{\mathbf x}(\mathbf x^TA\mathbf x)$ equals...
- $2A\mathbf x$
+ $(A + A^T)\mathbf x$
- $A^T\mathbf x$
> $\mathbf x$ appears on both sides of $A$, which produces one $A$ term and one $A^T$ term.

? Let $A = \begin{bmatrix}1 & 0\\0 & 2\end{bmatrix}$, $\mathbf b = (1, 1)$, $\mathbf x = (1, 1)$. What is the second component of $\nabla\|A\mathbf x - \mathbf b\|^2$?
= 4
> Residual $(0, 1)$; $2A^T(0, 1) = (0, 4)$.

? $\frac{\partial}{\partial W}(\mathbf u^TW\mathbf v)$ equals...
+ $\mathbf u\mathbf v^T$
- $\mathbf v\mathbf u^T$
- $\mathbf u^T\mathbf v$
> $\partial/\partial W_{kl} = u_kv_l$, the $(k, l)$ entry of $\mathbf u\mathbf v^T$.

? What is the first component of $\nabla_{\mathbf z}\log(e^{z_1} + e^{z_2})$ at $\mathbf z = (0, 0)$?
= 0.5|1/2
> It is $\operatorname{softmax}(0, 0) = (\frac12, \frac12)$.
:::

## Lesson: Matrix differentials and the trace trick {#differentials}
@summary: A fast, reliable way to differentiate products, inverses and determinants of matrices: write the differential, turn it into a trace, read off the gradient.

### When index notation gets painful
Index notation always works, but some expressions make it miserable. Try differentiating $\log\det\Sigma$ with respect to a covariance matrix $\Sigma$, or $\operatorname{tr}(X^{-1}A)$ with respect to $X$, by writing out every sum. You will fill a page with indices and probably make a mistake. Statisticians and machine learning researchers use a cleaner tool called **matrix differentials**. It works like the product rule you already know, plus one trick with the trace, and it turns most matrix derivatives into a few lines of algebra.

Imagine you are tuning a recipe that has many ingredients arranged in a table. Instead of asking "what happens if I change this one cell?" for every cell separately, you ask "if I change the whole table by a tiny amount $dW$, what is the tiny change in the result?" The answer is always a linear expression in $dW$, and the gradient can be read straight off that expression.

### What a differential is
For a function of one variable, the differential is $df = f'(x)\,dx$: a small change in input times the slope. For a scalar function of a vector it is $df = \nabla f^T d\mathbf x = \sum_i\frac{\partial f}{\partial x_i}dx_i$. For a scalar function of a matrix it is
$$dL = \sum_{i,j}G_{ij}\,dW_{ij} = \operatorname{tr}(G^T dW),\qquad G = \frac{\partial L}{\partial W}$$
So the whole game is: manipulate $dL$ until it looks like $\operatorname{tr}(M\,dW)$ for some matrix $M$. Then the gradient is $G = M^T$.

:::def Matrix differential
The first-order change $dF$ of a matrix (or vector, or scalar) expression $F$ caused by a small change $dX$ in its argument. It is linear in $dX$, and obeys the same sum and product rules as ordinary differentials.
:::

### The rules
Differentials obey rules you already know, with one caution: matrices do not commute, so you must keep the order of factors.

1. Constants: $dA = 0$.
2. Sums: $d(X + Y) = dX + dY$.
3. Products: $d(XY) = (dX)Y + X(dY)$. Keep $dX$ in the place where $X$ was.
4. Transpose and trace: $d(X^T) = (dX)^T$ and $d\operatorname{tr}(X) = \operatorname{tr}(dX)$.

The product rule is the one people get wrong. In ordinary calculus $d(xy) = y\,dx + x\,dy$ and the order does not matter. For matrices, writing $Y\,dX$ instead of $(dX)Y$ is an error, because $Y\,dX$ and $(dX)Y$ are usually different matrices.

### Three facts about the trace
The trace (sum of diagonal entries) has three properties that make the method work. First, a scalar is its own trace: $a = \operatorname{tr}(a)$ for a $1\times1$ matrix. Second, the trace is **cyclic**: $\operatorname{tr}(ABC) = \operatorname{tr}(CAB) = \operatorname{tr}(BCA)$, as long as the shapes allow the products. Third, $\operatorname{tr}(A^T) = \operatorname{tr}(A)$. Cyclic means you may rotate factors from the back to the front. It does **not** mean you may swap any two factors: $\operatorname{tr}(ABC)$ is generally not $\operatorname{tr}(BAC)$.

### A first example
Take $L = \mathbf a^TX\mathbf b$. Differentiate: $dL = \mathbf a^T(dX)\mathbf b$. This is a scalar, so wrap it in a trace and rotate $\mathbf b$ to the front: $dL = \operatorname{tr}(\mathbf a^T\,dX\,\mathbf b) = \operatorname{tr}(\mathbf b\mathbf a^T\,dX)$. Now it has the form $\operatorname{tr}(M\,dX)$ with $M = \mathbf b\mathbf a^T$, so the gradient is $M^T = \mathbf a\mathbf b^T$. That matches the identity from the previous lesson, with no indices at all.

### The least-squares gradient for a matrix
Let $L = \|W\mathbf x - \mathbf y\|^2 = \mathbf r^T\mathbf r$ with $\mathbf r = W\mathbf x - \mathbf y$. Then $d\mathbf r = (dW)\mathbf x$, and $dL = 2\mathbf r^Td\mathbf r = 2\mathbf r^T(dW)\mathbf x = \operatorname{tr}(2\mathbf x\mathbf r^T\,dW)$. So $\frac{\partial L}{\partial W} = (2\mathbf x\mathbf r^T)^T = 2\mathbf r\mathbf x^T$. This is the outer product the shape rule predicted in the first lesson.

### The inverse
Start from $XX^{-1} = I$ and take differentials of both sides with the product rule: $(dX)X^{-1} + X\,d(X^{-1}) = 0$. Solving,
$$d(X^{-1}) = -X^{-1}(dX)X^{-1}$$
For a $1\times1$ matrix this says $d(1/x) = -dx/x^2$, the familiar derivative of $1/x$. With $x = 2$ and $dx = 0.01$, it predicts the change $-0.0025$, and indeed $1/2.01 - 1/2\approx-0.00249$.

### The determinant
The determinant measures volume scaling, and its differential is given by **Jacobi's formula**:
$$d\det X = \det X\cdot\operatorname{tr}(X^{-1}dX)$$
Reading off the gradient gives $\frac{\partial\det X}{\partial X} = \det X\cdot X^{-T}$, and dividing by $\det X$ gives the very useful
$$\frac{\partial\log\det X}{\partial X} = X^{-T}$$
For $1\times1$ matrices that is the familiar rule $\frac{d}{dx}\ln x = \frac1x$.

Check with numbers. Let $X = \begin{bmatrix}2 & 0\\0 & 3\end{bmatrix}$, so $\det X = 6$. Increase the top-left entry by $0.1$. The new determinant is $2.1\times3 = 6.3$, a change of $0.3$. Jacobi's formula gives $6\cdot\operatorname{tr}\!\left(X^{-1}dX\right)$, where $X^{-1}dX$ has only one nonzero entry, $\frac12\times0.1 = 0.05$, on its diagonal. So the predicted change is $6\times0.05 = 0.3$. Exactly right.

:::key The recipe
1. Write the differential $dL$ using the sum and product rules, keeping factors in order.
2. Wrap the scalar $dL$ in a trace.
3. Use the cyclic property to move $dW$ to the far right: $dL = \operatorname{tr}(M\,dW)$.
4. Read off $\frac{\partial L}{\partial W} = M^T$.
:::

:::warn Common mistakes
Swapping the order of factors in the product rule. Forgetting the final transpose when reading off the gradient (the gradient is $M^T$, not $M$). Treating the trace as fully commutative: you may rotate factors cyclically, but not swap two of them at will. Writing $d(X^{-1}) = -X^{-2}dX$, which is only true when $X$ and $dX$ commute.
:::

### Why this is worth learning
The differential method scales. A derivation that would take a page of indices becomes a few lines, and each line is a rule you can check. It also mirrors how automatic differentiation libraries are written: each operation, such as a matrix product, an inverse or a determinant, comes with a rule describing how a small change in its inputs produces a small change in its output. When you understand the rules here, you can read the source code of those libraries, and you can derive the gradient of a new custom layer before trusting a framework to do it for you.

### Summary
A differential is the linear first-order change of an expression. Products follow the ordered product rule, inverses obey $d(X^{-1}) = -X^{-1}dX\,X^{-1}$, determinants obey Jacobi's formula, and $\log\det X$ has gradient $X^{-T}$. To get any gradient, write $dL = \operatorname{tr}(M\,dW)$ and transpose $M$.

@viz matrix2 preset=scale | The yellow square's area is $|\det A|$. Drag one column handle a little and watch how the determinant responds.

:::explore
**What to try**
1. Pick the scale preset, note $\det A$, then drag the pink handle a small distance to the right (increasing the top-left entry $a$).
2. Predict the change before you look: for $A = \begin{bmatrix}a & b\\c & d\end{bmatrix}$, $\frac{\partial\det A}{\partial a} = d$, the vertical height of the blue column.
3. Drag the blue handle upward instead, increasing $d$; the change in $\det A$ should be about $a$ times the step.
4. Make the two columns nearly parallel and watch $\det A$ head to 0.

**What to notice:** the sensitivity of the area to each entry is exactly the matrix $\det A\cdot A^{-T} = \begin{bmatrix}d & -c\\-b & a\end{bmatrix}$ from Jacobi's formula. Near a singular matrix the determinant is small, so $\log\det A$ changes very fast, which is why $X^{-T}$ blows up there.
:::

:::formulas
$$dL = \operatorname{tr}(G^TdW)\iff G = \frac{\partial L}{\partial W};\qquad dL = \operatorname{tr}(M\,dW)\Rightarrow\frac{\partial L}{\partial W} = M^T$$
$$d(XY) = (dX)Y + X(dY)\qquad d(X^T) = (dX)^T\qquad \operatorname{tr}(ABC) = \operatorname{tr}(CAB)$$
$$d(X^{-1}) = -X^{-1}(dX)X^{-1}$$
$$d\det X = \det X\operatorname{tr}(X^{-1}dX)\qquad \frac{\partial\log\det X}{\partial X} = X^{-T}$$
$$\frac{\partial}{\partial X}\operatorname{tr}(X^TAX) = (A + A^T)X\qquad\frac{\partial}{\partial X}\operatorname{tr}(AX^{-1}) = -X^{-T}A^TX^{-T}$$
:::

:::thm Reading off the gradient
If $dL = \operatorname{tr}(M\,dW)$ for every small $dW$, then $\frac{\partial L}{\partial W} = M^T$.
:::

:::proof Proof
$\operatorname{tr}(M\,dW) = \sum_i(M\,dW)_{ii} = \sum_i\sum_jM_{ij}dW_{ji}$. The coefficient of $dW_{ji}$ is $M_{ij}$, so $\frac{\partial L}{\partial W_{ji}} = M_{ij} = (M^T)_{ji}$.
:::

:::thm Jacobi's formula
For invertible $X$, $d\det X = \det X\cdot\operatorname{tr}(X^{-1}dX)$.
:::

:::proof Sketch
$\det(X + dX) = \det X\cdot\det(I + X^{-1}dX)$. For a small matrix $E$, $\det(I + E) = \prod_i(1 + \lambda_i(E))\approx1 + \sum_i\lambda_i(E) = 1 + \operatorname{tr}E$ to first order. With $E = X^{-1}dX$, subtracting $\det X$ leaves $\det X\operatorname{tr}(X^{-1}dX)$.
:::

:::steps Find $\frac{\partial}{\partial X}\operatorname{tr}(X^TAX)$
1. Product rule: $d\operatorname{tr}(X^TAX) = \operatorname{tr}((dX)^TAX) + \operatorname{tr}(X^TA\,dX)$.
2. A trace equals the trace of its transpose: $\operatorname{tr}((dX)^TAX) = \operatorname{tr}(X^TA^TdX)$.
3. So $dL = \operatorname{tr}(X^T(A^T + A)\,dX)$, with $M = X^T(A + A^T)$.
4. Gradient: $M^T = (A + A^T)X$. For a single column $X = \mathbf x$ this is the quadratic-form identity.
:::

:::steps Check $d(X^{-1})$ on $X = \begin{bmatrix}2 & 0\\0 & 4\end{bmatrix}$ when $X_{11}$ grows by $0.1$
1. $X^{-1} = \begin{bmatrix}0.5 & 0\\0 & 0.25\end{bmatrix}$ and $dX$ has a single entry $0.1$ in position $(1,1)$.
2. $-X^{-1}dX\,X^{-1}$ has a single entry $-0.5\times0.1\times0.5 = -0.025$ in position $(1,1)$.
3. Exact: $1/2.1 - 1/2 = -0.0238$. The first-order prediction is close, and gets closer for smaller steps.
:::

:::steps Gradient of the Gaussian log-likelihood term $-\frac12\log\det\Sigma$
1. $d\left(-\tfrac12\log\det\Sigma\right) = -\tfrac12\operatorname{tr}(\Sigma^{-1}d\Sigma)$.
2. So $M = -\frac12\Sigma^{-1}$ and the gradient is $-\frac12\Sigma^{-T} = -\frac12\Sigma^{-1}$, since a covariance matrix is symmetric.
3. Combined with the gradient of the data term, setting the total to zero gives the familiar estimate $\hat\Sigma = \frac1n\sum_i(\mathbf x_i - \boldsymbol\mu)(\mathbf x_i - \boldsymbol\mu)^T$.
:::

:::mock Exam question
Let $L(W) = \|W\mathbf x - \mathbf y\|^2$ with $W = I$ ($2\times2$), $\mathbf x = (1, 2)$ and $\mathbf y = (1, 1)$. (a) Use differentials to show $\frac{\partial L}{\partial W} = 2(W\mathbf x - \mathbf y)\mathbf x^T$. (b) Evaluate it. (c) Predict the change in $L$ if $W_{22}$ decreases by $0.05$.
:::solution
(a) $dL = 2\mathbf r^T(dW)\mathbf x = \operatorname{tr}(2\mathbf x\mathbf r^TdW)$ with $\mathbf r = W\mathbf x - \mathbf y$, so the gradient is $(2\mathbf x\mathbf r^T)^T = 2\mathbf r\mathbf x^T$.
(b) $\mathbf r = (1, 2) - (1, 1) = (0, 1)$, so $2\mathbf r\mathbf x^T = \begin{bmatrix}0 & 0\\2 & 4\end{bmatrix}$.
(c) $\Delta L\approx4\times(-0.05) = -0.2$. Exact: $L$ goes from $1$ to $(1.9 - 1)^2 = 0.81$, a change of $-0.19$.
:::
:::

:::ml
Fitting a multivariate Gaussian, Gaussian processes, and variational inference all need $\frac{\partial}{\partial\Sigma}\log\det\Sigma = \Sigma^{-1}$ and the inverse rule. Normalizing flows need gradients of $\log|\det J|$. Autodiff libraries implement exactly these differential rules for `inv`, `det`, `slogdet` and `solve`.
:::

:::cs
Numerically, never form $X^{-1}$ just to use it once. Compute $X^{-1}\mathbf b$ with a linear solve and $\log\det X$ from a Cholesky or LU factorization (it is the sum of the logs of the diagonal factors). These are faster and far more accurate.
:::

:::real
Economists use the Leontief input-output model, where total production is $(I - A)^{-1}\mathbf d$ for an industry-requirements matrix $A$ and demand $\mathbf d$. The inverse rule $d(I - A)^{-1} = (I - A)^{-1}(dA)(I - A)^{-1}$ tells planners how total output across the economy shifts when one industry becomes more efficient.
:::

:::quiz
? Which equality always holds when the products are defined?
+ $\operatorname{tr}(ABC) = \operatorname{tr}(CAB)$
- $\operatorname{tr}(ABC) = \operatorname{tr}(BAC)$
- $\operatorname{tr}(AB) = \operatorname{tr}(A)\operatorname{tr}(B)$
> The trace is invariant under cyclic rotations only.

? If $dL = \operatorname{tr}(M\,dW)$ for all $dW$, then $\partial L/\partial W$ is...
- $M$
+ $M^T$
- $M^{-1}$
> $\operatorname{tr}(M\,dW) = \sum_{i,j}M_{ij}dW_{ji}$, so the coefficient of $dW_{ji}$ is $M_{ij}$.

? Which is the correct differential of a product of matrices?
+ $d(XY) = (dX)Y + X(dY)$
- $d(XY) = Y(dX) + X(dY)$
- $d(XY) = (dX)(dY)$
> Keep each factor in its original position; matrices do not commute.

? For $X = \begin{bmatrix}2 & 0\\0 & 4\end{bmatrix}$, what is the $(1,1)$ entry of $\partial\log\det X/\partial X$?
= 0.5|1/2
> The gradient is $X^{-T}$, whose $(1,1)$ entry is $\frac12$.

? For $X = \begin{bmatrix}3 & 1\\2 & 5\end{bmatrix}$, what is $\partial\det X/\partial X_{11}$?
= 5
> $\det X = X_{11}X_{22} - X_{12}X_{21}$, so the derivative with respect to $X_{11}$ is $X_{22} = 5$.

? Using $d(1/x) = -dx/x^2$, estimate the change in $1/x$ when $x$ goes from 4 to 4.1.
= -0.00625|-1/160
> $-0.1/16 = -0.00625$.
:::

## Lesson: The vector chain rule {#vector-chain}
@summary: Jacobians multiply along a chain, and for a scalar loss the gradient flows backwards as a sequence of cheap vector-Jacobian products.

### From one chain to many
In single-variable calculus the chain rule says that if $y = g(x)$ and $z = f(y)$, then $\frac{dz}{dx} = \frac{dz}{dy}\cdot\frac{dy}{dx}$. Rates of change multiply. If converting euros to dollars multiplies by $1.1$ and converting dollars to yen multiplies by $150$, converting euros to yen multiplies by $1.1\times150 = 165$.

A neural network is a long chain of such conversions, except that each stage turns a whole vector into another vector. The question of this lesson is: what replaces "multiply the rates" when every stage has many inputs and many outputs? The answer is beautifully simple. Each stage is locally a linear map, its Jacobian. Doing one linear map after another is the same as multiplying their matrices. So **Jacobians multiply**.

### The rule
If $\mathbf y = g(\mathbf x)$ and $\mathbf z = f(\mathbf y)$, then
$$J_{f\circ g}(\mathbf x) = J_f(g(\mathbf x))\,J_g(\mathbf x)$$
The order matters: the Jacobian of the **last** function goes on the **left**, just as in the composition $f(g(\mathbf x))$. And $J_f$ is evaluated at the intermediate point $\mathbf y = g(\mathbf x)$, not at $\mathbf x$. The shapes always fit: if $\mathbf x\in\mathbb{R}^n$, $\mathbf y\in\mathbb{R}^m$ and $\mathbf z\in\mathbb{R}^k$, then $J_f$ is $k\times m$, $J_g$ is $m\times n$, and the product is $k\times n$.

### A numerical example
Let $g(x_1, x_2) = (x_1 + x_2,\ x_1x_2)$ and $f(y_1, y_2) = y_1^2 + y_2$. At $\mathbf x = (1, 2)$ the intermediate point is $\mathbf y = (3, 2)$. The Jacobians are $J_g = \begin{bmatrix}1 & 1\\x_2 & x_1\end{bmatrix} = \begin{bmatrix}1 & 1\\2 & 1\end{bmatrix}$ and $J_f = \begin{bmatrix}2y_1 & 1\end{bmatrix} = \begin{bmatrix}6 & 1\end{bmatrix}$. Multiplying, $J_fJ_g = \begin{bmatrix}6 + 2 & 6 + 1\end{bmatrix} = \begin{bmatrix}8 & 7\end{bmatrix}$.

Check it directly. The composite is $h = (x_1 + x_2)^2 + x_1x_2$, so $\frac{\partial h}{\partial x_1} = 2(x_1 + x_2) + x_2 = 8$ and $\frac{\partial h}{\partial x_2} = 2(x_1 + x_2) + x_1 = 7$. Same answer.

### Scalar losses and the transpose
In machine learning the very last function is a scalar loss $L$. Its Jacobian is a $1\times m$ row, and the gradient is the column version. Transposing the chain rule $J_{L\circ g} = J_LJ_g$ gives the form we will use constantly:
$$\nabla_{\mathbf x}L = J_g^T\,\nabla_{\mathbf y}L$$
In words: to turn the gradient with respect to a layer's **output** into the gradient with respect to its **input**, multiply by the transposed Jacobian of that layer. We write $\bar{\mathbf y} = \nabla_{\mathbf y}L$ for this "upstream gradient" and call $J^T\bar{\mathbf y}$ a **vector-Jacobian product**, or VJP.

:::def Vector-Jacobian product (VJP)
For a function $\mathbf y = g(\mathbf x)$ and an upstream gradient $\bar{\mathbf y}$, the vector $\bar{\mathbf x} = J_g^T\bar{\mathbf y}$. It is the gradient of $L$ with respect to $\mathbf x$, computed without ever forming $J_g$ when $g$ has structure.
:::

### Why the order of multiplication matters
Suppose a network has three layers, each with a $1000\times1000$ Jacobian, followed by a scalar loss. The gradient is $J_1^TJ_2^TJ_3^T\bar{\mathbf y}_3$. You could multiply the matrices first, which costs about $10^9$ multiply-adds per matrix-matrix product. Or you could start from the vector on the right, so that every step is a matrix times a **vector**, costing about $10^6$ each. That is a thousand times cheaper. Backpropagation is exactly this choice: start at the scalar loss and pass a vector backwards.

### VJPs for the layers you will meet
The best part is that common layers have VJPs that are even cheaper than a matrix-vector product with a full Jacobian.

**Linear layer** $\mathbf y = W\mathbf x$. The Jacobian with respect to $\mathbf x$ is $W$, so $\bar{\mathbf x} = W^T\bar{\mathbf y}$. The gradient for the weights is $\bar W = \bar{\mathbf y}\mathbf x^T$, an outer product. For $W = \begin{bmatrix}1 & 2\\3 & 4\end{bmatrix}$, $\mathbf x = (1, 1)$ and $\bar{\mathbf y} = (1, -1)$: $\bar{\mathbf x} = (1 - 3,\ 2 - 4) = (-2, -2)$ and $\bar W = \begin{bmatrix}1 & 1\\-1 & -1\end{bmatrix}$.

**Elementwise function** $\mathbf y = \sigma(\mathbf x)$, applied to each entry. Output $i$ depends only on input $i$, so the Jacobian is diagonal with entries $\sigma'(x_i)$. Multiplying by a diagonal matrix is just multiplying entry by entry: $\bar{\mathbf x} = \bar{\mathbf y}\odot\sigma'(\mathbf x)$, where $\odot$ is the elementwise (Hadamard) product. For ReLU, $\sigma'$ is 1 where the input was positive and 0 elsewhere, so the gradient simply passes through the active units and is blocked at the inactive ones.

### When paths split and merge
Sometimes one variable feeds into several places. Then the gradients from every path **add**. If $L = u + v$ with $u = 2x$ and $v = x^2$, then $\frac{dL}{dx} = 2 + 2x$: one contribution through $u$, one through $v$. In a network this happens with shared weights and with residual connections, and autodiff systems handle it by accumulating (summing) gradients.

:::warn Common mistakes
Multiplying Jacobians in the wrong order ($J_gJ_f$ instead of $J_fJ_g$). Evaluating $J_f$ at $\mathbf x$ instead of at $g(\mathbf x)$. Building a full diagonal Jacobian for an elementwise function instead of multiplying elementwise. Forgetting to add the contributions when a variable is used more than once.
:::

### A two-layer picture in words
It helps to tell the whole story once without symbols. Picture a small network that takes an input vector, multiplies it by a weight matrix, squashes each entry with a nonlinearity, multiplies by a second weight matrix and finally scores the result with a loss. On the forward pass, numbers flow left to right and each stage remembers what it received. On the backward pass, a single vector flows right to left. It starts as the gradient of the loss with respect to the final output. At the second weight matrix it is multiplied by that matrix's transpose, which carries it back into the space of hidden units. At the nonlinearity it is multiplied entry by entry by the slopes of the squashing function at the values remembered from the forward pass. At the first weight matrix it is multiplied by that transpose, which carries it back to the input. Along the way, each weight matrix receives its own gradient as an outer product of the vector arriving from the right and the input it remembered from the left.

Every one of those steps is a vector-Jacobian product, and the whole backward pass costs about as much as the forward pass. Nothing more is going on inside the largest language models, only with many more layers and much bigger matrices. Once you are comfortable with the chain rule as a product of local linear maps, backpropagation is simply bookkeeping.

### Summary
Composing functions multiplies their Jacobians, last function on the left. For a scalar loss, gradients travel backwards as $\bar{\mathbf x} = J^T\bar{\mathbf y}$. Linear layers give $\bar{\mathbf x} = W^T\bar{\mathbf y}$ and $\bar W = \bar{\mathbf y}\mathbf x^T$, elementwise layers give $\bar{\mathbf x} = \bar{\mathbf y}\odot\sigma'(\mathbf x)$, and gradients from separate paths add.

@viz g05-jacobian map=tanh | The map is a tiny layer $\tanh(W\mathbf v)$. Its Jacobian is $\operatorname{diag}(1 - \tanh^2(W\mathbf v))\,W$, a product of two Jacobians.

:::explore
**What to try**
1. Drag the point to the origin. Since $\tanh'(0) = 1$, the panel should show $J = W = \begin{bmatrix}1 & 0.5\\-0.5 & 1\end{bmatrix}$.
2. Drag the point far to the upper right, say $(2, 1.5)$, and watch the entries of the first row shrink.
3. Shrink the square and confirm that the orange (linear) and blue (true) grids agree near any point.

**What to notice:** the chain rule says $J = D\,W$ where $D$ is the diagonal Jacobian of tanh. Near the origin $D\approx I$, so the layer acts like $W$. Where tanh saturates, $D$ has entries close to 0, the whole row of $J$ is squashed, and the output barely responds. Gradients flowing back through $J^T$ get squashed the same way. Stack many such layers and you get the vanishing-gradient problem.
:::

:::formulas
$$J_{f\circ g}(\mathbf x) = J_f(g(\mathbf x))\,J_g(\mathbf x)$$
$$\nabla_{\mathbf x}L = J_g^T\,\nabla_{\mathbf y}L\qquad(\bar{\mathbf x} = J^T\bar{\mathbf y})$$
$$\mathbf y = W\mathbf x:\quad\bar{\mathbf x} = W^T\bar{\mathbf y},\quad\bar W = \bar{\mathbf y}\mathbf x^T$$
$$\mathbf y = \sigma(\mathbf x)\ \text{elementwise}:\quad\bar{\mathbf x} = \bar{\mathbf y}\odot\sigma'(\mathbf x)$$
:::

:::thm Chain rule for Jacobians
If $g$ is differentiable at $\mathbf x$ and $f$ is differentiable at $g(\mathbf x)$, then $f\circ g$ is differentiable at $\mathbf x$ and $J_{f\circ g}(\mathbf x) = J_f(g(\mathbf x))J_g(\mathbf x)$.
:::

:::proof Sketch
Linearize each map: $g(\mathbf x + \boldsymbol\Delta)\approx g(\mathbf x) + J_g\boldsymbol\Delta$ and $f(\mathbf y + \boldsymbol\delta)\approx f(\mathbf y) + J_f\boldsymbol\delta$. Substituting $\boldsymbol\delta = J_g\boldsymbol\Delta$ gives $f(g(\mathbf x + \boldsymbol\Delta))\approx f(g(\mathbf x)) + J_fJ_g\boldsymbol\Delta$. The error terms are smaller than $\|\boldsymbol\Delta\|$, so $J_fJ_g$ is the derivative.
:::

:::thm VJP of a linear layer
For $\mathbf y = W\mathbf x$ and scalar $L$ with $\bar{\mathbf y} = \nabla_{\mathbf y}L$: $\nabla_{\mathbf x}L = W^T\bar{\mathbf y}$ and $\frac{\partial L}{\partial W} = \bar{\mathbf y}\mathbf x^T$.
:::

:::proof Proof
$dL = \bar{\mathbf y}^Td\mathbf y$ and $d\mathbf y = (dW)\mathbf x + W\,d\mathbf x$. The $d\mathbf x$ part is $\bar{\mathbf y}^TW\,d\mathbf x = (W^T\bar{\mathbf y})^Td\mathbf x$. The $dW$ part is $\bar{\mathbf y}^T(dW)\mathbf x = \operatorname{tr}(\mathbf x\bar{\mathbf y}^TdW)$, whose gradient is $(\mathbf x\bar{\mathbf y}^T)^T = \bar{\mathbf y}\mathbf x^T$.
:::

:::steps Backward through $\mathbf y = \operatorname{ReLU}(W\mathbf x)$ with $W = \begin{bmatrix}1 & 2\\-1 & 1\end{bmatrix}$, $\mathbf x = (2, 1)$, $\bar{\mathbf y} = (1, 1)$
1. Forward: $\mathbf z = W\mathbf x = (4, -1)$, so $\mathbf y = (4, 0)$.
2. ReLU VJP: $\bar{\mathbf z} = \bar{\mathbf y}\odot\mathbb 1[\mathbf z > 0] = (1, 0)$.
3. Linear VJP: $\bar{\mathbf x} = W^T\bar{\mathbf z} = (1, 2)$.
4. Weight gradient: $\bar W = \bar{\mathbf z}\mathbf x^T = \begin{bmatrix}2 & 1\\0 & 0\end{bmatrix}$. The inactive unit's row gets no gradient.
:::

:::steps Count the cost: three $1000\times1000$ Jacobians and a scalar loss
1. Matrix first: $J_1^TJ_2^T$ costs about $1000^3 = 10^9$ multiply-adds, and so does the next product.
2. Vector first: $J_3^T\bar{\mathbf y}$, then $J_2^T(\cdot)$, then $J_1^T(\cdot)$, each about $10^6$.
3. Total: about $2\times10^9$ versus $3\times10^6$, roughly 700 times cheaper. That is why backprop works from the loss backwards.
:::

:::mock Exam question
Let $\mathbf y = W\mathbf x$ and $L = \frac12\|\mathbf y - \mathbf t\|^2$, with $W = \begin{bmatrix}2 & 0\\1 & 1\end{bmatrix}$, $\mathbf x = (1, 2)$ and $\mathbf t = (1, 1)$. Find $\bar{\mathbf y}$, $\bar W$ and $\bar{\mathbf x}$, and check one entry of $\bar{\mathbf x}$ directly.
:::solution
Forward: $\mathbf y = (2, 3)$. Then $\bar{\mathbf y} = \mathbf y - \mathbf t = (1, 2)$. Weight gradient $\bar W = \bar{\mathbf y}\mathbf x^T = \begin{bmatrix}1 & 2\\2 & 4\end{bmatrix}$. Input gradient $\bar{\mathbf x} = W^T\bar{\mathbf y} = \begin{bmatrix}2 & 1\\0 & 1\end{bmatrix}\begin{bmatrix}1\\2\end{bmatrix} = (4, 2)$. Check: $L = \frac12[(2x_1 - 1)^2 + (x_1 + x_2 - 1)^2]$, so $\frac{\partial L}{\partial x_2} = x_1 + x_2 - 1 = 2$. Correct.
:::
:::

:::ml
Every operation in PyTorch or JAX registers a VJP rule (PyTorch calls it `backward`, JAX calls it `vjp`). The framework only ever multiplies upstream gradients by these rules; it never builds a full Jacobian. Forward-mode products $J\mathbf v$ (JVPs) are also available and are used for things like Hessian-vector products.
:::

:::cs
Choosing where to start multiplying a chain of matrices is the classic **matrix-chain multiplication** problem, solved by dynamic programming. Reverse-mode autodiff is the special case where the chain ends in a $1\times m$ row, so starting from that end is always optimal.
:::

:::real
A bicycle's gears are a chain rule. The pedal turns the front gear, which turns the chain, which turns the rear gear, which turns the wheel. The wheel's speed per pedal turn is the product of the gear ratios along the way, exactly like multiplying derivatives.
:::

:::quiz
? For $h = f\circ g$, the Jacobian $J_h(\mathbf x)$ equals...
+ $J_f(g(\mathbf x))\,J_g(\mathbf x)$
- $J_g(\mathbf x)\,J_f(g(\mathbf x))$
- $J_f(\mathbf x)\,J_g(\mathbf x)$
> Last function on the left, evaluated at the intermediate point.

? Let $g(x) = (x, x^2)$ and $f(y_1, y_2) = y_1y_2$. Using the chain rule, what is $\frac{d}{dx}f(g(x))$ at $x = 2$?
= 12
> $J_f = [y_2, y_1] = [4, 2]$ and $J_g = (1, 2x) = (1, 4)$, so $4\cdot1 + 2\cdot4 = 12$. Directly, $f(g(x)) = x^3$ with derivative $3x^2 = 12$.

? For $\mathbf y = W\mathbf x$ with upstream gradient $\bar{\mathbf y}$, the gradient for $W$ is...
+ $\bar{\mathbf y}\mathbf x^T$
- $W^T\bar{\mathbf y}$
- $\mathbf x\bar{\mathbf y}^T$
> Shape check: $\bar{\mathbf y}$ is $m\times1$, $\mathbf x^T$ is $1\times n$, giving $m\times n$ like $W$.

? The Jacobian of an elementwise function like ReLU applied to a vector is...
+ diagonal
- all ones
- symmetric but dense
> Output $i$ depends only on input $i$.

? $L = u + v$ where $u = 3x$ and $v = x^2$. What is $dL/dx$ at $x = 1$?
= 5
> The two paths add: $3 + 2x = 5$.

? $W = \begin{bmatrix}1 & 2\\3 & 4\end{bmatrix}$ and $\bar{\mathbf y} = (1, 0)$. What is the second entry of $\bar{\mathbf x} = W^T\bar{\mathbf y}$?
= 2
> $W^T\bar{\mathbf y}$ is the first row of $W$ written as a column: $(1, 2)$.
:::

# Unit: Backpropagation

## Lesson: Computational graphs and automatic differentiation {#autodiff}
@summary: Break any computation into tiny steps, then push derivatives forward (forward mode) or pull them backward (reverse mode) to get exact gradients cheaply.

### A receipt you can read backwards
Imagine a café bill. The coffee costs 3 euros, you buy 2, a 1 euro service fee is added, and then a 4 euro voucher is subtracted. Every step is simple: a multiplication, an addition, a subtraction. If the café owner asks "how much does the final bill change if the coffee price goes up by one cent?", you could recompute the whole bill, but you could also walk back through the steps: the voucher and the fee do not depend on the price, and the multiplication by 2 doubles any change. So the bill rises by two cents.

Computers differentiate in exactly this way. They do not manipulate formulas symbolically, and they do not guess with finite differences. They record the sequence of elementary operations that produced the answer and apply the chain rule one step at a time. This technique is called **automatic differentiation**, or autodiff, and it is the engine inside every deep learning library.

### The computational graph
Take the loss $L = (wx + b - y)^2$ of a one-weight linear model. Break it into elementary steps, each with a name:
$$u = wx,\qquad v = u + b,\qquad e = v - y,\qquad L = e^2$$
Drawn as a picture, each step is a node and arrows show which values feed which. This picture is the **computational graph**. With $w = 3$, $x = 2$, $b = 1$ and $y = 4$, the forward pass gives $u = 6$, $v = 7$, $e = 3$ and $L = 9$.

:::def Computational graph
A directed acyclic graph whose nodes are elementary operations (add, multiply, exp, ReLU, ...) and whose edges carry intermediate values from one operation to the next. Evaluating the nodes in order is the forward pass.
:::

The important point is that every node is simple, and simple operations have derivatives we know. A multiply node $u = wx$ has local derivatives $\partial u/\partial w = x$ and $\partial u/\partial x = w$. An add node has local derivatives 1 and 1. A subtract node has $1$ and $-1$. A square node has $2e$. That is all the calculus we need.

### Forward mode: carry the derivative along
One way to differentiate is to carry, next to every value, its derivative with respect to one chosen input. Suppose we want $\partial L/\partial w$. Seed $\dot w = 1$ (and $\dot x = \dot b = \dot y = 0$). Then apply the local rules in the forward direction: $\dot u = x\dot w + w\dot x = 2$, $\dot v = \dot u + \dot b = 2$, $\dot e = \dot v - \dot y = 2$, and $\dot L = 2e\,\dot e = 2\cdot3\cdot2 = 12$. So $\partial L/\partial w = 12$.

This is **forward-mode** autodiff. It is simple and needs no extra memory, but it gives the derivative with respect to only one input per pass. A network with a million weights would need a million passes.

### Reverse mode: pull the derivative back
The alternative runs the chain rule from the output backwards. For every value $v$ define its **adjoint** $\bar v = \partial L/\partial v$, the sensitivity of the final loss to that value. Start with $\bar L = 1$ and walk the graph in reverse:

The square node gives $\bar e = 2e\cdot\bar L = 6$. The subtract node passes the adjoint on: $\bar v = \bar e = 6$ and $\bar y = -\bar e = -6$. The add node copies it to both inputs: $\bar u = 6$ and $\bar b = 6$. The multiply node swaps its inputs: $\bar w = \bar u\cdot x = 12$ and $\bar x = \bar u\cdot w = 18$.

One backward pass produced the derivative with respect to **every** input at once. We can check one: $L = (2w + 1 - 4)^2 = (2w - 3)^2$ as a function of $w$, so $dL/dw = 4(2w - 3) = 12$ at $w = 3$. Correct.

:::def Reverse-mode automatic differentiation
Computing the derivatives of one scalar output with respect to all inputs by one backward sweep over the computational graph, propagating adjoints $\bar v = \partial L/\partial v$. Its cost is a small constant times the cost of the forward pass. Backpropagation is reverse mode applied to neural networks.
:::

### Three patterns that cover everything
Watching the backward pass, three patterns appear again and again. An **add** node distributes its adjoint unchanged to all its inputs. A **multiply** node sends each input the adjoint times the **other** input. And when one value is used in several places (a **fan-out**), its adjoint is the **sum** of the adjoints arriving from each use. For example, for $f = x\cdot x$ at $x = 3$, each of the two uses sends back $\bar f\cdot x = 3$, and the total is $6 = 2x$, as it should be.

### Why reverse mode wins for machine learning
A loss is one number that depends on many parameters. Forward mode needs one pass per parameter; reverse mode needs one pass in total. The price of reverse mode is memory: the backward pass needs the intermediate values from the forward pass (we used $x$, $w$ and $e$ above), so they must be stored. For deep networks this memory for stored activations is often the limiting factor on batch size.

### Checking gradients numerically
Hand-derived or newly implemented gradients should always be checked against a **central difference**:
$$\frac{\partial L}{\partial w}\approx\frac{L(w + h) - L(w - h)}{2h}$$
For our example with $h = 0.01$: $L(3.01) = 3.02^2 = 9.1204$ and $L(2.99) = 2.98^2 = 8.8804$, so the estimate is $0.24/0.02 = 12$. The central difference has error proportional to $h^2$, while the one-sided version $(L(w + h) - L(w))/h$ has error proportional to $h$, so the central form is far more accurate. Use it for testing only; it costs two forward passes per parameter.

:::warn Common mistakes
Overwriting an adjoint instead of adding to it when a value is used twice. Forgetting that a subtraction sends a negative adjoint to its second input. Using a step $h$ so tiny (like $10^{-12}$) that rounding error swamps the difference; around $10^{-5}$ is a good choice in double precision. Treating finite differences as a training method: they are a check, not a replacement.
:::

### Summary
A computational graph breaks a calculation into elementary steps with known local derivatives. Forward mode carries one derivative forward per pass. Reverse mode carries adjoints backwards and gets every partial derivative of a scalar output in one pass, at the cost of storing intermediate values. Add nodes copy adjoints, multiply nodes swap inputs, and fan-outs sum. Always confirm gradients with a central difference.

@viz g05-compgraph graph=linear | The graph of $L = (wx + b - y)^2$. Values flow forward; press Backward step to send adjoints back one node at a time.

:::explore
**What to try**
1. With the defaults $w = 3$, $x = 2$, $b = 1$, $y = 4$, read the forward values: $u = 6$, $v = 7$, $e = 3$, $L = 9$.
2. Press Backward step repeatedly and predict each adjoint before it appears: $\bar e = 6$, then $\bar v = 6$, then $\bar u = \bar b = 6$, then $\bar w = 12$ and $\bar x = 18$.
3. Compare $\bar w$ with the numerical central-difference estimate shown below the graph.
4. Change $b$ until $e = 0$ (try $b = -2$). All adjoints become 0: at the minimum, nothing needs to change.

**What to notice:** each step uses only the local rule of one node and the adjoint arriving from its right, exactly the three patterns in the article. The multiply node really does swap: $\bar w$ is multiplied by $x$ and $\bar x$ by $w$.
:::

:::formulas
$$\bar v = \frac{\partial L}{\partial v},\qquad\bar L = 1,\qquad\bar v = \sum_{c\,\in\,\text{children}(v)}\bar c\,\frac{\partial c}{\partial v}$$
$$c = a + b:\ \bar a\mathrel{+}=\bar c,\ \bar b\mathrel{+}=\bar c\qquad c = ab:\ \bar a\mathrel{+}=\bar c\,b,\ \bar b\mathrel{+}=\bar c\,a$$
$$\text{forward mode: }\dot c = \sum_{p\,\in\,\text{parents}(c)}\frac{\partial c}{\partial p}\dot p$$
$$\frac{L(w + h) - L(w - h)}{2h} = \frac{dL}{dw} + O(h^2)$$
:::

:::thm Cheap gradient principle
If a scalar function $f$ is evaluated by a program of elementary operations, reverse-mode autodiff computes the full gradient $\nabla f$ with a cost that is at most a small constant (around 3 to 5) times the cost of evaluating $f$, independent of the number of inputs.
:::

:::proof Sketch
Each elementary operation has a fixed number of inputs, so its backward rule does a constant amount of work: a few multiplications and additions into the adjoints of its inputs. The backward pass visits every operation once, so its total cost is a constant times the number of operations, which is the cost of the forward pass.
:::

:::thm Accuracy of the central difference
If $L$ has a continuous third derivative, then $\frac{L(w + h) - L(w - h)}{2h} = L'(w) + O(h^2)$.
:::

:::proof Proof
By Taylor's theorem, $L(w\pm h) = L(w)\pm hL'(w) + \frac{h^2}2L''(w)\pm\frac{h^3}6L'''(\xi_\pm)$. Subtracting cancels the even terms, leaving $2hL'(w) + O(h^3)$. Dividing by $2h$ gives the result.
:::

:::steps Forward mode for $\partial L/\partial x$ in $L = (wx + b - y)^2$ at $w = 3, x = 2, b = 1, y = 4$
1. Seed $\dot x = 1$ and all other inputs 0.
2. $\dot u = w\dot x = 3$, $\dot v = \dot u = 3$, $\dot e = \dot v = 3$.
3. $\dot L = 2e\,\dot e = 2\cdot3\cdot3 = 18$, matching $\bar x = 18$ from reverse mode.
:::

:::steps Reverse mode with a fan-out: $f = (x + y)\,y$ at $x = 1$, $y = 2$
1. Forward: $a = x + y = 3$ and $f = a\,y = 6$.
2. Backward from $\bar f = 1$. Multiply node: $\bar a = \bar f\,y = 2$ and the direct contribution to $\bar y$ is $\bar f\,a = 3$.
3. Add node: $\bar x = \bar a = 2$, and $y$ receives another $\bar a = 2$.
4. Sum the two uses of $y$: $\bar y = 3 + 2 = 5$. Check: $f = xy + y^2$, so $\partial f/\partial y = x + 2y = 5$.
:::

:::mock Exam question
For $L = (wx + b - y)^2$ with $w = 2$, $x = -1$, $b = 4$, $y = 1$: (a) run the forward pass; (b) run the backward pass to get $\bar w$, $\bar x$, $\bar b$, $\bar y$; (c) a model has one million parameters and a scalar loss. How many reverse passes and how many forward-mode passes are needed for the full gradient?
:::solution
(a) $u = -2$, $v = 2$, $e = 1$, $L = 1$.
(b) $\bar e = 2e = 2$, $\bar v = 2$, $\bar y = -2$, $\bar b = 2$, $\bar u = 2$, $\bar w = \bar u\,x = -2$, $\bar x = \bar u\,w = 4$. Check: $dL/dw = 2(wx + b - y)x = 2\cdot1\cdot(-1) = -2$.
(c) One reverse pass, versus one million forward-mode passes.
:::
:::

:::ml
PyTorch records a graph as your code runs and `loss.backward()` performs reverse mode over it; JAX's `grad` does the same by tracing your function. Because activations must be stored for the backward pass, large models use **gradient checkpointing**: store only some activations and recompute the rest during the backward pass, trading extra compute for memory.
:::

:::cs
Forward mode can be implemented with **dual numbers** $a + b\varepsilon$ where $\varepsilon^2 = 0$: evaluating $f(x + \varepsilon)$ yields $f(x) + f'(x)\varepsilon$. Reverse mode uses a **tape**: a list of operations recorded in topological order and then replayed backwards. It is a good exercise in graph algorithms.
:::

:::real
Spreadsheet auditing works like reverse mode. An accountant who wants to know which input cells most affect the final profit figure traces the formula dependencies backwards from that one cell, and the influence of each input is the product of sensitivities along the paths, summed over paths.
:::

:::quiz
? For $L = (wx)^2$ with $w = 2$ and $x = 3$, what is $\partial L/\partial w$?
= 36
> $2(wx)\cdot x = 2\cdot6\cdot3 = 36$.

? For a scalar loss of many parameters, which mode is efficient?
+ Reverse mode
- Forward mode
- Finite differences
> Reverse mode gets all partial derivatives in one backward pass.

? Node $z = x + y$ receives adjoint $\bar z = 5$. What is $\bar x$?
= 5
> An add node passes its adjoint unchanged to each input.

? Node $z = xy$ with $x = 2$, $y = 7$ receives $\bar z = 1$. What is $\bar x$?
= 7
> A multiply node sends each input the adjoint times the other input.

? For $f = x\cdot x$ computed as a multiply node with both inputs equal to $x = 3$, what total adjoint does $x$ receive?
= 6
> Each use contributes $x = 3$ and fan-outs sum, giving $2x = 6$.

? The error of the central difference $\frac{L(w + h) - L(w - h)}{2h}$ shrinks like...
- $h$
+ $h^2$
- $h^3$
> Taylor expansion cancels the $h^2$ term in the numerator, leaving error $O(h^2)$.
:::

## Lesson: Gradients of common losses {#loss-gradients}
@summary: Mean squared error, logistic regression and softmax cross-entropy all give the same famous gradient: prediction minus target.

### Where every backward pass begins
Backpropagation starts at the loss. Before any gradient can flow back through a network, we need the derivative of the loss with respect to the model's final output. This lesson derives that starting gradient for the three losses that cover most of machine learning: mean squared error for predicting numbers, binary cross-entropy for yes-or-no questions, and softmax cross-entropy for choosing one class out of many. The surprise at the end is that all three give the same simple answer, **prediction minus target**, and this is not an accident.

Imagine a weather app that says "70% chance of rain". If it rains, the forecast was decent but could have been more confident; if it stays dry, it was quite wrong. A loss function turns this judgement into a number, and its gradient tells the forecaster which way, and how hard, to adjust. The ideal gradient is large when the forecast is badly wrong and small when it is nearly right.

### Mean squared error
For a real-valued prediction $\hat y$ and target $y$, the squared error loss is $L = \frac12(\hat y - y)^2$. The factor $\frac12$ is there only to cancel the 2 from differentiation:
$$\frac{\partial L}{\partial\hat y} = \hat y - y$$
For linear regression $\hat y = \mathbf w^T\mathbf x + b$, the chain rule gives $\nabla_{\mathbf w}L = (\hat y - y)\mathbf x$ and $\partial L/\partial b = \hat y - y$. Say $\mathbf x = (1, 2)$, $\mathbf w = (0.5, 0.5)$, $b = 0$ and $y = 2$. Then $\hat y = 1.5$, the error is $-0.5$, and $\nabla_{\mathbf w}L = (-0.5, -1)$. The negative gradient points toward larger weights, which would raise the prediction toward 2. The bigger input gets the bigger correction, because it had more influence on the mistake.

For a whole dataset with design matrix $X$ (one example per row), $L = \frac1{2n}\|X\mathbf w - \mathbf y\|^2$ and $\nabla_{\mathbf w}L = \frac1nX^T(X\mathbf w - \mathbf y)$: the average of the per-example gradients.

:::def Mean squared error (MSE)
The average of squared differences between predictions and targets, $\frac1n\sum_i(\hat y_i - y_i)^2$, often with an extra factor $\frac12$. Its gradient with respect to each prediction is proportional to the error $\hat y_i - y_i$.
:::

### The sigmoid and its tidy derivative
For yes-or-no problems we want a probability between 0 and 1. A linear score $z = \mathbf w^T\mathbf x + b$, called a **logit**, can be any real number, so we squash it with the sigmoid $\sigma(z) = \frac1{1 + e^{-z}}$. Its derivative has a lovely form:
$$\sigma'(z) = \sigma(z)\,(1 - \sigma(z))$$
At $z = 0$, $\sigma = 0.5$ and $\sigma' = 0.25$, the largest the slope ever gets. Far from zero the slope is tiny: at $z = 5$, $\sigma\approx0.9933$ and $\sigma'\approx0.0066$.

### Binary cross-entropy
The natural loss for a predicted probability $p = \sigma(z)$ and a label $y\in\{0, 1\}$ is the negative log-likelihood, or **binary cross-entropy**:
$$L = -\big[y\log p + (1 - y)\log(1 - p)\big]$$
If $y = 1$ this is $-\log p$, which is 0 when $p = 1$ and grows without bound as $p\to0$. Differentiate with respect to $p$: $\frac{\partial L}{\partial p} = -\frac yp + \frac{1 - y}{1 - p}$. Now multiply by $\sigma'(z) = p(1 - p)$, and the fractions cancel:
$$\frac{\partial L}{\partial z} = -y(1 - p) + (1 - y)p = p - y$$
With $z = 1$ and $y = 1$: $p\approx0.731$ and the gradient is $-0.269$, pushing $z$ up.

### Why not just use squared error on probabilities?
Suppose the model is confidently wrong: $z = -5$, so $p\approx0.0067$, but $y = 1$. Cross-entropy gives $\partial L/\partial z = p - y\approx-0.993$, a strong push. Squared error $\frac12(p - y)^2$ gives $(p - y)\,p(1 - p)\approx-0.0066$, about 150 times weaker, because the flat sigmoid slope multiplies it. A model trained with squared error would learn very slowly from exactly the mistakes it most needs to fix. Cross-entropy's log cancels the sigmoid's flatness.

### Softmax for many classes
With $K$ classes the model outputs a logit vector $\mathbf z\in\mathbb{R}^K$ and converts it to probabilities with the **softmax**:
$$p_i = \frac{e^{z_i}}{\sum_je^{z_j}}$$
The exponentials make everything positive, and dividing by the sum makes the probabilities add to 1. For $\mathbf z = (2, 1, 0)$, the exponentials are about $7.389$, $2.718$ and $1$, which sum to $11.107$, so $\mathbf p\approx(0.665, 0.245, 0.090)$.

The softmax Jacobian is $\frac{\partial p_i}{\partial z_j} = p_i(\delta_{ij} - p_j)$, where $\delta_{ij}$ is 1 if $i = j$ and 0 otherwise. With a one-hot target $\mathbf y$ (1 for the correct class $c$, 0 elsewhere), the cross-entropy is $L = -\sum_iy_i\log p_i = -\log p_c$, and combining it with the Jacobian gives
$$\nabla_{\mathbf z}L = \mathbf p - \mathbf y$$
In the example with correct class 1 (the first), the gradient is $(0.665 - 1, 0.245, 0.090) = (-0.335, 0.245, 0.090)$: raise the correct logit, lower the others in proportion to how much probability they stole. The entries always sum to zero.

:::def Softmax
The function $\operatorname{softmax}(\mathbf z)_i = e^{z_i}/\sum_je^{z_j}$, turning a vector of real scores (logits) into a probability distribution. Adding the same constant to every logit does not change it.
:::

:::def Cross-entropy loss
For a predicted distribution $\mathbf p$ and target distribution $\mathbf y$, $L = -\sum_iy_i\log p_i$. With a one-hot target it is $-\log$ of the probability given to the correct class.
:::

### Numerical stability
Computing $e^{1000}$ overflows. Because softmax is unchanged when a constant is subtracted from all logits, implementations compute $e^{z_i - \max_jz_j}$ instead, and compute $\log\sum_je^{z_j}$ as $m + \log\sum_je^{z_j - m}$ with $m = \max_jz_j$. This is why libraries offer combined "cross-entropy from logits" functions: they are both more stable and use the simple $\mathbf p - \mathbf y$ gradient directly.

:::warn Common mistakes
Applying softmax inside the model and then again inside a loss that expects logits. Using squared error with a sigmoid output for classification. Forgetting the $\frac1n$ when averaging over a batch, which silently changes the effective learning rate. Expecting the softmax-cross-entropy gradient to be $-1/p_c$ only for the correct class: the full gradient with respect to the logits is $\mathbf p - \mathbf y$ and involves every class.
:::

### Summary
The derivative of the loss with respect to the model's output starts every backward pass. MSE gives $\hat y - y$, sigmoid with binary cross-entropy gives $p - y$ with respect to the logit, and softmax with cross-entropy gives $\mathbf p - \mathbf y$. These pairings are chosen because the log in cross-entropy cancels the flat regions of the squashing function, so confident mistakes produce strong corrections.

@viz g05-compgraph graph=neuron | A logistic neuron: $z = wx + b$, $p = \sigma(z)$, cross-entropy loss. Step backwards and watch the gradient at $z$ become $p - y$.

:::explore
**What to try**
1. With the defaults $w = 1$, $x = 2$, $b = -1$, $y = 1$, the logit is $z = 1$ and $p\approx0.731$. Step the backward pass until $\bar z$ appears and confirm it equals $p - y\approx-0.269$.
2. Look at the two intermediate adjoints: $\bar p = -1/p\approx-1.368$, and the sigmoid node multiplies it by $p(1 - p)\approx0.197$.
3. Drag $b$ to $-4$ so the model is confidently wrong ($z = -2$, $p\approx0.12$). The gradient at $z$ grows toward $-1$.
4. Switch $y$ to 0 and confirm $\bar z$ becomes $+p$.

**What to notice:** however wildly $\bar p$ changes, the product with $\sigma'$ always lands on $p - y$, which is the cancellation derived in the article. The weight gradient is then just $(p - y)\,x$.
:::

:::formulas
$$L = \tfrac12(\hat y - y)^2\Rightarrow\frac{\partial L}{\partial\hat y} = \hat y - y\qquad\nabla_{\mathbf w}\tfrac1{2n}\|X\mathbf w - \mathbf y\|^2 = \tfrac1nX^T(X\mathbf w - \mathbf y)$$
$$\sigma(z) = \frac1{1 + e^{-z}},\qquad\sigma'(z) = \sigma(z)(1 - \sigma(z))$$
$$L = -[y\log p + (1 - y)\log(1 - p)],\ p = \sigma(z)\Rightarrow\frac{\partial L}{\partial z} = p - y$$
$$p_i = \frac{e^{z_i}}{\sum_je^{z_j}},\qquad\frac{\partial p_i}{\partial z_j} = p_i(\delta_{ij} - p_j),\qquad\nabla_{\mathbf z}\Big(-\sum_iy_i\log p_i\Big) = \mathbf p - \mathbf y$$
:::

:::thm Derivative of the sigmoid
$\sigma'(z) = \sigma(z)(1 - \sigma(z))$.
:::

:::proof Proof
$\sigma(z) = (1 + e^{-z})^{-1}$, so $\sigma'(z) = e^{-z}(1 + e^{-z})^{-2} = \frac1{1 + e^{-z}}\cdot\frac{e^{-z}}{1 + e^{-z}}$. The second factor is $1 - \sigma(z)$.
:::

:::thm Softmax cross-entropy gradient
If $\mathbf p = \operatorname{softmax}(\mathbf z)$ and $\sum_iy_i = 1$, then $\nabla_{\mathbf z}\left(-\sum_iy_i\log p_i\right) = \mathbf p - \mathbf y$.
:::

:::proof Proof
$\log p_i = z_i - \log\sum_ke^{z_k}$, so $L = -\sum_iy_iz_i + \left(\sum_iy_i\right)\log\sum_ke^{z_k} = -\sum_iy_iz_i + \log\sum_ke^{z_k}$. Differentiating with respect to $z_j$ gives $-y_j + e^{z_j}/\sum_ke^{z_k} = p_j - y_j$.
:::

:::steps Logistic regression gradient for $w = 1$, $x = 2$, $b = -1$, $y = 1$
1. Logit $z = wx + b = 1$, probability $p = \sigma(1)\approx0.731$.
2. $\partial L/\partial z = p - y\approx-0.269$.
3. $\partial L/\partial w = (p - y)x\approx-0.538$ and $\partial L/\partial b\approx-0.269$. Gradient descent increases both, raising $p$.
:::

:::steps Batch MSE gradient with $X = \begin{bmatrix}1 & 0\\1 & 1\\1 & 2\end{bmatrix}$, $\mathbf w = (0, 1)$, $\mathbf y = (1, 2, 2)$
1. Predictions $X\mathbf w = (0, 1, 2)$; residuals $X\mathbf w - \mathbf y = (-1, -1, 0)$.
2. $X^T(X\mathbf w - \mathbf y) = (-1 - 1 + 0,\ 0 - 1 + 0) = (-2, -1)$.
3. Divide by $n = 3$: $\nabla_{\mathbf w}L = (-\tfrac23, -\tfrac13)$. Both the intercept and the slope should increase.
:::

:::mock Exam question
A three-class classifier outputs logits $\mathbf z = (0, 0, \ln2)$ and the correct class is the third. (a) Compute $\mathbf p$ and the loss. (b) Compute $\nabla_{\mathbf z}L$. (c) Show that adding 5 to every logit changes neither $\mathbf p$ nor the gradient.
:::solution
(a) The exponentials are $1, 1, 2$, summing to 4, so $\mathbf p = (0.25, 0.25, 0.5)$ and $L = -\ln0.5 = \ln2\approx0.693$.
(b) $\mathbf p - \mathbf y = (0.25, 0.25, -0.5)$. The entries sum to zero.
(c) Every exponential is multiplied by $e^5$, which cancels between numerator and denominator, so $\mathbf p$ and hence $\mathbf p - \mathbf y$ are unchanged.
:::
:::

:::ml
These formulas are the output-layer "error signals" in every classifier and regressor. PyTorch's `CrossEntropyLoss` and `BCEWithLogitsLoss` take raw logits for stability and internally use the $\mathbf p - \mathbf y$ gradient. Label smoothing simply replaces the one-hot $\mathbf y$ with a softened distribution, and the gradient stays $\mathbf p - \mathbf y$.
:::

:::cs
The log-sum-exp trick, $\log\sum_je^{z_j} = m + \log\sum_je^{z_j - m}$, prevents floating-point overflow. In 64-bit floats $e^{710}$ already overflows to infinity, while logits of that size are perfectly possible during unstable training.
:::

:::real
Weather services score probability forecasts with log loss. A forecast of 90% rain on a dry day costs $-\ln0.1\approx2.30$, while 60% costs $-\ln0.4\approx0.92$. The gradient $p - y$ tells the forecasting model exactly how far to move its probability after each day.
:::

:::quiz
? What is $\sigma'(0)$?
= 0.25|1/4
> $\sigma(0) = 0.5$, so $\sigma'(0) = 0.5\times0.5$.

? A logistic model predicts $p = 0.8$ but the label is $y = 0$. What is $\partial L/\partial z$ for binary cross-entropy?
= 0.8|4/5
> $p - y = 0.8$.

? What is the first softmax probability for logits $(3, 3)$?
= 0.5|1/2
> Equal logits give equal probabilities.

? The entries of the softmax cross-entropy gradient $\mathbf p - \mathbf y$ always sum to...
= 0
> Both $\mathbf p$ and a one-hot $\mathbf y$ sum to 1.

? Why is cross-entropy preferred over squared error for sigmoid outputs?
+ Its gradient $p - y$ stays large when the model is confidently wrong.
- It is always smaller than squared error.
- It does not need a gradient.
> Squared error is multiplied by the tiny $\sigma'$ in the flat regions.

? With $L = \frac12(\hat y - y)^2$, $\hat y = 3$ and $y = 1$, what is $\partial L/\partial\hat y$?
= 2
> $\hat y - y = 2$.
:::

## Lesson: Backprop through a neural network {#backprop}
@summary: Derive and run backpropagation for a multilayer network: forward pass, error signals layer by layer, weight gradients as outer products, and why gradients vanish or explode.

### The credit assignment problem
A neural network can have millions of weights, and after it makes a prediction we get a single number back: the loss. Training means nudging every weight in the direction that lowers that number. So for every weight we need to know how much the loss would change if that weight changed a little. This is called the **credit assignment problem**: which weights deserve the blame for the mistake, and by how much?

Imagine a factory where raw material passes through several workstations before a final inspector scores the product. If the score is bad, the inspector does not interview every worker separately. Instead, the last workstation is told how the product should have been different; it works out how its own settings contributed and how its input should have been different, and passes that message back to the workstation before it. Each station only needs the message from the next station and what it remembers about its own work. Backpropagation is exactly this message passing, and you already have every ingredient: the vector chain rule, the VJPs of linear and elementwise layers, and the loss gradients of the previous lesson.

### The network
Consider a two-layer network with input $\mathbf x$:
$$\mathbf z_1 = W_1\mathbf x + \mathbf b_1,\qquad\mathbf h = \sigma(\mathbf z_1),\qquad\mathbf z_2 = W_2\mathbf h + \mathbf b_2,\qquad L = \ell(\mathbf z_2, \mathbf y)$$
Here $\sigma$ is an elementwise activation such as ReLU, and $\ell$ is a loss such as squared error or softmax cross-entropy applied to the output logits $\mathbf z_2$. The **forward pass** computes these quantities in order and, crucially, stores $\mathbf x$, $\mathbf z_1$ and $\mathbf h$, because the backward pass will need them.

### The backward pass, one layer at a time
Write $\boldsymbol\delta_\ell = \partial L/\partial\mathbf z_\ell$ for the **error signal** at layer $\ell$, the gradient of the loss with respect to that layer's pre-activations.

**Output layer.** From the previous lesson, $\boldsymbol\delta_2 = \hat{\mathbf y} - \mathbf y$ for squared error, or $\mathbf p - \mathbf y$ for softmax cross-entropy.

**Second weights.** The layer $\mathbf z_2 = W_2\mathbf h + \mathbf b_2$ is linear, so its weight gradient is an outer product and its bias gradient is the error signal itself: $\frac{\partial L}{\partial W_2} = \boldsymbol\delta_2\mathbf h^T$ and $\frac{\partial L}{\partial\mathbf b_2} = \boldsymbol\delta_2$.

**Back into the hidden layer.** The same linear layer sends the error back through the transposed weights: $\bar{\mathbf h} = W_2^T\boldsymbol\delta_2$.

**Through the activation.** The activation is elementwise, so $\boldsymbol\delta_1 = \bar{\mathbf h}\odot\sigma'(\mathbf z_1)$. Note that $\sigma'$ is evaluated at the stored pre-activation $\mathbf z_1$.

**First weights.** Again an outer product: $\frac{\partial L}{\partial W_1} = \boldsymbol\delta_1\mathbf x^T$ and $\frac{\partial L}{\partial\mathbf b_1} = \boldsymbol\delta_1$.

For a deeper network the middle three steps simply repeat: transpose-multiply, then multiply elementwise by the activation slope, then form the outer product with the layer's input. That is the whole algorithm.

:::def Error signal (delta)
$\boldsymbol\delta_\ell = \partial L/\partial\mathbf z_\ell$, the gradient of the loss with respect to the pre-activations of layer $\ell$. Backpropagation computes it from $\boldsymbol\delta_{\ell+1}$ by $\boldsymbol\delta_\ell = (W_{\ell+1}^T\boldsymbol\delta_{\ell+1})\odot\sigma'(\mathbf z_\ell)$.
:::

:::def Backpropagation
The algorithm that computes the gradient of a network's loss with respect to all weights by one forward pass (storing activations) followed by one backward pass that propagates error signals from the output layer to the input layer. It is reverse-mode automatic differentiation specialised to layered networks.
:::

### A complete example with numbers
Use the smallest possible network, with one unit per layer: $a = w_1x + b_1$, $h = \operatorname{ReLU}(a)$, $\hat y = w_2h + b_2$ and $L = \frac12(\hat y - y)^2$. Take $x = 1.5$, $w_1 = 2$, $b_1 = -1$, $w_2 = 1.5$, $b_2 = 0.5$ and target $y = 1$.

Forward: $a = 3 - 1 = 2$, $h = 2$, $\hat y = 3 + 0.5 = 3.5$, and $L = \frac12(2.5)^2 = 3.125$.

Backward: the output error is $\delta_2 = \hat y - y = 2.5$. The second-layer gradients are $\bar w_2 = \delta_2h = 5$ and $\bar b_2 = 2.5$. The message to the hidden unit is $\bar h = w_2\delta_2 = 3.75$. ReLU is active because $a = 2 > 0$, so $\delta_1 = 3.75$. The first-layer gradients are $\bar w_1 = \delta_1x = 5.625$ and $\bar b_1 = 3.75$.

Now take one gradient descent step with learning rate $0.1$: $w_1 = 1.4375$, $b_1 = -1.375$, $w_2 = 1$, $b_2 = 0.25$. The new forward pass gives $a = 2.15625 - 1.375 = 0.78125$, $h = 0.78125$ and $\hat y = 1.03125$, so the loss falls from $3.125$ to about $0.0005$. One step of backprop and descent almost solved this tiny problem.

### Mini-batches
In practice we process a batch of $n$ examples at once by stacking them as the columns of a matrix $X$. Every formula keeps its shape, and the outer products become matrix products that automatically **sum over the batch**: $\frac{\partial L}{\partial W_1} = \Delta_1X^T$, where column $i$ of $\Delta_1$ is the error signal of example $i$. The bias gradient is the sum of the columns of $\Delta_1$. If the loss is an average, the $\frac1n$ is already inside $\Delta$. These matrix products are exactly what GPUs are built to do quickly.

### Vanishing and exploding gradients
Look at the recursion $\boldsymbol\delta_\ell = (W_{\ell+1}^T\boldsymbol\delta_{\ell+1})\odot\sigma'(\mathbf z_\ell)$. The error signal at an early layer is a product of many factors, one per layer. If each factor shrinks the signal, it decays exponentially with depth. The sigmoid's slope is at most $0.25$, so through 10 sigmoid layers the signal can shrink by $0.25^{10}\approx10^{-6}$, and the early layers barely learn. That is the **vanishing gradient** problem. If the weight matrices have large singular values instead, the signal grows exponentially and training blows up: **exploding gradients**.

Modern networks fight this in several ways: ReLU activations whose slope is exactly 1 when active, careful weight initialisation (Xavier or He) that keeps the scale of signals roughly constant, normalisation layers, residual connections $\mathbf h_{\ell+1} = \mathbf h_\ell + f(\mathbf h_\ell)$ whose Jacobian $I + J_f$ always contains an identity path, and gradient clipping for explosions.

:::warn Common mistakes
Evaluating $\sigma'$ at the activation $\mathbf h$ instead of the pre-activation $\mathbf z$ (for sigmoid you may write $\sigma'(\mathbf z) = \mathbf h\odot(1 - \mathbf h)$, which is fine, but do not plug $\mathbf h$ into $\sigma'$). Writing $\mathbf x\boldsymbol\delta^T$ instead of $\boldsymbol\delta\mathbf x^T$; always check the result has the shape of $W$. Forgetting to sum bias gradients over the batch. In frameworks, forgetting to reset accumulated gradients between steps, so they keep adding up.
:::

### Summary
Backprop runs the network forward, stores the activations, and sends an error signal backwards. At each layer it forms the weight gradient as the outer product of the error signal with the layer's input, passes the signal through the transposed weights, and multiplies elementwise by the activation slope. The cost is about that of a forward pass. Because the signal is a product over layers, it can vanish or explode, which shapes the design of deep networks.

@viz g05-compgraph graph=mlp | A one-unit-per-layer network $h = \operatorname{ReLU}(w_1x + b_1)$, $\hat y = w_2h + b_2$ with squared-error loss. Step the backward pass through both layers.

:::explore
**What to try**
1. At the defaults, confirm the forward values from the article: $a = 2$, $h = 2$, $\hat y = 3.5$, $L = 3.125$.
2. Press Backward step one node at a time and check $\bar w_2 = 5$, $\bar h = 3.75$, $\bar w_1 = 5.625$ and $\bar b_1 = 3.75$.
3. Drag $b_1$ to $-3.5$, so $a = -0.5$ and the ReLU is off. Press All gradients: $\bar w_1$ and $\bar b_1$ become 0.
4. Set $w_2$ near 0 and watch the gradients reaching the first layer shrink, because $\bar h = w_2\delta_2$.

**What to notice:** gradients reaching the first layer are products of everything downstream: the output error, the second weight and the ReLU slope. When any factor is 0 (a dead ReLU) or small, the first layer stops learning. This is the vanishing-gradient mechanism from the article in its smallest form.
:::

:::formulas
$$\boldsymbol\delta_L = \frac{\partial L}{\partial\mathbf z_L}\quad(=\mathbf p - \mathbf y\ \text{or}\ \hat{\mathbf y} - \mathbf y)$$
$$\frac{\partial L}{\partial W_\ell} = \boldsymbol\delta_\ell\,\mathbf h_{\ell-1}^T,\qquad\frac{\partial L}{\partial\mathbf b_\ell} = \boldsymbol\delta_\ell\qquad(\mathbf h_0 = \mathbf x)$$
$$\boldsymbol\delta_{\ell} = \left(W_{\ell+1}^T\boldsymbol\delta_{\ell+1}\right)\odot\sigma'(\mathbf z_{\ell})$$
$$\text{batch: }\frac{\partial L}{\partial W_\ell} = \Delta_\ell H_{\ell-1}^T,\qquad\frac{\partial L}{\partial\mathbf b_\ell} = \Delta_\ell\mathbf 1$$
:::

:::thm Backpropagation computes the exact gradient
For a layered network with differentiable activations and loss, the recursion above produces exactly $\partial L/\partial W_\ell$ and $\partial L/\partial\mathbf b_\ell$ for every layer, using one forward and one backward pass.
:::

:::proof Proof
By induction from the output. $\boldsymbol\delta_L$ is correct by definition. If $\boldsymbol\delta_{\ell+1}$ is correct, then since $\mathbf z_{\ell+1} = W_{\ell+1}\sigma(\mathbf z_\ell) + \mathbf b_{\ell+1}$, the vector chain rule gives $\partial L/\partial\mathbf z_\ell = J^T\boldsymbol\delta_{\ell+1}$ with $J = W_{\ell+1}\operatorname{diag}(\sigma'(\mathbf z_\ell))$, which equals $(W_{\ell+1}^T\boldsymbol\delta_{\ell+1})\odot\sigma'(\mathbf z_\ell)$. The weight and bias gradients then follow from the VJP of a linear layer.
:::

:::steps Backprop through a 2-2-1 ReLU network: $W_1 = \begin{bmatrix}1 & -1\\2 & 1\end{bmatrix}$, $\mathbf b_1 = \mathbf 0$, $W_2 = \begin{bmatrix}1 & -1\end{bmatrix}$, $b_2 = 0$, $\mathbf x = (2, 1)$, $y = -2$, squared error
1. Forward: $\mathbf z_1 = (1, 5)$, $\mathbf h = (1, 5)$, $\hat y = 1 - 5 = -4$, $L = \frac12(-4 + 2)^2 = 2$.
2. Output: $\delta_2 = \hat y - y = -2$, so $\partial L/\partial W_2 = \delta_2\mathbf h^T = \begin{bmatrix}-2 & -10\end{bmatrix}$.
3. Hidden: $\bar{\mathbf h} = W_2^T\delta_2 = (-2, 2)$; both units are active, so $\boldsymbol\delta_1 = (-2, 2)$.
4. $\partial L/\partial W_1 = \boldsymbol\delta_1\mathbf x^T = \begin{bmatrix}-4 & -2\\4 & 2\end{bmatrix}$. Check one entry: $\hat y$ depends on $(W_1)_{11}$ through $h_1$ with slope $x_1 = 2$, so $\partial L/\partial(W_1)_{11} = (\hat y - y)\cdot2 = -4$.
:::

:::steps How fast can a signal vanish through sigmoid layers?
1. Each sigmoid layer multiplies the error signal by $\sigma'(\mathbf z)\le0.25$ (ignoring the weights).
2. Through 10 layers: $0.25^{10} = 1/1048576\approx9.5\times10^{-7}$.
3. With ReLU, active units have slope exactly 1, so this factor disappears and the signal's size depends only on the weights.
:::

:::mock Exam question
A network computes $h = \operatorname{ReLU}(w_1x + b_1)$, $z = w_2h + b_2$, $p = \sigma(z)$ with binary cross-entropy. Take $x = 1$, $w_1 = 1$, $b_1 = 0$, $w_2 = 2$, $b_2 = -2$, $y = 1$. (a) Compute the forward pass and loss. (b) Compute all four parameter gradients. (c) Take one gradient step with learning rate 1 and find the new $p$.
:::solution
(a) $h = 1$, $z = 0$, $p = 0.5$, $L = -\ln0.5\approx0.693$.
(b) $\delta_2 = p - y = -0.5$, so $\bar w_2 = \delta_2h = -0.5$ and $\bar b_2 = -0.5$. Then $\bar h = w_2\delta_2 = -1$; the ReLU is active, so $\delta_1 = -1$, $\bar w_1 = \delta_1x = -1$ and $\bar b_1 = -1$.
(c) New parameters: $w_1 = 2$, $b_1 = 1$, $w_2 = 2.5$, $b_2 = -1.5$. Then $h = 3$, $z = 7.5 - 1.5 = 6$ and $p = \sigma(6)\approx0.998$.
:::
:::

:::ml
Every training step in PyTorch is backprop: `optimizer.zero_grad()`, a forward pass, `loss.backward()` (the backward pass above, done automatically), then `optimizer.step()`. Residual connections in ResNets and transformers exist largely to keep $\boldsymbol\delta$ from vanishing across dozens or hundreds of layers.
:::

:::cs
Backprop's memory cost is linear in depth because every activation is stored. Gradient checkpointing stores only every $k$-th layer's activations and recomputes the others during the backward pass; with $k\approx\sqrt{\text{depth}}$, memory drops to about the square root of the depth for roughly one extra forward pass.
:::

:::real
Large organisations assign responsibility the same way. When a product launch misses its target, the post-mortem starts with the final outcome and works backwards: how much of the shortfall came from marketing, how much from manufacturing, and within manufacturing, which supplier. Each team only needs the feedback from the team after it, just as each layer only needs $\boldsymbol\delta$ from the next layer.
:::

:::quiz
? Which is the correct hidden-layer error signal?
+ $\boldsymbol\delta_1 = (W_2^T\boldsymbol\delta_2)\odot\sigma'(\mathbf z_1)$
- $\boldsymbol\delta_1 = W_2\boldsymbol\delta_2\odot\sigma'(\mathbf h)$
- $\boldsymbol\delta_1 = \boldsymbol\delta_2\mathbf x^T$
> Transpose-multiply through $W_2$, then multiply elementwise by the activation slope at the pre-activation.

? $W_2$ is $3\times5$. What is the shape of $\partial L/\partial W_2 = \boldsymbol\delta_2\mathbf h^T$?
+ $3\times5$
- $5\times3$
- $3\times1$
> A gradient always has the shape of the variable.

? $\boldsymbol\delta_2 = (2)$ and $\mathbf h = (1, 3)$. What is the second entry of $\partial L/\partial W_2$?
= 6
> $\boldsymbol\delta_2\mathbf h^T = [2, 6]$.

? Ignoring weights, by what factor at most can two sigmoid layers shrink an error signal?
= 0.0625|1/16
> $0.25^2 = 1/16$.

? A ReLU unit has pre-activation $-0.5$. What gradient flows back through it?
= 0
> ReLU's slope is 0 for negative inputs, so the unit passes no gradient.

? Why does the forward pass store activations?
+ The backward pass needs them to form weight gradients and activation slopes.
- To make the forward pass faster.
- Because the loss cannot be computed otherwise.
> $\partial L/\partial W_\ell = \boldsymbol\delta_\ell\mathbf h_{\ell-1}^T$ uses the stored inputs, and $\sigma'(\mathbf z_\ell)$ uses the stored pre-activations.
:::
