import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracioPageRoutingModule } from './configuracio-routing.module';

import { ConfiguracioPage } from './configuracio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracioPageRoutingModule
  ],
  declarations: [ConfiguracioPage]
})
export class ConfiguracioPageModule {}
