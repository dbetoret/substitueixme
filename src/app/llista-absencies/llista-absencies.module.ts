import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LlistaAbsenciesPageRoutingModule } from './llista-absencies-routing.module';

import { LlistaAbsenciesPage } from './llista-absencies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LlistaAbsenciesPageRoutingModule
  ],
  declarations: [LlistaAbsenciesPage]
})
export class LlistaAbsenciesPageModule {}
