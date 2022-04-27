from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
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

ORDER_BY = {
    'notes': '-updated',
    'tasks': '-note__updated'
}


class CheckModelMixin:
    """This mixin checks whether this model name in url is matched with MODELS"""
    def dispatch(self, request, *args, **kwargs):
        model = kwargs.get('model')
        if model not in MODELS:
            return Response(status=status.HTTP_404_NOT_FOUND)
        self.model = MODELS[model]
        self.order_by_string = ORDER_BY[model]
        self.serializer_class = SERIALIZERS[model]
        return super().dispatch(request, *args, **kwargs)


class ItemsListView(CheckModelMixin, ListAPIView):
    def get_queryset(self):
        return self.model.objects.all().order_by(self.order_by_string)


@api_view()
def get_notes(request):
    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view()
def get_note(request, pk):
    note = Note.objects.get(pk=pk)
    serializer = NoteSerializer(note)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_note(request, pk):
    note = Note.objects.get(pk=pk)
    note.delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def create_note(request):
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_note(request, pk):
    note = Note.objects.get(pk=pk)
    serializer = NoteSerializer(note, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)
