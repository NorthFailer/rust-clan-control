import { Route } from "@angular/router";
import { AppStatsComponent } from "./components/app-stats/app-stats.component";

export const routes: Route[] = [
	{
		path: 'stats',
		component: AppStatsComponent
	},
	{
		path: '',
		redirectTo: '/stats',
		pathMatch: 'full'
	}
];