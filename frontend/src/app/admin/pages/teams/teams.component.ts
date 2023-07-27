import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { firstValueFrom, switchMap, takeUntil } from 'rxjs';
import { UiComponent } from 'src/app/abstract/ui-component';
import { Team } from 'src/app/core/data/team';
import { TeamData } from 'src/app/core/models/team.model';
import { User } from 'src/app/core/models/user.model';
import { CreateTeamModal } from 'src/app/modals/create-team.modal';
import { EditTeamModal } from 'src/app/modals/edit-team.modal';
import { SnackbarNotificationModal } from 'src/app/modals/snackbar-notification.modal';
import { TeamsService } from 'src/app/services/teams.service';
import { TeamsStore } from 'src/store/teams.store';
import { ModalStatus } from '../../enums/modal.enum';

@Component({
	selector: 'app-teams',
	templateUrl: './teams.component.html',
	styleUrls: ['./teams.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsComponent extends UiComponent implements OnInit {
	public teams$ = this.teamsStore.teams$;

	constructor(
		private createTeamModal: CreateTeamModal,
		private editTeamModal: EditTeamModal,
		private team: Team,
		private snackbarNotificationModal: SnackbarNotificationModal,
		private teamsService: TeamsService,
		private teamsStore: TeamsStore,
	) {
		super();
	}

	public ngOnInit(): void {
		this.teamsService.getTeams().subscribe();
	}

	public openCreateTeamDialog() {
		this.createTeamModal
			.openDialog()
			.pipe(
				switchMap(async (teamValue: User | null) => {
					if (teamValue) {
						await firstValueFrom(this.team.createTeam(teamValue));
						const user = await firstValueFrom(this.teamsService.getTeams());
						if (user) {
							this.snackbarNotificationModal.open({
								title: 'You have successfully added the team!',
								panelClass: ModalStatus.Successful,
							});
						}
						return user;
					} else {
						return false;
					}
				}),
				takeUntil(this.dispose$),
			)
			.subscribe();
	}
	public openEditTeamDialog(teamValue: TeamData) {
		this.editTeamModal
			.openDialog(teamValue)
			.pipe(
				switchMap(async res => {
					if (res) {
						const user = await firstValueFrom(this.team.editTeam(teamValue.id, res));
						await firstValueFrom(this.teamsService.getTeams());
						if (user) {
							this.snackbarNotificationModal.open({
								title: 'You have successfully updated the team!',
								panelClass: ModalStatus.Successful,
							});
						}
						return user;
					} else {
						return false;
					}
				}),
				takeUntil(this.dispose$),
			)
			.subscribe();
	}
	public onDeleteTeam(id: string) {
		this.teamsService
			.deleteTeam(id)
			.pipe(
				switchMap(async (res: boolean) => {
					if (res) {
						await firstValueFrom(this.teamsService.getTeams());
						this.snackbarNotificationModal.open({
							title: 'You have successfully deleted the team',
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
