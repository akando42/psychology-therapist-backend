
import { MySqlDatabase } from "../../../../../class/class.mysql-database";
import { GetAll } from "../queries/mysql/get-all";
import { DataModel } from "../../../../../datamodels/datamodel";
import { IProviderMySql } from "./models/my-sql/provider-my-sql.model";

export class ProviderMySqlDAO {

    create(newObj: IProviderMySql): Promise<IProviderMySql> {
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
    findOneAndUpdate(id: { _id: string }, model: IProviderMySql): Promise<IProviderMySql> {
        return new Promise(async (resolve, reject) => {
            const query = 'UPDATE UserTABLE SET ? WHERE ID = ?'

            MySqlDatabase.tempPool.query(query, [model, id._id], (err, result) => {
                if (err) { reject(err) }

                resolve(result);
            });
        })
    }
    findOne(query: any): Promise<IProviderMySql> {
        return new Promise(async (resolve, reject) => {
            MySqlDatabase.tempPool.query(query, (err, result) => {
                if (err) { reject(err['code']) }

                resolve(result[0]);
            });
        })
    }
    find(query: any): Promise<IProviderMySql[]> {
        return new Promise(async (resolve, reject) => {
            console.log(query)
            query = new GetAll().toDQuery()
            MySqlDatabase.tempPool.query(query, (err, result) => {
                if (err) { reject(err['code']) }
                console.log(result)
                resolve(result);
            });

        })
    }





}

export const ProviderMySqlDAOInstance: ProviderMySqlDAO = new ProviderMySqlDAO();