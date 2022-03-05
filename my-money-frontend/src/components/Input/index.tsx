import { FormControl, Input as ChakraInput } from "@chakra-ui/react";
import { InputProps } from "../../interfaces/login";


export function Input({ name, placeholder, ...rest }: InputProps) {
  return (
    <FormControl>
      <ChakraInput
        name={name}
        id={name}
        placeholder={placeholder}
        _placeholder={{ color: "dollar.900" }}
        textColor="dollar.900"
        borderColor="dollar.500"
        focusBorderColor="dollar.500"
        bgColor="gray.50"
        variant="flushed"
        _hover={{
          bgColor: 'gray.50',
        }}
        size="lg"
        {...rest}
      />
    </FormControl>
  );
}
