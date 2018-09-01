import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IAppointment } from "../../../models/appointment";


export abstract class AbstractAppointmentsRepository extends AbstractRepository<IAppointment>{
    constructor(dao: any, converter: any) {
        super(dao, converter)
    }
}