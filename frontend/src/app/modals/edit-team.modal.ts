import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTeamData } from '../core/models/team.model';
import { EditTeamDialogComponent } from '../ui/dialogs/edit-team.dialog/edit-team.dialog.component';

@Injectable({
	providedIn: 'root',
})
export class EditTeamModal {
	constructor(public dialog: MatDialog) {}

	public openDialog(data: EditTeamData) {
		return this.dialog
			.open(EditTeamDialogComponent, {
				width: '350px',
				height: '365px',
				data: {
					email: data.email,
					username: data.username,
					motto: data.motto,
				},
			})
			.afterClosed();
	}
}
