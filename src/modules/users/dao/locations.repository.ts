import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IUser } from "../../../models/user";
import { ILocation } from "../../../models/location";

export abstract class AbstractLocationsRepository extends AbstractRepository<ILocation>{
    constructor(dbAccess, converter) {
        super(dbAccess, converter);
    }

    abstract createLocation(location: ILocation): Promise<ILocation>;

    abstract deleteLocation(id: number): Promise<void>;

    abstract getLocationByUserId(userID: number): Promise<ILocation[]>;

}