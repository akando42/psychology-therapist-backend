import { IPhoneNumberService } from "./i-phone-number.service";
import { IPhoneNumbersRepository } from "../../dao/phone-numbers.repository";
import { ComposeValidation, Validate } from "../../../../core/validations/validate.notation";
import { Required } from "../../../../core/validations/validation.function";
import { IPhoneNumber } from "../../../../models/phone-number";


export class PhoneNumberImplService implements IPhoneNumberService {

    constructor(private _phonesRepository: IPhoneNumbersRepository) { }

    @ComposeValidation([
        {
            index: 0, validators: [
                { name: 'phoneNumber', cb: Required },
                { name: 'userId', cb: Required }
            ]
        }])
    async createPhoneNumber(phoneNumber: IPhoneNumber): Promise<IPhoneNumber> {
        const phoneCreated = await this._phonesRepository.createPhoneNumber(phoneNumber);
        return phoneCreated;
    }

    updatePhoneNumber(id: any, phoneNumber: IPhoneNumber): Promise<IPhoneNumber> {
        throw new Error("Method not implemented.");
    }


    @Validate([{ parameterIndex: 0, name: 'user id', cb: Required }])
    async getPhoneNumberByUserId(userId: any): Promise<IPhoneNumber> {
        let pn = await this._phonesRepository.getPhoneNumberByUserId(userId);
        return pn;
    }


}