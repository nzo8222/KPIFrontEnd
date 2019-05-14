import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormaPedidoClienteRoutingModule } from './forma-pedido-cliente-routing.module';
import { FormaPedidoClienteComponent } from './forma-pedido-cliente.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormaPedidoClienteComponent],
  imports: [
    
    CommonModule,
    GridModule,
    DropDownsModule,
    FormaPedidoClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ]
})
export class FormaPedidoClienteModule { }
