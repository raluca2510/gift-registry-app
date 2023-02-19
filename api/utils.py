from rest_framework.response import Response
from rest_framework import status

from .models import *
from .serializers import *

# /items/ GET
def getItemsList(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)


# /items/ POST
def createItem(request):
    # Get requested data
    data = request.data
    
    # Get user who made the request
    user = User.objects.get(id=data['user'])
    
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