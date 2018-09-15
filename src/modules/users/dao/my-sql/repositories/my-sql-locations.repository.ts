
import { AbstractLocationsRepository } from "../../locations.repository";
import { ILocation } from "../../../../../models/location";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { MySqlLocationsConverter } from "../../../converters/my-sql/my-sql-locations.converter";


export class MySqlLocationsRepository extends AbstractLocationsRepository {
    constructor() {
        super(new GenericDao('LOCATIONS'), new MySqlLocationsConverter());
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