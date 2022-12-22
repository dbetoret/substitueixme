import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorariPage } from './horari.page';

const routes: Routes = [
  {
    path: '',
    component: HorariPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorariPageRoutingModule {}
