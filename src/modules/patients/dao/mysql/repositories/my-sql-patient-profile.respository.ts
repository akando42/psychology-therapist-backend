import { IPatientProfile } from "../../../../../models/patient-profile";
import { ByNameRepository } from "../../../../../core/repositories/by-name-repository.notation";
import { IPatientProfileRepository } from "../../repositories/i-patient-profile.repository";

const matchProps = {

}

@ByNameRepository('PATIENT_PROFILE', {
    converterProps: matchProps,
    primaryKey: 'PatientProfileID',
    resourceName: 'Patient Profile'
})
export class MySqlPatientProfileRepository implements IPatientProfileRepository {

    getPatientProfileByUserId(usrId: string | number): Promise<IPatientProfile> { return null; }

    createPatientProfile(profile: IPatientProfile): Promise<IPatientProfile> { return null; }

}