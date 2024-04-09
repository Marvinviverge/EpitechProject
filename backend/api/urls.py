from django.urls import path
from . import views

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('library/', views.library, name='library'),
    path('library/<int:book_id>/', views.borrow_book, name='borrow_book'),
    path('create_book/', views.create_book, name='create_book'),

]