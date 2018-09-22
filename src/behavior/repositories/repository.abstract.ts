import { IConverter } from "../converters/converter.interface";
import { IWriteReadRepository } from "./write-read-repository.interface";
import { MetadataArgsStorage } from "typeorm/metadata-args/MetadataArgsStorage";
import { AbstractUsersRepository } from "../../modules/users/dao/users.repository";

class Container {

    static container: any = []

}

function injected(target) {
    // cambiar constructores para q reciban estring como nombre de o talves agregar metadata
    // Y HACERLO ACORDE AL NOMBRE Y EL TIPO SEA OPCIONAL COMO MYSQL + AbstractUsersRepositorY
    // DONDE MYSQL ES PARAMETRO OPCIONAL Y ESTARA GUARDADO EN LA BASE DE DATOS YA QUE TODO SERA 
    // REFERENTE AL NOMBRE Y SE LLAMARA WHOAREYOU

}

@injected
export abstract class AbstractRepository<K> implements IWriteReadRepository<K> {

    constructor(protected _db: any, private _converter?: IConverter) {
        // const test =

        //     new _db.prototype.constructor();
        // console.dir(test)
        // console.dir(_converter)


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
            console.log('repositoy::', query)
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
            console.log('repo')
            console.log(query)
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