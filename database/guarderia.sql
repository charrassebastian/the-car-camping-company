CREATE DATABASE  IF NOT EXISTS `guarderia` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `guarderia`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: guarderia
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
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `id_administrador` int NOT NULL AUTO_INCREMENT,
  `nombre_administrador` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `password_administrador` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_administrador`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (22,'Sebastian','1234'),(23,'Robert','76543210'),(26,'Louis','nh74345');
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `codigo_empleado` int NOT NULL,
  `nombre_empleado` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `password_empleado` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `direccion_empleado` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telefono_empleado` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `especialidad_empleado` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`codigo_empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES (1,'James','ar432','Av. Triunvirato 1234',NULL,NULL),(2,'Steven','g12','Av. Triunvirato 12345','+75 3 12376543','Mechanics'),(3,'Matthew','ar12',NULL,NULL,NULL),(97645,'William','Password',NULL,NULL,NULL);
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado_zona`
--

DROP TABLE IF EXISTS `empleado_zona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado_zona` (
  `empleado_zona_id` int NOT NULL AUTO_INCREMENT,
  `codigo_empleado` int NOT NULL,
  `letra_zona` varchar(1) COLLATE utf8mb4_general_ci NOT NULL,
  `cantidad_vehiculos_encargados` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`empleado_zona_id`),
  KEY `codigo_empleado` (`codigo_empleado`),
  KEY `letra_zona` (`letra_zona`),
  CONSTRAINT `empleado_zona_ibfk_1` FOREIGN KEY (`codigo_empleado`) REFERENCES `empleado` (`codigo_empleado`),
  CONSTRAINT `empleado_zona_ibfk_2` FOREIGN KEY (`letra_zona`) REFERENCES `zona` (`letra_zona`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado_zona`
--

LOCK TABLES `empleado_zona` WRITE;
/*!40000 ALTER TABLE `empleado_zona` DISABLE KEYS */;
INSERT INTO `empleado_zona` VALUES (8,2,'a',0),(11,1,'a',0),(12,1,'c',0);
/*!40000 ALTER TABLE `empleado_zona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `garage`
--

DROP TABLE IF EXISTS `garage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `garage` (
  `numero_garage` int NOT NULL,
  `lectura_contador_luz_garage` float DEFAULT NULL,
  `tiene_servicios_mantenimiento_contratados` tinyint DEFAULT NULL,
  `dni_socio` int DEFAULT NULL,
  `fecha_compra_garage` date DEFAULT NULL,
  `letra_zona` char(1) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `matricula_vehiculo` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`numero_garage`),
  UNIQUE KEY `matricula_vehiculo` (`matricula_vehiculo`),
  KEY `dni_socio` (`dni_socio`),
  KEY `letra_zona` (`letra_zona`),
  CONSTRAINT `garage_ibfk_1` FOREIGN KEY (`dni_socio`) REFERENCES `socio` (`dni_socio`),
  CONSTRAINT `garage_ibfk_2` FOREIGN KEY (`letra_zona`) REFERENCES `zona` (`letra_zona`),
  CONSTRAINT `garage_ibfk_3` FOREIGN KEY (`matricula_vehiculo`) REFERENCES `vehiculo` (`matricula_vehiculo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `garage`
--

LOCK TABLES `garage` WRITE;
/*!40000 ALTER TABLE `garage` DISABLE KEYS */;
INSERT INTO `garage` VALUES (1,9876,1,1,'2023-01-19','b','AE 543 FG'),(2,0,0,43322123,NULL,'a',NULL),(3,123.4,0,1,NULL,'a',NULL);
/*!40000 ALTER TABLE `garage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socio`
--

DROP TABLE IF EXISTS `socio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socio` (
  `dni_socio` int NOT NULL,
  `nombre_socio` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `password_socio` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `direccion_socio` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telefono_socio` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ingreso_socio` date DEFAULT NULL,
  PRIMARY KEY (`dni_socio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socio`
--

LOCK TABLES `socio` WRITE;
/*!40000 ALTER TABLE `socio` DISABLE KEYS */;
INSERT INTO `socio` VALUES (1,'Luke','lc52','Av. Corrientes 43123','+23 2 12345567','2023-01-19'),(85,'Charles','c564','','+332 2 54323453','2023-01-12'),(43322123,'Alex','al543',NULL,NULL,NULL);
/*!40000 ALTER TABLE `socio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculo`
--

DROP TABLE IF EXISTS `vehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehiculo` (
  `matricula_vehiculo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `nombre_vehiculo` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tipo_vehiculo` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `alto_vehiculo` float DEFAULT NULL,
  `ancho_vehiculo` float DEFAULT NULL,
  `profundidad_vehiculo` float DEFAULT NULL,
  `dni_socio` int DEFAULT NULL,
  `numero_garage` int DEFAULT NULL,
  `fecha_asignacion_garage` date DEFAULT NULL,
  PRIMARY KEY (`matricula_vehiculo`),
  UNIQUE KEY `numero_garage_2` (`numero_garage`),
  KEY `dni_socio` (`dni_socio`),
  KEY `numero_garage` (`numero_garage`),
  CONSTRAINT `vehiculo_ibfk_1` FOREIGN KEY (`dni_socio`) REFERENCES `socio` (`dni_socio`),
  CONSTRAINT `vehiculo_ibfk_2` FOREIGN KEY (`numero_garage`) REFERENCES `garage` (`numero_garage`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculo`
--

LOCK TABLES `vehiculo` WRITE;
/*!40000 ALTER TABLE `vehiculo` DISABLE KEYS */;
INSERT INTO `vehiculo` VALUES ('AB 123 CD','Volkswagen Amarok','Truck',200,150,350,NULL,2,NULL),('ABC 123','Ford Fiesta','Auto',123,60,321,43322123,NULL,NULL),('AE 543 FG','Peugeot 208','Auto',123,70,350,1,1,NULL);
/*!40000 ALTER TABLE `vehiculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zona`
--

DROP TABLE IF EXISTS `zona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zona` (
  `letra_zona` char(1) COLLATE utf8mb4_general_ci NOT NULL,
  `tipo_vehiculo_zona` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `numero_vehiculos_contenidos_zona` int DEFAULT NULL,
  `profundidad_garage_zona` float DEFAULT NULL,
  `ancho_garage_zona` int DEFAULT NULL,
  PRIMARY KEY (`letra_zona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zona`
--

LOCK TABLES `zona` WRITE;
/*!40000 ALTER TABLE `zona` DISABLE KEYS */;
INSERT INTO `zona` VALUES ('a','Cars',0,500,1000),('b','Any',0,1000,2000),('c','Any',0,500,2000);
/*!40000 ALTER TABLE `zona` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-06 22:21:01
