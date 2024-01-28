import {
  createContext,
  useEffect,
  useContext,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { Manifest } from "~/utils/types";

const AppContext = createContext<Manifest | undefined>(undefined);

export const AppContextProvider = (props: {
  children: Array<ReactNode> | ReactNode;
}) => {
  const [manifest, setManifest] = useState<Manifest>();

  useEffect(() => {
    axios
      .get<Manifest>(
        "https://raw.githubusercontent.com/pihkaal/pihkaal/main/manifest.json",
      )
      .then(x => {
        setManifest(x.data);
        console.log(x.data);
      });
  }, []);

  return (
    <AppContext.Provider value={manifest}>{props.children}</AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside the app lol");

  return context;
};
