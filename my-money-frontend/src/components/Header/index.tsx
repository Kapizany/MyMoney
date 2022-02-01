import { Avatar, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Portal, Text } from "@chakra-ui/react"
import { FaAngleDown, } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";
import { Logo } from "../Logo"


export const Header = () => {
  return (
    <Flex
      position="fixed"
      w="100vw"
      h="6vh"
      bg="gray.700"
      justifyContent="space-between"
      px="1rem"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 3px 5px,rgba(0, 0, 0, 0.4) 0px 5px 7px"
    >
      <Flex w="25vw" justifyContent="space-between" >
        <Logo stack="horizontal" logoImageSize="4vh" logoMSize="3vh" logoTextSize="2vh" logoTextColor="gray.50" />
      </Flex>
      <Flex alignItems="center">
        <ReactCountryFlag countryCode="GB" />
        <Text px="0.5rem">English</Text>
        <HeaderDropdownMenu />
        <Avatar size='sm' ml="2rem" />
        <Text mx="0.5rem">Name</Text>
        <HeaderDropdownMenu />
      </Flex>
    </Flex>
  )
}

export const HeaderDropdownMenu = () => {
  return (
    <Menu>
      <MenuButton>
        <Icon as={FaAngleDown} mt="0.5rem"/>
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuItem>Menu 1</MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuItem>Open Closed Tab</MenuItem>
          <MenuItem>Open File</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
}
