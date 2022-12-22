import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupsPageRoutingModule } from './grups-routing.module';

import { GrupsPage } from './grups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrupsPageRoutingModule
  ],
  declarations: [GrupsPage]
})
export class GrupsPageModule {}
