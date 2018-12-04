import { TransactionStatusEnum } from "../../enums/transaction-status.enum";
import { ITransaction } from "../../models/transaction";


export interface ITransactionsService {

    /**
     * Create and Transaction.
     * @param Transaction 
     */
    createTransaction(Transaction: ITransaction): Promise<ITransaction>;

    /**
     * Transactions get canceled.
     * @param TransactionId 
     */
    cancelTransaction(TransactionId: ITransaction): Promise<boolean>;

    /**
     * Change the status of a Transaction, its a partial update ONLY to the status
     * of the Transaction
     * @param TransactionId 
     * @param newStatus 
     */
    changeTransactionStatus(TransactionId: string | number, newStatus: TransactionStatusEnum): Promise<ITransaction>;


}