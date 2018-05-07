-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 06, 2018 at 08:02 PM
-- Server version: 10.1.26-MariaDB-0+deb9u1
-- PHP Version: 5.6.30-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `massage_demand`
--

create database massage_demand;
-- --------------------------------------------------------

--
-- Table structure for table `PAYMENTS`
--

CREATE TABLE `PAYMENTS` (
  `PaymentID` int(11) NOT NULL,
  `SessionID` int(11) NOT NULL,
  `Amount` int(11) NOT NULL,
  `TransactionID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `SESSIONS`
--

CREATE TABLE `SESSIONS` (
  `SessionID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `ProviderID` int(11) NOT NULL,
  `AddressID` int(11) NOT NULL,
  `MassageType` int(11) NOT NULL,
  `PreferredGender` int(11) NOT NULL,
  `MassageLength` int(11) NOT NULL,
  `SessionDateTime` datetime NOT NULL,
  `Equipements` tinyint(1) NOT NULL,
  `Pets` tinyint(1) NOT NULL,
  `MedicalInformation` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `USERADDRESS`
--

CREATE TABLE `USERADDRESS` (
  `AddressID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `AddressName` varchar(50) NOT NULL,
  `Lattitude` double NOT NULL,
  `Longitude` double NOT NULL,
  `Address` text NOT NULL,
  `ParkingLattitude` double NOT NULL,
  `ParkingLongitude` double NOT NULL,
  `ParkingAddress` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `USERS`
--

CREATE TABLE `USERS` (
  `UserID` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `EmailID` varchar(155) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Phone` varchar(11) NOT NULL,
  `ProfileImage` text NOT NULL,
  `AccountStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `PAYMENTS`
--
ALTER TABLE `PAYMENTS`
  ADD PRIMARY KEY (`PaymentID`);

--
-- Indexes for table `SESSIONS`
--
ALTER TABLE `SESSIONS`
  ADD PRIMARY KEY (`SessionID`);

--
-- Indexes for table `USERADDRESS`
--
ALTER TABLE `USERADDRESS`
  ADD PRIMARY KEY (`AddressID`),
  ADD KEY `user_address_const` (`UserID`);

--
-- Indexes for table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `EmailID` (`EmailID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `PAYMENTS`
--
ALTER TABLE `PAYMENTS`
  MODIFY `PaymentID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `SESSIONS`
--
ALTER TABLE `SESSIONS`
  MODIFY `SessionID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `USERADDRESS`
--
ALTER TABLE `USERADDRESS`
  MODIFY `AddressID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `USERS`
--
ALTER TABLE `USERS`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `USERADDRESS`
--
ALTER TABLE `USERADDRESS`
  ADD CONSTRAINT `user_address_const` FOREIGN KEY (`UserID`) REFERENCES `USERS` (`UserID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
