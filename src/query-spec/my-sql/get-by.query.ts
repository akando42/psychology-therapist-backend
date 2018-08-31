
//todo move to global
export class GetByQuery {
    constructor(public query: any) {

    }

    toDBQuery(table:string): any {
        let query = ''
        for (const key in this.query) {
            if (this.query.hasOwnProperty(key)) {
                query += `${key} = '${this.query[key]}' and `

            }
        }
        let q = `SELECT * FROM ${table} WHERE ${query.slice(0,query.length-4)}`
        return q;
    }
}