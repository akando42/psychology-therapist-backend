import { DataModel } from "../../../../../../datamodels/datamodel";


export class GetByIdQuery {
    constructor(public id: string) {}

    toDQuery(): any {
        return `SELECT * FROM USERS WHERE USERID = ${this.id}`;
    }
}