from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import (
    Category, Region, CulturalObject, TouristRoute, RoutePoint, 
    Infrastructure, Master, Review, Booking, ContactMessage
)
from .serializers import (
    CategorySerializer, RegionSerializer,
    CulturalObjectSerializer, TouristRouteSerializer,
    RoutePointSerializer, InfrastructureSerializer,
    MasterSerializer, ReviewSerializer, BookingSerializer,
    ContactMessageSerializer
)

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class RegionViewSet(viewsets.ModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    permission_classes = [AllowAny]


class CulturalObjectViewSet(viewsets.ModelViewSet):
    queryset = CulturalObject.objects.select_related('category', 'region').prefetch_related('reviews').all()
    serializer_class = CulturalObjectSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'region']
    search_fields = ['title', 'title_ru', 'title_tj', 'description', 'location']
    ordering_fields = ['title', 'id']


class TouristRouteViewSet(viewsets.ModelViewSet):
    queryset = TouristRoute.objects.prefetch_related('points', 'objects_included').all()
    serializer_class = TouristRouteSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description']


class RoutePointViewSet(viewsets.ModelViewSet):
    queryset = RoutePoint.objects.select_related('route', 'cultural_object').all()
    serializer_class = RoutePointSerializer
    permission_classes = [AllowAny]


class InfrastructureViewSet(viewsets.ModelViewSet):
    queryset = Infrastructure.objects.select_related('region').all()
    serializer_class = InfrastructureSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['inf_type', 'region']
    search_fields = ['name', 'address']


class MasterViewSet(viewsets.ModelViewSet):
    queryset = Master.objects.all()
    serializer_class = MasterSerializer
    permission_classes = [AllowAny]


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.select_related('cultural_object').all()
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cultural_object']


from rest_framework import generics
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class UserView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        # Если пользователь авторизован, он видит свои бронирования
        # Если нет (для теста) - все (или пустой список)
        if self.request.user.is_authenticated:
            return Booking.objects.filter(email=self.request.user.email)
        return Booking.objects.all()
