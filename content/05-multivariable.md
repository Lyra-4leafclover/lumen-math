---
id: multivariable
title: Multivariable Calculus
tagline: Partial derivatives, gradients, tangent planes, Jacobians, Hessians, optimization, multiple integrals and vector fields.
desc: Models have millions of inputs, so calculus has to go multi-dimensional. You'll learn functions of several variables, partial derivatives, tangent planes and linear approximation, the gradient and directional derivatives, the multivariable chain rule, Jacobians and Hessians, unconstrained and constrained optimization with Lagrange multipliers, double and triple integrals, change of variables, and vector fields with divergence and curl.
color: #14b8a6
symbol: ∇
area: Linear algebra & calculus
paths: ml
order: 5
---

# Unit: Functions of several variables

## Lesson: Surfaces, contours and level sets {#multivar-functions}
@summary: Functions with several inputs, their graphs as surfaces, contour maps, level sets, and limits in more than one dimension.

### Why more than one input?
Almost nothing interesting depends on just one number. The temperature in a room depends on where you stand: your $x$ and $y$ position and your height. The price of a house depends on its size, location, age and number of bedrooms. A neural network's loss depends on every one of its millions of weights. Single-variable calculus studied functions $f(x)$ with one input. Multivariable calculus studies functions like $f(x, y)$ or $f(x_1, \ldots, x_n)$ with many inputs, and almost every idea from one dimension (limits, derivatives, optimization, integrals) has a natural extension. This first lesson is about simply *seeing* such functions.

### An everyday scenario: a hiking map
A hiking map is a perfect picture of a function of two variables. Each point on the map has an east–west coordinate $x$ and a north–south coordinate $y$, and the ground has a height $h(x, y)$ there. The map cannot show height directly, so it draws **contour lines**: curves joining points at the same height, say every 50 metres. Where contours bunch together the ground is steep; where they spread out it is nearly flat; closed rings around a point mark a summit or a hollow. You already know how to read multivariable functions; we will just make it precise.

### Functions of two variables
A function of two variables assigns one output to each input pair: $f : \mathbb R^2 \to \mathbb R$, $(x, y) \mapsto f(x, y)$. For example $f(x, y) = x^2 + y^2$ gives $f(1, 2) = 1 + 4 = 5$ and $f(0, 0) = 0$. The **domain** is the set of allowed inputs. For $g(x, y) = \sqrt{4 - x^2 - y^2}$ we need $x^2 + y^2 \le 4$, so the domain is a disc of radius 2. For $\ln(x + y)$, the domain is the half-plane $x + y > 0$.

:::def Function of several variables
A rule $f : \mathbb R^n \to \mathbb R$ that assigns a single real number $f(x_1, \ldots, x_n)$ to each point of its domain in $\mathbb R^n$.
:::

### Graphs as surfaces
The graph of $f(x, y)$ is the set of points $(x, y, z)$ with $z = f(x, y)$: a surface floating over the $xy$-plane. $x^2 + y^2$ is a bowl (a paraboloid) with its bottom at the origin. $4 - x^2 - y^2$ is an upside-down bowl, a dome with its peak at height 4. $x^2 - y^2$ is a **saddle**: it curves up along the $x$-axis and down along the $y$-axis, like a horse's saddle or a mountain pass. A plane $z = 2x + 3y + 1$ is the multivariable version of a straight line.

### Slices
One powerful way to understand a surface is to slice it. Freeze $y$ at some value, say $y = 1$, and you get an ordinary function of $x$: for the saddle, $x^2 - 1$, an upward parabola. Freeze $x = 0$ instead and you get $-y^2$, a downward parabola. Those single-variable slices are where partial derivatives will come from in the next lesson.

### Contours and level sets
Slicing horizontally instead, at a fixed height $z = c$, gives a **level curve** (contour): the set of points where $f(x, y) = c$. For the bowl $x^2 + y^2$, the level curve at height $c = 4$ is $x^2 + y^2 = 4$, a circle of radius 2. Heights 1, 4, 9 give circles of radius 1, 2, 3. Equal steps in height give circles that are *not* equally spaced (radii $1, 2, 3$ for heights $1, 4, 9$), because the bowl gets steeper as you move outward. For the saddle, the level curves $x^2 - y^2 = c$ are hyperbolas, and the level set at $c = 0$ is the pair of crossing lines $y = \pm x$.

:::def Level set
For $f : \mathbb R^n \to \mathbb R$ and a number $c$, the set $\{\mathbf x : f(\mathbf x) = c\}$. In two variables it is a level curve (contour); in three it is a level surface.
:::

@fig gradient surface=bowl | A contour map: each ring joins points of equal height. The rings of the bowl are circles that get closer together as the bowl steepens.

For a function of three variables, $f(x, y, z)$, we cannot draw the graph (it would need four dimensions), but level sets are surfaces we can picture. For $f = x^2 + y^2 + z^2$ they are spheres. Weather maps of temperature in the atmosphere work this way.

### Limits and continuity in two dimensions
The idea of a limit carries over: $\lim_{(x, y)\to(a, b)}f(x, y) = L$ means $f$ gets close to $L$ whenever $(x, y)$ is close to $(a, b)$, approaching **from any direction**. That last phrase makes 2D limits subtler. Consider $f(x, y) = \frac{xy}{x^2 + y^2}$ near the origin. Along the $x$-axis ($y = 0$) it equals 0. Along the line $y = x$ it equals $\frac{x^2}{2x^2} = \frac12$. Two paths give two different values, so the limit does not exist. Polynomials and other functions built from continuous pieces are continuous wherever they are defined, so most limits can still be found by substitution.

### Functions with many inputs
In machine learning, inputs are vectors $\mathbf x = (x_1, \ldots, x_n)$ with $n$ in the thousands or millions. We cannot draw those, but all the 2D intuition (surfaces, valleys, contours, saddles) carries over, which is exactly why we study the two-variable case so carefully. A linear model $f(\mathbf x) = \mathbf w\cdot\mathbf x + b$ is a "flat" function whose level sets are parallel hyperplanes, and a classifier's decision boundary is the level set where its score equals a threshold.

### Common mistakes
Confusing a contour map with a picture of the surface is common: contours are a top-down view, not a side view. Another mistake is assuming contours for equally spaced heights are equally spaced; their spacing depends on steepness. For limits, checking just one or two paths can prove that a limit does *not* exist, but it can never prove that one does.

### Summary
A function of several variables assigns one output to each input point. Its graph is a surface; vertical slices give single-variable functions and horizontal slices give level curves. Close contours mean steep ground. Limits in several variables must agree along every path. These pictures are the language for gradients, optimization and loss landscapes in the rest of the course.

@viz g04-surface surface=saddle mode=slices x0=1 y0=0.5 | A 3D surface you can rotate by dragging. The pink and orange curves are the slices through the chosen point.

:::explore
**What to try**
1. With the saddle $x^2 - y^2$, drag on the plot to rotate it. Find the direction in which it curves up and the one in which it curves down.
2. Move the sliders $x_0$ and $y_0$ and watch the two slice curves move with the point.
3. Switch to the bowl, the dome and $f = xy$, rotating each one.

**What to notice:** the pink slice (with $y$ frozen) of the saddle is an upward parabola and the orange slice (with $x$ frozen) is a downward parabola, exactly as computed in the article. The bowl's slices both open upward; the dome's both open downward. $f = xy$ is a saddle too, rotated by 45 degrees.
:::

@viz gradient surface=bowl | The colors are heights and the rings are contours. Switch surfaces to compare contour patterns.

:::explore
**What to try**
1. With the bowl, look at the spacing of the contour rings as you move outward.
2. Switch to the saddle and find the crossing point of the contours.
3. Try the banana-shaped Rosenbrock function and the ravine.

**What to notice:** the bowl's rings are circles getting closer together, because the surface steepens; the saddle's contours are hyperbolas that cross at the saddle point. The ravine's stretched ellipses show a valley that is steep across and shallow along, a shape that makes gradient descent zig-zag in later lessons.
:::

:::formulas
$$f : \mathbb R^n \to \mathbb R,\quad \mathbf x = (x_1, \ldots, x_n) \mapsto f(\mathbf x)$$
$$\text{graph: } \{(x, y, z) : z = f(x, y)\} \qquad \text{level set: } \{(x, y) : f(x, y) = c\}$$
$$x^2 + y^2 = c \text{ (circles)} \qquad x^2 - y^2 = c \text{ (hyperbolas)} \qquad ax + by = c \text{ (parallel lines)}$$
$$\lim_{(x,y)\to(a,b)}f(x, y) = L \text{ must hold along every path to } (a, b)$$
:::

:::thm Two-path test
If $f(x, y)$ approaches different values along two different paths to $(a, b)$, then $\lim_{(x, y)\to(a, b)}f(x, y)$ does not exist.
:::

:::proof
If the limit existed and equalled $L$, then $f$ would be close to $L$ at all points sufficiently close to $(a, b)$, in particular at points on both paths. So the limit along each path would also be $L$, and the two path limits would be equal, contradicting the assumption.
:::

:::steps Find and describe the domain of $f(x, y) = \sqrt{9 - x^2 - y^2}$
1. The square root needs $9 - x^2 - y^2 \ge 0$, so $x^2 + y^2 \le 9$.
2. The domain is the closed disc of radius 3 centred at the origin.
3. The range is $[0, 3]$; the graph is the upper half of a sphere of radius 3.
:::

:::steps Describe the level curves of $f(x, y) = 2x + y$
1. Level $c$: $2x + y = c$, i.e. $y = c - 2x$.
2. These are parallel lines of slope $-2$.
3. Levels $c = 0, 2, 4$ are equally spaced lines, because a plane has constant steepness.
:::

:::steps Show that $\lim_{(x, y)\to(0, 0)}\frac{x^2 - y^2}{x^2 + y^2}$ does not exist
1. Along $y = 0$: $\frac{x^2}{x^2} = 1$.
2. Along $x = 0$: $\frac{-y^2}{y^2} = -1$.
3. Different path limits, so the limit does not exist.
:::

:::mock Exam question
Let $f(x, y) = x^2 + 4y^2$. (a) Evaluate $f(2, 1)$. (b) Describe the level curves $f = 4$ and $f = 16$. (c) Along which axis is the surface steeper, and how does the contour map show it?
:::solution
(a) $4 + 4 = 8$. (b) $x^2 + 4y^2 = 4$ is the ellipse $\frac{x^2}{4} + y^2 = 1$ with semi-axes 2 (along $x$) and 1 (along $y$); $f = 16$ gives semi-axes 4 and 2. (c) Along the $y$-axis $f = 4y^2$ rises four times faster than $x^2$ does along the $x$-axis. On the map the ellipses are squashed in the $y$ direction: contours are closer together along $y$, meaning steeper ground.
:::
:::

:::ml Loss landscapes
A model's loss $L(\mathbf w)$ is a function of all its weights. Visualizing a 2D slice of it (varying two directions in weight space) gives the "loss landscape" pictures used in research: bowls for convex models, and complicated terrain with valleys, plateaus and saddles for deep networks. Elongated contour ellipses signal ill-conditioning, which is why features are standardized before training.
:::

:::cs Heatmaps and isolines
Contour plots and heatmaps are standard in data visualization and scientific computing. The marching squares algorithm draws level curves from a grid of values by deciding, in each grid cell, where the contour crosses the edges using linear interpolation, the same idea used to extract surfaces from 3D medical scans (marching cubes).
:::

:::real Weather maps
Isobars on a weather map are level curves of air pressure $p(x, y)$. Where isobars are packed tightly, pressure changes quickly over a short distance and winds are strong. Isotherms (equal temperature) and elevation contours on topographic maps are the same idea.
:::

:::quiz
? For $f(x, y) = x^2 + y^2$, what is $f(3, 4)$?
= 25
> $9 + 16$.

? The level curves of $x^2 + y^2$ are...
+ circles centred at the origin
- parallel lines
- hyperbolas
> $x^2 + y^2 = c$ is a circle of radius $\sqrt c$.

? Which surface is a saddle?
+ $z = x^2 - y^2$
- $z = x^2 + y^2$
- $z = 4 - x^2 - y^2$
> It curves up in $x$ and down in $y$.

? The level curve $x^2 + y^2 = 16$ has radius...
= 4
> $\sqrt{16}$.

? On a contour map, contours that are very close together indicate...
+ steep terrain
- flat terrain
- a summit
> Height changes a lot over a short distance.

? Along $y = x$, the function $\frac{xy}{x^2 + y^2}$ equals...
= 1/2|0.5
> $\frac{x^2}{2x^2}$.
:::

## Lesson: Partial derivatives {#partials}
@summary: Differentiating with respect to one variable while holding the others fixed, higher-order partials, and Clairaut's theorem.

### One direction at a time
For a function of one variable, the derivative measures how fast the output changes when you nudge the input. With several inputs, you can nudge each one separately. A **partial derivative** measures the rate of change of $f$ when you move in just one coordinate direction, holding all the other inputs fixed. It is the simplest way to extend derivatives to many dimensions, and it is exactly what a neural network computes for every weight during training: how much would the loss change if I nudged this one weight a little?

### An everyday scenario
The heat index $H(T, h)$ (how hot it feels) depends on the air temperature $T$ and the humidity $h$. A meteorologist might ask two separate questions. On a humid day, if the temperature rises by one degree with the humidity unchanged, how much hotter does it feel? And at a fixed temperature, how much does an extra percentage point of humidity add? These are the two partial derivatives, $\frac{\partial H}{\partial T}$ and $\frac{\partial H}{\partial h}$. Each isolates one cause.

### The definition
The partial derivative of $f(x, y)$ with respect to $x$ at $(a, b)$ is
$$\frac{\partial f}{\partial x}(a, b) = \lim_{h\to0}\frac{f(a + h, b) - f(a, b)}{h}.$$
Only $x$ moves; $y$ stays at $b$. Similarly $\frac{\partial f}{\partial y}$ nudges only $y$. Notation varies: $\frac{\partial f}{\partial x}$, $f_x$, $\partial_xf$ and $D_1f$ all mean the same thing. The curly $\partial$ (read "partial") reminds you there are other variables being held fixed.

:::def Partial derivative
$f_x(a, b) = \lim_{h\to0}\frac{f(a + h, b) - f(a, b)}{h}$, the rate of change of $f$ in the $x$ direction with all other variables held constant. $f_y$ and partials in more variables are defined the same way.
:::

### How to compute them
In practice you never use the limit: **treat every other variable as a constant and differentiate as usual.** For $f(x, y) = x^2y + 3y^3$:

To find $f_x$, pretend $y$ is a number like 5. Then $x^2y$ is (constant) × $x^2$, with derivative $2xy$, and $3y^3$ is a pure constant, with derivative 0. So $f_x = 2xy$.

To find $f_y$, pretend $x$ is a constant. $x^2y$ is (constant) × $y$, with derivative $x^2$, and $3y^3$ gives $9y^2$. So $f_y = x^2 + 9y^2$.

At the point $(1, 2)$: $f_x = 4$ and $f_y = 1 + 36 = 37$. Moving in the $y$ direction changes $f$ about nine times faster than moving in the $x$ direction there.

All the single-variable rules still apply. For $g(x, y) = e^{xy}$, the chain rule gives $g_x = ye^{xy}$ and $g_y = xe^{xy}$. For $h(x, y) = \frac{x}{y}$, $h_x = \frac1y$ and $h_y = -\frac{x}{y^2}$.

### The geometric meaning
Slice the surface $z = f(x, y)$ with the vertical plane $y = b$. The slice is a curve $z = f(x, b)$, and $f_x(a, b)$ is the slope of that curve at $x = a$. Similarly $f_y$ is the slope of the slice in the plane $x = a$. Standing on a hillside, $f_x$ is how steep the ground is if you face east, and $f_y$ is how steep it is if you face north.

@fig gradient surface=saddle | On the saddle x² − y², walking east (x direction) the ground rises away from the centre, while walking north it falls: the two partial derivatives have opposite signs.

### Estimating partials from data
If you only have a table of values, partial derivatives can be estimated with difference quotients in one variable at a time. Suppose $f(2, 1) = 10$, $f(2.1, 1) = 10.6$ and $f(2, 1.1) = 9.8$. Then $f_x(2, 1) \approx \frac{10.6 - 10}{0.1} = 6$ and $f_y(2, 1) \approx \frac{9.8 - 10}{0.1} = -2$. This is how gradient-checking code tests a neural network's backpropagation: nudge one weight, measure the loss change, and compare.

### Higher-order partial derivatives
Partial derivatives are themselves functions, so we can differentiate them again. There are four second-order partials of $f(x, y)$: $f_{xx}$, $f_{yy}$, and the **mixed partials** $f_{xy}$ (first $x$, then $y$) and $f_{yx}$. For $f = x^2y + 3y^3$: $f_{xx} = 2y$, $f_{yy} = 18y$, $f_{xy} = \frac{\partial}{\partial y}(2xy) = 2x$ and $f_{yx} = \frac{\partial}{\partial x}(x^2 + 9y^2) = 2x$. The mixed partials agree. That is not luck: **Clairaut's theorem** says they are equal whenever they are continuous, which is true for essentially every function you will meet.

:::def Mixed partial derivative
A second-order partial taken with respect to two different variables, such as $f_{xy} = \frac{\partial}{\partial y}\left(\frac{\partial f}{\partial x}\right)$.
:::

$f_{xx}$ measures the curvature of the $x$-slice, $f_{yy}$ the curvature of the $y$-slice, and the mixed partial measures how the $x$-slope changes as you move in $y$, a twisting of the surface. For the saddle $x^2 - y^2$, $f_{xx} = 2 > 0$ (curving up) and $f_{yy} = -2 < 0$ (curving down). These second partials will form the Hessian matrix used to classify critical points.

### Common mistakes
The classic error is forgetting to treat the other variable as a constant: differentiating $x^2y$ with respect to $x$ and writing $2xy + x^2$ as if it were a product of two functions of $x$. A second is confusing the order in mixed partial notation; fortunately Clairaut usually makes them equal. A third is believing partial derivatives tell the whole story: they only describe the coordinate directions, and the next lessons show how to combine them for any direction.

### Summary
A partial derivative measures change in one input direction with the others held constant; compute it by treating other variables as constants. Geometrically it is the slope of a slice of the surface. Second partials measure curvature and twisting, and by Clairaut's theorem the mixed partials are equal for smooth functions.

@viz g04-surface surface=bowl mode=slices x0=1 y0=0.5 | The pink slice holds y fixed and the orange slice holds x fixed. Their slopes at the point are the two partial derivatives.

:::explore
**What to try**
1. With the bowl $x^2 + y^2$ at $(1, 0.5)$, read $f_x$ and $f_y$ from the panel. Check them against $f_x = 2x$, $f_y = 2y$.
2. Move $x_0$ to 0 and watch the pink slice's slope become 0.
3. Switch to $f = xy$ and set the point to $(1, 2)$, then $(2, 1)$.
4. Switch to the mixed surface $x^3 - 3x + y^2$ and find a point where both slopes are 0.

**What to notice:** each slice is an ordinary one-variable curve, and its slope at the point is a partial derivative, just as in the article's hiker analogy. For $f = xy$, $f_x = y$ and $f_y = x$, so swapping the point swaps the two slopes. On the mixed surface both partials vanish at $(1, 0)$ and $(-1, 0)$: these are critical points, previewing optimization.
:::

:::formulas
$$f_x(a, b) = \lim_{h\to0}\frac{f(a + h, b) - f(a, b)}{h} \qquad f_y(a, b) = \lim_{h\to0}\frac{f(a, b + h) - f(a, b)}{h}$$
$$f_x \approx \frac{f(x + h, y) - f(x, y)}{h} \qquad f_x \approx \frac{f(x + h, y) - f(x - h, y)}{2h}$$
$$f_{xx} = \frac{\partial^2f}{\partial x^2} \qquad f_{xy} = \frac{\partial}{\partial y}\frac{\partial f}{\partial x} = \frac{\partial^2f}{\partial y\,\partial x}$$
$$f_{xy} = f_{yx} \text{ (Clairaut, when continuous)}$$
:::

:::thm Clairaut's theorem (symmetry of mixed partials)
If $f_{xy}$ and $f_{yx}$ are both continuous on an open set containing $(a, b)$, then $f_{xy}(a, b) = f_{yx}(a, b)$.
:::

:::steps Find all first partials of $f(x, y, z) = x^2z + yz^3 - 4xy$
1. $f_x$: treat $y, z$ as constants: $2xz - 4y$.
2. $f_y$: $z^3 - 4x$.
3. $f_z$: $x^2 + 3yz^2$.
:::

:::steps Partials of $f(x, y) = \sin(x^2y)$
1. Chain rule with inside $u = x^2y$: $f_x = \cos(x^2y)\cdot2xy$.
2. $f_y = \cos(x^2y)\cdot x^2$.
3. At $(1, 0)$: $f_x = 0$, $f_y = 1$.
:::

:::steps Verify Clairaut for $f(x, y) = x^3y^2 + e^{2x}y$
1. $f_x = 3x^2y^2 + 2e^{2x}y$, so $f_{xy} = 6x^2y + 2e^{2x}$.
2. $f_y = 2x^3y + e^{2x}$, so $f_{yx} = 6x^2y + 2e^{2x}$.
3. They agree, as the theorem predicts.
:::

:::mock Exam question
The production of a factory is modelled by the Cobb–Douglas function $P(L, K) = 10L^{0.5}K^{0.5}$, with labour $L$ and capital $K$. At $L = 25$, $K = 100$: (a) find $P$; (b) find $P_L$ and $P_K$ and interpret them; (c) which single extra unit, labour or capital, increases production more?
:::solution
(a) $P = 10\cdot5\cdot10 = 500$. (b) $P_L = 5L^{-0.5}K^{0.5} = 5\cdot\frac15\cdot10 = 10$: one more unit of labour adds about 10 units of output, holding capital fixed. $P_K = 5L^{0.5}K^{-0.5} = 5\cdot5\cdot\frac{1}{10} = 2.5$. (c) Labour: its marginal product is 10, versus 2.5 for capital.
:::
:::

:::ml One partial per weight
Training computes $\frac{\partial L}{\partial w_i}$ for every weight $w_i$: how much the loss changes if only that weight is nudged. In linear regression with loss $L = \frac1n\sum(w x_i + b - y_i)^2$, the partials are $\frac{\partial L}{\partial w} = \frac2n\sum(wx_i + b - y_i)x_i$ and $\frac{\partial L}{\partial b} = \frac2n\sum(wx_i + b - y_i)$. Numerical "gradient checking" estimates each partial with a centred difference to catch backpropagation bugs.
:::

:::cs Finite differences and sensitivity analysis
Engineers and simulation software estimate partial derivatives by rerunning a model with one input perturbed. The centred difference $\frac{f(x + h) - f(x - h)}{2h}$ has error proportional to $h^2$, but making $h$ too small amplifies floating-point rounding error, a classic numerical trade-off.
:::

:::real The heat index
At 32°C and 70% humidity the heat index is roughly 41°C. Tables show that at these conditions one extra degree of temperature raises the felt temperature by about 2°C, while one extra percent of humidity adds about 0.3°C. Those are estimates of the partial derivatives $H_T \approx 2$ and $H_h \approx 0.3$.
:::

:::quiz
? If $f(x, y) = x^3 + xy^2$, then $f_x$ =
+ $3x^2 + y^2$
- $3x^2 + 2xy$
- $2xy$
> Treat $y$ as a constant.

? For $f(x, y) = x^2y$, what is $f_y(3, 5)$?
= 9
> $f_y = x^2 = 9$.

? For $f(x, y) = e^{2x + 3y}$, what is $f_y(0, 0)$?
= 3
> Chain rule: $3e^{2x + 3y}$.

? For $f = x^2y^3$, $f_{xy}$ =
+ $6xy^2$
- $2xy^3$
- $6x^2y$
> $f_x = 2xy^3$, then differentiate in $y$.

? If $f(1, 2) = 5$ and $f(1.01, 2) = 5.03$, estimate $f_x(1, 2)$.
= 3
> $\frac{0.03}{0.01}$.

? For $f = x^2 - y^2$, $f_{yy}$ =
= -2
> $f_y = -2y$, so $f_{yy} = -2$.
:::

## Lesson: Tangent planes and linear approximation {#tangent-planes}
@summary: The plane that best fits a surface at a point, linearization in several variables, differentials and differentiability.

### Zooming in on a surface
In single-variable calculus, zooming in on a smooth curve makes it look like a straight line, the tangent line. The same thing happens with surfaces: zoom in far enough on a smooth surface and it looks flat, like a tilted plane. That plane is the **tangent plane**. It lets us approximate a complicated function of several variables by a simple linear one, which is the foundation of gradient descent, error estimates, and nearly every algorithm that "takes a small step".

### An everyday scenario
The Earth is round, but a football pitch looks perfectly flat. On a small enough patch, a curved surface is indistinguishable from a plane, and surveyors happily use flat-map geometry for a building site. In the same spirit, if you know a function's value and its two partial derivatives at a point, you can predict its values nearby without evaluating the complicated formula.

### Building the tangent plane
Let $z = f(x, y)$ and pick a point $(a, b)$ with height $c = f(a, b)$. A non-vertical plane through $(a, b, c)$ has the form $z = c + m(x - a) + n(y - b)$, where $m$ is its slope in the $x$ direction and $n$ its slope in the $y$ direction. For the plane to be tangent, these slopes must match the slopes of the surface's slices, which are the partial derivatives. So
$$z = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b).$$
That's it: one point and two slopes determine the plane, just as one point and one slope determine a tangent line.

:::def Tangent plane
For differentiable $f$, the plane $z = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b)$, which touches the surface $z = f(x, y)$ at $(a, b)$ and matches both partial slopes there.
:::

Example: $f(x, y) = x^2 + y^2$ at $(1, 2)$. Here $f = 5$, $f_x = 2x = 2$, $f_y = 2y = 4$. The tangent plane is $z = 5 + 2(x - 1) + 4(y - 2)$, which simplifies to $z = 2x + 4y - 5$.

@fig gradient surface=bowl | Near any point, the bowl's contours look like nearly straight, parallel lines: zoomed in, the surface is almost a plane.

### Linear approximation
The tangent plane, viewed as a function, is the **linearization** of $f$ at $(a, b)$:
$$L(x, y) = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b),$$
and near $(a, b)$, $f(x, y) \approx L(x, y)$. For the bowl at $(1, 2)$: estimate $f(1.1, 1.9)$. $L = 5 + 2(0.1) + 4(-0.1) = 4.8$. The exact value is $1.21 + 3.61 = 4.82$. The error, $0.02$, comes from the bowl's curvature and shrinks like the square of the distance.

In vector form, with $\mathbf x = (x, y)$ and $\mathbf a = (a, b)$, the linearization is $L(\mathbf x) = f(\mathbf a) + \nabla f(\mathbf a)\cdot(\mathbf x - \mathbf a)$, where $\nabla f = (f_x, f_y)$ is the gradient, the subject of the next lesson. This form works in any number of dimensions.

### Differentials and error propagation
Write small changes as $dx$ and $dy$. The linearization says the change in $f$ is about
$$df = f_x\,dx + f_y\,dy.$$
This **total differential** shows how errors in several measurements combine. A rectangle is measured as 10 cm by 6 cm, each with error up to 0.1 cm. Its area $A = xy$ has $dA = y\,dx + x\,dy = 6(0.1) + 10(0.1) = 1.6$ cm², so the area $60$ cm² is accurate to within about $1.6$ cm². Notice that the error in the *shorter* side is multiplied by the *longer* side: the area is more sensitive to it.

:::def Total differential
$df = f_x\,dx + f_y\,dy$ (more generally $\sum_i f_{x_i}dx_i$), the linear estimate of the change in $f$ caused by small input changes.
:::

### Differentiability
In one variable, having a derivative is enough for a tangent line to exist. In several variables, having partial derivatives is *not* enough: the partials only look along the two axis directions. A function is **differentiable** at a point if the tangent plane approximation is good in every direction, meaning the error $f(\mathbf x) - L(\mathbf x)$ shrinks faster than the distance $\|\mathbf x - \mathbf a\|$. A convenient sufficient condition: if the partial derivatives exist near the point and are continuous there, $f$ is differentiable. Polynomials, exponentials, and the smooth activation functions of neural networks all satisfy this. The function $\frac{xy}{x^2 + y^2}$ (with value 0 at the origin) is a warning example: both its partials at the origin are 0, yet it is not even continuous there.

:::def Differentiable (several variables)
$f$ is differentiable at $\mathbf a$ if $\lim_{\mathbf x\to\mathbf a}\frac{f(\mathbf x) - f(\mathbf a) - \nabla f(\mathbf a)\cdot(\mathbf x - \mathbf a)}{\|\mathbf x - \mathbf a\|} = 0$.
:::

### Tangent planes to level surfaces
Surfaces are sometimes given implicitly, like the sphere $x^2 + y^2 + z^2 = 14$, as a level surface $F(x, y, z) = c$. Then the tangent plane at $(a, b, c_0)$ is $F_x(x - a) + F_y(y - b) + F_z(z - c_0) = 0$, because the gradient of $F$ is perpendicular to its level surfaces. For the sphere at $(1, 2, 3)$: $F_x = 2$, $F_y = 4$, $F_z = 6$, so the plane is $2(x - 1) + 4(y - 2) + 6(z - 3) = 0$, or $x + 2y + 3z = 14$.

### Common mistakes
Forgetting to evaluate the partial derivatives at the point (leaving $2x$ instead of 2) gives a curved "plane". Using the linearization far from the point gives poor estimates, just as in one variable. And do not assume differentiability from the existence of partials alone.

### Summary
The tangent plane $z = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b)$ is the flat surface that best matches $f$ near $(a, b)$. As a function it is the linearization, giving estimates $f \approx L$ and differentials $df = f_xdx + f_ydy$ for error propagation. Differentiable functions are exactly those that look flat when you zoom in.

@viz g04-surface surface=bowl mode=plane x0=1 y0=0.5 | The translucent plane touches the surface at the chosen point. Rotate the view and move the point.

:::explore
**What to try**
1. With the bowl at $(1, 0.5)$, read the tangent plane equation in the panel. Check it: $f = 1.25$, $f_x = 2$, $f_y = 1$.
2. Rotate the view to look along the plane's edge and see how it touches the bowl only at one point.
3. Move the point to $(0, 0)$.
4. Switch to the saddle and place the point at $(0, 0)$, then at $(1, 1)$.

**What to notice:** near the point the plane and surface nearly coincide, which is why $L(1.1, 1.9) = 4.8$ is so close to the true $4.82$ in the article. At the bottom of the bowl the plane is horizontal, because both partials are 0. At the saddle's centre the plane is horizontal too, yet the surface lies above it in one direction and below it in another: a flat tangent plane does not guarantee a minimum.
:::

:::formulas
$$z = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b)$$
$$L(\mathbf x) = f(\mathbf a) + \nabla f(\mathbf a)\cdot(\mathbf x - \mathbf a)$$
$$df = f_x\,dx + f_y\,dy \qquad \Delta f \approx df$$
$$F(x, y, z) = c:\ F_x(a, b, c_0)(x - a) + F_y(\cdot)(y - b) + F_z(\cdot)(z - c_0) = 0$$
$$\frac{dA}{A} = \frac{dx}{x} + \frac{dy}{y} \text{ for } A = xy$$
:::

:::thm Continuous partials imply differentiability
If $f_x$ and $f_y$ exist in a neighbourhood of $(a, b)$ and are continuous at $(a, b)$, then $f$ is differentiable at $(a, b)$, and the tangent plane approximation has error $o(\|(x - a, y - b)\|)$.
:::

:::proof
Write $f(a + h, b + k) - f(a, b) = [f(a + h, b + k) - f(a, b + k)] + [f(a, b + k) - f(a, b)]$. By the one-variable mean value theorem, the first bracket is $f_x(a + \theta h, b + k)h$ and the second is $f_y(a, b + \phi k)k$ for some $\theta, \phi \in (0, 1)$. By continuity these partials differ from $f_x(a, b)$ and $f_y(a, b)$ by amounts that tend to 0, so the error $f - L$ is (something tending to 0) times $|h| + |k|$, which is small compared with $\sqrt{h^2 + k^2}$.
:::

:::steps Tangent plane to $z = e^{x}\cos y$ at $(0, 0)$
1. $f(0, 0) = 1$; $f_x = e^x\cos y = 1$; $f_y = -e^x\sin y = 0$ at the origin.
2. Plane: $z = 1 + 1(x - 0) + 0(y - 0)$.
3. $z = 1 + x$. So $e^{0.1}\cos(0.05) \approx 1.1$ (true value $1.1038$).
:::

:::steps Estimate $\sqrt{3.02^2 + 3.97^2}$
1. $f(x, y) = \sqrt{x^2 + y^2}$ at $(3, 4)$: $f = 5$, $f_x = \frac{x}{f} = 0.6$, $f_y = \frac{y}{f} = 0.8$.
2. $L = 5 + 0.6(0.02) + 0.8(-0.03) = 5 + 0.012 - 0.024$.
3. $\approx 4.988$ (true value $4.98804$).
:::

:::steps Error in a cylinder's volume
1. $V = \pi r^2h$ with $r = 5$, $h = 10$, each measured to $\pm0.1$.
2. $dV = 2\pi rh\,dr + \pi r^2\,dh = 2\pi(50)(0.1) + \pi(25)(0.1) = 10\pi + 2.5\pi$.
3. $dV = 12.5\pi \approx 39.3$, compared with $V = 250\pi \approx 785$: about a 5% error.
:::

:::mock Exam question
Let $f(x, y) = x^2y - y^3$. (a) Find the tangent plane at $(2, 1)$. (b) Use it to estimate $f(2.1, 0.9)$ and compare with the exact value. (c) Find the tangent plane to the level surface $xyz = 6$ at $(1, 2, 3)$.
:::solution
(a) $f(2, 1) = 4 - 1 = 3$; $f_x = 2xy = 4$; $f_y = x^2 - 3y^2 = 1$. Plane: $z = 3 + 4(x - 2) + (y - 1)$. (b) $L = 3 + 0.4 - 0.1 = 3.3$; exact $4.41(0.9) - 0.729 = 3.969 - 0.729 = 3.24$, error $0.06$. (c) $F = xyz$: $F_x = yz = 6$, $F_y = xz = 3$, $F_z = xy = 2$. Plane: $6(x - 1) + 3(y - 2) + 2(z - 3) = 0$, i.e. $6x + 3y + 2z = 18$.
:::
:::

:::ml First-order approximations in training
Every gradient step relies on $L(\mathbf w + \Delta) \approx L(\mathbf w) + \nabla L\cdot\Delta$, the tangent-plane approximation of the loss. Choosing $\Delta = -\eta\nabla L$ makes the predicted change $-\eta\|\nabla L\|^2 < 0$. The approximation is only trustworthy for small steps, which is why learning rates are small, and trust-region methods explicitly limit the step to the region where the linear (or quadratic) model is accurate. Explanation methods like gradient × input also use the linearization of a network around an input.
:::

:::cs Linearization in graphics and robotics
Robots and self-driving cars track their position with the extended Kalman filter, which linearizes nonlinear motion and sensor models around the current estimate using exactly these tangent-plane formulas. Shading in computer graphics uses surface normals, the vectors perpendicular to tangent planes, to compute how light reflects.
:::

:::real Measurement error in engineering
An engineer computes a beam's stress from several measured quantities. The total differential tells her which measurement's error matters most: if stress is proportional to $\frac{F}{d^2}$, a 1% error in the diameter $d$ causes a 2% error in stress, twice the effect of a 1% error in the force $F$. She spends her budget on a better caliper.
:::

:::quiz
? The tangent plane to $z = x^2 + y^2$ at $(1, 1)$ is $z = 2 + 2(x - 1) + b(y - 1)$. What is $b$?
= 2
> $f_y = 2y = 2$.

? Using the tangent plane of $f = xy$ at $(2, 3)$, estimate $f(2.1, 3)$.
= 6.3
> $L = 6 + 3(0.1) + 2(0) = 6.3$.

? The total differential of $f = x^2y$ is...
+ $2xy\,dx + x^2\,dy$
- $2x\,dx + dy$
- $2xy\,dx\,dy$
> $f_xdx + f_ydy$.

? A tangent plane at a minimum of a smooth function is...
+ horizontal
- vertical
- undefined
> Both partials are 0.

? A rectangle is 4 by 5 and each side grows by 0.1. Estimate the change in area.
= 0.9
> $dA = 5(0.1) + 4(0.1)$.

? Existence of both partial derivatives at a point guarantees differentiability.
+ False
- True
> Continuity of the partials is the usual sufficient condition.
:::

## Lesson: The gradient and directional derivatives {#gradient}
@summary: The vector of partial derivatives, rates of change in any direction, steepest ascent, and gradient descent.

### Which way is uphill?
Partial derivatives tell you how steep a hill is if you walk due east or due north. But you can walk in any direction. Which direction is steepest, and how steep is it? The answer is a single vector built from the partials: the **gradient**. It points straight uphill, its length tells you how steep, and its opposite direction is the route gradient descent takes to train nearly every machine learning model. If one idea from multivariable calculus matters most for ML, it is this one.

### An everyday scenario
You are standing on a foggy hillside and want to reach the valley floor. You cannot see far, but you can feel the slope under your feet. A sensible plan: feel which direction slopes down most steeply, take a step that way, and repeat. That is gradient descent. To make it work, you need to know, at each spot, the direction of steepest descent, which is minus the gradient.

### The gradient vector
The gradient of $f(x, y)$ is the vector of its partial derivatives:
$$\nabla f(x, y) = \big(f_x(x, y),\ f_y(x, y)\big).$$
The symbol $\nabla$ is called "nabla" or "del". In $n$ variables, $\nabla f = (f_{x_1}, \ldots, f_{x_n})$. For $f(x, y) = x^2 + 3y^2$, $\nabla f = (2x, 6y)$, so at $(1, 1)$ the gradient is $(2, 6)$. The gradient is a vector field: at every point of the plane it gives an arrow.

:::def Gradient
$\nabla f = \left(\frac{\partial f}{\partial x_1}, \ldots, \frac{\partial f}{\partial x_n}\right)$, the vector of all first partial derivatives of $f$.
:::

### Directional derivatives
Suppose you walk from $(a, b)$ in the direction of a **unit** vector $\mathbf u = (u_1, u_2)$. The rate at which $f$ changes is the **directional derivative**
$$D_{\mathbf u}f(a, b) = \lim_{h\to0}\frac{f(a + hu_1, b + hu_2) - f(a, b)}{h}.$$
Using the tangent plane, moving a small distance $h$ along $\mathbf u$ changes $f$ by about $f_x(hu_1) + f_y(hu_2)$. Dividing by $h$:
$$D_{\mathbf u}f = f_xu_1 + f_yu_2 = \nabla f\cdot\mathbf u.$$
The partial derivatives are just the special cases $\mathbf u = (1, 0)$ and $(0, 1)$. Example: for $f = x^2 + 3y^2$ at $(1, 1)$ in the direction of $(3, 4)$, first normalize: $\mathbf u = \left(\frac35, \frac45\right)$. Then $D_{\mathbf u}f = 2\cdot\frac35 + 6\cdot\frac45 = \frac{6 + 24}{5} = 6$.

:::def Directional derivative
$D_{\mathbf u}f(\mathbf a) = \nabla f(\mathbf a)\cdot\mathbf u$ for a unit vector $\mathbf u$: the rate of change of $f$ per unit distance moved in direction $\mathbf u$.
:::

### Why the gradient points uphill
The dot product formula $\nabla f\cdot\mathbf u = \|\nabla f\|\,\|\mathbf u\|\cos\theta = \|\nabla f\|\cos\theta$, where $\theta$ is the angle between $\mathbf u$ and the gradient. This is largest when $\cos\theta = 1$, that is when $\mathbf u$ points the same way as $\nabla f$. So:

The gradient points in the direction of **steepest ascent**, and the steepest rate of increase is $\|\nabla f\|$. The opposite direction, $-\nabla f$, is the direction of **steepest descent**, with rate $-\|\nabla f\|$. Directions perpendicular to the gradient ($\theta = 90°$) have rate 0: walking that way keeps you at the same height, along a contour.

That last fact gives a beautiful geometric picture: **the gradient is perpendicular to the level curves.** On a contour map, gradient arrows cross the contours at right angles, pointing toward higher values, and they are longest where contours are closest together. For $f = x^2 + 3y^2$ at $(1, 1)$, the steepest rate is $\|(2, 6)\| = \sqrt{40} \approx 6.32$, a little more than the 6 we found in direction $(3, 4)$.

@fig gradient surface=ravine | Gradient arrows cross the contours at right angles and point uphill; the negative gradient points downhill.

### Gradient descent
To minimize a function, repeatedly step in the steepest-descent direction:
$$\mathbf x_{k+1} = \mathbf x_k - \eta\,\nabla f(\mathbf x_k),$$
where the **learning rate** $\eta > 0$ controls the step size. For $f = x^2 + 3y^2$ starting at $(1, 1)$ with $\eta = 0.1$: the gradient is $(2, 6)$, so the next point is $(1 - 0.2,\ 1 - 0.6) = (0.8, 0.4)$, and $f$ drops from 4 to $0.64 + 0.48 = 1.12$. Repeating drives the point to the minimum at the origin. If $\eta$ is too large (here, above $\frac13$, since the $y$-curvature is 6), the steps overshoot and diverge. On elongated valleys like this one, the gradient points mostly across the valley rather than along it, so plain gradient descent zig-zags; momentum and Adam were invented to fix that.

### Gradients of common functions
A few gradients come up so often in ML that they are worth knowing by heart. For a linear function $f(\mathbf x) = \mathbf w\cdot\mathbf x$, the gradient is simply $\mathbf w$, the same at every point, which is why a linear model's contours are parallel lines. For the squared length $f(\mathbf x) = \|\mathbf x\|^2 = x_1^2 + \cdots + x_n^2$, each partial is $2x_i$, so $\nabla f = 2\mathbf x$, pointing straight away from the origin. Gradients also obey sum and product rules exactly like derivatives, so complicated losses can be handled piece by piece.

### Common mistakes
Forgetting to normalize the direction vector is the most common error in directional derivatives: $\nabla f\cdot(3, 4)$ is five times too big. Another is thinking the gradient points toward the maximum; it points in the locally steepest direction, which can be quite different. Finally, remember the gradient lives in the input space (the $xy$-plane), not on the surface itself.

### Summary
The gradient $\nabla f$ collects all partial derivatives into a vector. The rate of change in a unit direction $\mathbf u$ is $\nabla f\cdot\mathbf u$. The gradient points in the direction of steepest ascent, with rate $\|\nabla f\|$, and is perpendicular to level curves. Gradient descent steps along $-\nabla f$ with learning rate $\eta$.

@viz gradient surface=ravine | Drag the point. Pink = gradient (uphill), green = negative gradient (the way gradient descent goes).

:::explore
**What to try**
1. Drag the point around the ravine and watch the arrows relative to the contour lines.
2. Move the point to where contours are tightly packed, then to where they are sparse.
3. Switch to the bowl and the saddle.

**What to notice:** the arrows always cross the contours at right angles, as the article proved. They are long where contours are packed (steep) and short where they are sparse. In the ravine, the green arrow points mostly across the valley, not along it toward the minimum, which explains the zig-zagging of plain gradient descent.
:::

@viz gd surface=bowl lr=0.1 | Press Run. Try a large learning rate and watch it overshoot or diverge.

:::explore
**What to try**
1. With learning rate $0.1$ on the bowl, press Run and count how quickly the path reaches the centre.
2. Raise the learning rate step by step toward $0.6$.
3. Switch to the ravine with plain GD, then compare Momentum and Adam.

**What to notice:** small learning rates converge smoothly but slowly; larger ones get there faster until they start to overshoot, bouncing across the bowl, and eventually diverge. On the ravine, plain GD zig-zags across the narrow direction, while momentum builds up speed along the valley floor.
:::

:::formulas
$$\nabla f = (f_x, f_y) \qquad \nabla f = \left(\frac{\partial f}{\partial x_1}, \ldots, \frac{\partial f}{\partial x_n}\right)$$
$$D_{\mathbf u}f = \nabla f\cdot\mathbf u = \|\nabla f\|\cos\theta\quad(\|\mathbf u\| = 1)$$
$$\max_{\mathbf u}D_{\mathbf u}f = \|\nabla f\| \text{ in direction } \frac{\nabla f}{\|\nabla f\|}$$
$$\mathbf x_{k+1} = \mathbf x_k - \eta\,\nabla f(\mathbf x_k)$$
$$\nabla(f + g) = \nabla f + \nabla g \qquad \nabla(fg) = g\nabla f + f\nabla g \qquad \nabla(\mathbf w\cdot\mathbf x) = \mathbf w \qquad \nabla\|\mathbf x\|^2 = 2\mathbf x$$
:::

:::thm Gradient is the direction of steepest ascent
If $f$ is differentiable at $\mathbf a$ and $\nabla f(\mathbf a) \ne \mathbf 0$, then among all unit vectors $\mathbf u$, $D_{\mathbf u}f(\mathbf a)$ is largest for $\mathbf u = \frac{\nabla f(\mathbf a)}{\|\nabla f(\mathbf a)\|}$, with maximum value $\|\nabla f(\mathbf a)\|$; it is zero for $\mathbf u$ perpendicular to the gradient.
:::

:::proof
$D_{\mathbf u}f = \nabla f\cdot\mathbf u$. By the Cauchy–Schwarz inequality, $|\nabla f\cdot\mathbf u| \le \|\nabla f\|\|\mathbf u\| = \|\nabla f\|$, with equality exactly when $\mathbf u$ is a positive multiple of $\nabla f$ (for the maximum). When $\mathbf u \perp \nabla f$, the dot product is 0.
:::

:::thm Gradient is perpendicular to level sets
If $f$ is differentiable and $\mathbf r(t)$ is a curve lying in the level set $f = c$, then $\nabla f(\mathbf r(t))\cdot\mathbf r'(t) = 0$.
:::

:::steps Directional derivative of $f = xy^2$ at $(2, 1)$ toward $(1, 1)$
1. $\nabla f = (y^2, 2xy) = (1, 4)$.
2. Unit direction: $\mathbf u = \frac{1}{\sqrt2}(1, 1)$.
3. $D_{\mathbf u}f = \frac{1 + 4}{\sqrt2} = \frac{5}{\sqrt2} \approx 3.54$; the maximum possible is $\|(1, 4)\| = \sqrt{17} \approx 4.12$.
:::

:::steps Steepest descent direction for $f = x^2 + xy + y^2$ at $(1, 2)$
1. $\nabla f = (2x + y, x + 2y) = (4, 5)$.
2. Steepest descent: $-\nabla f = (-4, -5)$; unit vector $\frac{(-4, -5)}{\sqrt{41}}$.
3. Rate of decrease: $\sqrt{41} \approx 6.40$ per unit distance.
:::

:::steps Two gradient descent steps on $f = (x - 3)^2 + 2y^2$ from $(0, 1)$ with $\eta = 0.25$
1. $\nabla f = (2(x - 3), 4y) = (-6, 4)$; step: $(0, 1) - 0.25(-6, 4) = (1.5, 0)$.
2. $\nabla f(1.5, 0) = (-3, 0)$; step: $(1.5 + 0.75, 0) = (2.25, 0)$.
3. $f$ falls from $11$ to $2.25$ to $0.5625$, heading to the minimum at $(3, 0)$.
:::

:::mock Exam question
The temperature on a metal plate is $T(x, y) = 100 - x^2 - 2y^2$. An ant is at $(2, 1)$. (a) In which unit direction should it move to warm up fastest, and at what rate? (b) What is the rate of change if it moves toward the point $(5, 5)$? (c) In which directions does the temperature not change?
:::solution
(a) $\nabla T = (-2x, -4y) = (-4, -4)$. Fastest warming: $\mathbf u = \frac{1}{\sqrt2}(-1, -1)$, at rate $\|\nabla T\| = 4\sqrt2 \approx 5.66$ degrees per unit. (b) Direction $(3, 4)$, unit $\left(\frac35, \frac45\right)$: $D_{\mathbf u}T = -4\cdot\frac35 - 4\cdot\frac45 = -\frac{28}{5} = -5.6$, cooling. (c) Perpendicular to $(-4, -4)$: $\pm\frac{1}{\sqrt2}(1, -1)$, along the isotherm.
:::
:::

:::ml Gradient descent and its variants
Neural networks are trained by stochastic gradient descent: $\mathbf w \leftarrow \mathbf w - \eta\nabla L_{\text{batch}}(\mathbf w)$, where the gradient comes from backpropagation. Momentum averages past gradients to damp zig-zagging; Adam rescales each coordinate by a running estimate of its gradient size. Gradients with respect to inputs are used too: saliency maps show which pixels most affect a prediction, and adversarial examples step along $\operatorname{sign}(\nabla_{\mathbf x}L)$.
:::

:::cs Edge detection
In image processing, the gradient of pixel intensity points across edges. The Sobel operator estimates $\nabla I$ with small finite-difference filters; its magnitude highlights edges and its direction gives their orientation, the first stage of the Canny edge detector.
:::

:::real Water flowing downhill
Rain on a hillside flows in the direction of $-\nabla h$, the steepest descent of the terrain height. Hydrologists compute drainage networks and flood paths from digital elevation maps by following negative gradients from every cell.
:::

:::quiz
? For $f = x^2 + y^2$, $\nabla f(3, 4)$ =
+ $(6, 8)$
- $(3, 4)$
- $(9, 16)$
> $(2x, 2y)$.

? The maximum rate of increase of $f = x^2 + y^2$ at $(3, 4)$ is...
= 10
> $\|(6, 8)\| = 10$.

? For $\nabla f = (2, 6)$, what is $D_{\mathbf u}f$ in the unit direction $(0.6, 0.8)$?
= 6
> $1.2 + 4.8$.

? The gradient at a point is ... to the level curve through that point.
+ perpendicular
- parallel
- tangent
> Moving along a contour gives zero change.

? One gradient step on $f = x^2$ from $x = 3$ with $\eta = 0.25$ lands at...
= 1.5|3/2
> $3 - 0.25\cdot6$.

? Gradient descent moves in the direction of...
+ $-\nabla f$
- $\nabla f$
- a contour line
> Steepest descent.
:::

## Lesson: The multivariable chain rule {#multi-chain}
@summary: How rates combine when variables depend on other variables: tree diagrams, the total derivative, and backpropagation through graphs.

### Chains with several links
In single-variable calculus, the chain rule says rates multiply along a chain: if $y$ depends on $u$ and $u$ on $x$, then $\frac{dy}{dx} = \frac{dy}{du}\frac{du}{dx}$. In several variables, a quantity can depend on its inputs through **several paths at once**. The temperature you feel on a car trip depends on your position $(x, y)$, and both coordinates change with time. A neural network's loss depends on a weight through every neuron that weight influences. The multivariable chain rule says: multiply rates along each path, then **add over all paths**.

### An everyday scenario
You are driving through hilly country. The height of the road is $h(x, y)$ and your position changes with time, $x(t)$ and $y(t)$. How fast is your altitude changing? Part of the change comes from moving east ($h_x\cdot\frac{dx}{dt}$) and part from moving north ($h_y\cdot\frac{dy}{dt}$). The total rate is the sum. If the ground rises 0.1 m per metre eastward, you drive east at 20 m/s, it falls 0.05 m per metre northward and you drive north at 10 m/s, your altitude changes at $0.1(20) - 0.05(10) = 1.5$ m/s.

### The first form: one parameter
If $z = f(x, y)$ with $x = x(t)$ and $y = y(t)$, then
$$\frac{dz}{dt} = \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt}.$$
In vector form this is $\frac{dz}{dt} = \nabla f\cdot\mathbf r'(t)$, where $\mathbf r(t) = (x(t), y(t))$: the gradient dotted with the velocity. That is exactly the directional derivative, scaled by speed.

Example: $f(x, y) = x^2y$ with $x = \cos t$, $y = \sin t$. Then $f_x = 2xy$, $f_y = x^2$, $x' = -\sin t$, $y' = \cos t$. At $t = 0$: $x = 1$, $y = 0$, so $\frac{dz}{dt} = 0\cdot0 + 1\cdot1 = 1$. Check directly: $z = \cos^2t\sin t$ has derivative $-2\cos t\sin^2t + \cos^3t$, which is 1 at $t = 0$.

:::def Total derivative along a path
For $z = f(\mathbf x(t))$, $\frac{dz}{dt} = \sum_i\frac{\partial f}{\partial x_i}\frac{dx_i}{dt} = \nabla f\cdot\mathbf x'(t)$.
:::

### The second form: several parameters
If $z = f(x, y)$ where $x$ and $y$ both depend on $s$ and $t$, then each partial derivative of $z$ collects one term per path:
$$\frac{\partial z}{\partial s} = \frac{\partial z}{\partial x}\frac{\partial x}{\partial s} + \frac{\partial z}{\partial y}\frac{\partial y}{\partial s}, \qquad \frac{\partial z}{\partial t} = \frac{\partial z}{\partial x}\frac{\partial x}{\partial t} + \frac{\partial z}{\partial y}\frac{\partial y}{\partial t}.$$
A **tree diagram** keeps this straight: draw $z$ at the top, branches to $x$ and $y$, and from each of those branches to $s$ and $t$. Label each branch with its partial derivative. To get $\frac{\partial z}{\partial s}$, find every route from $z$ down to $s$, multiply the labels along each route, and add the routes.

@fig func kind=linear | Each link in a chain scales a small change by its own rate; with several paths, the contributions add.

Example: $z = x^2 + y^2$, $x = s + t$, $y = s - t$. Then $\frac{\partial z}{\partial s} = 2x\cdot1 + 2y\cdot1 = 2(s + t) + 2(s - t) = 4s$. Check: $z = (s + t)^2 + (s - t)^2 = 2s^2 + 2t^2$, whose $s$-partial is $4s$.

### Why it works
Nudge $t$ by $\Delta t$. Then $x$ changes by about $x'\Delta t$ and $y$ by about $y'\Delta t$. By the tangent-plane approximation, $f$ changes by about $f_x\Delta x + f_y\Delta y = (f_xx' + f_yy')\Delta t$. Dividing by $\Delta t$ and letting it shrink gives the formula. The contributions add because, to first order, a smooth function behaves like a linear one, and linear effects simply add.

### Implicit differentiation revisited
The chain rule gives a slick formula for implicit curves. If $F(x, y) = 0$ defines $y$ as a function of $x$, differentiate both sides with respect to $x$: $F_x + F_y\frac{dy}{dx} = 0$, so
$$\frac{dy}{dx} = -\frac{F_x}{F_y}.$$
For the circle $F = x^2 + y^2 - 25$: $\frac{dy}{dx} = -\frac{2x}{2y} = -\frac xy$, matching the single-variable lesson.

### Computational graphs and backpropagation
A neural network is a big composition. Write it as a **computational graph**: nodes are intermediate values, edges show which values feed which. The derivative of the output with respect to any node is the sum, over all paths from that node to the output, of the products of local derivatives along the path. Backpropagation computes all of these efficiently by working backward from the output: each node's gradient is the sum, over its children, of (child's gradient) × (local derivative). For example, with $L = (wx + b - y)^2$, define $u = wx + b - y$; then $\frac{\partial L}{\partial w} = 2u\cdot x$ and $\frac{\partial L}{\partial b} = 2u\cdot1$, sharing the factor $2u$ computed once.

### The chain rule in matrix form
When there are many inputs and many intermediate variables, the sums become matrix products. If $\mathbf u = g(\mathbf x)$ and $z = f(\mathbf u)$, collect the partials $\frac{\partial u_i}{\partial x_j}$ into a matrix $J_g$ (the Jacobian of the next lesson). Then $\nabla_{\mathbf x}z = J_g^\top\nabla_{\mathbf u}z$: each entry is a sum over paths through every $u_i$. For a linear layer $\mathbf u = W\mathbf x$, the Jacobian is $W$ itself, so the gradient flowing back to the input is $W^\top\nabla_{\mathbf u}z$. That single formula is how gradients pass backward through every dense layer of a neural network.

### Common mistakes
The most frequent error is missing a path, for instance forgetting that $y$ also depends on $t$. Another is mixing up $\frac{d}{dt}$ (total, through all paths) and $\frac{\partial}{\partial t}$ (holding other variables fixed) when a function depends on $t$ both directly and through other variables. Finally, evaluate every factor at the same point.

### Summary
When a variable influences the output through several intermediate variables, multiply derivatives along each path and add over paths: $\frac{dz}{dt} = f_x x' + f_y y' = \nabla f\cdot\mathbf r'$. Tree diagrams organize the bookkeeping. Implicit derivatives follow as $-\frac{F_x}{F_y}$. Backpropagation is this rule applied systematically to a computational graph.

@viz g04-surface surface=dome mode=plane x0=1 y0=0.5 | Moving the point changes height at a rate given by the tangent plane: dz = f_x dx + f_y dy, the chain rule's sum of paths.

:::explore
**What to try**
1. On the dome, read $f_x$ and $f_y$ at $(1, 0.5)$: they should be $-2$ and $-1$.
2. Increase $x_0$ by 0.1 and note the height change; then instead increase $y_0$ by 0.1.
3. Now increase both by 0.1 and compare with the sum of the two separate changes.

**What to notice:** moving 0.1 in $x$ lowers the height by about $0.2$, moving 0.1 in $y$ lowers it by about $0.1$, and moving in both lowers it by about $0.3$: contributions from each path add, exactly as $\frac{dz}{dt} = f_xx' + f_yy'$ says. The small mismatch comes from curvature and disappears for smaller nudges.
:::

:::formulas
$$\frac{dz}{dt} = \frac{\partial z}{\partial x}\frac{dx}{dt} + \frac{\partial z}{\partial y}\frac{dy}{dt} = \nabla f\cdot\mathbf r'(t)$$
$$\frac{\partial z}{\partial s} = \frac{\partial z}{\partial x}\frac{\partial x}{\partial s} + \frac{\partial z}{\partial y}\frac{\partial y}{\partial s}$$
$$\frac{\partial z}{\partial t_j} = \sum_i\frac{\partial z}{\partial x_i}\frac{\partial x_i}{\partial t_j}$$
$$F(x, y) = 0 \Rightarrow \frac{dy}{dx} = -\frac{F_x}{F_y}$$
$$\frac{\partial L}{\partial v} = \sum_{c\,\in\,\text{children}(v)}\frac{\partial L}{\partial c}\frac{\partial c}{\partial v}$$
:::

:::thm Multivariable chain rule
If $x(t)$ and $y(t)$ are differentiable at $t$ and $f$ is differentiable at $(x(t), y(t))$, then $z = f(x(t), y(t))$ is differentiable and $\frac{dz}{dt} = f_x\,x'(t) + f_y\,y'(t)$.
:::

:::proof
Let $\Delta x$, $\Delta y$ be the changes produced by $\Delta t$. Differentiability of $f$ gives $\Delta z = f_x\Delta x + f_y\Delta y + \varepsilon\sqrt{\Delta x^2 + \Delta y^2}$ with $\varepsilon\to0$ as $(\Delta x, \Delta y)\to0$. Divide by $\Delta t$: $\frac{\Delta z}{\Delta t} = f_x\frac{\Delta x}{\Delta t} + f_y\frac{\Delta y}{\Delta t} \pm \varepsilon\sqrt{(\Delta x/\Delta t)^2 + (\Delta y/\Delta t)^2}$. As $\Delta t\to0$, the quotients tend to $x'$ and $y'$, the square root stays bounded, and $\varepsilon\to0$.
:::

:::steps $z = e^{xy}$, $x = t^2$, $y = 3t$: find $\frac{dz}{dt}$ at $t = 1$
1. $z_x = ye^{xy}$, $z_y = xe^{xy}$; $x' = 2t$, $y' = 3$.
2. At $t = 1$: $x = 1$, $y = 3$, $e^{xy} = e^3$. So $\frac{dz}{dt} = 3e^3\cdot2 + 1\cdot e^3\cdot3$.
3. $= 9e^3 \approx 180.8$. (Directly: $z = e^{3t^3}$, $z' = 9t^2e^{3t^3}$.)
:::

:::steps Polar coordinates: $z = f(x, y)$ with $x = r\cos\theta$, $y = r\sin\theta$
1. $\frac{\partial z}{\partial r} = f_x\cos\theta + f_y\sin\theta$.
2. $\frac{\partial z}{\partial\theta} = -f_xr\sin\theta + f_yr\cos\theta$.
3. For $f = x^2 + y^2 = r^2$: $\frac{\partial z}{\partial r} = 2r\cos^2\theta + 2r\sin^2\theta = 2r$, as expected.
:::

:::steps Implicit slope of $x^3 + y^3 = 6xy$ at $(3, 3)$
1. $F = x^3 + y^3 - 6xy$: $F_x = 3x^2 - 6y = 27 - 18 = 9$, $F_y = 3y^2 - 6x = 9$.
2. $\frac{dy}{dx} = -\frac{F_x}{F_y} = -1$.
3. Check the point: $27 + 27 = 54 = 6\cdot9$.
:::

:::mock Exam question
A single neuron computes $z = w_1x_1 + w_2x_2 + b$, $a = \sigma(z)$ and loss $L = \frac12(a - y)^2$. With $x = (1, 2)$, $w = (0.5, -0.25)$, $b = 0$ and target $y = 1$, find $\frac{\partial L}{\partial w_1}$, $\frac{\partial L}{\partial w_2}$ and $\frac{\partial L}{\partial b}$. (Use $\sigma(0) = 0.5$ and $\sigma' = \sigma(1 - \sigma)$.)
:::solution
Forward: $z = 0.5 - 0.5 + 0 = 0$, $a = 0.5$, $L = 0.125$. Backward: $\frac{\partial L}{\partial a} = a - y = -0.5$; $\frac{\partial a}{\partial z} = 0.25$; so $\frac{\partial L}{\partial z} = -0.125$. Then $\frac{\partial z}{\partial w_1} = x_1 = 1$, $\frac{\partial z}{\partial w_2} = x_2 = 2$, $\frac{\partial z}{\partial b} = 1$. Results: $\frac{\partial L}{\partial w_1} = -0.125$, $\frac{\partial L}{\partial w_2} = -0.25$, $\frac{\partial L}{\partial b} = -0.125$.
:::
:::

:::ml Backpropagation sums over paths
In a network, a weight in an early layer affects the loss through every neuron downstream. The chain rule says its gradient is a sum over all those paths, which would be exponentially many to enumerate. Backprop avoids this by computing $\frac{\partial L}{\partial v}$ for each node once, from the output backward, and reusing it. When a value feeds several consumers (a residual connection, a shared embedding), its gradient is the sum of the gradients from each consumer, exactly the "add over paths" rule.
:::

:::cs Reverse-mode automatic differentiation
Reverse-mode autodiff records a computational graph during the forward pass, then visits nodes in reverse topological order, accumulating adjoints $\bar v = \sum_c\bar c\,\frac{\partial c}{\partial v}$. Its cost is a small constant times the forward pass, regardless of the number of inputs, which is why it suits functions with millions of inputs and one scalar output.
:::

:::real Changing gas pressure
For an ideal gas, $P = \frac{kT}{V}$. If temperature rises at 2 K/min and volume grows at 0.5 L/min, then $\frac{dP}{dt} = \frac{k}{V}\frac{dT}{dt} - \frac{kT}{V^2}\frac{dV}{dt}$: heating pushes pressure up, expansion pulls it down, and the chain rule weighs the two effects.
:::

:::quiz
? If $z = xy$, $x = t$, $y = t^2$, then $\frac{dz}{dt}$ at $t = 1$ is...
= 3
> $y\cdot1 + x\cdot2t = 1 + 2$.

? The chain rule with several intermediate variables...
+ adds the products along each path
- multiplies all partial derivatives together
- uses only the largest path
> Sum over paths, product along each.

? For $F(x, y) = x^2 + y^2 - 25$, what is $dy/dx$ at $(3, 4)$?
= -3/4|-0.75
> $-\frac{F_x}{F_y} = -\frac{6}{8}$.

? If $\nabla f = (2, -1)$ and $\mathbf r'(t) = (3, 4)$, then $\frac{d}{dt}f(\mathbf r(t))$ =
= 2
> $6 - 4$.

? $z = x^2 + y^2$, $x = s + t$, $y = s - t$. At $s = 1$, $t = 2$, $\partial z/\partial s$ =
= 4
> $4s$.

? In backprop, a node used by two later nodes gets a gradient equal to...
+ the sum of the gradients from both
- the product of the two gradients
- the larger of the two
> Contributions from each path add.
:::

## Lesson: Jacobians and Hessians {#jacobian-hessian}
@summary: The Jacobian matrix of a vector-valued function, the Hessian matrix of second derivatives, and second-order Taylor approximations.

### Organizing many derivatives
A function with many inputs has many partial derivatives, and a function with many outputs has even more. Writing them one by one quickly becomes unmanageable. Linear algebra gives us two tidy containers. The **Jacobian** collects all first partial derivatives of a vector-valued function into a matrix; it is the multivariable version of "the derivative". The **Hessian** collects all second partial derivatives of a scalar function; it is the multivariable version of "the second derivative" and describes curvature. Both appear constantly in ML: Jacobians in backpropagation and normalizing flows, Hessians in optimization and in understanding loss landscapes.

### An everyday scenario
A camera turns 3D positions into 2D pixel positions. If an object moves slightly, how do its pixel coordinates move? Each of the two outputs depends on each of the three inputs, so there are six rates of change. Arranged in a $2\times3$ grid, they form the Jacobian, and multiplying it by the small 3D movement gives the predicted 2D movement on the screen. Robot arms, graphics engines and tracking software use exactly this.

### The Jacobian matrix
Let $\mathbf F : \mathbb R^n \to \mathbb R^m$ have components $F_1, \ldots, F_m$. Its Jacobian is the $m\times n$ matrix whose row $i$ is the gradient of $F_i$:
$$J_{\mathbf F} = \begin{pmatrix}\frac{\partial F_1}{\partial x_1} & \cdots & \frac{\partial F_1}{\partial x_n}\\ \vdots & & \vdots\\ \frac{\partial F_m}{\partial x_1} & \cdots & \frac{\partial F_m}{\partial x_n}\end{pmatrix}.$$
Rows correspond to outputs, columns to inputs. For $\mathbf F(x, y) = (x^2y,\ 5x + \sin y)$:
$$J = \begin{pmatrix}2xy & x^2\\ 5 & \cos y\end{pmatrix}, \qquad J(1, 0) = \begin{pmatrix}0 & 1\\ 5 & 1\end{pmatrix}.$$

:::def Jacobian matrix
For $\mathbf F : \mathbb R^n \to \mathbb R^m$, the $m\times n$ matrix $J$ with entries $J_{ij} = \frac{\partial F_i}{\partial x_j}$.
:::

### What the Jacobian means
The Jacobian is the best linear approximation of $\mathbf F$ near a point: $\mathbf F(\mathbf a + \mathbf h) \approx \mathbf F(\mathbf a) + J(\mathbf a)\mathbf h$. Near any point, a smooth map acts like multiplication by a matrix. With the example above at $(1, 0)$, a nudge $\mathbf h = (0.1, 0.2)$ changes the output by about $J\mathbf h = (0.2,\ 0.7)$. Exactly: $\mathbf F(1.1, 0.2) - \mathbf F(1, 0) = (0.242,\ 0.699)$. Close.

For a square Jacobian ($n = m$), the **determinant** $\det J$ measures how much the map stretches area or volume locally. That is why it appears when changing variables in integrals and in probability densities. A linear map $\mathbf F(\mathbf x) = A\mathbf x$ has Jacobian $A$ everywhere.

### The chain rule as matrix multiplication
If $\mathbf G : \mathbb R^n\to\mathbb R^k$ and $\mathbf F : \mathbb R^k\to\mathbb R^m$, then the Jacobian of the composition is the product of Jacobians:
$$J_{\mathbf F\circ\mathbf G}(\mathbf x) = J_{\mathbf F}(\mathbf G(\mathbf x))\,J_{\mathbf G}(\mathbf x).$$
This is the multivariable chain rule written compactly; the matrix product automatically performs the "multiply along paths, add over paths" bookkeeping. A deep network is a long chain of such maps, and backprop multiplies (transposed) Jacobians from the output backward.

### The Hessian matrix
For a scalar function $f : \mathbb R^n\to\mathbb R$, the Hessian is the $n\times n$ matrix of second partials, $H_{ij} = \frac{\partial^2f}{\partial x_i\partial x_j}$. For two variables:
$$H = \begin{pmatrix}f_{xx} & f_{xy}\\ f_{yx} & f_{yy}\end{pmatrix}.$$
By Clairaut's theorem $f_{xy} = f_{yx}$, so the Hessian is **symmetric**. For $f = x^3 + 2xy + y^2$: $f_x = 3x^2 + 2y$, $f_y = 2x + 2y$, so $H = \begin{pmatrix}6x & 2\\ 2 & 2\end{pmatrix}$. The Hessian is also the Jacobian of the gradient.

:::def Hessian matrix
For $f : \mathbb R^n\to\mathbb R$, the symmetric $n\times n$ matrix $H$ with entries $H_{ij} = \frac{\partial^2 f}{\partial x_i\,\partial x_j}$.
:::

@fig gradient surface=saddle | The saddle x² − y² has Hessian with entries 2 and −2 on the diagonal: it curves up in one direction and down in the other.

### Curvature and the second-order approximation
The Hessian gives the quadratic term of the multivariable Taylor expansion:
$$f(\mathbf a + \mathbf h) \approx f(\mathbf a) + \nabla f(\mathbf a)\cdot\mathbf h + \tfrac12\mathbf h^\top H(\mathbf a)\mathbf h.$$
The quantity $\mathbf h^\top H\mathbf h$ is the curvature in direction $\mathbf h$. The eigenvectors of $H$ are the principal directions of curvature and the eigenvalues say how sharply the surface bends along them. If all eigenvalues are positive (**positive definite**), the surface curves up in every direction, like a bowl. If all are negative, it curves down like a dome. Mixed signs mean a saddle. For $f = x^2 + 3y^2$, $H = \operatorname{diag}(2, 6)$: a bowl three times steeper in the $y$ direction than in $x$. The ratio of the largest to smallest eigenvalue, the **condition number** (here 3), predicts how badly gradient descent will zig-zag.

:::def Positive definite matrix
A symmetric matrix $H$ with $\mathbf h^\top H\mathbf h > 0$ for every nonzero $\mathbf h$; equivalently, all its eigenvalues are positive.
:::

### Quadratic functions: the model case
The simplest functions with a Hessian are quadratics, $f(\mathbf x) = \frac12\mathbf x^\top A\mathbf x - \mathbf b^\top\mathbf x$ with $A$ symmetric. Their gradient is $A\mathbf x - \mathbf b$ and their Hessian is the constant matrix $A$. Setting the gradient to zero gives the linear system $A\mathbf x = \mathbf b$, so minimizing a quadratic is the same as solving linear equations. Least squares regression is exactly this case, and near any minimum, every smooth loss looks like a quadratic described by its Hessian.

### Common mistakes
Transposing the Jacobian (rows for inputs instead of outputs) breaks the chain-rule multiplication. Forgetting the factor $\frac12$ in the quadratic term is another frequent slip. And a Hessian with a zero determinant does not tell you the shape on its own; higher-order terms decide.

### Summary
The Jacobian collects first derivatives of a vector function, $J_{ij} = \frac{\partial F_i}{\partial x_j}$, and gives the linear approximation $\mathbf F(\mathbf a + \mathbf h) \approx \mathbf F(\mathbf a) + J\mathbf h$; the chain rule multiplies Jacobians. The Hessian collects second derivatives of a scalar function, is symmetric, and describes curvature through the quadratic term $\frac12\mathbf h^\top H\mathbf h$. Its eigenvalues decide bowls, domes and saddles.

@viz g04-surface surface=mixed mode=slices x0=1 y0=0 | The surface x³ − 3x + y². At a critical point the panel uses the Hessian to classify it.

:::explore
**What to try**
1. With the point at $(1, 0)$, read the classification. Then move $x_0$ to $-1$.
2. Rotate the surface to see the two critical points from the side.
3. Move the point to $(0, 0)$ and look at the pink slice's curvature.

**What to notice:** the Hessian is $\begin{pmatrix}6x & 0\\ 0 & 2\end{pmatrix}$. At $(1, 0)$ both diagonal entries are positive, so it is a local minimum, a bowl. At $(-1, 0)$ the entries are $-6$ and $2$, opposite signs, so it is a saddle: the pink slice curves down while the orange slice curves up. At $x = 0$ the pink slice has an inflection, since $f_{xx} = 0$.
:::

@viz gd surface=saddle lr=0.05 sx=-2 sy=0.05 | Start near the saddle's ridge: plain GD lingers, then escapes along the downhill direction.

:::explore
**What to try**
1. Press Run with plain GD and watch how long the path lingers near the saddle.
2. Change the starting $y$ to be even closer to 0, and compare with Momentum.

**What to notice:** near a saddle the gradient is tiny, so steps are tiny; only the small negative-curvature component (the Hessian's negative eigenvalue) slowly pushes the point away. This is why saddle points, not local minima, are the main obstacle in high-dimensional training.
:::

:::formulas
$$J_{ij} = \frac{\partial F_i}{\partial x_j} \qquad \mathbf F(\mathbf a + \mathbf h) \approx \mathbf F(\mathbf a) + J(\mathbf a)\mathbf h$$
$$J_{\mathbf F\circ\mathbf G} = J_{\mathbf F}(\mathbf G(\mathbf x))\,J_{\mathbf G}(\mathbf x)$$
$$H_{ij} = \frac{\partial^2 f}{\partial x_i\partial x_j},\quad H = H^\top,\quad H = J_{\nabla f}$$
$$f(\mathbf a + \mathbf h) \approx f(\mathbf a) + \nabla f^\top\mathbf h + \tfrac12\mathbf h^\top H\mathbf h$$
$$\nabla(\tfrac12\mathbf x^\top A\mathbf x) = A\mathbf x,\quad H = A \quad (A \text{ symmetric})$$
:::

:::thm Jacobian chain rule
If $\mathbf G$ is differentiable at $\mathbf x$ and $\mathbf F$ is differentiable at $\mathbf G(\mathbf x)$, then $\mathbf F\circ\mathbf G$ is differentiable at $\mathbf x$ with Jacobian $J_{\mathbf F}(\mathbf G(\mathbf x))\,J_{\mathbf G}(\mathbf x)$.
:::

:::proof
Entry $(i, j)$ of the product is $\sum_k\frac{\partial F_i}{\partial u_k}\frac{\partial u_k}{\partial x_j}$, where $\mathbf u = \mathbf G(\mathbf x)$. By the multivariable chain rule applied to the scalar function $F_i(\mathbf u(\mathbf x))$, this is exactly $\frac{\partial(F_i\circ\mathbf G)}{\partial x_j}$, the $(i, j)$ entry of the composite's Jacobian.
:::

:::steps Jacobian of polar coordinates $(r, \theta)\mapsto(r\cos\theta, r\sin\theta)$
1. $\frac{\partial x}{\partial r} = \cos\theta$, $\frac{\partial x}{\partial\theta} = -r\sin\theta$, $\frac{\partial y}{\partial r} = \sin\theta$, $\frac{\partial y}{\partial\theta} = r\cos\theta$.
2. $J = \begin{pmatrix}\cos\theta & -r\sin\theta\\ \sin\theta & r\cos\theta\end{pmatrix}$.
3. $\det J = r\cos^2\theta + r\sin^2\theta = r$: the area factor $dA = r\,dr\,d\theta$.
:::

:::steps Hessian of $f = x^2y + y^3$ at $(1, 1)$
1. $f_x = 2xy$, $f_y = x^2 + 3y^2$.
2. $f_{xx} = 2y$, $f_{xy} = 2x$, $f_{yy} = 6y$.
3. $H(1, 1) = \begin{pmatrix}2 & 2\\ 2 & 6\end{pmatrix}$, determinant $12 - 4 = 8 > 0$ with positive diagonal: positive definite.
:::

:::steps Second-order estimate of $f = e^x\cos y$ at $(0.1, 0.2)$
1. At the origin: $f = 1$, $\nabla f = (1, 0)$, $H = \begin{pmatrix}1 & 0\\ 0 & -1\end{pmatrix}$.
2. $f \approx 1 + 0.1 + \frac12(0.1^2 - 0.2^2) = 1.1 - 0.015$.
3. $\approx 1.085$ (true value $1.0831$).
:::

:::mock Exam question
For $f(x, y) = x^2 + xy + 2y^2$: (a) find the gradient and Hessian; (b) find its eigenvalues and decide the shape; (c) for gradient descent, what is the largest learning rate that still converges?
:::solution
(a) $\nabla f = (2x + y,\ x + 4y)$, $H = \begin{pmatrix}2 & 1\\ 1 & 4\end{pmatrix}$. (b) $\det(H - \lambda I) = (2 - \lambda)(4 - \lambda) - 1 = \lambda^2 - 6\lambda + 7 = 0$, so $\lambda = 3 \pm\sqrt2 \approx 4.41, 1.59$. Both positive: a bowl with its minimum at the origin. (c) For a quadratic, GD converges when $\eta < \frac{2}{\lambda_{\max}} = \frac{2}{3 + \sqrt2} \approx 0.453$.
:::
:::

:::ml Curvature in training
The Hessian of the loss determines how fast and how stably gradient descent converges: the step size must satisfy $\eta < \frac{2}{\lambda_{\max}}$, and a large condition number $\frac{\lambda_{\max}}{\lambda_{\min}}$ means slow, zig-zagging progress. Newton's method uses $\mathbf w \leftarrow \mathbf w - H^{-1}\nabla L$, and practical methods (L-BFGS, natural gradient, Adam's per-coordinate scaling) approximate this cheaply. Normalizing flows compute $\log|\det J|$ to transform probability densities.
:::

:::cs Jacobians in robotics and graphics
A robot arm's joint angles determine the hand's position; the Jacobian maps small joint movements to small hand movements, and inverting it (inverse kinematics) tells the controller how to move joints to reach a target. When $\det J = 0$ the arm is at a singular configuration and loses a direction of motion.
:::

:::real Local stretching on maps
Map projections distort areas: the absolute determinant of the projection's Jacobian at each point says how much area is magnified there. On the Mercator projection it grows rapidly toward the poles, which is why Greenland looks as big as Africa.
:::

:::quiz
? The Jacobian of $\mathbf F : \mathbb R^3 \to \mathbb R^2$ has shape...
+ $2\times3$
- $3\times2$
- $3\times3$
> Rows are outputs, columns are inputs.

? For $f = x^2 + 3y^2$, what is $H_{22}$?
= 6
> $f_{yy} = 6$.

? A Hessian with eigenvalues 4 and $-1$ at a critical point means...
+ a saddle point
- a local minimum
- a local maximum
> Mixed signs.

? The determinant of the polar Jacobian at $r = 3$ is...
= 3
> $\det J = r$.

? The Jacobian of the linear map $\mathbf F(\mathbf x) = A\mathbf x$ is...
+ $A$
- $A^\top$
- $\mathbf x$
> A linear map is its own best linear approximation.

? For $f = xy$, what is the mixed entry $H_{12}$?
= 1
> $f_{xy} = 1$.
:::

## Lesson: Optimization in several variables {#multi-optimization}
@summary: Critical points, the second derivative test with the Hessian, saddle points, global extrema on closed regions, and least squares.

### Finding the lowest point of a landscape
In one variable, we found maxima and minima by solving $f'(x) = 0$ and checking the second derivative. With several variables the plan is the same, but the landscape is richer: besides peaks and valleys there are **saddle points**, mountain passes that are a minimum in one direction and a maximum in another. Training a machine learning model is a search for the lowest point of a landscape with millions of dimensions, so understanding critical points in several variables is directly practical.

### An everyday scenario
A company sells two products at prices $x$ and $y$. Profit depends on both, partly because the products compete. To find the best pair of prices, it is not enough to optimize each price separately while ignoring the other; you need a point where changing *either* price, or both together, cannot improve the profit. At such a point the profit surface is flat in every direction: both partial derivatives are zero.

### Critical points
At a smooth interior maximum or minimum of $f(x, y)$, the tangent plane must be horizontal, otherwise you could move uphill or downhill. So
$$\nabla f = \mathbf 0, \text{ i.e. } f_x = 0 \text{ and } f_y = 0.$$
Points where the gradient is zero (or does not exist) are **critical points**. For $f(x, y) = x^2 + y^2 - 4x + 6y$: $f_x = 2x - 4 = 0$ and $f_y = 2y + 6 = 0$, so the only critical point is $(2, -3)$. Completing the square, $f = (x - 2)^2 + (y + 3)^2 - 13$, confirms it is a minimum with value $-13$.

:::def Critical point (several variables)
A point $\mathbf a$ in the domain of $f$ where $\nabla f(\mathbf a) = \mathbf 0$ or where some partial derivative does not exist.
:::

:::def Saddle point
A critical point that is neither a local maximum nor a local minimum: arbitrarily close to it, $f$ takes values both above and below $f(\mathbf a)$.
:::

### The second derivative test
To classify a critical point we look at curvature, given by the Hessian $H = \begin{pmatrix}f_{xx} & f_{xy}\\ f_{xy} & f_{yy}\end{pmatrix}$. Its determinant $D = f_{xx}f_{yy} - f_{xy}^2$ decides the shape:

If $D > 0$ and $f_{xx} > 0$, the point is a **local minimum** (both eigenvalues positive, a bowl). If $D > 0$ and $f_{xx} < 0$, it is a **local maximum** (a dome). If $D < 0$, it is a **saddle point** (eigenvalues of opposite sign). If $D = 0$, the test is inconclusive.

Why the determinant? It is the product of the Hessian's two eigenvalues. A positive product means both have the same sign, so the surface curves the same way in every direction; a negative product means they have opposite signs. Example: $f = x^2 - y^2$ has $f_{xx} = 2$, $f_{yy} = -2$, $f_{xy} = 0$, so $D = -4 < 0$: a saddle, as its shape shows.

@fig gradient surface=saddle | At a saddle the contours cross. The surface rises in one direction and falls in another, even though the gradient is zero.

### A full example
Take $f(x, y) = x^3 - 3x + y^2$. The gradient is $(3x^2 - 3,\ 2y)$, which is zero at $(1, 0)$ and $(-1, 0)$. Second partials: $f_{xx} = 6x$, $f_{yy} = 2$, $f_{xy} = 0$. At $(1, 0)$: $D = 6\cdot2 = 12 > 0$ and $f_{xx} = 6 > 0$, so a local minimum with $f = -2$. At $(-1, 0)$: $D = -12 < 0$, a saddle. Notice the local minimum is not a global one: as $x\to-\infty$, $x^3$ goes to $-\infty$.

### Global extrema on closed, bounded regions
If $f$ is continuous on a closed and bounded region (it includes its boundary and does not go off to infinity), it has a global max and a global min, by the multivariable extreme value theorem. To find them, evaluate $f$ at the interior critical points and find the extreme values on the boundary (often by parametrizing it or using Lagrange multipliers, next lesson), then compare. For $f = x^2 + y^2 - 2x$ on the square $[0, 2]\times[0, 2]$: the interior critical point $(1, 0)$ lies on the boundary edge $y = 0$, giving $-1$; checking corners gives $f(0, 0) = 0$, $f(2, 0) = 0$, $f(0, 2) = 4$, $f(2, 2) = 4$. So the min is $-1$ at $(1, 0)$ and the max is 4.

### Least squares: optimization you will use constantly
Fit a line $y = mx + c$ to data points $(1, 1), (2, 3), (3, 4)$ by minimizing the sum of squared errors $E(m, c) = \sum(mx_i + c - y_i)^2$. Setting both partials to zero gives the **normal equations**: $m\sum x_i^2 + c\sum x_i = \sum x_iy_i$ and $m\sum x_i + cn = \sum y_i$. Here $\sum x = 6$, $\sum x^2 = 14$, $\sum y = 8$, $\sum xy = 1 + 6 + 12 = 19$, $n = 3$. So $14m + 6c = 19$ and $6m + 3c = 8$. Doubling the second gives $12m + 6c = 16$; subtracting, $2m = 3$, $m = 1.5$, and $c = \frac{8 - 9}{3} = -\frac13$. Because $E$ is a convex quadratic, this critical point is the global minimum.

### Common mistakes
Forgetting to solve both equations simultaneously, or missing solutions when factoring, loses critical points. Using only $f_{xx}$ to classify, without $D$, misses saddles: $f = x^2 - 3xy + y^2$ has $f_{xx} = f_{yy} = 2 > 0$ but $D = 4 - 9 < 0$, a saddle. And a local minimum is not automatically global, unless the function is convex.

### Summary
Interior extrema occur at critical points, where $\nabla f = \mathbf 0$. Classify them with $D = f_{xx}f_{yy} - f_{xy}^2$: $D > 0$ gives a min ($f_{xx} > 0$) or max ($f_{xx} < 0$), $D < 0$ a saddle. On closed bounded regions, compare interior critical values with boundary values. Least squares is the classic example, and convex functions guarantee that a critical point is the global minimum.

@viz g04-surface surface=mixed mode=plane x0=1 y0=0 | The surface x³ − 3x + y² with its tangent plane. At the two critical points the plane is horizontal; the panel classifies them.

:::explore
**What to try**
1. With the point at $(1, 0)$, check that the tangent plane is horizontal and read the classification.
2. Move the point to $(-1, 0)$ and rotate the view.
3. Switch to the saddle and the dome and place the point at the origin.

**What to notice:** both $(1, 0)$ and $(-1, 0)$ have horizontal tangent planes, but at $(1, 0)$ the surface lies above the plane (a minimum) while at $(-1, 0)$ it crosses the plane, above in one direction and below in another (a saddle). A zero gradient alone cannot tell them apart; the Hessian test from the article can.
:::

@viz gd surface=rosen lr=0.002 | Gradient descent on the banana-shaped Rosenbrock function: the minimum at (1, 1) sits in a long, curved, flat valley.

:::explore
**What to try**
1. Press Run with plain GD and watch how quickly it reaches the valley and how slowly it moves along it.
2. Switch to Momentum and Adam and compare the paths.

**What to notice:** the path drops quickly into the valley (large gradient across it) and then crawls along the nearly flat floor (tiny gradient along it). A badly conditioned Hessian, with very different curvatures in different directions, makes plain gradient descent slow; adaptive methods help.
:::

:::formulas
$$\nabla f(\mathbf a) = \mathbf 0 \text{ at interior extrema}$$
$$D = f_{xx}f_{yy} - f_{xy}^2 = \det H$$
$$D > 0, f_{xx} > 0 \Rightarrow \text{min} \qquad D > 0, f_{xx} < 0 \Rightarrow \text{max} \qquad D < 0 \Rightarrow \text{saddle}$$
$$\text{least squares: } X^\top X\,\mathbf w = X^\top\mathbf y$$
$$H \text{ positive definite everywhere} \Rightarrow f \text{ convex} \Rightarrow \text{critical point is the global min}$$
:::

:::thm Second derivative test
Let $f$ have continuous second partials near a critical point $\mathbf a$ with $\nabla f(\mathbf a) = \mathbf 0$, and let $D = f_{xx}f_{yy} - f_{xy}^2$ at $\mathbf a$. If $D > 0$ and $f_{xx} > 0$, $\mathbf a$ is a local minimum; if $D > 0$ and $f_{xx} < 0$, a local maximum; if $D < 0$, a saddle point.
:::

:::proof
By the second-order Taylor expansion with $\nabla f = \mathbf 0$, $f(\mathbf a + \mathbf h) - f(\mathbf a) \approx \frac12Q(\mathbf h)$ with $Q = f_{xx}h_1^2 + 2f_{xy}h_1h_2 + f_{yy}h_2^2$. Completing the square (when $f_{xx} \ne 0$), $Q = f_{xx}\left(h_1 + \frac{f_{xy}}{f_{xx}}h_2\right)^2 + \frac{D}{f_{xx}}h_2^2$. If $D > 0$ both terms have the sign of $f_{xx}$, so $Q$ has that sign for all $\mathbf h \ne \mathbf 0$. If $D < 0$ the two terms have opposite signs, and choosing $\mathbf h$ to make either one dominate gives both signs. Continuity of second partials makes the approximation valid near $\mathbf a$.
:::

:::steps Classify the critical points of $f = x^2 + xy + y^2 - 3y$
1. $f_x = 2x + y = 0$, $f_y = x + 2y - 3 = 0$, giving $x = -1$, $y = 2$.
2. $f_{xx} = 2$, $f_{yy} = 2$, $f_{xy} = 1$, so $D = 4 - 1 = 3 > 0$.
3. $f_{xx} > 0$: a local (in fact global) minimum, value $1 - 2 + 4 - 6 = -3$.
:::

:::steps Critical points of $f = xy(3 - x - y)$ (interior ones)
1. $f = 3xy - x^2y - xy^2$: $f_x = y(3 - 2x - y)$, $f_y = x(3 - x - 2y)$.
2. With $x, y \ne 0$: $2x + y = 3$ and $x + 2y = 3$ give $(1, 1)$.
3. $f_{xx} = -2y = -2$, $f_{yy} = -2x = -2$, $f_{xy} = 3 - 2x - 2y = -1$; $D = 4 - 1 = 3 > 0$, $f_{xx} < 0$: a local max with $f = 1$.
:::

:::steps Least squares line through $(0, 1), (1, 2), (2, 4)$
1. $\sum x = 3$, $\sum x^2 = 5$, $\sum y = 7$, $\sum xy = 0 + 2 + 8 = 10$, $n = 3$.
2. Normal equations: $5m + 3c = 10$, $3m + 3c = 7$. Subtract: $2m = 3$, $m = 1.5$.
3. $c = \frac{7 - 4.5}{3} = \frac56$: the line $y = 1.5x + \frac56$.
:::

:::mock Exam question
A box with no lid must have volume 32 m³. Minimize the surface area $S = xy + 2xz + 2yz$, where $x, y$ are the base sides and $z$ the height.
:::solution
From $xyz = 32$, $z = \frac{32}{xy}$, so $S(x, y) = xy + \frac{64}{y} + \frac{64}{x}$. $S_x = y - \frac{64}{x^2} = 0$ and $S_y = x - \frac{64}{y^2} = 0$. Then $y = \frac{64}{x^2}$ and substituting, $x = \frac{64x^4}{4096}$, so $x^3 = 64$, $x = 4$, $y = 4$, $z = 2$. Check: $S_{xx} = \frac{128}{x^3} = 2$, $S_{yy} = 2$, $S_{xy} = 1$, $D = 3 > 0$: a minimum, $S = 16 + 16 + 16 = 48$ m².
:::
:::

:::ml Saddles and minima in deep learning
In high dimensions, most critical points of a neural network's loss are saddle points rather than bad local minima: for a point to be a minimum, all of millions of Hessian eigenvalues must be positive. Stochastic gradient noise helps escape saddles. Linear regression is the friendly case: its loss is convex, its normal equations $X^\top X\mathbf w = X^\top\mathbf y$ give the global minimum directly, and ridge regression adds $\lambda I$ to $X^\top X$ to make the Hessian safely positive definite.
:::

:::cs Optimization algorithms
Libraries such as SciPy's `minimize` implement gradient-based methods (BFGS, L-BFGS, conjugate gradient) that look for points with $\nabla f = \mathbf 0$ and use Hessian approximations to take better steps. Checking the Hessian (or its approximation) after convergence tells you whether you found a minimum or got stuck at a saddle.
:::

:::real Pricing two products
A firm's profit from two competing drinks priced at $x$ and $y$ is modelled as $P = -2x^2 - 2y^2 + 2xy + 20x + 8y$. Setting $P_x = -4x + 2y + 20 = 0$ and $P_y = -4y + 2x + 8 = 0$ gives $x = 8$, $y = 6$, and $D = 16 - 4 = 12 > 0$ with $P_{xx} < 0$: the profit-maximizing prices.
:::

:::quiz
? The critical point of $f = x^2 + y^2 - 6x + 2y$ is at $x$ =
= 3
> $f_x = 2x - 6 = 0$ (and $y = -1$).

? If $D < 0$ at a critical point, it is...
+ a saddle point
- a local minimum
- a local maximum
> Eigenvalues of opposite sign.

? For $f = x^2 - 3xy + y^2$, the value of $D$ at the origin is...
= -5
> $2\cdot2 - (-3)^2$.

? If $D = 5$ and $f_{xx} = -1$, the point is...
+ a local maximum
- a local minimum
- a saddle point
> Both curvatures negative.

? The minimum value of $f = (x - 1)^2 + (y + 2)^2 + 4$ is...
= 4
> Attained at $(1, -2)$.

? If $D = 0$, the second derivative test...
+ is inconclusive
- says it is a saddle
- says it is a minimum
> Higher-order terms decide.
:::

# Unit: Constrained optimization, integration and vector fields

## Lesson: Lagrange multipliers {#lagrange}
@summary: Optimizing a function subject to a constraint, the condition that gradients are parallel, the meaning of the multiplier, and connections to ML.

### Optimizing with a rule you must obey
Real optimization problems almost always come with constraints. You want the biggest profit, but your budget is fixed. You want the strongest beam, but its weight is limited. You want the most likely probability distribution, but its probabilities must add to 1. In the previous lesson we searched for the lowest point of a whole landscape. Now we must stay on a particular path through the landscape, the set of points allowed by the constraint, and find the highest or lowest point *along that path*. The method of **Lagrange multipliers** turns this into a system of equations.

### An everyday scenario
Imagine hiking along a fixed trail that winds across a hillside. You want to know the highest point you will reach on the trail, not the summit of the mountain. Picture the contour lines of the hill crossing your trail. While you climb, the trail cuts across contours, moving you to higher ones. At the highest point of the trail, the trail stops crossing contours and just touches one of them: the trail is **tangent** to a contour line there. If it crossed the contour, you could continue a bit further and go higher.

### The key geometric idea
Write the function to optimize as $f(x, y)$ and the constraint as $g(x, y) = c$. The constraint is a level curve of $g$. At a constrained maximum or minimum, the constraint curve is tangent to a level curve of $f$. Two curves that are tangent at a point have the same perpendicular direction there, and perpendiculars to level curves are gradients. So at the optimum, $\nabla f$ and $\nabla g$ point along the same line:
$$\nabla f = \lambda\nabla g, \qquad g(x, y) = c,$$
for some number $\lambda$, the **Lagrange multiplier**. That gives three equations ($f_x = \lambda g_x$, $f_y = \lambda g_y$, $g = c$) for three unknowns ($x, y, \lambda$).

:::def Lagrange multiplier
A scalar $\lambda$ with $\nabla f = \lambda\nabla g$ at a constrained extremum of $f$ subject to $g = c$. It measures how fast the optimal value changes as the constraint level $c$ changes.
:::

### A first example
Maximize $f(x, y) = x + 2y$ on the unit circle $x^2 + y^2 = 1$. Here $\nabla f = (1, 2)$ and $\nabla g = (2x, 2y)$. The equations are $1 = 2\lambda x$, $2 = 2\lambda y$ and $x^2 + y^2 = 1$. From the first two, $x = \frac{1}{2\lambda}$ and $y = \frac{1}{\lambda}$, so $y = 2x$. Substituting into the circle, $5x^2 = 1$ and $x = \pm\frac{1}{\sqrt5}$. The two candidates are $\left(\frac{1}{\sqrt5}, \frac{2}{\sqrt5}\right)$ with $f = \frac{5}{\sqrt5} = \sqrt5 \approx 2.236$ and the opposite point with $f = -\sqrt5$. Since a continuous function on a closed, bounded curve has a max and min, these are the maximum and minimum. The answer has a nice interpretation: the maximum is in the direction of $(1, 2)$, and its value is $\|(1, 2)\|$.

@fig lagrange | Contours of f = x + 2y are straight lines. The largest one that still touches the circle is tangent to it, and there the two gradients are parallel.

### The Lagrangian
It is often convenient to package everything into one function, the **Lagrangian**
$$\mathcal L(x, y, \lambda) = f(x, y) - \lambda\big(g(x, y) - c\big).$$
Setting all three partial derivatives of $\mathcal L$ to zero gives exactly $f_x = \lambda g_x$, $f_y = \lambda g_y$ and $g = c$. The constrained problem becomes an unconstrained critical point problem in one more variable. With several constraints, add one multiplier per constraint: $\nabla f = \lambda_1\nabla g_1 + \lambda_2\nabla g_2$.

### What does lambda mean?
The multiplier is not just an auxiliary variable. If $M(c)$ is the optimal value as a function of the constraint level, then $\frac{dM}{dc} = \lambda$. In economics, if $c$ is a budget, $\lambda$ is the extra profit per extra unit of budget, called the **shadow price**. In the circle example with $x^2 + y^2 = c$, the maximum is $\sqrt{5c}$, whose derivative at $c = 1$ is $\frac{\sqrt5}{2}$. And indeed $\lambda = \frac{1}{2x} = \frac{\sqrt5}{2}$.

### A practical example
A rectangular field next to a river needs fencing on three sides only, with 100 m of fence. Maximize the area $A = xy$ subject to $x + 2y = 100$ (where $x$ is the side parallel to the river). $\nabla A = (y, x)$ and $\nabla g = (1, 2)$, so $y = \lambda$ and $x = 2\lambda$, giving $x = 2y$. Then $4y = 100$, $y = 25$, $x = 50$, and the area is 1250 m². Here $\lambda = 25$: one more metre of fence would add about 25 m² of area.

### Common mistakes
Forgetting to include the constraint equation leaves too many unknowns. Dividing by a variable that could be zero loses solutions; consider the zero cases separately. Lagrange gives candidates, so compare $f$ at all of them. Finally, the method needs $\nabla g \ne \mathbf 0$ at the optimum.

### Summary
To optimize $f$ subject to $g = c$, solve $\nabla f = \lambda\nabla g$ together with $g = c$, then compare the values of $f$ at the solutions. Geometrically, the constraint curve is tangent to a level curve of $f$ at the optimum. The multiplier $\lambda$ is the rate at which the optimal value changes with the constraint level.

@viz lagrange | Slide along the circle. At the max and min, the pink and green arrows line up.

:::explore
**What to try**
1. Slide slowly around the circle and watch the value of $f = x + 2y$ in the panel.
2. Find the position where $f$ is largest and look at the two arrows.
3. Find the minimum and compare the arrows' directions there.

**What to notice:** at most positions the gradient of $f$ (fixed, along $(1, 2)$) and the gradient of the constraint (pointing outward from the circle) point in different directions, and moving along the circle changes $f$. At the maximum, $f \approx 2.236 = \sqrt5$ and the arrows are parallel, the condition $\nabla f = \lambda\nabla g$ with $\lambda > 0$. At the minimum they are antiparallel, with $\lambda < 0$.
:::

:::formulas
$$\nabla f = \lambda\nabla g, \quad g(\mathbf x) = c$$
$$\mathcal L(\mathbf x, \lambda) = f(\mathbf x) - \lambda(g(\mathbf x) - c), \quad \nabla_{\mathbf x, \lambda}\mathcal L = \mathbf 0$$
$$\nabla f = \lambda_1\nabla g_1 + \lambda_2\nabla g_2 \text{ (two constraints)}$$
$$\frac{dM}{dc} = \lambda$$
$$\max_{\|\mathbf x\| = 1}\mathbf a\cdot\mathbf x = \|\mathbf a\| \qquad \max_{\|\mathbf x\| = 1}\mathbf x^\top A\mathbf x = \lambda_{\max}(A)$$
:::

:::thm Lagrange multiplier theorem
If $f$ and $g$ have continuous first partials, $\mathbf a$ is a local extremum of $f$ on the set $g = c$, and $\nabla g(\mathbf a) \ne \mathbf 0$, then there is a number $\lambda$ with $\nabla f(\mathbf a) = \lambda\nabla g(\mathbf a)$.
:::

:::proof
Let $\mathbf r(t)$ be any smooth curve in the constraint set with $\mathbf r(0) = \mathbf a$. Then $f(\mathbf r(t))$ has a local extremum at $t = 0$, so its derivative $\nabla f(\mathbf a)\cdot\mathbf r'(0)$ is 0. So $\nabla f(\mathbf a)$ is perpendicular to every tangent direction of the constraint set. Since $\nabla g(\mathbf a) \ne \mathbf 0$, the constraint set is a smooth curve (or surface) whose tangent directions are exactly the vectors perpendicular to $\nabla g(\mathbf a)$. In two dimensions this means $\nabla f(\mathbf a)$ is parallel to $\nabla g(\mathbf a)$, i.e. a multiple of it; the same argument works in $n$ dimensions.
:::

:::steps Minimize $x^2 + y^2$ subject to $x + y = 4$
1. $\nabla f = (2x, 2y)$, $\nabla g = (1, 1)$: $2x = \lambda$, $2y = \lambda$, so $x = y$.
2. $2x = 4$ gives $(2, 2)$.
3. Minimum $f = 8$: the closest point on the line to the origin, at distance $\sqrt8$.
:::

:::steps Extremes of $f = xy$ on the ellipse $x^2 + 4y^2 = 8$
1. $y = 2\lambda x$ and $x = 8\lambda y$. Multiply: $xy = 16\lambda^2xy$, so $\lambda = \pm\frac14$ (if $xy \ne 0$).
2. $\lambda = \frac14$: $y = \frac x2$, so $x^2 + x^2 = 8$, $x = \pm2$, $y = \pm1$ (same signs), $f = 2$.
3. $\lambda = -\frac14$: opposite signs, $f = -2$. Max $2$, min $-2$.
:::

:::steps Maximum entropy with two outcomes
1. Maximize $H = -p\ln p - q\ln q$ subject to $p + q = 1$.
2. $-\ln p - 1 = \lambda$ and $-\ln q - 1 = \lambda$ give $\ln p = \ln q$, so $p = q$.
3. $p = q = \frac12$: the uniform distribution maximizes entropy, with $H = \ln2$.
:::

:::mock Exam question
A company produces $Q = 10x^{0.5}y^{0.5}$ units using $x$ units of labour at \$4 each and $y$ units of capital at \$1 each. With a budget of \$400, (a) find the production-maximizing $x$ and $y$; (b) find the maximum output; (c) interpret $\lambda$.
:::solution
Constraint $4x + y = 400$. (a) $Q_x = 5\sqrt{y/x} = 4\lambda$ and $Q_y = 5\sqrt{x/y} = \lambda$. Dividing, $\frac{y}{x} = 4$, so $y = 4x$; then $8x = 400$, $x = 50$, $y = 200$. (b) $Q = 10\sqrt{10000} = 1000$. (c) $\lambda = 5\sqrt{50/200} = 2.5$: one extra dollar of budget raises output by about 2.5 units.
:::
:::

:::ml Constraints across machine learning
Lagrange multipliers are everywhere in ML theory. Support vector machines maximize the margin subject to classification constraints; the multipliers in the dual problem are nonzero only for support vectors. The first principal component maximizes $\mathbf w^\top\Sigma\mathbf w$ subject to $\|\mathbf w\| = 1$, and the Lagrange condition $\Sigma\mathbf w = \lambda\mathbf w$ says it is an eigenvector. Maximum-entropy arguments under moment constraints produce softmax and exponential-family distributions. Weight decay can be viewed as a Lagrangian relaxation of a norm constraint.
:::

:::cs Constrained solvers
Optimization software handles constraints with Lagrangian-based methods: augmented Lagrangian, sequential quadratic programming, and interior-point methods for linear programs. The KKT conditions, which extend Lagrange multipliers to inequality constraints, are the stopping test these solvers check.
:::

:::real Spending a budget
A household splitting a budget between two goods maximizes satisfaction where the ratio of marginal benefits equals the ratio of prices. That is $\nabla U = \lambda\nabla(\text{cost})$: the last dollar spent on each good should buy the same extra satisfaction, $\lambda$.
:::

:::quiz
? At a constrained optimum of $f$ subject to $g = c$, the gradients $\nabla f$ and $\nabla g$ are...
+ parallel
- perpendicular
- both zero
> The constraint curve is tangent to a level curve of $f$.

? The maximum of $x + 2y$ on $x^2 + y^2 = 1$ is $\sqrt5$. Its square is...
= 5
> The max is $\|(1, 2)\|$.

? Minimize $x^2 + y^2$ subject to $x + y = 2$. The minimum value is...
= 2
> At $(1, 1)$.

? With 100 m of fence on three sides of a riverside field, the maximum area is...
= 1250
> $50\times25$.

? The multiplier $\lambda$ measures...
+ the rate of change of the optimal value as the constraint level changes
- the size of the gradient of $f$
- the number of constraints
> $\frac{dM}{dc} = \lambda$.

? Maximizing $\mathbf w^\top\Sigma\mathbf w$ subject to $\|\mathbf w\| = 1$ gives a vector that is...
+ an eigenvector of $\Sigma$
- the zero vector
- orthogonal to every eigenvector
> $\Sigma\mathbf w = \lambda\mathbf w$.
:::

## Lesson: Double and triple integrals {#multiple-integrals}
@summary: Integrating over regions in the plane and in space: Riemann sums of boxes, iterated integrals, Fubini's theorem, non-rectangular regions, and joint probability.

### Adding up over a region
In single-variable calculus, the integral $\int_a^b f(x)\,dx$ adds up a quantity spread along an interval: the area under a curve, the distance covered from a velocity, the total probability of a range of values. Many quantities are spread over an area or a volume instead. The total rainfall over a country, the mass of a metal plate whose thickness varies, the probability that two random quantities both land in some range: each is a sum over a two- or three-dimensional region. **Double and triple integrals** do this adding up, and, remarkably, they can almost always be computed by doing ordinary one-variable integrals one after another.

### An everyday scenario
A farmer wants to know how much water is in a rectangular pond whose depth varies from place to place. A sensible approach: lay a grid over the pond, measure the depth in the middle of each grid square, multiply each depth by the square's area to get a small column of water, and add all the columns. Finer grids give better answers. In the limit of infinitely fine grids, the sum becomes the double integral of the depth function over the pond. That is the whole definition; the rest of the lesson is about computing it efficiently.

### The definition: Riemann sums of boxes
Let $f(x, y) \ge 0$ on a rectangle $R = [a, b]\times[c, d]$. Split $R$ into small rectangles of area $\Delta A$, pick a sample point $(x_i, y_j)$ in each, and form the sum $\sum f(x_i, y_j)\,\Delta A$. Each term is the volume of a thin box under the surface. As the grid gets finer, the sums approach the **double integral**
$$\iint_R f(x, y)\,dA,$$
which is the volume between the surface $z = f(x, y)$ and the region $R$. When $f$ takes negative values, the parts below the plane count negatively, just like signed area in one variable. With $f = 1$, the double integral is simply the area of $R$.

:::def Double integral
$\iint_R f\,dA = \lim\sum_{i, j}f(x_i, y_j)\,\Delta A$ as the grid on $R$ is refined: the signed volume under $z = f(x, y)$ over the region $R$.
:::

For a numeric feel, take $f = x^2 + y^2$ on $[0, 2]\times[0, 2]$ and a $4\times4$ grid using midpoints. Each square has area $0.25$, and the midpoints have coordinates $0.25, 0.75, 1.25, 1.75$. The squares of these add to $5.25$, so the sum of $x^2 + y^2$ over all 16 midpoints is $2\times4\times5.25 = 42$, and the box volume is $42\times0.25 = 10.5$. The exact answer, computed below, is $\frac{32}{3} \approx 10.667$.

### Iterated integrals and Fubini's theorem
Adding a grid of boxes can be done row by row. Fix $x$, add up along $y$, then add those results along $x$. In the limit this becomes an **iterated integral**:
$$\iint_R f\,dA = \int_a^b\left(\int_c^d f(x, y)\,dy\right)dx.$$
The inner integral treats $x$ as a constant, exactly like a partial derivative in reverse. For the bowl on $[0, 2]^2$: the inner integral is $\int_0^2(x^2 + y^2)\,dy = 2x^2 + \frac83$, and the outer integral is $\int_0^2\left(2x^2 + \frac83\right)dx = \frac{16}{3} + \frac{16}{3} = \frac{32}{3}$. **Fubini's theorem** guarantees that for continuous functions the order does not matter: integrating in $x$ first gives the same answer. The inner integral has a nice picture too: it is the area of a cross-section slice of the solid, and the outer integral adds slices, like slicing a loaf of bread.

### Regions that are not rectangles
Most regions are not rectangles. If a region lies between two curves, $g_1(x) \le y \le g_2(x)$ for $a \le x \le b$, the inner limits become functions of $x$:
$$\iint_D f\,dA = \int_a^b\int_{g_1(x)}^{g_2(x)}f(x, y)\,dy\,dx.$$
Example: the region under $y = x^2$ for $0 \le x \le 1$. Then $\iint_D x\,dA = \int_0^1\int_0^{x^2}x\,dy\,dx = \int_0^1x\cdot x^2\,dx = \frac14$. The key skill is sketching the region and reading off the limits: the outer variable's limits are constants, the inner variable's limits may depend on the outer one.

Sometimes one order is easy and the other is impossible. $\int_0^1\int_x^1e^{y^2}\,dy\,dx$ cannot be done as written, since $e^{y^2}$ has no elementary antiderivative. But the region is the triangle $0 \le x \le y \le 1$, which can also be described as $0 \le y \le 1$, $0 \le x \le y$. Reversing the order gives $\int_0^1\int_0^ye^{y^2}\,dx\,dy = \int_0^1ye^{y^2}\,dy = \frac{e - 1}{2}$.

@fig riemann | One-dimensional Riemann sums add thin rectangles; double integrals add thin boxes over a grid in the plane in exactly the same way.

### Average values, mass and probability
Dividing a double integral by the area of the region gives the **average value** of $f$ there: the average of $x^2 + y^2$ over $[0, 2]^2$ is $\frac{32/3}{4} = \frac83$. If $\rho(x, y)$ is a density (mass per unit area), $\iint\rho\,dA$ is the total mass. In probability, a **joint density** $p(x, y)$ satisfies $\iint p\,dA = 1$, and the probability that $(X, Y)$ lands in a region $D$ is $\iint_D p\,dA$. Expected values are $\mathbb E[g(X, Y)] = \iint g\,p\,dA$.

:::def Joint probability density
A function $p(x, y) \ge 0$ with $\iint_{\mathbb R^2}p\,dA = 1$, such that $P((X, Y)\in D) = \iint_Dp(x, y)\,dA$ for every region $D$.
:::

### Triple integrals
The same ideas work in three dimensions. A **triple integral** $\iiint_E f\,dV$ adds $f$ times small volumes $\Delta V$ over a solid $E$, and it is computed as three nested one-variable integrals. With $f = 1$ it gives the volume of $E$; with a density it gives mass. Example: $\int_0^1\int_0^1\int_0^1(x + y + z)\,dz\,dy\,dx$. The inner integral gives $x + y + \frac12$; the next gives $x + 1$; the outer gives $\frac32$. That matches intuition: the average of $x + y + z$ on the unit cube is $\frac12 + \frac12 + \frac12$.

### Common mistakes
The most common error is putting variables in the outer limits; the outermost limits must always be constants. Another is mismatching the order of $dx\,dy$ with the order of the limits. When reversing the order, always redraw the region instead of swapping limits mechanically. And remember that $dA$ is an area element: when you change coordinates (next lesson) it picks up a scaling factor.

### Summary
A double integral adds $f\,\Delta A$ over a region and measures signed volume; a triple integral adds $f\,\Delta V$ over a solid. By Fubini's theorem both are computed as iterated one-variable integrals, in either order for continuous functions. For non-rectangular regions the inner limits depend on the outer variable. Dividing by area gives averages, and with a joint density the integrals give probabilities and expectations.

@viz g04-surface surface=bowl mode=boxes n=4 | Boxes under the bowl x² + y² over the square [0, 2] × [0, 2]. Increase n and watch the total volume approach the exact integral.

:::explore
**What to try**
1. With $n = 4$, read the sum of box volumes in the panel and compare it with the article's 10.5.
2. Increase $n$ step by step up to 16 and record how the sum changes.
3. Rotate the view to see the boxes from the side, then switch to the dome and to the saddle.

**What to notice:** the sums approach $\frac{32}{3} \approx 10.667$, the exact value from the iterated integral; the midpoint boxes slightly underestimate because the bowl curves upward. For the saddle the sum can be zero or negative, since boxes below the plane count negatively, the 2D version of signed area.
:::

:::formulas
$$\iint_R f\,dA = \lim\sum f(x_i, y_j)\,\Delta A$$
$$\iint_{[a,b]\times[c,d]}f\,dA = \int_a^b\int_c^d f\,dy\,dx = \int_c^d\int_a^b f\,dx\,dy$$
$$\iint_D f\,dA = \int_a^b\int_{g_1(x)}^{g_2(x)}f\,dy\,dx$$
$$\text{area}(D) = \iint_D1\,dA \qquad \bar f = \frac{1}{\text{area}(D)}\iint_D f\,dA$$
$$\iint_{[a,b]\times[c,d]}g(x)h(y)\,dA = \left(\int_a^b g\right)\left(\int_c^d h\right)$$
$$P((X, Y)\in D) = \iint_D p\,dA \qquad \mathbb E[g(X, Y)] = \iint g\,p\,dA$$
:::

:::thm Fubini's theorem
If $f$ is continuous on the rectangle $R = [a, b]\times[c, d]$, then $\iint_R f\,dA = \int_a^b\int_c^d f(x, y)\,dy\,dx = \int_c^d\int_a^b f(x, y)\,dx\,dy$.
:::

:::proof
(Idea.) Group the Riemann sum $\sum_{i, j}f(x_i, y_j)\Delta x\Delta y$ by columns: $\sum_i\left(\sum_jf(x_i, y_j)\Delta y\right)\Delta x$. The inner sum is a Riemann sum for $\int_c^d f(x_i, y)\,dy$, and the outer sum is then a Riemann sum for the integral of that function of $x$. Continuity on the closed rectangle (hence uniform continuity) makes both limits behave, so the double limit equals the iterated integral. Grouping by rows instead gives the other order.
:::

:::steps Evaluate $\int_0^1\int_0^2(x + 2y)\,dy\,dx$
1. Inner (treat $x$ as a constant): $\left[xy + y^2\right]_0^2 = 2x + 4$.
2. Outer: $\int_0^1(2x + 4)\,dx = \left[x^2 + 4x\right]_0^1$.
3. $= 5$.
:::

:::steps Integrate $f = xy$ over the triangle with vertices $(0, 0)$, $(1, 0)$, $(1, 1)$
1. The region is $0 \le x \le 1$, $0 \le y \le x$.
2. Inner: $\int_0^x xy\,dy = \frac{x^3}{2}$.
3. Outer: $\int_0^1\frac{x^3}{2}\,dx = \frac18$.
:::

:::steps Reverse the order in $\int_0^1\int_x^1e^{y^2}\,dy\,dx$
1. Region: $0 \le x \le y \le 1$, the same as $0 \le y \le 1$, $0 \le x \le y$.
2. New integral: $\int_0^1\int_0^ye^{y^2}\,dx\,dy = \int_0^1ye^{y^2}\,dy$.
3. Substitution $u = y^2$: $\frac12(e - 1) \approx 0.859$.
:::

:::mock Exam question
The pair $(X, Y)$ has joint density $p(x, y) = c(x + y)$ on the unit square $[0, 1]^2$ (and 0 elsewhere). (a) Find $c$. (b) Find $P\left(X \le \frac12, Y \le \frac12\right)$. (c) Find $\mathbb E[X]$.
:::solution
(a) $\iint(x + y)\,dA = \frac12 + \frac12 = 1$, so $c = 1$. (b) $\int_0^{1/2}\int_0^{1/2}(x + y)\,dy\,dx = \int_0^{1/2}\left(\frac x2 + \frac18\right)dx = \frac{1}{16} + \frac{1}{16} = \frac18$. (c) $\mathbb E[X] = \int_0^1\int_0^1x(x + y)\,dy\,dx = \int_0^1\left(x^2 + \frac x2\right)dx = \frac13 + \frac14 = \frac{7}{12}$.
:::
:::

:::ml Expectations over several variables
Every expected loss in ML is a multiple integral: $\mathbb E[L] = \iint L(\mathbf x, y)\,p(\mathbf x, y)\,d\mathbf x\,dy$ over the data distribution. Marginalizing a joint density, $p(x) = \int p(x, y)\,dy$, is a single slice of Fubini's theorem, and it is how latent-variable models such as VAEs define the likelihood $p(\mathbf x) = \int p(\mathbf x\mid\mathbf z)p(\mathbf z)\,d\mathbf z$. Because these integrals are high-dimensional, ML estimates them by Monte Carlo sampling instead of grids.
:::

:::cs Monte Carlo integration and the curse of dimensionality
A grid with 100 points per axis needs $100^d$ evaluations in $d$ dimensions, impossible beyond a handful of dimensions. Monte Carlo integration averages $f$ at random points; its error shrinks like $\frac{1}{\sqrt N}$ regardless of dimension. Graphics renderers compute the light reaching each pixel this way, as an integral over directions.
:::

:::real Rainfall over a region
Weather services estimate total rainfall over a catchment by integrating radar-measured rain depth over the area: depth (in metres) times area (in square metres) summed over grid cells gives cubic metres of water flowing to a river, the double integral $\iint d(x, y)\,dA$.
:::

:::quiz
? $\int_0^2\int_0^3 1\,dy\,dx$ =
= 6
> The area of a $2\times3$ rectangle.

? $\int_0^1\int_0^1xy\,dy\,dx$ =
= 1/4|0.25
> $\frac12\cdot\frac12$.

? The average value of $f = x + y$ over $[0, 2]\times[0, 2]$ is...
= 2
> By symmetry, $1 + 1$.

? The area of the triangle $0 \le y \le x \le 1$ is $\int_0^1\int_0^x dy\,dx$ =
= 1/2|0.5
> $\int_0^1x\,dx$.

? Fubini's theorem says that for continuous $f$ on a rectangle...
+ the order of integration does not change the result
- the double integral is always positive
- you must integrate in $x$ first
> Both iterated integrals equal the double integral.

? In an iterated integral, the outermost limits must be...
+ constants
- functions of the inner variable
- zero
> Only inner limits may depend on outer variables.
:::

## Lesson: Change of variables: polar, cylindrical and spherical coordinates {#change-of-variables}
@summary: Rewriting multiple integrals in better coordinates, the Jacobian determinant as an area-scaling factor, polar, cylindrical and spherical coordinates, the Gaussian integral and transforming probability densities.

### Choosing the right coordinates
Some integrals are painful in $x$ and $y$ but easy in other coordinates. Integrating over a disc in Cartesian coordinates forces square roots into the limits, $-\sqrt{4 - x^2} \le y \le \sqrt{4 - x^2}$, while in polar coordinates the same disc is simply $0 \le r \le 2$, $0 \le \theta \le 2\pi$. Changing variables is the multivariable version of u-substitution. There is one catch: when you change coordinates, the little area elements change size, and you must account for that with a scaling factor, the **Jacobian determinant**. Get the factor right and you can compute volumes of spheres, the famous Gaussian integral behind the normal distribution, and the densities of transformed random variables.

### An everyday scenario
Think of a pizza. Cutting it into a square grid is awkward: the pieces near the crust are oddly shaped. Cutting it into slices and rings is natural. But notice that a piece of the outer ring is bigger than a piece of an inner ring with the same angle and the same ring width, because it is farther from the centre. A piece at radius $r$ with angular width $\Delta\theta$ and radial width $\Delta r$ is approximately a rectangle of sides $r\,\Delta\theta$ and $\Delta r$, so its area is about $r\,\Delta r\,\Delta\theta$. That extra factor $r$ is the whole story of polar integration.

### Polar coordinates
A point is described by its distance $r$ from the origin and its angle $\theta$, with $x = r\cos\theta$ and $y = r\sin\theta$, so $x^2 + y^2 = r^2$. As the pizza argument shows, the area element becomes
$$dA = r\,dr\,d\theta.$$
So $\iint_D f(x, y)\,dA = \iint f(r\cos\theta, r\sin\theta)\,r\,dr\,d\theta$. Check with the area of a disc of radius $R$: $\int_0^{2\pi}\int_0^R r\,dr\,d\theta = 2\pi\cdot\frac{R^2}{2} = \pi R^2$. Forgetting the $r$ would give $2\pi R$, which is not even an area.

Example: $\iint_D(x^2 + y^2)\,dA$ over the disc of radius 2. In polar coordinates the integrand is $r^2$, so the integral is $\int_0^{2\pi}\int_0^2r^2\cdot r\,dr\,d\theta = 2\pi\cdot\frac{2^4}{4} = 8\pi$.

:::def Polar area element
In polar coordinates $x = r\cos\theta$, $y = r\sin\theta$, the area element is $dA = r\,dr\,d\theta$.
:::

### The general rule: the Jacobian determinant
Where did $r$ come from algebraically? Any change of variables $(u, v)\mapsto(x(u, v), y(u, v))$ maps a tiny rectangle of sides $\Delta u$, $\Delta v$ to a tiny (approximately) parallelogram. Near a point, the map acts like its Jacobian matrix $J = \frac{\partial(x, y)}{\partial(u, v)}$, and a linear map scales areas by the absolute value of its determinant. So
$$dA = \left|\det\frac{\partial(x, y)}{\partial(u, v)}\right|du\,dv,$$
and
$$\iint_D f(x, y)\,dx\,dy = \iint_{D'}f(x(u, v), y(u, v))\left|\det J\right|du\,dv.$$
For polar coordinates, $\det J = \cos\theta\cdot r\cos\theta - (-r\sin\theta)\sin\theta = r$, matching the pizza argument.

:::def Jacobian determinant
For a change of variables $(u, v)\mapsto(x, y)$, the determinant $\det\frac{\partial(x, y)}{\partial(u, v)} = x_uy_v - x_vy_u$. Its absolute value is the local area-scaling factor.
:::

### Linear changes of variables
For a linear map the scaling is the same everywhere. Consider a region bounded by the lines $x + y = 0$, $x + y = 1$, $x - y = 0$ and $x - y = 2$, a tilted rectangle. Let $u = x + y$ and $v = x - y$, so the region becomes the plain rectangle $0 \le u \le 1$, $0 \le v \le 2$. Solving, $x = \frac{u + v}{2}$ and $y = \frac{u - v}{2}$, and the Jacobian determinant is $\frac12\cdot\left(-\frac12\right) - \frac12\cdot\frac12 = -\frac12$. So $dA = \frac12\,du\,dv$. The area of the region is $\frac12\times1\times2 = 1$, and $\iint(x + y)\,dA = \int_0^1\int_0^2u\cdot\frac12\,dv\,du = \frac12$.

@fig matrix2 preset=symmetric | A linear map turns the unit square into a parallelogram; the determinant (here 3) is the factor by which every area is multiplied.

### The Gaussian integral
The most famous use of polar coordinates computes $I = \int_{-\infty}^{\infty}e^{-x^2}\,dx$, which has no elementary antiderivative. Square it and write the product as a double integral: $I^2 = \int e^{-x^2}dx\int e^{-y^2}dy = \iint_{\mathbb R^2}e^{-(x^2 + y^2)}\,dA$. In polar coordinates this is $\int_0^{2\pi}\int_0^\infty e^{-r^2}r\,dr\,d\theta$. The factor $r$ makes the inner integral easy with $u = r^2$: it equals $\frac12$. So $I^2 = 2\pi\cdot\frac12 = \pi$ and $I = \sqrt\pi$. This is exactly why the normal density has the constant $\frac{1}{\sqrt{2\pi}}$ in front.

### Cylindrical and spherical coordinates
In three dimensions, **cylindrical coordinates** use polar coordinates in the $xy$-plane plus the height $z$, with $dV = r\,dr\,d\theta\,dz$. They suit cylinders and cones. **Spherical coordinates** use the distance $\rho$ from the origin, the angle $\varphi$ down from the positive $z$-axis, and the angle $\theta$ around it: $x = \rho\sin\varphi\cos\theta$, $y = \rho\sin\varphi\sin\theta$, $z = \rho\cos\varphi$, with
$$dV = \rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta.$$
The volume of a ball of radius $R$ is then $\int_0^{2\pi}\int_0^\pi\int_0^R\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta = 2\pi\cdot2\cdot\frac{R^3}{3} = \frac43\pi R^3$.

### Transforming probability densities
If $\mathbf Y = T(\mathbf X)$ is an invertible smooth transformation of a random vector, probability must be conserved: mass in a small region of $\mathbf x$-space ends up in the image region, whose area is scaled by $|\det J_T|$. So $p_Y(\mathbf y) = p_X(\mathbf x)\,\left|\det J_T(\mathbf x)\right|^{-1}$ with $\mathbf x = T^{-1}(\mathbf y)$. In one dimension: if $X$ is uniform on $[0, 1]$ and $Y = 2X$, then $Y$ is spread over $[0, 2]$ with density $\frac12$.

### Common mistakes
Forgetting the Jacobian factor ($r$, $\rho^2\sin\varphi$) is by far the most common error. Others: using the Jacobian of the wrong direction (you need $\frac{\partial(x, y)}{\partial(u, v)}$, old variables in terms of new), forgetting the absolute value, and not transforming the region's limits along with the integrand.

### Summary
Changing variables lets you integrate in coordinates that fit the region. Every change of variables multiplies the area or volume element by $|\det J|$: $r$ for polar, $r$ for cylindrical, $\rho^2\sin\varphi$ for spherical, a constant for linear maps. Polar coordinates give $\int e^{-x^2}dx = \sqrt\pi$, and the same determinant rule transforms probability densities.

@viz matrix2 preset=symmetric | A linear map acting on the plane. The determinant shown in the panel is the factor by which it scales every area.

:::explore
**What to try**
1. With the symmetric preset, read $\det A$ and compare the area of the transformed square with the original unit square.
2. Drag $\hat\imath$ and $\hat\jmath$ to make the determinant larger, then smaller, then 0.
3. Choose the rotate and shear presets and read their determinants.

**What to notice:** the area of the image of the unit square is always $|\det A|$, which is why the Jacobian determinant appears in $dA = |\det J|\,du\,dv$. Rotations and shears have determinant 1, so they preserve area. When the determinant is 0, the plane is squashed onto a line and the change of variables cannot be undone.
:::

@viz distribution kind=normal | The normal density. Its total area is 1 because of the polar-coordinates computation of the Gaussian integral.

:::explore
**What to try**
1. Look at the curve's peak height for the standard normal and compare it with $\frac{1}{\sqrt{2\pi}} \approx 0.399$.
2. Change the spread parameter and watch the peak height change.

**What to notice:** making the curve twice as wide halves its height, so the area stays 1. That is the one-dimensional change of variables $Y = \sigma X$: the density is divided by the stretching factor $|\det J| = \sigma$.
:::

:::formulas
$$\iint_D f\,dx\,dy = \iint_{D'}f(x(u, v), y(u, v))\left|\det\frac{\partial(x, y)}{\partial(u, v)}\right|du\,dv$$
$$\text{polar: } dA = r\,dr\,d\theta \qquad \text{cylindrical: } dV = r\,dr\,d\theta\,dz$$
$$\text{spherical: } dV = \rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta$$
$$\int_{-\infty}^{\infty}e^{-x^2}dx = \sqrt\pi \qquad \int_{-\infty}^{\infty}e^{-x^2/2}dx = \sqrt{2\pi}$$
$$p_Y(\mathbf y) = p_X(T^{-1}(\mathbf y))\left|\det J_{T^{-1}}(\mathbf y)\right|$$
:::

:::thm Change of variables theorem
Let $T(u, v) = (x(u, v), y(u, v))$ be a one-to-one map with continuous first partials from a region $D'$ onto $D$, with nonzero Jacobian determinant. Then for continuous $f$, $\iint_D f(x, y)\,dA = \iint_{D'}f(T(u, v))\,\left|\det J_T(u, v)\right|\,du\,dv$.
:::

:::proof
(Idea.) Divide $D'$ into tiny rectangles of area $\Delta u\Delta v$. By the linear approximation, $T$ maps each one to approximately a parallelogram spanned by $\mathbf T_u\Delta u$ and $\mathbf T_v\Delta v$, whose area is $|\det J_T|\,\Delta u\Delta v$. So the Riemann sum $\sum f(x, y)\,\Delta A$ over $D$ matches $\sum f(T(u, v))\,|\det J_T|\,\Delta u\Delta v$ over $D'$ up to errors that vanish as the grid is refined.
:::

:::steps Compute $\iint_D e^{-(x^2 + y^2)}\,dA$ over the disc of radius 1
1. Polar: $\int_0^{2\pi}\int_0^1e^{-r^2}r\,dr\,d\theta$.
2. Inner, with $u = r^2$: $\frac12(1 - e^{-1})$.
3. Total: $\pi(1 - e^{-1}) \approx 1.986$.
:::

:::steps Area of the ellipse $\frac{x^2}{a^2} + \frac{y^2}{b^2} \le 1$
1. Let $x = au$, $y = bv$; the region becomes the unit disc $u^2 + v^2 \le 1$.
2. $\det J = ab$, so $dA = ab\,du\,dv$.
3. Area $= ab\times\pi = \pi ab$.
:::

:::steps Volume of a cone of height $h$ and base radius $R$, using cylindrical coordinates
1. At radius $r$, the cone's height runs from $z = \frac{h}{R}r$ up to $h$.
2. $V = \int_0^{2\pi}\int_0^R\left(h - \frac hRr\right)r\,dr\,d\theta = 2\pi\left(\frac{hR^2}{2} - \frac{hR^2}{3}\right)$.
3. $V = \frac13\pi R^2h$.
:::

:::mock Exam question
(a) Use polar coordinates to find the area of the annulus $1 \le x^2 + y^2 \le 9$. (b) Evaluate $\iint_D\frac{1}{\sqrt{x^2 + y^2}}\,dA$ over the same annulus. (c) A random point $(X, Y)$ is uniform on the disc of radius 1. Find the density of its distance $R$ from the centre.
:::solution
(a) $\int_0^{2\pi}\int_1^3r\,dr\,d\theta = 2\pi\cdot\frac{9 - 1}{2} = 8\pi$. (b) $\int_0^{2\pi}\int_1^3\frac1r\,r\,dr\,d\theta = 2\pi\cdot2 = 4\pi$. (c) The joint density is $\frac1\pi$ on the disc. $P(R \le s) = \frac{\pi s^2}{\pi} = s^2$ for $0 \le s \le 1$, so the density is $2s$: points are more likely far from the centre, because outer rings have more area (the factor $r$ again).
:::
:::

:::ml Normalizing flows and the reparameterization
Normalizing flows build complex distributions by pushing a simple Gaussian through invertible neural networks and track the density with the change-of-variables formula: $\log p_Y(\mathbf y) = \log p_X(\mathbf x) - \log|\det J_T(\mathbf x)|$. Architectures like RealNVP are designed so that this determinant is cheap (triangular Jacobians). The normalizing constant $\frac{1}{(2\pi)^{d/2}|\Sigma|^{1/2}}$ of the multivariate Gaussian comes from the Gaussian integral plus a linear change of variables.
:::

:::cs Sampling random points
To sample a uniform random point in a disc, generating $r$ uniformly in $[0, 1]$ is wrong: points cluster at the centre. The change-of-variables density $2r$ shows the correct method, $r = \sqrt U$ with $U$ uniform. The Box–Muller method generates normal random numbers from two uniforms using polar coordinates and the Gaussian integral.
:::

:::real Planets and pipes
Engineers compute the mass of a pipe or the flow through a circular cross-section in cylindrical coordinates, and astronomers compute the mass of a planet with density depending on depth, $M = \int_0^{2\pi}\int_0^\pi\int_0^R\rho(s)s^2\sin\varphi\,ds\,d\varphi\,d\theta = 4\pi\int_0^R\rho(s)s^2\,ds$, in spherical coordinates.
:::

:::quiz
? In polar coordinates, the area element at radius $r = 3$ is $dA = c\,dr\,d\theta$ with $c$ =
= 3
> $dA = r\,dr\,d\theta$.

? The map $(u, v)\mapsto(2u, 3v)$ multiplies areas by...
= 6
> $\det\begin{pmatrix}2 & 0\\ 0 & 3\end{pmatrix}$.

? The area of the ellipse $\frac{x^2}{4} + \frac{y^2}{9} \le 1$ is $k\pi$ with $k$ =
= 6
> $\pi ab = \pi\cdot2\cdot3$.

? $X$ is uniform on $[0, 1]$ and $Y = 2X$. The density of $Y$ on $[0, 2]$ is...
= 1/2|0.5
> Stretching by 2 halves the density.

? The spherical volume element is...
+ $\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta$
- $\rho\,d\rho\,d\varphi\,d\theta$
- $\sin\varphi\,d\rho\,d\varphi\,d\theta$
> The Jacobian determinant of spherical coordinates.

? $\left(\int_{-\infty}^{\infty}e^{-x^2}dx\right)^2$ equals...
+ $\pi$
- $2\pi$
- $1$
> Polar coordinates give $2\pi\cdot\frac12$.
:::

## Lesson: Vector fields, divergence and curl {#vector-fields}
@summary: Fields of arrows, gradient (conservative) fields and potentials, line integrals and work, divergence, curl, and Green's theorem.

### Arrows everywhere
So far our functions have produced a single number at each point. Many things in nature attach an **arrow** to each point instead: the velocity of water in a river, the wind at every place on a weather map, the force of gravity around a planet, the electric field around a charge. A **vector field** assigns a vector to every point of the plane or space. We have already met one: the gradient of a function is a vector field, with arrows pointing uphill. This lesson introduces the tools for understanding fields: how much they spread out (divergence), how much they swirl (curl), and how much work they do along a path (line integrals).

### An everyday scenario
Drop a few leaves into a stream and watch them. Some regions push the leaves along steadily. Near a spring bubbling up from the bottom, leaves move outward in all directions: the flow is **diverging**. Near an eddy behind a rock, leaves circle round: the flow has **curl**. And if you paddle a canoe from one bank to the other, the current helps on some stretches and hinders on others; the total help is a line integral. These three ideas describe nearly everything about a flow.

### Vector fields
A vector field in the plane is a function $\mathbf F(x, y) = (P(x, y), Q(x, y))$. Picture it by drawing the arrow $\mathbf F(x, y)$ at a grid of points. Three basic examples: $\mathbf F = (x, y)$ points straight away from the origin, a **source**; $\mathbf F = (-x, -y)$ points inward, a **sink**; and $\mathbf F = (-y, x)$ circles counterclockwise around the origin, a **rotation**. At the point $(1, 0)$ the rotation field is $(0, 1)$, pointing straight up, tangent to the circle through that point. A particle carried by a field follows a **flow line**, a curve whose velocity at every point equals the field's arrow there; for the rotation field the flow lines are circles.

:::def Vector field
A function $\mathbf F : \mathbb R^n\to\mathbb R^n$ assigning a vector to every point, written in 2D as $\mathbf F = (P, Q)$.
:::

### Gradient fields and potentials
If $\mathbf F = \nabla\varphi$ for some scalar function $\varphi$, the field is called a **gradient field** or **conservative**, and $\varphi$ is a **potential**. For example $\mathbf F = (y, x)$ is the gradient of $\varphi = xy$. Gravity near the Earth is the (negative) gradient of potential energy. Not every field is a gradient: the rotation field $(-y, x)$ is not. A quick test in 2D uses Clairaut's theorem: if $\mathbf F = (P, Q) = (\varphi_x, \varphi_y)$, then $P_y = \varphi_{xy} = \varphi_{yx} = Q_x$. So a gradient field must satisfy $\frac{\partial Q}{\partial x} = \frac{\partial P}{\partial y}$. For $(-y, x)$, $Q_x = 1$ but $P_y = -1$, so it fails.

:::def Conservative field
A vector field $\mathbf F$ that equals $\nabla\varphi$ for some scalar potential $\varphi$. Its line integrals depend only on the endpoints of the path.
:::

### Line integrals and work
When a force $\mathbf F$ pushes an object along a curve $C$, only the component of force along the direction of motion does work. Splitting the path into tiny steps $d\mathbf r$, the work is the sum of $\mathbf F\cdot d\mathbf r$:
$$W = \int_C\mathbf F\cdot d\mathbf r = \int_a^b\mathbf F(\mathbf r(t))\cdot\mathbf r'(t)\,dt,$$
where $\mathbf r(t)$, $a \le t \le b$, traces the curve. Example: $\mathbf F = (y, x)$ along the parabola $\mathbf r(t) = (t, t^2)$ from $t = 0$ to $1$. Then $\mathbf F(\mathbf r) = (t^2, t)$ and $\mathbf r' = (1, 2t)$, so the integrand is $t^2 + 2t^2 = 3t^2$ and the work is 1.

For gradient fields there is a shortcut, the **fundamental theorem for line integrals**: $\int_C\nabla\varphi\cdot d\mathbf r = \varphi(\text{end}) - \varphi(\text{start})$. Since $(y, x) = \nabla(xy)$, the work above is $xy$ at $(1, 1)$ minus $xy$ at $(0, 0)$, which is 1, with no integral needed. The path does not matter, and around any closed loop the work is zero. That is what "conservative" means: energy is conserved.

### Divergence: spreading out
The **divergence** of $\mathbf F = (P, Q)$ is $\operatorname{div}\mathbf F = \nabla\cdot\mathbf F = P_x + Q_y$. It measures the net outflow per unit area from a tiny region around a point. The source $(x, y)$ has divergence $1 + 1 = 2$ everywhere: fluid is being created and flows out. The sink has divergence $-2$. The rotation field has divergence $0 + 0 = 0$: fluid just circulates, neither created nor destroyed. Fields with zero divergence describe incompressible flow.

### Curl: swirling
The (scalar) **curl** of a 2D field is $Q_x - P_y$. It measures the circulation per unit area around a point, how strongly a tiny paddle wheel placed there would spin (counterclockwise positive). For the rotation $(-y, x)$, the curl is $1 - (-1) = 2$. For the source it is 0. For the shear flow $(y, 0)$, like a river faster at one bank, the curl is $0 - 1 = -1$: even though the arrows are all parallel, a paddle wheel spins because one side is pushed harder than the other. Gradient fields always have zero curl, by the Clairaut argument above. In 3D the curl is a vector, $\nabla\times\mathbf F$, whose direction is the spin axis.

:::def Divergence and curl (2D)
For $\mathbf F = (P, Q)$: $\operatorname{div}\mathbf F = P_x + Q_y$ (outflow per unit area) and $\operatorname{curl}\mathbf F = Q_x - P_y$ (circulation per unit area).
:::

### Green's theorem
Adding up curl over a region gives the circulation around its boundary. **Green's theorem** says
$$\oint_C P\,dx + Q\,dy = \iint_D(Q_x - P_y)\,dA,$$
where $C$ is the counterclockwise boundary of $D$. For the rotation field around a circle of radius $r$, the curl is 2 everywhere, so the circulation is $2\times\pi r^2 = 2\pi r^2$. Checking directly with $\mathbf r = (r\cos t, r\sin t)$: $\mathbf F\cdot\mathbf r' = r^2\sin^2t + r^2\cos^2t = r^2$, integrated over $[0, 2\pi]$ gives $2\pi r^2$. The flux form of Green's theorem relates outflow through the boundary to the integral of divergence, the 2D version of the divergence theorem.

### Common mistakes
Confusing divergence (a sum of "own" partials, $P_x + Q_y$) with curl (cross partials, $Q_x - P_y$) is common. So is thinking that parallel arrows mean zero curl; shear flows prove otherwise. Use the endpoint shortcut only after checking that the field is conservative, and orient Green's theorem counterclockwise.

### Summary
A vector field attaches an arrow to every point. Gradient (conservative) fields have potentials, zero curl, and path-independent line integrals given by $\varphi(\text{end}) - \varphi(\text{start})$. The line integral $\int\mathbf F\cdot d\mathbf r$ measures work or circulation along a path. Divergence $P_x + Q_y$ measures spreading, curl $Q_x - P_y$ measures swirling, and Green's theorem connects the circulation around a loop to the total curl inside.

@viz g04-vector-field field=rotation | Drag the orange point. The panel shows the field, its divergence and curl, and the circulation and flux around the orange loop.

:::explore
**What to try**
1. With the rotation field, read the divergence and curl at several points, then change the loop radius $r$ and watch the circulation.
2. Press Flow to release particles and watch their paths.
3. Switch to the source, the sink, the gradient field $(y, x)$ and the shear field, reading divergence and curl for each.
4. Try the spiral sink.

**What to notice:** the rotation field has divergence 0 and curl 2 everywhere, and its circulation around the loop is $2\pi r^2$, exactly as Green's theorem predicted in the article. The source has divergence 2 and its particles stream outward. The gradient field $(y, x)$ has curl 0 and zero circulation around every loop, as a conservative field must. The shear field's arrows are parallel yet its curl is $-1$. The spiral sink mixes both: negative divergence and positive curl.
:::

:::formulas
$$\mathbf F = (P, Q) \qquad \nabla\varphi = (\varphi_x, \varphi_y)$$
$$\int_C\mathbf F\cdot d\mathbf r = \int_a^b\mathbf F(\mathbf r(t))\cdot\mathbf r'(t)\,dt$$
$$\int_C\nabla\varphi\cdot d\mathbf r = \varphi(\mathbf r(b)) - \varphi(\mathbf r(a))$$
$$\operatorname{div}\mathbf F = P_x + Q_y \qquad \operatorname{curl}\mathbf F = Q_x - P_y$$
$$\oint_C P\,dx + Q\,dy = \iint_D(Q_x - P_y)\,dA \qquad \oint_C\mathbf F\cdot\mathbf n\,ds = \iint_D(P_x + Q_y)\,dA$$
$$\operatorname{curl}(\nabla\varphi) = 0 \qquad \nabla\times\mathbf F = (R_y - Q_z,\ P_z - R_x,\ Q_x - P_y) \text{ in 3D}$$
:::

:::thm Fundamental theorem for line integrals
If $\varphi$ has continuous first partials and $C$ is a smooth curve from $\mathbf A$ to $\mathbf B$, then $\int_C\nabla\varphi\cdot d\mathbf r = \varphi(\mathbf B) - \varphi(\mathbf A)$.
:::

:::proof
Parametrize $C$ by $\mathbf r(t)$, $a \le t \le b$. By the multivariable chain rule, $\frac{d}{dt}\varphi(\mathbf r(t)) = \nabla\varphi(\mathbf r(t))\cdot\mathbf r'(t)$. So the line integral is $\int_a^b\frac{d}{dt}\varphi(\mathbf r(t))\,dt$, which by the single-variable fundamental theorem of calculus equals $\varphi(\mathbf r(b)) - \varphi(\mathbf r(a))$.
:::

:::thm Green's theorem
If $C$ is a positively oriented, piecewise-smooth simple closed curve bounding a region $D$, and $P$, $Q$ have continuous first partials on an open set containing $D$, then $\oint_C P\,dx + Q\,dy = \iint_D(Q_x - P_y)\,dA$.
:::

:::steps Divergence and curl of $\mathbf F = (x^2y,\ xy)$
1. $P = x^2y$, $Q = xy$: $P_x = 2xy$, $Q_y = x$, so $\operatorname{div}\mathbf F = 2xy + x$.
2. $Q_x = y$, $P_y = x^2$, so $\operatorname{curl}\mathbf F = y - x^2$.
3. At $(1, 2)$: divergence $5$, curl $1$.
:::

:::steps Work done by $\mathbf F = (2x, 2y)$ along any path from $(0, 0)$ to $(3, 4)$
1. $\mathbf F = \nabla(x^2 + y^2)$, so the field is conservative.
2. Work $= \varphi(3, 4) - \varphi(0, 0) = 25 - 0$.
3. $W = 25$, whatever the path.
:::

:::steps Circulation of $\mathbf F = (-y, x)$ around the unit square $[0, 1]^2$
1. Curl $= Q_x - P_y = 1 - (-1) = 2$.
2. Green: circulation $= \iint_D2\,dA = 2\times\text{area}$.
3. $= 2$.
:::

:::mock Exam question
Let $\mathbf F = (2xy,\ x^2 + 2y)$. (a) Show that $\mathbf F$ is conservative. (b) Find a potential $\varphi$. (c) Find the work done by $\mathbf F$ moving a particle from $(0, 0)$ to $(1, 2)$. (d) What is the work around any closed loop?
:::solution
(a) $P_y = 2x$ and $Q_x = 2x$ are equal (and the domain is all of $\mathbb R^2$), so the curl is 0 and $\mathbf F$ is conservative. (b) $\varphi_x = 2xy$ gives $\varphi = x^2y + h(y)$; then $\varphi_y = x^2 + h'(y) = x^2 + 2y$, so $h = y^2$ and $\varphi = x^2y + y^2$. (c) $W = \varphi(1, 2) - \varphi(0, 0) = 2 + 4 = 6$. (d) Zero.
:::
:::

:::ml Gradient fields and flows in ML
Gradient descent follows the vector field $-\nabla L$ over weight space; its flow lines are the paths of gradient flow. Score-based diffusion models learn the vector field $\nabla_{\mathbf x}\log p(\mathbf x)$, the gradient of the log-density, and generate samples by following it with noise. Neural ODEs and flow-matching models learn a velocity field and transport samples along its flow lines; the divergence of that field tracks how probability density changes along the way.
:::

:::cs Simulating fluids and fields
Physics engines and weather models store vector fields on grids and compute divergence and curl with finite differences. Fluid simulations enforce incompressibility by removing the divergence of the velocity field at each step, solving a Poisson equation. Game AI uses flow fields, precomputed vectors pointing toward a goal, to steer thousands of units at once.
:::

:::real Wind and ocean currents
Meteorologists compute the curl (vorticity) of wind fields to spot rotating storms: large positive vorticity in the northern hemisphere signals a cyclone. Divergence of the wind at high altitude, which pulls air upward from below, is a key ingredient in forecasting thunderstorms.
:::

:::quiz
? The divergence of $\mathbf F = (x, y)$ is...
= 2
> $1 + 1$.

? The curl of $\mathbf F = (-y, x)$ is...
= 2
> $Q_x - P_y = 1 - (-1)$.

? The curl of the shear field $\mathbf F = (y, 0)$ is...
= -1
> $0 - 1$.

? The work done by $\mathbf F = (y, x)$ from $(0, 0)$ to $(2, 3)$ along any path is...
= 6
> $\mathbf F = \nabla(xy)$, so $W = 2\cdot3$.

? A gradient field always has...
+ zero curl
- zero divergence
- constant length
> Mixed partials are equal.

? Green's theorem relates a line integral around a closed curve to...
+ a double integral of the curl over the enclosed region
- the length of the curve
- the value of the field at one point
> $\oint P\,dx + Q\,dy = \iint(Q_x - P_y)\,dA$.
:::
