import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarClientesProductosComponent } from './agregar-clientes-productos.component';

describe('AgregarClientesProductosComponent', () => {
  let component: AgregarClientesProductosComponent;
  let fixture: ComponentFixture<AgregarClientesProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarClientesProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarClientesProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
