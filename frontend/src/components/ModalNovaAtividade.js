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
    useToast,
    Checkbox
} from '@chakra-ui/react';
import { criarAtividade } from '../api/apiService';

const ModalNovaAtividade = ({ isOpen, onClose, idProjeto, onSave }) => {
    const nomeRef = useRef();
    const dataInicioRef = useRef();
    const dataFimRef = useRef();
    const finalizadaRef = useRef(false);

    const toast = useToast();

    const handleSave = async () => {
        try {
            await criarAtividade({
                id_projeto: idProjeto,
                nome: nomeRef.current.value,
                data_inicio: dataInicioRef.current.value,
                data_fim: dataFimRef.current.value,
                finalizada: finalizadaRef.current
            });

            toast({
                title: 'Atividade criada com sucesso!',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            onSave();
            onClose();
        } catch (error) {
            toast({
                title: 'Erro ao criar atividade',
                description: error.error ? error.error : "Houve um erro ao criar a atividade.",
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
        finalizadaRef.current = false;
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
                <ModalHeader>Nova atividade</ModalHeader>
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

                    <FormControl mt={4}>
                            <Checkbox
                                colorScheme='teal'
                                onChange={(e) => finalizadaRef.current = e.target.checked}
                            >
                                Finalizada?
                            </Checkbox>
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

export default ModalNovaAtividade;