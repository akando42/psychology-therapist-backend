


export class JoinQuery {
    constructor(private _querySpec: {
        mainTable: string,
        mainProps: string[],
        joinTables: {
            matchProp: string;
            table: string,
            properties: string[]
        }[]
    },private condition?) {

    }
    // SELECT AdminID, 
    // tod.users.UserID,UserFirstName,
    // UserLastName,UserGender,
    //  UserRole,UserEmail
    // FROM tod.admin_cabinet_users JOIN tod.users
    //   ON tod.admin_cabinet_users.UserID = tod.users.UserID
    //   WHERE tod.admin_cabinet_users.AdminID = ${this.cabinet}`
    toDBQuery(): string {

        const { mainProps } = this._querySpec;
        let properties: string = ''

        mainProps.forEach(prop => properties += prop + ', ');


        this._querySpec.joinTables.forEach((spec) => {
            spec.properties.forEach(prop => {
                properties += prop + ', '
            })
        })

        properties = properties.slice(0, properties.length - 2);

        let q = `SELECT ${properties} FROM ${this._querySpec.mainTable} 
                 JOIN ${this._querySpec.joinTables[0].table}
                 ON ${this._querySpec.mainTable}.${this._querySpec.joinTables[0].matchProp} 
                 = ${this._querySpec.joinTables[0].table}.${this._querySpec.joinTables[0].matchProp}`;

        if (this.condition) {
            q += this.condition
        }
        
        return q;
    }
}