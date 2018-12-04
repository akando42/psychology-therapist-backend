import { ISalesProfile } from "../../../../models/sales-profile";


export interface ISalesProfileService {


    createSalesProfile(profile: ISalesProfile): Promise<ISalesProfile>;

    updateSalesProfile(id: number, changes: ISalesProfile): Promise<ISalesProfile>;

}