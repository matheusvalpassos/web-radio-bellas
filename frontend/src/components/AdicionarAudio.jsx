// Exemplo em frontend/src/components/AdicionarAudio.jsx
import axios from 'axios';
import { useState } from 'react';

export default function AdicionarAudio() {
    const [url, setUrl] = useState('');

    const handleSalvar = async () => {
        try {
            await axios.post('http://localhost:8000/api/audios/', {
                youtube_url: url,
                tipo: 'MUSICA' // ou ANUNCIO_GLOBAL, pegando de um select
            });
            alert('Áudio baixado e cadastrado com sucesso!');
        } catch (error) {
            console.error("Erro ao salvar áudio", error);
        }
    };

    return (
        <div className="p-4">
            <input
                type="text"
                className="border p-2"
                placeholder="Link do YouTube"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={handleSalvar} className="bg-blue-500 text-white p-2 ml-2 rounded">
                Salvar e Processar
            </button>
        </div>
    );
}