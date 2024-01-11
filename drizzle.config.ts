// @ts-check

import { type Config } from "drizzle-kit";

import { env } from "~/env";

const config: Config = {
  schema: "./src/server/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    uri: env.DATABASE_URL,
  },
  tablesFilter: ["me_*"],
};

export default config;
