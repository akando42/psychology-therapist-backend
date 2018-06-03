-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 03, 2018 at 01:00 PM
-- Server version: 10.1.26-MariaDB-0+deb9u1
-- PHP Version: 5.6.30-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tod_database`
--

drop database if exists tod_database;
create database tod_database;
use tod_database;

-- --------------------------------------------------------

--
-- Table structure for table `ADMINTABLE`
--

CREATE TABLE `ADMINTABLE` (
  `AdminID` int(11) NOT NULL,
  `AdminFirstName` varchar(50) NOT NULL,
  `AdminLastName` varchar(50) NOT NULL,
  `AdminEmailID` varchar(150) NOT NULL,
  `AdminPassword` varchar(50) NOT NULL,
  `AdminImageLink` text NOT NULL,
  `AdminPhone` varchar(15) NOT NULL,
  `AdminOwnerStatus` tinyint(4) NOT NULL DEFAULT '0',
  `AdminAccountStatus` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `HRTABLE`
--

CREATE TABLE `HRTABLE` (
  `HRID` int(11) NOT NULL,
  `HRFirstName` varchar(50) NOT NULL,
  `HRLastName` varchar(50) NOT NULL,
  `HREmailID` varchar(150) NOT NULL,
  `HRPassword` varchar(50) NOT NULL,
  `HRImageLink` text NOT NULL,
  `HRPhone` tinyint(4) NOT NULL,
  `HRAccountStatus` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `PAYMENTS`
--

CREATE TABLE `PAYMENTS` (
  `PaymentID` int(11) NOT NULL,
  `SessionID` int(11) NOT NULL,
  `PaymentAmount` int(11) NOT NULL,
  `PaymentTransactionID` varchar(255) NOT NULL DEFAULT 'NOTDONE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `PAYMENTS`
--

INSERT INTO `PAYMENTS` (`PaymentID`, `SessionID`, `PaymentAmount`, `PaymentTransactionID`) VALUES
(1, 1, 150, '&#9362bjkabh');

-- --------------------------------------------------------

--
-- Table structure for table `PROVIDERDOCS`
--

CREATE TABLE `PROVIDERDOCS` (
  `ProviderDocID` int(11) NOT NULL,
  `ProviderID` int(11) NOT NULL,
  `ProviderDocTitle` varchar(250) NOT NULL,
  `ProviderDocContent` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `PROVIDERNOTIFICATION`
--

CREATE TABLE `PROVIDERNOTIFICATION` (
  `ProviderNotificationID` int(11) NOT NULL,
  `ProviderID` int(11) NOT NULL,
  `ProviderNotificationContent` text NOT NULL,
  `ProviderNotificationDT` datetime NOT NULL,
  `ProviderNotificationReadStatus` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `PROVIDERS`
--

CREATE TABLE `PROVIDERS` (
  `ProviderID` int(11) NOT NULL,
  `HRID` int(11) DEFAULT NULL,
  `ProviderFirstName` varchar(50) NOT NULL,
  `ProviderLastName` varchar(50) NOT NULL,
  `ProviderEmailID` varchar(150) NOT NULL,
  `ProviderPassword` varchar(50) NOT NULL,
  `ProviderPhone` varchar(15) NOT NULL,
  `ProviderProfileImage` text NOT NULL,
  `ProviderExperience` varchar(50) NOT NULL,
  `ProviderQualifications` varchar(50) NOT NULL,
  `ProviderLattitude` float NOT NULL,
  `ProviderLongitude` float NOT NULL,
  `ProviderResume` text NOT NULL,
  `ProviderAccountStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `PROVIDERS`
--

INSERT INTO `PROVIDERS` (`ProviderID`, `HRID`, `ProviderFirstName`, `ProviderLastName`, `ProviderEmailID`, `ProviderPassword`, `ProviderPhone`, `ProviderProfileImage`, `ProviderExperience`, `ProviderQualifications`, `ProviderLattitude`, `ProviderLongitude`, `ProviderResume`, `ProviderAccountStatus`) VALUES
(6, NULL, 'Rahul ', 'Sinha', 'rahul.sinha1908@gmail.com', 'Hello@12345', '9905264774', '', '2-3 years', 'Graduate', 13.0328, 77.5626, '', 11);

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
  `UserAddressName` varchar(50) NOT NULL,
  `UserLattitude` double NOT NULL,
  `UserLongitude` double NOT NULL,
  `UserAddress` text NOT NULL,
  `UserParkingAddress` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `USERADDRESS`
--

INSERT INTO `USERADDRESS` (`AddressID`, `UserID`, `UserAddressName`, `UserLattitude`, `UserLongitude`, `UserAddress`, `UserParkingAddress`) VALUES
(1, 1, 'Home', 13.0327576, 77.5625732, '#184-B, 7th Main, 3rd Cross, Mathikere Extension, Bangalore', 'Its near to my flat');

-- --------------------------------------------------------

--
-- Table structure for table `USERS`
--

CREATE TABLE `USERS` (
  `UserID` int(11) NOT NULL,
  `UserFirstName` varchar(50) NOT NULL,
  `UserLastName` varchar(50) NOT NULL,
  `UserEmailID` varchar(155) NOT NULL,
  `UserPassword` varchar(50) NOT NULL,
  `UserPhone` varchar(11) NOT NULL,
  `UserProfileImage` text NOT NULL,
  `UserGender` varchar(10) NOT NULL,
  `UserAccountStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `USERS`
--

INSERT INTO `USERS` (`UserID`, `UserFirstName`, `UserLastName`, `UserEmailID`, `UserPassword`, `UserPhone`, `UserProfileImage`, `UserGender`, `UserAccountStatus`) VALUES
(1, 'Rahul', 'Sinha', 'rahul12345@gmail.com', 'Hello@12345', '9905264774', '', 'Male', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ADMINTABLE`
--
ALTER TABLE `ADMINTABLE`
  ADD PRIMARY KEY (`AdminID`),
  ADD UNIQUE KEY `AdminEmailConstraint` (`AdminEmailID`);

--
-- Indexes for table `HRTABLE`
--
ALTER TABLE `HRTABLE`
  ADD PRIMARY KEY (`HRID`),
  ADD UNIQUE KEY `HREmailConstraint` (`HREmailID`);

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
-- Indexes for table `PROVIDERNOTIFICATION`
--
ALTER TABLE `PROVIDERNOTIFICATION`
  ADD PRIMARY KEY (`ProviderNotificationID`),
  ADD KEY `ProviderNotificationConstraints` (`ProviderID`);

--
-- Indexes for table `PROVIDERS`
--
ALTER TABLE `PROVIDERS`
  ADD PRIMARY KEY (`ProviderID`),
  ADD UNIQUE KEY `EmailID` (`ProviderEmailID`),
  ADD KEY `ProviderHRConstraint` (`HRID`);

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
  ADD UNIQUE KEY `EmailID` (`UserEmailID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ADMINTABLE`
--
ALTER TABLE `ADMINTABLE`
  MODIFY `AdminID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `HRTABLE`
--
ALTER TABLE `HRTABLE`
  MODIFY `HRID` int(11) NOT NULL AUTO_INCREMENT;
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
-- AUTO_INCREMENT for table `PROVIDERNOTIFICATION`
--
ALTER TABLE `PROVIDERNOTIFICATION`
  MODIFY `ProviderNotificationID` int(11) NOT NULL AUTO_INCREMENT;
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
-- Constraints for table `PROVIDERNOTIFICATION`
--
ALTER TABLE `PROVIDERNOTIFICATION`
  ADD CONSTRAINT `ProviderNotificationConstraints` FOREIGN KEY (`ProviderID`) REFERENCES `PROVIDERS` (`ProviderID`);

--
-- Constraints for table `PROVIDERS`
--
ALTER TABLE `PROVIDERS`
  ADD CONSTRAINT `ProviderHRConstraint` FOREIGN KEY (`HRID`) REFERENCES `HRTABLE` (`HRID`);

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