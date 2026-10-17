import pathlib
s = pathlib.Path(r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses/html/01-intro.ts').read_text(encoding='utf-8')
i = s.find("html-l2")
print(s[i:i+2200])
