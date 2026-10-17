import pathlib
s = pathlib.Path(r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses/react/05-advanced-hooks.ts').read_text(encoding='utf-8')
i = s.find("react-l16")
seg = s[i:i+1400]
end = seg.find("],\n      },")
if end == -1:
    end = seg.find("],,\n      },")
print(repr(seg[:end+6] if end!=-1 else seg[:500]))
