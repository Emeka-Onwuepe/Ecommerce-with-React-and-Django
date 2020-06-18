from rest_framework import serializers
from django.contrib.auth import get_user_model
User=get_user_model()
from django.contrib.auth import authenticate
from .models import Category,Product,Ordered,OrderedProduct,MultiplePrice

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields= "__all__"

class MultiplePriceSerializer(serializers.ModelSerializer):
    class Meta:
        model=MultiplePrice
        fields= "__all__"
    

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields= "__all__"
        
class GetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude=["password","last_login","is_active","is_admin","staff","is_superuser","owner","groups","user_permissions"]
        
class OrderedSerializer(serializers.ModelSerializer):
    # created=serializers.DateTimeField(format="%d/%h/%Y %H:%M")
    class Meta:
        model=Ordered
        fields= "__all__"
        # extra_kwargs = {"created": {"write_only": True}}
    
    def create(self, validated_data):
        order = Ordered.objects.create(OrderId=validated_data["OrderId"], customer=validated_data["customer"],total=validated_data["total"])
        order.save()
        return order

class OrderedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=OrderedProduct
        fields= ["id","name","brand","quantity","price", "size","product"]
    
    def create(self, validated_data):
        purchaseId= self.context.get("purchaseId")
        
        Product = OrderedProduct.objects.create(name=validated_data["name"],brand=validated_data["brand"], 
                                                quantity=validated_data["quantity"],price=validated_data["price"],size=validated_data["size"],
                                                purchaseId=purchaseId, product=validated_data["product"])
        Product.save()
        return Product
           
           
class UserSerializer(serializers.ModelSerializer):
   # email=serializers.EmailField(required=True)
    class Meta:
        # model = settings.AUTH_USER_MODEL
        # model = User
        model = User
        fields = ["id", "first_name","last_name", "email","phone_number","address" ,"password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data["email"],validated_data["first_name"],
                                        validated_data["last_name"] ,validated_data["phone_number"],
                                        validated_data["address"],validated_data["password"])
        user.save()
        return user         

class LoginSerializer(serializers.Serializer):
    email= serializers.EmailField()
    password= serializers.CharField()
    
    def validate(self,data):
        user= authenticate(**data)
        
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Credentials")  
           