import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    template: ''
})

// tslint:disable-next-line: component-class-suffix
export abstract class SubscriptionDisposer implements OnDestroy {
    public destroyed$ = new Subject<void>();

    public ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
