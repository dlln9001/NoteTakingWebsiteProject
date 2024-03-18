from django.urls import path
from . import views


urlpatterns = [
    path("", views.home, name='homepage'),
    path("notes/<int:noteid>/", views.openednotes, name='openednotes'),
]