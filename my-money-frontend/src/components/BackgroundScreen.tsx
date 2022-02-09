import { ChakraProvider, Flex } from "@chakra-ui/react";
import { BackgroundScreenProps } from "../interfaces/backgroundScreen";
import { theme } from "../styles/theme";


export const BackgroundScreen:React.FC<BackgroundScreenProps> = ({children, alignItems, justifyContent, bg}) => {
    return <ChakraProvider theme={theme}>
      <Flex
        w="100vw"
        h="100vh"
        bg={bg}
        alignItems={alignItems ? alignItems : "center"}
        justifyContent={justifyContent ? justifyContent : "center"}
      >
        {children}
      </Flex>
    </ChakraProvider>
};
