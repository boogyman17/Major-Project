from typing import List
import json
from django.shortcuts import get_object_or_404
from ninja import Router

import helpers
from ninja_jwt.authentication import JWTAuth

from .forms import WaitlistEntryCreateForm
from .models import WaitlistEntry
from .schemas import (
    WaitlistEntryCreateSchema, 
    WaitlistEntryListSchema, 
    WaitlistEntryDetailSchema,
    ErrorWaitlistEntryCreateSchema,
    WaitlistEntryUpdateSchema
)

router = Router()



@router.get("/waitlists", response=List[WaitlistEntryListSchema])
def list_waitlist_entries(request):  
    qs = WaitlistEntry.objects.all()
    return qs
