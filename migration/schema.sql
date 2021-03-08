SET foreign_key_check =0;

SET names='utf8';
SET character_set_database='utf8mb4';
SET collation_database ='utf8mb4_unicode_ci';
SET CHARACTER SET utf8mb4, CHARACTER_SET_CONNECTION =utf8mb4;

CREATE TABLE IF NOT EXISTS `contact`(
  `id` INT(11)  NOT NULL AUTO_INCREMENT PRIMARY KEY  ,
  `firstname` VARCHAR(255),
  `lastname` VARCHAR(255),
  `email` VARCHAR(255),
  `company` VARCHAR (255),
  `phone` VARCHAR(24)
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP 
)ENGINE=InnoDB DEFAULT CHARACTER SET =utf8mb4 DEFAULT COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `user`(
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `username` VARCHAR(30) NOT NULL ,
  `password` VARCHAR(255) NOT NULL  
)ENGINE=InnoDB DEFAULT CHARACTER SET =utf8mb4 DEFAULT COLLATE=utfmb4_unicode_ci;
