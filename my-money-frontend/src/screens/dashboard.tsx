import { BackgroundScreen } from "../components/BackgroundScreen";
import { Header } from "../components/Header";
import { SideBarMenu } from "../components/SideBarMenu";
import { SelectedPageProps } from "../interfaces/selectedPage";


export function Dashboard({selectedPage, setSelectedPage}: SelectedPageProps) {
    setSelectedPage("dashboard");
    return  <BackgroundScreen alignItems="normal" justifyContent="flex-start">
      <Header />
      <SideBarMenu selectedPage={selectedPage}/>
    </BackgroundScreen>
}
