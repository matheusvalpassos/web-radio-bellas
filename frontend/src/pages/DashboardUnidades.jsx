import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSignal, faPowerOff, faVolumeUp, faVolumeMute,
    faHeadphones, faMusic, faWifi, faExclamationTriangle, faPlay
} from '@fortawesome/free-solid-svg-icons';

// Componente do Equalizador Animado
const Equalizer = ({ playing }) => {
    if (!playing) {
        return (
            <div className="flex items-end gap-[2px] h-6">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-1.5 bg-gray-300 dark:bg-gray-700 rounded-t-sm h-1"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex items-end gap-[2px] h-6">
            {[1, 2, 3, 4, 5].map(i => (
                <div
                    key={i}
                    className="w-1.5 bg-[#da0d22] rounded-t-sm"
                    style={{
                        height: `${Math.max(30, Math.random() * 100)}%`,
                        animation: `pulse ${Math.random() * 0.5 + 0.5}s infinite alternate`
                    }}
                ></div>
            ))}
        </div>
    );
};

export default function DashboardUnidades() {
    // Mock simulando as unidades conectadas
    const [unidades, setUnidades] = useState([
        { id: 1, nome: "Unidade Centro (Matriz)", status: "online", tocando: "AC/DC - Thunderstruck", tipo: "MUSICA", volume: 80, mutado: false },
        { id: 2, nome: "Unidade Norte", status: "online", tocando: "SPOT: Promoção Fim de Semana", tipo: "ANUNCIO", volume: 65, mutado: false },
        { id: 3, nome: "Unidade Sul", status: "offline", tocando: null, tipo: null, volume: 0, mutado: true },
        { id: 4, nome: "Unidade Leste", status: "online", tocando: "Linkin Park - Numb", tipo: "MUSICA", volume: 90, mutado: false },
        { id: 5, nome: "Unidade Shopping", status: "syncing", tocando: "Baixando grade...", tipo: "SISTEMA", volume: 50, mutado: false },
        { id: 6, nome: "Unidade Oeste", status: "online", tocando: "Mettalica - Enter Sandman", tipo: "MUSICA", volume: 75, mutado: false },
    ]);

    // Force re-render para o equalizador animar aleatoriamente
    const [, setTick] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setTick(t => t + 1), 400);
        return () => clearInterval(timer);
    }, []);

    const toggleMute = (id) => {
        setUnidades(unidades.map(u => u.id === id ? { ...u, mutado: !u.mutado } : u));
    };

    return (
        <div className="max-w-[1600px] mx-auto animate-fade-in">
            {/* Header da Página */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Monitor de Transmissão</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Supervisione o áudio de todas as unidades em tempo real.</p>
                </div>

                {/* Métricas Rápidas */}
                <div className="flex gap-3">
                    <div className="bg-white dark:bg-[#151515] border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-lg flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">4 Online</span>
                    </div>
                    <div className="bg-white dark:bg-[#151515] border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-lg flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">1 Offline</span>
                    </div>
                </div>
            </div>

            {/* Grid de Mini-Players */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {unidades.map((unidade) => (
                    <div
                        key={unidade.id}
                        className={`bg-white dark:bg-[#111] border rounded-2xl p-5 flex flex-col transition-all duration-300 relative overflow-hidden group
                            ${unidade.status === 'online' ? 'border-gray-200 dark:border-gray-800 hover:border-[#da0d22] dark:hover:border-[#da0d22] shadow-sm hover:shadow-[#da0d22]/10' :
                                unidade.status === 'syncing' ? 'border-yellow-500/50' : 'border-gray-200 dark:border-gray-800 opacity-70 grayscale'}`}
                    >
                        {/* Brilho de fundo no Dark Mode se estiver online */}
                        {unidade.status === 'online' && (
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#da0d22] rounded-full blur-[60px] opacity-0 group-hover:opacity-10 dark:opacity-5 dark:group-hover:opacity-20 transition-opacity pointer-events-none"></div>
                        )}

                        {/* Cabeçalho do Card */}
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border 
                                    ${unidade.status === 'online' ? 'bg-[#da0d22]/10 border-[#da0d22]/30 text-[#da0d22]' :
                                        unidade.status === 'syncing' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400'}`}
                                >
                                    <FontAwesomeIcon icon={unidade.status === 'online' ? faWifi : unidade.status === 'syncing' ? faSignal : faPowerOff} className={unidade.status === 'online' ? 'animate-pulse' : ''} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{unidade.nome}</h3>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className={`text-[10px] uppercase font-black tracking-wider
                                            ${unidade.status === 'online' ? 'text-green-600 dark:text-green-500' :
                                                unidade.status === 'syncing' ? 'text-yellow-600 dark:text-yellow-500' : 'text-gray-500'}`}
                                        >
                                            {unidade.status === 'online' ? 'Transmissão Ativa' : unidade.status === 'syncing' ? 'Sincronizando...' : 'Desconectado'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Botão de Monitoramento (Ouvir a unidade) */}
                            {unidade.status === 'online' && (
                                <button className="w-8 h-8 rounded-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-[#da0d22] dark:hover:text-[#da0d22] hover:border-[#da0d22] transition-colors flex items-center justify-center" title="Monitorar Áudio Local">
                                    <FontAwesomeIcon icon={faHeadphones} className="text-xs" />
                                </button>
                            )}
                        </div>

                        {/* Área do Player "Tocando Agora" */}
                        <div className="bg-gray-50 dark:bg-[#151515] rounded-xl p-4 border border-gray-100 dark:border-gray-800/60 mb-4 relative z-10 flex-1 flex flex-col justify-center">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    {unidade.status === 'online' ? 'No Ar' : 'Status'}
                                </span>
                                <Equalizer playing={unidade.status === 'online'} />
                            </div>

                            <div className="flex items-start gap-3">
                                {unidade.status === 'online' ? (
                                    <>
                                        <FontAwesomeIcon icon={unidade.tipo === 'MUSICA' ? faMusic : faPlay} className="text-[#da0d22] mt-1 text-sm" />
                                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-tight">
                                            {unidade.tocando}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-gray-400 mt-1 text-sm" />
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-500 italic">
                                            {unidade.tocando || "Sem sinal de áudio"}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Controles de Volume e Ações */}
                        <div className="flex items-center justify-between mt-auto pt-2 relative z-10 border-t border-gray-100 dark:border-gray-800/50">
                            <div className="flex items-center gap-3 flex-1">
                                <button
                                    onClick={() => toggleMute(unidade.id)}
                                    disabled={unidade.status !== 'online'}
                                    className={`text-sm ${unidade.mutado || unidade.status !== 'online' ? 'text-gray-400' : 'text-gray-600 dark:text-gray-300 hover:text-[#da0d22]'}`}
                                >
                                    <FontAwesomeIcon icon={unidade.mutado ? faVolumeMute : faVolumeUp} />
                                </button>

                                {/* Barra de Volume Mock */}
                                <div className="h-1.5 w-24 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${unidade.mutado ? 'bg-gray-400' : 'bg-[#da0d22]'}`}
                                        style={{ width: unidade.status === 'online' ? `${unidade.volume}%` : '0%' }}
                                    ></div>
                                </div>
                                <span className="text-xs font-bold text-gray-400 w-8">{unidade.status === 'online' && !unidade.mutado ? `${unidade.volume}%` : ''}</span>
                            </div>

                            <button
                                disabled={unidade.status !== 'online'}
                                className="text-[10px] uppercase font-black tracking-wider text-white bg-[#da0d22] hover:bg-red-700 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 px-3 py-1.5 rounded-md transition-colors"
                            >
                                Intervir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}