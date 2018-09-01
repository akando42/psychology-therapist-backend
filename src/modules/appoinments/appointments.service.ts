import { IAppointment } from "../../models/appointment";


export interface IAppointmentsService {

    createAppoinment(appointment: IAppointment): Promise<IAppointment>
}