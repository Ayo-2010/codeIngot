import pathlib, re
base = pathlib.Path(r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses')
ids = []
for d in ['react','ts','frontend-projects']:
    dd = base / d
    if dd.exists():
        for f in dd.rglob('*.ts'):
            s = f.read_text(encoding='utf-8')
            ids += re.findall(r"id: '([^']+)'", s)
ids += re.findall(r"id: '([^']+)'", (base/'react.ts').read_text(encoding='utf-8'))
ids += re.findall(r"id: '([^']+)'", (base/'typescript-fundamentals.ts').read_text(encoding='utf-8'))
ids += re.findall(r"id: '([^']+)'", (base/'frontend-projects-course.ts').read_text(encoding='utf-8'))
print(sorted(set(ids)))
