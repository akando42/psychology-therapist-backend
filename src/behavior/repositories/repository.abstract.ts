import { IConverter } from "../converters/converter.interface";
import { IWriteReadRepository } from "./write-read-repository.interface";


export abstract class AbstractRepository<K> implements IWriteReadRepository<K> {

    constructor(private _db: any, private _converter?: IConverter) {

    }


    create(model: K): Promise<K> {
        return new Promise<K>((resolve, reject) => {
            this._db.create(model)
                .then((result: any) => {
                    const output: K = this._converter ?
                        this._converter.convertDBModelToDomain(result) : result;

                    console.log('created', output)
                    resolve(output)
                })
                .catch(reject);
        });
    }

    update(id: string, model: K): Promise<K> {
        return new Promise<K>(async (resolve, reject) => {
            console.log(`respository findind ${id} and replace with`, model)
            this._db.findOneAndUpdate({ _id: id }, model)
                .then(async (result: any) => {
                    const item: K = await this.getBy({ _id: result._id });
                    // console.log(item);
                    resolve(item);
                })
                .catch(reject);
        });
    }

    delete(modelId: string): Promise<{ id: string, success: boolean }> {
        return new Promise<{ id: string, success: boolean }>((resolve, reject) => {
            this._db.deleteOne({ _id: modelId })
                .then((result: any) => {
                    resolve({ id: modelId, success: result.ok === 1 ? true : false })
                })
                .catch(reject);
        });
    }

    getBy(query: any): Promise<K> {
        console.log('Repository::attempting to query', query)
        return new Promise<K>((resolve, reject) => {
            this._db.findOne(query)
                .then((result: any) => {
                    console.log('repository::',result)
                    const output: K = this._converter ?
                        this._converter.convertDBModelToDomain(result) : result;

                    resolve(output)
                })
                .catch((err:any) => {
                    console.log(err)
                    reject(err)
                });
        });
    }

    getAllBy(query?: any): Promise<K[]> {
        console.log('queryng')
        return new Promise<K[]>((resolve, reject) => {
            this._db.find(query)
                .then((result: any) => {

                    const output: K[] = this._converter ?
                        this._converter.convertManyDBModelToDomain(result) : result;

                    resolve(output)
                })
                .catch(reject);
        });


    }
}