import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/login.model';
import { UserFormData } from '../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class Auth {
	constructor(private http: HttpClient) {}

	public login(user: UserFormData) {
		return this.http.post<LoginResponse>(`${environment.apiUrl}/users/login`, user).pipe(map((res: LoginResponse) => res));
	}
	public logout() {
		return this.http.get<{ status: 'success' }>(`${environment.apiUrl}/users/logout`).pipe(map(res => res));
	}
}
