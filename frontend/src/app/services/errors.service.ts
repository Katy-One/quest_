import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { ModalStatus } from '../admin/enums/modal.enum';
import { AppRoutes } from '../app-routes.enum';
import { SnackbarNotificationModal } from '../modals/snackbar-notification.modal';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ErrorService {
	public serverErrors$ = new BehaviorSubject<boolean>(false);

	constructor(private authService: AuthService, private router: Router, private snackbarNotificationModal: SnackbarNotificationModal) {}

	public error500State(setServerError: boolean) {
		this.serverErrors$.next(setServerError);
	}

	public handleErrors(error: number) {
		if (error === 401) {
			this.authService.logout();
			void this.router.navigate(['/' + AppRoutes.Login]);
		} else if (error === 400) {
			this.snackbarNotificationModal.open({
				title: 'You entered wrong password or email',
				panelClass: ModalStatus.Error,
			});
		} else {
			this.snackbarNotificationModal.open({
				title: 'Something went wrong',
				panelClass: ModalStatus.Error,
			});
			this.error500State(false);
		}
	}
}
