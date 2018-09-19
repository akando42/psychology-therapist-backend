import { AdminProfilesComponent } from "./admin-profile/admin-profiles.component";


export abstract class AbstractAdminModule {

    constructor(
        protected _adminProfileComponent: AdminProfilesComponent
    ) { }
    

    abstract getAdminProfile(userId:number):Promise<any>;
}