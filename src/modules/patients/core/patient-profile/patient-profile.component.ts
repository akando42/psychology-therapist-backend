import { IPatientProfile } from "../../../../models/patient-profile";
import { IPatientProfileService } from "./i-patient-profile.service";



export class PatientsProfilesComponent {
    constructor(
        private _patientProfileService: IPatientProfileService
    ) { }

    async createPatientProfile(patientProfile: IPatientProfile): Promise<IPatientProfile> {
        const profileCreated = await this._patientProfileService.createPatientProfile(patientProfile);
        return profileCreated;
    }

    async getPatientProfile(userId: string | number): Promise<IPatientProfile> {
        const profile = await this._patientProfileService.getPatientProfile(userId);
        return profile;
    }
}