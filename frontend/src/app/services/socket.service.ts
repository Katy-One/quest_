import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BehaviorSubject, map, mergeMap, takeUntil } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { GamesStore } from 'src/store/games.store';
import { SessionStore } from 'src/store/session.store';
import { TaskStore } from 'src/store/task.store';
import { UiComponent } from '../abstract/ui-component';
import { ModalStatus } from '../admin/enums/modal.enum';
import { StatusEnumType } from '../core/models/game.model';
import { TaskData } from '../core/models/task.model';
import { UserRoleEnum } from '../guards/user.enum';
import { SnackbarNotificationModal } from '../modals/snackbar-notification.modal';
interface ErrorData {
	message: string;
}
interface ActiveGameData {
	gameId: string;
	isActive: boolean;
}

interface TaskGameData {
	message: string;
	task: TaskData;
	time: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class SocketService extends UiComponent {
	public socket!: Socket;
	public correctAnswer$ = new BehaviorSubject<null | string>(null);
	public answer!: FormControl;
	constructor(
		private taskStore: TaskStore,
		private gamesStore: GamesStore,
		private snackbarNotificationModal: SnackbarNotificationModal,
		private sessionStore: SessionStore,
	) {
		super();
		this.setupSocketConnection();
	}

	public setupSocketConnection() {
		const wsUrl: string = 'ws://' + window.location.hostname + ':8000';
		this.socket = io(wsUrl, {
			auth: {
				token: `Bearer ${localStorage.getItem('JWT_TOKEN')}`,
			},
			reconnectionAttempts: 5,
			transports: ['websocket'],
			upgrade: false,
		});
	}

	public connect() {
		this.socket.on('connect', () => {
			this.gamesStore.games$
				.pipe(
					mergeMap(games => games),
					map(game => {
						return { game: game, users: game.users, status: game.status };
					}),
					mergeMap(({ game, users, status }) => {
						return users.map(user => ({ game, user, status }));
					}),

					map(game => {
						if (
							game.status === StatusEnumType.ACTIVE &&
							game.user.id === this.sessionStore.user$.getValue()?.id &&
							game.user.role === UserRoleEnum.TeamUser
						) {
							this.socket.emit('joinRoom', game.game.id);
							this.socket.emit('taskOne', { gameId: game.game.id, active: true });
						}
						return game;
					}),
					takeUntil(this.dispose$),
				)
				.subscribe();
			this.socket.emit('joinRoom', this.sessionStore.user$.getValue()?.id);
		});
	}
	public activeGame() {
		this.socket.on('activeGame', (data: ActiveGameData) => {
			if (data.isActive) {
				this.gamesStore.statusGame$.next(true);
				this.gamesStore.activeGameId$.next(data.gameId);
			}
		});
	}
	public tasks() {
		this.socket.on('task', (data: TaskGameData) => {
			this.answer.reset();
			this.taskStore.task$.next(data.task);
			if (!data.task && !data.message) {
				//	this.gamesStore.statusGame$.next(true);
			} else {
				this.gamesStore.statusGame$.next(false);
			}
			if (data.time) {
				this.correctAnswer$.next(data.task.correctAnswer as string);
				this.answer.setValue(data.task.correctAnswer);
				this.snackbarNotificationModal.open({
					title: 'Time is up',
					panelClass: ModalStatus.Successful,
				});
			}
			if (data.message) {
				this.taskStore.task$.next(null);
				this.correctAnswer$.next(null);
				this.snackbarNotificationModal.open({
					title: data.message,
					panelClass: ModalStatus.Successful,
				});
			}
		});
	}
	public deactivateGame() {
		this.socket.on('deactivateGame', () => {
			this.taskStore.task$.next(null);
			this.gamesStore.statusGame$.next(false);
		});
	}

	public error() {
		this.socket.on('error', (error: ErrorData) => {
			this.snackbarNotificationModal.open({
				title: error.message,
				panelClass: ModalStatus.Successful,
			});
		});
	}
	public disconnect() {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		this.socket.on('disconnect', () => {});
	}
}
