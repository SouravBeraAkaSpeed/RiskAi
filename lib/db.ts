import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// if (!globalThis.prisma) {
//   globalThis.prisma = new PrismaClient();
// }
// export const db = globalThis.prisma;

// if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// lib/db.ts

const db = new PrismaClient();

export { db };
