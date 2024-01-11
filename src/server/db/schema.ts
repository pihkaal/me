import { mysqlTableCreator } from "drizzle-orm/mysql-core";

export const mysqlTable = mysqlTableCreator(name => `me_${name}`);
