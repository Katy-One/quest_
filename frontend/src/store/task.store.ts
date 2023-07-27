import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskData } from 'src/app/core/models/task.model';

@Injectable({
	providedIn: 'root',
})
export class TaskStore {
	public readonly task$ = new BehaviorSubject<TaskData | null>(null);
}
