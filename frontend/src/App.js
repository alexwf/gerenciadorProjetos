import React from 'react';
import {
    ChakraProvider,
    Box,
    Flex,
    Heading,
    Text,
    Grid,
    Card,
    CardHeader,
    CardBody,
    Image
  } from '@chakra-ui/react';

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
                    >
                        <Heading>Gerenciador de Projetos</Heading>
                    </Flex>
                    
                    <ListarProjetos />
                </Box>
            </div>
        </ChakraProvider>
    );
}

export default App;