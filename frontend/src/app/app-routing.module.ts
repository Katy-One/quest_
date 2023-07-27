import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/user.guard';
import { UnAuthGuard } from './guards/unauth.guard';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { UserTeamComponent } from './pages/user-team/user-team.component';
import { AppRoutes } from './app-routes.enum';
import { UserRoleEnum } from './guards/user.enum';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: `${AppRoutes.Admin}/${AppRoutes.Teams}`,
	},
	{
		path: AppRoutes.Admin,
		pathMatch: 'full',
		redirectTo: `${AppRoutes.Admin}/${AppRoutes.Teams}`,
	},
	{
		path: AppRoutes.Admin,
		component: AdminComponent,
		canActivate: [UserGuard],
		children: [
			{
				path: '',
				loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
			},
		],
		data: {
			roles: [UserRoleEnum.Admin],
		},
	},
	{
		path: AppRoutes.Game,
		component: UserTeamComponent,
		canActivate: [UserGuard],
		data: {
			roles: [UserRoleEnum.TeamUser],
		},
	},
	{ path: AppRoutes.Login, component: LoginComponent, canActivate: [UnAuthGuard] },
	{ path: '**', component: NotFoundComponent },
	{ path: '**', redirectTo: '**', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
