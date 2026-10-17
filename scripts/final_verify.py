import pathlib, re
base = pathlib.Path(r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses')
files = []
for d in ['react','ts','frontend-projects']:
    dd = base / d
    if dd.exists(): files += list(dd.rglob('*.ts'))
files += [base/'react.ts', base/'typescript-fundamentals.ts', base/'frontend-projects-course.ts']
comma = 0
nonecode = 0
mismatch = 0
for f in files:
    s = f.read_text(encoding='utf-8')
    if '],,' in s: comma += 1
    if 'code: None' in s: nonecode += 1
    lessons = re.findall(r"id: '([a-z]+-l\d+)'", s)
    contents = re.findall(r'content: \[', s)
    if len(lessons) != len(contents): mismatch += 1; print('MISMATCH', f)
print('files:', len(files))
print('comma bugs:', comma)
print('code: None bugs:', nonecode)
print('mismatches:', mismatch)
