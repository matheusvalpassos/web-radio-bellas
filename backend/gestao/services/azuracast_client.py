import os
import requests
import logging

logger = logging.getLogger(__name__)

class AzuracastClient:
    """
    Cliente API para integração com os servidores AzuraCast (M2M).
    Documentação de Ref: Endpoint /api/station/{station_id}/...
    """

    def __init__(self):
        self.base_url = os.environ.get('AZURACAST_BASE_URL', 'http://localhost:8080/api')
        self.api_key = os.environ.get('AZURACAST_API_KEY', '')
        self.headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json'
        }

    def _request(self, method, endpoint, data=None):
        url = f"{self.base_url.rstrip('/')}/{endpoint.lstrip('/')}"
        
        # Modo fallback para impedir crashes no backend caso Azuracast não esteja logado
        if not self.api_key:
            logger.warning(f"[Mock AzuraCast] Requisitado {method} {url} sem chave de API instalada.")
            return True, {"message": "Mocado com sucesso"}

        try:
            if method.upper() == 'GET':
                response = requests.get(url, headers=self.headers, timeout=10)
            elif method.upper() == 'POST':
                response = requests.post(url, headers=self.headers, json=data, timeout=10)
            else:
                return False, {"error": "Método HTTP suportado apenas GET e POST"}

            response.raise_for_status()
            
            try:
                return True, response.json()
            except ValueError:
                return True, {"message": "Requisição despachada com sucesso (No JSON body)"}
                
        except requests.exceptions.RequestException as e:
            logger.error(f"Erro na integração Azuracast: {str(e)}")
            return False, {"error": str(e)}

    def play_spot(self, station_id, media_path):
        """
        Para inserir um áudio na fila da rádio:
        No AzuraCast, isto seria via Station Media endpoint, playlist ou requests.
        Utilizamos a abstração genérica /station/{station_id}/request
        """
        endpoint = f"station/{station_id}/request"
        payload = {
            "request_id": media_path # Precisará mapear para o ID interno da midia no Azuracast posteriormente
        }
        success, response = self._request('POST', endpoint, data=payload)
        return success, response

    def restart_broadcasting(self, station_id):
        """
        Exemplo: Força o reload do serviço de transmissão (Liquidsoap) da estação.
        """
        endpoint = f"station/{station_id}/restart"
        success, response = self._request('POST', endpoint)
        return success, response
