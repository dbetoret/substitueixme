import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Tab2Page } from './tab2.page';
import { Tab2PageRoutingModule } from './tab2-routing.module';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { LlistaAbsenciesPageModule } from '../llista-absencies/llista-absencies.module'
import { GuardiesComponent } from '../guardies/guardies.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    LlistaAbsenciesPageModule
  ],
  declarations: [
    Tab2Page,
    GuardiesComponent
  ]
})
export class Tab2PageModule {}
