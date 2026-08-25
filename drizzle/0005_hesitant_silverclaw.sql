CREATE TABLE `user_radar_favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`radarItemId` varchar(180) NOT NULL,
	`title` varchar(300) NOT NULL,
	`summary` text NOT NULL,
	`category` varchar(80) NOT NULL,
	`sourceName` varchar(160) NOT NULL,
	`sourceUrl` varchar(500) NOT NULL,
	`relatedModules` text NOT NULL,
	`learningAction` text NOT NULL,
	`publishedAt` varchar(40),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_radar_favorites_id` PRIMARY KEY(`id`)
);
