import { ChakraProvider, Flex } from "@chakra-ui/react";
import { BackgroundScreenProps } from "../interfaces/backgroundScreen";
import { theme } from "../styles/theme";


export const BackgroundScreen:React.FC<BackgroundScreenProps> = ({children, alignItems, justifyContent}) => {
    return <ChakraProvider theme={theme}>
      <Flex
        alignItems={alignItems ? alignItems : "center"}
        justifyContent={justifyContent ? justifyContent : "center"}
      >
        {children}
      </Flex>
    </ChakraProvider>
};
