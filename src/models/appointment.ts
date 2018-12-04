import { AppointmentStatusEnum } from "../enums/appoinments.enum";


/**
 * A appointment (session) between a patient and a provider
 */
export interface IAppointment {
    id?: number;
    date?: number;
    providerID?: number,
    patientID?: number,
    serviceID?: number,
    status?: AppointmentStatusEnum

}

