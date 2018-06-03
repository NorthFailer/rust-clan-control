import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppStatsComponent} from './components/app-stats/app-stats.component';
import {AppStatsCellComponent} from './components/app-stats-cell/app-stats-cell.component';
import {ShortThousandPipe} from './pipes/short-thousand.pipe';
import {BeautyNumberPipe} from './pipes/beauty-number.pipe';
import {AppStatsTableComponent} from './components/app-stats-table/app-stats-table.component';
import {AppExtractionNormComponent} from './components/app-extraction-norm/app-extraction-norm.component';
import {AppInputFieldComponent} from "../../../popup/src/app/app-input-field/app-input-field.component";

@NgModule({
	declarations: [
		AppComponent,
		AppStatsComponent,
		AppStatsCellComponent,
		ShortThousandPipe,
		BeautyNumberPipe,
		AppStatsTableComponent,
		AppExtractionNormComponent
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
