import React from 'react';
import { ChakraProvider, Box, Flex, Heading, Button, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ListarProjetos from './components/ListarProjetos';
import ModalNovoProjeto from './components/ModalNovoProjeto';
import './App.css';

function App() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const projetosRef = React.useRef();

    const handleNovoProjetoSave = () => {
        if (projetosRef.current) {
            projetosRef.current.fetchProjetos();
        }
        onClose();
    };

    return (
        <ChakraProvider>
            <Box>
                <Flex as="header" className="header">
                    <Heading className="header-heading">Gerenciador de Projetos Alex</Heading>
                </Flex>
                <Box className="page-container">
                    <ListarProjetos ref={projetosRef} />
                    <Button
                        className="new-project-button"
                        leftIcon={<AddIcon />}
                        colorScheme='teal'
                        size='lg'
                        variant='solid'
                        position="fixed"
                        onClick={onOpen}
                    >
                        Novo projeto
                    </Button>
                    <ModalNovoProjeto
                        isOpen={isOpen}
                        onClose={onClose}
                        onSave={handleNovoProjetoSave}
                    />
                </Box>
                
            </Box>
        </ChakraProvider>
    );
}

export default App;