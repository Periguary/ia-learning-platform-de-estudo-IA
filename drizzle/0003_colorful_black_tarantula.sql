CREATE TABLE `library_reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`libraryItemId` varchar(120) NOT NULL,
	`userId` int NOT NULL,
	`userName` varchar(160) NOT NULL,
	`rating` int NOT NULL,
	`comment` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `library_reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_library_favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`libraryItemId` varchar(120) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_library_favorites_id` PRIMARY KEY(`id`)
);
