import { IRead } from "../read.interface";
import { IWrite } from "../write.interface";
import { IWriteReadRepository } from "../repositories/write-read-repository.interface";


export abstract class WriterReaderService<T> implements IRead<T>, IWrite<T> {

    constructor(protected _repository: IWriteReadRepository<T>) {

    }

    create(newObj: T): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            try {
                const item: T = await this._repository.create(newObj)

                return resolve(item);
            } catch (error) {
                // console.log('ups')
                return reject(error);
            }
        });
    }
    delete(id: string): Promise<{ id: string, success: boolean }> {
        return new Promise<{ id: string, success: boolean }>(async (resolve, reject) => {
            try {
                console.log('service deleting -->', id);

                const deleted: { id: string, success: boolean } = await this._repository.delete(id);
                return resolve(deleted);
            } catch (error) {
                reject(error);
            }
        });
    }
    update(id: string, model: T): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                if (!id) { return reject({ message: 'no id provided' }); }

                const successRepo: boolean = await this._repository.update(id, model);
                return resolve(successRepo);
            } catch (error) {
                reject(error);
            }

        });
    }
    getBy(query: any): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            try {
                const item: T = await this._repository.getBy(query)
                return resolve(item);
            } catch (error) {
                reject(error);
            }
        });
    }
    getAllBy(query: any): Promise<T[]> {
        return new Promise<T[]>(async (resolve, reject) => {
            try {
                const items: T[] = await this._repository.getAllBy(query)
                return resolve(items);
            } catch (error) {
                reject(error);
            }
        });
    }
}