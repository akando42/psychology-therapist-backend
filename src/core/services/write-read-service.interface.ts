import { IService } from "./service.interface";
import { IRead } from "../read.interface";
import { IWrite } from "../write.interface";

export interface IWriteReadService<T> extends IService<T>, IRead<T>, IWrite<T> { }
