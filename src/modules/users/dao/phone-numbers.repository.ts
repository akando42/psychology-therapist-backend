import { IPhoneNumber } from "../../../models/phone-number";

export interface IPhoneNumbersRepository {

    createPhoneNumber(PhoneNumber: IPhoneNumber): Promise<IPhoneNumber>;

    deletePhoneNumber(id: number): Promise<void>;

    getPhoneNumberById(PhoneNumberId: number): Promise<IPhoneNumber>;

    getPhoneNumberByUserId(userId: number): Promise<IPhoneNumber>;

}