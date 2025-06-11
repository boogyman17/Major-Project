from django.urls import path
from . import views

urlpatterns = [
    path('waitlists/', views.waitlist_api_view, name='waitlist-api'),
]