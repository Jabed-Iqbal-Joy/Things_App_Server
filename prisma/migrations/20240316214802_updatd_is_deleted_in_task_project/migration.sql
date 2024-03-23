/*
  Warnings:

  - You are about to drop the column `projectID` on the `project_tag` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `project_tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "project_tag" DROP CONSTRAINT "project_tag_projectID_fkey";

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "project_tag" DROP COLUMN "projectID",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "task" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "project_tag" ADD CONSTRAINT "project_tag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
