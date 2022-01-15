import { Box, Button, ChakraProvider, Icon, Input as ChakraInput, InputProps as ChakraInputProps, Link, Heading, Flex, Stack, FormControl, FormLabel } from '@chakra-ui/react'
import { theme } from './styles/theme';
import { FaDollarSign } from 'react-icons/fa';
import { useState } from 'react';
import { loginAPI } from './api/login';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
};

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleInput(event: React.ChangeEvent<HTMLInputElement>, setFunction: (arg: string) => void) {
    setFunction(event.target.value)
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    event.preventDefault();
    const response = await loginAPI.createToken({
      "username":username,
      "password":password,
    })
    localStorage.setItem("mymoney_token",response.data.token)
  }

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
          <Input 
            name="username" 
            type="username" 
            label="Usuário" 
            onChange={(event) => handleInput(event, setUsername)} 
          />
          <Input 
            name="password" 
            type="password" 
            label="Senha" 
            onChange={(event) => handleInput(event, setPassword)} 
          />

        </Stack>
        <Link textAlign="right" mt="0.5rem" color="dollar.900">Esqueceu a senha?</Link>

        <Button
          type="submit"
          mt="6"
          color="gray.50"
          bgColor="dollar.500"
          size="lg"
          _hover={{
            bgColor: 'dollar.600'
          }}
          onClick={handleSubmit}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  </ChakraProvider>
}

export function Input({ name, label, ...rest }: InputProps) {
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
          bgColor: 'gray.50'
        }}
        size="lg"
        {...rest}
      />
    </FormControl>
  );
}

export default App;
