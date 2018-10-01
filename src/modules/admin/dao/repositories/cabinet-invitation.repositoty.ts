
import { IResetPasswordRequest } from "../../../../models/reset-password-request";
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { ICabinetInvitation } from "../../../../models/cabinet-invitation";


export abstract class AbstractCabinetInvitationRepository extends AbstractRepository<ICabinetInvitation> {
    constructor(dao, converter) {
        super(dao, converter);
    }

    abstract getByCabinetId(cabinetId: any): Promise<ICabinetInvitation[]>
    abstract getInvitationByToken(token: string): Promise<ICabinetInvitation>

    abstract getByEmail(email: string): Promise<ICabinetInvitation>
    abstract getById(id: string): Promise<ICabinetInvitation>

}