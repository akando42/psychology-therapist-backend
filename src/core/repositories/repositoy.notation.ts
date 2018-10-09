import { GenericDao } from "../mysql/generic.dao";
import { generateParam } from "../queries/my-sql/get-by-query.notation";
import { GetByQuery } from "../../query-spec/my-sql/get-by.query";
// import { CreateQuery } from "../queries/my-sql/create-query.notation";
import { GenericConverter } from "../converters/generic-converter";

export interface IRepositoryConfiguration {
    resourceName: string,
    primaryKey: string,
    converterProps: any,
    getters?: string[][],
    create?: { return: boolean },
    update?: boolean,
    delete?: boolean
}
export type Constructor<T = {}> = new (...args: any[]) => T;

export function Repository(table: string, configuration?: IRepositoryConfiguration) {
    return <T extends Constructor>(C: T) => {


        C.prototype.table = table;

        C.prototype.query = async (q) => {
            return await GenericDao.QUERY(q);
        }

        C.prototype.insert = async (q, data) => {
            let result = await GenericDao.INSERT(q, data);
            return result;
        }

    }

}




export function ExpRepository(table: string, configuration?: IRepositoryConfiguration) {
    return <T extends Constructor>(C: T) => {

        class E extends C {

            public converter = new GenericConverter(configuration.converterProps);
            public table = table;

            constructor(...args) {
                super(args);


                this.build()
            }

            async query(q) {
                return await GenericDao.QUERY(q);
            }

            async insert(q, data) {
                let result = await GenericDao.INSERT(q, data);
                return result;
            }

            /**
             * Method called on obj creation for extends its funcionality autmatically as a 
             * repository according to the configuration pass it to it.
             */
            build() {


                configuration.getters.forEach((getter) => {
                    const methodName = `get${configuration.resourceName}by${getter}`;
                    //generate getters functions
                    this[methodName] = customGetFunctionFactory(this, table, getter);

                });

                //check if this repository will be able to create the resource,
                if (configuration.create) {
                    const createMethodName: string = `create${configuration.resourceName}`;
                    //generate a create function for the resource
                    this[createMethodName] = functionCustomCreateFunctionFactory(this['converter'], table,
                        configuration.create, this)

                }
            }

        }

        return E
    }
}


export function customGetFunctionFactory(repo: { query: Function, converter: any }, table, getConfig: string[], toArray = false) {


    return async (...args) => {
        let params = {};

        getConfig.forEach((prop, i) => {
            params[prop] = args[i];
        });
        let query = new GetByQuery(params, table);
        // const query = null
        let r = await repo.query(query.toDBQuery())
        if (r.length == 1) {
            let value = repo.converter.convertDBModelToDomain(r[0]);

            if (toArray) { return [value] }

            return value;
        } else if (r.length == 0 && !toArray) {
            return null;
        }
        else {
            return repo.converter.convertManyDBModelToDomain(r);
        }



    };
}


export function functionCustomCreateFunctionFactory(converter, table, configuration, target) {

    return async (...args) => {

        let data = args[0];
        let dbModel = null;

        if (data.length > 1) {
            dbModel = converter.converManyDomainToDBModel(data);
        } else {
            dbModel = converter.converDomainToDBModel(data);
        }

        let q = `INSERT INTO ${table || target.table} SET ?`;


        let result = await target.insert(q, dbModel);

        if (configuration.return) {
            let q2 = `SELECT * FROM ${target.table} WHERE ${configuration.primary}=${result.insertId}`;
            let result2 = await target.query(q2);

            let domainModel = null;
            if (data.length > 1) {
                domainModel = converter.convertDBModelToDomain(result2);
            } else {
                domainModel = converter.convertDBModelToDomain(result2[0]);
            }

            return domainModel;

            return result;
        }
    }
}