import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntradaAlmacenComponent } from './entrada-almacen.component';

const routes: Routes = [
  {path: '', component: EntradaAlmacenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradaAlmacenRoutingModule { }
