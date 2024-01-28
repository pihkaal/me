/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useEffect,
  useContext,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import { type Manifest } from "~/utils/types";

const AppContext = createContext<Manifest | null>(null);

export const AppContextProvider = (props: {
  children: Array<ReactNode> | ReactNode;
}) => {
  const [manifest, setManifest] = useState<Manifest | null>(null);

  useEffect(() => {
    void axios
      .get<Manifest>(
        "https://raw.githubusercontent.com/pihkaal/pihkaal/main/manifest.json",
      )
      .then(x => {
        setManifest(x.data);
        console.log(x.data);
      });
  }, []);

  return (
    <AppContext.Provider value={manifest}>
      {manifest && props.children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside the app lol");

  return context;
};
