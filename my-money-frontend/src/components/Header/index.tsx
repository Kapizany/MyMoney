import {
  Avatar,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FaAngleDown } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";
import { Logo } from "../Logo";


export const Header = () => {
  return (
    <Flex
      position="fixed"
      zIndex="1"
      left="0"
      right="0"
      h="6vh"
      bgColor="gray.700"
      justifyContent="space-between"
      px="1rem"
      boxShadow="0px 7px 5px -4px rgba(0,0,0,0.4)" // "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 3px 5px,rgba(0, 0, 0, 0.4) 0px 5px 7px"
    >
      <Logo
        stack="horizontal"
        logoImageSize="4vh"
        logoMSize="3vh"
        logoTextSize="2vh"
        logoTextColor="gray.50"
      />
      <Flex alignItems="center">
        <ReactCountryFlag countryCode="GB" />
        <Text px="0.5rem">English</Text>
        <LanguageDropdownMenu />
        <Avatar size="sm" ml="3rem" />
        <Text mx="0.5rem">Name</Text>
        <AccountDropdownMenu />
      </Flex>
    </Flex>
  );
};

const LanguageDropdownMenu = () => {
  return (
    <Menu>
      <MenuButton>
        <Icon as={FaAngleDown} mt="0.5rem" ml="-0.25rem" />
      </MenuButton>
      <MenuList bgColor="gray.50" color="dollar.900">
        <MenuItem>
          <ReactCountryFlag countryCode="BR" />
          <Text px="0.5rem">Portuguese</Text>
        </MenuItem>
        <MenuItem>
          <ReactCountryFlag countryCode="ES" />
          <Text px="0.5rem">Spanish</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const AccountDropdownMenu = () => {
  return (
    <Menu>
      <MenuButton>
        <Icon as={FaAngleDown} mt="0.5rem" ml="-0.25rem" />
      </MenuButton>
      <MenuList bgColor="gray.50" color="dollar.900">
        <MenuItem>Manage account</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Help</MenuItem>
        <MenuItem>Sign out</MenuItem>
      </MenuList>
    </Menu>
  );
};
