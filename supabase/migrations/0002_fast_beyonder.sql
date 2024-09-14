ALTER TABLE "wishes_table" RENAME COLUMN "user_uid" TO "user_id";--> statement-breakpoint
ALTER TABLE "wishes_table" DROP CONSTRAINT "wishes_table_user_uid_unique";--> statement-breakpoint
ALTER TABLE "wishes_table" ADD CONSTRAINT "wishes_table_user_id_unique" UNIQUE("user_id");