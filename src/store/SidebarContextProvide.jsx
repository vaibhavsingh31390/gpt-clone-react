/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
const SidebarContext = createContext();
const SidebarProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const [standByClass, setStandByClass] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const handleSideBar = () => {
    setToggle((prev) => !prev);
    setStandByClass("stand-by");
    setTimeout(() => {
      setStandByClass("");
    }, 200);
  };
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const contextValue = {
    toggle,
    standByClass,
    isMobile,
    setIsMobile,
    handleSideBar,
  };

  console.log(isMobile);
  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarProvider, SidebarContext };
