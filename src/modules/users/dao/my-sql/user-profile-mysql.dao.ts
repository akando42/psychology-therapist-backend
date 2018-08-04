import { IUserProfileMySql } from "./models/my-sql/User-my-sql.model";

import { MySqlDatabase } from "../../../../../class/class.mysql-database";

export class UserProfileMySqlDAO {

    create(newObj: IUserProfileMySql): Promise<IUserProfileMySql> {
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
    findOneAndUpdate(id: { _id: string }, model: IUserProfileMySql): Promise<IUserProfileMySql> {
        return new Promise(async (resolve, reject) => {
            const query = 'UPDATE UserTABLE SET ? WHERE ID = ?'

            MySqlDatabase.tempPool.query(query, [model, id._id], (err, result) => {
                if (err) { reject(err) }

                resolve(result);
            });
        })
    }
    findOne(query: any): Promise<IUserProfileMySql> {
        return new Promise(async (resolve, reject) => {
            MySqlDatabase.tempPool.query(query, (err, result) => {
                if (err) { reject(err['code']) }

                resolve(result);
            });
        })
    }
    getAllBy(query: any): Promise<IUserProfileMySql[]> {
        return new Promise(async (resolve, reject) => {

        })
    }





}

export const UserProfileMySqlDAOInstance: UserProfileMySqlDAO = new UserProfileMySqlDAO();