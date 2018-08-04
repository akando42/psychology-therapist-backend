

export class GetByIdQuery {
    constructor(public table: string, public id: string) {

    }

    toDQuery(): any {
        return `SELECT * FROM ${this.table} WHERE ID = ${this.id}`;
    }
}