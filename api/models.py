from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator

# Create your models here.
class User(AbstractUser):
    pass
    
    
class Group(models.Model):
    # User input field
    title = models.CharField(max_length=60, blank=False, null=False, unique=True) #required
    
    # Generated at creation fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    admin = models.ForeignKey("User", on_delete=models.CASCADE, related_name="admin_groups")
    key = models.CharField(max_length=6, validators=[MinLengthValidator(6)])
    users = models.ManyToManyField("User", blank=True, related_name="user_groups") # admin will be added at creation
    
    def __str__(self):
        return f"Group: {self.title} by {self.admin}"
    
class Item(models.Model):
    # User input fields
    title = models.CharField(max_length=120,blank=False, null=False) # required
    link = models.URLField(blank=True, null=True)
    price = models.CharField(max_length=10, blank=True, null=True)
    description = models.TextField(max_length=250, blank=True, null=True)
    image = models.URLField(blank=True, null=True)
    
    
    # Generated at creation fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_items")
    group = models.ForeignKey("Group", on_delete=models.CASCADE, related_name="group_items")
    
    def __str__(self):
        return f"Item: {self.title} by {self.user}"