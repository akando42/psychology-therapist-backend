import { ILocation } from "../../../../models/location";



export interface ILocationsService {

    createLocation(location:ILocation):Promise<ILocation>;

    updateLocation(location:ILocation):Promise<ILocation>;
    
    validateLocation(location:ILocation):Promise<ILocation>;

}