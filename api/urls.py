from django.urls import path, include
from . import views

app_name = 'api'


urlpatterns = [
    path('', views.get_notes, name='get-note'),
    path('<int:pk>/', views.get_note, name='get-note'),
    path('delete/<int:pk>/', views.delete_note, name='delete-note'),
    path('update/<int:pk>/', views.update_note, name='update-note'),
    path('create/', views.create_note, name='create-note'),
]
