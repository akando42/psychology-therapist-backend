import { DataModel } from "../../../../../../datamodels/datamodel";


export class GetAll {
    constructor() {

    }

    toDQuery(): any {
        return `SELECT * FROM ${DataModel.tables.users.table} `;
    }
}