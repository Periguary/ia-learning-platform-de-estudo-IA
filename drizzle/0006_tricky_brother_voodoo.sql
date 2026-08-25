ALTER TABLE `user_ai_update_favorites` RENAME COLUMN `updateId` TO `updateKey`;--> statement-breakpoint
ALTER TABLE `user_ai_update_favorites` MODIFY COLUMN `updateKey` varchar(200) NOT NULL;