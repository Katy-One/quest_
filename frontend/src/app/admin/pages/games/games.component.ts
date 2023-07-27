import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { firstValueFrom, switchMap, takeUntil } from 'rxjs';
import { UiComponent } from 'src/app/abstract/ui-component';
import { AppRoutes } from 'src/app/app-routes.enum';
import { Game } from 'src/app/core/data/game';
import { CreateGameModal } from 'src/app/modals/create-game.modal';

import { SnackbarNotificationModal } from 'src/app/modals/snackbar-notification.modal';
import { GamesService } from 'src/app/services/game.service';
import { GamesStore } from 'src/store/games.store';
import { ModalStatus } from '../../enums/modal.enum';

@Component({
	selector: 'app-games',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesComponent extends UiComponent implements OnInit {
	public games$ = this.gamesStore.games$;

	constructor(
		private snackbarNotificationModal: SnackbarNotificationModal,
		private gamesService: GamesService,
		private game: Game,
		private createGameModal: CreateGameModal,
		private gamesStore: GamesStore,
	) {
		super();
	}
	public get url(): string {
		return `${AppRoutes.Admin}/${AppRoutes.Games}`;
	}
	public ngOnInit(): void {
		this.gamesService.getGames().subscribe();
	}

	public openCreateGameDialog() {
		this.createGameModal
			.openDialog()
			.pipe(
				switchMap(async (gameValue: string | null) => {
					if (gameValue) {
						const game = await firstValueFrom(this.game.createGame(gameValue));
						await firstValueFrom(this.gamesService.getGames());
						this.snackbarNotificationModal.open({
							title: 'Thank you for your opinion!',
							panelClass: ModalStatus.Successful,
						});

						return game;
					} else {
						return false;
					}
				}),
				takeUntil(this.dispose$),
			)
			.subscribe();
	}

	public onDeleteGame(id: string) {
		this.gamesService
			.deleteGame(id)
			.pipe(
				switchMap(async (res: boolean) => {
					if (res) {
						await firstValueFrom(this.gamesService.getGames());
						this.snackbarNotificationModal.open({
							title: 'You have successfully deleted the game',
							panelClass: ModalStatus.Successful,
						});
					}
					return res;
				}),
				takeUntil(this.dispose$),
			)
			.subscribe();
	}
}
