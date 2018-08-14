-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema tod
-- -----------------------------------------------------
-- tod 
-- 

-- -----------------------------------------------------
-- Schema tod
--
-- tod 
-- 
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tod` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `tod` ;

-- -----------------------------------------------------
-- Table `tod`.`USERS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`USERS` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `UserLastName` VARCHAR(45) NOT NULL,
  `UserFirstName` VARCHAR(45) NOT NULL,
  `UserEmail` VARCHAR(100) NOT NULL,
  `UserRole` VARCHAR(45) NOT NULL,
  `UserGender` VARCHAR(10) NOT NULL,
  `UserPhoneNumber` VARCHAR(45) NULL,
  PRIMARY KEY (`UserID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`ACCOUNTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`ACCOUNTS` (
  `AccountID` INT NOT NULL AUTO_INCREMENT,
  `AccountPassword` VARCHAR(255) NOT NULL,
  `AccountEmail` VARCHAR(100) NOT NULL,
  `AccountStatus` VARCHAR(10) NOT NULL,
  `AccountSignUpDate` INT NOT NULL,
  `AccountUserID` INT NULL,
  `AccountVerificationHash` VARCHAR(255) NOT NULL,
  `AccountEmailVerified` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`AccountID`),
  UNIQUE INDEX `AccountEmail_UNIQUE` (`AccountEmail` ASC),
  UNIQUE INDEX `AccountVerificationHash_UNIQUE` (`AccountVerificationHash` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`NOTIFICATIONS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`NOTIFICATIONS` (
  `NotificationID` INT NOT NULL AUTO_INCREMENT,
  `NotificationReadStatus` INT NOT NULL,
  `NotificationTitle` VARCHAR(45) NOT NULL,
  `NotificationContent` VARCHAR(255) NOT NULL,
  `NotificationCreationDate` INT NULL,
  `NOTIFICATIONScol` VARCHAR(45) NULL,
  `USERS_UserID` INT NOT NULL,
  PRIMARY KEY (`NotificationID`, `USERS_UserID`),
  INDEX `fk_NOTIFICATIONS_USERS1_idx` (`USERS_UserID` ASC),
  CONSTRAINT `fk_NOTIFICATIONS_USERS1`
    FOREIGN KEY (`USERS_UserID`)
    REFERENCES `tod`.`USERS` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`TASKS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`TASKS` (
  `TaskID` INT NOT NULL AUTO_INCREMENT,
  `TaskTitle` VARCHAR(45) NOT NULL,
  `TaskDescription` VARCHAR(255) NULL,
  `TaskResolutionDate` INT NULL,
  `TaskCreatorID` INT NOT NULL,
  `AssignedID` INT NOT NULL,
  PRIMARY KEY (`TaskID`, `AssignedID`, `TaskCreatorID`),
  UNIQUE INDEX `TaskCreatorID_UNIQUE` (`TaskCreatorID` ASC),
  INDEX `fk_TASKS_USERS1_idx` (`AssignedID` ASC),
  CONSTRAINT `fk_TASKS_USERS1`
    FOREIGN KEY (`AssignedID`)
    REFERENCES `tod`.`USERS` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`COMMENTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`COMMENTS` (
  `CommentID` INT NOT NULL AUTO_INCREMENT,
  `CommentAuthorID` INT NOT NULL,
  `CommentDate` INT NOT NULL,
  `CommentBody` VARCHAR(255) NULL,
  `COMMENTScol` VARCHAR(45) NULL,
  `TaskID` INT NOT NULL,
  PRIMARY KEY (`CommentID`, `TaskID`),
  INDEX `fk_COMMENTS_TASKS1_idx` (`TaskID` ASC),
  CONSTRAINT `fk_COMMENTS_TASKS1`
    FOREIGN KEY (`TaskID`)
    REFERENCES `tod`.`TASKS` (`TaskID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`ADMIN_CABINET_USERS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`ADMIN_CABINET_USERS` (
  `AdminID` INT NOT NULL,
  `UserID` INT NOT NULL,
  INDEX `fk_ADMIN_CABINET_has_USERS_USERS1_idx` (`UserID` ASC),
  UNIQUE INDEX `UserID_UNIQUE` (`UserID` ASC),
  CONSTRAINT `fk_ADMIN_CABINET_has_USERS_USERS1`
    FOREIGN KEY (`UserID`)
    REFERENCES `tod`.`USERS` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `tod`.`USERS`
-- -----------------------------------------------------
START TRANSACTION;
USE `tod`;
INSERT INTO `tod`.`USERS` (`UserID`, `UserLastName`, `UserFirstName`, `UserEmail`, `UserRole`, `UserGender`, `UserPhoneNumber`) VALUES (1, 'Test', 'ADmin', 'info@therapyondemand.io', 'admin', 'male', '991238');
INSERT INTO `tod`.`USERS` (`UserID`, `UserLastName`, `UserFirstName`, `UserEmail`, `UserRole`, `UserGender`, `UserPhoneNumber`) VALUES (2, 'sales', 'tester', 'sales@test.com', 'sales', 'female', '03023020');
INSERT INTO `tod`.`USERS` (`UserID`, `UserLastName`, `UserFirstName`, `UserEmail`, `UserRole`, `UserGender`, `UserPhoneNumber`) VALUES (3, 'hr', 'human', 'hr@test.com', 'hr', 'male', '010210');

COMMIT;


-- -----------------------------------------------------
-- Data for table `tod`.`ACCOUNTS`
-- -----------------------------------------------------
START TRANSACTION;
USE `tod`;
INSERT INTO `tod`.`ACCOUNTS` (`AccountID`, `AccountPassword`, `AccountEmail`, `AccountStatus`, `AccountSignUpDate`, `AccountUserID`, `AccountVerificationHash`, `AccountEmailVerified`) VALUES (1, 'Admin@12345', 'info@therapyondemand.io', 'verified', 15555324, 1, 'asdlasd', 1);
INSERT INTO `tod`.`ACCOUNTS` (`AccountID`, `AccountPassword`, `AccountEmail`, `AccountStatus`, `AccountSignUpDate`, `AccountUserID`, `AccountVerificationHash`, `AccountEmailVerified`) VALUES (2, 'Hr@12345', 'hr@test.com', 'verified', 123123, 3, 'asdasd', 1);
INSERT INTO `tod`.`ACCOUNTS` (`AccountID`, `AccountPassword`, `AccountEmail`, `AccountStatus`, `AccountSignUpDate`, `AccountUserID`, `AccountVerificationHash`, `AccountEmailVerified`) VALUES (3, 'Sales@12345', 'sales@test.com', 'verified', 123123123, 2, 'asdasdak', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `tod`.`ADMIN_CABINET_USERS`
-- -----------------------------------------------------
START TRANSACTION;
USE `tod`;
INSERT INTO `tod`.`ADMIN_CABINET_USERS` (`AdminID`, `UserID`) VALUES (1, 2);
INSERT INTO `tod`.`ADMIN_CABINET_USERS` (`AdminID`, `UserID`) VALUES (1, 3);

COMMIT;

