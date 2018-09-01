import { AbstractHealthServiceRepository } from "../health-service.repository";



export class MySqlHealthServiceRepository extends AbstractHealthServiceRepository {
    constructor(dao, converter) {
        super(dao, converter);
    }
}

