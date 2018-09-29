import { GenericDao } from "../mysql/generic.dao";


export function Repository(table) {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {

        constructor.prototype.table = table;

        constructor.prototype.query = async (q) => {
            return await GenericDao.QUERY(q.toDBQuery());
        }

        constructor.prototype.insert = async (q, data) => {
            return await GenericDao.INSERT(q, data);
        }

    }


}