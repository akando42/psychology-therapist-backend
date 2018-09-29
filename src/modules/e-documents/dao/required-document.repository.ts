import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";

import { IRequiredDocument } from "../../../models/required-document";
import { UsersRolEnum } from "../../../enums/users-rol.enum";



export abstract class AbstractRequiredDocumentsRepository extends AbstractRepository<IRequiredDocument> {
    constructor(dao: any, converter: any) {
        super(dao, converter);
    }


    abstract saveDocumentsRequiredToRole(role:IRequiredDocument):Promise<IRequiredDocument>;
    
    abstract getDocumentsRequiredByRole(role:UsersRolEnum):Promise<IRequiredDocument[]>;

}