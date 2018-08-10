

export class UpdateQuery {
    constructor(public selector: any) {
    }

    toDBQuery(table: string): string {
        let query = ''
        for (const key in this.selector) {
            if (this.selector.hasOwnProperty(key)) {
                query += `${key} = '${this.selector[key]}'`

            }
        }

        return `UPDATE ${table} SET ? WHERE ${query}`;
    }
} 