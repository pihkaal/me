import { Octokit } from "@octokit/rest";
import { publicProcedure } from "../../trpc";

export const getRepos = publicProcedure.query(async () => {
  const octokit = new Octokit();

  //const response = await octokit.repos.listForUser({ username: "pihkaal" });
  //const repos = response.data.filter(x => x.name !== "pihkaal");
  return [];
});
