from django.shortcuts import render, HttpResponse
from django.template import loader
from .models import Notes, NotesImage
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.shortcuts import redirect
from django.http import JsonResponse
from django.db.models.functions import Lower
from django.templatetags.static import static
import json
# Create your views here.


def home(request):
    template = loader.get_template('home.html')
    context = { 
        'noteobject': '',
    }
    if request.method == "POST": 
        if request.POST.get('create_note') == 'create': 
            notes = Notes(name=request.POST['notes'], FK_notes_user=request.user, text='')
            notes.save()
        if request.POST.get('logout') == 'logout':
            logout(request)
    if request.user.is_authenticated:
        context['username'] = request.user.username
        context['noteobject'] = Notes.objects.all().filter(FK_notes_user = request.user.id).order_by(Lower('name'))
    if request.POST.get('sortBy') == 'sortByTitle':
        context['noteobject'] = Notes.objects.filter(FK_notes_user=request.user.id).order_by(Lower('name'))
    elif request.POST.get('sortBy') == 'sortByDate':
        context['noteobject'] = Notes.objects.filter(FK_notes_user=request.user.id).order_by('lastModified').reverse()
    return HttpResponse(template.render(context, request))


def openednotes(request, noteid):
    note = Notes.objects.filter(id=noteid)
    note = note[0]
    template = loader.get_template('openednotes.html')
    if request.FILES:
        imageInstance = NotesImage(image=request.FILES['imageInput'], FK_Image_Notes=note)
        imageInstance.save()
        responseImageData = {
            "imageUrls": imageInstance.image.url,
        }
        return JsonResponse(responseImageData)
    context = {
        'noteobject': note,
        'status': '',
        'defaultImageUrl': static('serverImages/setImage.png')
    }
    if request.method == 'POST' and not request.FILES:
        decoded = request.body.decode('utf-8')
        # checks if XMLHTTP request has content
        if decoded and request.POST.get('delete_note') != 'delete':
            decoded = json.loads(decoded)
            if decoded.get('buttonPressed') == 'save':
                newcontents = decoded.get('value')
                noteTitle = decoded.get('titleValue')
                note.text = newcontents.strip()
                note.name = noteTitle.strip()
                context['notecontents'] = note
                context['status'] = 'saved!'
                note.save() 
                responseData = {
                    "noteText": note.text,
                    "noteTitle": note.name,
                }
                return JsonResponse(responseData)
        if request.POST.get('delete_note') == 'delete':
            notes = Notes.objects.filter(id=int(request.POST['xname']))
            notes.delete()
            return redirect('homepage')
        
    return HttpResponse(template.render(context, request))