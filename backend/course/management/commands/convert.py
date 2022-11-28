import json

files = ['BCA2018.txt', 'MCA2018.txt']
for file in files:
    output = {
        'course': file[:-8],
        'year': file[-8:-4],
        'extra': {},
        'semsters': {},
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
            output['extra'][key[1:-6]] = [{'code': line[:8], 'name': line[8:-6] ,'L': line[-6:].split(' ')[-2][0], 'T': line[-6:].split(' ')[-2][1], 'P': line[-6:].split(' ')[-2][2], 'C': line[-6:].split(' ')[-1]} for line in temp[key]]
        else:
            output['semsters'][int(key[-2:])] = {
                'courses': [{'code': line[:7], 'name': line[8:-6] ,'L': line[-6:].split(' ')[-2][0], 'T': line[-6:].split(' ')[-2][1], 'P': line[-6:].split(' ')[-2][2], 'C': line[-6:].split(' ')[-1]} for line in temp[key] if not line.startswith('+')],
                'extra': [line[1:-6]for line in temp[key] if line.startswith('+')],
            }

    with open(f'{output["course"]}{output["year"]}.json', 'w') as jf:
        json.dump(output, jf, indent=4)
            