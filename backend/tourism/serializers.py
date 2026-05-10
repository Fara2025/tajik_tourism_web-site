from rest_framework import serializers
from .models import (
    Category, Region, CulturalObject, TouristRoute, RoutePoint, 
    Infrastructure, Master, Review, Booking, ContactMessage
)


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class CulturalObjectSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    region_name = serializers.CharField(source='region.name', read_only=True, default='')
    reviews = ReviewSerializer(many=True, read_only=True)
    reviews_count = serializers.IntegerField(source='reviews.count', read_only=True)

    class Meta:
        model = CulturalObject
        fields = '__all__'


class RoutePointSerializer(serializers.ModelSerializer):
    object_title = serializers.CharField(source='cultural_object.title', read_only=True)

    class Meta:
        model = RoutePoint
        fields = '__all__'


class TouristRouteSerializer(serializers.ModelSerializer):
    points = RoutePointSerializer(many=True, read_only=True)
    objects_count = serializers.IntegerField(source='objects_included.count', read_only=True)

    class Meta:
        model = TouristRoute
        fields = '__all__'


class InfrastructureSerializer(serializers.ModelSerializer):
    region_name = serializers.CharField(source='region.name', read_only=True, default='')
    type_display = serializers.CharField(source='get_inf_type_display', read_only=True)

    class Meta:
        model = Infrastructure
        fields = '__all__'


class MasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Master
        fields = '__all__'


from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
