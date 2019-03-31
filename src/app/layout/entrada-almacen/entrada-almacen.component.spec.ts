import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaAlmacenComponent } from './entrada-almacen.component';

describe('EntradaAlmacenComponent', () => {
  let component: EntradaAlmacenComponent;
  let fixture: ComponentFixture<EntradaAlmacenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntradaAlmacenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
