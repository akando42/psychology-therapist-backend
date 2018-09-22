import { AdminProfilesComponent } from "./admin-profile/admin-profiles.component";
import { AbstractAdminModule } from "./abstract-admin.module";
import { TODResponse } from "../../../dto/tod-response";
import { ICabinet } from "../../../models/cabinet";
import { IAdminProfile } from "../../../models/admin-profile";
import { CabinetComponent } from "./cabinet/cabinet.component";


export class AdminModuleImpl extends AbstractAdminModule {



    constructor(
        adminProfileComponent: AdminProfilesComponent,
        cabinetComponent: CabinetComponent
    ) {
        super(adminProfileComponent, cabinetComponent)
    }
    createAdminProfile(profile: IAdminProfile): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const created = await this._adminProfileComponent.createProfile(profile);
                return resolve(this._createTODDTO(created, null));
            } catch (error) {
                return reject(this._createTODDTO(null, error));
            }
        });
    }

    cabinetAdminProfile(cabinet: ICabinet): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const created = await this.cabinetComponent.createCabinet(cabinet);
                return resolve(this._createTODDTO(created, null));
            } catch (error) {
                return reject(this._createTODDTO(null, error));
            }
        });
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

    protected _createTODDTO(payload: any, error?: any): TODResponse {
        return {
            error: error || null,
            message: 'succefully',
            timestamp: new Date(),
            payload: payload || null
        }
    }
}