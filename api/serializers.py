from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = 'id', 'text', 'formated_updated', '__str__', 'get_absolute_url'
