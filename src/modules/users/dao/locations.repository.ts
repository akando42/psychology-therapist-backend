import { ILocation } from "../../../models/location";

export interface ILocationsRepository {

    createLocation(location: ILocation): Promise<ILocation>;

    deleteLocation(id: number): Promise<void>;

    getLocationById(locationId: number): Promise<ILocation>;

    getLocationByUserId(userId: number): Promise<ILocation>;

}