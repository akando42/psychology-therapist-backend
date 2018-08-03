import { IRepository } from "@core/behaviors/repositories/repository.interface";
import { IRead } from "@core/behaviors/read.interface";
import { IWrite } from "@core/behaviors/write.interface";


export interface IWriteReadRepository<T> extends IRepository<T>, IRead<T>, IWrite<T> { }
