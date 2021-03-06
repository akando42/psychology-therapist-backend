import { IPatientProfile } from "../../../../models/patient-profile";


export interface IPatientProfileRepository {

    createPatientProfile(profile: IPatientProfile): Promise<IPatientProfile>;

    getPatientProfileByUserId(usrId: number | string): Promise<IPatientProfile>;

}