import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouteLink } from 'src/app/core/models/routes.model';

import { menuAnimation } from './menu.animation';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	animations: [menuAnimation()],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
	@Input()
	public expanded!: boolean;

	@Input()
	public links!: RouteLink[];

	@Output()
	public linkClick = new EventEmitter<void>(false);
}
