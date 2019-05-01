import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarClientesProductosRoutingModule } from './agregar-clientes-productos-routing.module';
import { AgregarClientesProductosComponent } from './agregar-clientes-productos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [AgregarClientesProductosComponent],
  imports: [
    CommonModule,
    AgregarClientesProductosRoutingModule,
    ReactiveFormsModule,
    GridModule
  ]
})
export class AgregarClientesProductosModule { }
