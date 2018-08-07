import { DataModel } from "../../../../../../datamodels/datamodel";


export class GetByIdQuery {
    constructor(public table: string, public id: string) {

    }

    toDQuery(): any {
        return `SELECT * FROM ${this.table} WHERE ${DataModel.tables.users.id} = ${this.id}`;
    }
}