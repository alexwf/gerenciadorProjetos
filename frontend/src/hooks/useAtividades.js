import { useState, useCallback } from 'react';
import { fetchAtividades as fetchAtividadesAPI } from '../api/apiService';

const useAtividades = (idProjeto) => {
    const [atividades, setAtividades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAtividades = useCallback(async () => {
        try {
            const data = await fetchAtividadesAPI(idProjeto);
            setAtividades(data);
        } catch (err) {
            setError('Erro ao carregar atividades');
        } finally {
            setLoading(false);
        }
    }, [idProjeto]);

    return { atividades, loading, error, fetchAtividades };
};

export default useAtividades;