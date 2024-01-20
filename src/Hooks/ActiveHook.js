import { useEffect, useState } from "react";

const useSetActive = () => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsActive(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  return isActive;
};

export default useSetActive;
