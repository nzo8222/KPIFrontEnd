import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FacadeService } from 'src/app/shared/services/facade.service';

@Component({
  selector: 'app-entrada-almacen',
  templateUrl: './entrada-almacen.component.html',
  styleUrls: ['./entrada-almacen.component.scss']
})
export class EntradaAlmacenComponent implements OnInit {
  formaAlmacen: FormGroup;
  tiposMovimientos = ['Entrada', 'Salida'];
  turnos = [ '1', '3' ];
  constructor(private facadeService: FacadeService) { }

  ngOnInit() {
    this.formaAlmacen = new FormGroup({
      'codigoProducto': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(4)]),
      'nombreProducto': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'tipoMovimiento': new FormControl('Entrada', Validators.required),
      'numeroBolsas': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'turno': new FormControl('1', Validators.required)
    });
  }
  onSubmit() {
      let movimientoAlmacen = {
        // IdMovimientoAlmacen: null,
        CodigoProducto: null,
        NombreProducto: null,
        TipoMovimiento: null,
        NumBolsas: null,
        FechaMovimiento: null,
        Turno: null
      }
      movimientoAlmacen.CodigoProducto = this.formaAlmacen.value.codigoProducto;
      movimientoAlmacen.NombreProducto = this.formaAlmacen.value.nombreProducto;
      movimientoAlmacen.TipoMovimiento = this.formaAlmacen.value.tipoMovimiento;
      movimientoAlmacen.NumBolsas = this.formaAlmacen.value.numeroBolsas;
      movimientoAlmacen.Turno = this.formaAlmacen.value.turno;
      this.facadeService.PostMovimientoAlmacen(movimientoAlmacen).subscribe(RespuestaServidor => {
        if(RespuestaServidor.exitoso) { console.log("funka la wea" )} else {
          console.log(`Tronó esta madre ${RespuestaServidor.mensajeError}`);
        }
      });
      this.formaAlmacen.reset();
  }

}
