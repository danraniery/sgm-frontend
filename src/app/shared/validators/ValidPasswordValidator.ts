import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const ValidPasswordValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {

    const isValidPassword = (password: string, firstName: string, lastName: string, username: string) => {
        const containsListResult = [
            containsNumber(password),
            containsUppercaseLetter(password),
            containsLowercaseLetter(password),
            containsNonAlphabetic(password)
        ].filter((result) => (!!result));

        if (containsListResult.length < 3) {
            return {invalidPassword: 'message.invalidPassword'};
        }

        if (containsUserInfo(firstName, lastName, password, username)) {
            return {invalidPassword: 'message.invalidPasswordWithUserInfo'};
        }

        return {};
    };

    const containsUserInfo = (firstName: string, lastName: string, password: string, username: string) => {
        let result = false;
        let names: any[] = !!username ? [username] : [];

        if (firstName) {
            names = names.concat(firstName.split(' '));
        }

        if (lastName) {
            names = names.concat(lastName.split(' '));
        }

        if (names) {
            names.forEach((name: any) => {
                if (passwordContainsName(name, password)) {
                    result = true;
                }
            });
        }
        return result;
    };

    const passwordContainsName = (name: string, password: string) => {
        if (isEmpty(name)) {
            return false;
        }
        if (!!password) {
            return password.toLowerCase().includes(name.toLowerCase());
        }
        return !!password;
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

    const formGroup = form?.parent;
    const firstName = formGroup?.get('firstName')?.value;
    const lastName = formGroup?.get('lastName')?.value;
    const username = formGroup?.get('username')?.value;
    const password = form?.value;

    return isValidPassword(password, firstName, lastName, username);
};
