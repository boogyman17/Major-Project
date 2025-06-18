from typing import List
from ninja import NinjaAPI, Schema
from datetime import timezone as dt_timezone
from django.utils import timezone
if not hasattr(timezone, "utc"):
    timezone.utc = dt_timezone.utc
from ninja_jwt.authentication import JWTAuth
from ninja_extra import NinjaExtraAPI
from ninja_jwt.controller import NinjaJWTDefaultController
from waitlists.api import router as waitlists_router
from orders.api import router as orders_router
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from ninja_jwt.tokens import RefreshToken


class RegisterSchema(Schema):
    username: str
    password: str
    email: str


api = NinjaExtraAPI()
api.register_controllers(NinjaJWTDefaultController)
api.add_router("/", waitlists_router)
api.add_router("/", orders_router)
from ninja import Router

router = Router()
api.add_router("", router)

@router.get("/")
def list_entries(request):
    return {"message": "Hello world"}
class UserSchema(Schema):
    username: str
    is_authenticated: bool
    email: str = None



class UserListSchema(Schema):
    id: int
    username: str
    email: str
@api.post("/register")

def register(request, payload: RegisterSchema):
    user = User.objects.create_user(
        username=payload.username,
        password=payload.password,
        email=payload.email,
    )
    return {"id": user.id, "username": user.username}

class LoginSchema(Schema):
    username: str | None = None
    email: str | None = None
    password: str


@api.post("/login")
def login(request, payload: LoginSchema):
    ident = payload.username or payload.email
    if not ident:
        return api.create_response(request, {"detail": "Username or email required"}, status=400)
    if payload.username is None:
        try:
            user_obj = User.objects.get(email=payload.email)
            ident = user_obj.username
        except User.DoesNotExist:
            return api.create_response(request, {"detail": "Invalid credentials"}, status=401)
    user = authenticate(username=ident, password=payload.password)
    if not user:
        return api.create_response(request, {"detail": "Invalid credentials"}, status=401)
    refresh = RefreshToken.for_user(user)
    return {
        "username": user.username,
        "access": str(refresh.access_token),
    }
@api.get("/hello")
def hello(request):
    print (request)
    return "Hello World" 


@api.get("/me",response=UserSchema,auth=JWTAuth())
def me(request):
    return request.user

@api.get("/users/", response=List[UserListSchema], auth=JWTAuth())
def list_users(request):
    if not request.user.is_staff:
        return api.create_response(request, {"detail": "Permission denied"}, status=403)
    return User.objects.all()