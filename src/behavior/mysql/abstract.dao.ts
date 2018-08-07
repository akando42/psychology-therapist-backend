import { MySqlDatabase } from "../../../class/class.mysql-database";

/**
 * Data access object to mysql basic behavior
 */
export abstract class AbstractDao<T> {
    create(newObj: T): Promise<T> {
        return new Promise(async (resolve, reject) => {
            const query = 'INSERT INTO UserTABLE SET ?'

            MySqlDatabase.tempPool.query(query, newObj, (err, result) => {
                if (err) { reject(err) }

                resolve(result);
            });
        })
    }
    deleteOne(id: { _id: string }): Promise<{ id: string; success: boolean; }> {
        return new Promise(async (resolve, reject) => {

        })
    }
    findOneAndUpdate(id: { _id: string }, model: T): Promise<T> {
        return new Promise(async (resolve, reject) => {
            const query = 'UPDATE UserTABLE SET ? WHERE ID = ?'

            MySqlDatabase.tempPool.query(query, [model, id._id], (err, result) => {
                if (err) { reject(err) }

                resolve(result);
            });
        })
    }
    findOne(query: any): Promise<T> {
        return new Promise(async (resolve, reject) => {
            MySqlDatabase.tempPool.query(query, (err, result) => {
                if (err) { reject(err['code']) }

                resolve(result[0]);
            });
        })
    }
    find(query: any): Promise<T[]> {
        return new Promise(async (resolve, reject) => {
            if (!query) {

            }
            MySqlDatabase.tempPool.query(query, (err, result) => {
                if (err) { reject(err['code']) }
                console.log(result)
                resolve(result);
            });

        })
    }

}