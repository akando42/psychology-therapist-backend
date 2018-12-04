import { AbstractAuthenticationModule } from "../../../authentication/core/abstract-authentication.module";
import { INewAccountDTO } from "../../../../dto/new-account.dto";
import { TODResponse } from "../../../../dto/tod-response";
import { IUser } from "../../../../models/user";
import { IActionRequest } from "../../../../models/action-request";
import { ICabinetService } from "../cabinet/cabinet.service.interface";


export abstract class AbstractMembersManagmentModule {
    constructor(
        protected _authentModule: AbstractAuthenticationModule,
        protected _cabinetComponent: ICabinetService
    ) { }


    abstract inviteToCabinet(inviterId: number, account: INewAccountDTO): Promise<any>;


    abstract getCabinetUsers(adminId: string): Promise<IUser[]>;

    abstract requestActionToCabinetUser(memberId: string, request: IActionRequest): Promise<TODResponse>
}