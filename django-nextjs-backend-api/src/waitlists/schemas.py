from typing import List, Any, Optional
from datetime import datetime
from ninja import Schema
from pydantic import EmailStr


class WaitlistEntryCreateSchema(Schema):
    
    email: EmailStr

class ErrorWaitlistEntryCreateSchema(Schema):
    email: List[Any]
    


class WaitlistEntryListSchema(Schema):
    id: int
    email: EmailStr
    updated: datetime
    timestamp: datetime
    description: Optional[str] = ""


class WaitlistEntryDetailSchema(Schema):
    
    id: int
    email: EmailStr
    updated: datetime
    timestamp: datetime
    description: Optional[str] = ""


class WaitlistEntryUpdateSchema(Schema):
    
   description: str = ""
    