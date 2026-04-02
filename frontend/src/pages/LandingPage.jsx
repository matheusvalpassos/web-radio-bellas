import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Menu, X, Star, CheckCircle2, ChevronDown, ChevronUp, 
    PlayCircle, Globe, MapPin, ShieldCheck, Volume2, LayoutDashboard,
    ArrowRight, Activity, Mail
} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faMusic, faGasPump, faOilCan, faCoffee, faCarSide } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import useAuthStore from '../store/authStore';

export default function LandingPage() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeFaq, setActiveFaq] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    
    // Auth State
    const { isAuthenticated, login, error, isLoading } = useAuthStore();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    // Redirect or update UI internally when login succeeds while modal is open
    useEffect(() => {
        if (isAuthenticated && showLoginModal) {
            setShowLoginModal(false);
            navigate('/dashboard');
        }
    }, [isAuthenticated, showLoginModal, navigate]);

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-[#ffffff] text-[#121212] font-sans overflow-x-hidden relative">
            
            {/* NOVO: Modal de Login Elegante */}
            {showLoginModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
                    <div className="bg-white rounded-3xl p-8 lg:p-12 w-full max-w-md shadow-2xl relative border border-gray-100">
                        <button 
                            onClick={() => setShowLoginModal(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-[#da0d22] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/30">
                                <FontAwesomeIcon icon={faGasPump} className="text-white text-2xl" />
                            </div>
                            <h2 className="text-2xl font-black text-[#121212]">Painel da Diretoria</h2>
                            <p className="text-sm text-gray-500 mt-2 font-medium">Acesso restrito: Rede Bellas Região dos Lagos</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Usuário</label>
                                <input 
                                    type="text" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#da0d22] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                    placeholder="ex: diretoria.bellas"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Senha</label>
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#da0d22] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            
                            {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
                            
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-[#121212] text-white font-bold py-4 rounded-xl hover:bg-[#da0d22] transition-colors disabled:opacity-50 mt-4"
                            >
                                {isLoading ? 'Autenticando...' : 'Acessar Central'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* 1. Navbar */}
            <nav className="fixed top-0 w-full bg-[#ffffff]/95 backdrop-blur-md z-50 border-b border-gray-100 transition-all">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
                        <div className="w-10 h-10 rounded-xl bg-[#da0d22] flex items-center justify-center">
                            <FontAwesomeIcon icon={faGasPump} className="text-white text-lg" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter">Radiologia <span className="text-[#da0d22]">Bellas</span></span>
                    </div>

                    <div className="hidden lg:flex items-center gap-8">
                        <button onClick={() => scrollTo('how-it-works')} className="text-sm font-semibold text-[#121212] hover:text-[#da0d22] transition-colors">Visão do Piloto</button>
                        <button onClick={() => scrollTo('features')} className="text-sm font-semibold text-[#121212] hover:text-[#da0d22] transition-colors">Venda Cruzada</button>
                        <button onClick={() => scrollTo('pricing')} className="text-sm font-semibold text-[#121212] hover:text-[#da0d22] transition-colors">Expansão (14 Lojas)</button>
                        
                        {isAuthenticated ? (
                            <button 
                                onClick={() => navigate('/dashboard')}
                                className="bg-[#121212] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors"
                            >
                                Ir para o Dashboard
                            </button>
                        ) : (
                            <button 
                                onClick={() => setShowLoginModal(true)}
                                className="bg-[#da0d22] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-red-800 transition-colors shadow-lg shadow-red-500/20"
                            >
                                Acessar Sistema
                            </button>
                        )}
                    </div>

                    <button className="lg:hidden p-2 text-[#121212]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* 2. Hero Section */}
            <section id="hero" className="pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative">
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#da0d22] rounded-full blur-[150px] opacity-5 -z-10"></div>
                
                <div className="flex-1 w-full text-center lg:text-left z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#da0d22] text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#da0d22] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#da0d22]"></span>
                        </span>
                        Apresentação Exclusiva: Região dos Lagos
                    </div>
                    
                    <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-[#121212]">
                        Transforme a Passagem da Bomba em <span className="text-[#da0d22]">Retenção.</span>
                    </h1>
                    
                    <p className="text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                        Bem-vinda, Diretoria Rede Bellas. Conheçam o portal acústico desenhado sob medida para unificar suas 14 unidades, estimular o Top Clube Fidelidade e multiplicar o faturamento das conveniências através do neuromarketing.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-10">
                        {isAuthenticated ? (
                            <button 
                                onClick={() => navigate('/dashboard')}
                                className="bg-[#121212] flex items-center justify-center gap-2 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-black hover:-translate-y-1 transition-all group w-full sm:w-auto text-lg"
                            >
                                Ingressar no Dashboard <LayoutDashboard className="w-5 h-5 mx-2" />
                            </button>
                        ) : (
                            <button 
                                onClick={() => setShowLoginModal(true)}
                                className="bg-[#da0d22] text-[#ffffff] font-bold py-4 px-8 rounded-xl shadow-lg shadow-red-500/20 hover:bg-red-800 hover:-translate-y-1 transition-all flex justify-center items-center gap-2 group w-full sm:w-auto text-lg"
                            >
                                Iniciar Modo Operador <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex-1 w-full relative z-10 max-w-2xl perspective-1000">
                    <div className="bg-[#121212] rounded-2xl shadow-2xl overflow-hidden border border-gray-800 transform lg:rotate-y-[-10deg] lg:rotate-x-[5deg] transition-transform hover:rotate-0 duration-700 w-full">
                        <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-gray-800">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <div className="mx-auto text-xs font-mono text-gray-500">portal-interno.redebellas.com.br</div>
                        </div>
                        <div className="p-6 bg-[#0f0f0f] grid grid-cols-2 gap-4">
                            <div className="col-span-2 flex items-center justify-between mb-2">
                                <div className="h-6 w-32 bg-gray-800 rounded"></div>
                                <div className="flex gap-2"><div className="w-8 h-8 rounded-full bg-red-900 border border-red-500/50 flex justify-center items-center text-xs">🚀</div></div>
                            </div>
                            
                            {/* Card 1: Clube */}
                            <div className="bg-[#151515] p-4 rounded-xl border border-gray-800">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Spot Local</span>
                                    <FontAwesomeIcon icon={faMusic} className="text-[#da0d22] text-sm" />
                                </div>
                                <div className="text-white font-bold text-sm mb-1">Top Clube Fidelidade</div>
                                <div className="text-xs text-gray-500 mb-2">Rodando na Conveniência</div>
                                <div className="w-full bg-gray-800 rounded-full h-1.5"><div className="bg-[#da0d22] h-1.5 rounded-full" style={{width: '70%'}}></div></div>
                            </div>

                            {/* Card 2: Oleo */}
                            <div className="bg-[#151515] p-4 rounded-xl border border-gray-800">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Pista Ativa</span>
                                    <FontAwesomeIcon icon={faOilCan} className="text-yellow-500 text-sm" />
                                </div>
                                <div className="text-white font-bold text-sm mb-1">Campanha Troca de Óleo</div>
                                <div className="text-xs text-emerald-500 mb-2 font-bold">• 6 Postos Ativos</div>
                                <div className="flex gap-1">
                                    {[1,2,3,4,5].map(i => <div key={i} className="h-1 flex-1 bg-yellow-500/50 rounded-sm"></div>)}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. How It Works - Postos */}
            <section id="how-it-works" className="py-24 bg-[#ffffff]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl lg:text-5xl font-black text-[#121212] mb-4">A Lógica da Conversão na Pista</h2>
                        <p className="text-xl text-gray-500 font-medium">Orquestração avançada para transformar tráfego de abastecimento em cross-sell.</p>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
                        <div className="lg:w-1/2">
                            <div className="text-[#da0d22] font-black text-7xl opacity-20 mb-[-30px]">01</div>
                            <h3 className="text-3xl font-bold mb-4 text-[#121212] flex items-center gap-3">Um Café na Pista? <FontAwesomeIcon icon={faCoffee} className="text-yellow-700"/></h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Abastecer é passivo. Inserimos estímulos automáticos nas caixas da pista divulgando seu café quentinho da conveniência. O cliente que não iria descer do carro sente o apelo do aroma descrito no som e entra na loja. O ticket médio da sua unidade dispara.
                            </p>
                        </div>
                        <div className="lg:w-1/2 bg-yellow-50 rounded-[2rem] p-8 border border-yellow-100 aspect-video flex items-center justify-center relative overflow-hidden shadow-sm">
                            <FontAwesomeIcon icon={faCoffee} className="text-[#121212] text-6xl opacity-80" />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-24">
                        <div className="lg:w-1/2">
                            <div className="text-[#da0d22] font-black text-7xl opacity-20 mb-[-30px]">02</div>
                            <h3 className="text-3xl font-bold mb-4 text-[#121212] flex items-center gap-3">Segmentação de Óleo <FontAwesomeIcon icon={faOilCan} className="text-blue-700"/></h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Sabemos que nem todos os postos Rede Bellas possuem troca de óleo no momento. No nosso Painel de Gestão, a equipe de marketing enviará os spots da "Promoção Dunga Troca de Óleo" <b>apenas para os IDs dos postos que possuem infraestrutura</b>, evitando frustração do cliente em outras filiais.
                            </p>
                        </div>
                        <div className="lg:w-1/2 bg-[#121212] rounded-[2rem] p-8 border border-gray-800 aspect-video flex flex-col justify-center gap-4 relative overflow-hidden shadow-xl">
                            <div className="flex items-center gap-4 bg-[#1a1a1a] p-4 rounded-xl w-3/4">
                                <FontAwesomeIcon icon={faGasPump} className="text-[#da0d22]" /> <span className="text-white font-bold">Unidade Búzios</span> <span className="ml-auto text-xs font-bold text-gray-500 uppercase flex gap-2"><FontAwesomeIcon icon={faOilCan} className="text-gray-600" /> Sem Óleo</span>
                            </div>
                            <div className="flex items-center gap-4 bg-[#1a1a1a] border border-[#da0d22]/40 p-4 rounded-xl w-full translate-x-8">
                                <FontAwesomeIcon icon={faGasPump} className="text-[#da0d22]" /> <span className="text-white font-bold">Unidade Macaé Master</span> <CheckCircle2 className="text-emerald-500 ml-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expansão Roadmap (Substituindo Pricing) */}
            <section id="pricing" className="py-24 bg-gray-50 border-y border-gray-200">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-black text-[#121212] mb-4">Plano de Aceleração 2026</h2>
                    <p className="text-lg text-gray-500 font-medium mb-16">Integração faseada para validar sem riscos, padronizando a experiência do cliente em toda a rede.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        
                        {/* Fase 1 */}
                        <div className="bg-[#ffffff] rounded-3xl p-8 border-2 border-gray-200 flex flex-col relative opactiy-90">
                            <h3 className="text-xl font-bold text-[#121212] mb-2">Fase 1: Piloto</h3>
                            <p className="text-[#da0d22] font-black text-2xl mb-6">1 Unidade Base</p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3 text-gray-600"><CheckCircle2 className="w-5 h-5 text-gray-300 shrink-0" /> Fechamos contratos na rede local</li>
                                <li className="flex items-start gap-3 text-gray-600"><CheckCircle2 className="w-5 h-5 text-gray-300 shrink-0" /> Aprovação do Setup (Música)</li>
                                <li className="flex items-start gap-3 text-gray-600"><CheckCircle2 className="w-5 h-5 text-gray-300 shrink-0" /> Validação do Retorno de Clientes</li>
                            </ul>
                        </div>

                        {/* Fase 2 */}
                        <div className="bg-[#121212] rounded-3xl p-8 border-2 border-[#da0d22] relative shadow-2xl shadow-red-500/20 flex flex-col transform md:-translate-y-4">
                            <div className="absolute top-0 right-6 translate-y-[-50%] bg-[#da0d22] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                Atuação de Curto Prazo
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Fase 2: Consolidação</h3>
                            <p className="text-[#da0d22] font-black text-2xl mb-6">6 Principais Unidades</p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-[#da0d22] shrink-0" /> Envio via Bot do Telegram Liberado</li>
                                <li className="flex items-start gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-[#da0d22] shrink-0" /> Spots Locais e Dinâmicos Segmentados</li>
                                <li className="flex items-start gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-[#da0d22] shrink-0" /> Gestão Multi-lojas Inteligente</li>
                            </ul>
                        </div>

                        {/* Fase 3 */}
                        <div className="bg-[#ffffff] rounded-3xl p-8 border-2 border-gray-200 flex flex-col relative opactiy-90">
                            <h3 className="text-xl font-bold text-[#121212] mb-2">Fase 3: Expansão Total</h3>
                            <p className="text-[#da0d22] font-black text-2xl mb-6">14 Unidades da Região</p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3 text-gray-600"><CheckCircle2 className="w-5 h-5 text-[#121212] shrink-0" /> Operação Master Control Central</li>
                                <li className="flex items-start gap-3 text-gray-600"><CheckCircle2 className="w-5 h-5 text-[#121212] shrink-0" /> Integração de Eventos Automáticos</li>
                                <li className="flex items-start gap-3 text-gray-600"><CheckCircle2 className="w-5 h-5 text-[#121212] shrink-0" /> O ecossistema Rede Bellas selado</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#121212] py-12 px-6 border-t border-gray-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#da0d22] flex items-center justify-center">
                            <FontAwesomeIcon icon={faGasPump} className="text-white text-sm" />
                        </div>
                        <span className="text-xl font-black text-white tracking-tighter">Radiologia <span className="text-[#da0d22]">Bellas</span></span>
                    </div>
                    <div className="text-gray-500 text-sm font-medium text-center md:text-left">
                        Desenvolvido e Gerenciado por <span className="text-white font-bold">Matheus Valpassos</span> <br/>
                        <a href="https://matheusvalpassos.lovable.app" target="_blank" rel="noreferrer" className="hover:text-[#da0d22] transition-colors underline decoration-gray-700 hover:decoration-[#da0d22] underline-offset-4">matheusvalpassos.lovable.app</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="https://github.com/matheusvalpassos" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#da0d22] hover:border-transparent transition-all"><FontAwesomeIcon icon={faGithub} className="text-lg" /></a>
                        <a href="https://linkedin.com/in/matheusvalpassos" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#da0d22] hover:border-transparent transition-all"><FontAwesomeIcon icon={faLinkedin} className="text-lg" /></a>
                        <a href="https://instagram.com/valpassosmatheus" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#da0d22] hover:border-transparent transition-all"><FontAwesomeIcon icon={faInstagram} className="text-lg" /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
