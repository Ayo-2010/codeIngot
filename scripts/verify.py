import pathlib, re
base = pathlib.Path(r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses')
files = []
for d in ['react','ts','frontend-projects']:
    dd = base / d
    if dd.exists():
        files += list(dd.rglob('*.ts'))
files += [base/'react.ts', base/'typescript-fundamentals.ts', base/'frontend-projects-course.ts']
bad_comma = 0
empty_content = 0
for f in files:
    s = f.read_text(encoding='utf-8')
    if ',,,' in s:
        bad_comma += 1
        print('COMMA BUG:', f)
    # count lessons vs content blocks
    lessons = re.findall(r"id: '([^']+)'", s)
    contents = re.findall(r"content: \[", s)
    if len(lessons) != len(contents):
        empty_content += 1
        print('MISMATCH', f, 'lessons', len(lessons), 'content-arrays', len(contents))
print('total files:', len(files))
print('comma bugs:', bad_comma)
print('mismatches:', empty_content)
