import { Box, Button, ChakraProvider, Icon, Input as ChakraInput, InputProps as ChakraInputProps, Link, Heading, Flex, Stack, FormControl, FormLabel } from '@chakra-ui/react'
import { theme } from './styles/theme';
import { FaDollarSign } from 'react-icons/fa';

interface InputProps extends ChakraInputProps {
  name:string;
  label?: string;
};

function App() {
  return <ChakraProvider theme={theme}>
     <Flex
        w="100vw"
        h="100vh"
        alignItems="center"
        justifyContent="center">
      <Flex
        as="form"
        width="100%"
        maxWidth="24rem"
        bg="gray.50"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing={4}>
          <Box textAlign="center" color="dollar.500">
            <Icon boxSize="3.5rem" as={FaDollarSign} />
            <Heading fontSize="1.4rem">
            M<Box fontSize="1.2rem" display="inline" color="dollar.900">y</Box>M<Box fontSize="1.2rem" display="inline" color="dollar.900">oney</Box>
            </Heading>
          </Box>
          <Input name="email" type="email" label="E-mail" />
          <Input name="password" type="password" label="Senha" />

        </Stack> 
        <Link textAlign="right" mt="0.5rem" color="dollar.900">Esqueceu a senha?</Link>  

        <Button 
          type="submit" 
          mt="6" 
          color="gray.50"
          bgColor="dollar.500" 
          size="lg" 
          _hover={{
            bgColor:'dollar.600'
            }} 
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  </ChakraProvider> 
}

export function Input({name, label, ...rest}:InputProps){
  return (
      <FormControl>
          <ChakraInput
              name={name}
              id={name}
              placeholder={label}
              textColor="dollar.900"
              borderColor="dollar.500"
              focusBorderColor="dollar.500"
              bgColor="gray.50"
              variant="flushed"
              _hover={{
              bgColor:'gray.50'
              }}
              size="lg"
              {...rest}
          />
      </FormControl>
  );
}

export default App;
