/*
  Warnings:

  - You are about to drop the `task_subtask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "task_subtask" DROP CONSTRAINT "task_subtask_subtaskId_fkey";

-- DropForeignKey
ALTER TABLE "task_subtask" DROP CONSTRAINT "task_subtask_taskId_fkey";

-- AlterTable
ALTER TABLE "subtask" ADD COLUMN     "taskId" TEXT;

-- DropTable
DROP TABLE "task_subtask";

-- AddForeignKey
ALTER TABLE "subtask" ADD CONSTRAINT "subtask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
