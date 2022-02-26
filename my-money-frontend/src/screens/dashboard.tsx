import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { transactionsAPI } from "../api/transactions";
import { BackgroundScreen } from "../components/BackgroundScreen";
import {
  CumulativeBalanceChart,
  CurrentDebitAndCreditChart,
  DebitAndCreditChart,
  ExpensesByCategoryChart
} from "../components/Charts";
import { Header } from "../components/Header";
import { SideBarMenu } from "../components/SideBarMenu";
import { SelectedPageProps } from "../interfaces/selectedPage";


export function Dashboard({selectedPage, setSelectedPage}: SelectedPageProps) {
  setSelectedPage("dashboard");
  const [loading, setLoading] = useState(true);
  const [years, setYears] = useState<string[]>([]);
  const [year, setYear] = useState("");
  const [debitAndCreditSeries, setDebitAndCreditSeries] = useState<any[]>([]);
  const [cumulativeBalanceSeries, setCumulativeBalanceSeries] = useState<any[]>([]);

  const tokenLocalStorage = localStorage.getItem("mymoney_token");

  function updateData() {
    transactionsAPI.getMonthlyValues(
      tokenLocalStorage ? tokenLocalStorage : "")
    .then((response) => {
      setDebitAndCreditSeries([
        {
          name: "Debit",
          type: "column",
          data: Object.keys(response.data).map((month) => {
            return response.data[month]["debit"];
          }),
        },
        {
          name: "Credit",
          type: "column",
          data: Object.keys(response.data).map((month) => {
            return response.data[month]["credit"];
          }),
        },
        {
          name: "Monthly Balance",
          type: "line",
          data: Object.keys(response.data).map((month) => {
            return response.data[month]["balance"];
          }),
        },
      ]);

      setCumulativeBalanceSeries([
        {
          name: "Comulative Balance",
          type: "line",
          data: Object.keys(response.data).map((month) => {
            return response.data[month]["cumulative_balance"];
          }),
        },
      ]);

      setLoading(false);
    })
    .catch((error) => console.log(error));
  }

  if (loading) {
    transactionsAPI.getYears(
      tokenLocalStorage ? tokenLocalStorage : "")
    .then((response) => setYears(response.data))
    .catch((error) => console.log(error));

    updateData();
  }

  return (
    <BackgroundScreen alignItems="normal" justifyContent="flex-start">
      <Header />
      <SideBarMenu selectedPage={selectedPage}/>
      <Flex
        w="83vw"
        mt="6vh"
        ml="17vw"
        bgColor="gray.100"
        flexDirection="column"
      >
        <Flex
          mx="1rem"
          mt="1rem"
          mb="1rem"
          alignItems="center"
          justifyContent="space-between"
          flexShrink= "0"
        >
          <Flex
            w="40%"
            h="90vh"
            boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
          >
            <CurrentDebitAndCreditChart />
          </Flex>
          <Flex
            w="58%"
            h="fit-content"
            boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
          >
            <ExpensesByCategoryChart />
          </Flex>
        </Flex>
        <Flex
          h="90vh"
          flexShrink= "0"
          mx="1rem"
          mb="1rem"
          boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
        >
          <DebitAndCreditChart series={debitAndCreditSeries} />
        </Flex>
        <Flex
          h="90vh"
          flexShrink= "0"
          mx="1rem"
          mb="1rem"
          boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
        >
          <CumulativeBalanceChart
            series={cumulativeBalanceSeries}
            years={years}
          />
        </Flex>
      </Flex>
    </BackgroundScreen>
  );
}
