import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsElementRoutingModule } from './bs-element-routing.module';
import { BsElementComponent } from './bs-element.component';
import { PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule,
         BsElementRoutingModule,
          PageHeaderModule,
           NgbModule,
           ReactiveFormsModule],
    declarations: [BsElementComponent]
})
export class BsElementModule {}
