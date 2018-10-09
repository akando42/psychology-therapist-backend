
import { ILocationsRepository } from "../../locations.repository";
import { ILocation } from "../../../../../models/location";
import { Repository } from "../../../../../core/repositories/repositoy.notation";
import { CreateQuery } from "../../../../../core/queries/my-sql/create-query.notation";
import { GetByQuery } from "../../../../../core/queries/my-sql/get-by-query.notation";
import { Convert } from "../../../../../core/converters/converter.notation";

const propsMap = {
    id: 'LocationID',
    userId: 'UserID',
    stringAddress: 'LocationStringAddress',
    lat: 'LocationLatitude',
    lng: 'LocationLongitude',
    contry: 'LocationContry',
    state: 'LocationState',
    verified:'LocationVerified'
}

@Repository('Location')
export class MySqlLocationsRepository implements ILocationsRepository {


    @CreateQuery({ return: true, primary: 'LocationID' }, propsMap)
    createLocation(location: ILocation): Promise<ILocation> { return null; }


    deleteLocation(id: number): Promise<any> { return null; }

    @Convert(propsMap)
    @GetByQuery({ LocationID: 0 })
    getLocationById(locationId: number): Promise<ILocation> {
        return null;
    }
    @Convert(propsMap)
    @GetByQuery({ UserID: 0 })
    getLocationByUserId(userId: number): Promise<ILocation> {
        return null;
    }
}