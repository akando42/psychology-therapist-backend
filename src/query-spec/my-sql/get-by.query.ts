
//todo move to global
export class GetByQuery {
    constructor(public query: any) {

    }

    toDBQuery(table:string): any {
        let query = ''
        for (const key in this.query) {
            if (this.query.hasOwnProperty(key)) {
                query += `${key} = '${this.query[key]}'`

            }
        }
        let q = `SELECT * FROM ${table} WHERE ${query}`
        return q;
    }
}