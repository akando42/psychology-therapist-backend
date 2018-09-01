import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IAppointmentMySql } from "../../dao/my-sql/models/my-sql-appointment";
import { IAppointment } from "../../../../models/appointment";


export class MySqlAppointmentsConverter implements IDualConverter<IAppointment, IAppointmentMySql>{
    converDomainToDBModel(raw: IAppointment): IAppointmentMySql {
        throw new Error("Method not implemented.");
    }
    convertDBModelToDomain(raw: IAppointmentMySql): IAppointment {
        throw new Error("Method not implemented.");
    }
    converManyDomainToDBModel(raw: IAppointment[]): IAppointmentMySql[] {
        throw new Error("Method not implemented.");
    }
    convertManyDBModelToDomain(raw: IAppointmentMySql[]): IAppointment[] {
        throw new Error("Method not implemented.");
    }


}