-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RacePilot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "position" INTEGER NOT NULL DEFAULT 1,
    "pilotId" INTEGER NOT NULL,
    "raceId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,
    CONSTRAINT "RacePilot_pilotId_fkey" FOREIGN KEY ("pilotId") REFERENCES "Pilot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RacePilot_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RacePilot_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RacePilot" ("carId", "id", "pilotId", "position", "raceId") SELECT "carId", "id", "pilotId", "position", "raceId" FROM "RacePilot";
DROP TABLE "RacePilot";
ALTER TABLE "new_RacePilot" RENAME TO "RacePilot";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
