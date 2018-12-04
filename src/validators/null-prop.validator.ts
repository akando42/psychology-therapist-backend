import { isNullOrUndefined } from "util";


/**
 * check and object for properties missing
 * @param object object to validate.
 * @param requiredFields name of the fields no be checked.
 */
export function nullPropValidator(object: any, requiredFields: string[]): { missingField: string[], valid: boolean } {
    let missingField: string[] = [];

    requiredFields.forEach((field) => {
        if (isNullOrUndefined(object[field])) {
            missingField.push(field);
        }
    });

    const v = missingField.length > 0 ? false : true;

    return { missingField: missingField, valid: v };
}       