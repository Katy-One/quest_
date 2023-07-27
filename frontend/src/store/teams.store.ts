import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TeamData } from 'src/app/core/models/team.model';

@Injectable({
	providedIn: 'root',
})
export class TeamsStore {
	public readonly teams$ = new BehaviorSubject<TeamData[] | []>([]);
	public readonly noActiveUsers$ = new BehaviorSubject<TeamData[] | []>([]);
}
