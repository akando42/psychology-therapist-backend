import { AbstractTransactionsRepository } from "../transactions.repository";



export class MySqlTransactionsRepository extends AbstractTransactionsRepository {
    constructor(dao, converter) {
        super(dao, converter);
    }
}

