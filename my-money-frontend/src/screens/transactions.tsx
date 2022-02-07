import {
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { transactionsAPI } from "../api/transactions";
import { BackgroundScreen } from "../components/BackgroundScreen";
import { Header } from "../components/Header";
import { SideBarMenu } from "../components/SideBarMenu";
import { TransactionsTable } from "../components/TransactionsTable";
import { SelectedPageProps } from "../interfaces/selectedPage";
import { TransactionsTableData } from "../interfaces/transactionsTableData";


export function Transactions({
  selectedPage,
  setSelectedPage,
}: SelectedPageProps) {
  setSelectedPage("transactions");

  const [tableData, setTableData] = useState<TransactionsTableData>({
    data: {
      results: [],
      page: 1,
      count: 0,
    },
    loading: true,
  });

  const tokenLocalStorage = localStorage.getItem("mymoney_token");

  function updateTableData() {
    transactionsAPI
    .getTransactionsList(tokenLocalStorage ? tokenLocalStorage : "", tableData.data.page)
    .then((response) => {
      if (tableData.loading) {
        setTableData({
          data: response.data,
          loading: false,
        });
      }
      })
      .catch((error) => console.log(error));
    }

    updateTableData();

    const lastPage: number = Math.ceil(tableData.data.count / 10);

    return (
    <BackgroundScreen alignItems="normal" justifyContent="flex-start">
      <Header />
      <SideBarMenu selectedPage={selectedPage} />
      <Flex
        overflowX="hidden"
        w="83vw"
        mt="6vh"
        ml="17vw"
        bgColor="gray.100"
        flexDirection="column"
      >
        <Flex
          w="83vw%"
          h="3rem"
          flexShrink="0"
          m="1rem"
          px="1rem"
          alignItems="center"
          bgColor="gray.50"
          boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
        >
          <Heading size="md" color="dollar.900">Transactions</Heading>
        </Flex>

        <TransactionsTable tableData={tableData.data} />

        <Flex m="1rem" justifyContent="center" alignItems="center">
          <Button
            size="sm"
            mr="0.5rem"
            px="-0.5rem"
            bg="gray.50"
            bgColor="gray.50"
            boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
            color="dollar.900"
            onClick={() => {
              if (tableData.data.page !== 1) {
                tableData.data.page = 1;
                tableData.loading = true;
                updateTableData();
              }
            }}
            // can hurt accessibility:
            // _focus={{
            //   outline: 0,
            // }}
          >
            {'<<'}
          </Button>
          <Button
            size="sm"
            bg="gray.50"
            bgColor="gray.50"
            boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
            color="dollar.900"
            onClick={() => {
              if (tableData.data.page > 1) {
                tableData.data.page = tableData.data.page - 1;
                tableData.loading = true;
                updateTableData();
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
            bg="gray.50"
            bgColor="gray.50"
            borderRadius="md"
            boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
            color="dollar.900"
          >
            Page {tableData.data.page}/{lastPage}
          </Flex>
          <Button
            size="sm"
            bg="gray.50"
            bgColor="gray.50"
            boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
            color="dollar.900"
            onClick={() => {
              if (tableData.data.page < lastPage) {
                tableData.data.page = tableData.data.page + 1;
                tableData.loading = true;
                updateTableData();
              }
            }}
          >
            {'>'}
          </Button>
          <Button
            size="sm"
            ml="0.5rem"
            px="-0.5rem"
            bg="gray.50"
            bgColor="gray.50"
            boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
            color="dollar.900"
            onClick={() => {
              if (tableData.data.page !== lastPage) {
                tableData.data.page = lastPage;
                tableData.loading = true;
                updateTableData();
              }
            }}
          >
            {'>>'}
          </Button>
        </Flex>
      </Flex>
    </BackgroundScreen>
  );
}
