CREATE TABLE `monetization_leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`email` varchar(320) NOT NULL,
	`interest` varchar(80) NOT NULL,
	`message` text,
	`consent` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `monetization_leads_id` PRIMARY KEY(`id`)
);
