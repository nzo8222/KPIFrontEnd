import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPedidoClienteComponent } from './forma-pedido-cliente.component';

describe('FormaPedidoClienteComponent', () => {
  let component: FormaPedidoClienteComponent;
  let fixture: ComponentFixture<FormaPedidoClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormaPedidoClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaPedidoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
