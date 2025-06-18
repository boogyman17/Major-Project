from typing import List
from ninja import Router
from orders.models import Order
from orders.schemas import OrderSchema, OrderCreateSchema
router = Router()

@router.get("/orders", response=List[OrderSchema])
def list_orders(request):
    return Order.objects.all()

@router.post("/orders", response=OrderSchema)
def create_order(request, payload: OrderCreateSchema):
    order = Order.objects.create(
        user=request.user,
        item=payload.item,
        quantity=payload.quantity,
        total=payload.total,
    )
    return order