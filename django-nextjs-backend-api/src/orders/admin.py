from django.contrib import admin
from .models import Order

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total', 'created')
    search_fields = ('id', 'user__username')
    list_filter = ('created',)