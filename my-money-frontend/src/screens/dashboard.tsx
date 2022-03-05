import { Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { transactionsAPI } from "../api/transactions";
import { BackgroundScreen } from "../components/BackgroundScreen";
import {
  CumulativeBalanceChart,
  CurrentMonthChart,
  CreditAndDebitChart,
  ExpensesByCategoryChart
} from "../components/Charts";
import { Header } from "../components/Header";
import { SideBarMenu } from "../components/SideBarMenu";
import { YearSelector } from "../components/YearSelector";
import { SelectedPageProps } from "../interfaces/selectedPage";


export function Dashboard({selectedPage, setSelectedPage}: SelectedPageProps) {
  setSelectedPage("dashboard");
  const [loading, setLoading] = useState(true);
  const [years, setYears] = useState<string[]>([]);
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [CurrentMonthSeries, setCurrentMonthSeries] = useState<any[]>([]);
  const [expensesByCategorySeries, setExpensesByCategorySeries] = useState<any[]>([]);
  const [CreditAndDebitSeries, setCreditAndDebitSeries] = useState<any[]>([]);
  const [cumulativeBalanceSeries, setCumulativeBalanceSeries] = useState<any[]>([]);

  const tokenLocalStorage = localStorage.getItem("mymoney_token");

  function updateData() {
    transactionsAPI.getMonthlyValues(
      tokenLocalStorage ? tokenLocalStorage : "",
      year)
    .then((response) => {
      if (CurrentMonthSeries.length === 0) {
        const currentMonth = new Date().toLocaleString("en-us", { month: "long" });
        setCurrentMonthSeries([
          {
            name: "Credit",
            type: "bar",
            data: [response.data[currentMonth]["credit"]]
          },
          {
            name: "Debit",
            type: "bar",
            data: [Math.abs(response.data[currentMonth]["debit"])]
          },
        ]);
      }

      setCreditAndDebitSeries([
        {
          name: "Credit",
          type: "bar",
          data: Object.keys(response.data).map((month) => {
            return response.data[month]["credit"];
          }),
        },
        {
          name: "Debit",
          type: "bar",
          data: Object.keys(response.data).map((month) => {
            return response.data[month]["debit"];
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
    })
    .catch((error) => console.log(error));

    transactionsAPI.getCategories(
      tokenLocalStorage ? tokenLocalStorage : "",
      year)
    .then((response) => {
      setExpensesByCategorySeries(Object.values(response.data));
    })
    .catch((error) => console.log(error));

    setLoading(false);
  }

  if (loading) {
    if (years.length === 0) {
      transactionsAPI.getYears(
        tokenLocalStorage ? tokenLocalStorage : "")
      .then((response) => setYears(response.data))
      .catch((error) => console.log(error));
    }

    updateData();
  }

  return (
    <BackgroundScreen alignItems="normal" justifyContent="flex-start">
      <Header />
      <SideBarMenu selectedPage={selectedPage}/>
      <Flex
        w="83vw"
        h="fit-content"
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
          pl="1rem"
          alignItems="center"
          justifyContent="space-between"
          bgColor="gray.50"
          boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
        >
          <Heading size="md" color="dollar.900">Dashboard</Heading>
          <YearSelector
            years={years}
            year={year}
            setYear={setYear}
            setLoading={setLoading}
          />
        </Flex>
        <Flex
          flexShrink="0"
          mx="1rem"
          mt="1rem"
          mb="1rem"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex
            w="40%"
            h="80vh"
            boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
          >
            <CurrentMonthChart series={CurrentMonthSeries} />
          </Flex>
          <Flex
            w="58%"
            h="fit-content"
            boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
          >
            <ExpensesByCategoryChart
              series={expensesByCategorySeries}
              years={years}
              year={year}
              setYear={setYear}
              setLoading={setLoading}
            />
          </Flex>
        </Flex>
        <Flex
          h="90vh"
          flexShrink= "0"
          mx="1rem"
          mb="1rem"
          boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
        >
          <CreditAndDebitChart
            series={CreditAndDebitSeries}
            years={years}
            year={year}
            setYear={setYear}
            setLoading={setLoading}
          />
        </Flex>
        <Flex
          h="90vh"
          flexShrink="0"
          mx="1rem"
          mb="1rem"
          boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
        >
          <CumulativeBalanceChart
            series={cumulativeBalanceSeries}
            years={years}
            year={year}
            setYear={setYear}
            setLoading={setLoading}
          />
        </Flex>
      </Flex>
    </BackgroundScreen>
  );
}
