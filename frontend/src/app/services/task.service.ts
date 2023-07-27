import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Task } from '../core/data/task';
import { EditTaskData } from '../core/models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
	constructor(private task: Task) {}

	// public getTask(id: string): Observable<TaskData | null> {
	// 	return this.task.getTask(id).pipe(
	// 		map(res => {
	// 			this.teamsStore.teams$.next(res.task);
	// 			return res;
	// 		}),
	// 		catchError(() => of(null)),
	// 	);
	// }

	public deleteTask(id: string): Observable<boolean> {
		return this.task.deleteTask(id).pipe(
			map(res => res.data),
			catchError(() => of(false)),
		);
	}
	public updateTask(id: string, value: EditTaskData): Observable<boolean> {
		return this.task.updateTask(id, value).pipe(
			map(res => res),
			catchError(() => of(false)),
		);
	}
}
