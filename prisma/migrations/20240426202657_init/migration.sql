-- CreateEnum
CREATE TYPE "RaceFinalStatus" AS ENUM ('WAITING', 'FINISHED', 'RETIREMENT_CAR_FAILURE', 'RETIREMENT_TIME_LIMIT', 'CANCELED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "money" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "modelURL" TEXT,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "prefabName" TEXT NOT NULL DEFAULT '',
    "speed" DOUBLE PRECISION NOT NULL,
    "acceleration" DOUBLE PRECISION NOT NULL,
    "steering" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaceDriver" (
    "id" SERIAL NOT NULL,
    "gridPlace" INTEGER NOT NULL DEFAULT 1,
    "driverId" INTEGER NOT NULL,
    "raceId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,
    "finalStatus" "RaceFinalStatus" NOT NULL DEFAULT 'WAITING',
    "finalTime" DOUBLE PRECISION,
    "finalPlace" INTEGER,

    CONSTRAINT "RaceDriver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "raceTime" INTEGER NOT NULL DEFAULT 180,
    "laps" INTEGER NOT NULL DEFAULT 3,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bet" (
    "id" SERIAL NOT NULL,
    "raceId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "raceDriverId" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "RaceDriver" ADD CONSTRAINT "RaceDriver_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceDriver" ADD CONSTRAINT "RaceDriver_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceDriver" ADD CONSTRAINT "RaceDriver_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_raceDriverId_fkey" FOREIGN KEY ("raceDriverId") REFERENCES "RaceDriver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
