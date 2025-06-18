from datetime import datetime
from ninja import Schema

class OrderCreateSchema(Schema):
    item: str
    quantity: int
    total: float

class OrderSchema(Schema):
    id: int
    user_id: int
    item: str
    quantity: int
    total: float
    created: datetime
    updated: datetime