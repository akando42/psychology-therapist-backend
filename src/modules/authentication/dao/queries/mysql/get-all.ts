

export class GetAll {
    constructor(public table: string) {

    }

    toDQuery(): any {
        return `SELECT * FROM ${this.table} `;
    }
}