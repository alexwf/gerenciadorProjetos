import { useState, useEffect, useCallback } from 'react';
import { fetchAtividades as fetchAtividadesAPI, excluirAtividade as excluirAtividadeAPI } from '../api/apiService';

const useAtividades = (idProjeto) => {
    const [atividades, setAtividades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAtividades = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchAtividadesAPI(idProjeto);
            setAtividades(data);
        } catch (err) {
            setError('Erro ao carregar atividades');
        } finally {
            setLoading(false);
        }
    }, [idProjeto]);

    const excluirAtividade = async(id) => {
        try {
            await excluirAtividadeAPI(id);
            fetchAtividades();
        } catch (err) {
            setError('Erro ao excluir atividade');
        }
    };

    useEffect(() => {
        fetchAtividades();
    }, [fetchAtividades]);

    return { atividades, loading, error, fetchAtividades, excluirAtividade };
};

export default useAtividades;