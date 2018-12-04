
import { IProviderDisponibility } from "../../../../../models/provider-disponibility";
import { IProviderDisponibilityRepository } from "../../repositories/provider-disponibility.repository";
import { ByNameRepository } from "../../../../../core/repositories/by-name-repository.notation";

const propsMatch = {
    id: 'ProviderDisponibilityID',
    providerId: 'ProviderProfileID',
    day:'ProviderDisponibilityWeekDay',
    from:'ProviderDisponibilityFromTime',
    to:'ProviderDisponibilityToTime',
    enable:'ProviderDisponibilityEnable'
}

@ByNameRepository('PROVIDER_DISPONIBILITY', {
    converterProps: propsMatch,
    primaryKey: 'ProviderDisponibilityID',
    resourceName: 'Provider Disponibility'
})
export class MySqlProviderDisponibilityRepository implements IProviderDisponibilityRepository {
    
    createProviderDisponibility(id: IProviderDisponibility): Promise<IProviderDisponibility> {
        return null;
    }
    getProviderDisponibilityByProviderProfileIdAndDay(id: any, weekday: any): Promise<IProviderDisponibility> {
        return null;
    }
    getProviderDisponibilityByProviderProfileIdAndEnable(id: any, enable: boolean): Promise<IProviderDisponibility> {
        return null;
    }
    getProviderDisponibilityByProviderProfileId(id: any): Promise<IProviderDisponibility[]> {
        return null;
    }
    updateProviderDisponibility(id: any, changes: any): Promise<IProviderDisponibility> {
        return null;
    }





}


