import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Modal,
  ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
  ModalOverlay, ModalProps, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { loginAPI } from "../../api/login";
import { Input } from "../Input";


export const SingUpModal:React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorResponseData, setErrorResponseData] = useState<any>({});

  function handleSignUp() {
    loginAPI.createAccount({
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
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
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
};
