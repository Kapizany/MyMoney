import { BackgroundScreen } from "../components/BackgroundScreen";
import { Header } from "../components/Header";
import { SideBarMenu } from "../components/SideBarMenu";
import { DashboardProps } from "../interfaces/dashboard";


export function Dashboard({selectedPage, setSelectedPage}: DashboardProps) {
    setSelectedPage("dashboard");
    return  <BackgroundScreen alignItems="normal" justifyContent="flex-start">
      <Header />
      <SideBarMenu selectedPage={selectedPage}/>
    </BackgroundScreen>
}
