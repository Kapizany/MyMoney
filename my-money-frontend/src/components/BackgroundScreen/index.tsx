import { ChakraProvider, Flex } from "@chakra-ui/react";
import { BackgroundScreenProps } from "../../interfaces/backgroundScreen";
import { theme } from "../../styles/theme";


export function BackgroundScreen(
    { children, alignItems, justifyContent, bg }: BackgroundScreenProps) {
  return (
    <ChakraProvider theme={theme}>
      <Flex
        id="background-screen-component"
        h="100vh"
        alignItems={alignItems ? alignItems : "center"}
        justifyContent={justifyContent ? justifyContent : "center"}
        bg={bg}
      >
        {children}
      </Flex>
    </ChakraProvider>
  );
}
