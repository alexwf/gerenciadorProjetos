import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDate } from '../utils/dateUtils';
import { arredondarPercentual } from '../utils/mathUtils'
import {
    Box,
    Heading,
    Text,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    CircularProgress,
    CircularProgressLabel
} from '@chakra-ui/react';
import ListarAtividades from './ListarAtividades';

const ListarProjetos = () => {
    const [projetos, setProjetos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjetos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/listarProjetos');
                setProjetos(response.data);
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar projetos');
                setLoading(false);
            }
        };

        fetchProjetos();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Box p={10}>
            <Heading as="h2" mb={6} textAlign="center">
                Projetos de Alex
            </Heading>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
                {projetos.map(projeto => (
                    <Card
                        key={projeto.id}
                        borderRadius="md"
                        overflow="hidden"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                    >
                        <CardHeader>
                        <CircularProgress value={arredondarPercentual(projeto.perc_conclusao)} color='teal.500' size='115px'>
                            <CircularProgressLabel>{arredondarPercentual(projeto.perc_conclusao)}%</CircularProgressLabel>
                        </CircularProgress>
                        </CardHeader>
                        <CardBody>
                            <Heading size="md">{`${projeto.id} - ${projeto.nome}`}</Heading>
                            <Text mt={2}>Início: {formatDate(projeto.data_inicio)}</Text>
                            <Text mt={2}>Fim: {formatDate(projeto.data_fim)}</Text>
                            <ListarAtividades idProjeto={projeto.id}/>
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default ListarProjetos;