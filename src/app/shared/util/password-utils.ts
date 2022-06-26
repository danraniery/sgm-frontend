import {MIN_SIZE_PASSWORD} from '../../app.constants';

export default class PasswordUtils {

    static verifyByRegex(regex: any, password: string) {
        if (password) {
            return regex.test(password);
        } else {
            return password;
        }
    }

    static containsUppercaseLetter(password: string) {
        return this.verifyByRegex(/[A-Z]/, password);
    }

    static containsLowercaseLetter(password: string) {
        return this.verifyByRegex(/[a-z]/, password);
    }

    static containsNonAlphabetic(password: string) {
        return this.verifyByRegex(/[^a-zA-Z\d\s:]/, password);
    }

    static containsNumber(password: string) {
        return this.verifyByRegex(/\d/, password);
    }

    static isValidPassword(password: string) {
        let containsList = [];
        containsList.push(this.containsNumber(password));
        containsList.push(this.containsUppercaseLetter(password));
        containsList.push(this.containsLowercaseLetter(password));
        containsList.push(this.containsNonAlphabetic(password));
        containsList = containsList.filter((result) => (!!result));
        return containsList.length >= 3;
    }

    static areEqualsPassword(password: string, confirmPassword: string) {
        return !!password && password === confirmPassword;
    }

    static isPasswordSizeRight(password: string) {
        return password !== undefined && password.length >= MIN_SIZE_PASSWORD;
    }

}
