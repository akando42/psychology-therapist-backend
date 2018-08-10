import { MySqlConnection } from "../../database-connection/db-connection.mysql";

/**
 * Data access object to mysql basic behavior
 */
export abstract class AbstractDao<T> {

    protected table: string;

    create(newObj: T): Promise<string> {
        return new Promise(async (resolve, reject) => {
            console.log('attempting to create', newObj)
            const query: string = `INSERT INTO ${this.table} SET ?`;
            console.log(query)
            MySqlConnection.pool.query(query, newObj, (err, result) => {
                if (err) {
                    err['sql'] = null;
                    return reject(err);
                }
                console.log(result['insertId']);
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
            let q = query.toDBQuery(this.table);
            console.log("DAO:FindOneANdUpdate", q)
            MySqlConnection.pool.query(q, [model], (err, result) => {
                if (err) {
                    console.log('findOneAndUpdate', err['code'])
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