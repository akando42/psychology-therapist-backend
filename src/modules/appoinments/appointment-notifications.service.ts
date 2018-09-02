import { IAppointment } from "../../models/appointment";


export interface IAppointmentNotificationService {

    notifyPatient(appointment: IAppointment): Promise<any>;

    notifyProvider(appointment: IAppointment): Promise<any>;
}