import { IProviderDisponibility } from "../../../../models/provider-disponibility";


export interface IProviderDisponibilityRepository {

    createProviderDisponibility(id: IProviderDisponibility): Promise<IProviderDisponibility>;

    getProviderDisponibilityByProviderProfileId(id: any): Promise<IProviderDisponibility[]>;

    updateProviderDisponibility(id: any, changes): Promise<IProviderDisponibility>;
}