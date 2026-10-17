import pathlib
s = pathlib.Path(r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses/react/01-home.ts').read_text(encoding='utf-8')
i = s.find('],,')
print(repr(s[i-80:i+20]))
