import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Link,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { loginAPI } from "../api/login";
import { BackgroundScreen } from "../components/BackgroundScreen";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";
import { SingUpModal } from "../components/SingUpModal";


export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponseData, setErrorResponseData] = useState<any>({});
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const history = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleSignUpModalOnOpen(
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    onOpen();
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>,
      setFunction: (arg: string) => void) {
    setFunction(event.target.value);
  }

  async function handleSignIn(
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    if (invalidCredentials) setInvalidCredentials(false);

    await loginAPI.createToken({
      "username": username,
      "password": password,
    })
    .then((response) => {
      localStorage.setItem("mymoney_token", response.data.token);
      history("/dashboard");
    })
    .catch((error) => {
      setErrorResponseData(error.response.data);

      if (error.response.data.non_field_errors.length === 1
          && error.response.data.non_field_errors[0] === "Unable to log in with provided credentials.") {
        setInvalidCredentials(true);
      } else {
        console.log(error);
      }
    });
  }

  function handleInputKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("signInButton")?.click();
    }
  }

  return (
    <BackgroundScreen bg="gray.900">
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
          <Flex justifyContent="right">
            <Button
              type="submit"
              mt="0"
              color="gray.50"
              bgColor="dollar.500"
              width="fit-content"
              size="md"
              _hover={{bgColor: "dollar.600"}}
              _focus={{outline: "none"}}
              onClick={handleSignUpModalOnOpen}
            >
              Sign up
            </Button>
            <SingUpModal
              isOpen={isOpen}
              onClose={onClose}
              children={undefined}
            />
          </Flex>
          <Logo />
          <FormControl isInvalid={errorResponseData.username}>
            <FormLabel htmlFor="email" height="0px">Email address</FormLabel>
            <Input
              name="username"
              type="username"
              label="username"
              placeholder="Email"
              onChange={(event) => handleInput(event, setUsername)}
              onKeyDown={handleInputKeyDown}
            />
            {errorResponseData.username ? errorResponseData.username.map((errorMessage: string) => {
              return (
                <FormErrorMessage key={errorResponseData.username.indexOf(errorMessage)}>
                  {errorMessage}
                </FormErrorMessage>
              );
            }) : null}
          </FormControl>
          <FormControl isInvalid={errorResponseData.password}>
            <FormLabel htmlFor="password" height="0px">Password</FormLabel>
            <Input
              name="password"
              type="password"
              label="password"
              placeholder="Password"
              onChange={(event) => handleInput(event, setPassword)}
              onKeyDown={handleInputKeyDown}
            />
            {errorResponseData.password ? errorResponseData.password.map((errorMessage: string) => {
              return (
                <FormErrorMessage key={errorResponseData.password.indexOf(errorMessage)}>
                  {errorMessage}
                </FormErrorMessage>
              );
            }) : null}
          </FormControl>
        </Stack>
        <Flex justifyContent="right">
          <Link
            textAlign="right"
            mt="0.5rem"
            color="dollar.900"
            _hover={{textDecoration: "none"}}
          >
            Forgot password?
          </Link>
        </Flex>
        <Button
          id="signInButton"
          type="submit"
          mt="6%"
          color="gray.50"
          bgColor="dollar.500"
          size="lg"
          _hover={{bgColor: "dollar.600"}}
          _focus={{outline: "none"}}
          onClick={handleSignIn}
        >
          Sign in
        </Button>
        <InvalidCredentialsAlert invalidCredentials={invalidCredentials}/>
      </Flex>
    </BackgroundScreen>
  )
}

const InvalidCredentialsAlert = ({ invalidCredentials }: any) => {
  return invalidCredentials ? (
    <Alert status="error" mt="6" color="red">
      <AlertIcon />
      The email or password you entered is incorrect.
    </Alert>
  ) : null
};
