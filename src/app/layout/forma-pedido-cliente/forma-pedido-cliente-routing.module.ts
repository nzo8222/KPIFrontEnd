import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormaPedidoClienteComponent } from './forma-pedido-cliente.component';

const routes: Routes = [
  {path: '', component: FormaPedidoClienteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormaPedidoClienteRoutingModule { }
