import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameData } from 'src/app/core/models/game.model';

@Injectable({
	providedIn: 'root',
})
export class GamesStore {
	public readonly games$ = new BehaviorSubject<GameData[] | []>([]);
	public readonly game$ = new BehaviorSubject<GameData | null>(null);
	public readonly activeGameId$ = new BehaviorSubject<string | null>(null);
	public readonly statusGame$ = new BehaviorSubject<boolean>(false);
}
