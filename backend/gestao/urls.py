from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UnidadeViewSet, AudioViewSet, SeoMetadataViewSet, LoginAPI, LogoutAPI, UserAPI, RegisterAPI

router = DefaultRouter()
router.register(r'unidades', UnidadeViewSet)
router.register(r'audios', AudioViewSet)
router.register(r'seo', SeoMetadataViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    
    # Rotas de Sessão (Authentication)
    path('api/auth/login/', LoginAPI.as_view(), name='auth_login'),
    path('api/auth/register/', RegisterAPI.as_view(), name='auth_register'),
    path('api/auth/logout/', LogoutAPI.as_view(), name='auth_logout'),
    path('api/auth/user/', UserAPI.as_view(), name='auth_user'),
    
    # Rotas Social Auth (Rede Social SSO - Google/Facebook)
    path('auth/', include('social_django.urls', namespace='social')),
]