import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTeamDialogComponent } from '../ui/dialogs/create-team.dialog/create-team.dialog.component';

@Injectable({
	providedIn: 'root',
})
export class CreateTeamModal {
	constructor(public dialog: MatDialog) {}

	public openDialog() {
		return this.dialog
			.open(CreateTeamDialogComponent, {
				width: '350px',
				height: '300px',
				enterAnimationDuration: '200ms',
				exitAnimationDuration: '1000ms',
			})
			.afterClosed();
	}
}
