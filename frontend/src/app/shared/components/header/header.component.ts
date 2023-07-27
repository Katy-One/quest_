import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppRoutes } from 'src/app/app-routes.enum';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	public open = false;

	public links = [
		{ nameLink: 'Games', path: `${AppRoutes.Admin}/${AppRoutes.Games}` },
		{ nameLink: 'Teams', path: `${AppRoutes.Admin}/${AppRoutes.Teams}` },
	];

	public toggleOpen() {
		this.open = !this.open;
	}
}
