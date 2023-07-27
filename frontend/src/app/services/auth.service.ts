import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { SessionStore } from 'src/store/session.store';
import { accessTokenPropName, tokenType } from '../consts/consts';
import { Auth } from '../core/data/auth';
import { LoginResponse } from '../core/models/login.model';
import { UserFormData } from '../core/models/user.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient, private sessionStore: SessionStore, private auth: Auth) {}

	public login(user: UserFormData): Observable<LoginResponse | null> {
		return this.auth.login(user).pipe(
			tap(res => {
				this.sessionStore.user$.next(null);
				this.storeJwtToken(res.access_token, 'Bearer');
			}),
			catchError(async () => null),
		);
	}

	public logout() {
		return this.auth.logout().pipe(
			map(res => {
				this.sessionStore.user$.next(null);
				localStorage.removeItem(accessTokenPropName);
				localStorage.removeItem(tokenType);
				return res;
			}),
			catchError(async () => null),
		);
	}

	public getJwtToken() {
		return localStorage.getItem(accessTokenPropName);
	}
	public getTokenType() {
		return localStorage.getItem(tokenType);
	}

	private storeJwtToken(jwt: string, type: string) {
		localStorage.setItem(accessTokenPropName, jwt);
		localStorage.setItem(tokenType, type);
	}
}
