import { IPatientProfile } from "../../../../models/patient-profile";


export interface IPatientProfileService {
    createPatientProfile(profile: IPatientProfile): Promise<IPatientProfile>;

    getPatientProfile(userId: string | number): Promise<IPatientProfile>;
}