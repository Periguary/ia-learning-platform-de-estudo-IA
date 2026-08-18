CREATE TABLE `saved_explanations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(300) NOT NULL,
	`content` text NOT NULL,
	`moduleId` varchar(120) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `saved_explanations_id` PRIMARY KEY(`id`)
);
