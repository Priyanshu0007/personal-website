import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { envConfig } from "@/utils/envConfig";

if (!envConfig.databaseUrl) {
  throw new Error("DATABASE_URL must be set");
}

const sql = neon(envConfig.databaseUrl);
export const db = drizzle(sql, { schema });
