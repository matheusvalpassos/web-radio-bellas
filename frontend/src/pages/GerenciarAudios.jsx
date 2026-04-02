import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faPlusCircle, faSpinner, faMusic, faMicrophone, faGlobe, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';

export default function GerenciarAudios() {
    const [audios, setAudios] = useState([]);
    const [unidadesList, setUnidadesList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [formData, setFormData] = useState({
        id: null,
        youtube_url: '',
        tipo: 'MUSICA',
        unidades: []
    });

    const API_URL = 'http://localhost:8000/api/';

    const axiosInstance = axios.create({
        baseURL: API_URL,
        withCredentials: true
    });

    useEffect(() => {
        const loadInitialData = async () => {
            await fetchUnidades();
            await fetchAudios();
        };
        loadInitialData();
    }, []);

    const fetchUnidades = async () => {
        try {
            const response = await axiosInstance.get('unidades/');
            setUnidadesList(response.data);
        } catch (error) {
            console.error("Erro ao buscar unidades:", error);
        }
    };

    const fetchAudios = async () => {
        try {
            setFetching(true);
            const response = await axiosInstance.get('audios/');
            setAudios(response.data);
        } catch (error) {
            console.error("Erro ao buscar áudios:", error);
        } finally {
            setFetching(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUnidadeToggle = (unidadeId) => {
        const currentUnidades = [...formData.unidades];
        if (currentUnidades.includes(unidadeId)) {
            setFormData({ ...formData, unidades: currentUnidades.filter(id => id !== unidadeId) });
        } else {
            setFormData({ ...formData, unidades: [...currentUnidades, unidadeId] });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.tipo === 'ANUNCIO_LOCAL' && formData.unidades.length === 0) {
            toast.error("Seleção Obrigatória", { description: "Por favor, selecione ao menos uma unidade para o Anúncio Local." });
            return;
        }

        setLoading(true);

        const payload = {
            youtube_url: formData.youtube_url,
            tipo: formData.tipo,
            unidades: formData.tipo === 'ANUNCIO_LOCAL' ? formData.unidades : []
        };

        try {
            if (formData.id) {
                await axiosInstance.put(`audios/${formData.id}/`, payload);
                toast.success("Spot atualizado com sucesso!");
            } else {
                await axiosInstance.post('audios/', payload);
                toast.success("Captura Finalizada!", {
                    description: "O robô da Radiobellas isolou o áudio do clipe do Youtube e eJetou na grade do AzuraCast. Em breve você o verá ativo."
                });
            }

            setFormData({ id: null, youtube_url: '', tipo: 'MUSICA', unidades: [] });
            fetchAudios();
        } catch (error) {
            console.error("Erro ao salvar áudio:", error);
            toast.error("Erro de Rede", { description: "Houve um erro. Certifique-se de estar autenticado com sessão válida." });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (audio) => {
        setFormData({
            id: audio.id,
            youtube_url: audio.youtube_url,
            tipo: audio.tipo,
            unidades: audio.unidades || []
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Você está deletando este registro do banco da Rádio. Tem certeza?")) {
            try {
                // Notificação em andamento (loading behavior do Shadcn)
                const toastId = toast.loading("Apagando arquivo da nuvem...");
                await axiosInstance.delete(`audios/${id}/`);
                toast.success("Áudio deletado definitivamente.", { id: toastId });
                fetchAudios();
            } catch (error) {
                console.error("Erro ao excluir:", error);
                toast.error("Falha ao Deletar", { description: "Não foi possível excluir o áudio da plataforma." });
            }
        }
    };

    const getTypeDisplayMap = (type) => {
        switch (type) {
            case 'MUSICA': return { label: 'Música', icon: faMusic, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200' };
            case 'ANUNCIO_GLOBAL': return { label: 'Anúncio Global', icon: faGlobe, color: 'bg-[#ee771b]/10 text-[#ee771b] border-[#ee771b]/20 dark:bg-[#ee771b]/20 dark:border-[#ee771b]/30' };
            case 'ANUNCIO_LOCAL': return { label: 'Anúncio Local', icon: faMapMarkerAlt, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200' };
            default: return { label: 'Desconhecido', icon: faMicrophone, color: 'bg-gray-100 text-gray-700' };
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto dark:text-gray-100">
            <div className="mb-8 border-b py-4 border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">Central de Publicidade & Repertório</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Acople novos fluxos musicais e Spots Comerciais (Locais/Globais) diretamente via Nuvem.</p>
                </div>
            </div>

            {/* Painel do CMS Form */}
            <div className="bg-white dark:bg-[#111] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.75 bg-linear-to-r from-primary-brand to-[#ee771b]"></div>
                
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 dark:text-gray-100">
                    <FontAwesomeIcon icon={formData.id ? faEdit : faPlusCircle} className="text-primary-brand" />
                    {formData.id ? 'Refinar Diretriz do Áudio' : 'Inserir Novo Áudio na Grade'}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Link de Obtenção (YouTube)</label>
                            <input
                                type="url"
                                name="youtube_url"
                                value={formData.youtube_url}
                                onChange={handleInputChange}
                                required
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary-brand/50 focus:border-primary-brand transition-all"
                            />
                        </div>

                        <div className="w-full md:w-80">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Classe de Transmissão</label>
                            <select
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleInputChange}
                                className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary-brand/50 focus:border-primary-brand transition-all"
                            >
                                <option value="MUSICA">Repertório Geral (Todas)</option>
                                <option value="ANUNCIO_GLOBAL">Spot Comercial GLOBAL</option>
                                <option value="ANUNCIO_LOCAL">Spot Comercial LOCAL (Focar em Mix)</option>
                            </select>
                        </div>
                    </div>

                    {formData.tipo === 'ANUNCIO_LOCAL' && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                                Selecione as <span className="text-emerald-600 dark:text-emerald-400">Unidades Exclusivas</span> para esta Publicidade
                            </label>
                            {unidadesList.length === 0 ? (
                                <p className="text-sm text-gray-500">Ainda não há Nenhuma filial cadastrada no sistema.</p>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {unidadesList.map(u => (
                                        <label key={u.id} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg border border-transparent transition-colors">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 bg-white dark:bg-gray-800"
                                                checked={formData.unidades.includes(u.id)}
                                                onChange={() => handleUnidadeToggle(u.id)}
                                            />
                                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{u.nome}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex gap-4 items-center pt-2">
                        <Button type="submit" disabled={loading} className="py-6 px-8 text-md font-bold">
                            {loading ? <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> : null}
                            {loading ? 'Processando...' : 'Realizar Deploy de Áudio'}
                        </Button>

                        {formData.id && (
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setFormData({ id: null, youtube_url: '', tipo: 'MUSICA', unidades: [] })}
                                className="py-6 px-6 font-bold"
                            >
                                Cancelar Alteração
                            </Button>
                        )}
                    </div>
                </form>
            </div>

            {/* Listagem Global de Áudios */}
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-gray-100">
                <FontAwesomeIcon icon={faMusic} className="text-gray-400" /> Banco Mestre de Transmissões
            </h2>
            <div className="bg-white dark:bg-[#111] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                {fetching ? (
                    <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center">
                        <FontAwesomeIcon icon={faSpinner} spin size="2x" className="text-primary-brand mb-4" />
                        <span className="font-medium animate-pulse">Estabelecendo Conexão DB...</span>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-[#151515] border-b border-gray-200 dark:border-gray-800">
                                    <th className="p-4 font-bold text-gray-700 dark:text-gray-300 text-sm">Metadados Originais</th>
                                    <th className="p-4 font-bold text-gray-700 dark:text-gray-300 text-sm w-48 text-center">Tipo Acústico</th>
                                    <th className="p-4 font-bold text-gray-700 dark:text-gray-300 text-sm w-32 text-center">Ações Root</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {audios.map((audio) => {
                                    const tipoSpecs = getTypeDisplayMap(audio.tipo);
                                    return (
                                        <tr key={audio.id} className="hover:bg-red-50/30 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="p-4">
                                                <div className="font-bold text-gray-900 dark:text-white text-base">
                                                    {audio.titulo || <span className="text-gray-400 italic font-medium">Aguardando Extração Remota...</span>}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1 truncate max-w-md" title={audio.youtube_url}>
                                                    🔗 Source: {audio.youtube_url}
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-black uppercase tracking-wider ${tipoSpecs.color}`}>
                                                    <FontAwesomeIcon icon={tipoSpecs.icon} />
                                                    {tipoSpecs.label}
                                                </div>
                                                {audio.tipo === 'ANUNCIO_LOCAL' && audio.unidades?.length > 0 && (
                                                    <div className="mt-1.5 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                                                        Alocado em {audio.unidades.length} PDVs
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon"
                                                        onClick={() => handleEdit(audio)}
                                                        title="Refatorar Diretrizes"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} className="text-gray-400 hover:text-primary-brand" />
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon"
                                                        onClick={() => handleDelete(audio.id)}
                                                        title="Deletar Instância"
                                                    >
                                                        <FontAwesomeIcon icon={faTrashAlt} className="text-gray-400 hover:text-red-500" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {audios.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="p-12 text-center text-gray-500 dark:text-gray-400 font-medium bg-gray-50/50 dark:bg-[#111]">
                                            Sua central acústica repousa em silêncio. Injete o primeiro sinal sonoro via Link.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}