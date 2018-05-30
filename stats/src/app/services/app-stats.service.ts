import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs/index";

export class StatsModel {
	playtime: number;
	kills_player: number;
	deaths_player: number;

	constructor(data: any) {
		Object.assign(this, data);
	}

	get playtimeString(): string {
		return `${(this.playtime / 60 / 60).toFixed(2)} ч.`;
	}

	get KDA(): string {
		const rawKDA = this.kills_player / this.deaths_player;
		return rawKDA ? rawKDA.toFixed(2) : '0';
	}
}

@Injectable({
	providedIn: 'root'
})
export class AppStatsService {
	constructor() {

	}

	getStats(): Observable<any> {
		const subject = new Subject<any>();

		chrome.storage.local.get(['injector:stats'], (result) => {
			subject.next(result['injector:stats'].map((data) => new StatsModel(data)));
			subject.complete();
		});

		return subject;
	}
}
