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
    Link
} from '@chakra-ui/react';
import ListarAtividades from './ListarAtividades';

const ListarProjetos = () => {
    const [projetos, setProjetos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProjeto, setSelectedProjeto] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure()

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

    const handleCardClick = (projeto) => {
        setSelectedProjeto(projeto);
        onOpen();
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Box mb={10}>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
                {projetos.map(projeto => (
                    <Link
                        _hover={{
                            textDecoration: 'none'
                        }}
                    >
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
                            }}
                        >
                            <CardHeader>
                                <CircularProgress value={arredondarPercentual(projeto.perc_conclusao)} color='teal' size='115px'>
                                    <CircularProgressLabel>{arredondarPercentual(projeto.perc_conclusao)}%</CircularProgressLabel>
                                </CircularProgress>
                            </CardHeader>
                            <CardBody>
                                <Heading size="md">{`${projeto.id} - ${projeto.nome}`}</Heading>
                                <Text mt={2}>Início: {formatDate(projeto.data_inicio)}</Text>
                                <Text mt={2}>Fim: {formatDate(projeto.data_fim)}</Text>
                                {projeto.atrasado ? <Text color="tomato" mt={2}>EM ATRASO</Text> : <Text color="teal" mt={2}>NO PRAZO</Text>}
                            </CardBody>
                        </Card>
                    </Link>
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
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Fechar
                            </Button>
                            <Button variant='ghost'>Nova atividade</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Box>
    );
};

export default ListarProjetos;