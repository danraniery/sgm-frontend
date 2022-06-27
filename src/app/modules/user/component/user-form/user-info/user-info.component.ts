import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as lodash from 'lodash';
import {
    INITIAL_PAGE,
    ITEMS_PER_PAGE,
    LOCK_ICON,
    MAX_SIZE_NAME,
    MAX_SIZE_USER_NAME,
    MIN_SIZE_NAME,
    MIN_SIZE_PASSWORD,
    MIN_SIZE_USER_NAME,
    PASSWORD_TYPE,
    TEXT_TYPE,
    TOAST_TIME_OUT_LATE,
    UNLOCK_ICON,
    USER_LIST_ROUTER
} from '../../../../../app.constants';
import {User} from '../../../../../shared/models/user.model';
import {UserService} from '../../../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FeedbackService} from '../../../../../core/services/feedback.service';
import {ProfileService} from '../../../../settings/profile.service';
import {StorageService} from '../../../../../core/services/storage.service';
import {DataFormatterService} from '../../../../../core/services/data-formatter.service';
import {AccountService} from '../../../../../core/services/account.service';
import {Account} from '../../../../../shared/models/account.model';
import {ValidPasswordValidator} from '../../../../../shared/validators/ValidPasswordValidator';

@Component({
    selector: 'sgm-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

    constants = {
        NAME_LENGTH_MAX: MAX_SIZE_NAME,
        NAME_LENGTH_MIN: MIN_SIZE_NAME,
        USER_NAME_LENGTH_MIN: MIN_SIZE_USER_NAME,
        USER_NAME_LENGTH_MAX: MAX_SIZE_USER_NAME,
        PASSWORD_LENGTH_MIN: MIN_SIZE_PASSWORD,
    };

    private readonly passwordValidators = [
        Validators.minLength(this.constants.PASSWORD_LENGTH_MIN),
        Validators.required,
        ValidPasswordValidator,
    ];

    formGroup: FormGroup | any = this.formBuilder.group({
        name: [null, [Validators.required, Validators.maxLength(this.constants.NAME_LENGTH_MAX),
            Validators.minLength(this.constants.NAME_LENGTH_MIN)]],
        profile: [null, [Validators.required]],
        username: [null, [Validators.required, Validators.maxLength(this.constants.USER_NAME_LENGTH_MAX),
            Validators.minLength(this.constants.USER_NAME_LENGTH_MIN)]],
        password: ['', this.passwordValidators],
        confirmPassword: ['', this.passwordValidators],
        activated: [null, [Validators.required]],
        ruralProducer: [null],
        userType: [null]
    });

    isViewMode: boolean = false;
    isEditMode: boolean = false;
    isShowPassword: boolean = false;
    isShowConfirmPassword: boolean = false;
    isUploadingImage: boolean = false;
    label: string = '';

    inputConfirmPasswordType: string = PASSWORD_TYPE;
    inputPasswordType: string = PASSWORD_TYPE;
    passwordIcon: string = LOCK_ICON;
    confirmPasswordIcon: string = LOCK_ICON;

    profiles: any[] = [];
    user: User = new User();
    originalUser: User = new User();

    private totalPages: any;
    private page: any;
    private search: any;
    loggedAccount?: Account;
    isLoading: boolean = false;

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly userService: UserService,
        private readonly formBuilder: FormBuilder,
        private readonly profileService: ProfileService,
        private readonly storageService: StorageService,
        private readonly accountService: AccountService,
        private readonly formatter: DataFormatterService,
        private readonly feedbackService: FeedbackService
    ) {
    }

    ngOnInit(): void {
        this.route.data.subscribe(({user, isViewMode, label}) => {
            this.user = user;
            this.isEditMode = this.user?.id;
            this.isViewMode = isViewMode;
            this.label = label;
            if (!isViewMode) {
                this.loadProfiles();
            }
            this.formGroup.get('userType')?.setValue(this.user.type === 'legal_entity')
            this.formGroup.get('ruralProducer')?.setValue(this.user.ruralProducer)
            if (this.isEditMode) {
                this.formGroup.get('password').clearValidators();
                this.formGroup.get('password').updateValueAndValidity();
                this.formGroup.get('confirmPassword').clearValidators();
                this.formGroup.get('confirmPassword').updateValueAndValidity();
                if (!this.user.profile?.activated) {
                    this.profiles.push(this.user.profile);
                }
            }
        });

        this.formGroup.patchValue(this.user);

        if (this.isViewMode) {
            this.formGroup.disable();
        }

        if (!this.isViewMode && !this.isEditMode) {
            this.formGroup.get('activated')?.setValue(true);
        }
        this.prepareUser();
        this.originalUser = lodash.cloneDeep(this.user);

        this.accountService.identity().subscribe((account) => {
            this.loggedAccount = account;
        });
    }

    goToUserListScreen() {
        this.router.navigate([USER_LIST_ROUTER]).then();
    }

    save() {
        this.isLoading = true;
        this.prepareUser();
        if (lodash.isEqual(this.originalUser, this.user)) {
            this.feedbackService.showInfo('message.noChanges');
            return window.history.back();
        }

        this.feedbackService.initLoading();
        this.saveOrUpdate().subscribe(() => {
            this.feedbackService.closeLoading();
            this.feedbackService.showSuccess(this.user?.id ? 'user.onUpdate' : 'user.onSave');

            if (this.editedTheUserHimself()) {
                this.accountService.updateUserInfoInPopoverMenu(this.user);
                if (this.changedProfile()) {
                    this.feedbackService.showInfo('user.form.messages.changedProfile', TOAST_TIME_OUT_LATE);
                }
            }
            this.isLoading = false;
            this.goToUserListScreen();
        }, (error: any) => {
            this.isLoading = false;
            this.feedbackService.closeLoading();
            this.feedbackService.showErrorFromServer(error);
        });
    }

    scrollToEnd() {
        this.profileService.getAll(this.getParams()).subscribe((value: any) => {
            this.loadPage(value.body);
        });
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

    showConfirmPassword() {
        this.isShowConfirmPassword = !this.isShowConfirmPassword;
        if (this.isShowConfirmPassword) {
            this.inputConfirmPasswordType = TEXT_TYPE;
            this.confirmPasswordIcon = UNLOCK_ICON;
        } else {
            this.inputConfirmPasswordType = PASSWORD_TYPE;
            this.confirmPasswordIcon = LOCK_ICON;
        }
    }

    isPasswordEquals() {
        return this.formGroup.get('password').value === this.formGroup.get('confirmPassword').value;
    }

    isPasswordRequired() {
        return this.formGroup.get('password')?.hasValidator(Validators.required);
    }

    checkEmptySpaces(event: any, field: any) {
        this.formGroup = this.formatter.checkEmptySpacesByFormGroupAndFieldName(this.formGroup, field, event);
    }

    removeEmptySpaces(field: any) {
        this.formGroup = this.formatter.removeEmptySpacesByFormGroupAndFieldName(this.formGroup, field);
    }

    checkKey(event: any) {
        const newValue = event.target.value;
        event.target.value = newValue.replace(/( )/ig, '');
        this.formGroup.controls.email.setValue(newValue.replace(/( )/ig, ''));
    }

    changedProfile() {
        return this.originalUser.profile?.id !== this.user.profileId;
    }

    editedTheUserHimself() {
        return this.user.username === this.loggedAccount?.username;
    }

    updatePasswordValidators() {
        if (this.isEditMode) {
            if (this.formGroup.get('password')?.value || this.formGroup.get('confirmPassword')?.value) {
                if (!this.isPasswordRequired()) {
                    this.formGroup.get('password').addValidators(this.passwordValidators);
                    this.formGroup.get('password').updateValueAndValidity();
                    this.formGroup.get('confirmPassword').addValidators(this.passwordValidators);
                    this.formGroup.get('confirmPassword').updateValueAndValidity();
                }
            } else {
                if (this.isPasswordRequired()) {
                    this.formGroup.get('password').clearValidators();
                    this.formGroup.get('password').updateValueAndValidity();
                    this.formGroup.get('confirmPassword').clearValidators();
                    this.formGroup.get('confirmPassword').updateValueAndValidity();
                }
            }
        }
    }

    validatePassword() {
        this.formGroup.get('password').updateValueAndValidity();
        this.formGroup.get('confirmPassword').updateValueAndValidity();
    }

    private prepareUser() {
        this.user.name = this.formGroup.get('name')?.value;
        this.user.username = this.formGroup.get('username')?.value;
        this.user.password = this.formGroup.get('password')?.value;
        this.user.confirmPassword = this.formGroup.get('confirmPassword')?.value;
        this.user.profileId = this.formGroup.get('profile')?.value.id;
        this.user.activated = this.formGroup.get('activated')?.value;
        this.user.ruralProducer = this.formGroup.get('ruralProducer')?.value;
        this.user.type = this.formGroup.get('userType')?.value ? 'legal_entity' : 'natural_person';
        if (this.isEditMode) {
            this.user.activated = this.formGroup.get('activated')?.value;
        }
    }

    private saveOrUpdate() {
        return (this.user?.id) ?
            this.userService.update(this.user) :
            this.userService.create(this.user);
    }

    private loadProfiles() {
        this.profileService.getAll(this.getParams()).subscribe((value: any) => {
            this.loadPage(value.body);
        });
    }

    private loadPage(result: any) {
        const currentPage = result?.pageable.pageNumber;
        this.totalPages = result.totalPages;
        if (currentPage < this.totalPages - 1) {
            this.page = currentPage + 1;
            this.profiles = [...this.profiles, ...result?.content];
        } else {
            if (this.profiles.length < result?.totalElements) {
                this.profiles = [...this.profiles, ...result?.content];
            }
            this.page = currentPage;
        }
        if (this.isEditMode && !this.user.profile?.activated
            && this.profiles.some((profile) => profile.id === this.user.profile?.id && profile.activated)) {
            const index = this.profiles.indexOf(this.user.profile);
            if (index > -1) {
                this.profiles.splice(index, 1);
            }
        }
    }

    private getParams() {
        return {
            page: this.page && this.page >= INITIAL_PAGE ? this.page : 0,
            status: true,
            size: ITEMS_PER_PAGE,
            name: this.search?.length ? this.search.trim() : ''
        };
    }

}
