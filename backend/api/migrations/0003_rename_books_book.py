# Generated by Django 5.0.2 on 2024-04-04 14:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_books'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Books',
            new_name='Book',
        ),
    ]
