from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),

    # Items
    path('items/', views.fetchItems, name="items"),
    path('items/<str:pk>/', views.fetchItem, name="items"),
    
    # Groups
    path('groups/', views.fetchGroups, name="groups"),
    path('groups/<str:pk>/', views.fetchGroup, name="groups"),

]