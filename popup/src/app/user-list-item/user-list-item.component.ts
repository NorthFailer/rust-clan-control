import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SteamUser } from "../services/steam-api.service";

@Component({
	selector: 'user-list-item',
	templateUrl: './user-list-item.component.html',
	styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {
	@Input() steamUser: SteamUser;
	@Output() onRemove: EventEmitter<SteamUser> = new EventEmitter();

	constructor() { }

	ngOnInit() {
	}

}
