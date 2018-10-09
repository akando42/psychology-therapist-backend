import { AbstractRepository } from "../../../core/repositories/repository.abstract";

import { IRequiredDocument } from "../../../models/required-document";
import { UsersRolEnum } from "../../../enums/users-rol.enum";



export interface AbstractRequiredDocumentsRepository {



    saveDocumentsRequiredToRole(role: IRequiredDocument): Promise<IRequiredDocument>;

    getDocumentsRequiredByRole(role: UsersRolEnum): Promise<IRequiredDocument[]>;

}