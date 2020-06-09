from django.contrib.auth import get_user_model
User=get_user_model()
from rest_framework import viewsets,permissions,generics
from rest_framework.response import Response
from .models import Product, Category,OrderedProduct,Ordered
from .serializer import ProductSerializer,CategorySerializer,UserSerializer,GetUserSerializer,LoginSerializer,OrderedSerializer,OrderedProductSerializer
from knox.models import AuthToken
from datetime import timedelta
from django.core.mail import send_mail

class ProductViewset(generics.GenericAPIView):
    serializer_class=ProductSerializer
    permission_classes=[permissions.AllowAny]
    # queryset= Product.objects.all()

    def get(self, request, *args, **kwargs):
        queryProduct= self.get_queryset()
        queryCategory= Category.objects.all()
        categories= CategorySerializer(queryCategory, many=True)
        products= ProductSerializer(queryProduct, many=True)
        return Response({"categories":categories.data,"products":products.data,})
    
    def post(self, request, *args, **kwargs):
        data= request.data["data"]
        products=""
        if request.data["search"]=="category":
            productQuery=Product.objects.filter(category=data)
            products= ProductSerializer(productQuery, many=True)
        elif request.data["search"]=="brand":
            productQuery=Product.objects.filter(brand=data)
            products= ProductSerializer(productQuery, many=True)
        elif request.data["search"]=="all":
            productQuery=Product.objects.all()
            products= ProductSerializer(productQuery, many=True)
        elif request.data["search"]=="orderedproducts":
            productQuery=OrderedProduct.objects.filter(purchaseId=int(data))
            products=OrderedProductSerializer(productQuery,many=True)
        return Response({"products":products.data})
    
    def get_queryset(self):
        catergories = Category.objects.all()
        queryset=[]
        for item in catergories:
            querry=Product.objects.filter(category=item)[:8]
            for item in querry:
                queryset.append(item) 
        return queryset
    
class RegisterUser(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        _,token=AuthToken.objects.create(user)
        returnedUser=GetUserSerializer(user)
        return Response({"user":returnedUser.data,"token":token})
    

class LoginUser(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _,token=AuthToken.objects.create(user)
        returnedUser=GetUserSerializer(user)
        order=Ordered.objects.filter(customer=user)
        ordered=OrderedSerializer(order,many=True)
        return Response({"user":returnedUser.data,"ordered":ordered.data,"token":token})

class OrderView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes=[permissions.IsAuthenticated,]
    
    def post(self, request, *args, **kwargs):
        userData=request.data['user']
        orderedData=request.data['Ordered']
        orderedProductData=request.data['OrderedProduct']
        print(orderedData)
        print(orderedProductData)
        # user= request.user
        #user.address=userData["address"]
        serializer = self.get_serializer(instance=request.user,data=userData,partial=True)
        serializer.is_valid(raise_exception=True)
        updatedUser=serializer.save()
        print(updatedUser)
        siteOwner= User.objects.get(owner=True)
        
        Ordered=OrderedSerializer(data=request.data['Ordered'])
        Ordered.is_valid(raise_exception=True)
        order= Ordered.save()
        Order=OrderedSerializer(order)
        OrderedProduct=OrderedProductSerializer(data=request.data['OrderedProduct'],many=True,context={"purchaseId":order})
        OrderedProduct.is_valid(raise_exception=True)
        orderedproduct= OrderedProduct.save()
       
        print("success")
        #prepare and send email
        products= ""
        for item in orderedProductData :
            products += f'<li>{item["name"]} {item["brand"]}, Price: #{item["price"]}, Qty:{item["quantity"]}</li>'
        message=f"<p>You have a new order with the ID:<strong>{orderedData['OrderId']}</strong> and a total amount of <strong>#{orderedData['total']}</strong>.</p>"
        message+= f"<p>The ordered Product(s) is/are as follows: <br/><ol>{products}</ol></p><p>His email and password are as follows:<br/>"
        message+=f"Email: {updatedUser.email} <br/> Phone Number:{updatedUser.phone_number} <br/> Address:{updatedUser.address}</p>"
        send_mail(f"New Order from {updatedUser}", "", "Illumepedia", [siteOwner.email], fail_silently=False, html_message=message)
        return Response({"Ordered":Order.data})
    
    
class ContactUS(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes=[permissions.AllowAny,]
        
    def post(self, request, *args, **kwargs):
        data= request.data
        full_name = data["full_name"]
        email = data["email"]
        #email= settings.EMAIL_HOST_USER
        phone_number = data["phone_number"]
        subject = data["subject"]
        message = data["message"]
        Message = f"Hello, my name is {full_name}, my phone number and email address are {phone_number}, {email} respectively. \r\n\n {message}"
        send = send_mail(subject, Message, "Illumepedia", [
                         'pascalemy2010@gmail.com'], fail_silently=False,)
        return Response({"message":"Your Message was sent successfully"})
