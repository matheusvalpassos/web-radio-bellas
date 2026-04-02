import { create } from 'zustand';
import api from './api';

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,

    // Verificar se existe um usuário com a sessão atual
    checkAuth: async () => {
        try {
            set({ isLoading: true, error: null });
            const response = await api.get('/api/auth/user/');
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (_error) {
            set({ user: null, isAuthenticated: false, isLoading: false });
        }
    },

    // Login com username e password
    login: async (username, password) => {
        try {
            set({ isLoading: true, error: null });
            const response = await api.post('/api/auth/login/', { username, password });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return { success: true };
        } catch (error) {
            set({ 
                error: error.response?.data?.non_field_errors?.[0] || 'Falha ao realizar login.',
                isLoading: false 
            });
            return { success: false, error: 'Credenciais inválidas' };
        }
    },

    // Registro com username e password
    register: async (username, email, password) => {
        try {
            set({ isLoading: true, error: null });
            const response = await api.post('/api/auth/register/', { username, email, password });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return { success: true };
        } catch (error) {
            set({ 
                error: Object.values(error.response?.data || {})[0]?.[0] || 'Falha ao registrar.',
                isLoading: false 
            });
            return { success: false, error: 'Erro de validação' };
        }
    },

    // Logout limpa o cookie HttpOnly e o estado
    logout: async () => {
        try {
            await api.post('/api/auth/logout/');
            set({ user: null, isAuthenticated: false });
        } catch (error) {
            console.error("Erro ao fazer logout", error);
        }
    }
}));

export default useAuthStore;
