import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntradaAlmacenRoutingModule } from './entrada-almacen-routing.module';
import { EntradaAlmacenComponent } from './entrada-almacen.component';

@NgModule({
  declarations: [EntradaAlmacenComponent],
  imports: [
    CommonModule,
    EntradaAlmacenRoutingModule
  ]
})
export class EntradaAlmacenModule { }
