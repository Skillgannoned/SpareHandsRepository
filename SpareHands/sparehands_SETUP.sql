DROP DATABASE IF EXISTS sparehands_db;
CREATE DATABASE sparehands_db;
USE sparehands_db;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `forename` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(30) NOT NULL,
  `dob` datetime NOT NULL,
  `picture_url` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `job`;
CREATE TABLE `job` (
  `id` int(15) unsigned NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) unsigned NOT NULL,
  `title` varchar(45) NOT NULL,
  `description` varchar(300) NOT NULL,
  `reward` varchar(100) NOT NULL,
  `location` varchar(45) NOT NULL,
  `date` datetime NOT NULL,
  `picture_url` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `job.owner_id-user.id` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `applicant`;
CREATE TABLE `applicant` (
  `id` int(15) unsigned NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) unsigned NOT NULL,
  `applicant_id` int(11) unsigned NOT NULL,
  `job_id` int(15) unsigned NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `job_id` (`job_id`),
  KEY `owner_id` (`owner_id`),
  KEY `applicant_id` (`applicant_id`),
  CONSTRAINT `applicant.applicant_id user.id` FOREIGN KEY (`applicant_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `applicant.job_id job.id` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`) ON DELETE CASCADE,
  CONSTRAINT `applicant.owner_id user.id` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;


LOCK TABLES user WRITE;
INSERT INTO user VALUES 
(1,'Sam','Power','sam@gmail.com','password', '1991-09-19 08:49:43',''),
(2,'John','Doe','john@gmail.com','password', '1991-09-19 08:49:43','');
LOCK TABLES job WRITE;
INSERT INTO job VALUES 
(1,1,'Cut Grass','1/2 Acre of grass to be cut! Need Help! Bring own mower!','$20','Athlone','2015-09-19 08:00:00',''),
(2,1,'Cut Grass','1/2 Acre of grass to be cut! Need Help! Bring own mower!','$20','Athlone','2015-09-19 08:00:00',''),
(3,1,'Cut Grass','1/2 Acre of grass to be cut! Need Help! Bring own mower!','$20','Athlone','2015-09-19 08:00:00',''),
(4,2,'Cut Grass','1/2 Acre of grass to be cut! Need Help! Bring own mower!','$20','Athlone','2015-09-19 08:00:00','');
LOCK TABLES applicant WRITE;
INSERT INTO applicant VALUES 
(1,1,2,1,TRUE);
UNLOCK TABLES;
