import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from '../app-routes.enum';

import { GamesComponent } from './pages/games/games.component';
import { ProgressGameSingleTeamComponent } from './pages/progress-game-single-team/progress-game-single-team.component';
import { ProgressGameComponent } from './pages/progress-game/progress-game.component';
import { SingleGameComponent } from './pages/single-game/single-game.component';

import { TeamsComponent } from './pages/teams/teams.component';

const routes: Routes = [
	{ path: AppRoutes.Games, component: GamesComponent },
	{ path: `${AppRoutes.Games}/:gameName`, component: SingleGameComponent },
	{ path: `${AppRoutes.Games}/:name/${AppRoutes.Progress}`, component: ProgressGameComponent },
	{ path: `${AppRoutes.Games}/:name/${AppRoutes.Progress}/:team/:id`, component: ProgressGameSingleTeamComponent },
	{ path: AppRoutes.Teams, component: TeamsComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminRoutingModule {}
