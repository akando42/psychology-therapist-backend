import { GenericConverter } from "./generic-converter";

//TODO
/**
 * IT NEED TO WORK ON BI DIREECTANIONAL WAY ACCORDINT TO THE POSITIN OF DECLARATION
 * 
 * MOVE THE METHOD CALL FROM HERE
 */

export function Convert(propMapping: any, toArray?: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        var originalMethod = descriptor.value;
        let converterInstace = new GenericConverter(propMapping);


        descriptor.value = function (...args: any[]) {

            let data = originalMethod.apply(this, [arguments])
            let hack = async function () {

                let resolve = await data
                if (resolve.length == 1) {
                    let value = converterInstace.convertDBModelToDomain(resolve[0]);

                    if (toArray) { return [value] }

                    return value;
                } else if (resolve.length == 0) {
                    return null;
                }
                else {
                    return converterInstace.convertManyDBModelToDomain(resolve);
                }

            };
            return hack();
        };
        return descriptor;
    };
}

