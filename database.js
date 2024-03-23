import { PrismaClient } from "@prisma/client";

function getDB() {
  const db = new PrismaClient();
  return db;
}

export default getDB;
