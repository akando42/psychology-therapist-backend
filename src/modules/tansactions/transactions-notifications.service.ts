import { IAppointment } from "../../models/appointment";


export interface ITransactionsNotificationService {

    notifyPatient(appointment: IAppointment): Promise<any>;

    notifyProvider(appointment: IAppointment): Promise<any>;
}