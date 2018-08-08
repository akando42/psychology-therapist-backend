


export class DumDB {

    static TABLES: any = {};

    constructor() {

    }

    static addTable(name: string): any {
        DumDB.TABLES[name] = [];
    }

    static getItem(table: string): any {
        return DumDB.TABLES[table].get
    }
}