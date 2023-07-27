import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTeamDialogComponent } from '../ui/dialogs/add-team.dialog/add-team.dialog.component';

@Injectable({
	providedIn: 'root',
})
export class AddTeamModal {
	constructor(public dialog: MatDialog) {}

	public openDialog() {
		return this.dialog
			.open(AddTeamDialogComponent, {
				width: '350px',
				height: '250px',
			})
			.afterClosed();
	}
}
