import { ILocationsService } from "./locations.service.interface";
import { ILocation } from "../../../../models/location";


export class LocationsComponent {
    constructor(private _locations: ILocationsService) {

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