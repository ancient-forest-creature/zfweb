// filepath: /Users/nathanz/Code/zfweb/src/server/db/client.ts
import { Pool } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default pool;
