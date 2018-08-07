import { DataModel } from "../../../../../../datamodels/datamodel";


export class GetByEmail {
    constructor(public email: string) {

    }

    toDQuery(): any {
        return `SELECT * FROM USERS WHERE EMAIL = ${this.email}`;
    }
}