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
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `advert`;
CREATE TABLE `advert` (
  `id` int(15) unsigned NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) unsigned NOT NULL ,
  `title` varchar(45) NOT NULL,
  `description` varchar(300) NOT NULL,
  `reward` varchar(100) NOT NULL,
  `location` varchar(45) NOT NULL,
  `date` datetime NOT NULL,
  `picture_url` varchar(45) DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES user(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `applicant`;
CREATE TABLE `applicant` (
  `id` int(15) unsigned NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) unsigned NOT NULL ,
  `applicant_id` int(11) unsigned NOT NULL ,
  `advert_id` int(15) unsigned NOT NULL ,
  `status` boolean DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES user(id),
  FOREIGN KEY (applicant_id) REFERENCES user(id),
  FOREIGN KEY (advert_id) REFERENCES advert(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


LOCK TABLES user WRITE;
INSERT INTO user VALUES 
(1,'Sam','Power','sam@gmail.com','password', '1991-09-19 08:49:43',''),
(2,'John','Doe','john@gmail.com','password', '1991-09-19 08:49:43','');
LOCK TABLES advert WRITE;
INSERT INTO advert VALUES 
(1,1,'Cut Grass','1/2 Acre of grass to be cut! Need Help! Bring own mower!','$20','Athlone','2015-09-19 08:00:00','');
LOCK TABLES applicant WRITE;
INSERT INTO applicant VALUES 
(1,1,2,1,NULL);
UNLOCK TABLES;
