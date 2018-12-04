import { DataModel } from "../../../../../../datamodels/datamodel";


export class GetAllBy {
    constructor(public query: any) {

    }

    toDQuery(): any {
        let keys = DataModel.tables.providers;
        let query = ''
        for (const key in this.query) {
            if (this.query.hasOwnProperty(key)) {
                query += ` ${keys[key]} = ${this.query[key]},`

            }
        }

        return `SELECT * FROM ${DataModel.tables.providers.table} WHERE ${query}` ;
    }
}