import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Link, Flex, Stack} from '@chakra-ui/react';
import { loginAPI } from '../api/login';
import { BackgroundScreen } from '../components/BackgroundScreen';
import { Input } from '../components/Input';
import { Logo } from '../components/Logo';


export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();

  function handleInput(event: React.ChangeEvent<HTMLInputElement>,
      setFunction: (arg: string) => void) {
    setFunction(event.target.value)
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement,
      MouseEvent>){
    event.preventDefault();
    const response = await loginAPI.createToken({
      "username":username,
      "password":password,
    });
    localStorage.setItem("mymoney_token",response.data.token);
    history("/dashboard");
  }

  return <BackgroundScreen bg="gray.900">
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
        <Logo />
        <Input
          name="username"
          type="username"
          label="username"
          placeholder="Email"
          onChange={(event) => handleInput(event, setUsername)}
        />
        <Input
          name="password"
          type="password"
          label="password"
          placeholder="Password"
          onChange={(event) => handleInput(event, setPassword)}
        />
      </Stack>
      <Link
        textAlign="right"
        mt="0.5rem"
        color="dollar.900"
        _hover={{textDecoration: "none"}}
      >
        Forgot password?
      </Link>

      <Button
        type="submit"
        mt="6"
        color="gray.50"
        bgColor="dollar.500"
        size="lg"
        _hover={{bgColor: 'dollar.600'}}
        _focus={{outline: "none"}}
        onClick={handleSubmit}
      >
        Sign in
      </Button>
    </Flex>
  </BackgroundScreen>
}
