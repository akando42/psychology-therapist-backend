
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { GenericDao } from "../../../../behavior/mysql/generic.dao";
import { IActionRequest } from "../../../../models/action-request";
import { ActionRequestsConverterInstance } from "../../converters/my-sql/action-request.converter";

export class ActionRequestsRepository extends AbstractRepository<IActionRequest>{
    constructor() {
        
        super(new GenericDao('ACTION_REQUESTS'), ActionRequestsConverterInstance);
    }

}

export const ActionRequestsRepoInstance: ActionRequestsRepository = new ActionRequestsRepository();
