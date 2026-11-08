"""Usage: python3 tools/put_lesson.py content/03-linear-algebra.md lessons/new.md
new.md starts with '## Lesson: Title {#id}' (one or more lessons). Replaces lessons with same id in place."""
import re, sys
course, new = sys.argv[1], sys.argv[2]
src = open(course).read(); add = open(new).read().strip("\n") + "\n\n"
for chunk in re.split(r"(?=^## Lesson:)", add, flags=re.M):
    if not chunk.strip(): continue
    lid = re.match(r"## Lesson:.*\{#([\w-]+)\}", chunk).group(1)
    pat = re.compile(r"^## Lesson:[^\n]*\{#" + re.escape(lid) + r"\}.*?(?=^## Lesson:|^# Unit:|\Z)", re.S | re.M)
    if not pat.search(src): sys.exit("lesson not found: " + lid)
    src = pat.sub(lambda m: chunk.rstrip("\n") + "\n\n", src, count=1)
    print("replaced", lid)
open(course, "w").write(src)
