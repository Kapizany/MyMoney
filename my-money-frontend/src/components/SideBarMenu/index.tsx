import { Avatar, Flex, Icon, LinkBox, Text } from "@chakra-ui/react"
import { FaChartPie, FaStream, FaThList } from "react-icons/fa"
import { useNavigate } from "react-router-dom"


export const SideBarMenu: React.FC<{selectedPage: string}> = ({selectedPage}) => {
  const hoverStyle = {
    bgColor: "dollar.400",
    cursor: "pointer",
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
      boxShadow="7px 0px 5px -4px rgba(0,0,0,0.4)" // "7px 1px 5px -3px rgba(0,0,0,0.4)"
    >
      <Flex w="100%" flexDirection="row" my="1rem" alignItems="center">
        <Avatar size='sm' ml="1rem" mr="0.5rem"/>
        <Text >Name</Text>
      </Flex>
      <Flex w="100%" flexDirection="column" spacing="0">
        <Flex
          bgColor={getSideBarMenuItemColor(selectedPage, "dashboard")}
          _hover={hoverStyle} py="0.3rem"
          onClick={() => history("/dashboard")}
          alignItems="center"
        >
          <Icon as={FaChartPie} ml="1rem" mr="0.5rem"/>
          Dashboard
        </Flex>
        <Flex
          bgColor={getSideBarMenuItemColor(selectedPage, "statement")}
          _hover={hoverStyle} py="0.3rem"
          alignItems="center"
        >
          <Icon as={FaThList} ml="1rem" mr="0.5rem"/>
          Statement
        </Flex>
        <LinkBox>
          <Flex
            bgColor={getSideBarMenuItemColor(selectedPage, "transactions")}
            _hover={hoverStyle} py="0.3rem"
            onClick={() => history("/transactions")}
            alignItems="center"
          >
            <Icon as={FaStream} ml="1rem" mr="0.5rem"/>
            Transactions
          </Flex>
        </LinkBox>
      </Flex>
    </Flex>
  )
}

function getSideBarMenuItemColor(currentPage: string, itemName: string): string | undefined {
  return currentPage === itemName ? "dollar.500" : undefined
}
