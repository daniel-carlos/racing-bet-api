-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "prefabName" TEXT NOT NULL DEFAULT '',
    "speed" REAL NOT NULL,
    "acceleration" REAL NOT NULL,
    "steering" REAL NOT NULL
);
INSERT INTO "new_Car" ("acceleration", "id", "name", "speed", "steering") SELECT "acceleration", "id", "name", "speed", "steering" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
