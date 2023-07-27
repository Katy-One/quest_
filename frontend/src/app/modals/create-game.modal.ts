import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGameDialogComponent } from '../ui/dialogs/create-game.dialog/create-game.dialog.component';

@Injectable({
	providedIn: 'root',
})
export class CreateGameModal {
	constructor(public dialog: MatDialog) {}

	public openDialog() {
		return this.dialog
			.open(CreateGameDialogComponent, {
				width: '350px',
				height: '250px',
			})
			.afterClosed();
	}
}
