import { IAccountMySql } from "./models/my-sql/account-my-sql";
import { MySqlDatabase } from "../../../../../class/class.mysql-database";
import { AbstractDao } from "../../../../behavior/mysql/abstract.dao";
import { IUser } from "../../../../models/user";
import { IAccount } from "../../../../models/account";

export class AccountMySqlDAO extends AbstractDao<IAccount>{
    constructor() {
        super();
        this.table = 'ACCOUNTS';
    }
    
}

export const AccountMySqlDAOInstance: AccountMySqlDAO = new AccountMySqlDAO();