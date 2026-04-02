import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGasPump, faEdit, faTrashAlt, faPlus, faSpinner, faMapMarkerAlt, faWifi } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';

export default function Unidades() {
    const [unidades, setUnidades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    
    // CRUD state
    const [formData, setFormData] = useState({
        id: null,
        nome: '',
        endereco: '',
        azuracast_station_id: '',
        status: 'online'
    });

    const API_URL = 'http://localhost:8000/api/';
    const axiosInstance = axios.create({
        baseURL: API_URL,
        withCredentials: true
    });

    useEffect(() => {
        fetchUnidades();
    }, []);

    const fetchUnidades = async () => {
        try {
            setFetching(true);
            const response = await axiosInstance.get('unidades/');
            setUnidades(response.data);
        } catch (error) {
            console.error("Erro ao carregar unidades", error);
            toast.error("Erro de Rede", { description: "Não foi possível carregar as filiais do banco de dados." });
        } finally {
            setFetching(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (formData.id) {
                await axiosInstance.put(`unidades/${formData.id}/`, formData);
                toast.success("Posto atualizado com sucesso!");
            } else {
                await axiosInstance.post('unidades/', formData);
                toast.success("Nova Unidade conectada à rede!");
            }
            setFormData({ id: null, nome: '', endereco: '', azuracast_station_id: '', status: 'online' });
            fetchUnidades();
        } catch (error) {
            console.error(error);
            toast.error("Falha ao salvar", { description: "Verifique os dados da unidade e tente novamente." });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Isso desconectará a unidade da rede global da rádio. Tem certeza?")) {
            try {
                await axiosInstance.delete(`unidades/${id}/`);
                toast.success("Unidade removida com sucesso.");
                fetchUnidades();
            } catch (error) {
                toast.error("Erro de exclusão", { description: "Ocorreu um erro ao excluir." });
            }
        }
    };

    const handleEdit = (unidade) => {
        setFormData(unidade);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="max-w-7xl mx-auto dark:text-gray-100 animate-fade-in pb-12">
            <div className="mb-8 border-b py-4 border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">Gerenciamento de Postos</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Conecte e administre as filiais da Rede Bellas atreladas às estações base.</p>
                </div>
            </div>

            {/* Inserção de Unidades (CRUD - Create/Update) */}
            <div className="bg-white dark:bg-[#111] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <FontAwesomeIcon icon={formData.id ? faEdit : faPlus} className={formData.id ? "text-primary-brand" : "text-emerald-500"} />
                    {formData.id ? 'Ajustar Dados do Posto' : 'Homologar Novo Posto'}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nome Oficial do Posto</label>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleInputChange}
                                required
                                placeholder="Ex: Macaé Aeroporto"
                                className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary-brand/50 focus:border-primary-brand transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Localização / Ref.</label>
                            <input
                                type="text"
                                name="endereco"
                                value={formData.endereco}
                                onChange={handleInputChange}
                                placeholder="Rodovia Amaral Peixoto km 15"
                                className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary-brand/50 focus:border-primary-brand transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">ID Servidor Local (Opcional)</label>
                            <input
                                type="number"
                                name="azuracast_station_id"
                                value={formData.azuracast_station_id}
                                onChange={handleInputChange}
                                placeholder="ID Isolado do Azura"
                                className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary-brand/50 focus:border-primary-brand transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Conectividade Inicial</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary-brand/50 focus:border-primary-brand transition-all"
                            >
                                <option value="online">Sincronizado e Ativo (Online)</option>
                                <option value="offline">Sinal Interrompido (Offline)</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 items-center">
                        <Button type="submit" disabled={loading} className="py-6 px-8 text-md font-bold bg-emerald-600 hover:bg-emerald-700 border-none shadow-lg shadow-emerald-500/20">
                            {loading ? <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> : null}
                            {formData.id ? 'Salvar Edição do Posto' : 'Registrar Posto na Rede'}
                        </Button>

                        {formData.id && (
                            <Button type="button" variant="outline" onClick={() => setFormData({ id: null, nome: '', endereco: '', azuracast_station_id: '', status: 'online' })} className="py-6 px-6 font-bold">
                                Cancelar
                            </Button>
                        )}
                    </div>
                </form>
            </div>

            {/* Listagem (Read e Delete) */}
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-gray-100">
                <FontAwesomeIcon icon={faGasPump} className="text-gray-400" /> Mapa de Unidades Ativas
            </h2>

            <div className="bg-white dark:bg-[#111] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                {fetching ? (
                    <div className="p-12 text-center text-gray-500">
                        <FontAwesomeIcon icon={faSpinner} spin size="2x" className="mb-4" />
                        <p>Inspecionando Data Center...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {unidades.map(u => (
                            <div key={u.id} className="bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#222] border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#121212] dark:text-white">
                                                <FontAwesomeIcon icon={faGasPump} />
                                            </div>
                                            <h3 className="font-bold text-lg dark:text-white leading-tight">{u.nome}</h3>
                                        </div>
                                        <div className={`px-2 py-1 rounded text-[10px] font-black uppercase flex items-center gap-1 ${u.status === 'online' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                            <FontAwesomeIcon icon={faWifi} className={u.status === 'online' ? 'animate-pulse' : ''} />
                                            {u.status}
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-start gap-2 mt-4">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 flex-shrink-0" />
                                        <span>{u.endereco || 'Endereço não informado'}</span>
                                    </div>
                                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-2 font-mono">
                                        Station ID: {u.azuracast_station_id || 'N/A (Global)'}
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-2">
                                    <Button variant="outline" size="sm" onClick={() => handleEdit(u)} className="h-8">Editar</Button>
                                    <Button variant="ghost" size="sm" onClick={() => handleDelete(u.id)} className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50">Excluir</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
