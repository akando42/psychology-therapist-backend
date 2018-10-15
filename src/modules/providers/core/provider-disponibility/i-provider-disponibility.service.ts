


export interface IProviderDisponibilityService {

    getProviderDisponibility(profileId: any): Promise<any>;

    updateProviderDisponibility(disponibilityConfig: any): Promise<any>;

    disableProviderDisponibility(data): Promise<any>;
}

