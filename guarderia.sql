-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 11, 2023 at 01:29 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `guarderia`
--
CREATE DATABASE IF NOT EXISTS `guarderia` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `guarderia`;

-- --------------------------------------------------------

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
CREATE TABLE `administrador` (
  `id_administrador` int(11) NOT NULL,
  `nombre_administrador` varchar(200) NOT NULL,
  `password_administrador` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `administrador`
--

INSERT INTO `administrador` (`id_administrador`, `nombre_administrador`, `password_administrador`) VALUES
(22, 'Sebastian', '1234'),
(23, 'Roberto', '76543210'),
(26, 'Nahuel', 'nh74345');

-- --------------------------------------------------------

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
CREATE TABLE `empleado` (
  `codigo_empleado` int(11) NOT NULL,
  `nombre_empleado` varchar(200) NOT NULL,
  `password_empleado` varchar(100) NOT NULL,
  `direccion_empleado` varchar(200) DEFAULT NULL,
  `telefono_empleado` varchar(20) DEFAULT NULL,
  `especialidad_empleado` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `empleado`
--

INSERT INTO `empleado` (`codigo_empleado`, `nombre_empleado`, `password_empleado`, `direccion_empleado`, `telefono_empleado`, `especialidad_empleado`) VALUES
(1, 'Ariel', 'ar432', 'Av. Triunvirato 1234', NULL, NULL),
(2, 'Gastón', 'g12', 'Av. Triunvirato 12345', '+75 3 12376543', 'Mecánica'),
(3, 'Ariel', 'ar12', NULL, NULL, NULL),
(97645, 'rodrigo', 'Password', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `empleado_zona`
--

DROP TABLE IF EXISTS `empleado_zona`;
CREATE TABLE `empleado_zona` (
  `empleado_zona_id` int(11) NOT NULL,
  `codigo_empleado` int(11) NOT NULL,
  `letra_zona` varchar(1) NOT NULL,
  `cantidad_vehiculos_encargados` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `empleado_zona`
--

INSERT INTO `empleado_zona` (`empleado_zona_id`, `codigo_empleado`, `letra_zona`, `cantidad_vehiculos_encargados`) VALUES
(8, 2, 'a', 0),
(11, 1, 'a', 0),
(12, 1, 'c', 0);

-- --------------------------------------------------------

--
-- Table structure for table `garage`
--

DROP TABLE IF EXISTS `garage`;
CREATE TABLE `garage` (
  `numero_garage` int(11) NOT NULL,
  `lectura_contador_luz_garage` float DEFAULT NULL,
  `tiene_servicios_mantenimiento_contratados` tinyint(4) DEFAULT NULL,
  `dni_socio` int(11) DEFAULT NULL,
  `fecha_compra_garage` date DEFAULT NULL,
  `letra_zona` char(1) DEFAULT NULL,
  `matricula_vehiculo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `garage`
--

INSERT INTO `garage` (`numero_garage`, `lectura_contador_luz_garage`, `tiene_servicios_mantenimiento_contratados`, `dni_socio`, `fecha_compra_garage`, `letra_zona`, `matricula_vehiculo`) VALUES
(1, 9876, 1, 1, '2023-01-19', 'b', 'AE 543 FG'),
(2, 0, 0, 43322123, NULL, 'a', NULL),
(3, 123.4, 0, 1, NULL, 'a', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `socio`
--

DROP TABLE IF EXISTS `socio`;
CREATE TABLE `socio` (
  `dni_socio` int(11) NOT NULL,
  `nombre_socio` varchar(200) NOT NULL,
  `password_socio` varchar(100) NOT NULL,
  `direccion_socio` varchar(200) DEFAULT NULL,
  `telefono_socio` varchar(20) DEFAULT NULL,
  `ingreso_socio` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `socio`
--

INSERT INTO `socio` (`dni_socio`, `nombre_socio`, `password_socio`, `direccion_socio`, `telefono_socio`, `ingreso_socio`) VALUES
(1, 'Lucas', 'lc52', 'Av. Corrientes 43123', '+23 2 12345567', '2023-01-19'),
(85, 'Carlos', 'c564', '', '+332 2 54323453', '2023-01-12'),
(43322123, 'Alexis', 'al543', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vehiculo`
--

DROP TABLE IF EXISTS `vehiculo`;
CREATE TABLE `vehiculo` (
  `matricula_vehiculo` varchar(100) NOT NULL,
  `nombre_vehiculo` varchar(100) DEFAULT NULL,
  `tipo_vehiculo` varchar(100) DEFAULT NULL,
  `alto_vehiculo` float DEFAULT NULL,
  `ancho_vehiculo` float DEFAULT NULL,
  `profundidad_vehiculo` float DEFAULT NULL,
  `dni_socio` int(11) DEFAULT NULL,
  `numero_garage` int(11) DEFAULT NULL,
  `fecha_asignacion_garage` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehiculo`
--

INSERT INTO `vehiculo` (`matricula_vehiculo`, `nombre_vehiculo`, `tipo_vehiculo`, `alto_vehiculo`, `ancho_vehiculo`, `profundidad_vehiculo`, `dni_socio`, `numero_garage`, `fecha_asignacion_garage`) VALUES
('AB 123 CD', 'Volkswagen Amarok', 'Camioneta', 200, 150, 350, 43322123, 2, NULL),
('ABC 123', 'Ford Fiesta', 'Auto', 123, 60, 321, 43322123, NULL, NULL),
('AE 543 FG', 'Peugeot 208', 'Auto', 123, 70, 350, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `zona`
--

DROP TABLE IF EXISTS `zona`;
CREATE TABLE `zona` (
  `letra_zona` char(1) NOT NULL,
  `tipo_vehiculo_zona` varchar(100) DEFAULT NULL,
  `numero_vehiculos_contenidos_zona` int(11) DEFAULT NULL,
  `profundidad_garage_zona` float DEFAULT NULL,
  `ancho_garage_zona` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zona`
--

INSERT INTO `zona` (`letra_zona`, `tipo_vehiculo_zona`, `numero_vehiculos_contenidos_zona`, `profundidad_garage_zona`, `ancho_garage_zona`) VALUES
('a', 'Autos', 0, 500, 1000),
('b', 'cualquiera', 0, 1000, 2000),
('c', 'cualquiera', 0, 500, 2000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id_administrador`);

--
-- Indexes for table `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`codigo_empleado`);

--
-- Indexes for table `empleado_zona`
--
ALTER TABLE `empleado_zona`
  ADD PRIMARY KEY (`empleado_zona_id`),
  ADD KEY `codigo_empleado` (`codigo_empleado`),
  ADD KEY `letra_zona` (`letra_zona`);

--
-- Indexes for table `garage`
--
ALTER TABLE `garage`
  ADD PRIMARY KEY (`numero_garage`),
  ADD UNIQUE KEY `matricula_vehiculo` (`matricula_vehiculo`),
  ADD KEY `dni_socio` (`dni_socio`),
  ADD KEY `letra_zona` (`letra_zona`);

--
-- Indexes for table `socio`
--
ALTER TABLE `socio`
  ADD PRIMARY KEY (`dni_socio`);

--
-- Indexes for table `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`matricula_vehiculo`),
  ADD UNIQUE KEY `numero_garage_2` (`numero_garage`),
  ADD KEY `dni_socio` (`dni_socio`),
  ADD KEY `numero_garage` (`numero_garage`);

--
-- Indexes for table `zona`
--
ALTER TABLE `zona`
  ADD PRIMARY KEY (`letra_zona`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administrador`
--
ALTER TABLE `administrador`
  MODIFY `id_administrador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `empleado_zona`
--
ALTER TABLE `empleado_zona`
  MODIFY `empleado_zona_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `empleado_zona`
--
ALTER TABLE `empleado_zona`
  ADD CONSTRAINT `empleado_zona_ibfk_1` FOREIGN KEY (`codigo_empleado`) REFERENCES `empleado` (`codigo_empleado`),
  ADD CONSTRAINT `empleado_zona_ibfk_2` FOREIGN KEY (`letra_zona`) REFERENCES `zona` (`letra_zona`);

--
-- Constraints for table `garage`
--
ALTER TABLE `garage`
  ADD CONSTRAINT `garage_ibfk_1` FOREIGN KEY (`dni_socio`) REFERENCES `socio` (`dni_socio`),
  ADD CONSTRAINT `garage_ibfk_2` FOREIGN KEY (`letra_zona`) REFERENCES `zona` (`letra_zona`),
  ADD CONSTRAINT `garage_ibfk_3` FOREIGN KEY (`matricula_vehiculo`) REFERENCES `vehiculo` (`matricula_vehiculo`);

--
-- Constraints for table `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD CONSTRAINT `vehiculo_ibfk_1` FOREIGN KEY (`dni_socio`) REFERENCES `socio` (`dni_socio`),
  ADD CONSTRAINT `vehiculo_ibfk_2` FOREIGN KEY (`numero_garage`) REFERENCES `garage` (`numero_garage`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
