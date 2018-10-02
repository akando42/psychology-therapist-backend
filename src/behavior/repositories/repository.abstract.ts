import { IConverter, IDualConverter } from "../converters/converter.interface";
import { IWriteReadRepository } from "./write-read-repository.interface";
import { MetadataArgsStorage } from "typeorm/metadata-args/MetadataArgsStorage";
import { AbstractUsersRepository } from "../../modules/users/dao/users.repository";


export abstract class AbstractRepository<K> implements IWriteReadRepository<K> {

    constructor(protected _db: any, private _converter?: IConverter) {

    }

    async query(query?: any, converter?: IDualConverter<any, any>): Promise<any> {
        return await this._db.query(query.toDBQuery())
        if (converter) {
            return this._useCustomConverterForQuery(query, converter);
        }

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
    async queryAll(query?: any, converter?: IDualConverter<any, any>): Promise<any> {
        return await this._db.query(query.toDBQuery())

    }

    create(model: K): Promise<K> {
        const input: K = this._converter ?
            this._converter.converDomainToDBModel(model) : model;
        return new Promise<K>((resolve, reject) => {
            this._db.create(input)
                .then((result: any) => {

                    resolve(result)
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }

    update(query, model: K): Promise<K> {
        return new Promise<K>(async (resolve, reject) => {

            const input: K = this._converter ?
                this._converter.converDomainToDBModel(model) : model;
            this._db.findOneAndUpdate(query, input)
                .then((result: any) => {
                    // const item: K = await this.getBy({ _id: result._id });
                    // console.log(item);
                    resolve(result);
                })
                .catch(reject);
        });
    }

    delete(query: any): Promise<{ id: string, success: boolean }> {
        return new Promise<{ id: string, success: boolean }>((resolve, reject) => {

            this._db.query(query)
                .then((result: any) => {
                    console.log(result)
                    resolve({ id: result, success: result.ok === 1 ? true : false })
                })
                .catch((err) => {
                    console.log(err);
                    reject(err)
                });
        });
    }
    // query spec approach to queries
    getBy(query: any): Promise<K> {
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

    getAllBy(query?: any, converter?: IDualConverter<any, any>): Promise<K[]> {

        if (converter) {
            return this._useCustomConverterForQuery(query, converter);
        }


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

    private async _useCustomConverterForQuery(query?: { toDBQuery: Function }, converter?: IDualConverter<any, any>): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this._db.query(query.toDBQuery())
                .then(async (rawValues) => {
                    const converted = await converter.convertDBModelToDomain(rawValues[0]);
                    return resolve(converted);

                }).
                catch((err) => {
                    return reject(err)
                });
        });
    }

    // private async _useCustomConverterForQueryAll(query?: { toDBQuery: Function }, converter?: IDualConverter<any, any>): Promise<any[]> {
    //     let rawValues =

    //     // const converted = converter.converManyDomainToDBModel(rawValues);

    //     return rawValues;



    // }
}