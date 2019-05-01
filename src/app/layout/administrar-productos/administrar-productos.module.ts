import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrarProductosRoutingModule } from './administrar-productos-routing.module';
import { AdministrarProductosComponent } from './administrar-productos.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdministrarProductosComponent],
  imports: [
    CommonModule,
    AdministrarProductosRoutingModule,
    GridModule,
    DropDownsModule,
    ReactiveFormsModule
  ]
})
export class AdministrarProductosModule { }
