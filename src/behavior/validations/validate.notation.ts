

export function Validate(validations: { parameterIndex: number, cb: Function }[]) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        //store the original method for futher call;
        var originalMethod = descriptor.value;

        //overload with validation.
        descriptor.value = function (...args: any[]) {
            let errors: any[] = [];

            validations.forEach((validation) => {
                let valResult = validation.cb(args[validation.parameterIndex]);
                if (!valResult.valid) {
                    errors.push({
                        message: valResult.message,
                        value: args[validation.parameterIndex]
                    })
                }
            })
            if (errors.length > 0) {
                throw errors;
            }
            return originalMethod.apply(this, arguments);
        }

        //return new implementation of the method.
        return descriptor;
    }
}