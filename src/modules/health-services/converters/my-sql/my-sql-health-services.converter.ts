import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IHealthService } from "../../../../models/health-service";
import { IHealthServiceMySql } from "../../dao/my-sql/models/my-sql-health-service";


export class MySqlHealthServiceServicesConverter implements IDualConverter<IHealthService, IHealthServiceMySql>{
    
    converDomainToDBModel(raw: IHealthService): IHealthServiceMySql {
        if (!raw) { return null; }
        return {
            HealthServiceDescription: raw.description,
            HealthServiceID: raw.id,
            HealthServiceName: raw.name
        }
    }
    convertDBModelToDomain(raw: IHealthServiceMySql): IHealthService {
        if (!raw) { return null; }
        return {
            description: raw.HealthServiceDescription,
            id: raw.HealthServiceID,
            name: raw.HealthServiceName
        }
    }
    converManyDomainToDBModel(raw: IHealthService[]): IHealthServiceMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IHealthServiceMySql[]): IHealthService[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }
}