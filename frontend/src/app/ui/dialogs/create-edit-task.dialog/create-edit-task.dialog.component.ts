import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditTaskData, TaskData } from 'src/app/core/models/task.model';

@Component({
	selector: 'app-create-edit-task.dialog',
	templateUrl: './create-edit-task.dialog.component.html',
	styleUrls: ['./create-edit-task.dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEditTaskDialogComponent {
	constructor(public dialogRef: MatDialogRef<CreateEditTaskDialogComponent>, @Inject(MAT_DIALOG_DATA) public taskData: TaskData) {}

	public onSubmit(value: EditTaskData) {
		this.dialogRef.close(value);
	}
}
