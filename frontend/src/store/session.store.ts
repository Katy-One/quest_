import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/models/user.model';

@Injectable({
	providedIn: 'root',
})
export class SessionStore {
	public readonly user$ = new BehaviorSubject<User | null>(null);
}
