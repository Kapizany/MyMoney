import { ChakraProvider, Flex } from "@chakra-ui/react";
import { theme } from "../styles/theme";


export const BackgroundScreen:React.FC<{children:React.ReactChild}> = ({children}) => {
    return <ChakraProvider theme={theme}>
      <Flex
        w="100vw"
        h="100vh"
        alignItems="center"
        justifyContent="center"
      >
        {children}
      </Flex>
    </ChakraProvider>
}
