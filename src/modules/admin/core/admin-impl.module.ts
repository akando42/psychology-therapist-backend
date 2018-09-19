import { AdminProfilesComponent } from "./admin-profile/admin-profiles.component";
import { AbstractAdminModule } from "./abstract-admin.module";
import { TODResponse } from "../../../dto/tod-response";


export class AdminModuleImpl extends AbstractAdminModule {


    constructor(
        adminProfileComponent: AdminProfilesComponent
    ) {
        super(adminProfileComponent)
    }

    getAdminProfile(userId: number): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const profile = await this._adminProfileComponent.getProfile(userId);
                return resolve({ message: 'admin profile found!', payload: profile, timestamp: new Date() });
            } catch (error) {
                return reject({ error: error })
            }
        })
    }

}