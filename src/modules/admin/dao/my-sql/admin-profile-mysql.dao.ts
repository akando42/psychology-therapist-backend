import { IWrite } from "@core/behaviors/write.interface";
import { IAdmin } from "@core/models/admin";
import { IAdminDAO } from "@core/modules/admin/dao/admin.dao";
import { MySqlDatabase } from "../../../../../class/class.mysql-database";
import { IAdminProfileMySql } from "@core/modules/admin/dao/my-sql/models/my-sql/admin-my-sql.model";


export class AdminProfileMySqlDAO implements IAdminDAO<IAdminProfileMySql> {

    private dbAccess = MySqlDatabase.tempPool;

    create(newObj: IAdminProfileMySql): Promise<IAdminProfileMySql> {
        return new Promise(async (resolve, reject) => {
            const query = 'INSERT INTO ADMINTABLE SET ?'

            this.dbAccess.query(query, newObj, (err, result) => {
                if (err) { reject(err) }

                resolve(result);
            });
        })
    }
    delete(Id: string): Promise<{ id: string; success: boolean; }> {
        return new Promise(async (resolve, reject) => {

        })
    }
    update(id: string, model: IAdminProfileMySql): Promise<IAdminProfileMySql> {
        return new Promise(async (resolve, reject) => {
            const query = 'UPDATE ADMINTABLE SET ? WHERE ID = ?'

            this.dbAccess.query(query, [model, id], (err, result) => {
                if (err) { reject(err) }

                resolve(result);
            });
        })
    }
    getBy(query: any): Promise<IAdminProfileMySql> {
        return new Promise(async (resolve, reject) => {

        })
    }
    getAllBy(query: any): Promise<IAdminProfileMySql[]> {
        return new Promise(async (resolve, reject) => {

        })
    }





}

export const AdminProfileMySqlDAOInstance: AdminProfileMySqlDAO = new AdminProfileMySqlDAO();