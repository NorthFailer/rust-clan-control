import { Route } from "@angular/router";
import { AppUserListComponent } from "./app-user-list/app-user-list.component";

export const routes: Route[] = [
	{
		path: 'list',
		component: AppUserListComponent
	},
	{
		path: '',
		redirectTo: '/list',
		pathMatch: 'full'
	}
];