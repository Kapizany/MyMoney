import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { GetWeekdayFromDate } from "../GetWeekdayFromDate";
import { TransactionsTableProps } from "../../interfaces/transactionTable"


export const TransactionsTable:React.FC<TransactionsTableProps> = ({data}) => {
  return (
    <Table
      w="83vw%"
      mx="1rem"
      bgColor="gray.50"
      boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
      color="dollar.900"
    >
      <Thead>
        <Tr>
          <Th>Data</Th>
          <Th>Day</Th>
          <Th>Description</Th>
          <Th isNumeric>Value (USD)</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.results.map((transaction) => {
          return (
            <Tr key={transaction.id}>
              <Td>{transaction.date}</Td>
              <Td>{GetWeekdayFromDate(transaction.date)}</Td>
              <Td>{transaction.description}</Td>
              <Td isNumeric>{transaction.value}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
