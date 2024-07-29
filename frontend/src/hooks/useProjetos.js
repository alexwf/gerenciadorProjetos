import { useState, useCallback } from 'react';
import { fetchProjetos as fetchProjetosAPI } from '../api/apiService';

const useProjetos = () => {
    const [projetos, setProjetos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProjetos = useCallback(async () => {
        try {
            const data = await fetchProjetosAPI();
            setProjetos(data);
        } catch (err) {
            setError('Erro ao carregar projetos');
        } finally {
            setLoading(false);
        }
    }, []);

    return { projetos, loading, error, fetchProjetos };
};

export default useProjetos;