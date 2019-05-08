import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntradaAlmacenRoutingModule } from './entrada-almacen-routing.module';
import { EntradaAlmacenComponent } from './entrada-almacen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

@NgModule({
  declarations: [EntradaAlmacenComponent],
  imports: [
    CommonModule,
    EntradaAlmacenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    DropDownsModule
  ]
})
export class EntradaAlmacenModule { }
