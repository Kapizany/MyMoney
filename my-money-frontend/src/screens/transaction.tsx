import { Flex } from "@chakra-ui/react";
import { BackgroundScreen } from "../components/BackgroundScreen";
import { Header } from "../components/Header";
import { SideBarMenu } from "../components/SideBarMenu";
import { DashboardProps } from "../interfaces/dashboard";

export function Transactions({selectedPage, setSelectedPage}: DashboardProps) {
    setSelectedPage("transactions");
    return  <BackgroundScreen alignItems="normal" justifyContent="flex-start">
      <Header />
      <SideBarMenu selectedPage={selectedPage}/>
      <Flex
        ml="17vw"
        mt="6vh"
        w="83vw"
        bgColor="gray.50"
      >

      </Flex>
    </BackgroundScreen>
}