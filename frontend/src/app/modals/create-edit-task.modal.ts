import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskData } from '../core/models/task.model';
import { CreateEditTaskDialogComponent } from '../ui/dialogs/create-edit-task.dialog/create-edit-task.dialog.component';

@Injectable({
	providedIn: 'root',
})
export class CreateEditTaskModal {
	constructor(public dialog: MatDialog) {}

	public openDialog(task: TaskData | null = null) {
		return this.dialog
			.open(CreateEditTaskDialogComponent, {
				width: '350px',
				height: '80vh',
				data: task ?? {
					taskName: task ? task['taskName'] : null,
					answerFormat: task ? task['answerFormat'] : null,
					description: task ? task['description'] : null,
					correctAnswer: task ? task['correctAnswer'] : null,
					hints: task ? task['hintsForm'] : [],
					endTime: task ? task['endTime'] : null,
				},
			})
			.afterClosed();
	}
}
