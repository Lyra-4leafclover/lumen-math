---
id: statistics
title: Statistics
tagline: Learning from data — describing data, sampling, estimation, confidence intervals, hypothesis tests, resampling, regression and model evaluation.
desc: Statistics turns data into conclusions. You'll summarize data with centers, spreads and plots, understand sampling and sampling distributions, judge estimators by bias, variance and MSE, estimate parameters with maximum likelihood and Bayesian methods, build confidence intervals, run hypothesis tests (z, t, chi-square) without fooling yourself, design A/B tests with enough power, use the bootstrap and permutation tests, fit regression models, and evaluate classifiers with confusion matrices, ROC curves and cross-validation.
color: #f59e0b
symbol: x̄
area: Probability & data
paths: ml
order: 7
---

# Unit: Describing data and sampling

## Lesson: Descriptive statistics {#descriptive}
@summary: Summarizing data with centers (mean, median, mode), spreads (range, variance, standard deviation, IQR), percentiles, box plots, histograms and outliers.

### Making sense of a pile of numbers
A teacher has 30 test scores. A company has a million purchase amounts. A hospital has the waiting times of every patient last month. Raw lists of numbers are almost impossible to understand by staring at them. **Descriptive statistics** is the craft of summarizing data honestly: a few well-chosen numbers and pictures that capture where the data sit, how spread out they are, and what shape they have. It's the first thing any data scientist does with a new dataset, and doing it carefully prevents a lot of embarrassing mistakes later.

Throughout this lesson we'll use a small dataset: the number of hours eight students spent on homework in a week,
$$2,\ 4,\ 4,\ 4,\ 5,\ 5,\ 7,\ 9.$$
We'll call the values $x_1, \dots, x_n$ with $n = 8$.

### Measures of center
The **mean** (average) is the sum divided by the count:
$$\bar x = \frac1n\sum_{i=1}^n x_i = \frac{2 + 4 + 4 + 4 + 5 + 5 + 7 + 9}{8} = \frac{40}{8} = 5.$$
The mean is the balance point of the data: if you put equal weights at each value on a ruler, it balances at 5. A useful consequence is that the deviations from the mean always add to zero: $(2-5) + (4-5)\times3 + 0 + 0 + 2 + 4 = -3 - 3 + 6 = 0$.

The **median** is the middle value when the data are sorted. With an odd number of values it's the single middle one; with an even number, it's the average of the two middle values. Here the 4th and 5th values are 4 and 5, so the median is 4.5. Half the data lie below the median and half above.

The **mode** is the most common value, here 4. It's most useful for categorical data, such as the most popular shirt size, where means and medians make no sense.

:::def Mean
The sum of the values divided by their number, $\bar x = \frac1n\sum x_i$; the balance point of the data.
:::

:::def Median
The middle value of the sorted data (the average of the two middle values when $n$ is even).
:::

### Robustness: mean versus median
Suppose the student who studied 9 hours actually studied 45 hours (perhaps a typo, perhaps not). The new mean is $\frac{40 - 9 + 45}{8} = \frac{76}{8} = 9.5$, almost double. The median is still 4.5, because the two middle values didn't change. We say the median is **robust** to outliers, while the mean is sensitive to them. For skewed data like incomes or house prices, where a few huge values pull the mean upward, the median usually describes a "typical" value better. When news reports say "median household income," that's why.

The relationship between mean and median also hints at **shape**. In a symmetric dataset they're roughly equal. In a **right-skewed** dataset (a long tail of large values) the mean is pulled above the median; in a left-skewed one, below.

### Measures of spread
Two classes can both average 70 on a test, one with every score between 65 and 75, the other ranging from 20 to 100. We need numbers for spread too.

The **range** is the maximum minus the minimum: $9 - 2 = 7$. It's simple but depends entirely on the two most extreme values.

The **variance** measures the typical squared distance from the mean. For a sample, we use
$$s^2 = \frac{1}{n - 1}\sum_{i=1}^n(x_i - \bar x)^2.$$
For our data, the squared deviations are $9, 1, 1, 1, 0, 0, 4, 16$, which add to 32. So $s^2 = \frac{32}{7}\approx4.57$. Why divide by $n - 1$ instead of $n$? Because the deviations are measured from $\bar x$, which was computed from the same data and sits closer to them than the true mean does. Dividing by $n - 1$ corrects that underestimate exactly, on average; the estimators lesson proves it. (If the data are an entire population, we divide by $n$, giving $\sigma^2 = 4$ here.)

The **standard deviation** $s = \sqrt{s^2}\approx2.14$ hours is in the original units, and is the most common measure of spread. Roughly, it's the typical distance of a value from the mean.

:::def Sample variance and standard deviation
$s^2 = \frac{1}{n-1}\sum(x_i - \bar x)^2$ and $s = \sqrt{s^2}$, measuring how far values typically lie from the mean.
:::

### Percentiles, quartiles and the IQR
The $p$-th **percentile** is a value below which $p\%$ of the data fall. The **quartiles** split the sorted data into four parts: $Q_1$ (25th percentile), the median $Q_2$, and $Q_3$ (75th percentile). One simple method: $Q_1$ is the median of the lower half and $Q_3$ the median of the upper half. Our lower half is $2, 4, 4, 4$ with median 4, and our upper half is $5, 5, 7, 9$ with median 6. (Software packages use slightly different interpolation rules, so small differences are normal.)

The **interquartile range** $\text{IQR} = Q_3 - Q_1 = 6 - 4 = 2$ is the spread of the middle half of the data. Like the median, it's robust: changing 9 to 45 doesn't affect it. A common rule flags a value as an **outlier** if it lies more than $1.5\times\text{IQR}$ beyond the quartiles, that is below $Q_1 - 1.5\,\text{IQR} = 1$ or above $Q_3 + 1.5\,\text{IQR} = 9$. With 45 hours, that value would be flagged.

:::def Interquartile range (IQR)
$Q_3 - Q_1$, the range of the middle 50% of the data; a robust measure of spread.
:::

:::def Outlier
A value unusually far from the rest of the data, often defined as more than $1.5\times$IQR below $Q_1$ or above $Q_3$.
:::

### Pictures: histograms and box plots
A **histogram** groups values into bins and draws a bar for each bin's count, revealing shape: symmetric, skewed, or with two peaks (**bimodal**, which often means two different groups mixed together). A **box plot** shows the **five-number summary** (minimum, $Q_1$, median, $Q_3$, maximum): a box from $Q_1$ to $Q_3$ with a line at the median, and whiskers extending to the most extreme non-outlier values, with outliers drawn as separate dots. Box plots are great for comparing groups side by side.

### Standardizing with z-scores
To compare values on different scales, convert to z-scores: $z = \frac{x - \bar x}{s}$. A student with 9 hours has $z = \frac{9 - 5}{2.14}\approx1.87$, almost two standard deviations above average.

### Common mistakes
Reporting the mean for heavily skewed data without the median can mislead. Forgetting to sort before finding the median is a classic slip. Dividing by $n$ instead of $n - 1$ for a sample slightly underestimates the variance. A single summary never tells the whole story: very different datasets can share the same mean and standard deviation, so always plot your data. And never delete outliers automatically; first find out whether they are errors or real, important observations.

### Summary
Center is described by the mean (balance point, sensitive to outliers), the median (middle value, robust) and the mode. Spread is described by the range, variance and standard deviation (using $n - 1$ for samples) and the robust IQR. Quartiles give the five-number summary drawn in a box plot, histograms show shape, and the $1.5\times$IQR rule flags possible outliers.

@viz g06-data data=outlier | Drag points to see which summaries move. Click empty space to add a point.

:::explore
**What to try**
1. Start with the "outlier" data set. Compare the mean and the median, and find the flagged outlier in the box plot.
2. Drag the outlier down toward the others. Watch the mean and standard deviation drop sharply while the median and IQR barely move.
3. Switch to "right-skewed" and check that the mean sits to the right of the median. Then pick "symmetric" and see them nearly coincide.
4. Choose "bimodal". The mean and median land in the gap where there is almost no data.
5. Click to add a few points far to the right and watch the 1.5 × IQR fence flag them.

**What to notice:** the mean and standard deviation respond to every point, especially extreme ones, while the median and IQR depend only on the middle of the data. A single number can hide shape: in the bimodal set the "center" is a value no one actually has, which is why you should always look at the histogram.
:::

:::formulas
$$\bar x = \frac1n\sum_{i=1}^n x_i$$
$$s^2 = \frac{1}{n-1}\sum_{i=1}^n(x_i - \bar x)^2,\qquad s = \sqrt{s^2}$$
$$\sum_{i=1}^n(x_i - \bar x) = 0$$
$$\text{IQR} = Q_3 - Q_1,\quad \text{fences } Q_1 - 1.5\,\text{IQR},\ Q_3 + 1.5\,\text{IQR}$$
$$z_i = \frac{x_i - \bar x}{s}$$
:::

:::thm The mean minimizes squared error
For any number $c$, $\sum(x_i - c)^2\ge\sum(x_i - \bar x)^2$, with equality only at $c = \bar x$. (The median similarly minimizes $\sum|x_i - c|$.)
:::

:::proof
Write $x_i - c = (x_i - \bar x) + (\bar x - c)$. Squaring and summing, $\sum(x_i - c)^2 = \sum(x_i - \bar x)^2 + 2(\bar x - c)\sum(x_i - \bar x) + n(\bar x - c)^2$. The middle sum is 0, so the total is $\sum(x_i - \bar x)^2 + n(\bar x - c)^2$, smallest when $c = \bar x$.
:::

:::steps Find the mean, median and sample standard deviation of 3, 7, 8, 10, 12.
1. Mean: $\frac{40}{5} = 8$. Median: the middle value, 8.
2. Squared deviations: $25, 1, 0, 4, 16$, total 46.
3. $s^2 = \frac{46}{4} = 11.5$, so $s\approx3.39$.
:::

:::steps Find the quartiles, IQR and outlier fences of 1, 3, 4, 6, 7, 8, 10, 30.
1. Lower half $1, 3, 4, 6$: $Q_1 = 3.5$. Upper half $7, 8, 10, 30$: $Q_3 = 9$.
2. $\text{IQR} = 5.5$.
3. Fences: $3.5 - 8.25 = -4.75$ and $9 + 8.25 = 17.25$. So 30 is an outlier.
:::

:::steps A class's mean score is 72 with SD 8. Ana scored 84 on it; on another test with mean 60 and SD 15 she scored 81. Which is better relative to the class?
1. First test: $z = \frac{84 - 72}{8} = 1.5$.
2. Second test: $z = \frac{81 - 60}{15} = 1.4$.
3. The first score is slightly better relative to the class.
:::

:::mock Exam question
The salaries (in thousands) at a small firm are 30, 32, 35, 35, 38, 40, 42, 150. (a) Find the mean and the median. (b) Which better describes a typical salary, and why? (c) Use the 1.5 × IQR rule to decide whether 150 is an outlier.
:::solution
(a) Mean $= \frac{402}{8} = 50.25$; median $= \frac{35 + 38}{2} = 36.5$. (b) The median: the single 150 pulls the mean above seven of the eight salaries. (c) $Q_1 = \frac{32 + 35}{2} = 33.5$, $Q_3 = \frac{40 + 42}{2} = 41$, IQR $= 7.5$, upper fence $41 + 11.25 = 52.25$. Since $150 > 52.25$, it's an outlier.
:::
:::

:::ml
Exploratory data analysis comes before modelling: summary statistics and histograms reveal skewed features (often log-transformed), outliers that can wreck a least-squares fit, and data errors. Standardizing features to z-scores (StandardScaler) puts them on comparable scales for gradient descent, k-nearest neighbours and regularized models, and robust scalers use the median and IQR instead.
:::

:::cs
Performance engineers report latency as median and high percentiles (p95, p99) rather than the mean, because a few very slow requests dominate the mean while users feel the tail. Databases keep histograms of column values to estimate query costs.
:::

:::real
Government statistics report median household income and median house prices because a handful of very large values would make the means unrepresentative. Weather reports describe "average" temperatures, and growth charts for children are built from percentiles.
:::

:::quiz
? Find the mean of 4, 8, 6, 2.
= 5
> $20/4 = 5$.

? Find the median of 7, 1, 3, 9, 5, 11.
= 6
> Sorted: 1, 3, 5, 7, 9, 11; average of 5 and 7.

? Which measure of center is most robust to a single huge outlier?
- Mean
+ Median
- Mean of the two extremes
> The median depends only on the middle of the sorted data.

? Find the sample variance of 1, 2, 3.
= 1
> Mean 2; squared deviations 1, 0, 1 sum to 2; divide by $n - 1 = 2$.

? $Q_1 = 10$ and $Q_3 = 18$. What is the upper outlier fence?
= 30
> IQR $= 8$; $18 + 1.5\times8 = 30$.

? In a right-skewed distribution, the mean is usually...
+ greater than the median
- less than the median
- equal to the median
> The long right tail pulls the mean up.
:::
## Lesson: Populations, samples and sampling distributions {#sampling}
@summary: Parameters versus statistics, how to sample well, sources of bias, and the sampling distribution and standard error of a statistic.

### Learning about the many from the few
A pollster wants to know what fraction of 30 million voters support a policy. A factory wants the average breaking strength of every bolt it makes, but testing a bolt destroys it. A doctor wants to know whether a drug lowers blood pressure in all patients with hypertension, not just the 200 in her trial. In each case, the group we care about is too large, too expensive or impossible to measure completely. So we measure a small part and use it to learn about the whole. This is the central idea of inferential statistics, and doing it well depends on *how* the small part is chosen and on understanding how much a result could vary just because of which individuals happened to be picked.

### Population, sample, parameter, statistic
The **population** is the entire group we want to learn about: all voters, all bolts, all patients. A **sample** is the subset we actually observe. A **parameter** is a number describing the population, such as the true support $p$ or the true mean strength $\mu$. It is fixed but unknown. A **statistic** is a number computed from the sample, such as the sample proportion $\hat p$ or the sample mean $\bar x$. It is known once we have the data, but it would be different if we had drawn a different sample.

A handy convention: parameters are usually Greek letters ($\mu$, $\sigma$, $p$ or $\theta$), and the statistics that estimate them are Latin letters or "hatted" versions ($\bar x$, $s$, $\hat p$, $\hat\theta$).

:::def Population and sample
The population is the complete set of individuals of interest; a sample is the subset that is actually measured.
:::

:::def Parameter and statistic
A parameter is a fixed (usually unknown) number describing a population; a statistic is a number computed from a sample, which varies from sample to sample.
:::

### How to choose a sample
The gold standard is a **simple random sample** (SRS): every group of $n$ individuals has the same chance of being chosen, as if names were drawn from a well-mixed hat. Randomness is the key ingredient, because it prevents the person choosing from (even unconsciously) favouring certain kinds of individuals, and because it lets probability theory describe how the results vary.

Other random designs are useful in practice. In **stratified sampling** the population is divided into groups (strata), such as age bands or regions, and a random sample is drawn within each. This guarantees every group is represented and usually gives more precise estimates. In **cluster sampling** we randomly select whole groups, such as schools, and measure everyone in them; it is cheaper but usually less precise. In **systematic sampling** we take every $k$-th item from a list after a random start, which is easy but can go wrong if the list has a repeating pattern.

### Bias: when samples mislead
A sampling method is **biased** if it systematically favours some outcomes. Bias is far more dangerous than randomness, because collecting more data doesn't fix it. Common forms include:

**Selection bias.** The sampling frame misses part of the population. A phone survey that only calls landlines under-represents young people.

**Voluntary response bias.** People choose whether to respond, and those with strong opinions respond more. Online reviews skew toward the very happy and the very angry.

**Nonresponse bias.** Selected people don't respond, and they differ from those who do.

**Survivorship bias.** Only "survivors" are observed. Studying only successful companies to learn what makes companies succeed ignores the failed ones that did the same things.

The most famous example is the 1936 *Literary Digest* poll, which mailed 10 million ballots, received 2.4 million responses and predicted a landslide win for Alf Landon. Franklin Roosevelt won with 61% of the vote. The mailing lists came from phone books and car registrations, which in the Depression over-represented wealthier voters, and the people who chose to reply differed from those who didn't. A random sample of about 1,000 would have done far better than 2.4 million biased responses.

### The sampling distribution
Here is the most important idea in this lesson. A statistic is a random variable, because the sample is random. If we imagine repeating the sampling many times, each sample gives a slightly different $\bar x$. The distribution of those values is the statistic's **sampling distribution**.

For example, suppose the true support for a policy is $p = 0.4$ and we poll $n = 100$ people at random. One poll might give $\hat p = 0.37$, another $0.43$, another $0.41$. The sampling distribution of $\hat p$ describes how these values are spread. Using the rules for means and variances, $E[\hat p] = p$ and $\operatorname{Var}(\hat p) = \frac{p(1-p)}{n}$. Here the standard deviation is $\sqrt{\frac{0.4\times0.6}{100}} = \sqrt{0.0024}\approx0.049$. So polls of 100 typically miss the true value by about 5 percentage points. By the central limit theorem the sampling distribution is approximately normal, so about 95% of such polls fall within $\pm1.96\times0.049\approx\pm0.096$ of 0.4.

:::def Sampling distribution
The probability distribution of a statistic over all possible random samples of a given size.
:::

### Standard error
The standard deviation of a statistic's sampling distribution is its **standard error**. For the sample mean, $\text{SE}(\bar x) = \frac{\sigma}{\sqrt n}$; for a proportion, $\text{SE}(\hat p) = \sqrt{\frac{p(1-p)}{n}}$. Since $\sigma$ and $p$ are usually unknown, we plug in the sample values: $\frac{s}{\sqrt n}$ and $\sqrt{\frac{\hat p(1-\hat p)}{n}}$. The standard error shrinks with the square root of the sample size: to halve it, you need four times as many observations.

A remarkable consequence is that precision depends on the **sample size**, not on the population size (as long as the sample is a small fraction of the population). A random sample of 1,000 is about as informative for a country of 300 million as for a city of 1 million. If the sample is a large fraction of a finite population, the SE is reduced by the finite population correction $\sqrt{\frac{N - n}{N - 1}}$.

### Common mistakes
Confusing the standard deviation of the data ($s$, which doesn't shrink as $n$ grows) with the standard error of the mean ($s/\sqrt n$, which does) is very common. Believing a bigger sample cures bias is another: 2.4 million biased responses lost to 1,000 random ones. Treating a convenience sample, such as your friends or the first 100 customers, as if it were random gives overconfident conclusions. And remember that the sampling distribution is about hypothetical repeated samples; you usually only see one.

### Summary
We use statistics computed from samples to estimate unknown population parameters. Random sampling (simple, stratified, cluster) protects against bias, which larger samples can't fix. A statistic varies from sample to sample according to its sampling distribution; its standard deviation, the standard error, is $\sigma/\sqrt n$ for a mean and $\sqrt{p(1-p)/n}$ for a proportion, and the CLT makes it approximately normal.

@viz clt src="coin (0/1)" n=10 | Each sample is n yes/no answers from a population with p = 0.5; the bottom histogram is the sampling distribution of the sample proportion.

:::explore
**What to try**
1. With the "coin (0/1)" population and $n = 10$, look at the histogram of 4000 sample proportions. Most lie between 0.2 and 0.8.
2. Increase $n$ to 40. The histogram narrows to roughly half the width, because the standard error $\sqrt{0.25/n}$ halves when $n$ quadruples.
3. Press "Resample" a few times. The histogram barely changes: the sampling distribution is a stable, predictable object even though each single sample is random.
4. Switch to the "skewed die" population and note that the sampling distribution of the mean still becomes bell-shaped as $n$ grows.

**What to notice:** the top panel (the population) never changes; only the spread of the statistic changes with $n$. This is the difference between the standard deviation of the data and the standard error of the statistic described in the article.
:::

:::formulas
$$E[\bar X] = \mu,\qquad \text{SE}(\bar X) = \frac{\sigma}{\sqrt n}\approx\frac{s}{\sqrt n}$$
$$E[\hat p] = p,\qquad \text{SE}(\hat p) = \sqrt{\frac{p(1-p)}{n}}$$
$$\text{finite population: } \text{SE} = \frac{\sigma}{\sqrt n}\sqrt{\frac{N-n}{N-1}}$$
$$\hat p\approx N\Big(p, \frac{p(1-p)}{n}\Big)\ \text{for large } n$$
:::

:::thm Sampling distribution of the sample mean
If $X_1,\dots,X_n$ are a random sample (i.i.d.) from a population with mean $\mu$ and variance $\sigma^2$, then $E[\bar X] = \mu$ and $\operatorname{Var}(\bar X) = \sigma^2/n$. If the population is normal, $\bar X\sim N(\mu, \sigma^2/n)$ exactly; otherwise this holds approximately for large $n$.
:::

:::proof
By linearity, $E[\bar X] = \frac1n\sum E[X_i] = \mu$. By independence, $\operatorname{Var}(\bar X) = \frac{1}{n^2}\sum\operatorname{Var}(X_i) = \frac{\sigma^2}{n}$. Sums of independent normals are normal, and otherwise the central limit theorem gives approximate normality.
:::

:::steps A population has σ = 12. How large a sample makes SE(mean) = 1.5?
1. $\frac{12}{\sqrt n} = 1.5$, so $\sqrt n = 8$.
2. $n = 64$.
:::

:::steps True support is p = 0.6. For random polls of n = 600, find the SE and the range containing about 95% of poll results.
1. $\text{SE} = \sqrt{\frac{0.6\times0.4}{600}} = \sqrt{0.0004} = 0.02$.
2. About 95% within $0.6\pm1.96(0.02) = 0.6\pm0.039$, i.e. 0.561 to 0.639.
:::

:::steps A gym surveys members who come in on Monday evenings about whether opening hours should be extended. Identify the problem.
1. Only current Monday-evening users are sampled: selection bias.
2. People who can't come because of the current hours are missing entirely, so support for extended hours is likely underestimated.
:::

:::mock Exam question
A city of 500,000 adults wants to estimate the proportion who cycle to work. (a) Describe a stratified random sampling plan. (b) If the true proportion is 0.1, what is the standard error of $\hat p$ for a simple random sample of 900? (c) A local cycling club posts the survey link online and gets 5,000 responses. Explain why this is worse than the sample of 900.
:::solution
(a) Divide the city into districts (strata) and draw a simple random sample of adults within each district, in proportion to district population. (b) $\text{SE} = \sqrt{\frac{0.1\times0.9}{900}} = \sqrt{0.0001} = 0.01$. (c) It is a voluntary response sample spread through a cycling club, so cyclists are heavily over-represented; this bias doesn't shrink with more responses, whereas the random sample's error is small and quantifiable.
:::
:::

:::ml
Training, validation and test sets are samples, and a model's test accuracy is a statistic with a standard error of about $\sqrt{\hat a(1-\hat a)/n}$. Stratified splits keep class proportions equal across folds. Dataset shift and selection bias, for example training a medical model only on patients from one hospital, are among the biggest causes of models failing in deployment.
:::

:::cs
Monitoring systems sample a fraction of requests for tracing, and databases estimate query result sizes from random samples of rows. Reservoir sampling draws a uniform random sample from a stream of unknown length in one pass.
:::

:::real
Election polls, the unemployment rate (from household surveys), TV ratings and quality inspections all rely on random samples. The national census tries to count everyone, but even it uses samples to estimate and correct its own undercount.
:::

:::quiz
? The true average height of all students at a university is a...
+ parameter
- statistic
> It describes the whole population.

? $\sigma = 20$ and $n = 100$. What is the standard error of the sample mean?
= 2
> $20/\sqrt{100}$.

? True $p = 0.5$, $n = 400$. Find $\text{SE}(\hat p)$.
= 0.025|1/40
> $\sqrt{0.25/400} = 0.5/20$.

? An online poll gets 50,000 voluntary responses. Compared with a random sample of 1,000, it is usually...
- more accurate because it is bigger
+ less trustworthy because of voluntary response bias
- equally good
> Bias doesn't shrink with sample size.

? By what factor must $n$ grow to cut the standard error to one third?
= 9
> SE scales like $1/\sqrt n$.

? Which design divides the population into groups and samples randomly within every group?
+ Stratified sampling
- Cluster sampling
- Convenience sampling
> Cluster sampling picks whole groups at random; stratified samples within each group.
:::
# Unit: Estimation

## Lesson: Estimators: bias, variance and MSE {#estimators}
@summary: What makes an estimate good: bias, variance, mean squared error, consistency, and why the sample variance divides by n − 1.

### Guessing a number from data
Once we have a sample, we want to turn it into a single best guess for an unknown parameter: the average lifetime of a battery, the click-through rate of an ad, the spread of measurement errors. A rule that turns data into such a guess is an **estimator**. The sample mean is an estimator of the population mean, but it's not the only possible one. We could use the median, the average of the largest and smallest values, or even "always guess 50." Which is best? To answer, we need to describe what "good" means for a rule whose output is random. This lesson introduces the vocabulary every statistician and machine learning engineer uses for exactly that: bias, variance and mean squared error.

### Estimators and estimates
An **estimator** $\hat\theta$ is a function of the random sample, like $\bar X = \frac1n\sum X_i$. Because the sample is random, $\hat\theta$ is a random variable with its own sampling distribution. An **estimate** is the particular number you get from the data you actually collected, like $\bar x = 4.7$. The estimator is the recipe; the estimate is the cake. We judge recipes by how they perform over all the samples we might have drawn.

:::def Estimator
A rule $\hat\theta$ that computes a guess of a parameter $\theta$ from sample data; its value on a particular dataset is an estimate.
:::

### Bias: are we aiming at the right place?
Imagine an archer shooting at a target. If her arrows cluster around a point to the left of the bullseye, she has a systematic error. For an estimator, the systematic error is the **bias**:
$$\operatorname{Bias}(\hat\theta) = E[\hat\theta] - \theta.$$
An estimator is **unbiased** if its bias is zero, meaning that on average over many samples it hits the true value. The sample mean is unbiased for $\mu$, because $E[\bar X] = \mu$. The sample proportion $\hat p$ is unbiased for $p$.

Not every natural estimator is unbiased. Suppose we estimate the variance by $\hat\sigma^2 = \frac1n\sum(X_i - \bar X)^2$, dividing by $n$. Its expected value turns out to be $\frac{n-1}{n}\sigma^2$, which is too small. With $n = 2$ it's only half of $\sigma^2$ on average. The reason is that $\bar X$ is computed from the same data, so it is always closer to the data points than the true mean $\mu$ is, and deviations from $\bar X$ are systematically too small. Dividing by $n - 1$ instead fixes this exactly: $s^2 = \frac{1}{n-1}\sum(X_i - \bar X)^2$ satisfies $E[s^2] = \sigma^2$. This is called **Bessel's correction**, and it's proved below. Intuitively, the $n$ deviations must add to zero, so only $n - 1$ of them are free; we say there are $n - 1$ **degrees of freedom**.

:::def Bias
$\operatorname{Bias}(\hat\theta) = E[\hat\theta] - \theta$; an estimator is unbiased if this is 0.
:::

### Variance: how much do our guesses scatter?
An archer can be centred on the bullseye but still scatter her arrows widely. For an estimator, scatter is measured by its variance, $\operatorname{Var}(\hat\theta)$, or by its standard deviation, the standard error. The sample mean has variance $\frac{\sigma^2}{n}$. Comparing unbiased estimators, we prefer the one with smaller variance; it's more **efficient**. For normal data, both the sample mean and the sample median are unbiased for $\mu$, but the median has variance about $\frac{\pi}{2}\cdot\frac{\sigma^2}{n}\approx1.57\frac{\sigma^2}{n}$ for large $n$. So the mean uses the data more efficiently: the median needs about 57% more observations for the same precision. (For heavy-tailed data with outliers the comparison can reverse.)

### Mean squared error combines both
Usually we care about the total error, so we use the **mean squared error**:
$$\operatorname{MSE}(\hat\theta) = E[(\hat\theta - \theta)^2].$$
It decomposes neatly into the two kinds of error:
$$\operatorname{MSE}(\hat\theta) = \operatorname{Var}(\hat\theta) + \operatorname{Bias}(\hat\theta)^2.$$
This **bias–variance decomposition** says total error is scatter plus systematic error squared. It shows that an unbiased estimator is not automatically best: a slightly biased estimator with much smaller variance can have lower MSE.

Here's a small example. Let $X_1,\dots,X_n$ have mean $\mu$ and variance $\sigma^2$, and consider the "shrunk" estimator $\hat\mu = c\bar X$ for some $0 < c < 1$. Its bias is $(c - 1)\mu$ and its variance is $c^2\frac{\sigma^2}{n}$. With $\mu = 1$, $\sigma^2 = 4$ and $n = 4$, the sample mean ($c = 1$) has MSE $= 1$. With $c = 0.5$, the bias is $-0.5$ and the variance $0.25$, so MSE $= 0.25 + 0.25 = 0.5$, half as large. Shrinking toward zero helped. Of course, if the true $\mu$ were 10, shrinking would be terrible (bias $-5$), which is why such estimators need justification, often from prior knowledge.

:::def Mean squared error (MSE)
$E[(\hat\theta - \theta)^2] = \operatorname{Var}(\hat\theta) + \operatorname{Bias}(\hat\theta)^2$, the average squared distance of the estimator from the truth.
:::

### Consistency: getting it right eventually
An estimator is **consistent** if it converges to the true value as the sample size grows: $\hat\theta_n\to\theta$ in probability. The sample mean is consistent by the law of large numbers. A sufficient condition is that both the bias and the variance go to zero as $n\to\infty$, since then the MSE does too. The divide-by-$n$ variance estimator is biased but consistent, because its bias $-\frac{\sigma^2}{n}$ vanishes. "Always guess 50" has zero variance but is not consistent, unless the truth happens to be 50.

:::def Consistent estimator
An estimator that converges in probability to the true parameter as the sample size grows.
:::

### Common mistakes
"Unbiased" doesn't mean "accurate": an unbiased estimator can have huge variance. Don't confuse the bias of an estimator with the bias of a sampling method; a biased sample makes every estimator biased. Remember that the standard deviation $s$ is still slightly biased for $\sigma$ even though $s^2$ is unbiased for $\sigma^2$, because the square root is not linear. And when comparing estimators, compare MSE at several plausible values of the parameter, since one estimator may win for some values and lose for others.

### Summary
An estimator is a rule for turning data into a guess. Its bias $E[\hat\theta] - \theta$ is systematic error and its variance is random scatter; the MSE equals variance plus bias squared. Unbiasedness is nice but not essential: trading a little bias for a lot less variance can reduce total error. Consistent estimators converge to the truth as data grow, and the sample variance uses $n - 1$ to be unbiased.

@viz bias-variance | The same bias–variance tradeoff appears when the "estimator" is a fitted curve. Change the degree and redraw the data.

:::explore
**What to try**
1. Set the degree to 0 or 1. Press "New noisy data" several times: the fitted curve barely changes (low variance) but it consistently misses the green truth (high bias).
2. Set the degree to 12–15 and redraw the data. The curve now passes near every point but swings wildly from dataset to dataset (high variance).
3. Find the degree with the lowest true (test) error, usually around 3 to 6.
4. Compare the training error and the true error as you raise the degree.

**What to notice:** MSE = variance + bias². Simple models have high bias and low variance, flexible ones the reverse, and the best total error is a compromise, exactly like the shrunk estimator in the article. Training error alone always prefers the most flexible model, which is why it is a biased measure of performance.
:::

:::formulas
$$\operatorname{Bias}(\hat\theta) = E[\hat\theta] - \theta$$
$$\operatorname{MSE}(\hat\theta) = E[(\hat\theta-\theta)^2] = \operatorname{Var}(\hat\theta) + \operatorname{Bias}(\hat\theta)^2$$
$$s^2 = \frac{1}{n-1}\sum(X_i - \bar X)^2,\quad E[s^2] = \sigma^2$$
$$E\Big[\frac1n\sum(X_i-\bar X)^2\Big] = \frac{n-1}{n}\sigma^2$$
$$\operatorname{Var}(\bar X) = \frac{\sigma^2}{n}$$
:::

:::thm Bias–variance decomposition
$\operatorname{MSE}(\hat\theta) = \operatorname{Var}(\hat\theta) + \operatorname{Bias}(\hat\theta)^2$.
:::

:::proof
Let $m = E[\hat\theta]$. Then $\hat\theta - \theta = (\hat\theta - m) + (m - \theta)$. Squaring and taking expectations, the cross term $2(m-\theta)E[\hat\theta - m]$ is 0, leaving $E[(\hat\theta - m)^2] + (m - \theta)^2 = \operatorname{Var}(\hat\theta) + \operatorname{Bias}^2$.
:::

:::thm The sample variance is unbiased
For i.i.d. $X_i$ with variance $\sigma^2$, $E\big[\sum(X_i - \bar X)^2\big] = (n - 1)\sigma^2$, so $E[s^2] = \sigma^2$.
:::

:::proof
$\sum(X_i - \bar X)^2 = \sum(X_i - \mu)^2 - n(\bar X - \mu)^2$ (expand $X_i - \mu = (X_i - \bar X) + (\bar X - \mu)$ and use $\sum(X_i - \bar X) = 0$). Taking expectations: $n\sigma^2 - n\cdot\frac{\sigma^2}{n} = (n - 1)\sigma^2$.
:::

:::steps An estimator has E[θ̂] = 5.2 and Var(θ̂) = 0.3, and the true θ = 5. Find its bias and MSE.
1. Bias $= 5.2 - 5 = 0.2$.
2. MSE $= 0.3 + 0.2^2 = 0.34$.
:::

:::steps For data 4, 6, 8, compute the divide-by-n and divide-by-(n − 1) variance estimates.
1. Mean 6; squared deviations $4, 0, 4$, sum 8.
2. Divide by $n$: $\frac83\approx2.67$. Divide by $n - 1$: $\frac82 = 4$.
:::

:::steps Estimator A is unbiased with variance 4. Estimator B has bias 1 and variance 1. Which has lower MSE?
1. MSE(A) $= 4 + 0 = 4$.
2. MSE(B) $= 1 + 1^2 = 2$.
3. B is better on MSE despite being biased.
:::

:::mock Exam question
Let $X_1,\dots,X_n$ be i.i.d. uniform on $[0, \theta]$. Consider $\hat\theta_1 = 2\bar X$. (a) Show $\hat\theta_1$ is unbiased. (b) Find its variance and MSE. (c) Is it consistent?
:::solution
(a) $E[X_i] = \frac\theta2$, so $E[2\bar X] = 2\cdot\frac\theta2 = \theta$. (b) $\operatorname{Var}(X_i) = \frac{\theta^2}{12}$, so $\operatorname{Var}(2\bar X) = 4\cdot\frac{\theta^2}{12n} = \frac{\theta^2}{3n}$; since it is unbiased, MSE $= \frac{\theta^2}{3n}$. (c) Yes: bias is 0 and the variance tends to 0, so the MSE tends to 0.
:::
:::

:::ml
The bias–variance tradeoff is the core of model selection. Regularization (ridge, lasso, weight decay, dropout, early stopping) deliberately adds bias to cut variance and lower test error. Batch normalization and Adam keep running estimates of means and variances, and some implementations apply bias corrections like Adam's $\frac{1}{1-\beta^t}$ factor for exactly the reasons in this lesson.
:::

:::cs
Streaming algorithms estimate counts and frequencies in tiny memory: HyperLogLog estimates the number of distinct items with known, small relative standard error, and Count-Min sketches give biased-upward frequency estimates with bounded error. Engineers choose sketch sizes by trading memory against estimator variance.
:::

:::real
Surveys, clinical trials and economic indicators publish estimates with standard errors. In sports analytics, a batter's average after 20 at-bats is very noisy, so analysts shrink early-season averages toward the league mean, accepting bias for much lower variance.
:::

:::quiz
? An estimator has bias 0 and variance 9. What is its MSE?
= 9
> MSE = variance + bias².

? An estimator has bias −2 and variance 1. What is its MSE?
= 5
> $1 + (-2)^2$.

? Why does the sample variance divide by $n - 1$?
+ To make it an unbiased estimator of $\sigma^2$
- Because one data point is always discarded
- To make the standard deviation smaller
> Deviations from $\bar X$ are systematically too small; $n-1$ corrects this.

? For data 1, 3, 5, what is the sample variance $s^2$?
= 4
> Mean 3; squared deviations 4, 0, 4; $8/2 = 4$.

? An estimator with bias $3/n$ and variance $5/n$ is...
+ biased but consistent
- unbiased and consistent
- inconsistent
> Both bias and variance tend to 0 as $n$ grows.

? Can a biased estimator have smaller MSE than an unbiased one?
+ Yes
- No
> A small bias can be worth a large reduction in variance.
:::
## Lesson: Maximum likelihood estimation {#mle}
@summary: Choosing the parameter that makes the observed data most probable: likelihood, log-likelihood, worked MLEs for Bernoulli, Poisson, exponential and normal models, and their properties.

### A principled way to build estimators
In the last lesson we judged estimators that someone handed us. But where do good estimators come from in the first place? For simple problems intuition works: estimate a proportion by the sample proportion. For a new model with several parameters, such as a neural network with millions of weights, intuition gives out. **Maximum likelihood estimation** (MLE) is a general recipe that works for almost any probability model, and it is the principle behind most of the loss functions used in machine learning.

The idea fits in one sentence: **choose the parameter value under which the data you actually observed would have been most probable.**

### The likelihood function
Suppose you flip a thumbtack 10 times and it lands point-up 7 times. Let $\theta$ be the unknown probability of point-up. For any candidate $\theta$, the probability of seeing exactly this sequence of results (with 7 ups and 3 downs) is
$$L(\theta) = \theta^7(1 - \theta)^3.$$
Read as a function of $\theta$, with the data held fixed, this is the **likelihood function**. Try some values: $L(0.5) = 0.5^{10}\approx0.00098$; $L(0.7) = 0.7^7\times0.3^3\approx0.0824\times0.027\approx0.00222$; $L(0.9) = 0.9^7\times0.1^3\approx0.00048$. The value 0.7 makes the data more than twice as likely as 0.5 does. The **maximum likelihood estimate** $\hat\theta$ is the value of $\theta$ where $L$ is largest.

It's important to see what the likelihood is *not*. It is not the probability that $\theta$ is correct, and it doesn't integrate to 1 over $\theta$. It's the probability of the data, viewed as a function of the parameter. (Turning it into a probability for $\theta$ needs a prior, which is the Bayesian approach of the next lesson.)

:::def Likelihood function
$L(\theta) = p(\text{data}\mid\theta)$, the probability (or density) of the observed data viewed as a function of the parameter $\theta$.
:::

:::def Maximum likelihood estimate (MLE)
The parameter value $\hat\theta$ that maximizes the likelihood $L(\theta)$, equivalently the log-likelihood $\ell(\theta) = \log L(\theta)$.
:::

### The log-likelihood
For independent observations the likelihood is a product, $L(\theta) = \prod_i p(x_i\mid\theta)$. Products are awkward to differentiate, and products of many small numbers underflow on a computer. So we take logarithms. Because $\log$ is increasing, maximizing $\ell(\theta) = \log L(\theta) = \sum_i\log p(x_i\mid\theta)$ gives the same $\hat\theta$, and sums are much easier to work with.

For the thumbtack, $\ell(\theta) = 7\log\theta + 3\log(1 - \theta)$. Set the derivative to zero:
$$\ell'(\theta) = \frac7\theta - \frac{3}{1 - \theta} = 0\ \Rightarrow\ 7(1 - \theta) = 3\theta\ \Rightarrow\ \hat\theta = \frac{7}{10}.$$
The second derivative $-\frac{7}{\theta^2} - \frac{3}{(1-\theta)^2}$ is negative, so this is a maximum. In general, with $k$ successes in $n$ Bernoulli trials, $\hat\theta = \frac kn$: maximum likelihood confirms that the sample proportion is the natural estimate.

### The general recipe
1. Write the likelihood of all the data as a product over observations.
2. Take the log to get a sum.
3. Differentiate with respect to each parameter and set the derivatives to zero.
4. Solve, and check that you found a maximum (and check boundaries).

When the equations can't be solved by hand, which is the usual case for complex models, we maximize $\ell$ numerically with gradient ascent, or equivalently minimize the **negative log-likelihood** with gradient descent.

### Poisson and exponential examples
A help desk records calls per hour on 5 hours: $2, 4, 3, 1, 5$. Modelling each count as Poisson($\lambda$), $\log p(x\mid\lambda) = x\log\lambda - \lambda - \log x!$. Summing, $\ell(\lambda) = (\sum x_i)\log\lambda - n\lambda + \text{const}$. Setting $\ell'(\lambda) = \frac{\sum x_i}{\lambda} - n = 0$ gives $\hat\lambda = \bar x = \frac{15}{5} = 3$ calls per hour.

For exponential waiting times with rate $\lambda$, $\ell(\lambda) = n\log\lambda - \lambda\sum x_i$, so $\frac{n}{\lambda} - \sum x_i = 0$ and $\hat\lambda = \frac{1}{\bar x}$. If the average wait is 4 minutes, the estimated rate is 0.25 per minute.

### The normal distribution
For data from $N(\mu, \sigma^2)$, each log-density is $-\frac12\log(2\pi\sigma^2) - \frac{(x_i - \mu)^2}{2\sigma^2}$, so
$$\ell(\mu, \sigma^2) = -\frac n2\log(2\pi\sigma^2) - \frac{1}{2\sigma^2}\sum(x_i - \mu)^2.$$
For fixed $\sigma^2$, maximizing over $\mu$ means *minimizing* $\sum(x_i - \mu)^2$, so $\hat\mu = \bar x$. Then differentiating with respect to $\sigma^2$ gives $\hat\sigma^2 = \frac1n\sum(x_i - \bar x)^2$. Notice the divisor $n$, not $n - 1$: the MLE of the variance is slightly biased, a reminder that maximum likelihood doesn't guarantee unbiasedness. The bias disappears as $n$ grows.

The first observation is a big deal: under Gaussian noise, maximum likelihood is exactly **least squares**. That's why least squares regression is so widely used.

### Why MLE works well
Under mild conditions, MLEs have excellent large-sample properties. They are **consistent**, converging to the true parameter. They are **asymptotically normal**, with $\hat\theta\approx N\big(\theta, \frac{1}{nI(\theta)}\big)$, where $I(\theta)$ is the **Fisher information**, a measure of how sharply the log-likelihood curves around its peak. And they are **asymptotically efficient**: no reasonable estimator has smaller variance for large $n$. A sharply peaked log-likelihood means the data pin $\theta$ down precisely; a flat one means they don't. MLEs also have the **invariance property**: the MLE of $g(\theta)$ is $g(\hat\theta)$. If $\hat\lambda = 0.25$, the MLE of the mean wait $\frac1\lambda$ is 4.

### The negative log-likelihood as a loss
Computers usually minimize rather than maximize, so in practice we minimize the **average negative log-likelihood**. For yes/no data $y_i\in\{0, 1\}$ it is $-\frac1n\sum\big[y_i\log\theta + (1 - y_i)\log(1-\theta)\big]$, which is exactly the **binary cross-entropy** loss used to train classifiers. For the thumbtack (7 ups in 10), at $\theta = 0.5$ this loss is $\ln 2\approx0.693$; at $\theta = 0.7$ it is $-(0.7\ln0.7 + 0.3\ln0.3)\approx0.611$, the smallest possible value. Gradient descent on this loss walks $\theta$ toward 0.7. Seeing MLE as "minimize a loss" makes the link to machine learning direct: choosing a loss function is choosing a probability model for the data.

### Common mistakes
Forgetting that the likelihood is a function of the parameter, not of the data, leads to confusion; so does reading it as a probability of $\theta$. Forgetting to check that the critical point is a maximum, or ignoring a boundary maximum (for uniform data on $[0, \theta]$, the MLE is the largest observation, found by reasoning, not by derivatives). MLE can overfit with little data: 3 heads in 3 flips gives $\hat\theta = 1$, claiming tails is impossible. Priors or regularization fix this.

### Summary
The likelihood $L(\theta)$ is the probability of the observed data as a function of the parameter, and the MLE maximizes it, usually via the log-likelihood. MLEs give the sample proportion for Bernoulli data, $\bar x$ for Poisson, $1/\bar x$ for exponential, and $\bar x$ and the divide-by-$n$ variance for normal data. They are consistent, asymptotically normal and efficient, and minimizing negative log-likelihood is the foundation of ML loss functions.

@viz mle | Set the observed heads and flips, then move θ to find the peak of the likelihood.

:::explore
**What to try**
1. Set 7 heads in 10 flips. Move $\theta$ and find where the likelihood peaks: it should be at 0.7, the sample proportion.
2. Switch to "Log-likelihood". The curve has a different shape but its peak is in exactly the same place.
3. Keep the proportion at 0.7 but change to 14 heads in 20 flips. The peak stays at 0.7 and the curve becomes narrower.
4. Set 3 heads in 3 flips and see the likelihood peak at the boundary $\theta = 1$.

**What to notice:** the log is increasing, so it never moves the maximum, which is why we can always work with sums of logs. More data make the likelihood sharper around $\hat\theta$, which is the Fisher information from the article; small samples give flat likelihoods and extreme estimates.
:::

:::formulas
$$L(\theta) = \prod_{i=1}^n p(x_i\mid\theta),\qquad \ell(\theta) = \sum_{i=1}^n\log p(x_i\mid\theta)$$
$$\hat\theta_{\text{MLE}} = \arg\max_\theta\ell(\theta)\quad(\text{solve } \ell'(\theta) = 0)$$
$$\text{Bernoulli: } \hat p = \tfrac kn;\quad\text{Poisson: } \hat\lambda = \bar x;\quad\text{Exponential: } \hat\lambda = \tfrac{1}{\bar x}$$
$$\text{Normal: } \hat\mu = \bar x,\quad \hat\sigma^2 = \tfrac1n\sum(x_i - \bar x)^2$$
$$\hat\theta\approx N\Big(\theta, \frac{1}{nI(\theta)}\Big),\quad I(\theta) = -E\Big[\frac{\partial^2}{\partial\theta^2}\log p(X\mid\theta)\Big]$$
:::

:::thm MLE for Bernoulli data
For $k$ successes in $n$ independent Bernoulli($\theta$) trials with $0 < k < n$, the MLE is $\hat\theta = k/n$.
:::

:::proof
$\ell(\theta) = k\log\theta + (n - k)\log(1 - \theta)$. Then $\ell'(\theta) = \frac k\theta - \frac{n-k}{1-\theta} = 0$ gives $k(1-\theta) = (n-k)\theta$, so $\theta = k/n$. Since $\ell''(\theta) = -\frac{k}{\theta^2} - \frac{n-k}{(1-\theta)^2} < 0$, it's a maximum.
:::

:::thm Gaussian maximum likelihood is least squares
If $y_i = f(x_i; w) + \varepsilon_i$ with $\varepsilon_i$ i.i.d. $N(0, \sigma^2)$, then maximizing the likelihood over $w$ is equivalent to minimizing $\sum_i(y_i - f(x_i; w))^2$.
:::

:::proof
$\ell(w) = -\frac n2\log(2\pi\sigma^2) - \frac{1}{2\sigma^2}\sum_i(y_i - f(x_i;w))^2$. The first term and the factor $\frac{1}{2\sigma^2}$ don't depend on $w$, so maximizing $\ell$ means minimizing the sum of squares.
:::

:::steps Find the MLE of λ for Poisson counts 0, 2, 1, 3, 4, 2.
1. $\hat\lambda = \bar x$.
2. $\bar x = \frac{12}{6} = 2$.
:::

:::steps Waiting times (minutes) 2, 5, 3, 6 are modelled as exponential(λ). Find the MLE of λ and of the mean wait.
1. $\bar x = \frac{16}{4} = 4$.
2. $\hat\lambda = \frac14 = 0.25$ per minute.
3. By invariance, the MLE of the mean $1/\lambda$ is 4 minutes.
:::

:::steps Find the MLEs of μ and σ² for normal data 2, 4, 6.
1. $\hat\mu = 4$.
2. Squared deviations $4, 0, 4$ sum to 8.
3. $\hat\sigma^2 = \frac83\approx2.67$ (dividing by $n$).
:::

:::mock Exam question
Observations $x_1,\dots,x_n$ come from the density $f(x\mid\theta) = \theta x^{\theta - 1}$ on $(0, 1)$, with $\theta > 0$. (a) Write the log-likelihood. (b) Find the MLE. (c) Compute it for the data 0.5, 0.8, 0.9.
:::solution
(a) $\ell(\theta) = n\log\theta + (\theta - 1)\sum\log x_i$. (b) $\ell'(\theta) = \frac n\theta + \sum\log x_i = 0$, so $\hat\theta = -\frac{n}{\sum\log x_i}$ (positive because each $\log x_i < 0$); $\ell'' = -n/\theta^2 < 0$. (c) $\sum\log x_i = \log0.5 + \log0.8 + \log0.9\approx-0.693 - 0.223 - 0.105 = -1.021$, so $\hat\theta\approx\frac{3}{1.021}\approx2.94$.
:::
:::

:::ml
Almost every standard loss is a negative log-likelihood. Mean squared error is the NLL of Gaussian noise; binary cross-entropy is the NLL of a Bernoulli; categorical cross-entropy with softmax is the NLL of a categorical distribution. Training a classifier by minimizing cross-entropy is maximum likelihood estimation of its weights, and adding L2 regularization turns it into MAP estimation with a Gaussian prior.
:::

:::cs
Spell checkers and compression algorithms estimate symbol probabilities by maximum likelihood (counting frequencies), then smooth them to avoid zero probabilities. Network engineers fit exponential or Poisson models to traffic logs by MLE to plan capacity.
:::

:::real
Epidemiologists estimate infection rates, reliability engineers estimate failure rates, and geneticists estimate mutation rates, all by maximizing likelihoods of observed counts and times. Polling firms use MLE to fit the models that adjust raw responses for demographics.
:::

:::quiz
? 12 successes in 40 Bernoulli trials. What is the MLE of $p$?
= 0.3|3/10
> $k/n = 12/40$.

? Poisson counts 3, 5, 4. What is $\hat\lambda$?
= 4
> The sample mean.

? Exponential waiting times average 0.5 hours. What is the MLE of the rate $\lambda$?
= 2
> $\hat\lambda = 1/\bar x$.

? Why do we usually maximize the log-likelihood instead of the likelihood?
+ Logs turn products into sums and don't change the maximizer
- The log-likelihood has a different maximum that is more accurate
- The likelihood can't be maximized
> $\log$ is increasing, so the argmax is the same.

? The MLE of the normal variance divides by...
+ $n$
- $n - 1$
> It is slightly biased; the unbiased version divides by $n - 1$.

? Normal data 1, 5, 9: what is the MLE of $\sigma^2$?
= 32/3|10.67|10.667
> Mean 5; squared deviations 16, 0, 16 sum to 32; divide by 3.
:::
## Lesson: Bayesian inference {#bayesian}
@summary: Treating parameters as uncertain: priors, posteriors, the beta–binomial model, posterior mean and MAP estimates, credible intervals and the link to regularization.

### Combining what you knew with what you saw
A new restaurant has 3 reviews, all five stars. Another has 500 reviews averaging 4.7 stars. Which is more likely to be excellent? Most people sense that three perfect reviews aren't very convincing: with so little data, we should lean on what we know about restaurants in general. Maximum likelihood ignores that instinct; it would estimate the first restaurant's chance of a five-star visit as 100%. **Bayesian inference** makes the instinct precise. It treats the unknown parameter as a random quantity with a probability distribution describing our uncertainty, and it uses Bayes' theorem to update that distribution as data arrive.

### The three ingredients
Bayesian inference applies Bayes' theorem to a parameter $\theta$:
$$p(\theta\mid\text{data}) = \frac{p(\text{data}\mid\theta)\,p(\theta)}{p(\text{data})}\ \propto\ \text{likelihood}\times\text{prior}.$$
The **prior** $p(\theta)$ describes what we believe about $\theta$ before seeing the data. The **likelihood** $p(\text{data}\mid\theta)$ is exactly the function from the MLE lesson. The **posterior** $p(\theta\mid\text{data})$ is our updated belief. The denominator $p(\text{data}) = \int p(\text{data}\mid\theta)p(\theta)\,d\theta$ just makes the posterior integrate to 1; we often ignore it and normalize at the end.

The result of Bayesian inference is not one number but a whole distribution. From it we can report a best guess, an interval of plausible values, or the probability of any statement, such as $P(\theta > 0.5\mid\text{data})$.

:::def Prior distribution
A probability distribution $p(\theta)$ expressing beliefs about a parameter before seeing the data.
:::

:::def Posterior distribution
The distribution $p(\theta\mid\text{data})\propto p(\text{data}\mid\theta)p(\theta)$ expressing beliefs about the parameter after seeing the data.
:::

### The beta distribution as a prior for a probability
For an unknown probability $\theta$ between 0 and 1, the convenient prior is the **beta distribution**, $\text{Beta}(\alpha, \beta)$, with density proportional to $\theta^{\alpha - 1}(1 - \theta)^{\beta - 1}$ on $[0, 1]$. Its mean is $\frac{\alpha}{\alpha + \beta}$. $\text{Beta}(1, 1)$ is the uniform distribution, saying every value is equally plausible. $\text{Beta}(2, 2)$ is a gentle hump at 0.5. $\text{Beta}(20, 20)$ is a sharp spike at 0.5, a strong belief that $\theta$ is near a half. A useful way to read the parameters: $\text{Beta}(\alpha, \beta)$ acts like having already seen $\alpha - 1$ successes and $\beta - 1$ failures (some books say $\alpha$ and $\beta$ "pseudo-counts").

### The beta–binomial update
Now observe $k$ successes in $n$ trials. The likelihood is proportional to $\theta^k(1 - \theta)^{n-k}$. Multiply by the prior:
$$\theta^{\alpha-1}(1-\theta)^{\beta-1}\cdot\theta^k(1-\theta)^{n-k} = \theta^{\alpha+k-1}(1-\theta)^{\beta+n-k-1}.$$
That's another beta! The posterior is $\text{Beta}(\alpha + k, \beta + n - k)$. Updating is just adding successes to $\alpha$ and failures to $\beta$. When the posterior belongs to the same family as the prior, the prior is called **conjugate**.

Take the thumbtack from the last lesson: 7 ups in 10 flips. With a $\text{Beta}(2, 2)$ prior, the posterior is $\text{Beta}(9, 5)$. With the uniform $\text{Beta}(1, 1)$ prior, it's $\text{Beta}(8, 4)$.

:::def Conjugate prior
A prior for which the posterior is in the same family of distributions, such as a beta prior with binomial data.
:::

### Point estimates from the posterior
To summarize the posterior by one number we have two common choices. The **posterior mean** for $\text{Beta}(a, b)$ is $\frac{a}{a + b}$: for $\text{Beta}(9, 5)$, that's $\frac{9}{14}\approx0.643$. The **maximum a posteriori** (MAP) estimate is the peak of the posterior, $\frac{a - 1}{a + b - 2}$ when $a, b > 1$: here $\frac{8}{12}\approx0.667$. Compare with the MLE of 0.7. Both Bayesian estimates are pulled, or **shrunk**, toward the prior mean of 0.5.

The posterior mean can be written as a weighted average of the prior mean and the sample proportion:
$$\frac{\alpha + k}{\alpha + \beta + n} = \frac{\alpha + \beta}{\alpha + \beta + n}\cdot\frac{\alpha}{\alpha + \beta} + \frac{n}{\alpha + \beta + n}\cdot\frac kn.$$
With little data the prior dominates; with lots of data the weight $\frac{n}{\alpha + \beta + n}$ approaches 1 and the posterior agrees with the MLE. For the restaurant with 3 perfect reviews and a $\text{Beta}(4, 1)$ prior (mean 0.8), the posterior mean is $\frac{7}{8} = 0.875$, not 1. Data eventually overwhelm any reasonable prior.

:::def MAP estimate
The maximum a posteriori estimate: the value of $\theta$ that maximizes the posterior density.
:::

### Credible intervals
A Bayesian **credible interval** is an interval containing a given posterior probability, such as the middle 95% of the posterior. For $\text{Beta}(9, 5)$, the central 95% interval is roughly $(0.39, 0.86)$. Its interpretation is the one people naturally want: given the data and the prior, there's a 95% probability $\theta$ lies in this interval. (A frequentist confidence interval, next lesson, has a subtler meaning.)

### Normal data with a normal prior
For a mean $\mu$ with known noise $\sigma^2$, a normal prior $N(\mu_0, \tau^2)$ is conjugate. The posterior is normal with **precision** (one over variance) equal to the sum of the prior precision and the data precision, $\frac{1}{\tau^2} + \frac{n}{\sigma^2}$, and its mean is a precision-weighted average of $\mu_0$ and $\bar x$. Again: a compromise, leaning toward whichever source is more precise.

### Priors and regularization
The MAP estimate maximizes $\log p(\text{data}\mid\theta) + \log p(\theta)$, the log-likelihood plus a log-prior. With a Gaussian prior on weights, $\log p(w) = -\frac{\|w\|^2}{2\tau^2} + \text{const}$, which is exactly an L2 penalty. With a Laplace prior it's an L1 penalty. So regularized machine learning is MAP estimation, and the strength of the regularizer reflects how strongly we believe weights should be small.

### Common mistakes
A prior isn't "cheating" but it should be stated and justified, and conclusions should be checked under a few reasonable priors. A prior that puts zero probability on a value can never be updated to include it, so avoid priors that rule out plausible values. Don't confuse the posterior mean, the MAP and the MLE; they coincide only in special cases. And remember the posterior describes uncertainty about the parameter, not the variability of future data points (that is the predictive distribution).

### Summary
Bayesian inference treats parameters as uncertain and updates a prior to a posterior with posterior ∝ likelihood × prior. The beta prior is conjugate for binomial data: $\text{Beta}(\alpha, \beta)$ becomes $\text{Beta}(\alpha + k, \beta + n - k)$. Posterior means and MAP estimates shrink the MLE toward the prior, less so as data grow. Credible intervals give direct probability statements, and MAP with Gaussian or Laplace priors is L2 or L1 regularization.

@viz distribution kind=beta α=9 β=5 lo=0.5 hi=1 | Beta(9, 5): the posterior after 7 ups in 10 flips with a Beta(2, 2) prior. The pink area is P(θ > 0.5 | data).

:::explore
**What to try**
1. With $\alpha = 9$, $\beta = 5$, read the mean $9/14\approx0.643$ and the shaded probability that $\theta > 0.5$ (about 0.87).
2. Set $\alpha = 2$, $\beta = 2$ to see the prior alone. Then step to the posterior by adding 7 to $\alpha$ and 3 to $\beta$.
3. Imagine ten times as much data, 70 ups in 100 flips: you would need $\alpha = 72$, $\beta = 32$, which is beyond the sliders. Instead compare $\text{Beta}(8, 4)$ with $\text{Beta}(4, 2)$: same mean, but the first is narrower.
4. Try $\alpha = \beta = 1$ (flat) and $\alpha = \beta = 10$ (a strong belief near 0.5) and think about how each would react to 7 ups in 10.

**What to notice:** adding data shifts the curve toward the sample proportion and makes it narrower, which is the posterior becoming more certain. The mean $\frac{\alpha}{\alpha+\beta}$ always lies between the prior mean and the data proportion, as in the weighted-average formula.
:::

:::formulas
$$p(\theta\mid D) = \frac{p(D\mid\theta)p(\theta)}{p(D)}\propto p(D\mid\theta)p(\theta)$$
$$\text{Beta}(\alpha,\beta) \xrightarrow{k \text{ of } n} \text{Beta}(\alpha + k, \beta + n - k)$$
$$E[\theta] = \frac{\alpha}{\alpha+\beta},\qquad \text{MAP} = \frac{\alpha - 1}{\alpha + \beta - 2}$$
$$\hat\theta_{\text{MAP}} = \arg\max_\theta\big[\log p(D\mid\theta) + \log p(\theta)\big]$$
$$\text{normal: } \frac{1}{\tau_n^2} = \frac{1}{\tau^2} + \frac{n}{\sigma^2},\quad \mu_n = \tau_n^2\Big(\frac{\mu_0}{\tau^2} + \frac{n\bar x}{\sigma^2}\Big)$$
:::

:::thm Beta–binomial conjugacy
If $\theta\sim\text{Beta}(\alpha, \beta)$ and, given $\theta$, $K\sim\text{Bin}(n, \theta)$, then $\theta\mid K = k\sim\text{Beta}(\alpha + k, \beta + n - k)$.
:::

:::proof
The posterior is proportional to $\binom nk\theta^k(1-\theta)^{n-k}\cdot\theta^{\alpha-1}(1-\theta)^{\beta-1}\propto\theta^{\alpha+k-1}(1-\theta)^{\beta+n-k-1}$, which is the kernel of $\text{Beta}(\alpha+k, \beta+n-k)$. The normalizing constant is whatever makes it integrate to 1.
:::

:::thm MAP with a Gaussian prior is L2 regularization
If $w\sim N(0, \tau^2I)$, then $\hat w_{\text{MAP}} = \arg\min_w\big[-\log p(D\mid w) + \frac{1}{2\tau^2}\|w\|^2\big]$.
:::

:::proof
$\log p(w) = -\frac{\|w\|^2}{2\tau^2} + \text{const}$. Maximizing $\log p(D\mid w) + \log p(w)$ is the same as minimizing its negative, which is the negative log-likelihood plus $\frac{1}{2\tau^2}\|w\|^2$.
:::

:::steps Prior Beta(1, 1); observe 4 successes in 6 trials. Find the posterior, its mean and the MAP.
1. Posterior $\text{Beta}(1 + 4, 1 + 2) = \text{Beta}(5, 3)$.
2. Mean $\frac58 = 0.625$.
3. MAP $\frac{4}{6}\approx0.667$, equal to the MLE because the prior is flat.
:::

:::steps A conversion rate has prior Beta(2, 18) (mean 0.1). In 100 visits there are 15 conversions. Find the posterior mean.
1. Posterior $\text{Beta}(2 + 15, 18 + 85) = \text{Beta}(17, 103)$.
2. Mean $\frac{17}{120}\approx0.142$, between the prior 0.1 and the data 0.15.
:::

:::steps With prior N(50, 10²) for μ and n = 4 observations with σ = 10 and sample mean 60, find the posterior mean.
1. Prior precision $\frac{1}{100}$; data precision $\frac{4}{100}$; total $\frac{5}{100}$.
2. Posterior mean $= \frac{1\times50 + 4\times60}{5} = \frac{290}{5} = 58$.
:::

:::mock Exam question
A website tests a new button. With a $\text{Beta}(1, 1)$ prior on its click rate, it observes 9 clicks in 30 visits. (a) Find the posterior. (b) Find the posterior mean and MAP, and compare with the MLE. (c) Another analyst uses $\text{Beta}(10, 40)$. Find her posterior mean and explain the difference.
:::solution
(a) $\text{Beta}(10, 22)$. (b) Mean $\frac{10}{32} = 0.3125$; MAP $\frac{9}{30} = 0.3$ (equal to the MLE because the prior is flat). (c) $\text{Beta}(19, 61)$ with mean $\frac{19}{80} = 0.2375$. Her prior (mean 0.2, worth about 50 trials) is strong relative to 30 visits, so it pulls the estimate toward 0.2.
:::
:::

:::ml
Bayesian ideas run through modern ML: L2 and L1 regularization are MAP estimation, Laplace (add-one) smoothing in Naive Bayes is a Beta/Dirichlet posterior mean, Thompson sampling for bandits and A/B tests samples from beta posteriors, Gaussian processes and Bayesian neural networks give predictive uncertainty, and Bayesian optimization tunes hyperparameters.
:::

:::cs
Spam filters and recommendation systems use Bayesian updating to handle items with few observations, ranking a product with 3 perfect reviews below one with 500 great reviews by using a posterior estimate instead of a raw average.
:::

:::real
Weather forecasters, insurers and doctors combine base rates with new evidence. In clinical trials, Bayesian designs update the probability that a drug works as patients are enrolled, which can stop a trial early when the evidence becomes overwhelming.
:::

:::quiz
? Prior Beta(2, 3); observe 5 successes and 5 failures. What is the posterior's first parameter $\alpha$?
= 7
> $\alpha + k = 2 + 5$.

? What is the mean of Beta(3, 7)?
= 0.3|3/10
> $\alpha/(\alpha+\beta) = 3/10$.

? With a uniform Beta(1, 1) prior, the MAP estimate equals...
+ the MLE $k/n$
- the prior mean 0.5
- always 0
> A flat prior doesn't change the location of the peak.

? Posterior Beta(6, 4). What is the MAP estimate?
= 5/8|0.625
> $(\alpha-1)/(\alpha+\beta-2) = 5/8$.

? As the amount of data grows, the posterior mean...
+ approaches the MLE
- approaches the prior mean
- stops changing
> The weight on the data, $n/(\alpha+\beta+n)$, tends to 1.

? L2 regularization corresponds to MAP estimation with which prior on the weights?
+ Gaussian
- Laplace
- Uniform
> $\log$ of a Gaussian density is $-\|w\|^2/2\tau^2$ plus a constant.
:::
## Lesson: Confidence intervals {#confidence}
@summary: Reporting an estimate with its uncertainty: z-intervals, t-intervals, intervals for proportions, what "95% confidence" really means, and choosing a sample size.

### An estimate without an error bar is half an answer
A poll says 52% of voters support a candidate. Is that a lead? It depends on how precise the poll is. If it surveyed 50 people, 52% could easily come from a population that is 40% supportive. If it surveyed 50,000, it almost certainly couldn't. A single number, a **point estimate**, hides this. A **confidence interval** reports a range of plausible values for the parameter, built so that the method captures the true value a known fraction of the time. Scientists, pollsters and engineers report intervals because they show both the estimate and how much to trust it.

### Building the interval from the sampling distribution
Start with the sample mean. From the CLT, $\bar X$ is approximately $N(\mu, \sigma^2/n)$, so
$$P\Big(-1.96\le\frac{\bar X - \mu}{\sigma/\sqrt n}\le1.96\Big)\approx0.95.$$
Rearranging the inequality to put $\mu$ in the middle gives
$$P\Big(\bar X - 1.96\frac{\sigma}{\sqrt n}\le\mu\le\bar X + 1.96\frac{\sigma}{\sqrt n}\Big)\approx0.95.$$
So the interval $\bar x\pm1.96\frac{\sigma}{\sqrt n}$ is a **95% confidence interval** for $\mu$. It has the general shape
$$\text{estimate}\pm(\text{critical value})\times(\text{standard error}).$$
The term after $\pm$ is the **margin of error**. Suppose battery lifetimes have known $\sigma = 10$ hours, and a sample of $n = 25$ has $\bar x = 50$. The standard error is $\frac{10}{5} = 2$, the margin is $1.96\times2 = 3.92$, and the interval is $(46.08, 53.92)$ hours.

For other confidence levels, replace 1.96 by the matching critical value $z^*$: 1.645 for 90%, 1.96 for 95% and 2.576 for 99%. Higher confidence requires a wider interval.

:::def Confidence interval
An interval computed from the data by a procedure that captures the true parameter in a stated fraction (the confidence level) of repeated samples.
:::

:::def Margin of error
The half-width of a confidence interval: the critical value times the standard error.
:::

### What "95% confident" means
This is the most misunderstood idea in introductory statistics. The parameter $\mu$ is fixed; it's the interval that's random, because it depends on the sample. "95% confidence" is a property of the **procedure**: if we repeated the study many times, about 95% of the intervals we built would contain $\mu$. For the one interval we actually computed, $(46.08, 53.92)$, $\mu$ is either inside or it isn't; we just don't know which. It's like a ring toss by a player who succeeds 95% of the time: before the throw you're 95% sure, after the throw the ring is either on the peg or not.

It is therefore not quite right to say "there is a 95% probability that $\mu$ is between 46.08 and 53.92." That is the Bayesian credible-interval statement, which needs a prior. In practice, with weak priors and moderate data, the two intervals are often numerically similar, but their meanings differ.

### When σ is unknown: the t-interval
We rarely know $\sigma$. The natural fix is to plug in the sample standard deviation $s$. But $s$ is itself random, which adds extra uncertainty, especially for small samples. William Gosset, a chemist at the Guinness brewery, worked out in 1908 that the statistic $\frac{\bar X - \mu}{s/\sqrt n}$ follows the **$t$ distribution with $n - 1$ degrees of freedom** when the data are normal. The $t$ distribution looks like the standard normal but with heavier tails, so its critical values are larger. As $n$ grows it approaches the normal.

The **t-interval** is $\bar x\pm t^*_{n-1}\frac{s}{\sqrt n}$. For $n = 16$, the 95% critical value is $t^*_{15} = 2.131$ instead of 1.96. If $\bar x = 30$ and $s = 8$, the standard error is $\frac84 = 2$, the margin is $4.262$, and the interval is $(25.74, 34.26)$. For $n = 100$, $t^*_{99}\approx1.984$, already close to 1.96.

:::def t distribution
The distribution of $(\bar X - \mu)/(S/\sqrt n)$ for normal data; it is symmetric with heavier tails than the normal, indexed by its degrees of freedom $n - 1$.
:::

### Intervals for proportions
For a proportion, the standard error is estimated by $\sqrt{\frac{\hat p(1-\hat p)}{n}}$, giving the interval $\hat p\pm z^*\sqrt{\frac{\hat p(1-\hat p)}{n}}$. If 520 of 1000 voters support a candidate, $\hat p = 0.52$, the SE is $\sqrt{\frac{0.52\times0.48}{1000}}\approx0.0158$, and the 95% interval is $0.52\pm0.031$, or $(0.489, 0.551)$. Because the interval includes values below 0.5, the poll doesn't establish a majority. This simple interval works well when there are at least about 10 successes and 10 failures; for small counts, better methods such as the Wilson interval are used.

### Choosing the sample size
Solving the margin formula for $n$ tells us how much data we need. For a mean, $n = \big(\frac{z^*\sigma}{E}\big)^2$ for margin $E$. For a proportion, $p(1-p)$ is at most $\frac14$, so $n = \frac{(z^*)^2}{4E^2}$ guarantees the margin. For a $\pm3$ point margin at 95%, $n = \frac{1.96^2}{4\times0.0009}\approx1067.1$, so 1068 people, which is why national polls often survey about a thousand. Halving the margin requires four times as many people.

### What makes an interval narrower
Three things control the width: the confidence level (higher means wider), the variability of the data ($\sigma$ or $s$, larger means wider) and the sample size (larger means narrower, like $\frac{1}{\sqrt n}$). Only the sample size and the measurement quality are usually under our control.

### Common mistakes
Don't say "95% of the data lie in the interval": the interval is for the mean, not for individual values, and it gets narrower as $n$ grows while the data's spread doesn't. Don't say "95% probability the true value is in this particular interval" in a frequentist analysis. Don't use $z^*$ with a small sample and an estimated $s$; use $t$. And remember that a confidence interval only accounts for random sampling error, not for bias from a bad sample or measurement errors.

### Summary
A confidence interval is estimate ± critical value × standard error. For a mean with known $\sigma$, use $\bar x\pm z^*\sigma/\sqrt n$; with estimated $s$, use $\bar x\pm t^*_{n-1}s/\sqrt n$; for a proportion, $\hat p\pm z^*\sqrt{\hat p(1-\hat p)/n}$. A 95% interval comes from a procedure that captures the true value 95% of the time. Width shrinks like $1/\sqrt n$, which determines the sample size needed for a target margin.

@viz ci | Each horizontal line is a 95% interval from a new random sample; red ones miss the true mean.

:::explore
**What to try**
1. Press "Draw 100 new samples" several times and count the red intervals. It should be about 5 each time, sometimes 2 or 8.
2. Increase $n$ from 25 to 100. The intervals become about half as long, but the fraction that miss stays near 5%.
3. Lower the critical value $z$ from 1.96 to 1.0. The intervals get shorter and about 32 in 100 now miss.
4. Raise $z$ to 2.58 and confirm only about 1 in 100 misses.

**What to notice:** the true mean never moves; the intervals do. "95% confidence" is the long-run capture rate of the procedure, exactly as the article describes. Sample size changes the width but not the capture rate, while the critical value trades width against capture rate.
:::

:::formulas
$$\bar x\pm z^*\frac{\sigma}{\sqrt n}\qquad(\sigma\text{ known})$$
$$\bar x\pm t^*_{n-1}\frac{s}{\sqrt n}\qquad(\sigma\text{ unknown})$$
$$\hat p\pm z^*\sqrt{\frac{\hat p(1-\hat p)}{n}}$$
$$z^*: 1.645\ (90\%),\ 1.96\ (95\%),\ 2.576\ (99\%)$$
$$n = \Big(\frac{z^*\sigma}{E}\Big)^2,\qquad n = \frac{(z^*)^2}{4E^2}\ \text{(proportion, worst case)}$$
:::

:::thm Coverage of the z-interval
If $X_1,\dots,X_n$ are i.i.d. $N(\mu, \sigma^2)$ with $\sigma$ known, then $P\big(\bar X - z^*\frac{\sigma}{\sqrt n}\le\mu\le\bar X + z^*\frac{\sigma}{\sqrt n}\big) = 2\Phi(z^*) - 1$.
:::

:::proof
$Z = \frac{\bar X - \mu}{\sigma/\sqrt n}\sim N(0,1)$. The event $|Z|\le z^*$ is the same as $\mu\in\bar X\pm z^*\frac{\sigma}{\sqrt n}$ after rearranging, and $P(|Z|\le z^*) = \Phi(z^*) - \Phi(-z^*) = 2\Phi(z^*) - 1$.
:::

:::steps A sample of 36 has mean 120 and the population SD is 18. Find a 95% CI for μ.
1. $\text{SE} = \frac{18}{6} = 3$.
2. Margin $= 1.96\times3 = 5.88$.
3. CI: $(114.12, 125.88)$.
:::

:::steps A sample of 9 measurements has mean 4.2 and s = 0.6. Find a 95% CI (t* with 8 df is 2.306).
1. $\text{SE} = \frac{0.6}{3} = 0.2$.
2. Margin $= 2.306\times0.2 = 0.461$.
3. CI: $(3.739, 4.661)$.
:::

:::steps How many people must be surveyed for a 95% margin of error of 2 percentage points?
1. $n = \frac{1.96^2}{4(0.02)^2} = \frac{3.8416}{0.0016} = 2401$.
2. Survey at least 2401 people.
:::

:::mock Exam question
In a random sample of 400 customers, 88 said they would buy a new product. (a) Construct a 95% confidence interval for the proportion of all customers who would buy it. (b) A manager says, "There's a 95% chance the true proportion is in this interval." Explain what's wrong. (c) How would the interval change with 1600 customers and the same sample proportion?
:::solution
(a) $\hat p = 0.22$, $\text{SE} = \sqrt{\frac{0.22\times0.78}{400}} = \sqrt{0.000429}\approx0.0207$, margin $1.96\times0.0207\approx0.041$, CI $\approx(0.179, 0.261)$. (b) The true proportion is fixed; 95% describes how often the method succeeds over repeated samples, not the chance for this one interval. (c) The SE halves, so the margin becomes about 0.020, giving roughly $(0.200, 0.240)$.
:::
:::

:::ml
Report model metrics with intervals: an accuracy of 0.90 on 500 test examples has a 95% interval of about $0.90\pm1.96\sqrt{0.09/500} = 0.90\pm0.026$. When comparing two models whose intervals overlap heavily, the test set may simply be too small to tell them apart. Cross-validation scores are reported as mean ± standard error across folds.
:::

:::cs
Benchmarks of code performance should report confidence intervals for run times, since background processes add noise. Tools like hyperfine and criterion run many repetitions and report intervals, and capacity planning uses intervals for expected load.
:::

:::real
News reports of polls include a margin of error, typically about 3 points for 1,000 respondents. Medical studies report effects such as "the drug lowered blood pressure by 8 mmHg (95% CI 5 to 11)," which shows both the size of the effect and its precision.
:::

:::quiz
? $\bar x = 80$, $\sigma = 10$, $n = 100$. What is the margin of error of a 95% z-interval?
= 1.96
> SE $= 10/10 = 1$; margin $= 1.96\times1$.

? To halve the width of a confidence interval, the sample size must be multiplied by...
= 4
> Width scales like $1/\sqrt n$.

? Which gives a wider interval, with everything else equal?
+ 99% confidence
- 90% confidence
> A higher capture rate needs a larger critical value.

? What does "95% confidence" refer to?
+ The long-run fraction of intervals from this method that contain the true parameter
- The probability that this specific interval contains the parameter
- The fraction of data values inside the interval
> The parameter is fixed; the method is what has a 95% success rate.

? $\hat p = 0.5$, $n = 100$. What is the estimated standard error?
= 0.05|1/20
> $\sqrt{0.25/100} = 0.05$.

? For small samples with unknown $\sigma$ and roughly normal data, which critical value should you use?
+ $t^*$ with $n - 1$ degrees of freedom
- $z^*$
> Estimating $\sigma$ adds uncertainty, which the heavier-tailed $t$ distribution accounts for.
:::
# Unit: Hypothesis testing

## Lesson: Hypothesis testing and p-values {#hypothesis}
@summary: Null and alternative hypotheses, test statistics, p-values, significance levels, Type I and II errors, power, and how not to fool yourself.

### Is it real, or just chance?
A coin lands heads 60 times in 100 flips. Is it biased, or did a fair coin just have a lucky streak? A new teaching method raises average scores by 3 points in a trial. Does it work, or would scores have bounced around by 3 points anyway? Every scientist, analyst and engineer who runs experiments faces this question. Random variation can produce apparent effects out of nothing, and **hypothesis testing** is the standard procedure for deciding whether an observed effect is too large to be explained by chance alone.

The logic is like a criminal trial. We start by presuming innocence, here that there is no effect. We look at the evidence. Only if the evidence would be very surprising under the presumption of innocence do we reject it. We never prove innocence; we only fail to find enough evidence against it.

### The null and alternative hypotheses
The **null hypothesis** $H_0$ is the "nothing interesting is happening" claim: the coin is fair ($p = 0.5$), the new method has no effect, the two groups have the same mean. The **alternative hypothesis** $H_1$ (or $H_a$) is what we suspect might be true instead: $p\ne0.5$, or the method increases scores. Hypotheses are always statements about population parameters, not about the sample.

The alternative can be **two-sided** ($p\ne0.5$: any difference counts) or **one-sided** ($p > 0.5$: only a difference in one direction counts). The choice must be made before looking at the data, based on the question being asked.

:::def Null hypothesis
The default claim $H_0$ of no effect or no difference, which a test tries to find evidence against.
:::

:::def Alternative hypothesis
The claim $H_1$ that the parameter differs from the null value, in one direction (one-sided) or either direction (two-sided).
:::

### The test statistic
Next we summarize the evidence in a **test statistic** that measures how far the data are from what $H_0$ predicts, in units of standard error. For the coin, under $H_0$ the number of heads in 100 flips has mean 50 and standard deviation $\sqrt{100\times0.5\times0.5} = 5$. Our 60 heads give
$$z = \frac{60 - 50}{5} = 2.$$
The result is 2 standard errors above what a fair coin would produce on average. By the CLT, if $H_0$ is true, $z$ is approximately standard normal.

### The p-value
How surprising is $z = 2$ if the coin is fair? The **p-value** is the probability, *assuming $H_0$ is true*, of getting a test statistic at least as extreme as the one observed. For a two-sided test, "extreme" means far from zero in either direction:
$$p = P(|Z|\ge2) = 2(1 - \Phi(2)) = 2(1 - 0.9772) = 0.0455.$$
If the coin were fair, results this lopsided (60 or more heads, or 40 or fewer) would happen only about 4.6% of the time. For a one-sided test of $H_1: p > 0.5$, only the upper tail counts, and the p-value is $0.0228$.

A small p-value means the data would be unusual if $H_0$ were true, which is evidence against $H_0$. A large p-value means the data are consistent with $H_0$, which is not the same as evidence for it.

:::def p-value
The probability, computed assuming the null hypothesis is true, of a test statistic at least as extreme as the one observed.
:::

### Significance level and the decision
Before collecting data we choose a **significance level** $\alpha$, most often 0.05. If $p\le\alpha$ we **reject $H_0$** and call the result **statistically significant**. Otherwise we **fail to reject $H_0$**. With $\alpha = 0.05$, the coin's $p = 0.0455$ leads us to reject fairness, just barely. With $\alpha = 0.01$, we would not. Equivalently, for a two-sided z-test at $\alpha = 0.05$ we reject when $|z| > 1.96$; this cutoff is the **critical value**, and the set of values beyond it is the **rejection region**.

There's a close link to confidence intervals: a two-sided test at level $\alpha$ rejects $H_0: \mu = \mu_0$ exactly when $\mu_0$ lies outside the $(1 - \alpha)$ confidence interval.

:::def Significance level
The threshold $\alpha$ for rejecting $H_0$; it equals the probability of a Type I error when $H_0$ is true.
:::

### Two kinds of error
Any decision rule can go wrong in two ways. A **Type I error** is rejecting $H_0$ when it is actually true: a false alarm, like convicting an innocent person. Its probability is $\alpha$, which is why we keep $\alpha$ small. A **Type II error** is failing to reject $H_0$ when it is false: a missed discovery, like acquitting a guilty person. Its probability is called $\beta$. The **power** of a test, $1 - \beta$, is the probability of correctly detecting a real effect.

| | $H_0$ true | $H_0$ false |
|---|---|---|
| Reject $H_0$ | Type I error ($\alpha$) | Correct (power $1-\beta$) |
| Fail to reject | Correct | Type II error ($\beta$) |

The two errors trade off: lowering $\alpha$ makes it harder to reject, which raises $\beta$. The only way to reduce both is more data (or less noisy measurements). Power is higher when the true effect is larger, when the sample is larger, and when variability is smaller. The A/B testing lesson shows how to choose a sample size for a target power.

:::def Type I and Type II errors
A Type I error rejects a true null hypothesis (probability $\alpha$); a Type II error fails to reject a false one (probability $\beta$). Power is $1 - \beta$.
:::

### What a p-value is not
A p-value is **not** the probability that $H_0$ is true; that would require Bayes' theorem and a prior. A p-value of 0.03 doesn't mean there's a 3% chance the coin is fair. It's also **not** a measure of effect size: with a huge sample, a tiny, unimportant difference can produce $p < 0.001$. That's the distinction between **statistical significance** and **practical significance**. Always report the size of the effect, ideally with a confidence interval, alongside the p-value.

### How people fool themselves
If you test 20 true null hypotheses at $\alpha = 0.05$, you expect one "significant" result by chance. Running many tests, trying different subgroups, or stopping data collection as soon as $p < 0.05$, and then reporting only the significant results is called **p-hacking**, and it has filled journals with findings that don't replicate. The safeguards are to state hypotheses and analyses in advance, correct for multiple comparisons, and value replication.

### Summary
A hypothesis test starts from a null hypothesis of no effect, computes a test statistic measuring the distance from the null in standard errors, and finds the p-value: the chance of data at least this extreme if $H_0$ were true. Reject $H_0$ if $p\le\alpha$. Type I errors (false alarms) have probability $\alpha$; Type II errors (misses) have probability $\beta$; power is $1 - \beta$. A p-value isn't the probability $H_0$ is true, and significance isn't importance.

@viz hypothesis z=2 | The shaded tails are the p-value for the observed z. Compare it with α.

:::explore
**What to try**
1. Set the observed $z$ to 2 with a two-sided test, read the p-value (about 0.046) and check that it is below $\alpha = 0.05$.
2. Switch to one-sided. The p-value halves to about 0.023, since only one tail counts.
3. Back on two-sided, slide $z$ down until the result stops being significant at $\alpha = 0.05$; it happens at $|z| = 1.96$.
4. Lower $\alpha$ to 0.01. Now $z = 2$ is not significant; find the new critical value (about 2.58).
5. Set $z = -2$ in the one-sided ($>$) test. The p-value is large, because evidence in the wrong direction doesn't support $H_1: p > 0.5$.

**What to notice:** the p-value is a tail area under the null distribution, and the decision just compares it with $\alpha$. Making $\alpha$ smaller pushes the rejection region outward, fewer false alarms but more missed effects, which is the Type I/Type II tradeoff from the article.
:::

:::formulas
$$z = \frac{\text{estimate} - \text{null value}}{\text{SE under } H_0}$$
$$\text{two-sided: } p = 2\big(1 - \Phi(|z|)\big),\qquad \text{one-sided }(>): p = 1 - \Phi(z)$$
$$\text{reject } H_0 \iff p\le\alpha$$
$$P(\text{Type I}) = \alpha,\quad P(\text{Type II}) = \beta,\quad \text{power} = 1 - \beta$$
$$\text{proportion: } z = \frac{\hat p - p_0}{\sqrt{p_0(1-p_0)/n}}$$
:::

:::thm The p-value is uniform under the null
If $H_0$ is true and the test statistic is continuous, the p-value is uniformly distributed on $[0, 1]$. Hence $P(p\le\alpha\mid H_0) = \alpha$.
:::

:::proof
For a one-sided test, $p = 1 - F(T)$ where $F$ is the null CDF of the statistic $T$. Then $P(p\le\alpha) = P(F(T)\ge1 - \alpha) = 1 - (1 - \alpha) = \alpha$, because $F(T)$ is uniform when $T$ has continuous CDF $F$ (the probability integral transform).
:::

:::steps A factory claims 10% of its parts are defective. In a sample of 400, 52 are defective. Test H₀: p = 0.1 against p > 0.1 at α = 0.05.
1. $\hat p = 0.13$; SE under $H_0$: $\sqrt{\frac{0.1\times0.9}{400}} = 0.015$.
2. $z = \frac{0.13 - 0.10}{0.015} = 2$.
3. One-sided $p = 1 - \Phi(2) = 0.0228 < 0.05$: reject $H_0$; the defect rate appears higher than claimed.
:::

:::steps Bottles should contain 500 ml (σ = 6 ml). A sample of 36 has mean 498. Test H₀: μ = 500 (two-sided, α = 0.05).
1. $\text{SE} = \frac{6}{6} = 1$; $z = \frac{498 - 500}{1} = -2$.
2. $p = 2(1 - \Phi(2)) = 0.0455 < 0.05$: reject $H_0$.
:::

:::steps A test with α = 0.05 is run on 40 independent true null hypotheses. How many false positives are expected, and what is P(at least one)?
1. Expected: $40\times0.05 = 2$.
2. $P(\text{at least one}) = 1 - 0.95^{40}\approx1 - 0.129 = 0.871$.
:::

:::mock Exam question
A website's historical sign-up rate is 8%. After a redesign, 120 of 1,200 visitors sign up. (a) State hypotheses to test whether the rate increased. (b) Compute the test statistic and p-value. (c) State your conclusion at $\alpha = 0.05$, and comment on practical significance.
:::solution
(a) $H_0: p = 0.08$; $H_1: p > 0.08$. (b) $\hat p = 0.10$; SE $= \sqrt{\frac{0.08\times0.92}{1200}} = \sqrt{0.0000613}\approx0.00783$; $z = \frac{0.02}{0.00783}\approx2.55$; $p = 1 - \Phi(2.55)\approx0.0054$. (c) Reject $H_0$: there is strong evidence the rate rose. The increase of 2 points (a 25% relative lift) is also practically meaningful, though it was not a randomized comparison, so other changes over time could contribute.
:::
:::

:::ml
Hypothesis tests decide whether one model is really better than another: McNemar's test compares two classifiers on the same test set, and paired tests across cross-validation folds compare learning algorithms. Running many such comparisons, such as tuning on the test set, is the ML version of p-hacking and inflates reported performance.
:::

:::cs
Performance regression detection in continuous integration tests whether a new build is slower than the old one, balancing false alarms (Type I) against missed regressions (Type II). Anomaly detectors in monitoring systems set alert thresholds the same way.
:::

:::real
Drug approval requires randomized trials with pre-registered hypotheses and significance levels. The 2015 Reproducibility Project tried to replicate 100 psychology studies and found that only about 36% gave significant results again, a wake-up call about p-hacking and underpowered studies.
:::

:::quiz
? For a two-sided z-test, $z = 1.5$ and $\Phi(1.5) = 0.9332$. What is the p-value?
= 0.1336
> $2(1 - 0.9332)$.

? A p-value of 0.03 means...
+ data at least this extreme would occur 3% of the time if $H_0$ were true
- there is a 3% chance that $H_0$ is true
- the effect is 3% in size
> The p-value is computed assuming $H_0$; it isn't a probability of $H_0$.

? Rejecting a true null hypothesis is a...
+ Type I error
- Type II error
> A false alarm.

? A test has $\beta = 0.2$. What is its power?
= 0.8|4/5
> Power $= 1 - \beta$.

? 100 flips of a fair coin: what is the z-statistic for 45 heads?
= -1
> $(45 - 50)/5$.

? With an enormous sample, a statistically significant result is...
- always practically important
+ possibly too small to matter in practice
> Large samples detect tiny effects; check the effect size.
:::
## Lesson: Common tests: t-tests and chi-square tests {#tests}
@summary: Choosing and running the standard tests: one-sample, paired and two-sample t-tests, the two-proportion z-test, and chi-square tests for goodness of fit and independence.

### A toolbox of tests
The previous lesson set out the logic of hypothesis testing: a null hypothesis, a test statistic, a p-value and a decision. In practice the logic is always the same, but the test statistic depends on the kind of data and the question. Are you comparing one mean with a target? Two groups with each other? The same people before and after? Counts in categories? This lesson covers the handful of tests that handle the great majority of real questions, explains when each one applies, and shows how to carry each one out by hand so that the output of statistical software stops being a mystery.

Every test below follows one pattern: **statistic = (observed − expected under $H_0$) / (standard error)**, or for categorical data a sum of squared standardized differences. Then the statistic is compared with its distribution under $H_0$.

### The one-sample t-test
A coffee chain says its large cups hold 50 cl on average. You measure $n = 16$ cups and find $\bar x = 52$ with $s = 6$. Is the true mean different from 50? Since $\sigma$ is unknown, we use the **t statistic**
$$t = \frac{\bar x - \mu_0}{s/\sqrt n} = \frac{52 - 50}{6/4} = \frac{2}{1.5}\approx1.33,$$
which under $H_0$ has a $t$ distribution with $n - 1 = 15$ degrees of freedom. The two-sided critical value at $\alpha = 0.05$ is 2.131, and $|t| = 1.33$ is well below it; the p-value is about 0.20. We fail to reject $H_0$: a 2 cl difference could easily be chance with only 16 cups and this much variation.

The t-test assumes the observations are independent and roughly normal. For moderate or large samples, the CLT makes it robust to non-normality, but with small, strongly skewed samples or outliers it can mislead.

:::def t-test
A test for means that uses the statistic $t = (\text{estimate} - \text{null value})/\text{SE}$ with an estimated standard deviation and compares it with a $t$ distribution.
:::

### The paired t-test
Often each subject is measured twice: blood pressure before and after a drug, or the time for the same task with two interfaces. The two measurements on one person are strongly related, so we analyse the **differences** $d_i = \text{after} - \text{before}$ and run a one-sample t-test of $H_0$: mean difference $= 0$. Suppose 9 students take a test before and after tutoring, and the improvements have mean $\bar d = 2.5$ and standard deviation $s_d = 3$. Then $t = \frac{2.5}{3/\sqrt9} = 2.5$ with 8 degrees of freedom. The critical value is 2.306, so we reject $H_0$ at $\alpha = 0.05$ (two-sided $p\approx0.037$). Pairing removes the large differences *between* students and focuses on the change *within* each student, which makes the test much more powerful than treating the two sets of scores as independent groups.

### The two-sample t-test
To compare two independent groups, such as patients given a drug versus a placebo, we look at the difference of sample means. Its standard error combines both groups' variances: $\text{SE} = \sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}$, because variances of independent quantities add. The statistic is
$$t = \frac{\bar x_1 - \bar x_2}{\sqrt{s_1^2/n_1 + s_2^2/n_2}}.$$
Group A ($n = 25$) averages 78 with $s = 10$, group B ($n = 25$) averages 72 with $s = 10$. $\text{SE} = \sqrt{4 + 4}\approx2.83$ and $t = \frac{6}{2.83}\approx2.12$. With about 48 degrees of freedom the two-sided p-value is about 0.039, significant at 0.05. This version, which doesn't assume equal variances, is **Welch's t-test**, and it's the safe default; its degrees of freedom come from a formula that software computes for you.

### Comparing two proportions
For yes/no outcomes, compare proportions with a z-test. Under $H_0: p_1 = p_2$, use the **pooled** proportion $\hat p$ of both groups combined: $z = \frac{\hat p_1 - \hat p_2}{\sqrt{\hat p(1-\hat p)(\frac{1}{n_1} + \frac{1}{n_2})}}$. If 30 of 50 treated patients improve versus 20 of 50 controls, $\hat p = 0.5$, the SE is $\sqrt{0.25\times0.04} = 0.1$ and $z = \frac{0.6 - 0.4}{0.1} = 2$, giving $p\approx0.046$.

### Chi-square goodness of fit
For counts in several categories, we compare **observed** counts $O$ with the counts $E$ expected under $H_0$ using
$$\chi^2 = \sum\frac{(O - E)^2}{E}.$$
Each term measures how far a category's count is from expectation, relative to its size. Under $H_0$ the statistic approximately follows a **chi-square distribution** with $k - 1$ degrees of freedom for $k$ categories. Large values are evidence against $H_0$; the test is always one-tailed (upper tail).

Is a die fair? In 60 rolls the faces 1 to 6 appear $5, 8, 9, 8, 10, 20$ times. Under fairness each has $E = 10$. Then $\chi^2 = \frac{25 + 4 + 1 + 4 + 0 + 100}{10} = 13.4$ with 5 degrees of freedom. The critical value at 0.05 is 11.07, so we reject fairness ($p\approx0.02$). The sixes contribute most of the statistic. The approximation needs all expected counts to be at least about 5.

:::def Chi-square statistic
$\chi^2 = \sum(O - E)^2/E$, comparing observed category counts $O$ with expected counts $E$; under $H_0$ it approximately follows a chi-square distribution.
:::

### Chi-square test of independence
For two categorical variables in a table, $H_0$ says they are independent. The expected count in each cell is $\frac{(\text{row total})(\text{column total})}{\text{grand total}}$, and the degrees of freedom are $(r - 1)(c - 1)$. For the treatment table above (improved/not improved by treated/control), every expected count is $\frac{50\times50}{100} = 25$, each cell contributes $\frac{5^2}{25} = 1$, and $\chi^2 = 4$ with 1 degree of freedom, $p\approx0.046$. That matches the two-proportion test exactly, since $z^2 = 2^2 = 4$; for 2×2 tables the two tests are equivalent.

### Choosing a test and checking assumptions
One numeric sample against a value: one-sample t. Two measurements on the same units: paired t. Two independent groups' means: Welch's t. Two proportions: two-proportion z or chi-square. Category counts against a model: chi-square goodness of fit. Two categorical variables: chi-square independence. Three or more group means: analysis of variance (ANOVA). If data are very skewed or ordinal with small samples, **nonparametric** tests such as the Wilcoxon signed-rank or Mann–Whitney tests, or the permutation tests of a later lesson, avoid the normality assumption.

### Common mistakes
Using a two-sample test on paired data throws away the pairing and loses power; using a paired test on independent groups is simply wrong. Running chi-square tests on percentages instead of counts gives meaningless numbers. Ignoring small expected counts makes chi-square p-values unreliable (use Fisher's exact test instead). And remember that every test assumes independent observations; repeated measurements on the same person counted as separate people inflate significance.

### Summary
Tests share the form (observed − expected)/SE. Use $t = \frac{\bar x - \mu_0}{s/\sqrt n}$ with $n - 1$ df for one mean, the same on differences for paired data, and Welch's $t$ with $\text{SE} = \sqrt{s_1^2/n_1 + s_2^2/n_2}$ for two groups. Compare proportions with a pooled z-test. For counts, $\chi^2 = \sum(O - E)^2/E$ tests goodness of fit with $k - 1$ df and independence with $(r-1)(c-1)$ df.

@viz hypothesis z=2.12 | For large df the t distribution is close to normal, so z ≈ t. Set the observed statistic from a test in the article and read the p-value.

:::explore
**What to try**
1. Set the observed statistic to 2.12, the two-sample example, with a two-sided test. The p-value is about 0.034; the exact t value with 48 df is slightly larger, 0.039, because $t$ has heavier tails.
2. Set it to 1.33, the coffee example. The p-value is about 0.18 (the exact $t_{15}$ value is about 0.20): not significant.
3. Set it to 2.0, the two-proportion test, and note $p\approx0.046$. Squaring 2 gives the chi-square statistic 4 from the article.
4. Lower $\alpha$ to 0.01 and see which of these results survive.

**What to notice:** every test in this lesson reduces the data to a standardized statistic and asks how far out in the null distribution's tail it lies. For small samples the t distribution's heavier tails make p-values a little larger than this normal picture shows, which is why we use $t$ tables then.
:::

:::formulas
$$\text{one-sample: } t = \frac{\bar x - \mu_0}{s/\sqrt n},\ df = n-1$$
$$\text{paired: } t = \frac{\bar d}{s_d/\sqrt n},\ df = n-1$$
$$\text{Welch: } t = \frac{\bar x_1 - \bar x_2}{\sqrt{s_1^2/n_1 + s_2^2/n_2}}$$
$$\text{two proportions: } z = \frac{\hat p_1 - \hat p_2}{\sqrt{\hat p(1-\hat p)(1/n_1 + 1/n_2)}}$$
$$\chi^2 = \sum\frac{(O-E)^2}{E},\quad E_{ij} = \frac{R_iC_j}{N},\quad df = k-1\ \text{or}\ (r-1)(c-1)$$
:::

:::thm Distribution of the t statistic
If $X_1,\dots,X_n$ are i.i.d. $N(\mu, \sigma^2)$, then $\frac{\bar X - \mu}{S/\sqrt n}$ has a $t$ distribution with $n - 1$ degrees of freedom.
:::

:::proof
Sketch. $Z = \frac{\bar X - \mu}{\sigma/\sqrt n}\sim N(0, 1)$, $V = \frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}$, and for normal data $\bar X$ and $S^2$ are independent. The ratio $\frac{Z}{\sqrt{V/(n-1)}}$ simplifies to $\frac{\bar X - \mu}{S/\sqrt n}$, and a standard normal divided by the square root of an independent chi-square over its df is by definition $t_{n-1}$.
:::

:::steps A sample of 25 has mean 103 and s = 10. Test H₀: μ = 100 two-sided (t* with 24 df is 2.064).
1. $\text{SE} = \frac{10}{5} = 2$; $t = \frac{3}{2} = 1.5$.
2. $|t| = 1.5 < 2.064$: fail to reject $H_0$.
:::

:::steps A survey of 200 people finds 50 prefer A, 70 prefer B and 80 prefer C. Test whether all three are equally popular.
1. Expected $\frac{200}{3}\approx66.67$ each.
2. $\chi^2 = \frac{16.67^2 + 3.33^2 + 13.33^2}{66.67} = \frac{277.8 + 11.1 + 177.8}{66.67}\approx7.0$.
3. $df = 2$, critical value 5.99, so reject equal popularity at 0.05.
:::

:::steps Five people's reaction times (ms) before and after coffee differ by −10, −20, −5, −15, −10. Find the paired t statistic.
1. $\bar d = -12$.
2. Deviations $2, -8, 7, -3, 2$; squares sum $4 + 64 + 49 + 9 + 4 = 130$; $s_d = \sqrt{130/4}\approx5.70$.
3. $t = \frac{-12}{5.70/\sqrt5}\approx\frac{-12}{2.55}\approx-4.71$ with 4 df: strongly significant (critical 2.776).
:::

:::mock Exam question
A study records whether 200 people exercise regularly and whether they report good sleep:

| | Good sleep | Poor sleep |
|---|---|---|
| Exercise | 70 | 30 |
| No exercise | 50 | 50 |

Test at $\alpha = 0.05$ whether exercise and sleep quality are independent. (The 5% critical value of $\chi^2_1$ is 3.84.)
:::solution
Row totals 100, 100; column totals 120, 80. Expected counts: $\frac{100\times120}{200} = 60$ and $\frac{100\times80}{200} = 40$ in each row. $\chi^2 = \frac{10^2}{60} + \frac{10^2}{40} + \frac{10^2}{60} + \frac{10^2}{40} = 1.667 + 2.5 + 1.667 + 2.5\approx8.33$ with 1 df. Since $8.33 > 3.84$, reject independence ($p\approx0.004$). This is association, not proof that exercise causes better sleep.
:::
:::

:::ml
Chi-square tests are used for feature selection with categorical features (scikit-learn's `chi2`), and for detecting data drift by comparing category frequencies in training and production data. Paired tests compare two models on the same cross-validation folds, which is far more powerful than unpaired comparisons.
:::

:::cs
Random number generators are validated with chi-square goodness-of-fit tests on bucket counts. Performance engineers use paired or Welch t-tests (or nonparametric tests, since latencies are skewed) to decide whether a code change made a service faster.
:::

:::real
Clinical trials compare treatment and placebo with two-sample tests, geneticists use chi-square tests to check Mendel's ratios such as 3:1, and quality engineers use t-tests to check whether a production line meets its target.
:::

:::quiz
? $\bar x = 12$, $\mu_0 = 10$, $s = 4$, $n = 16$. What is the t statistic?
= 2
> SE $= 4/4 = 1$; $t = 2/1$.

? How many degrees of freedom does a one-sample t-test with $n = 20$ have?
= 19
> $n - 1$.

? Observed counts 12 and 8, expected 10 and 10. What is $\chi^2$?
= 0.8|4/5
> $(4 + 4)/10$.

? Each patient's cholesterol is measured before and after a diet. Which test fits?
+ Paired t-test
- Welch two-sample t-test
- Chi-square goodness of fit
> Two measurements on the same people: analyse the differences.

? A 3×4 contingency table is tested for independence. How many degrees of freedom?
= 6
> $(3-1)(4-1)$.

? Two independent groups have $s_1^2/n_1 = 9$ and $s_2^2/n_2 = 16$. What is the SE of the difference in means?
= 5
> $\sqrt{9 + 16}$.
:::
## Lesson: A/B testing, power and multiple comparisons {#ab-testing}
@summary: Designing experiments that can answer the question: randomization, power and sample size, the danger of peeking, and corrections for testing many hypotheses.

### Experiments beat observation
An online shop wonders whether a green "Buy" button sells more than a blue one. It could compare last month (blue) with this month (green), but sales change with seasons, prices and news, so any difference could have many causes. The reliable way is an **A/B test**: show each visitor one of the two versions at **random**, and compare the outcomes. Randomization makes the two groups alike in every way except the button, on average, so a difference in outcomes beyond what chance explains can be attributed to the button itself. This is the same idea as a randomized controlled trial in medicine, and tech companies run thousands of such experiments a year.

But a test is only useful if it is designed well. Too few visitors and a real improvement goes undetected. Checking the results every hour and stopping when they look good produces false wins. Testing twenty variations at once almost guarantees a fluke "winner." This lesson is about designing experiments that avoid these traps.

:::def A/B test
A randomized experiment that assigns units (such as users) at random to a control version A or a treatment version B and compares an outcome metric between the groups.
:::

### Running the comparison
Suppose version A converts 10% of visitors and we want to know if B converts more. With $n$ visitors in each group, the observed rates $\hat p_A$ and $\hat p_B$ are compared with the two-proportion z-test from the previous lesson. If 1,000 visitors each see A and B, with 100 and 130 purchases, the pooled rate is $\hat p = 0.115$, the SE is $\sqrt{0.115\times0.885\times\frac{2}{1000}}\approx0.0143$, and $z = \frac{0.03}{0.0143}\approx2.10$, a two-sided p-value of about 0.036. We'd also report a confidence interval for the lift, roughly $0.03\pm1.96\times0.0143$, or 0.002 to 0.058: B is probably better, but by anything from almost nothing to almost 6 points.

### Power: will the test detect a real effect?
Before running the test, ask: if B really is better by an amount that matters, how likely is the test to say so? That probability is the **power**. Suppose the true rates are 10% and 12%, a 2-point lift we'd care about. With 1,000 visitors per group, the standard error of the difference is about $\sqrt{\frac{0.1\times0.9 + 0.12\times0.88}{1000}}\approx0.014$, so the true lift is only about $\frac{0.02}{0.014}\approx1.4$ standard errors. The test rejects only when the observed $z$ exceeds 1.96, which happens with probability about $P(Z > 1.96 - 1.4) = P(Z > 0.56)\approx0.29$. A real, valuable improvement would be missed 71% of the time. The experiment is **underpowered**.

:::def Power
The probability that a test rejects $H_0$ when a specified alternative is true, $1 - \beta$.
:::

Power depends on four things. It increases with the **true effect size** $\delta$ (bigger lifts are easier to see), with the **sample size** (smaller standard errors), with the significance level $\alpha$ (a looser threshold), and it decreases with the **noise** in the outcome.

### Choosing the sample size
Turning the power argument around gives the sample size needed to detect a lift $\delta$ with power $1 - \beta$ at two-sided level $\alpha$. Per group, approximately
$$n = \frac{(z_{\alpha/2} + z_\beta)^2\cdot2\bar p(1-\bar p)}{\delta^2},$$
where $\bar p$ is the average of the two rates. The standard choice $\alpha = 0.05$ and power 0.8 gives $z_{\alpha/2} = 1.96$ and $z_\beta = 0.8416$, so $(1.96 + 0.8416)^2\approx7.85$. To detect 10% versus 12% ($\bar p = 0.11$): $n = \frac{7.85\times2\times0.11\times0.89}{0.0004}\approx3843$ visitors per group. Notice $\delta^2$ in the denominator: halving the detectable lift to 1 point quadruples the sample, to about 15,000 per group. Small effects are expensive to detect, which is why the **minimum detectable effect** should be decided in advance from what would actually matter to the business.

:::def Minimum detectable effect
The smallest true effect an experiment is designed to detect with the chosen power and significance level.
:::

### The peeking problem
It's tempting to watch the dashboard and stop the test as soon as $p < 0.05$. But the p-value wanders up and down as data accumulate, and if you check it many times, the chance that it dips below 0.05 at *some* point, even when there is no effect at all, is far more than 5%. With daily checks over a month, the false positive rate can exceed 20%. The fixes are to fix the sample size in advance and analyse once, or to use methods designed for continuous monitoring, such as sequential tests with adjusted thresholds or Bayesian analyses with a pre-specified decision rule.

### Multiple comparisons
Testing many hypotheses creates a similar problem. If you compare 20 button colours with the original, each at $\alpha = 0.05$, and none of them really differ, the chance of at least one false "winner" is $1 - 0.95^{20}\approx0.64$. The same happens when you check 20 metrics or slice the results into 20 user segments.

The simplest fix is the **Bonferroni correction**: with $m$ tests, use $\alpha/m$ for each. This guarantees the **family-wise error rate**, the probability of even one false positive, is at most $\alpha$. With 20 tests, each needs $p < 0.0025$. Bonferroni is safe but conservative, costing power when $m$ is large. The **Benjamini–Hochberg** procedure instead controls the **false discovery rate**, the expected fraction of false positives among the results you declare significant: sort the p-values, $p_{(1)}\le\dots\le p_{(m)}$, find the largest $k$ with $p_{(k)}\le\frac{k}{m}\alpha$, and reject the hypotheses with the $k$ smallest p-values.

:::def Family-wise error rate
The probability of making at least one Type I error among a family of tests.
:::

:::def False discovery rate
The expected proportion of false positives among the hypotheses declared significant.
:::

### Other practical pitfalls
Randomize the right unit: if users see both versions on different visits, they contaminate the comparison. Check that the groups are the size the design intended; a "sample ratio mismatch" signals a bug. Beware novelty effects, where users react to anything new at first. And choose one **primary metric** in advance; secondary metrics are for understanding, not for declaring victory.

### Common mistakes
Running a test without a power calculation, then concluding "no effect" from a non-significant result, is the most common error: absence of evidence from an underpowered test is not evidence of absence. Others include peeking and stopping early, testing many variants or metrics without correction, and reporting only the lift without its confidence interval.

### Summary
A/B tests randomize users between versions so differences can be attributed to the change. Plan the sample size from the minimum detectable effect: $n\approx\frac{(z_{\alpha/2} + z_\beta)^2\cdot2\bar p(1-\bar p)}{\delta^2}$ per group. Don't peek and stop early, and correct for multiple comparisons with Bonferroni ($\alpha/m$) or Benjamini–Hochberg. Report effect sizes with intervals.

@viz hypothesis z=1.4 | Imagine the observed z is the true lift measured in standard errors. Is it beyond the critical value?

:::explore
**What to try**
1. Set the observed $z$ to 1.4, the underpowered example's expected statistic. It is short of the 1.96 cutoff, so a typical run of this experiment would not be significant.
2. Quadrupling the sample doubles the standardized effect: set $z = 2.8$ (that is, $1.96 + 0.84$). Now a typical run is clearly significant; this is the 80% power design.
3. Set $\alpha$ to $0.05/20 = 0.0025$, the Bonferroni level for 20 tests, and see how far out the critical value moves (about 3.02).
4. With $\alpha = 0.0025$, find what $z$ would be needed for 80% power ($\approx3.02 + 0.84$).

**What to notice:** power is about where the *true* effect sits relative to the critical value. Designing for $z\approx2.8$ means the cutoff is 0.84 standard errors below the expected statistic, so it is exceeded about 80% of the time. Stricter $\alpha$ from multiple testing pushes the cutoff out and demands more data.
:::

:::formulas
$$z = \frac{\hat p_B - \hat p_A}{\sqrt{\hat p(1-\hat p)(1/n_A + 1/n_B)}}$$
$$n_{\text{per group}}\approx\frac{(z_{\alpha/2} + z_\beta)^2\cdot2\bar p(1-\bar p)}{\delta^2}$$
$$\text{means: } n\approx\frac{2(z_{\alpha/2} + z_\beta)^2\sigma^2}{\delta^2}$$
$$\text{power}\approx\Phi\Big(\frac{\delta}{\text{SE}} - z_{\alpha/2}\Big)$$
$$P(\ge1 \text{ false positive in } m) = 1 - (1-\alpha)^m;\quad \text{Bonferroni: } \alpha/m$$
:::

:::thm Bonferroni bound
If each of $m$ tests has Type I error probability at most $\alpha/m$, the probability of at least one Type I error is at most $\alpha$.
:::

:::proof
Let $A_i$ be the event that test $i$ gives a false positive. By the union bound, $P(\bigcup A_i)\le\sum P(A_i)\le m\cdot\frac{\alpha}{m} = \alpha$. No independence is needed.
:::

:::steps Find the per-group sample size to detect a conversion lift from 20% to 25% with α = 0.05 (two-sided) and power 0.8.
1. $\bar p = 0.225$, $\delta = 0.05$, $(z_{\alpha/2} + z_\beta)^2\approx7.85$.
2. $n = \frac{7.85\times2\times0.225\times0.775}{0.0025} = \frac{7.85\times0.34875}{0.0025}\approx1095$ per group.
:::

:::steps Five tests give p-values 0.004, 0.011, 0.020, 0.030, 0.400. Which are significant with Bonferroni at α = 0.05? With Benjamini–Hochberg?
1. Bonferroni threshold $0.05/5 = 0.01$: only 0.004.
2. BH thresholds $\frac{k}{5}(0.05)$: 0.01, 0.02, 0.03, 0.04, 0.05. The largest $k$ with $p_{(k)}\le$ threshold is $k = 4$ ($0.030\le0.04$).
3. BH rejects the four smallest: 0.004, 0.011, 0.020, 0.030.
:::

:::steps A test's true effect is 2.5 standard errors. What is its power at two-sided α = 0.05?
1. Power $\approx\Phi(2.5 - 1.96) = \Phi(0.54)$.
2. $\Phi(0.54)\approx0.705$.
:::

:::mock Exam question
A team wants to test whether a new checkout page increases the average order value, currently with standard deviation \$40. They care about an increase of \$2. (a) How many orders per group are needed for 80% power at two-sided $\alpha = 0.05$? (b) The team has only 2,000 orders per group. Roughly what is the power? (c) They also plan to look at 10 other metrics. What should they do about significance?
:::solution
(a) $n = \frac{2\times7.85\times40^2}{2^2} = \frac{2\times7.85\times1600}{4} = 6280$ per group. (b) SE $= 40\sqrt{2/2000}\approx1.265$; $\delta/\text{SE}\approx1.58$; power $\approx\Phi(1.58 - 1.96) = \Phi(-0.38)\approx0.35$. (c) Keep order value as the pre-registered primary metric; treat the others as exploratory or use a Bonferroni level $0.05/10 = 0.005$ (or BH) for them.
:::
:::

:::ml
Online evaluation of ML models is done with A/B tests: a new recommender is shipped to a random slice of users, and its effect on engagement is measured with exactly these tools. Multi-armed bandit algorithms such as Thompson sampling adaptively shift traffic toward better variants, trading some statistical cleanliness for less regret.
:::

:::cs
Experimentation platforms at large tech companies automate randomization by hashing user IDs, sample ratio checks, power calculations and corrections. Feature flags let engineers roll out changes to a random percentage of users and roll back quickly if metrics degrade.
:::

:::real
Randomized controlled trials test new medicines, and they must pre-register their primary outcome and sample size. In 2012 a Microsoft Bing experiment that changed how ad headlines were displayed raised revenue by about 12%, an idea that had sat in the backlog for months until a cheap A/B test proved its value.
:::

:::quiz
? With 10 independent tests of true nulls at $\alpha = 0.05$, how many false positives are expected?
= 0.5|1/2
> $10\times0.05$.

? Bonferroni with $m = 25$ tests and $\alpha = 0.05$: what is the per-test threshold?
= 0.002|1/500
> $0.05/25$.

? To detect half as large an effect with the same power, the sample size must be multiplied by...
= 4
> $n\propto1/\delta^2$.

? Checking an A/B test every day and stopping as soon as $p < 0.05$...
+ inflates the false positive rate above 5%
- keeps the false positive rate at exactly 5%
- reduces the false positive rate
> Repeated looks give many chances for a chance dip below 0.05.

? A test's true effect is exactly at the critical value ($\delta/\text{SE} = 1.96$). What is its power?
= 0.5|1/2
> $\Phi(1.96 - 1.96) = \Phi(0)$.

? A non-significant result from an underpowered experiment shows that...
- the change has no effect
+ the experiment couldn't reliably detect an effect of the size that matters
> Absence of evidence is not evidence of absence.
:::
## Lesson: Resampling: the bootstrap and permutation tests {#resampling}
@summary: Using the computer instead of formulas: bootstrap standard errors and confidence intervals, and permutation tests for comparing groups.

### When there is no formula
The confidence intervals and tests in earlier lessons all relied on formulas: the standard error of a mean is $s/\sqrt n$, the statistic is approximately normal, and so on. But what's the standard error of a *median*? Of the ratio of two means? Of a model's accuracy, or of the correlation between two variables in a small, skewed dataset? For many statistics no simple formula exists, or the formula depends on assumptions we can't check. **Resampling methods** replace the formula with computation. They simulate the process of drawing new samples using only the data you have. They were made practical by fast computers in the 1980s and are now everyday tools in statistics and machine learning.

### The idea of the bootstrap
Recall that the standard error measures how much a statistic would vary if we could repeat the study many times with fresh samples from the population. We can't, because we have only one sample. Bradley Efron's 1979 insight was this: the sample itself is our best picture of the population. So pretend the sample *is* the population, and draw new samples from it.

A **bootstrap sample** is drawn by choosing $n$ values from the original $n$ data points **with replacement**. Some original points appear twice or three times, others not at all. (On average, a bootstrap sample contains about 63.2% of the distinct original points, since each point is left out with probability $(1 - \frac1n)^n\approx e^{-1}\approx0.368$.) Compute the statistic on the bootstrap sample. Repeat this $B$ times, typically 1,000 to 10,000 times, to get $B$ bootstrap values $\hat\theta^*_1,\dots,\hat\theta^*_B$. Their spread approximates the sampling distribution of the statistic.

:::def Bootstrap
A resampling method that estimates the sampling distribution of a statistic by repeatedly recomputing it on samples drawn with replacement from the observed data.
:::

### A small example by hand
Take the data $1, 3, 8$ and the statistic "sample mean," $\bar x = 4$. Three possible bootstrap samples are $(1, 1, 8)$ with mean $\frac{10}{3}\approx3.33$, $(3, 8, 8)$ with mean $\frac{19}{3}\approx6.33$, and $(1, 3, 3)$ with mean $\frac73\approx2.33$. With only 3 points there are just $3^3 = 27$ equally likely ordered bootstrap samples, and we could list all of them. For real data with $n = 50$ there are $50^{50}$, so we sample a few thousand at random instead.

### Bootstrap standard errors and intervals
The **bootstrap standard error** is the standard deviation of the bootstrap values:
$$\widehat{\text{SE}}_{\text{boot}} = \sqrt{\frac{1}{B - 1}\sum_{b=1}^B\big(\hat\theta^*_b - \bar\theta^*\big)^2}.$$
For the sample mean it closely matches the formula $s/\sqrt n$ (more precisely, it approximates the divide-by-$n$ version), which is a nice check. For the median, where there's no simple formula, it gives an answer anyway.

The simplest bootstrap confidence interval is the **percentile interval**: sort the $B$ bootstrap values and take the 2.5th and 97.5th percentiles as a 95% interval. If 1,000 bootstrap medians of a dataset of house prices have 2.5th and 97.5th percentiles of \$305,000 and \$342,000, that's the interval. An alternative is the **normal interval** $\hat\theta\pm1.96\,\widehat{\text{SE}}_{\text{boot}}$, which works when the bootstrap distribution looks roughly normal. Improved versions such as BCa intervals correct for bias and skewness.

:::def Percentile interval
A bootstrap confidence interval formed by the $\alpha/2$ and $1 - \alpha/2$ quantiles of the bootstrap distribution of the statistic.
:::

### When the bootstrap works and when it doesn't
The bootstrap assumes the data are an i.i.d. sample from the population, and that the sample is big enough to represent the population's shape. It works well for means, medians, regression coefficients, correlations and most smooth statistics. It struggles with tiny samples (with 5 points, the sample is a poor picture of the population), with statistics that depend on extremes, like the maximum, and with dependent data such as time series, where you must resample blocks rather than individual points. And it can't fix a biased sample: resampling a biased sample faithfully reproduces the bias.

### Permutation tests
Resampling also gives hypothesis tests. Suppose 5 plants given fertilizer grow $8, 9, 11, 12, 15$ cm and 5 control plants grow $6, 7, 8, 9, 10$ cm. The difference in means is $11 - 8 = 3$ cm. Could that arise by chance?

Under $H_0$, fertilizer has no effect, so the labels "fertilizer" and "control" are arbitrary: each plant would have grown the same amount either way. So shuffle the labels: randomly reassign 5 of the 10 values to "fertilizer" and the rest to "control," and compute the difference in means. Repeat many times. This builds the **permutation distribution** of the statistic under $H_0$, without any normality assumption. The p-value is the fraction of shuffles giving a difference at least as extreme as the observed 3. There are $\binom{10}{5} = 252$ ways to split the plants, so here we could even enumerate all of them; for larger samples we use a few thousand random shuffles.

:::def Permutation test
A test that builds the null distribution of a statistic by recomputing it after randomly shuffling group labels, which is justified when the labels are exchangeable under $H_0$.
:::

The logic is especially clean for randomized experiments: the randomization itself justifies the test. Permutation tests work for any statistic: difference in medians, ratio of variances, difference in model accuracy.

### Bootstrap versus permutation
The bootstrap resamples *with* replacement to estimate the variability of a statistic, for standard errors and confidence intervals. A permutation test reshuffles *without* replacement, under the null hypothesis, to get a p-value. Use the bootstrap to answer "how precise is my estimate?" and permutation tests to answer "is this difference real?"

### Common mistakes
Resampling without replacement in a bootstrap just reproduces the original sample every time. Using too few resamples (say 50) gives noisy intervals; use at least 1,000 for intervals. Bootstrapping dependent data point by point underestimates the uncertainty. And remember that the bootstrap estimates sampling variability around the *sample's* statistic; it can't create information that the data don't contain.

### Summary
The bootstrap estimates a statistic's sampling distribution by recomputing it on many with-replacement resamples of the data. The standard deviation of the bootstrap values is a standard error, and their percentiles give confidence intervals, for any statistic. Permutation tests shuffle group labels to build a null distribution and a p-value without distributional assumptions. Both need representative, independent data.

@viz g06-data mode=bootstrap data=right-skewed | Each resample draws n points with replacement. The histogram collects bootstrap means or medians.

:::explore
**What to try**
1. Press "1 resample" a few times. Faded points were left out and "×k" marks repeats: this is a with-replacement sample.
2. Press "1000 resamples". Compare the bootstrap standard error of the mean with $s/\sqrt n$ shown in the readout.
3. Switch the statistic to "median" and run 1000 resamples again. The bootstrap distribution is lumpy, because the median can only take a few data values, but it still gives a standard error and interval.
4. Switch to the "outlier" data set and compare the bootstrap distributions of the mean and the median.

**What to notice:** the spread of the bootstrap histogram is the estimated standard error, and its 2.5% and 97.5% points form the percentile interval from the article. For the mean it agrees with the formula; for the median there is no simple formula, which is exactly when the bootstrap earns its keep. With the outlier present, the mean's bootstrap distribution is wider and can be bimodal, depending on how many copies of the outlier a resample happens to include.
:::

:::formulas
$$x^*_1,\dots,x^*_n\ \text{drawn with replacement from}\ x_1,\dots,x_n$$
$$\widehat{\text{SE}}_{\text{boot}} = \sqrt{\frac{1}{B-1}\sum_b(\hat\theta^*_b - \bar\theta^*)^2}$$
$$\text{95\% percentile CI: } \big[\hat\theta^*_{(0.025)},\ \hat\theta^*_{(0.975)}\big]$$
$$P(\text{a point is left out}) = \Big(1 - \frac1n\Big)^n\approx e^{-1}\approx0.368$$
$$\text{permutation p-value} = \frac{\#\{\text{shuffles with } |T^*|\ge|T_{\text{obs}}|\}}{\#\text{shuffles}}$$
:::

:::thm Fraction of points in a bootstrap sample
The expected fraction of distinct original points that appear in a bootstrap sample of size $n$ is $1 - (1 - \frac1n)^n$, which tends to $1 - e^{-1}\approx0.632$.
:::

:::proof
A given point is missed by one draw with probability $1 - \frac1n$, and by all $n$ independent draws with probability $(1 - \frac1n)^n$. By linearity over indicator variables, the expected fraction included is $1 - (1-\frac1n)^n$, and $(1 - \frac1n)^n\to e^{-1}$.
:::

:::steps For the data 2, 4, 9, list the bootstrap sample means for the samples (2, 2, 4), (4, 9, 9) and (9, 9, 9).
1. $(2, 2, 4)$: $\frac83\approx2.67$.
2. $(4, 9, 9)$: $\frac{22}{3}\approx7.33$.
3. $(9, 9, 9)$: 9. Bootstrap means vary around the sample mean 5.
:::

:::steps 1000 bootstrap means of a dataset are sorted. The 25th value is 41.2 and the 975th value is 48.9. Give the 95% percentile interval.
1. The 2.5th percentile is about the 25th value and the 97.5th is about the 975th.
2. Interval: $(41.2, 48.9)$.
:::

:::steps In the fertilizer example, 11 of the 252 label splits give a mean difference of 3 or more. Find the one-sided permutation p-value.
1. $p = \frac{11}{252}\approx0.044$.
2. At $\alpha = 0.05$, reject $H_0$: the growth difference is unlikely to be due to the random assignment alone.
:::

:::mock Exam question
A data scientist has the response times (ms) of 40 requests, which are strongly skewed, and wants a 95% confidence interval for the median response time. (a) Describe how to compute a bootstrap percentile interval. (b) Why might a t-interval be a poor choice? (c) If the 40 times were consecutive requests during a traffic spike, what problem would arise?
:::solution
(a) Draw 40 values with replacement from the data, compute the median; repeat $B = 5000$ times; take the 2.5th and 97.5th percentiles of the 5000 medians. (b) A t-interval is for the mean and assumes rough normality of the sampling distribution; the median of skewed data has no simple standard error formula. (c) Consecutive requests are dependent and unrepresentative of normal traffic, so the i.i.d. assumption fails; the interval would be too narrow and biased. Block bootstrap or better sampling would be needed.
:::
:::

:::ml
Bagging (bootstrap aggregating) trains each model in an ensemble on a bootstrap sample, and random forests add random feature selection. The roughly 36.8% of points left out of each bootstrap sample give a free "out-of-bag" error estimate. Bootstrap intervals for test-set metrics, and permutation tests for comparing models or measuring feature importance (shuffling one feature and measuring the accuracy drop), are standard practice.
:::

:::cs
Performance engineers bootstrap latency percentiles such as p99 to see whether a change really made a service slower. Permutation tests are used in software experiments where metrics are heavy-tailed and normal approximations fail.
:::

:::real
Ecologists bootstrap species-richness estimates, economists bootstrap inequality measures like the Gini coefficient, and genetics studies use permutation tests to find genes associated with a disease while controlling false positives across thousands of genes.
:::

:::quiz
? A bootstrap sample is drawn...
+ with replacement, same size as the original data
- without replacement, same size as the original data
- from a normal distribution fitted to the data
> With replacement, so points can repeat or be left out.

? About what fraction of the original points are left out of a large bootstrap sample?
= 0.368|0.37
> $(1 - 1/n)^n\approx e^{-1}$.

? How many distinct ordered bootstrap samples are there for 4 data points?
= 256
> $4^4$ sequences of draws.

? A permutation test shuffles...
+ the group labels, under the null hypothesis that they don't matter
- the data with replacement to estimate a standard error
> Shuffling labels builds the null distribution.

? 2,000 label shuffles are performed and 30 give a statistic at least as extreme as observed. What is the p-value?
= 0.015|3/200
> $30/2000$.

? The bootstrap standard error is...
+ the standard deviation of the statistic across bootstrap samples
- the standard deviation of the original data
> It measures variability of the statistic, not of individual values.
:::
# Unit: Modeling and evaluation

## Lesson: Linear regression and correlation {#regression}
@summary: Fitting a line by least squares, interpreting slope and intercept, residuals, R², correlation, inference for the slope, multiple regression and the limits of regression.

### Predicting one quantity from another
Does studying longer raise exam scores, and by how much? How much more does a house cost per extra square metre? How does a car's fuel use change with its weight? Each question asks how one quantity, the **response** $y$, tends to change with another, the **explanatory variable** or feature $x$. **Linear regression** answers it by fitting the straight line that best describes the relationship in the data. It is the oldest and most widely used statistical model, it's the first model taught in every machine learning course, and nearly everything more complicated, from logistic regression to neural networks, generalizes it.

### The model
Simple linear regression assumes
$$y_i = \beta_0 + \beta_1x_i + \varepsilon_i,$$
where $\beta_0$ is the **intercept**, $\beta_1$ the **slope**, and $\varepsilon_i$ is random error with mean 0: everything about $y$ that $x$ doesn't explain. The slope is the expected change in $y$ for a one-unit increase in $x$. Once we estimate the coefficients as $b_0$ and $b_1$, the **fitted value** or prediction is $\hat y = b_0 + b_1x$, and the **residual** $e_i = y_i - \hat y_i$ is the vertical distance from a point to the line.

:::def Residual
The difference $e_i = y_i - \hat y_i$ between an observed response and the value predicted by the fitted model.
:::

### Least squares
Which line is best? We choose $b_0$ and $b_1$ to minimize the **sum of squared residuals**, $\text{SSE} = \sum(y_i - b_0 - b_1x_i)^2$. Squaring makes all errors positive, penalizes large misses heavily, and gives a clean closed-form answer. Setting the partial derivatives to zero gives
$$b_1 = \frac{\sum(x_i - \bar x)(y_i - \bar y)}{\sum(x_i - \bar x)^2} = \frac{S_{xy}}{S_{xx}},\qquad b_0 = \bar y - b_1\bar x.$$
The second equation says the least-squares line always passes through the point of means $(\bar x, \bar y)$. And, as the MLE lesson showed, least squares is also maximum likelihood when the errors are normal.

Let's do one by hand. Five students study $x = 1, 2, 3, 4, 5$ hours and score $y = 2, 4, 5, 4, 5$ (out of 10). The means are $\bar x = 3$ and $\bar y = 4$. The deviations of $x$ are $-2, -1, 0, 1, 2$ and of $y$ are $-2, 0, 1, 0, 1$. Then $S_{xy} = 4 + 0 + 0 + 0 + 2 = 6$ and $S_{xx} = 4 + 1 + 0 + 1 + 4 = 10$. So $b_1 = 0.6$ and $b_0 = 4 - 0.6\times3 = 2.2$. The fitted line is $\hat y = 2.2 + 0.6x$: each extra hour of study is associated with 0.6 more points on average.

:::def Least squares
The method of choosing model coefficients that minimize the sum of squared residuals.
:::

### How well does the line fit? R²
The fitted values are $2.8, 3.4, 4.0, 4.6, 5.2$, so the residuals are $-0.8, 0.6, 1.0, -0.6, -0.2$; they sum to zero, as least-squares residuals always do. The SSE is $0.64 + 0.36 + 1 + 0.36 + 0.04 = 2.4$. Compare it with the **total sum of squares** $\text{SST} = \sum(y_i - \bar y)^2 = 4 + 0 + 1 + 0 + 1 = 6$, the error we'd make by predicting $\bar y$ for everyone. The **coefficient of determination** is
$$R^2 = 1 - \frac{\text{SSE}}{\text{SST}} = 1 - \frac{2.4}{6} = 0.6.$$
The line explains 60% of the variation in scores. $R^2$ is between 0 and 1 for least squares with an intercept; 1 means every point is on the line.

:::def Coefficient of determination
$R^2 = 1 - \text{SSE}/\text{SST}$, the fraction of the variance of the response explained by the model.
:::

### Correlation
The **correlation coefficient** $r$ measures the strength and direction of a *linear* relationship on a scale from $-1$ to $1$:
$$r = \frac{S_{xy}}{\sqrt{S_{xx}S_{yy}}}.$$
For the study data, $r = \frac{6}{\sqrt{10\times6}}\approx0.775$, and $r^2 = 0.6 = R^2$; in simple regression these always match. The slope and correlation are related by $b_1 = r\frac{s_y}{s_x}$. Correlation has no units and is symmetric in $x$ and $y$; the regression slope is neither.

Correlation only measures *linear* association: $y = x^2$ on $x$ from $-1$ to $1$ has $r = 0$ despite a perfect relationship. And, most importantly, **correlation is not causation**. Ice cream sales and drownings are correlated because both rise in hot weather, a **confounding** variable. Only randomized experiments, or careful causal methods, justify causal claims.

:::def Correlation coefficient
$r = S_{xy}/\sqrt{S_{xx}S_{yy}}$, a unitless measure between −1 and 1 of the strength of linear association between two variables.
:::

### Inference for the slope
Is the slope real or noise? Estimate the error standard deviation by $s = \sqrt{\frac{\text{SSE}}{n - 2}}$ (two parameters were estimated, so $n - 2$ degrees of freedom). The standard error of the slope is $\text{SE}(b_1) = \frac{s}{\sqrt{S_{xx}}}$, and $t = \frac{b_1}{\text{SE}(b_1)}$ tests $H_0: \beta_1 = 0$ with $n - 2$ df. For the study data, $s = \sqrt{2.4/3}\approx0.894$, $\text{SE}(b_1) = \frac{0.894}{\sqrt{10}}\approx0.283$, and $t\approx2.12$. With 3 df the critical value is 3.182, so with only 5 students we can't rule out a zero slope. A confidence interval is $b_1\pm t^*\,\text{SE}(b_1)$.

### Multiple regression
With several features, $y = \beta_0 + \beta_1x_1 + \dots + \beta_px_p + \varepsilon$. In matrix form, $y = X\beta + \varepsilon$, and least squares gives the **normal equations** $X^\top X\hat\beta = X^\top y$, so $\hat\beta = (X^\top X)^{-1}X^\top y$ when $X^\top X$ is invertible. Each coefficient is now the expected change in $y$ for a one-unit change in that feature *holding the others fixed*. Adding features always raises $R^2$ on the training data, even useless ones, so use adjusted $R^2$ or held-out data to compare models.

### Checking the assumptions
The standard inferences assume a linear relationship, independent errors, constant error variance and roughly normal errors. Plot the residuals against the fitted values: a curve means the relationship isn't linear, and a funnel means the variance isn't constant. Outliers and high-leverage points, those with extreme $x$, can drag the line. And never extrapolate far outside the range of the data.

### Regression toward the mean
Writing the fitted line in standardized units reveals something surprising. If $z_x$ and $z_y$ are the $z$-scores of $x$ and $y$, the least-squares line becomes $\hat z_y = r\,z_x$. Because $|r| < 1$ unless the fit is perfect, the predicted $y$ is always fewer standard deviations from its mean than $x$ is. With $r = 0.5$, a student who scores 2 standard deviations above average on a midterm is predicted to score only 1 standard deviation above average on the final. This isn't because good students get lazy; part of any extreme score is luck, and luck doesn't repeat. The same effect makes a sports team's best season usually followed by a worse one, and makes treatments given to patients at their worst look effective even when they do nothing, which is one reason medical studies need control groups.

### Common mistakes
Interpreting correlation as causation; ignoring nonlinearity because $r$ was small; extrapolating; reading $R^2$ as "the probability the model is right"; and comparing raw coefficients of features measured in different units.

### Summary
Linear regression fits $\hat y = b_0 + b_1x$ by least squares, with $b_1 = S_{xy}/S_{xx}$ and $b_0 = \bar y - b_1\bar x$. Residuals measure misfit; $R^2 = 1 - \text{SSE}/\text{SST}$ is the fraction of variance explained and equals $r^2$ in simple regression. Test the slope with $t = b_1/\text{SE}(b_1)$ on $n - 2$ df. Multiple regression solves $X^\top X\hat\beta = X^\top y$. Correlation is not causation.

@viz lstsq | Drag points or click to add them. The pink squares are the squared residuals that least squares minimizes.

:::explore
**What to try**
1. Choose "Try it yourself" and adjust the slope and intercept to make the total pink area as small as you can. Compare with the "best possible" value.
2. Switch to "Show best fit" and drag one point far above the others. Watch the line tilt toward it: squared errors make least squares sensitive to outliers.
3. Drag a point at the far right end (high leverage) up and down, then do the same to a point in the middle. The end point moves the slope much more.
4. Arrange the points roughly on a line and note how small the total squared error becomes.

**What to notice:** the best line is the one with the smallest total area of squares, the SSE from the article, and it always passes through the centre of the points $(\bar x, \bar y)$. Outliers and high-leverage points have outsized influence because their residuals are squared.
:::

@viz scatter-corr | Generate data with a chosen correlation and compare r with the shape of the cloud.

:::explore
**What to try**
1. Set the correlation near 0.775, the study example's $r$, and look at how much scatter remains around the trend.
2. Set it to 0 and then to $-0.9$.

**What to notice:** $r^2$ is the fraction of variance a straight line explains, so even $r = 0.775$ leaves 40% unexplained.
:::

:::formulas
$$b_1 = \frac{S_{xy}}{S_{xx}} = r\frac{s_y}{s_x},\qquad b_0 = \bar y - b_1\bar x$$
$$R^2 = 1 - \frac{\text{SSE}}{\text{SST}},\quad \text{SSE} = \sum(y_i - \hat y_i)^2,\quad \text{SST} = \sum(y_i - \bar y)^2$$
$$r = \frac{S_{xy}}{\sqrt{S_{xx}S_{yy}}}$$
$$s = \sqrt{\frac{\text{SSE}}{n-2}},\quad \text{SE}(b_1) = \frac{s}{\sqrt{S_{xx}}},\quad t = \frac{b_1}{\text{SE}(b_1)}$$
$$\hat\beta = (X^\top X)^{-1}X^\top y$$
:::

:::thm Least-squares coefficients
The line minimizing $\sum(y_i - b_0 - b_1x_i)^2$ has $b_1 = S_{xy}/S_{xx}$ and $b_0 = \bar y - b_1\bar x$ (assuming not all $x_i$ are equal).
:::

:::proof
Setting $\partial/\partial b_0 = -2\sum(y_i - b_0 - b_1x_i) = 0$ gives $b_0 = \bar y - b_1\bar x$. Substituting, the SSE becomes $\sum\big((y_i - \bar y) - b_1(x_i - \bar x)\big)^2$; differentiating with respect to $b_1$ gives $-2\sum(x_i - \bar x)\big((y_i - \bar y) - b_1(x_i - \bar x)\big) = 0$, so $b_1 = S_{xy}/S_{xx}$. The SSE is a convex quadratic, so this is the minimum.
:::

:::steps Fit a least-squares line to (0, 1), (1, 3), (2, 5), (3, 7).
1. $\bar x = 1.5$, $\bar y = 4$.
2. $S_{xy} = (-1.5)(-3) + (-0.5)(-1) + (0.5)(1) + (1.5)(3) = 10$; $S_{xx} = 2.25 + 0.25 + 0.25 + 2.25 = 5$.
3. $b_1 = 2$, $b_0 = 4 - 3 = 1$: $\hat y = 1 + 2x$, a perfect fit with $R^2 = 1$.
:::

:::steps A regression of house price (in \$1000s) on floor area (m²) gives ŷ = 50 + 2.5x. Interpret it and predict a 120 m² house.
1. Each extra square metre is associated with \$2,500 more in price on average.
2. $\hat y = 50 + 2.5\times120 = 350$, i.e. \$350,000.
3. The intercept (a 0 m² house) is an extrapolation with no real meaning.
:::

:::steps With r = 0.5, s_x = 4 and s_y = 10, find the regression slope of y on x.
1. $b_1 = r\frac{s_y}{s_x} = 0.5\times\frac{10}{4}$.
2. $b_1 = 1.25$.
:::

:::mock Exam question
For 10 cities, the regression of annual ice cream sales $y$ (thousands) on average summer temperature $x$ (°C) gives $\bar x = 25$, $\bar y = 40$, $S_{xx} = 50$, $S_{xy} = 150$, $S_{yy} = 900$. (a) Find the regression line. (b) Find $r$ and $R^2$. (c) Predict sales at 28 °C. (d) A journalist notes that cities with higher ice cream sales have more drownings and suggests banning ice cream. Comment.
:::solution
(a) $b_1 = 150/50 = 3$, $b_0 = 40 - 3\times25 = -35$, so $\hat y = -35 + 3x$. (b) $r = \frac{150}{\sqrt{50\times900}} = \frac{150}{212.1}\approx0.707$; $R^2 = 0.5$. (c) $\hat y = -35 + 84 = 49$ thousand. (d) Correlation isn't causation: hot weather is a confounder that increases both ice cream sales and swimming (and so drownings).
:::
:::

:::ml
Linear regression is the base model of supervised learning, fitted by the normal equations or gradient descent. Ridge and lasso add penalties to the SSE; logistic regression replaces the linear output with a sigmoid for classification; and a neural network's last layer is usually a linear regression on learned features. $R^2$ and residual plots are standard diagnostics for regression models.
:::

:::cs
Performance engineers regress run time on input size to estimate scaling constants, and on log scales to estimate exponents in $T(n)\approx cn^k$. Capacity planning regresses resource use on traffic.
:::

:::real
Economists estimate how wages change with education, doctors relate dosage to response, and Francis Galton coined "regression" in the 1880s when he noticed children of very tall parents tend to be tall but closer to average: regression toward the mean, which follows from $|r| < 1$.
:::

:::quiz
? $S_{xy} = 20$, $S_{xx} = 8$. What is the slope $b_1$?
= 2.5|5/2
> $20/8$.

? $b_1 = 2$, $\bar x = 3$, $\bar y = 10$. What is $b_0$?
= 4
> $10 - 2\times3$.

? SSE = 30 and SST = 120. What is $R^2$?
= 0.75|3/4
> $1 - 30/120$.

? In simple linear regression $r = -0.8$. What is $R^2$?
= 0.64|16/25
> $R^2 = r^2$.

? A strong correlation between two variables proves that...
- one causes the other
+ they are linearly associated in this data
> Confounders can create correlation without causation.

? How many degrees of freedom does the t-test for the slope have with $n = 12$ points?
= 10
> $n - 2$.
:::
## Lesson: Evaluating classifiers: confusion matrices, ROC and cross-validation {#evaluation}
@summary: Measuring how good a model really is: train/test splits, confusion matrices, accuracy, precision, recall, F1, ROC curves and AUC, and cross-validation.

### A model that is 90% accurate can be useless
A hospital builds a model to flag patients with a rare disease that affects 10% of the people it sees. The model is 89% accurate. Impressive? A "model" that simply says "healthy" to everyone is 90% accurate, and it never finds a single sick patient. Accuracy alone can be badly misleading, especially when one class is rare, and the cost of a missed case is different from the cost of a false alarm. Evaluating a model properly means asking *which* mistakes it makes, how often, and whether its performance will hold up on data it hasn't seen. This lesson gives you the standard tools for answering those questions; they are the statistics lessons of this course applied to machine learning.

### Test on data the model hasn't seen
A model's performance on its own training data is an over-optimistic, biased estimate, because the model has adapted to those exact points, including their noise. A very flexible model can memorize the training set and score 100% while doing poorly on new data; this is **overfitting**. So we hold out data. The usual split is a **training set** to fit the model, a **validation set** to choose hyperparameters and compare models, and a **test set** used once, at the end, to estimate performance on new data. If you look at the test set repeatedly while making choices, it stops being an honest estimate, for the same reason that p-hacking invalidates p-values.

:::def Overfitting
When a model fits the noise in its training data so closely that its performance on new data is much worse than on the training data.
:::

### The confusion matrix
For a binary classifier, every prediction falls into one of four cells. Call "has the disease" the **positive** class. A **true positive** (TP) is a sick patient correctly flagged; a **false negative** (FN) is a sick patient missed; a **false positive** (FP) is a healthy patient wrongly flagged; a **true negative** (TN) is a healthy patient correctly cleared. Arranging the counts in a 2×2 table gives the **confusion matrix**.

Suppose the hospital model is tested on 1,000 patients, 100 of whom are sick. It flags 80 of the sick (TP = 80, FN = 20) and 90 of the healthy (FP = 90, TN = 810).

:::def Confusion matrix
A table of counts of true positives, false positives, false negatives and true negatives for a classifier on a labelled dataset.
:::

### Metrics from the confusion matrix
**Accuracy** is the fraction correct: $\frac{TP + TN}{\text{total}} = \frac{80 + 810}{1000} = 0.89$.

**Recall**, also called **sensitivity** or the **true positive rate**, is the fraction of actual positives found: $\frac{TP}{TP + FN} = \frac{80}{100} = 0.8$. It answers "of the sick patients, how many did we catch?"

**Precision** is the fraction of flagged cases that are really positive: $\frac{TP}{TP + FP} = \frac{80}{170}\approx0.47$. It answers "when the model raises an alarm, how often is it right?" Fewer than half of the alarms are real, even though the model catches 80% of the sick. That is the base-rate effect from the Bayes lesson: when positives are rare, even a modest false positive rate produces many false alarms.

**Specificity** is the fraction of negatives correctly cleared: $\frac{TN}{TN + FP} = \frac{810}{900} = 0.9$, and the **false positive rate** is $1 - \text{specificity} = 0.1$.

The **F1 score** combines precision and recall with their harmonic mean, $F_1 = \frac{2PR}{P + R} = \frac{2\times0.471\times0.8}{1.271}\approx0.59$. The harmonic mean is low if either component is low, so a model can't get a high F1 by excelling at only one.

:::def Precision and recall
Precision is $TP/(TP+FP)$, the fraction of predicted positives that are correct; recall is $TP/(TP+FN)$, the fraction of actual positives that are found.
:::

:::def F1 score
The harmonic mean of precision and recall, $2PR/(P+R)$.
:::

Which metric matters depends on the costs. For cancer screening, missing a case is terrible, so we want high recall and accept lower precision (positives get a follow-up test). For a spam filter, sending a real email to spam is worse than letting one spam message through, so precision on the spam class matters more.

### Thresholds and the ROC curve
Most classifiers output a **score** or probability, and we choose a **threshold**: predict positive if the score is above it. Lowering the threshold flags more cases, raising recall but also the false positive rate. Raising it does the reverse. There's no single right threshold; it's a business or medical decision.

The **ROC curve** (receiver operating characteristic) shows the whole tradeoff at once. For every threshold, plot the true positive rate (recall) against the false positive rate. A threshold above every score gives the point $(0, 0)$, one below every score gives $(1, 1)$, and a useful model's curve bows up toward the top-left corner $(0, 1)$, which is a perfect classifier. A model that guesses randomly lies on the diagonal.

The **area under the curve** (AUC) summarizes the ROC curve in one number between 0 and 1: 0.5 is random guessing and 1 is perfect. It has a lovely interpretation: **AUC is the probability that a randomly chosen positive gets a higher score than a randomly chosen negative**. Because AUC looks at all thresholds and only at ranking, it doesn't depend on the class balance or on a choice of threshold. For heavily imbalanced problems, a **precision–recall curve** is often more informative, because it shows the precision problem the ROC curve hides.

:::def ROC curve and AUC
The ROC curve plots true positive rate against false positive rate as the decision threshold varies; AUC is the area under it, equal to the probability a random positive is scored above a random negative.
:::

### Cross-validation
With limited data, a single train/test split wastes data and gives a noisy estimate. **k-fold cross-validation** splits the data into $k$ equal folds (often 5 or 10). Train on $k - 1$ folds, evaluate on the remaining one, and repeat so each fold is the evaluation set once. Average the $k$ scores, and use their spread to get a standard error. Every point is used for evaluation exactly once and for training $k - 1$ times. Use **stratified** folds so each has the same class balance, and keep related samples (the same patient, the same user) in the same fold to avoid leakage.

:::def k-fold cross-validation
An evaluation method that splits the data into $k$ folds, trains on $k-1$ of them and tests on the remaining one, rotating through all folds and averaging the results.
:::

### Common mistakes
Reporting accuracy on imbalanced data without a baseline is the classic error; always compare with the majority-class rate. **Data leakage**, letting information from the test set into training (such as normalizing with statistics computed on all data, or duplicate records across splits), inflates scores. Tuning on the test set does the same. Mixing up precision and recall is common; remember precision is about the predictions, recall about the actual positives. And a metric difference between two models on a small test set may be noise; give intervals.

### Summary
Evaluate models on held-out data, using training, validation and test sets or k-fold cross-validation. The confusion matrix's four counts give accuracy, precision $TP/(TP+FP)$, recall $TP/(TP+FN)$, specificity and F1. Accuracy misleads when classes are imbalanced. Moving the threshold trades recall against false positives; the ROC curve shows all thresholds, and AUC is the chance a random positive outranks a random negative.

@viz g06-roc | Scores of negatives (orange) and positives (purple). Move the threshold and watch the confusion matrix and the point on the ROC curve.

:::explore
**What to try**
1. Slide the threshold from left to right. The point on the ROC curve moves from the top-right $(1, 1)$ to the bottom-left $(0, 0)$, tracing the curve.
2. Increase the separation $d$ between the two score distributions. The curve bows toward the top-left corner and the AUC approaches 1. Set $d = 0$: the curve is the diagonal and AUC is 0.5.
3. Lower the "% positive" slider to 10%. Watch precision fall while recall and FPR stay the same at a fixed threshold; the ROC curve doesn't change.
4. With 10% positives, find a threshold with recall about 0.8 and read the precision, as in the hospital example.

**What to notice:** recall and FPR depend only on the separate score distributions, so the ROC curve and AUC are unaffected by class balance. Precision and accuracy depend on how many positives there are, which is why rare positives produce many false alarms, the base-rate effect from the article.
:::

:::formulas
$$\text{accuracy} = \frac{TP + TN}{TP + FP + FN + TN}$$
$$\text{precision} = \frac{TP}{TP + FP},\qquad \text{recall (TPR)} = \frac{TP}{TP + FN}$$
$$\text{specificity} = \frac{TN}{TN + FP},\qquad \text{FPR} = \frac{FP}{FP + TN}$$
$$F_1 = \frac{2\cdot\text{precision}\cdot\text{recall}}{\text{precision} + \text{recall}} = \frac{2TP}{2TP + FP + FN}$$
$$\text{AUC} = P(\text{score}_{+} > \text{score}_{-})$$
:::

:::thm AUC as a ranking probability
For a classifier with continuous scores, the area under the ROC curve equals the probability that a randomly chosen positive example receives a higher score than a randomly chosen negative example.
:::

:::proof
Let $S_+$ and $S_-$ be the scores of a random positive and a random negative. At threshold $t$, $\text{TPR}(t) = P(S_+ > t)$ and $\text{FPR}(t) = P(S_- > t)$. As $t$ decreases, FPR increases by $f_-(t)\,dt$, where $f_-$ is the density of $S_-$. So $\text{AUC} = \int\text{TPR}\,d\,\text{FPR} = \int P(S_+ > t)f_-(t)\,dt = P(S_+ > S_-)$.
:::

:::steps A spam filter on 500 emails has TP = 90, FP = 10, FN = 30, TN = 370. Compute accuracy, precision, recall and F1.
1. Accuracy $= \frac{460}{500} = 0.92$.
2. Precision $= \frac{90}{100} = 0.9$; recall $= \frac{90}{120} = 0.75$.
3. $F_1 = \frac{2\times90}{2\times90 + 10 + 30} = \frac{180}{220}\approx0.818$.
:::

:::steps A dataset has 950 negatives and 50 positives. What accuracy does a model get by always predicting negative, and what is its recall?
1. Accuracy $= \frac{950}{1000} = 0.95$.
2. Recall $= \frac{0}{50} = 0$: it finds no positives.
:::

:::steps Three positives score 0.9, 0.7, 0.4 and three negatives score 0.6, 0.3, 0.2. Compute the AUC as a ranking probability.
1. There are $3\times3 = 9$ positive–negative pairs.
2. 0.9 beats all 3 negatives, 0.7 beats all 3, 0.4 beats 2 (0.3 and 0.2): 8 pairs.
3. AUC $= \frac89\approx0.889$.
:::

:::mock Exam question
A fraud model is evaluated on 10,000 transactions, 200 of them fraudulent. At threshold 0.5 it flags 300 transactions, of which 150 are fraud. (a) Fill in the confusion matrix. (b) Compute accuracy, precision, recall and FPR. (c) The bank says missing fraud costs 50 times more than a false alarm. Should the threshold go up or down? (d) Why should the threshold be chosen on a validation set rather than the test set?
:::solution
(a) TP = 150, FP = 150, FN = 50, TN = 9,650. (b) Accuracy $= \frac{9800}{10000} = 0.98$; precision $= 0.5$; recall $= \frac{150}{200} = 0.75$; FPR $= \frac{150}{9800}\approx0.0153$. (c) Down: missed fraud is much more costly, so flag more transactions to raise recall, accepting more false alarms. (d) Choosing the threshold is fitting a parameter; doing it on the test set biases the final performance estimate upward.
:::
:::

:::ml
These metrics are how every classifier is reported, from medical imaging to content moderation. scikit-learn's `classification_report`, `roc_auc_score` and `cross_val_score` implement this lesson, and model selection and early stopping are based on validation metrics. For ranking and retrieval, precision@k and mean average precision extend the same ideas.
:::

:::cs
Intrusion detection systems and static analysis tools are tuned on the precision–recall tradeoff: too many false alarms and engineers ignore the alerts, too few and real problems slip by. Search engines evaluate result lists with precision and recall at the top positions.
:::

:::real
Medical tests report sensitivity (recall) and specificity, and doctors combine them with prevalence to get the chance a positive result is real, which is the precision. Airport security, credit-card fraud detection and smoke alarms are all tuned for very high recall at the cost of frequent false alarms.
:::

:::quiz
? TP = 40, FP = 10, FN = 20, TN = 130. What is the precision?
= 0.8|4/5
> $40/(40+10)$.

? Same matrix: what is the recall?
= 2/3|0.667|0.67
> $40/(40+20)$.

? Same matrix: what is the accuracy?
= 0.85|17/20
> $(40+130)/200$.

? What AUC does a classifier that guesses at random have?
= 0.5|1/2
> Its ROC curve is the diagonal.

? Lowering the decision threshold usually...
+ raises recall and raises the false positive rate
- lowers both recall and the false positive rate
- has no effect on recall
> More examples are flagged positive.

? Precision 0.5 and recall 1. What is F1?
= 2/3|0.667|0.67
> $2(0.5)(1)/(1.5)$.
:::
