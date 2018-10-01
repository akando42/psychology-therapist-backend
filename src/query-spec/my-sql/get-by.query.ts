
//todo move to global
export class GetByQuery {
    constructor(public query: any, public table?: string) {

    }

    toDBQuery(table?: string): any {
        let query = ''

        if (Object.keys(this.query).length == 0) {
            return `SELECT * FROM ${table || this.table}`;
        }

        for (const key in this.query) {
            if (this.query.hasOwnProperty(key)) {
                query += `${key} = '${this.query[key]}' and `

            }
        }

        let q = `SELECT * FROM ${table || this.table} WHERE ${query.slice(0, query.length - 4)}`
        return q;
    }
}