from django.shortcuts import render, redirect
from django.contrib.auth import logout, login
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utils import is_ajax, classify_face
import base64
from api.models import Log
from django.core.files.base import ContentFile
from django.contrib.auth.models import User
from frontend.models import Profile


# Create your views here.
@login_required(login_url="frontend:connexion")
def index(request, *args, **kwargs):
    return render(request, "frontend/index.html")


def login_view(request):
    return render(request, "frontend/index.html")


def logout_view(request):
    logout(request)
    return redirect("frontend:connexion")


@login_required(login_url="frontend:connexion")
def home_view(request):
    return render(request, "frontend/index.html")


@csrf_exempt
def find_user_view(request):
    if request.method == "POST":
        photo = request.POST.get("photo")
        _, str_img = photo.split(";base64")
        decoded_file = base64.b64decode(str_img)
        x = Log()
        # x.photo = ContentFile(decoded_file, "upload_img")
        # x.save()
        x.photo.save("upload.png", ContentFile(decoded_file))
        x.save()

        res = classify_face(x.photo.path)

        user_exists = User.objects.filter(username=res).exists()
        if user_exists:
            user = User.objects.get(username=res)
            profile = Profile.objects.get(user=user)

            x.profile = profile
            x.save()

            login(request, user, x, profile)
            return JsonResponse({"success": "identified"})
        return JsonResponse({"success": "User unknown"})
    return JsonResponse({"success": "Bad request"})
