import React, { useRef } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast
} from '@chakra-ui/react';
import { criarProjeto } from '../api/apiService';
import useProjetos from '../hooks/useProjetos';

const ModalNovoProjeto = ({ isOpen, onClose, onSave }) => {
    const nomeRef = useRef();
    const dataInicioRef = useRef();
    const dataFimRef = useRef();
    const { fetchProjetos } = useProjetos(onClose);
    
    const toast = useToast();

    const handleSave = async () => {
        try {
            await criarProjeto({
                nome: nomeRef.current.value,
                data_inicio: dataInicioRef.current.value,
                data_fim: dataFimRef.current.value,
            });

            toast({
                title: 'Projeto criado com sucesso!',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            fetchProjetos();
            onSave();
        } catch (error) {
            toast({
                title: 'Erro ao criar projeto',
                description: error.error ? error.error : "Houve um erro ao criar o projeto.",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
        }
    };

    const handleClose = () => {
        nomeRef.current.value = '';
        dataInicioRef.current.value = '';
        dataFimRef.current.value = '';
        onClose();
    };

    return (
        <Modal
            initialFocusRef={nomeRef}
            isOpen={isOpen}
            onClose={handleClose}
            isCentered
            size="xl"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Novo projeto</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl isRequired>
                        <FormLabel>Nome</FormLabel>
                        <Input
                            ref={nomeRef}
                            placeholder='Nome'
                        />
                    </FormControl>

                    <FormControl mt={4} isRequired>
                        <FormLabel>Início</FormLabel>
                        <Input
                            ref={dataInicioRef}
                            placeholder='Início'
                            size='md'
                            type='date'
                        />
                    </FormControl>

                    <FormControl mt={4} isRequired>
                        <FormLabel>Fim</FormLabel>
                        <Input
                            ref={dataFimRef}
                            placeholder='Fim'
                            size='md'
                            type='date'
                        />
                    </FormControl>
                    
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='teal' onClick={handleSave} mr={3}>
                        Salvar
                    </Button>
                    <Button onClick={handleClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalNovoProjeto;