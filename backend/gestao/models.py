from django.db import models
from django.contrib.auth.models import User
import os

class Unidade(models.Model):
    nome = models.CharField(max_length=100)
    # Esse ID você pegará no painel do AzuraCast quando criar a estação
    azuracast_station_id = models.IntegerField(verbose_name="ID da Estação no AzuraCast")

    def __str__(self):
        return self.nome

class Audio(models.Model):
    TIPO_CHOICES = [
        ('MUSICA', 'Música (Toca em todas)'),
        ('ANUNCIO_GLOBAL', 'Anúncio Global (Toca em todas)'),
        ('ANUNCIO_LOCAL', 'Anúncio Local (Toca em selecionadas)'),
    ]
    
    titulo = models.CharField(max_length=200, blank=True, help_text="Será preenchido automaticamente pelo YouTube se deixado em branco.")
    youtube_url = models.URLField(verbose_name="Link do YouTube")
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES, default='MUSICA')
    unidades = models.ManyToManyField(Unidade, blank=True, help_text="Selecione as unidades APENAS se for um Anúncio Local.")
    
    arquivo_mp3 = models.FileField(upload_to='audios_processados/', blank=True, null=True)
    enviado_azuracast = models.BooleanField(default=False)
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo or self.youtube_url

class UserProfile(models.Model):
    """
    Extensão do modelo User padrão para armazenar metadados específicos e prevenir excesso no payload.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar_url = models.URLField(blank=True, null=True, verbose_name="URL do Avatar")
    # Adicione mais campos sensíveis aqui, não expostos diretamente no frontend.

    def __str__(self):
        return self.user.username

class SeoMetadata(models.Model):
    """
    Gestão de SEO e Open Graph Tags dinâmica gerenciável pelo CMS.
    """
    page_identifier = models.CharField(max_length=50, unique=True, help_text="Ex: 'landing_page', 'dashboard'")
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    og_image = models.URLField(blank=True, verbose_name="Imagem Open Graph (URL)")
    twitter_card = models.CharField(max_length=50, default='summary_large_image')
    keywords = models.CharField(max_length=255, blank=True, help_text="Separadas por vírgula")
    
    def __str__(self):
        return f"SEO: {self.page_identifier}"