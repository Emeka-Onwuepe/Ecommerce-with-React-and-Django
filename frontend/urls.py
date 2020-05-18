from django.urls import path,include
from . import views

APP_NAME= 'frontEnd'
urlpatterns = [
    path('',views.index,name="index"),
]
