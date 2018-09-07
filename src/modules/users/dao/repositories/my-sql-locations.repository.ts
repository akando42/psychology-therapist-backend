
import { AbstractLocationsRepository } from "../locations.repository";
import { ILocation } from "../../../../models/location";


export class MySqlLocationsRepository extends AbstractLocationsRepository {
    constructor(dbAccess, converter) {
        super(dbAccess, converter);
    }
    createLocation(location: ILocation): Promise<ILocation> {
        return super.create(location)
    }
    deleteLocation(id: number): Promise<any> {
        return super.delete(id);
    }
    getLocationByUserId(userID: number): Promise<ILocation[]> {
        throw new Error("Method not implemented.");
    }

}