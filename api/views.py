from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

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
            'description': 'Creates new item with data sent in post request'
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
            'description': 'Creates an existing item with data sent in put request'
        },
        {
            'Endpoint': '/items/id',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting item'
        },
        {
            'Endpoint': '/groups/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of groups'
        },
        {
            'Endpoint': '/groups/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new group with data sent in post request'
        },
        {
            'Endpoint': '/groups/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single group object'
        },
        {
            'Endpoint': '/groups/id',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing group with data sent in put request'
        },
        {
            'Endpoint': '/groups/id',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting group'
        },
        {
            'Endpoint': '/users/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of users'
        },
        {
            'Endpoint': '/users/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new user with data sent in post request'
        },
        {
            'Endpoint': '/users/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single user object'
        },
        {
            'Endpoint': '/users/id',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing user with data sent in put request'
        },
        {
            'Endpoint': '/users/id',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting user'
        },
    ]
    return Response(routes)

# Fetch items
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def fetchItems(request):

    if request.method == 'GET':
        return getItemsList(request)
    
    if request.method == 'POST':
        return createItem(request)
    
# Fetch item
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def fetchItem(request, pk):

    if request.method == 'GET':
        return getItem(request, pk)

    if request.method == 'PUT':
        return updateItem(request, pk)

    if request.method == 'DELETE':
        return deleteItem(request, pk)

# Fetch groups
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def fetchGroups(request):

    if request.method == 'GET':
        return getGroupsList(request)
    
    if request.method == 'POST':
        return createGroup(request)

# Fetch group
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def fetchGroup(request, pk):

    if request.method == 'GET':
        return getGroup(request, pk)

    if request.method == 'PUT':
        return updateGroup(request, pk)

    if request.method == 'DELETE':
        return deleteGroup(request, pk)
    
    
# Fetch users
@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def fetchUsers(request):

    if request.method == 'GET':
        return getUsersList(request)
    
    if request.method == 'POST':
        return createUser(request)

# Fetch user
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def fetchUser(request, pk):

    if request.method == 'GET':
        return getUser(request, pk)

    if request.method == 'PUT':
        return updateUser(request, pk)

    if request.method == 'DELETE':
        return deleteUser(request, pk)