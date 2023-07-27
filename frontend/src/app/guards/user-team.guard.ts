import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class UserTeamGuard implements CanActivate {
	public canActivate(): boolean {
		return true;
	}
}
