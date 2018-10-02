import { GetByQuery as q } from "../../../query-spec/my-sql/get-by.query";



export function GetByQuery(searchParam, tableName?, ...queriesExtends) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args) {
            let table: string = target.table || tableName
            let sp = generateParam(searchParam, arguments)

            let query = new q(sp, table);
            console.log(query.toDBQuery())
            let r = target.query(query.toDBQuery())
            return r;


        };
        return descriptor;
    };
}

/**
 * Match function arguments with the uery object.
 * @param searchParam 
 * @param args 
 */
export function generateParam(searchParam, args) {


    let query = {}

    for (const prop in searchParam) {
        if (searchParam.hasOwnProperty(prop)) {
            let index = searchParam[prop];
            query[prop] = args[0][index];
        }
    }

    return query;
}