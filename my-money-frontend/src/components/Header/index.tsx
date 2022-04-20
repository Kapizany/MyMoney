import { useNavigate } from "react-router-dom";
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
import { HeaderProps } from "../../interfaces/header";


export function Header({ username }: HeaderProps) {
  return (
    <Flex
      position="fixed"
      zIndex="12" // only works with >= 12
      left="0"
      right="0"
      h="6vh"
      bgColor="gray.700"
      justifyContent="space-between"
      px="1rem"
      boxShadow="0px 7px 5px -4px rgba(0,0,0,0.4)"
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
        <Text mx="0.5rem">{username}</Text>
        <AccountDropdownMenu />
      </Flex>
    </Flex>
  );
}


function LanguageDropdownMenu() {
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
}


function AccountDropdownMenu() {
  const history = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("mymoney_token");
    history("/login");
  };

  return (
    <Menu>
      <MenuButton>
        <Icon as={FaAngleDown} mt="0.5rem" ml="-0.25rem" />
      </MenuButton>
      <MenuList bgColor="gray.50" color="dollar.900">
        <MenuItem>Manage account</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Help</MenuItem>
        <MenuItem
          onClick={handleSignOut}
        >
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
