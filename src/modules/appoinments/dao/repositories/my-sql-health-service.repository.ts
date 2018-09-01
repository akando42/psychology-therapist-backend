import { AbstractAppointmentsRepository } from "../appointments.repository";



export class MySqlHealthServiceRepository extends AbstractAppointmentsRepository {
    constructor(dao, converter) {
        super(dao, converter);
    }
}

