import { createContext, useContext } from "react";
import { type TerminalRenderer } from "~/utils/terminal/renderer";

const TerminalCanvasContext = createContext<TerminalRenderer | undefined>(
  undefined,
);

export const TerminalCanvasContextProvider = TerminalCanvasContext.Provider;

export const useTerminalCanvas = () => {
  const context = useContext(TerminalCanvasContext);
  if (!context)
    throw new Error(
      "useTerminalCanvas must be used inside a Terminal component",
    );

  return context;
};
