import { Component, OnInit } from '@angular/core';

import { Guardia } from '../guardia';
import { Absencia } from '../absencia';
import { DadesMestres } from '../dadesmestres';
import { AbsenciesService } from '../absencies.service';

@Component({
  selector: 'app-guardies',
  templateUrl: './guardies.component.html',
  styleUrls: ['./guardies.component.scss'],
})
export class GuardiesComponent implements OnInit {

  guardies: Guardia[] = [];

  constructor(private data: AbsenciesService) { }

  ngOnInit(): void {
    
      this.data.guards.getFromDate();
    
  }

}

