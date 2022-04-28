from django.contrib import admin
from .models import Note, Task


@admin.register(Note, Task)
class NoteModelAdmin(admin.ModelAdmin):
    readonly_fields = 'updated', 'created'
