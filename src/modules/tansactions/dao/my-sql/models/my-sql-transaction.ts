import { TransactionStatusEnum } from "../../../../../enums/transaction-status.enum";


export interface ITransactionMySql {
    TransactionID?: number;
    TransactionDate?: number;
    TransactionStatus?: TransactionStatusEnum;
}