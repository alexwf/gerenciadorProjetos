import React, { useEffect, useImperativeHandle, forwardRef, useState } from 'react';
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
    Button
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import ListarAtividades from './ListarAtividades';
import useProjetos from '../hooks/useProjetos';

const ListarProjetos = forwardRef((props, ref) => {
    const { projetos, loading, error, fetchProjetos } = useProjetos();
    const [selectedProjeto, setSelectedProjeto] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure()

    useImperativeHandle(ref, () => ({
        fetchProjetos
    }));

    useEffect(() => {        
        fetchProjetos();
    }, [fetchProjetos]);

    const handleCardClick = (projeto) => {
        setSelectedProjeto(projeto);
        onOpen();
    }

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
                                <CircularProgress value={arredondarPercentual(projeto.perc_conclusao)} color='teal' size='115px'>
                                    <CircularProgressLabel>{arredondarPercentual(projeto.perc_conclusao)}%</CircularProgressLabel>
                                </CircularProgress>
                            </CardHeader>
                            <CardBody>
                                <Heading size="md">{projeto.nome}</Heading>
                                <Text mt={2}>Início: {formatDate(projeto.data_inicio)}</Text>
                                <Text mt={2}>Fim: {formatDate(projeto.data_fim)}</Text>
                                {projeto.atrasado ? <Text color="tomato" mt={2}>EM ATRASO</Text> : <Text color="teal" mt={2}>NO PRAZO</Text>}
                            </CardBody>
                        </Card>
                ))}
            </SimpleGrid>
            {selectedProjeto && (
                <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{selectedProjeto.nome}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text mt={2}>{arredondarPercentual(selectedProjeto.perc_conclusao)}%</Text>
                            <Progress colorScheme='teal' size='sm' value={arredondarPercentual(selectedProjeto.perc_conclusao)} />
                            <Text mt={2}>Início: {formatDate(selectedProjeto.data_inicio)} - Fim: {formatDate(selectedProjeto.data_fim)}</Text>
                            {selectedProjeto.atrasado ? <Text color="tomato" mt={2}>EM ATRASO</Text> : <Text color="teal" mt={2}>NO PRAZO</Text>}
                            {<ListarAtividades idProjeto={selectedProjeto.id} />}
                        </ModalBody>

                        <ModalFooter>
                            <Button leftIcon={<AddIcon />} variant='solid' colorScheme='teal' mr={3}>Nova atividade</Button>
                            <Button leftIcon={<DeleteIcon />} variant='solid' colorScheme='red'>Excluir projeto</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Box>
    );
});

export default ListarProjetos;