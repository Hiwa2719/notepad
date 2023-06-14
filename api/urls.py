from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

app_name = 'api'

router = DefaultRouter()

router.register('', views.ItemsViewSet, basename='item')

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('signup/', views.SignUpView.as_view(), name='signup'),
    path('<str:model>/', include(router.urls)),
]
