import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '../login.service';
import {StorageService} from '../../../core/services/storage.service';
import {
    CHANGE_PASSWORD_ROUTER,
    LOCK_ICON,
    LOGIN_ROUTE,
    PASSWORD_TYPE,
    TEXT_TYPE,
    UNLOCK_ICON
} from '../../../app.constants';
import {FeedbackService} from '../../../core/services/feedback.service';
import {AccountService} from '../../../core/services/account.service';
import {Account} from '../../../shared/models/account.model';
import {Router} from '@angular/router';

@Component({
    selector: 'sgm-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

    isShowPassword: boolean = false;
    isRequesting: boolean = false;
    inputPasswordType: string = PASSWORD_TYPE;
    passwordIcon: string = LOCK_ICON;

    loginForm = this.formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
    });

    loggedAccount: Account | undefined;
    updatePassword: boolean = false;

    constructor(
        private readonly router: Router,
        private readonly formBuilder: FormBuilder,
        private readonly loginService: LoginService,
        private readonly accountService: AccountService,
        private readonly storageService: StorageService,
        private readonly feedbackService: FeedbackService
    ) {
    }

    ngOnInit() {
        if (this.storageService.getAccessToken()) {
            this.router.navigate(['']).then();
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            const loginField = document.getElementById('usernameOrEmail');
            if (loginField) {
                loginField.focus();
            }
        });
    }

    async makeLogin(): Promise<any> {
        return new Promise((resolve) => {
            this.loginService
                .login({
                    username: this.loginForm.get('username')?.value,
                    password: this.loginForm.get('password')?.value
                })
                .subscribe(
                    () => {
                        this.isRequesting = false;
                        this.feedbackService.closeLoading();
                        resolve(true);
                    },
                    (err) => {
                        this.showAlertLoginInvalid(err);
                    }
                );
        });
    }

    async login() {
        this.isRequesting = true;
        this.feedbackService.initLoading();
        let isLogged = await this.makeLogin();

        if (isLogged) {
            this.verifyPassword();
        }
    }

    showPassword() {
        this.isShowPassword = !this.isShowPassword;
        if (this.isShowPassword) {
            this.inputPasswordType = TEXT_TYPE;
            this.passwordIcon = UNLOCK_ICON;
        } else {
            this.inputPasswordType = PASSWORD_TYPE;
            this.passwordIcon = LOCK_ICON;
        }
    }

    showAlertLoginInvalid(err: any) {
        this.isRequesting = false;
        this.feedbackService.closeLoading();
        this.loginService.logout();
        this.feedbackService.showErrorFromServer(err);
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    private verifyPassword() {
        this.accountService.identity().subscribe((account) => {
            this.loggedAccount = account;
            if (this.loggedAccount.updatePassword) {
                this.storageService.storeRequiredChangePassword(true);
                this.router.navigate([CHANGE_PASSWORD_ROUTER]).then();
            } else {
                if (this.router.url.includes(LOGIN_ROUTE)) {
                    this.router.navigate(['']).then();
                }
                const redirect = this.storageService.getUrl();
                if (redirect && !redirect.includes(LOGIN_ROUTE)) {
                    this.storageService.clearUrl();
                    this.router.navigate(redirect).then();
                }
            }
        });
    }

}
