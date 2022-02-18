import { Flex } from "@chakra-ui/react";
import { BackgroundScreen } from "../components/BackgroundScreen";
import { CumulativeBalanceChart, TransactionsAndBalanceChart } from "../components/Charts";
import { Header } from "../components/Header";
import { SideBarMenu } from "../components/SideBarMenu";
import { SelectedPageProps } from "../interfaces/selectedPage";


export function Dashboard({selectedPage, setSelectedPage}: SelectedPageProps) {
    setSelectedPage("dashboard");
    return  <BackgroundScreen alignItems="normal" justifyContent="flex-start">
      <Header />
      <SideBarMenu selectedPage={selectedPage}/>
      <Flex
        w="83vw"
        mt="6vh"
        ml="17vw"
        bgColor="gray.100"
        flexDirection="column"
        // overflowX="hidden"
      >
        <Flex
          h="90vh"
          flexShrink= "0"
          mx="1rem"
          my="1rem"
          boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
        >
          <TransactionsAndBalanceChart />
        </Flex>
        <Flex
          h="90vh"
          flexShrink= "0"
          mx="1rem"
          boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
        >
          <CumulativeBalanceChart />
        </Flex>
      </Flex>
    </BackgroundScreen>
}
