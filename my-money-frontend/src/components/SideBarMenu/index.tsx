import { Avatar, Box, Flex, Icon, LinkBox, Stack, Text } from "@chakra-ui/react"
import { FaChartPie, FaStream, FaThList } from "react-icons/fa"
import { useNavigate } from "react-router-dom"


export const SideBarMenu: React.FC<{selectedPage: string}> = ({selectedPage}) => {
  const hoverStyle = {
    bgColor: "dollar.400",
  }
  const history = useNavigate();
  return (
    <Flex
      position="fixed"
      w="17vw"
      h="94vh"
      bg="gray.800"
      mt="6vh"
      flexDirection="column"
      boxShadow="7px 1px 5px -3px rgba(0,0,0,0.4)"
    >
      <Stack w="100%" flexDirection="row" my="1rem">
        <Avatar size='sm' ml="1rem" mr="0.5rem"/>
        <Text>Name</Text>
      </Stack>
      <Stack w="100%" flexDirection="column" spacing="0">
        <Box
          bgColor={getSideBarMenuItemColor(selectedPage, "dashboard")}
          _hover={hoverStyle} py="0.3rem"
          onClick={() => history("/dashboard")}
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
        <LinkBox>
          <Box
            bgColor={getSideBarMenuItemColor(selectedPage, "transactions")}
            _hover={hoverStyle} py="0.3rem"
            onClick={() => history("/transactions")}
          >
            <Icon as={FaStream} ml="1rem" mr="0.5rem"/>
            Transactions
          </Box>
        </LinkBox>
      </Stack>
    </Flex>
  )
}

function getSideBarMenuItemColor(currentPage: string, itemName: string): string | undefined {
  return currentPage == itemName ? "dollar.500" : undefined
}
