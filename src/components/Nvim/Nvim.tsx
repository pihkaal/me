import { useApp } from "~/context/AppContext";
import { NvimStatusBar } from "./NvimStatusBar";
import { NvimTree } from "./NvimTree";
import { buildFileTree } from "~/utils/filesystem";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { NvimEditor } from "./NvimEditor";

const fetchData = async (
  branch: string,
  repo: string,
  file: string,
): Promise<string | null> => {
  return `Displaying ${repo}/${file} on branch ${branch}`;
  try {
    const response = await axios.get<string>(
      `https://raw.githubusercontent.com/pihkaal/${repo}/${branch}/${file}`,
    );
    return response.data;
  } catch {
    return null;
  }
};

export const Nvim = () => {
  const manifest = useApp();
  const [data, setData] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

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
    <div className="flex flex-col">
      <div className="flex flex-1 flex-row">
        <div className="w-fit">
          <NvimTree files={buildFileTree(manifest)} />
        </div>
        <div className="flex-1">
          <NvimEditor content={data} />
        </div>
      </div>
      <div className="h-fit bg-[#29293c]">
        <NvimStatusBar label="NORMAL" fileName="README.md" />
      </div>
    </div>
  );
};
