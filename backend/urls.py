from rest_framework import routers
from .Api import ProductViewset, RegisterUser,LoginUser,OrderView,ContactUS
from django.urls import path, include
from knox import views as KnoxView

router = routers.DefaultRouter()
# router.register('products', ProductViewset,'products')

urlpatterns = [
    path('login',LoginUser.as_view(),name="login"),
    path('logout',KnoxView.LogoutView.as_view(),name="knox_logout"),
    path('register',RegisterUser.as_view(),name="RegisterUser"),
    path('orderview',OrderView.as_view(),name="Orderview"),
    path('products',ProductViewset.as_view(),name="product"),
    path('ContactUS',ContactUS.as_view(),name="ContactUS"),
   
]

urlpatterns += router.urls