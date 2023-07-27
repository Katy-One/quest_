import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { UiComponent } from 'src/app/abstract/ui-component';
import { AppRoutes } from 'src/app/app-routes.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-logout-btn',
	templateUrl: './logout-btn.component.html',
	styleUrls: ['./logout-btn.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutBtnComponent extends UiComponent {
	constructor(private authService: AuthService, private router: Router) {
		super();
	}

	public logout() {
		this.authService
			.logout()
			.pipe(
				tap(res => {
					if (res?.status === 'success') {
						this.router.navigate(['/' + AppRoutes.Login]);
					}
				}),
				takeUntil(this.dispose$),
			)
			.subscribe();
	}
}
