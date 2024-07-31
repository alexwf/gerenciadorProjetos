import React, { useImperativeHandle, forwardRef } from 'react';
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
import { CheckCircleIcon, TimeIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import useAtividades from '../hooks/useAtividades';
import useProjetos from '../hooks/useProjetos';

const ListarAtividades = forwardRef(({ idProjeto }, ref) => {
    const { atividades, loading, error, fetchAtividades, excluirAtividade } = useAtividades(idProjeto);
    const { fetchProjetos } = useProjetos();

    const handleExcluirAtividade = async (idAtividade) => {
        await excluirAtividade(idAtividade);
        fetchProjetos();
        fetchAtividades();
    };

    useImperativeHandle(ref, () => ({
        fetchAtividades: fetchAtividades
    }));

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (atividades.length === 0) return <p>Nenhuma atividade encontrada.</p>;

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
                                    <Tooltip label="Em desenvolvimento" aria-label="Em desenvolvimento">
                                        <IconButton
                                            variant="ghost"
                                            size='sm'
                                            icon={<EditIcon />}
                                            alignSelf="flex-end"
                                        />
                                    </Tooltip>
                                    <Tooltip label="Em desenvolvimento" aria-label="Em desenvolvimento">
                                        <IconButton
                                            variant='ghost'
                                            size='sm'
                                            icon={<DeleteIcon />}
                                            alignSelf="flex-end"
                                            colorScheme='red'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleExcluirAtividade(atividade.id);
                                            }}
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