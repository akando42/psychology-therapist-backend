import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { ICabinet } from "../../../../models/cabinet";
import { ICabinetMySql } from "../../dao/my-sql/models/cabinet-my-sql";


export class MySqlCabinetConverter implements IDualConverter<ICabinet, ICabinetMySql> {
    converDomainToDBModel(raw: ICabinet): ICabinetMySql {
        if (!raw) { return null }
        return {
            CabinetAdminProfileID: raw.adminId,
            CabinetID: raw.id,
            CabinetName: raw.name
        }
    }
    convertDBModelToDomain(raw: ICabinetMySql): ICabinet {
        if (!raw) { return null }
        return {
            adminId: raw.CabinetAdminProfileID,
            name: raw.CabinetName,
            id: raw.CabinetID
        }
    }
    converManyDomainToDBModel(raw: ICabinet[]): ICabinetMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: ICabinetMySql[]): ICabinet[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}

