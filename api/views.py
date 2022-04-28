from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response

from .models import Note, Task
from .serializers import NoteSerializer, TaskSerializer

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

    def get_queryset(self):
        return self.model.objects.all()


class ItemsListView(CheckModelMixin, ListAPIView):
    def get_queryset(self):
        return self.model.objects.all().order_by('-updated')


class ItemRetrieveView(CheckModelMixin, RetrieveAPIView):
    pass


class ItemDeleteView(CheckModelMixin, DestroyAPIView):
    pass


class ItemCreateView(CheckModelMixin, CreateAPIView):
    pass


class ItemUpdateView(CheckModelMixin, UpdateAPIView):
    pass
