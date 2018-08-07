import { DataModel } from "../../../../../../datamodels/datamodel";



export class GetAdminProviders {
    constructor(public adminId: string) {

    }

    toDQuery(): any {
        return `SELECT * FROM 
        ${DataModel.tables.providers.table} where 
        ${DataModel.tables.providers.id} = ${this.adminId}`;
    }
}