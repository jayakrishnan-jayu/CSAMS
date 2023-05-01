import json

files = ['BCA2018.txt', 'MCA2018.txt']
for file in files:
    output = {
        'program': file[:-8],
        'year': int(file[-8:-4]),
        'extra': [],
        'semesters': [],
    }
    temp = {}
    with open(file, 'r') as df:
        lines = [l.strip() for l in df.readlines()]
        start = 0
        end = 0
        for i in range(len(lines)):
            line = lines[i]
            if line == '':
                end = i
                temp[lines[start]] = lines[start+1:end]
                start = i+1
    for key in temp:
        if key.startswith('+'):
            obj = {
                'name': key[1:-6],
                'isElective': key.lower().__contains__('elective'),
                'courses': [{'code': line[:8].strip(), 'name': line[8:-6] ,'L': int(line[-6:].split(' ')[-2][0]), 'T': int(line[-6:].split(' ')[-2][1]), 'P': int(line[-6:].split(' ')[-2][2]), 'C': int(line[-6:].split(' ')[-1])} for line in temp[key]]
            }
            output['extra'].append(obj)
        else:
            obj = {
                'sem': int(key[-2:]),
                'courses': [{'code': line[:8].strip(), 'name': line[8:-6] ,'L': int(line[-6:].split(' ')[-2][0]), 'T': int(line[-6:].split(' ')[-2][1]), 'P': int(line[-6:].split(' ')[-2][2]), 'C': int(line[-6:].split(' ')[-1])} for line in temp[key] if not line.startswith('+') and not line.startswith('-')],
                'extra': [line[1:-6]for line in temp[key] if line.startswith('+')],
                'courseLabs': [{'courseCode':line[1:].split(":")[0], 'labCode':line[1:].split(":")[1]} for line in temp[key] if line.startswith('-')]
            }
            output['semesters'].append(obj)

    with open(f'{output["program"]}{output["year"]}.json', 'w') as jf:
        json.dump(output, jf, indent=4)
            