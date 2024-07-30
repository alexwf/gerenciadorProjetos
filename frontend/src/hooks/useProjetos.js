import { useState, useCallback } from 'react';
import { fetchProjetos as fetchProjetosAPI, excluirProjeto as excluirProjetoAPI } from '../api/apiService';

const useProjetos = (onClose) => {
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

    const excluirProjeto = async(id) => {
        try {
            await excluirProjetoAPI(id);
            fetchProjetos();
            if (onClose) onClose();
        } catch (err) {
            setError('Erro ao excluir projeto');
        }
    }

    return { projetos, loading, error, fetchProjetos, excluirProjeto };
};

export default useProjetos;