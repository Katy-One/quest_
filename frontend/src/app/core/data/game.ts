/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GameData } from '../models/game.model';
import { DeleteResponse } from '../models/respose.models';

@Injectable({
	providedIn: 'root',
})
export class Game {
	constructor(private http: HttpClient) {}

	public createGame(value: string) {
		return this.http.post(`${environment.apiUrl}/games/create`, { gameName: value });
	}

	public getGames(): Observable<GameData[]> {
		return this.http.get<GameData[]>(`${environment.apiUrl}/games`);
	}

	public getGame(id: string): Observable<GameData> {
		return this.http.get<GameData>(`${environment.apiUrl}/games/${id}`);
	}

	public deleteGame(id: string): Observable<boolean> {
		return this.http.delete<boolean>(`${environment.apiUrl}/games/delete/${id}`);
	}
	public updateStatus(id: string): Observable<GameData> {
		return this.http.put<GameData>(`${environment.apiUrl}/games/update/status/${id}`, {});
	}
	public updateMessage(id: string, message: string): Observable<GameData> {
		return this.http.put<GameData>(`${environment.apiUrl}/games/update/message/${id}`, { finalMessage: message });
	}
	public updateTeam(id: string, userId: string): Observable<GameData> {
		return this.http.put<GameData>(`${environment.apiUrl}/games/update/teams/${id}`, { id: userId });
	}

	public deleteTeam(gameId: string, teamId: string): Observable<DeleteResponse> {
		return this.http.delete<DeleteResponse>(`${environment.apiUrl}/games/team/delete/${gameId}/${teamId}`);
	}
}
