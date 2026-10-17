import pathlib, re
base = pathlib.Path(r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses')

# Each course: list of files to scan (the .ts course file + its section files)
course_files = {
  'dom': [base/'dom-browser-apis.ts'],
  'rwd': [base/'responsive-web-design.ts'],
  'git': [base/'git-github.ts'],
  'ts': [base/'typescript-fundamentals.ts'] + list((base/'ts').glob('*.ts')),
  'react': [base/'react.ts'] + list((base/'react').glob('*.ts')),
  'projects': [base/'frontend-projects-course.ts'] + list((base/'frontend-projects').glob('*.ts')),
}
for name, files in course_files.items():
    total_lessons = 0
    total_exercises = 0
    total_demos = 0
    total_quizzes = 0
    lessons_without_exercise = []
    for f in files:
        if not f.exists(): continue
        s = f.read_text(encoding='utf-8')
        lessons = re.findall(r"id: '([a-z]+-l\d+)'", s)
        total_lessons += len(set(lessons))
        total_exercises += len(re.findall(r"type: 'exercise'", s))
        total_demos += len(re.findall(r"type: 'demo'", s))
        total_quizzes += len(re.findall(r"type: 'quiz'", s))
        # find lessons that have no exercise in their block
        for m in re.finditer(r"(\{[\s\S]*?id: '([a-z]+-l\d+)'[\s\S]*?content: \[[\s\S]*?\])", s):
            block = m.group(1)
            lid = m.group(2)
            if "type: 'exercise'" not in block:
                lessons_without_exercise.append(lid)
    print(f"{name.upper()}: lessons={total_lessons}, exercises={total_exercises}, demos={total_demos}, quizzes={total_quizzes}, lessons_without_exercise={len(lessons_without_exercise)}")
