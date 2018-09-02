import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IAppointmentMySql } from "../../dao/my-sql/models/my-sql-appointment";
import { IAppointment } from "../../../../models/appointment";


export class MySqlAppointmentsConverter implements IDualConverter<IAppointment, IAppointmentMySql>{
    converDomainToDBModel(raw: IAppointment): IAppointmentMySql {
        if (!raw) { return null; }
        return {
            AppointmentDate: raw.date,
            AppointmentID: raw.id,
            AppointmentPatientID: raw.patientID,
            AppointmentServiceID: raw.serviceID,
            AppointmentStatus: raw.status,
            AppointmentProviderID: raw.providerID
        }
    }
    convertDBModelToDomain(raw: IAppointmentMySql): IAppointment {
        if (!raw) { return null; }
        return {
            date: raw.AppointmentDate,
            id: raw.AppointmentID,
            patientID: raw.AppointmentPatientID,
            serviceID: raw.AppointmentServiceID,
            status: raw.AppointmentStatus,
            providerID: raw.AppointmentProviderID
        }
    }
    converManyDomainToDBModel(raw: IAppointment[]): IAppointmentMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IAppointmentMySql[]): IAppointment[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }


}