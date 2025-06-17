from ninja import NinjaAPI, Schema
from ninja_jwt.authentication import JWTAuth
from ninja_extra import NinjaExtraAPI
from ninja_jwt.controller import NinjaJWTDefaultController
from waitlists.api import router as waitlists_router
from django.contrib.auth.models import User


class RegisterSchema(Schema):
    username: str
    password: str
    email: str


api = NinjaExtraAPI()
api.register_controllers(NinjaJWTDefaultController)
api.add_router("/", waitlists_router)
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


@api.post("/register")
def register(request, payload: RegisterSchema):
    user = User.objects.create_user(
        username=payload.username,
        password=payload.password,
        email=payload.email,
    )
    return {"id": user.id, "username": user.username}

@api.get("/hello")
def hello(request):
    print (request)
    return "Hello World" 


@api.get("/me",response=UserSchema,auth=JWTAuth())
def me(request):
    return request.user