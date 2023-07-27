import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserFormData } from 'src/app/core/models/user.model';

@Component({
	selector: 'app-create-team.dialog',
	templateUrl: './create-team.dialog.component.html',
	styleUrls: ['./create-team.dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTeamDialogComponent {
	constructor(public dialogRef: MatDialogRef<CreateTeamDialogComponent>) {}

	public onSubmit(value: UserFormData) {
		this.dialogRef.close(value);
	}
}
