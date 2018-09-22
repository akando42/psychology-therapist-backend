import { AdminProfilesComponent } from "./admin-profile/admin-profiles.component";
import { IAdminProfile } from "../../../models/admin-profile";
import { ICabinet } from "../../../models/cabinet";
import { CabinetComponent } from "./cabinet/cabinet.component";


export abstract class AbstractAdminModule {

    constructor(
        protected _adminProfileComponent: AdminProfilesComponent,
        protected cabinetComponent: CabinetComponent
    ) { }


    abstract getAdminProfile(userId: number): Promise<any>;
    abstract createAdminProfile(profile: IAdminProfile): Promise<any>;

    abstract cabinetAdminProfile(cabinet: ICabinet): Promise<any>;

}