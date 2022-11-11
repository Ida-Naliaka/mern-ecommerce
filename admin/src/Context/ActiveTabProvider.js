import React, { useState, createContext, useContext } from "react";

const ActiveTabContext = createContext();
const ActiveTabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <ActiveTabContext.Provider
      value={{
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </ActiveTabContext.Provider>
  );
};
export const ActiveTabState = () => {
  return useContext(ActiveTabContext);
};
export default ActiveTabProvider;
