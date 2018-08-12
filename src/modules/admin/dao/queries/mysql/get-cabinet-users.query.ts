


export class GetCabinetUsersQuery {
    constructor(public adminId: string) {

    }

    toDBQuery() {
        return `SELECT * FROM ADMIN_CABINET_USERS where AdminCabinetID = ${this.adminId}
        join USERS ON UserID = ADMIN_CABINET_USERS.UserID;`
    }
}