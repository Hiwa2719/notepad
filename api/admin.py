from django.contrib import admin
from .models import Note


@admin.register(Note)
class NoteModelAdmin(admin.ModelAdmin):
    readonly_fields = 'updated', 'created'
