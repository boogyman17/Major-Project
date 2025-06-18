
from .api import api
from django.contrib import admin
from django.urls import path, include
from waitlists.views import home_view


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", api.urls),  
    path('', home_view, name='home'),
]