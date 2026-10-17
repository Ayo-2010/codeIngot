import pathlib, re
base = pathlib.Path(r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses/react')
for f in sorted(base.glob('*.ts')):
    s = f.read_text(encoding='utf-8')
    lessons = re.findall(r"id: '([a-z]+-l\d+)'", s)
    title_map = dict(re.findall(r"id: '([a-z]+-l\d+)'[\s\S]{0,200}?title: '([^']+)'", s))
    print(f'{f.name}:')
    for lid in lessons:
        print(f'  {lid}: {title_map.get(lid, "")}')
    print()
