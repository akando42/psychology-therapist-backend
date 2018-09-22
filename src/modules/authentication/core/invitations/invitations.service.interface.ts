


export interface IInvitationService {

    createInvitation(invitation: ICabinetInvitation): Promise<ICabinetInvitation>;

    getInvitationByEmail(token: string): Promise<ICabinetInvitation>;

    getInvitationByToken(token: string): Promise<ICabinetInvitation>;

    checkEmailDisponibility(email: string): Promise<boolean>;
}