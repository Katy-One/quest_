import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { GamesStore } from 'src/store/games.store';
import { Team } from '../core/data/team';
import { TeamData } from '../core/models/team.model';

@Injectable({ providedIn: 'root' })
export class AutocompleteService {
	constructor(private gamesStore: GamesStore, private team: Team) {}

	public opts = new BehaviorSubject<TeamData[]>([]);

	public getData() {
		return this.team.getNoActiveUsers().pipe(
			tap((teams: TeamData[]) => {
				this.opts.next(teams);

				return this.opts;
			}),
		);
	}
}
