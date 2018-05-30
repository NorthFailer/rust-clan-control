import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppStatsComponent } from './components/app-stats/app-stats.component';

@NgModule({
	declarations: [
		AppComponent,
		AppStatsComponent
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		FormsModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
