import { useState } from "react";
import {
  Flex,
  Heading,
} from "@chakra-ui/react";
import { peopleAPI } from "../api/people";
import { transactionsAPI } from "../api/transactions";
import { BackgroundScreen } from "../components/BackgroundScreen";
import { Header } from "../components/Header";
import { Pagination } from "../components/Pagination";
import { SideBarMenu } from "../components/SideBarMenu";
import { TransactionsTable } from "../components/TransactionsTable";
import { SelectedPageProps } from "../interfaces/selectedPage";
import { TransactionsTableData } from "../interfaces/transactionsTableData";


export function Transactions(
    { selectedPage, setSelectedPage }: SelectedPageProps) {
  setSelectedPage("transactions");

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [tableData, setTableData] = useState<TransactionsTableData>({
    data: {
      count: 0,
      page: 1,
      results: [],
    },
  });

  const tokenLocalStorage = localStorage.getItem("mymoney_token");

  if (loading) {
    loadUsername();
    loadFullName();
    updateTableData();
    setLoading(false);
  }

  const lastPage: number = Math.ceil(tableData.data.count / pageSize);

  function loadUsername() {
    peopleAPI.getUsername(tokenLocalStorage ? tokenLocalStorage : "")
    .then((response) => {
      setUsername(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function loadFullName() {
    peopleAPI.getFullName(tokenLocalStorage ? tokenLocalStorage : "")
    .then((response) => {
      setFullName(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function updateTableData() {
    transactionsAPI.getTransactionsList(
      tokenLocalStorage ? tokenLocalStorage : "",
      tableData.data.page,
      pageSize,
    )
    .then((response) => {
      setTableData({
        data: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

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

  function setLastPageOnNewTransaction() {
    if (tableData.data.page !== lastPage) {
      setLastPage();
    }
    if (!(tableData.data.count % pageSize)) {
      increasePageByOne();
    }
  }

  function deleteTransaction(id: number) {
    transactionsAPI.deleteTransaction(
      tokenLocalStorage ? tokenLocalStorage : "",
      id)
    .then(() => {
      if ((tableData.data.results.length === 1)
          && (tableData.data.page !== 1)) decreasePageByOne();
      setLoadingToTrue();
      updateTableData();
    })
    .catch((error) => console.log(error));
  }

  function setLoadingToTrue() {
    setLoading(true);
  }

  return (
    <BackgroundScreen alignItems="normal" justifyContent="flex-start">
      <Header username={username} />
      <SideBarMenu selectedPage={selectedPage} fullName={fullName} />
      <Flex
        w="83vw"
        mt="6vh"
        ml="17vw"
        bgColor="gray.100"
        flexDirection="column"
      >
        <Flex
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
          setPageSize={setPageSize}
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
          setLoadingToTrue={setLoadingToTrue}
          updateTableData={updateTableData}
          setLastPageOnNewTransaction={setLastPageOnNewTransaction}
        />

        <Pagination
          pageSize={pageSize}
          setPageSize={setPageSize}
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
}
