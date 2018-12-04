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
  `UserGender` VARCHAR(10) NOT NULL,
  `UserPhoneNumber` VARCHAR(45) NULL,
  `UserIDVerified` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`UserID`),
  UNIQUE INDEX `UserEmail_UNIQUE` (`UserEmail` ASC))
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
  `NotificationRecipentID` INT NOT NULL,
  PRIMARY KEY (`NotificationID`, `NotificationRecipentID`),
  INDEX `fk_NOTIFICATIONS_USERS1_idx` (`NotificationRecipentID` ASC),
  CONSTRAINT `fk_NOTIFICATIONS_USERS1`
    FOREIGN KEY (`NotificationRecipentID`)
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
  `TaskReporterID` INT NOT NULL,
  `TaskCreationDate` INT NOT NULL,
  PRIMARY KEY (`TaskID`, `TaskReporterID`),
  UNIQUE INDEX `TaskCreatorID_UNIQUE` (`TaskReporterID` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`COMMENTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`COMMENTS` (
  `CommentID` INT NOT NULL AUTO_INCREMENT,
  `CommentAuthorID` INT NOT NULL,
  `CommentDate` INT NOT NULL,
  `CommentBody` VARCHAR(255) NULL,
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
-- Table `tod`.`TASKS_HISTORY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`TASKS_HISTORY` (
  `TaskHistoryID` INT NOT NULL AUTO_INCREMENT,
  `TaskHistoryDate` INT NOT NULL,
  `TaskHistoryAction` VARCHAR(255) NOT NULL,
  `TaskID` INT NOT NULL,
  PRIMARY KEY (`TaskHistoryID`, `TaskID`),
  INDEX `fk_TASKS_HISTORY_TASKS1_idx` (`TaskID` ASC),
  CONSTRAINT `fk_TASKS_HISTORY_TASKS1`
    FOREIGN KEY (`TaskID`)
    REFERENCES `tod`.`TASKS` (`TaskID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`ACTION_REQUESTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`ACTION_REQUESTS` (
  `ActionRequestID` INT NOT NULL AUTO_INCREMENT,
  `ActionRequestComment` VARCHAR(255) NULL,
  `ActionRequestEmitterID` INT NOT NULL,
  `ActionRequestDate` INT NOT NULL,
  `ActionRequestTargetID` INT NOT NULL,
  `ActionRequestAction` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ActionRequestID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`ADMIN_PROFILES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`ADMIN_PROFILES` (
  `AdminProfileID` INT NOT NULL AUTO_INCREMENT,
  `UserID` INT NOT NULL,
  PRIMARY KEY (`AdminProfileID`, `UserID`),
  INDEX `fk_ADMIN_PROFILES_USERS1_idx` (`UserID` ASC),
  CONSTRAINT `fk_ADMIN_PROFILES_USERS1`
    FOREIGN KEY (`UserID`)
    REFERENCES `tod`.`USERS` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`CABINET`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`CABINET` (
  `CabinetName` VARCHAR(45) NOT NULL,
  `AdminProfileID` INT NOT NULL,
  `CabinetID` INT NOT NULL AUTO_INCREMENT,
  INDEX `fk_CABINET_ADMIN_PROFILES1_idx` (`AdminProfileID` ASC),
  PRIMARY KEY (`CabinetID`),
  CONSTRAINT `fk_CABINET_ADMIN_PROFILES1`
    FOREIGN KEY (`AdminProfileID`)
    REFERENCES `tod`.`ADMIN_PROFILES` (`AdminProfileID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`CABINET_INVITATIONS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`CABINET_INVITATIONS` (
  `CabinetInvitationID` INT NOT NULL AUTO_INCREMENT,
  `CabinetInvitationDate` INT NOT NULL,
  `CabinetInvitationToken` VARCHAR(255) NOT NULL,
  `CabinetInvitationInviterID` INT NOT NULL,
  `CabinetInvitationEmail` VARCHAR(255) NOT NULL,
  `CabinetInvitationRole` VARCHAR(10) NOT NULL,
  `CabinetInvitationExpired` TINYINT NOT NULL,
  `CabinetID` INT NOT NULL,
  PRIMARY KEY (`CabinetInvitationID`, `CabinetID`),
  INDEX `fk_CABINET_INVITATIONS_CABINET1_idx` (`CabinetID` ASC),
  CONSTRAINT `fk_CABINET_INVITATIONS_CABINET1`
    FOREIGN KEY (`CabinetID`)
    REFERENCES `tod`.`CABINET` (`CabinetID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`RAW_DOCUMENTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`RAW_DOCUMENTS` (
  `RawDocumentID` INT NOT NULL AUTO_INCREMENT,
  `RawDocumentBlob` BLOB(100) NOT NULL,
  `RawDocumentMimeType` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`RawDocumentID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`DOCUMENTS_CATEGORIES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`DOCUMENTS_CATEGORIES` (
  `DocumentCategoryID` INT NOT NULL AUTO_INCREMENT,
  `DocumentCategoryName` VARCHAR(45) NOT NULL,
  `DocumentCategoryDescription` VARCHAR(255) NULL,
  PRIMARY KEY (`DocumentCategoryID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`DOCUMENTS_TYPES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`DOCUMENTS_TYPES` (
  `DocumentTypeID` INT NOT NULL AUTO_INCREMENT,
  `DocumentTypeName` VARCHAR(255) NOT NULL,
  `DocumentTypeDescription` INT NOT NULL,
  `CategoryID` INT NOT NULL,
  PRIMARY KEY (`DocumentTypeID`, `CategoryID`),
  INDEX `fk_DOCUMENTS_TYPES_DOCUMENTS_CATEGORIES1_idx` (`CategoryID` ASC),
  CONSTRAINT `fk_DOCUMENTS_TYPES_DOCUMENTS_CATEGORIES1`
    FOREIGN KEY (`CategoryID`)
    REFERENCES `tod`.`DOCUMENTS_CATEGORIES` (`DocumentCategoryID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`DOCUMENTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`DOCUMENTS` (
  `DocumentID` INT NOT NULL AUTO_INCREMENT,
  `DocumentUploadDate` INT NOT NULL,
  `DocumentPath` VARCHAR(255) NULL,
  `RawDocumentID` INT NULL,
  `DocumentTypeID` INT NOT NULL,
  `DocumentName` VARCHAR(255) NULL,
  PRIMARY KEY (`DocumentID`, `DocumentTypeID`),
  INDEX `fk_DOCUMENTS_RAW_DOCUMENTS1_idx` (`RawDocumentID` ASC),
  INDEX `fk_DOCUMENTS_DOCUMENTS_TYPES1_idx` (`DocumentTypeID` ASC),
  CONSTRAINT `fk_DOCUMENTS_RAW_DOCUMENTS1`
    FOREIGN KEY (`RawDocumentID`)
    REFERENCES `tod`.`RAW_DOCUMENTS` (`RawDocumentID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_DOCUMENTS_DOCUMENTS_TYPES1`
    FOREIGN KEY (`DocumentTypeID`)
    REFERENCES `tod`.`DOCUMENTS_TYPES` (`DocumentTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`USERS_ID_VERIFICATIONS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`USERS_ID_VERIFICATIONS` (
  `UserIdVerificationID` INT NOT NULL AUTO_INCREMENT,
  `UserIdVerificationStatus` VARCHAR(45) NOT NULL,
  `UserIdVerificationResponsableID` INT NULL,
  `UserIdVerificationExpirationDate` INT NOT NULL,
  `UserIdVerificationIdentificationID` VARCHAR(45) NOT NULL,
  `UserIdVerificationSecondPicRef` INT NULL,
  `UserID` INT NOT NULL,
  `DOCUMENTS_DocumentID` INT NOT NULL,
  `DOCUMENTS_DOCUMENTS_TYPES_DocumentTypeID` INT NOT NULL,
  `DOCUMENTS_DOCUMENTS_TYPES_DocumentCategoryID` INT NOT NULL,
  PRIMARY KEY (`UserIdVerificationID`, `UserID`, `DOCUMENTS_DocumentID`, `DOCUMENTS_DOCUMENTS_TYPES_DocumentTypeID`, `DOCUMENTS_DOCUMENTS_TYPES_DocumentCategoryID`),
  INDEX `fk_USERS_ID_VERIFICATIONS_USERS1_idx` (`UserID` ASC),
  INDEX `fk_USERS_ID_VERIFICATIONS_DOCUMENTS1_idx` (`DOCUMENTS_DocumentID` ASC, `DOCUMENTS_DOCUMENTS_TYPES_DocumentTypeID` ASC, `DOCUMENTS_DOCUMENTS_TYPES_DocumentCategoryID` ASC),
  CONSTRAINT `fk_USERS_ID_VERIFICATIONS_USERS1`
    FOREIGN KEY (`UserID`)
    REFERENCES `tod`.`USERS` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_USERS_ID_VERIFICATIONS_DOCUMENTS1`
    FOREIGN KEY (`DOCUMENTS_DocumentID` , `DOCUMENTS_DOCUMENTS_TYPES_DocumentTypeID`)
    REFERENCES `tod`.`DOCUMENTS` (`DocumentID` , `DocumentTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`USERS_DOCUMENTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`USERS_DOCUMENTS` (
  `UserDocumentOwnerID` INT NOT NULL,
  `UserDocumentRole` VARCHAR(45) NULL,
  `UserID` INT NOT NULL,
  `DocumentID` INT NOT NULL,
  PRIMARY KEY (`UserDocumentOwnerID`, `UserID`, `DocumentID`),
  INDEX `fk_USERS_DOCUMENTS_USERS1_idx` (`UserID` ASC),
  INDEX `fk_USERS_DOCUMENTS_DOCUMENTS1_idx` (`DocumentID` ASC),
  CONSTRAINT `fk_USERS_DOCUMENTS_USERS1`
    FOREIGN KEY (`UserID`)
    REFERENCES `tod`.`USERS` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_USERS_DOCUMENTS_DOCUMENTS1`
    FOREIGN KEY (`DocumentID`)
    REFERENCES `tod`.`DOCUMENTS` (`DocumentID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`LOCATION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`LOCATION` (
  `LocationID` INT NOT NULL AUTO_INCREMENT,
  `LocationStringAddress` VARCHAR(255) NULL,
  `LocationLongitude` VARCHAR(45) NULL,
  `LocationLatitude` VARCHAR(45) NULL,
  `LocationCountry` VARCHAR(45) NULL,
  `LocationState` VARCHAR(45) NULL,
  `UserID` INT NOT NULL,
  `LocationVerified` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`LocationID`, `UserID`),
  INDEX `fk_LOCATION_USERS1_idx` (`UserID` ASC),
  CONSTRAINT `fk_LOCATION_USERS1`
    FOREIGN KEY (`UserID`)
    REFERENCES `tod`.`USERS` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`HR_PROFILES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`HR_PROFILES` (
  `HRProfileID` INT NOT NULL AUTO_INCREMENT,
  `HRProfileStatus` TINYINT NOT NULL,
  `CabinetID` INT NULL,
  `UserID` INT NOT NULL,
  PRIMARY KEY (`HRProfileID`, `UserID`),
  INDEX `fk_HR_PROFILES_USERS1_idx` (`UserID` ASC),
  CONSTRAINT `fk_HR_PROFILES_USERS1`
    FOREIGN KEY (`UserID`)
    REFERENCES `tod`.`USERS` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`SALES_PROFILES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`SALES_PROFILES` (
  `SalesProfileID` INT NOT NULL AUTO_INCREMENT,
  `SalesProfileStatus` VARCHAR(45) NULL,
  `UserID` INT NOT NULL,
  PRIMARY KEY (`SalesProfileID`, `UserID`),
  INDEX `fk_SALES_PROFILES_USERS1_idx` (`UserID` ASC),
  CONSTRAINT `fk_SALES_PROFILES_USERS1`
    FOREIGN KEY (`UserID`)
    REFERENCES `tod`.`USERS` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`CABINET_MEMBER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`CABINET_MEMBER` (
  `CabinetMemberIsSales` TINYINT NULL,
  `CabinetID` INT NOT NULL,
  `CabinetMembersIsHR` TINYINT NULL,
  `UserID` INT NOT NULL,
  `CABINETS_MEMBERScol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`CabinetID`, `UserID`, `CABINETS_MEMBERScol`),
  INDEX `fk_CABINETS_MEMBERS_CABINET1_idx` (`CabinetID` ASC),
  INDEX `fk_CABINETS_MEMBERS_USERS1_idx` (`UserID` ASC),
  CONSTRAINT `fk_CABINETS_MEMBERS_CABINET1`
    FOREIGN KEY (`CabinetID`)
    REFERENCES `tod`.`CABINET` (`CabinetID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CABINETS_MEMBERS_USERS1`
    FOREIGN KEY (`UserID`)
    REFERENCES `tod`.`USERS` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`SYSTEM_DOCUMENTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`SYSTEM_DOCUMENTS` (
  `SystemDocumentID` INT NOT NULL AUTO_INCREMENT,
  `DocumentID` INT NOT NULL,
  PRIMARY KEY (`SystemDocumentID`, `DocumentID`),
  INDEX `fk_SYSTEM_DOCUMENTS_DOCUMENTS1_idx` (`DocumentID` ASC),
  CONSTRAINT `fk_SYSTEM_DOCUMENTS_DOCUMENTS1`
    FOREIGN KEY (`DocumentID`)
    REFERENCES `tod`.`DOCUMENTS` (`DocumentID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`DOCUMENT_REQUIRED`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`DOCUMENT_REQUIRED` (
  `DocumentRequiredID` INT NOT NULL AUTO_INCREMENT,
  `DocumentRequiredRole` VARCHAR(45) NULL,
  `DocumentRequiredActive` TINYINT NOT NULL DEFAULT 1,
  `SystemDocumentID` INT NOT NULL,
  `DocumentID` INT NOT NULL,
  PRIMARY KEY (`DocumentRequiredID`, `SystemDocumentID`, `DocumentID`),
  INDEX `fk_DOCUMENT_REQUIRED_SYSTEM_DOCUMENTS1_idx` (`SystemDocumentID` ASC, `DocumentID` ASC),
  CONSTRAINT `fk_DOCUMENT_REQUIRED_SYSTEM_DOCUMENTS1`
    FOREIGN KEY (`SystemDocumentID` , `DocumentID`)
    REFERENCES `tod`.`SYSTEM_DOCUMENTS` (`SystemDocumentID` , `DocumentID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`DOCUMENT_REQUIRED_REPORT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`DOCUMENT_REQUIRED_REPORT` (
  `DocumentRequiredReportID` INT NOT NULL AUTO_INCREMENT,
  `DocumentRequiredReportStatus` VARCHAR(45) NOT NULL,
  `DocumentRequiredReportRole` VARCHAR(45) NOT NULL,
  `UserID` INT NOT NULL,
  `DocumentID` INT NULL,
  `RequiredDoc` VARCHAR(45) NULL,
  `DocumentRequiredID` INT NOT NULL,
  PRIMARY KEY (`DocumentRequiredReportID`, `UserID`, `DocumentRequiredID`),
  INDEX `fk_DOCUMENT_REQUIRED_USERS1_idx` (`UserID` ASC),
  INDEX `fk_DOCUMENT_REQUIRED_DOCUMENTS1_idx` (`DocumentID` ASC),
  INDEX `fk_DOCUMENT_REQUIRED_REPORT_DOCUMENT_REQUIRED1_idx` (`DocumentRequiredID` ASC),
  CONSTRAINT `fk_DOCUMENT_REQUIRED_USERS1`
    FOREIGN KEY (`UserID`)
    REFERENCES `tod`.`USERS` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_DOCUMENT_REQUIRED_DOCUMENTS1`
    FOREIGN KEY (`DocumentID`)
    REFERENCES `tod`.`DOCUMENTS` (`DocumentID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_DOCUMENT_REQUIRED_REPORT_DOCUMENT_REQUIRED1`
    FOREIGN KEY (`DocumentRequiredID`)
    REFERENCES `tod`.`DOCUMENT_REQUIRED` (`DocumentRequiredID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`PHONE_NUMBER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`PHONE_NUMBER` (
  `PhoneNumberID` INT NOT NULL AUTO_INCREMENT,
  `PhoneNumberCountryCode` VARCHAR(10) NULL,
  `PhoneNumberChars` VARCHAR(45) NOT NULL,
  `PhoneNumberVerified` TINYINT NULL DEFAULT 0,
  `UserID` INT NOT NULL,
  PRIMARY KEY (`PhoneNumberID`, `UserID`),
  INDEX `fk_PHONE_NUMBER_USERS1_idx` (`UserID` ASC),
  CONSTRAINT `fk_PHONE_NUMBER_USERS1`
    FOREIGN KEY (`UserID`)
    REFERENCES `tod`.`USERS` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`ADMIN_INVITATION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`ADMIN_INVITATION` (
  `AdminInvitationID` INT NOT NULL AUTO_INCREMENT,
  `AdminInvitationToken` VARCHAR(255) NOT NULL,
  `AdminInvitationDate` INT NOT NULL,
  `AdminInvitationEmail` VARCHAR(255) NOT NULL,
  `AdminInvitationStatus` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`AdminInvitationID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`SUPER_ADMIN_PROFILE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`SUPER_ADMIN_PROFILE` (
  `SuperAdminID` INT NOT NULL AUTO_INCREMENT,
  `UserID` INT NOT NULL,
  PRIMARY KEY (`SuperAdminID`, `UserID`),
  INDEX `fk_SUPER_ADMIN_USERS1_idx` (`UserID` ASC),
  CONSTRAINT `fk_SUPER_ADMIN_USERS1`
    FOREIGN KEY (`UserID`)
    REFERENCES `tod`.`USERS` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`PROVIDER_PROFILE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`PROVIDER_PROFILE` (
  `ProviderProfileID` INT NOT NULL AUTO_INCREMENT,
  `ProviderProfileStatus` VARCHAR(45) NULL,
  `UserID` INT NOT NULL,
  PRIMARY KEY (`ProviderProfileID`, `UserID`),
  INDEX `fk_PROVIDER_PROFILE_USERS1_idx` (`UserID` ASC),
  CONSTRAINT `fk_PROVIDER_PROFILE_USERS1`
    FOREIGN KEY (`UserID`)
    REFERENCES `tod`.`USERS` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`PROVIDER_DISPONIBILITY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`PROVIDER_DISPONIBILITY` (
  `ProviderDisponibilityID` INT NOT NULL AUTO_INCREMENT,
  `ProviderProfileID` INT NOT NULL,
  `ProviderDisponibilityWeekDay` VARCHAR(10) NOT NULL,
  `ProviderDisponibilityFromTime` INT NULL,
  `ProviderDisponibilityToTime` INT NULL,
  `ProviderDisponibilityEnable` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`ProviderDisponibilityID`, `ProviderProfileID`),
  INDEX `fk_PROVIDER_DISPONIBILITY_PROVIDER_PROFILE1_idx` (`ProviderProfileID` ASC),
  CONSTRAINT `fk_PROVIDER_DISPONIBILITY_PROVIDER_PROFILE1`
    FOREIGN KEY (`ProviderProfileID`)
    REFERENCES `tod`.`PROVIDER_PROFILE` (`ProviderProfileID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`HEALTH_SERVICES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`HEALTH_SERVICES` (
  `HealthServiceID` INT NOT NULL AUTO_INCREMENT,
  `HealthServiceName` VARCHAR(45) NULL,
  `HealthServiceDescription` VARCHAR(255) NULL,
  PRIMARY KEY (`HealthServiceID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tod`.`PROVIDER_HEALTH_SERVICE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tod`.`PROVIDER_HEALTH_SERVICE` (
  `ProviderProfileID` INT NOT NULL,
  `HealthServiceID` INT NOT NULL,
  `Status` VARCHAR(45) NULL,
  `DocumentID` INT NOT NULL,
  PRIMARY KEY (`ProviderProfileID`, `HealthServiceID`, `DocumentID`),
  INDEX `fk_PROVIDER_PROFILE_has_HEALTH_SERVICES_HEALTH_SERVICES1_idx` (`HealthServiceID` ASC),
  INDEX `fk_PROVIDER_PROFILE_has_HEALTH_SERVICES_PROVIDER_PROFILE1_idx` (`ProviderProfileID` ASC),
  INDEX `fk_PROVIDER_HEALTH_SERVICES_DOCUMENTS1_idx` (`DocumentID` ASC),
  CONSTRAINT `fk_PROVIDER_PROFILE_has_HEALTH_SERVICES_PROVIDER_PROFILE1`
    FOREIGN KEY (`ProviderProfileID`)
    REFERENCES `tod`.`PROVIDER_PROFILE` (`ProviderProfileID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PROVIDER_PROFILE_has_HEALTH_SERVICES_HEALTH_SERVICES1`
    FOREIGN KEY (`HealthServiceID`)
    REFERENCES `tod`.`HEALTH_SERVICES` (`HealthServiceID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PROVIDER_HEALTH_SERVICES_DOCUMENTS1`
    FOREIGN KEY (`DocumentID`)
    REFERENCES `tod`.`DOCUMENTS` (`DocumentID`)
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
INSERT INTO `tod`.`USERS` (`UserID`, `UserLastName`, `UserFirstName`, `UserEmail`, `UserGender`, `UserPhoneNumber`, `UserIDVerified`) VALUES (1, 'Test', 'ADmin', 'info@therapyondemand.io', 'male', '991238', DEFAULT);
INSERT INTO `tod`.`USERS` (`UserID`, `UserLastName`, `UserFirstName`, `UserEmail`, `UserGender`, `UserPhoneNumber`, `UserIDVerified`) VALUES (2, 'sales', 'tester', 'sales@test.com', 'female', '03023020', DEFAULT);
INSERT INTO `tod`.`USERS` (`UserID`, `UserLastName`, `UserFirstName`, `UserEmail`, `UserGender`, `UserPhoneNumber`, `UserIDVerified`) VALUES (3, 'hr', 'human', 'hr@test.com', 'male', '010210', DEFAULT);

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
-- Data for table `tod`.`NOTIFICATIONS`
-- -----------------------------------------------------
START TRANSACTION;
USE `tod`;
INSERT INTO `tod`.`NOTIFICATIONS` (`NotificationID`, `NotificationReadStatus`, `NotificationTitle`, `NotificationContent`, `NotificationCreationDate`, `NotificationRecipentID`) VALUES (1, 0, 'Test not', 'This its a notification test', 1459999, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `tod`.`ADMIN_PROFILES`
-- -----------------------------------------------------
START TRANSACTION;
USE `tod`;
INSERT INTO `tod`.`ADMIN_PROFILES` (`AdminProfileID`, `UserID`) VALUES (1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `tod`.`SUPER_ADMIN_PROFILE`
-- -----------------------------------------------------
START TRANSACTION;
USE `tod`;
INSERT INTO `tod`.`SUPER_ADMIN_PROFILE` (`SuperAdminID`, `UserID`) VALUES (666, 1);

COMMIT;

