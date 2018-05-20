-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 20, 2018 at 04:15 PM
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

drop database massage_demand;
create database massage_demand;
use massage_demand;
-- --------------------------------------------------------

--
-- Table structure for table `PAYMENTS`
--

CREATE TABLE `PAYMENTS` (
  `PaymentID` int(11) NOT NULL,
  `SessionID` int(11) NOT NULL,
  `Amount` int(11) NOT NULL,
  `TransactionID` varchar(255) NOT NULL DEFAULT 'NOTDONE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `PAYMENTS`
--

INSERT INTO `PAYMENTS` (`PaymentID`, `SessionID`, `Amount`, `TransactionID`) VALUES
(1, 1, 150, '&#9362bjkabh');

-- --------------------------------------------------------

--
-- Table structure for table `PROVIDERDOCS`
--

CREATE TABLE `PROVIDERDOCS` (
  `ProviderDocID` int(11) NOT NULL,
  `ProviderID` int(11) NOT NULL,
  `DocTitle` varchar(250) NOT NULL,
  `DocContent` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `PROVIDERS`
--

CREATE TABLE `PROVIDERS` (
  `ProviderID` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `EmailID` varchar(150) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Phone` varchar(15) NOT NULL,
  `ProfileImage` text NOT NULL,
  `Experience` varchar(50) NOT NULL,
  `Qualifications` varchar(50) NOT NULL,
  `ProviderLattitude` float NOT NULL,
  `ProviderLongitude` float NOT NULL,
  `Resume` text NOT NULL,
  `AccountStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `PROVIDERS`
--

INSERT INTO `PROVIDERS` (`ProviderID`, `FirstName`, `LastName`, `EmailID`, `Password`, `Phone`, `ProfileImage`, `Experience`, `Qualifications`, `ProviderLattitude`, `ProviderLongitude`, `Resume`, `AccountStatus`) VALUES
(6, 'Rahul ', 'Sinha', 'rahul.sinha1908@gmail.com', 'Hello@12345', '9905264774', '', '2-3 years', 'Graduate', 13.0328, 77.5626, '', 11);

-- --------------------------------------------------------

--
-- Table structure for table `SESSIONS`
--

CREATE TABLE `SESSIONS` (
  `SessionID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `ProviderID` int(11) NOT NULL,
  `AddressID` int(11) NOT NULL,
  `MassageType` varchar(50) NOT NULL,
  `PreferredGender` int(11) NOT NULL,
  `MassageLength` int(11) NOT NULL,
  `SessionDateTime` datetime NOT NULL,
  `Equipements` tinyint(1) NOT NULL,
  `Pets` varchar(20) NOT NULL,
  `MedicalInformation` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `SESSIONS`
--

INSERT INTO `SESSIONS` (`SessionID`, `UserID`, `ProviderID`, `AddressID`, `MassageType`, `PreferredGender`, `MassageLength`, `SessionDateTime`, `Equipements`, `Pets`, `MedicalInformation`) VALUES
(1, 1, 6, 1, 'Tissue Massage', 0, 60, '2018-05-29 00:00:00', 0, 'cat', 'I am good in health');

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

--
-- Dumping data for table `USERADDRESS`
--

INSERT INTO `USERADDRESS` (`AddressID`, `UserID`, `AddressName`, `Lattitude`, `Longitude`, `Address`, `ParkingLattitude`, `ParkingLongitude`, `ParkingAddress`) VALUES
(1, 1, 'Home', 13.0327576, 77.5625732, '#184-B, 7th Main, 3rd Cross, Mathikere Extension, Bangalore', 0, 0, 'Its near to my flat');

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
  `Gender` varchar(10) NOT NULL,
  `AccountStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `USERS`
--

INSERT INTO `USERS` (`UserID`, `FirstName`, `LastName`, `EmailID`, `Password`, `Phone`, `ProfileImage`, `Gender`, `AccountStatus`) VALUES
(1, 'Rahul', 'Sinha', 'rahul12345@gmail.com', 'Hello@12345', '9905264774', '', 'Male', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `PAYMENTS`
--
ALTER TABLE `PAYMENTS`
  ADD PRIMARY KEY (`PaymentID`),
  ADD KEY `SessionID` (`SessionID`);

--
-- Indexes for table `PROVIDERDOCS`
--
ALTER TABLE `PROVIDERDOCS`
  ADD PRIMARY KEY (`ProviderDocID`),
  ADD KEY `PROVIDERDOCS` (`ProviderID`);

--
-- Indexes for table `PROVIDERS`
--
ALTER TABLE `PROVIDERS`
  ADD PRIMARY KEY (`ProviderID`),
  ADD UNIQUE KEY `EmailID` (`EmailID`);

--
-- Indexes for table `SESSIONS`
--
ALTER TABLE `SESSIONS`
  ADD PRIMARY KEY (`SessionID`),
  ADD KEY `SESSIONS` (`ProviderID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `AddressID` (`AddressID`);

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
  MODIFY `PaymentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `PROVIDERDOCS`
--
ALTER TABLE `PROVIDERDOCS`
  MODIFY `ProviderDocID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `PROVIDERS`
--
ALTER TABLE `PROVIDERS`
  MODIFY `ProviderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `SESSIONS`
--
ALTER TABLE `SESSIONS`
  MODIFY `SessionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `USERADDRESS`
--
ALTER TABLE `USERADDRESS`
  MODIFY `AddressID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `USERS`
--
ALTER TABLE `USERS`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `PAYMENTS`
--
ALTER TABLE `PAYMENTS`
  ADD CONSTRAINT `PAYMENTS_ibfk_1` FOREIGN KEY (`SessionID`) REFERENCES `SESSIONS` (`SessionID`);

--
-- Constraints for table `PROVIDERDOCS`
--
ALTER TABLE `PROVIDERDOCS`
  ADD CONSTRAINT `PROVIDERDOCS` FOREIGN KEY (`ProviderID`) REFERENCES `PROVIDERS` (`ProviderID`);

--
-- Constraints for table `SESSIONS`
--
ALTER TABLE `SESSIONS`
  ADD CONSTRAINT `SESSIONS` FOREIGN KEY (`ProviderID`) REFERENCES `PROVIDERS` (`ProviderID`),
  ADD CONSTRAINT `SESSIONS_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `USERS` (`UserID`),
  ADD CONSTRAINT `SESSIONS_ibfk_2` FOREIGN KEY (`AddressID`) REFERENCES `USERADDRESS` (`AddressID`);

--
-- Constraints for table `USERADDRESS`
--
ALTER TABLE `USERADDRESS`
  ADD CONSTRAINT `user_address_const` FOREIGN KEY (`UserID`) REFERENCES `USERS` (`UserID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
