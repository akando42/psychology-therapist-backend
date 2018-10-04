import { IPhoneNumber } from "../../../../models/phone-number";


export interface IPhoneNumberService {

    createPhoneNumber(model: IPhoneNumber): Promise<IPhoneNumber>;
    getPhoneNumberByUserId(userId: any): Promise<IPhoneNumber>;

    updatePhoneNumber(id: any, model: IPhoneNumber): Promise<IPhoneNumber>;
}