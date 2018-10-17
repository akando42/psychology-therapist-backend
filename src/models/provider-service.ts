import { ProviderServiceStatusEnum } from "../enums/provider-service-status.enum";


export interface IProviderService {
    id: number;
    proverdId: any;
    serviceId: number;
    status: ProviderServiceStatusEnum;
    documentId: any;
}