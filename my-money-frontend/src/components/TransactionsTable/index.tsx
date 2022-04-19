import {
  Button,
  Flex,
  IconButton,
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
import { TransactionModal } from "../TransactionModal";
import { TransactionsTableProps } from "../../interfaces/transactionTable";
import { getWeekdayFromDate } from "../../utils/getWeekdayFromData";


export const TransactionsTable:React.FC<TransactionsTableProps> = (
    {
      data,
      deleteTransaction,
      setLoadingToTrue,
      updateTableData,
      setLastPageOnNewTransaction,
    },
  ) => {
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
    "other": "Other",
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
              _hover={{bgColor: "dollar.600"}}
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
                      _hover={{bgColor: "dollar.600"}}
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
