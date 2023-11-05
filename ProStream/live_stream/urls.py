

from django.urls import path 

from . import views  

urlpatterns = [
        path('category-crud/api/', views.CategoryCRUDAPI.as_view(), name='category_crud'), 
]