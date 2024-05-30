import { useKitty } from "~/hooks/useKitty";
import { CHAR_HEIGHT } from "../Kitty";
import { NvimEditor } from "./NvimEditor";
import { NvimInput } from "./NvimInput";
import { NvimStatusBar } from "./NvimStatusBar";
import { NvimTree } from "./NvimTree";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const fetchData = async (
  branch: string,
  repo: string,
  file: string,
): Promise<string | null> => {
  try {
    const response = await axios.get<string>(
      `https://raw.githubusercontent.com/pihkaal/${repo}/${branch}/${file}`,
    );
    return response.data;
  } catch {
    return null;
  }
};

export const Nvim = (_props: {}) => {
  const kitty = useKitty();
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState<string>();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const view = params.get("view");
    if (!view) {
      navigate("?view=README.md");
      return;
    }

    const path = view.split("/");
    if (path.length === 1) {
      path.splice(0, 0, "pihkaal");
    }
    const repo = path[0]!;
    const file = path[1]!;

    void (async () => {
      const data =
        (await fetchData("main", repo, file)) ??
        (await fetchData("dev", repo, file));
      if (!data) {
        navigate("?view=README.md");
        return;
      }

      setData(data);
    })();
  }, [location, navigate]);

  return (
    <div
      className="grid h-full"
      style={{
        gridTemplateColumns: `0.4fr 2fr`,
        gridTemplateRows: `1fr ${CHAR_HEIGHT}px ${CHAR_HEIGHT}px`,
      }}
    >
      {kitty && (
        <>
          <div style={{ gridArea: "1 / 1 / 1 / 2" }}>
            <NvimTree {...kitty} />
          </div>
          <div style={{ gridArea: "1 / 2 / 1 / 3", overflow: "scroll" }}>
            <NvimEditor data={data ?? ""} />
          </div>
          <div style={{ gridArea: "2 / 1 / 2 / 3" }}>
            <NvimStatusBar
              label="INSERT"
              labelColor="#7ea7ca"
              fileName="README.md"
            />
          </div>
          <div style={{ gridArea: "3 / 1 / 3 / 3" }}>
            <NvimInput />
          </div>
        </>
      )}
    </div>
  );
};
