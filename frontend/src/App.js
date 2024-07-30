import React from 'react';
import {
    ChakraProvider,
    Box,
    Flex,
    Heading,
    Button,
    useDisclosure
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ListarProjetos from './components/ListarProjetos';
import ModalNovoProjeto from './components/ModalNovoProjeto';

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
                <Flex
                    as="header"
                    direction="column"
                    align="center"
                    justify="center"
                    bg="teal.500"
                    color="white"
                    p={10}
                    textAlign="center"
                    mb={4}
                >
                    <Heading>Gerenciador de Projetos</Heading>
                </Flex>
                <Box p={10}>
                    <ListarProjetos ref={projetosRef} />
                    <Button
                        leftIcon={<AddIcon />}
                        colorScheme='teal'
                        size='lg'
                        variant='solid'
                        position="fixed"
                        bottom={4}
                        right={4}
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