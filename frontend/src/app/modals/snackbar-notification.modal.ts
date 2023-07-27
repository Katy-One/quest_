import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { expireTime } from '../consts/consts';
import { SnackbarInputData } from '../core/models/snackbar.model';
import { SnackbarComponent } from '../ui/shared/snackbar/snackbar.component';

@Injectable({
	providedIn: 'root',
})
export class SnackbarNotificationModal {
	constructor(private snackBar: MatSnackBar) {}

	public open(payload: SnackbarInputData) {
		this.snackBar.openFromComponent(SnackbarComponent, {
			data: {
				message: payload.title,
			},
			horizontalPosition: 'center',
			verticalPosition: 'top',
			duration: expireTime,
			panelClass: [payload.panelClass],
		});
	}
}
