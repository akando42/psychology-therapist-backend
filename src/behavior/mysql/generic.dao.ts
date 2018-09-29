import { AbstractDao } from "./abstract.dao";
import { MySqlConnection } from "../../database-connection/db-connection.mysql";


export class GenericDao extends AbstractDao<any>{
    constructor(protected table?: string) { super(table); }

    static async QUERY(query): Promise<any> {
        console.log('dao::', query)
        let value = await new Promise<any>((resolve, reject) => {
            MySqlConnection.pool.query(query, (err, result) => {
                if (err) {
                    err['sql'] = null;
                    return reject(err);
                }
                return resolve(result);
            });
        });
        return value;
    }


    static async INSERT(query, data): Promise<any> {
        console.log('dao::', query)
        let value = await new Promise<any>((resolve, reject) => {
            MySqlConnection.pool.query(query, data, (err, result) => {
                if (err) {
                    err['sql'] = null;
                    return reject(err);
                }
                return resolve(result);
            });
        });
        return value;
    }
}