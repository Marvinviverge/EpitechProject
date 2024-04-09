from django.contrib import admin

from api.models import User, Book

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']

class BookAdmin(admin.ModelAdmin):
    list_display= ('title', 'author', 'condition', 'genre', 'borrower')
    search_fields= ['title']

admin.site.register(User, UserAdmin)
admin.site.register(Book, BookAdmin)