import { IHRProfile } from "../../../../models/hr-profile";


export interface IHRProfileService {


    createHRProfile(profile: IHRProfile): Promise<IHRProfile>;

    updateHRProfile(id: number, changes: IHRProfile): Promise<IHRProfile>;

    getHRProfile(userId: number): Promise<IHRProfile>;

}