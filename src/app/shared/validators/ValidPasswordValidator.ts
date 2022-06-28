import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const ValidPasswordValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {

    const isValidPassword = (password: string) => {
        const containsListResult = [
            containsNumber(password),
            containsUppercaseLetter(password),
            containsLowercaseLetter(password),
            containsNonAlphabetic(password)
        ].filter((result) => (!!result));

        if (containsListResult.length < 3) {
            return {invalidPassword: 'message.invalidPassword'};
        }

        return {};
    };

    const containsNumber = (value: string) => {
        return verifyByRegex(/\d/, value);
    };

    const containsUppercaseLetter = (value: string) => verifyByRegex(/[A-Z]/, value);

    const containsLowercaseLetter = (value: string) => {
        return verifyByRegex(/[a-z]/, value);
    };

    const containsNonAlphabetic = (value: string) => {
        return verifyByRegex(/[^a-zA-Z\d\s:]/, value);
    };

    const verifyByRegex = (regex: any, value: string) => {
        if (value) {
            return regex.test(value);
        }
        return value;
    };

    const isEmpty = (str: string) => {
        // This doesn't work the same way as the isEmpty function used
        // in the first example, it will return true for strings containing only whitespace
        return (str.length === 0 || !str.trim());
    };

    const password = form?.value;

    return isValidPassword(password);
};
