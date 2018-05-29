import { Component, Input, OnInit } from '@angular/core';

export enum AppButtonColor {
	green = 'green'
}

@Component({
	selector: 'app-button',
	templateUrl: './app-button.component.html',
	styleUrls: ['./app-button.component.scss']
})
export class AppButtonComponent implements OnInit {
	@Input() color: AppButtonColor = AppButtonColor.green;

	constructor() { }

	ngOnInit() {
	}

}
