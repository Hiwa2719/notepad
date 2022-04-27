from django.contrib import admin
from .models import Note, Task


@admin.register(Note)
class NoteModelAdmin(admin.ModelAdmin):
    readonly_fields = 'updated', 'created'


@admin.register(Task)
class TaskModelAdmin(admin.ModelAdmin):
    # readonly_fields = 'note__updated', 'note__created'
    pass