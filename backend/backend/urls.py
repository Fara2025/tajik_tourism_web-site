"""
URL configuration for backend project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from tourism.views import RegisterView, UserView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tourism.urls')),
    
    # Auth
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/register/', RegisterView.as_view(), name='auth_register'),
    path('api/auth/me/', UserView.as_view(), name='auth_me'),

    # Документация API
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

# Отдача медиафайлов (в разработке и на PythonAnywhere)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
