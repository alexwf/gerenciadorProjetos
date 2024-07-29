import React, { useEffect } from 'react';
import { formatDate } from '../utils/dateUtils';
import {
    Box,
    Heading,
    Text
} from '@chakra-ui/react';
import useAtividades from '../hooks/useAtividades';

const ListarAtividades = ({ idProjeto }) => {
    const { atividades, loading, error, fetchAtividades } = useAtividades(idProjeto);

    useEffect(() => {
        fetchAtividades();
    }, [fetchAtividades]);

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
};

export default ListarAtividades;