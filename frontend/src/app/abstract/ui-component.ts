import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export abstract class UiComponent implements OnDestroy {
	protected readonly dispose$ = new Subject<void>();

	public ngOnDestroy(): void {
		this.dispose$.next();
	}
}
