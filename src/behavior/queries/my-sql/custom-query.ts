


export function CustomQuery(query: { toDBQuery: Function }) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {

        descriptor.value = function () {
            let r = target.query(query.toDBQuery())
            return r;


        };
        return descriptor;
    }
}