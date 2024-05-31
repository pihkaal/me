import axios from "axios";
import { type ReactNode, useState, useEffect } from "react";
import { AppContext } from "~/context/AppContext";
import { type RootManifest } from "~/utils/types";

export const AppProvider = (props: { children?: ReactNode }) => {
  const [activeKitty, setActiveKitty] = useState(":r0:");
  const [rootManifest, setRootManifest] = useState<RootManifest>({
    files: ["README.md", "pubkey.asc"],
    projects: [
      {
        name: "me",
        icon: "ts",
      },
      {
        name: "tlock",
        icon: "rs",
      },
    ],
    links: [
      {
        name: "github",
        url: "https://github.com/pihkaal",
        icon: "github",
      },
      {
        name: "instagram",
        url: "https://instagram.com/pihkaal",
        icon: "instagram",
      },
    ],
  });

  useEffect(() => {
    return;
    void axios
      .get<RootManifest>(
        "https://raw.githubusercontent.com/pihkaal/pihkaal/main/manifest.json",
      )
      .then((x) => setRootManifest(x.data));
  }, []);

  if (!rootManifest) return null;

  return (
    <AppContext.Provider value={{ rootManifest, activeKitty, setActiveKitty }}>
      {rootManifest && props.children}
    </AppContext.Provider>
  );
};
