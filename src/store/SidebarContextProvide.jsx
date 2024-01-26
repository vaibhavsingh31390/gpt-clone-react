/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
const SidebarContext = createContext();
const SidebarProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const [standByClass, setStandByClass] = useState("");

  const handleSideBar = () => {
    setToggle((prev) => !prev);
    setStandByClass("stand-by");
    setTimeout(() => {
      setStandByClass("");
    }, 200);
  };

  const contextValue = {
    toggle,
    standByClass,
    handleSideBar,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarProvider, SidebarContext };
