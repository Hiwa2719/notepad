from django.db import models
from django.urls import reverse


class Note(models.Model):
    text = models.TextField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text[:55]

    def get_absolute_url(self):
        return reverse('api:get-note', kwargs={'pk': self.pk})
