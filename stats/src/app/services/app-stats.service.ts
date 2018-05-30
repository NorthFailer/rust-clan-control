import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs/index";

export class StatsModel {
	playtime: number;

	constructor(data: any) {
		Object.assign(this, data);
	}

	get playtimeString(): string {
		return `${(this.playtime / 60 / 60).toFixed(2)} ч.`;
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
