import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  // Burada 'lb' olan yeri 'lib' olarak düzelttik
  schema: "./lib/db/schema.ts", 
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});