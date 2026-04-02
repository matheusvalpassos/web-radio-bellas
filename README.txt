====================================================
RADIOBELLAS - PLATAFORMA DE RÁDIO CORPORATIVA (SAAS)
====================================================

O Radiobellas é um sistema SaaS B2B desenvolvido para centralizar, automatizar e sincronizar a sonorização e o marketing de áudio (Rádio Indoor) em múltiplas unidades físicas de franquias, supermercados e lojas da Rede Bellas.

----------------------------------------------------
1. O PROBLEMA QUE RESOLVEMOS
----------------------------------------------------
Substituímos pendrives, playlists manuais e conexões amadoras por um sistema de transmissão unificado. Através de um painel de controle (Centro de Comando), a diretoria consegue definir a grade musical, rodar anúncios globais e programar ofertas locais exclusivas para unidades específicas, garantindo que o áudio rode 24/7 sem intervenção dos funcionários.

----------------------------------------------------
2. FUNCIONALIDADES PRINCIPAIS (EM DESENVOLVIMENTO)
----------------------------------------------------
* Centro de Comando de Estações: Monitoramento em tempo real do status de transmissão de todas as unidades conectadas (Online/Offline/Sincronizando).
* Player & Equalizador Integrado: Feedback visual instantâneo do que está tocando nas pontas, com controles de mute e intervenção.
* Processamento de Áudio via YouTube: Inserção de músicas e áudios diretamente via links, processados no backend (yt-dlp e FFmpeg) com normalização de volume.
* Integração de Transmissão (AzuraCast): Conexão via API com servidor Icecast para streaming contínuo e sincronizado para operação em modo Kiosk.
* Interface Visual: Baseada na identidade da marca (Vermelho, Branco e Preto), com suporte a troca de temas dinâmicos.

----------------------------------------------------
3. TECNOLOGIAS UTILIZADAS
----------------------------------------------------
FRONTEND:
* ReactJS (criado com Vite)
* Tailwind CSS v4
* Lucide React & FontAwesome
* Zustand
* Axios

BACKEND:
* Python 3.x
* Django & Django REST Framework (DRF)
* SQLite (Dev) / PostgreSQL (Prod)
* yt-dlp
* Argon2id

----------------------------------------------------
4. COMO RODAR O PROJETO LOCALMENTE
----------------------------------------------------

PASSO 1: Clonando o repositório
> git clone https://github.com/matheusvalpassos/web-radio-bellas.git
> cd web-radio-bellas

PASSO 2: Configurando o Frontend (React)
> cd frontend
> npm install
> npm run dev
(Acesse o painel em http://localhost:5173)

PASSO 3: Configurando o Backend (Django)
Abra um novo terminal e volte para a raiz do projeto:
> cd backend
> python -m venv venv
> venv\Scripts\activate
> pip install django djangorestframework django-cors-headers yt-dlp requests
> python manage.py makemigrations
> python manage.py migrate
> python manage.py runserver
(A API estará disponível em http://localhost:8000)

Nota: É necessário ter o FFmpeg instalado na máquina local e adicionado às variáveis de ambiente (PATH) para o correto processamento de áudio.

----------------------------------------------------
5. DESENVOLVEDOR E ARQUITETO DE SOFTWARE
----------------------------------------------------
Matheus Valpassos
* Portfólio: https://matheusvalpassos.lovable.app
* GitHub: https://github.com/matheusvalpassos