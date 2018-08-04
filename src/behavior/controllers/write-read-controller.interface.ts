import { IController } from "./controller.interface";
import { IRead } from "../read.interface";
import { IWrite } from "../write.interface";

export interface IWriteReadController<T> extends IController<T>, IRead<T>, IWrite<T> { }
