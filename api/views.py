from django.contrib.auth.forms import UserCreationForm
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenViewBase

from .models import Note, Task
from .serializers import NoteSerializer, TaskSerializer, TokenSerializer

MODELS = {
    'notes': Note,
    'tasks': Task
}

SERIALIZERS = {
    'notes': NoteSerializer,
    'tasks': TaskSerializer
}


class CheckModelMixin:
    """This mixin checks whether this model name in url is matched with MODELS
    also it creates self.model self.order_by_string self.serializer_class
    """

    def dispatch(self, request, *args, **kwargs):
        model = kwargs.get('model')
        if model not in MODELS:
            self.headers = self.default_response_headers
            response = Response(status=status.HTTP_404_NOT_FOUND)
            return self.finalize_response(request, response, *args, **kwargs)
        self.model = MODELS[model]
        self.serializer_class = SERIALIZERS[model]
        return super().dispatch(request, *args, **kwargs)


class ItemsListView(CheckModelMixin, ListAPIView):
    def get_queryset(self):
        return self.model.objects.all().order_by('-updated')


class ItemsViewSet(CheckModelMixin, ModelViewSet):
    """this view serves both notes and tasks"""

    def get_queryset(self):
        queryset = self.model.objects.all()
        if self.action == 'list':
            return queryset.order_by('-updated')
        return queryset


class LoginView(TokenViewBase):
    serializer_class = TokenSerializer


class SignUpView(APIView):
    def post(self, request, *args, **kwargs):
        form = UserCreationForm(request.data)
        if form.is_valid():
            form.save()
            return Response(status=status.HTTP_200_OK)
        return Response(form.errors, status.HTTP_406_NOT_ACCEPTABLE)
