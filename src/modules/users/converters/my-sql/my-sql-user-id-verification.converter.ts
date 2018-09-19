import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IUserIDVerification } from "../../../../models/user-id-verification";
import { IUserIDVerificationMySql } from "../../dao/my-sql/models/my-sql-user-id-verification";

// crear tipos de documents y conectar con frontend
// crear modelos en base de datos para poder probar

export class MySqlUserIDVerificationConverter implements IDualConverter<IUserIDVerification, IUserIDVerificationMySql>{
    converDomainToDBModel(raw: IUserIDVerification): IUserIDVerificationMySql {
        if (!raw) { return null; }
        return {
            UserIdVerificationDocumentRef: raw.documentRef,
            UserIdVerificationID: raw.id,
            UserIdVerificationResponsableID: raw.responsableId,
            UserIdVerificationStatus: raw.status,
            UserIdVerificationSecondPicRef: raw.secondPicRef,
            UserIdVerificationIdentificationID:raw.indentificationID,
            UserIdVerificationUser:raw.userId
        }
    }
    convertDBModelToDomain(raw: IUserIDVerificationMySql): IUserIDVerification {
        if (!raw) { return null; }
        return {
            documentRef: raw.UserIdVerificationDocumentRef,
            id: raw.UserIdVerificationID,
            responsableId: raw.UserIdVerificationResponsableID,
            status: raw.UserIdVerificationStatus,
            secondPicRef: raw.UserIdVerificationSecondPicRef,
            indentificationID:raw.UserIdVerificationIdentificationID,
            userId:raw.UserIdVerificationUser
        }
    }
    converManyDomainToDBModel(raw: IUserIDVerification[]): IUserIDVerificationMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IUserIDVerificationMySql[]): IUserIDVerification[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }


}