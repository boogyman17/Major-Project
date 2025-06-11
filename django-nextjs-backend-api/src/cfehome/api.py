from ninja import NinjaAPI, Schema
from ninja_jwt.authentication import JWTAuth
from ninja_extra import NinjaExtraAPI
from ninja_jwt.controller import NinjaJWTDefaultController
from waitlists.api import router


api = NinjaExtraAPI()
api.register_controllers(NinjaJWTDefaultController)
from ninja import Router

router = Router()

@router.get("/")
def list_entries(request):
    return {"message": "Hello world"}
class UserSchema(Schema):
    username: str
    is_authenticated: bool
    
    email: str = None

@api.get("/hello")
def hello(request):
    print (request)
    return "Hello World" 


@api.get("/me",response=UserSchema,auth=JWTAuth())
def me(request):
    return request.user