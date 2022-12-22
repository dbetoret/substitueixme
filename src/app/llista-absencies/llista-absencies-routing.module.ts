import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LlistaAbsenciesPage } from './llista-absencies.page';

const routes: Routes = [
  {
    path: '',
    component: LlistaAbsenciesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LlistaAbsenciesPageRoutingModule {}
