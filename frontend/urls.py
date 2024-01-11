from django.urls import path
from .views import index, login_view, logout_view, home_view, find_user_view

# to define what app these paths belong to
app_name = "frontend"

urlpatterns = [
    path("", index, name="home"),
    path("home", home_view, name="home_"),
    path("login", login_view, name="connexion"),
    path("logout", logout_view, name="logout"),
    path("register", index, name="signup"),
    path("classify", find_user_view, name="classify"),
]
