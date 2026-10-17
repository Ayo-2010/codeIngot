import pathlib
base = pathlib.Path(r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses')
s = (base / 'html' / '01-intro.ts').read_text(encoding='utf-8')
out = open('C:/Users/User/Desktop/LEARN/codeIngot/scripts/out.txt','w',encoding='utf-8')
out.write('LENGTH: ' + str(len(s)) + '\n')
# find first lesson id
i = s.find('id:')
out.write('FIRST id pos: ' + str(i) + '\n')
out.write('START SNIPPET:\n' + s[:1500] + '\n')
# count types
out.write("text: " + str(s.count("type: 'text'")) + "\n")
out.write("code: " + str(s.count("type: 'code'")) + "\n")
out.write("example: " + str(s.count("type: 'example'")) + "\n")
out.close()
