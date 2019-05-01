import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrarProductosComponent } from './administrar-productos.component';

const routes: Routes = [
  {path: '', component:AdministrarProductosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrarProductosRoutingModule { }
