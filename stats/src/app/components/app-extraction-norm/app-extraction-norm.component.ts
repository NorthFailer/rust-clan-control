import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppStatsService} from "../../services/app-stats.service";

@Component({
  selector: 'app-extraction-norm',
  templateUrl: './app-extraction-norm.component.html',
  styleUrls: ['./app-extraction-norm.component.scss']
})
export class AppExtractionNormComponent implements OnInit, AfterViewInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private statsService: AppStatsService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.statsService.getExtractionNorm().subscribe((value) => {
      if (value) {
        this.form = this.fb.group(value);
      } else {
        this.form = this.fb.group({
          kills_barrel: 0,
          harvests_sulfur_ore: 0,
          harvests_metal_ore: 0,
          harvests_stones: 0,
          harvests_wood: 0,
          harvests_leather: 0,
          harvests_cloth: 0,
          harvests_fat_animal: 0,
        });
      }

      this.subsOnFormChanges();
      this.cd.detectChanges();
    });
  }

  ngAfterViewInit() {
  }

  private subsOnFormChanges() {
    this.form.valueChanges.subscribe((value) => {
      chrome.storage.local.set({'extraction-norm': value});
    });
  }

}
