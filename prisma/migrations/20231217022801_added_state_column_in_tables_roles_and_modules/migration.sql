-- AlterTable
ALTER TABLE "tbl_modules" ADD COLUMN     "state" "State" NOT NULL DEFAULT 'enabled';

-- AlterTable
ALTER TABLE "tbl_roles" ADD COLUMN     "state" "State" NOT NULL DEFAULT 'enabled';
