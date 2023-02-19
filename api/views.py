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
    ]
    return Response(routes)

# Fetch items
@api_view(['GET', 'POST'])
def fetchItems(request):

    if request.method == 'GET':
        print(getItemsList(request))
        return getItemsList(request)


