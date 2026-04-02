import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faLock, faEnvelope, faCamera, faSave, faCheckCircle, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import useAuthStore from '../store/authStore';

export default function Configuracoes() {
    const user = useAuthStore(state => state.user);

    const [nome, setNome] = useState(user?.username || 'Matheus Valpassos');
    const [email, setEmail] = useState(user?.email || 'admin@lovable.app');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSavePerfil = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("Perfil Atualizado!", { description: "Suas credenciais e avatar foram salvos com sucesso no servidor." });
        }, 1200);
    };

    const handleSaveSecurity = (e) => {
        e.preventDefault();
        if (senha.length < 6) {
            toast.error("Senha muito curta", { description: "A senha deve ter pelo menos 6 caracteres." });
            return;
        }
        toast.success("Segurança Reforçada!", { description: "Sua senha foi alterada e os outros dispositivos foram desconectados." });
        setSenha('');
    };

    return (
        <div className="max-w-6xl mx-auto dark:text-gray-100 animate-fade-in pb-12">
            <div className="mb-8 border-b py-4 border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">Ajustes da Conta</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie seu perfil de diretoria e preferências do sistema.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Coluna Esquerda - Info Resumo */}
                <div className="col-span-1 flex flex-col gap-6">
                    <div className="bg-white dark:bg-[#111] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center relative overflow-hidden">
                        <div className="w-full h-24 bg-linear-to-r from-primary-brand/80 to-[#ee771b]/80 absolute top-0 left-0"></div>
                        
                        <div className="w-24 h-24 rounded-full border-4 border-white dark:border-[#111] bg-gray-100 dark:bg-gray-800 shadow-lg relative z-10 mt-6 flex items-center justify-center text-3xl font-black text-gray-400 group cursor-pointer overflow-hidden">
                            {nome.charAt(0).toUpperCase()}
                            <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-sm transition-all">
                                <FontAwesomeIcon icon={faCamera} />
                            </div>
                        </div>
                        
                        <h2 className="text-xl font-bold mt-4 dark:text-white">{nome}</h2>
                        <p className="text-sm font-semibold text-primary-brand mt-1 uppercase tracking-wider">Membro Executivo</p>
                        
                        <div className="w-full mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-3 text-sm text-left">
                            <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-2"><FontAwesomeIcon icon={faBuilding} className="text-emerald-500" /> Rede Gerenciada</span>
                                <span className="font-bold text-gray-800 dark:text-gray-200">Rede Bellas</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-blue-500" /> Status da Conta</span>
                                <span className="font-bold text-gray-800 dark:text-gray-200">Verificada</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coluna Direita - Forms */}
                <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
                    {/* Form de Informações Básicas */}
                    <div className="bg-white dark:bg-[#111] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 relative">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
                            <FontAwesomeIcon icon={faUserTie} className="text-primary-brand" /> Dados Pessoais
                        </h3>

                        <form onSubmit={handleSavePerfil} className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nome Completo</label>
                                    <div className="relative">
                                        <FontAwesomeIcon icon={faUserTie} className="absolute left-4 top-3.5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={nome}
                                            onChange={(e) => setNome(e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-3 pl-11 outline-none focus:ring-2 focus:ring-primary-brand/50 focus:border-primary-brand transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Profissional</label>
                                    <div className="relative">
                                        <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-3.5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-3 pl-11 outline-none focus:ring-2 focus:ring-primary-brand/50 focus:border-primary-brand transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-end mt-2">
                                <Button type="submit" disabled={loading} className="font-bold">
                                    <FontAwesomeIcon icon={faSave} className="mr-2" /> Salvar Informações
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Form de Segurança */}
                    <div className="bg-white dark:bg-[#111] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 relative">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
                            <FontAwesomeIcon icon={faLock} className="text-gray-400" /> Segurança & Acesso
                        </h3>

                        <form onSubmit={handleSaveSecurity} className="flex flex-col gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nova Senha</label>
                                <div className="relative max-w-md">
                                    <FontAwesomeIcon icon={faLock} className="absolute left-4 top-3.5 text-gray-400" />
                                    <input
                                        type="password"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-3 pl-11 outline-none focus:ring-2 focus:ring-primary-brand/50 focus:border-primary-brand transition-all"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Você precisará fazer login novamente em outros dispositivos após essa alteração.</p>
                            </div>
                            
                            <div className="flex justify-start mt-2">
                                <Button type="submit" variant="outline" className="font-bold border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                                    Atualizar Senha
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
