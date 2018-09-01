import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IHealtService } from "../../../../models/health-service";
import { IHealthServiceMySql } from "../../dao/my-sql/models/my-sql-health-service";


export class MySqlHealthServiceServicesConverter implements IDualConverter<IHealtService, IHealthServiceMySql>{
    converDomainToDBModel(raw: IHealtService): IHealthServiceMySql {
        throw new Error("Method not implemented.");
    }
    convertDBModelToDomain(raw: IHealthServiceMySql): IHealtService {
        throw new Error("Method not implemented.");
    }
    converManyDomainToDBModel(raw: IHealtService[]): IHealthServiceMySql[] {
        throw new Error("Method not implemented.");
    }
    convertManyDBModelToDomain(raw: IHealthServiceMySql[]): IHealtService[] {
        throw new Error("Method not implemented.");
    }
}