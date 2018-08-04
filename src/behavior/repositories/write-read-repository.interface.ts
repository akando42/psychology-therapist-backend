import { IRepository } from "./repository.interface";
import { IRead } from "../read.interface";
import { IWrite } from "../write.interface";


export interface IWriteReadRepository<T> extends IRepository<T>, IRead<T>, IWrite<T> { }
