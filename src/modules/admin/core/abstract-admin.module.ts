import { AdminProfilesComponent } from "./admin-profile/admin-profiles.component";
import { IAdminProfile } from "../../../models/admin-profile";
import { ICabinet } from "../../../models/cabinet";
import { CabinetComponent } from "./cabinet/cabinet.component";
import { AbtractCommunicationModule } from "../../communication/core/comunication.module";
import { AbstractUsersModule } from "../../users/core/users.module";
import { AdminInvitationComponent } from "./admin-invitations/admin-invitations.component";


export abstract class AbstractAdminModule {

    constructor(
        protected _adminProfileComponent: AdminProfilesComponent,
        protected cabinetComponent: CabinetComponent,
        protected _adminInvitationComponent: AdminInvitationComponent,
        protected _comunicationModule: AbtractCommunicationModule,
        protected _usersModule: AbstractUsersModule,
    ) { }


    abstract getAdminCabinet(userId: number): Promise<any>;

    abstract getCabinetMembers(cabinetId: number, role: any): Promise<any>;

    abstract getAdminProfile(userId: number): Promise<any>;

    abstract createAdminProfile(profile: IAdminProfile): Promise<any>;

    abstract createAdminCabinet(cabinet: ICabinet): Promise<any>;

    abstract cancelInvitation(invitationID: number): Promise<any>;

    // abstract joinCabinetWith


}