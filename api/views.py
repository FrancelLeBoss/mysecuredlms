from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import logout


# Create your views here.
def main(request):
    return HttpResponse("Hello")
