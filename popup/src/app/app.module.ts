import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppUserListComponent } from './app-user-list/app-user-list.component';
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { AppButtonComponent } from './app-button/app-button.component';
import { AppClassDirective } from './app-class.directive';
import { AppInputFieldComponent } from './app-input-field/app-input-field.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { UserListItemComponent } from './user-list-item/user-list-item.component';

@NgModule({
	declarations: [
		AppComponent,
		AppUserListComponent,
		AppButtonComponent,
		AppClassDirective,
		AppInputFieldComponent,
		UserListItemComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
