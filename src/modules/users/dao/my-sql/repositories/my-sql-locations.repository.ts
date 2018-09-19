
import { AbstractLocationsRepository } from "../../locations.repository";
import { ILocation } from "../../../../../models/location";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { MySqlLocationsConverter } from "../../../converters/my-sql/my-sql-locations.converter";
import { GetByQuery } from "../../../../../query-spec/my-sql/get-by.query";
import { ILocationMySql } from "../models/my-sql-location";


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

    getLocation(locationId: number): Promise<ILocation> {
        return super.getBy(new GetByQuery(<ILocationMySql>{ LocationID: locationId })
            .toDBQuery('LOCATIONS'))
    }

}