import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { burgerLineAnimation } from './burger.animation';

@Component({
	selector: 'app-burger',
	templateUrl: './burger.component.html',
	styleUrls: ['./burger.component.scss'],
	animations: [
		burgerLineAnimation('firstLine'),
		burgerLineAnimation('secondLine', '1px', '45deg', '-60deg', '0'),
		burgerLineAnimation('thirdLine', '-7px', '-45deg', '-60deg'),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BurgerComponent {
	@Input()
	public open!: boolean;

	@Input()
	public color = '#d8b46a';
}
