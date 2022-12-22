import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracioPage } from './configuracio.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracioPage
  },
  {
    path: 'horari',
    loadChildren: () => import('./horari/horari.module').then( m => m.HorariPageModule)
  },
  {
    path: 'grups',
    loadChildren: () => import('./grups/grups.module').then( m => m.GrupsPageModule)
  },
  {
    path: 'recursos',
    loadChildren: () => import('./recursos/recursos.module').then( m => m.RecursosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracioPageRoutingModule {}
