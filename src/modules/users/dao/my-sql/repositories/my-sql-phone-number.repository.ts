
import { Repository } from "../../../../../core/repositories/repositoy.notation";
import { CreateQuery } from "../../../../../core/queries/my-sql/create-query.notation";
import { GetByQuery } from "../../../../../core/queries/my-sql/get-by-query.notation";
import { Convert } from "../../../../../core/converters/converter.notation";
import { IPhoneNumbersRepository } from "../../phone-numbers.repository";
import { IPhoneNumber } from "../../../../../models/phone-number";

const propsMap = {
    id: 'PhoneNumberID',
    userId: 'UserID',
    countryCode: 'PhoneNumberCountryCode',
    verified: 'PhoneNumberVerified',
    PhoneNumber: 'PhoneNumberChars'
}

@Repository('PhoneNumber')
export class MySqlPhoneNumbersRepository implements IPhoneNumbersRepository {


    @CreateQuery({ return: true, primary: 'PhoneNumberID' }, propsMap)
    createPhoneNumber(PhoneNumber: IPhoneNumber): Promise<IPhoneNumber> { return null; }


    deletePhoneNumber(id: number): Promise<any> { return null; }

    @Convert(propsMap)
    @GetByQuery({ PhoneNumberID: 0 })
    getPhoneNumberById(PhoneNumberId: number): Promise<IPhoneNumber> {
        return null;
    }
    @Convert(propsMap)
    @GetByQuery({ UserID: 0 })
    getPhoneNumberByUserId(userId: number): Promise<IPhoneNumber> {
        return null;
    }
}