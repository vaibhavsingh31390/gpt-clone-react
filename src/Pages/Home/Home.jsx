import Dashboard from "./../../Components/UI/Elements/Dashboard";
import ResponseView from "./../../Components/UI/Elements/ResponseView";
import SideBar from "./../../Components/UI/Elements/SideBar";

const Home = () => {
  return (
    <>
      <Dashboard>
        <SideBar />
        <ResponseView />
      </Dashboard>
    </>
  );
};

export default Home;
