import { MySqlCabinetsRepository } from "./dao/my-sql/repositories/my-sql-cabinet.repository";
import { CabinetsImplService } from "./core/cabinet/cabinet-impl.service";
import { CabinetCompont } from "./core/cabinet/cabinet.component";

//cabinet
//repositories
const mySqlcabinetRepo = new MySqlCabinetsRepository();

// services
const cabinetService = new CabinetsImplService(mySqlcabinetRepo);

// component
const cabinetComponent = new CabinetCompont(cabinetService);

export {
    cabinetComponent
}