from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser,PermissionsMixin)
# from django.contrib.auth.models import User
# from django.contrib.auth import get_user_model
# Usermodel=get_user_model()
from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
import datetime
import re
from PIL import Image
from math import floor
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys

# Create your models here.
class Category(models.Model):
    name= models.CharField( max_length=156,unique=True)
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
    
    def __str__(self):
        return  self.name
    
class MultiplePrice(models.Model):
    size= models.CharField( max_length=10)
    price= models.IntegerField()
    
    class Meta:
        verbose_name = 'MultiplePrice'
        verbose_name_plural = 'MultiplePrices'
    
    def __str__(self):
        return  f"size: {self.size},  price: {self.price}"


class Product(models.Model):
    category= models.ForeignKey(Category, related_name='category', on_delete=models.CASCADE)
    name =models.CharField(max_length=156)
    price= models.IntegerField()
    multiprice=models.ManyToManyField(MultiplePrice,default="none")
    brand=models.CharField(max_length=156)
    discription=models.TextField()
    image=models.ImageField()
    pub_date = models.DateTimeField(auto_now_add=True)
    # mod_date = models.DateTimeField(null=True)
    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        ordering = ['-pub_date']

    def __str__(self):
        return self.name
    
    def save(self, skip_md=True, *args, **kwargs):
        if skip_md:
            self.mod_date = datetime.datetime.now()

        if self.image:
            im = Image.open(self.image)
            width, height = im.size
            output = BytesIO()
            n = 0.5
            Width = floor(width * n)
            Height = floor(height * n)
            if width > 1000:
                im = im.resize((Width, Height))
                im.save(output, format='JPEG', quality=100)
                output.seek(0)
                self.image = InMemoryUploadedFile(output, 'ImageField', "%s.jpg" % self.image.name.split(
                    '.')[0], 'image/jpeg', sys.getsizeof(output), None)

        super().save(*args, **kwargs)  # Call the real save() method

@receiver(pre_save, sender=Product)
def delete_Product_image(sender, instance, *args, **kwargs):
    if instance.pk:
        product = Product.objects.get(pk=instance.pk)
        if product.image != instance.image:
            product.image.delete(False)


@receiver(post_delete, sender=Product)
def delete_Product_image(sender, instance, using, *args, **kwargs):
    if instance.image:
        instance.image.delete(save=False)


class UserManager(BaseUserManager):
    def create_user(self,email,first_name='null',last_name='null',
                     phone_number='null',address="null", password=None):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(email=self.normalize_email(email),phone_number=phone_number,
                           first_name=first_name,last_name=last_name,address=address)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, email, password):
        user = self.create_user(email,password=password,phone_number="null",first_name="SITE",last_name="CREATOR",)
        user.is_admin = True
        user.staff=True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser,PermissionsMixin):
    first_name =models.CharField(verbose_name='first name', max_length=255)
    last_name =models.CharField(verbose_name='last name', max_length=255)
    email = models.EmailField(verbose_name='email address',max_length=255,unique=True,)
    phone_number = models.CharField(verbose_name='phone number', max_length=30) 
    address=models.CharField(verbose_name='address', max_length=255, default="null")
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    staff=models.BooleanField(default=False)
    owner=models.BooleanField(default=False)
    # is_staff = models.BooleanField(default=False)
    # is_staffs = models.BooleanField(default=False)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['phone_number']
    
    def __str__(self):
        return f'{self.first_name} {self.last_name}'
    def has_perm(self, perm, obj=None):
        if not self.is_admin and self.staff:
            if perm =="backend.add_user" or perm=="backend.change_user" or perm=="backend.delete_user":
                return False
            else:
                return True
        else:
            return True
    def has_module_perms(self, app_label):
        if not self.is_admin and self.staff:
            if app_label =="knox" or app_label=="auth" :
                return False
            else:
                return True
        else:
            return True
    @property
    def is_staff(self):
        return self.staff
    
    
    
class Ordered(models.Model):
    OrderId=models.CharField(verbose_name='Order Id', max_length=50)
    customer=models.ForeignKey(User, verbose_name="customer", on_delete=models.CASCADE,related_name='customer')
    total=models.IntegerField(verbose_name="total",default=1)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.OrderId

    class Meta:
        managed = True
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'
        
        
class OrderedProduct(models.Model):
    name=models.CharField(verbose_name="name", max_length=156)
    brand=models.CharField(verbose_name="brand", max_length=156, default="null")
    quantity=models.IntegerField(verbose_name="quantity",default=0)
    price= models.IntegerField()
    size= models.CharField(max_length=50,blank=True, default="",null=True)
    purchaseId=models.ForeignKey(Ordered, verbose_name="purchase id", on_delete=models.CASCADE,related_name='purchaseId')
    product=models.ForeignKey(Product, verbose_name="product", on_delete=models.CASCADE,related_name='product')
    
    def __str__(self):
       return self.name

    class Meta:
        managed = True
        verbose_name = 'OrderedProduct'
        verbose_name_plural = 'OrderedProducts'