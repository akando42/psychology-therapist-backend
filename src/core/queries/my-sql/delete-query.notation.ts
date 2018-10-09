import { generateParam } from "./get-by-query.notation";
import { DeleteQuery as MySqlDeleteQuery } from "../../../query-spec/my-sql/delete-query";


export function DeleteQuery(selector, tableName?: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function () {
            let table: string = target.table || tableName
            let serachParams = generateParam(selector, arguments);
            const asyncCall = async () => {
                let q = new MySqlDeleteQuery(serachParams);
                let result = target.query(q.toDBQuery(table));

                if (await result.affectedRows > 1) {
                    return true;
                }
                return false;
            }

            return asyncCall();
        }

        return descriptor;
    }
}