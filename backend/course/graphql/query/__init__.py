from .course import CourseQueries
from .batch import BatchQueries

class CourseQuery(
    CourseQueries,
    BatchQueries,
):
    pass

__all__ = [
    'CourseQuery',
]