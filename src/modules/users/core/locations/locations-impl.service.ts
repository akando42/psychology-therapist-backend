import { ILocationsService } from "./locations.service.interface";
import { ILocation } from "../../../../models/location";
import { ILocationsRepository } from "../../dao/locations.repository";
import { ComposeValidation } from "../../../../behavior/validations/validate.notation";
import { Required } from "../../../../behavior/validations/validation.function";


export class LocationsImplService implements ILocationsService {
    constructor(private _locationsRepo: ILocationsRepository) { }


    @ComposeValidation([{
        index: 0, validators: [
            { name: 'country', cb: Required },
            { name: 'state', cb: Required },
            { name: 'userId', cb: Required },
        ]
    }])
    async createLocation(location: ILocation): Promise<ILocation> {
        location.verified = false;
        const created = await this._locationsRepo.createLocation(location);
        return created;
    }

    updateLocation(location: ILocation): Promise<ILocation> {
        return null

    }

    validateLocation(location: ILocation): Promise<ILocation> {
        return null
    }

}