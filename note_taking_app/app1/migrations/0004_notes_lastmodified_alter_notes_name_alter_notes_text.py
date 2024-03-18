# Generated by Django 4.2.10 on 2024-03-01 05:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0003_notes_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='notes',
            name='lastModified',
            field=models.DateField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='notes',
            name='name',
            field=models.CharField(default='Untitled', max_length=100),
        ),
        migrations.AlterField(
            model_name='notes',
            name='text',
            field=models.CharField(default='', max_length=10000),
        ),
    ]