import { IService } from "@core/behaviors/services/service.interface";
import { IRead } from "@core/behaviors/read.interface";
import { IWrite } from "@core/behaviors/write.interface";


export interface IWriteReadService<T> extends IService<T>, IRead<T>, IWrite<T> { }
