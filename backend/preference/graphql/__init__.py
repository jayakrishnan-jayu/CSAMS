from .query import PreferenceQueries
from .mutation import PreferenceMutation

class PrefernceQuery(
    PreferenceQueries
):
    pass

__all__ = [
    'PrefernceQuery',
    'PreferenceMutation'
]