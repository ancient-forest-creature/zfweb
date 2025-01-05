import { drizzle } from "drizzle-orm/vercel-postgres";
import { config } from "dotenv";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";

config({ path: "~/env" }); // or .env

export const db = drizzle(sql, { schema });

// import { drizzle } from "drizzle-orm/postgres-js";
// import { sql } from "@vercel/postgres";
// import * as schema from "./schema";

// // // Use this object to send drizzle queries to your DB
// export const db = drizzle(sql, { schema });
