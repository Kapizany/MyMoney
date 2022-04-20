import { FaAngleDown } from "react-icons/fa";
import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { PaginationProps } from "../../interfaces/pagination";


export function Pagination({
    pageSize,
    setPageSize,
    setFirstPage,
    decreasePageByOne,
    currentPage,
    lastPage,
    increasePageByOne,
    setLastPage,
    setLoadingToTrue,
    updateData,
  }: PaginationProps) {
  return (
    <Flex
      mt="1rem"
      mx="1rem"
      pb="1rem"
      justifyContent="center"
    >
      <Button
        size="sm"
        mr="0.5rem"
        px="-0.5rem"
        bgColor="gray.50"
        boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
        color="dollar.900"
        _hover={{bgColor: "dollar.600"}}
        _focus={{outline: "none"}}
        onClick={() => {
          if (currentPage !== 1) {
            setFirstPage();
            setLoadingToTrue();
            updateData();
          }
        }}
      >
        {'<<'}
      </Button>
      <Button
        size="sm"
        bgColor="gray.50"
        boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
        color="dollar.900"
        _hover={{bgColor: "dollar.600"}}
        _focus={{outline: "none"}}
        onClick={() => {
          if (currentPage > 1) {
            decreasePageByOne();
            setLoadingToTrue();
            updateData();
          }
        }}
      >
        {'<'}
      </Button>
      <Flex
        h="2rem"
        mx="0.5rem"
        px="0.5rem"
        alignItems="center"
        bgColor="gray.50"
        borderRadius="md"
        boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
        color="dollar.900"
      >
        Page {currentPage}/{lastPage ? lastPage : currentPage}
      </Flex>
      <Button
        size="sm"
        bgColor="gray.50"
        boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
        color="dollar.900"
        _hover={{bgColor: "dollar.600"}}
        _focus={{outline: "none"}}
        onClick={() => {
          if (currentPage < lastPage) {
            increasePageByOne();
            setLoadingToTrue();
            updateData();
          }
        }}
      >
        {'>'}
      </Button>
      <Button
        size="sm"
        mx="0.5rem"
        px="-0.5rem"
        bgColor="gray.50"
        boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
        color="dollar.900"
        _hover={{bgColor: "dollar.600"}}
        _focus={{outline: "none"}}
        onClick={() => {
          if (currentPage !== lastPage) {
            setLastPage();
            setLoadingToTrue();
            updateData();
          }
        }}
      >
        {'>>'}
      </Button>
      <Menu>
        <MenuButton>
          <Flex
            h="2rem"
            px="0.5rem"
            alignItems="center"
            bgColor="gray.50"
            borderRadius="md"
            boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
            color="dollar.900"
          >
            <Flex mr="0.5rem">Page size: {pageSize}</Flex>
            <Icon as={FaAngleDown} />
          </Flex>
        </MenuButton>
        <MenuList
          bgColor="gray.50"
          color="dollar.900"
        >
          <MenuItem
            onClick={() => {
              if (pageSize !== 5) {
                setPageSize(5);
                setFirstPage();
                setLoadingToTrue();
                updateData();
              }
            }}
          >
            5
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (pageSize !== 10) {
                setPageSize(10);
                setFirstPage();
                setLoadingToTrue();
                updateData();
              }
            }}
          >
            10
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (pageSize !== 20) {
                setPageSize(20);
                setFirstPage();
                setLoadingToTrue();
                updateData();
              }
            }}
          >
            20
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (pageSize !== 50) {
                setPageSize(50);
                setFirstPage();
                setLoadingToTrue();
                updateData();
              }
            }}
          >
            50
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
