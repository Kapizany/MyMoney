import {
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
      page: 0,
      count: 0,
    },
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

        <TransactionsTable tableData={tableData.data} />        
      </Flex>
    </BackgroundScreen>
  );
}
