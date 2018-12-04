import { IAppointment } from "../../models/appointment";
import { ITransaction } from "../../models/transaction";


export interface ITransactionsNotificationService {

    notifyPatient(transaction: ITransaction): Promise<any>;

    notifyProvider(transaction: ITransaction): Promise<any>;
}