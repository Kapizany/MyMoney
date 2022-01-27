import { Avatar, Box, Flex, Icon, Stack, Text } from "@chakra-ui/react"
import { FaChartPie, FaStream, FaThList } from "react-icons/fa"


export const SideBarMenu: React.FC<{selectedPage: string}> = ({selectedPage}) => {
  const hoverStyle = {
    bgColor: "dollar.400",
  }
  return (
    <Flex
      position="fixed"
      w="17vw"
      h="94vh"
      bg="gray.800"
      mt="6vh"
      flexDirection="column"
    >
      <Stack w="100%" flexDirection="row" my="1rem">
        <Avatar size='sm' ml="1rem" mr="0.5rem"/>
        <Text>Name</Text>
      </Stack>
      <Stack w="100%" flexDirection="column" spacing="0">
        <Box
          bgColor={getSideBarMenuItemColor(selectedPage, "dashboard")}
          _hover={hoverStyle} py="0.3rem"
        >
          <Icon as={FaChartPie} ml="1rem" mr="0.5rem"/>
          Dashboard
        </Box>
        <Box
          bgColor={getSideBarMenuItemColor(selectedPage, "statement")}
          _hover={hoverStyle} py="0.3rem"
        >
          <Icon as={FaThList} ml="1rem" mr="0.5rem"/>
          Statement
        </Box>
        <Box
          bgColor={getSideBarMenuItemColor(selectedPage, "transactions")}
          _hover={hoverStyle} py="0.3rem"
        >
          <Icon as={FaStream} ml="1rem" mr="0.5rem"/>
          Transactions
        </Box>
      </Stack>
    </Flex>
  )
}

function getSideBarMenuItemColor(currentPage: string, itemName: string): string | undefined {
  return currentPage == itemName ? "dollar.500" : undefined
}
