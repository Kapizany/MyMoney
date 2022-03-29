import {InputProps as ChakraInputProps} from '@chakra-ui/react';


export interface InputProps extends ChakraInputProps {
  name: string;
  placeholder?: string;
  label?:string;
};
