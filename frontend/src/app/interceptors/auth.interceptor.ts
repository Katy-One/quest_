import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ErrorService } from '../services/errors.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService, private errorService: ErrorService) {}

	public intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
		//	this.loaderService.isLoading$.next(true);
		const token = this.authService.getJwtToken();

		if (token) {
			request = this.addToken(request, token);
		}
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error instanceof HttpErrorResponse) {
					this.errorService.handleErrors(error.status);
				}

				return throwError(() => error);
			}),
			// finalize(() => {
			// 	this.loaderService.isLoading$.next(false);
			// }),
		);
	}
	private addToken<T>(request: HttpRequest<T>, token: string) {
		const headers = request.headers.delete('Authorization');
		return request.clone({
			headers: headers.append('Authorization', `Bearer ${token}`),
		});
	}
}
