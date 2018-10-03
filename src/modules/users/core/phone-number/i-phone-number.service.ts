import { IPhoneNumber } from "../../../../models/phone-number";


export interface IPhoneNumberService {

    createPhoneNumber(model: IPhoneNumber): Promise<IPhoneNumber>;

    updatePhoneNumber(id: any, model: IPhoneNumber): Promise<IPhoneNumber>;
}