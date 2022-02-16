import {
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { transactionsAPI } from "../api/transactions";
import { BackgroundScreen } from "../components/BackgroundScreen";
import { Header } from "../components/Header";
import { Pagination } from "../components/Pagination";
import { SideBarMenu } from "../components/SideBarMenu";
import { TransactionsTable } from "../components/TransactionsTable";
import { SelectedPageProps } from "../interfaces/selectedPage";
import { TransactionsTableData } from "../interfaces/transactionsTableData";


export function Transactions(
    {selectedPage, setSelectedPage,}: SelectedPageProps) {
  setSelectedPage("transactions");

  const [pageSize, setPageSize] = useState(10);

  function updatePageSize(size: number) {
    setPageSize(size);
  }

  const [tableData, setTableData] = useState<TransactionsTableData>({
    data: {
      count: 0,
      page: 1,
      results: [],
    },
    loading: true,
  });

  const tokenLocalStorage = localStorage.getItem("mymoney_token");

  function updateTableData() {
    transactionsAPI
    .getTransactionsList(
        tokenLocalStorage ? tokenLocalStorage : "",
        tableData.data.page,
        pageSize)
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

  const lastPage: number = Math.ceil(tableData.data.count / pageSize);

  function setFirstPage() {
    tableData.data.page = 1;
  }

  function decreasePageByOne() {
    tableData.data.page = tableData.data.page - 1;
  }

  function increasePageByOne() {
    tableData.data.page = tableData.data.page + 1;
  }

  function setLastPage() {
    tableData.data.page = lastPage;
  }

  function setLoadingToTrue() {
    tableData.loading = true;
  }

  function deleteTransaction(id: number) {
    transactionsAPI.deleteTransaction(
      tokenLocalStorage ? tokenLocalStorage : "",
      id,
    )
    .then(() => {
      setFirstPage();
      setLoadingToTrue();
      updateTableData();
    })
    .catch((error) => console.log(error));
  }

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
          flexShrink="0"
          mt="1rem"
          mx="1rem"
          px="1rem"
          alignItems="center"
          bgColor="gray.50"
          boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
        >
          <Heading size="md" color="dollar.900">Transactions</Heading>
        </Flex>

        <Pagination
          pageSize={pageSize}
          setPageSize={updatePageSize}
          setFirstPage={setFirstPage}
          decreasePageByOne={decreasePageByOne}
          currentPage={tableData.data.page}
          lastPage={lastPage}
          increasePageByOne={increasePageByOne}
          setLastPage={setLastPage}
          setLoadingToTrue={setLoadingToTrue}
          updateData={updateTableData}
        />

        <TransactionsTable
          data={tableData.data}
          deleteTransaction={deleteTransaction}
        />

        <Pagination
          pageSize={pageSize}
          setPageSize={updatePageSize}
          setFirstPage={setFirstPage}
          decreasePageByOne={decreasePageByOne}
          currentPage={tableData.data.page}
          lastPage={lastPage}
          increasePageByOne={increasePageByOne}
          setLastPage={setLastPage}
          setLoadingToTrue={setLoadingToTrue}
          updateData={updateTableData}
        />
      </Flex>
    </BackgroundScreen>
  );
};
