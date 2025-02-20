import { useState, useEffect, useCallback } from 'react';
import {
    fetchProjeto as fetchProjetoAPI,
    fetchProjetos as fetchProjetosAPI,
    excluirProjeto as excluirProjetoAPI
} from '../api/apiService';

const useProjetos = (onClose) => {
    const [projetos, setProjetos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [idProjeto, setIdProjeto] = useState(null);

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

    const fetchProjeto = useCallback(async (id_projeto) => {
        try {
            setIdProjeto(id_projeto);
            const data = await fetchProjetoAPI(id_projeto);
            return data;
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
    };

    useEffect(() => {
        fetchProjetos();
    }, [fetchProjetos]);

    return { projetos, loading, error, fetchProjetos, fetchProjeto, excluirProjeto };
};

export default useProjetos;