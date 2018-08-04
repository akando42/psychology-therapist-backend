import { IAdminProfileMySql } from "./models/my-sql/admin-my-sql.model";

import { MySqlDatabase } from "../../../../../class/class.mysql-database";
import { GetAll } from "../queries/mysql/get-all";
import { DataModel } from "../../../../../datamodels/datamodel";

export class AdminProfileMySqlDAO {

    create(newObj: IAdminProfileMySql): Promise<IAdminProfileMySql> {
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
    findOneAndUpdate(id: { _id: string }, model: IAdminProfileMySql): Promise<IAdminProfileMySql> {
        return new Promise(async (resolve, reject) => {
            const query = 'UPDATE AdminTABLE SET ? WHERE ID = ?'

            MySqlDatabase.tempPool.query(query, [model, id._id], (err, result) => {
                if (err) { reject(err) }

                resolve(result);
            });
        })
    }
    findOne(query: any): Promise<IAdminProfileMySql> {
        return new Promise(async (resolve, reject) => {
            MySqlDatabase.tempPool.query(query, (err, result) => {
                if (err) { reject(err['code']) }

                resolve(result);
            });
        })
    }
    find(query: any): Promise<IAdminProfileMySql[]> {
        return new Promise(async (resolve, reject) => {
            console.log(query)
            query = new GetAll(DataModel.tables.admin.table).toDQuery()
            MySqlDatabase.tempPool.query(query, (err, result) => {
                if (err) { reject(err['code']) }
                console.log(result)
                resolve(result);
            });

        })
    }





}

export const AdminProfileMySqlDAOInstance: AdminProfileMySqlDAO = new AdminProfileMySqlDAO();