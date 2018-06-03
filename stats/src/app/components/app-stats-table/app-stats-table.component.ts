import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppStatsService, StatsModel} from "../../services/app-stats.service";
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-stats-table',
  templateUrl: './app-stats-table.component.html',
  styleUrls: ['./app-stats-table.component.scss']
})
export class AppStatsTableComponent implements OnInit {
  @ViewChild('table') table: ElementRef;
  @ViewChild('copyInput') copyInput: ElementRef;

  stats: StatsModel[];
  extractionNorm;
  isScreenShotInProgress: boolean = false;

  constructor(private statsService: AppStatsService,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.statsService.getStats().subscribe((statsModels: StatsModel[]) => {
      this.stats = statsModels.sort((a: StatsModel, b: StatsModel) => {
        if (a.playtime > b.playtime) {
          return -1;
        } else if (a.playtime < b.playtime) {
          return 1;
        }

        return 0;
      });
      this.cd.detectChanges();
    });

    this.statsService.getExtractionNorm().subscribe((value) => {
      this.extractionNorm = value;
      this.cd.detectChanges();
    });

    this.statsService.makeScreenShot.subscribe(() => {
      this.copyScreen();
    });
  }

  getTotal(searchKey: string) {
    let count = 0;

    this.stats.forEach((stats: StatsModel) => {
      count += stats[searchKey];
    });

    return count;
  }

  private copyScreen() {
    this.isScreenShotInProgress = true;

    html2canvas(this.table.nativeElement, {
      imageTimeout: 10000,
      allowTaint: true,
      async: true,
      logging: false,
      scrollY: 0
    }).then((canvas) => {
	const img = new Image();
	img.src = canvas.toDataURL('image/png');
	var myWindow = window.open("", "");
	myWindow.document.body.appendChild(img);
    });
  }
}
