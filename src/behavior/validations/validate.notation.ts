interface IParamValidator {
    parameterIndex?: number, name?: string,
    cb: (...args) => { message: string, valid: boolean }
}

/**
 * Validation for objects params
 * @param config 
 */
export function ComposeValidation(config: { index: number, validators: IParamValidator[] }[]) {

    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        var originalMethod = descriptor.value;

        descriptor.value = function (...args) {
            let errors: any[] = [];
            //Iterate through every object param.
            config.forEach((valConf) => {
                //get object by index
                let obj = args[valConf.index];
                valConf.validators.forEach((val) => {

                    //execute validation overthe property
                    const validationResult = val.cb(obj[val.name],val.name);
                    //see if its valid, if it no it will pushed to the error stack
                    if (!validationResult.valid) { errors.push(validationResult) }
                });
            });
            if (errors.length > 0) {
                throw errors;
            }

            return originalMethod.apply(this, arguments);

        }

        return descriptor;
    }
}

/**
 * Use for validate simple params 
 * @param validations 
 */
export function Validate(validations: { parameterIndex: number, name?: string, cb: (x: any) => { message: string, valid: boolean } }[]) {
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
                        message: `${validation.name || ''} is ` + valResult.message,
                        value: args[validation.parameterIndex]
                    });
                }
            });
            if (errors.length > 0) {
                throw errors;
            }
            return originalMethod.apply(this, arguments);
        }

        //return new implementation of the method.
        return descriptor;
    }
}