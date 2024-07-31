import React, { useEffect, useImperativeHandle, forwardRef, useState, useCallback } from 'react';
import { formatDate } from '../utils/dateUtils';
import {
    Box,
    Heading,
    Text,
    Card,
    CardBody,
    Stack,
    StackDivider,
    Tag,
    TagLeftIcon,
    TagLabel,
    IconButton,
    SimpleGrid,
    Tooltip
} from '@chakra-ui/react';
import { fetchAtividades } from '../api/apiService';
import { CheckCircleIcon, TimeIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const ListarAtividades = forwardRef(({ idProjeto }, ref) => {
    const [atividades, setAtividades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAtividades = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchAtividades(idProjeto);
            setAtividades(response);
            setError(null);
        } catch (error) {
            setError("Erro ao carregar atividades");
        }
        setLoading(false)
    }, [idProjeto]);

    useImperativeHandle(ref, () => ({
        fetchAtividades: getAtividades
    }));

    useEffect(() => {
        getAtividades();
    }, [getAtividades]);

    const handleToggle = async (atividade) => {
        /*
        const updatedAtividade = { ...atividade, finalizada: !atividade.finalizada };
        await atualizarAtividade(updatedAtividade);
        fetchAtividades();*/
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (atividades.length == 0) return;

    return (
        <Card>
            <CardBody maxHeight="50vh" overflowY="auto">
                <Stack divider={<StackDivider />} spacing='3'>
                    {atividades.map(atividade => (

                        <Box key={atividade.id}>
                            <SimpleGrid columns={2} justifyContent="space-between" alignItems="center" spacing={2}>
                                <Heading size='xs' textTransform='uppercase'>
                                    {atividade.nome}
                                </Heading>
                                <Box display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
                                    {
                                        atividade.finalizada ?
                                            <Tag variant='outline' colorScheme='teal'>
                                                <TagLeftIcon boxSize='12px' as={CheckCircleIcon} />
                                                <TagLabel>Finalizada</TagLabel>
                                            </Tag>
                                            :
                                            <Tag variant='outline'>
                                                <TagLeftIcon boxSize='12px' as={TimeIcon} />
                                                <TagLabel>Andamento</TagLabel>
                                            </Tag>
                                    }
                                    <Tooltip label="Editar atividade" aria-label="Editar atividade">
                                        <IconButton
                                        variant="ghost"
                                            size='sm'
                                            icon={<EditIcon />}
                                            alignSelf="flex-end"
                                        />
                                    </Tooltip>
                                    <Tooltip label="Excluir atividade" aria-label="Excluir atividade">
                                        <IconButton
                                            variant='ghost'
                                            size='sm'
                                            icon={<DeleteIcon />}
                                            alignSelf="flex-end"
                                            colorScheme='red'
                                        />
                                    </Tooltip>
                                </Box>
                                <Text fontSize='sm'>Início: {formatDate(atividade.data_inicio)} - Fim: {formatDate(atividade.data_fim)}</Text>

                            </SimpleGrid>
                        </Box>
                    ))}
                </Stack>
            </CardBody>
        </Card>
    );
});

export default ListarAtividades;