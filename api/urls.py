from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    # path('', views.index, name="index"),
    path('items/', views.fetchItems, name="items"),
    path('items/<str:pk>/', views.fetchItem, name="items"),

]