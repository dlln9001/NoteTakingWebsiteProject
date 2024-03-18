from django.urls import path, include
from . import views


urlpatterns = [
    path('login/', views.loginpage, name='loginpage'),
    path('signup/', views.signuppage, name='signuppage'),
]