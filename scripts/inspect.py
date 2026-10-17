import pathlib

base = pathlib.Path(r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses')

# HTML home section
hpath = base / 'html' / '01-home.ts'
s = hpath.read_text(encoding='utf-8')
print('HTML home content blocks:', s.count("type: 'text'"), s.count("type: 'code'"), s.count("type: 'example'"))
print(s[:1800])
