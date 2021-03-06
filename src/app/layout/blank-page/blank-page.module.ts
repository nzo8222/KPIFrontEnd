import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
import { FacadeService } from 'src/app/shared/services/facade.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

@NgModule({
  imports: [
    CommonModule, 
    BlankPageRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    DropDownsModule,
    GridModule,
    DateInputsModule 
  ],
  declarations: [BlankPageComponent],
  providers: [FacadeService]
})
export class BlankPageModule {}
