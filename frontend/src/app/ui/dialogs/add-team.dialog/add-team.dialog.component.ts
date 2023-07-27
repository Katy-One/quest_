import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateGameDialogComponent } from '../create-game.dialog/create-game.dialog.component';

@Component({
	selector: 'app-add-team.dialog',
	templateUrl: './add-team.dialog.component.html',
	styleUrls: ['./add-team.dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTeamDialogComponent {
	constructor(public dialogRef: MatDialogRef<CreateGameDialogComponent>) {}

	public onSubmit(value: string) {
		this.dialogRef.close(value);
	}
}
