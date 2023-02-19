from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .utils import *
from .serializers import *

# Create your views here.

# Overview of api endpoints
@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/items/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of items'
        },
        {
            'Endpoint': '/items/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/items/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single item object'
        },
        {
            'Endpoint': '/items/id',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing item with data sent in post request'
        },
        {
            'Endpoint': '/items/id',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting item'
        },
    ]
    return Response(routes)

# Fetch items
@api_view(['GET', 'POST'])
def fetchItems(request):

    if request.method == 'GET':
        return getItemsList(request)
    
    if request.method == 'POST':
        return createItem(request)
    
# Fetch item
@api_view(['GET', 'PUT', 'DELETE'])
def fetchItem(request, pk):

    if request.method == 'GET':
        return getItem(request, pk)

    if request.method == 'PUT':
        return updateItem(request, pk)

    if request.method == 'DELETE':
        return deleteItem(request, pk)


# def index(request):
#     return render(request, 'api/index.html', {
#         'form': ItemForm()
#     })