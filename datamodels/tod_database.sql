-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 24, 2018 at 05:59 PM
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
  `AdminFirstName` varchar(50) DEFAULT NULL,
  `AdminLastName` varchar(50) DEFAULT NULL,
  `AdminEmailID` varchar(150) NOT NULL,
  `AdminPassword` varchar(50) DEFAULT NULL,
  `AdminImageLink` text,
  `AdminPhone` varchar(15) DEFAULT NULL,
  `AdminOwnerStatus` tinyint(4) NOT NULL DEFAULT '0',
  `AdminAccountStatus` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ADMINTABLE`
--

INSERT INTO `ADMINTABLE` (`AdminID`, `AdminFirstName`, `AdminLastName`, `AdminEmailID`, `AdminPassword`, `AdminImageLink`, `AdminPhone`, `AdminOwnerStatus`, `AdminAccountStatus`) VALUES
(1, 'Adam', 'Parsons', 'info@therapyondemand.io', 'Admin@12345', NULL, NULL, 1, 1),
(3, 'Rahul', 'Sinha', 'rahul.sinha1908@gmail.com', 'Hello@12345', NULL, NULL, 0, 1),
(4, 'Rahul', 'Sinha', 'rahul1@gmail.com', NULL, NULL, NULL, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `HRTABLE`
--

CREATE TABLE `HRTABLE` (
  `HRID` int(11) NOT NULL,
  `AdminID` int(11) NOT NULL,
  `HRFirstName` varchar(50) DEFAULT NULL,
  `HRLastName` varchar(50) DEFAULT NULL,
  `HREmailID` varchar(150) NOT NULL,
  `HRPassword` varchar(50) DEFAULT NULL,
  `HRImageLink` text,
  `HRPhone` varchar(15) DEFAULT NULL,
  `HRAccountStatus` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `HRTABLE`
--

INSERT INTO `HRTABLE` (`HRID`, `AdminID`, `HRFirstName`, `HRLastName`, `HREmailID`, `HRPassword`, `HRImageLink`, `HRPhone`, `HRAccountStatus`) VALUES
(1, 1, 'HR1', 'Title', 'hr@therapyondemand.io', 'Massage@12345', NULL, NULL, 1),
(4, 1, 'Rahul', 'Sinha', 'rahul1@gmail.com', NULL, NULL, NULL, 0),
(6, 1, 'Rahul', 'Sinha', 'rahul.sinha1908@gmail.com', NULL, NULL, NULL, 0);

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
(1, 1, 150, 'tok_1CctDhJtmWtuNWuH7IV0e5nH');

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

--
-- Dumping data for table `PROVIDERDOCS`
--

INSERT INTO `PROVIDERDOCS` (`ProviderDocID`, `ProviderID`, `ProviderDocTitle`, `ProviderDocContent`) VALUES
(1, 6, 'Licence', '/docs/provider-1528283419853-6.png'),
(2, 6, 'Proof of Age', '/docs/provider-1528283419855-6.png'),
(3, 6, 'Proof of Something', '/docs/provider-1528283419857-6.png'),
(4, 10, 'Licence', '/docs/provider-1528687848763-10.jpeg'),
(5, 10, 'Proof of Age', '/docs/provider-1528687848776-10.jpeg');

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
  `ProviderLastName` varchar(50) DEFAULT NULL,
  `ProviderEmailID` varchar(150) NOT NULL,
  `ProviderPassword` varchar(50) NOT NULL,
  `ProviderPhone` varchar(15) DEFAULT NULL,
  `ProviderGender` int(11) NOT NULL DEFAULT '0',
  `ProviderProfileImage` text,
  `ProviderExperience` varchar(50) NOT NULL,
  `ProviderQualifications` varchar(50) NOT NULL,
  `ProviderLattitude` float NOT NULL,
  `ProviderLongitude` float NOT NULL,
  `ProviderResume` text,
  `ProviderAccountStatus` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `PROVIDERS`
--

INSERT INTO `PROVIDERS` (`ProviderID`, `HRID`, `ProviderFirstName`, `ProviderLastName`, `ProviderEmailID`, `ProviderPassword`, `ProviderPhone`, `ProviderGender`, `ProviderProfileImage`, `ProviderExperience`, `ProviderQualifications`, `ProviderLattitude`, `ProviderLongitude`, `ProviderResume`, `ProviderAccountStatus`) VALUES
(6, 1, 'Rahul ', 'Sinha', 'rahul.sinha1908@gmail.com', 'Hello@12345', '9905264774', 0, '/profile-images/provider-1528283488600-6.jpeg', '2-3 years', 'Graduate', 13.0328, 77.5626, '', 1),
(8, NULL, 'Rahul', 'Sinha', 'rsinha@tod.io', 'Hello@12345', '9352780025', 0, '/profile-images/provider-1528283621275-8.jpeg', 'less than 1 years', 'Under Graduate', 13.0275, 77.5567, '/resume/provider-1528283570006-9352780025.png', 11),
(9, NULL, 'Rahul', 'Sinha', 'rsinha1@tod.io', 'Hello@12345', '9905264774', 0, NULL, 'less than 1 years', 'Under Graduate', 13.0275, 77.5567, '/resume/provider-1528283778628-9905264774.png', 11),
(10, NULL, 'Rahul', 'Sinha', 'rsinha4@tod.io', 'Hello@12345', '8346092368', 0, '/profile-images/provider-1528687965565-10.jpeg', 'less than 1 years', 'Graduate', 13.0275, 77.5569, '/resume/provider-1528687673829-8346092368.jpeg', 15);

-- --------------------------------------------------------

--
-- Table structure for table `SESSIONFEEDBACK`
--

CREATE TABLE `SESSIONFEEDBACK` (
  `SessionFeedbackID` int(11) NOT NULL,
  `SessionID` int(11) NOT NULL,
  `ProviderSessionRating` int(11) NOT NULL,
  `ProviderSessionComment` varchar(500) NOT NULL,
  `UserSessionRating` int(11) NOT NULL,
  `UserSessionComment` varchar(500) NOT NULL
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
  `MassageType` varchar(50) NOT NULL,
  `PreferredGender` int(11) NOT NULL,
  `MassageLength` int(11) NOT NULL,
  `SessionDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Equipements` tinyint(1) NOT NULL DEFAULT '0',
  `Pets` varchar(20) NOT NULL,
  `MedicalInformation` text,
  `SessionStatus` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `SESSIONS`
--

INSERT INTO `SESSIONS` (`SessionID`, `UserID`, `ProviderID`, `AddressID`, `MassageType`, `PreferredGender`, `MassageLength`, `SessionDateTime`, `Equipements`, `Pets`, `MedicalInformation`, `SessionStatus`) VALUES
(1, 1, 6, 1, 'Tissue Massage', 0, 60, '2018-05-29 00:00:00', 0, 'cat', 'I am good in health', 0);

-- --------------------------------------------------------

--
-- Table structure for table `TOKENTRACKER`
--

CREATE TABLE `TOKENTRACKER` (
  `TokenCode` text NOT NULL,
  `IPAddress` varchar(100) NOT NULL,
  `TokenCreationDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `TotalTokenCreatedInADay` int(11) NOT NULL DEFAULT '0',
  `LastAPICallTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CurrentAPICallTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `TotalAPICallInAMinute` int(11) NOT NULL DEFAULT '0',
  `BlockedStatus` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `TOKENTRACKER`
--

INSERT INTO `TOKENTRACKER` (`TokenCode`, `IPAddress`, `TokenCreationDateTime`, `TotalTokenCreatedInADay`, `LastAPICallTime`, `CurrentAPICallTime`, `TotalAPICallInAMinute`, `BlockedStatus`) VALUES
('99f553f719ed94fa67b8cacb1fca6618:68af67da585a657af26f089d820b7da3864069570329785a9f57917c0a2b1bd714800e12b7b9c1830ab3252ecc0124860bac7cf9e2f23476a25fc67ddbb2d37d', '::1', '2018-06-12 08:11:53', 0, '2018-06-13 05:01:19', '2018-06-13 05:01:19', 0, 0),
('8a40758a6f99da51a1ff506b512d5905:42ebd8fb68a57723ed6fc2fd2a8275b059c97c1fe975a187cd908806af8adb8d48b4f2f3d142f95703ad1a3da2db66f2bf0fbd125d58e64af71b55c5520d7e4e6862e4fdd3d6f7432dbcf2356d78b4b0', '::ffff:127.0.0.1', '2018-06-19 20:44:54', 0, '2018-06-20 02:14:54', '2018-06-20 02:14:54', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `USEDTOKENKEYS`
--

CREATE TABLE `USEDTOKENKEYS` (
  `TokenKeyCode` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `USEDTOKENKEYS`
--

INSERT INTO `USEDTOKENKEYS` (`TokenKeyCode`) VALUES
('sdahqrjfcbnd,rtskjtra');

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
(1, 'Rahul', 'Sinha', 'rahul12345@gmail.com', 'Hello@12345', '9905264775', '', 'Male', 1);

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
  ADD UNIQUE KEY `HREmailConstraint` (`HREmailID`),
  ADD KEY `HRAdminConstraint` (`AdminID`);

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
-- Indexes for table `SESSIONFEEDBACK`
--
ALTER TABLE `SESSIONFEEDBACK`
  ADD PRIMARY KEY (`SessionFeedbackID`),
  ADD KEY `session_constraint` (`SessionID`);

--
-- Indexes for table `SESSIONS`
--
ALTER TABLE `SESSIONS`
  ADD PRIMARY KEY (`SessionID`),
  ADD KEY `SESSIONS` (`ProviderID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `AddressID` (`AddressID`);

--
-- Indexes for table `TOKENTRACKER`
--
ALTER TABLE `TOKENTRACKER`
  ADD PRIMARY KEY (`IPAddress`);

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
  MODIFY `AdminID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `HRTABLE`
--
ALTER TABLE `HRTABLE`
  MODIFY `HRID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `PAYMENTS`
--
ALTER TABLE `PAYMENTS`
  MODIFY `PaymentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `PROVIDERDOCS`
--
ALTER TABLE `PROVIDERDOCS`
  MODIFY `ProviderDocID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `PROVIDERNOTIFICATION`
--
ALTER TABLE `PROVIDERNOTIFICATION`
  MODIFY `ProviderNotificationID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `PROVIDERS`
--
ALTER TABLE `PROVIDERS`
  MODIFY `ProviderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `SESSIONFEEDBACK`
--
ALTER TABLE `SESSIONFEEDBACK`
  MODIFY `SessionFeedbackID` int(11) NOT NULL AUTO_INCREMENT;
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
-- Constraints for table `HRTABLE`
--
ALTER TABLE `HRTABLE`
  ADD CONSTRAINT `HRAdminConstraint` FOREIGN KEY (`AdminID`) REFERENCES `ADMINTABLE` (`AdminID`);

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
-- Constraints for table `SESSIONFEEDBACK`
--
ALTER TABLE `SESSIONFEEDBACK`
  ADD CONSTRAINT `session_constraint` FOREIGN KEY (`SessionID`) REFERENCES `SESSIONS` (`SessionID`);

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
