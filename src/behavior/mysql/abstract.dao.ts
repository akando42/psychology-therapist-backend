import { MySqlConnection } from "../../database-connection/db-connection.mysql";

/**
 * Data access object to mysql basic behavior
 */
export abstract class AbstractDao<T> {

    constructor(protected table?: string) { };

    create(newObj: T): Promise<string> {
        return new Promise(async (resolve, reject) => {
            console.log('attempting to create', newObj);

            const query: string = `INSERT INTO ${this.table} SET ?`;

            MySqlConnection.pool.query(query, newObj, (err, result) => {
                if (err) {
                    err['sql'] = null;
                    return reject(err);
                }
            
                resolve(result['insertId']);
            });
        })
    }
    deleteOne(id: { _id: string }): Promise<{ id: string; success: boolean; }> {
        return new Promise(async (resolve, reject) => {

        })
    }
    findOneAndUpdate(query, model: T): Promise<boolean> {
        return new Promise(async (resolve, reject) => {

            MySqlConnection.pool.query(query, [model], (err, result) => {
                if (err) {
                    console.log('findOneAndUpdate', err['code'])
                    console.log('full error', err)
                    return reject(err)
                }
                console.log('findOneAndUpdate', result)
                if (result['affectedRows']) {
                    return resolve(true);

                }
            });
        })
    }
    findOne(query: any): Promise<T> {
        return new Promise(async (resolve, reject) => {
            MySqlConnection.pool.query(query, (err, result) => {
                if (err) {
                    console.log(err)
                    return reject(err['code'])
                }
                if (!result[0]) {
                    resolve(null)
                }
                resolve(result[0]);
            });
        })
    }
    find(query: any): Promise<T[]> {
        return new Promise(async (resolve, reject) => {
            MySqlConnection.pool.query(query, (err, result) => {
                if (err) { reject(err['code']) }
                console.log(result)
                resolve(result);
            });

        })
    }

}