import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { prismaQueryInsights } from "@prisma/sqlcommenter-query-insights";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({
  adapter,
  comments: [prismaQueryInsights()],
}).$extends(withAccelerate());

export { prisma };
