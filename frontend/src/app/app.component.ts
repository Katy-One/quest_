import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { UiComponent } from './abstract/ui-component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends UiComponent implements OnInit {
	constructor(private authService: AuthService, private userService: UserService) {
		super();
	}

	public ngOnInit() {
		if (this.authService.getJwtToken()) {
			this.userService.loadUserToStore().pipe(takeUntil(this.dispose$)).subscribe();
		}
	}
}
