import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
});

export const fetchProjetos = async () => {
    const response = await api.get('/listarProjetos');
    return response.data;
};

export const criarProjeto = async (projeto) => {
    const response = await api.post('/criarProjeto', projeto);
    return response.data;
};

export default api;