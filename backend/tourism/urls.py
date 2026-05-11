from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'regions', views.RegionViewSet)
router.register(r'objects', views.CulturalObjectViewSet)
router.register(r'tours', views.TouristRouteViewSet)
router.register(r'route-points', views.RoutePointViewSet)
router.register(r'infrastructure', views.InfrastructureViewSet)
router.register(r'masters', views.MasterViewSet)
router.register(r'reviews', views.ReviewViewSet)
router.register(r'bookings', views.BookingViewSet)
router.register(r'contacts', views.ContactMessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
