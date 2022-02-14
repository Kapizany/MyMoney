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
  Tr
} from "@chakra-ui/react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { TransactionsTableProps } from "../../interfaces/transactionTable";
import { theme } from "../../styles/theme";
import { getWeekdayFromDate } from "../../utils/getWeekdayFromData";


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
            <Button
              size="sm"
              bgColor="gray.50"
              boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
              color="dollar.900"
              _focus={theme.styles.buttonFocusStyle}
             >
              Add transaction
            </Button>
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
