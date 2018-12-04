import { HRProfileStatusEnum } from "../enums/hr-profile-status";



export interface IHRProfile {

    id?: number;
    userId?: number;
    status?: HRProfileStatusEnum;
    cabinetId?: number;
}