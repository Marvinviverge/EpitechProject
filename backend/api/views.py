from api.models import User, Book

from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, BookSerializer

from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
import json

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
        user = request.user
        borrowed_books = Book.objects.filter(borrower=user)
        serialized_books = list(borrowed_books.values())
        return JsonResponse({'books': serialized_books})
    
    elif request.method == 'POST':
        text = "Hello buddy"
        response = f"L'API a répondu à une requête POST avec ce text: {text}"
        return Response({'response': response}, status=status.HTTP_200_OK)
    
    return Response({}, status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def library(request):
    available_books = Book.objects.filter(borrower="")
    serialized_books = list(available_books.values())
    return JsonResponse({'books': serialized_books})

@api_view(["PUT"])
def borrow_book(request, book_id):
    try:
        # Récupérer les données JSON envoyées dans le corps de la requête
        data = json.loads(request.body.decode('utf-8'))
        borrower = data.get('borrower')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    # Vérifier si les données requises sont présentes
    if not borrower:
        return JsonResponse({'error': 'Missing required parameters'}, status=400)

    # Rechercher le livre dans la base de données
    try:
        book = Book.objects.get(id=book_id)
    except Book.DoesNotExist:
        return JsonResponse({'error': 'Book not found'}, status=404)

    if borrower == 'delete':
        book.borrower = ''
        book.save()
    else:
        book.borrower = borrower
        book.save()

    # Répondre avec un message de succès
    return JsonResponse({'message': 'Book borrowed successfully'})

@api_view(['POST'])
def create_book(request):
    if request.method == 'POST':
        # Sérialiser les données envoyées dans la requête
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            # Appel à la méthode create personnalisée dans le sérialiseur
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)