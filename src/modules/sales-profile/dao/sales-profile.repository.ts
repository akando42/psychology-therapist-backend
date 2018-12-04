import { ISalesProfile } from "../../../models/sales-profile";

export interface ISalesProfileRepository {

    createSalesProfile(HRProfile: ISalesProfile): Promise<ISalesProfile>;

    deleteSalesProfile(id: number): Promise<void>;

    getSalesProfileByUserId(userID: number): Promise<ISalesProfile>;

}