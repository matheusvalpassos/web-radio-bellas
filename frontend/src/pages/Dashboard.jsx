import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTowerBroadcast, faCheckCircle, faBan, faGasPump, faOilCan, faCoffee, faMusic, faClock, faPlayCircle, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../components/ui/button';

export default function DashboardUnidades() {
    const [unidades] = useState([
        { id: 1, nome: "Unidade Região Matriz (Piloto)", status: "online", tocando: "Linkin Park - Numb", tipo: "MUSICA", proximo: "Promoção Dia das Mães" },
        { id: 2, nome: "Unidade Búzios (Sem Óleo)", status: "offline", tocando: "-", tipo: "-", proximo: "-" },
        { id: 3, nome: "Unidade Macaé Dutra", status: "offline", tocando: "-", tipo: "-", proximo: "-" },
    ]);

    // Lógica para cor de status 
    const getStatusColor = (status) => {
        return status === 'online' ? 'bg-emerald-500' : 'bg-red-500';
    };

    return (
        <div className="flex-1 w-full flex flex-col md:w-3/4 max-w-[1200px] mx-auto p-4 md:p-8 animate-fade-in pb-20">

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-black text-[#121212] tracking-tight">Postos em Tempo Real</h2>
                    <p className="text-gray-500 font-medium">Controle de Unidades da Rede Bellas</p>
                </div>
                <Button className="bg-[#da0d22] hover:bg-black font-bold h-10 px-6 rounded-lg text-white shadow-lg transition-transform hover:scale-105 active:scale-95 duration-200">
                    <FontAwesomeIcon icon={faTowerBroadcast} className="mr-2" /> Synchro API
                </Button>
            </div>

            {/* FILEIRA DE KPIs DEMO */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {/* KPI 1 */}
                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Músicas Tocadas Hoje</p>
                        <h3 className="text-3xl font-black text-[#121212]">1.240</h3>
                        <p className="text-xs text-emerald-500 font-bold mt-1">+12% Playlist Urbana</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex justify-center items-center"><FontAwesomeIcon icon={faMusic} className="text-gray-400 text-xl" /></div>
                </div>

                {/* KPI 2 */}
                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Top Clube Fidelidade</p>
                        <h3 className="text-3xl font-black text-[#121212]">34 <span className="text-sm font-medium text-gray-400">Inserções</span></h3>
                        <p className="text-xs text-emerald-500 font-bold mt-1">Alta conversão orgânica</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex justify-center items-center"><FontAwesomeIcon icon={faTrophy} className="text-[#da0d22] text-lg" /></div>
                </div>

                {/* KPI 3 */}
                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Campanhas Alternadas</p>
                        <div className="flex items-center gap-3">
                            <FontAwesomeIcon icon={faCoffee} className="text-yellow-700 mt-2 text-xl opacity-80" />
                            <FontAwesomeIcon icon={faOilCan} className="text-blue-700 mt-2 text-xl opacity-80" />
                        </div>
                        <p className="text-xs text-gray-400 font-bold mt-2">Dinamismo em fila</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex justify-center items-center"><FontAwesomeIcon icon={faPlayCircle} className="text-gray-400 text-xl" /></div>
                </div>

                {/* KPI 4 */}
                <div className="bg-[#121212] rounded-2xl p-5 border border-gray-800 shadow-[0_10px_20px_-10px_rgba(218,13,34,0.4)] flex items-center justify-between relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#da0d22] blur-2xl opacity-40"></div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Status Rollout (Rede)</p>
                        <h3 className="text-3xl font-black text-white">1<span className="text-gray-600">/14</span></h3>
                        <p className="text-xs text-[#da0d22] font-bold mt-1">Expansão Fase 1</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex justify-center items-center border border-gray-800"><FontAwesomeIcon icon={faGasPump} className="text-white text-lg" /></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {unidades.map((unidade, index) => (
                    <div
                        key={unidade.id}
                        className="bg-[#ffffff] rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl hover:border-gray-300"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                                    <FontAwesomeIcon icon={faGasPump} className="text-[#121212]" />
                                </div>
                                <h3 className="font-bold text-lg text-[#121212] leading-tight max-w-[150px]">{unidade.nome}</h3>
                            </div>
                            <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 ${unidade.status === 'online' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                                <div className={`w-2 h-2 rounded-full ${getStatusColor(unidade.status)} ${unidade.status === 'online' ? 'animate-pulse' : ''}`}></div>
                                {unidade.status.toUpperCase()}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Tocando Agora</span>
                                <div className="text-sm font-semibold text-[#121212] flex items-center gap-2">
                                    {unidade.status === 'online' ? <FontAwesomeIcon icon={faPlayCircle} className="text-[#da0d22]" /> : <FontAwesomeIcon icon={faBan} className="text-gray-400" />}
                                    <span className="truncate">{unidade.tocando}</span>
                                </div>
                            </div>
                            <div className="p-4 bg-[#121212] rounded-xl border border-gray-800">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Próxima na Fila</span>
                                <div className="text-sm font-semibold text-white flex items-center gap-2">
                                    <FontAwesomeIcon icon={faClock} className="text-gray-500" />
                                    <span className="truncate">{unidade.proximo}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100 flex gap-2">
                            <Button className="flex-1 bg-white border-2 border-gray-200 text-[#121212] hover:bg-gray-50 hover:border-gray-300 font-bold transition-all shadow-none h-10">
                                Editar Grade
                            </Button>
                            <Button className="flex-none bg-[#da0d22]/10 text-[#da0d22] hover:bg-[#da0d22]/20 font-bold transition-colors w-10 p-0 shadow-none">
                                <FontAwesomeIcon icon={faBan} />
                            </Button>
                        </div>
                    </div>
                ))}

                {/* Bloco Adicionar Unidade (Mock) */}
                <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-6 flex flex-col justify-center items-center text-center hover:bg-gray-100 hover:border-[#da0d22]/30 transition-colors cursor-pointer min-h-[300px]">
                    <div className="w-16 h-16 bg-white rounded-full flex justify-center items-center mb-4 shadow-sm text-gray-400">
                        <FontAwesomeIcon icon={faGasPump} className="text-2xl" />
                    </div>
                    <h3 className="font-bold text-[#121212] text-lg mb-2">Expansão de Rede</h3>
                    <p className="text-gray-500 text-sm font-medium mb-4 max-w-[200px]">As próximas 5 unidades serão habilitadas no piloto Fase 2.</p>
                </div>

            </div>
        </div>
    );
}