import { TODResponse } from "../../dto/tod-response";


export function TODResponseTansformer(target, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function () {
        try {
            const result = originalMethod.apply(this, arguments);
            const output: TODResponse = {
                message: 'succefully registered',
                payload: result,
                timestamp: new Date()
            };

            return output;
        } catch (error) {

            const output: TODResponse = {
                message: 'succefully registered',
                payload: error,
                timestamp: new Date()
            };
            return output;

        }
    }

    return descriptor;
}


