# gestao/admin.py
from django.contrib import admin
from django.conf import settings
from .models import Unidade, Audio
from .utils import processar_audio_youtube, enviar_para_azuracast
import os

admin.site.register(Unidade)

@admin.register(Audio)
class AudioAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'tipo', 'enviado_azuracast', 'data_criacao')
    list_filter = ('tipo', 'enviado_azuracast')
    
    def save_model(self, request, obj, form, change):
        # Impede que baixe de novo se você apenas editar o registro
        if not obj.pk or change is False: 
            # Define a pasta de destino dentro do MEDIA_ROOT
            output_dir = os.path.join(settings.MEDIA_ROOT, 'audios_processados')
            
            # Baixa o áudio
            resultado = processar_audio_youtube(obj.youtube_url, output_dir)
            
            obj.titulo = resultado['titulo']
            obj.arquivo_mp3.name = resultado['caminho_relativo']
            
            # Para o MVP: Vamos enviar para a primeira unidade cadastrada no banco como teste
            unidade_teste = Unidade.objects.first()
            if unidade_teste:
                sucesso = enviar_para_azuracast(resultado['caminho_absoluto'], unidade_teste.azuracast_station_id)
                obj.enviado_azuracast = sucesso

        super().save_model(request, obj, form, change)