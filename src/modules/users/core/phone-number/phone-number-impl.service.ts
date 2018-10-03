import { IPhoneNumberService } from "./i-phone-number.service";
import { IPhoneNumbersRepository } from "../../dao/phone-numbers.repository";
import { ComposeValidation } from "../../../../behavior/validations/validate.notation";
import { Required } from "../../../../behavior/validations/validation.function";
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


}