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
  ModalProps,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { transactionsAPI } from "../../api/transactions";
import { Input } from "../Input";
import { TransactionModalProps } from "../../interfaces/transactionModal";
import { TransactionsTableProps } from "../../interfaces/transactionTable";
import { getWeekdayFromDate } from "../../utils/getWeekdayFromData";


export const TransactionsTable:React.FC<TransactionsTableProps> = (
    {
      data,
      deleteTransaction,
      setLoadingToTrue,
      updateTableData,
      setLastPageOnNewTransaction,
    }) => {
  const [transactionId, setTransactionId] = useState(-1);
  const [transactionCategory, setTransactionCategory] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [transactionValue, setTransactionValue] = useState<number|string>("");
  const [newTransaction, setNewTransaction] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const categories: any = {
    "market": "Market",
    "transportation": "Transportation",
    "clothing": "Clothing",
    "bills": "Bills",
    "health_expenses": "Health expenses",
    "savings": "Savings",
    "other": "Other"
  };

  function openModalAdd() {
    setNewTransaction(true);
    onOpen();
  }

  function openModalEdit(
      transactionId: number,
      transactionCategory: string,
      transactionDate: string,
      transactionDescription: string,
      transactionValue: number | string) {
    setNewTransaction(false);
    setTransactionId(transactionId);
    setTransactionCategory(transactionCategory);
    setTransactionDate(transactionDate);
    setTransactionDescription(transactionDescription);
    setTransactionValue(transactionValue);
    onOpen();
  }

  function resetModalInputs() {
    setTransactionId(-1);
    setTransactionCategory("");
    setTransactionDate("");
    setTransactionDescription("");
    setTransactionValue("");
  }

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
          <Th>Category</Th>
          <Th isNumeric>Value (USD)</Th>
          <Th display="flex" justifyContent="center">
            <Button
              size="sm"
              bgColor="gray.50"
              boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
              color="dollar.900"
              _hover={{bgColor: "dollar.400"}}
              _focus={{outline: "none"}}
              onClick={openModalAdd}
            >
              Add transaction
            </Button>
            <TransactionModal
              newTransaction={newTransaction}
              transactionId={transactionId}
              transactionCategory={transactionCategory}
              setTransactionCategory={setTransactionCategory}
              transactionDate={transactionDate}
              setTransactionDate={setTransactionDate}
              transactionDescription={transactionDescription}
              setTransactionDescription={setTransactionDescription}
              transactionValue={transactionValue}
              setTransactionValue={setTransactionValue}
              resetModalInputs={resetModalInputs}
              setLoadingToTrue={setLoadingToTrue}
              updateTableData={updateTableData}
              setLastPageOnNewTransaction={setLastPageOnNewTransaction}
              isOpen={isOpen}
              onClose={onClose}
              children={undefined}
            />
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
              <Td>{categories[transaction.category]}</Td>
              <Td isNumeric>{transaction.value}</Td>
              <Td>
                <Flex justifyContent="center">
                  <Tooltip
                    label="Edit transaction"
                    bgColor="gray.50"
                    color="dollar.900"
                  >
                    <IconButton
                      mr="0.5rem"
                      aria-label="Edit transaction"
                      bgColor="dollar.500"
                      _hover={{bgColor: "dollar.400"}}
                      _focus={{outline: "none"}}
                      icon={<AiFillEdit color="#eeeef2" />}
                      onClick={() => {
                        openModalEdit(
                          transaction.id,
                          transaction.category,
                          transaction.date,
                          transaction.description,
                          transaction.value);
                      }}
                    />
                  </Tooltip>
                  <Tooltip
                    label="Delete transaction"
                    bgColor="gray.50"
                    color="#d0312d"
                  >
                    <IconButton
                      aria-label="Delete transaction"
                      bgColor="#d0312d"
                      _hover={{bgColor: "#ff0000"}}
                      _focus={{outline: "none"}}
                      icon={<AiFillDelete color="#eeeef2" />}
                      onClick={() => {deleteTransaction(transaction.id)}}
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

const TransactionModal:React.FC<TransactionModalProps & ModalProps> = (
    {
      newTransaction,
      transactionId,
      transactionCategory,
      setTransactionCategory,
      transactionDate,
      setTransactionDate,
      transactionDescription,
      setTransactionDescription,
      transactionValue,
      setTransactionValue,
      resetModalInputs,
      setLoadingToTrue,
      updateTableData,
      setLastPageOnNewTransaction,
      isOpen,
      onClose,
    }) => {
  const tokenLocalStorage = localStorage.getItem("mymoney_token");

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onEsc={() => {resetModalInputs()}}
        onOverlayClick={() => {resetModalInputs()}}
      >
        <ModalOverlay />
        <ModalContent bgColor="gray.50">
          <ModalHeader color="dollar.900">
            {newTransaction ? "Add transaction" : "Edit transaction"}
          </ModalHeader>
          <ModalCloseButton
            bgColor="#d0312d"
            color="gray.50"
            _hover={{bgColor: "#ff0000"}}
            _focus={{outline: "none"}}
            onClick={() => {resetModalInputs()}}
          />
          <ModalBody>
            <Stack>
              <Input
                name="date"
                type="date"
                placeholder="Date"
                value={transactionDate}
                onChange={(event) => {
                  setTransactionDate(event.target.value);
                }}
              />
              <Select
                name="category"
                placeholder="Category"
                variant="flushed"
                size="lg"
                borderColor="dollar.500"
                focusBorderColor="dollar.500"
                color="dollar.900"
                value={transactionCategory}
                onChange={(event) => {
                  setTransactionCategory(event.target.value);
                }}
              >
                <option value="market">Market</option>
                <option value="transportation">Transportation</option>
                <option value="clothing">Clothing</option>
                <option value="bills">Bills</option>
                <option value="health_expenses">Health expenses</option>
                <option value="savings">Savings</option>
                <option value="other">Other</option>
              </Select>
              <Input
                name="description"
                type="text"
                placeholder="Description"
                value={transactionDescription}
                onChange={(event) => {
                  setTransactionDescription(event.target.value);
                }}
              />
              <Input
                name="value"
                type="text"
                placeholder="Value"
                value={transactionValue}
                onChange={(event) => {
                  setTransactionValue(
                    event.target.value.replace(/[^0-9.,-]/g, ''));
                }}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              bgColor="dollar.500"
              color="gray.50"
              _hover={{bgColor: "dollar.400"}}
              _focus={{outline: "none"}}
              onClick={async () => {
                if (newTransaction) {
                  await transactionsAPI.createTransaction(
                    tokenLocalStorage ? tokenLocalStorage : "",
                    {
                      category: transactionCategory,
                      date: transactionDate,
                      description: transactionDescription,
                      value: transactionValue,
                    },
                  );
                  setLastPageOnNewTransaction();
                }
                else {
                  await transactionsAPI.editTransaction(
                    tokenLocalStorage ? tokenLocalStorage : "",
                    transactionId,
                    {
                      category: transactionCategory,
                      date: transactionDate,
                      description: transactionDescription,
                      value: transactionValue,
                    },
                  );
                }
                onClose();
                resetModalInputs();
                setLoadingToTrue();
                updateTableData();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
