import React from 'react';
import {
    ChakraProvider,
    Box,
    Flex,
    Heading,
    Button
  } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ListarProjetos from './components/ListarProjetos';

function App() {
    return (
        <ChakraProvider>
            <div className="App">
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
                        <ListarProjetos/>
                        <Button leftIcon={<AddIcon />} colorScheme='teal' size='lg' variant='solid'>Novo projeto</Button>
                    </Box>
                </Box>
            </div>
        </ChakraProvider>
    );
}

export default App;