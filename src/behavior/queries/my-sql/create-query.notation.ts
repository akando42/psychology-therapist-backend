import { GetByQuery } from "../../../query-spec/my-sql/get-by.query";
import { GenericConverter } from "../../converters/generic-converter";


export function CreateQuery(configuration: { return: boolean, primary: string },
    propMapping?: any, table?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        const converter = new GenericConverter(propMapping);

        descriptor.value = function () {
          
                let data = arguments[0];
                let dbModel = null;

                if (data.length > 1) {
                    dbModel = converter.converManyDomainToDBModel(data);
                } else {
                    dbModel = converter.converDomainToDBModel(data);
                }

                let q = `INSERT INTO ${table || target.table} SET ?`;
                let result = target.insert(q, dbModel);

                //return value fron insertion,
                if (configuration.return) {
                    // let q2 = `SELECT * FROM ${target.table} WHERE ${configuration.primary}=${result}`;
                    // return

                }
                return result;
            
        };
        return descriptor;
    };
}