from django.contrib.auth import get_user_model
User=get_user_model()
from rest_framework import viewsets,permissions,generics
from rest_framework.response import Response
from .models import Product, Category,OrderedProduct,Ordered,MultiplePrice
from .serializer import ProductSerializer,CategorySerializer,UserSerializer,GetUserSerializer,LoginSerializer,OrderedSerializer,OrderedProductSerializer,MultiplePriceSerializer
from knox.models import AuthToken
from datetime import timedelta
from django.core.mail import send_mail

class ProductViewset(generics.GenericAPIView):
    serializer_class=ProductSerializer
    permission_classes=[permissions.AllowAny]
   
   
   
    def get(self, request, *args, **kwargs):
        queryProduct= self.get_queryset()
        queryCategory= Category.objects.all()
        price=[]
        
        for item in queryProduct:
            querry= item.multiprice.all()
            if len(querry) >0:
                for index in querry:
                     price.append(index)   
                     
        prices= MultiplePriceSerializer(price, many=True)   
        categories= CategorySerializer(queryCategory, many=True)
        products= ProductSerializer(queryProduct, many=True)
        
        return Response({"categories":categories.data,"products":products.data,"prices":prices.data})
    
    def post(self, request, *args, **kwargs):
        data= request.data["data"]
        products=""
        prices=""
        
        if request.data["search"]=="category": 
            productQuery=Product.objects.filter(category=data)
            products= ProductSerializer(productQuery, many=True)
            price=[]
            for item in productQuery:
                querry= item.multiprice.all()
                if len(querry) >0:
                    for index in querry:
                        price.append(index) 
            prices= MultiplePriceSerializer(price, many=True) 
        elif request.data["search"]=="brand":
            productQuery=Product.objects.filter(brand=data)
            products= ProductSerializer(productQuery, many=True)
            price=[]
            for item in productQuery:
                querry= item.multiprice.all()
                if len(querry) >0:
                    for index in querry:
                        price.append(index) 
            prices= MultiplePriceSerializer(price, many=True) 
        elif request.data["search"]=="all":
            productQuery=Product.objects.all()
            price=MultiplePrice.objects.all()
            products= ProductSerializer(productQuery, many=True)
            prices= MultiplePriceSerializer(price, many=True)
        elif request.data["search"]=="orderedproducts":
            productQuery=OrderedProduct.objects.filter(purchaseId=int(data))
            products=OrderedProductSerializer(productQuery,many=True)
            return Response({"products":products.data})
        return Response({"products":products.data,"prices":prices.data})
    
    def get_queryset(self):
        catergories = Category.objects.all()
        queryset=[]
        for item in catergories:
            querry=Product.objects.filter(category=item)[:12]
            for item in querry:
                queryset.append(item) 
                    # print()
                # for price in item.multiprice:
                #     querry=Product.objects.get(id=item)
                #     prices.append(item) 
                    
                # print(item.multiprice)
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
        serializer = self.get_serializer(instance=request.user,data=userData,partial=True)
        serializer.is_valid(raise_exception=True)
        updatedUser=serializer.save()
        siteOwner= User.objects.get(owner=True)
        
        Ordered=OrderedSerializer(data=request.data['Ordered'])
        Ordered.is_valid(raise_exception=True)
        order= Ordered.save()
        Order=OrderedSerializer(order)
        OrderedProduct=OrderedProductSerializer(data=request.data['OrderedProduct'],many=True,context={"purchaseId":order})
        OrderedProduct.is_valid(raise_exception=True)
        orderedproduct= OrderedProduct.save()
       
        #prepare and send email
        
        tableHead=f'<table><thead><tr><th>Product Name</th><th>Brand</th><th>Size</th><th>Qty</th><th>Price</th></tr></thead>'
        tableFoot=f'<tfoot><tr><td colspan="4">Total</td><td>&#x20A6; {orderedData["total"]}</td></tr></tfoot></table>'
        products= ""
        for item in orderedProductData :
            products += f'<tr><td>{item["name"]}</td><td>{item["brand"]}</td><td>{item["size"]}</td><td>{item["quantity"]}</td><td>&#x20A6; {item["price"]}</td></tr>'
        productTable=f"{tableHead}{products}{tableFoot}"
        message=f"<p>You have a new order with the ID:<strong>{orderedData['OrderId']}</strong> and a total amount of <strong>&#x20A6; {orderedData['total']}</strong>.</p>"
        message+= f"<p>The ordered Product(s) is/are as follows: <br/>{productTable}</p><p>{updatedUser} contact detail is as follows:<br/>"
        message+=f"Email: {updatedUser.email} <br/> Phone Number:{updatedUser.phone_number} <br/> Address:{updatedUser.address}</p>"
        send_mail(f"New Order from {updatedUser}", "", "Peastan", [siteOwner.email], fail_silently=False, html_message=message)
        return Response({"Ordered":Order.data})
    
    
class ContactUS(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes=[permissions.AllowAny,]
        
    def post(self, request, *args, **kwargs):
        siteOwner= User.objects.get(owner=True)
        data= request.data
        full_name = data["full_name"]
        email = data["email"]
        #email= settings.EMAIL_HOST_USER
        phone_number = data["phone_number"]
        subject = data["subject"]
        message = data["message"]
        Message = f"Hello, my name is {full_name}, my phone number and email address are {phone_number}, {email} respectively. \r\n\n {message}"
        send = send_mail(subject, Message, "Peastan", [siteOwner.email], fail_silently=False,)
        return Response({"message":"Your Message was sent successfully"})
