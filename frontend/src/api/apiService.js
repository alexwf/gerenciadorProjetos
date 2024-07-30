import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
});

const handleApiError = (error) => {
    console.error('API error:', error);
    throw error.response ? error.response.data : new Error('Erro desconhecido');
};

export const fetchProjetos = async () => {
    try {
        const response = await api.get('/listarProjetos');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const criarProjeto = async (projeto) => {
    try {
        const response = await api.post('/criarProjeto', projeto);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const excluirProjeto = async (idProjeto) => {
    try {
        await api.delete(`/excluirProjeto/${idProjeto}`);
    } catch (error) {
        handleApiError(error);
    }
}

export const fetchAtividades = async (idProjeto) => {
    try {
        const response = await api.get(`/listarAtividades/${idProjeto}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const criarAtividade = async (atividade) => {
    try {
        const response = await api.post('/criarAtividade', atividade);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export default api;