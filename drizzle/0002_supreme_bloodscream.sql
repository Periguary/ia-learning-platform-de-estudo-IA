CREATE TABLE `ai_update_candidates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sourceUrl` varchar(500) NOT NULL,
	`sourceName` varchar(160) NOT NULL,
	`title` varchar(300) NOT NULL,
	`summary` text NOT NULL,
	`category` varchar(80) NOT NULL,
	`relatedModules` text NOT NULL,
	`learningAction` text NOT NULL,
	`publishedAt` timestamp,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ai_update_candidates_id` PRIMARY KEY(`id`)
);
