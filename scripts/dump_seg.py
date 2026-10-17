import pathlib
s = pathlib.Path(r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses/react/05-advanced-hooks.ts').read_text(encoding='utf-8')
i = s.find("react-l16")
seg = s[i:i+1600]
end = seg.find("],\n      },")
open("C:/Users/User/Desktop/LEARN/codeIngot/scripts/seg.txt","w",encoding="utf-8").write(seg[:end+4] if end!=-1 else seg)
