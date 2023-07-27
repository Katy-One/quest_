import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-progress-game',
	templateUrl: './progress-game.component.html',
	styleUrls: ['./progress-game.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressGameComponent {}
