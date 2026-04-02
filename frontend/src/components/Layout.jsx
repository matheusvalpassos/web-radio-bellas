import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCube, faMusic, faUsers, faCog, faSignOutAlt,
    faPodcast, faHeadphones, faStar, faSun, faMoon,
    faGasPump
} from '@fortawesome/free-solid-svg-icons';
import { Toaster } from 'sonner';
import useAuthStore from '../store/authStore';

// Componente AdSpace Dinâmico para Variedade de Mídia
const AdSpace = ({ variant = 'banner' }) => {
    if (variant === 'sidebar') {
        return (
            <div className="bg-gradient-to-tr from-gray-50 to-gray-100 dark:from-[#151515] dark:to-[#1a1a1a] rounded-xl p-4 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center mt-6 w-full cursor-pointer hover:border-primary-brand transition-colors group">
                <div className="w-10 h-10 rounded-full bg-primary-brand/10 text-primary-brand flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <FontAwesomeIcon icon={faStar} />
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Mídia Local</span>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Anuncie seu produto na Rádio!</p>
            </div>
        );
    }

    // Default Horizontal Banner
    return (
        <div className="w-full bg-gradient-to-r from-[#121212] via-[#1a1a1a] to-primary-brand/20 dark:from-[#111] dark:to-primary-brand/30 rounded-2xl p-6 border border-gray-800 flex items-center justify-between mb-8 cursor-pointer hover:shadow-lg transition-shadow overflow-hidden relative">
            <div className="absolute right-0 top-0 w-64 h-64 bg-primary-brand rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-gray-700 flex items-center justify-center">
                    <FontAwesomeIcon icon={faPodcast} className="text-primary-brand text-xl animate-pulse" />
                </div>
                <div>
                    <h4 className="text-lg font-black text-white">Pacote Promocional Rádio Indoor</h4>
                    <p className="text-sm text-gray-400 font-medium">Contrate spots humanizados gravados com profissionais em até 48h.</p>
                </div>
            </div>
            <button className="bg-primary-brand text-white font-bold py-2 px-6 rounded-lg hover:bg-white hover:text-primary-brand transition-colors relative z-10 shadow-lg shadow-primary-brand/20">
                Saber Mais
            </button>
        </div>
    );
};

const SidebarItem = ({ icon, label, path, active }) => (
    <Link to={path} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${active ? 'bg-primary-brand border-primary-brand text-white shadow-md shadow-primary-brand/20' : 'border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 hover:border-gray-200 dark:hover:bg-gray-800 dark:hover:border-gray-700 hover:text-primary-brand'}`}>
        <FontAwesomeIcon icon={icon} className={`w-5 h-5 ${active ? 'text-white' : ''}`} />
        <span className="font-bold text-sm tracking-wide">{label}</span>
    </Link>
);

export default function Layout({ children }) {
    const location = useLocation();
    const logout = useAuthStore(state => state.logout);
    const user = useAuthStore(state => state.user);

    // Efeito para simular a mudança contínua de músicas da rádio
    const [tocandoAgora, setTocandoAgora] = useState("AC/DC - Thunderstruck");

    // Gerenciamento de Tema (Dark/Light)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return true; // Padrão
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    useEffect(() => {
        const musicas = [
            "AC/DC - Thunderstruck",
            "Linkin Park - Numb",
            "SPOT: Clube Fidelidade",
            "Mettalica - Enter Sandman",
            "SPOT: Promoção Troca de Óleo"
        ];
        let idx = 0;
        const interval = setInterval(() => {
            idx = (idx + 1) % musicas.length;
            setTocandoAgora(musicas[idx]);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-[#0a0a0a] font-sans transition-colors duration-300">
            <Toaster position="top-right" richColors />

            {/* Sidebar Fixa */}
            <aside className="w-72 bg-white dark:bg-[#111] border-r border-gray-200 dark:border-gray-800 flex flex-col fixed h-full z-20 shadow-sm overflow-hidden transition-colors duration-300">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-center bg-gray-50/50 dark:bg-black/20">
                    {/* Renderiza a logo de acordo com o tema atual */}
                    <img src={isDarkMode ? "src/assets/logo-light-horizontal.png" : "src/assets/logo-dark-horizontal.png"} alt="Rede Bellas" className="h-10 object-contain" />
                </div>

                <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 ml-2">Painel de Controle</span>
                    <SidebarItem path="/dashboard" icon={faCube} label="Dashboard" active={location.pathname === '/dashboard'} />
                    <SidebarItem path="/dashboardunidades" icon={faGasPump} label="Dashboard Unidades" active={location.pathname === '/dashboardunidades'} />
                    <SidebarItem path="/audios" icon={faMusic} label="Gerenciar Áudios" active={location.pathname === '/audios'} />
                    <SidebarItem path="/unidades" icon={faUsers} label="Postos da Rede" active={location.pathname === '/unidades'} />
                    <SidebarItem path="/configuracoes" icon={faCog} label="Ajustes e Perfil" active={location.pathname === '/configuracoes'} />

                    {/* Publicidade Integrada na Sidebar */}
                    <div className="mt-auto">
                        <AdSpace variant="sidebar" />
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-black/20">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 p-3 w-full rounded-xl cursor-pointer transition-all border border-transparent text-gray-600 dark:text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-500 font-bold text-sm tracking-wide"
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
                        Encerrar Sessão
                    </button>

                    {/* Mini Rodapé Matheus Valpassos */}
                    <div className="mt-4 pt-4 border-t border-gray-200/60 dark:border-gray-800/60 text-center">
                        <p className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1">Engenharia & Soluções</p>
                        <p className="text-xs font-semibold text-gray-500">Por <a href="https://matheusvalpassos.lovable.app" target="_blank" rel="noreferrer" className="text-primary-brand hover:underline">Matheus Valpassos</a></p>
                    </div>
                </div>
            </aside>

            {/* Conteúdo Principal */}
            <main className="flex-1 ml-72 flex flex-col">
                {/* Header Superior - Radio Status */}
                <header className="h-[76px] bg-white dark:bg-[#111] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 sticky top-0 z-10 shadow-xs transition-colors duration-300">

                    {/* Status da Rádio Oficial (Estoque) */}
                    <div className="flex items-center gap-4 bg-[#121212] px-5 py-2.5 rounded-full border border-gray-800 shadow-inner">
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-black tracking-wider text-gray-500">Transmissão Oficial (Macaé/Matriz)</span>
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faHeadphones} className="text-primary-brand text-xs" />
                                <span className="text-sm font-bold text-white truncate max-w-[200px] xl:max-w-[400px]">{tocandoAgora}</span>
                            </div>
                        </div>
                        {/* Visualizer Mock */}
                        <div className="flex items-end gap-[2px] h-4 ml-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="w-1 bg-primary-brand rounded-t-sm" style={{ height: `${Math.max(20, Math.random() * 100)}%`, animation: `pulse ${Math.random() * 1 + 0.5}s infinite alternate` }}></div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Toggle de Tema Dark/Light */}
                        <button
                            onClick={toggleTheme}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-primary-brand dark:hover:text-primary-brand transition-all shadow-sm"
                            title={isDarkMode ? "Mudar para tema claro" : "Mudar para tema escuro"}
                        >
                            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="text-lg" />
                        </button>

                        <div className="flex items-center gap-4 border-l border-gray-200 dark:border-gray-800 pl-6">
                            <div className="text-right">
                                <p className="text-xs text-gray-400 uppercase font-black tracking-wider">Diretoria</p>
                                <p className="text-sm font-bold text-gray-800 dark:text-white capitalize">{user?.username || 'Matheus'}</p>
                            </div>
                            <div className="w-11 h-11 bg-primary-brand/10 border-2 border-primary-brand rounded-full flex items-center justify-center text-primary-brand font-black shadow-lg shadow-primary-brand/20 cursor-pointer hover:bg-primary-brand hover:text-white transition-colors">
                                {user?.username ? user.username.charAt(0).toUpperCase() : 'M'}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-[1600px] mx-auto w-full">
                    {/* Banner Publicitário Fixo Global */}
                    <AdSpace variant="banner" />

                    {/* Página Interna Ativa */}
                    {children}
                </div>
            </main>
        </div>
    );
}