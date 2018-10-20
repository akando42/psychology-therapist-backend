import { MySqlPatientProfileRepository } from "./dao/mysql/repositories/my-sql-patient-profile.respository";
import { PatientProfileImplService } from "./core/patient-profile/patient-profile-impl.service";
import { PatientsProfilesComponent } from "./core/patient-profile/patient-profile.component";


//repositories
const mysqlPatientProfileRepository = new MySqlPatientProfileRepository();


//services

const TODPatientsProfileService = new PatientProfileImplService(mysqlPatientProfileRepository);

//components

const TODPatientsProfileComponent = new PatientsProfilesComponent(TODPatientsProfileService);


