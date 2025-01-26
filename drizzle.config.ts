import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  tablesFilter: ["zfweb_*"],
});

// import { config } from "dotenv";
// import { defineConfig } from "drizzle-kit";
// // import { type Config } from "drizzle-kit";

// config({ path: "~/env" });

// export default defineConfig({
//   dialect: "postgresql",
//   schema: "./src/server/db/schema.ts",
//   out: "./src/server/db/migrations",
//   dbCredentials: {
//     url: env.POSTGRES_URL,
//   },
//   tablesFilter: ["zfweb_*"],
// });

// export default {
//   schema: "./src/server/db/schema.ts",
//   out: "./src/server/db/migrations",
//   dialect: "postgresql",
//   dbCredentials: {
//     url: env.POSTGRES_URL,
//   },
//   tablesFilter: ["zfweb_*"],
// } satisfies Config;
