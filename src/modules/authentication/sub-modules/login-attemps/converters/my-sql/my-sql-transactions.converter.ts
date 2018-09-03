
import { ILoginAttempMySql } from "../../dao/my-sql/models/my-sql-login-attemp";
import { IDualConverter } from "../../../../../../behavior/converters/converter.interface";
import { ILoginAttemp } from "../../../../../../models/login-attemp";


export class MySqlLoginAttempsConverter implements IDualConverter<ILoginAttemp, ILoginAttempMySql>{
    converDomainToDBModel(raw: ILoginAttemp): ILoginAttempMySql {
        if (!raw) { return null; }
        return {
        }
    }
    convertDBModelToDomain(raw: ILoginAttempMySql): ILoginAttemp {
        if (!raw) { return null; }
        return {
            
        }
    }
    converManyDomainToDBModel(raw: ILoginAttemp[]): ILoginAttempMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: ILoginAttempMySql[]): ILoginAttemp[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }


}