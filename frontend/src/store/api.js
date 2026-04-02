import axios from 'axios';

// Configuração base protegida para evitar manipulação de sessões e CSRF
const api = axios.create({
    baseURL: 'http://localhost:8000', // Adaptável para env
    withCredentials: true, // Crucial para o envio dos Cookies HttpOnly (Sessão) e Lax (CSRF)
});

// Interceptor para pegar o csrftoken dos cookies quando necessário para requisições não seguras (POST, PUT, DELETE)
api.interceptors.request.use(config => {
    // Busca o valor do cookie csrftoken
    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // O nome esperado da cookie pelo Django padrão é 'csrftoken'
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };
    
    // Se o método for POST/PUT/DELETE, inserir o csrftoken no header X-CSRFToken
    if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
        const csrftoken = getCookie('csrftoken');
        if (csrftoken) {
            config.headers['X-CSRFToken'] = csrftoken;
        }
    }
    return config;
});

export default api;
