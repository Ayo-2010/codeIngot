import pathlib
s = pathlib.Path(r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses/react/05-advanced-hooks.ts').read_text(encoding='utf-8')
i = s.find("react-l16")
# find the content close for this lesson
seg = s[i:i+2000]
# find first '],' after content:
cstart = seg.find('content: [') + len('content: [')
after = seg[cstart:]
# find the matching close - look for first '],\n      },'
import re
m = re.search(r'\],\n      \},', after)
if m:
    print('FOUND single ],\n      }, at', m.start())
    print(repr(after[m.start()-5:m.start()+15]))
else:
    m2 = re.search(r'\],,\n      \},', after)
    if m2:
        print('FOUND double ],, at', m2.start())
        print(repr(after[m2.start()-5:m2.start()+15]))
    else:
        print('no close found in first 2000 chars')
        print(repr(after[:200]))
