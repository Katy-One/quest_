/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeleteResponse } from '../models/respose.models';
import { EditTeamData, TeamData } from '../models/team.model';
import { User } from '../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class Team {
	constructor(private http: HttpClient) {}

	public createTeam(userValue: User) {
		return this.http.post<User>(`${environment.apiUrl}/users/create`, userValue);
	}
	public getTeams(): Observable<TeamData[]> {
		return this.http.get<TeamData[]>(`${environment.apiUrl}/users/teams`);
	}
	public getNoActiveUsers(): Observable<TeamData[]> {
		return this.http.get<TeamData[]>(`${environment.apiUrl}/users/teams/noActive`);
	}

	public deleteTeam(id: string): Observable<DeleteResponse> {
		return this.http.delete<DeleteResponse>(`${environment.apiUrl}/users/delete/${id}`);
	}

	public editTeam(id: string, value: EditTeamData): Observable<boolean> {
		return this.http.put<boolean>(`${environment.apiUrl}/users/update/${id}`, { email: value.email, motto: value.motto });
	}
}
