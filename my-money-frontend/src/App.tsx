import { Box, Button, ChakraProvider, Container, Icon, Input, Link, Heading } from '@chakra-ui/react'
import { theme } from './styles/theme';
import { FaDollarSign } from 'react-icons/fa';

function App() {
  return <ChakraProvider theme={theme}>
    <Box w="xl" mx="auto" mt="6rem" bgColor="gray.50">
      <Container pt="2rem" pb="2rem">
        <Box textAlign="center" color="dollar.500">
          <Icon boxSize="3.5rem" as={FaDollarSign} />
          <Heading fontSize="1.4rem">
          M<Box fontSize="1.2rem" display="inline" color="dollar.900">y</Box>M<Box fontSize="1.2rem" display="inline" color="dollar.900">oney</Box>
          </Heading>
        </Box>
        
      </Container>
      <Container>
        <Input placeholder='Email' />
      </Container>
      <Container>
        <Input placeholder='Senha' />
      </Container>
      <Container><Button bgColor="dollar.500">LOGIN</Button></Container>
      <Container><Link>Esqueceu?</Link></Container>
    </Box>
  </ChakraProvider> 
}

export default App;
