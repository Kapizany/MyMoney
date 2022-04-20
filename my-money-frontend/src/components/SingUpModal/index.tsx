import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
} from "@chakra-ui/react";
import { loginAPI } from "../../api/login";
import { Input } from "../Input";


export function SingUpModal({ isOpen, onClose }: ModalProps) {
  const [errorResponseData, setErrorResponseData] = useState<any>({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useNavigate();

  function handleSignUp() {
    loginAPI.createAccount({
      "username": username,
      "email": email,
      "first_name": firstName,
      "last_name": lastName,
      "password": password,
      "password2": confirmPassword,
    })
    .then(
      (_) => {
        onClose();
        resetSignUpModalInputs();
        handleNewAccountSignIn(email, password);
      }
    )
    .catch(
      (error) => {
        setErrorResponseData(error.response.data);
      }
    );
  }

  function resetSignUpModalInputs() {
    setErrorResponseData({});
    setUsername("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
  }

  function handleNewAccountSignIn(email: string, password: string) {
    loginAPI.createToken({
      "username": email,
      "password": password,
    })
    .then((response) => {
      localStorage.setItem("mymoney_token", response.data.token);
      history("/dashboard");
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function handleInputKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("createAccountButton")?.click();
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onEsc={resetSignUpModalInputs}
        onOverlayClick={resetSignUpModalInputs}
      >
        <ModalOverlay />
        <ModalContent bgColor="gray.50">
          <ModalHeader color="dollar.900">
            Sign up
          </ModalHeader>
          <ModalCloseButton
            bgColor="#d0312d"
            color="gray.50"
            _hover={{bgColor: "#ff0000"}}
            _focus={{outline: "none"}}
            onClick={resetSignUpModalInputs}
          />
          <ModalBody>
            <Stack>
              <FormControl isInvalid={errorResponseData.username}>
                <FormLabel htmlFor="username" height="0px">Username</FormLabel>
                <Input
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
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
              <FormControl isInvalid={errorResponseData.email}>
                <FormLabel htmlFor="email" height="0px">Email address</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  onKeyDown={handleInputKeyDown}
                />
                {errorResponseData.email ? errorResponseData.email.map((errorMessage: string) => {
                  return (
                    <FormErrorMessage key={errorResponseData.email.indexOf(errorMessage)}>
                      {errorMessage}
                    </FormErrorMessage>
                  );
                }) : null}
              </FormControl>
              <Flex justifyContent="space-between">
                <FormControl isInvalid={errorResponseData.first_name}>
                  <FormLabel htmlFor="firstName" height="0px">First name</FormLabel>
                  <Input
                    width="95%"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                    onKeyDown={handleInputKeyDown}
                  />
                  {errorResponseData.first_name ? errorResponseData.first_name.map((errorMessage: string) => {
                    return (
                      <FormErrorMessage key={errorResponseData.first_name.indexOf(errorMessage)}>
                        {errorMessage}
                      </FormErrorMessage>
                    );
                  }) : null}
                </FormControl>
                <FormControl isInvalid={errorResponseData.last_name}>
                  <FormLabel htmlFor="lastName" height="0px">Last name</FormLabel>
                  <Input
                    ml="5%"
                    width="95%"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                    onKeyDown={handleInputKeyDown}
                  />
                  {errorResponseData.last_name ? errorResponseData.last_name.map((errorMessage: string) => {
                    return (
                      <FormErrorMessage key={errorResponseData.last_name.indexOf(errorMessage)}>
                        {errorMessage}
                      </FormErrorMessage>
                    );
                  }) : null}
                </FormControl>
              </Flex>
              <FormControl isInvalid={errorResponseData.password}>
                <FormLabel htmlFor="password" height="0px">Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
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
              <FormControl isInvalid={errorResponseData.password2}>
                <FormLabel htmlFor="confirmPassword" height="0px">Confirm Password</FormLabel>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                  onKeyDown={handleInputKeyDown}
                />
                {errorResponseData.password2 ? errorResponseData.password2.map((errorMessage: string) => {
                  return (
                    <FormErrorMessage key={errorResponseData.password2.indexOf(errorMessage)}>
                      {errorMessage}
                    </FormErrorMessage>
                  );
                }) : null}
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              id="createAccountButton"
              bgColor="dollar.500"
              color="gray.50"
              _hover={{bgColor: "dollar.600"}}
              _focus={{outline: "none"}}
              onClick={handleSignUp}
            >
              Create account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
