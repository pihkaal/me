import { createTRPCRouter } from "~/server/api/trpc";
import { github } from "./routers/github";

export const appRouter = createTRPCRouter({
  github,
});

export type AppRouter = typeof appRouter;
