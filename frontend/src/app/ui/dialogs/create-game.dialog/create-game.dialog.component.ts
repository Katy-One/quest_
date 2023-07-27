import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-create-game.dialog',
	templateUrl: './create-game.dialog.component.html',
	styleUrls: ['./create-game.dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGameDialogComponent {
	constructor(public dialogRef: MatDialogRef<CreateGameDialogComponent>) {}

	public onSubmit(value: string) {
		this.dialogRef.close(value);
	}
}
