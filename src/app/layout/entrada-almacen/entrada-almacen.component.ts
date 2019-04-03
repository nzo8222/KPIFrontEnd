import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-entrada-almacen',
  templateUrl: './entrada-almacen.component.html',
  styleUrls: ['./entrada-almacen.component.scss']
})
export class EntradaAlmacenComponent implements OnInit {
  formaAlmacen: FormGroup;
  tiposMovimientos = ['Entrada', 'Salida'];
  turnos = [ '1', '3' ];
  constructor() { }

  ngOnInit() {
    this.formaAlmacen = new FormGroup({
      'codigoProducto': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(4)]),
      'nombreProducto': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'tipoMovimiento': new FormControl('Entrada'),
      'numeroBolsas': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'turno': new FormControl('1')
    });
  }
  onSubmit() {

  }

}
