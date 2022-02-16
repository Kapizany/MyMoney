import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { transactionsAPI } from "../../api/transactions";
import { TransactionsTableProps } from "../../interfaces/transactionTable";
import { theme } from "../../styles/theme";
import { getWeekdayFromDate } from "../../utils/getWeekdayFromData";
import { Input } from "../Login/Input";


export const TransactionsTable:React.FC<TransactionsTableProps> = ({
    data, deleteTransaction}) => {
  return (
    <Table
      w="83vw%"
      mx="1rem"
      bgColor="gray.50"
      boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
      color="dollar.900"
    >
      <Thead>
        <Tr whiteSpace="nowrap">
          <Th>Data</Th>
          <Th>Day</Th>
          <Th>Description</Th>
          <Th isNumeric>Value (USD)</Th>
          <Th>
            <AddTransactionModal />
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.results.map((transaction) => {
          return (
            <Tr key={transaction.id}>
              <Td>{transaction.date}</Td>
              <Td>{getWeekdayFromDate(transaction.date)}</Td>
              <Td>{transaction.description}</Td>
              <Td isNumeric>{transaction.value}</Td>
              <Td>
                <Flex justifyContent="center">
                  <Tooltip
                    label='Edit transaction'
                    bgColor="gray.50"
                    color="dollar.900"
                  >
                    <IconButton
                      aria-label='Edit transaction'
                      bgColor="dollar.500"
                      color="gray.50"
                      mr="0.5rem"
                      _hover={{bgColor: "dollar.400",}}
                      _focus={theme.styles.buttonFocusStyle}
                      icon={<AiFillEdit color="gray.50" />}
                    />
                  </Tooltip>
                  <Tooltip
                    label='Delete transaction'
                    bgColor="gray.50"
                    color="dollar.900"
                  >
                    <IconButton
                      aria-label='Delete transaction'
                      bgColor="red"
                      color="gray.50"
                      _hover={{bgColor: "black",}}
                      _focus={{
                        outlineOffset: "0px",
                        outlineColor: "red",
                      }}
                      icon={<AiFillDelete />}
                      onClick={() => {
                        deleteTransaction(transaction.id);
                      }}
                    />
                  </Tooltip>
                </Flex>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

function AddTransactionModal() {
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [transactionValue, setTransactionValue] = useState(0.00);

  const handleInput = (
    newStateValue: number | string, setNewStateValue: Function) => {
      setNewStateValue(newStateValue);
    };

  const { isOpen, onOpen, onClose } = useDisclosure()

  const tokenLocalStorage = localStorage.getItem("mymoney_token");

  return (
    <>
      <Button
        size="sm"
        bgColor="gray.50"
        boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
        color="dollar.900"
        _focus={theme.styles.buttonFocusStyle}
        onClick={onOpen}
        >
        Add transaction
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent  bgColor="gray.50">
          <ModalHeader color="dollar.900">Add transaction</ModalHeader>
          <ModalCloseButton
            bgColor="gray.50"
            color="red"
          />
          <ModalBody>
            <Stack>
              <Input
                name="date"
                type="date"
                label="Date"
                value={transactionDate}
                onChange={(event) => handleInput(
                    event.target.value, setTransactionDate)}
              />
              <Input
                name="description"
                type="text"
                label="Description"
                value={transactionDescription}
                onChange={(event) => handleInput(
                  event.target.value, setTransactionDescription)}
              />
              <Input
                name="value"
                type="number"
                label="Value"
                value={transactionValue}
                onChange={(event) => handleInput(
                  event.target.value, setTransactionValue)}
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              bgColor="dollar.500"
              color="gray.50"
              onClick={async () => {
                const data = await transactionsAPI.createTransaction(
                  tokenLocalStorage ? tokenLocalStorage : "",
                  {
                    date: transactionDate,
                    description: transactionDescription,
                    value: transactionValue,
                  }
                );
                console.log(data)
                onClose();
              }}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}