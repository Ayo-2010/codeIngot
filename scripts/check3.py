import re, pathlib
path = r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses/react/01-home.ts'
s = open(path, encoding='utf-8').read()
print('has ,,,', ',,,' in s)
for m in re.finditer(r',,,', s):
    a=max(0,m.start()-50); b=min(len(s),m.end()+50)
    print(repr(s[a:b]))
    print('---')
