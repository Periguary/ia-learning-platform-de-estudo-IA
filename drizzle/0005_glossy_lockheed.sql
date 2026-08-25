CREATE TABLE `user_ai_update_favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`updateId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_ai_update_favorites_id` PRIMARY KEY(`id`)
);
