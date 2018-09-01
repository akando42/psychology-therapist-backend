import { AppointmentStatusEnum } from "../enums/appoinments.enum";


/**
 * A appointment (session) between a patient and a provider
 */
export interface IAppointment {
    date?: number;
    providerID?: number,
    patientID?: number,
    serviceID?: number,
    status?: AppointmentStatusEnum

}

