from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Note, Task


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = 'id', 'text', 'formated_updated', '__str__', 'get_absolute_url'


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = 'id', 'text', 'formated_updated', 'reminder_time', '__str__', 'get_absolute_url'


class TokenSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        del data['refresh']
        return data
