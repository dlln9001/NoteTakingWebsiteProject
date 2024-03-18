from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Notes(models.Model):
    text = models.CharField(max_length=10000, default='')
    FK_notes_user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    name = models.CharField(max_length=100, default='Untitled')
    lastModified = models.DateField(auto_now=True)


class NotesImage(models.Model):
    FK_Image_Notes = models.ForeignKey(Notes, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/')