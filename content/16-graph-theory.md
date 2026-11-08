---
id: graph-theory
title: Graph Theory
tagline: Dots and lines that model networks, maps, schedules, molecules and neural networks.
desc: Graphs are the mathematics of connections. You'll learn the vocabulary (vertices, edges, degree, paths), the key structures (trees, bipartite graphs, matchings, planar graphs, colourings, DAGs), the classic algorithms (BFS, DFS, Dijkstra, Prim, Kruskal, topological sort, max flow) with the theorems that prove them correct, and how graphs power PageRank, graph neural networks and spectral clustering.
color: #0ea5e9
symbol: G
area: Discrete math
paths: cs, ml
order: 16
---

# Unit: Graph basics

## Lesson: What is a graph? {#graphs-intro}
@summary: Vertices, edges, simple graphs, weights and direction, and how to store a graph as an adjacency list or matrix.

### Why mathematicians draw dots and lines
Look at almost anything that involves connections and you will find the same picture underneath. A map of cities joined by roads. A group of friends where some pairs know each other. Web pages linking to other web pages. Atoms bonded in a molecule. Tasks that must happen before other tasks. In every case there are *things*, and there are *relationships between pairs of things*. A **graph** is the mathematical object that keeps exactly that information and throws away everything else.

That act of throwing away is the whole point. When you ask "can I drive from Pune to Delhi?", the colour of the road signs and the exact curve of each highway do not matter. All that matters is which cities are directly connected. Once you strip the problem down to dots and lines, one single theory and one single set of algorithms solves the road problem, the friendship problem and the web problem at the same time.

### Imagine a small friendship network
Imagine five students: Asha, Ben, Chen, Dev and Esi. Asha is friends with Ben and Chen. Ben is also friends with Chen and Dev. Dev is friends with Esi. Nobody else is friends. You can draw this by putting a dot for each person and a line between each pair of friends. You get 5 dots and 5 lines. From the picture you can instantly see things the list hides: Esi is only connected to the group through Dev, and Asha, Ben and Chen form a little triangle where everyone knows everyone.

That drawing is a graph. The dots are called **vertices** (one vertex, many vertices; some books say *nodes*) and the lines are called **edges** (some books say *links* or *arcs*).

:::def Graph
A graph $G = (V, E)$ is a set $V$ of vertices together with a set $E$ of edges, where each edge joins a pair of vertices. We write $n = |V|$ for the number of vertices and $m = |E|$ for the number of edges.
:::

In our example $V = \{A, B, C, D, E\}$ and $E = \{AB, AC, BC, BD, DE\}$, so $n = 5$ and $m = 5$. The edge $AB$ is the same as the edge $BA$: friendship goes both ways. When two vertices share an edge we call them **adjacent** or **neighbours**, and we say the edge is **incident** to each of its two endpoints.

### The drawing is not the graph
A very important idea for beginners: the graph is the *set of connections*, not the picture. You could place Asha on the left or on the right, draw the lines straight or curved, and as long as the same pairs are joined it is the same graph. Two drawings that represent the same connections (possibly after renaming the vertices) are called **isomorphic**. This is why a graph question never depends on lengths or angles in the drawing, unless the problem explicitly adds that information.

### Simple graphs, multigraphs and loops
The most common kind of graph is a **simple graph**: no edge from a vertex to itself (a **loop**), and at most one edge between any two vertices. Sometimes you need more. A road map might have two different roads between the same two towns; a graph that allows repeated edges is a **multigraph**. A state machine might have a transition from a state back to itself, which is a loop. Unless a lesson says otherwise, "graph" in this course means simple graph.

How many edges can a simple graph on $n$ vertices have? Each edge is a choice of 2 vertices out of $n$, so the maximum is $\binom n2 = \frac{n(n-1)}{2}$. With 5 vertices that is $\frac{5 \cdot 4}{2} = 10$ edges. The graph that has every possible edge is the **complete graph** $K_n$. Our friendship graph uses 5 of the 10 possible edges.

### Adding information: weights and directions
Two common upgrades turn a plain graph into a richer model. In a **weighted graph** each edge carries a number, such as the length of a road in kilometres, the cost of a flight, or the strength of a connection. In a **directed graph** (or *digraph*) each edge has a direction, drawn as an arrow from $u$ to $v$. Directed edges model one-way relationships: "page $u$ links to page $v$", "task $u$ must happen before task $v$", "person $u$ follows person $v$". On a directed graph $u \to v$ and $v \to u$ are different edges. We will study directed graphs in detail in their own unit.

### Storing a graph in a computer
A computer cannot look at a drawing, so we need a data structure. There are two standard choices.

An **adjacency list** stores, for each vertex, a list of its neighbours. For the friendship graph: A: [B, C]; B: [A, C, D]; C: [A, B]; D: [B, E]; E: [D]. The total length of all lists is $2m = 10$, because each edge appears once in each endpoint's list. Memory use is proportional to $n + m$, which is small for **sparse** graphs (graphs with far fewer edges than the maximum).

An **adjacency matrix** is an $n \times n$ table $A$ where $A_{ij} = 1$ if vertices $i$ and $j$ are adjacent and $0$ otherwise. Numbering A to E as 1 to 5, row 2 (Ben) reads $[1, 0, 1, 1, 0]$. For an undirected graph the matrix is **symmetric**: $A_{ij} = A_{ji}$. The diagonal is all zeros in a simple graph because there are no loops. The matrix uses $n^2$ memory no matter how few edges there are, but it answers "are $i$ and $j$ adjacent?" in a single lookup. It also lets you use linear algebra on graphs, which turns out to be extremely powerful (see the last unit).

@fig g10-graph-lab graph=envelope mode=degree | A small graph. Each label shows how many edges touch that vertex.

### Common mistakes
The first mistake is counting an undirected edge twice when you count edges. The edge $AB$ is one edge even though it shows up in both A's and B's adjacency lists. The second mistake is thinking two drawings are different graphs because they look different; always compare the edge sets. The third is forgetting that a graph may have vertices with no edges at all (isolated vertices). They still belong to $V$ and still count in $n$.

### Summary
A graph is a set of vertices plus a set of edges joining pairs of vertices. It captures connections and nothing else, so the same mathematics applies to roads, friendships, web links and molecules. Simple graphs have no loops or repeated edges and at most $\binom n2$ edges. Weights add numbers to edges, directions add arrows. Computers store graphs as adjacency lists (memory about $n + m$) or adjacency matrices (memory $n^2$, instant edge lookup).

@viz g10-graph-lab graph=k4 mode=degree | Switch graphs, then use "Edit edges" to add and remove connections.

:::explore
**What to try**
1. Choose the graph `k4`. Count its edges and check that it is $\binom42 = 6$.
2. Switch to "Edit edges", click vertex 0 then vertex 2 to delete that edge, and watch the edge count drop.
3. Click on empty space to add a new isolated vertex. Notice that $n$ grows but $m$ does not.
4. Go back to "Explore" and drag vertices around. The degrees and edge count never change.

**What to notice:** moving vertices changes the drawing but not the graph, exactly as the article said. Only adding or removing edges changes the graph. The complete graph is the one where every pair is already joined, so in edit mode you can only remove edges from it.
:::

:::formulas
$$G = (V, E), \qquad n = |V|, \qquad m = |E|$$
$$\text{simple graph: } 0 \le m \le \binom n2 = \frac{n(n-1)}{2}$$
$$A_{ij} = \begin{cases}1 & ij \in E\\ 0 & \text{otherwise}\end{cases}, \qquad A = A^\top \text{ for undirected graphs}$$
:::

:::thm Number of edges of $K_n$
The complete graph $K_n$ has exactly $\frac{n(n-1)}{2}$ edges, and no simple graph on $n$ vertices has more.
:::

:::proof
An edge of a simple graph is determined by an unordered pair of distinct vertices, and different edges use different pairs. There are $\binom n2 = \frac{n(n-1)}2$ unordered pairs, so $m \le \frac{n(n-1)}2$, and $K_n$ uses all of them.
:::

:::steps Write the adjacency list and matrix for $V = \{1,2,3,4\}$, $E = \{12, 13, 34\}$
1. Neighbours: 1 is joined to 2 and 3; 2 to 1; 3 to 1 and 4; 4 to 3.
2. Adjacency list: 1: [2, 3]; 2: [1]; 3: [1, 4]; 4: [3]. Total length $6 = 2 \times 3$ edges.
3. Matrix rows: row 1 $= [0,1,1,0]$, row 2 $= [1,0,0,0]$, row 3 $= [1,0,0,1]$, row 4 $= [0,0,1,0]$.
4. Check: the matrix is symmetric, has zeros on the diagonal, and contains $2m = 6$ ones.
:::

:::steps How full is a graph with 20 vertices and 38 edges?
1. Maximum possible edges: $\binom{20}2 = \frac{20 \cdot 19}{2} = 190$.
2. Fraction present (the **density**): $\frac{38}{190} = 0.2$, so 20% of possible edges exist.
3. Adjacency matrix: $20^2 = 400$ entries. Adjacency list: about $n + 2m = 20 + 76 = 96$ entries. The list is smaller.
:::

:::mock Exam question
A simple graph has 8 vertices. (a) What is the largest possible number of edges? (b) If the graph has 12 edges, how many 1s are in its adjacency matrix? (c) How many entries of the matrix are 0?
:::solution
(a) $\binom82 = 28$. (b) Each edge gives two 1s ($A_{ij}$ and $A_{ji}$), so $2 \times 12 = 24$. (c) The matrix has $8^2 = 64$ entries, so $64 - 24 = 40$ are 0 (including the 8 diagonal entries).
:::
:::

:::cs
Almost every large system stores graphs as adjacency lists because real networks are sparse: a social network may have a billion users but each user has only a few hundred friends. Road-routing services, package managers (dependency graphs), compilers (control-flow graphs) and databases (query plans) are all graph programs underneath.
:::

:::ml
Graph neural networks, knowledge graphs and recommendation systems all start from an adjacency matrix $A$. Many ML formulas are written with $A$ directly, for example a graph convolution layer computes $H' = \sigma(\hat A H W)$, where $\hat A$ is a normalised adjacency matrix.
:::

:::real
A metro map is a graph: stations are vertices and track segments are edges. The map designer deliberately distorts distances and angles (the drawing) but keeps the connections (the graph) exact, because the connections are all a traveller needs.
:::

:::quiz
? A simple graph has 6 vertices. What is the maximum number of edges it can have?
= 15
> $\binom62 = \frac{6\cdot5}{2} = 15$.

? In an undirected graph's adjacency matrix, which property always holds?
- every row sums to 1
+ the matrix is symmetric
- the diagonal is all 1s
- it has exactly $n$ ones
> Edge $ij$ is the same as edge $ji$, so $A_{ij} = A_{ji}$.

? Two drawings have the same vertices and the same pairs joined, but one uses curved lines. Are they the same graph?
+ Yes
- No
> A graph is its vertex and edge sets. The drawing style is irrelevant.

? A graph has 10 vertices and 9 edges. What is the total length of all its adjacency lists?
= 18
> Each edge appears in two lists, so the total is $2m = 18$.

? Which model fits "task $u$ must be finished before task $v$"?
- an undirected graph
+ a directed graph
- a complete graph
> The relationship has a direction, so the edge is an arrow $u \to v$.
:::

## Lesson: Degree and the handshake lemma {#degree-handshake}
@summary: How many edges touch a vertex, why the degrees always add up to twice the number of edges, and the special graphs K_n, C_n, P_n and regular graphs.

### Counting connections at one vertex
Once you have a graph, the most natural question about a single vertex is "how connected is it?". In a friendship network, that is "how many friends does this person have?". In a road network, "how many roads leave this junction?". This number is called the **degree** of the vertex. It is the simplest statistic in graph theory and, surprisingly, it already leads to a real theorem with a clever proof.

:::def Degree
The degree $\deg(v)$ of a vertex $v$ is the number of edges incident to it. In a simple graph this equals the number of neighbours of $v$. A vertex of degree 0 is **isolated**; a vertex of degree 1 is a **leaf** (or pendant vertex).
:::

### Imagine a room full of handshakes
Imagine a party where some pairs of guests shake hands. Afterwards, every guest writes down how many hands they shook, and you add up all those numbers. Here is the surprise: the total is always even. In fact it is exactly twice the number of handshakes. Why? Every single handshake involves two hands. When you add up everybody's count, each handshake gets counted once by each of its two participants. So the total is $2 \times$ (number of handshakes).

Translate guests into vertices and handshakes into edges and you get the **handshake lemma**: the sum of all degrees equals twice the number of edges.
$$\sum_{v \in V} \deg(v) = 2m$$

### Checking it on a small example
Take the friendship graph from the previous lesson: edges $AB, AC, BC, BD, DE$. The degrees are $\deg A = 2$, $\deg B = 3$, $\deg C = 2$, $\deg D = 2$, $\deg E = 1$. Their sum is $2 + 3 + 2 + 2 + 1 = 10$, and $2m = 2 \times 5 = 10$. It works.

The proof idea, counting the same thing in two ways, is called **double counting**. We counted pairs (vertex, edge touching it). Counting by vertices gives the sum of degrees. Counting by edges gives 2 per edge, because each edge touches exactly two vertices. Two correct counts of the same set must agree.

### A consequence that feels like magic
Because the degree sum is even, the number of vertices with an **odd** degree must itself be even. Here is why. Split the sum into the odd degrees and the even degrees. The even degrees add to something even. The total is even. So the odd degrees must also add to something even, and a sum of odd numbers is even only when there is an even number of them.

This lets you answer questions instantly. Can 7 people at a party each shake exactly 3 hands? That would be 7 vertices of odd degree 3, an odd count of odd vertices, which is impossible. Equivalently, the degree sum would be $7 \times 3 = 21$, which is odd, but it must equal $2m$. So no such party exists.

### Degree sequences
If you list all the degrees, usually from largest to smallest, you get the **degree sequence**. For the friendship graph it is $(3, 2, 2, 2, 1)$. Not every list of numbers is a degree sequence. A list is called **graphical** if some simple graph has exactly those degrees. Two quick tests rule many lists out: the sum must be even, and in a simple graph on $n$ vertices no degree can exceed $n - 1$ (you can be adjacent to at most every other vertex). For example $(4, 4, 1, 1)$ fails the second test: with 4 vertices the largest possible degree is 3. A full test (the Havel–Hakimi algorithm) appears in the worked examples.

We also name the extremes: $\Delta(G)$ is the **maximum degree** and $\delta(G)$ is the **minimum degree**. Since the average degree is $\frac{2m}{n}$, we always have $\delta \le \frac{2m}{n} \le \Delta$.

### A gallery of special graphs
A few graphs appear so often that they have names.

The **complete graph** $K_n$ has every possible edge. Each vertex is adjacent to the other $n - 1$, so every degree is $n - 1$. Handshake check: $n(n-1) = 2m$, so $m = \frac{n(n-1)}{2}$, matching the previous lesson.

The **cycle** $C_n$ (for $n \ge 3$) is $n$ vertices arranged in a ring, each joined to the next and the last joined back to the first. Every degree is 2 and $m = n$.

The **path** $P_n$ is $n$ vertices in a line. The two ends have degree 1 and the inside vertices have degree 2, so the degree sum is $2 + 2(n-2) = 2n - 2$ and $m = n - 1$.

A graph where every vertex has the same degree $k$ is called **$k$-regular**. $K_n$ is $(n-1)$-regular and $C_n$ is 2-regular. The famous **Petersen graph** is 3-regular with 10 vertices. For a $k$-regular graph the handshake lemma gives $nk = 2m$, so $m = \frac{nk}{2}$, and $nk$ must be even.

@fig g10-graph-lab graph=petersen mode=degree | The Petersen graph: 10 vertices, every degree is 3, so it has 15 edges.

### Degrees in directed graphs
In a directed graph each vertex has an **in-degree** (arrows coming in) and an **out-degree** (arrows going out). Each arrow adds 1 to exactly one out-degree and 1 to exactly one in-degree, so
$$\sum_v \deg^-(v) = \sum_v \deg^+(v) = m.$$
On Twitter-style networks, your in-degree is your follower count and your out-degree is how many accounts you follow.

### Common mistakes
Students often forget the factor of 2 and write $\sum \deg(v) = m$. Remember the handshake: two hands per shake. Another mistake is assuming a list with an even sum must be graphical; $(3, 3, 0, 0)$ has an even sum but two vertices cannot each have 3 neighbours when only one other vertex is available to them. Finally, in multigraphs a loop adds 2 to the degree of its vertex, not 1, which keeps the handshake lemma true.

### Summary
The degree of a vertex is how many edges touch it. Adding all degrees counts every edge twice, so $\sum \deg(v) = 2m$, and consequently the number of odd-degree vertices is even. Degree sequences summarise a graph, but not every list is achievable. Regular graphs, complete graphs, cycles and paths have simple degree patterns that make edge counts immediate.

@viz g10-graph-lab graph=envelope mode=degree | The readout checks the handshake lemma live. Odd-degree vertices are ringed.

:::explore
**What to try**
1. With the `envelope` graph, check the readout: the degree sum equals twice the edge count.
2. Switch to "Edit edges" and add an edge between vertices 0 and 4. Watch two degrees change by 1 each and the sum change by 2.
3. Try to make the number of ringed (odd) vertices equal to 1 or 3. You cannot: every edge change flips the parity of exactly two vertices.
4. Load `petersen`, `cube` and `c6` and read off their degree sequences. Which ones are regular?

**What to notice:** every edge you add or delete changes the degree sum by exactly 2. That is the handshake lemma in action, and it is also why odd vertices always come in pairs.
:::

:::formulas
$$\sum_{v\in V}\deg(v) = 2m \qquad \text{(handshake lemma)}$$
$$\#\{v : \deg(v) \text{ odd}\} \text{ is even}$$
$$\delta(G) \le \frac{2m}{n} \le \Delta(G)$$
$$k\text{-regular: } m = \frac{nk}{2}; \quad K_n: m = \frac{n(n-1)}2; \quad C_n: m = n; \quad P_n: m = n-1$$
$$\text{directed: } \sum_v \deg^+(v) = \sum_v \deg^-(v) = m$$
:::

:::thm Handshake lemma
In every graph, $\sum_{v \in V} \deg(v) = 2|E|$. Hence every graph has an even number of vertices of odd degree.
:::

:::proof
Count the pairs $(v, e)$ with $v$ an endpoint of edge $e$. Grouping by vertex gives $\sum_v \deg(v)$. Grouping by edge gives exactly 2 per edge, so $2|E|$. For the corollary, write the sum as (sum of odd degrees) + (sum of even degrees). The total and the even part are even, so the odd part is even, which requires an even number of odd terms.
:::

:::steps Is $(3, 3, 2, 2, 2)$ a degree sequence? (Havel–Hakimi)
1. The sum is $12$, which is even, and no entry exceeds $n - 1 = 4$. Keep going.
2. Remove the first entry (3) and subtract 1 from the next 3 entries: $(3, 2, 2, 2) \to (2, 1, 1, 2)$. Re-sort: $(2, 2, 1, 1)$.
3. Remove 2 and subtract 1 from the next 2: $(2, 1, 1) \to (1, 0, 1)$. Re-sort: $(1, 1, 0)$.
4. Remove 1 and subtract 1 from the next 1: $(1, 0) \to (0, 0)$. All zeros, so the original list is graphical.
5. A graph realising it: a 5-cycle $1\text{-}2\text{-}3\text{-}4\text{-}5\text{-}1$ plus the chord $1\text{-}3$, giving degrees $3,2,3,2,2$.
:::

:::steps A 4-regular graph has 15 vertices. How many edges?
1. Handshake: sum of degrees $= 15 \times 4 = 60$.
2. $2m = 60$, so $m = 30$.
3. Sanity check: a 3-regular graph on 15 vertices would need $15 \times 3 = 45 = 2m$, which is odd, so it cannot exist.
:::

:::mock Exam question
A graph has 9 vertices. Four of them have degree 3, three have degree 4 and the rest have degree 2. (a) How many edges does it have? (b) Could one more vertex of degree 1 be added to it (by joining it to an existing vertex) without anything else changing? Explain.
:::solution
(a) The remaining $9 - 4 - 3 = 2$ vertices have degree 2. Sum $= 4(3) + 3(4) + 2(2) = 12 + 12 + 4 = 28 = 2m$, so $m = 14$. (b) No. Joining a new leaf to an existing vertex also raises that vertex's degree by 1, so "nothing else changing" is impossible: one edge always changes two degrees. (The sum would go from 28 to 30, still even.)
:::
:::

:::cs
Degree is the first thing computed in network analysis. "Degree centrality" ranks users, servers or airports by how many direct connections they have, and the degree distribution of the web or a social network (very heavy-tailed: a few hubs with enormous degree) drives how caches, load balancers and crawlers are designed.
:::

:::ml
In graph neural networks the degree matrix $D = \mathrm{diag}(\deg(v_1), \dots, \deg(v_n))$ normalises messages: the common GCN layer uses $D^{-1/2} A D^{-1/2}$ so that high-degree nodes do not overwhelm their neighbours. Node degree is also one of the simplest and most useful node features.
:::

:::real
Airline route maps are graphs where airports are vertices. Hub airports like Dubai or Atlanta have huge degree. By the handshake lemma, if you add up the number of routes listed at every airport you get exactly twice the number of routes, since each route is listed at both ends.
:::

:::quiz
? A graph has degree sequence $(4, 3, 3, 2, 2)$. How many edges does it have?
= 7
> The degree sum is $14 = 2m$, so $m = 7$.

? Can a graph have exactly 5 vertices of odd degree?
- Yes
+ No
> The number of odd-degree vertices is always even.

? How many edges does a 3-regular graph on 12 vertices have?
= 18
> $m = \frac{nk}2 = \frac{12\cdot3}2 = 18$.

? What is every vertex's degree in $K_7$?
= 6
> Each vertex is adjacent to all $n - 1 = 6$ others.

? Which list can NOT be the degree sequence of a simple graph?
- $(2, 2, 2)$
- $(1, 1, 1, 1)$
+ $(3, 1, 1)$
- $(2, 1, 1)$
> With only 3 vertices, no vertex can have degree 3: the maximum is $n - 1 = 2$.

? In a directed graph with 20 arrows, what is the sum of all in-degrees?
= 20
> Each arrow contributes exactly 1 to some in-degree.
:::

## Lesson: Walks, paths, cycles and connectivity {#paths-connectivity}
@summary: Moving around a graph: walks, trails, paths and cycles, distance, connected components, bridges and cut vertices, and counting walks with powers of the adjacency matrix.

### Getting from here to there
The reason we draw graphs is usually to travel on them. A delivery driver wants to get from the depot to a customer. A rumour spreads from one friend to the next. A data packet hops from router to router across the internet. All of these are journeys along edges, and graph theory has precise words for different kinds of journeys. Getting those words right matters, because many theorems are true for one kind of journey and false for another.

### Imagine walking around a town
Imagine a small town drawn as a graph: junctions are vertices, streets are edges. You leave your house and wander: house, bakery, park, bakery, school. That sequence is a **walk**. You are allowed to revisit places and even walk the same street twice. A walk is simply a sequence of vertices where each consecutive pair is joined by an edge. Its **length** is the number of edges used, so house, bakery, park, bakery, school has length 4.

Now add restrictions. If you never walk down the same street twice (but you may pass through the same junction again) the walk is a **trail**. If you never visit the same junction twice, it is a **path**. A path is the most efficient kind of journey, because it never comes back on itself. Every path is a trail and every trail is a walk, but not the other way round.

A walk that ends where it started is **closed**. A closed trail with at least one edge is a **circuit**, and a closed walk that repeats no vertex except the start/end (and has length at least 3 in a simple graph) is a **cycle**. In the town, house, bakery, park, house would be a cycle of length 3, also called a triangle.

:::def Path
A walk $v_0, v_1, \dots, v_k$ in which all vertices are distinct. Its length is $k$, the number of edges.
:::

:::def Cycle
A closed walk $v_0, v_1, \dots, v_k = v_0$ with $k \ge 3$ in which $v_0, \dots, v_{k-1}$ are all distinct.
:::

### Walks always contain paths
Here is a small but very useful fact: if there is any walk from $u$ to $v$, there is a path from $u$ to $v$. The idea is to cut out detours. Suppose the walk visits some vertex $x$ twice: $u, \dots, x, \dots, x, \dots, v$. Delete everything between the two visits to $x$. The result is still a walk from $u$ to $v$, but shorter. Repeat until no vertex repeats, and you have a path. This is why, when we ask "can I get from $u$ to $v$?", it does not matter whether we mean walk or path.

### Distance
The **distance** $d(u, v)$ is the length of a shortest path from $u$ to $v$. If no path exists we say $d(u,v) = \infty$. Distance behaves like distance on a map: $d(u,u) = 0$, $d(u,v) = d(v,u)$ in an undirected graph, and the **triangle inequality** holds: $d(u,w) \le d(u,v) + d(v,w)$, because you can always reach $w$ by going through $v$. The largest distance between any two vertices is the **diameter** of the graph. Facebook measured its friendship graph and found the average distance between two users was about 4.7, the famous "six degrees of separation".

### Connected graphs and components
A graph is **connected** if every pair of vertices has a path between them. If not, the graph falls into separate pieces. Being joined by a path is an equivalence relation (reflexive, symmetric, transitive), so the vertices split into equivalence classes called **connected components**. Each component is a maximal connected piece: you can travel freely inside it but never leave it.

How few edges can a connected graph have? Think of building the graph by adding edges one at a time to $n$ isolated vertices. At the start there are $n$ components. Each new edge can join at most two components into one, so it reduces the count by at most 1. To get down to 1 component you need at least $n - 1$ edges. So **a connected graph on $n$ vertices has at least $n - 1$ edges**. A path $P_n$ shows this is the best possible. More generally, a graph with $n$ vertices, $m$ edges and $c$ components satisfies $m \ge n - c$.

### Weak spots: bridges and cut vertices
Some edges are more important than others. A **bridge** is an edge whose removal increases the number of components. A **cut vertex** (or articulation point) is a vertex whose removal, together with its edges, increases the number of components. In a computer network these are single points of failure: if that one cable or that one router dies, part of the network is cut off.

There is a neat characterisation: an edge is a bridge exactly when it lies on no cycle. If an edge $uv$ is on a cycle, then after deleting it you can still get from $u$ to $v$ the long way around the cycle, so nothing disconnects. If it is on no cycle, there is no other route, so deleting it separates $u$ from $v$.

@fig g10-graph-lab graph=bridges mode=components | Two triangles joined by a bridge, plus a pendant edge. Red dashed edges are bridges; ringed vertices are cut vertices.

### Counting walks with matrix powers
The adjacency matrix has a beautiful hidden property. The entry $(A^2)_{ij} = \sum_k A_{ik}A_{kj}$ adds 1 for every middle vertex $k$ that is adjacent to both $i$ and $j$. That is exactly the number of walks of length 2 from $i$ to $j$. The same argument repeated shows that $(A^k)_{ij}$ counts walks of length $k$ from $i$ to $j$. For example, on the diagonal, $(A^2)_{ii} = \deg(i)$, because a walk of length 2 from $i$ back to $i$ goes out along an edge and straight back. And $(A^3)_{ii}$ is twice the number of triangles containing $i$ (each triangle can be walked in two directions). So $d(i,j)$ is the smallest $k$ with $(A^k)_{ij} > 0$.

### Common mistakes
Do not confuse path and walk: "the number of paths of length 3" and "the number of walks of length 3" are different numbers, and only walks are counted by $A^3$. Remember the length of a path counts edges, not vertices: a path through 4 vertices has length 3. Finally, a graph with $n - 1$ edges need not be connected (a triangle plus an isolated vertex has 3 edges and 4 vertices); the theorem only says connected graphs need at least that many.

### Summary
Walks may repeat anything, trails may not repeat edges, and paths may not repeat vertices. Any walk can be shortened to a path. Distance is the length of a shortest path and obeys the triangle inequality. Connectivity splits a graph into components, a connected graph needs at least $n-1$ edges, and bridges (edges on no cycle) and cut vertices are its weak points. Powers of the adjacency matrix count walks.

@viz g10-graph-lab graph=bridges mode=components | Edit the graph and watch bridges and cut vertices appear and disappear.

:::explore
**What to try**
1. With `bridges` loaded, read the bridges (2–3 and 5–6) and cut vertices (2, 3, 5).
2. Switch to "Edit edges" and add the edge 6–4. The pendant edge 5–6 is now on the cycle 4–5–6, so it stops being a bridge.
3. Add an edge 1–4. Now the edge 2–3 lies on a cycle too, and the graph has no bridges at all.
4. Change "Ask" to "Counting walks", set $k = 2$ and click vertex 3. The label on vertex 3 itself equals $\deg(3)$.

**What to notice:** a bridge disappears exactly when you create a second route around it, which is the "bridge = edge on no cycle" theorem. In walk mode, the diagonal entry of $A^2$ is always the degree, and the first $k$ that makes a label non-zero is the distance.
:::

:::formulas
$$\text{walk} \supseteq \text{trail} \supseteq \text{path}; \qquad \text{length} = \text{number of edges}$$
$$d(u,w) \le d(u,v) + d(v,w)$$
$$\text{connected} \Rightarrow m \ge n - 1; \qquad \text{in general } m \ge n - c$$
$$(A^k)_{ij} = \#\{\text{walks of length } k \text{ from } i \text{ to } j\}, \qquad (A^2)_{ii} = \deg(i), \qquad \operatorname{tr}(A^3) = 6 \cdot \#\text{triangles}$$
:::

:::thm Walks contain paths
If a graph has a walk from $u$ to $v$, then it has a path from $u$ to $v$, of length at most the walk's length.
:::

:::proof
Take a shortest walk $W$ from $u$ to $v$. If some vertex $x$ appeared twice in $W$, deleting the closed section between the two copies of $x$ would give a strictly shorter walk from $u$ to $v$, contradicting minimality. So no vertex repeats and $W$ is a path.
:::

:::thm Bridges
An edge $e$ of a graph is a bridge if and only if $e$ lies on no cycle.
:::

:::proof
Let $e = uv$. If $e$ lies on a cycle, the rest of the cycle is a $u$–$v$ path avoiding $e$, so any walk using $e$ can be rerouted and removing $e$ disconnects nothing. Conversely, if removing $e$ leaves $u$ and $v$ connected by some path $Q$, then $Q$ plus $e$ is a cycle through $e$. So $e$ is not a bridge exactly when it lies on a cycle.
:::

:::thm Walk counting
For every $k \ge 1$, $(A^k)_{ij}$ equals the number of walks of length $k$ from $i$ to $j$.
:::

:::proof
Induction on $k$. For $k = 1$ it is the definition of $A$. If it holds for $k$, then $(A^{k+1})_{ij} = \sum_t (A^k)_{it} A_{tj}$. Each walk of length $k+1$ from $i$ to $j$ is a walk of length $k$ from $i$ to some $t$ followed by an edge $tj$, and the sum counts exactly these.
:::

:::steps Count walks of length 2 and 3 in the triangle $K_3$
1. $A = \begin{pmatrix}0&1&1\\1&0&1\\1&1&0\end{pmatrix}$.
2. $A^2 = \begin{pmatrix}2&1&1\\1&2&1\\1&1&2\end{pmatrix}$: the diagonal is each degree (2), and there is 1 walk of length 2 between different vertices (through the third vertex).
3. $A^3 = A^2 A = \begin{pmatrix}2&3&3\\3&2&3\\3&3&2\end{pmatrix}$. The diagonal 2 counts the triangle walked in two directions.
4. Check: $\operatorname{tr}(A^3) = 6 = 6 \times 1$ triangle.
:::

:::steps A graph has 12 vertices, 15 edges and 4 components. What is the smallest number of extra edges that makes it connected?
1. Each new edge can merge at most two components.
2. Going from 4 components to 1 needs at least $4 - 1 = 3$ merges.
3. 3 edges suffice: join one vertex of component 1 to each of components 2, 3 and 4.
4. Answer: 3.
:::

:::mock Exam question
Let $G$ be the path $1 - 2 - 3 - 4$. (a) Write $A$. (b) Compute the number of walks of length 3 from vertex 1 to vertex 4, and from 1 to 2. (c) Which edges are bridges?
:::solution
(a) Rows: $[0,1,0,0], [1,0,1,0], [0,1,0,1], [0,0,1,0]$. (b) From 1 to 4, the only walk of length 3 is $1,2,3,4$, so 1. From 1 to 2: walks $1,2,1,2$ and $1,2,3,2$, so 2. (You can check with $(A^3)_{14} = 1$, $(A^3)_{12} = 2$.) (c) Every edge is a bridge, because a path has no cycles.
:::
:::

:::cs
Finding connected components is a basic step in image processing (labelling blobs of pixels), in garbage collection (which objects are reachable from the program's roots), and in network reliability. Tarjan's algorithm finds all bridges and cut vertices in $O(n + m)$ time using depth-first search.
:::

:::ml
Many graph features used in ML are walk counts: $\operatorname{tr}(A^3)/6$ counts triangles, a key measure of how clustered a social network is. Graph neural networks with $k$ layers combine information from walks of length up to $k$, which is why a 2-layer GNN can only "see" a vertex's 2-hop neighbourhood.
:::

:::real
Power grids and airline networks are analysed for bridges and cut vertices: a substation that is a cut vertex is a single point of failure for every town on the far side. Engineers add redundant lines precisely to put every important edge on a cycle.
:::

:::quiz
? Which journey may repeat vertices but not edges?
- a path
+ a trail
- a cycle
> Trails forbid repeated edges only. Paths forbid repeated vertices.

? A connected graph has 25 vertices. What is the smallest number of edges it can have?
= 24
> A connected graph needs at least $n - 1 = 24$ edges.

? An edge lies on a cycle. Can it be a bridge?
- Yes
+ No
> Bridges are exactly the edges on no cycle.

? In any graph, what does $(A^2)_{ii}$ equal?
- 0
+ $\deg(i)$
- the number of triangles at $i$
> A walk of length 2 from $i$ back to $i$ goes along an edge and returns, one for each neighbour.

? A path visits 7 vertices. What is its length?
= 6
> Length counts edges, and a path through 7 vertices uses 6 edges.
:::

# Unit: Trees and searching

## Lesson: Trees {#trees}
@summary: Connected graphs with no cycles: the many equivalent definitions, why a tree on n vertices has n − 1 edges, leaves, rooted and binary trees, and forests.

### The simplest connected graphs
Some graphs are connected but have no wasted edges at all. Take away any single edge and they fall apart. Add any single edge and a cycle appears. These graphs are called **trees**, and they are probably the most useful graphs in all of computer science. Your computer's folders form a tree. A family tree is (roughly) a tree. The way a sorting algorithm splits its work, the way a decision is made by a sequence of yes/no questions, the way a compiler represents `3 * (x + 2)`: trees, all of them.

### Imagine wiring up some villages
Imagine you must connect 6 villages with cables so that every village can reach every other one, and cable is expensive. You lay cables one at a time. If you ever lay a cable between two villages that can already reach each other, it is wasted, since it closes a loop and adds no new connectivity. A careful engineer never does that. When the network finally connects all 6 villages without a single loop, you will find you laid exactly 5 cables. Try it with any arrangement: it is always 5. That network is a tree, and "always $n - 1$ edges" is the central fact about trees.

:::def Tree
A tree is a connected graph with no cycles. A graph with no cycles (connected or not) is a **forest**; its components are trees.
:::

:::def Leaf
A vertex of degree 1 in a tree.
:::

### Why every tree has leaves
Every tree with at least 2 vertices has at least 2 leaves. Here is a slick argument. Take a longest path in the tree, $v_0, v_1, \dots, v_k$. Look at its end $v_0$. If $v_0$ had a neighbour other than $v_1$, either that neighbour is already on the path (which would create a cycle) or it is not (which would make a longer path). Both are impossible, so $\deg(v_0) = 1$. The same holds for $v_k$. So there are at least two leaves.

### Why a tree has exactly $n - 1$ edges
Leaves give an easy induction. A tree with 1 vertex has 0 edges. For a tree with $n \ge 2$ vertices, remove a leaf and its single edge. What remains is still connected (nothing passed *through* a leaf) and still has no cycles, so it is a tree on $n - 1$ vertices, which by induction has $n - 2$ edges. Put the leaf back: $n - 1$ edges.

Combined with the last lesson (connected needs at least $n - 1$ edges), this tells us trees are the *minimally connected* graphs. They are also *maximally acyclic*: adding any edge $uv$ creates exactly one cycle, formed by the edge plus the unique path between $u$ and $v$.

### Many ways to say "tree"
For a graph $G$ with $n$ vertices, the following are all equivalent. Any one of them can serve as the definition.
1. $G$ is connected and has no cycles.
2. $G$ is connected and has $n - 1$ edges.
3. $G$ has no cycles and has $n - 1$ edges.
4. Between any two vertices there is exactly one path.
5. $G$ is connected, and removing any edge disconnects it (every edge is a bridge).
6. $G$ has no cycles, and adding any edge creates exactly one cycle.

Statement 4 is the one people use most in practice. In a folder tree, there is exactly one way to get from the root folder to any file, which is why a file has a single, well-defined path like `/home/asha/notes.txt`.

### Rooted trees and their vocabulary
Often we pick one vertex as the **root** and hang the tree from it. Then every other vertex has a **parent** (the next vertex on its path to the root) and possibly **children**. Vertices with no children are leaves. The **depth** of a vertex is its distance from the root, and the **height** of the tree is the largest depth. Vertices sharing a parent are siblings, and everything below a vertex forms its **subtree**.

A **binary tree** is a rooted tree where each vertex has at most 2 children, called left and right. A binary tree of height $h$ has at most $1 + 2 + 4 + \dots + 2^h = 2^{h+1} - 1$ vertices, because the number of vertices can at most double at each level. Turning that around, a binary tree with $n$ vertices has height at least $\log_2(n+1) - 1$, which is roughly $\log_2 n$. This one inequality explains why balanced search trees, heaps and binary search all run in logarithmic time, and it is the key to the sorting lower bound in the algorithms course.

@fig g10-graph-lab graph=tree mode=degree | A tree on 8 vertices: 7 edges, and the leaves are the vertices of degree 1.

### Forests and counting trees
A forest with $n$ vertices and $c$ components (each a tree) has exactly $n - c$ edges, since each tree with $n_i$ vertices has $n_i - 1$ edges and the $n_i$ add up to $n$.

How many different trees can you build on $n$ labelled vertices? For $n = 3$ there are 3 (choose which vertex is in the middle). For $n = 4$ there are 16. The general answer is **Cayley's formula**: $n^{n-2}$. For $n = 4$, $4^2 = 16$. For $n = 5$, $5^3 = 125$. These are the possible spanning trees of the complete graph $K_n$, a topic we will return to.

### Common mistakes
A graph with $n - 1$ edges is not automatically a tree: you also need connectivity or acyclicity (a triangle plus an isolated vertex has 3 edges on 4 vertices). Height is counted in edges, not levels: a single root has height 0. And "binary tree" in CS usually means at most two children, not exactly two; a tree where every internal vertex has exactly two children is called a **full** binary tree.

### Summary
A tree is a connected acyclic graph. Trees with $n$ vertices have exactly $n - 1$ edges, at least two leaves (if $n \ge 2$), and a unique path between any two vertices. They are minimally connected and maximally acyclic. Rooted trees add parent/child structure, binary trees of height $h$ hold at most $2^{h+1} - 1$ vertices, forests with $c$ components have $n - c$ edges, and there are $n^{n-2}$ labelled trees on $n$ vertices.

@viz g10-graph-lab graph=tree mode=components | Add one edge to the tree and watch a cycle appear and every bridge on it disappear.

:::explore
**What to try**
1. With `tree` loaded and "Components, bridges, cut vertices" selected, notice every edge is a red dashed bridge. That is property 5.
2. Switch to "Edit edges" and add the edge 4–5. Exactly the edges on the cycle 4–1–0–2–5–4 stop being bridges.
3. Remove the edge 0–2 instead. The tree splits into a forest of 2 components with $8 - 2 = 6$ edges.
4. Switch "Ask" to "Degrees" and count the leaves (degree 1). There are always at least 2.

**What to notice:** in a tree every edge is essential, and one extra edge creates exactly one cycle. Deleting an edge from a tree always produces exactly two components.
:::

:::formulas
$$\text{tree on } n \text{ vertices: } m = n - 1; \qquad \text{forest with } c \text{ trees: } m = n - c$$
$$\text{binary tree of height } h: \; n \le 2^{h+1} - 1 \iff h \ge \log_2(n+1) - 1$$
$$\text{Cayley: } \#\{\text{labelled trees on } n \text{ vertices}\} = n^{n-2}$$
$$\text{leaves in a tree: } \#\text{leaves} = 2 + \sum_{\deg v \ge 3} (\deg v - 2)$$
:::

:::thm Edges of a tree
Every tree with $n$ vertices has exactly $n - 1$ edges.
:::

:::proof
Induction on $n$. For $n = 1$ there are 0 edges. For $n \ge 2$, a longest path ends at a leaf $\ell$ (as shown in the article). Deleting $\ell$ and its edge leaves a connected acyclic graph on $n - 1$ vertices, which by induction has $n - 2$ edges. So the original has $n - 1$.
:::

:::thm Unique paths
A graph is a tree if and only if every pair of vertices is joined by exactly one path.
:::

:::proof
If two different $u$–$v$ paths existed in a tree, follow them from $u$ until they first split, and then until they first meet again; the two pieces between those points form a cycle, a contradiction. Conversely, if every pair has exactly one path the graph is connected, and a cycle would give two different paths between any two of its vertices, so there is no cycle.
:::

:::steps A tree has 4 vertices of degree 3, 2 vertices of degree 2, and the rest are leaves. How many leaves?
1. Let $L$ be the number of leaves. Then $n = 4 + 2 + L = 6 + L$ and $m = n - 1 = 5 + L$.
2. Handshake: $4(3) + 2(2) + L(1) = 2m = 10 + 2L$.
3. $16 + L = 10 + 2L$, so $L = 6$.
4. Check with the leaf formula: $2 + 4 \times (3 - 2) = 6$.
:::

:::steps What is the minimum height of a binary tree with 100 vertices?
1. Height $h$ allows at most $2^{h+1} - 1$ vertices.
2. $h = 5$: $2^6 - 1 = 63 < 100$. Not enough.
3. $h = 6$: $2^7 - 1 = 127 \ge 100$. Enough.
4. So the minimum height is 6, and a balanced tree achieves it.
:::

:::mock Exam question
(a) A forest has 40 vertices and 33 edges. How many trees does it contain? (b) Prove that adding one edge to a tree creates exactly one cycle.
:::solution
(a) $m = n - c$, so $33 = 40 - c$ and $c = 7$. (b) Add edge $uv$. Any cycle in the new graph must use $uv$ (the tree itself has none), and removing $uv$ from such a cycle leaves a $u$–$v$ path in the tree. There is exactly one such path, so there is exactly one cycle: the unique path plus the new edge.
:::
:::

:::cs
File systems, the HTML DOM, syntax trees in compilers, binary search trees, heaps, tries and B-trees in databases are all rooted trees. The bound $h \ge \log_2(n+1) - 1$ is why a balanced tree holding a billion keys needs only about 30 levels.
:::

:::ml
Decision trees, random forests and gradient-boosted trees (XGBoost, LightGBM) are literally rooted trees: each internal vertex asks a yes/no question about a feature and each leaf holds a prediction. Hierarchical clustering produces a tree of merges called a dendrogram.
:::

:::real
A knockout tournament with 64 players is a binary tree: each match is an internal vertex and each player is a leaf. Since every match eliminates exactly one player, there are always $64 - 1 = 63$ matches, the same "$n - 1$" count as the edges of a tree.
:::

:::quiz
? A tree has 30 vertices. How many edges does it have?
= 29
> Every tree has $n - 1$ edges.

? A connected graph has 10 vertices and 9 edges. Must it be a tree?
+ Yes
- No
> Connected with $n - 1$ edges is one of the equivalent definitions of a tree.

? How many labelled trees are there on 5 vertices?
= 125
> Cayley's formula: $5^{5-2} = 125$.

? A forest has 20 vertices and 4 components. How many edges?
= 16
> $m = n - c = 20 - 4 = 16$.

? What is the maximum number of vertices in a binary tree of height 3?
= 15
> $2^{3+1} - 1 = 15$.

? Removing one edge from a tree produces how many components?
- 1
+ 2
- it depends
> Every edge of a tree is a bridge, and removing a single bridge splits one component into exactly two.
:::

## Lesson: Breadth-first and depth-first search {#bfs-dfs}
@summary: The two fundamental ways to explore a graph: BFS with a queue (layers, shortest unweighted paths) and DFS with a stack (deep dives, cycles, components), both in O(n + m) time.

### Why we need a systematic way to explore
Suppose you are dropped into a maze, or a computer is handed a social network with a billion users, and the question is "what can I reach from here?". Wandering randomly might work eventually, but it can miss things and it can loop forever. We need a method that visits every reachable vertex exactly once and never gets lost. There are two classic methods, and nearly every graph algorithm you will ever meet is built on top of one of them: **breadth-first search** (BFS) and **depth-first search** (DFS).

Both methods share one idea: keep a record of which vertices you have already **discovered**, and never process a vertex twice. They differ only in the *order* in which they process the vertices they have discovered but not yet explored, which we call the **frontier**.

### Imagine ripples on a pond
Drop a stone in a pond and ripples spread out in rings. First the water right next to the stone moves, then the ring just outside that, then the next ring. BFS explores a graph the same way. It starts at a source vertex $s$, then visits all neighbours of $s$ (distance 1), then all their undiscovered neighbours (distance 2), and so on, layer by layer.

To get this ring-by-ring order, BFS keeps the frontier in a **queue**: first in, first out, like a line at a ticket counter. The algorithm is short:
1. Mark $s$ discovered, set $d(s) = 0$, and put $s$ in the queue.
2. While the queue is not empty, remove the vertex $u$ at the front.
3. For each neighbour $v$ of $u$ that is not yet discovered, mark it, set $d(v) = d(u) + 1$, record $u$ as its **parent**, and add $v$ to the back of the queue.

Let us run it on a small graph. Vertices 0 to 4, edges $01, 02, 13, 23, 34$. Start at 0. Queue: [0]. Remove 0, discover 1 and 2 at distance 1. Queue: [1, 2]. Remove 1, discover 3 at distance 2 (2 is already discovered). Queue: [2, 3]. Remove 2: its neighbours 0 and 3 are both discovered. Queue: [3]. Remove 3, discover 4 at distance 3. Remove 4. Done. The order of visits was 0, 1, 2, 3, 4, and the distances 0, 1, 1, 2, 3 are exactly the shortest-path distances.

### Why BFS finds shortest paths
That last claim is the most important property of BFS: in an unweighted graph, the value $d(v)$ it computes is the true distance from $s$. The reason is the queue. Vertices enter the queue in order of non-decreasing $d$ value: first all of layer 0, then all of layer 1, then layer 2. A vertex at true distance $k$ has a neighbour at distance $k - 1$, which gets processed before any vertex of layer $k$ or beyond, and that neighbour discovers it with $d = k$. It cannot be discovered earlier with a smaller value, because nothing at distance less than $k - 1$ is adjacent to it. Following the parent pointers backwards from $v$ traces an actual shortest path. The parent edges together form the **BFS tree**.

### Imagine exploring a cave
Now imagine exploring a cave with a ball of string. You follow one tunnel as deep as it goes. When you hit a dead end, you walk back along your string to the most recent junction with an unexplored tunnel, and dive down that one. This is **depth-first search**. DFS keeps the frontier on a **stack** (last in, first out), or more naturally uses recursion, where the computer's call stack plays the role of the string:

1. Mark $u$ as discovered.
2. For each neighbour $v$ of $u$: if $v$ is not discovered, record $u$ as its parent and run DFS from $v$.

On the same graph from 0 (neighbours in increasing order): visit 0, go to 1, from 1 go to 3, from 3 go to 2 (2 is undiscovered), 2's neighbours are all discovered so back up to 3, go to 4, back up all the way. Visit order: 0, 1, 3, 2, 4. Notice DFS reached 2 through a long route; DFS does **not** find shortest paths.

### What DFS is good for
DFS is good at questions about structure. In an undirected graph, if DFS ever looks along an edge to an already-discovered vertex that is not its parent, it has found a **cycle**. Running DFS (or BFS) from each undiscovered vertex in turn labels the **connected components**. On directed graphs, the order in which DFS *finishes* vertices gives a topological sort, and DFS is the engine of Tarjan's algorithms for bridges, cut vertices and strongly connected components.

@fig graph graph=tree alg=dfs | DFS on a tree: it dives down the leftmost branch first, then backs up.

### How fast are they?
Each vertex is added to the queue or stack at most once, because we mark it when it is discovered. When a vertex is processed we scan its adjacency list once. The total length of all adjacency lists is $2m$ (the handshake lemma again). So both BFS and DFS do $O(n + m)$ work with adjacency lists. That is **linear time**: proportional to the size of the input, which is as fast as you can hope for, since you must at least read the graph. With an adjacency matrix, scanning a vertex's neighbours costs $n$, so the total becomes $O(n^2)$.

### Common mistakes
The classic BFS bug is marking a vertex as visited when it is *removed* from the queue rather than when it is *added*. Then the same vertex can be added many times, wasting time and sometimes breaking the distance labels. Another mistake is using BFS distances on a weighted graph: BFS counts edges, not total weight, so it is wrong as soon as edges have different lengths (that is Dijkstra's job, next lesson). Finally, a single BFS or DFS only reaches the source's component; to cover a disconnected graph, restart from every undiscovered vertex.

### Summary
BFS explores in layers using a queue and computes shortest-path distances in unweighted graphs, with parent pointers forming a shortest-path tree. DFS dives deep using a stack or recursion and reveals structure: cycles, components, and orderings. Both run in $O(n + m)$ time with adjacency lists because each vertex is handled once and each edge is looked at twice.

@viz graph graph=sample alg=bfs | Press Play for BFS, then switch to DFS and compare the visit orders.

:::explore
**What to try**
1. Run BFS from vertex 0. The pink numbers above vertices are BFS distances: vertices 1 and 2 get 1, vertices 3 and 5 get 2, vertices 4 and 6 get 3.
2. Read the queue in the readout at each step. New vertices always join at the back.
3. Switch to DFS and play again. The visit order changes, and DFS goes deep along one branch before returning.
4. Click a different vertex to make it the source and rerun both searches.

**What to notice:** BFS finishes everything at distance 1 before touching anything at distance 2, which is exactly the "ripples" picture and the reason BFS distances are correct. DFS's order depends on which neighbour it tries first, and it can reach a vertex by a long route.
:::

:::formulas
$$\text{BFS: } d(v) = d(\text{parent}(v)) + 1, \quad d(s) = 0$$
$$\text{time with adjacency lists: } O(n) + O\Big(\sum_v \deg v\Big) = O(n + 2m) = O(n + m)$$
$$\text{time with adjacency matrix: } O(n^2)$$
:::

:::thm BFS computes distances
In an unweighted graph, BFS from $s$ sets $d(v) = \operatorname{dist}(s, v)$ for every vertex $v$ reachable from $s$, and the parent pointers give a shortest path from $s$ to each $v$.
:::

:::proof
First, $d(v) \ge \operatorname{dist}(s,v)$ always, since $d(v)$ is the length of a real path (the chain of parents). Next, BFS removes vertices from the queue in non-decreasing order of $d$. Suppose some $v$ has $d(v) > \operatorname{dist}(s,v) = k$, and take such a $v$ with smallest $k$. Let $u$ be the previous vertex on a shortest path, so $\operatorname{dist}(s,u) = k-1$ and $d(u) = k-1$ by minimality. When $u$ was removed from the queue, $v$ was either undiscovered (then it gets $d(v) = k$) or already discovered by a vertex removed no later than $u$, with $d$ value at most $k - 1$, giving $d(v) \le k$. Either way $d(v) \le k$, a contradiction.
:::

:::steps Run BFS from A on edges $AB, AC, BD, CD, CE, DF, EF$
1. Queue [A], $d(A) = 0$. Remove A: discover B, C with $d = 1$. Queue [B, C].
2. Remove B: discover D with $d = 2$. Queue [C, D].
3. Remove C: D is already discovered; discover E with $d = 2$. Queue [D, E].
4. Remove D: discover F with $d = 3$. Queue [E, F]. Remove E (F already found), remove F.
5. Distances: A 0, B 1, C 1, D 2, E 2, F 3. Shortest path to F via parents: F ← D ← B ← A.
:::

:::steps Use DFS to count the components of a graph with vertices 1–7 and edges $12, 23, 45, 67$
1. Start DFS at 1: reach 2, then 3. Component 1 = {1, 2, 3}.
2. Next undiscovered vertex is 4: reach 5. Component 2 = {4, 5}.
3. Next undiscovered is 6: reach 7. Component 3 = {6, 7}.
4. Answer: 3 components, found in $O(n + m)$ total time.
:::

:::mock Exam question
A graph has 1000 vertices and 4000 edges, stored as adjacency lists. (a) Roughly how many adjacency-list entries does BFS scan in total? (b) If the graph were stored as an adjacency matrix, roughly how many entries would BFS scan? (c) Which search would you use to find the fewest flights between two cities, and why?
:::solution
(a) Each edge appears twice, so $2m = 8000$ entries, plus $n = 1000$ vertex operations, about 9000 steps. (b) Each of the 1000 processed vertices scans a full row of 1000 entries: $10^6$ entries. (c) BFS, because "fewest flights" is an unweighted shortest path (count of edges), which BFS computes exactly; DFS may find a much longer route.
:::
:::

:::cs
Web crawlers explore the web graph breadth-first from seed pages. Garbage collectors use DFS or BFS from the program's roots to find live objects. Puzzle solvers (Rubik's cube, sliding puzzles) use BFS to find solutions with the fewest moves, and maze generators use randomised DFS.
:::

:::ml
GraphSAGE and other GNNs sample a node's neighbourhood with a BFS-like expansion (1-hop, then 2-hop). Node2vec builds node embeddings from random walks that are deliberately biased to behave either more like BFS (exploring locally) or more like DFS (exploring far away).
:::

:::real
"How many degrees of separation are there between you and a famous actor?" is a BFS question. The "Six Degrees of Kevin Bacon" game runs BFS on the graph of actors joined by shared films.
:::

:::quiz
? Which data structure does BFS use for its frontier?
+ a queue
- a stack
- a priority queue
> First in, first out gives the layer-by-layer order.

? On an unweighted graph, which search guarantees shortest paths from the source?
+ BFS
- DFS
- both
> BFS processes vertices in order of distance. DFS may reach a vertex by a long route.

? With adjacency lists, BFS on a graph with 50 vertices and 200 edges does work proportional to about:
- $50^2$
+ $50 + 200$
- $50 \times 200$
> BFS is $O(n + m)$.

? In undirected DFS, you look along an edge and find an already discovered vertex that is not your parent. What have you found?
- a bridge
+ a cycle
- a leaf
> The tree path between the two vertices plus this edge forms a cycle.

? BFS from $s$ reaches $v$ with $d(v) = 4$. How many edges are on a shortest $s$–$v$ path?
= 4
> BFS distances are exact shortest-path lengths in unweighted graphs.
:::

## Lesson: Shortest paths with weights {#shortest-paths}
@summary: Dijkstra's algorithm, why greedy finalisation works for non-negative weights, relaxation, Bellman–Ford for negative edges, and all-pairs shortest paths.

### When edges have lengths
BFS counts edges. But real journeys have lengths: a 2 km road and a 40 km road are not the same. Flights have prices. Network links have delays. Once edges carry **weights**, the shortest path is the one whose *total weight* is smallest, and that may use more edges. A route with three 5-minute hops (15 minutes) beats a single 40-minute hop. We need a new algorithm.

:::def Weighted distance
In a graph with edge weights $w(u,v)$, the length of a path is the sum of its edge weights, and $\operatorname{dist}(s, v)$ is the minimum length over all $s$–$v$ paths.
:::

### Imagine water flowing through pipes
Imagine pouring water into the source vertex of a network of pipes, where each pipe takes $w$ seconds to traverse. Water spreads outward, and the moment water first reaches a vertex is exactly its shortest distance from the source. Water reaches the closest vertex first, then the next closest, and so on. Dijkstra's algorithm simulates this: it settles vertices in order of their distance from the source.

### Relaxation: the basic move
Every shortest-path algorithm keeps a tentative distance $d(v)$ for each vertex, starting at $d(s) = 0$ and $d(v) = \infty$ otherwise. The basic operation is **relaxing** an edge $(u, v)$: if going through $u$ gives a shorter route, update.
$$\text{if } d(u) + w(u,v) < d(v): \quad d(v) \leftarrow d(u) + w(u,v), \;\; \text{parent}(v) \leftarrow u$$
Relaxation never makes $d(v)$ wrong in the dangerous direction: $d(v)$ is always the length of some real path, so it is always at least the true distance. The algorithms differ in which edges they relax and in what order.

### Dijkstra's algorithm
Dijkstra's algorithm works when all weights are non-negative.
1. Set $d(s) = 0$ and all other $d(v) = \infty$. Every vertex is unfinished.
2. Pick the unfinished vertex $u$ with the smallest $d(u)$ and mark it **finished**.
3. Relax every edge leaving $u$.
4. Repeat until every reachable vertex is finished.

A small example: vertices $s, a, b, t$ with edges $sa = 4$, $sb = 1$, $ba = 2$, $at = 1$, $bt = 5$. Start: $d = (s{:}0, a{:}\infty, b{:}\infty, t{:}\infty)$. Finish $s$, relax: $a = 4$, $b = 1$. Smallest unfinished is $b$ (1). Finish $b$, relax: $a = \min(4, 1 + 2) = 3$, $t = 1 + 5 = 6$. Finish $a$ (3), relax: $t = \min(6, 3 + 1) = 4$. Finish $t$ (4). The shortest path to $t$ is $s \to b \to a \to t$ with length 4, using three edges even though $s \to b \to t$ uses only two.

### Why the greedy choice is safe
Why can we declare the smallest tentative vertex finished forever? Suppose $u$ has the smallest $d(u)$ among unfinished vertices. Any other route to $u$ must leave the finished region at some unfinished vertex $x$, and $d(x) \ge d(u)$ already. Continuing from $x$ to $u$ only adds non-negative weights, so that route is at least $d(u)$. Nothing can beat $d(u)$. This argument is exactly where **non-negative weights** are needed: a negative edge later on could make a detour cheaper, and Dijkstra would have already finalised the wrong answer.

### Speed
With a **binary heap** (priority queue) holding the tentative distances, each "pick the smallest" costs $O(\log n)$ and each relaxation that lowers a distance costs $O(\log n)$. There are $n$ picks and at most $m$ successful relaxations, so Dijkstra runs in $O((n + m)\log n)$. With a plain array, picking the minimum costs $O(n)$ each time, giving $O(n^2)$, which is actually better for very dense graphs.

### Negative weights: Bellman–Ford
Negative weights do occur: in currency exchange, a "cost" can be a gain. **Bellman–Ford** handles them by brute patience: relax *every* edge, and repeat that $n - 1$ times. Why $n - 1$? A shortest path (with no cycles) has at most $n - 1$ edges, and after round $k$ every vertex whose shortest path uses at most $k$ edges has the correct distance. Total time $O(nm)$.

If a cycle has negative total weight, you could loop around it forever and make the "shortest" path as small as you like, so shortest distances are undefined. Bellman–Ford detects this: if a $n$-th round still improves some distance, a negative cycle exists.

### All pairs: Floyd–Warshall
To get distances between *every* pair, the **Floyd–Warshall** algorithm uses dynamic programming. Number the vertices $1$ to $n$ and let $d_k(i,j)$ be the shortest $i$–$j$ distance using only vertices $1..k$ as intermediate stops. Then
$$d_k(i,j) = \min\big(d_{k-1}(i,j),\; d_{k-1}(i,k) + d_{k-1}(k,j)\big),$$
because the best path either avoids $k$ or goes through it once. Three nested loops give $O(n^3)$.

@fig graph graph=sample alg=dijkstra | Dijkstra from vertex 0. Pink labels are the current tentative distances.

### Reading the answer: the shortest-path tree
Dijkstra gives you more than numbers. Every time a relaxation succeeds it records a parent, and when the algorithm ends each vertex's parent is the previous stop on one of its shortest routes. To recover the route to $t$, start at $t$ and follow parents back to $s$, then reverse the list. In the small example above, $t$'s parent is $a$, $a$'s parent is $b$ and $b$'s parent is $s$, giving $s \to b \to a \to t$. The parent edges of all vertices together form a tree rooted at $s$ called the **shortest-path tree**. It has a useful property: any piece of a shortest path is itself a shortest path. If the best route from $s$ to $t$ passes through $a$, then its first part must be a best route from $s$ to $a$, otherwise you could swap in a better first part and beat the best route. This "optimal substructure" is the reason all these algorithms can build long answers out of short ones, and it is the same idea that powers dynamic programming in the algorithms course.

### Common mistakes
Do not use Dijkstra with negative edges; it can return wrong answers without any warning. Do not confuse the shortest path with the path with fewest edges; that is BFS's question. And remember that a shortest-path tree is not a minimum spanning tree: the first minimises distances from one source, the second minimises total edge weight (next lesson).

### Summary
With weights, distance is minimum total weight. All algorithms work by relaxation. Dijkstra finalises vertices in order of distance and is correct for non-negative weights, running in $O((n+m)\log n)$ with a heap. Bellman–Ford handles negative weights in $O(nm)$ and detects negative cycles. Floyd–Warshall computes all pairs in $O(n^3)$.

@viz graph graph=sample alg=dijkstra | Step through Dijkstra and watch each vertex get finalised.

:::explore
**What to try**
1. Press Step repeatedly from source 0. The readout shows which vertex is finalised and the current distances.
2. Check vertex 1: it first gets distance 4 (direct edge) but improves to 3 via vertex 2 ($2 + 1$).
3. Note the final distances: 0, 3, 2, 8, 10, 12, 13 for vertices 0 to 6.
4. Click vertex 6 to make it the source and run again.

**What to notice:** vertices are finalised in increasing order of distance (0, 2, 1, 3, 4, 5, 6 from source 0), just like water reaching the nearest points first. A tentative distance can drop several times, but once a vertex is finalised it never changes.
:::

:::formulas
$$\text{relax}(u,v): \; d(v) \leftarrow \min\big(d(v),\; d(u) + w(u,v)\big)$$
$$\operatorname{dist}(s,v) = \min_{u:\,(u,v)\in E}\big(\operatorname{dist}(s,u) + w(u,v)\big) \quad \text{(Bellman equation)}$$
$$\text{Dijkstra (heap): } O((n+m)\log n); \quad \text{Bellman–Ford: } O(nm); \quad \text{Floyd–Warshall: } O(n^3)$$
$$d_k(i,j) = \min\big(d_{k-1}(i,j),\, d_{k-1}(i,k) + d_{k-1}(k,j)\big)$$
:::

:::thm Correctness of Dijkstra
If all edge weights are non-negative, then when Dijkstra's algorithm finalises a vertex $u$, $d(u) = \operatorname{dist}(s,u)$.
:::

:::proof
Suppose not, and let $u$ be the first vertex finalised with $d(u) > \operatorname{dist}(s,u)$. Take a true shortest path $P$ from $s$ to $u$ and let $y$ be the first unfinished vertex on it, with predecessor $x$ (finished, so $d(x)$ is correct). When $x$ was finished, edge $xy$ was relaxed, so $d(y) \le \operatorname{dist}(s,x) + w(x,y) = \operatorname{dist}(s,y) \le \operatorname{dist}(s,u)$, using non-negative weights for the last step. Hence $d(y) \le \operatorname{dist}(s,u) < d(u)$, so Dijkstra would have picked $y$ before $u$. Contradiction.
:::

:::steps Dijkstra from A: $AB = 7$, $AC = 9$, $AF = 14$, $BC = 10$, $BD = 15$, $CD = 11$, $CF = 2$, $DE = 6$, $EF = 9$
1. Finish A (0). Relax: B 7, C 9, F 14.
2. Finish B (7). Relax: C $\min(9, 17) = 9$, D 22.
3. Finish C (9). Relax: D $\min(22, 20) = 20$, F $\min(14, 11) = 11$.
4. Finish F (11). Relax: E $11 + 9 = 20$.
5. Finish D (20) and E (20; $20 + 6 = 26$ does not improve). Final: A 0, B 7, C 9, D 20, E 20, F 11.
:::

:::steps Why Dijkstra fails with a negative edge: $s \to a = 2$, $s \to b = 3$, $b \to a = -2$
1. Finish $s$. Tentative: $a = 2$, $b = 3$.
2. Finish $a$ with $d(a) = 2$ (smallest).
3. Finish $b$ (3) and relax $b \to a$: $3 - 2 = 1 < 2$. But $a$ is already finalised.
4. The true distance to $a$ is 1, so Dijkstra's answer 2 is wrong. Bellman–Ford would get 1.
:::

:::mock Exam question
A directed graph has edges $s\to a$ (5), $s \to b$ (2), $b \to a$ (1), $a \to t$ (3), $b \to t$ (7). (a) Run Dijkstra from $s$ and give $\operatorname{dist}(s,t)$ and the path. (b) How many rounds does Bellman–Ford need in the worst case here?
:::solution
(a) Finish $s$: $a = 5$, $b = 2$. Finish $b$ (2): $a = \min(5, 3) = 3$, $t = 9$. Finish $a$ (3): $t = \min(9, 6) = 6$. Finish $t$ (6). Path $s \to b \to a \to t$, length 6. (b) $n - 1 = 3$ rounds (4 vertices).
:::
:::

:::cs
GPS navigation, network routing protocols (OSPF uses Dijkstra; RIP uses Bellman–Ford style updates) and game AI pathfinding (A*, which is Dijkstra plus a distance-to-goal estimate) are shortest-path algorithms at their core.
:::

:::ml
The Bellman equation $\operatorname{dist}(v) = \min_u (\operatorname{dist}(u) + w(u,v))$ is the same equation that drives value iteration in reinforcement learning, where an agent learns the cheapest (or most rewarding) way to reach goals. Isomap and other manifold-learning methods compute shortest-path distances on a nearest-neighbour graph to estimate distances along curved data.
:::

:::real
Currency traders look for negative cycles: if converting rupees to dollars to euros and back to rupees gives more than you started with, then with weights $-\log(\text{rate})$ that loop has negative total weight. Bellman–Ford's negative-cycle check is an arbitrage detector.
:::

:::quiz
? Dijkstra's algorithm requires which condition?
- the graph is a tree
+ all edge weights are non-negative
- the graph is unweighted
> The greedy finalisation argument breaks when a later negative edge can shorten a path.

? Tentative distances are $d(u) = 4$, $d(v) = 9$, and $w(u,v) = 3$. After relaxing $(u,v)$, what is $d(v)$?
= 7
> $\min(9, 4 + 3) = 7$.

? How many rounds of relaxing every edge does Bellman–Ford need on a graph with 10 vertices?
= 9
> $n - 1$ rounds suffice because a shortest simple path has at most $n - 1$ edges.

? What does it mean if Bellman–Ford still improves a distance in round $n$?
+ there is a negative cycle reachable from the source
- the graph is disconnected
- Dijkstra would also fail to terminate
> Without a negative cycle, all distances are final after $n - 1$ rounds.

? What is the running time of Floyd–Warshall on $n$ vertices?
- $O(n^2)$
+ $O(n^3)$
- $O(n \log n)$
> Three nested loops over $k$, $i$, $j$.
:::

## Lesson: Minimum spanning trees {#spanning-trees}
@summary: Spanning trees connect every vertex with the fewest edges; a minimum spanning tree does it with the least total weight. The cut property explains why the greedy algorithms of Kruskal and Prim are correct.

### Connecting towns as cheaply as possible
A government wants to connect seven villages with fibre-optic cable. Laying cable between any two villages has a known cost, and every village must be able to reach every other one, directly or through other villages. Which cables should be laid to make the total cost as small as possible? You never want a cycle of cables, because one cable of the cycle could be removed and everything would still be connected, saving money. So the cheapest network is a **tree** that touches every village. This is the **minimum spanning tree** problem, one of the oldest problems in algorithms (it was first solved in 1926 for an electricity network in Moravia).

:::def Spanning tree
A spanning tree of a connected graph $G$ is a subgraph that includes every vertex of $G$ and is a tree. It has exactly $n - 1$ edges.
:::

:::def Minimum spanning tree (MST)
In a connected weighted graph, a minimum spanning tree is a spanning tree whose total edge weight is as small as possible.
:::

### Spanning trees exist and there are many of them
Every connected graph has a spanning tree. One way to see it: while the graph has a cycle, delete any edge of that cycle. Deleting a cycle edge never disconnects the graph, because the rest of the cycle still joins its two ends. When no cycles remain, what is left is connected and acyclic, which is a tree. Another way: the BFS tree or DFS tree from the last lessons is a spanning tree.

A graph usually has a huge number of spanning trees. A 4-cycle has 4 (remove any one of its 4 edges). The complete graph $K_n$ has $n^{n-2}$ by Cayley's formula, so $K_5$ already has 125. Checking them all is hopeless for big graphs, so we need a cleverer idea.

### The cut property
A **cut** splits the vertices into two non-empty groups $S$ and $V \setminus S$. An edge **crosses** the cut if it has one end in each group. Here is the key fact, called the **cut property**: for any cut, a lightest edge crossing it belongs to some minimum spanning tree (and if that lightest edge is unique, it belongs to every MST).

Why? Take any MST $T$. If it already contains the lightest crossing edge $e$, we are done. Otherwise, add $e$ to $T$. This creates exactly one cycle. That cycle goes from one side of the cut to the other along $e$, so it must come back across the cut by some other edge $f$ of $T$. Now remove $f$. We get a spanning tree again, and its weight is $w(T) + w(e) - w(f) \le w(T)$ because $e$ was the lightest crossing edge. So this new tree is also minimum, and it contains $e$. This "exchange argument" is the template for many greedy proofs.

### Kruskal's algorithm
Kruskal's idea is the most natural greedy strategy: sort all edges from lightest to heaviest, then go through them in order, adding an edge whenever it does not create a cycle with the edges already chosen. Stop when you have $n - 1$ edges.

Small example: vertices A, B, C, D with weights $AB = 1$, $BC = 2$, $AC = 3$, $CD = 4$, $BD = 5$. Take $AB$ (1). Take $BC$ (2). $AC$ (3) would close the cycle A–B–C, so skip it. Take $CD$ (4). We now have 3 edges for 4 vertices, so stop. MST weight $1 + 2 + 4 = 7$.

Each edge Kruskal accepts is the lightest edge crossing the cut between "the component containing one of its ends" and everything else, so the cut property says it is safe. To test "does this edge make a cycle?" quickly, Kruskal uses a **union–find** structure that tracks which component each vertex is in; the total time is $O(m \log m)$, dominated by sorting.

### Prim's algorithm
Prim's algorithm grows a single tree from a starting vertex. At each step it looks at all edges leaving the current tree and adds the lightest one, together with its new vertex. On the same example starting from A: edges leaving {A} are $AB = 1$, $AC = 3$; take $AB$. Leaving {A, B}: $BC = 2$, $AC = 3$, $BD = 5$; take $BC$. Leaving {A, B, C}: $CD = 4$, $BD = 5$; take $CD$. Same tree, weight 7. Each step is the cut property applied to the cut "tree versus rest". With a heap Prim runs in $O(m \log n)$, very much like Dijkstra, except that a vertex's key is the weight of its cheapest connecting edge rather than its distance from the start.

### The cycle property
There is a mirror-image fact. The **cycle property**: if an edge is the strictly heaviest edge on some cycle, it is in no MST. If it were in an MST, removing it would split the tree into two parts, and the cycle would contain another, lighter edge joining those parts; swapping it in would give a lighter spanning tree. This is why Kruskal can safely skip edges that close a cycle: at that moment they are the heaviest edge of that cycle.

### Common mistakes
An MST is not a shortest-path tree. The MST minimises the *total* weight of the network, but the route between two particular vertices inside the MST may be much longer than their true shortest path. Another mistake is adding a cheap edge that closes a cycle in Kruskal; always check that the two ends are in different components. And MSTs are only for **undirected** graphs; the directed version (arborescences) needs a different algorithm.

If all edge weights are distinct the MST is unique. With ties there can be several MSTs, but they all have the same total weight.

### Summary
A spanning tree connects all $n$ vertices with $n - 1$ edges and no cycles. An MST does this with least total weight. The cut property (the lightest edge across any cut is safe) justifies both Kruskal's algorithm (global lightest safe edge, using union–find) and Prim's algorithm (grow one tree by its lightest outgoing edge). Both run in $O(m \log n)$ time.

@fig graph graph=sample alg=kruskal | Kruskal on the sample graph after all steps: highlighted edges form the MST.

@viz graph graph=sample alg=kruskal | Step through Kruskal, then switch to Prim and compare.

:::explore
**What to try**
1. Run Kruskal step by step. The edges are tried in order of weight: 1–2 (1), 5–6 (1), 0–2 (2), 3–4 (2), 4–5 (2), then 4–6 (3) is rejected because 4, 5, 6 are already connected.
2. Keep stepping: 0–1 (4) is rejected, and 1–3 (5) joins the two halves.
3. Check the final total: $1 + 1 + 2 + 2 + 2 + 5 = 13$, with 6 edges for 7 vertices.
4. Switch to Prim and run it. The order of additions differs but the total is again 13.

**What to notice:** every rejected edge would close a cycle, and is the heaviest edge on that cycle (cycle property). Every accepted edge is the lightest one crossing some cut (cut property). Two very different greedy orders end at the same weight.
:::

:::formulas
$$|E(T)| = n - 1 \text{ for any spanning tree } T$$
$$w(T) = \sum_{e \in T} w(e)$$
$$\text{exchange: } w(T + e - f) = w(T) + w(e) - w(f)$$
$$\text{Kruskal: } O(m \log m), \qquad \text{Prim (heap): } O(m \log n)$$
:::

:::thm Cut property
Let $S$ be a non-empty proper subset of vertices of a connected weighted graph, and let $e$ be an edge of minimum weight among the edges with one end in $S$ and one end outside $S$. Then some minimum spanning tree contains $e$.
:::

:::proof
Let $T$ be an MST. If $e \in T$, done. Otherwise $T + e$ contains a unique cycle $C$, which uses $e$ to cross from $S$ to $V \setminus S$, so $C$ must contain another edge $f$ of $T$ crossing the cut. $T' = T + e - f$ is connected (the cycle still links $f$'s ends) and has $n - 1$ edges, so it is a spanning tree, with $w(T') = w(T) + w(e) - w(f) \le w(T)$ since $w(e) \le w(f)$. So $T'$ is an MST containing $e$.
:::

:::steps Run Kruskal on edges $PQ = 3$, $PR = 1$, $QR = 3$, $QS = 6$, $RS = 5$, $ST = 2$, $RT = 4$
1. Sorted: $PR$ 1, $ST$ 2, $PQ$ 3, $QR$ 3, $RT$ 4, $RS$ 5, $QS$ 6.
2. Take $PR$ (1) and $ST$ (2). Components {P, R}, {S, T}, {Q}.
3. Take $PQ$ (3). Skip $QR$ (3): Q and R are both in {P, Q, R}.
4. Take $RT$ (4), which joins {P, Q, R} with {S, T}. We have 4 edges for 5 vertices: stop.
5. MST weight $1 + 2 + 3 + 4 = 10$.
:::

:::steps Run Prim from P on the same graph
1. Tree {P}. Cheapest leaving edge: $PR$ (1). Tree {P, R}.
2. Leaving edges: $PQ$ 3, $QR$ 3, $RT$ 4, $RS$ 5. Take $PQ$ (3) (a tie with $QR$; either works). Tree {P, Q, R}.
3. Leaving edges: $RT$ 4, $RS$ 5, $QS$ 6. Take $RT$ (4). Tree {P, Q, R, T}.
4. Leaving edges: $ST$ 2, $RS$ 5, $QS$ 6. Take $ST$ (2). All vertices reached.
5. Total $1 + 3 + 4 + 2 = 10$, matching Kruskal.
:::

:::mock Exam question
A connected graph has 8 vertices and 12 edges, all with distinct weights. (a) How many edges does its MST have? (b) How many edges does Kruskal reject before finishing, at most? (c) Edge $e$ is the heaviest edge of the whole graph and lies on a cycle. Can $e$ be in the MST?
:::solution
(a) $n - 1 = 7$. (b) At most $12 - 7 = 5$ edges are rejected (Kruskal may stop before even looking at some of them). (c) No. $e$ is the strictly heaviest edge on that cycle (weights are distinct), so by the cycle property it is in no MST.
:::
:::

:::cs
Network design (cables, pipelines, road maintenance), approximation algorithms (the MST gives a 2-approximation for the travelling salesman problem with metric distances) and image segmentation (Felzenszwalb's method merges pixel regions in Kruskal order) all use minimum spanning trees.
:::

:::ml
Single-linkage hierarchical clustering is exactly Kruskal's algorithm: merging the two closest clusters again and again builds the MST of the data points, and cutting the $k - 1$ heaviest MST edges gives $k$ clusters. HDBSCAN builds an MST on "mutual reachability" distances for density-based clustering.
:::

:::real
Electricity grids, water pipes and early telephone networks were planned by connecting all customers at minimum total cost. The first MST algorithm, by Otakar Borůvka in 1926, was designed for the electrical network of Moravia.
:::

:::quiz
? How many edges does a spanning tree of a connected graph with 20 vertices have?
= 19
> Any tree on $n$ vertices has $n - 1$ edges.

? Kruskal considers edges in which order?
+ increasing weight
- decreasing weight
- BFS order from a root
> It greedily takes the lightest edge that does not create a cycle.

? A 4-cycle with edge weights 1, 2, 3, 4. What is the weight of its MST?
= 6
> Remove the heaviest edge (4): $1 + 2 + 3 = 6$.

? Which fact justifies adding the lightest edge leaving the current tree in Prim's algorithm?
+ the cut property
- the handshake lemma
- the cycle property applied to the lightest edge
> The edge is the lightest crossing the cut between the tree and the rest.

? If all edge weights are distinct, the MST is:
+ unique
- not necessarily unique
- always a path
> With distinct weights the cut property's lightest edge is unique for every cut, which forces the tree.

? Is the MST path between two vertices always a shortest path between them?
- yes
+ no
> The MST minimises total weight, not individual distances.
:::

# Unit: Bipartite graphs and matching

## Lesson: Bipartite graphs {#bipartite}
@summary: Graphs whose vertices split into two sides with every edge going across. A graph is bipartite exactly when it has no odd cycle, and BFS 2-colouring tests this in linear time.

### Two kinds of things
Many networks connect two different *kinds* of object. Students are linked to the courses they take. Customers are linked to the films they rated. Doctors are linked to the shifts they can work. Words are linked to the documents that contain them. In each case an edge never joins two students or two courses; it always joins one of each kind. Graphs with this shape are called **bipartite**, and they are so common that they deserve a lesson of their own.

:::def Bipartite graph
A graph is bipartite if its vertex set can be split into two disjoint sets $L$ and $R$ (the two sides, or parts) so that every edge has one end in $L$ and the other in $R$. Such a split is called a bipartition.
:::

:::def Complete bipartite graph $K_{a,b}$
The bipartite graph with $a$ vertices on one side, $b$ on the other, and every one of the $ab$ possible cross edges.
:::

### Seeing it as a colouring
An equivalent way to say "bipartite" is: you can colour every vertex either red or blue so that no edge joins two vertices of the same colour. Red is one side and blue is the other. This viewpoint makes it easy to test. Take a path $1 - 2 - 3 - 4$. Colour 1 red. Its neighbour 2 must be blue. Then 3 must be red, and 4 blue. No conflict, so the path is bipartite with sides $\{1, 3\}$ and $\{2, 4\}$. Now take a triangle $1 - 2 - 3 - 1$. Colour 1 red, so 2 is blue, so 3 is red, but 3 is adjacent to 1, which is also red. Conflict. The triangle is not bipartite, and no clever choice could fix it: once one vertex's colour is chosen, every other colour is forced.

### The odd cycle theorem
The triangle failed because it has odd length. Walk around any cycle in a bipartite graph and the colours alternate red, blue, red, blue. To come back to the starting colour you need an even number of steps. So **a bipartite graph cannot contain an odd cycle**. A 4-cycle, 6-cycle or the cube graph are fine; a 5-cycle or any graph containing a triangle is not.

The remarkable thing is that the converse is also true: **if a graph has no odd cycle, it is bipartite**. Here is the idea. In each connected component pick a root $r$ and colour each vertex by the parity of its distance from $r$: even distance red, odd distance blue. If some edge $uv$ joined two vertices of the same colour, then $d(u)$ and $d(v)$ would have the same parity, and the path from $r$ to $u$, the edge $uv$, and the path from $v$ back to $r$ would form a closed walk of odd length $d(u) + 1 + d(v)$. Every closed walk of odd length contains an odd cycle, which we assumed did not exist. So the colouring is proper.

### Testing in linear time with BFS
The proof is also an algorithm. Run BFS from any vertex, colour vertices by the parity of their BFS layer, and check every edge. If all edges cross between colours, the graph is bipartite and you have the two sides. If some edge joins two vertices in layers of the same parity, follow both of their parent pointers back until they meet: the two paths plus the bad edge form an odd cycle, which is a certificate that the graph is not bipartite. All of this takes $O(n + m)$ time.

For example, in a 6-cycle $0 - 1 - 2 - 3 - 4 - 5 - 0$, BFS from 0 puts 1 and 5 in layer 1, then 2 and 4 in layer 2, then 3 in layer 3. Even layers: $\{0, 2, 4\}$; odd layers: $\{1, 3, 5\}$. Every edge goes between them. In a 5-cycle, BFS from 0 puts 1 and 4 in layer 1 and 2 and 3 in layer 2, and the edge $23$ joins two layer-2 vertices: odd cycle $0 - 1 - 2 - 3 - 4 - 0$ found.

### Counting edges in bipartite graphs
If the sides have sizes $a$ and $b$, every edge picks one vertex from each side, so there are at most $ab$ edges, achieved by $K_{a,b}$. For a fixed total $n = a + b$, the product $ab$ is largest when the sides are as equal as possible, giving at most $\lfloor n^2/4 \rfloor$ edges. Compare that with $n(n-1)/2$ edges in $K_n$: a bipartite graph can have about half of all possible edges. The degree sums on the two sides are equal, because each edge contributes exactly one to each side: $\sum_{v \in L} \deg v = \sum_{v \in R} \deg v = m$.

@fig g10-graph-lab graph=cube mode=bipartite | The cube graph is bipartite: BFS colours the corners in two classes and every edge crosses.

### Bipartite graphs hiding in plain sight
Once you start looking, bipartite graphs appear everywhere, sometimes in disguise. A chessboard's squares form a bipartite graph if you join squares a knight's move apart: every knight move goes from a light square to a dark square, so the colours of the board are the bipartition. This is why a knight returns to its starting square only after an even number of moves. A grid of streets is bipartite: colour each intersection by whether (row + column) is even or odd, and every block changes the parity by one. The hypercube graph used in parallel computers joins binary strings that differ in one bit, and it is bipartite by the parity of the number of 1s. Whenever there is a quantity that changes by exactly one along every edge, its parity gives a 2-colouring.

### Common mistakes
"Bipartite" is about the *possibility* of a split, not about how a picture is drawn. The cube graph drawn as two nested squares does not look like two columns, but it is bipartite. Also, a graph with no triangles is not automatically bipartite: the 5-cycle has no triangle but has an odd cycle. Finally, for disconnected graphs, check every component; the graph is bipartite exactly when every component is.

### Summary
A graph is bipartite when its vertices split into two sides with all edges crossing, equivalently when it can be properly 2-coloured. The odd cycle theorem says this happens exactly when there is no cycle of odd length. BFS layer parity gives a linear-time test that either produces the bipartition or exhibits an odd cycle. Bipartite graphs model all "two kinds of thing" relationships and are the setting for matching, the next lesson.

@viz g10-graph-lab graph=c6 mode=bipartite | Run the 2-colouring test on different graphs.

:::explore
**What to try**
1. Start with the 6-cycle. The readout shows the two sides {0, 2, 4} and {1, 3, 5} found from BFS layer parity.
2. Switch the graph to the 5-cycle. The test fails and highlights an odd cycle, the certificate from the article.
3. Try $K_{3,3}$ and the cube: both bipartite. Try $K_4$, the wheel and the Petersen graph: all contain odd cycles.
4. Click a vertex to start the BFS from a different place. The sides are the same (up to swapping colours) for a connected graph.

**What to notice:** whenever the test fails, the highlighted cycle has odd length, and whenever it succeeds every edge crosses between colours. There is no third outcome, which is exactly the odd cycle theorem.
:::

:::formulas
$$G \text{ bipartite} \iff G \text{ has a proper 2-colouring} \iff G \text{ has no odd cycle}$$
$$|E(K_{a,b})| = ab, \qquad |E| \le \left\lfloor \tfrac{n^2}{4} \right\rfloor \text{ for bipartite } G \text{ on } n \text{ vertices}$$
$$\sum_{v \in L} \deg v = \sum_{v \in R} \deg v = m$$
:::

:::thm Odd cycle theorem (König, 1936)
A graph is bipartite if and only if it contains no cycle of odd length.
:::

:::proof
($\Rightarrow$) Along any cycle the sides alternate, so returning to the start takes an even number of edges. ($\Leftarrow$) Work in one component; fix a root $r$ and let $L$ be the vertices at even distance, $R$ those at odd distance. Suppose an edge $uv$ had both ends in the same set. Then $d(u) + d(v) + 1$ is odd, and the shortest paths $r \to u$, edge $uv$, and $v \to r$ form a closed walk of odd length. A closed walk of odd length always contains an odd cycle (if it repeats a vertex, split it into two shorter closed walks, one of which has odd length, and repeat). This contradicts the assumption, so every edge crosses and the graph is bipartite.
:::

:::steps Is the graph with edges $12, 23, 34, 41, 35, 56, 61$ bipartite?
1. BFS from 1: layer 0 {1}, layer 1 {2, 4, 6}, layer 2 {3, 5}.
2. Check edges: $12, 41, 61$ cross layers 0–1; $23, 34, 56$ cross 1–2.
3. Edge $35$ joins two layer-2 vertices: conflict.
4. Odd cycle: $3 - 5 - 6 - 1 - 2 - 3$ has 5 edges. Not bipartite.
:::

:::steps What is the largest number of edges in a bipartite graph on 9 vertices?
1. Sides of sizes $a$ and $9 - a$ allow at most $a(9 - a)$ edges.
2. Try values: $a = 4$ gives 20, $a = 3$ gives 18, $a = 5$ gives 20.
3. Maximum $= \lfloor 81/4 \rfloor = 20$, achieved by $K_{4,5}$.
:::

:::mock Exam question
(a) For which $n \ge 3$ is the cycle $C_n$ bipartite? (b) Is the 3-dimensional cube graph (8 corners, 12 edges) bipartite? Give the sides. (c) A bipartite graph has sides of size 6 and 10 and every vertex on the size-6 side has degree 5. What is the average degree on the size-10 side?
:::solution
(a) Exactly when $n$ is even. (b) Yes: label corners by binary strings $xyz$; each edge flips one bit, so it changes the parity of the number of 1s. Sides: even weight $\{000, 011, 101, 110\}$ and odd weight $\{001, 010, 100, 111\}$. (c) $m = 6 \times 5 = 30$, so the other side's degrees also sum to 30, average $30/10 = 3$.
:::
:::

:::ml
Recommender systems store user–item interactions as a bipartite graph. Matrix factorisation (user and item embeddings) and graph-based recommenders like PinSage and LightGCN pass messages back and forth across the two sides. Restricted Boltzmann machines are called "restricted" precisely because their visible and hidden units form a bipartite graph, which makes sampling one side given the other easy.
:::

:::cs
Bipartiteness checking appears in scheduling (two-shift assignments), in 2-SAT style constraint problems, and in compilers. Every "is this conflict graph 2-colourable?" question is a bipartite test.
:::

:::real
A dance class wants to pair people so that partners always come from two different groups. If "must not be in the same group" relations contain an odd cycle (A–B, B–C, C–A), no assignment into two groups exists.
:::

:::quiz
? Which graph is NOT bipartite?
- a 4-cycle
- a tree
+ a 7-cycle
> A cycle of odd length is never bipartite.

? How many edges does $K_{3,5}$ have?
= 15
> $3 \times 5 = 15$.

? BFS finds an edge joining two vertices in the same layer. What can you conclude?
+ the graph has an odd cycle, so it is not bipartite
- the graph is bipartite
- the graph is disconnected
> Same-layer edges close an odd cycle with the BFS paths.

? What is the maximum number of edges in a bipartite graph on 10 vertices?
= 25
> $\lfloor 100/4 \rfloor = 25$, from $K_{5,5}$.

? Every tree is bipartite because:
+ it has no cycles at all, so in particular no odd cycles
- it has $n - 1$ edges
- its leaves form one side
> No cycles means no odd cycles.
:::

## Lesson: Matchings, Hall's theorem and König's theorem {#matching}
@summary: Pairing up vertices along edges: maximum matchings, augmenting paths, Hall's marriage condition for perfect matchings, and König's theorem that matching equals vertex cover in bipartite graphs.

### Assigning people to jobs
A small company has four workers and four jobs. Each worker is qualified for only some of the jobs. Can every worker get a job they are qualified for, with no job given to two workers? If not, what is the largest number of workers who can be placed? This is the **matching problem**. Draw a bipartite graph with workers on the left, jobs on the right, and an edge for each qualification. A valid assignment is a set of edges with no shared endpoints.

:::def Matching
A matching in a graph is a set of edges no two of which share a vertex. A vertex touched by a matching edge is matched; otherwise it is free (unmatched).
:::

:::def Maximum and perfect matching
A maximum matching has the largest possible number of edges. A perfect matching matches every vertex, so it has $n/2$ edges.
:::

### Maximal is not maximum
The obvious greedy approach is to keep adding any edge whose ends are both free. When you get stuck, you have a **maximal** matching: no edge can be added. But maximal is not the same as maximum. Take the path $a - b - c - d$. If greedy picks the middle edge $bc$ first, both other edges are blocked, so you are stuck at size 1. Yet $\{ab, cd\}$ has size 2. A greedy maximal matching is always at least half the size of a maximum one, but it can be that bad.

### Augmenting paths
How do you escape from the stuck matching $\{bc\}$? Look at the path $a - b - c - d$. It starts at a free vertex $a$, goes along a non-matching edge $ab$, then a matching edge $bc$, then a non-matching edge $cd$, ending at a free vertex $d$. Its edges alternate between "not in the matching" and "in the matching", and both ends are free. Such a path is called an **augmenting path**. Flip every edge on it: matched edges become unmatched and vice versa. The path had one more non-matching edge than matching edges, so the matching grows by one: $\{bc\}$ becomes $\{ab, cd\}$.

**Berge's theorem** says this is the whole story: a matching is maximum if and only if there is no augmenting path. So an algorithm can start from the empty matching and repeatedly search for an augmenting path, flipping it each time. In bipartite graphs the search is a BFS or DFS that alternates between non-matching and matching edges. Each search costs $O(m)$ and there are at most $n/2$ augmentations, giving $O(nm)$. The Hopcroft–Karp algorithm finds many augmenting paths at once and runs in $O(m\sqrt{n})$.

### When is a perfect matching impossible? Hall's theorem
Suppose workers Asha and Ben are both qualified only for job 1. Then whatever you do, one of them gets nothing. In general, if some group $S$ of workers is qualified, all together, for fewer than $|S|$ jobs, they cannot all be placed. Write $N(S)$ for the set of jobs adjacent to at least one worker in $S$. The obstruction is $|N(S)| < |S|$.

**Hall's marriage theorem** says that this obvious obstruction is the *only* one. In a bipartite graph with left side $L$, there is a matching that covers every vertex of $L$ if and only if
$$|N(S)| \ge |S| \quad \text{for every subset } S \subseteq L.$$
This is surprising: to show a matching exists you don't need to construct it, just check a counting condition. And if no such matching exists, a violating set $S$ is a short proof of impossibility.

### König's theorem: matchings and covers
A **vertex cover** is a set of vertices touching every edge. Think of it as placing guards on vertices so that every edge has a guard at one end. Each matching edge needs its own guard, since no vertex covers two matching edges. So for any graph, (size of any matching) $\le$ (size of any vertex cover). In bipartite graphs something much stronger holds. **König's theorem**: the size of a maximum matching *equals* the size of a minimum vertex cover. For example, in the jobs graph where Asha and Ben only like job 1, the maximum matching has size 3 and the three vertices {job 1, Chen, Dev} touch every edge, proving that 3 is optimal. In non-bipartite graphs the equality can fail: the triangle has maximum matching 1 but needs 2 vertices to cover its 3 edges.

@fig g10-graph-lab graph=jobs mode=matching | A perfect matching of four workers (left) to four jobs (right).

### Why the two theorems fit together
Hall's theorem and König's theorem are really two views of the same fact. Suppose the left side cannot be fully matched and the maximum matching has size $k < |L|$. König gives a vertex cover $C$ with $|C| = k$. Let $S$ be the left vertices that are *not* in $C$. Every edge from $S$ must be covered at its right end, so $N(S)$ lies inside the right part of $C$. Counting, $|N(S)| \le |C| - (|L| - |S|) = k - |L| + |S| < |S|$, which is exactly a violation of Hall's condition. In the same way, the augmenting-path algorithm, when it finishes, hands you both a maximum matching and a matching-sized cover, so you always get a certificate of optimality along with the answer. This idea of a "dual" object proving optimality reappears in network flows, where a minimum cut proves a flow is maximum.

### Common mistakes
Do not stop at a maximal matching and call it maximum. Check for augmenting paths. When applying Hall's condition, you must check *every* subset $S$ of the left side, not just single vertices: each worker may individually have two options while a group of three shares only two jobs. And remember that Hall's theorem guarantees a matching that saturates one side; a perfect matching additionally needs $|L| = |R|$.

### Summary
A matching is a set of disjoint edges. Maximal (cannot add an edge) is weaker than maximum (largest size). Augmenting paths, alternating paths between two free vertices, grow a matching by one, and Berge's theorem says a matching is maximum exactly when none exists. In bipartite graphs, Hall's condition $|N(S)| \ge |S|$ characterises when one side can be fully matched, and König's theorem says maximum matching equals minimum vertex cover.

@viz g10-graph-lab graph=jobs mode=matching | Compare a graph with a perfect matching to one that violates Hall's condition.

:::explore
**What to try**
1. With the jobs graph, read the maximum matching and the ringed minimum vertex cover. Both have size 4, and the matching is perfect.
2. Switch to the "jobs-hall" graph. Workers 0 and 1 are both adjacent only to job 4, so $S = \{0, 1\}$ has $|N(S)| = 1 < 2$.
3. Read the new maximum matching size, 3, and check that the cover also has size 3, as König's theorem promises.
4. Switch to the 5-cycle or $K_4$: not bipartite. Compare matching size and cover size.

**What to notice:** in bipartite graphs the thick matching edges and the ringed cover vertices always come in equal numbers, so each certifies the other is optimal. In the 5-cycle, matching size is 2 but the cover needs 3.
:::

:::formulas
$$|M| \le |C| \text{ for any matching } M \text{ and vertex cover } C$$
$$\text{bipartite: } \max |M| = \min |C| \quad \text{(König)}$$
$$\text{Hall: } L \text{ can be fully matched} \iff |N(S)| \ge |S| \;\; \forall S \subseteq L$$
$$\text{augmenting path with } k \text{ matched edges has } k+1 \text{ unmatched edges: } |M \oplus P| = |M| + 1$$
:::

:::thm Berge's theorem
A matching $M$ is maximum if and only if there is no $M$-augmenting path.
:::

:::proof
If an augmenting path $P$ exists, $M \oplus P$ (flip the edges of $P$) is a matching with one more edge, so $M$ is not maximum. Conversely, suppose $M'$ is a bigger matching. In the symmetric difference $M \oplus M'$, every vertex has degree at most 2, so it splits into paths and even cycles whose edges alternate between $M$ and $M'$. Cycles have equally many edges of each, and since $|M'| > |M|$ some path has more $M'$ edges than $M$ edges. That path starts and ends with $M'$ edges at vertices free in $M$, so it is an $M$-augmenting path.
:::

:::thm Hall's marriage theorem
A bipartite graph with sides $L$ and $R$ has a matching covering all of $L$ if and only if $|N(S)| \ge |S|$ for every $S \subseteq L$.
:::

:::steps Find a maximum matching: $L = \{1, 2, 3\}$, $R = \{a, b, c\}$, edges $1a, 1b, 2a, 3b, 3c$
1. Greedy: take $1a$, then $3b$. Vertex 2's only neighbour $a$ is taken: matching $\{1a, 3b\}$, size 2.
2. Search for an augmenting path from free vertex 2: $2 - a$ (unmatched), $a - 1$ (matched), $1 - b$ (unmatched), $b - 3$ (matched), $3 - c$ (unmatched), and $c$ is free.
3. Flip: remove $1a, 3b$; add $2a, 1b, 3c$.
4. New matching $\{2a, 1b, 3c\}$ has size 3: perfect.
:::

:::steps Show there is no perfect matching: $L = \{1, 2, 3, 4\}$, $R = \{a, b, c, d\}$, edges $1a, 2a, 2b, 3a, 3b, 4c, 4d$
1. Take $S = \{1, 2, 3\}$. Their neighbours: $N(S) = \{a, b\}$.
2. $|N(S)| = 2 < 3 = |S|$: Hall's condition fails.
3. So at most 2 of vertices 1, 2, 3 can be matched, and the maximum matching has size at most 3 (e.g. $1a, 2b, 4c$).
:::

:::mock Exam question
Five students each choose some of five project topics: P1 likes {A, B}, P2 likes {A}, P3 likes {B, C}, P4 likes {C, D, E}, P5 likes {D}. (a) Find a perfect matching. (b) If P3 changes to like only {A}, prove no perfect matching exists. (c) In case (b), what is the maximum matching size?
:::solution
(a) P2–A, P1–B, P3–C, P5–D, P4–E. (b) $S = \{P1, P2, P3\}$ now has $N(S) = \{A, B\}$, and $2 < 3$, so Hall fails. (c) 4: for example P2–A, P1–B, P4–C, P5–D. It cannot be 5 by part (b).
:::
:::

:::cs
Matching assigns tasks to servers, students to schools (the stable-matching algorithm behind school admissions and the US medical residency match), and ride requests to drivers. In computer vision, the Hungarian algorithm (a weighted bipartite matching method) matches detected objects across video frames.
:::

:::ml
DETR, a transformer-based object detector, trains by computing a minimum-cost bipartite matching between predicted boxes and ground-truth boxes with the Hungarian algorithm, then applying the loss to matched pairs. Optimal transport between two discrete distributions with equal weights reduces to an assignment (perfect matching) problem.
:::

:::real
Kidney exchange programmes pair incompatible donor–patient couples with each other so that more transplants can happen; finding the best set of swaps is a matching problem on a large compatibility graph.
:::

:::quiz
? In the path $a - b - c - d$, which matching is maximal but not maximum?
+ $\{bc\}$
- $\{ab, cd\}$
- $\{ab\}$
> $\{bc\}$ blocks both other edges but $\{ab, cd\}$ is larger. $\{ab\}$ is not maximal since $cd$ can be added.

? An augmenting path contains 3 matched edges. How many unmatched edges does it have?
= 4
> It alternates and starts and ends with unmatched edges, so it has one more unmatched edge.

? Three left vertices have combined neighbourhood of size 2. What does Hall's theorem say?
+ no matching covers the whole left side
- there is a perfect matching
- the graph is not bipartite
> $|N(S)| < |S|$ is exactly Hall's obstruction.

? In a bipartite graph the maximum matching has size 7. What is the size of a minimum vertex cover?
= 7
> König's theorem: they are equal in bipartite graphs.

? What is the maximum matching size of a triangle?
= 1
> Any two edges of a triangle share a vertex.

? How many edges does a perfect matching on 12 vertices have?
= 6
> Each edge matches two vertices: $12/2 = 6$.
:::

# Unit: Routes, drawings and colourings

## Lesson: Euler and Hamilton: using every edge or every vertex {#euler-hamilton}
@summary: An Euler trail uses every edge once, and a simple degree test decides when one exists. A Hamilton cycle visits every vertex once, and no simple test is known; it is a famously hard problem.

### The seven bridges of Königsberg
In the 1700s the city of Königsberg (now Kaliningrad) was built around a river with two islands, joined to the banks and to each other by seven bridges. Residents wondered whether they could take a Sunday walk that crossed every bridge exactly once. Nobody could find such a walk, but nobody could prove it was impossible either. In 1736 Leonhard Euler settled the question, and in doing so he invented graph theory. He replaced each land mass with a dot and each bridge with a line, and noticed that the shape of the land did not matter at all: only which land masses each bridge joined.

The Königsberg graph has 4 vertices (two banks, two islands) and 7 edges. Their degrees are 5, 3, 3 and 3. Euler's insight was about what happens *in the middle* of a walk.

:::def Euler trail and Euler circuit
An Euler trail is a walk that uses every edge of the graph exactly once. An Euler circuit is an Euler trail that starts and ends at the same vertex.
:::

### The parity argument
Follow a walker through a vertex $v$ that is neither the start nor the end. Each time they arrive on one edge, they must leave on another. So the edges at $v$ get used up in pairs: one in, one out. If the walk uses every edge exactly once, $\deg v$ must be even. Only the start and end vertices can have odd degree, because the walk leaves the start once without arriving and arrives at the end once without leaving. If the walk is a circuit, start and end are the same vertex, and its degree is even too.

So: an Euler circuit requires every vertex to have even degree, and an Euler trail requires either zero or exactly two odd-degree vertices. Königsberg has four odd vertices, so the walk is impossible. That is the whole proof.

### And the condition is enough
The surprising part is the converse. If the graph is connected (ignoring isolated vertices) and every degree is even, an Euler circuit always exists. If exactly two vertices are odd, an Euler trail exists, starting at one odd vertex and ending at the other. Here is why. Start anywhere and walk along unused edges. Because every degree is even, whenever you enter a vertex other than the start there is an unused edge to leave by, so you can only get stuck back at the start. You now have a closed circuit, though it might miss some edges. If it does, some vertex on your circuit still has unused edges (the graph is connected). Walk a new closed loop from there using only unused edges, and splice it into the first circuit at that vertex. Repeat until no edges remain. This splicing method is **Hierholzer's algorithm**, and it runs in $O(m)$ time.

For two odd vertices $a$ and $b$, add a temporary extra edge $ab$. Now all degrees are even, so there is an Euler circuit; delete the temporary edge from it and you get an Euler trail from $a$ to $b$.

A familiar puzzle: draw the "house" or envelope shape without lifting your pen and without redrawing a line. The envelope (a square with both diagonals plus a roof) has two vertices of degree 3 at the bottom and all others even, so it can be done, but only if you start at one bottom corner and finish at the other.

@fig g10-graph-lab graph=envelope mode=euler | The envelope has exactly two odd vertices, so an Euler trail exists between them.

### Hamilton: every vertex instead of every edge
A century later, William Rowan Hamilton sold a puzzle called the Icosian game: find a route along the edges of a dodecahedron that visits every corner exactly once and returns to the start. The question looks like Euler's with "edge" replaced by "vertex", but it behaves completely differently.

:::def Hamilton path and Hamilton cycle
A Hamilton path visits every vertex exactly once. A Hamilton cycle is a Hamilton path whose last vertex is adjacent to its first, closing a cycle through all $n$ vertices. A graph with a Hamilton cycle is called Hamiltonian.
:::

No simple test like "check the degrees" is known for Hamilton cycles. Deciding whether a graph has one is **NP-complete**, which means that a fast general algorithm would give fast algorithms for thousands of other hard problems, and most computer scientists believe none exists. What we do have are **sufficient** conditions, which guarantee a Hamilton cycle when they hold but say nothing when they fail, and **obstacles** that rule one out.

The best-known sufficient condition is **Dirac's theorem**: if $n \ge 3$ and every vertex has degree at least $n/2$, the graph has a Hamilton cycle. For example $K_n$ (degree $n - 1$) and $K_{3,3}$ (degree $3 = 6/2$) qualify. Ore's theorem is a refinement: it is enough that $\deg u + \deg v \ge n$ for every pair of non-adjacent vertices $u, v$.

Useful obstacles: a vertex of degree 1 rules out a Hamilton cycle (you could enter it but never leave on a fresh edge). A cut vertex rules it out too, because a cycle through both sides would have to pass through the cut vertex twice. A bipartite graph with sides of unequal size has no Hamilton cycle, because the cycle alternates sides and so uses equally many vertices from each. And the Petersen graph, 10 vertices of degree 3, has a Hamilton path but no Hamilton cycle, a classic small counterexample to many hopeful conjectures.

### Common mistakes
Do not mix the two problems up: Euler is about **edges** and is easy; Hamilton is about **vertices** and is hard. Dirac's theorem is one-way: a cycle $C_n$ has every degree 2, which is less than $n/2$ for $n \ge 5$, yet it is itself a Hamilton cycle. When applying Euler's test, remember connectivity: two separate triangles have all degrees even but no single circuit can cover both.

### Summary
An Euler circuit exists exactly when the graph is connected and all degrees are even; an Euler trail exists exactly when the graph is connected and has zero or two odd vertices. Hierholzer's splicing algorithm finds one in linear time. Hamilton cycles, visiting every vertex once, have no known efficient test; Dirac's and Ore's theorems give sufficient conditions, while degree-1 vertices, cut vertices and unbalanced bipartite sides are obstacles.

@viz g10-graph-lab graph=envelope mode=euler | Test Euler's condition, then switch to Hamilton mode on the same graphs.

:::explore
**What to try**
1. On the envelope, read the Euler trail. It starts at vertex 0 and ends at vertex 1, the two odd-degree vertices. Press Animate to watch the edge order.
2. Switch to $K_5$ (all degrees 4): an Euler circuit. Switch to $K_4$ or the cube (all degrees 3): no Euler trail, and the odd vertices are ringed.
3. Change the mode to Hamilton. $K_4$, $K_5$ and $K_{3,3}$ satisfy Dirac's condition; the readout confirms it.
4. Choose the Petersen graph in Hamilton mode: only a Hamilton path is found. Then try the tree: no Hamilton path at all.

**What to notice:** the Euler answer can always be predicted from degrees alone, exactly as the parity argument says. The Hamilton answer cannot: the cube has every degree 3, less than $n/2 = 4$, and still has a Hamilton cycle, while the Petersen graph, also 3-regular, has none.
:::

:::formulas
$$\text{Euler circuit} \iff \text{connected and every } \deg v \text{ even}$$
$$\text{Euler trail} \iff \text{connected and exactly 0 or 2 vertices of odd degree}$$
$$\text{Dirac: } n \ge 3,\; \delta(G) \ge \tfrac{n}{2} \Rightarrow \text{Hamiltonian}; \qquad \text{Ore: } \deg u + \deg v \ge n \text{ for all non-adjacent } u,v$$
$$\#\text{Hamilton cycles in } K_n = \frac{(n-1)!}{2}$$
:::

:::thm Euler's theorem
A connected graph has an Euler circuit if and only if every vertex has even degree.
:::

:::proof
If an Euler circuit exists, each visit to a vertex uses one edge in and one edge out, so degrees are even. Conversely, use induction on the number of edges. Since all degrees are even and the graph has an edge, every vertex of positive degree has degree at least 2, so there is a cycle $C$. Removing the edges of $C$ leaves all degrees even. Each component of what remains has fewer edges and so, by induction, an Euler circuit; each such component shares a vertex with $C$ (the original graph is connected). Traverse $C$, and on reaching each component's shared vertex for the first time, detour around that component's Euler circuit. This uses every edge exactly once.
:::

:::steps Can you draw the graph with edges $AB, BC, CD, DA, AC, BD, AE, EB$ in one stroke?
1. Degrees: A: B, D, C, E → 4. B: A, C, D, E → 4. C: B, D, A → 3. D: C, A, B → 3. E: A, B → 2.
2. Exactly two odd vertices (C and D), and the graph is connected.
3. So an Euler trail exists from C to D (but no Euler circuit).
4. One trail: C–A–B–C–D–A–E–B–D. It uses all 8 edges once.
:::

:::steps How many distinct Hamilton cycles does $K_5$ have?
1. Fix a starting vertex (rotations give the same cycle): arrange the other 4 in order, $4! = 24$ ways.
2. Each cycle is counted twice, once in each direction.
3. Answer $24/2 = 12$, matching $(n-1)!/2$.
:::

:::mock Exam question
(a) Königsberg has land masses with degrees 5, 3, 3, 3. What is the minimum number of new bridges needed so that a walk crossing every bridge exactly once exists (it need not return to the start)? (b) A bipartite graph has sides of size 4 and 5. Can it have a Hamilton cycle? (c) A graph on 10 vertices has minimum degree 5. What does Dirac's theorem say?
:::solution
(a) An Euler trail needs at most 2 odd vertices. Adding one bridge between two odd land masses makes both even, leaving 2 odd vertices. So 1 new bridge suffices. (b) No: a Hamilton cycle alternates sides and would need equal sides. (c) $5 \ge 10/2$, so the graph has a Hamilton cycle.
:::
:::

:::cs
Euler trails assemble DNA: in de Bruijn graph genome assembly, each short sequencing read becomes an edge, and the genome is an Euler trail through them. Snow ploughs and postal routes use the Chinese Postman problem, which adds the cheapest duplicate edges to make all degrees even. Hamilton cycles appear in the travelling salesman problem, which asks for the cheapest Hamilton cycle.
:::

:::ml
Routing and tour-planning models trained with reinforcement learning or attention (the "attention model" for the travelling salesman problem) are evaluated on how close their tours come to optimal Hamilton cycles, because exact solutions are intractable for large inputs.
:::

:::real
Drawing a figure "without lifting your pen" is an Euler trail puzzle, and the answer is always decided by counting odd corners: zero means you can start anywhere, two means you must start at one of them, more than two means it is impossible.
:::

:::quiz
? A connected graph has degrees 2, 4, 4, 3, 3, 2. Does it have an Euler circuit, an Euler trail, or neither?
- Euler circuit
+ Euler trail only
- neither
> Exactly two odd vertices, so a trail between them but no circuit.

? How many odd-degree vertices did the Königsberg graph have?
= 4
> Degrees 5, 3, 3, 3: all four are odd.

? Which problem is NP-complete in general?
- deciding if a graph has an Euler circuit
+ deciding if a graph has a Hamilton cycle
- finding the degree of every vertex
> Euler is decided by degrees in linear time; Hamilton has no known fast test.

? How many Hamilton cycles does $K_4$ have?
= 3
> $(4-1)!/2 = 3$.

? A graph has 12 vertices and minimum degree 6. Is it guaranteed to be Hamiltonian?
+ yes, by Dirac's theorem
- no
- only if it is bipartite
> $6 \ge 12/2$.

? A graph has a vertex of degree 1. Can it have a Hamilton cycle?
- yes
+ no
> A cycle needs two edges at every vertex.
:::

## Lesson: Planar graphs and Euler's formula {#planarity}
@summary: Which graphs can be drawn without crossing edges? Euler's formula V − E + F = 2, the edge bounds E ≤ 3V − 6 and E ≤ 2V − 4, why K5 and K3,3 are not planar, and Kuratowski's theorem.

### The three utilities puzzle
Here is an old puzzle. Three houses each need to be connected to three utilities: water, gas and electricity. Can you draw all nine pipes on a flat sheet of paper so that no two pipes cross? People have tried for over a century, and it always fails: you can draw eight pipes without crossings, but the ninth always has to cross something. The graph in this puzzle is $K_{3,3}$, and this lesson explains why it can never be drawn flat.

The same question matters for real engineering. On a printed circuit board, wires on one layer cannot cross. A road map cannot have roads crossing without a junction or bridge. In graph drawing software, crossings make diagrams hard to read. All of these ask: when can a graph be drawn in the plane with no edges crossing?

:::def Planar graph
A graph is planar if it can be drawn in the plane so that edges meet only at shared endpoints (no crossings). Such a crossing-free drawing is called a plane graph or a planar embedding.
:::

:::def Face
In a plane drawing, the faces are the regions the edges divide the plane into, including the single unbounded outer region.
:::

### Planar is about the graph, not the picture
A graph might be drawn with crossings and still be planar. $K_4$ is usually drawn as a square with both diagonals, which has one crossing. But you can move one vertex into the middle of the triangle formed by the other three, and all six edges become crossing-free. So "planar" means "there exists a crossing-free drawing", and to prove a graph is planar you just exhibit one. Proving a graph is *not* planar is harder, because you must rule out every possible drawing. That is where Euler's formula comes in.

### Euler's formula
Count vertices $V$, edges $E$ and faces $F$ in any connected plane drawing. A triangle: $V = 3$, $E = 3$, $F = 2$ (inside and outside). A square with one diagonal: $V = 4$, $E = 5$, $F = 3$. A cube drawn as two nested squares: $V = 8$, $E = 12$, $F = 6$. In every case
$$V - E + F = 2.$$
This is **Euler's formula**, and it holds for every connected plane graph, however it is drawn.

Here is why. Start with a spanning tree of the graph. A tree has $E = V - 1$ and one face (it encloses nothing), so $V - E + F = V - (V - 1) + 1 = 2$. Now add the remaining edges one at a time. Each added edge joins two vertices already connected in the tree, so it closes a cycle and splits one face into two. That adds 1 to $E$ and 1 to $F$, leaving $V - E + F$ unchanged. When all edges are back, the value is still 2.

### Counting faces gives an edge limit
Euler's formula turns into a powerful test. In a simple plane graph with at least 3 vertices, every face is bounded by at least 3 edges (no loops or double edges, so no face with 1 or 2 sides). If we go round every face and count its edges, we count each edge at most twice, once from each side. So $3F \le 2E$. Substitute $F = 2 - V + E$:
$$3(2 - V + E) \le 2E \quad\Longrightarrow\quad E \le 3V - 6.$$
**A simple planar graph with $V \ge 3$ has at most $3V - 6$ edges.** If the graph has no triangles, every face has at least 4 sides, so $4F \le 2E$, which gives $E \le 2V - 4$.

Now test the famous examples. $K_5$ has $V = 5$ and $E = 10$, but $3V - 6 = 9$. Too many edges: **$K_5$ is not planar**. $K_{3,3}$ has $V = 6$, $E = 9$, and $3V - 6 = 12$, so the first test passes. But $K_{3,3}$ is bipartite, so it has no triangles, and $2V - 4 = 8 < 9$. **$K_{3,3}$ is not planar**, which solves the utilities puzzle.

The same counting shows every planar graph has a vertex of degree at most 5. If every degree were at least 6, the handshake lemma would give $2E \ge 6V$, so $E \ge 3V$, contradicting $E \le 3V - 6$. This small fact is the key step in proving that planar maps can be coloured with few colours (next lesson).

### Kuratowski's theorem
The edge bounds are only one-way tests: a graph can pass them and still be non-planar. The Petersen graph has $V = 10$, $E = 15$, no triangles, and $2V - 4 = 16 \ge 15$, so both tests pass, yet it is not planar. (Its shortest cycle has length 5, and the sharper bound $5F \le 2E$ gives $E \le \tfrac{5}{3}(V - 2) \approx 13.3$, which it fails.)

The complete answer is **Kuratowski's theorem** (1930): a graph is planar if and only if it does not contain a **subdivision** of $K_5$ or $K_{3,3}$, that is, a copy of one of them in which edges may be replaced by paths. In other words, $K_5$ and $K_{3,3}$ are the only two fundamental obstacles; every non-planar graph is hiding one of them. Linear-time algorithms (Hopcroft–Tarjan, 1974) can test planarity and produce a drawing.

@fig g10-graph-lab graph=cube mode=planar | The cube drawn as nested squares: no crossings, and V − E + F = 8 − 12 + 6 = 2.

### Common mistakes
Passing $E \le 3V - 6$ does not prove planarity; it only fails to disprove it. Use $E \le 2V - 4$ only for triangle-free graphs. Remember to count the outer face in Euler's formula. And for a plane graph with $c$ components, the formula becomes $V - E + F = 1 + c$.

### Summary
A graph is planar if some drawing has no crossings. Euler's formula $V - E + F = 2$ holds for every connected plane graph. Combined with "each face has at least 3 edges", it gives $E \le 3V - 6$ (and $E \le 2V - 4$ without triangles), which proves $K_5$ and $K_{3,3}$ are non-planar and that planar graphs always have a vertex of degree at most 5. Kuratowski's theorem says those two graphs, in subdivided form, are the only obstructions.

@viz g10-graph-lab graph=k4 mode=planar | Drag vertices to remove crossings, and watch the readout check Euler's formula.

:::explore
**What to try**
1. $K_4$ starts with 1 crossing (marked ×). Drag one vertex into the middle of the triangle formed by the others until the crossing count is 0. The readout now confirms $V - E + F = 4 - 6 + 4 = 2$.
2. Switch to the cube and the wheel: already crossing-free. Check $F$ in each.
3. Switch to $K_5$: the readout shows $E = 10 > 3V - 6 = 9$, so no amount of dragging can remove every crossing. Try anyway.
4. Switch to $K_{3,3}$: the first test passes but the triangle-free test $E \le 2V - 4 = 8$ fails.
5. Try the Petersen graph: both tests pass, yet you will not manage to remove all crossings.

**What to notice:** whenever a drawing has no crossings, $V - E + F$ is exactly 2 (or $1 +$ the number of components). The edge tests can prove non-planarity, but passing them, as Petersen shows, proves nothing.
:::

:::formulas
$$V - E + F = 2 \quad \text{(connected plane graph)}, \qquad V - E + F = 1 + c \quad (c \text{ components})$$
$$\sum_{\text{faces}} \deg(f) = 2E$$
$$E \le 3V - 6 \;\; (V \ge 3), \qquad E \le 2V - 4 \;\; \text{(no triangles)}, \qquad E \le \tfrac{g}{g-2}(V - 2) \;\; \text{(shortest cycle } g)$$
$$\text{planar} \Rightarrow \exists v: \deg v \le 5$$
:::

:::thm Euler's formula
For every connected plane graph, $V - E + F = 2$.
:::

:::proof
Induction on the number of edges outside a spanning tree $T$. For $T$ itself, $E = V - 1$ and $F = 1$, so $V - E + F = 2$. Each remaining edge $e$ joins two vertices already connected, so in the drawing it lies on a cycle and separates one existing face into two (by the Jordan curve theorem). Adding $e$ increases $E$ by 1 and $F$ by 1, keeping $V - E + F = 2$.
:::

:::thm Kuratowski's theorem
A graph is planar if and only if it contains no subgraph that is a subdivision of $K_5$ or of $K_{3,3}$.
:::

:::steps A connected plane graph has 12 vertices, each of degree 3. How many faces does it have?
1. Handshake: $2E = 12 \times 3 = 36$, so $E = 18$.
2. Euler: $F = 2 - V + E = 2 - 12 + 18 = 8$.
3. Check: $E = 18 \le 3V - 6 = 30$. (The truncated tetrahedron is such a graph.)
:::

:::steps Show that a simple graph with 8 vertices and 19 edges is not planar
1. If planar, $E \le 3V - 6 = 3(8) - 6 = 18$.
2. But $E = 19 > 18$.
3. So no crossing-free drawing exists.
:::

:::mock Exam question
(a) A connected planar graph has 10 vertices and 15 edges. How many faces does any plane drawing have? (b) What is the largest number of edges a simple planar graph on 10 vertices can have? (c) A triangle-free planar graph has 10 vertices. At most how many edges can it have?
:::solution
(a) $F = 2 - 10 + 15 = 7$. (b) $3(10) - 6 = 24$. (c) $2(10) - 4 = 16$.
:::
:::

:::cs
Circuit board and chip layout (VLSI) software minimises crossings, since each crossing needs an extra layer or via. Graph drawing libraries (such as Graphviz) and map rendering use planarity tests and planar embeddings. Many hard problems become easier on planar graphs: for example, planar graphs always have small "separators" (about $\sqrt{n}$ vertices), which gives fast divide-and-conquer algorithms.
:::

:::ml
Meshes in 3D graphics and geometry processing are planar-like graphs (triangulated surfaces satisfy a version of Euler's formula, $V - E + F = 2$ for a sphere-like surface). Mesh-based graph neural networks for physics simulation use these vertex–edge–face relationships.
:::

:::real
There are exactly five Platonic solids (tetrahedron, cube, octahedron, dodecahedron, icosahedron). Their skeletons are planar graphs, and Euler's formula, together with the requirement that every face and every corner look the same, leaves only five possibilities.
:::

:::quiz
? A connected plane graph has 7 vertices and 10 edges. How many faces?
= 5
> $F = 2 - 7 + 10 = 5$.

? Which test shows $K_{3,3}$ is not planar?
- $E \le 3V - 6$
+ $E \le 2V - 4$, since it has no triangles
- Euler's formula alone, without bounds
> $9 > 2(6) - 4 = 8$, while $9 \le 12$ passes the first test.

? What is the maximum number of edges in a simple planar graph with 6 vertices?
= 12
> $3(6) - 6 = 12$.

? Every simple planar graph has a vertex of degree at most:
- 3
- 4
+ 5
> If all degrees were at least 6, then $E \ge 3V > 3V - 6$.

? A graph passes the test $E \le 3V - 6$. What can you conclude?
- it is planar
+ nothing: it may or may not be planar
- it is not planar
> The bound is necessary, not sufficient (Petersen passes and is non-planar).
:::

## Lesson: Graph colouring {#colouring}
@summary: Colour vertices so that neighbours differ. The chromatic number, lower bounds from cliques, the greedy Δ + 1 bound and why ordering matters, Brooks' theorem, the four colour theorem, and scheduling applications.

### Scheduling exams without clashes
A university must schedule exams. Some pairs of courses share a student, so their exams cannot happen at the same time. What is the smallest number of time slots needed? Draw a graph with one vertex per course and an edge between any two courses that share a student. Assigning time slots is then the same as giving each vertex a "colour" so that no edge joins two vertices of the same colour. The fewest slots is the fewest colours. This is **graph colouring**, and the same model fits radio frequencies (nearby transmitters need different frequencies), compiler register allocation (variables alive at the same time need different registers), and Sudoku (cells in the same row, column or box need different digits).

:::def Proper colouring
A proper $k$-colouring assigns each vertex one of $k$ colours so that the two ends of every edge have different colours.
:::

:::def Chromatic number $\chi(G)$
The smallest $k$ for which $G$ has a proper $k$-colouring.
:::

### Small examples
A graph with no edges needs 1 colour. Any graph with at least one edge needs at least 2. The bipartite graphs are exactly those with $\chi \le 2$, so trees, even cycles, grids and the cube all have $\chi = 2$. An odd cycle needs 3: going around, the colours would have to alternate, and an odd number of alternations cannot close up. So $\chi(C_5) = 3$. The complete graph $K_n$ needs $n$ colours, since every pair of vertices is adjacent. The wheel with an odd rim (a 5-cycle plus a hub joined to everything) needs 4: the rim needs 3 and the hub must differ from all of them.

### Lower bounds: cliques
A **clique** is a set of vertices that are all adjacent to each other. If a graph contains a clique of size $\omega$, those vertices need $\omega$ different colours, so $\chi(G) \ge \omega(G)$. In the exam example, if four courses all share students pairwise, at least four slots are needed. Another lower bound: each colour class is an **independent set** (no edges inside it), so if the largest independent set has $\alpha$ vertices, you need at least $n/\alpha$ colours. Neither bound is always tight: the 5-cycle has $\omega = 2$ but $\chi = 3$, and there are triangle-free graphs with chromatic number as large as you like.

### Upper bounds: the greedy algorithm
The simplest way to colour is **greedy**: put the vertices in some order, and give each vertex the smallest colour (1, 2, 3, ...) not already used by its coloured neighbours. When we reach a vertex $v$, at most $\deg v$ of its neighbours have colours, so at most $\deg v$ colours are blocked, and one of the colours $1, 2, \ldots, \deg v + 1$ is free. So greedy uses at most $\Delta + 1$ colours, where $\Delta$ is the maximum degree:
$$\chi(G) \le \Delta(G) + 1.$$

But the *order* matters a great deal. Take the path $a - b - c - d$. In order $a, b, c, d$, greedy alternates 1, 2, 1, 2: two colours, which is optimal. In the order $a, d, b, c$: $a$ gets 1; $d$ has no coloured neighbour, so it also gets 1; $b$ is next to $a$ and gets 2; $c$ is next to $b$ (colour 2) and $d$ (colour 1), so it needs colour 3. Three colours on a graph that only needs two. A popular heuristic, the **Welsh–Powell** rule, colours vertices in order of decreasing degree, which handles the most constrained vertices first. There is always *some* order for which greedy is optimal (colour the vertices class by class from an optimal colouring), but finding it is as hard as the original problem.

### Brooks' theorem and the four colour theorem
The bound $\Delta + 1$ is reached by complete graphs ($\chi(K_n) = n = \Delta + 1$) and odd cycles ($\chi = 3 = \Delta + 1$). **Brooks' theorem** (1941) says these are the only connected graphs that need $\Delta + 1$ colours; every other connected graph can be coloured with $\Delta$ colours.

For planar graphs, the fact from the last lesson, that some vertex has degree at most 5, gives an easy proof that 6 colours always suffice: remove that vertex, colour the rest by induction, then put it back; it has at most 5 neighbours, so one of 6 colours is free. With more care the same idea gives 5 colours. The famous **four colour theorem** says that 4 colours are always enough for planar graphs, so every map can be coloured with four colours so that neighbouring countries differ. It was conjectured in 1852 and proved only in 1976 by Appel and Haken, using a computer to check nearly 2000 configurations, the first major theorem proved with essential computer help.

### Hardness
Computing $\chi(G)$ exactly is NP-hard, and even deciding whether a graph is 3-colourable is NP-complete. Deciding 2-colourability, on the other hand, is just the BFS bipartite test. In practice, large colouring problems are solved with heuristics like greedy with good orderings, or with exact solvers on small instances.

@fig g10-graph-lab graph=wheel mode=optimal | The wheel with a 5-cycle rim needs 4 colours: 3 for the odd rim and 1 more for the hub.

### Common mistakes
Showing a colouring with $k$ colours proves only $\chi \le k$. To prove $\chi = k$ you also need a lower-bound argument, like a clique of size $k$ or an odd cycle when $k = 3$. Do not assume "no triangle" means "3 colours suffice for everything" or "2 colours suffice": the 5-cycle has no triangle and needs 3. And remember that greedy's answer depends on the order, so a greedy result is an upper bound, not the chromatic number.

### Summary
A proper colouring gives adjacent vertices different colours, and $\chi(G)$ is the fewest colours possible. Cliques and independent sets give lower bounds; greedy colouring gives the upper bound $\Delta + 1$, which Brooks' theorem improves to $\Delta$ except for complete graphs and odd cycles. Planar graphs need at most 4 colours. Computing $\chi$ is hard in general, but colouring models scheduling, frequency assignment and register allocation everywhere.

@viz g10-graph-lab graph=petersen mode=greedy | Compare greedy colourings with the optimal number of colours.

:::explore
**What to try**
1. On the Petersen graph, greedy in number order uses 3 colours. Switch the mode to "optimal": $\chi = 3$, since the outer 5-cycle is odd.
2. Switch to the wheel: 4 colours, the odd rim plus the hub. Its $\Delta + 1 = 6$, so the greedy bound is far from tight here.
3. Try $K_5$ (5 colours, $\Delta + 1 = 5$, one of Brooks' exceptions) and $C_5$ (3 colours, the other exception).
4. Switch to the 6-cycle, the cube and the grid: every method finds 2 colours, matching $\chi = 2$ for bipartite graphs, even though $\Delta + 1$ is 3, 4 and 5.

**What to notice:** the readout always reports $\Delta + 1$ as an upper bound, and the actual number is often far below it. Whenever optimal is 3, look for the odd cycle; whenever it is 4 or more, look for a clique or a wheel-like structure forcing it.
:::

:::formulas
$$\omega(G) \le \chi(G) \le \Delta(G) + 1, \qquad \chi(G) \ge \frac{n}{\alpha(G)}$$
$$\chi(K_n) = n, \quad \chi(C_{2k}) = 2, \quad \chi(C_{2k+1}) = 3, \quad \chi(\text{tree}) = 2 \;(n \ge 2)$$
$$\text{Brooks: } \chi(G) \le \Delta(G) \text{ unless } G \text{ is complete or an odd cycle}$$
$$\text{planar} \Rightarrow \chi(G) \le 4$$
$$\text{number of proper } k\text{-colourings: } P(K_n, k) = k(k-1)\cdots(k-n+1), \quad P(\text{tree on } n, k) = k(k-1)^{n-1}$$
:::

:::thm Greedy colouring bound
Every graph with maximum degree $\Delta$ has a proper colouring with at most $\Delta + 1$ colours, and the greedy algorithm finds one in any vertex order.
:::

:::proof
Process vertices in any order. When vertex $v$ is coloured, at most $\deg v \le \Delta$ of its neighbours already have colours, so at most $\Delta$ of the colours $1, \ldots, \Delta + 1$ are blocked. At least one is free; give $v$ the smallest free colour. No edge ever gets two equal colours, because the later endpoint avoided the earlier one's colour.
:::

:::steps Schedule exams for courses A–E with conflicts $AB, AC, BC, BD, CE, DE$
1. Lower bound: A, B, C form a triangle, so at least 3 slots.
2. Greedy in order A, B, C, D, E: A 1, B 2, C 3 (adjacent to A and B), D 1 (adjacent only to B among coloured), E 2 (adjacent to C = 3 and D = 1).
3. Check all six edges: 1–2, 1–3, 2–3, 2–1, 3–2, 1–2. All different.
4. So $\chi = 3$: slots {A, D}, {B, E}, {C}.
:::

:::steps How many proper 3-colourings does a path on 4 vertices have?
1. The first vertex can take any of 3 colours.
2. Each next vertex must differ only from its predecessor: 2 choices each.
3. Total $3 \times 2 \times 2 \times 2 = 24$, which is $k(k-1)^{n-1}$ with $k = 3$, $n = 4$.
:::

:::mock Exam question
(a) What is $\chi$ of the cycle $C_7$, and of $K_{4,6}$? (b) A graph has maximum degree 4 and is neither complete nor an odd cycle. What upper bound on $\chi$ does Brooks' theorem give? (c) A graph on 12 vertices has largest independent set of size 3. Give a lower bound on $\chi$.
:::solution
(a) $C_7$ is an odd cycle: $\chi = 3$. $K_{4,6}$ is bipartite with edges: $\chi = 2$. (b) $\chi \le \Delta = 4$. (c) Each colour class has at most 3 vertices, so $\chi \ge 12/3 = 4$.
:::
:::

:::cs
Compilers perform register allocation by colouring an interference graph: variables are vertices, an edge means two variables are alive at the same moment, and colours are CPU registers. If the graph needs more colours than there are registers, some variables are "spilled" to memory. Chaitin's classic allocator is greedy colouring with a smart ordering.
:::

:::ml
Distributed training and parallel Gibbs sampling use colourings to decide which variables can be updated at the same time: vertices of the same colour have no edges between them, so they can be processed in parallel without conflicts. Sudoku and other constraint problems are solved by graph colouring search, a classic benchmark for constraint solvers.
:::

:::real
Mobile phone networks assign frequencies to towers so that nearby towers never share one; this is colouring the graph where edges join towers whose signals overlap. Every printed political map can be coloured with just four colours, by the four colour theorem.
:::

:::quiz
? What is the chromatic number of $C_9$?
= 3
> Odd cycles need 3 colours.

? A graph contains a clique on 5 vertices. Which must be true?
+ $\chi \ge 5$
- $\chi \le 5$
- $\chi = 5$
> The clique's vertices need distinct colours; other parts might need even more.

? Greedy colouring on a graph with maximum degree 7 uses at most how many colours?
= 8
> At most $\Delta + 1$.

? How many proper 2-colourings does a tree on 6 vertices have?
= 2
> $k(k-1)^{n-1} = 2 \times 1^5 = 2$: choose the root's colour, the rest is forced.

? Which graphs have $\chi \le 2$?
+ exactly the bipartite graphs
- exactly the trees
- exactly the planar graphs
> A 2-colouring is a bipartition.

? What is the maximum number of colours ever needed for a planar graph?
= 4
> The four colour theorem.
:::

# Unit: Directed graphs and flows

## Lesson: Directed graphs, DAGs and topological sort {#directed-graphs}
@summary: Edges with a direction: in- and out-degree, reachability and strongly connected components, directed acyclic graphs, and ordering tasks so every prerequisite comes first with Kahn's algorithm or DFS.

### When relationships have a direction
Many relationships only go one way. "Course A is a prerequisite of course B" does not mean B is a prerequisite of A. A web page can link to another without being linked back. Twitter-style "follows" are one-directional. Package managers know that library X depends on library Y. To model these, we give each edge a direction and draw it as an arrow.

:::def Directed graph (digraph)
A directed graph has vertices and directed edges (arcs); each arc $(u, v)$ goes from its tail $u$ to its head $v$. The out-degree of $v$ is the number of arcs leaving $v$, and the in-degree is the number arriving.
:::

Each arc adds one to exactly one out-degree and one in-degree, so the directed handshake lemma is $\sum_v \deg^+(v) = \sum_v \deg^-(v) = m$. Walks, paths and cycles are defined as before, except they must follow the arrows. So in a directed graph, $u$ can reach $v$ without $v$ being able to reach $u$.

### Strong connectivity
In a directed graph, "connected" splits into two ideas. A digraph is **strongly connected** if every vertex can reach every other vertex following arrows. It is **weakly connected** if it would be connected after ignoring directions. A one-way street system is usable only if it is strongly connected; otherwise some addresses can be entered but never left. Every digraph splits into **strongly connected components** (SCCs): maximal groups of vertices that can all reach each other. If you shrink each SCC to a single vertex, the result has no directed cycles, because any cycle between components would merge them into one. Tarjan's and Kosaraju's algorithms find all SCCs in $O(n + m)$ time using DFS.

### Directed acyclic graphs
A **directed acyclic graph** (DAG) is a digraph with no directed cycle. DAGs are the natural shape of dependencies: prerequisites, build steps, spreadsheets where each cell depends on others, the computation graph of a neural network. A cycle in a dependency graph would be a disaster: A needs B first, B needs C first, and C needs A first, so nothing can ever start.

:::def Topological order
A topological order of a digraph is a listing of all its vertices such that for every arc $(u, v)$, $u$ comes before $v$.
:::

### Imagine getting dressed
Imagine getting dressed in the morning. Undershorts must go on before trousers, trousers before shoes and before the belt, socks before shoes, the shirt before the tie and belt, and the tie and belt before the jacket. The watch can go on any time. Draw an arrow from each item to everything that must come after it, and you have a DAG. Any order in which you can actually get dressed is a topological order: for example undershorts, socks, shirt, watch, trousers, tie, shoes, belt, jacket. There can be many valid orders, and putting your shoes on before your socks is not one of them.

### Kahn's algorithm
How do we find a topological order? Some item must go first, and it must have no prerequisites, that is, **in-degree 0**. Kahn's algorithm repeatedly takes such a vertex:
1. Compute every in-degree. Put all in-degree-0 vertices in a queue.
2. Remove a vertex $u$ from the queue and append it to the output.
3. For each arc $(u, v)$, decrease $v$'s in-degree by 1, as if crossing off a satisfied prerequisite. If it becomes 0, add $v$ to the queue.
4. Repeat until the queue is empty.

Small example: arcs $A \to B$, $A \to C$, $B \to D$, $C \to D$, $D \to E$. In-degrees: A 0, B 1, C 1, D 2, E 1. Output A; B and C drop to 0. Output B; D drops to 1. Output C; D drops to 0. Output D; E drops to 0. Output E. Order: A, B, C, D, E. (A, C, B, D, E is the only other valid order.)

If the queue empties before every vertex is output, the remaining vertices all still have positive in-degree, and that only happens when they contain a directed cycle. So Kahn's algorithm is also a **cycle detector**. This proves the key theorem: **a digraph has a topological order if and only if it is a DAG**. Each vertex and arc is handled once, so it runs in $O(n + m)$.

The other classic method uses DFS: when DFS finishes a vertex (all its descendants are done), push it on a list. Reversing the finishing order gives a topological order, because when an arc $u \to v$ is explored, $v$ always finishes before $u$ in a DAG.

### Longest paths and scheduling
In a general graph, finding the longest path is hard, but in a DAG it is easy: process vertices in topological order and set $\text{finish}(v) = \text{duration}(v) + \max$ over prerequisites $u$ of $\text{finish}(u)$. The largest finish time is the length of the **critical path**, the minimum time to complete a project if unlimited workers can do independent tasks in parallel. Tasks on the critical path cannot be delayed without delaying the whole project.

@fig g10-dag dag=dressing | Getting dressed as a DAG: each arrow points from an item to something that must come later.

### Common mistakes
A topological order is usually not unique; do not mark an answer wrong just because it differs from yours. Check it arc by arc. Topological sorting is only defined for DAGs. Also be careful with arrow direction conventions: "A depends on B" is often drawn as $B \to A$ (B must come first), and mixing conventions reverses your order.

### Summary
Directed graphs have in- and out-degrees, and reachability is one-way. Strongly connected components group mutually reachable vertices, and shrinking them leaves a DAG. A digraph has a topological order exactly when it has no directed cycle. Kahn's algorithm (repeatedly remove an in-degree-0 vertex) and reversed DFS finishing times both find one in $O(n + m)$, and in a DAG longest paths give critical-path schedules.

@viz g10-dag dag=dressing | Step through Kahn's algorithm, then add a cycle and watch it get stuck.

:::explore
**What to try**
1. Press Step repeatedly. Yellow vertices are ready (in-degree 0); blue ones are already in the output with their position number.
2. Watch in-degrees drop as prerequisites are output. Shoes become ready only after undershorts, socks and trousers are output.
3. Read the final order and the longest chain (4 items: undershorts, trousers, belt, jacket), the critical path.
4. Choose "Add an edge that makes a cycle" (jacket before shirt) and play again. Kahn's algorithm gets stuck after 5 of 9 items.
5. Switch to the "courses" DAG and repeat. Its longest chain has 5 courses.

**What to notice:** a vertex becomes ready exactly when all its arrows-in have been crossed off, just like the article's in-degree argument. When there is a cycle, every vertex left has an incoming arrow from another vertex left, so none can ever start.
:::

:::formulas
$$\sum_v \deg^+(v) = \sum_v \deg^-(v) = m$$
$$\text{topological order exists} \iff \text{no directed cycle}$$
$$\text{finish}(v) = d(v) + \max_{(u,v)\in E} \text{finish}(u) \quad (\max \text{ over nothing} = 0)$$
$$\text{Kahn and DFS topological sort: } O(n + m)$$
:::

:::thm DAGs and topological orders
A directed graph has a topological order if and only if it has no directed cycle.
:::

:::proof
If there is a cycle $v_1 \to v_2 \to \cdots \to v_k \to v_1$, a topological order would need $v_1$ before $v_2$ before ... before $v_k$ before $v_1$, impossible. Conversely, a DAG always has a vertex of in-degree 0: otherwise, walking backwards along incoming arcs forever from any vertex must eventually repeat a vertex, giving a cycle. Put such a vertex first, delete it (the rest is still a DAG) and repeat; by induction this lists all vertices with every arc pointing forward.
:::

:::steps Topologically sort: $5 \to 0$, $5 \to 2$, $4 \to 0$, $4 \to 1$, $2 \to 3$, $3 \to 1$
1. In-degrees: 0: 2, 1: 2, 2: 1, 3: 1, 4: 0, 5: 0. Queue [4, 5].
2. Output 4: in-degree of 0 becomes 1, of 1 becomes 1. Output 5: 0 becomes 0, 2 becomes 0. Queue [0, 2].
3. Output 0. Output 2: 3 becomes 0. Output 3: 1 becomes 0. Output 1.
4. Order: 4, 5, 0, 2, 3, 1. Check each arc points forward: yes.
:::

:::steps Critical path: tasks A (3 days), B (2), C (4), D (1), with $A \to B$, $A \to C$, $B \to D$, $C \to D$
1. Topological order A, B, C, D.
2. finish(A) $= 3$; finish(B) $= 2 + 3 = 5$; finish(C) $= 4 + 3 = 7$.
3. finish(D) $= 1 + \max(5, 7) = 8$.
4. The project takes 8 days; the critical path is A, C, D. B has 2 days of slack.
:::

:::mock Exam question
A digraph has arcs $a \to b$, $b \to c$, $c \to a$, $c \to d$, $d \to e$, $e \to d$. (a) List its strongly connected components. (b) Does it have a topological order? (c) Shrink each SCC to one vertex; what graph do you get, and what is its topological order?
:::solution
(a) $\{a, b, c\}$ (they form a cycle) and $\{d, e\}$ (they reach each other). (b) No, it has directed cycles. (c) Two vertices with one arc $\{a,b,c\} \to \{d,e\}$; topological order: $\{a,b,c\}$ then $\{d,e\}$.
:::
:::

:::ml
Every neural network is a computation DAG. The forward pass evaluates nodes in topological order; backpropagation visits them in reverse topological order, applying the chain rule at each node. Frameworks like PyTorch and TensorFlow build this DAG and sort it automatically. Bayesian networks are DAGs too, where each arrow means "directly influences".
:::

:::cs
Build systems (make, Bazel), package managers (apt, npm, pip) and spreadsheet recalculation all topologically sort dependency DAGs, and report an error when they find a cycle ("circular dependency"). Course schedulers, task runners and data pipelines (Airflow DAGs) do the same.
:::

:::real
A recipe is a DAG: you must boil the water before adding pasta, and chop vegetables before frying them, but chopping and boiling can happen in parallel. The critical path tells you the earliest time dinner can be ready.
:::

:::quiz
? A digraph has 12 arcs. What is the sum of all in-degrees?
= 12
> Each arc adds 1 to exactly one in-degree.

? Which vertex can come first in a topological order?
+ a vertex with in-degree 0
- a vertex with out-degree 0
- any vertex
> The first vertex cannot have any prerequisite.

? Kahn's algorithm stops with 3 vertices never output. What does that mean?
+ the graph contains a directed cycle
- the graph is disconnected
- there are 3 isolated vertices
> Remaining vertices all have positive in-degree from each other, which forces a cycle.

? How many topological orders does the DAG with arcs $A \to B$, $A \to C$ (and nothing else) have?
= 2
> A first, then B and C in either order.

? Tasks X (2 h), Y (5 h), Z (1 h) with $X \to Z$ and $Y \to Z$. What is the minimum completion time with parallel work?
= 6
> finish(Z) $= 1 + \max(2, 5) = 6$.

? In backpropagation, nodes of the computation graph are processed in:
- topological order
+ reverse topological order
- BFS order from the input
> Gradients flow from the loss back to the inputs.
:::

## Lesson: Network flows and the max-flow min-cut theorem {#network-flows}
@summary: Sending as much as possible from a source to a sink through capacity-limited edges: flows, residual graphs, augmenting paths, Ford–Fulkerson and Edmonds–Karp, and the theorem that maximum flow equals minimum cut.

### How much can the pipes carry?
A city's water comes from a reservoir $s$ and is used at a treatment plant $t$, connected by a network of pipes. Each pipe can carry at most a certain amount of water per second, its **capacity**, and water flows only one way in each pipe. What is the most water per second the network can deliver from $s$ to $t$? The same question asks how many cars per hour a road network can carry from one side of a city to another, how much data per second can travel between two servers, or how many goods can be shipped from a factory to a port.

:::def Flow network
A flow network is a directed graph with a source $s$, a sink $t$, and a capacity $c(u,v) \ge 0$ on each arc.
:::

:::def Flow
A flow assigns $f(u,v)$ to each arc with $0 \le f(u,v) \le c(u,v)$ (capacity constraint) and, at every vertex other than $s$ and $t$, flow in equals flow out (conservation). Its value $|f|$ is the net flow out of $s$.
:::

### A first attempt: push along paths
The natural idea is: find a path from $s$ to $t$ where every arc still has spare capacity, push as much as the tightest arc allows (the **bottleneck**), and repeat. Take the network with arcs $s \to a$ (3), $s \to b$ (2), $a \to b$ (1), $a \to t$ (2), $b \to t$ (3). Push 2 along $s \to a \to t$. Push 2 along $s \to b \to t$. Now $s \to a$ has 1 spare, $a \to b$ has 1 and $b \to t$ has 1: push 1 along $s \to a \to b \to t$. Total 5, and both arcs out of $s$ are full, so 5 is clearly the maximum.

But this naive method can get stuck. In the "trap" network where every arc has capacity 1 ($s \to a$, $s \to b$, $a \to b$, $a \to t$, $b \to t$), suppose the first path chosen is $s \to a \to b \to t$. Now $s \to a$, $a \to b$ and $b \to t$ are full. The only spare arcs are $s \to b$ and $a \to t$, and no forward path joins them. We are stuck at 1, but the true maximum is 2 (use $s \to a \to t$ and $s \to b \to t$). The first choice was a mistake, and we need a way to undo it.

### Residual graphs: allowing undo
The fix is to allow sending flow *backwards* along an arc that carries flow, which means cancelling some of it. The **residual graph** has, for each arc $(u,v)$, a forward residual arc with capacity $c(u,v) - f(u,v)$ (room left) and a backward residual arc $(v,u)$ with capacity $f(u,v)$ (flow that could be cancelled). An **augmenting path** is any $s$–$t$ path in the residual graph.

In the trap, after the bad first path, the residual graph contains the backward arc $b \to a$ (capacity 1). Now $s \to b \to a \to t$ is an augmenting path: send 1 unit from $s$ to $b$, "cancel" the unit that went $a \to b$, and send it from $a$ to $t$ instead. The net result is flow on $s \to a \to t$ and $s \to b \to t$: value 2.

### Ford–Fulkerson and Edmonds–Karp
The **Ford–Fulkerson method** is: start with zero flow; while the residual graph has an augmenting path, push the bottleneck amount along it. With integer capacities each augmentation adds at least 1, so it terminates, and the final flow is integer on every arc (the **integrality theorem**). But a bad choice of paths can take a very long time. **Edmonds–Karp** always picks a *shortest* augmenting path (fewest arcs) using BFS, and this guarantees at most $O(nm)$ augmentations, $O(nm^2)$ time overall.

### Cuts, and why the answer is optimal
An **$s$–$t$ cut** splits the vertices into a set $S$ containing $s$ and the rest $T$ containing $t$. Its capacity is the total capacity of arcs going from $S$ to $T$. Every unit of flow must cross from $S$ to $T$ at some point, so **every flow is at most every cut**: $|f| \le c(S, T)$. In the small example, the cut $S = \{s\}$ has capacity $3 + 2 = 5$, so no flow can exceed 5, and our flow of 5 is proved optimal.

The **max-flow min-cut theorem** says this always works: the maximum flow value equals the minimum cut capacity. When Ford–Fulkerson stops, let $S$ be the vertices reachable from $s$ in the residual graph. Every arc from $S$ to $T$ must be full (otherwise its far end would be reachable), and every arc from $T$ to $S$ must be empty (otherwise its backward residual arc would make its tail reachable). So the flow across the cut equals its capacity exactly, and the flow is maximum.

@fig g10-flow net=small | Labels are flow/capacity. The maximum flow 5 equals the capacity of the cut around s.

### Matching as a flow
Bipartite matching is a special case. Add a source joined to every left vertex and a sink joined from every right vertex, give every arc capacity 1, and direct the middle edges left to right. An integer flow of value $k$ is exactly a matching of size $k$, and augmenting paths in the flow network are the alternating augmenting paths of the matching lesson. The min cut corresponds to König's minimum vertex cover.

### Common mistakes
Forgetting backward residual arcs is the most common error; without them the method can stop at a non-maximum flow. When computing a cut's capacity, count only arcs going from $S$ to $T$, not arcs from $T$ back to $S$. And the flow value is measured at the source (or equivalently at the sink), not by adding flows over all arcs.

### Summary
A flow respects capacities and conservation. Augmenting along $s$–$t$ paths in the residual graph, where backward arcs allow undoing earlier choices, is the Ford–Fulkerson method; choosing shortest paths (Edmonds–Karp) gives $O(nm^2)$ time. Every cut bounds every flow, and the max-flow min-cut theorem says the best flow meets the smallest cut. With integer capacities the maximum flow can be chosen integral, which makes matching and many assignment problems special cases.

@viz g10-flow net=classic | Step through augmenting paths and watch the minimum cut appear at the end.

:::explore
**What to try**
1. With "Shortest path first (Edmonds–Karp)", press Step. The augmenting paths are $s \to a \to c \to t$ (4), $s \to a \to d \to t$ (6), $s \to b \to d \to t$ (4) and $s \to b \to d \to c \to t$ (5).
2. After the last step the readout reports maximum flow 19 and colours the vertices still reachable from $s$ in the residual graph. The red dashed arcs leaving them form the minimum cut: $s \to a$ (10) and $b \to d$ (9), capacity 19.
3. Switch to "First path found (DFS)" and run again. Some paths use backward residual arcs ("cancels earlier flow"), and more augmentations are needed, but the final value is again 19.
4. Choose the "trap" network with DFS: the first path $s \to a \to b \to t$ blocks everything, and the second path uses the backward arc $b \to a$ to fix it.
5. Choose "matching": the flow computes a maximum matching of 4 workers to 4 jobs.

**What to notice:** the final flow value always equals the capacity of the red cut, which is the max-flow min-cut theorem in action. Different path choices change the route, never the final value.
:::

:::formulas
$$0 \le f(u,v) \le c(u,v), \qquad \sum_{u} f(u,v) = \sum_{w} f(v,w) \;\; (v \ne s,t)$$
$$|f| = \sum_v f(s,v) - \sum_v f(v,s)$$
$$c_f(u,v) = c(u,v) - f(u,v), \qquad c_f(v,u) = f(u,v) \quad \text{(residual capacities)}$$
$$c(S,T) = \sum_{u \in S,\, v \in T} c(u,v), \qquad |f| \le c(S,T)$$
$$\max_f |f| = \min_{(S,T)} c(S,T); \qquad \text{Edmonds–Karp: } O(nm^2)$$
:::

:::thm Max-flow min-cut theorem
In any flow network, the maximum value of an $s$–$t$ flow equals the minimum capacity of an $s$–$t$ cut.
:::

:::proof
For any flow and cut, every unit leaving $s$ must cross from $S$ to $T$, and flow coming back from $T$ to $S$ only reduces the net, so $|f| \le c(S,T)$. Now take a flow $f$ with no augmenting path, and let $S$ be the vertices reachable from $s$ in the residual graph; $t \notin S$. Every arc $u \to v$ with $u \in S$, $v \in T$ has $f(u,v) = c(u,v)$ (else $v$ would be reachable), and every arc $v \to u$ from $T$ to $S$ has $f = 0$ (else the backward arc $u \to v$ would exist). Hence $|f| = c(S,T)$, so this flow is maximum and this cut is minimum.
:::

:::steps Max flow: $s \to a$ (4), $s \to b$ (3), $a \to b$ (2), $a \to t$ (2), $b \to t$ (5)
1. Augment $s \to a \to t$ by 2 ($a \to t$ is now full).
2. Augment $s \to b \to t$ by 3 ($s \to b$ full; $b \to t$ has 2 left).
3. Augment $s \to a \to b \to t$ by $\min(2, 2, 2) = 2$.
4. Total $2 + 3 + 2 = 7$. Cut $S = \{s\}$: $4 + 3 = 7$. Equal, so 7 is maximum.
:::

:::steps Compute the capacity of the cut $S = \{s, a\}$ in the same network
1. Arcs from $S$ to $T = \{b, t\}$: $s \to b$ (3), $a \to b$ (2), $a \to t$ (2).
2. Capacity $3 + 2 + 2 = 7$.
3. This is also a minimum cut: minimum cuts need not be unique.
:::

:::mock Exam question
A network has arcs $s \to a$ (5), $s \to b$ (4), $a \to b$ (3), $a \to t$ (3), $b \to t$ (6). (a) Find the maximum flow. (b) Give a minimum cut and its capacity. (c) If the capacity of $a \to t$ is increased to 10, what is the new maximum flow?
:::solution
(a) Push $s \to a \to t$: 3. Push $s \to b \to t$: 4. Push $s \to a \to b \to t$: $\min(2, 3, 2) = 2$. Total 9, with $s \to a$ (5) and $s \to b$ (4) full. (b) $S = \{s\}$, capacity $5 + 4 = 9$. (c) Still 9: the cut around $s$ has capacity 9 regardless of $a \to t$.
:::
:::

:::cs
Max flow solves bipartite matching, project selection, image segmentation (graph cuts separate foreground from background by a minimum cut), baseball elimination (can a team still finish first?) and network reliability (the minimum number of links whose failure disconnects two servers is a min cut with unit capacities).
:::

:::ml
Graph-cut methods were the standard for image segmentation and stereo vision before deep learning: pixel labels that minimise an energy are found exactly by a minimum cut. Optimal transport, used in generative models and domain adaptation, is a min-cost flow problem, and the Wasserstein distance between histograms is computed by min-cost flow algorithms.
:::

:::real
Airlines and logistics companies use flow models to route aircraft, crews and freight. During the Cold War, the US Air Force studied the Soviet rail network as a flow problem; the min cut identified the smallest set of rail links whose removal would stop the most traffic, one of the original motivations for the theorem.
:::

:::quiz
? An arc has capacity 7 and carries flow 4. What are its forward and backward residual capacities?
+ 3 forward, 4 backward
- 4 forward, 3 backward
- 7 forward, 0 backward
> Forward room is $7 - 4 = 3$; up to 4 units can be cancelled.

? Every flow value is at most:
- every path's bottleneck
+ every cut's capacity
- the number of vertices
> All flow from $s$ to $t$ must cross the cut.

? The arcs out of $s$ have capacities 6, 4 and 5. What is the largest possible maximum flow?
= 15
> The cut $\{s\}$ has capacity 15, so the flow cannot exceed it.

? Why does Ford–Fulkerson need backward residual arcs?
+ to undo earlier flow choices that block better routes
- to send flow from $t$ back to $s$
- to make the graph undirected
> Without them the algorithm can get stuck at a non-maximum flow.

? With all capacities integers, the max flow:
+ can be chosen with integer flow on every arc
- is always the number of arcs
- may need fractional flows
> The integrality theorem: each augmentation adds an integer amount.
:::

# Unit: Graphs in machine learning

## Lesson: Graphs in machine learning {#graphs-ml}
@summary: How ML uses graphs: adjacency and degree matrices, random walks and PageRank, the graph Laplacian and spectral clustering, and graph neural networks with message passing.

### Data that is made of connections
Most ML methods start with a table: one row per example, independent of the others. But much of the world's data is about relationships. Molecules are atoms joined by bonds. Social networks are people joined by friendships. Road maps, citation networks, protein interaction networks, knowledge bases ("Paris — capital of — France") and recommendation data are all graphs. Even ordinary data becomes a graph when we connect each point to its nearest neighbours. This lesson shows how the graph theory you have learned turns into linear algebra that machine learning can use.

### Graphs as matrices
Number the vertices $1$ to $n$. The **adjacency matrix** $A$ has $A_{ij} = 1$ if $i$ and $j$ are adjacent (or the edge weight), and 0 otherwise. The **degree matrix** $D$ is diagonal with $D_{ii} = \deg i$. Two facts from earlier lessons now become matrix facts. Row sums of $A$ are degrees. And $(A^k)_{ij}$ counts walks of length $k$ from $i$ to $j$, so powers of $A$ describe how information spreads $k$ steps through the graph.

For a path $1 - 2 - 3$:
$$A = \begin{pmatrix} 0 & 1 & 0 \\ 1 & 0 & 1 \\ 0 & 1 & 0 \end{pmatrix}, \quad D = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 1 \end{pmatrix}.$$

### Building a graph from ordinary data
Even when data arrives as a plain table, we can create a graph from it. The most common recipe is the **$k$-nearest-neighbour graph**: make each data point a vertex and join it to the $k$ points closest to it. Another is the **similarity graph**, where every pair of points $i, j$ gets an edge with weight $w_{ij} = e^{-\|x_i - x_j\|^2 / (2\sigma^2)}$, close to 1 for nearby points and close to 0 for distant ones. For example, with $\sigma = 1$, two points at distance 1 get weight $e^{-0.5} \approx 0.61$ and two points at distance 3 get $e^{-4.5} \approx 0.011$. The graph keeps only local information, "who is near whom", and forgets the global coordinates. That is exactly what we want when the data lies on a curved surface, like points on a rolled-up sheet of paper, where straight-line distance is misleading but distances along the graph follow the sheet. Methods such as Isomap, UMAP and spectral clustering all start by building such a graph and then analyse it with the tools below.

### Random walks and PageRank
Imagine a web surfer who, on each page, clicks a random link. The probability of moving from $i$ to $j$ is $A_{ij}/\deg^+(i)$, so the transition matrix is $P = D^{-1}A$, a Markov chain on the graph. After many clicks, the fraction of time the surfer spends on each page settles down to a **stationary distribution** $\pi$ with $\pi = \pi P$. Pages that are linked to by many important pages are visited more, which is exactly what "important" should mean.

Google's **PageRank** adds one twist: with probability $1 - d$ (typically $d = 0.85$) the surfer gets bored and jumps to a uniformly random page. This guarantees the chain has a unique stationary distribution and handles dead ends. The update is
$$PR(v) = \frac{1 - d}{n} + d \sum_{u \to v} \frac{PR(u)}{\deg^+(u)}.$$
For three pages with links $A \to B$, $A \to C$, $B \to C$, $C \to A$ and starting scores $\tfrac{1}{3}$ each, one update gives $PR(A) = 0.05 + 0.85 \cdot \tfrac{1}{3} \approx 0.333$, $PR(B) = 0.05 + 0.85 \cdot \tfrac{1}{6} \approx 0.192$, $PR(C) = 0.05 + 0.85 \cdot (\tfrac{1}{6} + \tfrac{1}{3}) = 0.475$. Page C, linked by both others, rises; repeated updates converge to the PageRank vector.

### The graph Laplacian
The single most important matrix in graph-based ML is the **Laplacian** $L = D - A$. Its magic is the quadratic form
$$x^\top L x = \sum_{\{i,j\} \in E} (x_i - x_j)^2.$$
If $x$ assigns a number to each vertex, $x^\top L x$ measures how much $x$ changes across edges: it is small when neighbours have similar values, i.e. when $x$ is **smooth** on the graph. For the path above with $x = (1, 0, -1)$, the edges contribute $(1 - 0)^2 + (0 - (-1))^2 = 2$.

Consequences follow quickly. Every row of $L$ sums to 0, so the all-ones vector has $L\mathbf{1} = 0$: eigenvalue 0. Since $x^\top L x \ge 0$, all eigenvalues are non-negative. And $x^\top L x = 0$ exactly when $x$ is constant on each connected component, so **the number of zero eigenvalues of $L$ equals the number of connected components**. For the path $1 - 2 - 3$ the eigenvalues are 0, 1 and 3, with eigenvectors $(1,1,1)$, $(1,0,-1)$ and $(1,-2,1)$.

### Spectral clustering
If a graph is *almost* disconnected, two clusters joined by a few edges, then $L$ has one eigenvalue near 0 besides the true 0. Its eigenvector (the **Fiedler vector**, for the second-smallest eigenvalue) is nearly constant on each cluster with different values, so the sign of each entry tells you which cluster the vertex belongs to. **Spectral clustering** builds a similarity graph on the data, computes the first few eigenvectors of the Laplacian, and clusters the points using those eigenvector coordinates. It finds clusters of strange shapes, like two interlocking rings, that $k$-means on the raw coordinates cannot.

### Graph neural networks
A **graph neural network** gives every vertex a feature vector $h_v$ (an atom's type, a user's profile) and updates it by **message passing**: each vertex collects its neighbours' vectors, aggregates them (sum, mean or max), and combines the result with its own vector through a learned layer:
$$h_v^{(k+1)} = \sigma\Big(W^{(k)} \cdot \operatorname{mean}\{h_u^{(k)} : u \in N(v) \cup \{v\}\}\Big).$$
After $k$ layers, $h_v$ depends on everything within distance $k$, the BFS ball of radius $k$, which is the same spreading that $A^k$ describes. The popular GCN layer uses the normalised matrix $\hat{A} = \tilde{D}^{-1/2}(A + I)\tilde{D}^{-1/2}$, where $\tilde D$ is the degree matrix of $A + I$, and computes $H^{(k+1)} = \sigma(\hat{A} H^{(k)} W^{(k)})$. Aggregation does not depend on how vertices are numbered, so GNNs respect the graph's structure: relabelling the vertices relabels the outputs the same way.

### Common mistakes
Do not feed an adjacency matrix row as an ordinary feature vector to a standard network: the result changes when vertices are renumbered. Remember that the Laplacian's smallest eigenvalue is always 0, so the useful clustering information is in the *next* eigenvectors. And stacking too many GNN layers makes all vertex features converge to the same value (**over-smoothing**), because repeated averaging is exactly the smoothing that the Laplacian measures.

### Summary
Graphs become matrices: $A$ counts walks, $D$ holds degrees, $P = D^{-1}A$ is a random walk, and PageRank is its damped stationary distribution. The Laplacian $L = D - A$ measures smoothness, $x^\top L x = \sum (x_i - x_j)^2$; its zero eigenvalues count components and its next eigenvectors reveal clusters. GNNs pass messages along edges so that $k$ layers see $k$-hop neighbourhoods.

@viz g10-graph-lab graph=grid mode=walks k=2 | Powers of the adjacency matrix: how far information spreads in k steps.

:::explore
**What to try**
1. With walk length $k = 2$ and start vertex 0 (a corner of the grid), read the row of $A^2$: 2 walks back to 0, and 2 walks to the centre vertex 4.
2. Increase $k$ step by step. Note which vertices have non-zero counts: after $k$ steps only vertices within distance $k$ can be reached, and on this bipartite grid only those at the right parity.
3. Click the centre vertex 4 to start there. Its counts grow fastest, because it has the highest degree.
4. Think of each count as how strongly a GNN with $k$ layers mixes that vertex's features into vertex 0's.

**What to notice:** $A^k$ is the "receptive field" of a $k$-layer message-passing network, the same BFS ball from earlier lessons. High-degree vertices receive and send many more walks, which is why GCNs normalise by degree.
:::

@viz g10-graph-lab graph=disconnected mode=components | Components and the Laplacian's zero eigenvalues.

:::explore
**What to try**
1. Read the number of components: 3 (a triangle, a path of three vertices, and an isolated vertex).
2. For each component, imagine the vector that is 1 on that component and 0 elsewhere. Every edge has both ends equal, so $x^\top L x = 0$: three independent zero-eigenvectors.
3. Turn on edit mode and add one edge between the triangle and the path. The count drops to 2, and so does the number of zero eigenvalues.

**What to notice:** the multiplicity of eigenvalue 0 of $L$ is exactly the number of components. Spectral clustering looks for eigenvalues that are *almost* 0, signalling components that are almost separate.
:::

:::formulas
$$L = D - A, \qquad x^\top L x = \sum_{\{i,j\} \in E} w_{ij}(x_i - x_j)^2 \ge 0$$
$$\#\{\text{zero eigenvalues of } L\} = \#\text{components}$$
$$P = D^{-1}A, \qquad \pi = \pi P$$
$$PR(v) = \frac{1-d}{n} + d \sum_{u \to v} \frac{PR(u)}{\deg^+(u)}$$
$$H^{(k+1)} = \sigma\big(\tilde{D}^{-1/2}(A + I)\tilde{D}^{-1/2} H^{(k)} W^{(k)}\big)$$
:::

:::thm Laplacian quadratic form
For an undirected graph with Laplacian $L = D - A$, $x^\top L x = \sum_{\{i,j\} \in E}(x_i - x_j)^2$ for every vector $x$. Hence $L$ is positive semidefinite, and the dimension of its null space equals the number of connected components.
:::

:::proof
$x^\top D x = \sum_i \deg(i)\, x_i^2$ and $x^\top A x = \sum_{i,j} A_{ij} x_i x_j = 2\sum_{\{i,j\}\in E} x_i x_j$. Each edge $\{i,j\}$ contributes $x_i^2 + x_j^2$ to the first sum, so $x^\top L x = \sum_{\{i,j\} \in E}(x_i^2 + x_j^2 - 2x_i x_j) = \sum_{\{i,j\}\in E} (x_i - x_j)^2 \ge 0$. This is 0 exactly when $x_i = x_j$ across every edge, i.e. $x$ is constant on each component. Those vectors form a space spanned by the component indicator vectors, of dimension equal to the number of components.
:::

:::steps Compute the Laplacian of the path $1 - 2 - 3$ and check an eigenvector
1. $D = \operatorname{diag}(1, 2, 1)$, so $L = D - A = \begin{pmatrix} 1 & -1 & 0 \\ -1 & 2 & -1 \\ 0 & -1 & 1 \end{pmatrix}$.
2. Row sums are $0, 0, 0$, so $L\mathbf{1} = 0$.
3. $L(1, 0, -1)^\top = (1, 0, -1)^\top$: eigenvalue 1, the Fiedler vector, separating vertex 1 from vertex 3.
4. $L(1, -2, 1)^\top = (3, -6, 3)^\top$: eigenvalue 3. Check: $0 + 1 + 3 = 4 = \operatorname{trace} L$.
:::

:::steps One mean-aggregation GNN step on the path $1 - 2 - 3$ with scalar features $h = (1, 0, 0)$
1. Vertex 1 averages itself and vertex 2: $(1 + 0)/2 = 0.5$.
2. Vertex 2 averages vertices 1, 2, 3: $(1 + 0 + 0)/3 = 1/3$.
3. Vertex 3 averages itself and vertex 2: $(0 + 0)/2 = 0$.
4. New features $(0.5, 0.333, 0)$: the signal at vertex 1 has spread one hop. After a second step it reaches vertex 3.
:::

:::mock Exam question
(a) Write the Laplacian of the triangle $K_3$ and find $x^\top L x$ for $x = (1, 2, 4)$. (b) A graph's Laplacian has eigenvalues $0, 0, 0, 1.2, 3.5, 4.1$. How many connected components does it have? (c) With $n = 4$ pages and $d = 0.85$, what is the PageRank of a page that no other page links to (after one update)?
:::solution
(a) $L = \begin{pmatrix} 2 & -1 & -1 \\ -1 & 2 & -1 \\ -1 & -1 & 2\end{pmatrix}$; $x^\top L x = (1-2)^2 + (2-4)^2 + (1-4)^2 = 1 + 4 + 9 = 14$. (b) Three zero eigenvalues: 3 components. (c) Only the random-jump term remains: $(1 - 0.85)/4 = 0.0375$.
:::
:::

:::ml
GNNs predict molecular properties for drug discovery, detect fraud in transaction networks, recommend content (PinSage at Pinterest), and forecast travel times (Google Maps uses GNNs on road segments). Knowledge-graph embeddings such as TransE learn vectors so that "head + relation ≈ tail". Label propagation and graph-regularised semi-supervised learning add the penalty $\lambda\, f^\top L f$ so predictions are smooth across similar examples. Transformers can be viewed as GNNs on a complete graph, where attention weights are learned edge weights.
:::

:::cs
PageRank and its relatives rank web pages, academic papers and influential accounts. Community detection in social networks uses spectral methods and modularity. Graph databases and query engines store knowledge graphs for search and question answering.
:::

:::real
When a map app estimates your arrival time, it treats roads as a graph whose edges carry live traffic speeds, and models predict how congestion on one road spreads to its neighbours, which is message passing on the road network.
:::

:::quiz
? What does every row of a graph Laplacian $L = D - A$ sum to?
= 0
> The diagonal entry is the degree and the row contains $-1$ once per neighbour.

? A graph's Laplacian has eigenvalue 0 with multiplicity 4. How many connected components?
= 4
> The null space is spanned by the component indicator vectors.

? For the path $1 - 2 - 3$ and $x = (2, 2, 5)$, what is $x^\top L x$?
= 9
> $(2-2)^2 + (2-5)^2 = 9$.

? After 3 message-passing layers, a vertex's representation can depend on vertices up to what distance?
= 3
> Each layer adds one hop.

? In PageRank with $d = 0.85$ and $n = 100$ pages, what is the random-jump term $(1-d)/n$?
= 0.0015|3/2000
> $0.15/100 = 0.0015$.

? Which eigenvector does spectral clustering use to split a graph into two parts?
- the eigenvector for the largest eigenvalue of $L$
+ the eigenvector for the second-smallest eigenvalue of $L$
- the all-ones vector
> The smallest eigenvalue's eigenvector is constant and carries no cluster information.
:::
