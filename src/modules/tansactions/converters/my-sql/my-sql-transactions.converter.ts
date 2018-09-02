import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { ITransaction } from "../../../../models/transaction";
import { ITransactionMySql } from "../../dao/my-sql/models/my-sql-transaction";


export class MySqlTransactionsConverter implements IDualConverter<ITransaction, ITransactionMySql>{
    converDomainToDBModel(raw: ITransaction): ITransactionMySql {
        if (!raw) { return null; }
        return {
            TransactionDate: raw.date,
            TransactionID: raw.id,
            TransactionStatus: raw.status
        }
    }
    convertDBModelToDomain(raw: ITransactionMySql): ITransaction {
        if (!raw) { return null; }
        return {
            date: raw.TransactionDate,
            id: raw.TransactionID,
            status: raw.TransactionStatus
        }
    }
    converManyDomainToDBModel(raw: ITransaction[]): ITransactionMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: ITransactionMySql[]): ITransaction[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }


}