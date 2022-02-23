import { Flex } from "@chakra-ui/react";
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

  const tokenLocalStorage = localStorage.getItem("mymoney_token");

  transactionsAPI.getMonthlyValues(
    tokenLocalStorage ? tokenLocalStorage : "") // ,
    // "2008")
  .then((response) => console.log(response))
  .catch((error) => console.log("DEU RUIM!", error));

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
          <DebitAndCreditChart />
        </Flex>
        <Flex
          h="90vh"
          flexShrink= "0"
          mx="1rem"
          mb="1rem"
          boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
        >
          <CumulativeBalanceChart />
        </Flex>
      </Flex>
    </BackgroundScreen>
  );
}
