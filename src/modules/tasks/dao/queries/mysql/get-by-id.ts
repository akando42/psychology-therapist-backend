import { DataModel } from "../../../../../../datamodels/datamodel";


export class GetByIdQuery {
    constructor(public id: string) {

    }

    toDQuery(): any {
        return `SELECT * FROM ${DataModel.tables.admin.table} WHERE ID = ${this.id}`;
    }
}