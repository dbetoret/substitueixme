import { Component, OnInit } from '@angular/core';
import { Guardia } from '../guardia';
import { Absencia } from '../absencia';
import { DadesMestres } from '../dadesmestres';
import { AbsenciesService, Dates } from '../absencies.service';
import { format, parseISO, add, sub } from 'date-fns';

@Component({
  selector: 'app-guardies',
  templateUrl: './guardies.component.html',
  styleUrls: ['./guardies.component.scss'],
})
export class GuardiesComponent implements OnInit {

  guardies: Guardia[] = [];
  today: Date;
  today_str: string;
  dates: Dates;

  constructor(private data: AbsenciesService) {
    this.dates = new Dates();
    this.today = new Date();
    this.today.setHours(0, 0);
    this.today_str = this.dates.date2str(this.today);
  }

  ngOnInit(): void {
    
      // this.data.guards.get();
    
  }

  nextDay(): void {
    this.today = add(this.today, {days: 1});
    this.today_str = this.dates.date2str(this.today);
  }

  previousDay(): void {
    this.today = sub(this.today, {days: 1});
    this.today_str = this.dates.date2str(this.today);
  }

  // data.dates.date2str(today)

}

