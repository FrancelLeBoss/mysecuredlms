from django.urls import path
from .views import *

app_name = "facerec"

urlpatterns = [
    path("", main),
    path("realtimerecognition", RealTimeRecognition.as_view()),
]
1
