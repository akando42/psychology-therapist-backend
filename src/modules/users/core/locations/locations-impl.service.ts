import { ILocationsService } from "./locations.service.interface";
import { ILocation } from "../../../../models/location";
import { ILocationsRepository } from "../../dao/locations.repository";


export class LocationsImplService implements ILocationsService {
    constructor(private _locationsRepo: ILocationsRepository) {

    }


    createLocation(location: ILocation): Promise<ILocation> {

        return null
    }

    updateLocation(location: ILocation): Promise<ILocation> {
        return null

    }

    validateLocation(location: ILocation): Promise<ILocation> {
        return null
    }

}