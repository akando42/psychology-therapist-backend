import { ITransactionsService } from "./tansactions.service";
import { TODResponse } from "../../dto/tod-response";
import { ITransaction } from "../../models/Transaction";
import { ITransactionsNotificationService } from "./transactions-notifications.service";


export abstract class AbstractTransactionComponent {
    constructor(
        private _transactionService: ITransactionsService,
        private _notificationService?: ITransactionsNotificationService) {
    }

    createTransaction(Transaction: ITransaction): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {

                const TransactionCreated: ITransaction = await this._transactionService.createTransaction(Transaction);

                /**
                 * notify if we have a service for it.
                 */
                if (this._notificationService) {

                }

                const result: TODResponse = {
                    message: "Transaction created",
                    payload: TransactionCreated,
                    timestamp: new Date()
                };

                return resolve(result);

            } catch (error) {

                const badResult: TODResponse = {
                    message: "Sorry! something went wrong creating the Transaction",
                    error: error,
                    timestamp: new Date()
                };

                return reject(badResult)
            }
        })
    }

}