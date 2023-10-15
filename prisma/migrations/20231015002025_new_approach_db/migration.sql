/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "tbl_users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "last_name" TEXT NOT NULL,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "image" TEXT,
    "state" "State" NOT NULL,
    "verification_token" TEXT,
    "role" TEXT DEFAULT 'default',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_daily_income_cuts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category_id" TEXT NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_daily_income_cuts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_daily_movement_novelties" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "comment" TEXT,
    "categoryId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_daily_movement_novelties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_references" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL,
    "dominio" TEXT NOT NULL,
    "rango_valor" TEXT NOT NULL,
    "descripcion" TEXT,
    "opcional" TEXT,

    CONSTRAINT "tbl_references_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_users_email_key" ON "tbl_users"("email");

-- AddForeignKey
ALTER TABLE "tbl_daily_income_cuts" ADD CONSTRAINT "tbl_daily_income_cuts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbl_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_daily_income_cuts" ADD CONSTRAINT "tbl_daily_income_cuts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "tbl_references"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_daily_movement_novelties" ADD CONSTRAINT "tbl_daily_movement_novelties_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "tbl_references"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_daily_movement_novelties" ADD CONSTRAINT "tbl_daily_movement_novelties_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbl_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
