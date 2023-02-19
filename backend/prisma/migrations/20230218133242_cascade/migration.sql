-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_habitId_fkey";

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
