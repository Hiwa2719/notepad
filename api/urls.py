from django.urls import path, include
from . import views

app_name = 'api'


urlpatterns = [
    path('<str:model>/', include([
        path('', views.ItemsListView.as_view(), name='get-note'),
        path('<int:pk>/', views.ItemRetrieveView.as_view(), name='get-note'),
        path('delete/<int:pk>/', views.ItemDeleteView.as_view(), name='delete-note'),
        path('update/<int:pk>/', views.ItemUpdateView.as_view(), name='update-note'),
        path('create/', views.ItemCreateView.as_view(), name='create-note'),
    ])),
]
