
import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { ILocationMySql } from "../../dao/my-sql/models/my-sql-location";
import { ILocation } from "../../../../models/location";

export class MySqlLocationsConverter implements IDualConverter<ILocation, ILocationMySql> {
    converDomainToDBModel(raw: ILocation): ILocationMySql {
        if (!raw) { return null }
        return {
            LocationCountry: raw.stringAdress,
            LocationID: raw.id,
            LocationLatitude: raw.lat,
            LocationLongitude: raw.lng,
            LocationState: raw.state,
            LocationStringAdress: raw.stringAdress
        }
    }
    convertDBModelToDomain(raw: ILocationMySql): ILocation {
        if (!raw) { return null }
        console.log(raw);
        return {
            country: raw.LocationCountry,
            id: raw.LocationID,
            lat: raw.LocationLatitude,
            lng: raw.LocationLongitude,
            state: raw.LocationState,
            stringAdress: raw.LocationStringAdress
        }
    }
    converManyDomainToDBModel(raw: ILocation[]): ILocationMySql[] {
        if (!raw || raw.length === 0) { return [] }
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: ILocationMySql[]): ILocation[] {
        if (!raw || raw.length === 0) { return [] }
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}
