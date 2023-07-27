/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeleteResponse } from '../models/respose.models';
import { EditTaskData } from '../models/task.model';
import { Game } from './game';

@Injectable({
	providedIn: 'root',
})
export class Task {
	constructor(private http: HttpClient) {}

	public createTask(taskValue: EditTaskData, gameId: string) {
		return this.http.post<Game>(`${environment.apiUrl}/games/task/create/`, { ...taskValue, gameId });
	}

	public deleteTask(id: string): Observable<DeleteResponse> {
		return this.http.delete<DeleteResponse>(`${environment.apiUrl}/games/task/delete/${id}`);
	}

	public updateTask(id: string, value: EditTaskData): Observable<boolean> {
		return this.http.put<boolean>(`${environment.apiUrl}/games/update/task/${id}`, value);
	}
}
