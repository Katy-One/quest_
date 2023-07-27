import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { UiComponent } from 'src/app/abstract/ui-component';

import { GamesService } from 'src/app/services/game.service';
import { SocketService } from 'src/app/services/socket.service';
import { GamesStore } from 'src/store/games.store';
import { SessionStore } from 'src/store/session.store';
import { TaskStore } from 'src/store/task.store';
@Component({
	selector: 'app-user-team',
	templateUrl: './user-team.component.html',
	styleUrls: ['./user-team.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTeamComponent extends UiComponent implements OnInit, OnDestroy {
	public user$ = this.sessionStore.user$;
	public gameForm!: FormGroup;
	public task$ = this.taskStore.task$;
	public correctAnswer$ = this.socketService.correctAnswer$;
	public statusGame$ = this.gamesStore.statusGame$;

	constructor(
		private gamesStore: GamesStore,
		private sessionStore: SessionStore,
		private gamesService: GamesService,
		private fb: FormBuilder,
		private socketService: SocketService,
		private taskStore: TaskStore,
	) {
		super();
	}
	public get answer(): FormControl<string> {
		return this.gameForm.controls['answer'] as FormControl;
	}
	public ngOnInit(): void {
		this.gameForm = this.fb.group({
			answer: ['', Validators.required],
		});
		this.socketService.answer = this.gameForm.get('answer') as FormControl;
		this.gamesService.getGames().pipe(takeUntil(this.dispose$)).subscribe();
		this.socketService.connect();
		this.socketService.disconnect();
		this.socketService.activeGame();
		this.socketService.tasks();
		this.socketService.deactivateGame();
		this.socketService.error();
	}
	public onSubmit() {
		const answer = this.gameForm.value.answer.toLowerCase().trim();
		this.socketService.socket.emit('task', { gameId: this.gamesStore.activeGameId$.getValue(), answer });
	}
	public onStartGame() {
		this.socketService.socket.emit('task', { gameId: this.gamesStore.activeGameId$.getValue() });
	}
	public override ngOnDestroy(): void {
		this.socketService.disconnect();
	}
}
