import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

const connectionString = `${process.env.DATABASE_URL}`;

if (!global.prisma) {
  neonConfig.webSocketConstructor = ws;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  global.prisma = new PrismaClient({ adapter });
}

export default global.prisma;
