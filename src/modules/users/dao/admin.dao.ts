import { IWrite } from "../../../behavior/write.interface";
import { IRead } from "../../../behavior/read.interface";

export interface IAdminDAO<T> extends IWrite<T>, IRead<T> { } 