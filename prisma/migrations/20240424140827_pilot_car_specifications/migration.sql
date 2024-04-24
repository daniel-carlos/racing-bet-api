/*
  Warnings:

  - Added the required column `acceleration` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speed` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `steering` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pilot" ADD COLUMN "modelURL" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "speed" REAL NOT NULL,
    "acceleration" REAL NOT NULL,
    "steering" REAL NOT NULL
);
INSERT INTO "new_Car" ("id", "name") SELECT "id", "name" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
