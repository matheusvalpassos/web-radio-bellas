# gestao/utils.py
import yt_dlp
import os
import requests
from django.conf import settings

def processar_audio_youtube(url, output_dir):
    """Baixa o áudio do YouTube e converte para MP3."""
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': os.path.join(output_dir, '%(title)s.%(ext)s'),
        'quiet': True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        filename = ydl.prepare_filename(info)
        # O postprocessor muda a extensão para .mp3
        mp3_filename = filename.rsplit('.', 1)[0] + '.mp3'
        
        return {
            'caminho_absoluto': mp3_filename,
            'caminho_relativo': os.path.relpath(mp3_filename, settings.MEDIA_ROOT),
            'titulo': info.get('title', 'Audio Desconhecido')
        }

def enviar_para_azuracast(caminho_arquivo, station_id):
    """Envia o MP3 via POST para a API do AzuraCast."""
    
    # Substitua pelas suas credenciais geradas no painel do AzuraCast local
    AZURACAST_URL = "http://localhost:8000" # URL do seu docker
    API_KEY = "chave_falsa"
    
    endpoint = f"{AZURACAST_URL}/api/station/{station_id}/files"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        # O AzuraCast mapeia a pasta base se deixado vazio, ou você pode especificar um diretório
    }
    
    try:
        with open(caminho_arquivo, 'rb') as file:
            files = {'file': file}
            response = requests.post(endpoint, headers=headers, files=files)
            
            if response.status_code == 200:
                print("Enviado com sucesso para o AzuraCast!")
                return True
            else:
                print(f"Erro no envio: {response.text}")
                return False
    except Exception as e:
        print(f"Erro de conexão: {e}")
        return False