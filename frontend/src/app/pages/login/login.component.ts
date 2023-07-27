import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs';
import { UiComponent } from 'src/app/abstract/ui-component';
import { AppRoutes } from 'src/app/app-routes.enum';
import { UserRoleEnum } from 'src/app/guards/user.enum';
import { SnackbarNotificationModal } from 'src/app/modals/snackbar-notification.modal';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends UiComponent implements OnInit {
	public adminForm!: FormGroup;
	public isDisabled = false;
	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private userService: UserService,
		private snackbarNotificationModal: SnackbarNotificationModal,
	) {
		super();
	}

	public get username(): FormControl<string> {
		return this.adminForm.controls['username'] as FormControl;
	}
	public get password(): FormControl<string> {
		return this.adminForm.controls['password'] as FormControl;
	}
	public ngOnInit(): void {
		if (this.authService.getJwtToken()) {
			this.router.navigate(['/']);
			return;
		}

		this.adminForm = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	public onSubmit() {
		this.isDisabled = true;
		if (this.adminForm.dirty && this.adminForm.valid) {
			this.authService
				.login(this.adminForm.value)
				.pipe(
					switchMap(() => {
						return this.userService.loadUserToStore();
					}),
					takeUntil(this.dispose$),
				)
				.subscribe({
					next: user => {
						if (user.role === UserRoleEnum.Admin) {
							this.router.navigate(['/']);
						}
						if (user.role === UserRoleEnum.TeamUser) {
							this.router.navigate([AppRoutes.Game]);
						}
					},
					error: () => {
						this.isDisabled = false;
					},
				});
		}
	}
}
