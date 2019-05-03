import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { PageHeaderModule } from '../../shared';
import { ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

@NgModule({
    imports: [CommonModule,
              Ng2Charts, 
              ChartsRoutingModule, 
              PageHeaderModule,
              ReactiveFormsModule,
              GridModule,
              DropDownsModule],
    declarations: [ChartsComponent]
})
export class ChartsModule {}
