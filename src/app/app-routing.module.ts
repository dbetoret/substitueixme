import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', //redirectTo: '/login', pathMatch: 'full', 
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'llista',
    loadChildren: () => import('./llista-absencies/llista-absencies.module').then( m => m.LlistaAbsenciesPageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./configuracio/configuracio.module').then( m => m.ConfiguracioPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
