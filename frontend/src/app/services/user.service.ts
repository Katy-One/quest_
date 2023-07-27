import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SessionStore } from 'src/store/session.store';
import { User } from '../core/models/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private http: HttpClient, private sessionStore: SessionStore) {}

	public loadUserToStore() {
		return this.http.get<User>(`${environment.apiUrl}/users/current`).pipe(
			map((data: User) => data),
			tap((user: User) => {
				this.sessionStore.user$.next(user);
			}),
		);
	}
}
