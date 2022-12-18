from preference.models import Config, Preference
from course.models import Course, Batch
from user.models import Faculty

# [1,3] -> 1, [4,6] -> 2, [7, 9] -> 3 ....
def score_from_exp(exp: int) -> int:
    if exp < 1:
        return 0
    if exp < 4:
        return 1
    return (exp - 1) // 3 + 1

# 1 [100.0]
# 2 [66.7, 33.3]
# 3 [50.0, 33.3, 16.7]
# 4 [40.0, 30.0, 20.0, 10.0]
# 5 [33.3, 26.7, 20.0, 13.3, 6.7]
# 6 [28.6, 23.8, 19.0, 14.3, 9.5, 4.8]
# 7 [25.0, 21.4, 17.9, 14.3, 10.7, 7.1, 3.6]
# 8 [22.2, 19.4, 16.7, 13.9, 11.1, 8.3, 5.6, 2.8]
# 9 [20.0, 17.8, 15.6, 13.3, 11.1, 8.9, 6.7, 4.4, 2.2]

def generate_score_range(n):
    output = [i for i in range(n, 0, -1)]
    total = sum(output)
    result = [0] * len(output)
    for i in range(len(output)):
        result[i] = round(output[i] / total * 100, 1)
    return result

def weightage_from_preference(pref: int, max_pref_count: int) -> float:
    scores = generate_score_range(max_pref_count)
    return scores[pref-1]
    
def score(exp: int, pref: int, max_pref_count: int) -> float:
    return weightage_from_preference(pref, max_pref_count) * score_from_exp(exp)

def allocate():
    identifier = Config.objects.get(id=1).current_preference_sem
    max_pref_count = Config.objects.get(id=1).preference_count

    preferences = Preference.objects.filter(preference_sem_identifier=identifier)
    course_ids = preferences.values_list('course_id').distinct()
    faculty_ids = preferences.values('faculty_id').distinct()

    courses = Course.objects.filter(id__in=course_ids)
    faculties = Faculty.objects.filter(id__in=faculty_ids)

    batches = Batch.objects.filter(year=2018, sem=1)
    not_prefered_courses = Course.objects.filter(batch__in=batches).exclude(id__in=[c.id for c in courses])
    for course in courses:
        print(course.name, course.batch)
        prefs = preferences.filter(course_id=course.id)
        arr = [(pref.faculty.user.username, pref.experience, pref.weigtage, score(pref.experience, pref.weigtage, 3), 1) for pref in prefs]
        arr = sorted(arr, key = lambda x: x[3], reverse=True)

        for i in arr:
            print(i)
        print()

    print("By faculty")


    for faculty in faculties:
    #     print(faculty.work)
        prefs = preferences.filter(faculty_id=faculty.id)
        print(faculty.user.first_name)
        print([(pref.experience, pref.weigtage, score(pref.experience, pref.weigtage, 3)) for pref in prefs])

        print()

allocate()
