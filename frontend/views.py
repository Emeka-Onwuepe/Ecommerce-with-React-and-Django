from django.shortcuts import render

app_name="homeview"

# Create your views here.
def index(request):
    return render(request,"frontend/index.html") 
    