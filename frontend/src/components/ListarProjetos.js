import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { formatDate } from '../utils/dateUtils';
import { arredondarPercentual } from '../utils/mathUtils';
import {
    Box,
    Heading,
    Text,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    Progress,
    CircularProgress,
    CircularProgressLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Tag,
    TagLeftIcon,
    TagLabel
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, CheckCircleIcon, TimeIcon } from '@chakra-ui/icons';
import ListarAtividades from './ListarAtividades';
import useProjetos from '../hooks/useProjetos';
import ModalNovaAtividade from './ModalNovaAtividade';

const ListarProjetos = forwardRef((props, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { projetos, loading, error, fetchProjetos, fetchProjeto, excluirProjeto } = useProjetos(onClose);
    const [selectedProjeto, setSelectedProjeto] = useState(null);
    const [isActivityModalOpen, setActivityModalOpen] = useState(false);
    const [modalKey, setModalKey] = useState(0);
    const atividadesRef = React.useRef();

    useImperativeHandle(ref, () => ({
        fetchProjetos
    }));

    const handleCardClick = (projeto) => {
        setSelectedProjeto(projeto);
        onOpen();
    }

    const handleOpenActivityModal = () => {
        setActivityModalOpen(true);
    };

    const handleCloseActivityModal = () => {
        setActivityModalOpen(false);
    };

    const handleNovaAtividadeSave = async () => {
        if (atividadesRef.current) {
            atividadesRef.current.fetchAtividades();
        }
        await fetchProjetos();
        if (selectedProjeto) {
            const projetoAtualizado = await fetchProjeto(selectedProjeto.id);
            setSelectedProjeto(projetoAtualizado);
            setModalKey(prevKey => prevKey + 1);
        }
        handleCloseActivityModal();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Box mb={10}>
            <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={4}>
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
                        onClick={() => handleCardClick(projeto)}
                        transition="border 0.2s"
                        border="2px solid transparent"
                        _hover={{
                            border: '2px solid teal',
                            cursor: 'pointer'
                        }}
                    >
                        <CardHeader>
                            <CircularProgress value={arredondarPercentual(projeto.perc_conclusao)} color={projeto.atrasado ? "red" : "teal"} size='115px'>
                                <CircularProgressLabel>{arredondarPercentual(projeto.perc_conclusao)}%</CircularProgressLabel>
                            </CircularProgress>
                        </CardHeader>
                        <CardBody>
                            <Heading size="md">{projeto.nome}</Heading>
                            <Text mt={2}>Início: {formatDate(projeto.data_inicio)}</Text>
                            <Text mt={2}>Fim: {formatDate(projeto.data_fim)}</Text>
                            <Box pt='2'>
                                {
                                    projeto.atrasado ?
                                        <Tag variant='subtle' colorScheme='red'>
                                            <TagLeftIcon boxSize='12px' as={TimeIcon} />
                                            <TagLabel>EM ATRASO</TagLabel>
                                        </Tag>
                                        :
                                        <Tag variant='subtle' colorScheme='teal'>
                                            <TagLeftIcon boxSize='12px' as={CheckCircleIcon} />
                                            <TagLabel>NO PRAZO</TagLabel>
                                        </Tag>
                                }
                            </Box>
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
            {selectedProjeto && (
                <Modal key={modalKey} isOpen={isOpen} onClose={onClose} isCentered size="xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader pb={0}>{selectedProjeto.nome}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pt={0}>
                            <Text mt={2}>{arredondarPercentual(selectedProjeto.perc_conclusao)}%</Text>
                            <Progress colorScheme={selectedProjeto.atrasado ? "red" : "teal"} size='sm' value={arredondarPercentual(selectedProjeto.perc_conclusao)} />
                            <Text mt={2}>Início: {formatDate(selectedProjeto.data_inicio)} - Fim: {formatDate(selectedProjeto.data_fim)}</Text>
                            {selectedProjeto.atrasado ? <Text color="red" mt={2}>EM ATRASO</Text> : <Text color="teal" mt={2}>NO PRAZO</Text>}
                            <ListarAtividades idProjeto={selectedProjeto.id} ref={atividadesRef} />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                leftIcon={<AddIcon />}
                                variant='solid'
                                colorScheme='teal'
                                mr={3}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenActivityModal();
                                }}
                            >
                                Nova atividade
                            </Button>
                            <Button
                                leftIcon={<DeleteIcon />}
                                variant='solid'
                                colorScheme='red'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    excluirProjeto(selectedProjeto.id);
                                }}
                            >
                                Excluir projeto
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
            {selectedProjeto && (
                <ModalNovaAtividade
                    isOpen={isActivityModalOpen}
                    onClose={handleCloseActivityModal}
                    idProjeto={selectedProjeto.id}
                    onSave={handleNovaAtividadeSave}
                />
            )}
        </Box>
    );
});

export default ListarProjetos;
