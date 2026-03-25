
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";
import * as chatSchema from "@shared/models/chat";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString && process.env.NODE_ENV === "development") {
    console.warn("DATABASE_URL is not set. Database operations will fail.");
}

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema: { ...schema, ...chatSchema } });
