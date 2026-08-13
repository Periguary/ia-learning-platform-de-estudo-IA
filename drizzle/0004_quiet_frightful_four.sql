CREATE TABLE `video_notes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`videoId` varchar(128) NOT NULL,
	`timestampSeconds` int NOT NULL DEFAULT 0,
	`noteText` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `video_notes_id` PRIMARY KEY(`id`)
);
