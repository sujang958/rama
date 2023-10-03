import { neon, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { migrate } from "drizzle-orm/neon-http/migrator"

neonConfig.fetchConnectionCache = true

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

await migrate(db, { migrationsFolder: "drizzle" })

console.log("Migrated")
