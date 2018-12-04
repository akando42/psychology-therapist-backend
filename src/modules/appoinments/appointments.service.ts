import { IAppointment } from "../../models/appointment";
import { AppointmentStatusEnum } from "../../enums/appoinments.enum";


export interface IAppointmentsService {

    /**
     * Create and appoinment.
     * @param appointment 
     */
    createAppoinment(appointment: IAppointment): Promise<IAppointment>;

    /**
     * appointments get canceled.
     * @param appointmentId 
     */
    cancelAppointment(appointmentId: IAppointment): Promise<boolean>;

    /**
     * Change the status of a appointment, its a partial update ONLY to the status
     * of the appointment
     * @param appoinmentId 
     * @param newStatus 
     */
    changeAppointmentStatus(appoinmentId: string | number, newStatus: AppointmentStatusEnum): Promise<IAppointment>;


}