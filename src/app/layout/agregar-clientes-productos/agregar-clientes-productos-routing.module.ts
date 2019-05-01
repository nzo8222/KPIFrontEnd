import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarClientesProductosComponent } from './agregar-clientes-productos.component';

const routes: Routes = [
  {path: '', component: AgregarClientesProductosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarClientesProductosRoutingModule {

 }
