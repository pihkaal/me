import { createContext, useContext } from "react";

const TerminalContext = createContext<{ cols: number; rows: number } | null>(
  null,
);

export const TerminalContextProvider = TerminalContext.Provider;

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (!context)
    throw new Error("useTerminal must be used inside a Terminal component");

  return context;
};
