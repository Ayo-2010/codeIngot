import pathlib, re
s = pathlib.Path(r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses/frontend-projects/01-intro.ts').read_text(encoding='utf-8')
for m in re.finditer(r"id: '([^']+)'[\s\S]*?title: '([^']+)'", s):
    print(m.group(1), '|', m.group(2))
