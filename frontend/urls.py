from django.urls import path
from .views import index

# to define what app these paths belong to
app_name = "frontend"

urlpatterns = [
    path("", index, name=""),
    path("login", index, name="login"),
    path("register", index, name="signup"),
]
