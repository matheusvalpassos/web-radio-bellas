from django.core.management.base import BaseCommand
import telebot
from django.conf import settings
from gestao.models import Audio
from gestao.utils import processar_audio_youtube
import os

class Command(BaseCommand):
    help = 'Inicia o Bot do Telegram para processar audios recebidos via link'

    def handle(self, *args, **kwargs):
        if not settings.TELEGRAM_BOT_TOKEN:
            self.stdout.write(self.style.ERROR("TELEGRAM_BOT_TOKEN não foi configurado."))
            return

        bot = telebot.TeleBot(settings.TELEGRAM_BOT_TOKEN)
        self.stdout.write(self.style.SUCCESS("Conectando e iniciando escuta no Telegram..."))

        @bot.message_handler(func=lambda msg: ('youtube.com' in msg.text or 'youtu.be' in msg.text))
        def handle_youtube_link(message):
            url = message.text.strip()
            
            # Aqui podemos filtrar pelo TELEGRAM_CHAT_ID se desejarmos ser super seguros:
            # if str(message.chat.id) != settings.TELEGRAM_CHAT_ID:
            #     bot.reply_to(message, "Você não tem permissão para adicionar músicas nesta rádio.")
            #     return

            bot.reply_to(message, "⏳ Baixando áudio e importando para a rádio...")
            
            try:
                # Criando na base de dados
                audio = Audio.objects.create(
                    youtube_url=url,
                    tipo='MUSICA'
                )
                output_dir = os.path.join(settings.MEDIA_ROOT, 'audios_processados')
                
                # Chamando o ytdlp sink
                resultado = processar_audio_youtube(url, output_dir)
                
                audio.titulo = resultado.get('titulo', 'Áudio sem título')
                audio.arquivo_mp3.name = resultado.get('caminho_relativo', '')
                audio.save()
                
                bot.reply_to(message, f"🎵 ✅ Sucesso! O áudio '{audio.titulo}' foi sincronizado e importado para a biblioteca e já está na fila global das unidades.")
            except Exception as e:
                bot.reply_to(message, f"❌ Ocorreu um erro ao baixar: {str(e)}")

        bot.infinity_polling()
