import pathlib, re
base = pathlib.Path(r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses')
files = []
for d in ['react','ts','frontend-projects']:
    dd = base / d
    if dd.exists():
        files += list(dd.rglob('*.ts'))
files += [base/'react.ts', base/'typescript-fundamentals.ts', base/'frontend-projects-course.ts']
comma_bug = 0
empty = 0
total_content = 0
for f in files:
    s = f.read_text(encoding='utf-8')
    if ',,,' in s:
        comma_bug += 1
        print('COMMA BUG:', f)
    lessons = re.findall(r"id: '([a-z]+-l\d+)'", s)
    contents = re.findall(r"content: \[", s)
    total_content += len(contents)
    if len(lessons) != len(contents):
        empty += 1
        print('MISMATCH', f, 'lessons', len(lessons), 'content', len(contents))
print('files:', len(files))
print('comma bugs:', comma_bug)
print('mismatches:', empty)
print('total content arrays:', total_content)
