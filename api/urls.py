from django.urls import path
from .views import main

app_name = "api"

urlpatterns = [
    path("", main),
]
