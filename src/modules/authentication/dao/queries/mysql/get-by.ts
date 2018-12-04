import { DataModel } from "../../../../../../datamodels/datamodel";

//todo move to global
export class GetBy {
    constructor(public query: any) {

    }

    toDQuery(): any {
        let query = ''
        for (const key in this.query) {
            if (this.query.hasOwnProperty(key)) {
                query += `${key} = '${this.query[key]}'`

            }
        }
        let q = `SELECT * FROM ACCOUNTS WHERE ${query}`
        return q;
    }
}