import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AccountService} from '../../core/services/account.service';

@Directive({
    selector: '[sgmHasAnyAuthority]'
})
export class HasAuthorityDirective {

    private authorities: string[] = [];

    constructor(
        private readonly templateRef: TemplateRef<any>,
        private readonly accountService: AccountService,
        private readonly viewContainerRef: ViewContainerRef
    ) {
    }

    @Input()
    set sgmHasAnyAuthority(value: string | string[]) {

        this.authorities = typeof value === 'string' ? [value] : value;
        this.updateView();
        this.accountService.getAuthenticationState().subscribe(() => this.updateView());
    }

    private updateView(): void {
        const hasAnyAuthority = this.accountService.hasAnyAuthority(this.authorities);
        this.viewContainerRef.clear();
        if (hasAnyAuthority) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
    }

}
