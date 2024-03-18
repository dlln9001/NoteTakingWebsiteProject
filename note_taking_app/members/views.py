from django.shortcuts import render, HttpResponse
from django.template import loader
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

# Create your views here.
def loginpage(request):
    template = loader.get_template('loginpage.html')
    context = {

    }
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            context['success'] = 'Login Successful!'
        else:
            context['failed'] = 'Invalid Login'
    return HttpResponse(template.render(context, request))


def signuppage(request):
    template = loader.get_template('signuppage.html')
    context = {

    }
    if request.method == 'POST':
        newuser = User.objects.create_user(username=request.POST['username'], password=request.POST['password'])
        newuser.save()
        login(request, newuser)
        context['success'] = 'Signup Successful!'
    return HttpResponse(template.render(context, request))