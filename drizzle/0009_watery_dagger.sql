CREATE TABLE `challenge_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`challengeId` varchar(160) NOT NULL,
	`responseText` text NOT NULL,
	`notebookName` varchar(255),
	`notebookContent` text,
	`status` enum('submitted','evaluated','needs_review') NOT NULL DEFAULT 'submitted',
	`score` int,
	`feedback` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `challenge_submissions_id` PRIMARY KEY(`id`)
);
