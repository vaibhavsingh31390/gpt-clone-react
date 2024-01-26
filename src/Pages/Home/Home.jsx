import Dashboard from "./../../Components/UI/Elements/Dashboard";
import ResponseView from "./../../Components/UI/Elements/ResponseView";
import SideBar from "./../../Components/UI/Elements/SideBar";
import { SidebarProvider } from "./../../store/SidebarContextProvide";
const Home = () => {
  return (
    <>
      <SidebarProvider>
        <Dashboard>
          <SideBar />
          <ResponseView />
        </Dashboard>
      </SidebarProvider>
    </>
  );
};

export default Home;
