from django.db import models
from django.urls import reverse


class Note(models.Model):
    text = models.TextField()
    updated = models.DateTimeField(auto_now=True, help_text='last updated date')
    created = models.DateTimeField(auto_now_add=True, help_text='created date')

    def __str__(self):
        title = self.text.split('\n')[0]
        if len(title) < 38:
            return title
        return self.text[:32] + ' ... .'

    def get_absolute_url(self):
        return reverse('api:get-note', kwargs={'pk': self.pk})

    def formated_updated(self):
        return self.updated.strftime('%x %X')
