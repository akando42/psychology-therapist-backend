

//todo move to global
export class DeleteQuery {
    constructor(public query: any) {

    }

    toDBQuery(table:string): any {
        let query = ''
        for (const key in this.query) {
            if (this.query.hasOwnProperty(key)) {
                query += `${key} = '${this.query[key]}' and `

            }
        }
        let q = `DELETE FROM ${table} WHERE ${query.slice(0,query.length-4)}`
        return q;
    }
}