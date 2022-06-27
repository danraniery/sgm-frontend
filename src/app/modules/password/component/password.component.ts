import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LOCK_ICON, LOGIN_ROUTE, MIN_SIZE_PASSWORD, PASSWORD_TYPE, TEXT_TYPE, UNLOCK_ICON} from '../../../app.constants';
import {Account, IAccount} from '../../../shared/models/account.model';
import {AccountService} from '../../../core/services/account.service';
import {FeedbackService} from '../../../core/services/feedback.service';
import {StorageService} from '../../../core/services/storage.service';
import {PasswordModel} from '../../../shared/models/password.model';
import PasswordUtils from '../../../shared/util/password-utils';
import {LoginService} from '../../login/login.service';
import {Router} from '@angular/router';

@Component({
    selector: 'sgm-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss']
})
export class PasswordComponent {

    passwordIcon: string = LOCK_ICON;
    inputPasswordType: string = PASSWORD_TYPE;
    currentUser: IAccount = new Account();

    constants = {
        PASSWORD_LENGTH_MIN: MIN_SIZE_PASSWORD,
    };
    private readonly passwordValidators = [
        Validators.minLength(this.constants.PASSWORD_LENGTH_MIN),
    ];
    changePasswordForm = this.formBuilder.group({
        password: ['', this.passwordValidators],
        confirmPassword: ['', this.passwordValidators]
    });
    inputConfirmPasswordType: string = PASSWORD_TYPE;
    confirmPasswordIcon: string = LOCK_ICON;

    constructor(
        private readonly router: Router,
        private readonly formBuilder: FormBuilder,
        private readonly loginService: LoginService,
        private readonly storageService: StorageService,
        private readonly accountService: AccountService,
        private readonly feedbackService: FeedbackService
    ) {
    }

    changePassword() {
        this.feedbackService.initLoading();
        this.accountService.updatePassword(this.getEntity()).subscribe(() => {
            this.feedbackService.showSuccess('password.onUpdate');
            this.feedbackService.closeLoading();
            this.storageService.clearRequiredChangePassword();
            this.router.navigate(['']).then();
        }, (error) => {
            this.feedbackService.showErrorFromServer(error);
            this.feedbackService.closeLoading();
        });
    }

    showPassword() {
        if (this.inputPasswordType === PASSWORD_TYPE) {
            this.inputPasswordType = TEXT_TYPE;
            this.passwordIcon = UNLOCK_ICON;
        } else {
            this.inputPasswordType = PASSWORD_TYPE;
            this.passwordIcon = LOCK_ICON;
        }
    }

    getPassword() {
        return this.changePasswordForm.get('password')?.value;
    }

    showConfirmPassword() {
        if (this.inputConfirmPasswordType === PASSWORD_TYPE) {
            this.inputConfirmPasswordType = TEXT_TYPE;
            this.confirmPasswordIcon = UNLOCK_ICON;
        } else {
            this.inputConfirmPasswordType = PASSWORD_TYPE;
            this.confirmPasswordIcon = LOCK_ICON;
        }
    }

    areEquals() {
        return PasswordUtils.areEqualsPassword(this.getPassword(), this.changePasswordForm.get('confirmPassword')?.value);
    }

    isSizeRight() {
        return PasswordUtils.isPasswordSizeRight(this.getPassword());
    }

    containsNumber() {
        return PasswordUtils.containsNumber(this.getPassword());
    }

    isValidPassword() {
        return PasswordUtils.isValidPassword(this.getPassword());
    }

    containsUppercaseLetter() {
        return PasswordUtils.containsUppercaseLetter(this.getPassword());
    }

    containsLowercaseLetter() {
        return PasswordUtils.containsLowercaseLetter(this.getPassword());
    }

    containsNonAlphabetic() {
        return PasswordUtils.containsNonAlphabetic(this.getPassword());
    }

    getEntity() {
        return new PasswordModel(this.getPassword(), this.changePasswordForm.get('confirmPassword')?.value);
    }

    cancel() {
        this.storageService.clearRequiredChangePassword();
        this.loginService.logout();
        this.router.navigate([LOGIN_ROUTE]).then();
    }
}
