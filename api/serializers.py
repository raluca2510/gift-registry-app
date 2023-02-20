from rest_framework.serializers import ModelSerializer
from .models import *

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())],
            min_length=5,
            max_length=20
            ),
    password = serializers.CharField(
            required=True,
            max_length=256
            )
    class Meta:
        model = User
        fields = '__all__'
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user
        
class ItemSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'
        