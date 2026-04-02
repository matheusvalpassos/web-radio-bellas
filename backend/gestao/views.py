from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import login, logout
from .models import Unidade, Audio, SeoMetadata
from .serializers import UnidadeSerializer, AudioSerializer, UserSerializer, LoginSerializer, SeoMetadataSerializer, RegisterSerializer
from .utils import processar_audio_youtube
from django.conf import settings
import os

class UnidadeViewSet(viewsets.ModelViewSet):
    queryset = Unidade.objects.all()
    serializer_class = UnidadeSerializer

class AudioViewSet(viewsets.ModelViewSet):
    queryset = Audio.objects.all()
    serializer_class = AudioSerializer

    def perform_create(self, serializer):
        # Aqui interceptamos a criação feita pelo React
        audio_instance = serializer.save()
        
        output_dir = os.path.join(settings.MEDIA_ROOT, 'audios_processados')
        
        # Chama a função do yt-dlp
        resultado = processar_audio_youtube(audio_instance.youtube_url, output_dir)
        
        # Atualiza o objeto com os dados baixados
        audio_instance.titulo = resultado['titulo']
        audio_instance.arquivo_mp3.name = resultado['caminho_relativo']

        # Dispara injeção da mídia nas estações alvo usando a API Azuracast
        from .services.azuracast_client import AzuracastClient
        az_client = AzuracastClient()

        unidades_alvo = audio_instance.unidades.all()
        if audio_instance.tipo == 'MUSICA' or audio_instance.tipo == 'ANUNCIO_GLOBAL':
            unidades_alvo = Unidade.objects.all()

        for unidade in unidades_alvo:
            if unidade.azuracast_station_id:
                sucesso, _ = az_client.play_spot(unidade.azuracast_station_id, audio_instance.arquivo_mp3.name)
                if sucesso:
                    audio_instance.enviado_azuracast = True

        audio_instance.save()

# ==========================================
# GESTÃO DE USUÁRIOS E SEGURANÇA (SSO / SESSIONS)
# ==========================================

class LoginAPI(APIView):
    """ View de Login, usa Sessão para emitir um Cookie HttpOnly para proteger contra XSS """
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        # O login emite nativamente os cookies sessionid e csrftoken (HttpOnly e Lax configurados)
        login(request, user)
        return Response({
            "user": UserSerializer(user).data
        })

class LogoutAPI(APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserAPI(APIView):
    """ Rota para retornar o usuário logado com base no Cookie enviado via Credenciais Axios """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response({
            "user": UserSerializer(request.user).data
        })

class RegisterAPI(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # Autentica imediatamente e registra a sessão com cookie HttpOnly!
        login(request, user)
        return Response({
            "user": UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)

# ==========================================
# SEO & OPEN GRAPH
# ==========================================

class SeoMetadataViewSet(viewsets.ModelViewSet):
    """ Configurações de SEO gerenciáveis pelo painel administrativo """
    queryset = SeoMetadata.objects.all()
    serializer_class = SeoMetadataSerializer
    # Leitura livre para o website consumindo a API, modificação requer Auth
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]