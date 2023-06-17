from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Teacher(User):
    phone_number = models.CharField(max_length=20, null=True)


class Grade(models.Model):
    name = models.CharField(max_length=150, default="")
    master = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True)
    created_at = models.DateField(auto_now=True)


class Student(User):
    phone_number = models.CharField(max_length=20, null=True)
    grade = models.ForeignKey(Grade, on_delete=models.SET_NULL, null=True)


class Course(models.Model):
    name = models.CharField(max_length=100, default="")
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True)
    created_at = models.DateField(auto_now=True)


class Part(models.Model):
    name = models.CharField(max_length=150, default="")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True)
    created_at = models.DateField(auto_now=True)


class Exercice(models.Model):
    name = models.CharField(max_length=100, default="")
    part = models.ForeignKey(Part, on_delete=models.CASCADE, null=True)
    type = models.CharField(max_length=50, default="test")
    mark_allocation = models.CharField(max_length=50, default="20")
    is_answered = models.BooleanField(default=False)
    is_corrected = models.BooleanField(default=False)
    mark = models.CharField(max_length=10, default="")
    created_at = models.DateField(auto_now=True)


class Question(models.Model):
    statement = models.TextField(default="")
    response = models.TextField(default="")
    exercice = models.ForeignKey(Exercice, on_delete=models.SET_NULL, null=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True)
    created_at = models.DateField(auto_now=True)


class Student_Question(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    answer = models.CharField(max_length=100, null=True)
    is_corrected = models.BooleanField(default=False)
    mark = models.CharField(max_length=10, null=True)
    created_at = models.DateField(auto_now=True)


class Material(models.Model):
    name = models.CharField(max_length=100, default="")
    part = models.ForeignKey(Part, on_delete=models.CASCADE, null=True)
    description = models.TextField(default="")
    link = models.TextField(default="")
