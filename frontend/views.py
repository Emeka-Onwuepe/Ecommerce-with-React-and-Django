from django.shortcuts import render
from backend.models import Category,Product

app_name="homeview"

# Create your views here.
def index(request):
    product= Product.objects.all()
    category= Category.objects.all()
    return render(request,"frontend/index.html",{"products":product,"categories":category}) 
    