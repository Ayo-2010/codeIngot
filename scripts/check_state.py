import pathlib
s = pathlib.Path(r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses/react/05-advanced-hooks.ts').read_text(encoding='utf-8')
print('HAS-CONTENT' if "type: 'text', id: 'react-l16-intro'" in s else 'EMPTY-ORIGINAL')
