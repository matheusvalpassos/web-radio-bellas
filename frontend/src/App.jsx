import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';

import Layout from './components/Layout';
import GerenciarAudios from './pages/GerenciarAudios';
import Dashboard from './pages/Dashboard';
import DashboardUnidades from './pages/DashboardUnidades';
import LandingPage from './pages/LandingPage';
import Unidades from './pages/Unidades';
import Configuracoes from './pages/Configuracoes';

// Componente Wrapper para Rotas Privadas (Proteção SPA)
function PrivateRoute({ children }) {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const isLoading = useAuthStore(state => state.isLoading);

    if (isLoading) return <div className="h-screen flex items-center justify-center font-bold">Verificando segurança...</div>;
    return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default function App() {
    const checkAuth = useAuthStore(state => state.checkAuth);

    // Identifica o acesso ao App e puxa dados da Fake Session / Cookies HTTP
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <BrowserRouter>
            <Routes>
                {/* Rota Única Pública */}
                <Route path="/" element={<LandingPage />} />

                {/* Rotas Privadas CMS */}
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <Layout>
                            <Dashboard />
                        </Layout>
                    </PrivateRoute>
                } />

                {/* Rotas Privadas CMS */}
                <Route path="/dashboardunidades" element={
                    <PrivateRoute>
                        <Layout>
                            <DashboardUnidades />
                        </Layout>
                    </PrivateRoute>
                } />

                <Route path="/audios" element={
                    <PrivateRoute>
                        <Layout>
                            <GerenciarAudios />
                        </Layout>
                    </PrivateRoute>
                } />

                <Route path="/unidades" element={
                    <PrivateRoute>
                        <Layout>
                            <Unidades />
                        </Layout>
                    </PrivateRoute>
                } />

                <Route path="/configuracoes" element={
                    <PrivateRoute>
                        <Layout>
                            <Configuracoes />
                        </Layout>
                    </PrivateRoute>
                } />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}