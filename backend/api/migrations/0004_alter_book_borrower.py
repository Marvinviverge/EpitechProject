# Generated by Django 5.0.2 on 2024-04-04 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_books_book'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='borrower',
            field=models.CharField(blank=True, default='', max_length=200),
        ),
    ]
