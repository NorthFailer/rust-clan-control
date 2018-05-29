import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { UserListService } from "../services/user-list.service";
import { SteamAPIService, SteamUser } from "../services/steam-api.service";

@Component({
	selector: 'app-user-list',
	templateUrl: './app-user-list.component.html',
	styleUrls: ['./app-user-list.component.scss']
})
export class AppUserListComponent implements OnInit {
	steamIdInput: FormControl;
	isLoading: boolean = false;

	constructor(public userListService: UserListService,
	            private steamAPI: SteamAPIService) {

	}

	ngOnInit() {
		this.steamIdInput = new FormControl();
	}

	getStats() {
		chrome.tabs.query({active: true, currentWindow: true}, (tabs: any) => {
			chrome.tabs.sendMessage(tabs[0].id, {
				msg: 'getStats',
				data: this.userListService.steamUsers
			});
		});
	}

	handleOnSearch() {
		const steamId: string = this.steamIdInput.value.trim();

		if (this.steamIdInput.valid && !this.isLoading && !this.userListService.has(steamId)) {
			this.isLoading = true;

			this.steamAPI.getUsers(steamId).subscribe((steamUser: SteamUser) => {
				this.userListService.add(steamUser);
				this.steamIdInput.setValue('', {
					onlySelf: true,
					emitEvent: true,
					emitModelToViewChange: true,
					emitViewToModelChange: true
				});
			}, () => {
				// TODO DO SOMETHING WITH ERROR
			}, () => {
				this.isLoading = false;
			});
		}
	}

	handleOnRemove(steamUser: SteamUser) {
		this.userListService.remove(steamUser);
	}
}
