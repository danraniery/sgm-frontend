import {Component, HostListener, OnInit} from '@angular/core';
import {ProfileService} from '../../profile.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IAuthority} from '../../../../shared/models/authority.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Profile} from '../../../../shared/models/profile.model';
import {
    PROFILE_MAX_SIZE_DESCRIPTION,
    PROFILE_MAX_SIZE_NAME,
    PROFILE_MIN_SIZE_NAME,
    SETTINGS
} from '../../../../app.constants';
import {Observable} from 'rxjs';
import {FeedbackService} from '../../../../core/services/feedback.service';
import * as lodash from 'lodash';
import {DataFormatterService} from '../../../../core/services/data-formatter.service';
import {LoadingService} from '../../../../shared/components/loading/loading.service';

@Component({
    selector: 'sgm-profile-form',
    templateUrl: './profile-form.component.html',
    styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

    constants = {
        NAME_LENGTH_MAX: PROFILE_MAX_SIZE_NAME,
        NAME_LENGTH_MIN: PROFILE_MIN_SIZE_NAME,
        DESCRIPTION_LENGTH_MAX: PROFILE_MAX_SIZE_DESCRIPTION
    };

    formGroup: FormGroup = this.formBuilder.group({
        id: [null],
        name: [null, [Validators.required, Validators.maxLength(this.constants.NAME_LENGTH_MAX),
            Validators.minLength(this.constants.NAME_LENGTH_MIN)]],
        description: [null, [Validators.required, Validators.maxLength(this.constants.DESCRIPTION_LENGTH_MAX)]],
        roles: [null, [Validators.required]],
        activated: [null, []]
    });

    isEditMode: boolean = false;
    isViewMode: boolean = false;
    authorities: IAuthority[] = [];
    profile: Profile = new Profile({});
    originalProfile: Profile = new Profile({});
    label: string = '';
    isLoading: boolean = false;

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly formBuilder: FormBuilder,
        private readonly profileService: ProfileService,
        private readonly loadingService: LoadingService,
        private readonly formatter: DataFormatterService,
        private readonly feedbackService: FeedbackService
    ) {
    }

    ngOnInit(): void {
        this.route.data.subscribe(({profile, isViewMode, label}) => {
            this.loadingService.stop();
            this.profile = profile;
            this.originalProfile = lodash.cloneDeep(this.profile);
            this.isEditMode = this.profile?.id;
            this.isViewMode = isViewMode;
            this.label = label;
            if (!this.isViewMode) {
                this.profileService.getAllAuthorities().subscribe((value: any) => {
                    this.authorities = value;
                });
            }
        });

        this.formGroup.patchValue(this.profile);

        if (!this.isViewMode && !this.isEditMode) {
            this.formGroup.get('activated')?.setValue(true);
        }

        if (this.isViewMode || this.profile?.onlyRead) {
            this.formGroup.disable();
        }
    }

    goToSettingsScreen() {
        this.router.navigate([SETTINGS]).then();
    }

    save() {
        this.isLoading = true;
        this.prepareProfile();

        if (lodash.isEqual(this.originalProfile, this.profile)) {
            this.feedbackService.showInfo('message.noChanges');
            return window.history.back();
        }

        this.feedbackService.initLoading();
        this.saveOrUpdate().subscribe(() => {
            this.feedbackService.closeLoading();
            this.feedbackService.showSuccess(this.profile?.id ? 'profile.onUpdate' : 'profile.onSave');
            this.isLoading = false;
            this.goToSettingsScreen();
        }, (error) => {
            this.feedbackService.closeLoading();
            this.feedbackService.showErrorFromServer(error);
        });
    }

    checkEmptySpaces(event: any, field: any) {
        this.formGroup = this.formatter.checkEmptySpacesByFormGroupAndFieldName(this.formGroup, field, event);
    }

    removeEmptySpaces(field: any) {
        this.formGroup = this.formatter.removeEmptySpacesByFormGroupAndFieldName(this.formGroup, field);
    }

    @HostListener('window:beforeunload', ['$event'])
    showMessage(event: any) {
        event.returnValue = 'Confirmation...';
    }

    private prepareProfile() {
        this.profile.name = this.formGroup.get('name')?.value;
        this.profile.description = this.formGroup.get('description')?.value;
        this.profile.roles = this.formGroup.get('roles')?.value;
        this.profile.activated = this.formGroup.get('activated')?.value;
    }

    private saveOrUpdate(): Observable<any> {
        return (this.profile?.id) ?
            this.profileService.update(this.profile) :
            this.profileService.create(this.profile);
    }

}
