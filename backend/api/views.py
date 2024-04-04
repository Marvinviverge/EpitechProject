from api.models import User, Book

from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer

from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated

from django.http import JsonResponse, HttpResponse


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    if request.method == 'GET':
        response = f"Bravo {request.user}, l'API a répondu à ta requête GET"
        return Response({'response': response}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        response = f"L'API a répondu à une requête POST avec ce text: {text}"
        return Response({'response': response}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def library(request):
    all_books = Book.objects.all().values()
    return JsonResponse({'message': list(all_books)})