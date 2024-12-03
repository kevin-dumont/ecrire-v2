import React, { createContext, useContext } from "react";
import { Dependencies } from "./Dependencies";

const DependenciesContext = createContext<Dependencies | undefined>(undefined);

export const DependenciesProvider: React.FC<{
  children: React.ReactNode;
  dependencies: Dependencies;
}> = ({ children, dependencies }) => {
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
};

export const useDependencies = () => {
  const context = useContext(DependenciesContext);

  if (!context) {
    throw new Error(
      "useDependencies must be used within a DependenciesProvider"
    );
  }
  return context;
};
