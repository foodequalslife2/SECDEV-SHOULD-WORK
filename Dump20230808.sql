-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: secdv_mic
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `commentID` int NOT NULL,
  `commenterID` int DEFAULT NULL,
  `postID` int DEFAULT NULL,
  `username` varchar(999) DEFAULT NULL,
  `content` longtext,
  `isDeleted` tinyint DEFAULT NULL,
  PRIMARY KEY (`commentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1000100411,1000,10041,'migsbb','lol',0),(1002100311,1002,10031,'iceice','hey thats pretty nice',0),(1005100411,1005,10041,'dmitrilover','Looks like Dmitri',0),(1005100412,1005,10041,'dmitrilover','Wait no',0),(1005100413,1005,10041,'dmitrilover','But maybe',0),(1006100021,1006,10002,'propername','test',0);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log` (
  `logID` int NOT NULL,
  `operation` varchar(999) DEFAULT NULL,
  `username` varchar(999) DEFAULT NULL,
  `operationDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`logID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
INSERT INTO `log` VALUES (1,'Commented on 10002','testname','2023-08-08 08:50:24'),(2,'User logged out at 2023-08-08','testname','2023-08-08 08:50:24'),(3,'User logged in at 2023-08-08','admin','2023-08-08 08:50:24'),(4,'User changed avatar photo at path ../images/avatar/admin.png','undefined','2023-08-08 08:50:24'),(5,'User changed avatar photo at path ../images/avatar/admin.png','undefined','2023-08-08 08:50:24'),(6,'User changed avatar photo at path ../images/avatar/admin.png','admin','2023-08-08 08:50:24'),(7,'Posted 10011','admin','2023-08-08 08:50:24'),(8,'User logged out at 2023-08-08','admin','2023-08-08 08:50:24'),(9,'User logged in at 2023-08-08','testname','2023-08-08 08:50:24'),(10,'User updated profile information from testname, , ,  to propername, Proper, Name, 09494949494','propername','2023-08-08 08:50:24'),(11,'User logged in at 2023-08-08','migsbb','2023-08-08 08:50:24'),(12,'User updated profile information from migsbb, , ,  to migsbb, Miguel, Baliog, 09494949494','migsbb','2023-08-08 08:50:24'),(13,'User updated password','migsbb','2023-08-08 08:50:24'),(14,'User logged out at 2023-08-08','migsbb','2023-08-08 08:50:24'),(15,'User logged in at 2023-08-08','migsbb','2023-08-08 08:50:24'),(16,'User logged out at 2023-08-08','migsbb','2023-08-08 08:50:24'),(17,'User logged in at 2023-08-08','admin','2023-08-08 08:50:24');
/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `postID` int NOT NULL,
  `posterID` int DEFAULT NULL,
  `username` varchar(999) DEFAULT NULL,
  `type` varchar(999) DEFAULT NULL,
  `contentPath` longtext,
  `description` longtext,
  `likes` int DEFAULT '0',
  `isDeleted` tinyint DEFAULT '0',
  PRIMARY KEY (`postID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (10001,1000,'migsbb','image','../images/posts/10001.jpg','test',0,0),(10002,1000,'migsbb','image','../images/posts/10002.jpg','longer test',0,0),(10011,1001,'admin','image','../images/posts/10011.png','Mask example',0,0),(10021,1002,'iceice','audio','../audio/posts/10021.mp3','much longer test',0,0),(10031,1003,'heyimia','video','../videos/posts/10031.mp4','much longer test',0,0),(10041,1004,'notgohan','video','../videos/posts/10041.mp4','much longerest test description for testing purposes',0,0);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tab`
--

DROP TABLE IF EXISTS `tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tab` (
  `tabsID` int NOT NULL,
  `tabsName` varchar(999) DEFAULT NULL,
  `tabsInstrument` varchar(999) DEFAULT NULL,
  `URL` varchar(999) DEFAULT NULL,
  PRIMARY KEY (`tabsID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tab`
--

LOCK TABLES `tab` WRITE;
/*!40000 ALTER TABLE `tab` DISABLE KEYS */;
INSERT INTO `tab` VALUES (1,'Somewhere Over The Rainbow','Ukulele','somewhere_over_the_rainbow'),(2,'Adventure Time (Theme)','Ukulele','adventure_time_theme'),(3,'Another One Bites The Dust','Bass','another_one_bites_the_dust'),(4,'Cups','Ukulele','cups'),(5,'Like Im Gonna Lose You','Bass','like_im_gonna_lose_you'),(6,'Smells Like Teen Spirit','Bass','smells_like_teen_spirit'),(7,'Pumped Up Kicks','Ukulele','pumped_up_kicks'),(8,'Riptide','Ukulele','riptide'),(9,'Feel Good Inc.','Bass','feel_good_inc'),(10,'Perfect','Guitar','perfect'),(11,'Seven Nation Army','Bass','seven_nation_army');
/*!40000 ALTER TABLE `tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userID` int NOT NULL,
  `username` varchar(999) DEFAULT NULL,
  `password` longtext,
  `email` varchar(999) DEFAULT NULL,
  `firstName` varchar(999) DEFAULT NULL,
  `lastName` varchar(999) DEFAULT NULL,
  `phone` varchar(999) DEFAULT NULL,
  `numPosts` int DEFAULT '0',
  `followers` int DEFAULT '0',
  `avatar` longtext,
  `isDeleted` tinyint DEFAULT '0',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1000,'migsbb','$2b$10$VpG6eimt59RvkckCBC1Qze0wbd4IUaGxMeak0LKZ1IfxCpolfMs.O','miguelbaliog@gmail.com','Miguel','Baliog','9494949494',0,0,'../images/avatar/migsbb.png',0),(1001,'admin','$2b$10$MHpKU8Nur.do1wPCyfrku.EXcOXUGGs22C0aB7Jkz9il5eMF6cEVS','adminemail@mic.com','Mister','Administrator','123456789',0,0,'../images/avatar/default.png',0),(1002,'iceice','$2b$10$RITYIKJzc2arG.sjSy0gRuwGwNHVDG8K.OgwfwnLqQaNlGfAcDndq','isaiahmajarreis@gmail.com','Isaiah','Majarreis','09061355688',0,0,'../images/avatar/default.png',0),(1003,'heyimia','$2b$10$3EVwj/MNi/ntDWH6M18uLOgiNf9OO2z0tBtAi5LqthupMUlzL4VCa','francescalopez@gmail.com','Francesca','Lopez','09061357888',0,0,'../images/avatar/default.png',0),(1004,'notgohan','$2b$10$TPDjRI/DGdlJLeEqzc60j.UWFP9fXkA9682ynfvxAXzOrLFy5nr3O','kylehebert@gmail.com','Kyle','Hebert','09061231234',0,0,'../images/avatar/default.png',0),(1005,'dmitrilover','$2b$10$DCCo7oVT1AFCljw/07tiqumQjyAfSQU3dSBdL/sRPO3c6xql5ViAG','ericalindbeck@gmail.com','Erica','Lindbeck','09061235099',0,0,'../images/avatar/dmitrilover.jpg',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-08  9:07:26
