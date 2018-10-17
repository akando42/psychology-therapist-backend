import { AbstractRepository } from "../../../core/repositories/repository.abstract";

import { IRequiredDocument } from "../../../models/required-document";
import { UsersRolEnum } from "../../../enums/users-rol.enum";



export interface AbstractRequiredDocumentsRepository {



    createDocumentsRequiredToRole(role: IRequiredDocument): Promise<IRequiredDocument>;

    c_getDocumentsRequiredByRole(role: UsersRolEnum): Promise<IRequiredDocument[]>;

}