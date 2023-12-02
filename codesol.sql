-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: LeetCode
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `adminId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`adminId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Akash Girme','akash17g@gmail.com','$2b$10$IiNJO7de7Kow2MFg/NUj8ehTFH26Xh6iR17g2rz9uyvJ/ZknT2/MS');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problems`
--

DROP TABLE IF EXISTS `problems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `problems` (
  `problemid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `difficulty` enum('Easy','Medium','Hard','Expert') NOT NULL,
  `description` text NOT NULL,
  `exampleinput` text NOT NULL,
  `exampleoutput` text NOT NULL,
  `exampleexplanation` text,
  PRIMARY KEY (`problemid`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problems`
--

LOCK TABLES `problems` WRITE;
/*!40000 ALTER TABLE `problems` DISABLE KEYS */;
INSERT INTO `problems` VALUES (1,'401. Bitwise AND of Numbers Range','Medium','Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.','left = 5, right = 7','4',NULL),(2,'205. Add two numbers','Medium','Given two numbers, add them and return them in integer range. use MOD=1e9+7','a = 100 , b = 200','300',NULL),(3,'202. Happy Number','Easy','Write an algorithm to determine if a number n is happy.','n = 19','true',NULL),(4,'203. Remove Linked List Elements','Hard','Given number k , removed kth element','list: 1->2->3 , k=2','1->3',NULL),(5,'201. Bitwise AND of Numbers Range','Medium','Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.','left = 5, right = 7','4',NULL),(6,'205. Add two numbers','Medium','Given two numbers, add them and return them in integer range. use MOD=1e9+7','a = 100 , b = 200','300',NULL),(7,'202. Happy Number','Easy','Write an algorithm to determine if a number n is happy.','n = 19','true',NULL),(8,'203. Remove Linked List Elements','Hard','Given number k , removed kth element','list: 1->2->3 , k=2','1->3',NULL),(9,'125. is Palindrome','Easy','A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.','s = \"race a car\"','false','raceacar is not a palindrome.'),(10,'83. Remove Duplicates from Sorted List','Easy','Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.','head = [1,1,2,3,3]','[1,2,3]','explanation example'),(11,'Plus One','Easy','You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0\'s.  Increment the large integer by one and return the resulting array of digits.','digits = [1,2,3]','[1,2,4]','The array represents the integer 123. Incrementing by one gives 123 + 1 = 124. Thus, the result should be [1,2,4].'),(55,'Linear Search','Easy','You have given a random integer array of size N. You need to search for an integer X by using linear search and return the index at which integer X in present in given array.','1\n7\n2 13 4 1 3 6 28\n3','4','We have to search integer \'1\' in given array of size 7. Hence integer \'1\' is present in array at index 4. Hence the output is 4'),(73,'Linear Search','Easy','You have given a random integer array of size N. You need to search for an integer X by using linear search and return the index at which integer X in present in given array.','1\n7\n2 13 4 1 3 6 28\n3','4','We have to search integer \'1\' in given array of size 7. Hence integer \'1\' is present in array at index 4. Hence the output is 4'),(74,'Linear Search','Easy','You have given a random integer array of size N. You need to search for an integer X by using linear search and return the index at which integer X in present in given array.','1\n7\n2 13 4 1 3 6 28','4','We have to search integer 1 in array of size 7.\nSince integer 1 is present at index 4 hence output is 4.'),(75,'Binary Search','Easy','You have given a random integer array of size N. You need to search for an integer X by using linear search and return the index at which integer X in present in given array.','1\n7\n2 13 4 1 3 6 28','4','We have to search integer 1 in array of size 7.\nSince integer 1 is present at index 4 hence output is 4.');
/*!40000 ALTER TABLE `problems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solutions`
--

DROP TABLE IF EXISTS `solutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solutions` (
  `solution_id` int NOT NULL AUTO_INCREMENT,
  `problemid` int NOT NULL,
  `solution_text` text NOT NULL,
  PRIMARY KEY (`solution_id`),
  KEY `problemid` (`problemid`),
  CONSTRAINT `solutions_ibfk_1` FOREIGN KEY (`problemid`) REFERENCES `problems` (`problemid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solutions`
--

LOCK TABLES `solutions` WRITE;
/*!40000 ALTER TABLE `solutions` DISABLE KEYS */;
INSERT INTO `solutions` VALUES (1,1,'#include<iostream> int main(){std::cout<<Hello World}'),(2,2,'#include<iostream>\nint main(){\nstd::cout<<\"Hello World\";\n}');
/*!40000 ALTER TABLE `solutions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submission`
--

DROP TABLE IF EXISTS `submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submission` (
  `submission_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `problemid` int NOT NULL,
  `code` text NOT NULL,
  PRIMARY KEY (`submission_id`),
  KEY `user_id` (`user_id`),
  KEY `problemid` (`problemid`),
  CONSTRAINT `submission_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `submission_ibfk_2` FOREIGN KEY (`problemid`) REFERENCES `problems` (`problemid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submission`
--

LOCK TABLES `submission` WRITE;
/*!40000 ALTER TABLE `submission` DISABLE KEYS */;
INSERT INTO `submission` VALUES (5,10,73,'#include<iostream>\nint main(){\nint a;\nstd::cin>>a;\nstd::cout<<a;\nreturn 0;\n}');
/*!40000 ALTER TABLE `submission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testcases`
--

DROP TABLE IF EXISTS `testcases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testcases` (
  `testcaseid` int NOT NULL AUTO_INCREMENT,
  `problemid` int NOT NULL,
  `input` text NOT NULL,
  `Expectedoutput` text NOT NULL,
  PRIMARY KEY (`testcaseid`),
  KEY `problemid` (`problemid`),
  CONSTRAINT `testcases_ibfk_1` FOREIGN KEY (`problemid`) REFERENCES `problems` (`problemid`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testcases`
--

LOCK TABLES `testcases` WRITE;
/*!40000 ALTER TABLE `testcases` DISABLE KEYS */;
INSERT INTO `testcases` VALUES (1,10,'[1,1,2]','[1,2]'),(2,10,'[2,2,3,3,4,5,6,7,7]','[2,3,4,5,6,7]'),(3,10,'[2,3,4,5,5,6,7,7]','[2,3,4,5,6,7]'),(52,74,'2\n5\n1 2 3 4 5 ','1'),(53,74,'4\n6\n1 4 2 3 6 7','1'),(54,74,'5\n7\n1 2 3 4 5 6 7','4'),(55,75,'2\n5\n1 2 3 4 5 ','1'),(56,75,'4\n6\n1 4 2 3 6 7','1'),(57,75,'5\n7\n1 2 3 4 5 6 7','4'),(66,73,'2','2');
/*!40000 ALTER TABLE `testcases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `password` varchar(500) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10,'akash17@gmail.com','$2b$10$mN5jgOYTE3oTC7a8ak6Utuv7WeCdqTk6zKwkKhlYhR901X.8nbqJi');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-02 18:57:45
