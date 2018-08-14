


export class GetCabinetUsersQuery {
    constructor(public adminId: string) {

    }

    toDBQuery() {
        console.log()
        return `SELECT * FROM ADMIN_CABINET_USERS where AdminID = ${this.adminId}
        join USERS ON UserID = ADMIN_CABINET_USERS.UserID;`
    }
}