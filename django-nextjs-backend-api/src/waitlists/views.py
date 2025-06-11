from django.shortcuts import render
from django.http import JsonResponse

from django.http import JsonResponse

def home_view(request):
    return JsonResponse({"message": "Welcome to the API"})

def waitlist_api_view(request):
    return JsonResponse({"message": "Waitlist API endpoint"})