import { useNavigate } from "react-router-dom";
import { FaChartPie, FaStream, FaThList } from "react-icons/fa";
import { Avatar, Flex, Icon, LinkBox, Text } from "@chakra-ui/react";
import { SideBarMenuProps } from "../../interfaces/sideBarMenu";


export function SideBarMenu({ selectedPage, fullName }: SideBarMenuProps) {
  const history = useNavigate();

  const hoverStyle = {
    bgColor: "dollar.600",
    cursor: "pointer",
  };

  return (
    <Flex
      position="fixed"
      w="17vw"
      h="94vh"
      bg="gray.800"
      mt="6vh"
      flexDirection="column"
      boxShadow="7px 0px 5px -4px rgba(0,0,0,0.4)"
    >
      <Flex
        id="avatar-and-name-container"
        w="100%"
        flexDirection="row"
        my="1rem"
        alignItems="center"
      >
        <Avatar size='sm' ml="1rem" mr="0.5rem" />
        <Text>{fullName}</Text>
      </Flex>
      <Flex w="100%" flexDirection="column" spacing="0">
        <Flex
          py="0.3rem"
          alignItems="center"
          bgColor={getSideBarMenuItemColor(selectedPage, "dashboard")}
          _hover={hoverStyle}
          onClick={() => history("/dashboard")}
        >
          <Icon as={FaChartPie} ml="1rem" mr="0.5rem" />
          Dashboard
        </Flex>
        <Flex
          py="0.3rem"
          alignItems="center"
          bgColor={getSideBarMenuItemColor(selectedPage, "statement")}
          _hover={hoverStyle}
        >
          <Icon as={FaThList} ml="1rem" mr="0.5rem" />
          Statement
        </Flex>
        <LinkBox>
          <Flex
            py="0.3rem"
            alignItems="center"
            bgColor={getSideBarMenuItemColor(selectedPage, "transactions")}
            _hover={hoverStyle}
            onClick={() => history("/transactions")}
          >
            <Icon as={FaStream} ml="1rem" mr="0.5rem" />
            Transactions
          </Flex>
        </LinkBox>
      </Flex>
    </Flex>
  )
}

function getSideBarMenuItemColor(
    currentPage: string,
    itemName: string,
  ): string | undefined {
  return (
    currentPage === itemName ? "dollar.500" : undefined
  );
}
