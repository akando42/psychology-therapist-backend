import { IController } from "@core/behaviors/controllers/controller.interface";
import { IRead } from "@core/behaviors/read.interface";
import { IWrite } from "@core/behaviors/write.interface";



export interface IWriteReadController<T> extends IController<T>, IRead<T>, IWrite<T> { }
