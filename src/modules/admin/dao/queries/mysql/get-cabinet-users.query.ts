


export class GetCabinetUsersQuery {
    constructor(public adminId: string) {
        console.log(this)
    }

    /**
     * TODO: make that fields are selectebale from outside by array of string, for query listing filter 
     */
    toDBQuery() {
        
        return `SELECT AdminID, tod.users.UserID,UserFirstName,UserLastName,UserGender, UserRole,UserEmail
        FROM tod.admin_cabinet_users JOIN tod.users
          ON tod.admin_cabinet_users.UserID = tod.users.UserID
          WHERE tod.admin_cabinet_users.AdminID = ${this.adminId}`
    }
}