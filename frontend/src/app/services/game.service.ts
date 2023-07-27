import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { GamesStore } from 'src/store/games.store';
import { Game } from '../core/data/game';
import { GameData } from '../core/models/game.model';

@Injectable({ providedIn: 'root' })
export class GamesService {
	constructor(private game: Game, private gamesStore: GamesStore) {}

	public getGames(): Observable<GameData[]> {
		return this.game.getGames().pipe(
			map(res => {
				this.gamesStore.games$.next(res);
				return res;
			}),
			catchError(() => of([])),
		);
	}
	public getGame(id: string): Observable<GameData | null> {
		return this.game.getGame(id).pipe(
			map(game => {
				this.gamesStore.game$.next(game);
				return game;
			}),
			catchError(() => {
				this.gamesStore.game$.next(null);
				return of(null);
			}),
		);
	}

	public deleteGame(id: string): Observable<boolean> {
		return this.game.deleteGame(id).pipe(
			map(res => res),
			catchError(() => of(false)),
		);
	}
	public updateGameStatus(id: string): Observable<GameData | null> {
		return this.game.updateStatus(id).pipe(
			map(res => res),
			catchError(() => of(null)),
		);
	}
	public updateGameMessage(id: string, message: string): Observable<GameData | null> {
		return this.game.updateMessage(id, message).pipe(
			map(res => res),
			catchError(() => of(null)),
		);
	}
	public updateGameTeams(id: string, userId: string): Observable<GameData | null> {
		return this.game.updateTeam(id, userId).pipe(
			map(res => res),
			catchError(err => {
				return of(err);
			}),
		);
	}
	public deleteTeam(gameId: string, teamId: string): Observable<boolean> {
		return this.game.deleteTeam(gameId, teamId).pipe(
			map(res => res.data),
			catchError(() => of(false)),
		);
	}
}
