import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupsPage } from './grups.page';

const routes: Routes = [
  {
    path: '',
    component: GrupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupsPageRoutingModule {}
