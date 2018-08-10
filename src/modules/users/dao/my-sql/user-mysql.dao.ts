import { IUserMySql } from "./models/my-sql/user-my-sql.model";
import { AbstractDao } from "../../../../behavior/mysql/abstract.dao";

/**
 * Asign a resource to make the table this.
 */
export class UserMySqlDAO extends AbstractDao<IUserMySql>{
    constructor() {
        super();
        this.table = 'USERS';
    }
}

export const UserMySqlDAOInstance: UserMySqlDAO = new UserMySqlDAO();