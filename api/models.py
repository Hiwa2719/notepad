from django.db import models
from django.urls import reverse


class BaseAbstractModel(models.Model):
    text = models.TextField()
    updated = models.DateTimeField(auto_now=True, help_text='last updated date')
    created = models.DateTimeField(auto_now_add=True, help_text='created date')

    class Meta:
        abstract = True

    def __str__(self):
        title = self.text.split('\n')[0]
        if len(title) < 38:
            return title
        return self.text[:32] + ' ... .'

    def get_absolute_url(self):
        model = self.__class__.__name__.lower() + 's'
        return reverse('api:item-detail', kwargs={'model': model, 'pk': self.pk})

    def formated_updated(self):
        return self.updated.strftime('%x %X')


class Note(BaseAbstractModel):
    pass


class Task(BaseAbstractModel):
    reminder_time = models.DateTimeField()

    def formated_updated(self):
        return self.reminder_time.strftime('%x %X')
