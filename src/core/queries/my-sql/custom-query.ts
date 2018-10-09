


export function CustomQuery(query: { toDBQuery: Function }) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {

        descriptor.value = function (...args) {
            let q: string = query.toDBQuery();

            let replaced = q.replace('$0', args[0][0])
            let r = target.query(replaced)
            return r;


        };
        return descriptor;
    }
}