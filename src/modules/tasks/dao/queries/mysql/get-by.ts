import { DataModel } from "../../../../../../datamodels/datamodel";


export class GetBy {
    constructor(public query: any) {

    }

    toDQuery(): any {
        let query = ''
        for (const key in this.query) {
            if (this.query.hasOwnProperty(key)) {
                query += ` ${key} = ${this.query[key]},`

            }
        }

        return `SELECT * FROM ACCOUNTS WHERE ${query}` ;
    }
}