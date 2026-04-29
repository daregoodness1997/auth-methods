-- CreateTable
CREATE TABLE "PersonalData" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gender" TEXT,
    "age" INTEGER,
    "nin" TEXT,
    "bvn" TEXT,
    "vin" TEXT,
    "maritalStatus" TEXT,

    CONSTRAINT "PersonalData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonalData_userId_key" ON "PersonalData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalData_nin_key" ON "PersonalData"("nin");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalData_bvn_key" ON "PersonalData"("bvn");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalData_vin_key" ON "PersonalData"("vin");

-- AddForeignKey
ALTER TABLE "PersonalData" ADD CONSTRAINT "PersonalData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
