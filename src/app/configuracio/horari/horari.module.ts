import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorariPageRoutingModule } from './horari-routing.module';

import { HorariPage } from './horari.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorariPageRoutingModule
  ],
  declarations: [HorariPage]
})
export class HorariPageModule {}
