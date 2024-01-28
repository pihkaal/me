import { Octokit } from "@octokit/rest";
import { publicProcedure } from "../../trpc";
import axios from "axios";

type Manifest = {
  projects: Array<{
    name: string;
    files: Array<string>;
  }>;
};

export const getRepos = publicProcedure.query(async () => {
  const { data: manifest } = await axios.get<Manifest>(
    "https://raw.githubusercontent.com/pihkaal/pihkaal/main/manifest.json",
  );

  return manifest;
});
