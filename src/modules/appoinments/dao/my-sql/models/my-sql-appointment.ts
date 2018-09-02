import { AppointmentStatusEnum } from "../../../../../enums/appoinments.enum";


export interface IAppointmentMySql {
    AppointmentID?: number;
    AppointmentDate?: number;
    AppointmentServiceID?: number;
    AppointmentStatus?: AppointmentStatusEnum;
    AppointmentPatientID?: number;
    AppointmentProviderID?: number;
}