import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as lodash from 'lodash';
import {
    INITIAL_PAGE,
    ITEMS_PER_PAGE,
    SERVICE_LIST_ROUTER,
    SERVICE_MAX_SIZE_NAME,
    SERVICE_MAX_SIZE_PATH,
    SERVICE_MIN_SIZE_NAME,
    SERVICE_MIN_SIZE_PATH
} from '../../../../../app.constants';
import {SgmServiceService} from '../../../sgm-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FeedbackService} from '../../../../../core/services/feedback.service';
import {StorageService} from '../../../../../core/services/storage.service';
import {DataFormatterService} from '../../../../../core/services/data-formatter.service';
import {SGMService} from '../../../../../shared/models/sgm-service.model';
import {AreaService} from '../../../area.service';

@Component({
    selector: 'sgm-service-info',
    templateUrl: './sgm-service-info.component.html',
    styleUrls: ['./sgm-service-info.component.scss']
})
export class SgmServiceInfoComponent implements OnInit {

    constants = {
        NAME_LENGTH_MAX: SERVICE_MAX_SIZE_NAME,
        NAME_LENGTH_MIN: SERVICE_MIN_SIZE_NAME,
        PATH_LENGTH_MIN: SERVICE_MIN_SIZE_PATH,
        PATH_LENGTH_MAX: SERVICE_MAX_SIZE_PATH
    };

    formGroup: FormGroup | any = this.formBuilder.group({
        name: [null, [Validators.required, Validators.maxLength(this.constants.NAME_LENGTH_MAX),
            Validators.minLength(this.constants.NAME_LENGTH_MIN)]],
        areas: [null, [Validators.required]],
        path: [null, [Validators.required, Validators.maxLength(this.constants.PATH_LENGTH_MAX),
            Validators.minLength(this.constants.PATH_LENGTH_MIN)]],
        activated: [null],
        localPath: [null]
    });

    isViewMode: boolean = false;
    isEditMode: boolean = false;
    label: string = '';

    areas: any[] = [];
    service: SGMService = new SGMService();
    originalService: SGMService = new SGMService();

    private totalPages: any;
    private page: any;
    private search: any;
    isLoading: boolean = false;

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly formBuilder: FormBuilder,
        private readonly areaService: AreaService,
        private readonly storageService: StorageService,
        private readonly formatter: DataFormatterService,
        private readonly feedbackService: FeedbackService,
        private readonly sgmServiceService: SgmServiceService,
    ) {
    }

    ngOnInit(): void {
        this.route.data.subscribe(({service, isViewMode, label}) => {
            this.service = service;
            this.isEditMode = this.service?.id;
            this.isViewMode = isViewMode;
            this.label = label;
            if (!isViewMode) {
                this.loadAreas();

            }
            if (this.isEditMode) {
                this.service.areas?.forEach((area) => {
                    if (!area.activated) {
                        this.areas.push(area);
                    }

                });
            }
        });

        this.formGroup.patchValue(this.service);

        if (this.isViewMode) {
            this.formGroup.disable();
        }

        if (!this.isViewMode && !this.isEditMode) {
            this.formGroup.get('activated')?.setValue(true);
        }
        this.prepareService();
        this.originalService = lodash.cloneDeep(this.service);
    }

    goToServiceListScreen() {
        this.router.navigate([SERVICE_LIST_ROUTER]).then();
    }

    save() {
        this.isLoading = true;
        this.prepareService();
        if (lodash.isEqual(this.originalService, this.service)) {
            this.feedbackService.showInfo('message.noChanges');
            return window.history.back();
        }

        this.feedbackService.initLoading();
        this.saveOrUpdate().subscribe(() => {
            this.feedbackService.closeLoading();
            this.feedbackService.showSuccess(this.service?.id ? 'service.onUpdate' : 'service.onSave');
            this.isLoading = false;
            this.goToServiceListScreen();
        }, (error: any) => {
            this.isLoading = false;
            this.feedbackService.closeLoading();
            this.feedbackService.showErrorFromServer(error);
        });
    }

    scrollToEnd() {
        this.areaService.getAll(this.getParams()).subscribe((value: any) => {
            this.loadPage(value.body);
        });
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

    private prepareService() {
        this.service.name = this.formGroup.get('name')?.value;
        this.service.path = this.formGroup.get('path')?.value;
        this.service.localPath = !!this.formGroup.get('localPath')?.value;
        this.service.areas = this.formGroup.get('areas')?.value;
        this.service.activated = this.formGroup.get('activated')?.value;
        if (this.isEditMode) {
            this.service.activated = this.formGroup.get('activated')?.value;
        }
    }

    private saveOrUpdate() {
        return (this.service?.id) ?
            this.sgmServiceService.update(this.service) :
            this.sgmServiceService.create(this.service);
    }

    private loadAreas() {
        this.areaService.getAll(this.getParams()).subscribe((value: any) => {
            this.loadPage(value.body);
        });
    }

    private loadPage(result: any) {
        const currentPage = result?.pageable.pageNumber;
        this.totalPages = result.totalPages;
        if (currentPage < this.totalPages - 1) {
            this.page = currentPage + 1;
            this.areas = [...this.areas, ...result?.content];
        } else {
            if (this.areas.length < result?.totalElements) {
                this.areas = [...this.areas, ...result?.content];
            }
            this.page = currentPage;
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
