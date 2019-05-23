from django.shortcuts import render

from django.shortcuts import render,redirect
# Create your views here.
def index(request):
     return render(request,'index.html')
def index2(request):
     return render(request,'index2.html')
def apihtml(request):
     return render(request,'api.html')
