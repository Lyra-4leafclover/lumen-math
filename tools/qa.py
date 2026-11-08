"""Check every lesson against the LESSON STANDARD. Usage: python3 tools/qa.py [course-file ...]"""
import re, sys, glob
files = sys.argv[1:] or sorted(glob.glob("content/*.md"))
bad = 0
for f in files:
    t = open(f).read()
    parts = re.split(r"^## Lesson: ", t, flags=re.M)[1:]
    for p in parts:
        lid = (re.search(r"\{#([\w-]+)\}", p.split("\n")[0]) or [None, "?"])[1]
        n = lambda pat: len(re.findall(pat, p, flags=re.M))
        viz, exp = n(r"^@viz "), n(r"^:::explore")
        qs = n(r"^\? ")
        issues = []
        if viz == 0 and n(r"^@fig ") == 0: issues.append("no viz")
        if exp < viz: issues.append(f"explore {exp}<viz {viz}")
        if n(r"^:::steps") < 2: issues.append(f"steps {n(r'^:::steps')}")
        if n(r"^:::mock") < 1: issues.append("no mock")
        if n(r"^:::real") < 1: issues.append("no real")
        if n(r"^:::(ml|cs)\b") < 1: issues.append("no ml/cs")
        if qs < 4: issues.append(f"quiz {qs}")
        if n(r"^:::formulas") < 1: issues.append("no formulas")
        if issues:
            bad += 1; print(f"{f.split('/')[-1]} {lid}: {', '.join(issues)}")
print("lessons with issues:", bad)
