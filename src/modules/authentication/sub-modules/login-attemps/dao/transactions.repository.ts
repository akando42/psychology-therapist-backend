import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { ITransaction } from "../../../models/Transaction";


export abstract class AbstractTransactionsRepository extends AbstractRepository<ITransaction>{
    constructor(dao: any, converter: any) {
        super(dao, converter)
    }
}