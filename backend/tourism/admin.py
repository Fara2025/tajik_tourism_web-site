from django.contrib import admin
from .models import (
    Category, Region, CulturalObject, TouristRoute, RoutePoint, 
    Infrastructure, Master, Review, Booking, ContactMessage
)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'is_read')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'name_ru', 'name_tj')
    search_fields = ('name',)


@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    list_display = ('name', 'name_ru', 'name_tj')
    search_fields = ('name',)


class RoutePointInline(admin.TabularInline):
    model = RoutePoint
    extra = 1


@admin.register(CulturalObject)
class CulturalObjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'region', 'location')
    list_filter = ('category', 'region')
    search_fields = ('title', 'description', 'location')


@admin.register(TouristRoute)
class TouristRouteAdmin(admin.ModelAdmin):
    list_display = ('title', 'duration', 'price')
    search_fields = ('title',)
    inlines = [RoutePointInline]


@admin.register(Infrastructure)
class InfrastructureAdmin(admin.ModelAdmin):
    list_display = ('name', 'inf_type', 'region', 'address', 'phone')
    list_filter = ('inf_type', 'region')
    search_fields = ('name', 'address')


@admin.register(Master)
class MasterAdmin(admin.ModelAdmin):
    list_display = ('name', 'specialty', 'contact')
    search_fields = ('name', 'specialty')


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('author_name', 'cultural_object', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('author_name', 'text')
@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('customer_name', 'service_name', 'service_type', 'status', 'created_at')
    list_filter = ('service_type', 'status', 'created_at')
    search_fields = ('customer_name', 'customer_email', 'service_name')
    readonly_fields = ('created_at',)
