import { createTRPCRouter } from "../../trpc";
import { getRepos } from "./getRepos";

export const github = createTRPCRouter({
  getRepos,
});
