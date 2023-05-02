from .config import ConfigMutation
from .preference import PrefMutation

class PreferenceMutation(
    ConfigMutation,
    PrefMutation,
):
    pass
    

__all__ = [
    'PreferenceMutation'
]