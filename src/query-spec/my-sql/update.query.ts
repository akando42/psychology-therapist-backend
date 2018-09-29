
//todo make that only hcange fields that are been passe, this to allow
//partials update without breaking previous value. 
export class UpdateQuery {
    constructor(public query: any) {

    }

    toDBQuery(table?: string): any {
        let query = ''
        for (const key in this.query) {
            if (this.query.hasOwnProperty(key)) {
                query += `${key} = '${this.query[key]}'`

            }

        }


        let q = `UPDATE ${table} SET ? WHERE ${query}`
        return q;
    }
}