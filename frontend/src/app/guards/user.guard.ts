import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { filter, map, Observable, of } from 'rxjs';
import { SessionStore } from 'src/store/session.store';
import { User } from '../core/models/user.model';
import { AuthService } from '../services/auth.service';
import { isNotNull } from '../type-guards/is-not-null.type-guard';

@Injectable({
	providedIn: 'root',
})
export class UserGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router, private sessionStore: SessionStore) {}
	public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		if (!this.authService.getJwtToken()) {
			void this.router.navigate(['/login']);
			return of(false);
		}

		return this.sessionStore.user$.pipe(
			filter(isNotNull),
			map((user: User) => {
				const roles = route.data['roles'] as string[];

				if (!roles?.length || roles.includes(user.role as string)) {
					return true;
				}

				return false;
			}),
		);
	}
}
