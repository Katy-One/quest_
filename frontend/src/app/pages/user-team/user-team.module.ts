import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserTeamComponent } from './user-team.component';

@NgModule({
	declarations: [UserTeamComponent],
	exports: [CommonModule, SharedModule, UserTeamComponent],
	imports: [CommonModule, SharedModule],
})
export class UserTeamModule {}
