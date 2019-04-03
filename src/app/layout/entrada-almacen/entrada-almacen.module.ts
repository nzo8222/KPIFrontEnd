import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntradaAlmacenRoutingModule } from './entrada-almacen-routing.module';
import { EntradaAlmacenComponent } from './entrada-almacen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EntradaAlmacenComponent],
  imports: [
    CommonModule,
    EntradaAlmacenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EntradaAlmacenModule { }
