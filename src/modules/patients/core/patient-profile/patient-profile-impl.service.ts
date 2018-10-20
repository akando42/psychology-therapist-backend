import { IPatientProfile } from "../../../../models/patient-profile";
import { IPatientProfileService } from "./i-patient-profile.service";
import { IPatientProfileRepository } from "../../dao/repositories/i-patient-profile.repository";
import { isNullOrUndefined } from "util";
import { Required } from "../../../../core/validations/validation.function";
import { ComposeValidation } from "../../../../core/validations/validate.notation";


export class PatientProfileImplService implements IPatientProfileService {


    constructor(
        private _patientProfileRepositorie: IPatientProfileRepository
    ) { }

    @ComposeValidation([{ index: 0, validators: [{ cb: Required, name: 'userId' }] }])
    async createPatientProfile(profile: IPatientProfile): Promise<IPatientProfile> {
        //check if user already have a provider profile.
        const userAlreadyProfile = await this._patientProfileRepositorie.getPatientProfileByUserId(profile.userId);
        //throw error if alreaedy have a provider profile.
        //probably on future use this to enable a disabled profile
        if (!isNullOrUndefined(userAlreadyProfile)) {
            throw { message: `User ${profile.userId} already have created a Provider Profile` };
        }

        //create the profile setting its status to 
        //under review by default.
        profile.status = 'lol';
        const profileCreated = await this._patientProfileRepositorie.createPatientProfile(profile);

        return profileCreated;
    }

    async getPatientProfile(userId: string | number): Promise<IPatientProfile> {
        const profile = await this._patientProfileRepositorie.getPatientProfileByUserId(userId);
        return profile;
    }

}