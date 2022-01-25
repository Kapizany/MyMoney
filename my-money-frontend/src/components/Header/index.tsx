import { Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Portal, Text } from "@chakra-ui/react"
import { FaAngleDown } from "react-icons/fa";
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
    >
      <Flex w="25vw" justifyContent="space-between">
        <Flex>
            <Logo stack="horizontal" logoImageSize="4vh" logoMSize="3vh" logoTextSize="2vh" logoTextColor="gray.50" />
        </Flex>
        <Flex>
            um dois
        </Flex>
      </Flex>
      <Flex pr="1rem">
      <ReactCountryFlag countryCode="GB" />
        <Text px="1rem">English</Text>
        < HeaderDropdownMenu />
      </Flex>
    </Flex>
  )
}

export const HeaderDropdownMenu = () => {
  return (
    <Menu>
      <MenuButton>
        <Icon as={FaAngleDown} />
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