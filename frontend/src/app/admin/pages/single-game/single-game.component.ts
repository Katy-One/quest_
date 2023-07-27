import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map, of, switchMap, takeUntil } from 'rxjs';
import { UiComponent } from 'src/app/abstract/ui-component';
import { Task } from 'src/app/core/data/task';
import { GameData } from 'src/app/core/models/game.model';
import { EditTaskData, TaskData } from 'src/app/core/models/task.model';
import { User } from 'src/app/core/models/user.model';
import { AddTeamModal } from 'src/app/modals/add-team.modal';
import { CreateEditTaskModal } from 'src/app/modals/create-edit-task.modal';
import { SnackbarNotificationModal } from 'src/app/modals/snackbar-notification.modal';
import { GamesService } from 'src/app/services/game.service';
import { SocketService } from 'src/app/services/socket.service';
import { TaskService } from 'src/app/services/task.service';
import { GamesStore } from 'src/store/games.store';
import { ModalStatus } from '../../enums/modal.enum';

@Component({
	selector: 'app-single-game',
	templateUrl: './single-game.component.html',
	styleUrls: ['./single-game.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleGameComponent extends UiComponent implements OnInit, OnDestroy {
	public game$ = this.gamesStore.game$;
	public isActive: boolean | undefined;
	private params!: string;

	constructor(
		private activatedRoute: ActivatedRoute,
		private gamesService: GamesService,
		private taskService: TaskService,
		private addTeamModal: AddTeamModal,
		private createEditTaskModal: CreateEditTaskModal,
		private snackbarNotificationModal: SnackbarNotificationModal,
		private task: Task,
		private gamesStore: GamesStore,
		private socketService: SocketService,
	) {
		super();
	}

	public ngOnInit(): void {
		this.game$.pipe(map(game => game?.isActive)).subscribe(isActive => {
			this.isActive = isActive;
		});
		this.isActive = this.game$.getValue()?.isActive;
		this.activatedRoute.params
			.pipe(
				switchMap(async params => {
					this.params = params['gameName'];
					if (params) {
						return await firstValueFrom(this.gamesService.getGame(this.params));
					}
					return of(null);
				}),
				takeUntil(this.dispose$),
			)
			.subscribe();

		this.socketService.connect();

		this.socketService.disconnect();

		this.socketService.activeGame();

		this.socketService.deactivateGame();

		this.socketService.error();
	}
	public onUpdateStatusGame(id: string) {
		this.isActive = true;
		this.gamesStore.statusGame$.next(true);
		this.socketService.socket.emit('joinRoom', id);
		this.socketService.socket.emit('activeGame', { gameId: id });
	}
	public onDeactivateGame(gameId: string) {
		this.isActive = false;
		this.socketService.socket.emit('deactivateGame', { gameId });
	}
	public onUpdateMessageGame(id: string, message: string) {
		this.gamesService
			.updateGameMessage(id, message)
			.pipe(
				switchMap(async (res: GameData | null) => {
					if (res) {
						await firstValueFrom(this.gamesService.getGame(id));
						this.snackbarNotificationModal.open({
							title: 'You have successfully updated the message game',
							panelClass: ModalStatus.Successful,
						});
					}
					return res;
				}),
				takeUntil(this.dispose$),
			)
			.subscribe();
	}

	public async addTeam(id: string) {
		this.addTeamModal
			.openDialog()
			.pipe(
				switchMap(async (user: User | null) => {
					if (user) {
						const game = await firstValueFrom(this.gamesService.updateGameTeams(id, user.id));
						await firstValueFrom(this.gamesService.getGame(this.params));
						if (game) {
							this.snackbarNotificationModal.open({
								title: 'You have successfully add the team ',
								panelClass: ModalStatus.Successful,
							});
						}
						return;
					} else {
						return null;
					}
				}),
				takeUntil(this.dispose$),
			)
			.subscribe();
	}
	public onDeleteTeam(gameId: string, teamId: string) {
		this.gamesService
			.deleteTeam(gameId, teamId)
			.pipe(
				switchMap(async (res: boolean) => {
					if (res) {
						await firstValueFrom(this.gamesService.getGame(gameId));
						this.snackbarNotificationModal.open({
							title: 'You have successfully deleted the team',
							panelClass: ModalStatus.Successful,
						});
						return;
					} else {
						return null;
					}
				}),
				takeUntil(this.dispose$),
			)
			.subscribe();
	}

	public openCreateTaskDialog(gameId: string) {
		this.createEditTaskModal
			.openDialog()
			.pipe(
				switchMap(async (gameValue: EditTaskData) => {
					if (gameValue) {
						await firstValueFrom(this.task.createTask(gameValue, gameId));
						await firstValueFrom(this.gamesService.getGame(gameId));
						this.snackbarNotificationModal.open({
							title: 'You have successfully created the task game',
							panelClass: ModalStatus.Successful,
						});
					}
					return;
				}),

				takeUntil(this.dispose$),
			)
			.subscribe();
	}
	public onUpdateTask(task: TaskData) {
		this.createEditTaskModal
			.openDialog(task)
			.pipe(
				switchMap(async (gameValue: EditTaskData) => {
					if (gameValue) {
						const game = await firstValueFrom(this.taskService.updateTask(task.id, gameValue));
						await firstValueFrom(this.gamesService.getGame(this.params));
						if (game) {
							this.snackbarNotificationModal.open({
								title: 'You have successfully updated the task game',
								panelClass: ModalStatus.Successful,
							});
						}
						return true;
					} else {
						return false;
					}
				}),
				takeUntil(this.dispose$),
			)
			.subscribe();
	}

	public onDeleteTask(id: string) {
		this.taskService
			.deleteTask(id)
			.pipe(
				switchMap(async (res: boolean) => {
					if (res) {
						if (res) {
							await firstValueFrom(this.gamesService.getGame(this.params));
							this.snackbarNotificationModal.open({
								title: 'You have successfully deleted the task game',
								panelClass: ModalStatus.Successful,
							});
						}
						return;
					}
					return null;
				}),
			)
			.subscribe();
	}

	public override ngOnDestroy(): void {
		this.socketService.disconnect();
	}
}
