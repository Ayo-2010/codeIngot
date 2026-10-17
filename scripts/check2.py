path = r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses/react/05-advanced-hooks.ts'
s = open(path, encoding='utf-8').read()
i = s.find("react-l16")
print(repr(s[i:i+700]))
