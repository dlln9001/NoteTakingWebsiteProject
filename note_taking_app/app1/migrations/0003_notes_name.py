# Generated by Django 4.2.10 on 2024-02-26 02:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0002_notes_fk_notes_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='notes',
            name='name',
            field=models.CharField(default='', max_length=100),
        ),
    ]
