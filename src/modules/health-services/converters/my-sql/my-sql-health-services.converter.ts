import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IHealthService } from "../../../../models/health-service";
import { IHealthServiceMySql } from "../../dao/my-sql/models/my-sql-health-service";


export class MySqlHealthServiceServicesConverter implements IDualConverter<IHealthService, IHealthServiceMySql>{
    converDomainToDBModel(raw: IHealthService): IHealthServiceMySql {
        throw new Error("Method not implemented.");
    }
    convertDBModelToDomain(raw: IHealthServiceMySql): IHealthService {
        throw new Error("Method not implemented.");
    }
    converManyDomainToDBModel(raw: IHealthService[]): IHealthServiceMySql[] {
        throw new Error("Method not implemented.");
    }
    convertManyDBModelToDomain(raw: IHealthServiceMySql[]): IHealthService[] {
        throw new Error("Method not implemented.");
    }
}