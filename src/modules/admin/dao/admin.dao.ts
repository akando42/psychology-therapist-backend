import { IWrite } from "@core/behaviors/write.interface";
import { IRead } from "@core/behaviors/read.interface";


export interface IAdminDAO<T> extends IWrite<T>, IRead<T> { } 