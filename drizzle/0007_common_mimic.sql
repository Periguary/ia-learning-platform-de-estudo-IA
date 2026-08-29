CREATE TABLE `external_calendar_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`eventTitle` varchar(255) NOT NULL,
	`eventDate` varchar(64) NOT NULL,
	`source` varchar(64) NOT NULL DEFAULT 'google_calendar',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `external_calendar_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notion_sync_configs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`studyPlanId` int NOT NULL,
	`notionPageId` varchar(191) NOT NULL,
	`lastSyncedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notion_sync_configs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `student_memories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`topic` varchar(255) NOT NULL,
	`summary` text NOT NULL,
	`category` varchar(80) NOT NULL DEFAULT 'Geral',
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `student_memories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `study_plans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`focusArea` varchar(120) NOT NULL,
	`isCompleted` int NOT NULL DEFAULT 0,
	`progressPercent` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `study_plans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `saved_explanations` ADD `category` varchar(80) DEFAULT 'Geral' NOT NULL;--> statement-breakpoint
ALTER TABLE `user_radar_favorites` ADD `tags` text DEFAULT ('[]') NOT NULL;