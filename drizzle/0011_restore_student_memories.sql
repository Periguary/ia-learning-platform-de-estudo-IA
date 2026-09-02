CREATE TABLE IF NOT EXISTS `student_memories` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `topic` varchar(255) NOT NULL,
  `summary` text NOT NULL,
  `category` varchar(80) NOT NULL DEFAULT 'Geral',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `student_memories_id` PRIMARY KEY(`id`)
);
