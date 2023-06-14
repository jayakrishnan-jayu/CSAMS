import graphene
from allocation.graphql.types.allocation import AllocationsType
from allocation.models import CourseAllocation, LabAllocation

from backend.api.decorator import login_required, resolve_user, staff_privilege_required
from backend.api import APIException
from course.models import Batch, Course, CourseLab
from preference.models import Config, Identifier
from user.models import Faculty
from django.db.models import F
from django.db import transaction

class AddCourseAllocation(graphene.Mutation):
    class Arguments:
        facultyID = graphene.ID(required=True)
        courseID = graphene.ID(required=True)
        
    response = graphene.Field(AllocationsType)

    @login_required
    @resolve_user
    @staff_privilege_required
    def mutate(self, info, facultyID: graphene.ID,  courseID: graphene.ID):
        config = Config.objects.first()
        i: Identifier = config.current_preference_sem
        if i.is_hod_approved:
            raise APIException(message="HOD Approved Allocation")
        try:
            f = Faculty.objects.get(id=facultyID)
        except Faculty.DoesNotExist:
            raise APIException(message="Invalid Faculty ID")
        if not f.user.is_active:
            raise APIException(message="In active Faculty ID")
        try:
            c = Course.objects.get(id=courseID)
        except Course.DoesNotExist:
            raise APIException(message="Invalid Course ID")
        active_batches = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not i.is_even_sem , sem_year=i.year)
        active_courses = Course.objects.filter(batch__in=active_batches)
        if not active_courses.filter(id=c.id).exists():
            raise APIException(message="Invalid Course, course not found in current active batches")
        
        if CourseAllocation.objects.filter(course=c, faculty=f).exists():
            raise APIException(message="Course allocation already exists")
        if LabAllocation.objects.filter(course=c, faculty=f).exists():
            raise APIException(message="Lab allocation already exists")
    
        if c.is_elective:
            elective_batch_courses = active_courses.filter(batch=c.batch, is_elective=True)
            if (
                CourseAllocation.objects.filter(faculty=f, course__in=elective_batch_courses).exists()
                or
                LabAllocation.objects.filter(faculty=f, course__in=elective_batch_courses).exists()
                ):
                raise APIException(message="Faculty already allocated to an elective course in this batch")
    
        if c.is_lab:
            raise APIException(message="Course is of type lab component")
        
        if c.has_lab:
            lab = CourseLab.objects.get(course=c).lab
            if LabAllocation.objects.filter(course=lab, is_in_charge=True).exists():
                raise APIException(message="Internal Error: Lab allocation already exists")
            
            with transaction.atomic():
                CourseAllocation.objects.create(course=c, faculty=f)
                LabAllocation.objects.create(course=lab, faculty=f, is_in_charge=True)
        else:
            CourseAllocation.objects.create(course=c, faculty=f)
        
        response = AllocationsType(
            courses=CourseAllocation.objects.filter(course__in=active_courses), 
            labs=LabAllocation.objects.filter(course__in=active_courses)
        )
        return AddCourseAllocation(response=response)

class AddLabAllocation(graphene.Mutation):
    class Arguments:
        facultyID = graphene.ID(required=True)
        courseID = graphene.ID(required=True)
        is_in_charge = graphene.Boolean(required=True)

    response = graphene.Field(AllocationsType)

    @login_required
    @resolve_user
    @staff_privilege_required
    def mutate(self, info, facultyID: graphene.ID,  courseID: graphene.ID, is_in_charge: bool):

        config = Config.objects.first()
        i: Identifier = config.current_preference_sem
        if i.is_hod_approved:
            raise APIException(message="HOD Approved Allocation")
        try:
            f = Faculty.objects.get(id=facultyID)
        except Faculty.DoesNotExist:
            raise APIException(message="Invalid Faculty ID")
        if not f.user.is_active:
            raise APIException(message="In active Faculty ID")
        try:
            c = Course.objects.get(id=courseID)
        except Course.DoesNotExist:
            raise APIException(message="Invalid Course ID")
        active_batches = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not i.is_even_sem , sem_year=i.year)
        active_courses = Course.objects.filter(batch__in=active_batches)
        if not active_courses.filter(id=c.id).exists():
            raise APIException(message="Invalid Course, course not found in current active batches")
        
        if CourseAllocation.objects.filter(course=c, faculty=f).exists():
            raise APIException(message="Course allocation already exists")
        if LabAllocation.objects.filter(course=c, faculty=f).exists():
            raise APIException(message="Lab allocation already exists")
    
        if c.is_elective:
            elective_batch_courses = active_courses.filter(batch=c.batch, is_elective=True)
            if (
                CourseAllocation.objects.filter(faculty=f, course__in=elective_batch_courses).exists()
                or
                LabAllocation.objects.filter(faculty=f, course__in=elective_batch_courses).exists()
                ):
                raise APIException(message="Faculty already allocated to an elective course in this batch")

        if not c.is_lab:
            raise APIException(message="Course is of type course component")
        
        qs = CourseLab.objects.filter(lab=c)
        if not qs.exists():
            # Lab only
            if is_in_charge and LabAllocation.objects.filter(course=c, is_in_charge=True).exists():
                raise APIException(message="Lab allocation already exists for in charge")
            LabAllocation.objects.create(faculty=f, course=c, is_in_charge=is_in_charge)
            response = AllocationsType(
                courses=CourseAllocation.objects.filter(course__in=active_courses), 
                labs=LabAllocation.objects.filter(course__in=active_courses)
            )
            return AddLabAllocation(response=response)
        course = qs.first().course
        lab = c
        if is_in_charge:    
            if CourseAllocation.objects.filter(course=course).exists() or LabAllocation.objects.filter(course=lab, is_in_charge=True).exists():
                raise APIException(message="Course or Lab is already allocated as incharge")
        with transaction.atomic():
            if is_in_charge:
                CourseAllocation.objects.create(faculty=f, course=course)
            LabAllocation.objects.create(faculty=f, course=lab, is_in_charge=is_in_charge)
        response = AllocationsType(
            courses=CourseAllocation.objects.filter(course__in=active_courses), 
            labs=LabAllocation.objects.filter(course__in=active_courses)
        )
        return AddLabAllocation(response=response)


class UpdateCourseAllocation(graphene.Mutation):
    class Arguments:
        allocationID = graphene.ID(required=True)
        oldFacultyID = graphene.ID(required=True)
        newFacultyID = graphene.ID(required=True)
        
    response = graphene.Field(AllocationsType)

    @login_required
    @resolve_user
    @staff_privilege_required
    def mutate(self, info, allocationID: graphene.ID, oldFacultyID: graphene.ID, newFacultyID: graphene.ID):
        config = Config.objects.first()
        i: Identifier = config.current_preference_sem
        if i.is_hod_approved:
            raise APIException(message="HOD Approved Allocation")
        try:
            ca = CourseAllocation.objects.get(id=allocationID, faculty_id=oldFacultyID)
        except CourseAllocation.DoesNotExist:
            raise APIException(message="Course Allocation does not exist, invalid id")
        try:
            f = Faculty.objects.get(id=newFacultyID)
        except Faculty.DoesNotExist:
            raise APIException(message="Faculty does not exists, invalid id")
        if not f.user.is_active:
            raise APIException(message="Inactive Faculty ID")
        
        active_batches = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not i.is_even_sem , sem_year=i.year)
        active_courses = Course.objects.filter(batch__in=active_batches)
        if not active_courses.filter(id=ca.course.id).exists():
            raise APIException(message="Invalid Course, course not found in current active batches")
        c: Course = ca.course
        if c.is_elective:
            elective_batch_courses = active_courses.filter(batch=c.batch, is_elective=True)
            if (
                CourseAllocation.objects.filter(faculty=f, course__in=elective_batch_courses).exists()
                or
                LabAllocation.objects.filter(faculty=f, course__in=elective_batch_courses).exists()
                ):
                raise APIException(message="Faculty already allocated to an elective course in this batch")
            
        qs = CourseLab.objects.filter(course=ca.course)
        with transaction.atomic():
            if qs.exists():
                lab = qs.first().lab
                la_qs = LabAllocation.objects.filter(course=lab, faculty_id=oldFacultyID, is_in_charge=True)
                if not la_qs.exists():
                    raise APIException(message="Invalid state, No lab allocation found for previous faculty")
                la = la_qs.first()
                la.faculty = f
                la.save()
            ca.faculty = f
            ca.save()
        
        response = AllocationsType(
            courses=CourseAllocation.objects.filter(course__in=active_courses), 
            labs=LabAllocation.objects.filter(course__in=active_courses)
        )
        return UpdateCourseAllocation(response=response)

class UpdateLabAllocation(graphene.Mutation):
    class Arguments:
        allocationID = graphene.ID(required=True)
        oldFacultyID = graphene.ID(required=True)
        newFacultyID = graphene.ID(required=True)
        
    response = graphene.Field(AllocationsType)

    @login_required
    @resolve_user
    @staff_privilege_required
    def mutate(self, info, allocationID: graphene.ID, oldFacultyID: graphene.ID, newFacultyID: graphene.ID):
        config = Config.objects.first()
        i: Identifier = config.current_preference_sem
        if i.is_hod_approved:
            raise APIException(message="HOD Approved Allocation")
        try:
            la = LabAllocation.objects.get(id=allocationID, faculty_id=oldFacultyID)
        except LabAllocation.DoesNotExist:
            raise APIException(message="Lab Allocation does not exist, invalid id")
        try:
            f = Faculty.objects.get(id=newFacultyID)
        except Faculty.DoesNotExist:
            raise APIException(message="Faculty does not exists, invalid id")
        if not f.user.is_active:
            raise APIException(message="Inactive Faculty ID")

        active_batches = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not i.is_even_sem , sem_year=i.year)
        active_courses = Course.objects.filter(batch__in=active_batches)
        if not active_courses.filter(id=la.course.id).exists():
            raise APIException(message="Invalid Course, lab not found in current active batches")
        
        c: Course = la.course
        if c.is_elective:
            elective_batch_courses = active_courses.filter(batch=c.batch, is_elective=True)
            if (
                CourseAllocation.objects.filter(faculty=f, course__in=elective_batch_courses).exists()
                or
                LabAllocation.objects.filter(faculty=f, course__in=elective_batch_courses).exists()
                ):
                raise APIException(message="Faculty already allocated to an elective course in this batch")
            
        qs = CourseLab.objects.filter(lab=la.course)
        with transaction.atomic():
            if qs.exists() and la.is_in_charge:
                course = qs.first().course
                lab = qs.first().lab

                ca_qs = CourseAllocation.objects.filter(course=course, faculty_id=oldFacultyID)
                if not ca_qs.exists():
                    raise APIException(message="Invalid state, No lab allocation found for previous faculty")
                ca = ca_qs.first()

                ca.faculty = f
                ca.save()
            lab.faculty = f
            la.save()
        
        response = AllocationsType(
            courses=CourseAllocation.objects.filter(course__in=active_courses), 
            labs=LabAllocation.objects.filter(course__in=active_courses)
        )
        return UpdateLabAllocation(response=response)

class DeleteCourseAllocation(graphene.Mutation):
    class Arguments:
        allocationID = graphene.ID(required=True)
        courseID = graphene.ID(required=True)
    response = graphene.Field(AllocationsType)

    @login_required
    @resolve_user
    @staff_privilege_required
    def mutate(self, info, allocationID: graphene.ID, courseID: graphene.ID):
        config = Config.objects.first()
        i: Identifier = config.current_preference_sem
        if i.is_hod_approved:
            raise APIException(message="HOD Approved Allocation")
        try:
            ca = CourseAllocation.objects.get(id=allocationID, course_id=courseID)
        except CourseAllocation.DoesNotExist:
            raise APIException(message="Course allocation not found")
        qs = CourseLab.objects.filter(course=ca.course)
        active_batches = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not i.is_even_sem , sem_year=i.year)
        active_courses = Course.objects.filter(batch__in=active_batches)
        if not active_courses.filter(id=ca.course.id).exists():
            raise APIException(message="Invalid Course, course not found in current active batches")
        with transaction.atomic():
            if qs.exists():
                lab = qs.first().lab
                try:
                    la = LabAllocation.objects.get(course=lab, faculty=ca.faculty, is_in_charge=True)
                except LabAllocation.DoesNotExist:
                    raise APIException(message="Lab allocation not found")
                la.delete()
            ca.delete()
        
        response = AllocationsType(
            courses=CourseAllocation.objects.filter(course__in=active_courses), 
            labs=LabAllocation.objects.filter(course__in=active_courses)
        )
        return DeleteCourseAllocation(response=response)


class DeleteLabAllocation(graphene.Mutation):
    class Arguments:
        allocationID = graphene.ID(required=True)
        courseID = graphene.ID(required=True)
    response = graphene.Field(AllocationsType)

    @login_required
    @resolve_user
    @staff_privilege_required
    def mutate(self, info, allocationID: graphene.ID, courseID: graphene.ID):
        config = Config.objects.first()
        i: Identifier = config.current_preference_sem
        if i.is_hod_approved:
            raise APIException(message="HOD Approved Allocation")
        try:
            la = LabAllocation.objects.get(id=allocationID, course_id=courseID)
        except LabAllocation.DoesNotExist:
            raise APIException(message="Lab allocation not found")
        qs = CourseLab.objects.filter(lab=la.course)
        active_batches = Batch.objects.annotate(odd=F('sem') % 2, sem_year=F('year')+(F('sem')-1)/2).filter(odd=not i.is_even_sem , sem_year=i.year)
        active_courses = Course.objects.filter(batch__in=active_batches)
        if not active_courses.filter(id=la.course.id).exists():
            raise APIException(message="Invalid Course, lab not found in current active batches")
        with transaction.atomic():
            if qs.exists() and la.is_in_charge:
                course = qs.first().course
                try:
                    ca = CourseAllocation.objects.get(course=course, faculty=la.faculty)
                except CourseAllocation.DoesNotExist:
                    raise APIException(message="Course allocation not found")
                ca.delete()
            la.delete()
        
        response = AllocationsType(
            courses=CourseAllocation.objects.filter(course__in=active_courses), 
            labs=LabAllocation.objects.filter(course__in=active_courses)
        )
        return DeleteLabAllocation(response=response)
    
class AllocationMutation(graphene.ObjectType):
    add_course_allocation =  AddCourseAllocation.Field()
    update_course_allocation =  UpdateCourseAllocation.Field()
    delete_course_allocation = DeleteCourseAllocation.Field()

    add_lab_allocation = AddLabAllocation.Field()
    update_lab_allocation =  UpdateLabAllocation.Field()
    delete_lab_allocation = DeleteLabAllocation.Field()

__all__ = [
    'AllocationMutation'
]