from preference.models import Config, Preference, Identifier
from course.models import Course, Batch, CourseLab
from user.models import Faculty
from django.db.models import F
from django.db.models import Sum
from typing import List

class Allocation:

    def __init__(self) -> None:
        self.identifier = Config.objects.get(id=1).current_preference_sem
        self.max_pref_count = Config.objects.get(id=1).preference_count
        self.score_range = self.generate_score_range()
        self.allocated_faculties = {}

    # [1,3] -> 1, [4,6] -> 2, [7, 9] -> 3 ....
    @staticmethod
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

    def generate_score_range(self):
        output = [i for i in range(self.max_pref_count, 0, -1)]
        total = sum(output)
        result = [0] * len(output)
        for i in range(len(output)):
            result[i] = round(output[i] / total * 100, 1)
        return result

    def weightage_from_preference(self, pref: int) -> float:
        return self.score_range[pref-1]
        
    def score(self, exp: int, pref: int) -> float:
        return self.weightage_from_preference(pref) * Allocation.score_from_exp(exp)

    def best_preference(self, prefs: List['Preference']) -> Preference:
        best_pref: Preference = prefs.first()
        best_score = 0
        for pref in prefs:
            faculty_score = self.score(pref.experience, pref.weigtage)
            if faculty_score > best_score:  # Iterate and find out the preference with highest score
                best_score = faculty_score
                best_pref = pref
                continue

            if faculty_score == best_score:  # if there are two preference with same score,
                best_faculty_workload = best_pref.faculty.workload(self.identifier)
                current_faculty_workload = pref.faculty.workload(self.identifier)
                # if both preferred faculties have the same workload, then allocate based on time.
                if best_faculty_workload == current_faculty_workload:
                    if best_pref.timestamp < pref.timestamp:
                        continue
                    best_pref = pref
                    continue

                if best_faculty_workload < current_faculty_workload:
                    continue
                best_pref = pref
        return best_pref

    def allocate(self):
        
        print(f'{self.identifier=}')
        print(f'{self.max_pref_count=}')
        
        preferences = Preference.objects.filter(preference_sem_identifier=self.identifier)
        preferred_course_ids = preferences.values_list('course_id').distinct()
        preferred_faculty_ids = preferences.values('faculty_id').distinct()

        batches = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not self.identifier.is_even_sem, sem_year=self.identifier.year)
        
        courses_in_batches = Course.objects.filter(batch__in=batches)
        courses_in_batches_ids = [c.id for c in courses_in_batches]

        preferred_course_labs = CourseLab.objects.filter(course__id__in=preferred_course_ids)
        not_preferred_course_labs = CourseLab.objects.filter(course__id__in=courses_in_batches_ids).exclude(id__in=[c.id for c in preferred_course_labs])
        
        preferred_course_of_course_labs = [cl.course for cl in preferred_course_labs]
        preferred_course_of_course_labs_ids = [c.id for c in preferred_course_of_course_labs]
        not_preferred_course_of_course_labs = [cl.course for cl in not_preferred_course_labs]
        
        preferred_courses = Course.objects.filter(id__in=preferred_course_ids).exclude(id__in=preferred_course_of_course_labs_ids)
        not_prefered_courses = courses_in_batches.exclude(id__in=preferred_course_ids).exclude(id__in=preferred_course_of_course_labs_ids)

        preferred_faculties = Faculty.objects.filter(id__in=preferred_faculty_ids)
        not_preferred_faculties = Faculty.objects.all().exclude(id__in=preferred_faculty_ids)

        


        print()
        print(f"{preferences.count()=}")
        print(f"{batches.count()=}")
        print()
        print(f"{courses_in_batches.count()=}")
        print()
        print(f"{preferred_course_labs.count()=}")
        print(f"{not_preferred_course_labs.count()=}")
        print()
        print(f"{preferred_courses.count()=}")
        print(f"{not_prefered_courses.count()=}")
        print()
        print(f"{preferred_faculties.count()=}")
        print(f"{not_preferred_faculties.count()=}")
        print()
        
        allocated_courses = {}
        

        # First, allocate course labs
        for c in [*preferred_course_of_course_labs, *preferred_courses]:
            prefs = preferences.filter(course_id=c.id)
            best_pref = self.best_preference(prefs)

            print((best_pref.faculty.user.username, best_pref.experience, best_pref.weigtage, self.score(best_pref.experience, best_pref.weigtage)))
                
            if best_pref.faculty in self.allocated_faculties:
                self.allocated_faculties[best_pref.faculty]['total_workload'] += best_pref.course.workload
                self.allocated_faculties[best_pref.faculty]['courses'].append({'workload': best_pref.course.workload, 'course': best_pref.course})
            else:
                self.allocated_faculties[best_pref.faculty] = {
                    'total_workload': best_pref.course.workload,
                    'courses': [{'workload': best_pref.course.workload, 'course': best_pref.course}]
                }
                # arr = [(pref.faculty.user.username, pref.experience, pref.weigtage, self.score(pref.experience, pref.weigtage)) for pref in prefs]
                # arr = sorted(arr, key = lambda x: x[3], reverse=True)    
                # for i in arr:
                #     print(i)
                #     break
            
                # print()

            # for course in courses:
            #     print(course.name, course.batch)
            #     prefs = preferences.filter(course_id=course.id)
            #     arr = [(pref.faculty.user.username, pref.experience, pref.weigtage, score(pref.experience, pref.weigtage, max_pref_count), 1) for pref in prefs]
            #     arr = sorted(arr, key = lambda x: x[3], reverse=True)

            #     for i in arr:
            #         print(i)
            #     print()
        for fa in self.allocated_faculties:
            print(fa, f"{self.allocated_faculties[fa]['total_workload']=}")
            for x in self.allocated_faculties[fa]['courses']:
                print(x)
            print()


Allocation().allocate()
