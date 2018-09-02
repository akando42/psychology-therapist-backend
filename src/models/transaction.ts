import { TransactionStatusEnum } from "../enums/transaction-status.enum";


export interface ITransaction {
    id?: number;
    transactionID?: string;
    date?: number;
    status?: TransactionStatusEnum,
    
}