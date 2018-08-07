import { IAccountMySql } from "./models/my-sql/account-my-sql";
import { MySqlDatabase } from "../../../../../class/class.mysql-database";

export class AccountMySqlDAO {

    create(newObj: IAccountMySql): Promise<IAccountMySql> {
        return new Promise(async (resolve, reject) => {
            const query = 'INSERT INTO AdminTABLE SET ?'

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
    findOneAndUpdate(id: { _id: string }, model: IAccountMySql): Promise<IAccountMySql> {
        return new Promise(async (resolve, reject) => {
            const query = 'UPDATE AdminTABLE SET ? WHERE ID = ?'

            MySqlDatabase.tempPool.query(query, [model, id._id], (err, result) => {
                if (err) { reject(err) }

                resolve(result);
            });
        })
    }
    findOne(query: any): Promise<IAccountMySql> {
        return new Promise(async (resolve, reject) => {
            MySqlDatabase.tempPool.query(query, (err, result) => {
                if (err) { reject(err['code']) }

                resolve(result[0]);
            });
        })
    }
    find(query: any): Promise<IAccountMySql[]> {
        return new Promise(async (resolve, reject) => {
            console.log(query)
            MySqlDatabase.tempPool.query(query, (err, result) => {
                if (err) { reject(err['code']) }
                console.log(result)
                resolve(result);
            });

        })
    }





}

export const AccountMySqlDAOInstance: AccountMySqlDAO = new AccountMySqlDAO();