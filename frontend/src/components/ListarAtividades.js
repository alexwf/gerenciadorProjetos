import React, { useEffect, useImperativeHandle, forwardRef, useState } from 'react';
import { formatDate } from '../utils/dateUtils';
import {
    Box,
    Heading,
    Text
} from '@chakra-ui/react';
import { fetchAtividades } from '../api/apiService';

const ListarAtividades = forwardRef(({ idProjeto }, ref) => {
    const [atividades, setAtividades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAtividades = async() => {
        setLoading(true);
        try {
            const response = await fetchAtividades(idProjeto);
            setAtividades(response);
            setError(null);
        } catch (error) {
            setError("Erro ao carregar atividades");
        }
        setLoading(false)
    };

    useImperativeHandle(ref, () => ({
        fetchAtividades: getAtividades
    }));

    useEffect(() => {
        getAtividades();
    }, [idProjeto]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Box>
            {atividades.map(atividade => (
                <Box key={atividade.id}>
                    <Heading size="sm" mt={4}>{`${atividade.id} - ${atividade.nome}`}</Heading>
                    <Text mt={1}>Início: {formatDate(atividade.data_inicio)} - Fim: {formatDate(atividade.data_fim)}</Text>
                    <Text mt={1}>{atividade.finalizada ? "FINALIZADA" : "EM ANDAMENTO"}</Text>
                </Box>
            ))}
        </Box>
    );
});

export default ListarAtividades;