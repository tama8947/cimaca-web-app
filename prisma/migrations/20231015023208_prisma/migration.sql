/*
  Warnings:

  - You are about to drop the column `userId` on the `tbl_daily_income_cuts` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `tbl_daily_movement_novelties` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `tbl_daily_movement_novelties` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tbl_references` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `tbl_references` table. All the data in the column will be lost.
  - You are about to drop the column `dominio` on the `tbl_references` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `tbl_references` table. All the data in the column will be lost.
  - You are about to drop the column `opcional` on the `tbl_references` table. All the data in the column will be lost.
  - You are about to drop the column `rango_valor` on the `tbl_references` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tbl_references` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `tbl_daily_income_cuts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `tbl_daily_movement_novelties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `tbl_daily_movement_novelties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domain` to the `tbl_references` table without a default value. This is not possible if the table is not empty.
  - Added the required column `range_value` to the `tbl_references` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `tbl_references` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `tbl_references` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tbl_daily_income_cuts" DROP CONSTRAINT "tbl_daily_income_cuts_userId_fkey";

-- DropForeignKey
ALTER TABLE "tbl_daily_movement_novelties" DROP CONSTRAINT "tbl_daily_movement_novelties_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "tbl_daily_movement_novelties" DROP CONSTRAINT "tbl_daily_movement_novelties_userId_fkey";

-- AlterTable
ALTER TABLE "tbl_daily_income_cuts" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tbl_daily_movement_novelties" DROP COLUMN "categoryId",
DROP COLUMN "userId",
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tbl_references" DROP COLUMN "createdAt",
DROP COLUMN "descripcion",
DROP COLUMN "dominio",
DROP COLUMN "estado",
DROP COLUMN "opcional",
DROP COLUMN "rango_valor",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "domain" TEXT NOT NULL,
ADD COLUMN     "optional" TEXT,
ADD COLUMN     "range_value" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "tbl_daily_income_cuts" ADD CONSTRAINT "tbl_daily_income_cuts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tbl_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_daily_movement_novelties" ADD CONSTRAINT "tbl_daily_movement_novelties_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "tbl_references"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_daily_movement_novelties" ADD CONSTRAINT "tbl_daily_movement_novelties_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tbl_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
