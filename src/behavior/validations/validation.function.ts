import { isNullOrUndefined } from "util";

const regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Use a regular expresion to validate that the format of a string correspond
 * to a email.
 * @param email 
 */
export function validateEmail(email: string): { message: string, valid: boolean } {

    let valid = regExp.test(email);

    return {
        message: !valid ? 'Email its not valid' : null,
        valid: valid
    };
}

/**
 * Validate some spec of a passwords as for example it must be a string,
 * and cannot be null.
 * @param password 
 */
export function validatePassword(password: string): { message: string, valid: boolean } {
    let message: string = null;
    let valid: boolean = true;
    if (isNullOrUndefined(password)) {
        message = 'password its required';
        valid = false;
    }

    if (typeof password !== 'string') {
        message = 'password must be a string';
        valid = false;

    }

    return {
        message: message,
        valid: valid
    };
}


export function Required(item: any): { message: string, valid: boolean } {
    let message: string = null;
    let valid: boolean = true;
    if (isNullOrUndefined(item)) {
        valid = false;
        message = 'required';
    }

    return {
        message: message,
        valid: valid
    };
}