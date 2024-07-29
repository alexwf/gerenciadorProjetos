import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDate } from '../utils/dateUtils';
import {
    Box,
    Heading,
    Text
} from '@chakra-ui/react';

const ListarAtividades = ({ idProjeto }) => {
    const [atividades, setAtividades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAtividades = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/listarAtividades/${idProjeto}`);
                setAtividades(response.data);
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar atividades');
                setLoading(false);
            }
        };

        fetchAtividades();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Box>
            {atividades.map(atividade => (
                <Box>
                    <Heading size="sm" mt={4}>{`${atividade.id} - ${atividade.nome}`}</Heading>
                    <Text mt={1}>Início: {formatDate(atividade.data_inicio)} - Fim: {formatDate(atividade.data_fim)}</Text>
                    <Text mt={1}>{atividade.finalizada ? "FINALIZADA" : "EM ANDAMENTO"}</Text>
                </Box>
            ))}
        </Box>
    );
};

export default ListarAtividades;