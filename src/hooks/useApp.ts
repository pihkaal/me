import { useContext } from "react";
import { AppContext } from "~/context/AppContext";

export const useApp = () => {
  const app = useContext(AppContext);
  if (!app) throw new Error("`useApp` used outside AppContext");

  return app;
};
