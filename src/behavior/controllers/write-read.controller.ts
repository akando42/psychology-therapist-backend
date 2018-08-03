import { IWriteReadController } from "@core/behaviors/controllers/write-read-controller.interface";
import { IWriteReadService } from "@core/behaviors/services/write-read-service.interface";


export abstract class WriteReadController<T> implements IWriteReadController<T>{
    constructor(protected _service: IWriteReadService<T>) {

    }
    getBy(query: any): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            try {
                console.log('controller')
                const items: T = await this._service.getBy(query);
                return resolve(items)

            } catch (error) {
                reject(error)
            }
        });
    }
    getAllBy(query: any): Promise<T[]> {
        return new Promise<T[]>(async (resolve, reject) => {
            try {
                console.log('controller')
                const items: T[] = await this._service.getAllBy(query);
                return resolve(items)

            } catch (error) {
                reject(error)
            }
        });
    }

    create(newObj: T): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            try {
                console.log('creating', newObj)
                const created: T = await this._service.create(newObj);

                return resolve(created)

            } catch (error) {
                reject(error)
            }
        });
    }

    delete(id: string): Promise<{ id: string, success: boolean }> {
        return new Promise<{ id: string, success: boolean }>(async (resolve, reject) => {
            try {
                console.log('deleting -->', id)
                const deleted: { id: string, success: boolean } = await this._service.delete(id);

                return resolve(deleted)

            } catch (error) {
                reject(error)
            }
        });
    }
    update(id: string, model: T): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            try {
                const updated: T = await this._service.update(id, model);

                return resolve(updated)

            } catch (error) {
                reject(error)
            }
        });
    }
}