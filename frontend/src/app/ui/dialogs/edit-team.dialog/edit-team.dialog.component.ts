import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditTeamData, TeamData } from 'src/app/core/models/team.model';
import { CreateTeamDialogComponent } from '../create-team.dialog/create-team.dialog.component';

@Component({
	selector: 'app-edit-team.dialog',
	templateUrl: './edit-team.dialog.component.html',
	styleUrls: ['./edit-team.dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTeamDialogComponent {
	constructor(public dialogRef: MatDialogRef<CreateTeamDialogComponent>, @Inject(MAT_DIALOG_DATA) public dataEditDialog: EditTeamData) {}

	public onSubmit(value: TeamData) {
		this.dialogRef.close(value);
	}
}
