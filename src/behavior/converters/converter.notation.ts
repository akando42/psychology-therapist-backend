import { GenericConverter } from "./generic-converter";

//TODO
/**
 * IT NEED TO WORK ON BI DIREECTANIONAL WAY ACCORDINT TO THE POSITIN OF DECLARATION
 * 
 * MOVE THE METHOD CALL FROM HERE
 */

export function Convert(propMapping: any, model?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        var originalMethod = descriptor.value;
        let converterInstace = new GenericConverter(propMapping);


        descriptor.value = function () {

            let data = originalMethod.apply(this, [arguments])
            let hack = async function () {

                let resolve = data
                // let resolve = await data
                console.log('raw', resolve)
                if (resolve.length == 1) {
                    return converterInstace.convertDBModelToDomain(resolve[0])
                } else {
                    return converterInstace.convertManyDBModelToDomain(resolve)
                }

            };
            return hack();
        };
        return descriptor;
    };
}

