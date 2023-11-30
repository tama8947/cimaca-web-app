/*
  Warnings:

  - You are about to drop the column `role` on the `tbl_users` table. All the data in the column will be lost.
  - Changed the type of `state` on the `tbl_references` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "tbl_references" DROP COLUMN "state",
ADD COLUMN     "state" "State" NOT NULL;

-- AlterTable
ALTER TABLE "tbl_users" DROP COLUMN "role",
ADD COLUMN     "role_id" TEXT;

-- CreateTable
CREATE TABLE "tbl_roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_modules" (
    "id" TEXT NOT NULL,
    "parent_id" TEXT,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_roles_modules" (
    "role_id" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,
    "permissions" TEXT[],

    CONSTRAINT "tbl_roles_modules_pkey" PRIMARY KEY ("role_id","module_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_roles_name_key" ON "tbl_roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_modules_name_key" ON "tbl_modules"("name");

-- AddForeignKey
ALTER TABLE "tbl_users" ADD CONSTRAINT "tbl_users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "tbl_roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_roles_modules" ADD CONSTRAINT "tbl_roles_modules_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "tbl_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_roles_modules" ADD CONSTRAINT "tbl_roles_modules_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "tbl_modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
