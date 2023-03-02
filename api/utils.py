from rest_framework.response import Response
from rest_framework import status
import random
import string
from django.contrib.auth.hashers import make_password

from .models import *
from .serializers import *


####################### USERS ENDPOINTS ######################
# /users/ GET
def getUsersList(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)


# /users/ POST
def createUser(request):
    # Get requested data
    data = request.data
    
    # Get all usernames
    usernames = User.objects.values_list('username', flat=True)
    
    # Check if username valid
    if data['username'] in usernames:
        return Response({'detail': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Hash password
    password = make_password(data['password'])
    
    # Create new item with data
    user = User.objects.create(
        username = data['username'],
        password = password
    )
    
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


# /users/<id> GET
def getUser(request, pk):
    # Get requested user
    user = User.objects.get(id=pk)
        
    # Convert to JSON
    serializer = UserSerializer(user, many=False)
    
    # Send data
    return Response(serializer.data, status=status.HTTP_200_OK)


# /users/<id> PUT
def updateUser(request, pk):
    data = request.data
    
    user = request.user
        
    serializer = UserSerializer(instance=user, data=data, partial=True)
    # Ensure that the updated User is valid
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.data, status=status.HTTP_200_OK)


# /users/<id> DELETE
def deleteUser(request, pk):
    # Get requested User
    user = User.objects.get(id=pk)
    
    # Delete User
    user.delete()
    
    return Response({'User was deleted.'}, status=status.HTTP_200_OK)


####################### ITEMS ENDPOINTS ######################
# /items/ GET
def getItemsList(request):
    # user = request.user
    # items = user.user_items.all()
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)


# /items/ POST
def createItem(request):
    # Get requested data
    data = request.data
    
    # If there's no title, return
    if not data['title']:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Get user who made the request
    user = User.objects.get(id=request.user.id)
    
    # Get group
    group = Group.objects.get(id=data['group'])
    
    # Create new item with data
    item = Item.objects.create(
        title = data['title'],
        link = data['link'] if data['link'] else None,
        price = data['price'],
        description = data['description'],
        image = data['image'],
        user = user,
        group = group
    )
    
    serializer = ItemSerializer(item, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


# /items/<id> GET
def getItem(request, pk):
    # Get requested item
    item = Item.objects.get(id=pk)
    
    # Convert to JSON
    serializer = ItemSerializer(item, many=False)
    
    # Send data
    return Response(serializer.data, status=status.HTTP_200_OK)


# /items/<id> PUT
def updateItem(request, pk):
    data = request.data
    
    # Get requested item
    item = Item.objects.get(id=pk)
    
    # Update item and convert to JSON
    serializer = ItemSerializer(instance=item, data=data, partial=True)

    # Ensure that the updated item is valid
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.data, status=status.HTTP_200_OK)


# /items/<id> DELETE
def deleteItem(request, pk):
    # Get requested item
    item = Item.objects.get(id=pk)
    
    # Delete item
    item.delete()
    
    return Response({'Item was deleted.'}, status=status.HTTP_200_OK)


####################### GROUPS ENDPOINTS ######################
# /groups/ GET
def getGroupsList(request):
    # Get all groups
    groups = Group.objects.all()
    
    serializer = GroupSerializer(groups, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)


# /groups/ POST
def createGroup(request):
    # Get requested data
    data = request.data
    
    # If there's no title, return
    if not data['title']:
        return Response({'detail': 'Title is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if title already exists
    group_titles = Group.objects.values_list('title', flat=True)
    
    for group_title in group_titles:
        if data['title'].lower() == group_title.lower():
            return Response({'detail': 'Group name already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        
    # Get user who made the request
    admin = request.user
    
    # Generate random key of 6 digits
    source = string.digits
    key = ''.join((random.choice(source) for i in range(6)))
 
    # Create new group with data
    group = Group.objects.create(
        title = data['title'],
        admin = admin,
        key = key
    )
    
    group.users.set([admin])
    
    # Get JSON
    serializer = GroupSerializer(group, many=False)
    
    return Response(serializer.data, status=status.HTTP_200_OK)


# /groups/<id> GET
def getGroup(request, pk):
    # Get requested group
    group = Group.objects.get(id=pk)
    
    # Convert to JSON
    serializer = GroupSerializer(group, many=False)
    
    # Send data
    return Response(serializer.data, status=status.HTTP_200_OK)


# /groups/<id> PUT
def updateGroup(request, pk):
    data = request.data
    
    # Get requested group
    group = Group.objects.get(id=pk)
    
    # Update item and convert to JSON
    serializer = GroupSerializer(instance=group, data=data, partial=True)

    # Ensure that the updated group is valid
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.data, status=status.HTTP_200_OK)


# /groups/<id> DELETE
def deleteGroup(request, pk):
    # Get requested group
    group = Group.objects.get(id=pk)
    
    # Delete item
    group.delete()
    
    return Response({'Group was deleted.'}, status=status.HTTP_200_OK)