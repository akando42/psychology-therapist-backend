import { AbstractLoginAttempssRepository } from "../../repositories/login-attemps.repository";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { MySqlLoginAttempsConverterInstance } from "../../../converters/my-sql/my-sql-login-attemps.converter";



export class MySqlTransactionsRepository extends AbstractLoginAttempssRepository {
    constructor() {
        super(new GenericDao(), MySqlLoginAttempsConverterInstance);
    }
}

