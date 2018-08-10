import { IConverter } from "../converters/converter.interface";
import { IWriteReadRepository } from "./write-read-repository.interface";


export abstract class AbstractRepository<K> implements IWriteReadRepository<K> {

    constructor(private _db: any, private _converter?: IConverter) {

    }


    create(model: K): Promise<string> {
        const input: K = this._converter ?
            this._converter.converDomainToDBModel(model) : model;
        console.log('Repository::creating', input)
        return new Promise<string>((resolve, reject) => {
            this._db.create(input)
                .then((result: any) => {
                    console.log('inserted ID', result)
                    resolve(result)
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }

    update(query, model: K): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {

            const input: K = this._converter ?
                this._converter.converDomainToDBModel(model) : model;
            console.log('repositoy::', query)
            this._db.findOneAndUpdate(query, input)
                .then((result: boolean) => {
                    // const item: K = await this.getBy({ _id: result._id });
                    // console.log(item);
                    resolve(result);
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
                    const output: K = this._converter ?
                        this._converter.convertDBModelToDomain(result) : result;

                    resolve(output)
                })
                .catch((err: any) => {
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