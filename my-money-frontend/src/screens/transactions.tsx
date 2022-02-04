import {
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { transactionsAPI } from "../api/transactions";
import { BackgroundScreen } from "../components/BackgroundScreen";
import { GetWeekdayFromDate } from "../components/GetWeekdayFromDate";
import { Header } from "../components/Header";
import { SideBarMenu } from "../components/SideBarMenu";
import { SelectedPageProps } from "../interfaces/selectedPage";
import { TransactionsTableData } from "../interfaces/transactionsTableData";

export function Transactions({
  selectedPage,
  setSelectedPage,
}: SelectedPageProps) {
  setSelectedPage("transactions");

  const [tableData, setTableData] = useState<TransactionsTableData>({
    data: [],
    loading: true,
  });

  const tokenLocalStorage = localStorage.getItem("mymoney_token");

  transactionsAPI
    .getTransactionsList(tokenLocalStorage ? tokenLocalStorage : "")
    .then((response) => {
      if (tableData.loading) {
        setTableData({
          data: response.data,
          loading: false,
        });
      }
    })
    .catch((error) => console.log(error));

  return (
    <BackgroundScreen alignItems="normal" justifyContent="flex-start">
      <Header />
      <SideBarMenu selectedPage={selectedPage} />
      <Flex
        w="83vw"
        mt="6vh"
        ml="17vw"
        bgColor="gray.100"
        flexDirection="column"
      >
        <Flex
          w="83vw%"
          h="3rem"
          m="1rem"
          px="1rem"
          alignItems="center"
          bg="gray.50"
          boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
        >
          <Heading size="md" color="dollar.900">
            Transactions
          </Heading>
        </Flex>

        <Table
          w="83vw%"
          mx="1rem"
          bg="gray.50"
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
            {tableData.data.map((data) => {
              return (
                <Tr key={data.id}>
                  <Td>{data.date}</Td>
                  <Td>{GetWeekdayFromDate(data.date)}</Td>
                  <Td>{data.description}</Td>
                  <Td isNumeric>{data.value}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </BackgroundScreen>
  );
}
