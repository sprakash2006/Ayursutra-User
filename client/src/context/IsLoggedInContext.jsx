// context/IsLoggedInContext.js
import React, { createContext, useState, useContext } from "react";

const IsLoggedInContext = createContext(false);

export const IsLoggedInProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </IsLoggedInContext.Provider>
  );
};

// Hook for easy access
export const useIsLoggedIn = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);
  return { isLoggedIn, setIsLoggedIn };
};
